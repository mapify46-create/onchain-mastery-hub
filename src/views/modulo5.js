// views/modulo5.js — monta a página do Módulo 5 a partir de src/data/modulo5.js.
//
// Abas internas (padrão ARIA de tabs, vindo de ui.js):
//   Terminal · Custódia · Taxas · Configurações · Erros · Processo · Quiz
//
// As abas com diagrama usam sempreRemontar, igual aos Módulos 1 e 2: o Mermaid
// precisa ser redesenhado toda vez que a aba volta a aparecer (ver diagrama.js).
//
// Renderização tolerante a campo vazio: tabelaOrdens, checklistExecucao e
// errosComuns ainda estão vazios em modulo5.js (dependem da continuação de uma
// pesquisa). Cada bloco só é montado se tiver conteúdo, então a página funciona
// completa sem eles — e preenchê-los depois não exige mexer neste arquivo.

import { modulo5 } from '../data/modulo5.js';
import {
  criarElemento,
  criarTitulo,
  criarCard,
  criarBotao,
  criarAbas,
  mostrarToast,
  html,
} from '../ui.js';
import { montarChecklist } from '../components/checklist.js';
import { montarTabelaComparativa } from '../components/comparisonTable.js';
import { montarQuiz } from '../components/quiz.js';
import { montarDiagrama, renderizarDiagrama } from '../components/diagrama.js';
import { montarGraficoEmpilhado, renderizarGrafico } from '../components/grafico.js';
import { montarCalculadora } from '../components/calculadora.js';
import { montarDestaques } from '../components/destaques.js';
import { montarAnatomia } from '../components/anatomia.js';
import { obterEstado, atualizar } from '../store.js';

// Parágrafo de apoio usado no topo de várias abas.
function criarIntroducao(texto) {
  return criarElemento('p', { class: 'max-w-3xl text-texto-suave' }, [texto]);
}

// Card de uma seção de texto, no mesmo formato do Módulo 1. Além dos campos de
// lá, aceita `paragrafosFinais`: parágrafos que vêm DEPOIS da lista. O fluxo
// operacional precisa disso — a observação sobre "não operar" tem que fechar a
// seção, não abrir.
function criarCardDaSecao(secao) {
  return criarCard([
    criarElemento('h2', { class: 'text-lg font-semibold' }, [secao.titulo]),
    ...secao.paragrafos.map((paragrafo) =>
      criarElemento('p', { class: 'mt-3 text-texto-suave' }, [paragrafo]),
    ),

    secao.lista &&
      criarElemento(
        secao.ordenada ? 'ol' : 'ul',
        {
          class:
            'mt-4 space-y-2 pl-5 text-texto-suave ' +
            (secao.ordenada ? 'list-decimal' : 'list-disc'),
        },
        secao.lista.map((item) => criarElemento('li', {}, [item])),
      ),

    ...(secao.paragrafosFinais ?? []).map((paragrafo) =>
      criarElemento('p', { class: 'mt-4 text-texto-suave' }, [paragrafo]),
    ),
  ]);
}

// Seções de texto que pertencem a uma aba inteira, na ordem em que aparecem em
// modulo5.secoes.
function criarSecoesDaAba(idDaAba) {
  return modulo5.secoes.filter((secao) => secao.aba === idDaAba).map(criarCardDaSecao);
}

// Monta a figura de um diagrama a partir do id em modulo5.diagramas. Devolve null
// se o id não existir, para o chamador poder ignorar sem quebrar a página.
function criarFiguraDoDiagrama(id) {
  const dados = modulo5.diagramas.find((diagrama) => diagrama.id === id);
  if (!dados) return null;

  const reserva = criarElemento(
    'ol',
    { class: 'list-decimal space-y-2 pl-5 text-sm text-texto-suave' },
    dados.versaoEmTexto.map((passo) => criarElemento('li', {}, [passo])),
  );

  return montarDiagrama({
    diagrama: dados.codigoMermaid,
    legenda: dados.legenda,
    reserva,
    rotuloAcessivel: dados.titulo + '. ' + dados.versaoEmTexto.join(' Depois, '),
    mensagemErroSintaxe: 'no diagrama "' + dados.id + '", no arquivo src/data/modulo5.js',
  });
}

