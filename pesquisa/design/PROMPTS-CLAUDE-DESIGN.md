# Prompts para o Claude Design

Objetivo: tornar o app mais compreensível com **mapas mentais, fluxogramas, sequências,
ciclos, linhas do tempo, comparações, barras na mesma escala, controles interativos e
anatomias de tela** — sem mudar a identidade visual do app (ciano, Inter, cards escuros).

Pasta para anexar: `C:\Users\dreis\Documents\omh-design-system`
(tem o estilo do app e todo o conteúdo: `src/data/*.js` e `src/views/*.js`).

Fluxo: um projeto por módulo → anexe os 2 arquivos indicados → cole o prompt base + o
prompt do módulo → ajuste conversando → exporte e entregue no chat do Claude Code.

---

## 0. Design system (refazer — o primeiro saiu sem o código)

1. **Design systems** → novo.
2. **Company name and blurb:**

```
onchain-mastery-hub (OMH Hub): central de estudos em português do Brasil para aprender trading on-chain e memecoins do zero. Site estático + app desktop. Público: iniciante total, que nunca programou nem operou cripto. Dark mode.
```

3. **Link code from your computer** → a pasta `omh-design-system`. Deixe o GitHub vazio.
4. **Add fonts, logos and assets** → `assets/icons/icon.svg`.
5. **Any other notes?:**

```
IMPORTANTE: reproduza o visual que JÁ existe no código anexado (index.html, styles/custom.css, src/ui.js, src/components). Não crie identidade nova, não troque cores nem fontes, não invente telas.
Tokens: fundo #0B0F17, superfície #141A24, borda #1F2733, texto #E6EDF3, texto suave #9AA7B4, primária #7C3AED (aba ativa, progresso), acento #22D3EE (destaques, links), risco baixo #22C55E, médio #F59E0B, alto #EF4444 (texto vermelho sempre #F87171). Fontes: Inter (texto) e JetBrains Mono (números, endereços, fórmulas). Cards raio 12px, borda 1px, padding 20px; caixas internas raio 8px com fundo #0B0F17.
Linguagem visual didática (é o foco): mapas mentais, fluxogramas de decisão, sequências passo a passo, ciclos, linhas do tempo, comparação lado a lado, barras na mesma escala, grade de 100 para probabilidade, anatomia de tela anotada, controles deslizantes que mudam a conta. Tudo em SVG desenhado; nunca foto ou print de site; sem ícones de CDN externo.
Regras: nenhum número inventado (vem de src/data/*.js; exemplo hipotético marcado "inventado"); todo visual precisa mostrar uma relação (causa, ordem, proporção) — nada decorativo; sem emoji; contraste AA; teclado; funciona em 390px. Tom: claro, direto, sem hype, sem promessa de lucro.
```

6. **Generate.** Quando terminar, confira no `readme.md` do resultado: não pode dizer "não
   havia codebase" e a cor de acento tem que ser `#22D3EE`. Se disser, me mande o zip.

---

## Tudo de uma vez (um projeto só)

Anexe a pasta inteira `omh-design-system` (ou todos os `src/data/modulo1.js` … `modulo7.js`
e `src/views/modulo1.js` … `modulo7.js`). Cole:

```
Use o design system do OMH Hub (o do código anexado: ciano #22D3EE, Inter, cards escuros de raio 12px). Português do Brasil.
Objetivo: deixar os 7 módulos muito mais fáceis de entender para um iniciante total, trocando texto denso por visuais que mostram relações.
Conteúdo: use SÓ o que está em src/data/moduloN.js. Não invente número, data, nome ou caso. Exemplo hipotético marcado como "inventado". Visuais em SVG desenhado, sem foto, sem emoji, sem ícone de CDN. Cada visual mostra uma relação (causa → efeito, ordem, proporção, comparação); nada decorativo.

Crie primeiro, como componentes novos no mesmo estilo: MapaMental, Ciclo, GradeDe100, BarrasNaMesmaEscala, CurvaDeslizante, Fluxograma (SVG, sem Mermaid).

Depois, para CADA módulo, uma página (artboard desktop ~820px) com:
1. MAPA MENTAL do módulo no topo (um ramo por aba, 2–3 ideias em cada).
2. Para cada aba, o visual principal abaixo:
- M1 Fundamentos & Segurança: sequência de uma transação; chave privada → pública → endereço; 12 palavras → chaves ("quem tem × quem perde"); drainer em 4 etapas; address poisoning com os caracteres iguais destacados; fluxograma do plano de emergência; os 4 golpes do Brasil como cartões; fluxograma "está na lista da CVM? é autorizada pelo Banco Central?".
- M2 Psicologia: 5 vieses "o que você pensa → o que acontece → o que fazer"; mapa dos tipos de token; linha do tempo TRUMP, MELANIA, LIBRA; as 4 fases em sequência (sem curva de preço inventada).
- M3 Os dois pilares: mapa social × técnico; ciclo da narrativa (nasce → esteira → rotação → saturação); fluxograma "narrativa ou hype de um token?"; endereço oficial × falso; matriz de ferramentas filtrável; linha do tempo do cenário.
- M4 Gestão & decisão: tese × catálise lado a lado; escada de realização em degraus; barras da calculadora de recuperação; fluxograma das checagens "antes de entrar".
- M5 Execução: as 3 camadas em pilha; fluxograma "se o app sair do ar"; caminho do token (bonding curve 1,25% → PumpSwap → AMM madura 0,25%); sequência do ataque sandwich; fluxograma "a venda não caiu na carteira?"; manter a matriz 3,2% / 2,4% / 1,4%.
- M6 Ler a tela: barras na mesma escala (market cap US$ 50 mil × liquidez US$ 8 mil, só US$ 4 mil em SOL paga quem vende, exemplo inventado); curva deslizante de quanto sai (2,57% → −10%; 14,64% → −50%); carteira A ⇄ B do wash trading; árvore SPL × Token-2022; grade de 100 do detector (~95 de 100 marcados são rug; pega ~68 de 100 rugs).
- M7 A rotina (o app NÃO escreve a regra de compra do aluno): as 5 partes da regra com campo para preencher; fração fixa 100 → 90 → 9; barras de amostra 400 × 1.600; "o que dizem × o que a evidência mostra".
Se não couber tudo numa resposta, faça os componentes e o M1, e continue pelos outros quando eu disser "continua".
```

---

## Prompt base (cole no início de cada módulo)

```
Use o design system do OMH Hub (o do código anexado: ciano #22D3EE, Inter, cards escuros de raio 12px). Português do Brasil.
Objetivo: deixar este módulo muito mais fácil de entender para um iniciante total, trocando texto denso por visuais que mostram relações.
Conteúdo: use SÓ o que está no arquivo de dados anexado. Não invente número, data, nome ou caso. Exemplo hipotético sempre marcado como "inventado".
Visuais: em SVG desenhado, sem foto, sem emoji, sem ícone de CDN. Cada visual precisa mostrar uma relação (causa → efeito, ordem, proporção, comparação). Nada decorativo.
Estrutura de cada aba: mapa ou gancho no topo → explicação curta → o visual principal → algo que o leitor mexe (quando fizer sentido) → "Para ir mais fundo" recolhido.
Entregue desktop (conteúdo ~820px) e celular (390px). Uma aba por artboard.
Referência aprovada: aba "Os números" do M6 — barras na mesma escala (market cap US$ 50 mil tracejado × liquidez US$ 8 mil, só US$ 4 mil em SOL paga quem vende) e curva interativa (2,57% da liquidez derruba o preço 10%; 14,64% derruba 50%).
```

---

## 1. Módulo 6 — Ler a tela
Anexe: `src/data/modulo6.js`, `src/views/modulo6.js`

