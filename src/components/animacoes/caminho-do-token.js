// animacoes/caminho-do-token.js — Animação 4 · Caminho do token (Módulo 5, aba "Taxas").
//
// Desenho: pesquisa/design/handoff/designs/Animacao 4 - Caminho do token.dc.html.
// O palco segue a composição do desenho:
//   - em cima, os três locais por onde o token passa (bonding curve → PumpSwap →
//     AMM madura), cada um com o chip "o token está aqui" e o rodapé "TAXA DA POOL";
//   - embaixo, duas colunas: à esquerda a curva (sem caixa em volta); à direita o
//     cartão "Uma ordem de R$512, custo total" e, na última cena, o aviso vermelho.
//
// De onde vem cada número (src/data/modulo5.js):
//   - 1,25%, 0,25%, 0,300% e 0,95%: seção "o-venue-muda-o-custo";
//   - ≈ 2,4% e ≈ 1,4%: a matriz de custo (ordem de R$512 na bonding curve e na AMM madura);
//   - 140 × 22 pontos-base, 534 mil negociações e "cerca de 80% maior": o detalhe da
//     mesma seção (o estudo da Uniswap Labs).
// Onde o desenho erra (pesquisa/design/auditoria/animacoes.md), vale o arquivo:
//   - a barra "R$512 no PumpSwap ≈ 2,4%": o arquivo só tem o 2,4% da bonding curve
//     e não tem linha de PumpSwap. A barra fica marcada "não verificado";
//   - cena 5, "Os limiares estão no arquivo, não aqui.": o arquivo não traz os
//     limiares das faixas, então essa frase saiu.
// O valor para graduar não aparece: o arquivo marca como não verificado.
//
// Este arquivo só diz o que muda de uma cena para outra: as cenas, o palco e a
// miniatura do modo "cenas paradas". A moldura, os botões, a barra de cenas, o
// teclado e "Ler como texto" são do motor (motor.js).

import { html, svg } from '../../ui.js';
import { criarAnimacao, MONO, PILULA_INVENTADO } from './motor.js';

// ---------------------------------------------------------------------------
// As curvas (as mesmas fórmulas do desenho, no SVG de 320 × 170)
// ---------------------------------------------------------------------------

// t vai de 0 (começo) a 1 (fim). px e py levam para as coordenadas do SVG.
const px = (t) => 40 + t * 260;
const py = (v) => 140 - v * 124;

// Bonding curve: o preço sobe cada vez mais rápido conforme as compras entram.
const fBonding = (t) => 0.08 + 0.82 * t * t;
// Pool de produto constante (x · y = k): sobe rápido no começo e depois achata.
const fAmm = (t) => 0.12 + (0.78 * (1 - 1 / (1 + 2.6 * t))) / (1 - 1 / 3.6);
const FORMULA = { bonding: fBonding, amm: fAmm };

// Desenha a curva com 61 pontos ligados por retas.
function caminhoDaCurva(f) {
  let d = '';
  for (let i = 0; i <= 60; i++) {
    const t = i / 60;
    d += (i ? ' L' : 'M') + px(t).toFixed(1) + ',' + py(f(t)).toFixed(1);
  }
  return d;
}
const CAMINHO = { bonding: caminhoDaCurva(fBonding), amm: caminhoDaCurva(fAmm) };

// Onde o marcador fica na curva da cena.
function pontoDoMarcador(cena) {
  const f = FORMULA[cena.curva];
  return { x: px(cena.mt), y: py(f(cena.mt)) };
}

// A bonding curve é roxa; a curva de pool é cinza. Tracejada quando fica para trás.
const corDaCurva = (cena) => (cena.curva === 'bonding' ? '#7C3AED' : '#9AA7B4');
const tracejadoDaCurva = (cena) => (cena.mOp < 1 ? '5 4' : 'none');

// ---------------------------------------------------------------------------
// Os três locais e as barras de custo
// ---------------------------------------------------------------------------

const LOCAIS = [
  { nome: 'Bonding curve', detalhe: 'Uma fórmula define o preço conforme as pessoas compram.' },
  { nome: 'PumpSwap', detalhe: 'A pool oficial do token, depois da graduação.' },
  { nome: 'AMM madura', detalhe: 'Pool comum de DEX, como a Raydium.' },
];

