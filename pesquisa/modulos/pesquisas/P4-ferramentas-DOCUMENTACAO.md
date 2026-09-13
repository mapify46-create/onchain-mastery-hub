# Guia de documentação oficial — 4 ferramentas gratuitas de checagem de token na rede Solana (BONK)

**Data de referência:** sábado, 12 de setembro de 2026 · Fuso: America/Sao_Paulo · Fontes acessadas em setembro de 2026 (levantamento das fontes oficiais do RugCheck em 13/09/2026).
**Token de exemplo:** BONK — endereço de mint `DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263`.

Termos básicos (explicados na primeira aparição): *mint* = emissão/criação de tokens; *mint address* = endereço do contrato do token na Solana; *holder* = carteira que possui o token; *LP* (liquidity pool) = pool/reserva de liquidez onde o token é negociado; *FDV* = valor totalmente diluído; *DEX* = corretora descentralizada; *authority* = "autoridade"/permissão sobre o token; *supply* = quantidade total de tokens.

Marcação usada: **(documentação)** = definição vinda de documentação oficial da própria ferramenta; **(protocolo)** = definição oficial da Solana/Metaplex, não da ferramenta; **(visto na tela em 12/09/2026)** = observado ao vivo na fase 1 (só Bubblemaps); **(raciocínio)** = explicação lógica/aritmética, não documentação; **"sem definição oficial"** = a ferramenta não define o campo (resposta válida e obrigatória).

Entrega uma ferramenta inteira por vez, na ordem RugCheck → Solscan → Bubblemaps → DexScreener. Documento neutro: não recomenda ferramenta nem token.

---

## 1. RugCheck (rugcheck.xyz)

**Observação importante sobre as fontes.** O RugCheck **não possui um site de documentação/central de ajuda em prosa** (não foi encontrado um `docs.rugcheck.xyz`). A única "documentação" oficial é a **referência de API interativa (Swagger)** em `https://api.rugcheck.xyz/swagger/index.html` (schema em `https://api.rugcheck.xyz/swagger/doc.json`), complementada por artigos publicados no perfil oficial no X, @Rugcheckxyz. O site rugcheck.xyz é um aplicativo em JavaScript (SPA), e o corpo da página não é legível sem JavaScript ("We're sorry but degen_market_check doesn't work properly without JavaScript enabled"), então parte dos rótulos de tela é documentada via a API oficial e o X oficial — não pelo corpo do site. **(documentação — acesso 13/09/2026)**

**Rede "Fogo".** O título da aba "RugCheck — Solana & Fogo Token Risk Scanner" está confirmado no próprio site: a meta-descrição oficial diz "Scan Solana and Fogo tokens for scam signals, holder concentration, liquidity risks, insider activity, and token metadata." Ou seja, o RugCheck cobre oficialmente **Solana e Fogo**. **(documentação — rugcheck.xyz/about)**

### Tabela: campo na tela → o que significa (documentação) → link oficial

| Campo na tela | O que significa (documentação) | Link oficial |
|---|---|---|
| **Score** (ex.: "GOOD") | Pontuação de risco. O RugCheck descreve dois componentes: um **SCORE numérico dinâmico** e **WARNINGS** (avisos) separados; o score "se move com o mercado depois que a negociação começa". Rótulos de texto: **Good / Warning / Danger**. No schema de API cada relatório traz `score` e `score_normalised` (inteiros) e um array `risks`, em que cada risco tem `name`, `description`, `level` (ex.: "danger", "warn") e `score` em pontos. **Score numérico maior = risco maior** (o parâmetro `maxScore` é descrito como "Filter out tokens with a risk score above this value"). | api.rugcheck.xyz/swagger/doc.json · x.com/Rugcheckxyz/status/1761039613500530713 |
| **Risks** (riscos) | Lista dos itens de risco individuais que dispararam; cada item tem nome, descrição, nível e pontuação. O RugCheck orienta "sempre considerar o SCORE e os WARNINGS". | x.com/Rugcheckxyz/status/1761039613500530713 |
| **Markets** (mercados) | Os pares/pools de negociação do token em DEXs; a API expõe dados de mercado e liquidez do token. | api.rugcheck.xyz/swagger/doc.json |
| **Insiders** (ex.: "2 networks") | Redes de "insiders" — contas conectadas cujo comportamento "só faz sentido econômico se tratadas como controladas por uma única pessoa ou grupo". Uma "network" se forma por financiamento comum + transferências coordenadas (Transfer/XFER Network) ou por compra/venda entre si em alta frequência (Swap Network / wash trading). | x.com/Rugcheckxyz/status/1900552758064714218 |
| **Holders** (detentores) | Distribuição de quem detém o token (concentração dos maiores holders); aparece como itens de risco quando a concentração é alta. | api.rugcheck.xyz/swagger/doc.json |
| **Lockers & LP** | Informação sobre liquidez e travas de LP. LP travada/queimada indica que a liquidez não pode ser retirada. A consulta de lockers usa o endpoint `/v1/tokens/{id}/lockers`, que **exige chave de API**. | api.rugcheck.xyz/swagger/doc.json |

