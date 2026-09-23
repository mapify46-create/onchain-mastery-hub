// views/modulo3.js — monta a página do Módulo 3 a partir de src/data/modulo3.js.
//
// A página segue o desenho do Claude Design (pesquisa/design/handoff/designs/
// "M3 Desktop.dc.html" e "M3 Celular.dc.html"): cabeçalho (com a correção
// "Axon → Axiom" em âmbar), o mapa "O módulo inteiro numa olhada", as abas e,
// em cada aba, os destaques e um card por seção. Cada card tem o título, a ideia
// central (borda ciano), o visual DENTRO do card, as frases e, quando o desenho
// pede, a "Pergunta rápida" no fim.
//
// Abas internas (padrão ARIA de tabs, vindo de ui.js):
//   Visão geral · Narrativas · Pilar social na prática · Pilar técnico na prática ·
//   Matriz de ferramentas · Cenário 2025–2026 · Quiz
//
// Blocos de didática que só o app tinha e o dono decidiu manter (18/09/2026):
// "Antes de ler" no topo da aba Pilar técnico, "Parte X de N" com "Continuar"
// nas abas Narrativas e Pilar social, e "Confira antes de seguir" no fim da
// Parte 3 do Pilar social. As perguntas de cada um estão em src/data/modulo3.js
// (perguntaAntes, confira) e nenhuma se repete em outro bloco do módulo.
// As abas Pilar social e Narrativas ficaram sem "Antes de ler"
// (perguntaAntes: null): não sobrou pergunta do quiz que o aluno ainda não
// tenha respondido — e, na Narrativas, a resposta da única candidata estava
// logo abaixo, nos destaques da própria aba.
//
// As cores e medidas são as do desenho (tokens do README do handoff). Os textos
// vêm todos de src/data/modulo3.js; aqui ficam só a montagem e as contas.

import { modulo3 } from '../data/modulo3.js';
import { criarElemento, criarTitulo, criarCard, criarBotao, criarAbas, mostrarToast, rotuloRisco, html } from '../ui.js';
import { montarQuiz, juntarPorques } from '../components/quiz.js';
import { criarCardDaSecao } from '../components/secao.js';
import { videoDaSecao } from '../components/video.js';
import { criarMapaDoModulo, criarCiclo } from '../components/visuais.js';
import { criarAnimacaoNarrativa } from '../components/animacoes.js';
import { montarDestaques } from '../components/destaques.js';
import { montarLinhaDoTempo } from '../components/linhaDoTempo.js';
import { montarSegmentos, montarPerguntaPrevia, montarTermos } from '../components/didatica.js';
import { obterEstado, atualizar } from '../store.js';

// ---------------------------------------------------------------------------
// Peças comuns
// ---------------------------------------------------------------------------

const MONO = "'JetBrains Mono',ui-monospace,monospace";

// Os "trios" de estado do desenho: borda + fundo + cor do texto (ou do rótulo).
const TRIO = {
  acento: { borda: 'rgba(34,211,238,.5)', fundo: 'rgba(34,211,238,.1)', cor: '#22D3EE' },
  primaria: { borda: 'rgba(124,58,237,.6)', fundo: 'rgba(124,58,237,.15)', cor: '#E6EDF3' },
  ok: { borda: 'rgba(34,197,94,.5)', fundo: 'rgba(34,197,94,.12)', cor: '#22C55E' },
  atencao: { borda: 'rgba(245,158,11,.4)', fundo: 'rgba(245,158,11,.12)', cor: '#F59E0B' },
  alerta: { borda: 'rgba(239,68,68,.5)', fundo: 'rgba(239,68,68,.12)', cor: '#F87171' },
};

// Micro-rótulo em maiúsculas (11px ou 12px, como no desenho).
const MICRO_11 = 'margin:0;font-size:11px;font-weight:600;letter-spacing:.05em;text-transform:uppercase';
const MICRO_12 = 'margin:0;font-size:12px;font-weight:600;letter-spacing:.05em;text-transform:uppercase;color:#9AA7B4';

// A caixa escura em que todo visual fica, dentro do card da seção.
const CAIXA = 'margin:0;border-radius:8px;border:1px solid #1F2733;background:#0B0F17;min-width:0';

// Duas colunas no computador e uma no celular (cada coluna com pelo menos 280px).
// É o `colsDois` do desenho ('1fr 1fr' no desktop, '1fr' no celular), sem medir a tela.
const DUAS_COLUNAS = 'display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr))';

// Círculo ciano numerado (o marcador de passo do desenho). Tamanhos: 20, 22 ou
// 24px; a fonte acompanha (11, 12 ou 13px).
function criarMarcador(numero, tamanho = 24) {
  const fonte = tamanho >= 24 ? 13 : tamanho >= 22 ? 12 : 11;
  return html`<span aria-hidden="true" style="flex:0 0 ${tamanho}px;width:${tamanho}px;height:${tamanho}px;border-radius:50%;background:#22D3EE;color:#0B0F17;font-family:${MONO};font-size:${fonte}px;font-weight:700;display:inline-flex;align-items:center;justify-content:center">${String(numero)}</span>`;
}

// Um texto de src/data/modulo3.js pode ser uma string ou uma lista de pedaços:
// { forte: '…' } sai em negrito e { mono: '…' } em fonte de código. Devolve
// algo que pode ir dentro de qualquer elemento. `tamanhoDoMono` é o tamanho da
// fonte de código (o desenho usa 14px no parágrafo e 13px nas listas miúdas).
function montarTexto(valor, tamanhoDoMono = 14) {
  if (!Array.isArray(valor)) return valor;
  const fragmento = document.createDocumentFragment();
  for (const pedaco of valor) {
    if (typeof pedaco === 'string') fragmento.append(pedaco);
    else if (pedaco.forte) fragmento.append(html`<strong style="color:#E6EDF3">${pedaco.forte}</strong>`);
    else if (pedaco.mono) fragmento.append(html`<span style="font-family:${MONO};font-size:${tamanhoDoMono}px">${pedaco.mono}</span>`);
  }
  return fragmento;
}

// Parágrafo cinza de 16px, entre os blocos de um card.
function criarParagrafo(texto) {
  return html`<p style="margin:0;color:#9AA7B4">${montarTexto(texto)}</p>`;
}

// "Para ir mais fundo": recolhido, com o triângulo nativo do <details>. Aceita
// parágrafos (`paragrafos`) ou uma lista com marcadores (`lista`).
function criarParaIrMaisFundo(detalhe) {
  if (!detalhe) return null;
  const paragrafos = (detalhe.paragrafos ?? []).map(
    (paragrafo) => html`<p style="margin:8px 0 0;font-size:14px;color:#9AA7B4">${montarTexto(paragrafo, 13)}</p>`,
  );
  const lista = detalhe.lista?.length
    ? html`<ul style="margin:8px 0 0;padding-left:20px;font-size:14px;color:#9AA7B4;list-style:disc">
        ${detalhe.lista.map((item, i) => html`<li style="${i ? 'margin-top:4px' : ''}">${montarTexto(item, 13)}</li>`)}
      </ul>`
    : null;
  return html`<details style="border-radius:8px;border:1px solid #1F2733;background:#0B0F17;padding:12px 16px">
    <summary style="cursor:pointer;font-size:14px;font-weight:600">Para ir mais fundo: ${detalhe.titulo}</summary>
    ${paragrafos}${lista}
  </details>`;
}

// "Exemplo resolvido": a conta feita à mão, em passos numerados. É o mesmo
// bloco de components/secao.js, redesenhado aqui com as medidas do M3 porque
// neste módulo os blocos de cada card são montados um a um (a ordem muda de
// seção para seção).
function criarExemplo(exemplo) {
  if (!exemplo) return null;
  return html`<div style="border-radius:8px;border:1px solid #1F2733;background:#0B0F17;padding:14px 16px">
    <p style="margin:0;font-size:14px;font-weight:600;color:#E6EDF3">${exemplo.titulo ?? 'Exemplo'}</p>
    <ol style="margin:8px 0 0;padding-left:20px;font-size:14px;color:#9AA7B4;display:flex;flex-direction:column;gap:4px;list-style:decimal">
      ${(exemplo.passos ?? []).map((passo) => html`<li>${montarTexto(passo)}</li>`)}
    </ol>
  </div>`;
}

// Os parágrafos que fecham um card (`paragrafosFinais`), depois do exemplo e
// antes do "Para ir mais fundo". Devolve uma lista, para espalhar nos blocos.
function criarParagrafosFinais(secao) {
  return (secao.paragrafosFinais ?? []).map(criarParagrafo);
}

// Caixa âmbar com o texto em cinza e o começo em negrito (aviso do ciclo).
function criarCaixaAmbar(texto) {
  return html`<p style="margin:0;border-radius:8px;border:1px solid rgba(245,158,11,.4);background:rgba(245,158,11,.12);padding:12px 16px;font-size:14px;color:#9AA7B4">${montarTexto(texto)}</p>`;
}

