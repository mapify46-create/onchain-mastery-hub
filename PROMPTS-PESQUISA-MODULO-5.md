# Prompts de pesquisa — Módulo 5 (um por chat)

Quatro prompts independentes, um para cada chat novo. Cada um é **autossuficiente**:
não precisa anexar arquivo nenhum, é só copiar o bloco inteiro e colar.

**Modelo em cada chat:** **Sonnet 5, esforço `high`** nos prompts 1, 2 e 3;
**Opus 5, esforço `high`** no prompt 4 (o de fontes), que é onde inventar dado
dói mais. Em todos os quatro: **busca na web ligada**.

Não use o Fable 5.1 aqui. Ele custa o dobro do Opus por token, e isto é pesquisa e
redação — não é o tipo de tarefa em que ele faz diferença.

Pode rodar os quatro em paralelo — eles não dependem um do outro. Me mande cada
resultado conforme for saindo, não precisa esperar todos.

---

# PROMPT 1 de 4 — Seções de texto

```
Preciso de uma pesquisa aprofundada, em português do Brasil, para o conteúdo de um
módulo educacional. Pesquise na web e confirme cada informação em fonte primária
sempre que possível.

## Contexto do projeto

Estou construindo um hub de estudos local, em pt-BR, para aprender trading on-chain
e memecoins do zero. O público é iniciante absoluto: alguém que nunca abriu uma
carteira. O material é educacional e NÃO é aconselhamento financeiro — esse aviso
fica visível na tela o tempo todo.

Módulos que já existem e estão prontos:
- Módulo 1 — Fundamentos & Segurança: blockchain, chaves, gas, contrato inteligente,
  CEX vs DEX, carteiras quente/fria, frase-semente, wallet drainers, revogação de
  aprovações, EIP-7702, golpes comuns no Brasil, saque em reais e o marco
  regulatório do Banco Central (Resoluções BCB 519/520/521).
- Módulo 2 — Psicologia das memecoins: economia da atenção, vieses, tipos de token,
  as 4 fases. A tese central é que memecoin sobe e desce por atenção, não por
  fundamento, e que a MAIORIA VAI A ZERO.
- Módulo 3 — Os dois pilares (Social vs. Técnico): matriz de ferramentas de análise.
- Módulo 4 — Gestão e decisão: tese antes de entrar, ponto de invalidação, take
  profit em degraus, e um simulador com 12 cenários.

O Módulo 5, que você vai pesquisar, fecha o ciclo: falta a MECÂNICA DA EXECUÇÃO —
o terminal onde a ordem é enviada. Use o Axiom como exemplo concreto da categoria
(preciso mostrar uma interface real), mas trate como exemplo, nunca como indicação.

Data de referência: setembro de 2026. Priorize fontes de 2025-2026; software muda
rápido.

## FRONTEIRAS — leia com atenção, é a parte mais importante

O módulo É: explicação mecânica e neutra de como funciona um terminal de execução
on-chain. O que cada botão faz, o que cada configuração muda, onde o dinheiro vaza
em taxas, qual o modelo de custódia, e quais erros de operação são comuns.

O módulo NÃO É:
- NÃO é estratégia para lucrar. Não pesquise nem compile "melhores táticas para ter
  lucro", indicadores mágicos, horários bons de entrada, padrões de gráfico que
  "funcionam". Se uma fonte promete isso, é marketing ou golpe — o Módulo 1 já
  ensina a desconfiar exatamente desse tipo de promessa.
- NÃO é recomendação de plataforma. O Axiom é exemplo da categoria, não indicação.
- NÃO promete resultado. Nenhuma frase do tipo "assim você aumenta suas chances de
  lucro". O enquadramento é sempre: reduzir erro de operação, entender o que se está
  clicando, não perder dinheiro por desatenção.

Se um tópico só puder ser respondido com material promocional ou promessa de
retorno, marque como NÃO VERIFICADO e siga em frente. Melhor menor e honesto do que
completo e enganoso.

## Escopo completo do módulo (para você saber o todo)

1. O que é um terminal de execução e onde fica entre a carteira e a DEX; diferença
   entre usar a DEX direto, um agregador, e um terminal; o que cada camada cobra.
2. MODELO DE CUSTÓDIA DO AXIOM — prioridade máxima. As chaves ficam com o usuário ou
   a plataforma opera carteira interna? Existe depósito? Se sim, é risco de
   contraparte e precisa estar escrito com todas as letras. Confirme em fonte
   oficial, não em vídeo de influenciador.
3. Tipos de ordem e o que cada um faz mecanicamente: mercado, limite, DCA,
   stop-loss/trailing (se existirem). Ordem limite numa rede como a Solana fica
   onchain ou o terminal segura e dispara? Isso muda quem precisa estar online.
4. TODAS as taxas somadas: plataforma, rede (gas/priority fee), gorjeta de MEV/Jito,
   taxa da pool. Com exemplo numérico completo de uma compra pequena.
5. Configurações que o usuário mexe e o que cada uma quebra se estiver errada:
   slippage, priority fee, MEV protection, auto-approve/auto-buy, tamanho padrão.
6. Como ler a tela: gráfico, holders, liquidez, transações recentes — e como isso se
   conecta às checagens do Módulo 3 (LP travada, distribuição, bundles).
7. Erros de execução comuns (operacionais, não de estratégia): comprar token errado
   por ticker impostor, slippage alto em pool rasa, quantia errada, aprovar sem ler,
   perseguir vela que já subiu.
8. Segurança de terminais: que permissões pede, o que uma carteira de trade separada
   resolve, o que acontece se a plataforma cair ou for comprometida, incidentes
   conhecidos (com fonte; se não achar nada confirmado, diga isso).
9. Bots de sniping e velocidade: o que são mecanicamente e por que um humano não
   compete em velocidade. Objetivo é calibrar expectativa, não ensinar a usar bot.
10. Registro de operações para imposto: o terminal exporta histórico? Em que
    formato? Conecta com a seção de impostos do Módulo 1 (DeCripto, IN RFB
    2.291/2025). Sem orientação tributária — só "guarde registro, procure contador".
11. Alternativas da mesma categoria, sem ranking: outros terminais equivalentes, uma
    linha do que cada um é. Para o aluno não achar que existe opção única.
12. O processo de decisão do "vi um token" até "encerrei a posição": checagens, tese,
    tamanho, ponto de invalidação, saída em degraus. Fluxo de DISCIPLINA, não de
    busca de lucro — com caminhos que terminam em "não opera" como resultado
    legítimo e frequente.

## Pontos que eu especificamente desconfio

- Taxas anunciadas vs. reais: o valor divulgado raramente inclui priority fee e MEV
  tip. Quero o custo total real, com exemplo numérico.
- Custódia: muita gente usa terminal achando que é autocustódia quando não é (ou
  vice-versa). Fonte oficial, por favor.
- Números de "usuários" ou "volume": se aparecerem, cheque a origem — muito disso é
  autopublicado sem auditoria. Prefira omitir a citar número não verificável.

## Regras

- Tudo em português do Brasil, linguagem de iniciante absoluto.
- **Link na hora:** logo depois de cada afirmação factual (taxa, recurso, modelo de
  custódia, incidente), ponha o link entre parênteses. Não deixe as fontes só para o
  fim — quero ver em que cada frase se apoia, no lugar onde ela aparece.
- **Só afirme o que você confirmou numa busca feita agora.** Se não achou, escreva
  NÃO VERIFICADO e siga adiante. Não complete com o que "costuma ser", nem com o que
  você já sabia — software de cripto muda em meses e o que você lembra pode estar
  velho.
- Sem estimativa e sem "provavelmente".
- Nenhuma recomendação, de plataforma ou de operação.
- Nenhuma promessa de retorno, nem implícita.
- Documentação oficial vale mais que artigo de terceiro; registre divergências.

## SUA TAREFA NESTE CHAT

Produza APENAS as seções de texto do módulo, num artefato único chamado
PESQUISA-M5-1-SECOES.md, com:

- `resumo` — 2 a 3 frases sobre o módulo inteiro.
- `objetivos` — 5 a 7 frases no formato "ao fim deste módulo você consegue...".
- `secoes` — 12 a 15 blocos cobrindo os 12 tópicos do escopo acima. Cada bloco com
  título, 3 a 5 parágrafos e uma lista opcional de itens curtos. Cada seção precisa
  se sustentar sozinha: quem cair nela sem ter lido as anteriores entende. Não
  repita explicação entre seções — se um conceito volta, referencie ("como vimos
  em X") em vez de reescrever.

Profundidade alvo: 25 a 30 minutos de leitura no total. Cada conceito com pelo menos
um exemplo concreto, e todo termo técnico explicado na primeira vez que aparece,
dentro da própria frase.

**Não abrevie o final.** O erro clássico num documento longo é escrever as primeiras
seções completas e resumir as últimas para caber. Não faça isso: se perceber que vai
ficar comprido demais, pare numa seção INTEIRA, escreva "CONTINUA — faltam: X, Y, Z"
e eu peço a continuação na mensagem seguinte. Prefiro duas partes completas a uma
parte inteira e outra pela metade.

Antes de escrever o documento, me diga o que encontrou sobre o modelo de custódia
(tópico 2) e sobre as taxas reais (tópico 4) — são os dois pontos onde eu mais
desconfio do que se lê por aí. **Espere minha resposta** antes de começar.
```

