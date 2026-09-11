# Observatório do "efeito Musk" em criptomoedas — Etapa 2: simulação de execução, custos e estatística do resultado financeiro

## TL;DR (resposta direta em 3 pontos)
- **A vantagem provavelmente não sobrevive aos custos, e ninguém publicou prova em contrário.** Nenhum estudo revisado por pares do efeito Musk mediu resultado LÍQUIDO de custos; o mais citado sobre sentimento e cripto (Kraaijeveld & De Smedt, 2020) afirma textualmente que a significância estatística "não equivale a significância prática, devido à inclusão de custos de transação num ambiente real de negociação".
- **Com resolução de 1 minuto e atraso L de 2 a 5 minutos, você só mede a DERIVA (continuação) pós-salto de Ante (2023) — e a maior parte dela já passou.** O salto inicial acontece em segundos (abaixo da sua resolução); o que resta medir é a fração do +3,58% em 2 min / +4,79% em 1 h que ainda existe depois do fechamento da vela t+L.
- **O tamanho de amostra do resultado financeiro é muito maior que o das previsões, porque o retorno de memecoin tem "cauda pesada".** Em Solana, a graduação de tokens na pump.fun é rara — a análise de sobrevivência de 832.941 lançamentos de Kamat (2026) mediu taxa de graduação de apenas **0,198%** (ou seja, ~99,8% nunca graduam); um token que morre é −100%, e poucos eventos extremos dominam a média — a média e a variância amostrais ficam instáveis, exigindo métodos de reamostragem em vez de fórmulas normais.

## Principais achados (Key Findings)
1. A literatura mede **retornos anormais BRUTOS, dentro da amostra** — nunca líquido de custo, nunca ao vivo. Isso vale para Ante (2023), Adeyemi (2022), Merkley et al. (2024) e Benetton et al.
2. O **orçamento de latência L (2-5 min) é conservador** frente à soma real das parcelas de atraso técnico na Solana (segundos), e ser conservador é uma virtude de instrumentação: evita creditar ao observatório um lucro que a física da execução não permitiria.
3. As **cinco camadas de custo contam duas vezes** (compra e venda). Na pump.fun o custo de plataforma sozinho é 1,25% por perna na curva; o impacto de preço numa pool rasa costuma superar todas as taxas somadas.
4. A regra de sobrevivência **token morto = −100%** é a prática-padrão de finanças (Shumway, 1997) para deslistagem por desempenho; aplicá-la corretamente é o que separa um backtest honesto de um enganoso.
5. **Correção para múltiplas hipóteses é obrigatória**: testar muitas regras garante um "vencedor" por acaso; a literatura de finanças exige um limiar de significância muito mais alto — Harvey, Liu & Zhu (2016) argumentam que "um fator recém-descoberto precisa superar uma barreira muito mais alta, com uma estatística-t maior que 3,0".

## Detalhes

---

### (1) Resumo da literatura, com o HORIZONTE DE TEMPO dos efeitos

Um "estudo de evento" (event study) é o método padrão: mede-se o "retorno anormal" (abnormal return, AR — o retorno observado menos o retorno que se esperaria sem o evento) numa janela em torno do evento, e a soma desses ARs ao longo do tempo é o "retorno anormal acumulado" (cumulative abnormal return, CAR). Todos os estudos abaixo medem **retorno bruto** (sem descontar taxas, spread ou impacto de preço) e **dentro da amostra** (in-sample — no próprio conjunto de dados usado para descrever o efeito, sem teste fora da amostra nem ao vivo).

**Horizonte dos efeitos (do mais fino ao mais longo):**

- **Milissegundos a ~10 segundos — Scharnowski (2026).** Em AÇÕES (não cripto), após tuítes presidenciais, a volatilidade sobe e a liquidez piora em frações de segundo; o retorno acumulado só é diferente de zero por ~2 segundos e a volatilidade normaliza em ~10 segundos. Journal of Financial Research, revisado por pares, DOI 10.1111/jfir.70049. **Implicação para você: o salto inicial está ABAIXO da sua resolução de 1 minuto.** (página não reaberta nesta etapa; dado herdado da Etapa 1)
- **Minutos a 2 horas — Ante (2023).** Binance, minuto a minuto, 47 eventos (abr/2019–jul/2021). +3,58% em 2 minutos; +4,79% no pico de 1 hora; ~3,54% em 2 horas (limite dos dados). Efeito de retorno significativo só para Dogecoin (pico ~6,33% em 1 h; ~4,43% em 2 h), não para Bitcoin. Tuítes isolados moveram o Bitcoin +16,9% e −11,8% em janela de 2 horas. Technological Forecasting and Social Change 186, art. 122112, DOI 10.1016/j.techfore.2022.122112. **É esta a DERIVA (drift) que seu observatório pode medir.** (dado herdado da Etapa 1; DOI confirmado)
- **Até ~55-60 minutos — Adeyemi (2022).** Dogecoin, minuto a minuto, 40 tuítes. AR +1,23% no minuto do evento; +4,43% em 30 min (significativo a 1%); **deixa de ser estatisticamente significativo após 55 minutos.** Kent Economics Undergraduate Research Journal (periódico de graduação, revisão fraca). (dado herdado da Etapa 1)
- **Dias a meses — Merkley et al. (2024) e Benetton et al.** Merkley: frequência DIÁRIA, ~36 mil tuítes de 180 "crypto-influencers"; +1,83% no dia, revertendo para ~−19% em 3 meses. Review of Accounting Studies 29(3), DOI 10.1007/s11142-024-09838-4 (números via resenha de Gerritsen & Regt 2025, DOI 10.1111/ijcs.70037). Benetton et al. (working paper, não revisado): +3% no dia 0 SEM reversão na semana seguinte — **diverge de Merkley**, provavelmente pelo método (dados de transação de fintech vs. preços de mercado). (dados herdados da Etapa 1)

