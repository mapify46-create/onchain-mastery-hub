// diagrama.js — motor genérico de diagramas Mermaid, com fallback em Tailwind puro.
//
// Como funciona:
//   1. montarDiagrama() devolve o elemento pronto NA HORA (o router não espera promessa),
//      já com o `reserva` (Node pronto, passado por quem chama) montado e escondido dentro.
//   2. renderizarDiagrama() é chamada quando a aba que contém o diagrama abre. Ela importa
//      o Mermaid do CDN (ES module), inicializa com startOnLoad:false e roda
//      mermaid.run({nodes}).
//   3. Se o CDN estiver fora do ar, bloqueado ou demorar demais, o catch mostra a reserva
//      no lugar do diagrama. O usuário nunca fica com um buraco na tela.
//
// Detalhe importante: o Mermaid marca o nó já desenhado com data-processed="true" e não
// redesenha por cima. Como a aba pode ser aberta várias vezes, guardamos o texto original
// do diagrama e restauramos o nó antes de cada run().
//
// Este arquivo é o núcleo compartilhado por phaseFlow.js (Módulo 2, as 4 fases) e por
// qualquer outro diagrama do hub (Módulo 1: roteiro do drainer, quem guarda a chave,
// cripto até virar reais, plano de emergência, camadas do Permit2). O que muda de um
// diagrama para outro — os chips da reserva, a legenda, o texto do diagrama — fica com
// quem chama; aqui só mora a mecânica de carregar, desenhar e recuperar de erro.

import { criarElemento } from '../ui.js';

const URL_MERMAID = 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs';

// Se o CDN não responder nesse tempo, vamos direto para os cards de reserva.
const TEMPO_LIMITE_MS = 8000;

// Import só uma vez por sessão; as aberturas seguintes de qualquer aba reaproveitam o módulo.
let promessaMermaid = null;

// Guarda o texto do diagrama de cada figura, para poder redesenhar depois.
const textosDoDiagrama = new WeakMap();

// Envolve uma promessa num tempo limite — evita spinner eterno se o CDN pendurar.
function comTempoLimite(promessa, ms) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('Tempo esgotado ao carregar o Mermaid.')), ms);
    promessa.then(
      (valor) => {
        clearTimeout(timer);
        resolve(valor);
      },
      (erro) => {
        clearTimeout(timer);
        reject(erro);
      },
    );
  });
}

// Importa e configura o Mermaid. Em caso de falha zera o cache para permitir nova tentativa.
function carregarMermaid() {
  if (promessaMermaid) return promessaMermaid;

  promessaMermaid = comTempoLimite(import(/* @vite-ignore */ URL_MERMAID), TEMPO_LIMITE_MS)
    .then((modulo) => {
      const mermaid = modulo.default;

      // startOnLoad:false porque o conteúdo é injetado depois, quando a aba abre.
      mermaid.initialize({
        startOnLoad: false,
        securityLevel: 'strict',
        theme: 'dark',
        fontFamily: '"Inter", -apple-system, "Segoe UI", Roboto, sans-serif',
        // useMaxWidth:false mantém o diagrama no tamanho natural. Em tela estreita ele
        // não encolhe até ficar ilegível: quem rola é o container com overflow-x-auto.
        flowchart: { curve: 'basis', padding: 14, useMaxWidth: false },
        themeVariables: {
          background: '#141A24',
          mainBkg: '#1F2733',
          primaryColor: '#1F2733',
          primaryTextColor: '#E6EDF3',
          primaryBorderColor: '#7C3AED',
          lineColor: '#9AA7B4',
          textColor: '#E6EDF3',
        },
      });

      return mermaid;
    })
    .catch((erro) => {
      promessaMermaid = null;
      throw erro;
    });

  return promessaMermaid;
}

// O Mermaid mede o texto para desenhar, então só funciona num elemento visível.
// Serve para cancelar um desenho quando a aba foi fechada no meio do caminho.
function estaVisivel(elemento) {
  if (typeof elemento.checkVisibility === 'function') return elemento.checkVisibility();
  return elemento.isConnected && elemento.offsetParent !== null;
}

/**
 * Monta o bloco do diagrama. Devolve o elemento imediatamente (sem await), já contendo
 * o alvo do Mermaid, a reserva escondida e a linha de status.
 *
 * @param {object} opcoes
 * @param {string} opcoes.diagrama        Texto do diagrama em sintaxe Mermaid.
 * @param {Node}   opcoes.reserva         Elemento pronto (Tailwind puro) mostrado se o
 *                                        Mermaid não carregar ou não desenhar.
 * @param {string} opcoes.rotuloAcessivel Descrição do diagrama para leitor de tela
 *                                        (vira o aria-label da área de rolagem).
 * @param {string} [opcoes.legenda]       Texto da legenda embaixo do diagrama.
 * @param {string} [opcoes.mensagemErroSintaxe] Nome do arquivo/campo a apontar se o
 *                                        Mermaid carregar mas não desenhar (erro de sintaxe).
 */
