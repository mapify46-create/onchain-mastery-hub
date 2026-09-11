# CHECKPOINT — O que a literatura encontrou sobre o horizonte de tempo do efeito "Elon posta → preço se move": minutos, horas ou dias?

*(Esta é a Etapa 1 de 2. Aqui vai SÓ o checkpoint. O documento completo — seções 1 a 9, itens A1 a C12 — será escrito depois que você responder.)*

---

## 1. Resposta direta

**DEPENDE DO ESTUDO — mas o resultado central da literatura de alta frequência (dados minuto a minuto) é: MINUTOS a POUCAS HORAS.**

Um resumo honesto do que os trabalhos mostram:

- O efeito **aparece muito rápido**: dentro de **minutos** após o post — em alguns trabalhos já na janela de 1 a 2 minutos.
- O efeito **desaparece / reverte / deixa de ser estatisticamente significativo** (ou seja, deixa de ser distinguível do ruído normal do mercado) em geral **entre ~55 minutos e ~2 horas**, dependendo do estudo, do ativo e do tipo de tweet.
- **Estudos que usam dados DIÁRIOS** enxergam um efeito que "dura dias" (por exemplo, retorno positivo no dia do post e reversão negativa nos dias/semanas seguintes). **Mas isso é uma limitação da lente, não uma contradição:** um estudo com dado diário fisicamente **não consegue ver** se o efeito real durou 5 minutos ou 5 horas dentro daquele dia. Ele só consegue medir horizontes de 1 dia ou mais.

Por isso a resposta correta é **"depende do estudo"**, e a razão principal da divergência é a **frequência dos dados**: estudos minuto a minuto veem "minutos a horas"; estudos diários veem "dias" — porque é o menor horizonte que cada um é capaz de detectar.

> **Nota sobre ferramentas (instrução sua):** O **Scholar Gateway** (busca acadêmica com citação) estava **disponível e foi usado** como fonte primária. O **TinyFish** **NÃO estava disponível** nesta execução; para as fontes não-acadêmicas e para abrir os PDFs de artigos usei `web_search` e `web_fetch`. Onde marco "(página aberta)" o PDF/HTML foi lido de verdade; onde marco "(só snippet)" só tive o resumo do buscador. Blog/notícia estão marcados como **fonte fraca**. Data de consulta de tudo: **11/09/2026**.

---

## 2. Os trabalhos, um a um (autores, ano, venue, peer-review, link, frequência, método, janela em que aparece e some, tamanho do efeito, tipo de medição, de onde saiu o dado)

Explicações de termos para leigo aparecem dentro de cada frase, na primeira vez.

