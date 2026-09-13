# Prompts de pesquisa — Módulos 6 e 7, reforma do Módulo 3 e o checklist

Sete prompts independentes, um para cada chat novo. Cada um é autossuficiente: não
precisa anexar arquivo, é só copiar o bloco inteiro e colar.

**Para que serve cada um:**

| # | Pesquisa | Alimenta |
|---|---|---|
| 1 | Os números da tela (market cap, FDV, liquidez, PnL) | Módulo 6 |
| 2 | Volume falso, wash trading e bundles | Módulo 6 |
| 3 | Vetores de contrato: dev dump, metadata mutável, tax token | Módulo 6 |
| 4 | As ferramentas do pilar técnico, tela por tela | Módulo 3 |
| 5 | O pilar social na prática (Discord é a lacuna) | Módulo 3 |
| 6 | Rotina, registro e tamanho de posição sob cauda pesada | Módulo 7 |
| 7 | Que sinais têm evidência publicada de prever fraude | O checklist |

**Modelo:** **Fable 5.1, esforço `xhigh`**, nos sete (escolha do dono, 12/09/2026).
Em todos: **busca na web ligada**.

**Conectores:** Scholar Gateway (busca acadêmica) e TinyFish (abre a página de
verdade) precisam estar conectados antes de colar o prompt. Se o seu plano tiver o
modo **Research** no claude.ai, use-o nos sete.

**O que já está pago:** a Fase 0 do observatório já respondeu parte do 2, do 5 e do 6
— cada prompt diz o que já existe, para a pesquisa não refazer trabalho feito. Os
documentos estão em `pesquisa/observador/fase0/`.

Podem rodar em paralelo. Me mande cada resultado conforme sair.

---

# PROMPT 1 de 7 — Os números que a tela mostra

```
Preciso de um levantamento factual e PRÁTICO, em português do Brasil, sobre o que
significam os números que aparecem na tela de um terminal de memecoin. Pesquise na
web e priorize documentação oficial e artigo revisado por pares.

## Contexto

Estou escrevendo um módulo de um curso próprio sobre trading on-chain de memecoins
(Solana e EVM). O leitor sou eu: não tenho formação em programação nem em
estatística, e aprendo do zero. O módulo se chama "Ler a tela" e existe porque eu
percebi que olho para números que não sei interpretar.

O curso é prático e direto. Ele não precisa de ressalva genérica de risco a cada
parágrafo — o que ele precisa é que TODO número tenha fonte, porque número inventado
é o que estraga material de estudo.

Data de referência: setembro de 2026.

## O que preciso saber

### A. Market cap, FDV e liquidez — o que cada um é, de verdade
1. Como se calcula o market cap de uma memecoin, exatamente? Qual "supply" entra na
   conta, e quem decide o que é circulante quando quase todo o supply é criado de uma
   vez no lançamento?
2. O que é FDV (fully diluted valuation) e em que situação ele difere do market cap
   numa memecoin? Se o supply já está todo emitido desde o lançamento, FDV e market
   cap são iguais? Quero a resposta com exemplo numérico.
3. O que exatamente é a "liquidez" mostrada num terminal (ex.: o campo
   `reserve_in_usd` do GeckoTerminal)? É o dinheiro que dá para sacar? É metade
   dele? Explique a mecânica da pool de produto constante por trás do número.
4. A relação que mais me interessa: com liquidez L numa pool de produto constante,
   quanto eu consigo VENDER antes de derrubar o preço em 10%, 30%, 50%? Quero a
   fórmula e uma tabela de exemplo. Essa é a conta que diz se dá para sair.
5. Por que market cap alto com liquidez baixa é a situação clássica de "número de
   fantasia"? Existe alguma razão publicada, com medição, para uma proporção mínima
   saudável entre liquidez e market cap? Se ninguém publicou isso, diga.

### B. PnL — o lucro que a tela mostra
6. Como os terminais (Axiom, GMGN, Photon, DexScreener) calculam o PnL exibido?
   Usam preço médio de compra? Incluem taxas pagas? Incluem o impacto de preço da
   saída?
7. Qual a diferença prática entre PnL realizado e não realizado numa memecoin, onde
   a liquidez some? O "lucro" não realizado que a tela mostra é alcançável?
8. Erros conhecidos de leitura de PnL em terminal de memecoin — casos documentados de
   número que não bate com o que foi sacado.

### C. Onde as fontes divergem
9. Pegue UM token real qualquer, negociado hoje, e compare o que DexScreener,
   GeckoTerminal e Birdeye mostram para: preço, market cap, liquidez e volume 24h.
   Registre as diferenças com captura do número e a hora da consulta. Se divergirem,
   explique por quê (fonte de supply diferente? pools agregadas diferente?).

## Regras

- Só afirme o que confirmou numa busca feita agora, com link logo depois da
  afirmação.
- Toda fórmula vem com um exemplo numérico resolvido, passo a passo. Não basta a
  fórmula.
- NÃO VERIFICADO no que não fechar. Sem "provavelmente", sem "em geral".
- Não recomende ferramenta nem token; descrição neutra.
- Explique todo termo na primeira vez em que aparece, dentro da própria frase.

## Ferramentas conectadas — use assim

Você tem **TinyFish** (busca + leitura do conteúdo real da página) e **Scholar
Gateway** (busca acadêmica).

- Para **todo número**, use `fetch_content` na página oficial e copie o número DA
  PÁGINA. Snippet de busca resume, arredonda e envelhece.
- Para o item 9, abra os três sites de verdade e registre a hora da consulta.
- Para a mecânica da pool de produto constante, procure a documentação primária
  (Uniswap v2 whitepaper, docs da Raydium) antes de qualquer artigo de blog.
- Registre, por fonte, se você **abriu a página** ou usou só o resultado da busca —
  aparece no documento como "(página aberta)" ou "(só snippet)".

## Como trabalhar (leia antes de começar)

- **Busque de verdade, agora.** No fim do documento, liste as consultas que fez.
- **Abra a página, não confie no snippet.** Isso já causou erro em pesquisa anterior
  deste projeto.
- **Fonte primária primeiro:** documentação oficial, artigo revisado por pares, dado
  on-chain. Blog e thread são corroboração fraca — se usar, diga que é fraca.
- **Link logo depois de cada afirmação**, não só no fim.
- **Duas fontes divergindo: traga as duas**, com a diferença de método.
- **NÃO VERIFICADO é uma resposta boa.** Estimativa preenchida é resposta ruim.
- **Não abrevie o final.** Se ficar longo, pare numa seção INTEIRA e escreva
  "CONTINUA — faltam: X, Y".
- **Explique para leigo.** Não tenho formação técnica nem em estatística.
- **O checkpoint no fim é obrigatório:** responda SÓ ao checkpoint e espere minha
  resposta antes de escrever o documento.
- Data de consulta em toda fonte.

## Formato da entrega

Um documento com: (1) o que é cada número, com a conta; (2) a tabela "quanto dá para
vender antes de derrubar o preço em X%"; (3) PnL: como é calculado e onde engana;
(4) a comparação das três fontes para o mesmo token, com hora; (5) lista de NÃO
VERIFICADOS; (6) todas as fontes com link e data.

Antes de escrever o documento, me diga só uma coisa: numa memecoin recém-lançada em
que todo o supply já foi emitido, FDV e market cap são o mesmo número ou não? E
espere minha resposta.
```

