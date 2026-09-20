// views/inicio.js — a tela inicial do hub (#/inicio), no desenho "30 Inicio".
//
// A ordem da página é a do desenho:
//   cabeçalho → Próxima ação → O mapa da trilha → Como estudar → Revisão de hoje →
//   Seu progresso, módulo a módulo → Seu plano → Guardar o progresso → "Antes de tudo:"
//
// Os textos moram em src/data/inicio.js; aqui só tem a montagem e as contas, feitas
// com o SEU progresso (store.js). O router não põe o aviso de rodapé nesta página:
// ela termina com o próprio "Antes de tudo:".
//
// Recebe a lista de rotas por parâmetro (o router passa ROTAS ao montar). Isso evita
// um import circular entre router.js e esta view, já que o router precisa importar
// daqui para montar a rota "#/inicio".

import { criarCiclo } from '../components/visuais.js';
import { html, criarElemento, criarTitulo, criarBotao, mostrarToast } from '../ui.js';
import {
  obterEstado,
  atualizar,
  exportarEstado,
  importarEstado,
  progressoDoModulo,
  progressoGeral,
} from '../store.js';
import { glossario } from '../data/glossario.js';
import { cenarios } from '../data/cenarios.js';
import { inicio as textos } from '../data/inicio.js';
import { itensVencidos, ESCADA_DIAS } from '../components/revisao.js';

// ---------------------------------------------------------------------------
// Cores e estilos do desenho (os tokens do handoff)
// ---------------------------------------------------------------------------

const COR = {
  fundo: '#0B0F17',
  superficie: '#141A24',
  borda: '#1F2733',
  texto: '#E6EDF3',
  suave: '#9AA7B4',
  primaria: '#7C3AED',
  acento: '#22D3EE',
  verde: '#22C55E',
};

const FONTE_MONO = "'JetBrains Mono',ui-monospace,monospace";

// O micro-rótulo em maiúsculas ("PRÓXIMA AÇÃO", "RELAÇÃO: …").
const ROTULO_MIUDO =
  'margin:0;font-size:12px;font-weight:600;letter-spacing:.05em;text-transform:uppercase;color:#9AA7B4';

// A caixa escura dos visuais, dentro de um card.
const CAIXA = 'margin:0;border-radius:8px;border:1px solid #1F2733;background:#0B0F17;padding:16px 20px';

// As etiquetas em pílula do mapa: borda, fundo e cor do texto de cada estado.
const ETIQUETA = {
  feito: { borda: 'rgba(34,197,94,.5)', fundo: 'rgba(34,197,94,.12)', cor: COR.verde },
  comecado: { borda: 'rgba(124,58,237,.5)', fundo: 'rgba(124,58,237,.15)', cor: COR.texto },
  aFazer: { borda: COR.borda, fundo: COR.fundo, cor: COR.suave },
  aqui: { borda: COR.acento, fundo: 'rgba(34,211,238,.12)', cor: COR.acento },
  rotina: { borda: 'rgba(34,211,238,.5)', fundo: 'rgba(34,211,238,.1)', cor: COR.acento },
};

// A cor da barrinha de cada módulo no mapa.
const COR_DA_BARRA = { feito: COR.verde, comecado: COR.primaria, aFazer: COR.borda };

// "1, 3, 7, 16 e 35" — a escada da Revisão, escrita por extenso.
const DIAS_POR_EXTENSO =
  ESCADA_DIAS.slice(0, -1).join(', ') + ' e ' + ESCADA_DIAS[ESCADA_DIAS.length - 1];

// ---------------------------------------------------------------------------
// Peças pequenas, usadas por vários blocos
// ---------------------------------------------------------------------------

// Um card da página: raio 12, superfície, borda e 20px de respiro.
function criarCardDoInicio(rotulo, filhos, { espaco = 16, borda = COR.borda } = {}) {
  return html`<section aria-label="${rotulo}" style="border-radius:12px;border:1px solid ${borda};background:#141A24;padding:20px;display:flex;flex-direction:column;gap:${espaco}px">${filhos}</section>`;
}

// O topo do card: h2 à esquerda e, à direita, um rótulo ou uma contagem.
function criarTopoDoCard(titulo, direita = null) {
  return html`<div style="display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;align-items:baseline">
    <h2 style="margin:0;font-size:1.125rem;font-weight:600">${titulo}</h2>
    ${direita}
  </div>`;
}

function criarRotuloMiudo(texto) {
  return html`<span style="${ROTULO_MIUDO}">${texto}</span>`;
}

// Um quadradinho de cor + texto, para as legendas.
function criarItemDaLegenda(cor, texto, largura = 12) {
  return html`<span style="display:inline-flex;align-items:center;gap:6px"><span aria-hidden="true" style="width:${largura}px;height:12px;border-radius:3px;background:${cor}"></span>${texto}</span>`;
}

