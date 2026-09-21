// views/modulo4.js — monta a página do Módulo 4 a partir de src/data/modulo4.js
// e de src/data/cenarios.js.
//
// A página segue o desenho do Claude Design (pesquisa/design/handoff/designs/
// "M4 Desktop.dc.html"): cabeçalho, o mapa "O módulo inteiro numa olhada", as
// abas e, em cada aba, os destaques e depois um card por seção. Cada card tem o
// título, a ideia central (borda ciano), o visual DENTRO do card, 1 a 3 frases e,
// quando o desenho pede, a "Pergunta rápida" no fim.
//
// Abas internas (padrão ARIA de tabs, vindo de ui.js):
//   Tese vs. catálise · Take profit · Antes de entrar · Simulador · Quiz
//
// As cores e medidas são as do desenho (tokens do README do handoff). Os textos
// vêm todos de src/data/modulo4.js; aqui ficam só a montagem e as contas.

import { modulo4 } from '../data/modulo4.js';
import { cenarios } from '../data/cenarios.js';
import { criarElemento, criarTitulo, criarCard, criarBotao, criarAbas, mostrarToast, html } from '../ui.js';
import { criarCardDaSecao } from '../components/secao.js';
import { videoDaSecao } from '../components/video.js';
import { montarSimulador } from '../components/simulator.js';
import { montarQuiz, juntarPorques } from '../components/quiz.js';
import { montarDestaques } from '../components/destaques.js';
import { criarFluxograma, criarFluxoLinear } from '../components/fluxograma.js';
import { criarMapaDoModulo } from '../components/visuais.js';
import { obterEstado, atualizar } from '../store.js';

// ---------------------------------------------------------------------------
// Peças comuns
// ---------------------------------------------------------------------------

// Os tokens de cor do desenho (README do handoff).
const COR = {
  fundo: '#0B0F17',
  superficie: '#141A24',
  borda: '#1F2733',
  texto: '#E6EDF3',
  suave: '#9AA7B4',
  primaria: '#7C3AED',
  acento: '#22D3EE',
  verde: '#22C55E',
  ambar: '#F59E0B',
  vermelho: '#EF4444', // preenchimento (barras)
  vermelhoTexto: '#F87171', // texto vermelho é sempre este
};

// Os "trios" de estado do desenho: borda + fundo (+ cor do micro-rótulo).
const TRIO = {
  neutro: { borda: COR.borda, fundo: COR.superficie, cor: COR.texto },
  acento: { borda: COR.acento, fundo: 'rgba(34,211,238,.1)', cor: COR.acento },
  acentoSuave: { borda: 'rgba(34,211,238,.5)', fundo: 'rgba(34,211,238,.1)', cor: COR.acento },
  primaria: { borda: 'rgba(124,58,237,.6)', fundo: 'rgba(124,58,237,.15)', cor: COR.texto },
  bom: { borda: 'rgba(34,197,94,.5)', fundo: 'rgba(34,197,94,.12)', cor: COR.verde },
  alerta: { borda: 'rgba(245,158,11,.4)', fundo: 'rgba(245,158,11,.12)', cor: COR.ambar },
  ruim: { borda: 'rgba(239,68,68,.5)', fundo: 'rgba(239,68,68,.12)', cor: COR.vermelhoTexto },
};

const MONO = "'JetBrains Mono',ui-monospace,monospace";

// Micro-rótulo em maiúsculas (11px ou 12px, como no desenho).
const MICRO_11 = 'margin:0;font-size:11px;font-weight:600;letter-spacing:.05em;text-transform:uppercase';
const MICRO_12 = 'margin:0;font-size:12px;font-weight:600;letter-spacing:.05em;text-transform:uppercase;color:#9AA7B4';

// A caixa escura em que todo visual fica, dentro do card da seção.
const CAIXA = 'margin:0;border-radius:8px;border:1px solid #1F2733;background:#0B0F17;padding:20px;min-width:0';

// Duas colunas no computador e uma no celular (cada coluna com pelo menos 280px).
const DUAS_COLUNAS = 'display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr))';

// Número no padrão brasileiro com casas fixas: (2, 1) → "2,0"; (1900, 0) → "1.900".
function numero(valor, casas = 0) {
  return Number(valor).toLocaleString('pt-BR', { minimumFractionDigits: casas, maximumFractionDigits: casas });
}

// Termina a frase com ponto, se ela ainda não terminar com pontuação.
function comPonto(texto) {
  const frase = String(texto).trim();
  return /[.!?…]$/.test(frase) ? frase : frase + '.';
}

// Círculo ciano numerado (marcador de passo do desenho).
function criarMarcador(numeroDoPasso) {
  return html`<span aria-hidden="true" style="flex:0 0 24px;width:24px;height:24px;border-radius:50%;background:#22D3EE;color:#0B0F17;font-family:${MONO};font-size:13px;font-weight:700;display:inline-flex;align-items:center;justify-content:center">${String(numeroDoPasso)}</span>`;
}

// As perguntas do quiz já com o "Por que a sua não serve" de cada errada.
const PERGUNTAS = juntarPorques(modulo4.quiz, modulo4.porqueErradas);

// A "Pergunta rápida" saiu de todas as seções em 20/09 (decisão do dono): as
// perguntas ficam só no mini-quiz do fim do módulo, que continua usando PERGUNTAS.

// Um controle deslizante no traço do desenho: rótulo à esquerda, valor em
// JetBrains Mono à direita e o trilho .omh-range (styles/custom.css) embaixo.
// `aoMudar(valor)` roda a cada movimento; `mostrar(valor)` põe o valor na tela.
//
// A área de toque tem 44px de altura (o mínimo do README do handoff), e não os
// 24px do .omh-range. As margens negativas tiram o espaço em branco de sobra:
// o trilho continua no mesmo lugar e o bloco ocupa a mesma altura do desenho.
const ALTURA_DE_TOQUE = 'height:44px;margin-top:-6px;margin-bottom:-14px';

function criarDeslizante(controle, aoMudar) {
  const id = 'm4-' + controle.id;
  const texto = (valor) => controle.formatar(valor) + controle.sufixo;
  const saida = html`<output for="${id}" style="font-family:${MONO};font-size:14px;font-weight:600"></output>`;
  const entrada = html`<input id="${id}" class="omh-range" type="range" min="${controle.min}" max="${controle.max}" step="${controle.passo}" style="width:100%;${ALTURA_DE_TOQUE}">`;
  entrada.addEventListener('input', () => aoMudar(Number(entrada.value)));

  function mostrar(valor) {
    entrada.value = String(valor);
    saida.textContent = texto(valor);
    entrada.setAttribute('aria-valuetext', texto(valor));
  }
  mostrar(controle.valor);

  // A linha do rótulo fica por cima do input (position + z-index). Como o input
  // tem 44px e sobe 6px, a caixa dele encostaria na linha do rótulo e roubaria o
  // clique de quem só quis ler o rótulo; assim o clique no rótulo vai para o
  // rótulo (que só dá foco ao controle) e o trilho continua no lugar do desenho.
  const bloco = html`<div>
    <div style="position:relative;z-index:1;display:flex;justify-content:space-between;gap:12px;align-items:baseline">
      <label for="${id}" style="font-size:14px;color:#9AA7B4">${controle.rotulo}</label>
      ${saida}
    </div>
    ${entrada}
  </div>`;
  return { bloco, entrada, mostrar };
}

