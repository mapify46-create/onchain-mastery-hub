# Handoff: OMH Hub — redesenho didático

## Visão geral

Redesenho da apresentação do **onchain-mastery-hub (OMH Hub)**, central de estudos estática
e offline, em português do Brasil, para aprender trading on-chain e memecoins do zero.

O trabalho **não muda o conteúdo, não muda a identidade visual e não inventa dados**. O que
muda é a forma: texto denso foi substituído por visuais que mostram uma relação — causa →
efeito, ordem, proporção, comparação, probabilidade. Todo número exibido vem de
`src/data/*.js` do app; exemplo hipotético aparece marcado na tela como "exemplo inventado".

Cobertura deste pacote:

- **Fase 1** — página de componentes novos (10 componentes, com estados e especificação de dados).
- **Fase 2** — os 7 módulos, cada um em desktop e celular.
- **Fase 3** — as 5 telas gerais: Início, Checklist, Glossário, Revisão, Quiz e Simulador.
- **Fase 4** — as 6 animações.
- **Fase 5 (folhas-resumo A4)** — não foi feita, por decisão do dono do projeto.

## Sobre os arquivos de design

Os arquivos em `designs/` são **referências de design escritas em HTML** — protótipos que
mostram aparência e comportamento pretendidos, não código de produção para copiar.

A tarefa é **recriar estes designs no ambiente do app real**: `onchain-mastery-hub` é
**HTML + JavaScript puro, sem build e sem framework**, com router por hash, componentes em
`src/components/*.js`, views em `src/views/*.js`, dados em `src/data/*.js` e progresso em
`localStorage`. Nenhuma dependência nova deve ser introduzida.

Os protótipos usam um runtime de componentes próprio do ambiente de design
(`support.js`, `ds-base.js`, tags `<x-dc>`, `<sc-for>`, `<sc-if>`, `<x-import>`). **Nada
disso vai para o app.** Leia os arquivos como especificação de marcação, estilo e
comportamento, e implemente com `document.createElement` / template strings, como o resto
de `src/components/`.

## Fidelidade

**Alta fidelidade (hifi).** Cores, tipografia, espaçamentos, raios, bordas, estados e
textos são os finais. Os hex e medidas abaixo devem ser reproduzidos exatamente — eles são
os mesmos que já existem em `index.html` (tokens), `styles/custom.css` e `src/ui.js`.

Exceção: os protótipos exibem **estado de exemplo** onde o app real leria `localStorage`
(progresso, itens marcados, termos estudados, respostas de quiz). Esses valores estão
rotulados na tela como exemplo e devem vir do store real na implementação.

---

## Design tokens

### Cores (paleta fechada, 13 valores)

| Token | Hex | Uso |
|---|---|---|
| `--omh-fundo` | `#0B0F17` | fundo da página **e** das caixas internas dos cards |
| `--omh-superficie` | `#141A24` | card, sidebar, cabeçalho |
| `--omh-superficie-alta` | `#1B2330` | cartão de destaque |
| `--omh-superficie-baixa` | `#10151E` | trilho do range, fundo de mockup de anatomia |
| `--omh-borda` | `#1F2733` | toda borda e todo separador |
| `--omh-texto` | `#E6EDF3` | texto principal, número em destaque |
| `--omh-texto-suave` | `#9AA7B4` | corpo de texto, rótulo, legenda |
| `--omh-primaria` | `#7C3AED` | aba ativa, barra de progresso, botão primário |
| `--omh-acento` | `#22D3EE` | link, destaque, marcador numerado, anel de foco |
| `--omh-risco-baixo` | `#22C55E` | risco baixo / acerto |
| `--omh-risco-medio` | `#F59E0B` | risco médio / aviso |
| `--omh-risco-alto` | `#EF4444` | risco alto — **só borda e fundo** |
| `--omh-risco-alto-texto` | `#F87171` | risco alto em **texto** |

**Regra de contraste mais importante:** `#EF4444` como texto sobre fundo escuro tingido de
vermelho reprova em AA. Texto vermelho é sempre `#F87171`. Em fundo roxo, o texto é
`#E6EDF3`, nunca `#7C3AED`.

**Cores de estado sempre em trio:** borda a 40–50% + fundo a 10–15% + texto no token
sólido. Os valores usados nos protótipos:

