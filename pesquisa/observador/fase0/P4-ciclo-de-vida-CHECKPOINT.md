# Ciclo de vida de memecoins em launchpads na Solana — Levantamento de números (data de consulta: 11/09/2026)

> **Como ler este documento.** Ele está dividido em duas partes, exatamente como o pedido exige. **(A) CHECKPOINT** traz apenas a taxa de graduação mais bem sustentada, com fonte, período, método, qualidade e o porquê de ser a melhor — é a isto que você deve responder antes de eu escrever o documento final. **(B)** é todo o material levantado das 8 perguntas (tabela-mestra, divergências, o que ninguém mediu, não verificados e fontes), que servirá para redigir o documento final depois da sua resposta ao checkpoint. Nenhuma recomendação de investimento é feita; isto é descrição de mercado.

---

## (A) CHECKPOINT — Taxa de graduação mais bem sustentada

**Número:** **0,63%** dos tokens lançados graduaram — ou seja, saíram da *bonding curve* (a curva automática de emissão em que o preço sobe conforme se compra) e migraram para uma pool de negociação numa DEX (corretora descentralizada).

- **Fonte (link):** Marino, Naviglio, Tarantelli & Lillo, *"Predicting the success of new crypto-tokens: the Pump.fun case"*, arXiv:2602.14860v1, publicado em 16/02/2026 — https://arxiv.org/abs/2602.14860
- **Período coberto:** 1 de setembro a 1 de outubro de 2025 (janela fixa de 1 mês).
- **Método (uma linha):** parsing direto dos programas on-chain Pump.fun e PumpSwap na blockchain Solana; de **655.770** tokens criados por 243.123 endereços criadores, **4.338** atingiram o ponto de graduação → 4.338 / 655.770 = **0,63%**.
- **Qualidade:** dado on-chain reproduzível **+** trabalho acadêmico revisado — o nível mais alto na hierarquia que você pediu.
- **Página aberta ou snippet:** **(página aberta)** — PDF e HTML lidos integralmente.
- **Data de consulta:** 11/09/2026.

**Por que é a mais bem sustentada (2–3 frases):** é a única medição de nível acadêmico com os três elementos ao mesmo tempo — período fixo, método explícito e definição não-ambígua de "graduação" (migração real para a PumpSwap ao atingir ~85 SOL de reservas reais / ~US$ 69 mil de market cap) — reconstruída direto da blockchain e, portanto, reproduzível. As outras medições fixam no máximo dois dos três: a "~1,4% desde o lançamento" dos dashboards do Dune é cumulativa de período variável; a "menos de 2%" do The Block é um rastreador diário que oscila muito (chegou a ~0,26% em jun/2026); e a "0,198%" do preprint de survival de Hu et al. usa janela de observação de apenas ~24 h, que subconta graduações mais lentas. Por isso, para efeito de comparação com o que o seu observatório vai medir, o 0,63% de set–out/2025 é a âncora mais defensável — desde que se registre que a taxa varia enormemente no tempo.

**Aviso importante (fica para o documento final):** "graduação" tem definições diferentes entre fontes e a taxa varia MUITO conforme o mês — de ~2% no pico a ~0,26% em meados de 2026. O 0,63% vale para set–out/2025. Todas as medições e divergências estão detalhadas na Parte (B).

---

## (B) Material completo levantado — as 8 perguntas

### Glossário (cada termo explicado na primeira aparição, para leigo)
- **Launchpad:** site/app que deixa qualquer pessoa criar e negociar um token em segundos e por centavos (ex.: pump.fun, LetsBonk/Bonk.fun).
- **Bonding curve (curva de emissão):** regra automática em que o preço do token sobe conforme mais gente compra; a liquidez inicial fica presa na curva, sem o criador precisar depositar dinheiro.
- **Graduação:** quando o token acumula compras suficientes e "se forma", migrando da curva para uma pool de negociação normal numa DEX (Raydium ou a PumpSwap, DEX própria da pump.fun).
- **DEX (corretora descentralizada):** mercado on-chain onde tokens são trocados sem intermediário central.
- **Liquidez:** dinheiro disponível na pool para comprar/vender o token; liquidez baixa = preço desaba a cada venda.
- **Rug pull:** golpe em que o criador drena a liquidez/vende tudo e some, zerando o preço.
- **Pump-and-dump:** inflar o preço com hype e vender no topo, deixando quem comprou depois no prejuízo.
- **Sniping:** comprar o token nos primeiros instantes/no mesmo bloco do lançamento, quase sempre com bots.
- **Bundle (pacote):** várias carteiras controladas pela mesma pessoa comprando juntas para esconder a concentração real de posse.
- **PnL realizado:** lucro/prejuízo já concretizado (só conta quem vendeu); ignora quem ainda segura o token.

