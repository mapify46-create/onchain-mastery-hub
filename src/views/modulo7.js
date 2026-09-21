// views/modulo7.js — monta a página do Módulo 7 a partir de src/data/modulo7.js.
//
// A página segue o desenho do Claude Design (pesquisa/design/handoff/designs/
// "M7 Desktop.dc.html" e "M7 Celular.dc.html"): cabeçalho com a caixa roxa, o
// mapa "O módulo inteiro numa olhada", as abas e, em cada aba, os destaques e
// depois um card por seção. Cada card tem o título, a ideia central (borda
// ciano), o visual DENTRO do card e o texto que explica a ideia: parágrafos,
// quadro, lista, exemplo resolvido, parágrafos finais e "Para ir mais fundo".
//
// Abas internas (padrão ARIA de tabs, vindo de ui.js):
//   A regra · Tamanho · O diário · A revisão · Números que circulam · Quiz
//
// REGRA DO DONO: este módulo não escreve a regra de ninguém. As cinco partes da
// regra e os nove campos do diário são campos EM BRANCO; os exemplos mostram só a
// forma de uma resposta; e NADA digitado aqui é salvo (sem localStorage, sem
// valor inicial, autocomplete desligado e o formulário não envia).
//
// As cores e medidas são as do desenho (tokens do README do handoff). Os textos
// vêm todos de src/data/modulo7.js; aqui ficam só a montagem e as contas.

import { modulo7 } from '../data/modulo7.js';
import { criarElemento, criarTitulo, criarCard, criarBotao, criarAbas, mostrarToast, html } from '../ui.js';
import { montarQuiz, juntarPorques } from '../components/quiz.js';
import { criarMapaDoModulo, criarGradeDe100 } from '../components/visuais.js';
import { montarDestaques } from '../components/destaques.js';
import { obterEstado, atualizar } from '../store.js';

// ---------------------------------------------------------------------------
// Peças de estilo repetidas (valores do desenho)
// ---------------------------------------------------------------------------

const MONO = "'JetBrains Mono',ui-monospace,monospace";

// A caixa escura em que todo visual fica, dentro do card da seção.
const CAIXA = 'margin:0;border-radius:8px;border:1px solid #1F2733;background:#0B0F17;padding:20px;min-width:0';

// Micro-rótulo em maiúsculas de 11px (a cor vem de quem usa).
const MICRO_11 = 'margin:0;font-size:11px;font-weight:600;letter-spacing:.05em;text-transform:uppercase';

// Duas colunas no computador e uma no celular (cada coluna com pelo menos 280px).
const DUAS_COLUNAS = 'display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr))';

// Os "trios" de estado do desenho: borda + fundo + cor do texto.
const TOM = {
  bom: { borda: 'rgba(34,197,94,.5)', fundo: 'rgba(34,197,94,.12)', cor: '#22C55E' },
  ruim: { borda: 'rgba(239,68,68,.5)', fundo: 'rgba(239,68,68,.12)', cor: '#F87171' },
  atencao: { borda: 'rgba(245,158,11,.4)', fundo: 'rgba(245,158,11,.12)', cor: '#F59E0B' },
  acento: { borda: '#22D3EE', fundo: 'rgba(34,211,238,.1)', cor: '#22D3EE' },
  neutro: { borda: '#1F2733', fundo: '#141A24', cor: '#9AA7B4' },
};

// Cartões de comparação (dois lado a lado): verde e ciano com borda cheia,
// vermelho e cinza com borda tracejada — como no desenho.
const CARTAO_DE_COMPARACAO = {
  bom: { borda: '2px solid #22C55E', fundo: '#0B0F17', cor: '#22C55E' },
  ruim: { borda: '2px dashed #EF4444', fundo: '#0B0F17', cor: '#F87171' },
  neutro: { borda: '2px dashed #9AA7B4', fundo: '#0B0F17', cor: '#9AA7B4' },
  acento: { borda: '2px solid #22D3EE', fundo: 'rgba(34,211,238,.1)', cor: '#22D3EE' },
};

// ---------------------------------------------------------------------------
// Peças comuns
// ---------------------------------------------------------------------------

// Texto em pedaços: 'texto' ou ['antes ', { forte: 'negrito' }, ' depois'].
function textoComForte(texto) {
  return [].concat(texto).map((pedaco) =>
    typeof pedaco === 'string' ? pedaco : html`<strong style="color:#E6EDF3">${pedaco.forte}</strong>`,
  );
}

// Caixa com começo em negrito: { destaque, texto } → "<strong>destaque </strong>texto".
function textoComDestaque(conteudo) {
  if (typeof conteudo === 'string') return conteudo;
  return [html`<strong style="color:#E6EDF3">${conteudo.destaque + ' '}</strong>`, conteudo.texto];
}

// Um parágrafo de texto do card (cinza, 16px).
function criarParagrafo(texto) {
  return html`<p style="margin:0;color:#9AA7B4">${textoComForte(texto)}</p>`;
}

// "Para ir mais fundo": recolhido, com o triângulo nativo do <details>.
function criarDetalhe(detalhe) {
  if (!detalhe) return null;
  return html`<details style="border-radius:8px;border:1px solid #1F2733;background:#0B0F17;padding:12px 16px">
    <summary style="cursor:pointer;font-size:14px;font-weight:600">${'Para ir mais fundo: ' + detalhe.titulo}</summary>
    ${detalhe.paragrafos.map(
      (paragrafo) => html`<p style="margin:8px 0 0;font-size:14px;color:#9AA7B4">${textoComDestaque(paragrafo)}</p>`,
    )}
  </details>`;
}

// Pílula roxa "em branco: você escreve", ao lado do título do card.
function criarEtiquetaEmBranco(texto) {
  return html`<span style="border-radius:999px;border:1px solid rgba(124,58,237,.5);background:rgba(124,58,237,.12);padding:2px 10px;font-size:12px;font-weight:600">${texto}</span>`;
}

// Círculo ciano numerado (marcador de passo do desenho).
function criarMarcador(numero) {
  return html`<span aria-hidden="true" style="flex:0 0 24px;width:24px;height:24px;border-radius:50%;background:#22D3EE;color:#0B0F17;font-family:${MONO};font-size:13px;font-weight:700;display:inline-flex;align-items:center;justify-content:center">${String(numero)}</span>`;
}

