// store.js — estado global do hub, persistido em localStorage.
// Toda leitura/escrita passa por aqui; nenhum componente fala com o localStorage direto.

const CHAVE = 'omh_state_v1';
const VERSAO = 1;

// Formato do estado. Cada fase seguinte preenche uma dessas gavetas.
function estadoInicial() {
  return {
    versao: VERSAO,
    checklists: {},          // { 'seguranca-seed': { 'item-1': true } }
    glossario: {},           // { 'rug-pull': true }  -> termo marcado como estudado
    quizzes: {},             // { 'modulo-1': { acertos: 4, total: 5, respostas: {} } }
    simulador: {             // Módulo 4: histórico de escolhas por cenário
      escolhas: {},
      concluido: false,
    },
    modulosConcluidos: [],   // ['modulo-1', 'modulo-2']
  };
}

// Estado em memória. O localStorage é apenas a cópia em disco.
let estado = carregar();

// Assinantes avisados sempre que o estado muda (o app.js e a sidebar usam isso).
const assinantes = new Set();

// ---------------------------------------------------------------------------
// Sanitização
//
// O que está no localStorage pode ter sido gravado por uma versão antiga do hub,
// editado à mão no DevTools ou pertencer a outro app que usou a mesma chave.
// Confiar nesse conteúdo cru quebra a tela: basta um `modulosConcluidos: null`
// para o cálculo do progresso estourar no boot e a página ficar vazia.
// Por isso todo estado que entra passa por aqui e sai com os tipos certos.
// ---------------------------------------------------------------------------

// Devolve sempre um objeto simples: nunca null, nunca array, nunca string.
function comoObjeto(valor) {
  return valor !== null && typeof valor === 'object' && !Array.isArray(valor) ? valor : {};
}

// Mapa de marcações { id: true }. Descarta qualquer valor que não seja true.
function comoMarcacoes(valor) {
  const saida = {};
  for (const [id, marcado] of Object.entries(comoObjeto(valor))) {
    if (marcado === true) saida[id] = true;
  }
  return saida;
}

function comoNumero(valor) {
  return typeof valor === 'number' && Number.isFinite(valor) ? valor : 0;
}

function sanitizar(bruto) {
  const salvo = comoObjeto(bruto);

  const quizzes = {};
  for (const [id, resultado] of Object.entries(comoObjeto(salvo.quizzes))) {
    const dados = comoObjeto(resultado);
    quizzes[id] = {
      acertos: comoNumero(dados.acertos),
      total: comoNumero(dados.total),
      respostas: comoObjeto(dados.respostas),
    };
  }

  const checklists = {};
  for (const [id, itens] of Object.entries(comoObjeto(salvo.checklists))) {
    checklists[id] = comoMarcacoes(itens);
  }

  const simulador = comoObjeto(salvo.simulador);

  return {
    versao: VERSAO,
    checklists,
    glossario: comoMarcacoes(salvo.glossario),
    quizzes,
    simulador: {
      escolhas: comoObjeto(simulador.escolhas),
      concluido: simulador.concluido === true,
    },
    modulosConcluidos: Array.isArray(salvo.modulosConcluidos)
      ? [...new Set(salvo.modulosConcluidos.filter((id) => typeof id === 'string'))]
      : [],
  };
}

// ---------------------------------------------------------------------------
// Leitura e escrita
// ---------------------------------------------------------------------------

// Lê o localStorage. Qualquer erro (modo privado, JSON corrompido, cota cheia)
// cai no estado inicial em vez de quebrar o app.
function carregar() {
  try {
    const bruto = localStorage.getItem(CHAVE);
    if (!bruto) return estadoInicial();
    return sanitizar(JSON.parse(bruto));
  } catch (erro) {
    console.warn('[store] não foi possível ler o progresso salvo:', erro);
    return estadoInicial();
  }
}

