// visuais.js — o vocabulário visual didático do hub, desenhado em SVG.
//
// Por que existe: o app explicava quase tudo em prosa, e prosa é ruim para
// mostrar RELAÇÃO — o que causa o quê, o que vem antes, o que é maior. Cada peça
// aqui mostra uma relação, e nenhuma é decorativa (detalhe decorativo atrapalha
// o aprendizado; ver pesquisa/modulos/pesquisas/P14).
//
//   criarMapaMental          o todo antes das partes (abertura de módulo)
//   criarBarrasNaMesmaEscala proporção entre grandezas
//   criarGradeDe100          probabilidade, em pessoas de carne e osso
//   criarSequencia           ordem de execução
//   criarCiclo               o que se repete
//   criarCurvaDeSaida        sensibilidade: mexer e ver a conta mudar
//
// ACESSIBILIDADE — a mesma inversão da anatomia e da calculadora: o texto é o
// conteúdo, o desenho é enriquecimento. Todo SVG é role="img" com descrição, e
// ao lado dele existe a mesma informação em HTML de verdade (lista, tabela ou
// números), que é o que o leitor de tela lê e o que aparece se algo falhar.
//
// Nada aqui inventa número: quem chama passa os valores, que vêm de src/data.

import { html, svg, criarElemento } from '../ui.js';

const COR = {
  borda: 'var(--omh-borda)',
  texto: 'var(--omh-texto)',
  suave: 'var(--omh-texto-suave)',
  acento: 'var(--omh-acento)',
  primaria: 'var(--omh-primaria)',
  baixo: 'var(--omh-risco-baixo)',
  medio: 'var(--omh-risco-medio)',
  alto: 'var(--omh-risco-alto)',
};

const CORES_DE_TOM = { acento: COR.acento, primaria: COR.primaria, baixo: COR.baixo, medio: COR.medio, alto: COR.alto, suave: COR.suave };

function corDoTom(tom) {
  return CORES_DE_TOM[tom] ?? COR.acento;
}

// Caixa padrão de figura: moldura, título opcional e nota de rodapé opcional.
// Diagrama largo rola dentro da própria caixa (tabindex para o teclado também
// conseguir rolar), nunca empurrando a página para o lado.
function moldura({ titulo, conteudo, nota, rolavel = true }) {
  // O tabindex entra por JS: o helper html`` interpola VALOR de atributo, não um
  // atributo inteiro — escrever ${cond ? 'tabindex="0"' : ''} deixa lixo no DOM.
  const caixa = html`<div class="${rolavel ? 'overflow-x-auto' : ''}">${conteudo}</div>`;
  if (rolavel) caixa.setAttribute('tabindex', '0');

  return html`
    <figure class="mt-4 mb-0 rounded-lg border border-borda bg-fundo p-4">
      ${titulo ? html`<figcaption class="mb-3 text-sm font-semibold text-texto">${titulo}</figcaption>` : ''}
      ${caixa}
      ${nota ? html`<p class="mt-3 text-xs text-texto-suave">${nota}</p>` : ''}
    </figure>
  `;
}

/**
 * Mapa mental: o centro é o módulo, cada ramo é uma aba, cada folha é uma ideia.
 * Serve de "mapa da cidade" antes de entrar rua por rua.
 *
 * @param {object} p
 * @param {string} p.centro  nome do módulo
 * @param {Array}  p.ramos   [{ titulo, folhas: [], aoAbrir?: () => void }]
 */
