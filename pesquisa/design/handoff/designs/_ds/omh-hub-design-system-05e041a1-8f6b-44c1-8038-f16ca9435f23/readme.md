# OMH Hub — Design System

Sistema de design do **onchain-mastery-hub** (apelido: **OMH Hub**), uma central de estudos
em português do Brasil para aprender trading on-chain e memecoins do zero.

> Este design system **documenta e reproduz** o visual que já existe no código do produto.
> Nada aqui foi inventado como identidade nova: cores, fontes, raios, espaçamentos e
> componentes foram lidos de `index.html`, `styles/custom.css`, `src/ui.js` e
> `src/components/*.js` do código anexado.

---

## 1. Contexto do produto

**O que é.** Um curso local e interativo, de 7 módulos, que ensina do zero como funcionam
blockchain, carteiras, memecoins, ferramentas de análise on-chain e — principalmente — como
decidir sem se enganar. Tudo roda no navegador do aluno; o progresso fica em `localStorage`.
Não há servidor, não há conta, não há login.

**Público.** Iniciante total: nunca programou, nunca operou cripto. Isso define quase toda
decisão visual do produto — cada visual precisa ensinar, o texto é curto, e nenhum termo
aparece sem definição.

**Idioma.** Português do Brasil, exclusivamente. Nomes de componentes, props, tokens e
identificadores no código são em português (`criarBotao`, `montarChecklist`, `--omh-fundo`).
Este design system mantém essa convenção — trocar para inglês quebraria a correspondência
com o código-fonte.

**Tema.** Dark mode e só dark mode. `color-scheme: dark` no `:root`; não existe variante clara.

### Superfícies (produtos)

| Surface | O que é | Onde vive |
|---|---|---|
| **Site estático** | O hub em si: SPA com router por hash, sidebar de rotas, 7 módulos, glossário, checklist, revisão espaçada e simulador. Servido como arquivos estáticos (GitHub Pages). | `index.html` + `src/` |
| **App desktop** | O mesmo hub instalado como PWA (`manifest.json` + service worker), com botão "Instalar app" na sidebar e funcionamento offline para o texto. Mesmo layout, mesma sidebar — sem chrome próprio. | `manifest.json`, `src/components/instalarApp.js` |

As duas superfícies compartilham **o mesmo** layout e os mesmos componentes. O app instalado
não é uma versão diferente: é a mesma página, sem a barra do navegador, com o botão de
instalação oculto (`display-mode: standalone`).

### Rotas do hub

`#/inicio` · `#/modulo-1` … `#/modulo-7` · `#/glossario` · `#/checklist` · `#/revisao`

| Módulo | Título |
|---|---|
| 1 | Fundamentos & Segurança Cripto |
| 2 | Psicologia das memecoins & economia da atenção |
| 3 | Os dois pilares (Social vs. Técnico) |
| 4 | Gestão, catálises & tomada de decisão |
| 5 | A mecânica da execução |
| 6 | Ler a tela |
| 7 | A rotina |

### Fontes deste design system

- **Codebase anexado (somente leitura, via File System Access API):** `omh-design-system/`
  — contém `index.html`, `styles/custom.css`, `src/ui.js`, `src/components/` (19 arquivos),
  `src/views/` (11 arquivos), `src/data/` (11 arquivos) e `assets/icons/icon.svg`.
- **Não disponíveis na montagem:** `src/app.js`, `src/router.js`, `src/store.js`,
  `manifest.json`, `service-worker.js`, `assets/videos/`, e a pasta `pesquisa/` citada nos
  comentários. Nada foi inferido desses arquivos além do que os arquivos lidos declaram.
- **Nenhum link de Figma, deck ou screenshot** foi fornecido. Todo o visual veio do código.

---

## 2. Content fundamentals (como o texto é escrito)

O hub tem uma voz muito definida, e ela é parte do design. Copiar o visual sem copiar o tom
produz algo que não parece OMH Hub.

### Pessoa e endereçamento
- **"Você" sempre**, nunca "o usuário", nunca "nós". → *"Seu progresso fica só neste navegador."*
- A primeira pessoa aparece só quando o produto fala de si: *"Não consegui salvar o progresso."*
- Imperativo direto nas instruções: *"Marque conforme for aplicando."* / *"Comece pelo Módulo 1."*

