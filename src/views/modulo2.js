// views/modulo2.js — monta a página do Módulo 2 a partir de src/data/modulo2.js.
//
// A página é dividida em abas internas (padrão ARIA de tabs, vindo de ui.js):
//   Visão geral · Vieses · Tipos de token · Casos reais · As 4 fases · Quiz
//
// A aba "As 4 fases" é remontada toda vez que é aberta, para o diagrama do Mermaid
// ser desenhado de novo — ver src/components/phaseFlow.js.

import { modulo2 } from '../data/modulo2.js';
import {
  criarElemento,
  criarTitulo,
  criarCard,
  criarBadgeRisco,
  rotuloRisco,
  criarBotao,
  criarAbas,
  mostrarToast,
} from '../ui.js';
import {
  montarFluxoDeFases,
  renderizarFluxoDeFases,
  montarCardsDeFases,
} from '../components/phaseFlow.js';
import { montarQuiz } from '../components/quiz.js';
import { montarDestaques } from '../components/destaques.js';
import { montarAnatomia } from '../components/anatomia.js';
import { montarLinhaDoTempo } from '../components/linhaDoTempo.js';
import { montarGraficoEmpilhado, renderizarGrafico } from '../components/grafico.js';
import { obterEstado, atualizar } from '../store.js';

// Nome legível de uma categoria de token a partir do id.
function nomeDaCategoria(id) {
  return modulo2.categoriasDeToken.find((categoria) => categoria.id === id)?.nome ?? id;
}

// Parágrafo de apoio usado no topo de várias abas.
function criarIntroducao(texto) {
  return criarElemento('p', { class: 'max-w-3xl text-texto-suave' }, [texto]);
}

// ---------------------------------------------------------------------------
// Aba 1 — Visão geral
// ---------------------------------------------------------------------------
function montarVisaoGeral() {
  const objetivos = criarCard([
    criarElemento('h2', { class: 'text-lg font-semibold' }, ['O que você leva deste módulo']),
    criarElemento(
      'ul',
      { class: 'mt-3 list-disc space-y-2 pl-5 text-texto-suave' },
      modulo2.objetivos.map((objetivo) => criarElemento('li', {}, [objetivo])),
    ),
  ]);

  const secoes = modulo2.secoes.map((secao) =>
    criarCard([
      criarElemento('h2', { class: 'text-lg font-semibold' }, [secao.titulo]),
      ...secao.paragrafos.map((paragrafo) =>
        criarElemento('p', { class: 'mt-3 text-texto-suave' }, [paragrafo]),
      ),
      secao.lista &&
        criarElemento(
          'ul',
          { class: 'mt-4 list-disc space-y-2 pl-5 text-texto-suave' },
          secao.lista.map((item) => criarElemento('li', {}, [item])),
        ),
    ]),
  );

  return criarElemento('div', { class: 'space-y-6' }, [
    objetivos,
    montarDestaques(modulo2.destaques.visaoGeral),
    ...secoes,
  ]);
}

// ---------------------------------------------------------------------------
// Aba 2 — Vieses (cards com efeito flip; o CSS do flip está em styles/custom.css)
// ---------------------------------------------------------------------------
function criarCardDeVies(vies) {
  const frente = criarElemento('span', { class: 'card-flip-face card-flip-frente' }, [
    criarElemento('span', { class: 'block text-lg font-semibold' }, [vies.nome]),
    criarElemento('span', { class: 'mt-1 block text-xs uppercase tracking-wide text-texto-suave' }, [
      vies.subtitulo,
    ]),
    criarElemento('span', { class: 'mt-3 block text-sm text-texto-suave' }, [vies.gatilho]),
    criarElemento('span', { class: 'mt-3 block text-sm' }, [
      criarElemento('span', { class: 'font-semibold' }, ['Quando aparece: ']),
      vies.quandoAparece,
    ]),
    criarElemento('span', { class: 'mt-auto block pt-4 text-xs font-semibold text-acento' }, [
      'Clique para ver o antídoto →',
    ]),
  ]);

  const verso = criarElemento(
    'span',
    { class: 'card-flip-face card-flip-verso', 'aria-hidden': 'true' },
    [
      criarElemento('span', { class: 'block text-xs uppercase tracking-wide text-acento' }, [
        'Antídoto',
      ]),
      criarElemento('span', { class: 'mt-1 block text-lg font-semibold' }, [vies.nome]),
      criarElemento('span', { class: 'mt-3 block text-sm' }, [vies.antidoto]),
      criarElemento('span', { class: 'mt-3 block text-sm text-texto-suave' }, [
        criarElemento('span', { class: 'font-semibold text-risco-alto-texto' }, ['O que custa: ']),
        vies.custo,
      ]),
      criarElemento('span', { class: 'mt-auto block pt-4 text-xs font-semibold text-acento' }, [
        '← Clique para voltar',
      ]),
    ],
  );

  const botao = criarElemento(
    'button',
    {
      type: 'button',
      class: 'card-flip',
      'aria-expanded': 'false',
      onclick: () => {
        const estavaVirado = botao.getAttribute('aria-expanded') === 'true';
        botao.setAttribute('aria-expanded', String(!estavaVirado));
        // Só a face visível fica exposta a leitores de tela.
        frente.setAttribute('aria-hidden', String(!estavaVirado));
        verso.setAttribute('aria-hidden', String(estavaVirado));
      },
    },
    [criarElemento('span', { class: 'card-flip-interno' }, [frente, verso])],
  );

  return botao;
}

