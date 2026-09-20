// checklist.js — checklist interativo reutilizável, com estado salvo no store.
// Usado no Módulo 1 (segurança da seed, proteção contra drainers), no Módulo 5
// (execução) e na página "Checklist antes de comprar".
//
// Cada item tem { id, texto, porque }: o texto é o que se marca, o "porque" é a
// frase curta que explica a razão do item — fica sempre visível, não é tooltip,
// porque quem está aprendendo precisa do contexto, não só da regra.
//
// Três campos opcionais, usados pela página do checklist:
//   etiqueta { rotulo, tom } — de onde vem a força do item (ver src/data/checklist.js)
//   onde                     — em que ferramenta ou campo se faz a checagem
//   fonte                    — de onde vem o item (pesquisa, documentação)
//
// Dois estilos:
//   'padrao' — o de sempre (M1 e M5): barra com rótulo em cima e a lista embaixo.
//   'compra' — o do desenho "31 Checklist": título do bloco com "X de N marcados"
//              à direita, descrição, barra fina roxa, itens com a etiqueta ao lado
//              do título, "Onde olhar:" em ciano e "Fonte:" no pé de cada item.

import { criarElemento, criarBarraProgresso, mostrarToast } from '../ui.js';
import { obterEstado, atualizar } from '../store.js';

// Cores das etiquetas: o trio de cada tom do desenho (borda, fundo, texto).
// O roxo usa texto claro: o #7C3AED sobre fundo escuro não passa no contraste AA
// em letra pequena.
const TONS_DA_ETIQUETA = {
  acento: 'border-acento/50 bg-acento/10 text-acento',
  baixo: 'border-risco-baixo/50 bg-risco-baixo/12 text-risco-baixo',
  medio: 'border-risco-medio/40 bg-risco-medio/12 text-risco-medio',
  primaria: 'border-primaria/50 bg-primaria/15 text-texto',
};

// Etiqueta pequena e arredondada (pílula de 12px, como no desenho). Exportada para a
// página do checklist usar a mesma cor nos cartões das etiquetas.
// `alta: true` é a pílula dentro de uma linha de texto (cartões das etiquetas): 2px
// de folga em cima e embaixo, sem aumentar a altura da linha. Sem ela, é a pílula
// ao lado do título de cada item, com 1px de folga.
export function criarEtiqueta({ rotulo, tom, alta = false }) {
  return criarElemento(
    'span',
    {
      class:
        'whitespace-nowrap rounded-full border px-2.5 text-[12px] font-semibold ' +
        (alta ? 'inline py-0.5 ' : 'inline-flex items-center py-px ') +
        (TONS_DA_ETIQUETA[tom] ?? TONS_DA_ETIQUETA.primaria),
    },
    [rotulo],
  );
}

// Lê o mapa de itens marcados deste checklist ({ 'item-1': true, ... }).
function lerMarcados(id) {
  return obterEstado().checklists?.[id] ?? {};
}