// O card de uma seção, no traço do desenho: título, ideia central (borda ciano)
// e os blocos na ordem do desenho, com 16px entre eles. É o card de
// components/secao.js: aqui os blocos já chegam montados, porque a ordem muda
// de uma seção para outra no M3.
//
// Sem "Pergunta rápida": em 20/09/2026 ela saiu de todas as seções deste
// módulo (decisão do dono). As perguntas ficam só no quiz do fim; o array
// `quiz` continua inteiro, com as 13.
function criarSecao({ titulo, emUmaFrase, blocos = [], id = '' }) {
  return criarCardDaSecao(
    { titulo, emUmaFrase },
    {
      // A videoaula da seção, se houver (o dado diz a seção: `videos[...].secao`).
      video: id ? videoDaSecao(modulo3.videos, id) : null,
      depois: blocos,
    },
  );
}

// Uma coluna de blocos com 24px entre eles (o painel de cada aba no desenho).
function criarColuna(nos) {
  return criarElemento('div', { class: 'flex flex-col gap-6' }, nos);
}

// As perguntas do quiz já com o "Por que a sua não serve" de cada errada.
const PERGUNTAS = juntarPorques(modulo3.quiz, modulo3.porqueErradas);
function perguntaDoQuiz(id) {
  return PERGUNTAS.find((pergunta) => pergunta.id === id);
}

// "Antes de ler: o que você acha?" — a pergunta `id` do quiz, antes da aba.
// `id` nulo (aba sem o bloco, como o Pilar social) devolve nada.
function criarPerguntaAntes(id) {
  if (!id) return null;
  return montarPerguntaPrevia({ id: modulo3.id, pergunta: perguntaDoQuiz(id) });
}

// As folhas do mapa de uma aba: são os nomes curtos das partes dela.
function folhasDaAba(idDaAba) {
  return modulo3.mapa.ramos.find((ramo) => ramo.aba === idDaAba)?.folhas ?? [];
}

// ---------------------------------------------------------------------------
// Tabela do desenho
// ---------------------------------------------------------------------------

// Um selo colorido dentro de uma célula (raio 6). `curto` = uma linha só, em
// 13px e negrito (a coluna "Memecoin nova"). Sem tom, o texto fica cinza, com o
// mesmo recuo dos selos coloridos.
const SELO_POR_TOM = {
  ok: { borda: 'rgba(34,197,94,.5)', fundo: 'rgba(34,197,94,.12)', cor: '#E6EDF3' },
  atencao: { borda: 'rgba(245,158,11,.4)', fundo: 'rgba(245,158,11,.12)', cor: '#E6EDF3' },
  alerta: { borda: 'rgba(239,68,68,.5)', fundo: 'rgba(239,68,68,.12)', cor: '#F87171' },
  neutro: { borda: 'transparent', fundo: 'transparent', cor: '#9AA7B4' },
};

function criarSelo(valor, curto) {
  const { texto, tom } = typeof valor === 'object' ? valor : { texto: valor, tom: 'neutro' };
  const t = SELO_POR_TOM[tom] ?? SELO_POR_TOM.neutro;
  const extra = curto ? 'white-space:nowrap;font-size:13px;font-weight:600;' : '';
  return html`<span style="display:inline-block;${extra}border-radius:6px;border:1px solid ${t.borda};background:${t.fundo};color:${t.cor};padding:2px 8px">${texto}</span>`;
}

/**
 * Uma <table> de verdade dentro da caixa escura, como no desenho. Quando a tela
 * é estreita, a tabela rola para o lado dentro da caixa (que ganha tabindex para
 * rolar pelo teclado). A estrutura é montada com criarElemento, e não com html``,
 * porque o leitor de HTML tira de dentro da <tr> o texto provisório do html``.
 *
 * @param {object} tabela  { rotuloDasLinhas, rotulo, larguraMinima, frase?,
 *   colunas: [{ chave, rotulo, selo?, destaque?, mono? }],
 *   linhas: [{ titulo, subtitulo?, valores: { chave: texto | { texto, tom } } }] }
 *   selo: a célula vira selo colorido (`'curto'` = numa linha só). destaque: a
 *   coluna ganha a borda ciano à esquerda. mono: fonte de código.
 */
function criarTabela(tabela) {
  const CABECALHO =
    'text-align:left;padding:8px 12px;font-size:12px;font-weight:600;letter-spacing:.05em;text-transform:uppercase;color:#9AA7B4;border-bottom:1px solid #1F2733';
  const CELULA = 'padding:10px 12px;border-bottom:1px solid #1F2733;vertical-align:top';
  const bordaDaColuna = (coluna) => (coluna.destaque ? ';border-left:2px solid #22D3EE' : '');

  const cabecalho = criarElemento('tr', {}, [
    criarElemento('th', { scope: 'col', style: CABECALHO }, [tabela.rotuloDasLinhas]),
    ...tabela.colunas.map((coluna) =>
      criarElemento('th', { scope: 'col', style: CABECALHO + bordaDaColuna(coluna) }, [coluna.rotulo]),
    ),
  ]);

  function celula(coluna, valor) {
    if (coluna.selo) {
      return criarElemento('td', { style: CELULA + bordaDaColuna(coluna) }, [criarSelo(valor, coluna.selo === 'curto')]);
    }
    const texto = typeof valor === 'object' ? valor.texto : valor;
    const estilo = coluna.mono ? `;font-family:${MONO};font-size:12.5px;color:#E6EDF3` : ';color:#9AA7B4';
    return criarElemento('td', { style: CELULA + estilo + bordaDaColuna(coluna) }, [texto]);
  }

  const linhas = tabela.linhas.map((linha) =>
    criarElemento('tr', {}, [
      criarElemento('th', { scope: 'row', style: 'text-align:left;padding:10px 12px;font-weight:600;border-bottom:1px solid #1F2733;vertical-align:top' }, [
        linha.titulo,
        linha.subtitulo &&
          criarElemento('span', { style: 'display:block;font-size:12px;font-weight:400;color:#9AA7B4' }, [linha.subtitulo]),
      ]),
      ...tabela.colunas.map((coluna) => celula(coluna, linha.valores[coluna.chave])),
    ]),
  );

  return criarElemento(
    'div',
    {
      style: 'border-radius:8px;border:1px solid #1F2733;background:#0B0F17;padding:12px;overflow-x:auto',
      tabindex: '0',
      role: 'group',
      'aria-label': tabela.rotulo,
    },
    [
      criarElemento('table', { style: `border-collapse:collapse;width:100%;min-width:${tabela.larguraMinima}px;font-size:14px` }, [
        criarElemento('thead', {}, [cabecalho]),
        criarElemento('tbody', {}, linhas),
      ]),
      tabela.frase && criarElemento('p', { style: 'margin:12px 0 0;font-size:13px;color:#9AA7B4' }, [tabela.frase]),
    ],
  );
}

// ---------------------------------------------------------------------------
// Anatomia de uma página (mockup em grade HTML)
// ---------------------------------------------------------------------------

/**
 * O mockup desenhado de uma página (perfil do X, RugCheck, Solscan…): uma grade
 * de painéis numerados à esquerda e a lista "Título. texto" à direita (embaixo,
 * no celular). Painel com `alerta` sai em âmbar. Os campos aparecem sem valores.
 *
 * @param {object} p
 * @param {string} [p.titulo]      linha em negrito no topo da caixa (as ferramentas)
 * @param {object} p.paineis       { id: { rotulo, alerta? } }
 * @param {Array}  p.grade         [{ cols, ids, altura }] — as linhas do mockup
 * @param {Array}  p.itens         [{ painel, titulo, texto }] — a ordem dá o número
 * @param {string} p.notaDoMockup  a frase miúda dentro do mockup
 * @param {string} [p.legenda]     a frase embaixo da caixa
 */