function montarVieses() {
  const postDeHype = modulo2.anatomias?.postDeHype;

  return criarElemento('div', { class: 'space-y-6' }, [
    montarDestaques(modulo2.destaques.vieses),
    criarIntroducao(
      'Cinco vieses fazem quase todo o estrago em memecoin. Cada card mostra a armadilha ' +
        'na frente; clique para virar e ver o antídoto no verso.',
    ),
    criarElemento(
      'div',
      { class: 'grid gap-4 sm:grid-cols-2 xl:grid-cols-3' },
      modulo2.vieses.map(criarCardDeVies),
    ),
    // Depois de conhecer os vieses um a um, ver todos juntos num post de verdade.
    postDeHype && montarAnatomia({ id: 'm2-anatomia-hype', ...postDeHype }),
  ]);
}

// ---------------------------------------------------------------------------
// Aba 3 — Mapa de tipos de token, filtrável por categoria
// ---------------------------------------------------------------------------
function criarCardDeTipo(tipo) {
  return criarElemento(
    'article',
    { class: 'flex flex-col rounded-card border border-borda bg-superficie p-5' },
    [
      criarElemento('div', { class: 'mb-2 flex items-start justify-between gap-3' }, [
        criarElemento('h3', { class: 'text-base font-semibold' }, [tipo.nome]),
        criarBadgeRisco(tipo.risco, rotuloRisco(tipo.risco)),
      ]),

      criarElemento('p', { class: 'text-xs uppercase tracking-wide text-texto-suave' }, [
        nomeDaCategoria(tipo.categoria),
      ]),

      criarElemento('p', { class: 'mt-3 text-sm text-texto-suave' }, [tipo.descricao]),

      criarElemento('p', { class: 'mt-3 text-sm' }, [
        criarElemento('span', { class: 'font-semibold' }, ['Como reconhecer: ']),
        criarElemento('span', { class: 'text-texto-suave' }, [tipo.comoReconhecer]),
      ]),

      tipo.exemplos?.length > 0 &&
        criarElemento(
          'ul',
          { class: 'mt-3 flex flex-wrap gap-2' },
          tipo.exemplos.map((exemplo) =>
            criarElemento(
              'li',
              {
                class:
                  'rounded-full border border-borda bg-fundo px-2.5 py-1 text-xs text-texto-suave',
              },
              [exemplo],
            ),
          ),
        ),

      criarElemento('p', { class: 'mt-auto pt-4 text-sm text-texto-suave' }, [
        criarElemento('span', { class: 'font-semibold text-risco-medio' }, ['Alerta: ']),
        tipo.alerta,
      ]),
    ],
  );
}

