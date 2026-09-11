# CHECKPOINT — resposta única antes do documento

**Sua pergunta:** existe algum trabalho revisado por pares que mostre previsão de retorno de criptoativos em horizonte de minutos a horas, líquida de custos (taxas, spread, slippage), fora da amostra?

---

## Resposta: SIM — mas com uma ressalva decisiva sobre "slippage"

Sim, existem trabalhos revisados por pares que mostram retorno de cripto previsível em horizonte de minutos a horas, testado **fora da amostra** (out-of-sample: o modelo é avaliado num período que ele não viu no treino, para não "colar na prova") e ainda positivo depois de descontar custos. O caso mais completo desconta **taxas de corretagem** e o **spread** (a diferença entre o preço de compra e o de venda que você paga só por entrar e sair).

**Porém, o critério (d) do seu pedido é cumprido apenas PARCIALMENTE.** Você pediu "líquido de custos de transação/**slippage**". Slippage é o "escorregão de preço": a diferença entre o preço que você via na tela e o preço que de fato saiu, seja porque a sua própria ordem empurrou o mercado, seja porque o preço mudou entre a decisão e a execução. **Nenhum dos dois trabalhos mais fortes que encontrei modela slippage/impacto de mercado explicitamente.** Então:

- **Taxas:** cobertas nos dois trabalhos. ✅
- **Spread:** coberto em um dos dois (Shanaev et al.). ✅ num / ❌ no outro.
- **Slippage / impacto de mercado:** **NÃO VERIFICADO em nenhum dos dois.** ⚠️

Isso importa muito para o seu caso: num sistema de minutos, com muitas entradas e saídas, o slippage costuma ser justamente o custo que mais corrói o lucro — e é exatamente o que a literatura revisada por pares que achei **não** mediu.

---

## Os dois trabalhos que sustentam o "SIM"

### 1) Shanaev, Vasenin & Stepanov (2023) — o mais completo (taxas + spread, fora da amostra, minutos)

- **Título:** "Turn-of-the-candle effect in bitcoin returns" ("efeito da virada da vela nos retornos do bitcoin"; *vela*/candle é o bloco de preço de um intervalo — aqui, de 15 minutos — usado nos gráficos de trading).
- **Autores/ano:** Savva Shanaev, Mikhail Vasenin, Roman Stepanov, 2023.
- **Venue:** *Heliyon*, vol. 9, nº 3, artigo e14236. **DOI:** 10.1016/j.heliyon.2023.e14236 — https://doi.org/10.1016/j.heliyon.2023.e14236
- **Status de revisão:** **revisado por pares** (a ficha oficial do artigo marca "Article › peer-review").
- **Ativo:** Bitcoin (em sete corretoras; a simulação de estratégia usa a Bitfinex em 2021). **Não são memecoins.**
- **Horizonte:** **minutos** — retornos de 1 minuto concentrados nos minutos 0, 15, 30 e 45 de cada hora (as "viradas" das velas de 15 minutos). O número exato do resumo: *"Positive returns of 0.58 bps per minute are disproportionately concentrated at the turn of 15-min candles (in minutes 0, 15, 30, and 45 of each trading hour). Average returns in other trading minutes are negative."* (0,58 ponto-base por minuto; "ponto-base"/bps = 0,01%). Dentro da faixa "minutos a horas". ✅
- **Fora da amostra?** **Sim.** O resumo afirma que o efeito *"persist in out-of-sample tests"*. ✅
- **Líquido de quais custos?** **Taxas de corretagem MAIS spread.** O highlight oficial diz: *"An anomaly-exploiting strategy outperforms buy-and-hold after fees and spreads."* Achado net-of-cost (Tabela 5, texto imediatamente acima da tabela): *"Even when spreads are accounted for, a starting capital of as little as $5,000 generates 74.18% net per annum, exceeding 60.27% for the buy-and-hold."* — ou seja, com US$ 5.000 de capital inicial, rende **74,18% líquidos ao ano** contra **60,27%** de comprar-e-segurar, já contando taxas e spread. Taxas: cronograma da Bitfinex (10 bps para conta nova, caindo a zero ao atingir US$ 7,5 milhões de volume em 30 dias). Spread: valor real da Bitfinex (via data.bitcoinity.org). **Slippage/impacto: não modelado.** ⚠️
- **Página/seção do achado:** Tabela 5 (desempenho por capital inicial, com e sem spread), Figura 3 (curva de patrimônio de US$ 10.000) e Tabela 6 (Sharpe ratio probabilístico com taxas e spread).
- **Status de leitura:** **(só snippet)** para a página completa — cell.com, PMC e ScienceDirect foram bloqueados por detecção de robô; os trechos verbatim de Tabela 1 e Tabela 5 vieram do texto completo indexado, não só do resumo. **Data de consulta: 11/09/2026.**

