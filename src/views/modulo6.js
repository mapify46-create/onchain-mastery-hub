// views/modulo6.js — monta a página do Módulo 6 (Ler a tela) a partir de
// src/data/modulo6.js.
//
// A página segue o desenho do Claude Design (pesquisa/design/handoff/designs/
// "M6 Desktop.dc.html" e "M6 Celular.dc.html"): cabeçalho (com o "Lembrete"
// âmbar), o mapa "O módulo inteiro numa olhada", as abas e, em cada aba, os
// destaques, os termos e um card por seção. Cada card tem o título, a ideia
// central (borda ciano), o visual DENTRO do card, as frases, o "Para ir mais
// fundo" e, quando o desenho pede, a "Pergunta rápida" no fim.
//
// Abas internas (padrão ARIA de tabs, vindo de ui.js):
//   Os números · Volume falso · O contrato · Prever o golpe · Quiz
//
// Blocos de didática que só o app tinha e o dono decidiu manter (18/09/2026):
// "Antes de ler" no topo das quatro abas de conteúdo e "Parte X de N" com
// "Continuar" nas abas Os números e O contrato (perguntas e nomes das partes em
// src/data/modulo6.js: perguntaAntes, partes). O "Confira antes de seguir" não
// entra no M6: as três perguntas que ele fazia (q2, q4, q7) são, no desenho, a
// "Pergunta rápida" do card que fecha a mesma parte — a mesma pergunta
// apareceria duas vezes seguidas.
//
// As cores e medidas são as do desenho (tokens do README do handoff). Os textos
// vêm todos de src/data/modulo6.js; aqui ficam só a montagem e as contas.

import { modulo6 } from '../data/modulo6.js';
import { criarElemento, criarTitulo, criarCard, criarBotao, criarAbas, mostrarToast, html } from '../ui.js';
import { criarCardDaSecao } from '../components/secao.js';
import { montarQuiz, montarPerguntaRapida, juntarPorques } from '../components/quiz.js';
import { montarSegmentos, montarPerguntaPrevia, montarTermos } from '../components/didatica.js';
import { montarDestaques } from '../components/destaques.js';
import { criarMapaDoModulo, criarBarrasNaMesmaEscala, criarCurvaDeSaida, criarGradeDe100 } from '../components/visuais.js';
import { criarFluxograma, criarFluxoLinear } from '../components/fluxograma.js';
import { criarAnimacaoPool } from '../components/animacoes.js';
import { obterEstado, atualizar } from '../store.js';

// ---------------------------------------------------------------------------
// Peças comuns
// ---------------------------------------------------------------------------

const MONO = "'JetBrains Mono',ui-monospace,monospace";

// Os "trios" de estado do desenho: borda, fundo e a cor do texto ou do rótulo.
// Texto vermelho é sempre #F87171 (o #EF4444 só pinta borda, fundo e barra).
const TRIO = {
  bom: { borda: 'rgba(34,197,94,.5)', fundo: 'rgba(34,197,94,.12)', cor: '#22C55E' },
  alerta: { borda: 'rgba(245,158,11,.4)', fundo: 'rgba(245,158,11,.12)', cor: '#F59E0B' },
  ruim: { borda: 'rgba(239,68,68,.5)', fundo: 'rgba(239,68,68,.12)', cor: '#F87171' },
};

// Micro-rótulo em maiúsculas de 11px (o dos cartões do desenho). A cor vem de fora.
const MICRO = 'margin:0;font-size:11px;font-weight:600;letter-spacing:.05em;text-transform:uppercase';

// A caixa escura em que todo visual fica, dentro do card da seção. O padding vem
// de fora (16px 20px ou 20px, como no desenho).
const CAIXA = 'margin:0;border-radius:8px;border:1px solid #1F2733;background:#0B0F17;min-width:0;padding:';

// A listra ciana diagonal: "a parte que interessa" das barras do desenho.
const LISTRADO = 'repeating-linear-gradient(135deg,#22D3EE 0 3px,transparent 3px 6px)';

// Uma seção do arquivo de dados, pelo id.
function secao(id) {
  return modulo6.secoes.find((item) => item.id === id);
}

// As perguntas do quiz já com o "Por que a sua não serve" de cada errada.
const PERGUNTAS = juntarPorques(modulo6.quiz, modulo6.porqueErradas);
function perguntaDoQuiz(id) {
  return PERGUNTAS.find((pergunta) => pergunta.id === id);
}

// A "Pergunta rápida" do fim de um card: a pergunta `id` do quiz do módulo.
// Não grava nada e não conta no Início (é só para conferir a leitura).
function criarPerguntaRapida(id) {
  return montarPerguntaRapida({ id: 'm6-rapida-' + id, pergunta: perguntaDoQuiz(id), moduloNome: 'Módulo 6' });
}

// "Antes de ler: o que você acha?" — a pergunta do quiz no topo de uma aba.
function criarPerguntaAntes(idDaAba) {
  const id = modulo6.perguntaAntes?.[idDaAba];
  return id ? montarPerguntaPrevia({ id: modulo6.id, pergunta: perguntaDoQuiz(id) }) : null;
}

// O card de uma seção: título, ideia central (borda ciano) e os blocos na ordem
// do desenho, com 16px entre eles; a "Pergunta rápida" fecha o card quando a
// seção tem uma (campo perguntaRapida).
function criarSecao(dados, blocos) {
  return criarCardDaSecao(
    { titulo: dados.titulo, emUmaFrase: dados.emUmaFrase },
    { depois: blocos, pergunta: dados.perguntaRapida ? criarPerguntaRapida(dados.perguntaRapida) : null },
  );
}

// Uma coluna de blocos com 24px entre eles (o painel de cada aba no desenho).
function criarColuna(nos) {
  return criarElemento('div', { class: 'flex flex-col gap-6' }, nos);
}

// Um parágrafo do card (cinza, 16px). Aceita texto ou uma lista de pedaços, em
// que { numero: '36,5%' } sai em fonte mono e branca, como no desenho.
function criarParagrafo(texto) {
  const pedacos = [].concat(texto).map((pedaco) =>
    typeof pedaco === 'string' ? pedaco : html`<span style="${'font-family:' + MONO + ';color:#E6EDF3'}">${pedaco.numero}</span>`,
  );
  return criarElemento('p', { style: 'margin:0;color:#9AA7B4' }, pedacos);
}

// Os parágrafos de uma lista (ou nada, se a lista não existir).
function criarParagrafos(lista) {
  return (lista ?? []).map(criarParagrafo);
}

// Uma lista com marcador (bolinha), 14px cinza, 4px entre os itens.
function criarListaComMarcador(itens, cor = '#9AA7B4', recuo = 20) {
  return html`<ul style="${'margin:8px 0 0;padding-left:' + recuo + 'px;font-size:14px;color:' + cor + ';list-style:disc'}">
    ${itens.map((item, i) => html`<li style="${i ? 'margin-top:4px' : ''}">${item}</li>`)}
  </ul>`;
}