// O quadro de uma seção: caixas lado a lado, cada uma com um micro-rótulo e um
// texto. Com `destaque: true` a caixa fica ciano (a ênfase do desenho).
function criarQuadro(itens) {
  if (!itens || itens.length === 0) return null;
  return html`<div style="${DUAS_COLUNAS};gap:12px">
    ${itens.map((item) => {
      const tom = item.destaque ? TOM.acento : TOM.neutro;
      const fundo = item.destaque ? tom.fundo : '#0B0F17';
      return html`<div style="border-radius:8px;border:1px solid ${tom.borda};background:${fundo};padding:14px 16px">
        <p style="${MICRO_11};color:${tom.cor}">${item.rotulo}</p>
        <p style="margin:6px 0 0;font-size:14px;color:#9AA7B4">${textoComForte(item.texto)}</p>
      </div>`;
    })}
  </div>`;
}

// O exemplo resolvido: a conta feita à mão, um passo por linha, com os mesmos
// marcadores numerados das cinco partes da regra.
function criarExemplo(exemplo) {
  if (!exemplo) return null;
  return html`<figure style="${CAIXA}">
    <p style="margin:0;font-size:14px;font-weight:600">${exemplo.titulo ?? 'Exemplo'}</p>
    <ol style="list-style:none;margin:12px 0 0;padding:0;display:flex;flex-direction:column;gap:10px">
      ${(exemplo.passos ?? []).map(
        (passo, i) => html`<li style="display:flex;gap:12px;align-items:flex-start">
          ${criarMarcador(i + 1)}
          <span style="flex:1 1 auto;min-width:0;font-size:14px;color:#9AA7B4">${textoComForte(passo)}</span>
        </li>`,
      )}
    </ol>
  </figure>`;
}

// A lista solta de uma seção (`listaTitulo` + `lista`), numerada quando
// `ordenada` é verdadeiro.
function criarLista(secao) {
  if (!secao.lista || secao.lista.length === 0) return null;
  const itens = secao.lista.map((item) => html`<li style="margin-bottom:6px">${textoComForte(item)}</li>`);
  const estilo = 'margin:0;padding-left:20px;color:#9AA7B4';
  const lista = secao.ordenada
    ? html`<ol style="${estilo}">${itens}</ol>`
    : html`<ul style="${estilo}">${itens}</ul>`;
  if (!secao.listaTitulo) return lista;
  return html`<div>
    <p style="margin:0 0 8px;font-size:14px;font-weight:600">${secao.listaTitulo}</p>
    ${lista}
  </div>`;
}

// Os blocos de texto que vêm DEPOIS dos parágrafos, sempre nesta ordem:
// quadro → lista → exemplo resolvido → parágrafos finais → "Para ir mais fundo".
// Cada aba chama isto no fim dos blocos do card; o que a seção não tiver volta
// como null e some no `filter(Boolean)` de criarSecao.
function criarTextoDaSecao(secao) {
  return [
    criarQuadro(secao.quadro),
    criarLista(secao),
    criarExemplo(secao.exemplo),
    ...(secao.paragrafosFinais ?? []).map(criarParagrafo),
    criarDetalhe(secao.detalhe),
  ];
}

// As perguntas do quiz já com o "Por que a sua não serve" de cada errada.
const PERGUNTAS = juntarPorques(modulo7.quiz, modulo7.porqueErradas);

// Decisão do dono (20/09): nenhuma pergunta aparece nas abas de conteúdo — nem
// a "Antes de ler: o que você acha?" do topo da aba, nem a "Pergunta rápida" do
// fim do card. Todas as perguntas ficam no quiz do fim do módulo (aba Quiz).

// Uma seção pelo id em modulo7.secoes.
function secaoPorId(id) {
  const secao = modulo7.secoes.find((item) => item.id === id);
  if (!secao) throw new Error('Seção "' + id + '" não existe em src/data/modulo7.js');
  return secao;
}

// O card de uma seção, no traço do desenho: título (com a pílula "em branco",
// se houver) → ideia central → os blocos (visual, texto, "Para ir mais fundo").
// Tudo numa coluna com 16px entre as partes.
function criarSecao(secao, blocos = []) {
  const titulo = html`<h2 style="margin:0;font-size:1.125rem;font-weight:600">${secao.titulo}</h2>`;
  const topo = secao.etiqueta
    ? html`<div style="display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;align-items:baseline">${titulo}${criarEtiquetaEmBranco(secao.etiqueta)}</div>`
    : titulo;

  return html`<section style="border-radius:12px;border:1px solid #1F2733;background:#141A24;padding:20px;display:flex;flex-direction:column;gap:16px;min-width:0">
    ${topo}
    ${secao.emUmaFrase ? html`<p style="margin:0;border-left:2px solid #22D3EE;padding-left:12px;font-weight:600;text-wrap:pretty">${secao.emUmaFrase}</p>` : ''}
    ${blocos.filter(Boolean)}
  </section>`;
}

// Dois cartões lado a lado (um embaixo do outro no celular): o micro-rótulo
// colorido, a frase em negrito e, se houver, uma nota cinza.
function criarComparacao(comparacao, espaco = 12) {
  return html`<div role="img" aria-label="${comparacao.descricao}" style="${DUAS_COLUNAS};gap:${espaco}px">
    ${comparacao.cartoes.map((cartao) => {
      const estilo = CARTAO_DE_COMPARACAO[cartao.tom] ?? CARTAO_DE_COMPARACAO.neutro;
      return html`<div style="border-radius:8px;border:${estilo.borda};background:${estilo.fundo};padding:14px 16px">
        <p style="${MICRO_11};color:${estilo.cor}">${cartao.rotulo}</p>
        <p style="margin:6px 0 0;font-size:15px;font-weight:600">${cartao.frase}</p>
        ${cartao.nota ? html`<p style="margin:4px 0 0;font-size:13px;color:#9AA7B4">${cartao.nota}</p>` : ''}
      </div>`;
    })}
  </div>`;
}

