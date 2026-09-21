// views/modulo1.js — monta a página do Módulo 1 a partir de src/data/modulo1.js.
//
// A tela segue o desenho "M1 Desktop" (e "M1 Celular") do handoff do Claude
// Design, em pesquisa/design/handoff/designs. De cima para baixo:
//   cabeçalho (MÓDULO 1 + título + frase + "Lembrete") → mapa do módulo → abas
//   Fundamentos · Carteiras · Seed phrase · Golpes · Defesa · Brasil · Quiz
//
// Cada seção é UM card (components/secao.js): título → ideia central → o visual
// → 1 a 3 parágrafos → "Para ir mais fundo" → "Pergunta rápida". Os visuais que
// só o Módulo 1 tem (a pilha de confirmações, a anatomia da transação, as
// árvores de decisão…) são funções pequenas deste arquivo, com as medidas e as
// cores do desenho. Os textos e números vêm todos do arquivo de dados.

import { modulo1 } from '../data/modulo1.js';
import { criarElemento, criarTitulo, criarCard, criarBotao, criarAbas, mostrarToast, html } from '../ui.js';
import { montarChecklist } from '../components/checklist.js';
import { montarComparacaoLadoALado } from '../components/comparisonTable.js';
import { montarQuiz, montarPerguntaRapida, juntarPorques } from '../components/quiz.js';
import { criarCardDaSecao } from '../components/secao.js';
import { criarMapaDoModulo, criarSequencia } from '../components/visuais.js';
import { criarAnimacaoDrainer, criarAnimacaoEnvenenamento } from '../components/animacoes.js';
import { montarDestaques } from '../components/destaques.js';
import { montarLinhaDoTempo } from '../components/linhaDoTempo.js';
import { videoDaSecao } from '../components/video.js';
import { obterEstado, atualizar } from '../store.js';

// As perguntas do quiz já com o "por que a sua não serve" de cada alternativa.
// Servem ao quiz final e às "Perguntas rápidas" do fim das seções.
const PERGUNTAS = juntarPorques(modulo1.quiz, modulo1.porqueErradas);

// ---------------------------------------------------------------------------
// Peças de estilo repetidas (valores do desenho)
// ---------------------------------------------------------------------------

const MONO = "'JetBrains Mono',ui-monospace,monospace";

// A caixa escura de todo visual: fundo #0B0F17, borda, raio 8, padding 20.
const CAIXA = 'margin:0;border-radius:8px;border:1px solid #1F2733;background:#0B0F17;padding:20px;min-width:0';
// A frase em negrito no topo de uma caixa e a legenda miúda embaixo.
const FRASE = 'margin:0 0 12px;font-size:14px;font-weight:600';
const LEGENDA = 'margin:12px 0 0;font-size:13px;color:#9AA7B4';
// Micro-rótulo em maiúsculas (11px) — a cor vem de quem usa.
const MICRO = 'margin:0;font-size:11px;font-weight:600;letter-spacing:.05em;text-transform:uppercase;color:';
// O número dentro do círculo ciano de 24px.
const MARCADOR =
  'flex:0 0 24px;width:24px;height:24px;border-radius:50%;background:#22D3EE;color:#0B0F17;' +
  'font-family:' + MONO + ';font-size:13px;font-weight:700;display:inline-flex;align-items:center;justify-content:center';
// Caixa de um nó das árvores (centralizada, 14px). content-box: a largura máxima
// de alguns nós (max-width) conta só o texto, sem o padding, como no desenho.
const NO = 'box-sizing:content-box;border-radius:8px;padding:10px 16px;font-size:14px;text-align:center';

// Borda, fundo e cor de texto de cada tom (os trios de estado do handoff).
const TONS = {
  neutro: { borda: '#1F2733', fundo: '#141A24', cor: '#9AA7B4' },
  ok: { borda: 'rgba(34,197,94,.5)', fundo: 'rgba(34,197,94,.12)', cor: '#22C55E' },
  alerta: { borda: 'rgba(239,68,68,.5)', fundo: 'rgba(239,68,68,.12)', cor: '#F87171' },
  atencao: { borda: 'rgba(245,158,11,.4)', fundo: 'rgba(245,158,11,.12)', cor: '#F59E0B' },
  acento: { borda: '#22D3EE', fundo: 'rgba(34,211,238,.1)', cor: '#22D3EE' },
  roxo: { borda: 'rgba(124,58,237,.6)', fundo: 'rgba(124,58,237,.15)', cor: '#9AA7B4' },
};

function tom(nome) {
  return TONS[nome] ?? TONS.neutro;
}

// O traço vertical de 2px que liga dois nós de uma árvore.
function ligacao(altura = 16) {
  return html`<div aria-hidden="true" style="width:2px;height:${altura}px;background:#9AA7B4"></div>`;
}

// A seta "→" entre dois passos de uma sequência (fica embaixo do passo no celular).
function seta(padding = '4px 8px', extra = '') {
  return html`<span aria-hidden="true" style="flex:0 0 auto;display:flex;align-items:center;justify-content:center;color:#9AA7B4;padding:${padding};${extra}">→</span>`;
}

// A pílula de um ramo ("Sim", "Não", "Caminho A · corretora").
function pilula(texto, nomeDoTom = 'neutro') {
  const t = tom(nomeDoTom);
  const peso = nomeDoTom === 'neutro' ? 400 : 600;
  return html`<span style="border-radius:999px;border:1px solid ${t.borda};background:${t.fundo};color:${t.cor};padding:1px 10px;font-size:12px;font-weight:${peso};text-align:center">${texto}</span>`;
}

// Texto em pedaços: 'texto' ou ['antes ', { forte: 'negrito' }, ' e ', { mono: '0x…' }].
// { forte } sai em negrito; { mono } na fonte de código (um endereço, por exemplo).
function textoComForte(texto) {
  return [].concat(texto).map((pedaco) => {
    if (typeof pedaco === 'string') return pedaco;
    if (pedaco.mono) {
      return html`<span style="font-family:${MONO};font-size:12px;overflow-wrap:anywhere">${pedaco.mono}</span>`;
    }
    return html`<strong>${pedaco.forte}</strong>`;
  });
}

// ---------------------------------------------------------------------------
// "Para ir mais fundo"
// ---------------------------------------------------------------------------

