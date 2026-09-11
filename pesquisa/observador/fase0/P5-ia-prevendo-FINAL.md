# IA prevê memecoin? O que a ciência revisada por pares realmente sustenta — e o que não sustenta

*Documento em português do Brasil, escrito para leigo. Cada termo técnico é explicado na primeira vez em que aparece, dentro da própria frase. Data de referência: 11 de setembro de 2026.*

---

## TL;DR (resposta direta em três pontos)

- **Existe previsibilidade de retorno de cripto em horizonte de minutos a horas em trabalho revisado por pares (avaliado por outros cientistas antes de publicar), mas quase toda ela foi medida em mercados baratos e profundos, com custo de negociação de 4 a 10 bps (pontos-base; 1 bps = 0,01%, então 10 bps = 0,1% por operação). O mercado que você quer operar — memecoin em pool rasa — cobra de 280 a 642 bps só de taxa (número que você mediu), mais impacto de preço que você mediu em ~17% numa compra de 1 SOL numa pool de 5 SOL. Nenhum estudo publicado testou esse mercado. Portanto, a resposta desconfortável é: a literatura NÃO sustenta que dá para prever memecoin com vantagem líquida, e o pouco que ela sustenta foi medido num mundo com custos 30 a 60 vezes menores que o seu.**
- **LLMs (modelos de linguagem grande, como GPT, Claude, Gemini) mostram previsão aparente de preço, mas o trabalho revisado por pares mais relevante — Bradford Levy (2026, Journal of Accounting Research) — demonstra que "boa parte" dessa capacidade é vazamento de dados do futuro (look-ahead bias), não previsão real. Quando se remove o vazamento, a vantagem some ou encolhe muito.**
- **Nenhum produto comercial de "trading com IA" em cripto tem track record (histórico de desempenho) auditado por um terceiro independente de verdade. Todos os "auditado"/"verificado" que encontrei são autorrelato, marketing, auditoria só de segurança, ou sites de resenha pagos por afiliação. Isso é informação, não ausência de informação: significa que não existe prova externa de que qualquer um deles funcione.**

---

## 1. TABELA-MESTRA

A coluna que decide tudo é **"custo por operação assumido"** e **"slippage modelado?"**. Slippage (escorregamento) é a diferença entre o preço que você viu na tela e o preço que efetivamente pagou quando a ordem foi executada; em pool rasa e com robôs adversários (MEV, explicado adiante) ele pode ser enorme. Se um estudo mostra lucro a 10 bps mas não modela slippage, ele não diz nada sobre um mercado que cobra 300+ bps e tem slippage alto.

| # | Trabalho | Ativo | Horizonte | Método | Custo/operação assumido | Slippage modelado? | Sobreviveu a custos? | Fora da amostra? | Replicado? | Status |
|---|----------|-------|-----------|--------|------------------------|-------------------|---------------------|-----------------|-----------|--------|
| 1 | Shanaev, Vasenin & Stepanov (2023), *Heliyon* 9(3):e14236 | Bitcoin | minutos (min 0/15/30/45 de cada hora) | efeito "turn-of-the-candle" | 10 bps caindo a zero com volume + spread real (Bitfinex) | **NÃO** | **Sim**, líquido de taxa + spread (74,18%/ano vs 60,27% do buy-and-hold, Tabela 5) | Sim | Não replicado de forma independente | Revisado por pares (só snippet) |
| 2 | Guo, Sang, Tu & Wang (2024), *J. of Economic Dynamics and Control* 163:104863 | criptos da Binance | minutos (previsão até 10 min, rebalanceio ~13 min) | ML cross-cryptocurrency (LASSO adaptativo, PCA) | 4 bps (VIP0) a 1,7 bps (VIP9), futuros Binance | **NÃO** | **Sim** (versão publicada: "sizable return… after accounting for transaction costs") | Sim (janela móvel 720 min) | Não | Revisado por pares (página aberta via ScienceDirect) |
| 3 | Shen, Urquhart & Wang (2022), *Financial Review* 57(2):319-344 | Bitcoin | intradiário (1ª meia-hora prevê última) | momentum de série temporal | **breakeven 3–10 bps** (custo em que o lucro zera) | **NÃO** | **NÃO** — o breakeven fica abaixo do custo real de mercado | Não (in-sample, R²=1,44%) | — | Revisado por pares (página aberta) |
| 4 | Filippou, Rapach & Thimsen (SSRN 3914414, 2024) | 41 criptos | diário | ML (random forest, XGBoost, rede neural) | custos considerados; ganho de utilidade positivo em 93% dos casos | **NÃO (slippage não)** | Sim (afirmado) | Sim | — | Working paper (autopublicado SSRN) |
| 5 | "Machine and cross-section of crypto returns" (Bianchi/Babiak-linha), *Int. Rev. Fin. Analysis* / correlatos | criptos | diário/semanal | ML | "sob suposições restritivas" | **NÃO** | Sim, afirmam sobreviver a custos | Sim | — | Revisado por pares (só snippet) |
| 6 | arXiv:2606.00060 (2026) | Bitcoin | horário | XGBoost walk-forward | 10 bps | **NÃO** | Sim, seletivo (só em configurações escolhidas) | Sim | — | **Preprint (não revisado)** |
| 7 | Lopez-Lira & Tang (2023, arXiv 2304.07619; JFE forthcoming) | ações EUA | diário | GPT-4 lê manchete | **antes de custos** | **NÃO** | Não claro (retorno de ~700% "before transaction costs") | Sim (pós-cutoff) | Sim, e os próprios autores mostram o retorno CAINDO com a adoção de LLMs | Working paper / JFE forthcoming (página aberta) |
| 8 | TradingAgents / FinMem / FinAgent / FinCon (2023-2025) | ações | dias | multiagente LLM | **não modela custo** | **NÃO** | **NÃO** | frágil / contaminado | **FinMem: 23% relatado virou −22% em reavaliação controlada** | Preprints (não revisados) |
| 9 | Alessandretti et al. (2018), *Complexity* 2018 | criptos | **diário** (não minutos/horas) | ML | custos parciais | NÃO | parcial | sim | — | Revisado por pares (contraste de horizonte) |

