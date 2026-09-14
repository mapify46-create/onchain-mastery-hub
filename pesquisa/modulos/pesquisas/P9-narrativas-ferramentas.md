# Ferramentas de ATENÇÃO para memecoins recém-lançadas na Solana — documento completo

*Módulo de curso. Data de referência: 13 de setembro de 2026. Consultas às fontes: 13–14 de setembro de 2026. Descrição neutra, sem ranking, sem recomendação. Cada afirmação traz a fonte logo depois.*

**Glossário rápido (termos explicados na 1ª ocorrência ao longo do texto):** *trending* = lista de "em alta"; *boost* = compra que multiplica temporariamente a pontuação de tendência; *smart money* = carteiras historicamente lucrativas; *mindshare* = fatia de atenção social; *social volume* = número de menções sociais; *wash trading* = negociação fictícia consigo mesmo para inflar volume; *holder* = detentor do token; *liquidez* = dinheiro no pool para comprar/vender; *market cap* = preço × oferta; *KOL* = key opinion leader (influenciador); *graduação* (pump.fun) = quando o token sai da bonding curve e migra para um pool de DEX.

---

## (1) TABELA-RESUMO

| Ferramenta | O que mede (atenção) | Grátis / Pago | Cobre Solana + memecoin recém-lançada? | Exige carteira p/ LER? |
|---|---|---|---|---|
| **DexScreener** | Trending Score proprietário (volume, liquidez, txns, makers, holders, visitas, reações) + Boosts pagos | Leitura grátis; Boosts e anúncios pagos | Sim | NÃO (ler); carteira/pagamento só p/ comprar Boost |
| **GMGN** | Leaderboard "Trending" por compras/vendas, volume, txns, holders, variação de preço | Leitura grátis; sem assinatura documentada | Sim (Pump.fun, letsbonk, Raydium) | NÃO (ler); SIM p/ operar (login Telegram) |
| **Birdeye** | "Trending Tokens" e "Find Gems" (Most Viewed/Most Watched/Most Trades); Launch Explorer | Leitura grátis; PRO e Data API pagos | Sim (20+ launchpads incl. Pump.fun) | NÃO (ler); SIM p/ swap |
| **pump.fun** | Board (Movers/Market Cap/Last Trade), "Now Trending", metas | Leitura grátis; taxa 1,25% por trade | Sim (é o próprio launchpad) | NÃO (ler); SIM p/ operar |
| **X (busca avançada)** | Menções, engajamento (min_faves), autor, data | Busca grátis (login exigido); Premium pago | Sim (o que for postado) | N/A (exige CONTA X, não carteira) |
| **Google Trends** | Interesse de busca relativo (0–100) | Grátis | Parcial — só termos com volume de busca | NÃO |
| **LunarCrush** | Social volume, sentimento, Galaxy Score™, AltRank™ (X, Reddit, YouTube, TikTok) | Grátis (só dados de mercado); social é pago | Sim (adiciona moedas por novos pools) | NÃO |

---

## (2) UMA SEÇÃO POR FERRAMENTA

### 2.1 DexScreener

**O que mede.** O DexScreener atribui a cada token um **Trending Score** ("uma fotografia do buzz e da atividade de mercado do token"), usado para ordenar o screener e a barra de trending. A documentação oficial não revela a fórmula, mas lista as métricas: **Atividade de mercado** — Volume, Liquidez, Transações, *Unique makers* (carteiras distintas negociando), Holders; **Engajamento na comunidade** — Visitantes na página do token (site e app) e Reações (🚀 🔥 💩 🚩); **Confiança** — tokens com info verificada / *Enhanced Token Info* e auditoria de segurança ganham impulso (docs.dexscreener.com/trending — página aberta, 14/09/2026).

**De onde vêm os dados e atraso.** Dados on-chain dos DEX + sinais de engajamento na própria plataforma. A doc **não** publica latência/frequência exatas → **NÃO VERIFICADO** o atraso.

**Solana + memecoin recém-lançada.** Sim; cobre Solana e pares novos de DEX.

