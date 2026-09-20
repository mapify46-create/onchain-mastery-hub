# tempo-tabela

## Relatório inicial
Both components are finished and checked against the design at 1280px and 390px. The smoke test (`fumaca.mjs`) came back clean at both widths: no exceptions, no console errors, no sideways scroll. I only touched my two files. Nothing is committed and `service-worker.js` is unchanged.

## Changed files
- `C:/Users/dreis/Documents/onchain-mastery-hub/src/components/linhaDoTempo.js`
- `C:/Users/dreis/Documents/onchain-mastery-hub/src/components/comparisonTable.js`

The previous agent had done most of the rewrite. In this session I finished and fixed it:
- **Month parsing:** the month-name reader now uses a closed list ("setor 2025" was being read as September). The accent regex is written as `\u0300-\u036f` instead of invisible characters.
- **Font sizes:** text sizes are now in px (`text-[14px]`, `text-[12px]`) instead of `text-sm`/`text-xs`. The Tailwind classes also change line height, and the design uses the app's 1.6.
- **Timeline links:** a marker with `href` now uses the app's link style (cyan, underlined, white on hover).
- **Timeline legend:** `legenda: true` shows the 4 showcase labels. An object shows exactly the tones the view passes.
- **Timeline compatible mode:** the old card now has the design's 16px gaps.
- **Comparison box:** the box itself is now the scroll area (`tabindex="0"`, `role="group"`), as in the design. The cyan focus ring goes around the whole box.
- **Comparison, old format:** you can now pass `decisivo: 'chave'` directly with `{ colunas, linhas }`.
- **Comparison header:** removed the `align-bottom` the design doesn't have.

## API for stage 2

**Timeline.** Returns only the inner box, for use inside a section card:
```js
montarLinhaDoTempo({ marcos, caixa: true, legenda?, nota?, proporcional? = true, pxPorMes? = 1.2 })
// marcos: [{ data, titulo?, texto?, tom?: 'neutro'|'alerta'|'atencao'|'ok', href? }]
montarLinhaDoTempo({ marcos: modulo1.linhaDoTempoRegulacao.marcos, nota: modulo1.linhaDoTempoRegulacao.nota, caixa: true,
  legenda: { neutro: 'marco regulatório', alerta: 'golpe ou alerta', atencao: 'prazo em aberto ou não verificado' } })
```
- Without `caixa`, it keeps the old own-card-with-`<h3>` mode, which the current views still use.
- Scale per module, as in the design: M1 1.2, M3 `pxPorMes: 8`, M2 `pxPorMes: 6.7` (0.22px per day).
- `lerData` and `calcularIntervalo` are also exported.

**Comparison:**
```js
montarComparacaoLadoALado({ criterios:[{chave, rotulo, decisivo?}], opcoes:[{titulo, subtitulo?, valores:{[chave]: 'texto' | {texto, tom}}}],
  frase?, rotulo?, larguraMinima? = 560, orientacao? = 'criterios-nas-linhas' | 'opcoes-nas-linhas', rotuloDasOpcoes?, id? })
montarComparacaoLadoALado({ ...modulo1.tabelaCarteiras, decisivo: 'custodia', larguraMinima: 600 })   // old format
```
- `montarTabelaComparativa` and `adaptarTabelaComparativa` are still exported and work as before.
- The design's minimum widths per use are 540, 560, 600, 640, 680 or 720; pass the right one with `larguraMinima`.
- M5 and M6 need `orientacao: 'opcoes-nas-linhas'` (options in rows, decisive column with a cyan left border).

## What matches the design
- **Timeline marker heights:** 158/115/117/108/78px in the app against 159/114/117/108/78px in the design.
- **Timeline styles:** gap of 24px + 1.2px per month (max 96), pill on the rail with the design's formula for its position, `<time>` in JetBrains Mono 12/600 uppercase .05em cyan, dots with a 2px border, legend, 620px max width, inner box #0B0F17 with radius 8 and padding 20.
- **Keyboard:** Tab reaches a marker's link and the comparison box, both with the cyan 2px ring at offset 2. The box scrolls at 700px.
- **Comparison table:** a real `<table>`, "Critério" header in 12px uppercase, decisive row with a 2px cyan left border, 6% cyan background and "critério decisivo".
- **Toned cells:** radius 6, padding 4px 8px, 600 weight, and red text is always #F87171.
- **Comparison, other details:** 13px closing sentence, and cell padding 10px 12px as in the module designs.
- **Phone:** one card per option with the decisive criterion first (radius 8, padding 12px 14px, 15/600 title).

## What differs on purpose
- **Interval labels follow the data, not the design.** These are the results with the current data:
  - M1: "2023" to 21/05/2024 gets no pill (the design invented July). 13/08/2019 to 2023 reads "cerca de 4 anos depois". 13/08 to 03/09/2026 reads "21 dias depois", not "1 mês".
  - M2: 01/2025 to 06/02/2025 gets no pill. The design's "cerca de 20 dias" has no source in the data, as the M2 audit notes.
  - M3: "10–11/10/2024", "~06/01/2025" and "12–15/05/2025" are shown exactly as written. The launchpad dates "Início de agosto de 2025" and "Fim de 2025" are too vague, so those intervals get no pill.
