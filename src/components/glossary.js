// glossary.js — a tela do Glossário, como no desenho (32 Glossario):
// contador → mapa dos termos → busca e filtro → estado vazio → cards.
//
// Estado (o mesmo padrão do quiz.js):
// - busca e categoria vivem só na memória (não precisam persistir). O mapa e os
//   chips do filtro dividem a MESMA categoria: clicar num ramo do mapa filtra a
//   lista, e clicar de novo no que já está ativo volta para "Todas".
// - "estudado" persiste no store (localStorage), então sobrevive ao F5.
//
// A busca é a do app, e não a do desenho: ignora acento e procura também no
// alerta. A auditoria de 18/09 achou esta melhor, e o dono manteve.

import { criarElemento, mostrarToast } from '../ui.js';
import { obterEstado, atualizar } from '../store.js';
import { semear, ESCADA_DIAS } from './revisao.js';

// ---------------------------------------------------------------------------
// Classes repetidas
// ---------------------------------------------------------------------------

// Card padrão do desenho: #141A24, borda #1F2733, raio 12px, padding 20px.
const CARTAO = 'rounded-card border border-borda bg-superficie p-5';

// Contagem em mono ("Segurança 10"), igual no mapa e nos chips.
const CONTAGEM = 'font-mono text-[12px] text-texto-suave';

// Altura dos botões desta tela: 44px em TODA largura.
// O desenho (32 Glossario) escreve `min-height:40px` nos chips e nos botões,
// mas o README do handoff manda "Alvo de toque mínimo 44px em todo botão, link
// de navegação e opção clicável" e repete "Alvo de toque ≥ 44px" na seção de
// acessibilidade, que é "requisito, não opcional". Onde os dois documentos
// brigam, vale a regra de acessibilidade — é a mesma conta que a auditoria fez
// ao chamar os botões de 38px de erro ("mínimo do desenho: 44px").
const ALTURA_DO_BOTAO = 'min-h-11';

// O raio de quem recebe foco vai no `style`, e não numa classe: a regra de foco
// do custom.css troca o raio para 4px, e o desenho mantém a pílula e o 8px
// (o mesmo jeito do quiz.js).
const RAIO_PILULA = 'border-radius:999px';
const RAIO_CAIXA = 'border-radius:8px';

// Chip do filtro: pílula; ativo em roxo, como o ramo ativo do mapa.
const CLASSE_CHIP =
  ALTURA_DO_BOTAO + ' border px-3.5 py-1.5 text-[14px] leading-[normal] text-texto hover:border-texto-suave';
const CHIP_ATIVO = ' border-primaria bg-primaria/15';
const CHIP_INATIVO = ' border-borda bg-superficie';

// Botão neutro do desenho (estado vazio e card do termo).
const BOTAO_NEUTRO =
  ALTURA_DO_BOTAO +
  ' border px-3.5 py-2 text-[14px] font-semibold leading-[normal] text-texto hover:border-texto-suave';

// Cor da etiqueta de cada categoria, pelo `tom` que vem de src/data/glossario.js.
// São os trios do design system (borda .4–.5, fundo .10–.15); o vermelho do
// texto é o claro (#F87171), por contraste.
const CORES_DO_TOM = {
  alto: 'border-risco-alto/50 bg-risco-alto/12 text-risco-alto-texto',
  baixo: 'border-risco-baixo/50 bg-risco-baixo/12 text-risco-baixo',
  primaria: 'border-primaria/50 bg-primaria/15 text-texto',
  medio: 'border-risco-medio/40 bg-risco-medio/12 text-risco-medio',
  acento: 'border-acento/50 bg-acento/10 text-acento',
  neutro: 'border-borda bg-fundo text-texto-suave',
};

// ---------------------------------------------------------------------------
// Pequenas funções de apoio
// ---------------------------------------------------------------------------

// Remove acentos para a busca não depender de digitar "á" certinho.
function normalizar(texto) {
  return String(texto)
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase();
}

// Lê o mapa de termos estudados salvo no store ({ 'slippage': true, ... }).
function lerEstudados() {
  return obterEstado().glossario ?? {};
}