**Grátis × pago.** Ler o trending é grátis. Pago: **Boosts** (multiplicam o Trending Score por 12–24h; 500+ Boosts ativos = "Golden Ticker", que deixa o símbolo dourado — docs.dexscreener.com/boosting, página aberta, 14/09/2026). **Preço dos Boosts: NÃO VERIFICADO em página oficial.** A página oficial de Boosts e os Termos confirmam durações (12–24h) e o Golden Ticker (500+), mas **não publicam valores em dólar**; a API oficial (api.dexscreener.com/token-boosts/latest/v1) retorna apenas `amount`/`totalAmount`, sem preço; a marketplace oficial vende *Enhanced Token Info*, *Token Advertising* e *Trending Bar Advertising*, mas não lista Boosts com preço (verificação de 14/09/2026). Estimativas de terceiros descrevem campanhas de **US$300 a US$1.500** para pushes de vários dias (OpenLiquid, 2026: "total cost for a meaningful multi-day Boost campaign typically ranges from $300 to $1,500", com pacote inicial de ~US$100 por poucas horas), e revendedores como PandaBoost cobram cerca de US$1.200/12h ou US$1.600/24h em Solana — mas **nenhuma dessas é superfície oficial do DexScreener**, e os pacotes que circulam (10=US$99, 30=US$249, 50=US$399, 100=US$899, 500=US$3.999) **não foram confirmados em página oficial**. O modal real de compra fica atrás do botão amarelo "Boost" na página do token (só no navegador desktop) e é bloqueado a acesso automatizado.

**Exige carteira?** Para **ler** o trending/boosts: NÃO. Para **comprar** Boost: é preciso pagamento (e o fluxo ocorre logado na plataforma). Boosts são não reembolsáveis e contract-specific (não transferíveis) — docs.dexscreener.com/privacy/boosting-terms-and-conditions (página aberta, atualização de 30/08/2024).

**Passo a passo (doc oficial; tela de compra NÃO VERIFICADA por bloqueio a bot).** 1) Abrir dexscreener.com e a página do token; 2) para trending, usar o screener/barra de trending; 3) para Boost, abrir a página do token no navegador e clicar no botão amarelo **Boost** ("não disponível no app mobile, só no navegador"). Tokens inativos há +24h ou sinalizados como risco não podem ser "boostados" (docs.dexscreener.com/boosting).

**O que NÃO mede / armadilhas.** Não mede sentimento textual. O trending é influenciável por Boost pago (a própria doc diz que Boosts "aplicam um multiplicador" ao score) e por reações/visitas, todos manipuláveis. A doc alerta que Boost "não garante trending".

### 2.2 GMGN

**O que mede.** Leaderboard "TRENDING" ("os tokens mais quentes do momento") com colunas: **Age** (hora de criação), **Liq/MC** (liquidez/market cap), **Holders**, **1h TXs** (nº de transações em 1h), **1h Vol** (volume em 1h), **Price**, **1m%/5m%/1h%** (variação), **Degen Audit** (checagem de contrato); filtros e intervalos de **1 min / 5 min / 30 min / 1 h**; mostra estrela p/ watchlist, nº de "fires" e se há **AD ativado no Dexscreener** (docs.gmgn.ai/index/trending — página aberta, 14/09/2026). Varre Pump.fun, letsbonk e Raydium; rastreia smart money/KOLs (docs.gmgn.ai).

**Atraso.** Confirmado na própria página oficial gmgn.ai/trend?chain=sol: o leaderboard é **"updated every minute based on buy/sell count, trading volume, price change, and holder growth"** (atualizado a cada minuto por contagem de compra/venda, volume, variação de preço e crescimento de holders).

**Solana + memecoin recém-lançada.** Sim, é o caso de uso central (gmgn.ai/trend?chain=sol).

**Grátis × pago.** A leitura do trending é grátis; segundo fonte secundária, "GMGN não cobra assinatura nem taxa de acesso"; o custo é rede + configurações de execução (solanatradingbots.com — só snippet). Não há página oficial de "planos" de leitura → assinatura de leitura **NÃO VERIFICADA** (aparentemente inexistente).

**Exige carteira?** LER: NÃO. OPERAR (sniper/copy/auto): a doc recomenda logar com carteira via chave privada no Telegram — isso é **risco** (entregar chave a bot custodial). Distinguir ler (sem carteira) de operar (com carteira/login).

**Passo a passo.** 1) gmgn.ai/trend?chain=sol; 2) escolher intervalo (1m/5m/30m/1h) e ordenar/filtrar; 3) clicar na estrela p/ watchlist; 4) abrir o token p/ ver Insider Traders, Snipers, First 70 Buyers (docs.gmgn.ai/index/quick-start, página aberta).

**O que NÃO mede / armadilhas.** Não mede sentimento social textual; trending baseado em atividade on-chain é vulnerável a wash trading e a holders inflados; o próprio ícone "AD no Dexscreener" sinaliza que parte da visibilidade cruzada é paga.

### 2.3 Birdeye (birdeye.so — ferramenta cripto; **não** confundir com birdeye.com, SaaS de reputação)