**Leitura da tabela em uma frase:** apenas duas linhas (1 e 2) mostram previsibilidade de horizonte curto, líquida de custos, fora da amostra e revisada por pares — e **as duas assumem 1,7 a 10 bps e nenhuma modela slippage**.

---

## 1b. Por que "lucro a 10 bps" não fala nada sobre um mercado de 300–600 bps — e a conta do 2,16% ao dia

### O abismo de custo (exigência A)

Imagine que um estudo prova que uma estratégia rende **50 bps brutos** (0,5%) por operação, em média. Agora subtraia o custo de negociar:

- **A 10 bps de custo** (Bitcoin em corretora grande): sobra 40 bps líquidos → **lucrativo**.
- **A 300–600 bps de custo** (memecoin em pool rasa): o custo é 6 a 12 vezes maior que o lucro bruto → **você perde em toda operação, sistematicamente.**

O mesmo sinal, o mesmo modelo, a mesma IA: **lucrativo num mercado, ruína no outro.** A diferença não é o cérebro que prevê — é o pedágio que o mercado cobra para entrar e sair.

Quanto custa de verdade o seu mercado:

- **Taxa da pump.fun:** 1% em cada operação na fase de curva de ligação (bonding curve, a fórmula que fixa o preço pela quantidade já vendida). Ida (compra) + volta (venda) = **200 bps só de taxa de plataforma** (pump.fun, docs/fees; página aberta). Após "graduação" para a PumpSwap/Raydium, cai para 0,25–0,30% por lado.
- **Taxa de prioridade** (priority fee, gorjeta paga ao validador Solana para sua ordem "entrar" antes das outras): recomendada em 0,003–0,01 SOL por transação, e taxa anti-MEV de 0,01–0,03 SOL em alguns guias.
- **Seu número medido (tratado como dado fornecido por você, não como fonte publicada):** ida-e-volta de **280 a 642 bps só em taxa**, e **impacto de preço de ~17% numa compra de 1 SOL numa pool de 5 SOL**. Impacto de preço é o quanto sua própria ordem move o preço contra você: numa pool com só 5 SOL de liquidez, comprar 1 SOL é uma fração enorme do pool, então o preço dispara antes de você terminar de comprar.

O que a **literatura publicada** mede sobre custos reais em DEX/AMM (exchange descentralizada / formador de mercado automático — a "máquina" que precifica pela fórmula da pool, sem livro de ofertas) confirma a ordem de grandeza:

- **Adams, Chan, Markovich & Wan (Uniswap Labs, 2024), "Don't Let MEV Slip: The Costs of Swapping on the Uniswap Protocol"** (Financial Cryptography 2024; arXiv:2309.13648; 18 abr 2024; página aberta). Sobre **534.198 negociações reais** entre janeiro e meados de agosto de 2023, verbatim: *"The average transaction cost per dollar transacted on USDC-ETH (PEPE-ETH) is about 22 bps (140 bps)."* Ou seja, negociar a memecoin PEPE custou em média **140 bps por dólar** — 6 vezes mais que o par estável USDC-ETH (22 bps) — e isso numa pool relativamente **líquida** do Uniswap. A sua pool de 5 SOL é muito pior.
- Mesma fonte, verbatim: *"when trading PEPE, a popular 'memecoin', the probability of adversarial slippage is about 80% higher than when trading a mature asset like USDC."* Slippage adversarial = perda causada de propósito por um robô que reordena transações.
- **MEV e sandwich attack** (ataque-sanduíche): MEV (Maximal Extractable Value, valor máximo extraível) é o lucro que quem controla a ordem das transações no bloco consegue tirar de você. No sandwich, um robô vê sua ordem de compra esperando no mempool (a "fila" pública de transações pendentes), compra na frente para empurrar o preço para cima, deixa você comprar caro, e vende logo depois. Estudos empíricos: mais de **4.400 sandwiches por dia** na amostra da EigenPhi de out/2022 a set/2024 (arXiv:2508.04003); mais de **US$ 500 milhões** já extraídos via sandwich (arXiv:2207.11835). Em memecoin de baixíssima liquidez, você é o alvo ideal desses robôs.

**Conclusão para leigo:** um resultado acadêmico "líquido de custos" a 4-10 bps é como um teste de consumo de carro feito em pista plana. Você quer dirigir numa ladeira de terra com pedágio a cada 100 metros. O teste não é mentira — é irrelevante para o seu terreno. E ninguém publicou o teste no seu terreno.

### A conta do "2,16% ao dia" do Guo et al. (exigência C)

O número **2,16% ao dia** aparece na **versão de trabalho** (SSRN 3974583, 2021), verbatim: *"a long-short portfolio formed on the past returns of cryptocurrencies can generate a daily return of 2.16% out-of-sample after accounting for transaction costs"*. **A versão publicada (JEDC 2024) trocou isso por "a sizable return"** — retirou o número. Isso por si só já é um sinal de cautela: a revisão por pares aparentemente não quis carimbar o 2,16%.

Vamos dar a você a régua de plausibilidade. Compor (juntar dia após dia, cada dia rendendo sobre o acumulado do anterior) 2,16% ao dia:

- **Fórmula em linguagem simples:** capital final = capital inicial × (1 + 0,0216) elevado ao número de dias. O "(1,0216) elevado a N" quer dizer: multiplicar 1,0216 por si mesmo N vezes.
- **Em 252 dias de negociação** (um ano útil): (1,0216)^252 ≈ **fator de ~225 vezes**. Ou seja, R$ 1.000 virariam ~R$ 225 mil em um ano.
- **Em 365 dias corridos** (cripto negocia todo dia): (1,0216)^365 ≈ **fator de ~2.500 vezes**. R$ 1.000 virariam ~R$ 2,5 milhões em um ano.

