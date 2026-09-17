// fluxograma.js — desenha os fluxogramas do hub sem Mermaid, no traço do design
// system: árvore de cima para baixo, nós de quatro tipos (pergunta, ação,
// resultado bom, resultado ruim), setas com rótulo "Sim/Não", ramos lado a lado
// no desktop e empilhados no celular.
//
// O conteúdo continua o mesmo — o texto em `codigoMermaid`, já escrito nos
// arquivos de dados. Este arquivo:
//   1. Lê o texto do diagrama (o subconjunto do Mermaid que o hub usa).
//   2. Monta a árvore em HTML, com as cores do app.
//   3. Se o texto tiver algo que ele não entende, devolve null — e quem chama
//      mostra a versão em texto, que sempre existe.
//
// Sintaxe aceita:
//   flowchart TD | graph LR        cabeçalho, ignorado
//   A[Texto] / A["Texto"]          caixa de ação
//   B{Pergunta} / B{"Pergunta"}    pergunta
//   A --> B                        seta simples
//   A -- Sim --> B                 seta com rótulo (com ou sem aspas)
//   A -->|Sim| B                   idem, forma alternativa
//   A -.-> B / A -.-|x| B          tracejada: mesma ligação
//   classDef nome ...              ignorado (as cores vêm do design system)
//   class X,Y nao                  marca as caixas como fim ruim ("sim" = fim bom)

import { html, criarElemento } from '../ui.js';

const TOM_DA_CLASSE = { nao: 'ruim', sim: 'bom', alerta: 'alerta', alto: 'ruim', medio: 'alerta', baixo: 'bom', fim: 'acao' };

// Cores dos nós, como no handoff ("00 Componentes › Fluxograma").
const NO = {
  pergunta: { borda: '#22D3EE', fundo: 'rgba(34,211,238,.1)', cor: '#E6EDF3' },
  acao: { borda: '#1F2733', fundo: '#0B0F17', cor: '#E6EDF3' },
  bom: { borda: 'rgba(34,197,94,.5)', fundo: 'rgba(34,197,94,.12)', cor: '#E6EDF3' },
  ruim: { borda: 'rgba(239,68,68,.5)', fundo: 'rgba(239,68,68,.12)', cor: '#F87171' },
  alerta: { borda: 'rgba(245,158,11,.4)', fundo: 'rgba(245,158,11,.12)', cor: '#E6EDF3' },
};

// Cores dos rótulos das setas: "Sim" verde, "Não" vermelho, o resto neutro.
function estiloDoRotulo(rotulo) {
  const r = rotulo.toLowerCase();
  if (/^(sim|passou)$/.test(r)) return 'border:1px solid rgba(34,197,94,.5);background:rgba(34,197,94,.12);color:#22C55E';
  if (/^(n[aã]o|reprovou)$/.test(r)) return 'border:1px solid rgba(239,68,68,.5);background:rgba(239,68,68,.12);color:#F87171';
  return 'border:1px solid #1F2733;background:#141A24;color:#9AA7B4';
}

function limparTexto(texto) {
  return texto.trim().replace(/^"(.*)"$/s, '$1').replace(/<br\s*\/?>/gi, ' ');
}