// Um campo de texto EM BRANCO (o .omh-campo do desenho): sem valor inicial, sem
// autocompletar e sem nada que grave. O raio vai no style para continuar 6px
// quando o campo recebe foco (a regra geral de foco troca o raio para 4px).
function criarCampoEmBranco(id, placeholder, descritoPor) {
  return criarElemento('input', {
    id,
    type: 'text',
    placeholder,
    autocomplete: 'off',
    'aria-describedby': descritoPor,
    class: 'placeholder:text-texto-suave',
    style:
      'width:100%;box-sizing:border-box;border-radius:6px;border:1px solid #1F2733;background:#10151E;' +
      'color:#E6EDF3;font-family:inherit;font-size:14px;line-height:normal;padding:8px 10px;min-height:44px',
  });
}

// O formulário em branco: não envia nada (nem com Enter).
function criarFormulario(conteudo, estilo) {
  const formulario = html`<form novalidate autocomplete="off" style="${estilo}">${conteudo}</form>`;
  formulario.addEventListener('submit', (evento) => evento.preventDefault());
  return formulario;
}

// ---------------------------------------------------------------------------
// Aba 1 — A regra
// ---------------------------------------------------------------------------

// "Se deu certo / se deu errado": o que a memória diz depois do resultado, e a
// caixa ciano embaixo ("A regra escrita antes é a única versão que não muda").
function criarMemoria(memoria) {
  const descricao =
    memoria.cartoes.map((cartao) => cartao.quando + ': ' + cartao.frase + ' ' + cartao.vies).join(' ') +
    ' ' + memoria.conclusao.destaque;

  return html`<figure style="${CAIXA}">
    <div role="img" aria-label="${descricao}" style="${DUAS_COLUNAS};gap:16px">
      ${memoria.cartoes.map((cartao) => {
        const tom = TOM[cartao.tom] ?? TOM.neutro;
        return html`<div style="border-radius:8px;border:1px solid ${tom.borda};background:${tom.fundo};padding:14px 16px;display:flex;flex-direction:column;gap:8px">
          <p style="${MICRO_11};color:${tom.cor}">${cartao.quando}</p>
          <p style="margin:0;font-size:15px;font-weight:600">${cartao.frase}</p>
          <p style="margin:0;font-size:13px;color:#9AA7B4">${cartao.vies}</p>
        </div>`;
      })}
    </div>
    <div aria-hidden="true" style="display:flex;justify-content:center;margin-top:12px"><span style="color:#9AA7B4">↓</span></div>
    <div style="border-radius:8px;border:1px solid #22D3EE;background:rgba(34,211,238,.1);padding:12px 16px;font-size:14px">${textoComDestaque(memoria.conclusao)}</div>
  </figure>`;
}

// As cinco partes da regra, EM BRANCO: cada parte tem o número, o nome, o que
// ela tem, o campo vazio e um exemplo só da forma (pílula âmbar "exemplo de
// forma"). As partes ficam ligadas por um traço fino.
function criarFormularioDaRegra(secao) {
  const ultima = secao.partes.length - 1;

  const partes = secao.partes.map((parte, i) => {
    const id = 'm7-regra-' + parte.id;
    return html`<div style="display:flex;flex-direction:column">
      <div style="border-radius:8px;border:1px solid #1F2733;background:#141A24;padding:14px 16px;display:flex;gap:12px;align-items:flex-start">
        ${criarMarcador(i + 1)}
        <div style="flex:1 1 auto;min-width:0;display:flex;flex-direction:column;gap:6px">
          <label for="${id}" style="font-size:14px;font-weight:600">${parte.rotulo}</label>
          <p id="${id + '-tem'}" style="margin:0;font-size:13px;color:#9AA7B4">${parte.oQueTem}</p>
          ${criarCampoEmBranco(id, parte.placeholder, id + '-tem ' + id + '-exemplo')}
          <p id="${id + '-exemplo'}" style="margin:0;display:flex;flex-wrap:wrap;gap:8px;align-items:baseline;font-size:13px;color:#9AA7B4"><span style="border-radius:999px;border:1px solid rgba(245,158,11,.4);background:rgba(245,158,11,.12);color:#F59E0B;padding:1px 8px;font-size:11px;font-weight:600;white-space:nowrap">${secao.rotuloDoExemplo}</span>${parte.exemplo}</p>
        </div>
      </div>
      ${i < ultima ? html`<span aria-hidden="true" style="width:2px;height:12px;background:#1F2733;margin-left:35px"></span>` : ''}
    </div>`;
  });

  return criarFormulario(
    [
      ...partes,
      html`<p style="margin:16px 0 0;font-size:13px;color:#9AA7B4">${textoComForte(secao.rodape[0])}</p>`,
      html`<p style="margin:8px 0 0;font-size:13px;color:#9AA7B4">${textoComForte(secao.rodape[1])}</p>`,
    ],
    'margin:0;border-radius:8px;border:1px solid #1F2733;background:#0B0F17;padding:20px;display:flex;flex-direction:column;gap:0;min-width:0',
  );
}