// O <details> do fim de cada seção, no traço do desenho (marcador nativo à
// esquerda, 14px). O do M1 tem formatos que o secao.js não conhece: lista
// numerada, o selo âmbar "exemplo inventado" no último item e duas listas com
// subtítulo (o tutorial de revogação). Por isso ele é montado aqui.
function criarDetalhe(detalhe) {
  if (!detalhe) return null;
  const TEXTO = 'margin:8px 0 0;font-size:14px;color:#9AA7B4';

  function lista(itens, { ordenada = false, selo = null, margem = '8px 0 0', espaco = true } = {}) {
    const tag = ordenada ? 'ol' : 'ul';
    return criarElemento(
      tag,
      { style: `margin:${margem};padding-left:20px;font-size:14px;color:#9AA7B4;list-style:${ordenada ? 'decimal' : 'disc'}` },
      itens.map((item, i) =>
        criarElemento('li', { style: i > 0 && espaco ? 'margin-top:4px' : null }, [
          ...textoComForte(item),
          // O selo fica no fim do último item, como no desenho.
          selo && i === itens.length - 1 ? ' ' : null,
          selo && i === itens.length - 1
            ? html`<span style="border-radius:999px;border:1px solid rgba(245,158,11,.4);background:rgba(245,158,11,.12);color:#F59E0B;padding:1px 8px;font-size:12px;font-weight:600;white-space:nowrap">${selo}</span>`
            : null,
        ]),
      ),
    );
  }

  return criarElemento('details', { style: 'border-radius:8px;border:1px solid #1F2733;background:#0B0F17;padding:12px 16px' }, [
    criarElemento('summary', { style: 'cursor:pointer;font-size:14px;font-weight:600' }, [
      'Para ir mais fundo: ' + detalhe.titulo,
    ]),
    ...(detalhe.paragrafos ?? []).map((texto) => criarElemento('p', { style: TEXTO }, [texto])),
    detalhe.lista?.length > 0 && lista(detalhe.lista, { ordenada: detalhe.ordenada, selo: detalhe.selo }),
    // Duas listas numeradas, cada uma com o seu subtítulo em negrito.
    ...(detalhe.partes ?? []).flatMap((parte) => [
      criarElemento('p', { style: 'margin:8px 0 0;font-size:14px;font-weight:600' }, [parte.titulo]),
      lista(parte.passos, { ordenada: true, margem: '4px 0 0', espaco: false }),
    ]),
    ...(detalhe.paragrafosFinais ?? []).map((texto) => criarElemento('p', { style: TEXTO }, [texto])),
  ]);
}

// ---------------------------------------------------------------------------
// A seção
// ---------------------------------------------------------------------------

// A "Pergunta rápida" do fim do card: 'q1' → a pergunta 1 do quiz (não grava).
function criarPerguntaRapida(idDaPergunta) {
  const pergunta = PERGUNTAS.find((item) => item.id === idDaPergunta);
  if (!pergunta) return null;
  return montarPerguntaRapida({ id: 'm1-rapida-' + idDaPergunta, pergunta, moduloNome: 'Módulo 1' });
}

function secaoPorId(id) {
  const secao = modulo1.secoes.find((item) => item.id === id);
  if (!secao) throw new Error('Seção "' + id + '" não existe em src/data/modulo1.js');
  return secao;
}

// Um card de seção: `visual` são os nós logo depois da ideia central; `antesDoDetalhe`
// são blocos que o desenho põe entre os parágrafos e o "Para ir mais fundo".
function montarSecao(id, { visual = [], antesDoDetalhe = [] } = {}) {
  const secao = secaoPorId(id);
  const visuais = document.createDocumentFragment();
  visuais.append(...[].concat(visual).filter(Boolean));

  return criarCardDaSecao(secao, {
    // A videoaula da seção, se houver (o dado diz a seção: `videos[...].secao`).
    video: videoDaSecao(modulo1.videos, id),
    visual: visuais,
    omitir: ['detalhe'],
    depois: [...antesDoDetalhe, criarDetalhe(secao.detalhe)].filter(Boolean),
    pergunta: secao.pergunta ? criarPerguntaRapida(secao.pergunta) : null,
  });
}

// Uma lista de passos lado a lado, ligados por "→" (um embaixo do outro no
// celular). `montarPasso(passo, i)` desenha a caixa de cada um.
function criarPassosComSeta({ passos, descricao, montarPasso, setaGrande = false, padding = '4px 8px' }) {
  return html`<ol role="img" aria-label="${descricao}" tabindex="0" class="flex flex-col sm:flex-row" style="list-style:none;margin:0;padding:0;gap:0;align-items:stretch;overflow-x:auto">
    ${passos.map(
      (passo, i) => html`<li class="flex min-w-0 flex-col sm:min-w-[150px] sm:flex-row" style="flex:1 1 0;align-items:stretch">
        ${montarPasso(passo, i)}
        ${i < passos.length - 1 ? seta(padding, setaGrande ? 'font-size:18px' : '') : null}
      </li>`,
    )}
  </ol>`;
}

// ---------------------------------------------------------------------------
// Aba 1 — Fundamentos
// ---------------------------------------------------------------------------

// "A vida de uma transação": 4 passos, cada um com a sua pilha de blocos (o
// roxo é o bloco com a sua transação; os cinzas, os fechados por cima).
function criarConfirmacoes(c) {
  const passos = criarPassosComSeta({
    passos: c.passos,
    descricao: c.descricao,
    montarPasso: (passo, i) => {
      const borda = passo.destaque ? '#22D3EE' : '#1F2733';
      const fundo = passo.destaque ? 'rgba(34,211,238,.06)' : '#141A24';
      const blocos = ['#7C3AED', ...Array(passo.blocosPorCima).fill('#1F2733')];
      return html`<div style="flex:1 1 auto;min-width:0;border-radius:8px;border:1px solid ${borda};background:${fundo};padding:12px 14px;display:flex;flex-direction:column;gap:8px">
        <div style="display:flex;align-items:center;gap:8px"><span aria-hidden="true" style="${MARCADOR}">${i + 1}</span><span style="font-size:14px;font-weight:600">${passo.titulo}</span></div>
        <div aria-hidden="true" style="display:flex;flex-direction:column-reverse;gap:3px;height:76px;justify-content:flex-start">
          ${blocos.map((cor) => html`<span style="height:14px;border-radius:3px;background:${cor}"></span>`)}
        </div>
        <p style="margin:0;font-family:${MONO};font-size:12px;color:#22D3EE">${passo.confirmacoes}</p>
        <p style="margin:0;font-size:13px;color:#9AA7B4">${passo.texto}</p>
      </div>`;
    },
  });

  const amostra = (cor) => html`<span aria-hidden="true" style="width:22px;height:12px;border-radius:3px;background:${cor}"></span>`;
  return html`<figure style="${CAIXA}">
    <p style="${FRASE}">${c.frase}</p>
    ${passos}
    <figcaption style="margin:12px 0 0;display:flex;gap:14px;flex-wrap:wrap;font-size:13px;color:#9AA7B4">
      <span style="display:inline-flex;align-items:center;gap:6px">${amostra('#7C3AED')}${c.legenda.suaTransacao}</span>
      <span style="display:inline-flex;align-items:center;gap:6px">${amostra('#1F2733')}${c.legenda.porCima}</span>
    </figcaption>
  </figure>`;
}