**O que um número dessa ordem implica** (sem chamar os autores de errados — o ponto é a régua): rendimentos compostos de 225× a 2.500× ao ano não sobrevivem ao contato com o mundo real por dois motivos que o próprio artigo reconhece ao falar de capacidade: **(1)** liquidez limitada — para ganhar isso você teria que negociar volumes que, ao crescer, movem o preço contra você (o impacto de preço que você mediu em 17%) e comem o lucro; **(2)** o dinheiro esperto entra e o sinal decai (ver seção de alpha decay abaixo). Um retorno de laboratório de 2,16%/dia é um **limite superior teórico numa fatia pequena de capital**, não uma promessa escalável. Trate qualquer número dessa magnitude — inclusive os que uma IA sua eventualmente produza em backtest — como bandeira vermelha de que algo (custos, slippage, capacidade, ou vazamento) não foi descontado.

---

## 2. O que a evidência sustenta e o que NÃO sustenta (itens 1, 2, 4, 5, 6, 7)

### Item 1 — Previsibilidade de cripto com ML (2020–2026)

**Sobreviveram a fora-da-amostra + custos (mas só a 1,7–10 bps, sem slippage):**
- **Shanaev et al. (2023)** — efeito de calendário de minutos no Bitcoin, líquido de taxa e spread; o efeito só surge de meados de 2020 em diante, atribuído a algoritmos de alta frequência.
- **Guo et al. (2024)** — previsibilidade cruzada entre criptos (o retorno passado de uma moeda ajuda a prever outra), líquido só de taxa.
- **Filippou, Rapach & Thimsen (SSRN 2024)** — 41 criptos, horizonte diário; ML melhora a acurácia estatística e dá ganho econômico em 93% dos casos. É working paper (não revisado ainda) e não modela slippage.

**NÃO sobreviveram, ou não foram testados de verdade:**
- **Shen, Urquhart & Wang (2022)** — encontra momentum intradiário no Bitcoin, mas **assume custo zero e só calcula o breakeven** (o custo em que o lucro zera). O próprio texto acadêmico associado reporta breakevens de **3, 7 e 10 bps** para as estratégias — abaixo de custos reais. É um sinal estatístico, não uma estratégia lucrativa comprovada.
- Vários estudos de "55–65% de acurácia" na direção do preço (ex.: *Annals of Operations Research*, 2020): acurácia acima de 50% **não é lucro**. Prever direção certa 60% das vezes ainda perde dinheiro se os 40% de erro forem maiores ou se o custo comer a margem. A maioria desses trabalhos não reporta qual dos quatro testes fez (backtest / fora da amostra / ao vivo / líquido de custos) — e um trabalho que não diz isso **vale pouco**.

**Padrão geral:** previsibilidade estatística existe e é mais forte em cripto do que em ações; ela é **maior justamente nas moedas pequenas, ilíquidas e voláteis** (Filippou et al.; e a linha *cross-section of crypto returns*) — que são exatamente as mais caras e perigosas de negociar. O sinal está onde o pedágio é mais alto.

### Item 2 — LLMs como previsores (o centro da sua pergunta)

**O que aparenta funcionar:**
- **Lopez-Lira & Tang (2023, arXiv 2304.07619; Journal of Financial Economics, forthcoming; página aberta):** pediram ao GPT-4 para ler manchetes de ações e dizer se eram boas ou más para o preço. Acertos altos na reação inicial (~90% de "hit rate" por dia-carteira) e previsão do "drift" (a continuação do movimento por 1-2 dias). Uma estratégia long-short (comprar as positivas, vender as negativas) teria rendido ~700% de out/2021 a mai/2024 — **mas "before transaction costs" (antes de custos), e sem slippage.** Crucialmente, **os próprios autores escrevem que os retornos da estratégia CAEM à medida que a adoção de LLMs cresce** ("Strategy returns decline as LLM adoption rises, consistent with improved price efficiency"). Isso é alpha decay em tempo real (ver item 4).
- **Gao et al. (2025), "ChatGPT and Commodity Return", *Journal of Futures Markets* (revisado por pares):** índice de notícias construído com ChatGPT prevê retorno de commodities dentro e fora da amostra (R² fora-da-amostra de 2,09% a 5,84%). Horizonte mensal, não minutos.
- **Cheng, Liu & Zhou (2025), *J. of Futures Markets* (revisado):** fatores gerados por GPT em futuros da China com bom Sharpe — e afirmam desempenho forte "particularly excelling after the cutoff date" (depois do corte de conhecimento do modelo), tentativa de contornar vazamento.

**O golpe na linha de baixo — o vazamento (look-ahead bias):**
- **Bradford Levy (2026), "Caution Ahead: Numerical Reasoning and Look-Ahead Bias in AI Models", *Journal of Accounting Research* 64(3):1139-1188, DOI 10.1111/1475-679x.70058 (revisado por pares; open access; página aberta e confirmada — título, autor, ano, venue e DOI batem exatamente).** Look-ahead bias (viés de olhar o futuro) é quando o modelo "conhece" o período que você está testando porque esse período estava nos dados de treino dele — então a previsão parece boa sem ser previsão de verdade. Achados centrais, com a seção:
  - Verbatim (Introdução/LookAhead): *"commercial LLMs suffer from significant look-ahead bias, which may explain a large portion of their predictive ability in various settings."*
  - **Teste de memorização (seção de resultados, Fig. 3 e Tabela 5):** ele pede ao GPT-4 para prever se o lucro vai subir usando demonstrações financeiras; acerto de ~60%. **Ao randomizar apenas o último dígito de cada número (mudança minúscula), o acerto cai para ~50% — igual a jogar cara ou coroa.** Isso indica que o modelo estava **reconhecendo os números memorizados**, não raciocinando.
  - **Modelos treinados com corte "do futuro" (t+1 a t+3) ganham ~4-5% de acurácia** sobre modelos sem esse acesso — a prova direta de que o "ganho" vem de conhecer o futuro.
  - Verbatim, sobre por que "pós-cutoff" não salva: *"'out-of-sample' tests based on time periods after the model's knowledge cutoff are unlikely to be truly out-of-sample"* — porque o pós-treinamento (a etapa de alinhamento com humanos que sabem de eventos atuais) reintroduz conhecimento do futuro. A Anthropic já divulga **duas datas** (corte confiável e corte de treino) reconhecendo isso.
  - Verbatim, sobre raciocínio numérico: os GBDTs (árvores de decisão clássicas, sem vazamento) dão *"a 2.7% absolute lift in accuracy over the best performing commercial LLM"*, e são quase imunes à randomização (caem 0,4% vs ~6% do melhor LLM). Ou seja: **para dados numéricos, um método estatístico simples é melhor E mais honesto que o LLM.**