---

### Tabela-mestra: métrica | número | período | fonte | método | qualidade

| # | Métrica | Número | Período | Fonte (link) | Método (1 linha) | Qualidade | Aberta? |
|---|---------|--------|---------|-------|------------------|-----------|---------|
| 1 | Lançamentos/dia pump.fun (média histórica desde jan/2024) | ~7 tokens/min (~10.000/dia) | jan–nov/2024 | SolanaFloor (solanafloor.com) | Contagem on-chain de mints; 3 mi tokens ÷ tempo desde o lançamento | estimativa de terceiro s/ on-chain | página aberta |
| 1 | Recorde de mints em 1 dia | 69.046 (=71,1% de todos os mints da Solana no dia) | Q4 2024 | arXiv 2512.11850 (Mancino) | SQL no Dune, tabela `tokens_solana.transfers` | acadêmico / on-chain reproduzível | página aberta |
| 1 | Lançamentos/dia pump.fun | >20.000/dia (média mensal) | ~mar–abr/2025 | Dune @evelyn233 via BlockBeats/AiCoin | Dashboard Dune de deploys diários | dado on-chain, leitura secundária | só snippet |
| 1 | Lançamentos/dia pump.fun | 17.300/dia (semana pré-Mayhem) → 17.800/dia (pós-Mayhem, "aumento insignificante") | nov/2025 | The Block Data & Insights (18/11/2025) via crypto.news/MEXC | Contagem de launches antes e depois do "Mayhem Mode" | relatório de empresa s/ on-chain | só snippet |
| 1 | Lançamentos/dia pump.fun | >20.000/dia; pico 25.000+ em 02/dez (maior desde meados de set) | dez/2025 | Dune via Yellow.com | Dashboard Dune de criação diária | dado on-chain, leitura secundária | só snippet |
| 1 | Média de lançamentos/dia (todo o histórico) | ~21.000/dia (18,67 mi ÷ ~29 meses) | 14/jan/2024–18/jun/2026 | CoinGecko Research via Crypto Briefing | 18,67 mi tokens ÷ dias do período | relatório de empresa | página aberta |
| 1 | LetsBonk/Bonk.fun lançamentos/dia (pico) | 18.620 (vs 9.600 da pump.fun) em 06/jul; recorde 28.872 em 21/jul/2025 | jul/2025 | Dune @Adam_Tehc via blocmates/Smithii | Dashboard Dune de launches | dado on-chain, leitura secundária | só snippet |
| 2 | **Taxa de graduação (acadêmica)** | **0,63%** (4.338/655.770) | set–out/2025 | **arXiv 2602.14860 (Marino et al.)** | Parsing on-chain Pump.fun/PumpSwap | **acadêmico / on-chain reproduzível** | **página aberta** |
| 2 | Taxa de graduação (survival, preprint) | 0,198% (IC 95% 0,189–0,208%); 1.651/832.941 | ~2026 | arXiv 2607.02823 (Hu et al.) | Coletor próprio, janela de 24 h, análise de sobrevivência | preprint / on-chain (janela curta) | página aberta |
| 2 | Taxa de graduação (cumulativa, "all-time") | ~1,4% | jan/2024 até ~2025 | Dashboards Dune via Solana Compass/BlockBeats | Graduados acumulados ÷ criados acumulados | dado on-chain, leitura secundária | só snippet |
| 2 | Taxa de graduação (rastreador diário) | "menos de 2%" (de 11,9 mi de launches acumulados) | ~2025 | The Block via Solana Compass | Graduação diária ao atingir US$ 100 mil de market cap | relatório de empresa s/ on-chain | só snippet |
| 2 | Taxa de graduação (pico Q4 2024) | <2% | out–dez/2024 | arXiv 2512.11850 (Mancino) | SQL Dune: tokens retirados p/ Raydium ÷ criados | acadêmico / on-chain reproduzível | página aberta |
| 2 | Taxa de graduação (diária, média recente) | 1,15% (pico histórico ~2%, mínimo ~0,5% ≈ 80 tokens/dia) | ~fev/2026 | Cryptopolitan citando Dune Analytics | Graduados/dia ÷ criados/dia | dado on-chain, leitura secundária | só snippet |
| 2 | Taxa de graduação (colapso 2026) | ~0,26% (média semanal) | meados jun/2026 | The Block via Crypto Briefing/DEXTools | Graduação semanal para DEX ÷ launches | relatório de empresa s/ on-chain | só snippet |
| 2 | Taxa de graduação LetsBonk | 1,06% | até 21/nov/2025 | Smithii | Migrações p/ Raydium ÷ launches LetsBonk | autopublicado s/ on-chain | só snippet |
| 3 | Mortalidade — "morre no dia do lançamento" | 68,67% (12,8 mi de tokens) | 14/jan/2024–18/jun/2026 | CoinGecko Research | Último trade na bonding curve no mesmo dia; via `tokens_solana.transfers` no Dune | relatório de empresa | página aberta |
| 3 | Mortalidade — "morre em até 2 dias" | 80,37% (~15 mi) | jan/2024–jun/2026 | CoinGecko Research | Último trade até o dia seguinte ao lançamento | relatório de empresa | página aberta |
| 3 | Sobrevivência >90 dias | 4,55% (850.180 tokens) | jan/2024–jun/2026 | CoinGecko Research | ≥1 trade após 90 dias | relatório de empresa | página aberta |
| 3 | "Colapso" de liquidez (<US$ 1.000) | 98,6% (só ~97.000 de >7 mi mantiveram >US$ 1.000) | jan/2024–mar/2025 | Solidus Labs, 2025 Rug Pull Report | % de tokens que caíram abaixo de US$ 1.000 de liquidez em SOL | relatório de empresa | página oficial aberta |
| 3 | Queda de preço pós-migração | >73% caem abaixo de 40% do preço de migração; 60,26% abaixo de 20% — em ~20 min | dez/2024–mar/2025 | arXiv 2602.13480 (MemeTrans) | 41.470 tokens migrados; preço 20 min pós-migração | acadêmico / on-chain reproduzível | página aberta |
| 4 | Tempo até graduar — mediana | 4,4 min (cauda de dezenas de min) | set–out/2025 | arXiv 2602.14860 (Marino et al.) | Distribuição tempo criação→graduação | acadêmico / on-chain reproduzível | página aberta |
| 4 | Tempo até graduar — mediana (preprint) | 1,0 min (média 1,3; p90 2,0; máx ~5–6 min) | ~2026 | arXiv 2607.02823 (Hu et al.) | 1.651 graduados de 832.941; tempo até desfecho, janela 24 h | preprint / on-chain (janela curta) | página aberta |
| 4 | Vida útil média (memecoin multi-chain) | ~1 ano (≈1/3 da vida de projeto cripto comum); ~2.020 morrem/mês | dados até ago/2024 | Chainplay, State of Memecoin 2024 (30.000 projetos ETH/SOL/Base) | Análise longitudinal de 30.000 projetos | relatório de empresa / autopublicado | só snippet |
| 4 | Vida útil média pump.fun | 12 dias; 98% (951.565) já mortos; 10.417 lançados vs 9.912 "defuntos" por dia | ~2024 (968.819 tokens, 3 meses) | Chainplay | Análise de 968.819 projetos pump.fun | autopublicado s/ on-chain | só snippet |
| 4 | Idade mediana top-50 memecoins | 6,66 dias (média 23,52) | ~2024 | Substack hyphin/Thor | "Dias desde início da negociação" no top-50 | autopublicado (corroboração fraca) | só snippet |
| 5 | Rug/pump-and-dump pump.fun | 98,6–98,7% | jan/2024–mar/2025 | Solidus Labs | >7 mi tokens c/ ≥5 trades; % que caiu abaixo de US$ 1.000 de liquidez | relatório de empresa | página oficial aberta |
| 5 | Pools Raydium com "soft rug" | 93% (361.000 de 388.000); mediana US$ 2.832; maior US$ 1,9 mi (MToken) | até mar/2025 | Solidus Labs | Pools com sinais de retirada abrupta de liquidez | relatório de empresa | página oficial aberta |
| 5 | Tokens de 2024 com traços de pump-and-dump | 3,59% (74.037 tokens); ~90–94% dos pools suspeitos "rugados" pelo criador | ano de 2024 | Chainalysis, 2025 Crypto Crime Report | Heurística de preço/liquidez multi-chain | relatório de empresa | página oficial aberta |
| 5 | Rug-pull candidates Solana (preprint) | 76.469 de 100.063 tokens; US$ 151 mi rastreáveis; falso-positivo 0,26% | ~1º sem 2025 (6 meses) | Preprint Solana via Crypto Impact Hub/DeepStrike | Pipeline de detecção em 3 DEXs Solana | preprint / on-chain | só snippet |
| 6 | Supply em contas "bundle" (coordenadas) | 36,5% do supply (bundle holder ratio 28,13%) | dez/2024–mar/2025 | arXiv 2602.13480 (MemeTrans) | 41.470 tokens migrados; 3 heurísticas (mesma tx; mesmo financiador; mesmo Jito bundle ID) | acadêmico / on-chain reproduzível | página aberta |
| 6 | Top-10 holders >30% do supply | 50,78% dos tokens de alto retorno (359 de 707); =87,14% do subconjunto anômalo | out/2024–jan/2025 | arXiv 2507.01963 (Midsummer) | 707 tokens c/ retorno >100%; limiar 30% (padrão GoPlus/CertiK) | acadêmico / on-chain reproduzível | página aberta |
| 6 | Concentração média top-10 (subconj. concentrado) | média 77,85% / mediana 87,01% (385 tokens) | out/2024–jan/2025 | arXiv 2507.01963 (Midsummer) | Média/mediana do supply em top-10 nos tokens concentrados | acadêmico / on-chain reproduzível | página aberta |
| 6 | Uso de bundle buy | 18,81% (133 de 707); média 15,70% do supply; >30% em só 20 casos (2,83%) | out/2024–jan/2025 | arXiv 2507.01963 (Midsummer) | % de tokens usando compra em pacote | acadêmico / on-chain reproduzível | página aberta |
| 7 | Retorno do comprador — carteiras lucrativas/mês | mínimo 30,1% (jun/2025) → 56,8% (fev/26) → 70,0% (mar/26) → 73,3% (abr/26) | abr/2024–abr/2026 | CoinGecko Research | PnL realizado por carteira pump.fun+PumpSwap; via Dune | relatório de empresa | página aberta |
| 7 | Perfil "bilhete de loteria" | ~96% das carteiras perderam ou ganharam <US$ 500; só ~4% >US$ 500 | mar/2026 | Dune @oladee via crypto.news | ~1,4 mi carteiras; PnL do mês | dado on-chain, leitura secundária | só snippet |
| 7 | Lucro realizado >US$ 10.000 | 0,4% (54.724 de 13,4 mi carteiras); >US$ 1 mi: 294 (0,002%) | até jan/2025 | Dune @Adam_Tehc via Yahoo/Mitrade | PnL realizado acumulado por carteira | dado on-chain, leitura secundária | só snippet |
| 8 | Same-block sniping | >50% dos tokens sniped no bloco de criação | ~mar–abr/2025 | Pine Analytics (Substack) | Filtro de compra no mesmo bloco do deploy | autopublicado s/ on-chain | página aberta |
| 8 | Sniping "deployer-funded" (subconj. de alta confiança) | ~1,75% dos launches; 15.000+ tokens, 4.600+ carteiras, 10.400+ deployers; 87% dos snipes lucrativos; 85% vendem em ≤5 min | ~1 mês (mar–abr/2025) | Pine Analytics | Só carteiras com transferência direta de SOL do deployer | autopublicado s/ on-chain | página aberta |
| 8 | Atividade de bots vs graduação | tokens dominados por bots têm probabilidade de graduação sistematicamente menor | set–out/2025 | arXiv 2602.14860 (Marino et al.) | Condiciona a prob. de graduação à fração de trades de bots | acadêmico / on-chain reproduzível | página aberta |

