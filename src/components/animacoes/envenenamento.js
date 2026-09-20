// animacoes/envenenamento.js — Animação 6 · Address poisoning (Módulo 1, aba "Golpes").
//
// Desenho: pesquisa/design/handoff/designs/Animacao 6 - Address poisoning.dc.html.
// Fonte dos números: modulo1.js › address-poisoning-e-clipper (o estudo da
// Carnegie Mellon, "Blockchain Address Poisoning", USENIX Security 2025).
// Os dois endereços são INVENTADOS e são LIDOS de `enderecos.itens` da mesma
// seção (import lá embaixo), não copiados: se o dono mudar o endereço em
// src/data, a animação muda junto. A marca "endereços inventados" fica no
// parágrafo do cabeçalho, como no desenho.
//
// O palco tem duas partes, uma embaixo da outra, como no desenho:
//
//   1. O HISTÓRICO da carteira, em LARGURA TOTAL no topo. Uma ou duas linhas;
//      em cada uma, o endereço inteiro numa linha só: começo + meio destacado + fim.
//   2. Embaixo, duas colunas (grade auto-fit, mínimo 240px, então elas empilham
//      sozinhas no celular — sem medir a janela em JS):
//        - "Onde você costuma olhar": as duas pontas em caixinhas e, entre elas,
//          uma faixa TRACEJADA que ocupa todo o espaço que sobra (é o meio, a
//          parte que ninguém confere). A cor das pontas muda por cena: verde nas
//          cenas 1 e 7, vermelha da 2 à 6.
//        - A nota da cena, que na cena 7 ganha a regra em 4 marcadores.
//
// Este arquivo só diz o que muda de uma cena para outra (as cenas e o palco) e a
// miniatura de cada cena. A moldura, os botões, a barra de cenas, o teclado, o
// modo "cenas paradas" e "Ler como texto" são do motor (motor.js).

import { html } from '../../ui.js';
import { modulo1 } from '../../data/modulo1.js';
import { criarAnimacao, criarNota, MONO, NOTA, PILULA_INVENTADO } from './motor.js';

// ---------------------------------------------------------------------------
// Cores e medidas do desenho (todas da paleta fechada do handoff)
// ---------------------------------------------------------------------------

const NEUTRO = '#1F2733'; // toda borda neutra
const CINZA = '#9AA7B4'; // texto suave, rótulo, legenda

// Micro-rótulo de seção: 11px, 600, maiúsculas, cinza — o tamanho do desenho e o
// mínimo do handoff (11–12px). É o mesmo micro-rótulo do Drainer e do Sanduíche.
const MICRO =
  'margin:0;font-size:11px;font-weight:600;letter-spacing:.05em;text-transform:uppercase;color:#9AA7B4';

// Raio das caixinhas pequenas: 4px, que é o do desenho no destaque do meio do
// endereço, nas duas pontas, na faixa tracejada e nas caixas da miniatura. O
// handoff lista 6px para "campo de mockup" — aqui vale o desenho, que usa 4px
// nessas cinco peças e guarda os 6px para a linha do histórico (mais abaixo).
const RAIO_MIUDO = '4px';

// Os dois endereços inventados, lidos de src/data (modulo1.js, seção
// address-poisoning-e-clipper › enderecos.itens): o item 0 é o endereço certo e
// o item 1 é o do golpista. Mesmo começo, mesmo fim, e só os 32 caracteres do
// meio mudam — é isso que a animação mostra.
const ITENS = (modulo1.secoes ?? []).find((s) => s.id === 'address-poisoning-e-clipper')?.enderecos?.itens ?? [];
// Reserva: só entra se a seção sumir de src/data, para a animação não ficar sem
// endereço nenhum na tela. O dado sempre vence estes valores.
const CERTO = ITENS[0] ?? { inicio: '0x3aF1', fim: 'Bf07', meio: '9c2e8B7d40a1f6E3c9D2b58A7e14C0f3' };
const GOLPISTA = ITENS[1] ?? { meio: '7D0b3e4C91f2a8B6d5E0c73F1a9e2D48' };
const INICIO = CERTO.inicio;
const FIM = CERTO.fim;
const MEIO_OK = CERTO.meio;
const MEIO_MAU = GOLPISTA.meio;