export function criarMapaMental({ centro, ramos = [], nota = null, titulo = null }) {
  const lista = criarElemento(
    'ul',
    { class: 'grid gap-3 sm:grid-cols-2 xl:grid-cols-3' },
    ramos.map((ramo) => {
      const folhas = html`
        <ul class="mt-2 space-y-1 text-sm text-texto-suave">
          ${ramo.folhas.map((folha) => html`<li class="before:mr-2 before:text-acento before:content-['—']">${folha}</li>`)}
        </ul>
      `;

      // Ramo clicável leva à aba. Quando não há para onde ir, continua um item
      // de lista comum — sem botão que não faz nada.
      const cabecalho = ramo.aoAbrir
        ? html`<button type="button" class="w-full text-left text-sm font-semibold text-texto hover:text-acento">
             ${ramo.titulo} <span aria-hidden="true">→</span>
           </button>`
        : html`<p class="text-sm font-semibold text-texto">${ramo.titulo}</p>`;

      if (ramo.aoAbrir) cabecalho.addEventListener('click', ramo.aoAbrir);

      return html`<li class="rounded-lg border border-borda bg-superficie p-3">${cabecalho}${folhas}</li>`;
    }),
  );

  return moldura({
    titulo: titulo ?? 'Mapa do módulo: ' + centro,
    rolavel: false,
    conteudo: lista,
    nota,
  });
}

/**
 * Barras na mesma escala: a comparação que uma frase não faz.
 * Cada item pode ter partes (ex.: a liquidez dividida entre SOL e token).
 *
 * @param {object} p
 * @param {Array} p.itens  [{ rotulo, valor, exibicao, nota?, partes?: [{ fracao, tom, rotulo }] }]
 */
export function criarBarrasNaMesmaEscala({ titulo, itens = [], nota = null, descricao = '' }) {
  const maior = Math.max(...itens.map((i) => i.valor));

  const barras = itens.map((item) => {
    const largura = ((item.valor / maior) * 100).toFixed(2) + '%';
    const partes = item.partes?.length
      ? item.partes.map(
          (parte) => html`<span class="h-full" style="width: ${(parte.fracao * 100).toFixed(2)}%; background: ${corDoTom(parte.tom)}"></span>`,
        )
      : [html`<span class="h-full w-full" style="background: ${corDoTom(item.tom)}"></span>`];

    return html`
      <div class="mt-3">
        <div class="flex items-baseline justify-between gap-3">
          <span class="text-sm text-texto">${item.rotulo}</span>
          <span class="font-mono text-sm font-medium text-texto">${item.exibicao}</span>
        </div>
        <div class="mt-1 flex h-6 overflow-hidden rounded" style="width: ${largura}; min-width: 2px; outline: 1px solid ${COR.borda}">${partes}</div>
        ${item.nota ? html`<p class="mt-1 text-xs text-texto-suave">${item.nota}</p>` : ''}
      </div>
    `;
  });

  // A reserva em texto: quem usa leitor de tela ouve rótulo e valor, que é a
  // informação inteira. O desenho só torna a proporção visível de relance.
  return moldura({
    titulo,
    conteudo: html`<div role="img" aria-label="${descricao || itens.map((i) => i.rotulo + ': ' + i.exibicao).join('; ')}">${barras}</div>`,
    nota,
    rolavel: false,
  });
}

/**
 * Grade de 100: probabilidade em quadradinhos. "De cada 100, N".
 * @param {object} p
 * @param {Array} p.grupos  [{ quantidade, tom, rotulo }] — a soma deve dar 100
 */
export function criarGradeDe100({ titulo, grupos = [], frase, nota = null }) {
  const quadrados = [];
  grupos.forEach((grupo) => {
    for (let i = 0; i < grupo.quantidade; i++) {
      quadrados.push(svg`<rect width="14" height="14" rx="2" x="${(quadrados.length % 10) * 18}" y="${Math.floor(quadrados.length / 10) * 18}"
        fill="${corDoTom(grupo.tom)}" />`);
    }
  });

  const desenho = html`<svg viewBox="0 0 178 178" width="196" height="196" role="img" aria-label="${frase}" class="shrink-0"></svg>`;
  desenho.append(...quadrados);

  const legenda = html`
    <ul class="space-y-2 text-sm text-texto-suave">
      ${grupos.map(
        (grupo) => html`
          <li class="flex items-start gap-2">
            <span class="mt-1 inline-block h-3 w-3 shrink-0 rounded-sm" style="background: ${corDoTom(grupo.tom)}"></span>
            <span><strong class="font-mono text-texto">${grupo.quantidade}</strong> ${grupo.rotulo}</span>
          </li>
        `,
      )}
    </ul>
  `;

  return moldura({
    titulo,
    rolavel: false,
    conteudo: html`
      <div class="flex flex-wrap items-start gap-5">
        ${desenho}
        <div class="min-w-[12rem] flex-1">
          <p class="text-sm font-semibold text-texto">${frase}</p>
          <div class="mt-3">${legenda}</div>
        </div>
      </div>
    `,
    nota,
  });
}

