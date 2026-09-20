// visuais.js — o vocabulário visual didático do hub, no traço do desenho.
//
// Cada peça aqui mostra uma RELAÇÃO (o todo e as partes, ordem, o que se repete,
// probabilidade, proporção, sensibilidade). Nenhuma é decorativa: detalhe que só
// enfeita atrapalha o aprendizado (pesquisa/modulos/pesquisas/P14).
//
//   criarMapaMental           o todo e suas partes — centro + ramos + folhas
//   criarMapaDoModulo         o mapa "O módulo inteiro numa olhada", no topo de M1–M7
//   criarSequencia            ordem — passos numerados, um em destaque
//   criarCiclo                o que se repete — caixas em círculo com seta de retorno
//   criarGradeDe100           probabilidade — 100 quadrados, "de cada 100…"
//   criarGradesLadoALado      duas grades numa figura só (M2: "depende da régua")
//   criarBarrasNaMesmaEscala  proporção — sólido, tracejado e listrado
//   criarCurvaDeslizante      sensibilidade — arrasta e a conta muda
//   criarCurvaDeSaida         a curva do Módulo 6 ("quanto sai"), montada na de cima
//
// A geometria, as cores e os estados vêm do desenho do Claude Design
// (pesquisa/design/handoff/designs: "00 Componentes" e o uso real em "M1..M7
// Desktop", "30 Inicio" e "33 Revisao"). As classes .omh-mapa* e .omh-sequencia*
// moram em styles/custom.css.
//
// O VISUAL É SÓ A CAIXA: fundo #0B0F17, raio 8, sem título e sem "Relação: …".
// Nos módulos do desenho o visual fica dentro do card da seção, logo depois da
// ideia central, e quem dá o título é o card. O título e o rótulo "Relação: …"
// só aparecem se quem chama pedir (`mostrarCabecalho: true`), para as telas
// gerais que precisarem.
//
// ACESSIBILIDADE — o texto é o conteúdo, o desenho é enriquecimento: todo desenho
// é role="img" com descrição gerada dos próprios dados, ou a própria lista
// (<ul>/<ol>) é o conteúdo.
//
// Nada aqui inventa número: quem chama passa os valores, que vêm de src/data.

import { html, svg, criarElemento } from '../ui.js';
import { modulo6 } from '../data/modulo6.js';

const COR = {
  fundo: '#0B0F17',
  superficie: '#141A24',
  borda: '#1F2733',
  texto: '#E6EDF3',
  suave: '#9AA7B4',
  primaria: '#7C3AED',
  acento: '#22D3EE',
  baixo: '#22C55E',
  medio: '#F59E0B',
  alto: '#EF4444',
  altoTexto: '#F87171',
};

// Tons antigos (as views ainda passam `tom`). "acento" vira roxo de propósito:
// no desenho, "o que o modelo pega" é roxo; o ciano é só acento de interface.
const COR_DO_TOM = {
  alto: COR.alto,
  baixo: COR.baixo,
  medio: COR.medio,
  primaria: COR.primaria,
  acento: COR.primaria,
  suave: COR.borda,
};

const FONTE_MONO = "'JetBrains Mono',ui-monospace,monospace";

const ROTULO_MIUDO =
  'margin:0;font-size:12px;font-weight:600;letter-spacing:.05em;text-transform:uppercase;color:#9AA7B4';

// Número com vírgula e casas fixas: 2.5714 → "2,57".
function emBr(numero, casas = 2) {
  return Number(numero).toLocaleString('pt-BR', { minimumFractionDigits: casas, maximumFractionDigits: casas });
}

// Um pedaço aleatório para ids únicos (dois visuais iguais na mesma página).
function novoSufixo() {
  return Math.random().toString(36).slice(2, 8);
}

function limitar(valor, minimo, maximo) {
  return Math.min(maximo, Math.max(minimo, valor));
}

// Cabeçalho opcional: título + "Relação: …". Só aparece com mostrarCabecalho.
function criarCabecalho({ titulo, rotulo, mostrarCabecalho }) {
  if (!mostrarCabecalho || (!titulo && !rotulo)) return null;
  return html`<div style="margin:0 0 12px;display:flex;flex-wrap:wrap;align-items:baseline;justify-content:space-between;gap:12px">
    ${titulo ? html`<p style="margin:0;font-size:14px;font-weight:600;color:#E6EDF3">${titulo}</p>` : ''}
    ${rotulo ? html`<span style="${ROTULO_MIUDO}">${rotulo}</span>` : ''}
  </div>`;
}

// A caixa de todo visual: #0B0F17, borda #1F2733, raio 8, padding 16–20.
// `frase` é a linha em negrito no topo da caixa, quando o desenho tem uma
// (ex.: "Como um drainer esvazia a carteira — clique num passo").
// `legenda` (ou `nota`, o nome antigo) é a frase miúda embaixo, dentro da caixa,
// a `espacoDaLegenda` px do desenho (12 na maioria; 16 no laço do M2).
function moldura({ conteudo, frase = null, legenda = null, titulo = null, rotulo = null, mostrarCabecalho = false, padding = '20px', espacoDaLegenda = 12 }) {
  return html`<figure style="border-radius:8px;border:1px solid #1F2733;background:#0B0F17;padding:${padding};min-width:0">
    ${criarCabecalho({ titulo, rotulo, mostrarCabecalho })}
    ${frase ? html`<p style="margin:0 0 12px;font-size:14px;font-weight:600">${frase}</p>` : ''}
    ${conteudo}
    ${legenda ? html`<figcaption style="margin-top:${espacoDaLegenda}px;font-size:13px;color:#9AA7B4">${legenda}</figcaption>` : ''}
  </figure>`;
}

// ---------------------------------------------------------------------------
// Mapa mental
// ---------------------------------------------------------------------------

// Um ramo é um botão (abre a aba), um link ou, sem ação, só texto.
function criarBotaoDoRamo(ramo) {
  const seta = html`<span aria-hidden="true">→</span>`;
  let elemento;
  if (ramo.href) {
    elemento = criarElemento('a', { href: ramo.href, class: 'omh-mapa-botao' }, [ramo.titulo, ' ', seta]);
  } else if (ramo.aoAbrir) {
    elemento = criarElemento('button', { type: 'button', class: 'omh-mapa-botao', onclick: ramo.aoAbrir }, [ramo.titulo, ' ', seta]);
  } else {
    elemento = criarElemento('span', { class: 'omh-mapa-botao', 'data-so-texto': 'true' }, [ramo.titulo]);
  }
  if (ramo.aba) elemento.dataset.aba = ramo.aba;
  // Estado "concluído" do desenho: borda verde 50% e um ✓.
  if (ramo.concluido) {
    elemento.dataset.concluido = 'true';
    elemento.append(html`<span role="img" aria-label="concluído" style="color:#22C55E">✓</span>`);
  }
  return elemento;
}

// Monta a caixa do mapa (centro, tronco, ramos). Devolve a caixa e os botões,
// para quem precisar pintar o ramo ativo depois.
function montarMapa({ centro, ramos, limite, rotuloDoGrupo }) {
  const c = typeof centro === 'string' ? { titulo: centro } : centro ?? {};
  const botoes = [];

  const itens = ramos.map((ramo) => {
    const botao = criarBotaoDoRamo(ramo);
    botoes.push(botao);
    const folhas = limite ? (ramo.folhas ?? []).slice(0, limite) : ramo.folhas ?? [];
    return html`<li class="omh-mapa-ramo">
      ${botao}
      ${folhas.map((folha) => html`<span class="omh-mapa-folha">${folha}</span>`)}
    </li>`;
  });

  const caixa = html`<div class="omh-mapa">
    <div class="omh-mapa-centro">
      ${c.rotulo ? html`<p class="omh-mapa-centro-rotulo">${c.rotulo}</p>` : ''}
      <p class="omh-mapa-centro-titulo">${c.titulo ?? ''}</p>
      ${c.subtitulo ? html`<p class="omh-mapa-centro-subtitulo">${c.subtitulo}</p>` : ''}
    </div>
    <div aria-hidden="true" class="omh-mapa-tronco"></div>
    <ul class="omh-mapa-ramos">${itens}</ul>
  </div>`;

  // Fora do mapa do módulo (que já é uma <section> com nome), a caixa vira um
  // grupo com a descrição inteira: "centro; N ramos: ramo — folhas; …".
  if (rotuloDoGrupo) {
    caixa.setAttribute('role', 'group');
    caixa.setAttribute('aria-label', rotuloDoGrupo);
  }

  return { caixa, botoes };
}

/**
 * Mapa genérico: centro em card roxo, tronco de 2px, ramos ligados ao tronco
 * por um conector, cada ramo é um botão/link e as folhas são chips. No
 * celular (≤ 640px) vira vertical — ver .omh-mapa em styles/custom.css.
 *
 * @param {object} p
 * @param {object|string} p.centro  { rotulo?, titulo, subtitulo? } ou só o título
 * @param {Array}  p.ramos          [{ titulo, folhas: [], href?, aoAbrir?, concluido? }]
 * @param {number} [p.limite=3]     folhas por ramo (0 = todas)
 *
 * Ex.: criarMapaMental({ centro: { titulo: '34 termos' },
 *        ramos: [{ titulo: 'Segurança', folhas: ['seed phrase', 'drainer'] }] })
 */
export function criarMapaMental({ centro, ramos = [], nota = null, titulo = null, rotulo = 'Relação: o todo e suas partes', limite = 3, mostrarCabecalho = false } = {}) {
  const c = typeof centro === 'string' ? { titulo: centro } : centro ?? {};
  const descricao =
    (c.rotulo ? c.rotulo + ', ' : '') +
    (c.titulo ?? '') +
    '; ' +
    ramos.length +
    ' ramos: ' +
    ramos
      .map((r) => {
        const folhas = limite ? (r.folhas ?? []).slice(0, limite) : r.folhas ?? [];
        return r.titulo + (folhas.length ? ' — ' + folhas.join(', ') : '');
      })
      .join('; ');

  const { caixa } = montarMapa({ centro: c, ramos, limite, rotuloDoGrupo: descricao });

  const cabecalho = criarCabecalho({ titulo, rotulo, mostrarCabecalho });
  if (!cabecalho && !nota) return caixa;
  return html`<div>
    ${cabecalho}
    ${caixa}
    ${nota ? html`<p style="margin:12px 0 0;font-size:13px;color:#9AA7B4">${nota}</p>` : ''}
  </div>`;
}