// O trio de cores de cada linha do histórico (borda, fundo e cor do rótulo).
const TOM = {
  ok: { borda: NOTA.ok.b, fundo: 'rgba(34,197,94,.08)', rotuloCor: '#22C55E' },
  mau: { borda: NOTA.alerta.b, fundo: 'rgba(239,68,68,.08)', rotuloCor: '#F87171' },
  neutro: { borda: NEUTRO, fundo: '#0B0F17', rotuloCor: CINZA },
};

// As pontas (começo e fim) em "Onde você costuma olhar": verdes quando o
// endereço da cena é o certo, vermelhas quando o sósia está em jogo.
const PONTA = {
  ok: { b: NOTA.ok.b, f: NOTA.ok.f },
  mau: { b: NOTA.alerta.b, f: NOTA.alerta.f },
};

// A faixa tracejada do meio: neutra, de alerta ou verde.
const FAIXA = {
  neutro: { b: NEUTRO, f: '#0B0F17', c: CINZA },
  alerta: NOTA.alerta,
  ok: NOTA.ok,
};

// Uma linha do histórico. `destaque` diz como pintar os caracteres do meio.
function linha(tom, rotulo, valor, meio, destaque, nota, notaCor) {
  return {
    ...TOM[tom],
    rotulo,
    valor,
    meio,
    meioFundo:
      destaque === 'mau' ? 'rgba(239,68,68,.25)' : destaque === 'ok' ? 'rgba(34,197,94,.2)' : 'transparent',
    meioCor: destaque === 'mau' ? '#F87171' : destaque === 'ok' ? '#22C55E' : CINZA,
    nota: nota || '',
    notaCor: notaCor || CINZA,
  };
}

// ---------------------------------------------------------------------------
// As sete cenas (os textos são os do desenho, palavra por palavra)
// ---------------------------------------------------------------------------

