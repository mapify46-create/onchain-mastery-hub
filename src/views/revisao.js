// views/revisao.js — a página "Revisão", no desenho "33 Revisao".
//
// As perguntas dos quizzes (e os termos do glossário marcados como estudados)
// voltam em 1, 3, 7, 16 e 35 dias, uma de cada vez, com a sua confiança
// registrada antes da resposta.
//
// A tela, na ordem do desenho:
//   1. Cabeçalho: "Rotina de estudo", título, subtítulo e o quadro "De onde vem".
//   2. A escada: o ciclo dos 5 degraus, com quantas perguntas há em cada um.
//   3. A fila de hoje: de onde vêm as perguntas e a sessão, uma pergunta por
//      vez, já aberta. Sem nada vencido, o card "Nada vencido hoje".
//   4. Calibração: "Quando você tem certeza, acerta?" (barras) e os pontos cegos.
//   5. Próximas revisões: colunas por janela e a lista do que vem.
// O aviso âmbar do fim da página vem do router.js.
//
// A lógica da fila (quando cada pergunta volta) mora em components/revisao.js.
// Aqui é só a tela.

import { modulo1 } from '../data/modulo1.js';
import { modulo2 } from '../data/modulo2.js';
import { modulo3 } from '../data/modulo3.js';
import { modulo4 } from '../data/modulo4.js';
import { modulo5 } from '../data/modulo5.js';
import { modulo6 } from '../data/modulo6.js';
import { modulo7 } from '../data/modulo7.js';
import { glossario } from '../data/glossario.js';
import { criarElemento, criarTitulo, html, svg } from '../ui.js';
import { juntarPorques, navegarComSetas, ajustarTabDoGrupo } from '../components/quiz.js';
import {
  ESCADA_DIAS,
  semear,
  itensVencidos,
  proximosItens,
  registrarRevisao,
  resumoDeCalibracao,
  resumoDaFila,
  diasAte,
} from '../components/revisao.js';
import { obterEstado } from '../store.js';

// ---------------------------------------------------------------------------
// Textos da tela (os do desenho "33 Revisao")
// ---------------------------------------------------------------------------

const ROTULOS_DE_CONFIANCA = { 1: 'Chutei', 2: 'Mais ou menos', 3: 'Tenho certeza' };

// "1, 3, 7, 16 e 35" a partir de uma lista de números.
function juntarComE(numeros) {
  if (numeros.length <= 1) return numeros.join('');
  return numeros.slice(0, -1).join(', ') + ' e ' + numeros[numeros.length - 1];
}

// "1 pergunta" / "9 perguntas".
function contar(quantidade, singular, plural) {
  return quantidade + ' ' + (quantidade === 1 ? singular : plural);
}

// "1 dia" / "3 dias" (os degraus da escada).
function textoDosDias(dias) {
  return dias === 1 ? '1 dia' : dias + ' dias';
}

// "amanhã" / "em 3 dias" (quando uma pergunta volta).
function quandoVolta(dias) {
  return dias <= 1 ? 'amanhã' : 'em ' + dias + ' dias';
}

const DIAS_DA_ESCADA = juntarComE(ESCADA_DIAS);

const TEXTOS = {
  rotulo: 'Rotina de estudo',
  titulo: 'Revisão espaçada',
  subtitulo:
    'As perguntas dos quizzes que você já fez, e os termos do glossário marcados como estudados, voltam em ' +
    DIAS_DA_ESCADA +
    ' dias, conforme você acerta. Errou, volta amanhã. Responder de novo, dias depois, é o que faz o ' +
    'conteúdo ficar — reler não faz.',
  deOndeVem:
    'espaçar as revisões tem uma das evidências mais fortes da ciência da aprendizagem ' +
    '(meta-análises de Cepeda et al., 2006, e Latimier et al., 2021). A escada de dias é ' +
    'derivada da teoria, não testada nessa forma exata. Os algoritmos dos apps de cartões ' +
    'só preveem melhor a memória; nenhum experimento mostrou que ensinem mais que uma ' +
    'escada fixa.',

  escada: {
    titulo: 'A escada, e onde cada pergunta está',
    rotulo: 'Relação: o que se repete',
    ideia: 'Acertou, sobe um degrau. Errou, volta ao primeiro — e a pergunta reaparece amanhã.',
    centro: 'errou: volta ao degrau 1',
    legenda: {
      sobe: 'acertou: sobe um degrau',
      volta: 'errou: volta ao primeiro',
      vencida: 'tem pergunta vencida aqui',
    },
    nota:
      'O primeiro degrau nunca é "hoje": a primeira revisão no mesmo dia vira releitura, e releitura ' +
      'ensina pouco. A fila sai misturada entre os módulos de propósito — intercalar tipos de ' +
      'pergunta ajuda a distinguir conceitos parecidos.',
  },

  fila: {
    paragrafo:
      'Misturadas entre os módulos, de propósito. Antes de responder, diga quão certo você está: ' +
      'é isso que mostra depois onde a sua certeza engana.',
    tituloDasOrigens: 'De onde vêm as perguntas da fila',
    origens: {
      quizzes: {
        rotulo: 'Perguntas dos quizzes dos módulos',
        nota: 'Entram quando o quiz é corrigido, e a primeira volta amanhã.',
      },
      glossario: {
        rotulo: 'Termos do glossário marcados como estudados',
        nota: 'Cada termo entra com duas perguntas: uma da definição e outra do exemplo.',
      },
      respondidas: {
        rotulo: 'Já respondidas antes, subindo a escada',
        nota: 'Reagendadas conforme você acertou.',
      },
    },
    legendaDasOrigens: (naFila) =>
      'Mesma escala, sobre ' +
      (naFila === 1 ? 'a 1 pergunta' : 'as ' + naFila + ' perguntas') +
      ' da fila. Cada termo do glossário marcado como estudado entra com duas perguntas ' +
      '— uma da definição e outra do exemplo — e volta em 1 dia.',
  },

  sessao: {
    confianca: 'Quão certo você está? (obrigatório)',
    responder: 'Responder',
    proxima: 'Próxima',
    verResumo: 'Ver o resumo',
    dicaInicial: 'Escolha uma alternativa e diga quão certo você está.',
    dicaFaltaConfianca: 'Falta dizer quão certo você está — é obrigatório antes de ver a resposta.',
    dicaPronto: 'Pronto: pode responder.',
    dicaProxima: 'A próxima vem misturada, de outro módulo.',
    certa: 'Esta é a certa.',
    sua: 'Foi a sua.',
    acertou: 'Isso.',
    errou: 'Não foi essa.',
    porque: 'Por que a sua não serve: ',
    certezaEErro: 'Certeza e erro: ',
    certezaEErroTexto: 'é a explicação que mais vale reler. Esta volta amanhã.',
    // O resumo do fim da sessão (função do app que o desenho não mostra).
    concluir: 'Concluir',
    fimDaSessao:
      'O que acertou volta mais tarde; o que errou volta amanhã. O placar abaixo mostra se a sua ' +
      'certeza combina com o seu acerto.',
  },

  vazio: {
    titulo: 'Nada vencido hoje',
    semFila: 'Responda o quiz de um módulo. As perguntas dele entram aqui e a primeira volta amanhã.',
    comFila: 'As perguntas voltam conforme você acerta: ' + DIAS_DA_ESCADA + ' dias. Errou, volta amanhã.',
    abrirModulo: 'Abrir um módulo →',
    marcarTermos: 'Marcar termos no Glossário →',
  },

  calibracao: {
    titulo: 'Quando você tem certeza, acerta?',
    paragrafo:
      'Conta a última resposta de cada pergunta. Com poucas respostas isso oscila muito; de 50 para ' +
      'cima começa a dizer algo. O que importa é a linha "tenho certeza": se ela ficar longe de ' +
      '100%, a sua certeza está enganando você.',
    semResposta: 'ainda sem resposta',
    notaSemResposta: 'Responda a fila de hoje para esta linha aparecer.',
    notaCertezaEnganando: 'É a linha que importa: longe de 100%, a sua certeza está enganando você.',
    notaCertezaCombina: 'Certeza e acerto combinam nesta amostra.',
    notaErroEsperado: 'Aqui o erro é esperado — o problema é errar com certeza.',
    acertou: 'acertou',
    errou: 'errou',
    legenda: 'Cada barra é 100% das respostas daquele nível de confiança. A linha de cima é a que importa.',
    tituloDosPontosCegos: 'Pontos cegos: erros feitos com certeza',
    pontosCegos: (n) =>
      n === 1
        ? '1 erro feito com certeza. Ele volta amanhã: releia a explicação antes.'
        : n + ' erros feitos com certeza. Eles voltam amanhã: releia as explicações antes.',
  },

  proximas: {
    titulo: 'Próximas revisões',
    legenda:
      'Quantas perguntas voltam em cada janela, na mesma escala. Quem sobe de degrau vai para a ' +
      'coluna seguinte; quem erra volta para "amanhã".',
  },
};

