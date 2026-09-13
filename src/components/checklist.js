// checklist.js — checklist interativo reutilizável, com estado salvo no store.
// Usado no Módulo 1 (segurança da seed, proteção contra drainers) e na página
// "Checklist antes de comprar".
//
// Cada item tem { id, texto, porque }: o texto é o que se marca, o "porque" é a
// frase curta que explica a razão do item — fica sempre visível, não é tooltip,
// porque quem está aprendendo precisa do contexto, não só da regra.
//
// Dois campos opcionais, usados pela página do checklist:
//   etiqueta { rotulo, tom } — de onde vem a força do item (ver src/data/checklist.js)
//   onde                     — em que ferramenta ou campo se faz a checagem

import { criarElemento, criarBarraProgresso, mostrarToast } from '../ui.js';
import { obterEstado, atualizar } from '../store.js';

// Cores das etiquetas. O roxo usa texto claro: o #7C3AED sobre fundo escuro não
// passa no contraste AA em letra pequena.
const TONS_DA_ETIQUETA = {
  acento: 'border-acento/50 bg-acento/10 text-acento',
  baixo: 'border-risco-baixo/50 bg-risco-baixo/10 text-risco-baixo',
  medio: 'border-risco-medio/50 bg-risco-medio/10 text-risco-medio',
  primaria: 'border-primaria/60 bg-primaria/15 text-texto',
};

// Etiqueta pequena e arredondada. Exportada para a legenda da página usar a mesma cor.
export function criarEtiqueta({ rotulo, tom }) {
  return criarElemento(
    'span',
    {
      class:
        'inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-semibold ' +
        'uppercase tracking-wide ' +
        (TONS_DA_ETIQUETA[tom] ?? TONS_DA_ETIQUETA.primaria),
    },
    [rotulo],
  );
}

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
 * @param {Array}  opcoes.itens  Lista de { id, texto, porque, etiqueta?, onde? }.
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
        const idDoPorque = id + '-porque-' + item.id;
        const idDoOnde = id + '-onde-' + item.id;

        const caixa = criarElemento('input', {
          type: 'checkbox',
          checked: marcado,
          class: 'mt-0.5 h-5 w-5 shrink-0 accent-primaria',
          'aria-describedby': item.onde ? idDoPorque + ' ' + idDoOnde : idDoPorque,
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
                item.etiqueta &&
                  criarElemento('span', { class: 'mb-1.5 block' }, [criarEtiqueta(item.etiqueta)]),
                criarElemento(
                  'span',
                  { class: marcado ? 'text-texto-suave line-through' : 'text-texto' },
                  [item.texto],
                ),
                criarElemento(
                  'span',
                  { id: idDoPorque, class: 'mt-1 block text-xs text-texto-suave' },
                  [item.porque],
                ),
                item.onde &&
                  criarElemento(
                    'span',
                    { id: idDoOnde, class: 'mt-1 block text-xs text-texto-suave' },
                    [criarElemento('strong', { class: 'font-semibold text-texto' }, ['Onde checar: ']), item.onde],
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
