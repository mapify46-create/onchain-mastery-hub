# Observatório de posts públicos: acesso programático a X e Telegram — Documento completo (Etapa 2 de 2)

Data de referência e de consulta: **11 de setembro de 2026**. Português do Brasil. Cada termo técnico é explicado na primeira vez que aparece, dentro da própria frase. Regra seguida: para todo número de preço, limite ou termo de uso, o número foi lido na página oficial; cada fonte está marcada como **(página aberta)** ou **(só snippet)**.

## TL;DR
- **X (Twitter):** o modelo hoje é "pague-pelo-uso" (paga só o que consome, sem mensalidade) a **US$ 0,005 por post lido** (página oficial aberta). Ler só os posts NOVOS de 30 contas que postam 10 vezes/dia (9.000 posts novos/mês) custa **US$ 45,00/mês** usando o filtro incremental `since_id` (confirmado na documentação oficial). O "filtered stream" (conexão aberta em que o X empurra os posts) EXISTE no pague-pelo-uso, com latência oficial de **~4–5 segundos (P99)**, e é o caminho mais barato para tempo real (~US$ 45/mês pelos mesmos 9.000 posts).
- **Follows (item 4):** NÃO dá para saber, pela API, quando uma conta de TERCEIRO (que você não controla) passa a seguir outra. O evento oficial de follow (`follow.follow`) só é entregue para contas que autorizaram seu app via OAuth. A única alternativa é tirar "fotografias" repetidas da lista `GET /2/users/{id}/following` (US$ 0,010 por recurso; 300 requisições a cada 15 minutos) e comparar — e essa lista NÃO traz data/hora do follow.
- **Telegram / J7 / ferramentas:** o **J7 Tracker existe** (j7tracker.io, página aberta) e é ferramenta de sniping/deploy de memecoin com "twitter tracker" embutido, não uma API de dados. Das ferramentas de terceiros que monitoram o X, **ScrapeBadger e Sorsa/TweetScout se autodeclaram scrapers** (seu critério de exclusão); TweetStream e 1322 dizem NÃO ser a API oficial mas não declaram o método; twitterapi.io promove os próprios "scrapers" Apify. No Telegram, um bot só lê um canal se for adicionado como **administrador**.

## Key Findings

1. **Preço oficial confirmado** (página aberta, docs.x.com/x-api/getting-started/pricing, 11/09/2026): "**Posts: Read — $0.005 per resource**". "User: Read" e "Following/Followers: Read" = **US$ 0,010** por recurso. "Like/Mute/Block: Read" = US$ 0,001. **Owned Reads** (dados da PRÓPRIA conta dona do app) = **US$ 0,001** por recurso.
2. **Divergência de teto, resolvida na fonte primária:** tanto a página de preços quanto a de billing (docs.x.com/x-api/fundamentals/post-cap, aberta) dizem hoje **"3 million Post reads per monthly billing cycle"**. Os "2 milhões" aparecem apenas em fontes de terceiros (getxapi.com, socialcrawl.dev, tweetstream.io) — NÃO confirmado em fonte primária hoje.
3. **`since_id` confirmado** (página aberta, docs.x.com/x-api/users/get-posts): o endpoint `GET /2/users/{id}/tweets` aceita `since_id`, `until_id`, `start_time`, `end_time`, `pagination_token` e `max_results` (mínimo 5, máximo 100). Com `since_id`, a API devolve só o que é novo — você não paga de novo pelos mesmos posts.
4. **Deduplicação de 24 horas** (página aberta): "All resources are deduplicated within a 24-hour UTC day window." Pedir o mesmo post de novo no mesmo dia UTC não gera cobrança nova. Isso derruba o medo de "pagar de novo a cada consulta".
5. **Cobrança só de resposta com dados** (página aberta): "Do failed requests count? No. Only successful responses that return data are billed." Uma consulta que devolve 0 posts novos não gera custo de leitura. Não há menção a mínimo por requisição — qualquer piso por requisição fica **NÃO VERIFICADO**.
6. **Filtered stream disponível no pague-pelo-uso** (página aberta, docs.x.com/x-api/posts/filtered-stream/introduction): a tabela "Access levels" tem coluna **Pay-per-use** (1.000 regras por projeto, 1.024 caracteres por regra, 1 conexão). Latência oficial: **"approximately 4-5 seconds of P99 latency"**.
7. **Follow de terceiros = não** (páginas abertas + fórum oficial de desenvolvedores): a Account Activity API antiga está "**being deprecated**" e a nova X Activity API (XAA) só entrega `follow.follow` mediante autorização OAuth do usuário-alvo.

## Details

### 1) TABELA — modalidades/tiers da API do X (o que existe HOJE)

