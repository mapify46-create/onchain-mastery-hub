// views/inicio.js — tela inicial do hub: o que é, seu progresso e por onde começar.
//
// Recebe a lista de rotas por parâmetro (o router passa ROTAS ao montar). Isso evita
// um import circular entre router.js e esta view, já que o router precisa importar
// daqui para montar a rota "#/inicio".

import { criarElemento, criarTitulo, criarCard, criarBarraProgresso } from '../ui.js';
import { obterEstado, progressoDoModulo, progressoDoGlossario, progressoGeral } from '../store.js';
import { glossario } from '../data/glossario.js';
import { cenarios } from '../data/cenarios.js';
import { montarGraficoDeBarras, renderizarGrafico } from '../components/grafico.js';

// Passos de estudo sugeridos. Texto curto de propósito: a tela inicial orienta,
// o conteúdo mora nos módulos.
const COMO_ESTUDAR = [
  'Comece pelo Módulo 1 e siga na ordem até o 5 — cada um assume o anterior.',
  'Abra o Glossário sempre que aparecer um termo novo e marque como estudado o que já entendeu.',
  'Responda o mini-quiz no fim de cada módulo antes de marcar o módulo como concluído.',
  'Feche com o simulador do Módulo 4: são 12 cenários que treinam a decisão, não o palpite.',
];

// Card-link de uma rota. O card inteiro é o link: alvo grande no celular e
// uma única parada de Tab por módulo no teclado.
function criarCardDeRota(rota, estado) {
  const emBreve = !rota.disponivel;

  // Cada tipo de rota mede progresso do seu jeito; uma rota nova sem medida
  // definida simplesmente não mostra barra.
  let percentual = null;
  if (rota.tipo === 'modulo') percentual = progressoDoModulo(rota.id, estado);
  else if (rota.id === 'glossario') percentual = progressoDoGlossario(glossario.length, estado);

  const semProgresso = emBreve || percentual === null;

  let etiqueta = null;
  if (emBreve) {
    etiqueta = criarElemento(
      'span',
      { class: 'rounded-full border border-borda bg-fundo px-2.5 py-0.5 text-xs text-texto-suave' },
      ['Em breve'],
    );
  } else if (percentual !== null) {
    etiqueta = criarElemento('span', { class: 'text-xs text-texto-suave' }, [
      Math.round(percentual) + '% concluído',
    ]);
  }

  return criarElemento(
    'a',
    {
      href: rota.hash,
      class:
        'flex flex-col rounded-card border border-borda bg-superficie p-5 transition-colors ' +
        'duration-150 hover:border-primaria/60 ' +
        (emBreve ? 'opacity-70' : ''),
    },
    [
      criarElemento('div', { class: 'flex flex-wrap items-start justify-between gap-2' }, [
        criarElemento('h3', { class: 'text-base font-semibold' }, [rota.titulo]),
        etiqueta,
      ]),
      criarElemento('p', { class: 'mt-2 text-sm text-texto-suave' }, [rota.descricao]),
      !semProgresso &&
        criarElemento('div', { class: 'mt-4' }, [
          criarBarraProgresso(percentual, 'Progresso em ' + rota.titulo),
        ]),
      criarElemento('span', { class: 'mt-4 text-sm font-semibold text-acento' }, [
        emBreve ? 'Ver o que vem aqui →' : 'Abrir →',
      ]),
    ],
  );
}

