// comparisonTable.js — comparações lado a lado.
//
// Tem duas peças:
//
// 1. montarComparacaoLadoALado (a do desenho, "ComparacaoLadoALado")
//    Uma <table> de verdade: o leitor de tela navega célula por célula e o olho
//    compara o MESMO critério numa linha só, sem pular de card em card. O critério
//    que decide a escolha vem destacado (borda ciano + "critério decisivo"), e uma
//    célula pode ter tom (ok / atenção / alerta) quando isso ajuda a comparar.
//    No celular (menos de 640px) a tabela dá lugar a um card por opção, com o
//    critério decisivo primeiro. A troca é só CSS (classes sm:), sem medir a tela.
//
// 2. montarTabelaComparativa (a antiga, em cards com "Ver mais")
//    Continua aqui para as telas que ainda chamam por ela. Para migrar, troque a
//    chamada por montarComparacaoLadoALado: ela aceita o mesmo { colunas, linhas }
//    (ver adaptarTabelaComparativa, mais abaixo).

import { criarElemento, html } from '../ui.js';

// ---------------------------------------------------------------------------
// Tons das células
// ---------------------------------------------------------------------------

// Na tabela, a célula com tom vira uma pílula (raio 6) com borda e fundo da cor.
// O texto vermelho é sempre o #F87171 (o #EF4444 reprova no contraste AA).
const PILULA_POR_TOM = {
  ok: 'border-risco-baixo/50 bg-risco-baixo/12 text-texto',
  atencao: 'border-risco-medio/40 bg-risco-medio/12 text-texto',
  alerta: 'border-risco-alto/50 bg-risco-alto/12 text-risco-alto-texto',
};

// No card do celular não há pílula: o tom vira só cor e peso do texto.
const TEXTO_DO_CARD_POR_TOM = {
  ok: 'font-semibold text-texto',
  atencao: 'font-semibold text-texto',
  alerta: 'font-semibold text-risco-alto-texto',
  neutro: 'text-texto-suave',
};

// Um valor pode vir como texto ('Você') ou como { texto, tom }. Aqui os dois
// viram { texto, tom }, para o resto do código não precisar testar.
function lerValor(valor) {
  if (valor === null || valor === undefined) return { texto: '', tom: 'neutro' };
  if (typeof valor === 'object') return { texto: valor.texto ?? '', tom: valor.tom ?? 'neutro' };
  return { texto: String(valor), tom: 'neutro' };
}

// Conteúdo de uma célula da tabela: texto simples (neutro) ou pílula com tom.
function montarConteudoDaCelula(valor) {
  const { texto, tom } = lerValor(valor);
  const classesDoTom = PILULA_POR_TOM[tom];
  if (!classesDoTom) return texto;
  return html`<span class="inline-block rounded-[6px] border px-2 py-1 font-semibold ${classesDoTom}">${texto}</span>`;
}

// "A, B e C" — para o rótulo acessível da área que rola.
function juntarComE(lista) {
  if (lista.length <= 1) return lista.join('');
  return lista.slice(0, -1).join(', ') + ' e ' + lista[lista.length - 1];
}

// ---------------------------------------------------------------------------
// Adaptador do formato antigo
// ---------------------------------------------------------------------------

/**
 * Converte o formato da tabela antiga ({ colunas, linhas }) no da comparação nova
 * ({ criterios, opcoes }). As "colunas" antigas são os critérios; as "linhas"
 * antigas são as opções comparadas.
 *   - O critério decisivo pode vir marcado na coluna ({ chave, rotulo, decisivo: true })
 *     ou pelo nome da chave: adaptarTabelaComparativa(tabela, { decisivo: 'custodia' }).
 *   - `detalheExtra` ("Ver mais") não tem lugar no desenho e fica de fora.
 */
export function adaptarTabelaComparativa({ colunas = [], linhas = [], ...resto } = {}, { decisivo } = {}) {
  return {
    ...resto,
    criterios: colunas.map((coluna) => ({
      chave: coluna.chave,
      rotulo: coluna.rotulo,
      decisivo: Boolean(coluna.decisivo) || coluna.chave === decisivo,
    })),
    opcoes: linhas.map((linha) => ({
      titulo: linha.titulo,
      subtitulo: linha.subtitulo,
      valores: linha.valores ?? {},
    })),
  };
}

