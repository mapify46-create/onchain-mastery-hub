// views/modulo2.js — monta a página do Módulo 2 a partir de src/data/modulo2.js.
//
// A página segue o desenho "M2 Desktop" / "M2 Celular"
// (pesquisa/design/handoff/designs): cabeçalho → mapa do módulo → abas → painel.
// Abas: Visão geral · Vieses · Tipos de token · Casos reais · As 4 fases · Quiz.
//
// Cada seção é um card só (criarCardDaSecao, em components/secao.js): título →
// ideia central → o visual → "Pergunta rápida", quando o desenho tem uma.
//
// Os visuais que só este módulo usa (ação × memecoin, calmo × empolgado, a
// tabela dos vieses, "Estou em FOMO?", o post de hype, o mapa dos tipos, os
// cards dos casos e o seletor das 4 fases) são funções locais, aqui embaixo.
// As medidas e as cores vêm do desenho; os textos, de src/data/modulo2.js.

import { modulo2 } from '../data/modulo2.js';
import {
  html,
  criarElemento,
  criarTitulo,
  criarCard,
  criarBotao,
  criarAbas,
  mostrarToast,
  rotuloRisco,
} from '../ui.js';
import { montarQuiz, montarPerguntaRapida, juntarPorques } from '../components/quiz.js';
import { criarCardDaSecao } from '../components/secao.js';
import { videoDaSecao } from '../components/video.js';
import { criarMapaDoModulo, criarCiclo, criarGradesLadoALado } from '../components/visuais.js';
import { montarDestaques } from '../components/destaques.js';
import { montarLinhaDoTempo } from '../components/linhaDoTempo.js';
import { obterEstado, atualizar } from '../store.js';

// ---------------------------------------------------------------------------
// Peças de estilo repetidas (valores do desenho)
// ---------------------------------------------------------------------------
const MODULO_NOME = 'Módulo 2';
const FONTE_MONO = "'JetBrains Mono',ui-monospace,monospace";

// Micro-rótulo em maiúsculas, 11px (a cor vem de quem usa).
const MICRO = 'margin:0;font-size:11px;font-weight:600;letter-spacing:.05em;text-transform:uppercase';

// A caixa escura de todo visual: fundo #0B0F17, borda #1F2733, raio 8.
const CAIXA = 'margin:0;border-radius:8px;border:1px solid #1F2733;background:#0B0F17';

// Lista com marcador de bolinha (o Tailwind tira o marcador de toda lista).
const LISTA = 'margin:6px 0 0;padding-left:18px;list-style:disc;font-size:14px;display:flex;flex-direction:column;gap:4px';

// As cores de cada nível de risco: borda, fundo e texto do selo.
const RISCO = {
  baixo: { borda: 'rgba(34,197,94,.5)', fundo: 'rgba(34,197,94,.12)', cor: '#22C55E' },
  medio: { borda: 'rgba(245,158,11,.4)', fundo: 'rgba(245,158,11,.12)', cor: '#F59E0B' },
  alto: { borda: 'rgba(239,68,68,.5)', fundo: 'rgba(239,68,68,.12)', cor: '#F87171' },
};

// As 4 perguntas do quiz, já com o "por que a sua não serve" de cada errada.
const PERGUNTAS = juntarPorques(modulo2.quiz, modulo2.porqueErradas);

// A "Pergunta rápida" do fim de um card: a pergunta N do quiz, sem gravar nada.
function perguntaRapida(idDaPergunta) {
  const pergunta = PERGUNTAS.find((item) => item.id === idDaPergunta);
  return montarPerguntaRapida({ id: 'm2-rapida-' + idDaPergunta, pergunta, moduloNome: MODULO_NOME });
}

// "Logo depois de um pump…." → "logo depois de um pump…" (vai depois de "Aparece").
function comoTrecho(texto) {
  const limpo = String(texto).trim().replace(/\.$/, '');
  return limpo.charAt(0).toLowerCase() + limpo.slice(1);
}

// As três caixas que rolam para o lado (a tabela dos vieses, o mapa dos tipos
// e a lista das 4 fases) levam tabindex="0", como no desenho: assim quem usa
// teclado põe o foco na caixa e rola com as setas (o contorno ciano aparece em
// volta). É fixo, e não "só quando rola": o navegador não avisa quando o
// conteúdo passa a não caber, então medir na hora daria resultado instável.

// Selo de risco em pílula ("Risco alto"), nas cores do desenho.
function seloDeRisco(risco, extra = '') {
  const cor = RISCO[risco] ?? RISCO.medio;
  return html`<span style="border-radius:999px;border:1px solid ${cor.borda};background:${cor.fundo};color:${cor.cor};font-weight:600;${extra}">${rotuloRisco(risco)}</span>`;
}

// ---------------------------------------------------------------------------
// Aba 1 — Visão geral
// ---------------------------------------------------------------------------

