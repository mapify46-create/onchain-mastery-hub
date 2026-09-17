// visuais.js — o vocabulário visual didático do hub, no traço do design system.
//
// Cada peça aqui mostra uma RELAÇÃO (o todo e as partes, ordem, o que se repete,
// probabilidade, proporção, sensibilidade). Nenhuma é decorativa: detalhe que só
// enfeita atrapalha o aprendizado (pesquisa/modulos/pesquisas/P14).
//
//   criarMapaMental           o todo e suas partes — centro + ramos + folhas
//   criarSequencia            ordem — passos numerados, um em destaque
//   criarCiclo                o que se repete — círculo em SVG com seta de retorno
//   criarGradeDe100           probabilidade — 100 quadrados, "de cada 100…"
//   criarBarrasNaMesmaEscala  proporção — sólido, tracejado e listrado
//   criarCurvaDeSaida         sensibilidade — arrasta e a conta muda
//
// A geometria, as cores e os estados vêm do handoff do Claude Design
// (pesquisa/design, "00 Componentes"). As classes .omh-* moram em styles/custom.css.
//
// ACESSIBILIDADE — o texto é o conteúdo, o desenho é enriquecimento: todo desenho
// é role="img" com descrição gerada dos próprios dados, e a informação inteira
// existe em HTML de verdade ao lado (lista, legenda, números).
//
// Nada aqui inventa número: quem chama passa os valores, que vêm de src/data.

import { html, svg, criarElemento } from '../ui.js';

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

// Cores permitidas nos desenhos (a grade só aceita estas cinco).
const COR_DO_TOM = {
  alto: COR.alto,
  baixo: COR.baixo,
  medio: COR.medio,
  primaria: COR.primaria,
  acento: COR.primaria, // no desenho, "o que o modelo pega" é roxo; ciano é só acento de UI
  suave: COR.borda,
};

const ROTULO_MIUDO =
  'margin:0;font-size:12px;font-weight:600;letter-spacing:.05em;text-transform:uppercase;color:#9AA7B4';

// Caixa padrão de figura: moldura, título opcional e nota opcional.
function moldura({ titulo, conteudo, nota, rotulo = null }) {
  const cabecalho = titulo
    ? html`<div class="mb-3 flex flex-wrap items-baseline justify-between gap-3">
        <figcaption class="text-sm font-semibold text-texto">${titulo}</figcaption>
        ${rotulo ? html`<span style="${ROTULO_MIUDO}">${rotulo}</span>` : ''}
      </div>`
    : '';
  return html`
    <figure class="mt-4 mb-0 rounded-lg border border-borda bg-fundo p-4 sm:p-5">
      ${cabecalho}
      ${conteudo}
      ${nota ? html`<p class="mt-3 text-xs text-texto-suave">${nota}</p>` : ''}
    </figure>
  `;
}

// ---------------------------------------------------------------------------
// Mapa mental
// ---------------------------------------------------------------------------

/**
 * Centro em card roxo, tronco de 2px, ramos ligados ao tronco por um conector,
 * cada ramo é um botão/link e as folhas são chips. No celular (≤ 640px) vira
 * vertical — ver .omh-mapa em styles/custom.css.
 *
 * @param {object} p
 * @param {object|string} p.centro  { rotulo, titulo, subtitulo? } ou só o título
 * @param {Array}  p.ramos          [{ titulo, folhas: [], href?, aoAbrir?, concluido? }]
 */