// Redesenha diagramas e gráficos do painel — usado no aoAtivar das abas.
// Os dois precisam disso pelo mesmo motivo: Mermaid e Chart.js medem o elemento
// para desenhar, e num painel escondido todas as medidas são zero.
function redesenharDiagramasDoPainel(painel) {
  painel.querySelectorAll('[data-diagrama]').forEach(renderizarDiagrama);
  painel.querySelectorAll('[data-grafico]').forEach(renderizarGrafico);
}

// Monta uma anatomia a partir de modulo5.anatomias[chave]. Devolve null se não
// existir, para a view poder listar sem condicional.
function criarAnatomia(chave, id) {
  const dados = modulo5.anatomias?.[chave];
  return dados ? montarAnatomia({ id, ...dados }) : null;
}

// Ilustração das camadas (aba Terminal): quatro caixas em fila, cada uma com a
// taxa da etapa em destaque. Substitui a caixa-e-seta do Mermaid por um desenho
// que mostra ONDE o dinheiro é retido — a informação que o fluxograma não tinha.
function criarIlustracaoDasCamadas(camadas) {
  const LARGURA = 128;
  const VAO = 36;
  const MARGEM = 10;
  const ALTURA = 140;

  const caixas = camadas.map((camada, i) => {
    const x = MARGEM + i * (LARGURA + VAO);
    const ehTerminal = camada.id === 'terminal';
    return html`<svg>
      <rect x="${x}" y="20" width="${LARGURA}" height="100" rx="12"
        fill="var(--omh-superficie)"
        stroke="${ehTerminal ? 'var(--omh-primaria)' : 'var(--omh-borda)'}"
        stroke-width="${ehTerminal ? 2 : 1}" />
      <text x="${x + LARGURA / 2}" y="44" text-anchor="middle" font-size="12"
        font-weight="600" fill="var(--omh-texto)">${camada.rotulo}</text>
      <text x="${x + LARGURA / 2}" y="78" text-anchor="middle" font-size="22"
        font-weight="700" fill="${ehTerminal ? 'var(--omh-primaria)' : 'var(--omh-acento)'}"
        class="omh-numero">${camada.taxa}</text>
      <text x="${x + LARGURA / 2}" y="104" text-anchor="middle" font-size="10"
        fill="var(--omh-texto-suave)">${camada.detalhe}</text>
    </svg>`.childNodes;
  });

  const setas = camadas.slice(0, -1).map((_, i) => {
    const x1 = MARGEM + i * (LARGURA + VAO) + LARGURA + 6;
    const x2 = x1 + VAO - 12;
    return html`<svg>
      <line x1="${x1}" y1="70" x2="${x2}" y2="70" stroke="var(--omh-texto-suave)" stroke-width="2" />
      <polygon points="${x2},70 ${x2 - 7},65 ${x2 - 7},75" fill="var(--omh-texto-suave)" />
    </svg>`.childNodes;
  });

  const descricao = camadas.map((c) => c.rotulo + ' (' + c.taxa + ')').join(' → ');

  return criarCard([
    criarElemento('h2', { class: 'text-lg font-semibold' }, ['Onde cada camada retém a sua parte']),
    html`<div class="mt-4 overflow-x-auto">
      <svg
        viewBox="0 0 ${MARGEM * 2 + camadas.length * LARGURA + (camadas.length - 1) * VAO} ${ALTURA}"
        class="min-w-[560px] w-full"
        role="img"
        aria-label="Caminho da ordem: ${descricao}."
      >
        ${caixas.map((nos) => [...nos])}
        ${setas.map((nos) => [...nos])}
      </svg>
    </div>`,
    criarElemento('p', { class: 'mt-3 text-sm text-texto-suave' }, [
      'A caixa roxa é a única cuja taxa aparece no marketing. As outras são cobradas do mesmo jeito.',
    ]),
  ]);
}