// Uma barra horizontal de 22px, no traço das calculadoras do desenho.
// `largura` em % (0 a 100) do trilho.
function criarBarra({ rotulo, valorTexto, largura, cor, nota = null }) {
  return html`<div>
    <div style="display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;align-items:baseline">
      <span style="font-size:14px">${rotulo}</span>
      <span style="font-family:${MONO};font-size:14px;font-variant-numeric:tabular-nums">${valorTexto}</span>
    </div>
    <div style="margin-top:6px;height:22px;background:#141A24;border-radius:4px;overflow:hidden">
      <div style="height:100%;width:${Math.max(0, Math.min(100, largura)).toFixed(2)}%;background:${cor}"></div>
    </div>
    ${nota ? html`<p style="margin:4px 0 0;font-size:13px;color:#9AA7B4">${nota}</p>` : ''}
  </div>`;
}

// ---------------------------------------------------------------------------
// Aba 1 — Tese vs. catálise
// ---------------------------------------------------------------------------

// As duas frases lado a lado (Tese em roxo, Catálise em ciano), cada uma com o
// que acontece quando vem sozinha; embaixo, a caixa verde "As duas juntas…".
function criarDuasFrases() {
  const { duasFrases, rotuloSozinha, juntas } = modulo4.teseVsCatalise;
  const tons = [TRIO.primaria, TRIO.acentoSuave];
  const descricao =
    duasFrases.map((f) => f.nome + ' — ' + f.pergunta + ' ' + f.oQueE + ' ' + rotuloSozinha + ': ' + f.sozinha).join(' ') +
    ' ' + juntas.destaque;

  return html`<figure style="${CAIXA}">
    <div role="img" aria-label="${descricao}" style="${DUAS_COLUNAS};gap:16px">
      ${duasFrases.map((frase, i) => {
        const tom = tons[i] ?? TRIO.neutro;
        return html`<div style="border-radius:8px;border:1px solid ${tom.borda};background:${tom.fundo};padding:16px;display:flex;flex-direction:column;gap:10px">
          <p style="${MICRO_11};color:${tom.cor}">${frase.nome}</p>
          <p style="margin:0;font-size:16px;font-weight:600">${frase.pergunta}</p>
          <p style="margin:0;font-size:14px;color:#9AA7B4">${frase.oQueE}</p>
          <div style="margin-top:auto;padding-top:8px;border-top:1px solid #1F2733">
            <p style="${MICRO_11};color:#F87171">${rotuloSozinha}</p>
            <p style="margin:2px 0 0;font-size:13px">${frase.sozinha}</p>
          </div>
        </div>`;
      })}
    </div>
    <div aria-hidden="true" style="display:flex;justify-content:center;margin-top:12px"><span style="color:#9AA7B4">↓</span></div>
    <div style="border-radius:8px;border:1px solid rgba(34,197,94,.5);background:rgba(34,197,94,.12);padding:12px 16px;font-size:14px"><strong style="color:#E6EDF3">${juntas.destaque} </strong>${juntas.texto}</div>
  </figure>`;
}

// A caixa roxa "Regra de ouro", dentro do card das duas frases.
function criarRegraDeOuro() {
  const { regraDeOuro } = modulo4.teseVsCatalise;
  return html`<div style="border-radius:8px;border:1px solid rgba(124,58,237,.6);background:rgba(124,58,237,.12);padding:14px 16px">
    <p style="${MICRO_11};color:#9AA7B4">${regraDeOuro.titulo}</p>
    <p style="margin:6px 0 0;font-size:15px">${regraDeOuro.texto}</p>
  </div>`;
}

// O plano em níveis: uma linha por nível, de cima para baixo, com a cor do
// nível e uma barrinha que encurta até a invalidação. Sem eixo e sem preço.
// A cor de cada nível vem do `tom` do dado.
const COR_DO_NIVEL = {
  bom: { rotulo: COR.verde, barra: COR.verde },
  acento: { rotulo: COR.acento, barra: COR.acento },
  neutro: { rotulo: COR.texto, barra: COR.suave },
  alerta: { rotulo: COR.vermelhoTexto, barra: COR.vermelho },
};
// Comprimento da barrinha de cada linha, de cima para baixo (medida do desenho).
// No celular a linha fica apertada: a barrinha encolhe (flex:0 1) para o texto do
// detalhe nunca passar da largura dele. No computador sobra espaço e ela fica na
// medida do desenho.
const MARCAS_DO_PLANO = [96, 64, 40, 24];

function criarPlano() {
  const plano = modulo4.planoDaPosicao;
  const ultimo = plano.niveis.length - 1;
  const descricao =
    'Níveis escritos antes de entrar, de cima para baixo: ' +
    plano.niveis.map((n) => n.rotulo + ' (' + n.detalhe + ')').join('; ') +
    '. ' + plano.restante;

  return html`<figure style="${CAIXA}">
    <div role="img" aria-label="${descricao}" style="display:flex;flex-direction:column">
      ${plano.niveis.map((nivel, i) => {
        const cor = COR_DO_NIVEL[nivel.tom] ?? COR_DO_NIVEL.neutro;
        return html`<div style="display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:${i < ultimo ? '1px solid #1F2733' : '0'}">
          <span class="w-24 sm:w-[120px]" style="flex:none;font-size:14px;font-weight:600;color:${cor.rotulo}">${nivel.rotulo}</span>
          <span style="flex:1 1 auto;font-size:14px;color:#9AA7B4">${nivel.detalhe}</span>
          <span aria-hidden="true" style="flex:0 1 ${MARCAS_DO_PLANO[i] ?? 24}px;height:6px;border-radius:3px;background:${cor.barra}"></span>
        </div>`;
      })}
    </div>
    <p style="margin:14px 0 0;border-radius:6px;border:1px solid #22D3EE;background:rgba(34,211,238,.1);padding:8px 12px;font-size:14px">${plano.restante}</p>
    <figcaption style="margin:12px 0 0;font-size:13px;color:#9AA7B4">${plano.legenda}</figcaption>
  </figure>`;
}