### TRABALHO 1 — Ante (2023) — **o trabalho de referência, revisado por pares**
- **Autor/ano/título:** Lennart Ante (2023), *"How Elon Musk's Twitter activity moves cryptocurrency markets"*.
- **Venue:** *Technological Forecasting and Social Change*, vol. 186, artigo 122112. **Revisado por pares (sim).**
- **Link:** DOI 10.1016/j.techfore.2022.122112 — https://www.sciencedirect.com/science/article/abs/pii/S0040162522006333 ; versão SSRN: https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3778844 (DOI 10.2139/ssrn.3778844).
- **Frequência dos dados:** **minuto a minuto** (close, volume e nº de negócios da corretora Binance, pares BTC/USDT e DOGE/USDT). → **Menor horizonte que este estudo consegue detectar: 1 minuto.**
- **Ativos:** Bitcoin e Dogecoin. **Amostra:** 47 "eventos" de tweets de Musk (32 Dogecoin, 14 Bitcoin, 1 Ethereum descartado das figuras). **Período:** tweets de abril/2019 a julho/2021 (filtrados de 67 tweets → 47 eventos).
- **Método:** *estudo de evento* (technique que calcula o "retorno anormal" = diferença entre o retorno que de fato ocorreu e o retorno "normal" esperado, estimado numa janela antes do post; *retorno anormal* = a parte do movimento que dá para atribuir ao evento). Usa o *Constant Mean Return Model / Modelo de Retorno Médio Constante* (o "retorno normal" é simplesmente a média dos retornos numa janela antes do evento). *CAR = Cumulative Abnormal Return = retorno anormal acumulado* ao longo de uma janela de tempo.
- **Em que janela o efeito APARECE e onde SOME (com tamanho do efeito), texto do próprio artigo:**
  - Resumo, verbatim: *"Within 2 min after a tweet, there is a significant abnormal return of 3.58%… Within the first hour after a tweet, the abnormal return even increases to 4.79%."* Ou seja: **+3,58% em 2 minutos → +4,79% na 1ª hora (pico) →** segundo a leitura da tabela de CAR, reverte parcialmente para **~3,54% em 2 horas**, ainda significativo. **Os dados do estudo só vão até 120 minutos (2 horas)** — o artigo **não mede** 3h, 6h nem dias. Portanto, para Musk, o horizonte peer-reviewed é **"aparece em ~2 minutos, pico em 1 hora, ainda presente em 2 horas (limite dos dados)"**.
  - **Diferença Dogecoin × Bitcoin:** o efeito de **retorno** é significativo **só para tweets de Dogecoin**, não para Bitcoin (nos tweets de Bitcoin, notícias positivas e negativas se cancelam na média). Para Dogecoin, o CAR de retorno é significativo pelas janelas medidas, com pico ~6,33% em 1 hora e ainda ~4,43% em 2 horas. O efeito no **volume de negociação** de Dogecoin "dura pelo menos duas horas".
  - **Tweets individuais extremos:** tweets isolados chegaram a **elevar o Bitcoin em 16,9%** ou **reduzi-lo em ~11,8%** (janela de 2 horas, Tabela 3 do artigo).
- **Tipo de medição (crucial):** **retornos anormais BRUTOS, medidos DENTRO DA AMOSTRA (in-sample).** **NÃO** é backtest fora da amostra, **NÃO** é ao vivo, e **NÃO** é líquido de custos de transação. O artigo **não deduz** taxas, spread nem slippage e **não testa** nenhuma estratégia negociável. (A ausência é o achado: não há frase no artigo alegando resultado líquido de custos.)
- **Janela de estimação (a "janela normal" de comparação):** **NÃO VERIFICADO / há conflito entre versões.** A versão **working paper original (v1)** diz, verbatim: *"a 9-hour period before the event (t = -600 to -60 minutes)"*. A versão **working paper revisada (v2)** diz 5 horas (t=−360 a −60). Não consegui abrir o miolo da versão final paga da revista para confirmar qual valor foi publicado. **Marcado NÃO VERIFICADO.**
- **De onde saiu o achado:** resumo/abstract + Tabelas 1 e 3 e Seção de resultados. **(página aberta** para o abstract via ScienceDirect e para as duas versões working paper; **miolo da versão paga final = só snippet).**