// A anatomia de uma transação no explorador: painéis só com os rótulos, em
// linhas, e a legenda numerada ao lado (embaixo, no celular). No celular os
// painéis de uma linha ficam um embaixo do outro: três lado a lado não cabem
// (o desenho do celular transborda aqui).
//
// A grade de cada linha NÃO pode usar a classe do Tailwind (`sm:grid-cols-3`):
// ela vira `repeat(3, minmax(0,1fr))`, colunas iguais que ignoram o mínimo do
// conteúdo — e o rótulo "Block + confirmações" acaba quebrado no meio da
// palavra. O desenho usa `1fr 1fr 1fr`, onde cada coluna nunca fica menor que o
// seu conteúdo. Como `style=""` não aceita `@media`, a regra entra uma vez numa
// folha de estilo desta tela (o layout continua só em CSS, sem medir a janela).
const ID_DO_ESTILO_DA_TELA = 'omh-estilo-modulo-1';
const CSS_DA_TELA = `
/* A anatomia da transação (aba Fundamentos › "Explorador de blocos"): o desenho
   à esquerda, a legenda numerada ao lado. O desenho usa "1fr 1fr" em qualquer
   largura que não seja a do celular (só o "M1 Celular" empilha). Como as duas
   colunas são 1fr, nenhuma fica menor que o seu conteúdo: a da esquerda para
   nos 342px da linha de três painéis e a legenda fica com o resto — a 1024px
   dá 342px + 264px, as mesmas medidas do desenho.
   O limiar é 700px, e não os 640px de "celular" do resto da tela, porque
   abaixo disso a legenda cairia no mínimo dela (~136px) e passaria a quebrar
   quase palavra por palavra: em duas colunas a 640px a anatomia mede 1.864px
   de altura, contra 1.058px a 700px. Entre 640 e 699px a legenda fica
   embaixo do desenho, como no celular. */
.omh-m1-anatomia { display: grid; grid-template-columns: 1fr; gap: 20px; align-items: start; }
@media (min-width: 700px) {
  .omh-m1-anatomia { grid-template-columns: 1fr 1fr; }
}
/* Cada linha de painéis: um painel por linha no celular; a partir de 640px, uma
   coluna de 1fr por painel, como no desenho. */
.omh-m1-anatomia-linha { display: grid; grid-template-columns: 1fr; gap: 8px; }
@media (min-width: 640px) {
  .omh-m1-anatomia-linha[data-paineis='2'] { grid-template-columns: 1fr 1fr; }
  .omh-m1-anatomia-linha[data-paineis='3'] { grid-template-columns: 1fr 1fr 1fr; }
}
`;

// Põe a folha de estilo da tela no <head> uma vez só.
function garantirEstiloDaTela() {
  if (document.getElementById(ID_DO_ESTILO_DA_TELA)) return;
  document.head.append(criarElemento('style', { id: ID_DO_ESTILO_DA_TELA }, [CSS_DA_TELA]));
}

function criarAnatomiaDaTransacao(a) {
  const numeroDoPainel = {};
  a.itens.forEach((item, i) => {
    numeroDoPainel[item.painel] = i + 1;
  });
  const painelPorId = Object.fromEntries(a.paineis.map((painel) => [painel.id, painel]));

  function painel(id, altura) {
    const p = painelPorId[id];
    const numero = numeroDoPainel[id];
    // Alerta (Status, Value) em âmbar; com número na legenda, borda ciano.
    const borda = p.alerta ? 'rgba(245,158,11,.4)' : numero ? '#22D3EE' : '#1F2733';
    const fundo = p.alerta ? 'rgba(245,158,11,.12)' : numero ? 'rgba(34,211,238,.08)' : 'transparent';
    const cor = numero ? '#E6EDF3' : '#9AA7B4';
    // content-box: a altura mínima do dado é a do conteúdo, sem o padding (como no
    // desenho). No celular os painéis ficam um embaixo do outro, sem altura mínima.
    // Sem `min-width:0` aqui: é ele que deixaria a coluna ficar menor que o
    // rótulo e quebrar "confirmações" no meio da palavra (no desenho o painel
    // também não tem mínimo zerado; quem tem é o <span> do rótulo, abaixo).
    return html`<div class="sm:min-h-[var(--altura)]" style="--altura:${altura}px;box-sizing:content-box;border-radius:6px;border:1px solid ${borda};background:${fundo};padding:8px;display:flex;gap:8px;align-items:flex-start">
      ${numero
        ? html`<span aria-hidden="true" style="flex:0 0 20px;width:20px;height:20px;border-radius:50%;background:#22D3EE;color:#0B0F17;font-family:${MONO};font-size:11px;font-weight:700;display:inline-flex;align-items:center;justify-content:center">${numero}</span>`
        : null}
      <span style="min-width:0;font-family:${MONO};font-size:11.5px;line-height:1.35;color:${cor};overflow-wrap:break-word">${p.rotulo}</span>
    </div>`;
  }

  // O texto que só o leitor de tela ouve: as duas pontas vêm do dado (as
  // palavras do desenho) e a lista dos marcadores é montada aqui, como no
  // desenho, para não repetir o rótulo de cada painel em dois lugares.
  const descricao =
    a.alt.antes + ' ' +
    a.itens.map((item, i) => i + 1 + ' ' + painelPorId[item.painel].rotulo).join('; ') +
    '. ' + a.alt.depois;

  return html`<figure style="${CAIXA}">
    <p style="margin:0 0 4px;font-size:14px;font-weight:600">${a.titulo}</p>
    <p style="margin:0 0 12px;font-size:13px;color:#9AA7B4">${a.descricao}</p>
    <div class="omh-m1-anatomia">
      <div role="img" aria-label="${descricao}" style="border-radius:10px;border:1px solid #1F2733;background:#10151E;padding:14px;display:flex;flex-direction:column;gap:8px">
        ${a.linhas.map(
          (linha) => html`<div class="omh-m1-anatomia-linha" data-paineis="${linha.paineis.length}">
            ${linha.paineis.map((id) => painel(id, linha.altura))}
          </div>`,
        )}
        <p style="margin:4px 0 0;font-size:12px;color:#9AA7B4">${a.aviso}</p>
      </div>
      <ol style="margin:0;padding:0;list-style:none;display:flex;flex-direction:column;gap:10px">
        ${a.itens.map(
          (item, i) => html`<li style="display:flex;gap:10px;align-items:flex-start;font-size:14px">
            <span aria-hidden="true" style="${MARCADOR}">${i + 1}</span>
            <span><strong>${item.titulo}</strong> <span style="color:#9AA7B4">${item.texto}</span></span>
          </li>`,
        )}
      </ol>
    </div>
    <figcaption style="${LEGENDA}">${a.nota}</figcaption>
  </figure>`;
}

