// router.js — roteador por hash (#/modulo-1, #/glossario, ...).
// Lê location.hash, monta a view correspondente dentro de <main id="conteudo">
// e avisa quem estiver escutando (a sidebar usa isso para marcar o item ativo).

import { montarInicio } from './views/inicio.js';
import { montarModulo1 } from './views/modulo1.js';
import { montarModulo2 } from './views/modulo2.js';
import { montarModulo3 } from './views/modulo3.js';
import { montarModulo4 } from './views/modulo4.js';
import { montarModulo5 } from './views/modulo5.js';
import { montarViewGlossario } from './views/glossario.js';

// Catálogo de rotas. É a única lista de páginas do app: a sidebar e a tela de
// início se montam a partir daqui, então acrescentar uma rota basta editar este
// array.
//   curto      rótulo do menu lateral (o título completo não cabe na coluna)
//   tipo       'modulo' entra na conta do progresso; 'pagina' não
//   disponivel false = a view ainda é um aviso de "em construção"
export const ROTAS = [
  {
    hash: '#/inicio',
    id: 'inicio',
    curto: 'Início',
    titulo: 'Início',
    tipo: 'pagina',
    disponivel: true,
    descricao: 'Visão geral do hub, seu progresso e por onde começar.',
    // A view recebe ROTAS por parâmetro para não precisar importar este arquivo
    // de volta (import circular). A função só roda depois do array pronto.
    montar: () => montarInicio(ROTAS),
  },
  {
    hash: '#/modulo-1',
    id: 'modulo-1',
    curto: 'Módulo 1',
    titulo: 'Módulo 1 — Fundamentos & Segurança',
    tipo: 'modulo',
    disponivel: true,
    descricao: 'Blockchain, carteiras, seed phrase, drainers e saque em reais.',
    montar: montarModulo1,
  },
  {
    hash: '#/modulo-2',
    id: 'modulo-2',
    curto: 'Módulo 2',
    titulo: 'Módulo 2 — Psicologia das memecoins',
    tipo: 'modulo',
    disponivel: true,
    descricao: 'Economia da atenção, vieses, tipos de token e as 4 fases.',
    montar: montarModulo2,
  },
  {
    hash: '#/modulo-3',
    id: 'modulo-3',
    curto: 'Módulo 3',
    titulo: 'Módulo 3 — Os dois pilares',
    tipo: 'modulo',
    disponivel: true,
    descricao: 'Social vs. técnico: ferramentas de visualização, execução e checagem.',
    montar: montarModulo3,
  },
  {
    hash: '#/modulo-4',
    id: 'modulo-4',
    curto: 'Módulo 4',
    titulo: 'Módulo 4 — Gestão & decisão',
    tipo: 'modulo',
    disponivel: true,
    descricao: 'Tese, catálise, take profit e o simulador de cenários.',
    montar: montarModulo4,
  },
  {
    hash: '#/modulo-5',
    id: 'modulo-5',
    curto: 'Módulo 5',
    titulo: 'Módulo 5 — A mecânica da execução',
    tipo: 'modulo',
    disponivel: true,
    descricao: 'Custódia, as cinco camadas de taxa, slippage e erros de execução.',
    montar: montarModulo5,
  },
  {
    hash: '#/glossario',
    id: 'glossario',
    curto: 'Glossário',
    titulo: 'Glossário',
    tipo: 'pagina',
    disponivel: true,
    descricao: 'Termos on-chain com definição, exemplo e sinal de alerta.',
    montar: montarViewGlossario,
  },
];

const ROTA_PADRAO = ROTAS[0];

// Ids dos módulos que já têm conteúdo. É o denominador do progresso geral: enquanto
// o Módulo 1 não existir, a barra do topo não deveria travar em 75%.
export const MODULOS_DISPONIVEIS = ROTAS.filter(
  (rota) => rota.tipo === 'modulo' && rota.disponivel,
).map((rota) => rota.id);

// Assinantes avisados a cada troca de rota (sidebar, tela de início).
const assinantes = new Set();

// Hash já desenhado na tela. Evita montar a mesma view duas vezes — o que acontecia
// na primeira visita, porque o location.replace() do boot dispara um hashchange
// depois de já termos renderizado (e o Módulo 2 chegava a desenhar o Mermaid 2x).
let hashRenderizado = null;

// O primeiro render não deve roubar o foco de quem acabou de abrir a página;
// da segunda em diante, sim: é assim que o teclado acompanha a troca de rota.
let jaRenderizouUmaVez = false;

// Descobre a rota a partir do hash atual; devolve null se o hash não for conhecido.
export function rotaAtual() {
  return ROTAS.find((rota) => rota.hash === location.hash) ?? null;
}

export function assinarRota(callback) {
  assinantes.add(callback);
  return () => assinantes.delete(callback);
}

// Monta a view ativa dentro do <main>.
function renderizar({ forcar = false } = {}) {
  const rota = rotaAtual();

  // Hash vazio (primeira visita) ou desconhecido (#/qualquer-coisa, link velho):
  // normaliza a URL em vez de mostrar a home com o endereço errado na barra.
  if (!rota) {
    location.replace(ROTA_PADRAO.hash);
    // O replace dispara hashchange, mas chamamos direto também para a tela nunca
    // ficar vazia caso o evento não venha. A guarda de hash repetido, logo abaixo,
    // impede que os dois caminhos rendam duas vezes.
    if (location.hash === ROTA_PADRAO.hash) renderizar({ forcar });
    return;
  }

  if (!forcar && hashRenderizado === rota.hash) return;

  const main = document.getElementById('conteudo');
  if (!main) return;

  main.replaceChildren(rota.montar());
  hashRenderizado = rota.hash;

  // O título do documento acompanha a rota.
  document.title =
    rota.id === 'inicio' ? 'onchain-mastery-hub' : rota.titulo + ' — onchain-mastery-hub';

  // Volta o scroll e o foco para o topo do conteúdo a cada navegação — menos na
  // primeira, para o Tab inicial ainda cair no link "Pular para o conteúdo".
  if (jaRenderizouUmaVez) {
    window.scrollTo({ top: 0, behavior: 'auto' });
    main.focus();
  }
  jaRenderizouUmaVez = true;

  for (const callback of assinantes) {
    try {
      callback(rota);
    } catch (erro) {
      console.error('[router] erro em um assinante:', erro);
    }
  }
}

// Navega por código (a sidebar usa links <a href="#/...">, então isso é para casos especiais).
export function navegarPara(hash) {
  if (location.hash === hash) {
    renderizar({ forcar: true });
  } else {
    location.hash = hash;
  }
}

// Força um re-render da rota atual (usado depois de limpar o progresso).
export function rerenderizar() {
  renderizar({ forcar: true });
}

export function iniciarRouter() {
  // Função anônima de propósito: o hashchange passa um evento como argumento e
  // ele não pode virar o objeto de opções do renderizar.
  window.addEventListener('hashchange', () => renderizar());
  renderizar();
}