// "Para ir mais fundo": recolhido, com o triângulo nativo do <details>. O
// conteúdo pode ser parágrafos, uma lista ou `blocos` (parágrafos que abrem com
// um título curto em negrito, como no dev dump).
function criarParaIrMaisFundo(detalhe) {
  if (!detalhe) return null;
  const PARAGRAFO = 'margin:8px 0 0;font-size:14px;color:#9AA7B4';
  return html`<details style="border-radius:8px;border:1px solid #1F2733;background:#0B0F17;padding:12px 16px">
    <summary style="cursor:pointer;font-size:14px;font-weight:600">${'Para ir mais fundo: ' + detalhe.titulo}</summary>
    ${(detalhe.paragrafos ?? []).map((texto) => html`<p style="${PARAGRAFO}">${texto}</p>`)}
    ${detalhe.lista?.length ? criarListaComMarcador(detalhe.lista) : null}
    ${(detalhe.blocos ?? []).map((bloco) => html`<p style="${PARAGRAFO}"><strong style="color:#E6EDF3">${bloco.titulo}</strong> ${bloco.texto}</p>`)}
  </details>`;
}

// Círculo ciano numerado (o marcador de passo do desenho).
function criarMarcador(numero) {
  return html`<span aria-hidden="true" style="${'flex:0 0 24px;width:24px;height:24px;border-radius:50%;background:#22D3EE;color:#0B0F17;font-family:' + MONO + ';font-size:13px;font-weight:700;display:inline-flex;align-items:center;justify-content:center'}">${String(numero)}</span>`;
}

// Selo em pílula (ex.: "de graça" em verde, "Sinal fraco" em vermelho).
function criarSelo(texto, tom, extra = '') {
  const trio = TRIO[tom] ?? TRIO.alerta;
  return html`<span style="${'border-radius:999px;border:1px solid ' + trio.borda + ';background:' + trio.fundo + ';color:' + trio.cor + ';padding:1px 10px;font-size:12px;font-weight:600' + extra}">${texto}</span>`;
}

// Passos lado a lado com uma seta → entre eles; no celular (menos de 640px),
// um embaixo do outro, com a seta no meio — como no desenho. `tag` é 'span'
// (passos soltos, com a seta de no mínimo 24px) ou 'li' (passos de uma lista
// <ol>, com a seta só do tamanho do caractere, como no dev dump do desenho).
function comSetasEntre(passos, tag = 'span') {
  const larguraMinima = tag === 'span' ? ';min-width:24px;box-sizing:content-box' : '';
  const partes = [];
  passos.forEach((passo, i) => {
    if (i) {
      partes.push(
        criarElemento(
          tag,
          {
            'aria-hidden': 'true',
            style: 'flex:0 0 auto;display:flex;align-items:center;justify-content:center;color:#9AA7B4;padding:4px 8px' + larguraMinima,
          },
          ['→'],
        ),
      );
    }
    partes.push(passo);
  });
  return partes;
}

// ---------------------------------------------------------------------------
// Aba 1 — Os números
// ---------------------------------------------------------------------------

// 1A. Market cap × liquidez: as barras do exemplo inventado (dentro do card),
// as três caixas (a da liquidez em ciano), as frases e o "Para ir mais fundo".
function montarTresNumeros() {
  const dados = secao('tres-numeros');
  return criarSecao(dados, [
    criarBarrasNaMesmaEscala(dados.barras),
    criarQuadro(dados.quadro),
    ...criarParagrafos(dados.paragrafos),
    criarParaIrMaisFundo(dados.detalhe),
  ]);
}

// As caixas lado a lado (1A): título branco e texto cinza. A caixa em destaque
// (a resposta que importa) fica com a borda ciano.
function criarQuadro(itens = []) {
  return html`<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px">
    ${itens.map((item) => html`<div style="${'border-radius:8px;padding:12px 14px;' + (item.destaque ? 'border:1px solid #22D3EE;background:rgba(34,211,238,.1)' : 'border:1px solid #1F2733;background:#0B0F17')}">
      <p style="margin:0;font-size:14px;font-weight:600">${item.rotulo}</p>
      <p style="margin:4px 0 0;font-size:14px;color:#9AA7B4">${item.texto}</p>
    </div>`)}
  </div>`;
}

// 1B. Quanto dá para vender: a curva deslizante x · y = k, as frases, a
// animação do pool (o mesmo exemplo, cena por cena), os três pontos em texto e
// a fórmula no "Para ir mais fundo".
function montarQuantoSai() {
  const dados = secao('quanto-sai');
  // Lugar da animação: dentro deste card, depois da curva e antes dos três
  // pontos (auditoria pesquisa/design/auditoria/m6.md; o desenho do M6 não
  // reserva lugar para ela). Sem a margem de cima dela: o card já põe 16px
  // entre os blocos.
  const animacao = criarAnimacaoPool();
  if (animacao?.style) animacao.style.marginTop = '0';
  return criarSecao(dados, [
    criarCurvaDeSaida(),
    ...criarParagrafos(dados.paragrafos),
    animacao,
    criarTresPontos(dados.tresPontos),
    criarParaIrMaisFundo(dados.detalhe),
  ]);
}

// "Os três pontos da tabela, em texto": caixa com título e lista.
function criarTresPontos({ titulo, itens }) {
  return html`<div style="border-radius:8px;border:1px solid #1F2733;background:#0B0F17;padding:12px 16px">
    <p style="margin:0;font-size:14px;font-weight:600">${titulo}</p>
    ${criarListaComMarcador(itens)}
  </div>`;
}

// 1C. Zeros compactados: a lupa dos zeros, a frase e o "Para ir mais fundo".
function montarZerosCompactados() {
  const dados = secao('zeros-compactados');
  return criarSecao(dados, [
    criarLupaDosZeros(dados.lupa),
    ...criarParagrafos(dados.paragrafos),
    criarParaIrMaisFundo(dados.detalhe),
  ]);
}

// A lupa: o preço como a tela mostra (o 5 pequeno numa moldura ciano), o mesmo
// preço por extenso (os cinco zeros em ciano) e, na linha de baixo, o erro de
// quem copia para uma planilha, em vermelho.
function criarLupaDosZeros(lupa) {
  const { naTela, porExtenso, copiado } = lupa;
  return html`<figure style="${CAIXA + '20px'}">
    <div role="img" aria-label="${lupa.descricao}" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px;align-items:center">
      <div style="border-radius:8px;border:1px solid #1F2733;background:#141A24;padding:14px 16px">
        <p style="${MICRO + ';color:#9AA7B4'}">${naTela.rotulo}</p>
        <p style="${'margin:6px 0 0;font-family:' + MONO + ';font-size:2rem;font-weight:700;line-height:1.1'}">${naTela.antes}<span style="display:inline-block;border-radius:6px;border:2px solid #22D3EE;padding:0 4px;font-size:1.25rem;vertical-align:baseline;color:#22D3EE">${naTela.meio}</span>${naTela.depois}</p>
        <p style="margin:8px 0 0;font-size:13px;color:#9AA7B4">${naTela.nota}</p>
      </div>
      <div style="border-radius:8px;border:1px solid #22D3EE;background:rgba(34,211,238,.1);padding:14px 16px">
        <p style="${MICRO + ';color:#9AA7B4'}">${porExtenso.rotulo}</p>
        <p style="${'margin:6px 0 0;font-family:' + MONO + ';font-size:1.5rem;font-weight:700;line-height:1.1;overflow-wrap:anywhere'}">${porExtenso.antes}<span style="color:#22D3EE">${porExtenso.meio}</span>${porExtenso.depois}</p>
        <p style="margin:8px 0 0;font-size:13px;color:#9AA7B4">${porExtenso.nota}</p>
      </div>
      <div style="grid-column:1 / -1;border-radius:8px;border:1px solid rgba(239,68,68,.5);background:rgba(239,68,68,.12);padding:12px 16px;display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;align-items:baseline">
        <span style="font-size:14px;color:#E6EDF3">${copiado.texto}<span style="${'font-family:' + MONO + ';color:#F87171'}">${copiado.valor}</span></span>
        <span style="${'font-family:' + MONO + ';font-size:1.25rem;font-weight:700;color:#F87171'}">${copiado.vezes}</span>
      </div>
    </div>
  </figure>`;
}