function criarAnatomia({ titulo = null, paineis, grade, itens, notaDoMockup, legenda = null }) {
  const numeroDoPainel = {};
  itens.forEach((item, i) => {
    numeroDoPainel[item.painel] = i + 1;
  });

  // Um painel do mockup. `peso` é a fração da linha ("2fr 1fr" → 2 e 1): a
  // caixa de fora só divide a largura (sem borda nem padding, para a divisão
  // sair igual à da grade do desenho); a de dentro é o painel.
  // A altura mínima do desenho não conta o padding (content-box): por isso o
  // box-sizing do painel é content-box, e não o border-box do resto do app.
  const painel = (id, altura, peso) => {
    const dados = paineis[id];
    const borda = dados.alerta ? 'rgba(245,158,11,.4)' : '#22D3EE';
    const fundo = dados.alerta ? 'rgba(245,158,11,.12)' : 'rgba(34,211,238,.08)';
    return html`<div style="flex:${peso} 1 0;display:flex">
      <div style="flex:1 1 auto;border-radius:6px;border:1px solid ${borda};background:${fundo};box-sizing:content-box;padding:8px;min-height:${altura};display:flex;gap:8px;align-items:flex-start">
        ${criarMarcador(numeroDoPainel[id], 20)}
        <span style="min-width:0;font-family:${MONO};font-size:11.5px;line-height:1.35;color:#E6EDF3;overflow-wrap:break-word">${dados.rotulo}</span>
      </div>
    </div>`;
  };

  // Uma linha do mockup. O desenho usa uma grade ("2fr 1fr"); aqui é uma linha
  // flexível com os mesmos pesos, que dá as mesmas larguras no computador e,
  // no celular, passa um painel para a linha de baixo quando as palavras não
  // cabem (em vez de quebrar a palavra no meio ou vazar para o lado).
  const linhaDoMockup = (linha) => {
    const pesos = linha.cols.split(/\s+/).map((coluna) => parseFloat(coluna) || 1);
    return html`<div style="display:flex;flex-wrap:wrap;gap:8px">${linha.ids.map((id, i) => painel(id, linha.altura, pesos[i] ?? 1))}</div>`;
  };

  const descricao =
    'Mockup esquemático com ' + itens.length + ' marcadores: ' +
    itens.map((item, i) => i + 1 + ' ' + paineis[item.painel].rotulo).join('; ') +
    '. Os campos aparecem sem valores.';

  return html`<figure style="${CAIXA};padding:20px">
    ${titulo ? html`<p style="margin:0 0 12px;font-size:14px;font-weight:600">${titulo}</p>` : ''}
    <div style="${DUAS_COLUNAS};gap:20px;align-items:start">
      <div role="img" aria-label="${descricao}" style="border-radius:10px;border:1px solid #1F2733;background:#10151E;padding:14px;display:flex;flex-direction:column;gap:8px;min-width:0">
        ${grade.map(linhaDoMockup)}
        <p style="margin:4px 0 0;font-size:12px;color:#9AA7B4">${notaDoMockup}</p>
      </div>
      <ol role="list" style="margin:0;padding:0;list-style:none;display:flex;flex-direction:column;gap:10px;min-width:0">
        ${itens.map(
          (item, i) => html`<li style="display:flex;gap:10px;align-items:flex-start;font-size:14px">
            ${criarMarcador(i + 1, 24)}
            <span style="min-width:0"><strong>${item.titulo}.</strong> <span style="color:#9AA7B4">${item.texto}</span></span>
          </li>`,
        )}
      </ol>
    </div>
    ${legenda ? html`<figcaption style="margin:12px 0 0;font-size:13px;color:#9AA7B4">${legenda}</figcaption>` : ''}
  </figure>`;
}

// ---------------------------------------------------------------------------
// Aba 1 — Visão geral
// ---------------------------------------------------------------------------

// Os dois pilares lado a lado (social em ciano, técnico em roxo), cada um com a
// pergunta, o que cobre e o que acontece sozinho; embaixo, a legenda âmbar.
function criarPilares(secao) {
  const descricao = secao.pilares
    .map((pilar) => pilar.nome + ' pergunta: ' + pilar.pergunta + ' Cobre ' + pilar.cobre.join(', ') + '. ' + pilar.sozinho)
    .join(' ');

  return html`<figure style="${CAIXA};padding:20px">
    <div role="img" aria-label="${descricao}" style="${DUAS_COLUNAS};gap:16px">
      ${secao.pilares.map((pilar) => {
        const tom = TRIO[pilar.tom] ?? TRIO.primaria;
        return html`<div style="border-radius:8px;border:1px solid ${tom.borda};background:${tom.fundo};padding:16px;display:flex;flex-direction:column;gap:10px">
          <p style="${MICRO_11};color:${tom.cor}">${pilar.nome}</p>
          <p style="margin:0;font-size:15px;font-weight:600;text-wrap:pretty">${pilar.pergunta}</p>
          <div style="display:flex;flex-wrap:wrap;gap:6px">
            ${pilar.cobre.map((item) => html`<span style="border-radius:999px;border:1px solid #1F2733;background:#141A24;padding:2px 10px;font-size:13px;color:#9AA7B4">${item}</span>`)}
          </div>
          <p style="margin:auto 0 0;padding-top:8px;font-size:13px;color:#9AA7B4">${pilar.sozinho}</p>
        </div>`;
      })}
    </div>
    <figcaption style="margin:16px 0 0;border-radius:8px;border:1px solid rgba(245,158,11,.4);background:rgba(245,158,11,.12);padding:12px 16px;font-size:14px;color:#9AA7B4">${montarTexto(secao.legendaDosPilares)}</figcaption>
  </figure>`;
}

// "O que você leva deste módulo": o último card da Visão geral, como no desenho.
function criarObjetivos() {
  return html`<section class="rounded-card border border-borda bg-superficie p-5" style="display:flex;flex-direction:column;gap:16px">
    <h2 class="text-lg font-semibold">O que você leva deste módulo</h2>
    <ul style="margin:0;padding-left:20px;color:#9AA7B4;display:flex;flex-direction:column;gap:6px;list-style:disc">
      ${modulo3.objetivos.map((objetivo) => html`<li>${objetivo}</li>`)}
    </ul>
  </section>`;
}

function montarAbaVisaoGeral() {
  const secao = modulo3.secoes[0];
  return criarColuna([
    criarSecao({
      id: secao.id,
      titulo: secao.titulo,
      emUmaFrase: secao.emUmaFrase,
      blocos: [
        criarPilares(secao),
        ...secao.paragrafos.map(criarParagrafo),
        // Aviso 1 de 3 ("reconhecer narrativa não prevê preço"): linha âmbar.
        html`<p style="margin:0;border-left:2px solid #F59E0B;padding-left:12px;font-size:14px;color:#9AA7B4">${secao.aviso}</p>`,
        criarExemplo(secao.exemplo),
        ...criarParagrafosFinais(secao),
        criarParaIrMaisFundo(secao.detalhe),
      ],
    }),
    criarObjetivos(),
  ]);
}

// ---------------------------------------------------------------------------
// Aba 2 — Narrativas
// ---------------------------------------------------------------------------

// O ciclo das 5 fases (círculo de 360px, raio 118) e, embaixo, a lista com o
// texto inteiro de cada fase.
function criarCicloDaNarrativa(secao) {
  const ciclo = criarCiclo({
    etapas: secao.fases.map((fase) => ({ titulo: fase.titulo, texto: fase.texto })),
    tamanho: 360,
    raio: 118,
    larguraDaCaixa: 120,
    margem: 2,
    centro: { texto: secao.centroDoCiclo, largura: 100 },
    descricao:
      secao.fases.map((fase, i) => i + 1 + ' ' + fase.titulo + ': ' + fase.texto).join(' ') + ' ' + secao.fimDoCiclo,
  });

  const lista = html`<ol style="margin:0;padding-left:20px;font-size:14px;color:#9AA7B4;display:flex;flex-direction:column;gap:8px;list-style:decimal">
    ${secao.fases.map((fase) => html`<li><strong style="color:#E6EDF3">${fase.titulo}: </strong>${fase.texto}</li>`)}
  </ol>`;

  // O círculo nasce com 360px e só depois se ajusta à tela (no celular vira
  // oval). O `overflow-x:clip` evita que, nesse instante, a página role para o
  // lado; depois do ajuste nada fica cortado.
  return [html`<div style="overflow-x:clip;min-width:0">${ciclo}</div>`, lista];
}

// A triagem "narrativa ou hype?": a pergunta em ciano, o ramo "Sim" em verde e o
// "Não" em âmbar, e os dois descendo para o nó final âmbar (aviso 3 de 3).
function criarTriagem(triagem) {
  const conector = (altura = 14) => html`<div aria-hidden="true" style="width:2px;height:${altura}px;background:#9AA7B4"></div>`;
  const ramo = (dados, tom) => html`<div style="display:flex;flex-direction:column;align-items:center">
    ${conector()}
    <span style="border-radius:999px;border:1px solid ${tom.borda};background:${tom.fundo};color:${tom.cor};padding:1px 10px;font-size:12px;font-weight:600">${dados.rotulo}</span>
    ${conector()}
    <div style="width:100%;box-sizing:border-box;border-radius:8px;border:1px solid ${tom.borda};background:${tom.fundo};padding:10px 14px;font-size:14px;text-align:center;font-weight:600">${dados.titulo}</div>
    ${conector()}
    <div style="width:100%;box-sizing:border-box;border-radius:8px;border:1px solid #1F2733;background:#141A24;padding:10px 14px;font-size:14px;text-align:center;color:#9AA7B4">${dados.texto}</div>
  </div>`;

  return html`<figure style="${CAIXA};padding:20px">
    <div role="img" aria-label="${triagem.descricao}" style="display:flex;flex-direction:column;align-items:center">
      <div style="border-radius:8px;border:1px solid #22D3EE;background:rgba(34,211,238,.1);box-sizing:content-box;padding:10px 16px;font-size:14px;font-weight:600;text-align:center;max-width:380px">${triagem.pergunta}</div>
      <div style="${DUAS_COLUNAS};gap:16px;width:100%;max-width:620px">
        ${ramo(triagem.sim, TRIO.ok)}
        ${ramo(triagem.nao, TRIO.atencao)}
      </div>
      ${conector(16)}
      <div style="border-radius:8px;border:1px solid rgba(245,158,11,.4);background:rgba(245,158,11,.12);box-sizing:content-box;padding:10px 16px;font-size:14px;font-weight:600;text-align:center;max-width:460px">${triagem.fim}</div>
    </div>
  </figure>`;
}

