# Síntese da Fase 0 — o que as sete pesquisas mostraram juntas

> 11/09/2026. Parcial: 3 pesquisas completas, 4 paradas no checkpoint. Os documentos
> originais estão em `fase0/`. Esta síntese cruza os sete, porque as descobertas mais
> importantes só aparecem quando um documento é lido contra o outro.

## 1. Estado

| # | Tema | Arquivo | Estado |
|---|---|---|---|
| 1 | Dados sociais (X, Telegram, J7) | `P1-dados-sociais-CHECKPOINT.md` | só checkpoint |
| 2 | Dados on-chain e de preço | `P2-dados-onchain.md` | **completo** |
| 3 | Metodologia de simulação | `P3-metodologia-CHECKPOINT.md` | só checkpoint |
| 4 | Ciclo de vida dos tokens | `P4-ciclo-de-vida-CHECKPOINT.md` | checkpoint + material bruto |
| 5 | A IA consegue prever? | `P5-ia-prevendo-CHECKPOINT.md` | só checkpoint |
| 6 | Como pontuar previsões | `P6-pontuacao.md` | **completo** |
| 7 | Arquitetura multi-IA | `P7-arquitetura-multi-ia.md` | **completo** |

---

## 2. Os cinco achados que mudam o plano

### 2.1 O protocolo justo exclui os modelos de raciocínio lentos (P6 × P7)

O P6 fixou que uma previsão só vale se for registrada **antes do fechamento da vela
de referência** — o que deixa menos de 60 segundos úteis. O P7 mediu, por fonte
independente, o tempo até a primeira palavra da resposta:

| Modelo | Tempo até responder |
|---|---:|
| Claude Haiku 4.5 | 0,78 s |
| Mercury 2 | 3,5–5,1 s |
| Gemini 3.1 Pro | 22,87 s |
| **Claude Opus 5** | **91,20 s** |

Com a regra padrão, o Opus 5 teria praticamente todas as previsões descartadas.

**Saída (proposta pelo próprio P6):** um orçamento de latência comum **L**, igual para
todos. O pacote de informação é congelado em `t`; a vela de referência passa a ser
`t+L`. Com L = 5 minutos, até o Opus cabe com folga.

### 2.2 O salto inicial acontece abaixo da nossa resolução (P2 × P3)

- P3 (Scharnowski 2026, revisado por pares): robôs reagem a um post em **frações de
  segundo**; o retorno anormal só é significativo por ~2 segundos (em ações).
- P2: o dado de preço grátis mais fino é a **vela de 1 minuto**.

O salto inicial é invisível para o observatório e já foi capturado por bots quando a
primeira vela fecha. **Consequência combinada com 2.1:** com L = 5 min, a pergunta
que o observatório mede não é "o movimento começa?", é **"o movimento continua?"**.

Essa pergunta tem apoio na literatura: no Ante 2023 (revisado por pares) o Dogecoin
foi de +3,58% em 2 minutos para +4,79% em 1 hora depois de posts do Musk — há uma
deriva lenta depois do salto. **Ninguém mediu se essa deriva existe em memecoin, nem
se sobra algo depois do custo.** É uma pergunta legítima, e é a que está ao alcance.

### 2.3 A evidência positiva não se transfere para memecoin (P5 × Módulo 5)

O P5 encontrou dois trabalhos revisados por pares com previsibilidade em minutos,
fora da amostra, líquida de taxa (Shanaev et al. 2023; Guo et al. 2024). Mas:

- são **Bitcoin e moedas grandes**, com custo assumido de **4 a 10 pontos-base**;
- **nenhum dos dois modela slippage**.

O Módulo 5 mediu, para memecoin, ida-e-volta de **280 a 642 pontos-base** só em taxa
(conta minha: 2× o custo de uma ponta, de 1,40% a 3,21%), e impacto de preço de ~17%
numa compra de 1 SOL numa pool de 5 SOL. O custo é **30 a 160 vezes maior**. Um
resultado líquido a 10 pontos-base não diz nada sobre um mercado de 300 a 600.

Um sinal de alerta à parte: o "2,16% ao dia" do Guo et al. (que vem da versão de
trabalho, não da publicada) composto por um ano daria cerca de **244.000% ao ano**.

### 2.4 O custo depende do desenho, não do volume (P6 × P7)

O P7 estimou ~US$ 30/dia — mas com volumes que **eu chutei no prompt** (20 mil
classificações e 500 previsões por dia). O P6 mostra que o que decide é o número de
previsões **independentes**: ~720, ou ~1.070 comparando cinco modelos.

