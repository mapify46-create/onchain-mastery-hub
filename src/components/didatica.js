// didatica.js — peças pequenas que aplicam o que a pesquisa de didática mediu.
// Detalhe e fontes: pesquisa/modulos/pesquisas/VERIFICACOES-AO-VIVO-2.md.
//
//   montarSegmentos        divide uma aba longa em partes, com uma pausa entre elas
//   montarPerguntaPrevia   uma pergunta antes de ler a aba
//   montarPerguntaDaParte  uma pergunta no fim de uma parte, corrigida na hora
//   montarTermos           os termos-chave da aba, antes do conteúdo
//
// Estes blocos não estão nos desenhos; o dono decidiu mantê-los (18/09/2026), no
// traço do desenho: micro-rótulo de 12px, botões de 44px, caixas de raio 8
// (rounded-lg) e as alternativas e o feedback iguais aos do quiz (tela 34).

import { criarElemento, criarBotao } from '../ui.js';
import {
  MICRO_ROTULO,
  criarAlternativa,
  pintarAlternativa,
  preencherFeedback,
  mostrar,
  navegarComSetas,
  ajustarTabDoGrupo,
} from './quiz.js';

// Ids únicos na página, para ligar cada grupo de botões ao texto que o nomeia.
let contadorDeIds = 0;
function novoId(prefixo) {
  contadorDeIds += 1;
  return prefixo + '-' + contadorDeIds;
}

/**
 * Divide uma aba longa em partes que aparecem uma de cada vez.
 *
 * Por que: dividir o conteúdo em pedaços melhora retenção e transferência
 * (meta-análise de Rey et al., 2019, 56 estudos), e o efeito é mais completo
 * quando o próprio material marca a pausa — não só o aluno rolando a página. O
 * botão "Continuar" é essa pausa. "Mostrar tudo" fica para quem volta só para
 * consultar.
 *
 * As partes são montadas uma vez só e reveladas tirando o `hidden`: assim uma
 * calculadora mexida ou uma resposta marcada não se perdem.
 *
 * @param {object} opcoes
 * @param {Array}  opcoes.partes  [{ titulo, conteudo: [nós], pergunta? }] — a pergunta,
 *                                se houver, aparece no fim da parte, antes do "Continuar".
 */
export function montarSegmentos({ partes = [] }) {
  // gap (e não space-y): o que está escondido não deixa espaço sobrando.
  const container = criarElemento('div', { class: 'flex flex-col gap-8' });
  let visiveis = 1;

  const secoes = partes.map((parte, indice) =>
    criarElemento('section', { class: 'space-y-6', 'aria-label': parte.titulo }, [
      criarElemento(
        'p',
        {
          tabindex: '-1',
          'data-parte': String(indice),
          class: MICRO_ROTULO,
        },
        ['Parte ' + (indice + 1) + ' de ' + partes.length + ' — ' + parte.titulo],
      ),
      ...parte.conteudo,
      parte.pergunta ? montarPerguntaDaParte({ pergunta: parte.pergunta }) : null,
    ]),
  );

  const rodape = criarElemento('div', {
    class: 'flex flex-wrap items-center gap-3 rounded-lg border border-borda bg-superficie p-5',
  });

  function renderizar(parteParaFocar) {
    secoes.forEach((secao, indice) => {
      secao.hidden = indice >= visiveis;
    });

    if (visiveis >= partes.length) {
      // style.display, e não `hidden`: a classe "flex" venceria o hidden.
      mostrar(rodape, false);
    } else {
      mostrar(rodape, true);
      rodape.replaceChildren(
        // cursor-pointer: a mãozinha dos botões do desenho (o Tailwind põe a seta).
        criarBotao('Continuar: ' + partes[visiveis].titulo, {
          class: 'cursor-pointer',
          onclick: () => {
            visiveis += 1;
            renderizar(visiveis - 1);
          },
        }),
        criarBotao('Mostrar tudo', {
          variante: 'secundario',
          class: 'cursor-pointer',
          onclick: () => {
            visiveis = partes.length;
            renderizar(null);
          },
        }),
        criarElemento('span', { class: 'text-[13px] text-texto-suave' }, [
          visiveis + ' de ' + partes.length + ' partes abertas',
        ]),
      );
    }

    // O foco acompanha a parte nova, para quem navega por teclado ou leitor de tela.
    if (parteParaFocar !== null && parteParaFocar !== undefined) {
      secoes[parteParaFocar].querySelector('[data-parte]')?.focus();
    }
  }

  container.append(...secoes, rodape);
  renderizar(null);
  return container;
}

