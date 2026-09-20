# Componentes e moldura do app

Desenhos comparados: `00 Componentes.dc.html` (os 10 componentes), `PaginaDeModulo.dc.html`, a casca dos arquivos `M1..M7 Desktop/Celular` (sidebar, cabeçalho, mapa, abas, rodapé), as seções "Design tokens", "Componentes novos (Fase 1)" e "Acessibilidade" do `README.md` do handoff, e o design system em `_ds/.../_ds_bundle.js` (Destaques, Quiz, Botao, Checklist, Sidebar, Abas, CabecalhoMobile, CardDaSecao, Termos).
Capturas usadas (em `shots/`): `comp-desenho-00-*`, `comp-desenho-m6-*`, `comp-desenho-m6-cel-*`, `comp-app-m6-*`, `comp-app-m6-tudo-*`, `comp-app-m6-prever-o-golpe-*`, `comp-app-m6-o-contrato-*`, `comp-app-m6-cel-*`, `comp-app-inicio-*`, `comp-app-m1-brasil-*`, `comp-app-m1-carteiras-*`. Todas as medidas "app" abaixo vêm do DOM (estilo computado) a 1280px ou 390px.

## Resumo

Dos 10 componentes da Fase 1, cinco foram implantados de perto (MapaMental, Sequencia, Ciclo, GradeDe100, BarrasNaMesmaEscala em `src/components/visuais.js`), com desvios pequenos mas visíveis. Três não foram implantados: a **CurvaDeslizante** do app é outro desenho (curva preço × dinheiro que sai, 660×330, sem "Você recebe/Você vende"), a **LinhaDoTempo** continua a versão antiga (sem espaçamento proporcional, sem pílula de intervalo, data em Inter) e a **ComparacaoLadoALado** continua em cards (sem `<table>`, sem critério decisivo, sem tons). O que mais pesa na tela é a moldura em volta de todos os visuais: a implantação criou uma `moldura()` que põe em cada visual um título inventado e o rótulo "RELAÇÃO: …" (que nos módulos do desenho não existe), e o `criarCardDaSecao` não tem lugar para o visual. Por isso os visuais ficam fora do card da seção, e o mapa e o fluxograma aparecem como caixa dentro de caixa. Na moldura do app, a sidebar tem outros rótulos e outra ordem, o cabeçalho do módulo não tem o micro-rótulo "MÓDULO N", o rodapé não é o card âmbar e perdeu a frase "não é recomendação de investimento", e a coluna de conteúdo tem 934px em vez de 868px.

## Diferenças, na ordem do desenho

### 1. MapaMental (`00 Componentes` › MapaMental; nos módulos, seção "O módulo inteiro numa olhada")

- **[DIFERENTE] Moldura do mapa**: no desenho do módulo (M6 Desktop, linhas 39–58), o mapa é um card `#141A24` (raio 12, padding 20) com o micro-rótulo "O MÓDULO INTEIRO NUMA OLHADA" e, dentro dele, a caixa `#0B0F17` (raio 8, padding 16), com `aria-label="Mapa do módulo"` só como nome acessível. No app, é um `<figure>` `#0B0F17` com borda (raio 8, padding 20) com o texto visível "Mapa do módulo" + "RELAÇÃO: O TODO E SUAS PARTES" e, dentro, **outra** caixa `#0B0F17` com borda e padding 20: caixa dentro de caixa, sem o card (`visuais.js:53-67`, `visuais.js:132`, `visuais.js:162`; medido no DOM: figure e caixa interna têm os dois `rgb(11,15,23)`). **Fazer:** o mapa do módulo vira um `<section aria-label="Mapa do módulo">` com card `#141A24`, micro-rótulo "O módulo inteiro numa olhada", uma caixa interna só e nenhum rótulo "Relação".
- **[DIFERENTE] Centro**: no módulo, o desenho mostra só o título ("Ler a tela") e o subtítulo, com padding 14px 18px e max-width 220px. O micro-rótulo "MÓDULO 6" aparece só no exemplo do `00 Componentes`. O app sempre põe "MÓDULO N", com padding 16px 20px e max-width 200px (`visuais.js:86-90`, `visuais.js:160`). **Fazer:** tirar o rótulo do centro nos módulos (o "MÓDULO N" já está no cabeçalho) e usar padding 14px 18px / max-width 220px.
- **[DIFERENTE] Ramos**: o desenho tem um ramo por aba, **incluindo o Quiz** (folha "8 perguntas"). O ramo da aba ativa fica com borda `#7C3AED` e fundo roxo 15% (M6 Desktop, `renderVals`, linhas 664-665). O app tira o Quiz (`visuais.js:149`) e não marca a aba ativa. O estado "ramo concluído (borda verde 50%, ✓)" existe no código (`visuais.js:99,113`), mas nenhuma view passa `concluido`. **Fazer:** incluir o ramo do Quiz, repintar o ramo quando a aba muda (escutar a troca de aba de `criarAbas`) e passar `concluido` a partir do store.
- **[DIFERENTE] Folhas**: o desenho usa rótulos curtos, de 2 a 4 palavras ("market cap × liquidez", "quanto sai", "zeros compactados", "PnL"). O app usa os **títulos inteiros das seções** ("Market cap, FDV e liquidez: três números, três perguntas"…), que quebram em várias linhas (`visuais.js:152`; captura `comp-app-m6-01`). **Fazer:** criar um campo de folhas curtas por aba em `src/data/moduloN.js` (ex.: `mapa: [{ aba, folhas }]`) e usar esse campo no lugar dos títulos.
- **[DIFERENTE] Tamanhos**: ramo com `padding 6px 12px`, 14px/600 e `min-height 40px` em linha: igual ao desenho do módulo. Folha com 13px e fundo `#0B0F17`: o desenho do módulo não tem fundo na folha (`background` ausente, M6 linha 50). Diferença pequena.
- **[IGUAL] Geometria**: tronco de 32×2px, `<ul>` com borda-esquerda de 2px, conector `::before` de 24–28px, `min-width 420px`, vertical ≤640px (`custom.css:350-419`).
- **[IGUAL] Teclado/foco**: ramo é `<button>`/`<a>`, folhas sem foco, `abrirAba()` abre a aba e move o foco para o painel (`visuais.js:168-177`).
- **[DIFERENTE] Celular (≤640px)**: o desenho pede ramo com 44px. O CSS tem `min-height:44px` (`custom.css:414-418`), mas o `min-height:40px` em linha do botão (`visuais.js:100`) ganha. Medido a 390px: os ramos ficam com 40px. O centro também não estica (continua com max-width 200px em linha, `visuais.js:86`), enquanto no desenho celular ele ocupa a largura toda. **Fazer:** tirar os valores em linha e passá-los para classes CSS.
- **[DIFERENTE] Forma dos dados**: o `criarMapaDoModulo` monta os ramos a partir de `secoes` + `abas` (`visuais.js:147-165`). O desenho recebe `{ centro, ramos:[{titulo, href, folhas≤3}] }`. **Fazer:** passar os ramos prontos, vindos do dado de folhas curtas.