// A ficha de tese: 5 cartões lado a lado (rótulo ciano, pergunta, exemplo).
function criarFicha() {
  const { campos } = modulo4.teseVsCatalise.fichaDeTese;
  return html`<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,240px),1fr));gap:12px">
    ${campos.map(
      (campo) => html`<div style="border-radius:8px;border:1px solid #1F2733;background:#0B0F17;padding:14px 16px;display:flex;flex-direction:column;gap:6px">
        <p style="margin:0;font-size:14px;font-weight:600;color:#22D3EE">${campo.rotulo}</p>
        <p style="margin:0;font-size:14px">${campo.pergunta}</p>
        <div aria-hidden="true" style="height:1px;background:#1F2733;margin:2px 0"></div>
        <p style="margin:0;font-size:13px;color:#9AA7B4">${campo.exemplo}</p>
      </div>`,
    )}
  </div>`;
}

// A tabela "Tese fraca × tese que dá para invalidar". Feita com criarElemento
// (e não com html``) porque o leitor de HTML tira texto solto de dentro de
// <tbody>. A última coluna tem a borda ciano; a linha forte, o fundo ciano.
function criarTabelaDosExemplos() {
  const { tabelaDosExemplos, exemplos } = modulo4.teseVsCatalise;
  const col = tabelaDosExemplos.colunas;
  const BORDA_DO_VEREDITO = 'border-left:2px solid #22D3EE';
  const estiloDoCabecalho =
    'text-align:left;padding:8px 12px;font-size:12px;font-weight:600;letter-spacing:.05em;text-transform:uppercase;color:#9AA7B4;border-bottom:1px solid #1F2733';
  const celula = 'padding:10px 12px;border-bottom:1px solid #1F2733;vertical-align:top';

  const cabecalho = criarElemento('thead', {}, [
    criarElemento('tr', {}, [
      criarElemento('th', { scope: 'col', style: estiloDoCabecalho }, [col.exemplo]),
      criarElemento('th', { scope: 'col', style: estiloDoCabecalho }, [col.tese]),
      criarElemento('th', { scope: 'col', style: estiloDoCabecalho }, [col.catalise]),
      criarElemento('th', { scope: 'col', style: estiloDoCabecalho + ';' + BORDA_DO_VEREDITO }, [col.veredito]),
    ]),
  ]);

  const linhas = exemplos.map((exemplo) => {
    const forte = exemplo.tipo === 'forte';
    const tom = forte ? TRIO.bom : TRIO.ruim;
    return criarElemento('tr', { style: 'background:' + (forte ? 'rgba(34,211,238,.06)' : 'transparent') }, [
      criarElemento('th', { scope: 'row', style: 'text-align:left;' + celula }, [
        criarElemento(
          'span',
          {
            style:
              'border-radius:999px;border:1px solid ' + tom.borda + ';background:' + tom.fundo + ';color:' + tom.cor +
              ';padding:1px 10px;font-size:12px;font-weight:600;white-space:nowrap',
          },
          [exemplo.rotulo],
        ),
      ]),
      criarElemento('td', { style: celula + ';color:#9AA7B4' }, [exemplo.tese]),
      criarElemento('td', { style: celula + ';color:#9AA7B4' }, [exemplo.catalise]),
      criarElemento('td', { style: celula + ';' + BORDA_DO_VEREDITO + ';color:' + (forte ? COR.texto : COR.vermelhoTexto) }, [
        exemplo.veredito,
      ]),
    ]);
  });

  const tabela = criarElemento(
    'table',
    { style: 'border-collapse:collapse;width:100%;min-width:640px;font-size:14px' },
    [cabecalho, criarElemento('tbody', {}, linhas)],
  );

  // A caixa rola na horizontal quando a tabela não cabe (celular).
  return criarElemento(
    'div',
    {
      tabindex: '0',
      role: 'group',
      'aria-label': tabelaDosExemplos.rotuloDaRolagem,
      style: 'border-radius:8px;border:1px solid #1F2733;background:#0B0F17;padding:12px;overflow-x:auto',
    },
    [tabela],
  );
}

// O mapa das catálises: centro roxo "Catálise" e um ramo por catálise, cada ramo
// um cartão com a descrição e a caixa âmbar "O que dá errado:". Tudo aberto.
// No computador, centro à esquerda e ramos à direita; no celular (< 640px), um
// embaixo do outro, com o tronco vertical.
function criarMapaDasCatalises() {
  const tipos = modulo4.teseVsCatalise.tiposDeCatalise;
  // A abertura leva a quantidade de catálises contada na própria lista (o número
  // não fica escrito aqui, para a descrição não mentir se a lista mudar).
  const descricao =
    tipos.aberturaDaDescricao(tipos.itens.length) + ' ' +
    tipos.itens.map((c) => c.nome + ': ' + comPonto(c.descricao) + ' ' + tipos.rotuloDoAlerta + ' ' + c.alerta).join(' ');

  const ramos = tipos.itens.map(
    (item) => html`<li style="position:relative;padding-left:24px">
      <span aria-hidden="true" style="position:absolute;left:0;top:22px;width:24px;height:2px;background:#1F2733"></span>
      <div style="border-radius:8px;border:1px solid #1F2733;background:#141A24;padding:10px 14px;display:flex;flex-direction:column;gap:6px">
        <p style="margin:0;font-size:14px;font-weight:600">${item.nome}</p>
        <p style="margin:0;font-size:13px;color:#9AA7B4">${item.descricao}</p>
        <p style="margin:0;border-radius:6px;border:1px solid rgba(245,158,11,.4);background:rgba(245,158,11,.12);padding:6px 10px;font-size:13px"><strong style="color:#F59E0B">${tipos.rotuloDoAlerta} </strong>${item.alerta}</p>
      </div>
    </li>`,
  );

  return html`<div tabindex="0" role="group" aria-label="${tipos.rotuloDaRolagem}" style="border-radius:8px;border:1px solid #1F2733;background:#0B0F17;padding:16px;overflow-x:auto">
    <div role="img" aria-label="${descricao}" class="flex flex-col items-stretch sm:flex-row sm:items-center sm:min-w-[620px]">
      <div style="flex:0 0 auto;box-sizing:content-box;border-radius:12px;border:1px solid rgba(124,58,237,.6);background:rgba(124,58,237,.15);padding:14px 18px;max-width:190px">
        <p style="margin:0;font-size:15px;font-weight:600">${tipos.centro.titulo}</p>
        <p style="margin:4px 0 0;font-size:13px;color:#9AA7B4">${tipos.centro.subtitulo}</p>
      </div>
      <div aria-hidden="true" class="ml-6 h-5 w-0.5 sm:ml-0 sm:h-0.5 sm:w-8" style="flex:none;background:#1F2733"></div>
      <ul class="ml-6 sm:ml-0" style="list-style:none;margin-top:0;margin-bottom:0;padding:0;border-left:2px solid #1F2733;display:flex;flex-direction:column;gap:10px;flex:1 1 auto;min-width:0">${ramos}</ul>
    </div>
  </div>`;
}

