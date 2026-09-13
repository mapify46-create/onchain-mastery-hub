# Correção — Módulo "Ler a tela" (12/09/2026)

*Entrega apenas das seções alteradas, cada uma inteira, na ordem pedida. Leitor: Victor (sem formação em programação). Rede: Solana. Data de referência: setembro de 2026; hoje 12/09/2026.*

---

## TL;DR (corrigido — 12/09/2026)

- **Correção principal:** o documento anterior estava errado. Hoje, os tokens criados pelo pump.fun **são Token-2022** (o segundo programa de token da Solana), e **não** SPL clássico. Verificação do usuário via RPC público (método getMultipleAccounts, encoding jsonParsed) em 11–12/09/2026: 24 de 24 tokens do pump.fun têm como programa dono `TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb` (Token-2022), inclusive o CATE (mint `Ai66LHZG9MCzg1WKdawwqduVAXpNDUuV8M3uyq5ppump`) e até um token com is_mayhem_mode = false. O BONK, usado como controle, deu `Tokenkeg…` (SPL clássico), confirmando que o método distingue os dois programas.
- **O que checar mudou:** a pergunta "é SPL clássico?" perdeu sentido em token do pump.fun. O que importa agora é **"quais extensões o mint tem?"**. O padrão esperado é exatamente duas: **metadataPointer + tokenMetadata**. Qualquer extensão além dessas (transferFeeConfig, transferHook, permanentDelegate, defaultAccountState, pausable, nonTransferable) foge do padrão e é **alerta**. Token-2022 em si **NÃO** é sinal de perigo; perigosa é a **extensão adicional**.
- **Data em que virou padrão:** a instrução `create_v2` (que cria Token-2022) foi ativada em **12/11/2025 12:00 UTC** (reagendada de 11/11). **NÃO VERIFICADO:** nenhuma fonte oficial diz que create_v2 virou o padrão/único caminho da interface do pump.fun; a instrução legada `create` (SPL clássico via Metaplex) continua oficialmente ativa, com depreciação "a anunciar". LetsBonk/Bonk.fun e Raydium LaunchLab continuam criando SPL clássico.

---

## Seção (2) — Nota sobre metadata mutável (corrigido — 12/09/2026)

**Explicação de termos (primeira vez):**
- **Extensão (extension):** recurso opcional que só o Token-2022 permite anexar ao *mint* (a conta que define o token). O SPL clássico não tem extensões.
- **metadataPointer (Metadata Pointer):** extensão que guarda no mint dois campos — uma **authority** (quem pode redirecionar o ponteiro para outra conta de metadados) e o **endereço da conta** que contém os metadados. Nos tokens do pump.fun esse endereço aponta para o próprio mint.
- **tokenMetadata (Token Metadata):** extensão que guarda os metadados direto no mint. Segundo a documentação oficial, a struct `TokenMetadata` tem os campos: `update_authority`, `mint`, `name` (nome), `symbol` (símbolo), `uri` (link para o JSON externo) e `additional_metadata` (pares chave-valor).
- **updateAuthority:** a chave autorizada a alterar os metadados. Na interface oficial é um `OptionalNonZeroPubkey` — se for tudo zero, é interpretado como `None` (nulo), e os metadados ficam imutáveis.
- **jsonParsed:** modo de leitura do RPC da Solana que devolve os dados da conta já decodificados em campos legíveis.

**"O que pode mudar depois que você comprou, e quem pode mudar" (corrigido):**
Para tokens do pump.fun (Token-2022), o nome/símbolo/logo do token vivem na extensão **tokenMetadata**, gravada no **próprio mint** — não numa conta separada do Metaplex. Quem pode mudar é o **update_authority** dessa extensão. Nos tokens verificados pelo usuário, o updateAuthority estava **nulo em 11 de 11 checados**, ou seja, os metadados já nascem imutáveis. Isso bate com a Helius, que registra: "revoking a token's update authority is the default for all new Pump.fun tokens" (helius.dev/docs/orb/explore-authorities, consultado 12/09/2026).

Há uma **segunda porta**: a **authority do metadataPointer**, que pode redirecionar o ponteiro para outra conta de metadados. Se essa authority estiver ativa, em tese o dono poderia apontar o token para outro conjunto de metadados; por isso convém checar as duas.

