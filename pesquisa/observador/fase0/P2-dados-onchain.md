# Fontes de dados on-chain e de preço na rede Solana — Documento factual para o "observatório" de memecoins de Victor
**Data de consulta: 11 de setembro de 2026**

> Como ler este documento: cada afirmação traz a fonte logo depois, com a marcação **(página aberta)** quando a página foi de fato aberta/lida, **(testado ao vivo)** quando foi uma chamada real à API, e **(só snippet)** quando veio apenas do resumo do buscador. Todo termo técnico é explicado na primeira vez em que aparece. Onde duas fontes oficiais divergem, as duas são mostradas.

---

## 0. Resumo curto do que decide a arquitetura

- **O teste do pool morto deu POSITIVO (situação "a"):** a API grátis e sem chave do GeckoTerminal continua entregando as velas de preço de 1 minuto de pools que morreram (liquidez zerada, sem negociação), **desde que os horários pedidos estejam dentro da janela de ~6 meses**. Ou seja: dá para reconstruir mortalidade retroativamente, mas só até ~6 meses atrás (testado ao vivo, 11/09/2026).
- **A granularidade mínima viável de graça é 1 MINUTO, não segundo.** Logo, qualquer hipótese de "preço N segundos depois do sinal" **não é mensurável** com essas fontes gratuitas; o horizonte mínimo é "N minutos depois".
- **Consequência prática:** o observatório pode começar reconstruindo os últimos ~6 meses via GeckoTerminal, MAS precisa **iniciar coleta ao vivo desde já** para tudo que precise durar além de 6 meses, porque a API grátis recusa (erro HTTP 401) pedidos de velas com carimbo de tempo anterior a ~6 meses — mesmo em pool vivo (testado ao vivo, 11/09/2026).

---

## 1. Como detectar lançamento e graduação, passo a passo

**Conceitos, explicados na primeira vez:**
- **Launchpad** é um site/programa onde qualquer pessoa cria um token novo em segundos; o maior na Solana é o pump.fun.
- **Bonding curve** (curva de emissão) é uma fórmula matemática que define o preço do token conforme ele vai sendo comprado, sem livro de ofertas; enquanto o token está "na curva", ele só é negociado contra essa fórmula.
- **Graduação** é o momento em que o token junta SOL suficiente na curva e "migra" para uma DEX (exchange descentralizada, isto é, uma bolsa que roda por contratos on-chain), virando uma pool comum.
- **WebSocket** é uma conexão que fica aberta e recebe os eventos "empurrados" na hora, em vez de você ficar perguntando de novo e de novo (isso último se chama "polling").
- **RPC** (Remote Procedure Call) é o "telefone" pelo qual seu programa fala com um nó da rede Solana para ler dados.

**Fato-base oficial:** o próprio pump.fun descreve a curva como um AMM (automated market maker, "formador de mercado automático") de produto constante e diz que, ao atingir o teto, "a curva é fechada e toda a pool de liquidez é migrada atomicamente para a PumpSwap" (pump.fun/docs/bonding-curve, **página aberta**, 11/09/2026). O pump.fun **não oferece uma API pública oficial de dados** — isso é afirmado por várias fontes de terceiros; portanto a detecção passa por (a) escutar o programa on-chain via RPC/WebSocket, ou (b) usar um provedor terceiro que já indexa isso.

**Caminhos para detectar LANÇAMENTO:**

1. **Via provedor terceiro com WebSocket grátis — PumpPortal (página oficial do produto):** a documentação do PumpPortal lista o método `subscribeNewToken` para eventos de criação de token, marcado **"(Free)"**, e `subscribeMigration` para eventos de migração, também **"(Free)"**, na conexão `wss://pumpportal.fun/api/data` (pumpportal.fun/data-api/real-time, **página aberta**, 11/09/2026). A mesma página avisa: use apenas UMA conexão WebSocket por vez, ou o cliente pode ser banido temporariamente (banimento expira a cada hora). Assinar trades de token/conta específicos é **pago** (0,01 SOL por 10.000 eventos) e exige carteira financiada — o que Victor NÃO quer; mas `subscribeNewToken` e `subscribeMigration` **não** exigem isso.

2. **Via GeckoTerminal (testado ao vivo, sem chave):** o endpoint de "novas pools" lista pools recém-criadas com o campo `dex` identificando o launchpad. No teste ao vivo de 11/09/2026 apareceram pools com `dex` = "pump-fun", "raydium-launchlab", "meteora-dbc" e "meteora-damm-v2", cada uma com `pool_created_at` (horário de criação), `reserve_in_usd` (liquidez) e contagem de transações (api.geckoterminal.com/api/v2/networks/solana/new_pools?page=1, **testado ao vivo**, 11/09/2026). Isso é polling (você pergunta de tempos em tempos), não empurra na hora, e o cache do endpoint é de ~30 segundos segundo a doc da CoinGecko.