**O que mede.** "Trending Tokens" (movers por janela configurável) e **Find Gems** com filtros de TVL, FDV, volume 24h, holders e métricas de atividade **Most Viewed / Most Watched / Most Trades**; **Launch Explorer** monitora 20+ launchpads (inclui PumpFun e BonkFun) capturando tokens Solana recém-emitidos; Trader Leaderboard e Smart Money (solanacompass.com/projects/birdeye — só snippet). A API oficial de "trending tokens" ordena por rank, liquidez e volume 24h (docs.birdeye.so/docs/trending-tokens — só snippet).

**Atraso.** Não documentado explicitamente → **NÃO VERIFICADO**.

**Solana + memecoin recém-lançada.** Sim; foco em Solana; Launch Explorer pega tokens desde os primeiros momentos on-chain.

**Grátis × pago.** Leitura grátis (sem login p/ ver muito conteúdo). **Pago (dois produtos distintos):** (a) **Birdeye Data API** — Lite US$39/mês, Starter US$99/mês, Premium US$199/mês, Business US$499/mês (birdeye.so/data-api/pricing — página aberta, 14/09/2026); (b) **Birdeye PRO** (features do terminal) — US$45/mês, US$120/3 meses, US$360/ano (docs.birdeye.so/docs/pricing-2 — a página não renderizou em fetch → tratar como **snippet, não página aberta**).

**Exige carteira?** LER: NÃO. Para usar o widget de swap: SIM (assina no próprio navegador; Birdeye é read-only por padrão, não custodia fundos — blog de terceiros).

**Passo a passo.** 1) birdeye.so → aba "Trending Tokens"; 2) birdeye.so/find-gems → aplicar filtros e ordenar por "Most Viewed"/"Most Watched"/"Most Trades"; 3) Launch Explorer p/ novos tokens. (Tela viva verificada apenas parcialmente via home birdeye.so; rótulos conforme doc oficial.)

**O que NÃO mede / armadilhas.** "Most Viewed"/"Most Watched" medem atenção dentro do Birdeye, não valor; volume/holders são infláveis por wash trading; não mede sentimento textual.

### 2.4 pump.fun

**O que mede.** É o launchpad; a interface tem **board** ordenável (por "Last Trade" = trades mais recentes; "Market Cap"; e movers), um ticker **"Now Trending"** e um filtro de tokens em alta que agrega **metas** (temas como "dogs", "ai", "tesla"); a aba **Advanced** mostra tokens novos, "about to graduate" e featured (ledger.com/academy — só snippet; coincodecap.com — só snippet). O app oficial descreve "veja os memes que as pessoas mais compram e vendem" e "siga top callers" (Google Play, listagem oficial do app).

**Atraso.** Tempo real (trades on-chain); a doc não dá número de latência → **NÃO VERIFICADO**.

**Solana + memecoin recém-lançada.** Sim (é onde nascem).

**Grátis × pago.** Criar moeda: grátis (só taxa de rede ~0,02 SOL). Trade na bonding curve: **1,25% total (0,95% protocolo + 0,30% criador)**; graduação p/ PumpSwap: 0,015 SOL; pós-graduação, taxa cai conforme market cap (intercom.help/pumpfun-web — Central de Ajuda oficial, só snippet; cryptoslate.com — só snippet). Não há "assinatura" de leitura. Destaque pago tipo "featured"/promoção: **NÃO VERIFICADO** preço oficial (a livestream é ferramenta de auto-promoção, sem tarifa de destaque documentada).

**Exige carteira?** LER o board: NÃO. OPERAR: SIM — carteira self-custodial ("Own your funds… we cannot access or freeze your funds", listagem oficial do app).

**Passo a passo.** 1) pump.fun/board → ordenar por "Last Trade"/"Market Cap"/movers; 2) pump.fun/explore ou o ticker "Now Trending" p/ metas; 3) aba Advanced p/ novos e "about to graduate". (Tela viva NÃO VERIFICADA por renderização; descrições conforme fontes acima.)

**O que NÃO mede / armadilhas.** Não mede sentimento social externo. A esmagadora maioria dos tokens falha: a medição por coorte da Bitquery (via Coinmonks/Medium, set. 2026) encontra **~2,7% de taxa de graduação**, "estável dentro de meio ponto percentual em quatro coortes independentes" (ex.: tokens lançados em 20/ago — 40.934 criados, 1.066 na PumpSwap = 2,60%); um estudo de Marino et al. (2026) reporta **0,63%** em set–out/2025 sobre 655.770 tokens. Board por "last trade"/atividade é vulnerável a wash trading e bots.

### 2.5 X (busca avançada e listas)

**O que mede.** Menções e engajamento em posts. Operadores (funcionam na caixa de busca e no formulário x.com/search-advanced): `from:` / `to:` (autor/destinatário), `"frase exata"`, `since:`/`until:` (datas; since inclusivo, until exclusivo), `min_faves:` / `min_retweets:` / `min_replies:` (piso de engajamento), `filter:links/media/images/videos/verified`, `lang:`, `-` (excluir), `OR` (maiúsculo) — help.x.com/en/using-x/x-advanced-search (só snippet) e múltiplas fontes de referência 2026.

