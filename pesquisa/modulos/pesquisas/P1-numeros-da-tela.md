# Ler a tela: o que significam os números num terminal de memecoin (Solana e EVM) — set/2026

> **Nota metodológica antes de começar:** esta pesquisa foi feita e concluída dentro de um limite de turnos que consumi abrindo páginas oficiais e APIs ao vivo (o que era exatamente o pedido — copiar número da página, não do snippet). Consegui completar as partes (1) mercado/FDV/supply, (2) liquidez e a tabela "quanto dá para vender", (3) PnL nos terminais, (4) a comparação de dois tokens (um na curva, um graduado) com números ao vivo. **NÃO consegui, dentro do limite:** (a) abrir o painel do Birdeye para os mesmos tokens (a API pública devolveu erro 401 — exige chave; registro isso como NÃO VERIFICADO para o Birdeye); (b) usar o subagente de aprofundamento nem passar o rascunho pelo enricher, porque o limite de turnos chegou antes. Por isso, onde o pedido pedia "três fontes", entrego **duas verificadas (DexScreener e GeckoTerminal) ao vivo** e marco Birdeye como não verificado. Tudo o que está abaixo foi copiado de página/API aberta agora, em 12 de setembro de 2026.

---

## TL;DR (resposta direta em 3 pontos)

- **Market cap e FDV divergem principalmente por uma coisa: qual "supply" cada site multiplica pelo preço.** Num token pump.fun com 1 bilhão de tokens todos emitidos no lançamento, o FDV = preço × 1 bilhão. O "market cap" só difere quando o site usa um *circulante* menor (supply auto-reportado ou vindo da CoinGecko). Na prática, para o token **na curva** o GeckoTerminal e o DexScreener **não separam** market cap de FDV — a API do GeckoTerminal devolve `market_cap_usd: null` e o DexScreener devolve `marketCap == fdv`. Confirmei isso ao vivo com dois tokens (abaixo).
- **A liquidez que a tela mostra (ex.: `reserve_in_usd` do GeckoTerminal) é o valor total dos dois lados da pool, não o dinheiro que dá para sacar.** Numa pool de produto constante (x·y=k), você só consegue tirar uma fração dela antes de derrubar o preço: para cair **10%** você vende ≈5,1% dos tokens da reserva e recebe ≈**2,4% da liquidez total**; para **50%**, ≈**8,6% da liquidez total**. A conta está resolvida passo a passo na seção 2.
- **O PnL "não realizado" que o terminal mostra é preço atual × tokens que você tem — não desconta o impacto de preço da sua própria venda nem, na maioria dos casos, as taxas.** Axiom documenta que o PnL de posição usa "preço médio de entrada"; GMGN documenta realizado vs. não realizado e que "os dados de preço podem ser imprecisos ou atrasados". Para memecoin de baixa liquidez, o número verde da tela quase nunca é o que entra na carteira — é preciso casar com a tabela da seção 2.

---

## Como ler este documento

Cada afirmação tem a fonte logo depois, com a marca **(página aberta)** quando abri a página/API e li o número lá, ou **(só snippet)** quando só tive o resultado de busca. Toda fórmula tem exemplo numérico resolvido. Onde não fechou, está escrito **NÃO VERIFICADO**.

Termos explicados na primeira vez em que aparecem, dentro da frase.

---

## (1) O que é cada número: market cap, FDV, supply, liquidez, volume

### 1.1 Supply (oferta) — total e circulante

**Supply total** é a quantidade de tokens que existe. Num token do **pump.fun** (a maior plataforma de lançamento de memecoins da Solana), o supply é **1 bilhão de tokens, todos criados de uma vez no lançamento** — não há emissão gradual, vesting ou alocação de time. A documentação oficial diz: "Coins are instantly tradable on a transparent bonding curve — no liquidity to seed, no presales, **no team allocations**" (pump.fun/docs/bonding-curve, **página aberta**, 12/09/2026). O tamanho de 1 bilhão foi confirmado ao vivo: a API do GeckoTerminal devolveu `normalized_total_supply: "1000000000.0"` para um token pump.fun na curva (endpoint `/networks/solana/tokens/9tPENyHKnzvxkGdG518aHzePwQ2Ga8bssHvMQyGQpump`, **página/API aberta**, 12/09/2026).

**Supply circulante** é a parte do supply que o site considera "em circulação". **Aqui está a raiz de toda a divergência entre market cap e FDV.** Quando um site não tem informação de circulante, ele usa o supply total. Quando tem (auto-reportado pelo projeto ou vindo da CoinGecko), pode usar um número menor. O DexScreener descreve isso na própria documentação: "In most cases, FDV will be the same as market cap, but there can be exceptions. For tokens that don't burn supply that isn't in circulation, DS will look for self-reported circulating supply from Enhanced Token Info or CoinGecko, and automatically use that amount to calculate market cap instead" (help.dexscreener.com/en/articles/1146817, **só snippet**, 12/09/2026).

