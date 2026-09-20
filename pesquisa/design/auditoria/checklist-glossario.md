# Área checklist-glossario

Desenhos: `31 Checklist.dc.html`, `31 Checklist Celular.dc.html`, `32 Glossario.dc.html`, `32 Glossario Celular.dc.html`.
App: `#/checklist` e `#/glossario`.
Capturas em `scratchpad/shots/ckgl-*` (desenho = `ckgl-desenho-*`, app = `ckgl-app-*`). Os testes que gravam estado no app (marcar item, marcar termo) rodaram na origem `http://127.0.0.1:8084`, para não mexer no localStorage de `localhost` que os outros revisores usam; o estado foi apagado no fim.

Observação de ambiente: no fim da auditoria o Chrome headless da porta 9555 parou de responder (`ECONNREFUSED`). Não fui eu que o parei. As medidas finais de altura (campo de busca, chips) foram calculadas pelas classes Tailwind, e isso está indicado no texto.

---

# Checklist antes de comprar (`#/checklist`)

## Resumo
O app tem o mesmo conteúdo do desenho (todos os textos dos itens, os destaques e os sinais de fora vêm de `src/data/checklist.js`), mas a estrutura é outra. O desenho é **uma página só**: cabeçalho → destaques → fluxograma → etiquetas com contagem → como usar → blocos em abas → sinais de fora. O app divide tudo em **3 abas** que o desenho não tem ("Checar um token · Fluxograma · De onde vem cada item"). O que mais pesa é o **fluxograma**. No desenho ele é uma espinha numerada de 6 perguntas, com etiqueta de evidência e as saídas "desvio | segue" lado a lado. No app ele é uma árvore gerada do código Mermaid, que desce em escada para a direita, espreme o texto numa palavra por linha e deixa caixas sobrepostas. Também não aparecem a pergunta 6, as etiquetas, os números nem a caixa final "Passar por tudo…". Pesam também três ausências: a contagem "8/4/3/8 de 23" e o "peso" de cada etiqueta; a fonte de cada item na lista principal; e a apresentação dos blocos em abas.

## Diferenças, na ordem do desenho

- **[DIFERENTE] Cabeçalho**. Desenho: micro-rótulo "ROTINA, A CADA TOKEN" (12px, 600, maiúsculas, `#9AA7B4`), depois o h1 "Checklist antes de comprar" (30px/600) e o subtítulo. App: h1 e subtítulo iguais (`src/views/checklist.js:255` → `criarTitulo`, `src/ui.js:192-197`), sem o micro-rótulo, e logo abaixo aparece a barra de 3 abas (`src/views/checklist.js:257-271`), que o desenho não tem. Fazer: acrescentar o micro-rótulo (texto novo em `src/data/checklist.js`) e tirar as abas (ver "A mais no app").

- **[DIFERENTE] Destaques**. Desenho: o primeiro destaque ("O endereço") sozinho numa linha, em meia largura, seguido dos outros dois ("81,9%" em tom alerta e "3") lado a lado (`destaquePrincipal` + `destaquesNumeros`, dois `Destaques`). App: os 3 numa linha de 3 colunas (`src/views/checklist.js:119` → `montarDestaques(dados.destaques)`). Os valores e as notas são iguais (`src/data/checklist.js:53-76`). Fazer: chamar `montarDestaques([d[0]])` e depois `montarDestaques(d.slice(1))`. O componente já põe 1 cartão em grade de 2 colunas.