export function criarMapaMental({ centro, ramos = [], nota = null, titulo = null, rotulo = 'Relação: o todo e suas partes' }) {
  const c = typeof centro === 'string' ? { titulo: centro } : centro;

  const cartaoDoCentro = html`
    <div style="flex:0 0 auto;border-radius:12px;border:1px solid rgba(124,58,237,.6);background:rgba(124,58,237,.15);padding:16px 20px;max-width:200px">
      ${c.rotulo ? html`<p style="${ROTULO_MIUDO}">${c.rotulo}</p>` : ''}
      <p style="margin:4px 0 0;font-size:1.125rem;font-weight:600;line-height:1.3">${c.titulo}</p>
      ${c.subtitulo ? html`<p style="margin:6px 0 0;font-size:14px;color:#9AA7B4">${c.subtitulo}</p>` : ''}
    </div>
  `;

  const lista = criarElemento(
    'ul',
    { class: 'omh-mapa-ramos' },
    ramos.map((ramo) => {
      const estiloBotao =
        'border-radius:8px;border:1px solid ' +
        (ramo.concluido ? 'rgba(34,197,94,.5)' : COR.borda) +
        ';background:#141A24;padding:6px 12px;font-size:14px;font-weight:600;color:#E6EDF3;text-decoration:none;white-space:nowrap;cursor:pointer;min-height:40px;display:inline-flex;align-items:center;gap:6px';

      let cabecalho;
      if (ramo.href) {
        cabecalho = html`<a href="${ramo.href}" style="${estiloBotao}">${ramo.titulo} <span aria-hidden="true">→</span></a>`;
      } else if (ramo.aoAbrir) {
        cabecalho = html`<button type="button" style="${estiloBotao}">${ramo.titulo} <span aria-hidden="true">→</span></button>`;
        cabecalho.addEventListener('click', ramo.aoAbrir);
      } else {
        cabecalho = html`<span style="${estiloBotao};cursor:default">${ramo.titulo}</span>`;
      }
      cabecalho.addEventListener('mouseenter', () => (cabecalho.style.borderColor = COR.suave));
      cabecalho.addEventListener('mouseleave', () => (cabecalho.style.borderColor = ramo.concluido ? 'rgba(34,197,94,.5)' : COR.borda));
      if (ramo.concluido) cabecalho.append(html`<span aria-label="concluído" style="color:#22C55E">✓</span>`);

      const folhas = (ramo.folhas ?? []).slice(0, 3).map(
        (folha) => html`<span style="border-radius:999px;border:1px solid #1F2733;background:#0B0F17;padding:2px 10px;font-size:13px;color:#9AA7B4">${folha}</span>`,
      );

      return html`<li class="omh-mapa-ramo">${cabecalho}${folhas}</li>`;
    }),
  );

  const descricao =
    (c.rotulo ? c.rotulo + ', ' : '') +
    c.titulo +
    '; ' +
    ramos.length +
    ' ramos: ' +
    ramos.map((r) => r.titulo + (r.folhas?.length ? ' — ' + r.folhas.slice(0, 3).join(', ') : '')).join('; ');

  const mapa = html`
    <div role="group" aria-label="${descricao}" class="omh-mapa rounded-lg border border-borda bg-fundo p-5" tabindex="0">
      ${cartaoDoCentro}
      <div aria-hidden="true" class="omh-mapa-tronco"></div>
      ${lista}
    </div>
  `;

  return moldura({ titulo, rotulo, conteudo: mapa, nota });
}

/**
 * Mapa do módulo montado dos próprios dados: um ramo por aba, folhas = títulos
 * das seções daquela aba. Clicar num ramo abre a aba (o botão da aba tem id
 * `<idDasAbas>-aba-<idDaAba>`, padrão de criarAbas em ui.js).
 */
export function criarMapaDoModulo({ numero, nome, subtitulo = null, secoes = [], abas = [], idDasAbas = null, limite = 3, nota = null }) {
  const ramos = abas
    .filter((aba) => aba.id !== 'quiz')
    .map((aba) => ({
      titulo: aba.rotulo,
      folhas: secoes.filter((secao) => secao.aba === aba.id).map((secao) => secao.titulo).slice(0, limite),
      aoAbrir: idDasAbas ? () => abrirAba(idDasAbas + '-aba-' + aba.id) : null,
    }))
    .filter((ramo) => ramo.folhas.length > 0);

  if (!ramos.length) return null;

  return criarMapaMental({
    centro: { rotulo: numero ? 'Módulo ' + numero : null, titulo: nome, subtitulo },
    ramos,
    titulo: 'Mapa do módulo',
    nota,
  });
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
 * primeiro/último). Horizontal com rolagem interna; vertical no celular.
 *
 * @param {object} p
 * @param {Array}  p.passos  [{ titulo, texto }]
 */