Para tokens **SPL clássicos** criados fora do pump.fun (LetsBonk/LaunchLab, criadores manuais), o caminho é outro: os metadados ficam numa conta do **Metaplex Token Metadata** (uma PDA — Program Derived Address ligada ao mint), e o que vale é o par **isMutable / updateAuthority** dessa conta.

**"Como checar campo a campo" (corrigido):**
- **Token do pump.fun (Token-2022):** no RPC com jsonParsed, leia `account.data.parsed.info.extensions`. Procure a extensão `"tokenMetadata"` e o campo `"updateAuthority"` (esperado: `null`). Procure também a extensão `"metadataPointer"` e o campo `"authority"` (quem pode redirecionar o ponteiro). No Solscan, veja a aba **Extensions / Metadata**.
- **Token SPL clássico (fora do pump.fun):** olhe a conta Metaplex Token Metadata — campo **isMutable** (true = mutável) e **updateAuthority**.
- **Documentação oficial (Token-2022 — "Metadata Pointer & Token Metadata", solana.com/docs/tokens/extensions/metadata, consultado 12/09/2026):** descreve a struct `TokenMetadata` (update_authority, mint, name, symbol, uri, additional_metadata) e as instruções — **UpdateField** (adiciona/atualiza um campo; "Must be signed by the update authority"), **UpdateAuthority** ("Rotates the metadata update authority, or clears it entirely to make metadata immutable" — definir `None` = revogar) e **Emit** (devolve os metadados). O **metadataPointer** tem sua própria `authority` e uma instrução Update (`MetadataPointerInstruction::Update`) que "Updates the metadata address stored by the mint's metadata pointer extension." A interface está em spl-token-metadata-interface (docs.rs/crate/spl-token-metadata-interface/latest e github.com/solana-program/token-metadata), que define `update_authority` como `OptionalNonZeroPubkey` ("if all zeroes, interpreted as None").

**"Nota tranquilizadora" (corrigido):**
A conclusão de **risco baixo no pump.fun se mantém** — mas pelo mecanismo certo. Nos tokens do pump.fun verificados, o `updateAuthority` do **tokenMetadata** está nulo, então nome/símbolo/logo **não** podem ser alterados depois. **Não é o Metaplex** que garante isso (esse é o caminho dos SPL clássicos), e sim a extensão **tokenMetadata do Token-2022 com updateAuthority nulo**. Fica o lembrete: cheque também a **authority do metadataPointer** — mesmo com metadados imutáveis, uma authority de ponteiro ativa poderia, em tese, redirecionar para outra conta de metadados.

---

## Seção (3) — "pump.fun × Token-2022 — a resposta com todas as letras" (corrigido — 12/09/2026)

**Estado atual (corrigido):** tokens criados pelo pump.fun hoje são **Token-2022** (programa dono `TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb`), com exatamente duas extensões — **metadataPointer + tokenMetadata** — e sem outras extensões. Mint authority e freeze authority nulas; updateAuthority do tokenMetadata nulo. Isso corrige o TL;DR antigo ("a maioria absoluta é SPL clássico") e a frase antiga ("um token comum ainda tende a ser SPL clássico; um de Mayhem Mode / cashback é Token-2022"): a distinção **não é mais** Mayhem/cashback vs. comum — praticamente **todo token novo do pump.fun sai como Token-2022**, com ou sem Mayhem Mode.

