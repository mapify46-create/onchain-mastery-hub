# Animações (Fase 4) — desenho × app

Desenhos: `pesquisa/design/handoff/designs/Animacao 1..6 - *.dc.html`. App: `src/components/animacoes.js` (motor em 75–229, uma função por animação) e `styles/custom.css:483-496`.
Capturas feitas cena a cena, clicando no segmento N da barra de cenas e copiando o palco depois de 1 s:
`scratchpad/shots/anim/dN-cenas-*.png` (desenho) × `aN-cenas-*.png` (app), `dN-parado-*` × `aN-parado-*` (modo "cenas paradas"), `aN-cel-01.png` e `d2-cel-01.png` (390 px).

## Resumo

O conteúdo bate: as 6 animações têm o mesmo número de cenas (8, 8, 8, 7, 8, 7), a mesma duração por cena e as mesmas 46 legendas, textos e números. Os arrays de cenas foram copiados do desenho quase literalmente.
A diferença está em três lugares:
1. **Moldura e controles.** O motor seguiu a ficha antiga do componente (`00 Componentes.dc.html:659-721`, Fase 1) e não o contrato da Fase 4. Os botões têm 40 px, os segmentos da barra 24 px e não têm número. O contador fica ao lado dos botões, a caixa de marcar fica embaixo, e existe o botão "Próxima cena".
2. **Palcos.** Os 6 palcos foram montados de outro jeito. O desenho compõe cada palco com uma hierarquia própria (bloco largo em cima e duas colunas embaixo, ou gráfico à esquerda e números à direita). O app achatou tudo numa grade de 3 ou 4 cartões iguais, o que espreme endereços, barras e rótulos.
3. **Modo "cenas paradas".** Está quebrado. O app copia o palco inteiro para células de 260 px: o Drainer vira uma página de 12,4 mil px com uma letra por linha, e Caminho e Address poisoning transbordam. O modo liga sozinho para quem tem "reduzir movimento" no sistema.

---

## Motor comum (vale para as 6)

Na ordem do desenho, de cima para baixo:

- **[DIFERENTE] Moldura**
  - Desenho: `section` com fundo `#141A24`, raio 12, padding 20, gap 14. O palco dentro dela é `#0B0F17`, com padding 20.
  - App: `figure` `bg-fundo #0B0F17`, raio 8 (`rounded-lg`), padding 16/20, gap 12 (`animacoes.js:215`). O palco é `#10151E` com padding 16 (fundo dos 6 palcos, ex. `:293`, `:405`, `:523`). As superfícies estão invertidas: no desenho a moldura é clara e o palco afunda.
  - Fazer: moldura `#141A24` raio 12, palco `#0B0F17` padding 20.
- **[DIFERENTE] Cabeçalho**
  - Desenho: página própria com sobrancelha "ANIMAÇÃO 1 · MÓDULO 6 · 32 S", h1 (ex.: "Pool x·y = k: por que cada venda sai mais barata") e parágrafo de fonte. Dentro da moldura, no topo: "cena 1 de 8" (mono 13, `#9AA7B4`) à esquerda e a caixa de marcar à direita.
  - App: `figcaption` 14 px com título próprio, pílula "exemplo inventado" e "ANIMAÇÃO · 8 CENAS · ~32 S" (`:216-219`). O contador está na linha dos botões, com `margin-left:auto` (`:86`, `:222`).
  - Fazer: contador e caixa de marcar no topo. Usar como título o h1 do desenho, e a sobrancelha no lugar do "~32 S".
- **[DIFERENTE] Caixa "Reduzir movimento"**
  - Desenho: no topo da moldura, rótulo "Reduzir movimento: cenas paradas, lado a lado". Marcada, ela **troca** palco, legenda, controles e barra por uma grade `auto-fill minmax(230px)` de **miniaturas simplificadas** feitas para cada animação: "cena N" em mono 11, desenho mínimo e legenda 13/600. Fica marcada sozinha por `matchMedia` (`componentDidMount`).
  - App: "Ver as cenas paradas, lado a lado", **embaixo** da barra (`:100`, `:224`). A grade é **somada** ao palco animado, `auto-fit minmax(260px)`, e cada célula é uma **cópia inteira do palco** (`:180-196`).
  - Resultado medido:
    - Pool: os números quebram ("5,41 / %", "41,4 / 2%").
    - Drainer: 12.433 px de altura, texto uma letra por linha (`a2-parado-02.png`).
    - Caminho: trilha esmagada, "1,2" cortado.
    - Address poisoning: cartões saindo da célula.
  - Com reduzir movimento no sistema, o app marca a caixa sozinho (`:199-202`) e "Tocar" vira "Próxima cena", que volta ao início depois da última (`:111`, `:152`). Isso vem da ficha da Fase 1 (`00 Componentes:703`) e a Fase 4 substituiu.
  - Fazer: caixa no topo, modo que substitui o palco, miniatura própria de cada animação, e tirar "Próxima cena".
- **[DIFERENTE] Palco (acessibilidade)**
  - Desenho: `div tabindex=0 role="group" aria-label="Palco da animação. Espaço toca ou pausa; setas trocam a cena."`, com um `role="img" aria-label=alt` dentro.
  - App: o próprio palco é `role="img"` e `tabindex=0` (`:82`, `:168`). Resultado: `role=img` num elemento que recebe foco e trata teclas, e o leitor de tela não anuncia as teclas.
  - Fazer: separar o grupo focável da imagem, como no desenho.