### TRABALHO 2 — Ante (2021) — working paper, **NÃO revisado por pares** (é a versão inicial do Trabalho 1)
- **Autor/ano/título:** Lennart Ante (2021), *"How Elon Musk's Twitter activity moves cryptocurrency markets"*, BRL Working Paper Series No. 16, Blockchain Research Lab.
- **Peer-review:** **Não** (working paper). **Link:** https://www.blockchainresearchlab.org/wp-content/uploads/2020/05/BRL-Working-Paper-No-16-How-Elon-Musks-Twitter-activity-moves-cryptocurrency-markets.pdf
- **Frequência:** **minuto a minuto** (Binance). **Menor horizonte detectável: 1 minuto.**
- **Ativos/amostra:** Bitcoin e Dogecoin; **6 eventos** (2020–2021). Método: mesmo estudo de evento / CAR.
- **Janela em que aparece e some (da Tabela 2, PDF lido):**
  - **Evento "mudou a bio para #bitcoin" (Bitcoin):** CAR **+6,31% em 30 min** (t=2,48**) → **+13,19% em 1 h** (t=2,07**) → pico **+18,99% em 6 horas** (0 a 360 min; t=2,04**). É um dos poucos eventos com efeito que persiste por horas.
  - **Evento "One word: Doge" (Dogecoin):** CAR **+8,16% em 5 min** (t=2,23**) → pico **+17,31% em 1 h** (t=1,73*). **Depois disso os CARs — ainda positivos — deixam de ser significativos** (a partir de 2 h, t cai abaixo do limiar).
  - Resumo, verbatim: *"we discover significantly abnormal returns of up to 18.99% for Bitcoin and 17.31% for Dogecoin across different time frames."*
  - **4 dos 6 eventos** parecem ser apenas **reações** a movimentos que já vinham acontecendo antes do tweet (efeito de preço pequeno ou nulo); só 2 eventos ("bio #bitcoin" e "One word: Doge") parecem ações independentes que causaram grande retorno. **Isso é um alerta de causalidade importante para você.**
- **Tipo de medição:** retornos anormais **brutos, dentro da amostra**. **NÃO líquido de custos.**
- **De onde saiu:** Tabela 2, Figuras 1–6, Seções 3–4. **(página aberta — PDF lido integralmente).**

### TRABALHO 3 — Adeyemi (2022) — periódico estudantil (peso menor, mas é estudo de evento minuto a minuto)
- **Autor/ano/título:** Kheireddine Adeyemi (2022), *"Elon Musk, Memes and Cryptocurrency: An Empirical [Study]"*.
- **Venue:** *Kent Economics Undergraduate Research Journal*, vol. 1. **Peer-review: fraco** (periódico de graduação; tratar como fonte de peso menor, não como fonte primária forte). **Link:** https://media.www.kent.ac.uk/se/29936/KheireddineAdeyemiCryptocurrancyimpactsofTweeting.pdf
- **Frequência:** **minuto a minuto.** **Menor horizonte detectável: 1 minuto.** **Ativo:** Dogecoin. 40 tweets (4 "informativos", 36 "não-informativos").
- **Janela em que aparece e SOME (com tamanho):** AR **+1,23% no minuto do evento** → **+4,43% em 30 min** (significativo a 1%) → **deixa de ser estatisticamente significativo após 55 minutos**; entre 55 e ~60 min ainda há significância marginal a 10%. Tweets "informativos" tiveram AR de até **+24,29% no primeiro minuto**.
- **Tipo de medição:** retornos anormais **brutos, dentro da amostra**. **NÃO líquido de custos.**
- **De onde saiu:** Tabela 3 e texto. **(página aberta — PDF lido).**

### TRABALHO 4 — Merkley, Pacelli, Piorkowski & Williams (2024) — **revisado por pares**, mas frequência DIÁRIA
- **Título/venue/ano:** *"Crypto-influencers"*, *Review of Accounting Studies*, 2024 (vol. 29, nº 3, pp. 2254–2297). **Revisado por pares (sim).** **Link:** https://link.springer.com/article/10.1007/s11142-024-09838-4 (DOI 10.1007/s11142-024-09838-4).
- **Amostra, verbatim:** *"approximately 36,000 tweets issued by 180 of the most prominent crypto social media influencers covering over 1,600 crypto assets for the two years spanning through December 2022."* Não é Musk especificamente — são 180 "crypto-influencers".
- **Frequência dos dados:** **DIÁRIA.** → **Menor horizonte que este estudo consegue detectar: 1 dia. Este estudo NÃO enxerga efeitos de minutos/horas.**
- **Janela em que aparece e reverte (tamanho do efeito), conforme sintetizado por Gerritsen & Regt (2025), verbatim:** *"cryptocurrencies increase in price by 1.83% on the day of the recommendation… measured from 2 days after… decreased in value after 5, 10, and 30 days by 1.02%, 2.24%, and 6.53%, respectively."* A própria HBS/press resume perda média de ~**19% em 3 meses**. Ou seja: **efeito positivo no dia 0, reversão negativa em dias/semanas.**
- **Tipo de medição:** retornos anormais **brutos** (evento diário), consistente com "pump-and-dump" segundo os autores; **NÃO** apresentado como estratégia ao vivo líquida de custos. Os autores dizem que o conselho é "on average unprofitable outside of a short window".
- **De onde saiu:** resumo do artigo (Springer) + resenha em Gerritsen & Regt (2025), *International Journal of Consumer Studies* 49(2), DOI 10.1111/ijcs.70037 (achada e lida via Scholar Gateway). **(abstract Springer = página aberta; números específicos = via resenha peer-reviewed, não abri a tabela original do Merkley — parcial).**

