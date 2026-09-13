# Relatório de Verificação de Acesso — 4 ferramentas de checagem de token (Solana / BONK)

**Nota metodológica:** Este é SOMENTE o relatório de checagem de acesso que você pediu. NÃO contém o guia campo a campo, as tabelas de "campo → significado → valor de alerta", limites da ferramenta, armadilhas de leitura nem tabela cruzada — isso fica para depois da sua resposta. Descrevo apenas o que foi REALMENTE renderizado agora nesta sessão; nada de memória ou de tutorial antigo.

## TL;DR
- **Só uma das quatro renderizou dados dinâmicos reais do BONK: o Bubblemaps.** As outras três ficaram **NÃO VERIFICADAS** no acesso automatizado desta sessão — RugCheck devolveu a tela "ative o JavaScript", Solscan carregou só o rodapé/cookies (o corpo do token não "hidratou") e DexScreener foi bloqueado por detecção de robô ("bot_blocked").
- **Endereço de mint confirmado:** `DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263` é o BONK oficial da Solana — na tela do Bubblemaps o nome/símbolo exibido foi "BONK / Bonk", e o endereço bate com fontes externas independentes (ZIPMEX: *"Mint address · Solana · DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263 · Decimals 5"*; e a página de ativos da Coinbase).
- **Ferramenta de navegação usada: TinyFish** (`fetch_content`, com execução de JavaScript, ttl=0 para forçar busca ao vivo), em duas rodadas independentes com resultado idêntico. Não havia no ambiente uma ferramenta separada de sessão de navegador (`create_browser_session` / `run_web_automation`); apenas o `fetch_content` — que comprovadamente executa JavaScript, já que o mapa do Bubblemaps carregou.

**Data da consulta:** sábado, 12/09/2026, fuso America/São Paulo (UTC−3), durante esta sessão. *Observação honesta:* a ferramenta registra a data da execução, mas não me devolve o horário exato em minutos de cada tela; portanto registro o dia e o fuso, e não invento um relógio que não vi.

**Dois termos em uma linha, para leigo:**
- **Renderizar / hidratar:** é quando o navegador roda o código JavaScript da página e a preenche com os dados; sem isso aparece só a "casca" vazia.
- **bot_blocked:** o site detectou acesso automatizado e recusou entregar a página.

---

## Key Findings
- **Bubblemaps = ABRIU E RENDERIZOU** (clusters + carteiras rotuladas do BONK na Solana). É a única das quatro que serve como tela verificada agora.
- **RugCheck, Solscan e DexScreener = NÃO VERIFICADOS** nesta sessão, cada um por um motivo diferente (casca de JavaScript; não-hidratação do corpo; bloqueio anti-robô).
- Nenhuma das quatro exigiu cadastro/login/chave/pagamento *para chegar à casca da página*; onde os dados não apareceram foi por bloqueio técnico de acesso automatizado, não por paywall (a ressalva de "premium/BMT" do Bubblemaps está detalhada abaixo).

---

## Details

### 1. RugCheck — https://rugcheck.xyz
- **Status:** NÃO ABRIU (renderização falhou) → **NÃO VERIFICADO**.
- **URL inicial:** https://rugcheck.xyz
- **URL final da página do token:** https://rugcheck.xyz/tokens/DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263 (sem redirecionamento)
- **Token confirmado na tela:** NÃO — nenhum dado do token apareceu.
- **Campos/seções que apareceram:** nenhum. O corpo retornou apenas a mensagem literal: *"We're sorry but degen_market_check doesn't work properly without JavaScript enabled. Please enable it to continue."* O título da aba era "RugCheck — Solana & Fogo Token Risk Scanner".
- **Exigência de cadastro/login/pagamento:** não observada (a tela nem chegou a carregar os dados).
- **Bloqueio/comportamento:** não foi captcha nem Cloudflare — foi a casca do app (SPA), que só monta com JavaScript executado. Nesta consulta o conteúdo dinâmico (score de risco, mint/freeze authority, LP locked/burned, top holders, insiders, lista "Risks") NÃO foi renderizado.

### 2. Solscan — https://solscan.io
- **Status:** ABRIU PARCIALMENTE (só a "casca" — rodapé e aviso de cookies; o corpo do token não hidratou) → **NÃO VERIFICADO** para os campos do token.
- **URL inicial:** https://solscan.io
- **URL final da página do token:** https://solscan.io/token/DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263 (sem redirecionamento)
- **Token confirmado na tela:** parcial — o título da aba ("Token DezXAZ…pPB263 | Solscan") e a imagem de compartilhamento (OG) apontam para o endereço correto, mas o painel de dados do token não apareceu.
- **Campos/seções que apareceram:** apenas rodapé institucional e banner de cookies — textos como "Back to Top", "Powered by Solscan", "About Us", "API Docs", "Knowledge Base", "This website uses cookies… Got it!". NENHUMA das seções pedidas (mint authority, freeze authority, aba Holders, Transfers/Transactions, supply, decimals, "Update authority", ordenação por "Oldest First") foi renderizada.
- **Exigência de cadastro/login/pagamento:** não observada para chegar à casca; os dados não carregaram por não-hidratação, não por paywall.
- **Bloqueio/comportamento:** não retornou string de erro de robô; o conteúdo dinâmico (Next.js) simplesmente não hidratou no acesso automatizado. *(Contexto: em buscas, o próprio Solscan expõe o BONK com supply fixo de 87.994.589.881.887,5 e 5 decimais, mas isso veio de índice de busca — NÃO foi a tela renderizada agora, e por isso classifico como NÃO VERIFICADO.)*

