# fluxo

## Relatório inicial
O trabalho da tarefa `fluxo.md` terminou: os 7 itens estão feitos e conferidos contra o desenho. O teste de fumaça (`fumaca.mjs`) passou em 1280px e em 390px, sem erro, sem exceção e sem nenhum "rola para o lado".

## Arquivos alterados (só os meus)
- `src/components/fluxograma.js`: revisei e completei o que o agente anterior tinha feito.
- `src/components/diagrama.js`: tirei o card de fora da figura.
- `styles/custom.css`: bloco `.omh-fluxo*` inteiro. Saiu o `align-items: stretch !important`.
- `src/data/modulo1.js`, `modulo2.js`, `modulo5.js`, `modulo6.js`, `modulo7.js`, `checklist.js`: só os textos dos diagramas.
- Nenhum arquivo de teste ficou no projeto.

## API dos componentes (para a etapa 2)

**`criarFluxograma(opcoes)`** devolve a `<figure class="omh-fluxo">` pronta, ou `null` se não conseguir ler o texto. A figura é a caixa #0B0F17 (raio 8, padding 20) com a legenda dentro, 13px e centralizada. O `role="img"` e o `aria-label` são gerados dos dados, no formato "Pergunta? Sim: …; depois, …. Não: …".
- Aceita três formas: `{ nos, setas }` direto, `{ diagrama: { nos, setas } }` ou `{ diagrama: 'flowchart TD …' }`. As chamadas antigas continuam funcionando.
- Opções: `legenda`, `titulo` (frase em negrito no topo da caixa) e `rotuloAcessivel`.
- Cada nó: `{ id, tipo: 'pergunta'|'acao'|'bom'|'ruim'|'alerta', texto, suave? }`. `suave` deixa o texto cinza, para a caixa que só explica.
- Cada seta: `{ de, para, rotulo?, tom?, tracejada?, ligacao? }`.
- A cor do rótulo segue o sentido do ramo, nunca o texto. A ordem é: `tom` da seta, depois a classe `ramoBom`/`ramoRuim`/`ramoAlerta` no nó de destino, depois o tipo do nó de destino, e por fim neutro.
- No texto Mermaid dá para usar `class X suave` e a ligação sem ponta `A -.-|rótulo| B` (dois nós lado a lado no topo, como o wash trading).
- Quando o desenho fica largo, a caixa rola e ganha `tabindex="0"`. Testei com um diagrama de 6 colunas.

```js
criarFluxograma({ nos: [{ id:'a', tipo:'acao', texto:'Você percebeu a drenagem' }, { id:'b', tipo:'pergunta', texto:'A frase-semente vazou?' }, …],
  setas: [{ de:'a', para:'b' }, { de:'b', para:'c', rotulo:'Sim', tom:'ruim' }, …], legenda:'…', titulo:'…' })
```

**`criarFluxoLinear(dados)`** devolve um `<div>` com a `<figure>` e, se houver, a caixa ciano de fechamento embaixo.
- Dados: `{ inicio?, passos:[{ pergunta, evidencia?, porque?, onde?, desvio:{rotulo,texto,tom:'nao'|'ajusta'|'alerta'|'neutro'}, segue:{rotulo,texto?,tom?:'bom'|'neutro'} }], fim?, legenda?, fechamento?, titulo?, variante:'espinha'|'trilho', numerar? }`.
- `evidencia` aceita `{ rotulo, tom }` com as chaves de `EVIDENCIAS`.
- Deixei os dados prontos, com os textos exatos do desenho: `checklistPreCompra.fluxograma.{inicio,passos,fim,legenda,fechamento}` e `modulo6.checagemDoContrato`.

```js
criarFluxoLinear({ ...checklistPreCompra.fluxograma })                          // Checklist (desenho 31)
criarFluxoLinear({ variante:'trilho', numerar:false, ...modulo6.checagemDoContrato }) // M6
```