3. **Via logs do programa on-chain (mais trabalhoso):** escutar os eventos do programa do pump.fun por um RPC com WebSocket. É o caminho mais "cru" e é o que os provedores terceiros fazem por você.

**Como saber que GRADUOU:**
- A graduação equivale à criação de uma pool nova na PumpSwap (programa `pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA`, citado pela documentação da Chainstack). Desde 20 de março de 2025 as graduações vão para a **PumpSwap**; antes iam para a Raydium (docs.chainstack.com, **só snippet** — corroboração de terceiro, 11/09/2026). *Atenção à divergência de vocabulário:* a página da The Block ainda descreve graduação como "liquidez adicionada à Raydium" (ver seção 7); o mecanismo atual é a PumpSwap, mas alguns painéis usam a redação antiga.
- **Caminho oficial-produto (PumpPortal):** o evento `subscribeMigration` marca exatamente essa migração (**página aberta**, 11/09/2026).
- **Caminho verificado ao vivo (GeckoTerminal):** no teste do pool morto (seção 3), o endpoint de pool do GeckoTerminal trouxe, para uma pool de bonding curve, o campo `launchpad_details` com `completed: true`, `completed_at` e `migrated_destination_pool_address` (o endereço da pool de destino após a graduação). Ou seja, dá para detectar a graduação e achar o novo endereço olhando esse campo (**testado ao vivo**, 11/09/2026).
- **ALERTA de arquitetura (histórico dividido em dois endereços):** como o token muda de pool ao graduar (endereço da pool da curva → endereço da pool da PumpSwap), o histórico de preço fica **repartido entre dois endereços de pool**. O `migrated_destination_pool_address` é a ponte entre os dois. Isso está agora VERIFICADO (o campo existe e aponta o destino), mas o observatório precisa **costurar as duas séries manualmente**.

---

## 2. Tabela de APIs de preço (tier grátis)

Legenda: "velas" = candlestick OHLCV (abertura/máxima/mínima/fechamento/volume de um intervalo). "CU" = Compute Unit, a unidade de custo interna da Birdeye. "rps" = requisições por segundo.

| Fonte (acesso) | Limite grátis (número da página + data) | Preço histórico por timestamp? | Granularidade mínima | Profundidade do histórico | Cobertura de bonding curve |
|---|---|---|---|---|---|
| **GeckoTerminal SEM chave** (testado ao vivo 11/09/2026) | DIVERGÊNCIA OFICIAL: Swagger diz "approximately 10 calls/minute" (api.geckoterminal.com/docs); FAQ do guia diz 30/min (apiguide.geckoterminal.com/faq). Cache de 1 min. | SIM (via `before_timestamp`, testado ao vivo) | 1 minuto (timeframe "second" → HTTP 401 sem chave) | ~6 meses (pedidos mais antigos → HTTP 401) | SIM: pump-fun, raydium-launchlab, meteora-dbc, meteora-damm-v2 aparecem nas novas pools (testado) |
| **CoinGecko Demo (com chave grátis)** (página aberta 11/09/2026) | 100 chamadas/min e 10.000 chamadas/mês; atribuição exigida (coingecko.com/en/api/pricing) | SIM (`before_timestamp`, limit ≤1000) | 1 minuto (aggregate 1, 5, 15) | Doc do endpoint: "cada chamada recupera no máximo 6 meses"; tabela de preços mostra "6 months" no Demo/Basic | SIM (FAQ cita dados de bonding curve de Pump.fun, Four.meme, Raydium LaunchLab) |
| **Birdeye Standard (grátis, exige X-API-KEY)** (páginas abertas 11/09/2026) | 30.000 CUs/mês, 1 rps, acesso "Limited" (data.birdeye.so/docs/.../pricing.md, vigente no checkpoint). DIVERGÊNCIA: a página de pricing renovada (birdeye.so/data-api/pricing) mostra Lite $39/2,5M CUs, Starter $99/8M, Premium $199/20M, Business $499/60M — todos pagos — e um botão **"Standard (Free)" sem número ao lado** (página aberta 11/09/2026). | SIM: `/defi/historical_price_unix` (5 CU, só Solana) e `/defi/history_price` (35 CU) | 1 minuto (`type=1m`); doc lista 1s/15s/30s mas com retenção curta | history_price: série; ohlcv v3: retenção 1s=2 semanas, 15s/30s=3 meses, 1m **não declarada** | SIM: Pump.fun, Pump AMM, Meteora DBC, Raydium LaunchLab (dex-coverage) |
| **DexScreener** (página aberta 11/09/2026) | 300 req/min (pares/tokens/busca); 60 req/min (perfis/boosts) (docs.dexscreener.com/api/reference) | **NÃO** — só estado atual | Não tem velas | Não tem histórico | Retorna preço/liquidez atuais de pares em qualquer DEX, sem série temporal |
| **Jupiter Price API V3** (página aberta, checkpoint) | Exige x-api-key; preço do último swap + blockId, sem parâmetro de data | **NÃO** | Não aplicável (preço "agora") | Não | Tokens sem trade nos últimos 7 dias normalmente omitidos |

