// views/modulo1.js — monta a página do Módulo 1 a partir de src/data/modulo1.js.
//
// Abas internas (padrão ARIA de tabs, vindo de ui.js):
//   Fundamentos · Carteiras · Seed phrase · Golpes · Defesa · Brasil · Quiz
//
// As abas com diagrama (Carteiras, Golpes, Defesa, Brasil) usam sempreRemontar,
// igual ao Módulo 2: o Mermaid precisa ser redesenhado toda vez que a aba volta a
// aparecer (ver src/components/diagrama.js).

import { modulo1 } from '../data/modulo1.js';
import {
  criarElemento,
  criarTitulo,
  criarCard,
  criarBotao,
  criarAbas,
  mostrarToast,
} from '../ui.js';
import { montarChecklist } from '../components/checklist.js';
import { montarTabelaComparativa } from '../components/comparisonTable.js';
import { montarQuiz } from '../components/quiz.js';
import { montarDiagrama, renderizarDiagrama } from '../components/diagrama.js';
import { montarDestaques } from '../components/destaques.js';
import { montarAnatomia } from '../components/anatomia.js';
import { montarLinhaDoTempo } from '../components/linhaDoTempo.js';
import { montarVideo } from '../components/video.js';
import { obterEstado, atualizar } from '../store.js';

// Parágrafo de apoio usado no topo de várias abas.
function criarIntroducao(texto) {
  return criarElemento('p', { class: 'max-w-3xl text-texto-suave' }, [texto]);
}

// Card de uma seção de texto, no formato de src/data/modulo2.js. Quando a seção
// marca `ordenada: true` (passo a passo, como "criar a primeira carteira" ou o
// "plano de emergência"), a lista vira <ol> — sem isso, ela ganharia ao mesmo
// tempo o marcador de bullet do <ul> e o número que já está escrito no texto.
function criarCardDaSecao(secao) {
  return criarCard([
    criarElemento('h2', { class: 'text-lg font-semibold' }, [secao.titulo]),
    ...secao.paragrafos.map((paragrafo) =>
      criarElemento('p', { class: 'mt-3 text-texto-suave' }, [paragrafo]),
    ),

    // Duas sequências de passos numeradas de forma independente (ex.: "no
    // Revoke.cash" e "no Etherscan") — cada uma com o próprio <ol>, para a
    // numeração não continuar de uma para a outra.
    ...(secao.subListas ?? []).map((sub) =>
      criarElemento('div', { class: 'mt-4' }, [
        criarElemento('h3', { class: 'text-sm font-semibold text-acento' }, [sub.titulo]),
        criarElemento(
          'ol',
          { class: 'mt-2 list-decimal space-y-2 pl-5 text-texto-suave' },
          sub.passos.map((passo) => criarElemento('li', {}, [passo])),
        ),
      ]),
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
  ]);
}

// Seções de texto que pertencem a uma aba inteira, na ordem em que aparecem em
// modulo1.secoes.
function criarSecoesDaAba(idDaAba) {
  return modulo1.secoes.filter((secao) => secao.aba === idDaAba).map(criarCardDaSecao);
}

// Uma única seção, buscada pelo id — usado para intercalar diagramas entre
// seções específicas (ver a aba "Defesa", que tem duas figuras).
function criarSecaoPorId(id) {
  const secao = modulo1.secoes.find((item) => item.id === id);
  return secao ? criarCardDaSecao(secao) : null;
}

// Monta a figura de um diagrama a partir do id em modulo1.diagramas. Devolve null
// se o id não existir, para o chamador poder ignorar sem quebrar a página.
function criarFiguraDoDiagrama(id) {
  const dados = modulo1.diagramas.find((diagrama) => diagrama.id === id);
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
    mensagemErroSintaxe: 'no diagrama "' + dados.id + '", no arquivo src/data/modulo1.js',
  });
}

// Redesenha todo diagrama presente no painel — usado no aoAtivar das abas que têm
// mais de uma figura (ex.: a aba "Defesa" tem duas).
function redesenharDiagramasDoPainel(painel) {
  painel.querySelectorAll('[data-diagrama]').forEach(renderizarDiagrama);
}