---

# PROMPT 2 de 4 — Tabelas, checklist e erros comuns

```
Preciso de uma pesquisa aprofundada, em português do Brasil, para o conteúdo de um
módulo educacional. Pesquise na web e confirme cada informação em fonte primária
sempre que possível.

## Contexto do projeto

Estou construindo um hub de estudos local, em pt-BR, para aprender trading on-chain
e memecoins do zero. O público é iniciante absoluto: alguém que nunca abriu uma
carteira. O material é educacional e NÃO é aconselhamento financeiro.

Já existem 4 módulos prontos (fundamentos e segurança; psicologia das memecoins;
ferramentas de análise; gestão e decisão com simulador). O Módulo 5, que você vai
pesquisar, cobre a MECÂNICA DA EXECUÇÃO — o terminal onde a ordem é enviada. Use o
Axiom como exemplo concreto da categoria, mas trate como exemplo, nunca indicação.

Data de referência: setembro de 2026. Priorize fontes de 2025-2026.

## FRONTEIRAS — leia com atenção, é a parte mais importante

O módulo É: explicação mecânica e neutra de como funciona um terminal de execução
on-chain. O que cada botão faz, o que cada configuração muda, onde o dinheiro vaza
em taxas, e quais erros de operação são comuns.

O módulo NÃO É:
- NÃO é estratégia para lucrar. Não compile "melhores táticas", indicadores mágicos,
  horários de entrada, padrões de gráfico que "funcionam". Fonte que promete isso é
  marketing ou golpe.
- NÃO é recomendação de plataforma.
- NÃO promete resultado. O enquadramento é sempre: reduzir erro de operação,
  entender o que se está clicando, não perder dinheiro por desatenção.

Se um tópico só puder ser respondido com material promocional, marque como NÃO
VERIFICADO e siga em frente.

## Regras

- Tudo em português do Brasil, linguagem de iniciante absoluto.
- **Link na hora:** o link entre parênteses logo depois de cada número e de cada
  afirmação factual. Linha de tabela sem link é linha que eu não consigo usar.
- **Só afirme o que você confirmou numa busca feita agora.** Se não achou, escreva
  NÃO VERIFICADO na célula e siga. Não complete com o que "costuma ser", nem com o
  que você já sabia — taxa de plataforma muda sem aviso.
- Uma tabela com metade das células marcadas NÃO VERIFICADO é um bom resultado, e
  honesto. Uma tabela cheia de números plausíveis e não conferidos estraga o módulo
  inteiro, porque alguém vai fazer conta em cima dela.
- Nenhuma recomendação e nenhuma promessa de retorno.
- Documentação oficial vale mais que artigo de terceiro.

## SUA TAREFA NESTE CHAT

Produza um artefato único chamado PESQUISA-M5-2-TABELAS.md com estas quatro partes:

### 1. `tabelaTaxas`
TODAS as taxas de uma operação num terminal como o Axiom, somadas. Uma linha por
tipo de taxa (plataforma, rede/gas, priority fee, gorjeta de MEV/Jito, taxa da
pool), com: quanto é, quem recebe, e se é fixa ou variável.

Feche com um EXEMPLO NUMÉRICO COMPLETO de uma compra pequena (ex.: R$ 100 ou o
equivalente em SOL), mostrando quanto do valor vira taxa no total. Este é um dos
pontos mais úteis para iniciante e um dos menos explicados por aí — a taxa
anunciada raramente inclui priority fee e MEV tip. Quero o custo real.

### 2. `tabelaOrdens`
Tipos de ordem disponíveis. Para cada um: o que é, quando o terminal dispara, o que
exige do usuário (precisa estar com o app aberto? a ordem fica onchain ou a
plataforma segura?), e o que pode dar errado.

Cubra pelo menos: mercado, limite, DCA, e stop-loss/trailing se existirem. Se algum
desses NÃO existir na plataforma, diga isso explicitamente — a ausência é
informação útil.

### 3. `checklistExecucao`
10 a 14 itens do tipo "antes de clicar em comprar, confirmei que...". Cada item com
o texto (uma ação verificável) e uma frase de "por que importa".

Foque em erro de operação, não em decisão de investimento. Exemplos do tipo certo:
conferir se o endereço do contrato bate (ticker impostor), conferir o slippage
configurado, conferir a quantia digitada, conferir em qual carteira está operando.
Exemplo do tipo ERRADO, não inclua: "confirmei que o gráfico está em tendência de
alta".

### 4. `errosComuns`
Os erros de execução mais comuns — operacionais, não de estratégia. Para cada um:
o que a pessoa faz, o que aparece na tela, qual o prejuízo típico, e como se previne.

Cubra pelo menos: comprar o token errado por ticker/nome impostor, slippage alto
demais em pool rasa, clicar em quantia errada, aprovar transação sem ler, perseguir
vela que já subiu, e operar na carteira principal em vez de uma separada.

Antes de escrever o documento, me mostre só a conta do exemplo numérico de taxas
(parte 1), dizendo de onde saiu cada número. **Espere minha resposta** antes de
montar o resto.
```