**Observação importante sobre a divergência Birdeye:** no checkpoint, três páginas oficiais divergiam sobre o que o Standard cobre (tabela de acesso marcava history_price/historical_price_unix/v3 ohlcv como disponíveis no Standard; changelog de 17/07/2025 falava em "20+ endpoints" no Standard; a página de rate limiting ainda dizia Standard "Limited to 3 specific endpoints"). Em 11/09/2026 a página de preços do produto foi reformulada e **não exibe mais o número "30.000 CUs" do Standard de forma inequívoca**. **Para planejar, ver seção 8: adota-se o pior cenário.**

---

## 3. TESTE DO POOL MORTO (item 1 — prioridade máxima)

**Objetivo:** decidir se dá para reconstruir mortalidade depois (dentro de ~6 meses) ou se é preciso coletar ao vivo desde o lançamento.

**Confounder controlado:** a API grátis do GeckoTerminal recusa (HTTP 401) pedidos de velas com `before_timestamp` mais antigo que ~6 meses, MESMO em pool vivo. Por isso o teste usou pools cuja vida está dentro dos últimos ~6 meses, para que erro/vazio indique efeito da morte, não da janela.

**Tentativas registradas (todas via chamada direta à API pública, sem chave, 11/09/2026):**

1. **Pool quase-morto (THEHOBBY / SOL), endereço `8Q69zyk4BzduRKgwc9dNVGVEzcrqw6tKdmFt6ZdGPuvr`:** no endpoint de novas pools apareceu com `reserve_in_usd` = "0.7475" (liquidez de ~US$ 0,75), preço base 0 e apenas 1 transação. Pedido de velas de 1 minuto: `.../pools/8Q69.../ohlcv/minute?aggregate=1&limit=5` → **HTTP 200**, retornou 1 vela (carimbo 1789113900, preço ~3,58e-06). *Conclusão parcial:* pool com liquidez ~zero **ainda é servido** e devolve suas velas. *(Ressalva: este foi criado hoje, então não prova o critério ">1 mês".)*

2. **Pool morto ainda servido (casino / SOL), endereço `HrnjVigQQr57wTxoXGnGbh4xscA2ANwYqn6swvXvp8rC`:** endpoint de pool → **HTTP 200**, com `reserve_in_usd` = "0.0" (liquidez zerada), preço nativo NaN, transações m5/m15/m30/h1/h6 todas 0, e `launchpad_details` com `completed: true`, `completed_at 2026-09-10`, `migrated_destination_pool_address Fwejea8MbKDTncrvU9FERYRS5skH5YjDEisSGLNjXzWn`. Velas de 1 minuto → **HTTP 200**, 27 velas preservadas da vida curta do pool (mostrando o pump e o colapso). *Conclusão parcial:* **pool drenado continua devolvendo o histórico de 1 minuto.**

3. **Pool vivo dentro da janela ($Lintr / SOL), endereço `AgmhSaDyUW2qWHE4bxx3UJutNg7DrSjuzXWBwnWowTSL`, criado 2026-06-07 (~3 meses):**
   - Velas recentes → **HTTP 200**, 100 velas de 1 minuto atuais.
   - Velas históricas de junho/2026 (`before_timestamp=1781913600`, ≈19/06/2026) → **HTTP 200**, 100 velas de 17–19/06/2026. Ou seja: histórico de 1 minuto de >3 meses atrás vem normal, dentro da janela.
   - Com `include_empty_intervals=true` → **HTTP 200**, velas contíguas onde os minutos sem negociação vêm como **velas planas de volume 0.0** (útil: um trecho de "silêncio" pós-morte aparece como velas de volume zero, não como lista vazia).

4. **Confounder isolado (mesmo pool vivo, timestamp >6 meses):** `before_timestamp=1764547200` (01/12/2025) → **HTTP 401**. Confirma que o 401 é a barreira de ~6 meses (independe de estar vivo ou morto). Corresponde aos testes do checkpoint (01/01/2026 e 01/01/2025 → 401).

**Birdeye:** teste **NÃO executado** — a API exige X-API-KEY e não havia chave. Marcado **NÃO VERIFICADO** para a Birdeye especificamente (retenção de 1m para token morto; comportamento do `historical_price_unix` em token inativo). Motivo: sem chave, não é possível chamar a API; completar por fonte fraca violaria as regras.

