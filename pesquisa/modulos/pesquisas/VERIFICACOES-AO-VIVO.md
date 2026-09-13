# Verificações ao vivo — o que conferi quando as pesquisas voltaram

> 12/09/2026, atualizado em 13/09/2026. As sete pesquisas voltaram; cinco delas mandaram
> correção. Antes de usar qualquer número, conferi na fonte primária os pontos em que as
> pesquisas divergiam entre si, com o que o projeto já tinha, ou com o que eu mesmo tinha
> dito. **Nos pontos abaixo, esta página prevalece sobre as pesquisas.**

## Resumo

1. **Todo token criado pelo pump.fun hoje é Token-2022, não SPL clássico** — a pesquisa
   3 afirmava o contrário e já foi corrigida. As únicas extensões que o pump.fun põe são de
   metadados: nenhum token da amostra tinha taxa de transferência, delegado permanente ou
   hook.
2. **A taxa da PumpSwap é uma escala que cai de 1,25% a 0,30%** conforme o market cap.
3. **As três ferramentas que a pesquisa 4 não conseguiu abrir abrem aqui**, no navegador
   interno, e a tela delas tem armadilhas de leitura que viram aula do Módulo 6.
4. **Eu errei sobre o "Catching the Rug":** os limiares do rótulo foram publicados (queda
   de 99% do TVL, ou parado por mais de 80% da vida), a Tabela III tem 23 características,
   e o teste do PumpFun tem 81,9% de rugs. Seção 9.
5. **O app publicado tem um erro e uma imprecisão**, achados no caminho: o mínimo da
   gorjeta do Jito está dez vezes acima do real, e a faixa de graduação em dólar é a de 80%
   dos casos, não mínimo e máximo. Seção 10.

---

## 1. Todo token do pump.fun é Token-2022 (corrige a pesquisa 3)

**Método.** Consulta ao RPC público da Solana (`getMultipleAccounts`, `encoding:
jsonParsed`) em 11–12/09/2026. Para cada mint, li o **programa dono** (`owner`) e as
**extensões** (`parsed.info.extensions`). O BONK entrou como controle e deu `Tokenkeg…`
(SPL clássico) — o método distingue os dois programas.

**Amostra:** 26 mints — 22 pools novas do GeckoTerminal (dex `pump-fun` ou `pumpswap`),
os dois tokens do teste do PumpPortal de 11/09, o CATE (graduado em jul/2026) e o BONK.

| O que foi medido | Resultado |
|---|---|
| Tokens criados pelo pump.fun que são Token-2022 (`TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb`) | **24 de 24** — inclusive o de `is_mayhem_mode: false` e o CATE |
| SPL clássico na amostra | 2: o BONK (controle) e um token **sem** o sufixo "pump", numa pool da PumpSwap |
| Extensões nos 24 | **só `metadataPointer` + `tokenMetadata`** |
| `transferFeeConfig` / `permanentDelegate` / `transferHook` | **0 / 0 / 0** |
| Mint authority / freeze authority | **null em todos os 24** |
| `tokenMetadata.updateAuthority` (quem pode trocar nome, símbolo e imagem) | **null em 11 de 11** checados → metadata imutável |
| `metadataPointer.authority` (quem pode redirecionar o ponteiro) | **null em 11 de 11** checados |

**O que estava errado na pesquisa 3** (`P3-vetores-de-contrato.md`), já corrigido em
`P3-vetores-de-contrato-CORRECAO.md`:
- No TL;DR: *"a maioria absoluta dos tokens do pump.fun é SPL clássico"*.
- Na seção "pump.fun × Token-2022": *"Um token comum ainda tende a ser SPL clássico; um
  token de Mayhem Mode / cashback é Token-2022."*