## O que ficou igual ao desenho
- **Checklist (espinha):** caixa de início, perguntas numeradas com marcador ciano de 24px e a etiqueta colorida, as duas colunas "desvio | segue", a caixa verde de 2px no fim, a legenda com as 3 frases e a caixa ciano de fechamento. No celular vira uma coluna.
- **M6 (trilho):** igual ao desenho no desktop e no celular.
- **M1, plano de emergência:** Sim vermelho, Não verde, um único nó final verde, e "?" na pergunta.
- **Acentos e vírgula decimal:** corrigidos em todos os diagramas ("0,95%", "Não opero" etc.).
- **Rótulos inventados que saíram:** os `classDef` com cores fora da paleta foram removidos.
- **M5, slippage:** mesmos textos, rótulos e cores do desenho, com a caixa âmbar embaixo dos ramos.
- **M1, saque:** pílulas "Caminho A/B" e as caixas verde e âmbar.
- **M6, wash trading:** A e B lado a lado, ligados pelo traço âmbar "mesma pessoa".
- **Celular (árvore):** cada ramo empilhado tem borda-esquerda de 2px na cor do rótulo, com a pílula no topo.
- **Nó de volta:** o "↩" virou "⇢" com `aria-hidden`.
- **Todos os 13 diagramas** (os 12 da tarefa mais as 4 fases do M2) saem pelo desenho próprio. O Mermaid por CDN continua em `diagrama.js` só como reserva, e nenhum diagrama chega nele hoje.

## O que não deu, ou ficou diferente, e por quê
- **As views ainda não usam o fluxo linear.** O Checklist continua na árvore gerada do Mermaid, que agora é uma espinha legível, e o M6 continua sem a checagem do contrato. A tarefa proibia mexer nas views; isso fica para a etapa 2.
- **Fundo do nó de ação é #141A24.** A vitrine `00 Componentes` diz #0B0F17, mas todos os módulos do desenho usam #141A24. Segui o uso real.
- **As setas têm ponta, como na vitrine.** Nos módulos do desenho são só linhas.
- **A legenda da árvore está centralizada**, como a tarefa pediu. Nos módulos do desenho ela vem alinhada à esquerda. A do fluxo linear ficou à esquerda, como no desenho 31.
- **Pequenas diferenças de desenho:** a caixa âmbar final do slippage sai em negrito (no desenho não é). No M7, a segunda pergunta desce pelo meio, e não aninhada na coluna "passou" como no desenho. As 4 fases do M2 continuam uma cadeia vertical; no desenho elas são a Sequência clicável, que é outro componente.

## Capturas-chave
Pasta: `C:/Users/dreis/AppData/Local/Temp/claude/C--Users-dreis-Documents-onchain-mastery-hub/c6d85c7e-adeb-4e71-a56b-8b4f28704e46/scratchpad/shots/`
- Desenho × app, emergência: `fx-des-comp-01.png` × `fx-app-m1def-02.png`; no celular, `fx-cel-m1defesa-02.png`.
- Desenho × app, Checklist: `fx-des-ck-01.png` × `fx-lin-01.png`.
- Desenho × app, M6: `fx-des-m6-02.png` × `fx-lin-02.png`.

## Correção 1
All five defects are fixed; for one part of defect 3 (the arrowhead) I kept the current behaviour, reason below. The smoke test comes out clean at 1280 and 390: no exceptions, no console errors, no sideways scroll. The 12 flowcharts all still draw with the app's own renderer, with nothing in the console.

## Defects

**1. Screen-reader text generated from the drawing (medium): fixed.**
- `montarDiagrama` no longer passes the view's `rotuloAcessivel` to `criarFluxograma`, so the generated text is used. The view's text now applies only to the Mermaid fallback. No view was changed.
- Checked in the DOM on all 12. The "Depois, Na CEX…" and "Depois, Pergunte-se:" breaks are gone, and M5 Configurações no longer reads "por exemplo 40%" or "O bot lucra…".