// 1D. PnL: realizado × não realizado, a frase e o "Para ir mais fundo".
function montarPnl() {
  const dados = secao('pnl');
  return criarSecao(dados, [
    criarRealizadoENaoRealizado(dados.cartoes),
    ...criarParagrafos(dados.paragrafos),
    criarParaIrMaisFundo(dados.detalhe),
  ]);
}

// Os dois PnL lado a lado: o realizado com borda verde sólida (o dinheiro
// existe) e o não realizado com borda tracejada (é uma estimativa).
function criarRealizadoENaoRealizado({ itens, descricao }) {
  return html`<div role="img" aria-label="${descricao}" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:12px">
    ${itens.map((cartao) => {
      const verde = cartao.tom === 'bom';
      return html`<div style="${'border-radius:8px;background:#0B0F17;padding:14px 16px;border:2px ' + (verde ? 'solid #22C55E' : 'dashed #9AA7B4')}">
        <p style="${MICRO + ';color:' + (verde ? '#22C55E' : '#9AA7B4')}">${cartao.rotulo}</p>
        <p style="margin:6px 0 0;font-size:15px;font-weight:600">${cartao.destaque}</p>
        <p style="margin:4px 0 0;font-size:14px;color:#9AA7B4">${cartao.texto}</p>
      </div>`;
    })}
  </div>`;
}

function montarAbaNumeros() {
  const [parte1, parte2, parte3] = modulo6.partes.numeros;
  return criarColuna([
    criarPerguntaAntes('numeros'),
    montarDestaques(modulo6.destaques.numeros),
    montarTermos(modulo6.termos?.numeros),
    montarSegmentos({
      partes: [
        { titulo: parte1, conteudo: [montarTresNumeros()] },
        { titulo: parte2, conteudo: [montarQuantoSai()] },
        { titulo: parte3, conteudo: [montarZerosCompactados(), montarPnl()] },
      ],
    }),
  ]);
}

// ---------------------------------------------------------------------------
// Aba 2 — Volume falso
// ---------------------------------------------------------------------------

// 2A. Como o volume é fabricado: a figura do wash trading, a frase, as barras do
// custo, a outra frase e o "Para ir mais fundo" (sem pergunta, como no desenho).
function montarComoFabrica() {
  const dados = secao('como-fabrica');
  return criarSecao(dados, [
    criarFiguraDoWashTrading(),
    ...criarParagrafos(dados.paragrafos),
    criarCustoDoVolume(dados.custo),
    ...criarParagrafos(dados.paragrafosFinais),
    criarParaIrMaisFundo(dados.detalhe),
  ]);
}

// A figura do wash trading: A e B lado a lado ("mesma pessoa"), a tela somando o
// volume, as listas de "em alta", os compradores reais e o grupo vendendo para
// eles. Quem desenha é criarFluxograma, a partir de diagramas['wash-trading'];
// a versão em texto do dado é a descrição para o leitor de tela. Se o texto do
// diagrama não puder ser lido, sai a versão em texto, em lista numerada.
function criarFiguraDoWashTrading() {
  const dados = modulo6.diagramas.find((diagrama) => diagrama.id === 'wash-trading');
  if (!dados) return null;
  const figura = criarFluxograma({
    diagrama: dados.codigoMermaid,
    legenda: dados.legenda,
    rotuloAcessivel: dados.versaoEmTexto.join(' '),
  });
  if (figura) return figura;
  return html`<ol style="margin:0;padding-left:20px;font-size:14px;color:#9AA7B4;list-style:decimal">
    ${dados.versaoEmTexto.map((passo) => html`<li>${passo}</li>`)}
  </ol>`;
}

// "Quanto custa fabricar US$ 1 milhão de volume": duas barras na mesma escala.
// A parte roxa é a taxa da pool sobre o volume; a listrada, o 1% do serviço de
// volume. As larguras saem da conta (taxa × volume) com os números do dado.
function criarCustoDoVolume(custo) {
  const barras = custo.itens.map((item) => {
    const pool = (custo.volume * item.taxaDaPool) / 100;
    const servico = (custo.volume * custo.taxaDoServico) / 100;
    return { ...item, pool, servico, total: pool + servico };
  });
  const maior = Math.max(...barras.map((barra) => barra.total));
  const porcento = (fracao) => (fracao * 100).toFixed(2) + '%';

  return html`<figure style="${CAIXA + '16px 20px'}">
    <p style="margin:0 0 12px;font-size:14px;font-weight:600">${custo.titulo}</p>
    <div role="img" aria-label="${custo.descricao}" style="display:flex;flex-direction:column;gap:14px">
      ${barras.map((barra) => html`<div>
        <div style="display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;align-items:baseline">
          <span style="font-size:14px">${barra.rotulo}</span>
          <span style="${'font-family:' + MONO + ';font-size:14px'}">${barra.exibicao}</span>
        </div>
        <div style="${'margin-top:6px;height:24px;display:flex;width:' + porcento(barra.total / maior)}">
          <span style="${'background:#7C3AED;width:' + porcento(barra.pool / barra.total)}"></span>
          <span style="${'background:' + LISTRADO + ';width:' + porcento(barra.servico / barra.total)}"></span>
        </div>
      </div>`)}
    </div>
    <figcaption style="margin-top:12px;display:flex;flex-wrap:wrap;gap:14px;font-size:13px;color:#9AA7B4">
      <span style="display:inline-flex;align-items:center;gap:6px"><span aria-hidden="true" style="width:22px;height:12px;border-radius:3px;background:#7C3AED"></span>${custo.legenda.pool}</span>
      <span style="display:inline-flex;align-items:center;gap:6px"><span aria-hidden="true" style="${'width:22px;height:12px;border-radius:3px;background:' + LISTRADO}"></span>${custo.legenda.servico}</span>
    </figcaption>
  </figure>`;
}

// 2B. Todo sinal público é otimizado contra: as duas colunas e a frase.
function montarOtimizadoContra() {
  const dados = secao('otimizado-contra');
  return criarSecao(dados, [criarDuasColunas(dados.duasColunas), ...criarParagrafos(dados.paragrafos)]);
}