/**
 * Sequência: passos numerados com ligação entre eles. Ordem de execução.
 * @param {object} p
 * @param {Array} p.passos  [{ titulo, texto, tom? }]
 */
export function criarSequencia({ titulo, passos = [], nota = null, comReproducao = false, segundosPorPasso = 4 }) {
  const itens = passos.map(
    (passo, indice) => html`
      <li class="flex min-w-[13rem] flex-1 flex-col rounded-lg border p-3 transition-colors duration-150"
          style="border-color: ${corDoTom(passo.tom ?? 'suave')}40; background: var(--omh-superficie)">
        <span class="font-mono text-xs" style="color: ${corDoTom(passo.tom ?? 'acento')}">passo ${indice + 1}</span>
        <span class="mt-1 text-sm font-semibold text-texto">${passo.titulo}</span>
        ${passo.texto ? html`<span class="mt-1 text-sm text-texto-suave">${passo.texto}</span>` : ''}
      </li>
    `,
  );

  const lista = html`<ol class="flex min-w-max gap-3 md:min-w-0 md:flex-wrap">${itens}</ol>`;

  if (!comReproducao) return moldura({ titulo, conteudo: lista, nota });

  // Passo a passo "tocável": os mesmos passos, um de cada vez. Não é vídeo — é a
  // mesma lista, com um destaque que anda. Quem prefere ler tudo de uma vez só
  // ignora os botões, porque todos os passos continuam visíveis e legíveis.
  let atual = 0;
  let timer = null;

  const legenda = criarElemento('p', {
    class: 'mt-3 text-sm text-texto',
    role: 'status',
    'aria-live': 'polite',
  });

  const botaoTocar = html`<button type="button"
    class="rounded-lg border border-acento/60 bg-acento/10 px-3 py-1 text-sm text-texto hover:border-acento">Tocar</button>`;
  const botaoVoltar = html`<button type="button" aria-label="Passo anterior"
    class="rounded-lg border border-borda bg-superficie px-3 py-1 text-sm text-texto-suave hover:border-texto-suave hover:text-texto">←</button>`;
  const botaoAvancar = html`<button type="button" aria-label="Próximo passo"
    class="rounded-lg border border-borda bg-superficie px-3 py-1 text-sm text-texto-suave hover:border-texto-suave hover:text-texto">→</button>`;

  function pintar() {
    itens.forEach((item, indice) => {
      const ativo = indice === atual;
      item.style.borderColor = ativo ? COR.primaria : corDoTom(passos[indice].tom ?? 'suave') + '40';
      item.style.background = ativo ? 'rgba(124, 58, 237, 0.15)' : 'var(--omh-superficie)';
    });
    const passo = passos[atual];
    legenda.textContent = 'Passo ' + (atual + 1) + ' de ' + passos.length + ': ' + passo.titulo;
  }

  function parar() {
    clearInterval(timer);
    timer = null;
    botaoTocar.textContent = 'Tocar';
  }

  function andar(passosParaFrente) {
    atual = (atual + passosParaFrente + passos.length) % passos.length;
    pintar();
  }

  botaoVoltar.addEventListener('click', () => {
    parar();
    andar(-1);
  });
  botaoAvancar.addEventListener('click', () => {
    parar();
    andar(1);
  });
  botaoTocar.addEventListener('click', () => {
    if (timer) {
      parar();
      return;
    }
    botaoTocar.textContent = 'Pausar';
    timer = setInterval(() => {
      if (atual === passos.length - 1) {
        parar();
        return;
      }
      andar(1);
    }, segundosPorPasso * 1000);
  });

  pintar();

  const controles = html`
    <div class="mt-3 flex flex-wrap items-center gap-2">
      ${botaoVoltar}${botaoTocar}${botaoAvancar}
      <span class="text-xs text-texto-suave">Os passos ficam todos na tela: os botões só movem o destaque.</span>
    </div>
  `;

  return moldura({
    titulo,
    rolavel: false,
    conteudo: html`<div><div class="overflow-x-auto" tabindex="0">${lista}</div>${controles}${legenda}</div>`,
    nota,
  });
}

