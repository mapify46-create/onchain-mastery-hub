# Prompt para o ChatGPT — Observatório de memecoins

> **Como usar:** cole tudo abaixo da linha como primeira mensagem e anexe os arquivos
> da seção "Anexos". Escrito em 14/09/2026 a partir do estado real do projeto — tudo o
> que está marcado como testado foi testado de verdade, na data indicada.

---

## Quem sou e o que é isto

Sou o dono de um projeto chamado **observatório**. Não sou programador e estou
aprendendo trading on-chain do zero. Até agora trabalhei nele com outra IA, que tinha
acesso ao meu computador e fez testes ao vivo. Estou passando o trabalho para você.
**Não existe outro histórico: tudo o que você precisa saber está aqui e nos anexos.**

O observatório é um sistema que roda no meu PC e **observa, mede e testa hipóteses no
papel** sobre memecoins da Solana (principalmente pump.fun). **Ele nunca opera.**

---

## As três regras que não se negociam

Leia isto antes de tudo. Se um dia eu mesmo pedir para quebrar alguma, me lembre desta
lista.

**1. Zero dinheiro real, zero chave privada.** Se um dia virar outra coisa, é outro
projeto. Na API da GMGN isso é mecânico, não disciplina — a documentação diz: *"Query
functions need API Key; Swap operations require API Key + Private Key."* O observatório
usa só a API Key e **nunca** carrega chave privada. O mesmo vale para o PumpPortal: só o
fluxo de dados, nunca os endpoints de negociação. **Nunca me peça para colar chave
nenhuma no chat**, nem a API Key — ela fica num arquivo `.env` no meu PC.

**2. Ninguém além de mim escreve a regra de compra. Nem você.** As hipóteses são minhas,
escritas e pré-registradas antes de olhar os dados. O sistema mede se *teriam*
funcionado, líquido de custo. Se eu perguntar "qual regra eu uso?", a resposta é que
isso não é o seu papel.

**3. Nada se apaga.** Sinal que não deu em nada e hipótese que falhou ficam
registrados. É o que separa medição de propaganda.

**Teste para qualquer proposta sua:** ela cria caminho para operar, para uma chave
privada entrar, ou para uma IA decidir quando comprar? Se criar, o desenho está errado.

---

## Por que o projeto é o que é (a conta que mudou tudo)

Começou como "um bot com várias IAs que prevê quem vai subir". Sete pesquisas (a Fase 0,
concluída em 11/09/2026) mostraram que isso dá negativo **por aritmética**:

| | |
|---|---:|
| Atraso obrigatório entre sinal e execução (IA de raciocínio leva ~91 s só para começar) | 2 a 5 min |
| Retorno depois de um sinal social, única medição revisada por pares (Ante 2023, Dogecoin) | +3,58% em 2 min → +4,79% em 1 h |
| O que sobra depois do atraso | **1,21 pp** |
| Custo de ida e volta em memecoin | **3 a 6 pp** |
| Resultado líquido esperado | **−1,8 a −4,8 pp** |

Mais três achados fecham o cerco: a evidência positiva de previsão em minutos foi medida
em mercados **28 a 161 vezes mais baratos**; previsão de LLM é inflada por memorização
(Levy 2026: trocando só o último dígito dos números, o GPT-4 caiu de ~60% para ~50%);
e árvores de decisão clássicas (GBDT) batem o melhor LLM em dado numérico.

## A decisão tomada (11/09/2026)

**Hipótese primária: detectar quem vai dar rug.** Evitar um rug vale −100%, então a
parede de 3 a 6 pp de custo não se aplica.
**Hipótese secundária: prever retorno**, com o mesmo rigor — porque ninguém mediu a
deriva real em memecoin, e medir isso é o que diz se a analogia com o Dogecoin valia.

### O paper de referência — com as ressalvas

"Catching the Rug: Early Prediction of Fraudulent Memecoins on Solana",
arXiv:2608.20271. **É preprint** (sem revisão por pares).

- 6,4 milhões de tokens da Solana em 7 meses; XGBoost com os **5 primeiros minutos**.
- **Rótulo de rug (seção V-B):** queda de **99% do TVL desde o pico** **OU** token
  parado por **mais de 80% da própria vida**.
- 23 características, todas de transação on-chain dos 5 primeiros minutos.
- Taxa-base de rug no teste: **81,9% no PumpFun**, 60,8% no Raydium.
- Melhor resultado: F1 0,7885, AUCPRC 0,8011, **MCC 0,3947** — fraco a moderado.
- Eles **descartam** tokens que já deram rug dentro dos 5 minutos. Isso muda a população.