// ---------------------------------------------------------------------------
// Visual (tokens do README do handoff, as medidas do desenho)
// ---------------------------------------------------------------------------

const FONTE_MONO = "'JetBrains Mono',ui-monospace,monospace";

// Card de cada bloco: raio 12, superfície, borda, 20px por dentro.
const ESTILO_CARD =
  'border-radius:12px;border:1px solid #1F2733;background:#141A24;padding:20px;display:flex;flex-direction:column';
// A caixa escura dos visuais, dentro do card.
const ESTILO_FIGURA = 'margin:0;border-radius:8px;border:1px solid #1F2733;background:#0B0F17;padding:16px 20px;min-width:0';
const ESTILO_H2 = 'margin:0;font-size:1.125rem;font-weight:600';
const ESTILO_MICRO = 'margin:0;font-size:12px;font-weight:600;letter-spacing:.05em;text-transform:uppercase;color:#9AA7B4';
const ESTILO_LINHA_DO_TITULO = 'display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;align-items:baseline';
const ESTILO_PARAGRAFO = 'margin:0;color:#9AA7B4';
const ESTILO_NOTA = 'margin:0;font-size:13px;color:#9AA7B4';

// Cores de estado sempre em trio: borda meio transparente + fundo bem transparente.
const TRIO = {
  verde: 'border:1px solid rgba(34,197,94,.5);background:rgba(34,197,94,.12)',
  vermelho: 'border:1px solid rgba(239,68,68,.5);background:rgba(239,68,68,.12)',
  ambar: 'border:1px solid rgba(245,158,11,.4);background:rgba(245,158,11,.12)',
};

// Em botões a altura de linha é a "normal" do navegador, como no desenho (os
// botões do desenho não herdam o 1,6 do corpo). A transição é de 150ms, "ease".
const LINHA_BOTAO = 'leading-[normal]';
const TRANSICAO = 'transition-colors duration-150 ease-[ease]';

// Um card com rótulo para o leitor de tela (o mesmo aria-label do desenho).
function criarSecao(rotuloAria, filhos, { espaco = 16, estilo = '' } = {}) {
  return criarElemento(
    'section',
    { 'aria-label': rotuloAria, style: ESTILO_CARD + ';gap:' + espaco + 'px' + (estilo ? ';' + estilo : '') },
    filhos,
  );
}

// Título do card à esquerda e, à direita, o que o desenho põe ali (rótulo ou contagem).
function linhaDoTitulo(titulo, ladoDireito = null) {
  return html`<div style="${ESTILO_LINHA_DO_TITULO}"><h2 tabindex="-1" style="${ESTILO_H2};outline:none">${titulo}</h2>${ladoDireito}</div>`;
}

// Link com cara de botão, como "Abrir um módulo →". No desenho a altura mínima
// de 44px não conta o padding nem a borda (content-box): o link sai com 62px.
function criarLinkBotao(texto, href) {
  return criarElemento(
    'a',
    {
      href,
      class: 'border-borda hover:border-texto-suave ' + TRANSICAO,
      style:
        'box-sizing:content-box;min-height:44px;display:inline-flex;align-items:center;border-radius:8px;border-width:1px;border-style:solid;' +
        'background:#0B0F17;color:#E6EDF3;padding:8px 16px;font-size:14px;font-weight:600;text-decoration:none',
    },
    [texto],
  );
}

// ---------------------------------------------------------------------------
// As perguntas: dos quizzes dos módulos e do glossário
// ---------------------------------------------------------------------------

// Todas as perguntas de todos os módulos, já com o "por que a errada não serve".
const MODULOS = [modulo1, modulo2, modulo3, modulo4, modulo5, modulo6, modulo7];
const CATALOGO = Object.fromEntries(
  MODULOS.map((modulo) => [modulo.id, juntarPorques(modulo.quiz ?? [], modulo.porqueErradas ?? {})]),
);

// "Módulo 6" ou "Glossário": de onde a pergunta vem.
function origemDoItem(item) {
  return item.moduloId === 'glossario' ? 'Glossário' : item.moduloId.replace('modulo-', 'Módulo ');
}

// O termo do glossário e a variante ('def' = da definição, 'ex' = do exemplo).
function termoDoItem(item) {
  const [termoId, variante] = item.perguntaId.split('~');
  return { termo: glossario.find((termo) => termo.id === termoId) ?? null, variante };
}

// A pergunta do item ainda existe nos dados? (Se um arquivo de dados mudar, uma
// pergunta antiga da fila pode não existir mais: ela fica de fora da tela.)
function perguntaExiste(item) {
  if (item.moduloId === 'glossario') return Boolean(termoDoItem(item).termo);
  return Boolean(CATALOGO[item.moduloId]?.some((pergunta) => pergunta.id === item.perguntaId));
}