### Registro
- **Claro, direto, sem hype, sem promessa de lucro.** Nunca "oportunidade", "ganhos",
  "multiplicar", "não perca". O produto ensina a decidir, não vende resultado.
- Frases curtas. Uma ideia por parágrafo. O componente `CardDaSecao` tem um campo
  `emUmaFrase` justamente para forçar a ideia central a caber em uma linha.
- Português coloquial mas preciso: *"o dinheiro se foi"*, *"é ali que o capital vaza"*,
  *"disciplina não é traço de personalidade, é hábito que enferruja"*.

### Honestidade como regra editorial
Esta é a regra mais característica do produto:

- **Nenhum número inventado.** Todo número vem de `src/data/*.js`, com fonte citada em
  `fontes`. Exemplo real usado no rodapé de todas as páginas: *"68,67% dos tokens do
  Pump.fun pararam de negociar no mesmo dia em que nasceram (CoinGecko Research)."*
- Exemplo hipotético é **marcado como tal**: *"Cenários fictícios: …"*, *"os números que
  aparecem neles são inventados de propósito para o exercício"*.
- Incerteza é dita em voz alta: *"Não verificado: nenhuma fonte pública confiável confirma
  esta ferramenta específica."*
- Limitações do produto são ditas: *"O vídeo precisa de internet; o texto do módulo
  funciona offline."* / *"Ilustração esquemática, não é a tela de nenhuma plataforma
  específica."*
- O checklist classifica cada item pela **força da evidência** em quatro etiquetas —
  *Fato do protocolo · Sinal medido · Sinal fraco · Rotina* — em vez de tratar tudo como regra.

### Feedback ao aluno
- Correto/errado nunca é seco. *"Isso."* / *"Não foi essa."* + explicação + **"Por que a sua
  não serve:"** quando a alternativa errada tem contra-argumento.
- Elogio é contido e sempre puxa para a próxima ação: *"Gabarito. Leia as explicações mesmo
  assim: elas trazem os números por trás das respostas."*
- Estados vazios ensinam a se recuperar: *"Nenhuma ferramenta bate com esses filtros ao
  mesmo tempo. Tente afrouxar um deles."*

### Casing e pontuação
- **Sentence case** em títulos, botões e rótulos: "Ver resultado", "Marcar como estudado",
  "Guardar o progresso". Nunca Title Case.
- **MAIÚSCULAS PEQUENAS** (11–12px, `letter-spacing: .05em`) apenas em micro-rótulos de
  seção: "PRÓXIMA AÇÃO", "O QUE VOCÊ VÊ", "PRÓXIMO PASSO TÉCNICO".
- Vírgula decimal e ponto de milhar no padrão brasileiro: `0,95%`, `68,67%`, `3,20%`.
- Travessão (—) é muito usado para o aposto explicativo. Reticências, nunca.

### Proibições
- **Sem emoji.** Em nenhum lugar, nunca.
- Sem exclamação (a única exceção prática é nenhuma: o código não tem uma).
- Sem jargão de crescimento, sem CTA de marketing, sem "clique aqui".
- Sem gamificação de vaidade: não há pontos, streaks nem medalhas. O único placar é o
  "resumo de disciplina" do simulador — e ele mede **processo**, não resultado:
  *"o simulador não avalia se você ganharia dinheiro, e sim se a decisão seguiu a regra
  escrita."*

---

## 3. Visual foundations

### 3.1 Cor

Paleta fechada de 13 valores (`tokens/colors.css`). Nenhuma cor fora desta lista.

