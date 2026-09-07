# AULA 001 — jhaay — 3h25min05s — sequência de colagens

Duração confirmada: **03:25:05** (205 minutos). Aula longa → protocolo em partes.

As regras completas (marcações, voz, trava de anedota, colunas das tabelas) já estão
no chat, coladas na primeira mensagem. As colagens abaixo são curtas de propósito:
só dizem o que extrair agora. **Não recole o prompt inteiro.**

Ordem: mapa → 4 partes. Uma colagem por vez, esperando a resposta.

| # | Colagem | O que sai |
|---|---|---|
| 1 | `PROMPT-AULA-001.md` (arquivo separado) | Regras + o mapa em 14 blocos de 15 min |
| ~~2~~ | ~~Mapa~~ | **Pule** — o mapa já vai junto da colagem 1 |
| 3 | Parte 1 | Seções 1–4 (resumo, perfil, ferramentas, setup) |
| 4 | Parte 2 | Seção 5 inteira (playbooks) |
| 5 | Parte 3 | Seções 6–12 (filtros, decisões, risco, execução) |
| 6 | Parte 4 | Seções 13–20 (léxico, números, verificação, merge) |

A seção 5 ganhou uma resposta só pra ela. Numa aula de 3h25 com tela ao vivo, os
playbooks são metade do valor do documento — dividir espaço com as ferramentas faz
ela sair espremida.

---

## COLAGEM 2 — mapa da aula

```
Antes da extração, preciso só de um MAPA da aula, para eu conferir a cobertura.

A aula tem 03:25:05. Percorra do início ao fim em blocos de 15 minutos. São 14
blocos, e eu quero as 14 linhas — inclusive as vazias, que recebem "sem conteúdo
operacional":

[0:00:00–0:15:00] [0:15:00–0:30:00] [0:30:00–0:45:00] [0:45:00–1:00:00]
[1:00:00–1:15:00] [1:15:00–1:30:00] [1:30:00–1:45:00] [1:45:00–2:00:00]
[2:00:00–2:15:00] [2:15:00–2:30:00] [2:30:00–2:45:00] [2:45:00–3:00:00]
[3:00:00–3:15:00] [3:15:00–3:25:05]

| Bloco | Assunto | Tem tela ao vivo? | Tem operação real? | Densidade | Seções que isso alimenta |

- Densidade: alta | media | baixa | vazio.
- "Seções que isso alimenta": números de 1 a 20 do esquema
  (3 = ferramentas, 5 = playbooks, 6 = filtros numéricos, 8 = risco,
  9 = execução, 13 = léxico, 14 = números).

Ao final do mapa, me diga:
1. Até que timestamp você conseguiu de fato percorrer. Se não chegou em 3:25:05,
   diga onde parou — não finja cobertura.
2. Os 3 blocos mais densos em operação real.
3. Onde está a operação de perda e onde está a de recuperação que dão nome à aula.
4. Se há trecho que você não conseguiu processar (áudio ruim, tela ilegível).

Só o mapa. Não comece a extração ainda.
```

**Confira antes de seguir:** vieram as 14 linhas? A resposta 1 chegou perto de
3:25:05? Se ele parou em 1h40, pare também — me avisa que a gente muda a abordagem
(provavelmente dividir o vídeo, ou trabalhar sobre a transcrição).

---

## COLAGEM 3 — Parte 1 (seções 1 a 4)

```
Agora comece a extração, seguindo exatamente as regras que já estão neste chat:
marcações obrigatórias, timestamps em toda linha, voz descritiva, trava de alegação
de resultado, colunas exatas.

Registre no frontmatter: duracao: 3h25min05s.

Entregue AGORA só a PARTE 1 — seções 1 a 4:
- Frontmatter completo
- 1. Resumo executivo
- 2. Perfil operacional
- 3. Stack de ferramentas
- 4. Setup de tela e ambiente

Use o mapa que você acabou de fazer como índice. A seção 3 é a mais importante desta
parte: quando a ferramenta aparece na tela, leia a tela e preencha a coluna de
configuração com os valores visíveis. Uma lista de nomes de ferramenta sem
configuração não me serve para nada.

Termine com "FIM DA PARTE 1 — próxima: seção 5 (playbooks)" e pare.

COBERTURA — obrigatório no fim, 7 linhas:

| Bloco de 30 min | Itens extraídos nesta parte | Última seção alimentada |

[0:00:00–0:30:00] [0:30:00–1:00:00] [1:00:00–1:30:00] [1:30:00–2:00:00]
[2:00:00–2:30:00] [2:30:00–3:00:00] [3:00:00–3:25:05]

Blocos que renderam 0 nesta parte entram com 0 — não omita linha. Depois da tabela,
me diga qual foi o timestamp mais alto que você citou.
```

---

## COLAGEM 4 — Parte 2 (seção 5, playbooks)

