// fluxograma.js — desenha os fluxogramas do hub sem Mermaid.
//
// Por que existe: até aqui todo fluxograma era desenhado pelo Mermaid, baixado de
// um CDN. Isso trazia três problemas: o desenho não usava as cores nem as fontes
// do app, encolhia no celular em vez de empilhar, e dependia de um arquivo
// externo carregar. O conteúdo continua o mesmo — o texto em `codigoMermaid`,
// que já estava escrito nos arquivos de dados.
//
// O que este arquivo faz:
//   1. Lê o texto do diagrama (um subconjunto do Mermaid, o que o hub usa).
//   2. Monta caixas e setas em HTML, com as cores do design system.
//   3. Se o texto tiver algo que ele não entende, devolve null — e quem chama
//      mostra a versão em texto, que sempre existe.
//
// Sintaxe aceita (é a que os arquivos de dados usam):
//   flowchart TD | graph LR        cabeçalho, ignorado
//   A[Texto] / A["Texto"]          caixa de ação
//   B{Pergunta} / B{"Pergunta"}    losango de decisão
//   A --> B                        seta simples
//   A -- Sim --> B                 seta com rótulo
//   A -- "Sim" --> B               idem, com aspas
//   A -->|Sim| B                   idem, forma alternativa
//   classDef nome ...              ignorado (as cores vêm do design system)
//   class X,Y nao                  marca as caixas como "fim ruim"
//   class H sim                    marca as caixas como "fim bom"

import { html, criarElemento } from '../ui.js';

// Classe do Mermaid → tom do hub. Os nomes vêm dos próprios arquivos de dados.
const TOM_DA_CLASSE = {
  nao: 'ruim',
  sim: 'bom',
  alerta: 'alerta',
  alto: 'ruim',
  medio: 'alerta',
  baixo: 'bom',
  fim: 'acao',
};

const ESTILO = {
  pergunta: 'border-acento/60 bg-acento/10',
  acao: 'border-borda bg-fundo',
  bom: 'border-risco-baixo/60 bg-risco-baixo/10',
  ruim: 'border-risco-alto/60 bg-risco-alto/10',
  alerta: 'border-risco-medio/60 bg-risco-medio/10',
};

function limparTexto(texto) {
  return texto.trim().replace(/^"(.*)"$/s, '$1').replace(/<br\s*\/?>/gi, ' ');
}

/**
 * Lê o texto do diagrama e devolve { nos, arestas }, ou null se encontrar algo
 * que não conhece — melhor cair na versão em texto do que desenhar errado.
 */
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
    // A primeira menção costuma trazer o texto; as seguintes só o id.
    if (texto && existente.texto === existente.id) existente.texto = texto;
    if (tipo && existente.tipo === 'acao') existente.tipo = tipo;
  };

  // Um lado da seta: "A", "A[Texto]" ou "B{Pergunta}".
  const LADO = /^([A-Za-z0-9_]+)\s*(?:\[([^\]]*)\]|\{([^}]*)\})?$/;

  const lerLado = (bruto) => {
    const parte = LADO.exec(bruto.trim());
    if (!parte) return null;
    const [, id, textoCaixa, textoLosango] = parte;
    const tipo = textoLosango !== undefined ? 'pergunta' : 'acao';
    const texto = textoLosango ?? textoCaixa;
    registrar(id, texto === undefined ? undefined : limparTexto(texto), tipo);
    return id;
  };

  for (const linhaBruta of codigo.split('\n')) {
    // Seta tracejada (-.-> ou -.-|rótulo|) é a mesma ligação, só desenhada
    // pontilhada no Mermaid. Aqui vira seta normal: o que importa é a ligação.
    const linha = linhaBruta.trim().replace(/-\.->/g, '-->').replace(/-\.-\|/g, '-->|');
    if (!linha || /^(flowchart|graph)\b/.test(linha) || /^classDef\b/.test(linha) || linha.startsWith('%%')) {
      continue;
    }

    // class X,Y nome — marca o tom das caixas de fim.
    const marcacao = /^class\s+([A-Za-z0-9_,\s]+)\s+([A-Za-z0-9_]+)$/.exec(linha);
    if (marcacao) {
      const tom = TOM_DA_CLASSE[marcacao[2]];
      if (tom) {
        marcacao[1]
          .split(',')
          .map((id) => id.trim())
          .forEach((id) => {
            const no = nos.get(id);
            if (no) no.tipo = tom;
          });
      }
      continue;
    }

    // As três formas de seta que o hub usa.
    const comRotuloAntes = /^(.+?)\s*--\s*(.+?)\s*-->\s*(.+)$/.exec(linha);
    const comRotuloDepois = /^(.+?)\s*-->\s*\|([^|]*)\|\s*(.+)$/.exec(linha);
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
      // Linha que não é seta nem marcação: pode ser sintaxe que não conhecemos.
      return null;
    }

    if (!origem || !destino) return null;
    arestas.push({ de: origem, para: destino, rotulo });
  }

  if (!nos.size || !arestas.length) return null;
  return { nos: [...nos.values()], arestas };
}

