// animacoes/pool.js — Animação 1 · Pool x·y = k (Módulo 6, aba "Os números").
//
// Desenho: pesquisa/design/handoff/designs/Animacao 1 - Pool.dc.html.
// Números: src/data/modulo6.js › quanto-sai e tabelaVendaPorQueda (vende 5,41% ou
// 41,42% da reserva; recebe 2,57% ou 14,64% da liquidez anunciada). A liquidez
// de US$ 8 mil é o exemplo inventado do arquivo, e "a pool dez vezes maior" também
// vem de lá. Os dólares (≈ US$ 206, 1.171, 2.056 e 11.712) são essas porcentagens
// vezes a liquidez inventada; por isso a linha da liquidez leva a pílula.
//
// O palco, como no desenho: o gráfico da curva à esquerda; à direita, as duas
// barras (tokens e SOL), os cartões "Vende / Preço cai / Recebe" e a linha da
// liquidez. Em tela estreita as duas colunas empilham (CSS, auto-fit).
//
// A moldura, os botões, a barra de cenas, o teclado, o modo "cenas paradas" e
// "Ler como texto" são do motor (motor.js).

import { html, svg } from '../../ui.js';
import { criarAnimacao, MONO, PILULA_INVENTADO, fmt } from './motor.js';

// As 8 cenas do desenho (renderVals). x e y são as reservas (1 = antes da venda).
// Única mudança no texto: o alt da cena 7 ganhou "(exemplo inventado)", como o
// das cenas 4 e 6 (os US$ 80 mil e os US$ 2.056 também são exemplo inventado).
const V10 = '5,41';
const R10 = '2,57';
const V50 = '41,42';
const R50 = '14,64';
const CENAS = [
  { legenda: 'A pool guarda tokens de um lado e SOL do outro.', x: 1, y: 1, vende: '—', cai: '—', recebe: '—', liq: 'US$ 8 mil', dolar: '—', k: false, alt: 'Duas barras iguais: tokens e SOL. Marcador no início da curva.' },
  { legenda: 'Trocar muda os dois lados, mas o produto x·y = k fica igual.', x: 1, y: 1, vende: '—', cai: '—', recebe: '—', liq: 'US$ 8 mil', dolar: '—', k: true, alt: 'A fórmula x·y = k acende. O marcador ainda no início.' },
  { legenda: 'Você vende 5,41% da reserva. Tokens entram, SOL sai.', x: 1.0541, y: 0.9487, vende: V10 + '%', cai: '−10%', recebe: '—', liq: 'US$ 8 mil', dolar: '—', k: true, alt: 'Barra de tokens sobe para 1,05; barra de SOL cai para 0,95. O marcador desce pela curva.' },
  { legenda: 'O preço cai 10%. Você recebe 2,57% da liquidez anunciada.', x: 1.0541, y: 0.9487, vende: V10 + '%', cai: '−10%', recebe: R10 + '%', liq: 'US$ 8 mil', dolar: '≈ US$ 206', k: true, alt: 'Recebe 2,57%: cerca de US$ 206 numa liquidez de US$ 8 mil (exemplo inventado).' },
  { legenda: 'Para o preço cair pela metade, você vende 41,42% da reserva.', x: 1.4142, y: 0.7071, vende: V50 + '%', cai: '−50%', recebe: '—', liq: 'US$ 8 mil', dolar: '—', k: true, alt: 'Barra de tokens sobe para 1,41; SOL cai para 0,71. O marcador está no meio da curva.' },
  { legenda: 'E recebe só 14,64% da liquidez anunciada.', x: 1.4142, y: 0.7071, vende: V50 + '%', cai: '−50%', recebe: R50 + '%', liq: 'US$ 8 mil', dolar: '≈ US$ 1.171', k: true, alt: 'Recebe 14,64%: cerca de US$ 1.171 numa liquidez de US$ 8 mil (exemplo inventado).' },
  { legenda: 'Pool 10× maior: a porcentagem não muda. Só o dólar.', x: 1.0541, y: 0.9487, vende: V10 + '%', cai: '−10%', recebe: R10 + '%', liq: 'US$ 80 mil', dolar: '≈ US$ 2.056', k: true, alt: 'Mesmo ponto da curva, mesmos 2,57%. Com liquidez de US$ 80 mil, cerca de US$ 2.056 (exemplo inventado).' },
  { legenda: 'A curva é a mesma. Cada venda seguinte sai mais barata.', x: 1.4142, y: 0.7071, vende: V50 + '%', cai: '−50%', recebe: R50 + '%', liq: 'US$ 80 mil', dolar: '≈ US$ 11.712', k: true, alt: 'O marcador volta ao meio da curva: 14,64% da liquidez, em qualquer tamanho de pool.' },
];

