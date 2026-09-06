// anatomia.js — "raio-x" de uma tela: um mockup desenhado, com marcadores
// numerados ligados a uma legenda explicativa.
//
// Por que existe: várias coisas que o hub ensina são sobre ONDE olhar numa
// interface — ler uma transação num explorador, conferir uma tela de assinatura,
// interpretar os painéis de um terminal. Prosa é péssima para isso: "veja o campo
// de permissão" não diz onde o campo fica.
//
// Por que desenhado em vez de captura de tela real:
//   1. Captura de tela de produto de terceiro é material protegido, e o hub é
//      publicado — seria republicação.
//   2. Mostrar a interface de uma plataforma específica parece endosso, que é
//      exatamente o que o Módulo 5 evita.
//   3. Interface de cripto muda em semanas; uma captura nasce vencida.
//   4. Desenhando, eu controlo o que fica em destaque e removo o ruído. Um mockup
//      genérico ensina melhor do que um print cheio de coisa irrelevante.
//
// ACESSIBILIDADE — mesma inversão da calculadora: a LEGENDA é o conteúdo, o
// desenho é enriquecimento. Quem usa leitor de tela ou teclado navega pela lista
// numerada, que é HTML de verdade; o SVG é role="img" com uma descrição. Marcador
// dentro de SVG não vira botão acessível de graça, então nem tentamos: quem
// destaca é o botão da legenda.

import { html, svg } from '../ui.js';

// Paleta do mockup. Tons neutros de propósito: o desenho é cenário, quem precisa
// chamar atenção é o marcador.
const COR = {
  fundo: 'var(--omh-superficie-baixa)',
  painel: 'var(--omh-superficie)',
  borda: 'var(--omh-borda)',
  traco: 'var(--omh-texto-suave)',
  destaque: 'var(--omh-primaria)',
  marcador: 'var(--omh-acento)',
};

// --- Vocabulário de desenho ------------------------------------------------
// Cada painel do mockup é um retângulo com um rótulo e um "recheio" que sugere o
// tipo de conteúdo, sem texto de verdade — o texto real mora na legenda.

function linhaFalsa(x, y, largura, opacidade = 0.35) {
  return svg`<rect x="${x}" y="${y}" width="${largura}" height="4" rx="2"
    fill="${COR.traco}" opacity="${opacidade}" />`;
}

// Sequência de linhas de larguras variadas — sugere texto sem escrever nada.
function recheioTexto(painel) {
  const larguras = [0.9, 0.72, 0.84, 0.6];
  return larguras.map((fracao, i) =>
    linhaFalsa(painel.x + 12, painel.y + 34 + i * 12, (painel.w - 24) * fracao),
  );
}

// Linha quebrada tipo gráfico de preço. Determinística de propósito: um desenho
// que muda a cada render distrai, e não há dado real aqui.
function recheioGrafico(painel) {
  const alturas = [0.55, 0.35, 0.62, 0.28, 0.48, 0.18, 0.4, 0.12];
  const passo = (painel.w - 24) / (alturas.length - 1);
  const base = painel.y + painel.h - 14;
  const alcance = painel.h - 48;

  const pontos = alturas
    .map((a, i) => (painel.x + 12 + i * passo).toFixed(1) + ',' + (base - a * alcance).toFixed(1))
    .join(' ');

  return [
    svg`<polyline points="${pontos}" fill="none" stroke="${COR.traco}"
      stroke-width="2" stroke-linejoin="round" stroke-linecap="round" opacity="0.55" />`,
  ];
}

// Linhas com uma barra proporcional ao lado — sugere distribuição/ranking.
function recheioLista(painel) {
  const proporcoes = [0.85, 0.55, 0.4, 0.25];
  return proporcoes.flatMap((p, i) => {
    const y = painel.y + 34 + i * 16;
    return [
      linhaFalsa(painel.x + 12, y, 28, 0.5),
      svg`<rect x="${painel.x + 46}" y="${y - 1}" width="${(painel.w - 60) * p}" height="6"
        rx="3" fill="${COR.destaque}" opacity="${0.55 - i * 0.1}" />`,
    ];
  });
}

// Pares "rótulo pequeno / número grande".
function recheioNumeros(painel) {
  const colunas = 2;
  const largura = (painel.w - 24) / colunas;
  return [0, 1, 2, 3].flatMap((i) => {
    const x = painel.x + 12 + (i % colunas) * largura;
    const y = painel.y + 32 + Math.floor(i / colunas) * 30;
    return [linhaFalsa(x, y, largura * 0.5, 0.3), linhaFalsa(x, y + 10, largura * 0.72, 0.6)];
  });
}

// Caixa de campo de formulário.
function recheioCampo(painel) {
  return [
    svg`<rect x="${painel.x + 12}" y="${painel.y + 30}" width="${painel.w - 24}" height="26"
      rx="6" fill="${COR.fundo}" stroke="${COR.borda}" />`,
    linhaFalsa(painel.x + 22, painel.y + 41, (painel.w - 44) * 0.5, 0.5),
  ];
}

// Botão preenchido.
function recheioBotao(painel) {
  return [
    svg`<rect x="${painel.x + 12}" y="${painel.y + 28}" width="${painel.w - 24}" height="28"
      rx="8" fill="${COR.destaque}" opacity="0.75" />`,
  ];
}