- ok/verde — borda `rgba(34,197,94,.5)`, fundo `rgba(34,197,94,.12)`, texto `#22C55E`
- atenção/âmbar — borda `rgba(245,158,11,.4)`, fundo `rgba(245,158,11,.12)`, texto `#F59E0B`
- alerta/vermelho — borda `rgba(239,68,68,.5)`, fundo `rgba(239,68,68,.12)`, texto `#F87171`
- selecionado/roxo — borda `#7C3AED` (ou `rgba(124,58,237,.6)`), fundo `rgba(124,58,237,.15)`, texto `#E6EDF3`
- destaque ciano — borda `#22D3EE` (ou `rgba(34,211,238,.5)`), fundo `rgba(34,211,238,.1)`, texto `#22D3EE`

**Nunca aplique `opacity` a um container que tenha texto `#9AA7B4`.** Isso derruba o
contraste abaixo de 4,5:1. Para sinalizar "não se aplica", use borda neutra e um `—` no
valor. (Dois defeitos de contraste nesta entrega vinham exatamente daí.)

### Tipografia

- **Inter** (400/500/600/700) — todo texto.
- **JetBrains Mono** (400/500) — número quantitativo, endereço, hash, ticker, fórmula. Nunca texto corrido.
- Corpo: 16px / line-height 1,6. Escala: 12 / 14 / 16 / 18 / 20 / 24 / 30 px.
- Micro-rótulo de seção: 11–12px, peso 600, `letter-spacing: .05em`, `text-transform: uppercase`, cor `#9AA7B4`.
- Número grande: peso 700, `font-variant-numeric: tabular-nums` (sem isso o número pula durante o arrasto).
- Vírgula decimal e ponto de milhar no padrão brasileiro: `0,95%`, `68,67%`, `3,20%`.

### Espaçamento, raios e bordas

- Card: raio **12px**, borda **1px**, padding **20px**, fundo `#141A24`.
- Caixa interna do card: raio **8px**, fundo `#0B0F17` (afunda, não eleva).
- Botão e chip retangular: raio 8px. Badge, chip de filtro, barra de progresso: 999px.
- Campo de mockup: 6px. Painel de anatomia: 10px.
- Ritmo vertical: 24px entre seções, 16px dentro de grades, 8–14px dentro de caixas.
- Conteúdo: `max-width` 64rem (868px nos protótipos, com padding). Sidebar: 16rem.
- **Alvo de toque mínimo 44px** em todo botão, link de navegação e opção clicável.

### Animação

- 120ms — polegar do range.
- 150ms — cor de botão, link, borda em hover.
- 200ms — largura de barra de progresso, gaveta do menu.
- 400–600ms `ease` — troca de cena nas animações da Fase 4.
- Easing: `ease` puro. Sem cubic-bezier, sem spring, sem bounce.
- `prefers-reduced-motion: reduce` zera tudo (`0.01ms !important`); nas animações da Fase 4,
  troca o palco animado pela **grade de cenas paradas**.

### Estados

- **Hover** — clarear a borda (`#1F2733` → `#9AA7B4`). Botão primário: `opacity: .85`.
- **Selecionado** — borda `#7C3AED` + fundo `rgba(124,58,237,.15)`.
- **Foco** — `outline: 2px solid #22D3EE; outline-offset: 2px;` raio 4px. Sempre visível.
- **Disabled** — `opacity: .5` + `cursor: not-allowed`.
- **Marcado/concluído** — borda e fundo verdes a baixa opacidade + `line-through` no texto.
- **Corrigido (quiz)** — certa em verde, escolhida errada em vermelho, demais em `opacity: .7`.

---

## Componentes novos (Fase 1)

Arquivo: `designs/00 Componentes.dc.html` — cada componente com estado normal, foco,
celular (390px), versão "reduzir movimento", alternativa em texto e especificação de dados.

