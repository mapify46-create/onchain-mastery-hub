// secao.js — o card de uma seção de texto, igual em todos os módulos.
//
// Por que existe: a primeira versão das seções era só título + parágrafos longos,
// com a ideia central, as exceções e os números misturados. Quem está aprendendo
// do zero se perde. Este card separa as partes, seguindo o que a pesquisa de
// didática mediu (pesquisa/modulos/pesquisas/P12, P14):
//
//   emUmaFrase  a ideia central, destacada no topo            (sinalização)
//   paragrafos  curtos, uma ideia cada                         (segmentação)
//   quadro      [{ rotulo, texto, destaque? }] — lado a lado    (contiguidade)
//   exemplo     { titulo?, passos: [] } — a conta feita à mão   (exemplo resolvido)
//   detalhe     { titulo, paragrafos } — exceções e minúcias,   (coerência: tira do
//               recolhidas, para quem quer ir mais fundo         caminho principal)
//
// A ordem e as medidas seguem o desenho do handoff (pesquisa/design, os módulos):
// título → ideia central → O VISUAL → texto → "Para ir mais fundo" → "Pergunta
// rápida", tudo numa coluna com 16px entre as partes. O visual e a pergunta vêm
// de quem chama (opções `visual` e `pergunta`), porque dependem de cada seção.
//
// Continua aceitando os campos antigos: lista, listaTitulo, ordenada, subListas,
// paragrafosFinais. Seção sem os campos novos aparece como antes.

import { criarElemento } from '../ui.js';

function criarQuadro(itens) {
  return criarElemento(
    'dl',
    { class: 'grid gap-3', style: 'grid-template-columns:repeat(auto-fit,minmax(200px,1fr))' },
    itens.map((item) =>
      criarElemento(
        'div',
        {
          // O item em destaque (a resposta que importa) fica com a borda ciano.
          class:
            'rounded-lg border px-3.5 py-3 ' +
            (item.destaque ? 'border-acento bg-acento/10' : 'border-borda bg-fundo'),
        },
        [
          criarElemento('dt', { class: 'text-sm font-semibold text-texto' }, [item.rotulo]),
          criarElemento('dd', { class: 'mt-1 text-sm text-texto-suave' }, [item.texto]),
        ],
      ),
    ),
  );
}

function criarExemplo(exemplo) {
  return criarElemento('div', { class: 'rounded-lg border border-borda bg-fundo p-4' }, [
    criarElemento('p', { class: 'text-sm font-semibold text-texto' }, [exemplo.titulo ?? 'Exemplo']),
    exemplo.passos?.length > 0 &&
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

// "Para ir mais fundo": recolhido, com o triângulo nativo do <details>, como no
// desenho.
function criarDetalhe(detalhe) {
  return criarElemento('details', { class: 'rounded-lg border border-borda bg-fundo px-4 py-3' }, [
    criarElemento('summary', { class: 'cursor-pointer text-sm font-semibold text-texto' }, [
      'Para ir mais fundo: ' + detalhe.titulo,
    ]),
    ...(detalhe.paragrafos ?? []).map((paragrafo) =>
      criarElemento('p', { class: 'mt-2 text-sm text-texto-suave' }, [paragrafo]),
    ),
    detalhe.lista?.length > 0 &&
      criarElemento(
        'ul',
        { class: 'mt-2 list-disc space-y-1 pl-5 text-sm text-texto-suave' },
        detalhe.lista.map((item) => criarElemento('li', {}, [item])),
      ),
  ]);
}

/**
 * Monta o card de uma seção.
 * @param {object} secao  { titulo, emUmaFrase?, paragrafos?, quadro?, exemplo?, lista?,
 *                          listaTitulo?, ordenada?, subListas?, paragrafosFinais?, detalhe? }
 * @param {object} [opcoes]
 * @param {Node}   [opcoes.visual]    o desenho da seção, logo depois da ideia central
 * @param {Node}   [opcoes.pergunta]  a "Pergunta rápida" que fecha o card
 * @param {Array}  [opcoes.omitir]    campos do dado que o visual já mostra
 *                                    (ex.: ['exemplo']) — o desenho troca alguns
 *                                    textos pelo visual; o dado continua no arquivo
 * @param {Array}  [opcoes.depois]    nós extras no fim, antes da pergunta
 * @param {string} [opcoes.class]     classes extras do card
 */
export function criarCardDaSecao(secao, opcoes = {}) {
  const { visual = null, pergunta = null, omitir = [], depois = [], class: extra = '' } = opcoes;
  const mostra = (campo) => !omitir.includes(campo);

  return criarElemento(
    'section',
    { class: ('flex flex-col gap-4 rounded-card border border-borda bg-superficie p-5 ' + extra).trim() },
    [
      criarElemento('h2', { class: 'text-lg font-semibold' }, [secao.titulo]),

      secao.emUmaFrase &&
        criarElemento('p', { class: 'border-l-2 border-acento pl-3 font-semibold text-texto' }, [
          secao.emUmaFrase,
        ]),

      visual,

      ...(mostra('paragrafos') ? secao.paragrafos ?? [] : []).map((paragrafo) =>
        criarElemento('p', { class: 'text-texto-suave' }, [paragrafo]),
      ),

      mostra('quadro') && secao.quadro?.length > 0 && criarQuadro(secao.quadro),

      // Duas sequências de passos numeradas de forma independente (ex.: "no
      // Revoke.cash" e "no Etherscan"), cada uma com o próprio <ol>.
      ...(mostra('subListas') ? secao.subListas ?? [] : []).map((sub) =>
        criarElemento('div', {}, [
          criarElemento('h3', { class: 'text-sm font-semibold text-acento' }, [sub.titulo]),
          criarElemento(
            'ol',
            { class: 'mt-2 list-decimal space-y-2 pl-5 text-texto-suave' },
            sub.passos.map((passo) => criarElemento('li', {}, [passo])),
          ),
        ]),
      ),

      mostra('lista') && (secao.listaTitulo || secao.lista?.length > 0)
        ? criarElemento('div', {}, [
            secao.listaTitulo && criarElemento('p', { class: 'text-sm font-semibold text-texto' }, [secao.listaTitulo]),
            secao.lista?.length > 0 &&
              criarElemento(
                secao.ordenada ? 'ol' : 'ul',
                {
                  class:
                    (secao.listaTitulo ? 'mt-2 ' : '') +
                    'space-y-2 pl-5 text-texto-suave ' +
                    (secao.ordenada ? 'list-decimal' : 'list-disc'),
                },
                secao.lista.map((item) => criarElemento('li', {}, [item])),
              ),
          ])
        : null,

      mostra('exemplo') && secao.exemplo && criarExemplo(secao.exemplo),

      ...(mostra('paragrafosFinais') ? secao.paragrafosFinais ?? [] : []).map((paragrafo) =>
        criarElemento('p', { class: 'text-texto-suave' }, [paragrafo]),
      ),

      mostra('detalhe') && secao.detalhe && criarDetalhe(secao.detalhe),

      ...[].concat(depois),

      pergunta,
    ],
  );
}
