// linhaDoTempo.js — cronologia com trilho vertical e marcos datados.
//
// Serve onde o conteúdo é uma sequência de datas: a regulação brasileira (M1),
// os casos reais (M2), o cenário 2025–2026 (M3). Prosa com datas no meio das
// frases não deixa ver a ORDEM nem a DISTÂNCIA entre os eventos; a linha do tempo
// deixa.
//
// É HTML, não SVG, de propósito: os marcos têm texto de verdade (que precisa
// quebrar linha, ser selecionável e lido por leitor de tela), e uma <ol> já é a
// estrutura semântica certa para "eventos em ordem". O trilho e os pontos são só
// CSS por cima. Um SVG aqui daria trabalho para ficar responsivo e perderia tudo
// isso de graça.

import { html } from '../ui.js';

// Cor do ponto no trilho, pelo tom do marco.
const PONTO_POR_TOM = {
  neutro: 'bg-primaria',
  alerta: 'bg-risco-alto',
  ok: 'bg-risco-baixo',
  atencao: 'bg-risco-medio',
};

function montarMarco(marco, ehUltimo) {
  return html`<li class="relative pl-8 ${ehUltimo ? '' : 'pb-6'}">
    <!-- O trilho é desenhado por cada item até o próximo, para o último não
         sobrar um pedaço de linha apontando para o nada. -->
    ${ehUltimo
      ? null
      : html`<span
          class="absolute left-[7px] top-4 h-full w-0.5 bg-borda"
          aria-hidden="true"
        ></span>`}
    <span
      class="absolute left-0 top-1.5 h-4 w-4 rounded-full border-2 border-superficie ${PONTO_POR_TOM[
        marco.tom ?? 'neutro'
      ]}"
      aria-hidden="true"
    ></span>

    <time class="omh-numero text-xs font-semibold uppercase tracking-wide text-acento"
      >${marco.data}</time
    >
    <p class="mt-1 text-sm font-semibold text-texto">${marco.titulo}</p>
    ${marco.texto ? html`<p class="mt-1 text-sm text-texto-suave">${marco.texto}</p>` : null}
  </li>`;
}

/**
 * Monta uma linha do tempo.
 * @param {object} opcoes
 * @param {string} opcoes.id
 * @param {string} opcoes.titulo
 * @param {string} [opcoes.descricao]
 * @param {Array}  opcoes.marcos  [{ data, titulo, texto?, tom? }], já na ordem.
 * @param {string} [opcoes.nota]
 */
export function montarLinhaDoTempo({ id, titulo, descricao = '', marcos = [], nota = '' }) {
  return html`<section
    class="rounded-card border border-borda bg-superficie p-5"
    aria-labelledby="${id}-titulo"
  >
    <h3 id="${id}-titulo" class="text-lg font-semibold">${titulo}</h3>
    ${descricao ? html`<p class="mt-2 text-sm text-texto-suave">${descricao}</p>` : null}

    <ol class="mt-5">${marcos.map((marco, i) => montarMarco(marco, i === marcos.length - 1))}</ol>

    ${nota
      ? html`<p class="mt-5 rounded-card border border-borda bg-fundo p-3 text-xs text-texto-suave">
          ${nota}
        </p>`
      : null}
  </section>`;
}
