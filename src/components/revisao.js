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

// O que já venceu, em ordem misturada.
export function itensVencidos(agora = Date.now()) {
  return embaralhar(todosOsItens().filter((item) => item.proximaTS <= agora));
}

// O que ainda não venceu, do mais próximo ao mais distante.
export function proximosItens(agora = Date.now()) {
  return todosOsItens()
    .filter((item) => item.proximaTS > agora)
    .sort((a, b) => a.proximaTS - b.proximaTS);
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
export function resumoDeCalibracao() {
  const respondidos = todosOsItens().filter((item) => item.tentativas > 0);
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