**O que isso muda no checklist.** A pergunta "é SPL clássico? então não pode ter taxa"
deixa de servir para token do pump.fun. A pergunta certa é **"quais extensões ele
tem?"**. O padrão de um token pump.fun legítimo é exatamente `metadataPointer` +
`tokenMetadata`; qualquer extensão além disso quer dizer que o token não saiu do fluxo
padrão.

**Limites.** Amostra de 26, em dois dias. Outros lançadores (LetsBonk, Moonshot, Believe,
Bags) **não** foram checados na cadeia. O número ">40% dos novos tokens Solana com
PermanentDelegate" (RugCheck, via DEV.to) **não** fica refutado para a Solana inteira — só
para o pump.fun, onde deu 0 de 24. O fluxo de criação do pump.fun já mudou uma vez (de
`create` para `create_v2`) e pode mudar de novo: refazer a checagem antes de publicar
qualquer número.

**Para refazer.** Enviar por POST para `https://api.mainnet-beta.solana.com`:

```json
{"jsonrpc":"2.0","id":1,"method":"getMultipleAccounts",
 "params":[["<mint1>","<mint2>"],{"encoding":"jsonParsed"}]}
```

Em cada conta da resposta: `owner` começando com `Tokenz` = Token-2022, com `Tokenkeg` =
SPL clássico; as extensões ficam em `data.parsed.info.extensions`.

---

## 2. A taxa da PumpSwap (resolve o conflito entre as pesquisas 1, 2 e 3)

Página oficial `pump.fun/docs/fees`, **"Last Updated: May 20, 2026"**, aberta em
12/09/2026 e relida em 13/09/2026. Conferi que, em todas as linhas, criador + protocolo +
LP soma o total.

| Onde o token está | Criador | Protocolo | LP | Total |
|---|---:|---:|---:|---:|
| Bonding curve | 0,300% | 0,95% | 0% | **1,25%** |
| PumpSwap canônica, market cap 0–420 SOL | 0,300% | 0,930% | 0,020% | **1,250%** |
| PumpSwap canônica, 420–1.470 SOL | **0,950%** | 0,050% | 0,200% | 1,200% |
| PumpSwap canônica, 4.420–9.820 SOL | 0,750% | 0,050% | 0,200% | 1,000% |
| PumpSwap canônica, 49.120–54.030 SOL | 0,300% | 0,050% | 0,200% | 0,550% |
| PumpSwap canônica, acima de 98.240 SOL | 0,050% | 0,050% | 0,200% | **0,300%** |
| PumpSwap **não** canônica | 0% | 0,05% | 0,25% | **0,3%** |

A tabela oficial tem 25 faixas em SOL e uma escala equivalente em USDC; acima estão as
faixas que mostram o formato. Criar token: 0. Graduar para a PumpSwap: 0,015 SOL. A página
define o market cap da escala como *"the current price of the token in SOL or USDC
multiplied by 1 billion tokens"* — o mesmo cálculo do FDV.

As três pesquisas foram corrigidas para essa escala (1 e 2 nos arquivos `-CORRECAO`; a 3
já estava certa). O Módulo 5 do hub ("1,25% caindo por faixa no PumpSwap") **está certo**.

**Um detalhe que vira conteúdo:** logo depois da graduação (faixa de 420 a 1.470 SOL), a
parte do criador **sobe** para 0,950% — mais de três vezes os 0,300% que ele ganhava na
curva. É logo depois de graduar que o criador mais ganha por negociação.

---

## 3. Graduação em dólar: não copiar o "US$ 69 mil"

A pesquisa 2 original, e o glossário da pesquisa 7, apresentam a graduação como "~US$ 69
mil de market cap". Não é um limiar: a graduação é definida em **tokens** (206.900.000
restam na curva, 793.100.000 foram vendidos), e o valor em dólar flutua. A correção da
pesquisa 2 já trata os US$ 69 mil como valor observado em set/2025, no período do dataset
de Marino et al. Ver a seção 10.2 para a faixa que o app usa.

---

## 4. Uma conta errada no resumo da pesquisa 1 (já corrigida)

