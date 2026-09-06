# Briefing de pesquisa — Módulo 5: Execução num terminal on-chain

## 1. Contexto (leia primeiro)

Estou construindo um hub de estudos local, em português do Brasil, para aprender
trading on-chain e memecoins **do zero**. O público é iniciante absoluto: alguém que
nunca abriu uma carteira. O material é educacional e **não é aconselhamento
financeiro** — esse aviso aparece na tela o tempo todo.

Os módulos que já existem e estão prontos:

- **Módulo 1 — Fundamentos & Segurança:** blockchain, chaves, gas, contrato
  inteligente, CEX vs DEX, carteiras (quente/fria), frase-semente, wallet drainers,
  revogação de aprovações, EIP-7702, golpes comuns no Brasil, saque em reais e o
  marco regulatório do Banco Central (Resoluções BCB 519/520/521).
- **Módulo 2 — Psicologia das memecoins:** economia da atenção, vieses, tipos de
  token, as 4 fases de uma memecoin. A tese central do módulo é que memecoin sobe e
  desce por atenção, não por fundamento, e que **a maioria vai a zero**.
- **Módulo 3 — Os dois pilares (Social vs. Técnico):** matriz de ferramentas de
  análise, o que cada uma faz, em que rede funciona, nível de risco.
- **Módulo 4 — Gestão e decisão:** tese antes de entrar, ponto de invalidação, take
  profit em degraus, checagens, e um simulador com 12 cenários de decisão.

Este briefing é para o **Módulo 5**, que fecha o ciclo: depois de entender o
mercado (M2), as ferramentas de análise (M3) e o processo de decisão (M4), falta
**a mecânica da execução em si** — o terminal onde a ordem é enviada.

**Data de referência: setembro de 2026.** Priorize fontes de 2025-2026; produto de
software muda rápido.

---

## 2. O que este módulo É e o que ele NÃO É

Esta é a parte mais importante do briefing. Leia com atenção.

### O módulo É

Uma explicação **mecânica e neutra** de como funciona um terminal de execução
on-chain (Axiom como exemplo principal da categoria, não como recomendação):
o que cada botão faz, o que cada configuração muda, onde o dinheiro vaza em taxas,
qual é o modelo de custódia, e quais erros de operação são comuns.

Mais um **fluxograma de processo de decisão** — a mesma espinha do Módulo 4 (tese →
checagens → tamanho da posição → entrada → invalidação → saída em degraus),
adaptada aos passos concretos dessa ferramenta.

### O módulo NÃO É

- **Não é uma estratégia para lucrar.** Não pesquise, não compile e não sugira
  "as melhores táticas para ter lucro", indicadores mágicos, horários bons para
  entrar, padrões de gráfico que "funcionam", ou qualquer coisa do gênero. Se uma
  fonte prometer isso, ela é material de marketing ou golpe — o Módulo 1 já ensina a
  desconfiar exatamente desse tipo de promessa.
- **Não é recomendação de plataforma.** O Axiom aparece como exemplo concreto da
  categoria porque é preciso mostrar uma interface real, mas o texto deve deixar
  claro que é exemplo, não indicação — mesmo padrão dos outros módulos.
- **Não promete resultado.** Nenhuma frase do tipo "assim você aumenta suas
  chances de lucro". O enquadramento correto é sempre: reduzir erro de operação,
  entender o que se está clicando, e não perder dinheiro por desatenção.

Se algum tópico da seção 3 só puder ser respondido com material promocional ou com
promessa de retorno, **marque como NÃO VERIFICADO e siga em frente** — é melhor o
módulo ficar menor e honesto do que completo e enganoso.

---

## 3. A tarefa — o que pesquisar

Para cada tópico: confirme em fonte primária sempre que possível (documentação
oficial, a própria interface do produto, contrato onchain), cite link e data de
consulta, e marque **NÃO VERIFICADO** no que não fechar.

**Profundidade alvo:** 12 a 15 seções, 25 a 30 minutos de leitura. Cada conceito
com pelo menos um exemplo concreto, e todo termo técnico explicado na primeira vez
que aparece, dentro da própria frase.