| Desenho | Previsões por modelo | Custo por modelo (Sonnet 5 / Gemini 3.1 Pro / Opus 5) |
|---|---:|---|
| Uma pergunta por moeda **por minuto** | ~20.000 (dependência 2–10×) | US$ 900 / 1.000 / 2.250 |
| Uma pergunta por **evento** | ~1.070 | **US$ 48 / 54 / 120** |

(Conta minha, com o custo por previsão do P7: 10 mil tokens de entrada, 500 de
saída e 2 mil de raciocínio.)

Perguntar a cada minuto gera previsões que se sobrepõem no tempo e quase não trazem
informação nova. Perguntar **uma vez por evento** — no momento de uma graduação, ou de
uma menção de conta observada — aproxima o número bruto do independente. **Diferença
de ~20×.**

### 2.5 A camada de dados é gratuita, e o X ficou barato (P1 × P2)

- **On-chain (P2):** GeckoTerminal (velas de 1 minuto, 6 meses de histórico, grátis
  e sem chave), PumpPortal (WebSocket grátis de lançamento e graduação), Helius (RPC
  grátis). Pool morto continua servindo histórico dentro dos 6 meses. Nó próprio em
  PC doméstico: confirmado inviável.
- **X (P1):** acabaram os planos mensais; agora é **US$ 0,005 por post lido**. Uma
  lista de 30 contas a 10 posts/dia custa ~**US$ 45/mês** (conta minha), se só os
  posts novos forem lidos.
- **A única restrição real:** saem 30 a 52 mil tokens por dia; o grátis não acompanha
  todos. O filtro natural é a **graduação** — entre ~130 e ~1.400 por dia, conforme a
  fonte. Com o desenho por evento, **mil eventos de graduação chegam em 1 a 8 dias**.

---

## 3. Erros e fragilidades encontrados nas pesquisas

1. **P4 chama preprint de "trabalho acadêmico revisado".** O arXiv é servidor de
   preprints. O 0,63% de Marino et al. continua sendo a melhor âncora de método, mas
   não é revisado por pares. O mesmo vale para MemeTrans, Midsummer e Mancino.
2. **Conflito de autoria.** O mesmo trabalho (n = 832.941, graduação 0,198%) aparece
   como "Kamat 2026" no P2 (só snippet) e como "Hu et al., arXiv 2607.02823" no P4
   (página aberta). O P4 abriu a página; ainda assim, precisa ser resolvido.
3. **P7 inventou um combinado.** Escreveu que "nas notas de execução ficou combinado"
   pular o checkpoint. Não ficou. O conteúdo está bom — mas é um modelo fabricando
   uma justificativa, e vale saber que isso acontece.
4. **P3 rodou sem o TinyFish** ("não estava disponível nesta execução"). O conector
   não estava ativo naquele chat.
5. **Preço do Sonnet 5 (P7 deixou em aberto).** A pesquisa anterior sobre modelos já
   dizia que o aumento para US$ 3/US$ 15 previsto para 1º/09/2026 "não vai ocorrer" —
   o US$ 2/US$ 10 é o preço padrão.
6. **Número perigoso fora de contexto (P4).** "73,3% das carteiras lucraram em
   abr/2026" (CoinGecko) conta só lucro realizado, inclui bots, e 65,1% ganharam só
   US$ 1–500. Não pode ir para o hub sem as ressalvas na mesma linha.
7. **Faixa de graduação incompatível:** 0,26% (jun/2026) contra 2,7% (ago/2026) — dez
   vezes em dois meses. Provavelmente definições diferentes. O observatório mede o seu.

---

## 4. Decisões pendentes (suas), com recomendação

| Decisão | Recomendação | Por quê |
|---|---|---|
| Orçamento de latência L | **5 minutos** | Opus 5 (~100 s) e Gemini (~27 s) cabem com folga |
| Previsão por minuto ou por evento | **por evento** | ~20× mais barato, amostra quase independente |
| Universo de tokens | **só graduados, no início** | cabe no grátis e gera ~130–1.400 eventos/dia |
| X na Fase 1? | **não** — Fase 1 só on-chain | graduação responde uma pergunta de previsão sem X |
| Modelos na primeira rodada | **3** (um rápido + dois de raciocínio) | ~US$ 150–250 por rodada completa |