**Atraso.** Tempo real, mas a busca web favorece posts recentes e limita alcance histórico (replysocial.co; keep.md). Latência oficial não documentada → **NÃO VERIFICADO**.

**Solana + memecoin recém-lançada.** Sim, para o que for postado (ex.: `"$TICKER" min_faves:50 since:2026-09-01`).

**Grátis × pago (planos Premium).** Busca é grátis, mas **exige estar logado** (desde 2023, resultados bloqueados para deslogados — replysocial.co). Planos (help.x.com/en/using-x/x-premium — texto oficial de preço, web): **Basic US$3/mês ou US$32/ano; Premium US$8/mês ou US$84/ano; Premium+ US$40/mês ou US$395/ano** (preços web nos EUA; iOS/Android mais caros por taxas de app store). O que muda para busca/atenção: Premium+ traz **Radar Search**; Premium dá priorização de respostas e menos anúncios (help.x.com/en/using-x/x-premium). Nenhum plano transforma a busca avançada em exportação — segue sendo feed manual.

**Exige carteira?** Não usa carteira cripto; exige **conta X** (e login).

**Passo a passo.** 1) x.com/search-advanced (ou digitar operadores na busca); 2) combinar termo + `min_faves:` + `since:`/`until:` + `lang:`; 3) alternar abas "Top"/"Latest"; 4) salvar a query e/ou montar Lista de contas.

**O que NÃO mede / armadilhas.** Não distingue humano de bot; operadores geo (`near:`, `within:`) estão mortos; alcance histórico é incompleto. Manipulação por bots é documentada (ver Seções B e C).

### 2.6 Google Trends

**O que mede.** Interesse **relativo** de busca, normalizado 0–100 (100 = pico no período/região; 50 = metade; 0 = dados insuficientes) — support.google.com/trends/answer/4365533 (FAQ oficial). Baseia-se em amostra aleatória de buscas Google/YouTube; exclui buscas de baixo volume, buscas repetidas do mesmo usuário em curto período, buscas com caracteres especiais e buscas internas de produtos Google (AI Mode/Overviews); adiciona **ruído estatístico** por privacidade (support.google.com/trends).

**Atraso.** "Quase em tempo real"; dados diários/semanais conforme a janela (newsinitiative.withgoogle.com). Frequência exata por token → **NÃO VERIFICADO**.

**Solana + memecoin recém-lançada.** **Parcial** — só funciona para termos com volume de busca suficiente; memecoin recém-lançada geralmente aparece como 0 (Trends "só analisa termos populares"; baixo volume = 0). Logo, é fraco para tokens muito novos.

**Grátis × pago.** 100% grátis; sem carteira.

**Passo a passo.** 1) trends.google.com/Explore; 2) digitar o termo (escolher "Search term"); 3) ver "Interest over time"; 4) ajustar região/tempo; 5) usar "+ Add comparison" p/ comparar termos.

**O que NÃO mede / armadilhas.** Não é volume absoluto; escala é relativa (recomparar muda os números); ruído estatístico; insensível a termos de nicho novos; não mede sentimento.

### 2.7 LunarCrush

**O que mede.** Social volume, sentimento, dominância social, **Galaxy Score™** e **AltRank™**, agregando X, Reddit, YouTube e TikTok (lunarcrush.com/pricing — página aberta; lunarcrush.com/metrics/galaxy-score). Segundo material da própria LunarCrush, o **Galaxy Score™ combina quatro métricas** — price score, social impact score, average sentiment e correlation rank — normalizadas em escala 0–100; **AltRank™** mede desempenho de uma moeda vs. todas as outras combinando preço relativo ao Bitcoin e atividade social (medium.com/lunarcrush; lunarcrush.com/en/developers).

**Atraso.** Tempo real, com a API v3 "otimizada para latência" (medium.com/lunarcrush). Número exato → **NÃO VERIFICADO**.

**Solana + memecoin recém-lançada.** Sim; adiciona moedas automaticamente por novos pools (do checkpoint; a doc de preços confirma cobertura de "milhares de ativos").

**Grátis × pago.** Plano **Hobby: FREE** — só dados de mercado, sem dados sociais e sem API (4 req/min, 100/dia); **Individual US$5/dia; Builder US$15/dia; Scale US$45/dia; Enterprise** sob consulta (lunarcrush.com/pricing — página aberta, 14/09/2026). Atenção: **o social (Galaxy Score/AltRank/sentimento) NÃO está no plano grátis** — o grátis é "market data only".