- **[DIFERENTE — o mais grave] Fluxograma "Do token visto à decisão de entrar"**
  - Desenho: fica na própria página, num card `#141A24` com h2, rótulo "RELAÇÃO: SE ISTO, ENTÃO AQUILO" e ideia central em negrito com borda-esquerda ciano de 2px ("O checklist em forma de caminho…"). Dentro de uma caixa `#0B0F17` vêm:
    - "Vi um token" → 6 perguntas **numeradas** (marcador ciano 24px), cada uma com a **etiqueta de evidência** embaixo, colorida: FATO DO PROTOCOLO em ciano, SINAL MEDIDO — PEDE JULGAMENTO em verde, ROTINA em `#9AA7B4`;
    - abaixo de cada pergunta, 2 colunas: à esquerda o desvio (rótulo vermelho "Não bate"/"Sim"/"Não" e caixa vermelha "Não compro…" nas perguntas 1–4; rótulo e caixa âmbar "Ajusto o tamanho e a saída, e volto a esta pergunta." / "Registro primeiro. O diário existe…" nas perguntas 5–6); à direita "segue" (rótulo verde "Bate"/"Não"/"Sim" e caixa neutra com a explicação, por exemplo "Nome e ticker não identificam nada. Sigo para o contrato.");
    - no fim, seta verde e a caixa de borda verde de 2px "Registro no diário e só então entro";
    - figcaption com 3 frases, a terceira sendo "As duas primeiras perguntas são mecânica do protocolo…";
    - por último, a caixa ciano (borda 2px) "Passar por tudo não aprova o token: só quer dizer que ele não mostrou os sinais que dá para ver."
  - App: fica numa aba separada (`src/views/checklist.js:139-166`), com o intro como parágrafo comum sem borda (`:149`, `criarIntroducao`). O desenho sai de `montarDiagrama` → `criarFluxograma` (`src/components/diagrama.js:122-133`, `src/components/fluxograma.js:154-249`), que lê `codigoMermaid` (`src/data/checklist.js:369-387`) e monta uma **árvore aninhada**: cada "Sim/Não" abre um ramo dentro da coluna da direita. Com 5 níveis, a última coluna fica com uns 80px e o texto quebra palavra por palavra ("Tese, / catálise / e / invalidação…"). A referência tracejada "↩ Valor que posso perder…" cai por cima de "Não compro: sem isso é aposta" (captura `ckgl-app-check-fluxo-01.png`). Faltam os números, as etiquetas por pergunta, as caixas "segue", a **pergunta 6** (diário) e a caixa ciano final (a frase só aparece dentro do item 7 da lista em texto, `src/data/checklist.js:395`). A ordem dos rótulos não é fixa: na pergunta 1 o "Não" fica à esquerda, na 2 o "Sim" fica à esquerda (segue a ordem das linhas do Mermaid). Os textos são mais curtos que os do desenho: "…e bate?" em vez de "…e bate com o X oficial?", "Ajusto o tamanho e a saída" sem "e volto a esta pergunta". A legenda tem só 2 frases (`src/data/checklist.js:368`).
  - Fazer: componente novo de fluxo linear (ver "Trabalho"), dados estruturados em `fluxograma.passos` e o fluxograma na página principal, logo depois dos destaques.

- **[DIFERENTE] "As quatro etiquetas de evidência"**
  - Desenho: h2 "As quatro etiquetas de evidência" e o parágrafo "Por que quatro e não duas cores: 'freeze authority ativa' é mecânica certa…". Depois, uma grade `auto-fit minmax(200px,1fr)` com 4 cartões, **cada um tingido com o trio da sua cor** (fato ciano, medido verde, fraco âmbar, rotina roxo), com pílula em caixa normal de 12px, a descrição e, no pé, o **peso** em negrito na cor da etiqueta ('Um "não" aqui encerra a checagem.' · "Pesa, mas exige julgamento seu." · "Não use como prova de nada." · "Depende só de você."). Por fim, a figura "Quantos itens de cada etiqueta, no checklist inteiro": 4 barras de 18px na mesma escala de 0 a 23, com "8 de 23 itens" em mono (fato 8, medido 4, fraco 3, rotina 8) e a legenda "Mesma escala, de 0 a 23 itens. Só três famílias de sinal…".
  - App: card "O que cada etiqueta quer dizer" (`src/views/checklist.js:57-71`), `<dl>` em 2 colunas, cartões **neutros** (`border-borda bg-fundo`), pílula em MAIÚSCULAS de 11px (`src/components/checklist.js:26-37`) e a descrição. Não tem o parágrafo "Por que quatro" (hoje ele só existe como **comentário** em `src/data/checklist.js:11-13`), nem o peso, nem as barras de contagem. O card aparece duas vezes: na aba Checar (`:121`) e na aba Origem (`:244`).
  - Fazer: seção nova no lugar da legenda, com dados novos (`peso`, `porQueQuatro`) e a contagem calculada dos itens.

- **[DIFERENTE] Como usar**. Desenho: card neutro (`#141A24`/`#1F2733`), `<ul>` com marcadores e **negrito** em "fato do protocolo" e "sinais medidos". Fica depois das etiquetas. App: card tingido de ciano (`border-acento/50 bg-acento/5`, `src/views/checklist.js:108-116`), 3 `<p>` sem negrito, logo depois dos destaques. O texto é igual (`src/data/checklist.js:78-89`). Fazer: card neutro, `<ul>`, negrito (os dados precisam marcar o trecho forte) e a ordem do desenho.

- **[FALTA NO APP] Blocos em abas (tablist)**. Desenho: `role="tablist"` com "Pilar social 0/6 · Pilar técnico 0/9 · Decisão 0/8", botões de 44px com a contagem em mono 12px, o ativo em roxo (`#7C3AED` + 15%), teclado ← → Home End. **Um bloco por vez** num `tabpanel`. App: os 3 blocos empilhados, cada um num card (`src/views/checklist.js:79-93`), sem tablist. Fazer: tablist + painel único. Pode reaproveitar `criarAbas` (`src/ui.js:327`), mas os botões dela têm 38px e não mostram contagem; ou fazer os botões como no desenho.