// "Economia da atenção": ação com empresa (tem chão) × memecoin (sem chão) e,
// embaixo, a sequência da atenção. No celular as colunas e a sequência
// empilham.
function criarFiguraDaAtencao() {
  const figura = modulo2.figuraDaAtencao;
  const ultima = figura.sequencia.length - 1;

  // A 1ª caixa da sequência sai em ciano, a última em vermelho.
  function caixaDaSequencia(texto, i) {
    let tom = 'border:1px solid #1F2733;background:#141A24';
    if (i === 0) tom = 'border:1px solid #22D3EE;background:rgba(34,211,238,.1);font-weight:600';
    if (i === ultima) tom = 'border:1px solid rgba(239,68,68,.5);background:rgba(239,68,68,.12);font-weight:600;color:#F87171';
    return html`<div style="border-radius:8px;padding:10px 14px;font-size:14px;text-align:center;${tom}">${texto}</div>`;
  }

  const sequencia = figura.sequencia.map((texto, i) => [
    i > 0 ? html`<span aria-hidden="true" style="color:#9AA7B4;padding:4px 10px">→</span>` : null,
    caixaDaSequencia(texto, i),
  ]);

  return html`<figure style="${CAIXA};padding:20px">
    <div role="img" aria-label="${figura.descricao}" style="display:flex;flex-direction:column;align-items:center">
      <div class="grid grid-cols-1 sm:grid-cols-2" style="gap:16px;width:100%">
        <div style="border-radius:8px;border:1px solid #1F2733;background:#141A24;padding:14px 16px">
          <p style="${MICRO};color:#9AA7B4">${figura.comChao.rotulo}</p>
          <p style="margin:6px 0 0;font-size:14px">${figura.comChao.texto}</p>
          <div aria-hidden="true" style="margin-top:10px;height:56px;display:flex;flex-direction:column-reverse">
            <span style="height:20px;border-radius:0 0 4px 4px;background:#7C3AED"></span>
            <span style="flex:1 1 auto;border:2px dashed #1F2733;border-bottom:0;border-radius:4px 4px 0 0"></span>
          </div>
          <p style="margin:6px 0 0;font-size:12px;color:#9AA7B4">${figura.comChao.legenda}</p>
        </div>
        <div style="border-radius:8px;border:1px solid rgba(239,68,68,.5);background:rgba(239,68,68,.12);padding:14px 16px">
          <p style="${MICRO};color:#F87171">${figura.semChao.rotulo}</p>
          <p style="margin:6px 0 0;font-size:14px">${figura.semChao.texto}</p>
          <div aria-hidden="true" style="margin-top:10px;height:56px;display:flex;flex-direction:column-reverse">
            <span style="box-sizing:content-box;height:20px;border-radius:0 0 4px 4px;border:2px dashed #EF4444"></span>
            <span style="flex:1 1 auto;border:2px dashed #1F2733;border-bottom:0;border-radius:4px 4px 0 0"></span>
          </div>
          <p style="margin:6px 0 0;font-size:12px;color:#9AA7B4">${figura.semChao.legenda}</p>
        </div>
      </div>
      <div aria-hidden="true" style="width:2px;height:18px;background:#9AA7B4;margin-top:16px"></div>
      <div aria-hidden="true" style="box-sizing:content-box;width:8px;height:8px;border-right:2px solid #9AA7B4;border-bottom:2px solid #9AA7B4;transform:rotate(45deg);margin-top:-10px"></div>
      <div class="flex flex-col sm:flex-row" style="align-items:center;margin-top:8px;width:100%;justify-content:center">${sequencia}</div>
    </div>
    <figcaption style="margin:16px 0 0;font-size:13px;color:#9AA7B4">${figura.legenda}</figcaption>
  </figure>`;
}

// "Dopamina e reforço intermitente": o laço de 5 etapas em círculo, com a
// geometria do desenho (340 / raio 116 / caixa 112 / margem 2).
function criarLacoDaDopamina() {
  const laco = modulo2.laco;
  const figura = criarCiclo({
    tamanho: 340,
    raio: 116,
    larguraDaCaixa: 112,
    margem: 2,
    etapas: laco.etapas.map((titulo) => ({ titulo })),
    centro: { texto: laco.centro, largura: 96 },
    frase: laco.frase,
    legenda: laco.legenda,
    espacoDaLegenda: 16,
    descricao: laco.descricao,
  });
  // O círculo nasce com os 340px do desenho e só depois se ajusta à largura
  // (no celular vira oval). Até esse ajuste, nada passa da caixa nem faz a
  // página rolar para o lado.
  figura.style.overflow = 'hidden';
  return figura;
}

// "O antídoto não é força de vontade": você calmo (a lista "Na prática" da
// seção) × você empolgado.
function criarCalmoOuEmpolgado(secao) {
  const dados = modulo2.calmoOuEmpolgado;
  const lista = secao.lista ?? [];
  const descricao =
    dados.calmo.rotulo + ': ' + lista.join(' ') + ' ' +
    dados.empolgado.rotulo + ': ' + comoTrecho(dados.empolgado.texto) + '. ' + dados.empolgado.fecho;

  return html`<figure style="${CAIXA};padding:20px">
    <div role="img" aria-label="${descricao}" class="grid grid-cols-1 sm:grid-cols-2" style="gap:16px">
      <div style="border-radius:8px;border:2px solid #22C55E;background:#0B0F17;padding:14px 16px">
        <p style="${MICRO};color:#22C55E">${dados.calmo.rotulo}</p>
        <ul style="margin:8px 0 0;padding-left:18px;list-style:disc;font-size:14px;display:flex;flex-direction:column;gap:6px">
          ${lista.map((item) => html`<li>${item}</li>`)}
        </ul>
      </div>
      <div style="border-radius:8px;border:2px dashed #EF4444;background:#0B0F17;padding:14px 16px;display:flex;flex-direction:column;gap:8px">
        <p style="${MICRO};color:#F87171">${dados.empolgado.rotulo}</p>
        <p style="margin:0;font-size:14px;color:#9AA7B4">${dados.empolgado.texto}</p>
        <p style="margin:auto 0 0;padding-top:8px;font-size:14px;font-weight:600">${dados.empolgado.fecho}</p>
      </div>
    </div>
  </figure>`;
}

