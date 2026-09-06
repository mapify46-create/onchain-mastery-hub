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
  html,
} from '../ui.js';
import { montarMatrizDeFerramentas } from '../components/toolMatrix.js';
import { montarQuiz } from '../components/quiz.js';
import { montarDestaques } from '../components/destaques.js';
import { montarLinhaDoTempo } from '../components/linhaDoTempo.js';
import { obterEstado, atualizar } from '../store.js';

// ---------------------------------------------------------------------------
// Destaques e mapa — derivados do catálogo
//
// Diferente dos outros módulos, os destaques do M3 moram aqui e não em
// src/data/modulo3.js: quase todos são CONTAGENS do próprio catálogo de
// ferramentas (quantas de risco baixo, quantas por pilar), e contar na view
// garante que o número acompanha qualquer edição no catálogo sem virar dado
// duplicado e desatualizado. Só os textos são fixos.
// ---------------------------------------------------------------------------

function contarPorRisco(risco) {
  return modulo3.ferramentas.filter((f) => f.risco === risco).length;
}

function contarPorPilar(pilar) {
  return modulo3.ferramentas.filter((f) => f.pilar === pilar).length;
}

function destaquesDaVisaoGeral() {
  const tecnico = contarPorPilar('tecnico');
  const social = contarPorPilar('social');
  return [
    {
      rotulo: 'Pilares de checagem',
      valor: '2',
      nota: 'Social (a atenção está chegando?) e técnico (o contrato resiste?). Duas checagens, não uma — e nenhuma substitui a outra.',
    },
    {
      rotulo: 'Ferramentas catalogadas',
      valor: String(tecnico + social),
      nota:
        tecnico +
        ' no pilar técnico e ' +
        social +
        ' no social. O social é o lado mais raso do catálogo — e o exemplo dele está marcado como não confirmado.',
    },
    {
      rotulo: 'O nome certo',
      valor: 'Axiom',
      nota: '"Axon" não existe. A correção está em destaque na aba porque erro de nome é exatamente o que um impostor explora.',
    },
  ];
}

function destaquesDaMatriz() {
  return [
    {
      rotulo: 'Ferramentas de risco baixo',
      valor: String(contarPorRisco('baixo')),
      nota: 'Todas só de leitura: visualizam e checam, não executam ordens nem guardam chave.',
      tom: 'ok',
    },
    {
      rotulo: 'Ferramentas de risco alto',
      valor: String(contarPorRisco('alto')),
      nota: 'O que têm em comum: executam ordens — e algumas guardam a chave por você.',
      tom: 'alerta',
    },
    {
      rotulo: 'Papéis que uma ferramenta pode ter',
      valor: String(modulo3.papeis.length),
      nota: 'Visualização, execução, checagem, monitoramento social. Uma ferramenta que faz tudo é uma ferramenta em que você precisa confiar para tudo.',
    },
  ];
}

// Os números do cenário vêm do texto de modulo3.cenarioLaunchpads, que já os
// carrega com a ressalva de que mudam de mês em mês.
const DESTAQUES_DO_CENARIO = [
  {
    rotulo: 'Receita de launchpad capturada pelo Pump.fun',
    valor: '~98%',
    nota: 'Início de agosto de 2025 — um mês depois de ter sido ultrapassado pelo LetsBonk. A liderança oscila em semanas.',
  },
  {
    rotulo: 'Tokens criados num só dia na Four.meme',
    valor: '20.000+',
    nota: 'Em 08/10/2025, na BNB Chain, com ~US$ 1,4 mi de receita em 24h contra ~US$ 885 mil do Pump.fun.',
  },
  {
    rotulo: 'O que fica quando o líder muda',
    valor: 'O conceito',
    nota: 'Launchpad + bonding curve + graduação para uma DEX. Nomes e números mudam — e estão editáveis em src/data/modulo3.js.',
  },
];

