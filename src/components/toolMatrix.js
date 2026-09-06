// toolMatrix.js — matriz filtrável de ferramentas do Módulo 3 (social vs. técnico).
//
// Três filtros independentes (pilar, chain, papel) se combinam por "E": uma
// ferramenta só aparece se bater com os três ao mesmo tempo. Cada ferramenta é
// um <details>: o resumo mostra nome + badges, e abrir revela "o que faz",
// "quando usar" e o risco — sem precisar de nenhum JS extra para o toggle.

import { criarElemento, criarBadgeRisco, rotuloRisco } from '../ui.js';

const PILARES = [
  { id: 'todos', nome: 'Todos' },
  { id: 'social', nome: 'Social' },
  { id: 'tecnico', nome: 'Técnico' },
];

const CLASSE_FILTRO = 'rounded-full border px-3 py-1.5 text-sm transition-colors duration-150';
const FILTRO_ATIVO = ' border-primaria bg-primaria/15 text-texto';
const FILTRO_INATIVO =
  ' border-borda bg-superficie text-texto-suave hover:border-texto-suave hover:text-texto';

// Um grupo de filtro (pilar, chain ou papel), com o "Todos"/"Todas" já embutido.
// onSelecionar recebe o id escolhido; devolve o próprio botão para o chamador
// conseguir atualizar a classe/estado depois de trocar de filtro.
function criarGrupoDeFiltro({ rotulo, opcoes, idAtivo, onSelecionar }) {
  const botoes = new Map();

  const grupo = criarElemento(
    'div',
    { role: 'group', 'aria-label': rotulo, class: 'flex flex-wrap items-center gap-2' },
    [
      criarElemento('span', { class: 'text-xs font-semibold uppercase tracking-wide text-texto-suave' }, [
        rotulo,
      ]),
      ...opcoes.map((opcao) => {
        const botao = criarElemento(
          'button',
          {
            type: 'button',
            class: CLASSE_FILTRO + (opcao.id === idAtivo ? FILTRO_ATIVO : FILTRO_INATIVO),
            'aria-pressed': String(opcao.id === idAtivo),
            onclick: () => onSelecionar(opcao.id),
          },
          [opcao.nome],
        );
        botoes.set(opcao.id, botao);
        return botao;
      }),
    ],
  );

  function marcarAtivo(id) {
    for (const [opcaoId, botao] of botoes) {
      const ativo = opcaoId === id;
      botao.className = CLASSE_FILTRO + (ativo ? FILTRO_ATIVO : FILTRO_INATIVO);
      botao.setAttribute('aria-pressed', String(ativo));
    }
  }

  return { elemento: grupo, marcarAtivo };
}

// Badge pequeno e neutro, usado para chains e papéis na lista de resumo do <details>.
function criarChip(texto, extra = '') {
  return criarElemento(
    'span',
    {
      class:
        'rounded-full border border-borda bg-fundo px-2.5 py-0.5 text-xs text-texto-suave ' + extra,
    },
    [texto],
  );
}

function criarAvisoDestaque(texto, cor) {
  const CORES = {
    acento: 'border-acento/40 bg-acento/10 text-texto',
    alerta: 'border-risco-alto/40 bg-risco-alto/10 text-texto',
    medio: 'border-risco-medio/40 bg-risco-medio/10 text-texto',
  };
  return criarElemento('p', { class: 'rounded-lg border p-3 text-sm ' + (CORES[cor] ?? CORES.acento) }, [
    texto,
  ]);
}

