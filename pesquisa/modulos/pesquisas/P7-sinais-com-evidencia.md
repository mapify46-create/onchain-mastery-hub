SIM — abri o texto completo do arXiv:2608.20271 (versão HTML v1) e vi a Tabela III. Link: https://arxiv.org/html/2608.20271v1 — acesso em 13/09/2026. **DUAS CORREÇÕES IMPORTANTES ao que você tinha:** (1) a Tabela III lista **23 características, não 22**; (2) a Tabela V do PumpFun tem **43.835 rugs vs 9.711 não-rugs (~82%)**, não 4.383/31% — você leu um dígito a menos, então NÃO há contradição com o "vast majority".

# Checklist de compra de memecoin na Solana: o que tem evidência medida x o que é folclore

## TL;DR
- Abri o artigo central inteiro: a Tabela III tem **23** características (só de negociação/liquidez, zero de código), o rótulo é `Rug = (queda de TVL >99% do pico) OU (parado >80% da vida)`, e o melhor resultado real (XGBoost, fusão→PumpFun) é F1 0,7885 / MCC 0,3947 / AUCPRC 0,8011 — mas o artigo **não publica importância de característica** e **um chute cego "é tudo rug" tem F1≈0,90, melhor que o modelo**.
- Os sinais com evidência MEDIDA e convergente entre estudos independentes de redes diferentes são **concentração de holders/insiders no início, contas em bundle (carteiras coordenadas) e atividade de negociação artificial (wash trading)**. Os sinais que o mercado mais repete — LP travada, mint/freeze authority, ausência de redes sociais, "muitos holders" — ou têm medição que os CONTRADIZ, ou não discriminam nada no pump.fun, ou já são contornados de propósito.
- No pump.fun especificamente: mint e freeze authority vêm nulas por padrão (não separam um token de outro), a liquidez pós-graduação é do protocolo (não dá para "não travar a LP"), então o rug que sobra é **dev dump / concentração de insiders** — e, ironicamente, é justamente esse sinal que tem a MENOR medição peer-reviewed direta.

## Key Findings
1. O artigo central é **preprint** (arXiv, não revisado por pares), cs.AI/cs.DC, submetido 20/08/2026, autores Jianghai Li, Pavel Kuznetsov, Yury Yanovich, Konstantin Nott-Whaley, Igor Vodolazov.
2. Você tinha três números levemente errados, todos por leitura de dígito: a Tabela III tem 23 (não 22) características; a Tabela V do PumpFun mostra **43.835 rugs vs 9.711 não-rugs (~82%)**, não 4.383/31%; Raydium é **2.931.946 vs 1.893.539 (~61%)**, não 293k/189k. Logo, NÃO há contradição com "vast majority": o teste do PumpFun é 82% rug.
3. Os limiares θ e Δt da fórmula são descritos como "empirically selected" (confirmado), MAS a Seção V-B dá os valores concretos usados: **TVL abaixo de 99% do pico** e **idle > 80% da vida do token**.
4. O artigo NÃO publica feature importance (nem SHAP, nem gain). Qualquer ranking de "qual característica pesa mais" nesse artigo específico é NÃO VERIFICADO.
5. Convergência forte entre datasets independentes (Solana/MELT, Uniswap/Mazorra, BSC/Cao, Ethereum-BSC/Cernera): concentração de posse inicial + coordenação multi-conta (bundles) + padrões de negociação artificial são os preditores medidos mais robustos.

## Details

### (1) O artigo central "Catching the Rug" (arXiv:2608.20271) — texto aberto (página aberta), acesso 13/09/2026

**Glossário rápido (todo termo explicado na 1ª aparição):** **TVL** (Total Value Locked) = valor total travado na pool de liquidez do token. **XGBoost** = tipo de modelo de "árvores impulsionadas" (gradient boosting), muito bom para tabelas. **F1** = média harmônica entre precisão e revocação (0 a 1; quanto maior, melhor). **MCC** (Matthews Correlation Coefficient) = correlação entre previsão e realidade que funciona mesmo com classes desbalanceadas (−1 a +1; 0 = chute aleatório). **AUCPRC** = área sob a curva precisão-revocação (0 a 1; melhor para dados desbalanceados que a acurácia comum). **Taxa-base** = proporção de rugs no dataset; é o que você acertaria chutando sempre "é rug". **Bundle** = várias carteiras coordenadas comprando no mesmo bloco/transação de lançamento, controladas pela mesma pessoa. **Graduação (pump.fun)** = quando um token atinge ~US$69.000 de market cap na bonding curve do pump.fun e migra automaticamente para uma pool pública (Raydium/PumpSwap). **Matriz de confusão** = tabela de acertos e erros (TP acerto-rug, FP alarme-falso, FN rug-que-passou, TN acerto-legítimo). **SHAP** = método que estima quanto cada característica pesou numa previsão.