// As duas barras na mesma escala: o sinal social (listrado ciano) contra o custo
// de entrar e sair (vermelho sólido). O comprimento sai dos tetos do dado.
function criarContaDoSinal(conta) {
  const teto = Math.max(conta.sinal.valor, conta.custo.valor);
  const barra = (item, preenchimento, corDaNota) => html`<div>
    <div style="display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;align-items:baseline">
      <span style="font-size:14px">${item.rotulo}</span>
      <span style="font-family:${MONO};font-size:14px">${item.exibicao}</span>
    </div>
    <div style="margin-top:6px;height:24px;width:${((item.valor / teto) * 100).toFixed(2)}%;background:#141A24;border-radius:4px;overflow:hidden">
      <div style="height:100%;width:100%;background:${preenchimento}"></div>
    </div>
    <p style="margin:4px 0 0;font-size:13px;color:${corDaNota}">${item.nota}</p>
  </div>`;

  return html`<figure style="${CAIXA};padding:16px 20px">
    <p style="margin:0 0 12px;font-size:14px;font-weight:600">${conta.titulo}</p>
    <div role="img" aria-label="${conta.descricao}" style="display:flex;flex-direction:column;gap:14px">
      ${barra(conta.sinal, 'repeating-linear-gradient(135deg,#22D3EE 0 3px,transparent 3px 6px)', '#9AA7B4')}
      ${barra(conta.custo, '#EF4444', '#F87171')}
    </div>
    <figcaption style="margin-top:12px;font-size:13px;color:#9AA7B4">${conta.legenda}</figcaption>
  </figure>`;
}

// Os três achados, cada rótulo na sua cor.
function criarEvidencias(evidencias) {
  const COR_DO_ROTULO = { alerta: '#F87171', atencao: '#F59E0B', acento: '#22D3EE' };
  const minuscula = (texto) => texto.charAt(0).toLowerCase() + texto.slice(1);
  const descricao = evidencias.map((item) => item.rotulo + ': ' + minuscula(item.texto)).join(' ');

  return html`<div role="img" aria-label="${descricao}" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px">
    ${evidencias.map(
      (item) => html`<div style="border-radius:8px;border:1px solid #1F2733;background:#0B0F17;padding:14px 16px">
        <p style="${MICRO_11};color:${COR_DO_ROTULO[item.tom] ?? '#9AA7B4'}">${item.rotulo}</p>
        <p style="margin:6px 0 0;font-size:14px;color:#9AA7B4">${item.texto}</p>
      </div>`,
    )}
  </div>`;
}

// A rotina de estudo: passos numerados ligados por um fio; o último (o
// Checklist) em destaque ciano.
function criarRotinaDeEstudo(secao) {
  const ultimo = secao.passos.length - 1;
  return html`<div style="${CAIXA};padding:20px">
    <p style="${MICRO_12};margin:0 0 12px">${secao.rotuloDosPassos}</p>
    <ol role="list" style="list-style:none;margin:0;padding:0;display:flex;flex-direction:column">
      ${secao.passos.map((passo, i) => {
        const destaque = i === ultimo;
        return html`<li style="display:flex;flex-direction:column">
          <div style="border-radius:8px;border:1px solid ${destaque ? '#22D3EE' : '#1F2733'};background:${destaque ? 'rgba(34,211,238,.1)' : '#141A24'};padding:10px 14px;display:flex;gap:10px;align-items:flex-start">
            ${criarMarcador(i + 1, 24)}
            <span style="min-width:0;font-size:14px;color:#E6EDF3">${passo}</span>
          </div>
          ${i < ultimo ? html`<span aria-hidden="true" style="width:2px;height:12px;background:#1F2733;margin-left:23px"></span>` : ''}
        </li>`;
      })}
    </ol>
  </div>`;
}

function montarAbaNarrativas() {
  const pratica = modulo3.praticaNarrativas;
  const secao = (id) => pratica.secoes.find((item) => item.id === id);
  const [nomeDoCiclo, nomeDaTriagem, nomeDaRotacao, nomeDasFerramentas] = folhasDaAba('narrativas');

  const ciclo = secao('ciclo');
  const cardDoCiclo = criarSecao({
    titulo: ciclo.titulo,
    emUmaFrase: ciclo.emUmaFrase,
    id: 'ciclo',
    blocos: [
      ...criarCicloDaNarrativa(ciclo),
      ...ciclo.paragrafos.map(criarParagrafo),
      // Aviso 2 de 3: limita a leitura da fase.
      criarCaixaAmbar(ciclo.aviso),
      criarExemplo(ciclo.exemplo),
      ...criarParagrafosFinais(ciclo),
      criarParaIrMaisFundo(ciclo.detalhe),
    ],
  });

  const preco = secao('narrativa-e-preco');
  const cardDoPreco = criarSecao({
    titulo: preco.titulo,
    emUmaFrase: preco.emUmaFrase,
    blocos: [
      criarTriagem(preco.triagem),
      criarContaDoSinal(preco.conta),
      criarEvidencias(preco.evidencias),
      ...preco.paragrafos.map(criarParagrafo),
      criarExemplo(preco.exemplo),
      ...criarParagrafosFinais(preco),
      criarParaIrMaisFundo(preco.detalhe),
    ],
  });

  const rotacao = secao('rotacao');
  const cardDaRotacao = criarSecao({
    titulo: rotacao.titulo,
    emUmaFrase: rotacao.emUmaFrase,
    blocos: [
      // Datas como estão no dado (com o intervalo e o "~"); o intervalo entre
      // marcos só sai onde as datas permitem. Escala do desenho do M3: 8px por mês.
      montarLinhaDoTempo({ ...rotacao.linhaDoTempo, caixa: true, pxPorMes: 8 }),
      criarTabela(rotacao.tabela),
      ...rotacao.paragrafos.map(criarParagrafo),
      criarExemplo(rotacao.exemplo),
      ...criarParagrafosFinais(rotacao),
      criarParaIrMaisFundo(rotacao.detalhe),
    ],
  });

  const rastrear = secao('ferramentas');
  const cardDeRastrear = criarSecao({
    titulo: rastrear.titulo,
    emUmaFrase: rastrear.emUmaFrase,
    blocos: [
      criarTabela(rastrear.tabela),
      ...rastrear.paragrafos.map(criarParagrafo),
      criarExemplo(rastrear.exemplo),
      ...criarParagrafosFinais(rastrear),
      criarParaIrMaisFundo(rastrear.detalhe),
    ],
  });

  const rotina = secao('rotina');
  const cardDaRotina = criarSecao({
    titulo: rotina.titulo,
    emUmaFrase: rotina.emUmaFrase,
    blocos: [
      criarRotinaDeEstudo(rotina),
      ...rotina.paragrafos.map(criarParagrafo),
      ...criarParagrafosFinais(rotina),
    ],
  });

  return criarColuna([
    criarPerguntaAntes(pratica.perguntaAntes),
    montarDestaques(pratica.destaques),
    montarTermos(pratica.termos),
    montarSegmentos({
      partes: [
        // A animação "Vida de uma narrativa" vem logo depois do ciclo: ela conta
        // o mesmo caminho (nasce → cresce → pico → satura) e o limite do tema.
        { titulo: nomeDoCiclo, conteudo: [cardDoCiclo, criarAnimacaoNarrativa()] },
        { titulo: nomeDaTriagem, conteudo: [cardDoPreco] },
        { titulo: nomeDaRotacao, conteudo: [cardDaRotacao] },
        { titulo: nomeDasFerramentas, conteudo: [cardDeRastrear, cardDaRotina] },
      ],
    }),
  ]);
}

// ---------------------------------------------------------------------------
// Aba 3 — Pilar social na prática
// ---------------------------------------------------------------------------

/**
 * A rotina de 5 minutos: passos na vertical, ligados por um fio. Só o passo
 * aberto mostra o texto (e fica roxo, com o marcador ciano). Clique ou setas
 * (↑ ↓ ← →), Home e End trocam o passo — o padrão de abas do ARIA.
 */