**2. Line height (low): fixed.**
- In the `.omh-fluxo*` block, `line-height: 1.5` is now `1.6` in the 8 rules listed.
- Measured: box lines 22.4px, legend 20.8px, M6 question 44.4px. "Não compro. Isso é mecânica, não opinião." now measures 66.8px (the design is about 67).

**3. Amber note box in the slippage flowchart (low): fixed, except the arrowhead.**
- New `nota` option: Mermaid `class Z nota`, or `nota: true` in the direct format. It gives weight 400 and, on the axis, 520px of text width (`content-box`).
- Measured 554×89.2px, the same as the design (554×89.2). Weight is also settable from the data: `peso: 400|600`, or Mermaid `class X forte`.
- In `src/data/modulo5.js` I added `class Z nota`. "Impacto menor, mas ainda perco" stays amber at 600.
- **Arrowhead kept:** the whole M5 slippage figure in the design has no arrowheads (M5 Desktop 324, 327, 330, 334, 339), not only the arrow into the note. The component reference does put a head on the arrow into the joining node (`00 Componentes` 145-146), and the audit marks arrowheads as matching (`componentes.md:32`). Removing it only here would make it the one headless arrow in the app's figure.

**4. Generated text wording (low): fixed.**
- Sim/Não labels and one-word labels now open with "Se …:" ("Se não, pool funda:", "Se reprovou:"). The node where all branches of a question meet opens with "Em qualquer caso:". A `nota` box is read as a standalone sentence.
- Also fixed:
  - Words like "A", "O" and "É" at the start of a node are lowercased mid-sentence, so "depois, a tese está clara?".
  - A loop back is read in drawing order.
  - Branches without labels after the first open with "Ou,".
- The direct-format test reproduces the design text word for word: "Você percebeu a drenagem. A frase-semente vazou? Se sim: crie carteira nova em dispositivo limpo; depois, mova o que sobrou (cuidado com o sweeper bot). Se não: revogue as aprovações. Em qualquer caso: registre as evidências e reporte."

**5. Red on the link line (low): fixed.** The dashed link line now uses `rgba(239,68,68,.5)` in both the desktop and phone rules.

## Final API (for step 2)

**`montarDiagrama`** (`src/components/diagrama.js`):
```js
montarDiagrama({ diagrama, reserva, rotuloAcessivel /* Mermaid only */, legenda?, titulo? /* new */, mensagemErroSintaxe? })
// e.g. montarDiagrama({ diagrama: d.codigoMermaid, legenda: d.legenda, titulo: d.titulo, reserva })
```

**`criarFluxograma`** (`src/components/fluxograma.js`):
```js
criarFluxograma({ nos, setas, legenda?, titulo? })   // or { diagrama: 'flowchart TD …' | { nos, setas } }
// nos:   [{ id, tipo: 'pergunta'|'acao'|'bom'|'ruim'|'alerta', texto, suave?, nota?, peso?: 400|600 }]
// setas: [{ de, para, rotulo?, tom?: 'bom'|'ruim'|'alerta'|'neutro', tracejada?, ligacao? }]
criarFluxograma({ nos: [{ id:'i', tipo:'acao', texto:'Você percebeu a drenagem' }, { id:'p', tipo:'pergunta', texto:'A frase-semente vazou?' }, { id:'s', tipo:'acao', texto:'Crie carteira nova…' }, { id:'n', tipo:'acao', texto:'Revogue as aprovações' }, { id:'f', tipo:'bom', texto:'Registre as evidências e reporte' }],
  setas: [{ de:'i', para:'p' }, { de:'p', para:'s', rotulo:'Sim' }, { de:'p', para:'n', rotulo:'Não' }, { de:'s', para:'f' }, { de:'n', para:'f' }], legenda: '…' })
```
- Mermaid classes: `nao`, `sim`, `alerta`, `ramoBom`/`ramoRuim`/`ramoAlerta`/`ramoNeutro`, `suave`, and the new `nota` and `forte`.
- It returns a `<figure class="omh-fluxo">` with `role="img"` and the generated `aria-label`, or `null` if it can't read the diagram. The optional `rotuloAcessivel` still replaces the generated text, but avoid it.