- **Kong et al. (2026), "Evaluating LLMs in Finance Requires Explicit Bias Consideration" (arXiv:2602.14233; coautoria de Lopez-Lira e Levy; preprint):** revisaram **164 artigos de 2023-2025** e verbatim: *"no single bias is discussed in more than 28 percent of studies"* — dos cinco vieses que inflam resultado (look-ahead, sobrevivência, narrativa, objetivo, custo), nenhum é tratado em mais de 28% dos trabalhos. Concluem que muitos resultados são *"useless for any deployment claim"* (inúteis para qualquer alegação de uso real).
- **Sarkar & Vafa (2024)** (citado por Levy): pedir a um LLM para "fingir que é 2019 e explicar por que o lucro da Zoom vai subir" faz o modelo falar de COVID — porque ele sabe o que aconteceu depois.

**Como os estudos sérios controlam o vazamento:** (1) usar modelos open-source com pesos congelados numa data conhecida; (2) testar só em dados estritamente posteriores ao corte — imperfeito, como Levy mostra; (3) randomizar/anonimizar números e nomes e ver se a previsão desaba (se desaba, era memorização); (4) o método de Merchant & Levy (arXiv:2512.06607, preprint) que ajusta os "logits" em tempo de inferência para "esquecer" o futuro. **A régua honesta de Levy:** a única solução real é avaliação verdadeiramente fora da amostra, pré-registrada como um ensaio clínico — que é exatamente o seu plano de observatório com previsões registradas ANTES do fato.

**Veredito do item 2:** LLMs são bons em **ler texto e extrair sentimento**; a "previsão de preço" que aparece nos papers é, em grande parte, vazamento + previsão de reação de mercado a notícia (não o mesmo que prever para onde a moeda vai). Para memecoin em minutos, não há evidência revisada por pares de vantagem líquida — e há evidência forte (Levy) de que o desempenho aparente de LLM é inflado por vazamento.

### Item 4 — Decaimento de vantagem (alpha decay)

Alpha decay = quando um sinal lucrativo perde força depois de ser publicado ou muito usado, porque todo mundo passa a explorá-lo.

- **McLean & Pontiff (2016), "Does Academic Research Destroy Stock Return Predictability?", *Journal of Finance* 71(1):5-32 (revisado; página aberta):** estudaram **97 preditores** publicados. Verbatim do resumo: *"Portfolio returns are 26% lower out-of-sample and 58% lower post-publication."* Ou seja: o retorno cai 26% só por sair da amostra original (viés estatístico) e **58% depois de publicado** (todo mundo passa a operar aquilo). O retorno médio in-sample era 58,2 bps/mês e caía para 26,4 bps pós-publicação.
- **Chordia, Subrahmanyam & Tong (2013)** (citado por McLean & Pontiff): retornos de 12 anomalias caem após 1993, atribuído ao aumento de hedge funds e à queda de custos de negociação.
- **Bowles, Reed, Ringgenberg & Thornock (2024), "Anomaly Time", *J. of Finance* 79(5) (revisado):** os retornos de anomalias se concentram no **primeiro mês** após a informação sair e decaem logo depois.
- **Réplica em cripto embutida em Lopez-Lira & Tang:** o retorno da estratégia de LLM **cai conforme os LLMs são adotados** — alpha decay observado em tempo real, sem esperar publicação.

**O que isso significa para você:** mesmo que você encontre um sinal real de memecoin, ele tende a **decair rápido** — e memecoin é o ambiente mais competitivo e cheio de robôs que existe. McLean & Pontiff mostram que os sinais que decaem MENOS são os de ativos ilíquidos e caros de arbitrar — o que casa com "o sinal está onde o pedágio é alto", fechando o mesmo círculo vicioso.

### Item 5 — Sistemas multiagente / ensembles

Ensemble = combinar vários modelos numa previsão só. Multiagente com LLM = vários LLMs em papéis (analista, "urso", "touro", gestor de risco) debatendo.

**O que a literatura clássica sustenta:**
- **O "forecast combination puzzle" (enigma da combinação de previsões):** desde Stock & Watson (2004), o achado robusto de décadas de competições (inclusive as Makridakis) é que **a média simples e igualitária de várias previsões costuma bater métodos "otimizados" mais sofisticados** fora da amostra. Motivo: os pesos "ótimos" estimados são instáveis e superajustam o passado. Bahrami et al. (2018, *Accounting & Finance*, revisado) confirmam para retornos de ações: preditor individual não bate a média histórica, mas a **combinação** sim.
- **Lição:** combinar modelos **melhora robustez fora da amostra** — mas o ganho vem da **média simples**, não da esperteza de um orquestrador. Um sistema multiagente elaborado não é garantia de nada acima da média simples.

**O que os multiagente-LLM recentes mostram — e o alerta:**
- **TradingAgents (Xiao et al., 2024, arXiv 2412.20138, preprint), FinMem (2023), FinAgent (2024), FinCon (NeurIPS 2024):** todos relatam "superioridade" em **backtest** (retorno acumulado, Sharpe, drawdown).
- **A demolição (arXiv:2603.27539, 2026, preprint), "Toward Reliable Evaluation of LLM-Based Financial Multi-Agent Systems":** avaliaram esses sistemas contra 5 critérios de validade. Verbatim: *"No system in our survey satisfies all five… FinMem scores 0/5, with its reported 23% return on MSFT reversing to −22% under controlled re-evaluation."* Ou seja: **o 23% de lucro relatado do FinMem virou 22% de PREJUÍZO quando reavaliado corretamente.** TradingAgents, ContestTrade e FinVision tiram 1/5. Apontam **vazamento por retrieval** (bancos de dados com data-hora imprecisa injetam futuro) e **viés de sobrevivência** (testam em ações escolhidas hoje, excluindo as que quebraram).

