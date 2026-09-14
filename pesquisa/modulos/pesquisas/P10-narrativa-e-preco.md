# LEVANTAMENTO (Etapa 2): Narrativa / atenção social prevê preço de cripto e memecoin? — o que a evidência revisada por pares realmente permite dizer

*Data de referência: 13–14 de setembro de 2026. Toda fonte consultada em 13–14/09/2026.*

## TL;DR (3 pontos)
- **Ler narrativa/atenção social ajuda pouco a prever a DIREÇÃO do preço, e nada de forma confiável em memecoin.** Em cripto grande (BTC/ETH e top-9) a atenção prevê melhor **volume e volatilidade** do que retorno; quando prevê retorno, o efeito é curto (minutos a ~1–2 dias), não-linear, dependente de regime e **some fora da amostra**.
- **O padrão "sobe e devolve" está medido e é a regularidade mais confiável.** Tweets de influenciadores dão +1,83% em 1 dia e −6,53% em 30 dias (Merkley et al. 2024); tweets de Musk dão retorno anormal de ~+3,58% em 2 minutos (Ante 2023); atenção via Google mostra só reversão *parcial* (Hoang & Baur 2024).
- **Para memecoin de launchpad NÃO existe estudo revisado por pares ligando atenção social a retorno com número, e ninguém testou uma estratégia de atenção líquida de custos realistas de memecoin.** O pouco que se mede aponta que memecoins são *menos* previsíveis por sinal social e que 82,89% dos memecoins de alto retorno têm crescimento artificial (Mongardini & Mei, USENIX 2026).

---

## (1) TABELA-RESUMO DE ESTUDOS

