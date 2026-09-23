// views/checklist.js — página "Checklist antes de comprar" (#/checklist).
//
// Página única, na ordem do desenho "31 Checklist":
//   cabeçalho → destaques (1 + 2) → fluxograma → as quatro etiquetas (com a
//   contagem de itens) → como usar → abas dos blocos + painel do bloco aberto →
//   sinais que ficaram de fora (com as fontes).
//
// O checklist é reutilizável: "Começar a checagem de um token novo" apaga as
// marcações dos três blocos de uma vez. Cada bloco é um montarChecklist() com id
// próprio, para o progresso de cada pilar aparecer separado.

import { checklistPreCompra, EVIDENCIAS } from '../data/checklist.js';
import { criarElemento, criarTitulo, criarBotao, mostrarToast } from '../ui.js';
import { montarChecklist, criarEtiqueta } from '../components/checklist.js';
import { montarDestaques } from '../components/destaques.js';
import { criarFluxoLinear } from '../components/fluxograma.js';
import { obterEstado, atualizar } from '../store.js';
import { videoDaSecao } from '../components/video.js';

const dados = checklistPreCompra;

// Card padrão das seções da página (raio 12, superfície, borda, 20px de respiro).
const CLASSE_DO_CARD = 'flex flex-col rounded-card border border-borda bg-superficie p-5';

// Título de seção (h2) do desenho: 1.125rem, peso 600.
const CLASSE_DO_H2 = 'text-[1.125rem] font-semibold';

// Cores de cada etiqueta, pelo `tom` de EVIDENCIAS: o trio do desenho (borda e
// fundo do cartão), a cor do texto do "peso" e a cor da barra da contagem.
const CORES_DA_ETIQUETA = {
  acento: { cartao: 'border-acento/50 bg-acento/10', texto: 'text-acento', barra: 'bg-acento' },
  baixo: {
    cartao: 'border-risco-baixo/50 bg-risco-baixo/12',
    texto: 'text-risco-baixo',
    barra: 'bg-risco-baixo',
  },
  medio: {
    cartao: 'border-risco-medio/40 bg-risco-medio/12',
    texto: 'text-risco-medio',
    barra: 'bg-risco-medio',
  },
  primaria: { cartao: 'border-primaria/50 bg-primaria/15', texto: 'text-texto', barra: 'bg-primaria' },
};

// Todos os itens dos três blocos, numa lista só (para a contagem por etiqueta).
const TODOS_OS_ITENS = dados.blocos.flatMap((bloco) => bloco.itens);

// Chave de cada bloco no store. Mantida estável: mudar o id apaga o que já foi marcado.
function idDoBloco(bloco) {
  return 'checklist-pre-compra-' + bloco.id;
}

// Converte um item do arquivo de dados no formato que o componente espera.
function paraOComponente(item) {
  const evidencia = EVIDENCIAS[item.evidencia];
  return {
    id: item.id,
    texto: item.texto,
    porque: item.porque,
    onde: item.onde,
    fonte: item.fonte,
    etiqueta: evidencia ? { rotulo: evidencia.rotulo, tom: evidencia.tom } : null,
  };
}

// Quantos itens do bloco já estão marcados no store.
function marcadosNoBloco(bloco) {
  const marcados = obterEstado().checklists?.[idDoBloco(bloco)] ?? {};
  return bloco.itens.filter((item) => marcados[item.id]).length;
}

// Apaga as marcações dos três blocos. Devolve se conseguiu salvar.
function limparMarcacoes() {
  return atualizar((estado) => {
    const checklists = { ...(estado.checklists ?? {}) };
    for (const bloco of dados.blocos) delete checklists[idDoBloco(bloco)];
    return { ...estado, checklists };
  });
}

// Card de seção com o h2 ligado por aria-labelledby.
function criarCardDaPagina(idDoTitulo, titulo, filhos, { espaco = 'gap-4' } = {}) {
  return criarElemento('section', { class: CLASSE_DO_CARD + ' ' + espaco, 'aria-labelledby': idDoTitulo }, [
    criarElemento('h2', { id: idDoTitulo, class: CLASSE_DO_H2 }, [titulo]),
    ...filhos,
  ]);
}

// ---------------------------------------------------------------------------
// Cabeçalho e destaques
// ---------------------------------------------------------------------------
function montarCabecalho() {
  const cabecalho = criarTitulo(dados.titulo, { rotulo: dados.rotulo, subtitulo: dados.resumo });
  // O espaço até o próximo bloco vem do gap de 24px da página, como no desenho.
  cabecalho.classList.remove('mb-6');
  return cabecalho;
}