/**
 * Mapa do módulo, como no topo de cada "M<N> Desktop" do desenho: card #141A24
 * com o micro-rótulo "O módulo inteiro numa olhada" e uma caixa só. Um ramo por
 * aba (o Quiz também, com a folha "N perguntas"); as folhas curtas vêm do campo
 * `mapa` de src/data/moduloN.js. O ramo da aba aberta fica roxo: o mapa escuta
 * o aviso 'omh:aba-ativada' que criarAbas (ui.js) dispara a cada troca.
 *
 * @param {object} p
 * @param {object} p.mapa        moduloN.mapa = { titulo, subtitulo, ramos: [{ aba, folhas }] }
 * @param {Array}  p.abas        [{ id, rotulo }] — as mesmas abas de criarAbas, com { id: 'quiz' }
 * @param {string} p.idDasAbas   o `id` passado a criarAbas (ex.: 'modulo-6')
 * @param {number} [p.perguntas] quantas perguntas o quiz tem (moduloN.quiz.length)
 *
 * Ex.: criarMapaDoModulo({ mapa: modulo6.mapa, idDasAbas: 'modulo-6',
 *        perguntas: modulo6.quiz.length,
 *        abas: [{ id: 'numeros', rotulo: 'Os números' }, …, { id: 'quiz', rotulo: 'Quiz' }] })
 *
 * O formato antigo ({ numero, nome, subtitulo, secoes, abas }) continua aceito:
 * sem `mapa`, as folhas são os títulos das seções (no máximo `limite`).
 */
export function criarMapaDoModulo({ mapa = null, abas = [], idDasAbas = null, perguntas = null, nome = null, subtitulo = null, secoes = [], limite = 3, nota = null } = {}) {
  const ramos = abas
    .map((aba) => {
      let folhas;
      if (aba.id === 'quiz' && perguntas) {
        folhas = [perguntas + (perguntas === 1 ? ' pergunta' : ' perguntas')];
      } else if (mapa) {
        folhas = mapa.ramos?.find((ramo) => ramo.aba === aba.id)?.folhas ?? [];
      } else {
        folhas = secoes.filter((secao) => secao.aba === aba.id).map((secao) => secao.titulo).slice(0, limite);
      }
      return {
        aba: aba.id,
        titulo: aba.rotulo,
        folhas,
        aoAbrir: idDasAbas ? () => abrirAba(idDasAbas + '-aba-' + aba.id) : null,
      };
    })
    // No formato antigo, ramo sem folha some (era assim antes).
    .filter((ramo) => mapa || ramo.folhas.length > 0);

  if (!ramos.length) return null;

  // Centro só com título e subtítulo: o "MÓDULO N" já está no cabeçalho da página.
  const centro = { titulo: mapa?.titulo ?? nome, subtitulo: mapa?.subtitulo ?? subtitulo };
  const { caixa, botoes } = montarMapa({ centro, ramos, limite: mapa ? 0 : limite });

  const secao = html`<section aria-label="Mapa do módulo" class="omh-mapa-card">
    <p class="omh-mapa-rotulo">O módulo inteiro numa olhada</p>
    ${caixa}
    ${nota ? html`<p style="margin:12px 0 0;font-size:13px;color:#9AA7B4">${nota}</p>` : ''}
  </section>`;

  // Pinta de roxo o ramo da aba aberta. Começa na primeira aba.
  function pintar(idDaAba) {
    botoes.forEach((botao) => {
      const ativo = botao.dataset.aba === idDaAba;
      botao.dataset.ativo = String(ativo);
      if (ativo) botao.setAttribute('aria-current', 'true');
      else botao.removeAttribute('aria-current');
    });
  }
  pintar(abas[0]?.id);

  // A primeira ativação acontece dentro de criarAbas, antes de a página entrar
  // na tela; por isso o mapa só se desliga depois de ter estado na tela e saído
  // (a pessoa foi para outra rota).
  let jaEsteveNaTela = false;
  function aoAtivarAba(evento) {
    if (secao.isConnected) {
      jaEsteveNaTela = true;
    } else if (jaEsteveNaTela) {
      document.removeEventListener('omh:aba-ativada', aoAtivarAba);
      return;
    }
    if (!idDasAbas || evento.detail?.id !== idDasAbas) return;
    pintar(evento.detail.aba);
  }
  document.addEventListener('omh:aba-ativada', aoAtivarAba);

  return secao;
}

// Clica no botão da aba e leva o foco para o painel, como o desenho pede.
export function abrirAba(idDoBotao) {
  const botao = document.getElementById(idDoBotao);
  if (!botao) return;
  botao.click();
  const painel = document.getElementById(botao.getAttribute('aria-controls'));
  if (painel) {
    painel.scrollIntoView({ block: 'start' });
    painel.focus({ preventScroll: true });
  }
}

// ---------------------------------------------------------------------------
// Sequência
// ---------------------------------------------------------------------------

/**
 * 3–7 passos numerados. O passo atual fica em destaque e explica-se embaixo;
 * os outros são botões (padrão de abas: ← → trocam o passo, Home/End vão ao
 * primeiro/último). Horizontal com rolagem interna (a lista ganha tabindex="0"
 * quando rola); vertical no celular, com o texto dentro do passo atual e sem o
 * painel de baixo (que continua lá só para o leitor de tela). Com `colunas`,
 * o painel aparece também no celular e o botão não leva texto.
 * `tom` por passo é ignorado: o desenho não tem cor por passo.
 *
 * @param {object} p
 * @param {Array}  p.passos    [{ titulo, texto, colunas? }]
 *   colunas: [{ rotulo, texto }] — o painel mostra colunas rotuladas no lugar de
 *   "PASSO N DE M" + texto (M1 drainer: "O que a vítima vê" / "O que está de
 *   fato acontecendo"). Os rótulos vêm de quem chama.
 * @param {number} [p.atual=0] índice do passo que começa aberto
 * @param {string} [p.frase]   linha em negrito no topo da caixa (se o desenho tiver)
 * @param {string} [p.legenda] frase miúda embaixo (nome antigo: `nota`)
 * @param {string} [p.rotuloDaLista='Passos']  nome da lista para o leitor de tela
 *
 * Ex.: criarSequencia({ frase: 'Como um drainer esvazia a carteira — clique num passo',
 *        rotuloDaLista: 'Passos do drainer',
 *        passos: modulo1.roteiroDrainer.map((p) => ({ titulo: p.titulo, colunas: [
 *          { rotulo: 'O que a vítima vê', texto: p.oQueVeem },
 *          { rotulo: 'O que está de fato acontecendo', texto: p.oQueAcontece }] })) })
 */
export function criarSequencia({ titulo = null, passos = [], nota = null, legenda = null, frase = null, atual = 0, rotuloDaLista = 'Passos', rotulo = 'Relação: ordem', mostrarCabecalho = false } = {}) {
  let indiceAtual = limitar(atual, 0, Math.max(passos.length - 1, 0));
  const sufixo = novoSufixo();
  const idPainel = 'omh-sequencia-' + sufixo + '-painel';
  const botoes = [];

  const painel = html`<div role="tabpanel" id="${idPainel}" aria-live="polite" class="omh-sequencia-painel"></div>`;

  // O miolo do painel: "PASSO N DE M" + texto, ou as colunas rotuladas.
  function preencherPainel(passo) {
    if (passo?.colunas?.length) {
      painel.classList.add('omh-sequencia-painel-colunas');
      painel.replaceChildren(
        ...passo.colunas.map(
          (coluna) => html`<div>
            <p style="margin:0;font-size:11px;font-weight:600;letter-spacing:.05em;text-transform:uppercase;color:#9AA7B4">${coluna.rotulo}</p>
            <p style="margin:4px 0 0;font-size:14px">${coluna.texto}</p>
          </div>`,
        ),
      );
      return;
    }
    painel.classList.remove('omh-sequencia-painel-colunas');
    painel.replaceChildren(
      html`<p style="${ROTULO_MIUDO}">${'Passo ' + (indiceAtual + 1) + ' de ' + passos.length}</p>`,
      html`<p style="margin:4px 0 0;font-size:15px">${passo?.texto ?? ''}</p>`,
    );
  }

  function pintar() {
    botoes.forEach((botao, i) => {
      const ativo = i === indiceAtual;
      botao.setAttribute('aria-selected', String(ativo));
      botao.setAttribute('tabindex', ativo ? '0' : '-1');
    });
    painel.setAttribute('aria-labelledby', botoes[indiceAtual]?.id ?? '');
    preencherPainel(passos[indiceAtual]);
  }

  function irPara(indice, moverFoco = false) {
    indiceAtual = (indice + passos.length) % passos.length;
    pintar();
    if (moverFoco) botoes[indiceAtual].focus();
  }

  const itens = passos.map((passo, i) => {
    // O texto dentro do botão só aparece no celular, no passo atual (CSS), e aí
    // o painel de baixo some da tela: o texto aparece uma vez só, como no
    // "00 Componentes › Celular". Para o leitor de tela, quem fala é sempre o
    // painel (aria-live), por isso o texto do botão é aria-hidden.
    // Passo com `colunas` não leva texto no botão: o painel fica visível nas
    // duas larguras (M1 compacto).
    const textoNoBotao = passo.colunas?.length ? '' : html`<span aria-hidden="true" class="omh-sequencia-texto">${passo.texto ?? ''}</span>`;
    const botao = html`<button type="button" role="tab" id="${'omh-sequencia-' + sufixo + '-passo-' + i}" aria-controls="${idPainel}" class="omh-sequencia-passo">
      <span aria-hidden="true" class="omh-sequencia-marcador">${i + 1}</span>
      <span class="omh-sequencia-titulo">${passo.titulo}${textoNoBotao}</span>
    </button>`;
    botao.addEventListener('click', () => irPara(i));
    botao.addEventListener('keydown', (evento) => {
      const teclas = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: passos.length - 1 };
      if (evento.key in teclas) {
        evento.preventDefault();
        irPara(teclas[evento.key], true);
      }
    });
    botoes.push(botao);

    const ligacao = i < passos.length - 1 ? html`<span aria-hidden="true" class="omh-sequencia-ligacao">→</span>` : '';
    return html`<li>${botao}${ligacao}</li>`;
  });

  pintar();

  const lista = html`<ol role="tablist" aria-label="${rotuloDaLista}" class="omh-sequencia">${itens}</ol>`;

  // A lista que rola para o lado recebe foco (tabindex="0"), para quem usa o
  // teclado conseguir rolar. Quando não rola (celular, lista curta), não.
  if (typeof ResizeObserver === 'function') {
    new ResizeObserver(() => {
      if (lista.scrollWidth > lista.clientWidth + 1) lista.setAttribute('tabindex', '0');
      else lista.removeAttribute('tabindex');
    }).observe(lista);
  }

  return moldura({
    titulo,
    rotulo,
    mostrarCabecalho,
    frase,
    legenda: legenda ?? nota,
    conteudo: html`<div>${lista}${painel}</div>`,
  });
}

