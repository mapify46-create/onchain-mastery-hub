// glossary.js — glossário com busca por texto, filtro por categoria
// e botão "marcar como estudado" salvo no store.
//
// Padrão de estado local + store, igual ao quiz.js e ao toolMatrix.js:
// busca e filtro vivem só na memória do componente (não precisam persistir);
// "estudado" persiste no store (localStorage), então sobrevive ao F5.

import {
  criarElemento,
  criarBarraProgresso,
  criarBotao,
  mostrarToast,
} from '../ui.js';
import { obterEstado, atualizar } from '../store.js';

const CLASSE_FILTRO = 'rounded-full border px-3 py-1.5 text-sm transition-colors duration-150';
const FILTRO_ATIVO = ' border-primaria bg-primaria/15 text-texto';
const FILTRO_INATIVO =
  ' border-borda bg-superficie text-texto-suave hover:border-texto-suave hover:text-texto';

// Remove acentos para a busca não depender de digitar "á" certinho.
function normalizar(texto) {
  return String(texto)
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase();
}

// Lê o mapa de termos estudados salvo no store ({ 'slippage': true, ... }).
function lerEstudados() {
  return obterEstado().glossario ?? {};
}

// Alterna um termo entre estudado/não estudado e devolve se salvou.
function alternarEstudado(id) {
  return atualizar((estado) => {
    const glossario = { ...(estado.glossario ?? {}) };
    if (glossario[id]) delete glossario[id];
    else glossario[id] = true;
    return { ...estado, glossario };
  });
}

// Nome legível de uma categoria a partir do id.
function nomeDaCategoria(categorias, id) {
  return categorias.find((categoria) => categoria.id === id)?.nome ?? id;
}

function criarCardDeTermo(termo, { categorias, estudado, onAlternar }) {
  return criarElemento(
    'article',
    {
      // O id fica no dataset para a lista saber devolver o foco a este card
      // depois de se redesenhar (ver renderizarLista).
      dataset: { termo: termo.id },
      class:
        'rounded-card border p-5 transition-colors duration-150 ' +
        (estudado ? 'border-risco-baixo/50 bg-risco-baixo/5' : 'border-borda bg-superficie'),
    },
    [
      criarElemento('div', { class: 'flex flex-wrap items-start justify-between gap-3' }, [
        criarElemento('div', { class: 'min-w-0' }, [
          criarElemento('h2', { class: 'text-base font-semibold' }, [termo.termo]),
          criarElemento(
            'div',
            { class: 'mt-2 flex flex-wrap gap-1.5' },
            termo.categorias.map((id) =>
              criarElemento(
                'span',
                {
                  class:
                    'rounded-full border border-borda bg-fundo px-2.5 py-0.5 text-xs text-texto-suave',
                },
                [nomeDaCategoria(categorias, id)],
              ),
            ),
          ),
        ]),
        criarBotao(estudado ? 'Estudado ✓' : 'Marcar como estudado', {
          variante: estudado ? 'secundario' : 'primario',
          class: 'shrink-0',
          'aria-pressed': String(estudado),
          onclick: onAlternar,
        }),
      ]),

      criarElemento('p', { class: 'mt-3 text-sm text-texto-suave' }, [termo.definicao]),

      criarElemento('p', { class: 'mt-3 text-sm text-texto-suave' }, [
        criarElemento('strong', { class: 'text-texto' }, ['Exemplo: ']),
        termo.exemplo,
      ]),

      criarElemento(
        'p',
        {
          class:
            'mt-3 rounded-lg border border-risco-medio/40 bg-risco-medio/10 p-3 text-sm text-texto-suave',
        },
        [criarElemento('strong', { class: 'text-texto' }, ['Alerta: ']), termo.alerta],
      ),
    ],
  );
}

/**
 * Monta o glossário completo: busca, filtro por categoria, barra de progresso
 * e a lista de termos.
 * @param {object} opcoes
 * @param {Array} opcoes.termos      Lista de termos (ver src/data/glossario.js).
 * @param {Array} opcoes.categorias  Catálogo de categorias { id, nome } para o filtro.
 */