/**
 * Ciclo: etapas em círculo, com a seta que volta ao começo.
 * @param {object} p
 * @param {Array} p.etapas  [{ titulo, texto }]
 */
export function criarCiclo({ titulo, etapas = [], centro = '', nota = null }) {
  const raio = 96;
  const meio = 130;
  const pontos = etapas.map((etapa, i) => {
    const angulo = (i / etapas.length) * Math.PI * 2 - Math.PI / 2;
    return { ...etapa, x: meio + raio * Math.cos(angulo), y: meio + raio * Math.sin(angulo), numero: i + 1 };
  });

  const desenho = html`<svg viewBox="0 0 260 260" width="260" height="260" role="img"
    aria-label="Ciclo: ${etapas.map((e) => e.titulo).join(' → ')} e volta ao começo" class="shrink-0"></svg>`;

  desenho.append(
    svg`<circle cx="${meio}" cy="${meio}" r="${raio}" fill="none" stroke="${COR.borda}" stroke-width="2" />`,
    ...(centro ? [svg`<text x="${meio}" y="${meio + 4}" text-anchor="middle" fill="${COR.suave}" font-size="12">${centro}</text>`] : []),
    ...pontos.flatMap((ponto) => [
      svg`<circle cx="${ponto.x}" cy="${ponto.y}" r="16" fill="var(--omh-superficie)" stroke="${COR.acento}" stroke-width="2" />`,
      svg`<text x="${ponto.x}" y="${ponto.y + 5}" text-anchor="middle" fill="${COR.acento}" font-size="13" font-weight="700">${ponto.numero}</text>`,
    ]),
  );

  const legenda = html`
    <ol class="flex-1 space-y-2 text-sm">
      ${pontos.map(
        (ponto) => html`
          <li class="flex gap-2">
            <span class="font-mono text-acento">${ponto.numero}</span>
            <span
              ><strong class="text-texto">${ponto.titulo}</strong
              >${ponto.texto ? criarElemento('span', { class: 'text-texto-suave' }, [' — ' + ponto.texto]) : ''}</span
            >
          </li>
        `,
      )}
    </ol>
  `;

  return moldura({
    titulo,
    rolavel: false,
    conteudo: html`<div class="flex flex-wrap items-center gap-6">${desenho}<div class="min-w-[14rem] flex-1">${legenda}</div></div>`,
    nota,
  });
}

/**
 * Curva de saída (Módulo 6): quanto sai da pool antes de o preço cair X%.
 *
 * A conta é a da pool de produto constante (x · y = k), a mesma do texto: se o
 * preço cai `d`, a fração da liquidez que sai é (1 − √(1−d)) / 2 e a fração dos
 * tokens vendidos é 1/√(1−d) − 1. Os números de referência do módulo (2,57% para
 * 10% e 14,64% para a metade) caem exatamente nessa curva.
 *
 * @param {object} p
 * @param {number} p.liquidez  liquidez anunciada, em dólares, do exemplo
 */
