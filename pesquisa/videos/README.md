# Prompts de vídeo — um por aula (46)

Gerados por `scripts/gerar-prompts-de-video.mjs` a partir de `src/data/`. **Não edite
estes arquivos à mão**: mude o texto do módulo (ou o script) e rode de novo:

```
node scripts/gerar-prompts-de-video.mjs
```

## Como usar

Um chat por vídeo. Copie o arquivo inteiro e cole no Gemini. Peça os **três
entregáveis** que o prompt lista: o vídeo, o resumo navegável em texto e a lista
de números usados. O resumo vira a `transcricao` do vídeo em `src/data/moduloN.js`
— sem ele, o vídeo é o único elemento do hub sem versão em texto. Não é a narração
palavra por palavra: texto idêntico à fala, junto do vídeo, atrapalha (redundância).

## Limite de tamanho — leia antes de gerar os 46

Os vídeos ficam no próprio repositório, servidos pelo GitHub Pages, que aceita
**site publicado de até 1 GB**. O primeiro vídeo (8 min, 720p) tem 48,5 MB, cerca de
6 MB por minuto.

| Se cada vídeo tiver | 46 vídeos ocupam | Cabe? |
|---|---:|---|
| 8 min (como o primeiro) | ~2,2 GB | **não** |
| 5 min | ~1,4 GB | **não** |
| 4 min | ~1,1 GB | **não** |
| 3 min | ~837 MB | sim |

A duração-alvo nos prompts é **4 a 5 minutos**, mas com 46 vídeos isso passa
de 1 GB no bitrate do primeiro. Três saídas: re-encodar mais leve (abaixo de ~5 MB por
minuto), gravar só os vídeos que o curso mais depende, ou hospedar parte fora do
repositório. Vídeo **não** entra no
precache do service worker — funciona online; o texto do módulo funciona offline.

## Ordem sugerida de gravação

Comece pelos que o curso mais depende: **9** (seed), **10** (drainers), **30**
(taxas), **33** (fluxo de decisão). Os procedimentais (**2, 8, 12, 13**) são os que
mais ganham com vídeo.

## Índice