- **[DIFERENTE] Legenda**
  - Desenho: 1,0625 rem (17 px), 600, centralizada, `min-height:48px`.
  - App: 15 px (`:85`, medido 15 px).
- **[DIFERENTE] Controles**
  - Desenho: "← Voltar cena", "Tocar" e "Avançar cena →". Altura mínima 44 (medido 44), fundo `#0B0F17`. "Tocar" tem `min-width:110`.
  - App: "Voltar", "Tocar" e "Avançar". Altura mínima 40 (medido 70×40, 120×40, 86×40), fundo `#141A24`, "Tocar" com `min-width:120` (`:23-26`, `:87-89`). Não atinge o alvo de toque de 44 px.
- **[DIFERENTE] Barra de cenas**
  - Desenho: cada `<button>` tem `min-height:44`, um traço de 6 px e o **número da cena** embaixo (mono 11; o atual em `#E6EDF3`, os outros em `#9AA7B4`).
  - App: botão de 24 px de altura (medido 106×24), sem número (`:91-96`).
  - Iguais: `aria-label="Cena N: legenda"`, `aria-current`, e as cores roxo, ciano e `#1F2733`.
- **[IGUAL] Teclado:** espaço, ← → e Home/End no palco (`:169-178`).
- **[IGUAL] Ritmo:** duração e transição por animação iguais: Pool 4000/500, Drainer 4000/400, Sandwich 4000/450, Caminho e Narrativa 4500/450, Address poisoning 4500/450.
- **[DIFERENTE] Transições**
  - Desenho: transição em `transform` (o marcador da Pool desliza), `margin-left` (recuo da fila do Sandwich), `color`, `cx`/`cy` (Caminho).
  - App: `.omh-anim-transicao` (`custom.css:483-491`) só cobre height, width, opacity, transform, background-color e border-color. Os marcadores mudam `cx`/`cy` por atributo (`:320-325`, `:653-654`) e o recuo por `marginLeft` (`:538`), então **pulam sem animar**.
- **[DIFERENTE] "Ler como texto"**
  - Desenho: `<ol>` **numerada**, 14 px `#9AA7B4`, com "legenda alt" separados por espaço.
  - App: `<ol>` sem número (`list-style: none` do reset do Tailwind, medido). O texto alternativo sai em `#6B7889` (`:207`), cor fora da paleta com **4,27:1** sobre `#0B0F17`, abaixo de AA. Falta o espaço antes do travessão ("outro.— Duas barras"), porque o `html`` ` faz `.trim()` (`ui.js:67`).
- **Nota do app:** parágrafo `text-xs` no pé de cada animação (`:227`). O desenho põe a fonte no parágrafo do cabeçalho da página, e não tem nota no pé. Aceitável como adaptação (ver "A mais no app").
- **Código morto:** `caixaDoPalco` (`:232`) é declarada e nunca usada.

---

## Animação 1 — Pool x·y = k

**Onde aparece:** M6, aba "Os números", Parte 2 "Quanto dá para vender" (`modulo6.js:252-258`). Vem logo depois de `criarCurvaDeSaida`, e a parte fica escondida até o aluno clicar em "Continuar".

**Título:** desenho "Pool x·y = k: por que cada venda sai mais barata"; app "Por que cada venda sai mais barata que a anterior" (`:338`).

**[DIFERENTE] Composição do palco**
- Desenho: grade `auto-fit minmax(280px)`.
  - **Gráfico à esquerda:** SVG 320×220, curva `#9AA7B4` e um **anel oco "antes da venda"** fixo em (40,20). O marcador é **roxo `#7C3AED` com borda `#E6EDF3`**, r 7, desliza por `transform` e leva **duas guias tracejadas** ciano, uma até a base e outra até o eixo Y. Rótulo X "tokens na pool →" centralizado; rótulo Y "SOL na pool →" girado 90°. "x · y = k" em mono, **dentro do SVG, no canto inferior direito**, passa de `#1F2733` a `#22D3EE`.
  - **À direita:** barras de 72 px em área de 120 px, gap 32. Abaixo, 3 cartões "VENDE" / "PREÇO CAI" / "RECEBE" (rótulo 10 px, valor 1,125 rem 700, fundo `#141A24`; as bordas acendem roxo, vermelho e ciano). Por último, um cartão "Liquidez US$ 8 mil [exemplo inventado] … ≈ US$ 206" que só aparece (opacidade) quando há valor em dólar.
- App: **lados trocados** (`:293-307`).
  - **À esquerda:** "A POOL" + pílula "x · y = k" e barras de 80 px em área de 160 px, gap 40 (`:265-300`).
  - **À direita:** gráfico 320×200 **sem o anel "antes da venda"**. O marcador é **ciano `#22D3EE` com borda escura de 3 px** (`:271`) e só tem a guia vertical (`:272`). O rótulo "SOL (y)" é horizontal em (12,20) e **fica coberto pelo marcador** nas cenas 1–2 (a captura mostra "SOL ●)"); "tokens na pool (x) →" fica à direita (`:277-278`).
  - Cartões "VOCÊ VENDE" / "O PREÇO CAI" / "VOCÊ RECEBE", rótulo 12 px, valor 20 px 600, fundo `#0B0F17` (`:284-290`).
  - A liquidez é texto corrido **sempre visível**: "Liquidez anunciada: US$ 8 mil · você recebe ≈ US$ 206", sem pílula ao lado (`:291`, `:332`).

**Cena a cena** (a legenda é igual nas 8)