// Alterna um termo entre estudado/não estudado e devolve se salvou. Ao marcar, o
// termo entra na fila da Revisão em duas versões — pela definição e por uma
// situação — a partir de amanhã.
function alternarEstudado(id) {
  const marcando = !lerEstudados()[id];
  const salvou = atualizar((estado) => {
    const glossario = { ...(estado.glossario ?? {}) };
    if (glossario[id]) delete glossario[id];
    else glossario[id] = true;
    return { ...estado, glossario };
  });
  if (salvou && marcando) {
    semear([{ moduloId: 'glossario', perguntas: [{ id: id + '~def' }, { id: id + '~ex' }] }], {
      primeiraEmDias: 1,
    });
  }
  return salvou;
}

// A categoria completa ({ id, nome, tom }) a partir do id.
function acharCategoria(categorias, id) {
  return categorias.find((categoria) => categoria.id === id) ?? { id, nome: id, tom: 'neutro' };
}

// Os termos de uma categoria, na ordem do arquivo de dados.
function termosDaCategoria(termos, idDaCategoria) {
  return termos.filter((termo) => termo.categorias.includes(idDaCategoria));
}

// "3, 7, 16 e 35"
function juntarComE(lista) {
  if (lista.length < 2) return lista.join('');
  return lista.slice(0, -1).join(', ') + ' e ' + lista[lista.length - 1];
}

// "no dia seguinte, e depois em 3, 7, 16 e 35 dias" — lido da escada da Revisão,
// para a frase nunca contradizer o que a Revisão faz de verdade.
function textoDosDias() {
  const [primeiro, ...resto] = ESCADA_DIAS;
  const inicio = primeiro === 1 ? 'no dia seguinte' : 'em ' + primeiro + ' dias';
  return resto.length ? inicio + ', e depois em ' + juntarComE(resto) + ' dias' : inicio;
}

// Texto só para leitor de tela (a classe sr-only do Tailwind esconde da vista).
function textoParaLeitor(texto) {
  return criarElemento('span', { class: 'sr-only' }, [texto]);
}

// ---------------------------------------------------------------------------
// 1. Contador: "X de 34 termos estudados", %, barra e a nota da Revisão
// ---------------------------------------------------------------------------

function criarContador({ total, textos }) {
  const titulo = criarElemento('h2', { class: 'text-[1.125rem] font-semibold' });
  const percentual = criarElemento('span', { class: 'font-mono text-[14px] text-texto-suave' });
  const preenchido = criarElemento('div', { class: 'h-full rounded-full bg-primaria' });
  const barra = criarElemento('div', { class: 'h-2 overflow-hidden rounded-full bg-borda', role: 'img' }, [
    preenchido,
  ]);

  const nota = textos.notaDaRevisao;
  const secao = criarElemento(
    'section',
    { 'aria-label': 'Progresso do glossário', class: CARTAO + ' flex flex-col gap-3' },
    [
      criarElemento('div', { class: 'flex flex-wrap items-baseline justify-between gap-3' }, [
        titulo,
        percentual,
      ]),
      barra,
      criarElemento('p', { class: 'text-[13px] text-texto-suave' }, [
        nota.antes,
        criarElemento('a', { href: '#/revisao', class: 'text-acento hover:text-texto' }, [nota.link]),
        nota.depois + textoDosDias() + '.',
      ]),
    ],
  );

  function atualizarContador(quantos) {
    const texto = quantos + ' de ' + total + ' termos estudados';
    const valor = total ? (quantos / total) * 100 : 0;
    titulo.textContent = texto;
    percentual.textContent = Math.round(valor) + '%';
    preenchido.style.width = valor + '%';
    barra.setAttribute('aria-label', 'Progresso do glossário: ' + texto);
  }

  return { secao, atualizar: atualizarContador };
}

// ---------------------------------------------------------------------------
// 2. Mapa dos termos: centro, tronco e um ramo por categoria com TODOS os termos
// ---------------------------------------------------------------------------

// Folha (chip de um termo). Termo de duas categorias fica em ciano nas duas, com
// "⇢ Outra"; termo estudado fica verde. Se as duas coisas valem, o ciano manda
// na borda (é a ligação) e o texto claro mostra que já foi estudado — como no
// desenho.
function classeDaFolha({ cruza, estudado }) {
  let cor = 'border-borda bg-fundo';
  if (cruza) cor = 'border-acento bg-acento/10';
  else if (estudado) cor = 'border-risco-baixo/50 bg-risco-baixo/12';
  return 'rounded-full border px-2.5 py-0.5 text-[13px] ' + cor + (estudado ? ' text-texto' : ' text-texto-suave');
}