function criarRotinaDeCincoMinutos(secao) {
  let atual = 0;
  const ultimo = secao.passos.length - 1;
  // As cores do estado vão nas classes (o hover precisa delas); o raio vai no
  // style, para a regra do foco (styles/custom.css) não trocá-lo.
  const CLASSE_BASE = 'w-full border text-left transition-colors duration-150';
  const CLASSE_ATUAL = ' border-primaria bg-primaria/15';
  const CLASSE_OUTRO = ' border-borda bg-superficie hover:border-texto-suave';

  const passos = secao.passos.map((passo, indice) => {
    const marcador = html`<span aria-hidden="true" style="flex:0 0 24px;width:24px;height:24px;border-radius:50%;font-family:${MONO};font-size:13px;font-weight:700;display:inline-flex;align-items:center;justify-content:center">${String(indice + 1)}</span>`;
    const texto = html`<span style="display:block;margin-top:4px;font-size:14px;color:#9AA7B4">${passo.texto}</span>`;
    // line-height:normal: no desenho, o texto dentro do botão tem a altura de
    // linha padrão do navegador (mais justa que a do resto da página).
    const botao = criarElemento(
      'button',
      {
        type: 'button',
        role: 'tab',
        class: CLASSE_BASE,
        style: 'border-radius:8px;padding:10px 14px;color:#E6EDF3;cursor:pointer;display:flex;gap:10px;align-items:flex-start;min-height:44px;line-height:normal',
        onclick: () => escolher(indice),
        onkeydown: (evento) => aoTeclar(evento, indice),
      },
      [
        marcador,
        criarElemento('span', { style: 'min-width:0;flex:1 1 auto' }, [
          criarElemento('span', { style: 'display:block;font-size:14px;font-weight:600' }, [passo.titulo]),
          texto,
        ]),
        criarElemento('span', { style: `flex:0 0 auto;font-family:${MONO};font-size:12px;color:#9AA7B4;white-space:nowrap` }, [passo.tempo]),
      ],
    );
    const item = criarElemento('li', { role: 'presentation', style: 'display:flex;flex-direction:column' }, [
      botao,
      indice < ultimo &&
        criarElemento('span', { 'aria-hidden': 'true', style: 'width:2px;height:12px;background:#1F2733;margin-left:23px' }),
    ]);
    return { botao, marcador, texto, item };
  });

  function pintar() {
    passos.forEach(({ botao, marcador, texto }, i) => {
      const aberto = i === atual;
      botao.className = CLASSE_BASE + (aberto ? CLASSE_ATUAL : CLASSE_OUTRO);
      botao.setAttribute('aria-selected', String(aberto));
      botao.setAttribute('tabindex', aberto ? '0' : '-1');
      marcador.style.background = aberto ? '#22D3EE' : '#1F2733';
      marcador.style.color = aberto ? '#0B0F17' : '#E6EDF3';
      // style.display, e não `hidden`: o display do próprio style venceria o hidden.
      texto.style.display = aberto ? 'block' : 'none';
    });
  }

  function escolher(indice, moverFoco = false) {
    atual = indice;
    pintar();
    if (moverFoco) passos[indice].botao.focus();
  }

  function aoTeclar(evento, indice) {
    const destino = {
      ArrowDown: (indice + 1) % passos.length,
      ArrowRight: (indice + 1) % passos.length,
      ArrowUp: (indice - 1 + passos.length) % passos.length,
      ArrowLeft: (indice - 1 + passos.length) % passos.length,
      Home: 0,
      End: ultimo,
    }[evento.key];
    if (destino === undefined) return;
    evento.preventDefault();
    escolher(destino, true);
  }

  pintar();

  return html`<div style="${CAIXA};padding:20px">
    ${criarElemento(
      'ol',
      {
        role: 'tablist',
        'aria-label': 'Passos da rotina de 5 minutos',
        'aria-orientation': 'vertical',
        style: 'list-style:none;margin:0;padding:0;display:flex;flex-direction:column',
      },
      passos.map((passo) => passo.item),
    )}
    <p style="margin:12px 0 0;font-size:13px;color:#9AA7B4">${secao.legendaDosPassos}</p>
  </div>`;
}

// Endereço oficial × endereço colado numa resposta: o mesmo começo e o mesmo
// fim; só o meio muda (em vermelho no falso). Endereços inventados.
function criarEnderecos(enderecos) {
  const TONS = {
    ok: { borda: 'rgba(34,197,94,.5)', fundo: 'rgba(34,197,94,.08)', cor: '#22C55E', meioFundo: 'transparent', meioCor: '#9AA7B4' },
    alerta: { borda: 'rgba(239,68,68,.5)', fundo: 'rgba(239,68,68,.08)', cor: '#F87171', meioFundo: 'rgba(239,68,68,.25)', meioCor: '#F87171' },
  };

  return html`<figure style="${CAIXA};padding:20px">
    <div style="display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;align-items:baseline">
      <p style="margin:0;font-size:14px;font-weight:600">${enderecos.titulo}</p>
      <span style="border-radius:999px;border:1px solid rgba(245,158,11,.4);background:rgba(245,158,11,.12);color:#F59E0B;padding:1px 10px;font-size:12px;font-weight:600">${enderecos.selo}</span>
    </div>
    <div role="img" aria-label="${enderecos.descricao}" style="margin-top:12px;display:flex;flex-direction:column;gap:10px">
      ${enderecos.itens.map((item) => {
        const tom = TONS[item.tom] ?? TONS.ok;
        return html`<div style="border-radius:8px;border:1px solid ${tom.borda};background:${tom.fundo};padding:10px 14px">
          <p style="${MICRO_11};color:${tom.cor}">${item.rotulo}</p>
          <p style="margin:4px 0 0;font-family:${MONO};font-size:14px;overflow-wrap:anywhere;line-height:1.5"><span>${item.inicio}</span><span style="border-radius:4px;background:${tom.meioFundo};color:${tom.meioCor};padding:1px 3px">${item.meio}</span><span>${item.fim}</span></p>
          <p style="margin:6px 0 0;font-size:13px;color:#9AA7B4">${item.nota}</p>
        </div>`;
      })}
    </div>
    <figcaption style="margin:12px 0 0;font-size:13px;color:#9AA7B4">${enderecos.legenda}</figcaption>
  </figure>`;
}

// Os quatro golpes do Discord: número, título, como funciona e a caixa verde
// "Defesa".
function criarGolpes(golpes) {
  const descricao = golpes.map((golpe, i) => i + 1 + '. ' + golpe.titulo + ': ' + golpe.como + ' Defesa: ' + golpe.defesa).join(' ');

  return html`<div role="img" aria-label="${descricao}" style="${DUAS_COLUNAS};gap:12px">
    ${golpes.map(
      (golpe, i) => html`<div style="border-radius:8px;border:1px solid #1F2733;background:#0B0F17;padding:14px 16px;display:flex;flex-direction:column;gap:8px">
        <p style="margin:0;font-size:14px;font-weight:600;display:flex;align-items:center;gap:8px">${criarMarcador(i + 1, 22)}<span>${golpe.titulo}</span></p>
        <p style="margin:0;font-size:14px;color:#9AA7B4">${golpe.como}</p>
        <div style="margin-top:auto;border-radius:6px;border:1px solid rgba(34,197,94,.5);background:rgba(34,197,94,.12);padding:8px 10px">
          <p style="${MICRO_11};color:#22C55E">Defesa</p>
          <p style="margin:2px 0 0;font-size:13px">${golpe.defesa}</p>
        </div>
      </div>`,
    )}
  </div>`;
}

// O retorno depois do tweet, com o zero no centro: positivo para a direita em
// verde, negativo para a esquerda em vermelho, todos na mesma escala.
function criarBarrasDosCalls(barras) {
  const teto = Math.max(...barras.itens.map((item) => Math.abs(item.valor)));
  const largura = (valor) => ((Math.abs(valor) / teto) * 100).toFixed(2);

  return html`<figure style="${CAIXA};padding:16px 20px">
    <p style="margin:0 0 12px;font-size:14px;font-weight:600">${barras.titulo}</p>
    <div role="img" aria-label="${barras.descricao}" style="display:flex;flex-direction:column;gap:12px">
      ${barras.itens.map((item) => {
        const positivo = item.valor >= 0;
        return html`<div>
          <div style="display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;align-items:baseline">
            <span style="font-size:14px">${item.quando}</span>
            <span style="font-family:${MONO};font-size:14px;color:${positivo ? '#22C55E' : '#F87171'}">${item.exibicao}</span>
          </div>
          <div style="margin-top:6px;height:20px;display:flex;align-items:center">
            <div style="width:50%;display:flex;justify-content:flex-end"><div style="height:20px;width:${positivo ? 0 : largura(item.valor)}%;background:#EF4444;border-radius:4px 0 0 4px"></div></div>
            <div style="width:50%"><div style="height:20px;width:${positivo ? largura(item.valor) : 0}%;background:#22C55E;border-radius:0 4px 4px 0"></div></div>
          </div>
        </div>`;
      })}
    </div>
    <figcaption style="margin-top:12px;font-size:13px;color:#9AA7B4">${barras.legenda}</figcaption>
  </figure>`;
}

