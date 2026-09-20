// animacoes/motor.js — o motor das animações do hub (contrato da Fase 4 do desenho).
//
// Uma animação aqui não é vídeo: é um PALCO (HTML + SVG) que muda de estado a
// cada CENA. O motor cuida de tudo o que é igual nas seis animações:
//   - o cabeçalho: sobrancelha "Animação N · Módulo M · X s", o título e o
//     parágrafo de fonte (o `descricao` que cada animação passa);
//   - a moldura (card #141A24): no topo, "cena N de T" e a caixa
//     "Reduzir movimento: cenas paradas, lado a lado";
//   - o palco focável (espaço toca/pausa, ← → trocam a cena, Home/End vão ao
//     começo/fim), a legenda em aria-live, os botões e a barra de cenas;
//   - o modo "cenas paradas": a caixa marcada (ou o sistema pedindo menos
//     movimento) TROCA palco, legenda, botões e barra por uma grade de
//     miniaturas simples, uma por cena;
//   - "Ler como texto": a lista das cenas, "legenda — texto alternativo".
//
// Cada animação (um arquivo em src/components/animacoes/) só diz o que muda:
// as cenas, o palco e, se quiser, a miniatura de cada cena.
//
// Os desenhos de referência: pesquisa/design/handoff/designs/Animacao N - *.dc.html.

import { html } from '../../ui.js';

// ---------------------------------------------------------------------------
// Utilitários comuns, usados pelos palcos
// ---------------------------------------------------------------------------

// Fonte dos números, endereços e fórmulas.
export const MONO = "font-family:'JetBrains Mono',ui-monospace,monospace";

// Micro-rótulo de seção: 12px, 600, maiúsculas, cinza.
export const ROTULO_MIUDO =
  'margin:0;font-size:12px;font-weight:600;letter-spacing:.05em;text-transform:uppercase;color:#9AA7B4';

// Pílula âmbar "exemplo inventado" (ou "endereços inventados"): o estilo da marca.
export const PILULA_INVENTADO =
  'border-radius:999px;border:1px solid rgba(245,158,11,.4);background:rgba(245,158,11,.12);color:#F59E0B;padding:1px 10px;font-size:12px;font-weight:600';

// Os trios de estado do handoff: borda (b), fundo (f) e cor do texto (c).
export const NOTA = {
  neutro: { b: '#1F2733', f: '#141A24', c: '#9AA7B4' },
  alerta: { b: 'rgba(239,68,68,.5)', f: 'rgba(239,68,68,.12)', c: '#F87171' },
  atencao: { b: 'rgba(245,158,11,.4)', f: 'rgba(245,158,11,.12)', c: '#F59E0B' },
  ok: { b: 'rgba(34,197,94,.5)', f: 'rgba(34,197,94,.12)', c: '#22C55E' },
};

// Número com duas casas e vírgula decimal: 1.0541 → "1,05".
export function fmt(v) {
  return Number(v).toFixed(2).replace('.', ',');
}

// Card de nota (a explicação da cena). Devolve { el, aplicar(titulo, texto, tom) }.
export function criarNota() {
  const el = html`<div style="border-radius:8px;border:1px solid #1F2733;background:#141A24;padding:12px 14px">
    <p style="${ROTULO_MIUDO}"></p>
    <p style="margin:4px 0 0;font-size:14px;line-height:1.5;color:#E6EDF3"></p>
  </div>`;
  const [titulo, texto] = el.querySelectorAll('p');
  return {
    el,
    aplicar(t, corpo, tom = 'neutro') {
      const n = NOTA[tom] ?? NOTA.neutro;
      el.style.borderColor = n.b;
      el.style.background = n.f;
      titulo.textContent = t;
      titulo.style.color = n.c;
      texto.textContent = corpo;
    },
  };
}

