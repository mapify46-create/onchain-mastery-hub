// calculadora.js — controles que recalculam ao vivo enquanto você arrasta.
//
// Por que este componente existe: boa parte do que o hub ensina é *sensibilidade*
// — como um número reage quando outro muda. "Ordem pequena é penalizada pelas
// taxas fixas" é uma frase; arrastar o controle e ver a porcentagem disparar é
// outra coisa. Texto não faz isso.
//
// INVERSÃO DE ACESSIBILIDADE, de propósito: nos diagramas e gráficos do hub o
// desenho é o conteúdo e o texto é reserva. Aqui é o contrário — o número é o
// conteúdo, e as barras são enriquecimento. Por isso as barras são desenhadas em
// CSS puro em vez de Chart.js: atualizam instantaneamente enquanto o controle se
// move (uma instância nova do Chart.js a cada quadro seria pesada e travaria),
// funcionam sem internet, e não há nada para "cair na reserva".

import { html } from '../ui.js';

// Duas casas, vírgula decimal — padrão do resto do hub.
function formatarPadrao(valor) {
  return Number(valor).toFixed(2).replace('.', ',');
}

// Classe de fundo do cartão de destaque, por tom.
const CLASSE_POR_TOM = {
  neutro: 'omh-destaque',
  alerta: 'omh-destaque omh-destaque-alerta',
  ok: 'omh-destaque omh-destaque-ok',
};

/**
 * Monta uma calculadora interativa.
 *
 * @param {object}   opcoes
 * @param {string}   opcoes.id          Prefixo dos ids dos controles (precisa ser único na página).
 * @param {string}   opcoes.titulo
 * @param {string}   [opcoes.descricao] Uma linha explicando o que a ferramenta responde.
 * @param {Array}    opcoes.controles   [{ id, rotulo, min, max, passo, valor, sufixo, formatar }].
 * @param {Function} opcoes.calcular    (valores) => { destaques, barras?, aviso? }.
 *                                      `destaques`: [{ rotulo, valor, nota?, tom? }]
 *                                      `barras`:    [{ rotulo, percentual, valor }]
 * @param {string}   [opcoes.nota]      Aviso fixo (ex.: a premissa que a conta assume).
 */
export function montarCalculadora({
  id,
  titulo,
  descricao = '',
  controles = [],
  calcular,
  nota = '',
}) {
  // Estado: só os valores dos controles. Nada vai para o localStorage — isto é
  // ferramenta de exploração, não progresso do aluno.
  const valores = {};
  for (const controle of controles) valores[controle.id] = controle.valor;

  // Guarda os nós que serão atualizados, para não remontar a árvore a cada quadro.
  const saidasDeControle = {};
  const areaDestaques = html`<div class="grid gap-3 sm:grid-cols-2"></div>`;
  const areaBarras = html`<div class="mt-5 space-y-3"></div>`;
  const areaAviso = html`<p class="mt-4 text-sm text-texto-suave"></p>`;

  function textoDoControle(controle) {
    const formatar = controle.formatar ?? formatarPadrao;
    return formatar(valores[controle.id]) + (controle.sufixo ?? '');
  }

  function montarControle(controle) {
    const idDoCampo = id + '-' + controle.id;
    const saida = html`<output
      for="${idDoCampo}"
      class="omh-numero text-sm font-semibold text-texto"
      >${textoDoControle(controle)}</output
    >`;
    saidasDeControle[controle.id] = saida;

    const campo = html`<input
      type="range"
      class="omh-range mt-2"
      id="${idDoCampo}"
      min="${controle.min}"
      max="${controle.max}"
      step="${controle.passo}"
      value="${controle.valor}"
      aria-valuetext="${textoDoControle(controle)}"
      oninput=${(evento) => {
        valores[controle.id] = Number(evento.target.value);
        saida.textContent = textoDoControle(controle);
        // Leitor de tela anuncia o texto, não o número cru: "3,20%" em vez de "3.2".
        evento.target.setAttribute('aria-valuetext', textoDoControle(controle));
        atualizar();
      }}
    />`;

    return html`<div>
      <div class="flex items-baseline justify-between gap-3">
        <label for="${idDoCampo}" class="text-sm text-texto-suave">${controle.rotulo}</label>
        ${saida}
      </div>
      ${campo}
    </div>`;
  }

  function montarDestaque(destaque) {
    return html`<div class="rounded-card p-4 ${CLASSE_POR_TOM[destaque.tom ?? 'neutro']}">
      <p class="text-xs font-semibold uppercase tracking-wide text-texto-suave">
        ${destaque.rotulo}
      </p>
      <p class="omh-numero omh-numero-grande mt-2 text-texto">${destaque.valor}</p>
      ${destaque.nota ? html`<p class="mt-2 text-xs text-texto-suave">${destaque.nota}</p>` : null}
    </div>`;
  }

  // Barra em CSS puro. role=img + aria-label porque a barra é decorativa sozinha:
  // quem lê por leitor de tela precisa do rótulo e do valor numa frase só.
  function montarBarra(barra) {
    const largura = Math.max(0, Math.min(100, barra.percentual));
    return html`<div>
      <div class="flex items-baseline justify-between gap-3 text-sm">
        <span class="text-texto-suave">${barra.rotulo}</span>
        <span class="omh-numero font-medium text-texto">${barra.valor}</span>
      </div>
      <div
        class="mt-1 h-2 w-full overflow-hidden rounded-full bg-fundo"
        role="img"
        aria-label="${barra.rotulo}: ${barra.valor}"
      >
        <div
          class="h-full rounded-full bg-primaria"
          style="width: ${largura}%; transition: width 120ms ease"
        ></div>
      </div>
    </div>`;
  }

  function atualizar() {
    const resultado = calcular(valores) ?? {};

    areaDestaques.replaceChildren(...(resultado.destaques ?? []).map(montarDestaque));
    areaBarras.replaceChildren(...(resultado.barras ?? []).map(montarBarra));

    areaAviso.textContent = resultado.aviso ?? '';
    areaAviso.hidden = !resultado.aviso;
  }

  atualizar();

  return html`<section
    class="rounded-card border border-borda bg-superficie p-5"
    aria-labelledby="${id}-titulo"
  >
    <h3 id="${id}-titulo" class="text-lg font-semibold">${titulo}</h3>
    ${descricao ? html`<p class="mt-2 text-sm text-texto-suave">${descricao}</p>` : null}

    <div class="mt-5 grid gap-5 sm:grid-cols-2">${controles.map(montarControle)}</div>

    <!-- aria-live=polite: o leitor de tela anuncia o resultado quando o usuário
         para de mexer, sem atropelar a leitura do próprio controle. -->
    <div class="mt-6" aria-live="polite">${areaDestaques}${areaBarras}${areaAviso}</div>

    ${nota
      ? html`<p
          class="mt-5 rounded-card border border-borda bg-fundo p-3 text-xs text-texto-suave"
        >
          ${nota}
        </p>`
      : null}
  </section>`;
}