**A armadilha:** no próprio paper, o chute "tudo é rug" tem F1 **0,90** e o melhor
modelo, 0,79. Por isso **nunca** usamos acurácia nem F1 para decidir. O placar é
**Brier e skill score contra a frequência histórica**.

**O resultado mais provável é "nenhum modelo bateu a linha de base". Eu aceitei isso
de antemão.** Não tente me animar com outra expectativa.

### O rótulo ainda não está escrito — de propósito

A ordem é: **coletar o bruto → escrever o rótulo (pré-registro) → só então analisar.**
Ninguém analisa nada antes de o rótulo estar no papel. Por isso o banco **não tem coluna
`rug`** nem veredito nenhum.

---

## O fato técnico que dá urgência

**A liquidez não é reconstruível para trás. O preço é.**

- No GeckoTerminal grátis, `reserve_in_usd` é o único campo de liquidez e **traz só o
  valor de agora** (confirmado ao vivo em 11/09/2026).
- As velas de preço de 1 minuto voltam **~6 meses** e continuam sendo servidas mesmo
  para pool drenada.

Consequência: a metade de liquidez do rótulo do paper **só existe se estivermos
fotografando desde já. Cada dia sem coleta é um dia que nunca mais volta.** A tabela
`liquidez` é a única cujo atraso é irreversível — prioridade acima de qualquer
refinamento.

---

## O que já foi verificado sobre as fontes de dados

| Fonte | Fato | Como foi verificado |
|---|---|---|
| **GeckoTerminal, sem chave** | **10 chamadas/min** (a doc Swagger diz 10, o FAQ diz 30 — use 10) | páginas oficiais, 11/09 |
| | Velas de 1 min, ~6 meses para trás; além disso HTTP 401 | testado ao vivo, 11/09 |
| | Pool morta (liquidez 0.0) continua devolvendo velas | testado ao vivo, 11/09 |
| | `/pools/multi/{enderecos}`: pedi 20 pools numa chamada, vieram 20 → teto ~300 pools/min | testado ao vivo, 12/09 |
| | `new_pools` traz `dex` ("pump-fun", "raydium-launchlab", "meteora-dbc"…), `pool_created_at`, `reserve_in_usd` | testado ao vivo, 11/09 |
| | Endpoint de pool traz `launchpad_details` com `completed`, `completed_at`, `migrated_destination_pool_address` | testado ao vivo, 11/09 |
| **PumpPortal (WebSocket de dados)** | Cada token novo chega com: `mint, traderPublicKey, initialBuy, solAmount, bondingCurveKey, vSolInBondingCurve, marketCapSol, name, symbol, uri, pool` | conectado por 20 s, 12/09 |
| | Evento de graduação pelo PumpPortal | **NÃO VERIFICADO** |
| | Endereço exato do WebSocket e nomes das inscrições | **NÃO VERIFICADO neste prompt** — confirme na documentação oficial antes de escrever código |
| **Gateways públicos de IPFS** (metadado do `uri`) | Deram HTTP 429 em 2 de 3 | testado, 12/09 — problema anotado, não resolvido |
| **GMGN OpenAPI, plano grátis** | Peso 5. Chamadas/s = 5 ÷ peso do endpoint: smart money / KOL / segurança do token = 5/s; velas e tokens novos = 2,5/s; holders e traders = 1/s | print da conta, 11/09 |
| | Métricas derivadas (rat trader, bundler) são **caixa-preta**: entram como dado, nunca como número que afirmamos ter medido | decisão |
| **RPC público da Solana** | 24 de 24 tokens do pump.fun são **Token-2022**, só com as extensões `metadataPointer` + `tokenMetadata`; mint e freeze authority nulos; metadata imutável | `getMultipleAccounts` com `jsonParsed`, 12/09 |
| **Node na minha máquina** | **v24.19.0**: `node:sqlite`, `WebSocket` e `fetch` embutidos e funcionando | testado, 11/09 |

Outros fatos que o desenho precisa respeitar:

- **O BOOST da pump.fun mudou o regime em 21/07/2026.** Reconstrução histórica que
  atravesse essa data mistura dois mercados.
- **Taxa da curva do pump.fun:** 1,25% por perna (documentação de 20/05/2026). Uma
  pesquisa disse 1%; vale 1,25% até alguém reabrir.