### TRABALHO 5 — Benetton, Mullins, Niessner & Toczynski (working paper) — 75 celebridades, frequência diária
- **Título:** *"Celebrity Persuasion / Celebrity Influencers: This is not Financial Advice"*. **Peer-review: não (working paper).** **Link:** https://ifdm.stanford.edu/sites/g/files/sbiybj30991/files/media/file/benetton-matteo-mullins-william-niessner-marina-toczynski-jan-celebrity-persuasion.pdf
- **Amostra:** tweets de ~52–75 celebridades sobre BTC/ETH/DOGE/XRP/ADA/MATIC/SHIB + dados de transação de uma fintech dos EUA. **Frequência: DIÁRIA (event-study diário).** **Menor horizonte detectável: 1 dia.**
- **Achado, verbatim:** *"The tweets in our data are associated with a 3% spike in returns on day 0, with no reversal over the following week."* Volume de negociação +~10% no dia 0, elevado por 2 dias. (Note a **divergência** com Merkley: aqui **sem reversão em 1 semana**; método/amostra diferentes.)
- **Tipo de medição:** difference-in-differences / event study, **bruto**; não líquido de custos.
- **De onde saiu:** texto/Tabela 6 do working paper. **(página aberta — PDF lido).**

### TRABALHO 6 — Scharnowski (2026) — **revisado por pares**, frequência de SEGUNDOS (contexto, ações, não cripto)
- **Título/venue:** Stefan Scharnowski (2026), *"Social media, high-frequency trading, and market making after-hours — Evidence from presidential tweets"*, *Journal of Financial Research*. **Revisado por pares (sim).** DOI 10.1111/jfir.70049 (online 02/03/2026). **Achado via Scholar Gateway.**
- **Por que é relevante mesmo sendo de ações:** é o estudo com a **frequência mais fina** (100 milissegundos / segundos) e mostra o limite inferior do horizonte. Verbatim: *"volatility increases and liquidity deteriorates within fractions of a second after a tweet."* O **retorno acumulado só é estatisticamente diferente de zero por até ~2 segundos** após o tweet, e a volatilidade volta ao normal em **~10 segundos** — porque **traders algorítmicos** (robôs que monitoram redes sociais) reagem em milissegundos.
- **Frequência:** milissegundos/segundos. **Ativo:** ações do índice (não cripto). **Tipo:** regressão com efeitos fixos + estudo de evento, **bruto, in-sample.**
- **Implicação direta para você:** onde há robôs monitorando, **a janela útil pode ser de segundos, não minutos** — relevante para a sua hipótese de "comprar 30 segundos depois". **(página aberta via Scholar Gateway, tabelas lidas).**

---

## 3. Onde os trabalhos DIVERGEM (lado a lado, sem escolher o mais conveniente)

**(a) Divergência sobre o horizonte em que o efeito some — mesmo em dados minuto a minuto:**

