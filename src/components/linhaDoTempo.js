// linhaDoTempo.js — cronologia com trilho vertical e marcos datados.
//
// Serve onde o conteúdo é uma sequência de datas: a regulação brasileira (M1),
// os casos reais (M2), o cenário 2025–2026 (M3). Prosa com datas no meio das
// frases não deixa ver a ORDEM nem a DISTÂNCIA entre os eventos; a linha do tempo
// deixa as duas coisas: o espaço entre os marcos cresce com o tempo que passou,
// e uma pílula no trilho escreve esse intervalo ("4 anos e 9 meses depois").
//
// É HTML, não SVG, de propósito: os marcos têm texto de verdade (que precisa
// quebrar linha, ser selecionável e lido por leitor de tela), e uma <ol> já é a
// estrutura semântica certa para "eventos em ordem". O trilho e os pontos são só
// CSS por cima. A pílula do intervalo fica DENTRO do item, depois do texto, então
// o leitor de tela lê "marco, intervalo, próximo marco" — essa é a alternativa em
// texto, sem precisar de nada escondido.
//
// REGRA DE DADOS (importante): a data aparece EXATAMENTE como está em src/data.
// "2023", "ago/2025", "~06/01/2025", "10–11/10/2024" e "Início de agosto de 2025"
// ficam escritos assim. Para calcular o intervalo, cada data vira uma FAIXA de dias
// possíveis ("2023" = de 01/01 a 31/12/2023). Quando a faixa é larga demais para
// dizer quanto tempo passou, a pílula sai com "cerca de" ou simplesmente não sai.
// Nunca inventamos um dia ou um mês que o dado não tem.

import { html } from '../ui.js';

// Cor do ponto no trilho (e da bolinha da legenda), pelo tom do marco.
const PONTO_POR_TOM = {
  neutro: 'bg-primaria',
  alerta: 'bg-risco-alto',
  atencao: 'bg-risco-medio',
  ok: 'bg-risco-baixo',
};

// Rótulos da legenda na vitrine do desenho ("00 Componentes"). Cada tela pode
// trocar por rótulos próprios (o M1, por exemplo, usa "marco regulatório").
const LEGENDA_PADRAO = {
  neutro: 'marco neutro',
  alerta: 'alerta',
  atencao: 'não verificado',
  ok: 'ok',
};

// Medidas do desenho: 24px de espaço mínimo entre marcos, mais 1,2px por mês,
// até no máximo 96px (senão um intervalo de 5 anos empurraria o resto da tela).
const ESPACO_MINIMO = 24;
const ESPACO_MAXIMO = 96;
const PX_POR_MES_PADRAO = 1.2;

// Duração média de um mês e de um ano, em dias (para converter a contagem de dias).
const DIAS_POR_MES = 30.4375;
const DIAS_POR_ANO = 365.25;

// ---------------------------------------------------------------------------
// 1. Ler a data do jeito que ela está escrita
// ---------------------------------------------------------------------------

// Meses por extenso ou abreviados. Guardamos só as 3 primeiras letras, sem
// acento: "março", "mar" e "Março" viram todos "mar".
const MESES = { jan: 1, fev: 2, mar: 3, abr: 4, mai: 5, jun: 6, jul: 7, ago: 8, set: 9, out: 10, nov: 11, dez: 12 };

// O nome do mês como pode aparecer no texto (já sem acento): abreviado ("ago") ou
// inteiro ("agosto"). A lista fechada evita confundir palavras como "setor" com "set".
const NOMES_DOS_MESES =
  'jan(?:eiro)?|fev(?:ereiro)?|mar(?:co)?|abr(?:il)?|mai(?:o)?|jun(?:ho)?|jul(?:ho)?|' +
  'ago(?:sto)?|set(?:embro)?|out(?:ubro)?|nov(?:embro)?|dez(?:embro)?';

// Número do dia desde 1970, sem fuso horário (evita erro de 1 dia no horário de verão).
function numeroDoDia(ano, mes, dia) {
  return Math.round(Date.UTC(ano, mes - 1, dia) / 86400000);
}

// Último dia de um mês = dia 0 do mês seguinte (o Date.UTC entende isso).
function ultimoDiaDoMes(ano, mes) {
  return numeroDoDia(ano, mes + 1, 0);
}

// Tira acentos e deixa em minúsculas: "Início de Março" → "inicio de marco".
function normalizar(texto) {
  // NFD separa a letra do acento ("í" vira "i" + acento); a faixa ̀-ͯ
  // são os acentos soltos, que apagamos.
  return String(texto).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
}