// ---------------------------------------------------------------------------
// Ciclo
// ---------------------------------------------------------------------------

/**
 * 3–6 etapas em círculo: caixas absolutas sobre um SVG, arcos com ponta de
 * seta; o último arco (n → 1) é tracejado e tem a cor do retorno.
 * Os arcos saem da borda de uma caixa e encostam na seguinte: o espaço entre
 * eles é calculado pelo tamanho REAL das caixas, depois de desenhadas. Se as
 * caixas reais ficarem coladas (texto em várias linhas), o círculo cresce até
 * nenhuma encostar na outra (nem no texto do centro) e toda seta aparecer.
 * Se a área for mais estreita que o círculo (celular), o círculo vira um oval:
 * estreita na horizontal até caber e cresce na vertical o que precisar. O
 * texto fica sempre no tamanho do desenho (11px no mínimo). Só se nem o oval
 * couber (telas menores que 390px) o desenho inteiro encolhe.
 * Não há lista embaixo: a alternativa em texto é o aria-label.
 *
 * Geometria de cada tela no desenho (tamanho / raio / caixa / margem):
 *   00 Componentes 320/100/120/0 (padrão) · Início 340/112/118/9 ·
 *   M2 340/116/112/2 · M3 360/118/120/2 · Revisão 360/122/112/12
 *
 * @param {object} p
 * @param {Array}  p.etapas  [{ titulo, detalhe?, nota?, texto?, destaque?, tituloMono?, href? }]
 *   detalhe: linha em mono 11px ("1 · 3 · 7 · 16 · 35 dias"); nota: linha 11px
 *   ("9 perguntas · 4 vencidas"); texto: só entra na descrição para leitor de
 *   tela; destaque: caixa ciano; tituloMono: título em mono (os dias da Revisão).
 * @param {string|object} [p.centro]  texto do centro, ou { texto, cor, tamanho, largura }.
 *   Sem centro, o meio fica vazio (Início).
 * @param {string} [p.frase]   linha em negrito no topo da caixa (M2: "O laço que se fecha: …")
 * @param {string} [p.legenda] frase miúda embaixo, dentro da caixa (nome antigo: `nota`)
 * @param {number} [p.espacoDaLegenda=12]  espaço acima da legenda: 16 no laço do M2
 * @param {string} [p.corRetorno='#22D3EE']  cor do arco n → 1 (Revisão: '#EF4444')
 * @param {string} [p.marcador='acento']     'neutro' = marcador cinza, ciano só no destaque
 * @param {string} [p.descricao]             alternativa em texto; sem ela, é gerada
 *
 * Ex.: criarCiclo({ tamanho: 360, raio: 118, larguraDaCaixa: 120, margem: 2,
 *        etapas: [{ titulo: 'Nascimento' }, …], centro: 'e o tema seguinte começa' })
 * Ex. (laço do M2, quando src/data/modulo2.js tiver o campo `laco` do desenho):
 *      criarCiclo({ tamanho: 340, raio: 116, larguraDaCaixa: 112, margem: 2,
 *        etapas: modulo2.laco.etapas.map((titulo) => ({ titulo })),
 *        centro: { texto: modulo2.laco.centro, largura: 96 },
 *        frase: modulo2.laco.frase, legenda: modulo2.laco.legenda, espacoDaLegenda: 16,
 *        descricao: modulo2.laco.descricao })
 */