### 3. Bubblemaps — https://bubblemaps.io
- **Status:** ABRIU E RENDERIZOU (única das quatro que entregou dados dinâmicos reais).
- **URL inicial:** https://bubblemaps.io (app em https://app.bubblemaps.io)
- **URL final da página do token:** ao acessar https://app.bubblemaps.io/sol/token/DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263 houve **redirecionamento** para **https://v2.bubblemaps.io/map?address=DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263&chain=solana** (a interface atual é a V2, lançada na Solana em 11/03/2025).
- **Token confirmado na tela:** SIM — cabeçalho exibiu "B / BONK / Bonk / 3y" (símbolo, nome e idade do token; o "3y" bate com o lançamento oficial do BONK em 25/12/2022).
- **Campos/seções que apareceram (verbatim):** o mapa de bolhas carregou (latência ~11,5s, terminando com o status "Enhancing map…"), com ranking de maiores detentores e clusters, incluindo:
  - #1 Binance Cold Wallet (9WzD…AWWM) — 8,83%
  - #2 51yZyD…QU5j — 6,56%
  - #3 Robinhood (4xLp…9Qdg) — 3,61%
  - Cluster 1 (3) — 3,48%; Cluster 2 (5) — 3,27%
  - #4 Bithumb Hot Wallet — 3,06%; #5 BtcTurk Cold Wallet — 3,06%
  - #18 Coinbase Prime Custody — 1,00%
  - (e demais holders/clusters numerados)
- Ou seja: **renderizou clusters** e **carteiras identificadas** (rótulos de exchanges) para o token da Solana.
- **Exigência de cadastro/login/carteira/pagamento:** o mapa base carregou SEM login. A página exibia os botões "Search tokens" e "Login" no topo. Não apareceu, no que foi visto, um bloqueio de "premium" impedindo o mapa base. Pelo material público da própria Bubblemaps, os recursos pagos dependem de posse do token BMT — o blog oficial lista *"holding $BMT will unlock our exclusive features, such as: P&L computation · Cross-chain analytics · Top 1,000 holders maps · Cluster interpretation with AI"*, e o Intel Desk (votação da comunidade) também usa BMT. Isso NÃO foi testado nesta checagem (só o mapa base gratuito foi renderizado).
- **Bloqueio/comportamento:** nenhum bloqueio; foi a mais lenta a carregar (~11,5s).

### 4. DexScreener — https://dexscreener.com
- **Status:** NÃO ABRIU (bloqueado por detecção de robô) → **NÃO VERIFICADO**.
- **URL inicial:** https://dexscreener.com
- **URL final da página do token/par:** https://dexscreener.com/solana/DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263 (a página não chegou a abrir)
- **Token confirmado na tela:** NÃO.
- **Campos/seções que apareceram:** nenhum. Não retornou corpo, título nem metadados.
- **Exigência de cadastro/login/pagamento:** não aplicável (bloqueado antes de qualquer tela).
- **Bloqueio/comportamento:** erro literal **"bot_blocked"**, persistente em duas tentativas separadas ao vivo. Nenhum dos números do topo do par (Liquidity, FDV, Market Cap, Volume 24h, Txns, Buys/Sells, Makers) nem seção "Security"/"Audit"/"Token info" pôde ser verificado.

---

## Recommendations (o que fazer a seguir)

1. **Decida como você quer que eu conte cada tela no guia.** Só o Bubblemaps foi verificado por mim agora. Para as outras três, temos três caminhos:
   - **(A)** Você mesmo abre RugCheck, Solscan e DexScreener no seu navegador (elas costumam abrir normalmente para uma pessoa) e me manda **prints** de cada tela do BONK; eu escrevo o guia descrevendo exatamente o que estiver nos prints. **É o caminho mais confiável** e mantém o guia 100% baseado no que foi visto.
   - **(B)** Eu escrevo o guia usando os **nomes de campos documentados oficialmente** por cada ferramenta (docs/API públicas), deixando MARCADO no texto que aquela tela específica não foi renderizada nesta checagem automatizada. Serve, mas é segunda mão.
   - **(C)** Nova tentativa automatizada em outra sessão/ferramenta — mas, dado que o bloqueio do DexScreener e a não-hidratação do Solscan se repetiram em duas rodadas, **não recomendo** apostar só nisso.
2. **Recomendo o caminho (A) para as três NÃO VERIFICADAS e usar o Bubblemaps já verificado como está.** Se você me enviar os prints, consigo o guia completo sem depender de "o que costuma aparecer".
3. **Gatilho que muda a recomendação:** se, ao abrir você mesmo, alguma das três exigir login/carteira/pagamento ou mostrar aviso de limite do plano gratuito, me avise no print — isso muda o que dá para ensinar como "gratuito" no seu módulo.

---

## Caveats
- **"NÃO VERIFICADO" aqui é sobre ESTA sessão automatizada, não um veredito sobre a ferramenta.** Bloqueios anti-robô (DexScreener) e páginas que só montam com JavaScript no navegador (RugCheck, Solscan) são comuns contra acesso automatizado; num navegador comum, no seu computador, essas três normalmente abrem. Seguindo sua instrução, NÃO descrevo o que "costuma" aparecer nelas — só registrei o que foi visto agora.
- **Os dados do Bubblemaps são um retrato do momento** (o mapa ainda finalizava com "Enhancing map…"); percentuais de holders mudam com o tempo.
- **O endereço do BONK foi confirmado**, mas note que confirmei o nome/símbolo na tela apenas no Bubblemaps; nas outras, a confirmação do endereço veio do título/metadados e de fontes externas, não do corpo renderizado.
- **Horário exato:** registrei dia e fuso (12/09/2026, UTC−3); não informo minutos porque a ferramenta não me devolveu esse carimbo e não vou inventá-lo.