function montarAbaTese() {
  const tese = modulo4.teseVsCatalise;
  const plano = modulo4.planoDaPosicao;
  const tabela = tese.tabelaDosExemplos;
  const tipos = tese.tiposDeCatalise;

  return criarElemento('div', { class: 'space-y-6' }, [
    montarDestaques(modulo4.destaques.tese),

    // As duas frases + o texto do card + a regra de ouro fechando. A seção
    // inteira vai para criarCardDaSecao (e não só título e ideia central): é
    // dela que saem paragrafos, exemplo, paragrafosFinais e o "Para ir mais
    // fundo", que antes ficavam no arquivo de dados sem chegar à tela.
    criarCardDaSecao(tese, {
      video: videoDaSecao(modulo4.videos, 'tese-vs-catalise'),
      visual: criarDuasFrases(),
      depois: [criarRegraDeOuro()],
    }),

    // O plano em níveis e, no mesmo card, a ficha de 5 campos. A ficha entra
    // junto com o visual (e não em `depois`) para continuar logo abaixo dos
    // níveis, antes do texto — `depois` agora cairia depois do "Para ir mais
    // fundo".
    criarCardDaSecao(plano, {
      visual: criarElemento('div', { class: 'flex flex-col gap-4' }, [
        criarPlano(),
        criarFicha(),
        criarElemento('p', { class: 'text-texto-suave' }, [tese.fichaDeTese.introducao]),
      ]),
    }),

    criarCardDaSecao(tabela, { visual: criarTabelaDosExemplos() }),

    criarCardDaSecao(tipos, { visual: criarMapaDasCatalises() }),
  ]);
}

// ---------------------------------------------------------------------------
// Aba 2 — Take profit
// ---------------------------------------------------------------------------

// Cor de cada faixa da escada, de cima para baixo: ciano, verde, âmbar.
const TONS_DA_ESCADA = [TRIO.acento, TRIO.bom, TRIO.alerta];
// Recuo de cada faixa no computador (0, 24 e 48px); no celular, sem recuo. O fio
// entre duas faixas sai do meio do marcador (recuo + 23px).
const RECUO_DA_FAIXA = ['ml-0', 'ml-0 sm:ml-6', 'ml-0 sm:ml-12'];
const RECUO_DO_FIO = ['ml-[23px]', 'ml-[23px] sm:ml-[47px]', 'ml-[23px] sm:ml-[71px]'];

// A escada em 3 faixas recuadas, cada uma com o marcador numerado.
function criarEscada() {
  const { escada } = modulo4.takeProfit;
  const ultima = escada.faixas.length - 1;
  const descricao = escada.faixas.map((f, i) => i + 1 + '. ' + f.alvo + ': ' + comPonto(f.acao) + ' ' + f.porque).join(' ');

  return html`<figure style="${CAIXA}">
    <ol role="img" aria-label="${descricao}" style="list-style:none;margin:0;padding:0;display:flex;flex-direction:column">
      ${escada.faixas.map((faixa, i) => {
        const tom = TONS_DA_ESCADA[i] ?? TRIO.neutro;
        return html`<li style="display:flex;flex-direction:column">
          <div class="${RECUO_DA_FAIXA[i] ?? 'ml-0'}" style="border-radius:8px;border:1px solid ${tom.borda};background:${tom.fundo};padding:12px 16px;display:flex;gap:12px;align-items:flex-start">
            ${criarMarcador(i + 1)}
            <span style="min-width:0">
              <span style="display:block;font-size:14px;font-weight:600">${faixa.alvo} — ${faixa.acao}</span>
              <span style="display:block;margin-top:4px;font-size:14px;color:#9AA7B4">${faixa.porque}</span>
            </span>
          </div>
          ${i < ultima ? html`<span aria-hidden="true" class="${RECUO_DO_FIO[i] ?? 'ml-[23px]'}" style="width:2px;height:14px;background:#1F2733"></span>` : ''}
        </li>`;
      })}
    </ol>
    <figcaption style="margin:14px 0 0;font-size:13px;color:#9AA7B4">${escada.legenda} <span style="border-radius:999px;border:1px solid rgba(245,158,11,.4);background:rgba(245,158,11,.12);color:#F59E0B;padding:1px 10px;font-size:12px;font-weight:600;white-space:nowrap">${escada.selo}</span></figcaption>
  </figure>`;
}

// A conta da escada, em múltiplos do valor investido.
// A 1ª faixa vende a fração que recupera o investido: no alvo m1, isso é 1/m1
// da posição (1/m1 × m1 = 1). A 2ª vende uma parte do que sobrou, no alvo m2.
// "Pior caso" = o que já foi realizado acima do investido, se o resto for a zero.
function calcularDegraus({ alvo1, alvo2, fracao2 }) {
  const vendido1 = 1 / alvo1; // fração da posição vendida no 1º alvo
  const sobra = 1 - vendido1;
  const vendido2 = sobra * (fracao2 / 100); // fração da posição ORIGINAL vendida no 2º alvo
  const restante = sobra - vendido2;
  const realizado = vendido1 * alvo1 + vendido2 * alvo2; // sempre ≥ 1: o investido já voltou
  return { vendido1, vendido2, restante, realizado, naMesa: restante * alvo2, pior: realizado - 1 };
}

