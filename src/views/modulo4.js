// views/modulo4.js — monta a página do Módulo 4 a partir de src/data/modulo4.js
// e de src/data/cenarios.js.
//
// Abas internas (padrão ARIA de tabs, vindo de ui.js):
//   Tese vs. catálise · Take profit · Antes de entrar · Simulador · Quiz

import { modulo4 } from '../data/modulo4.js';
import { cenarios } from '../data/cenarios.js';
import {
  criarElemento,
  criarTitulo,
  criarCard,
  criarBotao,
  criarBadgeRisco,
  criarAbas,
  mostrarToast,
} from '../ui.js';
import { montarSimulador } from '../components/simulator.js';
import { montarQuiz } from '../components/quiz.js';
import { obterEstado, atualizar } from '../store.js';

// Parágrafo de apoio usado no topo de várias abas.
function criarIntroducao(texto) {
  return criarElemento('p', { class: 'max-w-3xl text-texto-suave' }, [texto]);
}

// Bloco de texto padrão: título + parágrafos.
function criarSecaoDeTexto(titulo, paragrafos, opcoes = {}) {
  return criarCard(
    [
      criarElemento('h2', { class: 'text-lg font-semibold' }, [titulo]),
      ...paragrafos.map((paragrafo) =>
        criarElemento('p', { class: 'mt-3 text-texto-suave' }, [paragrafo]),
      ),
    ],
    opcoes,
  );
}

// ---------------------------------------------------------------------------
// Aba 1 — Tese vs. catálise
// ---------------------------------------------------------------------------
function montarAbaTese() {
  const { teseVsCatalise } = modulo4;

  const objetivos = criarCard([
    criarElemento('h2', { class: 'text-lg font-semibold' }, ['O que você leva deste módulo']),
    criarElemento(
      'ul',
      { class: 'mt-3 list-disc space-y-2 pl-5 text-texto-suave' },
      modulo4.objetivos.map((objetivo) => criarElemento('li', {}, [objetivo])),
    ),
  ]);

  // A regra de ouro é a coisa que mais precisa ser vista nesta aba.
  const regra = criarCard(
    [
      criarElemento('h2', { class: 'text-lg font-semibold text-acento' }, [
        teseVsCatalise.regraDeOuro.titulo,
      ]),
      criarElemento('p', { class: 'mt-3 text-texto-suave' }, [teseVsCatalise.regraDeOuro.texto]),
    ],
    { class: 'border-acento/50 bg-acento/5' },
  );

  const explicacao = criarSecaoDeTexto(teseVsCatalise.titulo, teseVsCatalise.paragrafos);

  // Ficha de tese: cinco campos para copiar no caderno de trades.
  const ficha = criarCard([
    criarElemento('h2', { class: 'text-lg font-semibold' }, [teseVsCatalise.fichaDeTese.titulo]),
    criarElemento('p', { class: 'mt-2 text-texto-suave' }, [
      teseVsCatalise.fichaDeTese.introducao,
    ]),
    criarElemento(
      'ol',
      { class: 'mt-4 space-y-3' },
      teseVsCatalise.fichaDeTese.campos.map((campo, indice) =>
        criarElemento('li', { class: 'rounded-lg border border-borda bg-fundo p-4' }, [
          criarElemento('p', { class: 'text-sm font-semibold' }, [
            indice + 1 + '. ' + campo.rotulo,
          ]),
          criarElemento('p', { class: 'mt-1 text-sm text-texto-suave' }, [campo.pergunta]),
          criarElemento('p', { class: 'mt-2 font-mono text-xs text-texto-suave' }, [campo.exemplo]),
        ]),
      ),
    ),
  ]);

  // Exemplos de tese fraca vs. tese forte, lado a lado.
  const exemplos = criarCard([
    criarElemento('h2', { class: 'text-lg font-semibold' }, ['Fraca, vaga e concreta']),
    criarElemento(
      'div',
      { class: 'mt-4 grid gap-3 lg:grid-cols-3' },
      teseVsCatalise.exemplos.map((exemplo) =>
        criarElemento(
          'div',
          {
            class:
              'rounded-lg border p-4 ' +
              (exemplo.tipo === 'forte'
                ? 'border-risco-baixo/40 bg-risco-baixo/5'
                : 'border-risco-alto/40 bg-risco-alto/5'),
          },
          [
            criarElemento('p', { class: 'text-sm font-semibold' }, [exemplo.rotulo]),
            criarElemento('p', { class: 'mt-3 text-xs uppercase tracking-wide text-texto-suave' }, [
              'Tese',
            ]),
            criarElemento('p', { class: 'text-sm' }, [exemplo.tese]),
            criarElemento('p', { class: 'mt-2 text-xs uppercase tracking-wide text-texto-suave' }, [
              'Catálise',
            ]),
            criarElemento('p', { class: 'text-sm' }, [exemplo.catalise]),
            criarElemento('p', { class: 'mt-3 text-sm text-texto-suave' }, [exemplo.veredito]),
          ],
        ),
      ),
    ),
  ]);

  // Tipos de catálise: <details> para não estourar a página.
  const tipos = criarCard([
    criarElemento('h2', { class: 'text-lg font-semibold' }, [
      teseVsCatalise.tiposDeCatalise.titulo,
    ]),
    criarElemento(
      'div',
      { class: 'mt-4 space-y-2' },
      teseVsCatalise.tiposDeCatalise.itens.map((item) =>
        criarElemento('details', { class: 'rounded-lg border border-borda bg-fundo p-4' }, [
          criarElemento('summary', { class: 'cursor-pointer text-sm font-semibold' }, [item.nome]),
          criarElemento('p', { class: 'mt-3 text-sm text-texto-suave' }, [item.descricao]),
          criarElemento(
            'p',
            {
              class:
                'mt-3 rounded-lg border border-risco-medio/40 bg-risco-medio/10 p-3 text-sm ' +
                'text-texto-suave',
            },
            [criarElemento('strong', { class: 'text-texto' }, ['Onde costuma dar errado: ']), item.alerta],
          ),
        ]),
      ),
    ),
  ]);

  return criarElemento('div', { class: 'space-y-6' }, [objetivos, regra, explicacao, ficha, exemplos, tipos]);
}

