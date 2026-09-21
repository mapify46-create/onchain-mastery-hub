// views/modulo5.js — monta a página do Módulo 5 a partir de src/data/modulo5.js.
//
// A página segue o desenho do Claude Design (pesquisa/design/handoff/designs/
// "M5 Desktop.dc.html" e "M5 Celular.dc.html"): cabeçalho com a caixa âmbar, o
// mapa "O módulo inteiro numa olhada", as abas e, em cada aba, os destaques e
// depois um card por seção. Cada card tem o título, a ideia central (borda
// ciano), o visual DENTRO do card, as frases curtas, o "Para ir mais fundo" e,
// quando o desenho pede, a "Pergunta rápida" no fim.
//
// Abas internas (padrão ARIA de tabs, vindo de ui.js):
//   Terminal · Custódia · Taxas · Configurações · Erros · Processo · Quiz
//
// As cores e medidas são as do desenho (tokens do README do handoff). Os textos
// vêm todos de src/data/modulo5.js; aqui ficam só a montagem e as contas das
// duas calculadoras.

import { modulo5 } from '../data/modulo5.js';
import { criarElemento, criarTitulo, criarCard, criarBotao, criarAbas, mostrarToast, html, svg } from '../ui.js';
import { montarQuiz, montarPerguntaRapida, juntarPorques } from '../components/quiz.js';
import { criarCardDaSecao } from '../components/secao.js';
import { criarMapaDoModulo } from '../components/visuais.js';
import { criarFluxograma } from '../components/fluxograma.js';
import { criarAnimacaoSanduiche, criarAnimacaoCaminhoDoToken } from '../components/animacoes.js';
import { montarDestaques } from '../components/destaques.js';
import { obterEstado, atualizar } from '../store.js';

// ---------------------------------------------------------------------------
// Peças comuns
// ---------------------------------------------------------------------------

// Os tokens de cor do desenho (README do handoff).
const COR = {
  fundo: '#0B0F17',
  superficie: '#141A24',
  borda: '#1F2733',
  texto: '#E6EDF3',
  suave: '#9AA7B4',
  primaria: '#7C3AED',
  acento: '#22D3EE',
  verde: '#22C55E',
  ambar: '#F59E0B',
  vermelho: '#EF4444', // preenchimento e borda
  vermelhoTexto: '#F87171', // texto vermelho é sempre este
};

// Os "trios" de estado do desenho: borda + fundo + cor do texto.
const TOM = {
  neutro: { borda: COR.borda, fundo: COR.superficie, cor: COR.texto },
  bom: { borda: 'rgba(34,197,94,.5)', fundo: 'rgba(34,197,94,.12)', cor: COR.verde },
  ruim: { borda: 'rgba(239,68,68,.5)', fundo: 'rgba(239,68,68,.12)', cor: COR.vermelhoTexto },
  alerta: { borda: 'rgba(245,158,11,.4)', fundo: 'rgba(245,158,11,.12)', cor: COR.ambar },
  primaria: { borda: 'rgba(124,58,237,.6)', fundo: 'rgba(124,58,237,.15)', cor: COR.texto },
};

// A pílula da coluna em destaque das tabelas. No verde e no âmbar o texto fica
// claro; no vermelho, o vermelho de texto.
const PILULA = {
  ok: { borda: 'rgba(34,197,94,.5)', fundo: 'rgba(34,197,94,.12)', cor: COR.texto },
  medio: { borda: 'rgba(245,158,11,.4)', fundo: 'rgba(245,158,11,.12)', cor: COR.texto },
  alerta: { borda: 'rgba(239,68,68,.5)', fundo: 'rgba(239,68,68,.12)', cor: COR.vermelhoTexto },
};

const MONO = "'JetBrains Mono',ui-monospace,monospace";

// A caixa escura em que todo visual fica, dentro do card da seção.
const CAIXA = 'margin:0;border-radius:8px;border:1px solid #1F2733;background:#0B0F17;padding:20px;min-width:0';

// Micro-rótulo de 11px em maiúsculas (a cor vai à parte).
const MICRO_11 = 'margin:0;font-size:11px;font-weight:600;letter-spacing:.05em;text-transform:uppercase';

// Os blocos de uma aba: um embaixo do outro, com 24px entre eles.
const COLUNA_DA_ABA = 'display:flex;flex-direction:column;gap:24px';

// Números no padrão brasileiro: 52.3 → "52"; 3.2 → "3,2".
function inteiro(valor) {
  return String(Math.round(valor));
}
function umaCasa(valor) {
  return Number(valor).toFixed(1).replace('.', ',');
}
function duasCasas(valor) {
  return Number(valor).toFixed(2).replace('.', ',');
}

// A seção `id` de modulo5.secoes. Se o id não existir, avisa com clareza.
function secao(id) {
  const encontrada = modulo5.secoes.find((item) => item.id === id);
  if (!encontrada) throw new Error('Seção "' + id + '" não existe em src/data/modulo5.js');
  return encontrada;
}

// As perguntas do quiz já com o "Por que a sua não serve" de cada errada.
const PERGUNTAS = juntarPorques(modulo5.quiz, modulo5.porqueErradas);

// A "Pergunta rápida" do fim de um card: 'q4' → a pergunta 4 do quiz do módulo.
// Não grava nada e não conta no Início (é só para conferir a leitura).
function criarPerguntaRapida(idDaPergunta) {
  const pergunta = PERGUNTAS.find((item) => item.id === idDaPergunta);
  if (!pergunta) return null;
  return montarPerguntaRapida({ id: 'm5-rapida-' + idDaPergunta, pergunta, moduloNome: 'Módulo 5' });
}

// O card de uma seção, no traço do desenho: título → ideia central → os blocos
// (o visual, as frases, o "Para ir mais fundo") → a "Pergunta rápida", com 16px
// entre as partes (components/secao.js). `blocos` pode trazer listas dentro de
// listas e vazios (null): tudo é achatado e os vazios saem.
//
// O card monta sozinho, a partir do próprio dado e nesta ordem fixa, os
// parágrafos, o quadro, a lista, o exemplo e os parágrafos finais. Por isso
// `blocos` é o VISUAL da seção, que entra ANTES dos parágrafos, e `noFim` é o
// que vem depois de tudo (o "Para ir mais fundo", a caixa de não verificado,
// uma animação). No lugar do visual o card aceita um nó só, então os blocos vão
// dentro de uma caixa com o mesmo espaçamento do card: na tela fica idêntico.
function criarSecao(dados, blocos = [], noFim = []) {
  const visual = blocos.flat(2).filter(Boolean);
  return criarCardDaSecao(dados, {
    visual: visual.length ? criarElemento('div', { class: 'flex flex-col gap-4' }, visual) : null,
    // O "Para ir mais fundo" deste módulo tem desenho próprio (criarDetalhe, aqui
    // embaixo), então o do card fica de fora e entra por `noFim`.
    omitir: ['detalhe'],
    depois: noFim.flat(2).filter(Boolean),
    pergunta: dados.pergunta ? criarPerguntaRapida(dados.pergunta) : null,
  });
}

// Um item do "Para ir mais fundo": texto, ou { rotulo, texto } com o rótulo em negrito.
function itemDoDetalhe(item) {
  if (typeof item === 'string') return [item];
  return [criarElemento('strong', { style: 'color:#E6EDF3' }, [item.rotulo + ' ']), item.texto];
}