**Exige carteira?** NÃO (login por e-mail/assinatura via Stripe).

**Passo a passo.** 1) lunarcrush.com → Discover; 2) abrir o tópico (ex.: lunarcrush.com/topic/solana-meme-coin); 3) ver Galaxy Score/AltRank/social volume; 4) criar Collections/alertas (conforme plano).

**O que NÃO mede / armadilhas.** Galaxy Score/AltRank são proprietários e **não têm validação independente revisada por pares** (ver Seção C); social volume é inflável por bots (Seção B); grátis não inclui sinal social.

---

## (3) SEÇÃO B — O QUE É COMPRÁVEL

**Listas influenciáveis por pagamento:**

- **DexScreener — Boosts / Golden Ticker (página oficial aberta):** compra que multiplica o Trending Score por 12–24h; 500+ Boosts ativos = Golden Ticker (símbolo dourado) — docs.dexscreener.com/boosting. A doc diz explicitamente que Boost "aplica um multiplicador" ao score. **Preços em dólar: NÃO VERIFICADO em superfície oficial** (docs, API e marketplace oficiais não publicam valores). Estimativas de terceiros: campanhas de US$300–US$1.500 (OpenLiquid, 2026) e revendedores cobrando ~US$1.200/12h–US$1.600/24h (PandaBoost) — nada disso é oficial. A marketplace oficial também vende **Enhanced Token Info** (perfil do token) e **Token/Trending Bar Advertising** (anúncios) — visibilidade paga adicional; preços desses **NÃO VERIFICADOS** aqui.
- **GMGN:** exibe se o token tem "AD ativado no Dexscreener" (docs.gmgn.ai/index/trending) — reflete o anúncio pago de outra plataforma. Mecanismo pago próprio de destaque no leaderboard: **NÃO VERIFICADO**.
- **Birdeye:** trending/Find Gems são algorítmicos; mecanismo oficial de "promoted/ads" de token: **NÃO VERIFICADO** preço oficial.
- **pump.fun:** livestreaming é auto-promoção; "featured"/promoção paga com preço oficial: **NÃO VERIFICADO**.
- **X:** Premium/Premium+ priorizam alcance de respostas e reduzem anúncios (help.x.com/en/using-x/x-premium); "promoted posts"/Ads existem como produto publicitário, mas o valor não é tarifa fixa pública → **NÃO VERIFICADO**.
- **LunarCrush / Google Trends:** sem mecanismo documentado de "comprar" posição no ranking/interesse.

**Conclusão de B:** o único mecanismo de compra de destaque **confirmado em página oficial** é o dos Boosts/Golden Ticker do DexScreener (existência e regras confirmadas; **preços não**). Tudo mais é não verificado ou é publicidade de plataforma sem tarifa pública.

### (Item 4) Métricas sociais medidas como manipuláveis por bots — estudos com método

- **Nizzoli, Tardelli, Avvenuti, Cresci, Tesconi, Ferrara (2020), "Charting the Landscape of Online Cryptocurrency Manipulation", IEEE Access, DOI 10.1109/ACCESS.2020.3003370.** Amostra: +50 milhões de mensagens de ~7 milhões de usuários em Twitter, Telegram e Discord em 3 meses. Resultado (verbatim): **"more than 56% of them were bots or suspended accounts"** (das contas do Twitter que compartilhavam convites para canais) e **"93% of the invite links shared by Twitter bots point to Telegram pump-and-dump channels"**; 296 canais de pump-and-dump e 432 de Ponzi (≈20% do total) no Telegram. Evidência direta de inflação social por bots.
- **Kraaijeveld & de Smedt (2020), J. of International Financial Markets, Institutions & Money 64:101188.** 9 maiores criptos, +24 milhões de tweets, VADER; identificaram e **removeram tweets de bots** (bots eram preditores significativos de retornos de BTC/LTC/BCH antes da limpeza) — mostra que o sinal do Twitter é contaminado por bots.
- **Li, Shin & Wang (2021), "Cryptocurrency Pump-and-Dump Schemes" (SSRN 3267041; publicado em JFQA).** P&D geram bolhas de curtíssimo prazo (aumentos dramáticos de preço, volume e volatilidade que revertem em minutos).
- **Dhawan & Putniņš (2023), "A New Wolf in Town? Pump-and-Dump Manipulation in Cryptocurrency Markets", Review of Finance 27(3):935–975.** 355 casos em 6 meses; **distorção média de preço de 65%**, volumes anormais na casa dos milhões e grandes transferências de riqueza.
- **Cong, Li, Tang & Yang (2023), "Crypto Wash Trading", Management Science 69.** Documenta wash trading (volume fictício) em exchanges não reguladas.
- **Bitwise/SEC (2019), reportado em Jain, McInish & Miller (2019), Financial Management 48(4).** Análise de 81 exchanges concluiu que **até 95% do volume reportado em algumas era falso**; só 10 das 81 passaram nos critérios.

