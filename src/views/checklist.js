// views/checklist.js — página "Checklist antes de comprar" (#/checklist).
//
// Abas (padrão ARIA de tabs, vindo de ui.js):
//   Checar um token · Fluxograma · De onde vem cada item
//
// O checklist é reutilizável: "Começar a checagem de um token novo" apaga as
// marcações dos três blocos de uma vez. Cada bloco é um montarChecklist() com id
// próprio, para o progresso de cada pilar aparecer separado.

import { checklistPreCompra, EVIDENCIAS } from '../data/checklist.js';
import {
  criarElemento,
  criarTitulo,
  criarCard,
  criarBotao,
  criarAbas,
  mostrarToast,
} from '../ui.js';
import { montarChecklist, criarEtiqueta } from '../components/checklist.js';
import { montarDestaques } from '../components/destaques.js';
import { montarDiagrama, renderizarDiagrama } from '../components/diagrama.js';
import { atualizar } from '../store.js';

const dados = checklistPreCompra;

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
    etiqueta: evidencia ? { rotulo: evidencia.rotulo, tom: evidencia.tom } : null,
  };
}

// Apaga as marcações dos três blocos. Devolve se conseguiu salvar.
function limparMarcacoes() {
  return atualizar((estado) => {
    const checklists = { ...(estado.checklists ?? {}) };
    for (const bloco of dados.blocos) delete checklists[idDoBloco(bloco)];
    return { ...estado, checklists };
  });
}

function criarIntroducao(texto) {
  return criarElemento('p', { class: 'max-w-3xl text-texto-suave' }, [texto]);
}

// Legenda das quatro etiquetas de evidência.
function montarLegenda() {
  return criarCard([
    criarElemento('h2', { class: 'text-lg font-semibold' }, ['O que cada etiqueta quer dizer']),
    criarElemento(
      'dl',
      { class: 'mt-4 grid gap-3 sm:grid-cols-2' },
      Object.values(EVIDENCIAS).map((evidencia) =>
        criarElemento('div', { class: 'rounded-lg border border-borda bg-fundo p-3' }, [
          criarElemento('dt', {}, [criarEtiqueta({ rotulo: evidencia.rotulo, tom: evidencia.tom })]),
          criarElemento('dd', { class: 'mt-2 text-sm text-texto-suave' }, [evidencia.descricao]),
        ]),
      ),
    ),
  ]);
}

// ---------------------------------------------------------------------------
// Aba 1 — Checar um token
// ---------------------------------------------------------------------------
function montarAbaChecar() {
  const areaDosBlocos = criarElemento('div', { class: 'space-y-6' });

  function desenharBlocos() {
    areaDosBlocos.replaceChildren(
      ...dados.blocos.map((bloco) =>
        criarCard([
          criarElemento('h2', { class: 'text-lg font-semibold' }, [bloco.titulo]),
          criarElemento('p', { class: 'mt-2 mb-4 text-sm text-texto-suave' }, [bloco.descricao]),
          montarChecklist({
            id: idDoBloco(bloco),
            itens: bloco.itens.map(paraOComponente),
            rotuloProgresso: 'Progresso — ' + bloco.rotuloCurto,
          }),
        ]),
      ),
    );
  }

  const botaoNovo = criarBotao('Começar a checagem de um token novo', {
    variante: 'secundario',
    onclick: () => {
      const salvou = limparMarcacoes();
      desenharBlocos();
      mostrarToast(salvou ? 'Checklist zerado para um token novo' : 'Não consegui salvar o progresso');
      // O redesenho tira o foco do botão; devolve para o primeiro item da lista.
      areaDosBlocos.querySelector('input[type="checkbox"]')?.focus();
    },
  });

  desenharBlocos();

  const comoUsar = criarCard(
    [
      criarElemento('h2', { class: 'text-lg font-semibold' }, [dados.comoUsar.titulo]),
      ...dados.comoUsar.paragrafos.map((paragrafo) =>
        criarElemento('p', { class: 'mt-3 text-texto-suave' }, [paragrafo]),
      ),
    ],
    { class: 'border-acento/50 bg-acento/5' },
  );

  return criarElemento('div', { class: 'space-y-6' }, [
    montarDestaques(dados.destaques),
    comoUsar,
    montarLegenda(),
    criarElemento('div', { class: 'flex flex-wrap items-center gap-3' }, [
      botaoNovo,
      criarElemento('p', { class: 'text-sm text-texto-suave' }, [
        'As marcações ficam salvas só neste navegador.',
      ]),
    ]),
    areaDosBlocos,
  ]);
}

// ---------------------------------------------------------------------------
// Aba 2 — Fluxograma
// ---------------------------------------------------------------------------
function redesenharDiagramas(painel) {
  painel.querySelectorAll('[data-diagrama]').forEach(renderizarDiagrama);
}

