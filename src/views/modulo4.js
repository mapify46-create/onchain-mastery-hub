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
  html,
} from '../ui.js';
import { montarSimulador } from '../components/simulator.js';
import { montarQuiz } from '../components/quiz.js';
import { montarDestaques } from '../components/destaques.js';
import { montarCalculadora } from '../components/calculadora.js';
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

// Porcentagem inteira com o sinal de %.
function pct(fracao) {
  return Math.round(fracao * 100) + '%';
}

// O plano de uma posição em SVG: níveis horizontais, sem linha de preço.
// Desenhar o caminho do preço viraria, na cabeça de quem lê, um padrão a
// perseguir — e o plano existe justamente para não depender de prever esse
// caminho. Só os níveis, decididos antes.
function criarDiagramaDoPlano(plano) {
  const LARGURA = 640;
  const ALTURA = 210;
  const X_LINHA_INICIO = 150;
  const X_LINHA_FIM = 470;

  const niveis = plano.niveis.map((nivel) => {
    const cor = nivel.alerta
      ? 'var(--omh-risco-alto)'
      : nivel.base
        ? 'var(--omh-texto)'
        : 'var(--omh-risco-baixo)';
    return html`<svg>
      <line x1="${X_LINHA_INICIO}" y1="${nivel.y}" x2="${X_LINHA_FIM}" y2="${nivel.y}"
        stroke="${cor}" stroke-width="${nivel.base ? 3 : 2}"
        stroke-dasharray="${nivel.base ? '0' : '6 5'}" />
      <text x="${X_LINHA_INICIO - 12}" y="${nivel.y + 4}" text-anchor="end" font-size="13"
        font-weight="600" fill="${cor}">${nivel.rotulo}</text>
      <text x="${X_LINHA_FIM + 12}" y="${nivel.y + 4}" font-size="11"
        fill="var(--omh-texto-suave)">${nivel.detalhe}</text>
    </svg>`.childNodes;
  });

  // Eixo vertical esquemático: só a seta "preço", sem escala nem números.
  const eixo = html`<svg>
    <line x1="120" y1="${ALTURA - 14}" x2="120" y2="14" stroke="var(--omh-borda)" stroke-width="1.5" />
    <polygon points="120,10 115,20 125,20" fill="var(--omh-borda)" />
    <text x="112" y="${ALTURA / 2}" text-anchor="middle" font-size="10"
      fill="var(--omh-texto-suave)" transform="rotate(-90 112 ${ALTURA / 2})">preço</text>
  </svg>`.childNodes;

  const descricao = plano.niveis.map((n) => n.rotulo + ' (' + n.detalhe + ')').join('; ');

  return criarCard([
    criarElemento('h2', { class: 'text-lg font-semibold' }, [plano.titulo]),
    html`<div class="mt-4 overflow-x-auto">
      <svg
        viewBox="0 0 ${LARGURA} ${ALTURA}"
        class="min-w-[560px] w-full"
        role="img"
        aria-label="${plano.titulo}: ${descricao}. ${plano.restante}"
      >
        ${[...eixo]}
        ${niveis.map((nos) => [...nos])}
      </svg>
    </div>`,
    criarElemento('p', { class: 'mt-2 text-sm text-texto-suave' }, [plano.restante]),
    criarElemento('p', { class: 'mt-3 text-sm text-texto-suave' }, [plano.legenda]),
  ]);
}

