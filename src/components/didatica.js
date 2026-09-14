// didatica.js — peças pequenas que aplicam o que a pesquisa de didática mediu.
// Detalhe e fontes: pesquisa/modulos/pesquisas/VERIFICACOES-AO-VIVO-2.md.
//
//   montarSegmentos        divide uma aba longa em partes, com uma pausa entre elas
//   montarPerguntaPrevia   uma pergunta antes de ler a aba
//   montarPerguntaDaParte  uma pergunta no fim de uma parte, corrigida na hora
//   montarTermos           os termos-chave da aba, antes do conteúdo

import { criarElemento, criarBotao } from '../ui.js';

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
  const container = criarElemento('div', { class: 'space-y-8' });
  let visiveis = 1;

  const secoes = partes.map((parte, indice) =>
    criarElemento('section', { class: 'space-y-6', 'aria-label': parte.titulo }, [
      criarElemento(
        'p',
        {
          tabindex: '-1',
          'data-parte': String(indice),
          class: 'text-xs font-semibold uppercase tracking-wide text-texto-suave',
        },
        ['Parte ' + (indice + 1) + ' de ' + partes.length + ' — ' + parte.titulo],
      ),
      ...parte.conteudo,
      parte.pergunta ? montarPerguntaDaParte({ pergunta: parte.pergunta }) : null,
    ]),
  );

  const rodape = criarElemento('div', {
    class: 'flex flex-wrap items-center gap-4 rounded-card border border-borda bg-superficie p-4',
  });

  function renderizar(parteParaFocar) {
    secoes.forEach((secao, indice) => {
      secao.hidden = indice >= visiveis;
    });

    if (visiveis >= partes.length) {
      rodape.hidden = true;
    } else {
      rodape.hidden = false;
      rodape.replaceChildren(
        criarBotao('Continuar: ' + partes[visiveis].titulo, {
          onclick: () => {
            visiveis += 1;
            renderizar(visiveis - 1);
          },
        }),
        criarBotao('Mostrar tudo', {
          variante: 'secundario',
          onclick: () => {
            visiveis = partes.length;
            renderizar(null);
          },
        }),
        criarElemento('span', { class: 'text-sm text-texto-suave' }, [
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
 * @param {string} opcoes.id        Id do módulo, para o nome dos botões de rádio.
 * @param {object} opcoes.pergunta  Uma pergunta no formato do quiz.
 */
export function montarPerguntaPrevia({ id, pergunta }) {
  if (!pergunta) return null;

  const aviso = criarElemento('p', { class: 'mt-3 text-sm text-texto-suave', role: 'status' });
  const nome = 'previa-' + id + '-' + pergunta.id;

  const alternativas = pergunta.alternativas.map((alternativa) =>
    criarElemento(
      'label',
      {
        class:
          'flex cursor-pointer items-start gap-3 rounded-lg border border-borda bg-fundo p-3 ' +
          'text-sm transition-colors duration-150 hover:border-texto-suave',
      },
      [
        criarElemento('input', {
          type: 'radio',
          name: nome,
          value: alternativa.id,
          class: 'mt-0.5 h-4 w-4 shrink-0 accent-primaria',
          onchange: () => {
            aviso.textContent =
              'Anotado. Leia a aba com essa resposta na cabeça — o quiz do fim do módulo confere.';
          },
        }),
        criarElemento('span', {}, [alternativa.texto]),
      ],
    ),
  );

  return criarElemento('fieldset', { class: 'rounded-card border border-acento/40 bg-acento/5 p-5' }, [
    criarElemento('legend', { class: 'px-1 text-xs font-semibold uppercase tracking-wide text-acento' }, [
      'Antes de ler: o que você acha?',
    ]),
    criarElemento('p', { class: 'text-base font-semibold text-texto' }, [pergunta.pergunta]),
    criarElemento('div', { class: 'mt-3 space-y-2' }, alternativas),
    aviso,
  ]);
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

  const container = criarElemento('fieldset', {
    class: 'rounded-card border border-primaria/40 bg-primaria/5 p-5',
  });

  function renderizar(escolhida) {
    const respondida = Boolean(escolhida);
    const acertou = escolhida === pergunta.correta;
    const marcada = pergunta.alternativas.find((alternativa) => alternativa.id === escolhida);

    const alternativas = pergunta.alternativas.map((alternativa) => {
      const certa = alternativa.id === pergunta.correta;
      const foiEscolhida = alternativa.id === escolhida;
      let cor = ' border-borda bg-fundo hover:border-texto-suave';
      if (respondida && certa) cor = ' border-risco-baixo/60 bg-risco-baixo/10';
      else if (respondida && foiEscolhida) cor = ' border-risco-alto/60 bg-risco-alto/10';
      else if (respondida) cor = ' border-borda bg-fundo opacity-70';

      return criarElemento(
        'button',
        {
          type: 'button',
          disabled: respondida,
          'aria-pressed': String(foiEscolhida),
          class:
            'w-full rounded-lg border p-3 text-left text-sm text-texto transition-colors ' +
            'duration-150 disabled:cursor-default' +
            cor,
          onclick: () => {
            renderizar(alternativa.id);
            container.querySelector('[data-resultado]')?.focus();
          },
        },
        [alternativa.texto],
      );
    });

    const resultado = respondida
      ? [
          criarElemento(
            'p',
            {
              'data-resultado': '',
              tabindex: '-1',
              class:
                'mt-4 rounded-lg border p-3 text-sm ' +
                (acertou
                  ? 'border-risco-baixo/40 bg-risco-baixo/10'
                  : 'border-risco-medio/40 bg-risco-medio/10'),
            },
            [criarElemento('strong', {}, [acertou ? 'Isso. ' : 'Não foi essa. ']), pergunta.explicacao],
          ),
          !acertou && marcada?.porque
            ? criarElemento(
                'p',
                { class: 'mt-2 rounded-lg border border-borda bg-fundo p-3 text-sm text-texto-suave' },
                [criarElemento('strong', { class: 'text-texto' }, ['Por que a sua não serve: ']), marcada.porque],
              )
            : null,
          criarElemento('div', { class: 'mt-3' }, [
            criarBotao('Tentar de novo', { variante: 'fantasma', onclick: () => renderizar(null) }),
          ]),
        ]
      : [];

    container.replaceChildren(
      ...[
        criarElemento(
          'legend',
          { class: 'px-1 text-xs font-semibold uppercase tracking-wide text-texto' },
          ['Confira antes de seguir'],
        ),
        criarElemento('p', { class: 'text-base font-semibold text-texto' }, [pergunta.pergunta]),
        criarElemento('div', { class: 'mt-3 space-y-2' }, alternativas),
        ...resultado,
      ].filter(Boolean),
    );
  }

  renderizar(null);
  return container;
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
      criarElemento('p', { class: 'text-sm font-semibold text-texto' }, ['Termos desta aba']),
      criarElemento(
        'dl',
        { class: 'mt-3 grid gap-4 sm:grid-cols-3' },
        termos.map((item) =>
          criarElemento('div', {}, [
            criarElemento('dt', { class: 'text-sm font-semibold text-acento' }, [item.termo]),
            criarElemento('dd', { class: 'mt-1 text-sm text-texto-suave' }, [item.definicao]),
          ]),
        ),
      ),
    ],
  );
}
