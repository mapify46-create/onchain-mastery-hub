// animacoes/narrativa.js — Animação 5 · Vida de uma narrativa (Módulo 3, aba "Narrativas").
//
// Desenho: pesquisa/design/handoff/designs/Animacao 5 - Vida de uma narrativa.dc.html.
// Fonte dos números: src/data/modulo3.js › praticaNarrativas (o-que-e, onde-nasce,
// ciclo, narrativa-e-preco) e a tabela da rotação. As barras são de ATENÇÃO, não de
// preço: o arquivo não publica série de preço, e a animação não desenha nenhuma.
//
// Este arquivo só diz o que muda de uma cena para outra: as cenas (legenda, alt
// e o estado de cada elemento), o palco e a miniatura do modo "cenas paradas".
// A moldura, os botões, a barra de cenas, o teclado e "Ler como texto" são do
// motor (motor.js).
//
// O palco é UMA COLUNA, como no desenho:
//   1. chip da fase à esquerda e o "onde" à direita;
//   2. figura de largura total com as 4 barras de atenção e a legenda fixa;
//   3. caixa dos tokens, em largura total;
//   4. grade de duas colunas: a nota da fase e, quando a cena pede, a figura
//      "na mesma escala" (cena 7) ou a caixa ciano "o que fazer" (cena 8).

import { html } from '../../ui.js';
import { criarAnimacao, criarNota, MONO, ROTULO_MIUDO } from './motor.js';