export function criarCurvaDeSaida({ liquidez = 8000, titulo = 'Quanto sai antes de o preço cair', nota = null } = {}) {
  const ESQ = 60;
  const LARG = 560;
  const TOPO = 20;
  const ALT = 260;

  const emBr = (n, casas) => n.toLocaleString('pt-BR', { minimumFractionDigits: casas, maximumFractionDigits: casas });
  const x = (fracao) => ESQ + fracao * 2 * LARG;
  const y = (preco) => TOPO + (1 - preco) * ALT;

  const pontos = [];
  for (let i = 0; i <= 50; i++) {
    const fracao = i / 100;
    const preco = (1 - 2 * fracao) ** 2;
    pontos.push(x(fracao).toFixed(1) + ',' + y(preco).toFixed(1));
  }

  const desenho = html`<svg viewBox="0 0 660 330" width="100%" role="img"
    aria-label="Curva: quanto mais dinheiro sai da pool, mais o preço cai. Tirar 2,57% da liquidez derruba o preço 10%; tirar 14,64% derruba pela metade."></svg>`;

  const eixos = [
    svg`<line x1="${ESQ}" y1="${TOPO}" x2="${ESQ}" y2="${TOPO + ALT}" stroke="${COR.borda}" />`,
    svg`<line x1="${ESQ}" y1="${TOPO + ALT}" x2="${ESQ + LARG}" y2="${TOPO + ALT}" stroke="${COR.borda}" />`,
    svg`<line x1="${ESQ}" y1="${y(0.5)}" x2="${ESQ + LARG}" y2="${y(0.5)}" stroke="${COR.borda}" stroke-dasharray="3 4" />`,
    svg`<text x="${ESQ - 10}" y="${TOPO + 5}" text-anchor="end" fill="${COR.suave}" font-size="12">100%</text>`,
    svg`<text x="${ESQ - 10}" y="${y(0.5) + 5}" text-anchor="end" fill="${COR.suave}" font-size="12">50%</text>`,
    svg`<text x="${ESQ - 10}" y="${TOPO + ALT + 5}" text-anchor="end" fill="${COR.suave}" font-size="12">0%</text>`,
    svg`<text x="${ESQ + LARG / 2}" y="324" text-anchor="middle" fill="${COR.suave}" font-size="13">dinheiro que sai da pool (% da liquidez)</text>`,
    ...[0, 0.1, 0.2, 0.3, 0.4, 0.5].map(
      (f) => svg`<text x="${x(f)}" y="${TOPO + ALT + 20}" text-anchor="middle" fill="${COR.suave}" font-size="12">${(f * 100).toFixed(0)}%</text>`,
    ),
    svg`<polyline points="${pontos.join(' ')}" fill="none" stroke="${COR.suave}" stroke-width="2" />`,
    svg`<circle cx="${x(0.0257)}" cy="${y(0.9)}" r="4" fill="var(--omh-superficie)" stroke="${COR.suave}" stroke-width="1.5" />`,
    svg`<text x="${x(0.0257) + 10}" y="${y(0.9) - 6}" fill="${COR.suave}" font-size="12">2,57% → −10%</text>`,
    svg`<circle cx="${x(0.1464)}" cy="${y(0.5)}" r="4" fill="var(--omh-superficie)" stroke="${COR.suave}" stroke-width="1.5" />`,
    svg`<text x="${x(0.1464) + 10}" y="${y(0.5) - 10}" fill="${COR.suave}" font-size="12">14,64% → −50%</text>`,
  ];

  const marcadorV = svg`<line stroke="${COR.acento}" stroke-width="1.5" stroke-dasharray="4 4" />`;
  const marcadorH = svg`<line stroke="var(--omh-risco-alto-texto)" stroke-width="1.5" stroke-dasharray="4 4" />`;
  const bolinha = svg`<circle r="7" fill="${COR.acento}" stroke="var(--omh-fundo)" stroke-width="3" />`;
  desenho.append(...eixos, marcadorV, marcadorH, bolinha);

  const saidaQueda = html`<span class="font-mono text-2xl" style="color: var(--omh-risco-alto-texto)"></span>`;
  const saidaTokens = html`<span class="font-mono text-2xl text-texto"></span>`;
  const saidaFatia = html`<span class="font-mono text-2xl text-acento"></span>`;
  const saidaDolar = html`<span class="text-xs text-texto-suave"></span>`;

  const controle = html`<input type="range" min="1" max="90" step="1" value="10" class="omh-range w-full"
    aria-label="Queda de preço, em porcentagem" />`;

  function atualizar() {
    const queda = Number(controle.value) / 100;
    const sobra = Math.sqrt(1 - queda);
    const fatia = (1 - sobra) / 2;
    const tokens = 1 / sobra - 1;

    saidaQueda.textContent = '−' + emBr(queda * 100, 0) + '%';
    saidaTokens.textContent = emBr(tokens * 100, 1) + '%';
    saidaFatia.textContent = emBr(fatia * 100, 2) + '%';
    // O dólar sai da porcentagem JÁ ARREDONDADA que aparece ao lado. Sem isso, a
    // tela mostraria 2,57% e US$ 205, enquanto o texto do módulo diz US$ 206.
    const fatiaExibida = Number(emBr(fatia * 100, 2).replace(',', '.')) / 100;
    saidaDolar.textContent = 'US$ ' + emBr(fatiaExibida * liquidez, 0) + ' de US$ ' + emBr(liquidez, 0);

    marcadorV.setAttribute('x1', x(fatia));
    marcadorV.setAttribute('x2', x(fatia));
    marcadorV.setAttribute('y1', y(1 - queda));
    marcadorV.setAttribute('y2', TOPO + ALT);
    marcadorH.setAttribute('x1', ESQ);
    marcadorH.setAttribute('x2', x(fatia));
    marcadorH.setAttribute('y1', y(1 - queda));
    marcadorH.setAttribute('y2', y(1 - queda));
    bolinha.setAttribute('cx', x(fatia));
    bolinha.setAttribute('cy', y(1 - queda));
  }

  controle.addEventListener('input', atualizar);

  const atalhos = [10, 25, 50].map((valor) => {
    const botao = html`<button type="button" class="rounded-lg border border-borda bg-superficie px-3 py-1 text-sm text-texto-suave hover:border-texto-suave hover:text-texto">−${valor}%</button>`;
    botao.addEventListener('click', () => {
      controle.value = String(valor);
      atualizar();
    });
    return botao;
  });

  const painel = html`
    <div>
      <div class="flex flex-wrap items-center justify-between gap-3">
        <span class="text-sm font-semibold text-texto">Arraste: quanto você aceita derrubar o preço?</span>
        <div class="flex gap-2">${atalhos}</div>
      </div>
      <div class="mt-3">${controle}</div>
      <dl class="mt-4 grid gap-4 sm:grid-cols-3">
        <div><dt class="text-xs text-texto-suave">O preço cai</dt><dd class="mt-1">${saidaQueda}</dd></div>
        <div><dt class="text-xs text-texto-suave">Você vende</dt><dd class="mt-1">${saidaTokens}<span class="mt-1 block text-xs text-texto-suave">dos tokens da pool</span></dd></div>
        <div><dt class="text-xs text-texto-suave">Você recebe</dt><dd class="mt-1">${saidaFatia}${html`<span class="mt-1 block">${saidaDolar}</span>`}</dd></div>
      </dl>
      <div class="mt-4 overflow-x-auto" tabindex="0">${desenho}</div>
    </div>
  `;

  atualizar();

  return moldura({
    titulo,
    rolavel: false,
    conteudo: painel,
    nota: nota ?? 'As porcentagens não dependem do tamanho da pool: numa pool dez vezes maior, mudam só os dólares.',
  });
}

