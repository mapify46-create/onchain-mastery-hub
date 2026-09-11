# Síntese da Fase 0 — as sete pesquisas, cruzadas

> Atualizado em 11/09/2026. **Fase 0 completa: 7 de 7.** Os documentos originais estão
> em `fase0/`. Esta síntese existe porque as descobertas que decidem o projeto só
> aparecem quando um documento é lido contra o outro.

## 1. Estado

| # | Tema | Arquivo | Estado |
|---|---|---|---|
| 1 | Dados sociais (X, Telegram, J7) | `P1-dados-sociais-FINAL.md` | completo |
| 2 | Dados on-chain e de preço | `P2-dados-onchain.md` | completo |
| 3 | Simulação financeira | `P3-metodologia-FINAL.md` | completo |
| 4 | Ciclo de vida dos tokens | `P4-ciclo-de-vida-FINAL.md` | completo |
| 5 | A IA consegue prever? | `P5-ia-prevendo-FINAL.md` | completo |
| 6 | Como pontuar previsões | `P6-pontuacao.md` | completo |
| 7 | Arquitetura multi-IA | `P7-arquitetura-multi-ia.md` | completo |

---

## 2. A conta que decide o projeto

Junte três números que vieram de pesquisas diferentes e o resultado já está dado,
antes de escrever uma linha de código.

**O efeito bruto que sobra para medir.** O P6 e o P7 mostraram que um atraso comum de
2 a 5 minutos é obrigatório, senão os modelos de raciocínio ficam de fora (o Opus 5
leva 91 segundos só para começar a responder). O P3 mostrou o preço disso: no único
estudo revisado por pares com efeito significativo (Ante 2023, Dogecoin), o retorno
anormal vai de **+3,58% em 2 minutos** para **+4,79% em 1 hora**. Com atraso de 2
minutos ou mais, **o salto inicial já foi perdido por construção**. Sobra a deriva:

```
 +4,79%   em 1 hora
 −3,58%   em 2 minutos, já perdidos
 ───────
  1,21 pontos percentuais, brutos, espalhados por ~58 minutos
```

**O custo de capturar essa deriva.** O P3 e o P5 convergem: a taxa da pool na curva do
pump.fun sozinha é 1,25% por perna, ou **2,5% na ida e volta**. Somando prioridade,
gorjeta de MEV e impacto de preço, a estimativa independente é de **3% a 6%** por ciclo
completo. A medição publicada mais próxima é do Uniswap Labs (Adams et al., 2024,
Financial Cryptography, revisado por pares): 534 mil negociações reais, custo médio de
**140 pontos-base por dólar negociado na memecoin PEPE**, contra 22 no par estável — e
numa pool muito mais funda que as do pump.fun.

**O resultado:**

| | |
|---|---:|
| Deriva bruta disponível | **1,21 pp** |
| Custo de ida e volta | **3 a 6 pp** |
| Custo dividido pela deriva | **2,5× a 5×** |
| Resultado líquido esperado | **−1,8 pp a −4,8 pp** |

O custo é de duas e meia a cinco vezes o efeito bruto máximo plausível. **Com este
desenho o resultado líquido é negativo por aritmética**, não por azar — a menos que a
deriva em memecoin seja várias vezes maior que a do Dogecoin depois de um post do
Musk, e não há medição publicada de que seja.

O P5 fecha o cerco por três lados independentes:

- **A evidência positiva foi medida noutro mundo.** Os dois únicos trabalhos revisados
  por pares com previsibilidade em minutos, fora da amostra e líquida de custo,
  assumem de 4 a 10 pontos-base. Memecoin custa de 280 a 642. É de **28 a 161 vezes**
  mais caro, conforme as pontas que se comparem.
- **A previsão de LLM é inflada por vazamento.** Bradford Levy (2026, *Journal of
  Accounting Research*) randomizou **só o último dígito** de cada número das
  demonstrações financeiras: o acerto do GPT-4 caiu de ~60% para ~50%, ou seja, cara ou
  coroa. Era memorização, não raciocínio. E árvores de decisão clássicas (GBDT) batem o
  melhor LLM comercial por 2,7 pontos de acurácia, sendo quase imunes ao mesmo teste.
- **Os sistemas multiagente desmoronam quando reavaliados.** O FinMem relatou 23% de
  retorno; sob reavaliação controlada, virou **−22%**.

---

## 3. A saída: mudar a pergunta, não o projeto

A mesma pesquisa que fecha a porta abre outra, e a outra é melhor.

O P5 encontrou o que a ciência **de fato** sustenta sobre memecoin: não é previsão de
retorno, é **detecção de fraude**. O trabalho "Catching the Rug" (arXiv:2608.20271,
2026) montou o maior conjunto até hoje — **6,4 milhões de tokens da Solana em 7 meses**
— e um XGBoost detecta rug pull **com os primeiros 5 minutos de dados**.

