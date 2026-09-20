// animacoes/drainer.js — Animação 2 · Drainer (Módulo 1, aba "Golpes").
//
// Desenho: pesquisa/design/handoff/designs/Animacao 2 - Drainer.dc.html.
// Roteiro: modulo1.js (wallet-drainers-conceito, roteiro-do-golpe-passo-a-passo,
// vetores-tecnicos, revogacao-de-aprovacoes): isca → site clonado → conectar →
// assinar → o que a assinatura autoriza → permissão → transferFrom → defesa.
// O saldo (1.000 XYZ) e os endereços são exemplos inventados, marcados na tela.
//
// O palco tem três partes lado a lado, como no desenho:
//   carteira (saldo, frase-semente, aprovações)  |  seta  |  site (ou golpista, ou defesa)
// A grade é auto-fit (veja COLUNAS, mais abaixo): três colunas quando o palco tem
// 570px ou mais; abaixo disso as três empilham sozinhas (CSS).
// A frase-semente fica verde em TODAS as cenas: o ponto da animação é que ela
// nunca é pedida.
//
// Este arquivo só diz o que muda de uma cena para outra (as cenas e o palco) e a
// miniatura de cada cena. A moldura, os botões, a barra de cenas, o teclado, o
// modo "cenas paradas" e "Ler como texto" são do motor (motor.js).

import { html } from '../../ui.js';
import { criarAnimacao, MONO, NOTA } from './motor.js';

// ---------------------------------------------------------------------------
// Cores e estilos do desenho (todos da paleta do handoff)
// ---------------------------------------------------------------------------

const NEUTRO = '#1F2733'; // borda neutra
const CIANO = '#22D3EE';
const CINZA = '#9AA7B4'; // texto suave
const VERM = NOTA.alerta.b; // borda vermelha a 50%
const VERDE = NOTA.ok.b; // borda verde a 50%

// Micro-rótulo de 11px, o do desenho dentro do palco ("SUA CARTEIRA").
//
// Tamanho mínimo de letra: 11px. O desenho usa 10px em quatro lugares (a
// etiqueta do site, o rótulo "O QUE A ASSINATURA AUTORIZA DE VERDADE" da cena 5
// e, nas miniaturas, "carteira" e o título do site). Aqui eles ficam em 11px,
// porque o handoff fixa o micro-rótulo em 11–12px e não tem 10px na escala. É a
// mesma escolha do Pool e do Sanduíche, para as animações não terem letra menor
// que 11px. Exceção registrada; quem pode mudar é o dono.
// Custo medido: a etiqueta do site fica 20×117px (no desenho, 18×108). Isso
// apertava a linha do título do site em telas de 320–360px; agora essa linha
// quebra (flex-wrap, em criarSite), então a etiqueta desce inteira em vez de
// vazar a borda do cartão.
const LETRA_MINIMA = 11; // px
const MICRO = 'margin:0;font-size:11px;font-weight:600;letter-spacing:.05em;text-transform:uppercase;color:#9AA7B4';

// A etiqueta no canto do site: o texto e o trio de cores (borda, fundo, texto).
const TAG = {
  isca: { t: 'anúncio · link falso', ...NOTA.atencao },
  phishing: { t: 'site clonado', ...NOTA.alerta },
  golpista: { t: 'o golpista', ...NOTA.alerta },
  defesa: { t: 'defesa', ...NOTA.ok },
};

// O botão da "tela" do site: neutro, alerta (vermelho) ou ok (verde).
const BOTAO = {
  neutro: { b: NEUTRO, f: '#141A24', c: '#E6EDF3' },
  alerta: NOTA.alerta,
  ok: NOTA.ok,
};

// ---------------------------------------------------------------------------
// As 8 cenas, na ordem e com os textos do desenho.
// Cada cena diz: saldo e largura da barra (larg), a aprovação ativa (perm),
// a seta do meio, o site (etiqueta, endereço, tela, botão), a caixa do que a
// assinatura autoriza de verdade (real) e as bordas da carteira e do site.
// A legenda da cena 7 perdeu o "sua" para caber em 12 palavras.
// ---------------------------------------------------------------------------

