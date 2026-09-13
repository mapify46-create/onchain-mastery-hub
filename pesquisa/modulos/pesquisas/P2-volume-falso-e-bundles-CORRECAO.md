## 1.2 Decomposição do custo (por US$ 1 milhão de volume fabricado em Solana) (corrigido — 12/09/2026)

**Registro da correção:** a versão anterior desta seção afirmava que a PumpSwap cobra 0,25% por trade (0,20% LP + 0,05% protocolo), com base em KuCoin (https://www.kucoin.com/news/articles/pump-fun-debuts-pumpswap-dex-with-0-25-fee-structure-and-zero-sol-migration-fee-to-reclaim-solana-s-memecoin-market, notícia de exchange, só snippet, 12/09/2026) e Blocmates (https://www.blocmates.com/news-posts/pump-fun-introduces-pumpswap-a-new-dex-for-graduated-token-listings, notícia, só snippet, 12/09/2026) sobre o lançamento da PumpSwap em 20/03/2025. Esses 0,25% eram corretos no lançamento — a própria pump.fun anunciou em 20/03/2025 "each trade on PumpSwap comes with a 0.25% fee ... 0.20% to liquidity providers, 0.05% to the protocol" —, mas estão desatualizados. A documentação oficial da pump.fun, com "Last Updated: 20 May 2026", substituiu esse número único por uma **escala de taxa por faixa de market cap** (https://pump.fun/docs/fees, documentação oficial, página aberta, 12/09/2026). O texto abaixo usa a escala oficial.

Termo, na primeira vez: "market cap" (capitalização de mercado) aqui é definido pela própria pump.fun como o preço atual do token (em SOL) multiplicado por 1 bilhão de tokens (o supply total): "the market cap is calculated as the current price of the token in SOL or USDC multiplied by 1 billion tokens". É esse market cap **em SOL** que determina qual faixa de taxa se aplica — não o seu volume pessoal de negociação (https://pump.fun/docs/fees, página aberta, 12/09/2026).

### Onde o token está: três regimes de taxa

1. **Fase de bonding curve** (curva de emissão, antes de graduar): taxa total de **1,25%** por trade, dividida em **0,300% criador + 0,95% protocolo + 0% LP** (não há provedores de liquidez na curva). A página oficial traz essa linha explícita: "The bonding curve fees are as follows for both USDC and SOL tokens: 0.300% [criador], 0.95% [protocolo], 0% [LP], 1.25% [total]" (https://pump.fun/docs/fees, documentação oficial, página aberta, 12/09/2026; mecânica em https://pump.fun/docs/bonding-curve, página aberta, 12/09/2026). Confirma-se que a versão anterior estava certa quanto ao 1,25% total na curva, mas o split correto é 0,300% criador / 0,95% protocolo (não "criador + protocolo" de forma vaga).

2. **PumpSwap, pool canônica** (para onde o token migra ao graduar): escala por market cap em SOL, de **1,250%** (token pequeno) até **0,300%** (token grande). Tabela oficial completa (SOL), abaixo.

3. **PumpSwap, pool não canônica** (pools que não vieram de uma graduação pump.fun): taxa fixa de **0,3%**, dividida em **0% criador + 0,05% protocolo + 0,25% LP** (https://pump.fun/docs/fees, página aberta, 12/09/2026).

### Tabela oficial de taxas — PumpSwap, pools canônicas, tokens em SOL

(Fonte: https://pump.fun/docs/fees, documentação oficial, página aberta, 12/09/2026. Há também uma tabela paralela para tokens denominados em USDC, introduzidos em 21/05/2026; abaixo está a de SOL, que é a relevante para o módulo.)

| Market cap (SOL) | Criador | Protocolo | LP | Total |
|---|---|---|---|---|
| 0 – 420 | 0,300% | 0,930% | 0,020% | **1,250%** |
| 420 – 1.470 | 0,950% | 0,050% | 0,200% | 1,200% |
| 1.470 – 2.460 | 0,900% | 0,050% | 0,200% | 1,150% |
| 2.460 – 3.440 | 0,850% | 0,050% | 0,200% | 1,100% |
| 3.440 – 4.420 | 0,800% | 0,050% | 0,200% | 1,050% |
| 4.420 – 9.820 | 0,750% | 0,050% | 0,200% | 1,000% |
| 9.820 – 14.740 | 0,700% | 0,050% | 0,200% | 0,950% |
| 14.740 – 19.650 | 0,650% | 0,050% | 0,200% | 0,900% |
| 19.650 – 24.560 | 0,600% | 0,050% | 0,200% | 0,850% |
| 24.560 – 29.470 | 0,550% | 0,050% | 0,200% | 0,800% |
| 29.470 – 34.380 | 0,500% | 0,050% | 0,200% | 0,750% |
| 34.380 – 39.300 | 0,450% | 0,050% | 0,200% | 0,700% |
| 39.300 – 44.210 | 0,400% | 0,050% | 0,200% | 0,650% |
| 44.210 – 49.120 | 0,350% | 0,050% | 0,200% | 0,600% |
| 49.120 – 54.030 | 0,300% | 0,050% | 0,200% | 0,550% |
| 54.030 – 58.940 | 0,275% | 0,050% | 0,200% | 0,525% |
| 58.940 – 63.860 | 0,250% | 0,050% | 0,200% | 0,500% |
| 63.860 – 68.770 | 0,225% | 0,050% | 0,200% | 0,475% |
| 68.770 – 73.681 | 0,200% | 0,050% | 0,200% | 0,450% |
| 73.681 – 78.590 | 0,175% | 0,050% | 0,200% | 0,425% |
| 78.590 – 83.500 | 0,150% | 0,050% | 0,200% | 0,400% |
| 83.500 – 88.400 | 0,125% | 0,050% | 0,200% | 0,375% |
| 88.400 – 93.330 | 0,100% | 0,050% | 0,200% | 0,350% |
| 93.330 – 98.240 | 0,075% | 0,050% | 0,200% | 0,325% |
| 98.240 e acima | 0,050% | 0,050% | 0,200% | **0,300%** |

Leitura em uma frase: a taxa total **cai** de 1,250% para 0,300% conforme o token cresce. (Nota: ao ler a tabela oficial de SOL, os limites inferiores em SOL de algumas faixas intermediárias aparecem com valores anômalos na fonte bruta; os valores de taxa acima são os publicados e as pontas — 0–420 SOL e "98.240 SOL and up" — são inequívocas.)

### Componentes do custo, cada um com fonte e data

- **Taxa de pool (PumpSwap):** conforme a tabela acima — de 0,300% (faixa mais barata) a 1,250% (faixa mais cara). Fonte: https://pump.fun/docs/fees (documentação oficial, página aberta, 12/09/2026).
- **Taxa do serviço de bot de volume:** OpenLiquid anuncia 1% fixo sobre o volume, sem assinatura — "OpenLiquid charges a flat 1% fee per volume session. If you generate $10,000 in volume, the fee is $100" (https://openliquid.io/tools/volume-bot/ e https://openliquid.io/blog/trending-dexscreener-volume-thresholds/, vendedor, só snippet, 12/09/2026). Fonte de vendedor: trate como o preço anunciado do serviço, não como medição independente.
- **Taxa base de rede (Solana):** 0,000005 SOL (5.000 lamports; "lamport" = a menor unidade de SOL, um bilionésimo) por assinatura, fixa pelo protocolo, cobrada mesmo se a transação falhar; metade é queimada, metade vai ao validador. Fonte primária: Solana Docs, "Fees" (https://solana.com/docs/core/fees, documentação oficial, só snippet, 12/09/2026), corroborada verbatim pela Helius: "The base fee, currently set at 0.000005 SOL (5,000 lamports) per signature, forms the foundation of the transaction cost" (https://www.helius.dev/blog/solana-fees-in-theory-and-practice, relatório de empresa de infraestrutura, só snippet, 12/09/2026).
- **Priority fee / Jito tip:** opcional, para furar fila. Priority fee em micro-lamports por unidade de computação (CU), pela fórmula oficial **ceil(compute_unit_price × compute_unit_limit / 1.000.000) lamports** (Solana Docs, só snippet, 12/09/2026; exemplo verbatim confirmando a fórmula: "priority_fee = ceil(50,000 × 300,000 / 1,000,000) = 15,000 lamports = 0.000015 SOL ... uses the requested compute unit limit, not the compute actually consumed", Supanode, https://supanode.xyz/blog/solana-fees-priority-fees-transaction-cost, blog técnico, só snippet, 12/09/2026). O Jito exige um tip mínimo de **1.000 lamports** (0,000001 SOL) por bundle, podendo subir em disputa — "Please note that Jito enforces a minimum tip of 1000 lamports for bundles. During high-demand periods, this minimum tip might not be sufficient to successfully navigate the auction" (Jito Labs Docs, "Low Latency Transaction Send", https://docs.jito.wtf/lowlatencytxnsend/, documentação oficial, só snippet, 12/09/2026). Como ordem de grandeza da faixa de priority fee, o vendedor OpenLiquid anuncia "During normal conditions, priority fees of 1,000-50,000 micro-lamports per CU are sufficient. During congestion, fees of 100,000-1,000,000+ micro-lamports per CU may be needed" (https://openliquid.io/blog/solana-transaction-fees-explained/, vendedor, só snippet, 12/09/2026) — atribuo essa faixa numérica ao vendedor, não à Helius (a Helius fornece a fórmula e o valor da base fee, não essa faixa).
- **Slippage (deslizamento):** custo embutido porque cada swap move a curva/pool; quanto mais fina a liquidez, maior. **Não é uma taxa fixa** — é perda por impacto de preço e depende da profundidade da pool. Não há número único; não invento um. Ordem de grandeza citada por vendedor/blog: a Uwuu observa que "price impact and slippage on a thin, freshly graduated pool dwarf the 0.25% fee" (https://uwuu.ai/blog/pumpswap, blog/vendedor, só snippet, 12/09/2026) — corrobora só o conceito, sem número.

### Preço do SOL usado na conversão

SOL ≈ **US$ 102** em 12/09/2026. Fontes: MetaMask, "US$ 102,01 today, September 12, 2026" (https://metamask.io/price/solana, autopublicado/agregador, só snippet, 12/09/2026) e CoinDesk, "US$ 101,63 today as of Sep 12, 2026, 2:03 am EDT" (https://www.coindesk.com/price/solana, mídia/agregador, só snippet, 12/09/2026). Bybit, no mesmo dia, "trading at $102.18" (só snippet). Uso US$ 102 como referência.

### A conta, passo a passo (por US$ 1 milhão de volume fabricado)

**Premissa de tamanho de trade (explícita):** assumo um trade médio entre US$ 20 e US$ 200, o que dá entre 50.000 e 5.000 swaps por US$ 1 milhão de volume. Essa faixa de tamanho de trade é uma premissa de modelagem — a OpenLiquid diz que "selects optimal trade sizes based on existing liquidity to avoid price impact" (https://openliquid.io/dex/jupiter/, vendedor, só snippet, 12/09/2026), mas **não confirmei** um número exato de "US$ 20–200 por trade". Trate 5.000–50.000 swaps como premissa, não como fato medido.

**Faixa MAIS BARATA (taxa de pool 0,300%, token com market cap acima de 98.240 SOL):**
- Taxa de pool: US$ 1.000.000 × 0,300% = **US$ 3.000**
- Taxa do serviço (1%): US$ 1.000.000 × 1% = **US$ 10.000**
- Taxa base de rede: 5.000–50.000 swaps × 0,000005 SOL × US$ 102 ≈ **US$ 3 a US$ 26** (ruído)
- Priority fee / Jito tip: de ~US$ 0,50 (tudo no mínimo de 1.000 lamports em ~5.000 swaps) a algumas centenas de dólares se pagar priority fee relevante em dezenas de milhares de swaps — ordem de **US$ 0,50 a ~US$ 500** (premissa)
- Slippage: **variável, sem número único** (depende da profundidade da pool)
- **Total (sem slippage): ≈ US$ 13.000 a US$ 13.500**, dominado por serviço (US$ 10.000) + pool (US$ 3.000).
- Em SOL a US$ 102: ≈ **127 SOL** (US$ 13.000 ÷ 102).

**Faixa MAIS CARA (taxa de pool 1,250%, token com market cap de 0 a 420 SOL — recém-graduado):**
- Taxa de pool: US$ 1.000.000 × 1,250% = **US$ 12.500**
- Taxa do serviço (1%): **US$ 10.000**
- Taxa base de rede: **US$ 3 a US$ 26** (ruído)
- Priority fee / Jito tip: **US$ 0,50 a ~US$ 500** (premissa)
- Slippage: **variável, sem número único**
- **Total (sem slippage): ≈ US$ 22.500 a US$ 23.000**, dominado por pool (US$ 12.500) + serviço (US$ 10.000).
- Em SOL a US$ 102: ≈ **221 SOL** (US$ 22.500 ÷ 102).

**Fórmula geral:** custo ≈ volume × (taxa da faixa + taxa do serviço) + rede + tips + slippage. Com volume = US$ 1 mi e serviço = 1%, isso é US$ 1.000.000 × (taxa da faixa + 1%) + centavos a poucas centenas de dólares de rede/tips + slippage variável.

**Quem domina o custo:** a taxa de pool + a taxa de serviço (1%). Juntas são 96–99% do custo total. A taxa base de rede é ruído (poucos dólares a poucas dezenas de dólares por US$ 1 milhão). O slippage pode ser grande, mas não é fixo e não pode ser somado como número único.

### Observação importante para o módulo: o incentivo se inverte com o tamanho do token

Com a escala por market cap, fabricar volume é **proporcionalmente mais caro em token pequeno** (1,250% de taxa de pool, na faixa 0–420 SOL) e **mais barato em token grande** (0,300%, acima de 98.240 SOL). Isso cria uma tensão: é justamente no token pequeno e recém-graduado — onde a manipulação de "trending" é mais comum — que a taxa de pool é a mais alta. O vendedor OpenLiquid anuncia campanhas de volume mirando exatamente o memecoin recém-lançado em busca de trending — "Memecoins using OpenLiquid typically reach DexScreener trending within 4-8 hours" (https://openliquid.io/for/memecoin-projects/, vendedor, só snippet, 12/09/2026) —, ou seja, quem fabrica volume paga a taxa de pool mais cara justo onde mais usa a tática.

### Comparação com outra DEX (mantida)

O Raydium AMM v4 cobra 0,25% por swap, dividida em 0,22% para os provedores de liquidez (0,25% × 88%) e 0,03% para recompra de RAY (0,25% × 12%) — "Standard swaps: 0.25% fee — 0.22% goes to LPs, 0.03% to RAY buybacks" (Raydium Docs, "Protocol fees", https://docs.raydium.io/ray/protocol-fees, documentação oficial, só snippet, 12/09/2026). **NÃO VERIFICADO nesta consulta:** a taxa exata atual de cada pool Meteora (DLMM/DAMM) por par — a Meteora usa taxa dinâmica que varia por pool; não confirmei um número único.

### Números anunciados pelo vendedor (corroboração fraca)

OpenLiquid diz que uma campanha de US$ 200 mil de volume em Solana custa ~US$ 2.000–4.000 no total — "A $200,000 volume campaign on Solana costs approximately $2,000-$4,000 total (1% platform fee plus negligible gas), compared to $5,000-$15,000 on Ethereum for the same volume" (https://openliquid.io/blog/trending-dexscreener-volume-thresholds/, vendedor, só snippet, 12/09/2026). **Atenção:** esse número do vendedor considera só a taxa de 1% do serviço + gas, e **ignora a taxa de pool da PumpSwap** (0,300%–1,250%). Somando a taxa de pool, o custo por US$ 1 milhão fica em ~US$ 13.000 (token grande) a ~US$ 23.000 (token pequeno), como calculado acima. Trate o número do vendedor como ordem de grandeza incompleta, não como medição independente.

---

## 1.3 Por que alguém faz isso: o que o volume alto compra (corrigido — 12/09/2026)

**Registro da correção:** a versão anterior definia a graduação por um limiar em dólar ("~85 SOL, correspondendo a um market cap de cerca de US$ 69.000"), apresentando os US$ 69 mil como se fossem o gatilho. Isso está errado. A graduação é definida **em tokens** (equivalentemente, num alvo fixo de SOL na curva); o valor em dólar apenas *reflete* isso e flutua com o preço do SOL. Esta versão redefine o tópico da graduação em tokens e trata todo valor em dólar como observação datada. Os outros três tópicos (trending do DexScreener, listagens em agregadores, o que os vendedores dizem) foram mantidos com o mesmo sentido e as mesmas fontes.

O incentivo concreto é visibilidade paga por ranking, que atrai compradores reais:

- **Trending do DexScreener.** A documentação oficial confirma que Boosts são um produto pago que aumenta temporariamente o Trending Score por 12–24h — "When a Boost pack is purchased for a given token, its visibility and Trending Score will be enhanced for a limited duration, ranging from 12 to 24 hours" — e que 500+ boosts ativos dão o "Golden Ticker": "Tokens that achieve 500 or more active Boosts unlock the Golden Ticker, which gives the token a distinct golden color on the screener and token pages. The Golden Ticker remains active as long as there are 500 or more active Boosts" (https://docs.dexscreener.com/boosting e https://docs.dexscreener.com/privacy/boosting-terms-and-conditions, documentação oficial, só snippet, 12/09/2026). O DexScreener declara que o Trending Score é multifatorial mas **não publica os pesos exatos do algoritmo** ("while we keep the special blend of our algorithm close to our chest"; https://docs.dexscreener.com/trending, documentação oficial, só snippet, 12/09/2026) — os limiares que circulam são observação de comunidade/vendedor. O vendedor OpenLiquid resume o ranking como volume 24h + nº de transações + carteiras únicas + liquidez + velocidade de variação (https://openliquid.io/guides/trending-dexscreener/, vendedor, só snippet, 12/09/2026).

- **"Graduação" na pump.fun (refeita em tokens).** Todo token pump.fun nasce com **1.000.000.000 (1 bilhão)** de tokens de supply fixo, dos quais **800.000.000** ficam disponíveis na bonding curve. O token "gradua" — a curva fecha e a liquidez migra atomicamente para a PumpSwap — quando restam **206.900.000** tokens na curva, ou seja, quando **793.100.000** já foram vendidos. Esse é o gatilho real, um número de tokens, não um número em dólar. A Bitquery publica a fórmula de progresso: **BondingCurveProgress = 100 − (((saldo − 206.900.000) × 100) / 793.100.000)**, onde "saldo" é o balanço da curva para aquele token — "This helps identify tokens nearing sell-out, a common signal for tokens 'about to pump'" (https://docs.bitquery.io/docs/blockchain/Solana/Pumpfun/pump-fun-to-pump-swap/, documentação de empresa de dados, só snippet, 12/09/2026). A documentação oficial confirma que a graduação é automática e irreversível e que a liquidez migrada (SOL + tokens restantes) vira a pool canônica da PumpSwap, de propriedade do protocolo: "the entire liquidity pool is migrated atomically to PumpSwap ... Graduation is automatic and irreversible. There's no human step" (https://pump.fun/docs/bonding-curve, documentação oficial, página aberta, 12/09/2026).

  Esse alvo em tokens corresponde a **cerca de 85 SOL de liquidez real** arrecadada na curva — "this threshold corresponds to approximately 85 SOL raised" (Marino et al., arXiv 2602.14860, preprint, https://arxiv.org/html/2602.14860v1, página aberta, 12/09/2026). Como o alvo é fixo em SOL/tokens, **o valor em dólar flutua com o preço do SOL**. Cuidado, porém: circulam **dois** números em dólar diferentes, e as fontes os confundem —
  (1) o **valor dos ~85 SOL migrados** (85 × preço do SOL): a FXStreet escreveu, em 17/04/2025, "once a token acquires up to 85 Solana — approximately $11,000 — the liquidity is automatically migrated to Raydium's AMM" (https://www.fxstreet.com/cryptocurrencies/news/ray-sees-double-digit-gains-as-raydium-unveils-new-pumpfun-competitor-202504170130, mídia, só snippet, 12/09/2026), implicando SOL ≈ US$ 129 naquela data (obs.: o contexto da FXStreet é o limiar idêntico de 85 SOL usado pelo concorrente Raydium LaunchLab, mas o cálculo "85 SOL ≈ US$ 11 mil" vale igualmente para a pump.fun); e
  (2) o **"market cap" na graduação** (preço final × 1 bilhão de tokens), que é um número maior. É a esse market cap que se referem os valores "~US$ 69 mil" e "~US$ 100 mil".

  Observações datadas do market cap na graduação:
  - **~US$ 69 mil**: valor observado no período do dataset do paper de Marino, Naviglio, Tarantelli e Lillo (arXiv 2602.14860, preprint), cujo dataset cobre **1º de setembro a 1º de outubro de 2025** — "The investigated dataset covers a one-month period, from September 1 to October 1, 2025" e "this threshold corresponds to approximately 85 SOL raised and a market capitalization of about $69,000" (https://arxiv.org/html/2602.14860v1, página aberta, 12/09/2026). SOL naquele período rondava US$ 150–200.
  - **~US$ 100 mil**: The Block, em 27/02/2025, "when a token's market cap reaches approximately $100,000, it 'graduates' and is listed on the decentralized exchange Raydium" (relatado via TradingView/The Block, https://www.theblock.co/post/343742/pump-fun-rapid-decline-graduating-tokens-memecoin-frenzy-fizzles-out, mídia, só snippet, 12/09/2026). Convenção fixada no pico de janeiro/2025, quando o SOL chegou ao recorde de US$ 294,85 em 19/01/2025 (CoinGecko/Coinbase, só snippet, 12/09/2026).
  - **~US$ 66–69 mil (convenção clássica de fim de 2024):** a Decrypt, quando a pump.fun tinha "nove meses", registrou "only 1.5% of tokens launched have 'graduated' ... by hitting a $69,000 market cap" (https://decrypt.co/249107/fewer-than-100-pump-fun-tokens-above-1m-market-cap-amid-meme-coin-lull, mídia, só snippet, 12/09/2026), com SOL ~US$ 150–170. **Alerta de erro comum:** muitas fontes explicam o "US$ 69 mil" como "85 SOL a US$ 800/SOL" (ex.: soltokencreator.io). Isso é matematicamente inconsistente — o SOL nunca esteve perto de US$ 800; o "market cap" na graduação é o preço final × 1 bilhão de tokens, não 85 × preço do SOL. Não repita a explicação do "US$ 800/SOL" como fato observado.
  - Um exemplo *ilustrativo* (não observado) de como o dólar flutua: um gist técnico de maio/2026 tabela, hipoteticamente, "$600 → ~$51,000 ... $800 → ~$68,000 ... $1,000 → ~$85,000 ... $1,200 → ~$102,000", sempre calculando 85 × preço (https://gist.github.com/septimlabs-code/ce3b717b27803a908caee9e035bead08, autopublicado, página aberta, 12/09/2026) — útil só para mostrar o mecanismo (o dólar flutua com o SOL), não é medição, e usa a métrica dos 85 SOL, não o market cap.
  - **Hoje (12/09/2026), SOL ≈ US$ 102:** os ~85 SOL migrados valem ≈ US$ 8.700; o "market cap" na graduação é um número separado e maior, que também recuou junto com o SOL.

  **NÃO VERIFICADO:** um valor observado exatamente em **US$ 101 mil** (o mais próximo confirmado é o "~US$ 100 mil" da The Block, 27/02/2025) e qualquer *market cap* observado tão baixo quanto **US$ 11 mil** (o "US$ 11 mil" da FXStreet é o valor dos 85 SOL migrados, não um market cap; e a pump.fun só existe desde 2024, quando o SOL nunca esteve baixo o bastante para um market cap de graduação de US$ 11 mil).

  **Por que isso importa para o incentivo (em uma frase):** a "corrida" para graduar é sobre **volume comprado na curva** (empurrar 793,1 milhões de tokens para fora dela até restarem 206,9 milhões), não sobre bater um número em dólar — por isso volume e velocidade de preenchimento da curva sinalizam "coordenação", e o rótulo em dólar na tela é uma consequência do preço do SOL, não a meta.

- **Listagens em agregadores.** CoinGecko/CoinMarketCap exigem critérios mais estritos (site funcional, listagem em exchanges integradas); DexScreener e CoinSniper indexam quase imediatamente — "DexScreener automatically indexes tokens immediately upon the creation of the liquidity pool and the initial transaction activity, while CoinSniper requires only a basic application process, after which the projects appear immediately on their New Listings Page without further verification". Fonte: Midsummer, "A Midsummer Meme's Dream", seção 3.1.2 (arXiv 2507.01963v2, revisado por pares — USENIX Security '26; https://arxiv.org/html/2507.01963, só snippet, 12/09/2026).

- **O que os vendedores dizem que o volume compra:** OpenLiquid afirma que chegar ao trending aumenta credibilidade, contagem de novos holders e momentum, e que por isso distribui trades em muitas carteiras com tamanhos e horários aleatorizados para imitar negociação orgânica — "Volume is distributed across multiple wallets with varied sizes and timing to mirror organic trading patterns" (https://openliquid.io/for/memecoin-projects/ e https://openliquid.io/guides/trending-dexscreener/, vendedor, só snippet, 12/09/2026).

---

### NÃO VERIFICADOS desta correção
- Market cap de graduação observado exatamente em **US$ 101 mil** (mais próximo confirmado: ~US$ 100 mil, The Block, 27/02/2025).
- Market cap de graduação observado tão baixo quanto **US$ 11 mil** (o "US$ 11 mil" da FXStreet, 17/04/2025, é o valor dos 85 SOL migrados a SOL ≈ US$ 129, não um market cap).
- Número exato de **"US$ 20–200 por trade"** atribuído à OpenLiquid (usado apenas como premissa de modelagem para estimar 5.000–50.000 swaps por US$ 1 mi).
- **Taxa da Meteora** (DLMM/DAMM) por pool — dinâmica, sem número único confirmado.
- Valor de **slippage** por US$ 1 milhão — depende da profundidade da pool; sem número único (não inventado).
- Limites inferiores em SOL de algumas **faixas intermediárias** da tabela oficial (a fonte bruta traz valores anômalos nos "approxMcapMin" do meio da tabela de SOL); as pontas e as taxas totais estão confirmadas.
- Preços do SOL em datas passadas (US$ ~129 em 17/04/2025; US$ 150–200 em set–out/2025; US$ 294,85 em 19/01/2025) obtidos de agregadores/mídia por snippet, não de série histórica aberta linha a linha.

### Consultas feitas (checkpoint)
1. pump.fun/docs/fees (página aberta) — tabela completa de taxas por faixa, "Last Updated: 20 May 2026", curva 1,25% e pool não canônica 0,3%.
2. pump.fun/docs/bonding-curve (página aberta) — mecânica de graduação, migração atômica, 1,25% na curva.
3. Bitquery pump.fun bonding curve 206.900.000 / 793.100.000 — fórmula de progresso (só snippet).
4. Preço do SOL em 12/09/2026 — CoinDesk, MetaMask, Bybit (só snippet).
5. pump.fun graduation US$ 69.000 / 85 SOL / arXiv — Marino et al. e agregadores.
6. pump.fun graduation US$ 11.000 / valor dos 85 SOL — FXStreet (via subagente).
7. arXiv 2602.14860 período do dataset — 1º set a 1º out/2025 confirmado (página aberta).
8. OpenLiquid trending / taxa 1% / gas ~US$ 0,01–0,05 (só snippet).
9. Jito tip mínimo 1.000 lamports (docs.jito.wtf, só snippet).
10. Raydium AMM v4 0,25% / 0,22% LP / 0,03% RAY (docs, só snippet).
11. Midsummer arXiv 2507.01963 — DexScreener/CoinSniper/CoinGecko (só snippet).
12. Solana Docs base fee 5.000 lamports por assinatura + Helius/Supanode (só snippet).
13. DexScreener boosting 12–24h / Golden Ticker 500 boosts (docs, só snippet).
14. KuCoin / Blocmates / The Block PumpSwap 0,25% em 20/03/2025 (só snippet).
15. pump.fun graduation ~US$ 100k / preço do SOL alto — The Block, MEXC (via subagente/snippet).
16. Marino et al. período do dataset + preço do SOL set–out/2025 (página aberta / snippet).
17. Subagente dedicado: observações datadas do valor em dólar da graduação (FXStreet US$ 11k = 85 SOL; The Block ~US$ 100k; Decrypt/arXiv US$ 66–69k), com a distinção entre "valor dos 85 SOL" e "market cap".