// Onde o risco se concentra: tipos por categoria, repartidos pelo nível de risco
// do próprio catálogo. Calculado de modulo2.tiposDeToken, então acompanha
// qualquer edição no catálogo sem precisar mexer aqui.
function criarGraficoDeRiscoPorCategoria() {
  const grupos = modulo2.categoriasDeToken.map((categoria) => {
    const doTipo = modulo2.tiposDeToken.filter((tipo) => tipo.categoria === categoria.id);
    const contar = (risco) => doTipo.filter((tipo) => tipo.risco === risco).length;
    return {
      rotulo: categoria.nome,
      detalhe: doTipo.length + (doTipo.length === 1 ? ' tipo' : ' tipos'),
      valores: { alto: contar('alto'), medio: contar('medio'), baixo: contar('baixo') },
    };
  });

  return criarCard([
    criarElemento('h2', { class: 'text-lg font-semibold' }, ['Onde o risco se concentra']),
    criarElemento('div', { class: 'mt-4' }, [
      montarGraficoEmpilhado({
        camadas: [
          { chave: 'alto', rotulo: 'Risco alto', cor: 'risco-alto' },
          { chave: 'medio', rotulo: 'Risco médio', cor: 'risco-medio' },
          { chave: 'baixo', rotulo: 'Risco baixo', cor: 'risco-baixo' },
        ],
        grupos,
        sufixo: '',
        legenda:
          'Tipos de token por categoria, separados pelo nível de risco do catálogo. Repare ' +
          'que nenhuma categoria tem um tipo de risco baixo — e que três delas são só vermelho.',
      }),
    ]),
  ]);
}

function montarTiposDeToken() {
  let categoriaAtiva = 'todas';

  const opcoes = [{ id: 'todas', nome: 'Todos' }, ...modulo2.categoriasDeToken];
  const botoesFiltro = new Map();

  const grade = criarElemento('div', { class: 'grid gap-4 sm:grid-cols-2 xl:grid-cols-3' });

  const contador = criarElemento('p', {
    class: 'text-sm text-texto-suave',
    role: 'status',
  });

  const CLASSE_FILTRO = 'rounded-full border px-3 py-1.5 text-sm transition-colors duration-150';
  const FILTRO_ATIVO = ' border-primaria bg-primaria/15 text-texto';
  const FILTRO_INATIVO =
    ' border-borda bg-superficie text-texto-suave hover:border-texto-suave hover:text-texto';

  function aplicarFiltro() {
    const visiveis =
      categoriaAtiva === 'todas'
        ? modulo2.tiposDeToken
        : modulo2.tiposDeToken.filter((tipo) => tipo.categoria === categoriaAtiva);

    grade.replaceChildren(...visiveis.map(criarCardDeTipo));

    contador.textContent =
      'Mostrando ' +
      visiveis.length +
      ' de ' +
      modulo2.tiposDeToken.length +
      ' tipos' +
      (categoriaAtiva === 'todas' ? '.' : ' na categoria "' + nomeDaCategoria(categoriaAtiva) + '".');

    for (const [id, botao] of botoesFiltro) {
      const ativo = id === categoriaAtiva;
      botao.className = CLASSE_FILTRO + (ativo ? FILTRO_ATIVO : FILTRO_INATIVO);
      botao.setAttribute('aria-pressed', String(ativo));
    }
  }

  const filtros = criarElemento(
    'div',
    {
      role: 'group',
      'aria-label': 'Filtrar tipos de token por categoria',
      class: 'flex flex-wrap gap-2',
    },
    opcoes.map((opcao) => {
      const quantidade =
        opcao.id === 'todas'
          ? modulo2.tiposDeToken.length
          : modulo2.tiposDeToken.filter((tipo) => tipo.categoria === opcao.id).length;

      const botao = criarElemento(
        'button',
        {
          type: 'button',
          class: CLASSE_FILTRO + FILTRO_INATIVO,
          'aria-pressed': 'false',
          onclick: () => {
            categoriaAtiva = opcao.id;
            aplicarFiltro();
          },
        },
        [opcao.nome + ' (' + quantidade + ')'],
      );

      botoesFiltro.set(opcao.id, botao);
      return botao;
    }),
  );

  aplicarFiltro();

  return criarElemento('div', { class: 'space-y-6' }, [
    montarDestaques(modulo2.destaques.tipos),
    criarIntroducao(
      'Antes de olhar preço, saiba o que você está olhando. Cada tipo de token tem um motor ' +
        'de atenção diferente — e, por isso, um risco diferente. Use os filtros por categoria.',
    ),
    criarGraficoDeRiscoPorCategoria(),
    filtros,
    contador,
    grade,
  ]);
}