// O ciclo de uma operação, de cima para baixo: começa e termina em roxo (a
// regra é escrita e revista); os dois "Não compro" em vermelho; "passou" e
// "sim" em verde; e a volta "mudança na regra só aqui" em ciano.
function criarCicloDaOperacao(ciclo) {
  const linha = (altura, extra = '') =>
    html`<div aria-hidden="true" style="width:2px;height:${altura}px;background:#9AA7B4;${extra}"></div>`;
  const pilula = (texto, tom) =>
    html`<span style="border-radius:999px;border:1px solid ${tom.borda};background:${tom.fundo};color:${tom.cor};padding:1px 10px;font-size:12px;font-weight:600">${texto}</span>`;
  const caixaRoxa = (texto, extra = '') =>
    html`<div style="border-radius:8px;border:1px solid rgba(124,58,237,.6);background:rgba(124,58,237,.15);padding:10px 16px;font-size:14px;font-weight:600;text-align:center;${extra}">${texto}</div>`;
  const CAIXA_DO_RAMO = 'width:100%;box-sizing:border-box;border-radius:8px;text-align:center';
  const ramo = (conteudo) => html`<div style="display:flex;flex-direction:column;align-items:center">${conteudo}</div>`;

  return html`<figure style="${CAIXA}">
    <div role="img" aria-label="${ciclo.descricao}" style="display:flex;flex-direction:column;align-items:center">
      ${caixaRoxa(ciclo.inicio)}
      ${linha(14)}
      <div style="border-radius:8px;border:1px solid #22D3EE;background:rgba(34,211,238,.1);padding:10px 16px;font-size:14px;font-weight:600;text-align:center;max-width:380px">${ciclo.filtro}</div>
      <div style="${DUAS_COLUNAS};gap:16px;width:100%;max-width:620px">
        ${ramo([
          linha(12),
          pilula(ciclo.reprovou, TOM.ruim),
          linha(12),
          html`<div style="${CAIXA_DO_RAMO};border:1px solid rgba(239,68,68,.5);background:rgba(239,68,68,.12);padding:10px 14px;font-size:14px;color:#F87171;font-weight:600">${ciclo.naoCompro}</div>`,
        ])}
        ${ramo([
          linha(12),
          pilula(ciclo.passou, TOM.bom),
          linha(12),
          html`<div style="${CAIXA_DO_RAMO};border:1px solid #22D3EE;background:rgba(34,211,238,.1);padding:10px 14px;font-size:14px;font-weight:600">${ciclo.gatilho}</div>`,
          html`<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;width:100%">
            ${ramo([
              linha(12),
              pilula(ciclo.nao, TOM.ruim),
              linha(12),
              html`<div style="${CAIXA_DO_RAMO};border:1px solid rgba(239,68,68,.5);background:rgba(239,68,68,.12);padding:8px 10px;font-size:13px;color:#F87171">${ciclo.naoCompro}</div>`,
            ])}
            ${ramo([
              linha(12),
              pilula(ciclo.sim, TOM.bom),
              linha(12),
              html`<div style="${CAIXA_DO_RAMO};border:1px solid #1F2733;background:#141A24;padding:8px 10px;font-size:13px">${ciclo.entrada}</div>`,
            ])}
          </div>`,
        ])}
      </div>
      ${linha(14, 'margin-top:8px')}
      ${ciclo.depois.map((passo) => [
        html`<div style="border-radius:8px;border:1px solid #1F2733;background:#141A24;padding:10px 16px;font-size:14px;text-align:center;max-width:420px">${passo}</div>`,
        linha(14),
      ])}
      ${caixaRoxa(ciclo.revisao, 'max-width:420px')}
      <div style="display:flex;align-items:center;gap:8px;margin-top:8px"><span aria-hidden="true" style="color:#22D3EE;font-size:18px">⇢</span><span style="font-size:13px;color:#22D3EE">${ciclo.volta}</span></div>
    </div>
  </figure>`;
}

function montarAbaRegra() {
  const porQue = secaoPorId('por-que-antes');
  const partes = secaoPorId('cinco-partes');
  const ciclo = secaoPorId('ciclo');
  const saida = secaoPorId('stop-automatico');

  return criarElemento('div', { class: 'flex flex-col gap-6' }, [
    montarDestaques(modulo7.destaques.regra),
    criarSecao(porQue, [
      criarMemoria(porQue.memoria),
      ...porQue.paragrafos.map(criarParagrafo),
      ...criarTextoDaSecao(porQue),
    ]),
    criarSecao(partes, [
      criarFormularioDaRegra(partes),
      ...partes.paragrafos.map(criarParagrafo),
      ...criarTextoDaSecao(partes),
    ]),
    criarSecao(ciclo, [
      criarCicloDaOperacao(ciclo.ciclo),
      ...ciclo.paragrafos.map(criarParagrafo),
      ...criarTextoDaSecao(ciclo),
    ]),
    criarSecao(saida, [
      criarComparacao(saida.comparacao),
      ...saida.paragrafos.map(criarParagrafo),
      ...criarTextoDaSecao(saida),
    ]),
  ]);
}

// ---------------------------------------------------------------------------
// Aba 2 — Tamanho
// ---------------------------------------------------------------------------

// Porcentagem em pt-BR: uma casa decimal abaixo de 10%, nenhuma acima
// (0,59 → "59%"; 0,056 → "5,6%"; 1048575 → "104.857.500%").
function pct(fracao) {
  const valor = fracao * 100;
  return valor.toLocaleString('pt-BR', { maximumFractionDigits: valor < 10 ? 1 : 0 }) + '%';
}

// A conta da calculadora.
//
// Cada posição perdida vai a zero e a fração é recalculada sobre o que sobrou:
// a cada perda você fica com (1 − f) do que tinha. Depois de n perdas sobra
// (1 − f)ⁿ; para voltar ao começo, o que sobrou precisa render 1 ÷ (1 − f)ⁿ − 1.
// `capitais` é o capital depois de cada perda (o primeiro é o capital inteiro).
function calcularSequencia({ fracao, perdas }) {
  const f = fracao / 100;
  const capitais = [];
  for (let i = 0; i <= perdas; i += 1) capitais.push(Math.pow(1 - f, i));
  const sobra = capitais[perdas];
  return { sobra, ganho: 1 / sobra - 1, capitais };
}

// Os passos do exemplo de 10% (100 → 90 → 9): borda, fundo e cor da barrinha.
const COR_DO_PASSO = {
  primaria: { borda: '#1F2733', fundo: '#141A24', barra: '#7C3AED' },
  ruim: { borda: 'rgba(239,68,68,.5)', fundo: 'rgba(239,68,68,.12)', barra: '#EF4444' },
  acento: { borda: '#22D3EE', fundo: 'rgba(34,211,238,.1)', barra: '#22D3EE' },
};