// Troca as lacunas {chave} de um texto de src/data/inicio.js pelos valores.
// Ex.: preencher('Revisar {n} perguntas', { n: 4 }) → 'Revisar 4 perguntas'.
function preencher(modelo, valores = {}) {
  return modelo.replace(/\{(\w+)\}/g, (lacuna, chave) => (chave in valores ? String(valores[chave]) : lacuna));
}

// Escolhe a forma do singular (n = 1) ou do plural e preenche {n} e o resto.
// Ex.: contar(1, { um: '1 vencida', varios: '{n} vencidas' }) → '1 vencida'.
function contar(n, formas, valores = {}) {
  return preencher(n === 1 ? formas.um : formas.varios, { n, ...valores });
}

// ---------------------------------------------------------------------------
// As contas: o seu progresso, lido do store
// ---------------------------------------------------------------------------

// Tudo o que a tela precisa saber do progresso, calculado uma vez.
function lerSituacao(estado, modulos) {
  const concluidos = estado.modulosConcluidos ?? [];
  const quizzes = estado.quizzes ?? {};
  return {
    estado,
    modulos,
    total: modulos.length,
    concluidos: concluidos.filter((id) => modulos.some((rota) => rota.id === id)).length,
    // Só os quizzes finais dos módulos contam; as perguntas rápidas das seções
    // não gravam, mas o filtro protege a conta de qualquer id que não seja módulo.
    quizzesFeitos: Object.keys(quizzes).filter((id) => modulos.some((rota) => rota.id === id)).length,
    percentualGeral: progressoGeral(modulos.map((rota) => rota.id), estado),
    vencidos: itensVencidos().length,
    naFila: Object.keys(estado.revisao?.itens ?? {}).length,
    termos: Object.keys(estado.glossario ?? {}).length,
    cenariosFeitos: Object.keys(estado.simulador?.escolhas ?? {}).length,
    quizDe: (id) => quizzes[id] ?? null,
    concluido: (id) => concluidos.includes(id),
  };
}

// Título curto, descrição e "Módulo N" do desenho; sem texto no dado, usa a rota.
function dadosDoModulo(rota) {
  return textos.trilha.modulos[rota.id] ?? { curto: rota.curto, titulo: rota.titulo, descricao: rota.descricao };
}

// A próxima ação: um botão só, escolhido pela primeira regra que se aplica.
// Devolve { regra (1 a 5), texto, detalhe, href, botao }. Meta concreta e única
// rende mais que meta vaga (Locke & Latham, 2002).
function calcularProximaAcao(situacao) {
  const acoes = textos.proximaAcao.acoes;

  // Regra 1: a revisão vencida vem antes de conteúdo novo.
  if (situacao.vencidos > 0) {
    const { titulo, detalhe, botao } = acoes.revisar;
    return { regra: 1, texto: contar(situacao.vencidos, titulo), detalhe, href: '#/revisao', botao };
  }

  // Regras 2 a 4: o primeiro módulo, na ordem, que ainda pede alguma coisa.
  for (const rota of situacao.modulos) {
    const quiz = situacao.quizDe(rota.id);
    const modulo = dadosDoModulo(rota);
    if (!quiz) {
      const { titulo, detalhe, botao } = acoes.continuar;
      return { regra: 2, texto: preencher(titulo, { modulo: modulo.titulo }), detalhe, href: rota.hash, botao };
    }
    if (quiz.total && quiz.acertos / quiz.total < 0.8) {
      const { titulo, acertos, detalhe, botao } = acoes.refazerQuiz;
      return {
        regra: 3,
        texto: preencher(titulo, { modulo: modulo.curto }),
        detalhe: preencher(acertos, { acertos: quiz.acertos, total: quiz.total }) + ' ' + detalhe,
        href: rota.hash,
        botao,
      };
    }
    if (!situacao.concluido(rota.id)) {
      const { titulo, detalhe, botao } = acoes.concluir;
      return { regra: 4, texto: preencher(titulo, { modulo: modulo.titulo }), detalhe, href: rota.hash, botao };
    }
  }

  // Regra 5: tudo concluído.
  const { titulo, detalhe, botao, href } = acoes.simulador;
  return { regra: 5, texto: titulo, detalhe, href, botao };
}

// ---------------------------------------------------------------------------
// 1. Próxima ação
// ---------------------------------------------------------------------------

