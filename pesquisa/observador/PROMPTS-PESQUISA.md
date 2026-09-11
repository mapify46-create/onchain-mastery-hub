# Prompts de pesquisa — Observatório de narrativas (Fase 0)

Sete prompts independentes, um para cada chat novo. Os prompts 1-4 cobrem dados e metodo; os 5-7 cobrem a pergunta "a IA consegue prever memecoin?" — evidencia, pontuacao e arquitetura. Cada um é autossuficiente: não
precisa anexar arquivo, é só copiar o bloco inteiro e colar.

**Modelo:** **Opus 5, esforço `xhigh`**, nos sete. (Os de raciocínio — 3, 5 e 6 — são os que mais
ganham com isso; nos de tabela o limite é a busca, não o esforço. Fable não precisa: 2× o custo
para tarefa de pesquisa.) Em todos: **busca na web ligada**.

Podem rodar em paralelo. Me mande cada resultado conforme sair.

---

# PROMPT 1 de 7 — Acesso a dados sociais (X, Telegram e trackers)

```
Preciso de um levantamento factual, em português do Brasil, sobre acesso programático
a dados de redes sociais para um projeto de pesquisa. Pesquise na web e priorize
fonte oficial (documentação e páginas de preço dos próprios serviços).

## Contexto

Estou construindo um "observatório": um sistema que roda no meu computador, observa
posts de contas públicas específicas (por exemplo, contas muito grandes que falam de
cripto), registra com hora exata, e mede o que aconteceu com o preço de tokens depois
— SEM operar. É paper trading e medição. Nunca haverá chave de carteira nem dinheiro
envolvido. Uso estritamente pessoal e de estudo.

Data de referência: setembro de 2026. Preços e limites de API mudam com frequência —
só vale o que estiver na página oficial HOJE.

## O que preciso saber

### A. API do X (Twitter)
1. Tiers atuais (Free, Basic, Pro, Enterprise ou o que existir hoje): preço mensal,
   limite de leitura por mês, limite de requisições por janela.
2. Existe "filtered stream" (receber posts em tempo real por regra) em algum tier
   acessível a pessoa física? Em qual, e quanto custa?
3. Latência típica entre o post ser publicado e chegar pela API (polling vs stream).
4. É possível saber QUEM uma conta passou a seguir (eventos de "follow")? Em qual
   tier? Isso é uma pergunta importante e desconfio que a resposta seja "não".
5. Os termos de uso permitem coletar e armazenar posts públicos de contas específicas
   para análise pessoal? O que é explicitamente proibido (scraping fora da API,
   redistribuição)?

### B. Alternativas para posts do X
6. Serviços de terceiros que oferecem monitoramento de contas do X por API (nome,
   preço, latência declarada, se são oficiais ou fazem scraping). Se fizerem
   scraping, diga — é critério de exclusão para mim.

### C. Telegram
7. Bot API: o que um bot consegue ler num canal público onde ele foi adicionado como
   administrador? E num canal onde NÃO foi adicionado?
8. API de cliente (Telethon/MTProto e similares): é permitida pelos termos para
   monitorar canais públicos? Há relatos de banimento de conta por uso automatizado?
   Quero fonte, não opinião de fórum.
9. Limites de requisição de cada caminho.

### D. A ferramenta "J7 Tracker" / "jTracker"
10. Existe uma ferramenta com esse nome (ou parecido) usada por traders de memecoin
    para acompanhar tweets/narrativas? Nome exato, site oficial, o que faz, modelo de
    custo, se tem API. Se NÃO encontrar fonte pública confiável, diga isso com todas
    as letras — "não verificado" é uma resposta válida e útil.
11. Independente da 10: quais são as ferramentas REAIS dessa categoria (tracker de
    tweets, tracker de carteiras, tracker de KOLs) em 2026? Uma linha de cada, sem
    ranking, com link.

## Regras

- Só afirme o que confirmou numa busca feita agora, com link logo depois da
  afirmação. Página oficial vale mais que artigo de terceiro.
- Preço e limite: copie o número da página oficial e registre a data. Não arredonde.
- NÃO VERIFICADO no que não fechar. Sem "provavelmente".
- Nada de recomendação de ferramenta; descrição neutra.

## Como trabalhar (leia antes de começar)

- **Busque de verdade, agora.** Não responda de memória: tudo que está aqui muda em
  meses. No fim do documento, liste as consultas de busca que você fez.
- **Abra a página, não confie no snippet.** Se uma afirmação vier só do resumo do
  buscador e você não conseguiu abrir a fonte, marque "(só snippet)". Isso já
  causou erro em pesquisa anterior deste projeto.
- **Fonte primária primeiro:** documentação oficial, página de preço oficial, artigo
  revisado por pares, dado on-chain. Blog, thread e vídeo são corroboração fraca —
  se usar, diga que é fraca.
- **Link logo depois de cada afirmação**, não só no fim. Quero ver em que cada frase
  se apoia, no lugar onde ela aparece.
- **Duas fontes divergindo: traga as duas**, com a diferença de método. Não escolha
  a mais conveniente.
- **NÃO VERIFICADO é uma resposta boa.** Preencher com estimativa é uma resposta
  ruim. Sem "provavelmente", sem "em geral".
- **Não abrevie o final.** Se o documento ficar longo, pare numa seção INTEIRA e
  escreva "CONTINUA — faltam: X, Y" que eu peço a continuação. Prefiro duas partes
  completas a uma inteira e outra pela metade.
- **Explique para leigo.** Não tenho formação técnica nem em estatística. Todo termo
  explicado na primeira vez em que aparece, dentro da própria frase.
- **O checkpoint no fim é obrigatório:** responda SÓ ao checkpoint, e espere a minha
  resposta antes de escrever o documento. Não emende o documento na mesma mensagem.
- Data de consulta em toda fonte.
## Formato da entrega

Um documento com: (1) tabela dos tiers da API do X com preço, limites e o que cada um
libera; (2) tabela de alternativas com "oficial / scraping"; (3) Telegram: Bot API vs
cliente, o que pode e o que arrisca, com fonte; (4) a resposta sobre o J7 Tracker;
(5) lista de ferramentas reais da categoria; (6) lista de NÃO VERIFICADOS; (7)
todas as fontes com link e data.

Antes de escrever o documento, me diga só o que encontrou sobre o preço do tier
mais barato do X que permite ler posts de contas específicas — e espere minha
resposta.
```