// "O mecanismo, com 10% por posição": três cartões ligados por →, lado a lado no
// computador e um embaixo do outro no celular, com a pílula âmbar "exemplo do
// arquivo, não sugestão de fração".
function criarMecanismo(mecanismo) {
  const ultimo = mecanismo.passos.length - 1;
  return html`<figure style="${CAIXA}">
    <div style="display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;align-items:baseline">
      <p style="margin:0;font-size:14px;font-weight:600">${mecanismo.titulo}</p>
      <span style="border-radius:999px;border:1px solid rgba(245,158,11,.4);background:rgba(245,158,11,.12);color:#F59E0B;padding:1px 10px;font-size:12px;font-weight:600">${mecanismo.etiqueta}</span>
    </div>
    <ol role="img" aria-label="${mecanismo.descricao}" tabindex="0" class="flex flex-col sm:flex-row" style="list-style:none;margin:12px 0 0;padding:0;align-items:stretch;gap:0;overflow-x:auto">
      ${mecanismo.passos.map((passo, i) => {
        const cor = COR_DO_PASSO[passo.tom] ?? COR_DO_PASSO.primaria;
        return html`<li class="flex min-w-0 flex-col sm:min-w-[160px] sm:flex-row" style="flex:1 1 0;align-items:stretch">
          <div style="flex:1 1 auto;min-width:0;border-radius:8px;border:1px solid ${cor.borda};background:${cor.fundo};padding:12px 14px;display:flex;flex-direction:column;gap:8px">
            <p style="${MICRO_11};color:#9AA7B4">${passo.momento}</p>
            <p style="margin:0;font-family:${MONO};font-size:1.5rem;font-weight:700;line-height:1.1;font-variant-numeric:tabular-nums">${passo.capital}</p>
            <p style="margin:0;font-size:13px;color:#9AA7B4">${passo.texto}</p>
            <div aria-hidden="true" style="height:10px;border-radius:3px;background:${cor.barra};width:${passo.barra}%"></div>
          </div>
          ${i < ultimo ? html`<span aria-hidden="true" style="flex:0 0 auto;display:flex;align-items:center;justify-content:center;color:#9AA7B4;padding:2px 6px">→</span>` : ''}
        </li>`;
      })}
    </ol>
  </figure>`;
}

// Um controle deslizante no traço do desenho: rótulo à esquerda, valor em
// JetBrains Mono à direita e o trilho .omh-range (styles/custom.css) embaixo.
// `aoMudar(valor)` roda a cada movimento; `mostrar(valor)` põe o valor na tela.
function criarDeslizante(controle, aoMudar) {
  const id = 'm7-' + controle.id;
  const saida = html`<output for="${id}" style="font-family:${MONO};font-size:14px;font-weight:600"></output>`;
  const entrada = criarElemento('input', {
    id,
    class: 'omh-range',
    type: 'range',
    min: controle.min,
    max: controle.max,
    step: controle.passo,
    style: 'width:100%;margin-top:4px',
  });
  entrada.addEventListener('input', () => aoMudar(Number(entrada.value)));

  function mostrar(valor) {
    entrada.value = String(valor);
    saida.textContent = controle.formatar(valor);
    entrada.setAttribute('aria-valuetext', controle.formatar(valor));
  }

  const bloco = html`<div>
    <div style="display:flex;justify-content:space-between;gap:12px;align-items:baseline">
      <label for="${id}" style="font-size:14px;color:#9AA7B4">${controle.rotulo}</label>
      ${saida}
    </div>
    ${entrada}
  </div>`;
  return { bloco, mostrar };
}

// A calculadora da sequência de perdas: à esquerda os dois controles, os atalhos
// 10% × 25% e a premissa; à direita os dois números e uma barra por perda (a
// primeira roxa, a última vermelha). Nada aqui é gravado.
function criarCalculadoraDaSequencia() {
  const calc = modulo7.calculadoraDeSequencia;
  const [controleDaFracao, controleDasPerdas] = calc.controles;
  const estado = { fracao: controleDaFracao.valor, perdas: controleDasPerdas.valor };

  const fracao = criarDeslizante(controleDaFracao, (valor) => {
    estado.fracao = valor;
    atualizarTela();
  });
  const perdas = criarDeslizante(controleDasPerdas, (valor) => {
    estado.perdas = valor;
    atualizarTela();
  });

  // Atalhos de comparação: põem a fração em 10% ou 25%. Tamanho de toque: 44px no
  // celular e 40px no computador. O raio vai no style (o foco não o troca).
  const atalhos = calc.atalhos.map((atalho) => ({
    atalho,
    botao: criarElemento(
      'button',
      {
        type: 'button',
        style: 'border-radius:8px;color:#E6EDF3;padding:8px 12px;font-size:14px;font-weight:600;cursor:pointer',
        onclick: () => {
          estado.fracao = atalho.valor;
          atualizarTela();
        },
      },
      [atalho.rotulo],
    ),
  }));

  const NUMERO =
    'margin:4px 0 0;font-family:' + MONO + ';font-size:1.75rem;font-weight:700;line-height:1.1;' +
    'font-variant-numeric:tabular-nums;overflow-wrap:anywhere';
  const sobra = html`<p style="${NUMERO}"></p>`;
  const ganho = html`<p style="${NUMERO}"></p>`;
  const barras = html`<div role="img" tabindex="0" style="margin-top:14px;display:flex;align-items:flex-end;gap:4px;height:120px"></div>`;

  function atualizarTela() {
    fracao.mostrar(estado.fracao);
    perdas.mostrar(estado.perdas);

    const conta = calcularSequencia(estado);
    const n = estado.perdas;
    sobra.textContent = pct(conta.sobra);
    ganho.textContent = '+' + pct(conta.ganho);
    // Acima de +100% o ganho fica vermelho (o texto vermelho é sempre #F87171).
    ganho.style.color = conta.ganho > 1 ? '#F87171' : '#E6EDF3';

    barras.replaceChildren(
      ...conta.capitais.map((capital, i) => {
        const cor = i === 0 ? '#7C3AED' : i === n ? '#EF4444' : '#1F2733';
        return html`<div style="flex:1 1 0;min-width:6px;display:flex;flex-direction:column;justify-content:flex-end;height:100%"><span aria-hidden="true" style="display:block;height:${Math.max(1, capital * 100)}%;border-radius:3px 3px 0 0;background:${cor}"></span></div>`;
      }),
    );
    barras.setAttribute(
      'aria-label',
      'Com ' + controleDaFracao.formatar(estado.fracao) + ' do capital em cada posição e ' + n +
        (n === 1 ? ' posição a zero' : ' posições seguidas a zero') + ', sobram ' + pct(conta.sobra) +
        ' do capital, e voltar ao começo exige ganhar ' + pct(conta.ganho) + ' sobre o que sobrou.',
    );

    // O atalho do valor atual fica roxo e com aria-pressed="true".
    atalhos.forEach(({ atalho, botao }) => {
      const ativo = estado.fracao === atalho.valor;
      botao.setAttribute('aria-pressed', String(ativo));
      botao.className =
        'min-h-[44px] sm:min-h-[40px] border transition-colors duration-150 ' +
        (ativo ? 'border-primaria bg-primaria/15' : 'border-borda bg-superficie hover:border-texto-suave');
    });
  }
  atualizarTela();

  const cartaoDoNumero = (rotulo, numero) =>
    html`<div style="min-width:0;border-radius:8px;border:1px solid #1F2733;background:#141A24;padding:12px 14px"><p style="${MICRO_11};color:#9AA7B4">${rotulo}</p>${numero}</div>`;

  return html`<div style="border-radius:8px;border:1px solid #1F2733;background:#0B0F17;padding:20px;${DUAS_COLUNAS};gap:20px;align-items:start;min-width:0">
    <div style="display:flex;flex-direction:column;gap:14px;min-width:0">
      ${fracao.bloco}
      ${perdas.bloco}
      <div role="group" aria-label="${calc.rotuloDosAtalhos}" style="display:flex;flex-wrap:wrap;gap:8px">${atalhos.map((item) => item.botao)}</div>
      <p style="margin:0;font-size:13px;color:#9AA7B4">${calc.nota}</p>
    </div>
    <figure style="margin:0;min-width:0">
      <p style="margin:0 0 10px;font-size:12px;font-weight:600;letter-spacing:.05em;text-transform:uppercase;color:#9AA7B4">${calc.rotuloDoResultado}</p>
      <div aria-live="polite" style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
        ${cartaoDoNumero(calc.rotuloDaSobra, sobra)}
        ${cartaoDoNumero(calc.rotuloDoGanho, ganho)}
      </div>
      ${barras}
      <figcaption style="margin-top:8px;font-size:13px;color:#9AA7B4">${calc.legenda}</figcaption>
    </figure>
  </div>`;
}