// Monta uma anatomia a partir de modulo1.anatomias[chave]. Devolve null se não
// existir, para a view poder listar sem condicional.
function criarAnatomia(chave, id) {
  const dados = modulo1.anatomias?.[chave];
  return dados ? montarAnatomia({ id, ...dados }) : null;
}

// Vídeo pela chave em modulo1.videos. Devolve null se não existir, para a aba
// continuar montando normalmente enquanto um vídeo ainda não foi gravado.
function criarVideo(chave) {
  const dados = modulo1.videos?.[chave];
  return dados ? montarVideo({ id: 'm1-video-' + chave, ...dados }) : null;
}

// Seções de uma aba, com um elemento extra intercalado logo depois de uma seção
// específica — para a anatomia entrar exatamente onde o texto a introduz.
// `extras` é um mapa { idDaSecao: elemento }: cada elemento entra logo DEPOIS da
// seção de mesmo id. Assim um vídeo ou uma anatomia aparece junto do texto que
// ele ilustra, em vez de empilhado no fim da aba. Id que não existir é ignorado
// (não quebra a aba se uma seção for renomeada).
function criarSecoesComIntervalo(idDaAba, extras = {}) {
  const secoes = modulo1.secoes.filter((secao) => secao.aba === idDaAba);

  return secoes.flatMap((secao) => {
    const extra = extras[secao.id];
    return extra ? [criarCardDaSecao(secao), extra] : [criarCardDaSecao(secao)];
  });
}

// ---------------------------------------------------------------------------
// Aba 1 — Fundamentos
// ---------------------------------------------------------------------------
function montarAbaFundamentos() {
  const objetivos = criarCard([
    criarElemento('h2', { class: 'text-lg font-semibold' }, ['O que você leva deste módulo']),
    criarElemento(
      'ul',
      { class: 'mt-3 list-disc space-y-2 pl-5 text-texto-suave' },
      modulo1.objetivos.map((objetivo) => criarElemento('li', {}, [objetivo])),
    ),
  ]);

  // A anatomia da transação entra logo depois da seção que ensina a ler uma.
  return criarElemento('div', { class: 'space-y-6' }, [
    objetivos,
    montarDestaques(modulo1.destaques.fundamentos),
    ...criarSecoesComIntervalo('fundamentos', {
      'explorador-de-blocos': criarAnatomia('transacao', 'm1-anatomia-transacao'),
      'gas-taxa-de-rede': criarVideo('mecanica-do-gas'),
    }),
  ]);
}

// ---------------------------------------------------------------------------
// Aba 2 — Carteiras (tabela comparativa + diagrama)
// ---------------------------------------------------------------------------
function montarAbaCarteiras() {
  const figura = criarFiguraDoDiagrama('quem-guarda-chave');

  return criarElemento('div', { class: 'space-y-6' }, [
    montarDestaques(modulo1.destaques.carteiras),
    ...criarSecoesDaAba('carteiras'),
    criarIntroducao(
      'Compare as três categorias lado a lado. Clique em "Ver mais" para o detalhe de cada uma.',
    ),
    montarTabelaComparativa(modulo1.tabelaCarteiras),
    figura,
  ]);
}

// ---------------------------------------------------------------------------
// Aba 3 — Seed phrase (checklist)
// ---------------------------------------------------------------------------
function montarAbaSeed() {
  return criarElemento('div', { class: 'space-y-6' }, [
    montarDestaques(modulo1.destaques.seed),
    ...criarSecoesDaAba('seed'),
    // A tela de backup vem antes do checklist: primeiro ver onde se erra, depois
    // marcar o que já fez certo.
    criarAnatomia('telaDeBackup', 'm1-anatomia-backup'),
    criarCard([
      criarElemento('h2', { class: 'text-lg font-semibold' }, ['Checklist de segurança']),
      criarElemento('p', { class: 'mt-2 mb-4 text-sm text-texto-suave' }, [
        'Marque conforme for aplicando. Fica salvo no seu navegador.',
      ]),
      montarChecklist({
        id: 'modulo-1-seguranca-seed',
        itens: modulo1.checklistSeguranca,
        rotuloProgresso: 'Progresso do checklist de segurança',
      }),
    ]),
  ]);
}