export function criarAnimacaoNarrativa() {
  // As seis fases do ciclo: borda (b), fundo (f), cor do texto (c) e o rótulo (t).
  const FASE = {
    nasce: { b: 'rgba(34,211,238,.5)', f: 'rgba(34,211,238,.1)', c: '#22D3EE', t: 'Nasce' },
    cresce: { b: 'rgba(124,58,237,.6)', f: 'rgba(124,58,237,.15)', c: '#E6EDF3', t: 'Cresce' },
    pico: { b: 'rgba(245,158,11,.4)', f: 'rgba(245,158,11,.12)', c: '#F59E0B', t: 'Pico e rotação' },
    satura: { b: 'rgba(239,68,68,.5)', f: 'rgba(239,68,68,.12)', c: '#F87171', t: 'Saturação' },
    limite: { b: 'rgba(245,158,11,.4)', f: 'rgba(245,158,11,.12)', c: '#F59E0B', t: 'O limite' },
    fazer: { b: 'rgba(34,197,94,.5)', f: 'rgba(34,197,94,.12)', c: '#22C55E', t: 'O que fazer' },
  };

  // Os quatro jeitos de um token aparecer na caixa: o primeiro do tema, uma
  // cópia da esteira, um que já morreu e um de outro tema (o que entra).
  const TOK = {
    primeiro: { borda: 'rgba(124,58,237,.6)', fundo: 'rgba(124,58,237,.15)', cor: '#E6EDF3', peso: 600 },
    copia: { borda: '#1F2733', fundo: '#141A24', cor: '#9AA7B4', peso: 400 },
    morto: { borda: 'rgba(239,68,68,.5)', fundo: 'rgba(239,68,68,.12)', cor: '#F87171', peso: 400 },
    novo: { borda: 'rgba(34,211,238,.5)', fundo: 'rgba(34,211,238,.1)', cor: '#22D3EE', peso: 600 },
  };
  const tk = (tipo, rotulo) => Object.assign({ rotulo }, TOK[tipo]);

  // Por onde a atenção passa, sempre na mesma ordem.
  const CANAIS = ['fora de cripto', 'X / Twitter', 'grupos', 'listas de "em alta"'];
  const CZ = '#1F2733'; // apagado
  const CI = '#22D3EE'; // ciano
  const CR = '#7C3AED'; // roxo
  const CA = '#F59E0B'; // âmbar
  const CV = '#EF4444'; // vermelho
  const cn = (alturas, cores) => CANAIS.map((rotulo, i) => ({ rotulo, altura: alturas[i], cor: cores[i] }));

  // As oito cenas, na ordem do desenho.
  const C = [
    { fase: 'nasce', onde: 'A narrativa quase sempre nasce fora da blockchain', canais: cn([62, 10, 6, 4], [CI, CZ, CZ, CZ]), tokensRotulo: 'Tokens do tema', tokensNota: 'nenhum ainda', tokens: [], notaTitulo: 'Onde nasce', nota: 'Um post no X ou no Truth Social, uma notícia, um vídeo viral. Primeiro vem o evento; o token vem depois.', notaTom: 'neutro', legenda: 'A narrativa nasce fora da blockchain: post, notícia, vídeo.', alt: 'Só o canal "fora de cripto" está aceso. Nenhum token do tema existe ainda.' },
    { fase: 'nasce', onde: '23,5% dos tokens do pump.fun nascem depois de um post', canais: cn([70, 34, 10, 6], [CI, CR, CZ, CZ]), tokensRotulo: 'O primeiro token', tokensNota: 'um só', tokens: [tk('primeiro', 'JENNER')], notaTitulo: 'O primeiro token chama atenção', nota: 'Num estudo dos 15,2 milhões de tokens criados em dois anos, 3,5 milhões surgiram logo depois de um post. 31 desses posts renderam pelo menos US$ 1 milhão a quem criou o token.', notaTom: 'neutro', legenda: 'Um primeiro token aparece e chama atenção para o tema.', alt: 'O canal fora de cripto e o X estão acesos. O primeiro token do arquivo, JENNER, aparece sozinho.' },
    { fase: 'cresce', onde: 'A esteira: 1,5 milhão de tokens copiam outro', canais: cn([66, 58, 32, 14], [CI, CR, CR, CZ]), tokensRotulo: 'A esteira', tokensNota: '+ cópias do tema', tokens: [tk('primeiro', 'JENNER'), tk('copia', 'MOTHER'), tk('copia', 'DADDY')], notaTitulo: 'A esteira', nota: 'Tokens parecidos aparecem em seguida. Mais de 10% de tudo o que se cria copia nome, símbolo, descrição e imagem de outro — e entre as cópias, 0,86% graduam, contra 9,2% dos originais.', notaTom: 'neutro', legenda: 'A esteira: tokens parecidos aparecem em seguida.', alt: 'Três tokens do tema das celebridades: JENNER, MOTHER e DADDY. Os grupos começam a acender.' },
    { fase: 'cresce', onde: 'Listagem numa corretora grande e figura pública na conversa', canais: cn([58, 78, 70, 54], [CI, CR, CR, CA]), tokensRotulo: 'O tema se espalha', tokensNota: 'outro tema, mesmo desenho', tokens: [tk('primeiro', 'MOODENG'), tk('copia', 'PNUT'), tk('copia', 'GOAT'), tk('copia', 'agentes de IA')], notaTitulo: 'A atenção se espalha', nota: 'O PNUT foi listado na Binance em 11/11/2024, com Elon Musk usando o esquilo no X. Mais de 56% das contas que espalhavam convites para grupos eram bots ou foram suspensas.', notaTom: 'atencao', legenda: 'A atenção cresce e passa por todos os canais.', alt: 'Todos os canais acesos, com as listas de em alta subindo. Aparecem MOODENG, PNUT, GOAT e os agentes de IA.' },
    { fase: 'pico', onde: 'A imprensa fora de cripto chega no topo, ou depois', canais: cn([76, 84, 66, 80], [CI, CR, CR, CA]), tokensRotulo: 'O tema seguinte já começou', tokensNota: 'rotação', tokens: [tk('copia', 'GOAT'), tk('copia', 'agentes de IA'), tk('novo', 'TRUMP')], notaTitulo: 'Rotação', nota: 'O valor somado do tema para de subir e a atenção migra para outra narrativa. Nos casos com data, como PNUT e LIBRA, a cobertura da imprensa geral veio no topo.', notaTom: 'atencao', legenda: 'Rotação: a atenção migra para a próxima narrativa.', alt: 'As barras estão altas e a atenção começa a migrar: entra o TRUMP, de outro tema, enquanto GOAT e os agentes de IA perdem espaço.' },
    { fase: 'satura', onde: 'Continuam nascendo tokens do tema, e o valor dele já cai', canais: cn([22, 30, 18, 12], [CZ, CV, CZ, CZ]), tokensRotulo: 'O que sobrou do tema', tokensNota: 'ruído', tokens: [tk('morto', 'JENNER'), tk('morto', 'MOTHER'), tk('morto', 'DADDY'), tk('copia', '+ cópias')], notaTitulo: 'Saturação e fim', nota: 'Dos 30 tokens de celebridades lançados na Solana a partir de maio de 2024, a queda média foi de 94% em cerca de um mês. Sobra ruído, e o interesse some.', notaTom: 'alerta', legenda: 'Saturação: sobra ruído e o interesse some.', alt: 'As barras de atenção caem. Os tokens do tema aparecem marcados como perdidos, com mais cópias no fim.' },
    { fase: 'limite', onde: 'O ponto que mais se perde na prática', canais: cn([40, 52, 36, 30], [CZ, CR, CZ, CZ]), tokensRotulo: 'Reconhecer o tema', tokensNota: 'não diz qual token, nem quando', tokens: [tk('copia', 'tema identificado'), tk('copia', 'fase identificada')], notaTitulo: 'O limite', nota: 'Reconhecer a narrativa não prevê o preço sozinho. No melhor caso, o sinal social rende de 1% a 3%, e só por poucos minutos — enquanto entrar e sair de uma memecoin custa de 3 a 6 pontos.', notaTom: 'alerta', mostraCusto: true, legenda: 'Reconhecer a narrativa não prevê o preço sozinho.', alt: 'Na mesma escala, o sinal social de 1% a 3% contra o custo de entrar e sair, de 3 a 6 pontos: o custo come o sinal.' },
    { fase: 'fazer', onde: 'O que dá para fazer com isso', canais: cn([44, 56, 40, 34], [CI, CR, CR, CA]), tokensRotulo: 'A rotina de estudo', tokensNota: 'treinar o olho', tokens: [tk('novo', 'anotar a fase'), tk('copia', 'conferir depois')], notaTitulo: 'Medir atenção, não adivinhar preço', nota: 'A narrativa explica de onde vem a atenção. O que fazer com ela depende do pilar técnico e da sua regra escrita — não desta animação.', notaTom: 'ok', fazer: ['Anote no diário: data, tema, primeiro token e a fase que você acha que é.', 'Depois de algumas semanas, confira quantas vezes a sua leitura de fase acertou.', 'Se um token chamar sua atenção, ele passa pelo Checklist antes de qualquer coisa.'], legenda: 'Sirva-se disso para medir atenção, não para adivinhar preço.', alt: 'A rotina: anotar a fase no diário, conferir o acerto depois de semanas, e passar todo token pelo checklist antes de agir.' },
  ];

  // Uma barra da figura "na mesma escala": rótulo, valor em mono e o traço.
  // `preenchimento` é a cor (ou a listra) e `largura` a fatia da mesma escala.
  function criarBarraDaEscala(rotulo, valor, largura, preenchimento) {
    return html`<div>
      <div style="display:flex;justify-content:space-between;gap:8px;align-items:baseline"><span style="font-size:13px">${rotulo}</span><span style="${MONO};font-size:13px">${valor}</span></div>
      <div style="margin-top:4px;height:16px;background:#0B0F17;border:1px solid #1F2733;border-radius:4px;overflow:hidden"><div style="height:100%;width:${largura};background:${preenchimento}"></div></div>
    </div>`;
  }

  function criarPalco() {
    // 1. O topo: o chip da fase e, do outro lado, onde aquilo acontece.
    const faseChip = html`<span class="omh-anim-transicao" style="border-radius:999px;border:1px solid #1F2733;padding:2px 12px;font-size:12px;font-weight:600"></span>`;
    const onde = html`<span style="font-size:12px;color:#9AA7B4"></span>`;
    const linhaDaFase = html`<div style="display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap;align-items:center">${faseChip}${onde}</div>`;

    // 2. As quatro barras de atenção, em largura total. Cada canal ocupa a mesma
    //    fatia (flex:1) e a barra cresce de baixo para cima.
    const canais = CANAIS.map((rotulo) => {
      const barra = html`<div class="omh-anim-transicao" style="width:100%;border-radius:4px 4px 0 0"></div>`;
      const el = html`<div style="flex:1 1 0;min-width:0;display:flex;flex-direction:column;justify-content:flex-end;height:100%;gap:4px;align-items:center">${barra}<span style="font-size:11px;color:#9AA7B4;text-align:center;line-height:1.2">${rotulo}</span></div>`;
      return { el, barra };
    });
    const figuraCanais = html`<figure style="margin:0">
      <p style="${ROTULO_MIUDO};margin-bottom:8px">Atenção, por onde ela passa</p>
      <div style="display:flex;align-items:flex-end;gap:10px;height:110px">${canais.map((c) => c.el)}</div>
      <figcaption style="margin-top:8px;font-size:12px;color:#9AA7B4">Barras de atenção, não de preço. Altura relativa, para mostrar a ordem em que os canais acendem.</figcaption>
    </figure>`;

    // 3. A caixa dos tokens do tema, também em largura total.
    const tokensRotulo = html`<p style="${ROTULO_MIUDO}"></p>`;
    const tokensNota = html`<span style="${MONO};font-size:12px;color:#9AA7B4"></span>`;
    const tokensLista = html`<div style="margin-top:8px;display:flex;flex-wrap:wrap;gap:6px;min-height:34px;align-items:center"></div>`;
    const caixaTokens = html`<div style="border-radius:8px;border:1px solid #1F2733;background:#10151E;padding:12px">
      <div style="display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap;align-items:baseline">${tokensRotulo}${tokensNota}</div>
      ${tokensLista}
    </div>`;

    // 4a. A nota da fase (o card muda de cor com o tom da cena).
    const nota = criarNota();

    // 4b. Cena 7: sinal social × custo de entrar e sair, na mesma escala.
    //     O teto da escala são os 6 pontos do custo; o sinal, no melhor caso,
    //     são 3 pontos — metade. Fonte: modulo3.js › narrativa-e-preco.
    const figuraCusto = html`<figure hidden style="margin:0;border-radius:8px;border:1px solid #1F2733;background:#141A24;padding:12px 14px">
      <p style="${ROTULO_MIUDO};margin-bottom:8px">Na mesma escala, em pontos percentuais</p>
      <div role="img" aria-label="O sinal social rende de 1% a 3%, e só por poucos minutos. Entrar e sair de uma memecoin custa de 3 a 6 pontos." style="display:flex;flex-direction:column;gap:10px">
        ${criarBarraDaEscala('O sinal social, no melhor caso', '1% a 3%', '50%', 'repeating-linear-gradient(135deg,#22D3EE 0 3px,transparent 3px 6px)')}
        ${criarBarraDaEscala('Entrar e sair (Módulo 5)', '3 a 6 pontos', '100%', '#EF4444')}
      </div>
      <figcaption style="margin-top:8px;font-size:12px;color:#9AA7B4">O custo come o sinal antes de ele virar lucro.</figcaption>
    </figure>`;

    // 4c. Cena 8: a caixa ciano com a rotina de estudo.
    const listaFazer = html`<ul style="list-style:disc;margin:8px 0 0;padding-left:18px;font-size:14px;display:flex;flex-direction:column;gap:6px"></ul>`;
    const caixaFazer = html`<div hidden style="border-radius:8px;border:1px solid #22D3EE;background:rgba(34,211,238,.1);padding:12px 14px">
      <p style="${ROTULO_MIUDO};color:#22D3EE">Medir atenção, não adivinhar preço</p>
      ${listaFazer}
    </div>`;

    // As duas colunas de apoio viram uma só quando não cabem (CSS, sem medir a janela).
    const apoio = html`<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(260px,100%),1fr));gap:16px">${nota.el}${figuraCusto}${caixaFazer}</div>`;

    const el = html`<div style="display:flex;flex-direction:column;gap:16px"></div>`;
    el.append(linhaDaFase, figuraCanais, caixaTokens, apoio);

    return {
      el,
      aplicar(c) {
        const f = FASE[c.fase];
        faseChip.textContent = f.t;
        faseChip.style.borderColor = f.b;
        faseChip.style.background = f.f;
        faseChip.style.color = f.c;
        onde.textContent = c.onde;

        c.canais.forEach((canal, i) => {
          canais[i].barra.style.height = canal.altura + '%';
          canais[i].barra.style.background = canal.cor;
        });

        tokensRotulo.textContent = c.tokensRotulo;
        tokensNota.textContent = c.tokensNota;
        tokensLista.replaceChildren(
          ...(c.tokens.length
            ? c.tokens.map((t) => html`<span style="border-radius:999px;border:1px solid ${t.borda};background:${t.fundo};color:${t.cor};padding:4px 12px;font-size:13px;font-weight:${t.peso}">${t.rotulo}</span>`)
            : [html`<span style="font-size:13px;color:#9AA7B4">Nenhum token ainda: a narrativa nasce antes dele.</span>`]),
        );

        nota.aplicar(c.notaTitulo, c.nota, c.notaTom);
        figuraCusto.hidden = !c.mostraCusto;
        caixaFazer.hidden = !c.fazer;
        if (c.fazer) listaFazer.replaceChildren(...c.fazer.map((item) => html`<li>${item}</li>`));
      },
    };
  }

  // A miniatura do modo "cenas paradas": o chip da fase ao lado de "cena N",
  // as quatro barrinhas e os chips dos tokens. O motor põe o número e a legenda.
  function criarMiniatura(cena) {
    const f = FASE[cena.fase];
    const canto = html`<span style="border-radius:999px;border:1px solid ${f.b};background:${f.f};color:${f.c};padding:0 8px;font-size:11px;font-weight:600">${f.t}</span>`;
    const desenho = html`<div style="display:flex;flex-direction:column;gap:8px">
      <div style="display:flex;align-items:flex-end;gap:5px;height:52px">${cena.canais.map((k) => html`<div style="flex:1 1 0;height:${k.altura}%;border-radius:3px 3px 0 0;background:${k.cor}"></div>`)}</div>
      <div style="display:flex;flex-wrap:wrap;gap:4px">${cena.tokens.map((t) => html`<span style="border-radius:999px;border:1px solid ${t.borda};background:${t.fundo};color:${t.cor};padding:1px 8px;font-size:11px">${t.rotulo}</span>`)}</div>
    </div>`;
    return { desenho, canto };
  }

  return criarAnimacao({
    // Título e sobrancelha do desenho: "Animação 5 · Módulo 3 · 36 s".
    titulo: 'Vida de uma narrativa',
    numero: 5,
    modulo: 3,
    cenas: C,
    criarPalco,
    criarMiniatura,
    duracaoPorCena: 4500,
    duracaoTransicao: 450,
    // O parágrafo de fonte do desenho (texto literal do .dc.html).
    descricao:
      'Oito cenas. Fonte: modulo3.js › praticaNarrativas (o-que-e, onde-nasce, ciclo, narrativa-e-preco) e a tabela da rotação. Não há curva de preço aqui: o que sobe e desce nas barras é atenção, e os exemplos são os casos que já estão no arquivo.',
  });
}