// Quantos itens da lista estão marcados agora.
function contarMarcados(id, itens) {
  const marcados = lerMarcados(id);
  return itens.filter((item) => marcados[item.id]).length;
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

// ---------------------------------------------------------------------------
// Estilo 'padrao' (Módulos 1 e 5)
// ---------------------------------------------------------------------------

// Um item no estilo de sempre: a caixinha e o texto dentro de um <label> só.
function criarItemPadrao(id, item, marcado, aoAlternar) {
  const idDoPorque = id + '-porque-' + item.id;
  const idDoOnde = id + '-onde-' + item.id;

  const caixa = criarElemento('input', {
    type: 'checkbox',
    checked: marcado,
    class: 'mt-0.5 h-5 w-5 shrink-0 accent-primaria',
    'aria-describedby': item.onde ? idDoPorque + ' ' + idDoOnde : idDoPorque,
    onchange: aoAlternar,
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
}

// ---------------------------------------------------------------------------
// Estilo 'compra' (página "Checklist antes de comprar", desenho 31)
// ---------------------------------------------------------------------------

// Um item no desenho do checklist de compra:
//   caixinha verde de 20px | título (<label>) com a etiqueta à direita
//                          | porquê
//                          | ONDE OLHAR: texto ciano
//                          | Fonte: …
// Quando falta espaço, a etiqueta desce para baixo do título (flex-wrap).
function criarItemDeCompra(id, item, marcado, aoAlternar) {
  const idDaCaixa = id + '-item-' + item.id;
  const idDoPorque = id + '-porque-' + item.id;
  const idDoOnde = id + '-onde-' + item.id;
  const idDaFonte = id + '-fonte-' + item.id;
  const descricoes = [idDoPorque, item.onde && idDoOnde, item.fonte && idDaFonte].filter(Boolean);

  const caixa = criarElemento('input', {
    id: idDaCaixa,
    type: 'checkbox',
    checked: marcado,
    // Margens da caixinha nativa do desenho (4px à esquerda, 3px à direita).
    class: 'mt-1 ml-1 mr-[3px] h-5 w-5 shrink-0 cursor-pointer accent-risco-baixo',
    'aria-describedby': descricoes.join(' '),
    onchange: aoAlternar,
  });

  const linhaDoTitulo = criarElemento(
    'div',
    { class: 'flex flex-wrap items-baseline justify-between gap-3' },
    [
      criarElemento(
        'label',
        {
          for: idDaCaixa,
          class:
            'cursor-pointer text-[15px] font-semibold ' +
            (marcado ? 'text-texto-suave line-through' : 'text-texto'),
        },
        [item.texto],
      ),
      item.etiqueta && criarEtiqueta(item.etiqueta),
    ],
  );

  // Alvo de toque: só o título é <label>, mas um clique em qualquer outro ponto do
  // cartão (porquê, "Onde olhar", "Fonte", folgas) também marca a caixinha. Assim o
  // alvo passa dos 44px do handoff sem mudar nada no visual do desenho.
  // Ficam de fora o clique na própria caixinha e no título (esses já marcam
  // sozinhos) e o fim de uma seleção de texto (quem arrasta para copiar não quer marcar).
  function aoClicarNoCartao(evento) {
    if (evento.target === caixa || evento.target.closest('label')) return;
    if (String(window.getSelection?.() ?? '') !== '') return;
    caixa.click();
  }

  return criarElemento(
    'li',
    {
      dataset: { item: item.id },
      class:
        'flex cursor-pointer items-start gap-3 rounded-lg border px-4 py-3.5 transition-colors duration-150 ' +
        (marcado ? 'border-risco-baixo/50 bg-risco-baixo/5' : 'border-borda bg-fundo'),
      onclick: aoClicarNoCartao,
    },
    [
      caixa,
      criarElemento('div', { class: 'flex min-w-0 flex-auto flex-col gap-2' }, [
        linhaDoTitulo,
        criarElemento('p', { id: idDoPorque, class: 'text-[14px] text-texto-suave' }, [item.porque]),
        item.onde &&
          criarElemento('p', { id: idDoOnde, class: 'text-[13px] text-acento' }, [
            criarElemento(
              'span',
              { class: 'text-[11px] font-semibold uppercase tracking-[.05em] text-texto-suave' },
              ['Onde olhar: '],
            ),
            item.onde,
          ]),
        item.fonte &&
          criarElemento('p', { id: idDaFonte, class: 'text-[12px] text-texto-suave' }, [
            'Fonte: ' + item.fonte,
          ]),
      ]),
    ],
  );
}

// Cabeçalho do bloco no estilo 'compra': título à esquerda, "X de N marcados" em
// fonte mono à direita, a descrição e a barra fina (6px) roxa.
function criarCabecalhoDeCompra({ titulo, descricao }) {
  const contagem = criarElemento('span', { class: 'font-mono text-[13px] text-texto-suave' });
  const preenchimento = criarElemento('div', {
    class: 'h-full rounded-full bg-primaria transition-[width] duration-200',
  });
  const barra = criarElemento(
    'div',
    { class: 'h-1.5 overflow-hidden rounded-full bg-borda', role: 'img' },
    [preenchimento],
  );

  const partes = [
    criarElemento('div', { class: 'flex flex-wrap items-baseline justify-between gap-3' }, [
      titulo && criarElemento('h2', { class: 'text-[1.125rem] font-semibold' }, [titulo]),
      contagem,
    ]),
    descricao && criarElemento('p', { class: 'text-texto-suave' }, [descricao]),
    barra,
  ];

  // Atualiza o número e a barra sem redesenhar o cabeçalho (o foco fica onde está).
  function atualizar(quantidade, total) {
    const percentual = total ? (quantidade / total) * 100 : 0;
    contagem.textContent = quantidade + ' de ' + total + ' marcados';
    preenchimento.style.width = percentual + '%';
    barra.setAttribute(
      'aria-label',
      'Progresso deste bloco: ' + quantidade + ' de ' + total + ' itens marcados',
    );
  }

  return { partes, atualizar };
}

/**
 * Monta um checklist completo: itens marcáveis, persistidos no store, com barra
 * de progresso e contador.
 * @param {object} opcoes
 * @param {string} opcoes.id     Identificador estável do checklist (chave no store).
 * @param {Array}  opcoes.itens  Lista de { id, texto, porque, etiqueta?, onde?, fonte? }.
 * @param {string} [opcoes.rotuloProgresso] Rótulo da barra de progresso (estilo 'padrao').
 * @param {'padrao'|'compra'} [opcoes.estilo] Visual dos itens (ver o topo do arquivo).
 * @param {string} [opcoes.titulo]    Título do bloco (h2), só no estilo 'compra'.
 * @param {string} [opcoes.descricao] Frase embaixo do título, só no estilo 'compra'.
 * @param {Function} [opcoes.aoMudar] Chamada a cada marcação com { marcados, total }
 *                                    (a página do checklist atualiza a contagem da aba).
 *
 * Ex. (M1): montarChecklist({ id: 'modulo-1-seguranca-seed', itens, rotuloProgresso: '…' })
 * Ex. (compra): montarChecklist({ id, itens, estilo: 'compra', titulo, descricao, aoMudar })
 */
export function montarChecklist({
  id,
  itens = [],
  rotuloProgresso = 'Progresso do checklist',
  estilo = 'padrao',
  titulo = null,
  descricao = null,
  aoMudar = null,
}) {
  const deCompra = estilo === 'compra';
  const container = criarElemento('div', { class: deCompra ? 'flex flex-col gap-4' : 'space-y-4' });
  const areaDeProgresso = criarElemento('div', { class: 'space-y-2' });
  const lista = criarElemento('ul', { class: deCompra ? 'flex flex-col gap-3' : 'space-y-2' });
  const cabecalhoDeCompra = deCompra ? criarCabecalhoDeCompra({ titulo, descricao }) : null;

  // Id do item que deve receber o foco depois do próximo redesenho (ver marcarItem).
  let itemParaFocar = null;

  function renderizarProgresso() {
    const total = itens.length;
    const quantidadeMarcada = contarMarcados(id, itens);

    if (cabecalhoDeCompra) {
      cabecalhoDeCompra.atualizar(quantidadeMarcada, total);
      return;
    }

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
    const criarItem = deCompra ? criarItemDeCompra : criarItemPadrao;

    lista.replaceChildren(
      ...itens.map((item) =>
        criarItem(id, item, Boolean(marcados[item.id]), () => {
          const salvou = alternarItem(id, item.id);
          itemParaFocar = item.id;
          renderizarProgresso();
          renderizarLista();
          if (!salvou) mostrarToast('Não consegui salvar o progresso');
          if (typeof aoMudar === 'function') {
            aoMudar({ marcados: contarMarcados(id, itens), total: itens.length });
          }
        }),
      ),
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

  if (cabecalhoDeCompra) container.append(...cabecalhoDeCompra.partes.filter(Boolean), lista);
  else container.append(areaDeProgresso, lista);
  return container;
}