| Token | Hex | Uso |
|---|---|---|
| `--omh-fundo` | `#0B0F17` | fundo da página **e** das caixas internas dos cards |
| `--omh-superficie` | `#141A24` | card, sidebar, cabeçalho |
| `--omh-superficie-alta` | `#1B2330` | cartão de destaque (um degrau acima) |
| `--omh-superficie-baixa` | `#10151E` | trilho do range, fundo do mockup da anatomia |
| `--omh-borda` | `#1F2733` | toda borda e todo separador |
| `--omh-texto` | `#E6EDF3` | texto principal, número em destaque |
| `--omh-texto-suave` | `#9AA7B4` | corpo de texto, rótulo, legenda |
| `--omh-primaria` | `#7C3AED` | aba ativa, barra de progresso, botão primário, link da sidebar ativo |
| `--omh-acento` | `#22D3EE` | link, destaque, marcador numerado, anel de foco, `<time>` |
| `--omh-risco-baixo` | `#22C55E` | risco baixo / acerto |
| `--omh-risco-medio` | `#F59E0B` | risco médio / aviso |
| `--omh-risco-alto` | `#EF4444` | risco alto — **só borda e fundo** |
| `--omh-risco-alto-texto` | `#F87171` | risco alto em **texto** |

**A regra de contraste mais importante do sistema:** `#EF4444` sobre os fundos escuros
tingidos de vermelho a 10–15% dá 4,0–4,2:1 e **reprova no AA**. Texto vermelho usa sempre
`#F87171` (5,4:1 ou mais). Bordas e fundos continuam no `#EF4444`. O mesmo vale para o roxo:
`#7C3AED` não passa em AA como texto pequeno sobre fundo escuro — em fundos roxos o texto é
`--omh-texto`, não o roxo.

**Tingimentos (`tokens/effects.css`) são sempre fundo, nunca texto.** Alfa baixo (10–16%), de
propósito: eles tingem a superfície e o contraste do texto continua vindo do token sólido.

**Cores de estado, sempre em trio:** borda a 40–50% + fundo a 10–15% + texto no token sólido
(claro, no caso do vermelho). É o padrão de badge, aviso, alternativa de quiz corrigida e
etiqueta de evidência.

### 3.2 Tipografia

Duas famílias, sem exceção:

- **Inter** (400/500/600/700) — todo texto.
- **JetBrains Mono** (400/500) — número quantitativo, endereço de carteira, hash, ticker,
  fórmula. Nunca texto corrido. Aplicada pela classe `.endereco` (com `word-break: break-all`)
  e via `.omh-numero`.

Corpo a **16px / line-height 1,6** — leitura longa em português. Escala em degraus de rem:
12 / 14 / 16 / 18 / 20 / 24 / 30 px. Rótulos de micro-seção em 11–12px maiúsculo com
`letter-spacing .05em`. Número grande: `clamp(1.75rem, 1.2rem + 2.2vw, 2.5rem)` em peso 700.

`.omh-numero` aplica **numeral tabular** (`font-variant-numeric: tabular-nums`) e
`letter-spacing: -0.02em` — sem isso o número "pula" na tela a cada quadro da calculadora.

### 3.3 Espaçamento, raios e bordas

- Card: **raio 12px, borda 1px, padding 20px**, fundo `--omh-superficie`.
- Caixa interna dentro do card: **raio 8px, fundo `--omh-fundo`** (mais escuro que o card —
  a hierarquia é invertida em relação ao padrão claro: afundar, não elevar).
- Botão e chip retangular: raio 8px. Badge, chip de filtro e barra de progresso: pílula (999px).
- Campo dentro de um mockup: 6px. Painel desenhado na anatomia: 10px. Anel de foco: 4px.
- Ritmo vertical: 24px entre cards de uma view (`space-y-6`), 16px dentro de grades.
- Largura máxima de conteúdo: 64rem. Sidebar: 16rem no desktop, 18rem (máx. 85vw) na gaveta.
- Alvo de toque mínimo: 44px (o polegar do range tem 24px de altura de trilha justamente
  para chegar lá).

### 3.4 Fundos, imagens e ilustração

**Não existe fotografia no produto. Não existe print de site de terceiro.** Isso é decisão
documentada em `src/components/anatomia.js` e vale para todo o hub:

1. captura de tela de produto de terceiro é material protegido, e o hub é publicado;
2. mostrar a interface de uma plataforma específica parece endosso;
3. interface de cripto muda em semanas — uma captura nasce vencida;
4. desenhando, dá para remover o ruído e destacar o que importa.

Fundos são **chapados**. Nenhuma textura, nenhum padrão repetido, nenhuma imagem full-bleed.
O único gradiente do sistema é o tingimento diagonal de 135° do cartão de destaque, com alfa
0,1–0,16 — tão discreto que quase não se lê como gradiente. Nenhum outro gradiente é permitido.