- **[DIFERENTE] Cabeçalho do painel do bloco**. Desenho: h2 do bloco à esquerda e "0 de 6 marcados" em mono 13px à direita; descrição; barra **6px** roxa com `role="img"`. App: h2, descrição em 14px, a linha "Progresso — pilar social" (texto criado na implantação) + "0 de 6 itens marcados", barra de 8px (`src/components/checklist.js:72-87`, `src/ui.js:234-252`). Fazer: seguir o desenho, com as opções no componente, porque ele também é usado no M1 e no M5 (`src/views/modulo1.js:164`, `src/views/modulo5.js:475`).

- **[DIFERENTE] Item do checklist**
  - Desenho:
    - `<li>` com raio 8px, fundo `#0B0F17`, padding 14px 16px e checkbox de 20px com `accent-color:#22C55E`;
    - título em `<label>` de **15px/600**, e a **etiqueta à direita do título** (pílula em caixa normal de 12px, `white-space:nowrap`), que desce para baixo do título quando falta espaço;
    - "porquê" em 14px `#9AA7B4`;
    - "ONDE OLHAR:" (micro-rótulo de 11px em maiúsculas) + texto **ciano** de 13px;
    - "**Fonte:** …" em 12px **em todos os itens**.
  - App (`src/components/checklist.js:89-147`):
    - `<li>` com raio 12px (`rounded-card`), fundo `#141A24`, `p-4`; checkbox `accent-primaria`, que fica **roxo** quando marcado (medido: `accent-color rgb(124,58,237)`);
    - etiqueta **acima** do título, em MAIÚSCULAS de 11px;
    - título em 14px/400 e "porquê" em 12px;
    - "**Onde checar:**" em negrito branco + texto de 12px suave;
    - **sem "Fonte"**: a fonte só aparece na aba "De onde vem cada item" (`src/views/checklist.js:218`).
  - Fazer: o layout do desenho, como variante opcional do componente, e passar `fonte` em `paraOComponente` (`src/views/checklist.js:32-41`).

- **[IGUAL, exceto a cor da caixinha] Estado marcado**. Desenho e app: borda verde a 50%, fundo verde a 5%, título riscado em `#9AA7B4` (medido no app: `line-through`, `rgb(154,167,180)`), e a contagem da aba/cabeçalho sobe ("2/6", "2 de 6"). Diferença: a caixinha é verde no desenho e roxa no app (`src/components/checklist.js:101`). Fazer: `accent-risco-baixo` na variante do checklist de compra.

- **[DIFERENTE] Nota do painel**. Desenho: "Marque conforme for aplicando. No app, as marcas ficam salvas no seu navegador — aqui elas só existem enquanto a tela está aberta." embaixo da lista (o "aqui elas só existem…" é texto do protótipo). App: "As marcações ficam salvas só neste navegador." ao lado do botão de reset, antes dos blocos (`src/views/checklist.js:124-126`). Fazer: nota embaixo do painel, adaptada: "Marque conforme for aplicando. As marcas ficam salvas no seu navegador."

- **[DIFERENTE] "Sinais que ficaram de fora, e por quê"**. Desenho: na página principal, grade de **2 colunas** com cartões âmbar (título 14px/600 e texto 14px suave). Embaixo, a frase avisando que as fontes continuam exibidas pelo componente atual. App: está na aba "De onde vem cada item", com o título "O que ficou de fora, e por quê", em lista de 1 coluna (`src/views/checklist.js:225-237`), e o `<details>` "Fontes consultadas" separado (`:171-202`). Os textos são iguais (`src/data/checklist.js:400-425`). Fazer: levar para a página principal, em 2 colunas, e pôr o `<details>` das fontes dentro desta seção, no lugar da frase do protótipo.

- **[DIFERENTE — global, fora da minha área] Aviso do rodapé**. Desenho: caixa âmbar dentro do conteúdo, com "material de estudo próprio, **não é recomendação de investimento**. Memecoin…". App: rodapé comum com borda superior e sem "não é recomendação de investimento" (`index.html:118-122`). Vale para todas as telas.

- **[DIFERENTE — global] Sidebar**. Desenho: "Checklist antes de comprar", na ordem Glossário → Checklist → Revisão, e módulos como "M1 Fundamentos & Segurança". App: "Checklist", na ordem Checklist → Revisão → Glossário, e "Módulo 1 0%". É do `src/components/sidebar.js` e não entra aqui.