---

# PROMPT 2 de 7 — Volume falso, wash trading e bundles

```
Preciso de um levantamento factual, em português do Brasil, sobre como o volume e a
atividade de uma memecoin são fabricados, e como uma pessoa comum detecta isso com
ferramenta gratuita. Pesquise na web e priorize artigo revisado por pares e dado
on-chain reproduzível.

## Contexto

Estou escrevendo um módulo de um curso próprio chamado "Ler a tela", sobre o que os
números de um terminal de memecoin escondem. Eu sou o leitor: sem formação em
programação nem estatística.

Data de referência: setembro de 2026. Rede principal: Solana (pump.fun e derivados);
EVM entra como comparação.

## O que já está respondido — NÃO refaça

Uma pesquisa anterior minha já levantou o seguinte, e eu quero que você CONFIRME e
ESTENDA, não que recomece:
- Midsummer (arXiv 2507.01963, publicado no USENIX Security '26): 82,8% dos tokens de
  alto retorno (>100%) com sinais de crescimento artificial; US$ 3,27 mi de perdas em
  pump-and-dump e US$ 6,04 mi em rug pulls; mais de 17.000 vítimas.
- MemeTrans (arXiv 2602.13480): 36,5% do supply em contas de bundle; bundle holder
  ratio de 28,13%, com três heurísticas (mesma transação, mesmo financiador, mesmo
  Jito bundle ID).
- Chainalysis 2025: 3,59% dos tokens de 2024 com heurística estrita de pump-and-dump.

Confirme se esses números seguem valendo e se houve trabalho novo depois.

## O que preciso saber

### A. Wash trading: a mecânica
1. O que é wash trading numa DEX de Solana, passo a passo? Quem paga o quê para
   inflar o volume, e quanto custa fazer isso (em SOL) por milhão de dólares de
   volume fabricado?
2. Por que alguém faz isso: que sistemas de ranking, listagem ou destaque premiam
   volume alto? (Ex.: posição em página de "trending".) Quero o incentivo concreto.
3. Heurísticas PUBLICADAS de detecção de wash trading on-chain, com a fonte de cada
   uma. Para cada heurística: o que ela mede, qual o limiar, e qual a taxa de falso
   positivo declarada.

### B. O que dá para ver de graça
4. Com ferramentas gratuitas (DexScreener, GeckoTerminal, Solscan, RugCheck,
   Bubblemaps), quais sinais de volume fabricado uma pessoa comum consegue observar?
   Quero uma lista operacional: o que olhar, onde fica na tela, e o que é o sinal.
5. A razão entre volume e número de carteiras únicas é um sinal útil? Existe algum
   valor de referência publicado? Se não existe, diga — e explique por que a razão
   ainda ajuda mesmo sem número de corte.
6. Como distinguir volume de bot legítimo (market maker, arbitragem) de wash trading?
   Essa distinção é possível de fora? Se não for, quero isso escrito com todas as
   letras.

### C. Bundles
7. O que é exatamente um bundle no lançamento de um token em Solana, e qual o papel
   do Jito nisso? Explique o mecanismo.
8. Como um iniciante detecta bundle depois do fato, com ferramenta gratuita?
9. Bundle alto é sempre má notícia? Existe uso legítimo? Quero a nuance com fonte.

## Regras

- Só afirme o que confirmou numa busca feita agora, com link logo depois.
- Todo número com fonte, data e método. Se o método não estiver publicado, diga.
- Distinga claramente: revisado por pares / preprint / relatório de empresa /
  autopublicado.
- NÃO VERIFICADO no que não fechar.
- Explique todo termo na primeira vez em que aparece.

## Ferramentas conectadas — use assim

- **Scholar Gateway** para os trabalhos acadêmicos: confirme se cada preprint citado
  acima foi publicado em conferência ou periódico, e procure trabalho posterior.
- **TinyFish** para abrir as páginas das ferramentas e ver os campos reais.
- Marque "(página aberta)" / "(só snippet)" em cada fonte.

## Como trabalhar (leia antes de começar)

- **Busque de verdade, agora.** Liste as consultas no fim.
- **Abra a página, não confie no snippet.**
- **Fonte primária primeiro.** Blog e thread são corroboração fraca — diga quando for.
- **Link logo depois de cada afirmação.**
- **Duas fontes divergindo: traga as duas**, com a diferença de método.
- **NÃO VERIFICADO é uma resposta boa.**
- **Não abrevie o final.** Pare numa seção INTEIRA e escreva "CONTINUA — faltam: X".
- **Explique para leigo.**
- **O checkpoint no fim é obrigatório.**
- Data de consulta em toda fonte.

## Formato da entrega

Um documento com: (1) a mecânica do wash trading com o custo em SOL; (2) tabela de
heurísticas publicadas com limiar e falso positivo; (3) a lista operacional do que dá
para ver de graça, campo por campo; (4) bundles: mecanismo, detecção e a nuance;
(5) lista de NÃO VERIFICADOS; (6) fontes com link e data.

Antes de escrever o documento, me diga só isto: existe algum limiar publicado de
"razão volume / carteiras únicas" acima do qual se considera volume suspeito? Sim ou
não, com a fonte. E espere minha resposta.
```

