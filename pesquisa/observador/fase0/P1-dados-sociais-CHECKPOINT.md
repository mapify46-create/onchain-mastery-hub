CHECKPOINT — Preço do tier/modalidade mais barato da API do X que permite ler posts de contas específicas
Data de consulta: 11 de setembro de 2026.

RESPOSTA DIRETA
Hoje a API do X (a "ponte" oficial que deixa um programa buscar dados do X sem abrir o site no navegador) NÃO usa mais planos mensais fixos para quem se cadastra agora. O modelo atual é "pay-per-usage" (pague-pelo-uso: você compra créditos antecipadamente e cada requisição desconta um valor). Portanto não existe um "tier mais barato" fixo; existe um preço por unidade lida.

Para ler posts de uma conta específica (por exemplo, puxar a linha do tempo — "timeline" — de um @ pelo ID do usuário, ou buscar posts com "from:conta"), o preço copiado EXATAMENTE da página oficial é:
- "Posts: Read — $0.005 per resource" (ou seja, US$ 0,005 por post retornado na resposta).
Fonte oficial (página aberta): https://docs.x.com/x-api/getting-started/pricing — consultada em 11/09/2026.

EVIDÊNCIA DE QUE ISSO LIBERA LER POSTS DE CONTAS ESPECÍFICAS
O endpoint (o "ponto de acesso" da API) que devolve os posts de uma conta específica é GET /2/users/{id}/tweets — descrito na documentação oficial como "Retrieves a list of posts authored by a specific User by their ID" (recupera a lista de posts feitos por um usuário específico, pelo ID dele). Fonte oficial (página aberta): https://docs.x.com/x-api/users/get-posts — consultada em 11/09/2026. Cada post devolvido por esse endpoint é cobrado pela linha "Posts: Read — $0.005 per resource" da tabela de preços acima.

Atenção a uma pegadinha de preço: existe uma tarifa mais barata, "Owned Reads — $0.001 per resource" (US$ 0,001 por recurso), mas a própria página oficial diz que ela só vale para os SEUS próprios dados: "Owned Reads are requests made by your own developer app for your own data" e vale "when {id} matches the authenticated user and that user is the owner of the developer app". Ou seja, ler a timeline de OUTRA conta (que não é a sua) NÃO se enquadra nesse US$ 0,001 e cai no US$ 0,005 padrão. Fonte oficial (página aberta): https://docs.x.com/x-api/getting-started/pricing — consultada em 11/09/2026.

TIER GRATUITO (FREE) HOJE
Não há hoje um tier "Free" self-service (autoatendimento, em que você mesmo se cadastra sem aprovação manual) para novos desenvolvedores. A página oficial de onboarding leva direto ao modelo pago pay-per-usage e não lista nenhum tier Free. Fonte oficial (página aberta, via subagente): https://docs.x.com/x-api/getting-started/getting-access — consultada em 11/09/2026. A única gratuidade que resta é para "Public Utility Apps" (aplicativos de utilidade pública), que é aprovada manualmente, caso a caso — não é algo que se ativa sozinho. Um funcionário do X ("taycaldwell", conta com selo cinza) afirmou no fórum oficial que a análise "is manual review, case-by-case, per app". Fonte: https://devcommunity.x.com/t/question-about-for-good-public-utility-apps-eligibility-application-process-free-scaled-access/260640/4 (só snippet — a página do fórum bloqueia leitura automatizada, 11/09/2026). Conclusão: para ler posts de contas específicas, não há caminho gratuito hoje; paga-se US$ 0,005 por post lido. (Observação: ao migrar do antigo tier Free, o X deu um voucher único de US$ 10 — segundo terceiros como Zernio, "a one-time $10 credit voucher"; e novos cadastros teriam um crédito de teste de US$ 1 segundo a TwitterAPI.io. Ambos são fontes de terceiros, não a página oficial — NÃO VERIFICADO em fonte primária.)

MODELO DE COBRANÇA (não é mais por tiers fixos)
A página oficial diz textualmente: "The X API uses pay-per-usage pricing. No subscriptions—pay only for what you use." Você compra créditos no Developer Console e cada requisição desconta. A mesma página traz um teto: "Pay-per-usage plans are capped at 3 million Post reads per monthly billing cycle." (limite de 3 milhões de posts lidos por ciclo mensal de cobrança). Fonte oficial (página aberta): https://docs.x.com/x-api/getting-started/pricing — consultada em 11/09/2026.