// "Mexa nos alvos e veja onde a posição para": controles à esquerda; à direita,
// as 3 barras e a caixa com o realizado e o pior caso. O 2º alvo nunca fica
// abaixo do 1º + a distância mínima: mexer no 1º empurra o 2º.
function criarCalculadoraDeDegraus() {
  const calc = modulo4.calculadoraDeDegraus;
  const [c1, c2, c3] = calc.controles; // alvo1, alvo2, fracao2
  const estado = { alvo1: c1.valor, alvo2: Math.max(c2.valor, c1.valor + calc.distanciaMinima), fracao2: c3.valor };
  const multiplo = (valor) => numero(valor, 1) + '×';

  const d1 = criarDeslizante(c1, (valor) => {
    estado.alvo1 = valor;
    estado.alvo2 = Math.max(estado.alvo2, valor + calc.distanciaMinima);
    atualizarTela();
  });
  const d2 = criarDeslizante(c2, (valor) => {
    estado.alvo2 = Math.max(valor, estado.alvo1 + calc.distanciaMinima);
    atualizarTela();
  });
  const d3 = criarDeslizante(c3, (valor) => {
    estado.fracao2 = valor;
    atualizarTela();
  });

  const barras = html`<div role="img" style="display:flex;flex-direction:column;gap:14px"></div>`;
  const resultado = html`<div aria-live="polite" style="margin-top:14px;border-radius:8px;border:1px solid #1F2733;background:#141A24;padding:12px 14px;display:grid;grid-template-columns:1fr 1fr;gap:10px"></div>`;

  function atualizarTela() {
    // O trilho do 2º alvo começa logo acima do 1º (o controle não desce abaixo dele).
    d2.entrada.min = String(estado.alvo1 + calc.distanciaMinima);
    d1.mostrar(estado.alvo1);
    d2.mostrar(estado.alvo2);
    d3.mostrar(estado.fracao2);

    const r = calcularDegraus(estado);
    const da = (fracao) => numero(fracao * 100) + '% ' + calc.barras.complemento;
    const itens = [
      { rotulo: calc.barras.primeiro.rotulo, valorTexto: da(r.vendido1), largura: r.vendido1 * 100, cor: COR.acento, nota: calc.barras.primeiro.nota(multiplo(estado.alvo1)) },
      { rotulo: calc.barras.segundo.rotulo, valorTexto: da(r.vendido2), largura: r.vendido2 * 100, cor: COR.verde, nota: calc.barras.segundo.nota },
      { rotulo: calc.barras.restante.rotulo, valorTexto: da(r.restante), largura: r.restante * 100, cor: COR.ambar, nota: calc.barras.restante.nota(multiplo(r.naMesa), multiplo(estado.alvo2)) },
    ];
    barras.replaceChildren(...itens.map(criarBarra));
    barras.setAttribute('aria-label', itens.map((b) => b.rotulo + ': ' + b.valorTexto + '. ' + comPonto(b.nota)).join(' '));

    const acima = r.realizado >= 1;
    resultado.replaceChildren(
      html`<div>
        <p style="${MICRO_11};color:#9AA7B4">${calc.realizado.rotulo}</p>
        <p style="margin:4px 0 0;font-family:${MONO};font-size:1.25rem;font-weight:700;font-variant-numeric:tabular-nums">${multiplo(r.realizado)}</p>
        <p style="margin:2px 0 0;font-size:12px;color:#9AA7B4">${calc.realizado.nota}</p>
      </div>`,
      html`<div>
        <p style="${MICRO_11};color:#9AA7B4">${calc.piorCaso.rotulo}</p>
        <p style="margin:4px 0 0;font-family:${MONO};font-size:1.25rem;font-weight:700;font-variant-numeric:tabular-nums;color:${acima ? COR.verde : COR.vermelhoTexto}">${multiplo(r.pior)}</p>
        <p style="margin:2px 0 0;font-size:12px;color:#9AA7B4">${acima ? calc.piorCaso.notaAcima : calc.piorCaso.notaAbaixo}</p>
      </div>`,
    );
  }
  atualizarTela();

  return html`<div style="border-radius:8px;border:1px solid #1F2733;background:#0B0F17;padding:20px;${DUAS_COLUNAS};gap:20px;align-items:start;min-width:0">
    <div style="display:flex;flex-direction:column;gap:14px;min-width:0">
      ${d1.bloco}
      ${d2.bloco}
      ${d3.bloco}
      <p style="margin:0;font-size:13px;color:#9AA7B4">${calc.nota}</p>
    </div>
    <figure style="margin:0;min-width:0">
      <p style="${MICRO_12};margin-bottom:10px">${calc.rotuloDaFigura}</p>
      ${barras}
      ${resultado}
    </figure>
  </div>`;
}

// "O que uma perda exige de volta": ganho = 1 ÷ (1 − perda) − 1. As duas barras
// (a perda e o ganho) na mesma escala, de 0 ao teto declarado na tela (200%).
function criarCalculadoraDeRecuperacao() {
  const calc = modulo4.calculadoraDeRecuperacao;
  const [controle] = calc.controles;
  const teto = calc.tetoDaTela;
  const tetoTexto = numero(teto) + '%';
  // A partir de que perda o ganho passa do teto: 1 − 1 ÷ (1 + teto).
  const limiarTexto = numero((1 - 1 / (1 + teto / 100)) * 100) + '%';

  const numeroGrande = html`<p style="margin:4px 0 0;font-family:${MONO};font-size:1.75rem;font-weight:700;line-height:1.1;font-variant-numeric:tabular-nums"></p>`;
  const barras = html`<div role="img" style="display:flex;flex-direction:column;gap:14px"></div>`;

  function atualizarTela(perda) {
    deslizante.mostrar(perda);
    const ganho = (1 / (1 - perda / 100) - 1) * 100;
    const perdaTexto = numero(perda) + '%';
    const ganhoTexto = numero(ganho) + '%';

    numeroGrande.textContent = ganhoTexto;
    numeroGrande.style.color = ganho > 100 ? COR.vermelhoTexto : COR.texto;

    barras.replaceChildren(
      criarBarra({ rotulo: calc.barras.perda, valorTexto: perdaTexto, largura: (perda / teto) * 100, cor: COR.vermelho }),
      criarBarra({
        rotulo: calc.barras.ganho,
        valorTexto: ganhoTexto,
        largura: (ganho / teto) * 100,
        cor: COR.primaria,
        nota: ganho > teto ? calc.notaAcimaDoTeto(tetoTexto) : calc.notaAbaixoDoTeto(perdaTexto, ganhoTexto),
      }),
    );
    barras.setAttribute(
      'aria-label',
      'Na mesma escala, de 0 a ' + tetoTexto + ': a perda é de ' + perdaTexto +
        ' e o ganho necessário para voltar ao ponto de partida é de ' + ganhoTexto + '.',
    );
  }
  const deslizante = criarDeslizante(controle, atualizarTela);
  atualizarTela(controle.valor);

  return html`<div style="border-radius:8px;border:1px solid #1F2733;background:#0B0F17;padding:20px;${DUAS_COLUNAS};gap:20px;align-items:start;min-width:0">
    <div style="display:flex;flex-direction:column;gap:14px;min-width:0">
      ${deslizante.bloco}
      <div aria-live="polite" style="border-radius:8px;border:1px solid #1F2733;background:#141A24;padding:12px 14px">
        <p style="${MICRO_11};color:#9AA7B4">${calc.rotuloDoNumero}</p>
        ${numeroGrande}
      </div>
      <p style="margin:0;font-size:13px;color:#9AA7B4">${calc.nota}</p>
    </div>
    <figure style="margin:0;min-width:0">
      <p style="${MICRO_12};margin-bottom:10px">${calc.rotuloDaFigura}</p>
      ${barras}
      <figcaption style="margin-top:12px;font-size:13px;color:#9AA7B4">${calc.legenda(tetoTexto, limiarTexto)}</figcaption>
    </figure>
  </div>`;
}