### Perguntas específicas

**(a) Como o score é calculado (documentação).** O RugCheck oferece "scoring dinâmico em todos os tokens da Solana; o score dá uma visão geral do perfil de risco e se move com o mercado depois que a negociação começa" e, além do score, fornece "warnings" **(documentação — x.com/Rugcheckxyz/status/1761039613500530713)**. O schema de API mostra que o score agregado é um inteiro construído a partir de itens de risco individuais, cada um com seu próprio `level` e `score` em pontos **(documentação — api.rugcheck.xyz/swagger/doc.json)**. **A fórmula exata, os pesos por risco e os limiares numéricos que separam Good/Warning/Danger NÃO são publicados oficialmente** — o Swagger expõe apenas os campos, não a fórmula: **sem definição oficial** para a fórmula/pesos/limiares. (Tabelas de 0–100 que circulam na web vêm de terceiros e não são documentação oficial do RugCheck.)

**(b) O que o score NÃO cobre.** Não há um documento oficial do RugCheck que liste explicitamente as limitações do score: **sem definição oficial** para os limites declarados. Por natureza **(raciocínio, não documentação):** o score é on-chain e de um instante ("point-in-time"), muda com o mercado, e não avalia identidade da equipe, intenção, marketing, roadmap nem eventos futuros; um item de risco pode ter uso legítimo (o próprio RugCheck diz que "há casos de uso legítimos para cada item de risco").

**(c) Campo/flag "rugged".** O RugCheck **não publica uma definição em prosa** do booleano "rugged". O conceito aparece operacionalmente na API de estatísticas: contagens de `rugPullCount`, `avgTimeToRugMinutes`, `rugMarketCapUSD` e `rugLiquidityPulledUSD`, além de um feed ao vivo `/v1/stats/rugs/stream` ("pushes each new rug event as it is detected") **(documentação — api.rugcheck.xyz/swagger/doc.json)**. A condição exata que liga o flag "rugged": **sem definição oficial**.

**(d) Grafo/rede de "Insiders" (documentação).** Segundo o artigo oficial "Eyes on the Inside: RugCheck's New Insider Network Analysis Tool" **(documentação — x.com/Rugcheckxyz/status/1900552758064714218):**
- **Premissa:** "procuramos transações que não são racionais... maneiras de conectar essas transações em uma 'network' de contas... essas redes só fazem sentido econômico se tratadas como pertencentes a uma única pessoa ou grupo ('insiders')".
- **Transfer (XFER) Network:** o criador emite/compra barato de si mesmo em outra conta e transfere para muitas contas, direta ou por intermediários (o RugCheck afirma detectar ambos) — cria a "ilusão" de distribuição saudável.
- **Swap Network:** rede de traders automatizados financiados centralmente que compram e vendem entre si em alta frequência em várias DEXs (wash trading).
- **O que ele NÃO prova:** o próprio RugCheck orienta que "é normal existirem redes muito pequenas em tokens populares"; para um "fair launch" recente deveria haver zero transfer networks; swap networks preocupam "quando representam a maioria das contas negociando o token". As contas linkam para um explorador de blocos para o usuário confirmar por conta própria. Ou seja, a rede **sinaliza coordenação/controle comum como hipótese verificável, não como prova de fraude. (documentação)**