1. **O que é um terminal de execução** e onde ele fica entre a carteira e a DEX.
   Diferença prática entre: usar a DEX direto (ex.: interface da Uniswap/Raydium),
   usar um agregador, e usar um terminal como o Axiom. O que cada camada acrescenta
   e o que ela cobra por isso.

2. **Modelo de custódia do Axiom — prioridade máxima nesta pesquisa.** As chaves
   ficam com o usuário ou a plataforma opera uma carteira interna? Existe depósito?
   Se sim, isso é risco de contraparte (o Módulo 1 ensina "not your keys, not your
   coins") e precisa estar escrito com todas as letras. Confirme em fonte oficial.

3. **Tipos de ordem disponíveis** e o que cada um faz mecanicamente: mercado,
   limite, DCA, stop-loss / trailing (se existirem). O que acontece com uma ordem
   limite numa rede como a Solana — ela fica onchain, ou o terminal segura e dispara?
   Isso muda quem precisa estar online para a ordem executar.

4. **Todas as taxas, somadas.** Taxa da plataforma, taxa de rede (gas/priority fee),
   gorjeta de MEV/Jito, taxa da pool. Um exemplo numérico completo de uma compra
   pequena, mostrando quanto do valor vira taxa. Este é um dos pontos mais úteis
   para iniciante e um dos menos explicados por aí.

5. **Configurações que o usuário mexe e o que cada uma quebra se estiver errada:**
   slippage, priority fee, MEV protection, auto-approve/auto-buy, tamanho padrão de
   ordem. Consequência concreta de cada erro de configuração.

6. **Como ler a tela:** o que os principais painéis mostram (gráfico, holders,
   liquidez, transações recentes) e como isso se conecta com as checagens que o
   Módulo 3 já ensina (LP travada, distribuição de holders, bundles).

7. **Erros de execução mais comuns** — os operacionais, não os de "estratégia":
   comprar o token errado (ticker duplicado/impostor), slippage alto demais em pool
   rasa, clicar em quantia errada, aprovar sem ler, perseguir vela que já subiu.
   Como cada um se manifesta na tela e como se previne.

8. **Segurança específica de terminais:** que permissões a plataforma pede, o que
   uma "carteira de trade" separada resolve, o que acontece se a plataforma cair ou
   for comprometida. Houve incidentes conhecidos com terminais desse tipo? (Se sim,
   documente com fonte; se não achar nada confirmado, diga isso explicitamente.)

9. **Bots de sniping e velocidade:** explicar *mecanicamente* o que são e por que
   um humano não compete com eles em velocidade. O objetivo aqui é calibrar
   expectativa, não ensinar a usar bot.

10. **Registro de operações para imposto.** O terminal exporta histórico? Em que
    formato? Isso conecta com a seção de impostos do Módulo 1 (DeCripto, IN RFB
    2.291/2025). Sem orientação tributária — só "guarde o registro, procure um
    contador".

11. **Alternativas da mesma categoria**, em nível de categoria e sem ranking:
    outros terminais equivalentes que existem, com uma linha do que cada um é. Serve
    para o aluno não achar que existe uma opção única.

12. **O fluxograma de processo** (o coração do módulo): do "vi um token" até
    "encerrei a posição", passando por checagens, definição de tese, tamanho,
    ponto de invalidação e saída em degraus. Deve ser um fluxo de **disciplina de
    operação**, não de busca de lucro — inclusive com caminhos que terminam em
    "não opera" como resultado legítimo e frequente.

---

## 4. Pontos que eu especificamente desconfio

- **Taxas anunciadas vs. taxas reais.** O valor de "taxa da plataforma" divulgado
  raramente inclui priority fee e MEV tip. Quero o custo total real, com exemplo.
- **Custódia.** Muita gente usa terminal achando que é autocustódia quando não é
  (ou vice-versa). Confirme em fonte oficial, não em vídeo de influenciador.
- **Números de "usuários" ou "volume".** Se aparecerem, cheque a origem — muito
  disso é autopublicado sem auditoria. Prefira omitir a citar número não verificável.
- **Qualquer material que ensine "como lucrar" no Axiom.** Não incorpore. Se for
  relevante mencionar que esse tipo de conteúdo é abundante, mencione como *sinal de
  alerta* a ser explicado no módulo, com a lógica do Módulo 1.

---

## 5. Regras da pesquisa

- **Tudo em português do Brasil**, linguagem de iniciante absoluto.
- **Fonte com link e data de consulta** para toda afirmação factual (taxa, recurso,
  modelo de custódia, incidente).
- **NÃO VERIFICADO** no que não fechar em fonte confiável — sem estimativa, sem
  "provavelmente".
- **Nenhuma recomendação**, de plataforma ou de operação. Nomes aparecem como
  exemplo de categoria.
- **Nenhuma promessa de retorno**, em nenhuma frase, nem implícita.
- Se a documentação oficial do produto contradisser um artigo de terceiro, vale a
  oficial — e registre a divergência.

---

## 6. Formato da entrega — **quatro artefatos separados**

Entregue em **4 artefatos distintos**, não em um só. O motivo é prático: numa
entrega única, as últimas seções sempre saem resumidas ou abreviadas quando o
texto fica longo. Separando, cada parte sai completa.

Faça um artefato de cada vez, na ordem abaixo. Só comece o próximo quando o
anterior estiver fechado.

| Artefato | Nome do arquivo | O que vai dentro |
|---|---|---|
| 1 | `PESQUISA-M5-1-SECOES.md` | `resumo`, `objetivos`, `secoes` |
| 2 | `PESQUISA-M5-2-TABELAS.md` | `tabelaTaxas`, `tabelaOrdens`, `checklistExecucao`, `errosComuns` |
| 3 | `PESQUISA-M5-3-DIAGRAMAS-QUIZ.md` | `diagramas`, `quiz` |
| 4 | `PESQUISA-M5-4-FONTES.md` | `fontes`, `naoVerificado`, `divergencias` |

**Importante:** as fontes (artefato 4) devem cobrir tudo que você afirmou nos
artefatos 1 a 3 — vá anotando conforme pesquisa, não deixe para reconstruir no fim.

O conteúdo de cada campo:

- **`resumo`** — 2 a 3 frases sobre o módulo inteiro.
- **`objetivos`** — 5 a 7 frases no formato "ao fim deste módulo você consegue...".
- **`secoes`** — 12 a 15 blocos, cada um com título, 3 a 5 parágrafos e lista
  opcional. Cada seção se sustenta sozinha; não repita explicação entre elas.
- **`tabelaTaxas`** — todas as taxas de uma operação, com um exemplo numérico
  fechado (compra pequena): linha por tipo de taxa, quanto é, quem recebe.
- **`tabelaOrdens`** — tipos de ordem: o que é, quando o terminal dispara, o que
  exige do usuário (estar online?), o que pode dar errado.
- **`checklistExecucao`** — 10 a 14 itens do tipo "antes de clicar em comprar,
  confirmei que...", cada um com o texto do item e uma frase de "por que importa".
- **`errosComuns`** — os erros de operação da seção 3.7: o que a pessoa faz, o que
  aparece na tela, qual o prejuízo típico, como prevenir.
- **`diagramas`** — 3 a 4, entregues **em texto**, não como imagem. Para cada um:
  `titulo`, `legenda`, `codigoMermaid` (`flowchart LR` ou `TD`, no máximo 8 nós, sem
  emoji nem caractere especial nos rótulos — precisa caber em tela de celular) e
  `versaoEmTexto` (a mesma informação como lista numerada; **não é opcional** — é o
  que aparece se o desenho não carregar e o que um leitor de tela lê). Um deles é
  obrigatoriamente o fluxograma de processo do item 3.12, e ele **precisa** ter pelo
  menos um caminho que termina em "não opera".
- **`quiz`** — 8 perguntas, 4 alternativas cada, indicando a correta e com uma
  explicação de 2 frases que ensine algo mesmo para quem acertou.
- **`fontes`** — tudo que usou: título, link, data de consulta.
- **`naoVerificado`** — lista do que não conseguiu confirmar, e o que faltou.
- **`divergencias`** — onde fontes se contradisseram e qual você adotou, com o porquê.