// À esquerda, em vermelho, o que o vendedor de volume diz que faz; à direita, em
// verde, a defesa: os sinais que custa caro falsificar ao mesmo tempo, em chips.
function criarDuasColunas({ diz, defesa, descricao }) {
  return html`<div role="img" aria-label="${descricao}" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:12px">
    <div style="border-radius:8px;border:1px solid rgba(239,68,68,.5);background:rgba(239,68,68,.12);padding:14px 16px">
      <p style="${MICRO + ';color:#F87171'}">${diz.rotulo}</p>
      ${criarListaComMarcador(diz.itens, '#E6EDF3', 18)}
    </div>
    <div style="border-radius:8px;border:1px solid rgba(34,197,94,.5);background:rgba(34,197,94,.12);padding:14px 16px">
      <p style="${MICRO + ';color:#22C55E'}">${defesa.rotulo}</p>
      <div style="margin-top:8px;display:flex;flex-wrap:wrap;gap:6px">
        ${defesa.sinais.map((sinal) => html`<span style="border-radius:999px;border:1px solid #1F2733;background:#0B0F17;padding:2px 10px;font-size:13px">${sinal}</span>`)}
      </div>
      <p style="margin:8px 0 0;font-size:14px;color:#9AA7B4">${defesa.nota}</p>
    </div>
  </div>`;
}

// 2C. O que dá para ver de graça: os dois passos com selo, a frase e o
// "Para ir mais fundo".
function montarOQueDaParaVer() {
  const dados = secao('o-que-da-para-ver');
  return criarSecao(dados, [
    criarDoisPassos(dados.passos),
    ...criarParagrafos(dados.paragrafos),
    criarParaIrMaisFundo(dados.detalhe),
  ]);
}

// Os dois passos do estudo: marcador ciano, título, selo ("de graça" em verde,
// "não sai de graça" em vermelho) e o texto. Lado a lado com a seta → no meio.
function criarDoisPassos({ itens, descricao }) {
  const passos = itens.map((passo, i) => html`<div style="flex:1 1 0;border-radius:8px;border:1px solid #1F2733;background:#0B0F17;padding:14px 16px">
    <div style="display:flex;justify-content:space-between;gap:8px;align-items:center">
      <span style="display:inline-flex;align-items:center;gap:8px;font-size:14px;font-weight:600">${criarMarcador(i + 1)}${passo.titulo}</span>
      ${criarSelo(passo.selo, passo.tom)}
    </div>
    <p style="margin:8px 0 0;font-size:14px;color:#9AA7B4">${passo.texto}</p>
  </div>`);
  return criarElemento(
    'div',
    { role: 'img', 'aria-label': descricao, class: 'flex flex-col sm:flex-row', style: 'gap:0;align-items:stretch' },
    comSetasEntre(passos),
  );
}

// 2D. Bundles: a figura do bundle no mesmo bloco, os dois cartões (engana ×
// importa), a frase com o 36,5% e o "Para ir mais fundo".
function montarBundles() {
  const dados = secao('bundles');
  return criarSecao(dados, [
    criarBundleNoMesmoBloco(dados.bundle),
    criarEnganaEImporta(dados.cartoes),
    ...criarParagrafos(dados.paragrafos),
    criarParaIrMaisFundo(dados.detalhe),
  ]);
}

// O bundle: as 5 transações em ordem (chips roxos), a seta "ou entram todas, ou
// nenhuma" e a caixa ciano do mesmo bloco. No celular, um embaixo do outro.
function criarBundleNoMesmoBloco(bundle) {
  const transacoes = bundle.transacoes.map(
    (transacao) => html`<span style="${'border-radius:6px;border:1px solid rgba(124,58,237,.6);background:rgba(124,58,237,.15);padding:4px 10px;font-family:' + MONO + ';font-size:12px'}">${transacao}</span>`,
  );
  const [linha1, linha2] = bundle.juntas;
  return html`<figure style="${CAIXA + '20px'}">
    <div role="img" aria-label="${bundle.descricao}" class="flex flex-col sm:flex-row" style="gap:16px;align-items:center">
      <div style="flex:1 1 0;display:flex;flex-direction:column;gap:6px;min-width:0;width:100%">
        <p style="${MICRO + ';color:#9AA7B4'}">${bundle.rotulo}</p>
        <div style="display:flex;flex-direction:column;gap:4px">${transacoes}</div>
      </div>
      <div aria-hidden="true" style="flex:0 0 auto;display:flex;flex-direction:column;align-items:center;gap:2px;color:#9AA7B4;font-size:12px;text-align:center"><span style="font-size:20px">→</span>${linha1}<br>${linha2}</div>
      <div style="flex:1 1 0;border-radius:8px;border:2px solid #22D3EE;padding:12px;min-width:0;width:100%;box-sizing:border-box">
        <p style="${MICRO + ';color:#22D3EE'}">${bundle.bloco.rotulo}</p>
        <p style="margin:6px 0 0;font-size:13px;color:#9AA7B4">${bundle.bloco.texto}</p>
      </div>
    </div>
  </figure>`;
}

// "Engana: Total bundled %" (borda tracejada) × "Importa: Current held %" (ciano).
function criarEnganaEImporta(cartoes) {
  return html`<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:12px">
    ${cartoes.map((cartao) => {
      const acento = cartao.tom === 'acento';
      return html`<div style="${'border-radius:8px;padding:14px 16px;' + (acento ? 'border:2px solid #22D3EE;background:rgba(34,211,238,.1)' : 'border:2px dashed #9AA7B4;background:#0B0F17')}">
        <p style="${MICRO + ';color:' + (acento ? '#22D3EE' : '#9AA7B4')}">${cartao.rotulo}</p>
        <p style="${'margin:6px 0 0;font-size:14px;color:' + (acento ? '#E6EDF3' : '#9AA7B4')}">${cartao.texto}</p>
      </div>`;
    })}
  </div>`;
}

function montarAbaVolume() {
  return criarColuna([
    criarPerguntaAntes('volume'),
    montarDestaques(modulo6.destaques.volume),
    montarTermos(modulo6.termos?.volume),
    montarComoFabrica(),
    montarOtimizadoContra(),
    montarOQueDaParaVer(),
    montarBundles(),
  ]);
}

// ---------------------------------------------------------------------------
// Aba 3 — O contrato
// ---------------------------------------------------------------------------

// 3A. SPL clássico ou Token-2022: a árvore do programa, a frase e o "Para ir
// mais fundo".
function montarSplOu2022() {
  const dados = secao('spl-ou-2022');
  return criarSecao(dados, [
    criarArvoreDoPrograma(dados.arvore),
    ...criarParagrafos(dados.paragrafos),
    criarParaIrMaisFundo(dados.detalhe),
  ]);
}

// "permanentDelegate" → ['permanent', <wbr>, 'Delegate']: o <wbr> marca onde a
// linha pode quebrar se faltar espaço (a emenda das palavras do nome).
function quebrarNasEmendas(nome) {
  return nome.split(/(?=[A-Z])/).flatMap((pedaco, i) => (i ? [document.createElement('wbr'), pedaco] : [pedaco]));
}

// Fio vertical de 2px entre duas caixas da árvore.
function criarFio() {
  return html`<div aria-hidden="true" style="width:2px;height:16px;background:#9AA7B4"></div>`;
}