### 2. Fluxograma

- **[DIFERENTE] Forma dos dados**: o desenho recebe `{ nos:[{id,tipo,texto}], setas:[{de,para,rotulo}] }`. O app lê o **texto Mermaid** (`codigoMermaid`) com um parser próprio (`fluxograma.js:50-119`, `fluxograma.js:154`). Quando o parser não entende o texto, cai no **Mermaid por CDN** (`diagrama.js:25`, `diagrama.js:135-176`), e o desenho diz "sem CDN, sem reserva". **Fazer:** aceitar `{nos, setas}` direto e converter os diagramas de `src/data` (ou manter o parser só como adaptador e tirar o caminho do Mermaid).
- **[DIFERENTE] Texto sem acento na tela**: como o app desenha o texto Mermaid como está, aparecem "Hot wallet voce guarda online", "Maior seguranca responsabilidade sua" e "anula assinaturas nao usadas" (`src/data/modulo1.js:1500-1504`; captura `comp-app-m1-carteiras-03`). **Fazer:** acentuar esses textos em `src/data` ou migrar para `{nos, setas}`.
- **[DIFERENTE] Moldura**: no desenho, o fluxograma é só a caixa `#0B0F17` (raio 8, padding 20), com a legenda **dentro** dela (13px, centralizada, margin-top 16). O app embrulha essa caixa num card `rounded-card bg-superficie p-4/p-5` (`diagrama.js:126`), o que dá card dentro de card quando está numa seção, e põe a legenda fora da caixa, em 12px (`diagrama.js:130`). **Fazer:** tirar o card de fora e pôr a legenda dentro da caixa, em 13px.
- **[DIFERENTE] Nó "ação"**: no desenho, o texto dos nós de ação e de resultado não tem peso definido (400), e o início, a pergunta e o fim usam 600. No app, todo nó que não é pergunta usa 500 (`fluxograma.js:125`). Diferença pequena.
- **[DIFERENTE] Nó de referência "↩"**: o app desenha uma pílula tracejada "↩ texto" quando um caminho volta para um nó ou se junta a outro (`fluxograma.js:142-148`). O desenho não tem isso, e "↩" está fora dos caracteres permitidos (→ ⇢ ✓ ▾ ☰), além de estar sem `aria-hidden`. **Fazer:** usar "⇢" com `aria-hidden="true"`, ou desenhar a junção como no desenho do M6 (espinha com desvios).
- **[A MAIS, justificado] Tipo "alerta" (âmbar)** (`fluxograma.js:34`): o desenho do M6 usa âmbar para "metadata mutável". Pode ficar.
- **[IGUAL] Cores dos 4 tipos, setas de 2px com ponta girada, pílulas Sim/Não e `role="img"` com `aria-label`** (`fluxograma.js:29-43,129-139,248`).
- **[DIFERENTE] Celular**: no desenho, cada ramo empilhado ganha uma borda-esquerda de 2px na cor do rótulo (verde para Sim, vermelho para Não), com a pílula no topo e padding-left 12px (`00 Componentes`, linhas 157-168). O app só troca para 1 coluna e mantém as setas (`custom.css:471-479`). **Fazer:** acrescentar, no CSS do celular, a borda colorida por ramo.
- **[FALTA NO APP] Foco na rolagem**: o desenho pede que um fluxograma largo role dentro da caixa, com `tabindex="0"`. O caminho novo (`fluxograma.js:248`) não tem `overflow-x:auto` nem `tabindex`. Hoje nenhum fluxograma estoura, mas a regra não está implantada.

### 3. Sequencia

- **[IGUAL] Marcação e estilo**: `<ol role="tablist">`, botão `role="tab"` com 44px, marcador de 24px, passo atual com borda `#7C3AED`, fundo 15% e marcador ciano, ligação "→" de 20px, painel `aria-live` com borda roxa a 60% e fundo 12% com "PASSO N DE M" (`visuais.js:191-254`, `custom.css:421-462`). Teclado ← → Home End: igual.
- **[DIFERENTE] Defeito no desktop**: o texto do passo atual também aparece **dentro do botão** (ex.: "a fazer" no botão 1 da trilha do Início). O `display:block` em linha anula o `sm:hidden` (`visuais.js:228`; medido a 1280px: `display:block`). No desktop o desenho mostra só número e título no botão, e o texto só no painel. **Fazer:** esconder por CSS (`.omh-sequencia [data-texto-movel]{display:none}` e mostrar só em ≤640px), sem `display` em linha.
- **[FALTA NO APP] `tabindex="0"` na área que rola**: o desenho pede `overflow-x:auto; tabindex="0"`. O `<ol>` rola (medido: scrollWidth 980 > clientWidth 892 no Início) e não tem `tabindex` (`visuais.js:249`).
- **[A MAIS] Título e "RELAÇÃO: ORDEM"** (via `moldura`, `visuais.js:253`). Ver "A mais".
- **[DIFERENTE] Dados**: as views passam `tom` por passo (`modulo2.js:457`) e o componente ignora. O desenho não tem `tom`: tirar das views.

### 4. Ciclo