// ---------------------------------------------------------------------------
// Tabela (640px ou mais)
// ---------------------------------------------------------------------------

// A tabela é montada com criarElemento, e não com html``: o html`` passa pelo
// leitor de HTML do navegador, que tira de dentro da <tr> qualquer texto solto
// (e é assim que o ${} fica até ser trocado). Dentro das células pode.

// Classes repetidas das células (medidas do desenho dos módulos: cabeçalho com
// padding 8px 12px, células com 10px 12px). Os tamanhos de letra vão em px
// (text-[12px]) e não em text-xs/text-sm, porque essas classes também mudam a
// altura da linha, e o desenho usa a do app inteiro (1,6).
const CABECALHO_MICRO =
  'border-b border-borda px-3 py-2 text-left text-[12px] font-semibold uppercase tracking-[.05em] text-texto-suave';
const CABECALHO_OPCAO = 'border-b border-borda px-3 py-2 text-left font-semibold text-texto';
const CELULA = 'border-b border-borda px-3 py-2.5 align-top text-texto-suave';

// Título da opção com o subtítulo embaixo, menor e cinza.
function montarNomeDaOpcao(opcao) {
  return [
    opcao.titulo,
    opcao.subtitulo &&
      criarElemento('span', { class: 'block text-[12px] font-normal text-texto-suave' }, [opcao.subtitulo]),
  ];
}

function montarTabela(larguraMinima, linhaDoCabecalho, linhasDoCorpo) {
  return criarElemento('table', { class: 'w-full border-collapse text-[14px]', style: `min-width:${larguraMinima}px` }, [
    criarElemento('thead', {}, [criarElemento('tr', {}, linhaDoCabecalho)]),
    criarElemento('tbody', {}, linhasDoCorpo),
  ]);
}

// Critérios nas linhas, opções nas colunas (o jeito da vitrine e do M1).
// A linha decisiva: borda esquerda ciano de 2px, fundo ciano a 6% e "critério decisivo".
function montarTabelaCriteriosNasLinhas({ criterios, opcoes, larguraMinima }) {
  const cabecalho = [
    criarElemento('th', { scope: 'col', class: CABECALHO_MICRO }, ['Critério']),
    ...opcoes.map((opcao) => criarElemento('th', { scope: 'col', class: CABECALHO_OPCAO }, montarNomeDaOpcao(opcao))),
  ];

  const linhas = criterios.map((criterio) =>
    criarElemento('tr', { class: criterio.decisivo ? 'bg-acento/6' : null }, [
      criarElemento(
        'th',
        {
          scope: 'row',
          class:
            'border-b border-l-2 border-b-borda px-3 py-2.5 text-left align-top font-semibold text-texto ' +
            (criterio.decisivo ? 'border-l-acento' : 'border-l-transparent'),
        },
        [
          criterio.rotulo,
          criterio.decisivo &&
            criarElemento('span', { class: 'block text-[12px] font-semibold text-acento' }, ['critério decisivo']),
        ],
      ),
      ...opcoes.map((opcao) =>
        criarElemento('td', { class: CELULA }, [montarConteudoDaCelula(opcao.valores?.[criterio.chave])]),
      ),
    ]),
  );

  return montarTabela(larguraMinima, cabecalho, linhas);
}

// Opções nas linhas, critérios nas colunas (o jeito do M3, M5 e M6, quando há
// muitas opções e poucos critérios). A coluna decisiva ganha a borda ciano.
function montarTabelaOpcoesNasLinhas({ criterios, opcoes, larguraMinima, rotuloDasOpcoes }) {
  const bordaDecisiva = (criterio) => (criterio.decisivo ? ' border-l-2 border-l-acento' : '');

  const cabecalho = [
    criarElemento('th', { scope: 'col', class: CABECALHO_MICRO }, [rotuloDasOpcoes]),
    ...criterios.map((criterio) =>
      criarElemento('th', { scope: 'col', class: CABECALHO_MICRO + bordaDecisiva(criterio) }, [
        criterio.rotulo,
        // Na tela, a borda ciano já marca a coluna; o leitor de tela ouve o nome.
        criterio.decisivo && criarElemento('span', { class: 'sr-only' }, [' (critério decisivo)']),
      ]),
    ),
  ];

  const linhas = opcoes.map((opcao) =>
    criarElemento('tr', {}, [
      criarElemento(
        'th',
        { scope: 'row', class: 'border-b border-borda px-3 py-2.5 text-left align-top font-semibold text-texto' },
        montarNomeDaOpcao(opcao),
      ),
      ...criterios.map((criterio) =>
        criarElemento('td', { class: CELULA + bordaDecisiva(criterio) }, [
          montarConteudoDaCelula(opcao.valores?.[criterio.chave]),
        ]),
      ),
    ]),
  );

  return montarTabela(larguraMinima, cabecalho, linhas);
}