**CONCLUSÃO do item 1 — situação (a), com uma ressalva de honestidade:** os testes sustentam que **dá para reconstruir mortalidade retroativamente** no GeckoTerminal grátis, ao nível de 1 minuto, para pools que morreram há mais de um mês **desde que os horários pedidos caiam dentro da janela de ~6 meses**. A morte em si (liquidez zerada, sem trades) NÃO apaga os dados: o endpoint de pool e o de velas continuam servindo. A única barreira dura é o corte de ~6 meses (HTTP 401), que atinge qualquer pool. **Ressalva:** foram comprovados os dois componentes mecânicos (pool morto continua servido + janela de 6 meses é o único gargalo), mas não se achou um único token nomeado que tivesse nascido em julho/2026 **e** estivesse 100% parado hoje para rodar o teste literal "T logo após o último trade" nesse exato token; a conclusão segue dos componentes provados. Para a Birdeye, permanece **NÃO VERIFICADO**.

**Decorrência direta:** o que tiver mais de ~6 meses **não** é reconstruível pelo grátis → é **obrigatório coletar ao vivo desde já** para qualquer medição que precise durar além disso.

---

## 4. GRANULARIDADE MÍNIMA: 1 MINUTO (item 2)

**A regra, com todas as letras:** a granularidade mínima viável com dado grátis é **1 minuto, não segundo**. Portanto, qualquer hipótese de "preço N segundos depois do sinal" **não é mensurável** com essas fontes gratuitas. O horizonte mínimo que o observatório pode medir é **"N minutos depois"**.

**O que é uma vela de 1 minuto, para leigo:** uma "vela" (candle) resume tudo o que aconteceu com o preço num intervalo. A vela de 1 minuto do minuto 14:03 informa quatro números daquele minuto inteiro (14:03:00 a 14:03:59): o preço de **abertura** (primeiro trade), a **máxima**, a **mínima** e o **fechamento** (último trade), mais o volume. Por isso ela **não responde** "qual era o preço às 14:03:27": ela só diz o que ocorreu no minuto todo, não no segundo exato.

**Ressalvas factuais (não derrubam a regra adotada):**
1. A doc da Birdeye lista velas de 1 segundo no endpoint v3 ohlcv, disponível a partir do Standard, mas com **retenção de apenas 2 semanas** para 1s, custo em CU, e **não testado** (sem chave).
2. O `/defi/historical_price_unix` da Birdeye devolve o preço "resolvido perto do timestamp pedido" **sem declarar a precisão** (quão perto); até ser medido, deve ser tratado como precisão de minuto.
3. O GeckoTerminal sem chave **recusou** o timeframe "second" (HTTP 401 nos testes do checkpoint e desta rodada).
4. Esta regra vale para **histórico obtido por API de preço**. Captura ao vivo de transações via RPC/WebSocket é outra questão (é evento a evento, com carimbo de tempo próprio) — respondida factualmente na seção 5, sem supor que "funciona": o que o grátis de cada RPC entrega está lá.

---

## 5. Tabela de RPCs grátis + nó próprio

| Provedor (11/09/2026) | Limite grátis (número da página) | WebSocket no grátis? | Histórico/arquivo | O que é pago |
|---|---|---|---|---|
| **Helius** (helius.dev/docs/billing/plans, **página aberta**) | Free: **1M créditos/mês, 10 req/s** RPC; DAS e Enhanced 2 req/s; 1 API key; 1 webhook | SIM: "LaserStream WSS (standard Solana methods)" marcado "Included" no Free | Não declarado como arquivo dedicado no Free | Developer $49/mês (10M, 50 req/s, extensões LaserStream WSS, gRPC Devnet); Business $499 (gRPC mainnet); Professional $999 |
| **QuickNode** (quicknode.com/pricing + FAQ terceiro) | Free: **10M créditos/mês, 15 req/s**, HTTPS + WebSocket, sem cartão (**só snippet**: solanabox.tools citando FAQ; página de pricing lista "Free trial") | SIM (HTTPS + WSS incluídos) | Archive citado como recurso, tier depende de plano | Build $49/mês etc.; gRPC só em planos pagos |
| **Alchemy** (alchemy.com/pricing, /support/free-tier-details, **páginas abertas/snippet**) | Free: **30M CU/mês**; DIVERGÊNCIA interna: uma página diz 25 req/s (500 CU/s), outra fala em 300 CUPS; 5 apps | SIM (HTTP e WebSocket) | Suporta consulta histórica/arquivo conforme método | Pay As You Go $0,45/1M CU (primeiros 300M), depois $0,40/1M |
| **Triton One** (triton.one/pricing, **página aberta/snippet**) | **SEM tier grátis tradicional**: acesso começa com depósito pré-pago de US$ 125 (válido 12 meses) | (todas as features em todo plano, sem trava) | Ledger queries pagas por GB | Pay-as-you-go: RPC/gRPC unário/ledger $0,08/GB + $10 por milhão de chamadas; Shred dedicado $1.500/mês por IP |