---

# PROMPT 3 de 7 — Vetores de contrato: dev dump, metadata mutável e tax token

```
Preciso de um levantamento factual e prático, em português do Brasil, sobre três
formas de perder dinheiro que dependem do CONTRATO do token, e não do mercado.
Pesquise na web e priorize documentação oficial de protocolo e artigo revisado por
pares.

## Contexto

Estou escrevendo um módulo de curso próprio chamado "Ler a tela". Eu sou o leitor:
sem formação em programação. O módulo já vai cobrir market cap, FDV, liquidez e
volume falso. Falta a parte do contrato.

Meu curso JÁ ensina, com fonte: mint authority, freeze authority, LP travada ou
queimada, concentração do top 10 e bundles. NÃO refaça esses. Quero os que faltam.

Rede principal: Solana. EVM entra como comparação quando o vetor for diferente.
Data de referência: setembro de 2026.

## O que preciso saber

### A. Dev dump
1. O que é exatamente um "dev dump", e como ele aparece on-chain? Quero a assinatura
   observável: que transações, de que carteira, em que ordem.
2. Como se identifica a carteira do criador de um token do pump.fun, e como se vê
   quanto ele comprou no lançamento e quando vendeu? Passo a passo com ferramenta
   gratuita.
3. Existe número medido de quantos criadores vendem tudo, e em quanto tempo? Com
   fonte e método.
4. O pump.fun ou outro launchpad tem algum mecanismo que limite isso (vesting,
   trava do criador)? Mudou ao longo de 2025-2026?

### B. Metadata mutável
5. Na Solana, o que exatamente pode ser alterado no token DEPOIS que eu comprei?
   Nome, símbolo, imagem, URI de metadados? Quem pode alterar, e como se vê se essa
   permissão está ativa? Explique o papel do Metaplex.
6. Existe golpe documentado que use troca de metadata depois da compra? Quero caso
   concreto com fonte.
7. Como se checa isso de graça, campo por campo, no RugCheck e no Solscan?
8. O equivalente em EVM: proxy contract e contrato atualizável — o que muda para quem
   comprou?

### C. Tax token e honeypot por taxa
9. O que é um "tax token"? Como se implementa taxa de venda em EVM, e isso é possível
   em Solana com o padrão SPL clássico? E com o Token-2022 / transfer hooks?
10. Qual a diferença prática entre não conseguir vender (honeypot clássico, via
    freeze authority) e conseguir vender perdendo quase tudo para uma taxa?
11. Como se detecta taxa de venda ANTES de comprar, de graça? Existe simulação de
    venda em alguma ferramenta gratuita?
12. Números medidos de prevalência de tax token e honeypot, se existirem, com fonte.

## Regras

- Só afirme o que confirmou numa busca feita agora, com link logo depois.
- Para mecânica de protocolo, a documentação oficial (Metaplex, Solana Token-2022,
  docs do pump.fun) vale mais que qualquer artigo.
- Distinga claramente o que é possível em Solana SPL clássico, em Token-2022 e em EVM.
  Confundir isso é erro grave para o meu leitor.
- NÃO VERIFICADO no que não fechar.
- Explique todo termo na primeira vez em que aparece.

## Ferramentas conectadas — use assim

- **TinyFish** para abrir a documentação oficial do Metaplex, do Token-2022 e do
  pump.fun, e para abrir o RugCheck e o Solscan e ver os campos reais.
- **Scholar Gateway** para os números medidos de prevalência.
- Marque "(página aberta)" / "(só snippet)" em cada fonte.

## Como trabalhar (leia antes de começar)

- **Busque de verdade, agora.** Liste as consultas no fim.
- **Abra a página, não confie no snippet.**
- **Fonte primária primeiro.**
- **Link logo depois de cada afirmação.**
- **Duas fontes divergindo: traga as duas.**
- **NÃO VERIFICADO é uma resposta boa.**
- **Não abrevie o final.** Pare numa seção INTEIRA e escreva "CONTINUA — faltam: X".
- **Explique para leigo.**
- **O checkpoint no fim é obrigatório.**
- Data de consulta em toda fonte.

## Formato da entrega

Um documento com: (1) dev dump: assinatura on-chain, passo a passo de detecção e
números medidos; (2) metadata mutável: o que muda, quem pode, como checar, com caso
real; (3) tax token e honeypot: o que é possível em cada padrão de token, e como
detectar antes; (4) uma tabela final "vetor → onde checar → o que é sinal de alerta";
(5) NÃO VERIFICADOS; (6) fontes com link e data.

Antes de escrever o documento, me diga só isto: é possível cobrar taxa de venda num
token SPL clássico da Solana, sem Token-2022? Sim ou não, com a fonte oficial. E
espere minha resposta.
```