// Cor da taxa no rodapé do local: "—" em cinza, AMM madura em verde, as outras em âmbar.
function corDaTaxa(taxa, indiceDoLocal) {
  if (taxa === '—') return '#9AA7B4';
  return indiceDoLocal === 2 ? '#22C55E' : '#F59E0B';
}

// As barras do cartão de custo. `cor` é a do valor escrito; `fundo`, a da barra.
// Texto vermelho é sempre #F87171; o #EF4444 fica só na barra.
const CUSTO = {
  // O 2,4% do arquivo é o da bonding curve (matriz de custo, "R$512, bonding
  // curve"); a matriz não tem linha de PumpSwap. Por isso a marca.
  pumpswap: { rotulo: 'R$512 no PumpSwap', naoVerificado: true, valor: '≈ 2,4%', largura: 100, cor: '#F59E0B', fundo: '#F59E0B' },
  amm: { rotulo: 'R$512 na AMM madura', valor: '≈ 1,4%', largura: 58, cor: '#22C55E', fundo: '#22C55E' },
  parEstavel: { rotulo: 'Par entre moedas estáveis', valor: '22 pb', largura: 16, cor: '#22C55E', fundo: '#22C55E' },
  memecoin: { rotulo: 'Memecoin popular', valor: '140 pb', largura: 100, cor: '#F87171', fundo: '#EF4444' },
};

// ---------------------------------------------------------------------------
// As 7 cenas (textos do desenho)
// ---------------------------------------------------------------------------
// ativo: o local onde o token está (0, 1 ou 2) · taxas: o rodapé de cada local
// curva: 'bonding' ou 'amm' · mt: onde o marcador está na curva (0 a 1)
// mOp: opacidade do marcador (0,4 = ficou para trás) · gRot/gAlt: rótulo e texto
// alternativo do gráfico · custos: as barras do cartão · aviso: o cartão vermelho

const EIXOS_DA_CURVA = { eixoX: 'compras acumuladas →', eixoY: 'preço →' };
const EIXOS_DA_POOL = { eixoX: 'tokens na pool →', eixoY: 'SOL na pool →' };