const SALDO = '1.000 XYZ';

const CENAS = [
  { legenda: 'Uma isca: airdrop, mint ou "suporte" num anúncio ou link.', saldo: SALDO, larg: 100, perm: 'nenhuma', permTom: 'ok', seta: '→', setaRotulo: 'você clica', setaCor: CINZA, tag: 'isca', siteTitulo: 'Anúncio', url: 'link encurtado · exemplo inventado', urlCor: '#F59E0B', telaTitulo: 'Reivindique seu airdrop', telaTexto: 'Conta hackeada ou falsa, marca imitada. O kit clona sites automaticamente.', botao: 'Abrir', botaoTom: 'neutro', real: '', carteira: NEUTRO, site: NOTA.atencao.b, alt: 'Carteira com 1.000 XYZ (exemplo inventado) e nenhuma aprovação. À direita, um anúncio com link encurtado prometendo airdrop.' },
  { legenda: 'O site imita um conhecido. Endereço parecido, não igual.', saldo: SALDO, larg: 100, perm: 'nenhuma', permTom: 'ok', seta: '→', setaRotulo: 'você entra', setaCor: CINZA, tag: 'phishing', url: 'app-oficiaI.exemplo — com i maiúsculo no lugar do l · inventado', urlCor: '#F87171', telaTitulo: 'Conecte sua carteira para participar', telaTexto: 'Parece o passo normal de qualquer app. É onde a isca vira armadilha.', botao: 'Conectar carteira', botaoTom: 'neutro', real: '', carteira: NEUTRO, site: VERM, alt: 'O site clonado mostra um endereço quase igual ao oficial, com um caractere trocado, e pede para conectar a carteira.' },
  { legenda: 'Conectar só mostra os saldos. Ainda não há dano.', saldo: SALDO, larg: 100, perm: 'nenhuma', permTom: 'ok', seta: '⇢', setaRotulo: 'o site vê os saldos públicos', setaCor: CIANO, tag: 'phishing', url: 'app-oficiaI.exemplo · inventado', urlCor: '#F87171', telaTitulo: 'Carteira conectada', telaTexto: 'O site lê o que já é público na blockchain. Nada saiu.', botao: 'Continuar', botaoTom: 'neutro', real: '', carteira: CIANO, site: VERM, alt: 'Carteira conectada: o site lê os saldos públicos. Saldo intacto, nenhuma aprovação.' },
  { legenda: 'Um pop-up pede para "assinar". Parece verificação, sem taxa.', saldo: SALDO, larg: 100, perm: 'nenhuma', permTom: 'ok', seta: '←', setaRotulo: 'pedido de assinatura', setaCor: '#F59E0B', tag: 'phishing', url: 'app-oficiaI.exemplo · inventado', urlCor: '#F87171', telaTitulo: 'Assine para verificar a carteira', telaTexto: 'Chamado de "verificação" ou "claim" gratuito. Sem taxa de rede — e é isso que engana.', botao: 'Assinar mensagem', botaoTom: 'alerta', real: '', carteira: NEUTRO, site: VERM, alt: 'Pop-up pedindo para assinar uma mensagem para verificar a carteira, sem taxa.' },
  { legenda: 'O que a assinatura autoriza: approve ilimitado ou Permit sobre seus tokens.', saldo: SALDO, larg: 100, perm: 'nenhuma', permTom: 'ok', seta: '←', setaRotulo: 'leia antes de assinar', setaCor: '#F87171', tag: 'phishing', url: 'app-oficiaI.exemplo · inventado', urlCor: '#F87171', telaTitulo: 'Assine para verificar a carteira', telaTexto: 'A tela diz "verificação". O conteúdo diz outra coisa.', botao: 'Assinar mensagem', botaoTom: 'alerta', mostraReal: true, real: 'approve(spender: golpista, amount: ilimitado) — ou Permit/Permit2 (EIP-712), sem gás', carteira: NEUTRO, site: VERM, alt: 'O mesmo pop-up, com o conteúdo real revelado: approve com valor ilimitado para o contrato do golpista, ou uma assinatura Permit sem gás.' },
  { legenda: 'Você assinou. A permissão existe. A frase-semente continua só sua.', saldo: SALDO, larg: 100, perm: 'golpista: ilimitado sobre XYZ', permTom: 'alerta', seta: '✓', setaRotulo: 'permissão concedida', setaCor: '#F87171', tag: 'golpista', url: 'contrato do golpista · inventado', urlCor: '#F87171', telaTitulo: 'Verificação concluída', telaTexto: 'Ou uma tela de "erro, tente de novo". O saldo ainda está lá — por minutos.', botao: 'Fechar', botaoTom: 'neutro', real: '', carteira: VERM, site: VERM, alt: 'Aprovação ativa: o golpista tem permissão ilimitada sobre XYZ. Saldo ainda 1.000 XYZ. Frase-semente intacta.' },
  { legenda: 'transferFrom: os tokens saem sem nova ação. A semente nunca foi vista.', saldo: '0 XYZ', larg: 0, perm: 'golpista: ilimitado sobre XYZ', permTom: 'alerta', seta: '→', setaRotulo: 'transferFrom, depois mixers e pontes', setaCor: '#F87171', tag: 'golpista', url: 'contrato do golpista · inventado', urlCor: '#F87171', telaTitulo: 'Drenagem', telaTexto: 'A divisão operador/afiliado (tipicamente 20%/80%) é paga por contrato, sozinha.', mostraBotao: false, real: '', carteira: VERM, site: VERM, alt: 'O saldo cai de 1.000 para 0 XYZ pela permissão dada. A frase-semente nunca saiu do papel.' },
  { legenda: 'O que interrompe: desconfiar de assinatura inesperada; revogar. Revogar não desfaz.', saldo: '0 XYZ', larg: 0, perm: 'revogada', permTom: 'ok', seta: '×', setaRotulo: 'aprovação revogada', setaCor: '#22C55E', tag: 'defesa', siteTitulo: 'A defesa', url: 'revoke.cash · Token Approval Checker', urlCor: CIANO, telaTitulo: 'Antes: leia o que assina. Depois: revogue.', telaTexto: 'Revogar impede usos futuros da permissão. Não recupera o que já saiu, não salva seed vazada, não remove malware.', botao: 'Revoke', botaoTom: 'ok', real: '', carteira: VERDE, site: VERDE, alt: 'A aprovação está revogada e a permissão futura foi cortada, mas o saldo continua 0: revogar não devolve o que saiu.' },
];

