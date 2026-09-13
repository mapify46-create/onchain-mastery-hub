// sidebar.js — menu lateral no desktop, gaveta com hambúrguer abaixo de 1024px.
//
// Responsabilidades:
//   - montar a lista de rotas a partir de ROTAS (router.js), sem duplicar nomes;
//   - marcar a rota atual com aria-current="page";
//   - mostrar o progresso de cada módulo e do glossário, sempre atualizado;
//   - abrir/fechar a gaveta no mobile com teclado (Esc), foco preso e devolução
//     do foco para o botão que abriu;
//   - oferecer o botão "Limpar progresso".
//
// Detalhe de acessibilidade: enquanto a gaveta está fechada no mobile ela continua
// no DOM (para animar a entrada), então recebe o atributo `inert`. Sem isso o Tab
// entraria num menu invisível — bug clássico de gaveta lateral.

import { ROTAS, assinarRota, rotaAtual, rerenderizar } from '../router.js';
import {
  assinar,
  obterEstado,
  limparProgresso,
  progressoDoModulo,
  progressoDoGlossario,
} from '../store.js';
import { criarElemento, criarBotao, mostrarToast } from '../ui.js';
import { glossario } from '../data/glossario.js';
import { montarBotaoInstalar } from './instalarApp.js';

const CONSULTA_DESKTOP = '(min-width: 1024px)';

const CLASSE_LINK =
  'block rounded-lg border px-3 py-2 text-sm transition-colors duration-150';
const LINK_ATIVO = ' border-primaria bg-primaria/15 text-texto font-medium';
const LINK_INATIVO =
  ' border-transparent text-texto-suave hover:bg-borda/50 hover:text-texto';

// Progresso da rota, de 0 a 100. Rotas sem progresso próprio devolvem null.
function progressoDaRota(rota, estado) {
  if (!rota.disponivel) return null;
  if (rota.tipo === 'modulo') return progressoDoModulo(rota.id, estado);
  if (rota.id === 'glossario') return progressoDoGlossario(glossario.length, estado);
  return null;
}

