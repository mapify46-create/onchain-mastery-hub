// views/inicio.js — tela inicial do hub: o que é, seu progresso e por onde começar.
//
// Recebe a lista de rotas por parâmetro (o router passa ROTAS ao montar). Isso evita
// um import circular entre router.js e esta view, já que o router precisa importar
// daqui para montar a rota "#/inicio".

import {
  criarElemento,
  criarTitulo,
  criarCard,
  criarBarraProgresso,
  criarBotao,
  mostrarToast,
} from '../ui.js';
import {
  obterEstado,
  atualizar,
  exportarEstado,
  importarEstado,
  progressoDoModulo,
  progressoDoGlossario,
  progressoGeral,
} from '../store.js';
import { glossario } from '../data/glossario.js';
import { cenarios } from '../data/cenarios.js';
import { montarGraficoDeBarras, renderizarGrafico } from '../components/grafico.js';
import { itensVencidos } from '../components/revisao.js';

// Passos de estudo sugeridos. Texto curto de propósito: a tela inicial orienta,
// o conteúdo mora nos módulos.
const COMO_ESTUDAR = [
  'Comece pelo Módulo 1 e siga na ordem até o 7 — cada um assume o anterior.',
  'Abra o Glossário sempre que aparecer um termo novo e marque como estudado o que já entendeu.',
  'Responda o mini-quiz no fim de cada módulo antes de marcar o módulo como concluído.',
  'Volte à página Revisão quando ela avisar: as perguntas retornam em 1, 3, 7, 16 e 35 dias.',
  'Treine a decisão nos 12 cenários do simulador do Módulo 4.',
  'Antes de qualquer compra, passe o token pela página Checklist antes de comprar.',
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

  // Revisão espaçada: o que venceu hoje. As perguntas entram na fila quando o quiz
  // é corrigido — ou na primeira visita à página Revisão, para quizzes antigos.
  const vencidos = itensVencidos().length;
  const naFila = Object.keys(estado.revisao?.itens ?? {}).length;
  let textoDaRevisao;
  if (vencidos > 0) {
    textoDaRevisao =
      (vencidos === 1 ? '1 pergunta venceu' : vencidos + ' perguntas venceram') +
      '. Responder de novo, dias depois, é o que faz o conteúdo ficar.';
  } else if (naFila > 0) {
    textoDaRevisao = 'Nada vencido hoje. As perguntas voltam em 1, 3, 7, 16 e 35 dias, conforme você acerta.';
  } else if (quizzesFeitos > 0) {
    textoDaRevisao = 'Abra a Revisão uma vez: as perguntas dos quizzes que você já fez entram na fila.';
  } else {
    textoDaRevisao = 'Responda o quiz de um módulo e as perguntas dele voltam aqui no dia seguinte.';
  }
  const revisao = criarCard(
    [
      criarElemento('h2', { class: 'text-lg font-semibold' }, ['Revisão de hoje']),
      criarElemento('p', { class: 'mt-2 text-sm text-texto-suave' }, [textoDaRevisao]),
      criarElemento(
        'a',
        { href: '#/revisao', class: 'mt-4 inline-block text-sm font-semibold text-acento' },
        [vencidos > 0 ? 'Revisar agora →' : 'Abrir a Revisão →'],
      ),
    ],
    { class: vencidos > 0 ? 'border-acento/50' : '' },
  );

  // A próxima ação: um botão só, em vez de ter de decidir por onde continuar. Meta
  // concreta e única rende mais que meta vaga (Locke & Latham, 2002).
  function calcularProximaAcao() {
    if (vencidos > 0) {
      return {
        texto: 'Revisar ' + (vencidos === 1 ? '1 pergunta' : vencidos + ' perguntas'),
        detalhe: 'A revisão de hoje vem antes de conteúdo novo.',
        href: '#/revisao',
      };
    }
    for (const rota of modulosDisponiveis) {
      const quiz = estado.quizzes?.[rota.id];
      const concluido = (estado.modulosConcluidos ?? []).includes(rota.id);
      if (!quiz) {
        return {
          texto: 'Continuar: ' + rota.titulo,
          detalhe: 'Falta estudar as abas e responder o quiz.',
          href: rota.hash,
        };
      }
      if (quiz.total && quiz.acertos / quiz.total < 0.8) {
        return {
          texto: 'Refazer o quiz do ' + rota.curto,
          detalhe:
            'Você acertou ' + quiz.acertos + ' de ' + quiz.total + '. Releia as explicações das que errou e refaça.',
          href: rota.hash,
        };
      }
      if (!concluido) {
        return {
          texto: 'Concluir: ' + rota.titulo,
          detalhe: 'Quiz feito. Falta marcar o módulo como concluído, no fim da aba Quiz.',
          href: rota.hash,
        };
      }
    }
    return {
      texto: 'Refazer o simulador do Módulo 4',
      detalhe: 'Todos os módulos concluídos. Refaça os cenários sem olhar os feedbacks antes.',
      href: '#/modulo-4',
    };
  }
  const acao = calcularProximaAcao();
  const proximaAcao = criarElemento(
    'a',
    {
      href: acao.href,
      class:
        'block rounded-card border border-primaria/60 bg-primaria/15 p-5 transition-colors ' +
        'duration-150 hover:border-primaria',
    },
    [
      criarElemento('p', { class: 'text-xs font-semibold uppercase tracking-wide text-texto-suave' }, [
        'Próxima ação',
      ]),
      criarElemento('p', { class: 'mt-1 text-lg font-semibold text-texto' }, [acao.texto + ' →']),
      criarElemento('p', { class: 'mt-1 text-sm text-texto-suave' }, [acao.detalhe]),
    ],
  );

  // Plano "quando X, eu faço Y": escrito por você, salvo no navegador. Planos assim
  // aumentam a chance de cumprir uma meta (meta-análise de Gollwitzer & Sheeran,
  // 2006, d = 0,65). O único teste grande em curso online achou que o plano não
  // funcionou quando o obstáculo era "falta de tempo" (Kizilcec & Cohen, 2017).
  const campoDoPlano = criarElemento('textarea', {
    class: 'mt-3 w-full rounded-lg border border-borda bg-fundo p-3 text-sm text-texto',
    rows: '3',
    'aria-label': 'Seu plano de estudo',
    placeholder:
      'Quando [terminar o café], eu [abro a Revisão e leio uma aba]. Se [chegar um call no ' +
      'Telegram], então [passo o token pelo Checklist antes de qualquer coisa].',
  });
  campoDoPlano.value = estado.plano ?? '';
  const plano = criarCard([
    criarElemento('h2', { class: 'text-lg font-semibold' }, ['Seu plano: quando, e o quê']),
    criarElemento('p', { class: 'mt-2 text-sm text-texto-suave' }, [
      'Escreva "quando X, eu faço Y" e "se surgir o obstáculo Z, então W". Escolha um obstáculo ' +
        'concreto e superável: "falta de tempo" foi o caso em que esse tipo de plano não funcionou.',
    ]),
    campoDoPlano,
    criarElemento('div', { class: 'mt-3' }, [
      criarBotao('Salvar o plano', {
        variante: 'secundario',
        onclick: () => {
          const salvou = atualizar((atual) => ({ ...atual, plano: campoDoPlano.value.slice(0, 2000) }));
          mostrarToast(salvou ? 'Plano salvo' : 'Não consegui salvar o plano');
        },
      }),
    ]),
  ]);

  // Exportar e importar: sem servidor nem conta, é o único jeito de o progresso
  // sobreviver a uma limpeza do navegador ou ir para outro computador.
  function exportar() {
    const blob = new Blob([exportarEstado()], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = criarElemento('a', {
      href: url,
      download: 'omh-progresso-' + new Date().toISOString().slice(0, 10) + '.json',
    });
    document.body.append(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }
  const entradaDeArquivo = criarElemento('input', {
    type: 'file',
    accept: 'application/json,.json',
    class: 'sr-only',
    'aria-label': 'Escolher o arquivo de progresso',
    onchange: (evento) => {
      const arquivo = evento.target.files?.[0];
      if (!arquivo) return;
      arquivo.text().then((texto) => {
        if (importarEstado(texto)) {
          mostrarToast('Progresso importado');
          location.reload();
        } else {
          mostrarToast('Esse arquivo não é um progresso válido');
        }
      });
    },
  });
  const guardar = criarCard([
    criarElemento('h2', { class: 'text-lg font-semibold' }, ['Guardar o progresso']),
    criarElemento('p', { class: 'mt-2 text-sm text-texto-suave' }, [
      'Tudo fica só neste navegador: limpar os dados dele apaga o progresso. Exporte um ' +
        'arquivo de vez em quando; ele importa em outro navegador ou computador.',
    ]),
    criarElemento('div', { class: 'mt-3 flex flex-wrap gap-3' }, [
      criarBotao('Exportar', { variante: 'secundario', onclick: exportar }),
      criarBotao('Importar', { variante: 'secundario', onclick: () => entradaDeArquivo.click() }),
      entradaDeArquivo,
    ]),
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
      'este hub é material de estudo próprio, e os números dos exercícios são de treino. ' +
        'Memecoin é o ativo de maior risco do mercado: 68,67% dos tokens do Pump.fun pararam ' +
        'de negociar no mesmo dia em que nasceram (CoinGecko Research).',
    ],
  );

  return criarElemento('div', { class: 'mx-auto max-w-5xl space-y-6' }, [
    cabecalho,
    proximaAcao,
    aviso,
    progresso,
    revisao,
    plano,
    comoEstudar,
    grade,
    guardar,
  ]);
}