/**
 * Lê uma data escrita em português e devolve a FAIXA de dias em que ela pode cair.
 *   '13/08/2019'            → precisão 'dia'  (início = fim = 13/08/2019)
 *   '10–11/10/2024'         → precisão 'dia'  (de 10/10 a 11/10/2024)
 *   '~06/01/2025'           → precisão 'dia', aproximada
 *   '07/2026', 'ago/2025', 'Início de agosto de 2025' → precisão 'mes'
 *   '2023', 'Fim de 2025'   → precisão 'ano'
 * Devolve null quando não acha data nenhuma no texto.
 */
export function lerData(texto) {
  const t = normalizar(texto).trim();
  const aproximada = /^~|cerca de|por volta de/.test(t);
  let r;

  // Dia com intervalo: "10–11/10/2024" (traço comum ou meia-risca).
  if ((r = t.match(/(\d{1,2})\s*[–-]\s*(\d{1,2})\/(\d{1,2})\/(\d{4})/))) {
    const [, dia1, dia2, mes, ano] = r.map(Number);
    return { precisao: 'dia', inicio: numeroDoDia(ano, mes, dia1), fim: numeroDoDia(ano, mes, dia2), aproximada, ano, mes };
  }
  // Dia exato em números: "13/08/2019".
  if ((r = t.match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/))) {
    const [, dia, mes, ano] = r.map(Number);
    const n = numeroDoDia(ano, mes, dia);
    return { precisao: 'dia', inicio: n, fim: n, aproximada, ano, mes, dia };
  }
  // Dia exato por extenso: "13 de agosto de 2026".
  if ((r = t.match(new RegExp(`(\\d{1,2})\\s+de\\s+(${NOMES_DOS_MESES})\\s+de\\s+(\\d{4})`)))) {
    const dia = Number(r[1]), mes = MESES[r[2].slice(0, 3)], ano = Number(r[3]);
    const n = numeroDoDia(ano, mes, dia);
    return { precisao: 'dia', inicio: n, fim: n, aproximada, ano, mes, dia };
  }
  // Só mês, em números: "07/2026".
  if ((r = t.match(/(\d{1,2})\/(\d{4})/))) {
    const mes = Number(r[1]), ano = Number(r[2]);
    return { precisao: 'mes', inicio: numeroDoDia(ano, mes, 1), fim: ultimoDiaDoMes(ano, mes), aproximada, ano, mes };
  }
  // Só mês, por extenso ou abreviado: "ago/2025", "agosto de 2025".
  if ((r = t.match(new RegExp(`\\b(${NOMES_DOS_MESES})\\.?\\s*(?:\\/|de)?\\s*(\\d{4})`)))) {
    const mes = MESES[r[1].slice(0, 3)], ano = Number(r[2]);
    return { precisao: 'mes', inicio: numeroDoDia(ano, mes, 1), fim: ultimoDiaDoMes(ano, mes), aproximada, ano, mes };
  }
  // Só o ano: "2023", "Fim de 2025".
  if ((r = t.match(/(\d{4})/))) {
    const ano = Number(r[1]);
    return { precisao: 'ano', inicio: numeroDoDia(ano, 1, 1), fim: numeroDoDia(ano, 12, 31), aproximada, ano };
  }
  return null;
}

// Valor do atributo datetime do <time> (para máquinas), só com a parte que o dado
// garante: dia exato → "2019-08-13"; mês → "2025-08"; ano → "2023". Data aproximada
// fica sem datetime.
function valorDatetime(data) {
  if (!data || data.aproximada) return null;
  const doisDigitos = (n) => String(n).padStart(2, '0');
  if (data.precisao === 'dia' && data.inicio === data.fim) {
    return `${data.ano}-${doisDigitos(data.mes)}-${doisDigitos(data.dia)}`;
  }
  if (data.precisao === 'ano') return String(data.ano);
  return `${data.ano}-${doisDigitos(data.mes)}`;
}

// ---------------------------------------------------------------------------
// 2. O intervalo entre dois marcos
// ---------------------------------------------------------------------------

// "1 mês" / "3 meses", "1 ano" / "2 anos", "1 dia" / "8 dias".
function plural(n, singular, pluralDaPalavra) {
  return n + ' ' + (n === 1 ? singular : pluralDaPalavra);
}