O TL;DR da pesquisa 1 dizia que, derrubando o preço em 10%, você recebe ≈2,4% da liquidez,
e em 50%, ≈8,6%. A tabela da seção 2.2 dizia **2,57%** e **14,64%**, e está certa:

| Queda de preço | (1 − √(1 − queda)) ÷ 2 | Você recebe |
|---|---|---:|
| 10% | (1 − 0,9487) ÷ 2 | **2,57%** da liquidez |
| 30% | (1 − 0,8367) ÷ 2 | **8,17%** |
| 50% | (1 − 0,7071) ÷ 2 | **14,64%** |

O chat da pesquisa 1 corrigiu o TL;DR; a correção conferida está em
`P1-numeros-da-tela-CORRECAO.md`.

---

## 5. As ferramentas da pesquisa 4 abrem no navegador daqui

A pesquisa 4 (via TinyFish) só conseguiu renderizar o Bubblemaps. No navegador interno do
app, em 12/09/2026, com o BONK (`DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263`), **as três
outras abriram**:

- **RugCheck:** Score "GOOD", "1 risk", Markets US$ 358K, Insiders "2 networks",
  Holders 2,1M, "Lockers & LP" US$ 54K · 21%.
- **Solscan:** Market Cap US$ 245.152.733, Current Supply, Holders 1.014.349,
  "Authority", "Creator", **"Token Extensions: FALSE"**, **"Owner Program: Token
  Program TokenkegQ…"**, e as abas Transfers, Transactions, Activities, Holders,
  Analytics, Metadata e Markets.
- **DexScreener:** Liquidity US$ 279K, FDV US$ 247,5M, Mkt Cap US$ 245,1M, TXNS, Volume,
  Traders, Buys/Sells, Buyers/Sellers, "Pair created", "Pooled", e a seção Audit com o
  aviso *"Audits may not be 100% accurate!"*.

A pesquisa 4 então fez a parte de documentação (`P4-ferramentas-DOCUMENTACAO.md`); a
conferência das telas campo a campo fica para aqui.

**Corrobora a pesquisa 1 ao vivo:** o mesmo token mostra "Liquidity" de **US$ 279 mil**
no DexScreener (um par só, na Orca) e de **US$ 1.694.390** no Solscan — seis vezes mais,
porque cada site soma um conjunto diferente de pools.

---

## 6. Armadilhas de leitura na tela (conteúdo do Módulo 6)

### 6.1 O preço com zeros compactados

No DexScreener, o código do preço do BONK é:

```html
<span title="$0.000002786">$0.0<span>5</span>2786</span>
```

O **5 fica num elemento separado: é a contagem de zeros, não um dígito**. O preço real é
**US$ 0,000002786** — guardado no `title` (a dica que aparece ao passar o mouse). **Lido
como texto** — copiado, lido às pressas, lido por leitor de tela — ele vira
**"$0.052786"**, cerca de **19 mil vezes** o preço real (0,052786 ÷ 0,000002786 ≈ 18.947).

A pesquisa 4 confirma que essa notação **não está documentada** em nenhuma das
ferramentas, e que a API do DexScreener devolve o preço completo como texto (`priceUsd`).
O Solscan também mostrou "$0.052786" na leitura de texto, mas o código dele **não foi
inspecionado** (NÃO VERIFICADO).

### 6.2 O campo "Authority" do Solscan junta três autoridades

Para o BONK, o Solscan mostra **"Authority: 9AhKqLR67hwapvG8SA2JFXaCshXc9nALJjpKaHZrsbkw"**
(o mesmo endereço do "Creator"), mas na cadeia a mint authority e a freeze authority do
BONK são nulas.

