// quiz.js — o quiz do hub, no desenho da tela 34 ("Quiz e Simulador").
//
// Duas peças:
//   montarQuiz            o mini-quiz do fim de cada módulo (o resultado fica salvo)
//   montarPerguntaRapida  uma pergunta só, no fim de uma seção (treino: não salva nada)
//
// Como funciona (decisão do dono, 18/09/2026): cada pergunta é corrigida sozinha.
//   1. Você marca uma alternativa.
//   2. Diz quão certo está (Chutei · Mais ou menos · Tenho certeza). É obrigatório.
//   3. "Ver resultado" libera e corrige só aquela pergunta, com a explicação.
//   4. Quando a última é corrigida, aparece o placar no fim e o resultado é salvo no
//      navegador (localStorage). Ao voltar, o quiz reabre corrigido, com o placar.
//
// Por que a confiança: registrar a confiança antes de ver a resposta deixa ver
// depois os erros feitos com certeza, que são os que mais se corrigem quando
// explicados (hipercorreção: Butterfield & Metcalfe, 2001).
//
// Por que "Por que a sua não serve": feedback que explica rende mais que só
// "certo/errado" (Wisniewski, Zierer & Hattie, 2020).
//
// Uso:
//   montarQuiz({
//     id: 'modulo-6',
//     titulo: 'Mini-quiz do Módulo 6',
//     descricao: 'Oito perguntas. As respostas ficam salvas no navegador.',
//     perguntas: juntarPorques(modulo6.quiz, modulo6.porqueErradas),
//     moduloNome: 'Módulo 6',   // opcional: vai no rótulo "Pergunta 2 de 8 · Módulo 6"
//     moduloId: 'modulo-6',     // opcional: põe "Marcar módulo como concluído" no placar
//   })
//   montarPerguntaRapida({ id: 'm6-rapida-q1', pergunta: perguntasDoM6[0], moduloNome: 'Módulo 6' })

import { criarElemento, criarBotao, mostrarToast } from '../ui.js';
import { obterEstado, atualizar } from '../store.js';
import { semearDoQuiz, ESCADA_DIAS } from './revisao.js';

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

const ROTULOS_DE_CONFIANCA = { 1: 'Chutei', 2: 'Mais ou menos', 3: 'Tenho certeza' };

// Abaixo desta fração de acertos, o placar pede para reler e refazer. É o mesmo
// limiar de 80% que a tela de Início usa para sugerir "Refazer o quiz".
export const LIMIAR_PARA_REFAZER = 0.8;

// ---------------------------------------------------------------------------
// Visual (tokens do README do handoff)
// ---------------------------------------------------------------------------

// Altura de linha dos textos. No desenho, textos herdam 1,6 do corpo, e botões
// ficam com a altura "normal" do navegador. As classes text-xs e text-sm do
// Tailwind trazem uma altura própria (16px e 20px), por isso vão estas junto.
const LINHA_TEXTO = 'leading-[1.6]';
const LINHA_BOTAO = 'leading-[normal]';

// Micro-rótulo: 12px, peso 600, maiúsculas, espaçamento .05em, cinza.
export const MICRO_ROTULO = 'text-xs font-semibold uppercase tracking-[.05em] text-texto-suave ' + LINHA_TEXTO;

// Cores de estado sempre em trio: borda meio transparente + fundo bem transparente
// (o texto no tom cheio vai à parte, onde houver).
const TRIO_VERDE = 'border-risco-baixo/50 bg-risco-baixo/12';
const TRIO_VERMELHO = 'border-risco-alto/50 bg-risco-alto/12';
const TRIO_AMBAR = 'border-risco-medio/40 bg-risco-medio/12';
const TRIO_ROXO = 'border-primaria/60 bg-primaria/12';

// O raio vai no `style`, e não numa classe: a regra de foco do custom.css troca
// para 4px o raio de quem recebe foco, e o desenho mantém a pílula redonda.
const RAIO_PILULA = 'border-radius:999px';
const RAIO_CAIXA = 'border-radius:8px';