- **[IGUAL] Geometria**: SVG 320×320, raio 100, ângulo −90 + i·360/n, folga de 50/40/30°, `marker-end`, último arco em `#22D3EE` tracejado `6 5`, caixas de 120px presas por `Math.min/max`, marcador ciano de 22px, detalhe em mono 11px (`visuais.js:268-324`).
- **[DIFERENTE] Rótulo do centro**: cada desenho tem o seu. `00 Componentes`: "volta ao começo". M2: "e o laço aperta". M3: "e o tema seguinte começa". Revisão: "errou: volta ao degrau 1", em `#F87171` e 11px. Início: sem texto no centro. O app usa palavras próprias: "estudo" (`inicio.js:366`), "recompensa" (`modulo2.js:444`), "atenção" (`modulo3.js:201`), "acertou?" (`revisao.js:454`), sempre em ciano 12px (`visuais.js:322`). **Fazer:** copiar o texto de cada desenho e aceitar `cor` no centro, para o vermelho da Revisão.
- **[A MAIS] Legenda em `<ol>` embaixo do círculo** (`visuais.js:327-337`): o desenho não tem; a alternativa em texto é o `aria-label`. Tipo (b).
- **[A MAIS] Título e "RELAÇÃO: O QUE SE REPETE" dentro da figura** (`visuais.js:339`). Nas telas gerais, o desenho põe "Relação: …" no **cabeçalho do card** (linha do `<h2>`), não dentro da figura.

### 5. GradeDe100

- **[IGUAL] Grade**: 10 colunas, gap 3px, max-width 230px, `aspect-ratio:1`, raio 3, legenda com o número em mono e a fonte em 12px (`visuais.js:354-384`).
- **[DIFERENTE] Cores**: o desenho recebe `cor` e só aceita 5 cores (vermelho = ruim, verde, âmbar, roxo = o que o modelo pega, `#1F2733` = resto). O app recebe `tom`, e `acento` vira **roxo** (`visuais.js:45`). Por isso o M6 mostra os 95 "rug mesmo" em roxo (desenho: `#EF4444`) e os 32 "passam despercebidos" em **vermelho** (desenho: `#1F2733`) (`modulo6.js:169-186`; captura `comp-app-m6-prever-o-golpe-03`). **Fazer:** aceitar `cor` (as 5 do desenho) e corrigir as chamadas.
- **[A MAIS] Micro-rótulo `titulo` acima da frase** ("DO QUE O MODELO MARCOU COMO RUG", "DOS RUGS QUE EXISTIAM"…) (`visuais.js:379`). Não existe no desenho nem em `src/data`. Tipo (b).
- **[DIFERENTE] Frase**: o desenho diz "De cada 100 tokens que o modelo marca como rug, cerca de 95 são rug mesmo."; o app, "De cada 100 tokens marcados, cerca de 95 eram rug." (`modulo6.js:175`). O ajuste é da view.

### 6. BarrasNaMesmaEscala

- **[IGUAL] Barra**: altura 28px, sólido `#7C3AED`, tracejado `2px dashed #9AA7B4` com raio 4, listrado a 135° ciano 3/3, rótulo 14/600, valor em mono 14px, nota 13px, legenda 13px e pílula "exemplo inventado" (`visuais.js:390-455`).
- **[DIFERENTE] Legenda do sólido sempre visível**: a legenda "valor medido" aparece mesmo quando nenhuma barra é sólida (`visuais.js:452`, sem condição), e o texto "valor medido" não existe no desenho. **Fazer:** mostrar só quando houver parte sólida; o rótulo vem de quem chama.
- **[A MAIS] Linha de título + "RELAÇÃO: PROPORÇÃO"** (`visuais.js:458`) e a nota extra embaixo (`visuais.js:461`). No desenho do módulo, a figura não tem título: ela vem logo depois da ideia central, dentro do card da seção.
- **[DIFERENTE] Posição**: no desenho, a figura fica **dentro** do card da seção, entre a ideia central e a explicação. No app, fica fora, como irmã do card (`modulo6.js:232-247`; captura `comp-app-m6-02`). A causa está no `criarCardDaSecao` (ver item 12).
- **[IGUAL] Alternativa em texto** gerada dos dados, com `role="img"` (`visuais.js:434-459`).

### 7. CurvaDeslizante

- **[DIFERENTE] O componente inteiro**. Desenho (`00 Componentes`, linhas 452-498, e M6, linhas 124-150): curva x·y = k (tokens × SOL) num SVG 320×230 com max-width 360px, ponto "antes da venda", marcador roxo com borda branca e linhas-guia ciano, lado a lado com o controle em grade `auto-fit minmax(260-280px)`; `<label for>` "Quero que o preço caia" + `<output>`; range com `aria-valuetext`; atalhos "Cair 10%", "Cair 30%", "Cair pela metade", "Pool 10× maior" (40px, texto `#E6EDF3` a 600); dois cartões "VOCÊ RECEBE" / "VOCÊ VENDE" (mono 1,5rem/700, tabular) e a faixa "Liquidez anunciada de US$ 8 mil (exemplo inventado) ≈ US$ 206"; tudo em `aria-live`.
  App (`visuais.js:476-596`): curva preço × % da liquidez que sai, num SVG 660×330 que ocupa a largura toda. Os rótulos "2,57% → −10%" e "14,64% → −50%" ficam fixos no desenho. A linha horizontal é **vermelha** (`#F87171`) e o marcador é ciano com borda escura (`visuais.js:514-516`). O range só tem `aria-label`: não tem `<label>` visível, `<output>` nem `aria-valuetext` (`visuais.js:524`). Os atalhos são "−10%", "−30%", "−50%", "pool 10× maior", com 36px, texto `#9AA7B4` e peso 500 (`visuais.js:556-566`; medido: 36,4px). Os números são 3, em `<dl>` e sem `aria-live`: "O preço cai" (vermelho), "Você vende", "Você recebe" (ciano), em mono 28px/500 (`visuais.js:519-522,579-583`). O título "Arraste: quanto você aceita derrubar o preço?" (`visuais.js:575`) e o título da figura "Quanto sai antes de o preço cair" (`visuais.js:476`) foram criados na implantação.
  **Fazer:** reescrever como o componente genérico `criarCurvaDeslizante({ controle, curva, marcador, numeros, atalhos, alternativas })` do desenho, e montar o M6 "quanto sai" nele com as contas que já existem (`s = 1/√(1−q) − 1`, `recebe = s/(1+s) · ½`).
