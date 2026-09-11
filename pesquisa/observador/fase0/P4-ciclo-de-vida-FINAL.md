# Observatório de memecoins na pump.fun — Documento final (Fase II)
**Data de consulta de todas as fontes: 11 de setembro de 2026.** Este é um documento de **descrição de mercado**. Não contém conclusão nem recomendação de investimento.

Nota ao leitor leigo: os termos técnicos são explicados na primeira vez em que aparecem, dentro da própria frase. Um **preprint** é um trabalho científico publicado pelos próprios autores (em servidores como o arXiv ou o SSRN) **antes** de passar pela avaliação de outros pesquisadores da área — ou seja, **não é "revisado por pares"**. A expressão "revisado por pares" só é usada aqui para artigo efetivamente publicado em periódico ou conferência com avaliação independente comprovada.

---

## Resultado das três verificações obrigatórias (Parte I)

**VERIFICAÇÃO A — Autoria do arXiv 2607.02823 (página aberta).** A página do arXiv foi aberta integralmente. O autor é **Arati Uday Kamat (autor único)**. Confirma-se a atribuição **"Kamat (2026)"** e **descarta-se "Hu et al."**. Título exato: *"Pump.fun Graduation Regime Windows: Survival Analysis of 832,941 Token Launches and the Social-Presence Effect"*. Submetido em **2 de julho de 2026** (v1); última revisão em **17 de agosto de 2026** (v3); há ainda um comentário de versão "v4 Replace" (correção da lista de referências). Categoria q-fin.TR (Trading and Market Microstructure). Também disponível no SSRN (ID 6915560) e com conjunto de dados no Zenodo (DOI de dados 10.5281/zenodo.20633486, licença CC-BY-4.0). A origem da confusão "Hu et al." fica clara: "Hu, Tekin, Xu, Liu" são os autores de OUTRO trabalho — o MemeTrans/MELT (arXiv 2602.13480) —, ou seja, houve troca de identificador/atribuição por parte de uma pesquisa anterior, não pelo arXiv.

O n = 832.941 e a taxa de 0,198% (IC 95% [0,189%–0,208%]) **pertencem de fato a este preprint de Kamat** — não houve troca de identificador quanto a esses dois números. **Correção importante de dado que consta do próprio preprint:** uma errata (corrigenda v1.3) informa que a coleta cobriu efetivamente só cerca de **6 minutos** após cada lançamento — e não 24 horas —, de modo que 0,198% deve ser lido como uma taxa de "regime rápido" (fast-regime) e um **piso** (limite inferior) da taxa real de 24 horas, não uma estimativa dela. O próprio autor afirma, verbatim, que a razão de 3,18× frente aos 0,63% de Marino et al. "is an upper bound on the true decline, and the true decline is smaller by an amount this dataset cannot establish". ("Intervalo de confiança de 95%" quer dizer: se o estudo fosse repetido muitas vezes, em 95% delas o valor real cairia dentro daquela faixa; "análise de sobrevivência" é o conjunto de métodos estatísticos — aqui Kaplan-Meier e Cox — que mede o tempo até um evento acontecer, neste caso a graduação.)

**VERIFICAÇÃO B — Dados Bitquery de agosto/setembro de 2026 (página aberta).** Artigo encontrado e aberto integralmente: *"Pump.fun API: How to Track Bonding Curves, Graduations and PumpSwap On-Chain"*, publicação **Coinmonks no Medium**, autoria "Coinmonks Team" (o autor declara, verbatim: *"I work on data tooling at Bitquery, whose API produced the measurements above"*), **data 3 de setembro de 2026**. Números confirmados na íntegra:
- **Lançamentos por dia entre 30.663 (mínimo) e 52.438 (máximo)** no período de **5 de agosto a 2 de setembro de 2026** (29 dias; 1.109.779 tokens no total). Na semana de 27/08 a 02/09, 282.428 tokens (um novo token a cada ~2 segundos).
- **Taxa de graduação ≈ 2,7%**, medida por **coorte** (grupo de tokens nascidos no mesmo dia, acompanhado ao longo do tempo até 2 de setembro): 6/08 → 2,84% (998 de 35.183); 13/08 → 2,69% (1.045 de 38.835); 20/08 → 2,60% (1.066 de 40.934); 26/08 → 3,10% (1.535 de 49.530). O autor resume: *"Call it 2.7%, stable within half a percentage point across four independent cohorts."* ("Coorte" = grupo definido por um ponto de partida comum, aqui os tokens que nasceram no mesmo dia; acompanha-se esse grupo para frente no tempo.)

Método de medição confirmado: a **"graduação" é definida on-chain pelo saldo-base da curva chegar à constante de 206.900.000 tokens** (equivalente a 793,1 milhões de tokens vendidos, ou seja, a curva completa e migra para a PumpSwap), **NÃO por um limiar em dólares**. O próprio artigo diz, verbatim, que não existe limiar fixo de market cap: *"There isn't one, and this is the single most common wrong assumption"*; e mostra que o valor em dólares na graduação variou entre ~US$ 11 mil (percentil 10) e ~US$ 101 mil (percentil 90), com mediana ~US$ 38 mil. ("Bonding curve" ou curva de emissão = fórmula que fixa o preço automaticamente conforme se compra e vende; "market cap" = preço × total de tokens; "DEX" = corretora descentralizada, sem intermediário central; "liquidez" = dinheiro disponível no caixa do token para negociar sem derrubar o preço.)

