// views/modulo3.js — monta a página do Módulo 3 a partir de src/data/modulo3.js.
//
// Abas internas (padrão ARIA de tabs, vindo de ui.js):
//   Visão geral · Pilar social na prática · Pilar técnico na prática ·
//   Matriz de ferramentas · Cenário 2025–2026 · Quiz

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
import { montarAnatomia } from '../components/anatomia.js';
import { montarTabelaComparativa } from '../components/comparisonTable.js';
import { obterEstado, atualizar } from '../store.js';

// ---------------------------------------------------------------------------
// Destaques e mapa — derivados do catálogo
//
// Diferente dos outros módulos, os destaques do M3 moram aqui e não em
// src/data/modulo3.js: quase todos são CONTAGENS do próprio catálogo de
// ferramentas (quantas de risco baixo, quantas por pilar), e contar na view
// garante que o número acompanha qualquer edição no catálogo sem virar dado
// duplicado e desatualizado. Só os textos são fixos. (As abas práticas são
// exceção: os destaques delas têm fonte e ficam no arquivo de dados.)
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
      nota: 'Social (o token é quem diz ser?) e técnico (o que o contrato e as carteiras permitem?). Duas checagens, não uma — e nenhuma substitui a outra.',
    },
    {
      rotulo: 'Ferramentas catalogadas',
      valor: String(tecnico + social),
      nota:
        tecnico +
        ' no pilar técnico e ' +
        social +
        ' no social. O pilar social é quase todo manual: por isso tem tão poucas ferramentas.',
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

// Card de uma seção de texto: título, parágrafos e, se houver, uma lista com título.
function criarCardDaSecao(secao) {
  return criarCard([
    criarElemento('h2', { class: 'text-lg font-semibold' }, [secao.titulo]),
    ...secao.paragrafos.map((paragrafo) =>
      criarElemento('p', { class: 'mt-3 text-texto-suave' }, [paragrafo]),
    ),
    secao.listaTitulo &&
      criarElemento('p', { class: 'mt-4 text-sm font-semibold text-texto' }, [secao.listaTitulo]),
    secao.lista &&
      criarElemento(
        'ul',
        { class: 'mt-2 list-disc space-y-2 pl-5 text-texto-suave' },
        secao.lista.map((item) => criarElemento('li', {}, [item])),
      ),
  ]);
}

// Card-link para outra página do hub.
function criarLink(href, titulo, texto) {
  return criarElemento(
    'a',
    {
      href,
      class:
        'block rounded-card border border-primaria/50 bg-primaria/10 p-5 transition-colors ' +
        'duration-150 hover:border-primaria',
    },
    [
      criarElemento('p', { class: 'text-base font-semibold text-texto' }, [titulo + ' →']),
      criarElemento('p', { class: 'mt-1 text-sm text-texto-suave' }, [texto]),
    ],
  );
}

// Tabela com título.
function criarTabela(titulo, tabela) {
  return criarElemento('div', { class: 'space-y-4' }, [
    criarElemento('h2', { class: 'text-lg font-semibold' }, [titulo]),
    montarTabelaComparativa(tabela),
  ]);
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

  const secoes = modulo3.secoes.map(criarCardDaSecao);

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
// Aba 2 — Pilar social na prática
// ---------------------------------------------------------------------------

// A rotina de 5 minutos: lista numerada, com a janela de tempo de cada passo.
function criarRotina(rotina) {
  return criarCard(
    [
      criarElemento('h2', { class: 'text-lg font-semibold' }, [rotina.titulo]),
      criarElemento('p', { class: 'mt-2 text-sm text-texto-suave' }, [rotina.descricao]),
      criarElemento(
        'ol',
        { class: 'mt-4 space-y-3' },
        rotina.passos.map((passo, indice) =>
          criarElemento('li', { class: 'flex gap-3' }, [
            criarElemento(
              'span',
              {
                class:
                  'flex h-7 w-7 shrink-0 items-center justify-center rounded-full border ' +
                  'border-acento/50 text-sm font-semibold text-acento',
                'aria-hidden': 'true',
              },
              [String(indice + 1)],
            ),
            criarElemento('div', { class: 'min-w-0' }, [
              criarElemento('p', { class: 'text-sm font-semibold text-texto' }, [
                passo.titulo,
                criarElemento('span', { class: 'ml-2 font-mono text-xs font-normal text-texto-suave' }, [
                  passo.tempo,
                ]),
              ]),
              criarElemento('p', { class: 'mt-1 text-sm text-texto-suave' }, [passo.texto]),
            ]),
          ]),
        ),
      ),
    ],
    { class: 'border-acento/50' },
  );
}

function montarAbaSocial() {
  const pratica = modulo3.praticaSocial;
  const secao = (id) => {
    const dados = pratica.secoes.find((item) => item.id === id);
    return dados ? criarCardDaSecao(dados) : null;
  };

  return criarElemento('div', { class: 'space-y-6' }, [
    montarDestaques(pratica.destaques),
    criarIntroducao(pratica.introducao),
    criarRotina(pratica.rotina),
    secao('endereco'),
    montarAnatomia({ id: 'm3-anatomia-perfil', ...pratica.anatomiaPerfil }),
    secao('x'),
    secao('discord'),
    secao('telegram'),
    secao('calls'),
    criarTabela('Cada sinal social: o que prova e o que não prova', pratica.tabela),
    criarLink(
      '#/checklist',
      'Checklist antes de comprar',
      'O pilar social vira itens marcáveis, na ordem da rotina, junto com o técnico.',
    ),
  ]);
}

// ---------------------------------------------------------------------------
// Aba 3 — Pilar técnico na prática (uma ferramenta por vez, na ordem de uso)
// ---------------------------------------------------------------------------
function criarSecaoDaFerramenta(ferramenta, indice) {
  const cabecalho = criarCard([
    criarElemento('div', { class: 'flex flex-wrap items-baseline justify-between gap-2' }, [
      criarElemento('h2', { class: 'text-lg font-semibold' }, [
        indice + 1 + '. ' + ferramenta.nome,
      ]),
      criarElemento('span', { class: 'font-mono text-sm text-texto-suave' }, [ferramenta.endereco]),
    ]),
    criarElemento('p', { class: 'mt-2 text-base text-acento' }, [ferramenta.pergunta]),
    criarElemento('p', { class: 'mt-3 text-sm text-texto-suave' }, [
      criarElemento('strong', { class: 'text-texto' }, ['O que é grátis: ']),
      ferramenta.gratis,
    ]),
  ]);

  const passoAPasso = criarCard([
    criarElemento('h3', { class: 'text-base font-semibold' }, ['Passo a passo']),
    criarElemento(
      'ol',
      { class: 'mt-3 list-decimal space-y-2 pl-5 text-sm text-texto-suave' },
      ferramenta.passos.map((passo) => criarElemento('li', {}, [passo])),
    ),
    criarElemento(
      'div',
      { class: 'mt-4 rounded-lg border border-risco-medio/40 bg-risco-medio/10 p-3 text-sm' },
      [
        criarElemento('strong', { class: 'block text-texto' }, ['Armadilhas de leitura']),
        criarElemento(
          'ul',
          { class: 'mt-2 list-disc space-y-1 pl-5 text-texto-suave' },
          ferramenta.armadilhas.map((armadilha) => criarElemento('li', {}, [armadilha])),
        ),
      ],
    ),
  ]);

  return criarElemento('section', { class: 'space-y-4', 'aria-label': ferramenta.nome }, [
    cabecalho,
    montarAnatomia({ id: 'm3-anatomia-' + ferramenta.id, ...ferramenta.anatomia }),
    passoAPasso,
  ]);
}

function montarAbaTecnico() {
  const pratica = modulo3.praticaTecnica;

  return criarElemento('div', { class: 'space-y-8' }, [
    montarDestaques(pratica.destaques),
    criarIntroducao(pratica.introducao),
    ...pratica.ferramentas.map(criarSecaoDaFerramenta),
    criarTabela('O que eu quero checar → onde eu checo', pratica.tabelaOnde),
    criarElemento('div', { class: 'grid gap-4 md:grid-cols-2' }, [
      criarLink(
        '#/modulo-6',
        'Módulo 6 — Ler a tela',
        'O que cada número significa, como o volume é fabricado e as extensões de contrato em detalhe.',
      ),
      criarLink(
        '#/checklist',
        'Checklist antes de comprar',
        'Os itens técnicos em ordem, com a força da evidência de cada um.',
      ),
    ]),
  ]);
}

// ---------------------------------------------------------------------------
// Aba 4 — Matriz de ferramentas (filtrável por pilar/chain/papel)
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
// Aba 5 — Cenário de launchpads 2025–2026
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
// Aba 6 — Quiz + botão de concluir o módulo + fontes das abas práticas
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

function montarFontesDaPratica() {
  return criarElemento(
    'details',
    { class: 'group rounded-card border border-borda bg-superficie p-5' },
    [
      criarElemento(
        'summary',
        { class: 'flex cursor-pointer list-none items-center justify-between text-sm font-medium' },
        [
          criarElemento('span', {}, ['Fontes das abas práticas e itens não verificados']),
          criarElemento(
            'span',
            {
              class: 'text-texto-suave transition-transform duration-150 group-open:rotate-180',
              'aria-hidden': 'true',
            },
            ['▾'],
          ),
        ],
      ),
      criarElemento('h3', { class: 'mt-4 text-sm font-semibold' }, ['Não verificado']),
      criarElemento(
        'ul',
        { class: 'mt-2 space-y-3' },
        modulo3.naoVerificadoPratica.map((item) =>
          criarElemento(
            'li',
            {
              class:
                'rounded-lg border border-risco-medio/40 bg-risco-medio/10 p-3 text-sm text-texto-suave',
            },
            [criarElemento('strong', { class: 'text-texto' }, [item.titulo + ': ']), item.texto],
          ),
        ),
      ),
      criarElemento('h3', { class: 'mt-4 text-sm font-semibold' }, ['Fontes consultadas']),
      criarElemento(
        'ul',
        { class: 'mt-2 space-y-1 text-sm text-texto-suave' },
        modulo3.fontesPratica.map((fonte) =>
          criarElemento('li', {}, [
            fonte.titulo + ' — ' + fonte.url + ' (consulta em ' + fonte.consultadoEm + ')',
          ]),
        ),
      ),
    ],
  );
}

function montarAbaQuiz() {
  return criarElemento('div', { class: 'space-y-6' }, [
    montarQuiz({
      id: modulo3.id,
      titulo: 'Mini-quiz do Módulo 3',
      descricao: modulo3.quiz.length + ' perguntas. As respostas ficam salvas no navegador.',
      perguntas: modulo3.quiz,
    }),
    montarConclusao(),
    montarFontesDaPratica(),
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
        'citar uma ferramenta não é recomendação de uso. Telas e regras de plataforma foram ' +
          'conferidas em setembro de 2026 — se um campo sumir, procure o mesmo conceito.',
      ],
    ),
  ]);

  const abas = criarAbas({
    id: 'modulo-3',
    rotulo: 'Seções do Módulo 3',
    abas: [
      { id: 'visao-geral', rotulo: 'Visão geral', montar: montarVisaoGeral },
      { id: 'social', rotulo: 'Pilar social na prática', montar: montarAbaSocial },
      { id: 'tecnico', rotulo: 'Pilar técnico na prática', montar: montarAbaTecnico },
      { id: 'matriz', rotulo: 'Matriz de ferramentas', montar: montarAbaMatriz },
      { id: 'cenario', rotulo: 'Cenário 2025–2026', montar: montarAbaCenario },
      { id: 'quiz', rotulo: 'Quiz', montar: montarAbaQuiz },
    ],
  });

  return criarElemento('div', { class: 'mx-auto max-w-5xl' }, [cabecalho, abas]);
}