**Como chegamos aqui (com datas e links):**
- Em novembro de 2025 o pump.fun introduziu a instrução **create_v2**, que usa o programa Token-2022 em vez do Metaplex legado. Fonte oficial: pump-fun/pump-public-docs, README — "We will move to a new standard of token creation with a new instruction called create_v2. This instruction will use the Token2022 program for minting tokens and managing metadata, replacing the legacy Metaplex approach. The original create instruction will also be active and will be deprecated at a later time (to be announced)." (github.com/pump-fun/pump-public-docs, consultado 12/09/2026).
- **Data de ativação: 12/11/2025 12:00 UTC** (reagendada de 11/11). Fonte oficial: canal Telegram "Pump Developer Updates" (t.me/s/pump_tech_updates) — o anúncio original dizia "Any new coin created after 11th November at 12:00 UTC with create_v2 will be owned by the Token2022 program", com correção posterior movendo a ativação para 12/11. Consultado 12/09/2026.
- **NÃO VERIFICADO:** nenhuma fonte oficial do pump.fun diz a data em que create_v2 virou o **padrão/único caminho** da interface, nem afirma que 100% dos tokens novos são Token-2022. A documentação oficial ainda descreve a instrução legada `create` como **ativa**, com depreciação "a anunciar". Sinais não oficiais indicam a virada de fato: a Chainstack (26/11/2025) afirma "Pump.fun has introduced a new token creation instruction called create_v2, which uses the Token2022 program instead of the legacy Metaplex standard", descrevendo um período de transição em que as duas instruções coexistem (chainstack.com/trading-bot-update-full-mayhem-mode-support-for-pump-fun); e o SDK comunitário nirholas/pump-fun-sdk marca "createInstruction is deprecated. Use createV2Instruction for all new token creation" (github.com/nirholas/pump-fun-sdk). A verificação do usuário (24/24 Token-2022 em 11–12/09/2026) mostra que, **na prática**, o que sai hoje é Token-2022.
- **Mayhem Mode e Cashback:** create_v2 tem um parâmetro `is_mayhem_mode` (true/false); o usuário achou um token com `is_mayhem_mode = false` que ainda é Token-2022, confirmando que Token-2022 **não** depende de Mayhem. Cashback coins foram **descontinuados** — o próprio create_v2 rejeita `is_cashback_enabled = true`: "Cashback mode is deprecated. create_v2 rejects is_cashback_enabled = [true], so no new cashback coins can be created." (github.com/pump-fun/pump-public-docs, consultado 12/09/2026).

**Consequência para o leitor, com todas as letras:** em token do pump.fun, a checagem "**é SPL clássico?**" perdeu sentido — a resposta será quase sempre "não, é Token-2022", e isso sozinho **não diz nada** sobre risco. O que importa é **"quais extensões ele tem?"**. O padrão esperado é **exatamente duas**: metadataPointer + tokenMetadata. Qualquer extensão **além** dessas — transferFeeConfig (taxa por transferência), transferHook (programa que roda a cada transferência, pode travar a venda), permanentDelegate (autoridade que transfere/queima seus tokens sem sua assinatura), defaultAccountState (conta nasce congelada), pausable (transferências podem ser pausadas), nonTransferable (não pode vender) — **foge do padrão e é alerta**. Token-2022 em si **NÃO** é sinal de perigo (é o padrão do pump.fun agora); perigosa é a **extensão adicional**.

**Contraste com outros launchpads (reconfirmado):** LetsBonk/Bonk.fun e Raydium LaunchLab criam **SPL clássico** (programa dono `Tokenkeg…`), não Token-2022. Doc Raydium: "LaunchLab does not support Token-2022 for the base mint (it creates classic SPL mints)." (docs.raydium.io/algorithms/token-2022-transfer-fees, consultado 12/09/2026). Ou seja, o **programa dono do mint** ainda serve para distinguir a origem: `Tokenz…` (`TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb`) = pump.fun; `Tokenkeg…` (`TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA`) = LetsBonk/LaunchLab ou criador manual.

*(Frase pontual de outra subseção afetada pela nova realidade, para citar sem reescrever a subseção inteira: onde o documento anterior dizia que uma taxa embutida — SetTransferFee/TransferFeeConfig — "só apareceria em tokens fora do pump.fun, que costumam ser Token-2022, enquanto o pump.fun é SPL clássico", a correção é: o pump.fun agora **também** é Token-2022, mas sem transferFeeConfig; a presença de transferFeeConfig num token do pump.fun seria justamente a anomalia/alerta. A mecânica do SetTransferFee em si — só existe em Token-2022, nasce com o token, muda só duas epochs depois, teto MAX_FEE_BASIS_POINTS = 10.000 — permanece correta e não foi reescrita.)*

---