// "Para ir mais fundo": recolhido, com o triângulo padrão do <details>.
// detalhe = { titulo, lista?, ordenada?, paragrafos? }
function criarDetalhe(detalhe) {
  if (!detalhe) return null;
  const lista = detalhe.lista?.length
    ? criarElemento(
        detalhe.ordenada ? 'ol' : 'ul',
        {
          style:
            'margin:8px 0 0;padding-left:20px;font-size:14px;color:#9AA7B4;list-style:' +
            (detalhe.ordenada ? 'decimal' : 'disc'),
        },
        detalhe.lista.map((item, i) => criarElemento('li', { style: i ? 'margin-top:4px' : null }, itemDoDetalhe(item))),
      )
    : null;

  return criarElemento('details', { style: 'border-radius:8px;border:1px solid #1F2733;background:#0B0F17;padding:12px 16px' }, [
    // No celular o alvo de toque tem de ter 44px: a linha do resumo mede 22px,
    // então 11px de folga em cima e embaixo fecham a conta (no computador, não).
    criarElemento('summary', { class: 'py-[11px] sm:py-0', style: 'cursor:pointer;font-size:14px;font-weight:600' }, [
      'Para ir mais fundo: ' + detalhe.titulo,
    ]),
    lista,
    ...(detalhe.paragrafos ?? []).map((paragrafo) =>
      criarElemento('p', { style: 'margin:8px 0 0;font-size:14px;color:#9AA7B4' }, [paragrafo]),
    ),
  ]);
}

// A caixa âmbar "Não verificado: …".
function criarNaoVerificado(texto) {
  if (!texto) return null;
  return html`<p style="margin:0;border-radius:8px;border:1px solid rgba(245,158,11,.4);background:rgba(245,158,11,.12);padding:12px 16px;font-size:14px"><strong style="color:#E6EDF3">Não verificado: </strong>${texto}</p>`;
}

// A frase miúda embaixo de uma figura. `margem` segue o desenho de cada figura.
function criarLegenda(texto, margem = '12px 0 0') {
  return html`<figcaption style="margin:${margem};font-size:13px;color:#9AA7B4">${texto}</figcaption>`;
}

// Círculo ciano numerado (marcador de passo do desenho): 24px, ou 20px no mockup.
function criarMarcador(numero, tamanho = 24) {
  const letra = tamanho === 20 ? 11 : 13;
  return html`<span aria-hidden="true" style="flex:0 0 ${tamanho}px;width:${tamanho}px;height:${tamanho}px;border-radius:50%;background:#22D3EE;color:#0B0F17;font-family:${MONO};font-size:${letra}px;font-weight:700;display:inline-flex;align-items:center;justify-content:center">${String(numero)}</span>`;
}

// Seta para baixo entre duas caixas: linha de 2px e a ponta (quadrado girado).
function criarSetaParaBaixo() {
  return [
    html`<span aria-hidden="true" style="width:2px;height:16px;background:#9AA7B4"></span>`,
    html`<span aria-hidden="true" style="box-sizing:content-box;width:8px;height:8px;border-right:2px solid #9AA7B4;border-bottom:2px solid #9AA7B4;transform:rotate(45deg);margin-top:-10px"></span>`,
  ];
}

// Um controle deslizante no traço do desenho: rótulo à esquerda, valor em
// JetBrains Mono à direita e o trilho .omh-range (styles/custom.css) embaixo.
// `aoMudar(valor)` roda a cada movimento; `mostrar(valor)` põe o valor na tela.
function criarDeslizante(id, controle, formatar, aoMudar) {
  const saida = html`<output for="${id}" style="font-family:${MONO};font-size:14px;font-weight:600"></output>`;
  const entrada = html`<input id="${id}" class="omh-range" type="range" min="${controle.min}" max="${controle.max}" step="${controle.passo}" style="width:100%;margin-top:4px">`;
  entrada.addEventListener('input', () => aoMudar(Number(entrada.value)));

  function mostrar(valor) {
    entrada.value = String(valor);
    saida.textContent = formatar(valor);
    entrada.setAttribute('aria-valuetext', formatar(valor));
  }

  const bloco = html`<div>
    <div style="display:flex;justify-content:space-between;gap:12px;align-items:baseline">
      <label for="${id}" style="font-size:14px;color:#9AA7B4">${controle.rotulo}</label>
      ${saida}
    </div>
    ${entrada}
  </div>`;
  return { bloco, mostrar };
}

// Duas colunas no computador e uma no celular (o "compacto" do desenho).
const DUAS_COLUNAS = 'grid grid-cols-1 sm:grid-cols-2';

// ---------------------------------------------------------------------------
// Aba 1 — Terminal
// ---------------------------------------------------------------------------

// A pilha das camadas: carteira → terminal → agregador → pool, com a taxa de
// cada uma em fonte mono à direita e setas entre as caixas.
function criarPilhaDeCamadas(pilha) {
  const quantas = pilha.camadas.length;
  const descricao =
    'A ordem passa por ' + quantas + ' camadas: ' +
    pilha.camadas.map((camada) => camada.rotulo + ' (' + camada.taxa + ') — ' + camada.detalhe).join('; ') +
    '. Depois, ' + pilha.fim.charAt(0).toLowerCase() + pilha.fim.slice(1) + '.';

  const caixas = pilha.camadas.map((camada, i) => {
    const tom = TOM[camada.tom] ?? TOM.neutro;
    // Na caixa neutra (a carteira) a taxa vai em cinza; nas outras, na cor do tom.
    const corDaTaxa = camada.tom === 'neutro' ? COR.suave : tom.cor;
    return [
      html`<div style="width:100%;max-width:520px;box-sizing:border-box;border-radius:8px;border:1px solid ${tom.borda};background:${tom.fundo};padding:12px 16px;display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;align-items:baseline">
        <span style="font-size:15px;font-weight:600">${camada.rotulo}<span style="display:block;font-size:13px;font-weight:400;color:#9AA7B4">${camada.detalhe}</span></span>
        <span style="font-family:${MONO};font-size:1.125rem;font-weight:700;color:${corDaTaxa}">${camada.taxa}</span>
      </div>`,
      i < quantas - 1 ? criarSetaParaBaixo() : null,
    ];
  });

  return html`<figure style="${CAIXA}">
    <div role="img" aria-label="${descricao}" style="display:flex;flex-direction:column;gap:0;align-items:center">
      ${caixas}
      <div style="margin-top:12px;border-radius:8px;border:1px solid #1F2733;background:#141A24;padding:10px 16px;font-size:14px;text-align:center;max-width:520px">${pilha.fim}</div>
    </div>
    ${criarLegenda(pilha.legenda, '16px 0 0')}
  </figure>`;
}

// Uma tabela do desenho: cabeçalho em micro-rótulo, a 1ª coluna com o nome da
// linha (e o subtítulo embaixo) e a coluna em destaque com o fio ciano e o valor
// numa pílula no tom da linha. A caixa rola para o lado se faltar espaço (no
// celular), e por isso entra no Tab. `mono` = números em JetBrains Mono (matriz).
// `rodape` = frase miúda embaixo da tabela, dentro da caixa.
//
// A tabela é montada com criarElemento, e não com html``: o leitor de HTML do
// navegador tiraria de dentro da <tr> o marcador do ${} (ver comparisonTable.js).
function criarTabela(tabela, { mono = false, rodape = null } = {}) {
  const destaque = tabela.colunaEmDestaque;
  const fio = (i) => (i === destaque ? ';border-left:2px solid #22D3EE' : '');
  const fonte = mono ? ';font-family:' + MONO + ';font-size:13px' : '';

  const cabecalho = criarElemento(
    'tr',
    {},
    tabela.colunas.map((coluna, i) =>
      criarElemento(
        'th',
        {
          scope: 'col',
          style:
            'text-align:left;padding:8px 12px;font-size:12px;font-weight:600;letter-spacing:.05em;' +
            'text-transform:uppercase;color:#9AA7B4;border-bottom:1px solid #1F2733' + fio(i),
        },
        [coluna],
      ),
    ),
  );

  const linhas = tabela.linhas.map((linha) =>
    criarElemento('tr', {}, [
      criarElemento(
        'th',
        { scope: 'row', style: 'text-align:left;padding:10px 12px;font-weight:600;border-bottom:1px solid #1F2733;vertical-align:top' },
        [linha.titulo, criarElemento('span', { style: 'display:block;font-size:12px;font-weight:400;color:#9AA7B4' }, [linha.subtitulo])],
      ),
      ...linha.valores.map((valor, j) => {
        const i = j + 1; // a coluna 0 é o nome da linha
        if (i !== destaque) {
          return criarElemento('td', { style: 'padding:10px 12px;border-bottom:1px solid #1F2733;color:#9AA7B4;vertical-align:top' + fonte }, [valor]);
        }
        const pilula = PILULA[linha.tom] ?? PILULA.medio;
        return criarElemento('td', { style: 'padding:10px 12px;border-bottom:1px solid #1F2733;vertical-align:top' + fio(i) }, [
          criarElemento(
            'span',
            {
              style:
                'display:inline-block;border-radius:6px;border:1px solid ' + pilula.borda + ';background:' + pilula.fundo +
                ';color:' + pilula.cor + ';padding:4px 8px;font-weight:600' + fonte,
            },
            [valor],
          ),
        ]);
      }),
    ]),
  );

  return criarElemento(
    'div',
    {
      style: 'border-radius:8px;border:1px solid #1F2733;background:#0B0F17;padding:12px;overflow-x:auto',
      tabindex: '0',
      role: 'group',
      'aria-label': tabela.rotulo,
    },
    [
      criarElemento('table', { style: 'border-collapse:collapse;width:100%;min-width:' + tabela.larguraMinima + 'px;font-size:14px' }, [
        criarElemento('thead', {}, [cabecalho]),
        criarElemento('tbody', {}, linhas),
      ]),
      rodape && criarElemento('p', { style: 'margin:12px 0 0;font-size:13px;color:#9AA7B4' }, [rodape]),
    ],
  );
}

