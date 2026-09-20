// simulator.js — simulador de decisão do Módulo 4 (desenho: tela 34, "Quiz e Simulador").
//
// Fluxo: um cenário por vez. O usuário escolhe entre Entrar / Esperar / Ignorar /
// Realizar parcial e recebe na hora o feedback em 4 blocos: a qualidade da decisão
// com o risco dela, o próximo passo técnico, a lição e o botão do próximo cenário.
// Cada escolha é gravada no store (localStorage), então o F5 não apaga nada: ao
// voltar, o simulador reabre no primeiro cenário ainda sem resposta.
//
// No fim, o "resultado final" soma os pontos de cada escolha, mostra a faixa, as
// 4 barras por qualidade (na mesma escala), as 4 faixas e a lista dos cenários.
// Mede o padrão de decisão — não o resultado financeiro, que ninguém controla.
//
// Uso (as chamadas antigas continuam valendo):
//   montarSimulador({ cenarios })
//   montarSimulador({ cenarios, aviso: modulo4.simulador.aviso })
// Opções novas, todas com padrão vindo de src/data/modulo4.js (bloco `simulador`):
//   titulo          h2 do cartão ("Simulador de decisão")
//   abertura        parágrafo abaixo do aviso ("Não existe pontuação de acerto de preço: …")
//   dicaSemPosicao  2ª frase da dica, só nos cenários sem posição
//   ordemSorteada   frase ao lado de "Próximo cenário" ("A ordem é sorteada: …")
//   legendaBarras   legenda das 4 barras do resultado; função (total) => texto
//   legendaFaixas   legenda da lista das 4 faixas
//   fraseFinal      última frase do resultado ("O simulador não avalia se …")
//   embaralhar      false = mantém a ordem de cenarios.js (padrão: sorteia a cada
//                   rodada: ao abrir a aba e a cada "Refazer o simulador")

import { criarElemento, criarBotao, rotuloRisco, mostrarToast } from '../ui.js';
import { obterEstado, atualizar } from '../store.js';
import { OPCOES, QUALIDADES, FAIXAS_DE_DISCIPLINA } from '../data/cenarios.js';
import { modulo4 } from '../data/modulo4.js';

// ---------------------------------------------------------------------------
// Cores em trio (borda + fundo + texto), com os valores exatos do handoff.
// A `barra` é a cor sólida usada nas barras do resultado final (vermelho de
// preenchimento é #EF4444; texto vermelho é sempre #F87171).
// ---------------------------------------------------------------------------
const TRIOS = {
  verde: { borda: 'rgba(34,197,94,.5)', fundo: 'rgba(34,197,94,.12)', texto: '#22C55E', barra: '#22C55E' },
  ciano: { borda: 'rgba(34,211,238,.5)', fundo: 'rgba(34,211,238,.1)', texto: '#22D3EE', barra: '#22D3EE' },
  vermelho: { borda: 'rgba(239,68,68,.5)', fundo: 'rgba(239,68,68,.12)', texto: '#F87171', barra: '#EF4444' },
  ambar: { borda: 'rgba(245,158,11,.4)', fundo: 'rgba(245,158,11,.12)', texto: '#F59E0B', barra: '#F59E0B' },
  roxo: { borda: 'rgba(124,58,237,.6)', fundo: 'rgba(124,58,237,.12)', texto: '#E6EDF3', barra: '#7C3AED' },
};

// A tabela única da qualidade: pílulas, borda da opção escolhida, borda do
// feedback e cor das barras saem todas daqui.
const TRIO_DA_QUALIDADE = {
  boa: TRIOS.verde,
  aceitavel: TRIOS.ciano,
  ruim: TRIOS.vermelho,
  naoSeAplica: TRIOS.ambar,
};

// Risco (da situação e da decisão): o trio e a palavra que vai depois de "Risco …".
const RISCOS = {
  baixo: { nome: 'baixo', trio: TRIOS.verde },
  medio: { nome: 'médio', trio: TRIOS.ambar },
  alto: { nome: 'alto', trio: TRIOS.vermelho },
};

// Ordem das qualidades nas barras do resultado final.
const ORDEM_DAS_QUALIDADES = ['boa', 'aceitavel', 'ruim', 'naoSeAplica'];