---

## (4) SEÇÃO C — VALIDAÇÃO PUBLICADA (a métrica antecipa preço?)

*Scholar Gateway primeiro. Distinção clara entre (a) large caps e (b) memecoins/small caps.*

**(a) Bitcoin / ETH / large caps — evidência mista, muitas vezes contemporânea ou fraca:**

- **Naeem, Mbarki, Suleman, Vo & Shahzad (2020), International Review of Finance 21(4):1529–1538**, DOI 10.1111/irfi.12339. 6 grandes criptos, dados diários 07/08/2015–31/12/2019, regressão quantílica (QQ): sentimento alto/baixo **prevê retornos de 5 das 6**. Efeito não linear.
- **Kraaijeveld & de Smedt (2020)** (acima): Granger bivariado — **poder preditivo do sentimento do Twitter para apenas 3 das 9** maiores criptos.
- **Shen, Urquhart & Wang (2019), Economics Letters 174:118–122.** Número de tweets prevê **volume** e volatilidade futuros do Bitcoin, **não os retornos**.
- **Sabalionis, Wang & Park (2020), The Manchester School 89(1):102–127**, DOI 10.1111/manc.12352. Variável mais significativa é **endereços ativos** (on-chain); buscas do Google e tweets têm impacto **mais fraco** em magnitude e significância.
- **Kristoufek (2013), Scientific Reports 3:3415.** Buscas no Google e Wikipedia causam (Granger) preços do Bitcoin — mas relação bidirecional e de fase inicial do mercado.
- **Hang, Zhang & Bueno (2021), Complexity 2021:5543995**, DOI 10.1155/2021/5543995. Causalidade Google Trends→retornos do BTC **só aparece em períodos de alta volatilidade** (instável no tempo).
- **Süssmuth (2021), Journal of Forecasting 41(3):435–454**, DOI 10.1002/for.2819. Buscas Baidu/Google preveem BTC em horizontes de **2–5 meses** (não intradiário).
- **Bleher & Dimpfl (2019)** e **Aalborg et al. (2019)** (em survey Bariviera & Merediz-Solà 2021, J. of Economic Surveys 35(2), DOI 10.1111/joes.12412): 12 criptos — **retornos não previsíveis** por buscas Google, volatilidade/volume parcialmente sim.
- **Polyzos, Rubbaniy & Mazur (2024), Financial Review 59(3):807–829**, DOI 10.1111/fire.12387. 53,5 milhões de tweets, +8.000 criptos: eficiência de mercado maior nos **6 primeiros meses pós-ICO** (i.e., previsibilidade por info pública decai).

**Balanço (a):** a maioria dos achados robustos é sobre **volume/volatilidade** (não retorno), é **contemporânea** ou de horizonte longo (meses), e é **instável no tempo**. Não há consenso de que sentimento/buscas *antecipem retorno* de forma explorável.

**(b) Memecoins / small caps / Solana recém-lançada:** **NENHUM estudo revisado por pares foi encontrado mostrando que qualquer métrica social (social volume, sentimento, Galaxy Score/AltRank, Google Trends, menções no X, trending de DexScreener/GMGN/Birdeye) ANTECIPA o preço de memecoins recém-lançadas na Solana.** O que existe para esse segmento é literatura de **manipulação** (Seção B): pump-and-dump (Li et al. 2021; Dhawan & Putniņš 2023), bots (Nizzoli et al. 2020) e wash trading (Cong et al. 2023) — ou seja, os sinais sociais desse nicho são documentados como **manipuláveis**, não como preditivos. **Digo com todas as letras: não há validação preditiva publicada para memecoins recém-lançadas na Solana.**

**Galaxy Score™/AltRank™ (LunarCrush):** a descrição da metodologia vem de material da **própria LunarCrush** (medium.com/lunarcrush; lunarcrush.com/en/developers) — **estudo do próprio vendedor, não revisado por pares**. Não foi localizada validação independente revisada por pares de que Galaxy Score/AltRank antecipem preço.

---

## (5) UMA LINHA CADA