## Seção (4) — Tabela final "vetor → onde checar (ferramenta + nome do campo) → sinal de alerta" (corrigido — 12/09/2026)

| Vetor | Onde checar (ferramenta + campo) | Sinal de alerta |
|---|---|---|
| **Extensões do mint (Token-2022)** — para token do pump.fun (substitui a linha antiga "Padrão do token: SPL clássico × Token-2022") | RPC jsonParsed: `data.parsed.info.extensions`; ou Solscan aba **Extensions** | Padrão esperado = **metadataPointer + tokenMetadata** apenas. **Qualquer** extensão extra (transferFeeConfig, transferHook, permanentDelegate, defaultAccountState, pausable, nonTransferable) = **alerta** |
| **Programa dono do mint** (só para distinguir origem) | RPC: campo `owner`; Solscan: "Owner Program" | pump.fun = `Tokenz…` (Token-2022); LetsBonk/LaunchLab = `Tokenkeg…` (SPL clássico). **Não é sinal de risco por si só** — serve para saber qual caminho de metadata usar |
| **Autoridade de cunhagem (mint authority)** | RPC: `mintAuthority`; Solscan: "Authority" | Não-nula = podem cunhar mais tokens. Em pump.fun é **nula** por padrão |
| **Autoridade de congelamento (freeze authority)** | RPC: `freezeAuthority`; Solscan | Não-nula = podem congelar sua conta. Em pump.fun é **nula** por padrão |
| **Metadata mutável — pump.fun (Token-2022)** | RPC: extensão `tokenMetadata` → `updateAuthority`; e `metadataPointer` → `authority`; Solscan aba Metadata/Extensions | updateAuthority não-nulo = podem trocar nome/símbolo/logo; authority do metadataPointer ativa = podem redirecionar o ponteiro |
| **Metadata mutável — SPL clássico (fora do pump.fun)** | Conta Metaplex Token Metadata: `isMutable` e `updateAuthority` | isMutable=true / updateAuthority ativa = metadados podem mudar |
| **Taxa de transferência (só Token-2022)** | RPC: extensão `transferFeeConfig` | Presença da extensão = taxa embutida; ver transfer_fee_basis_points e maximum_fee |

**Nomes reais dos campos (verificação nas ferramentas, com registro de abertura):**
- **Solscan** — https://solscan.io/token/Ai66LHZG9MCzg1WKdawwqduVAXpNDUuV8M3uyq5ppump (CATE): a página é renderizada por JavaScript e **não abriu** no fetch direto — **(só snippet)**. Pelo texto indexado do Solscan, os campos e valores são: "**Owner Program · Token 2022 Program** `TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb`"; "**Token Extensions · True**"; "**Authority · N/A**" (mint authority revogada); "**Decimals · 6**"; "**Creator ·** `D9gQ6RhKEpnobPBUdWY5bPQt2p3zGk3iVz6ChpUi2ArA`".
- **RugCheck** — https://rugcheck.xyz/tokens/Ai66LHZG9MCzg1WKdawwqduVAXpNDUuV8M3uyq5ppump: exige JavaScript; retornou "We're sorry but ... doesn't work properly without JavaScript enabled." **(só snippet — não renderizou)**.
- **Solana Explorer (alternativa)** — https://explorer.solana.com/address/Ai66LHZG9MCzg1WKdawwqduVAXpNDUuV8M3uyq5ppump: retornou erro HTTP 429 (too many requests). **(não abriu)**.
- **Confirmações do CATE** (owner = Token-2022; mint e freeze authority revogadas) vieram do texto indexado do Solscan e de auditoria de terceiros. **NÃO VERIFICADO de forma renderizada:** a lista literal das duas extensões (metadataPointer + tokenMetadata) e o valor do `updateAuthority` do tokenMetadata para o CATE — nenhuma página de explorer renderizou esses campos exatos. O padrão (owner Token-2022, duas extensões, authorities nulas, updateAuthority nulo) foi confirmado **pelo usuário via RPC** nos 24 tokens em 11–12/09/2026.

---

## Seção (5) — NÃO VERIFICADOS (corrigido — 12/09/2026)