**A lacuna central (achado forte):** com base em busca acadêmica dirigida e leitura do texto completo, **NENHUM estudo revisado por pares do efeito Musk (ou de sinais de rede social em cripto) mediu o resultado LÍQUIDO de custos, testou uma estratégia negociável ou reportou retornos fora da amostra ao vivo em resolução de minuto.** O trabalho mais citado do gênero, Kraaijeveld & De Smedt (2020), Journal of International Financial Markets, Institutions and Money, vol. 65, art. 101188, DOI 10.1016/j.intfin.2020.101188, é **puramente de previsibilidade estatística** (causalidade de Granger — um teste de se valores passados de X ajudam a prever Y; não é causalidade real). Os próprios autores encerram o artigo dizendo: *"…a significância estatística observada neste estudo não equivale a significância prática, devido à inclusão de custos de transação num ambiente real de negociação."* (https://pure.ed.ac.uk/ws/files/138685006/INTFIN_2018_414_R2.pdf) (página aberta) Ante (2023) mede retornos anormais brutos e não testa estratégia. (https://doi.org/10.1016/j.techfore.2022.122112)

**O que seria preciso para medir o efeito líquido (desenho que ninguém publicou):**
- **Dados:** preço executável real (não o preço médio da vela) na pool específica, com profundidade/reservas da pool minuto a minuto; carimbo de tempo do post no mesmo relógio das velas; registro on-chain de taxas efetivamente pagas; universo de tokens congelado ANTES do evento (incluindo os que depois morreram).
- **Parcelas a deduzir:** taxa de plataforma/agregador, taxa de rede base, priority fee, gorjeta MEV/Jito, taxa da pool (AMM) — nas duas pontas — mais impacto de preço e spread.
- **Desenho:** pré-registro da hipótese; execução simulada só no fechamento da vela t+L; regra de sobrevivência para tokens mortos; métrica primária única; intervalo de confiança por reamostragem; correção para múltiplas hipóteses. É exatamente o que as seções (2)-(7) abaixo montam.

*(Divisão de trabalho: a PONTUAÇÃO das previsões — Brier score decide, log score é alarme, linha de base = frequência histórica, pré-registro e tamanho de amostra das previsões — já foi fixada em outra pesquisa sua e não é refeita aqui. Esta entrega é a SIMULAÇÃO FINANCEIRA.)*

---

### (2) O MODELO DE SIMULAÇÃO DE EXECUÇÃO (o coração da entrega)

#### 2.1 O atraso, parcela por parcela, com o parâmetro L

Regra do usuário: o pacote de informação é congelado no instante t (publicação do post) e a operação simulada só começa no **fechamento da vela t+L**, com L entre 2 e 5 minutos. Abaixo, a soma das parcelas técnicas reais de atraso — todas em SEGUNDOS — para mostrar por que L (minutos) é conservador.

| Parcela | Ordem de grandeza | Fonte |
|---|---|---|
| Entrega do post pela API do X (Filtered Stream) | P99 ≈ 6-7 s (docs oficiais); relatos de 5-6 s na comunidade de desenvolvedores | docs.x.com/x-api/posts/filtered-stream/introduction (página oficial via snippet); devcommunity.x.com |
| Tempo de decisão do software | sub-segundo a alguns segundos (dependente da implementação) | NÃO VERIFICADO (depende do seu código) |
| Assinatura da transação | milissegundos | trivial |
| Tempo de "slot" (janela em que um validador produz um bloco) | **350 ms** (alvo desde a atualização de mainnet de 22/08/2026, primeiro de quatro passos do SIMD-0525 rumo a 200 ms; era 400 ms) | CoinMarketCap (notícia): "Solana completed a mainnet upgrade on Aug. 22 that cuts the network's target slot time from 400 milliseconds to 350 milliseconds"; solana.com/docs |
| Confirmação ("confirmed") | poucos slots | solana.com/developers/guides/advanced/confirmation (snippet oficial) |
| Finalização ("finalized", 32 slots por TowerBFT) | **~12,8 s** (CoinMarketCap: "Full finality... currently takes roughly 12.8 seconds"; upgrade Alpenglow, SIMD-0326, mira ~150 ms, mainnet prevista out/2026) | CoinMarketCap (notícia); solana.com |
| Transação descartada (dropped) e reenvio | ~5% dos blocos não são finalizados; em congestão, taxa de falha de 20-45,5% (média ~39%) em 2025 | solana.com (guia); Flipside via stepdata.substack.com (relatório de empresa) |

**Soma:** mesmo somando o pior caso da API do X (~7 s), decisão (poucos s), inclusão em bloco e finalização (~12,8 s) e uma tentativa de reenvio, chega-se a **dezenas de segundos** — bem abaixo de L=2 minutos (120 s). Portanto **L de 2 a 5 minutos é deliberadamente conservador**: ele descarta de propósito a fração do movimento que ocorre nos primeiros segundos e minutos, medindo apenas a CONTINUAÇÃO que sobra. Isso é uma virtude num observatório que quer evitar autoengano — se você impusesse latência otimista (segundos), estaria creditando ao observatório um lucro que a soma das parcelas mostra ser improvável de capturar de forma consistente sob congestão.

#### 2.2 Perda de efeito para cada L (usando os números publicados)

O usuário quer saber quanto do efeito se perde ao entrar apenas no fechamento de t+L. Usando os pontos publicados de Ante (2023) para Dogecoin (o único com efeito de retorno significativo) e o perfil de Adeyemi (2022):

- Ante (2023) publica pontos em 2 min (+3,58% agregado) e 1 h (+4,79% pico); **não publica pontos em 3, 4 ou 5 minutos.** Qualquer valor de CAR em t=3, 4 ou 5 min é uma **interpolação do autor deste documento, NÃO um número do artigo** — marcado como tal.
- **Leitura do autor (interpolação, NÃO do artigo):** se o CAR sobe de +3,58% (2 min) rumo a +4,79% (60 min), a fração do movimento total capturável entrando em t+L cresce com L apenas se a deriva continuar positiva depois de t+L. O que importa medir é o retorno INCREMENTAL de t+L até a saída, não o CAR desde t=0. Como o salto de 0→2 min (+3,58%) já passou antes mesmo de L=2, **para L≥2 você já perdeu todo o salto inicial de 2 minutos** e mede só o trecho +3,58%→+4,79% (um incremento de ~1,2 ponto percentual bruto distribuído ao longo de ~58 minutos), menos o que decair.
- Adeyemi (2022): como o efeito **perde significância após 55 minutos**, entrar em t+L=5 min e sair perto de 55-60 min captura a maior parte da janela significativa dela; entrar mais tarde encolhe a janela útil.

**Conclusão desta subseção:** para todo L de 2 a 5 minutos, o salto inicial já está perdido por construção; o observatório mede a deriva residual, cujo tamanho bruto máximo plausível (leitura do autor a partir de Ante) é da ordem de 1 a poucos pontos percentuais — a ser confrontado com os custos da seção 2.4, que são da mesma ordem de grandeza.

#### 2.3 Impacto de preço pela fórmula do produto constante (x·y=k)

Uma "pool de produto constante" (constant product / AMM — automated market maker, formador de mercado automático) mantém duas reservas, X e Y, com X·Y=k constante durante cada troca. A fórmula (confirmada na documentação da Raydium e em múltiplos artigos):

- Você deposita Δx do token de entrada; recebe **Δy = Y·Δx / (X + Δx)**.
- O "preço marginal" (preço de uma troca infinitamente pequena) é **Y/X**.
- O **impacto de preço** (quanto o preço piora pela sua própria ordem) é da ordem de **Δx/(X + Δx)** — quanto maior sua ordem frente à reserva X, pior o preenchimento. (docs.raydium.io/algorithms/constant-product, página via snippet)

A fórmula do usuário está **correta**: recebido = Y·dx/(X+dx) e impacto = dx/(X+dx). Uma precisão a registrar: essa é a versão SEM taxa; com taxa f da pool, aplica-se a taxa à entrada primeiro: Δx_efetivo = Δx·(1−f), depois Δy = Y·Δx_efetivo/(X+Δx_efetivo). Impacto de preço e taxa são **coisas diferentes** e **ambos contam duas vezes** (na compra e na venda).

**Como obter X e Y a partir da "liquidez" das APIs públicas:** DexScreener, Jupiter, Birdeye e GeckoTerminal normalmente reportam a **liquidez como a SOMA em dólares dos dois lados** da pool (liquidity USD). Para desmembrar numa pool de produto constante, os dois lados têm valor aproximadamente igual em dólares no equilíbrio, então: valor de cada lado ≈ Liquidez_USD / 2. Daí X (em tokens) = (Liquidez_USD/2)/preço_do_token_de_entrada e Y = (Liquidez_USD/2)/preço_do_token_de_saída. (o campo "liquidity.USD" é a soma dos dois lados — docs.bitquery.io e integrações DexScreener descrevem "USD + base + quote liquidity"; página via snippet — corroboração de terceiros, não doc oficial da DexScreener) **NÃO VERIFICADO:** a definição exata do campo de liquidez na doc oficial da própria DexScreener não foi aberta nesta etapa; confirmar antes de usar.

**O que muda se a pool não for produto constante:**
- **Curva de bonding de launchpad (pump.fun):** é constante-produto, MAS rodada sobre **reservas VIRTUAIS** semeadas no lançamento (~30 SOL e ~1,073 bilhão de tokens), não sobre depósitos reais; k é fixado no lançamento. (pump.fun/docs/bonding-curve, página aberta; github.com/nirholas/pump-fun-sdk) O impacto de preço segue a mesma fórmula, mas as reservas virtuais são pequenas no início, então o impacto de uma ordem é grande.
- **Liquidez concentrada (CLMM, como Uniswap v3):** a fórmula x·y=k só vale localmente, dentro da faixa de preço em que há liquidez; fora dela o impacto explode. **NÃO VERIFICADO** para pools específicas de token graduado — precisa ler a faixa ativa de liquidez on-chain.

#### 2.4 As cinco camadas de custo, nas DUAS pontas, com fonte e valor de setembro de 2026

Cada camada incide na compra E na venda (round trip). Valores vigentes:

1. **Taxa de plataforma/agregador.** Jupiter (agregador dominante na Solana): 0-0,1% no "Ultra Mode". (cryptonews.net/blockchainreporter.net, 2026 — blog) Pela API pública hospedada pela QuickNode, o uso implica **0,2% por swap no Jupiter e 1% por swap em tokens pump.fun**. (jupiterapi.com, página oficial da API — snippet) Bots/terminais de terceiros cobram à parte e **empilham** sobre a taxa da venue.
2. **Taxa de rede base da Solana.** **5.000 lamports por assinatura** (0,000005 SOL), 50% queimados, 50% ao validador; cobrada mesmo se a transação falhar. (solana.com/docs/core/fees/fee-structure, página aberta) É desprezível em porcentagem para posições acima de alguns dólares. (Contexto: as taxas de rede diárias da Solana caíram de uma média ~33.000 SOL/dia em janeiro para ~5.300 SOL/dia em junho de 2026, queda de ~84% — DEXTools News via dados on-chain da Dune — sinal de menos congestão média em 2026.)
3. **Priority fee (taxa de prioridade).** Fórmula oficial: **priority_fee = teto(compute_unit_price × compute_unit_limit / 1.000.000) lamports**, 100% ao validador; compute_unit_price em micro-lamports por CU (unidade de computação). (solana.com/docs/core/fees/fee-structure, página aberta) Em condições normais, 1.000-50.000 micro-lamports/CU; em congestão, 100.000-1.000.000+. (helius.dev, openliquid.io — blog)
4. **Gorjeta de MEV / Jito tip.** MEV = "valor extraível pelo minerador/validador" (lucro de reordenar transações). Jito é a infraestrutura dominante: Chainstack (2026) afirma que "em meados de 2026, o cliente Jito-Solana roda em mais de 95% do stake ativo, e as gorjetas Jito representam mais de 60% de todo o volume de priority fee da rede". "Bundles" (pacotes de até 5 transações, executados de forma atômica — tudo ou nada) exigem uma gorjeta mínima de **1.000 lamports**; há um atraso de relayer de ~200 ms. (docs.jito.wtf, página oficial via snippet; chainstack.com — blog) Em lançamentos competitivos, gorjetas Jito chegam a **0,05 SOL**, contra 0,001-0,01 SOL em condições normais (MemeGateway, 2026 — blog). Searchers competitivos entregam 50-70% do lucro esperado em gorjetas. (rpcfast.com — blog)
5. **Taxa da pool (swap fee do AMM).** pump.fun na curva: **total 1,25% por perna** (creator 0,30% + protocol 0,95% + LP 0%), atualizado 20/05/2026. Ao graduar: 0,015 SOL. Em pool canônica PumpSwap: escalona de 1,25% (cap de mercado baixo) até 0,30% (cap alto); pools não-canônicas 0,3%. (pump.fun/docs/fees, página aberta) PumpSwap padrão: 0,25% (0,20% LP + 0,05% protocolo). (uwuu.ai — blog)

**Montando a conta ida-e-volta, em % da posição:** custo_total ≈ 2×(taxa_plataforma + taxa_pool) + 2×impacto_de_preço + 2×spread_implícito + (taxas de rede + priority + Jito, convertidas de lamports para % dividindo pelo tamanho da posição em lamports). Exemplo ilustrativo na curva pump.fun: só a taxa de pool ida-e-volta = 2×1,25% = **2,5%**; some 2×impacto de preço (numa pool rasa, facilmente vários %); e o token tem que subir bem mais que o efeito bruto de +3,58%/+4,79% de Ante só para empatar. Um guia independente estima que "um round-trip típico na Pump.fun custa 3-6% quando você soma priority tips, taxas de bundle Jito, slippage e perdas de MEV" (MemeGateway, 2026 — blog, corroboração fraca). **Este é o ponto central:** o efeito bruto medido pela literatura e o custo round-trip são da MESMA ORDEM DE GRANDEZA, e é por isso que o resultado líquido é a única medida honesta.

#### 2.5 Sobrevivência (token que morre = −100%)

Em Solana, a mortalidade é a regra, não a exceção. A análise de sobrevivência de Kaplan-Meier de Kamat (2026), "Pump.fun Graduation Regime Windows" (SSRN, resumo 6915560), sobre 832.941 lançamentos entre 08/05/2026 e 10/06/2026, mediu uma **taxa de graduação agregada de 0,198% (IC 95% de Wilson [0,189%, 0,208%])** — ou seja, ~99,8% dos tokens nunca "graduam" (nunca deixam a curva de bonding para virar par negociável). Isso é uma queda acentuada frente a janelas anteriores: Marino et al. (2026) mediram 0,63% em set-out/2025; a DEXTools News (2026, via dados on-chain da Dune) reporta que "a taxa de graduação de tokens da pump.fun... colapsou para cerca de 0,26% em meados de junho, uma queda de 80% em três meses". Coortes de agosto de 2026 seguidas no tempo por outra fonte grad. ~2,7% (Bitquery via coinmonks/medium.com — blog); dos que não graduam, **94% "morrem" em até 60 minutos** (Arkham via medium.com — blog; há dado on-chain por trás, mas a leitura é de terceiro). As fontes divergem em magnitude (0,198% a 2,7%) conforme o método (coorte seguida no tempo vs. graduações/lançamentos do mesmo dia) e a janela — mas todas confirmam que a esmagadora maioria morre. A regra de sobrevivência não é detalhe: ela domina o resultado.

**Prática-padrão de finanças (para embasar a regra):** Shumway (1997), "The Delisting Bias in CRSP Data", Journal of Finance 52(1), documenta que deslistagens por desempenho ("surpresa") deixam o papel frequentemente **sem valor**; a prática é atribuir **retorno de −100% (−1)** para deslistagens de desempenho tipo falência, e o próprio Shumway usa −100% como limite superior do viés; para deslistagens genéricas de desempenho, uma alternativa é −30% (−0,3). (DOI 10.1111/j.1540-6261.1997.tb03818.x, via Scholar Gateway) Dionysiou (2012), Journal of Economic Surveys, alerta que atribuir −100% a uma saída por FUSÃO/AQUISIÇÃO (em que o acionista recebe caixa ou ações) **enviesa o retorno para baixo** — ou seja, nem toda "saída" é −100%. (DOI 10.1111/j.1467-6419.2012.00742.x)

**Regra operacional defensável para o observatório:**
- Se, no instante da venda simulada (fechamento da janela de saída), a pool não existe mais / liquidez foi removida / rug pull / não há preço executável → **retorno = −100%** (o token não pôde ser vendido).
- Se o token ainda tem pool com liquidez, use o preço executável real (com impacto de preço da seção 2.3), não o último preço "de tela".
- Registre a razão da morte (rug, dreno de liquidez, abandono) para auditoria.
- Prefira medir o retorno **por compra-e-mantém (buy-and-hold)**, não por soma acumulada de retornos (CAR), porque Shumway/Dionysiou mostram que o CAR é MAIS sensível ao viés de sobrevivência que o buy-and-hold.

**O que essa regra super/subestima:** atribuir −100% quando na verdade daria para vender uma fração antes do dreno **subestima** o resultado (pessimista). Ignorar tokens que morreram (mantendo só os sobreviventes) **superestima** grosseiramente — é o "viés de sobrevivência" (survivorship bias) clássico, e é o erro mais perigoso. Na dúvida, o observatório deve pecar pelo pessimismo.

---

### (3) FICHA DE PRÉ-REGISTRO DE HIPÓTESE FINANCEIRA (pronta para copiar)

Pré-registro = escrever e "carimbar" a hipótese e o plano de análise ANTES de olhar os dados, para não poder ajustar depois. Boas práticas: AsPredicted, OSF (Open Science Framework) e Registered Reports. (Lakens et al., referenciado em bin.70039 e ejp.70118 via Scholar Gateway) A ideia central da equivalência/SESOI (ver seção 7) já entra aqui, no campo "menor efeito de interesse".

```
FICHA DE PRÉ-REGISTRO — HIPÓTESE FINANCEIRA DO OBSERVATÓRIO
Versão: ____  Autor: ____  Data/hora (UTC): __________
Hash SHA-256 deste arquivo: ____________________________

1. HIPÓTESE (uma frase, direcional):
   "Após um post-gatilho, o retorno LÍQUIDO de custos de comprar no
    fechamento da vela t+L e vender no fechamento da vela de saída é
    [maior que zero / indistinguível de zero]."

2. GATILHO (definido ex-ante, sem ambiguidade):
   - Conta(s): ____   - Critério textual/temático do post: ____
   - Como o carimbo de tempo do post é lido: ____ (mesmo relógio das velas)

3. L (atraso de execução, fixado ANTES): L = ____ minutos (2 a 5)

4. JANELA DE SAÍDA (fixada ANTES): sair no fechamento de t+____ min

5. UNIVERSO DE TOKENS (congelado ANTES do evento):
   - Lista/critério de elegibilidade conhecido no instante t: ____
   - Inclui tokens que depois morreram? (deve ser SIM)

6. CRITÉRIOS DE EXCLUSÃO (definidos ex-ante): ____

7. CUSTOS ASSUMIDOS (fixados ANTES, ver seção 2.4):
   plataforma __%  pool __%  priority __  Jito __  impacto/spread: modelo __

8. REGRA DE SOBREVIVÊNCIA: token sem pool na saída = -100% (ver 2.5)

9. MÉTRICA PRIMÁRIA ÚNICA: ____ (ex.: mediana do retorno líquido)
   (uma só; tudo mais é secundário)

10. MÉTRICAS SECUNDÁRIAS: ____

11. CRITÉRIO DE PARADA (fixado ANTES):
    - Nº de eventos até analisar: ____ (ver seção 4)
    - Regra de parada temporal: ____

12. CORREÇÃO DE MÚLTIPLAS HIPÓTESES: ____ (ver seção 5)

13. PLANO DE INTERVALO DE CONFIANÇA: ____ (bootstrap; ver seção 7)

14. O QUE CONTA COMO "INCONCLUSIVO": ____ (SESOI; ver seção 7)
```

---

### (4) TAMANHO DE AMOSTRA DO RESULTADO FINANCEIRO, sob CAUDA PESADA

"Cauda pesada" (heavy tails) = distribuição em que eventos extremos são muito mais prováveis do que numa curva normal (sino). Retornos de cripto têm cauda pesada; memecoins, extremamente. Isto é o que torna o tamanho de amostra do resultado FINANCEIRO **muito maior** que o das PREVISÕES binárias.

**Por que maior que o das previsões?** Uma previsão binária (aconteceu/não aconteceu) tem variância limitada (no máximo 0,25 para probabilidade 0,5), então o Brier score converge rápido. Já o **retorno financeiro** é dominado por poucos eventos gigantes (um token que faz +2.000% ou um −100%): a variância é enorme e concentrada na cauda, então a média amostral demora muito mais a estabilizar.

**Conceitos e ferramentas (explicados):**
- **Teorema Central do Limite (TCL)** = a média de muitas amostras tende a uma curva normal. Com cauda pesada, ele converge **devagar**; e se a cauda for pesada demais, pode nem valer.
- **Índice de cauda / alfa de Hill (α)** = número que mede quão pesada é a cauda; quanto MENOR o α, mais pesada. O estimador de Hill (Hill, 1975) é a forma padrão de medir α. Regra crítica: **se α < 2, a variância populacional é infinita**; se α < 1, a própria média é infinita. (Yan, Huang & Wu 2026, International Finance, DOI 10.1111/infi.70020, página via Scholar Gateway)
- **Números publicados:** para Bitcoin/Ethereum, α ≈ 2,1-2,4 (cauda pesada, mas variância ainda finita); para stablecoins, α frequentemente < 2. (Yan, Huang & Wu 2026) Grobys & Shahzad (2025), International Journal of Finance & Economics, DOI 10.1002/ijfe.70036, mostram que as **variâncias realizadas de estratégias de momentum em cripto seguem leis de potência com média e variância populacionais estatisticamente NÃO definidas** — ou seja, métricas que usam variância (como o Sharpe) "não são informativas". **NÃO VERIFICADO / LACUNA DA LITERATURA:** não existe estimativa publicada de α especificamente para MEMECOINS ou microcaps/pump.fun; o toque mais próximo é Dogecoin em Michaelides & Poudyal (2025), International Review of Finance, DOI 10.1111/irfi.70029, cujas caudas de DOGE são mais pesadas que BTC/ETH, mas o valor exato de α não pôde ser confirmado (só snippet). Trate memecoins como α ainda mais baixo que BTC/ETH até medir o seu próprio α de Hill.
- **Quando média/variância amostrais são instáveis:** com α baixo, adicionar UM evento extremo muda a média inteira; a variância "salta". Por isso não confie em desvio-padrão amostral para dimensionar amostra.
- **Bootstrap e bootstrap estacionário (alternativa):** "bootstrap" = reamostrar os próprios dados com reposição milhares de vezes para estimar a incerteza sem supor normalidade. O **bootstrap estacionário** de Politis & Romano (1994) reamostra BLOCOS de comprimento aleatório, preservando a dependência temporal (autocorrelação) — apropriado para séries financeiras. (Politis & Romano 1994, JASA 89, 1303-1313)

**Método (NÃO um número mágico) para dimensionar a amostra:**
1. Meça o SEU α de Hill nos retornos líquidos dos eventos já coletados (não confie em α de BTC/ETH).
2. Se α > 2 (variância finita): use análise de potência (power analysis) com **desvio-padrão realista de memecoin** (que será enorme). A ideia é "quantos eventos até o intervalo de confiança ficar mais estreito que o efeito que quero detectar (o SESOI da seção 7)". Como o efeito bruto de Ante é de poucos %, e o líquido é menor ainda, e o desvio de memecoin é da ordem de dezenas a centenas de %, a conta tende a exigir um número de eventos ordens de magnitude MAIOR que o das previsões.
3. Se α ≤ 2 (variância infinita/instável): **abandone fórmulas de amostra baseadas em média/variância** e trabalhe com bootstrap estacionário + medianas/quantis, aumentando a amostra até o intervalo de confiança da MEDIANA (não da média) parar de encolher materialmente.
4. Regra prática de instrumentação: a amostra financeira necessária é **maior** que a das previsões pelo mesmo evento — reporte as duas separadamente e nunca reaproveite o "n" das previsões para concluir sobre dinheiro.

---

### (5) CORREÇÃO PARA MÚLTIPLAS HIPÓTESES (para leigo)

O problema: se você testar 20 regras diferentes, é quase certo que UMA "funcione" só por acaso (como jogar moeda 20 vezes e achar uma sequência de caras). Em finanças isso é agravado porque há incentivo a testar milhares de variações e reportar só a melhor.

**Ferramentas (da mais simples à mais sofisticada), explicadas:**
- **Bonferroni:** divida o limiar de significância pelo número de testes (α/m). Simples, mas **conservador demais** — ignora correlação entre regras e rejeita quase tudo. (Fan et al. 2025, Financial Review, DOI 10.1111/fire.70000)
- **FDR / Benjamini-Hochberg (1995):** controla a "taxa de falsas descobertas" (proporção de achados que são falsos, entre os declarados significativos), não a probabilidade de UM erro. Mais tolerante e prático que Bonferroni. (Fan et al. 2025)
- **Limiar de t mais alto — Harvey, Liu & Zhu (2016):** em finanças, com tanto teste acumulado (o artigo documenta ≥316 fatores publicados), o limiar de significância deve subir de t≈2,0 para "uma barreira muito mais alta, com uma estatística-t maior que 3,0... a maioria das descobertas de pesquisa alegadas em economia financeira é provavelmente falsa". "…and the Cross-Section of Expected Returns", Review of Financial Studies 29(1):5-68, DOI 10.1093/rfs/hhv059. Harvey & Liu (2020), Journal of Finance, DOI 10.1111/jofi.12951, usam duplo bootstrap para calibrar o limiar de t a uma FDR-alvo (ex.: 5%); para grandes conjuntos de anomalias o limiar chega a t≈4,9. (via Scholar Gateway)
- **White's Reality Check e Hansen SPA:** testam se a MELHOR regra de um conjunto realmente supera uma linha de base, corrigindo o fato de você ter escolhido a melhor de muitas; o SPA (Hansen) é uma versão com mais poder que o Reality Check (White). (Costantini et al. 2016, Journal of Forecasting, DOI 10.1002/for.2398; Fan et al. 2025)
- **Deflated Sharpe ratio (Bailey & López de Prado) e "false strategy theorem":** o Sharpe máximo entre N tentativas é enviesado para cima; o "Sharpe deflacionado" desconta quantas variações você testou, além de assimetria e cauda. **Bastam ~3 tentativas independentes para produzir uma estratégia provavelmente falsa** com Sharpe aparentemente bom. (Bailey & López de Prado 2021, Significance, DOI 10.1111/1740-9713.01588) Chen (2021), Journal of Finance, DOI 10.1111/jofi.13036, mostra que a quantidade de "p-hacking" necessária para explicar os t>4 publicados seria astronômica — contexto de que nem tudo é ruído, mas o crivo tem que ser duro.

**Qual faz sentido para um observatório PEQUENO:** como você testará poucas regras (idealmente UMA hipótese pré-registrada com um L fixo), o melhor é (a) pré-registrar UMA métrica primária para não gerar múltiplas hipóteses implícitas; (b) se testar poucas variações de L, aplicar **Benjamini-Hochberg (FDR)** — simples e não conservador demais; (c) contar HONESTAMENTE toda variação testada (inclusive as abandonadas) e reportar o **Sharpe deflacionado** se usar Sharpe. Bonferroni serve como checagem pessimista de sanidade.

---

### (6) LISTA DE VAZAMENTOS DE FUTURO (look-ahead bias), com exemplo concreto ancorado no seu caso

"Vazamento de futuro" (look-ahead / look-ahead bias) = usar, no backtest, informação que você NÃO teria em tempo real. É o que faz um backtest parecer lucrativo e a realidade decepcionar. (López de Prado / Bailey & López de Prado 2021, DOI 10.1111/1740-9713.01588)

1. **Usar o preço de fechamento da vela em que a informação chegou.** Se o post caiu no meio da vela das 12:03, usar o fechamento das 12:03 embute preço posterior ao instante em que você agiria. → Correto: entrar no fechamento de t+L (ex.: 12:03 + L).
2. **Usar dados revisados/corrigidos retroativamente.** Preço/liquidez que a API "corrigiu" depois não estavam disponíveis ao vivo.
3. **Universo montado hoje (só sobreviventes).** Se você lista "tokens que Musk citou" usando a lista de HOJE, exclui os que morreram → viés de sobrevivência (ver seção 2.5). → Correto: universo congelado no instante t.
4. **Saber a liquidez FINAL ao escolher o token.** Escolher só tokens que "tinham boa liquidez" quando isso só se soube depois.
5. **Timestamp do post em fuso/relógio diferente do da vela.** Um post carimbado em horário local vs. vela em UTC pode adiantar sua entrada em minutos — vazamento puro.
6. **Usar a vela que CONTÉM o evento em vez da seguinte.** Clássico: a vela do evento já embute a reação. → Correto: primeira vela cujo fechamento é ≥ t+L.
7. **Snooping do parâmetro L depois de ver o resultado.** Escolher L=3 porque "deu melhor" é ajustar a hipótese aos dados. → Correto: L fixado no pré-registro (seção 3).
8. **Exclusão de outliers decidida após olhar os dados.** Remover "aquele token maluco" porque atrapalhou é p-hacking.
9. **Usar a "graduação" do token como filtro.** A graduação (deixar a curva de bonding) só é conhecida DEPOIS; filtrar por ela é vazamento e viés de sobrevivência combinados (crítico na pump.fun, onde a taxa de graduação medida é de 0,198% — Kamat 2026).

---

### (7) COMO REPORTAR INTERVALO DE CONFIANÇA e "INCONCLUSIVO"

**Por que o intervalo de confiança (IC) convencional falha com cauda pesada:** o IC "média ± 1,96×desvio/√n" pressupõe normalidade e variância finita. Com α baixo (seção 4), a variância amostral é instável e o IC fica errado (estreito demais ou largo demais de forma imprevisível).

**O que usar no lugar:**
- **Bootstrap por percentil:** reamostre os retornos líquidos milhares de vezes; o IC de 95% é o intervalo entre os percentis 2,5% e 97,5% das médias/medianas reamostradas. Com dependência temporal, use o **bootstrap estacionário** (blocos de comprimento aleatório) de Politis & Romano (1994).
- **BCa (bias-corrected and accelerated):** versão do bootstrap que corrige viés e assimetria — mais confiável que o percentil simples para distribuições tortas como as de memecoin.

**"Não achei efeito" ≠ "não tive poder para achar":** ausência de significância pode ser efeito nulo OU amostra pequena demais. Para distinguir, use **testes de equivalência / TOST** (two one-sided tests, dois testes unilaterais — Schuirmann, 1987) com um **SESOI** (smallest effect size of interest, o menor efeito que valeria a pena). (Lakens, via bin.70039 e ejp.70118; Micheloud & Held 2024, Biometrical Journal, DOI 10.1002/bimj.202300232)

**Os quatro resultados possíveis do TOST (para escrever a conclusão honestamente):**
1. Estatisticamente equivalente e não diferente → o efeito líquido é praticamente zero (o resultado que você espera).
2. Não equivalente e diferente → há efeito real acima do SESOI.
3. Equivalente E diferente → há um efeito, mas menor que o SESOI (irrelevante na prática).
4. **Nem diferente nem equivalente → INCONCLUSIVO**: você não teve poder suficiente; NÃO é prova de nada. (formulação de Lakens, via bin.70039)

**Como escrever a conclusão inconclusiva:** "O intervalo de confiança de 95% (bootstrap estacionário, medianas) do retorno líquido foi [−X%, +Y%], que inclui zero E se estende além do SESOI de ±Z%. Portanto o observatório NÃO teve poder para distinguir 'sem vantagem' de 'vantagem pequena'; declarar vitória ou derrota aqui seria autoengano. São necessários mais eventos (seção 4)." Isso trata "não deu para concluir" como um resultado legítimo e publicável.

---

### (8) NÃO VERIFICADOS (lista explícita e completa)

1. Janela de estimação exata na versão PUBLICADA de Ante (2023) (working paper v1: 9 h; v2: 5 h; miolo da versão paga não aberto). (herdado da Etapa 1)
2. Nenhum estudo peer-reviewed que meça sistematicamente o ENFRAQUECIMENTO do efeito Musk ao longo dos anos (só blogs/notícias de 2022-2026, corroboração fraca; ex.: phemex.com afirma que o "efeito Musk" foi mais proeminente em 2021 "mas desde então diminuiu"; fxstreet.com fala em "influência decrescente" — mas nenhum é estudo revisado por pares). (herdado da Etapa 1)
3. Definição exata do campo "liquidez" na documentação OFICIAL da própria DexScreener (usei corroboração de terceiros — Bitquery/integrações); confirmar antes de desmembrar X e Y.
4. Valor exato de α (índice de cauda) para MEMECOINS/microcaps/pump.fun — **lacuna da literatura**; o mais próximo é DOGE em Michaelides & Poudyal (2025, DOI 10.1111/irfi.70029), com caudas mais pesadas que BTC/ETH, mas o α exato não foi confirmado (só snippet).
5. Tempo de "decisão do software" na cadeia de latência — depende do seu código, não é um número de fonte externa.
6. Comportamento de impacto de preço em pools de liquidez concentrada (CLMM) para tokens graduados específicos — precisa ler a faixa ativa on-chain.
7. Número exato de artigo/volume de Ante (2023) na TFSC segundo o subagente (art. 122112 usado; consistente com Etapa 1, mas marcado como "só snippet" pelo subagente).
8. Divergência entre as taxas de graduação da pump.fun (0,198% em Kamat 2026 por coorte seguida no tempo; 0,26% em jun/2026 por DEXTools/Dune; ~2,7% em coortes de agosto/2026 por Bitquery) — reflete diferenças de método e janela; nenhuma foi auditada independentemente por este documento.
9. Taxas e latências mudam em meses; todos os valores de custo/latência valem para setembro de 2026 e devem ser reconfirmados nas fontes oficiais antes de uso.

---

### (9) FONTES (com data de consulta, venue, revisão por pares e status de abertura)

Data de consulta de todas: **11/09/2026.**

**Acadêmicas (Scholar Gateway / DOI) — primárias para "o que a literatura mostra":**
- Ante, L. (2023). TFSC 186, art. 122112. DOI 10.1016/j.techfore.2022.122112. Peer-reviewed. (herdado Etapa 1; DOI confirmado; miolo pago não aberto — parcial)
- Kraaijeveld, O. & De Smedt, J. (2020). J. Int. Fin. Markets Inst. & Money, vol. 65, art. 101188. DOI 10.1016/j.intfin.2020.101188. Peer-reviewed. (página aberta — manuscrito Edinburgh)
- Merkley et al. (2024). Review of Accounting Studies 29(3). DOI 10.1007/s11142-024-09838-4. Peer-reviewed. (números via Gerritsen & Regt 2025, DOI 10.1111/ijcs.70037; tabela original não aberta — parcial)
- Scharnowski, S. (2026). Journal of Financial Research. DOI 10.1111/jfir.70049. Peer-reviewed. (herdado Etapa 1; não reaberto)
- Yan, Huang & Wu (2026). International Finance 29(2), 207-223. DOI 10.1111/infi.70020. Peer-reviewed. (página via Scholar Gateway)
- Grobys & Shahzad (2025). Int. J. of Finance & Economics 31(2), 2180-2193. DOI 10.1002/ijfe.70036. Peer-reviewed. (Scholar Gateway)
- Michaelides & Poudyal (2025). International Review of Finance 25(3). DOI 10.1111/irfi.70029. Peer-reviewed. (só snippet — α de DOGE não confirmado)
- Harvey, Liu & Zhu (2016). Review of Financial Studies 29(1):5-68. DOI 10.1093/rfs/hhv059. Peer-reviewed. (via enriquecimento; citação verbatim)
- Harvey & Liu (2020). Journal of Finance 75(5). DOI 10.1111/jofi.12951. Peer-reviewed. (Scholar Gateway)
- Bailey & López de Prado (2021). Significance 18(6). DOI 10.1111/1740-9713.01588. Peer-reviewed. (Scholar Gateway)
- Chen, A. (2021). Journal of Finance 76(5). DOI 10.1111/jofi.13036. Peer-reviewed. (Scholar Gateway)
- Fan et al. (2025). Financial Review 60(4). DOI 10.1111/fire.70000. Peer-reviewed. (Scholar Gateway)
- Costantini et al. (2016). Journal of Forecasting 35(7). DOI 10.1002/for.2398. Peer-reviewed. (Scholar Gateway)
- Shumway, T. (1997). Journal of Finance 52(1), 327-340. DOI 10.1111/j.1540-6261.1997.tb03818.x. Peer-reviewed. (Scholar Gateway)
- Dionysiou, D. (2012). Journal of Economic Surveys 29(1). DOI 10.1111/j.1467-6419.2012.00742.x. Peer-reviewed. (Scholar Gateway)
- PEAD: Richardson & Veenstra (2022), Abacus 58(4), DOI 10.1111/abac.12265; Chan, Jegadeesh & Lakonishok (1996), JoF, DOI 10.1111/j.1540-6261.1996.tb05222.x. Peer-reviewed. (Scholar Gateway)
- Micheloud & Held (2024). Biometrical Journal 66(8). DOI 10.1002/bimj.202300232. Peer-reviewed. (Scholar Gateway)
- Politis & Romano (1994). JASA 89, 1303-1313. (via arXiv/semanticscholar — só snippet)
- Kamat (2026), "Pump.fun Graduation Regime Windows", SSRN 6915560 (preprint, NÃO revisado por pares; Kaplan-Meier de 832.941 lançamentos). (via enriquecimento)

**Documentação oficial / relatórios (fontes primárias não acadêmicas):**
- Solana docs — Fee Structure. solana.com/docs/core/fees/fee-structure. (página aberta via TinyFish)
- Solana docs — Transaction Confirmation & Expiration. solana.com/developers/guides/advanced/confirmation. (snippet oficial)
- CoinMarketCap (notícia) — slot 350 ms / SIMD-0525 (22/08/2026); finalização ~12,8 s; Alpenglow ~150 ms previsto out/2026. (via enriquecimento)
- pump.fun — Fees (atualizado 20/05/2026). pump.fun/docs/fees. (página aberta via TinyFish)
- pump.fun — Bonding Curve. pump.fun/docs/bonding-curve. (snippet oficial)
- Raydium docs — Constant-product AMM. docs.raydium.io/algorithms/constant-product. (snippet)
- docs.x.com — Filtered Stream (P99 ~6-7 s). (snippet oficial) + devcommunity.x.com (relatos)
- jupiterapi.com (QuickNode) — taxas 0,2% Jupiter / 1% pump.fun via API pública. (snippet oficial)
- docs.jito.wtf — bundles, tip mínimo 1.000 lamports. (snippet oficial)

**Blogs / relatórios de empresa (corroboração fraca, marcados):**
- helius.dev, rpcfast.com, openliquid.io (priority fees) — blog.
- chainstack.com (Jito ~95% stake, >60% priority fee) — blog.
- coinmonks/medium.com (graduação ~2,7% via Bitquery) — blog com dado on-chain.
- coinlaw.io / DEXTools News (graduação 0,26% jun/2026; taxas de rede −84%, via Dune) — relatório de empresa / notícia.
- medium.com/Arkham (94% morrem em 60 min) — blog com dado on-chain de terceiro.
- MemeGateway, terminalpedia.com, uwuu.ai, cryptonews.net (custos round-trip 3-6%) — blog.
- stepdata.substack.com (taxa de falha 20-45,5%, via Flipside) — relatório de empresa.

---

## Recomendações (passos concretos e o que mudaria a decisão)

1. **Comece medindo, não operando.** Pré-registre UMA hipótese com a ficha da seção 3, L fixo, métrica primária única. Benchmark que muda a decisão: se o IC bootstrap do retorno líquido ficar inteiramente ABAIXO de zero, a hipótese "há vantagem" está refutada para aquele L.
2. **Meça o seu próprio α de Hill** nos retornos líquidos antes de qualquer conta de amostra. Se α ≤ 2, abandone média/variância e trabalhe com medianas + bootstrap estacionário. Gatilho: α medido < 2 → não reporte Sharpe.
3. **Instrumente as cinco camadas de custo on-chain reais** (taxas efetivamente pagas em lamports), não valores de catálogo. Gatilho: se o custo round-trip medido ≥ efeito bruto residual pós-L, o resultado líquido esperado é ≤ 0 por construção.
4. **Trate sobrevivência com −100% para tokens sem pool na saída** e reporte separadamente a fração de eventos que terminam em morte. Benchmark: se >50% dos eventos elegíveis morrem antes da saída, a mediana do retorno líquido é dominada por −100% e a "vantagem" é ilusória.
5. **Confirme, antes de rodar:** definição do campo de liquidez na doc oficial da DexScreener (item NÃO VERIFICADO 3); e reconfirme todas as taxas/latências (mudam em meses).
6. **Escreva "inconclusivo" quando for o caso** (seção 7). Um observatório que sabe dizer "não tive poder" é mais confiável que um que sempre "encontra" algo.

## Ressalvas (Caveats)
- Este documento é sobre **MEDIR, não sobre lucrar**. Nenhuma recomendação de operação, token, plataforma, tamanho de posição ou parâmetro otimizado é feita — tudo é instrumentação de medição.
- Todos os valores de custo, latência e taxa de graduação são de setembro de 2026 e mudam rapidamente; reconfirme nas fontes oficiais.
- Interpolações entre pontos publicados de Ante (2023) são leituras do autor deste documento, não números do artigo, e estão marcadas como tais.
- A ausência de estudo líquido de custos e de α de memecoin são achados (lacunas reais), não falhas de busca.

*(Este documento cobre integralmente as 9 seções pedidas. Se desejar, a continuação natural seria uma planilha-modelo de cálculo das cinco camadas de custo já convertidas em % da posição — diga "quero a planilha" que eu detalho.)*