| Fonte | Status | Amostra (ativos, qtd, período) | Variável de atenção | Horizonte | Resultado numérico + direção | Reversão? | Link | Consulta |
|---|---|---|---|---|---|---|---|---|
| Merkley, Pacelli, Piorkowski & Williams (2024), *Review of Accounting Studies* | REVISADO POR PARES (etapa 1) | Tweets de "cripto-influenciadores" | Tweets de influenciadores | 1, 10, 30 dias | +1,83% (1d), −2,24% (10d), −6,53% (30d) | SIM (mede sobe-e-devolve) | (referência etapa 1) | — |
| Kristoufek (2013), *Scientific Reports* | REVISADO POR PARES (citado) | Bitcoin, ~2011–2013 | Google Trends + Wikipedia | Semanal | Relação bidirecional busca↔preço; feedback positivo | Não isola | via surveys | 14/09 (só snippet) |
| Garcia, Tessone, Mavrodiev & Perony (2014), *J. R. Soc. Interface* | REVISADO POR PARES (citado) | Bitcoin | Boca-a-boca + Google + novos usuários | Diária | Influência significativa sobre variação de preço; ciclos de feedback | Menciona "sell-offs" após picos | via surveys | 14/09 (só snippet) |
| Shen, Urquhart & Wang (2019), *Economics Letters* | REVISADO POR PARES (citado) | Bitcoin | Nº de tweets | Diária | Nº de tweets prevê volume e volatilidade; NÃO retornos (linear) | — | via surveys | 14/09 (só snippet) |
| Kraaijeveld & De Smedt (2020), *J. Int. Fin. Markets, Inst. & Money* | REVISADO POR PARES (página aberta) | 9 maiores criptos (BTC, ETH, XRP, BCH, EOS, LTC, ADA, XLM, TRX) | Sentimento Twitter (léxico) + Granger bilateral | Diária | Prevê retorno só de BTC, BCH, LTC; 1–14% dos tweets são de bots | Não mede | ideas.repec.org; research.ed.ac.uk | 14/09 (página aberta) |
| Naeem et al. (2020/21), *International Review of Finance* | REVISADO POR PARES (página aberta) | 6 criptos (BTC, ETH, XRP, LTC, XMR, DASH), 08/2015–12/2019 | Índice de felicidade do Twitter (Hedonometer) | Diária | Sem causalidade linear; NÃO-linear significativa (1% p/ 5 das 6) | Não mede | onlinelibrary.wiley.com (irfi.12339) | 14/09 (página aberta) |
| Hang, Zhang & Bueno (2021), *Complexity* | REVISADO POR PARES (página aberta) | Bitcoin, 07/2011–06/2021 (3.626 obs.) | Google search volume | Diária | Causalidade atenção→retorno só em alta volatilidade; varia por quantil | — | onlinelibrary.wiley.com (5543995) | 14/09 (página aberta) |
| Bleher & Dimpfl (2019), citado em survey | REVISADO POR PARES (citado) | 12 criptos, intradiário (horário) | Google search volume | Horária | Retornos NÃO previsíveis; volatilidade parcialmente | — | via joes.12412 | 14/09 (só snippet) |
| Ante (2023), *Technological Forecasting & Social Change* | REVISADO POR PARES (página aberta) | BTC, DOGE; 47 eventos de tweets de Musk | Tweets de Elon Musk (evento) | 2 min–horas | "Musk Effect": ~+3,58% em 2 min; preço significativo só p/ DOGE; tweets isolados movem BTC +16,9%/−11,8% | Implícita (pos. e neg. se cancelam em BTC) | sciencedirect.com S0040162522006333; DOI 10.1016/j.techfore.2022.122112 | 14/09 (página aberta) |
| Guégan & Renault (2021), *Finance Research Letters* | REVISADO POR PARES (página aberta) | Bitcoin, ~1 mi msgs StockTwits, intradiário | Sentimento social (StockTwits) | 5–15 min | Prevê retorno só até 15 min; some depois; "custos razoáveis tornam impossível lucro anormal" | Some com atraso | sciencedirect.com S1544612319314199; DOI 10.1016/j.frl.2020.101494 | 14/09 (página aberta) |
| Hoang & Baur (2024), *J. Behavioral and Experimental Finance* 44, 100991 | REVISADO POR PARES (resumo confirmado) | Corte transversal de criptos | Volume anormal de busca Google | Semanal | Maior busca → maiores retornos/vol./volume (price-pressure); efeito maior nas grandes; só reversão PARCIAL | SIM (parcial) | sciencedirect.com S2214635024001060 | 14/09 (só snippet; 429) |
| Nguyen et al. (2024), *PLOS One* | REVISADO POR PARES (página aberta) | Top-20 criptos, 01/2016–04/2021 (6.606 obs.) | Google Trends + reversão (2SLS) | Diária | Atenção → retorno positivo; +1,09 pp mais forte na pandemia | Reversão positiva antes, negativa durante COVID | journals.plos.org pone.0304377 | 14/09 (página aberta) |
| Li, Yao, Huo & Cai (2025), *ACM Web Science '25* | REVISADO POR PARES (conferência; etapa 1) | Memecoins Solana (pump.fun), rug pulls | Sentimento X × confiança/bots | — | Liga sentimento/bots a rug pulls; NÃO liga a preço com coeficiente | — | DOI 10.1145/3717867.3717922 | (etapa 1) |
| Long, Wong & Cai (2025), *WWW Companion '25* | REVISADO POR PARES (conferência; etapa 1) | pump.fun | Só médias descritivas | — | Sem coeficiente atenção→preço | — | DOI 10.1145/3701716.3715561 | (etapa 1) |
| Mongardini & Mei (2026), "A Midsummer Meme's Dream", *USENIX Security 2026* | REVISADO POR PARES (conferência; página aberta) | 34.988 memecoins (ETH, BSC, Solana, Base), 3 meses | Nenhuma variável social; manipulação on-chain | 3 meses | 82,89% dos tokens de alto retorno (>100%) com crescimento artificial (586 de 707); perdas >US$9,3 mi, >17.000 vítimas | — | usenix.org/.../mongardini; arXiv 2507.01963 | 14/09 (página aberta) |
| Szwajcok, Tsuchiya, Liu, Soska, Payer & Christin (2026), "Meme Coin Factories" | PREPRINT (arXiv 2609.10246, 09/09/2026) | 15,2 mi coins pump.fun; amostra 1% + 87 mi transações; 01/2024–01/2026 | Comentários/posts sociais + copycats | — | 1,5 mi (>10%) copycats; 17,7% dos graduados são copycats; original tem vantagem de 1º entrante que "desaparece rápido"; 3,5 mi (23,5%) coins criados após posts X/Truth Social; 31 posts renderam ≥US$1 mi cada | — | arxiv.org/html/2609.10246v1 | 14/09 (página aberta) |
| David (2025/26), "TRUMP Memecoin…" | PREPRINT/status NÃO VERIFICADO | Token TRUMP (Solana), 01/2025– | Eventos promocionais + concentração | ~14 meses | Queda de 93,4% do pico (US$45,50→US$3,00); ~80% do supply em entidades ligadas a Trump; eventos só criaram picos temporários | SIM (picos temporários, tendência de queda) | researchgate.net 403211511 | 14/09 (só snippet) |
| Fan, Talavera & Tran (2019), *European Financial Management* | REVISADO POR PARES (página aberta) | 55 empresas FTSE 100 (AÇÕES, não cripto) | Tweets de bots × mercado | Diário/intradiário | Tweets de bots relacionados a retornos, volatilidade e volume | — | onlinelibrary.wiley.com eufm.12245 | 14/09 (só snippet) |
| Varol et al. (2017), "Online Human-Bot Interactions" | REVISADO POR PARES / PREPRINT-conf (contexto bots) | Twitter geral | Prevalência de bots | — | 9%–15% das contas ativas do Twitter são bots | — | arXiv:1703.03107 | 14/09 (via JASIST) |
| Arroyo-Machado et al. (2025), *JASIST* | REVISADO POR PARES (página aberta) | 3,7 mi papers, 51 mi menções Twitter (contexto) | Prevalência de bots | — | 0,23% das contas são bots mas geram 4,72% das menções | — | onlinelibrary.wiley.com asi.24998 | 14/09 (página aberta) |
| Chainalysis (2025 Crypto Crime Report) | RELATÓRIO DE EMPRESA | ~3 mi tokens 2024; ETH, BNB, Base | Wash trading / pump-and-dump on-chain | 2024 | ~4,52% dos tokens de 2024 com traços de pump-and-dump (vs 3,59% em 2023); wash trading ~US$2,57 bi; ~90% dos pools suspeitos "rugados" pelo criador | — | chainalysis.com/blog/...2025 | 14/09 (página aberta) |
| CoinGecko Research (2025) | RELATÓRIO DE EMPRESA | 11 narrativas, top-10 tokens cada, YTD 2025 | ROI por narrativa (rotação) | Anual (YTD) | Memecoins −31,61%; IA −50,18%; RWA +185,76%; só 3 narrativas positivas | Reversão pós-hype (IA +2.940% em 2024→perda em 2025) | coingecko.com/learn/crypto-narratives; ccn.com | 14/09 (página aberta) |
| Nansen (via NYT/CoinDesk/Yahoo) | RELATÓRIO DE EMPRESA | Token TRUMP, carteiras até jun/2026 | Ganho/perda por carteira | ~18 meses | 988.905 de 1,48 mi de carteiras (~66%) no prejuízo, −US$3,81 bi; <500.000 (492.285) lucraram +US$4,04 bi | SIM (concentração early buyers) | via finance.yahoo.com | 14/09 (só snippet) |
| Kurnovskii, copy-trading pump.fun | BLOG | Backtest de latência pump.fun | Latência de execução | segundos | Acerto ~82% cai a 46% (0,5s), 28% (1,0s), 4% (5,0s); perda "garantida" ≥2,0s | — | romankurnovskii.com | 14/09 (só snippet) |