**`criarFluxoLinear`** (unchanged):
```js
criarFluxoLinear({ inicio?, passos: [{ pergunta, evidencia?, porque?, onde?, desvio: { rotulo, texto, tom: 'nao'|'ajusta'|'alerta'|'neutro' }, segue: { rotulo, texto?, tom? } }], fim?, legenda?, fechamento?, titulo?, variante?: 'espinha'|'trilho', numerar? })
// e.g. criarFluxoLinear({ inicio: ck.inicio, passos: ck.passos, fim: ck.fim, legenda: ck.legenda, fechamento: ck.fechamento })
//      criarFluxoLinear({ variante: 'trilho', numerar: false, ...modulo6.checagemDoContrato })
```

**Outside my list:** the axis boxes use 420px including padding, while the module designs vary between 320 and 520px of text. I didn't change that.

## Files changed
- `src/components/diagrama.js`
- `src/components/fluxograma.js`
- `styles/custom.css` (`.omh-fluxo*` block only)
- `src/data/modulo5.js` (only the slippage diagram string and its comment)

## Key screenshots
All in `C:/Users/dreis/AppData/Local/Temp/claude/C--Users-dreis-Documents-onchain-mastery-hub/c6d85c7e-adeb-4e71-a56b-8b4f28704e46/scratchpad/fx3/`:
- `m5cfg-1280-01.png` and `m5cfg-390-01.png`: slippage flowchart, compare with `des-m5-1280-01.png` from the design
- `m1def-1280-02.png` and `m1def-390-02.png`: emergency plan
- `ck-1280-01.png` and `ck-390-01.png`: Checklist, Fluxograma tab
- `linear-1280-01.png`: linear flow measured after the line-height change

The smoke-test output is in `fumaca-1280.txt` and `fumaca-390.txt`, in the same folder.

