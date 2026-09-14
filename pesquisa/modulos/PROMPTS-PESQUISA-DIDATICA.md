# Prompts de pesquisa — Didática do app

Cinco prompts independentes, um para cada chat novo. Cada um é autossuficiente: é só
copiar o bloco inteiro e colar.

**Para que serve cada um:**

| # | Pesquisa | Muda no app |
|---|---|---|
| 12 | O que a ciência da aprendizagem mediu que funciona | A estrutura de cada aba e a ordem do conteúdo |
| 13 | Quiz, feedback e revisão espaçada | Os quizzes, a revisão dos módulos já feitos, o glossário |
| 14 | Texto, diagrama, calculadora e vídeo na tela | O desenho das abas, os SVGs, as calculadoras, os vídeos |
| 15 | Aprender decisão sob risco: cenários e calibração | O simulador, o checklist, o Módulo 7 |
| 16 | Motivação e hábito de quem estuda sozinho | Progresso, tela de início, rotina de estudo |

**Modelo sugerido:** Fable 5.1, esforço `xhigh`, com **busca na web ligada** e os
conectores **Scholar Gateway** e **TinyFish**. Podem rodar em paralelo.

**Por que pesquisar antes de mexer:** didática é a área mais cheia de mito ("estilos de
aprendizagem", "a pirâmide do aprendizado", "10% do que lê, 90% do que faz"). Mudar o
app com base em mito piora o curso. Cada prompt pede tamanho de efeito e diz que o mito
também tem que ser apontado.

---

## Contexto comum (já vai dentro de cada prompt)

O app é um curso próprio, estático, que roda no navegador, sobre trading on-chain de
memecoins. O aluno é o próprio dono: adulto, sem formação técnica, estudando sozinho.

Como o app está hoje:
- 7 módulos, cada um em abas. Cada aba segue um arco: números de gancho → explicação em
  texto → desenho (diagrama ou "anatomia" de tela em SVG) → ferramenta (calculadora).
- Quiz de 8 a 10 perguntas de múltipla escolha no fim de cada módulo, com explicação da
  resposta. Progresso do módulo = 50% quiz + 50% "marcar como concluído".
- Glossário de 34 termos com botão "estudado".
- Simulador com 12 cenários de decisão, 4 opções cada, e um resumo de disciplina no fim.
- Checklist interativo antes de comprar.
- Prompts para vídeos de 4 a 5 minutos (ainda não gravados).
- Limites técnicos: sem servidor, sem conta de usuário, dados só no localStorage do
  navegador; HTML + JavaScript puro.

---

# PROMPT 12 de 16 — O que a ciência da aprendizagem mediu que funciona

```
Preciso de um levantamento factual, em português do Brasil, sobre as técnicas de ensino e
estudo que têm efeito MEDIDO para adultos que estudam sozinhos um assunto técnico.
Pesquise na web e priorize meta-análise e artigo revisado por pares.

## Contexto

Estou melhorando um curso próprio, estático, que roda no navegador, sobre trading
on-chain de memecoins. O aluno sou eu: adulto, sem formação técnica, estudando sozinho,
sem professor.

Como o curso está hoje: 7 módulos em abas; cada aba segue o arco números de gancho →
explicação em texto → diagrama ou desenho da tela → calculadora. Quiz de múltipla
escolha no fim de cada módulo, glossário, simulador de 12 cenários de decisão, checklist.
Limites: sem servidor, sem conta de usuário, dados só no navegador (localStorage).

Data de referência: setembro de 2026.

## O que preciso saber

### A. As técnicas com evidência
Para CADA técnica abaixo: o que é (em linguagem de leigo), o tamanho de efeito medido
(com amostra, tipo de estudo e se o efeito vale para adulto estudando sozinho), em que
condição funciona e em que condição falha.
1. Prática de recuperação (testar a si mesmo em vez de reler).
2. Repetição espaçada.
3. Intercalação (misturar tipos de problema em vez de fazer em blocos).
4. Exemplos resolvidos (worked examples) e o "efeito de reversão da expertise".
5. Elaboração e autoexplicação (explicar com as próprias palavras).
6. Pré-teste / perguntar antes de ensinar.
7. Exemplos concretos vs. abstratos, e variação de exemplos para transferir o
   conhecimento para situação nova.
8. Carga cognitiva: segmentar conteúdo, e quanto texto por vez é demais.

### B. A ordem das coisas
9. Existe evidência sobre a melhor ordem dentro de uma lição: problema antes da
   explicação ("productive failure") ou explicação antes? Com que resultado?
10. O arco "gancho com número → explicação → desenho → ferramenta" que o curso usa tem
    apoio, contra-evidência, ou não foi estudado? Diga o que se aproxima.

### C. Os mitos
11. Liste os mitos de didática mais repetidos (estilos de aprendizagem, pirâmide do
    aprendizado, "10% do que lê", nativos digitais, etc.) e o que a pesquisa mostrou
    sobre cada um, com fonte.

### D. Aplicação
12. Para um curso estático no navegador, sem professor e sem servidor: quais 5 mudanças
    têm o maior efeito esperado por esforço de implementação? Justifique cada uma com a
    evidência acima. Não invente efeito para a mudança; use o do estudo.

## Regras

- Só afirme o que confirmou numa busca feita agora, com link logo depois da afirmação.
- Todo efeito com tamanho (d, g ou equivalente), amostra e tipo de estudo. Explique o que
  o número quer dizer em linguagem de leigo.
- Separe: meta-análise / revisado por pares / preprint / livro / blog.
- NÃO VERIFICADO no que não fechar. "Não foi estudado" é resposta válida.
- Explique todo termo na primeira vez em que aparece.

## Ferramentas conectadas — use assim

- Scholar Gateway primeiro, para toda técnica.
- TinyFish para abrir o artigo e copiar o número do texto, não do resumo.
- Registre por fonte "(página aberta)" ou "(só snippet)".

## Como trabalhar

- Busque de verdade, agora. Liste as consultas no fim.
- Duas fontes divergindo: traga as duas, com a diferença de método.
- Não abrevie o final. Se ficar longo, pare numa seção INTEIRA e escreva
  "CONTINUA — faltam: X, Y".
- Data de consulta em toda fonte.
- O checkpoint no fim é obrigatório: responda SÓ ao checkpoint e espere minha resposta.

## Formato da entrega

Um documento com: (1) tabela técnica × efeito × amostra × condição × status da fonte;
(2) uma seção por técnica; (3) a ordem da lição; (4) os mitos; (5) as 5 mudanças de maior
efeito por esforço; (6) NÃO VERIFICADOS; (7) fontes com link e data.

Antes de escrever o documento, me diga só uma coisa: das 8 técnicas, quais têm
meta-análise com adultos? E espere minha resposta.
```

---

# PROMPT 13 de 16 — Quiz, feedback e revisão espaçada

```
Preciso de um levantamento factual e PRÁTICO, em português do Brasil, sobre como desenhar
quizzes, feedback e revisão espaçada para que um curso autodidata ensine de verdade.
Pesquise na web e priorize meta-análise e artigo revisado por pares.

## Contexto

Estou melhorando um curso próprio, estático, que roda no navegador, sobre trading
on-chain de memecoins. O aluno sou eu: adulto, sem formação técnica, sozinho.

Como está hoje: quiz de 8 a 10 perguntas de múltipla escolha no fim de cada módulo, com a
explicação da resposta certa depois de responder. As respostas ficam salvas; o quiz vale
50% do progresso do módulo. Um glossário de 34 termos com botão "estudado". Não existe
revisão de módulo já concluído. Sem servidor: tudo tem que funcionar só com o
localStorage do navegador.

Data de referência: setembro de 2026.

## O que preciso saber

### A. O quiz
1. Múltipla escolha ensina tanto quanto resposta livre? Quando cada um é melhor?
2. Como escrever alternativas erradas que ensinam (erros comuns plausíveis) e o que a
   pesquisa diz sobre alternativas ruins.
3. Pergunta de recordar fato × pergunta de aplicar em situação nova: diferença medida.
4. Quiz no FIM do módulo × perguntas espalhadas ao longo do texto: diferença medida.
5. Pedir o grau de certeza antes de mostrar a resposta ("confidence-based"): tem efeito?

### B. O feedback
6. Feedback imediato × atrasado: qual funciona melhor, e em que condição?
7. Só dizer certo/errado × explicar a resposta certa × explicar por que a errada está
   errada: diferença medida.
8. Deixar tentar de novo depois de errar: ajuda ou atrapalha?

### C. Revisão espaçada sem servidor
9. Qual o intervalo de revisão com evidência (ex.: 1 dia, 1 semana, 1 mês)? Existe regra
   simples que funciona sem algoritmo complexo?
10. Algoritmos abertos de repetição espaçada (ex.: família SM-2, FSRS): o que é cada um,
    quem mediu, e se dá para implementar só no navegador. Cite a fonte de cada um.
11. Como transformar um glossário de 34 termos e os quizzes em cartões de revisão sem
    virar decoreba?

### D. Aplicação
12. Proponha o desenho concreto para este curso: formato das perguntas, feedback,
    revisão dos módulos concluídos e do glossário, e o que salvar no localStorage.
    Cada decisão com a evidência que a sustenta.

## Regras

- Só afirme o que confirmou agora, com link logo depois da afirmação.
- Todo efeito com tamanho, amostra e tipo de estudo, explicado para leigo.
- NÃO VERIFICADO no que não fechar.
- Não recomende aplicativo comercial; se citar, é exemplo neutro.
- Explique todo termo na primeira vez em que aparece.

## Ferramentas conectadas — use assim

- Scholar Gateway primeiro.
- TinyFish para abrir o artigo e a documentação dos algoritmos abertos.
- Registre por fonte "(página aberta)" ou "(só snippet)".

## Como trabalhar

- Busque de verdade, agora. Liste as consultas no fim.
- Duas fontes divergindo: traga as duas.
- Não abrevie o final. Se ficar longo, pare numa seção INTEIRA e escreva
  "CONTINUA — faltam: X, Y".
- Data de consulta em toda fonte.
- O checkpoint no fim é obrigatório: responda SÓ ao checkpoint e espere minha resposta.

## Formato da entrega

Um documento com: (1) o quiz; (2) o feedback; (3) revisão espaçada e os algoritmos;
(4) o desenho proposto para este curso; (5) NÃO VERIFICADOS; (6) fontes com link e data.

Antes de escrever o documento, me diga só uma coisa: feedback imediato ou atrasado — o que
a meta-análise mais recente conclui? E espere minha resposta.
```

---

# PROMPT 14 de 16 — Texto, diagrama, calculadora e vídeo na tela

```
Preciso de um levantamento factual e PRÁTICO, em português do Brasil, sobre como combinar
texto, diagrama, ferramenta interativa e vídeo numa tela para ensinar um assunto técnico.
Pesquise na web e priorize meta-análise e artigo revisado por pares.

## Contexto

Estou melhorando um curso próprio, estático, que roda no navegador (tema escuro), sobre
trading on-chain de memecoins. O aluno sou eu: adulto, sem formação técnica, sozinho.

Como está hoje: cada aba tem três números em destaque no topo, cards de texto com
parágrafos, diagramas de fluxo (Mermaid) com versão em texto, "anatomias" (desenho SVG de
uma tela com legenda clicável que destaca a parte), calculadoras com controles deslizantes
e barras de resultado, e tabelas comparativas. Algumas abas passam de 6 mil caracteres de
texto. Vídeos de 4 a 5 minutos estão planejados, ainda não gravados.

Data de referência: setembro de 2026.

## O que preciso saber

### A. Os princípios de multimídia
1. Os princípios de Mayer (coerência, sinalização, redundância, contiguidade espacial e
   temporal, segmentação, pré-treino, modalidade, personalização): o que cada um diz, o
   tamanho de efeito medido, e as condições em que o efeito some ou inverte.
2. Contra-evidência e réplicas fracassadas desses princípios, se houver.

### B. Cada formato
3. Texto na tela: quanto texto por bloco, títulos, listas × parágrafos, leitura em tela
   escura. O que tem medição?
4. Diagramas e desenhos esquemáticos × captura de tela real: diferença medida para
   aprender a usar uma interface.
5. Simulação e ferramenta interativa (tipo calculadora com controle deslizante): quando
   ensina e quando só distrai? O que é "exploração guiada" e o que ela mediu?
6. Vídeo: duração com evidência, vídeo com rosto × sem rosto, velocidade, e o quanto se
   aprende de vídeo × texto no mesmo conteúdo.
7. Transcrição e legenda: ajudam ou atrapalham quem assiste?

### C. Acessibilidade
8. Quais práticas de acessibilidade (WCAG) também melhoram o aprendizado de quem não tem
   deficiência? Só com fonte.

### D. Aplicação
9. Proponha, para este curso, regras de desenho de aba: tamanho máximo de bloco de texto,
   onde colocar o diagrama em relação ao texto, quando usar calculadora, como ligar
   vídeo e texto. Cada regra com a evidência que a sustenta.

## Regras

- Só afirme o que confirmou agora, com link logo depois.
- Todo efeito com tamanho, amostra e tipo de estudo, explicado para leigo.
- NÃO VERIFICADO no que não fechar.
- Explique todo termo na primeira vez em que aparece.

## Ferramentas conectadas — use assim

- Scholar Gateway primeiro.
- TinyFish para abrir artigo e a especificação WCAG.
- Registre por fonte "(página aberta)" ou "(só snippet)".

## Como trabalhar

- Busque de verdade, agora. Liste as consultas no fim.
- Duas fontes divergindo: traga as duas.
- Não abrevie o final. Se ficar longo, pare numa seção INTEIRA e escreva
  "CONTINUA — faltam: X, Y".
- Data de consulta em toda fonte.
- O checkpoint no fim é obrigatório: responda SÓ ao checkpoint e espere minha resposta.

## Formato da entrega

Um documento com: (1) os princípios de multimídia com efeito e limites; (2) cada formato;
(3) acessibilidade que ajuda a aprender; (4) as regras de desenho de aba; (5) NÃO
VERIFICADOS; (6) fontes com link e data.

Antes de escrever o documento, me diga só uma coisa: qual é a duração de vídeo com melhor
evidência de retenção, e de onde vem esse número? E espere minha resposta.
```

---

# PROMPT 15 de 16 — Aprender decisão sob risco: cenários e calibração

```
Preciso de um levantamento factual e PRÁTICO, em português do Brasil, sobre como se ENSINA
alguém a decidir melhor sob risco e incerteza — com cenários, simulação e treino de
calibração. Pesquise na web e priorize artigo revisado por pares.

## Contexto

Estou melhorando um curso próprio sobre trading on-chain de memecoins. O aluno sou eu:
adulto, sem formação técnica, sozinho. O curso não quer ensinar a "achar a moeda que
sobe"; quer ensinar a decidir com disciplina e a não perder por desatenção.

Como está hoje: um simulador com 12 cenários fictícios; cada um mostra sinais na tela e
oferece 4 escolhas (entrar, esperar, sair, não operar); cada escolha tem qualidade e
feedback, e no fim há um "resumo de disciplina" que mede o padrão de decisão, não o
resultado. Há também um checklist antes de comprar e um módulo sobre regra escrita,
diário e revisão.

Data de referência: setembro de 2026.

## O que preciso saber

### A. Aprendizagem baseada em cenários
1. O que a pesquisa mediu sobre ensino por cenários e simulação de decisão (medicina,
   aviação, finanças, gestão): tamanho de efeito, condição e transferência para a vida
   real.
2. Quantos cenários, com que variação, e em que ordem? Cenários parecidos ou misturados?
3. Como deve ser o feedback de um cenário de decisão sob risco, em que a decisão boa pode
   dar resultado ruim? Existe pesquisa sobre separar qualidade da decisão de resultado no
   feedback?

### B. Calibração
4. Treino de calibração (aprender a dar probabilidade, ex.: "tenho 70% de certeza"):
   funciona? Com que efeito? Quanto treino? O que medem Brier score e curva de
   calibração, explicado para leigo.
5. Dá para treinar calibração dentro de um simulador simples, no navegador?

### C. Técnicas de decisão com evidência
6. Pre-mortem, lista de verificação (checklist), "considerar o oposto", pensar em taxa de
   base: o que cada uma mediu em decisões sob incerteza? Tamanho de efeito e condição.
7. Aprender com resultado ruído: por que ambientes com feedback confuso ("wicked") ensinam
   errado, e o que a pesquisa sugere para contornar.

### D. Aplicação
8. Proponha melhorias concretas para o simulador e o checklist deste curso, cada uma com a
   evidência que a sustenta. Não proponha nada que prometa lucro.

## Regras

- Só afirme o que confirmou agora, com link logo depois.
- Todo efeito com tamanho, amostra e tipo de estudo, explicado para leigo.
- NÃO VERIFICADO no que não fechar.
- Explique todo termo na primeira vez em que aparece.

## Ferramentas conectadas — use assim

- Scholar Gateway primeiro.
- TinyFish para abrir o artigo e copiar o número do texto.
- Registre por fonte "(página aberta)" ou "(só snippet)".

## Como trabalhar

- Busque de verdade, agora. Liste as consultas no fim.
- Duas fontes divergindo: traga as duas.
- Não abrevie o final. Se ficar longo, pare numa seção INTEIRA e escreva
  "CONTINUA — faltam: X, Y".
- Data de consulta em toda fonte.
- O checkpoint no fim é obrigatório: responda SÓ ao checkpoint e espere minha resposta.

## Formato da entrega

Um documento com: (1) ensino por cenários; (2) calibração; (3) técnicas de decisão;
(4) melhorias propostas para o simulador e o checklist; (5) NÃO VERIFICADOS; (6) fontes
com link e data.

Antes de escrever o documento, me diga só uma coisa: treino de calibração tem efeito que
dura e se transfere para outro assunto? E espere minha resposta.
```

---

# PROMPT 16 de 16 — Motivação e hábito de quem estuda sozinho

```
Preciso de um levantamento factual e PRÁTICO, em português do Brasil, sobre o que mantém
um adulto estudando sozinho um curso online até o fim — e o que só parece ajudar. Pesquise
na web e priorize meta-análise e artigo revisado por pares.

## Contexto

Estou melhorando um curso próprio, estático, que roda no navegador, sobre trading
on-chain de memecoins. O aluno sou eu: adulto, sem formação técnica, sozinho, sem
professor e sem turma.

Como está hoje: barra de progresso geral no topo; porcentagem por módulo no menu;
tela de início com gráfico de progresso (módulos, quizzes, glossário, simulador) e uma
lista "por onde começar". Não há lembrete, sequência de dias, meta semanal nem revisão.
Sem servidor e sem conta: tudo só no navegador.

Data de referência: setembro de 2026.

## O que preciso saber

### A. Por que autodidata abandona
1. Taxa de conclusão medida em cursos online abertos e autodidatas, e os motivos de
   abandono com evidência.

### B. O que funciona
2. Aprendizagem autorregulada: planejar, monitorar, avaliar. O que mediu e com que efeito
   em curso online?
3. Intenção de implementação ("quando X, eu estudo Y") e metas de estudo: efeito medido.
4. Barra de progresso e indicador de avanço: ajuda a concluir ou não? Há contra-evidência?

### C. Gamificação
5. Pontos, medalhas, sequência de dias (streak), placar: o que a meta-análise mostra, e
   quando prejudica (motivação só pela recompensa, ansiedade de perder a sequência)?
6. Qual elemento de gamificação tem o melhor apoio e qual é mito?

### D. Metacognição
7. Ilusão de competência (achar que aprendeu porque releu): como um curso pode mostrar
   ao aluno o que ele realmente sabe? O que foi medido?

### E. Aplicação
8. Proponha, para este curso, as mudanças de maior efeito na tela de início, no progresso
   e na rotina de estudo — sem servidor, só com o navegador. Cada uma com a evidência que
   a sustenta, e o que evitar.

## Regras

- Só afirme o que confirmou agora, com link logo depois.
- Todo efeito com tamanho, amostra e tipo de estudo, explicado para leigo.
- NÃO VERIFICADO no que não fechar.
- Não recomende aplicativo comercial.
- Explique todo termo na primeira vez em que aparece.

## Ferramentas conectadas — use assim

- Scholar Gateway primeiro.
- TinyFish para abrir o artigo e copiar o número do texto.
- Registre por fonte "(página aberta)" ou "(só snippet)".

## Como trabalhar

- Busque de verdade, agora. Liste as consultas no fim.
- Duas fontes divergindo: traga as duas.
- Não abrevie o final. Se ficar longo, pare numa seção INTEIRA e escreva
  "CONTINUA — faltam: X, Y".
- Data de consulta em toda fonte.
- O checkpoint no fim é obrigatório: responda SÓ ao checkpoint e espere minha resposta.

## Formato da entrega

Um documento com: (1) abandono; (2) o que funciona; (3) gamificação, com o que é mito;
(4) metacognição; (5) as mudanças propostas para este curso; (6) NÃO VERIFICADOS;
(7) fontes com link e data.

Antes de escrever o documento, me diga só uma coisa: sequência de dias (streak) tem efeito
medido sobre concluir um curso, ou só sobre abrir o app? E espere minha resposta.
```