**Nó próprio em PC doméstico — CONFIRMADO INVIÁVEL.** A documentação oficial da Anza (mantenedora do Agave, o cliente validador majoritário) recomenda, por nó: **CPU de 12 núcleos/24 threads ou mais a 2,8 GHz+; 256 GB de RAM ou mais (placa com capacidade de 512 GB sugerida); e SSDs NVMe separados de 1 TB (contas), 1 TB (ledger) e 500 GB (snapshots)** — para um nó RPC, sobe para **16 núcleos/32 threads e 512 GB de RAM** se usar todos os índices de conta (docs.anza.xyz/operations/requirements, **página aberta**, 11/09/2026). A rede exige IPv4 público fixo e conexão de 1 Gbit/s simétrica (nó sem stake). A mesma doc (prerequisites) diz textualmente que "a maioria das conexões domésticas de internet não é adequada para rodar um validador Solana" (**página aberta**, 11/09/2026). **Portanto: um PC doméstico comum não roda nó Solana; a suspeita de Victor está correta.** O observatório deve usar RPC de terceiro, não nó próprio.

---

## 6. APIs de segurança de token

Conceitos: **mint authority** = permissão que deixa o criador emitir mais tokens do nada (deve estar revogada em token sério); **freeze authority** = permissão de congelar a carteira de alguém, travando a venda (honeypot); **liquidez travada/queimada** = os LP tokens (comprovantes de quem pôs liquidez) foram bloqueados ou destruídos, impedindo o criador de sacar tudo; **concentração de holders** = quanto do total está nas mãos de poucas carteiras; **bundle** = quando o criador compra grande parte no mesmo bloco do lançamento, disfarçado em várias carteiras.

| Fonte (11/09/2026) | O que entrega | Grátis? |
|---|---|---|
| **RugCheck** (api.rugcheck.xyz/swagger; FluxRPC, **só snippet**) | Scan de token (mint/freeze authority, top holders, liquidez, LP lockers, `rugged`, score de risco, grafo de "insiders"), source-code, risco de carteira, busca de token. Campos citados na doc/wrappers: `mintAuthority`, `freezeAuthority`, `topHolders`, `totalMarketLiquidity`, `lockers`, `graphInsidersDetected`. Grafo de insiders/bundle em `/tokens/{id}/insiders/graph`. | SIM, API grátis; a página do provedor FluxRPC afirma "The free plan allows up to 3 requests per second" (**só snippet**); exige API key no header X-API-KEY. |
| **Birdeye** `/defi/token_security` | Dados de segurança do token | **NÃO no Standard** — pela tabela de acesso (vigente 26-Nov-2025), token_security começa no Lite; WebSockets só a partir de Premium. `/defi/v2/tokens/new_listing` e `/defi/v3/token/meme/list` estão no Standard (**página aberta**, checkpoint). |
| **GeckoTerminal / CoinGecko** | Preço, liquidez (`reserve_in_usd`), volume, transações e (via endpoint de pool) `launchpad_details`. **Não é um "scanner de segurança" dedicado** (não dá score de rug nem detecção de bundle). | Grátis (mesmos limites da seção 2) |

Para mint/freeze authority e concentração de holders, tanto o RugCheck quanto uma chamada direta ao RPC (`getTokenLargestAccounts`, que a doc de um wrapper diz funcionar no tier grátis da Helius, **só snippet**) resolvem. Detecção de **bundle** e de "insiders" aparece explicitamente no RugCheck.

---

## 7. Dashboards públicos (Dune e similares)

Os dashboards do Dune carregam por JavaScript; ao abrir via ferramenta automatizada, retornou apenas o "esqueleto" da página com "Loading" e o menu — **o conteúdo numérico não carregou**. Portanto, os valores mostrados nos painéis abaixo ficam **NÃO VERIFICADOS por leitura automatizada**; os links e o tema (o que cada um mede) estão confirmados pelo título/descrição. **Recomendação: abrir manualmente no navegador de Victor e ler a data dos dados no próprio painel.**

| Dashboard / fonte | O que mede | Estado da leitura (11/09/2026) |
|---|---|---|
| dune.com/adam_tehc/pumpfun ("Pump.Fun") | Estatísticas gerais do pump.fun | Aberto; só carregou esqueleto → números NÃO VERIFICADOS |
| dune.com/queries/4861426/8051257 ("Daily Tokens Created") | Contagem diária de tokens criados e quantos graduaram | Link confirmado; números NÃO VERIFICADOS |
| dune.com/jondar/pumpfun ("Graduations, Bots, and Profits") | Graduações, bots, lucros | Link confirmado; números NÃO VERIFICADOS |
| dune.com/dunesleuth/pumpfun-tokens-graduation-times | Tempos de graduação | Link confirmado; números NÃO VERIFICADOS |
| **The Block** — theblock.co/data/on-chain-metrics/solana/pump-fun-percent-graduated-tokens-daily | Percentual diário de tokens do pump.fun que graduam. Definição textual da própria página: *"Pump.fun tokens 'graduate' when they reach a market cap of $100k, after which liquidity is added to Raydium and trading continues there"* | Descrição confirmada; valor diário NÃO VERIFICADO por leitura automatizada |