---

# PROMPT 2 de 7 — Dados on-chain e de preço (Solana)

```
Preciso de um levantamento factual, em português do Brasil, sobre fontes de dados
on-chain e de preço na rede Solana, para um projeto de pesquisa pessoal. Pesquise na
web e priorize documentação oficial dos provedores.

## Contexto

Estou construindo um "observatório" que roda no meu computador e MEDE o mercado de
memecoins: quantos tokens são lançados por dia, quantos graduam da bonding curve para
uma DEX, como o preço e a liquidez evoluem hora a hora, quantos morrem e em quanto
tempo. Também precisa responder "qual era o preço deste token às 14:03:27 de tal dia"
para simular operações no papel. Nunca operará, nunca terá chave de carteira.

Data de referência: setembro de 2026. Limites de tier grátis mudam; só vale o que
estiver na página oficial hoje.

## O que preciso saber

### A. Detectar tokens novos
1. Como saber, em tempo quase real, que um token novo foi criado num launchpad
   (pump.fun e equivalentes)? Existe feed oficial, WebSocket, ou é preciso escutar
   logs do programa on-chain? Qual o caminho mais simples e confiável?
2. Como saber que um token "graduou" (saiu da bonding curve para uma pool)?

### B. Preço e liquidez ao longo do tempo
3. APIs de preço com tier grátis: DexScreener, Birdeye, Jupiter Price API, GeckoTerminal
   e outras. Para cada: o que o tier grátis permite (requisições por minuto, por dia),
   se dá preço HISTÓRICO por timestamp ou só o atual, e granularidade (minuto? hora?).
4. Para tokens que morreram (liquidez removida), o histórico de preço continua
   disponível em algum lugar? Isso decide se dá para medir mortalidade
   retroativamente ou só daqui para frente.

### C. Nó / RPC
5. Provedores de RPC Solana com tier grátis (Helius, QuickNode, Triton, Alchemy e
   outros): limites do grátis, se incluem WebSocket e histórico, o que é pago.
6. Rodar nó próprio é viável em PC doméstico? (Desconfio que não — confirme.)

### D. Dados de segurança do token
7. APIs que devolvem: liquidez travada/queimada, mint e freeze authority,
   concentração de holders, detecção de bundle. RugCheck e equivalentes — o que o
   grátis permite.

### E. Dados agregados que JÁ existem
8. Dashboards públicos (Dune e similares) com taxa de graduação do pump.fun, número
   de lançamentos por dia, tempo de vida de tokens. Quero os links e a data dos dados
   — se já existe medição pública, meu observatório começa comparando com ela.

## Regras

- Só afirme o que confirmou agora, com link logo depois. Documentação oficial vale
  mais que artigo.
- Limites: copie o número da página oficial e registre a data.
- NÃO VERIFICADO no que não fechar.
- Sem recomendação de provedor — descrição neutra do que cada um dá.

## Como trabalhar (leia antes de começar)

- **Busque de verdade, agora.** Não responda de memória: tudo que está aqui muda em
  meses. No fim do documento, liste as consultas de busca que você fez.
- **Abra a página, não confie no snippet.** Se uma afirmação vier só do resumo do
  buscador e você não conseguiu abrir a fonte, marque "(só snippet)". Isso já
  causou erro em pesquisa anterior deste projeto.
- **Fonte primária primeiro:** documentação oficial, página de preço oficial, artigo
  revisado por pares, dado on-chain. Blog, thread e vídeo são corroboração fraca —
  se usar, diga que é fraca.
- **Link logo depois de cada afirmação**, não só no fim. Quero ver em que cada frase
  se apoia, no lugar onde ela aparece.
- **Duas fontes divergindo: traga as duas**, com a diferença de método. Não escolha
  a mais conveniente.
- **NÃO VERIFICADO é uma resposta boa.** Preencher com estimativa é uma resposta
  ruim. Sem "provavelmente", sem "em geral".
- **Não abrevie o final.** Se o documento ficar longo, pare numa seção INTEIRA e
  escreva "CONTINUA — faltam: X, Y" que eu peço a continuação. Prefiro duas partes
  completas a uma inteira e outra pela metade.
- **Explique para leigo.** Não tenho formação técnica nem em estatística. Todo termo
  explicado na primeira vez em que aparece, dentro da própria frase.
- **O checkpoint no fim é obrigatório:** responda SÓ ao checkpoint, e espere a minha
  resposta antes de escrever o documento. Não emende o documento na mesma mensagem.
- Data de consulta em toda fonte.
## Formato da entrega

Um documento com: (1) como detectar lançamento e graduação, passo a passo, com fonte;
(2) tabela de APIs de preço: tier grátis, limites, histórico sim/não, granularidade;
(3) tabela de RPCs grátis; (4) APIs de segurança de token; (5) dashboards públicos
com links e datas; (6) NÃO VERIFICADOS; (7) fontes.

Antes de escrever o documento, me diga só se existe alguma API grátis que dê preço
histórico por timestamp com granularidade de minuto — e espere minha resposta. Essa
resposta muda a arquitetura inteira.
```

