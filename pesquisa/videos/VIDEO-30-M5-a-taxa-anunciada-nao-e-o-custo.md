# Vídeo 30 de 33 — A taxa anunciada não é o que você paga

**Módulo 5 — A mecânica da execução · Aba "Taxas" · Duração-alvo: 4 a 5 minutos (máximo 6)**

> Cole este documento inteiro no Gemini. Ele contém as instruções E o material-fonte.
> Gerado automaticamente a partir dos dados do app (`scripts/gerar-prompts-de-video.mjs`);
> se o texto do módulo mudar, gere de novo — o vídeo segue o texto, nunca o contrário.

## O papel deste vídeo no curso

O vídeo de referência do curso — é a aba que definiu o padrão. Arco: gancho (0,95% / 3,2% / 2×) → as cinco camadas → por que ordem pequena é penalizada → o venue muda o custo → a matriz de três cenários → a calculadora de atrito. A lição que precisa cravar: a fatia anunciada é a MENOR e a única que quase não muda.

**Conexões:** Assume o vídeo 4 (gas). É a base do vídeo 26 (tamanho de posição) e da pergunta "com quanto dá pra começar".

**Resumo do módulo, para contexto:** Este módulo fecha o ciclo do hub: depois de entender o mercado (Módulo 2), as ferramentas de análise (Módulo 3) e o processo de decisão (Módulo 4), falta a mecânica da execução — a tela onde a ordem é efetivamente enviada. O objetivo é estritamente operacional: entender o que cada botão faz, quem guarda as chaves, onde o dinheiro vaza em taxas que ninguém anuncia, e quais erros de operação são comuns. Nada aqui aumenta chance de lucro; tudo aqui existe para você não perder dinheiro por desatenção.

## Instruções para o Gemini

### Público e tom
- Público: **iniciante absoluto** — alguém que nunca abriu uma carteira. Português do Brasil, conversa direta, sem tom de palestra.
- Todo termo técnico é explicado **na primeira vez em que aparece, dentro da própria frase**. Nunca "como você já sabe".
- Uma ideia por tela. Se uma tela precisa de dois conceitos, são duas telas.

### Formato
- Narração + ilustrações esquemáticas (slides, diagramas, animações simples). Estilo visual: fundo escuro, acentos roxo e ciano, texto grande e legível no celular.
- **Estrutura obrigatória:**
  1. **Gancho (até 15 s):** abra com o número ou fato mais surpreendente da seção "Ganchos" abaixo.
  2. **Explicação:** o material-fonte, na ordem em que está.
  3. **Exemplo concreto:** pelo menos um, com número — e só números que estejam no material.
  4. **O que fazer / o que não fazer:** duas listas curtas.
  5. **Recapitulação em 3 frases.**
  6. **Frase final obrigatória (literal):** "Este vídeo é material de estudo. Não é aconselhamento financeiro, jurídico ou tributário. Memecoin é o ativo de maior risco do mercado — a maioria vai a zero."

### Regras duras — o vídeo é REJEITADO se quebrar qualquer uma
- **Não inventar número.** Use somente os números do material-fonte. Se faltar um dado, diga "isso não está verificado" em vez de estimar.
- **Não recomendar plataforma, carteira, corretora ou ferramenta.** Todo nome que aparece é exemplo de categoria. Nunca "use X", "eu recomendo", "a melhor é".
- **Não prometer resultado.** Proibido: "vai subir", "garantido", "sinal", "oportunidade", "aumenta suas chances de lucro". O enquadramento é sempre: **reduzir erro de operação e não perder dinheiro por desatenção.**
- **Não usar captura de tela de plataforma real.** Ilustração esquemática, sempre — por direito autoral, por parecer endosso, e porque interface de cripto muda em semanas.
- **Não desenhar gráfico de preço em forma de pump-and-dump** como se fosse padrão para caçar.
- **Manter a tese do curso:** memecoin sobe e desce por atenção, não por fundamento, e a maioria vai a zero.
- Se algum ponto está marcado **NÃO VERIFICADO** abaixo, o vídeo diz isso com todas as letras.