- **RESOLVIDO:** "confirmação ao vivo do Token Program de um token pump.fun" — **verificado pelo usuário via RPC em 11–12/09/2026: 24/24 tokens do pump.fun são Token-2022** (dono `Tokenz…`), com metadataPointer + tokenMetadata, sem outras extensões, mint/freeze authority nulas e updateAuthority do tokenMetadata nulo (11/11 checados). BONK de controle deu `Tokenkeg` (SPL clássico).
- **EM ABERTO — NÃO VERIFICADO:** a data exata em que create_v2 virou o **padrão/único caminho** da interface do pump.fun. Só há a data de **ativação** (12/11/2025 12:00 UTC) e a informação de que a instrução legada `create` continua oficialmente ativa.
- **EM ABERTO — NÃO VERIFICADO:** se/quando a instrução legada `create` (SPL clássico via Metaplex) será desligada. Docs oficiais dizem "a ser anunciado".
- **EM ABERTO — NÃO VERIFICADO (renderização):** leitura renderizada da aba **Extensions** do CATE em Solscan/RugCheck/Explorer (todas exigem JS ou deram erro 429); a lista literal de extensões e o updateAuthority do tokenMetadata do CATE não foram lidos numa página de explorer, só confirmados via RPC pelo usuário.

---

## Seção (6) — Fontes (corrigido — 12/09/2026)

**Correção de inconsistência apontada pelo usuário:** as duas fontes abaixo estavam no corpo do texto como "páginas abertas" mas listadas como "só snippet". Reabertas agora e remarcadas pelo que de fato aconteceu:

- **Solidus Labs — "The 2025 Rug Pull Report: Rug Pulls and Pump-and-Dumps on Solana"** — https://www.soliduslabs.com/reports/solana-rug-pulls-pump-dumps-crypto-compliance — **(página aberta, 12/09/2026)**. Confere com os números, verbatim: "Over 7 million tokens deployed with at least five trades, but only 97,000 tokens maintain liquidity above $1,000"; "A staggering **98.6% of tokens** on Pump.fun collapse into worthless pump-and-dump schemes shortly after launch". Período do estudo: janeiro/2024 a março/2025. **Precisão importante:** o resumo executivo usa "~98.7%" e a seção do Pump.fun usa 98,6%; a metodologia da própria página deixa claro que 98,6% = "the percentage of tokens on Pump.fun that have fallen under $1,000 worth of liquidity measured in SOL, and are thus, essentially worthless" — ou seja, **colapso de liquidez, não fraude criminal provada**. O **MToken US$ 1,9M é o maior rug pull do Raydium** ("The largest detected rug pull totaled $1.9 million"), dentro da análise de 388.000 pools onde "Approximately 93% (361,000 pools) exhibited soft rug pull characteristics" (median ≈ US$ 2.832) — **não** um número do pump.fun.
- **CoinDesk — "Pump.fun Hits Back at Report That Claimed 98% of Memecoins on the Platform Are Fraudulent"** (08/05/2025, atualizado 09/05/2025) — https://www.coindesk.com/business/2025/05/07/98-of-tokens-on-pump-fun-have-been-rug-pulls-or-an-act-of-fraud-new-report-says — **(página aberta, 12/09/2026)**. Confirma verbatim: "98.6% of tokens launched on Pump.fun were rug pulls or pump and dump schemes"; "just 97,000 of the seven million launched on pump.fun have maintained at least $1,000 in liquidity"; "The largest rug pull Solidus Labs identified over the time period was worth $1.9 million and was related to MToken"; e "93% of liquidity pools on Raydium also exhibited soft rug pull characteristics". Traz a réplica do pump.fun (porta-voz Troy Gravitt): "What Solidus Labs lacks is a basic understanding of memecoins."