---

# PROMPT 3 de 7 — Metodologia de paper trading honesto

```
Preciso de uma metodologia, em português do Brasil, para medir de forma HONESTA se
um sinal social antecipa movimento de preço em criptoativos de altíssimo risco
(memecoins), sem operar de verdade. Pesquise na web: quero literatura acadêmica e
prática de quem já mediu isso, não opinião.

## Contexto

Tenho (ou terei) um registro com hora exata de: posts de contas grandes que citam
tokens; criação, graduação e morte de tokens; preço e liquidez ao longo do tempo. Vou
escrever hipóteses do tipo "se a conta X cita um token, comprar 30 segundos depois e
vender 10 minutos depois" e quero saber o que TERIA acontecido, líquido de custos —
sem nunca operar. O objetivo é descobrir se existe alguma vantagem, e eu espero que a
resposta seja "não". Quero um método que não me deixe me enganar.

Data de referência: setembro de 2026.

## O que preciso

### A. O que a literatura já mediu
1. Estudos sobre posts de figuras públicas (o caso clássico é Elon Musk e Dogecoin)
   e retorno de criptoativos: o que encontraram, com que método, e — crucial — em
   que horizonte de tempo o efeito aparece e desaparece. Cite os trabalhos com link.
2. Estudos sobre sentimento de redes sociais e preço de cripto: o efeito sobrevive
   a custos de transação? Algum mediu líquido?
3. Se houver estudos específicos sobre memecoins em Solana/launchpads (mortalidade,
   rug pulls, comportamento pós-lançamento), traga.

### B. Como simular execução sem se enganar
4. **Atraso realista:** quanto tempo passa, na prática, entre um post ser publicado e
   uma transação de varejo entrar num bloco na Solana? Componha: latência da API,
   decisão, assinatura, inclusão no bloco. Quero o raciocínio e fontes para cada
   parcela.
5. **Impacto de preço:** confirme a fórmula do produto constante (recebido =
   Y·dx/(X+dx); impacto = dx/(X+dx)) e diga como estimar X e Y a partir da liquidez
   informada pelas APIs (que normalmente somam os dois lados).
6. **Custos:** como incluir taxa de plataforma, taxa de rede, priority fee, gorjeta
   de MEV e taxa da pool numa simulação, nas duas pontas (compra e venda).
7. **Sobrevivência:** como tratar o token que não existe mais no momento da venda
   simulada (liquidez removida). Contar como −100%? Como a literatura trata isso?

### C. Como não se enganar com estatística
8. **Pré-registro:** como escrever uma hipótese antes de olhar os dados de forma que
   não dê para "ajustar" depois. Modelo de ficha de hipótese.
9. **Tamanho de amostra:** quantas observações são necessárias antes de dizer
   qualquer coisa, dado que os retornos de memecoin têm cauda pesada? Método para
   calcular, não um número mágico.
10. **Múltiplas hipóteses:** se eu testar 20 regras, uma vai "funcionar" por acaso.
    Como corrigir (Bonferroni, FDR ou o que for adequado), explicado para leigo.
11. **Vazamento de futuro (look-ahead):** os erros clássicos que fazem um backtest
    parecer lucrativo. Lista com exemplo de cada.
12. **Intervalo de confiança** para o resultado líquido de uma hipótese, e como
    apresentar "não deu para concluir" como resultado legítimo.

## Regras

- Literatura com link (DOI, arXiv, SSRN ou página do periódico). Se um resultado
  vier de blog ou thread, marque como fonte fraca.
- Só afirme o que confirmou agora. NÃO VERIFICADO no que não fechar.
- Nenhuma recomendação de operação. O documento é sobre MEDIR, não sobre lucrar.
- Explicação para leigo: eu não tenho formação em estatística.

## Como trabalhar (leia antes de começar)

- **Busque de verdade, agora.** Não responda de memória: tudo que está aqui muda em
  meses. No fim do documento, liste as consultas de busca que você fez.
- **Abra a página, não confie no snippet.** Se uma afirmação vier só do resumo do
  buscador e você não conseguiu abrir a fonte, marque "(só snippet)". Isso já
  causou erro em pesquisa anterior deste projeto.
- **Fonte primária primeiro:** documentação oficial, página de preço oficial, artigo
  revisado por pares, dado on-chain. Blog, thread e vídeo são corroboração fraca —
  se usar, diga que é fraca.
- **Link logo depois de cada afirmação**, não só no fim. Quero ver em que cada frase
  se apoia, no lugar onde ela aparece.
- **Duas fontes divergindo: traga as duas**, com a diferença de método. Não escolha
  a mais conveniente.
- **NÃO VERIFICADO é uma resposta boa.** Preencher com estimativa é uma resposta
  ruim. Sem "provavelmente", sem "em geral".
- **Não abrevie o final.** Se o documento ficar longo, pare numa seção INTEIRA e
  escreva "CONTINUA — faltam: X, Y" que eu peço a continuação. Prefiro duas partes
  completas a uma inteira e outra pela metade.
- **Explique para leigo.** Não tenho formação técnica nem em estatística. Todo termo
  explicado na primeira vez em que aparece, dentro da própria frase.
- **O checkpoint no fim é obrigatório:** responda SÓ ao checkpoint, e espere a minha
  resposta antes de escrever o documento. Não emende o documento na mesma mensagem.
- Data de consulta em toda fonte.
## Formato da entrega

Um documento com: (1) resumo da literatura com o horizonte de tempo dos efeitos;
(2) o modelo de simulação de execução, parcela por parcela, com fonte; (3) a ficha
de pré-registro de hipótese, pronta para copiar; (4) o método de tamanho de amostra;
(5) a correção para múltiplas hipóteses, para leigo; (6) a lista de vazamentos de
futuro; (7) como reportar intervalo de confiança e "inconclusivo"; (8) NÃO
VERIFICADOS; (9) fontes.

Antes de escrever o documento, me diga só o que a literatura encontrou sobre o
horizonte de tempo do efeito "Elon posta → preço se move": minutos, horas ou dias?
E espere minha resposta.
```