**Números de contexto (corroboração de terceiros — usar como ordem de grandeza, NÃO como leitura primária de painel):**

- **Lançamentos por dia:** uma análise da **Bitquery** publicada via Medium/Coinmonks ("Pump.fun API: How to Track Bonding Curves…", 2 de setembro de 2026) reporta, para a janela de 5/08 a 2/09/2026, uma **faixa diária de 30.663 (mínimo) a 52.438 (máximo)** tokens (**só snippet**, corroboração de terceiro). O Solana Compass registra um **pico de ~42.000 lançamentos de token na Solana em um único dia** (maio/2026) (**só snippet**). *(A cifra "mais de 20.000/dia" que circula em matérias Bitget/BlockBeats sobre um painel do Dune é mais antiga e menor; prefira as faixas acima, mais recentes e nomeadas.)*
- **Taxa de graduação — fontes divergem fortemente, mostrar todas:**
  - **Bitquery** (Medium/Coinmonks, set/2026), medindo por coorte, 4 coortes de agosto seguidas até 2/09: **2,84% / 2,69% / 2,60% / 3,10%** — resumido como *"Call it 2.7%, stable within half a percentage point across four independent cohorts"* (**só snippet**).
  - **DEXTools** ("Pump.fun in 2026", jun/2026): a taxa *"has collapsed to roughly 0.26 percent in mid June"* (**só snippet**).
  - **Paper acadêmico** (Kamat, 2026, SSRN/arXiv, n = 832.941 lançamentos, 8/05 a 10/06/2026): *"pooled graduation rate is 0.198% (Wilson 95% CI [0.189%, 0.208%])"* (**só snippet**).
  - Essas três medições diferem por método e janela (coorte recente vs. média ampla vs. amostra acadêmica); a ordem de grandeza vai de **~0,2% a ~2,7%**. O observatório de Victor deve reportar a própria medição declarando janela e método, como essas fontes fazem.
- **Mortalidade/"rug":** o relatório da **Solidus Labs** "Solana Rug Pulls & Pump-and-Dumps" (maio/2025, via CoinDesk 7/05/2025) afirma que **98,6% dos tokens lançados no pump.fun foram rug pulls ou pump-and-dump**, e que *"Just 97,000 of the seven million launched on pump.fun have maintained at least $1,000 in liquidity"* (ou seja, <1,4% mantiveram ≥US$ 1.000 de liquidez; >7 milhões de tokens desde jan/2024) (**só snippet**, corroboração de terceiro).

---

## 8. DECISÕES DE ARQUITETURA (item 3)

*(Esta é a única seção em que o documento toma posição; as demais são neutras.)*

**Pior número adotado onde as fontes divergem:**
- GeckoTerminal sem chave = **10 chamadas/min** (Swagger), **não** 30 (FAQ). Todo dimensionamento usa 10.
- Birdeye Standard: as páginas oficiais divergem sobre o que o grátis cobre e a página de preços foi reformulada sem exibir o número do Standard de forma clara. **Risco registrado:** se valer a página de rate limiting ("Standard limitado a 3 endpoints"), o plano grátis pode **NÃO** cobrir o `historical_price_unix` no volume proposto. Planejar contando com a possibilidade de precisar do **Lite pago (US$ 39/mês, 2,5M CUs)** caso o Standard grátis não sirva.

**Uso combinado proposto:**
- **GeckoTerminal (grátis, sem chave)** para a **varredura ampla**: descobrir novas pools (endpoint new_pools), acompanhar preço/liquidez hora a hora de muitas pools e reconstruir os últimos ~6 meses.
- **Birdeye `/defi/historical_price_unix` (5 CU)** para **consultas pontuais amarradas a um sinal específico** (ex.: "preço perto do minuto X para este token"), quando precisar de um número casado a um evento — sujeito à divergência de plano acima.
- **PumpPortal WebSocket grátis** (`subscribeNewToken` + `subscribeMigration`) para o **fluxo ao vivo** de lançamentos e graduações, uma única conexão.
- **CoinGecko Demo (chave grátis: 100/min, 10.000/mês)** como alternativa registrada quando 10/min do GeckoTerminal sem chave for pouco.