### Entregáveis (os três, sempre)
1. **O vídeo.**
2. **O roteiro de narração em texto**, em parágrafos corridos, sem timestamps — ele vira a transcrição dentro do app (acessibilidade e modo offline). Mesmo texto que foi narrado, palavra por palavra.
3. **A lista de números usados**, cada um com a frase do material-fonte de onde veio.

---

## Ganchos — os números para abrir o vídeo

São os três números do app para esta parte. Abra o vídeo com o mais surpreendente deles. Use SOMENTE estes números como gancho — não invente outros.

- **0,95%** — A fatia que é anunciada. A taxa da plataforma no nível de entrada. É a única que aparece no marketing.
- **3,2%** — O custo real de uma compra pequena. Somando as cinco camadas, numa ordem de R$100 em token na bonding curve. Mais de três vezes o número anunciado.
- **2×** — Quantas vezes você paga isso. Comprar é uma transação, vender é outra. O pedágio é cobrado nas duas pontas — inclusive quando a operação dá errado.

## MATERIAL-FONTE (copiado do app — a base do vídeo; não vá além dele)

### A taxa anunciada não é o que você paga

Toda plataforma da categoria anuncia um número — "1%", "a partir de 0,75%". Esse número é honesto no que diz e enganoso no que omite: ele é apenas a fatia da plataforma. Uma compra tem cinco camadas de custo, e a taxa anunciada é uma delas.

As outras quatro são: a taxa-base da rede Solana, fixa em 5.000 lamports por assinatura (0,000005 SOL) e cobrada mesmo quando a transação falha (solana.com/docs/core/fees); o priority fee, um pagamento extra ao validador para a transação entrar mais rápido; a gorjeta de MEV (o "bribe", via Jito), que compra proteção contra ser atacado por bots; e a taxa da pool onde a troca acontece.

Os defaults do próprio Axiom para as duas configuráveis são 0,001 SOL de priority fee e 0,001 SOL de gorjeta (docs.axiom.trade/getting-started/fees/solana-fees). Essas duas não são receita da plataforma — vão para validadores. Mas saem do seu bolso do mesmo jeito, e são justamente as que não aparecem no número anunciado.

Repare no que isso significa: numa compra pequena, a taxa da plataforma pode ser a MENOR das camadas. Não a maior. É o contrário do que a intuição sugere, e é por isso que a matriz abaixo existe.

### Por que ordem pequena é mecanicamente penalizada

Parte do custo é percentual e parte é fixa. Essa diferença é o que faz a mesma operação custar percentuais completamente diferentes conforme o tamanho.

O priority fee e a gorjeta somam 0,002 SOL nos valores padrão. Isso é fixo: custa igual se você move o equivalente a R$50 ou a R$5.000. Numa ordem de R$100, esses mesmos 0,002 SOL representam cerca de 1% do valor. Numa ordem dez vezes maior, representam 0,1%. A conta é a mesma; o peso é dez vezes menor.

E vale lembrar de um detalhe que a matriz não mostra: toda operação é ida e volta. Você paga esse conjunto de taxas ao comprar e paga de novo ao vender — inclusive quando a operação dá errado e você sai no prejuízo.

A conclusão é mecânica e não é conselho de tamanho de posição: existe um valor abaixo do qual o atrito das taxas domina o resultado. Saber calcular onde fica esse ponto é diferente de receber um número pronto de alguém.

### O mesmo terminal cobra diferente conforme onde o token está

A quinta camada — a taxa da pool — não depende do terminal. Depende de onde o token está no ciclo de vida dele, e a variação é grande o bastante para mudar a conta inteira.

Um token ainda na bonding curve do pump.fun paga 1,25% de taxa de pool, decomposta oficialmente em 0,300% para o criador do token e 0,95% para o protocolo (pump.fun/docs/fees). Depois de "graduar" para uma pool canônica do PumpSwap, continua em 1,25% enquanto o market cap é pequeno, e cai por faixas conforme cresce. Numa AMM madura como a Raydium, a taxa padrão é 0,25% (docs.raydium.io/ray/protocol-fees).