| | Ante (2023/2021) | Adeyemi (2022) |
|---|---|---|
| Frequência | minuto a minuto (Binance) | minuto a minuto |
| Ativo | Dogecoin (e Bitcoin) | Dogecoin |
| Efeito ainda significativo | até **2 horas** (Dogecoin; limite dos dados) | **deixa de ser significativo após ~55 min** |
| Amostra | 47 eventos (2023) / 6 eventos (2021) | 40 tweets |
| Peer-review | sim (2023) / não (2021) | fraco (graduação) |

Mesma frequência de dados, conclusões diferentes sobre **quando some** — a diferença vem de **amostra, tipos de tweet e janelas escolhidas**, não da lente temporal.

**(b) Divergência sobre reversão em horizonte de dias:**
- **Merkley et al. (2024), diário, peer-reviewed:** efeito positivo no dia 0 e **reversão fortemente negativa** em 5/10/30 dias (−6,53% em 30d; ~−19% em 3 meses).
- **Benetton et al. (working paper), diário:** +3% no dia 0 **sem reversão** na semana seguinte.
- Diferença de método: Merkley usa 180 "crypto-influencers" (muitos anônimos/pump-and-dump); Benetton usa celebridades do "mundo real" com moedas de grande capitalização. **Não dá para reconciliar; ficam os dois.**

**(c) Divergência Bitcoin × Dogecoin (dentro do mesmo estudo, Ante 2023):** efeito de retorno **significativo para Dogecoin, não para Bitcoin** (nos tweets de BTC, positivo e negativo se cancelam). Ou seja, "o efeito Musk sobre retorno" é, na média, um **efeito Dogecoin**.

---

## 4. O efeito enfraqueceu ao longo do tempo?

- **Em fonte acadêmica revisada por pares e longitudinal (comparando tweets antigos vs. recentes de forma sistemática): NÃO VERIFICADO.** Não encontrei um estudo peer-reviewed que meça explicitamente o decaimento do "efeito Musk" ao longo dos anos com o mesmo método.
- **Fontes fracas (marcadas como tal)** sugerem enfraquecimento: reportagens de 2022 (Cybernews, The Motley Fool, Get To Know Crypto) descrevem tweets de Musk que "mal mexeram" no Dogecoin; textos de 2026 (Phemex — blog/fraca; Cryptonews.net — notícia/fraca) afirmam que o "efeito Musk" original (2020–2022) "diminuiu significativamente" por maturação de mercado, ETFs e "fadiga do investidor". **São fontes fracas; não sustentam afirmação acadêmica.** Marcado **NÃO VERIFICADO** para fim de conclusão.

---

## 5. Foi medido líquido de custos de transação? Backtest / fora da amostra / ao vivo?

- **NÃO VERIFICADO / a resposta é "nenhum".** Nenhum dos estudos do efeito Musk (Ante 2023, Ante 2021, Adeyemi 2022) mediu o resultado **líquido de custos de transação**, nem testou uma estratégia **fora da amostra** ou **ao vivo**. Todos reportam **retornos anormais brutos, dentro da amostra** (event study). Merkley (diário) e Benetton (diário) idem — brutos. Scharnowski idem — bruto. **Isso é decisivo para o seu objetivo:** a literatura mostra que o preço *se move*, **não** que dava para *lucrar líquido de custos* — que é justamente o que você quer medir e onde a resposta esperada é "não".

---

## 6. NÃO VERIFICADOS (lista explícita)
1. Janela de estimação exata publicada no Ante (2023) final — versões dão 9 h vs. 5 h; miolo da versão paga não aberto.
2. Existência de estudo peer-reviewed que meça o enfraquecimento do efeito Musk ao longo dos anos.
3. Qualquer medição do efeito Musk **líquida de custos de transação** — não existe na literatura consultada.
4. Números de reversão de Merkley (5/10/30 dias) vieram da resenha peer-reviewed de Gerritsen & Regt (2025), não da tabela original do artigo (esta não foi aberta).