// O anel: quantos módulos estão concluídos, de quantos. O arco é a fração dos
// módulos concluídos; a legenda embaixo é o percentual da trilha (acerto + conclusão).
function criarAnel(situacao) {
  const anel = textos.proximaAcao.anel;
  const { concluidos, total } = situacao;
  const valores = { concluidos, total, percentual: Math.round(situacao.percentualGeral) };
  const volta = 2 * Math.PI * 50; // o comprimento do círculo de raio 50
  const arco = total ? (volta * concluidos) / total : 0;
  // O arco roxo é sempre desenhado, como no desenho. Com zero concluídos ele tem
  // tamanho zero, e a ponta redonda aparece como um ponto roxo às 12h.
  return html`<figure style="flex:0 0 auto;margin:0;display:flex;flex-direction:column;align-items:center;gap:6px">
    <svg viewBox="0 0 120 120" width="120" height="120" role="img" aria-label="${preencher(anel.descricao, valores)}">
      <circle cx="60" cy="60" r="50" fill="none" stroke="#1F2733" stroke-width="10"></circle>
      <circle cx="60" cy="60" r="50" fill="none" stroke="#7C3AED" stroke-width="10" stroke-linecap="round" stroke-dasharray="${arco.toFixed(1) + ' ' + volta.toFixed(1)}" transform="rotate(-90 60 60)"></circle>
      <text x="60" y="58" text-anchor="middle" fill="#E6EDF3" font-size="26" font-weight="700" font-family="JetBrains Mono, monospace">${concluidos}</text>
      <text x="60" y="78" text-anchor="middle" fill="#9AA7B4" font-size="11" font-family="Inter, sans-serif">${preencher(anel.centro, valores)}</text>
    </svg>
    <figcaption style="font-size:13px;color:#9AA7B4">${preencher(anel.legenda, valores)}</figcaption>
  </figure>`;
}

// O <details> "Como esta ação é escolhida": as 5 regras ligadas por um traço,
// com a regra que vale agora em ciano.
function criarRegras(regraAtiva) {
  const dados = textos.proximaAcao;
  const itens = dados.regras.map((texto, i) => {
    const ativa = i + 1 === regraAtiva;
    const liga = i < dados.regras.length - 1;
    return html`<li style="display:flex;flex-direction:column" aria-current="${ativa ? 'true' : null}">
      <div style="border-radius:8px;border:1px solid ${ativa ? COR.acento : COR.borda};background:${ativa ? 'rgba(34,211,238,.1)' : COR.superficie};padding:8px 12px;display:flex;gap:10px;align-items:flex-start">
        <span aria-hidden="true" style="flex:0 0 22px;width:22px;height:22px;border-radius:50%;background:${ativa ? COR.acento : COR.borda};color:${ativa ? COR.fundo : COR.texto};font-family:${FONTE_MONO};font-size:12px;font-weight:700;display:inline-flex;align-items:center;justify-content:center">${i + 1}</span>
        <span style="min-width:0;font-size:13px;color:${ativa ? COR.texto : COR.suave}">${texto}</span>
      </div>
      ${liga ? html`<span aria-hidden="true" style="width:2px;height:10px;background:#1F2733;margin-left:22px"></span>` : null}
    </li>`;
  });
  // O <summary> ganha 11px de padding em cima e embaixo, compensados por margem
  // negativa: o desenho não muda, e o alvo de clique passa a ter 44px.
  return html`<details style="border-radius:8px;border:1px solid rgba(124,58,237,.4);background:#0B0F17;padding:12px 16px">
    <summary style="cursor:pointer;font-size:14px;font-weight:600;padding:11px 0;margin:-11px 0">${dados.tituloDasRegras}</summary>
    <ol style="margin:8px 0 0;padding:0;list-style:none;display:flex;flex-direction:column">${itens}</ol>
    <p style="margin:10px 0 0;font-size:13px;color:#9AA7B4">${dados.fechamentoDasRegras}</p>
  </details>`;
}

// O bloco dominante da página. No celular (abaixo de 640px) o anel desce para
// baixo do botão e o título diminui — por CSS, sem medir a tela.
function criarProximaAcao(acao, situacao) {
  const dados = textos.proximaAcao;
  return html`<section aria-label="${dados.rotulo}" style="border-radius:12px;border:1px solid #7C3AED;background:rgba(124,58,237,.15);padding:24px;display:flex;flex-direction:column;gap:16px">
    <p style="${ROTULO_MIUDO}">${dados.rotulo}</p>
    <div class="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
      <div style="flex:1 1 auto;min-width:0;display:flex;flex-direction:column;gap:10px">
        <p class="text-xl sm:text-2xl" style="margin:0;font-weight:600;line-height:1.2;text-wrap:pretty">${acao.texto}</p>
        <p style="margin:0;font-size:15px;color:#9AA7B4">${acao.detalhe}</p>
        <a href="${acao.href}" class="hover:opacity-85" style="align-self:flex-start;min-height:44px;display:inline-flex;align-items:center;border-radius:8px;border:1px solid #7C3AED;background:#7C3AED;color:#FFFFFF;padding:10px 20px;font-size:15px;font-weight:600;text-decoration:none">${acao.botao} →</a>
      </div>
      ${criarAnel(situacao)}
    </div>
    <p style="margin:0;font-size:13px;color:#9AA7B4">${dados.nota}</p>
    ${criarRegras(acao.regra)}
  </section>`;
}

// ---------------------------------------------------------------------------
// 2. O mapa da trilha
// ---------------------------------------------------------------------------