Fonte primária de preço e teto: docs.x.com/x-api/getting-started/pricing e docs.x.com/x-api/fundamentals/post-cap (ambas **páginas abertas**, 11/09/2026).

| Modalidade | Preço | Leitura de posts (limite) | O que libera | Fonte |
|---|---|---|---|---|
| **Pay-per-usage** (padrão para novos cadastros) | Sem mensalidade; compra de créditos; **US$ 0,005/post lido**, US$ 0,010/usuário ou follower lido, US$ 0,001 owned reads; escrita US$ 0,015 (US$ 0,20 com URL) | Teto de **3 milhões de posts lidos por ciclo mensal**; acima disso, só Enterprise | Search, timelines, post lookup, **filtered stream**, XAA (webhooks/stream de eventos), listas, DMs próprias | **página aberta** |
| **Enterprise** | "Custom pricing" (contato comercial). A Blotato ("X (Twitter) API Pricing: Complete Guide for 2026", blotato.com) descreve: "X lists it as 'contact sales,' with reported entry points around **$42,000/month**", com aprovação seletiva e processo de vendas de várias semanas — **relato de terceiro, não fonte primária** | Rate limits e caps customizados | Firehose, PowerTrack, volume streams, full-archive, operadores semânticos (embedding), suporte dedicado | página aberta (docs.x.com/enterprise-api/introduction) + Blotato p/ o número |
| **Legados Basic e Pro** | Segundo a Blotato (blotato.com, corroboração de terceiro): **Basic (US$ 200/mês)** "subscribers were force-migrated to pay-per-use after June 1, 2026"; **Pro (US$ 5.000/mês)** foi anunciado como descontinuado em "August 14, 2026", com migração automática dos assinantes restantes "after September 1, 2026". Fechados para novos cadastros | — | — | **NÃO VERIFICADO em página de preço primária**; datas por Blotato |
| **Free self-service** | Não existe hoje para o público geral | — | Só "Public Utility Apps" (utilidade pública/for-good), aprovadas caso a caso | terceiros (postproxy.dev) — NÃO VERIFICADO em página primária |

Observação de método: a página de preços oficial lista **apenas** pague-pelo-uso e Enterprise. Não há tabela oficial pública hoje mostrando Basic/Pro/Free como planos self-service. Sobre os **vouchers**: a WeAreFounders (wearefounders.uk, terceiro) descreve "Legacy free tier users who were still active will move to pay-as-you-go and receive a one-time **$10 voucher**" e, na beta de novembro de 2025, "a **$500 voucher** to experiment" — permanecem **NÃO VERIFICADO** em fonte primária.

### 2) ACRÉSCIMO (1) — CONTA DE CUSTO CONCRETA

**Cenário (pressupostos declarados, não fatos verificados):** 30 contas públicas; cada uma posta em média 10 posts/dia; total 300 posts novos/dia; mês de 30 dias ⇒ **9.000 posts novos/mês**. Preço oficial: **US$ 0,005 por post lido** (página aberta).

**Confirmação do filtro incremental** (página aberta, docs.x.com/x-api/users/get-posts): a especificação oficial do endpoint `GET /2/users/{id}/tweets` traz o parâmetro `since_id` ("pattern `^[0-9]{1,19}$`") e o resumo "When both are provided, `since_id` must be less than `until_id`". Há também `start_time` ("The earliest UTC timestamp from which the Posts will be provided. The since_id parameter takes precedence if it is also specified."). Na prática: você guarda o ID do último post lido e, na consulta seguinte, passa `since_id=<esse ID>`; a API devolve só o que veio DEPOIS. Sem isso, cada consulta traria os mesmos posts recentes de novo.

**Cenário (a) — COM filtro incremental (`since_id`) funcionando:**
- Posts cobrados = só os novos = 9.000 por mês.
- Conta por extenso: **9.000 posts × US$ 0,005 = US$ 45,00 por mês**.
- Em reais: US$ 45,00 × R$ 5,0973 = **R$ 229,38** (cotação do dólar comercial 1 USD = **R$ 5,0973** na Investing.com, 11/09/2026, página aberta). Uma segunda fonte do mesmo dia (Mercado Hoje, manhã de 11/09/2026) trazia **R$ 5,118** na venda, o que daria **R$ 230,31**. Faixa **R$ 229–R$ 231**, conforme a hora do dia. As duas cotações divergem porque foram capturadas em momentos diferentes do pregão.

**Cenário (b) — SEM filtro incremental:**
Aqui o medo do usuário ("pagar de novo pelos mesmos posts a cada consulta") é atenuado por uma regra oficial: a **deduplicação de 24 horas** (página aberta): "If the same post is returned from multiple queries within a day, it only counts once for billing." Por mais que você repita a consulta no mesmo dia UTC, cada post é cobrado no máximo uma vez por dia.