// A conta da calculadora de impacto de preço.
//
// Produto constante: numa pool com X de um lado e Y do outro, X·Y não muda numa
// troca. Comprando com dx, você recebe dy = Y·dx/(X+dx), e o preço efetivo fica
// pior que o cotado numa fração de dx/(X+dx). É a matemática por trás de "pool
// rasa": a sua própria ordem é parte relevante da pool, então ela move o preço.
function calcularImpacto({ ordem, pool }) {
  const impacto = ordem / (pool + ordem);
  const recebe = 1 - impacto;
  const pct = (n) => (n * 100).toFixed(1).replace('.', ',') + '%';

  // Mesma ordem em pools de profundidades diferentes — o "venue muda o custo",
  // agora sentido no controle em vez de lido na tabela.
  const profundidades = [5, 20, 50, 200].map((p) => {
    const imp = ordem / (p + ordem);
    return {
      rotulo: 'Pool de ' + p + ' SOL',
      percentual: (1 - imp) * 100,
      valor: pct(1 - imp) + ' do cotado',
    };
  });

  return {
    destaques: [
      {
        rotulo: 'Impacto no preço',
        valor: pct(impacto),
        nota: 'Quanto a sua própria compra empurra o preço contra você, antes de qualquer bot.',
        tom: impacto > 0.1 ? 'alerta' : 'neutro',
      },
      {
        rotulo: 'Você recebe',
        valor: pct(recebe),
        nota: 'Do que receberia se o preço cotado se mantivesse. O resto ficou na curva da pool.',
      },
    ],
    barras: profundidades,
    aviso:
      impacto > 0.15
        ? 'Numa pool assim, a sua ordem É o mercado. Qualquer slippage folgado aqui vira convite a um ataque de sandwich.'
        : null,
  };
}

// A conta da calculadora de atrito.
//
// restante = (1 - custo)^n — cada ida e volta multiplica o que sobrou pelo mesmo
// fator. É juro composto ao contrário, e é por isso que o resultado surpreende:
// 3,2% parece pouco até ser aplicado cinquenta vezes seguidas.
function calcularAtrito({ operacoes, custo }) {
  const fator = 1 - custo / 100;
  const restante = Math.pow(fator, operacoes) * 100;

  const formatar = (n) => n.toFixed(1).replace('.', ',') + '%';

  // Marcos fixos para mostrar o formato da curva — o destaque acima já responde
  // pelo número exato que a pessoa escolheu.
  const marcos = [10, 25, 50, 100].map((n) => {
    const sobra = Math.pow(fator, n) * 100;
    return {
      rotulo: 'Depois de ' + n + ' operações',
      percentual: sobra,
      valor: formatar(sobra) + ' do capital',
    };
  });

  return {
    destaques: [
      {
        rotulo: 'Sobra do capital',
        valor: formatar(restante),
        nota: 'Depois de ' + operacoes + ' operações completas, com o preço parado.',
        tom: restante < 50 ? 'alerta' : 'neutro',
      },
      {
        rotulo: 'Consumido só em taxa',
        valor: formatar(100 - restante),
        nota: 'Isso saiu do seu bolso sem o mercado ter se mexido em nenhuma direção.',
        tom: 'neutro',
      },
    ],
    barras: marcos,
  };
}

// Uma tabela comparativa só é montada se tiver linhas. É o que permite os campos
// da Etapa B ficarem vazios sem deixar um título órfão na tela.
function temLinhas(tabela) {
  return Boolean(tabela?.linhas?.length);
}

// ---------------------------------------------------------------------------
// Aba 1 — Terminal
// ---------------------------------------------------------------------------
function montarAbaTerminal() {
  const objetivos = criarCard([
    criarElemento('h2', { class: 'text-lg font-semibold' }, ['O que você leva deste módulo']),
    criarElemento(
      'ul',
      { class: 'mt-3 list-disc space-y-2 pl-5 text-texto-suave' },
      modulo5.objetivos.map((objetivo) => criarElemento('li', {}, [objetivo])),
    ),
  ]);

  return criarElemento('div', { class: 'space-y-6' }, [
    objetivos,
    montarDestaques(modulo5.destaques.terminal),
    ...criarSecoesDaAba('terminal'),
    // A ilustração em SVG substitui o fluxograma Mermaid desta aba: mostra a
    // taxa retida em cada etapa, que a caixa-e-seta não tinha como mostrar.
    criarIlustracaoDasCamadas(modulo5.ilustracaoCamadas),
    criarIntroducao(
      'Compare as três camadas lado a lado. Clique em "Ver mais" para o detalhe de cada uma.',
    ),
    temLinhas(modulo5.tabelaCamadas) && montarTabelaComparativa(modulo5.tabelaCamadas),
  ]);
}