---

# PROMPT 3 de 4 — Diagramas e quiz

```
Preciso de uma pesquisa aprofundada, em português do Brasil, para o conteúdo de um
módulo educacional. Pesquise na web e confirme cada informação em fonte primária
sempre que possível.

## Contexto do projeto

Estou construindo um hub de estudos local, em pt-BR, para aprender trading on-chain
e memecoins do zero. O público é iniciante absoluto. O material é educacional e NÃO
é aconselhamento financeiro.

Já existem 4 módulos prontos. O mais importante para você conhecer é o Módulo 4 —
Gestão e decisão, que ensina: tese antes de entrar, ponto de invalidação definido
antes da entrada, take profit em degraus, e traz um simulador com 12 cenários. E o
Módulo 2, cuja tese central é que memecoin sobe e desce por atenção, não por
fundamento, e que A MAIORIA VAI A ZERO.

O Módulo 5, que você vai pesquisar, cobre a MECÂNICA DA EXECUÇÃO — o terminal onde a
ordem é enviada (Axiom como exemplo da categoria, nunca como indicação).

Data de referência: setembro de 2026.

## FRONTEIRAS — leia com atenção, é a parte mais importante

O módulo É: explicação mecânica e neutra de como funciona um terminal de execução, e
um fluxo de DISCIPLINA DE OPERAÇÃO.

O módulo NÃO É:
- NÃO é estratégia para lucrar. Nada de indicadores mágicos, horários de entrada,
  padrões de gráfico que "funcionam".
- NÃO é recomendação de plataforma.
- NÃO promete resultado, nem implicitamente.

## Escopo do módulo (o que as outras partes da pesquisa estão cobrindo)

1. O que é um terminal de execução e onde fica entre a carteira e a DEX.
2. Modelo de custódia: chaves com o usuário ou carteira interna da plataforma?
3. Tipos de ordem: mercado, limite, DCA, stop-loss.
4. Todas as taxas somadas, com exemplo numérico.
5. Configurações: slippage, priority fee, MEV protection, auto-approve.
6. Como ler a tela: gráfico, holders, liquidez, transações.
7. Erros de execução comuns.
8. Segurança de terminais e permissões.
9. Bots de sniping e por que humano não compete em velocidade.
10. Registro de operações para imposto.
11. Alternativas da mesma categoria.
12. O processo de decisão do "vi um token" até "encerrei a posição".

## SUA TAREFA NESTE CHAT

Produza um artefato único chamado PESQUISA-M5-3-DIAGRAMAS-QUIZ.md com duas partes:

### 1. `diagramas` — 3 a 4 diagramas

Entregues EM TEXTO, não como imagem. Para cada um, dê as três coisas:

- `titulo` e `legenda` curtos.
- `codigoMermaid`: sintaxe Mermaid (`flowchart LR` ou `TD`). No máximo 8 nós, sem
  emoji e sem caractere especial nos rótulos — o desenho precisa caber na tela de um
  celular.
- `versaoEmTexto`: a mesma informação como lista numerada de passos, uma frase por
  passo. NÃO É OPCIONAL — é o que aparece se o desenho não carregar e é o que um
  leitor de tela lê.

Um dos diagramas é OBRIGATORIAMENTE o fluxo de processo do tópico 12: do "vi um
token" até "encerrei a posição", passando por checagens, tese, tamanho da posição,
ponto de invalidação e saída em degraus.

Esse fluxograma PRECISA ter pelo menos um caminho que termina em "não opera". Um
fluxo de decisão onde todo caminho leva a comprar não é um fluxo de decisão, é um
funil de vendas. Idealmente, "não opera" deve ser o desfecho mais frequente.

Sugestões para os outros: o caminho do dinheiro numa compra (quanto vira taxa em
cada etapa); as camadas entre a carteira e a DEX (carteira → terminal → agregador →
pool); o que acontece quando o slippage está mal configurado.

### 2. `quiz` — 8 perguntas

Cada uma com 4 alternativas, indicação de qual é a correta, e uma explicação de 2
frases que ensine algo mesmo para quem acertou.

As perguntas devem testar MECÂNICA e DISCIPLINA, não previsão de mercado.

Exemplos do tipo certo:
- "Você configurou slippage de 40% numa pool rasa. O que provavelmente acontece?"
- "Ordem limite num terminal que segura a ordem fora da blockchain: o que acontece
  se a plataforma cair?"
- "Você depositou numa carteira interna da plataforma. Quem controla esse dinheiro?"

Exemplo do tipo ERRADO, não faça:
- "Qual o melhor momento para entrar numa memecoin?"
- "Qual indicador mostra que o preço vai subir?"

## Regras

- Tudo em português do Brasil, linguagem de iniciante absoluto.
- **Link na hora:** onde uma pergunta do quiz ou um passo de diagrama depender de um
  fato específico (uma taxa, um comportamento da plataforma), ponha o link entre
  parênteses dentro da explicação.
- **Só afirme o que você confirmou numa busca feita agora.** Se um mecanismo que você
  ia desenhar não fechou em fonte, tire do diagrama — não desenhe por suposição.
  Diagrama errado é pior que diagrama faltando, porque tem cara de autoridade.
- Nenhuma recomendação e nenhuma promessa de retorno.
- **Mermaid:** confira se o código é válido antes de entregar. Parêntese, vírgula ou
  dois-pontos dentro de um rótulo quebram o desenho inteiro. Use rótulos curtos e sem
  pontuação.

Antes de escrever o documento, me mostre só o rascunho do fluxograma de decisão (o
obrigatório) — quero conferir se os caminhos de "não opera" ficaram honestos.
**Espere minha resposta** antes de fechar o resto.
```

