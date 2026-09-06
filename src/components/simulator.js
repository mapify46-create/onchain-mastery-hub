// simulator.js — simulador de cenários do Módulo 4.
//
// Fluxo: um cenário por vez. O usuário escolhe entre Entrar / Esperar / Ignorar /
// Realizar parcial e recebe na hora o feedback didático, o badge de risco DAQUELA
// decisão (verde, amarelo ou vermelho) e o próximo passo técnico. Cada escolha é
// gravada no store (localStorage), então o F5 não apaga nada: ao voltar, o simulador
// reabre no primeiro cenário ainda sem resposta.
//
// No fim, o "resumo de disciplina" soma os pontos de cada escolha e devolve uma
// leitura do padrão de decisão — não do resultado financeiro, que ninguém controla.
//
// Uso:
//   montarSimulador({ cenarios, aviso: modulo4.simulador.aviso })

import {
  criarElemento,
  criarCard,
  criarBotao,
  criarBadgeRisco,
  criarBarraProgresso,
  rotuloRisco,
  mostrarToast,
} from '../ui.js';
import { obterEstado, atualizar } from '../store.js';
import { OPCOES, QUALIDADES, FAIXAS_DE_DISCIPLINA } from '../data/cenarios.js';

// Cores do rótulo de qualidade no feedback e no resumo.
const CLASSES_QUALIDADE = {
  boa: 'text-risco-baixo',
  aceitavel: 'text-risco-medio',
  ruim: 'text-risco-alto-texto',
  naoSeAplica: 'text-texto-suave',
};

// Lê o histórico salvo: { 'lancamento-sem-catalise': 'esperar', ... }
function lerEscolhas() {
  return { ...(obterEstado().simulador?.escolhas ?? {}) };
}

// Grava o histórico inteiro de uma vez (é pequeno; não vale gravar campo a campo).
function gravarEscolhas(escolhas, concluido) {
  return atualizar((estado) => ({
    ...estado,
    simulador: { ...(estado.simulador ?? {}), escolhas, concluido },
  }));
}

// Texto do botão da opção neste cenário (o cenário pode trocar, ex.: "Entrar / aumentar").
function rotuloDaOpcao(cenario, opcao) {
  return cenario.opcoes[opcao.id]?.rotulo ?? opcao.rotulo;
}

// Etiqueta pequena e neutra (tags de contexto, ferramentas).
function criarChip(texto, extra = '') {
  return criarElemento(
    'span',
    {
      class:
        'rounded-full border border-borda bg-fundo px-2.5 py-0.5 text-xs text-texto-suave ' + extra,
    },
    [texto],
  );
}