- **[FALTA NO APP] Uso em M4, M5 e M7**: o README lista a CurvaDeslizante na escada e no tamanho (M4), no impacto e no atrito (M5) e na fração fixa (M7). O app usa lá a `Calculadora` antiga (`calculadora.js`; `modulo4.js:453,480,490`, `modulo5.js:372,409`, `modulo7.js:235`). Revisores dos módulos: confirmar tela a tela.

### 8. LinhaDoTempo (melhoria)

- **[FALTA NO APP] Espaço proporcional ao tempo**: o desenho usa `padding-bottom` = 24px + 1,2px por mês (teto de 96px), com a pílula do intervalo no trilho ("3 anos e 11 meses depois", "5 meses depois"). O app usa `pb-6` fixo, 24px medidos em todos os marcos (`linhaDoTempo.js:25`). **Fazer:** implantar `proporcional` e o rótulo do intervalo (as funções `parse/meses/intervalo` estão no `renderVals` do `00 Componentes`, linhas 752-766).
- **[DIFERENTE] Data**: no desenho, o `<time>` é **JetBrains Mono** 12/600, maiúsculo, com `letter-spacing:.05em` e ciano. No app é **Inter** com `letter-spacing:-0.24px`, porque `.omh-numero` sobrescreve `tracking-wide` e não aplica a fonte mono (`linhaDoTempo.js:41`; medido: `font-family: Inter`). **Fazer:** usar `font-mono` e tirar `omh-numero`.
- **[FALTA NO APP] Legenda dos tons** ("marco neutro · alerta · não verificado · ok"), `href` por marco e `max-width:620px` (`00 Componentes`, linhas 539-556).
- **[DIFERENTE] Moldura**: no desenho, a lista fica dentro da caixa `#0B0F17` (raio 8, padding 20). O app faz um `<section>` card próprio com `<h3>` 18px e a nota numa caixa de raio 12 (`linhaDoTempo.js:59-73`). **Fazer:** a linha do tempo vira a caixa interna de um card de seção; o título vem do card.
- **[IGUAL] Ponto de 16px com borda 2px `#141A24`, cores por tom, trilho de 2px e alternativa em texto na `<ol>` com `<time>`**.

### 9. ComparacaoLadoALado (melhoria da TabelaComparativa)

- **[FALTA NO APP] O componente**. Desenho: `<table>` de verdade (min-width 560px, numa área que rola com `tabindex="0"` e `role="group"`), critérios nas linhas, a linha decisiva com borda-esquerda de 2px `#22D3EE`, fundo ciano a 6% e "critério decisivo", células com tom (ok, atenção, alerta, neutro) em pílula de raio 6, frase final em 13px. No celular: um card por opção, com o critério decisivo primeiro. App: grade de cards (`sm:grid-cols-2 xl:grid-cols-3`) em todas as larguras, cada card com `<dl>` e "Ver mais" em `<details>` (`comparisonTable.js:19-79`; captura `comp-app-m1-carteiras-03`). **Fazer:** criar `montarComparacaoLadoALado({ criterios, opcoes })` com um adaptador para `{ colunas, linhas }`, e marcar `decisivo`/`tom` nos dados.
- **[A MAIS] "Ver mais" com `detalheExtra`** (`comparisonTable.js:51-76`): conteúdo de `src/data` que o desenho não mostra. Tipo (c).

### 10. Animacao (só o motor)

- **[DIFERENTE] Controles**: no desenho da Fase 4, os botões são "← Voltar cena", "Tocar/Pausar/Tocar de novo" e "Avançar cena →", com **44px**; os secundários têm fundo `#0B0F17`, porque ficam dentro de um card `#141A24`. No app, os botões são "Voltar", "Tocar", "Avançar", com **40px** e fundo `#141A24` (`animacoes.js:23-26,87-89`). **Fazer:** 44px e os rótulos da Fase 4.
- **[DIFERENTE] Barra de cenas**: no desenho, cada segmento é um botão de 44px com o número da cena embaixo (mono 11px). No app, o botão tem 24px e não tem número (`animacoes.js:92`).
- **[DIFERENTE] Contador e "reduzir movimento"**: no desenho da Fase 4, a linha de cima tem "cena N de M" à esquerda e a caixa "Reduzir movimento: cenas paradas, lado a lado" à direita. Marcar a caixa (ou ter `prefers-reduced-motion`) **troca** o palco e os controles pela grade de cenas paradas. No app, o contador fica ao lado dos botões, a caixa se chama "Ver as cenas paradas, lado a lado" e **acrescenta** a grade sem tirar o palco. Com "reduzir movimento", o app mostra palco + "Próxima cena" + grade ao mesmo tempo (`animacoes.js:86,100,180-202`). O "Tocar vira Próxima cena" é do `00 Componentes`; a Fase 4 e o README pedem a troca pela grade. **Fazer:** seguir a Fase 4 (README, Animações: "trocando o palco pela grade de cenas paradas").
- **[DIFERENTE] Palco e teclado**: no desenho, um invólucro `role="group"` com `tabindex="0"` e `aria-label="Palco da animação. Espaço toca ou pausa; setas trocam a cena."` envolve a figura `role="img"`. No app, o próprio palco é `role="img"` com foco (`animacoes.js:82,168`), e ninguém avisa as teclas. As teclas espaço, ← →, Home e End: iguais.
- **[DIFERENTE] Legenda**: 17px (1,0625rem) no desenho da Fase 4; 15px no app (`animacoes.js:85`).
- **[DIFERENTE] "Ler como texto"**: no desenho, cada `<li>` é legenda + alt, tudo em `#9AA7B4`, com padding 12px 16px. No app, o alt vai em `#6B7889`, **cor fora da paleta**, com 4,3:1 sobre `#0B0F17` (reprova AA em 14px), e o padding é 10px 14px (`animacoes.js:204-207`).
- **[A MAIS] Micro-rótulo "ANIMAÇÃO · 8 CENAS · ~32 S" e `figcaption`** (`animacoes.js:216-218`). No desenho, a duração aparece só no cabeçalho da página da animação. Tipo (b).
- **[IGUAL] Legenda `aria-live`, segmento com `aria-label="Cena N: legenda"` e `aria-current`, cores da barra (roxo, ciano, `#1F2733`), `aria-pressed` no Tocar e troca de cena de 400ms `ease`** (`custom.css:483-496`).