---

# PROMPT 4 de 7 — As ferramentas do pilar técnico, tela por tela

```
Preciso de um guia PRÁTICO, em português do Brasil, de como usar quatro ferramentas
gratuitas de checagem de token, campo por campo. Não quero descrição do que a
ferramenta faz — quero saber onde clicar e o que cada número na tela significa.

## Contexto

Estou reformando um módulo do meu curso próprio. Hoje ele é um catálogo: lista as
ferramentas e diz "o que faz / quando usar / risco". Nunca mostra COMO usar, e é por
isso que ele não serve para nada na prática.

O modelo que quero seguir já existe em outro módulo meu: um tutorial clique a clique,
do tipo "abra tal site, cole o endereço no campo X, olhe o campo Y, e se ele estiver
assim, é sinal de alerta".

Eu sou o leitor: sem formação em programação. Rede principal: Solana.
Data de referência: setembro de 2026.

## As quatro ferramentas

**RugCheck (rugcheck.xyz)** — a checagem de segurança
**Solscan (solscan.io)** — o explorador oficial
**Bubblemaps (bubblemaps.io)** — o mapa de carteiras conectadas
**DexScreener (dexscreener.com)** — o gráfico e os números do par

## O que preciso de CADA uma

1. **O caminho exato:** da página inicial até a tela útil. Onde se cola o endereço do
   token, o que acontece depois.
2. **Todo campo da tela útil, um por um:** o nome do campo como aparece, o que ele
   significa em português claro, e qual valor é sinal de alerta. Se o campo tiver
   nome só em inglês, diga o nome em inglês E a tradução.
3. **O que a ferramenta NÃO mostra** — o limite dela. Isso é tão importante quanto o
   que ela mostra, porque é onde o leitor cria falsa confiança.
4. **Se exige cadastro, chave ou pagamento** para o que descrevi, e o que muda no
   plano gratuito.
5. **Uma armadilha de leitura conhecida** de cada ferramenta: um campo que costuma
   ser mal interpretado, e por quê.

## Perguntas específicas

6. No RugCheck: o que significa exatamente o "score" de risco, como ele é calculado, e
   por que não se deve confiar só nele? O campo `rugged` significa o quê? O que o
   grafo de insiders mostra e o que ele não prova?
7. No Solscan: onde ficam mint authority, freeze authority, lista de holders e as
   primeiras transações de um token? Como se vê quanto o criador comprou?
8. No Bubblemaps: como se lê um cluster? Bolhas conectadas provam coordenação ou só
   sugerem? Qual a diferença entre carteiras com mesmo financiador e carteiras que
   apenas negociaram entre si?
9. No DexScreener: o que cada número do topo do par significa (liquidez, FDV, market
   cap, volume, transações, makers)? A aba de "Security" ou equivalente é confiável?

## Regras

- **Abra as quatro ferramentas de verdade** e descreva o que está na tela HOJE.
  Descrição feita de memória ou de tutorial antigo não serve: as interfaces mudam.
- Se um campo que você esperava não existir mais, diga isso.
- Não recomende ferramenta nem token. Neutro.
- NÃO VERIFICADO onde não conseguir abrir.
- Explique todo termo na primeira vez em que aparece.
- Use um mesmo token real como exemplo nas quatro ferramentas, para eu poder comparar
  as telas. Diga qual token e a hora da consulta.

## Ferramentas conectadas — use assim

- **TinyFish** é essencial aqui: use a sessão de navegador para abrir cada ferramenta
  e ler a página renderizada. Essas telas carregam por JavaScript — busca simples não
  vai enxergar os campos.
- Se alguma delas bloquear leitura automatizada, diga com todas as letras e marque a
  seção como NÃO VERIFICADO em vez de descrever de memória.

## Como trabalhar (leia antes de começar)

- **Abra de verdade, agora.** Liste as URLs que abriu no fim.
- **Descreva o que viu, não o que costuma existir.**
- **Link logo depois de cada afirmação.**
- **NÃO VERIFICADO é uma resposta boa.**
- **Não abrevie o final.** Se ficar longo, entregue UMA ferramenta inteira por vez e
  escreva "CONTINUA — faltam: X, Y". Prefiro quatro partes completas.
- **Explique para leigo.**
- **O checkpoint no fim é obrigatório.**
- Data e hora de consulta em cada tela descrita.

## Formato da entrega

Um documento com uma seção por ferramenta, e em cada uma: (1) o caminho até a tela
útil; (2) tabela "campo na tela → o que significa → valor de alerta"; (3) o que a
ferramenta não mostra; (4) a armadilha de leitura; (5) o que muda no plano gratuito.
No fim: uma tabela cruzada "o que eu quero checar → em qual das quatro eu checo",
mais NÃO VERIFICADOS e fontes.

Antes de escrever o documento, me diga só isto: você conseguiu abrir as quatro
ferramentas e ver os campos renderizados? Quais abriram e quais não. E espere minha
resposta.
```

