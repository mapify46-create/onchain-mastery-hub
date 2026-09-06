// views/modulo3.js — monta a página do Módulo 3 a partir de src/data/modulo3.js.
//
// Abas internas (padrão ARIA de tabs, vindo de ui.js):
//   Visão geral · Matriz de ferramentas · Cenário 2025–2026 · Quiz

import { modulo3 } from '../data/modulo3.js';
import {
  criarElemento,
  criarTitulo,
  criarCard,
  criarBotao,
  criarAbas,
  mostrarToast,
} from '../ui.js';
import { montarMatrizDeFerramentas } from '../components/toolMatrix.js';
import { montarQuiz } from '../components/quiz.js';
import { obterEstado, atualizar } from '../store.js';

// Parágrafo de apoio usado no topo de várias abas.
function criarIntroducao(texto) {
  return criarElemento('p', { class: 'max-w-3xl text-texto-suave' }, [texto]);
}

// ---------------------------------------------------------------------------
// Aba 1 — Visão geral (os dois pilares, a correção Axiom e o J7 Tracker)
// ---------------------------------------------------------------------------
function montarVisaoGeral() {
  const objetivos = criarCard([
    criarElemento('h2', { class: 'text-lg font-semibold' }, ['O que você leva deste módulo']),
    criarElemento(
      'ul',
      { class: 'mt-3 list-disc space-y-2 pl-5 text-texto-suave' },
      modulo3.objetivos.map((objetivo) => criarElemento('li', {}, [objetivo])),
    ),
  ]);

  // Correção em destaque: precisa ser a coisa mais visível da aba.
  const correcao = criarCard(
    [
      criarElemento('h2', { class: 'text-lg font-semibold text-acento' }, [
        modulo3.correcaoAxiom.titulo,
      ]),
      criarElemento('p', { class: 'mt-3 text-texto-suave' }, [modulo3.correcaoAxiom.texto]),
    ],
    { class: 'border-acento/50 bg-acento/5' },
  );

  const secoes = modulo3.secoes.map((secao) =>
    criarCard([
      criarElemento('h2', { class: 'text-lg font-semibold' }, [secao.titulo]),
      ...secao.paragrafos.map((paragrafo) =>
        criarElemento('p', { class: 'mt-3 text-texto-suave' }, [paragrafo]),
      ),
    ]),
  );

  const pilarSocial = criarCard([
    criarElemento('h2', { class: 'text-lg font-semibold' }, [modulo3.pilarSocial.titulo]),
    ...modulo3.pilarSocial.paragrafos.map((paragrafo) =>
      criarElemento('p', { class: 'mt-3 text-texto-suave' }, [paragrafo]),
    ),
    criarElemento(
      'div',
      { class: 'mt-4 rounded-lg border border-risco-medio/40 bg-risco-medio/10 p-3 text-sm' },
      [
        criarElemento('strong', { class: 'block text-texto' }, [modulo3.pilarSocial.jTracker.titulo]),
        criarElemento('span', { class: 'mt-1 block text-texto-suave' }, [
          modulo3.pilarSocial.jTracker.texto,
        ]),
      ],
    ),
  ]);

  return criarElemento('div', { class: 'space-y-6' }, [
    objetivos,
    correcao,
    ...secoes,
    pilarSocial,
  ]);
}

// ---------------------------------------------------------------------------
// Aba 2 — Matriz de ferramentas (filtrável por pilar/chain/papel)
// ---------------------------------------------------------------------------
function montarAbaMatriz() {
  return criarElemento('div', { class: 'space-y-6' }, [
    criarIntroducao(
      'Filtre por pilar, chain e papel para achar a ferramenta certa. Clique numa ' +
        'ferramenta para abrir o card com "o que faz", "quando usar" e o risco.',
    ),
    montarMatrizDeFerramentas({
      ferramentas: modulo3.ferramentas,
      chains: modulo3.chains,
      papeis: modulo3.papeis,
    }),
  ]);
}