// Um item do mapa: marcador redondo, título, etiqueta, descrição e (nos módulos)
// a barrinha do percentual. O item inteiro é o link.
//   item: { href, marca, titulo, descricao, etiqueta, tom, aqui, classeDaBorda,
//           fundo, marcaFundo, marcaCor, percentual?, corDaBarra?, liga }
function criarItemDaTrilha(item) {
  const tom = ETIQUETA[item.tom];
  const barra =
    item.percentual === undefined
      ? null
      : html`<span style="display:block;margin-top:8px;height:6px;border-radius:999px;background:#1F2733;overflow:hidden"><span style="display:block;height:100%;width:${Math.max(0, Math.min(100, item.percentual))}%;border-radius:999px;background:${item.corDaBarra}"></span></span>`;
  // A cor da borda vai por classe (e não no style) para o hover poder trocá-la.
  return html`<li style="display:flex;flex-direction:column">
    <a href="${item.href}" aria-current="${item.aqui ? 'step' : null}" class="${'border transition-colors duration-150 hover:border-texto-suave ' + item.classeDaBorda}" style="border-radius:8px;background:${item.fundo};padding:12px 16px;text-decoration:none;color:#E6EDF3;display:flex;gap:12px;align-items:flex-start;min-height:44px">
      <span aria-hidden="true" style="flex:0 0 28px;width:28px;height:28px;border-radius:50%;background:${item.marcaFundo};color:${item.marcaCor};font-family:${FONTE_MONO};font-size:13px;font-weight:700;display:inline-flex;align-items:center;justify-content:center">${item.marca}</span>
      <span style="flex:1 1 auto;min-width:0">
        <span style="display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;align-items:baseline">
          <span style="font-size:15px;font-weight:600">${item.titulo}</span>
          <span style="border-radius:999px;border:1px solid ${tom.borda};background:${tom.fundo};color:${tom.cor};padding:1px 10px;font-size:12px;font-weight:600;white-space:nowrap">${item.etiqueta}</span>
        </span>
        <span style="display:block;margin-top:4px;font-size:13px;color:#9AA7B4">${item.descricao}</span>
        ${barra}
      </span>
    </a>
    ${item.liga ? html`<span aria-hidden="true" style="width:2px;height:12px;background:#1F2733;margin-left:27px"></span>` : null}
  </li>`;
}

// Os 7 módulos: concluído (verde), começado (quiz respondido, roxo), a fazer
// (cinza) e "Você está aqui" (ciano) no módulo da próxima ação.
function itensDosModulos(situacao, acao) {
  const etiquetas = textos.trilha.etiquetas;
  return situacao.modulos.map((rota, i) => {
    const modulo = dadosDoModulo(rota);
    const feito = situacao.concluido(rota.id);
    const comecado = Boolean(situacao.quizDe(rota.id));
    const estadoDoModulo = feito ? 'feito' : comecado ? 'comecado' : 'aFazer';
    const aqui = rota.hash === acao.href;
    return {
      href: rota.hash,
      marca: String(i + 1),
      titulo: modulo.titulo,
      descricao: modulo.descricao,
      etiqueta: aqui ? etiquetas.aqui : etiquetas[estadoDoModulo],
      tom: aqui ? 'aqui' : estadoDoModulo,
      aqui,
      classeDaBorda: aqui ? 'border-acento' : feito ? 'border-risco-baixo/50' : 'border-borda',
      fundo: aqui ? 'rgba(34,211,238,.08)' : COR.superficie,
      marcaFundo: feito ? COR.verde : aqui ? COR.acento : COR.borda,
      marcaCor: feito || aqui ? COR.fundo : COR.texto,
      // O mesmo percentual das barras de progresso (store.js: acerto + conclusão).
      percentual: progressoDoModulo(rota.id, situacao.estado),
      corDaBarra: COR_DA_BARRA[estadoDoModulo],
      liga: true,
    };
  });
}

// As duas rotas de uso contínuo: o Checklist (rotina) e a Revisão (vencidas ou em dia).
function itensDasRotas(situacao) {
  const { checklist, revisao } = textos.trilha;
  const temVencidas = situacao.vencidos > 0;
  // A frase depois da descrição da Revisão: o tamanho da fila; sem fila, a do
  // desenho — ou, se já há quiz feito, a mesma do card Revisão de hoje (as
  // perguntas desses quizzes entram na fila quando a Revisão é aberta).
  let fila;
  if (situacao.naFila > 0) fila = preencher(revisao.naFila, { n: situacao.naFila });
  else if (situacao.quizzesFeitos > 0) fila = textos.revisaoDeHoje.abrirUmaVez;
  else fila = revisao.filaVazia;
  return [
    {
      href: checklist.href,
      marca: checklist.marca,
      titulo: checklist.titulo,
      descricao: checklist.descricao,
      etiqueta: checklist.etiqueta,
      tom: 'rotina',
      aqui: false,
      classeDaBorda: 'border-borda',
      fundo: COR.superficie,
      marcaFundo: COR.borda,
      marcaCor: COR.texto,
      liga: true,
    },
    {
      href: revisao.href,
      marca: revisao.marca,
      titulo: revisao.titulo,
      descricao: revisao.descricao + ' ' + fila,
      etiqueta: temVencidas ? contar(situacao.vencidos, textos.vencidas) : revisao.emDia,
      // Com vencidas, a Revisão é "onde você está" (a próxima ação é revisar).
      tom: temVencidas ? 'aqui' : 'feito',
      aqui: temVencidas,
      classeDaBorda: temVencidas ? 'border-acento' : 'border-borda',
      fundo: temVencidas ? 'rgba(34,211,238,.08)' : COR.superficie,
      marcaFundo: COR.borda,
      marcaCor: COR.texto,
      liga: false,
    },
  ];
}

