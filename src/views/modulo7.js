// views/modulo7.js — monta a página do Módulo 7 a partir de src/data/modulo7.js.
//
// Abas internas (padrão ARIA de tabs, vindo de ui.js):
//   A regra · Tamanho · O diário · A revisão · Números que circulam · Quiz
//
// Cada aba escolhe as seções por id, para intercalar texto, desenho, tabela e
// calculadora na ordem do arco didático do hub: gancho → explicação → visual →
// ferramenta.

import { modulo7 } from '../data/modulo7.js';
import {
  criarElemento,
  criarTitulo,
  criarCard,
  criarBotao,
  criarAbas,
  mostrarToast,
} from '../ui.js';
import { montarTabelaComparativa } from '../components/comparisonTable.js';
import { montarQuiz } from '../components/quiz.js';
import { montarDiagrama, renderizarDiagrama } from '../components/diagrama.js';
import { montarCalculadora } from '../components/calculadora.js';
import { montarDestaques } from '../components/destaques.js';
import { obterEstado, atualizar } from '../store.js';

// Card de uma seção de texto: título, parágrafos e, se houver, uma lista com título.
function criarCardDaSecao(secao) {
  return criarCard([
    criarElemento('h2', { class: 'text-lg font-semibold' }, [secao.titulo]),
    ...secao.paragrafos.map((paragrafo) =>
      criarElemento('p', { class: 'mt-3 text-texto-suave' }, [paragrafo]),
    ),
    secao.listaTitulo &&
      criarElemento('p', { class: 'mt-4 text-sm font-semibold text-texto' }, [secao.listaTitulo]),
    secao.lista &&
      criarElemento(
        'ul',
        { class: 'mt-3 list-disc space-y-2 pl-5 text-texto-suave' },
        secao.lista.map((item) => criarElemento('li', {}, [item])),
      ),
  ]);
}

// Uma seção pelo id. Devolve null se não existir, para a aba montar sem condicional.
function secao(id) {
  const dados = modulo7.secoes.find((item) => item.id === id);
  return dados ? criarCardDaSecao(dados) : null;
}

// Figura de um diagrama pelo id em modulo7.diagramas.
function criarFiguraDoDiagrama(id) {
  const dados = modulo7.diagramas.find((diagrama) => diagrama.id === id);
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
    rotuloAcessivel: dados.titulo + '. ' + dados.versaoEmTexto.join(' '),
    mensagemErroSintaxe: 'no diagrama "' + dados.id + '", no arquivo src/data/modulo7.js',
  });
}

// Mermaid mede o elemento para desenhar; num painel escondido tudo mede zero.
function redesenharDiagramasDoPainel(painel) {
  painel.querySelectorAll('[data-diagrama]').forEach(renderizarDiagrama);
}

// Um bloco com título e tabela comparativa.
function criarTabela(titulo, tabela) {
  if (!tabela?.linhas?.length) return null;
  return criarElemento('div', { class: 'space-y-4' }, [
    criarElemento('h2', { class: 'text-lg font-semibold' }, [titulo]),
    montarTabelaComparativa(tabela),
  ]);
}

// Card-link para outra página do hub.
function criarLink(href, titulo, texto) {
  return criarElemento(
    'a',
    {
      href,
      class:
        'block rounded-card border border-primaria/50 bg-primaria/10 p-5 transition-colors ' +
        'duration-150 hover:border-primaria',
    },
    [
      criarElemento('p', { class: 'text-base font-semibold text-texto' }, [titulo + ' →']),
      criarElemento('p', { class: 'mt-1 text-sm text-texto-suave' }, [texto]),
    ],
  );
}

// Porcentagem em pt-BR: uma casa decimal abaixo de 10%, nenhuma acima.
function pct(fracao) {
  const valor = fracao * 100;
  return valor.toLocaleString('pt-BR', { maximumFractionDigits: valor < 10 ? 1 : 0 }) + '%';
}