// ---------------------------------------------------------------------------
// O gráfico: 320 × 220 (o viewBox do desenho). Eixo dos tokens de x = 1 a 1,6;
// eixo do SOL de y = 0,6 a 1. A curva é y = 1 / x (o produto fica igual).
// ---------------------------------------------------------------------------
const px = (x) => 40 + ((x - 1) / 0.6) * 260;
const py = (y) => 180 - ((y - 0.6) / 0.4) * 160;

let CAMINHO = '';
for (let i = 0; i <= 60; i++) {
  const x = 1 + (i / 60) * 0.6;
  CAMINHO += (i ? ' L' : 'M') + px(x).toFixed(1) + ',' + py(1 / x).toFixed(1);
}

// Os rótulos do gráfico ficam num segundo SVG, SEM viewBox, por cima do desenho.
// A posição é em porcentagem do gráfico (a mesma do desenho). Dentro do viewBox a
// letra encolheria junto com o gráfico (uns 8px no celular); aqui ela acompanha a
// largura do gráfico como no desenho (11 de 320 = 3,44% da largura: 12,4px no
// computador), mas nunca fica menor que 11px.
const emX = (x) => ((x / 320) * 100).toFixed(2) + '%';
const emY = (y) => ((y / 220) * 100).toFixed(2) + '%';
const CAMADA_DE_ROTULOS = 'position:absolute;inset:0;width:100%;height:100%;overflow:visible';
// "cqi" = 1% da largura do "container" mais próximo. O container do gráfico é a
// própria <figure> (container-type:inline-size). É CSS puro, sem medir a janela.
// --folga guarda o quanto a letra passou da proporção do desenho: zero no
// computador, uns 3px no celular. O rótulo girado do SOL usa essa folga.
const LETRA_DO_GRAFICO =
  '--letra:max(11px,3.44cqi);--folga:calc(var(--letra) - 3.44cqi);font-size:var(--letra)';

// Cada gráfico ganha um id próprio para o recorte das guias.
let proximoGrafico = 0;

