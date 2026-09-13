# Ler a tela — Módulo: O que os números de um terminal de memecoin escondem

**Levantamento factual — português do Brasil, referência 12/09/2026. Rede principal: Solana (pump.fun / PumpSwap); EVM como comparação.**

> Nota de leitura: todo termo técnico é explicado na primeira vez em que aparece. "Revisado por pares" = passou por avaliação de outros pesquisadores antes de publicar. "Preprint" = versão pública antes da revisão (ex.: arXiv). "Relatório de empresa" = publicação de firma privada (ex.: Chainalysis, Kaiko). "Autopublicado" = blog, thread ou site de vendedor, sem revisão. "(página aberta)" = abri a página inteira; "(só snippet)" = só vi o resumo do buscador.

---

## TL;DR

- **Fabricar volume numa DEX de Solana é barato, e os números públicos são desenhados para enganar você.** Wash trading (negociar consigo mesmo para inflar volume) custa de verdade em Solana — cada swap paga taxa de pool e de rede — mas o custo total fica na casa de **US$ 2.000–4.000 por dia** para uma campanha de US$ 200 mil de volume, segundo o vendedor OpenLiquid; a taxa de rede da Solana em si é irrisória (0,000005 SOL por assinatura). O incentivo é claro: volume alto compra posição em "trending" e visibilidade.
- **O princípio central do seu módulo está confirmado por evidência direta: todo sinal público é otimizado contra.** O vendedor de bot de volume OpenLiquid publica que distribui o volume em "mais de 100 carteiras" justamente porque "US$ 300 mil de volume com apenas 50 carteiras únicas é imediatamente suspeito". A razão volume ÷ carteiras únicas, o buy/sell equilibrado, a contagem de makers — todos são alvos deliberados de contorno.
- **Com ferramenta gratuita você detecta os sinais grosseiros, mas NÃO reproduz por completo o filtro acadêmico do Midsummer.** DexScreener/GeckoTerminal/Solscan mostram de graça volume 24h, variação de preço, makers e a lista de trades com endereço. Dá para aproximar "+500% de volume com preço quase parado". Mas o "volume circular ≥99%" (mesma carteira comprando e vendendo no mesmo dia, medido sobre TODO o volume diário) exige cruzar endereço por endereço — inviável na mão para um token ativo sem API/consulta paga.

---

## Parte 1 — A mecânica do wash trading e o custo em SOL por milhão de dólares fabricado

### 1.1 O que é wash trading numa DEX de Solana, passo a passo

**Wash trading** = negociar um ativo consigo mesmo (ou entre carteiras que você controla) para criar a ilusão de atividade, sem mudar sua posição líquida. Numa **DEX** (exchange descentralizada, sem intermediário; as trocas são feitas por um contrato inteligente) do tipo **AMM** (*automated market maker* — "formador de mercado automático": não há livro de ofertas; você troca contra uma "pool", um reservatório de dois ativos, e o preço sai da razão entre eles pela fórmula x·y=k), o passo a passo é:

1. O operador cria várias carteiras e as financia a partir de uma fonte comum.
2. A carteira A compra o token (troca SOL por Token X) contra a pool.
3. Minutos depois, a carteira B vende quantidade parecida (troca Token X por SOL) contra a mesma pool.
4. Cada swap aparece no DexScreener/GeckoTerminal como uma transação independente, somando "volume", mas a posição líquida do grupo quase não muda.