**Contas de orçamento (conta minha a partir do número da página):**
- GeckoTerminal sem chave a 10 chamadas/min → **máximo teórico de 600 chamadas/hora e 14.400 chamadas/dia**. Cada chamada de velas cobre **UMA pool** e até **1.000 velas de 1 minuto** (≈16 h 40 min de histórico por chamada).
- Reconstruir 6 meses de 1 minuto de uma pool ≈ 6×30×24×60 ≈ 259.200 minutos ÷ 1.000 por chamada ≈ **260 chamadas por pool** — ou seja, ~26 minutos de chamadas por pool no limite de 10/min. Escalar isso para milhares de pools é o **gargalo real**.
- Dimensionamento do universo: se as faixas de lançamento da seção 7 valerem (Bitquery: ~30 mil a ~52 mil tokens/dia em ago/set 2026), reconstruir 1 minuto de **todas** as pools de um único dia é inviável no grátis; o observatório precisa **filtrar** (ex.: só pools que passaram de um limiar de liquidez, ou só as que graduaram) antes de puxar velas.
- Birdeye Standard, SE valer o número do checkpoint (30.000 CUs/mês) ÷ 5 CU = **6.000 consultas pontuais/mês**, sujeitas a 1 rps.
- CoinGecko Demo (chave grátis) = 100/min e 10.000/mês, como alternativa.

**Dependência do resultado do teste do pool morto:** como o pool morto **continua disponível dentro de ~6 meses** (situação "a"), a arquitetura pode **reconstruir mortalidade retroativamente nessa janela**. MAS, como o corte de 6 meses é duro (HTTP 401 além disso), é **obrigatório iniciar coleta ao vivo desde já** para qualquer métrica que precise durar mais de 6 meses (ex.: tempo de vida médio medido ao longo de um ano).

**Riscos listados:**
1. **Janela grátis de ~6 meses** (GeckoTerminal e CoinGecko Demo): tudo mais antigo → 401.
2. **Limites que mudam:** os números valem hoje; a própria página da Birdeye mudou entre o checkpoint e agora.
3. **Divergências de docs:** GeckoTerminal (10 vs 30/min), Alchemy (25 req/s vs 300 CUPS) e Birdeye (3 endpoints vs 20+ no Standard).
4. **Histórico por pool / graduação:** o token muda de endereço de pool ao graduar; o histórico fica repartido em dois endereços, costurados pelo `migrated_destination_pool_address`. VERIFICADO que o campo existe; ainda **NÃO VERIFICADO** se o GeckoTerminal alguma vez funde as duas séries sozinho (assumir que NÃO e costurar manualmente).
5. **Dependência de terceiros sem API oficial do pump.fun:** se PumpPortal/GeckoTerminal mudarem regras, o fluxo ao vivo quebra.

---

## 9. NÃO VERIFICADOS

- **Birdeye para token morto:** retenção da vela de 1m; precisão do `historical_price_unix`; comportamento em token inativo. Motivo: exige X-API-KEY, não testado.
- **Número atual do Standard grátis da Birdeye:** a página de preços reformulada não exibe "30.000 CUs" de forma inequívoca; o valor do checkpoint pode ter mudado.
- **Fusão automática de histórico pós-graduação** no GeckoTerminal (dois endereços de pool).
- **Valores dos dashboards do Dune:** não carregaram por JavaScript na leitura automatizada; abrir manualmente.
- **Divergência interna do free da Alchemy:** 25 req/s vs 300 CUPS entre páginas.
- **PENDÊNCIA explícita, não aberta agora (a pedido):** **Moralis, Bitquery, Solana Tracker, Codex, Mobula** — todos aparecem em buscas como provedores com dados de pump.fun/preço, mas não foram verificados nesta rodada.

---

## 10. Fontes