**(e) Cadastro, chave de API e pagamento (documentação).**
- **Página do token no site:** gratuita, sem cadastro/carteira/pagamento — "Just drop the token address for a FREE risk analysis in seconds" **(documentação — x.com/Rugcheckxyz/status/1793356153088610600)**. Exceção: votar em "trending" exige carteira conectada ("Only users who have connected their wallet are able to vote") **(documentação — Swagger)**.
- **API de leitura:** os endpoints centrais de relatório são **públicos**, sem exigência de `ApiKeyAuth` no schema — ex.: `/v1/tokens/{id}/report`, `/report/summary`, `/insiders/graph`, `/insiders/networks`, `/search` **(documentação — api.rugcheck.xyz/swagger/doc.json)**.
- **O que muda no pago:** alguns recursos exigem chave (JWT no header `Authorization`) e/ou plano pago — ex.: o parâmetro `refresh` ("Force report regeneration (paid API keys only)") e `GET /v1/tokens/verified` que retorna 401 "Paid-plan API key required"; há limite de taxa (429 "Rate limit exceeded"). Endpoints como `bulk`, `lockers`, `verify` e `vote` exigem chave. **(documentação — api.rugcheck.xyz/swagger/doc.json)** (Nota: o Swagger oficial especifica o header `Authorization`/JWT; guias de terceiros que citam `X-API-KEY` divergem do schema oficial.)

**(f) O que a ferramenta não mostra (limites declarados).** Não há documento oficial listando limitações: **sem definição oficial**. Nota de fonte **(documentação — Swagger):** o campo `verified` cobre "apenas a verificação própria do RugCheck; tokens marcados como verificados por registro externo não entram nessa lista".

**(g) Notação de preços muito pequenos (zeros compactados).** **Sem definição oficial** — nenhuma fonte oficial do RugCheck documenta notação de subscrito/compactação de zeros; o schema guarda valores como número puro, sem especificação de exibição. **(documentação — api.rugcheck.xyz/swagger/doc.json)**

**Status "Verified" (documentação).** Significa "tokens que passaram pela revisão de verificação própria do RugCheck e cuja verificação ainda está ativa" — sai da lista quando revogada; cobre só a verificação própria do RugCheck **(documentação — Swagger `/v1/tokens/verified`)**. O mecanismo usa domínios `.token` em parceria com AllDomains, via transação assinada pela equipe do token **(documentação — x.com/rugcheckxyz)**. A iconografia exata do selo na tela: **sem definição oficial** além do conceito.

---

## 2. Solscan (solscan.io)

Fonte principal: guia oficial "Exploring Token Details page" (info.solscan.io, publicado 25/09/2024, atualizado 21/06/2026) e docs.solscan.io. Conceitos de protocolo complementados por solana.com/docs e developers.metaplex.com, sempre marcando que a definição é do protocolo, não da ferramenta.

### Tabela: campo na tela → o que significa (documentação) → link oficial

| Campo na tela | O que significa (documentação) | Link oficial |
|---|---|---|
| **Authority** | "O endereço de carteira que detém a **Update - Mint - Freeze Authority** será listado no menu suspenso. Se a autoridade foi revogada, mostra 'N/A'." Ou seja, é um dropdown que agrega as três autoridades. | info.solscan.io/exploring-token-details-page |
| **Creator** (criador) | "A carteira associada à criação do token e o hash da transação." | info.solscan.io/exploring-token-details-page |
| **Token Extensions** | "Indica se o token tem token extensions ou não." (Token Extensions/Token-2022 = recursos adicionais de tokens; conceito de protocolo.) | info.solscan.io/exploring-token-details-page |
| **Owner Program** | "O programa padrão de token usado para criar o token." (ex.: Token Program clássico ou Token-2022.) | info.solscan.io/exploring-token-details-page |
| **First Mint** | "Exibe o timestamp e o hash da primeira emissão, indicando quando o token foi inicialmente emitido on-chain." | info.solscan.io/exploring-token-details-page |
| **Decimals** | "Número de casas decimais que o token pode ter." | info.solscan.io/exploring-token-details-page |
| **Holders** | "O número de endereços de carteira que detêm o token." | info.solscan.io/exploring-token-details-page |
| **Market Cap** | "O Market Cap com base no preço atual, totalmente diluído." | info.solscan.io/exploring-token-details-page |
| **Current Supply** | "Número de tokens ativamente em circulação e disponíveis no mercado aberto." | info.solscan.io/exploring-token-details-page |

