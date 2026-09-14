// secao.js — o card de uma seção de texto, igual em todos os módulos.
//
// Por que existe: a primeira versão das seções era só título + parágrafos longos,
// com a ideia central, as exceções e os números misturados. Quem está aprendendo
// do zero se perde. Este card separa as partes, seguindo o que a pesquisa de
// didática mediu (pesquisa/modulos/pesquisas/P12, P14):
//
//   emUmaFrase  a ideia central, destacada no topo            (sinalização)
//   paragrafos  curtos, uma ideia cada                         (segmentação)
//   quadro      [{ rotulo, texto }] — comparação lado a lado    (contiguidade)
//   exemplo     { titulo?, passos: [] } — a conta feita à mão   (exemplo resolvido)
//   detalhe     { titulo, paragrafos } — exceções e minúcias,   (coerência: tira do
//               recolhidas, para quem quer ir mais fundo         caminho principal)
//
// Continua aceitando os campos antigos: lista, listaTitulo, ordenada, subListas,
// paragrafosFinais. Seção sem os campos novos aparece como antes.

import { criarElemento, criarCard } from '../ui.js';

function criarQuadro(itens) {
  return criarElemento(
    'dl',
    { class: 'mt-4 grid gap-3 sm:grid-cols-' + Math.min(itens.length, 3) },
    itens.map((item) =>
      criarElemento('div', { class: 'rounded-lg border border-borda bg-fundo p-3' }, [
        criarElemento('dt', { class: 'text-sm font-semibold text-acento' }, [item.rotulo]),
        criarElemento('dd', { class: 'mt-1 text-sm text-texto-suave' }, [item.texto]),
      ]),
    ),
  );
}

function criarExemplo(exemplo) {
  return criarElemento('div', { class: 'mt-4 rounded-lg border border-borda bg-fundo p-4' }, [
    criarElemento('p', { class: 'text-sm font-semibold text-texto' }, [exemplo.titulo ?? 'Exemplo']),
    exemplo.passos?.length &&
      criarElemento(
        'ol',
        { class: 'mt-2 list-decimal space-y-1 pl-5 text-sm text-texto-suave' },
        exemplo.passos.map((passo) => criarElemento('li', {}, [passo])),
      ),
    ...(exemplo.paragrafos ?? []).map((paragrafo) =>
      criarElemento('p', { class: 'mt-2 text-sm text-texto-suave' }, [paragrafo]),
    ),
  ]);
}

function criarDetalhe(detalhe) {
  return criarElemento('details', { class: 'group mt-4 rounded-lg border border-borda bg-fundo p-3' }, [
    criarElemento(
      'summary',
      { class: 'flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-medium text-texto' },
      [
        criarElemento('span', {}, ['Para ir mais fundo: ' + detalhe.titulo]),
        criarElemento(
          'span',
          { class: 'text-texto-suave transition-transform duration-150 group-open:rotate-180', 'aria-hidden': 'true' },
          ['▾'],
        ),
      ],
    ),
    ...(detalhe.paragrafos ?? []).map((paragrafo) =>
      criarElemento('p', { class: 'mt-3 text-sm text-texto-suave' }, [paragrafo]),
    ),
    detalhe.lista?.length &&
      criarElemento(
        'ul',
        { class: 'mt-3 list-disc space-y-1 pl-5 text-sm text-texto-suave' },
        detalhe.lista.map((item) => criarElemento('li', {}, [item])),
      ),
  ]);
}

/**
 * Monta o card de uma seção.
 * @param {object} secao  { titulo, emUmaFrase?, paragrafos?, quadro?, exemplo?, lista?,
 *                          listaTitulo?, ordenada?, subListas?, paragrafosFinais?, detalhe? }
 * @param {object} [opcoes]  Repassado ao criarCard (ex.: { class }).
 */
export function criarCardDaSecao(secao, opcoes = {}) {
  return criarCard(
    [
      criarElemento('h2', { class: 'text-lg font-semibold' }, [secao.titulo]),

      secao.emUmaFrase &&
        criarElemento('p', { class: 'mt-3 border-l-2 border-acento pl-3 text-base font-semibold text-texto' }, [
          secao.emUmaFrase,
        ]),

      ...(secao.paragrafos ?? []).map((paragrafo) =>
        criarElemento('p', { class: 'mt-3 text-texto-suave' }, [paragrafo]),
      ),

      secao.quadro?.length && criarQuadro(secao.quadro),

      // Duas sequências de passos numeradas de forma independente (ex.: "no
      // Revoke.cash" e "no Etherscan"), cada uma com o próprio <ol>.
      ...(secao.subListas ?? []).map((sub) =>
        criarElemento('div', { class: 'mt-4' }, [
          criarElemento('h3', { class: 'text-sm font-semibold text-acento' }, [sub.titulo]),
          criarElemento(
            'ol',
            { class: 'mt-2 list-decimal space-y-2 pl-5 text-texto-suave' },
            sub.passos.map((passo) => criarElemento('li', {}, [passo])),
          ),
        ]),
      ),

      secao.listaTitulo && criarElemento('p', { class: 'mt-4 text-sm font-semibold text-texto' }, [secao.listaTitulo]),
      secao.lista?.length &&
        criarElemento(
          secao.ordenada ? 'ol' : 'ul',
          {
            class:
              (secao.listaTitulo ? 'mt-2' : 'mt-4') +
              ' space-y-2 pl-5 text-texto-suave ' +
              (secao.ordenada ? 'list-decimal' : 'list-disc'),
          },
          secao.lista.map((item) => criarElemento('li', {}, [item])),
        ),

      secao.exemplo && criarExemplo(secao.exemplo),

      ...(secao.paragrafosFinais ?? []).map((paragrafo) =>
        criarElemento('p', { class: 'mt-4 text-texto-suave' }, [paragrafo]),
      ),

      secao.detalhe && criarDetalhe(secao.detalhe),
    ],
    opcoes,
  );
}