- pump.fun/docs/bonding-curve — mecânica da curva e migração atômica para PumpSwap (página aberta, 11/09/2026)
- pumpportal.fun/data-api/real-time — `subscribeNewToken`/`subscribeMigration` marcados "(Free)" (página aberta, 11/09/2026)
- docs.chainstack.com/docs/solana-listening-to-pumpfun-migrations-to-raydium — programa PumpSwap, migração desde 20/03/2025 (só snippet, 11/09/2026)
- api.geckoterminal.com/api/v2/networks/solana/new_pools?page=1 — novas pools com dex/reserve/pool_created_at (testado ao vivo, 11/09/2026)
- api.geckoterminal.com/.../pools/8Q69.../ohlcv/minute — pool quase-morto devolve vela (testado ao vivo, 11/09/2026)
- api.geckoterminal.com/.../pools/HrnjV... — pool morto (reserve 0.0) ainda servido, com launchpad_details (testado ao vivo, 11/09/2026)
- api.geckoterminal.com/.../pools/Agmh.../ohlcv/minute — histórico de junho e 401 além de 6 meses (testado ao vivo, 11/09/2026)
- coingecko.com/en/api/pricing — Demo 100/min, 10.000/mês (página aberta, 11/09/2026)
- docs.coingecko.com/demo/reference/pool-ohlcv-contract-address — "cada chamada recupera no máximo 6 meses" (página aberta, checkpoint)
- data.birdeye.so/docs/.../pricing.md — Standard 30.000 CUs/mês, 1 rps (página aberta, checkpoint)
- birdeye.so/data-api/pricing — página reformulada: Lite $39/2,5M, Starter $99/8M, Premium $199/20M, Business $499/60M; "Standard (Free)" sem número (página aberta, 11/09/2026)
- data.birdeye.so/docs/data-api/price-ohlcv/get-defi-historical-price-unix.md — 5 CU, "near the requested unix timestamp", só Solana (página aberta, checkpoint)
- data.birdeye.so/docs/guides/data-accessibility-by-packages.md — token_security a partir do Lite (página aberta, checkpoint)
- docs.dexscreener.com/api/reference — 300/60 req/min, sem velas/histórico (página aberta, 11/09/2026)
- helius.dev/docs/billing/plans — Free 1M créditos/mês, 10 req/s, LaserStream WSS incluído (página aberta, 11/09/2026)
- quicknode.com/pricing e solanabox.tools/tools/quicknode — Free 10M créditos, 15 req/s, WSS (página aberta/só snippet, 11/09/2026)
- alchemy.com/pricing e /support/free-tier-details — 30M CU/mês grátis (páginas abertas, 11/09/2026)
- triton.one/pricing — sem tier grátis, depósito US$ 125 (página aberta/só snippet, 11/09/2026)
- docs.anza.xyz/operations/requirements — hardware do validador/nó RPC (página aberta, 11/09/2026)
- docs.anza.xyz/operations/prerequisites — "maioria das conexões domésticas não é adequada" (página aberta, 11/09/2026)
- api.rugcheck.xyz/swagger/index.html — endpoints de scan (aberta parcialmente; Swagger sem descrição legível, 11/09/2026); fluxrpc.com/rugcheck — "free plan allows up to 3 requests per second" (só snippet)
- Medium/Coinmonks (Bitquery), "Pump.fun API: How to Track Bonding Curves…", 02/09/2026 — faixa diária 30.663–52.438 lançamentos; coortes de graduação 2,60%–3,10% (só snippet)
- DEXTools, "Pump.fun in 2026", jun/2026 — graduação ~0,26% em meados de junho (só snippet)
- Kamat (2026), SSRN/arXiv, n=832.941 — graduação agregada 0,198% (IC 95% [0,189%, 0,208%]) (só snippet)
- Solidus Labs via CoinDesk, 07/05/2025 — 98,6% rug/pump-and-dump; 97 mil de 7 mi mantiveram ≥US$ 1.000 de liquidez (só snippet)
- Solana Compass — pico ~42.000 lançamentos/dia (maio/2026) (só snippet)
- dune.com/adam_tehc/pumpfun, dune.com/jondar/pumpfun, dune.com/queries/4861426/8051257, theblock.co/data/.../pump-fun-percent-graduated-tokens-daily — dashboards (links confirmados; The Block define graduação = market cap US$ 100k → Raydium; números por painel NÃO VERIFICADOS por JS, 11/09/2026)

---

## 11. Consultas de busca realizadas

- pump.fun new token detection API websocket
- pump.fun graduation bonding curve detect on-chain
- Helius free tier limits RPC websocket
- RugCheck API free tier documentation
- Dune dashboard pump.fun graduation rate daily tokens launched
- Solana validator hardware requirements RAM CPU official
- docs.anza.xyz validator requirements hardware
- QuickNode free plan credits limits Solana
- geckoterminal api tokens pools endpoint solana reserve_in_usd
- api.geckoterminal.com solana pools ohlcv minute
- Birdeye historical_price_unix data retention inactive tokens documentation
- Alchemy Solana free tier compute units limits
- Solana memecoin rug pull July 2026 token address liquidity removed
- Birdeye Standard free plan CU rate limit 30000 pricing page
- DexScreener API rate limit 60 300 requests per minute latest tokens
- Triton One Solana RPC free tier pricing
- (subagente) teste do pool morto no GeckoTerminal — múltiplas chamadas diretas à API pública (new_pools, pools/{addr}, ohlcv/minute com e sem before_timestamp e include_empty_intervals)

---

### Nota final de honestidade
Este documento afirma como **verificado** apenas o que foi aberto/testado nesta rodada ou no checkpoint anterior; corroborações de terceiros (blogs, matérias, papers) estão rotuladas como tais e usadas só como ordem de grandeza. Os itens da seção 9 permanecem em aberto de propósito — "NÃO VERIFICADO" é uma resposta válida, e preferível a preencher com estimativa. Nenhum passo aqui envolve operar, custodiar chave de carteira ou assinar transações; todo o fluxo proposto é de leitura de dados.