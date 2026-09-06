// checklist.js — checklist interativo reutilizável, com estado salvo no store.
// Usado primeiro no Módulo 1 (segurança da seed, proteção contra drainers).
//
// Cada item tem { id, texto, porque }: o texto é o que se marca, o "porque" é a
// frase curta que explica a razão do item — fica sempre visível, não é tooltip,
// porque quem está aprendendo precisa do contexto, não só da regra.

import { criarElemento, criarBarraProgresso, mostrarToast } from '../ui.js';
import { obterEstado, atualizar } from '../store.js';

// Lê o mapa de itens marcados deste checklist ({ 'item-1': true, ... }).
function lerMarcados(id) {
  return obterEstado().checklists?.[id] ?? {};
}

// Alterna um item entre marcado/desmarcado e devolve se salvou.
function alternarItem(id, itemId) {
  return atualizar((estado) => {
    const checklists = { ...(estado.checklists ?? {}) };
    const doChecklist = { ...(checklists[id] ?? {}) };
    if (doChecklist[itemId]) delete doChecklist[itemId];
    else doChecklist[itemId] = true;
    checklists[id] = doChecklist;
    return { ...estado, checklists };
  });
}

/**
 * Monta um checklist completo: itens marcáveis, persistidos no store, com barra
 * de progresso e contador.
 * @param {object} opcoes
 * @param {string} opcoes.id     Identificador estável do checklist (chave no store).
 * @param {Array}  opcoes.itens  Lista de { id, texto, porque }.
 * @param {string} [opcoes.rotuloProgresso] Rótulo da barra de progresso.
 */
export function montarChecklist({ id, itens = [], rotuloProgresso = 'Progresso do checklist' }) {
  const container = criarElemento('div', { class: 'space-y-4' });
  const areaDeProgresso = criarElemento('div', { class: 'space-y-2' });
  const lista = criarElemento('ul', { class: 'space-y-2' });

  // Id do item que deve receber o foco depois do próximo redesenho (ver marcarItem).
  let itemParaFocar = null;

  function renderizarProgresso() {
    const marcados = lerMarcados(id);
    const total = itens.length;
    const quantidadeMarcada = itens.filter((item) => marcados[item.id]).length;
    const percentual = total ? (quantidadeMarcada / total) * 100 : 0;

    areaDeProgresso.replaceChildren(
      criarElemento('div', { class: 'flex items-center justify-between text-sm' }, [
        criarElemento('span', { class: 'font-medium' }, [rotuloProgresso]),
        criarElemento('span', { class: 'text-texto-suave' }, [
          quantidadeMarcada + ' de ' + total + ' itens marcados',
        ]),
      ]),
      criarBarraProgresso(percentual, rotuloProgresso),
    );
  }

  function renderizarLista() {
    const marcados = lerMarcados(id);

    lista.replaceChildren(
      ...itens.map((item) => {
        const marcado = Boolean(marcados[item.id]);

        const caixa = criarElemento('input', {
          type: 'checkbox',
          checked: marcado,
          class: 'mt-0.5 h-5 w-5 shrink-0 accent-primaria',
          'aria-describedby': id + '-porque-' + item.id,
          onchange: () => {
            const salvou = alternarItem(id, item.id);
            itemParaFocar = item.id;
            renderizarProgresso();
            renderizarLista();
            if (!salvou) mostrarToast('Não consegui salvar o progresso');
          },
        });

        return criarElemento(
          'li',
          {
            dataset: { item: item.id },
            class:
              'rounded-card border p-4 transition-colors duration-150 ' +
              (marcado ? 'border-risco-baixo/50 bg-risco-baixo/5' : 'border-borda bg-superficie'),
          },
          [
            criarElemento('label', { class: 'flex cursor-pointer items-start gap-3' }, [
              caixa,
              criarElemento('span', { class: 'text-sm' }, [
                criarElemento(
                  'span',
                  { class: marcado ? 'text-texto-suave line-through' : 'text-texto' },
                  [item.texto],
                ),
                criarElemento(
                  'span',
                  { id: id + '-porque-' + item.id, class: 'mt-1 block text-xs text-texto-suave' },
                  [item.porque],
                ),
              ]),
            ]),
          ],
        );
      }),
    );

    // Devolve o foco para a caixinha do item que acabou de ser marcado/desmarcado —
    // sem isso, redesenhar a lista jogaria o foco para o <body> (ver glossary.js).
    if (itemParaFocar) {
      lista.querySelector('[data-item="' + itemParaFocar + '"] input')?.focus();
      itemParaFocar = null;
    }
  }

  renderizarProgresso();
  renderizarLista();

  container.append(areaDeProgresso, lista);
  return container;
}