---

# PROMPT 4 de 7 — O ciclo de vida dos tokens: os números que já existem

```
Preciso de um levantamento de NÚMEROS, em português do Brasil, sobre o ciclo de vida
de memecoins lançadas em launchpads (pump.fun e equivalentes) na Solana. Pesquise na
web e priorize dados on-chain públicos (dashboards do Dune e similares), relatórios de
empresas de análise e trabalhos acadêmicos — nessa ordem.

## Contexto

Estou construindo um observatório que vai MEDIR isso por conta própria. Antes de
medir, quero saber o que já foi medido, com que método, para comparar. E o material
educacional que mantenho afirma que "a maioria das memecoins vai a zero" — quero saber
quão sustentada essa frase está, e com que número.

Data de referência: setembro de 2026. Prefira dados de 2025–2026; registre o período
que cada número cobre.

## O que preciso saber

1. **Lançamentos por dia** em pump.fun e equivalentes, por período (2024, 2025,
   2026). Fonte do dado e como foi medido.
2. **Taxa de graduação:** que fração dos tokens lançados sai da bonding curve para
   uma pool. Por período. Se houver mais de uma medição, traga todas e as diferenças
   de método.
3. **Mortalidade:** que fração dos tokens tem liquidez removida ou preço abaixo de X%
   do pico depois de 24 h, 7 dias, 30 dias. Como cada fonte define "morto".
4. **Tempo de vida** típico: mediana e distribuição, se alguém mediu.
5. **Rug pulls e fraude:** relatórios (Solidus Labs, Chainalysis, TRM e similares)
   com fração de tokens identificados como rug/honeypot, período e método.
6. **Concentração:** que fração dos tokens tem top-10 holders acima de 50% do supply
   no lançamento, se alguém mediu.
7. **Retorno do comprador típico:** existe alguma medição de quanto o comprador de
   varejo médio ganhou ou perdeu em memecoins? (Desconfio que seja rara e frágil —
   diga a qualidade do dado.)
8. **Sniping e bundles:** que fração das compras no primeiro bloco/segundos vem de
   bots, se alguém mediu.

## Regras

- Todo número com: fonte (link), período coberto, método de medição em uma linha, e
  uma nota de qualidade (dado on-chain reproduzível / relatório de empresa / estimativa
  de terceiro / autopublicado).
- Onde duas fontes divergirem, traga as duas e explique a diferença de método.
- NÃO VERIFICADO no que não fechar. Número sem fonte não entra.
- Nada de conclusão de investimento. É descrição do mercado.

## Como trabalhar (leia antes de começar)

- **Busque de verdade, agora.** Não responda de memória: tudo que está aqui muda em
  meses. No fim do documento, liste as consultas de busca que você fez.
- **Abra a página, não confie no snippet.** Se uma afirmação vier só do resumo do
  buscador e você não conseguiu abrir a fonte, marque "(só snippet)". Isso já
  causou erro em pesquisa anterior deste projeto.
- **Fonte primária primeiro:** documentação oficial, página de preço oficial, artigo
  revisado por pares, dado on-chain. Blog, thread e vídeo são corroboração fraca —
  se usar, diga que é fraca.
- **Link logo depois de cada afirmação**, não só no fim. Quero ver em que cada frase
  se apoia, no lugar onde ela aparece.
- **Duas fontes divergindo: traga as duas**, com a diferença de método. Não escolha
  a mais conveniente.
- **NÃO VERIFICADO é uma resposta boa.** Preencher com estimativa é uma resposta
  ruim. Sem "provavelmente", sem "em geral".
- **Não abrevie o final.** Se o documento ficar longo, pare numa seção INTEIRA e
  escreva "CONTINUA — faltam: X, Y" que eu peço a continuação. Prefiro duas partes
  completas a uma inteira e outra pela metade.
- **Explique para leigo.** Não tenho formação técnica nem em estatística. Todo termo
  explicado na primeira vez em que aparece, dentro da própria frase.
- **O checkpoint no fim é obrigatório:** responda SÓ ao checkpoint, e espere a minha
  resposta antes de escrever o documento. Não emende o documento na mesma mensagem.
- Data de consulta em toda fonte.
## Formato da entrega

Um documento com: (1) tabela-mestra: métrica | número | período | fonte | método |
qualidade; (2) divergências entre fontes; (3) o que NINGUÉM mediu ainda (é o que meu
observatório pode medir primeiro); (4) NÃO VERIFICADOS; (5) fontes com link e data.

Antes de escrever o documento, me diga só a taxa de graduação mais bem sustentada
que encontrou, com fonte e período — e espere minha resposta.
```