---

## (2) ATENÇÃO ANTES DO PREÇO E A REVERSÃO (A1–A4)

**Glossário mínimo (cada termo na 1ª aparição):**
- **Correlação:** duas coisas andam juntas; não diz o que causa o quê.
- **Causalidade de Granger:** teste que pergunta se o passado de A ajuda a prever B melhor do que só o passado de B. NÃO é causa real — é "precedência preditiva".
- **Regressão:** ajusta uma fórmula para estimar quanto B muda quando A muda (o "coeficiente").
- **VAR (vetor autorregressivo):** modelo em que várias séries (preço, atenção) preveem umas às outras ao mesmo tempo.
- **R²:** fração da variação de B "explicada" pelo modelo (0 a 1).
- **p-valor:** probabilidade de ver o resultado por acaso se não houvesse efeito; abaixo de 0,05/0,01 costuma-se chamar "significativo".
- **Retorno anormal:** retorno acima do "normal esperado" naquele período — usado em estudo de evento.
- **Estudo de evento:** mede o retorno em janelas em torno de um evento (ex.: um tweet), em minutos/dias.
- **Fora da amostra (out-of-sample):** testar o modelo em dados que ele não viu ao ser calibrado — o teste honesto de previsão.
- **Contemporâneo:** medido no mesmo período (mesmo dia), não antecipando.

### A1 — A atenção antecede o preço em cripto (geral)?

A resposta honesta da literatura revisada por pares: **para retornos, o sinal é fraco, condicional e frequentemente contemporâneo/reverso; para volume e volatilidade, o sinal é mais robusto.**

- **Volume/volatilidade sim, retorno não (linear):** Shen, Urquhart & Wang (2019, *Economics Letters*) — o número de tweets prevê volume e volatilidade futuros do Bitcoin, mas **não os retornos** no teste linear (só snippet). Bleher & Dimpfl (2019), 12 criptos intradiárias: "retornos não previsíveis, volatilidade parcialmente previsível" (só snippet).
- **Sentimento prevê retorno só para algumas moedas:** Kraaijeveld & De Smedt (2020) — 9 maiores criptos, sentimento por léxico + Granger bilateral — encontram poder preditivo de retorno **só para BTC, BCH e LTC** (página aberta). Os próprios autores estimam **1–14% dos tweets como bots**, o que "lança dúvida" sobre a associação.
- **Só efeito não-linear:** Naeem et al. (2020/21) — **não** acham causalidade linear do índice de felicidade, mas **não-linear** significativa (1% para 5 das 6 moedas) e previsibilidade em quantis extremos (página aberta).
- **Condicional a regime:** Hang, Zhang & Bueno (2021), Bitcoin 2011–2021: causalidade atenção→retorno **só em períodos de alta volatilidade**, variando por quantil (página aberta).
- **Corte transversal / price-pressure:** Hoang & Baur (2024, *JBEF* 44): criptos com busca anormal no Google **subsequentemente** exibem retornos, volatilidade e volume maiores; efeito maior nas grandes; é previsão, mas com **só reversão parcial** (resumo confirmado; página bloqueada por 429).
- **Causa reversa é comum:** Süssmuth (2021, *J. Forecasting*) sobre BTC×buscas acha causalidade correndo **mais forte do preço para a atenção** — o preço sobe e AÍ gera menções (só snippet).

