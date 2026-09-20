// animacoes/sanduiche.js — Animação 3 · Sandwich (Módulo 5, aba "Configurações").
//
// Desenho: pesquisa/design/handoff/designs/Animacao 3 - Sandwich.dc.html.
// Fonte: modulo5.js › slippage-priority-mev (slippage, priority fee e os modos
// Off/Reduced/Secure de proteção de MEV) e o slot de 350 ms (desde 21/08/2026).
// Os preços (0,0100 / 0,0112 / 0,0106) e os limites de slippage (40% e 2%) são
// exemplo inventado, marcado na tela. O arquivo não publica lucro de robô, e a
// animação também não mostra.
//
// O palco, como no desenho, é uma coluna só:
//   1. em cima, na largura toda: a fase (micro-rótulo), com "slot da Solana:
//      350 ms" à direita; a caixa da fila, que vira "o bloco" (borda ciano)
//      quando as ordens executam, com 3 linhas; e a nota da fila;
//   2. embaixo, duas colunas (uma só no celular): à esquerda, o preço do token
//      em 3 barras; à direita, o cartão do slippage e o cartão "O robô".
//
// Este arquivo só diz o que muda de uma cena para outra: as cenas (legenda, alt
// e o estado de cada elemento), o palco e a miniatura do modo "cenas paradas".
// A moldura, os botões, a barra de cenas, o teclado e "Ler como texto" são do
// motor (motor.js).

import { html } from '../../ui.js';
import { criarAnimacao, MONO, NOTA } from './motor.js';

// ---------------------------------------------------------------------------
// Estilos repetidos
// ---------------------------------------------------------------------------

// Micro-rótulo do palco: 11px, 600, maiúsculas, cinza (o ROTULO_MIUDO do motor
// tem 12px; o desenho deste palco usa 11px).
const MICRO =
  'margin:0;font-size:11px;font-weight:600;letter-spacing:.05em;text-transform:uppercase;color:#9AA7B4';

// Pílula âmbar "exemplo inventado" dentro do micro-rótulo do preço. O desenho
// usa 10px; aqui fica em 11px, para nenhum texto ficar abaixo de 11px. O
// nowrap impede a pílula de quebrar no meio.
const PILULA =
  'border-radius:999px;border:1px solid rgba(245,158,11,.4);background:rgba(245,158,11,.12);' +
  'color:#F59E0B;padding:0 6px;font-size:11px;font-weight:600;white-space:nowrap';

// Texto miúdo em mono, cinza: "slot da Solana: 350 ms" e o detalhe de cada linha.
const MONO_MIUDO = MONO + ';font-size:12px;color:#9AA7B4';

// ---------------------------------------------------------------------------
// As cenas (os dados do renderVals() do desenho)
// ---------------------------------------------------------------------------

// Os tipos de linha da fila: borda, fundo e cor do texto (os trios do handoff).
const LINHA = {
  voce: { borda: '#7C3AED', fundo: 'rgba(124,58,237,.15)', cor: '#E6EDF3' }, // a sua ordem (roxo)
  roboC: { borda: 'rgba(239,68,68,.5)', fundo: 'rgba(239,68,68,.12)', cor: '#F87171' }, // compra do robô
  roboV: { borda: 'rgba(245,158,11,.4)', fundo: 'rgba(245,158,11,.12)', cor: '#F59E0B' }, // venda do robô
  vazio: { borda: '#1F2733', fundo: '#0B0F17', cor: '#9AA7B4' }, // lugar livre na fila
  feito: { borda: 'rgba(34,197,94,.5)', fundo: 'rgba(34,197,94,.12)', cor: '#22C55E' }, // executada
};

// Uma linha da fila. `recuo` (em px) empurra a linha para a direita: a sua
// ordem fica "atrás" da do robô, no mesmo slot.
function tx(tipo, rotulo, detalhe, recuo = 0) {
  return { rotulo, detalhe, recuo, ...LINHA[tipo] };
}