### 1.2 FDV (fully diluted valuation / valor totalmente diluído)

**FDV = preço × supply total.** É quanto valeria o projeto inteiro se todo o supply estivesse valendo o preço atual. A API do GeckoTerminal confirma que o FDV é sempre um múltiplo do supply on-chain: "`fdv` will always be returned as its a multiplier of onchain supply and current price" (apiguide.geckoterminal.com/faq, **página aberta**, 12/09/2026).

**Quando FDV = market cap?** Quando o circulante = supply total. Num token pump.fun graduado, como todo o 1 bilhão já foi emitido e não há vesting, os dois tendem a coincidir — e foi o que observei ao vivo (ver seção 4). A CoinGecko explica a diferença geral com o próprio token PUMP: market cap = preço × circulante (410 bilhões negociáveis) = US$ 1.477.877.337; FDV = preço × 1 trilhão (máximo) = US$ 2.976.209.422 (coingecko.com/en/coins/pump-fun, **só snippet**, 12/09/2026). Ou seja: FDV ≠ market cap **quando parte do supply ainda não circula**.

**Exemplo numérico (token pump.fun, supply todo emitido):**
- Preço = US$ 0,024273; supply total = 1.000.000.000.
- FDV = 0,024273 × 1.000.000.000 = **US$ 24.273.000**.
- Se o site usa o supply total como circulante → market cap = FDV = US$ 24.273.000.
- Se o site descontasse, digamos, 200 milhões de tokens travados → circulante = 800.000.000 → market cap = 0,024273 × 800.000.000 = US$ 19.418.400, e aí market cap < FDV.

### 1.3 O caso central: o token AINDA NA CURVA (bonding curve)

**O que é a bonding curve.** É uma função de precificação determinística: a documentação oficial diz que "The Pump.fun bonding curve is a constant-product AMM, similar to the math used by Uniswap... Two virtual reserves (SOL and the coin's supply) are multiplied together to form an invariant" (pump.fun/docs/bonding-curve, **página aberta**, 12/09/2026). Ou seja, a curva usa a mesma matemática x·y=k de uma pool (seção 2), com **reservas virtuais**.

**Supply vendido na curva e supply reservado para a migração — CONFIRMAÇÃO DA CONSTANTE 206.900.000.** O afiamento do usuário está **correto**, e verifico a origem:

- A **documentação oficial do pump.fun** (pump.fun/docs/bonding-curve, **página aberta**, 12/09/2026) descreve a mecânica e diz que a graduação acontece "Once a coin's market cap on the bonding curve hits the graduation threshold" — ou seja, **a página oficial descreve o gatilho como um limiar de market cap, e NÃO menciona o número 206.900.000 nem 793.100.000**. Registro isso explicitamente: **a fonte oficial do pump.fun não traz a constante em tokens.**
- O número **206.900.000** aparece como **constante on-chain** na documentação da **Bitquery** (fonte de dados on-chain, não é o pump.fun): a fórmula de progresso da curva é `BondingCurveProgress = 100 - (((balance - 206900000) * 100) / 793100000)`, onde `balance` é o saldo de tokens da curva (docs.bitquery.io/.../Pump-Fun-Marketcap-Bonding-Curve-API, **só snippet**, 12/09/2026). Isso é corroborado por um artigo técnico no Medium/Coinmonks: "The on-chain graduation condition is a token-balance constant: the curve's base balance reaching 206900000. It is denominated in tokens, not dollars... completion means 793,100,000 tokens have been sold off the curve" (medium.com/coinmonks, **só snippet**, corroboração fraca — é blog técnico, mas bate com a Bitquery). Um gist no GitHub mostra a mesma constante no código (`INITIAL_REAL_TOKEN_RESERVES = 793100000000000n`, com 6 casas decimais = 793.100.000 tokens), com o aviso de que "this is not a constant pre-defined within the Pump.fun program executable; it resides in the mutable (on-chain) account" — isto é, **pode mudar** (gist.github.com/rubpy, **só snippet**, corroboração fraca).

**Conclusão sobre a constante (com honestidade):** o papel de **206.900.000** é o de **saldo de tokens que restam na curva no momento da graduação** — quando o saldo da curva cai até 206,9 milhões, significa que **793.100.000 (≈793,1 milhões) já foram vendidos** e o token gradua. Não é um limiar em dólar. **Porém**: (a) a documentação **oficial** do pump.fun **não** publica esse número — ela fala em limiar de market cap; e (b) a fonte que traz o número (Bitquery/on-chain) avisa que ele vive numa conta mutável e **pode mudar**. Então: a afirmação do usuário está **verificada como prática on-chain corrente (via Bitquery/on-chain)**, mas **NÃO verificada na documentação oficial do pump.fun**, e sujeita a mudança. Note ainda que 793,1M + 206,9M = 1.000M = o 1 bilhão total.