**As 23 características da Tabela III (nome exato em inglês + o que mede, em português simples):**
1. `count_tx` — número total de transações do token.
2. `purchase_percentage` — % das transações que são compras.
3. `sale_percentage` — % das transações que são vendas.
4. `unique_buyers` — nº de carteiras distintas que compraram.
5. `unique_sellers` — nº de carteiras distintas que venderam.
6. `total_sol_value` — valor total negociado em SOL.
7. `sell_sol_value` — valor em SOL vindo de vendas.
8. `buy_sol_value` — valor em SOL vindo de compras.
9. `buy_sell_cnt_ratio` — razão entre nº de compras e nº de vendas.
10. `buy_sell_value_ratio` — razão entre valor comprado e valor vendido.
11. `price_change_first_to_3_blocks` — variação de preço nos 3 primeiros blocos.
12. `price_change_first_to_last` — variação de preço da primeira à última negociação.
13. `buy_price_std` — desvio-padrão dos preços de compra (o quanto o preço de compra oscila).
14. `sell_price_std` — desvio-padrão dos preços de venda.
15. `first_buy_time` — horário da primeira compra.
16. `first_sell_time` — horário da primeira venda.
17. `min_pool_info_time` — horário do registro mais antigo da pool.
18. `max_pool_info_time` — horário do registro mais recente da pool.
19. `last_trade_time` — horário da última negociação.
20. `max_price` — preço máximo.
21. `min_price` — preço mínimo.
22. `min_price_after_max` — preço mínimo DEPOIS do pico (mede o quanto caiu após o topo).
23. `first_price` — preço na primeira negociação após o mint.

Repare: são todas de **fluxo de negociação e liquidez**. NÃO há nenhuma feature de concentração de holders, de bundle, de authority, de metadata ou de redes sociais. Isso é decisivo para o seu checklist: o melhor detector Solana publicado NÃO usa quase nenhum dos sinais que o mercado repete.

**Feature importance:** NÃO publicada no artigo. NÃO VERIFICADO — não existe no texto.

**Rótulo (confirmado):** `Rug_t = I((MDD_t < −θ) OU (Idle_t > Δt))`, onde MDD é o "maximum drawdown" (queda máxima do TVL desde o pico). Texto verbatim: "The thresholds θ and Δt are empirically selected based on the distributional analysis of TVL drops and durations of inactivity." Os valores concretos usados aparecem na Seção V-B: "a token whose TVL falls below 99% or whose idle time exceeds 80% of its lifetime without trading."

**Métricas (confirmadas na Tabela VI):** melhor célula = XGBoost, direção Fusão→PumpFun: F1(1)=0,7885, MCC=0,3947, AUCPRC=0,8011. (Random Forest fica logo atrás: 0,7877 / 0,3942 / 0,7978.) Detalhe crítico: na transferência entre DEXs (ex.: Raydium→PumpFun) o MCC despenca para perto de zero ou negativo — o modelo não generaliza de um launcher para o outro.

**Tabela V (confirmada, com correção dos seus números):** PumpFun = **43.835 rug / 9.711 não-rug (81,9% rug)**; Raydium = **2.931.946 rug / 1.893.539 não-rug (60,8% rug)**. O texto explica o filtro: "When acquiring 5-minute data features, we drop data that has already been rug-pulled within that 5-min period." Ou seja, jogam fora os tokens que já rugaram dentro dos 5 primeiros minutos (para o preditor prever o FUTURO, não o presente). Isso NÃO derruba o "vast majority": o teste continua majoritariamente rug (82% no PumpFun). Sua hipótese de que os números batiam em ~31% vinha de ter lido 4.383 em vez de 43.835 — não era o filtro dos 5 min que criava a diferença, era um erro de dígito.

**Taxa-base:** o próprio artigo afirma na Seção IV-F, verbatim: "In the crypto market, over 80% of Memecoins experience rug pulls." No conjunto de teste: 81,9% (PumpFun), 60,8% (Raydium).

**Metodologia:** período coletado 30/11/2024–30/06/2025 (7 meses). DEXs: PumpFun e Raydium (interligados — token que atinge US$69.000 no PumpFun migra para Raydium). Tabela II: Raydium 97.965 tokens; PumpFun 6.304.235 tokens (~6,4M no total). Divisão treino/teste: janela deslizante para frente ("forward rolling window"), treino só com os 3 meses mais recentes, último período reservado como teste único; mecanismo que garante ≥5 amostras rug por fold de validação. Modelos comparados: Random Forest, XGBoost, MLP, FT-Transformer, TabTransformer, AutoInt. Hiperparâmetros otimizados com Optuna (busca bayesiana) — valores específicos NÃO publicados (NÃO VERIFICADO). Disponibilidade de código/dados: NÃO mencionada no texto (NÃO VERIFICADO). Peer review: é preprint.