---

### 1. Lançamentos por dia
- **2024:** média histórica de ~7 tokens/minuto (~10.000/dia) desde o lançamento em 19/01/2024, com >3 mi de tokens criados até nov/2024 (SolanaFloor, página aberta); recorde de dia único de **69.046** mints (71,1% de todos os mints da Solana no dia) no Q4/2024 (arXiv 2512.11850, Mancino, página aberta). O "70.000+ tokens/dia" no auge (jan/2025) aparece na blocmates (só snippet, corroboração fraca).
- **2025:** média >20.000/dia em mar–abr (Dune @evelyn233, só snippet); LetsBonk superou a pump.fun em 06–07/jul (18.620 vs 9.600; recorde LetsBonk de 28.872 em 21/jul — Dune @Adam_Tehc, só snippet); The Block registrou 17.300/dia na semana pré-"Mayhem Mode" e 17.800/dia depois ("aumento insignificante") em nov (só snippet); >20.000/dia em dez, pico 25.000+ em 02/dez (Dune via Yellow, só snippet).
- **2026:** média de longo prazo de ~21.000/dia (18,67 mi ÷ ~29 meses) pela CoinGecko (página aberta). **NÃO VERIFICADO** para uma média diária exclusiva de 2026 de fonte primária aberta.

### 2. Taxa de graduação
Ver CHECKPOINT (0,63%, Marino et al., set–out/2025). Três **definições de "graduação"** coexistem e explicam boa parte das divergências:
- **(a) Migração efetiva para a DEX** ao completar a curva (~85 SOL reais / ~US$ 69 mil): usada por Marino et al. (0,63%) e Mancino (<2% no pico de 2024).
- **(b) Cumulativa "all-time"** (graduados acumulados ÷ criados acumulados): dashboards Dune → ~1,4%.
- **(c) Rastreador diário** ao atingir US$ 100 mil de market cap: The Block → "menos de 2%", oscilando até ~0,26% (jun/2026) e ~1,15% (fev/2026).