### Abas (aba → o que lista, documentação — info.solscan.io/exploring-token-details-page)

- **Transfers**: "Todos os eventos de transferência do token em ordem cronológica a partir do mais recente. Transação parseada pela equipe Solscan. Info básica: Hora, tipo de ação, carteiras From e To, valor da mudança."
- **Transactions**: "Todas as transações do token buscadas on-chain em tempo real."
- **Activities**: "As atividades de negociação do token nas principais plataformas DeFi da Solana."
- **Holders**: "Lista de todas as carteiras que detêm o token, em ordem do maior holder."
- **Analytics**: "Painel de estatísticas com valor de transferência, valor negociado em DEX, distribuição de holders e gráfico histórico de preço."
- **Metadata**: "Metadados do token em JSON e tabela; Extensions para tokens com extensões."
- **Markets**: "Todos os pares de negociação do token nas principais DEXes da Solana."

**Primeiras transações do token.** O Solscan documenta que a aba Transfers vem "em ordem cronológica a partir do mais recente"; a interface oferece controle de ordenação ("Oldest First"/mais antigas primeiro) e filtros avançados; filtro por intervalo de tempo é documentado na API (`block_time[]`). **(documentação — info.solscan.io/exploring-token-details-page; docs.solscan.io)**

**Quanto o criador comprou.** O Solscan **não documenta** um campo direto "quanto o criador comprou": **sem definição oficial**. Caminho de protocolo **(raciocínio + protocolo):** identifica-se a carteira em "Creator" e examinam-se as primeiras Activities/Transfers do token — isso é leitura on-chain **(solana.com/docs)**.

### ARMADILHA 1 — o campo "Authority" do BONK

No BONK, o campo "Authority" mostra um endereço (`9AhKqLR67hwapvG8SA2JFXaCshXc9nALJjpKaHZrsbkw`, igual ao "Creator"), mas na blockchain a mint authority e a freeze authority do BONK são **nulas (revogadas)**. O que esse campo representa?

Definições de protocolo (não da ferramenta):
- **Mint authority** = quem pode **emitir mais tokens**; se `null`, é permanentemente revogada. **(protocolo — solana.com/docs/tokens/basics/set-authority; solana.com/docs/tokens/basics)**
- **Freeze authority** = quem pode **congelar contas de token** (bloquear transferências/queimas). **(protocolo — solana.com/docs/tokens/basics/freeze-account)**
- **Update authority** (metadados Metaplex) = quem pode **alterar nome/símbolo/URI/imagem**, desde que "Is Mutable" = true. **(protocolo — developers.metaplex.com/smart-contracts/token-metadata/update)**

O guia oficial do Solscan diz que "Authority" lista, num dropdown, a Update–Mint–Freeze Authority, e mostra "N/A" quando revogada **(documentação — info.solscan.io/exploring-token-details-page)**. Portanto, quando aparece um endereço mas mint/freeze estão revogadas, o endereço remanescente é a **update authority dos metadados** (Metaplex), distinta de mint e freeze — a correspondência específica ao caso BONK é **inferência (raciocínio)**, coerente com a documentação. Um endereço em "Authority" **não** significa que o criador ainda pode emitir tokens: a emissão depende da **mint authority especificamente**, que pode estar nula mesmo com a update authority ativa **(raciocínio + protocolo)**.

**Onde aparecem de fato mint e freeze authority no Solscan.** O guia oficial só descreve o dropdown agregado "Authority" (Update–Mint–Freeze) e a aba Metadata; **não há documentação oficial** de um campo separado rotulado isoladamente "mint authority"/"freeze authority" na tela: **sem definição oficial** para o local exato de cada uma. Verificação alternativa **(protocolo):** ler a mint account na própria Solana, onde `mintAuthority` e `freezeAuthority` aparecem `null` quando revogados **(solana.com/docs/tokens/basics)**.