// O que o desenho calcula a partir de cada cena: a cor do saldo (vermelho quando
// zera), as cores da caixa de aprovações, o título do site e o que aparece.
function estadoDaCena(c) {
  const alerta = c.permTom === 'alerta';
  const revogada = c.perm === 'revogada';
  return {
    saldoCor: c.larg ? '#E6EDF3' : '#F87171',
    permBorda: alerta ? VERM : revogada ? VERDE : NEUTRO,
    permFundo: alerta ? NOTA.alerta.f : revogada ? NOTA.ok.f : '#0B0F17',
    permCor: alerta ? '#F87171' : revogada ? '#22C55E' : CINZA,
    siteTitulo: c.siteTitulo || (c.tag === 'golpista' ? 'O golpista' : 'Site'),
    tag: TAG[c.tag] || TAG.phishing,
    botao: BOTAO[c.botaoTom] || BOTAO.neutro,
    mostraBotao: c.mostraBotao !== false,
    mostraReal: Boolean(c.mostraReal),
  };
}

// ---------------------------------------------------------------------------
// O palco
// ---------------------------------------------------------------------------

// A carteira: "SUA CARTEIRA", o saldo com a barra, a frase-semente (sempre verde)
// e a caixa "APROVAÇÕES ATIVAS", que fica vermelha ou verde conforme a cena.
function criarCarteira() {
  // O valor ("1.000 XYZ") nunca quebra no meio ("1.000 / XYZ"). Quem cede
  // espaço primeiro é o rótulo: ele encolhe até 4,5rem (72px, o bastante para
  // "Saldo em" numa linha e "tokens" na outra) e fica ao lado do valor, como o
  // próprio desenho faz quando a coluna aperta (medido nele a 320px). Se nem
  // com 72px os dois couberem lado a lado, a linha inteira quebra e o valor
  // desce (flex-wrap na linha, abaixo): assim o rótulo nunca vira três linhas
  // e o valor nunca vaza a borda do cartão, como vazava abaixo de 360px.
  const saldo = html`<span class="omh-anim-transicao" style="${MONO};font-size:1.25rem;font-weight:700;font-variant-numeric:tabular-nums;white-space:nowrap"></span>`;
  // A barra roxa tem 22px, como no desenho. O trilho é 24px (22 + as duas
  // bordas de 1px): no app o Tailwind põe box-sizing:border-box em tudo, então
  // a borda entra na conta da altura; o desenho, sem Tailwind, mede por fora.
  const barra = html`<div class="omh-anim-transicao" style="height:100%;width:100%;background:#7C3AED"></div>`;
  const aprovacao = html`<p class="omh-anim-transicao" style="margin:2px 0 0;${MONO};font-size:12px"></p>`;
  const aprovacoes = html`<div class="omh-anim-transicao" style="border-radius:6px;border:1px solid ${NEUTRO};background:#0B0F17;padding:8px 10px"><p style="${MICRO}">Aprovações ativas</p>${aprovacao}</div>`;

  const el = html`<div class="omh-anim-transicao" style="min-width:0;border-radius:10px;border:1px solid ${NEUTRO};background:#10151E;padding:14px;display:flex;flex-direction:column;gap:10px">
    <p style="${MICRO}">Sua carteira</p>
    <div style="display:flex;flex-wrap:wrap;justify-content:space-between;gap:8px;align-items:baseline"><span style="font-size:13px;color:${CINZA};flex:1 1 4.5rem">Saldo em tokens</span>${saldo}</div>
    <div aria-hidden="true" style="height:24px;background:#0B0F17;border:1px solid ${NEUTRO};border-radius:4px;overflow:hidden">${barra}</div>
    <div style="border-radius:6px;border:1px solid ${VERDE};background:${NOTA.ok.f};padding:8px 10px;display:flex;justify-content:space-between;gap:8px;align-items:center"><span style="font-size:13px">Frase-semente</span><span style="${MONO};font-size:12px;color:#22C55E">nunca saiu do papel</span></div>
    ${aprovacoes}
  </div>`;

  function aplicar(c, e) {
    el.style.borderColor = c.carteira;
    saldo.textContent = c.saldo;
    saldo.style.color = e.saldoCor;
    barra.style.width = c.larg + '%';
    aprovacoes.style.borderColor = e.permBorda;
    aprovacoes.style.backgroundColor = e.permFundo;
    aprovacao.textContent = c.perm;
    aprovacao.style.color = e.permCor;
  }

  return { el, aplicar };
}