| Cena | Desenho | App |
|---|---|---|
| 1 | Marcador roxo sobre o anel inicial; "x·y = k" apagado; barras x = 1,00 e y = 1,00; cartões "—"; linha de liquidez invisível | Marcador ciano em cima do rótulo "SOL (y)"; pílula x·y = k neutra; cartões "—"; "Liquidez anunciada: US$ 8 mil" já à mostra |
| 2 | Igual à 1, com "x · y = k" aceso em ciano no SVG | A pílula acende (borda e texto ciano) |
| 3 | Marcador desce para (1,05; 0,95) com guia horizontal e vertical; o anel "antes da venda" fica no começo; VENDE 5,41% (borda roxa), PREÇO CAI −10% (borda vermelha), RECEBE — | Mesmos valores; só a guia vertical, sem anel de referência; o marcador salta |
| 4 | RECEBE 2,57% (borda ciano); aparece "Liquidez US$ 8 mil [exemplo inventado] ≈ US$ 206" | RECEBE 2,57%; texto "… · você recebe ≈ US$ 206" sem pílula |
| 5 | Marcador no meio da curva (1,41; 0,71), duas guias; VENDE 41,42%, −50%, RECEBE —; a linha de liquidez some | Valores iguais; a linha de liquidez continua |
| 6 | RECEBE 14,64%; ≈ US$ 1.171 | Valores iguais |
| 7 | Volta para 1,05/0,95; "Liquidez US$ 80 mil [exemplo inventado] ≈ US$ 2.056" | Valores iguais, em texto corrido |
| 8 | Meio da curva; 14,64%; ≈ US$ 11.712; botão "Tocar de novo" | Valores iguais; "Tocar de novo" |

- **Marca "exemplo inventado":** no desenho é uma pílula colada à liquidez (cenas 4, 6, 7 e 8); no app, só no cabeçalho (`:218`).
- **Cenas paradas:** no desenho, a miniatura é a curva, o marcador roxo e a legenda. No app é a cópia do palco inteiro, com os números quebrando.
- Fazer: refazer o palco da Pool como no desenho (M) e criar a miniatura (P).

## Animação 2 — Drainer

**Onde aparece:** M1, aba "Golpes" (`modulo1.js:214`), entre `criarSequenciaDoDrainer` (`:213`) e `criarSequenciaDoEnvenenamento` (`:215`).

**Título:** desenho "Drainer: perder tudo sem entregar a frase-semente"; app "Perder tudo sem entregar a frase-semente" (`:451`).

**[DIFERENTE] Composição do palco**
- Desenho: grade `auto-fit minmax(240px)` com **3 colunas iguais**: carteira | seta | site. Na seta, símbolo e rótulo ficam lado a lado (11 px, largura máxima 120).
  - **Carteira** (`#10151E`, raio 10, padding 14):
    - "SUA CARTEIRA";
    - linha "Saldo em tokens" + valor 1,25 rem 700;
    - barra de **22 px com borda**;
    - **caixa verde** "Frase-semente | nunca saiu do papel" (valor em mono);
    - **caixa "APROVAÇÕES ATIVAS"** com valor em mono. Essa caixa fica vermelha ou verde conforme a cena.
  - **Site** (`#10151E`, raio 10):
    - título miúdo + etiqueta de 10 px;
    - **URL dentro de caixa `#0B0F17`**;
    - "tela" com altura mínima 96 e botão 12 px;
    - na cena 5, uma **caixa vermelha separada, abaixo da tela**, com o micro-rótulo "O QUE A ASSINATURA AUTORIZA DE VERDADE".
- App: grade `minmax(0,1fr) auto minmax(0,1fr)` (`:405`). A coluna da seta muda de largura conforme o rótulo, então **carteira e site mudam de tamanho de uma cena para outra** (cenas 3 e 7). A seta fica empilhada, símbolo de 28 px sobre o rótulo (`:388-390`). Os empilhamentos no celular são feitos por `window.innerWidth < 640` (`:408`), coisa que o handoff proíbe.
  - **Carteira** (`#141A24`, raio 8):
    - **sem "Saldo em tokens"**, valor 18 px 600;
    - barra de 10 px em pílula;
    - "aprovações ativas: [chip]" na mesma linha;
    - frase-semente como **linha de texto verde, sem caixa** (`:377-386`).
  - **Site:**
    - URL como texto solto (`:394`);
    - etiqueta de 12 px;
    - na cena 5, o texto do approve fica **dentro da tela, antes do botão, sem micro-rótulo** (`:397`, `:402`).

**Cena a cena** (legendas iguais; a cena 7 tem 13 palavras nos dois)