export function montarGlossario({ termos, categorias }) {
  let busca = '';
  let categoriaAtiva = 'todas';
  // Id do termo que deve receber o foco depois do próximo desenho da lista.
  let termoParaFocar = null;

  const container = criarElemento('div', { class: 'space-y-6' });

  const campoBusca = criarElemento('input', {
    type: 'search',
    class:
      'w-full rounded-lg border border-borda bg-fundo px-3 py-2 text-sm text-texto ' +
      'placeholder:text-texto-suave',
    placeholder: 'Buscar por termo, definição, exemplo ou alerta...',
    'aria-label': 'Buscar no glossário',
    oninput: (evento) => {
      busca = evento.target.value;
      renderizarLista();
    },
  });

  const botoesDeFiltro = new Map();
  const opcoesDeFiltro = [{ id: 'todas', nome: 'Todas' }, ...categorias];

  const grupoDeFiltro = criarElemento(
    'div',
    { role: 'group', 'aria-label': 'Filtrar por categoria', class: 'flex flex-wrap items-center gap-2' },
    opcoesDeFiltro.map((opcao) => {
      const botao = criarElemento(
        'button',
        {
          type: 'button',
          class: CLASSE_FILTRO + (opcao.id === categoriaAtiva ? FILTRO_ATIVO : FILTRO_INATIVO),
          'aria-pressed': String(opcao.id === categoriaAtiva),
          onclick: () => {
            categoriaAtiva = opcao.id;
            for (const [id, btn] of botoesDeFiltro) {
              const ativo = id === categoriaAtiva;
              btn.className = CLASSE_FILTRO + (ativo ? FILTRO_ATIVO : FILTRO_INATIVO);
              btn.setAttribute('aria-pressed', String(ativo));
            }
            renderizarLista();
          },
        },
        [opcao.nome],
      );
      botoesDeFiltro.set(opcao.id, botao);
      return botao;
    }),
  );

  const areaDeProgresso = criarElemento('div', { class: 'space-y-2' });
  const contador = criarElemento('p', { class: 'text-sm text-texto-suave', role: 'status' });
  const grade = criarElemento('div', { class: 'grid gap-4 xl:grid-cols-2' });

  function renderizarProgresso() {
    const estudados = lerEstudados();
    const total = termos.length;
    const quantidadeEstudada = termos.filter((termo) => estudados[termo.id]).length;
    const percentual = total ? (quantidadeEstudada / total) * 100 : 0;

    areaDeProgresso.replaceChildren(
      criarElemento('div', { class: 'flex items-center justify-between text-sm' }, [
        criarElemento('span', { class: 'font-medium' }, ['Progresso do glossário']),
        criarElemento('span', { class: 'text-texto-suave' }, [
          quantidadeEstudada + ' de ' + total + ' termos estudados',
        ]),
      ]),
      criarBarraProgresso(percentual, 'Progresso do glossário'),
    );
  }

  function renderizarLista() {
    const estudados = lerEstudados();
    const termoBusca = normalizar(busca.trim());

    const visiveis = termos.filter((termo) => {
      const bateuCategoria = categoriaAtiva === 'todas' || termo.categorias.includes(categoriaAtiva);
      if (!bateuCategoria) return false;
      if (!termoBusca) return true;

      const alvo = normalizar(
        [termo.termo, termo.definicao, termo.exemplo, termo.alerta].join(' '),
      );
      return alvo.includes(termoBusca);
    });

    grade.replaceChildren(
      ...(visiveis.length > 0
        ? visiveis.map((termo) =>
            criarCardDeTermo(termo, {
              categorias,
              estudado: Boolean(estudados[termo.id]),
              onAlternar: () => {
                const salvou = alternarEstudado(termo.id);
                // A lista inteira é redesenhada e o botão clicado deixa de existir.
                // Sem isto, o foco cairia no <body> e quem usa teclado voltaria
                // para o começo da página a cada termo marcado.
                termoParaFocar = termo.id;
                renderizarProgresso();
                renderizarLista();
                if (!salvou) mostrarToast('Não consegui salvar o progresso');
              },
            }),
          )
        : [
            criarElemento('p', { class: 'text-sm text-texto-suave xl:col-span-2' }, [
              'Nenhum termo bate com essa busca e esse filtro ao mesmo tempo. Tente limpar um dos dois.',
            ]),
          ]),
    );

    contador.textContent = 'Mostrando ' + visiveis.length + ' de ' + termos.length + ' termos.';

    // Devolve o foco ao botão do termo que acabou de ser marcado/desmarcado.
    if (termoParaFocar) {
      const seletor = '[data-termo="' + termoParaFocar + '"] button';
      grade.querySelector(seletor)?.focus();
      termoParaFocar = null;
    }
  }

  renderizarProgresso();
  renderizarLista();

  container.append(
    criarElemento('div', { class: 'space-y-4 rounded-card border border-borda bg-fundo p-4' }, [
      campoBusca,
      grupoDeFiltro,
    ]),
    areaDeProgresso,
    contador,
    grade,
  );

  return container;
}