**Conclusão A1:** em cripto grande, a atenção é preditor **mais confiável de volume/volatilidade do que de direção de retorno**; quando há efeito sobre retorno, é não-linear, dependente de regime e muitas vezes some fora da amostra.

### A2 — A reversão ("sobe e devolve") está medida?

Sim, em três lugares além de Merkley et al. (2024):

- **Ante (2023, *Technological Forecasting & Social Change*)** — 47 tweets de Musk: retorno anormal de **~+3,58% em 2 minutos**; efeito de preço significativo só para Dogecoin; para Bitcoin, tweets positivos (+16,9%) e negativos (−11,8%) se **cancelam** — sobe-e-devolve agregado (DOI 10.1016/j.techfore.2022.122112, página aberta).
- **Hoang & Baur (2024, JBEF)** — **só reversão parcial** após o aumento inicial de retorno induzido por atenção (Google); a atenção teria efeito permanente parcial sobre o preço.
- **Nguyen et al. (2024, PLOS One)** — a reversão afeta retornos **positivamente antes** da COVID e **negativamente durante** — o sinal da reversão **muda por regime**.

O único trabalho que mede o perfil "positivo em t+1 e negativo em t+10/t+30" **especificamente para tweets de influenciadores** continua sendo Merkley et al. (2024). **Nenhum estudo revisado por pares mediu esse perfil multi-janela para memecoins de launchpad.**

### A3 — O efeito sobrevive a custos e atraso? — **NENHUM ESTUDO TESTOU ISSO PARA MEMECOIN**

Este é o achado mais importante para o curso:

- **Nenhum estudo revisado por pares testa uma estratégia de atenção/sentimento em cripto líquida de custos realistas de memecoin (ida-e-volta de ~3 a 6 pontos percentuais: taxas de bonding-curve pump.fun/Solana + slippage + taxas de bot/prioridade).** Os testes de custo revisados usam custos de exchange centralizada (~0,1–0,5% por perna, ~0,2–1,0% ida-e-volta) em ativos líquidos (BTC/ETH, top-20).
- **Existe um "não" revisado por pares para cripto grande:** Guégan & Renault (2021, *Finance Research Letters*, DOI 10.1016/j.frl.2020.101494) — ~1 milhão de mensagens StockTwits sobre Bitcoin — acham sinal só até 15 min, que **some depois**, e afirmam textualmente que **"custos de transação razoáveis tornam impossível gerar lucro anormal"** (página aberta). O sinal é real, mas curto demais para pagar os custos.
- **O teste de atraso "puro" que existe é de latência em pump.fun** (Kurnovskii, **BLOG, não revisado**): acerto de copy-trade cai de ~82% para 46% com 0,5 s de atraso, 28% com 1,0 s e 4% com 5,0 s, virando "perda garantida" a partir de ~2,0 s.
- Trabalhos com números espetaculares "líquidos de custos" (ex.: CARVS "+72.240%") são **PREPRINTS**, com amostra curta, otimização dentro da amostra e custos de exchange (bps), não de memecoin — trate com ceticismo.

### A4 — Sentimento positivo × negativo em memecoin (assimetria)?

- **Diferença por tipo de moeda:** IJEC (2026, revisado por pares) — framework de ML sobre grande base do Twitter — acha correlação positiva forte de BTC/ETH com sentimentos de mercado/tecnologia, mas **memecoins MENOS previsíveis** por esses sinais (só snippet). Diretamente relevante: o que "funciona" (pouco) em BTC funciona ainda menos em memecoin.
- **Assimetria — direção contestada (duas fontes divergem):** (a) Huynh (2021): tweets **negativos** com mais poder preditivo sobre retorno/volatilidade/jumps de Bitcoin (via revisão). (b) Tese Cardiff (2025): sinais **positivos** mais fortes e imediatos, sobretudo em altcoins de baixa liquidez (só snippet). A assimetria existe, mas o sinal dela depende do ativo, do proxy de sentimento e da janela — **não confie numa regra fixa**.
- **Li, Yao, Huo & Cai (2025, ACM Web Science)** — reaproveitado da etapa 1: liga sentimento X e resposta de bots a rug pulls em memecoins Solana, mas **não** estima atenção→preço com coeficiente.