Natureza da fonte: **autopublicado por fornecedor de dados** (a Bitquery vende API de dados de blockchain; o artigo está no Medium/Coinmonks). É corroboração **forte** por ser on-chain e reproduzível via consulta (query), mas **não é fonte independente** — o próprio medidor tem interesse comercial no assunto.

**VERIFICAÇÃO C — Diferença entre 2,7% (agosto, Bitquery) e 0,26% (junho, The Block).** A divergência de ~10× é explicável e vem de **DUAS causas somadas — método E mudança real de mercado —, não de uma só**:

- **(i) Mudança real de regime (causa principal e documentada).** Entre as duas medições, a pump.fun lançou o **BOOST em 21 de julho de 2026**, novo mecanismo padrão de lançamento. O próprio The Block reportou (29/07/2026, verbatim): *"Pump.fun's graduation rate reached 6.7% last Friday, roughly 8x higher than the average throughout June... it averaged 4.7% across the previous four days, against 2.5% the week before."* Antes disso, em maio de 2026, a plataforma introduziu pares em USDC; e as "cashback coins" já haviam elevado a graduação. A Cryptopolitan (19/02/2026, citando Dune) registrou, verbatim: *"Weekly graduations increased to 1.15% of all tokens, the highest level since the summer of 2025... Historically, the peak graduation rate has grown to around 2%, later sliding to as low as 0.5% or around 80 tokens daily."* Ou seja, houve alta genuína de mercado no intervalo junho→agosto.
- **(ii) Limiar de graduação diferente (causa de método).** O rastreador do The Block define graduação como o token atingir **US$ 100 mil de market cap** (a própria página do The Block descreve: *"Pump.fun tokens 'graduate' when they reach a market cap of $100k"*); a Bitquery define como **completar a curva** (constante on-chain de 206.900.000; mediana real ~US$ 38 mil). Como US$ 100 mil é mais alto que a conclusão típica da curva, o critério do The Block conta menos tokens como graduados e tende a produzir taxa mais baixa.
- **(iii) Método de agregação diferente.** A Bitquery usa **coorte acompanhada para frente** (segue os tokens de um dia até 2/09); o The Block usa **média corrente de 7 dias**. Ponto crucial: o próprio artigo da Bitquery mostra que o método "ingênuo" (novas pools ÷ lançamentos na mesma semana) daria **12,2%** sobre os mesmos dados — logo a agregação por janela corrente, isoladamente, **não** é o que puxa o número para baixo; o determinante do número baixo de junho foi o **regime de mercado** daquele mês.
- **(iv) Denominador.** A Bitquery conta como lançamento o token cujo primeiro trade caiu na janela; a CoinGecko, por exemplo, exclui tokens sem nenhum trade. Não foi possível fechar exatamente o denominador do The Block a partir de fonte primária aberta, porque o dashboard carrega por JavaScript e não abriu.

**Conclusão da Verificação C:** a diferença **não é puramente de método**. Há **mudança real de mercado documentada** (BOOST em 21/07/2026, pares USDC em maio, cashback coins) **somada** a diferenças de limiar (US$ 100 mil vs curva completa) e de agregação (janela corrente vs coorte). Fica **VERIFICADO como combinação das duas causas**. O que NÃO se pode fazer com as fontes abertas é **decompor exatamente quantos pontos percentuais vêm de cada causa**, porque as janelas e definições das duas fontes não são idênticas.

---

## O quanto se sustenta a frase "a maioria das memecoins vai a zero"?

A frase se sustenta sob **qualquer** das definições concorrentes de "morto" — mas o número exato muda conforme o que se entende por "ir a zero". Cada número afirma uma coisa diferente:

- **Definição 1 — "morto" = parou de negociar (sem transações).** **68,67%** (12,8 milhões) dos tokens da pump.fun registraram o último trade no mesmo dia do lançamento; **80,37%** em até 2 dias; só **4,55%** (850.180) sobreviveram além de 90 dias (CoinGecko Research, jan/2024–jun/2026). Afirma: a maioria esmagadora **para de ter qualquer negociação quase imediatamente**. Não afirma que o preço foi a zero nem que houve fraude.
- **Definição 2 — "morto" = liquidez desprezível (abaixo de US$ 1.000).** **98,6%** dos tokens (só ~97.000 de mais de 7 milhões mantiveram liquidez acima de US$ 1.000), jan/2024–mar/2025 (Solidus Labs). Afirma: quase todos **colapsam economicamente** a ponto de não haver caixa relevante. É colapso econômico, não fraude criminal provada.
- **Definição 3 — "morto" = despencou de preço após migrar.** Dos tokens que chegaram a migrar para a DEX, **>73%** caíram abaixo de 40% do preço de migração e **60,26%** abaixo de 20%, em cerca de 20 minutos (MemeTrans, 41.470 tokens migrados, dez/2024–mar/2025). Afirma: **mesmo entre os poucos "vencedores" que graduaram**, a maioria perde quase todo o valor logo após a migração.
- **Definição 4 — "sucesso" = graduar (completar a curva).** Só **0,63%** graduaram (Marino et al., set–out/2025). Pelo complemento, **99,37%** **nunca completam a curva**. Afirma: quase nenhum token atinge sequer o primeiro marco de "sucesso".

