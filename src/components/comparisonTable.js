// comparisonTable.js — tabela comparativa com linhas expansíveis.
// Primeiro uso: CEX vs Hot Wallet vs Cold Wallet (Módulo 1).
//
// Em vez de um <table> de verdade (que não convive bem com linhas expansíveis nem
// com telas estreitas), cada linha é um card. Os campos comparativos (colunas)
// ficam sempre visíveis numa lista de definição (<dl>); o "detalhe extra" fica
// dentro de um <details>, no mesmo padrão já usado em toolMatrix.js. Em telas
// largas os cards ficam lado a lado — ótimo justamente para comparar categorias
// olhando as três ao mesmo tempo; em telas estreitas empilham sozinhos.

import { criarElemento } from '../ui.js';

/**
 * Monta a tabela comparativa.
 * @param {object} opcoes
 * @param {Array} opcoes.colunas Campos comparados, na ordem: [{ chave, rotulo }].
 * @param {Array} opcoes.linhas Cada linha: { id, titulo, subtitulo?, valores: { [chave]: texto }, detalheExtra? }.
 */
export function montarTabelaComparativa({ colunas = [], linhas = [] }) {
  return criarElemento(
    'div',
    { class: 'grid gap-4 sm:grid-cols-2 xl:grid-cols-3' },
    linhas.map((linha) => criarCardDeLinha(linha, colunas)),
  );
}

function criarCardDeLinha(linha, colunas) {
  const campos = colunas.map((coluna) =>
    criarElemento('div', {}, [
      criarElemento('dt', { class: 'text-xs font-semibold uppercase tracking-wide text-texto-suave' }, [
        coluna.rotulo,
      ]),
      criarElemento('dd', { class: 'mt-1 text-sm text-texto-suave' }, [
        linha.valores?.[coluna.chave] ?? '',
      ]),
    ]),
  );

  return criarElemento(
    'article',
    { class: 'flex flex-col rounded-card border border-borda bg-superficie p-5' },
    [
      criarElemento('header', {}, [
        criarElemento('h3', { class: 'text-base font-semibold' }, [linha.titulo]),
        linha.subtitulo &&
          criarElemento('p', { class: 'mt-1 text-xs text-texto-suave' }, [linha.subtitulo]),
      ]),

      criarElemento('dl', { class: 'mt-4 space-y-3' }, campos),

      linha.detalheExtra &&
        criarElemento(
          'details',
          { class: 'group mt-4 rounded-lg border border-borda bg-fundo p-3' },
          [
            criarElemento(
              'summary',
              {
                class:
                  'flex cursor-pointer list-none items-center justify-between text-sm font-medium',
              },
              [
                criarElemento('span', {}, ['Ver mais']),
                criarElemento(
                  'span',
                  {
                    class: 'text-texto-suave transition-transform duration-150 group-open:rotate-180',
                    'aria-hidden': 'true',
                  },
                  ['▾'],
                ),
              ],
            ),
            criarElemento('p', { class: 'mt-3 text-sm text-texto-suave' }, [linha.detalheExtra]),
          ],
        ),
    ],
  );
}