// A anatomia da tela: o mockup em grade (painéis sem valores, cada um com o
// número ciano e o rótulo em fonte mono) e, ao lado, a legenda numerada.
function criarAnatomia(anatomia) {
  // O número de cada painel é a posição dele na legenda.
  const numero = {};
  anatomia.itens.forEach((item, i) => {
    numero[item.painel] = i + 1;
  });

  // Um painel do mockup. A altura mínima é a do conteúdo, sem o padding (como
  // no desenho): daí o box-sizing:content-box.
  const painel = (id, altura) => {
    const dados = anatomia.paineis[id];
    const borda = dados.alerta ? 'rgba(245,158,11,.4)' : '#22D3EE';
    const fundo = dados.alerta ? 'rgba(245,158,11,.12)' : 'rgba(34,211,238,.08)';
    return html`<div style="box-sizing:content-box;border-radius:6px;border:1px solid ${borda};background:${fundo};padding:8px;min-height:${altura}px;display:flex;gap:8px;align-items:flex-start">
      ${criarMarcador(numero[id], 20)}
      <span style="min-width:0;font-family:${MONO};font-size:11.5px;line-height:1.35;color:#E6EDF3;overflow-wrap:break-word">${dados.rotulo}</span>
    </div>`;
  };

  const descricao =
    'Mockup esquemático com ' + anatomia.itens.length + ' marcadores: ' +
    anatomia.itens.map((item, i) => i + 1 + ' ' + anatomia.paineis[item.painel].rotulo).join('; ') +
    '. Os painéis aparecem sem valores.';

  return html`<figure style="${CAIXA}">
    <div class="${DUAS_COLUNAS}" style="gap:20px;align-items:start">
      <div role="img" aria-label="${descricao}" style="border-radius:10px;border:1px solid #1F2733;background:#10151E;padding:14px;display:flex;flex-direction:column;gap:8px">
        ${anatomia.linhas.map(
          (linha) => html`<div style="display:grid;grid-template-columns:${linha.colunas};gap:8px">${linha.paineis.map((id) => painel(id, linha.altura))}</div>`,
        )}
        <p style="margin:4px 0 0;font-size:12px;color:#9AA7B4">${anatomia.nota}</p>
      </div>
      <ol style="margin:0;padding:0;list-style:none;display:flex;flex-direction:column;gap:10px">
        ${anatomia.itens.map(
          (item, i) => html`<li style="display:flex;gap:10px;align-items:flex-start;font-size:14px">${criarMarcador(i + 1)}<span><strong>${item.titulo}.</strong> <span style="color:#9AA7B4">${item.texto}</span></span></li>`,
        )}
      </ol>
    </div>
    ${criarLegenda(anatomia.legenda, '12px 0 0')}
  </figure>`;
}

function montarAbaTerminal() {
  const camadas = secao('as-tres-camadas');
  const anatomia = secao('anatomia-da-tela');

  return criarElemento('div', { style: COLUNA_DA_ABA }, [
    montarDestaques(modulo5.destaques.terminal),
    criarSecao(camadas, [criarPilhaDeCamadas(camadas.pilha), criarTabela(camadas.tabela)], [
      criarDetalhe(camadas.detalhe),
    ]),
    criarSecao(anatomia, [criarAnatomia(anatomia.anatomia)]),
  ]);
}

// ---------------------------------------------------------------------------
// Aba 2 — Custódia
// ---------------------------------------------------------------------------

// Os dois modelos lado a lado (um embaixo do outro no celular): o nome em
// micro-rótulo, os três sinais na tela e a consequência, tudo na cor do modelo.
function criarModelos(dados) {
  const colunas = dados.modelos.map((modelo) => {
    const tom = TOM[modelo.tom] ?? TOM.neutro;
    return html`<div style="border-radius:8px;border:1px solid ${tom.borda};background:${tom.fundo};padding:16px;display:flex;flex-direction:column;gap:10px">
      <p style="${MICRO_11};color:${tom.cor}">${modelo.nome}</p>
      ${modelo.sinais.map(
        (sinal) => html`<div style="border-radius:6px;border:1px solid #1F2733;background:#10151E;padding:8px 10px"><p style="margin:0;font-family:${MONO};font-size:12px;color:#22D3EE">${sinal.painel}</p><p style="margin:4px 0 0;font-size:13px;color:#9AA7B4">${sinal.texto}</p></div>`,
      )}
      <p style="margin:auto 0 0;padding-top:8px;font-size:14px;font-weight:600;color:${tom.cor}">${modelo.consequencia}</p>
    </div>`;
  });

  return html`<figure style="${CAIXA}">
    <div role="img" aria-label="${dados.descricaoDosModelos}" class="${DUAS_COLUNAS}" style="gap:16px">${colunas}</div>
    ${criarLegenda(dados.legendaDosModelos, '16px 0 0')}
  </figure>`;
}

// Um fluxograma de modulo5.diagramas, desenhado por components/fluxograma.js.
// `titulo` e `legenda` dizem se o título e a legenda do dado aparecem (cada
// figura do desenho tem um ou outro). Se o texto não puder ser lido, sai a
// versão em texto, na mesma caixa.
//
// A legenda é posta aqui, e não pelo componente: no desenho do M5 ela vem
// alinhada à esquerda, como as das outras figuras da página (o componente a
// centraliza).
function criarFluxoDoModulo(idDoDiagrama, { titulo = false, legenda = false } = {}) {
  const dados = modulo5.diagramas.find((diagrama) => diagrama.id === idDoDiagrama);
  if (!dados) return null;

  const figura = criarFluxograma({
    diagrama: dados.codigoMermaid,
    titulo: titulo ? dados.titulo : undefined,
  });
  if (figura) {
    if (legenda) figura.append(criarLegenda(dados.legenda, '16px 0 0'));
    return figura;
  }

  return html`<figure style="${CAIXA}">
    <ol style="margin:0;padding-left:20px;list-style:decimal;font-size:14px;color:#9AA7B4">${dados.versaoEmTexto.map((passo) => html`<li>${passo}</li>`)}</ol>
    ${legenda ? criarLegenda(dados.legenda, '16px 0 0') : ''}
  </figure>`;
}

