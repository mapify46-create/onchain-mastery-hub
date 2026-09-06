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

// Instância do Chart.js já desenhada em cada figura. Serve para duas coisas:
// destruir a anterior antes de desenhar de novo (o aoAtivar das abas chama
// renderizarGrafico toda vez que a aba reaparece, e o Chart.js recusa desenhar
// num canvas já em uso), e redimensionar quando o container muda de largura.
const instanciaDoGrafico = new WeakMap();

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

  dadosDoGrafico.set(figura, { tipo: 'barras', barras });
  return figura;
}

// ---------------------------------------------------------------------------
// Barras empilhadas
//
// Existe para uma pergunta que a barra simples não responde: como um total se
// REPARTE. No Módulo 5, o custo de uma operação é a soma de camadas de tamanhos
// muito diferentes, e a lição inteira está na proporção entre elas — a fatia
// anunciada é a pequena e estável, as outras é que variam. Uma tabela mostra os
// números; só a barra empilhada mostra a proporção.
// ---------------------------------------------------------------------------

// Reserva em texto de um gráfico empilhado: cada grupo vira um bloco com o total
// em destaque e as camadas discriminadas embaixo.
function criarReservaEmpilhada(grupos, camadas, sufixo) {
  return criarElemento(
    'ul',
    { class: 'space-y-4' },
    grupos.map((grupo) =>
      criarElemento('li', { class: 'rounded-lg border border-borda bg-fundo p-3' }, [
        criarElemento('div', { class: 'flex items-baseline justify-between gap-3' }, [
          criarElemento('span', { class: 'text-sm font-medium text-texto' }, [grupo.rotulo]),
          criarElemento('span', { class: 'text-sm font-semibold text-texto' }, [grupo.detalhe]),
        ]),
        criarElemento(
          'ul',
          { class: 'mt-2 space-y-1' },
          camadas.map((camada) =>
            criarElemento(
              'li',
              { class: 'flex items-baseline justify-between gap-3 text-xs text-texto-suave' },
              [
                criarElemento('span', {}, [camada.rotulo]),
                criarElemento('span', {}, [
                  formatarNumero(grupo.valores[camada.chave]) + sufixo,
                ]),
              ],
            ),
          ),
        ),
      ]),
    ),
  );
}

// Duas casas decimais, com vírgula — o padrão do resto do hub. Inteiro fica
// inteiro: um gráfico que conta unidades ("2 tipos") não pode mostrar "2,00".
function formatarNumero(valor) {
  const n = Number(valor);
  return Number.isInteger(n) ? String(n) : n.toFixed(2).replace('.', ',');
}

/**
 * Monta um gráfico de barras horizontais empilhadas. Mesmo contrato do
 * montarGraficoDeBarras: devolve o elemento na hora, e quem chama passa a figura
 * para renderizarGrafico() quando ela estiver visível.
 *
 * @param {object} opcoes
 * @param {Array}  opcoes.camadas [{ chave, rotulo, cor }] — `cor` é o nome de um
 *                                token do tema (ex.: 'primaria', 'risco-alto').
 * @param {Array}  opcoes.grupos  [{ rotulo, detalhe, valores: { [chave]: numero } }].
 * @param {string} [opcoes.sufixo]  Unidade colada no número (ex.: '%').
 * @param {string} [opcoes.legenda] Texto pequeno embaixo do gráfico.
 */
