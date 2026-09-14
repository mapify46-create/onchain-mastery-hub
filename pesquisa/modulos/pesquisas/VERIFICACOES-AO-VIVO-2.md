# Verificações ao vivo — leva 2: pesquisas 8 a 16 (13/09/2026)

> Continuação de `VERIFICACOES-AO-VIVO.md`. Mesma regra: onde uma pesquisa e esta
> conferência divergem, vale a conferência. Onde eu não conferi, está escrito.

## Resumo

- **Chegaram 9 arquivos, mas só 3 são documentos completos** (P11, P14, P15). Os outros
  6 (P8, P9, P10, P12, P13, P16) são só o **checkpoint**: a pesquisa parou na pergunta
  de abertura e está esperando resposta. O plano do dono acabou antes das continuações.
  As respostas prontas estão na seção 5, por ordem de prioridade.
- **Um conflito com o app foi resolvido ao vivo:** o estudo "A Midsummer Meme's Dream"
  (Mongardini & Mei) **está no programa do USENIX Security '26** — é revisado por pares.
  Eu tinha trocado o app para "preprint" em 13/09 por causa da pesquisa 7 (só snippet).
  Errado. Corrigido de novo (seção 2).
- **Três pesquisas trazem erro ou exagero que não pode entrar no app** (seção 3): a P11
  repete o "US$ 69 mil" já corrigido e afirma tendências que a própria tabela dela não
  sustenta; a P10 escreve 82,6% onde o artigo diz 82,89%; a P12 usa a meta-análise
  errada para "pré-teste".
- **A P15 aponta um risco de princípio** para o simulador: calibração com Brier em
  cenário fictício exige uma "verdade" que seria escrita por mim — isso é eu escrever a
  regra de decisão pela porta dos fundos. Solução na seção 3.8.

## 1. Inventário

| # | Arquivo no projeto | Tipo | Palavras |
|---|---|---|---|
| P8 | `P8-narrativas-onde-nasce-CHECKPOINT.md` | só checkpoint | 2.037 |
| P9 | `P9-narrativas-ferramentas-CHECKPOINT.md` | só checkpoint | 1.491 |
| P10 | `P10-narrativa-e-preco-CHECKPOINT.md` | só checkpoint | 2.467 |
| P11 | `P11-narrativas-ciclo-de-vida.md` | **completo** (com checkpoint no fim) | 4.717 |
| P12 | `P12-didatica-ciencia-da-aprendizagem-CHECKPOINT.md` | só checkpoint | 1.550 |
| P13 | `P13-didatica-quiz-e-feedback-CHECKPOINT.md` | só checkpoint (etapa 1 de 2) | 2.070 |
| P14 | `P14-didatica-texto-diagrama-video.md` | **completo** | 4.858 |
| P15 | `P15-didatica-decisao-sob-risco.md` | **completo** | 4.916 |
| P16 | `P16-didatica-motivacao-e-habito-CHECKPOINT.md` | só checkpoint | 2.535 |

Os originais vieram num zip (`aadbbab6-pesquisas.zip`) com nomes `compass_artifact_wf-…`.

## 2. Conflito resolvido: o Midsummer é revisado por pares

**Conferido em 13/09/2026, no navegador interno:**

- `https://www.usenix.org/conference/usenixsecurity26/presentation/mongardini` existe,
  com título, autores (Sapienza / DTU), resumo e a marca "USENIX Security '26 · Open
  Access". O resumo publicado diz **"an alarming 82.89% show evidence of artificial
  growth strategies"**.
- `https://arxiv.org/html/2507.01963v2` diz **82,8%** em cinco trechos.
- A pesquisa 10 escreveu **82,6%** — não bate com nenhuma das duas versões. Erro de cópia.

**Histórico do erro no app:** a pesquisa 2 dizia "revisado por pares (USENIX Security
2026)"; a pesquisa 7 dizia "preprint, só snippet"; eu segui a 7 e rebaixei o app para
"preprint". A lição fica registrada na memória do projeto: **status de publicação se
confere na página do evento, nunca em snippet.**

**Mudado no app (local, não publicado):** `src/data/modulo6.js` em quatro lugares
(seção "o que dá para ver", destaque da aba Volume, tabela de sinais, fontes) e
`src/data/checklist.js` (fonte do item "atenção real"). O número passou a **82,9%**
(versão publicada). Cache do app: `omh-cache-v11`.

## 3. Pesquisa por pesquisa

### 3.1 P8 — Onde a narrativa nasce (só checkpoint)

**Achado central, e ele já é a resposta para o app:** não existe estudo que meça em qual
rede social a atenção sobre um token aparece primeiro. A ordem "grupo de Telegram → X"
é observação de mercado, sem medição. O app tem de dizer isso com todas as letras.