// Dois cartões com borda de 2px na cor do estado (verde ou vermelho), sólida ou
// tracejada (`tracejado`). `forte` = o texto principal em 15px e negrito (os
// tipos de ordem); sem ele, 14px normal (o incidente).
function criarCartoesDeEstado(cartoes, descricao, { forte = false } = {}) {
  const estiloDoTexto = forte ? 'margin:6px 0 0;font-size:15px;font-weight:600' : 'margin:6px 0 0;font-size:14px';
  return html`<div role="img" aria-label="${descricao}" class="${DUAS_COLUNAS}" style="gap:12px">
    ${cartoes.map((cartao) => {
      const bom = cartao.tom === 'bom';
      return html`<div style="border-radius:8px;border:2px ${cartao.tracejado ? 'dashed' : 'solid'} ${bom ? COR.verde : COR.vermelho};background:#0B0F17;padding:14px 16px">
        <p style="${MICRO_11};color:${bom ? COR.verde : COR.vermelhoTexto}">${cartao.rotulo}</p>
        <p style="${estiloDoTexto}">${cartao.texto}</p>
        ${cartao.nota ? html`<p style="margin:4px 0 0;font-size:13px;color:#9AA7B4">${cartao.nota}</p>` : ''}
      </div>`;
    })}
  </div>`;
}

function montarAbaCustodia() {
  const modelos = secao('custodia-do-axiom');
  const foraDoAr = secao('o-risco-real-e-o-frontend');
  const incidente = secao('incidente-fevereiro-2026');

  return criarElemento('div', { style: COLUNA_DA_ABA }, [
    montarDestaques(modulo5.destaques.custodia),
    criarSecao(modelos, [criarModelos(modelos)]),
    criarSecao(foraDoAr, [criarFluxoDoModulo(foraDoAr.diagrama, { legenda: true })]),
    criarSecao(incidente, [criarCartoesDeEstado(incidente.cartoes, incidente.descricaoDosCartoes)]),
  ]);
}

// ---------------------------------------------------------------------------
// Aba 3 — Taxas
// ---------------------------------------------------------------------------

// Como cada camada do caminho do dinheiro aparece: a caixa, o peso do nome e a
// cor do valor.
const ESTILO_DO_PASSO = {
  suave: { caixa: TOM.neutro, peso: 400, cor: COR.suave },
  neutro: { caixa: TOM.neutro, peso: 400, cor: COR.texto },
  anunciada: { caixa: TOM.primaria, peso: 600, cor: COR.texto },
  alerta: { caixa: TOM.alerta, peso: 600, cor: COR.ambar },
};

// O caminho do dinheiro: as cinco camadas ligadas por um fio, o valor de cada
// uma à direita, a pílula "a única anunciada" e a caixa vermelha do total.
function criarCaminhoDoDinheiro(caminho) {
  const quantos = caminho.passos.length;
  const descricao =
    caminho.titulo + ': ' +
    caminho.passos
      .map((passo) => passo.rotulo + (passo.tom === 'anunciada' ? ' (' + caminho.seloDaAnunciada + ')' : '') + ', ' + passo.valor)
      .join('; ') +
    '.';

  const itens = caminho.passos.map((passo, i) => {
    const estilo = ESTILO_DO_PASSO[passo.tom] ?? ESTILO_DO_PASSO.neutro;
    const selo =
      passo.tom === 'anunciada'
        ? html`<span style="margin-left:8px;border-radius:999px;border:1px solid rgba(124,58,237,.5);background:rgba(124,58,237,.15);padding:1px 8px;font-size:11px;font-weight:600;white-space:nowrap">${caminho.seloDaAnunciada}</span>`
        : '';
    return html`<li style="display:flex;flex-direction:column">
      <div style="border-radius:8px;border:1px solid ${estilo.caixa.borda};background:${estilo.caixa.fundo};padding:10px 14px;display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;align-items:baseline">
        <span style="font-size:14px;font-weight:${estilo.peso}">${passo.rotulo}${selo}<span style="display:block;font-size:13px;font-weight:400;color:#9AA7B4">${passo.detalhe}</span></span>
        <span style="font-family:${MONO};font-size:14px;font-weight:600;color:${estilo.cor};white-space:nowrap">${passo.valor}</span>
      </div>
      ${i < quantos - 1 ? html`<span aria-hidden="true" style="width:2px;height:12px;background:#1F2733;margin-left:24px"></span>` : ''}
    </li>`;
  });

  return html`<figure style="${CAIXA}">
    <p style="margin:0 0 12px;font-size:14px;font-weight:600">${caminho.titulo}</p>
    <ol role="img" aria-label="${descricao}" style="list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:0">${itens}</ol>
    <div style="margin-top:14px;border-radius:8px;border:1px solid rgba(239,68,68,.5);background:rgba(239,68,68,.12);padding:12px 16px;display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;align-items:baseline">
      <span style="font-size:14px;font-weight:600">${caminho.total.rotulo}</span>
      <span style="font-family:${MONO};font-size:1.25rem;font-weight:700;color:#F87171">${caminho.total.valor}</span>
    </div>
    ${criarLegenda(caminho.legenda + ' ' + modulo5.cotacao, '12px 0 0')}
  </figure>`;
}

// As cores das partes das barras empilhadas.
const COR_DA_PARTE = { acento: COR.acento, primaria: COR.primaria, alerta: COR.ambar };

// Barras empilhadas, todas na mesma escala: cada barra é uma compra da matriz,
// repartida nas camadas de custo. A mais cara ocupa a largura inteira.
function criarBarrasEmpilhadas(barras) {
  const soma = (grupo) => barras.partes.reduce((total, parte) => total + grupo.valores[parte.chave], 0);
  const maior = Math.max(...barras.grupos.map(soma));

  const descricao =
    barras.abertura + ': ' +
    barras.grupos
      .map(
        (grupo) =>
          grupo.rotulo + ' soma ' + grupo.total + ' (' +
          barras.partes.map((parte) => parte.curto + ' ' + duasCasas(grupo.valores[parte.chave]) + '%').join(', ') + ')',
      )
      .join('; ') +
    '. ' + barras.conclusao;

  const grupos = barras.grupos.map((grupo) => {
    const total = soma(grupo);
    return html`<div>
      <div style="display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;align-items:baseline"><span style="font-size:14px;font-weight:600">${grupo.rotulo}</span><span style="font-family:${MONO};font-size:14px;font-weight:600">${grupo.total}</span></div>
      <div style="margin-top:6px;height:28px;display:flex;width:${((total / maior) * 100).toFixed(2)}%;border-radius:4px;overflow:hidden">
        ${barras.partes.map(
          (parte) => html`<span title="${parte.rotulo}" style="height:100%;width:${((grupo.valores[parte.chave] / total) * 100).toFixed(2)}%;background:${COR_DA_PARTE[parte.cor]}"></span>`,
        )}
      </div>
      <p style="margin:4px 0 0;font-size:13px;color:#9AA7B4">${grupo.nota}</p>
    </div>`;
  });

  return html`<figure style="margin:0;border-radius:8px;border:1px solid #1F2733;background:#0B0F17;padding:16px 20px;min-width:0">
    <div role="img" aria-label="${descricao}" style="display:flex;flex-direction:column;gap:18px">${grupos}</div>
    <figcaption style="margin-top:14px;display:flex;flex-wrap:wrap;gap:14px;font-size:13px;color:#9AA7B4">
      ${barras.partes.map(
        (parte) => html`<span style="display:inline-flex;align-items:center;gap:6px"><span aria-hidden="true" style="width:22px;height:12px;border-radius:3px;background:${COR_DA_PARTE[parte.cor]}"></span>${parte.rotulo}</span>`,
      )}
      <span style="width:100%">${barras.legenda}</span>
    </figcaption>
  </figure>`;
}

// Um botão de atalho do desenho (40px no computador, 44px no celular: o alvo
// de toque do README). O ativo fica roxo; a borda clareia ao passar o mouse.
function criarAtalho(rotulo, aoClicar) {
  const botao = html`<button type="button" aria-pressed="false" class="min-h-[44px] border-borda hover:border-texto-suave sm:min-h-[40px]" style="border-radius:8px;border-width:1px;border-style:solid;background:#141A24;color:#E6EDF3;padding:8px 12px;font-size:14px;font-weight:600;line-height:normal;cursor:pointer">${rotulo}</button>`;
  botao.addEventListener('click', aoClicar);
  return botao;
}

