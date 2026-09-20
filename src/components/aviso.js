// aviso.js — o aviso que fecha cada página, no desenho do handoff: um card âmbar
// dentro da coluna de conteúdo (antes era uma linha solta no rodapé da página).
//
// O CLAUDE.md pede o aviso sempre visível e sem aconselhamento financeiro; o
// desenho acrescenta "não é recomendação de investimento".
// O 68,67% é o mesmo número do Módulo 2 (src/data/modulo2.js, CoinGecko Research).

import { criarElemento } from '../ui.js';

export const TEXTO_DO_AVISO =
  'material de estudo próprio, não é recomendação de investimento. Memecoin é o ativo de ' +
  'maior risco do mercado: 68,67% dos tokens do Pump.fun pararam de negociar no mesmo dia ' +
  'em que nasceram (CoinGecko Research).';

export function criarAvisoDeRodape() {
  return criarElemento(
    'p',
    {
      class:
        // leading-[1.6]: mesma altura de linha do corpo do desenho.
        'rounded-card border border-risco-medio/40 bg-risco-medio/12 p-4 text-sm leading-[1.6] text-texto-suave',
    },
    [criarElemento('strong', { class: 'text-texto' }, ['Aviso: ']), TEXTO_DO_AVISO],
  );
}