## Defeitos rodada 2
[
 {
  "item": "4 (celular) / 2 (medidas do 00 Componentes › Celular): fio que sai de baixo dos ramos para o nó de junção",
  "desenho": "00 Componentes, variante Celular 390px (linha 165): o fio até o nó final tem margin:8px 0 0 20px. São 8px de folga entre o último ramo e o fio.",
  "app": "Medido no DOM a 390px: a folga entre o último ramo e a .omh-fluxo-seta--juncao é 0,0px nos 6 fluxogramas que têm junção (M1 Defesa emergência, M5 Configurações, M5 Processo, M6 Volume falso, M7 A regra, Checklist). O fio encosta na borda colorida do ramo (captura rev-fluxo-m5cfg-390-01.png). Causa: a regra de 3 classes `.omh-fluxo-arvore > .omh-fluxo-cadeia > .omh-fluxo-seta { margin: 0 0 0 20px }` vence `.omh-fluxo-cadeia > .omh-fluxo-seta--juncao { margin-top: 8px }`, que só tem 2 classes. No desktop a folga é 8,0px e está certa.",
  "gravidade": "baixa",
  "correcao": "No bloco @media (max-width:640px), dar à regra da junção a mesma força e deixá-la depois da outra: `.omh-fluxo-arvore .omh-fluxo-cadeia > .omh-fluxo-seta--juncao { margin-top: 8px; }`.",
  "onde": "styles/custom.css:1191-1201 (bloco do celular)"
 },
 {
  "item": "6. criarFluxoLinear, variante trilho (M6): caixa final verde",
  "desenho": "M6 Desktop.dc.html:463: a caixa final tem max-width:50% sem box-sizing (content-box) e padding 10px 14px. Medido no desenho: 422×66,8px, com a quebra \"…só quer dizer que ele / não mostrou os sinais que dá para ver.\"",
  "app": ".omh-fluxo-fim é border-box e .omh-fluxo-fim--trilho tem max-width:50%. Medido: 392×66,8px, e a quebra muda para \"…só quer dizer / que ele não mostrou…\" (rev-fluxo-m6-des-01.png × rev-fluxo-m6-app-01.png). O resto do trilho está igual: as linhas medem 84,4/106,8/106,8/84,4/106,8 nos dois.",
  "gravidade": "baixa",
  "correcao": "No desktop, `.omh-fluxo-fim--trilho { box-sizing: content-box; }`, como já foi feito na nota do M5. No @media ≤640px, voltar a `box-sizing: border-box` com max-width:none, para não passar da largura.",
  "onde": "styles/custom.css:1044-1056 e 1161-1168"
 },
 {
  "item": "6/2. Alternativa em texto do trilho (numerar:false)",
  "desenho": "M6 Desktop.dc.html:746: o aria-label da checagem numera cada passo mesmo sem marcador visível: \"1. Owner Program começa com Tokenz…? Não: … 2. Token Extensions tem algo além…\". O desenho 31 também numera.",
  "app": "Com numerar:false, descreverFluxoLinear tira a numeração. Medido: \"Owner Program começa com Tokenz…? Não: SPL clássico… Sim: é Token-2022: siga. Token Extensions tem algo além…\", sem \"1.\", \"2.\"…",
  "gravidade": "baixa",
  "correcao": "Na alternativa em texto, sempre prefixar `i + 1 + '. '`. O `numerar` só controla o marcador visível.",
  "onde": "src/components/fluxograma.js:814"
 },
 {
  "item": "7/5. Fluxograma do wash trading (M6 › Volume falso), que o corretor marcou como \"como no desenho\"",
  "desenho": "M6 Desktop.dc.html:248-262: A e B lado a lado, também no celular (a grade 1fr auto 1fr não muda com compacto). \"mesma pessoa\" é texto âmbar 11px/600 embaixo de um tracejado de 56px, não pílula. Dois fios convergem num colchete até a caixa CIANO 600 \"A tela soma volume — como se fossem pessoas diferentes\". O m6.md (linha 96) aponta como defeito B aparecer embaixo de A no celular, \"como se viesse depois dele\".",
  "app": "1280px: \"A tela soma volume\" sai em caixa neutra, peso 400 e texto curto (falta \"— como se fossem pessoas diferentes\"). \"mesma pessoa\" é pílula de 12px com borda e fundo. Não há os fios convergindo: sai uma seta só do meio. 390px: A, a pílula e B ficam um embaixo do outro (rev-fluxo-m6vol-390-01.png), e lê-se como a sequência A → B → A tela soma volume. O desenho celular mantém lado a lado (rev-fluxo-m6vol-des390-01.png). O comentário em modulo6.js diz \"como no desenho\".",
  "gravidade": "media",
  "correcao": "Na string: `T[\"A tela soma volume — como se fossem pessoas diferentes\"]` e `class T pergunta` (o leitor já aceita a classe). No CSS do celular, não empilhar `.omh-fluxo-ramos--partida`: manter o molde de 3 colunas, com o traço na horizontal. Se preferir seguir o m6.md (figura própria na etapa 2), tirar do comentário o \"como no desenho\".",
  "onde": "src/data/modulo6.js:1155-1171; styles/custom.css:1229-1256"
 },
 {
  "item": "7/5. Permit2 em 2 camadas (M1 › Defesa): comentário diz \"textos das caixas como no desenho\"",
  "desenho": "M1 Desktop.dc.html:403-413: \"Approval ERC-20…\" em caixa ROXA (borda rgba(124,58,237,.6), fundo .15) com micro-rótulo 11px \"Camada 1 · você → Permit2\". \"Permit2 guarda…\" em caixa CIANO com \"Camada 2 · Permit2 → cada app\". As duas caixas verdes são 13px/400, com o nome da função em JetBrains Mono verde (\"lockdown\" / \"invalidateNonces\").",
  "app": "As duas camadas saem em caixas neutras, sem micro-rótulo. Os textos \"Camada 1 · você → Permit2\" e \"Camada 2 · Permit2 → cada app\" não estão em src/data. As caixas verdes saem em 14px/600, com \"lockdown:\" em texto comum (rev-fluxo-m1defesa-1280-01.png). O componente não tem tipo roxo nem micro-rótulo. Pelo Mermaid, uma caixa colorida não fica em 400, a não ser com `nota` ou `suave`.",
  "gravidade": "baixa",
  "correcao": "Levar os dois micro-rótulos para src/data. No componente, aceitar tipo 'destaque' (roxo, trio .6/.15) e `rotulo` por nó (micro-rótulo 11px/600). Se isso ficar para a etapa 2, corrigir o comentário da string.",
  "onde": "src/data/modulo1.js:1550-1562; src/components/fluxograma.js (TIPOS, caixa())"
 },
 {
  "item": "7/3. O ciclo de uma operação (M7 › A regra): comentário diz \"Como no desenho (M7 › A regra)\"",
  "desenho": "M7 Desktop.dc.html:120-148 (rev-fluxo-m7regra-des-01.png): \"Escrevo a regra\" e \"Revisão: segui a regra?\" em ROXO. \"Passo o token pelo checklist\" em CIANO. \"O gatilho…?\" fica DENTRO do ramo \"passou\", com os sub-ramos não/sim lado a lado (caixas de 13px). A volta é o texto ciano \"⇢ mudança na regra só aqui, e volta para o começo\".",
  "app": "rev-fluxo-m7regra-1280-01.png: \"Escrevo a regra\" e \"Passo o token…\" saem neutros e \"Revisão\" sai ciano. O ramo \"passou\" mostra só a pílula, e a pergunta desce pelo eixo. A volta é a pílula neutra \"mudança só aqui\" mais a pílula tracejada cinza \"⇢ Escrevo a regra\". O texto do desenho (\"mudança na regra só aqui, e volta para o começo\") não está em src/data.",
  "gravidade": "baixa",
  "correcao": "Na string: `B{\"Passo o token pelo checklist\"}` ou `class B pergunta`, e o rótulo da volta como no desenho. Nó roxo precisa do tipo novo (ver o item do Permit2). O M7 não está na lista de verificação da tarefa: se ficar para a etapa 2, tirar o \"Como no desenho\" do comentário.",
  "onde": "src/data/modulo7.js:715-735"
 },
 {
  "item": "2. Foco só quando largo: caminho de reserva do Mermaid",
  "desenho": "00 Componentes:176: \"Só recebe foco quando é largo e rola: a área de rolagem ganha tabindex=\\\"0\\\"\".",
  "app": "Na reserva do Mermaid, a área [data-diagrama-rolagem] sempre recebe tabindex=\"0\" e role=group (testado: rolTab \"0\" com um diagrama que não rola). Com legenda vazia e sem rotuloAcessivel, o aria-label vira \"undefined (role na horizontal para ver tudo)\". Hoje nenhum dos 12 diagramas cai nesse caminho.",
  "gravidade": "baixa",
  "correcao": "Na reserva, usar o mesmo vigiarRolagem do fluxograma.js (exportado), em vez de tabindex fixo. No aria-label, usar `legenda || rotuloAcessivel || 'Fluxograma'`.",
  "onde": "src/components/diagrama.js:170-178"
 }
]