---

## (3) NARRATIVAS, ROTAÇÃO E PRIMEIRO TOKEN × CÓPIAS (B1–B3)

### B1 — Rotação de narrativas e retorno de quem entra cedo/no pico/tarde

- **Acadêmico mede spillover de atenção, não a fase de entrada:** "Does investor attention drive cryptocurrency markets?" (*J. International Money and Finance*, 2025) mede conectividade de atenção entre criptos (índice total ~32, "viés de representatividade": atenção às líderes puxa a das demais; só snippet). Sustenta **spillover de atenção entre tokens**, mas **não** mede o retorno de quem entra em cada fase.
- **RELATÓRIO DE EMPRESA:** CoinGecko Research (2025) — ROI por narrativa em 2025: **memecoins −31,61%, IA −50,18%, RWA +185,76%**, só 3 de 11 narrativas positivas; reversão pós-hype documentada (IA +2.940% em 2024 → perda em 2025; DePIN de +135% para −76%). Kaiko e Messari são citados por analistas como observadores da rotação de liquidez entre temas, sem número acadêmico de "fase de entrada".
- **Veredito B1: NÃO HÁ EVIDÊNCIA revisada por pares** quantificando o retorno de entrar cedo vs. no pico vs. tarde numa narrativa. Há relatórios de empresa mostrando **rotação e reversão pós-hype de setores inteiros** (número, amostra e horizonte anuais).

### B2 — Primeiro token × cópias

Melhor medição nova, embora **PREPRINT**:

- **Szwajcok et al. (2026), "Meme Coin Factories" (arXiv 2609.10246, PREPRINT):** de 15,2 milhões de coins pump.fun (01/2024–01/2026), **1,5 milhão (>10%) são copycats** (mesmo nome, símbolo, descrição e imagem). O **original tem vantagem de primeiro-entrante significativa que "desaparece rápido"**; ainda assim **17,7% dos coins graduados são copycats**, e copycats mais cedo têm probabilidade de graduação ligeiramente maior que os mais tardios. Só **0,40% dos "grupos"** (original + cópias) graduam mais de um coin. Em média, **o primeiro rende mais, mas ser cópia não é garantia de zero** — a cópia às vezes rouba a atenção.
- Contexto de graduação (RELATÓRIO/BLOG): a taxa histórica de graduação na pump.fun é **~1,4%**, com pico de **1,67%** na semana de nov/2024, e ficou **abaixo de 1% por quatro semanas seguidas** a partir de 17/fev; apenas **18 tokens** já ultrapassaram US$10 mi de market cap e **96** chegaram a US$1 mi (Dune Analytics via Cointelegraph, "Pump.fun memecoins are dying at record rates, less than 1% survive").

### B3 — Memecoins de figura pública/celebridade

- **Revisado por pares trata o fenômeno TRUMP de forma qualitativa, não com atenção→preço:** Bozeman (2025, *Public Administration Review*) e Maurer et al. (2025, *American Ethnologist*) discutem o token TRUMP/MELANIA como caso de corrupção/carisma — sem coeficiente atenção→retorno.
- **Números de preço/reversão vêm de PREPRINT + dados de empresa:** o working paper de David (SSRN/ResearchGate, **status NÃO VERIFICADO**) documenta **queda de 93,4% do pico** (US$45,50 em 19/01/2025 → US$3,00 em 27/03/2026), **~80% do supply em entidades ligadas a Trump**, e eventos promocionais criando **só picos temporários**. Corroborando por fonte de mercado: o TRUMP caiu **~97–98% do topo de US$75,35** (19/01/2025) para ~US$1,69, com market cap de ~US$421 mi vs. ~US$15 bi no pico (CoinMarketCap/Nansen via Yahoo Finance/CoinDesk, jul/2026). Quanto às perdas de quem comprou: **988.905 de 1,48 mi de carteiras (~66%) estavam no prejuízo** ao fim de jun/2026, somando **−US$3,81 bi**, enquanto **<500.000 (492.285) carteiras lucraram +US$4,04 bi** — "um pequeno número de compradores iniciais capturando ganhos enormes enquanto a ampla maioria de varejo absorveu as perdas" (Nansen via NYT/CoinDesk, 04/07/2026). Do lado do emissor, Trump reportou **US$636 milhões** recebidos do empreendimento TRUMP e **>US$1,4 bi** em renda ligada a cripto em 2025 (divulgação financeira oficial via The Block/CoinDesk, jul/2026).
- **Veredito B3:** há **medição robusta do padrão sobe-e-desaba de memecoin de celebridade**, mas a parte revisada por pares é sociológica; a parte quantitativa (preço, reversão, concentração, ganho/perda por carteira) é **preprint + relatório de empresa**. Não há estudo revisado por pares que estime atenção social → preço → reversão especificamente para tokens de celebridade com coeficiente.