// A seta do meio: o símbolo e o rótulo lado a lado, na cor da cena.
function criarSeta() {
  const simbolo = html`<span style="font-size:24px"></span>`;
  const rotulo = html`<span style="font-size:11px;text-align:center;max-width:120px;line-height:1.3"></span>`;
  const el = html`<div class="omh-anim-transicao" aria-hidden="true" style="min-width:0;display:flex;align-items:center;justify-content:center;gap:8px;flex-wrap:wrap">${simbolo}${rotulo}</div>`;

  function aplicar(c) {
    el.style.color = c.setaCor;
    simbolo.textContent = c.seta;
    rotulo.textContent = c.setaRotulo;
  }

  return { el, aplicar };
}

// O site (ou o golpista, ou a defesa): título miúdo com a etiqueta, o endereço
// numa caixa, a "tela" com o botão e, só na cena 5, a caixa vermelha do que a
// assinatura autoriza de verdade.
function criarSite() {
  // A etiqueta ("site clonado") não quebra no meio; quando ela e o título não
  // cabem lado a lado (coluna estreita ou celular pequeno), a linha quebra e a
  // etiqueta desce inteira — antes ela vazava a borda do cartão.
  const titulo = html`<p style="${MICRO}"></p>`;
  const etiqueta = html`<span class="omh-anim-transicao" style="border-radius:999px;border:1px solid ${NEUTRO};padding:0 8px;font-size:${LETRA_MINIMA}px;font-weight:600;white-space:nowrap"></span>`;
  const endereco = html`<div class="omh-anim-transicao" style="border-radius:6px;border:1px solid ${NEUTRO};background:#0B0F17;padding:6px 10px;${MONO};font-size:12px;overflow-wrap:anywhere"></div>`;
  const tituloDaTela = html`<p style="margin:0;font-size:13px;font-weight:600"></p>`;
  const textoDaTela = html`<p style="margin:0;font-size:12px;color:${CINZA}"></p>`;
  const botao = html`<span class="omh-anim-transicao" style="align-self:flex-start;border-radius:6px;border:1px solid ${NEUTRO};padding:4px 10px;font-size:12px;font-weight:600"></span>`;
  const textoReal = html`<p style="margin:2px 0 0;${MONO};font-size:12px;color:#F87171;overflow-wrap:anywhere"></p>`;
  const real = html`<div style="border-radius:6px;border:1px solid ${VERM};background:${NOTA.alerta.f};padding:8px 10px"><p style="margin:0;font-size:${LETRA_MINIMA}px;font-weight:600;letter-spacing:.05em;text-transform:uppercase;color:#F87171">O que a assinatura autoriza de verdade</p>${textoReal}</div>`;

  const el = html`<div class="omh-anim-transicao" style="min-width:0;border-radius:10px;border:1px solid ${NEUTRO};background:#10151E;padding:14px;display:flex;flex-direction:column;gap:10px">
    <div style="display:flex;flex-wrap:wrap;justify-content:space-between;gap:8px;align-items:baseline">${titulo}${etiqueta}</div>
    ${endereco}
    <div style="border-radius:6px;border:1px solid ${NEUTRO};background:#0B0F17;padding:10px;display:flex;flex-direction:column;gap:6px;min-height:96px">${tituloDaTela}${textoDaTela}${botao}</div>
    ${real}
  </div>`;

  function aplicar(c, e) {
    el.style.borderColor = c.site;
    titulo.textContent = e.siteTitulo;
    etiqueta.textContent = e.tag.t;
    etiqueta.style.borderColor = e.tag.b;
    etiqueta.style.backgroundColor = e.tag.f;
    etiqueta.style.color = e.tag.c;
    endereco.textContent = c.url;
    endereco.style.color = c.urlCor;
    tituloDaTela.textContent = c.telaTitulo;
    textoDaTela.textContent = c.telaTexto;
    botao.hidden = !e.mostraBotao;
    botao.textContent = c.botao ?? '';
    botao.style.borderColor = e.botao.b;
    botao.style.backgroundColor = e.botao.f;
    botao.style.color = e.botao.c;
    real.hidden = !e.mostraReal;
    textoReal.textContent = c.real;
  }

  return { el, aplicar };
}