const CENAS = [
  {
    legenda: 'O token nasce na bonding curve, sem pool de DEX.',
    alt: 'O token está na bonding curve, com taxa de pool de 1,25%. PumpSwap e AMM madura ainda não se aplicam.',
    ativo: 0,
    taxas: ['1,25%', '—', '—'],
    curva: 'bonding',
    mt: 0.12,
    mOp: 1,
    gRot: 'A bonding curve',
    gAlt: 'Curva de preço subindo conforme as compras entram. O marcador está no começo.',
    ...EIXOS_DA_CURVA,
    custos: [],
    custoNota: 'O custo total aparece daqui a duas cenas.',
  },
  {
    legenda: 'Cada compra anda na fórmula. O preço sobe sozinho.',
    alt: 'O marcador avança na curva; a taxa segue em 1,25%, repartida entre criador e protocolo.',
    ativo: 0,
    taxas: ['1,25%', '—', '—'],
    curva: 'bonding',
    mt: 0.55,
    mOp: 1,
    gRot: 'A bonding curve',
    gAlt: 'O marcador avançou na curva: mais compras acumuladas, preço mais alto.',
    ...EIXOS_DA_CURVA,
    custos: [],
    custoNota: 'Aqui a taxa da pool é 1,25% — oficialmente 0,300% para o criador e 0,95% para o protocolo.',
  },
  {
    legenda: 'Ele gradua e ganha a pool oficial dele, no PumpSwap.',
    alt: 'O token graduou e passou para o PumpSwap. A taxa continua em 1,25%.',
    ativo: 1,
    taxas: ['1,25%', '1,25%', '—'],
    curva: 'bonding',
    mt: 1,
    mOp: 0.4,
    gRot: 'A curva fica para trás',
    gAlt: 'O marcador chega ao fim da curva: o token graduou.',
    ...EIXOS_DA_CURVA,
    custos: [],
    custoNota: 'Quanto é preciso arrecadar para graduar: o arquivo marca como não verificado, e a animação não mostra.',
  },
  {
    legenda: 'No PumpSwap a taxa segue 1,25% enquanto o market cap é pequeno.',
    alt: 'No PumpSwap, uma ordem de R$512 custa cerca de 2,4% no total (não verificado). A taxa da pool é 1,25%.',
    ativo: 1,
    taxas: ['—', '1,25%', '—'],
    curva: 'amm',
    mt: 0.35,
    mOp: 1,
    gRot: 'Agora é uma pool: x · y = k',
    gAlt: 'A curva vira a de uma pool de produto constante, com o marcador na parte inicial.',
    ...EIXOS_DA_POOL,
    custos: [CUSTO.pumpswap],
    custoNota: 'Custo total: taxa da pool, taxa da plataforma e os custos fixos de rede.',
  },
  {
    legenda: 'Conforme o market cap cresce, a taxa cai por faixas.',
    alt: 'A taxa do PumpSwap cai por faixas conforme o market cap cresce; o custo total da ordem de R$512 segue perto de 2,4% (não verificado).',
    ativo: 1,
    taxas: ['—', '1,25% → faixas', '—'],
    curva: 'amm',
    mt: 0.55,
    mOp: 1,
    gRot: 'A mesma pool, mais funda',
    gAlt: 'O marcador avança na curva da pool, que está mais funda.',
    ...EIXOS_DA_POOL,
    custos: [CUSTO.pumpswap],
    // O desenho completa com "Os limiares estão no arquivo, não aqui." — o
    // arquivo não tem os limiares, então a frase saiu.
    custoNota: 'A queda é por faixas de market cap.',
  },
  {
    legenda: 'Mais tarde, numa AMM madura, a taxa padrão é 0,25%.',
    alt: 'Na AMM madura a taxa da pool é 0,25%, e a mesma ordem de R$512 custa cerca de 1,4% em vez de 2,4%.',
    ativo: 2,
    taxas: ['—', '—', '0,25%'],
    curva: 'amm',
    mt: 0.8,
    mOp: 1,
    gRot: 'Pool de AMM madura',
    gAlt: 'A curva da pool, com o marcador na parte mais funda.',
    ...EIXOS_DA_POOL,
    custos: [CUSTO.pumpswap, CUSTO.amm],
    custoNota: 'Mesma plataforma, mesmo tamanho, mesmo dia — só mudou onde o token está.',
  },
  {
    legenda: 'A taxa é só uma parte: memecoin custou 6× um par estável.',
    alt: 'Num estudo com 534 mil negociações, o custo efetivo de uma memecoin popular foi de 140 pontos-base contra 22 de um par entre moedas estáveis: seis vezes mais.',
    ativo: 2,
    taxas: ['1,25%', '1,25% → faixas', '0,25%'],
    curva: 'amm',
    mt: 0.8,
    mOp: 0.4,
    gRot: 'O custo efetivo, além da taxa',
    gAlt: 'A curva ao fundo; o foco sai do desenho e vai para o custo efetivo.',
    ...EIXOS_DA_POOL,
    custos: [CUSTO.parEstavel, CUSTO.memecoin],
    custoNota: 'Custo efetivo por dólar negociado: taxa, deslizamento e o que bots de MEV extraem. 534 mil negociações (Uniswap Labs).',
    aviso: 'A chance de sofrer deslizamento causado por um bot foi cerca de 80% maior na memecoin — e a pool estudada era mais funda que a maioria das de memecoin recém-lançada.',
  },
];

// ---------------------------------------------------------------------------
// As peças do palco
// ---------------------------------------------------------------------------

// Micro-rótulo de 11px (o desenho usa 11px nesta animação).
const ROTULO_11 = 'font-size:11px;font-weight:600;letter-spacing:.05em;text-transform:uppercase;color:#9AA7B4';

// Transição de uma propriedade que a classe omh-anim-transicao não cobre
// (a cor do traço da curva), com a duração que o motor passa.
const TRANSICAO_DO_TRACO = 'transition:stroke var(--omh-anim-dur, 450ms) ease';

