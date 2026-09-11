# Método para Pontuar Previsões de IA sobre Preço de Memecoins — Documento Completo

**Para:** Victor (São Paulo) · **Data de referência:** setembro/2026 · **Data de consulta de todas as fontes:** 11/09/2026
**Ferramentas usadas:** Scholar Gateway (busca acadêmica, com DOI) e TinyFish (busca web + leitura da página real via `fetch_content`); um subagente de pesquisa foi usado uma vez para as estatísticas de memecoin. `web_search`/`web_fetch` não foram necessárias.

**Aviso de escopo:** este documento é sobre **MEDIR** previsões. Nada aqui é recomendação de compra, venda ou operação. Todo termo técnico é explicado na primeira vez em que aparece, dentro da própria frase.

**Como ler:** em cada seção separo o que é **Conta** (você refaz numa calculadora) do que é **Literatura** (trabalho acadêmico com DOI, página/seção e data, ou fonte não acadêmica marcada como tal).

---

## (0) Pré-registro — as decisões já fixadas

**Pré-registro** quer dizer escrever todas as regras ANTES da primeira previsão, para você não conseguir mudar o critério depois de ver o resultado (essa prática é defendida em Nosek et al. 2018, PNAS, 10.1073/pnas.1708274114).

Decisões fixadas (confirmadas por você no checkpoint):
- O **Brier score** (uma nota que mede o erro de uma probabilidade; quanto menor, melhor) **DECIDE** quem é o melhor modelo.
- O **log score** (outra nota, baseada em logaritmo; quanto menor, melhor) é **SÓ ALARME** e nunca escolhe o vencedor.
- **Confianças aceitas: de 1% a 99%** (para o log score nunca dar infinito).
- Tudo fixado por escrito antes da primeira previsão.
- **Linha de base de decisão: a frequência histórica de "subiu", medida só em dados ANTERIORES ao período avaliado.** NÃO é "sempre cai" a 0%, como estava no pedido original. **Registro explícito, como você pediu: essa correção foi proposta pelo Claude na etapa de checkpoint e confirmada por você.**

---

## (1) Regra de pontuação escolhida, com exemplo

### Conta (refazível numa calculadora)
Brier = (p − y)², onde **p** é a confiança de que "o token estará acima em N minutos" e **y** = 1 se subiu, 0 se não subiu.

| Previsão | Aconteceu? | Brier | Log score |
|---|---|---|---|
| 70% | subiu | 0,09 | 0,36 |
| 70% | não subiu | 0,49 | 1,20 |
| 95% | não subiu | 0,90 | 3,00 |
| 100% | não subiu | 1,00 | infinito |
| 50% sempre | qualquer | 0,25 | 0,69 |

Log score = −ln(probabilidade dada ao que de fato aconteceu), em logaritmo natural. Conferido: −ln(0,70)=0,36; −ln(0,30)=1,20; −ln(0,05)=3,00; −ln(0)=∞; −ln(0,50)=0,69.

**Por que o Brier é "regra própria"** (própria = a melhor nota média sai quando você diz sua crença verdadeira): se, quando o modelo diz 70%, o preço sobe de fato 7 em 10 vezes, o Brier médio é — dizer 70% → **0,21**; dizer 90% → **0,25**; dizer 100% → **0,30**. O excesso de confiança é punido sozinho. O log score também é próprio.

**Por que o log score não decide:** um corte arbitrário nas confianças extremas pode inverter a ordem dos modelos. Exemplo com 200 previsões: o modelo B tem média 0,665; o modelo A tem 0,64 em 199 previsões e errou uma dizendo 100%. Com corte em 99%, A fica com 0,660 e ganha; com corte em 99,9%, A fica com 0,671 e perde. No Brier, o pior erro vale sempre 1,00 — não depende de corte.

**Decomposição de Murphy:** Brier = calibração − resolução + incerteza, onde resolução é o quanto o modelo separa os casos que sobem dos que não sobem, e incerteza é a dificuldade das próprias perguntas. **Skill score** = 1 − (Brier do modelo ÷ Brier da linha de base).