// Ordena as caixas por profundidade a partir da primeira: assim o desenho segue a
// ordem em que as coisas acontecem, e caixas de fim (como "Não compro") aparecem
// uma vez só, no ponto mais fundo em que são citadas.
function ordenarPorProfundidade(nos, arestas) {
  const profundidade = new Map(nos.map((no) => [no.id, 0]));
  // Relaxa as arestas n vezes: grafo pequeno, e resolve ciclos sem travar.
  for (let volta = 0; volta < nos.length; volta++) {
    let mudou = false;
    for (const aresta of arestas) {
      const candidata = profundidade.get(aresta.de) + 1;
      if (candidata > profundidade.get(aresta.para) && candidata < nos.length) {
        profundidade.set(aresta.para, candidata);
        mudou = true;
      }
    }
    if (!mudou) break;
  }
  return [...nos].sort((a, b) => profundidade.get(a.id) - profundidade.get(b.id));
}

/**
 * Desenha o fluxograma. Devolve null quando não consegue ler o texto do diagrama
 * — quem chama mostra a versão em texto no lugar.
 *
 * @param {object} p
 * @param {string} p.diagrama  o mesmo texto que ia para o Mermaid
 * @param {string} [p.rotuloAcessivel]  descrição para leitor de tela
 */
export function criarFluxograma({ diagrama, rotuloAcessivel = '' }) {
  const lido = interpretarDiagrama(diagrama);
  if (!lido) return null;

  const { nos, arestas } = lido;
  const porId = new Map(nos.map((no) => [no.id, no]));
  const emOrdem = ordenarPorProfundidade(nos, arestas);

  const caixas = emOrdem.map((no, indice) => {
    const saidas = arestas.filter((aresta) => aresta.de === no.id);

    const setas = saidas.length
      ? criarElemento(
          'ul',
          { class: 'mt-3 flex flex-wrap gap-2' },
          saidas.map((aresta) => {
            const alvo = porId.get(aresta.para);
            const destaque = aresta.rotulo ? aresta.rotulo + ': ' : '';
            return html`<li
              class="flex items-center gap-2 rounded-full border border-borda bg-superficie px-3 py-1 text-xs text-texto-suave"
            >
              <span aria-hidden="true" class="text-acento">→</span>
              <span><span class="font-semibold text-texto">${destaque}</span>${alvo?.texto ?? aresta.para}</span>
            </li>`;
          }),
        )
      : null;

    return html`<li class="rounded-lg border p-4 ${ESTILO[no.tipo] ?? ESTILO.acao}">
      <div class="flex items-start gap-3">
        <span class="mt-0.5 font-mono text-xs text-texto-suave">${String(indice + 1).padStart(2, '0')}</span>
        <p class="text-sm font-semibold text-texto">${no.texto}</p>
      </div>
      ${setas}
    </li>`;
  });

  const descricao =
    rotuloAcessivel ||
    emOrdem
      .map((no) => {
        const saidas = arestas
          .filter((aresta) => aresta.de === no.id)
          .map((aresta) => (aresta.rotulo ? aresta.rotulo + ' leva a ' : 'leva a ') + (porId.get(aresta.para)?.texto ?? aresta.para));
        return no.texto + (saidas.length ? '. ' + saidas.join('; ') : '');
      })
      .join('. ');

  return html`<ol class="grid gap-3 md:grid-cols-2" role="img" aria-label="${descricao}">${caixas}</ol>`;
}
