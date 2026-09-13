// views/modulo6.js — monta a página do Módulo 6 a partir de src/data/modulo6.js.
//
// Abas internas (padrão ARIA de tabs, vindo de ui.js):
//   Os números · Volume falso · O contrato · Prever o golpe · Quiz
//
// Cada aba escolhe as seções por id, para intercalar texto, desenho, tabela e
// calculadora na ordem do arco didático do hub: gancho → explicação → visual →
// ferramenta.

import { modulo6 } from '../data/modulo6.js';
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
import { montarAnatomia } from '../components/anatomia.js';
import { obterEstado, atualizar } from '../store.js';

// Parágrafo de apoio usado no topo de algumas abas.
function criarIntroducao(texto) {
  return criarElemento('p', { class: 'max-w-3xl text-texto-suave' }, [texto]);
}

// Card de uma seção de texto.
function criarCardDaSecao(secao) {
  return criarCard([
    criarElemento('h2', { class: 'text-lg font-semibold' }, [secao.titulo]),
    ...secao.paragrafos.map((paragrafo) =>
      criarElemento('p', { class: 'mt-3 text-texto-suave' }, [paragrafo]),
    ),
    secao.lista &&
      criarElemento(
        'ul',
        { class: 'mt-4 list-disc space-y-2 pl-5 text-texto-suave' },
        secao.lista.map((item) => criarElemento('li', {}, [item])),
      ),
  ]);
}

// Uma seção pelo id. Devolve null se não existir, para a aba montar sem condicional.
function secao(id) {
  const dados = modulo6.secoes.find((item) => item.id === id);
  return dados ? criarCardDaSecao(dados) : null;
}

// Figura de um diagrama pelo id em modulo6.diagramas.
function criarFiguraDoDiagrama(id) {
  const dados = modulo6.diagramas.find((diagrama) => diagrama.id === id);
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
    mensagemErroSintaxe: 'no diagrama "' + dados.id + '", no arquivo src/data/modulo6.js',
  });
}

// Mermaid mede o elemento para desenhar; num painel escondido tudo mede zero.
function redesenharDiagramasDoPainel(painel) {
  painel.querySelectorAll('[data-diagrama]').forEach(renderizarDiagrama);
}

function criarAnatomia(chave, id) {
  const dados = modulo6.anatomias?.[chave];
  return dados ? montarAnatomia({ id, ...dados }) : null;
}

// Um bloco com título e tabela comparativa.
function criarTabela(titulo, tabela) {
  if (!tabela?.linhas?.length) return null;
  return criarElemento('div', { class: 'space-y-4' }, [
    criarElemento('h2', { class: 'text-lg font-semibold' }, [titulo]),
    montarTabelaComparativa(tabela),
  ]);
}

// Card-link para a página do checklist.
function criarLinkParaChecklist(texto) {
  return criarElemento(
    'a',
    {
      href: '#/checklist',
      class:
        'block rounded-card border border-primaria/50 bg-primaria/10 p-5 transition-colors ' +
        'duration-150 hover:border-primaria',
    },
    [
      criarElemento('p', { class: 'text-base font-semibold text-texto' }, ['Checklist antes de comprar →']),
      criarElemento('p', { class: 'mt-1 text-sm text-texto-suave' }, [texto]),
    ],
  );
}