### 11. Página de módulo: moldura (`PaginaDeModulo.dc.html` + casca de `M1..M7 Desktop`)

- **[DIFERENTE] Sidebar: rótulos das rotas**: no desenho, "M1 Fundamentos & Segurança", "M2 Psicologia", "M3 Os dois pilares", "M4 Gestão & decisão", "M5 Execução", "M6 Ler a tela", "M7 A rotina", "Checklist antes de comprar". No app, "Módulo 1" … "Módulo 7" e "Checklist" (`router.js:39-110`, campo `curto`). **Fazer:** trocar `curto` (e usar `min-w-0 truncate`, que já existe, ou deixar quebrar em 2 linhas como no desenho).
- **[DIFERENTE] Sidebar: ordem e separador**: no desenho, Início → M1..M7 → **separador de 1px `#1F2733`** → Glossário → Checklist → Revisão. No app, Início → Módulos → Checklist → Revisão → Glossário, sem separador (`router.js` ordem do array; `sidebar.js:167-171`). **Fazer:** reordenar e inserir o `<li>` separador.
- **[DIFERENTE] Sidebar: cabeçalho**: no desenho, só "onchain-mastery-hub" (14/600), sem linha embaixo, com padding de 20px 16px. No app, a linha fica em cima de "Hub de estudos on-chain — material de estudo próprio." e há uma borda embaixo (`sidebar.js:160-165`). O subtítulo e a borda vêm do Sidebar do DS (`_ds_bundle.js:3887`), mas as telas redesenhadas não têm. **Fazer:** tirar o subtítulo e a borda, ou pedir a decisão ao dono.
- **[DIFERENTE] Sidebar: rota ativa**: no desenho, peso **600**, borda `#7C3AED` e fundo 15%. No app, peso **500** (`sidebar.js:31`, `font-medium`). **Fazer:** `font-semibold`.
- **[A MAIS, tipo (a)] Sidebar: %, barrinha de progresso por rota, "Instalar app", "Limpar progresso" e a nota do localStorage** (`sidebar.js:88-100,173-197`). São funções reais do app, e o Sidebar do DS também tem (`_ds_bundle.js:3965-3977`), mas nenhuma tela da Fase 2 ou 3 mostra. **Decisão do dono**: manter (visual alinhado ao DS) ou esconder o % na sidebar.
- **[IGUAL] Sidebar: largura 16rem (256px medidos), fundo `#141A24`, borda-direita, sticky, links 14px com raio 8 e padding 8px 12px**.
- **[DIFERENTE] Cabeçalho do módulo**: no desenho, o micro-rótulo "MÓDULO 6" (12/600, maiúsculo, .05em, `#9AA7B4`) fica acima do `<h1>` "Ler a tela" (1,875rem/600, altura de linha 1,25, margin-top 4px). No app, um `<h1>` só com "Módulo 6 — Ler a tela", sem micro-rótulo, em `text-2xl sm:text-3xl` (24px no celular; o desenho usa 30px também no celular) (`ui.js:192-197`; `modulo6.js:468`, `modulo1.js:414`, `modulo2.js:556`, `modulo3.js:728`, `modulo4.js:639`, `modulo5.js:604`, `modulo7.js:400`). **Fazer:** dar a `criarTitulo` um parâmetro `rotulo` (micro-rótulo) e passar `rotulo: 'Módulo 6', texto: 'Ler a tela'` nas 7 views.
- **[DIFERENTE] "Lembrete" no cabeçalho**: no desenho, fica dentro do `<header>`, com margin-top 16px, padding 12px 16px, fundo âmbar 12% e borda 40%. No app, padding 12px nos quatro lados, fundo 10% e `mb-6`, fora do header (`modulo6.js:469-481` e iguais nas outras views). Diferença pequena.
- **[DIFERENTE] Abas (`criarAbas`)**: no desenho, `min-height:44px`, padding 8px 16px, peso **600** e texto `#E6EDF3` em **todas**, hover com borda `#9AA7B4` e **nenhuma linha embaixo do tablist**. No app, 38px medidos, padding 8px 12px, peso 500, inativas em `#9AA7B4` e `border-b border-borda pb-4` (`ui.js:334,339-343`). O teclado (← → Home End, `tabindex` roving) é igual. **Fazer:** ajustar as classes em `ui.js`.
- **[IGUAL] Destaques** (`destaques.js:26-47` × `_ds_bundle.js:2980-3040`): card `omh-destaque` de raio 12 e padding 20, número `omh-numero-grande`, 2 ou 3 colunas. Diferenças pequenas: o rótulo usa `tracking-wide` (.025em) em vez de .05em. No celular, o app empilha em 1 coluna e o protótipo celular do desenho espreme 3 colunas (captura `comp-desenho-m6-cel-02`, defeito do protótipo): **manter o app**.
- **[DIFERENTE] Termos desta aba** (`didatica.js:247-267`): no desenho do módulo, a grade é `repeat(auto-fit, minmax(200px,1fr))`; no app, `sm:grid-cols-3` fixo (com 2 termos sobra um buraco). Estilo dos textos: igual.
- **[DIFERENTE] Card da seção** (`secao.js:80-132`): o estilo é igual ao CardDaSecao do DS (ideia central com borda-esquerda de 2px ciano, 16/600). Mas nos módulos o desenho monta a seção como coluna com `gap:16px` e **o visual logo depois da ideia central**, antes da explicação. Depois vêm o "Para ir mais fundo" e a **"Pergunta rápida"** (Quiz do DS). `criarCardDaSecao` não tem lugar para o visual nem para a pergunta, e as views penduram os visuais **fora** do card (`modulo6.js:232-258`). **Fazer:** acrescentar `visual` (nó) e `pergunta` (nó) ao `criarCardDaSecao`, na ordem título → ideia central → visual → parágrafos/quadro → exemplo → detalhe → pergunta.
- **[DIFERENTE] "Para ir mais fundo"**: nos módulos do desenho, `<summary>` 14/**600** com o triângulo nativo e padding 12px 16px. No app, 14/**500** com "▾" próprio e padding 12px (`secao.js:48-60`), como no CardDaSecao do DS. Diferença pequena: escolher uma forma só (a dos módulos).
- **[DIFERENTE] Pergunta rápida por seção**: o desenho usa o **Quiz do DS** com `titulo="Pergunta rápida"`: fieldset, rádios, "Quão certo você está?", "Ver resultado", "0 de 1 perguntas respondidas". A expressão "Pergunta rápida" aparece 8 vezes no arquivo do M6 e 15 no do M1. O app usa dois componentes que o desenho não tem: "ANTES DE LER: O QUE VOCÊ ACHA?" (`didatica.js:103-141`) e "CONFIRA ANTES DE SEGUIR", com botões, sem confiança e com "Tentar de novo" (`didatica.js:154-237`). **Fazer:** usar `montarQuiz({ id:'m6-check-q1', titulo:'Pergunta rápida', perguntas:[q] })`. Cuidado: `inicio.js:108` conta `Object.keys(estado.quizzes)`. Pôr no `montarQuiz` uma opção `salvar:false` (ou filtrar os ids `modulo-N` no Início) para a "Pergunta rápida" não inflar o "Quizzes X/7".
- **[IGUAL, com diferença pequena] Quiz** (`quiz.js` × `_ds_bundle.js:930-1205`): mesma estrutura, mesmos textos ("Certa — foi a sua", "Por que a sua não serve:", "Certeza e erro…", "Estas perguntas voltam amanhã…"), `data-quiz-resumo` com foco. Os tons de correção usam borda 60% + fundo 10% (`quiz.js:112-113`), e o DS e o README pedem borda 40–50% + fundo 12%. **Fazer:** `border-risco-baixo/50 bg-risco-baixo/12` (idem vermelho).
- **[IGUAL] Checklist** (`checklist.js` × `_ds_bundle.js:2097-2220`): item com raio 12 e padding 16, caixa de 20px, etiqueta, "porque" sempre visível, "Onde checar:", marcado em verde 50%/5% com `line-through`. Diferença pequena: a etiqueta usa `tracking-wide` (.025em) em vez de .05em (`checklist.js:17-18`).
- **[IGUAL, abaixo de 44px] Botao** (`ui.js:289-318` × `_ds_bundle.js:663-698`): raio 8, padding 8px 16px, 14/600, primário branco sobre `#7C3AED` com hover a 85%, secundário, fantasma, disabled a .5. Mede 38px, abaixo dos 44px do README ("Alvo de toque mínimo 44px em todo botão").
- **[DIFERENTE] Rodapé de aviso**: no desenho, é um card âmbar **dentro da coluna de conteúdo**, última peça do `gap:24px`: raio 12, borda `rgba(245,158,11,.4)`, fundo .12, padding 16, 14px `#9AA7B4`, "**Aviso:** material de estudo próprio, **não é recomendação de investimento**. Memecoin é o ativo de maior risco…". No app, é um `<footer>` de largura total, só texto com linha em cima, e **falta "não é recomendação de investimento"** (`index.html:117-123`). **Fazer:** trocar pelo card âmbar dentro de `#conteudo`, com o texto completo. (O Início do desenho não tem esse rodapé: ele usa "Antes de tudo:".)
- **[DIFERENTE] Largura do conteúdo**: no desenho, `max-width:868px` + padding de 32px 24px (medido: 868px de conteúdo a 1280px). No app, `max-w-5xl` (1024px) dentro de `main` com `lg:px-10`: 934px medidos (`modulo6.js:518`; `index.html:115`). **Fazer:** `max-w-[868px]` com `px-6 py-8` (ou `--omh-conteudo-max`), e o `space-y-6` de 24px entre blocos.
- **[A MAIS, tipo (a)] Barra de progresso global de 4px no topo** (`index.html:83-86`) e "Pular para o conteúdo": estão no DS, não nas telas. Manter.

### 12. Tokens, tipografia, cores, raios, foco e toque

- **[IGUAL] Paleta**: os 13 hex existem (`index.html:52-65` + `custom.css:7-18,194-195`). `superficie-alta` e `superficie-baixa` só existem como variável CSS, não como utilitário do Tailwind (`index.html:51-71`). Diferença pequena.
- **[DIFERENTE] Cores fora da paleta**: `#6B7889` (`animacoes.js:207`, texto que reprova AA). O `#FFFFFF`/`#fff` do texto do botão primário (`animacoes.js:26`, `custom.css:60`, `ui.js:292`) é o mesmo do desenho e do DS, então não conta como desvio. Nos dados, `classDef` com `#3B1418`, `#FCA5A5`, `#0E2A1B`, `#86EFAC`, `#3A2A0E`, `#FCD34D` (`checklist.js:383-384`, `modulo2.js:528-529`): o fluxograma novo ignora, mas eles voltam se cair no Mermaid.
- **[IGUAL] Fontes**: Inter 400–700 e JetBrains Mono 400/500 pelo Google Fonts (`index.html:44`), iguais ao desenho. A escala 12/14/16/18/20/24/30 do Tailwind bate.
- **[IGUAL] Raios**: 12 (card), 8 (caixa e botão), 999 (pílula). Exceção: a nota da linha do tempo usa 12 numa caixa interna (`linhaDoTempo.js:69`).
- **[IGUAL] Foco**: `:focus-visible` com 2px `#22D3EE`, offset 2 e raio 4 (`custom.css:35-39`), e exceções para `#conteudo` e os resumos (`custom.css:44-50`), como no DS.
- **[DIFERENTE] Alvo de toque (medido)**: links da sidebar com 38px, abas com 38px (desenho 44), botões `criarBotao` com 38px, atalhos da curva com 36px (desenho 40), botões da animação com 40px (desenho 44), segmentos da animação com 24px (desenho 44), botão do menu no celular com 38px (desenho 44), ramos do mapa no celular com 40px (desenho 44). Os links da sidebar também medem 38px no desenho.

## A mais no app (não está no desenho)

- Título + micro-rótulo "RELAÇÃO: …" em todo visual (`visuais.js:53-67`, com padrões em `visuais.js:82,191,268,405,592`) — tipo (b). No desenho, "Relação: …" só aparece nas telas gerais (Início, Checklist, Glossário, Revisão), no cabeçalho do card; nos 7 módulos, nunca.
- Títulos de visual criados na implantação, que não estão no desenho nem em `src/data` (grep feito): "Mapa do módulo" (visível; no desenho é só `aria-label`, `visuais.js:162`), "Mapa do glossário" (`glossario.js:24`), "A trilha, do começo ao fim" (`inicio.js:248`), "O laço que faz o conteúdo ficar" (`inicio.js:360`), "O golpe, do anúncio à carteira vazia" (`modulo1.js:231`), "Régua 1: parou de negociar no mesmo dia" e "Régua 2: liquidez abaixo de US$ 1.000" (`modulo2.js:413,422`), "O laço, em círculo" (`modulo2.js:442`), "As quatro fases, uma de cada vez" (`modulo2.js:453`), "O ciclo, em círculo" (`modulo3.js:199`), "O sinal social contra o custo de operar" (`modulo3.js:210`), "Depois do tweet: o primeiro dia e os trinta" (`modulo3.js:226`), "A escada, degrau a degrau" (`modulo4.js:359`), "O ganho que cada perda exige só para voltar ao começo" (`modulo4.js:377`), "O sanduíche: por que o slippage alto atrai bot" (`modulo5.js:303`), "Como o volume aparece do nada" (`modulo6.js:194`), "O exemplo da seção, em barras na mesma escala" (`modulo6.js:236`), "Do que o modelo marcou como rug" / "Dos rugs que existiam" (`modulo6.js:170,179`), "A ruína do apostador, em 100 jogadores" (`modulo7.js:157`), "O que um efeito de 0,40 quer dizer" (`modulo7.js:169`), "Quanto sai antes de o preço cair" e "Arraste: quanto você aceita derrubar o preço?" (`visuais.js:476,575`) — tipo (b).
- Palavras de centro de ciclo: "estudo" (`inicio.js:366`), "recompensa" (`modulo2.js:444`), "atenção" (`modulo3.js:201`) e "acertou?" (`revisao.js:454`), no lugar dos textos do desenho — tipo (b).
- Legenda em `<ol>` embaixo do ciclo (`visuais.js:327-337`) — tipo (b).
- Micro-rótulo "ANIMAÇÃO · N CENAS · ~S S" e a caixa "Ver as cenas paradas, lado a lado" (`animacoes.js:100,218`) — tipo (b).
- Legenda "valor medido" das barras (`visuais.js:452`) — tipo (b).
- Nó de referência "↩ …" no fluxograma (`fluxograma.js:146`) — tipo (b).
- Segmentos "PARTE N DE M — …" com "Continuar: …" / "Mostrar tudo" / "N de M partes abertas" (`didatica.js:27-89`): nenhum módulo do desenho tem — tipo (b).
- "ANTES DE LER: O QUE VOCÊ ACHA?" (`didatica.js:103-141`) e "CONFIRA ANTES DE SEGUIR" (`didatica.js:154-237`): o desenho usa o Quiz "Pergunta rápida" — tipo (b) (as perguntas são de `src/data`).
- "Ver mais" com `detalheExtra` na comparação (`comparisonTable.js:51-76`) — tipo (c).
- Sidebar: %, barrinha por rota, "Instalar app", "Limpar progresso", nota do localStorage e subtítulo do cabeçalho (`sidebar.js:88-100,160-197`) — tipo (a). Estão no DS, mas não nas telas.
- Barra de progresso global no topo (`index.html:83-86`) e botão "☰ Menu" com a palavra "Menu" (`index.html:105-110`) — tipo (a). No celular, o desenho tem só "☰" em 44×44.
- Caminho do Mermaid por CDN (`diagrama.js:25,135-289`) — tipo (a), função de reserva que o desenho manda tirar ("sem CDN, sem reserva").

## Números

- Nenhum número sem origem nos componentes. Conferidos com grep: 2,57%, 14,64%, 5,41%, 41,42%, 19,52%, 8,17%, US$ 8 mil, US$ 206 e US$ 1.171 (`src/data/modulo6.js:73,102,115,119,125-127,904-917`); 1·3·7·16·35 (`ESCADA_DIAS`, `src/components/revisao.js:20`); do desenho, 55,8 mi, US$ 75 bilhões, CVM 826, Lei 14.754, Z.ro, US$ 50 mil e 1 bilhão (`src/data/modulo1.js`, `modulo6.js`).
- Duplicação, não invenção: "2,57% → −10%" e "14,64% → −50%" estão escritos à mão no SVG e no `aria-label` da curva (`visuais.js:494,509,511`), e "1, 3, 7, 16 e 35 dias" está fixo no texto do quiz (`quiz.js:300`). Se o dado mudar, a tela não acompanha. Ler de `modulo6.js` e de `ESCADA_DIAS`.

## Celular

- Não há rolagem lateral (medido: `scrollWidth` 390 em `#/modulo-6`). O cabeçalho tem "☰ Menu" com 38px; o desenho tem "☰" sozinho em 44×44, com padding 10px 16px (`index.html:103-112`).
- Mapa: fica vertical como no desenho, mas os ramos têm 40px (o 44px do CSS perde para o estilo em linha, `visuais.js:100`), o centro não estica (`visuais.js:86`), há caixa dentro de caixa e as folhas são títulos longos que quebram em 2–3 linhas (captura `comp-app-m6-cel-01` × `comp-desenho-m6-cel-01`).
- Curva do M6: o SVG 660×330 encolhe para 324px e os textos de 12px viram **~5,9px**, ilegíveis (medido). No desenho, o SVG de 320px mantém os textos em 11px.
- `<h1>` do módulo com 24px (o desenho usa 30px), sem micro-rótulo. Abas com 38px (desenho 44). Fluxograma empilhado sem a borda colorida por ramo.

## Trabalho para implantar

**`src/components/visuais.js`**
- `moldura()`: parar de desenhar título e "Relação" por padrão; o visual passa a ser só a caixa interna `#0B0F17` (raio 8, padding 16–20). "Relação" vira opção usada apenas pelas telas gerais, no cabeçalho do card. — M
- `criarMapaMental` / `criarMapaDoModulo`: section-card com "O módulo inteiro numa olhada" e caixa interna única; centro sem "MÓDULO N" nos módulos; ramo do Quiz; ramo ativo roxo sincronizado com as abas; `concluido` vindo do store; estilos em linha → classes (44px no celular, centro esticando). — M
- `criarSequencia`: corrigir o texto duplicado no desktop (`display` em linha); `tabindex="0"` no `<ol>` que rola. — P
- `criarCiclo`: texto do centro vindo do desenho de cada tela, com `cor` opcional; tirar a legenda `<ol>` extra. — P
- `criarGradeDe100`: aceitar `cor` com as 5 cores do desenho; tirar o micro-rótulo `titulo`. — P
- `criarBarrasNaMesmaEscala`: legenda do sólido só quando existir; tirar título, "Relação" e nota extra. — P
- `criarCurvaDeSaida` → novo `criarCurvaDeslizante` genérico (SVG 320×230, `<label>` + `<output>` + `aria-valuetext`, atalhos de 40px, cartões "Você recebe/Você vende" + faixa em dólar, `aria-live`, "Pool 10× maior" como alternativa). — G

**`src/components/fluxograma.js` + `src/components/diagrama.js`**
- Aceitar `{ nos, setas }`; legenda de 13px dentro da caixa; tirar o card de fora (`diagrama.js:126`); borda colorida por ramo no celular; "↩" → "⇢" com `aria-hidden`; `overflow-x:auto` + `tabindex="0"` quando largo; tirar o caminho do Mermaid por CDN depois de migrar os dados. — G
- `src/data/modulo1.js:1500-1504` (e o que mais aparecer): acentuar os textos dos diagramas. — P

**`src/components/linhaDoTempo.js`**
- Espaço proporcional (24 + 1,2px/mês, teto 96), pílula de intervalo, `<time>` em `font-mono` com .05em, legenda de tons, `href`, max-width 620px, virar caixa interna em vez de card próprio. — M

**`src/components/comparisonTable.js`**
- Novo `montarComparacaoLadoALado({ criterios, opcoes })`: `<table>` ≥ 640px com linha decisiva e tons; cards no celular com o decisivo primeiro; adaptador para `{ colunas, linhas }`. — G

**`src/components/animacoes.js` (só o motor)**
- Botões de 44px com "← Voltar cena" / "Avançar cena →"; segmentos de 44px com número; "cena N de M" + caixa "Reduzir movimento: cenas paradas, lado a lado" em cima; reduzir movimento **troca** palco e controles pela grade; invólucro `role="group"` com as teclas no `aria-label`; legenda de 17px; tirar `#6B7889` (usar `#9AA7B4`); tirar o micro-rótulo "ANIMAÇÃO · …". — M

**`src/components/secao.js`**
- Lugar para `visual` depois da ideia central e para `pergunta` no fim; seção em coluna com `gap:16px`; "Para ir mais fundo" em 600 com o marcador nativo. — M

**`src/components/quiz.js`**
- Tons de correção 50%/12%; opção `salvar:false` (ou id fora da contagem) para servir de "Pergunta rápida"; `src/views/inicio.js:108` contar só os ids `modulo-N`. — P

**`src/components/didatica.js`**
- Tirar das views `montarSegmentos`, `montarPerguntaPrevia` e `montarPerguntaDaParte`, trocando pelo Quiz "Pergunta rápida" dentro de cada card; `montarTermos` com `repeat(auto-fit,minmax(200px,1fr))`. — M (a troca nas 7 views fica com os revisores de cada módulo)

**`src/ui.js`**
- `criarTitulo({ rotulo, texto, subtitulo })` com micro-rótulo e h1 de 30px (line-height 1,25) também no celular. — P
- `criarAbas`: 44px, padding 8px 16px, 600, texto `#E6EDF3`, sem `border-b pb-4`. — P
- `criarBotao`: `min-h-11` (44px). — P

**`src/router.js` + `src/components/sidebar.js`**
- `curto` = "M1 Fundamentos & Segurança" … "M7 A rotina", "Checklist antes de comprar"; ordem Glossário → Checklist → Revisão; separador depois do M7; ativa em 600; cabeçalho só com o nome; % / Instalar / Limpar: **decisão do dono**. — P

**`index.html` + `styles/custom.css`**
- Rodapé → card âmbar dentro da coluna, com "não é recomendação de investimento". — P
- Coluna com 868px + padding de 24px; cabeçalho do celular com "☰" em 44×44. — P
- `superficie-alta` e `superficie-baixa` no `@theme`. — P

**7 views de módulo** (`modulo1.js:414` … `modulo7.js:400`, `modulo6.js:467-518`)
- Cabeçalho "MÓDULO N" + nome; "Lembrete" dentro do header, com padding 12px 16px; visuais para dentro dos cards (depende de `secao.js`). — M

**Componentes novos que precisam existir**
- `criarCurvaDeslizante` genérico. Dá para aproveitar a conta de `criarCurvaDeSaida` (`visuais.js:526-554`) e o CSS `.omh-range`, que já está igual ao do desenho.
- `montarComparacaoLadoALado`. Dá para aproveitar os dados `{ colunas, linhas }` com um adaptador; o `<details>` "Ver mais" vira opcional.
- Seção "Mapa do módulo" como card, que pode ser um invólucro de `criarMapaMental`.
- Rodapé de aviso como componente (hoje é HTML fixo em `index.html`). Pode reaproveitar o estilo do "Lembrete" das views.
