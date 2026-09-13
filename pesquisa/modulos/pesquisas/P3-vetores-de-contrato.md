# Ler a tela — Três formas de perder dinheiro que dependem do CONTRATO do token (não do mercado)

*Módulo do curso · público-alvo: Victor, sem formação em programação · rede principal: Solana, com comparação EVM · data de consulta: 12/09/2026*

---

## TL;DR

- **Existem três armadilhas que estão no contrato do token, não no mercado, e que tiram dinheiro de quem já comprou:** (1) o **dev dump** — o criador vende a alocação dele minutos após o lançamento; (2) **metadata mutável** — nome, símbolo, imagem e link de metadados trocados DEPOIS que você comprou; e (3) **taxa de transferência escondida** — que na Solana só existe no padrão **Token-2022** (extensão `TransferFeeConfig`), nunca no **SPL clássico**. Em EVM (Ethereum/BSC/Base), a taxa e o bloqueio de venda ficam no código do contrato (honeypot / tax token).
- **O ponto mais importante e mais prático:** a maioria absoluta dos tokens do pump.fun é **SPL clássico** (programa `Tokenkeg…`), que **não pode ter taxa de transferência**. Mas isso deixou de ser uma regra absoluta: desde o fim de 2025, a instrução `create_v2` do pump.fun deploya tokens em **Token-2022** (ligada ao "Mayhem Mode"). Ou seja, você precisa **checar o padrão do token antes de comprar** — o item mais acionável do curso.
- **Dá para checar tudo de graça, antes de comprar:** no **Solscan** o campo do programa do token e a aba de extensões; no **RugCheck** os riscos de mint authority, freeze authority, "Transfer Fee", transfer hook e metadata mutável. A taxa de criador do pump.fun (0,300% na bonding curve, divulgada) é **diferente** de uma taxa escondida imposta pelo dev no próprio contrato — as duas tiram dinheiro, mas só a segunda é armadilha.

---

## Termos explicados (na primeira aparição)

- **Mint**: a "conta-mãe" de um token na Solana; define supply, decimais e as autoridades. Cada token é um *mint account*.
- **Authority (autoridade)**: uma permissão guardada no mint (ex.: quem pode emitir mais tokens, congelar contas, mudar a taxa). Pode ser revogada definindo-a como `None`/null.
- **SPL clássico**: o programa de token original da Solana, ID `TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA` ("Tokenkeg…"). Não tem taxa de transferência.
- **Token-2022 / Token Extensions**: o programa de token novo, ID `TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb` ("Tokenz…"). É um superconjunto do SPL clássico e permite "extensões" opcionais (taxa, hook, delegado permanente etc.), escolhidas na criação do token.
- **Basis points (bps / pontos-base)**: forma de medir porcentagem. 100 bps = 1%; 10.000 bps = 100%.
- **Epoch**: unidade de tempo da Solana, com cerca de 2 a 3 dias. Duas epochs ≈ 4 dias.
- **Bonding curve (curva de preço)**: sistema automático de precificação do pump.fun — quanto mais gente compra, mais o preço sobe, sem alguém definir o preço à mão.
- **Transfer hook**: extensão do Token-2022 que faz o token chamar um programa externo (escrito pelo criador) em toda transferência; esse programa pode aprovar ou rejeitar a transferência.
- **PDA (Program Derived Address)**: endereço controlado por um programa (não por uma pessoa com chave privada); usado, por exemplo, para travar liquidez de forma que ninguém consiga sacar.
- **Proxy contract / contrato atualizável (EVM)**: em Ethereum, um contrato "fachada" que aponta para outro contrato com a lógica; o dono pode trocar a lógica depois, mudando as regras do token sob os pés de quem já comprou.
- **IDL**: o "manual de instruções" público de um programa Solana, que descreve suas instruções e contas.

---

## (1) Dev dump — assinatura on-chain, detecção grátis, números e mecanismos de launchpad

### O que é e como aparece on-chain

Um **dev dump** é quando o criador do token compra uma fatia da oferta no lançamento (ou na mesma transação de criação, via "bundle") e **vende tudo pouco depois**, despejando na bonding curve e derrubando o preço para quem comprou depois. A assinatura observável é:

1. Uma **transação de criação** (instrução `Create` do programa pump.fun), assinada pela **carteira criadora**, que também aparece como `user`/`creator` no evento de criação (Chainstack, docs de detecção via Geyser/logsSubscribe, página aberta: https://docs.chainstack.com/docs/solana-listening-to-pumpfun-token-mint-using-geyser).
2. Frequentemente, na **mesma transação ou nas primeiras (block 0)**, uma ou mais **compras** da carteira do dev e de carteiras "bundle" coordenadas (mesma origem de SOL, compra simultânea).
3. Minutos depois, **vendas** dessas mesmas carteiras na bonding curve. O SolBundler resume o padrão-alerta: "se as mesmas carteiras que compraram no block 0 vendem todas nos primeiros 30 minutos, você foi a liquidez de saída de um rug planejado" (página aberta: https://solbundler.app/blog/pump-fun-rug-pull-avoid).

Nota importante do desenho do pump.fun: como a **liquidez é gerida pelo protocolo** e o LP é queimado na graduação, o criador **não consegue "puxar a liquidez"** (rug clássico de remoção de pool). O vetor que sobra é **negociar** — comprar barato e despejar — o que a literatura acadêmica classifica como estratégia de pump-and-dump do próprio criador (arXiv, "Predicting the success of new crypto-tokens: the Pump.fun case", página aberta: https://arxiv.org/html/2602.14860v1).

### Passo a passo de detecção com ferramenta gratuita (Solscan)

Como identificar a carteira do criador e ver quanto comprou e quando vendeu (Solscan, grátis; guia consolidado, página aberta: https://x.com/BudE404/status/1873168360751661401 e https://solbundler.app/blog/pump-fun-rug-pull-avoid):

1. Cole o endereço do mint (o do pump.fun costuma terminar em "pump" — é uma "vanity address" gerada pelo próprio pump.fun, não uma garantia de qualidade; página aberta: https://j.tools/en/blog/pump-suffix-solana-token-address).
2. Abra a aba **Holders (detentores)** para ver as maiores carteiras e a concentração.
3. Identifique a **carteira criadora**: na página do token do pump.fun (pump.fun/coin/[MINT]) o criador é exibido; no Solscan, a carteira que aparece no evento/instrução `Create`.
4. Clique na carteira do criador → **Transaction History / Token Balance Change** para ver quanto ela comprou no lançamento e se já vendeu (vendas para a bonding curve/PumpSwap).
5. Cheque o **histórico do dev**: se a carteira aparece na lista inicial de detentores de vários tokens recentes (tipicamente 5–15% da oferta) que foram a zero, é um "launcher serial" — sinal forte de rug (página aberta: https://subglow.io/guides/track-pump-fun-whale-wallets). Ferramentas gratuitas complementares que já destacam atividade do dev: Bubblemaps (clusters de carteiras), GMGN, Photon, Birdeye, DexScreener.

### Números medidos

- **98,6% dos tokens do pump.fun** lançados entre jan/2024 e mar/2025 caíram para menos de US$ 1.000 de liquidez (medida em SOL) e são, na prática, sem valor — de mais de 7 milhões de tokens, apenas ~97.000 mantiveram ≥ US$ 1.000 de liquidez. É a métrica do relatório "Solana Rug Pulls & Pump-and-Dumps" da **Solidus Labs**; o maior rug individual identificado no relatório foi o token MToken, com US$ 1,9 milhão (Solidus Labs, via CoinDesk, 07/05/2025 — páginas abertas: https://www.soliduslabs.com/reports/solana-rug-pulls-pump-dumps-crypto-compliance e https://www.coindesk.com/business/2025/05/07/98-of-tokens-on-pump-fun-have-been-rug-pulls-or-an-act-of-fraud-new-report-says). *Observação de método/qualidade:* a métrica mede "virou pó/perdeu liquidez", que engloba tanto rugs deliberados quanto tokens que simplesmente morreram — não é 98,6% de "dev dumps" no sentido estrito. O pump.fun contestou publicamente o enquadramento do relatório.
- **Taxa de graduação (o token chega a migrar para a DEX)**: no estudo acadêmico de set/2025, de 655.770 tokens criados por 243.123 endereços criadores, só 4.338 (≈ **0,63%**) graduaram (arXiv, página aberta: https://arxiv.org/html/2602.14860v1). A coinlaw.io reporta que a taxa de graduação caiu para **0,26% em jun/2026** (página aberta: https://coinlaw.io/memecoin-statistics/).
- **Chainalysis (2025, citado pela coinlaw.io)**: 74.037 tokens lançados em 2024 suspeitos de pump-and-dump ≈ **3,59%** de todos os tokens do ano; roubo médio por rug pull ≈ **US$ 510.000**.
- **Concentração de deployers**: análise de comunidade (Arkham, abr/2025, via Medium) atribui a ~12 clusters de carteiras cerca de 1/5 das criações e ~82% das drenagens de liquidez — **NÃO VERIFICADO em fonte primária** (relatório Arkham original não aberto).

### Mecanismos de launchpad (trava/vesting) e mudanças 2025–2026

- **pump.fun não oferece vesting ou trava nativa do criador.** O que o protocolo trava é a **liquidez** (LP queimado na graduação), não a alocação do dev. Ferramentas de terceiros (ex.: StakePoint) permitem ao criador travar voluntariamente seus tokens num PDA como sinal de confiança (página aberta: https://stakepoint.app/lock-pumpfun-tokens) — mas é opcional; a maioria dos tokens não tem nenhuma trava.
- **Modelo de receita do criador mudou várias vezes:** desde **13/05/2025** existe a "Creator fee" (o dev ganha uma fatia de cada negociação, o que reduziu o incentivo de "só despejar o supply"); em **maio/2025** o PumpSwap passou a dar 0,05% do volume ao criador (páginas abertas: https://pump.fun/docs/fees e https://www.blocmates.com/news-posts/pump-fun-s-dex-pumpswap-launches-0-05-creator-fee-on-transactions).
- **Combate ao "vamping":** em **24/03/2026**, o cofundador Alon Cohen anunciou que o criador só pode trocar a carteira que recebe as taxas **uma única vez após o lançamento**, para conter a prática de redirecionar taxas depois que o token pega tração (página aberta: https://www.mexc.com/tr-CT/news/981354).

---

## (2) Metadata mutável — o que muda, quem pode, como checar campo a campo, caso real e comparação EVM

### O que pode mudar depois que você comprou, e quem pode mudar

Na Solana existem **dois caminhos** para metadados, e é erro grave confundi-los:

**Caminho A — Metaplex Token Metadata (o padrão dos memecoins SPL clássicos).** Os campos (nome, símbolo, `uri` que aponta para o JSON com imagem e links) vivem numa conta de metadados derivada do mint. Quem controla é a **`updateAuthority`**. A permissão de alterar depende do campo booleano **`isMutable`**:
- Se `isMutable = true`, a `updateAuthority` pode usar a instrução `Update` para trocar **nome, símbolo, `uri` (logo/imagem/links) e creators** — inclusive depois que as pessoas compraram (doc oficial Metaplex, página aberta: https://developers.metaplex.com/smart-contracts/token-metadata/update: "The update authority of an asset can update its Metadata account using the Update instruction as long as the Is Mutable attribute is set to true").
- Se `isMutable = false`, os campos ficam **imutáveis para sempre** (doc oficial Metaplex, página aberta: https://developers.metaplex.com/token-metadata).

**Caminho B — Token-2022 (extensões `MetadataPointer` + `TokenMetadata`).** Aqui os metadados podem ficar **dentro do próprio mint**. O `MetadataPointer` diz onde estão os metadados, e a extensão `TokenMetadata` guarda os campos. Quem pode alterar é a autoridade de metadados definida na extensão. É um mecanismo separado do Metaplex; ao checar um token Token-2022, você olha as **extensões**, não a conta Metaplex.

### Como checar campo a campo, de graça

**No Solscan** (páginas abertas: https://info.solscan.io/how-to-update-metaplex-token-metadata e https://www.coingecko.com/learn/what-is-solscan-and-how-to-use-it):
- Abra a página do token → aba **Metadata**. Procure a linha **Mutable**: valor **`true`** = pode ser trocado; **`false`** = travado. Ali também aparece a **Update Authority**.
- Para Token-2022, há a seção **Extensions** ("Presents details of any extension program attached to the token"), que lista as extensões ativas (inclusive as de metadados).

**No RugCheck** (rugcheck.xyz): a ferramenta lê o mint diretamente (`getAccountInfo`) e sinaliza mint/freeze authority, extensões do Token-2022 e metadata mutável, dando um veredito SAFE/CAUTION/DANGER e nota 0–100 (páginas abertas: https://dev.to/mrwizardlyloaf/token-2022-traps-that-drain-ai-trading-agents-and-how-to-screen-them-33bo e https://yashhsm.medium.com/primer-on-solanas-token-extensions-ef8fbd717c56). *Limitação verificada:* a página do RugCheck depende de JavaScript e não renderizou em captura automática — na prática ela funciona no navegador; para checklist de curso, oriente o aluno a abrir no navegador e usar a busca do site.

**Alternativas gratuitas** se Solscan/RugCheck falharem: Solana Explorer (explorer.solana.com), SolanaFM (solana.fm), Orb da Helius (a aba **Metadata → Mutable** mostra true/false; página aberta: https://www.helius.dev/docs/orb/explore-authorities) e GoPlus (console.gopluslabs.io/token-security/solana).

### Caso real de troca de metadata

- **Padrão histórico documentado, mas sem token nomeado:** editar/omitir metadata para enganar traders é reconhecido pela indústria como tática de scam já usada na Solana; hoje é menos comum porque o pump.fun padronizou e exige metadados mínimos (página aberta: https://medium.com/@cakesonsolana/cooking-by-numbers-solana-token-metadata-ff9366a0a772). Também é reconhecido de forma genérica que "um token com metadata mutável pode se passar por outro projeto a qualquer momento apenas mudando nome e logo" (página aberta: https://alphecca.io/en/blog/revoke-authority-solana).
- **Caso concreto com token nomeado e link específico de troca de metadata pós-compra: NÃO VERIFICADO.** Não localizei, nas buscas feitas agora, um incidente único com nome de token e prova on-chain de troca de metadata após a compra. (O estudo de EVM da Ethereum, Ertam et al. 2025, DOI 10.1002/cpe.70503, documenta a categoria "impersonation/identity fraud" — usar mesmo nome/símbolo de um projeto legítimo — mas para tokens Ethereum, não como caso Solana nomeado.)

**Nota tranquilizadora e verificada para o curso:** o pump.fun **revoga a update authority por padrão** em todos os novos tokens, tornando o metadata imutável logo na criação (páginas abertas: https://www.helius.dev/docs/orb/explore-authorities: "revoking a token's update authority is the default for all new Pump.fun tokens"; e https://medium.com/@pumpdevio/pump-fun-api-how-to-launch-a-token-with-one-http-call-ad62eee2aaaf: "Pump.fun token metadata is immutable once created"). Logo, no mercado principal de Victor, metadata mutável é um risco baixo — mas continua relevante para tokens criados **fora** do pump.fun (SolTokenCreator, Smithii etc., onde o criador escolhe).

### Comparação EVM — proxy contract e contrato atualizável

Em Ethereum/BSC/Base o risco equivalente (e maior) é o **contrato atualizável via proxy**: um contrato "fachada" (proxy) aponta para um contrato de lógica; se o dono mantém a permissão de trocar a lógica, ele pode, depois que você comprou, **ativar uma blacklist, mudar a taxa de venda, pausar transferências ou alterar saldos** — mesmo que o token parecesse "renunciado". Scanners alertam que "se for atualizável ou o dono mantém permissões para mudar taxas ou ativar blacklists, o token pode virar hostil depois do lançamento" (página aberta: https://apespace.io/honeypot/0x591ebebb8f70755db403b467360c0578ef181a3b). A diferença prática: na Solana com SPL clássico o comportamento de transferência é fixo pelo programa (não dá para "atualizar" a lógica do token); em EVM, um proxy dá ao dono poder de reescrever as regras.

---

## (3) Tax token e honeypot por taxa — o que é possível em cada padrão, `SetTransferFee` como item de checklist, pump.fun × Token-2022, e taxa de criador × taxa escondida

### O que é possível em cada padrão

| Padrão | Taxa de transferência/venda no próprio token? | Bloquear a venda pelo contrato? |
|---|---|---|
| **Solana SPL clássico** (`Tokenkeg…`) | **NÃO existe.** O programa não tem taxa de transferência. | Só via **freeze authority** (congela a conta → você não vende). É o "honeypot" da Solana, sem código esperto. |
| **Solana Token-2022** (`Tokenz…`) | **SIM**, via extensão **`TransferFeeConfig`** (taxa em bps, com `maximum_fee`). | Via **transfer hook** (programa externo pode rejeitar a transferência), **freeze authority**, `NonTransferable`, `pausable`, `defaultAccountState=frozen`, ou **PermanentDelegate** (drenar/queimar seus tokens). |
| **EVM (ERC-20)** | **SIM**, no código: taxa de compra/venda na função de transferência. | **SIM**: honeypot clássico — o `sell` reverte, é taxado a ~100%, ou blacklist/pausa. |

Fontes primárias: a taxa de transferência do Token-2022 é aplicada em cada transferência, reduz o valor recebido, fica retida na conta de destino, e a `withdraw_withheld_authority` recolhe as taxas; `InitializeTransferFeeConfig` tem de vir **antes** de `InitializeMint`, na mesma transação — ou seja, **a taxa nasce com o token; um token clássico não "ganha" taxa depois** (doc oficial Solana, página aberta: https://solana.com/docs/tokens/extensions/transfer-fees). O SPL clássico não tem esse mecanismo (doc oficial, confirmado no contexto do usuário).

**Transfer hooks — o que dá e o que NÃO dá:** o hook roda um programa arbitrário escrito pelo criador em cada transferência e, se retornar erro, **a transferência inteira é revertida** — então ele **pode bloquear/condicionar a venda** (ex.: só carteiras numa whitelist conseguem receber; página aberta: https://solana.com/developers/courses/token-extensions/transfer-hook e https://www.quicknode.com/guides/solana-development/spl-tokens/token-2022/transfer-hooks). **Mas há um limite arquitetural importante:** quando o hook roda, todas as contas do transfer viram **read-only** (o hook não recebe os privilégios de assinatura do vendedor), então "cobrar uma taxa no mesmo token dentro do hook" **falha na prática** — a Solana desenhou isso justamente para conter abuso (doc oficial, página aberta: https://solana.com/developers/guides/token-extensions/transfer-hook; análise técnica, página aberta: https://chainstack.com/solana-token-2022-fee-transfer-hooks/). Ou seja: **taxa** → use `TransferFeeConfig`; **bloqueio condicional da venda** → use transfer hook.

### Diferença prática: não conseguir vender × conseguir vender perdendo quase tudo

- **Honeypot clássico (não vende):** a venda simplesmente falha/reverte. Na Solana isso vem quase sempre de **freeze authority** ativa (o dono congela sua conta) ou de extensões Token-2022 (`pausable`, `NonTransferable`, transfer hook que rejeita). O gráfico "parece vivo" porque a compra funciona para todo mundo; só quem tenta sair descobre a trava (página aberta: https://dev.to/mrvlyouknowwho/freeze-authority-is-the-solana-honeypot-how-to-check-any-spl-token-in-10-seconds-free-no-wallet-15h4).
- **Taxa que come quase tudo (vende, mas perde):** a venda passa, mas uma taxa altíssima (ex.: 45–100%) fica com o dev/tesouraria. Em EVM é uma "tax" no contrato; na Solana, via `TransferFeeConfig` do Token-2022 (que pode chegar a 100%). O resultado financeiro é parecido com o honeypot, mas o mecanismo é diferente.

### `SetTransferFee` — o achado principal, como item de checklist

Este é o item que entra ao lado de mint authority e freeze authority:

- **Quem detém o poder:** dois campos no mint Token-2022 — a **`transfer_fee_config_authority`** (pode **alterar a taxa** com a instrução `SetTransferFee`) e a **`withdraw_withheld_authority`** (pode **recolher as taxas** retidas). Definidos na criação (docs oficiais, páginas abertas: https://solana.com/docs/tokens/extensions/transfer-fees e https://www.quicknode.com/guides/solana-development/spl-tokens/token-2022/transfer-fees).
- **Como ver se foi revogada:** se a `transfer_fee_config_authority` estiver como **`None`/null**, ninguém pode mais aumentar a taxa — sinal bom. Se estiver ativa, o dono pode mexer na taxa. Isso aparece nas extensões do mint (Solscan aba Extensions; RugCheck; GoPlus).
- **Valor atual e o agendado:** o Token-2022 guarda **dois valores** de taxa — `olderTransferFee` e `newerTransferFee` — cada um com sua **epoch** de início. Ao ver uma taxa "newer" com epoch futura, é uma taxa **agendada** que ainda vai entrar em vigor.
- **A trava anti-rug (verificada):** o `SetTransferFee` **não vale na hora** — passa a valer **duas epochs depois (~4 dias)**. A doc oficial diz: "Use SetTransferFee to update the next transfer fee configuration, which takes effect starting two epochs later" (https://solana.com/docs/tokens/extensions/transfer-fees). Análises de segurança confirmam que esse atraso "protege os usuários de perdas por ajustes de taxa" / é uma proteção contra "bait and switch" (Offside Security e Blueshift, via subagente). **Consequência prática para o curso:** o clássico "subiram a taxa depois que comprei" tem, por desenho, ~4 dias de aviso — o holder consegue sair antes se estiver atento.
- **Teto máximo (verificado no código oficial):** `MAX_FEE_BASIS_POINTS = 10_000`, comentado no código-fonte como "Maximum possible fee in basis points is 100%, aka 10_000 basis points" (repositório oficial solana-program/token-2022, página aberta: https://github.com/solana-program/token-2022/blob/main/program/src/extension/transfer_fee/processor.rs; confirmado também em https://docs.raydium.io/algorithms/token-2022-transfer-fees). **Sim, a taxa pode ser configurada até 100%.** Existe também o `maximum_fee` (um teto em quantidade absoluta de tokens por transferência), que pode fazer a taxa efetiva "saturar" em transferências grandes.
- **Caso documentado de token Token-2022 que SUBIU a taxa depois da compra: NÃO VERIFICADO / NENHUM CASO NOMEADO ENCONTRADO.** Após buscas específicas (RugCheck, GoPlus, SlowMist, "transfer fee increased scam", "SetTransferFee scam"), não localizei um incidente nomeado com fonte. O motivo estrutural é a trava de 2 epochs acima. O que **está** documentado como abuso real de Token-2022 em 2026 é outro vetor: o **PermanentDelegate** (delegado permanente que drena/queima tokens da sua carteira) e honeypots via transfer hook — RugCheck estima que **>40% dos novos tokens Solana carregam a extensão PermanentDelegate** e perdas com abuso de extensões Token-2022 no 1º tri de 2026 acima de US$ 50M (DEV.to citando RugCheck, via subagente — **este número específico é NÃO VERIFICADO em fonte primária**). Traduzindo para Victor: a armadilha realista do Token-2022 hoje não é "subir a taxa", e sim **taxa alta já embutida no lançamento**, **PermanentDelegate** e **transfer hook** que bloqueia a venda.

### pump.fun × Token-2022 — a resposta com todas as letras

A pergunta "todo token do pump.fun é SPL clássico?" tinha fontes conflitantes; resolvido:

- **O programa do pump.fun tem DUAS instruções de criação** (docs oficiais pump-fun/pump-public-docs e análise técnica, via subagente):
  - **`create`** → mint sob o **SPL clássico** (`Tokenkeg…`), com metadata Metaplex. É o caminho **legado e ainda o padrão** para lançamentos comuns.
  - **`create_v2`** → mint sob o **Token-2022** (`Tokenz…`), com metadata nativa e as flags `is_mayhem_mode` / `is_cashback_coin`. É uma implantação real de Token-2022, não um fork.
- **Portanto:** "todo token pump.fun é SPL clássico" era verdade historicamente, **mas deixou de ser** desde o fim de 2025 (Chainstack: "create_v2… uses the Token2022 program instead of the legacy Metaplex standard… [o legado create] will be deprecated at a later time", ligado ao "Mayhem Mode", via subagente). Um token comum ainda tende a ser SPL clássico; um token de Mayhem Mode / cashback é Token-2022.
- **Consequência para Victor, com todas as letras:** você **não pode mais assumir** que "é pump.fun, logo não tem taxa de transferência". Um token pump.fun **SPL clássico** não tem taxa de transferência no contrato; um token pump.fun **Token-2022** (create_v2/Mayhem) **pode** ter extensões — então **cheque o programa do token e as extensões antes de comprar** (item 4 abaixo).
- **Confirmação final recomendada (NÃO 100% VERIFICADO por captura ao vivo):** o subagente não conseguiu abrir uma página Solscan de um token pump.fun fresquíssimo para ler o campo "Token Program" ao vivo. A recomendação de checklist — ler esse campo no Solscan — resolve isso caso a caso.
- **Outros launchpads Solana:**
  - **Bonk.fun / LetsBonk** (sobre Raydium **LaunchLab**): cria **SPL clássico**; a doc da Raydium diz que "LaunchLab does not support Token-2022 for the base mint (it creates classic SPL mints)" (página aberta: https://docs.raydium.io/algorithms/token-2022-transfer-fees; e https://learn.backpack.exchange/articles/what-is-bonk-fun-solana).
  - **Raydium LaunchLab**: SPL clássico (mesma fonte oficial acima).
  - **Moonshot, Believe, Bags**: predominantemente SPL clássico; suporte a extensões Token-2022 varia por plataforma — **NÃO VERIFICADO** em doc oficial de cada um; trate como "cheque o token individual".

### Taxa de criador PADRÃO (divulgada) × taxa ESCONDIDA (armadilha)

Ambas tiram dinheiro do comprador, mas só uma é armadilha:

**Taxa de criador padrão, divulgada pelo protocolo (não é armadilha, mas é custo):** Verificado na página oficial pump.fun/docs/fees (última atualização 20/05/2026, página aberta com TinyFish: https://pump.fun/docs/fees):
- **Bonding curve (SOL e USDC): total 1,25%**, decomposto em **0,300% criador + 0,95% protocolo + 0% LP**. Isso **confirma exatamente** o que Victor informou (1,25% total, 0,300% ao criador).
- **PumpSwap (pós-graduação, pool canônica): escala móvel por market cap**, de **1,250%** (mais baixo, 0–420 SOL: 0,300% criador) até **0,300%** total no topo (98.240 SOL+: 0,050% criador). Ou seja, a taxa de criador continua **depois** da migração para PumpSwap.
- **Pools PumpSwap não-canônicas:** total 0,3% (0% criador, 0,05% protocolo, 0,25% LP).
- **Histórico:** a "Creator fee" vale para coins na bonding curve/PumpSwap **desde 13/05/2025**; USDC como par foi liberado em **21/05/2026**.
- Comparação de outros venues: **Bonk.fun/LetsBonk** divide sua taxa (ex.: 30% para buy&burn de BONK, 40% para desenvolvimento — página aberta: https://learn.backpack.exchange/articles/what-is-bonk-fun-solana), mas **não publica um % de criador tão explícito** quanto o pump.fun — quando não há número oficial, cheque na própria interface (página aberta: https://smithii.io/en/pump-fun-creator-fees/).

**Taxa escondida imposta pelo dev (isto é a armadilha):**
- Em Solana: **`TransferFeeConfig`** (Token-2022) ou **transfer hook** — a taxa/bloqueio está **dentro do token**, não no venue.
- Em EVM: **tax** no código do contrato.
- **Pool/AMM próprio controlado pelo dev:** É **tecnicamente possível** um dev impor uma "taxa de venda" fora do token, num programa de pool próprio (AMM customizado), cobrando um spread/fee assimétrico só na venda. Na prática, quem negocia via **pump.fun/PumpSwap** ou **Raydium** usa os programas conhecidos desses venues (taxas divulgadas); o risco de AMM customizado aparece quando alguém te leva a negociar num pool/site fora dos venues padrão. **Ocorrência medida na prática: NÃO VERIFICADO** (não achei número de prevalência para AMM customizado malicioso na Solana; o análogo EVM documentado é o "trap token" que manipula reservas do pool, ex.: caso ai16z/bot contract relatado pela EigenPhi, página aberta: https://eigenphi.substack.com/p/trap-tokens-rug-pulling-liquidities).

A regra para Victor: **taxa do venue** aparece na doc oficial do launchpad e é igual para todos os tokens daquele venue; **taxa escondida** está no mint (extensão) ou no código do contrato e varia token a token — é ela que o checklist precisa pegar.

### Como detectar taxa de venda ANTES de comprar, de graça (inclui simulação de venda)

**Solana** — o que cada ferramenta realmente faz:
- **RugCheck (rugcheck.xyz):** lê o mint direto (`getAccountInfo`) e sinaliza mint/freeze authority e extensões Token-2022 (transfer fee, transfer hook, permanent delegate) — ou seja, **lê a extensão do mint**. Também há relatos de que faz **simulação de compra/venda** para pegar honeypot (páginas abertas: https://dev.to/mrwizardlyloaf/token-2022-traps-that-drain-ai-trading-agents-and-how-to-screen-them-33bo e https://www.sharpe.ai/products/rug-check). Para Token-2022, ler a extensão já basta para saber se há taxa; a simulação é mais útil em EVM.
- **GoPlus Solana (console.gopluslabs.io/token-security/solana):** cobre funções de risco sob os padrões Token e **Token-2022 Extension**, incluindo taxas e "external hook contract" — lê o mint; tem também API de **simulação de transação** (páginas abertas: https://www.binance.com/en/square/post/13751265235810 e https://gopluslabs.io/en/token-security-api).
- **Solscan/SolanaFM/Explorer/Orb:** leem e mostram o programa do token e as extensões (não simulam venda).

**EVM** — aqui a **simulação de venda** é o método padrão porque a lógica está escondida no código:
- **honeypot.is:** faz **simulação real de compra e venda** (forka o estado da chain, compra e tenta vender) em Ethereum, BSC e Base — grátis, sem chave; mostra a taxa estimada de compra/venda; retorna "UNKNOWN" se não consegue comprar (ex.: sem liquidez) — limitação registrada num estudo acadêmico (arXiv 2309.04700, "Trapdoor Tokens", página aberta: https://arxiv.org/pdf/2309.04700).
- **GoPlus / Token Sniffer / De.Fi Scanner / ApeSpace:** simulam venda e/ou leem taxas, blacklist, proxy atualizável (páginas abertas: https://dev.to/mrvlyouknowwho/how-to-spot-a-honeypot-token-before-you-buy-and-automate-the-whole-checklist-3n6b e https://apespace.io/honeypot/0x591ebebb8f70755db403b467360c0578ef181a3b).
- **Aviso verificado:** toda simulação é um retrato do momento. Se o contrato é atualizável (proxy) ou o dono pode mudar taxa/blacklist depois, "o sucesso de hoje não garante o de amanhã" (página aberta: https://www.cube.exchange/what-is/honeypot-token).

### Números medidos de prevalência (tax token / honeypot)

- **Ethereum (revisado por pares):** Ertam, Kucuk & Kilincer (2025), *A Novel Feature Extraction and Detection Model for Phishing Scam on Ethereum Using Machine Learning*, DOI 10.1002/cpe.70503 — estimam que tokens de phishing (honeypot, rug pull, impersonation) são **~1%–3% de todos os tokens implantados** no ecossistema Ethereum; o modelo criticamente ainda deixa passar ~1 em cada 5 (falso-negativo de 18,54%). O dataset de scam incluía sinais como "compras bem-sucedidas mas vendas que falham (honeypot)" e "taxas anormalmente altas".
- **Ethereum/BSC (indústria):** Solidus Labs (2022) reportou **>350 tokens de scam implantados por dia** e que **~12% de todos os tokens na BNB Chain eram fraudulentos** (página aberta: https://investing.com/news/cryptocurrency-news/token-scams-jump-41-to-350-per-day-onchain-data-shows-2967395). Blockfence documentou um esquema que enganou >42.000 vítimas e ~US$ 32M manipulando supply/mint/burn, com 1.300 casos similares na Ethereum (página aberta: https://benzinga.com/markets/cryptocurrency/24/01/36712417/...).
- **Solana/pump.fun:** ver os números da seção (1) — 98,6% viraram pó (Solidus Labs); PermanentDelegate em >40% dos novos tokens (RugCheck, NÃO VERIFICADO em primária).

---

## (4) Tabela final: vetor → onde checar (ferramenta + campo) → sinal de alerta

| Vetor | Onde checar (ferramenta + nome do campo) | Sinal de alerta |
|---|---|---|
| **Padrão do token (SPL clássico × Token-2022)** | **Solscan** → topo da página do token / campo do **programa dono do mint** ("Token Program" / "Owner Program"). Explorer/SolanaFM mostram o mesmo. | Owner = `TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb` (Token-2022) → **investigue as extensões**. Owner = `Tokenkeg…` (SPL clássico) → sem taxa de transferência possível. |
| **Transfer fee ativo** | **Solscan** → aba **Extensions** (Transfer Fee / TransferFeeConfig); **RugCheck** risco "Transfer Fee" com o %; **GoPlus Solana**. | Qualquer taxa >0 que você não esperava; taxa alta (dezenas de %) = quase-honeypot. Até 100% é permitido (MAX 10.000 bps). |
| **`transfer_fee_config_authority` ativa** | **Solscan** aba Extensions / **RugCheck** / **GoPlus** (autoridade da taxa). | Autoridade ≠ null → o dono pode aumentar a taxa (com atraso de ~2 epochs). Autoridade = null → não pode mais mexer (bom). |
| **Taxa agendada (newer fee)** | **Solscan/RugCheck** → campos `olderTransferFee` / `newerTransferFee` + epoch. | Um `newerTransferFee` com epoch futura e valor maior = aumento **agendado**; saia antes da epoch de ativação. |
| **Transfer hook ativo** | **RugCheck** ("transfer hook"/"external hook") / **GoPlus** ("external hook contract") / **Solscan** Extensions. | Hook presente → a venda pode ser bloqueada por lógica do criador. Trate como honeypot potencial. |
| **Metadata mutável / update authority** | **Solscan** → aba **Metadata** → linha **Mutable** (true/false) e **Update Authority**; **Orb (Helius)** Metadata→Mutable. | `Mutable = true` com update authority ativa → nome/símbolo/imagem/URI podem ser trocados depois (risco de impersonação). |
| **Carteira do criador vendeu** | **Solscan** → aba **Holders** + página da carteira criadora (Token Balance Change / Transaction History); **Bubblemaps**, **GMGN**, **Photon**. | Dev com 15–30%+ do supply; vendas do dev/bundles nos primeiros 5–30 min; histórico de tokens anteriores zerados. |
| **Taxa de criador do venue** | **Doc oficial do launchpad** (pump.fun/docs/fees). | Não é armadilha, é custo: 1,25% na bonding curve do pump.fun (0,300% criador). Compare com a taxa "escondida" no mint. |
| **(EVM) Proxy / contrato atualizável** | **honeypot.is** (simula venda), **GoPlus**, **Token Sniffer**, **De.Fi**, **ApeSpace**. | "Proxy contract"/upgradeable + dono com poder de mudar taxa/blacklist → pode virar hostil depois da compra. |
| **(EVM) Tax de venda / honeypot** | **honeypot.is** (simulação real de compra+venda) → taxa de venda estimada. | Venda que reverte, ou tax de venda >15–25% → armadilha. "UNKNOWN" (sem liquidez) → não compre. |

---

## (5) Lista de NÃO VERIFICADOS

1. **Caso nomeado de token Token-2022 que subiu a taxa via `SetTransferFee` após a compra** — nenhum incidente nomeado com fonte encontrado (a trava de 2 epochs torna o ataque raro).
2. **Caso nomeado, com prova on-chain, de troca de metadata pós-compra na Solana** — não localizado; só o padrão genérico documentado.
3. **Padrão de token de Moonshot, Believe e Bags (SPL clássico × Token-2022)** — não confirmado em doc oficial de cada plataforma.
4. **Confirmação ao vivo, no Solscan, do "Token Program" de um token pump.fun recém-lançado comum** — inferido das docs (create=SPL clássico / create_v2=Token-2022), não capturado ao vivo.
5. **Número "PermanentDelegate em >40% dos novos tokens Solana" e "perdas >US$50M no 1º tri/2026"** — citados por DEV.to/RugCheck, não abertos em fonte primária.
6. **Prevalência medida de AMM customizado malicioso com "taxa de venda escondida" na Solana** — não encontrada.
7. **Números da Arkham (12 clusters, ~82% das drenagens, US$4,2M)** — via Medium, relatório Arkham primário não aberto.
8. **RugCheck faz simulação de venda para Token-2022 ou só lê a extensão** — fontes indicam que lê a extensão do mint (suficiente para taxa) e que simula compra/venda para honeypot; não confirmei ao vivo qual caminho ele usa por token.

---

## (6) Fontes (link, data de consulta 12/09/2026, marcação)

**Documentação oficial (fonte primária):**
- Solana — Transfer Fees (Token-2022): https://solana.com/docs/tokens/extensions/transfer-fees — **(página aberta)**
- Solana — Transfer Hook (guia/curso): https://solana.com/developers/guides/token-extensions/transfer-hook e https://solana.com/developers/courses/token-extensions/transfer-hook — **(só snippet)**
- solana-program/token-2022 — código `MAX_FEE_BASIS_POINTS = 10_000` (=100%): https://github.com/solana-program/token-2022/blob/main/program/src/extension/transfer_fee/processor.rs — **(só snippet)**
- Metaplex — Updating Assets (`isMutable`, `updateAuthority`, Update): https://developers.metaplex.com/smart-contracts/token-metadata/update — **(só snippet)**
- Metaplex — Overview (imutabilidade): https://developers.metaplex.com/token-metadata — **(só snippet)**
- pump.fun — Fees (1,25%; 0,300% criador; escala PumpSwap): https://pump.fun/docs/fees — **(página aberta, via TinyFish)**
- pump.fun — pump-public-docs (create/create_v2, instruções): https://github.com/pump-fun/pump-public-docs — **(página aberta, via TinyFish)**
- Raydium — Token-2022 transfer fees / suporte de LaunchLab a SPL clássico: https://docs.raydium.io/algorithms/token-2022-transfer-fees — **(só snippet)**
- Solscan — Update Metaplex Token Metadata / Mutable: https://info.solscan.io/how-to-update-metaplex-token-metadata — **(só snippet)**
- QuickNode — transfer fees Token-2022 (`transferFeeConfigAuthority`, `withdrawWithheldAuthority`): https://www.quicknode.com/guides/solana-development/spl-tokens/token-2022/transfer-fees — **(só snippet)**

**Relatórios de segurança e mídia:**
- Solidus Labs — Solana Rug Pulls & Pump-and-Dumps (98,6%): https://www.soliduslabs.com/reports/solana-rug-pulls-pump-dumps-crypto-compliance — **(só snippet)**
- CoinDesk — 98% de tokens pump.fun rug (07/05/2025; MToken US$1,9M): https://www.coindesk.com/business/2025/05/07/98-of-tokens-on-pump-fun-have-been-rug-pulls-or-an-act-of-fraud-new-report-says — **(só snippet)**
- Chainstack — detecção de mints pump.fun (Geyser): https://docs.chainstack.com/docs/solana-listening-to-pumpfun-token-mint-using-geyser — **(só snippet)**
- Chainstack — Token-2022 fee vs transfer hooks: https://chainstack.com/solana-token-2022-fee-transfer-hooks/ — **(só snippet)**
- SolBundler — evitar rug pull pump.fun: https://solbundler.app/blog/pump-fun-rug-pull-avoid — **(só snippet)**
- Subglow — rastrear carteiras dev pump.fun: https://subglow.io/guides/track-pump-fun-whale-wallets — **(só snippet)**
- Helius Orb — mint/freeze/update authority (pump.fun revoga update por padrão): https://www.helius.dev/docs/orb/explore-authorities — **(só snippet)**
- Alphecca — revogar autoridades / metadata mutável: https://alphecca.io/en/blog/revoke-authority-solana — **(só snippet)**
- Cakes on Solana — metadata como vetor de scam: https://medium.com/@cakesonsolana/cooking-by-numbers-solana-token-metadata-ff9366a0a772 — **(só snippet)**
- DEV.to — traps de Token-2022 (RugCheck lê mint): https://dev.to/mrwizardlyloaf/token-2022-traps-that-drain-ai-trading-agents-and-how-to-screen-them-33bo — **(só snippet)**
- DEV.to — freeze authority é o honeypot da Solana: https://dev.to/mrvlyouknowwho/freeze-authority-is-the-solana-honeypot-how-to-check-any-spl-token-in-10-seconds-free-no-wallet-15h4 — **(só snippet)**
- DEV.to — honeypot.is / GoPlus (simulação de venda EVM): https://dev.to/mrvlyouknowwho/how-to-spot-a-honeypot-token-before-you-buy-and-automate-the-whole-checklist-3n6b — **(só snippet)**
- GoPlus — suporte a Solana e Token-2022 Extension: https://www.binance.com/en/square/post/13751265235810 — **(só snippet)**
- ApeSpace / Cube — simulação de venda e aviso sobre proxy: https://apespace.io/honeypot/0x591ebebb8f70755db403b467360c0578ef181a3b ; https://www.cube.exchange/what-is/honeypot-token — **(só snippet)**
- EigenPhi — trap tokens (EVM, manipulação de pool): https://eigenphi.substack.com/p/trap-tokens-rug-pulling-liquidities — **(só snippet)**
- MEXC/crypto.news — pump.fun limita troca de carteira de taxa (vamping, 24/03/2026): https://www.mexc.com/tr-CT/news/981354 — **(só snippet)**
- Backpack — Bonk.fun em Raydium LaunchLab (SPL): https://learn.backpack.exchange/articles/what-is-bonk-fun-solana — **(só snippet)**
- coinlaw.io — estatísticas memecoin 2026 (graduação 0,26%; Chainalysis): https://coinlaw.io/memecoin-statistics/ — **(só snippet)**

**Acadêmico (Scholar Gateway):**
- Ertam, F., Kucuk, D., & Kilincer, I. F. (2025). *A Novel Feature Extraction and Detection Model for Phishing Scam on Ethereum Using Machine Learning*. Concurrency and Computation, 38(1). DOI 10.1002/cpe.70503 — honeypots ~1–3% dos tokens Ethereum; falso-negativo 18,54% — **(abstract/chunks abertos)**
- arXiv 2602.14860v1 — *Predicting the success of new crypto-tokens: the Pump.fun case* (graduação 0,63%; criador só pode agir via trading) — **(página aberta)**
- arXiv 2309.04700 — *From Programming Bugs to Multimillion-Dollar Scams: Trapdoor Tokens on Uniswap* (honeypot.is retorna UNKNOWN sem liquidez) — **(página aberta)**

**Via subagente (Fact 1 e Fact 2):**
- DeepWiki pump-fun/pump-public-docs — create=SPL clássico, create_v2=Token-2022: https://deepwiki.com/pump-fun/pump-public-docs/3-pump-program — **(página aberta pelo subagente)**
- Chainstack — create_v2 usa Token2022 / Mayhem Mode: https://chainstack.com/trading-bot-update-full-mayhem-mode-support-for-pump-fun/ — **(página aberta pelo subagente)**
- Offside Security / Blueshift / Solana docs — atraso de 2 epochs no SetTransferFee como anti-rug — **(páginas abertas pelo subagente)**

---

## (7) Consultas de busca feitas (todas em 12/09/2026)

1. `pump.fun token program SPL classic or token-2022`
2. `pump.fun docs fees breakdown creator 0.3%`
3. `token-2022 MAX_FEE_BASIS_POINTS transfer fee 100%`
4. `token-2022 transfer fee increased rug scam SetTransferFee`
5. `pump.fun dev dump creator sold percentage study`
6. `RugCheck transfer fee token-2022 extension detection`
7. `Metaplex token metadata isMutable updateAuthority mutable`
8. `pump.fun token program Tokenkeg SPL classic mint address`
9. `solana transfer hook extension arbitrary logic block transfer`
10. `honeypot.is GoPlus solana token security simulate sell`
11. `pump.fun creator sells within hours percentage rug study 2025`
12. `pump.fun token metadata update authority revoked immutable after launch`
13. `Solscan token page "Token Extensions" transfer fee field display`
14. `Bonk.fun LetsBonk Moonshot Believe token program token-2022 or SPL`
15. `CWIF token-2022 transfer fee 5% Solana catwifhat`
16. `how to check pump.fun dev wallet sold Solscan creator holdings step by step`
17. `pump.fun create_v2 token-2022 instruction which program mints actual token 2026`
18. `GoPlus Solana token security API transfer fee transfer hook detection reads mint`
19. (tentadas, orçamento esgotado) `token metadata changed after launch scam impersonation Solana rugcheck` e `EVM proxy contract upgradeable token change tax after buyers rug`

Buscas acadêmicas (Scholar Gateway): "prevalência de rug pulls e dev dumps no pump.fun"; "prevalência de honeypots em Ethereum/BSC".
Páginas abertas com TinyFish: pump.fun/docs/fees; github.com/pump-fun/pump-public-docs; solscan.io (token CWIF); rugcheck.xyz (token CWIF).
Subagente: resolução SPL clássico × Token-2022 no pump.fun + busca por caso de SetTransferFee.

---

## (8) CHECKPOINT FINAL (obrigatório)

**O que ficou 100% confirmado com fonte aberta agora:**
- SPL clássico **não** tem taxa de transferência; Token-2022 tem via `TransferFeeConfig`; teto = 100% (10.000 bps) — código oficial.
- `SetTransferFee` vale só **2 epochs (~4 dias) depois** — doc oficial Solana; funciona como trava anti-rug.
- pump.fun bonding curve = **1,25% total, 0,300% ao criador** — pump.fun/docs/fees (confirma o dado de Victor); taxa de criador continua no PumpSwap em escala móvel.
- pump.fun usa **duas** instruções: `create` (SPL clássico) e `create_v2` (**Token-2022**, desde fim de 2025) — logo "todo token pump.fun é SPL clássico" **não é mais verdade absoluta**.
- Bonk.fun/LetsBonk e Raydium LaunchLab criam **SPL clássico** (doc Raydium).
- pump.fun **revoga a update authority por padrão** → metadata imutável (reduz risco de metadata mutável no mercado principal de Victor).
- 98,6% dos tokens pump.fun viraram pó (Solidus Labs); honeypots ~1–3% dos tokens Ethereum (Ertam et al. 2025, revisado por pares).

**O que ficou NÃO VERIFICADO (ver seção 5):** caso nomeado de aumento de taxa via SetTransferFee; caso nomeado de troca de metadata pós-compra na Solana; padrão de token de Moonshot/Believe/Bags; leitura ao vivo do "Token Program" de um token pump.fun comum no Solscan; números de PermanentDelegate/perdas do RugCheck; prevalência de AMM customizado malicioso; dados primários da Arkham; se o RugCheck simula venda ou só lê a extensão para Token-2022.

**CONTINUA — faltam:** nada de seção inteira; o relatório cobre os quatro acréscimos, as três formas de perda, a tabela final, os NÃO VERIFICADOS, as fontes e as consultas. Os pontos em aberto são pontuais e estão listados na seção (5), não seções faltantes. Para fechar os itens 1–4 dos NÃO VERIFICADOS, o próximo passo é abrir ao vivo, no Solscan, (a) um token pump.fun comum recém-criado e (b) um token de Moonshot/Believe/Bags, e ler o campo "Token Program" e a aba Extensions — checagem que o próprio checklist do curso ensina.