**A ilustração é o conteúdo, e é sempre desenhada em SVG/CSS/HTML**, com uma regra: todo
visual precisa mostrar uma relação (causa, ordem, proporção). Nada decorativo. O vocabulário
didático em uso no código:

| Padrão | Relação que mostra | Componente |
|---|---|---|
| Fluxograma / mapa de decisão | causa e sequência | `Diagrama`, `CardsDeFases` |
| Anatomia de tela anotada | onde olhar | `Anatomia` |
| Linha do tempo | ordem e distância no tempo | `LinhaDoTempo` |
| Barras na mesma escala | proporção entre grandezas | `GraficoDeBarras` |
| Barras empilhadas | como um total se reparte | `GraficoEmpilhado` |
| Comparação lado a lado | diferença entre categorias | `TabelaComparativa` |
| Controle deslizante que muda a conta | sensibilidade | `Calculadora` |
| Sequência passo a passo | ordem de execução | `Segmentos`, `Checklist` |
| Número grande de abertura | a tese antes do parágrafo | `Destaques` |

**Acessibilidade de visual, invertida de propósito conforme o caso:** em diagrama e gráfico,
o desenho é o conteúdo e existe sempre uma **reserva em texto** (lista de "rótulo — valor")
mostrada se o CDN falhar, e que também é o que o leitor de tela lê. Na calculadora é o
contrário: o **número é o conteúdo** e as barras são enriquecimento (por isso são CSS puro,
não Chart.js — atualizam a cada quadro do arrasto e não têm o que "cair na reserva").

### 3.5 Animação e movimento

Curto e discreto. Nada entra deslizando, nada quica, nada pulsa.

- `120ms ease` — polegar do range, marcador da anatomia (`scale(1.15)` / `scale(1.18)`).
- `150ms ease` — cor de botão, link, borda de card no hover; rotação da seta de `<details>`.
- `200ms ease` — largura da barra de progresso, gaveta do menu (`translateX`), saída do toast
  (opacidade).
- `400ms ease` — virar o card de viés (`rotateY(180deg)`). É o único movimento longo do sistema.
- Easing: `ease` puro. Não há cubic-bezier customizado, não há spring, não há bounce.
- `prefers-reduced-motion: reduce` **zera tudo** (`0.01ms !important`), inclusive
  `scroll-behavior`.

### 3.6 Estados

- **Hover** — quase nunca é mudança de fundo. O padrão é **clarear a borda**:
  `border-borda` → `border-texto-suave`. Em card de rota: `border-primaria/60`. O botão
  primário é a exceção: fundo a 85% de opacidade. Link de sidebar inativo escurece um fundo
  (`bg-borda/50`) e clareia o texto.
- **Press / selecionado** — não há shrink nem sombra. Selecionado = `border-primaria` +
  `bg-primaria/15`. É o mesmo tratamento para aba ativa, chip de filtro ativo e opção
  escolhida no simulador.
- **Foco** — contorno `2px solid var(--omh-acento)` com `outline-offset: 2px` e raio 4px.
  Sempre visível, nunca removido. Exceção deliberada: alvos que só recebem foco por código
  (`#conteudo`, resumos de quiz e simulador) têm `outline: none`, porque mover o foco ali é
  para leitor de tela e teclado — um contorno só confundiria.
- **Disabled** — `opacity: 0.5` + `cursor: not-allowed`. Nunca escondido.
- **Marcado / concluído** — borda e fundo verdes a baixa opacidade
  (`border-risco-baixo/50 bg-risco-baixo/5`) + `line-through` no texto do item.
- **Corrigido (quiz)** — alternativa certa em verde, a escolhida errada em vermelho, as
  demais em `opacity: 0.7`.

### 3.7 Sombra, transparência e blur

- **Uma única sombra em todo o sistema**: o toast (`shadow-lg`). Elevação é feita por cor de
  superfície, não por sombra.
- **Nenhum blur.** Não há `backdrop-filter` em lugar nenhum.
- Transparência só em: tingimentos de fundo (10–16%), bordas de estado (40–60%), estado
  disabled (50%), e o véu atrás da gaveta do mobile (`rgba(0,0,0,.6)`).