function criarFolha(termo, idDaCategoria, categorias, textos) {
  const cruza = termo.categorias.length > 1;
  const outra = cruza ? acharCategoria(categorias, termo.categorias.find((id) => id !== idDaCategoria)) : null;
  const leitor = textos.mapa;
  // A marca "estudado" para leitor de tela; aparece/some junto com o verde.
  const marcaEstudado = textoParaLeitor(leitor.leitorEstudado);
  const folha = criarElemento('span', {}, [
    termo.termo,
    outra && criarElemento('span', { 'aria-hidden': 'true', class: 'ml-1.5 text-acento' }, ['⇢ ' + outra.nome]),
    outra && textoParaLeitor(leitor.leitorCruzado.antes + outra.nome + leitor.leitorCruzado.depois),
    marcaEstudado,
  ]);
  return { folha, cruza, marcaEstudado };
}

function criarMapa({ termos, categorias, textos, aoEscolher }) {
  const botoes = new Map(); // id da categoria → botão do ramo
  const folhas = []; // { idDoTermo, folha, cruza, marcaEstudado }

  const ramos = categorias.map((categoria) => {
    const daCategoria = termosDaCategoria(termos, categoria.id);
    // O ramo é um botão que liga/desliga o filtro (aria-pressed), como os chips.
    const botao = criarElemento(
      'button',
      {
        type: 'button',
        class: 'omh-mapa-botao',
        // O ramo e o chip do filtro são o mesmo controle (dividem a categoria),
        // então precisam da mesma altura. A classe .omh-mapa-botao do
        // styles/custom.css (compartilhada com os mapas dos módulos) só sobe
        // para 44px abaixo de 641px; aqui subimos sempre, pela regra dos 44px.
        // Enquanto o custom.css não mudar, isto fica no style (que ganha da
        // classe) em vez de numa classe do Tailwind.
        style: 'min-height:44px',
        'aria-pressed': 'false',
        onclick: () => aoEscolher(categoria.id),
      },
      [categoria.nome, criarElemento('span', { class: CONTAGEM }, [String(daCategoria.length)])],
    );
    botoes.set(categoria.id, botao);

    const chips = daCategoria.map((termo) => {
      const item = criarFolha(termo, categoria.id, categorias, textos);
      folhas.push({ idDoTermo: termo.id, ...item });
      return item.folha;
    });
    // O conector de 24x2px que liga a espinha da lista ao botão do ramo.
    // Não usamos a classe .omh-mapa-ramo do styles/custom.css: o `::before`
    // dela fica em `top:19px`, que é o centro de um botão de 40px (o do
    // desenho). Aqui o botão tem 44px em TODA largura, então o centro da
    // primeira linha está em 22px e o traço sairia 2px acima. Desenhamos o
    // conector aqui, num <span> escondido do leitor de tela, com as mesmas
    // medidas do desenho (padding-left 24px no <li>, gap 6px/8px).
    const conector = criarElemento('span', {
      'aria-hidden': 'true',
      class: 'absolute left-0 top-[21px] h-0.5 w-6 bg-borda',
    });
    return criarElemento('li', { class: 'relative flex flex-wrap items-center gap-x-2 gap-y-1.5 pl-6' }, [
      conector,
      botao,
      ...chips,
    ]);
  });

  // Centro roxo: o nome e "34 termos · 6 categorias" em mono.
  const centro = criarElemento(
    'div',
    { class: 'box-content max-w-[190px] flex-none rounded-card border border-primaria/60 bg-primaria/15 px-[18px] py-3.5' },
    [
      criarElemento('p', { class: 'text-[15px] font-semibold' }, [textos.titulo]),
      criarElemento('p', { class: 'mt-1 font-mono text-[13px] text-texto-suave' }, [
        termos.length + ' termos · ' + categorias.length + ' categorias',
      ]),
    ],
  );

  // Tronco: 32px na horizontal quando o mapa está deitado; em pé, 20px na vertical.
  const tronco = criarElemento('div', {
    'aria-hidden': 'true',
    class: 'ml-6 h-5 w-0.5 flex-none bg-borda lg:ml-0 lg:h-0.5 lg:w-8',
  });

  const listaDeRamos = criarElemento(
    'ul',
    { class: 'ml-6 flex min-w-0 flex-auto flex-col gap-2.5 border-l-2 border-borda lg:ml-0' },
    ramos,
  );

  // A caixa é a saída de emergência: quando falta espaço, ela rola na horizontal
  // em vez de empurrar a página; por isso tem tabindex, para quem usa teclado
  // também conseguir rolar. É o que o README do handoff manda para diagrama
  // largo ("rola na horizontal dentro do próprio card; a página nunca rola para
  // o lado").
  //
  // As duas formas do mapa trocam em 1024px (`lg:`), a mesma largura em que a
  // barra lateral aparece: acima dela a tela é a de computador e o mapa fica
  // SEMPRE deitado, como no desenho (centro à esquerda, tronco de 32px, ramos à
  // direita, 760px de largura mínima); abaixo dela é a tela de celular e o mapa
  // fica em pé, como no desenho compacto. Entre 1024px e ~1140px os 760px não
  // cabem na coluna e a caixa rola por dentro — de propósito. (Antes isto era
  // uma consulta de contêiner em 760px, e o mapa voltava à forma de celular
  // justamente quando a barra lateral nascia.)
  //
  // Alternativa em texto do visual: aqui é a PRÓPRIA LISTA (a <ul> de ramos com
  // as folhas), e não um role="img" com aria-label. O README do handoff aceita as
  // duas formas ("role=img + aria-label gerado dos dados, OU a própria <ul>
  // semântica como conteúdo"). O desenho põe o role="img" na div de dentro, mas
  // ali ele esconderia os 6 botões de ramo do leitor de tela — e eles são o
  // filtro da lista. Por isso não copiamos esse pedaço do desenho.
  const caixa = criarElemento(
    'div',
    {
      class: 'overflow-x-auto border border-borda bg-fundo p-4',
      style: RAIO_CAIXA,
      tabindex: '0',
      role: 'group',
      'aria-label': 'Mapa dos termos por categoria (role na horizontal se preciso)',
    },
    [
      criarElemento(
        'div',
        {
          class: 'flex flex-col items-stretch lg:min-w-[760px] lg:flex-row lg:items-center',
        },
        [centro, tronco, listaDeRamos],
      ),
    ],
  );

  // Legenda com as duas amostras: ciano (duas categorias) e verde (estudado).
  // `box-content`: no desenho o quadradinho tem 12px POR DENTRO mais 1px de
  // borda (14px no total). Sem isso o Tailwind conta a borda dentro dos 12px.
  const amostra = (cores, texto) =>
    criarElemento('span', { class: 'inline-flex items-center gap-1.5' }, [
      criarElemento('span', {
        'aria-hidden': 'true',
        class: 'box-content h-3 w-3 flex-none rounded-[3px] border ' + cores,
      }),
      texto,
    ]);
  const legenda = criarElemento('div', { class: 'flex flex-wrap gap-3.5 text-[13px] text-texto-suave' }, [
    amostra('border-acento bg-acento/10', textos.mapa.legendaCruzado),
    amostra('border-risco-baixo/50 bg-risco-baixo/12', textos.mapa.legendaEstudado),
  ]);

  const secao = criarElemento(
    'section',
    { 'aria-label': 'Mapa dos termos por categoria', class: CARTAO + ' flex flex-col gap-4' },
    [
      criarElemento('div', { class: 'flex flex-wrap items-baseline justify-between gap-3' }, [
        criarElemento('h2', { class: 'text-[1.125rem] font-semibold' }, [textos.mapa.titulo]),
        criarElemento('span', { class: 'text-[12px] font-semibold uppercase tracking-[.05em] text-texto-suave' }, [
          textos.mapa.relacao,
        ]),
      ]),
      criarElemento('p', { class: 'text-texto-suave' }, [textos.mapa.intro]),
      caixa,
      legenda,
    ],
  );

  // Pinta o ramo ativo (roxo, via data-ativo do .omh-mapa-botao) e as folhas
  // estudadas (verde). Muda só atributos: o foco fica onde estava.
  function atualizarMapa(categoriaAtiva, estudados) {
    for (const [id, botao] of botoes) {
      const ativo = id === categoriaAtiva;
      botao.dataset.ativo = String(ativo);
      botao.setAttribute('aria-pressed', String(ativo));
    }
    for (const { idDoTermo, folha, cruza, marcaEstudado } of folhas) {
      const estudado = Boolean(estudados[idDoTermo]);
      folha.className = classeDaFolha({ cruza, estudado });
      marcaEstudado.hidden = !estudado;
    }
  }

  return { secao, atualizar: atualizarMapa };
}