// O "Para ir mais fundo" do desenho é um parágrafo só: junta os do dado.
function comDetalheNumParagrafo(secao) {
  if (!secao.detalhe?.paragrafos) return secao;
  return { ...secao, detalhe: { ...secao.detalhe, paragrafos: [secao.detalhe.paragrafos.join(' ')] } };
}

function montarVisaoGeral() {
  const secao = (id) => modulo2.secoes.find((item) => item.id === id);
  const antidoto = secao('antidoto');

  // O desenho troca os parágrafos de cada seção pelo visual + legenda (os
  // parágrafos continuam no arquivo de dados).
  return criarElemento('div', { class: 'flex flex-col gap-6' }, [
    montarDestaques(modulo2.destaques.visaoGeral),
    criarCardDaSecao(secao('atencao'), {
      // A videoaula da seção, se houver (o dado diz a seção: `videos[...].secao`).
      video: videoDaSecao(modulo2.videos, 'atencao'),
      visual: criarFiguraDaAtencao(),
      omitir: ['paragrafos'],
      pergunta: perguntaRapida('q1'),
    }),
    criarCardDaSecao(comDetalheNumParagrafo(secao('dopamina')), {
      visual: criarLacoDaDopamina(),
      omitir: ['paragrafos', 'exemplo'],
    }),
    criarCardDaSecao(antidoto, {
      visual: criarCalmoOuEmpolgado(antidoto),
      omitir: ['paragrafos', 'lista'],
    }),
  ]);
}

// ---------------------------------------------------------------------------
// Aba 2 — Vieses
// ---------------------------------------------------------------------------

// A tabela "o que você pensa → o que acontece → o que fazer". Tem no mínimo
// 720px: no celular a caixa rola para o lado.
function criarTabelaDosVieses() {
  const tabela = modulo2.tabelaDosVieses;
  const CABECA =
    'text-align:left;padding:8px 12px;font-size:12px;font-weight:600;letter-spacing:.05em;' +
    'text-transform:uppercase;color:#9AA7B4;border-bottom:1px solid #1F2733';
  const CELULA = 'padding:10px 12px;border-bottom:1px solid #1F2733;vertical-align:top';

  const elemento = html`<table style="border-collapse:collapse;width:100%;min-width:720px;font-size:14px">
    <thead>
      <tr>
        <th scope="col" style="${CABECA}">${tabela.colunas.nome}</th>
        <th scope="col" style="${CABECA}">${tabela.colunas.gatilho}</th>
        <th scope="col" style="${CABECA}">${tabela.colunas.custo}</th>
        <th scope="col" style="${CABECA};border-left:2px solid #22D3EE">${tabela.colunas.antidoto}</th>
      </tr>
    </thead>
    <tbody></tbody>
  </table>`;

  // As linhas entram depois, pelo DOM: texto solto dentro de <tbody> o
  // navegador tiraria da tabela.
  elemento.querySelector('tbody').append(
    ...modulo2.vieses.map(
      (vies) => html`<tr>
        <th scope="row" style="text-align:left;${CELULA};font-weight:600">${vies.nome}<span style="display:block;font-size:12px;font-weight:400;color:#9AA7B4">${vies.subtitulo}</span><span style="display:block;margin-top:6px;font-size:11px;font-weight:600;letter-spacing:.05em;text-transform:uppercase;color:#9AA7B4">${tabela.aparece + ' ' + comoTrecho(vies.quandoAparece)}</span></th>
        <td style="${CELULA};color:#9AA7B4">${vies.gatilho}</td>
        <td style="${CELULA}"><span style="display:inline-block;border-radius:6px;border:1px solid rgba(239,68,68,.5);background:rgba(239,68,68,.12);color:#F87171;padding:4px 8px;font-weight:600">${vies.custo}</span></td>
        <td style="${CELULA};color:#9AA7B4;border-left:2px solid #22D3EE">${vies.antidoto}</td>
      </tr>`,
    ),
  );

  return html`<div role="group" tabindex="0" aria-label="${tabela.rotuloDaRolagem}" style="${CAIXA};padding:12px;overflow-x:auto">${elemento}</div>`;
}

// "Estou em FOMO?": começo → 3 perguntas, cada uma com a saída que reprova
// (vermelha, à esquerda) e a que passa (verde, à direita) → o fim verde.
function criarFluxoDoFomo() {
  const fluxo = modulo2.fluxoFomo;

  const linha = (altura, extra = '') =>
    html`<div aria-hidden="true" style="width:2px;height:${altura}px;background:#9AA7B4;${extra}"></div>`;

  const pilula = (rotulo, passa) => {
    const cor = passa ? RISCO.baixo : RISCO.alto;
    return html`<span style="border-radius:999px;border:1px solid ${cor.borda};background:${cor.fundo};color:${cor.cor};padding:1px 10px;font-size:12px;font-weight:600">${rotulo}</span>`;
  };

  const passos = fluxo.passos.map((passo) => [
    linha(14),
    html`<div style="box-sizing:content-box;border-radius:8px;border:1px solid #22D3EE;background:rgba(34,211,238,.1);padding:10px 16px;font-size:14px;font-weight:600;text-align:center;max-width:420px">${passo.pergunta}</div>`,
    html`<div class="grid grid-cols-1 sm:grid-cols-2" style="gap:16px;width:100%;max-width:600px">
      <div style="display:flex;flex-direction:column;align-items:center">
        ${linha(12)}${pilula(passo.desvio.rotulo, false)}${linha(12)}
        <div style="width:100%;border-radius:8px;border:1px solid rgba(239,68,68,.5);background:rgba(239,68,68,.12);padding:10px 14px;font-size:14px;color:#F87171;text-align:center">${passo.desvio.texto}</div>
      </div>
      <div style="display:flex;flex-direction:column;align-items:center">
        ${linha(12)}${pilula(passo.segue.rotulo, true)}${linha(12)}
        <div style="width:100%;border-radius:8px;border:1px solid #1F2733;background:#141A24;padding:10px 14px;font-size:14px;color:#9AA7B4;text-align:center">${passo.segue.texto}</div>
      </div>
    </div>`,
  ]);

  return html`<figure style="${CAIXA};padding:20px">
    <div role="img" aria-label="${fluxo.descricao}" style="display:flex;flex-direction:column;align-items:center">
      <div style="border-radius:8px;border:1px solid #1F2733;background:#141A24;padding:10px 16px;font-size:14px;font-weight:600;text-align:center">${fluxo.inicio}</div>
      ${passos}
      ${linha(16, 'margin-top:8px')}
      <div style="box-sizing:content-box;border-radius:8px;border:1px solid rgba(34,197,94,.5);background:rgba(34,197,94,.12);padding:10px 16px;font-size:14px;font-weight:600;text-align:center;max-width:460px">${fluxo.fim}</div>
    </div>
    <figcaption style="margin:16px 0 0;font-size:13px;color:#9AA7B4">${fluxo.legenda}</figcaption>
  </figure>`;
}