// ---------------------------------------------------------------------------
// Aba 4 — Golpes (roteiro do drainer + diagrama)
// ---------------------------------------------------------------------------
function montarLinhaDoRoteiro(passo) {
  return criarElemento(
    'li',
    { class: 'rounded-card border border-borda bg-superficie p-5' },
    [
      criarElemento('h3', { class: 'text-base font-semibold' }, [
        passo.numero + '. ' + passo.titulo,
      ]),
      criarElemento('div', { class: 'mt-3 grid gap-3 sm:grid-cols-2' }, [
        criarElemento('div', {}, [
          criarElemento('p', { class: 'text-xs font-semibold uppercase tracking-wide text-texto-suave' }, [
            'O que a vítima vê',
          ]),
          criarElemento('p', { class: 'mt-1 text-sm text-texto-suave' }, [passo.oQueVeem]),
        ]),
        criarElemento('div', {}, [
          criarElemento(
            'p',
            { class: 'text-xs font-semibold uppercase tracking-wide text-texto-suave' },
            ['O que está de fato acontecendo'],
          ),
          criarElemento('p', { class: 'mt-1 text-sm text-texto-suave' }, [passo.oQueAcontece]),
        ]),
      ]),
    ],
  );
}

function montarAbaGolpes() {
  const figura = criarFiguraDoDiagrama('roteiro-drainer');

  return criarElemento('div', { class: 'space-y-6' }, [
    montarDestaques(modulo1.destaques.golpes),
    ...criarSecoesDaAba('golpes'),
    // O site de phishing é a "isca" do roteiro que vem logo abaixo.
    criarAnatomia('sitePhishing', 'm1-anatomia-phishing'),
    figura,
    criarElemento(
      'ol',
      { class: 'space-y-4' },
      modulo1.roteiroDrainer.map(montarLinhaDoRoteiro),
    ),
  ]);
}

// ---------------------------------------------------------------------------
// Aba 5 — Defesa (revogação, duas camadas do Permit2, plano de emergência)
// ---------------------------------------------------------------------------
function montarAbaDefesa() {
  // As seções ficam intercaladas com as duas figuras, cada uma logo depois do
  // texto que ela ilustra — a lista solta em modulo1.secoes não tem essa noção
  // de posição, por isso a ordem é montada aqui.
  return criarElemento('div', { class: 'space-y-6' }, [
    montarDestaques(modulo1.destaques.defesa),
    criarSecaoPorId('revogar-aprovacoes'),
    // O pop-up de assinatura é onde a aprovação ilimitada — que a revogação
    // depois desfaz — é concedida. Ler antes de assinar evita ter que revogar.
    criarAnatomia('telaDeAssinatura', 'm1-anatomia-assinatura'),
    criarSecaoPorId('duas-camadas-permit2-e-eip7702'),
    criarFiguraDoDiagrama('permit2-camadas'),
    criarSecaoPorId('tutorial-revogar-clique-a-clique'),
    criarSecaoPorId('plano-de-emergencia'),
    criarFiguraDoDiagrama('plano-emergencia'),
  ]);
}

// ---------------------------------------------------------------------------
// Aba 6 — Brasil (sacar para reais, regulação, golpes locais)
// ---------------------------------------------------------------------------
function montarAbaBrasil() {
  const figura = criarFiguraDoDiagrama('cripto-para-reais');

  const cronologia = modulo1.linhaDoTempoRegulacao;

  return criarElemento('div', { class: 'space-y-6' }, [
    montarDestaques(modulo1.destaques.brasil),
    ...criarSecoesDaAba('brasil'),
    cronologia && montarLinhaDoTempo({ id: 'm1-cronologia', ...cronologia }),
    figura,
  ]);
}