/**
 * Mapa do módulo montado a partir dos próprios dados: um ramo por aba, e as
 * folhas são os títulos das seções daquela aba (nada inventado aqui).
 *
 * @param {object} p
 * @param {string} p.nome      nome curto do módulo ("Ler a tela")
 * @param {Array}  p.secoes    modulo.secoes — cada seção com `aba` e `titulo`
 * @param {Array}  p.abas      [{ id, rotulo }] na ordem em que aparecem
 * @param {number} p.limite    quantas folhas por ramo (padrão 3)
 */
export function criarMapaDoModulo({ nome, secoes = [], abas = [], limite = 3, nota = null }) {
  const ramos = abas
    .filter((aba) => aba.id !== 'quiz')
    .map((aba) => {
      const folhas = secoes
        .filter((secao) => secao.aba === aba.id)
        // O título, não a frase-resumo: mapa é para bater o olho. A frase inteira
        // espera o leitor lá dentro, na seção.
        .map((secao) => secao.titulo)
        .slice(0, limite);
      return { titulo: aba.rotulo, folhas };
    })
    .filter((ramo) => ramo.folhas.length > 0);

  if (!ramos.length) return null;

  return criarMapaMental({
    centro: nome,
    ramos,
    nota: nota ?? 'Cada caixa é uma aba deste módulo. Leia o mapa antes de entrar nas abas.',
  });
}