// O fluxograma "Você compraria este token, neste preço, hoje?": a situação, a
// pergunta e os dois ramos (Sim verde, Não vermelho), cada um com a decisão e
// a explicação em cinza.
function criarFluxoDeSegurar() {
  const f = modulo4.takeProfit.erroDeSegurar.fluxograma;
  return criarFluxograma({
    nos: [
      { id: 'situacao', tipo: 'acao', texto: f.situacao },
      { id: 'pergunta', tipo: 'pergunta', texto: f.pergunta },
      { id: 'sim', tipo: 'bom', texto: f.sim.decisao },
      { id: 'simDepois', tipo: 'acao', texto: f.sim.explicacao, suave: true },
      { id: 'nao', tipo: 'ruim', texto: f.nao.decisao },
      { id: 'naoDepois', tipo: 'acao', texto: f.nao.explicacao, suave: true },
    ],
    setas: [
      { de: 'situacao', para: 'pergunta' },
      { de: 'pergunta', para: 'sim', rotulo: f.sim.rotulo, tom: 'bom' },
      { de: 'sim', para: 'simDepois' },
      { de: 'pergunta', para: 'nao', rotulo: f.nao.rotulo, tom: 'ruim' },
      { de: 'nao', para: 'naoDepois' },
    ],
    legenda: f.legenda,
  });
}

// "Para ir mais fundo": a tributação, recolhida, com o aviso âmbar e a lista.
function criarTributacao() {
  const { tributacao } = modulo4.takeProfit;
  // Depois dos dois-pontos o título continua a frase: "…fundo: realizou lucro…".
  const titulo = tributacao.titulo.charAt(0).toLowerCase() + tributacao.titulo.slice(1);
  // O resumo tem 44px de alto (o mínimo de toque do README do handoff). O recuo
  // negativo com o mesmo tanto de espaçamento faz a área clicável chegar até a
  // borda da caixa sem mudar onde o texto fica nem a altura do bloco.
  const TOQUE_DO_RESUMO =
    'min-height:44px;padding:12px 16px;margin:-12px -16px;border-radius:8px;display:list-item';
  return criarElemento('details', { class: 'rounded-lg border border-borda bg-fundo px-4 py-3' }, [
    criarElemento('summary', { class: 'cursor-pointer text-sm font-semibold text-texto', style: TOQUE_DO_RESUMO }, [
      'Para ir mais fundo: ' + titulo,
    ]),
    html`<p style="margin:8px 0 0;border-radius:6px;border:1px solid rgba(245,158,11,.4);background:rgba(245,158,11,.12);padding:8px 12px;font-size:14px">${tributacao.aviso}</p>`,
    // O texto de abertura, antes da lista de pontos.
    ...(tributacao.paragrafos ?? []).map((paragrafo) =>
      html`<p style="margin:12px 0 0;font-size:14px;color:#9AA7B4">${paragrafo}</p>`,
    ),
    criarElemento(
      'dl',
      { style: 'margin:12px 0 0;display:flex;flex-direction:column;gap:10px' },
      tributacao.pontos.map((ponto) =>
        criarElemento('div', {}, [
          criarElemento('dt', { style: 'font-size:14px;font-weight:600' }, [ponto.rotulo]),
          criarElemento('dd', { style: 'margin:2px 0 0;font-size:14px;color:#9AA7B4' }, [ponto.texto]),
        ]),
      ),
    ),
    ...(tributacao.paragrafosFinais ?? []).map((paragrafo) =>
      html`<p style="margin:12px 0 0;font-size:14px;color:#9AA7B4">${paragrafo}</p>`,
    ),
  ]);
}

function montarAbaTakeProfit() {
  const { escada, erroDeSegurar } = modulo4.takeProfit;
  const degraus = modulo4.calculadoraDeDegraus;
  const recuperacao = modulo4.calculadoraDeRecuperacao;

  return criarElemento('div', { class: 'space-y-6' }, [
    montarDestaques(modulo4.destaques.takeProfit),

    criarCardDaSecao(escada, {
      video: videoDaSecao(modulo4.videos, 'take-profit-em-degraus'),
      visual: criarEscada(),
    }),

    criarCardDaSecao(degraus, { visual: criarCalculadoraDeDegraus() }),

    criarCardDaSecao(recuperacao, { visual: criarCalculadoraDeRecuperacao() }),

    // A tributação continua em `depois`: ela é o "Para ir mais fundo" deste
    // card (por isso a seção não tem campo `detalhe`).
    criarCardDaSecao(erroDeSegurar, { visual: criarFluxoDeSegurar(), depois: [criarTributacao()] }),
  ]);
}

// ---------------------------------------------------------------------------
// Aba 3 — Antes de entrar
// ---------------------------------------------------------------------------

// As seis checagens em fluxo: a pergunta à esquerda (com o porquê e o onde) e a
// "Resposta boa: siga" embaixo dela; à direita, depois da seta, "Alerta: não
// entra". Fecha com a caixa verde "Passou nas seis…".
function criarFluxoDasChecagens() {
  const { checagens } = modulo4;
  return criarFluxoLinear({
    variante: 'trilho',
    passos: checagens.itens.map((item) => ({
      pergunta: item.pergunta,
      porque: item.porque,
      onde: item.onde,
      desvio: { rotulo: checagens.rotuloDoAlerta, texto: item.alerta, tom: 'nao' },
      segue: { rotulo: checagens.rotuloDaRespostaBoa },
    })),
    fim: checagens.fim,
  });
}