// Mostra ou esconde um elemento. Usa style.display, e não o atributo `hidden`:
// uma classe como "flex" do Tailwind vence o `hidden`, e o elemento continuaria na tela.
export function mostrar(elemento, visivel) {
  elemento.style.display = visivel ? '' : 'none';
}

// Troca o texto só se mudou: assim uma região role="status" não repete o aviso.
function trocarTexto(elemento, texto) {
  if (elemento.textContent !== texto) elemento.textContent = texto;
}

/**
 * Pinta uma alternativa no traço da tela 34. Usado aqui e em didatica.js.
 *
 * Antes de corrigir: a escolhida fica roxa. Depois: a certa fica verde com
 * "A resposta certa." embaixo; a escolhida errada fica vermelha com "Foi a sua.";
 * as demais ficam a 70%.
 *
 * @param {object} partes     { botao, circulo, marca } — os elementos da alternativa
 * @param {object} situacao   { escolhida, certa, corrigida } — três booleanos
 */
export function pintarAlternativa({ botao, circulo, marca }, { escolhida, certa, corrigida }) {
  let cor = escolhida
    ? 'border-primaria bg-primaria/15 text-texto'
    : 'border-borda bg-fundo text-texto hover:border-texto-suave';
  let textoDaMarca = '';
  let corDaMarca = '';

  if (corrigida) {
    if (certa) {
      cor = TRIO_VERDE + ' text-texto';
      textoDaMarca = 'A resposta certa.';
      corDaMarca = 'text-risco-baixo';
    } else if (escolhida) {
      cor = TRIO_VERMELHO + ' text-risco-alto-texto';
      textoDaMarca = 'Foi a sua.';
      corDaMarca = 'text-risco-alto-texto';
    } else {
      cor = 'border-borda bg-fundo text-texto opacity-70';
    }
  }

  botao.className =
    'flex min-h-11 w-full items-start gap-2.5 border px-3.5 py-2.5 text-left text-sm ' +
    LINHA_BOTAO +
    ' ' +
    'transition-colors duration-150 ' +
    (corrigida ? 'cursor-default ' : 'cursor-pointer ') +
    cor;

  // O círculo: 20px por dentro + borda de 2px, que é o tamanho com que ele aparece
  // no desenho (24px no total). Fica cheio de roxo na escolhida (também depois de corrigir).
  circulo.className =
    'mt-px h-6 w-6 shrink-0 rounded-full border-2 ' +
    (escolhida ? 'border-primaria bg-primaria' : 'border-texto-suave bg-transparent');

  marca.textContent = textoDaMarca;
  marca.className = 'mt-1 text-xs font-semibold ' + LINHA_BOTAO + ' ' + corDaMarca;
  mostrar(marca, Boolean(textoDaMarca));
}

/**
 * Cria os elementos de uma alternativa (botão, círculo, marca), prontos para
 * pintarAlternativa(). O botão não tem cor ainda.
 */
export function criarAlternativa(texto, atributos = {}) {
  const circulo = criarElemento('span', { 'aria-hidden': 'true' });
  const marca = criarElemento('span', {});
  const botao = criarElemento('button', { type: 'button', style: RAIO_CAIXA, ...atributos }, [
    circulo,
    criarElemento('span', { class: 'flex min-w-0 flex-col' }, [criarElemento('span', {}, [texto]), marca]),
  ]);
  return { botao, circulo, marca };
}

/**
 * O conteúdo da caixa de feedback depois de corrigir: verde se acertou, vermelha
 * se errou (nunca âmbar), título colorido e, dentro dela, as subcaixas
 * "Por que a sua não serve:" e "Certeza e erro:". Usado aqui e em didatica.js.
 *
 * @param {HTMLElement} caixa  O elemento que recebe o feedback (é esvaziado antes).
 * @param {object} dados       { acertou, titulo, explicacao, porque?, certezaEErro? }
 */