// Dois (ou mais) cartões lado a lado para contrastar: Success × Failed, quem tem ×
// quem perde as palavras, revogar resolve × não resolve. `contorno` 'solido' ou
// 'tracejado' troca o cartão tingido por uma borda de 2px sobre o fundo escuro.
function criarContraste(c) {
  return html`<div role="img" aria-label="${c.descricao}" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:12px">
    ${c.cartoes.map((cartao) => {
      const t = tom(cartao.tom);
      const cor = cartao.tom === 'ok' ? '#22C55E' : t.cor;
      let caixa = `border:1px solid ${t.borda};background:${t.fundo}`;
      if (cartao.contorno === 'solido') caixa = 'border:2px solid #22C55E;background:#0B0F17';
      if (cartao.contorno === 'tracejado') caixa = 'border:2px dashed #EF4444;background:#0B0F17';
      const corpo = cartao.itens
        ? html`<ul style="margin:6px 0 0;padding-left:18px;font-size:14px;list-style:disc;${cartao.contorno === 'tracejado' ? 'color:#9AA7B4' : ''}">
            ${cartao.itens.map((item) => html`<li>${item}</li>`)}
          </ul>`
        : html`<p style="margin:6px 0 0;font-size:14px">${textoComForte(cartao.texto)}</p>`;
      return html`<div style="border-radius:8px;${caixa};padding:14px 16px">
        <p style="${MICRO}${cor}">${cartao.rotulo}</p>
        ${corpo}
      </div>`;
    })}
  </div>`;
}

function montarAbaFundamentos() {
  const blockchain = secaoPorId('o-que-e-blockchain');
  const gas = secaoPorId('gas-taxa-de-rede');
  const cexDex = secaoPorId('cex-x-dex');

  return criarElemento('div', { class: 'flex flex-col gap-6' }, [
    montarDestaques(modulo1.destaques.fundamentos),
    montarSecao('o-que-e-blockchain', { visual: criarConfirmacoes(blockchain.confirmacoes) }),
    montarSecao('explorador-de-blocos', { visual: criarAnatomiaDaTransacao(modulo1.anatomias.transacao) }),
    montarSecao('gas-taxa-de-rede', { visual: criarContraste(gas.contraste) }),
    montarSecao('cex-x-dex', { visual: montarComparacaoLadoALado(cexDex.comparacao) }),
  ]);
}

// ---------------------------------------------------------------------------
// Aba 2 — Carteiras
// ---------------------------------------------------------------------------

// Da frase-semente ao endereço: 4 caixas com setas de mão única.
function criarChaves(c) {
  const passos = criarPassosComSeta({
    passos: c.passos,
    descricao: c.descricao,
    setaGrande: true,
    montarPasso: (passo) => {
      const t = tom(passo.tom);
      return html`<div style="flex:1 1 auto;min-width:0;border-radius:8px;border:1px solid ${t.borda};background:${t.fundo};padding:12px 14px">
        <p style="${MICRO}${t.cor}">${passo.etiqueta}</p>
        <p style="margin:4px 0 0;font-size:14px;font-weight:600">${passo.titulo}</p>
        <p style="margin:4px 0 0;font-size:13px;color:#9AA7B4">${passo.texto}</p>
      </div>`;
    },
  });
  return html`<figure style="${CAIXA}">${passos}<figcaption style="${LEGENDA}">${c.legenda}</figcaption></figure>`;
}

// "Para que você vai usar?": a pergunta no topo e 3 ramos (um embaixo do outro
// no celular).
function criarUsoDaCarteira(u) {
  return html`<figure style="${CAIXA}">
    <div role="img" aria-label="${u.descricao}" style="display:flex;flex-direction:column;align-items:center">
      <div style="${NO};border:1px solid #22D3EE;background:rgba(34,211,238,.1);font-weight:600">${u.pergunta}</div>
      ${ligacao(16)}
      <div class="grid grid-cols-1 sm:grid-cols-3" style="gap:12px;width:100%">
        ${u.ramos.map(
          (ramo) => html`<div style="display:flex;flex-direction:column;align-items:center">
            ${pilula(ramo.se)}
            ${ligacao(12)}
            <div style="width:100%;box-sizing:border-box;border-radius:8px;border:1px solid #1F2733;background:#141A24;padding:10px 14px">
              <p style="margin:0;font-size:14px;font-weight:600">${ramo.entao}</p>
              <p style="margin:4px 0 0;font-size:13px;color:#9AA7B4">${ramo.texto}</p>
            </div>
          </div>`,
        )}
      </div>
    </div>
    <figcaption style="${LEGENDA}">${u.legenda}</figcaption>
  </figure>`;
}

function montarAbaCarteiras() {
  const chaves = secaoPorId('chave-publica-privada-endereco');
  const uso = secaoPorId('quando-cada-carteira-faz-sentido');

  return criarElemento('div', { class: 'flex flex-col gap-6' }, [
    montarDestaques(modulo1.destaques.carteiras),
    montarSecao('chave-publica-privada-endereco', { visual: criarChaves(chaves.chaves) }),
    montarSecao('onde-ficam-chaves', { visual: montarComparacaoLadoALado(modulo1.tabelaCarteiras) }),
    montarSecao('quando-cada-carteira-faz-sentido', { visual: criarUsoDaCarteira(uso.usoCarteira) }),
  ]);
}

// ---------------------------------------------------------------------------
// Aba 3 — Seed phrase
// ---------------------------------------------------------------------------

// 12 palavras → a semente → as contas. As casas das palavras ficam em branco de
// propósito: nenhuma frase de exemplo aparece na tela.
function criarSemente(s) {
  const casas = Array.from({ length: s.palavras }, (_, i) => i + 1);
  return html`<figure style="${CAIXA}">
    <div role="img" aria-label="${s.descricao}" style="display:flex;flex-direction:column;align-items:center">
      <div class="grid grid-cols-3 sm:grid-cols-6" style="gap:6px;width:100%;max-width:560px">
        ${casas.map(
          (n) => html`<span style="border-radius:6px;border:1px solid #1F2733;background:#141A24;padding:4px 8px;font-family:${MONO};font-size:12px;color:#9AA7B4;display:flex;gap:6px;align-items:center">
            <span style="color:#22D3EE">${n}</span><span aria-hidden="true" style="flex:1 1 auto;border-bottom:1px dashed #9AA7B4;height:1px"></span>
          </span>`,
        )}
      </div>
      ${ligacao(18)}
      <div style="border-radius:8px;border:1px solid rgba(124,58,237,.6);background:rgba(124,58,237,.15);padding:8px 16px;font-size:14px;font-weight:600">
        ${s.titulo} <span style="font-family:${MONO};font-weight:500;color:#9AA7B4;font-size:12px">${s.bits}</span>
      </div>
      ${ligacao(18)}
      <div class="grid grid-cols-1 sm:grid-cols-3" style="gap:12px;width:100%;max-width:560px">
        ${s.contas.map(
          (conta) => html`<div style="border-radius:8px;border:1px solid #1F2733;background:#141A24;padding:10px 12px;font-size:13px">
            <p style="margin:0;font-weight:600">${conta}</p>
            <p style="margin:4px 0 0;font-family:${MONO};font-size:12px;color:#9AA7B4">${s.textoDaConta.flatMap((linha, i) => (i ? [html`<br>`, linha] : [linha]))}</p>
          </div>`,
        )}
      </div>
    </div>
    <figcaption style="${LEGENDA}">${s.legenda}</figcaption>
  </figure>`;
}

