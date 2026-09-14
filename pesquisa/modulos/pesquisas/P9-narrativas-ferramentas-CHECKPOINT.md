## CHECKPOINT — Ferramentas de rastreamento de ATENÇÃO/NARRATIVA em memecoins (Solana)
**Data de referência: 13/09/2026. Data de consulta de todas as fontes abaixo: 13/09/2026.**

Este é só o checkpoint pedido: para cada candidata, se **existe hoje**, se **cobre Solana**, se cobre **memecoin recém-lançada** (quando apurado) e a **função de atenção em uma frase**, com fonte, link e marcação "(página aberta)" ou "(só snippet)". Não escrevi o documento completo.

**Termos (explicados na 1ª aparição):** "trending" = lista/ranking de tokens "em alta" montada por atividade recente; "boost" = compra paga que aumenta artificialmente a pontuação/visibilidade de um token numa lista; "smart money" = carteiras rotuladas como de traders historicamente lucrativos; "mindshare" = fatia de atenção/discussão que um projeto capta nas redes; "social volume" = número de menções/posts sobre um ativo.

---

### Tabela-resumo

| # | Ferramenta | Existe hoje? | Cobre Solana? | Memecoin recém-lançada? | Função de atenção (1 frase) | Fonte (link) + marcação |
|---|-----------|--------------|---------------|--------------------------|------------------------------|--------------------------|
| 1 | **DexScreener** (trending + boosts) | CONFIRMADO | SIM | SIM (indexa on-chain em tempo real, sem moderação humana) | Lista "trending" ordenada por um "Trending Score" proprietário (buzz + atividade de mercado) e "Boosts" pagos que multiplicam esse score. | docs.dexscreener.com/boosting e docs.dexscreener.com **(página aberta)** |
| 2 | **GMGN** (trending + smart money) | CONFIRMADO | SIM | SIM (varre Pump.fun, letsbonk, Raydium) | Leaderboard "Trending" atualizado a cada minuto por contagem de compra/venda, volume, variação de preço e crescimento de holders; também rastreia smart money e KOLs. | gmgn.ai/trend **(página aberta)** |
| 3 | **Birdeye** (trending) | CONFIRMADO | SIM (é Solana-first) | SIM | Feed "Trending Tokens" (top movers em janelas configuráveis) e "Find Gems" com filtros como "Most Viewed"/"Most Watched"/"Most Trades". | birdeye.so e birdeye.so/find-gems **(página aberta)** |
| 4 | **pump.fun** (board/trending) | CONFIRMADO | SIM (é a própria launchpad de Solana) | SIM (é onde nascem) | O "board" ordenável (ex.: "Movers", market cap, last trade) mostra quais memecoins têm atividade recente; é atividade de trade, não algoritmo social sofisticado. | pump.fun/explore e pump.fun/board **(página aberta)** |
| 5 | **LunarCrush** | CONFIRMADO | SIM (tópico "Solana Meme Coin" e categoria "Memecoins") | PARCIAL (adiciona moedas automaticamente por novos pools + redes; canal privado avisa ~2h antes) | Mede sentimento e social volume em 40+ categorias, incluindo cripto, a partir de X, Reddit, YouTube e TikTok; métricas próprias Galaxy Score™ e AltRank™. | lunarcrush.com e lunarcrush.com/topic/solana-meme-coin **(página aberta)** |
| 6 | **Santiment** | CONFIRMADO | SIM (lançou cobertura Solana em ago/2025) | NÃO VERIFICADO (cobre 2.500+ ativos listados; social por ticker/tópico) | "Social Trends"/social volume e sentimento coletados de mais de 6.000 canais sociais de cripto; a cada 60 min calcula o Top 10 de palavras com maior spike vs. média de 2 semanas. | academy.santiment.net/sanbase/social-trends e app.santiment.net **(página aberta)** |
| 7 | **Kaito** | CONFIRMADO | PARCIAL | NÃO (unidade é projeto/ticker/narrativa/setor e campanhas pré-token, não memecoin individual recém-lançada) | Mede "mindshare" (fatia de atenção) de projetos e narrativas; "Yaps" foi encerrado em jan/2026, mas Kaito Pro, Mindshare Arena, Studio e Capital Launchpad seguem ativos. | kaito.ai e docs.kaito.ai/overview/kaito-pro-ai-platform **(página aberta)** |
| 8 | **Google Trends** | CONFIRMADO | SIM (qualquer termo, ex.: "solana", nome de memecoin) | PARCIAL (só se o termo tiver volume de busca suficiente; termos obscuros dão "dados insuficientes") | Interesse de busca relativo (0–100) por termo/tempo/região, a partir de buscas no Google e YouTube. | developers.google.com/search/docs/monitor-debug/trends-start **(página aberta)** |
| 9 | **X (Twitter)** — busca avançada e listas | CONFIRMADO | SIM (qualquer conteúdo público) | SIM (busca por ticker/contrato em tempo real) | Operadores de busca (from:, min_faves:, since:/until:, filter:) e aba "Latest" para monitorar menções; formulário em x.com/search-advanced. | help.x.com/en/using-x/x-advanced-search **(só snippet)** |
| 10 | **Arkham Intelligence** (smart money) | CONFIRMADO | SIM (Solana ao vivo desde 25/10/2024) | PARCIAL (rastreia grandes fluxos e traders de topo; lançou trading on-chain em Solana) | Alertas em tempo real de transações, rastreio de portfólios de traders lucrativos e visualização de fluxos. | arkm.com + anúncio de integração Solana (@ArkhamIntel, 25/10/2024) **(só snippet)** |
| 11 | **Nansen** (smart money) | CONFIRMADO | SIM (estendeu Smart Money a Solana em 2024) | PARCIAL (cobertura Solana mais estreita que EVM; "Token God Mode" grátis para tokens Solana) | Dashboards de Smart Money, netflows, Hot Contracts e Smart Alerts baseados em carteiras rotuladas. | nansen.ai + docs.nansen.ai/api/smart-money **(só snippet)** |
| 12 | **Bots de Telegram de alerta** — ex. nominal: **BONKbot Token Alerts Channel** | CONFIRMADO | SIM (BONKbot é exclusivo Solana) | SIM (avisa novos pools, LP queimada, mint renunciada, "fresh wallets") | Canal de alertas com deeplinks de compra para tokens novos que batem certos critérios; também "Alpha Alerts". | docs.bonkbot.io/community-and-support/bonkbot-alert-channel **(página aberta)** |