## A mais no app (não está no desenho)
- Barra de 3 abas "Checar um token · Fluxograma · De onde vem cada item" (`src/views/checklist.js:257-271`). Tipo (b): estrutura criada na implantação, porque o desenho é página única.
- Botão "Começar a checagem de um token novo" + toast, que apaga as marcas dos 3 blocos (`src/views/checklist.js:95-104`, `:43-50`). Tipo (a): função real que o desenho não mostra. Sugestão: manter, embaixo da tablist dos blocos. Decisão do dono.
- Card "O mesmo caminho, em texto" com a lista de 7 passos (`src/views/checklist.js:157-164`, dados `src/data/checklist.js:388-396`). Tipo (c): no desenho a versão em texto existe só no `aria-label`. Pode virar um `<details>` "Ler como texto" ou sair.
- Intro da aba Origem: "Cada item do checklist com a etiqueta e a fonte que o sustenta. As pesquisas completas estão em pesquisa/modulos/pesquisas/…" (`src/views/checklist.js:240-243`). Tipo (b).
- Lista "item + etiqueta + Fonte" da aba Origem (`src/views/checklist.js:205-223`). Tipo (c): repete os itens; no desenho a fonte fica dentro de cada item.
- A legenda das etiquetas repetida na aba Origem (`src/views/checklist.js:244`). Tipo (b).
- Reserva "O mesmo caminho está descrito em texto logo abaixo." (`src/views/checklist.js:144-146`). Tipo (b), só aparece se o desenho falhar.
- Rótulo "Progresso — pilar social / técnico / decisão" (`src/views/checklist.js:88`, `src/components/checklist.js:80`). Tipo (b).
- Card "Como usar" com fundo ciano (`src/views/checklist.js:115`). Tipo (b), estilo inventado.
- "Onde checar:" no lugar de "Onde olhar:" (`src/components/checklist.js:140`). Tipo (b).

Nada disso é invenção de conteúdo: pré-mortem, argumento contrário, taxa-base, tamanho, stop e diário **estão no desenho** (bloco Decisão, 8 itens), com os mesmos textos e fontes de `src/data/checklist.js:278-359`.

## Números
- Nenhum achado. Todo número do desenho e do app tem origem em `src/data/checklist.js`: 81,9% e arXiv 2608.20271 (`:63-65`, `:429`), 3 famílias (`:71`), 12/09/2026 e SATOSHI (`:58`), 30 mil carteiras (`:116`), 6,53% (`:145`), mais de 100 carteiras (`:157`), 24 de 24 (`:177`), 11 de 11 (`:210`), 24 × 6 pontos (`:221`), 1% e 20–25% (`:243`), 97,3% × 97,7% (`:267`), cerca de 30% (`:301`), 16% → 46% e cerca de 69 (`:323-324`), 68,67% (`:327`), 138 estudos (`:353`), F1 0,79 × 0,90 (`:422`). A contagem 8/4/3/8 de 23 do desenho é calculada dos próprios itens e confere com os dados: social 4 fato + 1 medido + 1 fraco; técnico 4 fato + 3 medido + 2 fraco; decisão 8 rotina.

## Celular
- Não há rolagem horizontal no app (medido: `scrollWidth 390 = clientWidth 390`, também na aba Fluxograma).
- Fluxograma no app a 390px: a árvore empilha, mas os rótulos "Sim/Não" viram **barras da largura toda**, porque `styles/custom.css:476-478` põe `.omh-fluxo-ramo { align-items: stretch !important }`, e a pílula do rótulo estica junto (captura `ckgl-app-check-cel-fluxo-01.png`). O laço aparece duas vezes como referência tracejada. No desenho, cada pergunta numerada vem com o desvio e o "segue" empilhados em 1 coluna.
- Destaques: o desenho em modo compacto mantém 1 + 2 colunas e os cartões ficam espremidos (defeito do protótipo, porque o `Destaques` do design system fixa as colunas). O app empilha em 1 coluna, que é melhor. Manter o empilhamento com CSS.
- Itens: nos dois a etiqueta fica em cima e o texto embaixo, mas no app "Progresso — pilar técnico | 0 de 9 itens marcados" quebra em duas colunas apertadas, e as abas do topo quebram em 2 linhas.

## Trabalho para implantar
- `src/views/checklist.js`
  - Tirar `criarAbas` e montar a página única, na ordem do desenho: cabeçalho → destaques 1 + 2 → fluxograma → etiquetas + contagem → como usar → tablist dos blocos + painel → sinais de fora (com o `<details>` das fontes dentro) — **G**.
  - Destaques em duas chamadas (`[d[0]]` e `slice(1)`) — **P**.
  - Seção "As quatro etiquetas de evidência": parágrafo, 4 cartões tingidos pela cor da etiqueta, com o peso, e a figura "Quantos itens de cada etiqueta" (barras de 18px, escala 0..total, "N de 23 itens" em mono, legenda) — **M**.
  - "Como usar" em card neutro, `<ul>`, negrito nos dois termos — **P**.
  - Tablist dos blocos ("Pilar social 0/6"…), com um painel por vez, contagem ao vivo na aba e teclado ← → Home End; o botão de reset fica embaixo da tablist, se o dono aprovar — **M**.
  - `paraOComponente` passa também `fonte` — **P**.