function pintarAtalho(botao, ativo) {
  botao.setAttribute('aria-pressed', String(ativo));
  botao.style.borderColor = ativo ? COR.primaria : '';
  botao.style.background = ativo ? 'rgba(124,58,237,.15)' : COR.superficie;
}

// A conta do atrito: cada ida e volta multiplica o que sobrou pelo mesmo fator
// (1 − custo). É juro composto ao contrário: 3,2% parece pouco até ser aplicado
// vinte vezes seguidas.
function sobraDoCapital(custo, operacoes) {
  return Math.pow(1 - custo / 100, operacoes);
}

// A calculadora do atrito: os dois controles e os atalhos à esquerda; à direita,
// a sobra em número grande e uma barra por ida e volta (a 1ª roxa, o capital
// inteiro; a última vermelha, o que sobra). Com mais de 20 operações, cada barra
// pula algumas operações, para caber.
function criarCalculadoraDoAtrito(calc) {
  let operacoes = calc.operacoes.valor;
  let custo = calc.custo.valor;

  const controleDeOperacoes = criarDeslizante('m5-operacoes', calc.operacoes, (valor) => String(valor), (valor) => {
    operacoes = valor;
    atualizarTela();
  });
  const controleDoCusto = criarDeslizante('m5-custo', calc.custo, (valor) => umaCasa(valor) + '%', (valor) => {
    custo = valor;
    atualizarTela();
  });

  const atalhos = calc.atalhos.map((atalho) => ({
    valor: atalho.valor,
    botao: criarAtalho(atalho.rotulo, () => {
      custo = atalho.valor;
      atualizarTela();
    }),
  }));

  const numero = html`<p style="margin:4px 0 0;font-family:${MONO};font-size:2rem;font-weight:700;line-height:1.1;font-variant-numeric:tabular-nums"></p>`;
  const notaDoNumero = html`<p style="margin:4px 0 0;font-size:13px;color:#9AA7B4"></p>`;
  const barras = html`<div role="img" tabindex="0" style="margin-top:14px;display:flex;align-items:flex-end;gap:2px;height:120px"></div>`;

  function atualizarTela() {
    controleDeOperacoes.mostrar(operacoes);
    controleDoCusto.mostrar(custo);

    const sobra = sobraDoCapital(custo, operacoes);
    const sobraTexto = inteiro(sobra * 100) + '%';
    numero.textContent = sobraTexto;
    numero.style.color = sobra < 0.5 ? COR.vermelhoTexto : COR.texto;
    notaDoNumero.textContent =
      'Depois de ' + operacoes + (operacoes === 1 ? ' ida e volta' : ' idas e voltas') + ' a ' + umaCasa(custo) +
      '% cada, sem o preço ter subido nem caído.';

    const passo = Math.max(1, Math.ceil(operacoes / 20));
    const alturas = [];
    for (let i = 0; i < operacoes; i += passo) {
      alturas.push({ altura: sobraDoCapital(custo, i) * 100, cor: i === 0 ? COR.primaria : COR.borda });
    }
    alturas.push({ altura: sobra * 100, cor: COR.vermelho });
    barras.replaceChildren(
      ...alturas.map(
        (barra) => html`<div style="flex:1 1 0;min-width:2px;display:flex;flex-direction:column;justify-content:flex-end;height:100%"><span aria-hidden="true" style="display:block;height:${Math.max(1, barra.altura).toFixed(2)}%;border-radius:2px 2px 0 0;background:${barra.cor}"></span></div>`,
      ),
    );
    barras.setAttribute(
      'aria-label',
      'Com ' + operacoes + ' operações completas a ' + umaCasa(custo) + '% cada, sobram ' + sobraTexto +
        ' do capital, com o preço parado.',
    );

    atalhos.forEach((atalho) => pintarAtalho(atalho.botao, Math.abs(custo - atalho.valor) < 0.05));
  }

  atualizarTela();

  return html`<div class="${DUAS_COLUNAS}" style="border-radius:8px;border:1px solid #1F2733;background:#0B0F17;padding:20px;gap:20px;align-items:start;min-width:0">
    <div style="display:flex;flex-direction:column;gap:14px;min-width:0">
      ${controleDeOperacoes.bloco}
      ${controleDoCusto.bloco}
      <div style="display:flex;flex-wrap:wrap;gap:8px">${atalhos.map((atalho) => atalho.botao)}</div>
      <p style="margin:0;font-size:13px;color:#9AA7B4">${calc.nota}</p>
    </div>
    <figure style="margin:0;min-width:0">
      <div aria-live="polite" style="border-radius:8px;border:1px solid #1F2733;background:#141A24;padding:14px 16px"><p style="${MICRO_11};color:#9AA7B4">${calc.rotuloDaSobra}</p>${numero}${notaDoNumero}</div>
      ${barras}
      <figcaption style="margin-top:8px;font-size:13px;color:#9AA7B4">${calc.legenda}</figcaption>
    </figure>
  </div>`;
}

function montarAbaTaxas() {
  const anunciada = secao('a-taxa-anunciada-nao-e-o-custo');
  const matriz = secao('o-venue-muda-o-custo');
  const atrito = secao('calculadora-de-atrito');

  return criarElemento('div', { style: COLUNA_DA_ABA }, [
    montarDestaques(modulo5.destaques.taxas),
    criarSecao(anunciada, [criarCaminhoDoDinheiro(anunciada.caminho)], [criarDetalhe(anunciada.detalhe)]),
    // A animação do caminho do token fecha o card da matriz, junto do "Para ir
    // mais fundo" que fala do mesmo caminho.
    criarSecao(
      matriz,
      [criarBarrasEmpilhadas(matriz.barras), criarTabela(matriz.tabela, { mono: true, rodape: modulo5.cotacao })],
      [criarDetalhe(matriz.detalhe), criarAnimacaoCaminhoDoToken()],
    ),
    criarSecao(atrito, [criarCalculadoraDoAtrito(atrito.calculadora)]),
  ]);
}

// ---------------------------------------------------------------------------
// Aba 4 — Configurações
// ---------------------------------------------------------------------------

// Um cartão por configuração: o nome, o que é, e o que quebra quando fica baixa
// demais (caixa vermelha) ou alta demais (caixa âmbar).
function criarConfiguracoes(dados) {
  const rotulos = dados.rotulosDosConfigs;
  const descricao = dados.configs
    .map((config) => config.nome + ': ' + config.oQueE + ' ' + rotulos.baixo + ' ' + config.baixo + ' ' + rotulos.alto + ' ' + config.alto)
    .join(' ');

  return html`<div role="img" aria-label="${descricao}" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,240px),1fr));gap:12px">
    ${dados.configs.map(
      (config) => html`<div style="border-radius:8px;border:1px solid #1F2733;background:#0B0F17;padding:14px 16px;display:flex;flex-direction:column;gap:8px">
        <p style="margin:0;font-size:15px;font-weight:600">${config.nome}</p>
        <p style="margin:0;font-size:13px;color:#9AA7B4">${config.oQueE}</p>
        <div style="border-radius:6px;border:1px solid rgba(239,68,68,.5);background:rgba(239,68,68,.12);padding:6px 10px;font-size:13px"><strong style="color:#F87171">${rotulos.baixo} </strong>${config.baixo}</div>
        <div style="border-radius:6px;border:1px solid rgba(245,158,11,.4);background:rgba(245,158,11,.12);padding:6px 10px;font-size:13px"><strong style="color:#F59E0B">${rotulos.alto} </strong>${config.alto}</div>
      </div>`,
    )}
  </div>`;
}

// O gráfico da curva x · y = k, em coordenadas do SVG 320 × 220 do desenho.
const CURVA = { largura: 320, altura: 220, esquerda: 40, direita: 300, topo: 20, base: 180, maximo: 2 };