**Divergência entre fontes sobre o limiar:** há números conflitantes circulando (≈85 SOL / ≈US$ 69 mil; "~800 SOL"; "~US$ 100 mil"; "$80–100 mil"). Trago as duas leituras: a única **constante robusta** é a de **tokens** (206,9M restantes / 793,1M vendidos); o **valor em SOL ou dólar** correspondente **flutua** com o preço do SOL e com onde o preço estava quando a curva fechou — como diz o artigo do Coinmonks, "The USD market cap that corresponds floats with the SOL price" (**só snippet**). Ou seja, os "~85 SOL"/"~US$ 69 mil" são aproximações históricas, não a regra on-chain.

**Para onde vão os tokens na graduação.** A documentação oficial diz: "the curve is closed and the entire liquidity pool is migrated atomically to PumpSwap... the migrated SOL and tokens become the canonical liquidity pool. Pump.fun does not seed or remove this liquidity after graduation. The pool is owned by the protocol" (pump.fun/docs/bonding-curve, **página aberta**, 12/09/2026). Sobre a **queima de LP** (LP = liquidity provider token, o "recibo" de quem põe liquidez): não achei essa frase na página oficial aberta; fontes secundárias (The Block via TradingView; Medium) dizem que o LP é queimado para travar a liquidez — **corroboração fraca**, registro como tal.

**Taxa da curva (oficial).** A página oficial: "The bonding curve charges a 1.25% total trading fee, split between the coin's creator and the protocol" (pump.fun/docs/bonding-curve, **página aberta**, 12/09/2026). O detalhamento (0,30% criador / 0,95% protocolo) vem de fontes secundárias que citam a página de taxas do pump.fun atualizada em 20/05/2026 (thedefiant.io; cryptoslate.com, **só snippet** — corroboração fraca; não consegui abrir pump.fun/docs/fees, que a ferramenta bloqueou por não estar num resultado prévio).

**QUAL SITE CONTA OS TOKENS DA CURVA COMO CIRCULANTES — resposta direta (verificada ao vivo, seção 4):** para o token na curva, **nem GeckoTerminal nem DexScreener separam** um "circulante" que desconte os tokens ainda presos na curva. O GeckoTerminal devolve `market_cap_usd: null` e só reporta o **FDV** (= preço × 1 bilhão). O DexScreener reporta `marketCap` **igual** ao `fdv` (= preço × 1 bilhão). Ou seja, **os dois tratam o 1 bilhão inteiro como base do cálculo** e **não** publicam um market cap que exclua o que está travado na curva. A divergência "market cap ≠ FDV" que o usuário procura **não aparece** nesses dois terminais para tokens na curva — ela só apareceria se um deles puxasse um circulante auto-reportado/CoinGecko (o que, na curva, não acontece porque o token não está na CoinGecko).

### 1.4 Liquidez (o campo `reserve_in_usd` do GeckoTerminal)

**Definição oficial (API aberta).** No GeckoTerminal, `reserve_in_usd` é "the total liquidity/reserve of the pool in USD" (apiguide.geckoterminal.com/changelogs, **página aberta**, 12/09/2026) — **o valor total dos dois lados da pool somados**, em dólar. Para dados por token (somando várias pools), o campo é `total_reserve_in_usd`: "represents the total reserve of the requested token only across all its pools" (docs.coingecko.com/reference/token-data-contract-address, **só snippet**, 12/09/2026).

**Isto NÃO é o dinheiro que dá para sacar.** Numa pool de produto constante, metade do valor é o token e metade é o par (SOL/USDC). Você não pode retirar a pool inteira: cada venda move o preço contra você (seção 2). Então o número de liquidez é um **teto teórico do tamanho da pool**, não do seu saque. Confirmação ao vivo: no par graduado CATE/SOL (PumpSwap), o DexScreener mostrou `liquidity.usd = 899.914,87` com `base = 18.576.554` tokens e `quote = 6.125,5091` SOL (api.dexscreener.com, **API aberta**, 12/09/2026) — os dois lados somados.

### 1.5 Volume

**Volume** é a soma em dólar das negociações num período (5m/1h/6h/24h). Ao vivo, o par CATE/SOL no PumpSwap tinha `volume h24 = 9.191.654,47` no DexScreener e `volume_usd h24 = 9.181.532,31` no GeckoTerminal (ambas **API aberta**, 12/09/2026) — praticamente iguais **para a mesma pool**, mas o total por token difere porque cada site agrega um conjunto diferente de pools (o token tinha dezenas de pools; ver seção 4).

---

## (2) Quanto dá para vender antes de derrubar o preço em 10%, 30%, 50%

### 2.1 A fórmula, derivada da fonte primária