// ---------------------------------------------------------------------------
// 3. Busca e filtro
// ---------------------------------------------------------------------------

function criarFiltros({ termos, categorias, aoEscolher }) {
  const botoes = new Map();
  const opcoes = [
    { id: 'todas', nome: 'Todas', quantos: termos.length },
    ...categorias.map((categoria) => ({
      id: categoria.id,
      nome: categoria.nome,
      quantos: termosDaCategoria(termos, categoria.id).length,
    })),
  ];

  const grupo = criarElemento(
    'div',
    { role: 'group', 'aria-label': 'Filtrar por categoria', class: 'flex flex-wrap gap-2' },
    opcoes.map((opcao) => {
      const botao = criarElemento(
        'button',
        {
          type: 'button',
          class: CLASSE_CHIP + CHIP_INATIVO,
          style: RAIO_PILULA,
          'aria-pressed': 'false',
          onclick: () => aoEscolher(opcao.id),
        },
        [opcao.nome, ' ', criarElemento('span', { class: CONTAGEM }, [String(opcao.quantos)])],
      );
      botoes.set(opcao.id, botao);
      return botao;
    }),
  );

  function atualizarFiltros(categoriaAtiva) {
    for (const [id, botao] of botoes) {
      const ativo = id === categoriaAtiva;
      botao.className = CLASSE_CHIP + (ativo ? CHIP_ATIVO : CHIP_INATIVO);
      botao.setAttribute('aria-pressed', String(ativo));
    }
  }

  return { grupo, botoes, atualizar: atualizarFiltros };
}