| Cena | Desenho | App |
|---|---|---|
| 1 | Etiqueta âmbar "anúncio · link falso"; URL âmbar em caixa "link encurtado · exemplo inventado"; "Reivindique seu airdrop"; botão "Abrir"; seta "→ você clica" cinza; carteira neutra | Mesmo conteúdo; URL sem caixa; seta empilhada |
| 2 | Borda do site vermelha, "site clonado", URL "app-oficiaI.exemplo — com i maiúsculo…"; "Conectar carteira" | Igual em conteúdo |
| 3 | Carteira com borda ciano; seta "⇢ o site vê os saldos públicos" ciano; "Carteira conectada" | Igual; a coluna da seta alarga e a carteira encolhe |
| 4 | Seta "← pedido de assinatura" âmbar; botão "Assinar mensagem" vermelho | Igual |
| 5 | Caixa vermelha **abaixo** da tela, com "O QUE A ASSINATURA AUTORIZA DE VERDADE" + `approve(spender: golpista, amount: ilimitado) — ou Permit/Permit2 (EIP-712), sem gás` | O texto do approve aparece **dentro** da tela, sem o micro-rótulo, antes do botão |
| 6 | Carteira com borda vermelha; caixa "APROVAÇÕES ATIVAS" vermelha "golpista: ilimitado sobre XYZ"; seta "✓ permissão concedida"; site "O GOLPISTA" | Chip vermelho na linha "aprovações ativas:" |
| 7 | "0 XYZ" vermelho; barra de 22 px vazia com borda; sem botão; seta "→ transferFrom, depois mixers e pontes" | "0 XYZ"; barra de 10 px vazia; a seta larga espreme a carteira e o chip quebra de linha |
| 8 | Tudo verde: caixa de aprovações "revogada"; "A DEFESA" com etiqueta "defesa"; URL ciano "revoke.cash · Token Approval Checker"; botão "Revoke"; seta "× aprovação revogada" | Mesmo conteúdo, com chip "revogada" |

- **Frase-semente verde em todas as cenas:** o app cumpre, mas como linha de texto, não como a caixa verde do desenho.
- **Cenas paradas:** no desenho, a miniatura é carteira → seta → site (saldo, barrinha e título da tela). No app, cópia inteira ilegível.
- Fazer: refazer o palco (M) e tirar o `innerWidth`.

## Animação 3 — Sandwich

**Onde aparece:** M5, aba "Configurações" (`modulo5.js:405`), depois de `criarSequenciaDoSanduiche` (`:404`).

**Título:** desenho "Sandwich: o robô compra antes e vende depois"; app "O sanduíche: o robô compra antes e vende depois de você" (`:562`).

**[DIFERENTE] Composição do palco**
- Desenho: uma coluna.
  - **Em cima, largura total:**
    - à esquerda, o micro-rótulo da fase; à direita, **"slot da Solana: 350 ms" em mono, em todas as cenas**;
    - a caixa da fila (`#10151E`, borda ciano em "Dentro do bloco") com 3 linhas: rótulo 13/600 + detalhe **em mono** 12 à direita, e recuo animado de 16 px;
    - a nota da fila.
  - **Embaixo, duas colunas:**
    - **à esquerda**, "PREÇO DO TOKEN [exemplo inventado]" e 3 barras **largas** (flex 1, área 96 px). Os rótulos "antes / depois do robô / sua execução" ficam **sempre visíveis**; a opacidade só vale para barra e valor;
    - **à direita**, o cartão "Slippage que você aceita" com valor de 14 px 700 **em branco** e barra de 14 px com borda; embaixo, o cartão "O ROBÔ".
- App: `auto-fit minmax(240px)` com 4 cartões iguais (`:523-524`), ou seja, 3 colunas e **"O robô" sozinho na segunda linha**.
  - **Sem "slot da Solana: 350 ms"** no palco; o número só aparece no texto do robô da cena 3 e na nota.
  - Fila estreita, com o detalhe em Inter (`:499`).
  - Barras de 64 px (`:507`), com opacidade na **coluna inteira, rótulo incluído** (`:547`): nas cenas 1–3 só se vê "antes".
  - A pílula "EXEMPLO INVENTADO" quebra dentro do micro-rótulo (`:512`).
  - Slippage: rótulo "LIMITE DE SLIPPAGE QUE VOCÊ ACEITOU", valor 18 px **pintado de `#EF4444`** (`:551`). Texto vermelho em `#EF4444` fere a regra do README. Barra de 10 px em pílula (`:516-519`).

**Cena a cena**

| Cena | Desenho | App |
|---|---|---|
| 1 | Fila: "Sua compra · enviada agora" (roxa) + 2 "— · fila aberta"; barra "antes 0,0100" com os 3 rótulos; slippage 40% (barra vermelha em 80%); robô neutro "Ainda não fez nada…" | Mesmos valores; só a coluna "antes" existe, as outras 2 somem com os rótulos; o robô cai para a segunda linha |
| 2 | "qualquer um pode ler · fila pública"; robô vermelho "Leu a sua ordem…" | Igual |
| 3 | "Compra do robô · priority fee maior" (vermelha) no topo; "Sua compra · mesmo slot, depois" recuada 16 px | Igual, mas o recuo pula sem transição |
| 4 | Fase "DENTRO DO BLOCO" com borda ciano; compra do robô "executada" verde; barras antes (0,5) + depois 0,0112 | Igual; a coluna "antes" esmaece inteira, rótulo incluído |
| 5 | "Sua compra · executada — mais cara"; 3 barras (0,0106 em âmbar) | Rótulos quebram em 2 linhas e as barras desalinham; "Sua compra" quebra em 2 linhas |
| 6 | "Venda do robô · logo depois" (âmbar) | Igual |
| 7 | "A MARGEM QUE VOCÊ AUTORIZA"; slippage 2% verde (barra em 12%); robô verde; barra "depois" a 0,35 | Igual; "2%" em verde grande |
| 8 | "O QUE FAZER": 3 linhas verdes **de largura total** com o detalhe em mono à direita | As 3 linhas espremidas numa coluna de ~250 px, com texto em 2–3 linhas |

- **Cenas paradas:** no desenho, a miniatura é a fila (3 chips), 3 barrinhas e a legenda. No app, cópia inteira.
- Fazer: refazer o palco (M), com a fila em largura total e o slot de 350 ms.

