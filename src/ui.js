// ui.js — helpers de render compartilhados pelos componentes.
// São funções pequenas e sem estado: recebem dados, devolvem elemento do DOM.

// Cria um elemento com classes, atributos e filhos numa chamada só.
// Ex.: criarElemento('button', { class: 'btn', onclick: fn }, ['Salvar'])
export function criarElemento(tag, atributos = {}, filhos = []) {
  const elemento = document.createElement(tag);

  for (const [chave, valor] of Object.entries(atributos)) {
    if (valor === null || valor === undefined || valor === false) continue;

    if (chave === 'class') {
      elemento.className = valor;
    } else if (chave === 'dataset') {
      Object.assign(elemento.dataset, valor);
    } else if (chave.startsWith('on') && typeof valor === 'function') {
      elemento.addEventListener(chave.slice(2).toLowerCase(), valor);
    } else {
      elemento.setAttribute(chave, valor === true ? '' : valor);
    }
  }

  for (const filho of [].concat(filhos)) {
    if (filho === null || filho === undefined || filho === false) continue;
    elemento.append(filho instanceof Node ? filho : document.createTextNode(String(filho)));
  }

  return elemento;
}

// Escapa texto vindo de src/data/ antes de ir para innerHTML.
export function escaparHtml(texto) {
  return String(texto)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

// Limpa um container antes de montar uma view nova.
export function limpar(elemento) {
  if (elemento) elemento.replaceChildren();
  return elemento;
}

// Cabeçalho padrão de página. Cada view chama isto uma vez, no topo — por isso o
// nível 1: é o <h1> da rota, e os títulos de dentro dos cards seguem em h2/h3/h4.
export function criarTitulo(texto, { nivel = 1, subtitulo = null } = {}) {
  return criarElemento('header', { class: 'mb-6' }, [
    criarElemento('h' + nivel, { class: 'text-2xl font-semibold sm:text-3xl' }, [texto]),
    subtitulo && criarElemento('p', { class: 'mt-2 text-texto-suave' }, [subtitulo]),
  ]);
}

// Card padrão do design system: raio 12px, superfície e borda dos tokens.
export function criarCard(conteudo, { class: extra = '' } = {}) {
  return criarElemento(
    'section',
    { class: ('rounded-card border border-borda bg-superficie p-5 ' + extra).trim() },
    conteudo,
  );
}

// Badge de risco. Os três níveis vêm do design system (seção 5 do PLANEJAMENTO).
// O vermelho do texto é o tom claro (--color-risco-alto-texto): o #EF4444 sobre o
// próprio fundo a 15% dá 4,0:1 e reprovaria no contraste AA.
const CORES_RISCO = {
  baixo: 'bg-risco-baixo/15 text-risco-baixo border-risco-baixo/40',
  medio: 'bg-risco-medio/15 text-risco-medio border-risco-medio/40',
  alto: 'bg-risco-alto/15 text-risco-alto-texto border-risco-alto/40',
};

// Texto legível do nível de risco, para o badge e para leitores de tela.
export function rotuloRisco(nivel) {
  if (nivel === 'alto') return 'Risco alto';
  if (nivel === 'baixo') return 'Risco baixo';
  return 'Risco médio';
}

export function criarBadgeRisco(nivel, rotulo = nivel) {
  const cor = CORES_RISCO[nivel] ?? CORES_RISCO.medio;
  return criarElemento(
    'span',
    { class: 'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ' + cor },
    [rotulo],
  );
}

// Barra de progresso reutilizável (módulo, glossário, quiz).
export function criarBarraProgresso(percentual, rotulo = 'Progresso') {
  const valor = Math.max(0, Math.min(100, Math.round(percentual)));
  return criarElemento(
    'div',
    {
      class: 'h-2 w-full overflow-hidden rounded-full bg-borda',
      role: 'progressbar',
      'aria-label': rotulo,
      'aria-valuemin': '0',
      'aria-valuemax': '100',
      'aria-valuenow': String(valor),
    },
    [
      criarElemento('div', {
        class: 'h-full bg-primaria transition-[width] duration-200',
        style: 'width:' + valor + '%',
      }),
    ],
  );
}

// Atualiza a barra fixa do topo da página.
export function atualizarProgressoGlobal(percentual) {
  const valor = Math.max(0, Math.min(100, Math.round(percentual)));
  const container = document.getElementById('progresso-global');
  const barra = document.getElementById('progresso-global-barra');
  if (!container || !barra) return;
  container.setAttribute('aria-valuenow', String(valor));
  barra.style.width = valor + '%';
}

// Toast de feedback curto, ex.: "Progresso salvo".
export function mostrarToast(mensagem, { duracaoMs = 2400 } = {}) {
  const area = document.getElementById('toasts');
  if (!area) return;

  // Sem role="status" aqui: o container #toasts já é uma região aria-live, e uma
  // região dentro da outra faz alguns leitores de tela anunciarem duas vezes.
  const toast = criarElemento(
    'div',
    {
      class:
        'max-w-full rounded-card border border-borda bg-superficie px-4 py-2 text-sm shadow-lg ' +
        'transition-opacity duration-200',
    },
    [mensagem],
  );

  area.append(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 200);
  }, duracaoMs);
}