- Pressupostos declarados: sem `since_id`, cada consulta pede os **10 posts mais recentes** (`max_results=10`, um pressuposto do cenário) de cada conta; você faz uma varredura das 30 contas de tempos em tempos.
- Com a dedup de 24h, o custo NÃO cresce com a frequência de consulta. Dentro de um dia, os ~10 posts de cada conta são cobrados uma vez ⇒ ~300 posts/dia ⇒ mesmos **US$ 45,00/mês**. O único excedente possível é o "carrego de virada de dia": um post publicado perto da meia-noite UTC pode ser relido no dia seguinte (nova janela de dedup) e cobrado de novo. No pior caso plausível, isso ~dobra o custo ⇒ faixa **US$ 45 a US$ 90/mês** (R$ 230 a R$ 460).
- **Para mostrar a armadilha (hipótese SEM dedup, que NÃO é o caso real):** se você pollasse cada conta a cada 60 segundos sem dedup, seriam 30 contas × 1.440 consultas/dia × 10 posts = 432.000 leituras/dia × 30 = ~12,96 milhões de leituras/mês. Isso (i) custaria ~US$ 64.800/mês e (ii) estouraria o teto de 3 milhões — mas a dedup de 24h oficial impede esse cenário. Conclusão: o `since_id` é recomendável por higiene, mas a dedup já protege o bolso.

**Custo/cobrança mínima por requisição:** a página de preços diz que leituras são cobradas "per resource returned" e "Only successful responses that return data are billed" (páginas abertas). Logo, uma requisição que devolve 0 posts novos não custa crédito de leitura. A página **não menciona** cobrança fixa por requisição além do custo por post ⇒ qualquer piso por requisição fica **NÃO VERIFICADO**.

### 3) ACRÉSCIMO (2) — TEMPO REAL: filtered stream vs polling, com número de segundos

**O filtered stream existe no pague-pelo-uso, e quanto custa.** A página oficial (docs.x.com/x-api/posts/filtered-stream/introduction, **aberta**) traz a tabela "Access levels" com a coluna **Pay-per-use: 1.000 regras por projeto, 1.024 caracteres por regra, 1 conexão**. O "filtered stream" é uma conexão aberta em que o X empurra os posts que batem com uma "regra" (filtro), em vez de você ficar perguntando. Latência oficial declarada: **"approximately 4-5 seconds of P99 latency"** (P99 = 99% dos posts chegam em até esse tempo). Cobrança (página de billing, aberta): "Each unique post delivered through filtered stream counts toward usage, subject to daily deduplication" ⇒ os mesmos 9.000 posts/mês = **US$ 45,00/mês**. Você monta uma regra como `from:conta1 OR from:conta2 OR ...`; cabem ~27 contas de ~10 caracteres em cada regra de 1.024 caracteres (relato de fórum oficial de desenvolvedores — corroboração fraca), então 30 contas cabem em 1–2 regras. Rate limit para conectar: `GET /2/tweets/search/stream` **50/15min**; a conexão fica aberta (até 250 posts/seg) (página de rate limits, aberta).

**Conclusão de tempo real:** o caminho mais barato E em tempo real é o próprio **filtered stream oficial** no pague-pelo-uso: **~4–5 segundos (P99)**, ~US$ 45/mês para o cenário, 1 conexão persistente. Não é preciso Enterprise para isso — ao contrário do que dizem vários blogs de terceiros (twitterapi.io, socialcrawl.dev), que afirmam que stream é só Pro/Enterprise; isso está **DESATUALIZADO** frente à página oficial de hoje, que mostra a coluna Pay-per-use.

**Se você preferir polling (ficar perguntando), a latência realista, com a conta:**
- Endpoint de timeline `GET /2/users/{id}/tweets`: rate limit oficial (página aberta) = **10.000 requisições/15min por app**. 15 min = 900 s ⇒ 10.000 ÷ 900 = 11,1 requisições/segundo. Para varrer 30 contas (30 requisições por rodada) ⇒ 10.000 ÷ 30 = 333 rodadas por 15 min ⇒ uma rodada a cada 900 ÷ 333 = **~2,7 segundos**. Latência média ≈ metade do intervalo ≈ **1,35 s**; pior caso ≈ **2,7 s** + tempo de resposta da API. Custo: com `since_id`, os mesmos US$ 45/mês.
- Alternativa com busca recente e operador `from:` combinando contas numa só consulta: `GET /2/tweets/search/recent` tem **512 caracteres de query** e rate limit **450/15min por app** (página aberta). Cabem ~27 contas por query ⇒ 30 contas = 2 queries por rodada ⇒ 450 ÷ 2 = 225 rodadas/15min ⇒ uma rodada a cada 900 ÷ 225 = **4 s**. Latência média ≈ **2 s**; pior caso ≈ **4 s**. Usa menos requisições, mas o teto de 450/15min o torna um pouco mais lento que varrer timelines.

