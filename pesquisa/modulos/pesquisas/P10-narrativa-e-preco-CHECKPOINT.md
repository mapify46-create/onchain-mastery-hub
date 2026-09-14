# CHECKPOINT: Existe estudo REVISADO POR PARES sobre atenção social e preço feito ESPECIFICAMENTE com memecoins de launchpad (tipo pump.fun)?

*Data de consulta de todas as fontes: 13 de setembro de 2026. Pergunta restrita conforme o escopo do checkpoint.*

## 1. Resposta em uma frase

**PARCIALMENTE — mas, no sentido estrito da pergunta, NÃO.** Existem estudos REVISADOS POR PARES feitos ESPECIFICAMENTE com memecoins de launchpad (pump.fun), e existem estudos revisados por pares que medem atenção social em memecoins Solana, mas **NENHUM estudo revisado por pares relata um número que ligue uma variável de ATENÇÃO SOCIAL a uma variável de PREÇO/RETORNO** (correlação, regressão, causalidade de Granger ou hazard ratio) especificamente para memecoins de launchpad. Os revisados por pares ou (a) são de launchpad e têm variável social, mas só apresentam médias descritivas sem teste estatístico entre as duas (Long, Wong & Cai, WWW '25); ou (b) medem sentimento social mas o correlacionam com **frequência de transações, não com preço/retorno**, e sem informar a fração de launchpad (Li, Yao, Huo & Cai, ACM Web Science '25); ou (c) são de launchpad e preço, mas **sem variável social** (Mongardini & Mei, USENIX Security '26). O único trabalho que dá um número direto atenção-social → resultado de preço/sucesso em launchpad (presença de Telegram → 8,94× mais "graduação") é **PREPRINT, não revisado por pares** (Kamat, 2026).

"Parcialmente" significa, portanto: **há literatura revisada por pares sobre pump.fun, e há literatura revisada por pares sobre atenção social em memecoins Solana — mas a interseção exata (atenção social ↔ preço, com número, em launchpad) só existe hoje em preprints.**

## 2. Tabela dos estudos candidatos

| Estudo | Status hoje (como verificado) | Amostra | Launchpad(s) | Variável social | Variável de preço | Horizonte | Resultado principal (do texto) | Link | Acesso |
|---|---|---|---|---|---|---|---|---|---|
| Long, Wong & Cai (2025), "Bridging Culture and Finance: A Multimodal Analysis of Memecoins in the Web3 Ecosystem" (dataset Coin-Meme) | **REVISADO POR PARES** — WWW Companion '25, ACM, pp. 1158–1161, DOI 10.1145/3701716.3715561 (verificado na ACM Digital Library) | 3.751 memecoins pump.fun que graduaram para Raydium, jan–nov 2024 | 100% pump.fun | Comentários/usuário; razão comentários positivos/negativos; variabilidade de sentimento (BERT) | Market cap (95º percentil); "Market Entry Time" | Estático (só tokens já graduados) | SÓ médias por cluster (Tabela 1): Cluster 2 (sátira política) maior razão pos/neg (1,64) e menor Market Entry Time (4.728 s); Cluster 0 (humor) maior mcap 95%: US$33.557,5. **NENHUMA correlação/regressão/p-valor entre variável social e preço.** | https://dl.acm.org/doi/10.1145/3701716.3715561 | página aberta |
| Li, Yao, Huo & Cai (2025), "Trust Dynamics and Bot-Driven Responses: An Approach to Rug Pulls in Solana Meme Coin Markets" | **REVISADO POR PARES** — 17th ACM Web Science Conf. 2025, pp. 106–116, DOI 10.1145/3717867.3717922 (verificado na ACM DL) | 767 projetos de memecoin Solana (amostrados do DexScreener), 15/mai–15/ago 2024; +X/Twitter (1.863 tweets oficiais, 36.508 comentários, 6.168 posts públicos); 754.849 transações | Solana em geral (do DexScreener; **fração pump.fun NÃO informada**) | Sentimento X/Twitter (texto+imagem, BERT+ResNet); redes de propagação de sentimento | **Frequência de transações (compra/venda) — NÃO preço/retorno** | Ciclo de vida do projeto | Correlação de Spearman sentimento×frequência (Tabela 2): rug pull positivo×compra=0,15 (p<0,01); sustentáveis positivo×compra=0,31 (p<0,01), negativo×venda=0,41 (p<0,01). SD de sentimento: rug 0,0811 vs sustentável 0,004903. **Variável dependente é transação, não preço.** | https://dl.acm.org/doi/10.1145/3717867.3717922 | página aberta |
| Mongardini & Mei (2026), "A Midsummer Meme's Dream: Investigating Market Manipulations in the Meme Coin Ecosystem" | **REVISADO POR PARES** — aceito USENIX Security 2026 (verificado na página do programa USENIX) | 34.988 tokens: Ethereum, BNB, Solana, Base; 3 meses; 707 tokens de alto retorno | Multi-chain (inclui launchpads) | **NENHUMA** (só on-chain) | Retorno; manipulação | 3 meses | 82,6% dos tokens de alto retorno (>100%) mostram crescimento artificial (wash trading, LPI). **NÃO usa variável social. NÃO responde à pergunta.** | https://www.usenix.org/conference/usenixsecurity26/presentation/mongardini | página aberta |
| Marino, Naviglio, Tarantelli & Lillo (2026), "Predicting the success of new crypto-tokens: the Pump.fun case" | **PREPRINT** — arXiv 2602.14860; SSRN 6543715 (ResearchGate marca "Preprint... may not have been peer reviewed"; página do autor Lillo lista como "Preprints (2026)") | 655.770 tokens pump.fun, set–out 2025 | 100% pump.fun | **NENHUMA** (só on-chain: SOL na bonding curve, bots, nº de endereços) | Probabilidade de graduação | Minutos–horas | Taxa de graduação 0,63%; condicionar em variáveis on-chain melhora a previsão. **Sem variável social.** | https://arxiv.org/abs/2602.14860 | página aberta |
| Kamat (2026), "Pump.fun Graduation Regime Windows: Survival Analysis of 832,941 Token Launches and the Social-Presence Effect" | **PREPRINT** — arXiv 2607.02823; SSRN 6915560 (autopublicado, com corrigenda própria; sem DOI de periódico/conferência) | 832.941 lançamentos pump.fun, 8/mai–10/jun 2026 | 100% pump.fun | **Presença** de canais sociais declarados no metadata (Twitter/X, site, Telegram) — presença, não volume/sentimento/menções | Graduação (migração p/ PumpSwap) | 24h | Com Telegram: graduam a 1,485% vs 0,166% sem (8,94× lift, log-rank p<1e-300); Cox HR Telegram=5,40 (IC 95% [4,73; 6,17]); os 3 canais: 1,919% vs 0,110% (17,4× lift). Autoauditoria: coletor cobriu só ~6 min pós-lançamento → taxa é limite inferior. | https://arxiv.org/abs/2607.02823 | página aberta |
| Mancino (2025), "The Memecoin Phenomenon: An In-Depth Study of Solana's Blockchain Trends" | **PREPRINT** — arXiv 2512.11850 | Dados Dune, pump.fun Q4 2024 | 100% pump.fun | **NENHUMA** | Graduação; transações DEX | Q4 2024 | "Pump.fun accounted for up to 71.1% of all tokens minted on Solana and contributed 40–67.4% of total DEX transactions... fewer than 2% of tokens successfully transitioned to major decentralized exchanges"; usuários ativos diários de 60.000 a picos de 260.000. **Sem variável social.** | https://arxiv.org/abs/2512.11850 | página aberta |
| Conlon & Corbet (2025), "Memecoin contagion: Irrationality, illicit behaviour, and Cryptocurrency risk" | **REVISADO POR PARES** — Finance Research Letters, v.86 Pt A (dez/2025), 108264, DOI 10.1016/j.frl.2025.108264 (verificado na ScienceDirect) | On-chain + mercado; memecoins de launchpad como "fonte" de contágio | Ethereum/Solana launchpads (agregado) | "Sentiment contagion" no nível de setor (não menções por token) | Risco/volatilidade de BTC e cripto majors (EGARCH) | Diário | Crescimento de memecoins aumenta risco sistêmico; "strong evidence of sentiment contagion from launchpads to the entire memecoin sub-class". **Não relaciona atenção social por token de launchpad com preço daquele token.** | https://www.sciencedirect.com/science/article/pii/S1544612325015181 | página aberta |

## 3. Separação explícita por categoria

### (a) Revisados por pares que RESPONDEM à pergunta (atenção social + preço + launchpad, com número)
**NENHUM.** Não foi encontrado nenhum estudo revisado por pares que relate um número (correlação, regressão, Granger ou hazard ratio) ligando uma variável de atenção social a uma variável de preço/retorno **especificamente para memecoins de launchpad**.

### (b) Revisados por pares apenas ADJACENTES
- **Long, Wong & Cai (2025), WWW Companion '25** — **O candidato mais próximo em escopo.** É pump.fun (launchpad) E tem variável social (comentários, sentimento), MAS **não relaciona estatisticamente** as duas: só apresenta médias descritivas por cluster (Tabela 1), sem correlação/regressão/p-valor entre sentimento e preço. Metodologicamente não fecha a pergunta.
- **Li, Yao, Huo & Cai (2025), ACM Web Science '25** — Tem variável social (sentimento X/Twitter) E relaciona quantitativamente (correlação de Spearman), MAS o alvo é **frequência de transação, não preço/retorno**, e a amostra é de memecoins Solana do DexScreener **sem fração pump.fun/launchpad informada**. Adjacente por dois motivos (variável de resultado errada + launchpad não identificado).
- **Mongardini & Mei (2026), USENIX Security '26** — É launchpad/multi-chain com preço/retorno, MAS **sem variável de atenção social** (só manipulação on-chain: wash trading, LPI, pump-and-dump).
- **Conlon & Corbet (2025), Finance Research Letters** — Fala em "contágio de sentimento dos launchpads", mas trabalha no nível agregado de setor e liga ao risco de BTC/cripto majors, não à atenção social por token de launchpad vs o preço daquele token.

### (c) Preprints mais próximos (NÃO revisados por pares)
- **Kamat (2026), arXiv 2607.02823 / SSRN 6915560** — **O único trabalho que dá um número direto atenção-social → resultado de preço/sucesso em launchpad**: presença de Telegram → graduação 8,94× maior (1,485% vs 0,166%); Cox HR=5,40; os três canais → 17,4× lift. Ressalva importante: mede *presença declarada* de canal social no metadata, não volume/sentimento/menções reais; e tem autoauditoria admitindo cobertura de ~6 min pós-lançamento (taxas são limite inferior). **Status: PREPRINT.**
- **Marino et al. (2026), arXiv 2602.14860 / SSRN 6543715** — Modela graduação em pump.fun (655.770 tokens), mas só com variáveis on-chain, **sem atenção social**. Preprint.

### (d) Relatórios de empresa / dados de indústria (NÃO acadêmicos, NÃO revisados por pares)
- **CoinGecko Research** (relatório de 9/mai/2026 "Pump.fun Traders Are Making a Comeback", autor Loke Choon Khei): das ~3,14 milhões de carteiras ativas na pump.fun em abril/2026, 2,30 milhões (73,28%) fecharam o mês lucrativas — quarto mês consecutivo acima de 50%, ante mínima de 30,08% em jun/2025; 65,1% dos lucros ficaram entre US$1 e US$500. Ressalva do autor: *"While we cannot conclusively explain this reversal, we hypothesize it reflects a natural exodus of unprofitable traders from the platform... supported by the continuous decline in monthly active wallets from its peak of 5.2M in May 2025 to 1.8M in December 2025."* Mede apenas PnL realizado; não filtra bots nem wash trading.
- **Chainalysis**, "2025 Crypto Crime Report" (blog de 29/jan/2025, corrigido 13/fev/2025): de +3 milhões de tokens lançados em 2024, ~1,29 milhão (42,54%) foram listados em DEX; a firma estima que ~90% ("nearly 90%") dos pools de DEX suspeitos de pump-and-dump foram "rugged" pelo próprio criador; wash trading suspeito em Ethereum, BNB e Base somou ~US$2,57 bilhões em 2024; apenas 1,7% dos tokens tiveram negociação ativa nos 30 dias anteriores.
- **Dune Analytics**: dados citados por CoinGecko Research (mai/2026) registram volume DEX diário recorde da pump.fun de US$2,03 bilhões em 6/jan/2026 (via DefiLlama) e queda de carteiras ativas mensais de 5,2 milhões (mai/2025) para 1,8 milhão (dez/2025).

Nenhum destes é revisado por pares; quando cruzam atenção e preço, é apenas de forma descritiva.

## 4. Divergências entre fontes
- **Taxa de graduação do pump.fun** diverge por período e método, e as fontes NÃO são estritamente comparáveis:
  - Mancino (2025): "fewer than 2%" (Q4 2024, dados Dune, descritivo).
  - Marino et al. (2026): 0,63% (set–out 2025, estimação por binning/probabilidade condicional).
  - Kamat (2026): 0,198% (mai–jun 2026, Kaplan-Meier, janela 24h, **com viés de cobertura de ~6 min admitido pelo próprio autor** → deve ser lido como "limite inferior de regime rápido", não estimativa da taxa de 24h).
  - Diferença de método: descritivo agregado (Mancino) vs. probabilidade condicional (Marino) vs. análise de sobrevivência (Kamat). A queda ao longo do tempo pode ser parcialmente real (mudança de composição para lançamentos sem "self-buy") e parcialmente artefato de coleta.

## 5. NÃO VERIFICADOS / pontos em aberto
- **Status de publicação dos preprints:** até 13/09/2026, Marino et al. (2026) e Kamat (2026) permanecem **preprints (arXiv/SSRN); status NÃO confirmado como revisado por pares** — a página do próprio autor Lillo lista Marino et al. como "Preprints (2026)".
- **Outros launchpads:** Não foi localizado NENHUM estudo revisado por pares com dados de **LetsBonk, SunPump (Tron), Four.meme (BNB), Moonshot, Believe ou Zora** relacionando atenção social a preço. (Li et al. usam Solana genérico via DexScreener, sem identificar launchpad.)
- **Mongardini & Mei:** confirmado como aceito no USENIX Security 2026 (peer-reviewed), mas não usa variável social — logo não muda a resposta.

## 6. Glossário para leigos (termos usados acima)
- **Correlação:** número de −1 a +1 que mede se duas coisas sobem/descem juntas. +1 = andam juntas; 0 = sem relação; −1 = uma sobe quando a outra desce. (Ex.: 0,15 = relação positiva fraca.)
- **Correlação de Spearman:** correlação baseada na ordem/ranking dos valores; robusta a valores extremos.
- **Regressão:** modelo que estima quanto uma variável muda o valor de outra, isolando outros fatores.
- **Causalidade de Granger:** teste que verifica se o passado de X ajuda a prever Y melhor do que o passado de Y sozinho (não prova causa real).
- **Significância / p-valor:** probabilidade de o resultado ter surgido por acaso. p<0,05 costuma ser chamado "estatisticamente significativo"; p<1e-300 é um valor extremamente pequeno (efeito muito improvável de ser acaso).
- **Hazard ratio (HR):** em análise de sobrevivência, quanto um fator multiplica a "taxa" instantânea de um evento ocorrer. HR=5,40 = multiplica por ~5,4 a chance instantânea de graduar.
- **Kaplan-Meier / Cox proportional hazards:** métodos de "análise de sobrevivência" que estimam se/quando um evento (graduação) ocorre ao longo do tempo.
- **Retorno anormal:** retorno acima do esperado pelo mercado; usado para isolar o efeito de um evento.
- **Graduar / migrar:** quando um token de pump.fun acumula liquidez suficiente na bonding curve (≈85 SOL) e passa a ser negociado num DEX (Raydium/PumpSwap).
- **Bonding curve:** fórmula que fixa o preço do token conforme a quantidade já comprada (quanto mais se compra, mais caro); o token é negociado contra a fórmula antes de graduar.
- **Wash trading:** negociações fictícias do mesmo agente para simular volume/interesse.
- **LPI (Liquidity Pool-based Price Inflation):** pequenas compras estratégicas que disparam grande alta de preço, criando aparência de interesse.

## 7. Consultas efetivamente realizadas (ferramenta + termos)
1. Scholar Gateway (busca semântica): "Does social media attention such as Twitter mentions predict price returns of launchpad memecoins created on pump.fun on the Solana blockchain?"
2. Scholar Gateway: "Empirical analysis of pump.fun bonding curve token launches, token graduation to Raydium, and rug pulls on Solana"
3. web_search: "pump.fun memecoin empirical study social media attention price"
4. web_search: "pump.fun Solana memecoin arXiv analysis"
5. web_search: "memecoin launchpad graduation bonding curve empirical paper"
6. web_fetch: arXiv 2607.02823 (Kamat)
7. web_search: "memecoin Twitter mentions price returns Solana peer reviewed journal"
8. web_search: "Coin-Meme Niu memecoin multimodal community comments market cap venue"
9. web_fetch: arXiv 2412.04913 (Long/Wong/Cai)
10. web_search: "Marino memecoin pump.fun graduation 655770 tokens 2026 study journal"
11. web_search: "Li Yao Huo Cai trust dynamics bot rug pulls solana meme coin ACM Web Science 2025"
12. web_fetch: faculty.washington.edu ... YueyaoLYHC2025.pdf (Li et al., texto integral)
13. web_search: "Marino Mei pump.fun 655770 tokens graduation February 2026 arXiv Midsummer Meme's Dream market manipulation"
14. web_search: "Conlon Corbet memecoin contagion Finance Research Letters launchpad"
15. web_search: "pump.fun token returns X Twitter mentions influencer SSRN working paper"
16. web_search: "meme coin social media attention returns peer reviewed 2026 Solana launchpad journal"
17. web_search: "LetsBonk SunPump Four.meme launchpad token empirical academic study returns"
18. web_search: "memecoin Google Trends attention pump.fun price returns regression study"
19. web_search: "Believe app social attention token launch academic paper Solana KOL mentions price"
20. web_search: "'Predicting the success of new crypto-tokens' Pump.fun Lillo published journal peer reviewed"
21. web_search: "pump.fun memecoin study social attention returns Financial Innovation Journal of Financial Stability 2026"
22. run_blocking_subagent: verificação de status revisado por pares (DOIs/páginas de conferência) e extração dos números dos resultados/tabelas de Long/Wong/Cai, Li et al. e Mongardini & Mei, e busca por outros revisados por pares.

---

**CONTINUA — faltam (para a etapa seguinte, NÃO feita agora, conforme instrução):** levantamento completo sobre atenção-antes-do-preço em cripto em geral; reversão; narrativas/rotação; primeiro token vs cópias; problemas de método. Este checkpoint restringe-se à pergunta única acima.