function criarMapaDaTrilha(situacao, acao) {
  const dados = textos.trilha;
  const modulos = itensDosModulos(situacao, acao);
  const rotas = itensDasRotas(situacao);
  // A lista em uma frase, para o leitor de tela ouvir o estado de tudo de uma vez.
  const d = dados.descricao;
  const [checklist, revisao] = rotas;
  const itens = [
    ...modulos.map((m) => preencher(d.modulo, { titulo: m.titulo, etiqueta: m.etiqueta, percentual: Math.round(m.percentual) })),
    preencher(d.rota, { titulo: checklist.titulo, etiqueta: checklist.etiqueta.toLowerCase() }),
    preencher(d.rota, { titulo: revisao.titulo, etiqueta: revisao.etiqueta }),
  ];
  const descricao = preencher(d.modelo, { itens: itens.join('; ') });
  return criarCardDoInicio(dados.rotuloDaSecao, [
    criarTopoDoCard(dados.titulo, criarRotuloMiudo(dados.rotulo)),
    html`<p style="margin:0;color:#9AA7B4">${dados.texto}</p>`,
    html`<div style="border-radius:8px;border:1px solid #1F2733;background:#0B0F17;padding:20px">
      <ol role="list" aria-label="${descricao}" style="list-style:none;margin:0;padding:0;display:flex;flex-direction:column">${[...modulos, ...rotas].map(criarItemDaTrilha)}</ol>
      <div style="margin-top:14px;display:flex;flex-wrap:wrap;gap:14px;font-size:13px;color:#9AA7B4">
        ${criarItemDaLegenda(COR.verde, dados.legenda.feito)}
        ${criarItemDaLegenda(COR.primaria, dados.legenda.comecado)}
        ${criarItemDaLegenda(COR.borda, dados.legenda.aFazer)}
        ${criarItemDaLegenda(COR.acento, dados.legenda.aqui)}
      </div>
    </div>`,
  ]);
}

// ---------------------------------------------------------------------------
// 3. Como estudar
// ---------------------------------------------------------------------------

// A escada dos intervalos: uma barra por degrau, todas na mesma escala (o maior
// intervalo é a barra cheia).
function criarEscada() {
  const dados = textos.comoEstudar;
  const maior = ESCADA_DIAS[ESCADA_DIAS.length - 1];
  const itens = ESCADA_DIAS.map((dias, i) => contar(dias, dados.descricaoDaEscada.item, { degrau: i + 1 }));
  const descricao = preencher(dados.descricaoDaEscada.modelo, { itens: itens.join('; ') });
  const degraus = ESCADA_DIAS.map(
    (dias, i) => html`<div>
      <div style="display:flex;justify-content:space-between;gap:12px;align-items:baseline"><span style="font-size:13px;color:#9AA7B4">${preencher(dados.degrau, { n: i + 1 })}</span><span style="font-family:${FONTE_MONO};font-size:13px">${contar(dias, dados.intervalo)}</span></div>
      <div style="margin-top:4px;height:14px;background:#141A24;border-radius:3px;overflow:hidden"><div style="height:100%;width:${(dias / maior) * 100}%;background:#7C3AED"></div></div>
    </div>`,
  );
  return html`<figure style="${CAIXA}">
    <p style="margin:0 0 10px;font-size:14px;font-weight:600">${dados.tituloDaEscada}</p>
    <div role="img" aria-label="${descricao}" style="display:flex;flex-direction:column;gap:10px">${degraus}</div>
    <figcaption style="margin-top:10px;font-size:13px;color:#9AA7B4">${dados.legendaDaEscada}</figcaption>
  </figure>`;
}

function criarComoEstudar() {
  const dados = textos.comoEstudar;
  // O laço do estudo: ler, responder e revisar, voltando ao começo. Geometria do
  // desenho "30 Inicio": palco de 340px, raio 112, caixas de 118px, sem centro.
  const [ler, responder, revisar] = dados.etapas;
  const ciclo = criarCiclo({
    etapas: [
      { titulo: ler },
      { titulo: responder },
      { titulo: revisar, detalhe: preencher(dados.detalheDoRevisar, { dias: ESCADA_DIAS.join(' · ') }) },
    ],
    tamanho: 340,
    raio: 112,
    larguraDaCaixa: 118,
    margem: 9,
    descricao: preencher(dados.descricaoDoCiclo, { ler, responder, revisar, dias: DIAS_POR_EXTENSO }),
  });
  return criarCardDoInicio(dados.titulo, [
    criarTopoDoCard(dados.titulo, criarRotuloMiudo(dados.rotulo)),
    html`<p style="margin:0;border-left:2px solid #22D3EE;padding-left:12px;font-weight:600;text-wrap:pretty">${dados.ideia}</p>`,
    ciclo,
    criarEscada(),
    html`<ol style="margin:0;padding-left:20px;list-style:decimal;color:#9AA7B4;display:flex;flex-direction:column;gap:6px">${dados.passos.map((passo) => html`<li>${passo}</li>`)}</ol>`,
  ]);
}