// "Anatomia de um post de hype": o post esquemático em grade HTML (painéis
// com o texto real em mono e o marcador à esquerda; os de alerta em âmbar) e,
// ao lado, a lista numerada. No celular a lista desce para baixo do post.
function criarPostDeHype() {
  const anatomia = modulo2.anatomias.postDeHype;
  const porId = new Map(anatomia.paineis.map((painel) => [painel.id, painel]));
  // O número de cada painel segue a ordem da lista, não a ordem do desenho.
  const numero = new Map(anatomia.itens.map((item, i) => [item.painel, i + 1]));

  function criarPainel(id, altura) {
    const painel = porId.get(id);
    if (!painel) return null;
    const borda = painel.alerta ? 'rgba(245,158,11,.4)' : '#22D3EE';
    const fundo = painel.alerta ? 'rgba(245,158,11,.12)' : 'rgba(34,211,238,.08)';
    return html`<div style="box-sizing:content-box;border-radius:6px;border:1px solid ${borda};background:${fundo};padding:8px;min-height:${altura}px;display:flex;gap:8px;align-items:flex-start">
      <span aria-hidden="true" style="flex:0 0 20px;width:20px;height:20px;border-radius:50%;background:#22D3EE;color:#0B0F17;font-family:${FONTE_MONO};font-size:11px;font-weight:700;display:inline-flex;align-items:center;justify-content:center">${numero.get(id) ?? ''}</span>
      <span style="min-width:0;font-family:${FONTE_MONO};font-size:11.5px;line-height:1.35;color:#E6EDF3;overflow-wrap:break-word">${painel.rotulo}</span>
    </div>`;
  }

  const descricao =
    'Mockup esquemático com ' + anatomia.itens.length + ' marcadores: ' +
    anatomia.itens.map((item, i) => i + 1 + ' ' + (porId.get(item.painel)?.rotulo ?? '')).join('; ') + '.';

  return html`<figure style="${CAIXA};padding:20px">
    <div class="grid grid-cols-1 sm:grid-cols-2" style="gap:20px;align-items:start">
      <div role="img" aria-label="${descricao}" style="border-radius:10px;border:1px solid #1F2733;background:#10151E;padding:14px;display:flex;flex-direction:column;gap:8px">
        ${anatomia.grade.map(
          (linhaDaGrade) => html`<div style="display:grid;grid-template-columns:${linhaDaGrade.cols};gap:8px">${linhaDaGrade.paineis.map((id) => criarPainel(id, linhaDaGrade.altura))}</div>`,
        )}
        <p style="margin:4px 0 0;font-size:12px;color:#9AA7B4">${anatomia.rodape}</p>
      </div>
      <ol style="margin:0;padding:0;list-style:none;display:flex;flex-direction:column;gap:10px">
        ${anatomia.itens.map(
          (item, i) => html`<li style="display:flex;gap:10px;align-items:flex-start;font-size:14px">
            <span aria-hidden="true" style="flex:0 0 24px;width:24px;height:24px;border-radius:50%;background:#22D3EE;color:#0B0F17;font-family:${FONTE_MONO};font-size:13px;font-weight:700;display:inline-flex;align-items:center;justify-content:center">${i + 1}</span>
            <span><strong>${item.titulo}.</strong> <span style="color:#9AA7B4">${item.texto}</span></span>
          </li>`,
        )}
      </ol>
    </div>
    <figcaption style="margin:12px 0 0;font-size:13px;color:#9AA7B4">${anatomia.legenda}</figcaption>
  </figure>`;
}

function montarVieses() {
  const tabela = modulo2.tabelaDosVieses;
  const fomo = modulo2.fluxoFomo;
  const post = modulo2.anatomias.postDeHype;

  return criarElemento('div', { class: 'flex flex-col gap-6' }, [
    montarDestaques(modulo2.destaques.vieses),
    criarCardDaSecao(
      { titulo: tabela.titulo, emUmaFrase: tabela.emUmaFrase },
      { visual: criarTabelaDosVieses(), pergunta: perguntaRapida('q2') },
    ),
    criarCardDaSecao({ titulo: fomo.titulo, emUmaFrase: fomo.emUmaFrase }, { visual: criarFluxoDoFomo() }),
    criarCardDaSecao({ titulo: post.titulo, emUmaFrase: post.descricao }, { visual: criarPostDeHype() }),
  ]);
}