// No desenho o primeiro destaque ("O endereço") vem sozinho, em meia largura, e os
// outros dois lado a lado embaixo. No celular os três empilham.
function montarOsDestaques() {
  return [montarDestaques(dados.destaques.slice(0, 1)), montarDestaques(dados.destaques.slice(1))];
}

// ---------------------------------------------------------------------------
// Fluxograma "Do token visto à decisão de entrar"
// ---------------------------------------------------------------------------
function montarFluxograma() {
  // titulo, relacao e introducao são o cabeçalho do card; o resto é o desenho.
  const { titulo, relacao, introducao, ...desenho } = dados.fluxograma;

  return criarElemento(
    'section',
    { class: CLASSE_DO_CARD + ' gap-4', 'aria-labelledby': 'checklist-fluxo-titulo' },
    [
      criarElemento('div', { class: 'flex flex-wrap items-baseline justify-between gap-3' }, [
        criarElemento('h2', { id: 'checklist-fluxo-titulo', class: CLASSE_DO_H2 }, [titulo]),
        criarElemento(
          'span',
          { class: 'text-[12px] font-semibold uppercase tracking-[.05em] text-texto-suave' },
          [relacao],
        ),
      ]),
      criarElemento('p', { class: 'border-l-2 border-acento pl-3 font-semibold [text-wrap:pretty]' }, [
        introducao,
      ]),
      criarFluxoLinear({ ...desenho }),
    ],
  );
}

// ---------------------------------------------------------------------------
// As quatro etiquetas de evidência + a contagem de itens de cada uma
// ---------------------------------------------------------------------------

// Cartão de uma etiqueta, tingido na cor dela: pílula, descrição e o peso no pé.
function montarCartaoDaEtiqueta(evidencia) {
  const cores = CORES_DA_ETIQUETA[evidencia.tom] ?? CORES_DA_ETIQUETA.primaria;
  return criarElemento('div', { class: 'flex flex-col gap-2 rounded-lg border px-4 py-3.5 ' + cores.cartao }, [
    criarElemento('p', {}, [criarEtiqueta({ rotulo: evidencia.rotulo, tom: evidencia.tom, alta: true })]),
    criarElemento('p', { class: 'text-[14px] text-texto-suave' }, [evidencia.descricao]),
    criarElemento('p', { class: 'mt-auto pt-1.5 text-[13px] font-semibold ' + cores.texto }, [evidencia.peso]),
  ]);
}

// Barras na mesma escala (0 a total de itens): quantos itens têm cada etiqueta.
// A contagem sai dos próprios itens, não de um número escrito à mão.
function montarContagem(evidencias) {
  const total = TODOS_OS_ITENS.length;
  const linhas = evidencias.map((evidencia) => {
    const quantidade = TODOS_OS_ITENS.filter((item) => EVIDENCIAS[item.evidencia] === evidencia).length;
    return { evidencia, quantidade, texto: quantidade + ' de ' + total + ' itens' };
  });

  const descricao =
    'Na mesma escala, de 0 a ' + total + ' itens: ' +
    linhas.map((linha) => linha.evidencia.rotulo + ', ' + linha.texto).join('; ') + '.';

  return criarElemento('figure', { class: 'rounded-lg border border-borda bg-fundo px-5 py-4' }, [
    criarElemento('p', { class: 'mb-2.5 text-[14px] font-semibold' }, [dados.etiquetas.tituloDaContagem]),
    criarElemento(
      'div',
      { role: 'img', 'aria-label': descricao, class: 'flex flex-col gap-3' },
      linhas.map((linha) => {
        const cores = CORES_DA_ETIQUETA[linha.evidencia.tom] ?? CORES_DA_ETIQUETA.primaria;
        return criarElemento('div', {}, [
          criarElemento('div', { class: 'flex items-baseline justify-between gap-3' }, [
            criarElemento('span', { class: 'text-[14px]' }, [linha.evidencia.rotulo]),
            criarElemento('span', { class: 'font-mono text-[13px] text-texto-suave' }, [linha.texto]),
          ]),
          criarElemento('div', { class: 'mt-1 h-[18px] overflow-hidden rounded bg-superficie' }, [
            criarElemento('div', {
              class: 'h-full ' + cores.barra,
              style: 'width:' + (total ? (linha.quantidade / total) * 100 : 0) + '%',
            }),
          ]),
        ]);
      }),
    ),
    criarElemento('figcaption', { class: 'mt-2.5 text-[13px] text-texto-suave' }, [
      dados.etiquetas.legendaDaContagem.replace('{total}', String(total)),
    ]),
  ]);
}