// ---------------------------------------------------------------------------
// 4. Revisão de hoje
// ---------------------------------------------------------------------------

function criarRevisaoDeHoje(situacao) {
  const dados = textos.revisaoDeHoje;
  const { vencidos, naFila } = situacao;
  const temVencidas = vencidos > 0;

  // Um dos quatro textos, conforme a fila. As perguntas entram na fila quando o
  // quiz é corrigido — ou na primeira visita à página Revisão, para quizzes antigos.
  let texto;
  if (temVencidas) {
    texto = contar(vencidos, dados.vencidas) + ' ' + dados.vencidas.resto;
  } else if (naFila > 0) {
    texto = dados.nadaVencido;
  } else if (situacao.quizzesFeitos > 0) {
    texto = dados.abrirUmaVez;
  } else {
    texto = dados.semQuiz;
  }

  const contagem =
    naFila > 0 ? preencher(dados.contagem, { vencidas: contar(vencidos, textos.vencidas), n: naFila }) : dados.filaVazia;
  return criarCardDoInicio(
    dados.titulo,
    [
      criarTopoDoCard(
        dados.titulo,
        html`<span style="font-family:${FONTE_MONO};font-size:13px;color:#9AA7B4">${contagem}</span>`,
      ),
      html`<p style="margin:0;color:#9AA7B4">${texto}</p>`,
      html`<a href="#/revisao" class="${'border transition-colors duration-150 hover:border-texto-suave ' + (temVencidas ? 'border-acento' : 'border-borda')}" style="align-self:flex-start;min-height:44px;display:inline-flex;align-items:center;border-radius:8px;background:${temVencidas ? 'rgba(34,211,238,.1)' : COR.superficie};color:#E6EDF3;padding:8px 16px;font-size:14px;font-weight:600;text-decoration:none">${temVencidas ? dados.botaoVencidas : dados.botao} →</a>`,
    ],
    { espaco: 12, borda: temVencidas ? 'rgba(34,211,238,.5)' : COR.borda },
  );
}

// ---------------------------------------------------------------------------
// 5. Seu progresso, módulo a módulo
// ---------------------------------------------------------------------------

// Uma barra de 20px em até duas partes (ciano e verde), com o rótulo à esquerda e
// o número em mono à direita.
function criarBarraEmPartes({ rotulo, valorTexto, partes }) {
  return html`<div>
    <div style="display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;align-items:baseline"><span style="font-size:14px">${rotulo}</span><span style="font-family:${FONTE_MONO};font-size:13px;color:#9AA7B4">${valorTexto}</span></div>
    <div style="margin-top:6px;height:20px;background:#141A24;border-radius:4px;overflow:hidden;display:flex">${partes.map(
      (parte) => html`<div style="height:100%;width:${Math.max(0, Math.min(100, parte.largura))}%;background:${parte.cor}" title="${parte.titulo}"></div>`,
    )}</div>
  </div>`;
}

// As 9 barras: os módulos (metade pelo acerto no quiz, metade pela conclusão, a
// conta de store.js) e, depois, o Glossário e o Simulador, que contam itens.
// Uma barra que conta itens (o Glossário e o Simulador): feitos de total.
//   textosDaBarra: { rotulo, valor, parte } de src/data/inicio.js
function barraDeItens(textosDaBarra, feitos, total) {
  return {
    rotulo: textosDaBarra.rotulo,
    valorTexto: preencher(textosDaBarra.valor, { feitos, total }),
    partes: [{ largura: total ? (feitos / total) * 100 : 0, cor: COR.acento, titulo: textosDaBarra.parte }],
  };
}

function barrasDoProgresso(situacao) {
  const dados = textos.progresso;
  const t = dados.modulo;
  const modulos = situacao.modulos.map((rota) => {
    const quiz = situacao.quizDe(rota.id);
    const feito = situacao.concluido(rota.id);
    const total = progressoDoModulo(rota.id, situacao.estado);
    const parteConcluida = feito ? 50 : 0;
    const detalhes = [];
    if (quiz) detalhes.push(preencher(t.quiz, { acertos: quiz.acertos, total: quiz.total }));
    if (feito) detalhes.push(t.concluido);
    return {
      rotulo: dadosDoModulo(rota).curto,
      valorTexto: detalhes.length
        ? preencher(t.valor, { percentual: Math.round(total), detalhes: detalhes.join(' · ') })
        : dados.naoComecado,
      partes: [
        { largura: total - parteConcluida, cor: COR.acento, titulo: t.parteQuiz },
        { largura: parteConcluida, cor: COR.verde, titulo: t.parteConcluida },
      ],
    };
  });
  const extras = [
    barraDeItens(dados.glossario, situacao.termos, glossario.length),
    barraDeItens(dados.simulador, situacao.cenariosFeitos, cenarios.length),
  ];
  return { modulos, extras };
}