---

# PROMPT 5 de 7 — O pilar social na prática

```
Preciso de um levantamento factual e prático, em português do Brasil, sobre como
acompanhar o lado SOCIAL de uma memecoin sem pagar API, e o que dá para fazer em cada
rede. Pesquise na web e priorize documentação oficial.

## Contexto

Estou reformando um módulo do meu curso próprio que hoje só diz que "o pilar social
cobre X, Discord e Telegram" — sem nunca ensinar o que fazer neles. Quero a parte
prática.

Eu sou o leitor: sem formação em programação. Uso pessoal, manual, sem robô. Data de
referência: setembro de 2026.

## O que já está respondido — NÃO refaça

Uma pesquisa anterior minha já resolveu, com fonte oficial:
- **X/Twitter por API:** US$ 0,005 por post lido; ~US$ 45/mês para 30 contas; existe
  filtered stream com latência de 4 a 5 segundos (P99); NÃO é possível detectar
  eventos de "follow" de contas que não autorizaram o app; scraping fora da API é
  expressamente proibido pelos termos.
- **Telegram:** um bot só lê um canal onde foi adicionado como ADMINISTRADOR; o dono
  do canal precisa aceitar. O caminho alternativo (cliente MTProto logado como
  usuário) é permitido pelos termos mas coloca a conta "sob observação".

Confirme se seguem valendo e siga para o que falta.

## O que preciso saber

### A. Discord — esta é a lacuna principal
1. Como as comunidades de memecoin usam o Discord hoje? O que tipicamente acontece
   num servidor de token: anúncios, calls, verificação de contrato?
2. O que dá para LER num servidor público sem entrar nele? E entrando como membro
   comum, manualmente?
3. Regras oficiais do Discord sobre bots e sobre automação de conta de usuário
   ("selfbot"): o que é permitido, o que é banimento. Quero o texto oficial.
4. Existe forma legítima e gratuita de ser avisado quando um servidor publica algo?
   (Webhook, integração oficial, seguir canal de anúncio?)
5. Golpes específicos de Discord em cripto: servidor falso, bot falso de verificação,
   link de "conectar carteira". Quero o roteiro do golpe, passo a passo, com fonte —
   isso vai virar conteúdo de defesa no meu curso.

### B. X/Twitter sem pagar
6. O que dá para fazer de graça e manualmente hoje: listas, notificações de conta,
   busca avançada? Quais dessas ainda existem em 2026 e quais foram removidas?
7. Como se confirma que um endereço de contrato divulgado num post é o oficial? Qual
   a sequência de checagem? Esta é a checagem social mais importante do meu curso e
   quero ela detalhada.
8. Como se reconhece conta falsa imitando projeto ou pessoa (handle parecido, conta
   comprada, seguidores falsos)? Sinais observáveis, de graça.

### C. Calls pagos e KOL
9. Existe alguma regra ou norma (legal ou de plataforma) que obrigue um influenciador
   a declarar que foi pago para divulgar um token? No Brasil e nos EUA. Com fonte.
10. Como se detecta um call pago não declarado? Sinais observáveis, e casos
    documentados com fonte.
11. Números medidos, se existirem, sobre o resultado de quem compra depois de um call
    de influenciador.

### D. Telegram, a parte prática
12. Sendo membro comum (sem ser admin), o que dá para acompanhar manualmente num
    canal público de memecoin?
13. Os bots de execução por Telegram (BonkBot, Trojan e similares) — que riscos
    específicos de segurança eles trazem por serem Telegram? Com fonte.

## Regras

- Só afirme o que confirmou numa busca feita agora, com link logo depois.
- Termos de uso: cite o texto oficial, não a interpretação de um blog.
- Nada de recomendação de conta, canal ou influenciador para seguir. Neutro.
- NÃO VERIFICADO no que não fechar.
- Explique todo termo na primeira vez em que aparece.

## Ferramentas conectadas — use assim

- **TinyFish** para abrir os termos oficiais do Discord e do X, e as páginas de
  documentação de bot.
- Para os golpes, procure fonte de empresa de segurança ou órgão oficial, não thread.
- Marque "(página aberta)" / "(só snippet)" em cada fonte.

## Como trabalhar (leia antes de começar)

- **Busque de verdade, agora.** Liste as consultas no fim.
- **Abra a página, não confie no snippet.**
- **Fonte primária primeiro.**
- **Link logo depois de cada afirmação.**
- **NÃO VERIFICADO é uma resposta boa.**
- **Não abrevie o final.** Pare numa seção INTEIRA e escreva "CONTINUA — faltam: X".
- **Explique para leigo.**
- **O checkpoint no fim é obrigatório.**
- Data de consulta em toda fonte.

## Formato da entrega

Um documento com: (1) Discord: uso real, o que dá para ler, regras oficiais e os
golpes com roteiro; (2) X de graça: o que existe hoje e a sequência de confirmação de
contrato; (3) calls pagos: regra, detecção e números; (4) Telegram prático e o risco
dos bots de execução; (5) uma tabela final "sinal social → onde observar → o que ele
prova e o que NÃO prova"; (6) NÃO VERIFICADOS; (7) fontes com link e data.

Antes de escrever o documento, me diga só isto: os termos oficiais do Discord
permitem ou proíbem automatizar uma conta de usuário para ler canais? Cite a frase
oficial. E espere minha resposta.
```