// A conta da escada de realização.
//
// Tudo em múltiplos do valor investido. A primeira faixa vende a fração que
// recupera o investido: no alvo m1, isso é 1/m1 da posição (1/m1 × m1 = 1).
// O que sobra corre por conta do lucro. A segunda faixa vende parte disso no
// alvo m2. O "pior caso" é o que já está realizado se o restante for a zero.
function calcularDegraus({ alvo1, alvo2, fracao2 }) {
  const m1 = alvo1;
  const m2 = Math.max(alvo2, alvo1); // o segundo alvo nunca fica abaixo do primeiro
  const f1 = 1 / m1; // fração vendida no 1º alvo
  const r1 = 1 - f1; // fica na mesa depois do 1º alvo
  const f2 = (fracao2 / 100) * r1; // fração da posição ORIGINAL vendida no 2º alvo
  const r2 = r1 - f2; // restante final
  const realizado = f1 * m1 + f2 * m2; // f1·m1 é sempre 1: o investido de volta

  return {
    destaques: [
      {
        rotulo: 'Realizado até o segundo alvo',
        valor: pct(realizado) + ' do investido',
        nota: 'Dinheiro que existe de verdade, sem depender de o movimento continuar.',
      },
      {
        rotulo: 'Pior caso daqui em diante',
        valor: (realizado >= 1 ? '+' : '') + pct(realizado - 1),
        nota:
          realizado >= 1
            ? 'Se o restante for a zero, é isso que sobra. A partir do primeiro alvo, nunca mais é prejuízo.'
            : 'Ainda não recuperou o investido.',
        tom: realizado >= 1 ? 'ok' : 'alerta',
      },
      {
        rotulo: 'Ainda na mesa',
        valor: pct(r2) + ' da posição',
        nota: 'Corre por conta do lucro — com regra de saída escrita. Sem regra, é assim que 5× vira 0.',
        tom: r2 > 0.6 ? 'alerta' : 'neutro',
      },
    ],
    barras: [
      { rotulo: 'Vendido no 1º alvo (recupera o investido)', percentual: f1 * 100, valor: pct(f1) },
      { rotulo: 'Vendido no 2º alvo', percentual: f2 * 100, valor: pct(f2) },
      { rotulo: 'Restante, com regra', percentual: r2 * 100, valor: pct(r2) },
    ],
    aviso:
      alvo2 < alvo1
        ? 'O segundo alvo ficou abaixo do primeiro; a conta usou o primeiro para os dois.'
        : null,
  };
}

// A conta do tamanho de posição: tamanho = risco ÷ invalidação.
// Se você aceita perder 2% do capital e a invalidação está 50% abaixo da
// entrada, a posição pode ser 4% do capital — porque 50% de 4% são os 2%.
function calcularTamanho({ risco, invalidacao }) {
  const tamanho = risco / invalidacao; // fração do capital
  const acima = tamanho > 1;

  const cenarios = [25, 50, 75, 100].map((inv) => {
    const t = Math.min(1, risco / inv);
    return {
      rotulo: 'Invalidação a ' + inv + '%',
      percentual: t * 100,
      valor: pct(t) + ' do capital',
    };
  });

  return {
    destaques: [
      {
        rotulo: 'Tamanho da posição',
        valor: pct(Math.min(1, tamanho)) + ' do capital',
        nota: 'O que a sua regra de risco permite colocar nesta operação.',
        tom: acima ? 'alerta' : 'neutro',
      },
      {
        rotulo: 'Se bater a invalidação, você perde',
        valor: risco.toFixed(1).replace('.', ',') + '% do capital',
        nota: 'Exatamente o risco que você aceitou — nem mais, porque a saída já estava decidida.',
        tom: 'ok',
      },
    ],
    barras: cenarios,
    aviso: acima
      ? 'A regra permitiria mais do que 100% do capital. Isso não é sinal para alavancar — é sinal de que a invalidação está apertada demais para o risco escolhido.'
      : null,
  };
}