function criarProgresso(situacao) {
  const dados = textos.progresso;
  const textoGeral = preencher(dados.geral, { percentual: Math.round(situacao.percentualGeral), total: situacao.total });
  const { modulos, extras } = barrasDoProgresso(situacao);
  const descricao = preencher(dados.descricao, {
    modulos: modulos.map((b) => b.rotulo + ' ' + b.valorTexto).join('; '),
    extras: extras.map((b) => b.rotulo + ', ' + b.valorTexto).join('; '),
  });
  const nota = preencher(dados.nota, { termos: glossario.length, cenarios: cenarios.length });

  return criarCardDoInicio(dados.rotuloDaSecao, [
    criarTopoDoCard(dados.titulo, html`<span style="font-size:14px;color:#9AA7B4">${textoGeral}</span>`),
    html`<div role="img" aria-label="${preencher(dados.descricaoDaBarraGeral, { geral: textoGeral })}" style="height:8px;border-radius:999px;background:#1F2733;overflow:hidden"><div style="height:100%;width:${Math.min(100, situacao.percentualGeral)}%;border-radius:999px;background:#7C3AED"></div></div>`,
    html`<figure style="${CAIXA}">
      <div role="img" aria-label="${descricao}" style="display:flex;flex-direction:column;gap:14px">${[...modulos, ...extras].map(criarBarraEmPartes)}</div>
      <figcaption style="margin-top:12px;display:flex;flex-wrap:wrap;gap:14px;font-size:13px;color:#9AA7B4">
        ${criarItemDaLegenda(COR.acento, dados.legendaQuiz, 22)}
        ${criarItemDaLegenda(COR.verde, dados.legendaConcluido, 22)}
        <span style="width:100%">${nota}</span>
      </figcaption>
    </figure>`,
  ]);
}

// ---------------------------------------------------------------------------
// 6. Seu plano
// ---------------------------------------------------------------------------

// Plano "quando X, eu faço Y": escrito por você, salvo no navegador. Planos assim
// aumentam a chance de cumprir uma meta (meta-análise de Gollwitzer & Sheeran,
// 2006, d = 0,65). O único teste grande em curso online achou que o plano não
// funcionou quando o obstáculo era "falta de tempo" (Kizilcec & Cohen, 2017).
function criarPlano(estado) {
  const dados = textos.plano;
  const campo = criarElemento('textarea', {
    id: 'inicio-plano',
    rows: '3',
    placeholder: dados.exemplo,
    // line-height normal: a altura de 3 linhas do campo do desenho (.omh-campo).
    style: 'line-height:normal',
    class:
      'box-border w-full rounded-lg border border-borda bg-fundo px-3 py-2.5 text-sm text-texto ' +
      'placeholder:text-texto-suave',
  });
  campo.value = estado.plano ?? '';

  const salvar = criarBotao(dados.botao, {
    variante: 'secundario',
    onclick: () => {
      const salvou = atualizar((atual) => ({ ...atual, plano: campo.value.slice(0, 2000) }));
      mostrarToast(salvou ? dados.salvou : dados.naoSalvou);
    },
  });

  return criarCardDoInicio(
    dados.rotuloDaSecao,
    [
      html`<h2 style="margin:0;font-size:1.125rem;font-weight:600">${dados.titulo}</h2>`,
      html`<p style="margin:0;color:#9AA7B4">${dados.texto}</p>`,
      html`<label for="inicio-plano" style="${ROTULO_MIUDO}">${dados.rotulo}</label>`,
      campo,
      html`<div style="display:flex;flex-wrap:wrap;gap:12px;align-items:center">${salvar}<span style="font-size:13px;color:#9AA7B4">${dados.nota}</span></div>`,
    ],
    { espaco: 12 },
  );
}

// ---------------------------------------------------------------------------
// 7. Guardar o progresso
// ---------------------------------------------------------------------------

// Uma seta do diagrama, com o nome da ação embaixo. No celular as caixas
// empilham, e a seta aponta para baixo.
function criarSetaDoDiagrama(rotulo) {
  return html`<span aria-hidden="true" style="display:flex;flex-direction:column;align-items:center;color:#9AA7B4;padding:6px 10px;font-size:12px"><span class="sm:hidden" style="font-size:18px">↓</span><span class="hidden sm:inline" style="font-size:18px">→</span>${rotulo}</span>`;
}