// ---------------------------------------------------------------------------
// Cards (celular, menos de 640px)
// ---------------------------------------------------------------------------

// Card do celular (desenho: raio 8, padding 12px 14px, título 15/600 com o
// subtítulo 12px ao lado; cada critério numa linha, rótulo à esquerda e valor à
// direita).
function montarCardDaOpcao(opcao, criteriosEmOrdem) {
  return html`<article class="rounded-lg border border-borda bg-superficie px-3.5 py-3">
    <p class="text-[15px] font-semibold text-texto">
      ${opcao.titulo}
      ${opcao.subtitulo ? html`<span class="text-[12px] font-normal text-texto-suave">${opcao.subtitulo}</span>` : null}
    </p>
    <dl class="mt-2 flex flex-col gap-1.5">
      ${criteriosEmOrdem.map((criterio) => {
        const { texto, tom } = lerValor(opcao.valores?.[criterio.chave]);
        return html`<div class="flex items-baseline justify-between gap-3">
          <dt class="text-[12px] text-texto-suave">${criterio.rotulo}</dt>
          <dd class="text-right text-[13px] ${TEXTO_DO_CARD_POR_TOM[tom] ?? TEXTO_DO_CARD_POR_TOM.neutro}">${texto}</dd>
        </div>`;
      })}
    </dl>
  </article>`;
}

// ---------------------------------------------------------------------------
// A comparação
// ---------------------------------------------------------------------------

/**
 * Monta a comparação lado a lado do desenho.
 *
 * @param {object} dados
 * @param {Array}  dados.criterios  [{ chave, rotulo, decisivo? }] — o que se compara.
 * @param {Array}  dados.opcoes     [{ titulo, subtitulo?, valores: { [chave]: 'texto' | { texto, tom } } }]
 *   tom: 'ok' (verde) | 'atencao' (âmbar) | 'alerta' (vermelho) | 'neutro' (sem pílula).
 *   Use tom só onde ele ajuda a comparar, nunca em todas as células.
 * @param {string} [dados.frase]    frase final, em 13px, dentro da caixa. (`legenda` também vale.)
 * @param {string} [dados.rotulo]   rótulo acessível da área que rola. Padrão:
 *   "Comparação: A, B e C (role na horizontal se preciso)".
 * @param {number} [dados.larguraMinima=560]  largura mínima da tabela, em px (abaixo disso ela rola).
 * @param {string} [dados.orientacao='criterios-nas-linhas']  ou 'opcoes-nas-linhas'
 *   (uma opção por linha e a coluna decisiva com a borda ciano, como no M5 e no M6).
 * @param {string} [dados.rotuloDasOpcoes]  cabeçalho da 1ª coluna em 'opcoes-nas-linhas' (ex.: 'Camada').
 * @param {string} [dados.id]
 *
 * Também aceita o formato antigo { colunas, linhas } (converte com adaptarTabelaComparativa).
 * Nesse caso, `decisivo: 'chave'` marca o critério decisivo:
 *   montarComparacaoLadoALado({ ...modulo1.tabelaCarteiras, decisivo: 'custodia' })
 */