// Escreve uma quantidade de dias na unidade que faz sentido.
//   unidade 'dia': menos de 31 dias sai em dias; mais que isso, em meses e anos.
//   unidade 'mes': meses e anos ("4 anos e 9 meses").
//   unidade 'ano': só anos (a data só tem o ano, então não dá para falar em meses).
function escreverDuracao(dias, unidade) {
  if (unidade === 'dia' && dias < 31) return plural(Math.round(dias), 'dia', 'dias');

  if (unidade === 'ano') return plural(Math.max(1, Math.round(dias / DIAS_POR_ANO)), 'ano', 'anos');

  const meses = Math.max(1, Math.round(dias / DIAS_POR_MES));
  if (meses < 12) return plural(meses, 'mês', 'meses');
  const anos = Math.floor(meses / 12);
  const resto = meses % 12;
  return plural(anos, 'ano', 'anos') + (resto ? ' e ' + plural(resto, 'mês', 'meses') : '');
}

// A precisão mais grossa das duas datas manda na unidade do texto.
const ORDEM_DA_PRECISAO = { dia: 0, mes: 1, ano: 2 };
function precisaoMaisGrossa(a, b) {
  return ORDEM_DA_PRECISAO[a.precisao] >= ORDEM_DA_PRECISAO[b.precisao] ? a.precisao : b.precisao;
}

// As duas datas cabem inteiras no mesmo mês do calendário?
function noMesmoMes(a, b) {
  const primeiro = Math.min(a.inicio, b.inicio);
  const ultimo = Math.max(a.fim, b.fim);
  const inicio = new Date(primeiro * 86400000);
  const fim = new Date(ultimo * 86400000);
  return inicio.getUTCFullYear() === fim.getUTCFullYear() && inicio.getUTCMonth() === fim.getUTCMonth();
}

/**
 * Calcula o intervalo entre dois marcos a partir das datas como estão no dado.
 * Devolve { dias, rotulo }:
 *   dias   → quantos dias usar para o ESPAÇO na tela (o meio da faixa possível);
 *   rotulo → o texto da pílula, ou '' quando a precisão não permite dizer.
 */
export function calcularIntervalo(textoA, textoB) {
  const a = lerData(textoA);
  const b = lerData(textoB);
  if (!a || !b) return { dias: 0, rotulo: '' };

  // Fora de ordem (o segundo marco termina antes de o primeiro começar): não
  // escrevemos intervalo nenhum. A linha do tempo precisa vir em ordem no dado.
  if (b.fim < a.inicio) return { dias: 0, rotulo: '' };

  // O menor e o maior número de dias que pode ter passado entre as duas datas.
  const minimo = Math.max(0, b.inicio - a.fim);
  const maximo = b.fim - a.inicio;
  const meio = (minimo + maximo) / 2;
  const exato = minimo === maximo && !a.aproximada && !b.aproximada;

  // Caso 1: as duas datas têm o dia certo. O intervalo é exato. Dois marcos no
  // MESMO dia saem com "no mesmo mês": é o rótulo que o desenho do M2 usa quando
  // passaram zero dia (o desenho não tem um rótulo "no mesmo dia").
  if (exato) {
    return { dias: meio, rotulo: minimo === 0 ? 'no mesmo mês' : escreverDuracao(minimo, 'dia') + ' depois' };
  }

  // Caso 2: as faixas se encostam (pode ter passado zero dia). Se as duas cabem no
  // mesmo mês, dá para dizer isso; senão, não dá para dizer nada.
  if (minimo === 0) {
    return { dias: meio, rotulo: noMesmoMes(a, b) ? 'no mesmo mês' : '' };
  }

  // Caso 3: dá para estimar, mas com folga. Só escrevemos quando a folga
  // (máximo − mínimo) é no máximo metade do valor do meio. Ex.: "2023" até
  // 21/05/2024 pode ser de 5 a 17 meses — folga grande demais, a pílula não sai.
  const folga = maximo - minimo;
  if (folga > meio / 2) return { dias: meio, rotulo: '' };

  return { dias: meio, rotulo: 'cerca de ' + escreverDuracao(meio, precisaoMaisGrossa(a, b)) + ' depois' };
}

// Espaço embaixo de um marco, em px: 24 + (px por mês × meses), até 96.
function calcularEspaco(dias, pxPorMes) {
  return Math.min(ESPACO_MAXIMO, ESPACO_MINIMO + (dias / DIAS_POR_MES) * pxPorMes);
}