const CENAS = [
  {
    histRotulo: 'Seu histórico de envios',
    histNota: '1 endereço conhecido',
    histBorda: NEUTRO,
    linhas: [
      linha('ok', 'Destino que você já usou', 'enviado', MEIO_OK, 'nenhum', 'É o endereço certo, que você conferiu na fonte oficial.', CINZA),
    ],
    pontaTom: 'ok',
    meioFaixa: 'o meio, que quase ninguém confere',
    meioTom: 'neutro',
    pontasNota: 'Começo e fim: é por eles que a gente reconhece um endereço.',
    notaTitulo: 'O ponto de partida',
    nota: 'Você envia para um endereço conhecido. Ele já está no seu histórico, e foi conferido na fonte oficial.',
    notaTom: 'ok',
    legenda: 'Você envia para um endereço conhecido, já conferido.',
    alt: 'O histórico tem uma linha: o endereço certo, começando em 0x3aF1 e terminando em Bf07 (endereços inventados).',
  },
  {
    histRotulo: 'Seu histórico de envios',
    histNota: 'o golpista prepara o sósia',
    histBorda: NOTA.alerta.b,
    linhas: [
      linha('ok', 'Destino que você já usou', 'enviado', MEIO_OK, 'nenhum', '', ''),
      linha('mau', 'Endereço gerado pelo golpista', 'fora do seu histórico', MEIO_MAU, 'mau', 'Mesmo começo, mesmo fim. Só o meio é outro.', '#F87171'),
    ],
    pontaTom: 'mau',
    meioFaixa: 'só o meio muda',
    meioTom: 'alerta',
    pontasNota: 'As pontas são idênticas de propósito: é nelas que você confia.',
    notaTitulo: 'O sósia',
    nota: 'O golpista gera um endereço com os mesmos primeiros e últimos caracteres do original. Isso é barato e automatizado.',
    notaTom: 'alerta',
    legenda: 'O golpista cria um endereço com o mesmo começo e fim.',
    alt: 'Aparece um segundo endereço, do golpista: início 0x3aF1 e fim Bf07 iguais, e o meio destacado em vermelho porque é a única parte diferente.',
  },
  {
    histRotulo: 'Seu histórico de envios',
    histNota: 'chegou uma transação',
    histBorda: NOTA.atencao.b,
    linhas: [
      linha('ok', 'Destino que você já usou', 'enviado', MEIO_OK, 'nenhum', '', ''),
      linha('mau', 'Recebido agora', 'valor 0', MEIO_MAU, 'mau', 'Uma transação minúscula, só para o endereço entrar no seu histórico.', '#F87171'),
    ],
    pontaTom: 'mau',
    meioFaixa: 'só o meio muda',
    meioTom: 'alerta',
    pontasNota: 'O envio de valor zero não custa quase nada para quem faz.',
    notaTitulo: 'O envenenamento',
    nota: 'Ele manda uma transação de valor zero para você. O objetivo não é o dinheiro: é plantar o endereço na sua lista.',
    notaTom: 'atencao',
    legenda: 'Ele manda uma transação de valor zero, só para aparecer.',
    alt: 'O endereço do golpista entra no histórico por uma transação recebida de valor zero.',
  },
  {
    histRotulo: 'Seu histórico, dias depois',
    histNota: 'os dois parecem iguais',
    histBorda: NOTA.alerta.b,
    linhas: [
      linha('neutro', 'Linha do histórico', '—', MEIO_OK, 'ok', 'O certo.', '#22C55E'),
      linha('neutro', 'Linha do histórico', '—', MEIO_MAU, 'mau', 'O do golpista.', '#F87171'),
    ],
    pontaTom: 'mau',
    meioFaixa: 'a única diferença está aqui',
    meioTom: 'alerta',
    pontasNota: 'Lado a lado, com as pontas iguais, o olho não separa os dois.',
    notaTitulo: 'No histórico',
    nota: 'Os dois aparecem na mesma lista, com o mesmo começo e o mesmo fim. A única diferença são os caracteres do meio.',
    notaTom: 'alerta',
    legenda: 'No histórico, os dois endereços parecem iguais.',
    alt: 'As duas linhas do histórico lado a lado: pontas idênticas e os meios destacados, um em verde e um em vermelho.',
  },
  {
    histRotulo: 'Você vai enviar de novo',
    histNota: 'copiou do histórico',
    histBorda: NOTA.alerta.b,
    linhas: [
      linha('mau', 'Copiado do histórico', 'colado no campo destino', MEIO_MAU, 'mau', 'Conferiu 0x3aF1 no começo e Bf07 no fim: bateu.', '#F87171'),
    ],
    pontaTom: 'mau',
    meioFaixa: 'ninguém leu esta parte',
    meioTom: 'alerta',
    pontasNota: 'Foi a conferência pelas pontas que aprovou o endereço errado.',
    notaTitulo: 'O envio',
    nota: 'Você copia do histórico, confere as pontas e envia. A transação é irreversível: não existe estorno na blockchain.',
    notaTom: 'alerta',
    legenda: 'Você copia do histórico, confere as pontas e envia.',
    alt: 'O endereço do golpista foi copiado do histórico e colado no campo de destino; as pontas conferidas bateram.',
  },
  {
    histRotulo: 'O tamanho do problema',
    histNota: 'Carnegie Mellon · USENIX Security 2025',
    histBorda: NEUTRO,
    linhas: [
      linha('mau', '270 milhões de tentativas', 'Ethereum e BNB Chain, 07/2022 a 06/2024', MEIO_MAU, 'mau', '17 milhões de vítimas visadas, 6.633 incidentes bem-sucedidos, ao menos US$ 83,8 milhões perdidos.', '#F87171'),
    ],
    pontaTom: 'mau',
    meioFaixa: 'automatizado, em escala',
    meioTom: 'alerta',
    pontasNota: 'Gerar sósias em massa é o modelo do ataque, não um caso isolado.',
    notaTitulo: 'Não é caso raro',
    nota: 'O estudo cobriu duas redes em dois anos. Variantes de clipper fazem o mesmo pelo outro lado: trocam o endereço na hora de colar.',
    notaTom: 'alerta',
    legenda: 'Não é caso raro: são milhões de tentativas automatizadas.',
    alt: 'Os números do estudo: 270 milhões de tentativas, 17 milhões de vítimas visadas, 6.633 incidentes bem-sucedidos e ao menos US$ 83,8 milhões perdidos.',
  },
  {
    histRotulo: 'A regra',
    histNota: 'vale para os dois golpes',
    histBorda: NOTA.ok.b,
    linhas: [
      linha('ok', 'Endereço da fonte oficial', 'conferido caractere por caractere', MEIO_OK, 'ok', 'Copiado do site ou do canal oficial, não do histórico.', '#22C55E'),
    ],
    pontaTom: 'ok',
    meioFaixa: 'leia esta parte também',
    meioTom: 'ok',
    pontasNota: 'Conferir a linha inteira é o que separa o certo do sósia.',
    notaTitulo: 'O que fazer',
    nota: 'A defesa contra address poisoning e clipper é a mesma: nunca confiar só no começo e no fim.',
    notaTom: 'ok',
    regra: [
      'Confira o endereço inteiro, caractere por caractere — nunca só as pontas.',
      'Copie da fonte oficial, não do seu histórico de transações.',
      'Antes de um valor alto, envie uma transação-teste de valor baixo.',
      'Uma carteira fria mostra o destino na própria telinha, fora do alcance do clipper.',
    ],
    legenda: 'Confira o endereço inteiro e copie da fonte oficial.',
    alt: 'A regra final: conferir a linha inteira, copiar da fonte oficial, fazer uma transação-teste de valor baixo e usar a telinha da carteira fria.',
  },
];