// As colunas do palco: três iguais (carteira | seta | site) quando o palco tem
// 570px ou mais; abaixo disso, uma só (empilhado, como o desenho no celular).
// Por quê: o desenho usa auto-fit com mínimo de 240px, mas dentro do card da
// seção o palco do app tem 742px no desktop. 3 × 240 + 2 × 16 = 752 não cabe, e a
// grade cairia em DUAS colunas: a seta apontando para o nada e o site embaixo da
// carteira. O truque: o mínimo de cada coluna vira 100% (uma coluna) quando a
// largura é menor que 570px e 176px (cabem as três: 3 × 176 + 2 × 16 = 560)
// quando é maior. É CSS puro: muda sozinho quando a janela muda.
//
// O limiar é 570 e não 700 por causa das janelas de 1024 a 1140px: com a barra
// lateral aberta o palco fica entre 584 e 680px e, com 700, tudo empilhava —
// janela maior, desenho pior (em 900px, sem barra lateral, o palco tem 716 e
// mostrava as três colunas). Com 570 as três colunas aparecem em toda essa
// faixa; as linhas do saldo e do título do site quebram sozinhas quando a
// coluna aperta.
const COLUNAS = 'repeat(auto-fit,minmax(min(100%,max(176px,(570px - 100%) * 999)),1fr))';