export function criarCiclo({
  etapas = [],
  centro = null,
  retorno = null,
  corRetorno = COR.acento,
  tamanho = 320,
  raio = 100,
  larguraDaCaixa = 120,
  margem = 0,
  marcador = 'acento',
  descricao = null,
  frase = null,
  nota = null,
  legenda = null,
  espacoDaLegenda = 12,
  titulo = null,
  rotulo = 'Relação: o que se repete',
  mostrarCabecalho = false,
} = {}) {
  const n = etapas.length;
  const sufixo = novoSufixo();

  // A geometria do palco: largura × altura, o raio na horizontal (rx) e na
  // vertical (ry) e a margem das caixas até a borda. Começa no círculo do
  // desenho (rx = ry = raio, palco quadrado) e muda em escolherGeometria.
  const geo = { largura: tamanho, altura: tamanho, rx: raio, ry: raio, margem };

  const angulo = (i) => ((-90 + (i * 360) / n) * Math.PI) / 180;
  const ponto = (a) => ({ x: geo.largura / 2 + geo.rx * Math.cos(a), y: geo.altura / 2 + geo.ry * Math.sin(a) });

  // Centro de cada caixa: na curva, mas preso para não sair do palco.
  function calcularCentros() {
    const meia = larguraDaCaixa / 2 + geo.margem;
    return etapas.map((_, i) => {
      const p = ponto(angulo(i));
      return { x: limitar(p.x, meia, geo.largura - meia), y: p.y };
    });
  }
  let centros = calcularCentros();

  function definirGeometria(nova) {
    Object.assign(geo, nova);
    centros = calcularCentros();
  }

  // --- O desenho: setas em SVG --------------------------------------------
  const desenho = html`<svg viewBox="0 0 ${tamanho} ${tamanho}" width="${tamanho}" height="${tamanho}" aria-hidden="true" style="position:absolute;inset:0"></svg>`;
  desenho.append(
    svg`<defs>
      <marker id="omh-ciclo-${sufixo}-seta" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${COR.suave}"></path></marker>
      <marker id="omh-ciclo-${sufixo}-volta" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${corRetorno}"></path></marker>
    </defs>`,
  );
  const arcos = etapas.map((_, i) => {
    const volta = i === n - 1;
    const arco = svg`<path fill="none" stroke="${volta ? corRetorno : COR.suave}" stroke-width="2"
      stroke-dasharray="${volta ? '6 5' : 'none'}"
      marker-end="url(#omh-ciclo-${sufixo}-${volta ? 'volta' : 'seta'})"></path>`;
    desenho.append(arco);
    return arco;
  });

  // Um ponto da curva está dentro da caixa i (com uma folga em px)?
  function dentroDaCaixa(p, i, medidas, folga) {
    const { largura, altura } = medidas[i];
    return Math.abs(p.x - centros[i].x) <= largura / 2 + folga && Math.abs(p.y - centros[i].y) <= altura / 2 + folga;
  }

  // O trecho da curva entre a caixa i e a seguinte: começa onde a curva sai
  // da caixa i e termina onde entra na seguinte. A ponta da seta passa ~3px
  // do fim do traço, então o traço para 4px antes da caixa e a ponta encosta
  // nela. Devolve os dois ângulos (em radianos).
  const PASSO_DO_ARCO = (0.5 * Math.PI) / 180;
  function trechoDoArco(i, medidas) {
    const seguinte = (i + 1) % n;
    let inicio = angulo(i);
    const limite = angulo(i + 1); // angulo(n) = angulo(0) + 360°: já "desenrolado"
    let fim = limite;
    while (inicio < limite && dentroDaCaixa(ponto(inicio), i, medidas, 2)) inicio += PASSO_DO_ARCO;
    while (fim > inicio && dentroDaCaixa(ponto(fim), seguinte, medidas, 4)) fim -= PASSO_DO_ARCO;
    return { inicio, fim };
  }

  function desenharArcos(medidas) {
    arcos.forEach((arco, i) => {
      const { inicio, fim } = trechoDoArco(i, medidas);
      if (fim - inicio < PASSO_DO_ARCO * 4) {
        arco.setAttribute('d', ''); // caixas coladas: sem espaço para seta
        return;
      }
      const p1 = ponto(inicio);
      const p2 = ponto(fim);
      const grande = fim - inicio > Math.PI ? 1 : 0;
      // "A rx,ry": no círculo os dois raios são iguais; no oval, não.
      arco.setAttribute(
        'd',
        'M' + p1.x.toFixed(1) + ',' + p1.y.toFixed(1) +
          ' A' + geo.rx.toFixed(1) + ',' + geo.ry.toFixed(1) + ' 0 ' + grande + ' 1 ' +
          p2.x.toFixed(1) + ',' + p2.y.toFixed(1),
      );
    });
  }

  // Com a geometria atual: nenhuma caixa chega a menos de 8px de outra, o
  // texto do centro não encosta em nenhuma caixa, e todo traço tem pelo menos
  // 12px (o bastante para a ponta da seta aparecer inteira entre as caixas)?
  const FOLGA_ENTRE_CAIXAS = 8;
  const SETA_MINIMA = 12;
  const FOLGA_DO_CENTRO = 2; // a folga que o desenho do M3 tem entre o texto do centro e a caixa 2
  function cabe(medidas, medidaDoCentro) {
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        const dx = Math.abs(centros[i].x - centros[j].x);
        const dy = Math.abs(centros[i].y - centros[j].y);
        const encostaX = dx < (medidas[i].largura + medidas[j].largura) / 2 + FOLGA_ENTRE_CAIXAS;
        const encostaY = dy < (medidas[i].altura + medidas[j].altura) / 2 + FOLGA_ENTRE_CAIXAS;
        if (encostaX && encostaY) return false;
      }
    }
    if (medidaDoCentro) {
      const meio = { x: geo.largura / 2, y: geo.altura / 2 };
      const encostaNoCentro = centros.some(
        (lugar, i) =>
          Math.abs(lugar.x - meio.x) < (medidas[i].largura + medidaDoCentro.largura) / 2 + FOLGA_DO_CENTRO &&
          Math.abs(lugar.y - meio.y) < (medidas[i].altura + medidaDoCentro.altura) / 2 + FOLGA_DO_CENTRO,
      );
      if (encostaNoCentro) return false;
    }
    return etapas.every((_, i) => {
      const { inicio, fim } = trechoDoArco(i, medidas);
      return comprimentoDoTrecho(inicio, fim) >= SETA_MINIMA;
    });
  }

  // Comprimento da curva entre dois ângulos, somando pedacinhos retos (no
  // oval não existe a conta simples "ângulo × raio" do círculo).
  function comprimentoDoTrecho(inicio, fim) {
    let total = 0;
    let anterior = ponto(inicio);
    for (let a = inicio + PASSO_DO_ARCO; a < fim + PASSO_DO_ARCO; a += PASSO_DO_ARCO) {
      const atual = ponto(Math.min(a, fim));
      total += Math.hypot(atual.x - anterior.x, atual.y - anterior.y);
      anterior = atual;
    }
    return total;
  }

  // 1) O círculo do desenho. Se as caixas reais não couberem nele, cresce de
  //    2 em 2px (até 60% a mais) e o quadrado cresce junto, com as mesmas
  //    margens. Devolve se coube; se não coube, fica o do desenho.
  function escolherCirculo(medidas, medidaDoCentro) {
    for (let r = raio; r <= raio * 1.6; r += 2) {
      const lado = tamanho + 2 * (r - raio);
      definirGeometria({ largura: lado, altura: lado, rx: r, ry: r, margem });
      if (cabe(medidas, medidaDoCentro)) return true;
    }
    definirGeometria({ largura: tamanho, altura: tamanho, rx: raio, ry: raio, margem });
    return false;
  }

  // 2) Área mais estreita que o círculo (celular): o círculo vira oval. O
  //    palco fica com a largura da área; o raio na horizontal (rx) vai de onde
  //    as caixas das pontas encostam na borda até onde a curva encosta nela
  //    (as caixas das pontas são puxadas para dentro). O raio na vertical (ry)
  //    começa no do desenho e cresce de 4 em 4px (o rx anda de 2 em 2): o
  //    primeiro que couber é o oval mais baixo. Só se nenhum couber na área o
  //    palco passa dela (fica o mais estreito, e o desenho encolhe). Devolve
  //    se coube.
  function escolherOval(medidas, medidaDoCentro, larguraDaArea, soNaArea = false) {
    const meia = larguraDaCaixa / 2;
    // A caixa mais afastada do meio, na horizontal (cos do ângulo).
    const maiorCosseno = Math.max(...etapas.map((_, i) => Math.abs(Math.cos(angulo(i)))));
    const rxInicial = Math.max(raio / 2, (larguraDaArea / 2 - meia) / maiorCosseno);
    const rxNaArea = larguraDaArea / 2 - 2; // o maior rx com a curva dentro da área
    const tentar = (rx, ry) => {
      definirGeometria({ largura: Math.max(larguraDaArea, 2 * (rx + 2)), altura: tamanho + 2 * (ry - raio), rx, ry, margem: 0 });
      return cabe(medidas, medidaDoCentro);
    };
    // O oval mais baixo com a largura da área.
    for (let ry = raio; ry <= raio * 1.8; ry += 4) {
      for (let rx = rxInicial; rx <= rxNaArea; rx += 2) if (tentar(rx, ry)) return true;
    }
    // Nenhum coube na área: o mais estreito que couber.
    if (soNaArea) return false;
    for (let rx = Math.max(rxInicial, rxNaArea); rx <= raio * 1.6; rx += 2) {
      for (let ry = raio; ry <= raio * 1.8; ry += 4) if (tentar(rx, ry)) return true;
    }
    return false;
  }

  // O tamanho do texto do centro com uma largura máxima dada (null = sem
  // texto no centro). Muda o max-width de verdade e mede.
  function medirCentro(larguraMaxima) {
    if (!textoDoCentro) return null;
    textoDoCentro.style.maxWidth = larguraMaxima + 'px';
    return { largura: textoDoCentro.offsetWidth, altura: textoDoCentro.offsetHeight };
  }

  // Escolhe entre o círculo e o oval. O oval só entra se o círculo não cabe
  // na área. No oval, o texto do centro pode quebrar em mais linhas (largura
  // máxima menor, de 10 em 10px, até 60px): assim as caixas do lado não
  // encostam nele e o oval sobe menos. Fica o oval mais baixo que cabe na
  // área. Se nada couber, fica o mais estreito entre o círculo e o oval, com
  // o centro do desenho (e o desenho encolhe).
  function escolherGeometria(medidas, larguraDaArea) {
    const larguraDoCentro = c?.largura ?? 90;
    const circuloCoube = escolherCirculo(medidas, medirCentro(larguraDoCentro));
    if (circuloCoube && geo.largura <= larguraDaArea) return;
    const circulo = { ...geo };
    const largurasDoCentro = [];
    for (let largura = larguraDoCentro; largura >= 60; largura -= 10) largurasDoCentro.push(largura);
    let melhor = null;
    for (const largura of textoDoCentro ? largurasDoCentro : [null]) {
      const coube = escolherOval(medidas, medirCentro(largura), larguraDaArea, true);
      if (coube && (!melhor || geo.altura < melhor.geo.altura)) melhor = { geo: { ...geo }, largura };
      if (melhor && melhor.geo.ry === raio) break; // mais baixo que o do desenho não fica
    }
    if (melhor) {
      medirCentro(melhor.largura);
      definirGeometria(melhor.geo);
      return;
    }
    const ovalCoube = escolherOval(medidas, medirCentro(larguraDoCentro), larguraDaArea);
    if (ovalCoube && (!circuloCoube || geo.largura < circulo.largura)) return;
    definirGeometria(circulo);
  }

  // --- As caixas -------------------------------------------------------------
  const caixas = etapas.map((etapa, i) => {
    const destaque = Boolean(etapa.destaque);
    const marcadorCiano = marcador !== 'neutro' || destaque;
    // left/top entram em aplicarGeometria (a geometria pode mudar).
    const estilo =
      'position:absolute;' +
      'transform:translate(-50%,-50%);width:' + larguraDaCaixa + 'px;box-sizing:border-box;border-radius:8px;' +
      'border:1px solid ' + (destaque ? COR.acento : COR.borda) + ';background:' + (destaque ? 'rgba(34,211,238,.1)' : COR.superficie) + ';' +
      'padding:8px;text-align:center;text-decoration:none;color:#E6EDF3';
    const estiloTitulo = etapa.tituloMono
      ? 'display:block;margin:4px 0 0;font-family:' + FONTE_MONO + ';font-size:13px;font-weight:600'
      : 'display:block;margin:4px 0 0;font-size:13px;font-weight:600;line-height:1.25';
    const miolo = [
      html`<span aria-hidden="true" style="display:inline-flex;width:22px;height:22px;border-radius:50%;background:${marcadorCiano ? COR.acento : COR.borda};color:${marcadorCiano ? COR.fundo : COR.texto};font-family:${FONTE_MONO};font-size:12px;font-weight:700;align-items:center;justify-content:center">${i + 1}</span>`,
      html`<span style="${estiloTitulo}">${etapa.titulo}</span>`,
      etapa.detalhe ? html`<span style="display:block;margin:2px 0 0;font-family:${FONTE_MONO};font-size:11px;color:#9AA7B4">${etapa.detalhe}</span>` : null,
      etapa.nota ? html`<span style="display:block;margin:2px 0 0;font-size:11px;color:${destaque ? COR.acento : COR.suave}">${etapa.nota}</span>` : null,
    ];
    return etapa.href
      ? criarElemento('a', { href: etapa.href, style: estilo }, miolo)
      : criarElemento('div', { style: estilo }, miolo);
  });

  // --- O centro ------------------------------------------------------------
  const c = typeof centro === 'string' ? { texto: centro } : centro ?? (retorno ? { texto: retorno } : null);
  const textoDoCentro = c?.texto
    ? html`<p style="position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);margin:0;text-align:center;font-size:${c.tamanho ?? 12}px;color:${c.cor ?? COR.acento};max-width:${c.largura ?? 90}px;line-height:1.3">${c.texto}</p>`
    : null;

  // --- Alternativa em texto: "1 Ler a aba → 2 … → volta a 1." --------------
  const alternativa =
    descricao ??
    etapas
      .map((e, i) => i + 1 + ' ' + e.titulo + (e.detalhe ? ' (' + e.detalhe + ')' : '') + (e.nota ? ', ' + e.nota : '') + (e.texto ? ': ' + e.texto : ''))
      .join(' → ') +
      ' → volta a 1' + (c?.texto ? ', ' + c.texto : '') + '.';

  // Se alguma etapa é link, o palco é um grupo (link dentro de role="img" some
  // para o leitor de tela); senão, é uma imagem com a alternativa.
  const temLink = etapas.some((e) => e.href);
  const palco = criarElemento(
    'div',
    {
      role: temLink ? 'group' : 'img',
      'aria-label': alternativa,
      style: 'position:absolute;left:0;top:0;transform-origin:0 0',
    },
    [desenho, ...caixas, textoDoCentro],
  );
  // O encaixe tem o tamanho do palco na tela; a área (a linha centralizada que
  // o contém) é quem diz quanto espaço há.
  const encaixe = html`<div style="position:relative;flex:0 0 auto;max-width:100%">${palco}</div>`;
  const area = html`<div style="display:flex;justify-content:center">${encaixe}</div>`;

  // Leva a geometria atual para o SVG, o palco, o encaixe e as caixas.
  // `escala` < 1 só quando nem o oval cabe (telas menores que 390px).
  function aplicarGeometria(escala = 1) {
    const { largura, altura } = geo;
    desenho.setAttribute('viewBox', '0 0 ' + largura.toFixed(1) + ' ' + altura.toFixed(1));
    desenho.setAttribute('width', largura.toFixed(1));
    desenho.setAttribute('height', altura.toFixed(1));
    palco.style.width = largura.toFixed(1) + 'px';
    palco.style.height = altura.toFixed(1) + 'px';
    palco.style.transform = escala < 1 ? 'scale(' + escala.toFixed(4) + ')' : '';
    encaixe.style.width = (largura * escala).toFixed(1) + 'px';
    encaixe.style.height = (altura * escala).toFixed(1) + 'px';
    caixas.forEach((caixa, i) => {
      caixa.style.left = centros[i].x.toFixed(1) + 'px';
      caixa.style.top = centros[i].y.toFixed(1) + 'px';
    });
  }

  // Antes de ir para a tela, as caixas ainda não têm tamanho: desenha com uma
  // estimativa, e o ResizeObserver refaz com o tamanho real assim que existir.
  aplicarGeometria();
  desenharArcos(etapas.map(() => ({ largura: larguraDaCaixa, altura: 60 })));

  let ultimoAjuste = '';
  function ajustar() {
    const larguraDaArea = area.clientWidth;
    if (!larguraDaArea) return; // aba escondida: espera aparecer
    const medidas = caixas.map((caixa) => ({ largura: caixa.offsetWidth, altura: caixa.offsetHeight }));
    if (medidas.some((m) => !m.largura)) return;
    // Mesma largura e mesmas caixas: a geometria já está certa. (Acontece logo
    // depois de cada ajuste, porque a altura do desenho mudou.)
    const chave = larguraDaArea + ':' + medidas.map((m) => m.largura + 'x' + m.altura).join(',');
    if (chave === ultimoAjuste) return;
    ultimoAjuste = chave;
    escolherGeometria(medidas, larguraDaArea);
    // O transform não muda o tamanho medido das caixas, e a mesma área dá
    // sempre a mesma geometria: isto não entra em laço.
    aplicarGeometria(Math.min(1, larguraDaArea / geo.largura));
    desenharArcos(medidas);
  }
  if (typeof ResizeObserver === 'function') {
    // O ajuste roda no quadro seguinte: mudar tamanhos dentro do próprio
    // aviso do ResizeObserver gera o erro "ResizeObserver loop".
    let pedido = 0;
    const observador = new ResizeObserver(() => {
      cancelAnimationFrame(pedido);
      pedido = requestAnimationFrame(ajustar);
    });
    observador.observe(area);
    caixas.forEach((caixa) => observador.observe(caixa));
  }

  // Padding da caixa: 20px no desktop, 16px no celular.
  return moldura({
    titulo,
    rotulo,
    mostrarCabecalho,
    frase,
    legenda: legenda ?? nota,
    espacoDaLegenda,
    padding: 'clamp(16px, 4vw, 20px)',
    conteudo: area,
  });
}