**O que serve, com a ressalva de que tudo é sobre pump-and-dump, não sobre narrativa:**
- "Meme Coin Factories" (arXiv 2609.10246, preprint; a página do arXiv diz aceito no ACM
  CCS'26 — **não conferi**): 15,2 milhões de tokens do pump.fun em dois anos; **23,5%
  criados depois de um post no X ou no Truth Social**; 31 posts renderam mais de US$ 1
  milhão cada ao criador do token. Isso diz que a narrativa nasce fora da blockchain e o
  token vem depois, em minutos.
- Ardia & Bluteau (2024, revisado por pares): em canais VIP de pump, o nome da moeda sai
  12 a 24 horas antes do sinal público; reversão só 30 minutos depois do dump.
- Nizzoli et al. (2020, IEEE Access, só snippet): 56% das contas do X que espalhavam
  convites eram bots; 93% dos links de bots levavam a canais de pump-and-dump no Telegram.

**Falta:** o mapa das fontes, orgânico × coordenado e a rotina manual. Prioridade média —
a rotina de 5 minutos da pesquisa 5 já cobre parte.

### 3.2 P9 — Ferramentas de rastreio (só checkpoint)

11 ferramentas confirmadas existindo e cobrindo Solana; Kaito parcial; nenhuma
descartada. **Só chegou a tabela de existência.** Faltam preço, passo a passo e o que é
comprável — que é o que a aba precisa.

**O que já dá para usar:**
- Toda lista de "em alta" é ou comprável ou feita de atividade de negociação: os Boosts
  do DexScreener multiplicam o score (preços citados — 10 por US$ 99 até 500 por US$ 3.999
  — estão **só em snippet**; confirmar na página oficial antes de mostrar); o Trending do
  GMGN é contagem de compra/venda, volume e holders, ou seja, o que o wash trading
  fabrica (Módulo 6). Isso fecha com a tese "todo sinal público é otimizado contra".
- Kaito: "Yaps" encerrado em jan/2026 (página aberta pela pesquisa; **não conferi**).
- Santiment: cobertura Solana desde ago/2025; não cobre token recém-criado individual.

**Falta:** o documento completo. **Prioridade máxima** entre as continuações.

### 3.3 P10 — Narrativa move o preço? (só checkpoint)

**Achado central:** não há estudo revisado por pares com um número ligando atenção social
a preço em memecoin de launchpad. O que existe:
- Long, Wong & Cai (WWW '25): só médias descritivas.
- Li, Yao, Huo & Cai (ACM WebSci '25): sentimento × frequência de transação (Spearman
  0,15 a 0,41), não × preço.
- Kamat (2026, preprint autopublicado, com corrigenda própria): token com link de
  Telegram no metadata gradua 8,94 vezes mais. **Três ressalvas antes de usar:** (1) mede
  a presença de um link, não atenção real; (2) o coletor cobriu ~6 minutos após o
  lançamento, então as taxas são limite inferior; (3) presença de link é o sinal mais
  barato de falsificar que existe — a pesquisa 7 já tinha marcado "ausência de redes
  sociais" como folclore. Se entrar no app, entra como curiosidade com aviso, nunca como
  item de checklist.
- Taxa de graduação do pump.fun cai a cada medição, mas com métodos diferentes: "menos de
  2%" (Mancino, Q4 2024) → 0,63% (Marino et al., set–out/2025) → 0,198% (Kamat, mai–jun
  2026, com o viés de cobertura). O app não afirma nenhuma taxa de graduação hoje — ok.
- **Erro:** 82,6% no Midsummer (é 82,89%).

**Falta:** atenção-antes-do-preço em cripto em geral, reversão, primeiro token × cópias.
Prioridade alta.

### 3.4 P11 — Ciclo de vida (completo)

Seguiu a seleção combinada (5 narrativas, HAWK dentro de Celebridades, políticos com
foco nas cópias, "saiu da bolha" como descrição). A rotação datada é útil e a tabela é
boa. **Mas há erros e exageros que não podem entrar:**

1. **O glossário repete "~US$ 69 mil de market cap" para a graduação.** É o número que o
   app já corrigiu (`VERIFICACOES-AO-VIVO.md`, seção 3). Não importar.
2. **"Cada vez mais curto" não bate com a própria tabela:** Celebridades ~1 mês, Animais
   ~2 meses, IA ~1 mês, Políticos ~1 mês, ICM ~4 dias. Não há tendência com 5 pontos. O
   que dá para dizer: a última (ICM) foi de longe a mais curta.
3. **"Em todas, a criação de tokens atingiu o pico depois do preço"** — só há dado para
   IA (um post no Medium da SuperEx, fonte fraca) e para ICM. Nos outros três casos não
   há medição. A pesquisa marca esse sinal como [MEDIDO]; no app entra como observação
   de mercado, não como sinal medido.
4. **"Queda na taxa de graduação" como sinal de saturação de uma narrativa:** é métrica da
   plataforma inteira, não do tema. Serve para dizer que o setor esfriou, não que uma
   narrativa específica saturou.
5. **Kamat (0,198%) citado como "estudo acadêmico" sem ressalva** — ver 3.3.
6. **TRUMP "US$ 27 bilhões em 48h"** (snippet da Cointelegraph) diverge do app (US$ 15
   bilhões em ~24h, CoinGecko). Manter o do app.
7. **LIBRA "insiders ~70% do supply"** diverge do app (~82%, Bubblemaps). Medidas
   diferentes; manter o Bubblemaps, que é a fonte citada no Módulo 3.
8. **MOODENG:** a divergência importante é de **data** do pico (28/09/2024 × nov/2024),
   não de valor. A pesquisa só registrou a de valor.
9. **GOAT:** pico US$ 150 milhões × mais de US$ 800 milhões, não reconciliado.
10. **Quase tudo é "só snippet".** Para o app, usar só o que tem fonte forte: Nansen
    sobre LIBRA (86% das carteiras acima de US$ 1.000 venderam no prejuízo; US$ 251
    milhões), CoinGecko "State of Memecoins 2025" (página aberta: total de US$ 150,6
    bilhões em dez/2024 para US$ 47,2 bilhões em nov/2025), o processo do HAWK (via NBC),
    Chainalysis sobre TRUMP+MELANIA (40 carteiras com 94% do supply). O resto entra
    marcado "não verificado" ou não entra.

**O que é sólido e entra:** a rotação datada (celebridades jun/2024 → animais set–nov/2024
→ IA jan/2025 → políticos jan–fev/2025 → ICM mai/2025); os 30 tokens de celebridades com
queda média de 94% em ~1 mês (Slorg, snippet — marcar); mais de 700 cópias do TRUMP em 3
semanas; Believe com mais de 21 mil moedas na primeira semana e lançamentos −98% depois;
2026 sem narrativa dominante e com o setor em retração (21Shares: receita da Solana
−87,1% no 1º semestre, snippet).

**Checkpoint no fim:** não precisa continuar. Se sobrar plano, só reconciliar o pico do
GOAT e abrir a categoria "AI Agents" da CoinGecko para um número com hora.

### 3.5 P12 — Ciência da aprendizagem (só checkpoint)

Os tamanhos de efeito batem com o que eu conheço da literatura: prática de recuperação
g = 0,51 contra reestudo (Adesope 2017), espaçamento com 259 de 271 experimentos a favor
(Cepeda 2006) e g = 0,74 para recuperação espaçada (Latimier 2021), intercalação g = 0,42
(Brunmair & Richter 2019), exemplos resolvidos g = 0,48 (Barbieri 2023), autoexplicação
g = 0,55 (Bisra 2018), segmentação d = 0,35 (Rey 2019), productive failure g = 0,36
(Sinha & Kapur 2021). Dunlosky 2013 marcado corretamente como revisão, não meta-análise.

**Dois problemas:**
1. **Chan, Meissner & Davis (2018) é a meta-análise do *forward testing effect*** — testar
   o bloco 1 melhora aprender o bloco 2. Não é "pré-teste" (perguntar sobre o material
   antes de estudá-lo). Para pré-teste, o que a pesquisa cita é estudo primário (Pan &
   Sana 2021) mais o productive failure. O app pode pôr uma pergunta antes de cada aba,
   mas com essa base, não com o g = 0,77 do Chan.
2. O número de experimentos do Adesope 2017 (118 × 188) é contestado pela própria
   pesquisa. Irrelevante para o app: usar os tamanhos de efeito, não o k.

**Falta:** mitos, ordem da lição, as 5 mudanças. Prioridade média — a P14 já traz as
regras de desenho.

### 3.6 P13 — Quiz, feedback e revisão espaçada (só checkpoint)

Sólido. Conclusão: **manter o feedback imediato** (Kandemir 2026: g = 0,03; ManyClasses
2021: 0,002 em 38 turmas) e investir no **conteúdo** do feedback (Rowland 2014: com
feedback g = 0,73 contra 0,39 sem; Wisniewski 2020: d = 0,48, maior quando explica). A
única vantagem real do "atrasado" se captura melhor com **revisão espaçada**, que o app
não tem. Kandemir 2026 foi aberto pela pesquisa; **não conferi**.

**Falta:** a etapa 2 — como escrever alternativas erradas que ensinam, feedback que
explica por que a errada está errada, intervalos de revisão e o que SM-2/FSRS acrescentam,
o que salvar no localStorage. **Prioridade máxima** para a didática: revisão espaçada é a
peça com evidência mais forte que o app não tem.

### 3.7 P14 — Texto, diagrama, calculadora e vídeo (completo)

Bom documento; tabela-resumo primeiro, como pedido. **Três ressalvas:**
- Os d de Mayer (2017) são medianas de contagens de experimentos, não meta-análise — a
  própria pesquisa avisa. Usar as meta-análises quando houver (Schneider 2018 para
  sinalização, Rey 2019 para segmentação, Sundararajan & Adesope 2020 para coerência).
- Modalidade: a pesquisa dá d = 0,43 para Ginns (2005); eu lembro d = 0,72. **A conferir**;
  não muda a decisão (texto denso fica escrito, não narrado).
- D'Angelo (2014) é relatório da SRI, não periódico.

**O que bate direto no app (e é ação):**
1. **Abas longas demais.** A regra "1 tela por ideia" e a segmentação (Rey 2019) pegam:
   M3 "Pilar social na prática" tem 10.235 caracteres, M3 "Pilar técnico" 9.914, M6 "Os
   números" 6.394, M6 "O contrato" 6.320. Quebrar em blocos com pausa.
2. **Calculadoras precisam de objetivo + exemplo resolvido + leitura do número**
   (Alfieri 2011: descoberta guiada d = 0,30 a 0,50; solta d = −0,38). As do M6 e M7 têm a
   nota de premissa, mas não o exemplo resolvido.
3. **Mini-glossário no topo da aba, antes do diagrama** (pré-treino, mediana d = 0,75).
4. **Tema escuro custa legibilidade** (Piepenbrock 2014: d ≈ 0,7 a favor do fundo claro).
   Compensar com contraste ≥ 4,5:1, linha ≤ 80 caracteres, entrelinha ≥ 1,5 — conferir
   no app. Oferecer tema claro é decisão do dono (mexe no CLAUDE.md).
5. **Vídeo como complemento, não substituto** (Noetel 2021: g = 0,80 × 0,28) — já é assim.
6. **Transcrição:** o plano do app é transcrição idêntica à narração. A evidência diz
   resumo navegável ao lado + legenda ligável; texto idêntico sobre gráfico é redundância
   (Adesope & Nesbit 2012; Yue, Bjork & Bjork 2013). Mudar o entregável dos prompts de vídeo.
7. **4 a 5 minutos:** neutro. Guo 2014 mede engajamento, não retenção.

### 3.8 P15 — Decisão sob risco e calibração (completo)

Confirmou no texto o que a resposta preliminar dizia: Good Judgment Project 6 a 11% de
melhora no Brier com menos de 1 hora de treino, por quatro anos (Chang 2016);
Lichtenstein & Fischhoff 1980 com quase todo o ganho após o primeiro feedback e
generalização só para tarefas parecidas. **12 cenários não bastam** para medir nem para
treinar calibração: 50 a 100 previsões com feedback no mínimo.

**Risco de princípio, que a pesquisa não viu porque não conhece a regra do projeto:**
para pontuar uma previsão com Brier, precisa de uma "verdade". Num cenário fictício, a
verdade seria escrita por mim — e "qual a chance de este sinal ser dos que sobem" é
exatamente a regra de decisão que o dono disse que só ele escreve. **Solução:**
- Fase 1: calibração só sobre **fatos com resposta conhecida** ("de cada 100 tokens do
  pump.fun, quantos param de negociar no mesmo dia?" → 68,67%; "quanto da liquidez sai
  derrubando o preço pela metade?" → 14,6%). Isso treina honestidade sobre a própria
  certeza, com a ressalva de Benson & Önkal (1992): calibrar em conhecimento não é o mesmo
  que calibrar em previsão.
- Fase 2: previsões sobre **taxas-base reais**, quando o observatório tiver dados.
  "Sortear o resultado de uma distribuição", como a pesquisa sugere, só faz sentido com
  distribuição real.

**O que entra sem risco:** separar nota de processo da nota de resultado (o simulador já
faz — reforçar como placar principal); embaralhar a ordem dos cenários (intercalação);
no Checklist, bloco "decisão" ganha pré-mortem (Mitchell 1989: +30% de razões), "qual o
melhor argumento de que estou errado" (Lord 1984) e taxa-base em frequência natural
(Gigerenzer 1995: 16% → 46%) — com etiqueta "medido", e a ressalva de que são efeitos de
laboratório em outros domínios.

### 3.9 P16 — Motivação e hábito (só checkpoint)

Resposta à pergunta dela: **o desfecho é concluir e reter, não abrir todo dia.** A
evidência causal de streak é sobre abrir o app (RCT no Peru, 60 mil alunos: +2,8 pontos
percentuais em conectar, +9,4 em semanas ativas), e o ganho de aprendizado não se
distinguiu de um lembrete simples. A Khan Academy retirou o streak em 2021 por
desmotivar. Para um aluno só, sem servidor e sem notificação, **não vale streak nem
medalha.** Gamificação em geral: g = 0,25 no comportamento (Sailer & Homner 2020),
intervalo quase tocando o zero.

**Falta:** abandono, autorregulação, metacognição. Prioridade baixa.

## 4. O que entra no app, em ordem

**A. Feito localmente (não publicado):** Midsummer → USENIX Security 2026, 82,9%; cache v11.

**B. Aba "Narrativas" no Módulo 3 — dá para construir com o que há**, com as ressalvas
acima. Sem o P9 completo, as ferramentas entram em tabela (o que mede, grátis?, cobre
Solana?, comprável?) sem o passo a passo por ferramenta.

**C. Didática — mudanças com evidência forte e esforço baixo, sem esperar continuação:**
1. Quebrar as quatro abas longas em blocos com pausa.
2. Quiz: explicar por que cada alternativa errada está errada (hoje só explica a certa).
3. Uma pergunta antes de cada aba (pré-teste; base: Pan & Sana, Sinha & Kapur).
4. Exemplo resolvido em cada calculadora.
5. Mini-glossário no topo das abas com diagrama.
6. Checklist: pré-mortem, "argumento contrário", taxa-base em frequência natural.
7. Transcrição dos vídeos: resumo navegável, não verbatim (mudar o gerador de prompts).
8. Não adicionar streak, medalha nem placar.

**D. Depende de continuação:** revisão espaçada dos quizzes e do glossário (P13 etapa 2);
passo a passo e preços das ferramentas de narrativa (P9). Uma regra simples de revisão
(1, 7 e 30 dias) tem apoio em Cepeda 2006 e Latimier 2021 e pode entrar antes do
algoritmo.

**E. Fase 2, junto com o observatório:** calibração com Brier sobre taxas-base reais.

## 5. Respostas prontas para os checkpoints (por prioridade)

Com o plano em 95%, rode só as duas primeiras agora. As outras podem esperar.

**1. P13 (revisão espaçada) — cole no chat da pesquisa 13:**
```
Ok. Mantenho o feedback imediato. Escreva a Etapa 2, enxuta, tabela-resumo primeiro:
(1) como escrever alternativas erradas que ensinam; (2) feedback que explica por que a
errada está errada; (3) intervalos de revisão espaçada com evidência, com uma regra
simples sem algoritmo (ex.: 1, 7 e 30 dias) e o que SM-2 e FSRS acrescentam, com fonte;
(4) como transformar 34 termos e 8 a 10 perguntas por módulo em revisão sem decoreba;
(5) o que salvar no localStorage. Pule o que já está no checkpoint.
```

**2. P9 (ferramentas) — cole no chat da pesquisa 9:**
```
Ok, nenhuma descartada. Escreva o documento completo só para as que são grátis para ler
e cobrem memecoin recém-lançada na Solana: DexScreener, GMGN, Birdeye, pump.fun, X
(busca avançada), Google Trends e LunarCrush. Para cada uma: o que mede (documentação
oficial), atraso, grátis × pago com o preço da página oficial, se exige carteira, passo a
passo com os nomes reais dos campos, o que não mede. Depois: (B) o que é comprável —
confirme os preços dos Boosts do DexScreener na página oficial (hoje só snippet); (C) o
que tem validação publicada. Santiment, Kaito, Arkham, Nansen e bots: uma linha cada.
Tabela-resumo primeiro.
```

**3. P10 (narrativa × preço):**
```
Ok. Escreva o documento completo, enxuto, tabela-resumo primeiro: (A) atenção antes do
preço em cripto em geral, só revisado por pares, com amostra e horizonte, e a reversão;
(B) narrativas/rotação e primeiro token × cópias, se houver medição; (C) problemas de
método; (D) a frase honesta. Correção: a versão publicada do Midsummer no USENIX diz
82,89%, não 82,6%.
```

**4. P8 (onde nasce):**
```
Ok — a lacuna é a resposta. Escreva só: (1) o mapa das fontes, com o que cada uma mostra
e não mostra; (3) orgânico × coordenado, com os números de Nizzoli, Meme Coin Factories
e Ardia & Bluteau; (7) a rotina manual. Pule o item 2, já respondido. Curto.
```

**5. P12 (ciência da aprendizagem):**
```
Ok. Antes: Chan, Meissner & Davis (2018) é o forward testing effect, não pré-teste —
separe os dois. Escreva só: os mitos (item 11) com fonte, a ordem da lição (itens 9 e
10) e as 5 mudanças (item 12) para um curso estático no navegador. Pule a seção por
técnica: a tabela do checkpoint basta.
```

**6. P16 (motivação):**
```
O desfecho é concluir e reter, não abrir todo dia. Não quero streak. Escreva curto: (1)
abandono em autodidatas; (2) autorregulação e intenção de implementação, com efeito;
(7) metacognição — como o app mostra o que eu realmente sei; (8) mudanças para a tela de
início e o progresso, sem gamificação.
```

**7. P11:** não precisa continuar.

## 6. O que eu conferi ao vivo nesta leva

- Página do USENIX Security '26 do Midsummer: título, autores, resumo com 82,89%, "Open
  Access". (13/09/2026)
- arXiv 2507.01963v2: 82,8% em cinco trechos. (13/09/2026)
- Cruzamento com o app: TRUMP (US$ 15 bi no M2), LIBRA (US$ 4,56 bi e −94% no M2; ~82%
  do supply no M3), taxa de graduação (o app não afirma nenhuma).

**Não conferi:** Kandemir 2026; a aceitação do "Meme Coin Factories" no CCS'26; o fim do
Yaps do Kaito; os preços dos Boosts; o d de Ginns 2005; o RCT do Peru (NBER 34173).

---

# Leva 3 — as continuações (14/09/2026)

## Resumo

- Chegaram 9 arquivos num zip, numerados de 1 a 9 na ordem da minha lista. **7 são
  documentos novos e completos**; o 7 e o 8 são idênticos aos P14 e P15 já guardados
  (conferido com `diff`). Nenhuma continuação ficou faltando.
- **Um conflito com o app, resolvido ao vivo a favor do app:** a P10 completa diz que os
  3,59% da Chainalysis são de 2023 e que 2024 teve 4,52%. A página da Chainalysis diz
  "3.59% of all launched tokens in 2024" (74.037 tokens). O Módulo 6 está certo; a
  pesquisa errou.
- **Construído a partir desta leva:** revisão espaçada (página `#/revisao`), confiança
  registrada antes da resposta no quiz e na revisão, placar "quando tenho certeza,
  acerto?", plano "se-então" e exportar/importar do progresso na tela de início; aba
  Narrativas com os dados da P8, P9, P10 e da reconciliação da P11.

## 1. Inventário

| Arquivo | É | Guardado como |
|---|---|---|
| 1 | P8 completa | `P8-narrativas-onde-nasce.md` |
| 2 | P9 completa | `P9-narrativas-ferramentas.md` |
| 3 | P10 completa | `P10-narrativa-e-preco.md` |
| 4 | P11, reconciliação de três dúvidas | `P11-narrativas-ciclo-de-vida-RECONCILIACAO.md` |
| 5 | P13 etapa 2 | `P13-didatica-quiz-e-revisao-espacada.md` |
| 6 | P12 completa | `P12-didatica-ciencia-da-aprendizagem.md` |
| 7 | = P14 | (já estava) |
| 8 | = P15 | (já estava) |
| 9 | P16 completa | `P16-didatica-motivacao-e-habito.md` |

## 2. Conferido ao vivo

- **Chainalysis, "Crypto Market Manipulation 2025"** (página aberta em 14/09): "3.59% of all
  launched tokens in 2024 display patterns that may be linked to pump-and-dump schemes";
  "Number of suspected pump-and-dump tokens 74,037"; "approximately 94% of DEX pools
  involved in suspected pump-and-dump schemes appear to be rugged by the address that
  created the DEX pool". O checkpoint da P10 dizia "~90%"; a página diz 94%. Nada muda no
  app (o M6 não cita esse 90%).

## 3. Pesquisa por pesquisa

### 3.1 P8 — Onde nasce (completa)

Mapa de 8 fontes com o que cada uma mostra e o que os termos de uso proíbem; a
conclusão continua: **ordem entre redes não medida**. Números novos, todos do "Meme Coin
Factories" (preprint; a página do arXiv diz aceito no CCS'26 — **não conferi**):
1,5 milhão de cópias (mais de 10% dos tokens); originais com cópia graduam 9,20% contra
0,86% das cópias — com viés de seleção, porque só ganha cópia quem já chamou atenção;
800.441 canais públicos e 235.850 privados do Telegram ligados a tokens; wash trading em
17% das transações; ~8.000 vendas coordenadas; o top 1% dos grupos de criadores cria
58,57% dos tokens. Nizzoli: 1 canal de pump-and-dump no Discord contra 296 no Telegram.
A planilha de preços do ZachXBT (US$ 50 a US$ 60 mil por post; menos de 5 de 160
declararam) é fonte fraca e **não entrou no app**. Rotina manual de 6 passos: o app
absorveu dois (feed do pump.fun como primeira parada; busca do X só logado).

### 3.2 P9 — Ferramentas (completa)

- **Preço dos Boosts do DexScreener: NÃO VERIFICADO em página oficial**, mesmo com
  subagente. Docs, API e marketplace não publicam valor; os pacotes que circulam (10 por
  US$ 99 … 500 por US$ 3.999) são de terceiros. O app já dizia isso; agora diz com mais
  precisão.
- Componentes do Trending Score (docs.dexscreener.com/trending, página aberta): volume,
  liquidez, transações, carteiras distintas, holders, **visitas à página e reações** —
  os dois últimos são fabricáveis sem gastar nada. Entrou na tabela.
- GMGN: "updated every minute" (página oficial). Operar pede chave privada num bot do
  Telegram — entrou como aviso na tabela.
- **LunarCrush: o plano grátis não tem dado social** (página de preços aberta); o social
  vai de US$ 5 a US$ 45 por dia. O app dizia só "grátis" — corrigido.
- Birdeye Data API US$ 39 a 499/mês (página aberta); PRO US$ 45/mês (snippet). X Premium
  US$ 3, 8 e 40/mês (snippet). Nansen Pro US$ 49 a 69/mês (snippet). Kaito: Yaps
  encerrado em 15/01/2026 (snippet).
- Validação publicada de métrica social como previsão de preço de memecoin: **nenhuma**.
  Galaxy Score e AltRank: só material do vendedor.
- Taxa de graduação: Bitquery (set/2026) ~2,7% por coorte — mais um número para a lista
  (ver 3.3).

### 3.3 P10 — Narrativa × preço (completa)

Boa. O que entrou no app: em cripto grande, atenção prevê **volume e volatilidade**, não
direção (Shen 2019, snippet); o sinal de sentimento dura 15 minutos e "custos de
transação razoáveis tornam impossível lucro anormal" (Guégan & Renault 2021, página
aberta); a causalidade corre do preço para a atenção (Süssmuth 2021, snippet); a conta
de break-even que nenhum estudo fez. Também: Ante 2023 (+3,58% em 2 minutos com tweet
do Musk); TRUMP em jul/2026 pela Nansen — 66% das 1,48 milhão de carteiras no prejuízo,
−US$ 3,81 bi (snippet) — não entrou, o M2 já tem os números do caso.

**Erro:** Chainalysis 3,59% atribuído a 2023 (é 2024). **Divergência interna:** pico do
TRUMP US$ 75,35 (CoinMarketCap) × US$ 45,50 (preprint de David) — o app usa o market cap
de US$ 15 bi, que bate com a CMC. **Taxa de graduação, agora com cinco números:** "menos
de 2%" (Mancino/The Block), ~1,4% (Dune via Cointelegraph), ~2,7% (Bitquery, set/2026),
0,63% (Marino, set–out/2025), 0,198% (Kamat, mai–jun/2026, com viés de cobertura). O app
não afirma nenhum; continua assim.

Checkpoint final ((a) gráfico sobe-e-devolve ou (b) seção de custos): **não precisa** —
o app já tem a conta de custo no M5 e a frase no M3.

### 3.4 P11 — Reconciliação (completa)

- **GOAT:** máxima em 17/11/2024, US$ 1,36, market cap ~US$ 1,34 bi (CoinMarketCap e
  CoinGecko, páginas abertas). Os US$ 150 mi e os US$ 800–937 mi eram picos
  intermediários. Entrou na linha do tempo.
- **MOODENG:** dois picos, 28/09/2024 (US$ 0,34) e 15/11/2024 (US$ 0,69, ~US$ 614–625 mi).
  Entrou na tabela. **Divergência nova:** futuros na Binance em 15/11 (P11) × 25/10
  (reconciliação). Registrada no app como não verificado.
- **Graduação:** a frase corrigida que a pesquisa propõe ainda diz "~US$ 69 mil, varia com
  o preço do SOL". **Não importar**: a conferência de 12/09 mostrou que o limiar é em
  tokens vendidos e que, em dólar, 80% das graduações de ago/2026 ficaram entre US$ 11
  mil e US$ 101 mil — muito mais largo do que "varia com o SOL". O app está certo.
- Checkpoint ("atualizo o documento principal?"): **não precisa**.

### 3.5 P12 — Ciência da aprendizagem (completa)

- Mitos com fonte (estilos de aprendizagem, pirâmide, nativos digitais, multitarefa,
  releitura, fluência, neuromitos). Nada disso está no app; é o que **não** fazer.
- Aplicou a correção: forward testing effect (Chan 2018) ≠ pré-teste (Pan & Sana 2021;
  St. Hilaire 2024, g = 0,54 específico, g = 0,65 quando o aluno gera a resposta).
- **Achado importante:** a falha produtiva exige consolidação guiada por professor; não há
  evidência para autodidata sozinho. Para este curso: exemplo resolvido primeiro; o
  "problema antes" barato é a pré-questão. O app já tem os dois.
- Gancho com número: risco de "detalhe sedutor" **só se o número for irrelevante**; os
  destaques do app são o conteúdo central de cada aba. Mantidos, atrás da pré-questão.
- As 5 mudanças: revisão espaçada (**feita**), perguntas espalhadas a cada ~1.500
  caracteres (não), pré-questão (**feita**), feedback elaborado (**feito** em M6, M7 e
  nas 3 novas do M3), perguntas de aplicação + intercalar o simulador (não).
- **Discrepâncias entre as pesquisas de didática, sem efeito no app:** Sundararajan &
  Adesope 2020, g = −0,16 (P14) × g ≈ −0,33 (P12); D'Angelo 2014, g = 0,67 com 55 estudos
  (P14) × d ≈ 0,62 com 59 (P12); Adesope 2017, 118 experimentos (P16) × 188 (checkpoint
  da P12). Direção igual em todos; os números exatos não estão no app.

### 3.6 P13 — Quiz e revisão espaçada (etapa 2)

A mais útil da leva. **Entrou:** feedback elaborado vale g = 0,49 contra 0,05 de "só
certo/errado" (Van der Kleij 2015) — confirma o "por que a sua não serve"; botão de
confiança antes de revelar (hipercorreção: erro com certeza é o que mais se corrige);
escada fixa 1 → 3 → 7 → 16 → 35 dias, errou volta a 1 (derivada de Cepeda 2008, **não
testada nessa forma exata**); SM-2 e FSRS só preveem melhor a memória — **nenhum
experimento mostra que ensinem mais que uma escada fixa**; esquema mínimo por item no
localStorage; export/import em JSON; aviso de que limpar o navegador apaga tudo.
**Não entrou (ainda):** 3 alternativas por pergunta em vez de 4 (Rodriguez 2005: 3 é o
ótimo; a 4ª costuma ser enchimento); 2 a 3 variantes por termo (definição, cenário,
cloze); perguntas de definição reescritas como cenário.

### 3.7 P16 — Motivação (completa)

Conclusão em MOOC abaixo de 10%, mas 19,5% entre quem declarou intenção; para aluno só e
motivado, o risco é **estudar passivo**, não abandonar. Plano "se-então": d = 0,65
(Gollwitzer & Sheeran 2006); em curso online, +32% e +15% de conclusão, **nulo quando o
obstáculo era "falta de tempo"** (Kizilcec & Cohen 2017, RCT com 17.963) — entrou com esse
aviso. Feedback pode piorar em 38% dos casos quando foca na pessoa e não na tarefa
(Kluger & DeNisi 1996) — o app só fala da tarefa. **Recomendação que fica para o dono
decidir:** trocar a barra de progresso de "50% quiz + 50% marquei como concluído" para
domínio medido pelo quiz — o "marquei" é autorrelato, o que alimenta a ilusão de
competência. Não mudei porque foi decisão de desenho dele. Também não feito: "próxima ação
única" na tela de início e a lista "o que você já consegue fazer".

## 4. O que entrou no app nesta leva (local, cache `omh-cache-v13`)

- **Página "Revisão espaçada"** (`src/components/revisao.js`, `src/views/revisao.js`):
  fila com escada 1/3/7/16/35, perguntas misturadas entre módulos, confiança
  obrigatória antes de responder, explicação e "por que a sua não serve", placar
  "quando tenho certeza, acerto?" com pontos cegos, lista das próximas. Quizzes
  corrigidos antes da página existir entram vencidos na primeira visita.
- **Quiz dos módulos:** três chips de confiança por pergunta; no resultado, "N erros
  feitos com certeza — comece por eles"; as perguntas entram na fila para amanhã.
- **Tela de início:** card "Revisão de hoje"; plano "se-então" salvo no navegador;
  "Guardar o progresso" com Exportar (JSON) e Importar (passa pela sanitização do boot).
- **Store:** `revisao.itens`, `plano`, `quizzes[id].confiancas`, `exportarEstado`,
  `importarEstado`.
- **Aba Narrativas:** cópias e viés de seleção; Discord × Telegram; escala dos canais;
  wash trading 17%; três parágrafos em "Narrativa e preço" (volume × direção, 15
  minutos, causa reversa, break-even); tabela de ferramentas com a coluna "Ler é
  grátis?", componentes do Trending Score, bots no X (Varol 2017); GOAT e MOODENG
  corrigidos; 9 fontes novas; não verificados atualizados.

**Verificado no navegador local (14/09):** tela de início salva o plano; quiz do M7
grava 8 confianças e cria 8 itens vencendo em 24 h; sessão de revisão com 8 perguntas
até o resumo, placar e fila; aba Narrativas monta sem "NaN" nem erro no console.

## 5. Pendências que vieram desta leva — situação em 14/09 (cache `omh-cache-v14`)

1. "Por que a sua não serve" nos quizzes de M1 a M5 e nas 10 primeiras do M3 — **feito**
   (183 alternativas erradas, conferido por script).
2. Perguntas de definição → cenário — **feito** nas duas que eram definição pura (M2 q2,
   M4 q1). Variantes por termo do glossário — **feito** de outro jeito: duas perguntas
   geradas na Revisão a partir da definição e do exemplo (sem cloze, que exigiria
   resposta digitada e correção de texto).
3. 3 alternativas por pergunta — **não feito, de propósito**: Rodriguez 2005 mostra que a
   4ª não piora a medida psicométrica, mas não mede ganho de aprendizagem com a troca, e
   remover alternativas quebraria respostas salvas. A Revisão do glossário já usa 3.
4. Uma pergunta por segmento — **feito** onde a parte tem pergunta do quiz que casa com
   ela (9 perguntas em 5 abas), corrigida na hora, sem salvar.
5. Barra de progresso medindo domínio — **feito** depois do "finalize tudo": metade vem
   do acerto no quiz.
6. Embaralhar os cenários do simulador — **feito** (conferido: ordens diferentes entre
   visitas; escolhas salvas por id).
7. "Próxima ação única" — **feito**.

**Conferido ao vivo, 14/09:** a lista de artigos aceitos em
`sigsac.org/ccs/CCS2026/program/accepted-papers.html` (62 mil caracteres) não contém
"Meme Coin Factories", "pump.fun", "Szwajcok" nem "Christin". O CCS tem mais de um ciclo
de submissão; a lista pode estar incompleta. O app mantém o estudo como preprint.

**Correção encontrada ao finalizar:** o quiz do M4 (q4) ainda tinha "LP bloqueada ou
queimada" como parte da resposta certa, e a checagem nº 1 do M4 dizia "nenhuma outra
checagem sobrevive a essa". Corrigido com Mazorra 2022 e com o fato de a pool
pós-graduação do pump.fun ser do protocolo. Os cenários do simulador sobre LP ficaram
como estavam: descrevem a mecânica (LP numa carteira do criador pode ser retirada), que
continua certa.

Nenhum checkpoint restante precisa de resposta.