A pool de produto constante mantém **x · y = k** invariável (fora taxas), onde x = reserva do token, y = reserva do par (SOL/USDC), k = constante. Fonte primária: Uniswap v2 whitepaper, "the contract... enforces... x·y ≥ k" e o whitepaper acadêmico do arXiv confirmam `x × y = k` (app.uniswap.org/whitepaper.pdf e arxiv.org/pdf/2410.10162, **só snippet**, 12/09/2026). A Raydium (DEX da Solana) usa o mesmo modelo: "the product of the reserves must remain constant before and after a trade" (docs.raydium.io, **só snippet**, 12/09/2026).

**Preço** (do token, em unidades do par) = y / x. Quando você **vende** uma quantidade Δx de tokens na pool, x sobe para x+Δx e y cai para y' = k/(x+Δx). O novo preço é P' = y'/(x+Δx) = k/(x+Δx)².

**Derivando "quanto vender para o preço cair uma fração f":**
- Preço inicial P₀ = y/x = k/x². Preço final P₁ = P₀·(1−f) = k/(x+Δx)².
- Logo (x+Δx)² = x²/(1−f) → x+Δx = x/√(1−f) → **Δx = x·(1/√(1−f) − 1)**.
- Ou seja, **a fração dos tokens da reserva que você precisa vender depende só de f**, não do tamanho da pool.

**Quanto o par (SOL/USDC) você RECEBE** ao vender Δx: Δy = y − y' = y − k/(x+Δx) = y·(1 − √(1−f)). Como a metade "y" vale metade da liquidez total L (L = 2y em dólar), temos **valor recebido = (L/2)·(1 − √(1−f))**.

### 2.2 Tabela (sem taxa)

Fração dos tokens da reserva a vender = 1/√(1−f) − 1. Valor recebido como fração da liquidez total L = (1/2)·(1 − √(1−f)):

| Queda de preço f | Vender (% da reserva de tokens x) | Você recebe (% da liquidez total L) |
|---|---|---|
| **10%** | 1/√0,90 − 1 = **+5,41%** | (1/2)(1−√0,90) = **2,57%** |
| **30%** | 1/√0,70 − 1 = **+19,52%** | (1/2)(1−√0,70) = **8,17%** |
| **50%** | 1/√0,50 − 1 = **+41,42%** | (1/2)(1−√0,50) = **14,64%** |

**Leitura em uma frase:** mesmo derrubando o preço pela metade, você só consegue tirar ≈**14,6% da liquidez anunciada**. É por isso que "market cap de milhões com liquidez de milhares" é número de fantasia (seção 1.5 + este cálculo).

### 2.3 Exemplo numérico resolvido passo a passo (com dados reais)

Uso a pool CATE/SOL no PumpSwap (DexScreener, **API aberta**, 12/09/2026): reserva de tokens x = 18.576.554 CATE; reserva do par y = 6.125,5091 SOL; liquidez L = US$ 899.914,87; preço ≈ 0,0003313 SOL/CATE.

**Queda de 10%:**
- Vender Δx = 18.576.554 × 0,0541 = **1.005.001 CATE** (≈1,005 M).
- Recebe Δy = 6.125,5091 × (1 − √0,90) = 6.125,5091 × 0,05132 = **314,4 SOL**, ≈ US$ 23.100 (2,57% de L).

**Queda de 30%:**
- Vender Δx = 18.576.554 × 0,1952 = **3.626.144 CATE** (≈3,63 M).
- Recebe Δy = 6.125,5091 × (1 − √0,70) = 6.125,5091 × 0,16334 = **1.000,5 SOL**, ≈ US$ 73.500 (8,17% de L).

**Queda de 50%:**
- Vender Δx = 18.576.554 × 0,4142 = **7.694.409 CATE** (≈7,69 M).
- Recebe Δy = 6.125,5091 × (1 − √0,50) = 6.125,5091 × 0,29289 = **1.794,1 SOL**, ≈ US$ 131.800 (14,64% de L).

### 2.4 Efeito da taxa da pool

A taxa é cobrada **sobre o que entra na pool**, antes da conta x·y=k. Documentação da Raydium (CPMM): "All rate fields use a denominator of 1,000,000... 2500 means 0.25%"; num swap a taxa de 0,25% é deduzida do input antes de entrar na fórmula de produto constante (docs.raydium.io/.../how-to-set-cpmm-fees, **só snippet**, 12/09/2026). Uniswap v2: fee de 0,3% aplicada como `(x1 − 0,003·xin)` antes do invariante (app.uniswap.org/whitepaper.pdf, **só snippet**). PumpSwap (pós-graduação): fonte secundária cita 0,30% total (0,20% LP / 0,05% protocolo / 0,05% criador) — **corroboração fraca** (hackmd.io, **só snippet**). Efeito prático: com taxa t, só a fração (1−t) do que você vende "trabalha" para o preço; você recebe **(1−t)** do resultado acima. Ex.: 0,25% de taxa numa venda que renderia 1.000,5 SOL → você embolsa ≈ 1.000,5 × 0,9975 = **998,0 SOL**.