// A árvore: a caixa ciano do "programa" em cima e os dois ramos embaixo, lado a
// lado (um embaixo do outro no celular).
function criarArvoreDoPrograma(arvore) {
  const ramos = arvore.ramos.map((ramo) => html`<div style="display:flex;flex-direction:column;align-items:center;gap:0;min-width:0">
    <div style="width:100%;border-radius:8px;border:1px solid #1F2733;background:#141A24;padding:12px 14px;box-sizing:border-box">
      <p style="margin:0;font-size:14px;font-weight:600">${ramo.nome}</p>
      <p style="margin:4px 0 0;font-size:13px;color:#9AA7B4">${ramo.texto}</p>
      <p style="${'margin:6px 0 0;font-family:' + MONO + ';font-size:12px;color:#22D3EE'}">${ramo.campo}</p>
    </div>
    ${criarFio()}
    ${criarFolhasDoRamo(ramo.folhas)}
  </div>`);

  return html`<figure style="${CAIXA + '20px'}">
    <div role="img" aria-label="${arvore.descricao}" style="display:flex;flex-direction:column;align-items:center">
      <div style="border-radius:8px;border:1px solid #22D3EE;background:rgba(34,211,238,.1);padding:10px 16px;font-size:14px;font-weight:600;text-align:center">${arvore.raiz}</div>
      ${criarFio()}
      <div class="grid grid-cols-1 sm:grid-cols-2" style="gap:16px;width:100%">${ramos}</div>
    </div>
  </figure>`;
}

// As folhas de um ramo: uma caixa só, sem rótulo (SPL clássico), ou caixas lado
// a lado com micro-rótulo e os nomes das extensões em mono (Token-2022).
function criarFolhasDoRamo(folhas = []) {
  if (folhas.length === 1 && !folhas[0].rotulo) {
    const trio = TRIO[folhas[0].tom];
    return html`<div style="${'width:100%;border-radius:8px;border:1px solid ' + trio.borda + ';background:' + trio.fundo + ';padding:10px 14px;box-sizing:border-box;font-size:13px'}">${folhas[0].texto}</div>`;
  }
  return html`<div style="width:100%;display:grid;grid-template-columns:1fr 1fr;gap:8px">
    ${folhas.map((folha) => {
      const trio = TRIO[folha.tom];
      // Um nome por linha. Na tela estreita, um nome comprido só quebra na
      // emenda das palavras ("permanent" + "Delegate"), nunca no meio de uma, e
      // o pedaço de baixo fica recuado, para não parecer outro nome.
      const nomes = (folha.nomes ?? []).map(
        (nome) => html`<span style="display:block;padding-left:1ch;text-indent:-1ch">${quebrarNasEmendas(nome)}</span>`,
      );
      return html`<div style="${'border-radius:8px;border:1px solid ' + trio.borda + ';background:' + trio.fundo + ';padding:10px 12px;font-size:13px;min-width:0'}">
        <p style="${'margin:0;font-weight:600;color:' + trio.cor + ';font-size:11px;letter-spacing:.05em;text-transform:uppercase'}">${folha.rotulo}</p>
        <p style="${'margin:4px 0 0;font-family:' + MONO + ';font-size:12px;overflow-wrap:break-word'}">${nomes}</p>
        <p style="margin:4px 0 0;color:#9AA7B4">${folha.texto}</p>
      </div>`;
    })}
  </div>`;
}

// 3B. As extensões que mudam o jogo: a tabela e a frase (sem pergunta).
function montarExtensoes() {
  const dados = secao('extensoes');
  return criarSecao(dados, [criarTabelaDasExtensoes(), ...criarParagrafos(dados.paragrafos)]);
}

// Estilos das células das tabelas do desenho.
const CABECALHO_DA_TABELA =
  'text-align:left;padding:8px 12px;font-size:12px;font-weight:600;letter-spacing:.05em;text-transform:uppercase;color:#9AA7B4;border-bottom:1px solid #1F2733';
const CELULA_DA_TABELA = 'padding:10px 12px;vertical-align:top;border-bottom:1px solid #1F2733';
const COLUNA_EM_DESTAQUE = ';border-left:2px solid #22D3EE';

// A caixa da tabela: rola para o lado quando falta espaço (tabindex 0, para dar
// para rolar pelo teclado, com o contorno de foco em volta). A tabela é montada
// com criarElemento: o html`` não aceita texto solto dentro de <tr>.
function criarCaixaDaTabela(rotulo, cabecalho, linhas) {
  return criarElemento(
    'div',
    {
      tabindex: '0',
      role: 'group',
      'aria-label': rotulo,
      style: 'border-radius:8px;border:1px solid #1F2733;background:#0B0F17;padding:12px;overflow-x:auto',
    },
    [
      criarElemento('table', { style: 'border-collapse:collapse;width:100%;min-width:600px;font-size:14px' }, [
        criarElemento('thead', {}, [criarElemento('tr', {}, cabecalho)]),
        criarElemento('tbody', {}, linhas),
      ]),
    ],
  );
}

// As cores do selo de risco na tabela das extensões (o texto verde fica branco,
// como no desenho; o vermelho é #F87171).
const SELO_DO_RISCO = {
  bom: { borda: 'rgba(34,197,94,.5)', fundo: 'rgba(34,197,94,.12)', cor: '#E6EDF3' },
  ruim: { borda: 'rgba(239,68,68,.5)', fundo: 'rgba(239,68,68,.12)', cor: '#F87171' },
};

// A tabela das extensões: o nome em mono, o que faz, o risco num selo com a cor
// da linha (na coluna com a borda ciano) e como aparece no pump.fun.
function criarTabelaDasExtensoes() {
  const tabela = modulo6.tabelaExtensoes;
  const cabecalho = [
    criarElemento('th', { scope: 'col', style: CABECALHO_DA_TABELA }, [tabela.rotuloDasLinhas]),
    ...tabela.colunas.map((coluna) =>
      criarElemento('th', { scope: 'col', style: CABECALHO_DA_TABELA + (coluna.destaque ? COLUNA_EM_DESTAQUE : '') }, [coluna.rotulo]),
    ),
  ];
  const linhas = tabela.linhas.map((linha) =>
    criarElemento('tr', {}, [
      criarElemento(
        'th',
        { scope: 'row', style: 'text-align:left;' + CELULA_DA_TABELA + ';font-family:' + MONO + ';font-size:13px;font-weight:500;color:#E6EDF3' },
        [linha.titulo],
      ),
      ...tabela.colunas.map((coluna) => {
        const texto = linha.valores[coluna.chave];
        if (!coluna.destaque) return criarElemento('td', { style: CELULA_DA_TABELA + ';color:#9AA7B4' }, [texto]);
        const selo = SELO_DO_RISCO[linha.tom] ?? SELO_DO_RISCO.ruim;
        return criarElemento('td', { style: CELULA_DA_TABELA + COLUNA_EM_DESTAQUE }, [
          criarElemento(
            'span',
            { style: 'display:inline-block;border-radius:6px;border:1px solid ' + selo.borda + ';background:' + selo.fundo + ';color:' + selo.cor + ';padding:4px 8px;font-weight:600' },
            [texto],
          ),
        ]);
      }),
    ]),
  );
  return criarCaixaDaTabela(tabela.rotulo, cabecalho, linhas);
}

// 3C. Autoridades: os 3 cartões, a frase, a checagem do contrato na ordem do
// checklist, o "Para ir mais fundo" e a pergunta.
function montarAutoridades() {
  const dados = secao('autoridades');
  return criarSecao(dados, [
    criarTresAutoridades(dados.autoridades),
    ...criarParagrafos(dados.paragrafos),
    criarChecagemDoContrato(),
    criarParaIrMaisFundo(dados.detalhe),
  ]);
}