// true quando o sistema operacional pediu menos movimento.
export function movimentoReduzido() {
  return Boolean(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
}

// ---------------------------------------------------------------------------
// O motor
// ---------------------------------------------------------------------------

// Rótulo que o leitor de tela lê ao entrar no palco (texto do desenho).
const ROTULO_DO_PALCO = 'Palco da animação. Espaço toca ou pausa; setas trocam a cena.';

// Cada animação ganha um id próprio (o título nomeia a moldura).
let proximoId = 0;

/**
 * Monta uma animação completa.
 *
 * @param {object}   p
 * @param {string}   p.titulo             título da animação (o h1 do desenho)
 * @param {Array}    p.cenas              [{ legenda, alt, ...o que o palco precisa }]
 * @param {Function} p.criarPalco         () => { el, aplicar(cena, indice) }
 * @param {number}   [p.numero]           "Animação N" da sobrancelha
 * @param {number}   [p.modulo]           "Módulo M" da sobrancelha
 * @param {number}   [p.duracaoPorCena=4000]  ms de cada cena ao tocar
 * @param {number}   [p.duracaoTransicao=400] ms da transição entre cenas
 * @param {Function} [p.criarMiniatura]   (cena, indice) => Node, ou { desenho, canto }:
 *                                        o desenho mínimo da cena no modo parado
 * @param {number}   [p.larguraMiniatura=230] largura mínima de cada miniatura (px)
 * @param {string|Node} [p.descricao]    o parágrafo de fonte embaixo do título, como no
 *                                        desenho. Texto, ou um pedaço de html`` quando a
 *                                        frase leva uma pílula no meio (ex.: Address poisoning)
 * @param {boolean}  [p.exemploInventado] (antigo) pílula "exemplo inventado" no cabeçalho.
 *                                        O desenho não usa: a marca fica junto do número
 * @param {string}   [p.nota]             (antigo) parágrafo miúdo no pé. O desenho não tem;
 *                                        a fonte vai no parágrafo `descricao`
 * @returns {HTMLElement}
 */
export function criarAnimacao({
  titulo,
  cenas,
  criarPalco,
  numero = null,
  modulo = null,
  duracaoPorCena = 4000,
  duracaoTransicao = 400,
  criarMiniatura = null,
  larguraMiniatura = 230,
  descricao = null,
  exemploInventado = false,
  nota = null,
}) {
  const total = cenas.length;
  const id = 'omh-anim-' + ++proximoId;
  let atual = 0;
  let timer = null;

  // --- O palco: um grupo focável (as teclas) com a imagem dentro (o alt). ---
  const palco = criarPalco();
  palco.el.setAttribute('role', 'img');
  const grupo = html`<div class="omh-anim-palco" tabindex="0" role="group" aria-label="${ROTULO_DO_PALCO}">${palco.el}</div>`;

  const legenda = html`<p class="omh-anim-legenda" aria-live="polite"></p>`;

  // --- Os botões. As setas são desenho: o leitor de tela não as lê. ---
  const botaoVoltar = html`<button type="button" class="omh-anim-botao"><span aria-hidden="true">←</span> Voltar cena</button>`;
  const botaoTocar = html`<button type="button" class="omh-anim-botao omh-anim-botao--tocar" aria-pressed="false">Tocar</button>`;
  const botaoAvancar = html`<button type="button" class="omh-anim-botao">Avançar cena <span aria-hidden="true">→</span></button>`;
  const controles = html`<div class="omh-anim-controles">${botaoVoltar}${botaoTocar}${botaoAvancar}</div>`;

  // --- A barra de cenas: um botão por cena, com traço e número. ---
  const segmentos = cenas.map((cena, i) => {
    const botao = html`<button type="button" class="omh-anim-segmento" aria-label="Cena ${i + 1}: ${cena.legenda}" data-indice="${i}">
      <span class="omh-anim-segmento-traco" aria-hidden="true"></span>
      <span class="omh-anim-segmento-numero" aria-hidden="true">${i + 1}</span>
    </button>`;
    botao.addEventListener('click', () => ir(i));
    return botao;
  });
  const barra = html`<ol class="omh-anim-barra" aria-label="Cenas">${segmentos.map((b) => html`<li>${b}</li>`)}</ol>`;

  // Tudo o que some no modo "cenas paradas".
  const animado = html`<div class="omh-anim-animado">${grupo}${legenda}${controles}${barra}</div>`;

  // --- O modo "cenas paradas": grade de miniaturas, montada só quando pedida. ---
  const paradas = html`<div class="omh-anim-paradas" hidden></div>`;
  paradas.style.gridTemplateColumns = `repeat(auto-fill,minmax(min(${larguraMiniatura}px,100%),1fr))`;

  // --- O topo da moldura: contador à esquerda, caixa de marcar à direita. ---
  const contador = html`<span class="omh-anim-contador"></span>`;
  const rotuloReduzir = html`<label class="omh-anim-reduzir"><input type="checkbox">Reduzir movimento: cenas paradas, lado a lado</label>`;
  const caixaReduzir = rotuloReduzir.querySelector('input');

  // --- "Ler como texto": as cenas em ordem, "legenda — texto alternativo". ---
  const lerComoTexto = html`<details class="omh-anim-texto">
    <summary>Ler como texto</summary>
    <ol>${cenas.map((c) => html`<li>${c.alt ? c.legenda + ' — ' + c.alt : c.legenda}</li>`)}</ol>
  </details>`;

  const moldura = html`<section class="omh-anim-moldura" aria-labelledby="${id}-titulo">
    <div class="omh-anim-topo">${contador}${rotuloReduzir}</div>
    ${animado}
    ${paradas}
    ${lerComoTexto}
  </section>`;

  const raiz = html`<div class="omh-anim mt-4">
    ${criarCabecalho({ id, titulo, numero, modulo, total, duracaoPorCena, descricao, exemploInventado })}
    ${moldura}
    ${nota ? html`<p class="omh-anim-nota">${nota}</p>` : ''}
  </div>`;

  // --- O comportamento ---

  function pintarBotaoTocar() {
    botaoTocar.setAttribute('aria-pressed', String(Boolean(timer)));
    if (timer) botaoTocar.textContent = 'Pausar';
    else botaoTocar.textContent = atual === total - 1 ? 'Tocar de novo' : 'Tocar';
  }

  // Desenha a cena atual em tudo: palco, alt, legenda, contador e barra.
  function pintar() {
    const cena = cenas[atual];
    palco.aplicar(cena, atual);
    palco.el.setAttribute('aria-label', cena.alt ?? cena.legenda);
    legenda.textContent = cena.legenda;
    contador.textContent = 'cena ' + (atual + 1) + ' de ' + total;
    segmentos.forEach((botao, i) => {
      botao.setAttribute('aria-current', String(i === atual));
      // Já vista: roxo. Atual: ciano. Ainda não: cinza.
      botao.dataset.estado = i < atual ? 'vista' : i === atual ? 'atual' : 'depois';
    });
    pintarBotaoTocar();
  }

  function parar() {
    clearInterval(timer);
    timer = null;
    pintarBotaoTocar();
  }

  // Vai para a cena n (e para de tocar).
  function ir(n) {
    parar();
    atual = Math.max(0, Math.min(total - 1, n));
    pintar();
  }

  // Toca a partir da cena atual (ou do começo, se já estava na última).
  function tocar() {
    if (atual === total - 1) atual = 0;
    timer = setInterval(() => {
      // A tela mudou de rota: a animação saiu da página, então para.
      if (!raiz.isConnected || atual >= total - 1) {
        parar();
        return;
      }
      atual += 1;
      pintar();
    }, duracaoPorCena);
    pintar();
  }

  function tocarOuPausar() {
    if (timer) parar();
    else tocar();
  }

  // Liga ou desliga o modo "cenas paradas".
  function aplicarModo() {
    const parado = caixaReduzir.checked;
    if (parado) {
      parar();
      montarMiniaturas();
    }
    animado.hidden = parado;
    paradas.hidden = !parado;
    moldura.style.setProperty('--omh-anim-dur', parado ? '0ms' : duracaoTransicao + 'ms');
  }

  function montarMiniaturas() {
    if (paradas.childElementCount) return;
    cenas.forEach((cena, i) => paradas.append(criarCartaoParado(cena, i, criarMiniatura)));
  }

  botaoVoltar.addEventListener('click', () => ir(atual - 1));
  botaoAvancar.addEventListener('click', () => ir(atual + 1));
  botaoTocar.addEventListener('click', tocarOuPausar);
  caixaReduzir.addEventListener('change', aplicarModo);

  // Teclado no palco.
  grupo.addEventListener('keydown', (evento) => {
    const teclas = {
      ' ': tocarOuPausar,
      ArrowRight: () => ir(atual + 1),
      ArrowLeft: () => ir(atual - 1),
      Home: () => ir(0),
      End: () => ir(total - 1),
    };
    const acao = teclas[evento.key];
    if (!acao) return;
    evento.preventDefault();
    acao();
  });

  // Quem pediu menos movimento no sistema já começa com as cenas paradas.
  caixaReduzir.checked = movimentoReduzido();
  aplicarModo();
  pintar();

  return raiz;
}

// Sobrancelha "Animação N · Módulo M · X s", título e (se houver) o parágrafo.
function criarCabecalho({ id, titulo, numero, modulo, total, duracaoPorCena, descricao, exemploInventado }) {
  const segundos = Math.round((total * duracaoPorCena) / 1000);
  const partes = [];
  if (numero) partes.push('Animação ' + numero);
  if (modulo) partes.push('Módulo ' + modulo);
  partes.push(segundos + ' s');

  const temParagrafo = descricao || exemploInventado;
  return html`<header class="omh-anim-cabecalho">
    <p class="omh-anim-sobrancelha">${partes.join(' · ')}</p>
    <h3 class="omh-anim-titulo" id="${id}-titulo">${titulo}</h3>
    ${temParagrafo
      ? html`<p class="omh-anim-descricao">${exemploInventado ? html`<span style="${PILULA_INVENTADO}">exemplo inventado</span>` : ''}${exemploInventado && descricao ? ' ' : ''}${descricao ?? ''}</p>`
      : ''}
  </header>`;
}

// Uma célula da grade de cenas paradas: "cena N", o desenho mínimo e a legenda.
// Sem criarMiniatura, a célula fica só com o número e a legenda — nunca uma
// cópia do palco inteiro (que não cabe numa célula de 230px).
function criarCartaoParado(cena, indice, criarMiniatura) {
  const topo = html`<div class="omh-anim-miniatura-topo"><span class="omh-anim-miniatura-numero">cena ${indice + 1}</span></div>`;
  const figura = html`<figure class="omh-anim-miniatura">${topo}</figure>`;

  if (criarMiniatura) {
    const feito = criarMiniatura(cena, indice);
    const desenho = feito instanceof Node ? feito : feito?.desenho;
    const canto = feito instanceof Node ? null : feito?.canto;
    if (canto) topo.append(canto);
    if (desenho) {
      figura.append(html`<div role="img" aria-label="${cena.alt ?? cena.legenda}">${desenho}</div>`);
    }
  }

  figura.append(html`<figcaption class="omh-anim-miniatura-legenda">${cena.legenda}</figcaption>`);
  return figura;
}