// "Quanto da carteira pode ir numa posição": tamanho = risco ÷ invalidação,
// com uma casa decimal. Se a conta passar de 100% do capital, o número mostra o
// que a regra implica, e um aviso diz o que isso quer dizer e quanto se perde de
// fato na invalidação (a posição não passa do capital inteiro).
function criarCalculadoraDeTamanho() {
  const calc = modulo4.calculadoraDeTamanho;
  const [cRisco, cInvalidacao] = calc.controles;
  const estado = { risco: cRisco.valor, invalidacao: cInvalidacao.valor };
  const porcento = (valor) => numero(valor, 1) + '%';

  const dRisco = criarDeslizante(cRisco, (valor) => {
    estado.risco = valor;
    atualizarTela();
  });
  const dInvalidacao = criarDeslizante(cInvalidacao, (valor) => {
    estado.invalidacao = valor;
    atualizarTela();
  });

  // Atalhos: põem a invalidação num valor pronto. Tamanho mínimo de toque: 44px
  // em qualquer largura (o desenho escreve 40px, mas o README do handoff pede 44
  // em todo botão, e é o que os outros botões do hub usam).
  const atalhos = calc.atalhos.map((atalho) => {
    const botao = criarElemento(
      'button',
      {
        type: 'button',
        style: 'border-radius:8px;border-width:1px;border-style:solid;color:#E6EDF3;padding:8px 12px;font-size:14px;font-weight:600;cursor:pointer;transition:border-color 150ms ease',
        onclick: () => {
          estado.invalidacao = atalho.valor;
          atualizarTela();
        },
      },
      [atalho.rotulo],
    );
    return { atalho, botao };
  });

  const numeroGrande = html`<p style="margin:4px 0 0;font-family:${MONO};font-size:2rem;font-weight:700;line-height:1.1;font-variant-numeric:tabular-nums"></p>`;
  // A barra "a posição dentro do capital" tem 30px de altura no total, como no
  // desenho. O desenho escreve 28px porque lá a borda soma por fora; aqui todo
  // elemento é border-box (reset do Tailwind), então os 30px já contam as bordas.
  const trilho = html`<div style="height:100%;background:#7C3AED"></div>`;
  const figura = html`<figure role="img" style="margin:0">
    <p style="${MICRO_12};margin-bottom:8px">${calc.rotuloDaFigura}</p>
    <div style="height:30px;background:#141A24;border-radius:4px;overflow:hidden;border:1px solid #1F2733">${trilho}</div>
    <figcaption style="margin-top:8px;font-size:13px;color:#9AA7B4">${calc.legenda}</figcaption>
  </figure>`;
  const aviso = html`<div style="border-radius:8px;border:1px solid rgba(245,158,11,.4);background:rgba(245,158,11,.12);padding:10px 14px;font-size:14px"></div>`;

  function atualizarTela() {
    dRisco.mostrar(estado.risco);
    dInvalidacao.mostrar(estado.invalidacao);

    const tamanho = (estado.risco / estado.invalidacao) * 100; // % do capital
    numeroGrande.textContent = porcento(tamanho);
    trilho.style.width = Math.min(100, tamanho).toFixed(2) + '%';
    figura.setAttribute(
      'aria-label',
      'Com risco aceito de ' + porcento(estado.risco) + ' do capital e invalidação em ' + numero(estado.invalidacao) +
        '%, a regra implica ' + porcento(tamanho) + ' do capital nesta posição.',
    );

    // Acima de 100%: a posição fica no capital inteiro, e a perda na invalidação
    // é 100% × invalidação (menor que o risco escolhido).
    const acima = tamanho > 100;
    aviso.hidden = !acima;
    if (acima) {
      const perda = (Math.min(100, tamanho) * estado.invalidacao) / 100;
      aviso.replaceChildren(calc.acimaDoCapital.aviso + ' ' + calc.acimaDoCapital.perda(porcento(perda)));
    }

    // O atalho marcado com `destaque` fica roxo quando é o valor atual.
    atalhos.forEach(({ atalho, botao }) => {
      const ativo = atalho.destaque && estado.invalidacao === atalho.valor;
      botao.className = 'min-h-[44px] ' + (ativo ? 'border-primaria bg-primaria/15' : 'border-borda bg-superficie hover:border-texto-suave');
    });
  }
  atualizarTela();

  return html`<div style="border-radius:8px;border:1px solid #1F2733;background:#0B0F17;padding:20px;${DUAS_COLUNAS};gap:20px;align-items:start;min-width:0">
    <div style="display:flex;flex-direction:column;gap:14px;min-width:0">
      ${dRisco.bloco}
      ${dInvalidacao.bloco}
      <div style="display:flex;flex-wrap:wrap;gap:8px">${atalhos.map((item) => item.botao)}</div>
      <p style="margin:0;font-size:13px;color:#9AA7B4">${calc.nota}</p>
    </div>
    <div aria-live="polite" style="display:flex;flex-direction:column;gap:12px;min-width:0">
      <div style="border-radius:8px;border:1px solid rgba(124,58,237,.6);background:rgba(124,58,237,.12);padding:14px 16px">
        <p style="${MICRO_11};color:#9AA7B4">${calc.resultado.rotulo}</p>
        ${numeroGrande}
        <p style="margin:4px 0 0;font-size:13px;color:#9AA7B4">${calc.resultado.nota}</p>
      </div>
      ${figura}
      ${aviso}
    </div>
  </div>`;
}

function montarAbaChecagens() {
  const { checagens, calculadoraDeTamanho } = modulo4;

  return criarElemento('div', { class: 'space-y-6' }, [
    montarDestaques(modulo4.destaques.checagens),

    criarCardDaSecao(checagens, { visual: criarFluxoDasChecagens() }),

    criarCardDaSecao(calculadoraDeTamanho, { visual: criarCalculadoraDeTamanho() }),
  ]);
}

// ---------------------------------------------------------------------------
// Aba 4 — Simulador
// ---------------------------------------------------------------------------

// Os 4 passos de "Como cada escolha é avaliada", ligados por setas. No
// computador, lado a lado; no celular, um embaixo do outro. A seta continua
// sendo o "→" sem girar, como o desenho compacto mostra (ela é decorativa,
// aria-hidden: a ordem quem dá é a descrição da figura).
function criarPassosDoSimulador() {
  const { passos } = modulo4.molduraDoSimulador;
  const ultimo = passos.itens.length - 1;
  const descricao = passos.itens.map((p, i) => i + 1 + '. ' + p.titulo + ': ' + p.texto).join(' ');

  return html`<figure style="${CAIXA}">
    <p style="margin:0 0 12px;font-size:14px;font-weight:600">${passos.titulo}</p>
    <div role="img" aria-label="${descricao}" class="flex flex-col sm:flex-row" style="align-items:stretch">
      ${passos.itens.map((passo, i) => {
        const tom = TRIO[passo.tom] ?? TRIO.neutro;
        return html`<div class="flex flex-col sm:flex-row" style="flex:1 1 0;align-items:stretch;min-width:0">
          <div style="flex:1 1 auto;min-width:0;border-radius:8px;border:1px solid ${tom.borda};background:${tom.fundo};padding:12px 14px;display:flex;flex-direction:column;gap:6px">
            <span style="display:flex;gap:8px;align-items:center">${criarMarcador(i + 1)}<span style="font-size:14px;font-weight:600">${passo.titulo}</span></span>
            <span style="font-size:13px;color:#9AA7B4">${passo.texto}</span>
          </div>
          ${i < ultimo ? html`<span aria-hidden="true" style="flex:0 0 auto;display:flex;align-items:center;justify-content:center;color:#9AA7B4;padding:2px 6px">→</span>` : ''}
        </div>`;
      })}
    </div>
    <figcaption style="margin:14px 0 0;font-size:13px;color:#9AA7B4">${passos.legenda}</figcaption>
  </figure>`;
}

// As 3 partes do feedback de uma escolha, em cartões coloridos.
function criarPartesDoFeedback() {
  const { partes } = modulo4.molduraDoSimulador;
  return html`<figure style="${CAIXA}">
    <p style="margin:0 0 12px;font-size:14px;font-weight:600">${partes.titulo}</p>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,220px),1fr));gap:12px">
      ${partes.itens.map((parte) => {
        const tom = TRIO[parte.tom] ?? TRIO.neutro;
        return html`<div style="border-radius:8px;border:1px solid ${tom.borda};background:${tom.fundo};padding:14px 16px">
          <p style="${MICRO_11};color:${tom.cor}">${parte.rotulo}</p>
          <p style="margin:6px 0 0;font-size:14px">${parte.texto}</p>
        </div>`;
      })}
    </div>
    <figcaption style="margin:12px 0 0;font-size:13px;color:#9AA7B4">${partes.legenda}</figcaption>
  </figure>`;
}