// O mapa dos dois pilares: cada ferramenta no pilar e nos papéis em que atua,
// com o risco na cor do ponto. Agrupamento, não scatter, de propósito — `pilar`
// é categórico; uma posição contínua num eixo "social ↔ técnico" seria nota
// inventada. Uma ferramenta com vários papéis aparece em vários grupos: é
// justamente o que se quer mostrar.
function criarMapaDosPilares() {
  const COR_RISCO = { baixo: 'bg-risco-baixo', medio: 'bg-risco-medio', alto: 'bg-risco-alto' };

  const coluna = (pilarId, titulo, classeBorda) => {
    const doPilar = modulo3.ferramentas.filter((f) => f.pilar === pilarId);
    const grupos = modulo3.papeis
      .map((papel) => ({ papel, itens: doPilar.filter((f) => f.papeis.includes(papel.id)) }))
      .filter((grupo) => grupo.itens.length > 0);

    return html`<div class="rounded-card border ${classeBorda} bg-fundo p-4">
      <h3 class="text-base font-semibold">${titulo}</h3>
      <p class="mt-1 text-xs text-texto-suave">
        ${doPilar.length} ferramenta${doPilar.length === 1 ? '' : 's'}
      </p>
      ${grupos.map(
        (grupo) => html`<div class="mt-4">
          <p class="text-xs font-semibold uppercase tracking-wide text-texto-suave">
            ${grupo.papel.nome}
          </p>
          <ul class="mt-2 flex flex-wrap gap-2">
            ${grupo.itens.map(
              (f) => html`<li
                class="flex items-center gap-2 rounded-full border border-borda bg-superficie px-3 py-1 text-xs text-texto"
              >
                <span class="h-2 w-2 shrink-0 rounded-full ${COR_RISCO[f.risco]}" aria-hidden="true"></span>
                ${f.nome}
                <span class="sr-only">, risco ${f.risco}</span>
              </li>`,
            )}
          </ul>
        </div>`,
      )}
    </div>`;
  };

  return criarCard([
    criarElemento('h2', { class: 'text-lg font-semibold' }, ['O mapa dos dois pilares']),
    criarElemento('p', { class: 'mt-2 text-sm text-texto-suave' }, [
      'Cada ferramenta do catálogo, no pilar e nos papéis em que atua. A cor do ponto é o ' +
        'risco: verde baixo, âmbar médio, vermelho alto. Uma ferramenta que aparece em vários ' +
        'papéis é uma ferramenta em que você precisa confiar para várias coisas.',
    ]),
    html`<div class="mt-4 grid gap-4 md:grid-cols-[3fr_2fr]">
      ${coluna('tecnico', 'Pilar técnico', 'border-primaria/50')}
      ${coluna('social', 'Pilar social', 'border-acento/50')}
    </div>`,
  ]);
}

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

  // O mapa entra antes da seção do pilar social: ela argumenta que esse pilar é
  // raso, e o mapa mostra isso antes de o texto dizer.
  return criarElemento('div', { class: 'space-y-6' }, [
    objetivos,
    montarDestaques(destaquesDaVisaoGeral()),
    correcao,
    ...secoes,
    criarMapaDosPilares(),
    pilarSocial,
  ]);
}

// ---------------------------------------------------------------------------
// Aba 2 — Matriz de ferramentas (filtrável por pilar/chain/papel)
// ---------------------------------------------------------------------------
function montarAbaMatriz() {
  return criarElemento('div', { class: 'space-y-6' }, [
    montarDestaques(destaquesDaMatriz()),
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
  const { cenarioLaunchpads } = modulo3;

  // A lista de eventos virou linha do tempo: a mesma informação, mas agora a
  // ORDEM e a distância entre os marcos ficam visíveis — que é a tese da aba
  // (a liderança muda em semanas).
  return criarElemento('div', { class: 'space-y-6' }, [
    montarDestaques(DESTAQUES_DO_CENARIO),
    criarIntroducao(cenarioLaunchpads.introducao),

    montarLinhaDoTempo({
      id: 'm3-cronologia-launchpads',
      titulo: cenarioLaunchpads.titulo,
      marcos: cenarioLaunchpads.eventos.map((evento) => ({
        data: evento.data,
        titulo: evento.texto,
        tom: 'atencao',
      })),
    }),

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