// ---------------------------------------------------------------------------
// Aba 3 — Cenário de launchpads 2025–2026
// ---------------------------------------------------------------------------
function montarAbaCenario() {
  return criarElemento('div', { class: 'space-y-6' }, [
    criarIntroducao(modulo3.cenarioLaunchpads.introducao),

    criarElemento(
      'ol',
      { class: 'space-y-4' },
      modulo3.cenarioLaunchpads.eventos.map((evento) =>
        criarElemento('li', { class: 'rounded-card border border-borda bg-superficie p-5' }, [
          criarElemento('p', { class: 'text-xs font-semibold uppercase tracking-wide text-acento' }, [
            evento.data,
          ]),
          criarElemento('p', { class: 'mt-2 text-texto-suave' }, [evento.texto]),
        ]),
      ),
    ),

    criarCard(
      [
        criarElemento('h2', { class: 'text-lg font-semibold' }, ['Conclusão prática']),
        criarElemento('p', { class: 'mt-3 text-texto-suave' }, [modulo3.cenarioLaunchpads.conclusao]),
      ],
      { class: 'border-primaria/40' },
    ),
  ]);
}

// ---------------------------------------------------------------------------
// Aba 4 — Quiz + botão de concluir o módulo
// ---------------------------------------------------------------------------
function montarConclusao() {
  const container = criarCard([]);

  function estaConcluido() {
    return (obterEstado().modulosConcluidos ?? []).includes(modulo3.id);
  }

  function alternar() {
    const concluido = estaConcluido();
    const salvou = atualizar((estado) => {
      const lista = new Set(estado.modulosConcluidos ?? []);
      if (concluido) lista.delete(modulo3.id);
      else lista.add(modulo3.id);
      return { ...estado, modulosConcluidos: [...lista] };
    });

    renderizar();
    if (!salvou) mostrarToast('Não consegui salvar o progresso');
    else mostrarToast(concluido ? 'Módulo desmarcado' : 'Módulo 3 concluído. Progresso salvo');
  }

  function renderizar() {
    const concluido = estaConcluido();
    container.replaceChildren(
      criarElemento('h2', { class: 'text-lg font-semibold' }, ['Terminou o módulo?']),
      criarElemento('p', { class: 'mt-2 mb-4 text-sm text-texto-suave' }, [
        concluido
          ? 'Módulo 3 marcado como concluído. Ele conta na barra de progresso do topo.'
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
      id: modulo3.id,
      titulo: 'Mini-quiz do Módulo 3',
      descricao: 'Quatro perguntas. As respostas ficam salvas no navegador.',
      perguntas: modulo3.quiz,
    }),
    montarConclusao(),
  ]);
}

// ---------------------------------------------------------------------------
// Montagem da página
// ---------------------------------------------------------------------------
export function montarModulo3() {
  const cabecalho = criarElemento('div', {}, [
    criarTitulo('Módulo 3 — Os dois pilares (Social vs. Técnico)', { subtitulo: modulo3.resumo }),
    criarElemento(
      'p',
      {
        class:
          'mb-6 rounded-card border border-risco-medio/40 bg-risco-medio/10 p-3 text-sm ' +
          'text-texto-suave',
      },
      [
        criarElemento('strong', { class: 'text-texto' }, ['Lembrete: ']),
        'este módulo apresenta ferramentas de mercado para você conhecer o ecossistema. ' +
          'Citar uma ferramenta não é recomendação de uso, e nada aqui é aconselhamento financeiro.',
      ],
    ),
  ]);

  const abas = criarAbas({
    id: 'modulo-3',
    rotulo: 'Seções do Módulo 3',
    abas: [
      { id: 'visao-geral', rotulo: 'Visão geral', montar: montarVisaoGeral },
      { id: 'matriz', rotulo: 'Matriz de ferramentas', montar: montarAbaMatriz },
      { id: 'cenario', rotulo: 'Cenário 2025–2026', montar: montarAbaCenario },
      { id: 'quiz', rotulo: 'Quiz', montar: montarAbaQuiz },
    ],
  });

  return criarElemento('div', { class: 'mx-auto max-w-5xl' }, [cabecalho, abas]);
}