### (2) Tabela dos outros trabalhos

| Trabalho | Venue / status | Rede | Dataset (período, tamanho) | Rótulo | Características | Resultado | Texto | Link | Data |
|---|---|---|---|---|---|---|---|---|---|
| **MELT / MemeTrans** (Hu et al., Georgia Tech) | **Preprint** (v1 "MemeTrans" 13/02/2026; v2 "MELT" 21/05/2026; DBLP=CoRR; sem venue) | Solana/pump.fun | Dez/2024–Mar/2025; 41.470 tokens migrados, 218M tx | Alto risco: min_price_ratio<0,3 (preço cai <30% do valor de migração em 20 min) OU manipulação manual | 122 features em 5 grupos (contexto, concentração de posse, atividade de mercado, bundles, séries temporais) | MLP (melhor individual): AUPRC 0,5729, F1 alto-risco 0,8391; ensembles até AUPRC 0,5827 | Aberto (página aberta) | https://arxiv.org/html/2602.13480v2 | 13/09/2026 |
| **TON rug pulls** (Yaremus et al., mesmo grupo do central) | Preprint cs.DC/cs.LG | TON (Ston.fi, DeDust) | 01/09/2025 | TVL(>99%)/Idle (idêntico ao central) | Liquidez, deltas de tempo, volume | Gradient Boosting nos 1ºs 5 min: TVL AUC até 0,891 | Só snippet | https://arxiv.org/abs/2509.01168 | 13/09/2026 |
| **BSC wash-trading** (Cao et al.) | Preprint cs.AI | BSC | 14/03/2026; **só 7 tokens**, 33.242 registros | Rug pull (rótulo fraco/supervisão fraca) | 12 features de wash trading (Self, Matched, Circular) | RF: AUC 0,9098; PR-AUC 0,9185; F1 0,7429; lead time 3,81h; FP=1, FN=8 | Conclusão aberta (página aberta) | https://arxiv.org/html/2603.13830v1 | 13/09/2026 |
| **Mazorra "Do Not Rug On Me"** | **Peer-reviewed** (Mathematics, MDPI, 2022) | Uniswap V2 | Mai/2020–Set/2021; 27.588 tokens (26.957 rug, 631 não) | Inativo >1 mês + queda forte de preço/liquidez sem recuperação | HHI (concentração), coef. de clustering, estado da pool | XGBoost/FT-Transformer: acurácia 0,9936, recall 0,9540, precisão 0,9838 | Aberto (página aberta) | https://doi.org/10.3390/math10060949 | 13/09/2026 |
| **Cernera "Token Spammers, Rug Pulls, Sniper Bots"** | **Peer-reviewed** (USENIX Security 2023) | Ethereum + BSC | até Mar/2022 | 1-day rug pull (pool dura <1 dia) | Análise de deployers, pools, sniper bots | ~60% dos tokens ativos <1 dia; 1% dos endereços cria 20–25% dos tokens; US$240M em lucros | Só snippet/slides | https://www.usenix.org/conference/usenixsecurity23/presentation/cernera | 13/09/2026 |
| **Rug pull DEX Uniswap V3** (Amelin et al.) | **Peer-reviewed** (Blockchain: Research and Applications) | Uniswap V3 | 3.212 normais / 581 rug | queda/inatividade | Séries temporais (volume, nº tx) | (só snippet) | Só snippet | ScienceDirect S2096720925000028 | 13/09/2026 |
| **Ertam et al. phishing** | **Peer-reviewed** (Wiley, Concurrency & Computation) | Ethereum | 5.408 tokens (2.208 phishing, 3.200 legítimos) | phishing/scam por inteligência de ameaças + on-chain | 16 features; validação temporal | LightGBM: acurácia 85,59%, F1 81,63%, AUC 92,02%; **features temporais pioram o F1** | Aberto (via Scholar Gateway) | https://onlinelibrary.wiley.com/ai/10.1002/cpe.70503 | 13/09/2026 |
| **SolRugDetector** ("From Hype to Collapse") | Preprint cs.CR | Solana | 25/03/2026; 117 rug confirmados de 68 relatórios; medição em 100.063 tokens | rug confirmado + on-chain | operações on-chain, preço | 76.469/100.063 (76,4%) classificados como rug no 1º sem/2025 | Só snippet | https://arxiv.org/abs/2603.24625 | 13/09/2026 |
| **SolRPDS** (dataset) | Preprint | Solana | 2021–2024; 3,69B tx, 62.895 pools | inatividade | atividades de liquidez | 22.195 tokens com padrão de rug | Só snippet | https://arxiv.org/abs/2504.07132 | 13/09/2026 |
| **"A Midsummer Meme's Dream"** | Preprint | ETH/BSC/Solana/Base | 34.988 tokens | manipulação (wash/LPI) | volume, preço, makers | 82,8% dos high-return (>100%) com crescimento artificial | Só snippet | https://arxiv.org/html/2507.01963v2 | 13/09/2026 |
| **Measuring Memecoin Fragility (ME2F)** | Preprint | multi | tokens grandes (DOGE, TRUMP...) | não é preditor de rug | Volatility/Whale Dominance/Sentiment | framework, não classificador | Só snippet | https://arxiv.org/abs/2512.00377 | 13/09/2026 |
| **LROO Rug Pull Detector** | Preprint | multi | 1.000 tokens | rug, sem leakage temporal | on-chain + OSINT | TabPFN, foco anti-leakage | Só snippet | https://arxiv.org/pdf/2603.11324 | 13/09/2026 |
| **Wu et al. RugScreener (GNN)** | só citado no central | Ethereum | — | rug | grafo temporal | — | Só citação | — | 13/09/2026 |