---

## (4) PROBLEMAS DE MÉTODO (C1)

1. **Viés de sobrevivência.** *Leigo:* estudar só as moedas que sobreviveram e chegaram a exchange grande é avaliar restaurantes olhando só os que não faliram. *Número:* na pump.fun a taxa histórica de graduação é **~1,4%** (abaixo de 1% por quatro semanas seguidas a partir de fev; só 18 tokens passaram de US$10 mi de market cap — Dune via Cointelegraph, RELATÓRIO/BLOG); quase nenhum memecoin morto entra nas amostras acadêmicas, focadas em BTC/ETH/top-9.

2. **Causa reversa (preço → atenção).** *Leigo:* o preço sobe e AÍ as pessoas tuítam. *Fonte:* Süssmuth (2021, *J. Forecasting*) acha Granger correndo **do preço para as buscas** em quase todas as frequências (revisado, só snippet); Frino et al. (2022) exploram a mesma reversão. É a crítica central a quase todo estudo "sentimento prevê preço".

3. **Bots inflando menções.** *Leigo:* parte das "pessoas empolgadas" são robôs. *Números:* Kraaijeveld & De Smedt (2020) estimam **1–14% dos tweets de cripto como bots** (revisado); Varol et al. (2017, arXiv:1703.03107, estudo Indiana Univ./USC com >1.000 features) estimam que **entre 9% e 15% das contas ATIVAS do Twitter são bots**; em pump.fun, **23,5% dos coins são criados após posts de X/Truth Social** e há bots postando comentários promocionais em massa (Meme Coin Factories, PREPRINT).

4. **Amostras de tokens grandes extrapoladas para memecoins.** *Leigo:* o que vale (pouco) para Bitcoin não vale para um memecoin de 3 dias de vida. *Fonte:* IJEC (2026, revisado) mostra que **memecoins são menos previsíveis** por sinais de notícia que BTC/ETH.

5. **Wash trading inflando volume.** *Leigo:* a mesma pessoa compra e vende de si mesma para simular "interesse". *Números:* Mongardini & Mei (2026, USENIX) — **82,89%** dos memecoins de alto retorno com crescimento artificial; Chainalysis (2025) — **~4,52%** dos tokens de 2024 com traços de pump-and-dump e **~US$2,57 bi** de wash trading estimado.

6. **Snooping / p-hacking em previsão com ML.** *Leigo:* testando mil estratégias, algumas "acertam" por sorte. *Fonte:* Wei et al. (2023/24, *Int. J. Finance & Economics*) — 7.846 regras técnicas + 59 fatores em 12 criptos (incl. DOGE/SOL); após correção (Lucky Factors/SPA), **quase tudo perde a significância fora da amostra** (revisado, só snippet).

7. **Dependência de regime.** *Leigo:* o efeito muda conforme o ciclo (touro/urso, calmo/volátil). *Fonte:* Hang et al. (2021) — causalidade só em alta volatilidade; Nguyen et al. (2024) — reversão troca de sinal antes/durante COVID.

8. **Look-ahead / atraso de leitura.** *Leigo:* usar um sentimento que só ficou "completo" depois, ou supor execução instantânea. *Fonte:* Guégan & Renault (2021) — sinal some após 15 min; latência de 0,5–2,0 s já destrói o copy-trade em pump.fun (blog, não revisado). Conecta com A3.

9. **Endogeneidade / concentração de posse.** *Leigo:* poucos donos controlam o token e a "narrativa". *Números:* Meme Coin Factories — **top-1% dos grupos criam 58,6% dos coins**; no TRUMP, ~80% do supply em entidades ligadas ao emissor.

---

## (5) A FRASE HONESTA (D1)

**Hoje, a evidência revisada por pares mostra que atenção/sentimento social é um preditor razoável de VOLUME e VOLATILIDADE de cripto grande e, no máximo, um preditor fraco, não-linear e dependente de regime da DIREÇÃO do retorno — que se concentra em minutos a poucos dias, some fora da amostra e, no Bitcoin, não sobrevive a custos de transação razoáveis; para memecoins de launchpad especificamente, NÃO existe estudo revisado por pares que ligue atenção social a retorno com número, e o pouco que se mede aponta que memecoins são ainda menos previsíveis por sinais sociais e que seus "picos de interesse" são majoritariamente artificiais (82,89% dos de alto retorno).**