// Botões do design system. Três variantes: primário, secundário e fantasma.
const CLASSES_BOTAO = {
  primario:
    'bg-primaria text-white hover:bg-primaria/85 border border-transparent ' +
    'disabled:cursor-not-allowed disabled:opacity-50',
  secundario:
    'border border-borda bg-superficie text-texto hover:border-texto-suave ' +
    'disabled:cursor-not-allowed disabled:opacity-50',
  fantasma:
    'border border-transparent text-texto-suave hover:text-texto ' +
    'disabled:cursor-not-allowed disabled:opacity-50',
};

export function criarBotao(texto, { variante = 'primario', class: extra = '', ...atributos } = {}) {
  const cor = CLASSES_BOTAO[variante] ?? CLASSES_BOTAO.primario;
  return criarElemento(
    'button',
    {
      type: 'button',
      class: (
        'rounded-lg px-4 py-2 text-sm font-semibold transition-colors duration-150 ' +
        cor +
        ' ' +
        extra
      ).trim(),
      ...atributos,
    },
    [texto],
  );
}

// Abas internas de um módulo, no padrão ARIA de tabs.
//
// Cada aba: { id, rotulo, montar: () => Node, aoAtivar?: (painel) => void, sempreRemontar?: bool }
//   - montar()      roda na primeira vez que a aba é aberta (conteúdo preguiçoso).
//   - sempreRemontar remonta o painel a cada abertura — é o que o fluxograma do Mermaid usa
//                    para ser redesenhado toda vez que a aba volta a aparecer.
//   - aoAtivar()    roda depois de montar, a cada abertura (bom para trabalho assíncrono).
export function criarAbas({ id, abas = [], rotulo = 'Seções do módulo' }) {
  const botoes = [];
  const paineis = [];

  const listaDeAbas = criarElemento('div', {
    role: 'tablist',
    'aria-label': rotulo,
    class: 'flex flex-wrap gap-2 border-b border-borda pb-4',
  });

  const areaDePaineis = criarElemento('div', {});

  const CLASSE_BASE =
    'rounded-lg border px-3 py-2 text-sm font-medium transition-colors duration-150';
  const CLASSE_ATIVA = ' border-primaria bg-primaria/15 text-texto';
  const CLASSE_INATIVA =
    ' border-borda bg-superficie text-texto-suave hover:border-texto-suave hover:text-texto';

  function ativar(indice, moverFoco = false) {
    abas.forEach((aba, i) => {
      const selecionada = i === indice;
      const botao = botoes[i];
      const painel = paineis[i];

      botao.className = CLASSE_BASE + (selecionada ? CLASSE_ATIVA : CLASSE_INATIVA);
      botao.setAttribute('aria-selected', String(selecionada));
      botao.setAttribute('tabindex', selecionada ? '0' : '-1');
      // O PLANEJAMENTO pede aria-current na aba ativa, além do aria-selected do padrão ARIA.
      if (selecionada) botao.setAttribute('aria-current', 'true');
      else botao.removeAttribute('aria-current');

      painel.hidden = !selecionada;

      if (selecionada) {
        const precisaMontar = aba.sempreRemontar || !painel.dataset.montado;
        if (precisaMontar && typeof aba.montar === 'function') {
          painel.replaceChildren(aba.montar());
          painel.dataset.montado = 'sim';
        }
        if (typeof aba.aoAtivar === 'function') aba.aoAtivar(painel);
      }
    });

    if (moverFoco) botoes[indice].focus();
  }

  // Setas, Home e End navegam entre as abas — requisito de teclado do padrão ARIA.
  function aoTeclar(evento, indice) {
    const teclas = {
      ArrowRight: (indice + 1) % abas.length,
      ArrowLeft: (indice - 1 + abas.length) % abas.length,
      Home: 0,
      End: abas.length - 1,
    };
    const destino = teclas[evento.key];
    if (destino === undefined) return;
    evento.preventDefault();
    ativar(destino, true);
  }

  abas.forEach((aba, indice) => {
    const idBotao = id + '-aba-' + aba.id;
    const idPainel = id + '-painel-' + aba.id;

    const botao = criarElemento(
      'button',
      {
        type: 'button',
        role: 'tab',
        id: idBotao,
        'aria-controls': idPainel,
        'aria-selected': 'false',
        tabindex: '-1',
        class: CLASSE_BASE + CLASSE_INATIVA,
        onclick: () => ativar(indice),
        onkeydown: (evento) => aoTeclar(evento, indice),
      },
      [aba.rotulo],
    );

    const painel = criarElemento('div', {
      role: 'tabpanel',
      id: idPainel,
      'aria-labelledby': idBotao,
      tabindex: '0',
      hidden: true,
      class: 'mt-6',
    });

    botoes.push(botao);
    paineis.push(painel);
    listaDeAbas.append(botao);
    areaDePaineis.append(painel);
  });

  const container = criarElemento('div', {}, [listaDeAbas, areaDePaineis]);
  if (abas.length > 0) ativar(0);
  return container;
}