// Preços do exemplo inventado (marcado na tela com a pílula).
const P0 = '0,0100'; // antes
const P1 = '0,0112'; // depois da compra do robô
const P2 = '0,0106'; // a sua execução

// As 3 barras do preço: o rótulo embaixo, a cor da barra e a cor do número.
// Texto vermelho é sempre #F87171; o #EF4444 fica só na barra.
const BARRA = {
  antes: { rotulo: 'antes', fundo: '#7C3AED', cor: '#E6EDF3' },
  depois: { rotulo: 'depois do robô', fundo: '#EF4444', cor: '#F87171' },
  meio: { rotulo: 'sua execução', fundo: '#F59E0B', cor: '#F59E0B' },
};

// Uma barra: o valor, a altura (% da área das barras) e a opacidade da barra
// (0 = o preço ainda não existe; 0,25 a 0,5 = esmaecida, fica de fundo).
function bar(valor, altura, tipo, op = 1) {
  return { valor, altura, op, ...BARRA[tipo] };
}

// Legendas e textos alternativos: literais do desenho (legenda com até 12 palavras).
const CENAS = [
  {
    fase: 'A fila de transações, antes do bloco',
    fila: [tx('voce', 'Sua compra', 'enviada agora'), tx('vazio', '—', 'fila aberta'), tx('vazio', '—', 'fila aberta')],
    filaNota: 'A transação vai para a fila pública antes de entrar no bloco.',
    barras: [bar(P0, 70, 'antes'), bar(P1, 0, 'depois', 0), bar(P2, 0, 'meio', 0)],
    slip: '40%', slipLarg: 80, slipCor: '#EF4444', slipNota: 'Exemplo inventado: um limite folgado.',
    robo: 'Ainda não fez nada. Está olhando a fila.', roboTom: 'neutro',
    legenda: 'Você envia a ordem de compra. Ela vai para a fila.',
    alt: 'A sua compra aparece na fila pública; o preço está em 0,0100 e o slippage aceito é de 40% (exemplo inventado).',
  },
  {
    fase: 'A fila de transações, antes do bloco',
    fila: [tx('voce', 'Sua compra', 'visível na fila'), tx('vazio', 'qualquer um pode ler', 'fila pública'), tx('vazio', '—', 'fila aberta')],
    filaNota: 'Quem observa a fila vê tamanho, token e o slippage que você aceitou.',
    barras: [bar(P0, 70, 'antes'), bar(P1, 0, 'depois', 0), bar(P2, 0, 'meio', 0)],
    slip: '40%', slipLarg: 80, slipCor: '#EF4444', slipNota: 'O limite folgado também é público.',
    robo: 'Leu a sua ordem: sabe o tamanho e o seu limite.', roboTom: 'alerta',
    legenda: 'Antes de entrar no bloco, a sua ordem fica visível na fila.',
    alt: 'A mesma fila, agora destacando que ela é pública: o robô leu o tamanho da ordem e o limite de slippage.',
  },
  {
    fase: 'A fila de transações, antes do bloco',
    fila: [tx('roboC', 'Compra do robô', 'priority fee maior', 0), tx('voce', 'Sua compra', 'mesmo slot, depois', 16), tx('vazio', '—', 'fila aberta')],
    filaNota: 'Priority fee é pagamento extra ao validador para entrar antes.',
    barras: [bar(P0, 70, 'antes'), bar(P1, 0, 'depois', 0), bar(P2, 0, 'meio', 0)],
    slip: '40%', slipLarg: 80, slipCor: '#EF4444', slipNota: 'Quanto maior o limite, mais espaço o robô tem.',
    robo: 'Paga prioridade para passar na frente. O slot dura 350 ms.', roboTom: 'alerta',
    legenda: 'O robô paga prioridade e passa na frente da sua ordem.',
    alt: 'A compra do robô entra acima da sua na fila, por ter pago um priority fee maior; o slot da Solana dura 350 ms.',
  },
  {
    fase: 'Dentro do bloco',
    fila: [tx('feito', 'Compra do robô', 'executada'), tx('voce', 'Sua compra', 'a seguir', 16), tx('vazio', '—', '')],
    filaNota: 'A compra do robô move a pool antes de a sua tocar nela.',
    barras: [bar(P0, 70, 'antes', 0.5), bar(P1, 88, 'depois'), bar(P2, 0, 'meio', 0)],
    slip: '40%', slipLarg: 80, slipCor: '#EF4444', slipNota: 'O novo preço ainda cabe dentro do seu limite.',
    robo: 'Comprou. O preço da pool subiu.', roboTom: 'alerta',
    legenda: 'Ele compra primeiro, e o preço da pool sobe.',
    alt: 'A compra do robô executa e o preço sobe de 0,0100 para 0,0112 (exemplo inventado).',
  },
  {
    fase: 'Dentro do bloco',
    fila: [tx('feito', 'Compra do robô', 'executada'), tx('feito', 'Sua compra', 'executada — mais cara', 16), tx('vazio', '—', '')],
    filaNota: 'Ela não falhou: o preço pior cabia no limite que você autorizou.',
    barras: [bar(P0, 70, 'antes', 0.5), bar(P1, 88, 'depois'), bar(P2, 83, 'meio')],
    slip: '40%', slipLarg: 80, slipCor: '#EF4444', slipNota: 'Foi o seu limite que deixou passar.',
    robo: 'Espera a sua ordem executar.', roboTom: 'alerta',
    legenda: 'A sua ordem executa depois, e mais caro que o cotado.',
    alt: 'A sua compra executa a um preço pior que o cotado, porque a alta causada pelo robô cabia no seu limite de slippage.',
  },
  {
    fase: 'Dentro do bloco',
    fila: [tx('feito', 'Compra do robô', 'executada'), tx('feito', 'Sua compra', 'executada', 16), tx('roboV', 'Venda do robô', 'logo depois', 0)],
    filaNota: 'Compra antes, venda depois: a sua ordem fica no meio do sanduíche.',
    barras: [bar(P0, 70, 'antes', 0.5), bar(P1, 88, 'depois'), bar(P2, 83, 'meio')],
    slip: '40%', slipLarg: 80, slipCor: '#EF4444', slipNota: 'A diferença que o robô captura veio do seu limite.',
    robo: 'Vende no preço que a sua compra sustentou.', roboTom: 'alerta',
    legenda: 'Ele vende logo depois, no preço que você sustentou.',
    alt: 'A venda do robô entra depois da sua compra, fechando o sanduíche. O arquivo não publica quanto ele ganha.',
  },
  {
    fase: 'A margem que você autoriza',
    fila: [tx('voce', 'Sua compra', 'limite apertado'), tx('vazio', 'menos espaço para o robô', ''), tx('vazio', '—', '')],
    filaNota: 'Com o limite apertado, a alta do robô não caberia: a sua ordem reverteria.',
    barras: [bar(P0, 70, 'antes'), bar(P1, 88, 'depois', 0.35), bar(P2, 74, 'meio')],
    slip: '2%', slipLarg: 12, slipCor: '#22C55E', slipNota: 'Exemplo inventado: o mínimo que ainda executa.',
    robo: 'Sem margem, o ataque deixa de compensar.', roboTom: 'ok',
    legenda: 'Quanto maior o limite que você aceita, mais espaço o robô tem.',
    alt: 'Com slippage de 2% em vez de 40% (exemplo inventado), a alta do robô não cabe no limite e o ataque perde o sentido econômico.',
  },
  {
    fase: 'O que fazer',
    fila: [
      tx('feito', 'Slippage no mínimo que ainda executa', 'a defesa mais eficaz'),
      tx('feito', 'Priority fee ajustado', 'entra a tempo, sem pagar à toa'),
      tx('feito', 'Proteção de MEV: modo Secure', 'só validadores da lista'),
    ],
    filaNota: 'Secure é mais protegido e possivelmente mais lento. Nenhum modo elimina o risco.',
    barras: [bar(P0, 70, 'antes'), bar(P1, 88, 'depois', 0.25), bar(P2, 72, 'meio')],
    slip: '2%', slipLarg: 12, slipCor: '#22C55E', slipNota: 'A documentação da Solana: limitar o slippage é a defesa mais eficaz.',
    robo: 'Continua na fila. O que muda é a margem que ele encontra.', roboTom: 'ok',
    legenda: 'Limite o slippage, ajuste a prioridade, use o modo Secure.',
    alt: 'A defesa: slippage no mínimo que ainda executa, priority fee ajustado e proteção de MEV no modo Secure — que reduz a exposição, sem eliminá-la.',
  },
];

