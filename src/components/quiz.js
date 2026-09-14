// quiz.js — mini-quiz reutilizável por módulo.
//
// Fluxo: o usuário marca uma alternativa por pergunta, clica em "Ver resultado" e recebe
// a correção com explicação em cada pergunta. O resultado fica salvo no store (localStorage),
// então o F5 não apaga nada — ao voltar, o quiz reabre já corrigido.
//
// Se a alternativa escolhida estiver errada e tiver o campo `porque`, a correção
// também diz por que ela não serve. Feedback que explica rende mais que só
// "certo/errado" (Wisniewski, Zierer & Hattie, 2020).
//
// Uso:
//   montarQuiz({ id: 'modulo-2', perguntas: modulo2.quiz })
//   montarQuiz({ id: 'modulo-6', perguntas: juntarPorques(modulo6.quiz, modulo6.porqueErradas) })

// Junta às perguntas as explicações "por que esta alternativa está errada",
// guardadas à parte no arquivo de dados no formato { q1: { a: '...', b: '...' } }.
export function juntarPorques(perguntas = [], mapa = {}) {
  return perguntas.map((pergunta) => ({
    ...pergunta,
    alternativas: pergunta.alternativas.map((alternativa) => ({
      ...alternativa,
      porque: alternativa.porque ?? mapa?.[pergunta.id]?.[alternativa.id],
    })),
  }));
}

import { criarElemento, criarBarraProgresso, criarBotao, mostrarToast } from '../ui.js';
import { obterEstado, atualizar } from '../store.js';
import { semearDoQuiz } from './revisao.js';

// "Quão certo você está?" — registrar a confiança antes de ver a resposta deixa
// ver depois os erros feitos com certeza, que são os que mais se corrigem quando
// explicados (hipercorreção: Butterfield & Metcalfe, 2001).
const ROTULOS_DE_CONFIANCA = { 1: 'Chutei', 2: 'Mais ou menos', 3: 'Tenho certeza' };

// Lê o resultado salvo deste quiz, se existir.
function lerSalvo(id) {
  const quizzes = obterEstado().quizzes ?? {};
  return quizzes[id] ?? null;
}

// Grava (ou apaga, passando null) o resultado deste quiz.
function gravar(id, resultado) {
  return atualizar((estado) => {
    const quizzes = { ...(estado.quizzes ?? {}) };
    if (resultado === null) delete quizzes[id];
    else quizzes[id] = resultado;
    return { ...estado, quizzes };
  });
}