export function montarDiagrama({
  diagrama,
  reserva,
  rotuloAcessivel,
  legenda = '',
  mensagemErroSintaxe = 'no diagrama',
}) {
  const alvoMermaid = criarElemento('div', {
    'data-diagrama-mermaid': '',
    class: 'flex min-w-fit justify-center',
    role: 'img',
    'aria-label': rotuloAcessivel,
  });

  const areaDeReserva = criarElemento('div', { 'data-diagrama-reserva': '', hidden: true }, [
    reserva,
  ]);

  const status = criarElemento(
    'p',
    { 'data-diagrama-status': '', class: 'mt-3 text-center text-xs text-texto-suave', role: 'status' },
    ['Carregando o diagrama...'],
  );

  const figura = criarElemento(
    'figure',
    { 'data-diagrama': '', class: 'rounded-card border border-borda bg-superficie p-4 sm:p-5' },
    [
      // Em tela estreita o diagrama rola aqui dentro, sem esticar a página.
      // tabindex=0 para quem navega por teclado também conseguir rolar.
      criarElemento(
        'div',
        {
          'data-diagrama-rolagem': '',
          class: 'overflow-x-auto',
          tabindex: '0',
          role: 'group',
          'aria-label': (legenda || rotuloAcessivel) + ' (role na horizontal para ver tudo)',
        },
        [alvoMermaid],
      ),
      areaDeReserva,
      status,
      legenda &&
        criarElemento('figcaption', { class: 'mt-3 text-center text-xs text-texto-suave' }, [
          legenda,
        ]),
    ],
  );

  textosDoDiagrama.set(figura, { diagrama, mensagemErroSintaxe });
  return figura;
}

// Mostra a reserva e esconde o alvo do Mermaid.
function mostrarReserva(figura, mensagem) {
  const alvo = figura.querySelector('[data-diagrama-mermaid]');
  const reserva = figura.querySelector('[data-diagrama-reserva]');
  const status = figura.querySelector('[data-diagrama-status]');
  const rolagem = figura.querySelector('[data-diagrama-rolagem]');

  if (alvo) {
    alvo.hidden = true;
    alvo.style.visibility = '';
  }
  // Sem diagrama não há nada para rolar: tira a caixa vazia do caminho do Tab.
  if (rolagem) rolagem.hidden = true;
  if (reserva) reserva.hidden = false;
  if (status) {
    status.hidden = false;
    status.replaceChildren(document.createTextNode(mensagem));
  }
}

/**
 * Desenha (ou redesenha) o diagrama. Chamar toda vez que a aba que o contém abrir.
 * Nunca lança: se o Mermaid falhar, cai na reserva.
 *
 * @returns {Promise<'mermaid'|'reserva'>} qual das duas versões ficou na tela.
 */
export async function renderizarDiagrama(figura) {
  if (!figura) return 'reserva';

  const alvo = figura.querySelector('[data-diagrama-mermaid]');
  const reserva = figura.querySelector('[data-diagrama-reserva]');
  const status = figura.querySelector('[data-diagrama-status]');
  const guardado = textosDoDiagrama.get(figura);

  if (!alvo || !guardado?.diagrama) {
    mostrarReserva(figura, 'Diagrama indisponível; veja o fluxo em cards acima.');
    return 'reserva';
  }

  const { diagrama, mensagemErroSintaxe } = guardado;

  // Duas coisas diferentes podem dar errado, e a mensagem de cada uma é diferente:
  // (1) o Mermaid não carregou (CDN fora do ar, sem internet, bloqueado);
  // (2) o Mermaid carregou mas não desenhou (quase sempre erro de sintaxe no diagrama).
  let mermaid;
  try {
    mermaid = await carregarMermaid();
  } catch (erro) {
    console.warn('[diagrama] não consegui carregar o Mermaid, usando a reserva:', erro);
    mostrarReserva(
      figura,
      'Não foi possível carregar o diagrama (o Mermaid vem de um CDN e precisa de internet). ' +
        'O fluxo acima mostra a mesma sequência.',
    );
    return 'reserva';
  }

  try {
    // O nó pode já ter sido desenhado numa abertura anterior da aba: devolvemos
    // o texto original e tiramos a marca data-processed para o run() valer de novo.
    alvo.removeAttribute('data-processed');
    alvo.textContent = diagrama;
    alvo.hidden = false;
    // O texto cru do diagrama ("graph LR ...") fica dentro do elemento até o Mermaid
    // trocá-lo pelo SVG, e ele carrega o desenhista de fluxograma por rede na primeira
    // vez — o suficiente para o texto cru piscar na tela. visibility:hidden esconde esse
    // piscar SEM tirar o elemento do layout: o Mermaid precisa medir o texto para
    // desenhar, e display:none zeraria as medidas.
    alvo.style.visibility = 'hidden';
    // Uma tentativa anterior pode ter escondido a caixa de rolagem; reabre.
    const rolagem = figura.querySelector('[data-diagrama-rolagem]');
    if (rolagem) rolagem.hidden = false;

    // Se a aba foi fechada enquanto o Mermaid carregava, a figura está em display:none
    // e a medição do texto falharia. Desistir aqui é o certo: a próxima abertura da
    // aba monta uma figura nova e desenha nela.
    if (!estaVisivel(figura)) return 'reserva';

    await mermaid.run({ nodes: [alvo], suppressErrors: false });
    alvo.style.visibility = '';

    // O SVG sai com width/height em atributo; garantimos que a altura acompanhe.
    const svg = alvo.querySelector('svg');
    if (svg) svg.style.height = 'auto';

    if (reserva) reserva.hidden = true;
    if (status) status.hidden = true;
    return 'mermaid';
  } catch (erro) {
    // A aba foi fechada no meio do desenho: não é falha de conteúdo e a mensagem de
    // erro só assustaria. A próxima abertura desenha do zero.
    if (!estaVisivel(figura)) return 'reserva';

    // O Mermaid está aqui, então o problema é o desenho em si — na prática, sintaxe
    // inválida no diagrama. De qualquer forma o conteúdo continua na reserva.
    console.warn('[diagrama] o Mermaid carregou mas não desenhou o diagrama:', erro);
    mostrarReserva(
      figura,
      'O diagrama não pôde ser desenhado — provável erro de sintaxe ' +
        mensagemErroSintaxe +
        '. O fluxo acima mostra a mesma sequência.',
    );
    return 'reserva';
  }
}