- **Horizonte:** onde há sinal, ele é de curtíssimo prazo (minutos a ~1–2 dias) e depois reverte parcial ou totalmente; o padrão sobe-e-devolve de tweets de influenciador (+1,83% em 1d → −6,53% em 30d) é o retrato mais claro.
- **Direção:** atenção → sobe no curtíssimo prazo, tende a devolver depois; a assimetria positivo×negativo existe mas o sinal dela muda por ativo/proxy/janela — não confie numa regra fixa.
- **O que NÃO se sabe:** ninguém testou, com revisão por pares, se uma estratégia de atenção/sentimento em memecoin sobrevive a custos realistas (3–6 pp ida-e-volta) e ao atraso de quem lê a notícia depois; e ninguém mediu o perfil de reversão multi-janela para memecoins de launchpad.

---

## Recomendações (para o módulo do curso)

1. **Ensine o leitor a separar "prever volume/volatilidade" de "prever direção".** A honestidade do módulo depende disso: o sinal social é robusto para *quanto se negocia* e *quão selvagem é a oscilação*, não para *se sobe ou desce*. Use Shen et al. (2019) e Hoang & Baur (2024) como âncoras.
2. **Adote a regra do curtíssimo prazo + reversão como tese central.** Monte um gráfico "sobe-e-devolve" com Merkley et al. (2024) (+1,83%→−6,53%) e Ante (2023) (+3,58% em 2 min). Mensagem: quem lê a narrativa *depois* do pico de atenção compra a reversão, não a alta.
3. **Trate o custo como o argumento decisivo em memecoin.** Como nenhum paper testou, apresente ao leitor a conta de break-even que a literatura não fez: se um sinal social dá, no melhor dos casos, ~+1% a +3% de retorno anormal de curtíssimo prazo (números de cripto grande), e o ida-e-volta em memecoin custa 3–6 pp + slippage + latência, **o sinal é engolido pelos custos antes de virar lucro**. Cite Guégan & Renault (2021) como o precedente revisado ("custos razoáveis tornam impossível lucro anormal", mesmo em Bitcoin líquido).
4. **Ao falar de narrativa/rotação, use relatórios de empresa rotulados como tal.** CoinGecko (memecoins −31,61% em 2025) e Chainalysis (82,89%/wash trading) ilustram rotação e manipulação; deixe claro que NÃO há prova acadêmica de que dá para cronometrar a fase de entrada.
5. **Benchmarks que mudariam a conclusão:** (a) se surgir um estudo revisado por pares medindo atenção→retorno em memecoins de launchpad *com* coeficiente e teste fora da amostra; (b) se algum trabalho reportar lucro líquido positivo de uma estratégia de atenção com custos de 3–6 pp e atraso ≥1 h; (c) se a reversão multi-janela for medida para memecoin. Até lá, a posição prudente é: **narrativa/atenção informa risco e timing de saída, não é edge de compra depois do pico.**

---

## (6) NÃO VERIFICADOS
- Kristoufek (2013), Garcia et al. (2014), Shen et al. (2019), Bleher & Dimpfl (2019): confirmados como existentes e revisados por pares via surveys/referências, mas **páginas originais não abertas** — números de fontes secundárias ("só snippet").
- David, "TRUMP Memecoin…": **status de revisão por pares NÃO VERIFICADO** (working paper/SSRN); números de preço/concentração corroborados por dados de mercado (CoinMarketCap/Nansen), não pelo periódico.
- IJEC (2026) "Heterogeneous Impact…": revisado por pares aparentemente sim (página do periódico), amostra exata não aberta — "só snippet".
- Assimetria positivo×negativo: **duas fontes divergem** (Huynh 2021 = negativo mais forte; tese Cardiff 2025 = positivo mais forte) — divergência de método/proxy, não reconciliada.
- Varol et al. (2017): número (9–15%) confirmado, mas é do Twitter geral, não específico de cripto.
- Blog de latência pump.fun (Kurnovskii): **BLOG**, útil só como ilustração de atraso.

## (7) FONTES