DIVERGÊNCIA ENTRE FONTES
- Sobre o modelo: a página oficial (aberta) confirma pay-per-usage e o preço de US$ 0,005 por post lido. Artigos de terceiros repetem o mesmo número, mas o número aqui vem da página oficial aberta, não de snippet.
- Sobre o teto mensal de leitura: a página oficial (aberta) diz "3 million Post reads per monthly billing cycle". Vários artigos de terceiros dizem "2 milhões", com estas citações literais: Postproxy — "$0.005 per post read, capped at 2 million reads/month"; TwitterAPI.io — "Pay-per-use is hard-capped at 2,000,000 post-reads per month"; Sorsa (verificado em 31/07/2026) — "post reads cap at 2 million monthly"; TweetStream (verificado em 06/08/2026) — "caps pay-per-use at 2M reads per monthly billing cycle". Diferença de método: o teto de 3 milhões vem da página oficial lida hoje; o de 2 milhões vem de artigos de terceiros, possivelmente desatualizados. Prevalece o número oficial: 3 milhões.
- Sobre os antigos planos fixos: o valor "Basic $200/month" ainda aparece em muitos artigos, mas segundo esses mesmos artigos os planos Basic (US$ 200/mês) e Pro (US$ 5.000/mês) estão fechados para novos cadastros e em descontinuação. Datas citadas por terceiros: fechamento a novos cadastros em "February 6, 2026" (SocialCrawl); Basic migrado à força para pay-per-use "after June 1, 2026" e Pro anunciado como descontinuado "on August 14, 2026", com migração automática dos assinantes Pro restantes "after September 1, 2026" (Blotato). O Enterprise, segundo terceiros (Postproxy, TwitterAPI.io, Blotato), "starts around $42,000/month". Nada disso vem da página oficial de preços (que não lista mais esses tiers), então trato os valores e datas dos planos legados como NÃO VERIFICADO em fonte primária.

NÃO VERIFICADO
- Preço exato por endpoint no Developer Console: a página oficial diz que "Different endpoints have different costs. View current rates in the Developer Console" e que os preços podem mudar. O Console exige login, que não consigo abrir. Então, embora a tabela pública liste US$ 0,005 por post lido, o valor mostrado dentro do Console para a sua conta específica fica NÃO VERIFICADO.
- Data de vigência do preço: a página oficial não traz data de "última atualização" visível; o número US$ 0,005 é o que está publicado na página hoje (11/09/2026).
- Valores e datas dos planos legados (Basic US$ 200, Pro US$ 5.000, Enterprise ~US$ 42.000) e os vouchers de US$ 10 / US$ 1: só em fontes de terceiros — NÃO VERIFICADO em página oficial.

CONSULTAS DE BUSCA FEITAS
1. X API pricing tiers Basic Pro developer
2. developer.x.com products pricing
3. X API Basic tier $200 read posts user timeline
4. docs.x.com user posts timeline GET /2/users/:id/tweets
5. docs.x.com free access getting started public utility app
6. X API search recent from: account posts pay per use pricing
7. X API recent search from account pay per use rate limits

URLS ABERTAS (página aberta = conteúdo lido de fato)
- https://docs.x.com/x-api/getting-started/pricing (página aberta) — 11/09/2026
- https://developer.x.com/ (página aberta — só metadados; o painel de preços carrega por JavaScript) — 11/09/2026
- https://docs.x.com/x-api/users/get-posts (página aberta) — 11/09/2026
- https://docs.x.com/x-api/getting-started/getting-access (página aberta, via subagente) — 11/09/2026

URLS SÓ SNIPPET (não abertas / bloqueadas)
- https://devcommunity.x.com/t/question-about-for-good-public-utility-apps-eligibility-application-process-free-scaled-access/260640/4 (só snippet — fórum bloqueia leitura automatizada) — 11/09/2026
- https://devcommunity.x.com/t/announcing-the-launch-of-x-api-pay-per-use-pricing/256476 (só snippet) — 11/09/2026

Aguardo sua resposta antes de escrever o documento completo (itens A a D). Não emendei o documento aqui, conforme pedido.