// Classes que se repetem.
const MICRO_ROTULO = 'text-[12px] font-semibold uppercase tracking-[.05em] text-texto-suave';
const MICRO_ROTULO_11 = 'text-[11px] font-semibold uppercase tracking-[.05em] text-texto-suave';

// "style" com as três cores de um trio (inline, para bater o valor exato).
function estiloDoTrio(trio) {
  return 'border-color:' + trio.borda + ';background:' + trio.fundo + ';color:' + trio.texto;
}

// Pílula de estado (qualidade, risco). `pequena` = 11px e padding 8 (dentro da opção
// e na lista do resultado); normal = 12px e padding 10.
function criarPilula(texto, trio, { pequena = false } = {}) {
  return criarElemento(
    'span',
    {
      class:
        'whitespace-nowrap rounded-full border py-px font-semibold ' +
        (pequena ? 'px-2 text-[11px]' : 'px-2.5 text-[12px]'),
      style: estiloDoTrio(trio),
    },
    [texto],
  );
}

// Etiqueta neutra (tags do cenário e ferramentas). `mono` = JetBrains Mono, texto claro.
function criarChip(texto, { mono = false } = {}) {
  return criarElemento(
    'span',
    {
      class:
        'rounded-full border border-borda bg-superficie px-2.5 py-0.5 text-[12px] ' +
        (mono ? 'font-mono text-texto' : 'text-texto-suave'),
    },
    [texto],
  );
}

// "2 pontos", "1 ponto", "0 pontos".
function textoDePontos(pontos) {
  return pontos + (pontos === 1 ? ' ponto' : ' pontos');
}

// Limiar de uma faixa, gerado do `minimo` (como o desenho faz):
// "de 85% para cima" … e, na última (minimo 0), "abaixo de 35%".
function limiarDaFaixa(faixa, indice) {
  if (faixa.minimo > 0) return 'de ' + faixa.minimo + '% para cima';
  const anterior = FAIXAS_DE_DISCIPLINA[indice - 1];
  return anterior ? 'abaixo de ' + anterior.minimo + '%' : 'de 0% para cima';
}

// Lê o histórico salvo: { 'lancamento-sem-catalise': 'esperar', ... }
function lerEscolhas() {
  return { ...(obterEstado().simulador?.escolhas ?? {}) };
}

// Grava o histórico inteiro de uma vez (é pequeno; não vale gravar campo a campo).
// O formato de estado.simulador não muda: { escolhas, concluido }.
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