function criarCardDeFerramenta(ferramenta, { nomeDaChain, nomeDoPapel }) {
  const resumo = criarElemento(
    'summary',
    { class: 'flex cursor-pointer list-none flex-wrap items-start justify-between gap-3' },
    [
      criarElemento('div', { class: 'min-w-0' }, [
        criarElemento('h3', { class: 'text-base font-semibold' }, [ferramenta.nome]),
        criarElemento('div', { class: 'mt-2 flex flex-wrap gap-1.5' }, [
          criarChip(ferramenta.pilar === 'social' ? 'Pilar social' : 'Pilar técnico', 'text-acento'),
          ...ferramenta.chains.map((id) => criarChip(nomeDaChain(id))),
          ...ferramenta.papeis.map((id) => criarChip(nomeDoPapel(id))),
        ]),
      ]),
      criarElemento('div', { class: 'flex shrink-0 items-center gap-2' }, [
        criarBadgeRisco(ferramenta.risco, rotuloRisco(ferramenta.risco)),
        criarElemento(
          'span',
          {
            class: 'text-texto-suave transition-transform duration-150 group-open:rotate-180',
            'aria-hidden': 'true',
          },
          ['▾'],
        ),
      ]),
    ],
  );

  const detalhes = criarElemento('div', { class: 'mt-4 space-y-3 text-sm' }, [
    ferramenta.correcao && criarAvisoDestaque(ferramenta.correcao, 'acento'),
    ferramenta.naoSuportaSolana &&
      criarAvisoDestaque('Não suporta Solana — cobre apenas chains EVM.', 'alerta'),
    ferramenta.naoVerificado &&
      criarAvisoDestaque(
        'Não verificado: nenhuma fonte pública confiável confirma esta ferramenta específica.',
        'medio',
      ),
    criarElemento('p', { class: 'text-texto-suave' }, [
      criarElemento('strong', { class: 'text-texto' }, ['O que faz: ']),
      ferramenta.oQueFaz,
    ]),
    criarElemento('p', { class: 'text-texto-suave' }, [
      criarElemento('strong', { class: 'text-texto' }, ['Quando usar: ']),
      ferramenta.quandoUsar,
    ]),
    ferramenta.observacoes &&
      criarElemento('p', { class: 'text-texto-suave' }, [
        criarElemento('strong', { class: 'text-texto' }, ['Observação: ']),
        ferramenta.observacoes,
      ]),
  ]);

  return criarElemento(
    'details',
    { class: 'group rounded-card border border-borda bg-superficie p-5 open:border-primaria/50' },
    [resumo, detalhes],
  );
}

/**
 * Monta a matriz filtrável de ferramentas.
 * @param {object} opcoes
 * @param {Array} opcoes.ferramentas Lista de ferramentas (ver src/data/modulo3.js).
 * @param {Array} opcoes.chains      Catálogo de chains para o filtro { id, nome }.
 * @param {Array} opcoes.papeis      Catálogo de papéis para o filtro { id, nome }.
 */
export function montarMatrizDeFerramentas({ ferramentas, chains, papeis }) {
  const nomeDaChain = (id) => chains.find((chain) => chain.id === id)?.nome ?? id;
  const nomeDoPapel = (id) => papeis.find((papel) => papel.id === id)?.nome ?? id;

  let pilarAtivo = 'todos';
  let chainAtiva = 'todas';
  let papelAtivo = 'todos';

  const grade = criarElemento('div', { class: 'grid gap-4 xl:grid-cols-2' });
  const contador = criarElemento('p', { class: 'text-sm text-texto-suave', role: 'status' });

  function aplicarFiltros() {
    const visiveis = ferramentas.filter((ferramenta) => {
      const bateuPilar = pilarAtivo === 'todos' || ferramenta.pilar === pilarAtivo;
      const bateuChain = chainAtiva === 'todas' || ferramenta.chains.includes(chainAtiva);
      const bateuPapel = papelAtivo === 'todos' || ferramenta.papeis.includes(papelAtivo);
      return bateuPilar && bateuChain && bateuPapel;
    });

    grade.replaceChildren(
      ...(visiveis.length > 0
        ? visiveis.map((ferramenta) => criarCardDeFerramenta(ferramenta, { nomeDaChain, nomeDoPapel }))
        : [
            criarElemento('p', { class: 'text-sm text-texto-suave xl:col-span-2' }, [
              'Nenhuma ferramenta bate com esses filtros ao mesmo tempo. Tente afrouxar um deles.',
            ]),
          ]),
    );

    contador.textContent = 'Mostrando ' + visiveis.length + ' de ' + ferramentas.length + ' ferramentas.';
  }

  const filtroPilar = criarGrupoDeFiltro({
    rotulo: 'Pilar',
    opcoes: PILARES,
    idAtivo: pilarAtivo,
    onSelecionar: (id) => {
      pilarAtivo = id;
      filtroPilar.marcarAtivo(id);
      aplicarFiltros();
    },
  });

  const filtroChain = criarGrupoDeFiltro({
    rotulo: 'Chain',
    opcoes: [{ id: 'todas', nome: 'Todas' }, ...chains],
    idAtivo: chainAtiva,
    onSelecionar: (id) => {
      chainAtiva = id;
      filtroChain.marcarAtivo(id);
      aplicarFiltros();
    },
  });

  const filtroPapel = criarGrupoDeFiltro({
    rotulo: 'Papel',
    opcoes: [{ id: 'todos', nome: 'Todos' }, ...papeis],
    idAtivo: papelAtivo,
    onSelecionar: (id) => {
      papelAtivo = id;
      filtroPapel.marcarAtivo(id);
      aplicarFiltros();
    },
  });

  aplicarFiltros();

  return criarElemento('div', { class: 'space-y-5' }, [
    criarElemento('div', { class: 'space-y-3 rounded-card border border-borda bg-fundo p-4' }, [
      filtroPilar.elemento,
      filtroChain.elemento,
      filtroPapel.elemento,
    ]),
    contador,
    grade,
  ]);
}