```
[prompt base]
Módulo 6 — Ler a tela. Abas: Os números · Volume falso · O contrato · Prever o golpe · Quiz.
- Abertura: MAPA MENTAL do módulo (4 ramos = 4 abas, 2–3 ideias em cada).
- Os números: barras na mesma escala (market cap × FDV × liquidez); curva interativa "quanto sai"; zeros compactados como "lupa" ($0.0₅2786 → 0,000002786, e o erro de ler 19 mil vezes maior); PnL realizado × não realizado lado a lado.
- Volume falso: SEQUÊNCIA carteira A ⇄ carteira B da mesma pessoa; barras do custo por US$ 1 milhão (US$ 13 mil × US$ 23 mil); FLUXOGRAMA "o sinal é caro de falsificar?"; bundle: 5 transações entrando juntas no mesmo bloco; "Total bundled %" × "Current held %".
- O contrato: ÁRVORE "SPL clássico × Token-2022" com as extensões perigosas marcadas; FLUXOGRAMA de checagem (programa → extensões → mint → freeze → metadata); mapa das 3 autoridades.
- Prever o golpe: GRADE DE 100 ("de cada 100 marcados, ~95 são rug; de cada 100 rugs, pega ~68"); comparação F1 0,79 × chute "tudo é rug" 0,90; MCC numa régua de −1 a 1 (0,39); "a régua muda o número" (81,9% × 3,59% × 98,6%).
```

## 2. Início e menu
Anexe: `src/views/inicio.js`, `src/components/revisao.js`

```
[prompt base]
Tela Início + menu lateral. Blocos: próxima ação, revisão de hoje, progresso por módulo (quiz 50% + concluído 50%), plano, como estudar, exportar/importar.
- MAPA DA TRILHA: os 7 módulos + Checklist + Revisão como um mapa com o que já foi feito.
- "Próxima ação" como elemento principal (em 3 segundos a pessoa sabe o que fazer).
- "Como estudar" como CICLO: ler → responder → revisar no dia 1, 3, 7, 16, 35.
```

## 3. Módulo 1 — Fundamentos & Segurança
Anexe: `src/data/modulo1.js`, `src/views/modulo1.js`

```
[prompt base]
Módulo 1. Abas: Fundamentos · Carteiras · Seed phrase · Golpes · Defesa · Brasil · Quiz.
- Abertura: MAPA MENTAL do módulo.
- Fundamentos: SEQUÊNCIA de uma transação (assinar → rede → bloco → confirmações); anatomia anotada de uma transação no explorador; CEX × DEX lado a lado (quem guarda a chave).
- Carteiras: ÁRVORE chave privada → chave pública → endereço (seta de mão única); comparação das 3 carteiras (quente, fria, corretora) e FLUXOGRAMA "qual carteira faz sentido para mim?".
- Seed phrase: 12 palavras → semente → árvore de chaves e endereços; "quem tem × quem perde"; as 5 formas de perder como mapa.
- Golpes: SEQUÊNCIA do drainer em 4 etapas; address poisoning com os dois endereços parecidos e os caracteres do começo e do fim destacados; clipper trocando o endereço colado.
- Defesa: FLUXOGRAMA do plano de emergência (o que fazer primeiro); revogar aprovações: "resolve × não resolve".
- Brasil: os 4 golpes como cartões comparáveis (promessa → armadilha → sinal); FLUXOGRAMA "antes de pôr dinheiro: está na lista da CVM? é autorizada pelo Banco Central?"; linha do tempo da Atlas Quantum (2019 → 2024).
```

## 4. Módulo 3 — Os dois pilares
Anexe: `src/data/modulo3.js`, `src/views/modulo3.js`