**Veredito do item 5:** combinar modelos ajuda um pouco (e a média simples é surpreendentemente boa), mas os sistemas multiagente-LLM da moda **só melhoram o backtest**; sob reavaliação honesta, o lucro some ou inverte. Nenhum reporta custos realistas nem foi replicado de forma independente com resultado positivo.

### Item 6 — Torneios de previsão (Metaculus, Good Judgment, ForecastBench)

Primeiro, dois conceitos para leigo:
- **Brier score:** nota de qualidade de uma previsão probabilística; vai de 0 (perfeito) a 1. Chutar 50% em tudo dá **0,25**. Quanto **menor**, melhor. Ele combina calibração + resolução.
- **Calibração:** quando você diz "70% de chance", a coisa acontece 70% das vezes? Se sim, você é bem calibrado. É diferente de acertar muito — é sobre suas probabilidades serem honestas.
- **Superforecasters:** pessoas comuns que, no Good Judgment Project de Tetlock (2011-2015, financiado pela IARPA), previram melhor que analistas de inteligência com acesso a dados secretos. São ~1,5% dos participantes; Brier individual ~0,166 vs ~0,259 do forecaster comum (arXiv:2402.01743).

**O que os dados mostram:**
- **ForecastBench (Karger/Zou et al., ICLR 2025; PDF Wharton/arXiv 2409.19839; páginas abertas):** avaliaram 17 LLMs de ponta contra humanos. Verbatim: **superforecasters 0,096 de Brier; público geral 0,121; melhor LLM 0,111-0,122** (dependendo se o LLM viu ou não o consenso da multidão). Conclusão dos autores: *"AI systems remain worse at forecasting than both superforecasters and (to a lesser extent) the general public."*
- **Schoenegger et al. (2024), "Wisdom of the silicon crowd", *Science Advances*, DOI 10.1126/sciadv.adp1528 (revisado):** um **ensemble de 12 LLMs** (agregado por mediana) ficou **estatisticamente indistinguível de uma multidão de 925 humanos** em 31 perguntas binárias. Importante: nesse estudo não havia contaminação (perguntas sobre o futuro, em tempo real) — daí a média de LLMs empatar com a multidão humana, mas **ainda ficar atrás dos superforecasters**.
- Calibração: superforecasters têm erro de calibração ~0,03-0,05; LLMs têm déficit justamente em quantificar incerteza (arXiv:2512.16030).

**O que isso sugere — e o que NÃO sugere:**
- **Sugere:** um ensemble de LLMs pode chegar perto de uma multidão humana em perguntas de **eventos geopolíticos/econômicos com prazo de dias a meses e resposta binária**, quando não há vazamento.
- **NÃO sugere** nada sobre prever **preço de memecoin em minutos**. Prever "o Fed vai cortar juros em dezembro?" é um problema com informação pública abundante e prazo longo. Prever qual memecoin de 30 minutos de vida vai subir nos próximos 10 minutos é um problema de **razão sinal-ruído baixíssima, adversarial (robôs contra você), com custo altíssimo**. Ganhar num torneio de forecasting é evidência **zero** de vantagem em cripto de horizonte curto. São problemas diferentes.

### Item 7 — Produtos comerciais de "trading com IA"

**Nenhum tem track record auditado por terceiro independente.** Verifiquei os principais:
- **SaintQuant** (afirma "150.000+ usuários, 4M+ trades, 1,2% ROI médio diário", registro na Austrália): os "verificado/auditado" vêm de **artigos de resenha por afiliação (patrocinados)** e do próprio blog da empresa, não de firma de contabilidade nem verificador GIPS (padrão de apresentação de performance com verificação independente). As próprias resenhas admitem: *"Target ROI ranges… are objectives based on historical testing, not promises"* (CryptoNinjas) e *"All performance figures are estimates"* (Blockster). **Relatório de empresa; não auditado independentemente.** (Note: 1,2%/dia composto seria ~78× ao ano — mesma bandeira vermelha da conta do Guo.)
- **Stoic AI** (Cindicator): retorno relatado de "+2.189% de mar/2020 a set/2021" é **autorrelato do operador**; a mesma fonte diz "past results don't predict future performance". Sem auditoria contábil/GIPS.
- **3Commas, Cryptohopper:** são ferramentas de execução/automação (bots de grade, DCA), não fundos com track record. As "auditorias" que citam são **de segurança** (chaves de API), não de performance.
- **Veltrixa / Veltrix AI:** padrão de golpe — resenhas em sites de afiliação, "gerente de conta pessoal grátis" (sinal clássico de boiler-room). Sem auditoria alguma.
- **Contexto regulatório (fonte primária, verificada):** a **CFTC (Commodity Futures Trading Commission, o regulador de derivativos dos EUA)** publicou em jan/2024 o alerta *"AI Won't Turn Trading Bots into Money Machines"* (cftc.gov; press release 8854-24). Verbatim: *"Fraudsters are exploiting public interest in artificial intelligence (AI) to tout automated trading algorithms… that promise unreasonably high or guaranteed returns. Don't believe the scammers. AI technology can't predict the future or sudden market changes."* O caso-âncora citado (Mirror Trading International / Cornelius Steynberg) envolveu, verbatim, *"more than $1.7 billion in bitcoin from at least 23,000 people"* — mas atenção à nuance: esse **US$ 1,7 bilhão / 23.000 vítimas é UM caso específico**, não um total agregado de toda a fraude com IA. O regulador diz explicitamente que **IA não prevê o futuro**.