Ou seja: a mesma ordem, no mesmo terminal, no mesmo dia, custa cinco vezes mais em taxa de pool se o token for novo. Isso não é um defeito do terminal — é onde a troca está acontecendo. Mas é informação que muda a sua conta e que raramente aparece explicada.

Isso não é só taxa anunciada: um estudo da Uniswap Labs sobre 534 mil negociações reais mediu o custo total efetivo (taxa, deslizamento de preço e o que bots de MEV extraem) em 140 pontos-base por dólar negociado numa memecoin popular, contra 22 pontos-base num par entre duas moedas estáveis — 6 vezes mais caro, numa pool mais funda do que a maioria das de memecoin recém-lançada. O mesmo estudo mediu a chance de sofrer deslizamento de preço causado por um bot adversário como cerca de 80% maior ao negociar a memecoin do que ao negociar a moeda madura (Adams, Chan, Markovich & Wan, "Don't Let MEV Slip", Financial Cryptography 2024).

### Tabela do app: as cinco camadas de custo

|  | Quanto é | Quem recebe | Fixa ou variável |
|---|---|---|---|
| **1. Taxa da plataforma** (A única que costuma ser anunciada) | 0,95% líquido no nível de entrada, até 0,75% no topo (1% bruto menos a devolução em SOL). | A plataforma; parte volta ao usuário como devolução em SOL. | Variável por nível de volume. |
| **2. Taxa-base da rede** (A menor de todas, e ainda assim inescapável) | 0,000005 SOL por assinatura (5.000 lamports). Fração de centavo. | Validadores — metade é queimada. | Fixa. |
| **3. Priority fee** (Não aparece na taxa anunciada) | Configurável; o padrão do Axiom é 0,001 SOL. | O validador, integralmente. | Fixa em SOL — por isso pesa mais em ordem pequena. |
| **4. Gorjeta de MEV (Jito)** (Também não aparece na taxa anunciada) | Configurável; o padrão do Axiom é 0,001 SOL. O mínimo do Jito é 1.000 lamports (0,000001 SOL). | Validadores, pelas contas de gorjeta do Jito. | Fixa em SOL. |
| **5. Taxa da pool** (A que mais varia, e não depende do terminal) | 1,25% na bonding curve do pump.fun; 1,25% caindo por faixa no PumpSwap; 0,25% na Raydium. | Criador do token, protocolo e provedores de liquidez, conforme o venue. | Variável conforme onde o token está. |

- *1. Taxa da plataforma* — Fonte: docs.axiom.trade/getting-started/fees/axiom-fees. Fontes de terceiros de 2025 citavam 0,9%; onde houver conflito, vale a documentação oficial — a divergência normalmente indica material desatualizado.
- *2. Taxa-base da rede* — Cobrada mesmo quando a transação falha: "Charged whether the transaction succeeds or fails" (solana.com/docs/core/fees). É por isso que uma transação revertida por slippage ainda custa alguma coisa — pouca, mas não zero.
- *3. Priority fee* — Sobe em momentos de congestionamento. Traders relatam precisar elevar bastante esse valor em picos, o que sozinho pode transformar o custo total de uma compra pequena.
- *4. Gorjeta de MEV (Jito)* — É o que compra a proteção contra ataques de sandwich. Não é receita da plataforma. Junto com o priority fee, soma 0,002 SOL nos valores padrão — cerca de 1% numa ordem de R$100 e 0,1% numa ordem dez vezes maior.
- *5. Taxa da pool* — Na bonding curve do pump.fun a decomposição oficial é 0,300% para o criador do token e 0,95% para o protocolo (pump.fun/docs/fees). Numa compra pequena de token novo, esta costuma ser a MAIOR das cinco camadas — maior que a taxa da plataforma, que é a única anunciada.

### Matriz do app: a mesma operação em três situações

**Cotação assumida:** Contas feitas com SOL ≈ R$512, obtido por SOL→USD (mercado) × USD→BRL (Banco Central, 5,1253 em 04/09/2026). A cotação é suposição declarada e muda o peso das taxas fixas: reconfira antes de usar os valores em reais.