- `src/components/checklist.js`
  - Variante opcional (por exemplo `estilo: 'compra'`), sem mudar o M1 e o M5: `<li>` com raio 8px, fundo `#0B0F17`, padding 14/16; título em `<label>` de 15px/600 com a etiqueta à direita; porquê em 14px; "Onde olhar:" como micro-rótulo + texto ciano de 13px; "Fonte:" em 12px; `accent-color` verde; cabeçalho do painel com "X de N marcados" em mono 13px e barra de 6px — **M**.
  - `criarEtiqueta` em caixa normal, 12px, trio de cores do README (ciano `.5/.1`, verde `.5/.12`, âmbar `.4/.12`, roxo `.5/.15` com texto `#E6EDF3`); hoje só a view do checklist usa — **P**.
- `src/data/checklist.js`
  - `rotulo: 'Rotina, a cada token'` — **P**.
  - `EVIDENCIAS[*].peso` (os 4 textos do desenho) e `porQueQuatro` (o parágrafo que hoje é comentário em `:11-13`) — **P**.
  - `fluxograma.passos`: 6 objetos { pergunta, evidencia, desvio: { rotulo, texto, tom: 'nao' | 'ajusta' }, segue: { rotulo, texto } }, com os textos exatos do desenho (`31 Checklist.dc.html`, script, `passosBase`), mais `inicio`, `fim`, a legenda com a 3ª frase e `fechamento` ("Passar por tudo…") — **M**.
  - `comoUsar` com os trechos em negrito marcados; `notaDoPainel`; legenda da contagem — **P**.
  - `rotuloCurto` com inicial maiúscula para a aba ("Pilar social"), ou a view capitaliza — **P**.
- Componente novo **`criarFluxoDeChecagem`** (em `src/components/fluxograma.js` ou `visuais.js`) — **M**:
  - espinha vertical: início → pergunta numerada (marcador ciano 24px + etiqueta colorida) → grade de 2 colunas (desvio | segue) que vira 1 coluna por CSS (`auto-fit`/`@media ≤640px`) → caixa final verde de borda 2px → figcaption → caixa ciano do fechamento;
  - `role="img"` com `aria-label` gerado dos dados.
  - Reaproveitar: as peças `seta()` e `rotuloDaSeta()` de `fluxograma.js:129-139`. O M6 do desenho tem um fluxo parecido ("Checagem do contrato… programa → extensões → mint → freeze", `M6 Desktop.dc.html:449-464`), então vale um componente só com variante.
- `styles/custom.css:476-478`: tirar `align-items: stretch !important` de `.omh-fluxo-ramo`, ou aplicar o stretch só às caixas e não às pílulas. Isso conserta os rótulos em barra no celular de todos os fluxogramas que usam `criarFluxograma` — **P**.
- `src/ui.js` `criarTitulo`: opção `rotulo` (micro-rótulo acima do h1), também usada no Glossário — **P**.
- Global, fora desta área: aviso do rodapé em caixa âmbar com "não é recomendação de investimento" (`index.html:118-122`) — **P**.

---

# Glossário (`#/glossario`)

## Resumo
Os 34 termos, as 6 categorias e os textos dos cards são os mesmos: os dois leem `src/data/glossario.js`, e o desenho copia os mesmos dados no script. Busca, filtro, "Marcar como estudado" e a fila da Revisão (1 dia) funcionam. O que difere é a forma, e bastante. Primeiro, o **mapa** do app mostra só 3 termos por categoria (17 de 36 chips), então os dois termos de duas categorias nunca aparecem ligados às duas. Os ramos também não são clicáveis e não mostram quem já foi estudado. Segundo, o **contador** "X de 34" não é o card do topo com a nota da Revisão. Terceiro, o **card de termo** tem outra hierarquia: botão roxo primário no alto em vez do botão neutro no pé, categorias sem cor, exemplo sem caixa, sem o selo "Estudado ✓" e sem o aviso "aparece nas duas categorias". Por último, o **estado vazio** é só uma frase, sem a caixa âmbar e sem os dois botões.

## Diferenças, na ordem do desenho

- **[DIFERENTE] Cabeçalho**. Desenho: micro-rótulo "34 TERMOS", h1 "**Glossário**" e o subtítulo "Todo termo que aparece nos módulos, com definição, exemplo prático e o sinal de risco a observar. Abra aqui sempre que um termo novo aparecer e marque como estudado o que já entendeu." App: h1 "**Glossário interativo on-chain**" e outro subtítulo ("Termos que aparecem o tempo todo em memecoins…") (`src/views/glossario.js:32-36`), sem micro-rótulo. Fazer: título e subtítulo do desenho, levados para os dados, e o micro-rótulo com `glossario.length + ' termos'`.

- **[DIFERENTE] Contador (primeira seção do desenho)**. Desenho: card `#141A24` com h2 "**X de 34 termos estudados**" à esquerda e "26%" em mono à direita, barra roxa de 8px com `role="img"`, e a nota "Marcar um termo como estudado coloca as perguntas dele na fila da Revisão (link): elas voltam no dia seguinte, e depois em 3, 7, 16 e 35 dias." A caixa "Estado de exemplo" é do protótipo e não vai para o app. App: sem card; a linha "Progresso do glossário | 0 de 34 termos estudados" e a barra de 8px ficam **depois** da busca (`src/components/glossary.js:178-193`, montagem em `:248-256`), sem % e sem a nota da Revisão. Fazer: card no topo, com a nota montada de `ESCADA_DIAS` (`src/components/revisao.js:20`).