```
Continue. Agora só a SEÇÃO 5 — Playbooks. Ela merece uma resposta inteira.

Não repita nada que já saiu. Não recomece a numeração.

Extraia TODOS os fluxos, inclusive os que ele executa sem narrar. Para cada um, o
bloco completo: gatilho, pré-condições, frequência, timestamps, tabela de passos com
as colunas exatas, saídas possíveis, o que ele NÃO checa, e a justificativa dele.

Obrigatório nesta aula: a operação de PERDA e a de RECUPERAÇÃO viram dois playbooks
separados, mesmo que ele narre como um só. Depois dos dois, escreva um parágrafo
curto respondendo: entre um e outro, o que mudou de fato? O critério? O tamanho da
posição? A ferramenta? O timing? Ou só o resultado? Se a única diferença for o
resultado, diga isso com todas as letras.

Volte ao mapa: os blocos que você marcou como densos em operação real precisam todos
ter virado passo de playbook. Se algum não virou, diga qual e por quê.

Termine com "FIM DA PARTE 2 — próxima: seções 6 a 12" e pare.

Feche com a mesma tabela de cobertura de 7 linhas (blocos de 30 min) e o timestamp
mais alto citado.
```

---

## COLAGEM 5 — Parte 3 (seções 6 a 12)

```
Continue. Agora as seções 6 a 12:
6. Filtros e critérios numéricos
7. Regras de decisão condicionais
8. Gestão de risco e dimensionamento
9. Mecânica de execução
10. Sinais de alarme
11. Erros que ele confessa
12. Rotina e disciplina

Não repita nada que já saiu. Não recomece a numeração. Mesmas regras de marcação e voz.

SOBRE A COLUNA TIMESTAMP: preencha onde você conseguir ancorar de fato. Onde não
conseguir, escreva VAZIO. VAZIO é resposta aceita e é melhor que estimativa — não
interpole, não derive da linha vizinha, não use a janela do bloco como aproximação.

A SEÇÃO 6 É A PRIORIDADE DESTA ENTREGA. É onde moram os números que viram critério.
Varra a aula inteira atrás deles, inclusive os que já apareceram dentro dos playbooks
que você escreveu na Parte 2. Cada um vira linha com métrica, operador, valor,
unidade e a coluna "regra fixa ou depende".

Cuidado: número citado como resultado ou anedota NÃO entra na 6. Vai para a 14. A 6
é só critério — o que ele usa para decidir ANTES de agir.

NA SEÇÃO 8, a coluna "ele cumpre na aula?" é obrigatória em todas as linhas. Onde a
regra declarada e o comportamento observado divergirem, escreva a divergência com o
timestamp dos dois lados.

Termine com "FIM DA PARTE 3 — próxima: seções 13 a 20" e pare.

PROVA DE ANCORAGEM — antes de fechar, cole a coluna Timestamp de cada tabela, uma
linha por linha, na ordem:

PROVA — Seção <n>
1. <timestamp da linha 1>
2. <timestamp da linha 2>
...

Linha vazia aparece como VAZIO. Não resuma, não escreva "todas preenchidas".

Feche com a tabela de cobertura de 7 linhas. Não precisa mandar checklist.
```

---

## COLAGEM 6 — Parte 4 (seções 13 a 20)

```
Continue. Agora as seções 13 a 20, fechando o documento:
13. Léxico
14. Todos os números citados
15. Afirmações que precisam de verificação externa
16. Contradições internas
17. Trechos-chave
18. Mapa para o app
19. Lacunas desta aula
20. Índice de merge

Não repita nada que já saiu. Mesmas regras.

Na seção 14, obrigatoriamente:
- Os valores do título (600 dólares e 3000 reais) entram, com a conferência: aparecem
  na tela? batem entre si? batem com o que ele fala?
- Contagem final: quantos números são regra, quantos são meta, quantos são anedota.

Na seção 15, obrigatoriamente: o resultado prometido no título se sustenta no
conteúdo da aula? Responda direto, com os timestamps que sustentam a resposta.

Na seção 20, o índice de merge tem que estar completo — é o que me permite cruzar
esta aula com as próximas. Nome canônico de cada ferramenta com as variações faladas,
e nome canônico de cada playbook.

Termine com "FIM DA EXTRAÇÃO — aula-001".

Feche com a tabela de cobertura de 7 linhas e, além dela, um fechamento: somando as 4
partes, algum bloco de 30 minutos ficou sem nenhum item? Se ficou, diga qual e por
quê.
```

---

## Depois: montar o arquivo

Junte as 4 respostas em ordem num arquivo só:
`pesquisa/aulas/AULA-001-jhaay.md`

Sem editar nada, sem tirar as tabelas de cobertura — elas fazem parte do registro.

**Conferência de 2 minutos antes de arquivar:**

1. Somando as partes, algum bloco de 30 min com tela ao vivo ficou em 0 sem
   justificativa? Extração afinou ali.
2. O timestamp mais alto da Parte 4 chegou perto de 3:25:05?
3. Seção 14: se quase tudo é anedota, a aula é vitrine. Anote e não gaste verificação.
4. Seção 6 vazia = aula sem critério numérico. Vira retrato de estilo, não conteúdo.
5. Seção 3 com a coluna de configuração vazia = lista de nomes, não método. Vale
   pedir só a seção 3 de novo.