// Texto do gráfico em HTML por cima do SVG, para nunca ficar ilegível: 11
// unidades do SVG de 320 = 3,4375% da largura do gráfico (unidade cqw), e no
// mínimo 11px no celular. (x, y) é o ponto de apoio, como no <text> do SVG.
// `abaixoDe` = o y de outro texto: este fica pelo menos uma linha abaixo dele.
// É o que impede, no celular, que o piso de 11px encavale "x · y = k" no rótulo
// do eixo (no computador a posição é a do desenho).
function textoNoGrafico(texto, x, y, { ancora = 'start', mono = false, abaixoDe = null } = {}) {
  const esquerda = ((x / CURVA.largura) * 100).toFixed(2) + '%';
  const noDesenho = ((y / CURVA.altura) * 100).toFixed(2) + '%';
  const topo =
    abaixoDe === null ? noDesenho : 'max(' + noDesenho + ', calc(' + ((abaixoDe / CURVA.altura) * 100).toFixed(2) + '% + 13px))';
  const deslocamento = { start: '0', middle: '-50%', end: '-100%' }[ancora];
  const fonte = mono ? MONO : 'Inter,sans-serif';
  return html`<span aria-hidden="true" style="position:absolute;left:${esquerda};top:${topo};transform:translate(${deslocamento},-78%);font-family:${fonte};font-size:max(11px, ${((11 / CURVA.largura) * 100).toFixed(4)}cqw);line-height:1;color:#9AA7B4;white-space:nowrap">${texto}</span>`;
}

// A calculadora do impacto: os dois controles, os dois cartões e a nota do
// modelo à esquerda; à direita, a curva x · y = k com o marcador. Numa pool de
// produto constante, uma ordem de `ordem` SOL numa pool com `pool` SOL deste
// lado recebe 1 / (1 + ordem ÷ pool) do que o preço cotado sugeria. O gráfico
// vai até uma ordem do dobro da pool; passou disso, o marcador fica âmbar,
// parado na borda.
function criarCalculadoraDoImpacto(calc) {
  let ordem = calc.ordem.valor;
  let pool = calc.pool.valor;

  const controleDaOrdem = criarDeslizante('m5-ordem', calc.ordem, (valor) => umaCasa(valor) + ' SOL', (valor) => {
    ordem = valor;
    atualizarTela();
  });
  const controleDaPool = criarDeslizante('m5-pool', calc.pool, (valor) => inteiro(valor) + ' SOL', (valor) => {
    pool = valor;
    atualizarTela();
  });

  const NUMERO = "margin:4px 0 0;font-family:" + MONO + ";font-size:1.5rem;font-weight:700;line-height:1.1;font-variant-numeric:tabular-nums";
  const recebe = html`<p style="${NUMERO}"></p>`;
  const impacto = html`<p style="${NUMERO}"></p>`;
  const razao = html`<span></span>`;

  // A curva: 61 pontos de 1 / (1 + r), com r de 0 ao dobro da pool.
  const { esquerda: X0, direita: X1, topo: Y0, base: Y1, maximo } = CURVA;
  const minimo = 1 / (1 + maximo);
  const px = (r) => X0 + (r / maximo) * (X1 - X0);
  const py = (v) => Y1 - ((v - minimo) / (1 - minimo)) * (Y1 - Y0);
  let caminho = '';
  for (let i = 0; i <= 60; i++) {
    const r = (i / 60) * maximo;
    caminho += (i ? ' L' : 'M') + px(r).toFixed(1) + ',' + py(1 / (1 + r)).toFixed(1);
  }

  const guiaVertical = svg`<line stroke="#22D3EE" stroke-dasharray="3 3"></line>`;
  const guiaHorizontal = svg`<line stroke="#22D3EE" stroke-dasharray="3 3"></line>`;
  const marcador = svg`<circle r="7" stroke="#E6EDF3" stroke-width="2"></circle>`;
  const desenho = html`<svg viewBox="0 0 ${CURVA.largura} ${CURVA.altura}" width="100%" aria-hidden="true" style="display:block"></svg>`;
  desenho.append(
    svg`<line x1="${X0}" y1="${Y1}" x2="${X1}" y2="${Y1}" stroke="#1F2733"></line>`,
    svg`<line x1="${X0}" y1="${Y0}" x2="${X0}" y2="${Y1}" stroke="#1F2733"></line>`,
    svg`<path d="${caminho}" fill="none" stroke="#9AA7B4" stroke-width="2"></path>`,
    guiaVertical,
    guiaHorizontal,
    svg`<circle cx="${X0}" cy="${Y0}" r="5" fill="#0B0F17" stroke="#9AA7B4" stroke-width="2"></circle>`,
    marcador,
  );

  const grafico = criarElemento('div', { role: 'img', style: 'position:relative;width:100%;max-width:360px;container-type:inline-size' }, [
    desenho,
    textoNoGrafico(calc.grafico.origem, 50, 18),
    textoNoGrafico(calc.grafico.eixoX, 170, 204, { ancora: 'middle' }),
    textoNoGrafico(calc.grafico.formula, 300, 216, { ancora: 'end', mono: true, abaixoDe: 204 }),
  ]);
  const escala = html`<figcaption style="margin-top:8px;font-size:13px;color:#9AA7B4"></figcaption>`;

  function atualizarTela() {
    controleDaOrdem.mostrar(ordem);
    controleDaPool.mostrar(pool);

    const fracao = 1 / (1 + ordem / pool);
    const porcento = (1 - fracao) * 100;
    const proporcao = ordem / pool;
    const foraDaEscala = proporcao > maximo;
    const noGrafico = Math.min(maximo, proporcao);
    const mx = px(noGrafico).toFixed(1);
    const my = py(1 / (1 + noGrafico)).toFixed(1);

    recebe.textContent = inteiro(fracao * 100) + '%';
    impacto.textContent = '−' + umaCasa(porcento) + '%';
    impacto.style.color = porcento > 10 ? COR.vermelhoTexto : COR.texto;
    razao.textContent = umaCasa(proporcao * 100) + '%';

    marcador.setAttribute('cx', mx);
    marcador.setAttribute('cy', my);
    marcador.setAttribute('fill', foraDaEscala ? COR.ambar : COR.primaria);
    guiaVertical.setAttribute('x1', mx);
    guiaVertical.setAttribute('x2', mx);
    guiaVertical.setAttribute('y1', my);
    guiaVertical.setAttribute('y2', String(Y1));
    guiaHorizontal.setAttribute('x1', String(X0));
    guiaHorizontal.setAttribute('x2', mx);
    guiaHorizontal.setAttribute('y1', my);
    guiaHorizontal.setAttribute('y2', my);

    escala.textContent = foraDaEscala ? calc.foraDaEscala : calc.escala;
    grafico.setAttribute(
      'aria-label',
      'Curva x·y = k. Com uma ordem de ' + umaCasa(ordem) + ' SOL numa pool de ' + inteiro(pool) +
        ' SOL deste lado, você recebe ' + inteiro(fracao * 100) + '% do que o preço cotado sugeria: impacto de ' +
        umaCasa(porcento) + '%.' + (foraDaEscala ? ' A razão passou do fim da escala do gráfico, e o marcador ficou na borda.' : ''),
    );
  }

  atualizarTela();

  const CARTAO = 'border-radius:8px;border:1px solid #1F2733;background:#141A24;padding:10px 12px;min-width:0';
  return html`<div class="${DUAS_COLUNAS}" style="border-radius:8px;border:1px solid #1F2733;background:#0B0F17;padding:20px;gap:20px;align-items:center;min-width:0">
    <div style="display:flex;flex-direction:column;gap:14px;min-width:0">
      ${controleDaOrdem.bloco}
      ${controleDaPool.bloco}
      <div aria-live="polite" style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
        <div style="${CARTAO}"><p style="${MICRO_11};color:#9AA7B4">${calc.rotuloRecebe}</p>${recebe}<p style="margin:4px 0 0;font-size:12px;color:#9AA7B4">${calc.notaRecebe}</p></div>
        <div style="${CARTAO}"><p style="${MICRO_11};color:#9AA7B4">${calc.rotuloImpacto}</p>${impacto}<p style="margin:4px 0 0;font-size:12px;color:#9AA7B4">a sua ordem vale ${razao} da pool</p></div>
      </div>
      <p style="margin:0;font-size:13px;color:#9AA7B4">${calc.nota}</p>
    </div>
    <figure style="margin:0;min-width:0">${grafico}${escala}</figure>
  </div>`;
}