// ---------------------------------------------------------------------------
// Aba 2 — Custódia
// ---------------------------------------------------------------------------
function montarAbaCustodia() {
  return criarElemento('div', { class: 'space-y-6' }, [
    montarDestaques(modulo5.destaques.custodia),
    ...criarSecoesDaAba('custodia'),
    criarAnatomia('custodia', 'm5-anatomia-custodia'),
  ]);
}

// ---------------------------------------------------------------------------
// Aba 3 — Taxas (as cinco camadas + a matriz de cenários + diagrama)
// ---------------------------------------------------------------------------
// A aba segue um arco de propósito: gancho (os três números) → explicação →
// detalhe → visualização da proporção → ferramenta para o leitor sentir o efeito
// acumulado. Cada etapa responde uma pergunta que a anterior levanta.
function montarAbaTaxas() {
  const matriz = modulo5.matrizDeCusto;
  const grafico = modulo5.graficoDeCamadas;
  const calc = modulo5.calculadoraDeAtrito;

  return criarElemento('div', { class: 'space-y-6' }, [
    // 1. Gancho: os três números que contradizem o que se supõe sobre taxa.
    montarDestaques(modulo5.destaques.taxas),

    // 2. Explicação.
    ...criarSecoesDaAba('taxas'),
    criarFiguraDoDiagrama('caminho-do-dinheiro'),

    // 3. Detalhe camada por camada.
    criarIntroducao('As cinco camadas de custo de uma compra, uma a uma.'),
    temLinhas(modulo5.tabelaTaxas) && montarTabelaComparativa(modulo5.tabelaTaxas),

    // 4. Proporção: o gráfico mostra o que a tabela só enumera.
    temLinhas(matriz) &&
      criarElemento('div', { class: 'space-y-4' }, [
        criarElemento('h2', { class: 'text-lg font-semibold' }, [
          'A mesma operação, três situações',
        ]),
        criarIntroducao(
          'Não existe um número único para "quanto custa operar". O custo muda com o ' +
            'tamanho da ordem e com o lugar onde o token está sendo negociado — estas três ' +
            'linhas são a mesma plataforma, no mesmo dia.',
        ),
        grafico &&
          criarCard([
            montarGraficoEmpilhado({
              camadas: grafico.camadas,
              grupos: grafico.grupos,
              sufixo: grafico.sufixo,
              legenda: grafico.legenda,
            }),
          ]),
        montarTabelaComparativa(matriz),
        matriz.cotacaoAssumida &&
          criarElemento(
            'p',
            {
              class:
                'rounded-card border border-risco-medio/40 bg-risco-medio/10 p-3 text-sm ' +
                'text-texto-suave',
            },
            [
              criarElemento('strong', { class: 'text-texto' }, ['Cotação assumida: ']),
              matriz.cotacaoAssumida,
            ],
          ),
      ]),

    // 5. Ferramenta: sentir o custo se acumular é diferente de ler sobre ele.
    calc &&
      montarCalculadora({
        id: 'm5-atrito',
        titulo: calc.titulo,
        descricao: calc.descricao,
        controles: calc.controles,
        nota: calc.nota,
        calcular: calcularAtrito,
      }),
  ]);
}

// ---------------------------------------------------------------------------
// Aba 4 — Configurações (tipos de ordem, slippage/prioridade/MEV, ler a tela)
// ---------------------------------------------------------------------------
function montarAbaConfiguracoes() {
  const calc = modulo5.calculadoraDeImpacto;

  return criarElemento('div', { class: 'space-y-6' }, [
    montarDestaques(modulo5.destaques.configuracoes),
    ...criarSecoesDaAba('configuracoes'),

    // Etapa B: preenchido quando a continuação da pesquisa chegar.
    temLinhas(modulo5.tabelaOrdens) &&
      criarElemento('div', { class: 'space-y-4' }, [
        criarIntroducao('Os tipos de ordem lado a lado, e o que cada um exige de você.'),
        montarTabelaComparativa(modulo5.tabelaOrdens),
      ]),

    // "Como ler a tela" era prosa pura; agora é um desenho com os painéis marcados.
    criarAnatomia('telaDoTerminal', 'm5-anatomia-terminal'),

    criarFiguraDoDiagrama('slippage-mal-configurado'),

    // Depois de ver o slippage dar errado no diagrama, sentir o impacto no controle.
    calc &&
      montarCalculadora({
        id: 'm5-impacto',
        titulo: calc.titulo,
        descricao: calc.descricao,
        controles: calc.controles,
        nota: calc.nota,
        calcular: calcularImpacto,
      }),
  ]);
}