export function preencherFeedback(caixa, { acertou, titulo, explicacao, porque = '', certezaEErro = false }) {
  caixa.className =
    'flex flex-col gap-2.5 rounded-lg border px-4 py-3.5 ' + (acertou ? TRIO_VERDE : TRIO_VERMELHO);

  caixa.replaceChildren(
    ...[
      criarElemento('p', { class: 'text-sm text-texto ' + LINHA_TEXTO }, [
        criarElemento('strong', { class: acertou ? 'text-risco-baixo' : 'text-risco-alto-texto' }, [titulo]),
        explicacao,
      ]),
      !acertou && porque
        ? criarElemento('div', { class: 'rounded-md border px-3 py-2.5 ' + TRIO_VERMELHO }, [
            criarElemento('p', { class: 'text-sm text-texto ' + LINHA_TEXTO }, [
              criarElemento('strong', { class: 'text-texto' }, ['Por que a sua não serve: ']),
              porque,
            ]),
          ])
        : null,
      certezaEErro
        ? criarElemento('p', { class: 'rounded-md border px-3 py-2.5 text-sm text-texto ' + LINHA_TEXTO + ' ' + TRIO_AMBAR }, [
            criarElemento('strong', { class: 'text-texto' }, ['Certeza e erro: ']),
            'é a explicação que mais vale reler.',
          ])
        : null,
    ].filter(Boolean),
  );
}

// Num grupo de rádio, o Tab entra no grupo uma vez só: na opção escolhida ou, se
// ainda não há escolha, na primeira. As outras ficam fora do Tab (tabindex -1) e
// são alcançadas pelas setas. Usado aqui e em didatica.js.
export function ajustarTabDoGrupo(botoes, indiceEscolhido) {
  const alvo = indiceEscolhido >= 0 ? indiceEscolhido : 0;
  botoes.forEach((botao, i) => {
    botao.tabIndex = i === alvo ? 0 : -1;
  });
}

// As setas movem entre as opções de um grupo e escolhem a nova, como num grupo de
// rádio. Enter e Espaço funcionam como em qualquer botão (é o que o desenho usa).
// Usado aqui e em didatica.js.
export function navegarComSetas(evento, botoes) {
  const passo = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[evento.key];
  const indice = botoes.indexOf(evento.currentTarget);
  if (!passo || indice < 0) return;
  evento.preventDefault();
  const destino = botoes[(indice + passo + botoes.length) % botoes.length];
  destino.focus();
  destino.click();
}

// "3, 7, 16 e 35" a partir de uma lista de números.
function juntarComE(numeros) {
  if (numeros.length <= 1) return numeros.join('');
  return numeros.slice(0, -1).join(', ') + ' e ' + numeros[numeros.length - 1];
}

// "1 certa" / "6 certas".
function contar(quantidade, singular, plural) {
  return quantidade + ' ' + (quantidade === 1 ? singular : plural);
}

// ---------------------------------------------------------------------------
// Salvar no navegador
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// O quiz
// ---------------------------------------------------------------------------

/**
 * Monta o quiz. As opções novas são todas opcionais: a chamada antiga
 * `montarQuiz({ id, titulo, descricao, perguntas })` continua funcionando.
 *
 * @param {object}  opcoes
 * @param {string}  opcoes.id           Chave do resultado em estado.quizzes (ex.: 'modulo-6').
 * @param {string}  opcoes.titulo       Título do quiz.
 * @param {string}  opcoes.descricao    Frase embaixo do título (opcional).
 * @param {Array}   opcoes.perguntas    [{ id, pergunta, alternativas:[{id,texto,porque?}], correta, explicacao }]
 * @param {string}  opcoes.moduloNome   Ex.: 'Módulo 6'. Vai no rótulo "Pergunta N de M · Módulo 6".
 * @param {string}  opcoes.moduloId     Ex.: 'modulo-6'. Põe "Marcar módulo como concluído" no placar.
 * @param {boolean} opcoes.salvar       false = não grava nada, não põe na revisão, não mostra aviso.
 * @param {boolean} opcoes.emCard       false = sem o card em volta (para ficar dentro de outro card).
 * @param {number}  opcoes.nivelTitulo  2 = <h2> (padrão); 3 = <h3>, dentro de um card com <h2>.
 */