// Embaralha uma cópia da lista (Fisher–Yates). Misturar os tipos de situação, em
// vez de sempre a mesma ordem, treina a distinguir uma da outra (intercalação:
// Brunmair & Richter, 2019, g = 0,42). Fica mais difícil — é de propósito.
function sortear(lista) {
  const copia = [...lista];
  for (let i = copia.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

// Setas, Home e End movem o foco entre as 4 opções. Não escolhem: escolher mostra o
// feedback na hora, então só Enter, Espaço ou clique escolhem.
// Só uma opção fica na ordem do Tab (tabindex 0), como pede o padrão de radiogroup:
// o Tab entra no grupo e sai dele numa tecla só; dentro dele, as setas andam.
function navegarPelasOpcoes(evento) {
  const botoes = [...evento.currentTarget.querySelectorAll('[role="radio"]')];
  const atual = botoes.indexOf(document.activeElement);
  if (atual === -1) return;

  const destinos = {
    ArrowRight: atual + 1,
    ArrowDown: atual + 1,
    ArrowLeft: atual - 1,
    ArrowUp: atual - 1,
    Home: 0,
    End: botoes.length - 1,
  };
  if (!(evento.key in destinos)) return;

  evento.preventDefault();
  const destino = (destinos[evento.key] + botoes.length) % botoes.length;
  botoes.forEach((botao, i) => botao.setAttribute('tabindex', i === destino ? '0' : '-1'));
  botoes[destino].focus();
}

export function montarSimulador({
  cenarios: cenariosDoModulo = [],
  aviso = modulo4.simulador.aviso,
  titulo = modulo4.simulador.titulo,
  abertura = modulo4.simulador.abertura,
  dicaSemPosicao = modulo4.simulador.dicaSemPosicao,
  ordemSorteada = modulo4.simulador.ordemSorteada,
  legendaBarras = modulo4.simulador.legendaBarras,
  legendaFaixas = modulo4.simulador.legendaFaixas,
  fraseFinal = modulo4.simulador.fraseFinal,
  embaralhar = true,
} = {}) {
  // O cartão da seção (raio 12, superfície, padding 20). Tudo é desenhado dentro dele.
  const container = criarElemento('section', {
    class: 'flex flex-col gap-4 rounded-card border border-borda bg-superficie p-5',
    'aria-label': titulo,
  });
  // A ordem é sorteada a cada rodada: quando a aba monta e a cada "Refazer o
  // simulador" (é o que o aviso do topo promete). As escolhas ficam salvas por id,
  // então sortear de novo não apaga nada. `let` porque o recomecar() sorteia de novo.
  let cenarios = embaralhar ? sortear(cenariosDoModulo) : cenariosDoModulo;

  if (cenarios.length === 0) {
    container.append(criarElemento('p', {}, ['Nenhum cenário cadastrado.']));
    return container;
  }

  // O cartão tem duas partes fixas:
  // - `corpo`: o que o renderizar() redesenha a cada clique;
  // - `anuncio`: a região aria-live (role="status"). Ela fica SEMPRE no cartão, fora
  //   do que é redesenhado: o leitor de tela só anuncia mudanças numa região que já
  //   existia antes da mudança. Depois de cada escolha, ela recebe a qualidade, o
  //   risco e o feedback (o bloco 1). É invisível (sr-only), só para leitor de tela.
  const corpo = criarElemento('div', { class: 'flex flex-col gap-4' });
  const anuncio = criarElemento('p', { role: 'status', 'aria-live': 'polite', class: 'sr-only' });
  container.append(corpo, anuncio);

  // ---- Estado local do componente ------------------------------------------
  let escolhas = lerEscolhas();
  // Abre no primeiro cenário sem resposta; se todos já foram respondidos, abre o resumo.
  let indice = Math.max(0, cenarios.findIndex((cenario) => !respondeu(cenario)));
  let verResumo = respondidos() === cenarios.length;
  // Elemento que deve receber o foco depois do próximo render (acessibilidade).
  let seletorDeFoco = null;

  // Só vale escolha com id de opção que existe no cenário.
  function respondeu(cenario) {
    return Boolean(cenario.opcoes[escolhas[cenario.id]]);
  }

  function respondidos() {
    return cenarios.filter(respondeu).length;
  }

  function pontuacao() {
    let pontos = 0;
    for (const cenario of cenarios) {
      const qualidade = cenario.opcoes[escolhas[cenario.id]]?.qualidade;
      pontos += QUALIDADES[qualidade]?.pontos ?? 0;
    }
    const maximo = cenarios.length * QUALIDADES.boa.pontos;
    return { pontos, maximo, percentual: maximo ? (pontos / maximo) * 100 : 0 };
  }

  // Quantas escolhas caíram em cada qualidade.
  function contarQualidades() {
    const contagem = { boa: 0, aceitavel: 0, ruim: 0, naoSeAplica: 0 };
    for (const cenario of cenarios) {
      const qualidade = cenario.opcoes[escolhas[cenario.id]]?.qualidade;
      if (qualidade in contagem) contagem[qualidade] += 1;
    }
    return contagem;
  }

  // Para onde "Próximo cenário" leva: o seguinte da rodada; depois do último,
  // o primeiro que ainda está sem resposta.
  // Devolve -1 quando não há para onde ir (último cenário e tudo respondido).
  function indiceDoProximo() {
    if (indice < cenarios.length - 1) return indice + 1;
    return cenarios.findIndex((cenario) => !respondeu(cenario));
  }

  // Escreve na região aria-live. Com texto vazio, só limpa: assim, se a mesma
  // frase vier de novo (trocou a resposta e escolheu a mesma), ela é anunciada outra vez.
  function anunciar(texto) {
    anuncio.textContent = texto;
  }

  // O que o leitor de tela ouve depois de escolher: o bloco 1 do feedback
  // (qualidade, "Risco desta decisão: …" e o texto do feedback).
  function textoDoAnuncio(cenario, idDaOpcao) {
    const resposta = cenario.opcoes[idDaOpcao];
    const qualidade = QUALIDADES[resposta.qualidade] ?? QUALIDADES.aceitavel;
    const risco = RISCOS[resposta.risco] ?? RISCOS.medio;
    return qualidade.rotulo + '. Risco desta decisão: ' + risco.nome + '. ' + resposta.feedback;
  }

  // ---- Ações ----------------------------------------------------------------
  function escolher(idDoCenario, idDaOpcao) {
    escolhas = { ...escolhas, [idDoCenario]: idDaOpcao };
    const terminou = respondidos() === cenarios.length;
    const salvou = gravarEscolhas(escolhas, terminou);

    // O foco fica na opção escolhida (como no desenho, onde o botão não some); o
    // resultado chega pelo aria-live. Mover o foco para o feedback faria o leitor
    // de tela ler a mesma coisa duas vezes.
    seletorDeFoco = '[data-simulador-opcoes] [aria-checked="true"]';
    renderizar();
    anunciar(textoDoAnuncio(cenarios.find((cenario) => cenario.id === idDoCenario), idDaOpcao));

    if (!salvou) mostrarToast('Não consegui salvar o progresso');
    else if (terminou) mostrarToast('Simulador concluído. Progresso salvo');
  }

  function irPara(novoIndice, { mostrarResumo = false } = {}) {
    verResumo = mostrarResumo;
    if (!mostrarResumo) indice = Math.min(Math.max(novoIndice, 0), cenarios.length - 1);
    seletorDeFoco = mostrarResumo ? '[data-simulador-resumo]' : '[data-simulador-cenario]';
    anunciar('');
    renderizar();
  }

  function trocarResposta(idDoCenario) {
    escolhas = { ...escolhas };
    delete escolhas[idDoCenario];
    gravarEscolhas(escolhas, false);
    seletorDeFoco = '[data-simulador-opcoes] [role="radio"]';
    anunciar('');
    renderizar();
  }

  function recomecar() {
    escolhas = {};
    // Nova rodada, nova ordem (o aviso do topo diz que a ordem é sorteada a cada rodada).
    if (embaralhar) cenarios = sortear(cenariosDoModulo);
    indice = 0;
    verResumo = false;
    const salvou = gravarEscolhas({}, false);
    seletorDeFoco = '[data-simulador-cenario]';
    anunciar('');
    renderizar();
    mostrarToast(salvou ? 'Simulador reiniciado' : 'Não consegui salvar o progresso');
  }

  // ---- Cabeçalho do cartão: título, aviso e parágrafo de abertura -----------
  function montarCabecalho() {
    return [
      criarElemento('div', { class: 'flex flex-wrap items-baseline justify-between gap-3' }, [
        criarElemento('h2', { class: 'text-[1.25rem] font-semibold' }, [titulo]),
        criarElemento('span', { class: MICRO_ROTULO }, ['Módulo 4 · ' + cenarios.length + ' cenários']),
      ]),

      aviso &&
        criarElemento(
          'p',
          { class: 'rounded-lg border px-4 py-3 text-[14px] text-texto', style: estiloDoTrio({ ...TRIOS.ambar, texto: '#E6EDF3' }) },
          [criarElemento('strong', { class: 'text-texto' }, ['Cenários fictícios: ']), aviso],
        ),

      abertura && criarElemento('p', { class: 'text-texto-suave' }, [abertura]),
    ];
  }

  // ---- Um cenário -----------------------------------------------------------
  // Botão de uma das 4 opções (role="radio" dentro do radiogroup). Depois de
  // responder, a escolhida ganha o trio da qualidade e a pílula; as demais ficam a .7.
  function montarBotaoDeOpcao(cenario, opcao, escolhida) {
    const selecionada = escolhida === opcao.id;
    const respondido = Boolean(escolhida);
    const qualidade = cenario.opcoes[opcao.id]?.qualidade;
    const trio = selecionada ? TRIO_DA_QUALIDADE[qualidade] : null;
    // A que entra na ordem do Tab: a escolhida; antes de escolher, a primeira.
    const noTab = respondido ? selecionada : opcao.id === OPCOES[0].id;

    // Antes de escolher: mãozinha e borda que clareia no hover (como no desenho).
    // Depois: seta comum, e as não escolhidas "apagadas" a .7. O .7 vai SÓ no rótulo
    // (texto claro, continua acima de 4,5:1). A descrição em #9AA7B4 fica sem opacidade:
    // a regra do handoff proíbe opacity em quem tem texto #9AA7B4 (cairia para 4,09:1).
    let estado = ' cursor-pointer border-borda bg-superficie hover:border-texto-suave';
    if (respondido) estado = selecionada ? ' cursor-default' : ' cursor-default border-borda bg-superficie';
    const apagada = respondido && !selecionada;

    return criarElemento(
      'button',
      {
        type: 'button',
        role: 'radio',
        'aria-checked': String(selecionada),
        tabindex: noTab ? '0' : '-1',
        // Depois de responder, as opções travam (a troca é pelo "Trocar minha resposta").
        'aria-disabled': respondido ? 'true' : null,
        class:
          // leading-[normal]: o desenho usa a entrelinha padrão do botão (mais justa).
          'flex min-h-11 w-full flex-col items-start gap-1 rounded-lg border px-3.5 py-3 text-left ' +
          'leading-[normal] text-texto transition-colors duration-150' +
          estado,
        style: trio ? 'border-color:' + trio.borda + ';background:' + trio.fundo : null,
        onclick: () => {
          if (!respondido) escolher(cenario.id, opcao.id);
        },
      },
      [
        criarElemento('span', { class: 'flex w-full items-baseline justify-between gap-2' }, [
          criarElemento('span', { class: 'text-[15px] font-semibold' + (apagada ? ' opacity-70' : '') }, [
            rotuloDaOpcao(cenario, opcao),
          ]),
          trio && criarPilula(QUALIDADES[qualidade]?.rotulo ?? '', trio, { pequena: true }),
        ]),
        criarElemento('span', { class: 'text-[13px] text-texto-suave' }, [opcao.descricao]),
      ],
    );
  }

  // Os 4 blocos do feedback: (1) qualidade + risco + texto; (2) próximo passo;
  // (3) lição; (4) botões.
  function montarFeedback(cenario, idDaOpcao) {
    const resposta = cenario.opcoes[idDaOpcao];
    if (!resposta) return null;

    const qualidade = QUALIDADES[resposta.qualidade] ?? QUALIDADES.aceitavel;
    const trio = TRIO_DA_QUALIDADE[resposta.qualidade] ?? TRIOS.ciano;
    const risco = RISCOS[resposta.risco] ?? RISCOS.medio;

    return criarElemento(
      'div',
      {
        // O anúncio para leitor de tela sai pela região `anuncio` (aria-live), que
        // fica fixa no cartão; este bloco é redesenhado a cada clique.
        'data-simulador-feedback': '',
        class: 'flex flex-col gap-3',
      },
      [
        // (1) Qualidade da decisão e risco dela, com o feedback.
        criarElemento(
          'div',
          {
            class: 'flex flex-col gap-2 rounded-lg border bg-superficie px-4 py-3.5',
            style: 'border-color:' + trio.borda,
          },
          [
            criarElemento('div', { class: 'flex flex-wrap items-baseline gap-2' }, [
              criarPilula(qualidade.rotulo, trio),
              criarPilula('Risco desta decisão: ' + risco.nome, risco.trio),
            ]),
            criarElemento('p', { class: 'text-[14px] text-texto' }, [resposta.feedback]),
          ],
        ),

        // (2) Próximo passo técnico — mostrado sempre, qualquer que tenha sido a escolha.
        criarElemento(
          'div',
          { class: 'rounded-lg border border-acento px-3.5 py-3', style: 'background:' + TRIOS.ciano.fundo },
          [
            criarElemento('p', { class: 'text-[11px] font-semibold uppercase tracking-[.05em] text-acento' }, [
              'Próximo passo técnico',
            ]),
            criarElemento('p', { class: 'mt-1.5 text-[14px] text-texto' }, [cenario.proximoPasso]),
            cenario.ferramentas?.length > 0 &&
              criarElemento(
                'div',
                { class: 'mt-2 flex flex-wrap gap-1.5' },
                cenario.ferramentas.map((ferramenta) => criarChip(ferramenta, { mono: true })),
              ),
          ],
        ),

        // (3) Lição, na caixa roxa.
        criarElemento('div', { class: 'rounded-lg border px-3.5 py-3', style: estiloDoTrio(TRIOS.roxo) }, [
          criarElemento('p', { class: MICRO_ROTULO_11 }, ['Lição']),
          criarElemento('p', { class: 'mt-1.5 text-[15px] font-semibold' }, [cenario.licao]),
        ]),

        // (4) Botões.
        montarBotoesDoFeedback(cenario),
      ],
    );
  }

  // 1ª linha, como no desenho: "Próximo cenário" (primário) + a frase da ordem
  // sorteada. No último cenário, com tudo respondido, o primário vira "Ver resumo".
  // 2ª linha: as funções que o desenho não mostra, mas que o app precisa (abrir o
  // resumo, voltar um cenário, trocar a resposta), em secundário e fantasma.
  function montarBotoesDoFeedback(cenario) {
    const tudoRespondido = respondidos() === cenarios.length;
    const proximo = indiceDoProximo();
    const abrirResumo = () => irPara(indice, { mostrarResumo: true });

    return criarElemento('div', { class: 'flex flex-col gap-3' }, [
      criarElemento('div', { class: 'flex flex-wrap items-center gap-3' }, [
        proximo === -1
          ? criarBotao('Ver resumo', { onclick: abrirResumo })
          : criarBotao('Próximo cenário', { onclick: () => irPara(proximo) }),
        // Só quando a ordem é mesmo sorteada (com embaralhar: false a frase seria falsa).
        proximo !== -1 &&
          embaralhar &&
          ordemSorteada &&
          criarElemento('span', { class: 'text-[13px] text-texto-suave' }, [ordemSorteada]),
      ]),

      criarElemento('div', { class: 'flex flex-wrap items-center gap-3' }, [
        tudoRespondido &&
          proximo !== -1 &&
          criarBotao('Ver resumo', { variante: 'secundario', onclick: abrirResumo }),
        indice > 0 &&
          criarBotao('Cenário anterior', { variante: 'secundario', onclick: () => irPara(indice - 1) }),
        criarBotao('Trocar minha resposta', {
          variante: 'fantasma',
          onclick: () => trocarResposta(cenario.id),
        }),
      ]),
    ]);
  }

  function montarCenario() {
    const cenario = cenarios[indice];
    const escolhida = respondeu(cenario) ? escolhas[cenario.id] : null;
    // Só 'nenhuma' é "sem posição" (e só aí entra a 2ª frase da dica). Um cenário sem
    // o campo `posicao` fica sem o complemento no micro-rótulo, em vez de chutar um.
    const semPosicao = cenario.posicao === 'nenhuma';
    const rotuloDaPosicao = { nenhuma: 'sem posição', aberta: 'com posição' }[cenario.posicao];
    const risco = RISCOS[cenario.risco] ?? RISCOS.medio;

    // A caixa interna única (raio 8, fundo #0B0F17, padding 20, gap 14).
    // O data-simulador-cenario é o alvo de foco ao trocar de cenário: leva o leitor
    // de tela (e a rolagem da página) de volta ao topo do cenário novo.
    return criarElemento(
      'div',
      {
        'data-simulador-cenario': '',
        tabindex: '-1',
        class: 'flex flex-col gap-3.5 rounded-lg border border-borda bg-fundo p-5',
      },
      [
        // Posição na rodada + pílula do risco da situação.
        criarElemento('div', { class: 'flex flex-wrap items-baseline justify-between gap-3' }, [
          criarElemento('p', { class: MICRO_ROTULO }, [
            'Cenário ' + (indice + 1) + ' de ' + cenarios.length + (rotuloDaPosicao ? ' · ' + rotuloDaPosicao : ''),
          ]),
          criarPilula(rotuloRisco(cenario.risco), risco.trio),
        ]),

        criarElemento('h3', { class: 'text-[1.0625rem] font-semibold' }, [cenario.titulo]),

        cenario.tags?.length > 0 &&
          criarElemento('div', { class: 'flex flex-wrap gap-1.5' }, cenario.tags.map((tag) => criarChip(tag))),

        criarElemento('p', { class: 'text-[14px] text-texto-suave' }, [cenario.descricao]),

        cenario.sinais?.length > 0 &&
          criarElemento('div', { class: 'rounded-lg border border-borda bg-superficie px-3.5 py-3' }, [
            criarElemento('p', { class: MICRO_ROTULO_11 }, ['O que você vê']),
            criarElemento(
              'ul',
              { class: 'mt-1.5 flex list-disc flex-col gap-1 pl-[18px] text-[14px] text-texto-suave' },
              cenario.sinais.map((sinal) => criarElemento('li', {}, [sinal])),
            ),
          ]),

        // As 4 opções fixas: 2 colunas; 1 no celular (CSS, não JS).
        criarElemento(
          'div',
          {
            'data-simulador-opcoes': '',
            role: 'radiogroup',
            'aria-label': 'Opções',
            class: 'grid grid-cols-1 gap-2 sm:grid-cols-2',
            onkeydown: navegarPelasOpcoes,
          },
          OPCOES.map((opcao) => montarBotaoDeOpcao(cenario, opcao, escolhida)),
        ),

        escolhida
          ? montarFeedback(cenario, escolhida)
          : criarElemento('p', { class: 'text-[13px] text-texto-suave' }, [
              'Escolha uma das quatro para ver o feedback.' +
                (semPosicao && dicaSemPosicao ? ' ' + dicaSemPosicao : ''),
            ]),
      ],
    );
  }

  // ---- Resultado final -------------------------------------------------------
  // As 4 barras por qualidade, todas na mesma escala (o total de cenários).
  function montarBarrasDoResumo(contagem) {
    const total = cenarios.length;
    const barras = ORDEM_DAS_QUALIDADES.map((chave) => ({
      chave,
      rotulo: QUALIDADES[chave].rotulo,
      pontos: '(' + textoDePontos(QUALIDADES[chave].pontos) + ')',
      texto: contagem[chave] + ' de ' + total,
      largura: total ? (contagem[chave] / total) * 100 : 0,
    }));
    const descricao =
      'As ' + total + ' decisões por qualidade, na mesma escala: ' +
      barras.map((barra) => barra.rotulo + ', ' + barra.texto).join('; ') + '.';

    return criarElemento('figure', { class: 'rounded-lg border border-borda bg-fundo px-5 py-4' }, [
      criarElemento('p', { class: 'mb-2.5 text-[14px] font-semibold' }, ['As ' + total + ' decisões, por qualidade']),
      criarElemento(
        'div',
        { role: 'img', 'aria-label': descricao, class: 'flex flex-col gap-3' },
        barras.map((barra) =>
          criarElemento('div', {}, [
            criarElemento('div', { class: 'flex items-baseline justify-between gap-3' }, [
              criarElemento('span', { class: 'text-[14px]' }, [
                barra.rotulo + ' ',
                criarElemento('span', { class: 'text-[12px] text-texto-suave' }, [barra.pontos]),
              ]),
              criarElemento('span', { class: 'whitespace-nowrap font-mono text-[13px] text-texto-suave' }, [barra.texto]),
            ]),
            criarElemento('div', { class: 'mt-1 h-[18px] overflow-hidden rounded bg-superficie' }, [
              criarElemento('div', {
                class: 'h-full',
                style: 'width:' + barra.largura + '%;background:' + TRIO_DA_QUALIDADE[barra.chave].barra,
              }),
            ]),
          ]),
        ),
      ),
      legendaBarras &&
        criarElemento('figcaption', { class: 'mt-2.5 text-[13px] text-texto-suave' }, [
          // Em src/data é uma função (leva o total no meio); texto pronto também vale.
          typeof legendaBarras === 'function' ? legendaBarras(total) : legendaBarras,
        ]),
    ]);
  }

  // As 4 faixas, com o limiar de cada uma; a deste resultado fica em roxo.
  function montarFaixas(faixaAtual) {
    return criarElemento('figure', { class: 'rounded-lg border border-borda bg-fundo px-5 py-4' }, [
      criarElemento('p', { class: 'mb-2.5 text-[14px] font-semibold' }, ['As quatro faixas do resumo']),
      criarElemento(
        'ul',
        { class: 'flex flex-col gap-2' },
        FAIXAS_DE_DISCIPLINA.map((faixa, i) => {
          const atual = faixa === faixaAtual;
          return criarElemento(
            'li',
            {
              class:
                'flex flex-col gap-1 rounded-lg border px-3.5 py-2.5 ' +
                (atual ? 'border-primaria bg-primaria/15' : 'border-borda bg-superficie'),
              'aria-current': atual ? 'true' : null,
            },
            [
              criarElemento('span', { class: 'flex flex-wrap items-baseline justify-between gap-3' }, [
                criarElemento('span', { class: 'text-[14px] font-semibold ' + (atual ? 'text-texto' : 'text-texto-suave') }, [
                  faixa.titulo,
                ]),
                criarElemento('span', { class: 'font-mono text-[12px] text-texto-suave' }, [limiarDaFaixa(faixa, i)]),
              ]),
              criarElemento('span', { class: 'text-[13px] text-texto-suave' }, [faixa.texto]),
            ],
          );
        }),
      ),
      legendaFaixas && criarElemento('figcaption', { class: 'mt-2.5 text-[13px] text-texto-suave' }, [legendaFaixas]),
    ]);
  }

  // Os cenários na ordem de `numero` (não na ordem sorteada), com a pílula da decisão.
  function montarListaDoResumo() {
    const emOrdem = [...cenarios].sort((a, b) => (a.numero ?? 0) - (b.numero ?? 0));

    return criarElemento('div', { class: 'rounded-lg border border-borda bg-fundo px-3.5 py-3' }, [
      criarElemento('p', { class: MICRO_ROTULO_11 }, ['Os ' + cenarios.length + ' cenários, e a decisão em cada um']),
      criarElemento(
        'ul',
        { class: 'mt-2 flex flex-col gap-1.5' },
        emOrdem.map((cenario) => {
          const chave = cenario.opcoes[escolhas[cenario.id]]?.qualidade;
          const trio = TRIO_DA_QUALIDADE[chave];
          return criarElemento('li', { class: 'flex items-baseline gap-2.5 text-[14px] text-texto-suave' }, [
            criarElemento('span', { class: 'shrink-0 font-mono text-[12px] text-texto' }, [
              String(cenario.numero ?? '').padStart(2, '0'),
            ]),
            criarElemento('span', { class: 'min-w-0' }, [cenario.titulo]),
            // Sem resposta, sem pílula (o resumo só abre com todos respondidos).
            trio && criarPilula(QUALIDADES[chave].rotulo, trio, { pequena: true }),
          ]);
        }),
      ),
    ]);
  }

  function montarResumo() {
    const { pontos, maximo, percentual } = pontuacao();
    const faixa =
      FAIXAS_DE_DISCIPLINA.find((item) => percentual >= item.minimo) ??
      FAIXAS_DE_DISCIPLINA[FAIXAS_DE_DISCIPLINA.length - 1];

    // Caixa roxa (borda .6, fundo .12, padding 20, gap 14).
    return criarElemento(
      'div',
      {
        'data-simulador-resumo': '',
        tabindex: '-1',
        class: 'flex flex-col gap-3.5 rounded-lg border p-5',
        style: estiloDoTrio(TRIOS.roxo),
      },
      [
        criarElemento('div', { class: 'flex flex-wrap items-baseline justify-between gap-3' }, [
          criarElemento('p', { class: 'text-[1.125rem] font-semibold' }, [faixa.titulo]),
          // Calculado das escolhas salvas (o número do desenho é só exemplo).
          criarElemento('span', { class: 'font-mono text-[14px] text-texto-suave' }, [
            pontos + ' de ' + maximo + ' pontos · ' + Math.round(percentual) + '%',
          ]),
        ]),
        criarElemento('p', { class: 'text-[14px] text-texto-suave' }, [faixa.texto]),

        montarBarrasDoResumo(contarQualidades()),
        montarFaixas(faixa),
        montarListaDoResumo(),

        fraseFinal && criarElemento('p', { class: 'text-[14px] text-texto-suave' }, [fraseFinal]),

        // O desenho não mostra botão aqui; sem este, não há como recomeçar.
        criarElemento('div', {}, [
          criarBotao('Refazer o simulador', { variante: 'secundario', onclick: recomecar }),
        ]),
      ],
    );
  }

  // ---- Render ----------------------------------------------------------------
  function renderizar() {
    // O replaceChildren não ignora false/'' como o criarElemento ignora — filtramos antes.
    // Só o `corpo` é redesenhado; a região `anuncio` (aria-live) fica onde está.
    const partes = [...montarCabecalho(), verResumo ? montarResumo() : montarCenario()];
    corpo.replaceChildren(...partes.filter(Boolean));

    // Foco só depois de uma interação — nunca na primeira montagem da aba.
    if (seletorDeFoco) {
      container.querySelector(seletorDeFoco)?.focus();
      seletorDeFoco = null;
    }
  }

  renderizar();
  return container;
}