// Um local: cartão (nome + chip, descrição, rodapé "TAXA DA POOL") e, nos dois
// primeiros, a seta → à direita. A seta fica à direita também no celular.
function criarLocal(local, comSeta) {
  const chip = html`<span style="border-radius:999px;border:1px solid #22D3EE;background:rgba(34,211,238,.12);color:#22D3EE;padding:0 8px;font-size:10px;font-weight:600;white-space:nowrap">o token está aqui</span>`;
  const taxa = html`<span class="omh-anim-transicao" style="${MONO};font-size:1.125rem;font-weight:700;font-variant-numeric:tabular-nums"></span>`;
  const cartao = html`<div class="omh-anim-transicao" style="flex:1 1 auto;min-width:0;border-radius:8px;border:1px solid #1F2733;background:#141A24;padding:12px 14px;display:flex;flex-direction:column;gap:8px">
    <div style="display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap;align-items:baseline">
      <span style="font-size:14px;font-weight:600">${local.nome}</span>${chip}
    </div>
    <p style="margin:0;font-size:12px;color:#9AA7B4">${local.detalhe}</p>
    <div style="margin-top:auto;padding-top:6px;display:flex;justify-content:space-between;gap:8px;align-items:baseline;border-top:1px solid #1F2733">
      <span style="${ROTULO_11}">Taxa da pool</span>${taxa}
    </div>
  </div>`;
  const seta = comSeta
    ? html`<span class="omh-anim-transicao" aria-hidden="true" style="flex:0 0 auto;display:flex;align-items:center;justify-content:center;padding:0 4px;font-size:18px">→</span>`
    : null;
  const celula = html`<div style="display:flex;align-items:stretch;min-width:0">${cartao}${seta}</div>`;
  return { celula, cartao, chip, taxa, seta };
}

// Texto do gráfico em HTML por cima do SVG (como a curva deslizante de
// visuais.js), para não encolher junto com o desenho no celular: 11 unidades do
// SVG de 320 = 3,4375% da largura (cqw), e nunca menos de 11px.
// (x, y) é o ponto de apoio no SVG de 320 × 170.
function textoDoGrafico(x, y, girado) {
  const esquerda = ((x / 320) * 100).toFixed(3) + '%';
  const topo = ((y / 170) * 100).toFixed(3) + '%';
  const transformacao = girado ? 'translate(-50%,-50%) rotate(-90deg)' : 'translate(-50%,-78%)';
  return html`<span aria-hidden="true" style="position:absolute;left:${esquerda};top:${topo};transform:${transformacao};font-family:Inter,sans-serif;font-size:max(11px, 3.4375cqw);line-height:1;color:#9AA7B4;white-space:nowrap"></span>`;
}

// A figura da esquerda: micro-rótulo e o SVG (eixos, curva, marcador roxo).
function criarGrafico() {
  const rotulo = html`<p style="margin:0 0 6px;${ROTULO_11}"></p>`;
  const curva = svg`<path fill="none" stroke-width="2" style="${TRANSICAO_DO_TRACO}"></path>`;
  // O marcador anda por transform (a classe faz ele deslizar na curva).
  const marcador = svg`<circle class="omh-anim-transicao" cx="0" cy="0" r="6" fill="#7C3AED" stroke="#E6EDF3" stroke-width="2"></circle>`;
  const desenho = html`<svg viewBox="0 0 320 170" width="100%" role="img" style="display:block"></svg>`;
  desenho.append(
    svg`<line x1="40" y1="140" x2="300" y2="140" stroke="#1F2733"></line>`,
    svg`<line x1="40" y1="16" x2="40" y2="140" stroke="#1F2733"></line>`,
    curva,
    marcador,
  );
  // Rótulos dos eixos: o X centralizado embaixo, o Y girado à esquerda.
  const eixoX = textoDoGrafico(170, 162, false);
  const eixoY = textoDoGrafico(8, 78, true);
  const caixa = html`<div style="position:relative;width:100%;max-width:340px;container-type:inline-size">${desenho}${eixoX}${eixoY}</div>`;
  const el = html`<figure style="margin:0">${rotulo}${caixa}</figure>`;
  return { el, rotulo, desenho, curva, marcador, eixoX, eixoY };
}

