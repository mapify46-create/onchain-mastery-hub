// revisao.js — a fila de revisão espaçada: o que volta, quando, e como registrar.
//
// Por que existe: responder de novo, dias depois, é a técnica com a evidência mais
// forte que o hub não tinha (espaçamento: Cepeda et al., 2006; recuperação
// espaçada: Latimier et al., 2021, g = 0,74). A escada de dias abaixo é derivada
// da teoria — quanto mais longe você quer lembrar, mais espaçada a revisão —, e
// não foi testada nessa forma exata. SM-2 e FSRS, os algoritmos dos apps de
// cartões, só preveem melhor a memória; não há experimento mostrando que ensinem
// mais que uma escada fixa. Para menos de cem perguntas, a escada basta.
// Detalhe: pesquisa/modulos/pesquisas/P13-didatica-quiz-e-revisao-espacada.md.
//
// Cada item da fila é uma pergunta de quiz: { moduloId, perguntaId, degrau,
// proximaTS, acertosSeguidos, tentativas, ultimaConfianca, ultimaAcertou }.
// Acertou → sobe um degrau; errou → volta ao primeiro.
// Uma pergunta vence no DIA marcado (a qualquer hora dele), e a fila de hoje
// sai intercalada: sempre que dá, a seguinte é de outro módulo.

import { obterEstado, atualizar } from '../store.js';

// Dias até a próxima revisão, por degrau. O primeiro nunca é "hoje": a primeira
// revisão no mesmo dia vira releitura, e releitura ensina pouco.
export const ESCADA_DIAS = [1, 3, 7, 16, 35];

const DIA_MS = 24 * 60 * 60 * 1000;

export function chaveDoItem(moduloId, perguntaId) {
  return moduloId + ':' + perguntaId;
}