// As três autoridades: nome em mono ciano, o que ela permite, o risco e como
// vem no pump.fun (em verde). A de freeze em vermelho: é o "honeypot".
function criarTresAutoridades({ itens, descricao }) {
  return html`<div role="img" aria-label="${descricao}" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px">
    ${itens.map((item) => {
      const vermelho = item.tom === 'ruim';
      return html`<div style="${'border-radius:8px;padding:14px 16px;' + (vermelho ? 'border:1px solid rgba(239,68,68,.5);background:rgba(239,68,68,.12)' : 'border:1px solid #1F2733;background:#0B0F17')}">
        <p style="${'margin:0;font-family:' + MONO + ';font-size:13px;color:#22D3EE'}">${item.nome}</p>
        <p style="margin:6px 0 0;font-size:14px;font-weight:600">${item.acao}</p>
        <p style="margin:4px 0 0;font-size:13px;color:#9AA7B4">${item.texto}</p>
        <p style="margin:8px 0 0;font-size:12px;color:#22C55E">${item.pumpfun}</p>
      </div>`;
    })}
  </div>`;
}

// A checagem do contrato no explorador, em trilho: a pergunta à esquerda com o
// "segue" embaixo, o desvio à direita ("Não compro…" em vermelho; metadata
// mutável é alerta, em âmbar) e, no fim, a caixa verde "Passar por tudo não
// aprova o token…". Sem número na tela; a descrição para o leitor de tela numera
// os passos, como no desenho.
function criarChecagemDoContrato() {
  const checagem = modulo6.checagemDoContrato;
  const descricao =
    checagem.passos
      .map((passo, i) => i + 1 + '. ' + passo.pergunta + ' ' + passo.desvio.rotulo + ': ' + passo.desvio.texto + ' ' + passo.segue.rotulo + ': siga.')
      .join(' ') +
    ' ' +
    checagem.fim;
  return criarFluxoLinear({ ...checagem, variante: 'trilho', numerar: false, rotuloAcessivel: descricao });
}

// 3D. Dev dump: os 3 passos, a frase e o "Para ir mais fundo" que junta
// metadata mutável, os limites do sinal e as redes EVM (sem pergunta).
function montarDevDump() {
  const dados = secao('dev-dump');
  return criarSecao(dados, [
    criarPassosDoDevDump(dados.passos),
    ...criarParagrafos(dados.paragrafos),
    criarParaIrMaisFundo(dados.detalhe),
  ]);
}

// Os 3 passos numerados, lado a lado (um embaixo do outro no celular). O último,
// "O criador vende tudo…", em vermelho.
function criarPassosDoDevDump({ itens }) {
  const descricao = itens.map((passo, i) => i + 1 + '. ' + passo.texto).join(' ');
  const passos = itens.map((passo, i) => {
    const vermelho = passo.tom === 'ruim';
    return html`<li style="${'flex:1 1 0;border-radius:8px;padding:12px 14px;display:flex;gap:10px;align-items:flex-start;' + (vermelho ? 'border:1px solid rgba(239,68,68,.5);background:rgba(239,68,68,.12)' : 'border:1px solid #1F2733;background:#0B0F17')}">${criarMarcador(i + 1)}<span style="${'font-size:14px' + (vermelho ? ';color:#F87171' : '')}">${passo.texto}</span></li>`;
  });
  return criarElemento(
    'ol',
    {
      role: 'img',
      'aria-label': descricao,
      class: 'flex flex-col sm:flex-row',
      style: 'list-style:none;margin:0;padding:0;gap:0;align-items:stretch',
    },
    comSetasEntre(passos, 'li'),
  );
}

function montarAbaContrato() {
  const [parte1, parte2, parte3] = modulo6.partes.contrato;
  return criarColuna([
    criarPerguntaAntes('contrato'),
    montarDestaques(modulo6.destaques.contrato),
    montarTermos(modulo6.termos?.contrato),
    montarSegmentos({
      partes: [
        { titulo: parte1, conteudo: [montarSplOu2022()] },
        { titulo: parte2, conteudo: [montarExtensoes(), montarAutoridades()] },
        { titulo: parte3, conteudo: [montarDevDump()] },
      ],
    }),
  ]);
}

// ---------------------------------------------------------------------------
// Aba 4 — Prever o golpe
// ---------------------------------------------------------------------------

// 4A. O que conta como rug: as 4 réguas e as duas frases (sem pergunta).
function montarOQueConta() {
  const dados = secao('o-que-conta');
  return criarSecao(dados, [criarReguas(dados.reguas), ...criarParagrafos(dados.paragrafos)]);
}

// A cor de cada barra das réguas (tom no dado).
const COR_DA_REGUA = { atencao: '#F59E0B', modelo: '#7C3AED', ruim: '#EF4444' };

// As 4 réguas na mesma escala (0 a 100% dos tokens de cada amostra): quem mediu
// e com que régua, o valor em mono e a barra sobre o trilho escuro.
function criarReguas(reguas) {
  return html`<figure style="${CAIXA + '16px 20px'}">
    <div role="img" aria-label="${reguas.descricao}" style="display:flex;flex-direction:column;gap:14px">
      ${reguas.itens.map((regua) => html`<div>
        <div style="display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;align-items:baseline">
          <span style="font-size:14px"><strong>${regua.quem}</strong> <span style="color:#9AA7B4">${'· ' + regua.regua}</span></span>
          <span style="${'font-family:' + MONO + ';font-size:14px;font-weight:600'}">${regua.exibicao}</span>
        </div>
        <div style="margin-top:6px;height:20px;width:100%;background:#141A24;border-radius:4px;overflow:hidden"><div style="${'height:100%;width:' + regua.valor + '%;background:' + COR_DA_REGUA[regua.tom]}"></div></div>
      </div>`)}
    </div>
    <figcaption style="margin-top:12px;font-size:13px;color:#9AA7B4">${reguas.legenda}</figcaption>
  </figure>`;
}

// 4B. O melhor detector: as duas grades de 100 com uma nota só, o F1 contra o
// chute e o MCC na régua, a frase, o "Para ir mais fundo" e a pergunta.
function montarMelhorDetector() {
  const dados = secao('melhor-detector');
  return criarSecao(dados, [
    html`<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:16px">
      ${dados.grades.itens.map((grade) => criarGradeDe100(grade))}
    </div>`,
    html`<p style="margin:0;font-size:13px;color:#9AA7B4">${dados.grades.nota}</p>`,
    html`<figure style="${CAIXA + '16px 20px;display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:20px'}">
      ${criarNotasF1(dados.f1)}
      ${criarReguaDoMcc(dados.mcc)}
    </figure>`,
    ...criarParagrafos(dados.paragrafos),
    criarParaIrMaisFundo(dados.detalhe),
  ]);
}

// Largura de uma barra de 0 a 1 em %, com uma casa ("79.0%").
function larguraDeZeroAUm(valor) {
  return (valor * 100).toFixed(1) + '%';
}