// ---------------------------------------------------------------------------
// Aba 3 — Tipos de token: o mapa clicável filtra os cards
// ---------------------------------------------------------------------------

function criarCardDeTipo(tipo) {
  const exemplos = tipo.exemplos ?? [];
  const rotulos = modulo2.mapaDosTipos.rotulos;
  return html`<article style="border-radius:8px;border:1px solid #1F2733;background:#0B0F17;padding:16px;display:flex;flex-direction:column;gap:10px">
    <div style="display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;align-items:baseline">
      <h3 style="margin:0;font-size:15px;font-weight:600">${tipo.nome}</h3>
      ${seloDeRisco(tipo.risco, 'padding:1px 10px;font-size:12px;white-space:nowrap')}
    </div>
    <p style="margin:0;font-size:14px;color:#9AA7B4">${tipo.descricao}</p>
    <div>
      <p style="${MICRO};color:#9AA7B4">${rotulos.comoReconhecer}</p>
      <p style="margin:2px 0 0;font-size:14px;color:#9AA7B4">${tipo.comoReconhecer}</p>
    </div>
    ${exemplos.length
      ? html`<ul style="margin:0;padding:0;list-style:none;display:flex;flex-wrap:wrap;gap:6px">
          ${exemplos.map((exemplo) => html`<li style="border-radius:999px;border:1px solid #1F2733;background:#141A24;padding:2px 10px;font-size:12px;color:#9AA7B4">${exemplo}</li>`)}
        </ul>`
      : null}
    <div style="margin-top:auto;border-radius:6px;border:1px solid rgba(245,158,11,.4);background:rgba(245,158,11,.12);padding:8px 10px">
      <p style="${MICRO};color:#F59E0B">${rotulos.alerta}</p>
      <p style="margin:2px 0 0;font-size:13px">${tipo.alerta}</p>
    </div>
  </article>`;
}

function montarTiposDeToken() {
  const textos = modulo2.mapaDosTipos;
  const categorias = modulo2.categoriasDeToken;
  const tipos = modulo2.tiposDeToken;
  let categoriaAtiva = null; // null = todas as categorias
  const botoes = [];

  // Um ramo por categoria: o botão filtra (aria-pressed) e as folhas são os
  // tipos, com borda e fundo na cor do risco. O risco vai escrito também para
  // o leitor de tela (a cor sozinha não diz nada a ele).
  const ramos = categorias.map((categoria) => {
    const botao = criarElemento(
      'button',
      { type: 'button', class: 'omh-mapa-botao', 'aria-pressed': 'false', onclick: () => escolher(categoria.id) },
      [categoria.nome],
    );
    botao.dataset.categoria = categoria.id;
    botoes.push(botao);

    const folhas = tipos
      .filter((tipo) => tipo.categoria === categoria.id)
      .map((tipo) => {
        const cor = RISCO[tipo.risco] ?? RISCO.medio;
        return html`<span class="omh-mapa-folha" style="border-color:${cor.borda};background:${cor.fundo}">${tipo.nome}<span class="sr-only">${' (' + rotuloRisco(tipo.risco).toLowerCase() + ')'}</span></span>`;
      });
    return html`<li class="omh-mapa-ramo">${botao}${folhas}</li>`;
  });

  // A caixa do mapa: no computador tem no mínimo 640px (rola para o lado se
  // faltar espaço); no celular o mapa fica vertical (.omh-mapa, custom.css).
  const mapa = html`<div role="group" tabindex="0" aria-label="${textos.rotuloDaRolagem}" style="${CAIXA};padding:16px;overflow-x:auto">
    <div class="omh-mapa sm:min-w-[640px]" style="border:0;border-radius:0;background:transparent;padding:0">
      <div class="omh-mapa-centro" style="max-width:200px">
        <p class="omh-mapa-centro-titulo" style="font-size:15px;line-height:1.6">${textos.centro}</p>
        <p class="omh-mapa-centro-subtitulo" style="font-size:13px">${categorias.length + ' categorias, ' + tipos.length + ' tipos'}</p>
      </div>
      <div aria-hidden="true" class="omh-mapa-tronco"></div>
      <ul class="omh-mapa-ramos">${ramos}</ul>
    </div>
  </div>`;

  // Legenda das cores. "Nenhum tipo é risco baixo." só enquanto for verdade.
  const quadradinho = (cor) =>
    html`<span aria-hidden="true" style="width:12px;height:12px;border-radius:3px;background:${cor}"></span>`;
  const semBaixo = !tipos.some((tipo) => tipo.risco === 'baixo');
  const legenda = html`<div style="display:flex;flex-wrap:wrap;gap:14px;font-size:13px;color:#9AA7B4">
    <span style="display:inline-flex;align-items:center;gap:6px">${quadradinho('#EF4444')}${textos.legenda.alto}</span>
    <span style="display:inline-flex;align-items:center;gap:6px">${quadradinho('#F59E0B')}${textos.legenda.medio}</span>
    ${semBaixo ? html`<span>${textos.legenda.semBaixo}</span>` : null}
  </div>`;

  const resultado = html`<p aria-live="polite" style="margin:0;font-size:14px;color:#9AA7B4"></p>`;
  const grade = html`<div class="grid grid-cols-1 sm:grid-cols-2" style="gap:16px"></div>`;

  // Clicar numa categoria filtra; clicar de novo mostra todas.
  function escolher(id) {
    categoriaAtiva = categoriaAtiva === id ? null : id;
    aplicarFiltro();
  }

  function aplicarFiltro() {
    const visiveis = categoriaAtiva ? tipos.filter((tipo) => tipo.categoria === categoriaAtiva) : tipos;
    grade.replaceChildren(...visiveis.map(criarCardDeTipo));

    const nome = categorias.find((categoria) => categoria.id === categoriaAtiva)?.nome;
    const quantos = categoriaAtiva
      ? visiveis.length + (visiveis.length === 1 ? ' tipo' : ' tipos') + ' em "' + nome + '"'
      : 'Todos os ' + tipos.length + ' tipos';
    resultado.textContent = quantos + '. ' + textos.instrucao;

    botoes.forEach((botao) => {
      const ativo = botao.dataset.categoria === categoriaAtiva;
      botao.setAttribute('aria-pressed', String(ativo));
      botao.dataset.ativo = String(ativo); // roxo, pelo .omh-mapa-botao[data-ativo]
    });
  }
  aplicarFiltro();

  return criarElemento('div', { class: 'flex flex-col gap-6' }, [
    montarDestaques(modulo2.destaques.tipos),
    criarCardDaSecao(
      { titulo: textos.titulo, emUmaFrase: textos.emUmaFrase },
      { visual: mapa, depois: [legenda, resultado, grade] },
    ),
  ]);
}

