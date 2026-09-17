// animacoes.js — o motor de animação do hub e as seis animações do redesenho.
//
// Uma animação aqui não é vídeo: é um PALCO (HTML + SVG) que muda de estado a
// cada CENA, com uma legenda curta por cena, botões Voltar / Tocar / Avançar,
// uma barra de cenas (cada segmento é um botão com nome) e a lista das legendas
// em "Ler como texto". Quem tem "reduzir movimento" ligado não recebe autoplay
// nem transição: "Tocar" vira "Próxima cena" e há a opção de ver todas as
// cenas paradas, lado a lado.
//
// As cenas e os números vêm do handoff do Claude Design (pesquisa/design), que
// por sua vez saíram de src/data/*.js. Exemplos hipotéticos (saldo, preços,
// endereços) estão marcados na tela como "exemplo inventado".
//
// Teclado no palco: espaço toca/pausa, ← → trocam a cena, Home/End vão ao
// começo/fim.

import { html, svg, criarElemento } from '../ui.js';

const MOTION_REDUZIDO = () => window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const ROTULO_MIUDO =
  'margin:0;font-size:12px;font-weight:600;letter-spacing:.05em;text-transform:uppercase;color:#9AA7B4';
const BOTAO =
  'min-height:40px;border-radius:8px;border:1px solid #1F2733;background:#141A24;color:#E6EDF3;padding:8px 14px;font-size:14px;font-weight:600;cursor:pointer';
const BOTAO_PRIMARIO =
  'min-height:40px;border-radius:8px;border:1px solid #7C3AED;background:#7C3AED;color:#FFFFFF;padding:8px 16px;font-size:14px;font-weight:600;cursor:pointer;min-width:120px';
const PILULA_INVENTADO =
  'border-radius:999px;border:1px solid rgba(245,158,11,.4);background:rgba(245,158,11,.12);color:#F59E0B;padding:1px 10px;font-size:12px;font-weight:600';

const NOTA = {
  neutro: { b: '#1F2733', f: '#141A24', c: '#9AA7B4' },
  alerta: { b: 'rgba(239,68,68,.5)', f: 'rgba(239,68,68,.12)', c: '#F87171' },
  atencao: { b: 'rgba(245,158,11,.4)', f: 'rgba(245,158,11,.12)', c: '#F59E0B' },
  ok: { b: 'rgba(34,197,94,.5)', f: 'rgba(34,197,94,.12)', c: '#22C55E' },
};

function fmt(v) {
  return Number(v).toFixed(2).replace('.', ',');
}