// O gráfico do palco. Devolve os três pedaços que mudam de cena para cena.
function criarGrafico() {
  const recorte = 'omh-pool-area-' + ++proximoGrafico;

  // As guias tracejadas (até a base e até o eixo do SOL) são compridas e o
  // recorte corta o que passa dos eixos. Assim elas andam junto com o marcador
  // e chegam sempre certinho nos eixos, também no meio da transição.
  const guias = svg`<g class="omh-anim-transicao">
    <line x1="0" y1="0" x2="0" y2="200" stroke="#22D3EE" stroke-dasharray="3 3"></line>
    <line x1="0" y1="0" x2="-300" y2="0" stroke="#22D3EE" stroke-dasharray="3 3"></line>
  </g>`;
  // O marcador desliza pela curva: muda o transform, que tem transição.
  const marcador = svg`<g class="omh-anim-transicao"><circle cx="0" cy="0" r="7" fill="#7C3AED" stroke="#E6EDF3" stroke-width="2"></circle></g>`;
  // "x · y = k" acende (de #1F2733 para ciano): a cor é o `color` do texto.
  // Ele fica UMA LINHA abaixo de "tokens na pool →" — no desenho, 12 unidades
  // abaixo, que são 1,09 vez a letra. A distância é medida em letras (e não em
  // % da altura) porque no celular a figura encolhe e a letra não: em % as duas
  // linhas se encavalariam. No computador a posição é a mesma do desenho.
  const formula = svg`<text class="omh-anim-transicao" x="${emX(300)}" y="${emY(204)}" text-anchor="end" font-family="JetBrains Mono, monospace" fill="currentColor" style="transform:translateY(1.09em)">x · y = k</text>`;

  const el = html`<figure style="margin:0;position:relative;max-width:360px;container-type:inline-size">
    <svg viewBox="0 0 320 220" width="100%" style="display:block">
      <clipPath id="${recorte}"><rect x="39.5" y="0" width="281" height="180"></rect></clipPath>
      <line x1="40" y1="180" x2="300" y2="180" stroke="#1F2733"></line>
      <line x1="40" y1="20" x2="40" y2="180" stroke="#1F2733"></line>
      <path d="${CAMINHO}" fill="none" stroke="#9AA7B4" stroke-width="2"></path>
      <g clip-path="url(#${recorte})">${guias}</g>
      ${marcador}
      <circle cx="40" cy="20" r="5" fill="#0B0F17" stroke="#9AA7B4" stroke-width="2"></circle>
    </svg>
    <svg style="${CAMADA_DE_ROTULOS};${LETRA_DO_GRAFICO}" font-family="Inter, sans-serif" fill="#9AA7B4">
      <text x="${emX(50)}" y="${emY(18)}">antes da venda</text>
      <text x="${emX(170)}" y="${emY(204)}" text-anchor="middle">tokens na pool →</text>
      <!-- Girado, o texto cresce para a ESQUERDA da linha de base: a letra acima
           da linha (quase a letra inteira) fica antes do x. Quando a letra passa
           da proporção do desenho, ela passaria também da borda da figura; por
           isso o x anda para a direita a mesma folga. -->
      <text text-anchor="middle" style="transform:translate(calc(${emX(14)} + var(--folga)),${emY(100)}) rotate(-90deg)">SOL na pool →</text>
      ${formula}
    </svg>
  </figure>`;

  return { el, guias, marcador, formula };
}

// Uma barra: o valor em cima ("x = 1,00"), a barra e o nome embaixo.
// Altura: 72px por unidade (x = 1 dá 72px, como no desenho). A área tem 150px
// para caber a barra de 1,41 com os dois textos; no desenho ela tem 120px e a
// barra de tokens para de crescer em 74px — lá, na cena 5, x = 1,41 e y = 0,71
// aparecem quase do mesmo tamanho, e a barra deixa de mostrar a conta. Aqui a
// barra é sempre a conta certa (o dobro é o dobro), ao custo de 31px a mais de
// altura no palco. É a única medida em que o palco não copia o desenho.
function criarBarra(nome, cor) {
  const valor = html`<span style="${MONO};font-size:12px;color:#E6EDF3"></span>`;
  const barra = html`<div class="omh-anim-transicao" style="width:100%;border-radius:6px 6px 0 0;background:${cor}"></div>`;
  const el = html`<div style="display:flex;flex-direction:column;align-items:center;justify-content:flex-end;gap:4px;width:72px;height:100%">
    ${valor}${barra}<span style="font-size:12px;color:#9AA7B4">${nome}</span>
  </div>`;
  return {
    el,
    aplicar(v, rotulo) {
      valor.textContent = rotulo + ' = ' + fmt(v);
      barra.style.height = Math.round(v * 72) + 'px';
    },
  };
}