// O palco inteiro: carteira | seta | site, gap 16, as três com a mesma altura,
// como no desenho. Sem moldura própria: o motor já põe o fundo #0B0F17 e o padding.
function criarPalco() {
  const carteira = criarCarteira();
  const seta = criarSeta();
  const site = criarSite();

  const el = html`<div style="display:grid;grid-template-columns:${COLUNAS};gap:16px;align-items:stretch"></div>`;
  el.append(carteira.el, seta.el, site.el);

  return {
    el,
    aplicar(c) {
      const e = estadoDaCena(c);
      carteira.aplicar(c, e);
      seta.aplicar(c);
      site.aplicar(c, e);
    },
  };
}

// ---------------------------------------------------------------------------
// A miniatura de cada cena (modo "Reduzir movimento"), como no bloco modoParado
// do desenho: carteira (saldo e barrinha) → seta → site (título da tela).
// ---------------------------------------------------------------------------

function criarMiniatura(c) {
  const e = estadoDaCena(c);
  return html`<div style="display:flex;gap:8px;align-items:center">
    <div style="flex:1 1 0;min-width:0;border-radius:6px;border:1px solid ${c.carteira};background:#10151E;padding:8px">
      <p style="margin:0;font-size:${LETRA_MINIMA}px;color:${CINZA}">carteira</p>
      <p style="margin:2px 0 0;${MONO};font-size:13px;font-weight:700;color:${e.saldoCor}">${c.saldo}</p>
      <div aria-hidden="true" style="margin-top:4px;height:6px;background:#0B0F17;border-radius:3px;overflow:hidden"><div style="height:100%;width:${c.larg}%;background:#7C3AED"></div></div>
    </div>
    <span aria-hidden="true" style="color:${c.setaCor};font-size:18px">${c.seta}</span>
    <div style="flex:1 1 0;min-width:0;border-radius:6px;border:1px solid ${c.site};background:#10151E;padding:8px">
      <p style="margin:0;font-size:${LETRA_MINIMA}px;color:${CINZA}">${e.siteTitulo}</p>
      <p style="margin:2px 0 0;font-size:11px;font-weight:600;line-height:1.3">${c.telaTitulo}</p>
    </div>
  </div>`;
}

// ---------------------------------------------------------------------------
// A animação
// ---------------------------------------------------------------------------

export function criarAnimacaoDrainer() {
  return criarAnimacao({
    // Título e sobrancelha do desenho: "Animação 2 · Módulo 1 · 32 s".
    titulo: 'Drainer: perder tudo sem entregar a frase-semente',
    numero: 2,
    modulo: 1,
    cenas: CENAS,
    criarPalco,
    criarMiniatura,
    duracaoPorCena: 4000,
    duracaoTransicao: 400,
    // O parágrafo de fonte do desenho (texto literal do .dc.html).
    descricao:
      'Oito cenas. O roteiro é o de modulo1.js (wallet-drainers-conceito, roteiro-do-golpe-passo-a-passo, vetores-tecnicos). Nenhum site, marca ou saldo real: a tela é uma ilustração esquemática, e o saldo é exemplo inventado.',
  });
}