### 3. Mortalidade — três definições de "morto"
- **Sem transações (CoinGecko, relatório de empresa, página aberta):** último trade na bonding curve no mesmo dia = **68,67%** (12,8 mi tokens); em até 2 dias = 80,37%; sobrevivência >90 dias = 4,55% (18,67 mi tokens, jan/2024–jun/2026). Mede só a atividade na curva da pump.fun; a própria CoinGecko alerta que **subconta** tokens que migraram para outras DEXs.
- **Liquidez < US$ 1.000 (Solidus Labs, relatório de empresa, página oficial aberta):** **98,6%** caíram abaixo desse patamar (jan/2024–mar/2025). É colapso econômico, não morte por ausência de trades.
- **Queda de preço pós-migração (MemeTrans, acadêmico, página aberta):** >73% dos tokens que migraram caem abaixo de 40% do preço de migração em ~20 min; 60,26% abaixo de 20% (dez/2024–mar/2025).

Como cada fonte define "morto" é diferente — por isso 68,67% e 98,6% **não se contradizem**: respondem perguntas distintas (atividade vs. valor).

### 4. Tempo de vida
- **Tempo até graduar** (para o raro token que gradua): mediana **4,4 min** com cauda de dezenas de minutos (Marino et al., acadêmico, página aberta) vs. mediana **1,0 min** / máx ~5–6 min (Hu et al., preprint, página aberta). A diferença vem da janela de observação: o coletor de Hu et al. observa ~24 h e enxerga só graduações muito rápidas, encurtando a mediana.
- **Vida útil geral:** ~1 ano para memecoin multi-chain e **12 dias** na pump.fun (Chainplay: "10.417 lançados vs 9.912 defuntos por dia", 98% já mortos de 968.819 tokens em 3 meses — só snippet, qualidade fraca/autopublicado); idade mediana do top-50 = 6,66 dias (Substack, corroboração fraca).