- **Graduação não tem limiar em dólar.** É uma constante on-chain; em dólar variou de
  ~US$ 11 mil a ~US$ 101 mil (80% das graduações, amostra de ago/2026). Não escreva
  "US$ 69 mil".

---

## Onde estamos: Fase 1 (coletor) — plano proposto, **não aprovado, zero código**

Plano que a IA anterior propôs em 12/09/2026. Ainda não respondi. **Você pode discordar
de qualquer parte, desde que diga por quê.**

**Dependências: nenhuma.** Nada de `better-sqlite3`, `ws`, `axios` ou `node-cron`. O
agendador sai de `setInterval`.

**O banco — um arquivo SQLite, 5 tabelas**

| Tabela | Guarda | Por quê |
|---|---|---|
| `tokens` | endereço, símbolo, launchpad, **as duas pools** (curva e pós-graduação), carteira criadora (`traderPublicKey`), compra inicial do criador, links sociais do metadado, **programa do token e extensões** | ao graduar o token muda de pool; `migrated_destination_pool_address` é a ponte. Criador reincidente e compra inicial são sinais clássicos, grátis |
| `eventos` | lançamento e graduação, com **hora do fato** e **hora em que chegou aqui** | a diferença é o atraso real, que a Fase 2.5 vai precisar |
| `velas` | preço de 1 min: abertura, máxima, mínima, fechamento, volume | reconstruível 6 meses |
| `liquidez` | foto do `reserve_in_usd` com carimbo de hora | **a única que some se adiar** |
| `coletas` | diário de cada chamada: o que rodou, o que voltou, o que falhou | prova "30 dias sem buraco", o critério de sucesso da Fase 1 |

**Os arquivos**

1. `observador/coletor/banco.js` — cria o SQLite e as 5 tabelas
2. `observador/coletor/geckoterminal.js` — cliente com fila que respeita 10 chamadas/min
3. `observador/coletor/coletor.js` — roda sem parar: escuta o PumpPortal e tira as fotos
4. `observador/coletor/reconstruir.js` — roda uma vez: puxa os 6 meses de preço
5. `observador/README.md` — com, **por escrito e antes do primeiro dado**: a fonte de
   preço fixada (**GeckoTerminal** — usar uma fonte para referência e outra para
   resultado é vazamento), e a frase **"graduação é gatilho, nunca filtro"**

**Ritmo da foto de liquidez** (cai com a idade, porque o limite aperta): a cada minuto na
primeira hora (onde o paper diz que a maioria dos rugs acontece), a cada 15 min no
primeiro dia, a cada hora na primeira semana, depois diária. Se graduarem mais de mil
tokens por dia, vai apertar — quantos graduam por dia é, aliás, um dos números que a
Fase 1 existe para medir.

**"Graduação é gatilho, nunca filtro" quer dizer:**
- **Proibido (vazamento):** prever no lançamento e depois olhar só os que graduaram.
- **Legítimo:** a previsão é feita **no instante da graduação**, fato conhecido naquele
  instante. A população é "tokens que graduaram", e a conclusão **não se estende** a
  todos os tokens.

### As três decisões minhas que destravam o código

1. Aprovo o plano acima?
2. O universo começa só nos tokens que graduam?
3. O banco mora em `observador/dados/observatorio.db`, fora do Git?

---

## Regras de método já decididas (não refaça — aplique)

- **Pré-registro:** toda hipótese vira uma ficha escrita antes de olhar os dados: regra
  exata, período, métrica primária única, critério de sucesso e atraso L fixo. Hipótese
  sem data de registro não roda. Escolher L depois de ver o resultado é ajustar aos dados.
- **Brier decide; log score é só alarme** (grita nos erros com certeza extrema que o
  Brier abafa).
- **Linha de base = frequência histórica calculada por regra fixa em dados anteriores**,
  nunca na própria amostra. Errar a linha de base para qualquer lado favorece o modelo.
- **Skill score** = 1 − (Brier do modelo ÷ Brier da linha de base).
- **Tamanho de amostra:** para detectar vantagem de 0,01 no Brier (95% de confiança,
  80% de poder), ~**720 previsões independentes**; mais de 1.000 com 5 modelos. Previsões
  que se sobrepõem no tempo contam menos: multiplique por 2 a 10. Nenhuma conclusão antes
  do N.
