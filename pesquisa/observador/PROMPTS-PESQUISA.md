# Prompts de pesquisa — Observatório de narrativas (Fase 0)

Quatro prompts independentes, um para cada chat novo. Cada um é autossuficiente: não
precisa anexar arquivo, é só copiar o bloco inteiro e colar.

**Modelo:** **Sonnet 5, esforço `high`** nos prompts 1, 2 e 4 (levantamento de fatos
com tabela). **Opus 5, esforço `high`** no prompt 3 (metodologia — é raciocínio, e é
onde um erro custa mais). Em todos: **busca na web ligada**.

Podem rodar em paralelo. Me mande cada resultado conforme sair.

---

# PROMPT 1 de 4 — Acesso a dados sociais (X, Telegram e trackers)

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

# PROMPT 2 de 4 — Dados on-chain e de preço (Solana)

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

# PROMPT 3 de 4 — Metodologia de paper trading honesto

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

# PROMPT 4 de 4 — O ciclo de vida dos tokens: os números que já existem

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

## Formato da entrega

Um documento com: (1) tabela-mestra: métrica | número | período | fonte | método |
qualidade; (2) divergências entre fontes; (3) o que NINGUÉM mediu ainda (é o que meu
observatório pode medir primeiro); (4) NÃO VERIFICADOS; (5) fontes com link e data.

Antes de escrever o documento, me diga só a taxa de graduação mais bem sustentada
que encontrou, com fonte e período — e espere minha resposta.
```