/** Lê o texto do diagrama e devolve { nos, arestas }, ou null se não entender. */
export function interpretarDiagrama(codigo) {
  if (typeof codigo !== 'string' || !codigo.trim()) return null;

  const nos = new Map();
  const arestas = [];

  const registrar = (id, texto, tipo) => {
    const existente = nos.get(id);
    if (!existente) {
      nos.set(id, { id, texto: texto ?? id, tipo: tipo ?? 'acao' });
      return;
    }
    if (texto && existente.texto === existente.id) existente.texto = texto;
    if (tipo && existente.tipo === 'acao') existente.tipo = tipo;
  };

  const LADO = /^([A-Za-z0-9_]+)\s*(?:\[([^\]]*)\]|\{([^}]*)\})?$/;
  const lerLado = (bruto) => {
    const parte = LADO.exec(bruto.trim());
    if (!parte) return null;
    const [, id, textoCaixa, textoLosango] = parte;
    const texto = textoLosango ?? textoCaixa;
    registrar(id, texto === undefined ? undefined : limparTexto(texto), textoLosango !== undefined ? 'pergunta' : 'acao');
    return id;
  };

  for (const linhaBruta of codigo.split('\n')) {
    const linha = linhaBruta.trim().replace(/-\.->/g, '-->').replace(/-\.-\|/g, '-->|');
    if (!linha || /^(flowchart|graph)\b/.test(linha) || /^classDef\b/.test(linha) || linha.startsWith('%%')) continue;

    const marcacao = /^class\s+([A-Za-z0-9_,\s]+)\s+([A-Za-z0-9_]+)$/.exec(linha);
    if (marcacao) {
      const tom = TOM_DA_CLASSE[marcacao[2]];
      if (tom) {
        marcacao[1].split(',').map((id) => id.trim()).forEach((id) => {
          const no = nos.get(id);
          if (no) no.tipo = tom;
        });
      }
      continue;
    }

    const comRotuloDepois = /^(.+?)\s*-->\s*\|([^|]*)\|\s*(.+)$/.exec(linha);
    const comRotuloAntes = /^(.+?)\s*--\s*(.+?)\s*-->\s*(.+)$/.exec(linha);
    const simples = /^(.+?)\s*-->\s*(.+)$/.exec(linha);

    let origem;
    let destino;
    let rotulo = '';
    if (comRotuloDepois) {
      origem = lerLado(comRotuloDepois[1]);
      rotulo = limparTexto(comRotuloDepois[2]);
      destino = lerLado(comRotuloDepois[3]);
    } else if (comRotuloAntes) {
      origem = lerLado(comRotuloAntes[1]);
      rotulo = limparTexto(comRotuloAntes[2]);
      destino = lerLado(comRotuloAntes[3]);
    } else if (simples) {
      origem = lerLado(simples[1]);
      destino = lerLado(simples[2]);
    } else {
      return null;
    }
    if (!origem || !destino) return null;
    arestas.push({ de: origem, para: destino, rotulo });
  }

  if (!nos.size || !arestas.length) return null;
  return { nos: [...nos.values()], arestas };
}

// --- Peças de desenho ------------------------------------------------------

function caixa(no, { largo = false } = {}) {
  const estilo = NO[no.tipo] ?? NO.acao;
  return html`<div style="border-radius:8px;border:1px solid ${estilo.borda};background:${estilo.fundo};padding:10px 14px;font-size:14px;font-weight:${no.tipo === 'pergunta' || largo ? 600 : 500};text-align:center;color:${estilo.cor};width:100%;max-width:${largo ? 320 : 280}px;box-sizing:border-box">${no.texto}</div>`;
}

// Linha vertical com ponta de seta, como no desenho (2px + quadrado girado).
function seta(altura = 16) {
  return html`<div aria-hidden="true" style="display:flex;flex-direction:column;align-items:center">
    <div style="width:2px;height:${altura}px;background:#9AA7B4"></div>
    <div style="width:8px;height:8px;border-right:2px solid #9AA7B4;border-bottom:2px solid #9AA7B4;transform:rotate(45deg);margin-top:-10px"></div>
    <div style="height:4px"></div>
  </div>`;
}

function rotuloDaSeta(rotulo) {
  return html`<span style="border-radius:999px;padding:1px 10px;font-size:12px;font-weight:600;${estiloDoRotulo(rotulo)}">${rotulo}</span>`;
}

// Referência a um nó já desenhado noutro lugar (fecha um laço ou junta ramos).
function referencia(no, rotulo) {
  const estilo = NO[no.tipo] ?? NO.acao;
  return html`<div style="display:flex;flex-direction:column;align-items:center;gap:6px">
    ${rotulo ? rotuloDaSeta(rotulo) : ''}
    <span style="border-radius:999px;border:1px dashed ${estilo.borda};padding:3px 12px;font-size:12px;color:#9AA7B4">↩ ${no.texto}</span>
  </div>`;
}

/**
 * Desenha o fluxograma. Devolve null quando não consegue ler o texto do
 * diagrama — quem chama mostra a versão em texto no lugar.
 */