**Detalhe apurado sobre o "comprável" (adiantando um ponto crítico do item B da tarefa completa):** os **pacotes de Boost do DexScreener têm preços documentados** — 10 Boosts US$99 (12h), 30 por US$249 (12h), 50 por US$399 (12h), 100 por US$899 (24h) e 500 por US$3.999 (24h), sendo que 500+ Boosts ativos desbloqueiam o "Golden Ticker" (símbolo dourado). A própria doc frisa que os Boosts são "apenas um de muitos fatores" do algoritmo de ranking (docs.dexscreener.com/privacy/boosting-terms-and-conditions) **(só snippet)**. Ou seja: a lista de "em alta" do DexScreener **pode ser influenciada por pagamento**.

---

### Outras ferramentas relevantes encontradas (nome + existe + cobre Solana + o que faz)
- **Telemetry** (telemetry.io, da BONKbot) | CONFIRMADO | Solana: SIM | Rastreia até 800 carteiras/whales simultâneas com detecção de "confluência" quando carteiras rastreadas entram no mesmo token. — solanacompass.com/projects/bonkbot **(só snippet)**
- **Messari Solana Portal** (leaderboard "by Mindshare") | NÃO VERIFICADO | Solana: aparentemente SIM | Leaderboard de mindshare do ecossistema Solana. — citado por blockworks.com **(só snippet)**
- **Wallchain** (leaderboard de mindshare de Solana) | NÃO VERIFICADO | Solana: SIM (segundo reportagem) | Descrito como o primeiro leaderboard a medir especificamente o mindshare de Solana. — blockworks.com **(só snippet)**