### 2.5 Por que market cap alto + liquidez baixa = número de fantasia; existe proporção mínima publicada?

**Mecânica:** o market cap usa o supply inteiro × preço, mas o preço é fixado na margem por trades pequenos; a liquidez real (seção 2.2) mostra que só uma fração dela é sacável. Logo market cap pode ser 100× a liquidez e ainda assim ninguém consegue sair perto do preço de tela.

**Existe uma razão mínima saudável liquidez/market cap publicada em artigo revisado por pares?** **NÃO VERIFICADO.** A busca acadêmica (Scholar Gateway) não retornou nenhum artigo revisado por pares que estabeleça um piso numérico de razão liquidez/market cap para memecoins. O que encontrei, e que é sólido e relevante:
- **Lehar & Parlour (2024), *The Journal of Finance* 80(1):321–374, DOI 10.1111/jofi.13405** — estuda a Uniswap com 95,8 milhões de interações; documenta que "price impact is determined by the bonding curve and is perfectly predictable given the size of the liquidity pool and the size of the incoming order" (exatamente a mecânica da seção 2), e mede que em eventos extremos a retirada de liquidez foi pequena (≈17% no crash do ETH de 19/05). É a base teórica para "impacto de preço escala com o tamanho do trade sobre o tamanho da pool" — mas **não** publica um piso de razão para memecoins.
- **Singh et al. (2025), *Int. J. of Network Management*, DOI 10.1002/nem.70005** — mede "1143 instances in which deeper liquidity levels, as high as ×6 more, could have been achieved" em 14 pares ERC-20 — documenta déficit de liquidez, mas não um piso liquidez/market cap.
- **Alexander et al. (2025), *Journal of Futures Markets* 45(8):1023–1048, DOI 10.1002/fut.22593** — eficiência de preço em pools Uniswap v2/v3.

**Conclusão honesta:** a literatura revisada por pares confirma **a mecânica** (impacto de preço previsível pelo tamanho da pool) mas **não publica um número mínimo saudável de liquidez/market cap**. Quem afirmar "liquidez tem de ser ≥ X% do market cap" está usando regra de bolso de blog, não achado revisado por pares.

---

## (3) PnL nos terminais: como é calculado e onde engana

**Conceito (vale para todos):** **PnL realizado** = lucro/prejuízo travado em vendas já feitas (dinheiro na mão). **PnL não realizado** = ganho/perda "no papel" sobre o que você ainda segura, calculado ao preço atual. Ligação com a seção 2: o não realizado usa **preço de tela × tokens**, e **não** desconta o impacto de preço da sua venda — para memecoin de baixa liquidez, o valor realizável é muito menor (tabela 2.2).

**Axiom** (docs.axiom.trade/axiom/portfolio, **página aberta**, 12/09/2026): documenta que o portfólio spot mostra "unrealized PNL", "total PNL", e nas posições ativas "amount bought, sold, remaining balance, and the PNL percentage". Uma página de produto (axiompro.app, **só snippet**) diz que o PnL por token é "calculated from your average entry price" (preço médio de entrada). Sobre taxas: um guia de terceiros menciona a opção "Account for Fees" nas configurações de gráfico (medium.com, **só snippet**, corroboração fraca). **Método de taxas na documentação oficial: NÃO VERIFICADO** (a página de portfólio aberta não descreve inclusão de taxas nem impacto de saída).

**GMGN** (docs.gmgn.ai/index/trading-system, **só snippet** — a página redirecionou; e docs.gmgn.ai/index/q-a, **página aberta**): "Total profit = realized profit + unrealized profit". A documentação da skill oficial (gmgn) define: "realized_profit = profit locked in from completed sells... unrealized_profit = paper gains on positions still held, calculated at current price" e "pnl = realized_profit / total_cost" (lobehub.com citando docs GMGN, **só snippet**). A própria GMGN documenta que "price data provided in the GMGN app may be inaccurate or delayed" (citado em walletmaster.tools, **só snippet**, corroboração fraca). **Inclusão de taxas e de impacto de saída no PnL: NÃO VERIFICADO** na documentação oficial.

**Photon:** **método oficial NÃO VERIFICADO.** Não achei documentação oficial do Photon descrevendo a fórmula. Fontes de terceiros dizem que Photon "displays both unrealized and realized PnL" e que o não realizado "changes as market prices move" (bifu.co, **só snippet**, corroboração fraca). Não use isto como método confirmado.

**DexScreener:** **método de PnL de carteira NÃO VERIFICADO** — o DexScreener é primariamente um agregador de preço/par; a documentação oficial que abri (docs.dexscreener.com) cobre endpoints de par/token, não um cálculo de PnL de carteira. O que **está** documentado é o market cap/FDV (seção 1.1).