Por que essa pergunta escapa da parede de custo: **evitar um rug vale −100%, não
1 ponto percentual.** O pedágio de 3 a 6% que inviabiliza capturar uma deriva de
1,21 pp é irrelevante diante de uma perda total evitada. A assimetria inverte.

E casa com o hub: o curso inteiro é sobre não perder por desatenção, não sobre achar o
próximo. Um observatório que mede **"o sistema consegue marcar, em 5 minutos, qual
token vai dar rug?"** produz um número que serve ao Módulo 3 e ao Módulo 5 direto.

**Recomendação: a hipótese primária passa a ser detecção, não previsão de retorno.** A
previsão de retorno continua no projeto como hipótese secundária, medida com o mesmo
rigor — porque saber que ela não paga, com número próprio, também vale.

---

## 4. Conflitos que as pesquisas resolveram

| Pergunta | Resposta |
|---|---|
| Quem escreveu o estudo com n = 832.941? | **Kamat**, autor único. "Hu et al." descartado: são os autores do MemeTrans, outro trabalho. O P2 estava certo, o P4 errado. |
| O "J7 Tracker" existe? | **Existe** (j7tracker.io, página aberta). Mas **não é tracker de narrativa**: se descreve como ferramenta de sniping e deploy, "sub-1ms server-side deploys", com um twitter tracker embutido. Acesso por credenciais via Discord. |
| Dá para detectar quem uma conta passou a seguir? | **Não.** Só existe evento de follow para contas que autorizaram seu app via OAuth. Comparar listas custa US$ 0,010 por registro e **não traz data e hora**. |
| O X tem stream em tempo real no pague-pelo-uso? | **Tem.** 4 a 5 segundos (P99), 1.000 regras, ~US$ 45/mês para 30 contas. E post repetido **não é cobrado duas vezes no mesmo dia**. |
| Por que a graduação foi de 0,26% em junho a 2,7% em agosto? | **Não é só método.** A pump.fun lançou o **BOOST em 21/07/2026** e o próprio The Block mediu 6,7% numa sexta, ~8× a média de junho. Somam-se limiar diferente (US$ 100 mil × completar a curva) e agregação diferente. |
| A graduação tem limiar em dólar? | **Não.** É constante on-chain (206.900.000 tokens). O valor em dólar variou de ~US$ 11 mil a ~US$ 101 mil, mediana ~US$ 38 mil. O artigo chama o "US$ 100 mil" de "a suposição errada mais comum". |

Confirmou-se também que dois dos cinco preprints **foram publicados com revisão por
pares**: Midsummer no USENIX Security '26 e Mancino no IEEE ISCC 2025. Marino, MemeTrans
e Kamat seguem só como preprint.

E uma errata que muda a leitura: o 0,198% de Kamat vem de uma coleta que cobriu **só
~6 minutos** após cada lançamento, não 24 horas. É piso de "regime rápido", não a taxa
real. O próprio autor escreve que a queda de 3,18× frente ao 0,63% de Marino "é um
limite superior da queda verdadeira".

---

## 5. Três correções ao desenho que eu havia recomendado

**5.1 Graduação é gatilho, nunca filtro.** O P3 lista, entre os vazamentos de futuro,
"usar a graduação do token como filtro". Está certo, e a recomendação sobrevive com uma
condição que precisa estar escrita no pré-registro:

- **Vazamento:** prever no lançamento e depois olhar só os que graduaram. Proibido.
- **Legítimo:** a previsão é feita **no instante da graduação**, fato conhecido naquele
  instante. A população é "tokens que graduaram", e a conclusão **não se estende** a
  todos os tokens.

Sem essa frase escrita, alguém aplica o filtro por engano depois.

**5.2 Entra um concorrente que não é IA.** Como as árvores de decisão clássicas batem o
melhor LLM em dado numérico e são quase imunes ao teste de memorização (Levy 2026), o
GBDT entra na competição ao lado dos modelos. Se ele ganhar, e é o mais provável, a
resposta será "para este problema, estatística simples bate IA de linguagem" — um
achado útil e publicável.

**5.3 Nada de Sharpe.** Grobys & Shahzad (2025) mostram que as variâncias de estratégias
de momentum em cripto seguem leis de potência com **média e variância populacionais não
definidas**; métricas baseadas em variância "não são informativas". O observatório
reporta mediana, percentis e bootstrap em blocos. Antes disso mede o próprio índice de
cauda (alfa de Hill); abaixo de 2, fórmulas de média e variância saem de cena. **Não
existe alfa publicado para memecoin** — mais uma coisa que o observatório mediria
primeiro.

---

## 6. A API da GMGN (conferido em 11/09/2026)

**São duas APIs diferentes, e as buscas as confundem:**