---

# PROMPT 4 de 4 — Fontes, não verificados e divergências

```
Preciso de um levantamento de fontes, em português do Brasil, para checar o conteúdo
de um módulo educacional. Pesquise na web e priorize fonte primária.

## Contexto

Estou construindo um hub de estudos local, em pt-BR, para aprender trading on-chain
e memecoins do zero, para público iniciante absoluto. Material educacional, NÃO é
aconselhamento financeiro.

O Módulo 5 cobre a MECÂNICA DA EXECUÇÃO num terminal on-chain — usando o Axiom como
exemplo concreto da categoria, nunca como indicação. Outros chats estão pesquisando
o texto, as tabelas e os diagramas. SEU papel neste chat é ser o verificador: montar
a base de fontes e, principalmente, apontar o que NÃO se sustenta.

Data de referência: setembro de 2026. Priorize fontes de 2025-2026.

## Os temas que precisam de lastro

1. O que é um terminal de execução; diferença entre DEX direto, agregador e terminal.
2. MODELO DE CUSTÓDIA DO AXIOM — prioridade máxima. As chaves ficam com o usuário ou
   a plataforma opera carteira interna? Existe depósito? Fonte oficial, por favor.
3. Tipos de ordem: mercado, limite, DCA, stop-loss. Ordem limite fica onchain ou a
   plataforma segura e dispara?
4. TODAS as taxas: plataforma, rede/gas, priority fee, gorjeta de MEV/Jito, pool.
5. Configurações: slippage, priority fee, MEV protection, auto-approve.
6. Painéis da interface: gráfico, holders, liquidez, transações recentes.
7. Erros de execução comuns (operacionais).
8. Segurança: permissões pedidas, incidentes conhecidos com terminais desse tipo.
9. Bots de sniping e velocidade.
10. Exportação de histórico para fins de imposto (conecta com DeCripto e a IN RFB
    2.291/2025 no Brasil).
11. Outros terminais equivalentes da mesma categoria.

## SUA TAREFA NESTE CHAT

Produza um artefato único chamado PESQUISA-M5-4-FONTES.md com três partes:

### 1. `fontes`
Lista organizada por tema (use os 11 temas acima como agrupamento). Cada entrada
com: título, link, data de consulta, e uma linha dizendo o que especificamente
aquela fonte sustenta.

Priorize, nesta ordem: documentação oficial do produto > contrato/dados onchain
verificáveis > reportagem de veículo estabelecido > análise técnica independente.
Material de influenciador, thread promocional e conteúdo de curso pago NÃO entram
como fonte — se aparecerem, cite apenas para dizer que existem e por que não servem.

### 2. `naoVerificado`
A parte mais valiosa deste trabalho. Liste tudo que você NÃO conseguiu confirmar em
fonte confiável, e para cada item: o que se afirma por aí, por que não fecha, e o
que faltaria para confirmar.

Preste atenção especial em:
- Taxas: o valor anunciado geralmente omite priority fee e MEV tip. O custo total
  real é publicamente verificável ou só se descobre operando?
- Custódia: existe declaração oficial e inequívoca, ou só inferência de terceiros?
- Números de usuários, volume ou "market share": quase sempre autopublicados sem
  auditoria. Se não tiver origem auditável, diga isso.
- Qualquer afirmação de que uma configuração, ferramenta ou tática "melhora
  resultado" — isso não é verificável e deve ser marcado como tal.

### 3. `divergencias`
Onde fontes se contradisseram: o que cada uma diz, qual você adotaria e por quê.
Se a documentação oficial contradisser artigos de terceiros, a oficial vence — mas
registre a contradição, porque ela costuma indicar que a informação de terceiros
está desatualizada (e isso é útil de saber).

## Regras

- Tudo em português do Brasil.
- Link e data de consulta em toda entrada. Entrada sem link não entra.
- **Só liste fonte que você abriu numa busca feita agora.** Não cite de memória: link
  que você "lembra que existe" costuma estar morto ou nunca ter existido — e aqui
  isso é o erro mais caro de todos, porque este chat é justamente o controle sobre os
  outros três.
- Sem recomendação de plataforma e sem promessa de retorno.
- Prefira dizer "não consegui confirmar" a preencher com estimativa. Neste chat
  especificamente, um "não verificado" bem fundamentado vale mais que uma afirmação
  frouxa.

Comece me dizendo o que encontrou sobre custódia e sobre taxas reais, e **espere
minha resposta** antes de montar o documento — são os dois pontos onde eu mais
desconfio do que circula por aí.
```