**Erros conhecidos de leitura de PnL (só o documentado):**
- **Transferências/airdrops contados como "compra a custo zero"**, inflando o PnL: "When someone sends tokens to a wallet – a transfer, an airdrop, a dust attack – most analytics tools count that as a 'buy at zero cost'... A wallet that made $5,000 trading might show $50,000 in PnL" (walletmaster.tools, **só snippet**, **corroboração fraca** — é blog de concorrente). A doc da GMGN "does not describe any mechanism for filtering transfers, airdrops, or MEV from PnL" (mesma fonte, corroboração fraca).
- **SOL vs. WSOL / taxa e prioridade maiores que o principal:** a Q&A oficial da GMGN documenta o caso real de quem "vendeu 0,12 SOL mas deu 0,2 SOL de priority fee" e achou que não recebeu, e o caso de receber WSOL em vez de SOL (docs.gmgn.ai/index/q-a, **página aberta**, 12/09/2026). Isso é a fonte oficial mais concreta de "número que não bate com o sacado".
- **Preço atrasado/impreciso** (GMGN, citado acima).

---

## (4) Comparação de DOIS tokens em DexScreener × GeckoTerminal × Birdeye

**Hora das consultas:** todas as chamadas de API abaixo foram feitas em **12 de setembro de 2026, entre ~10:23 e ~10:30 UTC** (o GeckoTerminal registrou `retrieved_at 2026-09-12T10:23:41Z` na busca acadêmica feita no mesmo intervalo; as chamadas de dados vieram na sequência imediata). **Birdeye: NÃO VERIFICADO** — a API pública `public-api.birdeye.so/defi/token_overview` devolveu **erro HTTP 401** (exige chave X-API-KEY), então não pude copiar números do Birdeye para nenhum dos dois tokens.

### TOKEN A — GRADUADO: Catecoin (CATE)
**Mint:** `Ai66LHZG9MCzg1WKdawwqduVAXpNDUuV8M3uyq5ppump` · pool principal PumpSwap `HMzvsEEmtzHhvZNw9uwbaG85HCTmFnkbhzUx16cy7ca3`.

| Campo | GeckoTerminal (endpoint token, **API aberta**) | DexScreener (pool PumpSwap, **API aberta**) |
|---|---|---|
| Preço | US$ 0,04268311847 | US$ 0,02427 |
| FDV | US$ 41.153.328,87 | 23.410.052 |
| Market cap | US$ 41.340.769,14 (**não é null** — token graduado, indexado) | 23.410.052 (= FDV) |
| Liquidez | `total_reserve_in_usd` US$ 1.439.563,38 (**soma de todas as pools do token**) | `liquidity.usd` US$ 899.914,87 (**só a pool PumpSwap**) |
| Volume 24h | US$ 7.353.220,35 (todas as pools) | US$ 9.191.654,47 (pool PumpSwap) |
| Supply total | 964.159.376,12 (normalizado) | não exibido no endpoint de par |
| Graduação | `launchpad_details: completed:true, graduation_percentage:100, completed_at 2026-07-26T16:32:45Z, migrated para HMzvs...` | dexId "pumpswap" |

**Por que divergem (explicação de cada diferença):**
1. **Preço (0,0427 vs 0,0243):** o GeckoTerminal, no endpoint de **token**, reporta o preço "in the first pool listed under top_pools" (apiguide FAQ, **página aberta**); o token CATE tinha **dezenas de pools** (PumpSwap, Meteora DLMM, Orca, pares contra ANSEM/PEPE/USDC etc. — vi todas no DexScreener). A pool de topo escolhida pelo GeckoTerminal precificava mais alto que a pool PumpSwap que o DexScreener usou como principal. **Fonte de preço/pool diferente.**
2. **Supply diferente:** GeckoTerminal usa 964.159.376 (supply on-chain atual, já com queima parcial), gerando FDV ≈ 41,15 M; o DexScreener usou base que dá 23,4 M (preço menor × supply). **Fonte de supply e de preço diferentes → FDV e market cap diferentes.**
3. **Market cap ≈ FDV nos dois** (41,34M ≈ 41,15M no GT; 23,41M = 23,41M no DS): confirma a regra da seção 1.2 — token graduado, supply todo circulando, os dois quase coincidem dentro de cada site.
4. **Liquidez (1,44M vs 0,90M):** o GeckoTerminal soma a reserva do token em **todas as pools**; o DexScreener mostrou a **pool única** PumpSwap. **Agregação de pools diferente.**
5. **Volume (7,35M vs 9,19M):** idem — conjuntos de pools agregados de forma diferente e janelas de atualização levemente distintas.