export function criarFluxograma({ diagrama, rotuloAcessivel = '' }) {
  const lido = interpretarDiagrama(diagrama);
  if (!lido) return null;

  const { nos, arestas } = lido;
  const porId = new Map(nos.map((no) => [no.id, no]));
  const saidasDe = (id) => arestas.filter((a) => a.de === id);
  const entradasDe = (id) => arestas.filter((a) => a.para === id);

  // A raiz é o primeiro nó sem seta chegando (ou o primeiro citado).
  const raiz = nos.find((no) => entradasDe(no.id).length === 0) ?? nos[0];

  // Nó de "junção": mais de uma seta chega nele. Desenhamos uma vez, no fim
  // do caminho principal; os outros ramos apontam para ele com uma referência.
  const desenhados = new Set();

  function desenharCadeia(id, caminho) {
    const coluna = criarElemento('div', { class: 'omh-fluxo-ramo', style: 'display:flex;flex-direction:column;align-items:center;width:100%' });
    let atual = id;

    while (atual) {
      const no = porId.get(atual);
      const terminal = saidasDe(atual).length === 0;
      if (caminho.includes(atual) || (desenhados.has(atual) && !terminal)) {
        coluna.append(referencia(no, ''));
        return coluna;
      }
      if (!terminal) desenhados.add(atual);
      caminho = [...caminho, atual];
      coluna.append(caixa(no, { largo: no.tipo === 'pergunta' }));

      const saidas = saidasDe(atual);
      if (!saidas.length) return coluna;

      if (saidas.length === 1 && !saidas[0].rotulo) {
        const proximo = saidas[0].para;
        const proximoNo = porId.get(proximo);
        if (caminho.includes(proximo) || desenhados.has(proximo)) {
          coluna.append(seta(16), referencia(proximoNo, ''));
          return coluna;
        }
        coluna.append(seta(16));
        atual = proximo;
        continue;
      }

      // Ramos: lado a lado no desktop, empilhados no celular.
      const ramos = criarElemento('div', { class: 'omh-fluxo-ramos', style: '--omh-fluxo-colunas:' + Math.min(saidas.length, 3) + ';margin-top:4px' });
      const juncoes = [];
      saidas.forEach((aresta) => {
        const ramo = criarElemento('div', { class: 'omh-fluxo-ramo', style: 'display:flex;flex-direction:column;align-items:center' });
        ramo.append(html`<div aria-hidden="true" style="width:2px;height:16px;background:#9AA7B4"></div>`);
        if (aresta.rotulo) ramo.append(rotuloDaSeta(aresta.rotulo));
        const alvo = porId.get(aresta.para);
        // Nó de fim ("Não compro") pode repetir em cada ramo, como no desenho:
        // é terminal, então repetir não confunde. Só vira referência o nó que
        // CONTINUA depois (junção de caminhos ou volta de laço).
        const ehJuncao =
          entradasDe(aresta.para).length > 1 &&
          saidasDe(aresta.para).length > 0 &&
          !desenhados.has(aresta.para) &&
          !caminho.includes(aresta.para);
        if (ehJuncao && saidas.some((s) => s.para !== aresta.para)) {
          // Ramo que desemboca no nó comum: mostra a referência aqui e o nó
          // comum vem depois, embaixo dos ramos, uma vez só.
          juncoes.push(aresta.para);
          ramo.append(seta(16), referencia(alvo, ''));
        } else {
          ramo.append(seta(16), desenharCadeia(aresta.para, caminho));
        }
        ramos.append(ramo);
      });
      coluna.append(ramos);

      const comum = juncoes.find((j) => !desenhados.has(j));
      if (comum) {
        coluna.append(html`<div style="height:8px"></div>`, seta(20), desenharCadeia(comum, caminho));
      }
      return coluna;
    }
    return coluna;
  }

  const arvore = desenharCadeia(raiz.id, []);

  const descricao =
    rotuloAcessivel ||
    nos
      .map((no) => {
        const s = saidasDe(no.id).map((a) => (a.rotulo ? a.rotulo + ': ' : 'depois, ') + (porId.get(a.para)?.texto ?? a.para));
        return no.texto + (s.length ? ' — ' + s.join('; ') : '');
      })
      .join('. ');

  return html`<div role="img" aria-label="${descricao}" style="border-radius:8px;border:1px solid #1F2733;background:#0B0F17;padding:20px;display:flex;flex-direction:column;align-items:center">${arvore}</div>`;
}