export function montarInicio(rotas = []) {
  const estado = obterEstado();

  const modulos = rotas.filter((rota) => rota.tipo === 'modulo');
  const modulosDisponiveis = modulos.filter((rota) => rota.disponivel);
  const outrasRotas = rotas.filter((rota) => rota.id !== 'inicio');

  const percentualGeral = progressoGeral(
    modulosDisponiveis.map((rota) => rota.id),
    estado,
  );

  const concluidos = (estado.modulosConcluidos ?? []).filter((id) =>
    modulosDisponiveis.some((rota) => rota.id === id),
  ).length;
  const quizzesFeitos = Object.keys(estado.quizzes ?? {}).length;
  const termosEstudados = Object.keys(estado.glossario ?? {}).length;
  const cenariosFeitos = Object.keys(estado.simulador?.escolhas ?? {}).length;

  const cabecalho = criarTitulo('Bem-vindo ao seu hub de estudos on-chain', {
    nivel: 1,
    subtitulo:
      'Um curso local para aprender, do zero, como funcionam as memecoins, quais ferramentas ' +
      'existem e — principalmente — como decidir sem se enganar. Tudo roda no seu navegador, ' +
      'e o progresso fica salvo aqui mesmo.',
  });

  // Cada barra já traz o número exato no rótulo (o tooltip não funciona bem no
  // celular) — o gráfico só acrescenta a comparação visual entre as quatro.
  const graficoDeProgresso = montarGraficoDeBarras({
    barras: [
      {
        rotulo: 'Módulos ' + concluidos + '/' + modulosDisponiveis.length,
        percentual: modulosDisponiveis.length ? (concluidos / modulosDisponiveis.length) * 100 : 0,
        detalhe: concluidos + ' de ' + modulosDisponiveis.length + ' módulos concluídos',
      },
      {
        rotulo: 'Quizzes ' + quizzesFeitos + '/' + modulosDisponiveis.length,
        percentual: modulosDisponiveis.length
          ? (quizzesFeitos / modulosDisponiveis.length) * 100
          : 0,
        detalhe: quizzesFeitos + ' de ' + modulosDisponiveis.length + ' mini-quizzes respondidos',
      },
      {
        rotulo: 'Glossário ' + termosEstudados + '/' + glossario.length,
        percentual: glossario.length ? (termosEstudados / glossario.length) * 100 : 0,
        detalhe: termosEstudados + ' de ' + glossario.length + ' termos estudados',
      },
      {
        rotulo: 'Simulador ' + cenariosFeitos + '/' + cenarios.length,
        percentual: cenarios.length ? (cenariosFeitos / cenarios.length) * 100 : 0,
        detalhe: cenariosFeitos + ' de ' + cenarios.length + ' cenários respondidos',
      },
    ],
    legenda: 'Passe o mouse (ou toque) numa barra para ver o número por extenso.',
  });

  // Chamada sem await de propósito: renderizarGrafico() só toca o DOM depois do
  // primeiro "await" interno (o import do Chart.js pelo CDN). Como router.js encaixa
  // esta view em <main> de forma síncrona logo depois de montarInicio() retornar, o
  // nó já está na página quando esse await resolve. Usar requestAnimationFrame aqui
  // pareceria mais "correto", mas navegadores pausam rAF em abas fora de foco — e o
  // gráfico ficaria preso em "Carregando..." para sempre nesse caso.
  renderizarGrafico(graficoDeProgresso);

  const progresso = criarCard([
    criarElemento('div', { class: 'flex flex-wrap items-baseline justify-between gap-2' }, [
      criarElemento('h2', { class: 'text-lg font-semibold' }, ['Seu progresso']),
      criarElemento('span', { class: 'text-sm text-texto-suave' }, [
        Math.round(percentualGeral) + '% dos módulos disponíveis',
      ]),
    ]),

    criarElemento('div', { class: 'mt-3' }, [
      criarBarraProgresso(percentualGeral, 'Progresso geral do curso'),
    ]),

    criarElemento('div', { class: 'mt-5' }, [graficoDeProgresso]),
  ]);

  const comoEstudar = criarCard([
    criarElemento('h2', { class: 'text-lg font-semibold' }, ['Por onde começar']),
    criarElemento(
      'ol',
      { class: 'mt-3 list-decimal space-y-2 pl-5 text-texto-suave' },
      COMO_ESTUDAR.map((passo) => criarElemento('li', {}, [passo])),
    ),
  ]);

  const grade = criarElemento('section', { class: 'space-y-4' }, [
    criarElemento('h2', { class: 'text-lg font-semibold' }, ['Conteúdo do hub']),
    criarElemento(
      'div',
      { class: 'grid gap-4 xl:grid-cols-2' },
      outrasRotas.map((rota) => criarCardDeRota(rota, estado)),
    ),
  ]);

  const aviso = criarElemento(
    'p',
    {
      class:
        'rounded-card border border-risco-medio/40 bg-risco-medio/10 p-4 text-sm text-texto-suave',
    },
    [
      criarElemento('strong', { class: 'text-texto' }, ['Antes de tudo: ']),
      'este hub é material de estudo. Nada aqui é aconselhamento financeiro, jurídico ou ' +
        'tributário, e os números dos exercícios são de treino. Memecoin é o ativo de maior ' +
        'risco do mercado — a maioria dos tokens vai a zero.',
    ],
  );

  return criarElemento('div', { class: 'mx-auto max-w-5xl space-y-6' }, [
    cabecalho,
    aviso,
    progresso,
    comoEstudar,
    grade,
  ]);
}