```
[prompt base]
Módulo 3. Abas: Visão geral · Narrativas · Pilar social na prática · Pilar técnico na prática · Matriz de ferramentas · Cenário 2025–2026 · Quiz.
- Visão geral: MAPA MENTAL dos dois pilares (social × técnico) e onde eles se cruzam.
- Narrativas: CICLO nascimento → esteira → rotação → saturação; mapa "onde nasce" (fontes); FLUXOGRAMA "narrativa ou só hype de um token?". Não desenhar curva de preço inventada.
- Pilar social: endereço oficial × falso; rotina em SEQUÊNCIA; sinais de call pago como checklist visual.
- Pilar técnico: anatomias anotadas das ferramentas (já existem no código — manter e melhorar).
- Matriz: tabela filtrável (grátis/pago, para que serve).
- Cenário: LINHA DO TEMPO com os eventos do arquivo.
```

## 5. Módulo 2 — Psicologia das memecoins
Anexe: `src/data/modulo2.js`, `src/views/modulo2.js`

```
[prompt base]
Módulo 2. Abas: Visão geral · Vieses · Tipos de token · Casos reais · As 4 fases · Quiz.
- Abertura: MAPA MENTAL do módulo.
- Vieses: 5 cartões "o que você pensa → o que acontece → o que fazer"; FLUXOGRAMA "estou em FOMO?".
- Tipos de token: mapa dos 10 tipos agrupados.
- Casos reais: LINHA DO TEMPO de TRUMP, MELANIA e LIBRA com os números do arquivo.
- As 4 fases: SEQUÊNCIA das fases, sem curva de preço inventada.
```

## 6. Módulo 4 — Gestão, catálises & decisão
Anexe: `src/data/modulo4.js`, `src/views/modulo4.js`

```
[prompt base]
Módulo 4. Abas: Tese vs. catálise · Take profit · Antes de entrar · Simulador · Quiz.
- Abertura: MAPA MENTAL do módulo.
- Tese × catálise lado a lado; tipos de catálise como mapa.
- Take profit: ESCADA de realização em degraus; calculadora de recuperação como barras ("perder X% pede +Y% para voltar", com os valores do arquivo).
- Antes de entrar: FLUXOGRAMA das checagens, cada saída "não" levando a "não entra".
- Simulador: manter a mecânica, melhorar o visual do resultado.
```

## 7. Módulo 7 — A rotina
Anexe: `src/data/modulo7.js`, `src/views/modulo7.js`

```
[prompt base]
Módulo 7. Abas: A regra · Tamanho · O diário · A revisão · Números que circulam · Quiz.
Importante: o app NÃO escreve a regra de compra do aluno; a tela ajuda o aluno a escrever a própria.
- Abertura: MAPA MENTAL do módulo.
- A regra: as 5 partes da regra como SEQUÊNCIA numerada, cada uma com campo para o aluno preencher.
- Tamanho: fração fixa em SEQUÊNCIA (100 → 90 → posição de 9); controle deslizante 10% × 25% por posição.
- O diário: formulário visual.
- A revisão: amostra (2 ÷ 0,1)² = 400 × (2 ÷ 0,05)² = 1.600 em barras.
- Números que circulam: cartões "o que dizem × o que a evidência mostra".
```

## 8. Módulo 5 — A mecânica da execução
Anexe: `src/data/modulo5.js`, `src/views/modulo5.js`

```
[prompt base]
Módulo 5. Abas: Terminal · Custódia · Taxas · Configurações · Erros · Processo · Quiz.
- Abertura: MAPA MENTAL do módulo.
- Terminal: as 3 camadas em pilha (terminal → plataforma → rede).
- Custódia: FLUXOGRAMA "se o app sair do ar, com semente × sem semente".
- Taxas: é a referência original — manter a matriz 3,2% / 2,4% / 1,4%; caminho do token em SEQUÊNCIA (bonding curve 1,25% → PumpSwap → AMM madura 0,25%).
- Configurações: slippage, prioridade e MEV como SEQUÊNCIA do ataque sandwich (bot compra antes → você compra → bot vende depois).
- Erros: FLUXOGRAMA "a venda não caiu na carteira?".
- Processo: SEQUÊNCIA do token ao encerramento.
```