- **Santiment** — existe; cobre Solana (do checkpoint, cobertura desde ago/2025 — **NÃO RE-CONFIRMADO nesta etapa**); métricas sociais/on-chain (social volume, dev activity); grátis limitado + pago; santiment.net.
- **Kaito** — existe; mindshare (fatia de atenção); **Yaps encerrado em 15/01/2026** após o X revogar acesso de API a apps que pagam por post (CoinGecko; CoinDesk 15/01/2026); pivotou p/ Kaito Studio/Markets; acordo de dados com X restaurado em 23/07/2026; pago; kaito.ai.
- **Arkham** — existe; inteligência on-chain/rotulagem de carteiras; Solana suportada (do checkpoint, desde 25/10/2024 — **NÃO RE-CONFIRMADO nesta etapa**); tier grátis + pago; platform.arkhamintelligence.com.
- **Nansen** — existe; **Smart Money em Solana confirmado** (nansen.ai/post/solana-live-on-nansen; docs.nansen.ai/api/smart-money lista solana); preço oficial atual (docs.nansen.ai): plano único **Pro a US$49/mês no anual (US$588/ano) ou US$69/mês no mensal**, além do Free (onchain trading a 0,25%) — os antigos Pioneer (US$99/mês) e Professional (US$999/mês) foram descontinuados; nansen.ai.
- **Bots de Telegram (BONKbot Token Alerts / Telemetry)** — existem; alertas de novos tokens/atividade em tempo real via Telegram; docs.bonkbot.io/community-and-support/bonkbot-alert-channel e telemetry.io; grátis/freemium (**preços NÃO VERIFICADOS**).

---

## (6) NÃO VERIFICADOS

1. **Preços dos Boosts do DexScreener em dólar** — não publicados em nenhuma superfície oficial (docs/API/marketplace); modal de compra bloqueado a bot. **Prioridade máxima do pedido: fica NÃO VERIFICADO.**
2. Preços oficiais de Enhanced Token Info / Token Advertising / Trending Bar Advertising do DexScreener.
3. Latência/frequência exata de atualização: DexScreener, Birdeye, pump.fun, LunarCrush, X. (GMGN foi confirmado: "a cada minuto".)
4. Birdeye PRO (docs.birdeye.so/docs/pricing-2) — só snippet; página não renderizou (preços US$45/US$120/US$360 tratados como snippet).
5. Mecanismos pagos de destaque com preço oficial: GMGN "ads" próprio, Birdeye "promoted/ads", pump.fun "featured", X Ads.
6. Existência de assinatura paga de leitura no GMGN (aparentemente não há).
7. Santiment e Arkham — cobertura Solana não re-confirmada nesta etapa.
8. Preços dos bots de Telegram (BONKbot/Telemetry).
9. Telas vivas (nomes exatos de botões/colunas em produção) de DexScreener (compra de Boost), Birdeye e pump.fun — não renderizadas; usados textos de doc/fontes.

---

## (7) FONTES