// A conta da calculadora de saída.
//
// Pool de produto constante: o lado que paga a sua venda vale metade da liquidez
// anunciada (y). Vendendo uma posição que vale V ao preço de tela, você recebe
// V · y / (y + V), e o preço fica multiplicado por (y / (y + V))². Por isso a
// fração que chega é y / (y + V), e a queda de preço é 1 − (y / (y + V))².
function calcularSaida({ posicao, liquidez }) {
  const ladoQuePaga = liquidez / 2;
  const fracaoQueChega = ladoQuePaga / (ladoQuePaga + posicao);
  const recebe = posicao * fracaoQueChega;
  const quedaDoPreco = 1 - fracaoQueChega * fracaoQueChega;

  const dolares = (n) => 'US$ ' + Math.round(n).toLocaleString('pt-BR');
  const pct = (n) => (n * 100).toFixed(1).replace('.', ',') + '%';

  // Posições de tamanhos fixos na mesma pool, para mostrar o formato da curva.
  const tamanhos = [500, 2000, 5000, 20000].map((valor) => {
    const fracao = ladoQuePaga / (ladoQuePaga + valor);
    return {
      rotulo: 'Posição de ' + dolares(valor),
      percentual: fracao * 100,
      valor: pct(fracao) + ' chega na carteira',
    };
  });

  return {
    destaques: [
      {
        rotulo: 'Você recebe vendendo tudo',
        valor: dolares(recebe),
        nota:
          'De ' + dolares(posicao) + ' na tela, ou ' + pct(fracaoQueChega) + '. O resto ficou na curva da pool.',
        tom: fracaoQueChega < 0.8 ? 'alerta' : 'neutro',
      },
      {
        rotulo: 'Queda de preço causada pela sua venda',
        valor: pct(quedaDoPreco),
        nota: 'Só a sua ordem, sem mais ninguém vendendo junto e sem taxas.',
        tom: quedaDoPreco > 0.3 ? 'alerta' : 'neutro',
      },
    ],
    barras: tamanhos,
    aviso:
      quedaDoPreco >= 0.5
        ? 'Com essa posição, a sua venda sozinha derruba o preço pela metade ou mais. Vender em partes não muda o total se ninguém comprar no meio — só acrescenta taxa.'
        : null,
  };
}

// ---------------------------------------------------------------------------
// Aba 1 — Os números
// ---------------------------------------------------------------------------
function montarAbaNumeros() {
  const objetivos = criarCard([
    criarElemento('h2', { class: 'text-lg font-semibold' }, ['O que você leva deste módulo']),
    criarElemento(
      'ul',
      { class: 'mt-3 list-disc space-y-2 pl-5 text-texto-suave' },
      modulo6.objetivos.map((objetivo) => criarElemento('li', {}, [objetivo])),
    ),
  ]);

  const calc = modulo6.calculadoraDeSaida;

  return criarElemento('div', { class: 'space-y-6' }, [
    objetivos,
    montarDestaques(modulo6.destaques.numeros),
    secao('tres-numeros'),
    criarAnatomia('numerosDaTela', 'm6-anatomia-numeros'),
    secao('quanto-sai'),
    criarTabela('Quanto sai, por queda de preço', modulo6.tabelaVendaPorQueda),
    calc &&
      montarCalculadora({
        id: 'm6-saida',
        titulo: calc.titulo,
        descricao: calc.descricao,
        controles: calc.controles,
        nota: calc.nota,
        calcular: calcularSaida,
      }),
    secao('zeros-compactados'),
    secao('pnl'),
  ]);
}

// ---------------------------------------------------------------------------
// Aba 2 — Volume falso
// ---------------------------------------------------------------------------
function montarAbaVolume() {
  return criarElemento('div', { class: 'space-y-6' }, [
    montarDestaques(modulo6.destaques.volume),
    secao('como-fabrica'),
    criarFiguraDoDiagrama('wash-trading'),
    secao('otimizado-contra'),
    secao('o-que-da-para-ver'),
    secao('bundles'),
  ]);
}

// ---------------------------------------------------------------------------
// Aba 3 — O contrato
// ---------------------------------------------------------------------------
function montarAbaContrato() {
  return criarElemento('div', { class: 'space-y-6' }, [
    montarDestaques(modulo6.destaques.contrato),
    secao('spl-ou-2022'),
    criarAnatomia('contratoNoExplorador', 'm6-anatomia-contrato'),
    secao('extensoes'),
    criarTabela('As extensões, uma a uma', modulo6.tabelaExtensoes),
    secao('autoridades'),
    secao('metadata'),
    secao('dev-dump'),
    secao('evm'),
  ]);
}