export function montarComparacaoLadoALado(dados = {}) {
  const formatoAntigo = dados.colunas || dados.linhas;
  const convertido = formatoAntigo ? adaptarTabelaComparativa(dados, { decisivo: dados.decisivo }) : dados;
  const {
    id,
    criterios = [],
    opcoes = [],
    frase = convertido.legenda ?? '',
    rotulo,
    larguraMinima = 560,
    orientacao = 'criterios-nas-linhas',
    rotuloDasOpcoes = '',
  } = convertido;

  const rotuloAcessivel =
    rotulo ?? `Comparação: ${juntarComE(opcoes.map((opcao) => opcao.titulo))} (role na horizontal se preciso)`;

  const tabela =
    orientacao === 'opcoes-nas-linhas'
      ? montarTabelaOpcoesNasLinhas({ criterios, opcoes, larguraMinima, rotuloDasOpcoes })
      : montarTabelaCriteriosNasLinhas({ criterios, opcoes, larguraMinima });

  // No card, o critério decisivo vem primeiro; os outros mantêm a ordem do dado.
  const criteriosEmOrdem = [
    ...criterios.filter((criterio) => criterio.decisivo),
    ...criterios.filter((criterio) => !criterio.decisivo),
  ];

  // A frase final aparece nas duas versões (cada uma só existe na sua largura,
  // então o leitor de tela ouve uma vez só).
  const montarFrase = (margem) => (frase ? html`<p class="${margem} text-[13px] text-texto-suave">${frase}</p>` : null);

  // As duas versões são a caixa interna do desenho (#0B0F17, raio 8, padding 12).
  // Qual aparece é decidido só pelo CSS (sm: = 640px ou mais), sem medir a tela.
  return html`<div id="${id ?? null}">
    <!-- 640px ou mais: a caixa inteira é a área que rola para o lado se faltar
         espaço. tabindex="0" deixa rolar pelo teclado (setas), com o contorno
         ciano do foco em volta da caixa. -->
    <div
      class="hidden overflow-x-auto rounded-lg border border-borda bg-fundo p-3 sm:block"
      tabindex="0"
      role="group"
      aria-label="${rotuloAcessivel}"
    >
      ${tabela} ${montarFrase('mt-3')}
    </div>

    <!-- Menos de 640px: um card por opção, o critério decisivo primeiro. -->
    <div class="flex flex-col gap-3 rounded-lg border border-borda bg-fundo p-3 sm:hidden">
      ${opcoes.map((opcao) => montarCardDaOpcao(opcao, criteriosEmOrdem))} ${montarFrase('')}
    </div>
  </div>`;
}

// ---------------------------------------------------------------------------
// A tabela antiga, em cards (mantida até as telas migrarem)
// ---------------------------------------------------------------------------
//
// Em vez de um <table>, cada linha é um card. Os campos comparativos (colunas)
// ficam sempre visíveis numa lista de definição (<dl>); o "detalhe extra" fica
// dentro de um <details>, no mesmo padrão de toolMatrix.js.

/**
 * Monta a tabela comparativa antiga.
 * @param {object} opcoes
 * @param {Array} opcoes.colunas Campos comparados, na ordem: [{ chave, rotulo }].
 * @param {Array} opcoes.linhas Cada linha: { id, titulo, subtitulo?, valores: { [chave]: texto }, detalheExtra? }.
 */
export function montarTabelaComparativa({ colunas = [], linhas = [] }) {
  return criarElemento(
    'div',
    { class: 'grid gap-4 sm:grid-cols-2 xl:grid-cols-3' },
    linhas.map((linha) => criarCardDeLinha(linha, colunas)),
  );
}

function criarCardDeLinha(linha, colunas) {
  const campos = colunas.map((coluna) =>
    criarElemento('div', {}, [
      criarElemento('dt', { class: 'text-xs font-semibold uppercase tracking-wide text-texto-suave' }, [
        coluna.rotulo,
      ]),
      // lerValor: aceita também o formato novo { texto, tom } sem quebrar.
      criarElemento('dd', { class: 'mt-1 text-sm text-texto-suave' }, [lerValor(linha.valores?.[coluna.chave]).texto]),
    ]),
  );

  return criarElemento(
    'article',
    { class: 'flex flex-col rounded-card border border-borda bg-superficie p-5' },
    [
      criarElemento('header', {}, [
        criarElemento('h3', { class: 'text-base font-semibold' }, [linha.titulo]),
        linha.subtitulo &&
          criarElemento('p', { class: 'mt-1 text-xs text-texto-suave' }, [linha.subtitulo]),
      ]),

      criarElemento('dl', { class: 'mt-4 space-y-3' }, campos),

      linha.detalheExtra &&
        criarElemento(
          'details',
          { class: 'group mt-4 rounded-lg border border-borda bg-fundo p-3' },
          [
            criarElemento(
              'summary',
              {
                class:
                  'flex cursor-pointer list-none items-center justify-between text-sm font-medium',
              },
              [
                criarElemento('span', {}, ['Ver mais']),
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
            criarElemento('p', { class: 'mt-3 text-sm text-texto-suave' }, [linha.detalheExtra]),
          ],
        ),
    ],
  );
}