// ---------------------------------------------------------------------------
// 4. Card de um termo
// ---------------------------------------------------------------------------

function criarCardDeTermo(termo, { categorias, estudado, textos, onAlternar }) {
  const cruza = termo.categorias.length > 1;

  return criarElemento(
    'article',
    {
      // O id fica no dataset para a lista saber devolver o foco a este card
      // depois de se redesenhar (ver renderizarLista).
      dataset: { termo: termo.id },
      // Estudado: só a borda fica verde; o fundo continua o do card.
      class:
        'flex flex-col gap-3 rounded-card border bg-superficie p-5 transition-colors duration-150 ' +
        (estudado ? 'border-risco-baixo/50' : 'border-borda'),
    },
    [
      // Título e, quando estudado, o selo verde à direita.
      criarElemento('div', { class: 'flex flex-wrap items-baseline justify-between gap-3' }, [
        criarElemento(
          'h3',
          { class: 'text-[1.0625rem] font-semibold ' + (estudado ? 'text-texto-suave' : 'text-texto') },
          [termo.termo],
        ),
        estudado &&
          criarElemento(
            'span',
            {
              class:
                'whitespace-nowrap rounded-full border border-risco-baixo/50 bg-risco-baixo/12 px-2.5 py-px ' +
                'text-[12px] font-semibold text-risco-baixo',
            },
            ['Estudado ✓'],
          ),
      ]),

      // Etiquetas coloridas das categorias e, se cruza, o aviso em ciano.
      criarElemento('div', { class: 'flex flex-wrap gap-1.5' }, [
        ...termo.categorias.map((id) => {
          const categoria = acharCategoria(categorias, id);
          const cores = CORES_DO_TOM[categoria.tom] ?? CORES_DO_TOM.neutro;
          return criarElemento('span', { class: 'rounded-full border px-2.5 py-px text-[12px] ' + cores }, [
            categoria.nome,
          ]);
        }),
        cruza && criarElemento('span', { class: 'text-[12px] text-acento' }, [textos.cruzado]),
      ]),

      criarElemento('p', { class: 'text-[14px]' }, [termo.definicao]),

      criarElemento('div', { class: 'rounded-lg border border-borda bg-fundo px-3 py-2.5' }, [
        criarElemento('p', { class: 'text-[14px] text-texto-suave' }, [
          criarElemento('strong', { class: 'text-texto' }, ['Exemplo: ']),
          termo.exemplo,
        ]),
      ]),

      termo.alerta &&
        criarElemento('div', { class: 'rounded-lg border border-risco-medio/40 bg-risco-medio/12 px-3 py-2.5' }, [
          criarElemento('p', { class: 'text-[14px]' }, [
            criarElemento('strong', { class: 'text-texto' }, ['Alerta: ']),
            termo.alerta,
          ]),
        ]),

      // Botão no pé do card: neutro; vira "Estudado ✓" no trio verde.
      criarElemento(
        'button',
        {
          type: 'button',
          class:
            'mt-auto self-start ' +
            BOTAO_NEUTRO +
            (estudado ? ' border-risco-baixo/50 bg-risco-baixo/12' : ' border-borda bg-fundo'),
          style: RAIO_CAIXA,
          'aria-pressed': String(estudado),
          onclick: onAlternar,
        },
        [estudado ? 'Estudado ✓' : 'Marcar como estudado'],
      ),
    ],
  );
}