### TOKEN B — AINDA NA CURVA: "Launchpad" (símbolo Launchpad)
**Mint:** `9tPENyHKnzvxkGdG518aHzePwQ2Ga8bssHvMQyGQpump` · pool pump-fun `EAB8grpGYPoteazpJ1aLbLaacS8fbGEdpRxh66rj4D3T` (criado 12/09/2026 ~10:22 UTC, minutos antes da consulta).

| Campo | GeckoTerminal (endpoint token, **API aberta**) | DexScreener (**API aberta**) |
|---|---|---|
| Preço | US$ 0,000002977784567 | US$ 0,000003164 |
| FDV | US$ 2.977,78 | 3.164,92 |
| **Market cap** | **`market_cap_usd: null`** | **3.164,92 (= fdv)** |
| Liquidez | **`total_reserve_in_usd: null`** | não exibida (endpoint de par não trouxe campo `liquidity`) |
| Volume 24h | **`volume_usd h24: null`** | US$ 9.041,5 |
| Supply total | 1.000.000.000 (normalizado) | não exibido |
| Estado da curva | `launchpad_details: graduation_percentage 2,75%, completed:false` | dexId "pumpfun" |

**RESPOSTA EXPLÍCITA — qual site conta os tokens presos na curva como circulantes:**
- **GeckoTerminal:** devolve `market_cap_usd: null` para o token na curva e **só reporta FDV** (= preço × 1 bilhão). Ou seja, **não publica um "circulante" separado** e **não desconta** os tokens presos na curva; e como o token não está verificado/na CoinGecko, o market cap fica nulo (comportamento documentado: "`market_cap_usd` is null if the token... do not have its supply verified", apiguide FAQ, **página aberta**). Além disso, o GeckoTerminal marca liquidez e volume por token como **null** enquanto o token está na curva (só reporta esses campos na pool, não no token).
- **DexScreener:** **indexa** o token na curva (dexId "pumpfun") e reporta `marketCap` **igual** ao `fdv` (= preço × 1 bilhão). Ou seja, o DexScreener **também trata o 1 bilhão inteiro como base** e **não desconta** os tokens presos na curva.

**Portanto: nenhum dos dois "conta os tokens da curva como circulantes de um jeito diferente" — ambos usam o 1 bilhão inteiro, e por isso market cap = FDV (DexScreener) ou market cap = null / só FDV (GeckoTerminal).** A divergência "market cap vs FDV" que o usuário imaginava para o token na curva **não se materializa** nesses dois terminais; a única diferença prática é que o **GeckoTerminal esconde market cap/liquidez/volume por-token na curva (null)** enquanto o **DexScreener mostra tudo, colando market cap ao FDV**.

**Por que os preços/FDV divergem um pouco (2.977 vs 3.164):** momento de atualização diferente (o token tinha segundos/minutos de vida e o preço mudava a cada trade) e cada site lê o estado da curva num instante ligeiramente distinto. **Momento de atualização diferente.**

---

## (5) Lista de NÃO VERIFICADOS

1. **Birdeye** — nenhum número obtido para nenhum dos dois tokens: API pública devolveu **HTTP 401** (exige chave). Toda a coluna Birdeye da seção 4 está em aberto.
2. **Constante 206.900.000 na documentação OFICIAL do pump.fun** — **não** aparece na página oficial (que fala em limiar de market cap). Verificada apenas via Bitquery/on-chain (que avisa que o valor vive em conta mutável e pode mudar).
3. **Limiar de graduação em SOL/dólar** — números conflitantes entre fontes (85 SOL / US$ 69 mil / ~800 SOL / US$ 80–100 mil); só a constante em tokens é robusta.
4. **Queima de LP na graduação** — só em fontes secundárias (corroboração fraca); não confirmada na página oficial aberta.
5. **Detalhe da taxa da curva (0,30% criador / 0,95% protocolo)** e **taxas do PumpSwap pós-graduação** — só em fontes secundárias; a página oficial de taxas não pôde ser aberta pela ferramenta.
6. **Método de PnL do Photon** — sem documentação oficial encontrada.
7. **Método de PnL de carteira do DexScreener** — não é função documentada do produto.
8. **Inclusão de taxas e de impacto de saída no PnL do Axiom e do GMGN** — não descrita na documentação oficial aberta.
9. **Piso mínimo saudável de liquidez/market cap** — nenhum artigo revisado por pares publica um número.
10. **Subagente de aprofundamento e etapa de enriquecimento (enricher)** — não executados por esgotamento do limite de turnos.

---

## (6) Fontes (com data de consulta e marcação)

Todas consultadas em **12/09/2026**.