### 2) Guo, Sang, Tu & Wang (2024) — cumpre horizonte, fora da amostra e taxas; NÃO cobre spread nem slippage

- **Título:** "Cross-cryptocurrency return predictability" (previsibilidade de retorno *entre* criptomoedas — a ideia de que o retorno recente de uma moeda ajuda a prever o de outra, porque a informação se espalha devagar entre moedas).
- **Autores/ano:** Li Guo, Bo Sang, Jun Tu, Yu Wang, 2024.
- **Venue:** *Journal of Economic Dynamics and Control*, vol. 163, artigo 104863. **DOI:** 10.1016/j.jedc.2024.104863 — https://doi.org/10.1016/j.jedc.2024.104863. Versão de trabalho (SSRN): https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3974583
- **Status de revisão:** **revisado por pares** (periódico com revisão por pares). **Atenção:** o número exato "2,16% ao dia" citado abaixo vem da **versão de trabalho** (SSRN/working paper, dez/2021), que li por inteiro; o resumo da versão publicada no periódico diz apenas *"a sizable return out-of-sample after accounting for transaction costs"* (retorno considerável, sem o número). Se o "2,16%" aparece idêntico na versão publicada: **NÃO VERIFICADO** — não consegui abrir o texto completo do periódico (bloqueado). O achado, porém, existe em versão revisada por pares.
- **Ativo:** cesta de criptomoedas da Binance (BTC e outras grandes). **Não são memecoins.**
- **Horizonte:** **minutos** — o retorno defasado de outras moedas prevê a moeda-foco por até dez minutos; a carteira lucrativa é reequilibrada a cada 13 minutos. Dentro da faixa pedida. ✅
- **Fora da amostra?** **Sim** (janela móvel de 720 minutos). Conclusão: *"our portfolio can generate a daily return up to 2.16% out-of-sample after accounting for transaction costs."* ✅
- **Líquido de quais custos?** **Apenas taxas de corretagem** (mercado de futuros da Binance: 4 bps por operação para o cliente comum "VIP0", 1,7 bps para o de maior volume "VIP9"). **NÃO desconta spread nem slippage.** Os autores citam que a taxa à vista de ~20 bps por ida-e-volta destruiria a estratégia, e por isso migraram para futuros, onde a taxa é menor. ⚠️
- **Página/seção do achado:** Seção 3.6.2 ("Portfolio performance and transaction costs"), p. 28–29 da versão de trabalho, e a tabela de desempenho por nível de taxa e frequência de reequilíbrio.
- **Status de leitura:** **(página aberta)** na versão SSRN/SMU (PDF completo); **(só snippet / paywall)** para a versão publicada. **Data de consulta: 11/09/2026.**

---

## Trabalhos próximos que NÃO cumprem todos os critérios (para você ver o contraste)

- **Shen, Urquhart & Wang (2022), "Bitcoin intraday time series momentum", *Financial Review* 57(2):319–344, DOI 10.1111/fire.12290** — revisado por pares; horizonte intradiário (*"the first half-hour positively predicts the last half-hour return"*). **Falha o critério (d):** o próprio texto diz que a análise assumiu custo de transação zero e calcula apenas o "custo de equilíbrio" (breakeven) que zeraria o lucro. Não apresenta resultado líquido de custos. (página aberta via Scholar Gateway; 11/09/2026).
- **Chu, Chan & Zhang (2020), "High frequency momentum trading with cryptocurrencies", *Research in International Business and Finance* vol. 52** — revisado por pares; usa preços horários das sete maiores criptos vs. dólar por ~6 meses (fev–ago/2017), com robustez em outros períodos; propõe comparação com carteira passiva. **Porém o resumo não descreve o resultado principal como líquido de custos** — cobertura de custos: NÃO VERIFICADO no texto completo. (só snippet; 11/09/2026).
- **"Machine Learning-Based Bitcoin Trading Under Transaction Costs" (arXiv:2606.00060, 2026)** — horizonte horário, fora da amostra (walk-forward), líquido de custos (10 bps), e acha lucro líquido positivo em configurações selecionadas de XGBoost. **Falha o critério (a): é preprint do arXiv, não revisado por pares.** (página aberta; 11/09/2026).
- **Alessandretti et al. (2018), "Anticipating Cryptocurrency Prices Using Machine Learning", *Complexity* 2018, DOI 10.1155/2018/8983590** — revisado por pares, mas **horizonte diário** (*"We analyse daily data for 1,681 cryptocurrencies... Nov. 2015 and Apr. 2018"*). **Falha o critério (b)** de "minutos a horas". (só snippet; 11/09/2026).