**Revisado por pares (periódico):**
- Kraaijeveld & De Smedt (2020), *J. Int. Fin. Markets, Inst. & Money* — ideas.repec.org/a/eee/intfin/v65y2020ics104244312030072x.html — 14/09 (página aberta)
- Naeem et al. (2020/21), *International Review of Finance* — onlinelibrary.wiley.com/…/irfi.12339 — 14/09 (página aberta)
- Hang, Zhang & Bueno (2021), *Complexity* — onlinelibrary.wiley.com/…/5543995 — 14/09 (página aberta)
- Ante (2023), *Technological Forecasting & Social Change* — sciencedirect.com/…/S0040162522006333 (DOI 10.1016/j.techfore.2022.122112) — 14/09 (página aberta)
- Guégan & Renault (2021), *Finance Research Letters* — sciencedirect.com/…/S1544612319314199 (DOI 10.1016/j.frl.2020.101494) — 14/09 (página aberta)
- Hoang & Baur (2024), *J. Behavioral and Experimental Finance* 44, 100991 — sciencedirect.com/…/S2214635024001060 — 14/09 (só snippet; 429)
- Nguyen et al. (2024), *PLOS One* pone.0304377 — journals.plos.org — 14/09 (página aberta)
- Süssmuth (2021), *J. Forecasting* for.2819 — onlinelibrary.wiley.com — 14/09 (só snippet)
- Fan, Talavera & Tran (2019), *European Financial Management* eufm.12245 — onlinelibrary.wiley.com — 14/09 (só snippet)
- Arroyo-Machado et al. (2025), *JASIST* asi.24998 — onlinelibrary.wiley.com — 14/09 (página aberta)
- Wei et al. (2023/24), *Int. J. Finance & Economics* ijfe.2863 — onlinelibrary.wiley.com — 14/09 (só snippet)
- Shen, Urquhart & Wang (2019), *Economics Letters* — via surveys — 14/09 (só snippet)
- Bleher & Dimpfl (2019) — via joes.12412 — 14/09 (só snippet)
- IJEC (2026), "Heterogeneous Impact…" — ijec-web.org — 14/09 (só snippet)

**Revisado por pares (conferência):**
- Mongardini & Mei (2026), USENIX Security 2026 — usenix.org/conference/usenixsecurity26/presentation/mongardini; arXiv 2507.01963 — 14/09 (página aberta)
- Li, Yao, Huo & Cai (2025), ACM Web Science '25 (DOI 10.1145/3717867.3717922) — (etapa 1)
- Long, Wong & Cai (2025), WWW Companion '25 (DOI 10.1145/3701716.3715561) — (etapa 1)
- Varol et al. (2017), arXiv:1703.03107 (contexto bots; via JASIST) — 14/09

**Preprint:**
- Szwajcok et al. (2026), "Meme Coin Factories" — arxiv.org/html/2609.10246v1 — 14/09 (página aberta)
- David, "TRUMP Memecoin…" — researchgate.net/publication/403211511 — 14/09 (só snippet; status NÃO VERIFICADO)
- Marino et al. (2026), arXiv 2602.14860; Kamat (2026), arXiv 2607.02823; Mancino (2025), arXiv 2512.11850 — (etapa 1)

**Relatório de empresa / blog:**
- Chainalysis (2025 Crypto Crime Report) — chainalysis.com/blog/crypto-market-manipulation-wash-trading-pump-and-dump-2025 — 14/09 (página aberta)
- CoinGecko Research (2025), crypto narratives — coingecko.com/learn/crypto-narratives; ccn.com — 14/09 (página aberta)
- Nansen (via NYT/CoinDesk/Yahoo Finance) — perdas/ganhos TRUMP — 14/09 (só snippet)
- Kurnovskii, copy-trading pump.fun — romankurnovskii.com — BLOG — 14/09 (só snippet)

## (8) CONSULTAS REALIZADAS
- **Scholar Gateway:** "Google Trends/Wikipedia predict Bitcoin returns"; "Twitter sentiment predicting Bitcoin returns Granger"; "Elon Musk Twitter Dogecoin event study"; "predictive power public Twitter sentiment nine cryptocurrencies"; "TRUMP celebrity political memecoin launch crash"; "bots inflating cryptocurrency mentions Twitter fraction"
- **web_search:** "Midsummer Meme's Dream 82.89%"; "crypto narrative sector rotation Messari Kaiko"; "copycat tokens pump.fun first-mover"; "Ante 2023 Musk tweets abnormal returns"; "Cary 2021 Dogecoin Reddit Economics Letters"; "Kraaijeveld De Smedt bots"; "investor attention reversal cryptocurrency Google Trends"; "sentiment strategy net of transaction costs"; "category momentum attention spillover crypto"; "negative vs positive sentiment asymmetry memecoin"; "Chainalysis 2024 wash trading memecoin"; "Google search cross-section crypto returns partial reversal"; "Ding 2025 TRUMP coin"; "copycat 17.7% first-mover Meme Coin Factories"; "Guégan Renault 2021 transaction costs"
- **web_fetch:** arxiv.org/html/2609.10246v1 (Meme Coin Factories — introdução, seção 7 copycats, resultados)
- **run_blocking_subagent:** teste de custos/atraso (A3)
- **enrich_draft:** substituição de 5 alegações vagas por números com fonte nomeada

---

**Pergunta de checkpoint (uma):** Quer que a próxima etapa aprofunde UM destes — (a) abrir e extrair as tabelas de Ante (2023) e Merkley et al. (2024) para montar um gráfico "sobe-e-devolve" pronto para o curso, ou (b) montar uma seção só de custos/atraso em memecoin (A3), juntando taxas do pump.fun + slippage típico para simular o break-even que nenhum paper fez?