**Cadastro/chave/pagamento e limites (documentação).** O Solscan é um explorador de **leitura**; o guia da página do token não exige login para consulta. Recursos de conta (labels pessoais, watchlist) exigem conta **(docs.solscan.io)**. A Pro API tem planos, chave e limites de taxa por endpoint documentados **(docs.solscan.io/api-access)**. Limite declarado: o preço só aparece se o token estiver listado no CoinGecko ("For a token price to show, we require the token to be listed on Coingecko") **(documentação — info.solscan.io/exploring-token-details-page)**.

---

## 3. Bubblemaps (bubblemaps.io)

Fonte oficial: Bubblemaps Wiki (wiki.bubblemaps.io) e blog oficial. Dados de tela da fase 1 marcados "(visto na tela em 12/09/2026)".

**Visto na tela em 12/09/2026 (fase 1):** o mapa do BONK renderizou com clusters e carteiras rotuladas de exchanges; cabeçalho "BONK / Bonk / 3y"; redirecionamento para `v2.bubblemaps.io/map?address=...&chain=solana`; botões "Search tokens" e "Login".

### Como se lê o mapa (documentação — wiki.bubblemaps.io/bubblemaps-v2/how-does-it-work)

- **Bolha (bubble):** cada bolha é um holder atual; por padrão o mapa mostra os **250 maiores holders**; quanto maior a bolha, mais tokens detém. Bolhas de contratos/exchanges ficam **ocultas por padrão** (foco em holders genuínos), reveláveis pelo botão de olho.
- **Link (linha entre bolhas):** "Se duas bolhas estão ligadas, significa que houve uma **transferência on-chain** entre esses holders. Na V2 essas transferências podem envolver qualquer token e, em alguns casos, até cross-chain." Clicando em IN/OUT vê-se detalhes, tokens transferidos e datas.
- **Cluster:** conjunto de bolhas conectadas que se enviaram fundos entre si. O próprio wiki coloca a pergunta-chave "por quê?" (empregador pagando empregado, VC recebendo tokens, alguém cobrindo rastros) — o cluster **levanta a hipótese, não a conclusão**.
- **Percentuais / detalhes da carteira:** ao clicar numa bolha, abre-se % do supply, quantidade de tokens e valor em US$; se pertence a cluster, mostra dados agregados do cluster.
- **Tipos de nó / rótulos:** Holder, Magic Node, Time Node, Manually Added; tipo de carteira EOA/Contract/CEX/DEX; tags Fresh/Supernode/Transfers. Os rótulos de exchange (CEX/DEX) vêm da própria classificação do Bubblemaps das carteiras.
- **Data do mapa:** garantido atualizado nas últimas **6 horas**; a hora exata do último cálculo aparece na "top island".

**Tamanho da bolha e percentuais.** O tamanho reflete a quantidade de tokens do holder; ao clicar, mostra-se % do supply, quantidade e valor em US$. **(documentação — idem)**

**Mesmo financiador vs. apenas negociaram entre si.** A documentação define link como transferência on-chain entre holders; o recurso **Magic Nodes** revela conexões indiretas via intermediários não-holders (ex.: vários holders recebendo gás do mesmo endereço externo, ou enviando ao mesmo endereço de depósito) **(documentação — wiki.bubblemaps.io/bubblemaps-v2/magic-nodes)**. Uma distinção formal e rotulada entre "mesmo financiador" e "só negociaram entre si" como categorias separadas não é dada além disso: parcialmente **sem definição oficial**.

**Bolhas conectadas provam coordenação?** **Não.** A documentação enquadra clusters como padrões "que podem revelar" algo "que vale investigar" e coloca a pergunta "por quê?" — **sugere, não prova. (documentação — wiki.bubblemaps.io/bubblemaps-v2/how-does-it-work)**

**Intel Desk (documentação).** Plataforma de investigações movida pela comunidade: usuários submetem casos, votam prioridades e os achados são públicos; a participação (submeter/votar) é ligada ao token BMT. **(documentação — wiki.bubblemaps.io/)**