### Literatura
- Fórmulas do Brier e da decomposição em confiabilidade/resolução/incerteza: Ferro & Fricker 2012 (QJRMS, 10.1002/qj.1924, seção 1). Revisado por pares. Trabalho de método — não se aplica a classificação backtest/ao vivo.
- Regra própria e fragilidade do log score a valores extremos: Gneiting, Balabdaoui & Raftery 2007 (JRSS-B, 10.1111/j.1467-9868.2007.00587.x, seção 3), que afirmam que o log score "lacks robustness". Revisado por pares. Método.
- Instabilidade do log score em extremos, com números: a própria Metaculus documenta (página oficial *Scores FAQ*, consultada 11/09/2026, https://www.metaculus.com/help/scores-faq/, seção "What is the log score?") que ir de 99% para 99,9% dá vantagem mínima se acertar (**+0,009**) mas penalidade enorme se errar (**−2,3**).

### Para INTERVALOS (não é a decisão binária, mas foi pedido no original)
Se um dia você pedir ao modelo um intervalo de preço em vez de um sim/não:
- **Interval score** e **CRPS** (*continuous ranked probability score*, nota que compara toda a distribuição prevista com o valor real): definidos em Gneiting & Raftery 2007 (JASA, 10.1198/016214506000001437).
- **Pinball loss / quantis** (avalia um quantil específico, por exemplo "o preço vai ficar abaixo deste valor 90% das vezes"): Berrisch & Ziel 2022 (Journal of Forecasting, 10.1002/for.2853, tabela 2) mostram que o pinball integrado numa grade fina aproxima o CRPS. Revisado por pares; medição fora da amostra (preços de gás natural).
- **Fica claro:** a decisão binária deste projeto é pelo Brier.

---

## (1b) Regra de resolução precisa

Seu dado de preço mais fino é **vela de 1 minuto** (*candle* = resumo do minuto com abertura, máxima, mínima e fechamento).

### Conta / regra proposta
- **Preço de referência** = fechamento da vela do minuto em que a pergunta foi emitida (minuto **t**).
- **Resultado** = fechamento da vela **N** minutos depois (t+N).
- **O que conta como "acima" (proposta (c), justificada em (E3) abaixo):** um limiar por token, calculado ANTES da pergunta, ligado ao custo de ida e volta ou à volatilidade de 1 minuto medida em dados anteriores. Não use "qualquer valor maior", que resolveria "sim" por ruído de 0,01%.
- **Empate exato / vela faltante:** ver (E4).
- **Token que deixou de existir antes de N minutos:** resolve como "não subiu", nunca anula (ver (E5)); mesma classificação do evento na simulação financeira, onde vira −100%.

### Literatura
- Rotulagem por horizonte fixo com limiar e **tripla barreira** (barreira superior de lucro, inferior de perda e vertical de tempo, atribuída a López de Prado): descrita em Song et al. 2024 (Complexity, 10.1155/2024/5036389, seção 2). O livro de López de Prado é método/livro — não é periódico; não se aplica classificação backtest/ao vivo.
- **Teste de acerto direcional de Pesaran & Timmermann (1992):** descrito em Iworiso & Vrontos 2019 (Journal of Forecasting, 10.1002/for.2632, seção 3.6.2) e em Skabar 2013 (10.1002/for.2247), que alertam que prever sempre "sobe" num mercado de alta dá acerto aparente alto mas estatística PT ≈ 0 (ou seja, "não previu nada").

---

## (2) Calibração para leigo

**Calibração** = quando o modelo diz "70%", o preço sobe de fato perto de 70% das vezes.

### Conta / como medir
Junte todas as previsões na faixa de 65%–75%, veja em quantas o preço realmente subiu; se subiu ~70%, o modelo está calibrado nessa faixa. Repita para cada faixa.

### Literatura
- **Reliability diagram** (gráfico de calibração): plota a frequência observada contra a probabilidade prevista, por faixa; perto da diagonal = calibrado; abaixo da diagonal nas faixas altas = excesso de confiança. Messner et al. 2020 (Wind Energy, 10.1002/we.2497, seção *Evaluation metrics*). Revisado por pares.
- **Barras de consistência** (mostram quanto a diagonal pode oscilar só por acaso, mesmo com um modelo perfeitamente calibrado): Bröcker & Smith 2007; generalizadas para correlação por Pinson, McSharry & Madsen 2010 (QJRMS, 10.1002/qj.559).

---

## (2b) O ponto fraco do Brier e o gráfico de calibração (seção própria)

### Ponto fraco do Brier
O Brier castiga **menos** o erro cometido com certeza extrema do que o log score: no caso "95% e errou", Brier = 0,90 mas log = 3,00. É exatamente por isso que o log score fica como **alarme**: ele grita nos erros de certeza extrema que o Brier abafa.

### Como ler o gráfico de calibração
- **Eixo X:** confiança dita. **Eixo Y:** frequência real de subida. **Diagonal** = calibração perfeita.
- **Abaixo da diagonal nas faixas altas** (ex.: 95–99%) = excesso de confiança (você diz mais do que acerta).
- Cada ponto precisa mostrar **quantas previsões** caíram na faixa (poucas = muito ruído; não confie).
- **Barras de incerteza (consistência):** se o ponto está dentro delas, o desvio da diagonal pode ser só sorte.
- **Faixas extremas (1–5% e 95–99%)** merecem atenção especial, porque é onde o log score explode.
- **Histograma de nitidez (*sharpness*):** mostra se o modelo usa muito as pontas (0,01/0,99) ou fica sempre perto de 50%.

### Exemplo numérico de alarme
Suponha que, na faixa "95–99%", o modelo diz em média 97% mas o preço só sobe **60%** das vezes. Quando erra (40% das vezes), o Brier de cada previsão ≈ (0,97)² ≈ 0,94; quando acerta (60%), ≈ (0,03)² ≈ 0,001. Brier médio da faixa ≈ 0,4×0,94 + 0,6×0,001 ≈ **0,38**. Já o log score médio ≈ 0,4×(−ln 0,03) + 0,6×(−ln 0,97) ≈ 0,4×3,51 + 0,6×0,03 ≈ **1,42** — um número muito mais alto, que "grita" o problema que o Brier suaviza. **Regra:** se a ordem dos modelos no log score divergir da ordem no Brier, isso vai para investigação no gráfico de calibração. Quem decide continua sendo o Brier.

### Literatura
- Excesso de confiança lido como inclinação menor que a diagonal: Strauss et al. 2022 (QJRMS, 10.1002/qj.4311, seção *Verification methods*). Revisado por pares.
- Punição extra do log a erros extremos: Metaculus *Scores FAQ* (página oficial, 11/09/2026).

---

## (3) Linhas de base e como calcular

Uma IA que não bate a linha de base não prevê nada — ela apenas repete o que já se sabia.

### Conta (taxa real de subida = 40%, valor de exemplo)
| Linha de base | Brier |
|---|---|
| "sempre não muda" (diz 0% de chance de ficar acima) | 0,40 |
| "sempre cai" a 0% | 0,40 |
| 50% sempre | 0,25 |
| frequência histórica 40% | 0,24 |
| aleatória (probabilidade uniforme sorteada) | ≈0,33 |

Um modelo com **Brier 0,23** é **≈4% melhor** que a linha de base 0,24 (skill = 1 − 0,23/0,24 = 0,042). Observação: "sempre não muda" e "sempre cai" coincidem em 0,40 porque ambos dizem "não vai ficar acima" — a diferença entre eles só apareceria numa medição de três resultados (sobe/estável/cai), não no binário.

### Regra fixa da frequência histórica (a linha de base de decisão)
Este número muda o skill score de todo modelo, então a regra de cálculo precisa ser tão fixa quanto a regra de pontuação. Proposta (fixe antes):
- **Janela de tempo:** os 30 dias corridos anteriores ao bloco de avaliação.
- **Universo de tokens:** exatamente o mesmo filtro de elegibilidade usado para criar as perguntas, aplicado com a informação que existia na época — **sem** usar a lista de tokens que ainda existem hoje (isso evita viés de sobrevivência).
- **Inclui os tokens que morreram.**
- **Mesmo horizonte N, mesmo limiar, mesmas regras de resolução e anulação.**
- **Frequência de recálculo:** congelada por bloco de avaliação, recalculada em horário fixo UTC (ex.: 00:00 UTC).
- **O valor em vigor é registrado no log de cada pergunta.**
- **Mínimo de dados:** ex.: 500 resoluções válidas; se faltar, *fallback* para 50% fixo e a pergunta é marcada.
- **Período de aquecimento** antes de começar a avaliar de verdade.

### Conta de sensibilidade (por que a linha de base tem de ser fixa por regra)
Taxa real = 40%. Se a frequência usada for 35% **ou** 45%, a linha de base tira Brier ≈ **0,2425** nos dois casos (conferido). O skill do modelo 0,23 então sobe para ≈ **5,2%** (1 − 0,23/0,2425). Ou seja: **errar a linha de base — para qualquer lado — FAVORECE o modelo.** Por isso o número não pode ser escolhido a olho.

### Literatura
- Skill score com climatologia (frequência histórica) como referência: Ben Bouallègue et al. 2019 (QJRMS, 10.1002/qj.3523, seção *Verification methodology*): "the design of the event climatology plays a key role".
- **Climatologia calculada na própria amostra enviesa o skill score** (Mason 2004; Weigel, Liniger & Appenzeller 2007): descrito em Hudson et al. 2011 (10.1002/qj.769, seção *Methods*), que usa o "BSS debiased" justamente para corrigir isso.
- **Agrupar tokens com taxas de base diferentes cria skill falso:** Hamill & Juras 2006 (QJRMS, 10.1256/qj.06.25, resumo). Revisado por pares.
- **Base "em memecoin a maioria cai" (ver seção 10 para detalhe):** Solidus Labs afirma, verbatim, que "approximately 98.7% of tokens on Pump.fun and 93% of liquidity pools on Raydium have exhibited characteristics of pump-and-dump schemes or rug pulls" — **relatório de empresa (qualidade fraca)**, contestado pela própria Pump.fun (porta-voz, via Benzinga/CoinDesk, 07/05/2025: o relatório "lacks a basic understanding of meme coins"). Corroboração on-chain mais forte, da CoinGecko Research: "68.67% (12.8M) of all tokens launched on Pump.fun since January 2024 recorded their last trade on the same day they were created" e "only 4.55% (850K) of tokens survived longer than 90+ days". Corroboração acadêmica: Cernera et al. 2023 (USENIX Security, arXiv:2206.08202): "about 60% of tokens are active for less than one day" (Ethereum/BSC, até mar/2022). A direção — a maioria não sobe/não sobrevive — é robusta; o número exato para o seu universo precisa ser medido.

---

## (4) Previsão → resultado líquido

### Regra
A conversão de previsão em dinheiro simulado é **determinística, pré-registrada e igual para todos os modelos**, usada só como instrumento de medida — **não é recomendação de operar**.

### Custos a listar (líquido = depois de tirar tudo isto)
- Taxa do pool (*fee* do par de negociação).
- Derrapagem de preço (*slippage*) causada pela profundidade do pool.
- Taxa de prioridade / gás.
- Transação que falha.
- Atraso de execução.
- Preço efetivo diferente do fechamento da vela.
- Caso **−100%** (token morre / liquidez removida).

### Conta — por que uma previsão bem calibrada pode ainda assim não dar lucro
**(i) O binário ignora o TAMANHO do movimento.** Exemplo ilustrativo: 70% de chance de subir, com subida média de +0,8% e queda média de −2,5% → 0,7×0,8 − 0,3×2,5 = **−0,19% ANTES de custo**. Bem calibrado e ainda assim negativo, porque as poucas quedas são grandes.
**(ii) O custo pode ser maior que a vantagem:** se a vantagem bruta é +0,1% e o custo de ida e volta é 0,5%, o líquido é negativo.
Os números de custo aqui são **ilustrativos**, a menos que tenham fonte oficial aberta.

### Regra do limiar de decisão
O limiar a partir do qual a simulação "decide operar" é um **parâmetro livre: fixe-o antes**. Otimizá-lo depois de ver os resultados é *data snooping* (procurar até achar um número que parece bom por acaso).

### Literatura
- **Modelo custo-perda:** Rodwell et al. 2020 (QJRMS, 10.1002/qj.3845, seção *Theory*), que mostra que a própria despesa do usuário é uma "proper score"; fórmula de valor econômico relativo em Richardson 2000, via Mastrantonas et al. 2021 (10.1002/qj.4236, *Methodology*).
- **Erro estatístico ≠ lucro:** Leitch & Tanner 1991 e Pesaran & Timmermann, via Kumar et al. 2023 (Journal of Futures Markets, 10.1002/fut.22450, *Literature review*): medidas como o erro quadrático são "crude approximation" do objetivo de trading. Medição líquida de custo (trading).
- **Otimizar limiar depois = data snooping:** White 2000, via Ulbricht et al. 2016 (10.1002/for.2449, *Forecast accuracy tests*); Bailey, Borwein, López de Prado & Zhu 2014; Harvey, Liu & Zhu 2016.

---

## (5) Protocolo de comparação justa entre modelos

### Regra (padrão, como você pediu)
- Todos os modelos recebem a **mesma pergunta**, no **mesmo minuto**, com o **mesmo pacote de informação**.
- A previsão de um modelo **só vale se foi registrada ANTES do fechamento da vela de referência**. Registrada depois = **descartada, não pontuada** (mas continua **registrada no log**).
- **Vela de referência = a vela do minuto em que a pergunta foi emitida (t), igual para todos.** Se fosse o minuto de registro de cada modelo, modelos diferentes estariam prevendo janelas diferentes — comparação inválida.
- **Consequência (E1):** o tempo de resposta útil é **menor que 60 segundos** (depende do segundo em que a pergunta sai). Um modelo de raciocínio lento pode ter quase tudo descartado. Essa é a regra padrão.
- **Alternativa para você decidir (não decido por você):** um **orçamento de latência comum L**, fixado antes — pacote congelado em t, vela de referência em t+L, prazo no fechamento de t+L, igual para todos. Isso dá tempo aos modelos lentos sem quebrar a igualdade.
- O **pacote contém só velas FECHADAS até t−1**. O preço de referência **ainda não existe** quando o modelo responde — isso é **intencional** (evita vazamento) e precisa estar escrito. O texto que o modelo recebe deve dizer, em palavras: "preveja se o token estará acima do fechamento da vela do minuto t (ainda desconhecido), daqui a N minutos".

### Viés do descarte por atraso (E2)
Se o modelo lento atrasa justamente nas perguntas mais voláteis, o conjunto pontuado dele fica diferente do dos outros. Por isso:
- Compare modelos só na **interseção** das perguntas respondidas a tempo por todos.
- **Reporte a cobertura** (% respondida a tempo) de cada modelo.
- **Diagnóstico:** compare o Brier da linha de base nas perguntas respondidas × não respondidas — se forem diferentes, o modelo está "escolhendo" as perguntas fáceis ao atrasar nas difíceis.
- A previsão atrasada é descartada e não pontuada, **mas continua registrada no log**.

### Literatura
- Comparação justa e conjunto de modelos: teste de **Diebold & Mariano** (via Berrisch & Ziel 2022, 10.1002/for.2853) e **conjunto de confiança de modelos** de Hansen, Lunde & Nason 2011 (via D'Innocenzo et al. 2023, 10.1002/jae.3013, e Kaplan et al. 2026, 10.1002/mde.70129), que "controla o problema de data snooping das comparações par a par".
- **Comparações múltiplas:** Holm 1979 (correção). E o **paradoxo de Aldous** ("A prediction tournament paradox", The American Statistician, 10.1080/00031305.2019.1604430): o vencedor de um torneio não é necessariamente o melhor previsor.

---

## (6) Vazamentos e como evitar

**Vazamento** = o modelo, de algum jeito, "sabe" o futuro. Lista a cobrir:

- **Memorização de preços históricos pelo modelo:** por isso **só contam previsões AO VIVO**, registradas antes do fato; nada de *backtest* em datas anteriores ao corte de treino. Bradford Levy 2026 (Journal of Accounting Research, 10.1111/1475-679x.70058, seção *Look-Ahead Bias*) demonstra que LLMs comerciais têm *look-ahead bias* significativo e que a solução é avaliação fora da amostra em tempo real, "akin to how RCTs are preregistered and executed". Revisado por pares; medição ao vivo/fora da amostra.
- **Ferramentas, web ou busca durante o raciocínio:** "mais tempo" só vira vazamento se houver um **canal para dado novo**. Bloqueie acesso externo durante a resposta.
- **Novas tentativas / re-rolagens:** guardar só a melhor é escolher acertos. **Registre TODA chamada** (inclusive falhas) e mantenha **uma previsão por modelo por pergunta**.
- **Convenção de horário da vela:** rotulada pela abertura × pelo fechamento (erro de um minuto), fuso UTC × local, relógio do servidor (NTP) e atraso de ingestão do provedor.
- **Vela em formação dentro do pacote** e indicadores cuja janela passa do congelamento.
- **Velas revisadas ou preenchidas retroativamente** pelo provedor.
- **Metadados do token atualizados depois** (ex.: marcação de golpe adicionada só mais tarde).
- **Fonte de dados diferente** para a referência e para o resultado.
- **Perguntas selecionadas depois de ver o movimento.**
- **Operador editando prompt ou regras depois de ver resultados.**
- **Versão do modelo mudando sem aviso:** fixe o identificador de versão.

### Verificação de provedores de velas
A documentação da **GeckoTerminal** (página oficial, consultada 11/09/2026, https://apiguide.geckoterminal.com — página aberta) confirma que o *timestamp* é epoch/unix em segundos; a documentação da **CoinGecko API** (só snippet) descreve o formato [timestamp, open, high, low, close] com o *timestamp* sendo o horário de **fechamento** da vela. Isso importa porque um erro de rótulo (abertura vs. fechamento) desloca tudo em um minuto e cria vazamento. **O provedor do seu projeto não foi identificado — então a convenção de horário, a política de vela faltante e a revisão retroativa DELE ficam NÃO VERIFICADAS para o seu caso.**

### Literatura adicional
- Vazamento temporal e uso de "vintages" de dados em tempo real: Cerqua, Letta & Pinto 2025 (Oxford Bulletin of Economics and Statistics, 10.1111/obes.70019, *The Leakage Problem*).
- "Leakage gap" de 5%–20% em R² quando se usa split aleatório em série autocorrelacionada: Rustagi et al. 2026 (10.1002/dac.70599, *Introduction*).

---

## (E3) Limiar de "acima" — as quatro opções avaliadas

- **(a) qualquer valor maior** — resolve "sim" por ruído de 0,01%; ruim.
- **(b) limiar fixo único** — simples, mas injusto entre tokens de volatilidades muito diferentes.
- **(c) limiar por token calculado antes da pergunta**, ligado ao custo de ida e volta ou à volatilidade de 1 minuto medida em dados anteriores — **proposto**.
- **(d) zona morta simétrica** que anula a pergunta se o movimento for pequeno.

**Escolha (c):** mede um movimento economicamente significativo sem virar recomendação de operar. A **frequência histórica da linha de base tem de usar exatamente o mesmo limiar**, senão a comparação é injusta. Diferença conceitual importante: medir **direção** (subiu?) é diferente de medir se o movimento **cobriu o custo** — este documento mede; não recomenda operar. Pistas verificadas: rotulagem por horizonte fixo/tripla barreira (Song et al. 2024) e teste direcional de Pesaran & Timmermann (Iworiso & Vrontos 2019; Skabar 2013).

## (E4) Empate exato e vela faltante
- Trate **separadamente** a vela faltante na **referência** e no **resultado**.
- Compare "repetir o último fechamento" com "anular". Proposta: **anular** quando falta a vela de referência; para o resultado, **repetir o último fechamento conhecido** só se houver negociação dentro de X minutos, senão **anular**.
- Qualquer anulação depende **só de dados iguais para todos**, é fixada antes e vale também para a linha de base.
- **Reporte a taxa de anulação.** Verifique se as anulações se concentram em certos tokens ou em previsões extremas, porque a anulação pode virar porta para esconder erros.

## (E5) Token que deixou de existir antes de N minutos
- **Regra (confirmada):** resolve como **"não subiu"; NUNCA anula.** Anular removeria justamente os piores casos, inflaria a frequência de "subiu" (**viés de sobrevivência**) e tiraria o mérito de um modelo que prevê colapso.
- **"Deixou de existir" operacionalmente:** evento on-chain de remoção de liquidez, OU reservas do pool abaixo de X, OU nenhuma vela após o minuto k. Separe isso de "vela faltante por falta de negociação".
- **Mesma regra da simulação financeira?** Mesma **classificação** do evento (é um colapso), mas magnitudes diferentes: no Brier vira "não subiu" (binário); na simulação vira **−100%**.
- **Honeypot / taxa de venda abusiva** (o preço sobe mas não dá para vender): a resolução binária por preço daria "sim" e a simulação daria −100%. **Registre essa divergência num campo próprio do log ("vendável: sim/não")** e reporte-a em separado; não a esconda.

Base do viés de sobrevivência (a maioria dos tokens morre): ver seção (10).

---

## (7) Tamanho de amostra (método, não número mágico)

### Conta (refeita e conferida)
1. Para cada pergunta i, calcule **d_i = Brier do modelo − Brier da linha de base**. No exemplo, a diferença média é **−0,01** (o modelo é melhor por 0,01).
2. Quem decide quantas perguntas você precisa é **o quanto d_i oscila de pergunta para pergunta (o desvio-padrão)**, não só a média. Se a diferença média é pequena mas cada pergunta pula muito para cima e para baixo, você precisa de muitas perguntas para ter certeza de que a média negativa não foi sorte.
3. **Cenário ilustrativo (é conta):** taxa de subida 40%; modelo perfeitamente calibrado que diz 30% em metade das perguntas e 50% na outra metade → Brier 0,23 contra 0,24. Os valores possíveis de d_i são +0,13 (probabilidade 0,15), −0,07 (0,35), −0,11 (0,25) e +0,09 (0,25). Média = −0,01; **desvio-padrão ≈ 0,096** (conferido: E[d²]=0,0093, variância=0,0092, raiz=0,0959).
4. **Com perguntas INDEPENDENTES:** n ≈ ((z_confiança + z_poder) × desvio ÷ 0,01)². Aqui "confiança" = chance de **não** gritar "achei diferença" quando não há nenhuma (95% → z=1,96); "poder" = chance de **achar** a diferença quando ela existe de verdade (80% → z=0,84).
   - 95% + 80% de poder: (1,96+0,84)×0,096/0,01 = 26,88 → ao quadrado ≈ **720 perguntas independentes**.
   - só para cruzar o limiar em média (poder de 50%, z=0): ≈ **350**.
   - com 5 modelos e correção de Bonferroni (α=1%, z=2,576) + 80% de poder: ≈ **1.070**.
5. **Ajuste pela dependência:** se a mesma moeda recebe uma pergunta a cada minuto com horizonte de 30 min, as janelas se **sobrepõem**; tokens diferentes no mesmo minuto também se movem juntos. As duas coisas **reduzem o número efetivo de observações independentes**, então o **n bruto** precisa ser maior — tipicamente um múltiplo de 2× a 10× do n independente (o multiplicador exato precisa ser medido por simulação/bootstrap em blocos no seu próprio dado; **NÃO VERIFICADO** para o seu caso).
6. **Tabela de sensibilidade de n** (95% + 80% de poder, efeito 0,01):

| Desvio-padrão de d_i | n independente aproximado |
|---|---|
| 0,06 | ≈ 280 |
| 0,096 (cenário central) | ≈ 720 |
| 0,10 | ≈ 785 |
| 0,15 | ≈ 1.765 |
| 0,20 | ≈ 3.140 |

7. **Resposta clara para dimensionar o projeto:** para uma vantagem tão pequena (0,23 vs 0,24, ~4%), você precisa de **centenas a poucos milhares de previsões INDEPENDENTES** (≈720 no cenário central; mais de 1.000 com 5 modelos). Sob o desenho proposto (uma pergunta por moeda por minuto, horizonte 30 min), por causa da dependência isso vira **vários milhares de previsões BRUTAS por modelo — provavelmente na casa das dezenas de milhares.** Planeje o projeto para milhares de previsões brutas por modelo, no mínimo.
8. **O tamanho de amostra do RESULTADO FINANCEIRO é SEPARADO** (cauda pesada — ver E7): a média é dominada por pouquíssimos eventos gigantes, então exige muito mais dados e métodos robustos (bootstrap em blocos, mediana, percentis).

### Literatura
- Variância amostral do Brier/BSS e "tamanho de amostra efetivo" sob dependência serial: **Wilks 2010** (QJRMS, 10.1002/qj.709, seções 2 e 4) — "the effect of serial correlation is to inflate the variances… uncorrected confidence intervals are too narrow"; conclui que **N ≈ 3.000** é adequado para estimar skill com o Brier. Revisado por pares.
- Grandes amostras exigidas (ordem de 10² ou mais): Bradley, Schwartz & Hashino 2008 (via Wilks 2010) e Jarman & Smith 2018 (10.1002/qj.3384, *Effects of serial dependence*).
- Diebold-Mariano com erro-padrão HAC/Newey-West e bootstrap em blocos, e distorção em amostras pequenas: Coroneo & Iacone 2020 (10.1002/jae.2756, *Introduction*).

## (E7) Cauda pesada
O Brier fica entre 0 e 1, então a **cauda pesada** do preço (poucos eventos gigantes que dominam a média) não entra na nota do mesmo jeito, mas **domina o resultado financeiro**. Trate os dois tamanhos de amostra em separado. Para o financeiro, use **bootstrap em blocos, mediana e percentis** em vez da média simples. Base: caudas pesadas são fato estilizado de retornos (Cont 2001, Quantitative Finance, 10.1080/713665670).

## (E8) Parar quando "deu significativo"
Olhar o placar toda hora e parar no melhor momento **infla o falso positivo**. Duas saídas válidas:
- **(1) fixar n antes**;
- **(2) usar métodos válidos a qualquer momento:** e-valores e sequências de confiança. Vovk & Wang 2024 (Canadian Journal of Statistics, 10.1002/cjs.11833) e Wang & Ramdas 2022 (JRSS-B, 10.1111/rssb.12489) sobre e-valores; Howard et al. 2021 (Annals of Statistics) sobre sequências de confiança; Henzi & Ziegel 2022 e Choe & Ramdas sobre comparação sequencial de previsores. Revisado por pares.

## (E9) Vários modelos ao mesmo tempo
Use correção para comparações múltiplas (**Holm 1979**) ou o **conjunto de confiança de modelos** (Hansen, Lunde & Nason 2011). E lembre do **paradoxo de Aldous**: o vencedor de um torneio não é necessariamente o melhor previsor.

## (E10) Divergências — as duas versões e a diferença de método
- **Good Judgment (Brier) × Metaculus (log):** o Good Judgment Open usa **Brier score** (de 0 a 2, menor melhor — página oficial, https://www.gjopen.com, 11/09/2026, só snippet); a Metaculus usa **Baseline e Peer scores**, ambos baseados no **log score** (página oficial *Scores FAQ*, 11/09/2026, página aberta). **Diferença de método:** o Brier limita o pior erro em 1,00; o log pune muito mais a certeza extrema errada.
- **Pró-quadrática (Brier):** Selten 1998; Merkle & Steyvers 2013; Bickel 2007. **Pró-log:** Benedetti 2010; Roulston & Smith 2002. A escolha deste projeto (Brier decide, log alarme) fica **entre as duas**: usa a robustez do Brier para decidir e a sensibilidade do log como diagnóstico.

---

## (8) Log auditável

### Regra
Cada previsão vira uma **linha de log** que qualquer pessoa possa conferir depois.

Campos mínimos:
- id da pergunta, token, minuto t (UTC, **dado pelo servidor de log, não pelo modelo**);
- **hash do PACOTE DE INFORMAÇÃO** que o modelo recebeu — **sem isso não dá para provar depois que o modelo não viu o futuro**;
- hash do template de prompt e da configuração/versão do modelo;
- a previsão (confiança entre 1% e 99%);
- **hash desta linha e hash da linha anterior** (encadeamento);
- carimbo de tempo por terceiro.

**Registro de resolução separado:** velas usadas + hash dos dados brutos, valor da linha de base em vigor, Brier, log score, motivo de anulação, campo "vendável".

Requisitos técnicos:
- **Serialização canônica** antes do hash (RFC 8785, *JSON Canonicalization*) — sem ela, o mesmo conteúdo pode gerar hash diferente e a conferência falha.
- **SHA-256** (NIST FIPS 180-4).
- **Encadeamento de hashes** (cada linha inclui o hash da anterior) e/ou **árvore de Merkle** (uma estrutura que resume muitos registros num único hash).
- **Carimbo de tempo por terceiro** (RFC 3161) ou **ancoragem pública** (OpenTimestamps, que usa a blockchain do Bitcoin como cartório de tempo — https://en.wikipedia.org/wiki/OpenTimestamps, 11/09/2026, só snippet).
- **Comprometer-e-revelar:** publicar os hashes ANTES da resolução e o conteúdo depois.
- **Hash do documento de pré-registro** (regras, versões, parâmetros, regra da linha de base).

### Exemplo de linha de log (JSON)
```json
{
  "id_pergunta": "q-2026-09-11T13:37:00Z-TOKENX",
  "token": "TOKENX",
  "minuto_t_utc": "2026-09-11T13:37:00Z",
  "hash_pacote_info": "sha256:9f2b...",
  "hash_prompt_template": "sha256:1a44...",
  "modelo_versao": "modeloA-2026-08-01",
  "previsao_confianca": 0.70,
  "horizonte_min": 30,
  "limiar_token": 0.006,
  "hash_linha_anterior": "sha256:77cd...",
  "hash_desta_linha": "sha256:0b19...",
  "carimbo_tempo": "ots:proof-file-ref"
}
```

### Passo a passo de como qualquer pessoa confere
1. **Recalcular o SHA-256** de cada linha (após a serialização canônica) e conferir com o campo `hash_desta_linha`.
2. **Conferir a cadeia:** o `hash_linha_anterior` de cada linha bate com o `hash_desta_linha` da linha anterior (assim ninguém insere/apaga registros no meio).
3. **Conferir, pelo carimbo de tempo** (RFC 3161 / OpenTimestamps), que o registro é **anterior ao fechamento da vela de referência**.
4. **Recalcular Brier e log score** a partir das velas registradas e do hash dos dados brutos.

### Literatura
- Logging à prova de adulteração e encadeamento de hashes: Haber & Stornetta 1991 (10.1007/BF00196791); Schneier & Kelsey 1999 (10.1145/317087.317089); Crosby & Wallach 2009 (USENIX Security).
- Árvore de Merkle / transparência: RFC 6962 e RFC 9162 (Certificate Transparency).
- Carimbo de tempo confiável: RFC 3161; ancoragem pública: OpenTimestamps.
- Serialização canônica: RFC 8785. Hash: NIST FIPS 180-4.
- Pré-registro: Nosek et al. 2018 (PNAS, 10.1073/pnas.1708274114).
- (RFCs e FIPS são padrões técnicos; a classificação backtest/ao vivo/líquido de custo não se aplica.)

---

## (9) NÃO VERIFICADOS

- **Provedor de velas OHLCV do seu projeto:** não foi identificado. A convenção de horário (abertura vs. fechamento), a política de vela faltante e a revisão retroativa DELE ficam **NÃO VERIFICADAS**. Verifique na documentação do provedor real antes de fixar a regra de resolução.
- **Multiplicador exato entre n independente e n bruto** (efeito da dependência serial e do co-movimento entre tokens): **NÃO VERIFICADO** para o seu desenho; precisa de simulação/bootstrap em blocos no seu próprio dado.
- **Números de custo** (taxa, slippage, gás) da seção (4) são **ilustrativos**; substitua por dados on-chain reais do seu par.
- **Taxa real de subida** (usei 40% como exemplo) precisa ser medida no seu universo; ela muda todos os skill scores.
- **Estatística "a maioria cai" em memecoin:** a direção está bem apoiada (Solidus Labs — relatório de empresa, contestado pela Pump.fun; CoinGecko Research e Cernera et al. — dado on-chain), mas o **número exato para o SEU universo de tokens** (com o seu filtro de elegibilidade e o seu horizonte N) **não foi medido** e precisa ser calculado no seu próprio dado.
- **Taxa de graduação da Pump.fun** citada na seção (10) (≈1,4%–2,7%) vem de análises on-chain de terceiros (Bitquery/laikalabs) e **não foi confirmada em fonte primária revisada por pares**; use como corroboração fraca da direção.
- Vários DOIs das "pistas bibliográficas" do pedido (ex.: Selten 1998, Bickel 2007, Roulston & Smith 2002, Holm 1979, Howard et al. 2021) foram **citados por referência secundária** ou pelo nome, mas **não abertos individualmente** — só afirmo o que a busca retornou e o que abri.

---

## (10) Fontes

Formato: link · data de consulta · (página aberta)/(só snippet) · venue · revisado por pares? · página/seção · tipo de medição.

**Acadêmicas (Scholar Gateway, todas consultadas 11/09/2026; trecho/seção aberto no resultado da busca):**
- Ferro & Fricker 2012, "A bias-corrected decomposition of the Brier score", QJRMS, 10.1002/qj.1924 · seção 1 · revisado por pares · método.
- Gneiting, Balabdaoui & Raftery 2007, "Probabilistic forecasts, calibration and sharpness", JRSS-B, 10.1111/j.1467-9868.2007.00587.x · seção 3 · revisado por pares · método.
- Gneiting & Raftery 2007, JASA, 10.1198/016214506000001437 · interval score/CRPS · revisado por pares · método.
- Berrisch & Ziel 2022, Journal of Forecasting, 10.1002/for.2853 · tabela 2 · revisado por pares · fora da amostra (gás natural).
- Messner et al. 2020, Wind Energy, 10.1002/we.2497 · *Evaluation metrics* · revisado por pares · método/aplicado.
- Pinson, McSharry & Madsen 2010, QJRMS, 10.1002/qj.559 · resumo · revisado por pares · método.
- Strauss et al. 2022, QJRMS, 10.1002/qj.4311 · *Verification methods* · revisado por pares · aplicado.
- Ben Bouallègue et al. 2019, QJRMS, 10.1002/qj.3523 · *Verification methodology* · revisado por pares · ao vivo (15 anos ECMWF).
- Hamill & Juras 2006, QJRMS, 10.1256/qj.06.25 · resumo · revisado por pares · método.
- Hudson et al. 2011, QJRMS, 10.1002/qj.769 · *Methods* (BSS debiased) · revisado por pares · backtest (hindcast).
- Wilks 2010, QJRMS, 10.1002/qj.709 · seções 2 e 4 · revisado por pares · método.
- Jarman & Smith 2018, QJRMS, 10.1002/qj.3384 · *Effects of serial dependence* · revisado por pares · método.
- Coroneo & Iacone 2020, Journal of Applied Econometrics, 10.1002/jae.2756 · *Introduction* · revisado por pares · método.
- Rodwell et al. 2020, QJRMS, 10.1002/qj.3845 · *Theory* (custo-perda) · revisado por pares · aplicado.
- Mastrantonas et al. 2021, QJRMS, 10.1002/qj.4236 · *Methodology* (valor econômico, Richardson 2000) · revisado por pares · aplicado.
- Kumar et al. 2023, Journal of Futures Markets, 10.1002/fut.22450 · *Literature review* (Leitch & Tanner; Pesaran & Timmermann) · revisado por pares · líquido de custo (trading).
- Iworiso & Vrontos 2019, Journal of Forecasting, 10.1002/for.2632 · seção 3.6.2 (teste PT) · revisado por pares · fora da amostra + econômico.
- Skabar 2013, Journal of Forecasting, 10.1002/for.2247 · *Measuring directional forecast accuracy* · revisado por pares · fora da amostra.
- Song et al. 2024, Complexity, 10.1155/2024/5036389 · seção 2 (tripla barreira) · revisado por pares · backtest/simulação.
- Bradford Levy 2026, Journal of Accounting Research, 10.1111/1475-679x.70058 · *Look-Ahead Bias* · revisado por pares · ao vivo/fora da amostra.
- Cerqua, Letta & Pinto 2025, Oxford Bulletin of Economics and Statistics, 10.1111/obes.70019 · *The Leakage Problem* · revisado por pares · método.
- Rustagi et al. 2026, Int. J. Communication Systems, 10.1002/dac.70599 · *Introduction* (leakage gap) · revisado por pares · método/aplicado.
- Vovk & Wang 2024, Canadian Journal of Statistics, 10.1002/cjs.11833 · *Introduction* (e-valores) · revisado por pares · método.
- Wang & Ramdas 2022, JRSS-B, 10.1111/rssb.12489 · "when might one prefer e-values" · revisado por pares · método.
- D'Innocenzo et al. 2023, Journal of Applied Econometrics, 10.1002/jae.3013 · uso do MCS · revisado por pares · fora da amostra.
- Kaplan et al. 2026, Managerial and Decision Economics, 10.1002/mde.70129 · Tabela 11 (MCS/Giacomini-White) · revisado por pares · fora da amostra.
- Aldous, "A prediction tournament paradox", The American Statistician, 10.1080/00031305.2019.1604430 · revisado por pares · método.
- Liu, Tsyvinski & Wu 2022, Journal of Finance, 10.1111/jofi.13119 · momentum/atenção em cripto · revisado por pares · fora da amostra (long-short).
- Cernera et al. 2023, "Token Spammers, Rug Pulls, and Sniper Bots", USENIX Security, arXiv:2206.08202 · revisado por pares (conferência) · on-chain: "about 60% of tokens are active for less than one day" (Ethereum/BSC até mar/2022).
- Cont 2001, Quantitative Finance, 10.1080/713665670 · caudas pesadas · revisado por pares · empírico.

**Não acadêmicas (TinyFish):**
- Metaculus, "Scores FAQ", https://www.metaculus.com/help/scores-faq/ · 11/09/2026 · **(página aberta)** · página oficial de torneio · não revisado por pares · seções "What is the log score?"/"Baseline"/"Peer" · define log score e a instabilidade de extremos (99% vs 99,9%: +0,009 vs −2,3).
- Good Judgment Open, https://www.gjopen.com · 11/09/2026 · **(só snippet)** · página oficial · Brier de 0 a 2, menor melhor.
- GeckoTerminal API Docs, https://apiguide.geckoterminal.com · 11/09/2026 · **(página aberta)** · documentação de provedor · timestamp unix; formato OHLCV.
- CoinGecko API (Trading) · 11/09/2026 · **(só snippet)** · documentação de provedor · timestamp = horário de fechamento da vela.
- **Solidus Labs**, "Solana Rug Pulls & Pump-and-Dumps" (2025 Rug Pull Report), https://www.soliduslabs.com/reports/solana-rug-pulls-pump-dumps-crypto-compliance · 11/09/2026 · **(página aberta pelo subagente)** · **relatório de empresa (qualidade fraca; a Solidus vende ferramenta de detecção; contestado pela Pump.fun)** · verbatim: "approximately 98.7% of tokens on Pump.fun and 93% of liquidity pools on Raydium have exhibited characteristics of pump-and-dump schemes or rug pulls." Escala: >7 milhões de tokens de jan/2024 a mar/2025, só ~97.000 com liquidez acima de US$1.000. Contestação nomeada: porta-voz da Pump.fun, via Benzinga/CoinDesk (07/05/2025), disse que o relatório "lacks a basic understanding of meme coins." Dado on-chain que corrobora a direção: CoinGecko (abaixo).
- **CoinGecko Research**, "The Average Lifespan of Pump.fun Memecoins Is Less Than a Day", https://www.coingecko.com/research/publications/average-lifespan-of-pumpfun-tokens · 11/09/2026 (publicado 24/06/2026) · **(página aberta pelo subagente)** · pesquisa de empresa baseada em dado on-chain (Dune Analytics) — qualidade moderada · verbatim: "68.67% (12.8M) of all tokens launched on Pump.fun since January 2024 recorded their last trade on the same day they were created"; "only 4.55% (850K) of tokens survived longer than 90+ days"; somando o 2º dia, "14.99 million tokens — 80.37% of launches — stopped trading on day zero or day one." Base: 18,67M tokens (14/01/2024–18/06/2026). "Sobreviver" aqui = ao menos um trade após o período, não desempenho de preço.
- Taxa de graduação da Pump.fun (share que chega à Raydium): medições on-chain de terceiros situam-na em ~1,4%–2,7% (Bitquery/Medium, ago–set/2026: "Measured graduation rate: 2.7%"; laikalabs.ai citando dados de 2025: "only about 1.4 percent of launched tokens successfully graduate to Raydium"), ou seja ~97–98% morrem na bonding curve · **fonte de terceiros/empresa, corroboração fraca; NÃO VERIFICADO em fonte primária revisada por pares.**
- OpenTimestamps, https://en.wikipedia.org/wiki/OpenTimestamps · 11/09/2026 · **(só snippet)** · padrão aberto · carimbo de tempo via Bitcoin.

**Padrões técnicos (citados por número, não abertos individualmente):** RFC 3161 (timestamping), RFC 6962/9162 (Certificate Transparency), RFC 8785 (JSON Canonicalization), NIST FIPS 180-4 (SHA-256).

---

## (11) Consultas de busca realizadas

**Scholar Gateway (fonte acadêmica primária):**
1. Brier score proper scoring rules for binary probabilistic forecasts and its decomposition into calibration resolution uncertainty
2. logarithmic score versus quadratic scoring rule for eliciting probability forecasts advantages disadvantages
3. strictly proper scoring rules prediction evaluation continuous ranked probability score interval score quantile pinball loss
4. reliability diagram calibration probability forecasts consistency bars sampling uncertainty
5. Brier skill score climatological reference forecast bias sampling small sample overestimation skill
6. sampling uncertainty of Brier score under serial dependence forecast comparison significance
7. meme coin pump and dump rug pull liquidity removal decentralized exchange survivorship
8. temporal leakage look-ahead bias large language models forecasting evaluation training cutoff
9. e-values anytime-valid confidence sequences comparing sequential forecasters
10. cryptocurrency return predictability momentum investor attention Bitcoin cross-section
11. cost-loss ratio economic value of probabilistic forecasts decision threshold
12. Diebold Mariano test comparing predictive accuracy multiple model confidence set data snooping
13. triple barrier method financial machine learning labeling meta-labeling directional accuracy Pesaran Timmermann

**TinyFish (busca + leitura da página real):**
1. Metaculus scoring Baseline Peer score log score explanation (+ fetch_content da *Scores FAQ*)
2. Good Judgment Open Brier score how scoring works
3. GeckoTerminal OHLCV API candle timestamp UTC open close convention (+ fetch_content da API Docs)
4. pump.fun tokens percentage rug pull die statistics Solana memecoin survival 2025
5. OpenTimestamps how it works bitcoin blockchain timestamp proof

**Subagente de pesquisa (1 uso):** estatísticas citáveis de fracasso/queda de memecoins — Solidus Labs (verbatim 98,7%), CoinGecko Research (verbatim 68,67% morrem no mesmo dia; 4,55% passam de 90 dias), Cernera et al. USENIX 2023 (~60% ativos <1 dia), e taxa de graduação da Pump.fun (~1,4%–2,7%).

---

### Resumo executivo (o essencial em cinco linhas)
1. **Brier decide; log score só alarme; confianças 1%–99%; tudo pré-registrado.** A correção da linha de base (frequência histórica de "subiu", medida só em dados anteriores) foi proposta pelo Claude e confirmada por você.
2. **Bata a linha de base ou não prevê nada** — e como errar a linha de base infla o skill, ela precisa de regra tão fixa quanto a nota.
3. **Uma previsão calibrada pode dar prejuízo** porque o binário ignora o tamanho do movimento e o custo pode superar a vantagem.
4. **Dimensione para milhares de previsões brutas por modelo** (≈720 independentes no cenário central; dezenas de milhares de brutas por causa da dependência).
5. **Sem log auditável com hash do pacote de informação, carimbo de tempo e encadeamento, não dá para provar que o modelo não viu o futuro.** O que não fechou está em NÃO VERIFICADOS.