## 9. Checklist, Glossário, Revisão, Simulador e Quiz
Anexe: `src/data/checklist.js`, `src/views/checklist.js` (e os das outras telas, uma por vez)

```
[prompt base]
Telas: Checklist antes de comprar (abas Checar um token · Fluxograma · De onde vem cada item), Glossário, Revisão espaçada, simulador de cenários e quiz (chips de confiança "Chutei / Mais ou menos / Tenho certeza").
- Checklist: FLUXOGRAMA de decisão completo, cada item com a etiqueta de força da evidência.
- Glossário: MAPA dos termos por categoria, ligando termos relacionados.
- Revisão: CICLO dos intervalos 1 → 3 → 7 → 16 → 35 dias; calibração "quando você tem certeza, acerta?" em barras.
- Simulador e Quiz: feedback visual da resposta (certa, errada, por que a sua não serve).
Uma tela por vez.
```

---

## 10. Animações (template "Animation")

Um projeto por animação. Anexe o arquivo de dados do módulo indicado.

**Prompt base de animação** (cole antes de cada uma):

```
Use o design system do OMH Hub (ciano #22D3EE, fundo #0B0F17, Inter + JetBrains Mono). Português do Brasil.
Crie uma animação explicativa curta (20 a 40 segundos), feita em HTML + SVG + CSS, sem biblioteca externa nova, sem vídeo, sem áudio, sem 3D.
Regras:
- Cada cena mostra UMA ideia, com uma legenda curta embaixo (até 12 palavras).
- Controles visíveis: Tocar/Pausar, Voltar cena, Avançar cena, e uma barra com as cenas numeradas. O leitor pode ir no próprio ritmo.
- Acessível: funciona por teclado; com "reduzir movimento" ligado no sistema, mostra as cenas paradas lado a lado, sem animar.
- Movimento discreto (ease, 200–600ms). Nada quica, nada pisca, nada decorativo.
- Números só do arquivo anexado. Exemplo hipotético marcado "exemplo inventado" na tela.
- Sem logotipo nem tela real de plataforma (ilustração esquemática).
- Largura ~820px, e se adapta a 390px.
```

### 10.1 A pool x · y = k (Módulo 6 — anexe `src/data/modulo6.js`)

```
[prompt base de animação]
Animação: "Por que cada venda sai mais barata que a anterior".
Cenas:
1. Uma pool com dois potes: SOL de um lado, tokens do outro (exemplo inventado: US$ 4 mil em SOL + US$ 4 mil em tokens = US$ 8 mil de liquidez).
2. A regra: SOL × tokens = k, e k fica constante a cada troca.
3. Você vende tokens: o pote de tokens enche, o de SOL esvazia, o preço cai. Mostrar o preço num marcador.
4. Vende o mesmo tanto de novo: recebe menos SOL que da primeira vez.
5. Placar final: para derrubar o preço 10%, sai 2,57% da liquidez; para derrubar 50%, sai 14,64%.
6. Fechamento: "a porcentagem não depende do tamanho da pool" (repetir as cenas 3–5 com uma pool 10× maior e os mesmos %).
```

### 10.2 O drainer em 4 etapas (Módulo 1 — anexe `src/data/modulo1.js`)

```
[prompt base de animação]
Animação: "Como você perde tudo sem entregar a frase-semente".
Use as etapas e os nomes de `wallet-drainers-conceito` e `roteiro-do-golpe-passo-a-passo`.
Cenas: o anúncio ou link falso → o site que imita um site conhecido → o pedido de assinatura que parece rotina (destacar o que a assinatura realmente autoriza) → os tokens saindo da carteira sem a seed ter sido vista.
Última cena: o que interrompe o golpe (do arquivo: revogar aprovações, desconfiar de assinatura inesperada).
```

### 10.3 O ataque sandwich (Módulo 5 — anexe `src/data/modulo5.js`)

