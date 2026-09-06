// phaseFlow.js — fluxograma das 4 fases de uma memecoin (Módulo 2).
//
// A mecânica de carregar o Mermaid, desenhar e cair em reserva mora em
// src/components/diagrama.js (compartilhada com os diagramas do Módulo 1). Este
// arquivo só monta o conteúdo específico das "4 fases": os chips de reserva e os
// cards detalhados de cada fase.

import { criarElemento, criarBadgeRisco, rotuloRisco } from '../ui.js';
import { montarDiagrama, renderizarDiagrama } from './diagrama.js';

// Cor da borda do chip de reserva, por nível de risco.
const BORDA_POR_RISCO = {
  alto: 'border-risco-alto/50 bg-risco-alto/10',
  medio: 'border-risco-medio/50 bg-risco-medio/10',
  baixo: 'border-risco-baixo/50 bg-risco-baixo/10',
};

// Um passo do fluxo de reserva (usado quando o Mermaid não carrega).
function criarChipDeFase(rotulo, risco) {
  const cor = BORDA_POR_RISCO[risco] ?? 'border-borda bg-fundo';
  return criarElemento(
    'li',
    {
      class:
        'rounded-card border px-3 py-2 text-center text-sm font-medium leading-snug ' +
        'sm:min-w-[9.5rem] ' +
        cor,
    },
    [rotulo],
  );
}

// Seta entre os chips. aria-hidden porque a ordem da lista já comunica a sequência.
function criarSeta(tracejada = false) {
  return criarElemento(
    'li',
    { class: 'select-none text-texto-suave', 'aria-hidden': 'true' },
    [tracejada ? '⇢' : '→'],
  );
}

// Fluxo de reserva em Tailwind puro: mesma informação do diagrama, sem depender de CDN.
function criarFluxoDeReserva(fases, desfecho) {
  const itens = [];

  fases.forEach((fase, indice) => {
    if (indice > 0) itens.push(criarSeta());
    itens.push(criarChipDeFase(fase.numero + '. ' + fase.nome, fase.risco));
  });

  if (desfecho) {
    itens.push(criarSeta(true));
    itens.push(criarChipDeFase(desfecho, null));
  }

  return criarElemento(
    'ol',
    { class: 'flex flex-wrap items-center justify-center gap-2 sm:gap-3' },
    itens,
  );
}

/**
 * Monta o bloco do fluxograma das 4 fases. Devolve o elemento imediatamente (sem
 * await) — ver montarDiagrama() em diagrama.js para os detalhes de carregamento.
 *
 * @param {object} opcoes
 * @param {string} opcoes.diagrama  Texto do diagrama em sintaxe Mermaid.
 * @param {Array}  opcoes.fases     Lista de fases (para o fluxo de reserva).
 * @param {string} [opcoes.desfecho] Último nó do fluxo. Padrão: "Maioria vai a zero".
 * @param {string} [opcoes.legenda]  Texto da legenda embaixo do diagrama.
 */
export function montarFluxoDeFases({
  diagrama,
  fases = [],
  desfecho = 'Maioria vai a zero',
  legenda = '',
}) {
  return montarDiagrama({
    diagrama,
    legenda,
    reserva: criarFluxoDeReserva(fases, desfecho),
    rotuloAcessivel:
      'Fluxograma das 4 fases: ' +
      fases.map((fase) => fase.numero + '. ' + fase.nome).join(', então ') +
      (desfecho ? ', e por fim ' + desfecho + '.' : '.'),
    mensagemErroSintaxe: 'em "diagramaFases", no arquivo src/data/modulo2.js',
  });
}

// Alias: src/views/modulo2.js chama a figura das "4 fases" de "fluxo"; o motor
// genérico chama de "diagrama". Mantido para não editar a view por causa do split.
export const renderizarFluxoDeFases = renderizarDiagrama;

// Cards detalhados de cada fase: o que você vê, o que checar e a armadilha.
// Ficam sempre visíveis — são eles que carregam o conteúdo, o diagrama só resume.
export function montarCardsDeFases(fases = []) {
  return criarElemento(
    'div',
    { class: 'grid gap-4 sm:grid-cols-2' },
    fases.map((fase) =>
      criarElemento(
        'article',
        { class: 'flex flex-col rounded-card border border-borda bg-superficie p-5' },
        [
          criarElemento('div', { class: 'mb-3 flex items-start justify-between gap-3' }, [
            criarElemento('h3', { class: 'text-lg font-semibold' }, [
              criarElemento('span', { class: 'mr-2 text-texto-suave' }, [fase.numero + '.']),
              fase.nome,
            ]),
            criarBadgeRisco(fase.risco, rotuloRisco(fase.risco)),
          ]),

          criarElemento('p', { class: 'text-sm text-texto-suave' }, [fase.resumo]),

          criarElemento('h4', { class: 'mt-4 text-xs font-semibold uppercase tracking-wide' }, [
            'O que você vê',
          ]),
          criarElemento(
            'ul',
            { class: 'mt-1 list-disc space-y-1 pl-5 text-sm text-texto-suave' },
            (fase.oQueVoceVe ?? []).map((item) => criarElemento('li', {}, [item])),
          ),

          criarElemento('h4', { class: 'mt-4 text-xs font-semibold uppercase tracking-wide' }, [
            'O que checar',
          ]),
          criarElemento(
            'ul',
            { class: 'mt-1 list-disc space-y-1 pl-5 text-sm text-texto-suave' },
            (fase.oQueChecar ?? []).map((item) => criarElemento('li', {}, [item])),
          ),

          criarElemento(
            'p',
            {
              class:
                'mt-4 rounded-lg border border-risco-alto/40 bg-risco-alto/10 p-3 text-sm ' +
                'text-texto',
            },
            [criarElemento('strong', { class: 'text-risco-alto-texto' }, ['Armadilha: ']), fase.armadilha],
          ),
        ],
      ),
    ),
  );
}
