// quiz.js — mini-quiz reutilizável por módulo (3 a 5 perguntas).
//
// Fluxo: o usuário marca uma alternativa por pergunta, clica em "Ver resultado" e recebe
// a correção com explicação em cada pergunta. O resultado fica salvo no store (localStorage),
// então o F5 não apaga nada — ao voltar, o quiz reabre já corrigido.
//
// Uso:
//   montarQuiz({ id: 'modulo-2', perguntas: modulo2.quiz })

import { criarElemento, criarBarraProgresso, criarBotao, mostrarToast } from '../ui.js';
import { obterEstado, atualizar } from '../store.js';

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
  let corrigido = Boolean(salvo);

  function totalRespondidas() {
    return perguntas.filter((pergunta) => respostas[pergunta.id]).length;
  }

  function contarAcertos() {
    return perguntas.filter((pergunta) => respostas[pergunta.id] === pergunta.correta).length;
  }

  function corrigir() {
    corrigido = true;
    const acertos = contarAcertos();
    const salvou = gravar(id, { acertos, total: perguntas.length, respostas: { ...respostas } });
    renderizar();
    mostrarToast(salvou ? 'Progresso salvo' : 'Não consegui salvar o progresso');
    // Leva o foco para o resumo, para quem navega por teclado/leitor de tela.
    container.querySelector('[data-quiz-resumo]')?.focus();
  }

  function refazer() {
    respostas = {};
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

    return criarElemento(
      'fieldset',
      { class: 'rounded-card border border-borda bg-superficie p-5' },
      [
        criarElemento('legend', { class: 'px-1 text-base font-semibold' }, [
          indice + 1 + '. ' + pergunta.pergunta,
        ]),

        criarElemento('div', { class: 'mt-3 space-y-2' }, alternativas),

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