// Fisher–Yates. A fila sai misturada entre módulos de propósito: intercalar
// tipos de pergunta ajuda a distinguir conceitos parecidos (Brunmair & Richter,
// 2019, g = 0,42).
function embaralhar(lista) {
  const copia = [...lista];
  for (let i = copia.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

// Embaralha e intercala: sempre que dá, a pergunta seguinte é de outro módulo
// (ou do glossário). A cada passo sai uma pergunta do grupo que tem mais
// perguntas sobrando, sem repetir o grupo da anterior — assim nenhum módulo
// fica acumulado no fim da fila. Só repete o grupo quando não sobra outro.
function intercalar(lista) {
  const grupos = new Map();
  for (const item of embaralhar(lista)) {
    if (!grupos.has(item.moduloId)) grupos.set(item.moduloId, []);
    grupos.get(item.moduloId).push(item);
  }
  const saida = [];
  let anterior = null;
  while (saida.length < lista.length) {
    const comSobra = embaralhar([...grupos.entries()].filter(([, itens]) => itens.length > 0));
    const outros = comSobra.filter(([id]) => id !== anterior);
    const [id, itens] = (outros.length ? outros : comSobra).sort((a, b) => b[1].length - a[1].length)[0];
    saida.push(itens.shift());
    anterior = id;
  }
  return saida;
}

// Quantos dias de calendário faltam até um horário: 0 = hoje, 1 = amanhã,
// 3 = daqui a 3 dias. Conta pela data, não pelas horas: a pergunta que "volta
// amanhã" volta amanhã a qualquer hora, e não só depois de 24 horas cheias.
export function diasAte(timestamp, agora = Date.now()) {
  const hoje = new Date(agora);
  hoje.setHours(0, 0, 0, 0);
  const dia = new Date(timestamp);
  dia.setHours(0, 0, 0, 0);
  // Math.round e não Math.floor: no dia em que o relógio muda (horário de
  // verão, em outros países) um "dia" tem 23 ou 25 horas.
  return Math.round((dia - hoje) / DIA_MS);
}

// A pergunta já venceu? Vence no dia marcado, a qualquer hora.
function venceu(item, agora) {
  return diasAte(item.proximaTS, agora) <= 0;
}

/**
 * Põe na fila as perguntas que ainda não estão nela.
 * @param {Array}  entradas  [{ moduloId, perguntas: [{ id }] }]
 * @param {object} opcoes    primeiraEmDias: quando a primeira revisão vence (1 = amanhã; 0 = já).
 */
export function semear(entradas = [], { primeiraEmDias = 1 } = {}) {
  const agora = Date.now();
  return atualizar((estado) => {
    const itens = { ...(estado.revisao?.itens ?? {}) };
    for (const { moduloId, perguntas } of entradas) {
      for (const pergunta of perguntas ?? []) {
        const chave = chaveDoItem(moduloId, pergunta.id);
        if (itens[chave]) continue;
        itens[chave] = {
          moduloId,
          perguntaId: pergunta.id,
          degrau: 0,
          proximaTS: agora + primeiraEmDias * DIA_MS,
          acertosSeguidos: 0,
          tentativas: 0,
          ultimaConfianca: 0,
          ultimaAcertou: null,
          ultimaRevisaoTS: 0,
        };
      }
    }
    return { ...estado, revisao: { ...(estado.revisao ?? {}), itens } };
  });
}

// Atalho usado pelo quiz do módulo: as perguntas dele voltam amanhã.
export function semearDoQuiz(moduloId, perguntas) {
  return semear([{ moduloId, perguntas }], { primeiraEmDias: 1 });
}

function todosOsItens() {
  const itens = obterEstado().revisao?.itens ?? {};
  return Object.entries(itens).map(([chave, item]) => ({ chave, ...item }));
}

// O que já venceu (hoje ou antes), em ordem misturada entre os módulos.
export function itensVencidos(agora = Date.now()) {
  return intercalar(todosOsItens().filter((item) => venceu(item, agora)));
}

// O que ainda não venceu (de amanhã em diante), do mais próximo ao mais distante.
export function proximosItens(agora = Date.now()) {
  return todosOsItens()
    .filter((item) => !venceu(item, agora))
    .sort((a, b) => a.proximaTS - b.proximaTS);
}

/**
 * Resumo da fila inteira, para a tela Revisão. Só lê: não muda nada no store.
 *
 * @param {object}   opcoes
 * @param {number}   opcoes.agora   Momento de referência (padrão: agora).
 * @param {Function} opcoes.valido  (item) => boolean. Descarta itens cuja pergunta
 *                                  não existe mais nos dados (padrão: aceita todos).
 * @returns {object} {
 *   total,              quantas perguntas há na fila
 *   vencidas,           quantas venceram (hoje ou antes)
 *   porDegrau,          [5 números] quantas estão em cada degrau
 *   vencidasPorDegrau,  [5 números] quantas venceram em cada degrau
 *   origens,            { quizzes, glossario, respondidas } — somam o total:
 *                       "respondidas" = já respondidas na Revisão ao menos uma vez;
 *                       das outras, "glossario" = termos marcados como estudados;
 *                       o resto são perguntas dos quizzes dos módulos
 *   agendadas,          quantas ainda não venceram
 *   porJanela,          [5 números] das agendadas, quantas voltam em até 1, 3, 7,
 *                       16 dias e depois disso (as janelas são os degraus da escada)
 * }
 */
export function resumoDaFila({ agora = Date.now(), valido = () => true } = {}) {
  const itens = todosOsItens().filter(valido);
  const porDegrau = ESCADA_DIAS.map(() => 0);
  const vencidasPorDegrau = ESCADA_DIAS.map(() => 0);
  const porJanela = ESCADA_DIAS.map(() => 0);
  const origens = { quizzes: 0, glossario: 0, respondidas: 0 };

  for (const item of itens) {
    porDegrau[item.degrau] += 1;

    if (venceu(item, agora)) {
      vencidasPorDegrau[item.degrau] += 1;
    } else {
      // A primeira janela que cabe; o que passar de 16 dias vai para a última.
      const dias = diasAte(item.proximaTS, agora);
      const janela = ESCADA_DIAS.findIndex((limite) => dias <= limite);
      porJanela[janela === -1 ? porJanela.length - 1 : janela] += 1;
    }

    if (item.tentativas > 0) origens.respondidas += 1;
    else if (item.moduloId === 'glossario') origens.glossario += 1;
    else origens.quizzes += 1;
  }

  const vencidas = vencidasPorDegrau.reduce((soma, n) => soma + n, 0);
  return {
    total: itens.length,
    vencidas,
    porDegrau,
    vencidasPorDegrau,
    origens,
    agendadas: itens.length - vencidas,
    porJanela,
  };
}

// Registra uma resposta na revisão e reagenda o item.
export function registrarRevisao(chave, acertou, confianca) {
  const agora = Date.now();
  return atualizar((estado) => {
    const itens = { ...(estado.revisao?.itens ?? {}) };
    const item = itens[chave];
    if (!item) return estado;

    const degrau = acertou ? Math.min(item.degrau + 1, ESCADA_DIAS.length - 1) : 0;
    itens[chave] = {
      ...item,
      degrau,
      proximaTS: agora + ESCADA_DIAS[degrau] * DIA_MS,
      acertosSeguidos: acertou ? item.acertosSeguidos + 1 : 0,
      tentativas: item.tentativas + 1,
      ultimaConfianca: confianca,
      ultimaAcertou: acertou,
      ultimaRevisaoTS: agora,
    };
    return { ...estado, revisao: { ...(estado.revisao ?? {}), itens } };
  });
}

// Quando você diz "tenho certeza", acerta? Conta só a última tentativa de cada
// pergunta. Os "pontos cegos" são os erros feitos com certeza: são os que mais se
// corrigem quando explicados (hipercorreção — Butterfield & Metcalfe, 2001).
// Só lê: não muda nada no store. `valido` é o mesmo de resumoDaFila — descarta
// as perguntas que não existem mais nos dados, para os números da calibração
// baterem com os da escada e da fila (padrão: aceita todas).
export function resumoDeCalibracao({ valido = () => true } = {}) {
  const respondidos = todosOsItens().filter((item) => item.tentativas > 0 && valido(item));
  const porConfianca = {
    1: { n: 0, acertos: 0 },
    2: { n: 0, acertos: 0 },
    3: { n: 0, acertos: 0 },
  };
  for (const item of respondidos) {
    const faixa = porConfianca[item.ultimaConfianca];
    if (!faixa) continue;
    faixa.n += 1;
    if (item.ultimaAcertou) faixa.acertos += 1;
  }
  return {
    total: respondidos.length,
    porConfianca,
    pontosCegos: respondidos.filter((item) => item.ultimaConfianca === 3 && item.ultimaAcertou === false),
  };
}