**Veredito do item 7:** se nenhum produto publica performance verificada por um terceiro independente (firma contábil nomeada, verificação GIPS, ou desempenho on-chain confirmado por parte neutra), então **a alegação de que funcionam não tem prova**. Marketing e resenha por afiliação não contam como evidência — como você mesmo estabeleceu.

---

## 3. A lacuna sobre memecoins (item 3)

**A resposta honesta: a literatura de PREVISÃO DE RETORNO trata quase só de BTC/ETH e criptos líquidas. Não encontrei nenhum trabalho revisado por pares que demonstre previsibilidade de retorno LÍQUIDA DE CUSTOS em memecoins de baixíssima liquidez e vida curta. Essa é uma lacuna clara.**

O que **existe** sobre memecoin é literatura de **detecção de fraude e caracterização de mercado**, não de previsão de preço para lucrar:
- **arXiv:2608.20271 (2026), "Catching the Rug: Early Prediction of Fraudulent Memecoins on Solana":** montaram o maior dataset até hoje — **6,4 milhões de tokens Solana em 7 meses**. Achado verbatim: *"a vast majority of these memecoins exhibit rug pull characteristics within one hour of launch"* (rug pull = quando o criador esvazia a liquidez e some com o dinheiro). Um XGBoost detecta rug pull **com os primeiros 5 minutos de dados**. Isto é **detecção de fraude, não previsão de retorno** — e é preprint.
- **MemeTrans (arXiv:2602.13480, 2026):** 41 mil lançamentos, 200M+ transações Solana; integrar as pontuações de risco do modelo reduziu perdas em até 56%. De novo, **evitar perda por fraude ≠ prever quem sobe.**
- **"The Memecoin Phenomenon" (arXiv:2512.11850):** em Q4 2024 a pump.fun foi 71,1% dos tokens criados na Solana, mas **menos de 2% "graduaram"** para uma DEX maior. A maioria esmagadora morre.
- **"A Midsummer Meme's Dream" (arXiv:2507.01963):** 34.988 tokens em 4 blockchains; valor vem de "community sentiment, making them vulnerable to manipulation".
- **Dados de mercado (fontes de imprensa/on-chain, não revisado):** em jun/2026 a taxa de graduação em 7 dias da pump.fun caiu para ~0,26%; um estudo de 832.941 lançamentos achou só **0,198%** graduando em 24h. Robôs respondem por >US$ 250 milhões/dia de volume em DEX Solana (jan/2026).

**Tradução:** o consenso empírico sobre o seu mercado específico é que **a esmagadora maioria das memecoins é projetada para você perder** ("you are operating in adversarial territory where the majority of launches are designed to fail you" — Flintr, relatório de empresa; Solidus Labs estima "98% of Pump.fun tokens and 93% of Raydium pools showing signs of manipulation"). Existe ciência sobre **detectar a fraude**; **não existe ciência publicada que sustente prever o retorno com vantagem líquida.** Se alguém disser que a academia apoia prever memecoin, está confundindo detecção de rug pull com previsão de lucro.

---

## 4. O padrão mínimo de prova (o que você precisaria mostrar para afirmar "meu sistema prevê")

Estes são critérios concretos e verificáveis, tirados diretamente da metodologia dos trabalhos acima (especialmente Levy 2026, McLean & Pontiff 2016, e os critérios de validade de arXiv:2603.27539). **Nenhum deles é recomendação de operar — são a régua para você julgar a si mesmo com honestidade.**

1. **Registro pré-fato (pré-registro).** Toda previsão gravada com carimbo de data/hora **antes** do evento, imutável, como um ensaio clínico. É a única defesa real contra vazamento, segundo Levy. Você já planeja isso — mantenha rígido: a previsão e o critério de acerto definidos antes, sem edição posterior.
2. **Tamanho de amostra suficiente.** Dezenas de previsões não bastam. Torneios sérios exigem **centenas** (ForecastBench usa ~200-1.000; a crítica ao KalshiBench nota alta variância abaixo disso). Para horizonte de minutos, mire em **muitas centenas de previsões independentes** antes de tirar conclusão.
3. **Métrica de calibração + Brier score.** Não meça só "acertei/errei". Calcule o Brier e a curva de calibração: quando você diz 70%, acontece ~70%? Compare com o baseline de **0,25** (chute de 50%). Se não bater 0,25 com folga, você não tem sinal.
4. **Teste fora da amostra de verdade.** Treine numa janela, teste em janela posterior que o modelo **nunca viu**. Com LLM, lembre da armadilha de Levy: "pós-cutoff" não garante nada — faça o teste de randomização (mude nomes/números; se a previsão desaba, era memorização).
5. **Custos realistas do SEU mercado.** Desconte **os seus 280-642 bps de taxa ida-e-volta + a taxa de prioridade + o impacto de preço de ~17% na sua pool + slippage adversarial**. Não use 10 bps. O breakeven do seu sistema tem que ficar **acima** de ~600 bps para sequer começar a conversa.
6. **Comparação com referência ingênua (naive benchmark).** Seu sistema tem que bater alternativas bobas: comprar-e-segurar, média simples, chute aleatório, e "não fazer nada". McLean & Pontiff e a literatura de forecast combination mostram que **a média simples é surpreendentemente difícil de bater** — se você não bate ela líquido de custos, não tem nada.
7. **Correção para múltiplos testes.** Se você testa 100 configurações de IA, algumas vão parecer ótimas **por puro acaso**. Corrija para isso (o "reality check" de White, citado na literatura de combinação). Uma estratégia vencedora entre 100 tentativas não é vitória — é sorte esperada.
8. **Período mínimo AO VIVO em paper trading.** Backtest não conta (FinMem: 23% no backtest virou −22% na reavaliação). Rode **ao vivo, com previsões registradas antes, por tempo suficiente para atravessar diferentes regimes de mercado** (alta, baixa, lateral) — meses, não dias. Só o desempenho ao vivo, líquido dos seus custos reais, com amostra grande, sobrevive como prova.

