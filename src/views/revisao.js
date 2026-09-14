// views/revisao.js — a página "Revisão": as perguntas dos quizzes voltam em 1, 3, 7,
// 16 e 35 dias, uma de cada vez, com a sua confiança registrada antes da resposta.
//
// A lógica da fila mora em components/revisao.js. Aqui é só a tela: o que venceu
// hoje, a sessão pergunta a pergunta, o placar de "quando tenho certeza, acerto?"
// e a lista do que vem depois.

import { modulo1 } from '../data/modulo1.js';
import { modulo2 } from '../data/modulo2.js';
import { modulo3 } from '../data/modulo3.js';
import { modulo4 } from '../data/modulo4.js';
import { modulo5 } from '../data/modulo5.js';
import { modulo6 } from '../data/modulo6.js';
import { modulo7 } from '../data/modulo7.js';
import { glossario } from '../data/glossario.js';
import { criarElemento, criarTitulo, criarCard, criarBotao } from '../ui.js';
import { juntarPorques } from '../components/quiz.js';
import {
  ESCADA_DIAS,
  semear,
  itensVencidos,
  proximosItens,
  registrarRevisao,
  resumoDeCalibracao,
} from '../components/revisao.js';
import { obterEstado } from '../store.js';

// Todas as perguntas de todos os módulos, já com o "por que a errada não serve".
const MODULOS = [modulo1, modulo2, modulo3, modulo4, modulo5, modulo6, modulo7];
const CATALOGO = Object.fromEntries(
  MODULOS.map((modulo) => [modulo.id, juntarPorques(modulo.quiz ?? [], modulo.porqueErradas ?? {})]),
);

const ROTULOS_DE_CONFIANCA = { 1: 'Chutei', 2: 'Mais ou menos', 3: 'Tenho certeza' };

function rotuloDoModulo(id) {
  return id === 'glossario' ? 'Glossário' : id.replace('modulo-', 'Módulo ');
}