| Componente | Relação que mostra | Dados que recebe |
|---|---|---|
| `MapaMental` | o todo e suas partes | `{ centro:{rotulo,titulo,subtitulo?}, ramos:[{titulo,href,folhas?[≤3]}] }` — 3 a 7 ramos |
| `Fluxograma` | se isto, então aquilo | `{ nos:[{id,tipo:'pergunta'\|'acao'\|'bom'\|'ruim',texto}], setas:[{de,para,rotulo?}] }` |
| `Sequencia` | ordem | `{ passos:[{titulo,texto}] (3–7), atual? }` |
| `Ciclo` | o que se repete | `{ etapas:[{titulo,detalhe?,href?}] (3–6), retorno? }` |
| `GradeDe100` | probabilidade / taxa de acerto | `{ frase, grupos:[{rotulo,quantidade,cor}] (soma 100), fonte? }` |
| `BarrasNaMesmaEscala` | proporção | `{ maximo, barras:[{rotulo,valor,exibicao,nota?,partes:[{rotulo,valor,estilo:'solido'\|'tracejado'\|'listrado'}]}] }` |
| `CurvaDeslizante` | sensibilidade | `{ controle:{rotulo,min,max,passo,valor,formatar}, curva:{pontos,dominioX,eixoX,eixoY}, marcador, numeros:(v)=>[2–3], atalhos:[{rotulo,valor}], alternativas? }` |
| `LinhaDoTempo` (melhoria) | ordem e distância no tempo | `{ marcos:[{data,titulo,texto?,tom?,href?}], proporcional?:true }` |
| `ComparacaoLadoALado` (melhoria) | X contra Y | `{ criterios:[{chave,rotulo,decisivo?}], opcoes:[{titulo,subtitulo?,valores:{[chave]:string\|{texto,tom}}}] }` |
| `Animacao` | causa → efeito no tempo | `{ elementos:[{id,tipo,rotulo,estilo}], cenas:[{rotulo,legenda(≤12 palavras),estados}] , duracaoPorCena? }` |

### Detalhes de implementação por componente

- **MapaMental** — centro em card roxo (borda `rgba(124,58,237,.6)`, fundo 15%), tronco de
  2px `#1F2733`, ramos em `<ul>` com borda-esquerda de 2px e conector `::before` de 24px.
  Ramo é `<button>`/`<a>` (min-height 40px); folhas são chips 999px, sem foco. No celular
  (≤640px) o tronco vira vertical e os ramos empilham.
- **Fluxograma** — nós de 4 tipos (pergunta = borda `#22D3EE` + fundo ciano 10%; ação =
  borda `#1F2733` + fundo `#0B0F17`; bom = verde; ruim = vermelho com texto `#F87171`).
  Setas desenhadas com `<span>` de 2px + ponta em `transform: rotate(45deg)`. Ramos
  lado a lado no desktop, empilhados no celular. `role="img"` + `aria-label` com a versão
  em texto, gerada dos dados.
- **Sequencia** — `<ol role="tablist">`, passo atual com borda roxa + fundo 15% e marcador
  ciano; passos rolam na horizontal dentro do card (`overflow-x:auto; tabindex="0"`,
  `min-width: 150px` por item). Teclado: ← → Home End.
- **Ciclo** — SVG 320×320 (ou 340/360), raio 100–118, ângulo `-90 + i*360/n`, folga de
  30–50° entre arcos, `marker-end` com seta; o último arco (n → 1) em `#22D3EE` tracejado
  `6 5`. Caixas absolutas de 112–124px com `box-sizing:border-box`, posição fixada por
  `Math.min/max` para não sair do quadrado.