// ---------------------------------------------------------------------------
// Grade de 100
// ---------------------------------------------------------------------------

// As cinco cores que a grade aceita, com o significado do desenho.
export const CORES_DA_GRADE = {
  ruim: '#EF4444', // vermelho: o desfecho ruim
  bom: '#22C55E', // verde
  atencao: '#F59E0B', // âmbar
  modelo: '#7C3AED', // roxo: o que o modelo pega
  resto: '#1F2733', // o resto
};
const CORES_PERMITIDAS = Object.values(CORES_DA_GRADE);

// `cor` pode ser o hex ou o nome ('ruim', 'resto'…); `tom` é o formato antigo.
function corDoGrupo(grupo) {
  const pedida = CORES_DA_GRADE[grupo.cor] ?? grupo.cor;
  if (pedida && CORES_PERMITIDAS.includes(String(pedida).toUpperCase())) return String(pedida).toUpperCase();
  return COR_DO_TOM[grupo.tom] ?? COR.primaria;
}

/**
 * 100 quadrados em 10 colunas (gap 3px, no máximo 230px de largura), grupos
 * coloridos na ordem, legenda com o número em mono e a fonte. A grade
 * arredonda: o exato vai sempre ao lado (`exato`) ou na fonte.
 *
 * @param {object} p
 * @param {string} p.frase    "De cada 100…" (em negrito, no topo)
 * @param {Array}  p.grupos   [{ rotulo, quantidade, cor, exibicao?, tracejado? }] — soma 100;
 *   o que faltar vira #1F2733. exibicao: texto no lugar do número ('' = sem número);
 *   tracejado: item só de legenda, com quadrado tracejado (ex.: "sem efeito, seriam 50").
 * @param {string} [p.fonte]  frase miúda embaixo (nome antigo: `nota`)
 * @param {string} [p.exato], [p.credito]  linha "68,67%  exato · CoinGecko Research…" (M2)
 * @param {string} [p.contestacao]  caixa âmbar "Contestado" (M2)
 * @param {boolean} [p.caixa=true]  false = sem a caixa #0B0F17 (duas grades numa figura só)
 * @param {string} [p.padding='16px']  '16px 20px' no M2 e no M7
 * @param {number} [p.tamanhoDaFrase=15]  14 no M2 e no M7
 * @param {number} [p.espacoDaLegenda=12]  espaço entre a grade e a legenda: 10 no M2 e no M7
 * @param {string} [p.descricao]  alternativa em texto; sem ela, frase + legenda
 *
 * Ex.: criarGradeDe100({ frase: 'De cada 100 rugs reais, ele pega uns 68.',
 *        grupos: [{ rotulo: 'o modelo pega', quantidade: 68, cor: 'modelo' },
 *                 { rotulo: 'passam despercebidos', quantidade: 32, cor: 'resto' }] })
 */
export function criarGradeDe100({ frase, grupos = [], fonte = null, nota = null, exato = null, credito = null, contestacao = null, caixa = true, padding = '16px', tamanhoDaFrase = 15, espacoDaLegenda = 12, descricao = null } = {}) {
  const celulas = [];
  grupos.forEach((grupo) => {
    if (grupo.tracejado) return;
    const cor = corDoGrupo(grupo);
    for (let i = 0; i < (grupo.quantidade ?? 0); i++) celulas.push(cor);
  });
  while (celulas.length < 100) celulas.push(COR.borda);

  const numeroDoGrupo = (g) => (g.exibicao !== undefined ? g.exibicao : String(g.quantidade ?? ''));

  const alternativa =
    descricao ??
    frase +
      // Como no desenho do M2: "Número exato: 68,67% (CoinGecko Research · …)."
      (exato ? ' Número exato: ' + exato + (credito ? ' (' + credito + ')' : '') + '.' : '') +
      ' ' +
      grupos
        .filter((g) => !g.tracejado)
        .map((g) => (numeroDoGrupo(g) ? numeroDoGrupo(g) + ' — ' : '') + g.rotulo)
        .join('; ') +
      (contestacao ? ' ' + contestacao : '');

  const grade = html`<div role="img" aria-label="${alternativa}" style="display:grid;grid-template-columns:repeat(10,1fr);gap:3px;max-width:230px">
    ${celulas.slice(0, 100).map((cor) => html`<span style="aspect-ratio:1;border-radius:3px;background:${cor}"></span>`)}
  </div>`;

  const itensDaLegenda = grupos.map((g) => {
    if (g.tracejado) {
      return html`<span aria-hidden="true" style="margin-top:2px;display:flex;align-items:center;gap:8px;font-size:13px;color:#9AA7B4"><span style="width:12px;height:12px;border-radius:3px;border:2px dashed #9AA7B4;box-sizing:border-box;flex:0 0 12px"></span>${g.rotulo}</span>`;
    }
    const numero = numeroDoGrupo(g);
    return html`<span style="display:flex;align-items:center;gap:8px;font-size:14px;color:#9AA7B4">
      <span aria-hidden="true" style="width:12px;height:12px;border-radius:3px;background:${corDoGrupo(g)};flex:0 0 12px"></span>
      ${numero ? html`<span style="font-family:${FONTE_MONO};color:#E6EDF3;min-width:2ch;text-align:right;white-space:nowrap;flex-shrink:0">${numero}</span>` : ''}${g.rotulo}
    </span>`;
  });

  const textoDaFonte = fonte ?? nota;
  const legenda = html`<figcaption style="margin-top:${espacoDaLegenda}px;display:flex;flex-direction:column;gap:4px">
    ${itensDaLegenda}
    ${textoDaFonte ? html`<span style="margin-top:4px;font-size:12px;color:#9AA7B4">${textoDaFonte}</span>` : ''}
    ${contestacao ? html`<span style="margin-top:6px;border-radius:6px;border:1px solid rgba(245,158,11,.4);background:rgba(245,158,11,.12);padding:8px 10px;font-size:13px;color:#E6EDF3"><strong style="display:block;font-size:11px;font-weight:600;letter-spacing:.05em;text-transform:uppercase;color:#F59E0B">Contestado</strong>${contestacao}</span>` : ''}
  </figcaption>`;

  const estiloDaCaixa = caixa
    ? 'border-radius:8px;border:1px solid #1F2733;background:#0B0F17;padding:' + padding + ';min-width:0'
    : 'min-width:0';

  return html`<figure style="${estiloDaCaixa}">
    <p style="margin:0 0 ${exato ? 6 : 12}px;font-size:${tamanhoDaFrase}px;font-weight:600;text-wrap:pretty">${frase}</p>
    ${exato ? html`<p style="margin:0 0 10px;display:flex;flex-wrap:wrap;gap:8px;align-items:baseline"><span style="font-family:${FONTE_MONO};font-size:1.125rem;font-weight:700;font-variant-numeric:tabular-nums">${exato}</span><span style="font-size:12px;color:#9AA7B4">exato${credito ? ' · ' + credito : ''}</span></p>` : ''}
    ${grade}
    ${legenda}
  </figure>`;
}