---

# PROMPT 5 de 7 — O que a IA já consegue (e não consegue) prever em cripto

```
Preciso de uma revisão honesta, em português do Brasil, do estado da arte em
PREVISÃO de preço de criptoativos com machine learning e modelos de linguagem —
com foco no que foi validado fora da amostra e líquido de custos. Pesquise na web:
literatura acadêmica (arXiv, SSRN, periódicos), relatórios técnicos e replicações.
Opinião de thread e marketing de produto não contam como evidência.

## Contexto

Quero saber se um sistema com várias IAs (modelos rápidos para classificar sinais,
modelos de raciocínio para gerar previsões) consegue prever, com vantagem real,
quais memecoins sobem ou caem em horizontes de minutos a dias. Vou testar isso num
observatório próprio, em paper trading, com previsões registradas ANTES do fato.
Antes de construir, quero saber o que a evidência publicada diz. Espero que a
resposta seja desconfortável; prefiro isso a uma ilusão.

Data de referência: setembro de 2026.

## O que preciso saber

1. **Previsibilidade de retorno de cripto com ML** (2020–2026): quais trabalhos
   encontraram previsibilidade, em que horizonte, com que métrica — e, crucial, se
   o resultado sobreviveu a (a) teste fora da amostra, (b) custos de transação e
   slippage, (c) replicação independente. Separe os que sobreviveram dos que não.
2. **LLMs como previsores de mercado** (2023–2026): estudos que usaram GPT/Claude/
   Gemini/outros para prever preço ou direção. O que acharam? Houve vazamento de
   dados de treino (o modelo "conhecia" o período)? Como controlaram isso?
3. **Memecoins especificamente**: alguma evidência de previsibilidade em tokens de
   baixíssima liquidez e vida curta? Ou a literatura trata só de BTC/ETH? Diga se
   há lacuna.
4. **Decaimento de vantagem**: estudos sobre o que acontece com um sinal lucrativo
   depois de publicado ou amplamente usado (alpha decay). Isso me diz quanto vale
   uma vantagem que outros também podem construir com as mesmas APIs.
5. **Sistemas multiagente / ensembles de modelos** para previsão financeira: há
   evidência de que combinar modelos melhora previsão fora da amostra, ou só
   melhora o backtest?
6. **Torneios de previsão** (Metaculus, Good Judgment, benchmarks de forecasting
   com LLM): como os modelos se saem contra humanos calibrados, e o que isso
   sugere para previsão de preço em horizonte curto?
7. **Produtos comerciais** de "trading com IA" em cripto: algum tem track record
   auditado por terceiro? Se nenhum tiver, diga isso — é informação.

## Regras

- Cada afirmação com link. Marque a qualidade: revisado por pares / preprint /
  relatório de empresa / autopublicado.
- Distinga sempre: resultado em backtest × fora da amostra × ao vivo × líquido de
  custos. Um resultado que não diz qual dos quatro é vale pouco.
- NÃO VERIFICADO no que não fechar. Sem "provavelmente".
- Nenhuma recomendação de operação.

## Como trabalhar (leia antes de começar)

- **Busque de verdade, agora.** Não responda de memória: tudo que está aqui muda em
  meses. No fim do documento, liste as consultas de busca que você fez.
- **Abra a página, não confie no snippet.** Se uma afirmação vier só do resumo do
  buscador e você não conseguiu abrir a fonte, marque "(só snippet)". Isso já
  causou erro em pesquisa anterior deste projeto.
- **Fonte primária primeiro:** documentação oficial, página de preço oficial, artigo
  revisado por pares, dado on-chain. Blog, thread e vídeo são corroboração fraca —
  se usar, diga que é fraca.
- **Link logo depois de cada afirmação**, não só no fim. Quero ver em que cada frase
  se apoia, no lugar onde ela aparece.
- **Duas fontes divergindo: traga as duas**, com a diferença de método. Não escolha
  a mais conveniente.
- **NÃO VERIFICADO é uma resposta boa.** Preencher com estimativa é uma resposta
  ruim. Sem "provavelmente", sem "em geral".
- **Não abrevie o final.** Se o documento ficar longo, pare numa seção INTEIRA e
  escreva "CONTINUA — faltam: X, Y" que eu peço a continuação. Prefiro duas partes
  completas a uma inteira e outra pela metade.
- **Explique para leigo.** Não tenho formação técnica nem em estatística. Todo termo
  explicado na primeira vez em que aparece, dentro da própria frase.
- **O checkpoint no fim é obrigatório:** responda SÓ ao checkpoint, e espere a minha
  resposta antes de escrever o documento. Não emende o documento na mesma mensagem.
- Data de consulta em toda fonte.
## Formato da entrega

(1) tabela-mestra: trabalho | ativo | horizonte | método | sobreviveu a custos? |
fora da amostra? | replicado? | link; (2) o que a evidência sustenta e o que não
sustenta, em linguagem para leigo; (3) a lacuna sobre memecoins; (4) o que eu
precisaria mostrar para afirmar que "meu sistema prevê" — o padrão mínimo de prova;
(5) NÃO VERIFICADOS; (6) fontes.

Antes do documento, me diga só: existe algum trabalho revisado por pares que mostre
previsão de retorno de cripto em horizonte de minutos a horas, líquida de custos,
fora da amostra? Sim ou não, com a fonte — e espere minha resposta.
```