```
[prompt base de animação]
Animação: "O sanduíche: o robô compra antes e vende depois de você".
Use o texto de `slippage-priority-mev`.
Cenas: sua ordem de compra aparece na fila → um bot vê e passa na frente comprando → o preço sobe e você compra mais caro → o bot vende logo depois e fica com a diferença → o que o slippage tem a ver com isso (slippage alto = mais espaço para o bot).
Sem valores de lucro do bot que não estejam no arquivo.
```

### 10.4 Do lançamento à graduação (Módulo 5 — anexe `src/data/modulo5.js`)

```
[prompt base de animação]
Animação: "O caminho de um token do pump.fun".
Use `o-venue-muda-o-custo`.
Cenas: o token nasce na bonding curve (a fórmula define o preço conforme as pessoas compram; taxa da pool 1,25%) → gradua e vai para o PumpSwap, a pool oficial (1,25% enquanto o market cap é pequeno, cai por faixas) → AMM madura como a Raydium (0,25%) → comparação final: a mesma ordem de R$512 custa ≈ 2,4% num lugar e ≈ 1,4% no outro.
Não mostrar valor em SOL para graduar (não verificado para hoje).
```

### 10.5 A vida de uma narrativa (Módulo 3 — anexe `src/data/modulo3.js`)

```
[prompt base de animação]
Animação: "Nasce, puxa outros tokens, roda e satura".
Use as seções `o-que-e`, `onde-nasce`, `ciclo` e `narrativa-e-preco` de praticaNarrativas.
Cenas: onde a narrativa nasce (fontes do arquivo) → o primeiro token chama atenção → a esteira: tokens parecidos aparecem em seguida → rotação: a atenção migra para outra narrativa → saturação.
Cena final obrigatória com o aviso do arquivo: reconhecer a narrativa não prevê o preço sozinho.
Sem curva de preço inventada.
```

### 10.6 Address poisoning (Módulo 1 — anexe `src/data/modulo1.js`)

```
[prompt base de animação]
Animação: "O endereço quase igual".
Use `address-poisoning-e-clipper`.
Cenas: você manda para um endereço conhecido → o golpista envia uma transação de valor zero de um endereço com o começo e o fim iguais → no histórico, os dois parecem idênticos (destacar só os caracteres do meio, que mudam) → você copia do histórico e manda para o golpista → a regra: conferir o endereço inteiro, não só as pontas.
Endereços de exemplo inventados e marcados.
```

---

## 11. Folha-resumo por módulo — CANCELADA pelo dono em 17/09/2026

Um projeto por módulo. Anexe `src/data/moduloN.js`.

```
Use o design system do OMH Hub, mas em versão para IMPRESSÃO: fundo branco, texto #0B0F17, acento #0E7490 (ciano escuro, legível no papel), Inter + JetBrains Mono. Português do Brasil.
Crie a folha-resumo do Módulo N em UMA página A4 (794 × 1123 px), para imprimir e revisar.
Conteúdo, só do arquivo anexado (nenhum número inventado):
1. Título do módulo + a frase que resume o módulo inteiro.
2. MAPA MENTAL do módulo (um ramo por aba, 2–3 ideias em cada), ocupando ~1/3 da página.
3. "Números para lembrar": 4 a 6 números com uma linha de contexto cada e a fonte abreviada.
4. "Os erros mais comuns": 3 itens, cada um com o que fazer no lugar.
5. "Antes de agir, confira": checklist de 4 a 6 caixinhas.
6. Rodapé: "Material de estudo, não é recomendação de investimento" + "OMH Hub · Módulo N".
Regras: corpo com no mínimo 11pt; sem foto, sem emoji, sem ícone de CDN; tudo cabe em uma página (se não couber, corte texto, não diminua a letra); contraste alto também em preto e branco.
Exporte em PDF.
```

Troque `N` pelo número do módulo. Faça os 7 e me entregue os PDFs e o pacote do projeto.