function sortear(lista) {
  const copia = [...lista];
  for (let i = copia.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

// Perguntas do glossário, montadas na hora a partir da definição e do exemplo de
// cada termo: duas versões por termo, para a revisão não virar decoreba de uma
// frase só, e três alternativas — a certa e dois termos da mesma categoria. O
// cache mantém a mesma pergunta durante a visita.
const perguntasDoGlossario = new Map();
function perguntaDoGlossario(perguntaId) {
  if (perguntasDoGlossario.has(perguntaId)) return perguntasDoGlossario.get(perguntaId);

  const [termoId, variante] = perguntaId.split('~');
  const termo = glossario.find((item) => item.id === termoId);
  if (!termo) return null;

  const mesmaCategoria = glossario.filter(
    (item) => item.id !== termo.id && item.categorias.some((categoria) => termo.categorias.includes(categoria)),
  );
  const candidatos = mesmaCategoria.length >= 2 ? mesmaCategoria : glossario.filter((item) => item.id !== termo.id);
  const errados = sortear(candidatos).slice(0, 2);

  const pergunta = {
    id: perguntaId,
    pergunta:
      variante === 'ex'
        ? 'Qual termo descreve esta situação? "' + termo.exemplo + '"'
        : 'Qual termo é este? "' + termo.definicao + '"',
    alternativas: sortear([termo, ...errados]).map((item) => ({
      id: item.id,
      texto: item.termo,
      porque: item.id === termo.id ? undefined : 'Isso é ' + item.termo + ': ' + item.definicao,
    })),
    correta: termo.id,
    explicacao: termo.termo + ': ' + termo.definicao + ' Alerta: ' + termo.alerta,
  };
  perguntasDoGlossario.set(perguntaId, pergunta);
  return pergunta;
}

function perguntaDoItem(item) {
  if (item.moduloId === 'glossario') return perguntaDoGlossario(item.perguntaId);
  return CATALOGO[item.moduloId]?.find((pergunta) => pergunta.id === item.perguntaId) ?? null;
}

function dataCurta(timestamp) {
  return new Date(timestamp).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
}

// Quizzes corrigidos antes de a Revisão existir: as perguntas entram já vencidas.
function semearQuizzesAntigos() {
  const estado = obterEstado();
  const entradas = Object.keys(estado.quizzes ?? {})
    .filter((id) => CATALOGO[id])
    .map((id) => ({ moduloId: id, perguntas: CATALOGO[id] }));
  if (entradas.length) semear(entradas, { primeiraEmDias: 0 });

  // Termos marcados como estudados antes de a Revisão existir.
  const termos = Object.keys(estado.glossario ?? {}).filter((id) => glossario.some((termo) => termo.id === id));
  if (termos.length) {
    semear(
      [{ moduloId: 'glossario', perguntas: termos.flatMap((id) => [{ id: id + '~def' }, { id: id + '~ex' }]) }],
      { primeiraEmDias: 0 },
    );
  }
}

// Alternativa de resposta ou de confiança, no mesmo desenho do quiz.
function criarOpcao({ nome, valor, texto, aoEscolher, classe = '' }) {
  return criarElemento(
    'label',
    {
      class:
        'flex cursor-pointer items-start gap-3 rounded-lg border border-borda bg-fundo p-3 ' +
        'text-sm transition-colors duration-150 hover:border-texto-suave ' +
        classe,
    },
    [
      criarElemento('input', {
        type: 'radio',
        name: nome,
        value: valor,
        class: 'mt-0.5 h-4 w-4 shrink-0 accent-primaria',
        onchange: aoEscolher,
      }),
      criarElemento('span', {}, [texto]),
    ],
  );
}

export function montarViewRevisao() {
  semearQuizzesAntigos();

  const areaDeHoje = criarElemento('div');
  const areaDeCalibracao = criarElemento('div');
  const areaDeProximas = criarElemento('div');

  function renderizar() {
    areaDeHoje.replaceChildren(montarHoje());
    areaDeCalibracao.replaceChildren(montarCalibracao() ?? '');
    areaDeProximas.replaceChildren(montarProximas() ?? '');
  }

  // -------------------------------------------------------------------------
  // Hoje: o que venceu, e o botão de começar
  // -------------------------------------------------------------------------
  function montarHoje() {
    const fila = itensVencidos().filter((item) => perguntaDoItem(item));
    const totalNaFila = Object.keys(obterEstado().revisao?.itens ?? {}).length;

    if (fila.length === 0) {
      return criarCard([
        criarElemento('h2', { class: 'text-lg font-semibold' }, ['Nada vencido hoje']),
        criarElemento('p', { class: 'mt-2 text-sm text-texto-suave' }, [
          totalNaFila === 0
            ? 'Responda o quiz de um módulo. As perguntas dele entram aqui e a primeira volta amanhã.'
            : 'As perguntas voltam conforme você acerta: 1, 3, 7, 16 e 35 dias. Errou, volta amanhã.',
        ]),
      ]);
    }

    return criarCard(
      [
        criarElemento('h2', { class: 'text-lg font-semibold' }, [
          fila.length === 1 ? '1 pergunta para hoje' : fila.length + ' perguntas para hoje',
        ]),
        criarElemento('p', { class: 'mt-2 text-sm text-texto-suave' }, [
          'Misturadas entre os módulos, de propósito. Antes de responder, diga quão certo você ' +
            'está: é isso que mostra depois onde a sua certeza engana.',
        ]),
        criarElemento('div', { class: 'mt-4' }, [
          criarBotao('Começar', { onclick: () => montarSessao(fila) }),
        ]),
      ],
      { class: 'border-acento/50' },
    );
  }

  // -------------------------------------------------------------------------
  // A sessão: uma pergunta por vez
  // -------------------------------------------------------------------------
  function montarSessao(fila) {
    let indice = 0;
    let acertos = 0;
    let errosComCerteza = 0;

    function mostrarPergunta() {
      const item = fila[indice];
      const pergunta = perguntaDoItem(item);
      let resposta = null;
      let confianca = null;

      const botao = criarBotao('Responder', { disabled: true, onclick: responder });
      function habilitar() {
        botao.disabled = !(resposta && confianca);
      }

      const alternativas = pergunta.alternativas.map((alternativa) =>
        criarOpcao({
          nome: 'revisao-' + item.chave,
          valor: alternativa.id,
          texto: alternativa.texto,
          aoEscolher: () => {
            resposta = alternativa.id;
            habilitar();
          },
        }),
      );

      const confiancas = [1, 2, 3].map((nivel) =>
        criarOpcao({
          nome: 'revisao-confianca-' + item.chave,
          valor: String(nivel),
          texto: ROTULOS_DE_CONFIANCA[nivel],
          classe: 'py-2',
          aoEscolher: () => {
            confianca = nivel;
            habilitar();
          },
        }),
      );

      function responder() {
        const acertou = resposta === pergunta.correta;
        if (acertou) acertos += 1;
        if (!acertou && confianca === 3) errosComCerteza += 1;
        registrarRevisao(item.chave, acertou, confianca);
        mostrarResultado(item, pergunta, resposta, confianca, acertou);
      }

      areaDeHoje.replaceChildren(
        criarElemento('fieldset', { class: 'rounded-card border border-acento/50 bg-superficie p-5' }, [
          criarElemento('legend', { class: 'px-1 text-xs font-semibold uppercase tracking-wide text-acento' }, [
            rotuloDoModulo(item.moduloId) + ' · ' + (indice + 1) + ' de ' + fila.length,
          ]),
          criarElemento('p', { class: 'text-base font-semibold text-texto' }, [pergunta.pergunta]),
          criarElemento('div', { class: 'mt-3 space-y-2' }, alternativas),
          criarElemento('p', { class: 'mt-4 text-sm font-semibold text-texto' }, ['Quão certo você está?']),
          criarElemento('div', { class: 'mt-2 grid gap-2 sm:grid-cols-3' }, confiancas),
          criarElemento('div', { class: 'mt-4' }, [botao]),
        ]),
      );
      areaDeHoje.querySelector('legend')?.scrollIntoView({ block: 'start', behavior: 'auto' });
    }

    function mostrarResultado(item, pergunta, resposta, confianca, acertou) {
      const escolhida = pergunta.alternativas.find((alternativa) => alternativa.id === resposta);
      const certa = pergunta.alternativas.find((alternativa) => alternativa.id === pergunta.correta);
      const ultima = indice === fila.length - 1;

      areaDeHoje.replaceChildren(
        criarCard(
          [
            criarElemento('p', { class: 'text-xs font-semibold uppercase tracking-wide text-texto-suave' }, [
              rotuloDoModulo(item.moduloId) + ' · ' + (indice + 1) + ' de ' + fila.length,
            ]),
            criarElemento('p', { class: 'mt-1 text-base font-semibold text-texto' }, [pergunta.pergunta]),
            criarElemento(
              'p',
              {
                class:
                  'mt-4 rounded-lg border p-3 text-sm ' +
                  (acertou
                    ? 'border-risco-baixo/40 bg-risco-baixo/10'
                    : 'border-risco-medio/40 bg-risco-medio/10'),
              },
              [
                criarElemento('strong', {}, [acertou ? 'Você acertou. ' : 'Não foi essa. ']),
                pergunta.explicacao,
              ],
            ),
            !acertou &&
              criarElemento('p', { class: 'mt-2 text-sm text-texto-suave' }, [
                criarElemento('strong', { class: 'text-texto' }, ['A certa: ']),
                certa?.texto ?? '',
              ]),
            !acertou &&
              escolhida?.porque &&
              criarElemento('p', { class: 'mt-2 rounded-lg border border-borda bg-fundo p-3 text-sm text-texto-suave' }, [
                criarElemento('strong', { class: 'text-texto' }, ['Por que a sua não serve: ']),
                escolhida.porque,
              ]),
            criarElemento('p', { class: 'mt-3 text-xs text-texto-suave' }, [
              'Você disse: ' + ROTULOS_DE_CONFIANCA[confianca].toLowerCase() + '. ',
              !acertou && confianca === 3
                ? criarElemento('strong', { class: 'text-risco-medio' }, [
                    'Certeza e erro: é a explicação que mais vale reler. ',
                  ])
                : null,
              acertou
                ? 'Volta em ' + ESCADA_DIAS[Math.min(item.degrau + 1, ESCADA_DIAS.length - 1)] + ' dias.'
                : 'Volta amanhã.',
            ]),
            criarElemento('div', { class: 'mt-4' }, [
              criarBotao(ultima ? 'Ver o resumo' : 'Próxima', {
                onclick: () => {
                  indice += 1;
                  if (indice < fila.length) mostrarPergunta();
                  else mostrarResumo();
                },
              }),
            ]),
          ],
          { class: 'border-acento/50' },
        ),
      );
      areaDeHoje.querySelector('p')?.scrollIntoView({ block: 'start', behavior: 'auto' });
    }

    function mostrarResumo() {
      areaDeHoje.replaceChildren(
        criarCard(
          [
            criarElemento('h2', { class: 'text-lg font-semibold' }, [
              'Você acertou ' + acertos + ' de ' + fila.length + '.',
            ]),
            errosComCerteza > 0 &&
              criarElemento('p', { class: 'mt-2 text-sm font-semibold text-risco-medio' }, [
                errosComCerteza === 1
                  ? '1 erro feito com certeza. Ele volta amanhã: releia a explicação antes.'
                  : errosComCerteza + ' erros feitos com certeza. Eles voltam amanhã: releia as explicações antes.',
              ]),
            criarElemento('p', { class: 'mt-2 text-sm text-texto-suave' }, [
              'O que acertou volta mais tarde; o que errou volta amanhã. O placar abaixo mostra se a ' +
                'sua certeza combina com o seu acerto.',
            ]),
            criarElemento('div', { class: 'mt-4' }, [
              criarBotao('Concluir', { variante: 'secundario', onclick: renderizar }),
            ]),
          ],
          { class: 'border-acento/50' },
        ),
      );
      areaDeCalibracao.replaceChildren(montarCalibracao() ?? '');
      areaDeProximas.replaceChildren(montarProximas() ?? '');
    }

    mostrarPergunta();
  }

  // -------------------------------------------------------------------------
  // Quando você tem certeza, acerta?
  // -------------------------------------------------------------------------
  function montarCalibracao() {
    const resumo = resumoDeCalibracao();
    if (resumo.total === 0) return null;

    const linhas = [3, 2, 1].map((nivel) => {
      const faixa = resumo.porConfianca[nivel];
      const percentual = faixa.n ? Math.round((faixa.acertos / faixa.n) * 100) : null;
      return criarElemento('li', { class: 'flex items-baseline justify-between gap-3 text-sm' }, [
        criarElemento('span', { class: 'text-texto-suave' }, ['"' + ROTULOS_DE_CONFIANCA[nivel] + '"']),
        criarElemento('span', { class: 'omh-numero text-texto' }, [
          faixa.n === 0
            ? 'ainda sem resposta'
            : faixa.acertos + ' de ' + faixa.n + ' certas (' + percentual + '%)',
        ]),
      ]);
    });

    return criarCard([
      criarElemento('h2', { class: 'text-lg font-semibold' }, ['Quando você tem certeza, acerta?']),
      criarElemento('p', { class: 'mt-2 text-sm text-texto-suave' }, [
        'Conta a última resposta de cada pergunta. Com poucas respostas isso oscila muito; ' +
          'de 50 para cima começa a dizer algo. O que importa é a linha "tenho certeza": se ' +
          'ela ficar longe de 100%, a sua certeza está enganando você.',
      ]),
      criarElemento('ul', { class: 'mt-4 space-y-2' }, linhas),
      resumo.pontosCegos.length > 0 &&
        criarElemento('div', { class: 'mt-4 rounded-lg border border-risco-medio/40 bg-risco-medio/10 p-3' }, [
          criarElemento('p', { class: 'text-sm font-semibold text-texto' }, [
            'Pontos cegos: erros feitos com certeza',
          ]),
          criarElemento(
            'ul',
            { class: 'mt-2 list-disc space-y-1 pl-5 text-sm text-texto-suave' },
            resumo.pontosCegos.slice(0, 6).map((item) =>
              criarElemento('li', {}, [
                rotuloDoModulo(item.moduloId) + ': ' + (perguntaDoItem(item)?.pergunta ?? item.perguntaId),
              ]),
            ),
          ),
        ]),
    ]);
  }

  // -------------------------------------------------------------------------
  // O que vem depois
  // -------------------------------------------------------------------------
  function montarProximas() {
    const proximas = proximosItens();
    if (proximas.length === 0) return null;

    return criarCard([
      criarElemento('h2', { class: 'text-lg font-semibold' }, ['Próximas revisões']),
      criarElemento('p', { class: 'mt-2 text-sm text-texto-suave' }, [
        proximas.length + (proximas.length === 1 ? ' pergunta agendada.' : ' perguntas agendadas.'),
      ]),
      criarElemento(
        'ul',
        { class: 'mt-3 space-y-1 text-sm text-texto-suave' },
        proximas.slice(0, 8).map((item) =>
          criarElemento('li', { class: 'flex gap-3' }, [
            criarElemento('span', { class: 'omh-numero shrink-0 text-texto' }, [dataCurta(item.proximaTS)]),
            criarElemento('span', {}, [
              rotuloDoModulo(item.moduloId) + ' · ' + (perguntaDoItem(item)?.pergunta ?? item.perguntaId),
            ]),
          ]),
        ),
      ),
    ]);
  }

  // -------------------------------------------------------------------------
  // Montagem
  // -------------------------------------------------------------------------
  const cabecalho = criarTitulo('Revisão espaçada', {
    subtitulo:
      'As perguntas dos quizzes que você já fez, e os termos do glossário marcados como estudados, voltam em ' +
      ESCADA_DIAS.join(', ') +
      ' dias, conforme você acerta. Errou, volta amanhã. Responder de novo, dias depois, é o ' +
      'que faz o conteúdo ficar — reler não faz.',
  });

  const comoFunciona = criarElemento(
    'p',
    {
      class:
        'rounded-card border border-risco-medio/40 bg-risco-medio/10 p-3 text-sm text-texto-suave',
    },
    [
      criarElemento('strong', { class: 'text-texto' }, ['De onde vem: ']),
      'espaçar as revisões tem uma das evidências mais fortes da ciência da aprendizagem ' +
        '(meta-análises de Cepeda et al., 2006, e Latimier et al., 2021). A escada de dias é ' +
        'derivada da teoria, não testada nessa forma exata. Os algoritmos dos apps de cartões ' +
        'só preveem melhor a memória; nenhum experimento mostrou que ensinem mais que uma ' +
        'escada fixa.',
    ],
  );

  renderizar();

  return criarElemento('div', { class: 'mx-auto max-w-5xl space-y-6' }, [
    cabecalho,
    comoFunciona,
    areaDeHoje,
    areaDeCalibracao,
    areaDeProximas,
  ]);
}