// ---------------------------------------------------------------------------
// A tela inteira
// ---------------------------------------------------------------------------

/**
 * Monta o glossário: contador, mapa, busca e filtro, estado vazio e a lista.
 * @param {object} opcoes
 * @param {Array}  opcoes.termos      Lista de termos (ver src/data/glossario.js).
 * @param {Array}  opcoes.categorias  Catálogo { id, nome, tom } das categorias.
 * @param {object} opcoes.textos      TEXTOS_GLOSSARIO (src/data/glossario.js).
 */
export function montarGlossario({ termos, categorias, textos }) {
  let busca = '';
  let categoriaAtiva = 'todas';
  // Id do termo que deve receber o foco depois do próximo desenho da lista.
  let termoParaFocar = null;

  // Clicar numa categoria (ramo do mapa ou chip) liga o filtro; clicar de novo
  // na que já está ativa volta para "Todas".
  function escolherCategoria(id) {
    categoriaAtiva = categoriaAtiva === id ? 'todas' : id;
    atualizarTudo();
  }

  const contador = criarContador({ total: termos.length, textos });
  const mapa = criarMapa({ termos, categorias, textos, aoEscolher: escolherCategoria });
  const filtros = criarFiltros({ termos, categorias, aoEscolher: escolherCategoria });

  // --- Busca -----------------------------------------------------------------
  const campoBusca = criarElemento('input', {
    id: 'glo-busca',
    type: 'search',
    // 15px, 44px de altura, padding 12/14 (o .omh-busca do desenho).
    class:
      'min-h-11 w-full border border-borda bg-fundo px-3.5 py-3 text-[15px] leading-[normal] text-texto ' +
      'placeholder:text-texto-suave',
    style: RAIO_CAIXA,
    placeholder: 'Buscar por termo, definição, exemplo ou alerta...',
    // O rótulo visível abaixo é uppercase por CSS e o navegador expõe
    // "BUSCAR TERMO" ao leitor de tela (que pode soletrar). O aria-label do
    // desenho corrige o nome falado sem mudar nada na tela.
    'aria-label': textos.buscaAriaLabel,
    autocomplete: 'off',
    oninput: (evento) => {
      busca = evento.target.value;
      renderizarLista();
    },
  });

  const resultado = criarElemento('p', { 'aria-live': 'polite', class: 'text-[14px] text-texto-suave' });

  const cardDaBusca = criarElemento(
    'section',
    { 'aria-label': 'Busca e filtro', class: CARTAO + ' flex flex-col gap-3' },
    [
      criarElemento(
        'label',
        { for: 'glo-busca', class: 'text-[12px] font-semibold uppercase tracking-[.05em] text-texto-suave' },
        ['Buscar termo'],
      ),
      campoBusca,
      filtros.grupo,
      resultado,
    ],
  );

  // --- Estado vazio: caixa âmbar com os dois caminhos de volta -----------------
  const estadoVazio = criarElemento(
    'section',
    {
      'aria-label': 'Nada encontrado',
      hidden: true,
      class: 'flex flex-col gap-3 rounded-card border border-risco-medio/40 bg-risco-medio/12 p-5',
    },
    [
      criarElemento('p', { class: 'text-[15px] font-semibold' }, [textos.vazio]),
      criarElemento('div', { class: 'flex flex-wrap gap-2' }, [
        criarElemento(
          'button',
          {
            type: 'button',
            class: BOTAO_NEUTRO + ' border-borda bg-superficie',
            style: RAIO_CAIXA,
            onclick: () => {
              busca = '';
              campoBusca.value = '';
              renderizarLista();
              campoBusca.focus();
            },
          },
          ['Apagar a busca'],
        ),
        criarElemento(
          'button',
          {
            type: 'button',
            class: BOTAO_NEUTRO + ' border-borda bg-superficie',
            style: RAIO_CAIXA,
            onclick: () => {
              categoriaAtiva = 'todas';
              atualizarTudo();
              // O botão pode sumir junto com a caixa; o foco vai para o chip "Todas".
              filtros.botoes.get('todas')?.focus();
            },
          },
          ['Ver todas as categorias'],
        ),
      ]),
    ],
  );

  // Duas colunas quando cabem dois cards de 340px (a coluna de 868px do
  // computador); uma no celular. auto-fill, e não auto-fit, para um resultado
  // sozinho ocupar meia largura, como no desenho.
  const grade = criarElemento('div', {
    class: 'grid grid-cols-[repeat(auto-fill,minmax(min(100%,340px),1fr))] gap-4',
  });

  // "8 termos em "Solana" · 2 já estudados" ou "Nenhum termo encontrado."
  // As palavras vêm de TEXTOS_GLOSSARIO.resultado (src/data/glossario.js).
  function textoDoResultado(visiveis, estudados) {
    const palavras = textos.resultado;
    if (visiveis.length === 0) return palavras.nenhum;
    const n = visiveis.length;
    const nomeDaCategoria = categoriaAtiva === 'todas' ? '' : acharCategoria(categorias, categoriaAtiva).nome;
    const procurado = busca.trim();
    const jaEstudados = visiveis.filter((termo) => estudados[termo.id]).length;
    return (
      n +
      (n === 1 ? palavras.termo : palavras.termos) +
      (nomeDaCategoria ? ' em "' + nomeDaCategoria + '"' : '') +
      (procurado ? ' para "' + procurado + '"' : '') +
      ' · ' +
      jaEstudados +
      (jaEstudados === 1 ? palavras.jaEstudado : palavras.jaEstudados)
    );
  }

  function filtrarTermos() {
    const termoBusca = normalizar(busca.trim());
    return termos.filter((termo) => {
      const bateCategoria = categoriaAtiva === 'todas' || termo.categorias.includes(categoriaAtiva);
      if (!bateCategoria) return false;
      if (!termoBusca) return true;
      const alvo = normalizar([termo.termo, termo.definicao, termo.exemplo, termo.alerta].join(' '));
      return alvo.includes(termoBusca);
    });
  }

  function renderizarLista() {
    const estudados = lerEstudados();
    const visiveis = filtrarTermos();

    grade.replaceChildren(
      ...visiveis.map((termo) =>
        criarCardDeTermo(termo, {
          categorias,
          textos,
          estudado: Boolean(estudados[termo.id]),
          onAlternar: () => {
            const salvou = alternarEstudado(termo.id);
            // A lista inteira é redesenhada e o botão clicado deixa de existir.
            // Sem isto, o foco cairia no <body> e quem usa teclado voltaria
            // para o começo da página a cada termo marcado.
            termoParaFocar = termo.id;
            atualizarTudo();
            if (!salvou) mostrarToast('Não consegui salvar o progresso');
          },
        }),
      ),
    );

    estadoVazio.hidden = visiveis.length > 0;
    resultado.textContent = textoDoResultado(visiveis, estudados);

    // Devolve o foco ao botão do termo que acabou de ser marcado/desmarcado.
    if (termoParaFocar) {
      grade.querySelector('[data-termo="' + termoParaFocar + '"] button')?.focus();
      termoParaFocar = null;
    }
  }

  // Redesenha tudo o que depende da categoria ou do "estudado".
  function atualizarTudo() {
    const estudados = lerEstudados();
    contador.atualizar(termos.filter((termo) => estudados[termo.id]).length);
    mapa.atualizar(categoriaAtiva, estudados);
    filtros.atualizar(categoriaAtiva);
    renderizarLista();
  }

  atualizarTudo();

  // A ordem do desenho, com 24px entre os blocos.
  return criarElemento('div', { class: 'space-y-6' }, [
    contador.secao,
    mapa.secao,
    cardDaBusca,
    estadoVazio,
    grade,
  ]);
}