// O caminho do arquivo: o progresso sai do navegador num .json e entra em outro.
function criarDiagramaDeExportar() {
  const d = textos.guardar.diagrama;
  const caixa = 'border-radius:8px;border:1px solid #1F2733;background:#141A24;padding:10px 14px;font-size:14px;text-align:center';
  return html`<figure style="${CAIXA}">
    <div role="img" aria-label="${d.descricao}" class="flex flex-col items-center justify-center sm:flex-row">
      <div style="${caixa}">${d.origem}</div>
      ${criarSetaDoDiagrama(d.exportar)}
      <div style="border-radius:8px;border:1px solid #22D3EE;background:rgba(34,211,238,.1);padding:10px 14px;font-size:14px;text-align:center;font-family:${FONTE_MONO}">${d.arquivo[0]}<span style="color:#9AA7B4">${d.arquivo[1]}</span>${d.arquivo[2]}</div>
      ${criarSetaDoDiagrama(d.importar)}
      <div style="${caixa}">${d.destino}</div>
    </div>
  </figure>`;
}

// A data de hoje em AAAA-MM-DD, pelo relógio do seu computador. (toISOString()
// usa o horário de Greenwich: em Brasília, depois das 21h, já daria o dia seguinte.)
function dataDeHoje() {
  const hoje = new Date();
  const doisDigitos = (numero) => String(numero).padStart(2, '0');
  return hoje.getFullYear() + '-' + doisDigitos(hoje.getMonth() + 1) + '-' + doisDigitos(hoje.getDate());
}

// Exportar e importar: sem servidor nem conta, é o único jeito de o progresso
// sobreviver a uma limpeza do navegador ou ir para outro computador.
function exportar() {
  // "omh-progresso-" + a data + ".json": as duas pontas vêm do diagrama.
  const [comeco, , fim] = textos.guardar.diagrama.arquivo;
  const blob = new Blob([exportarEstado()], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = criarElemento('a', {
    href: url,
    download: comeco + dataDeHoje() + fim,
  });
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function criarGuardar() {
  const dados = textos.guardar;
  const entradaDeArquivo = criarElemento('input', {
    type: 'file',
    accept: 'application/json,.json',
    class: 'sr-only',
    tabindex: '-1',
    'aria-label': dados.escolherArquivo,
    onchange: (evento) => {
      const arquivo = evento.target.files?.[0];
      if (!arquivo) return;
      arquivo.text().then((texto) => {
        if (importarEstado(texto)) {
          mostrarToast(dados.importou);
          // Recarrega a página para tudo ler o progresso novo — mas só depois de
          // o aviso aparecer (recarregando na hora, ele sumia antes de ser visto).
          setTimeout(() => location.reload(), 1200);
        } else {
          mostrarToast(dados.arquivoInvalido);
        }
      });
    },
  });

  return criarCardDoInicio(
    dados.titulo,
    [
      html`<h2 style="margin:0;font-size:1.125rem;font-weight:600">${dados.titulo}</h2>`,
      html`<p style="margin:0;color:#9AA7B4">${dados.texto}</p>`,
      criarDiagramaDeExportar(),
      criarElemento('div', { style: 'display:flex;flex-wrap:wrap;gap:12px' }, [
        criarBotao(dados.botaoExportar, { variante: 'secundario', onclick: exportar }),
        criarBotao(dados.botaoImportar, { variante: 'secundario', onclick: () => entradaDeArquivo.click() }),
        entradaDeArquivo,
      ]),
    ],
    { espaco: 12 },
  );
}

// ---------------------------------------------------------------------------
// A página
// ---------------------------------------------------------------------------

// O fecho âmbar: "Antes de tudo:". É o último bloco da página, como no desenho.
function criarAntesDeTudo() {
  const dados = textos.antesDeTudo;
  return html`<p style="margin:0;border-radius:12px;border:1px solid rgba(245,158,11,.4);background:rgba(245,158,11,.12);padding:16px;font-size:14px;color:#9AA7B4"><strong style="color:#E6EDF3">${dados.rotulo}</strong>${dados.texto}</p>`;
}

export function montarInicio(rotas = []) {
  const estado = obterEstado();
  const modulos = rotas.filter((rota) => rota.tipo === 'modulo' && rota.disponivel);
  const situacao = lerSituacao(estado, modulos);
  const acao = calcularProximaAcao(situacao);

  const dados = textos.cabecalho;
  const cabecalho = criarTitulo(dados.titulo, { rotulo: dados.rotulo, subtitulo: dados.subtitulo });
  // A coluna do router já separa os blocos por 24px; a margem do cabeçalho dobraria.
  cabecalho.classList.remove('mb-6');
  // Como no desenho: o subtítulo quebra as linhas sem deixar uma palavra sozinha.
  cabecalho.lastElementChild.style.textWrap = 'pretty';

  // Um fragmento: a coluna do router (.omh-coluna) põe os 24px entre os blocos.
  const pagina = document.createDocumentFragment();
  pagina.append(
    cabecalho,
    criarProximaAcao(acao, situacao),
    criarMapaDaTrilha(situacao, acao),
    criarComoEstudar(),
    criarRevisaoDeHoje(situacao),
    criarProgresso(situacao),
    criarPlano(estado),
    criarGuardar(),
    criarAntesDeTudo(),
  );
  return pagina;
}