1. docs.dexscreener.com/boosting — Boosts/Golden Ticker (página aberta, 14/09/2026)
2. docs.dexscreener.com/privacy/boosting-terms-and-conditions — Termos (página aberta, atualização 30/08/2024)
3. docs.dexscreener.com/trending — Trending Score (página aberta, 14/09/2026)
4. api.dexscreener.com/token-boosts/latest/v1 — campos amount/totalAmount, sem preço (verificado, 14/09/2026)
5. docs.gmgn.ai/index/trending — colunas/filtros do trending (página aberta, 14/09/2026)
6. gmgn.ai/trend?chain=sol — "updated every minute…" (página oficial, 14/09/2026)
7. docs.gmgn.ai/index/quick-start — passo a passo (página aberta, 14/09/2026)
8. solanatradingbots.com/gmgn-ai-how-to-use — "sem assinatura" (só snippet, 14/09/2026)
9. birdeye.so/data-api/pricing — Data API US$39/99/199/499 (página aberta, 14/09/2026)
10. docs.birdeye.so/docs/pricing-2 — PRO US$45/120/360 (só snippet, 14/09/2026)
11. docs.birdeye.so/docs/trending-tokens — API trending (só snippet, 14/09/2026)
12. solanacompass.com/projects/birdeye — Find Gems/Launch Explorer (só snippet, 14/09/2026)
13. intercom.help/pumpfun-web — taxas oficiais (só snippet, 14/09/2026)
14. cryptoslate.com/decentralized-exchanges/pump-fun-review — taxas (só snippet, 14/09/2026)
15. ledger.com/academy/topics/crypto/what-is-pump-fun — board/Now Trending/metas (só snippet, 14/09/2026)
16. Coinmonks/Medium (Bitquery, set. 2026) — taxa de graduação ~2,7% (só snippet); Marino et al. (2026) — 0,63% (referência via snippet)
17. help.x.com/en/using-x/x-advanced-search — operadores (só snippet, 14/09/2026)
18. help.x.com/en/using-x/x-premium — planos e preços (só snippet, 14/09/2026)
19. support.google.com/trends/answer/4365533 — exclusões/ruído (só snippet, 14/09/2026)
20. newsinitiative.withgoogle.com/resources/trainings/basics-of-google-trends — normalização 0–100 (só snippet, 14/09/2026)
21. lunarcrush.com/pricing — planos FREE/US$5/15/45 dia (página aberta, 14/09/2026)
22. medium.com/lunarcrush — Galaxy Score = 4 métricas (só snippet, 14/09/2026)
23. lunarcrush.com/en/developers — endpoints/social (só snippet, 14/09/2026)
24. Nizzoli et al. (2020) IEEE Access, DOI 10.1109/ACCESS.2020.3003370 (texto integral do abstract verificado)
25. Kraaijeveld & de Smedt (2020) JIFMIM 64:101188 (via referências, só snippet)
26. Li, Shin & Wang (2021) SSRN 3267041 (só snippet)
27. Dhawan & Putniņš (2023) Review of Finance 27(3):935–975 (só snippet)
28. Cong, Li, Tang & Yang (2023) Management Science 69 "Crypto Wash Trading" (só snippet)
29. Jain, McInish & Miller (2019) Financial Management 48(4) — Bitwise 95% (Scholar Gateway)
30. Naeem et al. (2020) Int. Review of Finance 21(4):1529–1538, DOI 10.1111/irfi.12339 (Scholar Gateway)
31. Shen, Urquhart & Wang (2019) Economics Letters 174 (Scholar Gateway/refs)
32. Sabalionis, Wang & Park (2020) The Manchester School 89(1), DOI 10.1111/manc.12352 (Scholar Gateway)
33. Hang, Zhang & Bueno (2021) Complexity 2021:5543995, DOI 10.1155/2021/5543995 (Scholar Gateway)
34. Süssmuth (2021) Journal of Forecasting 41(3), DOI 10.1002/for.2819 (Scholar Gateway)
35. Bariviera & Merediz-Solà (2021) J. Economic Surveys 35(2), DOI 10.1111/joes.12412 (Scholar Gateway)
36. Polyzos, Rubbaniy & Mazur (2024) Financial Review 59(3), DOI 10.1111/fire.12387 (Scholar Gateway)
37. coingecko.com/learn/what-is-kaito — Yaps encerrado 15/01/2026 (só snippet); coindesk.com 15/01/2026 (só snippet)
38. nansen.ai/post/solana-live-on-nansen; docs.nansen.ai/api/smart-money; docs.nansen.ai (preços Pro US$49/US$69) — (só snippet)

---

## (8) LISTA DE CONSULTAS (queries)

1. DexScreener boosts price packages Golden Ticker
2. Birdeye pricing page premium plans
3. birdeye.so premium pricing crypto plans
4. GMGN.ai trending how it works documentation
5. pump.fun how coins trend explore board featured
6. LunarCrush Galaxy Score AltRank documentation methodology
7. X Premium Basic Premium+ price per month official
8. pump.fun fees trading fee percentage official
9. cryptocurrency pump and dump schemes organized on Telegram and Discord empirical analysis (Scholar)
10. Does Twitter social media sentiment predict cryptocurrency price movements and returns? (Scholar)
11. Google Trends search volume and Bitcoin price prediction attention (Scholar)
12. wash trading on decentralized exchanges detection and prevalence estimates (Scholar)
13. Solana memecoin pump.fun rug pull returns empirical analysis new token launches (Scholar)
14. X advanced search operators from min_faves filter since until help.x.com
15. Google Trends how interest over time calculated 0-100 sampled support
16. Birdeye trending tokens sponsored ad promoted paid placement Solana
17. Nizzoli 2020 charting the landscape online cryptocurrency manipulation Telegram bots
18. Kaito Yaps mindshare discontinued January 2026 Solana
19. Nansen Smart Money Solana Arkham Solana support coverage
20. Li Cryptocurrency pump and dump schemes 2021 study sample abnormal returns
21. (fetch) docs.dexscreener.com/boosting + boosting-terms; docs.gmgn.ai/index/trending; docs.dexscreener.com/trending; lunarcrush.com/pricing; birdeye.so/data-api/pricing
22. (subagente) confirmação de preços oficiais dos Boosts do DexScreener

---

*Observação metodológica final:* o pedido de maior prioridade — confirmar os preços dos Boosts do DexScreener em página oficial — foi executado, inclusive com subagente dedicado, e o resultado honesto é **NÃO VERIFICADO em superfície oficial**: o DexScreener confirma oficialmente a mecânica (12–24h, Golden Ticker a 500+) mas não publica valores em dólar em docs, API ou marketplace. Os números que circulam são de terceiros. Para obter o preço oficial, é preciso abrir uma página de token no dexscreener.com em navegador desktop real e clicar no botão amarelo "Boost" para ver o modal de compra.