// ---------------------------------------------------------------------------
// 3. Desenho
// ---------------------------------------------------------------------------

// Os tamanhos de letra vão em px (text-[14px]) e não em text-sm/text-xs: essas
// classes do Tailwind também mudam a altura da linha, e o desenho usa a do app
// inteiro (1,6).

// Link de um marco com href: ciano e sublinhado, branco no hover (o link do
// desenho). O foco usa o contorno ciano geral do app (custom.css).
//
// Alvo de toque de 44px sem mudar o traço: a linha de texto tem só ~22px de
// altura, então um ::after invisível (as classes after:) passa 11px para cima e
// 11px para baixo do link. O toque ali também abre o link, mas nada no layout
// se mexe e o contorno do foco continua justo em volta do texto. O inline-block
// serve para o ::after ter uma caixa certa mesmo quando o título quebra linha.
const CLASSE_DO_LINK =
  'relative inline-block text-acento underline underline-offset-2 hover:text-texto ' +
  'after:absolute after:inset-x-0 after:-top-[11px] after:-bottom-[11px]';

// O título do marco (14px, 600). Com href, o título vira link para a seção.
function montarTituloDoMarco(marco) {
  if (!marco.titulo) return null;
  const conteudo = marco.href
    ? html`<a href="${marco.href}" class="${CLASSE_DO_LINK}">${marco.titulo}</a>`
    : marco.titulo;
  return html`<p class="mt-1 text-[14px] font-semibold text-texto">${conteudo}</p>`;
}

// O texto do marco (14px, cinza). Um marco sem título (só texto, como os
// launchpads do M3) também pode ter href: aí é o texto que vira o link.
function montarTextoDoMarco(marco) {
  if (!marco.texto) return null;
  const textoViraLink = marco.href && !marco.titulo;
  const conteudo = textoViraLink
    ? html`<a href="${marco.href}" class="${CLASSE_DO_LINK}">${marco.texto}</a>`
    : marco.texto;
  return html`<p class="mt-1 text-[14px] text-texto-suave">${conteudo}</p>`;
}

// A pílula no trilho, com o intervalo até o próximo marco. Fica no espaço entre
// os dois marcos: centrada nele quando cabe, encostada embaixo quando é apertado
// (a conta do desenho: metade do espaço menos 12px, no mínimo 2px).
function montarPilula(rotulo, espaco) {
  if (!rotulo) return null;
  const distanciaDoFundo = Math.max(2, espaco / 2 - 12);
  return html`<span
    class="absolute left-6 whitespace-nowrap rounded-full border border-borda bg-superficie px-2.5 py-px text-[12px] text-texto-suave"
    style="bottom:${distanciaDoFundo}px"
    >${rotulo}</span
  >`;
}

function montarMarco(marco, proximo, { proporcional, pxPorMes }) {
  const temProximo = Boolean(proximo);
  const intervalo = temProximo && proporcional ? calcularIntervalo(marco.data, proximo.data) : null;
  const espaco = !temProximo ? 0 : intervalo ? calcularEspaco(intervalo.dias, pxPorMes) : ESPACO_MINIMO;

  return html`<li class="relative pl-8" style="padding-bottom:${espaco}px">
    <!-- O trilho sai de baixo do ponto e vai até o fim do item; o último marco
         não tem trilho, para não sobrar linha apontando para o nada. -->
    ${temProximo
      ? html`<span class="absolute left-[7px] top-4 bottom-0 w-0.5 bg-borda" aria-hidden="true"></span>`
      : null}
    <span
      class="absolute left-0 top-1.5 h-4 w-4 rounded-full border-2 border-superficie ${PONTO_POR_TOM[marco.tom] ??
      PONTO_POR_TOM.neutro}"
      aria-hidden="true"
    ></span>

    <time
      class="font-mono text-[12px] font-semibold uppercase tracking-[.05em] text-acento"
      datetime="${valorDatetime(lerData(marco.data))}"
      >${marco.data}</time
    >
    ${montarTituloDoMarco(marco)} ${montarTextoDoMarco(marco)}
    ${intervalo ? montarPilula(intervalo.rotulo, espaco) : null}
  </li>`;
}