export function montarSidebar() {
  const menu = document.getElementById('sidebar');
  const botaoMenu = document.getElementById('botao-menu');
  const sobreposicao = document.getElementById('sobreposicao-menu');
  if (!menu) return;

  const consultaDesktop = window.matchMedia(CONSULTA_DESKTOP);
  const linhas = new Map(); // id da rota -> { link, rotulo, barra }
  let aberta = false;

  // -------------------------------------------------------------------------
  // Abrir e fechar a gaveta (só tem efeito abaixo de lg; no desktop o menu é fixo)
  // -------------------------------------------------------------------------
  function sincronizarComATela() {
    const desktop = consultaDesktop.matches;

    // No desktop o menu está sempre visível e navegável.
    menu.toggleAttribute('inert', !desktop && !aberta);
    menu.classList.toggle('-translate-x-full', !aberta);

    if (botaoMenu) botaoMenu.setAttribute('aria-expanded', String(!desktop && aberta));
    if (sobreposicao) sobreposicao.hidden = desktop || !aberta;

    // Trava a rolagem do corpo só enquanto a gaveta cobre a tela.
    document.body.style.overflow = !desktop && aberta ? 'hidden' : '';
  }

  function abrir() {
    aberta = true;
    sincronizarComATela();
    // Primeiro link da lista: o leitor de tela entra no menu, não fora dele.
    menu.querySelector('a[href]')?.focus();
  }

  function fechar({ devolverFoco = false } = {}) {
    if (!aberta) return;
    aberta = false;
    sincronizarComATela();
    if (devolverFoco) botaoMenu?.focus();
  }

  // -------------------------------------------------------------------------
  // Montagem da lista
  // -------------------------------------------------------------------------
  function criarLinha(rota) {
    const rotulo = criarElemento('span', { class: 'text-xs text-texto-suave' });

    const preenchimento = criarElemento('span', {
      class: 'block h-full rounded-full bg-primaria transition-[width] duration-200',
      style: 'width:0%',
    });

    // Barra decorativa: o número ao lado já é lido pelo leitor de tela.
    const barra = criarElemento(
      'span',
      { class: 'mt-2 block h-1 w-full overflow-hidden rounded-full bg-borda', 'aria-hidden': 'true' },
      [preenchimento],
    );

    const link = criarElemento(
      'a',
      {
        href: rota.hash,
        class: CLASSE_LINK + LINK_INATIVO,
        // Clicar num link da rota já aberta não dispara hashchange; fechar aqui
        // garante que a gaveta suma nos dois casos.
        onclick: () => fechar(),
      },
      [
        criarElemento('span', { class: 'flex items-center justify-between gap-2' }, [
          criarElemento('span', { class: 'min-w-0 truncate' }, [rota.curto]),
          rotulo,
        ]),
        barra,
      ],
    );

    linhas.set(rota.id, { link, rotulo, preenchimento, barra, rota });
    return criarElemento('li', {}, [link]);
  }

  function atualizarProgressos(estado = obterEstado()) {
    for (const { rotulo, preenchimento, barra, rota } of linhas.values()) {
      if (!rota.disponivel) {
        rotulo.textContent = 'em breve';
        barra.hidden = true;
        continue;
      }

      const percentual = progressoDaRota(rota, estado);
      if (percentual === null) {
        rotulo.textContent = '';
        barra.hidden = true;
        continue;
      }

      const valor = Math.round(percentual);
      rotulo.textContent = valor + '%';
      barra.hidden = valor === 0;
      preenchimento.style.width = valor + '%';
    }
  }

  function marcarRotaAtiva(rota) {
    const ativa = rota ?? rotaAtual();
    for (const [id, { link }] of linhas) {
      const estaAtiva = Boolean(ativa) && id === ativa.id;
      link.className = CLASSE_LINK + (estaAtiva ? LINK_ATIVO : LINK_INATIVO);
      // aria-current="page" é o que anuncia "página atual" no leitor de tela.
      if (estaAtiva) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    }
  }

  // -------------------------------------------------------------------------
  // Estrutura fixa do menu
  // -------------------------------------------------------------------------
  const cabecalho = criarElemento('div', { class: 'border-b border-borda px-4 py-4' }, [
    criarElemento('p', { class: 'text-sm font-semibold' }, ['onchain-mastery-hub']),
    criarElemento('p', { class: 'mt-1 text-xs text-texto-suave' }, [
      'Hub de estudos on-chain — material de estudo próprio.',
    ]),
  ]);

  const lista = criarElemento(
    'ul',
    { class: 'space-y-1 px-3 py-4' },
    ROTAS.map(criarLinha),
  );

  const botaoLimpar = criarBotao('Limpar progresso', {
    variante: 'secundario',
    class: 'w-full',
    onclick: () => {
      const confirmou = window.confirm(
        'Isso apaga todo o seu progresso salvo neste navegador: quizzes, glossário e ' +
          'simulador. Não dá para desfazer. Quer continuar?',
      );
      if (!confirmou) return;

      limparProgresso();
      // As views guardam estado próprio (quiz corrigido, cenário aberto): sem
      // remontar a rota atual, a tela continuaria mostrando o progresso apagado.
      rerenderizar();
      mostrarToast('Progresso apagado');
    },
  });

  const rodape = criarElemento('div', { class: 'border-t border-borda px-3 py-4' }, [
    montarBotaoInstalar(),
    botaoLimpar,
    criarElemento('p', { class: 'mt-3 text-xs text-texto-suave' }, [
      'Seu progresso fica só neste navegador (localStorage).',
    ]),
  ]);

  menu.replaceChildren(
    criarElemento('div', { class: 'flex min-h-full flex-col' }, [
      cabecalho,
      criarElemento('div', { class: 'flex-1' }, [lista]),
      rodape,
    ]),
  );

  // -------------------------------------------------------------------------
  // Eventos
  // -------------------------------------------------------------------------
  botaoMenu?.addEventListener('click', () => (aberta ? fechar({ devolverFoco: true }) : abrir()));
  sobreposicao?.addEventListener('click', () => fechar({ devolverFoco: true }));

  // Esc fecha de qualquer lugar da página.
  document.addEventListener('keydown', (evento) => {
    if (evento.key === 'Escape' && aberta) fechar({ devolverFoco: true });
  });

  // Foco preso dentro da gaveta enquanto ela estiver aberta no mobile.
  menu.addEventListener('keydown', (evento) => {
    if (evento.key !== 'Tab' || !aberta || consultaDesktop.matches) return;

    const focaveis = [...menu.querySelectorAll('a[href], button:not([disabled])')];
    if (focaveis.length === 0) return;

    const primeiro = focaveis[0];
    const ultimo = focaveis[focaveis.length - 1];

    if (evento.shiftKey && document.activeElement === primeiro) {
      evento.preventDefault();
      ultimo.focus();
    } else if (!evento.shiftKey && document.activeElement === ultimo) {
      evento.preventDefault();
      primeiro.focus();
    }
  });

  // Girar o celular ou redimensionar a janela para o desktop não pode deixar a
  // página travada com a rolagem bloqueada e o menu inerte.
  consultaDesktop.addEventListener('change', () => {
    aberta = false;
    sincronizarComATela();
  });

  assinarRota((rota) => {
    marcarRotaAtiva(rota);
    fechar();
  });

  assinar((estado) => atualizarProgressos(estado));

  atualizarProgressos();
  marcarRotaAtiva(rotaAtual());
  sincronizarComATela();
}