**Sobre "Marino" e "Kamat":** NÃO VERIFICADO. Não encontrei nenhum trabalho de detecção de rug pull com esses sobrenomes de autor. Existe "Kalal" (coautor do SolRPDS) e "Kalacheva" (coautora do paper TON) — é plausível que sejam esses, lembrados de forma trocada. Registro como não confirmados; não deduzo nada.

### (3) TABELA CENTRAL — sinal → medido/folclore → limiar → fonte → força → contornado? → vale no pump.fun?

| Sinal | Medido ou folclore? | Limiar publicado | Fonte | Força da evidência | Já contornado de propósito? | Vale no pump.fun? |
|---|---|---|---|---|---|---|
| **Concentração dos top holders / insiders** | ✅ MEDIDO | top-10 sobe 24 pp nos high-risk após juntar bundles; 1ºs 10–20 compradores têm 17–19 pp a mais | MELT (preprint); Mazorra HHI (peer-reviewed) | Forte e convergente | Sim — distribuir entre muitas carteiras (bundles/fund-flow) esconde a concentração real | Sim, mas só se você RESOLVER os bundles; o número "cru" engana |
| **Bundles no lançamento (carteiras coordenadas)** | ✅ MEDIDO | 36,5% do supply em bundle nos dados; 2º grupo de feature mais importante | MELT (preprint) | Forte | Sim — ferramentas de "bundler bypass" (Jito, funding disperso) evitam a marca de bundle | Sim — é o mecanismo central do rug de pump.fun |
| **Wash trading / negociação artificial** | ✅ MEDIDO | RF PR-AUC 0,9185 (BSC); 82,8% dos high-return com crescimento artificial | Cao BSC (preprint, 7 tokens); Midsummer (preprint) | Forte na direção, mas dataset Cao minúsculo | Sim — bots distribuem volume em 20–100+ carteiras contra a razão volume/carteiras | Parcial — mecânica existe; medição direta no pump.fun é fraca |
| **Volume alto com poucas carteiras únicas** | ⚠️ MEDIDO mas CONTORNADO | ratio volume/liquidez >50:1 citado por ferramentas (não peer-reviewed) | Midsummer (LPI); serviços de volume bot | Média; sinal ativamente derrotado | Sim — explicitamente: fornecedores espalham em 100+ carteiras "porque as pessoas olham a razão" | Sim, mas não confie: é o alvo nº 1 dos bots |
| **Serial deployer (criador com histórico de rugs)** | ✅ MEDIDO (fora do pump.fun) | 1% dos endereços cria 20–25% dos tokens | Cernera USENIX 2023 (peer-reviewed) | Forte no Ethereum/BSC | Sim — carteira nova por campanha | Só indústria no pump.fun (Arkham, Flintr — não peer-reviewed) |
| **LP não travada / não queimada** | ⚠️ MEDIDO e CONTRADITO | 90% dos tokens com lock (Unicrypt) ainda são maliciosos | Mazorra (peer-reviewed) | Forte, mas na direção OPOSTA à crença | LP travada é usada como falso selo de segurança | ❌ NÃO se aplica: pós-graduação a pool (PumpSwap) é do protocolo; o criador não puxa liquidez |
| **Mint authority ativa** | 🟡 FOLCLORE (como preditor) | — | Helius docs; ferramentas | Sem medição peer-reviewed com taxa de acerto | Scammers revogam para "parecer limpo" e rugam por outra via | ❌ NULA por padrão no pump.fun — não discrimina |
| **Freeze authority ativa** | 🟡 FOLCLORE (como preditor) | — | Helius docs; ferramentas | Sem medição peer-reviewed | Igual acima | ❌ NULA por padrão no pump.fun — não discrimina |
| **Metadata mutável (update authority)** | 🟡 FOLCLORE | — | Helius docs | Sem medição peer-reviewed | — | Revogada por padrão no pump.fun — não discrimina |
| **Ausência de redes sociais** | 🟡 FOLCLORE | — | MemeChain/Midsummer (qualitativo) | Fraca; não quantificada como preditor | Trivial de forjar | Folclore |
| **Número baixo de holders** | ✅ MEDIDO (indireto) | filtro "<100 holders" pega 95% high-risk | MELT (preprint) | Média | Sim — holder bots inflam contagem | Sim, mas inflável |
| **Dev dump (criador vendeu a própria compra nos 1ºs min)** | 🟡 QUASE-FOLCLORE | — | "Predicting success Pump.fun" (2602.14860, preprint) descreve o mecanismo; Arkham/Flintr (indústria) | Sem preditor peer-reviewed isolando "dev vendeu→rug"; MELT captura via acumulação/unwind de insiders | Sim — carteiras intermediárias | ✅ É o rug que RESTA no pump.fun (LP é do protocolo), mas medição direta é fraca |
| **Extensão Token-2022 fora do padrão (transferFee, permanentDelegate, transferHook)** | 🟡 INDÚSTRIA, não peer-reviewed | RugCheck sinaliza >40% dos novos tokens; perdas Q1/2026 est. $50M+ | PeckShield, Neodyme, RugCheck, DEV.to (não peer-reviewed) | Média (fonte não acadêmica) | Sim — revogam mint/freeze para parecer "renounced" e escondem o rug no permanentDelegate | No pump.fun padrão NÃO aparecem (você confirmou 24/24 só metadataPointer+tokenMetadata); logo, QUALQUER dessas extensões num token "pump.fun" é anomalia forte |