**Explicação, pela documentação do próprio Solscan (pesquisa 4):** o campo é um menu que
lista *"Update - Mint - Freeze Authority"*, e mostra "N/A" quando elas foram revogadas. Se
aparece um endereço com mint e freeze nulas, o que sobrou é a **autoridade de metadados**
— inferência coerente com a documentação, porque o menu não foi clicado. A correção da
pesquisa 3 corrobora pelo outro lado: para o CATE, em que as três são nulas, o Solscan
mostra "Authority · N/A".

Um iniciante lê "Authority: <endereço>" como "o criador ainda pode emitir tokens" — e
conclui o contrário da verdade.

### 6.3 O "Market Cap" do Solscan é totalmente diluído

A documentação do Solscan define o campo como *"com base no preço atual, totalmente
diluído"* — ou seja, o que o DexScreener chamaria de FDV. O mesmo rótulo, "Market Cap",
significa coisas diferentes em sites diferentes.

---

## 7. Prova ao vivo da regra "compre pelo endereço, nunca pelo nome"

Na amostra de 12/09/2026 havia **dois tokens diferentes com o mesmo ticker "SATOSHI"**
(`HZqEHp…pump` e `Fd6ZRj…pump`) e um token com ticker **"Usdt"** e nome "tetber"
(`HYVzb16HP8GbydJJMdvXrSKo3zpc4S4YQDLSQHwbpump`), imitando o ticker de uma stablecoin.

---

## 8. Inconsistências dentro das pesquisas (primeira leva)

- **Pesquisa 6:** listava 8 campos para o diário e dizia 9. **Resolvido na v2**, que
  acrescentou o campo "saída executada" (diff conferido: foi a única mudança de conteúdo).
- **Pesquisa 3:** marcava as páginas da Solidus Labs e da CoinDesk ora como abertas, ora
  como snippet. **Resolvido na correção:** reabertas e marcadas como abertas, com as
  frases literais.
- **Pesquisa 5:** marca o "98,6%" da Solidus como NÃO VERIFICADO. A correção da pesquisa 3
  abriu a página da Solidus e confirmou o número; o hub usa esse número apoiado na Fase 0
  e sempre com a contestação pública da pump.fun ao lado.

---

## 9. Correções minhas sobre o "Catching the Rug" (13/09/2026)

Eu tinha passado ao dono, e ao prompt da pesquisa 7, três informações erradas sobre o
paper. A pesquisa 7 abriu o texto completo e corrigiu. **Conferi lendo o HTML do arXiv
direto, sem resumo automático** — foi resumo automático que gerou os erros.

| O que eu tinha dito | O que o paper diz |
|---|---|
| Os limiares θ e Δt não foram publicados | Foram. Seção V-B: *"We define a rug pull label as a token whose TVL falls below 99% or whose idle time exceeds 80% of its lifetime without trading."* A legenda da Tabela VI repete: *"either 99% TVL drop OR 80% idle time"*. A frase *"empirically selected"* existe, na seção IV-B, mas os valores usados estão adiante |
| A Tabela III tem 22 características | Tem **23**, todas de negociação e liquidez (nenhuma de holders, bundles, autoridades ou redes sociais) |
| No teste do PumpFun, 4.383 rugs contra 9.711 (~31%) | **43.835 contra 9.711 (81,9%)**. No Raydium, 2.931.946 contra 1.893.539 (60,8%) |

Leitura correta do limiar: "falls below 99%" quer dizer **queda de 99%** desde o pico —
é o que dizem a legenda da Tabela VI e a seção IV-B (*"causing TVL to drop by 99%"*).

**Conferido também:** com 81,9% de rugs, o chute "tudo é rug" tem precisão 0,8186 e
revocação 1, logo F1 = 2 × 0,8186 ÷ 1,8186 ≈ **0,90** — acima dos 0,7885 do melhor modelo.
A reconstrução de precisão (~95%) e revocação (~68%) que a pesquisa 7 fez é coerente com
as contagens da Tabela V: refazendo, o MCC dá ≈ 0,40, contra 0,3947 publicado. Continua
sendo estimativa.