// ---------------------------------------------------------------------------
// Aba 4 — Casos reais (TRUMP, MELANIA, LIBRA)
// ---------------------------------------------------------------------------

function criarCardDeCaso(caso) {
  const rotulos = modulo2.rotulosDosCasos;
  return html`<article style="border-radius:8px;border:1px solid #1F2733;background:#0B0F17;padding:16px;display:flex;flex-direction:column;gap:10px">
    <div>
      <h3 style="margin:0;font-size:15px;font-weight:600">${caso.nome}</h3>
      <p style="margin:2px 0 0;font-family:${FONTE_MONO};font-size:12px;color:#9AA7B4">${caso.ticker + ' · ' + caso.chain + ' · ' + caso.data}</p>
    </div>
    <p style="margin:0;font-size:14px;color:#9AA7B4">${caso.resumo}</p>
    <dl style="margin:0;display:flex;flex-direction:column;gap:6px">
      ${caso.numeros.map(
        (numero) => html`<div style="display:flex;justify-content:space-between;gap:10px;align-items:baseline;border-bottom:1px solid #1F2733;padding-bottom:4px">
          <dt style="font-size:12px;color:#9AA7B4">${numero.rotulo}</dt>
          <dd style="margin:0;font-family:${FONTE_MONO};font-size:13px;text-align:right;overflow-wrap:anywhere;min-width:0">${numero.valor}</dd>
        </div>`,
      )}
    </dl>
    <p style="margin:0;font-size:12px;color:#9AA7B4">${rotulos.fontes + caso.fontes.join(', ')}</p>
    <div style="margin-top:auto;border-radius:6px;border:1px solid #22D3EE;background:rgba(34,211,238,.1);padding:8px 10px">
      <p style="${MICRO};color:#22D3EE">${rotulos.licao}</p>
      <p style="margin:2px 0 0;font-size:13px">${caso.licao}</p>
    </div>
  </article>`;
}

function montarCasos() {
  const cronologia = modulo2.linhaDoTempoCasos;

  // Um card só, como no desenho: a linha do tempo (o espaço entre os marcos
  // cresce com o tempo: 0,22px por dia = 6,7px por mês), os 3 casos em grade,
  // a lição e a Pergunta rápida.
  return criarElemento('div', { class: 'flex flex-col gap-6' }, [
    montarDestaques(modulo2.destaques.casos),
    criarCardDaSecao(
      { titulo: cronologia.titulo, emUmaFrase: cronologia.descricao },
      {
        visual: montarLinhaDoTempo({ marcos: cronologia.marcos, nota: cronologia.nota, caixa: true, pxPorMes: 6.7 }),
        depois: [
          html`<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:16px">${modulo2.casos.map(criarCardDeCaso)}</div>`,
          html`<p style="margin:0;color:#9AA7B4">${modulo2.licaoDosCasos}</p>`,
        ],
        pergunta: perguntaRapida('q4'),
      },
    ),
  ]);
}

// ---------------------------------------------------------------------------
// Aba 5 — As 4 fases: clique numa para ver o que checar
// ---------------------------------------------------------------------------