// O texto alternativo da figura das pontas, montado como no desenho.
function altDasPontas(cena) {
  return 'Início ' + INICIO + ' e fim ' + FIM + ' destacados; no meio, ' + cena.meioFaixa + '.';
}

// ---------------------------------------------------------------------------
// O palco
// ---------------------------------------------------------------------------

// Uma linha do histórico. O elemento é SEMPRE o mesmo de uma cena para a outra:
// é assim que a borda, o fundo e o destaque do meio mudam com transição, sem pulo.
// A segunda linha some (hidden) nas cenas que têm só um endereço.
function criarLinhaDoHistorico() {
  const rotulo = html`<span style="font-size:12px;font-weight:600"></span>`;
  const valor = html`<span style="${MONO};font-size:12px;color:${CINZA}"></span>`;
  // O meio: os 32 caracteres que quase ninguém lê, dentro do endereço inteiro.
  const meio = html`<span class="omh-anim-transicao" style="border-radius:${RAIO_MIUDO};padding:1px 3px"></span>`;
  const nota = html`<p style="margin:0;font-size:12px"></p>`;
  const el = html`<li class="omh-anim-transicao" style="border-radius:6px;border:1px solid ${NEUTRO};padding:8px 10px;display:flex;flex-direction:column;gap:4px">
    <div style="display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap;align-items:baseline">${rotulo}${valor}</div>
    <p style="margin:0;${MONO};font-size:13px;line-height:1.5;overflow-wrap:anywhere">${INICIO}${meio}${FIM}</p>
    ${nota}
  </li>`;

  return {
    el,
    aplicar(l) {
      // O `display` vai junto com o `hidden` porque o estilo inline (display:flex)
      // ganha do `[hidden]{display:none}` do Tailwind.
      el.hidden = !l;
      el.style.display = l ? 'flex' : 'none';
      if (!l) return;
      el.style.borderColor = l.borda;
      el.style.background = l.fundo;
      rotulo.textContent = l.rotulo;
      rotulo.style.color = l.rotuloCor;
      valor.textContent = l.valor;
      meio.textContent = l.meio;
      meio.style.backgroundColor = l.meioFundo;
      meio.style.color = l.meioCor;
      nota.textContent = l.nota;
      nota.style.color = l.notaCor;
      nota.hidden = !l.nota;
    },
  };
}