- **[DIFERENTE — grave] Mapa dos termos por categoria**
  - Desenho: seção com h2 "O mapa dos termos", o rótulo "RELAÇÃO: O TODO E SUAS PARTES" e o intro "Seis categorias. Clique numa para filtrar a lista abaixo; clique de novo para ver todas. Dois termos pertencem a duas categorias ao mesmo tempo — eles aparecem nas duas, ligados pela cor ciana, e não duplicados em silêncio." Depois:
    - centro "Glossário / 34 termos · 6 categorias" (mono);
    - 6 ramos que são **`<button aria-pressed>`** e filtram a lista, com a contagem em mono ("Segurança 10");
    - **todos os termos** como folhas (10 + 2 + 5 + 4 + 8 + 7 = 36 chips);
    - "Insider wallets ⇢ Social" / "Insider wallets ⇢ Segurança" e "Permit / Permit2 ⇢ EVM" / "⇢ Segurança" em **ciano**, nas duas categorias;
    - folhas **verdes** para os termos estudados;
    - legenda com 2 amostras: "termo em duas categorias — a seta diz qual é a outra" · "já estudado";
    - ramo ativo em roxo, com o estado compartilhado com os chips do filtro.
  - App: `criarMapaMental` (`src/views/glossario.js:14-29`) com a legenda "Mapa do glossário". Os ramos são `<span>` estáticos, "Segurança (10)" (medido: 6 `SPAN`, nenhum botão; `src/components/visuais.js:108-109`). Cada ramo mostra **só as 3 primeiras folhas** (medido: 3,2,3,3,3,3), por causa do `slice(0, 3)` em `src/components/visuais.js:115`. Com isso "Insider wallets" aparece só em Social e **Permit/Permit2 não aparece em lugar nenhum**, e não existe ligação ciana. As folhas são sempre cinzas (`:116`) e não mostram "estudado". Não tem intro nem legenda de amostras. No lugar, uma nota inventada: "Alguns termos aparecem em mais de uma categoria: é o caso de quem cruza segurança com outra área." (`src/views/glossario.js:27`).
  - Fazer: o mapa passa para dentro de `montarGlossario`, porque precisa redesenhar quando o filtro ou o "estudado" mudam, e é preciso estender `criarMapaMental` ou escrever um mapa próprio do glossário (ver "Trabalho").

- **[DIFERENTE] Busca + filtro**
  - Desenho: card `#141A24` com rótulo visível "BUSCAR TERMO" (`<label for>`), campo de 15px com `min-height 44px` e padding 12/14, e chips de filtro com **contagem em mono** ("Todas 34", "Segurança 10"…), altura mínima de 40px. **Clicar de novo no chip ativo volta para "Todas"**, e o chip divide o estado com o mapa. Embaixo, a linha de resultado em `aria-live="polite"`: "34 termos · 9 já estudados", "2 termos para "rug" · 1 já estudados", "8 termos em "Solana" · 2 já estudados", "Nenhum termo encontrado."
  - App: caixa `bg-fundo` (mais escura que o card), campo sem rótulo visível (só `aria-label`), `py-2 text-sm` ≈ 38px de altura (calculado pelas classes), `src/components/glossary.js:131-142`. Chips sem contagem, `py-1.5` ≈ 34px (`:144-172`). Clicar no chip ativo **não volta** para Todas (testado: continua "Solana" pressionado). O resultado fica fora da caixa, como "Mostrando 8 de 34 termos." em `role="status"` (`:175`, `:235`).
  - **Teste da busca, pelo `js` do shot.mjs:**

    | Busca | Desenho | App |
    |---|---|---|
    | "rug" | 2 termos: Liquidez bloqueada, Rug pull | 6 termos: + Honeypot, Freeze authority, Copy trading, Factory, que só batem pelo **alerta** |
    | "seguranca" (sem acento) | 0 | 1, porque o app ignora acento (`:22-28`) |
    | "revoke" (só existe num alerta) | 0 | 1 |
    | chip Solana | 8 | 8 |
    | ramo Segurança do mapa | 10, e clicar de novo volta a 34 | não existe |

    O desenho procura só em termo + definição + exemplo, mas o próprio placeholder promete "…ou alerta". Neste ponto o **app está certo**: manter a busca do app (alerta incluído, sem depender de acento).
  - Fazer: o card, o rótulo, o campo de 44px, as contagens nos chips, o clique que desfaz o filtro e a linha de resultado no formato do desenho.

