# Como o observatório funciona, na prática

> Versão 1, 16/09/2026. Detalha a Fase 1 do [PLANO.md](PLANO.md) até o nível de
> "o que roda, de quanto em quanto tempo, e o que fica gravado".
> Decisões do dono ainda pendentes estão marcadas com **[DECIDIR]**.

## 1. Em uma frase

Um programa que fica ligado no computador do dono, fotografa tokens que acabaram de
graduar, guarda tudo com hora exata e, semanas depois, mede o que aconteceu com cada um
— para responder se dava para saber antes.

Ele **não opera, não tem chave privada e não decide nada**. Quem escreve a regra é o
dono, antes de ver os dados.

## 2. Os quatro relógios

O programa é um laço só, com quatro tarefas em ritmos diferentes:

| Relógio | Cada quanto | O que faz |
|---|---|---|
| **Descoberta** | 1 min | pergunta quais tokens graduaram desde a última vez e cria a ficha de cada um |
| **Janela dos 5 minutos** | 15 s, por 5 min | só para token recém-descoberto: grava as negociações e o preço minuto a minuto |
| **Acompanhamento** | 5 min nas 6 primeiras horas, 1 h até o 7º dia, 6 h até o 30º | preço, liquidez e volume de cada token vivo |
| **Fechamento** | 1 vez por dia | marca quem parou de negociar e prepara o rótulo |

Motivo do desenho: o achado que decide o projeto é "dá para marcar em 5 minutos quem vai
dar rug?". Os 5 primeiros minutos são o material; o resto é o gabarito.

## 3. De onde vêm os dados

- **GeckoTerminal (grátis, 10 chamadas por minuto)** — é a **única fonte de preço e
  liquidez**. Fonte única é regra: usar uma para a referência e outra para o resultado
  seria vazamento.
- **GMGN OpenAPI (plano gratuito, 5 chamadas por segundo nos endpoints de
  rastreamento)** — tokens novos, informações e segurança do token, holders. Precisa de
  uma chave gerada pelo dono. **Só a API Key, nunca a chave privada** — a documentação
  separa as duas, e é isso que torna impossível operar por acidente.
- **RPC público da Solana** — só para conferir fatos do contrato (programa, extensões,
  autoridades), como já foi feito na checagem dos 24 tokens.

Métricas fechadas da GMGN (rat trader, bundler) entram como **dado observado**, nunca
como número que o observatório afirma ter medido.

**[DECIDIR]** Confirmar GeckoTerminal como fonte única de preço, e o dono gerar a chave
da GMGN.

## 4. O que fica gravado

Um arquivo SQLite fora do Git (`observador/dados/observatorio.db`). Nada se apaga.

| Tabela | Uma linha é | Campos principais |
|---|---|---|
| `tokens` | um token observado | endereço, símbolo, launchpad, criado_em, graduou_em |
| `eventos` | algo que aconteceu | token, tipo (graduou, parou, voltou), quando, origem |
| `precos` | uma foto de preço | token, quando, preço, fonte |
| `liquidez` | uma foto da pool | token, quando, liquidez em dólar, reservas |
| `janela5min` | um minuto dos 5 primeiros | token, minuto, nº de compras e vendas, carteiras distintas, volume, variação |
| `contrato` | os fatos do contrato | token, programa, extensões, autoridades, metadata mutável |
| `coletas` | cada chamada feita | url, hora, status, tempo de resposta, erro |
| `respostas` | a resposta crua | coleta, JSON completo |
| `hipoteses` | uma regra pré-registrada | texto, autor, registrada_em, período, critério |
| `previsoes` | um palpite antes do fato | hipótese, token, quando, probabilidade, quem previu |
| `rotulos` | o gabarito | token, rótulo, regra que gerou, calculado_em |

A tabela `respostas` é o que permite reprocessar tudo se a regra mudar: refaz-se a conta
sem coletar de novo.

## 5. Buracos de coleta são dados, não erro

Se o computador desligar, a coleta para. O programa registra o buraco em `coletas`
(início e fim) e o relatório mostra a cobertura do período. Um número medido com 80% de
cobertura é dito com essas palavras.

**Decidido em 16/09/2026:** roda no PC do dono agora, para não perder dias de liquidez.
Se os buracos atrapalharem a medição, migra depois para uma máquina ligada 24 h.

## 6. O rótulo (o gabarito) — escrito antes, aplicado depois

O ponto de partida é o do estudo de referência: rug = **queda de 99% da liquidez desde o
pico** OU **token parado por mais de 80% da própria vida**.

Regras que não se negociam:
- O rótulo é **escrito num arquivo, com data, antes de qualquer análise**.
- A liquidez **não é reconstruível para trás** (a fonte só tem o valor de agora). Por
  isso a coleta começa antes de o rótulo ser fixado: cada dia sem coletar é um dia que
  não volta.
- A previsão é feita **no instante da graduação**, com o que se sabia naquele instante.
  A população é "tokens que graduaram", e a conclusão não se estende aos outros.

**Decidido em 16/09/2026:** o rótulo foi fixado ANTES da coleta, com a regra do estudo
de referência, em [ROTULO-PRE-REGISTRO.md](ROTULO-PRE-REGISTRO.md). Só muda por uma
versão nova e datada; a antiga continua no arquivo.

## 7. Como uma hipótese é testada

1. O dono escreve a hipótese num arquivo: a regra exata, o período, o critério de
   sucesso e a data. Sem data de registro, ela não roda.
2. O programa aplica a regra ao que foi observado **até aquele instante** de cada token.
3. Cada previsão vira uma linha, com hora, antes do fato.
4. Semanas depois, o rótulo chega e o placar é calculado.

**Placar:** Brier e skill score contra a frequência histórica. Nunca acurácia: com quase
todo token dando rug, responder "rug" para tudo já acerta quase sempre. Medianas e
percentis com bootstrap em blocos; nada de média, variância ou Sharpe.

## 8. O que o relatório mostra

Uma página HTML local, no visual do hub, gerada por semana:

- **Cobertura:** horas coletadas, buracos, chamadas com erro.
- **Mercado:** quantos graduaram, quantos seguem negociando em 1, 7 e 30 dias, mediana
  de vida, distribuição de liquidez.
- **Hipóteses:** por hipótese, nº de previsões, Brier, skill score, e a linha de base.
- **Cada número aponta para as linhas que o geraram.**

## 9. Ordem de construção

| Passo | Entrega | Depende de |
|---|---|---|
| 1 | banco + registro de coletas e respostas | nada |
| 2 | descoberta de graduações + fichas | chave GMGN |
| 3 | acompanhamento de preço e liquidez | GeckoTerminal |
| 4 | janela dos 5 minutos | passo 2 |
| 5 | fatos do contrato | RPC |
| 6 | relatório de cobertura e mercado | 30 dias de coleta |
| 7 | rótulo escrito pelo dono e placar | passo 6 |
| 8 | camada social (Telegram) | [PLANO-TELEGRAM.md](PLANO-TELEGRAM.md) |

Os passos 1 a 5 rodam sem nenhuma dependência nova: o Node 24 do dono já traz SQLite,
fetch e WebSocket.

## 10. O que ainda não está verificado

- Se o GeckoTerminal grátis tem endpoint que traz várias pools numa chamada só (muda o
  ritmo do acompanhamento).
- Profundidade do histórico de velas da GMGN e os termos de uso do plano gratuito.
- Taxa da pump.fun na curva por perna (1% ou 1,25%): prevalece 1,25% até alguém reabrir.
- O BOOST de 21/07/2026 mudou o regime: reconstrução histórica que atravesse essa data
  mistura dois mercados.