// ---------------------------------------------------------------------------
// Ajudantes
// ---------------------------------------------------------------------------

// A caixa da fila vira "o bloco" (borda ciano) quando as ordens executam.
function bordaDoBloco(cena) {
  return cena.fase === 'Dentro do bloco' ? '#22D3EE' : '#1F2733';
}

// Cor sólida com transparência: ('#7C3AED', 0.5) → 'rgba(124,58,237,0.5)'.
// A barra esmaece pela cor, não por `opacity`: o número do preço mora dentro
// da barra, e `opacity` apagaria o número junto (texto esmaecido perde o
// contraste AA). Na tela, as duas formas dão a mesma barra.
function comTransparencia(hex, op) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${op})`;
}

// ---------------------------------------------------------------------------
// O palco
// ---------------------------------------------------------------------------

// 1. A fila (ou o bloco): fase + slot em cima, a caixa com 3 linhas e a nota.
function criarFila() {
  const fase = html`<p style="${MICRO}"></p>`;

  // Cada linha: rótulo (13px/600) à esquerda e detalhe (mono) à direita.
  const linhas = [0, 1, 2].map(() => {
    const el = html`<div class="omh-anim-transicao" style="border-radius:6px;border:1px solid #1F2733;padding:8px 10px;display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap;align-items:baseline"><span class="omh-anim-transicao" style="font-size:13px;font-weight:600"></span><span style="${MONO_MIUDO}"></span></div>`;
    const [rotulo, detalhe] = el.querySelectorAll('span');
    return { el, rotulo, detalhe };
  });

  const nota = html`<p style="margin:2px 0 0;font-size:12px;color:#9AA7B4"></p>`;
  const caixa = html`<div class="omh-anim-transicao" style="margin-top:8px;border-radius:8px;border:1px solid #1F2733;background:#10151E;padding:10px;display:flex;flex-direction:column;gap:6px">${linhas.map((l) => l.el)}${nota}</div>`;

  const el = html`<div>
    <div style="display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;align-items:baseline">${fase}<span style="${MONO_MIUDO}">slot da Solana: 350 ms</span></div>
    ${caixa}
  </div>`;

  function aplicar(c) {
    fase.textContent = c.fase;
    caixa.style.borderColor = bordaDoBloco(c);
    c.fila.forEach((t, i) => {
      const linha = linhas[i];
      linha.el.style.borderColor = t.borda;
      linha.el.style.backgroundColor = t.fundo;
      linha.el.style.marginLeft = t.recuo + 'px';
      linha.rotulo.textContent = t.rotulo;
      linha.rotulo.style.color = t.cor;
      linha.detalhe.textContent = t.detalhe;
    });
    nota.textContent = c.filaNota;
  }

  return { el, aplicar };
}

// 2a. O preço do token: 3 barras largas, número em cima e rótulo embaixo.
//
// Medidas: a área tem 96px, como no desenho (74px das barras + 4 + a linha
// do rótulo). As barras crescem nos 60px de baixo; os 14px de cima são a
// folga para o número da barra mais alta (88%) — assim ela sai do tamanho e
// no lugar que o desenho mostra. A altura segue a porcentagem de cada cena
// (70, 88, 83…), então a alta do preço aparece na barra. O rótulo fica numa
// linha à parte: sempre visível, e as barras continuam alinhadas mesmo se
// ele quebrar em duas linhas no celular.
//
// Diferença medida contra o desenho: lá as três barras dividem os mesmos 96px
// com o número e o rótulo, e o flex encurta as barras altas — medindo a cena 5
// do desenho, 70% e 88% saem as duas com 53px (e 83% com 50px), então a alta
// do preço some justamente onde a cena a conta. Aqui a barra mais alta (88%)
// fica nos mesmos 53px do desenho e as outras ficam proporcionais (70% → 42px,
// 83% → 50px como no desenho), que é o que as cenas contam.
function criarPreco() {
  const barras = [0, 1, 2].map(() => {
    // O número fica DENTRO da barra, preso no topo dela (bottom:100%):
    // quando a altura muda, ele sobe e desce junto.
    const el = html`<div class="omh-anim-transicao" style="position:relative;flex:1 1 0;min-width:0;height:0;border-radius:4px 4px 0 0"><span class="omh-anim-transicao" style="position:absolute;left:0;right:0;bottom:100%;margin-bottom:4px;text-align:center;${MONO};font-size:11px"></span></div>`;
    return { el, valor: el.querySelector('span') };
  });
  const rotulos = [0, 1, 2].map(
    () => html`<span style="flex:1 1 0;min-width:0;text-align:center;font-size:11px;color:#9AA7B4"></span>`,
  );

  const el = html`<figure style="margin:0;min-width:0">
    <p style="${MICRO};margin-bottom:6px">Preço do token <span style="${PILULA}">exemplo inventado</span></p>
    <div style="display:flex;align-items:flex-end;gap:10px;height:74px;padding-top:14px">${barras.map((b) => b.el)}</div>
    <div style="display:flex;gap:10px;margin-top:4px">${rotulos}</div>
  </figure>`;

  function aplicar(c) {
    c.barras.forEach((b, i) => {
      const barra = barras[i];
      barra.el.style.height = b.altura + '%';
      barra.el.style.backgroundColor = comTransparencia(b.fundo, b.op);
      barra.valor.textContent = b.valor;
      barra.valor.style.color = b.cor;
      // O número só some enquanto o preço ainda não existe (barra em 0).
      // Nas barras esmaecidas ele continua inteiro, para não perder contraste.
      barra.valor.style.opacity = b.op === 0 ? '0' : '1';
      rotulos[i].textContent = b.rotulo;
    });
  }

  return { el, aplicar };
}

// 2b. O cartão do slippage: valor em branco, barra de 14px e a nota.
function criarSlippage() {
  const valor = html`<span style="${MONO};font-size:14px;font-weight:700"></span>`;
  const barra = html`<div class="omh-anim-transicao" style="height:100%;width:0"></div>`;
  const nota = html`<p style="margin:6px 0 0;font-size:12px;color:#9AA7B4"></p>`;
  // O trilho tem 16px contando a borda (no app a altura inclui a borda):
  // 14px por dentro, como no desenho.
  const el = html`<div class="omh-anim-transicao" style="border-radius:8px;border:1px solid #1F2733;background:#141A24;padding:10px 12px">
    <div style="display:flex;justify-content:space-between;gap:8px;align-items:baseline"><span style="font-size:12px;color:#9AA7B4">Slippage que você aceita</span>${valor}</div>
    <div aria-hidden="true" style="margin-top:6px;height:16px;background:#0B0F17;border:1px solid #1F2733;border-radius:4px;overflow:hidden">${barra}</div>
    ${nota}
  </div>`;

  function aplicar(c) {
    valor.textContent = c.slip;
    barra.style.width = c.slipLarg + '%';
    barra.style.backgroundColor = c.slipCor;
    // Borda verde com o limite apertado; vermelha com o limite folgado.
    el.style.borderColor = c.slipCor === '#22C55E' ? NOTA.ok.b : NOTA.alerta.b;
    nota.textContent = c.slipNota;
  }

  return { el, aplicar };
}

// 2c. O cartão "O robô": o que ele faz na cena, no tom da cena
// (neutro, alerta ou ok — os trios do motor).
function criarRobo() {
  const titulo = html`<p class="omh-anim-transicao" style="${MICRO}">O robô</p>`;
  const texto = html`<p style="margin:4px 0 0;font-size:13px;color:#E6EDF3"></p>`;
  const el = html`<div class="omh-anim-transicao" style="border-radius:8px;border:1px solid #1F2733;background:#141A24;padding:10px 12px">${titulo}${texto}</div>`;

  function aplicar(c) {
    const tom = NOTA[c.roboTom] ?? NOTA.neutro;
    el.style.borderColor = tom.b;
    el.style.backgroundColor = tom.f;
    titulo.style.color = tom.c;
    texto.textContent = c.robo;
  }

  return { el, aplicar };
}

// O palco inteiro: a fila em cima; embaixo, o preço e a coluna slippage + robô.
// As duas colunas usam auto-fit com mínimo de 260px (como no desenho); o min()
// deixa a coluna encolher abaixo disso numa tela muito estreita, sem rolar.
function criarPalco() {
  const fila = criarFila();
  const preco = criarPreco();
  const slippage = criarSlippage();
  const robo = criarRobo();

  const el = html`<div style="display:flex;flex-direction:column;gap:16px">
    ${fila.el}
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(260px,100%),1fr));gap:16px">
      ${preco.el}
      <div style="display:flex;flex-direction:column;gap:10px;min-width:0">${slippage.el}${robo.el}</div>
    </div>
  </div>`;

  return {
    el,
    aplicar(cena) {
      fila.aplicar(cena);
      preco.aplicar(cena);
      slippage.aplicar(cena);
      robo.aplicar(cena);
    },
  };
}

// Miniatura da cena no modo "cenas paradas" (o bloco modoParado do desenho):
// a fila em 3 etiquetas e as 3 barrinhas do preço, sem números. O motor põe
// "cena N" em cima e a legenda embaixo.
function criarMiniatura(cena) {
  return html`<div style="display:flex;flex-direction:column;gap:8px">
    <div style="border-radius:6px;border:1px solid ${bordaDoBloco(cena)};background:#10151E;padding:8px;display:flex;flex-direction:column;gap:4px">
      ${cena.fila.map((t) => html`<span style="border-radius:4px;border:1px solid ${t.borda};background:${t.fundo};padding:3px 6px;font-size:11px;color:${t.cor};margin-left:${t.recuo}px">${t.rotulo}</span>`)}
    </div>
    <div style="display:flex;align-items:flex-end;gap:6px;height:48px">
      ${cena.barras.map((b) => html`<div style="flex:1 1 0;height:${b.altura}%;border-radius:3px 3px 0 0;background:${comTransparencia(b.fundo, b.op)}"></div>`)}
    </div>
  </div>`;
}

export function criarAnimacaoSanduiche() {
  return criarAnimacao({
    // Título e sobrancelha do desenho: "Animação 3 · Módulo 5 · 32 s".
    titulo: 'Sandwich: o robô compra antes e vende depois',
    numero: 3,
    modulo: 5,
    cenas: CENAS,
    criarPalco,
    criarMiniatura,
    duracaoPorCena: 4000,
    duracaoTransicao: 450,
    // O parágrafo de fonte do desenho (texto literal do .dc.html).
    descricao:
      'Oito cenas. Fonte: modulo5.js › slippage-priority-mev. Os preços da ilustração são inventados de propósito e aparecem marcados — o arquivo não publica lucro de robô, e esta animação também não.',
  });
}