export function criarSequencia({ titulo, passos = [], nota = null, atual = 0, rotulo = 'Relação: ordem' }) {
  let indiceAtual = Math.min(Math.max(atual, 0), Math.max(passos.length - 1, 0));
  const botoes = [];

  const painel = html`<div role="tabpanel" aria-live="polite" style="margin-top:16px;border-radius:8px;border:1px solid rgba(124,58,237,.6);background:rgba(124,58,237,.12);padding:12px 16px">
    <p style="${ROTULO_MIUDO}"></p>
    <p style="margin:4px 0 0;font-size:15px"></p>
  </div>`;
  const [rotuloDoPasso, textoDoPasso] = painel.querySelectorAll('p');

  function pintar() {
    botoes.forEach((botao, i) => {
      const ativo = i === indiceAtual;
      botao.setAttribute('aria-selected', String(ativo));
      botao.setAttribute('tabindex', ativo ? '0' : '-1');
      botao.style.borderColor = ativo ? COR.primaria : COR.borda;
      botao.style.background = ativo ? 'rgba(124,58,237,.15)' : COR.superficie;
      const marcador = botao.querySelector('[data-marcador]');
      marcador.style.background = ativo ? COR.acento : COR.borda;
      marcador.style.color = ativo ? COR.fundo : COR.texto;
      const textoMovel = botao.querySelector('[data-texto-movel]');
      if (textoMovel) textoMovel.hidden = !ativo;
    });
    rotuloDoPasso.textContent = 'Passo ' + (indiceAtual + 1) + ' de ' + passos.length;
    textoDoPasso.textContent = passos[indiceAtual]?.texto ?? '';
  }

  function irPara(indice, moverFoco = false) {
    indiceAtual = (indice + passos.length) % passos.length;
    pintar();
    if (moverFoco) botoes[indiceAtual].focus();
  }

  const itens = passos.map((passo, i) => {
    const botao = html`<button type="button" role="tab"
      style="flex:1 1 auto;min-height:44px;border-radius:8px;border:1px solid #1F2733;background:#141A24;padding:10px 12px;color:#E6EDF3;text-align:left;cursor:pointer;display:flex;gap:10px;align-items:flex-start;transition:border-color 150ms ease">
      <span data-marcador aria-hidden="true" style="flex:0 0 24px;width:24px;height:24px;border-radius:50%;background:#1F2733;color:#E6EDF3;font-family:'JetBrains Mono',ui-monospace,monospace;font-size:13px;font-weight:700;display:inline-flex;align-items:center;justify-content:center">${i + 1}</span>
      <span style="font-size:14px;font-weight:600;line-height:1.35">${passo.titulo}<span data-texto-movel hidden class="sm:hidden" style="display:block;margin-top:4px;font-weight:400;color:#9AA7B4">${passo.texto ?? ''}</span></span>
    </button>`;
    botao.addEventListener('click', () => irPara(i));
    botao.addEventListener('mouseenter', () => { if (i !== indiceAtual) botao.style.borderColor = COR.suave; });
    botao.addEventListener('mouseleave', () => { if (i !== indiceAtual) botao.style.borderColor = COR.borda; });
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

  const conteudo = html`<div>
    <ol role="tablist" aria-label="Passos" class="omh-sequencia">${itens}</ol>
    ${painel}
  </div>`;

  return moldura({ titulo, rotulo, conteudo, nota });
}

// ---------------------------------------------------------------------------
// Ciclo
// ---------------------------------------------------------------------------

/**
 * 3–6 etapas em círculo (SVG 320×320, raio 100), arcos com ponta de seta; o
 * último arco (n → 1) é ciano e tracejado. As caixas ficam sobre o círculo.
 *
 * @param {object} p
 * @param {Array}  p.etapas   [{ titulo, detalhe?, href? }]
 * @param {string} [p.retorno='volta ao começo']  rótulo do centro
 */
export function criarCiclo({ titulo, etapas = [], retorno = 'volta ao começo', centro = null, nota = null, rotulo = 'Relação: o que se repete' }) {
  const C = 160;
  const R = 100;
  const n = etapas.length;
  const FOLGA = n <= 3 ? 50 : n === 4 ? 40 : 30;
  const ang = (i) => ((-90 + (i * 360) / n) * Math.PI) / 180;
  const pt = (a, r) => ({ x: C + r * Math.cos(a), y: C + r * Math.sin(a) });

  const idSufixo = Math.random().toString(36).slice(2, 7);
  const desenho = html`<svg viewBox="0 0 320 320" width="320" height="320" aria-hidden="true" style="position:absolute;inset:0"></svg>`;
  desenho.append(
    svg`<defs>
      <marker id="seta-suave-${idSufixo}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#9AA7B4"></path></marker>
      <marker id="seta-acento-${idSufixo}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#22D3EE"></path></marker>
    </defs>`,
  );

  etapas.forEach((_, i) => {
    const a1 = ang(i) + (FOLGA * Math.PI) / 180;
    let a2 = ang((i + 1) % n) - (FOLGA * Math.PI) / 180;
    if (a2 < a1) a2 += 2 * Math.PI;
    const p1 = pt(a1, R);
    const p2 = pt(a2, R);
    const volta = i === n - 1;
    desenho.append(
      svg`<path d="M${p1.x.toFixed(1)},${p1.y.toFixed(1)} A${R},${R} 0 0 1 ${p2.x.toFixed(1)},${p2.y.toFixed(1)}"
        fill="none" stroke="${volta ? COR.acento : COR.suave}" stroke-width="2"
        stroke-dasharray="${volta ? '6 5' : 'none'}"
        marker-end="url(#${volta ? 'seta-acento' : 'seta-suave'}-${idSufixo})"></path>`,
    );
  });

  const caixas = etapas.map((etapa, i) => {
    const p = pt(ang(i), R);
    const x = Math.min(260, Math.max(60, p.x));
    const estilo =
      'position:absolute;left:' + x.toFixed(1) + 'px;top:' + p.y.toFixed(1) + 'px;transform:translate(-50%,-50%);width:120px;box-sizing:border-box;border-radius:8px;border:1px solid #1F2733;background:#141A24;padding:8px;text-align:center;text-decoration:none;color:#E6EDF3';
    const miolo = html`<span>
      <span aria-hidden="true" style="display:inline-flex;width:22px;height:22px;border-radius:50%;background:#22D3EE;color:#0B0F17;font-family:'JetBrains Mono',ui-monospace,monospace;font-size:12px;font-weight:700;align-items:center;justify-content:center">${i + 1}</span>
      <span style="display:block;margin:4px 0 0;font-size:13px;font-weight:600;line-height:1.3">${etapa.titulo}</span>
      ${etapa.detalhe ? html`<span style="display:block;margin:2px 0 0;font-family:'JetBrains Mono',ui-monospace,monospace;font-size:11px;color:#9AA7B4">${etapa.detalhe}</span>` : ''}
    </span>`;
    return etapa.href
      ? html`<a href="${etapa.href}" style="${estilo}">${miolo}</a>`
      : html`<div style="${estilo}">${miolo}</div>`;
  });

  const alternativa =
    etapas.map((e, i) => i + 1 + ' ' + e.titulo + (e.detalhe ? ' (' + e.detalhe + ')' : '')).join(' → ') + ' → volta a 1.';

  const palco = html`<div class="flex justify-center">
    <div role="img" aria-label="${alternativa}" style="position:relative;width:320px;height:320px;max-width:100%">
      ${desenho}
      ${caixas}
      <p style="position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);margin:0;text-align:center;font-size:12px;color:#22D3EE;max-width:90px;line-height:1.3">${centro ?? retorno}</p>
    </div>
  </div>`;

  // A legenda em texto é o conteúdo; o círculo é o enriquecimento.
  const legenda = criarElemento(
    'ol',
    { class: 'mt-3 space-y-1 text-sm text-texto-suave' },
    etapas.map((etapa, i) =>
      criarElemento('li', {}, [
        criarElemento('span', { class: 'font-mono text-acento' }, [String(i + 1) + ' ']),
        criarElemento('strong', { class: 'text-texto' }, [etapa.titulo]),
        etapa.texto || etapa.detalhe ? ' — ' + (etapa.texto ?? etapa.detalhe) : '',
      ]),
    ),
  );

  return moldura({ titulo, rotulo, conteudo: html`<div>${palco}${legenda}</div>`, nota });
}

// ---------------------------------------------------------------------------
// Grade de 100
// ---------------------------------------------------------------------------

/**
 * 100 quadrados em 10 colunas (gap 3px, no máximo 230px de largura), grupos
 * coloridos na ordem, legenda com o número em mono e a fonte. A grade
 * arredonda: o exato vai sempre na fonte/nota.
 *
 * @param {object} p
 * @param {Array}  p.grupos  [{ rotulo, quantidade, tom|cor }] — soma 100; o resto vira borda
 */
export function criarGradeDe100({ titulo, frase, grupos = [], fonte = null, nota = null }) {
  const celulas = [];
  grupos.forEach((grupo) => {
    const cor = grupo.cor ?? COR_DO_TOM[grupo.tom] ?? COR.primaria;
    for (let i = 0; i < grupo.quantidade; i++) celulas.push(cor);
  });
  while (celulas.length < 100) celulas.push(COR.borda);

  const alternativa = frase + ' ' + grupos.map((g) => g.quantidade + ' — ' + g.rotulo).join('; ');

  const grade = html`<div role="img" aria-label="${alternativa}" style="display:grid;grid-template-columns:repeat(10,1fr);gap:3px;max-width:230px">
    ${celulas.slice(0, 100).map((cor) => html`<span style="aspect-ratio:1;border-radius:3px;background:${cor}"></span>`)}
  </div>`;

  const legenda = html`<figcaption style="margin-top:12px;display:flex;flex-direction:column;gap:4px">
    ${grupos.map(
      (g) => html`<span style="display:flex;align-items:center;gap:8px;font-size:14px;color:#9AA7B4">
        <span aria-hidden="true" style="width:12px;height:12px;border-radius:3px;background:${g.cor ?? COR_DO_TOM[g.tom] ?? COR.primaria};flex:0 0 12px"></span>
        <span style="font-family:'JetBrains Mono',ui-monospace,monospace;color:#E6EDF3;min-width:2ch;text-align:right">${g.quantidade}</span>${g.rotulo}
      </span>`,
    )}
    ${fonte ?? nota ? html`<span style="margin-top:6px;font-size:12px;color:#9AA7B4">${fonte ?? nota}</span>` : ''}
  </figcaption>`;

  return html`<figure class="mt-4 mb-0 rounded-lg border border-borda bg-fundo p-4">
    ${titulo ? html`<p style="${ROTULO_MIUDO}">${titulo}</p>` : ''}
    <p style="margin:${titulo ? '6px' : '0'} 0 12px;font-size:15px;font-weight:600">${frase}</p>
    ${grade}
    ${legenda}
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

/**
 * 2–4 barras, todas na mesma escala (100% = `maximo`, ou o maior valor).
 * Partes: sólido (dinheiro real), tracejado (número no papel), listrado (a
 * parte que interessa). Aceita também o formato antigo { tom, partes:[{fracao,tom}] }.
 *
 * @param {object} p
 * @param {Array}  p.itens  [{ rotulo, valor, exibicao, nota?, estilo?, partes?: [{ rotulo, valor, estilo, cor? }] }]
 */
export function criarBarrasNaMesmaEscala({ titulo, itens = [], barras = null, maximo = null, nota = null, legenda = null, exemploInventado = false, descricao = '', rotulo = 'Relação: proporção' }) {
  const lista = barras ?? itens;
  const teto = maximo ?? Math.max(...lista.map((i) => i.valor));

  const desenhar = (item) => {
    const largura = Math.max(0.5, (item.valor / teto) * 100).toFixed(2);
    let partes = item.partes?.length
      ? item.partes.map((parte) => ({
          rotulo: parte.rotulo ?? '',
          fracao: parte.fracao ?? (parte.valor ?? 0) / (item.valor || 1),
          estilo: parte.estilo ?? (parte.tom === 'suave' ? 'listrado' : 'solido'),
          cor: parte.cor ?? (parte.tom ? COR_DO_TOM[parte.tom] : undefined),
        }))
      : [{ rotulo: '', fracao: 1, estilo: item.estilo ?? 'solido', cor: item.cor ?? (item.tom ? COR_DO_TOM[item.tom] : undefined) }];

    return html`<div>
      <div style="display:flex;justify-content:space-between;align-items:baseline;gap:12px;flex-wrap:wrap">
        <span style="font-size:14px;font-weight:600">${item.rotulo}</span>
        <span style="font-family:'JetBrains Mono',ui-monospace,monospace;font-size:14px;color:#E6EDF3">${item.exibicao}</span>
      </div>
      <div style="margin-top:6px;height:28px;display:flex;width:${largura}%;min-width:4px">
        ${partes.map(
          (parte) => html`<span title="${parte.rotulo}" style="height:100%;width:${(parte.fracao * 100).toFixed(2)}%;box-sizing:border-box;${(ESTILO_DA_PARTE[parte.estilo] ?? ESTILO_DA_PARTE.solido)(parte.cor)}"></span>`,
        )}
      </div>
      ${item.nota ? html`<p style="margin:4px 0 0;font-size:13px;color:#9AA7B4">${item.nota}</p>` : ''}
    </div>`;
  };

  const alternativa =
    descricao ||
    lista
      .map(
        (i) =>
          i.rotulo +
          ' — ' +
          i.exibicao +
          (i.partes?.length ? ' (' + i.partes.map((p) => (p.rotulo ? p.rotulo + ': ' : '') + (p.exibicao ?? '')).join('; ') + ')' : ''),
      )
      .join('; ') +
    (exemploInventado ? '. Exemplo inventado.' : '');

  const usaTracejado = lista.some((i) => i.estilo === 'tracejado' || i.partes?.some((p) => p.estilo === 'tracejado'));
  const usaListrado = lista.some((i) => i.estilo === 'listrado' || i.partes?.some((p) => p.estilo === 'listrado' || p.tom === 'suave'));

  const rodape = html`<figcaption style="margin-top:16px;display:flex;flex-wrap:wrap;align-items:center;gap:16px;font-size:13px;color:#9AA7B4">
    ${usaTracejado ? html`<span style="display:inline-flex;align-items:center;gap:6px"><span aria-hidden="true" style="width:22px;height:12px;border-radius:3px;border:2px dashed #9AA7B4"></span>${legenda?.tracejado ?? 'no papel'}</span>` : ''}
    <span style="display:inline-flex;align-items:center;gap:6px"><span aria-hidden="true" style="width:22px;height:12px;border-radius:3px;background:#7C3AED"></span>${legenda?.solido ?? 'valor medido'}</span>
    ${usaListrado ? html`<span style="display:inline-flex;align-items:center;gap:6px"><span aria-hidden="true" style="width:22px;height:12px;border-radius:3px;background:repeating-linear-gradient(135deg,#22D3EE 0 3px,transparent 3px 6px)"></span>${legenda?.listrado ?? 'a parte que interessa'}</span>` : ''}
    ${exemploInventado ? html`<span style="margin-left:auto;border-radius:999px;border:1px solid rgba(245,158,11,.4);background:rgba(245,158,11,.12);color:#F59E0B;padding:1px 10px;font-size:12px;font-weight:600">exemplo inventado</span>` : ''}
  </figcaption>`;

  return html`<figure class="mt-4 mb-0 rounded-lg border border-borda bg-fundo p-4 sm:p-5">
    ${titulo ? html`<div class="mb-3 flex flex-wrap items-baseline justify-between gap-3"><p class="text-sm font-semibold text-texto" style="margin:0">${titulo}</p><span style="${ROTULO_MIUDO}">${rotulo}</span></div>` : ''}
    <div role="img" aria-label="${alternativa}" style="display:flex;flex-direction:column;gap:16px">${lista.map(desenhar)}</div>
    ${rodape}
    ${nota ? html`<p class="mt-3 text-xs text-texto-suave">${nota}</p>` : ''}
  </figure>`;
}

// ---------------------------------------------------------------------------
// Curva de saída (Módulo 6)
// ---------------------------------------------------------------------------

/**
 * Curva x·y = k: quanto sai da pool antes de o preço cair X%. Controle
 * deslizante, atalhos 10/30/50% e "pool 10×". Se o preço cai d, sai
 * (1 − √(1−d))/2 da liquidez e vende-se 1/√(1−d) − 1 dos tokens da reserva.
 * Os números de referência do módulo (2,57% para −10%, 14,64% para −50%)
 * caem exatamente nessa curva.
 */
export function criarCurvaDeSaida({ liquidez = 8000, titulo = 'Quanto sai antes de o preço cair', nota = null } = {}) {
  const ESQ = 60;
  const LARG = 560;
  const TOPO = 20;
  const ALT = 260;
  let poolGrande = false;

  const emBr = (n, casas) => n.toLocaleString('pt-BR', { minimumFractionDigits: casas, maximumFractionDigits: casas });
  const x = (fracao) => ESQ + fracao * 2 * LARG;
  const y = (preco) => TOPO + (1 - preco) * ALT;

  const pontos = [];
  for (let i = 0; i <= 50; i++) {
    const fracao = i / 100;
    pontos.push(x(fracao).toFixed(1) + ',' + y((1 - 2 * fracao) ** 2).toFixed(1));
  }

  const desenho = html`<svg viewBox="0 0 660 330" width="100%" role="img"
    aria-label="Curva x·y = k: quanto mais dinheiro sai da pool, mais o preço cai. Tirar 2,57% da liquidez derruba o preço 10%; tirar 14,64% derruba pela metade."></svg>`;

  desenho.append(
    svg`<line x1="${ESQ}" y1="${TOPO}" x2="${ESQ}" y2="${TOPO + ALT}" stroke="#1F2733"></line>`,
    svg`<line x1="${ESQ}" y1="${TOPO + ALT}" x2="${ESQ + LARG}" y2="${TOPO + ALT}" stroke="#1F2733"></line>`,
    svg`<line x1="${ESQ}" y1="${y(0.5)}" x2="${ESQ + LARG}" y2="${y(0.5)}" stroke="#1F2733" stroke-dasharray="3 4"></line>`,
    svg`<text x="${ESQ - 10}" y="${TOPO + 5}" text-anchor="end" fill="#9AA7B4" font-size="12">100%</text>`,
    svg`<text x="${ESQ - 10}" y="${y(0.5) + 5}" text-anchor="end" fill="#9AA7B4" font-size="12">50%</text>`,
    svg`<text x="${ESQ - 10}" y="${TOPO + ALT + 5}" text-anchor="end" fill="#9AA7B4" font-size="12">0%</text>`,
    svg`<text x="${ESQ + LARG / 2}" y="324" text-anchor="middle" fill="#9AA7B4" font-size="13">dinheiro que sai da pool (% da liquidez)</text>`,
    ...[0, 0.1, 0.2, 0.3, 0.4, 0.5].map(
      (f) => svg`<text x="${x(f)}" y="${TOPO + ALT + 20}" text-anchor="middle" fill="#9AA7B4" font-size="12">${(f * 100).toFixed(0)}%</text>`,
    ),
    svg`<polyline points="${pontos.join(' ')}" fill="none" stroke="#9AA7B4" stroke-width="2"></polyline>`,
    svg`<circle cx="${x(0.0257)}" cy="${y(0.9)}" r="4" fill="#141A24" stroke="#9AA7B4" stroke-width="1.5"></circle>`,
    svg`<text x="${x(0.0257) + 10}" y="${y(0.9) - 6}" fill="#9AA7B4" font-size="12">2,57% → −10%</text>`,
    svg`<circle cx="${x(0.1464)}" cy="${y(0.5)}" r="4" fill="#141A24" stroke="#9AA7B4" stroke-width="1.5"></circle>`,
    svg`<text x="${x(0.1464) + 10}" y="${y(0.5) - 10}" fill="#9AA7B4" font-size="12">14,64% → −50%</text>`,
  );

  const marcadorV = svg`<line stroke="#22D3EE" stroke-width="1.5" stroke-dasharray="4 4"></line>`;
  const marcadorH = svg`<line stroke="#F87171" stroke-width="1.5" stroke-dasharray="4 4"></line>`;
  const bolinha = svg`<circle r="7" fill="#22D3EE" stroke="#0B0F17" stroke-width="3" class="omh-anim-transicao"></circle>`;
  desenho.append(marcadorV, marcadorH, bolinha);

  const saidaQueda = html`<span style="font-family:'JetBrains Mono',ui-monospace,monospace;font-size:28px;line-height:36px;font-weight:500;color:#F87171"></span>`;
  const saidaTokens = html`<span style="font-family:'JetBrains Mono',ui-monospace,monospace;font-size:28px;line-height:36px;font-weight:500;color:#E6EDF3"></span>`;
  const saidaFatia = html`<span style="font-family:'JetBrains Mono',ui-monospace,monospace;font-size:28px;line-height:36px;font-weight:500;color:#22D3EE"></span>`;
  const saidaDolar = html`<span style="font-size:12px;color:#9AA7B4"></span>`;

  const controle = html`<input type="range" min="1" max="90" step="1" value="10" class="omh-range w-full" aria-label="Queda de preço, em porcentagem">`;

  function atualizar() {
    const queda = Number(controle.value) / 100;
    const sobra = Math.sqrt(1 - queda);
    const fatia = (1 - sobra) / 2;
    const tokens = 1 / sobra - 1;
    const liq = poolGrande ? liquidez * 10 : liquidez;

    saidaQueda.textContent = '−' + emBr(queda * 100, 0) + '%';
    saidaTokens.textContent = emBr(tokens * 100, 2) + '%';
    saidaFatia.textContent = emBr(fatia * 100, 2) + '%';
    // O dólar sai da porcentagem já arredondada, para bater com o texto do módulo
    // (2,57% de US$ 8 mil = US$ 206).
    const fatiaExibida = Number(emBr(fatia * 100, 2).replace(',', '.')) / 100;
    saidaDolar.textContent = 'US$ ' + emBr(fatiaExibida * liq, 0) + ' de US$ ' + emBr(liq, 0);

    marcadorV.setAttribute('x1', x(fatia));
    marcadorV.setAttribute('x2', x(fatia));
    marcadorV.setAttribute('y1', y(1 - queda));
    marcadorV.setAttribute('y2', TOPO + ALT);
    marcadorH.setAttribute('x1', ESQ);
    marcadorH.setAttribute('x2', x(fatia));
    marcadorH.setAttribute('y1', y(1 - queda));
    marcadorH.setAttribute('y2', y(1 - queda));
    bolinha.setAttribute('cx', x(fatia));
    bolinha.setAttribute('cy', y(1 - queda));
    botaoPool.style.borderColor = poolGrande ? COR.primaria : COR.borda;
    botaoPool.style.background = poolGrande ? 'rgba(124,58,237,.15)' : COR.superficie;
    botaoPool.setAttribute('aria-pressed', String(poolGrande));
  }

  const estiloAtalho =
    'min-height:32px;border-radius:8px;border:1px solid #1F2733;background:#141A24;color:#9AA7B4;padding:6px 12px;font-size:14px;font-weight:500;cursor:pointer';
  const atalhos = [10, 30, 50].map((valor) => {
    const botao = html`<button type="button" style="${estiloAtalho}">−${valor}%</button>`;
    botao.addEventListener('click', () => {
      controle.value = String(valor);
      atualizar();
    });
    return botao;
  });
  const botaoPool = html`<button type="button" aria-pressed="false" style="${estiloAtalho}">pool 10× maior</button>`;
  botaoPool.addEventListener('click', () => {
    poolGrande = !poolGrande;
    atualizar();
  });
  controle.addEventListener('input', atualizar);

  const painel = html`<div>
    <div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:12px">
      <span style="font-size:14px;font-weight:600;color:#E6EDF3">Arraste: quanto você aceita derrubar o preço?</span>
      <div style="display:flex;flex-wrap:wrap;gap:8px">${atalhos}${botaoPool}</div>
    </div>
    <div style="margin-top:12px">${controle}</div>
    <dl style="margin:16px 0 0;display:grid;gap:16px;grid-template-columns:repeat(auto-fit,minmax(150px,1fr))">
      <div><dt style="font-size:12px;color:#9AA7B4">O preço cai</dt><dd style="margin:4px 0 0">${saidaQueda}</dd></div>
      <div><dt style="font-size:12px;color:#9AA7B4">Você vende</dt><dd style="margin:4px 0 0">${saidaTokens}<span style="display:block;margin-top:4px;font-size:12px;color:#9AA7B4">dos tokens da reserva</span></dd></div>
      <div><dt style="font-size:12px;color:#9AA7B4">Você recebe</dt><dd style="margin:4px 0 0">${saidaFatia}<span style="display:block;margin-top:4px">${saidaDolar}</span></dd></div>
    </dl>
    <div style="margin-top:16px;overflow-x:auto" tabindex="0">${desenho}</div>
    <p style="margin:8px 0 0;font-size:12px;color:#9AA7B4"><span style="border-radius:999px;border:1px solid rgba(245,158,11,.4);background:rgba(245,158,11,.12);color:#F59E0B;padding:1px 10px;font-weight:600">exemplo inventado</span> a liquidez de US$ ${emBr(liquidez, 0)} é o token inventado da seção; as porcentagens valem para qualquer pool.</p>
  </div>`;

  atualizar();

  return moldura({
    titulo,
    rotulo: 'Relação: sensibilidade',
    conteudo: painel,
    nota: nota ?? 'As porcentagens não dependem do tamanho da pool: numa pool dez vezes maior, mudam só os dólares.',
  });
}