**Regra de ouro:** se qualquer resultado seu parecer bom demais (ex.: composto anual de dezenas ou centenas de vezes, como o 2,16%/dia do Guo), assuma que custos, slippage, capacidade ou vazamento não foram descontados — e procure o erro antes de acreditar.

---

## 5. NÃO VERIFICADOS (o que não fechou)

- **Shanaev et al. (2023):** lido só por snippet e trechos verbatim indexados; cell.com/PMC/ScienceDirect bloquearam o texto completo. O número 74,18% vs 60,27% (Tabela 5) vem do material do checkpoint, não reconfirmado no texto integral nesta fase.
- **Chu, Chan & Zhang (2020), "High frequency momentum trading with cryptocurrencies", *Research in Int. Business and Finance* vol. 52:** cobertura de custos **NÃO VERIFICADA** — só snippet, não consegui abrir o detalhamento de custos.
- **O 2,16%/dia do Guo et al.:** confirmado que está na versão SSRN de trabalho e **ausente** da versão publicada (JEDC 2024), que diz só "sizable return". Não consegui abrir a p. 28-29 da versão de trabalho nesta fase para reconfirmar a tabela original; baseio-me no verbatim retornado.
- **CFTC "US$ 1,7 bi / 23.000 vítimas":** verificado que aparece em fonte primária da CFTC — **mas refere-se a UM caso (Mirror Trading International), não a um agregado de toda fraude com IA.** A frase secundária que soma isso como "fraude com bots de IA" é imprecisa nesse ponto.
- **Filippou, Rapach & Thimsen; e os "cross-section of crypto returns":** afirmam sobreviver a custos, mas **slippage não é modelado** e são working paper / lidos por snippet. "Sobreviveu a custos" nesses casos = só taxa proporcional, sob suposições restritivas.
- **Produtos comerciais:** nenhuma auditoria independente encontrada — mas não posso provar negativa universal; posso afirmar que **entre os produtos verificados (SaintQuant, Stoic, 3Commas, Cryptohopper, Veltrixa) nenhum apresenta auditoria de performance por terceiro independente.**
- **Previsão de retorno de memecoin líquida de custos em pool rasa:** **NÃO VERIFICADO que exista** — não encontrei nenhum trabalho revisado por pares. Lacuna, não achado.

---

## 6. FONTES (com qualidade, status de leitura, data de consulta = 11/09/2026)

**Revisado por pares — páginas abertas:**
- Levy, B. (2026). *Caution Ahead: Numerical Reasoning and Look-Ahead Bias in AI Models.* Journal of Accounting Research 64(3):1139-1188. DOI 10.1111/1475-679x.70058. (página aberta; open access — título/autor/ano/venue/DOI confirmados)
- McLean & Pontiff (2016). *Does Academic Research Destroy Stock Return Predictability?* Journal of Finance 71(1):5-32. DOI 10.1111/jofi.12365. (página aberta)
- Bowles, Reed, Ringgenberg & Thornock (2024). *Anomaly Time.* Journal of Finance 79(5):3543-3579. DOI 10.1111/jofi.13372. (página aberta)
- Shen, Urquhart & Wang (2022). *Bitcoin intraday time series momentum.* Financial Review 57(2):319-344. DOI 10.1111/fire.12290. (página aberta; breakevens 3/7/10 bps no PDF CentAUR)
- Guo, Sang, Tu & Wang (2024). *Cross-cryptocurrency return predictability.* J. of Economic Dynamics and Control 163:104863. DOI 10.1016/j.jedc.2024.104863. (página aberta via ScienceDirect); versão de trabalho SSRN 3974583 (2,16%/dia).
- Gao, Wang, Wang & Zhang (2025). *ChatGPT and Commodity Return.* J. of Futures Markets 45(3):161-175. DOI 10.1002/fut.22568. (página aberta)
- Cheng, Liu & Zhou (2025). *Large Language Models and Futures Price Factors in China.* J. of Futures Markets 46(2):262-282. DOI 10.1002/fut.70061. (página aberta)
- Schoenegger et al. (2024). *Wisdom of the silicon crowd.* Science Advances. DOI 10.1126/sciadv.adp1528. (página aberta)
- Bahrami, Shamsuddin & Uylangco (2018). *Out-of-sample stock return predictability in emerging markets.* Accounting & Finance 58(3). DOI 10.1111/acfi.12234. (snippet via Scholar Gateway)
- Giannellis et al. (2026). *Inflation Forecasting With Large Language Models.* J. of Forecasting. DOI 10.1002/for.70139. (snippet)

**Revisado por pares — só snippet/bloqueado:**
- Shanaev, Vasenin & Stepanov (2023). *Turn-of-the-candle effect in bitcoin returns.* Heliyon 9(3):e14236. DOI 10.1016/j.heliyon.2023.e14236. (só snippet)
- Adams, Chan, Markovich & Wan (2024). *Don't Let MEV Slip.* Financial Cryptography 2024. DOI 10.1007/978-3-031-78676-1_10; arXiv:2309.13648. (página aberta — 22 bps/140 bps; slippage 80% maior em PEPE)
- Khedr et al. (2021). *Cryptocurrency price prediction… survey.* ISAF 28(1). DOI 10.1002/isaf.1488. (snippet)

**Working papers / SSRN (autopublicado):**
- Lopez-Lira & Tang (2023). *Can ChatGPT Forecast Stock Price Movements?* arXiv:2304.07619; SSRN 4412788; JFE forthcoming. (página aberta)
- Filippou, Rapach & Thimsen (2024). *Cryptocurrency Return Predictability: A Machine-Learning Analysis.* SSRN 3914414. (snippet)