Resumo: **polling chega a ~1,3 s de latência média (pior ~2,7 s)** pelo endpoint de timeline; o **stream oficial fica em ~4–5 s (P99)** mas é mais simples e não gasta o orçamento de requisições. Observação de método: a página oficial de rate limits não separa uma tabela "pay-per-use" — assume-se que os limites publicados valem para o pague-pelo-uso (a própria página diz "You can also see these limits in the Developer Console"). Se algum limite específico do pague-pelo-uso for diferente no seu Console, ele prevalece.

### 4) ACRÉSCIMO (3) — A PERGUNTA DOS FOLLOWS (item 4): dá para saber quando A passa a seguir B?

**Resposta direta: para contas de TERCEIROS (que você não controla), NÃO.** Duas formas possíveis e por que a primeira não serve:

**(a) "Receber o evento" (webhook/stream de follow).** A antiga Account Activity API (docs.x.com/x-api/account-activity/introduction, **aberta**) entrega `follow_events` com `source`, `target` e `created_timestamp` — MAS está marcada como **"being deprecated"** (em descontinuação) e, no pague-pelo-uso, permite só **3 assinaturas / 1 webhook**, sempre para contas "owned or subscribed" (que autorizaram). A nova X Activity API (docs.x.com/x-api/activity/introduction, **aberta**) lista `follow.follow`/`follow.unfollow`, mas para criar essa assinatura é preciso token de usuário via OAuth do alvo — confirmado por relato no fórum oficial de desenvolvedores ("OAuth user access token is required for this event type ... I'm using a pay-per-use plan, but I'm unable to create a Follow.follow subscription"). Ou seja: você só recebe eventos de follow de quem autorizou seu app. Para uma conta cripto grande que você apenas observa, **não há evento de follow**. A página de preços lista `follow.follow` a US$ 0,010 por evento — mas isso só se aplica quando você tem direito ao evento (conta autorizada).

**(b) "Descobrir por comparação de listas".** Existe `GET /2/users/{id}/following` (página de rate limits, aberta): custo **US$ 0,010 por recurso lido** (linha "Following/Followers: Read" na página de preços, aberta) e rate limit **300 requisições/15min**. Você tiraria "fotografias" repetidas da lista de quem a conta segue e compararia para achar o follow novo. Duas limitações graves, ambas de fonte primária:
- **Sem data/hora:** o objeto retornado não traz quando o follow aconteceu; você só vê a lista atual. A hora que você registraria seria a hora em que VOCÊ percebeu, não a do follow real.
- **Custo/latência ruins:** uma conta que segue 1.000 perfis custa 1.000 × US$ 0,010 = US$ 10 por "fotografia" completa; e o rate limit de 300/15min limita a frequência. Para 30 contas grandes, isso fica caro e lento.

**Diferença para leigo:** "receber o evento" é o Telegram te mandar um SMS na hora em que algo acontece; "descobrir por comparação" é você abrir a agenda de contatos da pessoa duas vezes por dia e reparar que apareceu um nome novo — sem saber a que horas ele foi adicionado.

**Frase pedida, com todas as letras e link:** *não existe, na API do X, evento de follow para contas de terceiros que você não controla; só é possível receber eventos de follow de contas que autorizaram seu app via OAuth (docs.x.com/x-api/activity/introduction e docs.x.com/x-api/account-activity/introduction, páginas abertas em 11/09/2026), e a única forma de detectar follows de terceiros é comparar listas de `GET /2/users/{id}/following`, que não traz data/hora.*

### 5) ACRÉSCIMO (4) — J7 Tracker (item 10) e ferramentas reais da categoria (item 11)

**J7 Tracker — VERIFICADO que existe** (página aberta, j7tracker.io, 11/09/2026). O site oficial se descreve como "The fastest tool for snipers — Sub-1ms server-side deploys. Social-media tracking under 200ms. Built for traders who can't afford to be a second late." Métricas exibidas: "50K+ Monthly Users", "1.35M+ Tokens Deployed", "$338M+ Total Volume". Palavras-chave do próprio site: "crypto, token deployer, solana, bnb, pump.fun, twitter tracker, crypto trading, meme coins". O acesso é por login/credenciais via Discord (discord.gg/j7tracker: "No account? Join discord.gg/j7tracker for free credentials"). É, portanto, uma ferramenta de **deploy/sniping de tokens com um "twitter tracker" embutido** para traders de memecoin — não uma API de dados de posts para terceiros. **NÃO VERIFICADO:** modelo de preço exato (o site não publica tabela; menciona credenciais grátis via Discord), se expõe API pública, e se o "twitter tracker" usa API oficial ou scraping. Corroboração fraca (vídeos de TikTok) associa o J7 a "narrativas" ao lado de Axiom e FOMO — tratada como fraca.
- **Nome parecido, provavelmente outra coisa (não confundir):** "J7 Twitter Tracker" descrito em techbuzr.com como ferramenta de analytics de marketing; e "Jaecoo J7" (um SUV). Apresentados aqui apenas para deixar claro que são coisas diferentes do j7tracker.io.