Em resumo: **"a maioria vai a zero" é uma afirmação sustentada**; o **número honesto depende da definição** — 68,67% "param de negociar no dia", 98,6% "ficam sem liquidez", 99,37% "nunca graduam". Importante: **nenhuma dessas fontes mede o preço final chegando literalmente a US$ 0,00** de todos os tokens; elas medem cessação de negócios, sumiço de liquidez ou colapso de preço. Quem quiser o número "vai a zero" no sentido literal de preço não o encontra em nenhuma fonte primária aberta — é uma das lacunas do item (3).

---

## (1) Tabela-mestra
Data de consulta de tudo: **11/09/2026**. Legenda de qualidade: **on-chain reproduzível** = dado recalculável a partir da blockchain; **preprint (não revisado por pares)**; **relatório de empresa**; **autopublicado (fornecedor)**; **estimativa de terceiro**; **corroboração fraca** (blog/thread/vídeo).

### 1.a Lançamentos por dia
| Métrica | Número | Período | Fonte (link) | Método (1 linha) | Qualidade |
|---|---|---|---|---|---|
| Lançamentos/min e /dia | ~7/min (~10.000/dia) | jan–nov/2024 | SolanaFloor (página aberta) | Contagem de mints via programa da pump.fun | estimativa de terceiro / on-chain reproduzível |
| Recorde de mints num dia | 69.046 mints = 71,1% dos mints da Solana no dia | Q4/2024 | arXiv 2512.11850 Mancino, https://arxiv.org/abs/2512.11850 (página aberta) | SQL no Dune, tabela tokens_solana.transfers | preprint (não revisado por pares) / on-chain reproduzível — **também publicado, revisado por pares:** IEEE ISCC 2025, p. 1–6, DOI 10.1109/ISCC65549.2025.11326251 |
| Lançamentos/dia | >20.000/dia | mar–abr/2025 | Dune @evelyn233 via BlockBeats/AiCoin (só snippet) | Contagem diária de criações | corroboração fraca |
| Lançamentos/dia (pré/pós "Mayhem Mode") | 17.300/dia → 17.800/dia | nov/2025 | The Block (só snippet) | Rastreador diário do The Block | relatório de empresa |
| Lançamentos/dia | >20.000/dia, pico 25.000+ em 02/12 | dez/2025 | Dune via Yellow.com (só snippet) | Contagem diária | corroboração fraca |
| Média diária de longo prazo | ~21.000/dia (18,67 mi ÷ ~29 meses) | 14/01/2024–18/06/2026 | CoinGecko Research via Crypto Briefing (página aberta) | Total de tokens ÷ meses | relatório de empresa / on-chain reproduzível |
| **Lançamentos/dia (Bitquery)** | **entre 30.663 (mín.) e 52.438 (máx.)** | **05/08–02/09/2026** | Bitquery/Coinmonks, https://medium.com/coinmonks/pump-fun-api-how-to-track-bonding-curves-graduations-and-pumpswap-on-chain-879b689fbedb (página aberta) | Tokens cujo 1º trade caiu na janela; medido em 03/09/2026 | autopublicado (fornecedor) / on-chain reproduzível |
| LetsBonk/Bonk.fun vs pump.fun | 18.620/dia vs 9.600/dia; recorde 28.872 em 21/07/2025 | jul/2025 | Dune @Adam_Tehc (só snippet) | Contagem diária por launchpad | corroboração fraca |

### 1.b Taxa de graduação
| Métrica | Número | Período | Fonte (link) | Método | Qualidade |
|---|---|---|---|---|---|
| **Âncora de método aceita** | **0,63%** (4.338 de 655.770 tokens; 243.123 criadores) | set–out/2025 | Marino, Naviglio, Tarantelli & Lillo, arXiv 2602.14860, https://arxiv.org/abs/2602.14860 (página aberta) | Graduação = completar a curva (~85 SOL reais + 30 SOL virtual, ~US$ 69 mil) | preprint (não revisado por pares) / on-chain reproduzível |
| Taxa "regime rápido" | **0,198%** (IC 95% 0,189–0,208%; 1.651 de 832.941) | 08/05–10/06/2026 | Kamat, arXiv 2607.02823, https://arxiv.org/abs/2607.02823 (página aberta) | Kaplan-Meier/Cox; **errata: coleta cobriu só ~6 min; é piso, não taxa de 24 h** | preprint (não revisado por pares) / on-chain reproduzível |
| Graduação cumulativa "all-time" | ~1,4% | jan/2024–~2025 | Dune via Solana Compass/BlockBeats (só snippet) | Graduados acumulados ÷ lançamentos acumulados | corroboração fraca |
| "Menos de 2%" | <2% de 11,9 mi de launches | acumulado até ~2026 | The Block via Solana Compass (só snippet) | Graduação ao atingir US$ 100 mil de market cap | relatório de empresa |
| Graduação no pico | <2% | Q4/2024 | Mancino, arXiv 2512.11850 (página aberta) | On-chain via Dune | preprint / on-chain reproduzível — **publicado revisado por pares:** IEEE ISCC 2025 |
| Média diária | 1,15% (pico histórico ~2%, mínimo ~0,5%) | ~fev/2026 | Cryptopolitan citando Dune (só snippet) | Rastreador diário | corroboração fraca |
| **Média semanal (The Block)** | **0,26%** (7 dias; queda de 80% em 3 meses; -53% no mês) | meados de junho/2026 | The Block, "Pump.fun activity craters 80%…", https://www.theblock.co/post/404806 (só snippet; dashboard JS não abre) | Média de 7 dias; graduação ao atingir US$ 100 mil de market cap | relatório de empresa |
| **Graduação por coorte (Bitquery)** | **~2,7%** (4 coortes: 2,60%–3,10%) | ago/2026 (coortes 6, 13, 20 e 26/08, seguidas até 02/09) | Bitquery/Coinmonks (página aberta) | Coorte acompanhada até completar a curva (constante on-chain 206.900.000) | autopublicado (fornecedor) / on-chain reproduzível |
| Pós-BOOST | 6,7% numa sexta; 4,7% em 4 dias; 2,5% na semana anterior | fim de julho/2026 | The Block, https://www.theblock.co/post/409815 (página aberta) | Rastreador diário do The Block | relatório de empresa |
| LetsBonk | 1,06% | até 21/11/2025 | Smithii (só snippet) | Contagem própria | autopublicado |

