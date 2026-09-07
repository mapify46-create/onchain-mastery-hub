// video.js — player de vídeo embutido, ao lado do texto da seção.
//
// Os vídeos ficam no próprio repositório (assets/videos/), servidos pelo mesmo
// GitHub Pages que serve o resto. Isso foi decisão deliberada: sem conta em
// serviço de terceiro, sem credencial, sem termos de uso que mudam, e o app
// continua funcionando sem depender de YouTube. O preço é o limite de 1 GB do
// Pages — cabem uns 6 a 9 vídeos de 8 minutos, não 33.
//
// DUAS COISAS QUE NÃO SÃO ÓBVIAS E IMPORTAM MUITO:
//
// 1. preload="none". Sem isso, abrir o Módulo 1 começaria a baixar 48 MB na hora,
//    mesmo para quem só quer ler. Com "none", o arquivo só é buscado quando a
//    pessoa aperta o play.
//
// 2. O vídeo NÃO entra no precache do service worker. Um precache de ~300 MB
//    tornaria a primeira visita insuportável. Consequência honesta: o texto
//    funciona offline, o vídeo precisa de internet. É a troca certa — o texto é
//    o conteúdo, o vídeo é o reforço.
//
// ACESSIBILIDADE — mesma lógica de todo visual do hub: existe sempre uma versão
// em texto. Aqui é a transcrição, num <details> logo abaixo. Ela serve a quem usa
// leitor de tela, a quem está sem internet, a quem prefere ler, e a quem quer
// procurar um trecho específico (dá Ctrl+F na transcrição; no vídeo não dá).

import { html } from '../ui.js';

/**
 * Monta um bloco de vídeo com transcrição.
 *
 * @param {object}  opcoes
 * @param {string}  opcoes.id
 * @param {string}  opcoes.titulo
 * @param {string}  opcoes.src         Caminho relativo (ex.: 'assets/videos/gas.mp4').
 * @param {string}  [opcoes.duracao]   Ex.: '8:01' — mostrado antes de dar play.
 * @param {string}  [opcoes.descricao] Uma linha sobre o que o vídeo cobre.
 * @param {string}  [opcoes.poster]    Imagem de capa (evita o retângulo preto).
 * @param {string}  [opcoes.legendas]  Caminho de um .vtt de legendas.
 * @param {Array}   [opcoes.transcricao] Parágrafos da transcrição.
 */
export function montarVideo({
  id,
  titulo,
  src,
  duracao = '',
  descricao = '',
  poster = '',
  legendas = '',
  transcricao = [],
}) {
  const player = html`<video
    id="${id}-player"
    class="w-full rounded-card border border-borda bg-fundo"
    controls
    preload="none"
    playsinline
    poster="${poster || null}"
    aria-label="${titulo}"
  >
    <source src="${src}" type="video/mp4" />
    ${legendas
      ? html`<track kind="captions" srclang="pt-BR" label="Português" src="${legendas}" default />`
      : null}
    <!-- Fica visível só em navegador que não toca vídeo; o texto abaixo cobre o resto. -->
    Seu navegador não consegue reproduzir este vídeo. A transcrição completa está logo
    abaixo.
  </video>`;

  return html`<section
    class="rounded-card border border-borda bg-superficie p-5"
    aria-labelledby="${id}-titulo"
  >
    <div class="flex flex-wrap items-baseline justify-between gap-3">
      <h3 id="${id}-titulo" class="text-lg font-semibold">${titulo}</h3>
      ${duracao
        ? html`<span class="omh-numero text-sm text-texto-suave">${duracao}</span>`
        : null}
    </div>
    ${descricao ? html`<p class="mt-2 text-sm text-texto-suave">${descricao}</p>` : null}

    <div class="mt-4">${player}</div>

    <p class="mt-2 text-xs text-texto-suave">
      O vídeo precisa de internet; o texto do módulo funciona offline.
    </p>

    ${transcricao.length
      ? html`<details class="group mt-4 rounded-card border border-borda bg-fundo p-4">
          <summary
            class="flex cursor-pointer list-none items-center justify-between text-sm font-medium"
          >
            <span>Transcrição em texto</span>
            <span
              class="text-texto-suave transition-transform duration-150 group-open:rotate-180"
              aria-hidden="true"
              >▾</span
            >
          </summary>
          <div class="mt-3 space-y-3">
            ${transcricao.map((paragrafo) =>
              html`<p class="text-sm text-texto-suave">${paragrafo}</p>`,
            )}
          </div>
        </details>`
      : null}
  </section>`;
}