// O "Para ir mais fundo" recolhido de um card montado à mão (o da moldura do
// simulador, abaixo, que não passa por criarCardDaSecao porque não repete o h2).
// Mesmo traço do recolhido da tributação, inclusive os 44px de área de toque.
function criarRecolhido(detalhe) {
  const TOQUE_DO_RESUMO =
    'min-height:44px;padding:12px 16px;margin:-12px -16px;border-radius:8px;display:list-item';
  return criarElemento('details', { class: 'rounded-lg border border-borda bg-fundo px-4 py-3' }, [
    criarElemento('summary', { class: 'cursor-pointer text-sm font-semibold text-texto', style: TOQUE_DO_RESUMO }, [
      'Para ir mais fundo: ' + detalhe.titulo,
    ]),
    ...(detalhe.paragrafos ?? []).map((paragrafo) =>
      criarElemento('p', { class: 'mt-2 text-sm text-texto-suave' }, [paragrafo]),
    ),
  ]);
}

function montarAbaSimulador() {
  const moldura = modulo4.molduraDoSimulador;

  // O card que explica a avaliação (desenho do M4) e, logo depois, o simulador
  // (componente da tela 34, que já é um card inteiro).
  const aviso = html`<p style="margin:0;border-radius:8px;border:1px solid rgba(245,158,11,.4);background:rgba(245,158,11,.12);padding:12px 16px;font-size:14px"><strong style="color:#E6EDF3">${moldura.rotuloDoAviso} </strong>${moldura.aviso}</p>`;

  // O desenho põe tudo isto (ideia central, aviso, os 4 passos e as 3 partes)
  // e o simulador de verdade dentro da MESMA seção "Simulador de decisão" — o
  // desenho só mostra um link-placeholder onde entra o componente. Aqui o
  // componente (montarSimulador, da etapa 1) já abre com o seu próprio h2
  // "Simulador de decisão"; por isso este card não repete esse título (não usa
  // criarCardDaSecao, que sempre escreve um h2) — só a ideia central, o aviso e
  // as duas figuras, sem reabrir um h2 igual ao de baixo. (Pedido de mudança
  // pendente em montarSimulador: aceitar titulo:null / mostrarTitulo:false para
  // quando ele vier logo depois de uma moldura com o mesmo título.)
  const cardDaMoldura = criarElemento(
    'section',
    { class: 'flex flex-col gap-4 rounded-card border border-borda bg-superficie p-5', 'aria-label': moldura.titulo },
    [
      criarElemento('p', { class: 'border-l-2 border-acento pl-3 font-semibold text-texto' }, [moldura.emUmaFrase]),
      videoDaSecao(modulo4.videos, 'simulador'),
      aviso,
      criarPassosDoSimulador(),
      criarPartesDoFeedback(),
      // O texto do card vem depois das duas figuras, na mesma ordem de
      // criarCardDaSecao: parágrafos, parágrafos finais e o recolhido.
      ...(moldura.paragrafos ?? []).map((paragrafo) =>
        criarElemento('p', { class: 'text-texto-suave' }, [paragrafo]),
      ),
      ...(moldura.paragrafosFinais ?? []).map((paragrafo) =>
        criarElemento('p', { class: 'text-texto-suave' }, [paragrafo]),
      ),
      moldura.detalhe && criarRecolhido(moldura.detalhe),
    ],
  );

  return criarElemento('div', { class: 'space-y-6' }, [
    cardDaMoldura,
    // O card acima já traz a caixa âmbar "Cenários fictícios:" e a ideia central
    // ("Não existe pontuação de acerto de preço…"), como o desenho do M4 manda.
    // Por isso o componente entra sem o aviso e sem o parágrafo de abertura: se
    // vierem, a tela repete o mesmo texto três vezes seguidas. (Na tela 34, que
    // não tem este card, o componente continua mostrando os dois.) O aviso da
    // moldura diz também que a ordem é sorteada, que é o que o componente faz.
    montarSimulador({ cenarios, aviso: null, abertura: null }),
  ]);
}

// ---------------------------------------------------------------------------
// Aba 5 — Quiz, "Terminou o módulo?" e "O que você leva deste módulo"
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

// "O que você leva deste módulo": no fim da aba Quiz, como no desenho.
function montarObjetivos() {
  return criarCard([
    criarElemento('h2', { class: 'text-lg font-semibold' }, ['O que você leva deste módulo']),
    criarElemento(
      'ul',
      { class: 'mt-3 list-disc pl-5 text-texto-suave', style: 'display:flex;flex-direction:column;gap:6px' },
      modulo4.objetivos.map((objetivo) => criarElemento('li', {}, [objetivo])),
    ),
  ]);
}

function montarAbaQuiz() {
  return criarElemento('div', { class: 'space-y-6' }, [
    // Corrigido por pergunta (tela 34). Sem `moduloId`: o card "Terminou o
    // módulo?" continua separado, logo abaixo, como no desenho.
    montarQuiz({
      id: modulo4.id,
      titulo: 'Mini-quiz do Módulo 4',
      descricao: 'Quatro perguntas. As respostas ficam salvas no navegador.',
      perguntas: PERGUNTAS,
      moduloNome: 'Módulo 4',
    }),
    montarConclusao(),
    montarObjetivos(),
  ]);
}

// ---------------------------------------------------------------------------
// Montagem da página
// ---------------------------------------------------------------------------
export function montarModulo4() {
  // Micro-rótulo "MÓDULO 4", o nome do desenho e a 2ª frase do resumo.
  const cabecalho = criarTitulo(modulo4.titulo, { rotulo: 'Módulo 4', subtitulo: modulo4.subtitulo });

  const abas = [
    { id: 'tese', rotulo: 'Tese vs. catálise', montar: montarAbaTese },
    { id: 'take-profit', rotulo: 'Take profit', montar: montarAbaTakeProfit },
    { id: 'checagens', rotulo: 'Antes de entrar', montar: montarAbaChecagens },
    { id: 'simulador', rotulo: 'Simulador', montar: montarAbaSimulador },
    { id: 'quiz', rotulo: 'Quiz', montar: montarAbaQuiz },
  ];

  // O mapa do módulo abre a página: o todo antes das partes. Um ramo por aba
  // (o Quiz também); as folhas curtas vêm de modulo4.mapa. O ramo da aba aberta
  // fica roxo.
  const mapa = criarMapaDoModulo({
    mapa: modulo4.mapa,
    abas: abas.map(({ id, rotulo }) => ({ id, rotulo })),
    perguntas: modulo4.quiz.length,
    idDasAbas: 'modulo-4',
  });

  const painelDeAbas = criarAbas({ id: 'modulo-4', rotulo: 'Seções do Módulo 4', abas });

  // Cabeçalho, mapa e abas com 24px entre eles (a margem de baixo do cabeçalho
  // e do mapa, e a de cima do painel da aba).
  return criarElemento('div', {}, [cabecalho, mapa, painelDeAbas]);
}