// Grava o estado. Devolve true/false para quem quiser avisar o usuário.
function salvar() {
  try {
    localStorage.setItem(CHAVE, JSON.stringify(estado));
    return true;
  } catch (erro) {
    console.warn('[store] não foi possível salvar o progresso:', erro);
    return false;
  }
}

// Cópia rasa, para desencorajar mutação direta de fora.
export function obterEstado() {
  return { ...estado };
}

// Único caminho de escrita: recebe uma função que devolve o estado novo.
// Ex.: atualizar(e => ({ ...e, modulosConcluidos: [...e.modulosConcluidos, 'modulo-1'] }))
export function atualizar(transformar) {
  const novo = transformar({ ...estado });

  // Esquecer o `return` dentro do transformar apagaria o progresso inteiro.
  // Aqui a gravação é recusada e o estado antigo continua de pé.
  if (novo === null || typeof novo !== 'object' || Array.isArray(novo)) {
    console.error('[store] atualizar() não recebeu um estado de volta; nada foi salvo.');
    return false;
  }

  estado = novo;
  const salvou = salvar();
  notificar();
  return salvou;
}

// Assina mudanças; devolve a função que cancela a assinatura.
export function assinar(callback) {
  assinantes.add(callback);
  return () => assinantes.delete(callback);
}

function notificar() {
  for (const callback of assinantes) {
    try {
      callback(obterEstado());
    } catch (erro) {
      console.error('[store] erro em um assinante:', erro);
    }
  }
}

// Zera o progresso (botão "Limpar progresso" da sidebar).
export function limparProgresso() {
  estado = estadoInicial();
  try {
    localStorage.removeItem(CHAVE);
  } catch (erro) {
    console.warn('[store] não foi possível limpar o progresso:', erro);
  }
  notificar();
}

// Duas abas do hub abertas ao mesmo tempo: sem isto, a segunda aba continuaria com
// uma cópia velha do estado e apagaria, na primeira gravação, o que a outra salvou.
let ouvindoOutrasAbas = false;
function ouvirOutrasAbas() {
  if (ouvindoOutrasAbas) return;
  ouvindoOutrasAbas = true;

  window.addEventListener('storage', (evento) => {
    // key === null acontece quando a outra aba chama localStorage.clear().
    if (evento.key !== null && evento.key !== CHAVE) return;
    estado = carregar();
    notificar();
  });
}

// Chamado uma vez pelo app.js no boot. O estado já foi carregado no import;
// esta função existe para deixar a ordem de inicialização explícita.
export function iniciarStore() {
  estado = carregar();
  ouvirOutrasAbas();
  return obterEstado();
}

// ---------------------------------------------------------------------------
// Seletores de progresso
//
// Ficam aqui porque derivam só do estado. Quem sabe QUAIS módulos existem é o
// router (ROTAS); estas funções recebem os ids de fora e não importam nada,
// o que evita import circular entre router.js, sidebar.js e store.js.
// ---------------------------------------------------------------------------

// Progresso de um módulo, de 0 a 100: metade por responder o quiz,
// metade por marcar o módulo como concluído.
export function progressoDoModulo(id, estadoAtual = estado) {
  const quizFeito = Boolean(comoObjeto(estadoAtual.quizzes)[id]);
  const concluido = (estadoAtual.modulosConcluidos ?? []).includes(id);
  return (quizFeito ? 50 : 0) + (concluido ? 50 : 0);
}

// Progresso do glossário, de 0 a 100.
export function progressoDoGlossario(totalDeTermos, estadoAtual = estado) {
  if (!totalDeTermos) return 0;
  const estudados = Object.keys(comoObjeto(estadoAtual.glossario)).length;
  return Math.min(100, (estudados / totalDeTermos) * 100);
}

// Progresso geral do curso: média simples dos módulos informados.
export function progressoGeral(idsDosModulos = [], estadoAtual = estado) {
  if (idsDosModulos.length === 0) return 0;
  const soma = idsDosModulos.reduce(
    (total, id) => total + progressoDoModulo(id, estadoAtual),
    0,
  );
  return soma / idsDosModulos.length;
}