function montarAbaSocial() {
  const pratica = modulo3.praticaSocial;
  const secao = (id) => pratica.secoes.find((item) => item.id === id);
  const [nomeDaRotina, nomeDoPerfil, nomeDoDiscord, nomeDosCalls] = folhasDaAba('social');

  const rotina = secao('rotina');
  const cardDaRotina = criarSecao({
    titulo: rotina.titulo,
    emUmaFrase: rotina.emUmaFrase,
    id: 'pilar-social-na-pratica',
    blocos: [
      criarRotinaDeCincoMinutos(rotina),
      criarEnderecos(rotina.enderecos),
      ...rotina.paragrafos.map(criarParagrafo),
      criarExemplo(rotina.exemplo),
      ...criarParagrafosFinais(rotina),
    ],
  });

  const perfil = secao('perfil');
  const cardDoPerfil = criarSecao({
    titulo: perfil.titulo,
    emUmaFrase: perfil.emUmaFrase,
    blocos: [
      criarAnatomia({ ...perfil.anatomia, notaDoMockup: perfil.anatomia.nota, legenda: perfil.anatomia.legenda }),
      ...perfil.paragrafos.map(criarParagrafo),
      criarExemplo(perfil.exemplo),
      ...criarParagrafosFinais(perfil),
      criarParaIrMaisFundo(perfil.detalhe),
    ],
  });

  const discord = secao('discord-telegram');
  const cardDoDiscord = criarSecao({
    titulo: discord.titulo,
    emUmaFrase: discord.emUmaFrase,
    blocos: [
      criarGolpes(discord.golpes),
      ...discord.paragrafos.map(criarParagrafo),
      criarExemplo(discord.exemplo),
      ...criarParagrafosFinais(discord),
      criarParaIrMaisFundo(discord.detalhe),
    ],
  });

  const calls = secao('calls');
  const cardDosCalls = criarSecao({
    titulo: calls.titulo,
    emUmaFrase: calls.emUmaFrase,
    blocos: [
      criarBarrasDosCalls(calls.barras),
      criarTabela(calls.tabela),
      ...calls.paragrafos.map(criarParagrafo),
      criarExemplo(calls.exemplo),
      ...criarParagrafosFinais(calls),
      criarParaIrMaisFundo(calls.detalhe),
    ],
  });

  return criarColuna([
    criarPerguntaAntes(pratica.perguntaAntes),
    montarDestaques(pratica.destaques),
    montarSegmentos({
      partes: [
        { titulo: nomeDaRotina, conteudo: [cardDaRotina] },
        { titulo: nomeDoPerfil, conteudo: [cardDoPerfil] },
        // Sem "Confira antes de seguir" nesta parte: a q8 saiu junto com as
        // "Pergunta rápida" (20/09/2026). Ela continua no quiz do fim.
        { titulo: nomeDoDiscord, conteudo: [cardDoDiscord] },
        { titulo: nomeDosCalls, conteudo: [cardDosCalls] },
      ],
    }),
  ]);
}

// ---------------------------------------------------------------------------
// Aba 4 — Pilar técnico na prática
// ---------------------------------------------------------------------------

// O conteúdo do painel de uma ferramenta: título com o endereço, a linha do que
// é grátis, a anatomia da página e, em duas colunas, o passo a passo e as
// armadilhas (em vermelho). São os quatro blocos do desenho, iguais nas quatro
// ferramentas: nada de pergunta aqui dentro (o painel é aria-live="polite" e
// anunciaria o quiz inteiro a cada troca de ferramenta).
function criarConteudoDaFerramenta(ferramenta, notaDoMockup) {
  return [
    html`<div style="display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;align-items:baseline">
      <h2 class="text-lg font-semibold">${ferramenta.nome} — ${ferramenta.pergunta}</h2>
      <span style="font-family:${MONO};font-size:13px;color:#22D3EE">${ferramenta.endereco}</span>
    </div>`,
    html`<p style="margin:0;border-left:2px solid #22D3EE;padding-left:12px;font-size:14px;color:#9AA7B4">${ferramenta.gratis}</p>`,
    criarAnatomia({ ...ferramenta.anatomia, notaDoMockup, legenda: ferramenta.anatomia.nota }),
    html`<div style="${DUAS_COLUNAS};gap:16px">
      <div style="border-radius:8px;border:1px solid #1F2733;background:#0B0F17;padding:14px 16px">
        <p style="${MICRO_11};color:#9AA7B4;margin:0 0 8px">Passo a passo</p>
        <ol style="margin:0;padding-left:20px;font-size:14px;color:#9AA7B4;display:flex;flex-direction:column;gap:4px;list-style:decimal">
          ${ferramenta.passos.map((passo) => html`<li>${passo}</li>`)}
        </ol>
      </div>
      <div style="border-radius:8px;border:1px solid rgba(239,68,68,.5);background:rgba(239,68,68,.12);padding:14px 16px">
        <p style="${MICRO_11};color:#F87171;margin:0 0 8px">Armadilhas</p>
        <ul style="margin:0;padding-left:20px;font-size:14px;display:flex;flex-direction:column;gap:6px;list-style:disc">
          ${ferramenta.armadilhas.map((armadilha) => html`<li>${armadilha}</li>`)}
        </ul>
      </div>
    </div>`,
  ];
}

// A explicação em texto de uma ferramenta: o que ela é, por que a pergunta dela
// vem naquela posição, e o erro que ela evita. Fica num card separado, fora do
// painel `aria-live="polite"` — se ficasse dentro, o leitor de tela releria
// todos estes parágrafos a cada troca de ferramenta. O título repete o nome
// para o texto não ficar solto de quem ele fala.
function criarTextoDaFerramenta(ferramenta) {
  return [
    html`<h3 class="text-base font-semibold">${ferramenta.nome}</h3>`,
    ...(ferramenta.paragrafos ?? []).map(criarParagrafo),
    ...criarParagrafosFinais(ferramenta),
  ];
}

/**
 * As quatro ferramentas em ordem (botões com aria-pressed e setas → entre eles)
 * e o painel embaixo, que troca de ferramenta a cada clique. Na tela estreita os
 * botões ficam um embaixo do outro. O conteúdo de cada ferramenta é montado uma
 * vez só: trocar e voltar não perde a resposta marcada.
 */
function criarQuatroFerramentas(pratica) {
  const { ferramentas, ordem, notaDoMockup } = pratica;
  let atual = ferramentas[0].id;
  const conteudos = new Map();

  const painel = criarElemento('section', {
    'aria-live': 'polite',
    class: 'rounded-card border border-borda bg-superficie p-5',
    style: 'display:flex;flex-direction:column;gap:16px',
  });

  // O texto de cada ferramenta fica FORA do painel `aria-live`, num card só
  // dele: dentro, o leitor de tela releria tudo a cada troca de ferramenta.
  // Vem depois do painel porque o mockup e os passos são o visual da seção, e
  // a ordem do app é visual → parágrafos → parágrafos finais.
  const texto = criarElemento('section', {
    class: 'rounded-card border border-borda bg-superficie p-5',
    style: 'display:flex;flex-direction:column;gap:16px',
  });
  const textos = new Map();

  // Cores do estado nas classes (hover); o raio no style (a regra do foco não o troca).
  const CLASSE_BASE = 'border text-left transition-colors duration-150';
  const CLASSE_ATUAL = ' border-primaria bg-primaria/15';
  const CLASSE_OUTRO = ' border-borda bg-superficie hover:border-texto-suave';

  const botoes = ferramentas.map((ferramenta, i) => {
    const marcador = html`<span aria-hidden="true" style="flex:0 0 24px;width:24px;height:24px;border-radius:50%;font-family:${MONO};font-size:13px;font-weight:700;display:inline-flex;align-items:center;justify-content:center">${String(i + 1)}</span>`;
    // line-height:normal, como nos passos da rotina (a altura de linha do desenho).
    const botao = criarElemento(
      'button',
      {
        type: 'button',
        class: CLASSE_BASE,
        style: 'flex:1 1 auto;min-width:0;border-radius:8px;padding:12px 14px;color:#E6EDF3;cursor:pointer;display:flex;flex-direction:column;gap:6px;min-height:44px;line-height:normal',
        onclick: () => escolher(ferramenta.id),
      },
      [
        criarElemento('span', { style: 'display:flex;gap:8px;align-items:center' }, [
          marcador,
          criarElemento('span', { style: 'font-size:14px;font-weight:600' }, [ferramenta.nome]),
        ]),
        criarElemento('span', { style: 'font-size:13px;color:#9AA7B4' }, [ferramenta.pergunta]),
      ],
    );
    return { id: ferramenta.id, botao, marcador };
  });

  function escolher(id) {
    atual = id;
    botoes.forEach(({ id: idDoBotao, botao, marcador }) => {
      const escolhido = idDoBotao === atual;
      botao.className = CLASSE_BASE + (escolhido ? CLASSE_ATUAL : CLASSE_OUTRO);
      botao.setAttribute('aria-pressed', String(escolhido));
      marcador.style.background = escolhido ? '#22D3EE' : '#1F2733';
      marcador.style.color = escolhido ? '#0B0F17' : '#E6EDF3';
    });
    const ferramenta = ferramentas.find((item) => item.id === atual);
    if (!conteudos.has(atual)) {
      conteudos.set(atual, criarConteudoDaFerramenta(ferramenta, notaDoMockup));
    }
    painel.replaceChildren(...conteudos.get(atual).filter(Boolean));
    if (!textos.has(atual)) {
      textos.set(atual, criarTextoDaFerramenta(ferramenta));
    }
    texto.replaceChildren(...textos.get(atual).filter(Boolean));
  }

  // Na horizontal (a partir de 640px) cada passo tem pelo menos 150px e a lista
  // rola dentro da caixa se faltar espaço; no celular, um embaixo do outro, com
  // a seta apontando para baixo. A folga de 4px (padding 4 e margem −4) é para
  // a rolagem não cortar o contorno do foco dos botões.
  //
  // O rótulo é curto (o título da seção): no desenho a lista é role="img" e o
  // rótulo descreve as quatro ferramentas no lugar delas; aqui os botões são
  // conteúdo de verdade e já dizem nome e pergunta — repetir tudo no nome da
  // lista faria o leitor de tela ler duas vezes. O tabindex é o do desenho: a
  // faixa rola para o lado em telas estreitas e precisa rolar pelo teclado.
  const lista = criarElemento(
    'ol',
    {
      role: 'list',
      'aria-label': ordem.titulo,
      tabindex: '0',
      class: 'flex flex-col sm:flex-row',
      style: 'list-style:none;margin:-4px;padding:4px;align-items:stretch;gap:0;overflow-x:auto',
    },
    botoes.map(({ botao }, i) =>
      criarElemento('li', { class: 'flex flex-col sm:flex-row sm:min-w-[150px]', style: 'flex:1 1 0;align-items:stretch' }, [
        botao,
        i < botoes.length - 1 &&
          criarElemento(
            'span',
            { 'aria-hidden': 'true', style: 'flex:0 0 auto;display:flex;align-items:center;justify-content:center;color:#9AA7B4;padding:2px 6px' },
            [criarElemento('span', { class: 'rotate-90 sm:rotate-0', style: 'display:inline-block' }, ['→'])],
          ),
      ]),
    ),
  );

  // Os parágrafos vêm ANTES da figura, ao contrário das outras seções: a figura
  // aqui não é um desenho, são os botões que trocam o painel. Texto entre eles e
  // o painel obrigaria a rolar a tela a cada clique.
  const seletor = criarSecao({
    titulo: ordem.titulo,
    emUmaFrase: ordem.emUmaFrase,
    blocos: [
      ...ordem.paragrafos.map(criarParagrafo),
      html`<figure style="${CAIXA};padding:20px">
        ${lista}
        <figcaption style="margin:12px 0 0;font-size:13px;color:#9AA7B4">${ordem.legenda}</figcaption>
      </figure>`,
    ],
  });

  escolher(atual);
  return [seletor, painel, texto];
}