- **"no mesmo dia" label:** it only appears when two markers share the exact same date. It is not in the design; the phrase exists in `src/data`, but only as marker text. No current data triggers it.
- **Neutral cells follow M1, not the showcase.** They are plain text with no padding. In the showcase they have 4px 8px padding.
- **The phone box is radius 8 with padding 12.** The showcase shows radius 12 with padding 16, but that is the mock phone frame. The M1–M7 phone designs keep the table and don't use cards; I followed the task and the showcase instead.
- **Left for stage 2 (data and views):** tones on the comparison values, the closing sentence, the M1 legend labels, the amber dot for "2026" in M3, and the M3 launchpads using `texto` instead of `titulo`.
- **Mono font weight:** only 400 and 500 of JetBrains Mono are loaded in `index.html`, so the 600 on `<time>` doesn't get a real 600 weight. `index.html` isn't one of my files.

## Key captures
All are in `C:/Users/dreis/AppData/Local/Temp/claude/C--Users-dreis-Documents-onchain-mastery-hub/c6d85c7e-adeb-4e71-a56b-8b4f28704e46/scratchpad/shots/`:
- `ltc2-app-foco-link.png` (timeline, 1280px, link focused) against `ltc2-des-vitrine-01.png` (design)
- `ltc2-app-vitrine-01.png` and `ltc2-app-vitrine-390-01.png` (comparison, 1280 and 390) against `ltc2-des-comp-01.png`
- `ltc2-app-foco-700.png` (box scrolling at 700px with the keyboard focus ring)

## Correção 1
Os três defeitos foram corrigidos, todos em `src/components/linhaDoTempo.js`. Não mexi em `comparisonTable.js`, porque o revisor não achou defeito nele. As chamadas atuais das views continuam iguais. A fumaça passou em 1280 e 390 sem erro, sem exceção e sem "rola para o lado" (`scratchpad/rt3-fumaca-1280.txt` e `rt3-fumaca-390.txt`).

## Defeitos

**1. Caixa sem card próprio (corrigido).** Agora, sem `titulo`, o componente devolve só a caixa interna: `if (caixa || !titulo) return conteudo;`.
- Com a assinatura do README, `montarLinhaDoTempo({ marcos, proporcional: true })`, sai uma `DIV` com fundo `rgb(11,15,23)`, raio 8px, padding 20px e sem `<h3>`. Medi isso a 1280 e a 390.
- O modo antigo, com card e `<h3>`, só aparece quando vem `titulo`. As 4 views atuais (M1 Brasil, M2 Casos, M3 rotação e launchpads) passam `titulo`, então nada mudou nelas. Conferi que os `section[aria-labelledby=…-titulo]` continuam aparecendo e que as pílulas são as mesmas de antes.
- `caixa: true` ficou como alias: força a caixa sozinha mesmo com `titulo`.

**2. Alvo de toque do link (corrigido).** O `<a>` agora é `relative inline-block` e ganhou um `::after` invisível que passa 11px para cima e 11px para baixo do texto (classes `after:absolute after:inset-x-0 after:-top-[11px] after:-bottom-[11px]`).
- A área de toque ficou com 44,4px numa linha e 66,8px quando o título quebra em duas.
- Teste de toque: a 10px acima e a 10px abaixo do texto, o ponto ainda cai no link; a 14px, já não cai.
- O layout não se mexe: as alturas dos marcos são as mesmas de antes.
- O contorno do foco continua justo em volta do texto: 2px `rgb(34,211,238)`, offset 2px, e `:focus-visible` dá verdadeiro com Tab de verdade.

**3. Rótulo "no mesmo dia" (corrigido, com uma escolha diferente da sugerida).** Troquei por "no mesmo mês", em vez de tirar a pílula. Foi o que o próprio desenho faz: em `M2 Desktop.dc.html` (linhas 415 e 578), quando passaram zero dia, o rótulo é `if (dias <= 0) intervalo = 'no mesmo mês'`. Agora `calcularIntervalo('13/08/2019','13/08/2019')` devolve `{ dias: 0, rotulo: 'no mesmo mês' }`. O texto "no mesmo dia" até aparece no desenho, mas só em frases de conteúdo, nunca numa pílula. Hoje nenhum dado cai nesse caso.

## API final (para a etapa 2)