### 5. Rug pulls e fraude
- **Solidus Labs, 2025 Rug Pull Report (página oficial aberta):** 98,6–98,7% dos tokens pump.fun classificados como pump-and-dump/rug; 93% dos pools Raydium com "soft rug" (361.000 de 388.000; mediana US$ 2.832; maior US$ 1,9 mi — MToken). Período jan/2024–mar/2025. **A pump.fun contestou publicamente**, dizendo que o relatório "carece de entendimento básico de memecoins". Nota crítica: o 98,6% é definido como % de tokens que caíram abaixo de US$ 1.000 de liquidez — colapso econômico, **não** fraude criminal provada.
- **Chainalysis, 2025 Crypto Crime Report (página oficial aberta):** 74.037 tokens de 2024 = **3,59%** do total com traços de pump-and-dump; ~90–94% dos pools de DEX suspeitos foram "rugados" pelo próprio criador. Heurística estrita de manipulação de preço/liquidez, multi-chain, só o ano de 2024.
- **Preprint Solana (só snippet):** 76.469 rug-pull candidates de 100.063 tokens em 3 DEXs, US$ 151 mi rastreáveis, falso-positivo 0,26% (~6 meses, 1º sem/2025).

### 6. Concentração (top-10 holders)
- **MemeTrans (arXiv 2602.13480, acadêmico, página aberta):** **36,5%** do supply em contas *bundle* (coordenadas pela mesma entidade) em 41.470 tokens migrados dez/2024–mar/2025. Detecção por 3 heurísticas (mesma transação; mesmo financiador; mesmo Jito bundle ID). Primeiros 10 compradores de tokens de alto risco detêm **+17 pontos percentuais** a mais que os de baixo risco (valores absolutos por faixa só aparecem em figuras, não no texto).
- **Midsummer (arXiv 2507.01963, acadêmico, página aberta):** entre 707 tokens de alto retorno (>100% em 3 meses), top-10 holders controlam >30% do supply em **50,78%** (359 tokens) — e em 87,14% do subconjunto anômalo; no subconjunto concentrado (385 tokens) a média do top-10 é **77,85%** / mediana 87,01%. Bundle buy usado em 18,81% (133 tokens, média 15,70% do supply). Nos casos de LPI (inflação de preço via pool), 27 tokens têm top-10 com média de 80,62% do supply.
- **NÃO VERIFICADO:** a fração exata de tokens com top-10 holders **acima de 50%** no lançamento. Nenhuma fonte primária mede exatamente esse limiar; o mais próximo é o limiar de 30% acima, e só para subconjuntos (tokens de alto retorno / migrados). **É um item que o seu observatório pode medir primeiro.**