---

### Resposta direta à sua pergunta: quais candidatas CONFIRMEI que EXISTEM e COBREM SOLANA hoje?
**Confirmadas como existentes E cobrindo Solana (11):** DexScreener, GMGN, Birdeye, pump.fun, LunarCrush, Santiment, Google Trends, X (busca avançada), Arkham, Nansen e bots de Telegram (BONKbot). **Kaito** também existe e está ativo, mas a cobertura de Solana é **PARCIAL** (indexa projetos do ecossistema Solana e permite ligar carteira Solana, porém não confirmei, na página oficial, um leaderboard de mindshare dedicado a Solana; e **não** rastreia memecoins individuais recém-lançadas). **Nenhuma candidata foi descartada.**

---

### NÃO VERIFICADOS (o que não fechou nesta rodada)
- **Santiment × memecoins Solana recém-lançadas individualmente:** parece focar em ativos já listados (2.500+); não confirmei cobertura de token individual recém-criado. NÃO VERIFICADO.
- **Kaito com leaderboard de mindshare dedicado a Solana na página oficial:** a página é um app JavaScript que não renderizou os nomes das abas; reportagem atribui o 1º leaderboard Solana à Wallchain. NÃO VERIFICADO no primário.
- **Messari Solana Portal e Wallchain:** existência confirmada apenas por fonte secundária; não abri a página oficial. NÃO VERIFICADO.
- **Preços/planos oficiais completos** de cada ferramenta (Birdeye Pro, Nansen, LunarCrush, Santiment, X Premium+ etc.): fora do escopo deste checkpoint; virão da página oficial de preços na etapa completa. NÃO VERIFICADO aqui.
- **Profundidade exata da cobertura Solana de Arkham/Nansen para memecoins de baixíssima capitalização recém-lançadas:** ambos confirmados em Solana, mas cobertura de novas memecoins minúsculas marcada como PARCIAL. NÃO VERIFICADO em detalhe.

---

### Consultas (queries) feitas nesta rodada
1. DexScreener trending boosts Solana how it works
2. GMGN trending Solana memecoin tracker smart money
3. Birdeye trending tokens Solana
4. pump.fun trending board king of the hill Solana
5. (fetch) docs.dexscreener.com + gmgn.ai/trend
6. (fetch) lunarcrush.com + santiment.net + kaito.ai
7. Arkham Intelligence Solana support wallet tracker
8. Nansen Solana smart money support
9. LunarCrush Solana tokens memecoin coverage
10. Santiment Solana social metrics support tokens
11. DexScreener boosts price docs official
12. (fetch) docs.dexscreener.com/boosting
13. Telegram bot alerts new Solana token buy alerts
14. X advanced search lists monitor crypto trending
15. (fetch) birdeye.so/find-gems + docs.bonkbot.io
16. Google Trends crypto memecoin search interest
17. Kaito mindshare crypto attention Solana
18. Santiment Solana data coverage insight 2025
19. Arkham Intelligence Solana integration announcement
20. DexScreener trending score how it works docs
21. GMGN trending list Solana memecoin how to use
22. pump.fun trending tab new coins board
23. Birdeye trending free tier Solana tokens
24. LunarCrush Galaxy Score AltRank what it measures docs
25. Kaito AI crypto only or stocks coverage mindshare 2026
26. BONKbot alert channel Solana new tokens
27. DexScreener boost pack price cost SOL
28. X twitter advanced search operators filter crypto real time
29. Google Trends explore keyword search interest tool how works
30. LunarCrush new memecoin coverage how tokens added listed
31. Nansen free tier Solana token god mode pricing 2026
32. Santiment social trends only large cap coins listed asset requirement
33. (subagente) verificação focada de cobertura Solana/memecoin do Kaito

**Aguardando sua resposta para escrever o documento completo.**