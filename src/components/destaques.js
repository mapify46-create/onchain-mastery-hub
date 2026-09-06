// destaques.js — os números grandes que abrem uma aba.
//
// É o "gancho" do padrão didático do hub: 2 a 3 números que contradizem uma
// suposição comum, antes de qualquer parágrafo. Quem abre a aba de taxas lê
// "0,95% / 3,2% / 2×" e já entendeu a tese do bloco inteiro sem ler uma linha.
//
// REGRA EDITORIAL (vem do CLAUDE.md): o número só pode sair de algo que já está
// com fonte no `fontes` daquele módulo. Onde não houver número pesquisado, o
// destaque é uma afirmação concreta — nunca uma estatística inventada para
// preencher o espaço.

import { html } from '../ui.js';

// O tom pinta o fundo, não o texto: o contraste do número continua vindo do
// token sólido, então a leitura permanece AA em qualquer um dos três.
const CLASSE_POR_TOM = {
  neutro: 'omh-destaque',
  alerta: 'omh-destaque omh-destaque-alerta',
  ok: 'omh-destaque omh-destaque-ok',
};

/**
 * Um cartão de número grande.
 * @param {object} destaque { rotulo, valor, nota?, tom? }
 */
export function montarCartaoDeDestaque(destaque) {
  return html`<div class="rounded-card p-5 ${CLASSE_POR_TOM[destaque.tom ?? 'neutro']}">
    <p class="text-xs font-semibold uppercase tracking-wide text-texto-suave">${destaque.rotulo}</p>
    <p class="omh-numero omh-numero-grande mt-2 text-texto">${destaque.valor}</p>
    ${destaque.nota ? html`<p class="mt-3 text-sm text-texto-suave">${destaque.nota}</p>` : null}
  </div>`;
}

/**
 * A grade de destaques que abre uma aba. Devolve null se a lista estiver vazia,
 * para a view poder inserir sem condicional.
 * @param {Array} destaques
 */
export function montarDestaques(destaques = []) {
  if (!destaques.length) return null;

  // Duas colunas em tela média, três só quando há três cartões — dois cartões
  // esticados em três colunas ficam com um buraco à direita.
  const colunas = destaques.length >= 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2';

  return html`<div class="grid gap-4 ${colunas}">${destaques.map(montarCartaoDeDestaque)}</div>`;
}