**LinhaDoTempo** (`src/components/linhaDoTempo.js`)
```js
montarLinhaDoTempo({ marcos, proporcional?, pxPorMes?, legenda?, nota?, caixa?, id?, titulo?, descricao? })
// marcos: [{ data, titulo?, texto?, tom?: 'neutro'|'alerta'|'atencao'|'ok', href? }]
// data como está no dado: '13/08/2019', '10–11/10/2024', '~06/01/2025', '07/2026', 'ago/2025', '2023'

// Jeito do desenho: devolve só a caixa, para ir dentro do card da seção
card.append(montarLinhaDoTempo({ marcos: modulo1.linhaDoTempoRegulacao.marcos, proporcional: true }));
// Com legenda e ritmo próprio (M2 usa pxPorMes: 6.7; M3, 8)
montarLinhaDoTempo({ marcos, legenda: { neutro: 'marco regulatório', alerta: 'golpe', atencao: 'não verificado' }, pxPorMes: 6.7 });
// Modo antigo (o das views atuais): com titulo, devolve um card com <h3>
montarLinhaDoTempo({ id: 'm1-cronologia', titulo, descricao, marcos });
```
Também exporta `lerData(texto)` e `calcularIntervalo(a, b)`.

**ComparacaoLadoALado** (`src/components/comparisonTable.js`, sem mudança nesta rodada)
```js
montarComparacaoLadoALado({
  criterios: [{ chave: 'chave', rotulo: 'Quem guarda a chave', decisivo: true }, { chave: 'risco', rotulo: 'Risco principal' }],
  opcoes: [{ titulo: 'CEX', subtitulo: 'corretora', valores: { chave: { texto: 'A empresa', tom: 'alerta' }, risco: 'Contraparte…' } }],
  frase: 'Se as chaves não são suas, as moedas não são suas.',
  // opcionais: rotulo, larguraMinima = 560, orientacao: 'opcoes-nas-linhas', rotuloDasOpcoes, id
});
// Formato antigo pelo adaptador:
montarComparacaoLadoALado({ ...modulo1.tabelaCarteiras, decisivo: 'custodia' });
```
O export antigo `montarTabelaComparativa({ colunas, linhas })` continua funcionando.

## Capturas-chave
As capturas ficam em `C:/Users/dreis/AppData/Local/Temp/claude/C--Users-dreis-Documents-onchain-mastery-hub/c6d85c7e-adeb-4e71-a56b-8b4f28704e46/scratchpad/shots/`:
- `rt3-novo-1280-01.png`: a API nova (só a caixa, dentro de um card), com um link de título, um link de texto e, embaixo, o modo antigo para comparar.
- `rt3-novo-390-01.png`: a mesma coisa a 390px.
- `rt3-foco-390.png`: o foco pelo teclado no link, com o contorno ciano justo no texto.
- `rt3-m2-390-01.png`: a view atual do M2, sem mudança.

## Defeitos rodada 2
[
 {
  "item": "2. ComparacaoLadoALado: export antigo montarTabelaComparativa (alvo de toque)",
  "onde": "src/components/comparisonTable.js:340-361 (criarCardDeLinha, <summary> 'Ver mais'); aparece hoje em #/modulo-1 aba Carteiras, M3, M5, M6 e M7",
  "desenho": "README do handoff: 'Alvo de toque mínimo 44px em todo botão, link de navegação e opção clicável'.",
  "app": "O <summary> 'Ver mais' do componente antigo mede 20px de altura (getBoundingClientRect, 390px e 1280px, 3 de 3 em #/modulo-1 Carteiras). O foco está certo (2px #22D3EE, offset 2). O componente é legado: mantido só para as views atuais e sai quando elas migrarem para montarComparacaoLadoALado.",
  "gravidade": "baixa",
  "correcao": "Se o antigo continuar na tela até a etapa 2: dar min-h-11 (44px) ao <summary> com items-center, sem mudar o resto. Ou deixar como está e registrar que o problema some quando as 5 views migrarem."
 },
 {
  "item": "1. LinhaDoTempo: exemplo de legenda na API entregue para a etapa 2",
  "onde": "Resposta do corretor, bloco 'API final (para a etapa 2)': montarLinhaDoTempo({ marcos, legenda: { neutro: 'marco regulatório', alerta: 'golpe', atencao: 'não verificado' }, pxPorMes: 6.7 })",
  "desenho": "A legenda do M1 Desktop (linha 520) diz 'marco regulatório', 'golpe ou alerta' e 'prazo em aberto ou não verificado'. A do M2 não tem legenda, e 6.7 px/mês é o ritmo do M2.",
  "app": "O código está certo: a legenda aceita qualquer objeto. Mas o exemplo que vai para a etapa 2 mistura os rótulos do M1 com o ritmo do M2 e encurta os rótulos para 'golpe' e 'não verificado', que não estão no desenho nem em src/data. Se a etapa 2 copiar o exemplo, entram rótulos inventados.",
  "gravidade": "baixa",
  "correcao": "Corrigir o exemplo da API para os rótulos exatos do M1 ('golpe ou alerta', 'prazo em aberto ou não verificado') com o pxPorMes padrão (1.2), e avisar que esses rótulos são dado e vão para src/data/modulo1.js (linhaDoTempoRegulacao.legenda)."
 }
]

## Correção 2
(nenhuma)