**Novas fontes desta correção:**
- **pump-public-docs (README + repositório)** — https://github.com/pump-fun/pump-public-docs — **(página aberta, 12/09/2026)**. create_v2 usa Token-2022 substituindo o Metaplex; legada `create` ainda ativa, depreciação a anunciar; cashback descontinuado (create_v2 rejeita is_cashback_enabled=true).
- **Pump Developer Updates (Telegram oficial)** — https://t.me/s/pump_tech_updates — **(página aberta, 12/09/2026)**. Ativação de create_v2 + Mayhem Mode em 12/11/2025 12:00 UTC (reagendada de 11/11); "Any new coin created after 11th November at 12:00 UTC with create_v2 will be owned by the Token2022 program."
- **Chainstack — "Trading bot update: Full Mayhem Mode support for Pump.fun"** (26/11/2025) — https://chainstack.com/trading-bot-update-full-mayhem-mode-support-for-pump-fun/ — **(página aberta, 12/09/2026)**. "Pump.fun has introduced a new token creation instruction called create_v2, which uses the Token2022 program instead of the legacy Metaplex standard"; período de transição com as duas instruções coexistindo.
- **Solana Docs — "Metadata Pointer & Token Metadata"** — https://solana.com/docs/tokens/extensions/metadata — **(página aberta, 12/09/2026)**. Struct e instruções UpdateField/UpdateAuthority/Emit; metadataPointer com authority própria e instrução Update.
- **spl-token-metadata-interface** — https://docs.rs/crate/spl-token-metadata-interface/latest e https://github.com/solana-program/token-metadata — **(página aberta via busca, 12/09/2026)**. Struct `TokenMetadata` (update_authority = OptionalNonZeroPubkey; se tudo zero = None), instruções UpdateField/UpdateAuthority/Emit.
- **Raydium Docs — "Token-2022 transfer fees in swaps"** — https://docs.raydium.io/algorithms/token-2022-transfer-fees — **(página aberta, 12/09/2026)**. "LaunchLab does not support Token-2022 for the base mint (it creates classic SPL mints)"; endereços dos dois programas de token.
- **Helius Docs — "How to Find Solana Mint, Freeze, and Update Authority"** — https://www.helius.dev/docs/orb/explore-authorities — **(página aberta via busca, 12/09/2026)**. "revoking a token's update authority is the default for all new Pump.fun tokens"; update authority faz parte tanto do Metaplex quanto da Metadata Extension do Token-2022.
- **Solscan (CATE)** — https://solscan.io/token/Ai66LHZG9MCzg1WKdawwqduVAXpNDUuV8M3uyq5ppump — **(só snippet, 12/09/2026)** — página JS não renderizou no fetch.
- **RugCheck (CATE)** — https://rugcheck.xyz/tokens/Ai66LHZG9MCzg1WKdawwqduVAXpNDUuV8M3uyq5ppump — **(só snippet / não abriu, 12/09/2026)** — exige JavaScript.
- **Solana Explorer (CATE)** — https://explorer.solana.com/address/Ai66LHZG9MCzg1WKdawwqduVAXpNDUuV8M3uyq5ppump — **(não abriu, 12/09/2026)** — erro HTTP 429.

**Reavaliação da afirmação ">40% dos novos tokens Solana carregam PermanentDelegate":** essa estatística é sobre **novos tokens Solana em geral**, **NÃO** sobre tokens do pump.fun. Fonte primária: DEV.to (março/2026) — "RugCheck.xyz flags over 40% of new Solana tokens as using this extension [Permanent Delegate]" e "In Q1 2026 alone, conservative estimates put losses from Token-2022 extension abuse at $50M+" (dev.to/ohmygod/solanas-permanent-delegate-burn-scam..., consultado 12/09/2026). Corroborado pela SolanaHub: "RugCheck.xyz flags more than 40 percent of all new Solana tokens as permanent-delegate-enabled" (solanahub.de/en/knowledge/token-2022-solana-stablecoin-standard-explained, consultado 12/09/2026). São análises de terceiros (não auditadas), citando o RugCheck; **trate como estimativa, não como número oficial**. A afirmação **não contradiz** o achado do usuário de zero permanentDelegate em 24/24 tokens pump.fun: o pump.fun **não usa** permanentDelegate; o ">40%" se refere ao universo mais amplo de tokens Token-2022 na Solana (muitos criados por ferramentas de scam **fora** do pump.fun). **Mantida, mas rebaixada de "fato" para "estimativa de terceiro sobre tokens Solana em geral, não pump.fun".**

---

## Seção (7) — Consultas de busca desta correção (12/09/2026)