// As 5 formas de perder a frase → a caixa vermelha "O que todas fazem".
function criarFormasDePerder(f) {
  const descricao =
    f.itens.map((item, i) => i + 1 + '. ' + item.titulo + ' ' + item.texto).join(' ') +
    ' ' + f.conclusao.rotulo + ': ' + f.conclusao.texto;
  return html`<figure style="${CAIXA}">
    <p style="${FRASE}">${f.frase}</p>
    <div role="img" aria-label="${descricao}" class="flex flex-col items-stretch sm:flex-row sm:items-center" style="gap:16px">
      <ol style="list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:8px;flex:1 1 auto;min-width:0;width:100%">
        ${f.itens.map(
          (item, i) => html`<li style="display:flex;gap:10px;align-items:flex-start;border-radius:8px;border:1px solid #1F2733;background:#141A24;padding:10px 12px">
            <span aria-hidden="true" style="${MARCADOR}">${i + 1}</span>
            <span style="font-size:14px"><strong>${item.titulo}</strong> <span style="color:#9AA7B4">${item.texto}</span></span>
          </li>`,
        )}
      </ol>
      <span aria-hidden="true" style="flex:0 0 auto;color:#9AA7B4;font-size:20px;padding:0 4px;align-self:center">→</span>
      <div class="w-full sm:w-[240px]" style="flex:0 0 auto;box-sizing:border-box;border-radius:8px;border:1px solid rgba(239,68,68,.5);background:rgba(239,68,68,.12);padding:14px 16px;align-self:center">
        <p style="${MICRO}#F87171">${f.conclusao.rotulo}</p>
        <p style="margin:6px 0 0;font-size:14px;color:#E6EDF3">${f.conclusao.texto}</p>
      </div>
    </div>
  </figure>`;
}