// ---------------------------------------------------------------------------
// Aba 2 — Take profit (escada de realização, custo afundado e tributação)
// ---------------------------------------------------------------------------
function montarAbaTakeProfit() {
  const { takeProfit } = modulo4;

  const explicacao = criarSecaoDeTexto(takeProfit.titulo, takeProfit.paragrafos);

  const escada = criarCard([
    criarElemento('h2', { class: 'text-lg font-semibold' }, [takeProfit.escada.titulo]),
    criarElemento('p', { class: 'mt-2 text-texto-suave' }, [takeProfit.escada.introducao]),
    criarElemento(
      'ol',
      { class: 'mt-4 space-y-3' },
      takeProfit.escada.faixas.map((faixa) =>
        criarElemento('li', { class: 'rounded-lg border border-borda bg-fundo p-4' }, [
          criarElemento('p', { class: 'text-xs font-semibold uppercase tracking-wide text-acento' }, [
            faixa.alvo,
          ]),
          criarElemento('p', { class: 'mt-2 text-sm font-medium' }, [faixa.acao]),
          criarElemento('p', { class: 'mt-1 text-sm text-texto-suave' }, [faixa.porque]),
        ]),
      ),
    ),
    criarElemento('p', { class: 'mt-4 text-sm text-texto-suave' }, [takeProfit.escada.observacao]),
  ]);

  const erro = criarSecaoDeTexto(
    takeProfit.erroDeSegurar.titulo,
    takeProfit.erroDeSegurar.paragrafos,
    { class: 'border-risco-alto/40' },
  );

  const tributacao = criarCard([
    criarElemento('h2', { class: 'text-lg font-semibold' }, [takeProfit.tributacao.titulo]),
    criarElemento(
      'p',
      {
        class:
          'mt-3 rounded-lg border border-risco-medio/40 bg-risco-medio/10 p-3 text-sm ' +
          'text-texto-suave',
      },
      [criarElemento('strong', { class: 'text-texto' }, ['Atenção: ']), takeProfit.tributacao.aviso],
    ),
    criarElemento(
      'dl',
      { class: 'mt-4 space-y-3' },
      takeProfit.tributacao.pontos.flatMap((ponto) => [
        criarElemento('dt', { class: 'text-sm font-semibold' }, [ponto.rotulo]),
        criarElemento('dd', { class: 'text-sm text-texto-suave' }, [ponto.texto]),
      ]),
    ),
  ]);

  return criarElemento('div', { class: 'space-y-6' }, [explicacao, escada, erro, tributacao]);
}