// Um cartão: o micro-rótulo e o número. A borda acende quando o número existe.
// (No desenho o micro-rótulo tem 10px; aqui 11px, o mínimo do handoff.)
//
// O cartão é o do desenho em toda largura de celular: número de 1,125rem (18px)
// e padding 8/10. Quem garante isso é a fileira (ver criarPalco): ela tira um
// cartão da linha antes de o cartão ficar estreito demais para os 18px. Duas
// medidas ainda acompanham a largura, em CSS puro:
// - o padding lateral segue a FILEIRA ("cqi" = 1% dela): 10px no computador,
//   uns 5px no celular;
// - o número segue o CARTÃO (o cartão também é container; 100cqi é a largura
//   por dentro do padding): no máximo os 18px do desenho, e nunca mais que 28%
//   dessa largura. A conta: o número tem no máximo 6 letras do mono ("41,42%"),
//   cada uma 0,6 da altura, ou seja 3,6 letras de largura — e 3,6 × 28% dá 101%
//   do espaço, que sobra no padding. Do jeito que a fileira quebra, o menor
//   cartão (77px, a 320px de tela) ainda dá os 18px inteiros; os 28% só entram
//   numa tela mais estreita que isso, e aí o número encolhe sem passar da borda.
// O número nunca quebra. O rótulo cabe em 1 linha em toda largura, mas se um dia
// faltar espaço ele quebra só no espaço ("PREÇO / CAI"), nunca no meio da
// palavra — daí o overflow-wrap:normal, que desfaz a regra geral do custom.css.
// O número fica sempre no pé do cartão, então os três continuam na mesma altura.
function criarCartao(rotulo, corDoNumero, corDaBorda) {
  const numero = html`<p style="margin:2px 0 0;${MONO};font-size:min(1.125rem,28cqi);font-weight:700;font-variant-numeric:tabular-nums;white-space:nowrap;color:${corDoNumero}"></p>`;
  const el = html`<div class="omh-anim-transicao" style="min-width:0;container-type:inline-size;display:flex;flex-direction:column;justify-content:space-between;border-radius:8px;border:1px solid #1F2733;background:#141A24;padding:8px clamp(4px,2.8cqi,10px)">
    <p style="margin:0;font-size:11px;font-weight:600;letter-spacing:.05em;text-transform:uppercase;overflow-wrap:normal;hyphens:none;color:#9AA7B4">${rotulo}</p>
    ${numero}
  </div>`;
  return {
    el,
    aplicar(valor) {
      numero.textContent = valor;
      el.style.borderColor = valor !== '—' ? corDaBorda : '#1F2733';
    },
  };
}

// O texto mais comprido de uma lista (para o "fantasma" abaixo).
function maisComprido(textos) {
  return textos.reduce((maior, t) => (t.length > maior.length ? t : maior), '');
}

// Um "fantasma": o maior texto que a peça vai mostrar, invisível, na mesma
// célula do texto de verdade (os dois em grid-area 1/1). Ele segura a largura:
// a peça tem o mesmo tamanho em todas as cenas, seja "US$ 8 mil" ou "US$ 80 mil".
// `alinhar` = 'start' (texto à esquerda) ou 'end' (texto à direita).
function comFantasma(visivel, fantasma, alinhar) {
  return html`<span style="display:inline-grid;justify-items:${alinhar}">
    <span aria-hidden="true" style="grid-area:1/1;visibility:hidden">${fantasma}</span>
    <span style="grid-area:1/1">${visivel}</span>
  </span>`;
}

// "Liquidez US$ 8 mil [exemplo inventado]". A pílula é a do desenho: 10px e
// padding 0 6px (menor que a do cabeçalho; com 11px a linha quebrava no
// computador). Ela não quebra no meio: se faltar espaço, desce inteira.
// (A letra, 12px cinza, vem de quem chama.)
function textoDaLiquidez(valor) {
  return html`<span>Liquidez ${valor} <span style="${PILULA_INVENTADO};padding:0 6px;font-size:10px;white-space:nowrap">exemplo inventado</span></span>`;
}

// Largura de uma letra do valor em dólar: no mono todas as letras têm a mesma
// largura, 0,6 do tamanho da letra (0,6 × 14px).
const LETRA_DO_DOLAR = 8.4;