- **Cooperation / Trading API:** acesso *"granted solely based on sufficient Trading
  Volume on GMGN"*, por formulário. **Não serve e não queremos.**
- **OpenAPI / Agent API** (`gmgn.ai/ai`): você gera um par de chaves no seu computador,
  sobe a pública e recebe a API Key. **Nenhuma exigência de volume é mencionada.**

**Preço (print da página da conta do dono; página autenticada, não abrível por mim):**
o plano gratuito tem **"acesso total à habilidade, sem barreiras"** — entre os planos
muda a velocidade, não o que se consulta. A regra é `chamadas/s = peso do plano ÷ peso
do endpoint`, e o gratuito tem peso 5.

| Endpoint | Peso | Chamadas/s no grátis |
|---|---:|---:|
| Acompanhar Smart Money | 1 | 5 |
| Acompanhar KOL | 1 | 5 |
| Informações e segurança do token | 1 | 5 |
| Velas e tokens novos | 2 | 2,5 |
| Holders e traders | 5 | 1 |

Pagos: Plus US$ 290/ano (peso 20), Pro US$ 990/ano (peso 50). **O GeckoTerminal grátis
dá 10 chamadas por minuto; o GMGN dá 5 por segundo** nos endpoints de rastreamento.

**A fronteira é mecânica, não de disciplina.** A documentação diz: *"Query functions
need API Key; Swap operations require API Key + Private Key."* O observatório usa só a
API Key e **nunca carrega a chave privada**. Operar por acidente fica impossível por
construção.

---

## 7. O que fica em aberto

- **Custo por crédito da GMGN**, termos de uso e profundidade do histórico de velas.
- **As métricas derivadas da GMGN são caixa-preta** (rat trader, bundler). Entram como
  dado que a IA vê, nunca como número que o observatório afirma ter medido.
- **Taxa da pump.fun na curva: 1% ou 1,25% por perna?** O P5 diz 1%, o P3 diz 1,25%
  citando a documentação atualizada em 20/05/2026. Prevalece o P3 até alguém reabrir.
- **Qual fonte decide o preço** (GeckoTerminal ou GMGN). Precisa ser **uma só**, fixada
  antes: usar uma para a referência e outra para o resultado é vazamento, segundo o P6.
- **O BOOST mudou o regime em 21/07/2026.** Reconstrução histórica que atravesse essa
  data mistura dois mercados.

---

## 8. O que volta para o hub

**Módulo 2 — "a maioria vai a zero" ganha número, e ganha nuance.** A frase se sustenta
sob qualquer definição, mas o número muda conforme o que se chame de morte:

| Definição de "morto" | Número | Fonte |
|---|---:|---|
| Parou de negociar no dia do lançamento | 68,67% | CoinGecko, 18,67 mi de tokens |
| Parou em até 2 dias | 80,37% | idem |
| Sobreviveu mais de 90 dias | só 4,55% | idem |
| Liquidez abaixo de US$ 1.000 | 98,6% | Solidus Labs |
| Nunca completou a curva | 99,37% | Marino et al. |

Nenhuma fonte mede preço chegando literalmente a zero. E o 98,6% da Solidus foi
**contestado publicamente pela pump.fun**, cujo porta-voz disse que o relatório "carece
de entendimento básico de memecoins" — a contestação precisa aparecer junto.

**Módulo 3 — o item do J7 Tracker precisa ser corrigido.** Hoje o hub diz que não foi
encontrada fonte confiável. Agora existe: o site é real, mas a ferramenta é de sniping
e deploy, não o tracker de narrativas que o texto sugere.

**Módulo 5 — dois ajustes.** O "US$ 69 mil" da graduação é impreciso: não há limiar em
dólar, e o valor observado varia de US$ 11 mil a US$ 101 mil. E vale acrescentar o dado
do Uniswap Labs: negociar memecoin custou 140 pontos-base por dólar contra 22 num par
estável, com probabilidade de slippage adversarial **80% maior**.

---

## 9. Decisões pendentes

| Decisão | Recomendação |
|---|---|
| Hipótese primária | **Detecção de rug em 5 minutos**, não previsão de retorno |
| Atraso comum L | 5 minutos, quando a hipótese for de retorno |
| Gatilho do evento | Graduação, com a regra do item 5.1 escrita no pré-registro |
| Fonte de preço para resolução | Uma só, fixada antes. Recomendo GeckoTerminal, já testado |
| Concorrentes | 1 modelo rápido, 2 de raciocínio e **1 GBDT** |
| X na Fase 1 | Não. A GMGN cobre sinal de carteira de graça |

**Custo estimado:** dados on-chain US$ 0; GMGN US$ 0 no plano gratuito; previsões de
US$ 50 a 120 por modelo por rodada. O X, se um dia entrar, ~US$ 45/mês.