### PERGUNTA CENTRAL — gratuito vs. exige o token BMT (documentação)

O Bubblemaps V2 é gratuito: "Decidimos tornar o Bubblemaps V2 gratuito... Recursos como Magic Nodes, Time Travel e dados em tempo real ficarão abertos a todos sem restrições." **(documentação — wiki.bubblemaps.io/bubblemaps-v2/premium)**

**Exigem posse do token BMT (documentação — idem):**
- **P&L computation** (cálculo de lucro/prejuízo)
- **Cross-chain analytics** (análise entre redes)
- **AI models to interpret clusters** (IA para interpretar clusters)
- **Bubble Maps com os top 1.000 holders**

O **Intel Desk** (submeter/votar) também é ligado ao BMT **(documentação — wiki.bubblemaps.io/)**. **Magic Nodes, Time Travel e dados em tempo real são gratuitos (documentação — premium).** A quantidade exata de BMT por recurso **não é especificada** nessas páginas: **sem definição oficial** para o limiar quantitativo.

**Login/carteira obrigatória no gratuito?** A página oficial não indica exigência de login para o uso básico do mapa; o botão "Login" existe (visto na tela em 12/09/2026), mas a documentação não condiciona o uso gratuito a login: parcialmente **sem definição oficial**.

**API oficial.** Existem integração via iFrame e Data API descritas na documentação **(documentação — docs.bubblemaps.io/introduction)**.

**Limite de holders no gratuito.** O mapa mostra por padrão os **250 maiores holders**; o mapa com **top 1.000 holders** é recurso de BMT. **(documentação — how-does-it-work; premium)**

**Armadilha de leitura (documentação/raciocínio).** A documentação alerta que **Supernodes** (carteiras de altíssima atividade, ex.: exchanges/routers) podem criar conexões "ruidosas" e têm recursos limitados no mapa; e que contratos/exchanges ficam ocultos por padrão **(documentação — how-does-it-work)**. Interpretar uma bolha grande de exchange como "baleia insider" é erro comum **(raciocínio, apoiado na nota oficial sobre Supernodes)**.

---

## 4. DexScreener (dexscreener.com)

Fonte oficial: docs.dexscreener.com (FAQ de Token Listing e referência de API/OpenAPI). Mapeamento tela↔API: a correspondência é **inferida** quando o nome da tela coincide com o campo da API.

### Tabela: campo na tela → o que significa (documentação) → link oficial

| Campo na tela | O que significa (documentação) | Link oficial |
|---|---|---|
| **Liquidity** | Campo `liquidity` da API, com `usd`, `base` e `quote` — valor da liquidez no pool (em US$ e em cada token do par). Correspondência tela↔API inferida. | docs.dexscreener.com/api/reference |
| **FDV** | Valor totalmente diluído. Fórmula oficial: **FDV = (supply total − supply queimado) × preço**. | docs.dexscreener.com/token-listing |
| **Mkt Cap** (Market Cap) | "Na maioria dos casos, FDV será igual ao market cap, mas pode haver exceções. Para tokens que não queimam o supply fora de circulação, o DS busca o circulating supply auto-reportado (Enhanced Token Info) ou do CoinGecko e usa esse valor para calcular o market cap." | docs.dexscreener.com/token-listing |
| **TXNS** (transações) | Campo `txns` da API, agrupado por janela de tempo, com `buys` e `sells` (contagem de compras e vendas). Correspondência inferida. | docs.dexscreener.com/api/reference |
| **Volume** | Campo `volume` da API, por janela de tempo (ex.: m5, h1, h6, h24). Correspondência inferida. | docs.dexscreener.com/api/reference |
| **Buys/Sells** | Contagens de compras e vendas dentro de `txns` (por janela). | docs.dexscreener.com/api/reference |
| **Pooled** (pooled de cada token do par) | Corresponde a `liquidity.base` e `liquidity.quote` (quantidade de cada token do par no pool). Correspondência inferida. | docs.dexscreener.com/api/reference |
| **Price (priceUsd)** | Preço em US$, retornado **como string** (`priceUsd`); há também `priceNative` (preço no token cotado). | docs.dexscreener.com/api/reference |
| **Audit** | **Sem definição oficial** nas docs do DexScreener. | — |
| **Traders** | **Sem definição oficial** nas docs do DexScreener. | — |
| **Buyers/Sellers** | **Sem definição oficial** nas docs do DexScreener. | — |