| # | Módulo | Aba | Vídeo | Arquivo | Palavras |
|---|---|---|---|---|---:|
| 1 | M1 | Fundamentos | O que é uma blockchain e por que ela é "imutável" | `VIDEO-01-M1-o-que-e-blockchain.md` | 1178 |
| 2 | M1 | Fundamentos | Explorador de blocos: como ler uma transação | `VIDEO-02-M1-ler-uma-transacao.md` | 1105 |
| 3 | M1 | Fundamentos | Chave pública, chave privada e endereço | `VIDEO-03-M1-chave-publica-privada-endereco.md` | 840 |
| 4 | M1 | Fundamentos | A mecânica do gas (taxa de rede) | `VIDEO-04-M1-mecanica-do-gas.md` | 989 |
| 5 | M1 | Fundamentos | O que é um contrato inteligente, em linguagem de leigo | `VIDEO-05-M1-contrato-inteligente.md` | 928 |
| 6 | M1 | Fundamentos | Corretora (CEX) × troca on-chain (DEX): o que muda na prática | `VIDEO-06-M1-cex-x-dex.md` | 832 |
| 7 | M1 | Carteiras | Onde ficam suas chaves: CEX, hot wallet e cold wallet | `VIDEO-07-M1-cex-hot-cold.md` | 1553 |
| 8 | M1 | Carteiras | Como criar sua primeira carteira, passo a passo | `VIDEO-08-M1-criar-primeira-carteira.md` | 1048 |
| 9 | M1 | Seed phrase | Frase-semente: por que 12 ou 24 palavras SÃO a carteira | `VIDEO-09-M1-frase-semente.md` | 1672 |
| 10 | M1 | Golpes | Wallet drainers: o golpe que não rouba a sua seed | `VIDEO-10-M1-wallet-drainers.md` | 1523 |
| 11 | M1 | Golpes | Os vetores técnicos e o address poisoning | `VIDEO-11-M1-vetores-e-address-poisoning.md` | 964 |
| 12 | M1 | Defesa | Revogar aprovações: como fazer, e o que isso não resolve | `VIDEO-12-M1-revogar-aprovacoes.md` | 1659 |
| 13 | M1 | Defesa | Plano de emergência: os primeiros 10 minutos se você foi drenado | `VIDEO-13-M1-plano-de-emergencia.md` | 1178 |
| 14 | M1 | Brasil | Sacar para reais no Brasil: Pix, KYC, o marco regulatório e o imposto | `VIDEO-14-M1-sacar-para-reais-e-regulacao.md` | 2051 |
| 15 | M1 | Brasil | Golpes comuns no Brasil | `VIDEO-15-M1-golpes-comuns-no-brasil.md` | 843 |
| 16 | M2 | Visão geral | Economia da atenção: o preço é feito de olhos | `VIDEO-16-M2-economia-da-atencao.md` | 1131 |
| 17 | M2 | Vieses | Os cinco vieses que fazem você clicar | `VIDEO-17-M2-os-cinco-vieses.md` | 1350 |
| 18 | M2 | Tipos de token | Os tipos de token e como reconhecer cada um | `VIDEO-18-M2-tipos-de-token.md` | 1616 |
| 19 | M2 | Casos reais | Casos reais: o que aconteceu, com números e fonte | `VIDEO-19-M2-casos-reais.md` | 1322 |
| 20 | M2 | As 4 fases | As quatro fases de uma memecoin | `VIDEO-20-M2-as-quatro-fases.md` | 1469 |
| 21 | M3 | Visão geral | Por que duas checagens, e não uma só | `VIDEO-21-M3-por-que-duas-checagens.md` | 928 |
| 22 | M3 | Matriz de ferramentas | O pilar social e a matriz de ferramentas | `VIDEO-22-M3-pilar-social-e-ferramentas.md` | 2108 |
| 23 | M3 | Cenário 2025–2026 | O cenário 2025–2026: launchpads e o que mudou | `VIDEO-23-M3-cenario-2025-2026.md` | 831 |
| 24 | M4 | Tese vs. catálise | Tese × catálise: escrever antes de entrar | `VIDEO-24-M4-tese-vs-catalise.md` | 1642 |
| 25 | M4 | Take profit | Take profit em degraus e o erro de segurar demais | `VIDEO-25-M4-take-profit-em-degraus.md` | 1771 |
| 26 | M4 | Antes de entrar | Antes de entrar: as checagens, o tamanho da posição e a curva de recuperação | `VIDEO-26-M4-antes-de-entrar.md` | 1517 |
| 27 | M4 | Simulador | O simulador de 12 cenários: como usar e como ler o resumo | `VIDEO-27-M4-como-usar-o-simulador.md` | 1535 |
| 28 | M5 | Terminal | O que é um terminal de execução e as três camadas | `VIDEO-28-M5-o-que-e-um-terminal.md` | 1735 |
| 29 | M5 | Custódia | Quem guarda as chaves — e por que o risco real é o app sair do ar | `VIDEO-29-M5-custodia-e-o-risco-real.md` | 1921 |
| 30 | M5 | Taxas | A taxa anunciada não é o que você paga | `VIDEO-30-M5-a-taxa-anunciada-nao-e-o-custo.md` | 2511 |
| 31 | M5 | Configurações | Tipos de ordem, slippage, prioridade e proteção de MEV | `VIDEO-31-M5-slippage-prioridade-mev.md` | 2515 |
| 32 | M5 | Erros | Os erros que custam dinheiro sem envolver o mercado — e por que você não vence bots | `VIDEO-32-M5-erros-de-execucao-e-bots.md` | 1138 |
| 33 | M5 | Processo | Do "vi um token" ao "encerrei a posição" — e o registro para imposto | `VIDEO-33-M5-do-token-ao-encerramento.md` | 1958 |
| 34 | M3 | Narrativas | Narrativas: de onde vem a atenção — e o que ela não prevê | `VIDEO-34-M3-narrativas.md` | 3337 |
| 35 | M3 | Pilar social na prática | Pilar social na prática: o endereço oficial em 5 minutos, e os golpes do X, Discord e Telegram | `VIDEO-35-M3-pilar-social-na-pratica.md` | 2767 |
| 36 | M3 | Pilar técnico na prática | Pilar técnico na prática: RugCheck, Solscan, Bubblemaps e DexScreener, uma pergunta cada | `VIDEO-36-M3-pilar-tecnico-na-pratica.md` | 2438 |
| 37 | M6 | Os números | Market cap, liquidez e o PnL que não chega na carteira | `VIDEO-37-M6-os-numeros-da-tela.md` | 1625 |
| 38 | M6 | Volume falso | Volume falso e bundles: todo sinal público é otimizado contra você | `VIDEO-38-M6-volume-falso-e-bundles.md` | 1430 |
| 39 | M6 | O contrato | O contrato: SPL ou Token-2022, extensões, autoridades e o dev dump | `VIDEO-39-M6-o-contrato-do-token.md` | 1647 |
| 40 | M6 | Prever o golpe | Dá para prever um rug? O que o melhor detector acerta — e o chute que ganha dele | `VIDEO-40-M6-prever-o-golpe.md` | 1616 |
| 41 | M7 | A regra | A regra escrita antes da compra: o que ela precisa ter para ser testada | `VIDEO-41-M7-a-regra-antes.md` | 1355 |
| 42 | M7 | Tamanho | Tamanho de posição: por que a fórmula de Kelly quebra, e o que sobra é sobreviver | `VIDEO-42-M7-tamanho-de-posicao.md` | 1409 |
| 43 | M7 | O diário | O diário de 9 campos: ele ajuda a seguir a regra, não a ganhar dinheiro | `VIDEO-43-M7-o-diario.md` | 1229 |
| 44 | M7 | A revisão | Revisar sem se enganar: olhe o resultado pouco, o comportamento muito — e quantas operações provam algo | `VIDEO-44-M7-a-revisao.md` | 1130 |
| 45 | M7 | Números que circulam | As estatísticas de trading que circulam, e o dado real de cada uma | `VIDEO-45-M7-numeros-que-circulam.md` | 1286 |
| 46 | CHECKLIST | Página própria | O Checklist antes de comprar: os dois pilares, item por item, com a força de cada evidência | `VIDEO-46-CHECKLIST-checklist-antes-de-comprar.md` | 2571 |

Total: 46 prompts, ~71.201 palavras.