Três definições concorrentes de graduação: (a) **migração efetiva** ao completar a curva (~85 SOL reais / ~US$ 69 mil); (b) **cumulativa all-time**; (c) **rastreador diário** ao atingir **US$ 100 mil de market cap** (critério do The Block).

### 1.c Mortalidade (três definições de "morto")
| Definição de "morto" | Número | Período | Fonte (link) | Método | Qualidade |
|---|---|---|---|---|---|
| Sem transações | 68,67% (12,8 mi) no dia; 80,37% em 2 dias; só 4,55% (850.180) >90 dias | jan/2024–jun/2026 | CoinGecko Research, https://www.coingecko.com/research/publications/average-lifespan-of-pumpfun-tokens (página aberta) | Último trade na curva; tokens_solana.transfers + pump_evt_tradeevent no Dune; exclui tokens sem trade | relatório de empresa / on-chain reproduzível — a própria CoinGecko alerta que subconta tokens migrados a outras DEXs |
| Liquidez < US$ 1.000 | 98,6% (só ~97.000 de >7 mi acima) | jan/2024–mar/2025 | Solidus Labs, https://www.soliduslabs.com/reports/solana-rug-pulls-pump-dumps-crypto-compliance (página oficial aberta) | Tokens com ≥5 trades; liquidez mantida acima de US$ 1.000 | relatório de empresa |
| Queda pós-migração | >73% abaixo de 40% do preço de migração; 60,26% abaixo de 20%, em ~20 min | dez/2024–mar/2025 | MemeTrans, arXiv 2602.13480, https://arxiv.org/abs/2602.13480 (página aberta) | 41.470 tokens migrados; preço relativo ao de migração | preprint (não revisado por pares) / on-chain reproduzível |

### 1.d Tempo de vida e tempo até graduar
| Métrica | Número | Período | Fonte | Método | Qualidade |
|---|---|---|---|---|---|
| Mediana de tempo até graduar | **4,4 min** (cauda de dezenas de min) | set–out/2025 | Marino et al., arXiv 2602.14860 (página aberta) | Tempo do 1º trade à graduação | preprint (não revisado por pares) / on-chain reproduzível |
| Mediana de tempo até graduar | **1,0 min** (média 1,3; p90 2,0; máx ~5–6 min) | 08/05–10/06/2026 | Kamat, arXiv 2607.02823 (página aberta) | **Coleta truncada em ~6 min → subconta graduações lentas** | preprint (não revisado por pares) / on-chain reproduzível |
| Mediana de tempo até graduar | **2 min** (p25 <1 min; p75 13 min; 86,8% em 1 h; 95,6% em 1 dia) | coorte 13/08/2026 | Bitquery/Coinmonks (página aberta) | 1.038 graduados com par de timestamps | autopublicado (fornecedor) / on-chain reproduzível |
| Vida útil média multi-chain | ~1 ano; ~2.020 morrendo/mês | até ago/2024 | Chainplay State of Memecoin 2024 (só snippet) | 30.000 projetos ETH/SOL/Base | autopublicado |
| Vida útil média pump.fun | 12 dias; 98% (951.565) mortos; 10.417 lançados vs 9.912 mortos/dia | 3 meses de 2024 | Chainplay (só snippet) | 968.819 tokens | autopublicado — não reproduzido por fonte primária |
| Idade do top-50 | mediana 6,66 dias; média 23,52 | — | Substack (corroboração fraca) | — | corroboração fraca |