function criarPalco() {
  // --- 1. O histórico, em largura total ---
  const histRotulo = html`<p style="${MICRO}"></p>`;
  const histNota = html`<span style="${MONO};font-size:12px;color:${CINZA}"></span>`;
  // Duas linhas fixas: a segunda fica escondida nas cenas de um endereço só.
  const linhas = [criarLinhaDoHistorico(), criarLinhaDoHistorico()];
  // min-height: a caixa não encolhe ao passar de duas linhas para uma.
  const lista = html`<ul style="list-style:none;margin:8px 0 0;padding:0;display:flex;flex-direction:column;gap:6px;min-height:76px">${linhas.map((l) => l.el)}</ul>`;
  const historico = html`<div class="omh-anim-transicao" style="border-radius:8px;border:1px solid ${NEUTRO};background:#10151E;padding:12px">
    <div style="display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap;align-items:baseline">${histRotulo}${histNota}</div>
    ${lista}
  </div>`;

  // --- 2a. "Onde você costuma olhar": as pontas e a faixa tracejada do meio ---
  const estiloPonta = `border-radius:${RAIO_MIUDO};border:1px solid ${NOTA.ok.b};background:${NOTA.ok.f};padding:4px 8px;${MONO};font-size:13px`;
  const pontaInicio = html`<span class="omh-anim-transicao" style="${estiloPonta}">${INICIO}</span>`;
  const pontaFim = html`<span class="omh-anim-transicao" style="${estiloPonta}">${FIM}</span>`;
  // A faixa tracejada: é a parte do endereço que o olho pula. Ela ocupa todo o
  // espaço que sobra entre as duas pontas e encolhe junto com a caixa — começo,
  // meio e fim ficam SEMPRE na mesma linha, em qualquer largura, porque a figura
  // é justamente "as duas pontas ladeando o meio que ninguém confere". É a
  // mesma regra do desenho, letra por letra: a fila é `display:flex` sem
  // `flex-wrap` e a faixa é `flex:1 1 auto;min-width:0`. O `min-width:0` é o que
  // faz a faixa absorver todo o aperto: as pontas, em fonte mono e sem ponto de
  // quebra, param de encolher no próprio texto e ficam inteiras.
  // O `overflow-wrap:anywhere` é só uma trava de segurança, o mesmo recurso que
  // o desenho usa no endereço do histórico e na miniatura: enquanto a frase
  // couber, ele não faz nada. Na largura do desenho (faixa de 106px) as sete
  // frases cabem e ele nunca dispara; só entra quando a caixa fica mais estreita
  // do que a maior palavra ("automatizado," da cena 6, 93,6px medidos), e aí
  // prefere quebrar a palavra a deixá-la correr por cima da ponta "Bf07".
  const faixa = html`<span class="omh-anim-transicao" style="flex:1 1 auto;min-width:0;text-align:center;overflow-wrap:anywhere;border-radius:${RAIO_MIUDO};border:1px dashed ${NEUTRO};padding:4px 6px;${MONO};font-size:12px"></span>`;
  const pontasNota = html`<figcaption style="margin-top:8px;font-size:12px;color:${CINZA}"></figcaption>`;
  const desenhoPontas = html`<div role="img" style="display:flex;align-items:center;gap:4px">${pontaInicio}${faixa}${pontaFim}</div>`;
  const pontas = html`<figure style="margin:0;min-width:0;border-radius:8px;border:1px solid ${NEUTRO};background:#141A24;padding:12px 14px">
    <p style="${MICRO};margin-bottom:8px">Onde você costuma olhar</p>
    ${desenhoPontas}${pontasNota}
  </figure>`;

  // --- 2b. A nota da cena (e, na cena 7, a regra em 4 marcadores) ---
  const nota = criarNota();
  nota.el.classList.add('omh-anim-transicao');
  nota.el.style.minWidth = '0';
  // O título da nota em 11px, como os outros micro-rótulos deste palco.
  nota.el.querySelector('p').style.fontSize = '11px';
  // list-style explícito: o reset do Tailwind tira os marcadores de toda lista.
  const regra = html`<ul hidden style="list-style:disc;margin:8px 0 0;padding-left:18px;font-size:14px;display:flex;flex-direction:column;gap:6px"></ul>`;
  nota.el.append(regra);

  // Duas colunas quando cabem 240px em cada uma; abaixo disso elas empilham
  // sozinhas. O min(240px,100%) é o que impede a coluna de ficar mais larga que
  // o palco num celular estreito (sem isso, sobra por fora).
  const colunas = html`<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(240px,100%),1fr));gap:16px">${pontas}${nota.el}</div>`;

  const el = html`<div style="display:flex;flex-direction:column;gap:16px">${historico}${colunas}</div>`;

  return {
    el,
    aplicar(c) {
      histRotulo.textContent = c.histRotulo;
      histNota.textContent = c.histNota;
      historico.style.borderColor = c.histBorda;
      linhas.forEach((l, i) => l.aplicar(c.linhas[i]));

      const p = PONTA[c.pontaTom] ?? PONTA.ok;
      [pontaInicio, pontaFim].forEach((ponta) => {
        ponta.style.borderColor = p.b;
        ponta.style.backgroundColor = p.f;
      });

      const m = FAIXA[c.meioTom] ?? FAIXA.neutro;
      faixa.textContent = c.meioFaixa;
      faixa.style.borderColor = m.b;
      faixa.style.backgroundColor = m.f;
      faixa.style.color = m.c;
      desenhoPontas.setAttribute('aria-label', altDasPontas(c));
      pontasNota.textContent = c.pontasNota;

      nota.aplicar(c.notaTitulo, c.nota, c.notaTom);
      // Idem: o display inline precisa acompanhar o hidden.
      regra.hidden = !c.regra;
      regra.style.display = c.regra ? 'flex' : 'none';
      if (c.regra) regra.replaceChildren(...c.regra.map((item) => html`<li>${item}</li>`));
    },
  };
}