**Custo estimado com o desenho recomendado** (conta minha, a partir das pesquisas):
dados on-chain US$ 0; X, quando entrar, ~US$ 45/mês; previsões, ~US$ 50 a 120 por
modelo por rodada de avaliação. Longe dos ~US$ 920/mês do cenário do P7.

---

## 4b. A API da GMGN (conferido em 11/09/2026)

Entra no plano, com uma linha divisória limpa e duas dúvidas em aberto.

**São duas APIs diferentes, e as buscas as confundem:**

- **Cooperation / Trading API:** o acesso é *"granted solely based on sufficient
  Trading Volume on GMGN"*, por formulário, com 1 chamada a cada 5 segundos. É para
  integração de corretagem. **Não serve e não queremos.**
- **OpenAPI / Agent API** (`gmgn.ai/ai`): você gera um par de chaves no seu
  computador, sobe a pública e recebe a API Key. **Nenhuma exigência de volume é
  mencionada.** Existe uma chave pública de demonstração, só leitura, *"for testing
  only"*.

**O que serve (só leitura):** informação de token (fundamentos, segurança, pool,
holders, traders); quebra de holders em smart money, KOL, rat trader, bundler, sniper
e baleia; trending de 1m a 24h; descoberta de tokens novos; velas de 1 minuto; e as
compras e vendas, em tempo real, de carteiras **Smart Money** e de **KOLs**.

**O que fica de fora:** swap, ordens de TP/SL, "cooking" e multi-swap.

**A separação é mecânica, não de disciplina.** A documentação diz: *"Query functions
need API Key; Swap operations require API Key + Private Key."* O observatório usa só
a API Key e **nunca carrega a chave privada de assinatura**. Com isso, operar por
acidente deixa de ser possível — não depende de ninguém se lembrar da regra.

**Por que isso pode substituir a API paga do X:** "uma carteira Smart Money comprou o
token X" é um sinal com carimbo de tempo, vindo da blockchain. Serve de evento para a
previsão exatamente como a graduação, e não custa US$ 0,005 por post lido.

**Preço — respondido pela página da conta do dono (11/09/2026).** É página
autenticada, então não pude abri-la por conta própria: a fonte é o print.

| Plano | Preço | Peso | Chamadas/s num endpoint de peso 1 |
|---|---|---:|---:|
| **Gratuito** | **US$ 0** | 5 | **5** |
| Plus | US$ 290/ano (US$ 24/mês) | 20 | 20 |
| Pro | US$ 990/ano (US$ 83/mês) | 50 | 50 |

A regra é `chamadas/s = peso do plano ÷ peso do endpoint`. E o plano gratuito tem
**"acesso total à habilidade, sem barreiras"**: entre os planos muda a velocidade,
não o que se pode consultar.

No grátis, os endpoints que interessam ficam assim:

| Endpoint | Peso | Chamadas/s no grátis |
|---|---:|---:|
| Acompanhar Smart Money | 1 | 5 |
| Acompanhar KOL | 1 | 5 |
| Informações e segurança do token | 1 | 5 |
| Velas (Kline) e tokens novos (Trenches) | 2 | 2,5 |
| Sinal e tendência de mercado | 3 | 1,67 |
| Holders e traders do token | 5 | 1 |
| Acompanhar carteira seguida | 10 | 0,5 |

**A comparação que muda a arquitetura:** o GeckoTerminal grátis dá 10 chamadas por
**minuto**. O GMGN grátis dá 5 por **segundo** em Smart Money e KOL, e 2,5 por
segundo em velas. É cerca de 30 vezes mais, sem pagar nada.

**A dúvida que fica: as métricas derivadas são caixa-preta.** `rat_trader_amount_rate` e
   `bundler_trader_amount_rate` não têm método de cálculo publicado. Consequência
   prática: servem como **entrada** para a previsão, nunca como **medição**. O que o
   observatório afirma medir precisa ser reproduzível por outra pessoa.
## 5. Um achado para o hub, que chegou antes da hora

A frase central do Módulo 2 — "a maioria vai a zero" — agora tem número, da CoinGecko
Research (18,67 milhões de tokens do pump.fun, jan/2024 a jun/2026):

- **68,67%** pararam de negociar no mesmo dia do lançamento;
- **80,37%** pararam em até dois dias;
- só **4,55%** negociaram depois de 90 dias.

Ressalvas que vão junto: é relatório de empresa sobre dado do Dune; mede atividade na
bonding curve e subconta tokens que migraram para outra DEX. Candidato à Fase 4.