// ---------------------------------------------------------------------------
// Aba 5 — Erros (erros de execução + bots de sniping)
// ---------------------------------------------------------------------------
function montarLinhaDoErro(erro) {
  return criarElemento('li', { class: 'rounded-card border border-borda bg-superficie p-5' }, [
    criarElemento('h3', { class: 'text-base font-semibold' }, [erro.titulo]),
    criarElemento('div', { class: 'mt-3 grid gap-3 sm:grid-cols-2' }, [
      criarElemento('div', {}, [
        criarElemento(
          'p',
          { class: 'text-xs font-semibold uppercase tracking-wide text-texto-suave' },
          ['O que a pessoa faz'],
        ),
        criarElemento('p', { class: 'mt-1 text-sm text-texto-suave' }, [erro.oQueFaz]),
      ]),
      criarElemento('div', {}, [
        criarElemento(
          'p',
          { class: 'text-xs font-semibold uppercase tracking-wide text-texto-suave' },
          ['Como se previne'],
        ),
        criarElemento('p', { class: 'mt-1 text-sm text-texto-suave' }, [erro.comoPrevenir]),
      ]),
    ]),
  ]);
}

function montarAbaErros() {
  return criarElemento('div', { class: 'space-y-6' }, [
    montarDestaques(modulo5.destaques.erros),
    ...criarSecoesDaAba('erros'),
    criarAnatomia('tokenImpostor', 'm5-anatomia-impostor'),

    // Etapa B.
    modulo5.errosComuns.length > 0 &&
      criarElemento('ol', { class: 'space-y-4' }, modulo5.errosComuns.map(montarLinhaDoErro)),
  ]);
}

// ---------------------------------------------------------------------------
// Aba 6 — Processo (imposto, fluxo de decisão, checklist)
// ---------------------------------------------------------------------------
function montarAbaProcesso() {
  return criarElemento('div', { class: 'space-y-6' }, [
    montarDestaques(modulo5.destaques.processo),
    ...criarSecoesDaAba('processo'),
    criarFiguraDoDiagrama('fluxo-de-decisao'),

    // Etapa B.
    modulo5.checklistExecucao.length > 0 &&
      criarCard([
        criarElemento('h2', { class: 'text-lg font-semibold' }, ['Checklist de execução']),
        criarElemento('p', { class: 'mt-2 mb-4 text-sm text-texto-suave' }, [
          'Antes de clicar em comprar. Fica salvo no seu navegador.',
        ]),
        montarChecklist({
          id: 'modulo-5-execucao',
          itens: modulo5.checklistExecucao,
          rotuloProgresso: 'Progresso do checklist de execução',
        }),
      ]),
  ]);
}