---

# PROMPT 6 de 7 — Como pontuar previsões de IA sem se enganar

```
Preciso de um método, em português do Brasil e para leigo, para PONTUAR previsões
feitas por modelos de IA sobre movimento de preço, de forma que não dê para me
enganar. Pesquise na web: literatura de forecasting, avaliação de previsão
probabilística, e prática de torneios de previsão.

## Contexto

Vou ter vários modelos (alguns rápidos, outros de raciocínio) gerando previsões do
tipo "este token estará acima do preço atual em 30 minutos, com 70% de confiança".
Cada previsão fica registrada com hora ANTES do fato. Um observatório mede o que
aconteceu. Quero um sistema de pontuação que recompense calibração e puna
excesso de confiança — e que não me deixe escolher só os acertos.

Data de referência: setembro de 2026.

## O que preciso

1. **Regras de pontuação próprias** (Brier, log score e similares): o que cada uma
   mede, qual usar para previsões binárias e para intervalos, com exemplo numérico.
2. **Calibração**: como medir se "70% de confiança" acerta 70% das vezes; gráfico
   de calibração explicado para leigo.
3. **Linha de base**: contra o que comparar — previsão "sempre não muda", "sempre
   cai" (em memecoin a maioria cai), aleatória. Uma IA que não bate a linha de base
   "sempre cai" não prevê nada. Como calcular.
4. **De previsão a dinheiro**: como converter uma previsão pontuada em resultado
   financeiro simulado, líquido de custos — e por que uma previsão bem calibrada
   pode ainda assim não dar lucro (custo maior que a vantagem).
5. **Comparar modelos entre si** de forma justa: mesmas perguntas, mesmo horário,
   mesma informação disponível. Como garantir que o modelo de raciocínio não teve
   "mais tempo" e por isso viu o futuro.
6. **Vazamento de informação**: como garantir que o modelo não sabia do resultado
   (dados de treino, contexto passado por engano, relógio errado).
7. **Quantas previsões** antes de dizer que um modelo é melhor que outro ou que a
   linha de base, dado que o resultado tem cauda pesada. Método, não número mágico.
8. **Registro auditável**: formato de log de previsão que permita a qualquer pessoa
   conferir depois (hash, hora, conteúdo, resultado).

## Regras

- Fonte com link para cada método. Explicação para quem não tem formação em
  estatística, com exemplo numérico.
- NÃO VERIFICADO no que não fechar.
- O documento é sobre medir; nenhuma recomendação de operação.

## Como trabalhar (leia antes de começar)

- **Busque de verdade, agora.** Não responda de memória: tudo que está aqui muda em
  meses. No fim do documento, liste as consultas de busca que você fez.
- **Abra a página, não confie no snippet.** Se uma afirmação vier só do resumo do
  buscador e você não conseguiu abrir a fonte, marque "(só snippet)". Isso já
  causou erro em pesquisa anterior deste projeto.
- **Fonte primária primeiro:** documentação oficial, página de preço oficial, artigo
  revisado por pares, dado on-chain. Blog, thread e vídeo são corroboração fraca —
  se usar, diga que é fraca.
- **Link logo depois de cada afirmação**, não só no fim. Quero ver em que cada frase
  se apoia, no lugar onde ela aparece.
- **Duas fontes divergindo: traga as duas**, com a diferença de método. Não escolha
  a mais conveniente.
- **NÃO VERIFICADO é uma resposta boa.** Preencher com estimativa é uma resposta
  ruim. Sem "provavelmente", sem "em geral".
- **Não abrevie o final.** Se o documento ficar longo, pare numa seção INTEIRA e
  escreva "CONTINUA — faltam: X, Y" que eu peço a continuação. Prefiro duas partes
  completas a uma inteira e outra pela metade.
- **Explique para leigo.** Não tenho formação técnica nem em estatística. Todo termo
  explicado na primeira vez em que aparece, dentro da própria frase.
- **O checkpoint no fim é obrigatório:** responda SÓ ao checkpoint, e espere a minha
  resposta antes de escrever o documento. Não emende o documento na mesma mensagem.
- Data de consulta em toda fonte.
## Formato da entrega

(1) a regra de pontuação escolhida, com exemplo; (2) calibração para leigo; (3) as
linhas de base e como calcular; (4) previsão → resultado líquido; (5) protocolo de
comparação justa entre modelos; (6) lista de vazamentos e como evitar; (7) método
de tamanho de amostra; (8) formato do log auditável; (9) NÃO VERIFICADOS; (10)
fontes.

Antes do documento, me diga só qual regra de pontuação você usaria para previsões
binárias com confiança, e por quê — e espere minha resposta.
```