// A conta da recuperação: ganho necessário = 1 ÷ (1 − perda) − 1.
// Perdeu 50%, precisa de +100%. Perdeu 90%, precisa de +900%. A assimetria é
// o argumento inteiro a favor de sair cedo quando a tese falha.
function calcularRecuperacao({ perda }) {
  const p = perda / 100;
  const ganho = 1 / (1 - p) - 1;
  const TETO = 1 / (1 - 0.9) - 1; // +900%, a perda máxima que a escala mostra

  const escala = [10, 25, 50, 75, 90].map((q) => {
    const g = 1 / (1 - q / 100) - 1;
    return {
      rotulo: 'Perda de ' + q + '%',
      percentual: (g / TETO) * 100,
      valor: '+' + pct(g) + ' para voltar',
    };
  });

  return {
    destaques: [
      {
        rotulo: 'Ganho necessário só para empatar',
        valor: '+' + pct(ganho),
        nota: 'Sobre o que sobrou. Não é lucro: é o caminho de volta ao ponto de partida.',
        tom: ganho >= 1 ? 'alerta' : 'neutro',
      },
      {
        rotulo: 'Sobrou da posição',
        valor: pct(1 - p),
        nota: 'É sobre este valor menor que o ganho precisa acontecer — daí a assimetria.',
      },
    ],
    barras: escala,
  };
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

  // O desenho do plano entra entre a explicação e a ficha: mostra os níveis que
  // a ficha, logo abaixo, pede para você escrever.
  return criarElemento('div', { class: 'space-y-6' }, [
    objetivos,
    montarDestaques(modulo4.destaques.tese),
    regra,
    explicacao,
    criarDiagramaDoPlano(modulo4.planoDaPosicao),
    ficha,
    exemplos,
    tipos,
  ]);
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

  const calc = modulo4.calculadoraDeDegraus;

  // A calculadora vem logo depois da escada em texto: primeiro a estrutura,
  // depois sentir a estrutura mudar quando os alvos mudam.
  return criarElemento('div', { class: 'space-y-6' }, [
    montarDestaques(modulo4.destaques.takeProfit),
    explicacao,
    escada,
    calc &&
      montarCalculadora({
        id: 'm4-degraus',
        titulo: calc.titulo,
        descricao: calc.descricao,
        controles: calc.controles,
        nota: calc.nota,
        calcular: calcularDegraus,
      }),
    erro,
    tributacao,
  ]);
}

// ---------------------------------------------------------------------------
// Aba 3 — Checagens técnicas antes de entrar
// ---------------------------------------------------------------------------
function montarAbaChecagens() {
  const { checagens, calculadoraDeTamanho, calculadoraDeRecuperacao } = modulo4;

  return criarElemento('div', { class: 'space-y-6' }, [
    montarDestaques(modulo4.destaques.checagens),
    criarIntroducao(checagens.introducao),

    // As duas calculadoras vêm ANTES da lista de checagens: a recuperação mostra
    // por que a invalidação importa, e o tamanho mostra o que ela implica. Só
    // então as seis perguntas técnicas, já com o "por quê" na cabeça.
    calculadoraDeRecuperacao &&
      montarCalculadora({
        id: 'm4-recuperacao',
        titulo: calculadoraDeRecuperacao.titulo,
        descricao: calculadoraDeRecuperacao.descricao,
        controles: calculadoraDeRecuperacao.controles,
        nota: calculadoraDeRecuperacao.nota,
        calcular: calcularRecuperacao,
      }),
    calculadoraDeTamanho &&
      montarCalculadora({
        id: 'm4-tamanho',
        titulo: calculadoraDeTamanho.titulo,
        descricao: calculadoraDeTamanho.descricao,
        controles: calculadoraDeTamanho.controles,
        nota: calculadoraDeTamanho.nota,
        calcular: calcularTamanho,
      }),

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

  // O primeiro destaque é dinâmico: lê do store quantos cenários já foram
  // respondidos, para a aba refletir o progresso de quem está lendo. Como a aba
  // não é remontada a cada visita, o número atualiza na próxima vez que ela
  // abrir — não enquanto o simulador está em uso. Os outros dois vêm do texto.
  const respondidos = Object.keys(obterEstado().simulador?.escolhas ?? {}).length;
  const destaques = [
    {
      rotulo: 'Cenários',
      valor: String(cenarios.length),
      nota:
        respondidos +
        ' respondido' +
        (respondidos === 1 ? '' : 's') +
        ' até agora. O histórico fica salvo no seu navegador.',
      tom: respondidos === cenarios.length ? 'ok' : 'neutro',
    },
    {
      rotulo: 'Escolhas em cada um',
      valor: '4',
      nota: 'Cada escolha mostra o feedback, o risco daquela decisão e o próximo passo técnico.',
    },
    {
      rotulo: 'Pontuação de acerto de preço',
      valor: 'Nenhuma',
      nota: 'O que está sendo medido é se a decisão segue a regra ou o impulso — não se o preço subiu.',
    },
  ];

  return criarElemento('div', { class: 'space-y-6' }, [
    montarDestaques(destaques),
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
