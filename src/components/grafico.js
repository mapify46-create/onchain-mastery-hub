// grafico.js — gráficos com Chart.js, carregado do CDN sob demanda.
//
// Segue exatamente o mesmo desenho do src/components/diagrama.js (Mermaid):
//   1. montarGraficoDeBarras() devolve o elemento pronto NA HORA, já com uma
//      versão de reserva em texto montada e escondida dentro dele.
//   2. renderizarGrafico() é chamada quando o gráfico entra na tela. Ela importa
//      o Chart.js do CDN e desenha no <canvas>.
//   3. Se o CDN estiver fora do ar, bloqueado ou demorar demais, a reserva em
//      texto aparece no lugar. O usuário nunca fica com um buraco na tela.
//
// Por que a reserva não é só um "plano B": um <canvas> é uma imagem pintada
// pixel a pixel — leitor de tela não lê nada do que está desenhado ali dentro.
// A lista em texto é o que torna o gráfico acessível, e ela existe sempre.

import { criarElemento } from '../ui.js';

// Entrada "auto" do Chart.js: já vem com todos os tipos de gráfico registrados.
// Versão fixada de propósito — CDN sem versão fixa quebra sozinho um dia.
const URL_CHARTJS = 'https://cdn.jsdelivr.net/npm/chart.js@4.4.4/auto/+esm';

// Se o CDN não responder nesse tempo, vamos direto para a reserva.
const TEMPO_LIMITE_MS = 8000;

// Import só uma vez por sessão; gráficos seguintes reaproveitam o módulo.
let promessaChart = null;

// Guarda os dados de cada figura, para poder desenhar (e redesenhar) depois.
const dadosDoGrafico = new WeakMap();

// Cores do tema, lidas do CSS para não duplicar a paleta em dois lugares.
// Se o CSS não tiver carregado, cai num valor equivalente ao token.
function corDoTema(nome, reserva) {
  const valor = getComputedStyle(document.documentElement)
    .getPropertyValue('--omh-' + nome)
    .trim();
  return valor || reserva;
}

// Envolve uma promessa num tempo limite — evita espera eterna se o CDN pendurar.
function comTempoLimite(promessa, ms) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('Tempo esgotado ao carregar o Chart.js.')), ms);
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

// Importa o Chart.js. Em caso de falha zera o cache para permitir nova tentativa.
function carregarChart() {
  if (promessaChart) return promessaChart;

  promessaChart = comTempoLimite(import(/* @vite-ignore */ URL_CHARTJS), TEMPO_LIMITE_MS)
    .then((modulo) => modulo.default)
    .catch((erro) => {
      promessaChart = null;
      throw erro;
    });

  return promessaChart;
}

// O Chart.js precisa medir o container para desenhar; num elemento escondido as
// medidas são zero. Serve para desistir quando a tela mudou no meio do caminho.
function estaVisivel(elemento) {
  if (typeof elemento.checkVisibility === 'function') return elemento.checkVisibility();
  return elemento.isConnected && elemento.offsetParent !== null;
}

// Respeita a preferência de menos animação do sistema (mesma regra da Fase 7).
function prefereMenosMovimento() {
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
}

// Reserva em texto: a mesma informação do gráfico, como lista de "rótulo — valor".
function criarReservaEmTexto(barras) {
  return criarElemento(
    'ul',
    { class: 'space-y-2' },
    barras.map((barra) =>
      criarElemento(
        'li',
        { class: 'flex items-baseline justify-between gap-3 text-sm' },
        [
          criarElemento('span', { class: 'text-texto' }, [barra.rotulo]),
          criarElemento('span', { class: 'text-texto-suave' }, [barra.detalhe]),
        ],
      ),
    ),
  );
}

/**
 * Monta um gráfico de barras horizontais. Devolve o elemento imediatamente
 * (sem await) — quem chama precisa depois passar essa figura para
 * renderizarGrafico() quando ela estiver visível na tela.
 *
 * @param {object} opcoes
 * @param {Array}  opcoes.barras  [{ rotulo, percentual, detalhe }] — `detalhe` é o
 *                                texto exato ("3 de 4 módulos"), usado no tooltip
 *                                e na reserva.
 * @param {string} [opcoes.legenda] Texto pequeno embaixo do gráfico.
 */