- **[DIFERENTE] Estado vazio** (testado com EVM + "xyz"). Desenho: seção **âmbar** (borda `.4`, fundo `.12`) com a frase em negrito "Nenhum termo bate com essa busca e esse filtro ao mesmo tempo. Tente limpar um dos dois." e **dois botões**: "Apagar a busca" e "Ver todas as categorias". A linha de resultado diz "Nenhum termo encontrado." App: a mesma frase num `<p>` cinza de 14px, sem caixa e sem botões (`src/components/glossary.js:228-232`), e o resultado "Mostrando 0 de 34 termos." Fazer: caixa âmbar + os 2 botões (limpar o campo; filtro = todas).

- **[DIFERENTE] Grade de cards**. Desenho: 2 colunas no desktop e 1 no compacto. App: `grid gap-4 xl:grid-cols-2` (`src/components/glossary.js:176`), que dá 2 colunas só a partir de 1280px; entre 768 e 1279px fica 1 coluna. Fazer: `repeat(auto-fit, minmax(340px, 1fr))` ou `md:grid-cols-2`.

- **[DIFERENTE] Card de termo**
  - Desenho:
    - `<article>` `#141A24`, raio 12px, padding 20px; quando estudado, só a borda fica verde e o fundo não muda;
    - h3 de 17px; quando estudado, título em `#9AA7B4` e o **selo "Estudado ✓"** verde à direita;
    - chips de categoria **coloridos** (Segurança vermelho `#F87171`, Liquidez verde, Execução roxo com texto claro, Social âmbar, Solana ciano, EVM neutro) e, em termo de 2 categorias, "**aparece nas duas categorias**" em ciano de 12px;
    - definição em 14px **`#E6EDF3`**;
    - **exemplo numa caixa** (`#0B0F17`, borda `#1F2733`, raio 8), com o texto em `#9AA7B4`;
    - alerta em caixa âmbar, com o texto em `#E6EDF3`;
    - **botão no pé** (`margin-top:auto`, alinhado à esquerda), neutro (`#0B0F17`/`#1F2733`), que vira "Estudado ✓" no trio verde.
  - App (`src/components/glossary.js:59-114`):
    - fundo verde a 5% quando estudado (medido `oklab(... / 0.05)`); h2 de 16px sem mudar de cor; sem selo;
    - chips de categoria todos neutros (medido: EVM e Segurança com `rgb(154,167,180)` e borda `#1F2733`; `:77-86`) e sem "aparece nas duas categorias";
    - definição em `text-texto-suave` (`:97`); exemplo como parágrafo solto (`:99-102`); alerta em caixa âmbar, mas com o texto suave (`:104-111`);
    - botão **roxo primário no canto de cima à direita** (`:89-94`), que em cards estreitos cai para baixo do título; quando estudado vira `secundario` neutro, e não verde.
  - Fazer: o card do desenho, com as cores de categoria vindas dos dados.

- **[IGUAL] Função "Marcar como estudado"**. Salva no store e põe as duas perguntas do termo na fila da Revisão para o dia seguinte (medido: `glossario:slippage~def` e `~ex` em `revisao.itens`; `src/components/glossary.js:38-52`), e o foco volta ao botão depois de redesenhar (`:237-242`). O contador sobe ("1 de 34").

- **[DIFERENTE — global] Aviso do rodapé**. Mesmo caso do Checklist (`index.html:118-122`).

## A mais no app (não está no desenho)
- Título "Glossário interativo on-chain" e o subtítulo "Termos que aparecem o tempo todo…" (`src/views/glossario.js:32-36`). Tipo (b).
- Nota do mapa "Alguns termos aparecem em mais de uma categoria: é o caso de quem cruza segurança com outra área." (`src/views/glossario.js:27`). Tipo (b), e diz menos que o desenho.
- Legenda "Mapa do glossário" (`src/views/glossario.js:24`). Tipo (b); no desenho é o h2 "O mapa dos termos".
- Rótulo "Progresso do glossário" (`src/components/glossary.js:186`) e "Mostrando X de 34 termos." (`:235`). Tipo (b).
- Busca que ignora acento e procura também no alerta (`src/components/glossary.js:22-28`, `:204-206`). Tipo (a): **melhor que o desenho**, manter.
- Foco devolvido ao botão depois de marcar (`src/components/glossary.js:237-242`). Tipo (a), manter.

## Números
- Nenhum achado. Os números dos termos (15% de slippage, 97,3% × 97,7%, 80%, US$ 2 milhões / 8 mil, 793,1 milhões, 85 SOL, US$ 11 mil–101 mil, mediana 38 mil, 60%, +450%, 5%, 0x000…000) são iguais nos dois e estão em `src/data/glossario.js`. "34 termos", "6 categorias" e as contagens 10/2/5/4/8/7 são calculadas dos dados (conferido: segurança 10 · solana 8 · evm 7 · execução 5 · social 4 · liquidez 2, com Insider wallets em social + segurança e Permit/Permit2 em evm + segurança). "1, 3, 7, 16 e 35 dias" vem de `ESCADA_DIAS` (`src/components/revisao.js:20`). "9 termos / 26%" é estado de exemplo do protótipo.