function montarAbaConfiguracoes() {
  const configs = secao('slippage-priority-mev');
  const impacto = secao('calculadora-de-impacto');
  const tipos = secao('tipos-de-ordem');

  return criarElemento('div', { style: COLUNA_DA_ABA }, [
    montarDestaques(modulo5.destaques.configuracoes),
    // A animação do sanduíche vem logo depois do fluxograma do slippage: é o
    // mesmo ataque, contado cena a cena.
    criarSecao(
      configs,
      [criarConfiguracoes(configs), criarFluxoDoModulo(configs.diagrama, { titulo: true }), criarAnimacaoSanduiche()],
      [criarDetalhe(configs.detalhe)],
    ),
    criarSecao(impacto, [criarCalculadoraDoImpacto(impacto.calculadora)]),
    criarSecao(tipos, [criarCartoesDeEstado(tipos.cartoes, tipos.descricaoDosCartoes, { forte: true })], [criarNaoVerificado(tipos.naoVerificado)]),
  ]);
}

// ---------------------------------------------------------------------------
// Aba 5 — Erros
// ---------------------------------------------------------------------------

// O mockup da busca pelo nome: o campo e os dois resultados, o impostor em
// vermelho, com a pílula âmbar "mockup esquemático" no alto.
function criarBuscaDoImpostor(impostor) {
  const resultados = impostor.resultados.map((resultado, i) => {
    const tom = resultado.impostor ? TOM.ruim : TOM.neutro;
    return html`<div style="border-radius:8px;border:1px solid ${tom.borda};background:${tom.fundo};padding:12px 14px;display:flex;gap:10px;align-items:flex-start">
      ${criarMarcador(i + 1)}
      <span style="min-width:0"><span style="display:block;font-size:14px;font-weight:600;color:${tom.cor}">${resultado.rotulo}</span><span style="display:block;margin-top:4px;font-size:13px;color:#9AA7B4">${resultado.texto}</span></span>
    </div>`;
  });

  return html`<figure style="${CAIXA}">
    <div style="display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;align-items:baseline">
      <p style="margin:0;font-size:14px;font-weight:600">${impostor.titulo}</p>
      <span style="border-radius:999px;border:1px solid rgba(245,158,11,.4);background:rgba(245,158,11,.12);color:#F59E0B;padding:1px 10px;font-size:12px;font-weight:600">${impostor.selo}</span>
    </div>
    <div role="img" aria-label="${impostor.descricao}" style="margin-top:12px;display:flex;flex-direction:column;gap:10px">
      <div style="border-radius:8px;border:1px solid #1F2733;background:#10151E;padding:10px 14px;font-family:${MONO};font-size:12px;color:#9AA7B4">${impostor.busca}</div>
      ${resultados}
    </div>
    ${criarLegenda(impostor.legenda, '12px 0 0')}
  </figure>`;
}

// As cores de cada barra de tempo: a do valor escrito e a da barra.
const COR_DO_TEMPO = {
  acento: { valor: COR.suave, barra: COR.acento },
  ruim: { valor: COR.vermelhoTexto, barra: COR.vermelho },
  primaria: { valor: COR.texto, barra: COR.primaria },
};

// Três barras numa trilha escura, na mesma escala de tempo. As duas primeiras
// são tão curtas que viram um traço: é o ponto da figura.
function criarBarrasDeTempo(tempos) {
  const barras = tempos.barras.map((barra) => {
    const cor = COR_DO_TEMPO[barra.tom] ?? COR_DO_TEMPO.primaria;
    const largura = barra.segundos ? Math.min(100, (barra.segundos / tempos.escala) * 100) : 0;
    return html`<div>
      <div style="display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;align-items:baseline"><span style="font-size:14px;font-weight:600">${barra.rotulo}</span><span style="font-family:${MONO};font-size:14px;color:${cor.valor}">${barra.valor}</span></div>
      <div style="margin-top:6px;height:22px;background:#141A24;border-radius:4px;overflow:hidden"><div style="height:100%;width:${largura.toFixed(3)}%;min-width:2px;background:${cor.barra}"></div></div>
      <p style="margin:4px 0 0;font-size:13px;color:#9AA7B4">${barra.nota}</p>
    </div>`;
  });

  return html`<figure style="margin:0;border-radius:8px;border:1px solid #1F2733;background:#0B0F17;padding:16px 20px;min-width:0">
    <p style="margin:0 0 12px;font-size:14px;font-weight:600">${tempos.titulo}</p>
    <div role="img" aria-label="${tempos.descricao}" style="display:flex;flex-direction:column;gap:16px">${barras}</div>
    ${criarLegenda(tempos.legenda, '12px 0 0')}
  </figure>`;
}

function montarAbaErros() {
  const impostor = secao('erros-de-execucao');
  const velocidade = secao('bots-de-sniping');
  const diagnostico = secao('a-venda-nao-caiu');

  return criarElemento('div', { style: COLUNA_DA_ABA }, [
    montarDestaques(modulo5.destaques.erros),
    criarSecao(impostor, [criarBuscaDoImpostor(impostor.impostor)]),
    criarSecao(velocidade, [criarBarrasDeTempo(velocidade.tempos)]),
    criarSecao(diagnostico, [criarFluxoDoModulo(diagnostico.diagrama, { legenda: true })]),
  ]);
}

// ---------------------------------------------------------------------------
// Aba 6 — Processo
// ---------------------------------------------------------------------------

// O processo em 7 passos numerados, ligados por um fio. O passo que pode
// encerrar o processo ganha a borda ciano e, à direita, a "saída do processo"
// em vermelho (embaixo dele, no celular). Fecha com a caixa verde do fim.
function criarProcesso(processo) {
  const descricao =
    processo.passos.map((passo, i) => i + 1 + '. ' + passo.texto + (passo.saida ? ' ' + passo.saida : '')).join(' ') +
    ' ' + processo.fim + '.';

  const linhas = processo.passos.map((passo, i) => {
    const temSaida = Boolean(passo.saida);
    const saida = temSaida
      ? html`<div style="display:flex;align-items:flex-start;gap:8px">
          <span aria-hidden="true" style="color:#9AA7B4;flex:0 0 auto;padding-top:10px">→</span>
          <div style="flex:1 1 auto;min-width:0;border-radius:8px;border:1px solid rgba(239,68,68,.5);background:rgba(239,68,68,.12);padding:10px 14px;font-size:14px;color:#F87171;font-weight:600"><span style="display:block;font-size:11px;letter-spacing:.05em;text-transform:uppercase">${processo.rotuloDaSaida}</span>${passo.saida}</div>
        </div>`
      : '';
    return html`<div class="${DUAS_COLUNAS}" style="gap:12px;align-items:start">
      <div style="display:flex;flex-direction:column;align-items:stretch">
        <div style="border-radius:8px;border:1px solid ${temSaida ? '#22D3EE' : '#1F2733'};background:${temSaida ? 'rgba(34,211,238,.06)' : '#141A24'};padding:10px 14px;display:flex;gap:10px;align-items:flex-start">
          ${criarMarcador(i + 1)}
          <span style="min-width:0;font-size:14px">${passo.texto}</span>
        </div>
        <span aria-hidden="true" style="width:2px;height:14px;background:#9AA7B4;margin-left:24px"></span>
      </div>
      ${saida}
    </div>`;
  });

  // A caixa do fim: metade da largura no computador e a largura toda no
  // celular, medida sem o padding (como no desenho).
  return html`<figure style="${CAIXA}">
    <div role="img" aria-label="${descricao}" style="display:flex;flex-direction:column;gap:0">
      ${linhas}
      <div class="max-w-full sm:max-w-[50%]" style="box-sizing:content-box;border-radius:8px;border:1px solid rgba(34,197,94,.5);background:rgba(34,197,94,.12);padding:10px 14px;font-size:14px;font-weight:600">${processo.fim}</div>
    </div>
    ${criarLegenda(processo.legenda, '16px 0 0')}
  </figure>`;
}