---

# PROMPT 7 de 7 — Arquitetura de sistemas multi-IA para análise de mercado

```
Preciso de um levantamento técnico, em português do Brasil, sobre como sistemas
com VÁRIOS modelos de IA (rápidos e de raciocínio) são organizados para analisar
fluxos de dados em tempo quase real — e onde eles falham. Pesquise na web:
documentação de fornecedores, artigos de engenharia, relatórios de incidentes.

## Contexto

Quero um sistema que: (a) classifique milhares de posts e eventos on-chain por dia
com modelos rápidos e baratos (Haiku, Mercury 2, Gemini Flash ou equivalentes); (b)
passe os casos relevantes para modelos de raciocínio (Opus, GPT de raciocínio,
Gemini Pro) que produzam uma previsão com confiança; (c) registre tudo para ser
pontuado depois. NÃO opera; só prevê e registra. Roda no meu computador ou numa
máquina barata.

Data de referência: setembro de 2026. Preços e limites mudam; use a página oficial.

## O que preciso saber

1. **Padrões de arquitetura**: roteamento por custo (barato filtra, caro decide),
   ensembles, debate entre modelos, "juiz" — o que a literatura e a prática de
   engenharia mostram que funciona e o que só parece funcionar.
2. **Latência real de ponta a ponta** de cada modelo candidato: tempo até o primeiro
   token e tempo total para uma resposta curta (50 tokens) e uma longa (500), com
   fonte de medição independente (Artificial Analysis ou similar), não do fabricante.
3. **Custo por dia** para um volume de, por exemplo, 20 mil classificações curtas e
   500 previsões longas por dia, por modelo, com os preços oficiais de hoje.
4. **Limites de requisição** de cada API e o que acontece ao estourar.
5. **Alucinação em dados estruturados**: com que frequência modelos inventam
   endereço de contrato, ticker ou número ao classificar posts? Como mitigar
   (validar contra fonte on-chain, nunca confiar no texto do modelo para um
   endereço).
6. **Consistência**: o mesmo modelo dá a mesma resposta para a mesma entrada?
   Como medir e o que fazer com a variação.
7. **Falhas conhecidas** de sistemas de análise em tempo real com LLM: incidentes
   documentados, custos que explodiram, loops, dados vazados por prompt injection
   vindo do conteúdo analisado (um post pode conter instruções para o modelo).
8. **Injeção de prompt via conteúdo**: como tratar um post ou nome de token que
   contém texto tentando manipular o classificador. Isso é risco real para mim:
   o conteúdo que analiso é hostil por natureza.

## Regras

- Fonte com link. Medição independente vale mais que fabricante.
- Preço e limite: copie da página oficial, com data.
- NÃO VERIFICADO no que não fechar.
- Sem recomendação de fornecedor; tabela neutra.

## Como trabalhar (leia antes de começar)

- **Busque de verdade, agora.** Não responda de memória: tudo que está aqui muda em
  meses. No fim do documento, liste as consultas de busca que você fez.
- **Abra a página, não confie no snippet.** Se uma afirmação vier só do resumo do
  buscador e você não conseguiu abrir a fonte, marque "(só snippet)". Isso já
  causou erro em pesquisa anterior deste projeto.
- **Fonte primária primeiro:** documentação oficial, página de preço oficial, artigo
  revisado por pares, dado on-chain. Blog, thread e vídeo são corroboração fraca —
  se usar, diga que é fraca.
- **Link logo depois de cada afirmação**, não só no fim. Quero ver em que cada frase
  se apoia, no lugar onde ela aparece.
- **Duas fontes divergindo: traga as duas**, com a diferença de método. Não escolha
  a mais conveniente.
- **NÃO VERIFICADO é uma resposta boa.** Preencher com estimativa é uma resposta
  ruim. Sem "provavelmente", sem "em geral".
- **Não abrevie o final.** Se o documento ficar longo, pare numa seção INTEIRA e
  escreva "CONTINUA — faltam: X, Y" que eu peço a continuação. Prefiro duas partes
  completas a uma inteira e outra pela metade.
- **Explique para leigo.** Não tenho formação técnica nem em estatística. Todo termo
  explicado na primeira vez em que aparece, dentro da própria frase.
- **O checkpoint no fim é obrigatório:** responda SÓ ao checkpoint, e espere a minha
  resposta antes de escrever o documento. Não emende o documento na mesma mensagem.
- Data de consulta em toda fonte.
## Formato da entrega

(1) padrões de arquitetura com evidência de cada um; (2) tabela de modelos: latência
medida, custo por 1M tokens, custo/dia no meu volume, limites; (3) alucinação e
consistência: dados e mitigação; (4) injeção de prompt: risco e defesa; (5) falhas
documentadas; (6) NÃO VERIFICADOS; (7) fontes.

Antes do documento, me diga só o custo diário estimado do caminho mais barato
viável para o meu volume — e espere minha resposta.
```