### 1.e Rug pulls e fraude
("Rug pull" = quando o criador/insider retira a liquidez ou vende tudo de uma vez e some, deixando os compradores com tokens sem valor; "pump-and-dump" = inflar o preço de forma coordenada e vender no topo em cima de quem entrou depois.)
| Métrica | Número | Período | Fonte | Método | Qualidade |
|---|---|---|---|---|---|
| Pump-and-dump / rug (Solidus) | 98,6–98,7% dos tokens; 93% dos pools Raydium com "soft rug" (361.000 de 388.000; mediana US$ 2.832; maior US$ 1,9 mi no MToken) | jan/2024–mar/2025 | Solidus Labs (página oficial aberta) | Definição = liquidez abaixo de US$ 1.000 (colapso econômico, não fraude criminal provada) | relatório de empresa — a pump.fun **contestou publicamente** (ver divergências) |
| Pump-and-dump (Chainalysis) | 3,59% dos tokens de 2024 (~74.037); ~90–94% dos pools de DEX suspeitos rugados pelo próprio criador | ano de 2024 | Chainalysis 2025 Crypto Crime Report, https://www.chainalysis.com/blog/crypto-market-manipulation-wash-trading-pump-and-dump-2025/ (página oficial aberta) | Heurística estrita multi-chain de comportamento de pump-and-dump | relatório de empresa |
| Rug-pull candidates | 76.469 de 100.063 tokens em 3 DEXs; US$ 151 mi rastreáveis; falso-positivo 0,26% | ~1º sem/2025 | preprint via Crypto Impact Hub/DeepStrike (só snippet) | Heurística própria | preprint (não revisado por pares) / só snippet |
| Manipulação entre "vencedores" | 82,8% dos tokens de alto retorno (>100%) com sinais de crescimento artificial; US$ 3,27 mi de perdas em pump-and-dump e US$ 6,04 mi em rug pulls; >17.000 vítimas | jan/2026 (janela de 3 meses) | Midsummer, arXiv 2507.01963, https://arxiv.org/abs/2507.01963 (página aberta) | 34.988 tokens multi-chain; wash trading e LPI | preprint no arXiv — **publicado, revisado por pares:** USENIX Security '26, p. 3931–3949 |

### 1.f Concentração de posse
("Bundle" = comprar em bloco por várias carteiras coordenadas para dar aparência de demanda; "top-10 holders" = os 10 maiores donos do token; "supply" = total de tokens em circulação.)
| Métrica | Número | Período | Fonte | Método | Qualidade |
|---|---|---|---|---|---|
| Supply em contas bundle | 36,5% (bundle holder ratio 28,13%) | dez/2024–mar/2025 | MemeTrans, arXiv 2602.13480 (página aberta) | 41.470 tokens; 3 heurísticas (mesma transação, mesmo financiador, mesmo Jito bundle ID) | preprint (não revisado por pares) / on-chain reproduzível |
| Top-10 acima de 30% do supply | 50,78% dos tokens de alto retorno (359 de 707); 87,14% do subconjunto anômalo | out/2024–jan/2025 | Midsummer, arXiv 2507.01963 (página aberta) | Limiar de 30% (padrão GoPlus/CertiK) | preprint — publicado revisado por pares: USENIX Security '26 |
| Subconjunto concentrado (385 tokens) | média 77,85% / mediana 87,01% do supply no top-10 | out/2024–jan/2025 | Midsummer, arXiv 2507.01963 (página aberta) | Idem | preprint — publicado USENIX '26 |
| Bundle buy | 18,81% dos tokens (133 de 707); média 15,70% do supply; >30% em só 20 casos (2,83%); inflação via pool: 27 tokens com top-10 em média 80,62% | out/2024–jan/2025 | Midsummer, arXiv 2507.01963 (página aberta) | Idem | preprint — publicado USENIX '26 |
| Uma carteira, curva (Bitquery) | 1 endereço fez 17,19% de todos os fills da semana; top-10 = 22,22%; top-100 = 29,19% | 27/08–02/09/2026 | Bitquery/Coinmonks (página aberta) | Contagem de trades por carteira | autopublicado (fornecedor) / on-chain reproduzível |

### 1.g Retorno do comprador
("PnL realizado" = lucro ou prejuízo de quem efetivamente vendeu; ignora quem ainda segura o token — o "bagholder".)
| Métrica | Número | Período | Fonte | Método | Qualidade |
|---|---|---|---|---|---|
| Carteiras lucrativas/mês | mínimo 30,1% (jun/2025); 56,8% (fev/2026); 70,0% (mar/2026); **73,3% (abr/2026) — este 73,3% SÓ vale com as três ressalvas na mesma linha: (a) é só lucro realizado, conta apenas quem vendeu e ignora quem ainda segura o token; (b) inclui bots e não filtra wash trading; (c) 65,1% dessas carteiras ganharam apenas entre US$ 1 e US$ 500** | abr/2024–abr/2026 | CoinGecko Research, https://www.coingecko.com/research/publications/pump-fun-traders-are-making-a-comeback (página aberta) | PnL realizado por carteira em pump.fun + PumpSwap via Dune | relatório de empresa / on-chain reproduzível |
| Distribuição abr/2026 | de ~3,14 mi de carteiras ativas, ~2,3 mi (73,3%) lucraram, mas 65,1% (~2,05 mi) ganharam só US$ 1–500; 2,8% (87 mil) US$ 500–1.000; 5,4% (~169 mil) acima de US$ 1.000 | abr/2026 | CoinGecko Research (página aberta) | PnL realizado (mesmas três ressalvas acima) | relatório de empresa / on-chain reproduzível |
| Perdas/pequenos | ~96% das carteiras perderam ou ganharam menos de US$ 500 | mar/2026 | Dune @oladee via crypto.news (só snippet) | PnL realizado | corroboração fraca |
| Grandes ganhadores | 0,4% das 13,4 mi de carteiras com lucro >US$ 10.000; só 294 (0,002%) >US$ 1 mi | até jan/2025 | Dune @Adam_Tehc via Yahoo/Mitrade (só snippet) | PnL realizado | corroboração fraca |