// F1, de 0 a 1: a barra roxa do modelo e a barra tracejada vermelha do chute
// "tudo é rug" (que tira nota maior).
function criarNotasF1(f1) {
  const barras = f1.barras.map((barra, i) => {
    const chute = barra.estilo === 'chute';
    return html`<div>
      <div style="${(i ? 'margin-top:10px;' : '') + 'display:flex;justify-content:space-between;font-size:13px;color:#9AA7B4'}"><span>${barra.rotulo}</span><span style="${'font-family:' + MONO + ';color:' + (chute ? '#F87171' : '#E6EDF3')}">${barra.exibicao}</span></div>
      <div style="margin-top:4px;height:16px;background:#141A24;border-radius:4px;overflow:hidden"><div style="${'height:100%;width:' + larguraDeZeroAUm(barra.valor) + ';' + (chute ? 'border:2px dashed #EF4444;box-sizing:border-box;border-radius:4px' : 'background:#7C3AED')}"></div></div>
    </div>`;
  });
  return html`<div role="img" aria-label="${f1.descricao}">
    <p style="margin:0 0 10px;font-size:14px;font-weight:600">${f1.titulo}</p>
    ${barras}
    <p style="margin:8px 0 0;font-size:13px;color:#9AA7B4">${f1.nota}</p>
  </div>`;
}

// MCC, de −1 a 1: o trilho com a marca do zero, o polegar roxo do modelo e o
// círculo tracejado de quando ele troca de plataforma ("perto de zero").
function criarReguaDoMcc(mcc) {
  // Posição na régua, em % da largura: −1 → 0%, 0 → 50%, 1 → 100%.
  const posicao = (valor) => ((valor + 1) / 2) * 100 + '%';
  const MARCA = 'position:absolute;top:30px;font-family:' + MONO + ';font-size:11px;color:#9AA7B4';
  const [menosUm, zero, umPerfeito] = mcc.marcas;
  return html`<div role="img" aria-label="${mcc.descricao}">
    <p style="margin:0 0 10px;font-size:14px;font-weight:600">${mcc.titulo}</p>
    <div style="position:relative;height:44px;margin-top:6px">
      <div style="position:absolute;left:0;right:0;top:20px;height:4px;background:#1F2733;border-radius:2px"></div>
      <span aria-hidden="true" style="position:absolute;left:50%;top:14px;width:2px;height:16px;background:#9AA7B4"></span>
      <span style="${'position:absolute;left:' + posicao(mcc.valor) + ';top:12px;width:20px;height:20px;border-radius:50%;background:#7C3AED;border:2px solid #E6EDF3;transform:translateX(-50%);box-sizing:border-box'}"></span>
      <span style="${'position:absolute;left:' + posicao(mcc.outro.valor) + ';top:14px;width:16px;height:16px;border-radius:50%;background:#0B0F17;border:2px dashed #9AA7B4;transform:translateX(-50%);box-sizing:border-box'}"></span>
      <span style="${MARCA + ';left:0'}">${menosUm}</span>
      <span style="${MARCA + ';left:50%;transform:translateX(-50%)'}">${zero}</span>
      <span style="${MARCA + ';right:0'}">${umPerfeito}</span>
    </div>
    <div style="display:flex;flex-wrap:wrap;gap:12px;font-size:13px;color:#9AA7B4;margin-top:4px">
      <span style="display:inline-flex;align-items:center;gap:6px"><span aria-hidden="true" style="width:12px;height:12px;border-radius:50%;background:#7C3AED;border:1px solid #E6EDF3;box-sizing:content-box"></span>${mcc.rotuloDoModelo}<span style="${'font-family:' + MONO + ';color:#E6EDF3'}">${mcc.exibicao}</span></span>
      <span style="display:inline-flex;align-items:center;gap:6px"><span aria-hidden="true" style="width:12px;height:12px;border-radius:50%;border:2px dashed #9AA7B4;box-sizing:border-box"></span>${mcc.outro.rotulo}</span>
    </div>
    <p style="margin:8px 0 0;font-size:13px;color:#9AA7B4">${mcc.nota}</p>
  </div>`;
}

// 4C. Os sinais: a tabela com a etiqueta da evidência e a frase (sem pergunta).
function montarSinais() {
  const dados = secao('sinais');
  return criarSecao(dados, [criarTabelaDosSinais(), ...criarParagrafos(dados.paragrafos)]);
}

// A tabela dos sinais: o sinal, a etiqueta da evidência num selo colorido, o
// que a pesquisa diz e como fica no pump.fun.
function criarTabelaDosSinais() {
  const tabela = modulo6.tabelaSinais;
  const cabecalho = [tabela.rotuloDasLinhas, tabela.rotuloDaEtiqueta, ...tabela.colunas.map((coluna) => coluna.rotulo)].map((rotulo) =>
    criarElemento('th', { scope: 'col', style: CABECALHO_DA_TABELA }, [rotulo]),
  );
  const linhas = tabela.linhas.map((linha) => {
    const etiqueta = tabela.etiquetas[linha.etiqueta];
    return criarElemento('tr', {}, [
      criarElemento('th', { scope: 'row', style: 'text-align:left;' + CELULA_DA_TABELA + ';font-weight:600' }, [linha.titulo]),
      criarElemento('td', { style: CELULA_DA_TABELA }, [
        etiqueta ? criarSelo(etiqueta.texto, etiqueta.tom, ';display:inline-block;white-space:nowrap') : null,
      ]),
      ...tabela.colunas.map((coluna) =>
        criarElemento('td', { style: CELULA_DA_TABELA + ';color:#9AA7B4' }, [linha.valores[coluna.chave]]),
      ),
    ]);
  });
  return criarCaixaDaTabela(tabela.rotulo, cabecalho, linhas);
}

// 4D. Como ler qualquer promessa de detecção: o anúncio contra o chute, a frase
// e o card-link para o Checklist, dentro do card (sem pergunta).
function montarPorQueImporta() {
  const dados = secao('por-que-importa');
  return criarSecao(dados, [
    criarAnuncio(dados.anuncio),
    ...criarParagrafos(dados.paragrafos),
    criarLinkParaChecklist(dados.link),
  ]);
}

// O anúncio de "95% de precisão": a barra tracejada do chute (82%) e a barra
// roxa do anúncio (95%), com a linha ciano no ponto do chute.
function criarAnuncio(anuncio) {
  const barras = anuncio.barras.map((barra) => {
    const chute = barra.estilo === 'chute';
    return html`<div>
      <div style="display:flex;justify-content:space-between;font-size:13px;color:#9AA7B4"><span>${barra.rotulo}</span><span style="${'font-family:' + MONO + ';color:#E6EDF3'}">${barra.exibicao}</span></div>
      <div style="margin-top:4px;height:20px;background:#141A24;border-radius:4px;overflow:hidden;position:relative">
        <div style="${'height:100%;width:' + barra.valor + '%;' + (chute ? 'border:2px dashed #9AA7B4;box-sizing:border-box;border-radius:4px' : 'background:#7C3AED')}"></div>
        ${barra.linha ? html`<span aria-hidden="true" style="${'position:absolute;left:' + barra.linha + '%;top:0;bottom:0;width:2px;background:#22D3EE'}"></span>` : null}
      </div>
    </div>`;
  });
  return html`<figure style="${CAIXA + '16px 20px'}">
    <p style="margin:0 0 12px;font-size:14px;font-weight:600">${anuncio.titulo}</p>
    <div role="img" aria-label="${anuncio.descricao}" style="display:flex;flex-direction:column;gap:12px">${barras}</div>
    <figcaption style="margin-top:10px;font-size:13px;color:#9AA7B4">${anuncio.legenda}</figcaption>
  </figure>`;
}