// Card de nota (a explicação da cena), no tom pedido.
function criarNota() {
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

// ---------------------------------------------------------------------------
// O motor
// ---------------------------------------------------------------------------

/**
 * @param {object} p
 * @param {string}   p.titulo
 * @param {Array}    p.cenas            [{ legenda, alt, ...estado }]
 * @param {Function} p.criarPalco       () => { el, aplicar(cena, indice) }
 * @param {number}   [p.duracaoPorCena=4000]
 * @param {number}   [p.duracaoTransicao=400]
 * @param {string}   [p.nota]
 * @param {boolean}  [p.exemploInventado]
 */
export function criarAnimacao({ titulo, cenas, criarPalco, duracaoPorCena = 4000, duracaoTransicao = 400, nota = null, exemploInventado = false }) {
  const total = cenas.length;
  let atual = 0;
  let timer = null;
  let reduzir = MOTION_REDUZIDO();

  const palco = criarPalco();
  palco.el.setAttribute('role', 'img');
  palco.el.style.setProperty('--omh-anim-dur', reduzir ? '0ms' : duracaoTransicao + 'ms');

  const legenda = html`<p aria-live="polite" style="margin:0;min-height:48px;font-size:15px;font-weight:600;text-align:center;text-wrap:pretty"></p>`;
  const contador = html`<span style="margin-left:auto;font-family:'JetBrains Mono',ui-monospace,monospace;font-size:13px;color:#9AA7B4"></span>`;
  const botaoVoltar = html`<button type="button" style="${BOTAO}">Voltar</button>`;
  const botaoTocar = html`<button type="button" aria-pressed="false" style="${BOTAO_PRIMARIO}">Tocar</button>`;
  const botaoAvancar = html`<button type="button" style="${BOTAO}">Avançar</button>`;

  const segmentos = cenas.map((cena, i) => {
    const b = html`<button type="button" aria-label="Cena ${i + 1}: ${cena.legenda}" data-indice="${i}" style="display:block;width:100%;height:24px;border:0;padding:8px 0;background:transparent;cursor:pointer"><span style="display:block;height:6px;border-radius:999px;background:#1F2733"></span></button>`;
    b.addEventListener('click', () => ir(i));
    return b;
  });
  const barra = html`<ol aria-label="Cenas" style="list-style:none;margin:0;padding:0;display:flex;gap:6px">${segmentos.map((b) => html`<li style="flex:1 1 0">${b}</li>`)}</ol>`;

  const paradas = html`<div hidden style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:12px"></div>`;
  let paradasMontadas = false;
  const caixaParadas = html`<label style="display:flex;align-items:center;gap:8px;font-size:13px;color:#9AA7B4;cursor:pointer"><input type="checkbox" style="width:16px;height:16px;accent-color:#7C3AED">Ver as cenas paradas, lado a lado</label>`;
  const checkParadas = caixaParadas.querySelector('input');

  function parar() {
    clearInterval(timer);
    timer = null;
    botaoTocar.setAttribute('aria-pressed', 'false');
    pintarBotaoTocar();
  }

  function pintarBotaoTocar() {
    if (reduzir) botaoTocar.textContent = 'Próxima cena';
    else if (timer) botaoTocar.textContent = 'Pausar';
    else botaoTocar.textContent = atual === total - 1 ? 'Tocar de novo' : 'Tocar';
  }

  function pintar() {
    const cena = cenas[atual];
    palco.aplicar(cena, atual);
    palco.el.setAttribute('aria-label', cena.alt ?? cena.legenda);
    legenda.textContent = cena.legenda;
    contador.textContent = 'cena ' + (atual + 1) + ' de ' + total;
    segmentos.forEach((b, i) => {
      b.setAttribute('aria-current', String(i === atual));
      b.firstElementChild.style.background = i < atual ? '#7C3AED' : i === atual ? '#22D3EE' : '#1F2733';
    });
    pintarBotaoTocar();
  }

  function ir(n) {
    parar();
    atual = Math.max(0, Math.min(total - 1, n));
    pintar();
  }

  function iniciar() {
    botaoTocar.setAttribute('aria-pressed', 'true');
    timer = setInterval(() => {
      if (atual >= total - 1) {
        parar();
        return;
      }
      atual += 1;
      pintar();
    }, duracaoPorCena);
    pintarBotaoTocar();
  }

  botaoVoltar.addEventListener('click', () => ir(atual - 1));
  botaoAvancar.addEventListener('click', () => ir(atual + 1));
  botaoTocar.addEventListener('click', () => {
    if (reduzir) {
      ir((atual + 1) % total);
      return;
    }
    if (timer) {
      parar();
      return;
    }
    if (atual === total - 1) atual = 0;
    pintar();
    iniciar();
  });
  [botaoVoltar, botaoAvancar].forEach((b) => {
    b.addEventListener('mouseenter', () => (b.style.borderColor = '#9AA7B4'));
    b.addEventListener('mouseleave', () => (b.style.borderColor = '#1F2733'));
  });

  palco.el.setAttribute('tabindex', '0');
  palco.el.addEventListener('keydown', (evento) => {
    const mapa = { ArrowRight: () => ir(atual + 1), ArrowLeft: () => ir(atual - 1), Home: () => ir(0), End: () => ir(total - 1) };
    if (evento.key === ' ') {
      evento.preventDefault();
      botaoTocar.click();
    } else if (mapa[evento.key]) {
      evento.preventDefault();
      mapa[evento.key]();
    }
  });

  checkParadas.addEventListener('change', () => {
    if (checkParadas.checked && !paradasMontadas) {
      cenas.forEach((cena, i) => {
        const copia = criarPalco();
        copia.el.style.setProperty('--omh-anim-dur', '0ms');
        copia.el.setAttribute('role', 'img');
        copia.el.setAttribute('aria-label', cena.alt ?? cena.legenda);
        copia.aplicar(cena, i);
        paradas.append(html`<div style="border-radius:8px;border:1px solid #1F2733;padding:8px;display:flex;flex-direction:column;gap:6px">
          <p style="${ROTULO_MIUDO}">Cena ${i + 1}</p>${copia.el}
          <p style="margin:0;font-size:13px;color:#E6EDF3">${cena.legenda}</p>
        </div>`);
      });
      paradasMontadas = true;
    }
    paradas.hidden = !checkParadas.checked;
  });

  // Quem pediu menos movimento vê tudo parado de saída.
  if (reduzir) {
    checkParadas.checked = true;
    checkParadas.dispatchEvent(new Event('change'));
  }

  const lerComoTexto = html`<details style="border-radius:8px;border:1px solid #1F2733;background:#0B0F17;padding:10px 14px">
    <summary style="cursor:pointer;font-size:14px;font-weight:600">Ler como texto</summary>
    <ol style="margin:10px 0 0;padding-left:20px;font-size:14px;color:#9AA7B4;display:flex;flex-direction:column;gap:6px">
      ${cenas.map((c) => html`<li>${c.legenda}${c.alt ? html` <span style="color:#6B7889">— ${c.alt}</span>` : ''}</li>`)}
    </ol>
  </details>`;

  const segundos = Math.round((total * duracaoPorCena) / 1000);

  pintar();

  return html`<figure class="mt-4 mb-0 rounded-lg border border-borda bg-fundo p-4 sm:p-5" style="display:flex;flex-direction:column;gap:12px">
    <div style="display:flex;flex-wrap:wrap;align-items:baseline;justify-content:space-between;gap:8px">
      <figcaption style="font-size:14px;font-weight:600;color:#E6EDF3">${titulo}</figcaption>
      <span style="display:flex;gap:8px;align-items:center">${exemploInventado ? html`<span style="${PILULA_INVENTADO}">exemplo inventado</span>` : ''}<span style="${ROTULO_MIUDO}">animação · ${total} cenas · ~${segundos} s</span></span>
    </div>
    ${palco.el}
    ${legenda}
    <div style="display:flex;flex-wrap:wrap;align-items:center;gap:8px">${botaoVoltar}${botaoTocar}${botaoAvancar}${contador}</div>
    ${barra}
    ${caixaParadas}
    ${paradas}
    ${lerComoTexto}
    ${nota ? html`<p class="text-xs text-texto-suave" style="margin:0">${nota}</p>` : ''}
  </figure>`;
}

// Utilidade dos palcos: um card-caixa com título miúdo e corpo.
function caixaDoPalco(estilo = '') {
  return html`<div style="border-radius:8px;border:1px solid #1F2733;background:#141A24;padding:12px;${estilo}"></div>`;
}

// ---------------------------------------------------------------------------
// 1. Pool x·y = k (Módulo 6)
// ---------------------------------------------------------------------------

export function criarAnimacaoPool() {
  const V10 = '5,41';
  const R10 = '2,57';
  const V50 = '41,42';
  const R50 = '14,64';
  const C = [
    { legenda: 'A pool guarda tokens de um lado e SOL do outro.', x: 1, y: 1, vende: '—', cai: '—', recebe: '—', liq: 'US$ 8 mil', dolar: '—', k: false, alt: 'Duas barras iguais: tokens e SOL. Marcador no início da curva.' },
    { legenda: 'Trocar muda os dois lados, mas o produto x·y = k fica igual.', x: 1, y: 1, vende: '—', cai: '—', recebe: '—', liq: 'US$ 8 mil', dolar: '—', k: true, alt: 'A fórmula x·y = k acende. O marcador ainda no início.' },
    { legenda: 'Você vende 5,41% da reserva. Tokens entram, SOL sai.', x: 1.0541, y: 0.9487, vende: V10 + '%', cai: '−10%', recebe: '—', liq: 'US$ 8 mil', dolar: '—', k: true, alt: 'Barra de tokens sobe para 1,05; barra de SOL cai para 0,95. O marcador desce pela curva.' },
    { legenda: 'O preço cai 10%. Você recebe 2,57% da liquidez anunciada.', x: 1.0541, y: 0.9487, vende: V10 + '%', cai: '−10%', recebe: R10 + '%', liq: 'US$ 8 mil', dolar: '≈ US$ 206', k: true, alt: 'Recebe 2,57%: cerca de US$ 206 numa liquidez de US$ 8 mil (exemplo inventado).' },
    { legenda: 'Para o preço cair pela metade, você vende 41,42% da reserva.', x: 1.4142, y: 0.7071, vende: V50 + '%', cai: '−50%', recebe: '—', liq: 'US$ 8 mil', dolar: '—', k: true, alt: 'Barra de tokens sobe para 1,41; SOL cai para 0,71. O marcador está no meio da curva.' },
    { legenda: 'E recebe só 14,64% da liquidez anunciada.', x: 1.4142, y: 0.7071, vende: V50 + '%', cai: '−50%', recebe: R50 + '%', liq: 'US$ 8 mil', dolar: '≈ US$ 1.171', k: true, alt: 'Recebe 14,64%: cerca de US$ 1.171 numa liquidez de US$ 8 mil (exemplo inventado).' },
    { legenda: 'Pool 10× maior: a porcentagem não muda. Só o dólar.', x: 1.0541, y: 0.9487, vende: V10 + '%', cai: '−10%', recebe: R10 + '%', liq: 'US$ 80 mil', dolar: '≈ US$ 2.056', k: true, alt: 'Mesmo ponto da curva, mesmos 2,57%. Com liquidez de US$ 80 mil, cerca de US$ 2.056.' },
    { legenda: 'A curva é a mesma. Cada venda seguinte sai mais barata.', x: 1.4142, y: 0.7071, vende: V50 + '%', cai: '−50%', recebe: R50 + '%', liq: 'US$ 80 mil', dolar: '≈ US$ 11.712', k: true, alt: 'O marcador volta ao meio da curva: 14,64% da liquidez, em qualquer tamanho de pool.' },
  ];

  const px = (x) => 40 + ((x - 1) / 0.6) * 260;
  const py = (y) => 180 - ((y - 0.6) / 0.4) * 160;
  let caminho = '';
  for (let i = 0; i <= 60; i++) {
    const x = 1 + (i / 60) * 0.6;
    caminho += (i ? ' L' : 'M') + px(x).toFixed(1) + ',' + py(1 / x).toFixed(1);
  }

  function criarPalco() {
    const barraX = html`<div class="omh-anim-transicao" style="width:100%;height:60%;border-radius:6px 6px 0 0;background:#7C3AED"></div>`;
    const barraY = html`<div class="omh-anim-transicao" style="width:100%;height:60%;border-radius:6px 6px 0 0;background:#22D3EE"></div>`;
    const textoX = html`<span style="font-family:'JetBrains Mono',ui-monospace,monospace;font-size:13px;color:#E6EDF3"></span>`;
    const textoY = html`<span style="font-family:'JetBrains Mono',ui-monospace,monospace;font-size:13px;color:#E6EDF3"></span>`;
    const k = html`<span style="font-family:'JetBrains Mono',ui-monospace,monospace;font-size:13px;font-weight:600;border-radius:999px;border:1px solid #1F2733;padding:2px 10px;color:#9AA7B4">x · y = k</span>`;

    const marcador = svg`<circle r="7" fill="#22D3EE" stroke="#0B0F17" stroke-width="3" class="omh-anim-transicao"></circle>`;
    const guiaV = svg`<line stroke="#22D3EE" stroke-width="1.5" stroke-dasharray="4 4" class="omh-anim-transicao"></line>`;
    const grafico = html`<svg viewBox="0 0 320 200" width="100%" aria-hidden="true" style="max-width:320px"></svg>`;
    grafico.append(
      svg`<line x1="40" y1="20" x2="40" y2="180" stroke="#1F2733"></line>`,
      svg`<line x1="40" y1="180" x2="300" y2="180" stroke="#1F2733"></line>`,
      svg`<text x="300" y="196" text-anchor="end" fill="#9AA7B4" font-size="11">tokens na pool (x) →</text>`,
      svg`<text x="12" y="20" fill="#9AA7B4" font-size="11">SOL (y)</text>`,
      svg`<path d="${caminho}" fill="none" stroke="#9AA7B4" stroke-width="2"></path>`,
      guiaV,
      marcador,
    );

    const numero = (rotulo, cor) => {
      const el = html`<div style="border-radius:8px;border:1px solid #1F2733;background:#0B0F17;padding:8px 10px"><p style="${ROTULO_MIUDO}">${rotulo}</p><p style="margin:2px 0 0;font-family:'JetBrains Mono',ui-monospace,monospace;font-size:20px;font-weight:600;color:${cor}"></p></div>`;
      return { el, valor: el.querySelectorAll('p')[1] };
    };
    const nVende = numero('você vende', '#E6EDF3');
    const nCai = numero('o preço cai', '#F87171');
    const nRecebe = numero('você recebe', '#22D3EE');
    const liq = html`<p style="margin:0;font-size:13px;color:#9AA7B4"></p>`;

    const el = html`<div style="border-radius:8px;border:1px solid #1F2733;background:#10151E;padding:16px;display:grid;gap:16px;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));align-items:end">
      <div style="display:flex;flex-direction:column;gap:8px">
        <div style="display:flex;justify-content:space-between;align-items:center"><span style="${ROTULO_MIUDO}">a pool</span>${k}</div>
        <div style="display:flex;align-items:flex-end;justify-content:center;gap:40px;height:160px">
          <div style="display:flex;flex-direction:column;align-items:center;gap:6px;width:80px;height:100%;justify-content:flex-end">${textoX}${barraX}</div>
          <div style="display:flex;flex-direction:column;align-items:center;gap:6px;width:80px;height:100%;justify-content:flex-end">${textoY}${barraY}</div>
        </div>
        <div style="display:flex;justify-content:center;gap:40px;font-size:12px;color:#9AA7B4"><span style="width:80px;text-align:center">tokens</span><span style="width:80px;text-align:center">SOL</span></div>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px">
        ${grafico}
        <div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px">${nVende.el}${nCai.el}${nRecebe.el}</div>
        ${liq}
      </div>
    </div>`;

    return {
      el,
      aplicar(c) {
        barraX.style.height = Math.round(c.x * 60) + '%';
        barraY.style.height = Math.round(c.y * 60) + '%';
        textoX.textContent = 'x = ' + fmt(c.x);
        textoY.textContent = 'y = ' + fmt(c.y);
        k.style.color = c.k ? '#22D3EE' : '#9AA7B4';
        k.style.borderColor = c.k ? '#22D3EE' : '#1F2733';
        const mx = px(c.x);
        const my = py(c.y);
        marcador.setAttribute('cx', mx.toFixed(1));
        marcador.setAttribute('cy', my.toFixed(1));
        guiaV.setAttribute('x1', mx.toFixed(1));
        guiaV.setAttribute('x2', mx.toFixed(1));
        guiaV.setAttribute('y1', my.toFixed(1));
        guiaV.setAttribute('y2', '180');
        nVende.valor.textContent = c.vende;
        nCai.valor.textContent = c.cai;
        nRecebe.valor.textContent = c.recebe;
        nVende.el.style.borderColor = c.vende !== '—' ? '#7C3AED' : '#1F2733';
        nCai.el.style.borderColor = c.cai !== '—' ? 'rgba(239,68,68,.5)' : '#1F2733';
        nRecebe.el.style.borderColor = c.recebe !== '—' ? '#22D3EE' : '#1F2733';
        liq.textContent = 'Liquidez anunciada: ' + c.liq + (c.dolar !== '—' ? ' · você recebe ' + c.dolar : '');
      },
    };
  }

  return criarAnimacao({
    titulo: 'Por que cada venda sai mais barata que a anterior',
    cenas: C,
    criarPalco,
    duracaoPorCena: 4000,
    duracaoTransicao: 500,
    exemploInventado: true,
    nota: 'A conta é a da pool de produto constante: para o preço cair 10%, saem 2,57% da liquidez; para cair pela metade, 14,64%. Vale para qualquer tamanho de pool.',
  });
}

// ---------------------------------------------------------------------------
// 2. Drainer (Módulo 1)
// ---------------------------------------------------------------------------

export function criarAnimacaoDrainer() {
  const NEUTRO = '#1F2733';
  const VERM = 'rgba(239,68,68,.5)';
  const VERDE = 'rgba(34,197,94,.5)';
  const CIANO = '#22D3EE';
  const TAG = {
    isca: { t: 'anúncio · link falso', b: 'rgba(245,158,11,.4)', f: 'rgba(245,158,11,.12)', c: '#F59E0B' },
    phishing: { t: 'site clonado', b: VERM, f: 'rgba(239,68,68,.12)', c: '#F87171' },
    golpista: { t: 'o golpista', b: VERM, f: 'rgba(239,68,68,.12)', c: '#F87171' },
    defesa: { t: 'defesa', b: VERDE, f: 'rgba(34,197,94,.12)', c: '#22C55E' },
  };
  const BOT = { neutro: { b: '#1F2733', f: '#141A24', c: '#E6EDF3' }, alerta: { b: VERM, f: 'rgba(239,68,68,.12)', c: '#F87171' }, ok: { b: VERDE, f: 'rgba(34,197,94,.12)', c: '#22C55E' } };
  const SALDO = '1.000 XYZ';
  const C = [
    { legenda: 'Uma isca: airdrop, mint ou "suporte" num anúncio ou link.', saldo: SALDO, larg: 100, perm: 'nenhuma', permTom: 'ok', seta: '→', setaRotulo: 'você clica', setaCor: '#9AA7B4', tag: 'isca', siteTitulo: 'Anúncio', url: 'link encurtado · exemplo inventado', urlCor: '#F59E0B', telaTitulo: 'Reivindique seu airdrop', telaTexto: 'Conta hackeada ou falsa, marca imitada. O kit clona sites automaticamente.', botao: 'Abrir', botaoTom: 'neutro', real: '', carteira: NEUTRO, site: 'rgba(245,158,11,.4)', alt: 'Carteira com 1.000 XYZ (exemplo inventado) e nenhuma aprovação. À direita, um anúncio com link encurtado prometendo airdrop.' },
    { legenda: 'O site imita um conhecido. Endereço parecido, não igual.', saldo: SALDO, larg: 100, perm: 'nenhuma', permTom: 'ok', seta: '→', setaRotulo: 'você entra', setaCor: '#9AA7B4', tag: 'phishing', url: 'app-oficiaI.exemplo — com i maiúsculo no lugar do l · inventado', urlCor: '#F87171', telaTitulo: 'Conecte sua carteira para participar', telaTexto: 'Parece o passo normal de qualquer app. É onde a isca vira armadilha.', botao: 'Conectar carteira', botaoTom: 'neutro', real: '', carteira: NEUTRO, site: VERM, alt: 'O site clonado mostra um endereço quase igual ao oficial, com um caractere trocado, e pede para conectar a carteira.' },
    { legenda: 'Conectar só mostra os saldos. Ainda não há dano.', saldo: SALDO, larg: 100, perm: 'nenhuma', permTom: 'ok', seta: '⇢', setaRotulo: 'o site vê os saldos públicos', setaCor: CIANO, tag: 'phishing', url: 'app-oficiaI.exemplo · inventado', urlCor: '#F87171', telaTitulo: 'Carteira conectada', telaTexto: 'O site lê o que já é público na blockchain. Nada saiu.', botao: 'Continuar', botaoTom: 'neutro', real: '', carteira: CIANO, site: VERM, alt: 'Carteira conectada: o site lê os saldos públicos. Saldo intacto, nenhuma aprovação.' },
    { legenda: 'Um pop-up pede para "assinar". Parece verificação, sem taxa.', saldo: SALDO, larg: 100, perm: 'nenhuma', permTom: 'ok', seta: '←', setaRotulo: 'pedido de assinatura', setaCor: '#F59E0B', tag: 'phishing', url: 'app-oficiaI.exemplo · inventado', urlCor: '#F87171', telaTitulo: 'Assine para verificar a carteira', telaTexto: 'Chamado de "verificação" ou "claim" gratuito. Sem taxa de rede — e é isso que engana.', botao: 'Assinar mensagem', botaoTom: 'alerta', real: '', carteira: NEUTRO, site: VERM, alt: 'Pop-up pedindo para assinar uma mensagem para verificar a carteira, sem taxa.' },
    { legenda: 'O que a assinatura autoriza: approve ilimitado ou Permit sobre seus tokens.', saldo: SALDO, larg: 100, perm: 'nenhuma', permTom: 'ok', seta: '←', setaRotulo: 'leia antes de assinar', setaCor: '#F87171', tag: 'phishing', url: 'app-oficiaI.exemplo · inventado', urlCor: '#F87171', telaTitulo: 'Assine para verificar a carteira', telaTexto: 'A tela diz "verificação". O conteúdo diz outra coisa.', botao: 'Assinar mensagem', botaoTom: 'alerta', real: 'approve(spender: golpista, amount: ilimitado) — ou Permit/Permit2 (EIP-712), sem gás', carteira: NEUTRO, site: VERM, alt: 'O mesmo pop-up, com o conteúdo real revelado: approve com valor ilimitado para o contrato do golpista, ou uma assinatura Permit sem gás.' },
    { legenda: 'Você assinou. A permissão existe. A frase-semente continua só sua.', saldo: SALDO, larg: 100, perm: 'golpista: ilimitado sobre XYZ', permTom: 'alerta', seta: '✓', setaRotulo: 'permissão concedida', setaCor: '#F87171', tag: 'golpista', url: 'contrato do golpista · inventado', urlCor: '#F87171', telaTitulo: 'Verificação concluída', telaTexto: 'Ou uma tela de "erro, tente de novo". O saldo ainda está lá — por minutos.', botao: 'Fechar', botaoTom: 'neutro', real: '', carteira: VERM, site: VERM, alt: 'Aprovação ativa: o golpista tem permissão ilimitada sobre XYZ. Saldo ainda 1.000 XYZ. Frase-semente intacta.' },
    { legenda: 'transferFrom: os tokens saem sem nova ação sua. A semente nunca foi vista.', saldo: '0 XYZ', larg: 0, perm: 'golpista: ilimitado sobre XYZ', permTom: 'alerta', seta: '→', setaRotulo: 'transferFrom, depois mixers e pontes', setaCor: '#F87171', tag: 'golpista', url: 'contrato do golpista · inventado', urlCor: '#F87171', telaTitulo: 'Drenagem', telaTexto: 'A divisão operador/afiliado (tipicamente 20%/80%) é paga por contrato, sozinha.', botao: '', botaoTom: 'neutro', real: '', carteira: VERM, site: VERM, alt: 'O saldo cai de 1.000 para 0 XYZ pela permissão dada. A frase-semente nunca saiu do papel.' },
    { legenda: 'O que interrompe: desconfiar de assinatura inesperada; revogar. Revogar não desfaz.', saldo: '0 XYZ', larg: 0, perm: 'revogada', permTom: 'revogada', seta: '×', setaRotulo: 'aprovação revogada', setaCor: '#22C55E', tag: 'defesa', siteTitulo: 'A defesa', url: 'revoke.cash · Token Approval Checker', urlCor: '#22D3EE', telaTitulo: 'Antes: leia o que assina. Depois: revogue.', telaTexto: 'Revogar impede usos futuros da permissão. Não recupera o que já saiu, não salva seed vazada, não remove malware.', botao: 'Revoke', botaoTom: 'ok', real: '', carteira: VERDE, site: VERDE, alt: 'A aprovação está revogada e a permissão futura foi cortada, mas o saldo continua 0: revogar não devolve o que saiu.' },
  ];

  function criarPalco() {
    const saldoTexto = html`<span style="font-family:'JetBrains Mono',ui-monospace,monospace;font-size:18px;font-weight:600"></span>`;
    const saldoBarra = html`<div class="omh-anim-transicao" style="height:10px;border-radius:999px;background:#7C3AED;width:100%"></div>`;
    const perm = html`<span style="border-radius:999px;border:1px solid #1F2733;background:#0B0F17;padding:2px 10px;font-size:12px;color:#9AA7B4"></span>`;
    const carteira = html`<div class="omh-anim-transicao" style="border-radius:8px;border:1px solid #1F2733;background:#141A24;padding:12px;display:flex;flex-direction:column;gap:8px">
      <p style="${ROTULO_MIUDO}">Sua carteira</p>
      ${saldoTexto}
      <div style="height:10px;border-radius:999px;background:#0B0F17;overflow:hidden">${saldoBarra}</div>
      <div style="display:flex;flex-wrap:wrap;align-items:center;gap:6px;font-size:12px;color:#9AA7B4">aprovações ativas: ${perm}</div>
      <p style="margin:0;font-size:12px;color:#22C55E">Frase-semente: nunca saiu do papel</p>
    </div>`;

    const setaSimbolo = html`<span style="font-size:28px;line-height:1"></span>`;
    const setaRotulo = html`<span style="font-size:12px;text-align:center"></span>`;
    const seta = html`<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;min-width:96px">${setaSimbolo}${setaRotulo}</div>`;

    const tag = html`<span style="border-radius:999px;padding:2px 10px;font-size:12px;font-weight:600"></span>`;
    const siteTitulo = html`<p style="${ROTULO_MIUDO}"></p>`;
    const url = html`<p style="margin:0;font-family:'JetBrains Mono',ui-monospace,monospace;font-size:12px;word-break:break-word"></p>`;
    const telaTitulo = html`<p style="margin:0;font-size:14px;font-weight:600;color:#E6EDF3"></p>`;
    const telaTexto = html`<p style="margin:0;font-size:13px;color:#9AA7B4"></p>`;
    const real = html`<p class="omh-anim-transicao" style="margin:0;font-family:'JetBrains Mono',ui-monospace,monospace;font-size:12px;color:#F87171;border-radius:6px;border:1px solid rgba(239,68,68,.5);background:rgba(239,68,68,.12);padding:6px 8px"></p>`;
    const botao = html`<span style="align-self:flex-start;border-radius:8px;border:1px solid #1F2733;padding:6px 12px;font-size:13px;font-weight:600"></span>`;
    const site = html`<div class="omh-anim-transicao" style="border-radius:8px;border:1px solid #1F2733;background:#141A24;padding:12px;display:flex;flex-direction:column;gap:8px">
      <div style="display:flex;justify-content:space-between;align-items:center;gap:8px">${siteTitulo}${tag}</div>
      ${url}
      <div style="border-radius:6px;border:1px solid #1F2733;background:#0B0F17;padding:10px;display:flex;flex-direction:column;gap:6px">${telaTitulo}${telaTexto}${real}${botao}</div>
    </div>`;

    const el = html`<div style="border-radius:8px;border:1px solid #1F2733;background:#10151E;padding:16px;display:grid;grid-template-columns:minmax(0,1fr) auto minmax(0,1fr);gap:12px;align-items:stretch"></div>`;
    el.append(carteira, seta, site);
    // No celular, empilha.
    if (window.innerWidth < 640) el.style.gridTemplateColumns = 'minmax(0,1fr)';

    return {
      el,
      aplicar(c) {
        const t = TAG[c.tag] ?? TAG.phishing;
        const bt = BOT[c.botaoTom] ?? BOT.neutro;
        saldoTexto.textContent = c.saldo;
        saldoTexto.style.color = c.larg ? '#E6EDF3' : '#F87171';
        saldoBarra.style.width = c.larg + '%';
        perm.textContent = c.perm;
        const alerta = c.permTom === 'alerta';
        const revogada = c.permTom === 'revogada';
        perm.style.borderColor = alerta ? VERM : revogada ? VERDE : '#1F2733';
        perm.style.background = alerta ? 'rgba(239,68,68,.12)' : revogada ? 'rgba(34,197,94,.12)' : '#0B0F17';
        perm.style.color = alerta ? '#F87171' : revogada ? '#22C55E' : '#9AA7B4';
        carteira.style.borderColor = c.carteira;
        setaSimbolo.textContent = c.seta;
        setaSimbolo.style.color = c.setaCor;
        setaRotulo.textContent = c.setaRotulo;
        setaRotulo.style.color = c.setaCor;
        site.style.borderColor = c.site;
        siteTitulo.textContent = c.siteTitulo ?? (c.tag === 'golpista' ? 'O golpista' : 'Site');
        tag.textContent = t.t;
        tag.style.border = '1px solid ' + t.b;
        tag.style.background = t.f;
        tag.style.color = t.c;
        url.textContent = c.url;
        url.style.color = c.urlCor;
        telaTitulo.textContent = c.telaTitulo;
        telaTexto.textContent = c.telaTexto;
        real.textContent = c.real;
        real.hidden = !c.real;
        botao.textContent = c.botao;
        botao.hidden = !c.botao;
        botao.style.borderColor = bt.b;
        botao.style.background = bt.f;
        botao.style.color = bt.c;
      },
    };
  }

  return criarAnimacao({
    titulo: 'Perder tudo sem entregar a frase-semente',
    cenas: C,
    criarPalco,
    duracaoPorCena: 4000,
    exemploInventado: true,
    nota: 'O saldo de 1.000 XYZ e o endereço do site são inventados. approve, Permit/Permit2, transferFrom e a divisão 20%/80% são do Módulo 1.',
  });
}

// ---------------------------------------------------------------------------
// 3. Sanduíche (Módulo 5)
// ---------------------------------------------------------------------------

export function criarAnimacaoSanduiche() {
  const T = {
    voce: { borda: '#7C3AED', fundo: 'rgba(124,58,237,.15)', cor: '#E6EDF3' },
    roboC: { borda: 'rgba(239,68,68,.5)', fundo: 'rgba(239,68,68,.12)', cor: '#F87171' },
    roboV: { borda: 'rgba(245,158,11,.4)', fundo: 'rgba(245,158,11,.12)', cor: '#F59E0B' },
    vazio: { borda: '#1F2733', fundo: '#0B0F17', cor: '#9AA7B4' },
    feito: { borda: 'rgba(34,197,94,.5)', fundo: 'rgba(34,197,94,.12)', cor: '#22C55E' },
  };
  const tx = (tipo, rotulo, detalhe, recuo) => Object.assign({ rotulo, detalhe, recuo: recuo || 0 }, T[tipo]);
  const P0 = '0,0100';
  const P1 = '0,0112';
  const P2 = '0,0106';
  const bar = (valor, altura, tipo, op) => ({
    valor,
    altura,
    op: op === undefined ? 1 : op,
    rotulo: tipo === 'antes' ? 'antes' : tipo === 'depois' ? 'depois do robô' : 'sua execução',
    fundo: tipo === 'antes' ? '#7C3AED' : tipo === 'depois' ? '#EF4444' : '#F59E0B',
    cor: tipo === 'antes' ? '#E6EDF3' : tipo === 'depois' ? '#F87171' : '#F59E0B',
  });
  const ROBO = { neutro: NOTA.neutro, alerta: NOTA.alerta, ok: NOTA.ok };
  const C = [
    { fase: 'A fila de transações, antes do bloco', fila: [tx('voce', 'Sua compra', 'enviada agora'), tx('vazio', '—', 'fila aberta'), tx('vazio', '—', 'fila aberta')], filaNota: 'A transação vai para a fila pública antes de entrar no bloco.', barras: [bar(P0, 70, 'antes'), bar(P1, 0, 'depois', 0), bar(P2, 0, 'meio', 0)], slip: '40%', slipLarg: 80, slipCor: '#EF4444', slipNota: 'Exemplo inventado: um limite folgado.', robo: 'Ainda não fez nada. Está olhando a fila.', roboTom: 'neutro', legenda: 'Você envia a ordem de compra. Ela vai para a fila.', alt: 'A sua compra aparece na fila pública; o preço está em 0,0100 e o slippage aceito é de 40% (exemplo inventado).' },
    { fase: 'A fila de transações, antes do bloco', fila: [tx('voce', 'Sua compra', 'visível na fila'), tx('vazio', 'qualquer um pode ler', 'fila pública'), tx('vazio', '—', 'fila aberta')], filaNota: 'Quem observa a fila vê tamanho, token e o slippage que você aceitou.', barras: [bar(P0, 70, 'antes'), bar(P1, 0, 'depois', 0), bar(P2, 0, 'meio', 0)], slip: '40%', slipLarg: 80, slipCor: '#EF4444', slipNota: 'O limite folgado também é público.', robo: 'Leu a sua ordem: sabe o tamanho e o seu limite.', roboTom: 'alerta', legenda: 'Antes de entrar no bloco, a sua ordem fica visível na fila.', alt: 'A mesma fila, agora destacando que ela é pública: o robô leu o tamanho da ordem e o limite de slippage.' },
    { fase: 'A fila de transações, antes do bloco', fila: [tx('roboC', 'Compra do robô', 'priority fee maior', 0), tx('voce', 'Sua compra', 'mesmo slot, depois', 16), tx('vazio', '—', 'fila aberta')], filaNota: 'Priority fee é pagamento extra ao validador para entrar antes.', barras: [bar(P0, 70, 'antes'), bar(P1, 0, 'depois', 0), bar(P2, 0, 'meio', 0)], slip: '40%', slipLarg: 80, slipCor: '#EF4444', slipNota: 'Quanto maior o limite, mais espaço o robô tem.', robo: 'Paga prioridade para passar na frente. O slot dura 350 ms.', roboTom: 'alerta', legenda: 'O robô paga prioridade e passa na frente da sua ordem.', alt: 'A compra do robô entra acima da sua na fila, por ter pago um priority fee maior; o slot da Solana dura 350 ms.' },
    { fase: 'Dentro do bloco', fila: [tx('feito', 'Compra do robô', 'executada'), tx('voce', 'Sua compra', 'a seguir', 16), tx('vazio', '—', '')], filaNota: 'A compra do robô move a pool antes de a sua tocar nela.', barras: [bar(P0, 70, 'antes', 0.5), bar(P1, 88, 'depois'), bar(P2, 0, 'meio', 0)], slip: '40%', slipLarg: 80, slipCor: '#EF4444', slipNota: 'O novo preço ainda cabe dentro do seu limite.', robo: 'Comprou. O preço da pool subiu.', roboTom: 'alerta', legenda: 'Ele compra primeiro, e o preço da pool sobe.', alt: 'A compra do robô executa e o preço sobe de 0,0100 para 0,0112 (exemplo inventado).' },
    { fase: 'Dentro do bloco', fila: [tx('feito', 'Compra do robô', 'executada'), tx('feito', 'Sua compra', 'executada — mais cara', 16), tx('vazio', '—', '')], filaNota: 'Ela não falhou: o preço pior cabia no limite que você autorizou.', barras: [bar(P0, 70, 'antes', 0.5), bar(P1, 88, 'depois'), bar(P2, 83, 'meio')], slip: '40%', slipLarg: 80, slipCor: '#EF4444', slipNota: 'Foi o seu limite que deixou passar.', robo: 'Espera a sua ordem executar.', roboTom: 'alerta', legenda: 'A sua ordem executa depois, e mais caro que o cotado.', alt: 'A sua compra executa a um preço pior que o cotado, porque a alta causada pelo robô cabia no seu limite de slippage.' },
    { fase: 'Dentro do bloco', fila: [tx('feito', 'Compra do robô', 'executada'), tx('feito', 'Sua compra', 'executada', 16), tx('roboV', 'Venda do robô', 'logo depois', 0)], filaNota: 'Compra antes, venda depois: a sua ordem fica no meio do sanduíche.', barras: [bar(P0, 70, 'antes', 0.5), bar(P1, 88, 'depois'), bar(P2, 83, 'meio')], slip: '40%', slipLarg: 80, slipCor: '#EF4444', slipNota: 'A diferença que o robô captura veio do seu limite.', robo: 'Vende no preço que a sua compra sustentou.', roboTom: 'alerta', legenda: 'Ele vende logo depois, no preço que você sustentou.', alt: 'A venda do robô entra depois da sua compra, fechando o sanduíche. O arquivo não publica quanto ele ganha.' },
    { fase: 'A margem que você autoriza', fila: [tx('voce', 'Sua compra', 'limite apertado'), tx('vazio', 'menos espaço para o robô', ''), tx('vazio', '—', '')], filaNota: 'Com o limite apertado, a alta do robô não caberia: a sua ordem reverteria.', barras: [bar(P0, 70, 'antes'), bar(P1, 88, 'depois', 0.35), bar(P2, 74, 'meio')], slip: '2%', slipLarg: 12, slipCor: '#22C55E', slipNota: 'Exemplo inventado: o mínimo que ainda executa.', robo: 'Sem margem, o ataque deixa de compensar.', roboTom: 'ok', legenda: 'Quanto maior o limite que você aceita, mais espaço o robô tem.', alt: 'Com slippage de 2% em vez de 40% (exemplo inventado), a alta do robô não cabe no limite e o ataque perde o sentido econômico.' },
    { fase: 'O que fazer', fila: [tx('feito', 'Slippage no mínimo que ainda executa', 'a defesa mais eficaz'), tx('feito', 'Priority fee ajustado', 'entra a tempo, sem pagar à toa'), tx('feito', 'Proteção de MEV: modo Secure', 'só validadores da lista')], filaNota: 'Secure é mais protegido e possivelmente mais lento. Nenhum modo elimina o risco.', barras: [bar(P0, 70, 'antes'), bar(P1, 88, 'depois', 0.25), bar(P2, 72, 'meio')], slip: '2%', slipLarg: 12, slipCor: '#22C55E', slipNota: 'A documentação da Solana: limitar o slippage é a defesa mais eficaz.', robo: 'Continua na fila. O que muda é a margem que ele encontra.', roboTom: 'ok', legenda: 'Limite o slippage, ajuste a prioridade, use o modo Secure.', alt: 'A defesa: slippage no mínimo que ainda executa, priority fee ajustado e proteção de MEV no modo Secure — que reduz a exposição, sem eliminá-la.' },
  ];

  function criarPalco() {
    const faseRotulo = html`<p style="${ROTULO_MIUDO}"></p>`;
    const filaItens = [0, 1, 2].map(() => {
      const el = html`<div class="omh-anim-transicao" style="border-radius:8px;border:1px solid #1F2733;padding:8px 10px;display:flex;justify-content:space-between;gap:8px;align-items:baseline"><span style="font-size:13px;font-weight:600"></span><span style="font-size:12px;color:#9AA7B4"></span></div>`;
      const [rot, det] = el.querySelectorAll('span');
      return { el, rot, det };
    });
    const filaNota = html`<p style="margin:0;font-size:12px;color:#9AA7B4"></p>`;
    const fila = html`<div class="omh-anim-transicao" style="border-radius:8px;border:1px solid #1F2733;background:#141A24;padding:12px;display:flex;flex-direction:column;gap:8px">${faseRotulo}${filaItens.map((f) => f.el)}${filaNota}</div>`;

    const barras = [0, 1, 2].map(() => {
      const el = html`<div class="omh-anim-transicao" style="display:flex;flex-direction:column;align-items:center;gap:4px;width:64px;height:100%;justify-content:flex-end"><span style="font-family:'JetBrains Mono',ui-monospace,monospace;font-size:12px"></span><div class="omh-anim-transicao" style="width:100%;border-radius:6px 6px 0 0"></div><span style="font-size:11px;color:#9AA7B4;text-align:center"></span></div>`;
      const [valor, rot] = el.querySelectorAll('span');
      return { el, valor, rot, barra: el.querySelector('div') };
    });
    const precos = html`<div style="border-radius:8px;border:1px solid #1F2733;background:#141A24;padding:12px;display:flex;flex-direction:column;gap:8px">
      <p style="${ROTULO_MIUDO}">preço do token <span style="${PILULA_INVENTADO}">exemplo inventado</span></p>
      <div style="display:flex;align-items:flex-end;justify-content:center;gap:16px;height:120px">${barras.map((b) => b.el)}</div>
    </div>`;

    const slipValor = html`<span style="font-family:'JetBrains Mono',ui-monospace,monospace;font-size:18px;font-weight:600"></span>`;
    const slipBarra = html`<div class="omh-anim-transicao" style="height:10px;border-radius:999px;width:80%"></div>`;
    const slipNota = html`<p style="margin:0;font-size:12px;color:#9AA7B4"></p>`;
    const slip = html`<div class="omh-anim-transicao" style="border-radius:8px;border:1px solid #1F2733;background:#141A24;padding:12px;display:flex;flex-direction:column;gap:6px"><p style="${ROTULO_MIUDO}">limite de slippage que você aceitou</p>${slipValor}<div style="height:10px;border-radius:999px;background:#0B0F17;overflow:hidden">${slipBarra}</div>${slipNota}</div>`;

    const robo = criarNota();

    const el = html`<div style="border-radius:8px;border:1px solid #1F2733;background:#10151E;padding:16px;display:grid;gap:12px;grid-template-columns:repeat(auto-fit,minmax(240px,1fr))"></div>`;
    el.append(fila, precos, slip, robo.el);

    return {
      el,
      aplicar(c) {
        faseRotulo.textContent = c.fase;
        fila.style.borderColor = c.fase === 'Dentro do bloco' ? '#22D3EE' : '#1F2733';
        c.fila.forEach((item, i) => {
          const f = filaItens[i];
          f.rot.textContent = item.rotulo;
          f.det.textContent = item.detalhe;
          f.el.style.borderColor = item.borda;
          f.el.style.background = item.fundo;
          f.rot.style.color = item.cor;
          f.el.style.marginLeft = item.recuo + 'px';
        });
        filaNota.textContent = c.filaNota;
        c.barras.forEach((b, i) => {
          const alvo = barras[i];
          alvo.valor.textContent = b.valor;
          alvo.valor.style.color = b.cor;
          alvo.barra.style.height = b.altura + '%';
          alvo.barra.style.background = b.fundo;
          alvo.el.style.opacity = b.op;
          alvo.rot.textContent = b.rotulo;
        });
        slipValor.textContent = c.slip;
        slipValor.style.color = c.slipCor;
        slipBarra.style.width = c.slipLarg + '%';
        slipBarra.style.background = c.slipCor;
        slip.style.borderColor = c.slipCor === '#22C55E' ? 'rgba(34,197,94,.5)' : 'rgba(239,68,68,.5)';
        slipNota.textContent = c.slipNota;
        robo.aplicar('O robô', c.robo, c.roboTom);
      },
    };
  }

  return criarAnimacao({
    titulo: 'O sanduíche: o robô compra antes e vende depois de você',
    cenas: C,
    criarPalco,
    duracaoPorCena: 4000,
    duracaoTransicao: 450,
    exemploInventado: true,
    nota: 'Preços e limites são inventados. O slot de 350 ms e os modos Off, Reduced e Secure são do Módulo 5. O arquivo não publica o lucro do robô, e a animação também não.',
  });
}

// ---------------------------------------------------------------------------
// 4. Caminho do token (Módulo 5)
// ---------------------------------------------------------------------------

export function criarAnimacaoCaminhoDoToken() {
  const px = (t) => 40 + t * 260;
  const py = (v) => 140 - v * 124;
  const curvaDe = (f) => {
    let d = '';
    for (let i = 0; i <= 60; i++) {
      const t = i / 60;
      d += (i ? ' L' : 'M') + px(t).toFixed(1) + ',' + py(f(t)).toFixed(1);
    }
    return d;
  };
  const fBonding = (t) => 0.08 + 0.82 * t * t;
  const fAmm = (t) => 0.12 + (0.78 * (1 - 1 / (1 + 2.6 * t))) / (1 - 1 / 3.6);
  const CURVA = { bonding: curvaDe(fBonding), amm: curvaDe(fAmm) };
  const NOMES = ['Bonding curve', 'PumpSwap', 'AMM madura'];
  const DET = ['Uma fórmula define o preço conforme as pessoas compram.', 'A pool oficial do token, depois da graduação.', 'Pool comum de DEX, como a Raydium.'];
  const C = [
    { legenda: 'O token nasce na bonding curve, sem pool de DEX.', ativo: 0, taxas: ['1,25%', '—', '—'], curva: 'bonding', mt: 0.12, mOp: 1, gRot: 'A bonding curve', eixoX: 'compras acumuladas →', eixoY: 'preço →', custos: [], custoNota: 'O custo total aparece daqui a duas cenas.', alt: 'O token está na bonding curve, com taxa de pool de 1,25%. PumpSwap e AMM madura ainda não se aplicam.' },
    { legenda: 'Cada compra anda na fórmula. O preço sobe sozinho.', ativo: 0, taxas: ['1,25%', '—', '—'], curva: 'bonding', mt: 0.55, mOp: 1, gRot: 'A bonding curve', eixoX: 'compras acumuladas →', eixoY: 'preço →', custos: [], custoNota: 'Aqui a taxa da pool é 1,25% — oficialmente 0,300% para o criador e 0,95% para o protocolo.', alt: 'O marcador avança na curva; a taxa segue em 1,25%, repartida entre criador e protocolo.' },
    { legenda: 'Ele gradua e ganha a pool oficial dele, no PumpSwap.', ativo: 1, taxas: ['1,25%', '1,25%', '—'], curva: 'bonding', mt: 1, mOp: 0.4, gRot: 'A curva fica para trás', eixoX: 'compras acumuladas →', eixoY: 'preço →', custos: [], custoNota: 'Quanto é preciso arrecadar para graduar: o arquivo marca como não verificado, e a animação não mostra.', alt: 'O token graduou e passou para o PumpSwap. A taxa continua em 1,25%.' },
    { legenda: 'No PumpSwap a taxa segue 1,25% enquanto o market cap é pequeno.', ativo: 1, taxas: ['—', '1,25%', '—'], curva: 'amm', mt: 0.35, mOp: 1, gRot: 'Agora é uma pool: x · y = k', eixoX: 'tokens na pool →', eixoY: 'SOL na pool →', custos: [{ rotulo: 'R$512 no PumpSwap', valor: '≈ 2,4%', largura: 100, cor: '#F59E0B' }], custoNota: 'Custo total: taxa da pool, taxa da plataforma e os custos fixos de rede.', alt: 'No PumpSwap, uma ordem de R$512 custa cerca de 2,4% no total. A taxa da pool é 1,25%.' },
    { legenda: 'Conforme o market cap cresce, a taxa cai por faixas.', ativo: 1, taxas: ['—', '1,25% → faixas', '—'], curva: 'amm', mt: 0.55, mOp: 1, gRot: 'A mesma pool, mais funda', eixoX: 'tokens na pool →', eixoY: 'SOL na pool →', custos: [{ rotulo: 'R$512 no PumpSwap', valor: '≈ 2,4%', largura: 100, cor: '#F59E0B' }], custoNota: 'A queda é por faixas de market cap. Os limiares estão no arquivo, não aqui.', alt: 'A taxa do PumpSwap cai por faixas conforme o market cap cresce; o custo total da ordem de R$512 segue perto de 2,4%.' },
    { legenda: 'Mais tarde, numa AMM madura, a taxa padrão é 0,25%.', ativo: 2, taxas: ['—', '—', '0,25%'], curva: 'amm', mt: 0.8, mOp: 1, gRot: 'Pool de AMM madura', eixoX: 'tokens na pool →', eixoY: 'SOL na pool →', custos: [{ rotulo: 'R$512 no PumpSwap', valor: '≈ 2,4%', largura: 100, cor: '#F59E0B' }, { rotulo: 'R$512 na AMM madura', valor: '≈ 1,4%', largura: 58, cor: '#22C55E' }], custoNota: 'Mesma plataforma, mesmo tamanho, mesmo dia — só mudou onde o token está.', alt: 'Na AMM madura a taxa da pool é 0,25%, e a mesma ordem de R$512 custa cerca de 1,4% em vez de 2,4%.' },
    { legenda: 'A taxa é só uma parte: memecoin custou 6× um par estável.', ativo: 2, taxas: ['1,25%', '1,25% → faixas', '0,25%'], curva: 'amm', mt: 0.8, mOp: 0.4, gRot: 'O custo efetivo, além da taxa', eixoX: 'tokens na pool →', eixoY: 'SOL na pool →', custos: [{ rotulo: 'Par entre moedas estáveis', valor: '22 pb', largura: 16, cor: '#22C55E' }, { rotulo: 'Memecoin popular', valor: '140 pb', largura: 100, cor: '#EF4444' }], custoNota: 'Custo efetivo por dólar negociado: taxa, deslizamento e o que bots de MEV extraem. 534 mil negociações (Uniswap Labs).', aviso: 'A chance de sofrer deslizamento causado por um bot foi cerca de 80% maior na memecoin — e a pool estudada era mais funda que a maioria das de memecoin recém-lançada.', alt: 'Num estudo com 534 mil negociações, o custo efetivo de uma memecoin popular foi de 140 pontos-base contra 22 de um par entre moedas estáveis: seis vezes mais.' },
  ];

  function criarPalco() {
    const venues = NOMES.map((nome, k) => {
      const el = html`<div class="omh-anim-transicao" style="border-radius:8px;border:1px solid #1F2733;background:#141A24;padding:10px;display:flex;flex-direction:column;gap:4px;min-width:0">
        <div style="display:flex;justify-content:space-between;gap:6px;align-items:baseline"><span style="font-size:13px;font-weight:600">${nome}</span><span style="font-family:'JetBrains Mono',ui-monospace,monospace;font-size:14px;font-weight:600"></span></div>
        <span style="font-size:12px;color:#9AA7B4">${DET[k]}</span>
        <span style="font-size:11px;color:#22D3EE;min-height:14px"></span>
      </div>`;
      const spans = el.querySelectorAll('span');
      return { el, taxa: spans[1], aqui: spans[3] };
    });
    const setas = [0, 1].map(() => html`<span aria-hidden="true" style="align-self:center;font-size:20px;color:#9AA7B4">→</span>`);
    const trilha = html`<div style="display:grid;grid-template-columns:1fr auto 1fr auto 1fr;gap:8px;align-items:stretch"></div>`;
    trilha.append(venues[0].el, setas[0], venues[1].el, setas[1], venues[2].el);
    if (window.innerWidth < 640) {
      trilha.style.gridTemplateColumns = 'minmax(0,1fr)';
      setas.forEach((s) => (s.style.transform = 'rotate(90deg)'));
    }

    const caminho = svg`<path fill="none" stroke-width="2" class="omh-anim-transicao"></path>`;
    const marcador = svg`<circle r="6" fill="#22D3EE" stroke="#0B0F17" stroke-width="3" class="omh-anim-transicao"></circle>`;
    const eixoX = svg`<text x="300" y="158" text-anchor="end" fill="#9AA7B4" font-size="11"></text>`;
    const eixoY = svg`<text x="12" y="18" fill="#9AA7B4" font-size="11"></text>`;
    const grafico = html`<svg viewBox="0 0 320 165" width="100%" aria-hidden="true" style="max-width:320px"></svg>`;
    grafico.append(svg`<line x1="40" y1="16" x2="40" y2="140" stroke="#1F2733"></line>`, svg`<line x1="40" y1="140" x2="300" y2="140" stroke="#1F2733"></line>`, caminho, marcador, eixoX, eixoY);
    const gRot = html`<p style="${ROTULO_MIUDO}"></p>`;
    const caixaGrafico = html`<div style="border-radius:8px;border:1px solid #1F2733;background:#141A24;padding:12px;display:flex;flex-direction:column;gap:6px">${gRot}${grafico}</div>`;

    const custosLista = html`<div style="display:flex;flex-direction:column;gap:8px"></div>`;
    const custoNota = html`<p style="margin:0;font-size:12px;color:#9AA7B4"></p>`;
    const aviso = html`<p style="margin:0;font-size:12px;border-radius:6px;border:1px solid rgba(239,68,68,.5);background:rgba(239,68,68,.12);color:#F87171;padding:6px 8px"></p>`;
    const caixaCustos = html`<div style="border-radius:8px;border:1px solid #1F2733;background:#141A24;padding:12px;display:flex;flex-direction:column;gap:8px"><p style="${ROTULO_MIUDO}">o custo de uma ordem de R$512 (SOL ≈ R$512, suposição do arquivo)</p>${custosLista}${custoNota}${aviso}</div>`;

    const el = html`<div style="border-radius:8px;border:1px solid #1F2733;background:#10151E;padding:16px;display:flex;flex-direction:column;gap:12px"></div>`;
    el.append(trilha, html`<div style="display:grid;gap:12px;grid-template-columns:repeat(auto-fit,minmax(240px,1fr))">${caixaGrafico}${caixaCustos}</div>`);

    return {
      el,
      aplicar(c) {
        venues.forEach((v, k) => {
          const ativo = k === c.ativo;
          v.el.style.borderColor = ativo ? '#22D3EE' : '#1F2733';
          v.el.style.background = ativo ? 'rgba(34,211,238,.08)' : '#141A24';
          v.taxa.textContent = c.taxas[k];
          v.taxa.style.color = c.taxas[k] === '—' ? '#9AA7B4' : k === 2 ? '#22C55E' : '#F59E0B';
          v.aqui.textContent = ativo ? '● o token está aqui' : '';
        });
        setas.forEach((s, k) => (s.style.color = k < c.ativo ? '#7C3AED' : '#9AA7B4'));
        caminho.setAttribute('d', CURVA[c.curva]);
        caminho.setAttribute('stroke', c.curva === 'bonding' ? '#7C3AED' : '#9AA7B4');
        caminho.setAttribute('stroke-dasharray', c.mOp < 1 ? '5 4' : 'none');
        const f = c.curva === 'bonding' ? fBonding : fAmm;
        marcador.setAttribute('cx', px(c.mt).toFixed(1));
        marcador.setAttribute('cy', py(f(c.mt)).toFixed(1));
        marcador.style.opacity = c.mOp;
        eixoX.textContent = c.eixoX;
        eixoY.textContent = c.eixoY;
        gRot.textContent = c.gRot;
        custosLista.replaceChildren(
          ...c.custos.map(
            (custo) => html`<div><div style="display:flex;justify-content:space-between;font-size:13px"><span>${custo.rotulo}</span><span style="font-family:'JetBrains Mono',ui-monospace,monospace;color:${custo.cor}">${custo.valor}</span></div><div style="margin-top:4px;height:10px;border-radius:999px;background:#0B0F17"><div class="omh-anim-transicao" style="height:100%;border-radius:999px;width:${custo.largura}%;background:${custo.cor}"></div></div></div>`,
          ),
        );
        custosLista.hidden = !c.custos.length;
        custoNota.textContent = c.custoNota;
        aviso.textContent = c.aviso ?? '';
        aviso.hidden = !c.aviso;
      },
    };
  }

  return criarAnimacao({
    titulo: 'O caminho de um token: bonding curve → PumpSwap → AMM madura',
    cenas: C,
    criarPalco,
    duracaoPorCena: 4500,
    duracaoTransicao: 450,
    nota: 'As taxas (1,25% e 0,25%), os custos (2,4% e 1,4%) e o estudo de 534 mil negociações são do Módulo 5. O valor para graduar segue marcado como não verificado, e por isso não aparece.',
  });
}

// ---------------------------------------------------------------------------
// 5. Vida de uma narrativa (Módulo 3)
// ---------------------------------------------------------------------------

export function criarAnimacaoNarrativa() {
  const FASE = {
    nasce: { b: 'rgba(34,211,238,.5)', f: 'rgba(34,211,238,.1)', c: '#22D3EE', t: 'Nasce' },
    cresce: { b: 'rgba(124,58,237,.6)', f: 'rgba(124,58,237,.15)', c: '#E6EDF3', t: 'Cresce' },
    pico: { b: 'rgba(245,158,11,.4)', f: 'rgba(245,158,11,.12)', c: '#F59E0B', t: 'Pico e rotação' },
    satura: { b: 'rgba(239,68,68,.5)', f: 'rgba(239,68,68,.12)', c: '#F87171', t: 'Saturação' },
    limite: { b: 'rgba(245,158,11,.4)', f: 'rgba(245,158,11,.12)', c: '#F59E0B', t: 'O limite' },
    fazer: { b: 'rgba(34,197,94,.5)', f: 'rgba(34,197,94,.12)', c: '#22C55E', t: 'O que fazer' },
  };
  const TOK = {
    primeiro: { borda: 'rgba(124,58,237,.6)', fundo: 'rgba(124,58,237,.15)', cor: '#E6EDF3', peso: 600 },
    copia: { borda: '#1F2733', fundo: '#141A24', cor: '#9AA7B4', peso: 400 },
    morto: { borda: 'rgba(239,68,68,.5)', fundo: 'rgba(239,68,68,.12)', cor: '#F87171', peso: 400 },
    novo: { borda: 'rgba(34,211,238,.5)', fundo: 'rgba(34,211,238,.1)', cor: '#22D3EE', peso: 600 },
  };
  const tk = (tipo, rotulo) => Object.assign({ rotulo }, TOK[tipo]);
  const CANAIS = ['fora de cripto', 'X / Twitter', 'grupos', 'listas de "em alta"'];
  const CZ = '#1F2733';
  const CI = '#22D3EE';
  const CR = '#7C3AED';
  const CA = '#F59E0B';
  const CV = '#EF4444';
  const cn = (alturas, cores) => CANAIS.map((rotulo, i) => ({ rotulo, altura: alturas[i], cor: cores[i] }));
  const C = [
    { fase: 'nasce', onde: 'A narrativa quase sempre nasce fora da blockchain', canais: cn([62, 10, 6, 4], [CI, CZ, CZ, CZ]), tokensRotulo: 'Tokens do tema', tokensNota: 'nenhum ainda', tokens: [], notaTitulo: 'Onde nasce', nota: 'Um post no X ou no Truth Social, uma notícia, um vídeo viral. Primeiro vem o evento; o token vem depois.', notaTom: 'neutro', legenda: 'A narrativa nasce fora da blockchain: post, notícia, vídeo.', alt: 'Só o canal "fora de cripto" está aceso. Nenhum token do tema existe ainda.' },
    { fase: 'nasce', onde: '23,5% dos tokens do pump.fun nascem depois de um post', canais: cn([70, 34, 10, 6], [CI, CR, CZ, CZ]), tokensRotulo: 'O primeiro token', tokensNota: 'um só', tokens: [tk('primeiro', 'JENNER')], notaTitulo: 'O primeiro token chama atenção', nota: 'Num estudo dos 15,2 milhões de tokens criados em dois anos, 3,5 milhões surgiram logo depois de um post. 31 desses posts renderam pelo menos US$ 1 milhão a quem criou o token.', notaTom: 'neutro', legenda: 'Um primeiro token aparece e chama atenção para o tema.', alt: 'O canal fora de cripto e o X estão acesos. O primeiro token do arquivo, JENNER, aparece sozinho.' },
    { fase: 'cresce', onde: 'A esteira: 1,5 milhão de tokens copiam outro', canais: cn([66, 58, 32, 14], [CI, CR, CR, CZ]), tokensRotulo: 'A esteira', tokensNota: '+ cópias do tema', tokens: [tk('primeiro', 'JENNER'), tk('copia', 'MOTHER'), tk('copia', 'DADDY')], notaTitulo: 'A esteira', nota: 'Tokens parecidos aparecem em seguida. Mais de 10% de tudo o que se cria copia nome, símbolo, descrição e imagem de outro — e entre as cópias, 0,86% graduam, contra 9,2% dos originais.', notaTom: 'neutro', legenda: 'A esteira: tokens parecidos aparecem em seguida.', alt: 'Três tokens do tema das celebridades: JENNER, MOTHER e DADDY. Os grupos começam a acender.' },
    { fase: 'cresce', onde: 'Listagem numa corretora grande e figura pública na conversa', canais: cn([58, 78, 70, 54], [CI, CR, CR, CA]), tokensRotulo: 'O tema se espalha', tokensNota: 'outro tema, mesmo desenho', tokens: [tk('primeiro', 'MOODENG'), tk('copia', 'PNUT'), tk('copia', 'GOAT'), tk('copia', 'agentes de IA')], notaTitulo: 'A atenção se espalha', nota: 'O PNUT foi listado na Binance em 11/11/2024, com Elon Musk usando o esquilo no X. Mais de 56% das contas que espalhavam convites para grupos eram bots ou foram suspensas.', notaTom: 'atencao', legenda: 'A atenção cresce e passa por todos os canais.', alt: 'Todos os canais acesos, com as listas de em alta subindo. Aparecem MOODENG, PNUT, GOAT e os agentes de IA.' },
    { fase: 'pico', onde: 'A imprensa fora de cripto chega no topo, ou depois', canais: cn([76, 84, 66, 80], [CI, CR, CR, CA]), tokensRotulo: 'O tema seguinte já começou', tokensNota: 'rotação', tokens: [tk('copia', 'GOAT'), tk('copia', 'agentes de IA'), tk('novo', 'TRUMP')], notaTitulo: 'Rotação', nota: 'O valor somado do tema para de subir e a atenção migra para outra narrativa. Nos casos com data, como PNUT e LIBRA, a cobertura da imprensa geral veio no topo.', notaTom: 'atencao', legenda: 'Rotação: a atenção migra para a próxima narrativa.', alt: 'As barras estão altas e a atenção começa a migrar: entra o TRUMP, de outro tema, enquanto GOAT e os agentes de IA perdem espaço.' },
    { fase: 'satura', onde: 'Continuam nascendo tokens do tema, e o valor dele já cai', canais: cn([22, 30, 18, 12], [CZ, CV, CZ, CZ]), tokensRotulo: 'O que sobrou do tema', tokensNota: 'ruído', tokens: [tk('morto', 'JENNER'), tk('morto', 'MOTHER'), tk('morto', 'DADDY'), tk('copia', '+ cópias')], notaTitulo: 'Saturação e fim', nota: 'Dos 30 tokens de celebridades lançados na Solana a partir de maio de 2024, a queda média foi de 94% em cerca de um mês. Sobra ruído, e o interesse some.', notaTom: 'alerta', legenda: 'Saturação: sobra ruído e o interesse some.', alt: 'As barras de atenção caem. Os tokens do tema aparecem marcados como perdidos, com mais cópias no fim.' },
    { fase: 'limite', onde: 'O ponto que mais se perde na prática', canais: cn([40, 52, 36, 30], [CZ, CR, CZ, CZ]), tokensRotulo: 'Reconhecer o tema', tokensNota: 'não diz qual token, nem quando', tokens: [tk('copia', 'tema identificado'), tk('copia', 'fase identificada')], notaTitulo: 'O limite', nota: 'Reconhecer a narrativa não prevê o preço sozinho. No melhor caso, o sinal social rende de 1% a 3%, e só por poucos minutos — enquanto entrar e sair de uma memecoin custa de 3 a 6 pontos.', notaTom: 'alerta', mostraCusto: true, legenda: 'Reconhecer a narrativa não prevê o preço sozinho.', alt: 'Na mesma escala, o sinal social de 1% a 3% contra o custo de entrar e sair, de 3 a 6 pontos: o custo come o sinal.' },
    { fase: 'fazer', onde: 'O que dá para fazer com isso', canais: cn([44, 56, 40, 34], [CI, CR, CR, CA]), tokensRotulo: 'A rotina de estudo', tokensNota: 'treinar o olho', tokens: [tk('novo', 'anotar a fase'), tk('copia', 'conferir depois')], notaTitulo: 'Medir atenção, não adivinhar preço', nota: 'A narrativa explica de onde vem a atenção. O que fazer com ela depende do pilar técnico e da sua regra escrita — não desta animação.', notaTom: 'ok', fazer: ['Anote no diário: data, tema, primeiro token e a fase que você acha que é.', 'Depois de algumas semanas, confira quantas vezes a sua leitura de fase acertou.', 'Se um token chamar sua atenção, ele passa pelo Checklist antes de qualquer coisa.'], legenda: 'Sirva-se disso para medir atenção, não para adivinhar preço.', alt: 'A rotina: anotar a fase no diário, conferir o acerto depois de semanas, e passar todo token pelo checklist antes de agir.' },
  ];

  function criarPalco() {
    const faseChip = html`<span style="border-radius:999px;padding:2px 12px;font-size:12px;font-weight:600"></span>`;
    const onde = html`<p style="margin:0;font-size:13px;color:#E6EDF3"></p>`;
    const canais = CANAIS.map((rotulo) => {
      const el = html`<div style="display:flex;flex-direction:column;align-items:center;gap:4px;flex:1 1 0;height:100%;justify-content:flex-end"><div class="omh-anim-transicao" style="width:100%;max-width:56px;border-radius:6px 6px 0 0"></div><span style="font-size:10px;color:#9AA7B4;text-align:center;line-height:1.2">${rotulo}</span></div>`;
      return { el, barra: el.querySelector('div') };
    });
    const caixaCanais = html`<div style="border-radius:8px;border:1px solid #1F2733;background:#141A24;padding:12px;display:flex;flex-direction:column;gap:8px"><div style="display:flex;justify-content:space-between;align-items:center;gap:8px"><p style="${ROTULO_MIUDO}">atenção, por canal</p>${faseChip}</div>${onde}<div style="display:flex;align-items:flex-end;gap:8px;height:110px">${canais.map((c) => c.el)}</div></div>`;

    const tokensRotulo = html`<p style="${ROTULO_MIUDO}"></p>`;
    const tokensNota = html`<span style="font-size:12px;color:#9AA7B4"></span>`;
    const tokensLista = html`<div style="display:flex;flex-wrap:wrap;gap:6px;min-height:32px"></div>`;
    const caixaTokens = html`<div style="border-radius:8px;border:1px solid #1F2733;background:#141A24;padding:12px;display:flex;flex-direction:column;gap:8px"><div style="display:flex;justify-content:space-between;gap:8px;align-items:baseline">${tokensRotulo}${tokensNota}</div>${tokensLista}</div>`;

    const nota = criarNota();
    const custo = html`<div hidden style="display:flex;flex-direction:column;gap:6px;margin-top:8px">
      <div><div style="display:flex;justify-content:space-between;font-size:12px"><span>sinal social, no melhor caso</span><span style="font-family:'JetBrains Mono',ui-monospace,monospace">1% a 3%</span></div><div style="margin-top:3px;height:8px;border-radius:999px;background:#0B0F17"><div style="height:100%;width:50%;border-radius:999px;background:#22D3EE"></div></div></div>
      <div><div style="display:flex;justify-content:space-between;font-size:12px"><span>custo de entrar e sair</span><span style="font-family:'JetBrains Mono',ui-monospace,monospace">3 a 6 pontos</span></div><div style="margin-top:3px;height:8px;border-radius:999px;background:#0B0F17"><div style="height:100%;width:100%;border-radius:999px;background:#EF4444"></div></div></div>
    </div>`;
    const fazer = html`<ol hidden style="margin:8px 0 0;padding-left:18px;font-size:13px;color:#E6EDF3;display:flex;flex-direction:column;gap:4px"></ol>`;
    nota.el.append(custo, fazer);

    const el = html`<div style="border-radius:8px;border:1px solid #1F2733;background:#10151E;padding:16px;display:grid;gap:12px;grid-template-columns:repeat(auto-fit,minmax(240px,1fr))"></div>`;
    el.append(caixaCanais, caixaTokens, nota.el);

    return {
      el,
      aplicar(c) {
        const f = FASE[c.fase];
        faseChip.textContent = f.t;
        faseChip.style.border = '1px solid ' + f.b;
        faseChip.style.background = f.f;
        faseChip.style.color = f.c;
        onde.textContent = c.onde;
        c.canais.forEach((canal, i) => {
          canais[i].barra.style.height = canal.altura + '%';
          canais[i].barra.style.background = canal.cor;
        });
        tokensRotulo.textContent = c.tokensRotulo;
        tokensNota.textContent = c.tokensNota;
        tokensLista.replaceChildren(
          ...(c.tokens.length
            ? c.tokens.map((t) => html`<span style="border-radius:999px;border:1px solid ${t.borda};background:${t.fundo};color:${t.cor};font-weight:${t.peso};padding:3px 10px;font-size:12px">${t.rotulo}</span>`)
            : [html`<span style="font-size:12px;color:#9AA7B4">—</span>`]),
        );
        nota.aplicar(c.notaTitulo, c.nota, c.notaTom);
        custo.hidden = !c.mostraCusto;
        fazer.hidden = !c.fazer;
        if (c.fazer) fazer.replaceChildren(...c.fazer.map((item) => html`<li>${item}</li>`));
      },
    };
  }

  return criarAnimacao({
    titulo: 'A vida de uma narrativa: nasce, puxa outros tokens, roda e satura',
    cenas: C,
    criarPalco,
    duracaoPorCena: 4500,
    duracaoTransicao: 450,
    nota: 'Os casos (JENNER, MOTHER, DADDY, MOODENG, PNUT, GOAT, TRUMP) e os números são os do Módulo 3. As alturas das barras de atenção são ilustrativas, não medidas.',
  });
}

// ---------------------------------------------------------------------------
// 6. Address poisoning (Módulo 1)
// ---------------------------------------------------------------------------

export function criarAnimacaoEnvenenamento() {
  const INICIO = '0x3aF1';
  const FIM = 'Bf07';
  const MEIO_OK = '9c2e8B7d40a1f6E3c9D2b58A7e14C0f3';
  const MEIO_MAU = '7D0b3e4C91f2a8B6d5E0c73F1a9e2D48';
  const TOM = {
    ok: { borda: 'rgba(34,197,94,.5)', fundo: 'rgba(34,197,94,.08)', rotuloCor: '#22C55E' },
    mau: { borda: 'rgba(239,68,68,.5)', fundo: 'rgba(239,68,68,.08)', rotuloCor: '#F87171' },
    neutro: { borda: '#1F2733', fundo: '#0B0F17', rotuloCor: '#9AA7B4' },
  };
  const linha = (tom, rotulo, valor, meio, destaque, nota, notaCor) =>
    Object.assign(
      { rotulo, valor, meio, meioFundo: destaque === 'mau' ? 'rgba(239,68,68,.25)' : destaque === 'ok' ? 'rgba(34,197,94,.2)' : 'transparent', meioCor: destaque === 'mau' ? '#F87171' : destaque === 'ok' ? '#22C55E' : '#9AA7B4', nota: nota || '', notaCor: notaCor || '#9AA7B4' },
      TOM[tom],
    );
  const C = [
    { histRotulo: 'Seu histórico de envios', histNota: '1 endereço conhecido', histBorda: '#1F2733', linhas: [linha('ok', 'Destino que você já usou', 'enviado', MEIO_OK, 'nenhum', 'É o endereço certo, que você conferiu na fonte oficial.', '#9AA7B4')], meioFaixa: 'o meio, que quase ninguém confere', meioTom: 'neutro', pontasNota: 'Começo e fim: é por eles que a gente reconhece um endereço.', notaTitulo: 'O ponto de partida', nota: 'Você envia para um endereço conhecido. Ele já está no seu histórico, e foi conferido na fonte oficial.', notaTom: 'ok', legenda: 'Você envia para um endereço conhecido, já conferido.', alt: 'O histórico tem uma linha: o endereço certo, começando em 0x3aF1 e terminando em Bf07 (endereços inventados).' },
    { histRotulo: 'Seu histórico de envios', histNota: 'o golpista prepara o sósia', histBorda: 'rgba(239,68,68,.5)', linhas: [linha('ok', 'Destino que você já usou', 'enviado', MEIO_OK, 'nenhum', '', ''), linha('mau', 'Endereço gerado pelo golpista', 'fora do seu histórico', MEIO_MAU, 'mau', 'Mesmo começo, mesmo fim. Só o meio é outro.', '#F87171')], meioFaixa: 'só o meio muda', meioTom: 'alerta', pontasNota: 'As pontas são idênticas de propósito: é nelas que você confia.', notaTitulo: 'O sósia', nota: 'O golpista gera um endereço com os mesmos primeiros e últimos caracteres do original. Isso é barato e automatizado.', notaTom: 'alerta', legenda: 'O golpista cria um endereço com o mesmo começo e fim.', alt: 'Aparece um segundo endereço, do golpista: início 0x3aF1 e fim Bf07 iguais, e o meio destacado em vermelho porque é a única parte diferente.' },
    { histRotulo: 'Seu histórico de envios', histNota: 'chegou uma transação', histBorda: 'rgba(245,158,11,.4)', linhas: [linha('ok', 'Destino que você já usou', 'enviado', MEIO_OK, 'nenhum', '', ''), linha('mau', 'Recebido agora', 'valor 0', MEIO_MAU, 'mau', 'Uma transação minúscula, só para o endereço entrar no seu histórico.', '#F87171')], meioFaixa: 'só o meio muda', meioTom: 'alerta', pontasNota: 'O envio de valor zero não custa quase nada para quem faz.', notaTitulo: 'O envenenamento', nota: 'Ele manda uma transação de valor zero para você. O objetivo não é o dinheiro: é plantar o endereço na sua lista.', notaTom: 'atencao', legenda: 'Ele manda uma transação de valor zero, só para aparecer.', alt: 'O endereço do golpista entra no histórico por uma transação recebida de valor zero.' },
    { histRotulo: 'Seu histórico, dias depois', histNota: 'os dois parecem iguais', histBorda: 'rgba(239,68,68,.5)', linhas: [linha('neutro', 'Linha do histórico', '—', MEIO_OK, 'ok', 'O certo.', '#22C55E'), linha('neutro', 'Linha do histórico', '—', MEIO_MAU, 'mau', 'O do golpista.', '#F87171')], meioFaixa: 'a única diferença está aqui', meioTom: 'alerta', pontasNota: 'Lado a lado, com as pontas iguais, o olho não separa os dois.', notaTitulo: 'No histórico', nota: 'Os dois aparecem na mesma lista, com o mesmo começo e o mesmo fim. A única diferença são os caracteres do meio.', notaTom: 'alerta', legenda: 'No histórico, os dois endereços parecem iguais.', alt: 'As duas linhas do histórico lado a lado: pontas idênticas e os meios destacados, um em verde e um em vermelho.' },
    { histRotulo: 'Você vai enviar de novo', histNota: 'copiou do histórico', histBorda: 'rgba(239,68,68,.5)', linhas: [linha('mau', 'Copiado do histórico', 'colado no campo destino', MEIO_MAU, 'mau', 'Conferiu 0x3aF1 no começo e Bf07 no fim: bateu.', '#F87171')], meioFaixa: 'ninguém leu esta parte', meioTom: 'alerta', pontasNota: 'Foi a conferência pelas pontas que aprovou o endereço errado.', notaTitulo: 'O envio', nota: 'Você copia do histórico, confere as pontas e envia. A transação é irreversível: não existe estorno na blockchain.', notaTom: 'alerta', legenda: 'Você copia do histórico, confere as pontas e envia.', alt: 'O endereço do golpista foi copiado do histórico e colado no campo de destino; as pontas conferidas bateram.' },
    { histRotulo: 'O tamanho do problema', histNota: 'Carnegie Mellon · USENIX Security 2025', histBorda: '#1F2733', linhas: [linha('mau', '270 milhões de tentativas', 'Ethereum e BNB Chain, 07/2022 a 06/2024', MEIO_MAU, 'mau', '17 milhões de vítimas visadas, 6.633 incidentes bem-sucedidos, ao menos US$ 83,8 milhões perdidos.', '#F87171')], meioFaixa: 'automatizado, em escala', meioTom: 'alerta', pontasNota: 'Gerar sósias em massa é o modelo do ataque, não um caso isolado.', notaTitulo: 'Não é caso raro', nota: 'O estudo cobriu duas redes em dois anos. Variantes de clipper fazem o mesmo pelo outro lado: trocam o endereço na hora de colar.', notaTom: 'alerta', legenda: 'Não é caso raro: são milhões de tentativas automatizadas.', alt: 'Os números do estudo: 270 milhões de tentativas, 17 milhões de vítimas visadas, 6.633 incidentes bem-sucedidos e ao menos US$ 83,8 milhões perdidos.' },
    { histRotulo: 'A regra', histNota: 'vale para os dois golpes', histBorda: 'rgba(34,197,94,.5)', linhas: [linha('ok', 'Endereço da fonte oficial', 'conferido caractere por caractere', MEIO_OK, 'ok', 'Copiado do site ou do canal oficial, não do histórico.', '#22C55E')], meioFaixa: 'leia esta parte também', meioTom: 'ok', pontasNota: 'Conferir a linha inteira é o que separa o certo do sósia.', notaTitulo: 'O que fazer', nota: 'A defesa contra address poisoning e clipper é a mesma: nunca confiar só no começo e no fim.', notaTom: 'ok', regra: ['Confira o endereço inteiro, caractere por caractere — nunca só as pontas.', 'Copie da fonte oficial, não do seu histórico de transações.', 'Antes de um valor alto, envie uma transação-teste de valor baixo.', 'Uma carteira fria mostra o destino na própria telinha, fora do alcance do clipper.'], legenda: 'Confira o endereço inteiro e copie da fonte oficial.', alt: 'A regra final: conferir a linha inteira, copiar da fonte oficial, fazer uma transação-teste de valor baixo e usar a telinha da carteira fria.' },
  ];
  const MEIO = { neutro: NOTA.neutro, alerta: NOTA.alerta, ok: NOTA.ok };

  function criarPalco() {
    const histRotulo = html`<p style="${ROTULO_MIUDO}"></p>`;
    const histNota = html`<span style="font-size:12px;color:#9AA7B4"></span>`;
    const linhas = html`<div style="display:flex;flex-direction:column;gap:8px"></div>`;
    const hist = html`<div class="omh-anim-transicao" style="border-radius:8px;border:1px solid #1F2733;background:#141A24;padding:12px;display:flex;flex-direction:column;gap:8px"><div style="display:flex;justify-content:space-between;gap:8px;align-items:baseline">${histRotulo}${histNota}</div>${linhas}</div>`;

    const meioFaixa = html`<span style="border-radius:999px;padding:2px 10px;font-size:12px;font-weight:600"></span>`;
    const pontasNota = html`<p style="margin:0;font-size:12px;color:#9AA7B4"></p>`;
    const pontas = html`<div style="border-radius:8px;border:1px solid #1F2733;background:#141A24;padding:12px;display:flex;flex-direction:column;gap:8px">
      <p style="${ROTULO_MIUDO}">como o olho lê um endereço <span style="${PILULA_INVENTADO}">endereços inventados</span></p>
      <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;font-family:'JetBrains Mono',ui-monospace,monospace;font-size:13px">
        <span style="border-radius:6px;border:1px solid rgba(34,197,94,.5);background:rgba(34,197,94,.12);padding:2px 6px">${INICIO}</span>
        ${meioFaixa}
        <span style="border-radius:6px;border:1px solid rgba(34,197,94,.5);background:rgba(34,197,94,.12);padding:2px 6px">${FIM}</span>
      </div>
      ${pontasNota}
    </div>`;

    const nota = criarNota();
    const regra = html`<ol hidden style="margin:8px 0 0;padding-left:18px;font-size:13px;color:#E6EDF3;display:flex;flex-direction:column;gap:4px"></ol>`;
    nota.el.append(regra);

    const el = html`<div style="border-radius:8px;border:1px solid #1F2733;background:#10151E;padding:16px;display:grid;gap:12px;grid-template-columns:repeat(auto-fit,minmax(260px,1fr))"></div>`;
    el.append(hist, pontas, nota.el);

    return {
      el,
      aplicar(c) {
        histRotulo.textContent = c.histRotulo;
        histNota.textContent = c.histNota;
        hist.style.borderColor = c.histBorda;
        linhas.replaceChildren(
          ...c.linhas.map(
            (l) => html`<div style="border-radius:8px;border:1px solid ${l.borda};background:${l.fundo};padding:8px 10px;display:flex;flex-direction:column;gap:4px">
              <div style="display:flex;justify-content:space-between;gap:8px;font-size:12px"><span style="font-weight:600;color:${l.rotuloCor}">${l.rotulo}</span><span style="color:#9AA7B4">${l.valor}</span></div>
              <p style="margin:0;font-family:'JetBrains Mono',ui-monospace,monospace;font-size:12px;word-break:break-all;color:#E6EDF3">${INICIO}<span style="background:${l.meioFundo};color:${l.meioCor};border-radius:3px;padding:0 2px">${l.meio}</span>${FIM}</p>
              ${l.nota ? html`<p style="margin:0;font-size:12px;color:${l.notaCor}">${l.nota}</p>` : ''}
            </div>`,
          ),
        );
        const m = MEIO[c.meioTom] ?? MEIO.neutro;
        meioFaixa.textContent = c.meioFaixa;
        meioFaixa.style.border = '1px solid ' + m.b;
        meioFaixa.style.background = m.f;
        meioFaixa.style.color = m.c;
        pontasNota.textContent = c.pontasNota;
        nota.aplicar(c.notaTitulo, c.nota, c.notaTom);
        regra.hidden = !c.regra;
        if (c.regra) regra.replaceChildren(...c.regra.map((item) => html`<li>${item}</li>`));
      },
    };
  }

  return criarAnimacao({
    titulo: 'O endereço quase igual',
    cenas: C,
    criarPalco,
    duracaoPorCena: 4500,
    duracaoTransicao: 450,
    exemploInventado: true,
    nota: 'Os endereços são inventados. Os números do estudo (270 milhões de tentativas, 17 milhões de vítimas visadas, 6.633 incidentes, US$ 83,8 milhões) são do Módulo 1.',
  });
}