// ---------------------------------------------------------------------------
// Aba 7 — Quiz + conclusão + fontes
// ---------------------------------------------------------------------------
function montarConclusao() {
  const container = criarCard([]);

  function estaConcluido() {
    return (obterEstado().modulosConcluidos ?? []).includes(modulo1.id);
  }

  function alternar() {
    const concluido = estaConcluido();
    const salvou = atualizar((estado) => {
      const lista = new Set(estado.modulosConcluidos ?? []);
      if (concluido) lista.delete(modulo1.id);
      else lista.add(modulo1.id);
      return { ...estado, modulosConcluidos: [...lista] };
    });

    renderizar();
    if (!salvou) mostrarToast('Não consegui salvar o progresso');
    else mostrarToast(concluido ? 'Módulo desmarcado' : 'Módulo 1 concluído. Progresso salvo');
  }

  function renderizar() {
    const concluido = estaConcluido();
    container.replaceChildren(
      criarElemento('h2', { class: 'text-lg font-semibold' }, ['Terminou o módulo?']),
      criarElemento('p', { class: 'mt-2 mb-4 text-sm text-texto-suave' }, [
        concluido
          ? 'Módulo 1 marcado como concluído. Ele conta na barra de progresso do topo.'
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

// Lista de fontes e itens não verificados — fica recolhida por padrão para não
// competir com o resultado do quiz, mas continua acessível a quem quiser conferir.
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

      modulo1.naoVerificado.length > 0 &&
        criarElemento('div', { class: 'mt-4' }, [
          criarElemento('h3', { class: 'text-sm font-semibold' }, ['Não verificado']),
          criarElemento(
            'ul',
            { class: 'mt-2 space-y-3' },
            modulo1.naoVerificado.map((item) =>
              criarElemento(
                'li',
                {
                  class:
                    'rounded-lg border border-risco-medio/40 bg-risco-medio/10 p-3 text-sm ' +
                    'text-texto-suave',
                },
                [
                  criarElemento('strong', { class: 'text-texto' }, [item.titulo + ': ']),
                  item.texto,
                ],
              ),
            ),
          ),
        ]),

      criarElemento('h3', { class: 'mt-4 text-sm font-semibold' }, ['Fontes consultadas']),
      criarElemento(
        'ul',
        { class: 'mt-2 space-y-1 text-sm text-texto-suave' },
        modulo1.fontes.map((fonte) =>
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
      id: modulo1.id,
      titulo: 'Mini-quiz do Módulo 1',
      descricao: 'As respostas ficam salvas no navegador.',
      perguntas: modulo1.quiz,
    }),
    montarConclusao(),
    montarFontesEVerificacao(),
  ]);
}

// ---------------------------------------------------------------------------
// Montagem da página
// ---------------------------------------------------------------------------
export function montarModulo1() {
  const cabecalho = criarElemento('div', {}, [
    criarTitulo('Módulo 1 — Fundamentos & Segurança', { subtitulo: modulo1.resumo }),
    criarElemento(
      'p',
      {
        class:
          'mb-6 rounded-card border border-risco-medio/40 bg-risco-medio/10 p-3 text-sm ' +
          'text-texto-suave',
      },
      [
        criarElemento('strong', { class: 'text-texto' }, ['Lembrete: ']),
        'este módulo ensina segurança e fundamentos técnicos. Nomes de carteiras e ' +
          'corretoras aparecem só como exemplos de categoria, nunca como recomendação.',
      ],
    ),
  ]);

  const abas = criarAbas({
    id: 'modulo-1',
    rotulo: 'Seções do Módulo 1',
    abas: [
      { id: 'fundamentos', rotulo: 'Fundamentos', montar: montarAbaFundamentos },
      {
        id: 'carteiras',
        rotulo: 'Carteiras',
        montar: montarAbaCarteiras,
        sempreRemontar: true,
        aoAtivar: redesenharDiagramasDoPainel,
      },
      { id: 'seed', rotulo: 'Seed phrase', montar: montarAbaSeed },
      {
        id: 'golpes',
        rotulo: 'Golpes',
        montar: montarAbaGolpes,
        sempreRemontar: true,
        aoAtivar: redesenharDiagramasDoPainel,
      },
      {
        id: 'defesa',
        rotulo: 'Defesa',
        montar: montarAbaDefesa,
        sempreRemontar: true,
        aoAtivar: redesenharDiagramasDoPainel,
      },
      {
        id: 'brasil',
        rotulo: 'Brasil',
        montar: montarAbaBrasil,
        sempreRemontar: true,
        aoAtivar: redesenharDiagramasDoPainel,
      },
      { id: 'quiz', rotulo: 'Quiz', montar: montarAbaQuiz },
    ],
  });

  return criarElemento('div', { class: 'mx-auto max-w-5xl' }, [cabecalho, abas]);
}