**Item 11 — Ferramentas REAIS da categoria em 2026 (descrição neutra, sem ranking, sem recomendação).** Marcação oficial/scraping conforme o que a própria fonte declara.

**Tracker de tweets / monitoramento de contas do X** (detalhado na tabela do item B6 abaixo): TweetStream, twitterapi.io, ScrapeBadger, 1322, Sorsa/TweetScout.

**Tracker de carteiras (wallet tracking on-chain):**
- **Nansen** (nansen.ai) — rotulagem de carteiras "smart money"; multichain. Preço primário (docs.nansen.ai, terceiro reportando página oficial): plano **Pro a US$ 49/mês (anual) ou US$ 69/mês (mensal)** após o redesign "Nansen 2", que colapsou os antigos Pioneer (US$ 99) e Professional (US$ 999+) em Free e Pro; API a "$10 for every 1,000 API credits" (academy.nansen.ai). Reconfirme na página oficial.
- **Arkham Intelligence** (arkham.com) — inteligência on-chain, rótulos de entidade e um **"KOL Label"**. Segundo a CoinDesk (coindesk.com, 08/03/2025): "Arkham Intelligence has introduced a new tagging system to track cryptocurrency transactions of Key Opinion Leaders (KOLs) with over 100,000 followers ... The new feature currently includes **950 addresses**, with notable figures such as Vitalik Buterin, Justin Sun, and U.S. President Donald Trump."
- **DeBank** (debank.com) — portfólio/atividade de carteiras EVM.
- **GMGN** (gmgn.ai) e **Padre** (padre.gg) — trackers de endereço/meme com alertas em tempo real (Solana), citados por KuCoin; corroboração fraca.

**Tracker de KOLs (key opinion leaders — influenciadores de cripto):**
- **Sorsa / TweetScout** (tweetscout.io / sorsa.io) — "TweetScout Score" de influência no cripto Twitter; tem API de desenvolvedor (ver item B6).
- **Kaito** (kaito.ai) — inteligência de atenção/menções de KOLs. Faixa de preço por OAK Research e blocmates (terceiros): tiers "Standard/Premium/Elite a **US$ 99, US$ 416 e US$ 833/mês**" (25% de desconto anual), hoje relatam só o tier Elite a US$ 833/mês. **NÃO VERIFICADO** em página primária.
- **Arkham KOL Label** — ver acima (lado on-chain do KOL).

### 6) TABELA — item B6: serviços de terceiros que monitoram contas do X (oficial vs scraping)

Critério do usuário: **scraping é critério de exclusão.** Marcação com base no que cada fornecedor declara no próprio site (verificado via fetch direto; **nenhum é produto oficial da X Corp** — todos trazem aviso "not affiliated with X Corp").

| Serviço | Oficial / Scraping (autodeclaração) | Preço declarado | Latência declarada | Fonte |
|---|---|---|---|---|
| **TweetStream** (tweetstream.io) | **Não é a API oficial**; monitor independente ("Is TweetStream the official X API? No"); NÃO usa a palavra "scraping" (método não declarado) | US$ 199/mês (entrada); Pro US$ 499; Scale US$ 750; Ultra a partir de US$ 1.500 | 156 ms mediano (p50, 7 dias) de detecção no servidor | **página aberta** (via subagente) |
| **twitterapi.io** | "alternativa" que "bypasses Twitter's approval"; promove os próprios **scrapers Apify** ⇒ efetivamente scraping | US$ 0,15 por 1.000 tweets; stream US$ 29–US$ 999/mês | <500 ms mediano (P50 251 ms / P90 327 ms); 80% <1 s | **página aberta** (via subagente) |
| **ScrapeBadger** (scrapebadger.com) | **SCRAPING — explícito** ("web scraping and data API", "your trusted web scraping partner") | ~US$ 5/conta/mês (Starter, créditos por volume); PAYG a partir de US$ 10 | Sub-segundo; WebSocket <50 ms da detecção; pode variar até ~10 s sob carga | **página aberta** (via subagente) |
| **1322** (1322.io) | "independent of the official Twitter API"; monitor "gerenciado"; método próprio não rotulado "scraping" | A partir de US$ 250/mês (100 contas) | 150–250 ms típico; lane "Ultimate" ~100 ms | **página aberta** (via subagente) |
| **Sorsa / TweetScout** (sorsa.io) | **SCRAPING — explícito** ("read-only REST API **and scraper**") | a partir de US$ 0,02 por 1.000 tweets | NÃO DECLARADA (é REST/scraper de request-resposta, não stream com ms) | **página aberta** (via subagente) |