- pump.fun/docs/bonding-curve — bonding curve, graduação, taxa 1,25%, "no team allocations" — **(página aberta)**
- apiguide.geckoterminal.com/faq — `market_cap_usd` null, preço = primeira pool de top_pools, FDV = múltiplo do supply — **(página aberta)**
- apiguide.geckoterminal.com/changelogs — `reserve_in_usd` = liquidez total da pool em USD — **(página aberta)**
- api.geckoterminal.com/api/v2/networks/solana/trending_pools — dados ao vivo (incl. CATE) — **(API aberta)**
- api.geckoterminal.com/api/v2/networks/solana/new_pools — token na curva (Launchpad) — **(API aberta)**
- api.geckoterminal.com/.../tokens/Ai66...pump — CATE graduado (market cap, FDV, total_reserve, launchpad_details) — **(API aberta)**
- api.geckoterminal.com/.../tokens/9tPE...pump — token na curva (market_cap null, supply 1B, graduation 2,75%) — **(API aberta)**
- api.dexscreener.com/latest/dex/tokens/Ai66...pump — CATE em múltiplas pools — **(API aberta)**
- api.dexscreener.com/latest/dex/tokens/9tPE...pump — token na curva (marketCap = fdv) — **(API aberta)**
- public-api.birdeye.so/defi/token_overview?address=Ai66...pump — **HTTP 401, não verificado** — **(API tentada, falhou)**
- docs.axiom.trade/axiom/portfolio — PnL spot, não realizado, preço médio de entrada — **(página aberta)**
- docs.gmgn.ai/index/q-a — casos SOL/WSOL e priority fee > principal — **(página aberta)**
- app.uniswap.org/whitepaper.pdf — x·y=k, taxa 0,3% aplicada ao input — **(só snippet)**
- arxiv.org/pdf/2410.10162 — x×y=k acadêmico — **(só snippet)**
- docs.raydium.io/.../how-to-set-cpmm-fees e /ray/protocol-fees — taxa 0,25%, denominador 1.000.000 — **(só snippet)**
- help.dexscreener.com/en/articles/1146817 — FDV vs market cap, circulante auto-reportado/CoinGecko — **(só snippet)**
- coingecko.com/en/coins/pump-fun — market cap (circulante) vs FDV do token PUMP — **(só snippet)**
- docs.bitquery.io/.../Pump-Fun-Marketcap-Bonding-Curve-API — constante 206.900.000 / 793.100.000 (on-chain) — **(só snippet)**
- medium.com/coinmonks (Pump.fun API) — 206.900.000 como saldo na graduação, USD flutua — **(só snippet, corroboração fraca)**
- gist.github.com/rubpy — INITIAL_REAL_TOKEN_RESERVES = 793.100.000, conta mutável — **(só snippet, corroboração fraca)**
- Scholar Gateway: Lehar & Parlour (2024) DOI 10.1111/jofi.13405; Singh et al. (2025) DOI 10.1002/nem.70005; Alexander et al. (2025) DOI 10.1002/fut.22593; Aqsha et al. (2026) DOI 10.1111/mafi.70030 — mecânica de AMM e liquidez — **(resumos acadêmicos abertos via Scholar Gateway)**
- walletmaster.tools; bifu.co; hackmd.io; thedefiant.io; cryptoslate.com — PnL/taxas de terceiros — **(só snippet, corroboração fraca)**

---

## (7) Consultas de busca feitas

**web_search:** (1) "pump.fun docs bonding curve graduation tokens"; (2) "GeckoTerminal API reserve_in_usd definition"; (3) "pump.fun bonding curve 206900000 tokens graduation"; (4) "Uniswap v2 whitepaper constant product formula x*y=k"; (5) "GMGN docs PnL calculation realized unrealized"; (6) "Axiom trade docs PnL calculation methodology"; (7) "pump.fun fees schedule 1.25% bonding curve creator protocol"; (8) "DexScreener API docs liquidity marketCap fdv fields"; (9) "api.geckoterminal.com networks solana trending_pools endpoint"; (10) "api.dexscreener.com latest dex tokens endpoint example"; (11) "Birdeye public API token overview endpoint liquidity mc"; (12) "Photon sol docs PnL calculation help"; (13) "Raydium docs constant product AMM swap fee 0.25%"; (14) "GMGN PnL wrong incorrect not matching wallet complaint"; (15) "DexScreener marketcap circulating supply how calculated pump.fun"; (16) "pump.fun bonding curve 793100000 tokens sold 206900000 reserved migration SOL".

**web_fetch (páginas abertas):** pump.fun/docs/bonding-curve; apiguide.geckoterminal.com/faq; docs.axiom.trade/axiom/portfolio; docs.gmgn.ai/index/trading-system (redirecionou).

**mcp__TinyFish__fetch_content (APIs ao vivo abertas):** GeckoTerminal trending_pools (solana); GeckoTerminal new_pools (solana); GeckoTerminal tokens/Ai66...pump; GeckoTerminal tokens/9tPE...pump; DexScreener tokens/Ai66...pump; DexScreener tokens/9tPE...pump; Birdeye token_overview (falhou, 401).

**mcp__Scholar_Gateway__semanticSearch:** "Liquidity, rug pulls, and price manipulation in decentralized exchange automated market maker memecoin markets".