// ---------------------------------------------------------------------------
// Aba 4 — Prever o golpe
// ---------------------------------------------------------------------------
function montarAbaDeteccao() {
  return criarElemento('div', { class: 'space-y-6' }, [
    montarDestaques(modulo6.destaques.deteccao),
    secao('o-que-conta'),
    secao('melhor-detector'),
    secao('sinais'),
    criarTabela('Os sinais, pela força da evidência', modulo6.tabelaSinais),
    secao('por-que-importa'),
    criarLinkParaChecklist(
      'Os dois pilares em itens marcáveis, cada um com a etiqueta da força da evidência.',
    ),
  ]);
}

// ---------------------------------------------------------------------------
// Aba 5 — Quiz + conclusão + fontes
// ---------------------------------------------------------------------------
function montarConclusao() {
  const container = criarCard([]);

  function estaConcluido() {
    return (obterEstado().modulosConcluidos ?? []).includes(modulo6.id);
  }

  function alternar() {
    const concluido = estaConcluido();
    const salvou = atualizar((estado) => {
      const lista = new Set(estado.modulosConcluidos ?? []);
      if (concluido) lista.delete(modulo6.id);
      else lista.add(modulo6.id);
      return { ...estado, modulosConcluidos: [...lista] };
    });

    renderizar();
    if (!salvou) mostrarToast('Não consegui salvar o progresso');
    else mostrarToast(concluido ? 'Módulo desmarcado' : 'Módulo 6 concluído. Progresso salvo');
  }

  function renderizar() {
    const concluido = estaConcluido();
    container.replaceChildren(
      criarElemento('h2', { class: 'text-lg font-semibold' }, ['Terminou o módulo?']),
      criarElemento('p', { class: 'mt-2 mb-4 text-sm text-texto-suave' }, [
        concluido
          ? 'Módulo 6 marcado como concluído. Ele conta na barra de progresso do topo.'
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

      modulo6.naoVerificado.length > 0 &&
        criarElemento('div', { class: 'mt-4' }, [
          criarElemento('h3', { class: 'text-sm font-semibold' }, ['Não verificado']),
          criarElemento(
            'ul',
            { class: 'mt-2 space-y-3' },
            modulo6.naoVerificado.map((item) =>
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
        modulo6.fontes.map((fonte) =>
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
      id: modulo6.id,
      titulo: 'Mini-quiz do Módulo 6',
      descricao: 'Oito perguntas. As respostas ficam salvas no navegador.',
      perguntas: modulo6.quiz,
    }),
    montarConclusao(),
    montarFontesEVerificacao(),
  ]);
}

// ---------------------------------------------------------------------------
// Montagem da página
// ---------------------------------------------------------------------------
export function montarModulo6() {
  const cabecalho = criarElemento('div', {}, [
    criarTitulo('Módulo 6 — Ler a tela', { subtitulo: modulo6.resumo }),
    criarElemento(
      'p',
      {
        class:
          'mb-6 rounded-card border border-risco-medio/40 bg-risco-medio/10 p-3 text-sm ' +
          'text-texto-suave',
      },
      [
        criarElemento('strong', { class: 'text-texto' }, ['Lembrete: ']),
        'números e nomes de campo conferidos em setembro de 2026. Interfaces e regras de ' +
          'plataforma mudam — se um campo sumir, procure o mesmo conceito.',
      ],
    ),
  ]);

  const abas = criarAbas({
    id: 'modulo-6',
    rotulo: 'Seções do Módulo 6',
    abas: [
      { id: 'numeros', rotulo: 'Os números', montar: montarAbaNumeros },
      {
        id: 'volume',
        rotulo: 'Volume falso',
        montar: montarAbaVolume,
        sempreRemontar: true,
        aoAtivar: redesenharDiagramasDoPainel,
      },
      { id: 'contrato', rotulo: 'O contrato', montar: montarAbaContrato },
      { id: 'deteccao', rotulo: 'Prever o golpe', montar: montarAbaDeteccao },
      { id: 'quiz', rotulo: 'Quiz', montar: montarAbaQuiz },
    ],
  });

  return criarElemento('div', { class: 'mx-auto max-w-5xl' }, [cabecalho, abas]);
}