## Correção 2
**Defeito 7/5 (fluxograma do wash trading, M6 › Volume falso): corrigido.** Segui a primeira opção do revisor e fiz o componente desenhar igual ao desenho do M6, no desktop e no celular.

- **Texto e cor da caixa** (`src/data/modulo6.js`, só a string do diagrama): a caixa agora diz "A tela soma volume — como se fossem pessoas diferentes" e ganhou `class T pergunta`. Sai ciano, em negrito, com até 320px de texto. Medida a 1280px: 354px de largura, igual ao desenho. Troquei também o comentário da string: agora ele descreve o que de fato sai na tela.
- **"mesma pessoa"** (`fluxograma.js`, `ligacaoEntreRaizes`): não é mais pílula. É um tracejado âmbar de 56px com o texto embaixo, 11px, peso 600, âmbar, sem borda nem fundo.
- **Fios que convergem** (`fluxograma.js`, `desenharVariasPartidas` e a nova função `colchete()`): no topo, uma grade `1fr auto 1fr` de até 520px com A e B lado a lado. Embaixo, o colchete de duas metades com o canto de dentro arredondado, depois uma seta de 14px até a caixa ciano. As setas seguintes têm 16px, como no desenho.
- **Celular** (`styles/custom.css`, só o bloco `.omh-fluxo*`): tirei as regras que empilhavam A, pílula e B. Um bloco novo no fim do `@media` (classe `.omh-fluxo-cadeia--partidas`) mantém A e B lado a lado e a coluna do meio centralizada, com setas com ponta, como no desenho a 390px. Os outros fluxogramas continuam empilhando no celular como antes; conferi o do M1 Defesa a 390px.
- A figura não rola para o lado nas duas larguras e não entra no Tab (não fica larga).