function montarEtiquetas() {
  const evidencias = Object.values(EVIDENCIAS);
  const descricaoDosCartoes = evidencias
    .map((evidencia) => evidencia.rotulo + ': ' + evidencia.descricao + ' ' + evidencia.peso)
    .join(' ');

  return criarCardDaPagina('checklist-etiquetas-titulo', dados.etiquetas.titulo, [
    criarElemento('p', { class: 'text-texto-suave' }, [dados.etiquetas.porQueQuatro]),
    criarElemento(
      'div',
      {
        role: 'img',
        'aria-label': descricaoDosCartoes,
        class: 'grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(200px,1fr))]',
      },
      evidencias.map(montarCartaoDaEtiqueta),
    ),
    montarContagem(evidencias),
  ]);
}

// ---------------------------------------------------------------------------
// Como usar
// ---------------------------------------------------------------------------

// Um item da lista: texto simples ou pedaços, com { forte } em negrito.
function montarTrechos(paragrafo) {
  if (!Array.isArray(paragrafo)) return [paragrafo];
  return paragrafo.map((trecho) =>
    typeof trecho === 'string' ? trecho : criarElemento('strong', { class: 'text-texto' }, [trecho.forte]),
  );
}

function montarComoUsar() {
  return criarCardDaPagina(
    'checklist-como-usar-titulo',
    dados.comoUsar.titulo,
    [
      criarElemento(
        'ul',
        { class: 'flex list-disc flex-col gap-2 pl-5 text-texto-suave' },
        dados.comoUsar.paragrafos.map((paragrafo) => criarElemento('li', {}, montarTrechos(paragrafo))),
      ),
    ],
    { espaco: 'gap-3' },
  );
}

// ---------------------------------------------------------------------------
// Blocos: abas (Pilar social 0/6 · Pilar técnico 0/9 · Decisão 0/8) e um painel
// com o bloco aberto. Teclado do padrão ARIA de abas: ← → Home End.
// ---------------------------------------------------------------------------
const CLASSE_DA_ABA =
  'min-h-11 whitespace-nowrap rounded-lg border px-4 py-2 text-sm font-semibold text-texto ' +
  'transition-colors duration-150';
const CLASSE_DA_ABA_ATIVA = ' border-primaria bg-primaria/15';
const CLASSE_DA_ABA_INATIVA = ' border-borda bg-superficie hover:border-texto-suave';