// As duas grades de 100 do módulo (ruína e efeito 0,40), com os textos do dado
// e as medidas do desenho: frase de 14px, caixa 16px × 20px, legenda a 10px.
function criarGrade(grade) {
  return criarGradeDe100({ ...grade, tamanhoDaFrase: 14, padding: '16px 20px', espacoDaLegenda: 10 });
}

function montarAbaTamanho() {
  const fracaoFixa = secaoPorId('fracao-fixa');
  const sequencia = secaoPorId('sequencia-de-perdas');
  const ruina = secaoPorId('ruina');

  return criarElemento('div', { class: 'flex flex-col gap-6' }, [
    montarDestaques(modulo7.destaques.tamanho),
    criarSecao(fracaoFixa, [
      criarMecanismo(fracaoFixa.mecanismo),
      ...fracaoFixa.paragrafos.map(criarParagrafo),
      ...criarTextoDaSecao(fracaoFixa),
    ]),
    criarSecao(sequencia, [
      criarCalculadoraDaSequencia(),
      ...sequencia.paragrafos.map(criarParagrafo),
      ...criarTextoDaSecao(sequencia),
    ]),
    criarSecao(ruina, [
      criarGrade(ruina.grade),
      criarComparacao(ruina.comparacao),
      ...ruina.paragrafos.map(criarParagrafo),
      ...criarTextoDaSecao(ruina),
    ]),
  ]);
}

// ---------------------------------------------------------------------------
// Aba 3 — O diário
// ---------------------------------------------------------------------------

// A pílula de tipo de cada campo: Comportamento em ciano, Resultado em âmbar.
const COR_DO_TIPO = {
  Comportamento: { borda: 'rgba(34,211,238,.5)', fundo: 'rgba(34,211,238,.1)', cor: '#22D3EE' },
  Resultado: TOM.atencao,
};

// Os nove campos do diário, EM BRANCO. O campo 7 (a saída executada) fica em
// destaque ciano: é ele que torna o "segui a regra?" verificável.
function criarFormularioDoDiario(secao) {
  const campos = secao.campos.map((campo, i) => {
    const numero = i + 1;
    const id = 'm7-diario-' + numero;
    const tipo = COR_DO_TIPO[campo.tipo] ?? COR_DO_TIPO.Comportamento;
    const borda = campo.destaque ? '#22D3EE' : '#1F2733';
    const fundo = campo.destaque ? 'rgba(34,211,238,.06)' : '#141A24';
    const marcaFundo = campo.destaque ? '#22D3EE' : '#1F2733';
    const marcaCor = campo.destaque ? '#0B0F17' : '#E6EDF3';

    return html`<div style="border-radius:8px;border:1px solid ${borda};background:${fundo};padding:12px 14px;display:flex;flex-direction:column;gap:6px">
      <div style="display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;align-items:baseline">
        <label for="${id}" style="font-size:14px;font-weight:600"><span aria-hidden="true" style="display:inline-flex;width:22px;height:22px;border-radius:50%;background:${marcaFundo};color:${marcaCor};font-family:${MONO};font-size:12px;font-weight:700;align-items:center;justify-content:center;margin-right:8px">${String(numero)}</span><span class="sr-only">${'Campo ' + numero + ': '}</span>${campo.titulo}</label>
        <span id="${id + '-tipo'}" style="border-radius:999px;border:1px solid ${tipo.borda};background:${tipo.fundo};color:${tipo.cor};padding:1px 10px;font-size:12px;font-weight:600;white-space:nowrap">${campo.tipo}</span>
      </div>
      ${criarCampoEmBranco(id, campo.placeholder, id + '-tipo ' + id + '-porque')}
      <p id="${id + '-porque'}" style="margin:0;font-size:13px;color:#9AA7B4">${campo.porque}</p>
    </div>`;
  });

  return criarFormulario(
    [...campos, html`<p style="margin:4px 0 0;font-size:13px;color:#9AA7B4">${secao.rodape}</p>`],
    'margin:0;border-radius:8px;border:1px solid #1F2733;background:#0B0F17;padding:20px;display:flex;flex-direction:column;gap:12px;min-width:0',
  );
}