**Consequência para o observatório:** o rótulo do paper pode ser o ponto de partida do
nosso. A metade de liquidez continua exigindo fotografar desde já.

---

## 10. Um erro e uma imprecisão no app publicado

### 10.1 O mínimo da gorjeta do Jito está dez vezes acima do real — ERRO

A documentação oficial (`docs.jito.wtf/lowlatencytxnsend`, aberta em 13/09/2026) diz, em
três lugares: *"Jito enforces a minimum tip of 1000 lamports for bundles"*, *"The minimum
tips is 1000 lamports"* e *"The minimum tip is 1000 lamports"*. **1.000 lamports =
0,000001 SOL.**

O app diz **0,00001 SOL** (10.000 lamports), citando essa mesma página:
- `src/data/modulo5.js:570` — tabela das cinco camadas, linha "4. Gorjeta de MEV (Jito)".
- `src/data/modulo5.js:1313` — item "Valor real da gorjeta de MEV no momento", da lista
  de não verificados.

O erro já foi copiado para os prompts `VIDEO-29`, `VIDEO-30`, `VIDEO-31` e `VIDEO-33`.
Nenhuma conta do app usa esse mínimo — a matriz de custo usa o padrão do Axiom, 0,001 SOL
— então o conserto é só no texto. As pesquisas 2 e 2-correção tinham o número certo.

### 10.2 A faixa de graduação está certa, mas é a de 80% dos casos — IMPRECISÃO

O app diz que o valor em dólar na graduação vai de US$ 11 mil a US$ 101 mil
(`glossario.js:98`, `modulo4.js:130`, `cenarios.js:224`). A fonte é o artigo da
Bitquery/Coinmonks, aberto integralmente na Fase 0 (`fase0/P4-ciclo-de-vida-FINAL.md`,
linha 18): *"variou entre ~US$ 11 mil (percentil 10) e ~US$ 101 mil (percentil 90), com
mediana ~US$ 38 mil"*, numa coorte de agosto de 2026.

- **O número está certo.** A correção da pesquisa 2 diz que um market cap de graduação de
  US$ 11 mil seria implausível e marca o valor como NÃO VERIFICADO — ela não encontrou esse
  artigo. Nesse ponto, **a correção da pesquisa 2 está errada**; vale a Fase 0.