// As 4 fases lado a lado (em coluna no celular), cada uma um botão com o
// número, o nome e o selo de risco, e o desfecho "Maioria vai a zero" no fim.
// Embaixo, o painel roxo da fase escolhida. Padrão de abas: ← → (e ↑ ↓)
// trocam a fase; Home e End vão à primeira e à última.
function criarSeletorDeFases() {
  const fases = modulo2.fases;
  const rotulos = modulo2.seletorDeFases.rotulos;
  const idPainel = 'm2-fases-painel';
  let atual = 0;
  const botoes = [];
  const marcadores = [];

  const painel = html`<div role="tabpanel" id="${idPainel}" tabindex="0" aria-live="polite" style="margin-top:16px;border-radius:8px;border:1px solid rgba(124,58,237,.6);background:rgba(124,58,237,.12);padding:16px;display:flex;flex-direction:column;gap:12px"></div>`;

  function preencherPainel() {
    const fase = fases[atual];
    painel.setAttribute('aria-labelledby', botoes[atual].id);
    painel.replaceChildren(
      html`<p style="margin:0;font-size:15px;font-weight:600">${fase.numero + '. ' + fase.nome}</p>`,
      html`<p style="margin:0;font-size:14px;color:#9AA7B4">${fase.resumo}</p>`,
      html`<div class="grid grid-cols-1 sm:grid-cols-2" style="gap:16px">
        <div>
          <p style="${MICRO};color:#9AA7B4">${rotulos.oQueVoceVe}</p>
          <ul style="${LISTA};color:#9AA7B4">${fase.oQueVoceVe.map((item) => html`<li>${item}</li>`)}</ul>
        </div>
        <div>
          <p style="${MICRO};color:#22D3EE">${rotulos.oQueChecar}</p>
          <ul style="${LISTA}">${fase.oQueChecar.map((item) => html`<li>${item}</li>`)}</ul>
        </div>
      </div>`,
      html`<div style="border-radius:6px;border:1px solid rgba(239,68,68,.5);background:rgba(239,68,68,.12);padding:8px 12px">
        <p style="${MICRO};color:#F87171">${rotulos.armadilha}</p>
        <p style="margin:2px 0 0;font-size:14px">${fase.armadilha}</p>
      </div>`,
    );
  }

  // Borda e fundo vêm de classes, para o hover (borda #9AA7B4) funcionar.
  function pintar() {
    botoes.forEach((botao, i) => {
      const ativo = i === atual;
      botao.className =
        'border transition-colors duration-150 hover:border-texto-suave ' +
        (ativo ? 'border-primaria bg-primaria/15' : 'border-borda bg-superficie');
      botao.setAttribute('aria-selected', String(ativo));
      botao.setAttribute('tabindex', ativo ? '0' : '-1');
      marcadores[i].style.background = ativo ? '#22D3EE' : '#1F2733';
      marcadores[i].style.color = ativo ? '#0B0F17' : '#E6EDF3';
    });
    preencherPainel();
  }

  function irPara(indice, moverFoco = false) {
    atual = (indice + fases.length) % fases.length;
    pintar();
    if (moverFoco) botoes[atual].focus();
  }

  const itens = fases.map((fase, i) => {
    const marcador = html`<span aria-hidden="true" style="flex:0 0 24px;width:24px;height:24px;border-radius:50%;font-family:${FONTE_MONO};font-size:13px;font-weight:700;display:inline-flex;align-items:center;justify-content:center">${fase.numero}</span>`;
    marcadores.push(marcador);

    // line-height normal: é o do botão no desenho (o Tailwind poria 1,6).
    const botao = html`<button type="button" role="tab" id="${'m2-fase-' + fase.id}" aria-controls="${idPainel}" style="flex:1 1 auto;min-width:0;min-height:44px;border-radius:8px;padding:10px 12px;color:#E6EDF3;text-align:left;line-height:normal;cursor:pointer;display:flex;flex-direction:column;gap:6px">
      <span style="display:flex;gap:8px;align-items:center">${marcador}<span style="font-size:14px;font-weight:600;line-height:1.3">${fase.nome}</span></span>
      ${seloDeRisco(fase.risco, 'padding:0 8px;font-size:11px;align-self:flex-start')}
    </button>`;
    botao.addEventListener('click', () => irPara(i));
    botao.addEventListener('keydown', (evento) => {
      const teclas = { ArrowRight: i + 1, ArrowDown: i + 1, ArrowLeft: i - 1, ArrowUp: i - 1, Home: 0, End: fases.length - 1 };
      if (!(evento.key in teclas)) return;
      evento.preventDefault();
      irPara(teclas[evento.key], true);
    });
    botoes.push(botao);

    const seta =
      i < fases.length - 1
        ? html`<span aria-hidden="true" style="flex:0 0 auto;display:flex;align-items:center;justify-content:center;color:#9AA7B4;padding:2px 6px">→</span>`
        : null;
    // min-w-0 no celular e 150px no computador são as medidas do desenho: com
    // elas as 4 fases encolhem por igual e o desfecho cabe na mesma linha.
    // Sem largura máxima, como no desenho: assim as quatro têm sempre o mesmo
    // tamanho (flex:1 1 0), qualquer que seja a largura da tela.
    return html`<li role="presentation" class="flex flex-col sm:flex-row min-w-0 sm:min-w-[150px]" style="flex:1 1 0;align-items:stretch">${botao}${seta}</li>`;
  });

  // O desfecho não é uma fase: fica depois da seta tracejada, sem botão. Ele
  // ocupa só o tamanho do próprio texto (flex:0 0 auto, como no desenho), e as
  // 4 fases dividem o resto da linha. Sem base fixa, o texto cabe numa linha só
  // no computador e, no celular (a lista vira coluna), a caixa não sobra altura.
  const desfecho = html`<li role="presentation" class="flex flex-col sm:flex-row" style="flex:0 0 auto;align-items:stretch">
    <span aria-hidden="true" style="display:flex;align-items:center;justify-content:center;color:#9AA7B4;padding:2px 6px">⇢</span>
    <div style="border-radius:8px;border:1px solid #1F2733;background:#141A24;padding:10px 12px;font-size:14px;color:#9AA7B4;display:flex;align-items:center">${modulo2.desfechoFases}</div>
  </li>`;

  // Uma linha só, como no desenho: numa tela média o que não couber rola para
  // o lado dentro da caixa (nunca quebra em duas linhas, que deixaria as fases
  // com tamanhos diferentes). O padding de 4px (com a margem de −4px) deixa o
  // contorno do foco inteiro dentro da lista.
  const lista = html`<ol role="tablist" tabindex="0" aria-label="${modulo2.seletorDeFases.rotuloDaLista}" class="flex flex-col sm:flex-row" style="list-style:none;margin:-4px;padding:4px;align-items:stretch;overflow-x:auto">${itens}${desfecho}</ol>`;

  pintar();

  return html`<div style="${CAIXA};padding:20px">${lista}${painel}</div>`;
}