function montarAbaTecnico() {
  const pratica = modulo3.praticaTecnica;
  const { onde } = pratica;

  // Sem "Parte X de N" aqui: o seletor das quatro ferramentas já mostra uma
  // parte de cada vez (no app antigo, cada ferramenta era uma parte).
  return criarColuna([
    criarPerguntaAntes(pratica.perguntaAntes),
    montarDestaques(pratica.destaques),
    ...criarQuatroFerramentas(pratica),
    criarSecao({
      titulo: onde.titulo,
      emUmaFrase: onde.emUmaFrase,
      id: 'pilar-tecnico-na-pratica',
      blocos: [
        criarTabela(onde.tabela),
        ...onde.paragrafos.map(criarParagrafo),
        ...criarParagrafosFinais(onde),
      ],
    }),
  ]);
}

// ---------------------------------------------------------------------------
// Aba 5 — Matriz de ferramentas
// ---------------------------------------------------------------------------

const TOM_DO_RISCO = { baixo: TRIO.ok, medio: TRIO.atencao, alto: TRIO.alerta };

// O cartão aberto de uma ferramenta: nome e risco em cima, chips do pilar (roxo),
// das redes e dos papéis, os avisos (Sigma em vermelho, correção do Axiom em
// âmbar), "O que faz" e "Quando usar"; só as observações ficam recolhidas.
function criarCartaoDaFerramenta(ferramenta) {
  const risco = TOM_DO_RISCO[ferramenta.risco] ?? TRIO.atencao;
  const nomeDaRede = (id) => {
    const rede = modulo3.chains.find((item) => item.id === id);
    return rede?.nomeCurto ?? rede?.nome ?? id;
  };
  const nomeDoPapel = (id) => modulo3.papeis.find((item) => item.id === id)?.nome ?? id;
  const etiquetas = [...ferramenta.chains.map(nomeDaRede), ...ferramenta.papeis.map(nomeDoPapel)];
  const bloco = (rotulo, texto) => html`<div>
    <p style="${MICRO_11};color:#9AA7B4">${rotulo}</p>
    <p style="margin:2px 0 0;font-size:14px;color:#9AA7B4">${texto}</p>
  </div>`;

  return html`<article style="border-radius:8px;border:1px solid #1F2733;background:#0B0F17;padding:16px;display:flex;flex-direction:column;gap:10px;min-width:0">
    <div style="display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;align-items:baseline">
      <p style="margin:0;font-size:15px;font-weight:600">${ferramenta.nome}</p>
      <span style="border-radius:999px;border:1px solid ${risco.borda};background:${risco.fundo};color:${risco.cor};padding:1px 10px;font-size:12px;font-weight:600;white-space:nowrap">${rotuloRisco(ferramenta.risco)}</span>
    </div>
    <div style="display:flex;flex-wrap:wrap;gap:6px">
      <span style="border-radius:999px;border:1px solid rgba(124,58,237,.5);background:rgba(124,58,237,.12);padding:2px 10px;font-size:12px">${ferramenta.pilar === 'social' ? 'Pilar social' : 'Pilar técnico'}</span>
      ${etiquetas.map((etiqueta) => html`<span style="border-radius:999px;border:1px solid #1F2733;background:#141A24;padding:2px 10px;font-size:12px;color:#9AA7B4">${etiqueta}</span>`)}
    </div>
    ${ferramenta.naoSuportaSolana
      ? html`<p style="margin:0;border-radius:6px;border:1px solid rgba(239,68,68,.5);background:rgba(239,68,68,.12);padding:6px 10px;font-size:13px;color:#F87171;font-weight:600">${modulo3.matriz.avisoSemSolana}</p>`
      : ''}
    ${ferramenta.correcao
      ? html`<p style="margin:0;border-radius:6px;border:1px solid rgba(245,158,11,.4);background:rgba(245,158,11,.12);padding:6px 10px;font-size:13px">${ferramenta.correcao}</p>`
      : ''}
    ${bloco('O que faz', ferramenta.oQueFaz)}
    ${bloco('Quando usar', ferramenta.quandoUsar)}
    <details style="margin-top:auto;border-radius:6px;border:1px solid #1F2733;background:#141A24;padding:8px 12px">
      <summary style="cursor:pointer;font-size:13px;font-weight:600">Observações</summary>
      <p style="margin:6px 0 0;font-size:13px;color:#9AA7B4">${ferramenta.observacoes}</p>
    </details>
  </article>`;
}

/**
 * A matriz filtrável: três grupos de chips (pilar, rede e papel, um de cada
 * vez em cada grupo), o contador "N ferramentas de 16", a caixa âmbar quando
 * nada bate e a grade de cartões (2 colunas no computador, 1 no celular).
 */
function criarMatriz() {
  const filtros = { pilar: 'todos', chain: 'todas', papel: 'todos' };
  const GRUPOS = [
    {
      chave: 'pilar',
      rotulo: 'Pilar',
      opcoes: [
        { id: 'todos', nome: 'Todos' },
        { id: 'social', nome: 'Social' },
        { id: 'tecnico', nome: 'Técnico' },
      ],
    },
    {
      chave: 'chain',
      rotulo: 'Rede',
      opcoes: [{ id: 'todas', nome: 'Todas' }, ...modulo3.chains.map((rede) => ({ id: rede.id, nome: rede.nomeCurto ?? rede.nome }))],
    },
    { chave: 'papel', rotulo: 'Papel', opcoes: [{ id: 'todos', nome: 'Todos' }, ...modulo3.papeis] },
  ];

  // Cores do estado nas classes (hover); o raio no style (a regra do foco não o troca).
  const CLASSE_BASE = 'border transition-colors duration-150';
  const CLASSE_ATIVA = ' border-primaria bg-primaria/15';
  const CLASSE_INATIVA = ' border-borda bg-superficie hover:border-texto-suave';

  const chips = [];
  const grupos = GRUPOS.map((grupo) =>
    html`<div>
      <p style="${MICRO_11};color:#9AA7B4;margin:0 0 6px">${grupo.rotulo}</p>
      ${criarElemento(
        'div',
        { role: 'group', 'aria-label': 'Filtrar por ' + grupo.rotulo.toLowerCase(), style: 'display:flex;flex-wrap:wrap;gap:8px' },
        grupo.opcoes.map((opcao) => {
          const chip = criarElemento(
            'button',
            {
              type: 'button',
              style: 'min-height:40px;border-radius:999px;color:#E6EDF3;padding:6px 14px;font-size:14px;cursor:pointer',
              onclick: () => {
                filtros[grupo.chave] = opcao.id;
                atualizarMatriz();
              },
            },
            [opcao.nome],
          );
          chips.push({ chip, grupo: grupo.chave, id: opcao.id });
          return chip;
        }),
      )}
    </div>`,
  );

  const contador = html`<p aria-live="polite" style="margin:0;font-size:14px;color:#9AA7B4"></p>`;
  const vazio = html`<div style="border-radius:8px;border:1px solid rgba(245,158,11,.4);background:rgba(245,158,11,.12);padding:16px;font-size:14px">Nenhuma ferramenta bate com esses filtros ao mesmo tempo. Tente afrouxar um deles.</div>`;
  const grade = html`<div style="${DUAS_COLUNAS};gap:16px"></div>`;

  // Os cartões são montados uma vez; filtrar só mostra ou esconde.
  const cartoes = modulo3.ferramentas.map((ferramenta) => ({ ferramenta, cartao: criarCartaoDaFerramenta(ferramenta) }));
  grade.append(...cartoes.map((item) => item.cartao));

  function passa(ferramenta) {
    return (
      (filtros.pilar === 'todos' || ferramenta.pilar === filtros.pilar) &&
      (filtros.chain === 'todas' || ferramenta.chains.includes(filtros.chain)) &&
      (filtros.papel === 'todos' || ferramenta.papeis.includes(filtros.papel))
    );
  }

  function atualizarMatriz() {
    for (const { chip, grupo, id } of chips) {
      const ativo = filtros[grupo] === id;
      chip.className = CLASSE_BASE + (ativo ? CLASSE_ATIVA : CLASSE_INATIVA);
      chip.setAttribute('aria-pressed', String(ativo));
    }
    // style.display, e não `hidden`: o display do próprio style venceria o hidden.
    let quantas = 0;
    for (const { ferramenta, cartao } of cartoes) {
      const mostra = passa(ferramenta);
      cartao.style.display = mostra ? 'flex' : 'none';
      if (mostra) quantas += 1;
    }
    contador.textContent = quantas + (quantas === 1 ? ' ferramenta' : ' ferramentas') + ' de ' + cartoes.length;
    vazio.style.display = quantas > 0 ? 'none' : 'block';
    grade.style.display = quantas === 0 ? 'none' : 'grid';
  }

  atualizarMatriz();

  return [html`<div style="display:flex;flex-direction:column;gap:12px">${grupos}</div>`, contador, vazio, grade];
}