Diferença essencial em relação a uma **CEX** (exchange centralizada, com livro de ofertas e uma empresa no meio): na CEX a corretora pode "imprimir" um trade casando duas ordens suas a preço combinado, com **impacto econômico zero**; na DEX/AMM **cada swap é uma transação on-chain real** que paga taxa de rede, paga taxa da pool aos provedores de liquidez, move o preço da pool (**slippage** = a diferença entre o preço esperado e o obtido, porque o próprio trade move a curva) e fica registrado publicamente. Fonte de vendedor, mas coerente com a literatura: OpenLiquid, "Wash Trading in Crypto" (https://openliquid.io/blog/wash-trading-crypto-explained/, autopublicado/vendedor, página aberta, consulta 12/09/2026).

### 1.2 Decomposição do custo (por US$ 1 milhão de volume fabricado em Solana)

Componentes, cada um com fonte e data:

- **Taxa de transação base da Solana:** 0,000005 SOL (5.000 lamports; "lamport" = a menor unidade de SOL, um bilionésimo) por assinatura, fixa pelo protocolo, cobrada mesmo se a transação falhar; metade é queimada, metade vai ao validador. Fonte primária: Solana Docs, "Fees" (https://solana.com/docs/core/fees, página aberta, 12/09/2026). Em termos práticos: mesmo com dezenas de milhares de swaps, a taxa base soma poucos dólares.
- **Priority fee (taxa de prioridade):** opcional, em micro-lamports por unidade de computação (CU), para furar fila em congestionamento. Segundo a empresa de infraestrutura Helius, priority fees da ordem de **1.000–50.000 micro-lamports/CU** costumam bastar em condições normais, subindo para 100.000–1.000.000+ em congestionamento (https://www.helius.dev/blog/priority-fees-understanding-solanas-transaction-fee-mechanics, relatório de empresa de infraestrutura, só snippet, 12/09/2026). Fórmula oficial: priority fee = ceil(compute_unit_price × compute_unit_limit / 1.000.000) lamports (Solana Docs, página aberta).
- **Taxa da pool/LP:** no **PumpSwap** (a DEX própria da pump.fun, para onde os tokens migram após a curva) a taxa é **0,25% por trade** (0,20% para os provedores de liquidez, 0,05% para o protocolo), modelo AMM x·y=k igual ao Uniswap v2 / Raydium v4. Durante a fase de **bonding curve** (curva de emissão: o preço sobe conforme se compra, antes de migrar para a DEX) a pump.fun cobra **1,25% de taxa total de trade**, dividida entre o criador do token e o protocolo (Pump.fun Docs, "Bonding curve": *"The bonding curve charges a 1.25% total trading fee, split between the coin's creator and the protocol"*, https://pump.fun/docs/bonding-curve, documentação oficial). Fontes da taxa PumpSwap: KuCoin (https://www.kucoin.com/news/articles/pump-fun-debuts-pumpswap-dex-with-0-25-fee-structure-and-zero-sol-migration-fee-to-reclaim-solana-s-memecoin-market, relatório de exchange, página aberta) e Blocmates citando o anúncio oficial da pump.fun de 20/03/2025 (https://www.blocmates.com/news-posts/pump-fun-introduces-pumpswap-a-new-dex-for-graduated-token-listings, mídia, página aberta), ambos 12/09/2026. O **Raydium AMM v4** cobra **0,25% por swap**, dividida em 0,22% para os provedores de liquidez (0,25% × 88%) e 0,03% para recompra de RAY (0,25% × 12%) — Raydium Docs, "Protocol fees" (https://docs.raydium.io/ray/protocol-fees, documentação oficial). **NÃO VERIFICADO nesta consulta:** a taxa exata atual de cada pool Meteora (DLMM/DAMM) por par — Meteora usa taxa dinâmica que varia por pool, não confirmei um número único.
- **Slippage:** custo embutido porque cada swap move a curva; quanto mais fina a pool, maior. Não é uma taxa fixa; é uma perda por impacto de preço. (Conceito confirmado em OpenLiquid e na literatura AMM; sem número único.)
- **Taxa do serviço de bot de volume:** OpenLiquid anuncia **1% de taxa fixa** sobre o volume, sem assinatura (https://openliquid.io/blog/trending-dexscreener-volume-thresholds/, vendedor, página aberta, 12/09/2026).

**Números anunciados pelo vendedor (corroboração fraca, marcada como vendedor):** OpenLiquid diz que uma campanha de **US$ 200 mil de volume em Solana custa ~US$ 2.000–4.000 no total** (1% de taxa + gas desprezível), contra US$ 5.000–15.000 no Ethereum pelo mesmo volume; e que "na Solana o gas é abaixo de US$ 0,01 por transação, então o mesmo volume custa quase nada em gas". Extrapolando o número do vendedor, **~US$ 10 mil–20 mil por US$ 1 milhão de volume fabricado em Solana** (dominado pela taxa de 1% do serviço + taxa de pool de 0,25%; a taxa de rede é ruído). *Fonte de vendedor; trate como ordem de grandeza, não como medição independente.*

### 1.3 Por que alguém faz isso: o que o volume alto compra

O incentivo concreto é **visibilidade paga por ranking**, que atrai compradores reais:

- **Trending do DexScreener.** A documentação oficial confirma que **Boosts** são um produto pago que aumenta temporariamente o *Trending Score* e dá o "Golden Ticker", mas duram 12–24h e dependem de elegibilidade (https://docs.dexscreener.com/boosting, documentação oficial, página aberta, 12/09/2026). O DexScreener **não publica os parâmetros exatos do algoritmo de trending** — os limiares que circulam são observação de comunidade. O vendedor OpenLiquid resume o ranking como multifatorial: volume 24h + nº de transações + carteiras únicas + liquidez + velocidade de variação (https://openliquid.io/guides/trending-dexscreener/, vendedor, página aberta).
- **"Graduação" na pump.fun.** Um token "gradua" quando a reserva da bonding curve atinge o limiar (~**85 SOL** de reserva real, correspondendo a um market cap de cerca de **US$ 69.000**) e migra para a PumpSwap. Fonte revisável: arXiv 2602.14860v1, "Predicting the success of new crypto-tokens: the Pump.fun case" (*"this threshold corresponds to approximately 85 SOL raised and a market capitalization of about $69,000"*; e *"only a very small fraction of tokens reach graduation"*, preprint). Volume e velocidade de preenchimento da curva sinalizam "coordenação".
- **Listagens em agregadores.** CoinGecko/CoinMarketCap exigem critérios mais estritos (site funcional, listagem em exchanges integradas); DexScreener e CoinSniper indexam quase imediatamente. Fonte: Midsummer, seção 3.1.2 (arXiv 2507.01963v2, revisado por pares — USENIX Security '26, página aberta, 12/09/2026).
- **O que os vendedores dizem que o volume compra:** OpenLiquid afirma que "chegar ao trending aumenta credibilidade, contagem de novos holders e momentum de mercado" e que por isso distribui trades em muitas carteiras para "bater" com o volume. (Vendedor, página aberta.)

---

## Parte 2 — Heurísticas PUBLICADAS de detecção (com "contornada de propósito?")

Uma **heurística** = regra prática de detecção. A coluna final aplica o ajuste 1 do escopo: para cada regra, se há evidência de contorno deliberado e como.

| # | Heurística (o que mede) | Limiar publicado | Falso positivo declarado | Tipo de fonte | Contornada de propósito? Como? |
|---|---|---|---|---|---|
| 1 | **Zero-risk position** (Midsummer): makers que compraram e venderam quantidade quase idêntica do mesmo token no mesmo dia | tolerância de **2%** entre volume de compra e venda | Não declarado numericamente | Revisado por pares (USENIX Sec '26) | **Sim, parcialmente.** OpenLiquid diz variar tamanho e intervalo dos trades e fazer "algumas carteiras só comprarem (nunca vender)" para simular holder — o que quebra a simetria compra=venda por carteira. (Vendedor) |
| 2 | **Circular volume** (Midsummer): % do volume diário gerado por makers que compraram E venderam no mesmo dia | **≥ 99%** do volume diário | Não declarado | Revisado por pares | **Sim.** Diluir o volume em 100+ carteiras e misturar com fluxo real reduz a fração "circular" abaixo de 99%. OpenLiquid publica exatamente essa distribuição. (Vendedor) |
| 3 | **Filtro inicial de anomalia** (Midsummer): volume dispara mas preço quase não anda | volume **> 500%** vs. dia anterior **com** variação de preço **< 5%** | Não declarado | Revisado por pares | **Sim, indiretamente.** OpenLiquid recomenda razão buy/sell de 55/45–60/40 para gerar leve pressão de alta — ou seja, mover o preço de propósito para não cair no "preço parado". (Vendedor) |
| 4 | **Grafo de componentes fortemente conectados / volume matching** (Victor & Weintraud): ciclos de trades que retornam a posição ao ponto inicial | SCCs com **≥ 100 ocorrências**; margem de **1%** do volume médio para "posição inalterada"; janelas de 1h, 1 dia, 1 semana | Não declarado como taxa; método valida por definição legal | Revisado por pares (WWW '21) | **Sim.** Usar carteiras novas a cada campanha e evitar que as mesmas se repitam ≥100× frustra a formação de SCCs recorrentes. OpenLiquid descreve rotação de carteiras "frescas por campanha". (Vendedor) |
| 5 | **Testes estatísticos de tamanho de trade** (Cong et al.): lei de Benford no 1º dígito, arredondamento, cauda power-law | Desvio significativo (p<0,01 típico) | Não é taxa de FP; é teste estatístico | Revisado por pares (Management Science, CEX) | **Sim.** OpenLiquid diz "randomizar cada parâmetro para imitar atividade orgânica", incluindo tamanhos de trade — exatamente o alvo dos testes de Benford/arredondamento. (Vendedor) |
| 6 | **Bundle: mesma transação (in-transaction)** (MemeTrans/MELT): múltiplos endereços comprando no mesmo swap atômico | Presença do padrão | Não declarado | Preprint (arXiv, não revisado) | **Parcialmente contornável** distribuindo as compras em transações separadas dentro do mesmo bloco (o que o próprio paper nota que ferramentas ingênuas perdem). |
| 7 | **Bundle: mesmo financiador (fund-flow)** (MemeTrans/MELT): contas custeadas pelo mesmo endereço | Presença; exclui financiador que é CEX | Reconhece FP de saque de CEX | Preprint | **Parcialmente.** Usar CEX ou cadeias de financiamento intermediárias quebra o vínculo direto de funder. |
| 8 | **Bundle: mesmo Jito bundle ID** (MemeTrans/MELT): transações no mesmo bundle atômico do Jito | Presença | Nota FP: carteiras não relacionadas no mesmo slot | Preprint | **Parcialmente.** Enviar compras fora do Jito (mempool normal, em blocos distintos) evita o bundle ID compartilhado. |
| 9 | **Razão volume ÷ carteiras únicas** (regra de bolso) | **Sem limiar publicado** (ver Parte 4) | — | Autopublicado/vendedor | **Sim, e é o exemplo mais explícito** (ver Parte 3). |

**Onde NÃO há evidência de contorno deliberado (declarado explicitamente):** para a heurística de **bundle via Jito bundle ID (nº 8)** e **fund-flow (nº 7)**, não encontrei um vendedor anunciando "removemos o Jito bundle ID" ou "quebramos o rastro de funder" como recurso de produto — o contorno é dedutível da mecânica, mas **não achei fonte de vendedor afirmando fazê-lo de propósito** nesta consulta. Marque como **contorno plausível, não documentado por vendedor (NÃO VERIFICADO como recurso anunciado)**.

---

## Parte 3 — Seção própria: "Todo sinal público é otimizado contra" (o caso OpenLiquid)

Este é o coração conceitual do módulo. A prova mais limpa vem de quem **vende** a fabricação de volume.

**O que a OpenLiquid publica (vendedor de bot de volume; https://openliquid.io/blog/trending-dexscreener-volume-thresholds/ e /wash-trading-crypto-explained/, páginas abertas, 12/09/2026):**

- **A razão volume/carteiras é vigiada — e por isso é contornada.** Texto literal: *"Um token com US$ 300.000 de volume mas apenas 50 carteiras únicas é imediatamente suspeito. A distribuição da OpenLiquid em mais de 100 carteiras garante que a contagem de traders únicos se alinhe ao nível de volume."* Ou seja: eles sabem que você olha a razão, então fabricam a razão.
- **A contagem de makers é um alvo.** *"O DexScreener exibe com destaque a contagem de 'makers'... uma contagem alta de makers em relação ao volume sinaliza interesse amplo."* A OpenLiquid diz gerar e gerenciar carteiras automaticamente para bater esses limiares.
- **O tamanho e o horário dos trades são randomizados** para imitar varejo ("US$ 20–200 por trade na Solana"), com "motor de timing aleatório" — mira direta nos testes de Benford/arredondamento (Cong et al.) e no padrão temporal (24/7 do bot).
- **O buy/sell é ajustado** (55/45–60/40) para criar leve alta e escapar do "preço parado".
- **As carteiras são frescas a cada campanha** e "algumas só compram, nunca vendem" — quebra a simetria de zero-risk position e os ciclos de SCC.

**Consequência para o leitor (conteúdo do módulo):** qualquer número **único** que você aprender a olhar já foi, ou pode ser, calibrado contra. Isso não torna os sinais inúteis — torna-os **sinais de triagem, não de veredito**. A defesa real é **cruzar vários sinais** (volume + makers + concentração de holders + LP travada + idade + distribuição de bundle) e desconfiar de qualquer métrica "redondinha demais".

---

## Parte 4 — O que dá para ver de graça (lista operacional, campo por campo, ferramenta por ferramenta)

Todas as ferramentas abaixo têm **leitura gratuita sem login**. Nomes de campo confirmados nas próprias páginas/docs.

### DexScreener (gratuito; https://dexscreener.com)
- **Volume** (por 5M/1H/6H/24H) — campo "Volume". Sinal: alto demais para a liquidez → suspeita.
- **Txns** → separado em **Buys / Sells** ("B / S"). Sinal: buys e sells quase iguais e simétricos = possível ciclo.
- **Makers** — nº de carteiras únicas que negociaram no período. Documentação de terceiros confirma: *"100 transações de 3 carteiras é muito diferente de 100 de 90 carteiras. Contagem baixa de makers em relação a transações é sinal de wash trading."* (CreateMyCoin, autopublicado, página aberta.)
- **Liquidity** e **MCAP/FDV** — para as razões da Parte 5.
- **Tabela de trades** (lateral/inferior): cada transação em tempo real, com carteira. É "o dado mais cru e mais revelador da página".
- **Flags de segurança inline** (GoPlus/QuickIntel/TokenSniffer) e status de **LP travada/queimada**.

### GeckoTerminal (gratuito; https://www.geckoterminal.com)
- Preço, volume, **transações buy/sell**, **compradores/vendedores únicos** (a doc da API confirma "unique buyers and sellers na última 1h e 24h") e **liquidez**.
- **Aba de trades**: "últimos 300 trades das últimas 24h de uma pool", com filtro por tamanho de trade. (Fonte: GeckoTerminal API Docs, página aberta.) Para leitura manual na tela, a aba "Trades" lista transações com o endereço do maker.
- **Bloco de segurança do token** (rolando a coluna esquerda).

### Solscan (gratuito, read-only; https://solscan.io)
- Página do **token**: supply, **nº de holders**, **top holders com % de posse**, transfers.
- Aba **DeFi Activities**: filtra **Trading (swaps), Liquidez, Staking**, por **plataforma/pool**, **intervalo de datas**, **endereço (From/To)** e **faixa de valor**. Há botão **"Visualize"** para gráficos. (Fonte: Solscan Knowledge Base, "How to Use Solscan Filters" e "Analytics Visualization", páginas abertas.)
- **Bloco de criação**: transações do bloco em que o token foi criado — útil para ver bundle de lançamento (ver Parte 8).
- Exportação **CSV** nas abas Transfers e Token/Holders.

### RugCheck (gratuito; https://rugcheck.xyz)
- Score de risco + **mint authority / freeze authority**, **concentração de holders**, **liquidez**, e campos de **bundlers** e **insiders**. (Confirma-se ser scanner gratuito sem conta; a doc de terceiros lista campos "bundler activity" e "insider concentration".) O grafo **Insider Networks** é público via API `/tokens/{id}/insiders/graph`.
- Ressalva declarada: analisa **só estrutura on-chain**; quem revoga authorities depois do posicionamento pode gerar relatório "limpo". Filtro **necessário, não suficiente**.

### Bubblemaps (visualização de clusters)
- Mapa de bolhas ligando carteiras por fluxo de fundos. Caso real: sinalizou o Rugproof quando "o criador enviou SOL para 162 carteiras que compraram 50% do supply no lançamento" (Cointelegraph via TradingView, mídia, página aberta). **NÃO VERIFICADO:** quais recursos do Bubblemaps são gratuitos vs. pagos em 2026 — não abri a página de planos nesta consulta.

### trench.bot / TrenchRadar (gratuito para pump.fun; https://trench.bot)
- **Bundle Scanner**: detecta compras coordenadas em janela curta (múltiplas carteiras no mesmo ~0,4s/bloco), mostrando **quantas carteiras**, **quanto SOL** e **quanto ainda seguram**.
- **Bubblemap Bundle Viewer**: bolhas por % de posse; clique mostra **total SOL, total tokens, carteiras únicas, % held**; distingue **"Holding" vs "Sold"**.
- Campos-chave: **"Total bundled %"** vs **"Current held %"** — a própria doc recomenda checar o *Current held*, pois um dev pode bundlar 10%, vender e recomprar, inflando o "Total" para 20% sem realmente segurar. Só cobre **tokens pump.fun** (endereço terminando em "pump").

### GMGN / Axiom / Photon / BullX (terminais)
- Extensões e terminais exibem campos **"bundle %"/"insiders"** (ex.: a extensão Qocaine injeta dados do trench.bot em bullx.io, gmgn.ai e pump.fun; limiar mínimo de 3% para sinal). **NÃO VERIFICADO campo a campo** o que é gratuito sem depósito em cada um desses terminais nesta consulta — trate como "existe o campo", não como "confirmei acesso gratuito de leitura".

---

## Parte 5 — Dá para reproduzir o filtro do Midsummer de graça? (campo por campo)

O filtro do Midsummer (arXiv 2507.01963v2, revisado por pares, página aberta) tem três peças. Resposta honesta:

**(a) Volume +500% vs. dia anterior — PARCIALMENTE, na mão.**
DexScreener e GeckoTerminal mostram volume 24h atual de graça, mas **não** dão de forma limpa e gratuita a **série histórica de volume diário** para calcular "+500% vs. ontem" com precisão. GeckoTerminal expõe **OHLCV** (candles) por pool via a aba de gráfico e via API gratuita (candle diário disponível), de onde dá para estimar volume por dia. Solscan mostra atividade por intervalo de datas. **Veredito:** dá para **aproximar** manualmente comparando o volume 24h de hoje com o de ontem, mas não é um campo pronto "variação de volume dia-a-dia".

**(b) Variação de preço < 5% no mesmo período — SIM.**
DexScreener e GeckoTerminal mostram **variação de preço por 5M/1H/6H/24H** direto na tela. Cruzar "volume disparou + preço quase parado (24h)" é **plenamente factível de graça** e é a peça mais fácil do filtro.

**(c) Volume circular ≥ 99% (mesma carteira compra e vende no mesmo dia, sobre TODO o volume diário) — NÃO, de forma prática/gratuita.**
Para afirmar que ≥99% do volume do dia veio de makers que compraram **e** venderam naquele dia, você precisa: (1) puxar **todos** os trades do dia com o endereço de cada maker, (2) agrupar por maker, (3) somar compra e venda por maker, (4) calcular a fração do volume total que vem de makers "dois-lados".
- Solscan tem a aba DeFi Activities com filtro por endereço e exportação CSV, e GeckoTerminal expõe os "últimos 300 trades das 24h" — mas para um token ativo o volume diário tem **milhares a dezenas de milhares** de trades (DexScreener mostra tokens com 90.000+ txns/dia). **Não há**, no plano gratuito, um campo "% de volume circular" nem uma forma de agregar maker-por-maker sobre o dia inteiro sem **API paga** ou script próprio.
- **Aproximação gratuita possível (triagem, não veredito):** olhar a **tabela de trades** e a razão **makers ÷ txns**; se poucas carteiras se repetem comprando e vendendo, é bandeira vermelha. Mas isso **não é** o "≥99% circular" medido do Midsummer.

**Conclusão da Parte 5:** de graça você reproduz a peça **(b)** inteira, **aproxima** a **(a)**, e **não reproduz** a **(c)** — que é justamente a que dá o veredito de wash trading. Diga isso ao leitor com todas as letras: **a métrica que fecha o diagnóstico é a que o plano gratuito não entrega.**

---

## Parte 6 — Limiares para volume ÷ liquidez e volume ÷ market cap: publicado com método, ou "não há"

**Pergunta:** existe limiar **publicado, com método e taxa de falso positivo**, para essas razões?

**Resposta: NÃO há limiar acadêmico revisado por pares com método e taxa de falso positivo declarada para "volume/liquidez" ou "volume/market cap" como detector de wash trading em DEX de Solana.** O que existe:

- **Kaiko** (provedor de dados, relatório de empresa) descreve conceitualmente a "volume-to-liquidity ratio": *"se o volume em USD excede substancialmente a profundidade dos livros (razão volume/profundidade alta), sugere possível wash trading"* — **sem número de corte nem taxa de FP** (https://docs.kaiko.com/getting-started/kaiko-examples/identify-wash-trading-and-volume-quality, página aberta). É orientado a CEX (profundidade de order book), não a AMM.
- **Regras de bolso de blog (autopublicado, NÃO são limiar publicado com método):** OpenLiquid cita "razão 50:1 de volume para liquidez é quase certamente wash trading" (vendedor); Coinbureau sugere "turnover saudável de 5–10% do market cap; abaixo de 1% é bandeira de atividade fina" e "volume/TVL acima de 10% ao dia = mercado ativo" (autopublicado). São heurísticas de comunidade, **sem validação nem taxa de erro**.
- **OECD (2024)** usa "US$ 100 mi de volume" só como corte de **tamanho de pool** para amostragem, não como detector de manipulação.

**Veredito:** para volume/liquidez e volume/market cap, a resposta correta ao módulo é **"não há limiar publicado com método e taxa de falso positivo"** — apenas regras de bolso. Use como triagem, deixando explícito que não são medições validadas.

---

## Parte 7 — Cong et al.: o que é CEX e NÃO se transfere para DEX

**Cong, Li, Tang & Yang, "Crypto Wash Trading", Management Science 69(11):6427–6454, 2023** (revisado por pares; DOI 10.1287/mnsc.2021.02709; também NBER WP 30783; páginas abertas, 12/09/2026). Método: testes estatísticos sobre **29 exchanges centralizadas** — distribuição do 1º dígito significativo (**lei de Benford**: em dados naturais, o dígito 1 aparece ~30% das vezes, o 9 ~5%; desvio sugere números fabricados), **arredondamento** de tamanho de trade, e **cauda** da distribuição (power law / Pareto-Lévy). Resultado central: **exchanges não reguladas inflam, em média, mais de 70% do volume reportado** — trilhões de dólares/ano — e isso melhora seu ranking.

**O que NÃO se transfere para DEX/AMM em Solana (deixar escrito):**
- **Custo e contraparte.** Na CEX a exchange fabrica trades **sem custo on-chain e sem contraparte real** (casa duas ordens internas). Na DEX/AMM **cada swap paga taxa de rede + taxa de pool, move o preço da pool e fica on-chain** — não há "impressão" gratuita. Isso muda a economia e as assinaturas estatísticas.
- **Calibração dos testes.** Benford/arredondamento/cauda foram calibrados em **dados de trade de CEX**. Victor & Weintraud (WWW '21, revisado por pares; arXiv 2102.07001, página aberta) afirmam explicitamente que **distribuições de tamanho de trade são "de pouca utilidade" para detectar wash trading em DEX**, e propõem, no lugar, **análise em nível de conta** (grafo de transações, ciclos que não mudam a posição). Ou seja, o método de Cong et al. **não é o método certo para DEX**.
- **Quem fabrica.** Em CEX, muitas vezes é **a própria exchange** inflando para subir no ranking. Em DEX, não há exchange central; são **traders/criadores** operando carteiras — daí a análise por conta.

**Trabalho que aplicou testes tipo-Cong a DEX:** Victor & Weintraud testaram e **descartaram** a utilidade das distribuições de tamanho em DEX (é o achado relevante). Midsummer (DEX, revisado por pares) também **não usa** Benford; usa zero-risk position e circular volume em nível de conta. **NÃO VERIFICADO:** um paper que tenha aplicado Benford/arredondamento a swaps de AMM de Solana com sucesso — não encontrei nesta consulta.

Manter Cong et al. no documento é correto **como referência de CEX** e como origem histórica dos testes estatísticos — mas com a etiqueta clara de que **é CEX e a maior parte não se transfere para DEX de Solana.**

---

## Parte 8 — Bundles: mecanismo (Jito), detecção gratuita e a nuance sobre uso legítimo

### 8.1 O que é um bundle e o papel do Jito

Um **bundle** ("pacote") no Jito é **um grupo de até 5 transações Solana executadas em sequência e de forma atômica no mesmo bloco/slot** — ou todas entram, exatamente na ordem enviada, ou nenhuma entra ("tudo-ou-nada"). Fonte primária: Jito Labs Docs (https://docs.jito.wtf/lowlatencytxnsend/, documentação oficial, página aberta, 12/09/2026) e QuickNode (https://www.quicknode.com/guides/solana-development/transactions/jito-bundles, relatório de empresa, página aberta).

Mecânica confirmada:
- As transações vão ao **Block Engine** (motor de blocos) do Jito, **fora do mempool público**, são simuladas e competem num **leilão selado** por bloco.
- O **Jito tip** ("gorjeta") é um pagamento em SOL (mínimo 1.000 lamports) numa transferência incluída **na última transação do bundle**; gorjeta maior = mais prioridade. A gorjeta vai a validadores/stakers.
- Alcance do Jito na rede: segundo o Jito Q2 2026 Token Holder Report (via Blockworks), **o Jito Block Engine mantém uso em 98% do stake total**, enquanto a **família de clientes Jito (Jito-Labs + Jito-BAM) roda ~54% do stake ativo** (*"The Jito Block Engine retains usage across 98% of total stake... the Jito client family... continued to run about 54% of active stake"*, relatório de empresa/mídia especializada). Ou seja: praticamente todo o mercado de bundles passa pela infraestrutura do Jito, ainda que o cliente validador Jito rode em pouco mais da metade do stake.

**Como isso é usado no lançamento na pump.fun:** o criador monta um bundle que **cria o token e compra supply nas primeiras transações**, em várias carteiras, **no mesmo bloco** — antes de o token ficar visível ao público. Isso são os **"bundled buys"**. A execução atômica garante que o dev pegue o supply barato de uma vez.
- **Bundle de lançamento (dev/insiders)** = as compras coordenadas do próprio criador/aliados no início.
- **Sniping** = bots externos tentando comprar nos primeiros instantes; diferente do bundle do dev, embora ambos disputem o começo. (O próprio Jito comercializa "launch sniping with guards" — bundle com transação de checagem que reverte tudo se as condições mudarem.)

### 8.2 Confirmação/atualização dos números MemeTrans/MELT

**Atenção — o paper mudou de nome entre versões:** arXiv **2602.13480 v1 = "MemeTrans"** (13/02/2026); **v2 = "MELT: A Behavioral Trace Dataset for High-Risk Memecoin Launch Detection"** (21/05/2026). Autores: Sihao Hu, Selim Furkan Tekin, Yichang Xu, Ling Liu (Georgia Tech). **Preprint (cs.CR), sem venue revisado por pares declarado.** Cobre **41.470** memecoins que migraram na pump.fun (dez/2024–mar/2025) e ~218 milhões de transações (30,8M pré-migração; 187,7M pós-migração).

Números confirmados (páginas abertas, 12/09/2026):
- **Bundle Holder Ratio (proporção de contas holders que são bundled) = 28,13%** e **Bundle Holding % (fração do supply total em contas bundled) = 36,50%** — **são métricas diferentes da mesma linha "All" da Tabela 4 (v1)/Tabela 3 (v2)**, não números conflitantes. Literal (v2): *"36,5% do supply total é mantido por contas bundled no ponto de migração"*. A % de supply (36,5) supera a % de holders (28,13) porque contas bundled seguram mais tokens por conta.
- **Três heurísticas de bundle** confirmadas: (1) **compra multi-conta na mesma transação** (atômica; requer as chaves privadas de todas as contas participantes); (2) **relação de fluxo de fundos** (mesmo financiador; exclui financiador que é CEX, pois representa saque de usuário); (3) **mesmo Jito bundle ID** (rastreado via Jito Explorer).
- **% de memecoins migrados classificados "alto risco" = 84,13%** (Tabela 8 v1 / Tabela 6 v2). O número **82,44%** que circula é um **erro de texto na v1**, corrigido na v2 para 84,13%. Regra de rótulo (v2, anotação manual): alto risco se dispara `min_price_ratio < 0,3` **ou** é manipulado; baixo risco só se `min_price_ratio ≥ 0,7` **e** não manipulado; médio, caso contrário. (`min_price_ratio` = menor preço nos ~20 min após a migração, normalizado pelo preço de migração.)
- **Correlação bundle × desfecho:** após juntar contas bundled, a fatia dos **top-10 holders sobe +24 pontos percentuais para tokens de alto risco**, contra apenas **+6 pontos para baixo risco** — ou seja, bundle esconde concentração muito mais em tokens ruins. As **estatísticas de bundle (Grupo 4)** estão entre as features **mais importantes** do modelo (ablação: remover o Grupo 4 derruba o AUPRC mais que remover a concentração de holders "de superfície" do Grupo 2; a feature mais importante no geral é o Grupo 3, atividade de mercado). O **impacto prático**: a v1 relata **redução de 56,1% na perda simulada** ao usar o modelo para escolher os "top 100" tokens (perda de 26,6% vs. 60,7% aleatório); a v2 reformula como "−34 pontos percentuais".

### 8.3 Como um iniciante detecta bundle depois do fato (gratuito, nome do campo)

- **trench.bot / TrenchRadar** (grátis, só pump.fun): **Bundle Scanner** → "quantas carteiras / quanto SOL / **Current held %**"; **Bubblemap Bundle Viewer** → bolhas com "**Holding** vs **Sold**". Método **publicado só em documentação própria (autopublicado)**, não revisado por pares. Regra de ouro da própria doc: olhe **Current held %**, não só **Total bundled %**.
- **RugCheck** (grátis): campos **"bundlers"** e **"insiders"** + concentração de holders. Método não publicado em detalhe.
- **Bubblemaps** (visual): clusters ligados por fluxo (caso Rugproof: 162 carteiras).
- **Solscan** (grátis): abra o **bloco/transação de criação** do token e veja quantas carteiras compraram no mesmo bloco; use DeFi Activities filtrando por data/pool.
- **GMGN/Axiom/BullX**: campos **"bundle %"/"insiders"** (muitas vezes puxando trench.bot). Acesso gratuito de leitura **NÃO VERIFICADO** campo a campo nesta consulta.

**Divergência entre ferramentas (importante para o leitor):** duas ferramentas dão % de bundle diferentes para o mesmo token por **escopo**: algumas leem só a transação de criação (subestimam); outras contam toda conta cujo saldo subiu, incluindo a **bonding curve** (que segura quase todo o supply → passa de 100%). Ler o bloco inteiro e filtrar contas de programa é o certo. (Fonte: solbundler.app, autopublicado, página aberta.)

### 8.4 Bundle alto é sempre má notícia? A nuance

- **Evidência de que bundle alto correlaciona com desfecho ruim:** MemeTrans/MELT (acima) — concentração escondida muito maior em tokens de alto risco; bundle entre as features mais preditivas de "alto risco". (Preprint.)
- **Uso legítimo existe, mas as fontes divergem:**
  - A **documentação do próprio trench.bot** reconhece que bundling na pump.fun "frequentemente" serve **para driblar sniper bots** ou organizar a distribuição inicial — ou seja, admite uma motivação defensiva não necessariamente fraudulenta. O Jito comercializa bundles para **proteção contra MEV/sandwich** e execução atômica legítima. (Documentação oficial/autopublicada.)
  - **Porém**, o MemeTrans/MELT **não discute uso legítimo**: trata bundling exclusivamente como tática de ocultação ("a concealment strategy that disguises the true ownership concentration"). A única nuance que o paper admite é um *falso positivo* (financiador que é CEX), não um uso benigno de bundle.
- **Síntese honesta para o módulo:** bundle **não é prova de fraude por si só** — pode ser dev protegendo o lançamento de snipers, ou distribuição planejada. O que muda o sinal é **o "Current held %"** (se as carteiras bundled já venderam tudo, o risco imediato caiu; se seguram muito, elas "são o seu gráfico") e **a combinação com outros sinais** (LP, concentração, wash trading). Bundle alto **+** supply ainda concentrado **+** volume circular = bandeira vermelha forte.

---

## Parte 9 — Confirmação/atualização dos números e trabalho novo (2025–2026)

**Confirmados nesta consulta (páginas abertas, 12/09/2026):**
- **Midsummer** (arXiv 2507.01963): **v2 de 02/01/2026**, aceito na **USENIX Security '26** (revisado por pares — confirmado no site da USENIX e na página do autor). **82,8%** dos tokens de alto retorno (>100%) com sinais de crescimento artificial: **confirmado**. Perdas: o abstract v2 consolida **US$ 9,3 milhões** em >17.000 endereços, decompostos em **US$ 3,27 mi (pump-and-dump)** e **US$ 6,04 mi (rug pulls)**: **confirmado**. Detalhe do método de wash trading: **zero-risk position (tolerância 2%)** detecta 989 manipulações / 276 tokens / 2.687 makers; **circular volume (≥99%)** detecta 219 casos / 128 tokens / 670 makers; zero-risk é a base (detecta 96,17% dos tokens suspeitos de wash trading).
- **MemeTrans/MELT** (arXiv 2602.13480): **36,5%** do supply em contas bundle e **28,13%** de bundle holder ratio: **confirmados** como métricas distintas da mesma tabela. Três heurísticas: **confirmadas**. **Preprint, não revisado por pares.**
- **Chainalysis 2025 Crypto Crime Report:** **3,59%** dos tokens lançados em 2024 com sinais do padrão (74.037 tokens) e **US$ 2,57 bilhões** de volume de negociação artificial em 2024: **confirmado** (blog Chainalysis, relatório de empresa, página aberta). **Ressalva de método:** algumas fontes secundárias descrevem esses 3,59% como "pump-and-dump", outras como "comportamento clássico de rug-pull" — a Chainalysis foca em **tokens fungíveis (ERC-20/BEP-20)** e reconhece que **bots de MEV e arbitragem compartilham características com wash trading**, dificultando a identificação. É relatório de empresa, **método não totalmente aberto**.

**Trabalho novo posterior (2025–2026) encontrado:**
- **"Catching the Rug: Early Prediction of Fraudulent Memecoins on Solana via Machine Learning"** (arXiv 2608.20271, preprint): **6,4 milhões** de tokens Solana em 7 meses; foco em previsão precoce e generalização PumpFun↔Raydium; nota degradação de desempenho entre plataformas. (Página aberta/snippet.)
- **"Resisting Manipulative Bots in Meme Coin Copy Trading"** (ACM Web Conference 2026, revisado por pares — abordagem multiagente com chain-of-thought). (Snippet.)
- **"Pump.fun Graduation Regime Windows"** (arXiv 2607.02823, preprint): survival analysis de ~860 mil lançamentos; cita **<2%** dos tokens pump.fun migram para DEX e **>12,8 milhões** de tokens emitidos até out/2025. (Snippet.)
- **"Predicting the success of new crypto-tokens: the Pump.fun case"** (arXiv 2602.14860, preprint): confirma o limiar de graduação (~85 SOL / ~US$ 69 mil) e que apenas uma fração muito pequena dos tokens gradua. (Snippet/citado pelo enricher.)
- **Yaremus et al. (2025)**, detecção de rug pulls na TON via ML (arXiv 2509.01168, preprint). (Citação secundária.)

---

## Parte 10 — Lista de NÃO VERIFICADOS

1. Taxa exata atual de cada pool **Meteora** (DLMM/DAMM) por par — Meteora usa taxa dinâmica; não confirmei número único.
2. Recursos **gratuitos vs. pagos do Bubblemaps** em 2026 — não abri a página de planos.
3. Acesso **gratuito de leitura, campo a campo**, em **GMGN, Axiom, Photon, BullX, Birdeye** — confirmei que os campos "bundle %/insiders" existem, não que a leitura é gratuita sem depósito.
4. Um **paper que tenha aplicado Benford/arredondamento/cauda (método Cong et al.) com sucesso a swaps de AMM de Solana** — não encontrado.
5. **Contorno deliberado anunciado por vendedor** especificamente para as heurísticas de **Jito bundle ID** e **fund-flow** — é plausível pela mecânica, mas não achei vendedor anunciando como recurso.
6. **Custo por US$ 1 milhão de volume** em SOL: apenas **extrapolado do número de vendedor** (OpenLiquid); não é medição independente reproduzível.
7. Parâmetros exatos do **algoritmo de trending do DexScreener** — não são públicos (confirmado pela própria doc).

---

## Parte 11 — Fontes (tipo, link, data de consulta, página aberta/snippet)

**Revisado por pares:**
- Mongardini & Mei, "A Midsummer Meme's Dream", USENIX Security '26 — arXiv 2507.01963v2, https://arxiv.org/abs/2507.01963 e /pdf/2507.01963v2 (página aberta, 12/09/2026).
- Victor & Weintraud, "Detecting and Quantifying Wash Trading on DEX", WWW '21 — arXiv 2102.07001, https://arxiv.org/pdf/2102.07001 e https://dl.acm.org/doi/fullHtml/10.1145/3442381.3449824 (página aberta, 12/09/2026).
- Cong, Li, Tang & Yang, "Crypto Wash Trading", Management Science 69(11), 2023 — DOI 10.1287/mnsc.2021.02709; NBER WP 30783, https://www.nber.org/system/files/working_papers/w30783/w30783.pdf (página aberta, 12/09/2026).
- "Resisting Manipulative Bots in Meme Coin Copy Trading", ACM Web Conference 2026 — https://dl.acm.org/doi/10.1145/3774904.3792635 (só snippet).

**Preprint (não revisado):**
- Hu, Tekin, Xu & Liu, "MemeTrans"/"MELT", arXiv 2602.13480 (v1 13/02/2026; v2 21/05/2026), https://arxiv.org/html/2602.13480v1 e https://www.arxiv.org/pdf/2602.13480 (página aberta, 12/09/2026).
- "Catching the Rug", arXiv 2608.20271, https://arxiv.org/html/2608.20271v1 (página aberta/snippet).
- "Pump.fun Graduation Regime Windows", arXiv 2607.02823 (snippet).
- "Predicting the success of new crypto-tokens: the Pump.fun case", arXiv 2602.14860 (snippet).

**Relatório de empresa / documentação oficial:**
- Chainalysis, "Crypto Market Manipulation 2025", https://www.chainalysis.com/blog/crypto-market-manipulation-wash-trading-pump-and-dump-2025/ (página aberta).
- Solana Docs, "Fees", https://solana.com/docs/core/fees (página aberta).
- Pump.fun Docs, "Bonding curve" (taxa 1,25%), https://pump.fun/docs/bonding-curve (documentação oficial).
- Raydium Docs, "Protocol fees" (0,25% swap; 0,22% LP + 0,03% recompra RAY), https://docs.raydium.io/ray/protocol-fees (documentação oficial).
- Jito Labs Docs, https://docs.jito.wtf/lowlatencytxnsend/ (página aberta); QuickNode, https://www.quicknode.com/guides/solana-development/transactions/jito-bundles (página aberta); Jito Q2 2026 Token Holder Report via Blockworks (98% do stake usa o Block Engine; ~54% roda o cliente Jito).
- Helius, "Priority Fees", https://www.helius.dev/blog/priority-fees-understanding-solanas-transaction-fee-mechanics (relatório de empresa, snippet).
- DexScreener Docs, "Boosting", https://docs.dexscreener.com/boosting (página aberta).
- GeckoTerminal API Docs, https://apiguide.geckoterminal.com/ (página aberta); Solscan Knowledge Base, https://info.solscan.io/ (página aberta).
- Kaiko, "Identify wash trading and volume quality", https://docs.kaiko.com/getting-started/kaiko-examples/identify-wash-trading-and-volume-quality (página aberta).
- KuCoin / Blocmates sobre taxa PumpSwap 0,25% (páginas abertas).

**Autopublicado / vendedor (corroboração fraca, marcada):**
- OpenLiquid (vendedor de bot de volume): /blog/trending-dexscreener-volume-thresholds/, /blog/wash-trading-crypto-explained/, /blog/solana-transaction-fees-explained/, /guides/trending-dexscreener/ (páginas abertas).
- trench.bot docs (autopublicado), https://docs.trench.bot/ (página aberta).
- solbundler.app, createmycoin.app, moonhydra.com, coinbureau.com (autopublicado, páginas abertas/snippet).
- Rakesh Therani, Medium (autopublicado), filtro SQL arbitrário ">US$100k volume e <50 traders" (snippet).

---

## Parte 12 — Checkpoint final (obrigatório)

**Verificado (fecha com fonte primária/relatório e página aberta):**
- Custo-base de transação Solana (0,000005 SOL); taxa bonding curve pump.fun 1,25%; taxa PumpSwap 0,25%; taxa Raydium v4 0,25% (0,22%+0,03%); taxa de serviço OpenLiquid 1%.
- Mecânica de wash trading em DEX/AMM e diferença para CEX.
- Evidência de contorno deliberado (OpenLiquid: 100+ carteiras, randomização, buy/sell 55/45, carteiras frescas).
- Mecânica de Jito bundle (até 5 tx, atômico, tip na última tx, block engine, leilão; 98% do stake usa o Block Engine, ~54% roda o cliente).
- Números Midsummer (82,8%; 9,3 mi; 3,27+6,04 mi; 17 mil; métodos zero-risk 2% e circular 99%) — revisado por pares.
- Números MemeTrans/MELT (28,13% / 36,5%; três heurísticas; 84,13% alto risco; +24pp de concentração escondida) — preprint.
- Chainalysis 3,59% / US$ 2,57 bi — relatório de empresa.
- Campos gratuitos de DexScreener, GeckoTerminal, Solscan, RugCheck, trench.bot.
- Reprodução do filtro Midsummer de graça: (b) sim, (a) parcial, (c) não.
- Ausência de limiar publicado para volume/liquidez e volume/market cap.
- Limiar de graduação pump.fun (~85 SOL / ~US$ 69 mil).

**NÃO VERIFICADO:** ver Parte 10 (taxas Meteora; gratuidade Bubblemaps/GMGN/Axiom/Photon/BullX/Birdeye; Benford aplicado a AMM Solana; contorno anunciado de Jito/fund-flow; custo/US$1mi como medição independente; parâmetros do trending do DexScreener).

**Consultas feitas (web_search):**
1. Midsummer USENIX Security 2026 meme coin
2. MemeTrans bundle holder ratio Solana pump.fun arxiv
3. Chainalysis 2025 pump and dump 3.59% tokens
4. Jito bundle documentation block engine tip
5. pump.fun fees 2026 PumpSwap Raydium Meteora swap fee
6. Cong Li Tang Yang Crypto Wash Trading Management Science 70% Benford
7. Solana transaction base fee 5000 lamports priority fee 2026
8. volume to liquidity ratio wash trading threshold published paper DEX
9. Midsummer circular volume 99% zero-risk position 500% detection
10. trench.bot bundle checker pump.fun free
11. RugCheck bundled insiders field Solana token
12. DexScreener token page makers buys sells txns 24h free
13. GeckoTerminal trades tab maker address free transactions
14. MemeTrans bundle holder ratio 28.13% correlation rug pull outcome
15. Solscan free token holders transactions defi activities tab
16. DexScreener trending algorithm official documentation criteria

**Consultas Scholar Gateway:** 1 (market manipulations meme coin ecosystem wash trading). **Subagente:** 1 (detalhamento MemeTrans/MELT — confirmou 28,13%/36,5%, 84,13%, mudança de nome MemeTrans→MELT, ausência de discussão de uso legítimo). **Enricher:** 1 passagem (ancorou taxa bonding curve 1,25%, split Raydium, alcance do Jito, limiar de graduação, fonte de priority fee). **Fetches de página inteira:** Midsummer (pdf e html v2, seções), OpenLiquid (2 páginas), demais via search com página aberta indicada.

**CONTINUA — faltam:** nada essencial ao escopo; itens abertos estão na Parte 10 (NÃO VERIFICADOS), todos secundários.