### 1.h Sniping e bundles
("Sniping" = comprar automaticamente por bot no mesmo instante/bloco em que o token é criado, na frente de todos.)
| Métrica | Número | Período | Fonte | Método | Qualidade |
|---|---|---|---|---|---|
| Tokens sniped no bloco de criação | >50% | mar–abr/2025 | Pine Analytics, https://pineanalytics.substack.com/p/exit-liquidity-machines (página aberta) | On-chain; a própria Pine reconhece capturar só parte | autopublicado (on-chain) |
| Subconjunto "deployer-funded" | ~1,75% dos launches; 15.000+ tokens; 4.600+ carteiras sniper; 10.400+ deployers; 87% dos snipes lucrativos; 85% vendem em ≤5 min | mar–abr/2025 | Pine Analytics (página aberta) | Carteira que recebeu SOL direto do deployer | autopublicado (on-chain) |
| Efeito de bots | Tokens dominados por bots têm probabilidade de graduação sistematicamente menor | set–out/2025 | Marino et al., arXiv 2602.14860 (página aberta) | Modelo preditivo | preprint (não revisado por pares) |

---

## (2) Divergências entre fontes (com a diferença de método explicada)

**Taxas de graduação e suas definições.** Os números vão de 0,198% a ~2,7% no mesmo mercado porque medem coisas diferentes. (a) **Marino et al. — 0,63%** (set–out/2025): graduação = completar a curva; janela plena. (b) **Kamat — 0,198%** (mai–jun/2026): mesma definição de graduação, mas a coleta ficou truncada em ~6 minutos, então captura só "graduações rápidas" e é um **piso**; o próprio autor diz que a queda real frente aos 0,63% é **menor** que os 3,18× sugeridos. (c) **The Block — 0,26%** (jun/2026): graduação = atingir **US$ 100 mil de market cap**, média de 7 dias. (d) **Bitquery — 2,7%** (ago/2026): graduação = **completar a curva** on-chain (constante 206.900.000), coorte acompanhada para frente. "All-time ~1,4%" e "<2%" são acumulados desde 2024 e misturam regimes de mercado muito diferentes, por isso não batem com nenhuma medição de um mês específico.

**2,7% (Bitquery, ago/2026) vs 0,26% (The Block, jun/2026).** Ver Verificação C, com detalhamento. Resumo: **não é só método**. Há alta real documentada entre junho e agosto — a errata central é o **BOOST (21/07/2026)**, que o The Block mostrou ter elevado a graduação a *"6.7% last Friday, roughly 8x higher than the average throughout June"* — **somada** a limiar de graduação diferente (US$ 100 mil vs curva completa) e forma de agregação diferente (janela corrente vs coorte). Não é possível decompor exatamente os pontos percentuais de cada causa com as fontes abertas.

**68,67% (CoinGecko) vs 98,6% (Solidus) em mortalidade.** Não se contradizem: medem "morte" de formas distintas. CoinGecko = **parar de negociar** (68,67% no dia; só 4,55% passam de 90 dias), jan/2024–jun/2026, on-chain via Dune. Solidus = **liquidez abaixo de US$ 1.000** (98,6%), jan/2024–mar/2025. Um token pode ter parado de negociar mas ainda ter tido, um dia, liquidez acima de US$ 1.000, e vice-versa; o critério de liquidez é mais estrito, por isso dá número maior. A própria CoinGecko avisa que subconta tokens que migraram para outras DEXs (Raydium, Meteora, PumpSwap).

**98,6% (Solidus) vs 3,59% (Chainalysis) em fraude.** Diferença de definição, não de mercado. **Solidus** chama de "pump-and-dump/rug" **todo token cuja liquidez caiu abaixo de US$ 1.000** — ou seja, colapso econômico, que engloba abandono e desinteresse, e **não** fraude criminal provada; o número foi reportado como 98,6–98,7%. A pump.fun **contestou publicamente**: o porta-voz **Troy Gravitt** declarou à CoinDesk (07/05/2025), verbatim: *"What Solidus Labs lacks is a basic understanding of memecoins. 98% of memecoins — just like NFTs, tweets, IG posts, trading cards, and most art — are worth little in the long run. That's precisely the point."* Do outro lado, **Chen Arad**, cofundador e CXO da Solidus, defendeu ao Benzinga a necessidade de "stronger safeguards". Já a **Chainalysis** usa uma **heurística estrita de comportamento de pump-and-dump** (padrão de compra/venda coordenada, criador rugando o próprio pool) e afirma, verbatim: *"In 2024, 3.59% of all new tokens minted displayed classic rug-pull behavior"* (equivalente a ~74.037 tokens; o relatório estima US$ 2,57 bilhões de volume ilícito artificial em 2024). Os dois números respondem a perguntas diferentes: "quantos morreram economicamente" (98,6%) vs "quantos exibem assinatura ativa de manipulação criminal" (3,59%).

**Medianas de tempo até graduar: 4,4 min (Marino) vs 1,0 min (Kamat) vs 2 min (Bitquery).** A mediana de 1,0 min de Kamat é artificialmente baixa **porque a coleta foi truncada em ~6 minutos** (errata do próprio preprint), o que descarta as graduações mais lentas que Marino (4,4 min, com cauda de dezenas de minutos) e a Bitquery (2 min, p75 de 13 min) conseguem ver. É diferença de **janela de observação**, não do mercado. ("Mediana" = valor do meio: metade dos casos está abaixo, metade acima; é menos sensível a extremos do que a média.)