// ---------------------------------------------------------------------------
// Aba 4 — Casos reais (TRUMP, MELANIA, LIBRA)
// ---------------------------------------------------------------------------
function criarCardDeCaso(caso) {
  return criarElemento(
    'article',
    { class: 'rounded-card border border-borda bg-superficie p-5' },
    [
      criarElemento('div', { class: 'flex flex-wrap items-center gap-3' }, [
        criarElemento('h3', { class: 'text-xl font-semibold' }, [caso.nome]),
        criarElemento(
          'span',
          {
            class:
              'rounded-full border border-borda bg-fundo px-2.5 py-0.5 font-mono text-xs text-acento',
          },
          [caso.ticker],
        ),
        criarElemento(
          'span',
          {
            class:
              'rounded-full border border-risco-baixo/40 bg-risco-baixo/15 px-2.5 py-0.5 ' +
              'text-xs font-medium text-risco-baixo',
          },
          ['Caso verificado'],
        ),
      ]),

      criarElemento('p', { class: 'mt-1 text-sm text-texto-suave' }, [
        caso.data + ' · ' + caso.chain,
      ]),

      criarElemento('p', { class: 'mt-3 text-texto-suave' }, [caso.resumo]),

      criarElemento(
        'dl',
        { class: 'mt-4 grid gap-3 sm:grid-cols-2' },
        caso.numeros.map((numero) =>
          criarElemento('div', { class: 'rounded-lg border border-borda bg-fundo p-3' }, [
            criarElemento('dt', { class: 'text-xs uppercase tracking-wide text-texto-suave' }, [
              numero.rotulo,
            ]),
            criarElemento('dd', { class: 'mt-1 text-sm font-medium' }, [numero.valor]),
          ]),
        ),
      ),

      criarElemento(
        'p',
        {
          class:
            'mt-4 rounded-lg border border-primaria/40 bg-primaria/10 p-3 text-sm',
        },
        [criarElemento('strong', {}, ['Lição: ']), caso.licao],
      ),

      criarElemento('p', { class: 'mt-3 text-xs text-texto-suave' }, [
        'Fontes: ' + caso.fontes.join(' · '),
      ]),
    ],
  );
}

function montarCasos() {
  const cronologia = modulo2.linhaDoTempoCasos;

  return criarElemento('div', { class: 'space-y-6' }, [
    montarDestaques(modulo2.destaques.casos),
    criarIntroducao(
      'Três lançamentos de figuras públicas em 2025, com números registrados por fontes ' +
        'públicas. Servem para você ver o ciclo da atenção acontecendo em escala bilionária ' +
        'e em questão de horas.',
    ),

    criarElemento('div', { class: 'space-y-4' }, modulo2.casos.map(criarCardDeCaso)),

    // Os três casos, um em cima do outro, viram uma cronologia só: é a distância
    // entre pico e queda que a lista de cards não deixa ver.
    cronologia && montarLinhaDoTempo({ id: 'm2-cronologia-casos', ...cronologia }),

    criarCard(
      [
        criarElemento('h2', { class: 'text-lg font-semibold' }, ['O que os três têm em comum']),
        criarElemento('p', { class: 'mt-3 text-texto-suave' }, [modulo2.licaoDosCasos]),
      ],
      { class: 'border-acento/40' },
    ),

    criarElemento('p', { class: 'text-xs text-texto-suave' }, [modulo2.notaDosCasos]),
  ]);
}

// ---------------------------------------------------------------------------
// Aba 5 — As 4 fases (Mermaid, com cards Tailwind de reserva)
// ---------------------------------------------------------------------------
// A figura é recriada a cada abertura da aba. O aoAtivar acha a figura atual pelo
// marcador [data-diagrama] dentro do painel (vem do motor genérico em
// src/components/diagrama.js), então não guardamos referência solta aqui.
function montarFases() {
  const figuraDoFluxo = montarFluxoDeFases({
    diagrama: modulo2.diagramaFases,
    fases: modulo2.fases,
    desfecho: modulo2.desfechoFases,
    legenda: 'Ciclo de vida de uma memecoin, da estreia ao esquecimento.',
  });

  return criarElemento('div', { class: 'space-y-6' }, [
    montarDestaques(modulo2.destaques.fases),
    criarIntroducao(
      'O mesmo ciclo se repete em quase todo token: nasce, esfria, explode se aparecer uma ' +
        'catálise e depois se apaga. Saber em que fase você está muda a pergunta que você faz.',
    ),
    figuraDoFluxo,
    montarCardsDeFases(modulo2.fases),
    criarElemento(
      'p',
      { class: 'rounded-card border border-borda bg-superficie p-4 text-sm text-texto-suave' },
      [modulo2.observacaoFases],
    ),
  ]);
}