// Legenda das cores, na ordem do desenho (neutro, alerta, atenção, ok).
// `legenda: true` mostra os 4 rótulos da vitrine; um objeto { tom: 'rótulo' }
// mostra só os tons que a tela passar, com os rótulos dela (o M1 passa 3).
function montarLegenda(legenda) {
  if (!legenda) return null;
  const rotulos = legenda === true ? LEGENDA_PADRAO : legenda;
  const itens = Object.keys(PONTO_POR_TOM).filter((tom) => rotulos[tom]);
  if (!itens.length) return null;

  return html`<div class="mt-2 flex flex-wrap gap-4 text-[13px] text-texto-suave">
    ${itens.map(
      (tom) => html`<span class="inline-flex items-center gap-1.5"
        ><span class="h-3 w-3 rounded-full ${PONTO_POR_TOM[tom]}" aria-hidden="true"></span>${rotulos[tom]}</span
      >`,
    )}
  </div>`;
}

// A caixa interna do desenho: fundo #0B0F17, raio 8, padding 20. É ela que vai
// dentro do card da seção.
function montarCaixa({ marcos, nota, legenda, proporcional, pxPorMes }) {
  return html`<div class="rounded-lg border border-borda bg-fundo p-5">
    <ol class="max-w-[620px]">
      ${marcos.map((marco, i) => montarMarco(marco, marcos[i + 1], { proporcional, pxPorMes }))}
    </ol>
    ${montarLegenda(legenda)}
    ${nota ? html`<p class="mt-3 text-[13px] text-texto-suave">${nota}</p>` : null}
  </div>`;
}

/**
 * Monta uma linha do tempo.
 *
 * Dois jeitos de usar:
 *   - SEM `titulo` (o jeito do desenho) → devolve SÓ a caixa interna, para ir
 *     dentro do card de uma seção (o título vem do card):
 *       montarLinhaDoTempo({ marcos, proporcional: true })
 *   - COM `titulo` → devolve um card próprio com <h3> e descrição em volta da
 *     caixa. É o jeito antigo, mantido para as telas que ainda chamam assim.
 *     `caixa: true` força a caixa sozinha mesmo quando vem `titulo`.
 *
 * @param {object} opcoes
 * @param {Array}  opcoes.marcos  [{ data, titulo?, texto?, tom?, href? }], já na ordem.
 *   data: como está no dado ('13/08/2019', '10–11/10/2024', '~06/01/2025', '07/2026',
 *   'ago/2025', 'Início de agosto de 2025', '2023'). tom: 'neutro' | 'alerta' |
 *   'atencao' | 'ok'. href: link do título para a seção.
 * @param {boolean} [opcoes.proporcional=true]  espaço pelo tempo + pílula do intervalo.
 *   false = espaço fixo de 24px e sem pílula.
 * @param {number}  [opcoes.pxPorMes=1.2]  quanto cada mês soma ao espaço (teto de 96px).
 *   O desenho usa 1,2 no M1 (anos entre os marcos), 8 no M3 (meses) e 0,22px por
 *   dia no M2 (semanas), ou seja, pxPorMes: 6.7.
 * @param {boolean|object} [opcoes.legenda]  true = rótulos da vitrine; ou { neutro:'…', alerta:'…', … }.
 * @param {string}  [opcoes.nota]   frase de rodapé, dentro da caixa.
 * @param {boolean} [opcoes.caixa]  true = só a caixa interna, mesmo com `titulo`.
 * @param {string}  [opcoes.id]     (modo antigo) id do card.
 * @param {string}  [opcoes.titulo] (modo antigo) título do card; sem ele, sai só a caixa.
 * @param {string}  [opcoes.descricao] (modo antigo) frase embaixo do título.
 */
export function montarLinhaDoTempo({
  id,
  titulo,
  descricao = '',
  marcos = [],
  nota = '',
  legenda = null,
  proporcional = true,
  pxPorMes = PX_POR_MES_PADRAO,
  caixa = false,
}) {
  const conteudo = montarCaixa({ marcos, nota, legenda, proporcional, pxPorMes });

  // O jeito do desenho: sem título, só a caixa (o card da seção já tem o título).
  if (caixa || !titulo) return conteudo;

  // Modo antigo: card próprio com título, no formato do card de seção do desenho
  // (raio 12, padding 20, 16px entre as peças). Sai quando as telas migrarem.
  return html`<section
    class="flex flex-col gap-4 rounded-card border border-borda bg-superficie p-5"
    aria-labelledby="${id}-titulo"
  >
    <h3 id="${id}-titulo" class="text-lg font-semibold">${titulo}</h3>
    ${descricao ? html`<p class="text-[14px] text-texto-suave">${descricao}</p>` : null}
    ${conteudo}
  </section>`;
}