// A conta da calculadora.
//
// Cada posição perdida vai a zero e a fração é recalculada sobre o que sobrou.
// Depois de n perdas com a fração f, sobra (1 − f)ⁿ. Para voltar ao começo, o
// capital que sobrou precisa render 1 ÷ (1 − f)ⁿ − 1. E a quantidade de perdas
// seguidas até sobrar metade é o menor k com (1 − f)ᵏ ≤ 0,5.
function calcularSequencia({ fracao, perdas }) {
  const f = fracao / 100;
  const sobra = Math.pow(1 - f, perdas);
  const ganhoParaVoltar = 1 / sobra - 1;
  const ateMetade = Math.ceil(Math.log(0.5) / Math.log(1 - f));

  // A mesma sequência de perdas, com outras frações, para mostrar o formato da curva.
  const barras = [2, 5, 10, 25, 50].map((outraFracao) => {
    const sobraDaOutra = Math.pow(1 - outraFracao / 100, perdas);
    return {
      rotulo: outraFracao + '% em cada posição',
      percentual: sobraDaOutra * 100,
      valor: 'sobra ' + pct(sobraDaOutra),
    };
  });

  return {
    destaques: [
      {
        rotulo: 'Capital que sobra',
        valor: pct(sobra),
        nota: 'Depois de ' + perdas + (perdas === 1 ? ' perda total' : ' perdas totais seguidas') + ', com ' + fracao + '% em cada posição.',
        tom: sobra < 0.5 ? 'alerta' : 'neutro',
      },
      {
        rotulo: 'Ganho necessário para voltar ao começo',
        valor: '+' + pct(ganhoParaVoltar),
        nota: 'Sobre o capital que sobrou.',
        tom: ganhoParaVoltar >= 1 ? 'alerta' : 'neutro',
      },
      {
        rotulo: 'Perdas totais seguidas até sobrar metade',
        valor: String(ateMetade),
        nota: 'Com ' + fracao + '% em cada posição.',
      },
    ],
    barras,
    aviso:
      sobra < 0.5
        ? 'Com essa fração, essa sequência leva mais da metade do capital. Em memecoin, uma posição ir a zero é o caso comum, não o extremo.'
        : null,
  };
}

// ---------------------------------------------------------------------------
// Aba 1 — A regra
// ---------------------------------------------------------------------------
function montarAbaRegra() {
  const objetivos = criarCard([
    criarElemento('h2', { class: 'text-lg font-semibold' }, ['O que você leva deste módulo']),
    criarElemento(
      'ul',
      { class: 'mt-3 list-disc space-y-2 pl-5 text-texto-suave' },
      modulo7.objetivos.map((objetivo) => criarElemento('li', {}, [objetivo])),
    ),
  ]);

  return criarElemento('div', { class: 'space-y-6' }, [
    objetivos,
    montarDestaques(modulo7.destaques.regra),
    secao('por-que-antes'),
    secao('o-que-a-regra-tem'),
    criarFiguraDoDiagrama('ciclo'),
    secao('pre-compromisso'),
    secao('stop-automatico'),
    criarLink(
      '#/checklist',
      'Checklist antes de comprar',
      'O filtro que vem antes do gatilho da sua regra, com o fluxograma da decisão.',
    ),
  ]);
}

// ---------------------------------------------------------------------------
// Aba 2 — Tamanho
// ---------------------------------------------------------------------------
function montarAbaTamanho() {
  const calc = modulo7.calculadoraDeSequencia;

  return criarElemento('div', { class: 'space-y-6' }, [
    montarDestaques(modulo7.destaques.tamanho),
    secao('fracao-fixa'),
    secao('kelly'),
    secao('ruina'),
    secao('a-conta'),
    montarCalculadora({
      id: 'm7-sequencia',
      titulo: calc.titulo,
      descricao: calc.descricao,
      controles: calc.controles,
      nota: calc.nota,
      calcular: calcularSequencia,
    }),
  ]);
}

// ---------------------------------------------------------------------------
// Aba 3 — O diário
// ---------------------------------------------------------------------------
function montarAbaDiario() {
  return criarElemento('div', { class: 'space-y-6' }, [
    montarDestaques(modulo7.destaques.diario),
    secao('duas-frases'),
    secao('o-tamanho-do-efeito'),
    secao('nove-campos'),
    montarTabelaComparativa(modulo7.tabelaCampos),
  ]);
}

// ---------------------------------------------------------------------------
// Aba 4 — A revisão
// ---------------------------------------------------------------------------
function montarAbaRevisao() {
  return criarElemento('div', { class: 'space-y-6' }, [
    montarDestaques(modulo7.destaques.revisao),
    secao('olhar-pouco'),
    secao('a-pergunta'),
    secao('amostra'),
  ]);
}