export function montarGraficoDeBarras({ barras = [], legenda = '' }) {
  const canvas = criarElemento('canvas', {
    'data-grafico-canvas': '',
    role: 'img',
    // O leitor de tela não enxerga dentro do canvas: este rótulo é o conteúdo.
    'aria-label':
      'Gráfico de barras. ' + barras.map((b) => b.rotulo + ': ' + b.detalhe).join('. ') + '.',
  });

  // O Chart.js redimensiona o canvas para caber no container, mas só consegue medir
  // corretamente se o container tiver posição relativa e uma largura definida —
  // sem isso, ele mede errado e o gráfico estoura a tela em telas estreitas.
  // Altura proporcional ao número de barras, para não achatar nem sobrar espaço.
  const areaDoCanvas = criarElemento(
    'div',
    {
      'data-grafico-area': '',
      class: 'relative w-full',
      style: 'height: ' + (barras.length * 42 + 16) + 'px',
    },
    [canvas],
  );

  const reserva = criarElemento('div', { 'data-grafico-reserva': '', hidden: true }, [
    criarReservaEmTexto(barras),
  ]);

  const status = criarElemento(
    'p',
    { 'data-grafico-status': '', class: 'mt-3 text-center text-xs text-texto-suave', role: 'status' },
    ['Carregando o gráfico...'],
  );

  const figura = criarElemento('figure', { 'data-grafico': '' }, [
    areaDoCanvas,
    reserva,
    status,
    legenda &&
      criarElemento(
        'figcaption',
        { 'data-grafico-legenda': '', class: 'mt-3 text-center text-xs text-texto-suave' },
        [legenda],
      ),
  ]);

  dadosDoGrafico.set(figura, barras);
  return figura;
}

// Mostra a reserva em texto e esconde o canvas. A legenda também some: ela
// convida a "passar o mouse numa barra", instrução que não faz sentido quando
// não há barra nenhuma na tela — os números já estão todos na lista.
function mostrarReserva(figura, mensagem) {
  const area = figura.querySelector('[data-grafico-area]');
  const reserva = figura.querySelector('[data-grafico-reserva]');
  const status = figura.querySelector('[data-grafico-status]');
  const legenda = figura.querySelector('[data-grafico-legenda]');

  if (area) area.hidden = true;
  if (reserva) reserva.hidden = false;
  if (legenda) legenda.hidden = true;
  if (status) {
    status.hidden = false;
    status.replaceChildren(document.createTextNode(mensagem));
  }
}

/**
 * Desenha o gráfico. Nunca lança: se o Chart.js falhar, cai na reserva em texto.
 * @returns {Promise<'grafico'|'reserva'>} qual das duas versões ficou na tela.
 */
export async function renderizarGrafico(figura) {
  if (!figura) return 'reserva';

  const canvas = figura.querySelector('[data-grafico-canvas]');
  const reserva = figura.querySelector('[data-grafico-reserva]');
  const status = figura.querySelector('[data-grafico-status]');
  const barras = dadosDoGrafico.get(figura);

  if (!canvas || !barras?.length) {
    mostrarReserva(figura, 'Gráfico indisponível; os números estão na lista acima.');
    return 'reserva';
  }

  let Chart;
  try {
    Chart = await carregarChart();
  } catch (erro) {
    console.warn('[grafico] não consegui carregar o Chart.js, usando a lista em texto:', erro);
    mostrarReserva(
      figura,
      'Não foi possível carregar o gráfico (ele vem de um CDN e precisa de internet). ' +
        'Os mesmos números estão na lista acima.',
    );
    return 'reserva';
  }

  // A tela pode ter mudado enquanto o CDN respondia; sem elemento visível o
  // Chart.js mede zero e desenha errado.
  if (!estaVisivel(figura)) return 'reserva';

  try {
    const corTexto = corDoTema('texto-suave', '#9AA7B4');
    const corBorda = corDoTema('borda', '#1F2733');

    new Chart(canvas, {
      type: 'bar',
      data: {
        labels: barras.map((barra) => barra.rotulo),
        datasets: [
          {
            data: barras.map((barra) => Math.round(barra.percentual)),
            backgroundColor: corDoTema('primaria', '#7C3AED'),
            hoverBackgroundColor: corDoTema('acento', '#22D3EE'),
            borderRadius: 6,
            // Barra um pouco mais fina que a faixa: dá respiro entre elas.
            barPercentage: 0.7,
          },
        ],
      },
      options: {
        indexAxis: 'y', // barras horizontais: os rótulos são longos
        responsive: true,
        maintainAspectRatio: false,
        animation: prefereMenosMovimento() ? false : { duration: 500 },
        plugins: {
          legend: { display: false }, // uma série só: legenda seria ruído
          tooltip: {
            callbacks: {
              // Mostra "3 de 4 módulos" em vez de só "75"
              label: (contexto) => barras[contexto.dataIndex].detalhe,
            },
          },
        },
        scales: {
          x: {
            min: 0,
            max: 100,
            ticks: { color: corTexto, callback: (valor) => valor + '%' },
            grid: { color: corBorda },
            border: { color: corBorda },
          },
          y: {
            ticks: { color: corTexto },
            grid: { display: false },
            border: { color: corBorda },
          },
        },
      },
    });

    if (reserva) reserva.hidden = true;
    if (status) status.hidden = true;
    return 'grafico';
  } catch (erro) {
    if (!estaVisivel(figura)) return 'reserva';

    console.warn('[grafico] o Chart.js carregou mas não desenhou:', erro);
    mostrarReserva(figura, 'O gráfico não pôde ser desenhado. Os números estão na lista acima.');
    return 'reserva';
  }
}