export function montarQuiz({ id, titulo = 'Mini-quiz', descricao = '', perguntas = [] }) {
  const container = criarElemento('section', { class: 'space-y-5' });

  const salvo = lerSalvo(id);

  // Estado local do componente. `corrigido` decide se mostramos gabarito ou formulário.
  let respostas = salvo?.respostas ? { ...salvo.respostas } : {};
  let confiancas = salvo?.confiancas ? { ...salvo.confiancas } : {};
  let corrigido = Boolean(salvo);

  // Só os quizzes dos módulos entram na fila de revisão espaçada.
  const entraNaRevisao = id.startsWith('modulo-');

  function totalRespondidas() {
    return perguntas.filter((pergunta) => respostas[pergunta.id]).length;
  }

  function contarAcertos() {
    return perguntas.filter((pergunta) => respostas[pergunta.id] === pergunta.correta).length;
  }

  function corrigir() {
    corrigido = true;
    const acertos = contarAcertos();
    const salvou = gravar(id, {
      acertos,
      total: perguntas.length,
      respostas: { ...respostas },
      confiancas: { ...confiancas },
    });
    // As perguntas entram na fila de revisão: a primeira volta amanhã.
    if (entraNaRevisao) semearDoQuiz(id, perguntas);
    renderizar();
    mostrarToast(salvou ? 'Progresso salvo' : 'Não consegui salvar o progresso');
    // Leva o foco para o resumo, para quem navega por teclado/leitor de tela.
    container.querySelector('[data-quiz-resumo]')?.focus();
  }

  function refazer() {
    respostas = {};
    confiancas = {};
    corrigido = false;
    gravar(id, null);
    renderizar();
    container.querySelector('input[type="radio"]')?.focus();
  }

  // Classe da alternativa: neutra antes de corrigir; verde/vermelha depois.
  function classeAlternativa(pergunta, alternativa) {
    const base =
      'flex items-start gap-3 rounded-lg border p-3 text-sm transition-colors ' +
      'duration-150';

    if (!corrigido) {
      return base + ' cursor-pointer border-borda bg-fundo hover:border-texto-suave';
    }

    const escolhida = respostas[pergunta.id] === alternativa.id;
    const certa = alternativa.id === pergunta.correta;

    if (certa) return base + ' cursor-default border-risco-baixo/60 bg-risco-baixo/10';
    if (escolhida) return base + ' cursor-default border-risco-alto/60 bg-risco-alto/10';
    return base + ' cursor-default border-borda bg-fundo opacity-70';
  }

  // Etiqueta curta ao lado da alternativa depois da correção.
  function marcadorAlternativa(pergunta, alternativa) {
    if (!corrigido) return null;

    const escolhida = respostas[pergunta.id] === alternativa.id;
    const certa = alternativa.id === pergunta.correta;

    if (certa) {
      return criarElemento('span', { class: 'ml-auto shrink-0 text-xs font-semibold text-risco-baixo' }, [
        escolhida ? 'Certa — foi a sua' : 'Resposta certa',
      ]);
    }
    if (escolhida) {
      return criarElemento('span', { class: 'ml-auto shrink-0 text-xs font-semibold text-risco-alto-texto' }, [
        'Sua resposta',
      ]);
    }
    return null;
  }

  // A linha de confiança de cada pergunta. Antes de corrigir, três opções; depois,
  // o que você disse — e o aviso quando errou com certeza.
  function montarConfianca(pergunta) {
    const nome = id + '-' + pergunta.id + '-confianca';
    const atual = confiancas[pergunta.id];

    if (corrigido) {
      if (!atual) return null;
      const acertou = respostas[pergunta.id] === pergunta.correta;
      return criarElemento('p', { class: 'mt-2 text-xs text-texto-suave' }, [
        'Você disse: ' + ROTULOS_DE_CONFIANCA[atual].toLowerCase() + '.',
        atual === 3 && !acertou
          ? criarElemento('strong', { class: 'text-risco-medio' }, [
              ' Certeza e erro: é a explicação que mais vale reler.',
            ])
          : null,
      ]);
    }

    return criarElemento(
      'div',
      { class: 'mt-3 flex flex-wrap items-center gap-2 text-xs text-texto-suave' },
      [
        criarElemento('span', {}, ['Quão certo você está?']),
        ...[1, 2, 3].map((nivel) =>
          criarElemento(
            'label',
            {
              class:
                'flex cursor-pointer items-center gap-1.5 rounded-full border border-borda ' +
                'px-2.5 py-1 hover:border-texto-suave',
            },
            [
              criarElemento('input', {
                type: 'radio',
                name: nome,
                value: String(nivel),
                class: 'h-3 w-3 accent-acento',
                checked: atual === nivel,
                onchange: () => {
                  confiancas[pergunta.id] = nivel;
                },
              }),
              ROTULOS_DE_CONFIANCA[nivel],
            ],
          ),
        ),
      ],
    );
  }

  function montarPergunta(pergunta, indice) {
    const nomeDoGrupo = id + '-' + pergunta.id;

    const alternativas = pergunta.alternativas.map((alternativa) =>
      criarElemento('label', { class: classeAlternativa(pergunta, alternativa) }, [
        criarElemento('input', {
          type: 'radio',
          name: nomeDoGrupo,
          value: alternativa.id,
          class: 'mt-0.5 h-4 w-4 shrink-0 accent-primaria',
          checked: respostas[pergunta.id] === alternativa.id,
          disabled: corrigido,
          onchange: () => {
            respostas[pergunta.id] = alternativa.id;
            atualizarBotaoCorrigir();
          },
        }),
        criarElemento('span', {}, [alternativa.texto]),
        marcadorAlternativa(pergunta, alternativa),
      ]),
    );

    const acertou = respostas[pergunta.id] === pergunta.correta;
    const escolhida = pergunta.alternativas.find((alternativa) => alternativa.id === respostas[pergunta.id]);

    return criarElemento(
      'fieldset',
      { class: 'rounded-card border border-borda bg-superficie p-5' },
      [
        criarElemento('legend', { class: 'px-1 text-base font-semibold' }, [
          indice + 1 + '. ' + pergunta.pergunta,
        ]),

        criarElemento('div', { class: 'mt-3 space-y-2' }, alternativas),

        montarConfianca(pergunta),

        corrigido &&
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

        corrigido &&
          !acertou &&
          escolhida?.porque &&
          criarElemento('p', { class: 'mt-2 rounded-lg border border-borda bg-fundo p-3 text-sm text-texto-suave' }, [
            criarElemento('strong', { class: 'text-texto' }, ['Por que a sua não serve: ']),
            escolhida.porque,
          ]),
      ],
    );
  }

  // Habilita "Ver resultado" só quando todas as perguntas tiverem resposta.
  function atualizarBotaoCorrigir() {
    const botao = container.querySelector('[data-quiz-corrigir]');
    const contador = container.querySelector('[data-quiz-contador]');
    if (!botao) return;

    const respondidas = totalRespondidas();
    botao.disabled = respondidas < perguntas.length;
    if (contador) {
      contador.textContent =
        respondidas + ' de ' + perguntas.length + ' perguntas respondidas';
    }
  }

  function montarRodape() {
    if (corrigido) {
      const acertos = contarAcertos();
      const percentual = perguntas.length ? (acertos / perguntas.length) * 100 : 0;
      const errosComCerteza = perguntas.filter(
        (pergunta) => confiancas[pergunta.id] === 3 && respostas[pergunta.id] !== pergunta.correta,
      ).length;

      return criarElemento(
        'div',
        {
          'data-quiz-resumo': '',
          // Sem role="status": o foco vai para cá logo depois de corrigir, e o
          // leitor de tela já lê o bloco inteiro. Com os dois, ele leria duas vezes.
          tabindex: '-1',
          class: 'rounded-card border border-borda bg-superficie p-5',
        },
        [
          criarElemento('p', { class: 'text-lg font-semibold' }, [
            'Você acertou ' + acertos + ' de ' + perguntas.length + '.',
          ]),
          criarElemento('p', { class: 'mt-1 mb-3 text-sm text-texto-suave' }, [
            acertos === perguntas.length
              ? 'Gabarito. Leia as explicações mesmo assim: elas trazem os números por trás das respostas.'
              : 'Leia as explicações das que errou e refaça — o objetivo é reconhecer o padrão, não decorar a alternativa.',
          ]),
          errosComCerteza > 0 &&
            criarElemento('p', { class: 'mb-3 text-sm font-semibold text-risco-medio' }, [
              errosComCerteza === 1
                ? '1 erro feito com certeza — comece por ele.'
                : errosComCerteza + ' erros feitos com certeza — comece por eles.',
            ]),
          entraNaRevisao &&
            criarElemento('p', { class: 'mb-3 text-sm text-texto-suave' }, [
              'Estas perguntas voltam amanhã na página Revisão, e depois em 3, 7, 16 e 35 dias.',
            ]),
          criarBarraProgresso(percentual, 'Acertos no ' + titulo),
          criarElemento('div', { class: 'mt-4' }, [
            criarBotao('Refazer o quiz', { variante: 'secundario', onclick: refazer }),
          ]),
        ],
      );
    }

    return criarElemento('div', { class: 'flex flex-wrap items-center gap-4' }, [
      criarBotao('Ver resultado', {
        'data-quiz-corrigir': '',
        disabled: true,
        onclick: corrigir,
      }),
      criarElemento(
        'p',
        { 'data-quiz-contador': '', class: 'text-sm text-texto-suave', role: 'status' },
        ['0 de ' + perguntas.length + ' perguntas respondidas'],
      ),
    ]);
  }

  function renderizar() {
    container.replaceChildren(
      criarElemento('header', {}, [
        criarElemento('h2', { class: 'text-xl font-semibold' }, [titulo]),
        descricao && criarElemento('p', { class: 'mt-1 text-texto-suave' }, [descricao]),
      ]),
      criarElemento(
        'div',
        { class: 'mt-5 space-y-4' },
        perguntas.map((pergunta, indice) => montarPergunta(pergunta, indice)),
      ),
      criarElemento('div', { class: 'mt-5' }, [montarRodape()]),
    );

    atualizarBotaoCorrigir();
  }

  renderizar();
  return container;
}