export function montarGraficoEmpilhado({ camadas = [], grupos = [], sufixo = '', legenda = '' }) {
  const resumoAcessivel = grupos
    .map(
      (grupo) =>
        grupo.rotulo +
        ', total ' +
        grupo.detalhe +
        ': ' +
        camadas
          .map((c) => c.rotulo + ' ' + formatarNumero(grupo.valores[c.chave]) + sufixo)
          .join(', '),
    )
    .join('. ');

  const canvas = criarElemento('canvas', {
    'data-grafico-canvas': '',
    role: 'img',
    'aria-label': 'Gráfico de barras empilhadas. ' + resumoAcessivel + '.',
  });

  const areaDoCanvas = criarElemento(
    'div',
    {
      'data-grafico-area': '',
      class: 'relative w-full',
      // Empilhada precisa de mais altura por barra que a simples: cada faixa
      // carrega várias camadas e a legenda de cores fica dentro do canvas.
      style: 'height: ' + (grupos.length * 64 + 64) + 'px',
    },
    [canvas],
  );

  const reserva = criarElemento('div', { 'data-grafico-reserva': '', hidden: true }, [
    criarReservaEmpilhada(grupos, camadas, sufixo),
  ]);

  const status = criarElemento(
    'p',
    {
      'data-grafico-status': '',
      class: 'mt-3 text-center text-xs text-texto-suave',
      role: 'status',
    },
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

  dadosDoGrafico.set(figura, { tipo: 'empilhado', camadas, grupos, sufixo });
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

// Figuras que já têm um observador de largura, para não criar dois.
const observadas = new WeakSet();

// O "responsive: true" do Chart.js sozinho não estava encolhendo o canvas quando
// o container ficava mais estreito — girar o celular ou redimensionar a janela
// deixava o gráfico estourando a largura da página. Um ResizeObserver no
// container resolve, e vale para os dois tipos de gráfico.
function observarLargura(figura, grafico) {
  if (observadas.has(figura) || typeof ResizeObserver !== 'function') return;

  const area = figura.querySelector('[data-grafico-area]');
  if (!area) return;

  const observador = new ResizeObserver(() => {
    // Só a instância atual: uma figura redesenhada troca de instância, e a
    // antiga já foi destruída.
    const atual = instanciaDoGrafico.get(figura);
    if (atual) atual.resize();
  });

  observador.observe(area);
  observadas.add(figura);
}

// Eixos e grade compartilhados pelos dois tipos de gráfico.
function eixosBase({ empilhado = false, maximo = 100, sufixo = '%' } = {}) {
  const corTexto = corDoTema('texto-suave', '#9AA7B4');
  const corBorda = corDoTema('borda', '#1F2733');

  return {
    x: {
      stacked: empilhado,
      min: 0,
      // No empilhado o total varia por grupo; deixar o Chart.js escolher o topo
      // aproveita melhor a largura do que travar em 100%.
      ...(empilhado ? {} : { max: maximo }),
      ticks: {
        color: corTexto,
        // Sem casas decimais nas marcas do eixo: "0,5 tipos" não existe, e para
        // porcentagem "0%, 1%, 2%, 3%" lê melhor que "0,5%, 1,5%...".
        precision: 0,
        callback: (valor) => String(valor).replace('.', ',') + sufixo,
      },
      grid: { color: corBorda },
      border: { color: corBorda },
    },
    y: {
      stacked: empilhado,
      ticks: { color: corTexto },
      grid: { display: false },
      border: { color: corBorda },
    },
  };
}

// Configuração do gráfico de barras simples (uma série, percentual de 0 a 100).
function configBarras(barras) {
  return {
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
      scales: eixosBase(),
    },
  };
}

// Configuração do gráfico empilhado: uma série por camada, todas na mesma barra.
function configEmpilhado({ camadas, grupos, sufixo }) {
  const corTexto = corDoTema('texto-suave', '#9AA7B4');

  return {
    type: 'bar',
    data: {
      labels: grupos.map((grupo) => grupo.rotulo),
      datasets: camadas.map((camada) => ({
        label: camada.rotulo,
        data: grupos.map((grupo) => grupo.valores[camada.chave]),
        backgroundColor: corDoTema(camada.cor, '#7C3AED'),
        borderRadius: 3,
        barPercentage: 0.62,
      })),
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      animation: prefereMenosMovimento() ? false : { duration: 500 },
      plugins: {
        // Aqui a legenda é obrigatória: sem ela as cores não significam nada.
        legend: {
          position: 'bottom',
          labels: { color: corTexto, boxWidth: 12, boxHeight: 12, padding: 16 },
        },
        tooltip: {
          callbacks: {
            label: (contexto) =>
              contexto.dataset.label + ': ' + formatarNumero(contexto.parsed.x) + sufixo,
            // Rodapé com o total da barra — é a leitura que mais interessa.
            footer: (itens) => 'Total: ' + grupos[itens[0].dataIndex].detalhe,
          },
        },
      },
      scales: eixosBase({ empilhado: true, sufixo }),
    },
  };
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
  const config = dadosDoGrafico.get(figura);

  const temDados =
    config?.tipo === 'empilhado' ? config.grupos?.length > 0 : config?.barras?.length > 0;

  if (!canvas || !temDados) {
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
    // Desenhar duas vezes no mesmo canvas faz o Chart.js recusar ("canvas is
    // already in use") e vaza a instância antiga junto com seus listeners.
    instanciaDoGrafico.get(figura)?.destroy();

    const grafico = new Chart(
      canvas,
      config.tipo === 'empilhado' ? configEmpilhado(config) : configBarras(config.barras),
    );
    instanciaDoGrafico.set(figura, grafico);
    observarLargura(figura, grafico);

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