### 7. Retorno do comprador típico (qualidade frágil, como você suspeitava)
- **CoinGecko Research (relatório de empresa, página aberta):** carteiras lucrativas por mês (PnL realizado) raramente >50% de abr/2024 ao fim de 2025, mínimo de **30,1% em jun/2025**, subindo para 56,8% (fev/26), 70,0% (mar/26) e **73,3% (abr/26)**. Em abr/2026, das ~3,14 mi carteiras ativas, ~2,3 mi lucraram, mas **65,1% ganharam só US$ 1–500**. Limitações declaradas pela própria CoinGecko: só PnL realizado (exclui quem segura sem vender) e **não filtra bots/wash trading**.
- **Dune @oladee (só snippet):** ~96% das carteiras perderam ou ganharam <US$ 500 em mar/2026.
- **Dune @Adam_Tehc (só snippet):** só 0,4% das 13,4 mi carteiras tiveram >US$ 10.000 de lucro realizado (jan/2025); só 294 carteiras (0,002%) >US$ 1 mi.
- **Qualidade do dado:** frágil e muito sensível ao método — PnL realizado ignora quem segura (bagholders), conta bots como "traders" e muda de sinal conforme o mês (de 30% a 73% lucrativos com a mesma métrica). Serve para descrever a **distribuição por mês**, não para afirmar "o comprador médio ganhou/perdeu X".