**Verificação:** a fumaça (`fumaca.mjs`) saiu limpa a 1280px e a 390px, sem erro, sem exceção e sem "rola para o lado". As saídas estão em `scratchpad/fx-fumaca-1280.txt` e `fx-fumaca-390.txt`.

**Arquivos alterados:** `src/components/fluxograma.js`, `styles/custom.css` (só o bloco `.omh-fluxo*`) e `src/data/modulo6.js` (só a string `codigoMermaid` do wash trading). `diagrama.js` não mudou.

**API para a etapa 2** (nada mudou na forma de chamar):
- **`criarFluxograma`** aceita os nós e setas direto, `{ diagrama: 'texto Mermaid' }` ou `{ diagrama: { nos, setas } }`. Opcionais: `legenda`, `titulo` e `rotuloAcessivel`. Devolve a `<figure>` pronta ou `null` quando não consegue ler o texto.
  ```js
  criarFluxograma({
    nos: [
      { id:'A', tipo:'acao', texto:'Carteira A compra' },
      { id:'B', tipo:'acao', texto:'Carteira B vende' },
      { id:'T', tipo:'pergunta', texto:'A tela soma volume — como se fossem pessoas diferentes' },
      { id:'S', tipo:'ruim', texto:'O grupo vende para eles' },
    ],
    setas: [
      { de:'A', para:'T' }, { de:'B', para:'T' },
      { de:'A', para:'B', rotulo:'mesma pessoa', ligacao:true, tom:'alerta' },
      { de:'T', para:'S' },
    ],
    legenda: 'Duas carteiras da mesma pessoa fabricam o volume que atrai os compradores reais.',
  });
  // ou: criarFluxograma({ diagrama: modulo6.diagramas[0].codigoMermaid, legenda: modulo6.diagramas[0].legenda })
  ```
  Quando há dois ou mais nós sem seta chegando, o componente desenha a figura do wash trading (lado a lado, colchete e coluna do meio), também no celular.
- **`criarFluxoLinear`** recebe `{ inicio?, passos:[{ pergunta, evidencia?, porque?, onde?, desvio:{rotulo,texto,tom:'nao'|'ajusta'|'alerta'|'neutro'}, segue:{rotulo,texto?,tom?} }], fim?, legenda?, fechamento?, titulo?, variante?:'espinha'|'trilho', numerar?, rotuloAcessivel? }` e devolve um `<div>` com a figura e a caixa de fechamento. Exemplo: `criarFluxoLinear({ variante:'trilho', titulo:'Checagem do contrato', passos: modulo6.checagemContrato.passos, fim: modulo6.checagemContrato.fim })`.
- **`montarDiagrama`** em `diagrama.js` continua como estava e usa o desenho próprio primeiro.

**Capturas-chave** (na pasta `scratchpad/shots/`):
- `fx-m6vol-1280-01.png` (app a 1280px), para comparar com `../rv4/rev-fluxo-m6vol-des1280-01.png` (desenho)
- `fx-m6vol-390-01.png` (app a 390px), para comparar com `../rv4/rev-fluxo-m6vol-des390-01.png` (desenho)