function montarAbaDiario() {
  const oQueFaz = secaoPorId('duas-frases');
  const campos = secaoPorId('nove-campos');

  return criarElemento('div', { class: 'flex flex-col gap-6' }, [
    montarDestaques(modulo7.destaques.diario),
    criarSecao(oQueFaz, [
      criarComparacao(oQueFaz.comparacao),
      criarGrade(oQueFaz.grade),
      ...oQueFaz.paragrafos.map(criarParagrafo),
      ...criarTextoDaSecao(oQueFaz),
    ]),
    criarSecao(campos, [
      criarFormularioDoDiario(campos),
      ...campos.paragrafos.map(criarParagrafo),
      ...criarTextoDaSecao(campos),
    ]),
  ]);
}

// ---------------------------------------------------------------------------
// Aba 4 — A revisão
// ---------------------------------------------------------------------------

// "A pergunta da revisão": não pergunte × pergunte, e os cinco vieses em cartões.
function criarPerguntaDaRevisao(aPergunta) {
  return html`<figure style="${CAIXA}">
    <p style="margin:0 0 12px;font-size:14px;font-weight:600">${aPergunta.titulo}</p>
    ${criarComparacao(aPergunta.comparacao, 16)}
    <ul style="margin:16px 0 0;padding:0;list-style:none;display:flex;flex-direction:column;gap:8px">
      ${aPergunta.vieses.map(
        (vies) => html`<li style="border-radius:8px;border:1px solid #1F2733;background:#141A24;padding:10px 14px;font-size:14px"><strong style="color:#E6EDF3">${vies.nome + ': '}</strong><span style="color:#9AA7B4">${vies.texto}</span></li>`,
      )}
    </ul>
  </figure>`;
}

// As barras da amostra, todas na mesma escala (0 a 1.600): o 30 tracejado em
// cinza, o 400 roxo e o 1.600 ciano. São CONTAS de Lo (2002), não medições.
const ESTILO_DA_BARRA = {
  neutro: { cor: '#9AA7B4', fundo: 'transparent', borda: '2px dashed #9AA7B4' },
  primaria: { cor: '#E6EDF3', fundo: '#7C3AED', borda: '0' },
  acento: { cor: '#E6EDF3', fundo: '#22D3EE', borda: '0' },
};

function criarBarrasDaAmostra(barras) {
  return html`<figure style="margin:0;border-radius:8px;border:1px solid #1F2733;background:#0B0F17;padding:16px 20px;min-width:0">
    <p style="margin:0 0 12px;font-size:14px;font-weight:600">${barras.titulo}</p>
    <div role="img" aria-label="${barras.descricao}" style="display:flex;flex-direction:column;gap:16px">
      ${barras.itens.map((item) => {
        const estilo = ESTILO_DA_BARRA[item.tom] ?? ESTILO_DA_BARRA.primaria;
        const largura = ((item.valor / barras.maximo) * 100).toFixed(3);
        return html`<div>
          <div style="display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;align-items:baseline"><span style="font-size:14px">${item.rotulo}</span><span style="font-family:${MONO};font-size:14px;font-weight:600;color:${estilo.cor}">${item.valorTexto}</span></div>
          <div style="margin-top:6px;height:24px;display:flex;align-items:stretch"><div style="width:${largura}%;background:${estilo.fundo};border-radius:4px;border:${estilo.borda};box-sizing:border-box"></div></div>
          <p style="margin:4px 0 0;font-size:13px;color:#9AA7B4">${item.nota}</p>
        </div>`;
      })}
    </div>
    <figcaption style="margin-top:12px;font-size:13px;color:#9AA7B4">${barras.legenda}</figcaption>
  </figure>`;
}

function montarAbaRevisao() {
  const olharPouco = secaoPorId('olhar-pouco');
  const amostra = secaoPorId('amostra');

  return criarElemento('div', { class: 'flex flex-col gap-6' }, [
    montarDestaques(modulo7.destaques.revisao),
    criarSecao(olharPouco, [
      criarComparacao(olharPouco.comparacao),
      ...olharPouco.paragrafos.map(criarParagrafo),
      criarPerguntaDaRevisao(olharPouco.aPergunta),
      ...criarTextoDaSecao(olharPouco),
    ]),
    criarSecao(amostra, [
      criarBarrasDaAmostra(amostra.barras),
      ...amostra.paragrafos.map(criarParagrafo),
      ...criarTextoDaSecao(amostra),
    ]),
  ]);
}

// ---------------------------------------------------------------------------
// Aba 5 — Números que circulam
// ---------------------------------------------------------------------------

// Os números que circulam, em duas colunas: cada cartão com "O que dizem"
// (vermelho), "Tem fonte?" e "O que a evidência mostra" (verde, colado embaixo).
function criarMitos(secao) {
  const rotulos = secao.rotulos;
  return html`<div style="${DUAS_COLUNAS};gap:16px">
    ${secao.itens.map(
      (mito) => html`<article style="border-radius:8px;border:1px solid #1F2733;background:#0B0F17;padding:16px;display:flex;flex-direction:column;gap:10px;min-width:0">
        <div style="border-radius:6px;border:1px solid rgba(239,68,68,.5);background:rgba(239,68,68,.12);padding:10px 12px"><p style="${MICRO_11};color:#F87171">${rotulos.dizem}</p><p style="margin:4px 0 0;font-size:14px">${mito.titulo}</p></div>
        <div><p style="${MICRO_11};color:#9AA7B4">${rotulos.fonte}</p><p style="margin:2px 0 0;font-size:14px;color:#9AA7B4">${mito.fonte}</p></div>
        <div style="margin-top:auto;border-radius:6px;border:1px solid rgba(34,197,94,.5);background:rgba(34,197,94,.12);padding:10px 12px"><p style="${MICRO_11};color:#22C55E">${rotulos.evidencia}</p><p style="margin:4px 0 0;font-size:14px">${mito.real}</p></div>
      </article>`,
    )}
  </div>`;
}

function montarAbaMitos() {
  const mitos = secaoPorId('mitos');

  return criarElemento('div', { class: 'flex flex-col gap-6' }, [
    montarDestaques(modulo7.destaques.mitos),
    criarSecao(mitos, [
      criarMitos(mitos),
      ...mitos.paragrafos.map(criarParagrafo),
      ...criarTextoDaSecao(mitos),
    ]),
  ]);
}