/**
 * Duas (ou mais) grades de 100 numa figura só, como no M2 ("'Vai a zero'
 * depende da régua — de cada 100 tokens do Pump.fun"): frase em negrito no
 * topo, as grades lado a lado (uma embaixo da outra no celular: grade
 * auto-fit, minmax 250px) e uma legenda comum embaixo. Cada grade é uma
 * criarGradeDe100 sem caixa própria, com a frase de 14px e a legenda a 10px
 * (o traço do desenho); quem chama pode trocar essas opções.
 *
 * @param {object} p
 * @param {string} [p.frase]    linha em negrito no topo da figura
 * @param {Array}  p.grades     [opções de criarGradeDe100: { frase, grupos, exato, credito, fonte, contestacao }]
 * @param {string} [p.legenda]  frase miúda comum, embaixo
 *
 * Ex.: criarGradesLadoALado({ frase: modulo2.grades.frase, legenda: modulo2.grades.legenda,
 *        grades: modulo2.grades.itens })
 */
export function criarGradesLadoALado({ frase = null, grades = [], legenda = null } = {}) {
  return html`<figure style="margin:0;border-radius:8px;border:1px solid #1F2733;background:#0B0F17;padding:16px 20px;min-width:0">
    ${frase ? html`<p style="margin:0 0 12px;font-size:14px;font-weight:600">${frase}</p>` : ''}
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:16px">
      ${grades.map((grade) => criarGradeDe100({ caixa: false, tamanhoDaFrase: 14, espacoDaLegenda: 10, ...grade }))}
    </div>
    ${legenda ? html`<figcaption style="margin-top:12px;font-size:13px;color:#9AA7B4">${legenda}</figcaption>` : ''}
  </figure>`;
}

// ---------------------------------------------------------------------------
// Barras na mesma escala
// ---------------------------------------------------------------------------

const ESTILO_DA_PARTE = {
  solido: (cor) => 'border-radius:0;border:0;background:' + (cor ?? COR.primaria),
  tracejado: () => 'border-radius:4px;border:2px dashed #9AA7B4;background:transparent',
  listrado: (cor) =>
    'border-radius:0;border:0;background:repeating-linear-gradient(135deg,' + (cor ?? COR.acento) + ' 0 3px,transparent 3px 6px)',
};

// As partes de uma barra, já normalizadas: { rotulo, fracao, estilo, cor }.
function partesDaBarra(item) {
  if (item.partes?.length) {
    return item.partes.map((parte) => ({
      rotulo: parte.rotulo ?? '',
      fracao: parte.fracao ?? (parte.valor ?? 0) / (item.valor || 1),
      estilo: parte.estilo ?? (parte.tom === 'suave' ? 'listrado' : 'solido'),
      cor: parte.cor ?? (parte.tom ? COR_DO_TOM[parte.tom] : undefined),
    }));
  }
  return [{ rotulo: '', fracao: 1, estilo: item.estilo ?? 'solido', cor: item.cor ?? (item.tom ? COR_DO_TOM[item.tom] : undefined) }];
}

// Termina a frase com ponto, se ela ainda não terminar com pontuação.
function comPonto(texto) {
  const frase = String(texto).trim();
  return /[.!?…]$/.test(frase) ? frase : frase + '.';
}

// " (tokens: US$ 4 mil; SOL: US$ 4 mil)". Parte sem valor sai só com o rótulo
// (sem ": "); se nenhuma parte tiver valor, não há parênteses.
function textoDasPartes(partes = []) {
  if (!partes.some((parte) => parte.exibicao)) return '';
  const pedacos = partes.map((parte) => [parte.rotulo, parte.exibicao].filter(Boolean).join(': ')).filter(Boolean);
  return ' (' + pedacos.join('; ') + ')';
}

// A alternativa em texto das barras, gerada dos dados: uma frase por barra.
// "Market cap = FDV — US$ 50 mil (no papel). Preço da última negociação × …"
// Barra de um estilo só leva o rótulo da legenda desse estilo ("no papel"). A
// nota de cada barra entra também: ela fica dentro do role="img", e o leitor
// de tela não a lê lá.
function textoDasBarras(lista, rotulos) {
  return lista
    .map((item) => {
      const partes = item.partes?.length ? textoDasPartes(item.partes) : '';
      const estilo = item.partes?.length ? null : partesDaBarra(item)[0].estilo;
      const doEstilo = estilo && rotulos[estilo] ? ' (' + rotulos[estilo] + ')' : '';
      const valor = item.exibicao ? ' — ' + item.exibicao : '';
      return comPonto(item.rotulo + valor + partes + doEstilo) + (item.nota ? ' ' + comPonto(item.nota) : '');
    })
    .join(' ');
}

/**
 * 2–4 barras, todas na mesma escala (100% = `maximo`, ou o maior valor).
 * Partes: sólido (dinheiro real), tracejado (número no papel), listrado (a
 * parte que interessa). Aceita também o formato antigo { tom, partes:[{fracao,tom}] }.
 * Sem título, sem "Relação" e sem nota: a legenda só mostra os estilos que
 * aparecem, com os rótulos que quem chama passa (o tracejado, se não vier
 * rótulo, é "no papel", como no desenho).
 *
 * @param {object} p
 * @param {Array}  p.itens    [{ rotulo, valor, exibicao, nota?, estilo?, cor?, partes?: [{ rotulo, valor, estilo, cor?, exibicao? }] }]
 *   exibicao da parte ("US$ 4 mil"): só entra na alternativa em texto, "tokens: US$ 4 mil".
 * @param {object} [p.legenda]  { solido?, tracejado?, listrado? } — rótulos da legenda
 * @param {boolean} [p.exemploInventado]  pílula âmbar "exemplo inventado"
 * @param {string} [p.rodape]   frase miúda dentro da legenda (se o desenho tiver)
 * @param {string} [p.descricao]  alternativa em texto; sem ela, é gerada dos itens (rótulo — valor
 *   (partes ou rótulo do estilo). nota.) e termina em "Exemplo inventado." quando for o caso.
 *
 * Ex.: criarBarrasNaMesmaEscala({ exemploInventado: true,
 *        legenda: { tracejado: 'no papel', solido: 'tokens na pool', listrado: 'SOL: paga quem vende' },
 *        itens: [{ rotulo: 'Market cap', valor: 50000, exibicao: 'US$ 50 mil', estilo: 'tracejado' },
 *                { rotulo: 'Liquidez na pool', valor: 8000, exibicao: 'US$ 8 mil',
 *                  partes: [{ rotulo: 'tokens', valor: 4000, exibicao: 'US$ 4 mil', estilo: 'solido' },
 *                           { rotulo: 'SOL', valor: 4000, exibicao: 'US$ 4 mil', estilo: 'listrado' }] }] })
 */
export function criarBarrasNaMesmaEscala({ titulo = null, itens = [], barras = null, maximo = null, legenda = null, rodape = null, exemploInventado = false, descricao = '', rotulo = 'Relação: proporção', mostrarCabecalho = false } = {}) {
  const lista = barras ?? itens;
  const teto = maximo ?? Math.max(...lista.map((i) => i.valor));

  const desenhar = (item) => {
    const largura = Math.max(0.5, (item.valor / teto) * 100).toFixed(2);
    return html`<div>
      <div style="display:flex;justify-content:space-between;align-items:baseline;gap:12px;flex-wrap:wrap">
        <span style="font-size:14px;font-weight:600">${item.rotulo}</span>
        <span style="font-family:${FONTE_MONO};font-size:14px;color:#E6EDF3">${item.exibicao}</span>
      </div>
      <div style="margin-top:6px;height:28px;display:flex;width:${largura}%;min-width:4px">
        ${partesDaBarra(item).map(
          (parte) => html`<span title="${parte.rotulo}" style="height:100%;width:${(parte.fracao * 100).toFixed(2)}%;box-sizing:border-box;${(ESTILO_DA_PARTE[parte.estilo] ?? ESTILO_DA_PARTE.solido)(parte.cor)}"></span>`,
        )}
      </div>
      ${item.nota ? html`<p style="margin:4px 0 0;font-size:13px;color:#9AA7B4">${item.nota}</p>` : ''}
    </div>`;
  };

  const estilosUsados = new Set(lista.flatMap((item) => partesDaBarra(item).map((parte) => parte.estilo)));
  const rotulos = {
    tracejado: legenda?.tracejado ?? 'no papel',
    solido: legenda?.solido ?? null,
    listrado: legenda?.listrado ?? null,
  };

  const alternativa = descricao || textoDasBarras(lista, rotulos) + (exemploInventado ? ' Exemplo inventado.' : '');
  const amostra = {
    tracejado: 'border:2px dashed #9AA7B4',
    solido: 'background:#7C3AED',
    listrado: 'background:repeating-linear-gradient(135deg,#22D3EE 0 3px,transparent 3px 6px)',
  };
  const itensDaLegenda = ['tracejado', 'solido', 'listrado']
    .filter((estilo) => estilosUsados.has(estilo) && rotulos[estilo])
    .map(
      (estilo) => html`<span style="display:inline-flex;align-items:center;gap:6px"><span aria-hidden="true" style="width:22px;height:12px;border-radius:3px;box-sizing:border-box;${amostra[estilo]}"></span>${rotulos[estilo]}</span>`,
    );

  const temRodape = itensDaLegenda.length || exemploInventado || rodape;
  const rodapeDaFigura = temRodape
    ? html`<figcaption style="margin-top:16px;display:flex;flex-wrap:wrap;align-items:center;gap:14px;font-size:13px;color:#9AA7B4">
        ${itensDaLegenda}
        ${exemploInventado ? html`<span style="margin-left:auto;border-radius:999px;border:1px solid rgba(245,158,11,.4);background:rgba(245,158,11,.12);color:#F59E0B;padding:1px 10px;font-size:12px;font-weight:600;white-space:nowrap">exemplo inventado</span>` : ''}
        ${rodape ? html`<span style="flex:1 1 100%">${rodape}</span>` : ''}
      </figcaption>`
    : '';

  return html`<figure style="border-radius:8px;border:1px solid #1F2733;background:#0B0F17;padding:16px 20px;min-width:0">
    ${criarCabecalho({ titulo, rotulo, mostrarCabecalho })}
    <div role="img" aria-label="${alternativa}" style="display:flex;flex-direction:column;gap:16px">${lista.map(desenhar)}</div>
    ${rodapeDaFigura}
  </figure>`;
}