function montarBlocos() {
  const blocos = dados.blocos;
  let ativo = 0;
  const botoes = [];
  const contagens = [];

  const painel = criarElemento('section', {
    id: 'checklist-painel-do-bloco',
    role: 'tabpanel',
    class: CLASSE_DO_CARD + ' gap-4',
  });

  // "0/6" ao lado do nome de cada aba.
  function atualizarContagens() {
    blocos.forEach((bloco, i) => {
      contagens[i].textContent = marcadosNoBloco(bloco) + '/' + bloco.itens.length;
    });
  }

  const botaoNovo = criarBotao('Começar a checagem de um token novo', {
    variante: 'secundario',
    onclick: () => {
      const salvou = limparMarcacoes();
      desenharPainel();
      atualizarContagens();
      mostrarToast(salvou ? 'Checklist zerado para um token novo' : 'Não consegui salvar o progresso');
      // O redesenho tira o foco do botão; devolve para o primeiro item da lista.
      painel.querySelector('input[type="checkbox"]')?.focus();
    },
  });

  // O painel mostra só o bloco da aba ativa (como no desenho: um bloco por vez).
  function desenharPainel() {
    const bloco = blocos[ativo];
    painel.setAttribute('aria-labelledby', 'checklist-bloco-' + bloco.id);
    painel.replaceChildren(
      montarChecklist({
        id: idDoBloco(bloco),
        itens: bloco.itens.map(paraOComponente),
        estilo: 'compra',
        titulo: bloco.titulo,
        descricao: bloco.descricao,
        aoMudar: atualizarContagens,
      }),
      criarElemento('div', { class: 'flex flex-wrap items-center justify-between gap-3' }, [
        criarElemento('p', { class: 'min-w-[14rem] flex-1 text-[13px] text-texto-suave' }, [dados.notaDoPainel]),
        botaoNovo,
      ]),
    );
  }

  function ativar(indice, moverFoco = false) {
    ativo = indice;
    botoes.forEach((botao, i) => {
      const selecionada = i === indice;
      botao.className = CLASSE_DA_ABA + (selecionada ? CLASSE_DA_ABA_ATIVA : CLASSE_DA_ABA_INATIVA);
      botao.setAttribute('aria-selected', String(selecionada));
      botao.setAttribute('tabindex', selecionada ? '0' : '-1');
    });
    desenharPainel();
    if (moverFoco) botoes[indice].focus();
  }

  function aoTeclar(evento) {
    const indice = ativo;
    const destinos = {
      ArrowRight: (indice + 1) % blocos.length,
      ArrowLeft: (indice - 1 + blocos.length) % blocos.length,
      Home: 0,
      End: blocos.length - 1,
    };
    const destino = destinos[evento.key];
    if (destino === undefined) return;
    evento.preventDefault();
    ativar(destino, true);
  }

  const listaDeAbas = criarElemento('div', {
    role: 'tablist',
    'aria-label': 'Blocos do checklist',
    class: 'flex flex-wrap gap-2',
    onkeydown: aoTeclar,
  });

  blocos.forEach((bloco, indice) => {
    const contagem = criarElemento('span', { class: 'ml-1 font-mono text-[12px] text-texto-suave' });
    // O espaço entre o nome e a contagem faz o leitor de tela dizer "Pilar social
    // 2/6", e não "Pilar social2/6"; com o ml-1, dá os 8px do desenho.
    const botao = criarElemento(
      'button',
      {
        type: 'button',
        role: 'tab',
        id: 'checklist-bloco-' + bloco.id,
        'aria-controls': 'checklist-painel-do-bloco',
        onclick: () => ativar(indice),
      },
      [bloco.rotuloCurto, ' ', contagem],
    );
    botoes.push(botao);
    contagens.push(contagem);
    listaDeAbas.append(botao);
  });

  atualizarContagens();
  ativar(0);
  return [listaDeAbas, painel];
}

// ---------------------------------------------------------------------------
// Sinais que ficaram de fora, e as fontes consultadas
// ---------------------------------------------------------------------------
function montarFontes() {
  return criarElemento('details', { class: 'group rounded-lg border border-borda bg-fundo' }, [
    criarElemento(
      'summary',
      {
        class:
          'flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 rounded-lg px-4 ' +
          'text-[14px] font-semibold',
      },
      [
        criarElemento('span', {}, ['Fontes consultadas']),
        criarElemento(
          'span',
          {
            class: 'text-texto-suave transition-transform duration-150 group-open:rotate-180',
            'aria-hidden': 'true',
          },
          ['▾'],
        ),
      ],
    ),
    criarElemento(
      'ul',
      { class: 'flex flex-col gap-1 px-4 pb-4 text-[13px] text-texto-suave [overflow-wrap:anywhere]' },
      dados.fontes.map((fonte) =>
        criarElemento('li', {}, [
          fonte.titulo + ' — ' + fonte.url + ' (consulta em ' + fonte.consultadoEm + ')',
        ]),
      ),
    ),
  ]);
}

function montarDeFora() {
  return criarCardDaPagina('checklist-de-fora-titulo', dados.tituloDeFora, [
    criarElemento(
      'div',
      { class: 'grid gap-3 sm:grid-cols-2' },
      dados.sinaisDeFora.map((sinal) =>
        criarElemento('div', { class: 'rounded-lg border border-risco-medio/40 bg-risco-medio/12 px-4 py-3.5' }, [
          criarElemento('p', { class: 'text-[14px] font-semibold' }, [sinal.titulo]),
          criarElemento('p', { class: 'mt-1.5 text-[14px] text-texto-suave' }, [sinal.texto]),
        ]),
      ),
    ),
    montarFontes(),
  ]);
}

// ---------------------------------------------------------------------------
// Montagem da página
// ---------------------------------------------------------------------------
export function montarViewChecklist() {
  return criarElemento('div', { class: 'flex flex-col gap-6' }, [
    montarCabecalho(),
    // A videoaula da página inteira, logo abaixo do título.
    videoDaSecao(checklistPreCompra.videos, 'checklist'),
    ...montarOsDestaques(),
    montarFluxograma(),
    montarEtiquetas(),
    montarComoUsar(),
    ...montarBlocos(),
    montarDeFora(),
  ]);
}