## Animação 4 — Caminho do token

**Onde aparece:** M5, aba "Taxas" (`modulo5.js:328`), depois de `criarSequenciaDoCaminho` (`:327`).

**Título:** desenho "Caminho do token: bonding curve → PumpSwap → AMM madura"; app "O caminho de um token: bonding curve → PumpSwap → AMM madura" (`:673`).

**[DIFERENTE] Composição do palco**
- Desenho:
  - **Em cima:** 3 cartões de local (`auto-fit minmax(200px)`) com "→" entre eles. Cada cartão tem nome 14/600, o chip **"o token está aqui"** (pílula ciano com borda) ao lado do nome, a descrição de 12 px e um **rodapé com borda no topo: "TAXA DA POOL" + valor 1,125 rem 700**.
  - **Embaixo, duas colunas centralizadas:**
    - **à esquerda**, uma figura **sem caixa**: micro-rótulo e SVG 320×170, com **marcador roxo e borda branca**, `aria-label` por cena (`gAlt`) e rótulos de eixo (X centralizado, Y girado; no protótipo esses `<text>` dinâmicos existem no DOM mas não pintam);
    - **à direita**, o cartão "UMA ORDEM DE R$512, CUSTO TOTAL" com barras de 16 px com borda, e o **aviso vermelho em cartão separado, com texto `#E6EDF3`**.
- App:
  - Trilha `1fr auto 1fr auto 1fr` (`:613`).
  - Nome e taxa na mesma linha do título, **sem "TAXA DA POOL"** (`:605`); "● o token está aqui" como texto ciano de 11 px no pé do cartão (`:607`, `:646`).
  - Gráfico **dentro de caixa `#141A24`** (`:627`) e com `aria-hidden` (`:624`), sem o `gAlt`. Marcador ciano (`:621`). Rótulo Y horizontal no topo (`:623`).
  - Custos com título "o custo de uma ordem de R$512 (SOL ≈ R$512, suposição do arquivo)" (`:632`) e barras de 10 px em pílula (`:661`). O valor sai na cor da barra, então **"140 pb" fica em `#EF4444`** (`:599`, `:661`), contra `#F87171` no desenho.
  - **Aviso dentro do cartão de custos, com texto `#F87171`** (`:631`).
  - Empilha no celular por `window.innerWidth` (`:615`).

**Cena a cena**

| Cena | Desenho | App |
|---|---|---|
| 1 | Bonding curve ativa (borda ciano + chip), "TAXA DA POOL 1,25%"; os outros dois "—"; curva roxa com marcador no começo; custo: só a nota "O custo total aparece daqui a duas cenas." | Igual em conteúdo; o cartão de custos fica alto e vazio, da altura do gráfico |
| 2 | Marcador em 55%; nota "0,300% … 0,95% …" | Igual |
| 3 | PumpSwap ativo; 1,25% nas duas primeiras; curva tracejada; marcador esmaecido no fim; seta 1 roxa; nota "não verificado" | Igual |
| 4 | Curva de AMM cinza; "AGORA É UMA POOL: X · Y = K"; barra "R$512 no PumpSwap ≈ 2,4%" âmbar | Igual, com o eixo "SOL na pool →" no topo |
| 5 | "1,25% → faixas" no rodapé do PumpSwap, em 2 linhas | Igual, na linha do título |
| 6 | AMM madura ativa, 0,25% verde; barras 2,4% (100%) × 1,4% (58%, verde) | Igual |
| 7 | Todas as taxas; curva tracejada; "22 pb" verde (16%) × "140 pb" (texto `#F87171`, barra `#EF4444`); nota "534 mil negociações (Uniswap Labs)"; aviso em cartão vermelho separado, texto claro | "140 pb" em `#EF4444`; aviso vermelho dentro do cartão de custos, texto vermelho |

- **Cenas paradas:** no desenho, a miniatura são os 3 locais (nome + taxa), a curva e a legenda. No app, a cópia inteira esmaga a trilha: uma palavra por linha e "1,2" cortado.
- Fazer: refazer o palco (M), pôr o `gAlt` no SVG e tirar o `innerWidth`.

## Animação 5 — Vida de uma narrativa

**Onde aparece:** M3, aba "Narrativas", Parte 2 "O ciclo e a rotação" (`modulo3.js:354`), depois de `criarCicloDaNarrativa` (`:353`).

**Título:** desenho "Vida de uma narrativa"; app "A vida de uma narrativa: nasce, puxa outros tokens, roda e satura" (`:774`).

**[DIFERENTE] Composição do palco**
- Desenho: uma coluna.
  1. Linha do topo: **chip da fase** à esquerda e o texto "onde" (12 px) à direita.
  2. Figura de largura total, "ATENÇÃO, POR ONDE ELA PASSA", com 4 barras **largas** (flex 1, 110 px). Embaixo, a legenda fixa **"Barras de atenção, não de preço. Altura relativa, para mostrar a ordem em que os canais acendem."**
  3. Caixa de tokens de largura total (`#10151E`), com a nota em mono e chips de 13 px. Sem token, ela diz **"Nenhum token ainda: a narrativa nasce antes dele."**
  4. Grade de 2 colunas:
     - a nota, na cor da fase;
     - **cena 7:** figura "NA MESMA ESCALA, EM PONTOS PERCENTUAIS" com barra **listrada** ciano em 50% ("O sinal social, no melhor caso · 1% a 3%") × barra vermelha em 100% ("Entrar e sair (Módulo 5) · 3 a 6 pontos"), barras de 16 px com borda, e a legenda "O custo come o sinal antes de ele virar lucro.";
     - **cena 8:** caixa ciano "MEDIR ATENÇÃO, NÃO ADIVINHAR PREÇO" com lista de 3 marcadores.