Leitura para o seu caso: se scraping exclui, **ScrapeBadger, Sorsa/TweetScout e (na prática) twitterapi.io ficam de fora**. **TweetStream e 1322** não se autodeclaram scrapers, mas também **não confirmam** usar a API oficial — o método fica **NÃO VERIFICADO**, então, sob rigor, não podem ser marcados como "oficiais". O único caminho comprovadamente oficial é a própria **API oficial do X** (filtered stream / timelines no pague-pelo-uso).

### 7) ACRÉSCIMO (5) — TELEGRAM (itens 7, 8 e 9), com "(página aberta)" / "(só snippet)"

Aviso de método: as páginas do X eu abri por inteiro; as páginas do Telegram eu li **só por snippet** de busca nesta rodada (não abri a página completa). Marco cada uma como "(só snippet)". Os números vêm de páginas oficiais core.telegram.org, mas recomenda-se reconfirmar abrindo a página.

**Item 7 — Bot API: o que um bot lê num canal.**
- Num canal onde o bot **foi adicionado como administrador**: o bot recebe as mensagens do canal. Texto oficial (core.telegram.org/bots/features, **só snippet**): "All bots will also receive, regardless of privacy mode: ... All messages from channels where they are a member." E (core.telegram.org/bots/faq, **só snippet**): "Bot admins and bots with privacy mode disabled will receive all messages except messages sent by other bots." A FAQ oficial do Telegram (telegram.org/faq, **só snippet**) reforça: bots em grupos por padrão só veem mensagens destinadas a eles ("has no access to messages"); com o "privacy mode" (modo de privacidade — filtro que só entrega ao bot as mensagens explicitamente dirigidas a ele) desligado ou como admin, veem tudo ("has access to messages").
- Num canal onde o bot **NÃO foi adicionado**: o bot não recebe nada. Não há, na Bot API, forma de um bot ler um canal público em que não é membro/admin.
- Detalhe oficial: um bot **não** vê mensagens de outros bots ("bots will not be able to see messages from other bots regardless of mode" — core.telegram.org/bots/faq, só snippet).

**Item 8 — API de cliente (Telethon / MTProto): é permitida? há banimento?**
- É permitido criar clientes próprios, sob os Termos oficiais (core.telegram.org/api/terms, **só snippet**): "We welcome all developers to use our API and source code to create Telegram-like messaging applications on our platform free of charge ... all third-party client apps must comply with the following Terms of Service." Você precisa obter seu próprio `api_id` (core.telegram.org/api/obtaining_api_id, **só snippet**). ("MTProto" é o protocolo nativo do Telegram; "Telethon" é uma biblioteca Python que fala esse protocolo como se fosse um usuário — um "userbot".)
- Sobre banimento por uso automatizado — **fonte oficial, não fórum** (core.telegram.org/api/obtaining_api_id, **só snippet**): "Due to excessive abuse of the Telegram API, all accounts that log in using unofficial Telegram API clients are automatically put under observation to avoid violations of the Terms of Service." E: "all API client libraries are strictly monitored to prevent abuse." Se a conta for banida sem violação, o texto oficial orienta escrever para recover@telegram.org. Há ainda o erro oficial `API_ID_PUBLISHED_FLOOD` para quem usa o `api_id` de exemplo em produção.
- Fonte secundária (biblioteca de terceiros Telethon, docs.telethon.dev, **só snippet**), tratada como secundária: "Nobody knows the exact limits for all requests ... Telegram does not publish rate limits"; o erro de excesso é `FloodWaitError (420)`, que informa quantos segundos esperar. Relatos de banimento em fóruns/Reddit/StackOverflow existem, mas são **anedóticos e de baixa força probatória** — não os trato como fato.

**Item 9 — Limites de requisição de cada caminho.**
- **Bot API:** limite oficial de broadcast (core.telegram.org/bots/api e /bots/faq, **só snippet**): "By default, all bots are able to broadcast **up to 30 messages per second** to their users" e "no more than about 30 messages per second, unless they enable paid broadcasts". Regra prática amplamente citada (secundária): ~1 mensagem/segundo para o MESMO chat. Esses são limites de **envio**; um limite oficial numérico de **leitura** (getUpdates) não é publicado ⇒ **NÃO VERIFICADO**.
- **Cliente MTProto:** o Telegram **não publica** números de rate limit; o mecanismo oficial é o `FLOOD_WAIT` (erro 420) que informa quantos segundos aguardar. Números específicos (ex.: banimentos de 15–18 h relatados por uma biblioteca de flood de terceiros) são de terceiros ⇒ os limites exatos ficam **NÃO VERIFICADO** por decisão do próprio Telegram.