### 8. Sniping e bundles
- **Pine Analytics (autopublicado, Substack, página aberta):** **>50% dos tokens são sniped no mesmo bloco de criação** (a maior parte é bot "spray and pray"). O subconjunto de alta confiança "deployer-funded" (carteira que recebeu SOL direto do deployer) é **~1,75% dos launches** — 15.000+ tokens, 4.600+ carteiras sniper, 10.400+ deployers, 87% dos snipes lucrativos, 85% vendem em ≤5 min. Janela ~1 mês (mar–abr/2025). Qualidade: autopublicado sobre on-chain — a própria Pine reconhece capturar só parte do sniping total.
- **Marino et al. (acadêmico, página aberta):** tokens dominados por atividade de bots têm probabilidade de graduação sistematicamente menor a partir de estágios intermediários.

---

## Divergências entre fontes (com a diferença de método)
1. **Taxa de graduação — 0,63% × 0,198% × ~1,4% × ~2% × 0,26%:** diferenças de (a) **período** (a taxa despenca ao longo de 2025–2026); (b) **definição** (atingir o limite da curva vs. migração efetiva vs. US$ 100 mil de market cap); (c) **denominador** (mensal em Marino 0,63% vs. cumulativo "all-time" em Dune ~1,4%); (d) **janela de observação** (o preprint de Hu et al. só observa ~24 h e subconta graduações lentas → 0,198% e mediana de 1 min, contra 0,63% e 4,4 min de Marino).
2. **Mortalidade — 68,67% × 98,6%:** CoinGecko mede "sem transações no dia" (atividade); Solidus mede "liquidez < US$ 1.000" (valor). Perguntas diferentes, não conflito real.
3. **Fraude — 98,6% (Solidus) × 3,59% (Chainalysis):** Solidus trata quase todo colapso econômico como pump/rug (limiar de liquidez); Chainalysis usa heurística estrita de manipulação de preço/liquidez, só o ano de 2024 e multi-chain. A diferença de ~26× é quase toda de definição.
4. **Retorno — 30% a 73% de carteiras lucrativas:** mesma métrica (CoinGecko), meses diferentes — prova de que qualquer número isolado engana; a **série temporal** é a resposta honesta.
5. **Tempo até graduar — 4,4 min × 1,0 min:** diferença de janela e método de coleta (ver item 1d).

## O que NINGUÉM mediu bem ainda (o que o observatório pode medir primeiro)
- **Fração exata de tokens com top-10 holders > 50%** no bloco de lançamento (só existe o limiar de 30%, e só para subconjuntos).
- **Mortalidade padronizada** com definição única aplicada a todos os launchpads (pump.fun, LetsBonk, Believe, Moonshot, Meteora DBC) lado a lado, no mesmo período.
- **PnL do comprador de varejo não-bot**, separando bots/wash trading e incluindo posições não realizadas (bagholders).
- **Distribuição completa de tempo de vida** por launchpad, com definição de "morto" única (não só pump.fun, não só top-50).
- **Taxa de graduação por launchpad concorrente** com o mesmo método on-chain reproduzível, para comparar maçãs com maçãs.

## NÃO VERIFICADOS
- Média diária de lançamentos **exclusiva de 2026** a partir de fonte primária aberta.
- Fração de tokens com **top-10 > 50%** do supply no lançamento.
- Qualquer **"retorno médio do comprador"** como número único (só existe distribuição por mês, frágil).
- Vida útil **"12 dias"** da pump.fun (só Chainplay, autopublicado, não reproduzido por fonte primária aberta).
- "70.000+ tokens/dia no auge" (só blocmates, corroboração fraca).