- App: 3 cartões lado a lado (`:742-743`).
  - **Canais:** micro-rótulo "ATENÇÃO, POR CANAL" + chip, "onde" em 13 px branco, barras de no máximo 56 px e rótulos de 10 px quebrando em 2 linhas (`:721-727`).
  - **Tokens:** nota em Inter; sem token, mostra **"—"** (`:763`).
  - **Nota.**
  - **Falta a frase "Barras de atenção, não de preço"**, uma exigência do README. A nota do pé diz só "ilustrativas, não medidas" (`:779`).
  - **Cena 7:** as barras ficam **dentro da nota vermelha**, com 8 px, ciano **sólido** e não listrado, rótulos "sinal social, no melhor caso" / "custo de entrar e sair", **sem título e sem legenda** (`:735-738`).
  - **Cena 8:** `ol` dentro da nota verde, **sem marcadores** (`:739-740`), e sem a caixa ciano.

**Cena a cena**

| Cena | Desenho | App |
|---|---|---|
| 1 | "Nasce" (ciano); só "fora de cripto" aceso (62%); tokens: "Nenhum token ainda: a narrativa nasce antes dele." | Tokens: "—" |
| 2 | "23,5% dos tokens do pump.fun nascem depois de um post"; JENNER roxo; X/Twitter roxo | Igual; o "onde" quebra em 2 linhas no cartão estreito |
| 3 | "Cresce"; JENNER, MOTHER, DADDY; nota 0,86% × 9,2% | Igual |
| 4 | MOODENG + PNUT, GOAT, agentes de IA; nota âmbar (PNUT 11/11/2024, 56%) | Igual |
| 5 | "Pico e rotação"; GOAT, agentes de IA, TRUMP (ciano); nota âmbar | Igual; o chip "Pico e rotação" quebra em 2 linhas |
| 6 | "Saturação"; X/Twitter vermelho; JENNER, MOTHER e DADDY vermelhos + "+ cópias"; nota vermelha (30 tokens, 94%) | Igual |
| 7 | "O limite"; chips "tema identificado / fase identificada"; nota vermelha **e figura separada** das barras (listrada × vermelha, com título e legenda) | Barras sólidas dentro da nota, sem título nem legenda |
| 8 | "O que fazer"; nota verde **e caixa ciano** com 3 marcadores | Lista sem marcador dentro da nota verde; sem caixa ciano |

- **Cenas paradas:** no desenho, a miniatura é "cena N" + chip da fase, 4 barrinhas, os chips e a legenda. No app, cópia inteira.
- Fazer: refazer o palco (M), com a legenda "não de preço", a figura das barras na mesma escala e a caixa "O que fazer".

## Animação 6 — Address poisoning

**Onde aparece:** M1, aba "Golpes" (`modulo1.js:216`), depois de `criarSequenciaDoEnvenenamento` (`:215`).

**Título:** desenho "Address poisoning: o endereço quase igual"; app "O endereço quase igual" (`:867`).

**[DIFERENTE] Composição do palco**
- Desenho:
  - **Histórico em largura total no topo** (`#10151E`, borda que muda por cena). Cada linha tem rótulo 12/600 + valor em mono 12, e o **endereço em mono 13 cabe numa linha só**: "0x3aF1" + meio destacado + "Bf07".
  - **Embaixo, duas colunas:**
    - "ONDE VOCÊ COSTUMA OLHAR": as pontas em caixinhas de raio 4 cuja cor segue `pontaTom` — **verde nas cenas 1 e 7, vermelha nas cenas 2 a 6**. O meio é uma **faixa tracejada** que ocupa todo o espaço entre as pontas (flex 1);
    - a nota, com lista de 4 marcadores na cena 7.
- App: 3 cartões (`:835-836`).
  - **Histórico estreito:** rótulos e endereços quebram em 2 linhas; endereço em 12 px com `word-break` (`:846-850`).
  - "COMO O OLHO LÊ UM ENDEREÇO" + pílula "endereços inventados" (`:822`).
  - **Pontas sempre verdes:** o app não tem `pontaTom` (`:824`, `:826`).
  - O meio é uma **pílula de raio 999 com borda sólida** (`:819`) que desce para a própria linha (cenas 1 e 6).
  - Regra em `ol` **sem marcadores** (`:832`).

**Cena a cena**

| Cena | Desenho | App |
|---|---|---|
| 1 | 1 linha verde "Destino que você já usou · enviado"; pontas verdes; faixa neutra tracejada "o meio, que quase ninguém confere"; nota verde | O endereço quebra em 2 linhas; a faixa vai para baixo de 0x3aF1 e Bf07 para outra linha |
| 2 | 2 linhas (verde + vermelha "Endereço gerado pelo golpista · fora do seu histórico", meio vermelho); **pontas vermelhas**; faixa vermelha "só o meio muda"; histórico com borda vermelha | Pontas continuam verdes; o resto igual |
| 3 | "Recebido agora · valor 0"; histórico com borda âmbar; nota âmbar "O envenenamento" | Igual, com pontas verdes |
| 4 | "Seu histórico, dias depois"; 2 linhas neutras, meios verde e vermelho; "a única diferença está aqui" | Igual, com pontas verdes |
| 5 | "Você vai enviar de novo · copiou do histórico"; "Copiado do histórico · colado no campo destino"; "ninguém leu esta parte" | Igual, com pontas verdes |
| 6 | "O tamanho do problema · Carnegie Mellon · USENIX Security 2025"; "270 milhões de tentativas · Ethereum e BNB Chain, 07/2022 a 06/2024"; "17 milhões…, 6.633…, US$ 83,8 milhões" | Igual, texto em 3–4 linhas; a faixa "automatizado, em escala" empurra Bf07 para baixo |
| 7 | "A regra"; linha verde da fonte oficial; pontas verdes; faixa verde "leia esta parte também"; nota verde + 4 marcadores | Os 4 itens sem marcador |