Legenda: ✅ medido com fonte · ⚠️ medido mas problemático (contornado ou contradito) · 🟡 folclore/indústria sem medição peer-reviewed · ❌ não se aplica.

### (4) Convergência e divergência

**Onde concordam (o que mais importa para você):** três datasets independentes, de redes diferentes, apontam para a MESMA família de sinais — concentração de posse no início e coordenação multi-conta. MELT (Solana) mostra bundle como 2º grupo de feature mais importante (removê-lo custa −0,0278 no AUPRC, mais do que remover a concentração de posse "simples", que custa só −0,0036, porque o número real só aparece depois de juntar os bundles). Mazorra (Uniswap) usa HHI de concentração. Cernera (ETH/BSC) mede serial deployers. Cao (BSC) mede wash trading. Todos convergem numa frase: **quem controla o token no minuto zero e como ele disfarça isso é o preditor real** — não authorities, não LP lock, não redes sociais.

**Onde divergem, e por quê:** (a) O artigo central (Solana) usa rótulo de LIQUIDEZ (TVL/idle) e conclui que features de liquidez bastam; MELT usa rótulo de PREÇO pós-migração e conclui que atividade de mercado + bundle dominam — diferença de rótulo e de fase (o central olha o DEX pós-lançamento; MELT olha a fase de launchpad, onde os insiders acumulam barato). (b) Ertam (Ethereum, phishing) acha que features temporais ATRAPALHAM; a maioria assume que ajudam — divergência de rede e de tarefa. (c) A transferibilidade entre DEXs desaba (MCC vira ~0 ou negativo entre Raydium↔PumpFun) — cada launcher tem microestrutura própria, o que também é alerta de concept drift.

### (5) Taxa-base de rug em cada dataset (se você chutasse "é rug" para tudo, quanto acertaria)

- **Catching the Rug (Solana):** >80% geral; teste PumpFun **81,9%**, Raydium **60,8%**.
- **MELT (Solana/pump.fun):** **84,13%** no conjunto completo; 74,18% após filtro (<100 holders / <1 min de venda tira 47,8% dos tokens, 95% deles high-risk).
- **Mazorra (Uniswap V2):** **97,7%** (26.957 de 27.588; e desses, 24.870 são rug pulls rápidos com queima de LP e 2.087 sem queima de LP).
- **SolRugDetector (Solana, 1º sem/2025):** **76,4%** (76.469/100.063).
- **Cernera (ETH/BSC):** ~60% dos tokens ficam ativos menos de 1 dia.
- **Ertam (Ethereum, phishing):** 40,83% positivos (dataset balanceado de propósito).

**Por que isso é essencial:** quando 82% já é rug, "acurácia alta" é ilusão. Um chute cego "é rug" acerta 82% e tem F1≈0,90 no PumpFun. Qualquer detector precisa ser comparado com esse baseline — não com 50%.

### (6) O melhor detector em linguagem simples (com a conta)