|  | Taxa da pool | Peso dos custos fixos | Custo total aproximado |
|---|---|---|---|
| **Ordem de R$100, token na bonding curve** (O cenário mais caro dos três) | 1,25% ≈ R$1,24 | 0,002 SOL ≈ R$1,03 — cerca de 1% da ordem | ≈ R$3,20, ou 3,2% do valor |
| **Ordem de R$512, mesmo token na bonding curve** (Só o tamanho mudou) | 1,25% ≈ R$6,39 | 0,002 SOL ≈ R$1,03 — cerca de 0,2% da ordem | ≈ R$12,27, ou 2,4% do valor |
| **Ordem de R$512, token já em AMM madura** (O mesmo terminal, o mesmo tamanho, outro venue) | 0,25% ≈ R$1,28 | 0,002 SOL ≈ R$1,03 — cerca de 0,2% da ordem | ≈ R$7,16, ou 1,4% do valor |

- *Ordem de R$100, token na bonding curve* — Decomposição: custos fixos R$1,03 + plataforma R$0,94 + pool R$1,24. Repare na ordem de grandeza: a taxa da plataforma, a única anunciada, é a MENOR das três. Slippage não está incluído e seria custo adicional.
- *Ordem de R$512, mesmo token na bonding curve* — Os custos fixos são exatamente os mesmos em SOL da linha anterior, mas o peso percentual caiu de ~1% para ~0,2%, porque estão diluídos numa ordem cinco vezes maior. Nada mudou na plataforma nem no token — só o tamanho da ordem.
- *Ordem de R$512, token já em AMM madura* — Comparando com a linha de cima: mesma plataforma, mesmo tamanho de ordem, mesmo dia — e o custo cai de 2,4% para 1,4% apenas porque o token já saiu da bonding curve. É a prova de que "quanto custa operar" não tem um número único.

**Como o gráfico do app resume:** Cada barra é uma compra, repartida nas camadas de custo, em porcentagem da ordem. Repare que a faixa roxa — a única taxa anunciada — é quase do mesmo tamanho nas três.

### Ferramenta interativa do app: Quanto o atrito come, com o mercado parado

Cada operação cobra o pedágio na ida e na volta. Arraste os controles para ver o que sobra do capital depois de um tanto de operações — sem o preço ter subido nem caído.

No vídeo, mostre a ideia da ferramenta com um ou dois exemplos numéricos — e diga que no app a pessoa pode mexer nos controles e ver o resultado mudar na hora.

*Premissa que a ferramenta assume:* Isto não é uma previsão e não diz nada sobre ganhar ou perder no mercado — é aritmética de custo, assumindo o preço parado, justamente para isolar o atrito. No mundo real o preço também se move, para os dois lados, e o atrito continua acontecendo por cima disso.

## Roteiro visual sugerido (diagramas do app, em texto)

Cada bloco abaixo é um diagrama que já existe no app, descrito passo a passo. Use como storyboard: uma tela por passo, ilustração esquemática, sem captura de tela de plataforma real.

### O caminho do dinheiro numa compra

*As cinco camadas de custo entre o seu dinheiro e o token na carteira.*

1. Envio o equivalente a R$100 para comprar o token.
2. Pago a taxa-base da rede Solana, 0,000005 SOL por assinatura — fração de centavo, cobrada mesmo se a transação falhar.
3. Pago o priority fee, 0,001 SOL no padrão, para a transação ser incluída mais rápido.
4. Pago a gorjeta de MEV, 0,001 SOL no padrão, que compra proteção contra ataque de sandwich.
5. Pago a taxa da plataforma, 0,95% líquido no nível de entrada — a única camada que costuma ser anunciada.
6. Pago a taxa da pool, de 0,25% numa AMM madura a 1,25% na bonding curve — normalmente a maior camada numa compra de token novo.
7. Recebo o token, já descontada a diferença de preço (slippage), que é custo à parte e não entra nesta conta.