- **Marca:** no desenho, a pílula "endereços inventados" fica no parágrafo do cabeçalho. No app ela fica dentro do palco, mais "exemplo inventado" no cabeçalho. Isso atende.
- **Cenas paradas:** no desenho, a miniatura são as linhas do histórico com o meio destacado e a legenda. No app, cópia inteira, com os cartões saindo da célula.
- Fazer: refazer o palco (M) e acrescentar `pontaTom`.

---

## A mais no app (não está no desenho)

- Cabeçalho da figura (título + "ANIMAÇÃO · N CENAS · ~X S") — `animacoes.js:216-219` — tipo **(b)**. O desenho tem outra sobrancelha ("Animação N · Módulo M · 32 s") e outros títulos.
- Parágrafo `nota` no pé de cada animação — `:227`, textos em `:344`, `:456`, `:568`, `:678`, `:779`, `:873` — tipo **(b)**. Substitui o parágrafo de fonte do cabeçalho do desenho.
- Botão "Próxima cena" no modo reduzido, que volta ao início depois da última cena — `:111`, `:152` — tipo **(b)** em relação à Fase 4. Vem da ficha antiga `00 Componentes.dc.html:703`.
- Caixa "Ver as cenas paradas" que soma a grade ao palco — `:100`, `:180-196` — tipo **(b)**.
- Cor `#6B7889` no texto alternativo de "Ler como texto" — `:207` — tipo **(b)**, cor fora da paleta de 13 cores.
- Pool: micro-rótulo "A POOL", pílula "x · y = k", eixos "SOL (y)" e "tokens na pool (x) →", frase "Liquidez anunciada: … · você recebe …" — `:269`, `:277-278`, `:295`, `:332` — tipo **(b)**.
- Drainer: "aprovações ativas:" com chip na mesma linha — `:384` — tipo **(b)**.
- Sandwich: "limite de slippage que você aceitou" — `:519` — tipo **(b)**. O desenho diz "Slippage que você aceita".
- Caminho: "● o token está aqui" como texto (`:646`) — tipo **(b)**. Título "o custo de uma ordem de R$512 (SOL ≈ R$512, suposição do arquivo)" (`:632`) — tipo **(c)**, sai de `modulo5.js:855/1646`.
- Narrativa: "atenção, por canal" (`:727`), o traço "—" sem token (`:763`) e os rótulos "sinal social, no melhor caso" / "custo de entrar e sair" (`:736-737`) — tipo **(b)**.
- Address poisoning: "como o olho lê um endereço" (`:822`) — tipo **(b)**. O desenho diz "Onde você costuma olhar".
- `caixaDoPalco` sem uso — `:232` — código morto.

## Números

- **Nenhum número sem origem que seja só do app.** Comparei as strings dos arrays de cenas do desenho com as do app:
  - Pool, Drainer e Narrativa: idênticos.
  - Caminho: o app perdeu o `gAlt` (texto alternativo do gráfico) e o `#F87171` do "140 pb".
  - Address poisoning: perdeu o `pontaTom`.
  - Sandwich: perdeu o `rotulo` de cada cena, que o desenho também não exibe.
- Conferi por grep em `src/data`: 2,57 · 14,64 · 5,41 · 41,42 · US$ 8 mil · US$ 206 · US$ 1.171 (`modulo6.js:126-128`) · 20%/80% (`modulo1.js:1484`) · EIP-712 · 350 ms · 1,25% · 0,300% · 0,95% · 0,25% · 2,40% · 1,40% · 22 e 140 pontos-base · 534 mil · "6 vezes" · 80% (`modulo5.js:383-416`, `:1231-1237`) · 23,5% · 15,2 e 3,5 milhões · 31 posts · US$ 1 milhão · 1,5 milhão · mais de 10% · 0,86% · 9,2% · 11/11/2024 · 56% · 30 tokens · maio de 2024 · 94% · 1% a 3% · 3 a 6 pontos (`modulo3.js`) · 270 mi · 17 mi · 6.633 · US$ 83,8 mi · 07/2022 · Carnegie Mellon · USENIX (`modulo1.js`).
- **Nos dois (desenho e app):** a barra "R$512 no PumpSwap ≈ 2,4%" (Caminho, cenas 4–6) não tem origem com esse rótulo. Em `src/data`, o 2,40% é de "R$512, bonding curve" (`modulo5.js:1231-1233`), e a matriz não tem linha de PumpSwap. A própria ficha do desenho diz "≈ 2,4% na bonding curve".
  - Fazer: rotular como bonding curve, ou marcar "não verificado para o PumpSwap".