---

## 7. Consultas de busca feitas (separadas por ferramenta)

**Scholar Gateway (semanticSearch) — fonte primária:**
1. "What is the time horizon of the effect of Elon Musk tweets on Dogecoin and Bitcoin cryptocurrency returns using event study methods?"
2. "Intraday abnormal returns of cryptocurrencies around Elon Musk social media posts high frequency data"
3. "Does the price impact of Elon Musk cryptocurrency tweets weaken or decay over time comparing earlier and later tweets?"
4. "Dogecoin event study minute-level cumulative abnormal returns Elon Musk tweets trading volume"
5. "Solana memecoin launchpad pump.fun rug pull mortality survival post-launch price behavior"

**web_search (usado no lugar do TinyFish, que estava indisponível):**
1. "Elon Musk tweets Dogecoin abnormal returns event study minutes"
2. "Ante 2023 Musk Twitter cryptocurrency Technological Forecasting 47 events 3.58% two minutes"
3. "Musk effect Dogecoin weakened over time diminishing tweets 2022 2023"
4. "Benetton 75 celebrities cryptocurrency tweets 3% price jump reversal"
5. "celebrity coin promotion cryptocurrency negative long run returns SSRN"
6. "Solana pump.fun tokens survival rug pull empirical study percentage"
7. "Twitter sentiment cryptocurrency trading strategy net transaction costs profitability Kraaijeveld"
8. "Elon Musk tweets Dogecoin abnormal return event study intraday minutes 2024 2025 journal"
9. "Musk tweet bitcoin price reaction seconds high frequency algorithmic 2021"

**web_fetch (páginas abertas de verdade):**
1. BRL Working Paper No. 16 (PDF) — https://www.blockchainresearchlab.org/wp-content/uploads/2020/05/BRL-Working-Paper-No-16-How-Elon-Musks-Twitter-activity-moves-cryptocurrency-markets.pdf **(página aberta)**

**Subagente de pesquisa (1 usado):** verificação de precisão do Ante (2023) — janelas de CAR, horizonte Dogecoin×Bitcoin, cifras +16,9%/−11,8%, se é líquido de custos, janela de estimação. Confirmou que o texto **não** mede líquido de custos e que a divergência 9h/5h existe entre versões.

*(Observação: buscas adicionais do Scholar Gateway retornaram trabalhos correlatos — Yang/Fernández-Pérez/Indriawan 2024 "The price impact of tweets: A high-frequency study" (Financial Review, DOI 10.1111/fire.12406; mispricing intradiário que leva "vários dias" para corrigir); Polyzos et al.; Gerritsen & Regt 2025 — usados como corroboração e não detalhados individualmente aqui para manter o foco no checkpoint.)*

---

## 8. Uma frase de fecho antes de você responder

**Resumo do horizonte:** os robôs reagem em **segundos** (Scharnowski); o retorno anormal do "efeito Musk" aparece em **minutos** e o grosso dele se esgota entre **~55 minutos e ~2 horas** (Ante, Adeyemi); estudos **diários** mostram um padrão de **alta no dia 0 e reversão em dias/semanas** (Merkley), que é consistente com a ideia de que o movimento inicial é **atenção/hype temporário, não informação** — e **nenhum** desses trabalhos mediu se sobra lucro **líquido de custos**. Isso reforça exatamente a hipótese cética que você quer testar.

**Nenhuma recomendação de operação foi feita — o foco aqui é medir, não lucrar.**

---

**Aguardo sua resposta.** O documento completo (metodologia de simulação de execução parcela por parcela; ficha de pré-registro; tamanho de amostra para cauda pesada; correção de múltiplas hipóteses; lista de vazamentos de futuro/look-ahead; intervalo de confiança e "inconclusivo" como resultado legítimo; NÃO VERIFICADOS; fontes) **só será escrito depois que você responder a este checkpoint.**