1. pump.fun create_v2 Token-2022 default launch
2. pump.fun Mayhem Mode Token-2022 announcement
3. pumpdotfun Token-2022 migration all new tokens
4. pump.fun all new tokens Token-2022 create_v2 default December 2025
5. pump.fun create_v2 default all tokens token-2022 2026
6. pump.fun is_cashback_coin cashback coin token-2022
7. pump-public-docs github create_v2 IDL token 2022
8. solana.com docs token extensions metadata pointer token metadata update authority
9. spl-token-metadata-interface TokenMetadata struct update_authority UpdateField UpdateAuthority
10. Raydium docs token-2022 transfer fees LaunchLab SPL classic
11. Solidus Labs pump.fun 98.6% tokens rug pull report
12. CoinDesk 98% tokens pump.fun rug pulls fraud report Solidus
13. explorer.solana.com CATE token pump extensions
14. 40% new Solana tokens permanent delegate rugcheck
15. Token-2022 permanent delegate scam risk new tokens percentage
16. CATE coin pump graduated July 2026 token 2022
17. pump.fun legacy create deprecated all tokens token2022 default 2026
18. LetsBonk bonk.fun token SPL classic Tokenkeg not token-2022

**Páginas abertas (web_fetch/TinyFish):** pump-public-docs README; solana.com/docs/tokens/extensions/metadata; Chainstack; Solidus Labs; CoinDesk. **Tentativas que não renderizaram:** Solscan (CATE), RugCheck (CATE), Explorer (CATE, erro 429). Subagente de reforço acionado (1/1) para a data do create_v2 como padrão e para o estado on-chain do CATE.

---

## Seção (8) — CHECKPOINT FINAL (corrigido — 12/09/2026)

Estado corrigido do módulo:
1. **Token do pump.fun = Token-2022** (dono `Tokenz…`), padrão de duas extensões: metadataPointer + tokenMetadata. Mint/freeze authority nulas; updateAuthority do tokenMetadata nulo. Verificado pelo usuário via RPC (24/24) em 11–12/09/2026.
2. **A pergunta certa** ao ler a tela de um token pump.fun não é "é SPL clássico?" e sim **"quais extensões tem?"**. Duas = padrão; qualquer extra = alerta.
3. **Token-2022 ≠ perigo.** É o padrão do pump.fun. O perigo é a **extensão adicional** (transferFeeConfig, transferHook, permanentDelegate, defaultAccountState, pausable, nonTransferable).
4. **Metadata:** em pump.fun olhe `tokenMetadata.updateAuthority` (+ `metadataPointer.authority`); em SPL clássico (LetsBonk/LaunchLab/manual) olhe Metaplex `isMutable/updateAuthority`.
5. **Origem pelo dono do mint:** `Tokenz…` = pump.fun; `Tokenkeg…` = LetsBonk/LaunchLab. (Reconfirmado com doc Raydium.)
6. **Datas:** create_v2 ativo desde **12/11/2025 12:00 UTC**; "virou padrão/único" e "desligamento do legado" = **NÃO VERIFICADO**.
7. **Fontes de fraude (Solidus/CoinDesk):** reabertas e marcadas como **páginas abertas**; 98,6% = colapso de liquidez (<US$ 1.000), não fraude criminal provada; MToken US$ 1,9M é o maior rug do **Raydium**.
8. **PermanentDelegate >40%:** estimativa de terceiro (DEV.to / SolanaHub) sobre tokens Solana em geral, **não** pump.fun; rebaixada de fato para estimativa.

**Não permanece nada inacabado** além dos itens marcados NÃO VERIFICADO na Seção (5).

---

*O que continua certo e não foi reescrito (só citado onde a nova realidade mudou uma frase pontual): mecânica do SetTransferFee (só Token-2022 / TransferFeeConfig, nasce com o token, muda só duas epochs depois, teto MAX_FEE_BASIS_POINTS = 10.000); tabela de taxas do pump.fun (bonding curve 1,25% total, 0,300% criador; escala móvel no PumpSwap); LetsBonk/Bonk.fun e LaunchLab em SPL clássico; seção (1) dev dump, seção (3) tax token/honeypot e comparação EVM.*