- Não há "gradiente de proteção" sobre imagem — não há imagem.

### 3.8 Layout

- Duas colunas: sidebar fixa (`position: sticky`, 16rem) + conteúdo. Abaixo de **1024px** a
  sidebar vira gaveta (`translateX(-100%)`, 200ms) com véu clicável, foco preso, `Esc` para
  fechar, atributo `inert` quando fechada, e o `<header>` mobile grudado no topo com o botão
  de menu.
- **Barra de progresso global** de 1px fixa no topo da janela (`z-50`), em `--omh-primaria`
  sobre `--omh-borda`.
- **Link "Pular para o conteúdo"** é o primeiro `Tab` da página; fica fora da tela até
  receber foco.
- **Toasts** no canto inferior direito (`inset-x-4 bottom-4` no mobile), região `aria-live`.
- Conteúdo centralizado em `max-width: 64rem`.
- **Funciona a partir de 390px de largura.** Grades usam `sm:grid-cols-2` / `xl:grid-cols-2`
  e empilham sozinhas; diagramas largos rolam na horizontal dentro do próprio card
  (`overflow-x-auto` com `tabindex="0"`), nunca esticam a página.

---

## 4. Iconography

**O hub praticamente não usa ícones — e isso é uma decisão, não uma lacuna.**

- **Nenhuma biblioteca de ícones.** Nem Lucide, nem Heroicons, nem Font Awesome, nem ícone
  font. Nenhum SVG de ícone vindo de CDN externo. O código anexado contém **um único arquivo
  SVG**: `assets/icons/icon.svg`.
- **Logo / marca.** `assets/icons/icon.svg` é o ícone do app: hexágono em gradiente roxo
  (`#8B5CF6` → `#6D28D9`) sobre quadrado `#0B0F17` de raio 112/512, com um anel ciano
  `#22D3EE` de 16px no centro. Ele serve, sozinho, de favicon, ícone do manifest PWA e
  apple-touch-icon — sem gerar PNGs em vários tamanhos. **Não existe wordmark.** Onde um
  logotipo apareceria (cabeçalho da sidebar, header mobile), o produto escreve o nome em
  tipo puro: `onchain-mastery-hub`, peso 600, 14px. O design system faz o mesmo.
  Copiado para `assets/icons/icon.svg` (metadados C2PA removidos; geometria intacta).
- **Caracteres Unicode como ícones**, em cinco lugares, sempre com `aria-hidden="true"`:
  - `☰` — botão de menu mobile
  - `▾` — seta de `<details>` (`group-open:rotate-180`)
  - `→` — "Abrir →", "Revisar agora →", seta entre passos de fluxo
  - `⇢` — seta tracejada, último passo de um fluxo ("⇢ Maioria vai a zero")
  - `✓` — "Estudado ✓"
- **Marcador numerado** — círculo ciano com número em peso 700 e texto `#0B0F17`, desenhado
  em SVG pela `Anatomia`. É o mais próximo de um sistema de ícones que o produto tem.
- **Sem emoji.** Nunca, em nenhum lugar.

**Ao desenhar para este sistema:** não adicione um set de ícones. Se um affordance precisar
de sinal visual, use um dos caracteres acima, um marcador numerado, ou texto. Nenhuma
substituição de ícone foi feita neste design system porque não havia set a substituir.

---

## 5. Additions e desvios (honestidade sobre o que não veio do código)

**Adições intencionais** (nenhum componente novo; só empacotamento):

- `GraficoDeBarras` e `GraficoEmpilhado` são reimplementados **em CSS puro**, reproduzindo a
  *reserva em texto + barras* do original. O código real desenha com Chart.js carregado de
  CDN; um design system não deve depender de CDN, e a reserva já é a versão acessível
  canônica. Mesma geometria, mesmas cores, mesma escala.
- `Diagrama` renderiza o **fluxo de reserva em chips** (a versão que o código mostra quando o
  Mermaid não carrega), não Mermaid. Motivo idêntico.

**Padrões descritos no briefing que NÃO existem no código anexado** — não foram inventados:

- **grade de 100 para probabilidade** e **ciclo** (diagrama circular) não têm implementação em
  `src/components/`. Ficam documentados aqui como intenção, sem componente.
- **mapa mental** existe apenas como um fluxograma Mermaid (`graph LR`), não como um
  componente próprio.

**Fontes:** Inter e JetBrains Mono são carregadas do Google Fonts, exatamente como no
`index.html` original. **Nenhum arquivo de fonte (.woff2/.ttf) acompanha o código anexado**,
então nenhum foi copiado — `tokens/fonts.css` faz `@import` do Google Fonts. Se o projeto
passar a hospedar os binários, troque esse `@import` por `@font-face` locais.

---

## 6. Índice do repositório

```
readme.md              este arquivo
SKILL.md               invocação como Agent Skill
styles.css             entrada global (só @import)
thumbnail.html         tile do design system
tokens/                colors · typography · spacing · radii · borders
                       effects · motion · fonts · base · utilities
assets/icons/          icon.svg (marca do app; único asset visual do código)
guidelines/            cards de especimen das fundações (Design System tab)
components/            primitivos React, agrupados por preocupação
ui_kits/               recriações de telas reais do produto
templates/             pontos de partida para projetos consumidores
```

### Templates (pontos de partida)

- **`templates/casca-do-hub/`** — o layout de toda rota: barra de progresso global de topo,
  link de pular conteúdo, sidebar de 16rem com progresso por rota, `<main id="conteudo">` e o
  rodapé com o aviso de risco. Comece aqui para qualquer rota nova.
- **`templates/pagina-de-modulo/`** — uma rota de módulo completa: cabeçalho, números de
  abertura, objetivos, termos-chave, cards de seção com ideia central e exemplo resolvido,
  e o mini-quiz do fim.

Cada template carrega o design system por um `ds-base.js` vizinho — num projeto consumidor,
é a única linha a trocar (`const base = …`).

### Componentes

**`components/core/`** — primitivos de `src/ui.js`
`Botao` · `Card` · `Titulo` · `BadgeRisco` · `BarraProgresso` · `Chip` · `Etiqueta` · `Toast`

**`components/navegacao/`** — casca do app
`Sidebar` · `Abas` · `CabecalhoMobile` · `ProgressoGlobal`

**`components/didatica/`** — o vocabulário visual que ensina
`Destaques` · `LinhaDoTempo` · `Anatomia` · `Calculadora` · `GraficoDeBarras` ·
`GraficoEmpilhado` · `TabelaComparativa` · `CardsDeFases` · `Diagrama` · `CardDeVies`

**`components/aprendizado/`** — as peças de estudo
`CardDaSecao` · `Quiz` · `Checklist` · `CardDeTermo` · `MatrizDeFerramentas` ·
`CardDeCenario` · `Video` · `PerguntaDaParte` · `Termos` · `Segmentos` · `CardDeRota`

Cada diretório tem um `<Nome>.jsx`, um `<Nome>.d.ts` com o contrato de props, um
`<Nome>.prompt.md` com o "o quê & quando", e um card HTML de vitrine.

### UI kits

- **`ui_kits/site/`** — o site estático: tela inicial, página de módulo com abas, glossário,
  checklist antes de comprar. Click-through real entre as rotas.
- **`ui_kits/app-desktop/`** — o mesmo hub como PWA instalado, com o botão "Instalar app" e o
  estado `display-mode: standalone`.

---

## 7. Regras não negociáveis

1. Dark mode. Sem tema claro.
2. Português do Brasil. Vírgula decimal.
3. Sem emoji. Sem ícone de CDN. Sem foto. Sem print de site de terceiro.
4. Nenhum número inventado — vem de `src/data/*.js` com fonte; exemplo hipotético é marcado
   como "fictício"/"inventado".
5. Todo visual mostra uma relação (causa, ordem, proporção). Nada decorativo.
6. Contraste AA. Texto vermelho é sempre `#F87171`.
7. Teclado sempre: foco visível, `Esc` fecha, setas navegam abas, foco devolvido depois de
   redesenho de lista.
8. Funciona a partir de 390px.
9. Tom claro e direto. Sem hype, sem promessa de lucro.