// ---------------------------------------------------------------------------
// Aba 5 — Números que circulam
// ---------------------------------------------------------------------------
function montarAbaMitos() {
  return criarElemento('div', { class: 'space-y-6' }, [
    montarDestaques(modulo7.destaques.mitos),
    secao('por-que-circulam'),
    criarTabela('O número que circula, e o dado real', modulo7.tabelaMitos),
  ]);
}

// ---------------------------------------------------------------------------
// Aba 6 — Quiz + conclusão + fontes
// ---------------------------------------------------------------------------
function montarConclusao() {
  const container = criarCard([]);

  function estaConcluido() {
    return (obterEstado().modulosConcluidos ?? []).includes(modulo7.id);
  }

  function alternar() {
    const concluido = estaConcluido();
    const salvou = atualizar((estado) => {
      const lista = new Set(estado.modulosConcluidos ?? []);
      if (concluido) lista.delete(modulo7.id);
      else lista.add(modulo7.id);
      return { ...estado, modulosConcluidos: [...lista] };
    });

    renderizar();
    if (!salvou) mostrarToast('Não consegui salvar o progresso');
    else mostrarToast(concluido ? 'Módulo desmarcado' : 'Módulo 7 concluído. Progresso salvo');
  }

  function renderizar() {
    const concluido = estaConcluido();
    container.replaceChildren(
      criarElemento('h2', { class: 'text-lg font-semibold' }, ['Terminou o módulo?']),
      criarElemento('p', { class: 'mt-2 mb-4 text-sm text-texto-suave' }, [
        concluido
          ? 'Módulo 7 marcado como concluído. Ele conta na barra de progresso do topo.'
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
      criarElemento('h3', { class: 'mt-4 text-sm font-semibold' }, ['Não verificado']),
      criarElemento(
        'ul',
        { class: 'mt-2 space-y-3' },
        modulo7.naoVerificado.map((item) =>
          criarElemento(
            'li',
            {
              class:
                'rounded-lg border border-risco-medio/40 bg-risco-medio/10 p-3 text-sm text-texto-suave',
            },
            [criarElemento('strong', { class: 'text-texto' }, [item.titulo + ': ']), item.texto],
          ),
        ),
      ),
      criarElemento('h3', { class: 'mt-4 text-sm font-semibold' }, ['Fontes consultadas']),
      criarElemento(
        'ul',
        { class: 'mt-2 space-y-1 text-sm text-texto-suave' },
        modulo7.fontes.map((fonte) =>
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
      id: modulo7.id,
      titulo: 'Mini-quiz do Módulo 7',
      descricao: modulo7.quiz.length + ' perguntas. As respostas ficam salvas no navegador.',
      perguntas: modulo7.quiz,
    }),
    montarConclusao(),
    montarFontesEVerificacao(),
  ]);
}

// ---------------------------------------------------------------------------
// Montagem da página
// ---------------------------------------------------------------------------
export function montarModulo7() {
  const cabecalho = criarElemento('div', {}, [
    criarTitulo('Módulo 7 — A rotina', { subtitulo: modulo7.resumo }),
    criarElemento(
      'p',
      {
        class:
          'mb-6 rounded-card border border-risco-medio/40 bg-risco-medio/10 p-3 text-sm ' +
          'text-texto-suave',
      },
      [
        criarElemento('strong', { class: 'text-texto' }, ['Lembrete: ']),
        'este módulo não escreve a sua regra de entrada nem diz quanto colocar. Ele mostra a ' +
          'forma de uma regra testável e a matemática por trás do tamanho e da revisão.',
      ],
    ),
  ]);

  const abas = criarAbas({
    id: 'modulo-7',
    rotulo: 'Seções do Módulo 7',
    abas: [
      {
        id: 'regra',
        rotulo: 'A regra',
        montar: montarAbaRegra,
        sempreRemontar: true,
        aoAtivar: redesenharDiagramasDoPainel,
      },
      { id: 'tamanho', rotulo: 'Tamanho', montar: montarAbaTamanho },
      { id: 'diario', rotulo: 'O diário', montar: montarAbaDiario },
      { id: 'revisao', rotulo: 'A revisão', montar: montarAbaRevisao },
      { id: 'mitos', rotulo: 'Números que circulam', montar: montarAbaMitos },
      { id: 'quiz', rotulo: 'Quiz', montar: montarAbaQuiz },
    ],
  });

  return criarElemento('div', { class: 'mx-auto max-w-5xl' }, [cabecalho, abas]);
}