**FDV vs Mkt Cap (documentação).** FDV usa (supply total − queimado) × preço; o market cap, quando difere, usa o circulating supply (auto-reportado ou CoinGecko). Diferença conceitual: FDV considera o **supply total diluído**; o market cap, apenas o **circulante**. **(documentação — docs.dexscreener.com/token-listing)**

**Traders vs Buyers/Sellers vs Buys/Sells.** A API documenta apenas `txns` com `buys`/`sells` (**contagem de transações**). Contagens de **carteiras únicas** ("Traders", "Buyers/Sellers") **não** aparecem no schema público: **sem definição oficial** para esses três rótulos da tela; a distinção "contagem de transações vs. contagem de carteiras únicas" não é documentada oficialmente. **(documentação — docs.dexscreener.com/api/reference)**

**Audit.** Há uma seção/aba "Audit" na tela, mas **as docs do DexScreener não a definem** nem indicam a origem dos dados (próprio ou parceiro terceiro): **sem definição oficial**. Não afirmar a origem sem fonte oficial.

### ARMADILHA 2 — notação de preços minúsculos (zeros compactados)

Na tela, o BONK aparece como "$0.0", depois um "5" em elemento separado (subscrito), depois "2786"; o **5 é a quantidade de zeros após "0.0"** — preço real **US$ 0,000002786**.
- **(a)** Essa notação de subscrito **não está documentada** em fonte oficial do DexScreener: **sem definição oficial**.
- **(b)** A API **retorna o preço completo** como string: `priceUsd` (e `priceNative`) são strings no schema OpenAPI. **(documentação — docs.dexscreener.com/api/reference)**
- **(c)** Solscan e RugCheck usarem a mesma notação: **sem definição oficial** em ambos (nenhuma documentação oficial descreve subscrito de zeros).
- **Como converter (explicação/aritmética, não documentação — raciocínio):** "$0.0₅2786" = 0, seguido de 5 zeros, seguido de 2786 → 0,000002786. O subscrito conta os zeros após a vírgula, antes dos primeiros dígitos significativos.

**Cadastro/chave/pagamento e limites (documentação).**
- **Limites de taxa da API (documentação — docs.dexscreener.com/api/reference):** o próprio reference especifica **dois níveis distintos** — endpoints de **DEX/Pares/Busca/Token** a **300 requisições por minuto** (get-pairs-by-chain-and-pair-address, search-for-pairs, get-pools-by-token, get-pairs-by-token-address) e endpoints de **Token Profiles/Boosts/Ads** a **60 requisições por minuto** (perfis, boosts, ads/paid orders).
- **Recursos pagos:** Enhanced Token Info / Token Profiles são produtos do marketplace oficial (marketplace.dexscreener.com/product/token-info); Boosts e Ads aparecem como recursos/endpoints. **(documentação — docs.dexscreener.com/token-listing; /api/reference)**
- **Listagem automática:** "Todos os tokens são listados no DEX Screener automaticamente assim que são adicionados a um liquidity pool e têm ao menos uma transação." **(documentação — docs.dexscreener.com/token-listing)**
- **Limite de cobertura:** o DexScreener é focado em **pares com liquidez em DEX**; não é um explorador de holders (não mostra a lista de holders on-chain como o Solscan). A exibição de holders na interface: **sem definição oficial** (as docs não a descrevem).

---

## CHECKPOINT FINAL