- **Resultado financeiro tem cauda pesada:** nada de Sharpe nem média simples. Mediana,
  percentis e bootstrap em blocos. Medir o índice de cauda (alfa de Hill) primeiro.
- **Custo sempre realista:** as cinco camadas de taxa, impacto de preço
  `impacto = dx / (X + dx)` e o atraso simulado.
- **Múltiplas hipóteses:** contar toda variação testada, inclusive as abandonadas;
  corrigir com Benjamini-Hochberg.
- **Concorrentes, quando chegar a hora:** 1 modelo rápido, 2 de raciocínio e **1 GBDT**.
  Se o GBDT ganhar — o mais provável —, isso é um achado, não um fracasso.
- **Só dado público, dentro dos termos de uso.** Nada de scraping proibido, conta falsa
  ou burlar limite.

## As fases seguintes (não comece nenhuma sem eu pedir)

- **Fase 2 — social.** X: ~US$ 45/mês para 30 contas. Telegram: só bot administrador
  do canal; **cliente MTProto é proibido** (põe a conta sob observação). Discord: nunca
  foi pesquisado.
- **Fase 2.5 — previsor multi-IA:** previsões com confiança, registradas com hora e hash
  **antes** do fato. Nenhuma previsão vira ordem; vira linha no log.
- **Fase 3 — laboratório de hipóteses** (as minhas, pré-registradas).
- **Fase 4 — devolutiva ao meu app de estudos**, como dado estático em JSON.

---

## Como trabalhar comigo

- **Eu não sou programador.** Ao entregar código: o **arquivo inteiro** (nunca "troque a
  linha 40"), o **caminho exato**, o **comando exato para o PowerShell** do Windows 11,
  **o que devo ver se funcionou** e **o que devo colar de volta para você**.
- **Você não roda nada no meu PC.** Então nunca diga "testado" ou "funciona" sobre algo
  cuja saída você não viu. Diga: "não testado — rode isto e me cole a saída".
- **Não invente** dado de mercado, citação, endpoint ou nome de campo. Na dúvida,
  escreva **NÃO VERIFICADO** e me dê um comando para eu conferir.
- **"Preprint" ou "revisado por pares"** se confere na página do evento ou do periódico,
  nunca em resumo de busca.
- **Nenhuma dependência nova sem me perguntar** — com o nome exato e o motivo.
- Código e comentários em **português do Brasil**, simples, funções pequenas.
- **Nada de aconselhamento financeiro.**
- Respostas com **no máximo três passos**. Quando o assunto for dinheiro, **me dê a
  conta direto**, não o rodeio.
- Chaves em `.env`, que fica no `.gitignore` junto com `observador/dados/`.
- **Ao fim de cada sessão de trabalho, me entregue um `ESTADO.md` atualizado** (uma
  página: o que foi feito, o que foi testado de verdade, o que falta, decisões
  pendentes). Eu salvo em `pesquisa/observador/ESTADO.md`. **A memória do projeto é o
  repositório, não o chat.**

---

## Anexos

1. `pesquisa/observador/SINTESE-FASE-0.md` — as sete pesquisas cruzadas
2. `pesquisa/observador/fase0/P2-dados-onchain.md` — fontes de dados e testes ao vivo
3. `pesquisa/observador/fase0/P3-metodologia-FINAL.md` — simulação e ficha de pré-registro
4. `pesquisa/observador/fase0/P6-pontuacao.md` — Brier, linha de base e tamanho de amostra
5. `pesquisa/observador/PLANO.md` — **atenção: versão de 11/09, em parte desatualizada**
   (ainda fala em "Node com um punhado de pacotes" e põe a previsão de retorno no
   centro). Onde ele conflitar com este prompt, **vale este prompt**.
6. `pesquisa/observador/ESTADO.md` — use **só a seção do observatório**; o resto é sobre
   o app de estudos.

Opcionais: `fase0/P5-ia-prevendo-FINAL.md` (a seção do "Catching the Rug") e
`fase0/P4-ciclo-de-vida-FINAL.md` (mortalidade e as definições de "morto").

---

## Sua primeira tarefa

**Ainda sem código.**

1. Me diga, em **no máximo 10 linhas**, o que você entendeu do projeto — incluindo as
   três regras —, para eu ver se pegou.
2. Me apresente as **três decisões da Fase 1** com a sua recomendação para cada uma.
3. Aponte **qualquer coisa neste prompt que pareça inconsistente**, ou que você
   precisaria ver verificada antes de escrever o coletor.