// ---------------------------------------------------------------------------
// Curva deslizante
// ---------------------------------------------------------------------------

// Caixa do gráfico, em coordenadas do SVG 320×230 do desenho.
const GRAFICO = { largura: 320, altura: 230, esquerda: 40, direita: 300, topo: 20, base: 180 };

// Tamanho do texto do gráfico: 11 unidades do SVG de 320 = 3,4375% da
// largura do gráfico (unidade cqw: o gráfico é um "container"). Com o gráfico
// em 360px dá ≈ 12,4px, como o texto do SVG do desenho; no celular, quando o
// gráfico encolhe, o texto para em 11px (ver o max() abaixo).
const TAMANHO_DO_TEXTO_DO_GRAFICO = ((11 / GRAFICO.largura) * 100).toFixed(4) + 'cqw';

// Texto do gráfico em HTML por cima do SVG, para nunca ficar ilegível.
// (x, y) = ponto de apoio do texto no SVG; `ancora` = 'start' | 'middle' |
// 'end', como o text-anchor do SVG.

function textoSobreOGrafico(texto, x, y, { ancora = 'start', mono = false, girado = false } = {}) {
  const esquerda = ((x / GRAFICO.largura) * 100).toFixed(2) + '%';
  const topo = ((y / GRAFICO.altura) * 100).toFixed(2) + '%';
  const deslocamentoX = { start: '0', middle: '-50%', end: '-100%' }[ancora];
  const transformacao = girado ? 'translate(-50%,-50%) rotate(-90deg)' : 'translate(' + deslocamentoX + ',-78%)';
  return html`<span aria-hidden="true" style="position:absolute;left:${esquerda};top:${topo};transform:${transformacao};font-family:${mono ? FONTE_MONO : 'Inter,sans-serif'};font-size:max(11px, ${TAMANHO_DO_TEXTO_DO_GRAFICO});line-height:1;color:#9AA7B4;white-space:nowrap">${texto}</span>`;
}

// Atalhos: 40px no desktop, como o desenho; 44px no celular (alvo de toque do
// README). A altura mínima vem das classes do Tailwind (sm = 640px ou mais).
const CLASSE_DO_ATALHO = 'min-h-[44px] sm:min-h-[40px]';
const ESTILO_DO_ATALHO =
  'border-radius:8px;border:1px solid #1F2733;background:#141A24;color:#E6EDF3;padding:8px 12px;font-size:14px;font-weight:600;cursor:pointer;transition:border-color 150ms ease';

/**
 * Curva + marcador + controle deslizante + 2–3 números que mudam + atalhos, no
 * traço do "00 Componentes" (CurvaDeslizante) e do M6 ("quanto sai"). A curva
 * fica à esquerda (SVG 320×230, até 360px) e o controle à direita; no celular,
 * um embaixo do outro (grade auto-fit, minmax 260px).
 *
 * @param {object} p
 * @param {object} p.controle  { rotulo, min, max, passo, valor, formatar: (v) => '10%' }
 * @param {object} p.curva     { pontos: (x) => y, dominioX: [a, b], dominioY: [c, d],
 *                               eixoX, eixoY, origem?: { x, y }, rotuloOrigem?, formula? }
 * @param {Function} p.marcador  (valor, extras) => ({ x, y }) — onde fica o ponto roxo
 * @param {Function} p.numeros   (valor, extras) => [{ rotulo, valor, nota? } | { rotulo, valor, largo: true }]
 *   `largo` ocupa a linha inteira (a faixa "Liquidez anunciada de … ≈ US$ 206");
 *   `rotulo` pode ser texto ou lista de textos/nós.
 * @param {Array}  [p.atalhos]      [{ rotulo, valor }] — "Cair 10%", …
 * @param {Array}  [p.alternativas] [{ rotulo, extras }] — botões liga/desliga ("Pool 10× maior");
 *   os `extras` das ligadas chegam a numeros/marcador/descricao.
 * @param {Function} [p.descricao]  (valor, extras) => alternativa em texto do gráfico
 *
 * Ex.: criarCurvaDeslizante({
 *        controle: { rotulo: 'Quero que o preço caia', min: 1, max: 90, passo: 1, valor: 10, formatar: (v) => v + '%' },
 *        curva: { pontos: (x) => 1 / x, dominioX: [1, 3.3], dominioY: [0.3, 1], eixoX: 'tokens na pool →', eixoY: 'SOL na pool →' },
 *        marcador: (v) => ({ x: …, y: … }), numeros: (v) => [{ rotulo: 'Você recebe', valor: '2,57%' }],
 *        atalhos: [{ rotulo: 'Cair 10%', valor: 10 }] })
 */
export function criarCurvaDeslizante({ id = null, controle, curva = {}, marcador, numeros, atalhos = [], alternativas = [], descricao = null, nota = null } = {}) {
  const idDoControle = id ?? 'omh-curva-' + novoSufixo();
  const formatar = controle.formatar ?? ((v) => String(v));
  const passo = controle.passo ?? 1;
  const { esquerda: X0, direita: X1, topo: Y0, base: Y1 } = GRAFICO;
  const [xMin, xMax] = curva.dominioX ?? [0, 1];
  const [yMin, yMax] = curva.dominioY ?? [0, 1];
  const px = (x) => X0 + ((x - xMin) / (xMax - xMin)) * (X1 - X0);
  const py = (y) => Y1 - ((y - yMin) / (yMax - yMin)) * (Y1 - Y0);

  let valor = controle.valor;
  const ligadas = new Set(); // índices das alternativas ligadas

  function extrasAtuais() {
    return Object.assign({}, ...alternativas.filter((_, i) => ligadas.has(i)).map((alt) => alt.extras ?? {}));
  }

  // --- O gráfico -------------------------------------------------------------
  let caminho = '';
  if (typeof curva.pontos === 'function') {
    for (let i = 0; i <= 60; i++) {
      const x = xMin + (i / 60) * (xMax - xMin);
      caminho += (i ? ' L' : 'M') + px(x).toFixed(1) + ',' + py(curva.pontos(x)).toFixed(1);
    }
  }

  const guiaVertical = svg`<line stroke="#22D3EE" stroke-width="1" stroke-dasharray="3 3"></line>`;
  const guiaHorizontal = svg`<line stroke="#22D3EE" stroke-width="1" stroke-dasharray="3 3"></line>`;
  const ponto = svg`<circle r="7" fill="#7C3AED" stroke="#E6EDF3" stroke-width="2"></circle>`;

  const desenho = html`<svg viewBox="0 0 ${GRAFICO.largura} ${GRAFICO.altura}" width="100%" aria-hidden="true" style="display:block"></svg>`;
  desenho.append(
    svg`<line x1="${X0}" y1="${Y1}" x2="${X1}" y2="${Y1}" stroke="#1F2733" stroke-width="1"></line>`,
    svg`<line x1="${X0}" y1="${Y0}" x2="${X0}" y2="${Y1}" stroke="#1F2733" stroke-width="1"></line>`,
  );
  if (caminho) desenho.append(svg`<path d="${caminho}" fill="none" stroke="#9AA7B4" stroke-width="2"></path>`);
  desenho.append(guiaVertical, guiaHorizontal);
  if (curva.origem) {
    desenho.append(svg`<circle cx="${px(curva.origem.x)}" cy="${py(curva.origem.y)}" r="5" fill="#0B0F17" stroke="#9AA7B4" stroke-width="2"></circle>`);
  }
  desenho.append(ponto);

  const textos = [
    curva.origem && curva.rotuloOrigem ? textoSobreOGrafico(curva.rotuloOrigem, px(curva.origem.x) + 10, py(curva.origem.y) - 2) : null,
    curva.eixoX ? textoSobreOGrafico(curva.eixoX, (X0 + X1) / 2, 205, { ancora: 'middle' }) : null,
    curva.eixoY ? textoSobreOGrafico(curva.eixoY, 10, (Y0 + Y1) / 2, { girado: true }) : null,
    curva.formula ? textoSobreOGrafico(curva.formula, X1, 222, { ancora: 'end', mono: true }) : null,
  ];

  const grafico = criarElemento('div', { role: 'img', style: 'position:relative;width:100%;max-width:360px;container-type:inline-size' }, [desenho, ...textos]);

  // --- O controle ------------------------------------------------------------
  const saida = html`<output for="${idDoControle}" style="font-family:${FONTE_MONO};font-size:14px;font-weight:600"></output>`;
  const deslizante = html`<input id="${idDoControle}" class="omh-range" type="range" min="${controle.min}" max="${controle.max}" step="${passo}" value="${valor}" style="width:100%;margin-top:4px">`;

  // Page Up / Page Down andam 10 passos (← → andam 1, que é o padrão do range).
  deslizante.addEventListener('keydown', (evento) => {
    const salto = { PageUp: 10 * passo, PageDown: -10 * passo }[evento.key];
    if (salto === undefined) return;
    evento.preventDefault();
    irPara(Number(deslizante.value) + salto);
  });
  deslizante.addEventListener('input', () => irPara(Number(deslizante.value)));

  const passarPorCima = (botao, estaLigado) => {
    botao.addEventListener('mouseenter', () => {
      if (!estaLigado()) botao.style.borderColor = COR.suave;
    });
    botao.addEventListener('mouseleave', () => {
      if (!estaLigado()) botao.style.borderColor = COR.borda;
    });
  };

  const botoesDeAtalho = atalhos.map((atalho) => {
    const botao = html`<button type="button" class="${CLASSE_DO_ATALHO}" style="${ESTILO_DO_ATALHO}">${atalho.rotulo}</button>`;
    botao.addEventListener('click', () => irPara(atalho.valor));
    passarPorCima(botao, () => false);
    return botao;
  });

  const botoesDeAlternativa = alternativas.map((alternativa, i) => {
    const botao = html`<button type="button" aria-pressed="false" class="${CLASSE_DO_ATALHO}" style="${ESTILO_DO_ATALHO}">${alternativa.rotulo}</button>`;
    botao.addEventListener('click', () => {
      if (ligadas.has(i)) ligadas.delete(i);
      else ligadas.add(i);
      atualizar();
    });
    passarPorCima(botao, () => ligadas.has(i));
    return botao;
  });

  const areaDosNumeros = html`<div aria-live="polite" style="display:grid;grid-template-columns:1fr 1fr;gap:10px"></div>`;

  function cartao(numero) {
    if (numero.largo) {
      return html`<div style="grid-column:1 / -1;border-radius:8px;border:1px solid #1F2733;background:#141A24;padding:10px 12px;display:flex;justify-content:space-between;gap:12px;align-items:baseline;flex-wrap:wrap">
        <span style="font-size:13px;color:#9AA7B4">${numero.rotulo}</span>
        <span style="font-family:${FONTE_MONO};font-size:1.25rem;font-weight:700;font-variant-numeric:tabular-nums">${numero.valor}</span>
      </div>`;
    }
    return html`<div style="border-radius:8px;border:1px solid #1F2733;background:#141A24;padding:10px 12px;min-width:0">
      <p style="margin:0;font-size:11px;font-weight:600;letter-spacing:.05em;text-transform:uppercase;color:#9AA7B4">${numero.rotulo}</p>
      <p style="margin:4px 0 0;font-family:${FONTE_MONO};font-size:1.5rem;font-weight:700;line-height:1.1;font-variant-numeric:tabular-nums">${numero.valor}</p>
      ${numero.nota ? html`<p style="margin:4px 0 0;font-size:12px;color:#9AA7B4">${numero.nota}</p>` : ''}
    </div>`;
  }

  function irPara(novoValor) {
    valor = limitar(Number(novoValor), Number(controle.min), Number(controle.max));
    deslizante.value = String(valor);
    atualizar();
  }

  function atualizar() {
    const extras = extrasAtuais();
    const texto = formatar(valor);
    saida.textContent = texto;
    deslizante.setAttribute('aria-valuetext', texto);

    const m = marcador ? marcador(valor, extras) : null;
    if (m) {
      const mx = px(m.x).toFixed(1);
      const my = py(m.y).toFixed(1);
      ponto.setAttribute('cx', mx);
      ponto.setAttribute('cy', my);
      guiaVertical.setAttribute('x1', mx);
      guiaVertical.setAttribute('x2', mx);
      guiaVertical.setAttribute('y1', my);
      guiaVertical.setAttribute('y2', Y1);
      guiaHorizontal.setAttribute('x1', X0);
      guiaHorizontal.setAttribute('x2', mx);
      guiaHorizontal.setAttribute('y1', my);
      guiaHorizontal.setAttribute('y2', my);
    }
    grafico.setAttribute('aria-label', descricao ? descricao(valor, extras) : texto);

    botoesDeAlternativa.forEach((botao, i) => {
      const ligada = ligadas.has(i);
      botao.setAttribute('aria-pressed', String(ligada));
      botao.style.borderColor = ligada ? COR.primaria : COR.borda;
      botao.style.background = ligada ? 'rgba(124,58,237,.15)' : COR.superficie;
    });

    areaDosNumeros.replaceChildren(...(numeros ? numeros(valor, extras) : []).map(cartao));
  }

  const painel = html`<div style="display:flex;flex-direction:column;gap:12px;min-width:0">
    <div>
      <div style="display:flex;justify-content:space-between;gap:12px;align-items:baseline">
        <label for="${idDoControle}" style="font-size:14px;color:#9AA7B4">${controle.rotulo}</label>
        ${saida}
      </div>
      ${deslizante}
    </div>
    ${botoesDeAtalho.length || botoesDeAlternativa.length ? html`<div style="display:flex;flex-wrap:wrap;gap:8px">${botoesDeAtalho}${botoesDeAlternativa}</div>` : ''}
    ${areaDosNumeros}
    ${nota ? html`<p style="margin:0;font-size:13px;color:#9AA7B4">${nota}</p>` : ''}
  </div>`;

  atualizar();

  return html`<div style="border-radius:8px;border:1px solid #1F2733;background:#0B0F17;padding:20px;display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:20px;align-items:center;min-width:0">
    ${grafico}
    ${painel}
  </div>`;
}

