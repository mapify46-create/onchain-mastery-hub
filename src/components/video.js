// video.js — o botão "Assistir a videoaula" dentro do card da seção.
//
// A seção que tem vídeo mostra um botão logo depois da ideia central. O player
// só aparece quando a pessoa clica: quem quer só ler nunca vê um player, e o
// texto da seção continua sendo o conteúdo principal. Esse botão não existe no
// handoff do Claude Design (o desenho não previu vídeo); ele foi desenhado no
// mesmo traço: 44px, trio ciano da paleta, foco ciano, e só a marca ▾.
//
// Os vídeos ficam no próprio repositório (assets/videos/), servidos pelo mesmo
// GitHub Pages que serve o resto. Isso foi decisão deliberada: sem conta em
// serviço de terceiro, sem credencial, sem termos de uso que mudam, e o app
// continua funcionando sem depender de YouTube. O preço é o limite de 1 GB do
// Pages (a conta está em pesquisa/videos/README.md).
//
// DUAS COISAS QUE NÃO SÃO ÓBVIAS E IMPORTAM MUITO:
//
// 1. preload="none". Sem isso, o navegador poderia começar a baixar 48 MB na
//    hora, mesmo para quem só quer ler. Com "none", o arquivo só é buscado
//    quando a pessoa aperta o play. (E o <video> nem existe na página antes do
//    clique no botão.)
//
// 2. O vídeo NÃO entra no precache do service worker. Um precache de ~300 MB
//    tornaria a primeira visita insuportável. Consequência honesta: o texto
//    funciona offline, o vídeo precisa de internet. É a troca certa — o texto é
//    o conteúdo, o vídeo é o reforço. A nota ao lado do botão diz isso.
//
// ACESSIBILIDADE — mesma lógica de todo visual do hub: existe sempre uma versão
// em texto. Aqui é a transcrição (o resumo navegável), num <details> logo abaixo
// do player. Ela serve a quem usa leitor de tela, a quem está sem internet, a
// quem prefere ler, e a quem quer procurar um trecho (Ctrl+F funciona nela; no
// vídeo não).

import { html } from '../ui.js';
import { videoaulas } from '../data/videoaulas.js';

// O trio ciano do handoff: borda a 50%, fundo a 10%, texto claro.
const ESTILO_DO_BOTAO =
  'min-height:44px;display:inline-flex;align-items:center;gap:8px;border-radius:8px;' +
  'border-width:1px;border-style:solid;background:rgba(34,211,238,.1);color:#E6EDF3;' +
  'padding:8px 16px;font-size:14px;font-weight:600;line-height:normal;cursor:pointer;' +
  'text-align:left';

// O player + o aviso de transcrição pendente + a transcrição. Só é montado no
// primeiro clique no botão.
function montarPainel(id, video) {
  const { titulo, src, poster = '', legendas = '', transcricao = [] } = video;
  // Sem transcrição, o aviso de pendência entra no lugar dela.
  const aviso = transcricao.length
    ? ''
    : video.avisoDeTranscricao || videoaulas.avisoDeTranscricaoPendente;

  return html`<div style="border-radius:8px;border:1px solid #1F2733;background:#0B0F17;padding:12px;display:flex;flex-direction:column;gap:10px">
    <video
      id="${id}-player"
      controls
      preload="none"
      playsinline
      poster="${poster || null}"
      aria-label="${titulo}"
      style="display:block;width:100%;aspect-ratio:16/9;border-radius:8px;background:#000"
    >
      <source src="${src}" type="video/mp4" />
      ${legendas
        ? html`<track kind="captions" srclang="pt-BR" label="Português" src="${legendas}" default />`
        : null}
      ${videoaulas.semSuporte}
    </video>

    ${aviso ? html`<p style="margin:0;font-size:12px;color:#9AA7B4">${aviso}</p>` : null}

    ${transcricao.length
      ? html`<details class="group rounded-card border border-borda bg-superficie p-4">
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
  </div>`;
}

/**
 * O botão "Assistir a videoaula" e o painel (fechado) com o player.
 *
 * @param {string} id     Prefixo único dos ids (ex.: 'm1-video-mecanica-do-gas').
 * @param {object} video  Um item de `videos` em src/data/moduloN.js:
 *                        { titulo, src, duracao?, poster?, legendas?,
 *                          transcricao?, avisoDeTranscricao? }
 */
export function montarVideoaula(id, video) {
  const idDoPainel = id + '-painel';

  // O <span class="sr-only"> põe o título da aula no nome do botão: com várias
  // aulas na mesma aba, o leitor de tela não ouve cinco botões iguais.
  const botao = html`<button
    type="button"
    aria-expanded="false"
    aria-controls="${idDoPainel}"
    class="border-acento/50 transition-colors duration-150 hover:border-texto-suave"
    style="${ESTILO_DO_BOTAO}"
  >
    <span data-rotulo>${videoaulas.botaoAbrir}</span><span class="sr-only">: ${video.titulo}</span>
    ${video.duracao
      ? html`<span style="font-family:'JetBrains Mono',monospace;font-weight:500;color:#22D3EE">(${video.duracao})</span>`
      : null}
    <span data-seta aria-hidden="true" style="display:inline-block;color:#9AA7B4;transition:transform 150ms ease">▾</span>
  </button>`;

  const painel = html`<div id="${idDoPainel}" hidden></div>`;
  const rotulo = botao.querySelector('[data-rotulo]');
  const seta = botao.querySelector('[data-seta]');

  botao.addEventListener('click', () => {
    const abrir = botao.getAttribute('aria-expanded') !== 'true';
    // O player só nasce no primeiro clique.
    if (abrir && !painel.firstChild) painel.append(montarPainel(id, video));
    // Fechar pausa o vídeo, para ele não continuar tocando escondido.
    if (!abrir) painel.querySelector('video')?.pause();

    painel.hidden = !abrir;
    botao.setAttribute('aria-expanded', String(abrir));
    rotulo.textContent = abrir ? videoaulas.botaoFechar : videoaulas.botaoAbrir;
    // O mesmo ▾, girado por CSS no estado aberto (▴ não é marca permitida).
    seta.style.transform = abrir ? 'rotate(180deg)' : '';
  });

  return html`<div style="display:flex;flex-direction:column;gap:12px">
    <div style="display:flex;flex-wrap:wrap;align-items:center;gap:8px 12px">
      ${botao}
      <span style="font-size:12px;color:#9AA7B4">${videoaulas.nota}</span>
    </div>
    ${painel}
  </div>`;
}

/**
 * A videoaula de uma seção, se houver: procura em `videos` (de src/data/moduloN.js)
 * o item cujo campo `secao` é o id da seção. Devolve null se a seção não tem vídeo.
 */
export function videoDaSecao(videos = {}, idDaSecao) {
  const achado = Object.entries(videos).find(([, video]) => video.secao === idDaSecao);
  if (!achado) return null;
  const [chave, video] = achado;
  return montarVideoaula('video-' + chave, video);
}