function montarFases() {
  const textos = modulo2.seletorDeFases;
  const grades = modulo2.grades;

  return criarElemento('div', { class: 'flex flex-col gap-6' }, [
    montarDestaques(modulo2.destaques.fases),
    criarCardDaSecao(
      { titulo: textos.titulo, emUmaFrase: textos.emUmaFrase },
      {
        visual: criarSeletorDeFases(),
        depois: [
          html`<p style="margin:0;color:#9AA7B4">${modulo2.paragrafoDaMortalidade}</p>`,
          criarGradesLadoALado({ frase: grades.frase, grades: grades.itens, legenda: grades.legenda }),
        ],
        pergunta: perguntaRapida('q3'),
      },
    ),
  ]);
}

// ---------------------------------------------------------------------------
// Aba 6 — Quiz + "Terminou o módulo?" + "O que você leva deste módulo"
// ---------------------------------------------------------------------------
function montarConclusao() {
  const container = criarCard([]);

  function estaConcluido() {
    return (obterEstado().modulosConcluidos ?? []).includes(modulo2.id);
  }

  function alternar() {
    const concluido = estaConcluido();
    const salvou = atualizar((estado) => {
      const lista = new Set(estado.modulosConcluidos ?? []);
      if (concluido) lista.delete(modulo2.id);
      else lista.add(modulo2.id);
      return { ...estado, modulosConcluidos: [...lista] };
    });

    renderizar();
    if (!salvou) mostrarToast('Não consegui salvar o progresso');
    else mostrarToast(concluido ? 'Módulo desmarcado' : 'Módulo 2 concluído. Progresso salvo');
  }

  function renderizar() {
    const concluido = estaConcluido();
    container.replaceChildren(
      criarElemento('h2', { class: 'text-lg font-semibold' }, ['Terminou o módulo?']),
      criarElemento('p', { class: 'mt-2 mb-4 text-sm text-texto-suave' }, [
        concluido
          ? 'Módulo 2 marcado como concluído. Ele conta na barra de progresso do topo.'
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

// O último card da aba Quiz, como no desenho.
function criarObjetivos() {
  return criarCard([
    criarElemento('h2', { class: 'text-lg font-semibold' }, ['O que você leva deste módulo']),
    criarElemento(
      'ul',
      { class: 'mt-3 flex list-disc flex-col gap-1.5 pl-5 text-texto-suave' },
      modulo2.objetivos.map((objetivo) => criarElemento('li', {}, [objetivo])),
    ),
  ]);
}

function montarAbaQuiz() {
  // Sem moduloId: o card "Terminou o módulo?" continua separado, como no
  // desenho (senão haveria dois botões iguais).
  return criarElemento('div', { class: 'flex flex-col gap-6' }, [
    montarQuiz({
      id: modulo2.id,
      titulo: 'Mini-quiz do Módulo 2',
      descricao: 'Quatro perguntas. As respostas ficam salvas no navegador.',
      perguntas: PERGUNTAS,
      moduloNome: MODULO_NOME,
    }),
    montarConclusao(),
    criarObjetivos(),
  ]);
}

// ---------------------------------------------------------------------------
// Montagem da página
// ---------------------------------------------------------------------------
const ABAS = [
  { id: 'visao-geral', rotulo: 'Visão geral', montar: montarVisaoGeral },
  { id: 'vieses', rotulo: 'Vieses', montar: montarVieses },
  // Sem sempreRemontar: remontar zeraria o filtro dos tipos a cada visita.
  { id: 'tipos', rotulo: 'Tipos de token', montar: montarTiposDeToken },
  { id: 'casos', rotulo: 'Casos reais', montar: montarCasos },
  { id: 'fases', rotulo: 'As 4 fases', montar: montarFases },
  { id: 'quiz', rotulo: 'Quiz', montar: montarAbaQuiz },
];

export function montarModulo2() {
  // Cabeçalho: micro-rótulo "MÓDULO 2", o título e o resumo (sem margem
  // própria: a coluna do router já põe 24px entre os blocos).
  const cabecalho = criarTitulo(modulo2.titulo, { rotulo: MODULO_NOME, subtitulo: modulo2.resumo });
  cabecalho.classList.remove('mb-6');
  cabecalho.lastElementChild.style.textWrap = 'pretty';

  // O mapa do módulo: um ramo por aba (o Quiz também); as folhas curtas vêm
  // de modulo2.mapa, e o ramo da aba aberta fica roxo.
  const mapa = criarMapaDoModulo({
    mapa: modulo2.mapa,
    abas: ABAS.map(({ id, rotulo }) => ({ id, rotulo })),
    perguntas: modulo2.quiz.length,
    idDasAbas: 'modulo-2',
  });
  // A margem de baixo do card do mapa (custom.css) é provisória, para as
  // páginas que ainda não estão na coluna com 24px entre os blocos.
  if (mapa) mapa.style.marginBottom = '0';

  const abas = criarAbas({ id: 'modulo-2', rotulo: 'Seções do Módulo 2', abas: ABAS });

  // Um fragmento: a coluna do router (.omh-coluna) põe os 24px entre os blocos.
  const pagina = document.createDocumentFragment();
  pagina.append(cabecalho, ...(mapa ? [mapa] : []), abas);
  return pagina;
}