// A linha da liquidez: "Liquidez US$ 8 mil [exemplo inventado] … ≈ US$ 206".
// Só aparece (opacidade) nas cenas que têm valor em dólar.
//
// Como no desenho: se tudo cabe, o dólar fica encostado à direita (numa linha
// só); se não cabe, o dólar desce para a linha de baixo, à esquerda. No celular
// ele desce mesmo: a linha tem 208px por dentro (o desenho tem 256px, porque lá
// o palco vaza para fora do card a 390px) e "Liquidez US$ 80 mil" mais a pílula
// pedem 212px. Então a pílula cai para a segunda linha, e o dólar para a
// terceira — de propósito, e igual em todas as cenas.
//
// A linha tem de quebrar (ou não) do mesmo jeito em todas as cenas; senão o
// palco muda de altura e os botões pulam de uma cena para outra. Por isso:
// - a liquidez leva o "fantasma" do maior valor ("US$ 80 mil");
// - o espaço entre a liquidez e o dólar cresce o quanto falta ao dólar desta
//   cena para chegar ao maior ("≈ US$ 11.712"). A soma fica sempre igual.
//   Quando o dólar desce, esse espaço some (não há vão no começo da linha) e o
//   dólar fica à esquerda, sem recuo;
// - nas cenas sem dólar a linha está invisível: o dólar guarda o lugar do maior
//   valor, escondido (o leitor de tela também não o lê).
function criarLinhaDaLiquidez() {
  const liquidez = html`<span></span>`;
  const dolar = html`<span style="${MONO};font-size:14px;font-weight:700;color:#E6EDF3"></span>`;
  const maiorLiquidez = maisComprido(CENAS.map((c) => c.liq));
  const maiorDolar = maisComprido(CENAS.map((c) => c.dolar));
  const el = html`<div class="omh-anim-transicao" style="border-radius:8px;border:1px solid #1F2733;background:#141A24;padding:8px 12px;display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap;align-items:baseline">
    <span style="font-size:12px;color:#9AA7B4">${comFantasma(textoDaLiquidez(liquidez), textoDaLiquidez(maiorLiquidez), 'start')}</span>
    ${dolar}
  </div>`;
  return {
    el,
    aplicar(c) {
      const temDolar = c.dolar !== '—';
      liquidez.textContent = c.liq;
      dolar.textContent = temDolar ? c.dolar : maiorDolar;
      dolar.style.visibility = temDolar ? 'visible' : 'hidden';
      const faltam = maiorDolar.length - dolar.textContent.length;
      el.style.columnGap = 8 + faltam * LETRA_DO_DOLAR + 'px';
      el.style.opacity = temDolar ? '1' : '0';
    },
  };
}