const RECHEIOS = {
  texto: recheioTexto,
  grafico: recheioGrafico,
  lista: recheioLista,
  numeros: recheioNumeros,
  campo: recheioCampo,
  botao: recheioBotao,
};

// Um painel: moldura, rótulo e recheio.
function desenharPainel(painel) {
  const recheio = RECHEIOS[painel.tipo] ?? recheioTexto;

  return svg`<g>
    <rect x="${painel.x}" y="${painel.y}" width="${painel.w}" height="${painel.h}" rx="10"
      fill="${COR.painel}" stroke="${painel.alerta ? COR.destaque : COR.borda}"
      stroke-width="${painel.alerta ? 2 : 1}" />
    <text x="${painel.x + 12}" y="${painel.y + 20}" font-size="11" font-weight="600"
      fill="${COR.traco}">${painel.rotulo}</text>
    ${recheio(painel)}
  </g>`;
}

// Marcador numerado, ancorado no canto superior direito do painel.
function desenharMarcador(painel, numero) {
  return svg`<g class="omh-marcador" data-marcador="${painel.id}" aria-hidden="true">
    <circle cx="${painel.x + painel.w - 14}" cy="${painel.y + 14}" r="11"
      fill="${COR.marcador}" />
    <text x="${painel.x + painel.w - 14}" y="${painel.y + 18}" font-size="12"
      font-weight="700" text-anchor="middle" fill="#0B0F17">${numero}</text>
  </g>`;
}

/**
 * Monta uma anatomia de tela.
 *
 * @param {object} opcoes
 * @param {string} opcoes.id
 * @param {string} opcoes.titulo
 * @param {string} [opcoes.descricao]
 * @param {Array}  opcoes.viewBox   [x, y, largura, altura] do desenho.
 * @param {Array}  opcoes.paineis   [{ id, x, y, w, h, rotulo, tipo, alerta? }].
 * @param {Array}  opcoes.itens     [{ painel, titulo, texto }] — a legenda, na ordem
 *                                  em que os marcadores são numerados.
 * @param {string} [opcoes.nota]
 */
export function montarAnatomia({
  id,
  titulo,
  descricao = '',
  viewBox = [0, 0, 640, 400],
  paineis = [],
  itens = [],
  nota = '',
}) {
  const porId = new Map(paineis.map((p) => [p.id, p]));

  // Só painéis citados na legenda ganham marcador, e o número segue a ordem da
  // legenda — não a ordem de desenho.
  const marcados = itens.map((item, i) => ({ painel: porId.get(item.painel), numero: i + 1 }));

  const desenho = html`<svg
    viewBox="${viewBox.join(' ')}"
    class="w-full"
    role="img"
    aria-label="${titulo + '. ' + itens.map((it, i) => i + 1 + ': ' + it.titulo).join('. ') + '.'}"
  >
    <rect x="${viewBox[0]}" y="${viewBox[1]}" width="${viewBox[2]}" height="${viewBox[3]}"
      rx="12" fill="${COR.fundo}" />
    ${paineis.map(desenharPainel)}
    ${marcados.filter((m) => m.painel).map((m) => desenharMarcador(m.painel, m.numero))}
  </svg>`;

  // Destaca o marcador correspondente ao item da legenda que recebeu o clique.
  let ativo = null;
  function destacar(painelId) {
    ativo = ativo === painelId ? null : painelId;

    desenho.querySelectorAll('[data-marcador]').forEach((marcador) => {
      marcador.setAttribute('aria-pressed', String(marcador.dataset.marcador === ativo));
    });
    lista.querySelectorAll('[data-legenda-painel]').forEach((li) => {
      li.dataset.ativo = String(li.dataset.legendaPainel === ativo);
    });
  }

  const lista = html`<ol class="space-y-3">
    ${itens.map(
      (item, i) => html`<li
        class="omh-legenda-item rounded-card border border-borda bg-superficie p-3 transition-colors"
        data-legenda-painel="${item.painel}"
        data-ativo="false"
      >
        <button
          type="button"
          class="flex w-full items-start gap-3 text-left"
          onclick=${() => destacar(item.painel)}
        >
          <span
            class="omh-numero mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-acento text-xs font-bold text-fundo"
            aria-hidden="true"
            >${i + 1}</span
          >
          <span>
            <span class="block text-sm font-semibold text-texto">${item.titulo}</span>
            <span class="mt-1 block text-sm text-texto-suave">${item.texto}</span>
          </span>
        </button>
      </li>`,
    )}
  </ol>`;

  return html`<section
    class="rounded-card border border-borda bg-superficie p-5"
    aria-labelledby="${id}-titulo"
  >
    <h3 id="${id}-titulo" class="text-lg font-semibold">${titulo}</h3>
    ${descricao ? html`<p class="mt-2 text-sm text-texto-suave">${descricao}</p>` : null}

    <div class="mt-5 grid gap-5 lg:grid-cols-[3fr_2fr]">
      <div>
        ${desenho}
        <p class="mt-2 text-xs text-texto-suave">
          Ilustração esquemática, não é a tela de nenhuma plataforma específica.
        </p>
      </div>
      ${lista}
    </div>

    ${nota
      ? html`<p class="mt-5 rounded-card border border-borda bg-fundo p-3 text-xs text-texto-suave">
          ${nota}
        </p>`
      : null}
  </section>`;
}