// ---------------------------------------------------------------------------
// Aba 6 — Quiz + botão de concluir o módulo
// ---------------------------------------------------------------------------
function montarConclusao() {
  const container = criarCard([]);

  function estaConcluido() {
    return (obterEstado().modulosConcluidos ?? []).includes(modulo2.id);
  }

  function alternar() {
    const concluido = estaConcluido();
    const salvou = atualizar((estado) => {
      const lista = new Set(estado.modulosConcluidos ?? []);
      if (concluido) lista.delete(modulo2.id);
      else lista.add(modulo2.id);
      return { ...estado, modulosConcluidos: [...lista] };
    });

    renderizar();
    if (!salvou) mostrarToast('Não consegui salvar o progresso');
    else mostrarToast(concluido ? 'Módulo desmarcado' : 'Módulo 2 concluído. Progresso salvo');
  }

  function renderizar() {
    const concluido = estaConcluido();
    container.replaceChildren(
      criarElemento('h2', { class: 'text-lg font-semibold' }, ['Terminou o módulo?']),
      criarElemento('p', { class: 'mt-2 mb-4 text-sm text-texto-suave' }, [
        concluido
          ? 'Módulo 2 marcado como concluído. Ele conta na barra de progresso do topo.'
          : 'Marcar aqui faz a barra de progresso do topo avançar. Dá para desmarcar depois.',
      ]),
      criarBotao(concluido ? 'Desmarcar módulo' : 'Marcar módulo como concluído', {
        variante: concluido ? 'secundario' : 'primario',
        'aria-pressed': String(concluido),
        onclick: alternar,
      }),
    );
  }

  renderizar();
  return container;
}

function montarAbaQuiz() {
  return criarElemento('div', { class: 'space-y-6' }, [
    montarQuiz({
      id: modulo2.id,
      titulo: 'Mini-quiz do Módulo 2',
      descricao: 'Quatro perguntas. As respostas ficam salvas no navegador.',
      perguntas: modulo2.quiz,
    }),
    montarConclusao(),
  ]);
}

// ---------------------------------------------------------------------------
// Montagem da página
// ---------------------------------------------------------------------------
export function montarModulo2() {
  const cabecalho = criarElemento('div', {}, [
    criarTitulo('Módulo 2 — Psicologia das memecoins', { subtitulo: modulo2.resumo }),
    criarElemento(
      'p',
      {
        class:
          'mb-6 rounded-card border border-risco-medio/40 bg-risco-medio/10 p-3 text-sm ' +
          'text-texto-suave',
      },
      [
        criarElemento('strong', { class: 'text-texto' }, ['Lembrete: ']),
        'este módulo descreve comportamento de mercado para você se proteger dele. ' +
          'Não é aconselhamento financeiro e não é material clínico.',
      ],
    ),
  ]);

  const abas = criarAbas({
    id: 'modulo-2',
    rotulo: 'Seções do Módulo 2',
    abas: [
      { id: 'visao-geral', rotulo: 'Visão geral', montar: montarVisaoGeral },
      { id: 'vieses', rotulo: 'Vieses', montar: montarVieses },
      {
        id: 'tipos',
        rotulo: 'Tipos de token',
        montar: montarTiposDeToken,
        // Sem sempreRemontar, de propósito: remontar zeraria os filtros a cada
        // visita. O Chart.js só precisa ser desenhado quando o painel está
        // visível — e renderizarGrafico já destrói a instância anterior.
        aoAtivar: (painel) => painel.querySelectorAll('[data-grafico]').forEach(renderizarGrafico),
      },
      { id: 'casos', rotulo: 'Casos reais', montar: montarCasos },
      {
        id: 'fases',
        rotulo: 'As 4 fases',
        montar: montarFases,
        // Remonta a cada abertura para o Mermaid desenhar o diagrama de novo.
        sempreRemontar: true,
        aoAtivar: (painel) => {
          renderizarFluxoDeFases(painel.querySelector('[data-diagrama]'));
        },
      },
      { id: 'quiz', rotulo: 'Quiz', montar: montarAbaQuiz },
    ],
  });

  return criarElemento('div', { class: 'mx-auto max-w-5xl' }, [cabecalho, abas]);
}