- **Nos dois:** "≈ US$ 2.056" e "≈ US$ 11.712" (Pool, cenas 7–8) são contas (80 mil × 2,57% e × 14,64%) em cima de "se a pool fosse dez vezes maior" (`modulo6.js:128`). Não estão escritos no arquivo. Servem por serem exemplo inventado marcado, mas no app a marca fica longe, no cabeçalho.
- **Inventados e marcados nos dois:** 1.000 XYZ, preços 0,0100 / 0,0112 / 0,0106, slippage 40% e 2%, e os endereços.
- **Nos dois:** a legenda da cena 7 do Drainer tem 13 palavras ("transferFrom: os tokens saem sem nova ação sua. A semente nunca foi vista."), acima do limite de 12.

## Celular

- A 390 px o app não rola para o lado (`scrollWidth` 390). Os palcos empilham: Pool, Sandwich, Narrativa e Address poisoning pela grade `auto-fit`; Drainer e Caminho por `window.innerWidth < 640` (`:408`, `:615`). Esse empilhamento congela no primeiro desenho, e o handoff proíbe layout por JS.
- No cabeçalho da figura, a pílula "exemplo inventado" quebra em 2 linhas e o "S" de "~32 S" fica sozinho na linha (`a1-cel-01.png`).
- Botões com 40 px e segmentos com 24 px, abaixo do alvo de 44 px, justo onde o toque importa mais.
- O desenho a 390 (`d2-cel-01.png`) também empilha, só com CSS. "Avançar cena →" desce para a segunda linha, e a barra numerada continua com 44 px.

## Trabalho para implantar

**`src/components/animacoes.js` — motor `criarAnimacao` (75–229): M**
- Moldura no formato da Fase 4: `section` `#141A24`, raio 12, padding 20, gap 14. No topo, "cena N de T" à esquerda e a caixa "Reduzir movimento: cenas paradas, lado a lado" à direita.
- Palco: `div tabindex=0 role=group` com o aria-label do teclado, e o `role=img` com o alt dentro. Fundo `#0B0F17`, padding 20.
- Legenda em 1,0625 rem.
- Botões "← Voltar cena" / "Tocar" (`min-width:110`) / "Avançar cena →", com 44 px e fundo `#0B0F17`.
- Segmentos com `min-height:44`, traço de 6 px e número mono 11.
- O modo reduzido **substitui** palco, legenda, controles e barra pela grade `auto-fill minmax(230px)` de miniaturas (cada animação passa `criarMiniatura(cena, i)`). Remover "Próxima cena".
- "Ler como texto": `ol` com `list-style: decimal` e "legenda alt" em `#9AA7B4`, com espaço entre as duas.
- Títulos das figuras: os h1 do desenho, com a sobrancelha "Animação N · Módulo M · X s".

**`styles/custom.css:483-496`: P**
- Incluir `color` e `margin-left` em `.omh-anim-transicao`.
- Mover os marcadores SVG por `transform: translate()`, como o desenho da Pool, ou dar transição a `cx`/`cy`.

**Os 6 palcos: M cada um, cerca de G no total**
- Pool (240–346): gráfico à esquerda com anel "antes da venda", marcador roxo, 2 guias e "x·y = k" dentro do SVG; barras à direita; cartões "VENDE / PREÇO CAI / RECEBE"; linha de liquidez com a pílula, aparecendo por opacidade.
- Drainer (352–458): 3 colunas `auto-fit minmax(240px)`; "Saldo em tokens"; barra de 22 px; caixas da frase-semente e das aprovações; URL em caixa; caixa "O que a assinatura autoriza de verdade" abaixo da tela. Tirar `innerWidth` (`:408`).
- Sandwich (464–570): fila em largura total com "slot da Solana: 350 ms"; detalhes em mono; barras largas com rótulo sempre visível; coluna com slippage (valor branco) e robô.
- Caminho (576–680): locais com rodapé "TAXA DA POOL" e chip "o token está aqui"; gráfico sem caixa com `gAlt`; marcador roxo; aviso separado com texto claro; "140 pb" em `#F87171`. Tirar `innerWidth` (`:615`).
- Narrativa (686–781): chip da fase no topo; barras largas; legenda "Barras de atenção, não de preço"; caixa de tokens em largura total com "Nenhum token ainda…"; figura das barras na mesma escala (listrada × sólida, com título e legenda); caixa ciano "Medir atenção" com marcadores.
- Address poisoning (787–875): histórico em largura total com endereço numa linha; "Onde você costuma olhar" com `pontaTom` e faixa tracejada `flex:1`; regra com marcadores.

**Miniaturas das cenas paradas: P cada uma**
- Pool: curva e marcador.
- Drainer: carteira → seta → site.
- Sandwich: fila e barrinhas.
- Caminho: 3 locais e a curva.
- Narrativa: chip, barrinhas e chips.
- Address poisoning: linhas do histórico.
- A marcação de cada uma já está no bloco `modoParado` de cada `.dc.html`.

**Dados: P**
- Rótulo "R$512 no PumpSwap" (`:596-598`): trocar ou marcar como não verificado.
- Encurtar a legenda da cena 7 do Drainer para até 12 palavras.

**Limpeza: P**
- Apagar `caixaDoPalco` (`:232`).

**Componentes para reaproveitar:**
- `html`/`svg` de `ui.js`.
- O estilo "listrado" já existe em `criarBarrasNaMesmaEscala` (`visuais.js:405`) e serve para a figura da cena 7 da Narrativa.
- A pílula `PILULA_INVENTADO` e a nota `criarNota` do próprio `animacoes.js`.

**Componente novo:** só o contrato `criarMiniatura` por animação. O resto é refazer os palcos dentro das funções que já existem.