function sortear(lista) {
  const copia = [...lista];
  for (let i = copia.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

// Perguntas do glossário, montadas na hora a partir da definição e do exemplo de
// cada termo: duas versões por termo, para a revisão não virar decoreba de uma
// frase só, e três alternativas — a certa e dois termos da mesma categoria. O
// cache mantém a mesma pergunta durante a visita.
const perguntasDoGlossario = new Map();
function perguntaDoGlossario(item) {
  if (perguntasDoGlossario.has(item.perguntaId)) return perguntasDoGlossario.get(item.perguntaId);

  const { termo, variante } = termoDoItem(item);
  if (!termo) return null;

  const mesmaCategoria = glossario.filter(
    (outro) => outro.id !== termo.id && outro.categorias.some((categoria) => termo.categorias.includes(categoria)),
  );
  const candidatos = mesmaCategoria.length >= 2 ? mesmaCategoria : glossario.filter((outro) => outro.id !== termo.id);
  const errados = sortear(candidatos).slice(0, 2);

  const pergunta = {
    id: item.perguntaId,
    pergunta:
      variante === 'ex'
        ? 'Qual termo descreve esta situação? "' + termo.exemplo + '"'
        : 'Qual termo é este? "' + termo.definicao + '"',
    alternativas: sortear([termo, ...errados]).map((outro) => ({
      id: outro.id,
      texto: outro.termo,
      porque: outro.id === termo.id ? undefined : 'Isso é ' + outro.termo + ': ' + outro.definicao,
    })),
    correta: termo.id,
    explicacao: termo.termo + ': ' + termo.definicao + ' Alerta: ' + termo.alerta,
  };
  perguntasDoGlossario.set(item.perguntaId, pergunta);
  return pergunta;
}

function perguntaDoItem(item) {
  if (item.moduloId === 'glossario') return perguntaDoGlossario(item);
  return CATALOGO[item.moduloId]?.find((pergunta) => pergunta.id === item.perguntaId) ?? null;
}

// A pergunta em uma linha, para as listas (pontos cegos e próximas revisões).
// No glossário, a forma curta do desenho: "Honeypot — o que o exemplo mostra?".
// (Na sessão a pergunta é outra: lá o nome do termo é a resposta.)
function perguntaEmUmaLinha(item) {
  if (item.moduloId === 'glossario') {
    const { termo, variante } = termoDoItem(item);
    if (!termo) return item.perguntaId;
    return termo.termo + (variante === 'ex' ? ' — o que o exemplo mostra?' : ' — o que a definição diz?');
  }
  return perguntaDoItem(item)?.pergunta ?? item.perguntaId;
}

// Quizzes corrigidos antes de a Revisão existir: as perguntas entram já vencidas.
function semearQuizzesAntigos() {
  const estado = obterEstado();
  const entradas = Object.keys(estado.quizzes ?? {})
    .filter((id) => CATALOGO[id])
    .map((id) => ({ moduloId: id, perguntas: CATALOGO[id] }));
  if (entradas.length) semear(entradas, { primeiraEmDias: 0 });

  // Termos marcados como estudados antes de a Revisão existir.
  const termos = Object.keys(estado.glossario ?? {}).filter((id) => glossario.some((termo) => termo.id === id));
  if (termos.length) {
    semear(
      [{ moduloId: 'glossario', perguntas: termos.flatMap((id) => [{ id: id + '~def' }, { id: id + '~ex' }]) }],
      { primeiraEmDias: 0 },
    );
  }
}

// ---------------------------------------------------------------------------
// 1. Cabeçalho
// ---------------------------------------------------------------------------

function montarCabecalho() {
  const cabecalho = criarTitulo(TEXTOS.titulo, { rotulo: TEXTOS.rotulo, subtitulo: TEXTOS.subtitulo });
  // No desenho, o espaço até o card seguinte é o da coluna (24px), e o
  // micro-rótulo tem a altura de linha do corpo (1,6).
  cabecalho.classList.remove('mb-6');
  cabecalho.firstElementChild?.classList.add('leading-[1.6]');
  cabecalho.append(
    html`<p style="margin:16px 0 0;border-radius:12px;${TRIO.ambar};padding:12px 16px;font-size:14px;color:#9AA7B4"><strong style="color:#E6EDF3">De onde vem: </strong>${TEXTOS.deOndeVem}</p>`,
  );
  return cabecalho;
}

// ---------------------------------------------------------------------------
// 2. A escada, e onde cada pergunta está
// ---------------------------------------------------------------------------

// A geometria do desenho "33 Revisao": palco de 360px com o centro em 180,
// raio 122, caixas de 112px (o centro delas fica entre x = 68 e x = 292, para a
// caixa não passar da borda) e arcos que param 26° antes e depois de cada caixa.
// É fixa, como no desenho. No celular o palco não encolhe (o texto ficaria
// miúdo): quem rola para o lado é a caixa escura, e a página nunca rola.
const ESCADA = { lado: 360, raio: 122, caixa: 112, folga: 26, xMinimo: 68, xMaximo: 292 };

// O palco da escada: os degraus em círculo (o 1 no alto), as setas cinza de
// "acertou", a seta 5 → 1 tracejada em vermelho ("errou") e o texto do centro.
// `degraus`: [{ dias, texto, vencidas }]; a caixa com vencidas fica ciano.
function criarPalcoDaEscada(degraus, descricao) {
  const { lado, raio, caixa, folga, xMinimo, xMaximo } = ESCADA;
  const meio = lado / 2;
  const n = degraus.length;
  const GRAU = Math.PI / 180;
  const angulo = (i) => (-90 + (i * 360) / n) * GRAU;
  const ponto = (a) => ({ x: meio + raio * Math.cos(a), y: meio + raio * Math.sin(a) });

  // Um arco de cada degrau até o seguinte. angulo(n) é o do degrau 1 mais uma
  // volta inteira: assim o último arco (5 → 1) também anda no sentido horário.
  const arcos = degraus.map((_, i) => {
    const inicio = ponto(angulo(i) + folga * GRAU);
    const fim = ponto(angulo(i + 1) - folga * GRAU);
    const erro = i === n - 1;
    return svg`<path d="M${inicio.x.toFixed(1)},${inicio.y.toFixed(1)} A${raio},${raio} 0 0 1 ${fim.x.toFixed(1)},${fim.y.toFixed(1)}" fill="none" stroke="${erro ? '#EF4444' : '#9AA7B4'}" stroke-width="2" stroke-dasharray="${erro ? '6 5' : 'none'}" marker-end="url(#${erro ? 'revisao-seta-erro' : 'revisao-seta'})"></path>`;
  });

  const caixas = degraus.map((degrau, i) => {
    const p = ponto(angulo(i));
    const x = Math.min(xMaximo, Math.max(xMinimo, p.x));
    const vencida = degrau.vencidas > 0;
    return html`<div style="position:absolute;left:${x.toFixed(1)}px;top:${p.y.toFixed(1)}px;transform:translate(-50%,-50%);width:${caixa}px;box-sizing:border-box;border-radius:8px;border:1px solid ${vencida ? '#22D3EE' : '#1F2733'};background:${vencida ? 'rgba(34,211,238,.1)' : '#141A24'};padding:8px;text-align:center">
      <span aria-hidden="true" style="display:inline-flex;width:22px;height:22px;border-radius:50%;background:${vencida ? '#22D3EE' : '#1F2733'};color:${vencida ? '#0B0F17' : '#E6EDF3'};font-family:${FONTE_MONO};font-size:12px;font-weight:700;align-items:center;justify-content:center">${String(i + 1)}</span>
      <p style="margin:4px 0 0;font-family:${FONTE_MONO};font-size:13px;font-weight:600">${textoDosDias(degrau.dias)}</p>
      <p style="margin:2px 0 0;font-size:11px;color:${vencida ? '#22D3EE' : '#9AA7B4'}">${degrau.texto}</p>
    </div>`;
  });

  return html`<div role="img" aria-label="${descricao}" style="position:relative;width:${lado}px;height:${lado}px;margin:0 auto">
    <svg viewBox="0 0 ${lado} ${lado}" width="${lado}" height="${lado}" aria-hidden="true" style="position:absolute;inset:0">
      <defs>
        <marker id="revisao-seta" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#9AA7B4"></path></marker>
        <marker id="revisao-seta-erro" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#EF4444"></path></marker>
      </defs>
      ${arcos}
    </svg>
    ${caixas}
    <p style="position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);margin:0;text-align:center;font-size:11px;color:#F87171;max-width:104px;line-height:1.3">${TEXTOS.escada.centro}</p>
  </div>`;
}

// Quando o palco não cabe (celular), a caixa escura rola para o lado: entra no
// Tab (as setas do teclado rolam) e começa centrada, com as duas pontas
// cortadas por igual. Quando cabe, sai do Tab. (Mede a própria caixa, nunca a
// janela.)
function rolarQuandoNaoCouber(caixa) {
  if (typeof ResizeObserver !== 'function') {
    caixa.setAttribute('tabindex', '0');
    return caixa;
  }

  // Mede a caixa e decide: sobrou largura, ela entra no Tab (e começa centrada);
  // coube, ela sai do Tab.
  let jaCentrou = false;
  function ajustar() {
    const sobra = caixa.scrollWidth - caixa.clientWidth;
    if (sobra > 1) {
      caixa.setAttribute('tabindex', '0');
      if (!jaCentrou) caixa.scrollLeft = sobra / 2;
      jaCentrou = true;
    } else {
      caixa.removeAttribute('tabindex');
    }
  }

  // O primeiro ajuste NÃO pode depender do ResizeObserver: em parte dos
  // carregamentos o primeiro aviso dele não chega, e a caixa ficava transbordando
  // fora do Tab — o degrau cortado na borda não tinha como ser alcançado pelo
  // teclado. Então medimos assim que a caixa entra na página. Como ela é montada
  // antes de ser anexada, tentamos de novo enquanto ainda não tiver largura
  // (no máximo 20 tentativas, ~320ms).
  let tentativas = 20;
  function medirQuandoEntrarNaPagina() {
    if (!caixa.isConnected || caixa.clientWidth === 0) {
      tentativas -= 1;
      if (tentativas > 0) setTimeout(medirQuandoEntrarNaPagina, 16);
      return;
    }
    ajustar();
  }
  setTimeout(medirQuandoEntrarNaPagina, 0);

  // Daí em diante é o ResizeObserver que avisa (girar o celular, mudar a janela).
  new ResizeObserver(ajustar).observe(caixa);
  return caixa;
}

function montarCardDaEscada(resumo) {
  const degraus = ESCADA_DIAS.map((dias, i) => {
    const quantas = resumo.porDegrau[i];
    const vencidas = resumo.vencidasPorDegrau[i];
    const texto =
      quantas === 0
        ? 'sem perguntas'
        : contar(quantas, 'pergunta', 'perguntas') + (vencidas > 0 ? ' · ' + contar(vencidas, 'vencida', 'vencidas') : '');
    return { dias, texto, vencidas };
  });

  // O número de degraus por extenso, como no desenho ("Escada de cinco degraus: …").
  const porExtenso = { 3: 'três', 4: 'quatro', 5: 'cinco', 6: 'seis', 7: 'sete' }[ESCADA_DIAS.length] ?? ESCADA_DIAS.length;

  const descricao =
    'Escada de ' +
    porExtenso +
    ' degraus: ' +
    degraus.map((degrau, i) => 'degrau ' + (i + 1) + ', ' + textoDosDias(degrau.dias) + ', ' + degrau.texto).join('; ') +
    '. Acertou sobe um degrau; errou volta ao degrau 1, e a pergunta reaparece amanhã.';

  // A caixa escura do desenho, com o palco centrado. Ela é quem rola no celular.
  const ciclo = rolarQuandoNaoCouber(
    html`<div style="border-radius:8px;border:1px solid #1F2733;background:#0B0F17;padding:20px;overflow-x:auto">${criarPalcoDaEscada(degraus, descricao)}</div>`,
  );

  // O quadrado de "vencida" tem 12px por dentro e 1px de borda, 14px no total
  // (content-box, como no desenho).
  const legenda = html`<div style="display:flex;flex-wrap:wrap;gap:14px;font-size:13px;color:#9AA7B4">
    <span style="display:inline-flex;align-items:center;gap:6px"><span aria-hidden="true" style="width:22px;height:2px;background:#9AA7B4"></span>${TEXTOS.escada.legenda.sobe}</span>
    <span style="display:inline-flex;align-items:center;gap:6px"><span aria-hidden="true" style="width:22px;height:0;border-top:2px dashed #EF4444"></span>${TEXTOS.escada.legenda.volta}</span>
    <span style="display:inline-flex;align-items:center;gap:6px"><span aria-hidden="true" style="box-sizing:content-box;width:12px;height:12px;border-radius:3px;border:1px solid #22D3EE;background:rgba(34,211,238,.1)"></span>${TEXTOS.escada.legenda.vencida}</span>
  </div>`;

  return criarSecao('A escada dos intervalos', [
    linhaDoTitulo(TEXTOS.escada.titulo, html`<span style="${ESTILO_MICRO}">${TEXTOS.escada.rotulo}</span>`),
    html`<p style="margin:0;border-left:2px solid #22D3EE;padding-left:12px;font-weight:600;text-wrap:pretty">${TEXTOS.escada.ideia}</p>`,
    ciclo,
    legenda,
    html`<p style="${ESTILO_NOTA}">${TEXTOS.escada.nota}</p>`,
  ]);
}

// ---------------------------------------------------------------------------
// 3. A fila de hoje: de onde vêm as perguntas, e a sessão
// ---------------------------------------------------------------------------

// Três barras na mesma escala (o total da fila): quizzes, glossário e as já
// respondidas. As três somam o total.
function montarOrigens(resumo) {
  const naFila = resumo.total;
  const cores = { quizzes: '#7C3AED', glossario: '#22D3EE', respondidas: '#22C55E' };
  const itens = ['quizzes', 'glossario', 'respondidas'].map((chave) => ({
    ...TEXTOS.fila.origens[chave],
    quantas: resumo.origens[chave],
    cor: cores[chave],
  }));
  const alternativa =
    (naFila === 1 ? 'Origem da 1 pergunta da fila: ' : 'Origem das ' + naFila + ' perguntas da fila: ') +
    itens.map((item) => item.rotulo + ', ' + item.quantas).join('; ') +
    '.';

  return html`<figure style="${ESTILO_FIGURA}">
    <p style="margin:0 0 10px;font-size:14px;font-weight:600">${TEXTOS.fila.tituloDasOrigens}</p>
    <div role="img" aria-label="${alternativa}" style="display:flex;flex-direction:column;gap:10px">
      ${itens.map(
        (item) => html`<div>
          <div style="${ESTILO_LINHA_DO_TITULO}"><span style="font-size:14px">${item.rotulo}</span><span style="font-family:${FONTE_MONO};font-size:13px;color:#9AA7B4">${item.quantas + ' de ' + naFila}</span></div>
          <div style="margin-top:4px;height:16px;background:#141A24;border-radius:3px;overflow:hidden"><div style="height:100%;width:${naFila ? (item.quantas / naFila) * 100 : 0}%;background:${item.cor}"></div></div>
          <p style="margin:4px 0 0;font-size:13px;color:#9AA7B4">${item.nota}</p>
        </div>`,
      )}
    </div>
    <figcaption style="margin-top:10px;font-size:13px;color:#9AA7B4">${TEXTOS.fila.legendaDasOrigens(naFila)}</figcaption>
  </figure>`;
}

// Para onde a pergunta vai depois de respondida (a mesma conta de registrarRevisao).
function textoDoReagendamento(item, acertou) {
  if (!acertou) return 'Errou: volta ao degrau 1 e reaparece amanhã.';
  const novoDegrau = Math.min(item.degrau + 1, ESCADA_DIAS.length - 1);
  const dias = ESCADA_DIAS[novoDegrau];
  // No último degrau não há para onde subir: a pergunta fica nele.
  const verbo = novoDegrau === item.degrau ? 'continua no degrau ' : 'sobe para o degrau ';
  return 'Acertou: ' + verbo + (novoDegrau + 1) + ' e volta ' + quandoVolta(dias) + '.';
}

// Uma alternativa: botão com role="radio", o círculo de 20px e, depois de
// corrigir, a marca "Esta é a certa." / "Foi a sua." embaixo do texto.
function criarAlternativa(texto, atributos) {
  const circulo = criarElemento('span', { 'aria-hidden': 'true' });
  const marca = criarElemento('span', {});
  const botao = criarElemento('button', { type: 'button', role: 'radio', style: 'border-radius:8px', ...atributos }, [
    circulo,
    criarElemento('span', { style: 'min-width:0' }, [texto, marca]),
  ]);
  return { botao, circulo, marca };
}

// Marca (ou desmarca) um botão como travado para o leitor de tela, sem tirá-lo
// do Tab. Quem ignora o clique é o próprio onclick.
function travar(botao, travado) {
  if (travado) botao.setAttribute('aria-disabled', 'true');
  else botao.removeAttribute('aria-disabled');
}

// Pinta uma alternativa no traço do desenho da Revisão. Antes de corrigir, a
// escolhida fica roxa. Depois: a certa fica verde com "Esta é a certa."; a
// escolhida errada fica vermelha (texto #F87171) com "Foi a sua."; as outras
// ficam como estavam.
function pintarAlternativa({ botao, circulo, marca }, { escolhida, certa, corrigida }) {
  let cor = escolhida ? 'border-primaria bg-primaria/15 text-texto' : 'border-borda bg-superficie text-texto';
  let textoDaMarca = '';
  let corDaMarca = '';
  if (corrigida && certa) {
    cor = 'border-risco-baixo/50 bg-risco-baixo/12 text-texto';
    textoDaMarca = TEXTOS.sessao.certa;
    corDaMarca = 'text-risco-baixo';
  } else if (corrigida && escolhida) {
    cor = 'border-risco-alto/50 bg-risco-alto/12 text-risco-alto-texto';
    textoDaMarca = TEXTOS.sessao.sua;
    corDaMarca = 'text-risco-alto-texto';
  }

  botao.className =
    'flex min-h-11 w-full items-start gap-2.5 border px-3.5 py-2.5 text-left text-sm ' +
    LINHA_BOTAO + ' ' + TRANSICAO + ' ' + cor +
    (corrigida ? ' cursor-default' : ' cursor-pointer') +
    (!corrigida && !escolhida ? ' hover:border-texto-suave' : '');

  // 20px por dentro + 2px de borda: o tamanho com que o círculo aparece no desenho.
  circulo.className =
    'mt-px h-6 w-6 shrink-0 rounded-full border-2 ' +
    (escolhida ? 'border-primaria bg-primaria' : 'border-texto-suave bg-transparent');

  marca.textContent = textoDaMarca;
  marca.className = 'mt-1 block text-xs font-semibold ' + LINHA_BOTAO + ' ' + corDaMarca;
  marca.style.display = textoDaMarca ? '' : 'none';
}

/**
 * A sessão: uma pergunta por vez, dentro da caixa roxa do desenho. A correção
 * acontece no lugar (as alternativas ficam, com as marcas), e o botão
 * "Responder" vira "Próxima". No fim, o resumo da sessão.
 *
 * @param {Array}    fila             Os itens vencidos, na ordem da sessão.
 * @param {Function} aoFimDaSessao    Chamada quando a última pergunta é respondida
 *                                    (para atualizar a escada, o placar e as próximas).
 * @param {Function} aoConcluir       Chamada pelo botão "Concluir" do resumo.
 */
function montarSessao(fila, { aoFimDaSessao, aoConcluir }) {
  const caixa = criarElemento('div', {
    style:
      'border-radius:8px;border:1px solid rgba(124,58,237,.6);background:rgba(124,58,237,.08);' +
      'padding:20px;display:flex;flex-direction:column;gap:14px',
  });

  let indice = 0;
  let acertos = 0;
  let errosComCerteza = 0;

  function mostrarPergunta({ focar = false } = {}) {
    const item = fila[indice];
    const pergunta = perguntaDoItem(item);
    const seguinte = fila[indice + 1] ?? null;
    let escolhida = null;
    let confianca = null;
    let corrigida = false;
    let acertou = false;

    const idDoTexto = 'revisao-pergunta-' + indice;
    const idDaConfianca = 'revisao-confianca-' + indice;

    // "Pergunta 1 de 7" e o chip "Módulo 6 · degrau 2" (o degrau em que ela está
    // agora; o store guarda de 0 a 4, a tela mostra de 1 a 5).
    const passo = criarElemento('p', { tabindex: '-1', style: ESTILO_MICRO + ';outline:none' });
    const chip = html`<span style="border-radius:999px;border:1px solid #1F2733;background:#141A24;padding:1px 10px;font-size:12px;color:#9AA7B4">${origemDoItem(item) + ' · degrau ' + (item.degrau + 1)}</span>`;

    const alternativas = pergunta.alternativas.map((alternativa) => ({
      alternativa,
      ...criarAlternativa(alternativa.texto, {
        'aria-checked': 'false',
        onclick: () => {
          if (corrigida) return;
          escolhida = alternativa.id;
          pintar();
        },
        onkeydown: (evento) => navegarComSetas(evento, alternativas.map((a) => a.botao)),
      }),
    }));

    const pilulas = [1, 2, 3].map((nivel) =>
      criarElemento(
        'button',
        {
          type: 'button',
          role: 'radio',
          'aria-checked': 'false',
          style: 'border-radius:999px',
          onclick: () => {
            if (corrigida) return;
            confianca = nivel;
            pintar();
          },
          onkeydown: (evento) => navegarComSetas(evento, pilulas),
        },
        [ROTULOS_DE_CONFIANCA[nivel]],
      ),
    );

    // "Responder" → corrige; depois vira "Próxima" (ou "Ver o resumo" na última).
    const botao = criarElemento(
      'button',
      {
        type: 'button',
        style: 'border-radius:8px',
        class:
          'min-h-11 border border-primaria bg-primaria px-5 py-2.5 text-[15px] font-semibold text-white ' +
          LINHA_BOTAO + ' ' + TRANSICAO +
          ' enabled:cursor-pointer enabled:hover:bg-primaria/85 disabled:cursor-not-allowed disabled:opacity-50',
        onclick: () => (corrigida ? avancar() : responder()),
      },
      [TEXTOS.sessao.responder],
    );
    const dica = criarElemento('span', { role: 'status', style: 'font-size:13px;color:#9AA7B4' });

    // A caixa de feedback fica sempre na página (vazia antes de corrigir), para o
    // leitor de tela anunciar o que entrar nela.
    const feedback = criarElemento('div', { 'aria-live': 'polite' });

    function responder() {
      if (!escolhida || !confianca) return;
      corrigida = true;
      acertou = escolhida === pergunta.correta;
      if (acertou) acertos += 1;
      else if (confianca === 3) errosComCerteza += 1;
      registrarRevisao(item.chave, acertou, confianca);
      pintar();
    }

    function preencherFeedback() {
      const marcada = pergunta.alternativas.find((alternativa) => alternativa.id === escolhida);
      const pontoCego = !acertou && confianca === 3;
      feedback.style.cssText =
        'margin-top:14px;border-radius:8px;' + (acertou ? TRIO.verde : TRIO.vermelho) +
        ';padding:14px 16px;display:flex;flex-direction:column;gap:8px';
      feedback.replaceChildren(
        ...[
          html`<p style="margin:0;font-size:15px;font-weight:600;color:${acertou ? '#22C55E' : '#F87171'}">${acertou ? TEXTOS.sessao.acertou : TEXTOS.sessao.errou}</p>`,
          html`<p style="margin:0;font-size:14px">${pergunta.explicacao}</p>`,
          // Como no quiz (desenho 34, com as mesmas medidas de lá): por que a
          // alternativa marcada não serve. O desenho da Revisão não tem esta
          // caixa; a auditoria recomendou mantê-la, por coerência com o quiz.
          !acertou && marcada?.porque
            ? html`<p style="margin:0;border-radius:6px;${TRIO.vermelho};padding:10px 12px;font-size:14px"><strong style="color:#E6EDF3">${TEXTOS.sessao.porque}</strong>${marcada.porque}</p>`
            : null,
          pontoCego
            ? html`<p style="margin:0;border-radius:6px;${TRIO.ambar};padding:8px 10px;font-size:14px"><strong style="color:#E6EDF3">${TEXTOS.sessao.certezaEErro}</strong>${TEXTOS.sessao.certezaEErroTexto}</p>`
            : null,
          html`<p style="margin:0;font-size:13px;color:#9AA7B4">${textoDoReagendamento(item, acertou)}</p>`,
        ].filter(Boolean),
      );
    }

    function pintar() {
      passo.textContent = 'Pergunta ' + (indice + 1) + ' de ' + fila.length + (corrigida ? ' · corrigida' : '');

      // Depois de corrigir, as alternativas e as pílulas travam com
      // aria-disabled (o clique já é ignorado), e não com disabled: assim
      // continuam no Tab, e o teclado alcança "Esta é a certa." e "Foi a sua.".
      for (const opcao of alternativas) {
        const estaEscolhida = opcao.alternativa.id === escolhida;
        pintarAlternativa(opcao, { escolhida: estaEscolhida, certa: opcao.alternativa.id === pergunta.correta, corrigida });
        opcao.botao.setAttribute('aria-checked', String(estaEscolhida));
        travar(opcao.botao, corrigida);
      }
      ajustarTabDoGrupo(
        alternativas.map((opcao) => opcao.botao),
        alternativas.findIndex((opcao) => opcao.alternativa.id === escolhida),
      );

      pilulas.forEach((pilula, i) => {
        const estaEscolhida = confianca === i + 1;
        pilula.className =
          'min-h-11 border px-4 py-2 text-sm font-semibold text-texto ' + LINHA_BOTAO + ' ' + TRANSICAO + ' ' +
          (estaEscolhida ? 'border-acento bg-acento/12' : 'border-borda bg-superficie') +
          (corrigida ? ' cursor-default' : ' cursor-pointer') +
          (!corrigida && !estaEscolhida ? ' hover:border-texto-suave' : '');
        pilula.setAttribute('aria-checked', String(estaEscolhida));
        travar(pilula, corrigida);
      });
      ajustarTabDoGrupo(pilulas, confianca ? confianca - 1 : -1);

      // O botão e a dica de 3 estados (antes) ou do que vem depois (corrigida).
      botao.disabled = !corrigida && !(escolhida && confianca);
      botao.textContent = !corrigida ? TEXTOS.sessao.responder : seguinte ? TEXTOS.sessao.proxima : TEXTOS.sessao.verResumo;
      let textoDaDica = TEXTOS.sessao.dicaInicial;
      if (corrigida) textoDaDica = seguinte && seguinte.moduloId !== item.moduloId ? TEXTOS.sessao.dicaProxima : '';
      else if (escolhida) textoDaDica = confianca ? TEXTOS.sessao.dicaPronto : TEXTOS.sessao.dicaFaltaConfianca;
      if (dica.textContent !== textoDaDica) dica.textContent = textoDaDica;

      if (corrigida) preencherFeedback();
    }

    caixa.replaceChildren(
      html`<div style="${ESTILO_LINHA_DO_TITULO}">${passo}${chip}</div>`,
      criarElemento('p', { id: idDoTexto, style: 'margin:0;font-size:1.0625rem;font-weight:600;text-wrap:pretty' }, [
        pergunta.pergunta,
      ]),
      criarElemento(
        'div',
        { role: 'radiogroup', 'aria-labelledby': idDoTexto, style: 'display:flex;flex-direction:column;gap:8px' },
        alternativas.map((opcao) => opcao.botao),
      ),
      criarElemento('div', {}, [
        criarElemento('p', { id: idDaConfianca, style: ESTILO_MICRO + ';margin:0 0 6px' }, [TEXTOS.sessao.confianca]),
        criarElemento(
          'div',
          { role: 'radiogroup', 'aria-labelledby': idDaConfianca, style: 'display:flex;flex-wrap:wrap;gap:8px' },
          pilulas,
        ),
      ]),
      // O botão e o feedback no mesmo bloco: o feedback entra 14px abaixo.
      criarElemento('div', {}, [
        criarElemento('div', { style: 'display:flex;flex-wrap:wrap;gap:12px;align-items:center' }, [botao, dica]),
        feedback,
      ]),
    );
    pintar();
    // Da segunda pergunta em diante, o foco vai para o topo da pergunta nova
    // (o teclado e o leitor de tela continuam dali).
    if (focar) passo.focus();
  }

  function avancar() {
    indice += 1;
    if (indice < fila.length) mostrarPergunta({ focar: true });
    else mostrarResumo();
  }

  // O resumo do fim da sessão, na mesma caixa roxa.
  function mostrarResumo() {
    const topo = html`<p tabindex="-1" style="margin:0;font-size:1.125rem;font-weight:600;outline:none">${'Você acertou ' + acertos + ' de ' + fila.length + '.'}</p>`;
    caixa.replaceChildren(
      ...[
        topo,
        errosComCerteza > 0
          ? html`<p style="margin:0;border-radius:6px;${TRIO.ambar};padding:8px 10px;font-size:14px">${TEXTOS.calibracao.pontosCegos(errosComCerteza)}</p>`
          : null,
        html`<p style="margin:0;font-size:14px;color:#9AA7B4">${TEXTOS.sessao.fimDaSessao}</p>`,
        criarElemento('div', {}, [
          criarElemento(
            'button',
            {
              type: 'button',
              class: 'min-h-11 cursor-pointer border border-borda bg-fundo px-4 py-2 text-sm font-semibold text-texto hover:border-texto-suave ' +
                LINHA_BOTAO + ' ' + TRANSICAO,
              style: 'border-radius:8px',
              onclick: aoConcluir,
            },
            [TEXTOS.sessao.concluir],
          ),
        ]),
      ].filter(Boolean),
    );
    aoFimDaSessao();
    topo.focus();
  }

  mostrarPergunta();
  return caixa;
}

function montarCardDaFila(fila, resumo, opcoes) {
  const contagem = contar(fila.length, 'vencida', 'vencidas') + ' · ' + resumo.total + ' na fila';
  return criarSecao(
    'Fila de hoje',
    [
      linhaDoTitulo(
        fila.length === 1 ? '1 pergunta para hoje' : fila.length + ' perguntas para hoje',
        html`<span style="font-family:${FONTE_MONO};font-size:13px;color:#9AA7B4">${contagem}</span>`,
      ),
      html`<p style="${ESTILO_PARAGRAFO}">${TEXTOS.fila.paragrafo}</p>`,
      montarOrigens(resumo),
      montarSessao(fila, opcoes),
    ],
    { estilo: 'border-color:rgba(34,211,238,.5)' },
  );
}

// Nada vencido: um dos dois textos e os dois caminhos para encher a fila.
function montarCardVazio(naFila) {
  return criarSecao(
    'Nada vencido hoje',
    [
      linhaDoTitulo(TEXTOS.vazio.titulo),
      html`<p style="${ESTILO_PARAGRAFO}">${naFila === 0 ? TEXTOS.vazio.semFila : TEXTOS.vazio.comFila}</p>`,
      criarElemento('div', { style: 'display:flex;flex-wrap:wrap;gap:12px' }, [
        criarLinkBotao(TEXTOS.vazio.abrirModulo, '#/modulo-1'),
        criarLinkBotao(TEXTOS.vazio.marcarTermos, '#/glossario'),
      ]),
    ],
    { espaco: 12 },
  );
}

// ---------------------------------------------------------------------------
// 4. Calibração: quando você tem certeza, acerta?
// ---------------------------------------------------------------------------

function montarCalibracao() {
  // Só as perguntas que ainda existem nos dados, como na escada e na fila.
  const resumo = resumoDeCalibracao({ valido: perguntaExiste });
  const niveis = [3, 2, 1];
  if (!niveis.some((nivel) => resumo.porConfianca[nivel].n > 0)) return null;
  const T = TEXTOS.calibracao;

  // Uma linha por nível de confiança; cada barra vale 100% das respostas daquele
  // nível (verde = acertou, vermelho = errou). "Tenho certeza" é a que importa:
  // o vermelho dela é cheio, e a nota fica âmbar quando ela não chega a 100%.
  const linhas = niveis.map((nivel) => {
    const { n, acertos } = resumo.porConfianca[nivel];
    const percentual = n ? Math.round((acertos / n) * 100) : null;
    const destaque = nivel === 3;
    let nota = T.notaErroEsperado;
    if (n === 0) nota = T.notaSemResposta;
    else if (destaque) nota = percentual < 100 ? T.notaCertezaEnganando : T.notaCertezaCombina;
    return {
      rotulo: ROTULOS_DE_CONFIANCA[nivel],
      texto: n === 0 ? T.semResposta : acertos + ' de ' + n + ' certas (' + percentual + '%)',
      curto: n === 0 ? T.semResposta : acertos + ' de ' + n + ' certas',
      acerto: n ? (acertos / n) * 100 : 0,
      erro: n ? ((n - acertos) / n) * 100 : 0,
      corDoErro: destaque ? '#EF4444' : 'rgba(239,68,68,.55)',
      nota,
      corDaNota: destaque && percentual !== null && percentual < 100 ? '#F59E0B' : '#9AA7B4',
    };
  });
  const alternativa =
    'Acerto por nível de confiança, cada barra valendo 100% das respostas daquele nível: ' +
    linhas.map((linha) => '"' + linha.rotulo + '", ' + linha.curto).join('; ') + '.';

  const figura = html`<figure style="${ESTILO_FIGURA}">
    <div role="img" aria-label="${alternativa}" style="display:flex;flex-direction:column;gap:16px">
      ${linhas.map(
        (linha) => html`<div>
          <div style="${ESTILO_LINHA_DO_TITULO}"><span style="font-size:14px">${'"' + linha.rotulo + '"'}</span><span style="font-family:${FONTE_MONO};font-size:13px;color:#9AA7B4">${linha.texto}</span></div>
          <div style="margin-top:6px;height:22px;background:#141A24;border-radius:4px;overflow:hidden;display:flex">
            <div style="height:100%;width:${linha.acerto}%;background:#22C55E"></div>
            <div style="height:100%;width:${linha.erro}%;background:${linha.corDoErro}"></div>
          </div>
          <p style="margin:4px 0 0;font-size:13px;color:${linha.corDaNota}">${linha.nota}</p>
        </div>`,
      )}
    </div>
    <figcaption style="margin-top:12px;display:flex;flex-wrap:wrap;gap:14px;font-size:13px;color:#9AA7B4">
      <span style="display:inline-flex;align-items:center;gap:6px"><span aria-hidden="true" style="width:22px;height:12px;border-radius:3px;background:#22C55E"></span>${T.acertou}</span>
      <span style="display:inline-flex;align-items:center;gap:6px"><span aria-hidden="true" style="width:22px;height:12px;border-radius:3px;background:#EF4444"></span>${T.errou}</span>
      <span style="width:100%">${T.legenda}</span>
    </figcaption>
  </figure>`;

  // Os pontos cegos: erros feitos com "Tenho certeza".
  const pontosCegos = resumo.pontosCegos;
  const caixaDosPontosCegos = pontosCegos.length
    ? html`<div style="border-radius:8px;${TRIO.ambar};padding:14px 16px;display:flex;flex-direction:column;gap:8px">
        <p style="${ESTILO_MICRO};color:#F59E0B">${T.tituloDosPontosCegos}</p>
        <p style="margin:0;font-size:14px">${T.pontosCegos(pontosCegos.length)}</p>
        <ul style="margin:0;padding-left:20px;font-size:14px;color:#9AA7B4;display:flex;flex-direction:column;gap:4px;list-style:disc">
          ${pontosCegos.map(
            (item) => html`<li><span style="font-family:${FONTE_MONO};font-size:12px;color:#E6EDF3">${origemDoItem(item)}</span> · ${perguntaEmUmaLinha(item)}</li>`,
          )}
        </ul>
      </div>`
    : null;

  return criarSecao('Calibração', [
    linhaDoTitulo(T.titulo),
    html`<p style="${ESTILO_PARAGRAFO}">${T.paragrafo}</p>`,
    figura,
    caixaDosPontosCegos,
  ]);
}

// ---------------------------------------------------------------------------
// 5. Próximas revisões
// ---------------------------------------------------------------------------

function montarProximas() {
  const proximas = proximosItens().filter(perguntaExiste);
  if (proximas.length === 0) return null;
  const { porJanela } = resumoDaFila({ valido: perguntaExiste });

  // Cinco colunas na mesma escala: amanhã (ciano) e em 3, 7, 16 e 35 dias (roxo).
  const maior = Math.max(1, ...porJanela);
  const colunas = ESCADA_DIAS.map((dias, i) => ({
    rotulo: quandoVolta(dias),
    quantas: porJanela[i],
    altura: Math.max(2, (porJanela[i] / maior) * 100),
    cor: i === 0 ? '#22D3EE' : '#7C3AED',
  }));
  const alternativa =
    'Perguntas agendadas por janela, na mesma escala: ' +
    colunas.map((coluna) => coluna.rotulo + ', ' + coluna.quantas).join('; ') + '.';

  // As colunas alinham pelo topo (número + barra de 110px): assim a base das
  // barras fica na mesma linha mesmo quando um rótulo quebra em duas linhas.
  const figura = html`<figure style="${ESTILO_FIGURA}">
    <div role="img" aria-label="${alternativa}" style="display:flex;align-items:flex-start;gap:10px">
      ${colunas.map(
        (coluna) => html`<div style="flex:1 1 0;min-width:0;display:flex;flex-direction:column;gap:6px">
          <span style="font-family:${FONTE_MONO};font-size:13px;font-weight:700;text-align:center">${String(coluna.quantas)}</span>
          <span aria-hidden="true" style="height:110px;flex:0 0 110px;display:flex;flex-direction:column;justify-content:flex-end"><span style="display:block;height:${coluna.altura}%;border-radius:4px 4px 0 0;background:${coluna.cor}"></span></span>
          <span style="font-size:12px;color:#9AA7B4;text-align:center">${coluna.rotulo}</span>
        </div>`,
      )}
    </div>
    <figcaption style="margin-top:12px;font-size:13px;color:#9AA7B4">${TEXTOS.proximas.legenda}</figcaption>
  </figure>`;

  // As 8 mais próximas, com a data relativa em mono.
  const lista = html`<ul style="list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:6px">
    ${proximas.slice(0, 8).map(
      (item) => html`<li style="display:flex;gap:12px;font-size:14px;color:#9AA7B4"><span style="flex:0 0 auto;font-family:${FONTE_MONO};color:#E6EDF3">${quandoVolta(diasAte(item.proximaTS))}</span><span style="min-width:0">${origemDoItem(item) + ' · ' + perguntaEmUmaLinha(item)}</span></li>`,
    )}
  </ul>`;

  return criarSecao('Próximas revisões', [
    linhaDoTitulo(
      TEXTOS.proximas.titulo,
      html`<span style="font-size:14px;color:#9AA7B4">${contar(proximas.length, 'pergunta agendada', 'perguntas agendadas')}</span>`,
    ),
    figura,
    lista,
  ]);
}

// ---------------------------------------------------------------------------
// Montagem
// ---------------------------------------------------------------------------

export function montarViewRevisao() {
  semearQuizzesAntigos();

  // Um lugar para cada bloco. "display:contents" faz o bloco de dentro ser o
  // filho direto da coluna (24px entre blocos), e um lugar vazio não deixa buraco.
  const criarLugar = () => criarElemento('div', { style: 'display:contents' });
  const lugar = { escada: criarLugar(), hoje: criarLugar(), calibracao: criarLugar(), proximas: criarLugar() };

  // A escada, a calibração e as próximas: redesenhadas quando a sessão termina.
  function atualizarPlacar() {
    lugar.escada.replaceChildren(montarCardDaEscada(resumoDaFila({ valido: perguntaExiste })));
    lugar.calibracao.replaceChildren(...[montarCalibracao()].filter(Boolean));
    lugar.proximas.replaceChildren(...[montarProximas()].filter(Boolean));
  }

  // A página inteira. Depois do "Concluir", o foco vai para o título do card de hoje.
  function renderizar({ focar = false } = {}) {
    const resumo = resumoDaFila({ valido: perguntaExiste });
    const fila = itensVencidos().filter(perguntaExiste);
    lugar.hoje.replaceChildren(
      fila.length
        ? montarCardDaFila(fila, resumo, {
            aoFimDaSessao: atualizarPlacar,
            aoConcluir: () => renderizar({ focar: true }),
          })
        : montarCardVazio(resumo.total),
    );
    atualizarPlacar();
    if (focar) lugar.hoje.querySelector('h2')?.focus();
  }

  renderizar();

  return criarElemento('div', { style: 'display:flex;flex-direction:column;gap:24px;min-width:0' }, [
    montarCabecalho(),
    lugar.escada,
    lugar.hoje,
    lugar.calibracao,
    lugar.proximas,
  ]);
}