// Uma linha do cartão de custo: rótulo + valor em cima, barra de 16px embaixo
// (18px contando a borda: no app a altura inclui a borda, no desenho não).
function criarLinhaDeCusto() {
  const rotulo = html`<span></span>`;
  // Pílula âmbar, no traço da "exemplo inventado" do motor (âmbar = atenção).
  // Rótulo e pílula quebram de linha separados quando o cartão é estreito.
  const marca = html`<span style="${PILULA_INVENTADO};white-space:nowrap">não verificado</span>`;
  const valor = html`<span style="${MONO};font-size:14px;font-weight:700;white-space:nowrap"></span>`;
  const preenchimento = html`<div class="omh-anim-transicao" style="height:100%"></div>`;
  const el = html`<div>
    <div style="display:flex;justify-content:space-between;gap:10px;align-items:baseline"><span style="display:flex;flex-wrap:wrap;align-items:baseline;gap:2px 6px;min-width:0;font-size:13px">${rotulo}${marca}</span>${valor}</div>
    <div aria-hidden="true" style="margin-top:4px;height:18px;background:#0B0F17;border:1px solid #1F2733;border-radius:4px;overflow:hidden">${preenchimento}</div>
  </div>`;
  return {
    el,
    // Mostra a barra da cena (ou esconde a linha, se a cena tem menos barras).
    aplicar(custo) {
      el.hidden = !custo;
      if (!custo) return;
      rotulo.textContent = custo.rotulo;
      marca.hidden = !custo.naoVerificado;
      valor.textContent = custo.valor;
      valor.style.color = custo.cor;
      preenchimento.style.width = custo.largura + '%';
      preenchimento.style.background = custo.fundo;
    },
  };
}

// A coluna da direita: o cartão "Uma ordem de R$512, custo total" e o aviso.
function criarCusto() {
  // Duas linhas fixas: de uma cena para a outra a barra muda de largura
  // deslizando, como no desenho (cena 6 → 7).
  const linhas = [criarLinhaDeCusto(), criarLinhaDeCusto()];
  const nota = html`<p style="margin:8px 0 0;font-size:12px;color:#9AA7B4"></p>`;
  const cartao = html`<div style="border-radius:8px;border:1px solid #1F2733;background:#141A24;padding:10px 12px">
    <p style="margin:0;${ROTULO_11}">Uma ordem de R$512, custo total</p>
    <div style="margin-top:8px;display:flex;flex-direction:column;gap:10px">${linhas.map((l) => l.el)}</div>
    ${nota}
  </div>`;
  // O aviso é um cartão separado, vermelho, com texto claro (#E6EDF3).
  const aviso = html`<p style="margin:0;border-radius:8px;border:1px solid rgba(239,68,68,.5);background:rgba(239,68,68,.12);padding:10px 12px;font-size:13px;color:#E6EDF3"></p>`;
  const el = html`<div style="display:flex;flex-direction:column;gap:10px">${cartao}${aviso}</div>`;
  return { el, linhas, nota, aviso };
}

// ---------------------------------------------------------------------------
// O palco e a miniatura
// ---------------------------------------------------------------------------