Termos: **precisão** = de cada 100 tokens que o modelo MARCA como rug, quantos são mesmo rug. **Revocação (recall)** = de cada 100 rugs REAIS, quantos o modelo PEGA.

O artigo só publica F1=0,7885, MCC=0,3947 e AUCPRC=0,8011 — **não publica precisão e revocação separadas**. Reconstruí a partir do F1, do MCC e das contagens da Tabela V (43.835 rug / 9.711 não-rug, base 81,9% positivos):
- **Precisão ≈ 95%** — de cada 100 tokens que ele marca como rug, ~95 são rug.
- **Revocação ≈ 68%** — de cada 100 rugs reais, pega ~68 e deixa ~32 passarem.

Conta (aprox.): resolvendo F1 = 2·P·R/(P+R) = 0,7885 em conjunto com MCC = 0,3947 e a base de 81,9% positivos, chega-se a recall ≈ 0,675 e precisão ≈ 0,948. **É uma reconstrução, não um número publicado — trate como estimativa.**

**A leitura honesta:** precisão de 95% parece ótima, mas a taxa-base já é 82% — o ganho real sobre o acaso é pequeno (é isso que o MCC de 0,39 diz: longe de 1). E o F1 do modelo (0,79) é PIOR que o do chute cego "é tudo rug" (~0,90). O próprio artigo admite, verbatim: "these results are not yet sufficient for real-world deployment, especially in high-risk financial environments where false negatives carry substantial investor losses." Comparativo: o MELT, cuja tarefa é diferente (prever alto risco pós-migração), tem AUPRC ~0,58 no melhor caso — também modesto.

### (7) O que a medição CONTRADIZ (sinais de mercado que os dados negam)

- **"LP travada = seguro":** FALSO. Mazorra et al. (peer-reviewed) mediu, verbatim: "we show that 90% of tokens using locking contracts tend to become a rug pull or a malicious token eventually." Concretamente: dos 745 tokens rotulados que usam Unicrypt, 725 são maliciosos e 20 não (97,3%). LP travada virou selo de falsa segurança.
- **"Features temporais são cruciais":** Ertam et al. (peer-reviewed) mediu contribuição NEGATIVA delas — remover `time_diff_first_last_txn` e afins MELHORA o F1 — porque token legítimo novo e scam novo têm o mesmo padrão temporal comprimido, tornando essas features não-discriminantes.
- **"Muitas carteiras únicas / volume alto = comunidade real":** ativamente forjado. Serviços de volume bot descrevem, publicamente, distribuir o volume em "20–100+ wallets with randomized distribution" exatamente porque "DexScreener's trending algorithm explicitly weighs unique wallet count" — o sinal é otimizado contra.
- **"Mint/freeze revogadas = renounced = seguro":** contradito pelos golpes de permanentDelegate (Token-2022): o token parece "renounced" (mint e freeze nulas) mas o criador queima/rouba via delegate. Fonte de indústria (DEV.to/PeckShield), não peer-reviewed: "RugCheck.xyz flags over 40% of new Solana tokens as using this extension" e perdas Q1/2026 estimadas em "$50M+".

### Adversarialidade e concept drift
Sinal conhecido é sinal otimizado contra. Além dos volume bots acima, há evidência pública de "bundler bypass" (ferramentas que distribuem SOL para 100+ carteiras "without being detected by bubblemaps" e "avoid bundler mark in axiom, photon, gmgn.ai"), de holder bots que inflam a contagem de holders, e de maker bots. Sobre **concept drift** (o detector envelhecer): o artigo central reconhece explicitamente que "Rug Pull fraud exhibits concept drift characteristics, with its on-chain features constantly changing with the market" — por isso usa janela deslizante de 3 meses — mas NÃO quantifica quanto o detector degrada com o tempo. Quem quantifica algo parecido é Ertam (rede diferente): validação temporal derruba ~3,95 pontos percentuais versus divisão aleatória, expondo o "viés otimista" de quem não testa no futuro. Conclusão prática: um detector treinado em 2026 provavelmente perde força à medida que os golpistas ajustam o comportamento.

### (8) NÃO VERIFICADOS (lista explícita)
- Feature importance / SHAP no artigo central: não existe no texto.
- Valores dos hiperparâmetros do artigo central: não publicados.
- Link de código/dados do artigo central: não mencionado no texto.
- θ e Δt exatos da fórmula: descritos só como "empiricamente escolhidos" (mas os valores usados — 99% TVL, 80% idle — aparecem na Seção V-B).
- Trabalhos "Marino" e "Kamat": não localizados; possível confusão de memória com Kalal/Kalacheva.
- Precisão/revocação exatas do melhor detector: apenas estimadas por reconstrução.
- Venue/peer review de MELT, TON, Cao, SolRugDetector, SolRPDS, Midsummer, Fragility, LROO: todos preprints, sem venue confirmado (MELT confirmado como CoRR/arXiv apenas).
- Preditor peer-reviewed que isole "dev dump → rug" no pump.fun: não encontrado.
- Medição peer-reviewed de extensões Token-2022 como preditor de fraude: não encontrada (só fontes de indústria/segurança).