function montarAbaSeed() {
  const seed = secaoPorId('seed-e-carteira');
  const formas = secaoPorId('formas-de-perder-tudo');

  return criarElemento('div', { class: 'flex flex-col gap-6' }, [
    montarDestaques(modulo1.destaques.seed),
    montarSecao('seed-e-carteira', { visual: [criarSemente(seed.semente), criarContraste(seed.contraste)] }),
    montarSecao('formas-de-perder-tudo', { visual: criarFormasDePerder(formas.formas) }),
    criarCard([
      criarElemento('h2', { class: 'text-lg font-semibold' }, [modulo1.checklistSegurancaTitulo]),
      criarElemento('p', { class: 'mt-2 mb-4 text-[14px] text-texto-suave' }, [
        modulo1.checklistSegurancaDescricao,
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
// Aba 4 — Golpes
// ---------------------------------------------------------------------------

// O drainer em 5 passos clicáveis, com "O que a vítima vê" / "O que está de fato
// acontecendo" no painel. Começa aberto no passo 3 (o ponto de virada).
function criarSequenciaDoDrainer(s) {
  const figura = criarSequencia({
    frase: s.frase,
    rotuloDaLista: s.rotuloDaLista,
    atual: s.passoInicial,
    legenda: s.legenda,
    passos: modulo1.roteiroDrainer.map((passo) => ({
      titulo: passo.titulo,
      colunas: [
        { rotulo: s.colunas.oQueVeem, texto: passo.oQueVeem },
        { rotulo: s.colunas.oQueAcontece, texto: passo.oQueAcontece },
      ],
    })),
  });
  marcarPassoDeVirada(figura, s.passoDeVirada);
  // Quem alcança a faixa pelo teclado é o próprio criarSequencia: ele mede a
  // lista e só põe tabindex="0" enquanto ela rola mesmo para o lado. Medido
  // nesta tela: a 1280px (e a 900px) os 5 passos cabem, então a faixa não rola e
  // fica sem o atributo; entre ~640 e ~1024px ela rola e ganha tabindex="0"; a
  // 390px os passos empilham e ela volta a ficar sem. O desenho põe tabindex="0"
  // fixo nas duas larguras — aqui não repetimos isso de propósito: uma parada de
  // Tab numa lista que não rola não leva a lugar nenhum.
  return figura;
}

// No desenho, o passo de virada tem borda vermelha quando não é o passo aberto
// (aberto, ele fica roxo como os outros). criarSequencia ainda não tem essa
// opção, então a borda é pintada aqui, a cada troca de passo.
function marcarPassoDeVirada(figura, indice) {
  const botao = figura.querySelectorAll('[role="tab"]')[indice];
  if (!botao) return;
  const pintar = () => {
    botao.style.borderColor = botao.getAttribute('aria-selected') === 'true' ? '' : 'rgba(239,68,68,.5)';
  };
  pintar();
  new MutationObserver(pintar).observe(botao, { attributes: true, attributeFilter: ['aria-selected'] });
}

// Os três truques: cartões com o nome em mono ciano e, no pé, onde os três terminam.
function criarTruques(t) {
  return html`<div role="img" aria-label="${t.descricao}" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px">
    ${t.itens.map(
      (item) => html`<div style="border-radius:8px;border:1px solid #1F2733;background:#0B0F17;padding:14px 16px;display:flex;flex-direction:column;gap:6px">
        <p style="margin:0;font-family:${MONO};font-size:13px;color:#22D3EE">${item.titulo}</p>
        <p style="margin:0;font-size:14px;color:#9AA7B4">${item.texto}</p>
        <p style="margin:auto 0 0;padding-top:8px;font-size:13px;color:#F87171;font-weight:600">${t.consequencia}</p>
      </div>`,
    )}
  </div>`;
}

// "O endereço quase igual": o mesmo começo e o mesmo fim; só o meio muda.
function criarEnderecosQuaseIguais(e) {
  const estilo = {
    ok: { borda: 'rgba(34,197,94,.5)', fundo: 'rgba(34,197,94,.08)', cor: '#22C55E', meioFundo: 'transparent', meioCor: '#9AA7B4' },
    alerta: { borda: 'rgba(239,68,68,.5)', fundo: 'rgba(239,68,68,.08)', cor: '#F87171', meioFundo: 'rgba(239,68,68,.25)', meioCor: '#F87171' },
  };
  return html`<figure style="${CAIXA}">
    <div style="display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;align-items:baseline">
      <p style="margin:0;font-size:14px;font-weight:600">${e.frase}</p>
      <span style="border-radius:999px;border:1px solid rgba(245,158,11,.4);background:rgba(245,158,11,.12);color:#F59E0B;padding:1px 10px;font-size:12px;font-weight:600">${e.selo}</span>
    </div>
    <div role="img" aria-label="${e.descricao}" style="margin-top:12px;display:flex;flex-direction:column;gap:10px">
      ${e.itens.map((item) => {
        const t = estilo[item.tom] ?? estilo.ok;
        return html`<div style="border-radius:8px;border:1px solid ${t.borda};background:${t.fundo};padding:10px 14px">
          <p style="${MICRO}${t.cor}">${item.rotulo}</p>
          <p style="margin:4px 0 0;font-family:${MONO};font-size:14px;overflow-wrap:anywhere;line-height:1.5"><span>${item.inicio}</span><span style="border-radius:4px;background:${t.meioFundo};color:${t.meioCor};padding:1px 3px">${item.meio}</span><span>${item.fim}</span></p>
        </div>`;
      })}
    </div>
    <figcaption style="${LEGENDA}">${e.legenda}</figcaption>
  </figure>`;
}

// O clipper em 4 passos; o passo em destaque (o golpe) sai em vermelho.
function criarClipper(c) {
  const passos = criarPassosComSeta({
    passos: c.passos,
    descricao: c.descricao,
    padding: '2px 6px',
    montarPasso: (passo, i) => {
      const t = passo.destaque ? tom('alerta') : tom('neutro');
      const cor = passo.destaque ? '#F87171' : '#E6EDF3';
      return html`<div style="flex:1 1 auto;min-width:0;border-radius:8px;border:1px solid ${t.borda};background:${t.fundo};padding:10px 12px;display:flex;gap:10px;align-items:flex-start">
        <span aria-hidden="true" style="${MARCADOR}">${i + 1}</span>
        <span style="min-width:0;font-size:14px;color:${cor};overflow-wrap:break-word">${passo.texto}</span>
      </div>`;
    },
  });
  return html`<figure style="${CAIXA}"><p style="${FRASE}">${c.frase}</p>${passos}</figure>`;
}

function montarAbaGolpes() {
  const drainer = secaoPorId('wallet-drainers-conceito');
  const truques = secaoPorId('vetores-tecnicos');
  const endereco = secaoPorId('address-poisoning-e-clipper');

  return criarElemento('div', { class: 'flex flex-col gap-6' }, [
    montarDestaques(modulo1.destaques.golpes),
    // A animação do drainer entra logo depois dos 5 passos.
    montarSecao('wallet-drainers-conceito', {
      visual: [criarSequenciaDoDrainer(drainer.sequencia), criarAnimacaoDrainer()],
    }),
    montarSecao('vetores-tecnicos', { visual: criarTruques(truques.truques) }),
    // A animação do address poisoning entra logo depois de "O endereço quase igual".
    montarSecao('address-poisoning-e-clipper', {
      visual: [criarEnderecosQuaseIguais(endereco.enderecos), criarAnimacaoEnvenenamento(), criarClipper(endereco.clipper)],
    }),
  ]);
}

// ---------------------------------------------------------------------------
// Aba 5 — Defesa
// ---------------------------------------------------------------------------

// As duas camadas do Permit2 e as duas funções que revogam.
function criarCamadasDoPermit2(c) {
  return html`<figure style="${CAIXA}">
    <div role="img" aria-label="${c.descricao}" style="display:flex;flex-direction:column;align-items:center">
      <div style="${NO};border:1px solid #1F2733;background:#141A24;font-weight:600">${c.inicio}</div>
      ${c.camadas.map((camada) => {
        const t = tom(camada.tom);
        return [
          ligacao(16),
          html`<div style="${NO};border:1px solid ${t.borda};background:${t.fundo};max-width:420px">
            <span style="display:block;font-size:11px;font-weight:600;letter-spacing:.05em;text-transform:uppercase;color:#9AA7B4">${camada.rotulo}</span>${camada.texto}
          </div>`,
        ];
      })}
      ${ligacao(16)}
      <div class="grid grid-cols-1 sm:grid-cols-2" style="gap:12px;width:100%;max-width:520px">
        ${c.funcoes.map(
          (funcao) => html`<div style="border-radius:8px;border:1px solid rgba(34,197,94,.5);background:rgba(34,197,94,.12);padding:10px 14px;font-size:13px">
            <span style="font-family:${MONO};color:#22C55E">${funcao.nome}</span><br>${funcao.texto}
          </div>`,
        )}
      </div>
    </div>
    <figcaption style="${LEGENDA}">${c.legenda}</figcaption>
  </figure>`;
}

// A decisão de emergência: a pergunta, os dois ramos e o nó final comum.
function criarEmergencia(e) {
  const noDoRamo = (texto) =>
    html`<div style="width:100%;box-sizing:border-box;border-radius:8px;border:1px solid #1F2733;background:#141A24;padding:10px 14px;font-size:14px;text-align:center">${texto}</div>`;
  return html`<figure style="${CAIXA}">
    <div role="img" aria-label="${e.descricao}" style="display:flex;flex-direction:column;align-items:center">
      <div style="${NO};border:1px solid #1F2733;background:#141A24;font-weight:600">${e.inicio}</div>
      ${ligacao(16)}
      <div style="${NO};border:1px solid #22D3EE;background:rgba(34,211,238,.1);font-weight:600">${e.pergunta}</div>
      <div class="grid grid-cols-1 sm:grid-cols-2" style="gap:16px;width:100%;max-width:600px">
        ${e.ramos.map(
          (ramo) => html`<div style="display:flex;flex-direction:column;align-items:center">
            ${ligacao(14)}
            ${pilula(ramo.rotulo, ramo.tom)}
            ${ramo.nos.map((texto) => [ligacao(14), noDoRamo(texto)])}
          </div>`,
        )}
      </div>
      ${ligacao(16)}
      <div style="${NO};border:1px solid rgba(34,197,94,.5);background:rgba(34,197,94,.12);font-weight:600">${e.fim}</div>
    </div>
    <figcaption style="${LEGENDA}">${e.legenda}</figcaption>
  </figure>`;
}

// Os 8 passos do plano, com o começo de cada um em negrito.
function criarPassosDaEmergencia(passos) {
  return html`<ol style="margin:0;padding-left:20px;font-size:14px;color:#9AA7B4;display:flex;flex-direction:column;gap:6px;list-style:decimal">
    ${passos.map((passo) => html`<li><strong style="color:#E6EDF3">${passo.forte}</strong> ${passo.texto}</li>`)}
  </ol>`;
}

function montarAbaDefesa() {
  const revogar = secaoPorId('revogar-aprovacoes');
  const permit2 = secaoPorId('duas-camadas-permit2-e-eip7702');
  const emergencia = secaoPorId('plano-de-emergencia');

  return criarElemento('div', { class: 'flex flex-col gap-6' }, [
    montarDestaques(modulo1.destaques.defesa),
    montarSecao('revogar-aprovacoes', { visual: criarContraste(revogar.contraste) }),
    montarSecao('duas-camadas-permit2-e-eip7702', { visual: criarCamadasDoPermit2(permit2.camadas) }),
    montarSecao('plano-de-emergencia', {
      visual: criarEmergencia(emergencia.emergencia),
      antesDoDetalhe: [criarPassosDaEmergencia(emergencia.passos)],
    }),
  ]);
}

// ---------------------------------------------------------------------------
// Aba 6 — Brasil
// ---------------------------------------------------------------------------

// Os 4 golpes comuns no Brasil: o que prometem, a armadilha e o sinal.
function criarGolpesDoBrasil(g) {
  const r = g.rotulos;
  // No texto que só o leitor de tela ouve os rótulos são os de `g.alt` (mais
  // curtos que os da tela), como no desenho.
  const descricao = g.itens
    .map((item) => item.titulo + ' — ' + g.alt.promete + ' ' + item.promete + ' ' + g.alt.armadilha + ' ' + item.armadilha + ' ' + g.alt.sinal + ' ' + item.sinal)
    .join(' ');
  return html`<div role="img" aria-label="${descricao}" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px">
    ${g.itens.map(
      (item) => html`<div style="border-radius:8px;border:1px solid #1F2733;background:#0B0F17;padding:14px 16px;display:flex;flex-direction:column;gap:8px">
        <p style="margin:0;font-size:14px;font-weight:600">${item.titulo}</p>
        <div><p style="${MICRO}#9AA7B4">${r.promete}</p><p style="margin:2px 0 0;font-size:13px">${item.promete}</p></div>
        <div><p style="${MICRO}#9AA7B4">${r.armadilha}</p><p style="margin:2px 0 0;font-size:13px;color:#9AA7B4">${item.armadilha}</p></div>
        <div style="margin-top:auto;border-radius:6px;border:1px solid rgba(239,68,68,.5);background:rgba(239,68,68,.12);padding:6px 10px">
          <p style="${MICRO}#F87171">${r.sinal}</p><p style="margin:2px 0 0;font-size:13px">${item.sinal}</p>
        </div>
      </div>`,
    )}
  </div>`;
}

// A checagem antes de colocar dinheiro: CVM primeiro; se passar, o Banco Central.
function criarChecagemCvmBc(c) {
  const perigo = (tamanho) =>
    html`<div style="width:100%;box-sizing:border-box;border-radius:8px;border:1px solid rgba(239,68,68,.5);background:rgba(239,68,68,.12);padding:${tamanho === 'menor' ? '8px 10px' : '10px 14px'};font-size:${tamanho === 'menor' ? 13 : 14}px;font-weight:600;color:#F87171;text-align:center">${c.perigo}</div>`;
  // Um ramo: traço, pílula, traço e o que vem depois.
  const ramo = (rotulo, nomeDoTom, ...conteudo) =>
    html`<div style="display:flex;flex-direction:column;align-items:center">${ligacao(14)}${pilula(rotulo, nomeDoTom)}${ligacao(14)}${conteudo}</div>`;

  return html`<figure style="${CAIXA}">
    <p style="${FRASE}">${c.frase}</p>
    <div role="img" aria-label="${c.descricao}" style="display:flex;flex-direction:column;align-items:center">
      <div style="${NO};border:1px solid #22D3EE;background:rgba(34,211,238,.1);font-weight:600;max-width:360px">${c.perguntaCvm}</div>
      <div class="grid grid-cols-1 sm:grid-cols-2" style="gap:16px;width:100%;max-width:600px">
        ${ramo(c.sim, 'alerta', perigo())}
        ${ramo(
          c.nao,
          'ok',
          html`<div style="width:100%;box-sizing:border-box;border-radius:8px;border:1px solid #22D3EE;background:rgba(34,211,238,.1);padding:10px 14px;font-size:14px;font-weight:600;text-align:center">${c.perguntaBc}</div>`,
          html`<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;width:100%">
            ${ramo(c.nao, 'alerta', perigo('menor'))}
            ${ramo(
              c.sim,
              'ok',
              html`<div style="width:100%;box-sizing:border-box;border-radius:8px;border:1px solid rgba(34,197,94,.5);background:rgba(34,197,94,.12);padding:8px 10px;font-size:13px;text-align:center">${c.passou}</div>`,
            )}
          </div>`,
        )}
      </div>
    </div>
  </figure>`;
}

// "O que guardar de cada operação": Data, Valor e Taxas.
function criarRegistroDoImposto(r) {
  return html`<figure style="${CAIXA}">
    <p style="${FRASE}">${r.frase}</p>
    <div role="img" aria-label="${r.descricao}" class="grid grid-cols-1 sm:grid-cols-3" style="gap:12px">
      ${r.itens.map(
        (item) => html`<div style="border-radius:8px;border:1px solid #1F2733;background:#141A24;padding:12px 14px">
          <p style="${MICRO}#22D3EE">${item.campo}</p>
          <p style="margin:6px 0 0;font-size:14px;font-weight:600">${item.oQue}</p>
          <p style="margin:4px 0 0;font-size:13px;color:#9AA7B4">${item.detalhe}</p>
        </div>`,
      )}
    </div>
    <figcaption style="${LEGENDA}">${r.legenda}</figcaption>
  </figure>`;
}

// Da venda ao contador, em 4 passos com a cor de cada um.
function criarPassosDoImposto(p) {
  const passos = criarPassosComSeta({
    passos: p.passos,
    descricao: p.descricao,
    padding: '2px 6px',
    montarPasso: (passo, i) => {
      const t = tom(passo.tom);
      return html`<div style="flex:1 1 auto;min-width:0;border-radius:8px;border:1px solid ${t.borda};background:${t.fundo};padding:10px 12px;display:flex;gap:10px;align-items:flex-start">
        <span aria-hidden="true" style="${MARCADOR}">${i + 1}</span>
        <span style="min-width:0;font-size:14px;font-weight:${passo.forte ? 600 : 400};overflow-wrap:break-word">${passo.texto}</span>
      </div>`;
    },
  });
  return html`<figure style="${CAIXA}">${passos}</figure>`;
}

// Os dois caminhos do saque; o último nó de cada um tem a cor do que ele pede.
function criarSaque(s) {
  const no = (item) => {
    const t = item.tom ? tom(item.tom) : tom('neutro');
    return html`<div style="width:100%;box-sizing:border-box;border-radius:8px;border:1px solid ${t.borda};background:${t.fundo};padding:10px 14px;font-size:14px;text-align:center;font-weight:${item.tom ? 600 : 400}">${item.texto}</div>`;
  };
  return html`<figure style="${CAIXA}">
    <div role="img" aria-label="${s.descricao}" style="display:flex;flex-direction:column;align-items:center">
      <div style="${NO};border:1px solid #1F2733;background:#141A24;font-weight:600">${s.inicio}</div>
      ${ligacao(16)}
      <div class="grid grid-cols-1 sm:grid-cols-2" style="gap:16px;width:100%;max-width:600px">
        ${s.caminhos.map(
          (caminho) => html`<div style="display:flex;flex-direction:column;align-items:center">
            ${pilula(caminho.rotulo)}
            ${caminho.nos.map((item) => [ligacao(14), no(item)])}
          </div>`,
        )}
      </div>
    </div>
    <figcaption style="${LEGENDA}">${s.legenda}</figcaption>
  </figure>`;
}

function montarAbaBrasil() {
  const golpes = secaoPorId('golpes-comuns-no-brasil');
  const impostos = secaoPorId('impostos');
  const saque = secaoPorId('sacar-para-reais');
  const cronologia = modulo1.linhaDoTempoRegulacao;

  return criarElemento('div', { class: 'flex flex-col gap-6' }, [
    montarDestaques(modulo1.destaques.brasil),
    montarSecao('golpes-comuns-no-brasil', {
      visual: criarGolpesDoBrasil(golpes.golpes),
      antesDoDetalhe: [criarChecagemCvmBc(golpes.checagem)],
    }),
    montarSecao('cronologia-brasil', {
      visual: montarLinhaDoTempo({
        marcos: cronologia.marcos,
        nota: cronologia.nota,
        legenda: cronologia.legenda,
        caixa: true,
        pxPorMes: 1.2,
      }),
    }),
    montarSecao('impostos', { visual: [criarRegistroDoImposto(impostos.registro), criarPassosDoImposto(impostos.passosDoImposto)] }),
    montarSecao('sacar-para-reais', { visual: criarSaque(saque.saque) }),
  ]);
}

// ---------------------------------------------------------------------------
// Aba 7 — Quiz, "Terminou o módulo?", "O que você leva deste módulo" e fontes
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
      criarElemento('p', { class: 'mt-2 mb-4 text-[14px] text-texto-suave' }, [
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

// "O que você leva deste módulo": o último card antes das fontes, no fim da aba
// Quiz — a decisão do dono para todos os módulos. O desenho do M1 não desenhou
// este card (os outros também não desenham todos), e os sete objetivos vêm do
// dado, `modulo1.objetivos`.
function montarObjetivos() {
  return criarCard([
    criarElemento('h2', { class: 'text-lg font-semibold' }, ['O que você leva deste módulo']),
    criarElemento(
      'ul',
      { class: 'mt-3 list-disc pl-5 text-texto-suave', style: 'display:flex;flex-direction:column;gap:6px' },
      modulo1.objetivos.map((objetivo) => criarElemento('li', {}, [objetivo])),
    ),
  ]);
}

// "Fontes e itens não verificados": recolhido, como no desenho. A lista completa
// das fontes continua aparecendo embaixo dos itens não verificados.
function montarFontesEVerificacao() {
  return criarElemento('details', { class: 'rounded-card border border-borda bg-superficie p-5' }, [
    criarElemento('summary', { style: 'cursor:pointer;font-size:14px;font-weight:600' }, ['Fontes e itens não verificados']),

    modulo1.naoVerificado.length > 0 &&
      criarElemento('h3', { style: 'margin:16px 0 0;font-size:14px;font-weight:600' }, ['Não verificado']),
    modulo1.naoVerificado.length > 0 &&
      criarElemento(
        'ul',
        { style: 'list-style:none;margin:8px 0 0;padding:0;display:flex;flex-direction:column;gap:8px' },
        modulo1.naoVerificado.map((item) =>
          criarElemento(
            'li',
            { style: 'border-radius:8px;border:1px solid rgba(245,158,11,.4);background:rgba(245,158,11,.1);padding:12px;font-size:14px;color:#9AA7B4' },
            [criarElemento('strong', { style: 'color:#E6EDF3' }, [item.titulo + ': ']), item.texto],
          ),
        ),
      ),

    criarElemento('h3', { style: 'margin:16px 0 0;font-size:14px;font-weight:600' }, ['Fontes consultadas']),
    criarElemento(
      'ul',
      { style: 'list-style:none;margin:8px 0 0;padding:0;display:flex;flex-direction:column;gap:4px;font-size:14px;color:#9AA7B4' },
      modulo1.fontes.map((fonte) =>
        criarElemento('li', {}, [fonte.titulo + ' — ' + fonte.url + ' (consulta em ' + fonte.consultadoEm + ')']),
      ),
    ),
  ]);
}

function montarAbaQuiz() {
  return criarElemento('div', { class: 'flex flex-col gap-6' }, [
    // Sem moduloId: o card "Terminou o módulo?" logo abaixo já tem o botão.
    montarQuiz({
      id: modulo1.id,
      titulo: 'Mini-quiz do Módulo 1',
      descricao: 'Dezesseis perguntas. As respostas ficam salvas no navegador.',
      perguntas: PERGUNTAS,
      moduloNome: 'Módulo 1',
    }),
    montarConclusao(),
    montarObjetivos(),
    montarFontesEVerificacao(),
  ]);
}

// ---------------------------------------------------------------------------
// Montagem da página
// ---------------------------------------------------------------------------

// Cabeçalho do desenho: "MÓDULO 1", o título, a frase curta e o "Lembrete" âmbar.
function montarCabecalho() {
  const cabecalho = criarTitulo(modulo1.titulo, { rotulo: 'Módulo 1', subtitulo: modulo1.subtitulo });
  // A coluna do router já separa os blocos por 24px; a margem do cabeçalho dobraria.
  cabecalho.classList.remove('mb-6');
  cabecalho.lastElementChild.style.textWrap = 'pretty';
  cabecalho.append(
    criarElemento(
      'p',
      {
        style:
          'margin:16px 0 0;border-radius:12px;border:1px solid rgba(245,158,11,.4);background:rgba(245,158,11,.12);' +
          'padding:12px 16px;font-size:14px;color:#9AA7B4',
      },
      [criarElemento('strong', { style: 'color:#E6EDF3' }, ['Lembrete: ']), modulo1.lembrete],
    ),
  );
  return cabecalho;
}

const ABAS = [
  { id: 'fundamentos', rotulo: 'Fundamentos', montar: montarAbaFundamentos },
  { id: 'carteiras', rotulo: 'Carteiras', montar: montarAbaCarteiras },
  { id: 'seed', rotulo: 'Seed phrase', montar: montarAbaSeed },
  { id: 'golpes', rotulo: 'Golpes', montar: montarAbaGolpes },
  { id: 'defesa', rotulo: 'Defesa', montar: montarAbaDefesa },
  { id: 'brasil', rotulo: 'Brasil', montar: montarAbaBrasil },
  { id: 'quiz', rotulo: 'Quiz', montar: montarAbaQuiz },
];

export function montarModulo1() {
  garantirEstiloDaTela();
  // O mapa do módulo abre a página: o todo antes das partes. Um ramo por aba
  // (o Quiz também); as folhas curtas vêm de modulo1.mapa.
  const mapa = criarMapaDoModulo({
    mapa: modulo1.mapa,
    abas: ABAS.map(({ id, rotulo }) => ({ id, rotulo })),
    perguntas: modulo1.quiz.length,
    idDasAbas: 'modulo-1',
  });
  // O .omh-mapa-card ainda traz 24px de margem embaixo (custom.css, provisório);
  // aqui a coluna já dá esse espaço.
  mapa.style.marginBottom = '0';

  const abas = criarAbas({ id: 'modulo-1', rotulo: 'Seções do Módulo 1', abas: ABAS });

  // Um fragmento: a coluna do router (.omh-coluna) põe os 24px entre os blocos.
  const pagina = document.createDocumentFragment();
  pagina.append(montarCabecalho(), mapa, abas);
  return pagina;
}