// ---------------------------------------------------------------------------
// Aba 6 — Quiz, "Terminou o módulo?", fontes e "O que você leva deste módulo"
// ---------------------------------------------------------------------------
function montarConclusao() {
  const container = criarCard([]);

  function estaConcluido() {
    return (obterEstado().modulosConcluidos ?? []).includes(modulo7.id);
  }

  function alternar() {
    const concluido = estaConcluido();
    const salvou = atualizar((estado) => {
      const lista = new Set(estado.modulosConcluidos ?? []);
      if (concluido) lista.delete(modulo7.id);
      else lista.add(modulo7.id);
      return { ...estado, modulosConcluidos: [...lista] };
    });

    renderizar();
    if (!salvou) mostrarToast('Não consegui salvar o progresso');
    else mostrarToast(concluido ? 'Módulo desmarcado' : 'Módulo 7 concluído. Progresso salvo');
  }

  function renderizar() {
    const concluido = estaConcluido();
    container.replaceChildren(
      criarElemento('h2', { class: 'text-lg font-semibold' }, ['Terminou o módulo?']),
      criarElemento('p', { class: 'mt-2 mb-4 text-[14px] text-texto-suave' }, [
        concluido
          ? 'Módulo 7 marcado como concluído. Ele conta na barra de progresso do topo.'
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

// "Fontes e itens não verificados": recolhido, como no desenho. A lista completa
// das fontes continua aparecendo embaixo dos itens não verificados.
function montarFontesEVerificacao() {
  return criarElemento('details', { class: 'rounded-card border border-borda bg-superficie p-5' }, [
    criarElemento('summary', { style: 'cursor:pointer;font-size:14px;font-weight:600' }, ['Fontes e itens não verificados']),
    criarElemento('h3', { style: 'margin:16px 0 0;font-size:14px;font-weight:600' }, ['Não verificado']),
    criarElemento(
      'ul',
      { style: 'list-style:none;margin:8px 0 0;padding:0;display:flex;flex-direction:column;gap:8px' },
      modulo7.naoVerificado.map((item) =>
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
      modulo7.fontes.map((fonte) =>
        criarElemento('li', {}, [fonte.titulo + ' — ' + fonte.url + ' (consulta em ' + fonte.consultadoEm + ')']),
      ),
    ),
  ]);
}

// "O que você leva deste módulo": no fim da aba Quiz, como no desenho.
function montarObjetivos() {
  return criarCard([
    criarElemento('h2', { class: 'text-lg font-semibold' }, ['O que você leva deste módulo']),
    criarElemento(
      'ul',
      { class: 'mt-3 list-disc pl-5 text-texto-suave', style: 'display:flex;flex-direction:column;gap:6px' },
      modulo7.objetivos.map((objetivo) => criarElemento('li', {}, [objetivo])),
    ),
  ]);
}

// "Oito perguntas." — o número por extenso, como no desenho.
const POR_EXTENSO = ['Nenhuma', 'Uma', 'Duas', 'Três', 'Quatro', 'Cinco', 'Seis', 'Sete', 'Oito', 'Nove', 'Dez'];

function contarPerguntas(quantidade) {
  const numero = POR_EXTENSO[quantidade] ?? String(quantidade);
  return numero + (quantidade === 1 ? ' pergunta.' : ' perguntas.');
}

function montarAbaQuiz() {
  return criarElemento('div', { class: 'flex flex-col gap-6' }, [
    // Corrigido por pergunta (tela 34). Sem `moduloId`: o card "Terminou o
    // módulo?" continua separado, logo abaixo, como no desenho.
    montarQuiz({
      id: modulo7.id,
      titulo: 'Mini-quiz do Módulo 7',
      descricao: contarPerguntas(PERGUNTAS.length) + ' As respostas ficam salvas no navegador.',
      perguntas: PERGUNTAS,
      moduloNome: 'Módulo 7',
    }),
    montarConclusao(),
    montarFontesEVerificacao(),
    montarObjetivos(),
  ]);
}

// ---------------------------------------------------------------------------
// Montagem da página
// ---------------------------------------------------------------------------

// Cabeçalho do desenho: "MÓDULO 7", o título, a frase curta e a caixa roxa
// "Este módulo não escreve a sua regra."
function montarCabecalho() {
  const cabecalho = criarTitulo(modulo7.titulo, { rotulo: 'Módulo 7', subtitulo: modulo7.subtitulo });
  // A coluna do router já separa os blocos por 24px; a margem do cabeçalho dobraria.
  cabecalho.classList.remove('mb-6');
  cabecalho.lastElementChild.style.textWrap = 'pretty';
  cabecalho.append(
    html`<p style="margin:16px 0 0;border-radius:12px;border:1px solid rgba(124,58,237,.6);background:rgba(124,58,237,.15);padding:12px 16px;font-size:14px">${textoComDestaque(modulo7.avisoDoCabecalho)}</p>`,
  );
  return cabecalho;
}

const ABAS = [
  { id: 'regra', rotulo: 'A regra', montar: montarAbaRegra },
  { id: 'tamanho', rotulo: 'Tamanho', montar: montarAbaTamanho },
  { id: 'diario', rotulo: 'O diário', montar: montarAbaDiario },
  { id: 'revisao', rotulo: 'A revisão', montar: montarAbaRevisao },
  { id: 'mitos', rotulo: 'Números que circulam', montar: montarAbaMitos },
  { id: 'quiz', rotulo: 'Quiz', montar: montarAbaQuiz },
];

export function montarModulo7() {
  // O mapa do módulo abre a página: o todo antes das partes. Um ramo por aba
  // (o Quiz também); as folhas curtas vêm de modulo7.mapa. O ramo da aba aberta
  // fica roxo.
  const mapa = criarMapaDoModulo({
    mapa: modulo7.mapa,
    abas: ABAS.map(({ id, rotulo }) => ({ id, rotulo })),
    perguntas: modulo7.quiz.length,
    idDasAbas: 'modulo-7',
  });
  // O .omh-mapa-card ainda traz 24px de margem embaixo (custom.css, provisório);
  // aqui a coluna já dá esse espaço.
  mapa.style.marginBottom = '0';

  const abas = criarAbas({ id: 'modulo-7', rotulo: 'Seções do Módulo 7', abas: ABAS });

  // Um fragmento: a coluna do router (.omh-coluna) põe os 24px entre os blocos.
  const pagina = document.createDocumentFragment();
  pagina.append(montarCabecalho(), mapa, abas);
  return pagina;
}