**Preprints (NÃO revisados):**
- Kong et al. (2026). *Evaluating LLMs in Finance Requires Explicit Bias Consideration.* arXiv:2602.14233. (página aberta)
- Merchant & Levy (2025). *A Fast and Effective Solution to Look-ahead Bias in LLMs.* arXiv:2512.06607. (snippet)
- "Toward Reliable Evaluation of LLM-Based Financial Multi-Agent Systems." arXiv:2603.27539 (2026). (página aberta — FinMem 23%→−22%)
- Xiao et al. (2024). *TradingAgents.* arXiv:2412.20138. (página aberta)
- Yu et al. (2023). *FinMem.* arXiv:2311.13743. (snippet)
- "Machine Learning-Based Bitcoin Trading Under Transaction Costs." arXiv:2606.00060 (2026). (snippet)
- "Catching the Rug… Fraudulent Memecoins on Solana." arXiv:2608.20271 (2026). (página aberta)
- "MemeTrans." arXiv:2602.13480 (2026). (snippet)
- "The Memecoin Phenomenon." arXiv:2512.11850. (snippet)
- "A Midsummer Meme's Dream." arXiv:2507.01963. (snippet)
- ForecastBench (Karger/Zou et al.), ICLR 2025; arXiv:2409.19839; PDF Wharton. (páginas abertas — Brier 0,096/0,121/0,111-0,122)
- MEV/sandwich: arXiv:2508.04003, arXiv:2207.11835, arXiv:2101.05511. (snippets/PDF)
- Forecast combination puzzle: Stock & Watson (2004) via revisões arXiv:2205.04216, arXiv:2308.05263; ScienceDirect S0148296316303952. (snippets)

**Relatórios de empresa / imprensa (marcados como tal, NÃO evidência científica):**
- CFTC (2024). *AI Won't Turn Trading Bots into Money Machines* (cftc.gov; press release 8854-24). **Fonte regulatória primária — verificada.**
- pump.fun/docs/fees (taxa 1% bonding curve); CryptoSlate, Altrady, BloFin, DEXTools (taxas/graduação). **Relatório de empresa/guia.**
- Solidus Labs, Flintr (98%/93% manipulação; "adversarial territory"). **Relatório de empresa.**
- SaintQuant, Stoic AI, 3Commas, Cryptohopper, Veltrixa (páginas de produto/resenhas de afiliação). **Marketing — sem auditoria independente.**
- Good Judgment Inc. (calibração de superforecasters). **Relatório de empresa.**
- BraveNewCoin (dados on-chain memecoin jun/2026). **Imprensa.**

**Dado fornecido pelo usuário (não fonte publicada):** ida-e-volta de 280-642 bps só em taxa; impacto de preço ~17% em compra de 1 SOL em pool de 5 SOL.

---

## 7. CONSULTAS DE BUSCA FEITAS

**Fase do checkpoint (14 consultas, conforme artefato anterior — listadas para completude):** as buscas que estabeleceram Shanaev et al., Guo et al., Shen/Urquhart/Wang, Chu/Chan/Zhang, arXiv:2606.00060, Alessandretti et al., e a questão central de previsibilidade líquida de custos fora da amostra.

**Fase atual (esta pesquisa ampla):**

*Scholar Gateway (semanticSearch):*
1. "Do large language models exhibit look-ahead bias when used to forecast stock returns from historical financial data?"
2. "Can ChatGPT predict stock market returns using news headlines out of sample?"
3. "Post-publication decay of anomaly returns after academic publication in stock markets McLean Pontiff"
4. "Multi-agent large language model trading systems financial forecasting out of sample backtest"

*web_search:*
5. "Bradford Levy Journal of Accounting Research look-ahead bias LLMs"
6. "pump and dump rug pull detection Solana pump.fun memecoin machine learning"
7. "ForecastBench LLM forecasting benchmark superforecasters Brier score"
8. "Uniswap price impact MEV sandwich attack transaction cost empirical study"
9. "forecast combination puzzle simple average beats out of sample"
10. "cryptocurrency return predictability machine learning out of sample transaction costs replication"
11. "AI crypto trading bot audited track record third party verified performance"
12. "TradingAgents FinMem FinAgent LLM multi-agent stock trading arxiv results"
13. "Lopez-Lira Tang ChatGPT stock return predictability decay after publication live"
14. "memecoin returns predictability cross-section academic study attention Solana"
15. "pump.fun fee 1% priority fee bonding curve trading cost Solana memecoin"
16. "Good Judgment Project superforecasters calibration Tetlock accuracy Brier"
17. "large language model predict cryptocurrency price direction GPT sentiment backtest"
18. "Schoenegger LLM ensemble forecasting wisdom of crowds indistinguishable humans"
19. "Bitcoin intraday momentum breakeven transaction cost Shen Urquhart"

*web_fetch:* arXiv:2309.13648 (Uniswap "Don't Let MEV Slip", texto integral).

*Subagente de verificação (1 uso):* CFTC US$ 1,7 bi / 23.000 vítimas (fonte primária) + existência de auditoria independente em produtos de "trading com IA" (SaintQuant, Stoic, 3Commas, Cryptohopper, Veltrixa).

---

### Fechamento (a resposta desconfortável que você pediu)

A ciência revisada por pares **não** apoia a ideia de que um sistema com várias IAs consiga prever quais memecoins sobem em minutos com vantagem líquida real. O que ela apoia: (1) existe algum sinal de curto prazo em Bitcoin/criptos líquidas, mas só sobrevive a custos de 4-10 bps sem slippage — um mundo 30-60× mais barato que o seu; (2) a "previsão" de LLM é fortemente inflada por vazamento de futuro (Levy 2026); (3) sinais lucrativos decaem depressa quando conhecidos (McLean & Pontiff); (4) sistemas multiagente-LLM brilham no backtest e desmoronam na reavaliação (FinMem 23%→−22%); (5) IA perde para superforecasters humanos até em torneios "fáceis"; (6) o seu mercado específico é caracterizado pela ciência como território onde a maioria dos tokens é feita para você perder; e (7) nenhum produto comercial provou nada com auditoria independente. O seu plano — paper trading, previsões registradas antes do fato, contra referência ingênua, com os seus custos reais — é exatamente o teste certo. Só não confunda um backtest bonito, ou um empate de IA num torneio de forecasting, com prova de que você venceu esse teste.