---

## Ressalvas honestas (importantes antes de você responder)

1. **"Líquido de custos" tem graus.** Taxas: cobertas nos dois. Spread: coberto só em Shanaev et al. **Slippage/impacto de mercado: NÃO VERIFICADO em nenhum dos dois.** Para um sistema de minutos com muita rotatividade, esse é o custo mais perigoso e ninguém revisado por pares o mediu aqui.
2. **São BTC e moedas líquidas, não memecoins.** Os dois trabalhos usam Bitcoin/moedas grandes da Binance/Bitfinex. **Não há, nesses dois, qualquer evidência sobre memecoins de baixíssima liquidez.** Essa lacuna eu trato no documento.
3. **Dependem de condições especiais.** Shanaev et al. dependem de atingir o volume que zera a taxa da corretora; Guo et al. dependem de migrar para futuros (taxa baixa). Fora dessas condições, a margem encolhe ou some.
4. **Possível decaimento de vantagem.** O efeito "turn-of-the-candle" só surge a partir de meados de 2020 (*"The effect has originated mid-to-late 2020 on all seven sample exchanges... can be associated with high-frequency algorithmic trading"*) e é atribuído a robôs seguindo velas de 15 min — o tipo de sinal que tende a enfraquecer quando muita gente o explora. Não é vantagem estável garantida.

---

## Consultas de busca feitas nesta fase (para o item "fontes")

1. "Is intraday cryptocurrency return predictable out-of-sample with machine learning after accounting for transaction costs and slippage?" (Scholar Gateway)
2. "intraday bitcoin return predictability out-of-sample transaction costs machine learning" (web)
3. "high-frequency cryptocurrency prediction net of fees profitable peer-reviewed" (web)
4. "high frequency momentum trading cryptocurrencies ensemble horizon minutes Sharpe after costs" (web)
5. "cryptocurrency intraday predictability net of transaction costs out-of-sample peer reviewed hourly" (web)
6. "Vo Yost-Bremm high frequency algorithmic trading cryptocurrency 15-minute machine learning transaction costs journal" (web)
7. "Guo 2024 cross-cryptocurrency lead-lag return predictability long-short after transaction costs" (web)
8. "turn-of-the-candle effect bitcoin returns Finance Research Letters journal" (web)
9. "memecoin return predictability machine learning pump dogecoin shiba peer reviewed" (web)
10. "Guo Sang Tu Wang cross-cryptocurrency return predictability 2.16% daily transaction costs slippage bid-ask" (web)
11. "Bitcoin intraday time series momentum Shen Urquhart Wang breakeven transaction costs Financial Review" (web)
12. "deep learning limit order book cryptocurrency directional prediction net profit out-of-sample seconds" (web)
13. "LSTM bitcoin minute prediction trading strategy profitable after fees peer reviewed journal 2023" (web)
14. Verificação primária de custos (taxas/spread/slippage) e páginas/seções dos dois artigos-chave (Guo et al. via PDF SSRN/SMU; Shanaev et al. via Heliyon/PMC/ScienceDirect).

---

**Resumo em uma frase:** SIM, há trabalho revisado por pares com previsibilidade de cripto em minutos-a-horas, fora da amostra e líquido de taxas — e, em um caso (Shanaev et al. 2023, *Heliyon*), também líquido de spread; mas **slippage não foi modelado em nenhum**, e **nada disso é sobre memecoins**.

**Aguardo sua resposta antes de escrever o documento completo (tabela-mestra e seções 2 a 6). Nenhuma recomendação de operação é feita aqui.**