// ---------------------------------------------------------------------------
// Aba 7 — Quiz + conclusão + fontes
// ---------------------------------------------------------------------------
function montarConclusao() {
  const container = criarCard([]);

  function estaConcluido() {
    return (obterEstado().modulosConcluidos ?? []).includes(modulo5.id);
  }

  function alternar() {
    const concluido = estaConcluido();
    const salvou = atualizar((estado) => {
      const lista = new Set(estado.modulosConcluidos ?? []);
      if (concluido) lista.delete(modulo5.id);
      else lista.add(modulo5.id);
      return { ...estado, modulosConcluidos: [...lista] };
    });

    renderizar();
    if (!salvou) mostrarToast('Não consegui salvar o progresso');
    else mostrarToast(concluido ? 'Módulo desmarcado' : 'Módulo 5 concluído. Progresso salvo');
  }

  function renderizar() {
    const concluido = estaConcluido();
    container.replaceChildren(
      criarElemento('h2', { class: 'text-lg font-semibold' }, ['Terminou o módulo?']),
      criarElemento('p', { class: 'mt-2 mb-4 text-sm text-texto-suave' }, [
        concluido
          ? 'Módulo 5 marcado como concluído. Ele conta na barra de progresso do topo.'
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

// Lista de fontes e itens não verificados — recolhida por padrão, no mesmo padrão
// do Módulo 1.
function montarFontesEVerificacao() {
  return criarElemento(
    'details',
    { class: 'group rounded-card border border-borda bg-superficie p-5' },
    [
      criarElemento(
        'summary',
        { class: 'flex cursor-pointer list-none items-center justify-between text-sm font-medium' },
        [
          criarElemento('span', {}, ['Fontes e itens não verificados']),
          criarElemento(
            'span',
            {
              class: 'text-texto-suave transition-transform duration-150 group-open:rotate-180',
              'aria-hidden': 'true',
            },
            ['▾'],
          ),
        ],
      ),

      modulo5.naoVerificado.length > 0 &&
        criarElemento('div', { class: 'mt-4' }, [
          criarElemento('h3', { class: 'text-sm font-semibold' }, ['Não verificado']),
          criarElemento(
            'ul',
            { class: 'mt-2 space-y-3' },
            modulo5.naoVerificado.map((item) =>
              criarElemento(
                'li',
                {
                  class:
                    'rounded-lg border border-risco-medio/40 bg-risco-medio/10 p-3 text-sm ' +
                    'text-texto-suave',
                },
                [criarElemento('strong', { class: 'text-texto' }, [item.titulo + ': ']), item.texto],
              ),
            ),
          ),
        ]),

      criarElemento('h3', { class: 'mt-4 text-sm font-semibold' }, ['Fontes consultadas']),
      criarElemento(
        'ul',
        { class: 'mt-2 space-y-1 text-sm text-texto-suave' },
        modulo5.fontes.map((fonte) =>
          criarElemento('li', {}, [
            fonte.titulo + ' — ' + fonte.url + ' (consulta em ' + fonte.consultadoEm + ')',
          ]),
        ),
      ),
    ],
  );
}

function montarAbaQuiz() {
  return criarElemento('div', { class: 'space-y-6' }, [
    montarQuiz({
      id: modulo5.id,
      titulo: 'Mini-quiz do Módulo 5',
      descricao: 'As respostas ficam salvas no navegador.',
      perguntas: modulo5.quiz,
    }),
    montarConclusao(),
    montarFontesEVerificacao(),
  ]);
}

// ---------------------------------------------------------------------------
// Montagem da página
// ---------------------------------------------------------------------------
export function montarModulo5() {
  const cabecalho = criarElemento('div', {}, [
    criarTitulo('Módulo 5 — A mecânica da execução', { subtitulo: modulo5.resumo }),
    criarElemento(
      'p',
      {
        class:
          'mb-6 rounded-card border border-risco-medio/40 bg-risco-medio/10 p-3 text-sm ' +
          'text-texto-suave',
      },
      [
        criarElemento('strong', { class: 'text-texto' }, ['Lembrete: ']),
        'este módulo é mecânico. Nomes de plataformas aparecem só como exemplo da ' +
          'categoria, nunca como recomendação, e nada aqui aumenta chance de lucro — o ' +
          'objetivo é reduzir erro de operação. Como o Módulo 2 mostrou, a maioria das ' +
          'memecoins vai a zero. Nada aqui é aconselhamento financeiro ou tributário.',
      ],
    ),
  ]);

  const abas = criarAbas({
    id: 'modulo-5',
    rotulo: 'Seções do Módulo 5',
    abas: [
      {
        id: 'terminal',
        rotulo: 'Terminal',
        montar: montarAbaTerminal,
        sempreRemontar: true,
        aoAtivar: redesenharDiagramasDoPainel,
      },
      { id: 'custodia', rotulo: 'Custódia', montar: montarAbaCustodia },
      {
        id: 'taxas',
        rotulo: 'Taxas',
        montar: montarAbaTaxas,
        sempreRemontar: true,
        aoAtivar: redesenharDiagramasDoPainel,
      },
      {
        id: 'configuracoes',
        rotulo: 'Configurações',
        montar: montarAbaConfiguracoes,
        sempreRemontar: true,
        aoAtivar: redesenharDiagramasDoPainel,
      },
      { id: 'erros', rotulo: 'Erros', montar: montarAbaErros },
      {
        id: 'processo',
        rotulo: 'Processo',
        montar: montarAbaProcesso,
        sempreRemontar: true,
        aoAtivar: redesenharDiagramasDoPainel,
      },
      { id: 'quiz', rotulo: 'Quiz', montar: montarAbaQuiz },
    ],
  });

  return criarElemento('div', { class: 'mx-auto max-w-5xl' }, [cabecalho, abas]);
}