### Lista consolidada de "sem definição oficial"
1. RugCheck — fórmula/pesos/limiares numéricos do score.
2. RugCheck — limites declarados do que o score não cobre.
3. RugCheck — definição em prosa e condição exata do flag "rugged".
4. RugCheck — notação de preços muito pequenos (zeros compactados).
5. RugCheck — iconografia exata do selo "verified" na tela (além do conceito).
6. Solscan — campo direto de "quanto o criador comprou".
7. Solscan — local/campo separado da mint e da freeze authority isoladas na tela.
8. Solscan — notação de zeros compactados (mesma da armadilha 2).
9. Bubblemaps — distinção formal rotulada "mesmo financiador" vs "só negociaram entre si".
10. Bubblemaps — quantidade exata de BMT por recurso.
11. Bubblemaps — exigência (ou não) de login para o gratuito.
12. DexScreener — "Audit" (definição e origem dos dados).
13. DexScreener — "Traders" e "Buyers/Sellers" (carteiras únicas).
14. DexScreener — notação de zeros compactados.
15. DexScreener — exibição de holders na interface.

### Lista de NÃO VERIFICADOS
- **RugCheck:** o corpo do site rugcheck.xyz (SPA em JavaScript) não é legível sem JavaScript; os rótulos de tela foram corroborados via API oficial (Swagger) e X oficial, não pelo corpo do site.
- **docs.rugcheck.xyz:** não encontrado — não existe site de documentação em prosa do RugCheck.

### Fontes oficiais usadas (URL)
**RugCheck**
- https://api.rugcheck.xyz/swagger/index.html
- https://api.rugcheck.xyz/swagger/doc.json
- https://rugcheck.xyz/about
- https://x.com/Rugcheckxyz/status/1900552758064714218 (Insider Network Analysis)
- https://x.com/Rugcheckxyz/status/1761039613500530713 (score e warnings)
- https://x.com/Rugcheckxyz/status/1793356153088610600 (análise gratuita)

**Solscan**
- https://info.solscan.io/exploring-token-details-page
- https://docs.solscan.io/
- https://info.solscan.io/how-to-update-metaplex-token-metadata
- https://docs.solscan.io/api-access (Pro API endpoints/planos/limites)

**Bubblemaps**
- https://wiki.bubblemaps.io/bubblemaps-v2/how-does-it-work
- https://wiki.bubblemaps.io/bubblemaps-v2/magic-nodes
- https://wiki.bubblemaps.io/bubblemaps-v2/premium
- https://wiki.bubblemaps.io/ (Intel Desk / visão geral)

**DexScreener**
- https://docs.dexscreener.com/token-listing
- https://docs.dexscreener.com/api/reference

**Protocolo (Solana / Metaplex)**
- https://solana.com/docs/tokens/basics
- https://solana.com/docs/tokens/basics/set-authority
- https://solana.com/docs/tokens/basics/freeze-account
- https://developers.metaplex.com/smart-contracts/token-metadata/update

### Tabela cruzada: o que eu quero checar → em qual das quatro eu checo (documentação)
| Quero checar | Ferramenta(s) | Base documental |
|---|---|---|
| Mint / freeze authority | Solscan (Authority/Metadata; confirmar `null` na mint account) | info.solscan.io; solana.com/docs |
| Update authority (metadados) | Solscan (Authority/Metadata) | info.solscan.io; developers.metaplex.com |
| LP travada/queimada | RugCheck (Lockers & LP) | api.rugcheck.xyz/swagger |
| Concentração de holders | RugCheck (Risks/Holders); Solscan (Holders); Bubblemaps (clusters) | Swagger; info.solscan.io; wiki.bubblemaps.io |
| Carteiras conectadas / clusters | Bubblemaps (links/clusters/Magic Nodes); RugCheck (Insiders) | wiki.bubblemaps.io; x.com/Rugcheckxyz |
| Liquidez do par | DexScreener (Liquidity/Pooled) | docs.dexscreener.com/api/reference |
| FDV vs Market Cap | DexScreener (FDV/Mkt Cap) | docs.dexscreener.com/token-listing |
| Primeiras transações | Solscan (Transfers/Transactions, "Oldest First") | info.solscan.io |
| Quanto o criador comprou | Solscan (Creator + Activities) — sem campo direto | info.solscan.io (sem definição oficial p/ campo direto) |

**Nota final:** documento neutro; não recomenda ferramenta nem token, nem afirma que uma seja melhor que outra. Cada afirmação de significado vem de documentação oficial (marcada) ou está registrada como "sem definição oficial". Dados de tela só do Bubblemaps (fase 1). As quatro ferramentas saíram completas — nada foi abreviado.