function montarAbaMatriz() {
  const { matriz } = modulo3;
  return criarColuna([
    criarSecao({
      titulo: matriz.titulo,
      emUmaFrase: matriz.emUmaFrase,
      blocos: [
        ...criarMatriz(),
        ...matriz.paragrafos.map(criarParagrafo),
        criarExemplo(matriz.exemplo),
        ...criarParagrafosFinais(matriz),
      ],
    }),
  ]);
}

// ---------------------------------------------------------------------------
// Aba 6 — Cenário 2025–2026
// ---------------------------------------------------------------------------
function montarAbaCenario() {
  const cenario = modulo3.cenarioLaunchpads;
  return criarColuna([
    criarSecao({
      titulo: cenario.titulo,
      emUmaFrase: cenario.emUmaFrase,
      id: 'cenario-2025-2026',
      blocos: [
        // Pontos roxos e só o texto de cada evento. As datas ficam como no dado
        // ("Início de agosto de 2025", "Fim de 2025"): sem dia, sem intervalo.
        montarLinhaDoTempo({
          marcos: cenario.eventos.map((evento) => ({ data: evento.data, texto: evento.texto })),
          caixa: true,
          pxPorMes: 8,
        }),
        ...cenario.paragrafos.map(criarParagrafo),
        ...criarParagrafosFinais(cenario),
        criarParagrafo(cenario.conclusao),
      ],
    }),
  ]);
}

// ---------------------------------------------------------------------------
// Aba 7 — Quiz, "Terminou o módulo?" e as fontes
// ---------------------------------------------------------------------------
function montarConclusao() {
  const container = criarCard([]);

  function estaConcluido() {
    return (obterEstado().modulosConcluidos ?? []).includes(modulo3.id);
  }

  function alternar() {
    const concluido = estaConcluido();
    const salvou = atualizar((estado) => {
      const lista = new Set(estado.modulosConcluidos ?? []);
      if (concluido) lista.delete(modulo3.id);
      else lista.add(modulo3.id);
      return { ...estado, modulosConcluidos: [...lista] };
    });

    renderizar();
    if (!salvou) mostrarToast('Não consegui salvar o progresso');
    else mostrarToast(concluido ? 'Módulo desmarcado' : 'Módulo 3 concluído. Progresso salvo');
  }

  function renderizar() {
    const concluido = estaConcluido();
    container.replaceChildren(
      criarElemento('h2', { class: 'text-lg font-semibold' }, ['Terminou o módulo?']),
      criarElemento('p', { style: 'margin:8px 0 16px;font-size:14px;color:#9AA7B4' }, [
        concluido
          ? 'Módulo 3 marcado como concluído. Ele conta na barra de progresso do topo.'
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

// "Fontes e itens não verificados": recolhido, com os itens não verificados em
// caixas âmbar e a lista de fontes consultadas.
function montarFontes() {
  const SUBTITULO = 'margin:16px 0 0;font-size:14px;font-weight:600';
  return html`<details style="border-radius:12px;border:1px solid #1F2733;background:#141A24;padding:20px">
    <summary style="cursor:pointer;font-size:14px;font-weight:600">Fontes e itens não verificados</summary>
    <h3 style="${SUBTITULO}">Não verificado</h3>
    <ul role="list" style="list-style:none;margin:8px 0 0;padding:0;display:flex;flex-direction:column;gap:8px">
      ${modulo3.naoVerificadoPratica.map(
        (item) => html`<li style="border-radius:8px;border:1px solid rgba(245,158,11,.4);background:rgba(245,158,11,.1);padding:12px;font-size:14px;color:#9AA7B4"><strong style="color:#E6EDF3">${item.titulo}: </strong>${item.texto}</li>`,
      )}
    </ul>
    <h3 style="${SUBTITULO}">Fontes consultadas</h3>
    <ul role="list" style="list-style:none;margin:8px 0 0;padding:0;display:flex;flex-direction:column;gap:4px;font-size:14px;color:#9AA7B4">
      ${modulo3.fontesPratica.map((fonte) => html`<li>${fonte.titulo} — ${fonte.url} (consulta em ${fonte.consultadoEm})</li>`)}
    </ul>
  </details>`;
}

function montarAbaQuiz() {
  return criarColuna([
    // Corrigido por pergunta (tela 34). Sem `moduloId`: o card "Terminou o
    // módulo?" continua separado, logo abaixo, como no desenho.
    montarQuiz({
      id: modulo3.id,
      titulo: 'Mini-quiz do Módulo 3',
      descricao: modulo3.descricaoDoQuiz,
      perguntas: PERGUNTAS,
      moduloNome: 'Módulo 3',
    }),
    montarConclusao(),
    montarFontes(),
  ]);
}

// ---------------------------------------------------------------------------
// Montagem da página
// ---------------------------------------------------------------------------

// Cabeçalho do desenho: "MÓDULO 3", o título, a frase curta e, em âmbar, a
// correção "Axon → Axiom" (visível em todas as abas).
function montarCabecalho() {
  const cabecalho = criarTitulo(modulo3.titulo, { rotulo: 'Módulo 3', subtitulo: modulo3.subtitulo });
  const { titulo, texto } = modulo3.correcaoAxiom;
  cabecalho.append(
    html`<p style="margin:16px 0 0;border-radius:12px;border:1px solid rgba(245,158,11,.4);background:rgba(245,158,11,.12);padding:12px 16px;font-size:14px;color:#9AA7B4"><strong style="color:#E6EDF3">${titulo} </strong>${texto}</p>`,
  );
  return cabecalho;
}

export function montarModulo3() {
  const abas = [
    { id: 'visao-geral', rotulo: 'Visão geral', montar: montarAbaVisaoGeral },
    { id: 'narrativas', rotulo: 'Narrativas', montar: montarAbaNarrativas },
    { id: 'social', rotulo: 'Pilar social na prática', montar: montarAbaSocial },
    { id: 'tecnico', rotulo: 'Pilar técnico na prática', montar: montarAbaTecnico },
    { id: 'matriz', rotulo: 'Matriz de ferramentas', montar: montarAbaMatriz },
    { id: 'cenario', rotulo: 'Cenário 2025–2026', montar: montarAbaCenario },
    { id: 'quiz', rotulo: 'Quiz', montar: montarAbaQuiz },
  ];

  // O mapa do módulo abre a página: o todo antes das partes. Um ramo por aba
  // (o Quiz também); as folhas curtas vêm de modulo3.mapa. O ramo da aba aberta
  // fica roxo.
  const mapa = criarMapaDoModulo({
    mapa: modulo3.mapa,
    abas: abas.map(({ id, rotulo }) => ({ id, rotulo })),
    perguntas: modulo3.quiz.length,
    idDasAbas: 'modulo-3',
  });

  const painelDeAbas = criarAbas({ id: 'modulo-3', rotulo: 'Seções do Módulo 3', abas });

  // Cabeçalho, mapa e abas com 24px entre eles (a margem de baixo do cabeçalho
  // e do mapa, e a de cima do painel da aba).
  return criarElemento('div', {}, [montarCabecalho(), mapa, painelDeAbas]);
}