- **GradeDe100** — grid de 10 colunas, `gap: 3px`, `aspect-ratio: 1`, `max-width: 230px`;
  preenche na ordem dos grupos. **Sempre exibir o número exato ao lado** (ex.: "68,67%
  exato · CoinGecko Research") porque a grade arredonda, e a fonte.
- **BarrasNaMesmaEscala** — sólido = fundo `#7C3AED`; tracejado = `2px dashed #9AA7B4` sem
  fundo; listrado = `repeating-linear-gradient(135deg,#22D3EE 0 3px,transparent 3px 6px)`.
- **CurvaDeslizante** — `.omh-range` com trilho 6px `#10151E`, polegar 20px `#7C3AED` com
  borda `2px #E6EDF3`, altura de trilha 24px (alvo de toque), foco no polegar.
- **Animacao** — palco + legenda `aria-live="polite"` + Voltar/Tocar/Avançar (44px) + barra
  de cenas numeradas (cada segmento é `<button>` com `aria-label="Cena N: legenda"`).
  Teclado no palco: espaço toca/pausa, ← →, Home/End.

### Componente → onde é usado

- `MapaMental` — abertura de M1–M7, Glossário (termos por categoria), Início (mapa da trilha)
- `Fluxograma` — M1 qual carteira · emergência · CVM/BC · M2 "estou em FOMO?" · M3 narrativa ou hype · M4 as 6 checagens · M5 app fora do ar · venda não caiu · M6 checagem do contrato · Checklist completo
- `Sequencia` — M1 transação · drainer · clipper · M2 as 4 fases · M3 rotina social · M5 sandwich · caminho do token · processo
- `Ciclo` — M2 laço da dopamina · M3 ciclo da narrativa · Início "como estudar" · Revisão (1, 3, 7, 16, 35)
- `GradeDe100` — M2 "vai a zero" · M6 detector · M7 ruína e efeito do diário · Revisão (calibração)
- `BarrasNaMesmaEscala` — M6 market cap × liquidez · custo do volume falso · M3 sinal × custo · M4 recuperação · M5 taxas · M7 (2÷0,1)² × (2÷0,05)²
- `CurvaDeslizante` — M6 "quanto sai" · M4 escada e tamanho · M5 impacto e atrito · M7 fração fixa
- `LinhaDoTempo` — M1 Brasil · M2 TRUMP/MELANIA/LIBRA · M3 rotação e cenário
- `ComparacaoLadoALado` — M1 CEX × DEX · carteiras · M3 prova × não prova · M5 camadas · M6 SPL × Token-2022 · M7 o que dizem × evidência
- `Animacao` — as 6 animações da Fase 4

---

## Telas — módulos (Fase 2)

Cada módulo tem duas páginas: `M<N> Desktop.dc.html` e `M<N> Celular.dc.html`. O celular é
o mesmo componente com a prop `compacto` (390px, mapa vertical, grades em 1 coluna,
sequências empilhadas), com header de 44px e `☰`.

**Estrutura comum a todos:** sidebar 16rem com rota ativa → cabeçalho do módulo →
**MapaMental** (ramos abrem as abas) → `role="tablist"` com teclado (← → Home End) → por
aba: gancho (`Destaques`) → termos → seções, cada uma com ideia central em uma frase
(borda-esquerda 2px `#22D3EE`) → visual principal → explicação de 1–3 frases → `<details>`
"Para ir mais fundo" → pergunta rápida (`Quiz`) → rodapé de aviso.

| Módulo | Abas | Visuais principais |
|---|---|---|
| **M6 Ler a tela** | Os números · Volume falso · O contrato · Prever o golpe · Quiz | barras market cap × liquidez (exemplo inventado) · curva deslizante x·y=k (2,57% / 14,64%, atalhos 10/30/50% e pool 10×) · lupa dos zeros (≈19 mil ×) · realizado × não realizado · fluxo do wash trading · barras US$ 13 mil × 23 mil · bundle no mesmo bloco · Total bundled % × Current held % · árvore SPL × Token-2022 · tabela das extensões · 3 autoridades · **fluxograma do contrato na ordem do checklist** (programa → extensões → mint → freeze; desvios dizem "Não compro. Isso é mecânica, não opinião."; metadata mutável é alerta, não "não compro"; fecha com "Passar por tudo não aprova o token…") · barras das 4 réguas · grades de 100 (95 / 68) · F1 0,79 × chute 0,90 · MCC 0,39 na régua −1..1 |
| **M1 Fundamentos & Segurança** | Fundamentos · Carteiras · Seed · Golpes · Defesa · Brasil · Quiz | sequência das confirmações · **anatomia da transação** (9 painéis sem valores, 6 marcadores, de `modulo1.anatomias.transacao`) · Success × Failed pagam gas · CEX × DEX · chave→endereço (setas de mão única) · comparação CEX/hot/cold · fluxograma "para que vai usar" · 12 palavras → semente → contas · 5 formas de perder → "o que todas fazem" · Checklist (20 itens) · drainer em 5 passos clicáveis · os 3 truques · endereço quase igual · clipper · revogar resolve × não resolve · Permit2 em 2 camadas · plano de emergência · 4 golpes do Brasil · fluxograma CVM→BC · linha do tempo proporcional (13 marcos) · **seção própria de Impostos** (quadro data/valor/taxas + sequência vender→pode gerar imposto→guardar registro→contador) · cripto → reais |
| **M3 Os dois pilares** | Visão geral · Narrativas · Social · Técnico · Matriz · Cenário · Quiz | mapa social × técnico · ciclo das 5 fases · fluxograma narrativa × hype · barras sinal 1–3% × custo 3–6 pontos · linha do tempo da rotação · tabela das 5 narrativas · tabela das ferramentas · rotina em sequência · rotina de 5 min clicável · endereço oficial × colado em resposta · anatomia do perfil · 4 golpes do Discord · barras dos calls (+1,83 / −2,24 / −6,53%) · tabela prova × não prova · as 4 ferramentas em sequência (cada uma troca anatomia, passos e armadilhas) · matriz filtrável (pilar/rede/papel) com estado vazio · linha do tempo dos launchpads. **Aviso "reconhecer narrativa não prevê preço" em 3 lugares, com papéis distintos** |
| **M2 Psicologia** | Visão geral · Vieses · Tipos · Casos · 4 fases · Quiz | ação com chão × memecoin sem chão · sequência da atenção · ciclo da dopamina · calmo × empolgado · tabela dos 5 vieses (pensa → acontece → fazer) · fluxograma FOMO · anatomia do post de hype · mapa dos 10 tipos em 5 categorias (clicável) · linha do tempo TRUMP/MELANIA/LIBRA (datas só com mês exibidas como mês) · 4 fases clicáveis + "⇢ Maioria vai a zero" · **2 grades de 100 com número exato, fonte e a contestação da pump.fun** |
| **M4 Gestão & decisão** | Tese vs. catálise · Take profit · Antes de entrar · Simulador · Quiz | tese × catálise · anatomia do plano em níveis (sem curva de preço) · 5 campos da ficha · tabela tese fraca/vaga/concreta · mapa das catálises · escada em 3 faixas · calculadora dos degraus (1º alvo empurra o 2º) · barras da recuperação (teto de 200% declarado como escala da tela) · fluxograma "eu compraria hoje?" · 6 checagens em fluxograma · calculadora de tamanho (risco ÷ invalidação) · avaliação do simulador em 4 passos + feedback em 3 partes |
| **M7 A rotina** | A regra · Tamanho · Diário · Revisão · Números · Quiz | memória reescrevendo · **as 5 partes da regra como formulário em branco** · ciclo da operação · saída automática × lembrete · fração fixa 100→90→9 · calculadora da sequência (atalhos 10% × 25%) · grade da ruína (99,5%) · "quanto cresce?" × "quanto aguento perder?" · lastro × sem lastro · grade do efeito 0,40 (61 de 100) · 9 campos do diário (Comportamento/Resultado, campo 7 destacado) · olhar dinheiro × revisar comportamento · barras 30 × 400 × 1.600 · 6 cartões "o que dizem × a evidência" |
| **M5 Execução** | Terminal · Custódia · Taxas · Configurações · Erros · Processo · Quiz | 3 camadas em pilha com a taxa de cada · tabela das camadas · anatomia da tela do terminal · custodial × não-custodial · fluxograma "app fora do ar" · o que foi × não foi em fev/2026 · caminho do dinheiro nas 5 camadas ("a única anunciada") · barras empilhadas 3,2 / 2,4 / 1,4% · matriz em tabela · calculadora do atrito · 3 configurações (baixo/alto demais) · fluxograma do slippage · calculadora do impacto (x·y=k) · ordem limite on-chain × servidor (não verificado) · token impostor · barras do tempo (slot 350 ms · bot dezenas de ms · você 30–60 s) · fluxograma "a venda não caiu?" · processo em 7 passos com 2 saídas em "não opero" · o que guardar |

**Regra inegociável do M7:** o app **não escreve a regra de compra do aluno**. As 5 partes
são campos `<input>` vazios, com etiqueta "em branco: você escreve"; os exemplos são
rotulados **"exemplo de forma"** e descrevem o formato de uma resposta verificável — nunca
um limiar, percentual ou gatilho. Nada digitado é salvo.

---

## Telas gerais (Fase 3)

| Tela | Arquivos | O que tem |
|---|---|---|
| **Início** | `30 Inicio*.dc.html` | **"Próxima ação"** como elemento dominante (card com gradiente 135° roxo→ciano a 10–16%, título grande, botão 44px, anel de progresso SVG); prioridade: revisar o que venceu → continuar o 1º módulo sem quiz → refazer quiz < 80% → concluir módulo → refazer simulador. Mapa da trilha (7 módulos + Checklist + Revisão, feito × a fazer). "Como estudar" como **ciclo** (ler a aba → responder o quiz → revisar em 1, 3, 7, 16 e 35 dias). Revisão de hoje, progresso por módulo (quiz 50% + módulo concluído 50%), barras do Glossário (X de 34) e do Simulador (X de 12), plano em texto livre, exportar/importar progresso. |
| **Checklist** | `31 Checklist*.dc.html` | Fluxograma de decisão completo; cada item com **etiqueta de força da evidência** (Fato do protocolo · Sinal medido · Sinal fraco · Rotina); fecha com "Passar por tudo não aprova o token: só quer dizer que ele não mostrou os sinais que dá para ver." |
| **Glossário** | `32 Glossario*.dc.html` | Mapa dos 34 termos por categoria (segurança 10 · solana 8 · evm 7 · execução 5 · social 4 · liquidez 2), com termo de duas categorias **ligado às duas, sem duplicar em silêncio**; busca + filtro com estado vazio do app; card de termo com definição, exemplo, alerta destacado e "Marcar como estudado" (alimenta a revisão, volta em 1 dia); contador "X de 34 estudados". |
| **Revisão** | `33 Revisao*.dc.html` | Ciclo dos intervalos 1, 3, 7, 16, 35; fila de hoje; calibração "quando você tem certeza, acerta?" em barras. |
| **Quiz e Simulador** | `34 Quiz e Simulador*.dc.html` | Quiz nos 4 estados (antes · acertou · errou com certeza · placar): confiança obrigatória (Chutei · Mais ou menos · Tenho certeza), certa em verde, errada escolhida em vermelho, demais a `.7`, **"Por que a sua não serve"**, mensagem de erro com certeza, aviso de que as perguntas voltam amanhã. Simulador nos 4 estados: aviso de cenários fictícios com ordem sorteada, cenário completo (situação, sinais, risco, 4 opções fixas Entrar/Esperar/Ignorar/Realizar parcial), feedback com qualidade (boa/aceitável/ruim/não se aplica), risco da decisão, próximo passo técnico, ferramentas e lição; resultado final por faixas. |

---

## Animações (Fase 4)

Seis animações, 30–36 s cada, em HTML + SVG + CSS, sem biblioteca nova, sem vídeo e sem áudio.

**Contrato comum:** uma ideia por cena; legenda de até 12 palavras em `aria-live="polite"`;
controles visíveis Voltar cena / Tocar-Pausar / Avançar cena (44px); barra com as cenas
numeradas, cada segmento um `<button>` com `aria-label="Cena N: legenda"`; teclado no palco
(espaço, ← →, Home, End); checkbox "Reduzir movimento" que também é detectado por
`matchMedia('(prefers-reduced-motion: reduce)')`, trocando o palco pela **grade de cenas
paradas**; `<details>` "Ler como texto" com as legendas em ordem; transições de 400–500ms
`ease` só em `height`, `width`, `opacity`, `transform`, `background` e `border-color`.

| # | Arquivo | Cenas | Números (fonte) |
|---|---|---|---|
| 1 | `Animacao 1 - Pool` | 8 | 2,57% → −10%; 14,64% → −50%; vende 5,41% / 41,42%; repete com pool 10× para mostrar que a porcentagem não muda (`modulo6.js`). Liquidez US$ 8 mil / 80 mil = exemplo inventado, marcado |
| 2 | `Animacao 2 - Drainer` | 8 | roteiro de `modulo1.js` (isca → site clonado → conectar → assinar → o que a assinatura autoriza → permissão → `transferFrom` → defesa). Frase-semente verde em **todas** as cenas: ela nunca é pedida. Saldo e URL inventados e marcados |
| 3 | `Animacao 3 - Sandwich` | 8 | fila pública → priority fee → robô compra → sua ordem executa mais cara → robô vende → papel do slippage → defesa (slippage mínimo, prioridade, modo Secure). Slot 350 ms. **Não há lucro de robô** — o arquivo não publica. Preços e limites 40%/2% inventados e marcados |
| 4 | `Animacao 4 - Caminho do token` | 7 | bonding curve 1,25% → PumpSwap 1,25% caindo por faixas → AMM madura 0,25%; ordem de R$512 custa ≈2,4% × ≈1,4%; final: 140 pb × 22 pb (534 mil negociações) e deslizamento ~80% maior. **Não exibe valor para graduar** (não verificado) |
| 5 | `Animacao 5 - Vida de uma narrativa` | 8 | nasce fora da blockchain (23,5%) → primeiro token → esteira (0,86% × 9,2%) → se espalha → rotação → saturação (−94% em ~1 mês) → **o limite** (1–3% × 3–6 pontos) → medir atenção, não adivinhar preço. Barras são **atenção, não preço**; só tokens que já estão no arquivo |
| 6 | `Animacao 6 - Address poisoning` | 7 | endereço conhecido → sósia com mesmo começo/fim → transação de valor 0 → no histórico parecem iguais (meio destacado) → você copia e envia → escala (270 mi de tentativas, 17 mi de vítimas, 6.633 incidentes, ≥ US$ 83,8 mi) → regra (linha inteira, fonte oficial, transação-teste, telinha da carteira fria). Endereços inventados e marcados |

---

## Acessibilidade (requisito, não opcional)

- Contraste **AA** em todo texto. Texto vermelho sempre `#F87171`. Nunca `opacity` em
  container com texto `#9AA7B4`.
- Foco visível em tudo: `outline: 2px solid #22D3EE; outline-offset: 2px`.
- Todo visual tem **alternativa em texto**: `role="img"` + `aria-label` gerado dos dados, ou
  a própria `<ul>`/`<ol>`/`<table>` semântica como conteúdo.
- Abas com `role="tablist"`/`tab`/`tabpanel`, `aria-selected`, `tabindex` roving e setas.
- Resultado que muda por interação em `aria-live="polite"`.
- Alvo de toque ≥ 44px.
- Funciona a partir de **390px**. Diagrama largo rola na horizontal **dentro do próprio
  card** (`overflow-x:auto` + `tabindex="0"`); a página nunca rola para o lado.
- **Layout responsivo é CSS, nunca JS.** Use `grid-template-columns:
  repeat(auto-fit, minmax(Xpx, 1fr))`. Medir `window.innerWidth` em JS congela o layout no
  valor do primeiro render dentro de um iframe — foi um defeito real nesta entrega.

## Regras editoriais que a implementação deve preservar

1. Dark mode, só dark mode. Português do Brasil, vírgula decimal.
2. Sem emoji, sem biblioteca de ícones, sem foto, sem print de plataforma de terceiro.
   Setas e marcas são `→ ⇢ ✓ ▾ ☰` com `aria-hidden="true"`, ou marcador numerado em círculo ciano.
3. **Nenhum número inventado.** Todo número vem de `src/data/*.js` com fonte; exemplo
   hipotético é marcado na tela ("exemplo inventado", "exemplo de forma", "cenários fictícios").
4. Onde a grade ou a barra arredonda, mostre o **número exato e a fonte** ao lado.
5. Incerteza é dita em voz alta: "Não verificado: …", "o arquivo não publica este número".
6. Todo visual mostra uma relação. Nada decorativo.
7. Sem promessa de lucro, sem urgência, sem "oportunidade".
8. O Módulo 7 **não escreve a regra do aluno**.

## Assets

Nenhum asset binário novo. O único SVG do app continua sendo `assets/icons/icon.svg`
(hexágono roxo com anel ciano), que serve de favicon, ícone do manifest e apple-touch-icon.
Fontes: Inter e JetBrains Mono, via Google Fonts, como no `index.html` atual.

## Arquivos deste pacote

```
designs/
  00 Componentes.dc.html                    Fase 1 — os 10 componentes com estados e specs
  M1..M7 Desktop.dc.html                    Fase 2 — módulos, desktop (~820px de conteúdo)
  M1..M7 Celular.dc.html                    Fase 2 — módulos, 390px (prop compacto)
  30 Inicio / 31 Checklist / 32 Glossario /
  33 Revisao / 34 Quiz e Simulador          Fase 3 — telas gerais (desktop + celular)
  Animacao 1..6 - *.dc.html                 Fase 4 — as seis animações
  ds-base.js, support.js                    runtime do ambiente de design — NÃO vai para o app
```

Cada arquivo de módulo e de animação traz, no fim, um `<details>` **"Dados desta
animação/componente (para a implementação)"** com a assinatura da função de montagem e a
origem exata dos dados em `src/data/*.js`. Comece por ele ao implementar cada tela.