**Nota para o seu caso:** você quer observar **canais públicos**. Pela Bot API, isso exige ser admin do canal (o que o dono do canal precisa aceitar). Se o dono não aceitar, o único caminho é o cliente MTProto logado como usuário — que é permitido, mas coloca a conta "under observation" e sujeita a `FLOOD_WAIT`/banimento.

### 8) Itens A5 do briefing — termos de uso: coletar/armazenar posts públicos; o que é proibido

- **Armazenar posts públicos para análise pessoal:** o Acordo de Desenvolvedor do X (docs.x.com/developer-terms/agreement e developer.x.com/en/developer-terms/agreement-and-policy/source, **só snippet**) permite usar a API para desenvolvimento e pesquisa, mas **proíbe** "sell, rent, lease, sublicense, distribute, redistribute, syndicate, create derivative works of ... the Licensed Material to any third party" — ou seja, uso pessoal/estudo e armazenamento local para análise tende a caber, mas **redistribuir** os posts a terceiros é proibido. O I-framing (embutir conteúdo do X) é proibido de forma absoluta.
- **Scraping fora da API é proibido:** os Termos de Serviço do X (arquivo oficial cms-twdigitalassets.com, **só snippet**): "crawling or scraping the Services in any form, for any purpose without our prior written consent is expressly prohibited." Logo, coletar por fora da API (raspagem do site) é vedado — o que reforça usar a API oficial (que é o seu caminho).
- **Treino de IA:** a computeruser.com (terceiro — corroboração fraca) relata que o Acordo passou a **proibir** usar dados da API para "fine-tune or train a foundation or frontier model" — **NÃO VERIFICADO** em citação primária aqui. Como seu projeto é medição/paper trading sem redistribuição e sem treinar modelo de fundação, o uso descrito tende a ser compatível, mas a leitura final do texto legal é responsabilidade sua.

### 9) LISTA DE NÃO VERIFICADOS
1. Teto de "2 milhões" de posts/mês: aparece só em terceiros; a fonte primária (duas páginas) diz **3 milhões**.
2. Preços dos planos legados Basic (US$ 200) e Pro (US$ 5.000) e o Enterprise ~US$ 42.000/mês: só terceiros (Blotato); não há página de preço oficial hoje que os liste como self-service.
3. Vouchers de US$ 10 / US$ 500 (beta): só terceiros (WeAreFounders).
4. Existência de piso/cobrança mínima por requisição (além do custo por post): a página de preços não menciona ⇒ não verificado.
5. Modelo de preço exato do J7 Tracker, se tem API pública e se seu "twitter tracker" é oficial ou scraping.
6. Método de coleta do TweetStream e do 1322 (não declaram oficial nem scraping).
7. Preços primários de Nansen (US$ 49–69/mês por doc reportada) e Kaito (US$ 99–833/mês por terceiros) — reconfirmar na página oficial.
8. Limite numérico oficial de **leitura** da Bot API (getUpdates) e limites exatos do MTProto: o Telegram não publica.
9. Todas as páginas do Telegram foram lidas **só por snippet** nesta rodada (não abertas por inteiro) — recomenda-se reabrir para reconfirmar as citações.
10. Proibição de treino de IA no Acordo do X: citada por terceiro (computeruser.com), não por trecho primário aqui.

### 10) FONTES (link + data + status)

**Páginas abertas (lidas por inteiro), 11/09/2026:**
- docs.x.com/x-api/getting-started/pricing — preços, teto 3M, dedup 24h, owned reads, tabela de webhooks
- docs.x.com/x-api/users/get-posts — `since_id`, `until_id`, `start_time`, `max_results` (5–100)
- docs.x.com/x-api/fundamentals/post-cap — teto 3M, dedup, "only successful responses billed"
- docs.x.com/x-api/posts/filtered-stream/introduction — coluna Pay-per-use, 4–5 s P99, regras
- docs.x.com/x-api/fundamentals/rate-limits — timeline 10.000/15min, recent search 450/15min (512 chars), stream 50/15min, following 300/15min
- docs.x.com/x-api/account-activity/introduction — deprecação; follow_events; 3 assinaturas no pay-per-use
- docs.x.com/x-api/activity/introduction — XAA; follow.follow; eventos públicos vs privados
- j7tracker.io (via TinyFish) — descrição, métricas, credenciais via Discord
- Sites dos 5 serviços de terceiros (via subagente, fetch direto): tweetstream.io, twitterapi.io, scrapebadger.com, 1322.io, sorsa.io/tweetscout.io