export function montarQuiz({
  id,
  titulo = 'Mini-quiz',
  descricao = '',
  perguntas = [],
  moduloNome = '',
  moduloId = '',
  salvar = true,
  emCard = true,
  nivelTitulo = 2,
}) {
  const salvo = salvar ? lerSalvo(id) : null;

  // Estado do quiz, por pergunta: a alternativa, a confiança e se já foi corrigida.
  let respostas = { ...(salvo?.respostas ?? {}) };
  let confiancas = { ...(salvo?.confiancas ?? {}) };
  let corrigidas = {};
  // O quiz salvo reabre corrigido (as perguntas que têm resposta salva).
  for (const pergunta of perguntas) {
    if (salvo && respostas[pergunta.id]) corrigidas[pergunta.id] = true;
  }

  // Só os quizzes dos módulos, e só quando salvam, entram na fila de revisão espaçada.
  const entraNaRevisao = salvar && String(id).startsWith('modulo-');

  function acertou(pergunta) {
    return respostas[pergunta.id] === pergunta.correta;
  }

  function errouComCerteza(pergunta) {
    return !acertou(pergunta) && confiancas[pergunta.id] === 3;
  }

  function todasCorrigidas() {
    return perguntas.length > 0 && perguntas.every((pergunta) => corrigidas[pergunta.id]);
  }

  // -------------------------------------------------------------------------
  // Uma pergunta: a caixa interna escura com tudo dentro. Os elementos são
  // criados uma vez e `pintar()` só atualiza cores e textos. Assim o foco não se
  // perde ao escolher, e as regiões que o leitor de tela anuncia continuam as mesmas.
  // -------------------------------------------------------------------------
  function montarPergunta(pergunta, indice) {
    const base = id + '-' + pergunta.id; // prefixo dos ids desta pergunta
    const idDoTexto = base + '-texto';
    const idDaConfianca = base + '-confianca';

    // Cabeçalho: "Pergunta 2 de 8 · Módulo 6" e, depois de corrigir, o selo Certa/Errada.
    // Recebe o foco depois de corrigir (sem contorno: é um alvo só para o teclado
    // e o leitor de tela continuarem no lugar certo).
    const selo = criarElemento('span', {});
    const cabecalho = criarElemento(
      'div',
      { tabindex: '-1', style: 'outline:none', class: 'flex flex-wrap items-baseline justify-between gap-3' },
      [
        criarElemento('p', { class: MICRO_ROTULO }, [
          'Pergunta ' + (indice + 1) + ' de ' + perguntas.length + (moduloNome ? ' · ' + moduloNome : ''),
        ]),
        selo,
      ],
    );

    // As alternativas: botões com role="radio", como no desenho.
    const alternativas = pergunta.alternativas.map((alternativa) => ({
      alternativa,
      ...criarAlternativa(alternativa.texto, {
        role: 'radio',
        'aria-checked': 'false',
        onclick: () => escolher(alternativa.id),
        onkeydown: (evento) => navegarComSetas(evento, alternativas.map((item) => item.botao)),
      }),
    }));

    // A confiança: três pílulas, obrigatória antes de corrigir.
    const pilulas = [1, 2, 3].map((nivel) =>
      criarElemento(
        'button',
        {
          type: 'button',
          role: 'radio',
          'aria-checked': 'false',
          style: RAIO_PILULA,
          onclick: () => escolherConfianca(nivel),
          onkeydown: (evento) => navegarComSetas(evento, pilulas),
        },
        [ROTULOS_DE_CONFIANCA[nivel]],
      ),
    );
    const disse = criarElemento('p', { class: 'mt-2 text-[13px] text-texto-suave' });

    // "Ver resultado" + a dica de 3 estados.
    const botao = criarElemento(
      'button',
      {
        type: 'button',
        // Mãozinha quando liberado, "proibido" quando bloqueado, como no desenho.
        // O raio vai no style para continuar 8px quando o botão recebe foco.
        style: RAIO_CAIXA,
        class:
          'min-h-11 border border-primaria bg-primaria px-5 py-2.5 text-[15px] font-semibold ' +
          LINHA_BOTAO +
          ' text-white transition-colors duration-150 enabled:cursor-pointer enabled:hover:bg-primaria/85 ' +
          'disabled:cursor-not-allowed disabled:opacity-50',
        onclick: corrigirEsta,
      },
      ['Ver resultado'],
    );
    const dica = criarElemento('span', { role: 'status', class: 'text-[13px] text-texto-suave' });
    const acoes = criarElemento('div', { class: 'flex flex-wrap items-center gap-3' }, [botao, dica]);

    // A caixa de feedback. Fica sempre na página (vazia antes de corrigir) para o
    // leitor de tela anunciar o que entrar nela.
    const feedback = criarElemento('div', { 'aria-live': 'polite' });

    const caixa = criarElemento(
      'div',
      { class: 'flex flex-col gap-3.5 rounded-lg border border-borda bg-fundo p-5' },
      [
        cabecalho,
        criarElemento('p', { id: idDoTexto, class: 'text-[17px] font-semibold text-pretty' }, [pergunta.pergunta]),
        criarElemento(
          'div',
          { role: 'radiogroup', 'aria-labelledby': idDoTexto, class: 'flex flex-col gap-2' },
          alternativas.map((item) => item.botao),
        ),
        criarElemento('div', {}, [
          criarElemento('p', { id: idDaConfianca, class: 'mb-1.5 ' + MICRO_ROTULO }, [
            'Quão certo você está? (obrigatório)',
          ]),
          criarElemento(
            'div',
            { role: 'radiogroup', 'aria-labelledby': idDaConfianca, class: 'flex flex-wrap gap-2' },
            pilulas,
          ),
          disse,
        ]),
        // Botão e feedback no mesmo bloco: um some quando o outro aparece.
        criarElemento('div', {}, [acoes, feedback]),
      ],
    );

    function escolher(alternativaId) {
      if (corrigidas[pergunta.id]) return;
      respostas[pergunta.id] = alternativaId;
      pintar();
    }

    function escolherConfianca(nivel) {
      if (corrigidas[pergunta.id]) return;
      confiancas[pergunta.id] = nivel;
      pintar();
    }

    function corrigirEsta() {
      if (!respostas[pergunta.id] || !confiancas[pergunta.id]) return;
      corrigidas[pergunta.id] = true;
      pintar();
      if (todasCorrigidas()) terminar();
      else cabecalho.focus();
    }

    function pintar() {
      const escolhida = respostas[pergunta.id];
      const confianca = confiancas[pergunta.id];
      const corrigida = Boolean(corrigidas[pergunta.id]);
      const certa = acertou(pergunta);

      // Selo no cabeçalho.
      mostrar(selo, corrigida);
      selo.textContent = certa ? 'Certa' : 'Errada';
      selo.className =
        'rounded-full border px-2.5 py-px text-xs font-semibold ' +
        LINHA_TEXTO +
        ' ' +
        (certa ? TRIO_VERDE + ' text-risco-baixo' : TRIO_VERMELHO + ' text-risco-alto-texto');

      // Alternativas.
      for (const item of alternativas) {
        const estaEscolhida = item.alternativa.id === escolhida;
        pintarAlternativa(item, {
          escolhida: estaEscolhida,
          certa: item.alternativa.id === pergunta.correta,
          corrigida,
        });
        item.botao.setAttribute('aria-checked', String(estaEscolhida));
        item.botao.disabled = corrigida;
      }
      ajustarTabDoGrupo(
        alternativas.map((item) => item.botao),
        alternativas.findIndex((item) => item.alternativa.id === escolhida),
      );

      // Pílulas de confiança: depois de corrigir ficam travadas, mas à vista.
      pilulas.forEach((pilula, i) => {
        const estaEscolhida = confianca === i + 1;
        pilula.className =
          'min-h-11 border px-4 py-2 text-sm font-semibold text-texto transition-colors duration-150 ' +
          LINHA_BOTAO +
          ' ' +
          (corrigida ? 'cursor-default ' : 'cursor-pointer ') +
          (estaEscolhida ? 'border-acento bg-acento/12' : 'border-borda bg-superficie') +
          (!corrigida && !estaEscolhida ? ' hover:border-texto-suave' : '');
        pilula.setAttribute('aria-checked', String(estaEscolhida));
        pilula.disabled = corrigida;
      });
      ajustarTabDoGrupo(pilulas, confianca ? confianca - 1 : -1);

      // "Você disse: tenho certeza." — só depois de corrigir.
      mostrar(disse, corrigida && Boolean(confianca));
      disse.textContent = confianca
        ? 'Você disse: ' +
          ROTULOS_DE_CONFIANCA[confianca].toLowerCase() +
          '.' +
          (errouComCerteza(pergunta) ? ' Certeza e erro: é a explicação que mais vale reler.' : '')
        : '';

      // Botão e dica: só antes de corrigir.
      mostrar(acoes, !corrigida);
      botao.disabled = !(escolhida && confianca);
      trocarTexto(
        dica,
        !escolhida
          ? 'Marque uma alternativa e diga quão certo você está.'
          : !confianca
            ? 'Falta dizer quão certo você está — é obrigatório antes de corrigir.'
            : 'Pronto: pode corrigir.',
      );

      // Feedback: só depois de corrigir.
      if (corrigida) {
        const marcada = pergunta.alternativas.find((alternativa) => alternativa.id === escolhida);
        preencherFeedback(feedback, {
          acertou: certa,
          titulo: certa ? 'Você acertou. ' : 'Não foi essa. ',
          explicacao: pergunta.explicacao,
          porque: marcada?.porque,
          certezaEErro: errouComCerteza(pergunta),
        });
      } else if (feedback.childNodes.length) {
        feedback.className = '';
        feedback.replaceChildren();
      }
    }

    return {
      caixa,
      pintar,
      focarPrimeira: () => alternativas[0]?.botao.focus(),
    };
  }

  // -------------------------------------------------------------------------
  // O placar: aparece quando todas as perguntas estão corrigidas.
  // -------------------------------------------------------------------------

  // Botão que marca (ou desmarca) o módulo como concluído — a mesma lógica do
  // cartão "Terminou o módulo?" das views.
  function estaConcluido() {
    return (obterEstado().modulosConcluidos ?? []).includes(moduloId);
  }

  function montarBotaoConcluir() {
    const jaConcluido = estaConcluido();
    const botaoConcluir = criarBotao(jaConcluido ? 'Desmarcar módulo' : 'Marcar módulo como concluído', {
      variante: jaConcluido ? 'secundario' : 'primario',
      class: 'cursor-pointer',
      'aria-pressed': String(jaConcluido),
      onclick: () => {
        // Lê o estado na hora do clique: outro botão da página pode ter mudado.
        const concluido = estaConcluido();
        const salvou = atualizar((estado) => {
          const lista = new Set(estado.modulosConcluidos ?? []);
          if (concluido) lista.delete(moduloId);
          else lista.add(moduloId);
          return { ...estado, modulosConcluidos: [...lista] };
        });
        const novo = montarBotaoConcluir();
        botaoConcluir.replaceWith(novo);
        novo.focus();
        if (!salvou) mostrarToast('Não consegui salvar o progresso');
        else if (concluido) mostrarToast('Módulo desmarcado');
        else mostrarToast(moduloNome ? moduloNome + ' concluído. Progresso salvo' : 'Progresso salvo');
      },
    });
    return botaoConcluir;
  }

  // A barra empilhada: certas (verde), erradas (vermelho) e erradas com
  // "Tenho certeza" (âmbar), com legenda e a versão em texto para leitor de tela.
  function montarBarraDoPlacar(acertos, erradasSemCerteza, comCerteza) {
    const total = perguntas.length;
    const erradas = erradasSemCerteza + comCerteza;
    const largura = (quantidade) => 'width:' + (total ? (quantidade / total) * 100 : 0) + '%';

    let alternativa = acertos + (total === 1 ? ' de 1 pergunta certa' : ' das ' + total + ' perguntas certas');
    if (erradas > 0) {
      alternativa += '; ' + contar(erradas, 'errada', 'erradas');
      if (comCerteza === 1 && erradas === 1) alternativa += ', e foi um erro feito com certeza';
      else if (comCerteza === 1) alternativa += ', e 1 delas foi um erro feito com certeza';
      else if (comCerteza > 1) alternativa += ', e ' + comCerteza + ' delas foram erros feitos com certeza';
    }
    alternativa += '.';

    const itemDaLegenda = (cor, texto) =>
      criarElemento('span', { class: 'inline-flex items-center gap-1.5' }, [
        criarElemento('span', { 'aria-hidden': 'true', class: 'h-3 w-[22px] rounded-[3px] ' + cor }),
        texto,
      ]);

    return criarElemento('figure', { role: 'img', 'aria-label': alternativa }, [
      // 24px no total: 22px de barra por dentro + 1px de borda em cima e embaixo, como no desenho.
      criarElemento('div', { class: 'flex h-6 overflow-hidden rounded border border-borda bg-fundo' }, [
        criarElemento('div', { class: 'h-full bg-risco-baixo', style: largura(acertos) }),
        criarElemento('div', { class: 'h-full bg-risco-alto', style: largura(erradasSemCerteza) }),
        criarElemento('div', { class: 'h-full bg-risco-medio', style: largura(comCerteza) }),
      ]),
      criarElemento('figcaption', { class: 'mt-2 flex flex-wrap gap-3.5 text-[13px] text-texto-suave' }, [
        itemDaLegenda('bg-risco-baixo', contar(acertos, 'certa', 'certas')),
        itemDaLegenda('bg-risco-alto', contar(erradasSemCerteza, 'errada', 'erradas')),
        itemDaLegenda(
          'bg-risco-medio',
          contar(comCerteza, 'errada', 'erradas') + ' com "Tenho certeza"',
        ),
      ]),
    ]);
  }

  function preencherPlacar() {
    const total = perguntas.length;
    const acertos = perguntas.filter(acertou).length;
    const comCerteza = perguntas.filter(errouComCerteza).length;
    const erradasSemCerteza = total - acertos - comCerteza;
    const fracao = total ? acertos / total : 0;

    let mensagem = 'Leia as explicações das que errou e refaça — o objetivo é reconhecer o padrão, não decorar a alternativa.';
    if (acertos === total) {
      mensagem = 'Gabarito. Leia as explicações mesmo assim: elas trazem os números por trás das respostas.';
    } else if (fracao < LIMIAR_PARA_REFAZER) {
      mensagem = 'Releia as explicações das que errou e refaça o quiz.';
    }

    placar.replaceChildren(
      ...[
        criarElemento('div', { class: 'flex flex-wrap items-baseline justify-between gap-3' }, [
          criarElemento('p', { class: 'text-lg font-semibold ' + LINHA_TEXTO }, [
            'Você acertou ' + acertos + ' de ' + total + '.',
          ]),
          criarElemento('span', { class: 'font-mono text-sm text-texto-suave ' + LINHA_TEXTO }, [
            Math.round(fracao * 100) + '%',
          ]),
        ]),
        montarBarraDoPlacar(acertos, erradasSemCerteza, comCerteza),
        criarElemento('p', { class: 'text-sm text-texto-suave ' + LINHA_TEXTO }, [mensagem]),
        comCerteza > 0 &&
          criarElemento('p', { class: 'rounded-md border px-3 py-2.5 text-sm text-texto ' + LINHA_TEXTO + ' ' + TRIO_AMBAR }, [
            comCerteza === 1
              ? '1 erro feito com certeza — comece por ele.'
              : comCerteza + ' erros feitos com certeza — comece por eles.',
          ]),
        entraNaRevisao &&
          criarElemento('p', { class: 'text-sm text-texto-suave ' + LINHA_TEXTO }, [
            'Estas perguntas voltam amanhã na página ',
            criarElemento('a', { href: '#/revisao', class: 'text-acento underline underline-offset-2 hover:text-texto' }, [
              'Revisão',
            ]),
            // O primeiro degrau da escada é "amanhã"; os outros vêm da própria escada.
            ', e depois em ' + juntarComE(ESCADA_DIAS.slice(1)) + ' dias.',
          ]),
        criarElemento('div', { class: 'flex flex-wrap gap-3' }, [
          criarBotao('Refazer o quiz', { variante: 'secundario', class: 'cursor-pointer', onclick: refazer }),
          moduloId ? montarBotaoConcluir() : null,
        ]),
      ].filter(Boolean),
    );
  }

  // Todas corrigidas: salva (se for para salvar), põe na revisão e mostra o placar.
  function terminar() {
    if (salvar) {
      const salvou = gravar(id, {
        acertos: perguntas.filter(acertou).length,
        total: perguntas.length,
        respostas: { ...respostas },
        confiancas: { ...confiancas },
      });
      // As perguntas entram na fila de revisão: a primeira volta amanhã.
      if (entraNaRevisao) semearDoQuiz(id, perguntas);
      mostrarToast(salvou ? 'Progresso salvo' : 'Não consegui salvar o progresso');
    }
    preencherPlacar();
    mostrar(placar, true);
    // Leva o foco para o placar, para quem navega por teclado ou leitor de tela.
    placar.focus();
  }

  function refazer() {
    respostas = {};
    confiancas = {};
    corrigidas = {};
    if (salvar) gravar(id, null);
    for (const item of itens) item.pintar();
    mostrar(placar, false);
    placar.replaceChildren();
    itens[0]?.focarPrimeira();
  }

  // -------------------------------------------------------------------------
  // Montagem
  // -------------------------------------------------------------------------
  const idDoTitulo = id + '-titulo';

  // Sem role="status" no placar: o foco vai para lá ao aparecer, e o leitor de
  // tela já lê o bloco inteiro. Com os dois, ele leria duas vezes.
  // O raio vai no style (RAIO_CAIXA): o placar recebe o foco, e a regra de foco
  // do custom.css trocaria um rounded-lg por 4px.
  const placar = criarElemento('div', {
    'data-quiz-resumo': '',
    tabindex: '-1',
    style: RAIO_CAIXA,
    class: 'flex flex-col gap-3 border p-5 ' + TRIO_ROXO,
  });

  const itens = perguntas.map((pergunta, indice) => montarPergunta(pergunta, indice));
  for (const item of itens) item.pintar();

  if (todasCorrigidas()) preencherPlacar();
  mostrar(placar, todasCorrigidas());

  return criarElemento(
    emCard ? 'section' : 'div',
    {
      // Só a <section> leva nome; numa <div> comum o aria-labelledby não vale.
      'aria-labelledby': emCard ? idDoTitulo : null,
      class: 'flex flex-col gap-4' + (emCard ? ' rounded-card border border-borda bg-superficie p-5' : ''),
    },
    [
      criarElemento('header', {}, [
        criarElemento('h' + nivelTitulo, { id: idDoTitulo, class: 'text-xl font-semibold ' + LINHA_TEXTO }, [titulo]),
        descricao && criarElemento('p', { class: 'mt-1 text-texto-suave' }, [descricao]),
      ]),
      ...itens.map((item) => item.caixa),
      placar,
    ],
  );
}

/**
 * A "Pergunta rápida" do fim de cada seção (desenhos M1–M7): um quiz de uma
 * pergunta só, no mesmo visual, que não grava nada. Vai dentro do card da
 * seção, por isso sem card próprio e com título <h3>.
 *
 * @param {object} opcoes
 * @param {string} opcoes.id          Único na página (ex.: 'm6-rapida-q1'). Não é salvo.
 * @param {object} opcoes.pergunta    Uma pergunta no formato do quiz (passe por juntarPorques
 *                                    antes, para ter o "Por que a sua não serve").
 * @param {string} opcoes.moduloNome  Ex.: 'Módulo 6' (opcional).
 */
export function montarPerguntaRapida({ id, pergunta, moduloNome = '' }) {
  if (!pergunta) return null;
  return montarQuiz({
    id,
    titulo: 'Pergunta rápida',
    perguntas: [pergunta],
    moduloNome,
    salvar: false,
    emCard: false,
    nivelTitulo: 3,
  });
}