// ---------------------------------------------------------------------------
// Aba 3 — Checagens técnicas antes de entrar
// ---------------------------------------------------------------------------
function montarAbaChecagens() {
  const { checagens } = modulo4;

  return criarElemento('div', { class: 'space-y-6' }, [
    criarIntroducao(checagens.introducao),

    criarElemento(
      'ol',
      { class: 'space-y-4' },
      checagens.itens.map((item, indice) =>
        criarElemento('li', { class: 'rounded-card border border-borda bg-superficie p-5' }, [
          criarElemento('h2', { class: 'text-base font-semibold' }, [
            indice + 1 + '. ' + item.pergunta,
          ]),
          criarElemento('p', { class: 'mt-3 text-texto-suave' }, [item.porque]),
          criarElemento('p', { class: 'mt-3 text-sm text-texto-suave' }, [
            criarElemento('strong', { class: 'text-texto' }, ['Onde checar: ']),
            item.onde,
          ]),
          criarElemento(
            'p',
            {
              class:
                'mt-3 rounded-lg border border-risco-alto/40 bg-risco-alto/10 p-3 text-sm ' +
                'text-texto-suave',
            },
            [criarElemento('strong', { class: 'text-texto' }, ['Sinal de alerta: ']), item.alerta],
          ),
        ]),
      ),
    ),
  ]);
}

// ---------------------------------------------------------------------------
// Aba 4 — Simulador
// ---------------------------------------------------------------------------
function montarAbaSimulador() {
  const { simulador } = modulo4;

  // Legenda dos três badges, para o significado das cores ficar explícito.
  const legenda = criarElemento('div', { class: 'flex flex-wrap items-center gap-3' }, [
    criarElemento('span', { class: 'text-sm text-texto-suave' }, ['Badges de risco:']),
    criarBadgeRisco('baixo', 'Risco baixo'),
    criarBadgeRisco('medio', 'Risco médio'),
    criarBadgeRisco('alto', 'Risco alto'),
  ]);

  return criarElemento('div', { class: 'space-y-6' }, [
    criarIntroducao(simulador.introducao),
    legenda,
    montarSimulador({ cenarios, aviso: simulador.aviso }),
  ]);
}

// ---------------------------------------------------------------------------
// Aba 5 — Quiz + botão de concluir o módulo
// ---------------------------------------------------------------------------
function montarConclusao() {
  const container = criarCard([]);

  function estaConcluido() {
    return (obterEstado().modulosConcluidos ?? []).includes(modulo4.id);
  }

  function alternar() {
    const concluido = estaConcluido();
    const salvou = atualizar((estado) => {
      const lista = new Set(estado.modulosConcluidos ?? []);
      if (concluido) lista.delete(modulo4.id);
      else lista.add(modulo4.id);
      return { ...estado, modulosConcluidos: [...lista] };
    });

    renderizar();
    if (!salvou) mostrarToast('Não consegui salvar o progresso');
    else mostrarToast(concluido ? 'Módulo desmarcado' : 'Módulo 4 concluído. Progresso salvo');
  }

  function renderizar() {
    const concluido = estaConcluido();
    container.replaceChildren(
      criarElemento('h2', { class: 'text-lg font-semibold' }, ['Terminou o módulo?']),
      criarElemento('p', { class: 'mt-2 mb-4 text-sm text-texto-suave' }, [
        concluido
          ? 'Módulo 4 marcado como concluído. Ele conta na barra de progresso do topo.'
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
      id: modulo4.id,
      titulo: 'Mini-quiz do Módulo 4',
      descricao: 'Quatro perguntas. As respostas ficam salvas no navegador.',
      perguntas: modulo4.quiz,
    }),
    montarConclusao(),
  ]);
}

// ---------------------------------------------------------------------------
// Montagem da página
// ---------------------------------------------------------------------------
export function montarModulo4() {
  const cabecalho = criarElemento('div', {}, [
    criarTitulo('Módulo 4 — Gestão, catálises & tomada de decisão', { subtitulo: modulo4.resumo }),
    criarElemento(
      'p',
      {
        class:
          'mb-6 rounded-card border border-risco-medio/40 bg-risco-medio/10 p-3 text-sm ' +
          'text-texto-suave',
      },
      [
        criarElemento('strong', { class: 'text-texto' }, ['Lembrete: ']),
        'este módulo ensina processo de decisão, não onde comprar ou vender. Nada aqui é ' +
          'aconselhamento financeiro ou tributário, e os cenários do simulador são fictícios.',
      ],
    ),
  ]);

  const abas = criarAbas({
    id: 'modulo-4',
    rotulo: 'Seções do Módulo 4',
    abas: [
      { id: 'tese', rotulo: 'Tese vs. catálise', montar: montarAbaTese },
      { id: 'take-profit', rotulo: 'Take profit', montar: montarAbaTakeProfit },
      { id: 'checagens', rotulo: 'Antes de entrar', montar: montarAbaChecagens },
      { id: 'simulador', rotulo: 'Simulador', montar: montarAbaSimulador },
      { id: 'quiz', rotulo: 'Quiz', montar: montarAbaQuiz },
    ],
  });

  return criarElemento('div', { class: 'mx-auto max-w-5xl' }, [cabecalho, abas]);
}