---

## (3) O que ninguém mediu ainda (a oportunidade do observatório)

- **Média diária de lançamentos exclusiva de 2026 a partir de fonte primária aberta e independente.** A Bitquery (ago/2026: 30.663–52.438/dia) é o dado mais próximo, mas é autopublicado por fornecedor; falta uma série independente reproduzível mês a mês em 2026.
- **Fração de tokens com top-10 holders acima de 50% do supply no lançamento.** Nenhuma fonte mede esse limiar; o mais próximo é 30% (Midsummer) e só para subconjuntos de alto retorno, não para todos os lançamentos no instante exato do lançamento.
- **"Retorno médio do comprador" como número único e honesto.** Só existe PnL realizado (exclui quem segura, inclui bots). Falta uma medida que trate bagholders e filtre bots/wash trading.
- **Decomposição exata do salto de graduação junho→agosto/2026** em "quanto é BOOST/mudança de produto" vs "quanto é definição/janela", aplicando as mesmas janelas e o mesmo limiar aos dois períodos.
- **Preço final literalmente em zero.** Todas as fontes medem cessação de trade, sumiço de liquidez ou queda de preço — nenhuma mede a fração que chega literalmente a US$ 0,00, nem quanto de valor dos compradores foi destruído no total (dólar agregado perdido).
- **Vida útil de 12 dias da pump.fun** só tem fonte autopublicada (Chainplay), sem reprodução por fonte primária.
- **Efeito de longo prazo do BOOST:** se a alta de graduação é permanente ou "novidade passageira" — o próprio The Block deixou a questão explicitamente em aberto ("whether the heightened graduation rates from BOOST will be a temporary 'shiny new thing' blip or a permanent occurrence").

---

## (4) NÃO VERIFICADOS

- **Fração de tokens com top-10 acima de 50% do supply no lançamento** — nenhuma fonte mede esse limiar. **NÃO VERIFICADO.**
- **"Retorno médio do comprador" como número único** — inexistente por definição de método (só há PnL realizado). **NÃO VERIFICADO.**
- **Vida útil de 12 dias na pump.fun** — só Chainplay (autopublicado), não reproduzido por fonte primária. **NÃO VERIFICADO.**
- **"70.000+ tokens/dia no auge"** — só corroboração fraca (blocmates; e um "71k/dia" citado em contexto de processo judicial). **NÃO VERIFICADO** como pico sustentado; o recorde reproduzível é 69.046 mints num dia no Q4/2024 (Mancino).
- **Rug-pull candidates 76.469/100.063 e US$ 151 mi** — preprint só em snippet (Crypto Impact Hub/DeepStrike). **NÃO VERIFICADO** em fonte primária aberta.
- **Denominador exato do rastreador do The Block** (0,26% de junho) — dashboard carrega por JavaScript e não abriu. Número mantido "(só snippet)".
- **Decomposição método-vs-mercado da diferença 2,7% vs 0,26%** — **VERIFICADO como combinação das duas causas** (BOOST + limiar/agregação), mas a **repartição exata em pontos percentuais NÃO foi possível fechar** com as fontes abertas.

---

## (5) Fontes com link e data de consulta (todas 11/09/2026)

**Primárias — preprints e artigos científicos:**
- Kamat, A. U. (2026). *Pump.fun Graduation Regime Windows: Survival Analysis of 832,941 Token Launches and the Social-Presence Effect.* arXiv:2607.02823. https://arxiv.org/abs/2607.02823 — **preprint (não revisado por pares)**; SSRN 6915560; dados no Zenodo (DOI de dados 10.5281/zenodo.20633486). (página aberta).
- Marino, G., Naviglio, M., Tarantelli, F., Lillo, F. (2026). *Predicting the success of new crypto-tokens: the Pump.fun case.* arXiv:2602.14860. https://arxiv.org/abs/2602.14860 — **preprint (não revisado por pares)**; SSRN 6543715. (página aberta).
- Hu, S., Tekin, S. F., Xu, Y., Liu, L. (2026). *MemeTrans/MELT: A Behavioral Trace Dataset for High-Risk Memecoin Launch Detection.* arXiv:2602.13480. https://arxiv.org/abs/2602.13480 — **preprint (não revisado por pares)** (consta como "em submissão" no repositório dos autores). (página aberta).
- Mongardini, A. M., Mei, A. *A Midsummer Meme's Dream: Investigating Market Manipulations in the Meme Coin Ecosystem.* arXiv:2507.01963. https://arxiv.org/abs/2507.01963 — preprint no arXiv; **publicado e revisado por pares** em USENIX Security '26 (35th USENIX Security Symposium, Baltimore, ago/2026), p. 3931–3949, ISBN 978-1-939133-58-8 (USENIX não emite DOI). (página aberta).
- Mancino, D. (2025). *The Memecoin Phenomenon: An In-Depth Study of Solana's Blockchain Trends.* arXiv:2512.11850. https://arxiv.org/abs/2512.11850 — preprint no arXiv; **publicado e revisado por pares** em 2025 IEEE Symposium on Computers and Communications (ISCC), Bologna, 2–5/07/2025, p. 1–6, DOI 10.1109/ISCC65549.2025.11326251 (venue confirmado via índice de proceedings; a resolução ao vivo no IEEE Xplore não pôde ser aberta diretamente). (página aberta).