**Só snippet (não abertas por inteiro):**
- core.telegram.org/bots/features, /bots/faq, /bots/api — privacy mode, canais, broadcast 30/s
- telegram.org/faq — "has access to messages"
- core.telegram.org/api/terms, /api/obtaining_api_id — permissão + observação/monitoramento de clientes não oficiais
- docs.telethon.dev — `FLOOD_WAIT`; "Telegram does not publish rate limits" (fonte secundária)
- docs.x.com/developer-terms/agreement e developer.x.com/.../agreement-and-policy/source — redistribuição proibida
- cms-twdigitalassets.com Terms of Service — scraping proibido
- Investing.com (R$ 5,0973) e Mercado Hoje (R$ 5,118) — cotação USD/BRL 11/09/2026
- Terceiros de preço/histórico (blotato.com, getxapi.com, socialcrawl.dev, postproxy.dev, wearefounders.uk, coindesk.com, academy.nansen.ai, oakresearch.io) — corroboração fraca/relato

**Consultas de busca feitas:** J7 Tracker memecoin twitter; docs.x.com pricing pay-per-usage; docs.x.com users get posts since_id; docs.x.com filtered stream pricing; docs.x.com rate-limits users tweets; Account Activity follow events; X developer agreement scraping redistribution; docs.x.com activity XAA follow; core.telegram.org bots FAQ privacy mode; core.telegram.org api terms; Telethon FLOOD_WAIT limits; third-party X monitoring official vs scraping; crypto KOL/wallet/tweet trackers 2026; cotação dólar real 11/09/2026; "J7" tracker axiom; TweetStream official or scraping; tweetscout twitterapi.io scraping; Telegram broadcast 30 messages per second.

## Recommendations
1. **Comece pelo filtered stream oficial no pague-pelo-uso.** É o caminho mais barato E em tempo real: ~US$ 45/mês para 9.000 posts, latência ~4–5 s (P99), 1 conexão, 30 contas em 1–2 regras `from:`. Configure um **spending limit** (limite de gasto) no Developer Console para travar em, digamos, US$ 60/mês, evitando surpresas.
2. **Se quiser latência menor que o stream (abaixo de ~3 s), use polling de timelines com `since_id`** (varredura das 30 contas a cada ~2,7 s, latência média ~1,3 s). Mesmo custo (~US$ 45/mês). Só vale o esforço extra se cada segundo importar para o seu estudo.
3. **Abandone a ideia de detectar follows de terceiros.** Não há evento oficial; a comparação de listas é cara (US$ 0,010/recurso), limitada (300/15min) e sem data/hora. Se follow for essencial, registre-o manualmente ou aceite que só terá "hora em que percebi", não "hora do follow".
4. **Evite qualquer ferramenta que se autodeclare scraper** (ScrapeBadger, Sorsa/TweetScout e, na prática, twitterapi.io) — batem no seu critério de exclusão. TweetStream/1322 são mais rápidos que a API oficial, mas como não confirmam ser oficiais, trate-os como "método não verificado".
5. **Telegram:** para canais públicos, o caminho limpo é um **bot adicionado como admin** ao canal (Bot API), que respeita os Termos. Só considere cliente MTProto/Telethon se o bot não for aceito, ciente de que a conta fica "under observation" e sujeita a `FLOOD_WAIT`/banimento — e que o Telegram não publica os limites.
6. **Gatilhos (thresholds) que mudam a recomendação:** se seu volume passar de ~600.000 posts/mês (≈ US$ 3.000/mês) ou você se aproximar do teto de 3 milhões, reavalie Enterprise ou reduza contas. Se o custo por post (US$ 0,005) ou o teto (3M) mudarem na página oficial, refaça a conta — a própria página avisa "Prices are subject to change".

## Caveats
- Preços e limites do X mudam com frequência; tudo aqui foi lido da página oficial em 11/09/2026, mas confirme no Developer Console antes de construir.
- As citações do Telegram nesta rodada vieram **só de snippet**; reabra as páginas core.telegram.org para reconfirmar antes de depender delas.
- Os pressupostos das contas de custo/latência (10 posts/dia, max_results=10, 30 contas, mês de 30 dias, ~27 handles por regra) são **pressupostos do cenário**, não fatos verificados; a aritmética muda se esses números mudarem.
- Cotação do dólar é intradiária; usei duas fontes do mesmo dia (R$ 5,0973 e R$ 5,118).
- Nenhuma ferramenta é recomendada; as descrições são neutras e a marcação oficial/scraping reflete o que cada fornecedor declara no próprio site.
- Preços de Nansen e Kaito vêm de fontes de terceiros que citam páginas oficiais; reconfirme no site do fornecedor antes de decidir.