/**
 * Uma pergunta antes de ler a aba — a mesma do quiz do fim do módulo.
 *
 * Por que: tentar responder antes de estudar melhora o que se aprende depois,
 * mesmo errando (tentar antes da instrução: meta-análise de Sinha & Kapur, 2021;
 * pré-teste: Pan & Sana, 2021). Aqui ela não é corrigida: a resposta está no
 * texto da aba, e o quiz confere.
 *
 * @param {object} opcoes
 * @param {string} opcoes.id        Id do módulo (entra nos ids da página).
 * @param {object} opcoes.pergunta  Uma pergunta no formato do quiz.
 */
export function montarPerguntaPrevia({ id, pergunta }) {
  if (!pergunta) return null;

  const idDoRotulo = novoId('previa-' + id + '-' + pergunta.id + '-rotulo');
  const idDoTexto = novoId('previa-' + id + '-' + pergunta.id + '-texto');
  let escolhida = null;

  // O aviso fica sempre na página (vazio no começo) para o leitor de tela anunciar.
  const aviso = criarElemento('p', { class: 'text-[13px] text-texto-suave', role: 'status' });

  // Alternativas no traço do quiz: botões role="radio"; a escolhida fica roxa.
  const alternativas = pergunta.alternativas.map((alternativa) => ({
    alternativa,
    ...criarAlternativa(alternativa.texto, {
      role: 'radio',
      'aria-checked': 'false',
      onclick: () => escolher(alternativa.id),
      onkeydown: (evento) => navegarComSetas(evento, alternativas.map((item) => item.botao)),
    }),
  }));

  function escolher(alternativaId) {
    escolhida = alternativaId;
    pintar();
    aviso.classList.add('mt-3');
    aviso.textContent =
      'Anotado. Leia a aba com essa resposta na cabeça — o quiz do fim do módulo confere.';
  }

  function pintar() {
    for (const item of alternativas) {
      const estaEscolhida = item.alternativa.id === escolhida;
      pintarAlternativa(item, { escolhida: estaEscolhida, certa: false, corrigida: false });
      item.botao.setAttribute('aria-checked', String(estaEscolhida));
    }
    ajustarTabDoGrupo(
      alternativas.map((item) => item.botao),
      alternativas.findIndex((item) => item.alternativa.id === escolhida),
    );
  }

  pintar();

  return criarElemento(
    'div',
    {
      role: 'group',
      'aria-labelledby': idDoRotulo,
      class: 'flex flex-col gap-3.5 rounded-lg border border-acento/50 bg-acento/10 p-5',
    },
    [
      criarElemento(
        'p',
        { id: idDoRotulo, class: 'text-xs font-semibold uppercase tracking-[.05em] text-acento leading-[1.6]' },
        ['Antes de ler: o que você acha?'],
      ),
      criarElemento('p', { id: idDoTexto, class: 'text-[17px] font-semibold text-pretty text-texto' }, [
        pergunta.pergunta,
      ]),
      criarElemento('div', {}, [
        criarElemento(
          'div',
          { role: 'radiogroup', 'aria-labelledby': idDoTexto, class: 'flex flex-col gap-2' },
          alternativas.map((item) => item.botao),
        ),
        aviso,
      ]),
    ],
  );
}

/**
 * Uma pergunta no fim de uma parte, corrigida na hora.
 *
 * Por que: perguntas espalhadas pelo texto, e não só no fim do módulo, seguram a
 * atenção em material longo (Szpunar et al., 2013) e melhoram o aprendizado do
 * bloco seguinte (efeito do teste para a frente — Chan, Meissner & Davis, 2018).
 * A resposta não é salva: é treino; quem conta é o quiz do módulo.
 *
 * @param {object} opcoes
 * @param {object} opcoes.pergunta  Uma pergunta no formato do quiz (com `porque` nas erradas, se houver).
 */