**Relatórios de empresa e páginas oficiais:**
- CoinGecko Research — vida útil/mortalidade: https://www.coingecko.com/research/publications/average-lifespan-of-pumpfun-tokens (página aberta).
- CoinGecko Research — comeback dos traders (73,3% em abr/2026, com as três ressalvas): https://www.coingecko.com/research/publications/pump-fun-traders-are-making-a-comeback (página aberta).
- Solidus Labs — rug pulls e pump-and-dumps: https://www.soliduslabs.com/reports/solana-rug-pulls-pump-dumps-crypto-compliance (página aberta).
- Chainalysis — manipulação de mercado (3,59%): https://www.chainalysis.com/blog/crypto-market-manipulation-wash-trading-pump-and-dump-2025/ (página aberta).
- The Block — BOOST (6,7% / 8×): https://www.theblock.co/post/409815 (página aberta); The Block — queda de 80% / 0,26%: https://www.theblock.co/post/404806 (só snippet); dashboard "Percent Graduated (Daily)": https://www.theblock.co/data/on-chain-metrics/solana/pump-fun-percent-graduated-tokens-daily (dashboard JS, só snippet).
- CoinDesk — réplica da pump.fun (porta-voz Troy Gravitt) ao relatório Solidus: https://www.coindesk.com/business/2025/05/07/98-of-tokens-on-pump-fun-have-been-rug-pulls-or-an-act-of-fraud-new-report-says (página aberta).

**Autopublicado por fornecedor (corroboração forte on-chain, não independente):**
- Bitquery/Coinmonks (lançamentos 30.663–52.438/dia; graduação por coorte ~2,7%; mediana 2 min): https://medium.com/coinmonks/pump-fun-api-how-to-track-bonding-curves-graduations-and-pumpswap-on-chain-879b689fbedb (página aberta).
- Pine Analytics (sniping >50%): https://pineanalytics.substack.com/p/exit-liquidity-machines (página aberta).

**Corroboração fraca / secundária (todas só snippet):** Solana Compass, DEXTools, Cryptopolitan/Bitget, Yellow.com, Crypto Briefing, KuCoin, crypto.news.

---

## Consultas de busca feitas nesta fase (Fase II)
1. Bitquery pump.fun launches graduation August 2026 Coinmonks
2. arxiv 2607.02823 pump.fun graduation survival analysis
3. The Block pump.fun graduation rate June 2026 methodology $100k market cap
4. pump.fun 0.26% graduation rate June 2026 The Block weekly
5. pump.fun BOOST launch July 2026 graduation rate increase
6. pump.fun graduation rate August September 2026 daily
7. CoinGecko memecoin report 2026 tokens die pump.fun mortality
8. CoinGecko pump.fun traders profitable April 2026 realized PnL bots wash trading limitations
9. Solidus Labs pump.fun response contest rug pull report 2025
10. Chainalysis 2025 crypto crime report pump and dump 3.59% tokens 2024 Solana
11. arxiv 2602.13480 MemeTrans pump.fun migration price crash concentration
12. arxiv 2507.01963 Midsummer memecoin top holders concentration Solana
13. Mancino memecoin phenomenon Solana IEEE ISCC 2025 published conference
14. pump.fun contests Solidus Labs report response methodology dead not fraud
15. Marino Naviglio Tarantelli Lillo pump.fun 0.63% graduation median 4.4 minutes
16. (subagente) verificação do status de revisão por pares dos cinco preprints do arXiv

**Páginas abertas com web_fetch (leitura integral):** arXiv 2607.02823 (abstract completo, histórico de versões e comentários); artigo Bitquery/Coinmonks no Medium (texto integral, com queries e disclosure).

---

### Nota final sobre as correções do usuário aplicadas
- **Correção 1 (preprint ≠ revisado por pares):** todos os cinco trabalhos do arXiv estão marcados como "preprint (não revisado por pares) / on-chain reproduzível". Verificou-se a publicação posterior: **Midsummer (2507.01963) foi publicado, revisado por pares, no USENIX Security '26**, e **Mancino (2512.11850) no IEEE ISCC 2025** — só nesses dois casos a expressão "revisado por pares" é usada, com a referência da publicação. Os outros três (Marino et al. 2602.14860; MemeTrans/MELT 2602.13480; Kamat 2607.02823) permanecem **somente preprints**.
- **Correção 2 (autoria do 2607.02823):** confirmada como **Kamat (2026)**, autor único; "Hu et al." descartado (é o MemeTrans/MELT).
- **Correção 3 (Bitquery):** os números (30.663–52.438 lançamentos/dia; graduação ~2,7% em quatro coortes de agosto/2026) constam da tabela-mestra e da seção de divergências, contrastados com o 0,26% de junho/2026 do The Block.
- **Cuidado obrigatório (73,3% em abr/2026):** o número aparece sempre acompanhado, na mesma linha e na mesma frase, das três ressalvas — (a) só lucro realizado; (b) inclui bots e não filtra wash trading; (c) 65,1% ganharam só US$ 1–500.