// ---------------------------------------------------------------------------
// Curva de saída (Módulo 6, "Quanto dá para vender antes de derrubar o preço")
// ---------------------------------------------------------------------------

// Quanto a queda de uma linha da tabela do módulo: 'queda-10' → 10.
function quedaDaLinha(linha) {
  return Number(String(linha.id).split('-')[1]);
}

// "US$ 8 mil", "US$ 80 mil".
function textoDaLiquidez(valor) {
  return valor % 1000 === 0 ? 'US$ ' + (valor / 1000).toLocaleString('pt-BR') + ' mil' : 'US$ ' + valor.toLocaleString('pt-BR');
}

// A liquidez do token inventado, lida do exemplo da seção "quanto-sai" de
// src/data/modulo6.js: "A liquidez anunciada é de US$ 8 mil." → 8000.
// Se o texto mudar de forma e não der para ler, devolve null.
function liquidezDoExemplo() {
  const secao = (modulo6.secoes ?? []).find((item) => item.id === 'quanto-sai');
  const frase = (secao?.exemplo?.passos ?? []).find((passo) => /liquidez anunciada/i.test(passo)) ?? '';
  const achado = frase.match(/US\$\s*([\d.,]+)\s*(mil)?/i);
  if (!achado) return null;
  const numero = Number(achado[1].replace(/\./g, '').replace(',', '.'));
  if (!Number.isFinite(numero)) return null;
  return achado[2] ? numero * 1000 : numero;
}

/**
 * Pool de produto constante (x · y = k): para o preço cair `q`, você vende
 * s = 1/√(1 − q) − 1 dos tokens da reserva e recebe s/(1 + s) · ½ da liquidez
 * anunciada (só a metade em SOL paga quem vende). A porcentagem não depende do
 * tamanho da pool; "Pool 10× maior" muda só os dólares.
 * Os números vêm de src/data/modulo6.js: os atalhos são as quedas da tabela do
 * módulo (tabelaVendaPorQueda: 10, 30, 50) e a liquidez é a do exemplo da seção
 * "quanto-sai" (US$ 8 mil). Os números que o texto cita (2,57%, 14,64%, US$ 206)
 * saem da mesma conta.
 *
 * @param {object} [p]
 * @param {number} [p.liquidez]  reserva: só vale se o texto do exemplo em
 *   src/data/modulo6.js não puder ser lido. O dado sempre vence o número
 *   escrito na view (se o dado mudar, a faixa em dólar acompanha).
 *
 * Ex.: criarCurvaDeSaida()
 */
export function criarCurvaDeSaida({ liquidez: liquidezDeReserva = null } = {}) {
  const liquidez = liquidezDoExemplo() ?? liquidezDeReserva;
  const vende = (queda) => 1 / Math.sqrt(1 - queda / 100) - 1;
  const recebe = (queda) => {
    const s = vende(queda);
    return (s / (1 + s)) * 50; // em % da liquidez anunciada
  };

  const atalhos = (modulo6.tabelaVendaPorQueda?.linhas ?? [])
    .map(quedaDaLinha)
    .filter((queda) => Number.isFinite(queda))
    .map((queda) => ({ rotulo: queda === 50 ? 'Cair pela metade' : 'Cair ' + queda + '%', valor: queda }));

  return criarCurvaDeslizante({
    id: 'm6-queda',
    controle: {
      rotulo: 'Quero que o preço caia',
      min: 1,
      max: 90,
      passo: 1,
      valor: atalhos[0]?.valor ?? 10,
      formatar: (queda) => queda + '%',
    },
    curva: {
      pontos: (x) => 1 / x,
      dominioX: [1, 3.3],
      dominioY: [0.3, 1],
      origem: { x: 1, y: 1 },
      rotuloOrigem: 'antes da venda',
      eixoX: 'tokens na pool →',
      eixoY: 'SOL na pool →',
      formula: 'x · y = k',
    },
    marcador: (queda) => {
      const s = vende(queda);
      return { x: 1 + s, y: 1 / (1 + s) };
    },
    numeros: (queda, extras) => {
      const cartoes = [
        { rotulo: 'Você recebe', valor: emBr(recebe(queda)) + '%', nota: 'da liquidez anunciada' },
        { rotulo: 'Você vende', valor: emBr(vende(queda) * 100) + '%', nota: 'dos tokens da reserva' },
      ];
      // Sem a liquidez do exemplo (texto do dado mudou), a faixa em dólar sai.
      if (!liquidez) return cartoes;
      const pool = liquidez * (extras.multiplicador ?? 1);
      // O dólar sai da porcentagem já arredondada, para bater com o texto do
      // módulo (2,57% de US$ 8 mil = US$ 206).
      const dolar = Math.round((Math.round(recebe(queda) * 100) / 100 / 100) * pool);
      return cartoes.concat({
        largo: true,
        rotulo: ['Liquidez anunciada de ', html`<span style="font-family:${FONTE_MONO};color:#E6EDF3">${textoDaLiquidez(pool)}</span>`, ' (exemplo inventado)'],
        valor: '≈ US$ ' + dolar.toLocaleString('pt-BR'),
      });
    },
    atalhos,
    alternativas: [{ rotulo: 'Pool 10× maior', extras: { multiplicador: 10 } }],
    descricao: (queda) =>
      'Curva x·y = k. Para o preço cair ' + queda + '%, você vende ' + emBr(vende(queda) * 100) +
      '% dos tokens da reserva e recebe ' + emBr(recebe(queda)) + '% da liquidez anunciada.',
  });
}