---

# PROMPT 6 de 7 — Rotina, registro e tamanho de posição

```
Preciso de um levantamento, em português do Brasil, sobre o que sustenta uma ROTINA
de operação: registro de operações, revisão periódica e regra de tamanho de posição
em ativos de cauda pesada. Priorize artigo revisado por pares; onde não houver, diga
que não há.

## Contexto

Estou escrevendo um módulo de um curso próprio sobre a minha própria forma de operar.
O módulo não ensina QUANDO comprar — ensina a montar o processo em volta da decisão:
escrever a regra antes, dimensionar, registrar tudo e revisar.

Eu sou o leitor: sem formação em estatística. Ativo: memecoin, que tem retorno de
cauda extremamente pesada. Data de referência: setembro de 2026.

## O que já está respondido — NÃO refaça

Pesquisa anterior minha já estabeleceu, com fonte:
- Grobys & Shahzad (2025): variâncias de estratégias de momentum em cripto seguem leis
  de potência com média e variância populacionais NÃO DEFINIDAS; métricas baseadas em
  variância "não são informativas". Conclusão adotada: nada de Sharpe.
- A prática de pré-registro (escrever a hipótese e o plano de análise antes de ver os
  dados) com AsPredicted, OSF e Registered Reports.
- Não existe alfa de cauda (índice de Hill) publicado para memecoin.

Confirme e estenda.

## O que preciso saber

### A. Registro de operações (trading journal)
1. Existe evidência revisada por pares de que manter registro de operações melhora
   resultado? Ou isso é só folclore de mercado repetido? Quero a resposta honesta,
   mesmo que seja "não há evidência".
2. Se houver evidência de mecanismo (autoconsciência, feedback atrasado, viés de
   memória), traga da psicologia da decisão, mesmo que não seja de trading.
3. Que campos um registro precisa ter para ser útil como DADO depois — não só como
   diário? Pense em alguém que vai querer medir as próprias decisões mais tarde.

### B. Tamanho de posição sob cauda pesada
4. Explique, para leigo, o que é "fração fixa" (arriscar sempre a mesma porcentagem)
   e por que ela é a regra padrão.
5. O critério de Kelly: explique o que é e por que ele NÃO se aplica quando a
   variância populacional não é definida. Quero a razão matemática em linguagem
   simples, com fonte.
6. Existe alguma regra de dimensionamento com fundamento publicado para distribuições
   de cauda pesada sem variância definida? Se a resposta honesta for "a literatura não
   resolve isso", diga com todas as letras.
7. A "regra do zero": o argumento de que em ativo com alta probabilidade de perda
   total o tamanho deve ser aquele que se pode perder inteiro. Isso tem formulação
   publicada (ex.: ruína do apostador, critério de sobrevivência)? Com fonte.

### C. Revisão e pré-compromisso
8. O que a literatura de mudança de comportamento diz sobre "dispositivos de
   pré-compromisso" (decidir antes, tornar difícil mudar depois)? Funciona? Com fonte.
9. Qual cadência de revisão tem algum apoio empírico — diária, semanal, mensal? Se
   ninguém mediu, diga.
10. Que armadilha conhecida existe em revisar o próprio resultado? (Viés de
    sobrevivência do próprio histórico, narrativa retrospectiva, atribuir sorte a
    habilidade.) Com fonte.

### D. O número que importa
11. Com que tamanho de amostra (número de operações) alguém consegue distinguir
    habilidade de sorte num ativo de cauda pesada? Se a resposta for "muito mais do
    que qualquer pessoa física fará", quero o número e a conta.

## Regras

- Só afirme o que confirmou numa busca feita agora, com link logo depois.
- Distinga claramente: revisado por pares / preprint / livro de mercado / folclore.
  Livro de trading popular NÃO é fonte — pode ser citado como "afirmação comum do
  mercado, sem lastro".
- "Não há evidência" é uma resposta excelente aqui. Não preencha buraco com conselho.
- NÃO dê recomendação de quanto eu devo investir. Quero a matemática das regras, não
  um número para o meu caso.
- Explique todo termo na primeira vez em que aparece.

## Ferramentas conectadas — use assim

- **Scholar Gateway** é a ferramenta principal aqui: quase tudo que eu quero é
  literatura. Priorize revisão por pares e diga o venue.
- **TinyFish** para abrir os artigos que estiverem acessíveis.
- Marque "(página aberta)" / "(só snippet)" em cada fonte.

## Como trabalhar (leia antes de começar)

- **Busque de verdade, agora.** Liste as consultas no fim.
- **Fonte primária primeiro**, e diga o venue e se passou por revisão.
- **Link logo depois de cada afirmação.**
- **Duas fontes divergindo: traga as duas.**
- **"A literatura não responde isso" é uma resposta boa.**
- **Não abrevie o final.** Pare numa seção INTEIRA e escreva "CONTINUA — faltam: X".
- **Explique para leigo.** Toda fórmula com exemplo numérico resolvido.
- **O checkpoint no fim é obrigatório.**
- Data de consulta em toda fonte.

## Formato da entrega

Um documento com: (1) registro de operações: o que tem lastro e o que é folclore, e a
lista de campos úteis; (2) tamanho de posição: fração fixa, por que Kelly quebra, e o
que a literatura oferece para cauda pesada; (3) pré-compromisso e revisão, com as
armadilhas; (4) o tamanho de amostra para distinguir habilidade de sorte, com a conta;
(5) uma lista final "afirmação comum do mercado → tem lastro? → fonte"; (6) NÃO
VERIFICADOS; (7) fontes com link, venue e data.

Antes de escrever o documento, me diga só isto: existe evidência revisada por pares de
que manter um diário de operações melhora resultado? Sim, não, ou não medido. E
espere minha resposta.
```