## Recommendations

1. **Use o checklist em duas cores.** Priorize os sinais MEDIDOS (verde): concentração de holders RESOLVENDO bundles, coordenação multi-conta no bloco de lançamento, e padrões de wash trading. Trate mint/freeze authority, LP lock, redes sociais e "muitos holders" como folclore (amarelo) — servem como filtro grosseiro, não como prova.
2. **No pump.fun, ignore mint/freeze/LP-lock como discriminadores** (authorities nulas por padrão; LP do protocolo pós-graduação). Foque no que resta: **dev dump e concentração de insiders/bundles** nos primeiros minutos. Ferramentas práticas: Bubblemaps/Solscan para clusters de carteiras; histórico do deployer. Aceite que aqui a evidência é mais de indústria que peer-reviewed.
3. **Assuma que todo sinal conhecido está sendo otimizado contra.** Volume/carteiras, bundles e contagem de holders são explicitamente forjados por serviços comerciais. Um sinal "limpo" pode ser apenas um scam bem-feito — nunca trate um único sinal verde como aprovação.
4. **Trate qualquer extensão Token-2022 fora de metadataPointer+tokenMetadata como bandeira vermelha forte** num token que se diz pump.fun — você mesmo confirmou 24/24 sem extensões de risco, então transferFeeConfig/permanentDelegate/transferHook ali é anomalia clara (verifique via getAccountInfo no mint ou RugCheck).
5. **Não confie em "acurácia" nem em detector automático como decisão final.** Com taxa-base de 82%, o melhor modelo publicado perde para o chute cego em F1 e deixa ~1/3 dos rugs passar. **Benchmark que mudaria esta recomendação:** um detector peer-reviewed (em venue) que (a) bata o baseline "tudo-rug" em F1, (b) publique precisão/revocação/AUCPRC com validação temporal out-of-time, e (c) use features de concentração/bundle além das de liquidez — idealmente ≥0,85 de AUCPRC em teste futuro. Até lá, o detector serve como pré-filtro barato de duas etapas, não como veredito.

## Caveats
- O artigo central e a maioria dos comparáveis são PREPRINTS não revisados por pares. Só **Mazorra, Cernera, Ertam e o paper Uniswap V3** estão publicados em venue com revisão.
- Reconstruí precisão/revocação do melhor detector; são estimativas, não números publicados.
- Cao (BSC) tem só **7 tokens** — PR-AUC 0,9185 impressiona mas é estatisticamente frágil (FP=1, FN=8).
- As fontes sobre Token-2022 e volume bots são de indústria/segurança (PeckShield, Neodyme, RugCheck, OpenLiquid, DEV.to), não academia — trate os números ($50M, >40%) como estimativas não auditadas.
- Transferibilidade entre DEXs é ruim e há concept drift declarado: um detector de 2026 pode degradar rápido conforme os golpistas se adaptam.
- TinyFish fetch_content ficou indisponível por erro de schema; usei web_fetch (arXiv HTML) e Scholar Gateway, que abriram os textos completos necessários.