// O card-link para a página do Checklist (roxo, raio 12).
function criarLinkParaChecklist(link) {
  return html`<a href="${link.href}" class="block rounded-card border border-primaria/50 bg-primaria/10 px-5 py-4 text-texto transition-colors duration-150 hover:border-primaria" style="text-decoration:none">
    <p style="margin:0;font-weight:600">${link.titulo}</p>
    <p style="margin:4px 0 0;font-size:14px;color:#9AA7B4">${link.texto}</p>
  </a>`;
}

function montarAbaDeteccao() {
  return criarColuna([
    criarPerguntaAntes('deteccao'),
    montarDestaques(modulo6.destaques.deteccao),
    montarTermos(modulo6.termos?.deteccao),
    montarOQueConta(),
    montarMelhorDetector(),
    montarSinais(),
    montarPorQueImporta(),
  ]);
}

// ---------------------------------------------------------------------------
// Aba 5 — Quiz, "Terminou o módulo?", "O que você leva deste módulo" e fontes
// ---------------------------------------------------------------------------

function montarConclusao() {
  const container = criarCard([]);

  function estaConcluido() {
    return (obterEstado().modulosConcluidos ?? []).includes(modulo6.id);
  }

  function alternar() {
    const concluido = estaConcluido();
    const salvou = atualizar((estado) => {
      const lista = new Set(estado.modulosConcluidos ?? []);
      if (concluido) lista.delete(modulo6.id);
      else lista.add(modulo6.id);
      return { ...estado, modulosConcluidos: [...lista] };
    });

    renderizar();
    if (!salvou) mostrarToast('Não consegui salvar o progresso');
    else mostrarToast(concluido ? 'Módulo desmarcado' : 'Módulo 6 concluído. Progresso salvo');
  }

  function renderizar() {
    const concluido = estaConcluido();
    container.replaceChildren(
      criarElemento('h2', { style: 'margin:0;font-size:1.125rem;font-weight:600' }, ['Terminou o módulo?']),
      criarElemento('p', { style: 'margin:8px 0 16px;font-size:14px;color:#9AA7B4' }, [
        concluido
          ? 'Módulo 6 marcado como concluído. Ele conta na barra de progresso do topo.'
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

// "O que você leva deste módulo": no fim da aba Quiz, como nos desenhos dos
// outros módulos (o do M6 não tem este card; os objetivos vêm do dado).
function montarObjetivos() {
  return html`<section class="rounded-card border border-borda bg-superficie p-5">
    <h2 style="margin:0;font-size:1.125rem;font-weight:600">O que você leva deste módulo</h2>
    <ul style="margin:12px 0 0;padding-left:20px;color:#9AA7B4;display:flex;flex-direction:column;gap:6px;list-style:disc">
      ${modulo6.objetivos.map((objetivo) => html`<li>${objetivo}</li>`)}
    </ul>
  </section>`;
}

// "Fontes e itens não verificados": recolhido, com o triângulo nativo.
function montarFontesEVerificacao() {
  return html`<details style="border-radius:12px;border:1px solid #1F2733;background:#141A24;padding:20px">
    <summary style="cursor:pointer;font-size:14px;font-weight:600">Fontes e itens não verificados</summary>
    <h3 style="margin:16px 0 0;font-size:14px;font-weight:600">Não verificado</h3>
    <ul style="list-style:none;margin:8px 0 0;padding:0;display:flex;flex-direction:column;gap:8px">
      ${modulo6.naoVerificado.map((item) => html`<li style="border-radius:8px;border:1px solid rgba(245,158,11,.4);background:rgba(245,158,11,.1);padding:12px;font-size:14px;color:#9AA7B4"><strong style="color:#E6EDF3">${item.titulo + ': '}</strong>${item.texto}</li>`)}
    </ul>
    <h3 style="margin:16px 0 0;font-size:14px;font-weight:600">Fontes consultadas</h3>
    <ul style="margin:8px 0 0;padding-left:20px;font-size:14px;color:#9AA7B4;display:flex;flex-direction:column;gap:4px;list-style:disc">
      ${modulo6.fontes.map((fonte) => html`<li>${fonte.titulo} — <span style="${'font-family:' + MONO + ';font-size:12px;overflow-wrap:anywhere'}">${fonte.url}</span> (consulta em ${fonte.consultadoEm})</li>`)}
    </ul>
  </details>`;
}

function montarAbaQuiz() {
  return criarColuna([
    // Corrigido por pergunta (tela 34). Sem `moduloId`: o card "Terminou o
    // módulo?" continua separado, logo abaixo, como no desenho.
    montarQuiz({
      id: modulo6.id,
      titulo: 'Mini-quiz do Módulo 6',
      descricao: 'Oito perguntas. As respostas ficam salvas no navegador.',
      perguntas: PERGUNTAS,
      moduloNome: 'Módulo 6',
    }),
    montarConclusao(),
    montarObjetivos(),
    montarFontesEVerificacao(),
  ]);
}

// ---------------------------------------------------------------------------
// Montagem da página
// ---------------------------------------------------------------------------
export function montarModulo6() {
  // Cabeçalho do desenho: "MÓDULO 6", o título, o resumo e o "Lembrete" âmbar
  // dentro do cabeçalho.
  const cabecalho = criarTitulo(modulo6.titulo, { rotulo: 'Módulo 6', subtitulo: modulo6.resumo });
  cabecalho.append(
    html`<p style="margin:16px 0 0;border-radius:12px;border:1px solid rgba(245,158,11,.4);background:rgba(245,158,11,.12);padding:12px 16px;font-size:14px;color:#9AA7B4"><strong style="color:#E6EDF3">Lembrete: </strong>${modulo6.lembrete}</p>`,
  );

  const abas = [
    { id: 'numeros', rotulo: 'Os números', montar: montarAbaNumeros },
    { id: 'volume', rotulo: 'Volume falso', montar: montarAbaVolume },
    { id: 'contrato', rotulo: 'O contrato', montar: montarAbaContrato },
    { id: 'deteccao', rotulo: 'Prever o golpe', montar: montarAbaDeteccao },
    { id: 'quiz', rotulo: 'Quiz', montar: montarAbaQuiz },
  ];

  // O mapa do módulo abre a página: o todo antes das partes. Um ramo por aba
  // (o Quiz também); as folhas curtas vêm de modulo6.mapa. O ramo da aba aberta
  // fica roxo.
  const mapa = criarMapaDoModulo({
    mapa: modulo6.mapa,
    abas: abas.map(({ id, rotulo }) => ({ id, rotulo })),
    perguntas: modulo6.quiz.length,
    idDasAbas: 'modulo-6',
  });

  const painelDeAbas = criarAbas({ id: 'modulo-6', rotulo: 'Seções do Módulo 6', abas });

  // Cabeçalho, mapa e abas com 24px entre eles (a margem de baixo do cabeçalho
  // e do mapa, e a de cima do painel da aba).
  return criarElemento('div', {}, [cabecalho, mapa, painelDeAbas]);
}