---

# PROMPT 7 de 7 — Que sinais têm evidência publicada de prever fraude

```
Preciso saber, em português do Brasil, QUAIS sinais observáveis de um token têm
evidência publicada de prever rug pull ou fraude — e quais são só folclore de
mercado. Priorize artigo revisado por pares e preprint com dado on-chain
reproduzível.

## Contexto

Estou montando um checklist de checagem antes de comprar uma memecoin, para uso
próprio. Quero que cada item do checklist seja ali porque ALGUÉM MEDIU que ele
importa — e quero saber, honestamente, quais itens são tradição repetida sem
medição. Os dois tipos podem entrar no checklist, mas marcados de forma diferente.

Eu sou o leitor: sem formação em estatística. Rede principal: Solana.
Data de referência: setembro de 2026.

## O ponto de partida — quero que você vá FUNDO nisto

O trabalho "Catching the Rug: Early Prediction of Fraudulent Memecoins on Solana"
(arXiv:2608.20271, 2026) montou um conjunto de 6,4 milhões de tokens da Solana em 7
meses e detecta rug pull com os 5 primeiros minutos de dados, usando XGBoost.

Eu já sei o seguinte dele, e quero que você CONFIRME e DETALHE:
- O rótulo deles é `Rug = (queda de TVL desde o pico maior que θ) OU (tempo parado
  maior que Δt)`, e os limiares θ e Δt NÃO foram publicados — o texto diz que foram
  "escolhidos empiricamente".
- A Tabela III lista 22 características extraídas dos 5 primeiros minutos.
- O melhor resultado é XGBoost com F1 0,7885, MCC 0,3947 e AUCPRC 0,8011.

**O que eu preciso:** a LISTA COMPLETA das 22 características da Tabela III, uma por
uma, com o nome exato e o que cada uma mede. E, se o artigo publicar importância de
característica (feature importance), quais pesam mais.

## O que mais preciso saber

### A. Outros trabalhos com conjunto de sinais
1. Que outros trabalhos publicados tentam prever rug pull, fraude ou morte de token
   com dados on-chain? Para cada um: o conjunto de dados, o rótulo usado, as
   características, o resultado e se passou por revisão por pares.
2. Onde eles CONCORDAM sobre quais sinais importam? Essa convergência é o que mais me
   interessa.
3. Onde eles DIVERGEM, e por quê (rótulo diferente? período diferente? rede
   diferente?).

### B. Os sinais que o mercado repete
4. Para cada um destes, me diga se existe medição publicada de que ele prevê algo, ou
   se é tradição sem lastro:
   - LP não travada ou não queimada
   - mint authority ativa
   - freeze authority ativa
   - concentração do top 10 acima de algum limiar
   - bundles no lançamento
   - criador com histórico de tokens anteriores
   - metadata mutável
   - ausência de redes sociais do projeto
   - número baixo de holders
   - volume alto com poucas carteiras únicas
5. Se houver limiar publicado para algum deles (ex.: "top 10 acima de 30%"), quero o
   número, a fonte e a taxa de acerto associada.

### C. O que a evidência NÃO sustenta
6. Qual a taxa-base de rug nos conjuntos de dados publicados? Ou seja: se eu chutasse
   "é rug" para todo token, quanto eu acertaria? Este número é essencial — sem ele,
   qualquer acurácia é ilusão.
7. Existe algum sinal amplamente repetido pelo mercado que a medição CONTRADIZ?
8. Qual o desempenho realista do melhor detector publicado, em linguagem simples: de
   cada 100 tokens que ele marca como rug, quantos são mesmo? E de cada 100 rugs
   reais, quantos ele pega?

## Regras

- Só afirme o que confirmou numa busca feita agora, com link logo depois.
- Para cada trabalho: diga se é revisado por pares (e o venue) ou preprint.
- Distinga SEMPRE: "medido com fonte" x "repetido pelo mercado sem medição". Essa
  distinção é o produto principal desta pesquisa.
- Se o texto completo de um artigo não estiver acessível, diga — não deduza o
  conteúdo do abstract.
- NÃO VERIFICADO no que não fechar.
- Explique todo termo na primeira vez em que aparece. "MCC", "AUCPRC", "F1",
  "taxa-base" e "precisão x revocação" precisam de explicação em português simples.

## Ferramentas conectadas — use assim

- **Scholar Gateway** para achar os trabalhos e verificar se viraram publicação.
- **TinyFish** para abrir o texto completo no arXiv (inclusive a versão HTML, que
  costuma trazer as tabelas) — a Tabela III do "Catching the Rug" é o item mais
  importante desta pesquisa.
- Marque "(página aberta)" / "(só snippet)" em cada fonte.

## Como trabalhar (leia antes de começar)

- **Busque de verdade, agora.** Liste as consultas no fim.
- **Abra o texto completo**, não só o abstract. Se não conseguir, diga.
- **Link logo depois de cada afirmação.**
- **Duas fontes divergindo: traga as duas**, com a diferença de método.
- **NÃO VERIFICADO é uma resposta boa.**
- **Não abrevie o final.** Pare numa seção INTEIRA e escreva "CONTINUA — faltam: X".
- **Explique para leigo.**
- **O checkpoint no fim é obrigatório.**
- Data de consulta em toda fonte.

## Formato da entrega

Um documento com: (1) as 22 características da Tabela III do "Catching the Rug", uma
por uma, com importância se publicada; (2) tabela dos outros trabalhos com conjunto
de dados, rótulo, características e resultado; (3) a tabela central: "sinal → tem
medição publicada? → limiar, se houver → fonte → força da evidência"; (4) a taxa-base
de rug nos dados publicados; (5) o desempenho do melhor detector em linguagem simples;
(6) o que a medição contradiz; (7) NÃO VERIFICADOS; (8) fontes com link, venue e data.

Antes de escrever o documento, me diga só isto: você conseguiu abrir o texto completo
do arXiv:2608.20271 e ver a Tabela III com as 22 características? Sim ou não. E
espere minha resposta.
```