// Os três campos do registro, um cartão por campo (um embaixo do outro no celular).
function criarRegistro(registro) {
  return html`<figure style="${CAIXA}">
    <p style="margin:0 0 12px;font-size:14px;font-weight:600">${registro.titulo}</p>
    <div role="img" aria-label="${registro.descricao}" class="grid grid-cols-1 sm:grid-cols-3" style="gap:12px">
      ${registro.campos.map(
        (campo) => html`<div style="border-radius:8px;border:1px solid #1F2733;background:#141A24;padding:12px 14px"><p style="${MICRO_11};color:#22D3EE">${campo.campo}</p><p style="margin:6px 0 0;font-size:14px;color:#9AA7B4">${campo.texto}</p></div>`,
      )}
    </div>
    ${criarLegenda(registro.legenda, '12px 0 0')}
  </figure>`;
}

function montarAbaProcesso() {
  const processo = secao('do-token-ao-encerramento');
  const registro = secao('registro-para-imposto');

  return criarElemento('div', { style: COLUNA_DA_ABA }, [
    montarDestaques(modulo5.destaques.processo),
    criarSecao(processo, [criarProcesso(processo.processo)]),
    criarSecao(registro, [criarRegistro(registro.registro)], [criarNaoVerificado(registro.naoVerificado)]),
  ]);
}

// ---------------------------------------------------------------------------
// Aba 7 — Quiz, "Terminou o módulo?", o que você leva, fontes
// ---------------------------------------------------------------------------
function montarConclusao() {
  const container = criarCard([]);

  function estaConcluido() {
    return (obterEstado().modulosConcluidos ?? []).includes(modulo5.id);
  }

  function alternar() {
    const concluido = estaConcluido();
    const salvou = atualizar((estado) => {
      const lista = new Set(estado.modulosConcluidos ?? []);
      if (concluido) lista.delete(modulo5.id);
      else lista.add(modulo5.id);
      return { ...estado, modulosConcluidos: [...lista] };
    });

    renderizar();
    if (!salvou) mostrarToast('Não consegui salvar o progresso');
    else mostrarToast(concluido ? 'Módulo desmarcado' : 'Módulo 5 concluído. Progresso salvo');
  }

  function renderizar() {
    const concluido = estaConcluido();
    container.replaceChildren(
      criarElemento('h2', { class: 'text-lg font-semibold' }, ['Terminou o módulo?']),
      criarElemento('p', { class: 'mt-2 mb-4 text-sm text-texto-suave' }, [
        concluido
          ? 'Módulo 5 marcado como concluído. Ele conta na barra de progresso do topo.'
          : 'Marcar aqui faz a barra de progresso do topo avançar. Dá para desmarcar depois.',
      ]),
      criarBotao(concluido ? 'Desmarcar módulo' : 'Marcar módulo como concluído', {
        variante: concluido ? 'secundario' : 'primario',
        'aria-pressed': String(concluido),
        onclick: alternar,
      }),
    );
  }

  renderizar();
  return container;
}

// "O que você leva deste módulo": os objetivos, depois de "Terminou o módulo?".
function montarObjetivos() {
  return criarCard([
    criarElemento('h2', { class: 'text-lg font-semibold' }, ['O que você leva deste módulo']),
    html`<ul style="margin:12px 0 0;padding-left:20px;color:#9AA7B4;display:flex;flex-direction:column;gap:6px;list-style:disc">
      ${modulo5.objetivos.map((objetivo) => html`<li>${objetivo}</li>`)}
    </ul>`,
  ]);
}

// Fontes e itens não verificados: recolhido, no fim da aba. Os itens não
// verificados em caixas âmbar; as fontes, a lista inteira de modulo5.fontes.
function montarFontesEVerificacao() {
  const TITULO = 'margin:16px 0 0;font-size:14px;font-weight:600';
  return html`<details style="border-radius:12px;border:1px solid #1F2733;background:#141A24;padding:20px">
    <summary class="py-[11px] sm:py-0" style="cursor:pointer;font-size:14px;font-weight:600">Fontes e itens não verificados</summary>
    <h3 style="${TITULO}">Não verificado</h3>
    <ul style="list-style:none;margin:8px 0 0;padding:0;display:flex;flex-direction:column;gap:8px">
      ${modulo5.naoVerificado.map(
        (item) => html`<li style="border-radius:8px;border:1px solid rgba(245,158,11,.4);background:rgba(245,158,11,.1);padding:12px;font-size:14px;color:#9AA7B4"><strong style="color:#E6EDF3">${item.titulo}: </strong>${item.texto}</li>`,
      )}
    </ul>
    <h3 style="${TITULO}">Fontes consultadas</h3>
    <ul style="list-style:none;margin:8px 0 0;padding:0;display:flex;flex-direction:column;gap:4px;font-size:14px;color:#9AA7B4">
      ${modulo5.fontes.map((fonte) => html`<li>${fonte.titulo + ' — ' + fonte.url + ' (consulta em ' + fonte.consultadoEm + ')'}</li>`)}
    </ul>
  </details>`;
}

function montarAbaQuiz() {
  return criarElemento('div', { style: COLUNA_DA_ABA }, [
    montarQuiz({
      id: modulo5.id,
      titulo: 'Mini-quiz do Módulo 5',
      descricao: 'Oito perguntas. As respostas ficam salvas no navegador.',
      perguntas: PERGUNTAS,
      moduloNome: 'Módulo 5',
    }),
    montarConclusao(),
    montarObjetivos(),
    montarFontesEVerificacao(),
  ]);
}

// ---------------------------------------------------------------------------
// Montagem da página
// ---------------------------------------------------------------------------

// A caixa âmbar do cabeçalho: o Axiom é só o exemplo do módulo.
function criarAvisoDoExemplo() {
  const aviso = modulo5.avisoExemplo;
  return html`<p style="margin:16px 0 0;border-radius:12px;border:1px solid rgba(245,158,11,.4);background:rgba(245,158,11,.12);padding:12px 16px;font-size:14px;color:#9AA7B4"><strong style="color:#E6EDF3">${aviso.destaque} </strong>${aviso.texto}</p>`;
}

export function montarModulo5() {
  // Micro-rótulo "MÓDULO 5", o nome do desenho, o parágrafo curto e, dentro do
  // cabeçalho, a caixa âmbar.
  const cabecalho = criarTitulo(modulo5.titulo, { rotulo: 'Módulo 5', subtitulo: modulo5.subtitulo });
  cabecalho.append(criarAvisoDoExemplo());

  const abas = [
    { id: 'terminal', rotulo: 'Terminal', montar: montarAbaTerminal },
    { id: 'custodia', rotulo: 'Custódia', montar: montarAbaCustodia },
    { id: 'taxas', rotulo: 'Taxas', montar: montarAbaTaxas },
    { id: 'configuracoes', rotulo: 'Configurações', montar: montarAbaConfiguracoes },
    { id: 'erros', rotulo: 'Erros', montar: montarAbaErros },
    { id: 'processo', rotulo: 'Processo', montar: montarAbaProcesso },
    { id: 'quiz', rotulo: 'Quiz', montar: montarAbaQuiz },
  ];

  // O mapa do módulo abre a página: o todo antes das partes. Um ramo por aba
  // (o Quiz também); as folhas curtas vêm de modulo5.mapa. O ramo da aba aberta
  // fica roxo.
  const mapa = criarMapaDoModulo({
    mapa: modulo5.mapa,
    abas: abas.map(({ id, rotulo }) => ({ id, rotulo })),
    perguntas: modulo5.quiz.length,
    idDasAbas: 'modulo-5',
  });

  const painelDeAbas = criarAbas({ id: 'modulo-5', rotulo: 'Seções do Módulo 5', abas });

  // Cabeçalho, mapa e abas com 24px entre eles (a margem de baixo do cabeçalho
  // e do mapa, e a de cima do painel da aba).
  return criarElemento('div', {}, [cabecalho, mapa, painelDeAbas]);
}