## Celular
- Não há rolagem horizontal no app (medido: 390 = 390).
- O mapa vira vertical nos dois. No desenho aparecem os 36 chips, com as ligações cianas e os verdes; no app, 3 por ramo e todos cinzas.
- O placeholder da busca no app fica cortado ("…exemplo ou al"); os chips quebram em 2 linhas nos dois.
- Card no app: o botão roxo fica no alto, ao lado do título; no desenho, o botão fica no pé do card e o selo "Estudado ✓" ao lado do título.

## Trabalho para implantar
- `src/views/glossario.js`
  - Cabeçalho do desenho (micro-rótulo "34 termos", h1 "Glossário", subtítulo novo em dados) com `criarTitulo({ rotulo })` — **P**.
  - Tirar o mapa da view e passar para dentro de `montarGlossario`, para ele dividir o estado da categoria e do "estudado" — **P**.
- `src/components/glossary.js`
  - Ordem: card do contador → mapa → card de busca → estado vazio → grade — **P**.
  - Card do contador: h2 "X de 34 termos estudados", % em mono, barra de 8px, nota da Revisão com link `#/revisao` e os dias de `ESCADA_DIAS` — **P**.
  - Mapa do glossário: centro em mono; ramo `<button aria-pressed>` com a contagem em mono que alterna o filtro (clicar de novo = todas); **todas** as folhas; folha em 2 categorias em ciano com "⇢ Outra" (`aria-hidden`); folha estudada em verde; legenda de 2 amostras; `aria-label` descrevendo as categorias e os termos cruzados; rolagem interna com `overflow-x:auto; tabindex=0` — **M**.
  - Card de busca: `<label>` visível "Buscar termo", campo com a classe `.omh-busca` (15px, 44px), chips com contagem, chip ativo que desfaz o filtro, linha de resultado `aria-live="polite"` no formato do desenho. **Manter** a busca sem acento e com o alerta — **M**.
  - Estado vazio: seção âmbar com a frase em negrito e os botões "Apagar a busca" (limpa e devolve o foco ao campo) e "Ver todas as categorias" — **P**.
  - Card de termo: h3 de 17px; selo "Estudado ✓"; título suave quando estudado; chips de categoria coloridos; "aparece nas duas categorias"; definição em `text-texto`; exemplo em caixa `bg-fundo border-borda rounded-lg`; alerta com texto `#E6EDF3`; botão neutro no pé (`mt-auto self-start`) que vira o trio verde; fundo do card sempre `#141A24`, só a borda verde quando estudado — **M**.
  - Grade de 2 colunas a partir de ~768px (`auto-fit minmax(340px,1fr)`) — **P**.
- `src/data/glossario.js`: cor (tom) de cada categoria em `CATEGORIAS_GLOSSARIO` (segurança alto, liquidez baixo, execução primária, social médio, solana acento, evm neutro) e os textos do cabeçalho, do intro do mapa e da nota da Revisão — **P**.
- `src/components/visuais.js` `criarMapaMental`: se o mapa do glossário for feito por ele, precisa de (1) `limiteFolhas`, hoje fixo em 3 na `:115`, sem quebrar os mapas dos módulos, que continuam em 3; (2) folha como objeto `{ rotulo, tom, seta }`; (3) ramo com `pressionado` + `aoAlternar` (hoje só `href`/`aoAbrir`); (4) contagem em mono separada do título. Outra saída é um mapa próprio em `glossary.js`, reaproveitando as classes `.omh-mapa*` de `styles/custom.css:351-420` — **M**.
- Global, fora desta área: aviso do rodapé (`index.html:118-122`) — **P**.

## Componentes novos / reaproveitamento (as duas telas)
- **Fluxo de checagem linear** (Checklist; pode servir ao "Checagem do contrato" do M6): novo. Reaproveita `seta()`/`rotuloDaSeta()` de `src/components/fluxograma.js`. O `criarFluxograma` (árvore do Mermaid) **não serve** para este desenho.
- **Barras de contagem por etiqueta**: dá para usar `criarBarrasNaMesmaEscala` (`src/components/visuais.js:405`) com `maximo = total` e cor por barra, mas ele sempre desenha a legenda "valor medido" (`:452`) e barras de 28px. Precisa de uma opção para esconder a legenda e mudar a altura, ou de um bloco simples na view.
- **Mapa do glossário**: estender `criarMapaMental` ou fazer uma variante (acima).
- **Tablist dos blocos com contagem**: `criarAbas` (`src/ui.js:327`) serve de base, mas os botões têm 38px, e não 44px, e não aceitam contagem. Uma opção `rotuloExtra` ou botões próprios resolvem.