## Fontes com link e data de consulta (todas consultadas em 11/09/2026)
- arXiv:2602.14860 — Marino et al., *Predicting the success of new crypto-tokens: the Pump.fun case* — https://arxiv.org/abs/2602.14860 (página aberta)
- arXiv:2512.11850 — Mancino, *The Memecoin Phenomenon* — https://arxiv.org/pdf/2512.11850 (página aberta)
- arXiv:2602.13480 — Hu, Tekin, Xu & Liu, *MemeTrans* — https://arxiv.org/html/2602.13480v1 (página aberta)
- arXiv:2507.01963 — Mongardini & Mei, *A Midsummer Meme's Dream* — https://arxiv.org/html/2507.01963v2 (página aberta)
- arXiv:2607.02823 — Hu et al., *Pump.fun Graduation Regime Windows (Survival Analysis)* — https://arxiv.org/pdf/2607.02823 (página aberta)
- Solidus Labs, 2025 Rug Pull Report — https://www.soliduslabs.com/reports/solana-rug-pulls-pump-dumps-crypto-compliance (página oficial aberta)
- Chainalysis, Crypto Market Manipulation 2025 — https://www.chainalysis.com/blog/crypto-market-manipulation-wash-trading-pump-and-dump-2025/ (página oficial aberta)
- CoinGecko Research, *Pump.fun Traders Are Making a Comeback* — https://www.coingecko.com/research/publications/pump-fun-traders-are-making-a-comeback (página aberta)
- CoinGecko Research, lifespan (via Crypto Briefing) — https://cryptobriefing.com/pump-fun-token-survival-rate-study/ e https://cryptopotato.com/nearly-70-of-pump-fun-tokens-die-on-launch-day-coingecko/ (páginas abertas)
- Pine Analytics, *Exit Liquidity Machines* — https://pineanalytics.substack.com/p/exit-liquidity-machines (página aberta)
- SolanaFloor (3 mi tokens, 7/min) — https://solanafloor.com/news/total-tokens-created-on-pump-fun-hits-record-3-million-averaging-7-per-minute-since-launch (página aberta)
- The Block (rastreador diário de graduação; "menos de 2%"; 0,26%; 17.300→17.800/dia) — via Solana Compass https://solanacompass.com/news/pumpfun-launched-42000-tokens-in-one-day-fewer-than-2-will-ever-reach-a-dex e The Block Data & Insights (só snippet)
- Dune (dashboards @Adam_Tehc, @evelyn233, @oladee, jondar) — https://dune.com/adam_tehc/pumpfun etc. (só snippet — dashboards carregam por JavaScript e não foram abertos em sessão de navegador; marcados como leitura secundária)
- Chainplay, State of Memecoin 2024 — https://chainplay.gg/blog/lifespan-pump-fun-memecoins-analysis/ (só snippet)

## Consultas de busca realizadas
1. pump.fun graduation rate Dune dashboard 2025
2. pump.fun tokens launched per day 2025
3. Solana memecoin rug pull report 2025 Solidus Labs
4. pump.fun memecoin sniping bundle bots percentage first block study
5. memecoin lifespan median lifetime days study Solana
6. pump.fun retail trader losses profit percentage wallets study
7. memecoin top 10 holders concentration supply launch percentage bundle
8. LetsBonk bonk.fun graduation rate daily launches 2025 Dune
9. Chainalysis 2025 crypto crime report pump and dump tokens Solana percentage
10. Pine Analytics pump.fun sniping report 50% launches sniped methodology
11. pump.fun 2024 tokens per day average launches history early 2024
12. Chainalysis 2024 pump and dump 3.6% tokens launched suspected
13. Solidus Labs 2025 Rug Pull Report methodology 98.6% definition pump dump
14. CoinGecko pump.fun tokens die on launch day 18.67 million study 2026
15. pump.fun graduation rate current 2026 percent Dune all-time
16. pump.fun graduation time median minutes distribution Dune
17. CoinGecko research pump.fun traders comeback profitable April 2026 methodology

---

**➡️ Ação sua agora:** confirme se aceita **0,63% (Marino et al., set–out/2025)** como a taxa de graduação de referência — ou se prefere ancorar em outra (ex.: ~1,4% "all-time" do Dune, ou a série diária do The Block). Assim que você responder ao checkpoint, escrevo o documento final completo em cima deste material.

> *Observação metodológica sobre as ferramentas:* os dashboards do Dune, do The Block e do DEXTools carregam por JavaScript e/ou exigem sessão de navegador; não consegui abri-los de forma reprodutível, então todos os números vindos deles estão marcados como **(só snippet)** / leitura secundária e não foram usados como âncora do checkpoint. As âncoras acadêmicas (arXiv) e os relatórios oficiais (Solidus, Chainalysis, CoinGecko, Pine) foram abertos e lidos integralmente. Nada aqui é recomendação de investimento.