export function montarSimulador({ cenarios = [], aviso = '' } = {}) {
  const container = criarElemento('section', { class: 'space-y-6' });

  if (cenarios.length === 0) {
    container.append(criarCard([criarElemento('p', {}, ['Nenhum cenário cadastrado.'])]));
    return container;
  }

  // ---- Estado local do componente ------------------------------------------
  let escolhas = lerEscolhas();
  // Abre no primeiro cenário sem resposta; se todos já foram respondidos, abre o resumo.
  let indice = Math.max(0, cenarios.findIndex((cenario) => !escolhas[cenario.id]));
  let verResumo = respondidos() === cenarios.length;
  // Elemento que deve receber o foco depois do próximo render (acessibilidade).
  let seletorDeFoco = null;

  function respondidos() {
    return cenarios.filter((cenario) => escolhas[cenario.id]).length;
  }

  function pontuacao() {
    let pontos = 0;
    for (const cenario of cenarios) {
      const escolha = escolhas[cenario.id];
      const qualidade = cenario.opcoes[escolha]?.qualidade;
      pontos += QUALIDADES[qualidade]?.pontos ?? 0;
    }
    const maximo = cenarios.length * 2;
    return { pontos, maximo, percentual: maximo ? (pontos / maximo) * 100 : 0 };
  }

  // ---- Ações ----------------------------------------------------------------
  function escolher(idDoCenario, idDaOpcao) {
    escolhas = { ...escolhas, [idDoCenario]: idDaOpcao };
    const terminou = respondidos() === cenarios.length;
    const salvou = gravarEscolhas(escolhas, terminou);

    seletorDeFoco = '[data-simulador-feedback]';
    renderizar();

    if (!salvou) mostrarToast('Não consegui salvar o progresso');
    else if (terminou) mostrarToast('Simulador concluído. Progresso salvo');
  }

  function irPara(novoIndice, { mostrarResumo = false } = {}) {
    verResumo = mostrarResumo;
    if (!mostrarResumo) indice = Math.min(Math.max(novoIndice, 0), cenarios.length - 1);
    seletorDeFoco = mostrarResumo ? '[data-simulador-resumo]' : '[data-simulador-cenario]';
    renderizar();
  }

  function trocarResposta(idDoCenario) {
    escolhas = { ...escolhas };
    delete escolhas[idDoCenario];
    gravarEscolhas(escolhas, false);
    seletorDeFoco = '[data-simulador-opcoes] button';
    renderizar();
  }

  function recomecar() {
    escolhas = {};
    indice = 0;
    verResumo = false;
    const salvou = gravarEscolhas({}, false);
    seletorDeFoco = '[data-simulador-cenario]';
    renderizar();
    mostrarToast(salvou ? 'Simulador reiniciado' : 'Não consegui salvar o progresso');
  }

  // ---- Cabeçalho: progresso do simulador ------------------------------------
  function montarCabecalho() {
    const total = cenarios.length;
    const feitos = respondidos();

    return criarElemento('div', { class: 'space-y-3' }, [
      criarElemento('div', { class: 'flex flex-wrap items-baseline justify-between gap-2' }, [
        criarElemento('p', { class: 'text-sm font-medium' }, [
          verResumo ? 'Resumo de disciplina' : 'Cenário ' + (indice + 1) + ' de ' + total,
        ]),
        criarElemento('p', { class: 'text-sm text-texto-suave', role: 'status' }, [
          feitos + ' de ' + total + ' respondidos',
        ]),
      ]),
      criarBarraProgresso((feitos / total) * 100, 'Cenários respondidos no simulador'),
    ]);
  }

  // ---- Um cenário -----------------------------------------------------------
  function montarBotaoDeOpcao(cenario, opcao, escolhida) {
    const selecionada = escolhida === opcao.id;
    const respondido = Boolean(escolhida);

    const base =
      'flex w-full flex-col items-start gap-1 rounded-lg border p-3 text-left transition-colors ' +
      'duration-150 disabled:cursor-not-allowed';
    const cor = selecionada
      ? ' border-primaria bg-primaria/15'
      : respondido
        ? ' border-borda bg-fundo opacity-60'
        : ' border-borda bg-fundo hover:border-primaria hover:bg-primaria/10';

    return criarElemento(
      'button',
      {
        type: 'button',
        class: base + cor,
        disabled: respondido,
        'aria-pressed': String(selecionada),
        onclick: () => escolher(cenario.id, opcao.id),
      },
      [
        criarElemento('span', { class: 'text-sm font-semibold' }, [rotuloDaOpcao(cenario, opcao)]),
        criarElemento('span', { class: 'text-xs text-texto-suave' }, [opcao.descricao]),
      ],
    );
  }

  function montarFeedback(cenario, idDaOpcao) {
    const resposta = cenario.opcoes[idDaOpcao];
    if (!resposta) return null;

    const qualidade = QUALIDADES[resposta.qualidade] ?? QUALIDADES.aceitavel;
    const opcao = OPCOES.find((item) => item.id === idDaOpcao);

    return criarElemento(
      'div',
      {
        'data-simulador-feedback': '',
        // O foco vem para cá logo depois da escolha, e o leitor de tela já lê o
        // bloco. Um role="status" por cima faria ele ler tudo duas vezes.
        tabindex: '-1',
        class: 'space-y-4 rounded-card border border-primaria/40 bg-fundo p-5',
      },
      [
        // Linha do topo: o que foi escolhido + badge de risco da decisão.
        criarElemento('div', { class: 'flex flex-wrap items-center gap-3' }, [
          criarElemento('span', { class: 'text-sm text-texto-suave' }, ['Você escolheu:']),
          criarElemento('span', { class: 'text-sm font-semibold' }, [
            rotuloDaOpcao(cenario, opcao ?? { id: idDaOpcao, rotulo: idDaOpcao }),
          ]),
          criarBadgeRisco(resposta.risco, rotuloRisco(resposta.risco) + ' nesta decisão'),
          criarElemento(
            'span',
            {
              class:
                'text-xs font-semibold uppercase tracking-wide ' +
                (CLASSES_QUALIDADE[resposta.qualidade] ?? ''),
            },
            [qualidade.rotulo],
          ),
        ]),

        criarElemento('p', { class: 'text-texto-suave' }, [resposta.feedback]),

        // Próximo passo técnico — mostrado sempre, qualquer que tenha sido a escolha.
        criarElemento(
          'div',
          { class: 'rounded-lg border border-acento/40 bg-acento/5 p-4' },
          [
            criarElemento(
              'p',
              { class: 'text-xs font-semibold uppercase tracking-wide text-acento' },
              ['Próximo passo técnico'],
            ),
            criarElemento('p', { class: 'mt-2 text-sm text-texto-suave' }, [cenario.proximoPasso]),
            cenario.ferramentas?.length > 0 &&
              criarElemento(
                'div',
                { class: 'mt-3 flex flex-wrap gap-2' },
                cenario.ferramentas.map((ferramenta) => criarChip(ferramenta)),
              ),
          ],
        ),

        criarElemento('p', { class: 'text-sm' }, [
          criarElemento('strong', {}, ['Fica a regra: ']),
          cenario.licao,
        ]),

        criarElemento('div', {}, [
          criarBotao('Trocar minha resposta', {
            variante: 'fantasma',
            onclick: () => trocarResposta(cenario.id),
          }),
        ]),
      ],
    );
  }

  function montarNavegacao(cenario) {
    const respondido = Boolean(escolhas[cenario.id]);
    const ultimo = indice === cenarios.length - 1;
    const tudoRespondido = respondidos() === cenarios.length;

    return criarElemento('div', { class: 'flex flex-wrap items-center gap-3' }, [
      criarBotao('Cenário anterior', {
        variante: 'secundario',
        disabled: indice === 0,
        onclick: () => irPara(indice - 1),
      }),

      !ultimo &&
        criarBotao('Próximo cenário', {
          disabled: !respondido,
          onclick: () => irPara(indice + 1),
        }),

      (ultimo || tudoRespondido) &&
        criarBotao('Ver resumo de disciplina', {
          variante: ultimo ? 'primario' : 'secundario',
          disabled: !tudoRespondido,
          onclick: () => irPara(indice, { mostrarResumo: true }),
        }),

      !respondido &&
        criarElemento('p', { class: 'text-sm text-texto-suave' }, [
          'Escolha uma das quatro opções para liberar o feedback.',
        ]),
    ]);
  }

  function montarCenario() {
    const cenario = cenarios[indice];
    const escolhida = escolhas[cenario.id];

    const etiquetas = [
      ...(cenario.tags ?? []).map((tag) => criarChip(tag)),
      criarChip(
        cenario.posicao === 'aberta' ? 'Você já tem posição' : 'Você não tem posição',
        cenario.posicao === 'aberta' ? 'border-acento/40 text-acento' : '',
      ),
    ];

    // O data-simulador-cenario é o alvo de foco ao trocar de cenário: leva o leitor de tela
    // (e a rolagem da página) de volta ao topo do cenário novo.
    return criarElemento(
      'div',
      { 'data-simulador-cenario': '', tabindex: '-1', class: 'space-y-6' },
      [
        criarCard([
          criarElemento('div', { class: 'flex flex-wrap items-start justify-between gap-3' }, [
            criarElemento('h3', { class: 'text-lg font-semibold' }, [
              cenario.numero + '. ' + cenario.titulo,
            ]),
            criarBadgeRisco(cenario.risco, rotuloRisco(cenario.risco) + ' na situação'),
          ]),

          criarElemento('div', { class: 'mt-3 flex flex-wrap gap-2' }, etiquetas),

          criarElemento('p', { class: 'mt-4 text-texto-suave' }, [cenario.descricao]),

          cenario.sinais?.length > 0 &&
            criarElemento('div', { class: 'mt-4 rounded-lg border border-borda bg-fundo p-4' }, [
              criarElemento(
                'p',
                { class: 'text-xs font-semibold uppercase tracking-wide text-texto-suave' },
                ['Na sua tela'],
              ),
              criarElemento(
                'ul',
                { class: 'mt-2 list-disc space-y-1 pl-5 text-sm text-texto-suave' },
                cenario.sinais.map((sinal) => criarElemento('li', {}, [sinal])),
              ),
            ]),
        ]),

        criarElemento('div', { 'data-simulador-opcoes': '' }, [
          criarElemento('h4', { class: 'mb-3 text-sm font-semibold' }, ['O que você faz?']),
          criarElemento(
            'div',
            {
              class: 'grid gap-3 sm:grid-cols-2',
              role: 'group',
              'aria-label': 'Opções de decisão',
            },
            OPCOES.map((opcao) => montarBotaoDeOpcao(cenario, opcao, escolhida)),
          ),
        ]),

        escolhida && montarFeedback(cenario, escolhida),

        montarNavegacao(cenario),
      ],
    );
  }

  // ---- Resumo de disciplina --------------------------------------------------
  // Conta quantas escolhas caíram em cada qualidade, mais duas leituras de padrão:
  // quantas vezes a resposta foi "entrar" e em quantas delas entrar era a pior opção.
  function calcularMetricas() {
    const contagem = { boa: 0, aceitavel: 0, ruim: 0, naoSeAplica: 0 };
    let entradas = 0;
    let entradasCaras = 0;

    for (const cenario of cenarios) {
      const escolha = escolhas[cenario.id];
      const resposta = cenario.opcoes[escolha];
      if (!resposta) continue;

      contagem[resposta.qualidade] = (contagem[resposta.qualidade] ?? 0) + 1;
      if (escolha === 'entrar') {
        entradas += 1;
        if (resposta.qualidade === 'ruim') entradasCaras += 1;
      }
    }

    return { contagem, entradas, entradasCaras };
  }

  function montarLinhaDoResumo(cenario) {
    const escolha = escolhas[cenario.id];
    const resposta = cenario.opcoes[escolha];
    const opcao = OPCOES.find((item) => item.id === escolha);
    const qualidade = QUALIDADES[resposta?.qualidade];

    return criarElemento(
      'li',
      { class: 'flex flex-wrap items-center gap-3 rounded-lg border border-borda bg-fundo p-3' },
      [
        criarElemento('span', { class: 'text-xs text-texto-suave' }, [
          'Cenário ' + cenario.numero,
        ]),
        criarElemento('span', { class: 'min-w-0 flex-1 text-sm' }, [cenario.titulo]),
        criarElemento('span', { class: 'text-sm text-texto-suave' }, [
          opcao ? rotuloDaOpcao(cenario, opcao) : '—',
        ]),
        criarElemento(
          'span',
          {
            class:
              'text-xs font-semibold ' + (CLASSES_QUALIDADE[resposta?.qualidade] ?? 'text-texto-suave'),
          },
          [qualidade?.rotulo ?? 'Sem resposta'],
        ),
        criarBotao('Rever', {
          variante: 'fantasma',
          'aria-label': 'Rever o cenário ' + cenario.numero + ': ' + cenario.titulo,
          onclick: () => irPara(cenarios.indexOf(cenario)),
        }),
      ],
    );
  }

  function montarResumo() {
    const { pontos, maximo, percentual } = pontuacao();
    const faixa =
      FAIXAS_DE_DISCIPLINA.find((item) => percentual >= item.minimo) ??
      FAIXAS_DE_DISCIPLINA[FAIXAS_DE_DISCIPLINA.length - 1];
    const { contagem, entradas, entradasCaras } = calcularMetricas();

    const numeros = [
      { rotulo: 'Decisões sólidas', valor: contagem.boa, classe: 'text-risco-baixo' },
      { rotulo: 'Defensáveis', valor: contagem.aceitavel, classe: 'text-risco-medio' },
      { rotulo: 'Decisões caras', valor: contagem.ruim, classe: 'text-risco-alto-texto' },
      { rotulo: 'Não se aplicavam', valor: contagem.naoSeAplica, classe: 'text-texto-suave' },
    ];

    return criarElemento(
      'div',
      { 'data-simulador-resumo': '', tabindex: '-1', class: 'space-y-6' },
      [
        criarCard(
          [
            criarElemento('h3', { class: 'text-xl font-semibold' }, [faixa.titulo]),
            criarElemento('p', { class: 'mt-1 text-sm text-texto-suave' }, [
              'Disciplina: ' +
                pontos +
                ' de ' +
                maximo +
                ' pontos (' +
                Math.round(percentual) +
                '%).',
            ]),
            criarElemento('div', { class: 'mt-3' }, [
              criarBarraProgresso(percentual, 'Pontuação de disciplina'),
            ]),
            criarElemento('p', { class: 'mt-4 text-texto-suave' }, [faixa.texto]),
          ],
          { class: 'border-primaria/40' },
        ),

        criarElemento(
          'div',
          { class: 'grid gap-3 sm:grid-cols-2 lg:grid-cols-4' },
          numeros.map((numero) =>
            criarElemento(
              'div',
              { class: 'rounded-card border border-borda bg-superficie p-4' },
              [
                criarElemento('p', { class: 'text-2xl font-semibold ' + numero.classe }, [
                  String(numero.valor),
                ]),
                criarElemento('p', { class: 'mt-1 text-sm text-texto-suave' }, [numero.rotulo]),
              ],
            ),
          ),
        ),

        criarCard([
          criarElemento('h4', { class: 'text-base font-semibold' }, ['Leitura do seu padrão']),
          criarElemento('ul', { class: 'mt-3 list-disc space-y-2 pl-5 text-texto-suave' }, [
            criarElemento('li', {}, [
              'Você escolheu entrar em ' +
                entradas +
                ' de ' +
                cenarios.length +
                ' cenários' +
                (entradasCaras > 0
                  ? ' — e em ' +
                    entradasCaras +
                    ' deles entrar era a pior opção disponível. Entrada é a decisão mais fácil de tomar e a mais cara de errar.'
                  : '. Nenhuma dessas entradas era a pior opção do cenário.'),
            ]),
            contagem.naoSeAplica > 0 &&
              criarElemento('li', {}, [
                'Em ' +
                  contagem.naoSeAplica +
                  ' cenários você escolheu realizar parcial sem ter posição aberta. Não é erro de mérito, mas mostra o reflexo de agir antes de ler a situação: só dá para realizar o que já se tem.',
              ]),
            contagem.ruim === 0 &&
              criarElemento('li', {}, [
                'Nenhuma decisão cara nesta rodada. Vale refazer daqui a algumas semanas, sem olhar os feedbacks antes.',
              ]),
            criarElemento('li', {}, [
              'Lembre do que está sendo medido: o simulador não avalia se você ganharia dinheiro, e sim se a decisão seguiu a regra escrita. Resultado a gente não controla; processo, sim.',
            ]),
          ]),
        ]),

        criarCard([
          criarElemento('h4', { class: 'text-base font-semibold' }, ['Suas escolhas, cenário a cenário']),
          criarElemento(
            'ul',
            { class: 'mt-3 space-y-2' },
            cenarios.map((cenario) => montarLinhaDoResumo(cenario)),
          ),
        ]),

        criarElemento('div', { class: 'flex flex-wrap gap-3' }, [
          criarBotao('Voltar aos cenários', {
            variante: 'secundario',
            onclick: () => irPara(indice),
          }),
          criarBotao('Refazer o simulador', { variante: 'fantasma', onclick: recomecar }),
        ]),
      ],
    );
  }

  // ---- Render ----------------------------------------------------------------
  function renderizar() {
    // O replaceChildren não ignora false/'' como o criarElemento ignora — filtramos antes.
    const partes = [
      aviso
        ? criarElemento(
            'p',
            {
              class:
                'rounded-card border border-risco-medio/40 bg-risco-medio/10 p-3 text-sm ' +
                'text-texto-suave',
            },
            [criarElemento('strong', { class: 'text-texto' }, ['Cenários fictícios: ']), aviso],
          )
        : null,
      montarCabecalho(),
      verResumo ? montarResumo() : montarCenario(),
    ];

    container.replaceChildren(...partes.filter(Boolean));

    // Foco só depois de uma interação — nunca na primeira montagem da aba.
    if (seletorDeFoco) {
      container.querySelector(seletorDeFoco)?.focus();
      seletorDeFoco = null;
    }
  }

  renderizar();
  return container;
}