// ---------------------------------------------------------------------------
// A miniatura de cada cena (modo "Reduzir movimento"), como no bloco modoParado
// do desenho: só as linhas do histórico, com o meio destacado.
// Os tamanhos são os do desenho: rótulo da linha em 10px e endereço em 11px. O
// rótulo é o único texto abaixo dos 11px do handoff, e fica só aqui: é a repetição
// miúda de uma linha que o palco mostra inteira em 12px e que o "Ler como texto"
// repete por extenso.
// ---------------------------------------------------------------------------

function criarMiniatura(cena) {
  return html`<div style="display:flex;flex-direction:column;gap:4px">
    ${cena.linhas.map(
      (l) => html`<div style="border-radius:${RAIO_MIUDO};border:1px solid ${l.borda};background:${l.fundo};padding:5px 8px">
        <p style="margin:0;font-size:10px;color:${l.rotuloCor}">${l.rotulo}</p>
        <p style="margin:2px 0 0;${MONO};font-size:11px;overflow-wrap:anywhere">${INICIO}<span style="background:${l.meioFundo};color:${l.meioCor};padding:0 2px">${l.meio}</span>${FIM}</p>
      </div>`,
    )}
  </div>`;
}

// ---------------------------------------------------------------------------
// A animação
// ---------------------------------------------------------------------------

export function criarAnimacaoEnvenenamento() {
  return criarAnimacao({
    // Título e sobrancelha do desenho: "Animação 6 · Módulo 1 · 32 s".
    titulo: 'Address poisoning: o endereço quase igual',
    numero: 6,
    modulo: 1,
    cenas: CENAS,
    criarPalco,
    criarMiniatura,
    // A grade das cenas paradas: mínimo de 250px, como no desenho.
    larguraMiniatura: 250,
    duracaoPorCena: 4500,
    duracaoTransicao: 450,
    // O parágrafo de fonte do desenho (texto literal do .dc.html), com a pílula
    // "endereços inventados" no meio da frase.
    descricao: html`Sete cenas. Fonte: modulo1.js › address-poisoning-e-clipper. <span style="${PILULA_INVENTADO}">endereços inventados</span> Os dois endereços desta tela foram feitos para o exemplo: mesmo começo, mesmo fim, meio diferente.`,
  });
}