export function montarPerguntaDaParte({ pergunta }) {
  if (!pergunta) return null;

  const idDoRotulo = novoId('confira-' + pergunta.id + '-rotulo');
  const idDoTexto = novoId('confira-' + pergunta.id + '-texto');
  let escolhida = null;

  // Um clique já responde: cada alternativa é um botão que corrige na hora.
  const alternativas = pergunta.alternativas.map((alternativa) => ({
    alternativa,
    ...criarAlternativa(alternativa.texto, {
      'aria-pressed': 'false',
      onclick: () => responder(alternativa.id),
    }),
  }));

  // O feedback (verde ou vermelho, como no quiz) e o "Tentar de novo". O feedback
  // recebe o foco depois da resposta (para o leitor de tela ler), mas não é um
  // controle: fica sem contorno, e o raio vai no style para a regra de foco não trocá-lo.
  const resultado = criarElemento('div', {
    'data-resultado': '',
    tabindex: '-1',
    style: 'outline:none;border-radius:8px',
  });
  const blocoDoResultado = criarElemento('div', { class: 'flex flex-col gap-3' }, [
    resultado,
    criarElemento('div', {}, [
      criarBotao('Tentar de novo', {
        variante: 'fantasma',
        class: 'cursor-pointer',
        onclick: () => {
          escolhida = null;
          pintar();
          alternativas[0]?.botao.focus();
        },
      }),
    ]),
  ]);

  function responder(alternativaId) {
    escolhida = alternativaId;
    pintar();
    resultado.focus();
  }

  function pintar() {
    const respondida = Boolean(escolhida);
    const acertou = escolhida === pergunta.correta;

    for (const item of alternativas) {
      const estaEscolhida = item.alternativa.id === escolhida;
      pintarAlternativa(item, {
        escolhida: estaEscolhida,
        certa: item.alternativa.id === pergunta.correta,
        corrigida: respondida,
      });
      item.botao.setAttribute('aria-pressed', String(estaEscolhida));
      item.botao.disabled = respondida;
    }

    if (respondida) {
      const marcada = pergunta.alternativas.find((alternativa) => alternativa.id === escolhida);
      preencherFeedback(resultado, {
        acertou,
        titulo: acertou ? 'Isso. ' : 'Não foi essa. ',
        explicacao: pergunta.explicacao,
        porque: marcada?.porque,
      });
    }
    mostrar(blocoDoResultado, respondida);
  }

  pintar();

  return criarElemento(
    'div',
    {
      role: 'group',
      'aria-labelledby': idDoRotulo,
      class: 'flex flex-col gap-3.5 rounded-lg border border-borda bg-superficie p-5',
    },
    [
      criarElemento('p', { id: idDoRotulo, class: MICRO_ROTULO }, ['Confira antes de seguir']),
      criarElemento('p', { id: idDoTexto, class: 'text-[17px] font-semibold text-pretty text-texto' }, [
        pergunta.pergunta,
      ]),
      criarElemento(
        'div',
        { role: 'group', 'aria-labelledby': idDoTexto, class: 'flex flex-col gap-2' },
        alternativas.map((item) => item.botao),
      ),
      blocoDoResultado,
    ],
  );
}

/**
 * Os termos-chave da aba, antes do conteúdo.
 *
 * Por que: ensinar os nomes antes do diagrama e da explicação ajuda (princípio do
 * pré-treino de Mayer: mediana d = 0,75, apoiado em 13 de 16 testes).
 *
 * @param {Array} termos  [{ termo, definicao }]
 */
export function montarTermos(termos = []) {
  if (!termos?.length) return null;

  return criarElemento(
    'aside',
    { class: 'rounded-card border border-borda bg-superficie p-5', 'aria-label': 'Termos desta aba' },
    [
      // leading-[1.6]: a altura de linha do desenho (o text-sm sozinho daria 20px).
      criarElemento('p', { class: 'text-sm font-semibold text-texto leading-[1.6]' }, ['Termos desta aba']),
      // Colunas pelo CSS: cabem quantas tiverem 200px ou mais (1 no celular).
      criarElemento(
        'dl',
        { class: 'mt-3 grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4' },
        termos.map((item) =>
          criarElemento('div', {}, [
            criarElemento('dt', { class: 'text-sm font-semibold text-acento leading-[1.6]' }, [item.termo]),
            criarElemento('dd', { class: 'mt-1 text-sm text-texto-suave leading-[1.6]' }, [item.definicao]),
          ]),
        ),
      ),
    ],
  );
}