// O palco inteiro: gráfico | barras + cartões + liquidez.
function criarPalco() {
  const grafico = criarGrafico();
  const tokens = criarBarra('tokens', '#7C3AED');
  const sol = criarBarra('SOL', '#22D3EE');
  const vende = criarCartao('Vende', '#E6EDF3', '#7C3AED');
  const cai = criarCartao('Preço cai', '#F87171', 'rgba(239,68,68,.5)');
  const recebe = criarCartao('Recebe', '#22D3EE', '#22D3EE');
  const liquidez = criarLinhaDaLiquidez();

  const el = html`<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(280px,100%),1fr));gap:20px;align-items:center">
    ${grafico.el}
    <div style="display:flex;flex-direction:column;gap:12px;min-width:0">
      <div aria-hidden="true" style="display:flex;align-items:flex-end;justify-content:center;gap:32px;height:150px">${tokens.el}${sol.el}</div>
      <!-- A fileira dos 3 cartões é o "container" do cqi do padding (ver criarCartao).
           O piso de 84px é a largura em que o cartão ainda mostra "41,42%" nos
           18px do desenho (65px de número + 2×7,5px de padding + a borda). Os três
           ficam lado a lado como no desenho enquanto a fileira tiver 268px
           (3×84 + os dois vãos de 8); abaixo disso eles caem para 2+1 — com o
           cartão MAIOR, não menor — em vez de espremer o número.
           O "45%" é o piso numa fileira bem estreita (menos de 187px, abaixo de
           uns 345px de tela): aí 84px já não cabem duas vezes e sem ele os
           cartões virariam uma coluna só, um embaixo do outro. Com 45% continuam
           2+1 até 320px de tela (cartão de 77px, que ainda dá os 18px). -->
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(84px,45%),1fr));gap:8px;container-type:inline-size">${vende.el}${cai.el}${recebe.el}</div>
      ${liquidez.el}
    </div>
  </div>`;

  // No desenho, só o gráfico (a <figure>) é a imagem com o texto alternativo; os
  // cartões e a linha da liquidez ficam FORA dela, para o leitor de tela LER.
  // O motor ainda põe role="img" e o texto alternativo no palco inteiro (ele
  // ainda não usa o campo `imagem` logo abaixo — é o pedido de mudança), e
  // role="img" faz o leitor de tela pular tudo o que está dentro: "Vende 41,42%",
  // "Preço cai −50%", "Recebe 14,64%" e a pílula "exemplo inventado" sumiriam.
  // Então o palco desfaz isso: tira a marca do palco e põe na figura do gráfico.
  // Quando o motor passar a usar `imagem`, estas linhas continuam certas (ele já
  // marca a figura e o palco não tem mais o que tirar).
  function marcarSoOGrafico(alt) {
    grafico.el.setAttribute('role', 'img');
    grafico.el.setAttribute('aria-label', alt);
    el.removeAttribute('role');
    // O motor escreve o aria-label do palco DEPOIS de chamar `aplicar`; por isso
    // a limpeza espera essa escrita (queueMicrotask roda antes de a tela pintar).
    queueMicrotask(() => el.removeAttribute('aria-label'));
  }

  return {
    el,
    // A imagem da cena é só o gráfico (ver o comentário acima).
    imagem: grafico.el,
    aplicar(c) {
      marcarSoOGrafico(c.alt ?? c.legenda);
      // Marcador e guias vão juntos para o ponto (x, y) da curva.
      const ponto = 'translate(' + px(c.x).toFixed(1) + 'px,' + py(c.y).toFixed(1) + 'px)';
      grafico.marcador.style.transform = ponto;
      grafico.guias.style.transform = ponto;
      grafico.formula.style.color = c.k ? '#22D3EE' : '#1F2733';
      tokens.aplicar(c.x, 'x');
      sol.aplicar(c.y, 'y');
      vende.aplicar(c.vende);
      cai.aplicar(c.cai);
      recebe.aplicar(c.recebe);
      liquidez.aplicar(c);
    },
  };
}

// Miniatura do modo "cenas paradas" (bloco modoParado do desenho): a curva, a
// base, o marcador no ponto da cena e o resumo do número ("recebe 2,57%").
function criarMiniatura(c) {
  const resumo = c.recebe !== '—' ? 'recebe ' + c.recebe : c.cai !== '—' ? 'preço ' + c.cai : 'x·y = k';
  return html`<div style="position:relative">
    <svg viewBox="0 0 320 220" width="100%" style="display:block">
      <path d="${CAMINHO}" fill="none" stroke="#9AA7B4" stroke-width="2"></path>
      <line x1="40" y1="180" x2="300" y2="180" stroke="#1F2733"></line>
      <circle cx="${px(c.x).toFixed(1)}" cy="${py(c.y).toFixed(1)}" r="7" fill="#7C3AED" stroke="#E6EDF3" stroke-width="2"></circle>
    </svg>
    <svg style="${CAMADA_DE_ROTULOS}">
      <text x="${emX(300)}" y="${emY(216)}" text-anchor="end" font-family="JetBrains Mono, monospace" font-size="12" fill="#9AA7B4">${resumo}</text>
    </svg>
  </div>`;
}

export function criarAnimacaoPool() {
  return criarAnimacao({
    // Título e sobrancelha do desenho: "Animação 1 · Módulo 6 · 32 s".
    titulo: 'Pool x·y = k: por que cada venda sai mais barata',
    numero: 1,
    modulo: 6,
    cenas: CENAS,
    criarPalco,
    criarMiniatura,
    duracaoPorCena: 4000,
    duracaoTransicao: 500,
    // O parágrafo de fonte do desenho (texto literal do .dc.html).
    descricao:
      'Oito cenas. Os percentuais (2,57% e 14,64%) são a conta da pool de produto constante, do Módulo 6. A liquidez de US$ 8 mil é o exemplo inventado do arquivo, e aparece marcada.',
  });
}