## (9) Fontes (link · venue/status · aberto ou snippet · data)
- arXiv:2608.20271 "Catching the Rug" — preprint arXiv (cs.AI/cs.DC) — https://arxiv.org/html/2608.20271v1 — (página aberta) — 13/09/2026.
- arXiv:2602.13480 "MELT/MemeTrans" (Hu et al., Georgia Tech) — preprint (CoRR) — https://arxiv.org/html/2602.13480v2 — (página aberta) — 13/09/2026.
- arXiv:2509.01168 "Detecting Rug Pulls... TON" — preprint — https://arxiv.org/abs/2509.01168 — (só snippet) — 13/09/2026.
- arXiv:2603.13830 "Early Rug Pull Warning for BSC" (Cao et al.) — preprint — https://arxiv.org/html/2603.13830v1 — (página aberta) — 13/09/2026.
- Mazorra et al. "Do Not Rug On Me" — peer-reviewed (Mathematics, MDPI 2022) — https://doi.org/10.3390/math10060949 e https://arxiv.org/html/2201.07220 — (página aberta) — 13/09/2026.
- Cernera et al. "Token Spammers, Rug Pulls, and Sniper Bots" — peer-reviewed (USENIX Security 2023) — https://www.usenix.org/conference/usenixsecurity23/presentation/cernera — (só snippet) — 13/09/2026.
- Ertam et al. phishing Ethereum — peer-reviewed (Wiley, Concurrency & Computation 2025) — https://onlinelibrary.wiley.com/ai/10.1002/cpe.70503 — (via Scholar Gateway, página aberta) — 13/09/2026.
- "Rug pull detection on DEX using transaction data" (Uniswap V3) — peer-reviewed (Blockchain: Research and Applications) — ScienceDirect S2096720925000028 — (só snippet) — 13/09/2026.
- arXiv:2603.24625 "SolRugDetector / From Hype to Collapse" — preprint — https://arxiv.org/abs/2603.24625 — (só snippet) — 13/09/2026.
- arXiv:2504.07132 "SolRPDS" — preprint — https://arxiv.org/abs/2504.07132 — (só snippet) — 13/09/2026.
- arXiv:2507.01963 "A Midsummer Meme's Dream" — preprint — https://arxiv.org/html/2507.01963v2 — (só snippet) — 13/09/2026.
- arXiv:2512.00377 "Measuring Memecoin Fragility" (ME2F) — preprint — https://arxiv.org/abs/2512.00377 — (só snippet) — 13/09/2026.
- arXiv:2603.11324 "LROO Rug Pull Detector" — preprint — https://arxiv.org/pdf/2603.11324 — (só snippet) — 13/09/2026.
- arXiv:2602.14860 "Predicting the success of new crypto-tokens: the Pump.fun case" — preprint (dev não puxa liquidez, só trade) — https://arxiv.org/html/2602.14860v1 — (só snippet) — 13/09/2026.
- Helius "Find Solana Mint, Freeze, Update Authority" (pump.fun revoga por padrão) — https://www.helius.dev/docs/orb/explore-authorities — (só snippet) — 13/09/2026.
- Neodyme "SPL Token-2022: Don't shoot yourself..." — https://neodyme.io/en/blog/token-2022/ — (só snippet) — 13/09/2026.
- DEV.to "Solana's Permanent Delegate Burn Scam" / SolanaHub — (indústria, não peer-reviewed) — https://dev.to/ohmygod/solanas-permanent-delegate-burn-scam-... — (só snippet) — 13/09/2026.
- OpenLiquid "Volume Bot Red Flags" / GitHub topics/volume-bot (bundler bypass) — https://openliquid.io/blog/volume-bot-red-flags/ ; https://github.com/topics/volume-bot — (só snippet) — 13/09/2026.

## (10) Lista de todas as consultas feitas
**Scholar Gateway (semanticSearch):** "Early prediction of fraudulent memecoins on Solana using on-chain features and machine learning".
**TinyFish:** fetch_content em https://arxiv.org/html/2608.20271v1 (falhou por erro de schema; substituído por web_fetch).
**web_fetch (páginas completas abertas):** https://arxiv.org/html/2608.20271v1 ; https://arxiv.org/html/2602.13480v2.
**web_search:** "Catching the Rug memecoins Solana arXiv 2608.20271"; "MemeTrans dataset high-risk memecoin launches Solana Hu"; "Yaremus detecting rug pulls TON blockchain machine learning arXiv 2509.01168"; "Midsummer rug pull prediction memecoin"; "Marino rug pull detection token machine learning; Kamat memecoin fraud"; "pump.fun revokes mint freeze authority Token-2022 migration default"; "volume bot distribute across 100 wallets volume per holder detection avoid"; "Cao BSC meme token wash trading 12 features Random Forest PR-AUC 0.9185 lead time"; "Mazorra Uniswap rug pull do not rug me 26957 tokens liquidity lock Unicrypt 90% malicious"; "Cernera token spammers serial deployers sniper bots Ethereum BSC measurement"; "Token-2022 transfer hook permanent delegate scam signal fraud detection Solana"; "Marino rug pull cryptocurrency token machine learning prediction paper"; "Kamat memecoin rug pull detection Solana paper arXiv"; "pump.fun creator sell first minutes dev dump predictor rug measurement"; "memecoin fragility Xiang measuring token concentration predictor 2512.00377"; "rug pull detector concept drift temporal degradation adversarial adaptation crypto"; "SolRugDetector Solana on-chain rug pull 117 tokens detection features".
**Subagente (run_blocking_subagent):** extração das métricas de detecção, importância de features (Tabela 8/9 e Fig. 4), balanço de classes e status de peer-review do MELT/MemeTrans.
**enrich_draft:** 1 chamada, que confirmou verbatim os números de Cernera (US$240M; 1%→20–25%; ~60% <1 dia), Mazorra (90%/Unicrypt 725 de 745; acurácia 0,9936/recall 0,9540/precisão 0,9838; 24.870 rug de 26.957) e Token-2022 (>40% RugCheck; $50M+ Q1/2026).