function montarAbaFluxograma() {
  const fluxo = dados.fluxograma;

  // A versão em texto já aparece inteira logo abaixo do desenho; a reserva só aponta
  // para ela, para o conteúdo não aparecer duas vezes quando o Mermaid não carregar.
  const reserva = criarElemento('p', { class: 'text-sm text-texto-suave' }, [
    'O mesmo caminho está descrito em texto logo abaixo.',
  ]);

  return criarElemento('div', { class: 'space-y-6' }, [
    criarIntroducao(fluxo.introducao),
    montarDiagrama({
      diagrama: fluxo.codigoMermaid,
      legenda: fluxo.legenda,
      reserva,
      rotuloAcessivel: fluxo.titulo + '. ' + fluxo.versaoEmTexto.join(' Depois, '),
      mensagemErroSintaxe: 'no fluxograma, no arquivo src/data/checklist.js',
    }),
    criarCard([
      criarElemento('h2', { class: 'text-lg font-semibold' }, ['O mesmo caminho, em texto']),
      criarElemento(
        'ol',
        { class: 'mt-3 list-decimal space-y-2 pl-5 text-texto-suave' },
        fluxo.versaoEmTexto.map((passo) => criarElemento('li', {}, [passo])),
      ),
    ]),
  ]);
}

// ---------------------------------------------------------------------------
// Aba 3 — De onde vem cada item
// ---------------------------------------------------------------------------
function montarFontes() {
  return criarElemento(
    'details',
    { class: 'group rounded-card border border-borda bg-superficie p-5' },
    [
      criarElemento(
        'summary',
        { class: 'flex cursor-pointer list-none items-center justify-between text-sm font-medium' },
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
        { class: 'mt-4 space-y-1 text-sm text-texto-suave' },
        dados.fontes.map((fonte) =>
          criarElemento('li', {}, [
            fonte.titulo + ' — ' + fonte.url + ' (consulta em ' + fonte.consultadoEm + ')',
          ]),
        ),
      ),
    ],
  );
}

function montarAbaOrigem() {
  const blocos = dados.blocos.map((bloco) =>
    criarCard([
      criarElemento('h2', { class: 'text-lg font-semibold' }, [bloco.titulo]),
      criarElemento(
        'ul',
        { class: 'mt-4 space-y-3' },
        bloco.itens.map((item) => {
          const evidencia = EVIDENCIAS[item.evidencia];
          return criarElemento('li', { class: 'rounded-lg border border-borda bg-fundo p-3' }, [
            criarElemento('div', { class: 'flex flex-wrap items-center gap-2' }, [
              evidencia && criarEtiqueta({ rotulo: evidencia.rotulo, tom: evidencia.tom }),
              criarElemento('span', { class: 'text-sm font-medium text-texto' }, [item.texto]),
            ]),
            criarElemento('p', { class: 'mt-2 text-xs text-texto-suave' }, ['Fonte: ' + item.fonte]),
          ]);
        }),
      ),
    ]),
  );

  const deFora = criarCard([
    criarElemento('h2', { class: 'text-lg font-semibold' }, ['O que ficou de fora, e por quê']),
    criarElemento(
      'ul',
      { class: 'mt-4 space-y-3' },
      dados.sinaisDeFora.map((sinal) =>
        criarElemento('li', { class: 'rounded-lg border border-risco-medio/40 bg-risco-medio/10 p-3 text-sm' }, [
          criarElemento('strong', { class: 'block text-texto' }, [sinal.titulo]),
          criarElemento('span', { class: 'mt-1 block text-texto-suave' }, [sinal.texto]),
        ]),
      ),
    ),
  ]);

  return criarElemento('div', { class: 'space-y-6' }, [
    criarIntroducao(
      'Cada item do checklist com a etiqueta e a fonte que o sustenta. As pesquisas completas ' +
        'estão em pesquisa/modulos/pesquisas/, no repositório do projeto.',
    ),
    montarLegenda(),
    ...blocos,
    deFora,
    montarFontes(),
  ]);
}

// ---------------------------------------------------------------------------
// Montagem da página
// ---------------------------------------------------------------------------
export function montarViewChecklist() {
  const cabecalho = criarTitulo(dados.titulo, { subtitulo: dados.resumo });

  const abas = criarAbas({
    id: 'checklist',
    rotulo: 'Seções do checklist',
    abas: [
      { id: 'checar', rotulo: 'Checar um token', montar: montarAbaChecar },
      {
        id: 'fluxograma',
        rotulo: 'Fluxograma',
        montar: montarAbaFluxograma,
        sempreRemontar: true,
        aoAtivar: redesenharDiagramas,
      },
      { id: 'origem', rotulo: 'De onde vem cada item', montar: montarAbaOrigem },
    ],
  });

  return criarElemento('div', { class: 'mx-auto max-w-5xl' }, [cabecalho, abas]);
}