function criarPalco() {
  const locais = LOCAIS.map((local, k) => criarLocal(local, k < 2));
  // Três colunas no computador; uma embaixo da outra no celular (CSS, não JS).
  const trilha = html`<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(200px,100%),1fr));gap:8px;align-items:stretch">${locais.map((l) => l.celula)}</div>`;

  const grafico = criarGrafico();
  const custo = criarCusto();
  const baixo = html`<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(260px,100%),1fr));gap:16px;align-items:center">${grafico.el}${custo.el}</div>`;

  const el = html`<div style="display:flex;flex-direction:column;gap:16px">${trilha}${baixo}</div>`;

  function aplicarLocais(cena) {
    locais.forEach((local, k) => {
      const ativo = k === cena.ativo;
      local.cartao.style.borderColor = ativo ? '#22D3EE' : '#1F2733';
      local.cartao.style.background = ativo ? 'rgba(34,211,238,.08)' : '#141A24';
      local.chip.hidden = !ativo;
      local.taxa.textContent = cena.taxas[k];
      local.taxa.style.color = corDaTaxa(cena.taxas[k], k);
      // A seta que o token já atravessou fica roxa.
      if (local.seta) local.seta.style.color = k < cena.ativo ? '#7C3AED' : '#9AA7B4';
    });
  }

  function aplicarGrafico(cena) {
    const ponto = pontoDoMarcador(cena);
    grafico.rotulo.textContent = cena.gRot;
    grafico.desenho.setAttribute('aria-label', cena.gAlt);
    grafico.curva.setAttribute('d', CAMINHO[cena.curva]);
    grafico.curva.style.stroke = corDaCurva(cena);
    grafico.curva.setAttribute('stroke-dasharray', tracejadoDaCurva(cena));
    grafico.marcador.style.transform = 'translate(' + ponto.x.toFixed(1) + 'px,' + ponto.y.toFixed(1) + 'px)';
    grafico.marcador.style.opacity = cena.mOp;
    grafico.eixoX.textContent = cena.eixoX;
    grafico.eixoY.textContent = cena.eixoY;
  }

  function aplicarCusto(cena) {
    custo.linhas.forEach((linha, k) => linha.aplicar(cena.custos[k]));
    custo.nota.textContent = cena.custoNota;
    custo.aviso.textContent = cena.aviso ?? '';
    custo.aviso.hidden = !cena.aviso;
  }

  return {
    el,
    aplicar(cena) {
      aplicarLocais(cena);
      aplicarGrafico(cena);
      aplicarCusto(cena);
    },
  };
}

// Miniatura do modo "cenas paradas" (bloco modoParado do desenho): os três
// locais com nome e taxa, e a curva com o marcador.
function criarMiniatura(cena) {
  const locais = LOCAIS.map((local, k) => {
    const ativo = k === cena.ativo;
    return html`<div style="flex:1 1 0;min-width:0;border-radius:4px;border:1px solid ${ativo ? '#22D3EE' : '#1F2733'};background:${ativo ? 'rgba(34,211,238,.08)' : '#141A24'};padding:6px">
      <p style="margin:0;font-size:10px;line-height:1.2;overflow-wrap:break-word">${local.nome}</p>
      <p style="margin:3px 0 0;${MONO};font-size:11px;font-weight:700;color:${corDaTaxa(cena.taxas[k], k)}">${cena.taxas[k]}</p>
    </div>`;
  });
  const ponto = pontoDoMarcador(cena);
  const curva = html`<svg viewBox="0 0 320 170" width="100%" aria-hidden="true">
    <path d="${CAMINHO[cena.curva]}" fill="none" stroke="${corDaCurva(cena)}" stroke-width="3" stroke-dasharray="${tracejadoDaCurva(cena)}"></path>
    <circle cx="${ponto.x.toFixed(1)}" cy="${ponto.y.toFixed(1)}" r="8" fill="#7C3AED" stroke="#E6EDF3" stroke-width="2" opacity="${cena.mOp}"></circle>
  </svg>`;
  return html`<div style="display:flex;flex-direction:column;gap:8px">
    <div style="display:flex;gap:4px;align-items:stretch">${locais}</div>
    ${curva}
  </div>`;
}

export function criarAnimacaoCaminhoDoToken() {
  return criarAnimacao({
    // Título e sobrancelha do desenho: "Animação 4 · Módulo 5 · 32 s".
    titulo: 'Caminho do token: bonding curve → PumpSwap → AMM madura',
    numero: 4,
    modulo: 5,
    cenas: CENAS,
    criarPalco,
    criarMiniatura,
    duracaoPorCena: 4500,
    duracaoTransicao: 450,
    // O parágrafo de fonte do desenho (texto literal do .dc.html).
    descricao:
      'Sete cenas. Fonte: modulo5.js › o-venue-muda-o-custo e a matriz de custo. A animação não mostra quanto é preciso arrecadar para graduar: o arquivo marca esse valor como não verificado.',
  });
}