- **A redação é imprecisa.** São os percentis 10 e 90: 10% das graduações ficam abaixo de
  US$ 11 mil e 10% acima de US$ 101 mil. O glossário ("varia de ~US$ 11 mil a ~US$ 101
  mil") dá a entender mínimo e máximo. Redação sugerida: "em 80% das graduações de uma
  amostra de agosto de 2026, entre US$ 11 mil e US$ 101 mil; mediana de US$ 38 mil".
- **Natureza da fonte:** autopublicada por fornecedor de dados, reproduzível on-chain —
  corroboração forte, não independente.

### 10.3 Os "~85 SOL" podem não valer para todo token hoje — NÃO VERIFICADO

O app diz que a graduação acontece "por volta de 85 SOL" (`glossario.js:98`,
`modulo4.js:130`, `cenarios.js:224`; também no `VIDEO-24`). A fonte é Marino et al.
(arXiv 2602.14860), com dados de **setembro de 2025** — antes dos pares em USDC
(21/05/2026) e do BOOST (21/07/2026).

**Inferência minha, não verificada:** se o valor em dólar na graduação varia nove vezes
(de US$ 11 mil a US$ 101 mil) dentro de uma coorte de um único mês, a cotação do SOL
sozinha não explica — ela não variou nove vezes naquele mês. Então é provável que a
quantidade de SOL na graduação também varie hoje. Confirmar com dado on-chain antes de
mexer no texto.

---

## 11. O que conferir antes de usar a pesquisa 7 e as correções

**Pesquisa 7:**
- **Ela exagera sobre a LP travada.** Diz que a medição vai "na direção OPOSTA à crença".
  Pelos números que ela mesma traz (Mazorra et al.): 97,3% dos tokens com trava eram
  maliciosos, contra 97,7% no conjunto inteiro. A trava **não diferencia** — não protege,
  mas também não indica rug.
- **Marino e Kamat existem.** Ela diz não ter encontrado trabalhos com esses autores e
  especula confusão com outros nomes. Os dois estão na pesquisa do projeto: Marino et al.,
  arXiv 2602.14860 (que ela mesma lista nas fontes), e Kamat, arXiv 2607.02823 (Fase 0).
  Nenhum dos dois é detector de rug, então não acrescentam características — mas a
  especulação sobre outros nomes deve ser ignorada.
- **O glossário dela define graduação por "~US$ 69.000 de market cap".** Não copiar (seção 3).

**Correção da pesquisa 2:**
- Diz que **800.000.000** tokens ficam disponíveis na curva e, no mesmo parágrafo, que a
  graduação ocorre com **793.100.000** vendidos. Os dois não fecham; a pesquisa 1 cita a
  constante on-chain de 793,1 milhões (só snippet).
- Chama de implausível a faixa de US$ 11 mil a US$ 101 mil — errado, ver 10.2.
- As contas do custo de volume falso conferem: por US$ 1 milhão, US$ 3.000 de pool + US$
  10.000 de serviço na faixa mais barata, e US$ 12.500 + US$ 10.000 na mais cara; a taxa de
  rede soma entre US$ 2,55 e US$ 25,50.

**Correção da pesquisa 3 — fatos novos, com fonte oficial:**
- A instrução `create_v2` (Token-2022) foi **ativada em 12/11/2025, 12:00 UTC**, segundo o
  canal oficial "Pump Developer Updates" no Telegram e o README do `pump-public-docs`.
- A instrução antiga `create` segue **oficialmente ativa**, com desativação "a anunciar".
  Nenhuma fonte oficial diz quando o `create_v2` virou o caminho padrão — só a cadeia mostra
  que é o que sai hoje.
- As "cashback coins" foram descontinuadas: o `create_v2` rejeita `is_cashback_enabled`.
- Ela recomenda checar também a autoridade do `metadataPointer`. Nos meus dados de
  12/09/2026, essa autoridade é nula em 11 de 11 — as duas portas estão fechadas.

**Documentação da pesquisa 4 — pontos que o módulo usa:**
- RugCheck: score maior = risco maior; a fórmula e os limiares não são publicados; as
  "Insider networks" levantam hipótese de controle comum, não provam.
- Solscan: "Authority" junta três autoridades (seção 6.2); "Market Cap" é totalmente
  diluído (6.3); o preço só aparece se o token estiver na CoinGecko.
- Bubblemaps: grátis mostra os 250 maiores holders; o token BMT libera os 1.000 maiores,
  P&L e IA; cluster sugere, não prova.
- DexScreener: FDV = (supply total − queimado) × preço; "Traders", "Buyers/Sellers" e
  "Audit" **não têm definição oficial**.

**Correção da pesquisa 1:** conferida em `P1-numeros-da-tela-CORRECAO.md` — as contas
batem; o número de faixas em USDC ficou sem confirmação; a frase do +0,1% não diz que é no
app de celular.

---

## 12. O que continua aberto

- **Conferir as telas da pesquisa 4 ao vivo**, a começar por clicar no "Authority" do
  Solscan e ver qual autoridade aparece.
- **Os "~85 SOL" de hoje** (seção 10.3).
- **Programa de token de outros lançadores** (LetsBonk, Moonshot, Believe, Bags): a
  correção da pesquisa 3 reconfirma LetsBonk e LaunchLab em SPL clássico pela documentação
  da Raydium, mas não foi checado na cadeia.
- **Notação de preço do Solscan:** confirmar no código, como foi feito no DexScreener.
- **Número de faixas em USDC** na tabela de taxas do pump.fun.
