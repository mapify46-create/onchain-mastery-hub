> **Nota de continuidade (Etapa 2).** Os efeitos já fechados na Etapa 1 (prática de recuperação, espaçamento, intercalação, exemplos resolvidos, autoexplicação, pré-teste, segmentação, productive failure) são citados aqui só de passagem quando ancoram uma recomendação de aplicação. Datas de consulta: **14 de setembro de 2026** (todas as buscas foram feitas nesta data).

# ETAPA 2 — Distratores que ensinam, feedback que explica, intervalos de revisão, glossário/quiz sem decoreba e o que salvar no localStorage

## TL;DR
- **Para o seu curso solo, a aposta ótima e com respaldo é:** 3 alternativas por questão (1 certa + 2 distratores tirados de erros reais de trader), **feedback imediato E elaborado** que diz *por que a alternativa que você marcou está errada* (feedback elaborado g≈0,49 vs. "só certo/errado" g≈0,05, Van der Kleij, Feskens & Eggen 2015), e uma **regra de revisão espaçada fixa e simples** (gap ≈ 10–20% do horizonte de retenção que você quer, Cepeda et al. 2008), guardando por item apenas: timestamp da última revisão, intervalo atual, nº de acertos consecutivos e a confiança.
- **Distratores plausíveis não só medem — eles ensinam:** forçam você a recuperar por que cada alternativa é falsa, gerando aprendizado até da informação contida nos distratores (Little, Bjork, Bjork & Angello 2012). O risco de fixar o erro (*negative suggestion effect*, Roediger & Marsh 2005) é neutralizado exatamente pelo feedback imediato que você já decidiu adotar (Butler & Roediger 2008).
- **SM-2 e FSRS acrescentam só previsão mais fina de recordação** (FSRS-6 log loss 0,346 sobre ~350 milhões de revisões), **não** aprendizagem comprovada: **não existe nenhum experimento controlado mostrando que eles ensinem mais que um cronograma fixo simples** — a vantagem é de previsão/simulação. Para 7 módulos, uma regra fixa captura praticamente toda a evidência real.

---

## 1. TABELA-RESUMO (5 tópicos)

| # | Afirmação prática | Evidência (autores, ano, tipo, k/N) | Tamanho de efeito | Vale / falha | Status |
|---|---|---|---|---|---|
| 1 | 3 opções (1 certa + 2 distratores) é o ótimo | Rodriguez 2005, meta-análise, 27 estudos / 80 anos | 5→3 opções sem efeito detrimental na qualidade psicométrica | Vale em avaliação; poucos itens têm 3 distratores plausíveis | página aberta |
| 1 | Distratores devem vir de equívocos/erros comuns | Haladyna, Downing & Rodriguez 2002, revisão de 31 regras (27 estudos + 27 livros) | s/ efeito agregado; "qualidade > número" | Vale; exige conhecer os erros típicos | só snippet |
| 1 | MC com alternativas competitivas ensina info NÃO testada | Little, Bjork, Bjork & Angello 2012, 2 experimentos | MC recuperou info dos distratores melhor que cued-recall | Só se distratores forem plausíveis | página aberta |
| 1 | Alternativas falsas podem fixar erro (negative suggestion) | Roediger & Marsh 2005, JEP:LMC | + lures na prova final | Falha SÓ sem feedback | página aberta |
| 1 | Feedback anula o efeito negativo do MC | Butler & Roediger 2008, Mem&Cogn | imediato e atrasado ↑ acertos e ↓ intrusões | Imediato reduz risco de misinformação | só snippet |
| 2 | Feedback elaborado > resposta correta > só certo/errado | Van der Kleij, Feskens & Eggen 2015, meta-análise, 40 estudos, 70 ES | **EF 0,49; KCR 0,32; KR 0,05** | EF vence sobretudo em ordem superior | página aberta |
| 2 | O que decide é a informação do feedback, não "dar feedback" | Wisniewski, Zierer & Hattie 2020, meta-análise, 435 estudos, k=994, N>61.000 | d=0,48 geral (alta heterogeneidade) | Alta informação puxa p/ cima; elogio/nota p/ baixo | página aberta |
| 2 | Erros de alta confiança são MAIS corrigidos após feedback | Butterfield & Metcalfe 2001; Metcalfe 2017; Barbieri & Devlin 2023 | efeito robusto (hypercorrection) | Explicar o porquê aumenta correção duradoura | página aberta |
| 2 | Feedback longo demais aumenta carga e reduz efeito | Van der Kleij et al. 2019, N=107, experimento | detalhe ajuda; excesso ↑ carga extrínseca | Falha se redundante / durante a tarefa | só snippet |
| 2 (nota) | Feedback atrasado pode superar imediato p/ retenção longa | Butler, Karpicke & Roediger 2007, 2 experimentos | atrasado > imediato na prova final | Condição específica; NÃO recomendo mudar | página aberta |
| 3 | Gap ótimo ≈ 10–20% do horizonte de retenção | Cepeda, Vul, Rohrer, Wixted & Pashler 2008, N>1.350, 1 experimento | gap ótimo cai de ~20–40% (RI 1 sem) a ~5–10% (RI 1 ano) | Fatos verbais; extrapolação p/ trading | página aberta |
| 3 | Intervalos iguais ≈ ou > expandidos p/ retenção longa | Karpicke & Roediger 2007, 3 experimentos | expandido vence imediato; igual vence a 2+ dias | Importa é atrasar a 1ª recuperação | página aberta |
| 3 | FSRS prevê recordação melhor que SM-2 | srs-benchmark (doc software), ~350M revisões, 9.999 coleções | FSRS-6 log loss 0,346 / RMSE(bins) 0,065; 99,6% de superioridade s/ SM-2 | É PREVISÃO/simulação, não aprendizagem medida | doc software |
| 3 | FSRS/SM-2 ensinam mais que cronograma fixo? | — | **NÃO VERIFICADO** (nenhum RCT de resultado) | — | — |
| 4 | Recuperação transfere, mas menos que retenção direta | Pan & Rickard 2018, meta-análise, 122 exp., 192 ES, N=10.382 | d=0,40 geral; 0,58 entre formatos; 0,28 sem congruência | Transfere com "response congruency" | página aberta |
| 4 | Gerar a resposta > reconhecer/ler | Bertsch, Pesta, Wiscott & McDaniel 2007, meta-análise, 86 estudos, 445 ES | d=0,40 | Maior em aprendizagem incidental | só snippet |
| 4 | Cloze/resposta construída > MC "tentativa e erro" | Li & Boers 2025, N=56, experimento | gap-fill como recuperação = melhor; MC adivinhação = pior | MC bom se usado como recuperação séria | página aberta |
| 5 | Registrar confiança permite priorizar erro de alta confiança | Butler, Karpicke & Roediger 2008; Wang & Yang 2021 | feedback corrige viés metacognitivo | Vale; melhora calibração | página aberta |
| 5 | Alunos são mal calibrados (ilusão de competência) | Bjork, Dunlosky & Kornell 2013; Wilford et al. 2020 | JOLs inflam com fluência sem ganho real | Registro objetivo corrige a ilusão | página aberta |
| 5 | localStorage ~5 MiB/origem, síncrono, some ao limpar | MDN — Storage quotas (5 jan 2026) | 5 MiB local + 5 MiB session por origem | Sem servidor/sync | página aberta |

---

## 2. SEÇÃO POR TÓPICO

**Termos explicados:** *distrator* = alternativa errada de uma questão de múltipla escolha (MC); *cloze* = frase com lacuna a preencher; *KR* (knowledge of results) = feedback que só diz certo/errado; *KCR* (knowledge of correct response) = feedback que mostra a resposta certa; *EF* (elaborated feedback) = feedback que explica; *JOL* (judgment of learning) = o quanto o aluno *acha* que aprendeu; *RMSE* (root mean square error) = medida de erro médio de previsão; *log loss* = medida de erro para previsões probabilísticas; *DSR* = Difficulty/Stability/Retrievability, os 3 componentes do modelo de memória do FSRS.

### TÓPICO 1 — Como escrever distratores que ensinam

**Quantos distratores.** A meta-análise clássica de Rodriguez (2005, *Educational Measurement: Issues and Practice*, 27 estudos ao longo de 80 anos; página aberta) conclui que **3 opções são ótimas** na maioria dos contextos. No resumo do próprio artigo: *"More 3-option items can be administered than 4- or 5-option items per testing time while improving content coverage, without detrimental effects on psychometric quality of test scores."* Concretamente, passar de 5 para 3 opções quase não muda dificuldade, discriminação ou confiabilidade — porque a 4ª e 5ª opções raramente são distratores plausíveis. Isso ratifica Haladyna & Downing: *"não é o número de distratores, mas a qualidade"* que importa. **Tradução leiga:** escreva 1 certa + 2 erradas realmente tentadoras; a 3ª e 4ª erradas normalmente são "enchimento" que você elimina de imediato e que não ensina nada. Réplicas confirmam (Edwards, Arthur & Bruce 2012, página aberta: equivalência psicométrica de 3 vs. 5). **Divergência de método:** Budescu & Nevo argumentaram que 3 seria insuficiente, e a simulação da ETS (Guo, Zu & Kyllonen 2018) achou ~5 ótimo — mas essa foi uma **simulação a partir de um único teste de 8 opções**, enquanto Rodriguez sintetiza estudos empíricos reais. Para o seu caso (curso solo, itens de aplicação), **3 opções**.

**Distratores baseados em equívocos (misconception-based).** Consenso na literatura de item-writing: distratores construídos a partir de erros/equívocos comuns aumentam o valor diagnóstico e a qualidade do item (Haladyna & Downing 1989; Case & Swanson 2001; revisão em Gierl et al., *Frontiers* 2019; só snippet). **Não há tamanho de efeito agregado** para "misconception-based vs. genérico". **Aplicação:** seus distratores devem ser os erros reais de quem faz trading on-chain de memecoin — confundir *market cap* com *FDV*, achar que "liquidez travada" = "seguro", vender no primeiro vermelho, ignorar taxa de rede/imposto. Cada errada = um erro que você mesmo já cometeu.

**Distratores competitivos ENSINAM (não só medem).** Little, Bjork, Bjork & Angello (2012, *Psychological Science*, "Multiple-Choice Tests Exonerated", 2 experimentos; página aberta): quando as alternativas erradas são plausíveis/competitivas, o aluno é levado a recuperar da memória *por que a certa está certa E por que cada errada está errada*, e isso melhora depois o desempenho **até em perguntas sobre a informação não testada diretamente** (a que estava nos distratores) — ganho que a pergunta aberta (cued-recall) não produziu. **Tradução leiga:** uma boa questão de 3 alternativas plausíveis faz o cérebro rodar 3 mini-explicações; você aprende as 3. É uma razão forte para preferir MC bem-feita a cartão de pergunta aberta no seu formato de navegador.

**O risco: negative suggestion effect.** Roediger & Marsh (2005, *JEP:LMC*; página aberta): expor o aluno a alternativas falsas dá efeito positivo (mais acertos depois) **mas também negativo** — aumenta a chance de reproduzir os *lures* (iscas falsas) como se fossem verdade, "criando conhecimento falso". **Quando isso é anulado?** Butler & Roediger (2008, *Memory & Cognition*; só snippet): tanto o feedback imediato quanto o atrasado "aumentaram a proporção de respostas corretas e reduziram a proporção de intrusões". O feedback imediato reduz o risco de absorver a desinformação. **Conclusão direta:** distratores competitivos **+ feedback imediato** (sua decisão já tomada) é exatamente a combinação que colhe o ganho e neutraliza o risco.

**Regras empíricas de escrita** (Haladyna, Downing & Rodriguez 2002; só snippet + fontes secundárias abertas):
- **"Todas as anteriores" (all of the above): evitar.** ~70% das fontes apoiam a regra; tende a *diminuir* a dificuldade (quem reconhece 2 corretas marca "todas") e reduz confiabilidade (Harasym et al. 1998).
- **"Nenhuma das anteriores" (none of the above): usar com cautela.** Rich & Johanson 1990: reduz dificuldade e discriminação; quando é a resposta certa, distorce a psicometria.
- **Alternativa mais longa:** não deixe a certa ser sistematicamente a mais comprida — é a pista mais confirmada empiricamente (revisão de *item-writing flaws*, PMC 2023; página aberta): manter comprimentos parecidos tem suporte de validade.
- **Pistas gramaticais:** o enunciado deve concordar com todas as alternativas (senão você elimina distratores de graça).
- **Itens defeituosos custam caro:** Downing 2005 relata 10–15% de alunos mal classificados por itens mal escritos.

### TÓPICO 2 — Feedback que explica por que a errada está errada

**A hierarquia dos tipos de feedback.** Meta-análise central: Van der Kleij, Feskens & Eggen (2015, *Review of Educational Research*, 40 estudos, 70 tamanhos de efeito de −0,78 a +2,29; página aberta). Verbatim: *"elaborated feedback (EF; e.g., providing an explanation) produced larger effect sizes (0.49) than feedback regarding the correctness of the answer (KR; 0.05) or providing the correct answer (KCR; 0.32)."* **Tradução leiga do 0,49:** o aluno médio que recebe explicação supera ~69% dos que só receberam "errado"; o "só certo/errado" (0,05) é praticamente inútil sozinho. E o EF vence **sobretudo em aprendizagem de ordem superior** (aplicar, não só lembrar) — exatamente o alvo do seu simulador de cenários.

**Contexto de tamanho geral.** Wisniewski, Zierer & Hattie (2020, *Frontiers in Psychology*, 435 estudos, k=994, N>61.000; página aberta): efeito médio geral **d=0,48**, com alta heterogeneidade — "o feedback não pode ser entendido como um tratamento único e consistente". O que decide é o conteúdo: feedback de alta informação puxa a média para cima; elogio e nota pura puxam para baixo. **Divergência de método:** Hattie & Timperley (2007) reportaram d=0,79, mas por meta-síntese (síntese de meta-análises, sem remover duplicatas nem pesar estudos); Wisniewski, ao reanalisar estudos primários, revisou para 0,48 (mais conservador). Ambos são válidos; use o 0,48 como referência atual.

**Feedback direcionado ao distrator escolhido.** A recomendação de endereçar especificamente a alternativa marcada é coerente com toda a literatura de EF, mas **não achei um tamanho de efeito isolado** "feedback direcionado vs. genérico" — **parcialmente NÃO VERIFICADO** (direção apoiada; número inexistente). O guia baseado em evidência de D'Antoni et al. (2018, *Clinical Anatomy*; página aberta) recomenda explicitamente itens "com explicações sobre a melhor alternativa E sobre os distratores", citando que feedback explicativo supera o de só resposta correta.

**Hypercorrection (erro com alta confiança).** Butterfield & Metcalfe (2001) e Metcalfe (2017): erros feitos com **alta confiança são mais facilmente corrigidos** após feedback do que erros de baixa confiança — porque o feedback é mais surpreendente e recebe mais atenção (Fazio & Marsh 2009). Confirmado num tutor online por Barbieri & Devlin (2023, *J. Computer Assisted Learning*; página aberta): a redução de erros de alta confiança foi maior que a de baixa. **Aplicação:** quando você errar **com certeza**, é o momento de ouro — o feedback que explica o porquê "gruda" mais. Isso justifica registrar a confiança (Tópico 5).

**Quanto de explicação é demais.** Van der Kleij et al. (2019, *Computers & Education*, N=107, experimento; só snippet): a explicação detalhada ajuda mais em resposta construída, mas o excesso aumenta a carga cognitiva extrínseca (redundância), sobretudo se dado *durante* a tarefa. **Recomendação prática** (apoiada, sem número específico): feedback de **1 a 3 frases** — (a) por que a marcada está errada, (b) qual é a certa e por quê. Explicação extra "sob demanda" (expandir/link), não empurrada.

**NOTA (feedback atrasado — sem recomendar mudança).** Butler, Karpicke & Roediger (2007, *JEP:Applied*, 2 experimentos; página aberta): feedback **atrasado** levou a melhor desempenho na prova final que o imediato — provável efeito de espaçamento (o feedback atrasado é uma reapresentação espaçada). Vale sobretudo para retenção de longo prazo medida com atraso, e **some quando a prova é imediata**. Como sua decisão de feedback imediato já está tomada, **apenas registro a condição; não proponho mudar**. Se um dia quiser explorar, a única forma compatível com seu formato seria fazer a *explicação reaparecer dias depois* na revisão espaçada — o que o Tópico 3 já cobre.

### TÓPICO 3 — Intervalos de revisão espaçada

**A razão gap/retenção.** Cepeda, Vul, Rohrer, Wixted & Pashler (2008, *Psychological Science*, N>1.350, 1 experimento; página aberta): ensinaram fatos, revisaram após um gap de até 3,5 meses, testaram com atraso de até 1 ano. Verbatim do resumo: *"the optimal gap declined from about 20 to 40% of a 1-week test delay to about 5 to 10% of a 1-year test delay."* **Tradução:** quanto mais longe você quer lembrar, mais espaçado deve revisar — mas a proporção encolhe. Regra de bolso citada na literatura (Rohrer & Pashler): **gap ≈ 10–20% do horizonte de retenção**. Ex.: lembrar daqui a 1 mês → revise a ~3–6 dias; lembrar daqui a 1 ano → revise a ~1–2 meses. **IMPORTANTE:** esses números vêm de fatos verbais (trivia); aplicá-los ao seu conteúdo de trading é extrapolação razoável, **não testada exatamente**.

**Expandido vs. uniforme.** Karpicke & Roediger (2007, *JEP:LMC*, 3 experimentos; página aberta): intervalos **expandidos** (1-3-7…) vencem em teste *imediato*, mas intervalos **iguais** vencem (ou empatam) na retenção com 2+ dias de atraso. O fator decisivo **não é expandir, e sim atrasar/dificultar a primeira recuperação**. A maioria dos estudos posteriores não acha diferença significativa entre expandido e uniforme. **Conclusão:** não se preocupe em "expandir" com precisão; garanta que a 1ª revisão não seja cedo demais.

**Uma regra fixa (1/7/30 dias) tem apoio direto?** **NÃO VERIFICADO** — não encontrei estudo que teste exatamente essa sequência. É extrapolação (defensável) das razões de Cepeda 2008 e do princípio de espaçamento (Cepeda 2006, g=0,74, já estabelecido na Etapa 1). Para o seu curso, uma escada fixa por item — **acertou → sobe (1 → 3 → 7 → 16 → 35 dias); errou → volta para 1 dia** — é totalmente defensável e alinhada à evidência, mesmo sem um estudo que teste essa sequência exata. Marque como "derivado da teoria, não testado diretamente".

**O que SM-2 e FSRS acrescentam.**
- **SM-2** (Piotr Woźniak, SuperMemo, publicado na tese "Optimization of Learning", 1990; usado modificado pelo Anki — documentação de software/tese): mantém **por cartão 3 variáveis** — contador de repetições *n*, fator de facilidade *EF* (começa em 2,5) e intervalo atual *I*. Após cada revisão, a nota do aluno ajusta o EF e o próximo intervalo = intervalo × EF. É uma heurística fixa.
- **FSRS** (Free Spaced Repetition Scheduler): baseado no modelo de 3 componentes da memória (**DSR** — *Difficulty*, *Stability*, *Retrievability*; Stability = tempo para a recordação cair de 100% para 90%; Retrievability = probabilidade de lembrar agora). **Base acadêmica peer-reviewed:** Ye, Su & Cao, "A Stochastic Shortest Path Algorithm for Optimizing Spaced Repetition Scheduling", **ACM SIGKDD 2022** (DOI 10.1145/3534678.3539081) — construiu um modelo de memória de Markov sobre **220 milhões de logs** do app MaiMemo e projetou um agendador que **minimiza o custo de revisão**, com 12,6% de melhoria sobre métodos anteriores; e um artigo companheiro em *IEEE TKDE* (2023, DOI não confirmado nesta busca). O modelo de 3 componentes em si é creditado a Woźniak/SuperMemo. O nome "Three-Component Model of Memory" aparece na **documentação de software/comunidade**, não como artigo isolado.

**O quanto FSRS bate SM-2.** Benchmark oficial `open-spaced-repetition/srs-benchmark` (documentação de software) sobre **~727 milhões de revisões de 10 mil usuários** do Anki, com **349.923.850 revisões usadas na avaliação** em **9.999 coleções**: **FSRS-6 log loss 0,346 e RMSE(bins) 0,065; FSRS-5 log loss 0,356 e RMSE(bins) 0,074**. Verbatim do README: *"FSRS-6-recency has a 99.6% superiority over the Anki's variant of SM-2 with default parameters, meaning that for 99.6% of all collections in this benchmark, FSRS-6-recency can estimate the probability of recall more accurately."* **RMSE/log loss medem apenas quão perto a probabilidade de recordação *prevista* está da real** — ou seja, é ajuste de previsão. A alegação de "20–30% menos revisões para a mesma retenção" foi corrigida pelos próprios mantenedores: *"(atualização 2026-02-12: o número é baseado em resultados de simulação)"*.

**FSRS/SM-2 produzem mais APRENDIZAGEM que um cronograma fixo?** **NÃO VERIFICADO.** Não existe nenhum experimento controlado (RCT) de **resultado de aprendizagem** comparando FSRS (ou SM-2) contra um cronograma fixo simples. Toda a evidência é (a) **ajuste de previsão** em dados de revisão logados (log loss, RMSE) e (b) **eficiência derivada de simulação**. Fontes explicitam: KaChiKa (blog) — "esse número de eficiência vem de simulação em larga escala sobre dados logados, não de um ensaio controlado com alunos ao vivo"; a wiki do FSRS admite que o "20–30% menos revisões" é simulação; PedagogyPath (blog) — "a alegação mais forte de que o FSRS *melhora resultados de aprendizagem de longo prazo* em relação ao SM-2 em sala real ou autoestudo é mais difícil de estabelecer e não é o argumento central do FSRS". O que **é** apoiado por RCT é o espaçamento em geral (Cepeda 2008), não o ganho específico do algoritmo. **Conclusão para você:** para 7 módulos, uma **regra fixa simples** captura praticamente toda a evidência real; SM-2/FSRS são refinamentos de *previsão* que só justificam a complexidade se você tiver centenas de itens e quiser minimizar tempo de revisão — e, mesmo aí, o ganho é de eficiência prevista, não de aprendizagem demonstrada.

### TÓPICO 4 — Transformar 34 termos + 8–13 perguntas/módulo em revisão sem decoreba

**Recuperação transfere — mas menos que retenção direta.** Pan & Rickard (2018, *Psychological Bulletin*; 122 experimentos, 192 tamanhos de efeito, N=10.382; página aberta): efeito geral da transferência **d=0,40** (95% CI [0,31; 0,50]). Maior **entre formatos de teste (d=0,58)** e para perguntas de aplicação/inferência; menor para pares estímulo-resposta rearranjados e material só visto no estudo. Moderador decisivo — a "response congruency" (a resposta praticada e a testada se sobrepõem). Verbatim: *"When there was no response congruency between the initial and final tests, the weighted effect size was d = 0.28…; if response congruency held, the estimated effect size increased by d = 0.30… yielding an estimated effect size of d = 0.58."* Prática de recuperação elaborada acrescenta +0,23. **Tradução leiga do 0,40:** recuperar ajuda a aplicar em contexto novo, mas menos do que ajuda a repetir a mesma pergunta.

**Implicação direta: recuperar a definição nua transfere pouco para aplicação.** Pan et al. (2018/2019) mostraram que decorar definições ("O que é X?") gera aprendizado *específico da definição* que **não transfere** para aplicar o conceito, a menos que a prática já envolva processar o conceito inteiro. Se você só testar "o que é *slippage*?", aprende a recitar "slippage", não a evitá-lo numa trade.

**Como transformar os 34 termos e as perguntas:**
1. **Troque "defina X" por cenário.** Em vez de "O que é slippage?", use: *"Você manda uma ordem de mercado num token de baixa liquidez e recebe 12% menos tokens que o cotado. Isso é: (a) slippage (b) taxa de rede (c) rug pull."* É aplicação + distratores de equívoco.
2. **Prefira gerar a resposta a reconhecê-la quando der.** Bertsch, Pesta, Wiscott & McDaniel (2007, meta-análise, 86 estudos, 445 ES; só snippet): efeito de geração **d=0,40** — quem gera lembra ~meia SD melhor que quem lê. Um cloze ("Comprar um token cuja liquidez não está travada expõe você a um ____") faz gerar; MC faz reconhecer. Li & Boers (2025, N=56, experimento; página aberta) reforçam: **gap-fill usado como recuperação deu o melhor resultado; MC usado como "tentativa e erro" deu o pior** (e produziu mais erros repetidos — negative suggestion effect). **Portanto:** use MC com feedback como recuperação séria, não como adivinhação; e considere cloze para os termos-chave.
3. **Misture termos de módulos diferentes** (interleaving; g=0,42, Brunmair & Richter, já da Etapa 1). Uma revisão que junta termos do módulo 2 e do 6 força você a discriminar conceitos parecidos.
4. **Varie contexto/exemplos** para o mesmo termo, para não colar o aprendizado ao item específico.

**Re-testar o MESMO item cria "memória do item".** Sim — a lógica de *transfer-appropriate processing* e o próprio Pan & Rickard indicam que testar sempre a mesma redação produz aprendizado ligado *àquela pergunta* (você acerta o cartão, não o conceito). **Não achei tamanho de efeito limpo** para "variar a redação entre repetições vs. repetir idêntico" — direção apoiada, número **NÃO VERIFICADO**. **Recomendação:** para cada termo, tenha **2–3 variantes** da pergunta (definição ↔ cenário ↔ cloze) e alterne entre as repetições espaçadas. Combina geração + transferência + espaçamento.

### TÓPICO 5 — O que salvar no localStorage

*Engenharia derivada da evidência acima; não há literatura sobre localStorage em si.*

**O que a agenda de revisão exige por item.** Para rodar a regra fixa (Tópico 3), o mínimo por item é: (1) **timestamp da última revisão**; (2) **intervalo atual** (ou índice na escada 1/3/7/16/35); (3) **nº de acertos consecutivos** (para subir/descer na escada). Se um dia migrar para SM-2, some (4) **ease factor (EF)** e contador de repetições *n*. Para FSRS, some (5) **Difficulty e Stability** por cartão (os componentes do DSR). Fonte da especificação de variáveis: documentação SM-2/Anki e benchmark FSRS. Como você **não** tem evidência de que SM-2/FSRS ensinem mais, **comece com o mínimo (1–3)** e só adicione EF/DSR se for medir eficiência.

**Registrar a confiança tem valor.** Butler, Karpicke & Roediger (2008) e Wang & Yang (2021, página aberta): o feedback corrige o viés metacognitivo, e registrar confiança permite (a) detectar **erros de alta confiança** — os que mais se beneficiam de feedback explicativo (hypercorrection) — e (b) detectar **acertos de baixa confiança / "por sorte"**, que o feedback ajuda a consolidar. **Aplicação:** adicione um campo de confiança de 1 clique ("chutei / mais ou menos / tenho certeza") e use-o para priorizar na revisão os erros de alta confiança e os acertos de baixa confiança.

**Por que um registro objetivo importa.** Os alunos são mal calibrados e superestimam o quanto aprenderam, sobretudo após reler (ilusão de competência; Bjork, Dunlosky & Kornell 2013; JOLs inflam com fluência sem ganho real — Wilford et al. 2020, página aberta). Como você é aluno de si mesmo, seu "sentimento de saber" é a fonte **menos** confiável. Um registro objetivo de acertos/erros por item substitui "acho que domino o módulo 5" por "acertei 4/13 do módulo 5 na última revisão".

**Mostrar o próprio histórico/progresso.** Há evidência de que **feedback saliente melhora a calibração** (Saenz, Geraci & Tirso 2019, página aberta: entre 5 intervenções, apenas feedback saliente e um aviso sobre viés melhoraram a acurácia da previsão). Mostrar o próprio desempenho objetivo é uma forma de feedback saliente. **Não achei tamanho de efeito** para "barra de progresso melhora aprendizagem" — **NÃO VERIFICADO para aprendizagem, apoiado para calibração**.

**Esquema mínimo concreto (localStorage):**
- **Por ITEM** (cada questão/termo): `{id, moduloId, ultimaRevisaoTS, intervaloAtual (ou índiceEscada), acertosConsecutivos, ultimaResposta, ultimaConfianca (1–3), nTentativas, variantePergunta}` → **EXIGIDO** pela evidência (agenda + hypercorrection + calibração + variação de redação).
- **Por MÓDULO**: `{moduloId, %acertoUltimaRevisao, dataUltimaRevisao, itensDominados/total}` → **EXIGIDO** (registro objetivo anti-ilusão).
- **Por SESSÃO**: `{sessaoTS, itensRevistos, acertos, tempoTotal}` → **CONVENIÊNCIA** de implementação (sem tamanho de efeito de aprendizagem).
- **EF/ease e Difficulty/Stability** → **OPCIONAL**, só se migrar para SM-2/FSRS (não exigido pela evidência de aprendizagem).

**Limites técnicos do localStorage** (conhecimento de plataforma, verificado com fonte). Segundo o MDN ("Storage quotas and eviction criteria", última modificação 5 jan 2026; página aberta), verbatim: *"Web Storage… is limited to 10 MiB of data maximum on all browsers. Browsers can store up to 5 MiB of local storage, and 5 MiB of session storage per origin. Once this limit is reached, browsers throw a QuotaExceededError exception."* É **síncrono** (bloqueia a thread principal), **só guarda strings**, **não sincroniza** entre dispositivos e é **apagado se o usuário limpar os dados do navegador** (e pode ser removido por falta de espaço em disco). Para o seu volume (7 módulos, 34 termos, ~70–90 perguntas + histórico), 5 MB é folgadíssimo — um JSON por item ocupa poucos KB. **Riscos a mitigar:** (a) envolver `setItem` em `try/catch`; (b) oferecer **export/import em JSON** (botão "baixar meu progresso"), já que não há servidor nem conta; (c) avisar que limpar o navegador apaga tudo.

---

## 3. LISTA DE NÃO VERIFICADOS
- **Regra fixa 1/7/30 (ou 1/3/7/16/35):** nenhum estudo testa exatamente essa sequência; extrapolação de Cepeda 2008 + princípio de espaçamento.
- **Ganho de APRENDIZAGEM (não previsão) de FSRS/SM-2 vs. cronograma fixo:** nenhum RCT de resultado; toda evidência é previsão/simulação.
- **Efeito isolado de "feedback direcionado ao distrator marcado vs. genérico":** direção apoiada, número inexistente.
- **Efeito de "variar a redação entre repetições vs. repetir idêntico":** direção apoiada, número inexistente.
- **Efeito de "mostrar barra de progresso/histórico" sobre APRENDIZAGEM:** apoiado para calibração, não para aprendizagem.
- **Tamanho de efeito agregado de distratores misconception-based vs. genéricos:** não existe.
- **DOI do artigo companheiro IEEE TKDE do FSRS:** não confirmado nesta busca.

---

## 4. FONTES (por tipo)

**Meta-análises / revisões:**
- Rodriguez 2005, *Educ. Measurement: Issues & Practice* — DOI 10.1111/j.1745-3992.2005.00006.x (página aberta)
- Haladyna, Downing & Rodriguez 2002, *Applied Measurement in Education* — DOI 10.1207/s15324818ame1503_5 (só snippet)
- Van der Kleij, Feskens & Eggen 2015, *Review of Educational Research* — DOI 10.3102/0034654314564881 (página aberta)
- Wisniewski, Zierer & Hattie 2020, *Frontiers in Psychology* — DOI 10.3389/fpsyg.2019.03087 (página aberta)
- Pan & Rickard 2018, *Psychological Bulletin* — DOI 10.1037/bul0000151 (página aberta)
- Bertsch, Pesta, Wiscott & McDaniel 2007, *Memory & Cognition* — DOI 10.3758/BF03193441 (só snippet)
- Cepeda, Pashler, Vul, Wixted & Rohrer 2006, *Psychological Bulletin* (contexto) — DOI 10.1037/0033-2909.132.3.354 (só snippet)

**Artigos revisados por pares (experimentos):**
- Little, Bjork, Bjork & Angello 2012, *Psychological Science* — DOI 10.1177/0956797612443370 (página aberta)
- Roediger & Marsh 2005, *JEP:LMC* — DOI 10.1037/0278-7393.31.5.1155 (página aberta)
- Butler & Roediger 2008, *Memory & Cognition* — DOI 10.3758/MC.36.3.604 (só snippet)
- Butler, Karpicke & Roediger 2007, *JEP:Applied* — DOI 10.1037/1076-898X.13.4.273 (página aberta)
- Cepeda, Vul, Rohrer, Wixted & Pashler 2008, *Psychological Science* — DOI 10.1111/j.1467-9280.2008.02209.x (página aberta)
- Karpicke & Roediger 2007, *JEP:LMC* (expandido vs. igual) — DOI 10.1037/0278-7393.33.4.704 (página aberta)
- Barbieri & Devlin 2023, *J. Computer Assisted Learning* — DOI 10.1111/jcal.12877 (página aberta)
- Wang & Yang 2021, *PsyCh Journal* — DOI 10.1002/pchj.481 (página aberta)
- Li & Boers 2025, *The Modern Language Journal* — DOI 10.1111/modl.70007 (página aberta)
- D'Antoni et al. 2018, *Clinical Anatomy* — DOI 10.1002/ca.23298 (página aberta)
- Ye, Su & Cao 2022, *ACM SIGKDD* — DOI 10.1145/3534678.3539081 (peer-reviewed, via subagente)
- Saenz, Geraci & Tirso 2019, *Applied Cognitive Psychology* — DOI 10.1002/acp.3556 (página aberta)
- Wilford et al. 2020, *Applied Cognitive Psychology* — DOI 10.1002/acp.3724 (página aberta)
- Edwards, Arthur & Bruce 2012, *Int. J. Selection & Assessment* — DOI 10.1111/j.1468-2389.2012.00580.x (página aberta); Guo, Zu & Kyllonen 2018, ETS RR-18-22 — DOI 10.1002/ets2.12209 (página aberta) — divergência sobre nº de opções

**Documentação de software / benchmark:**
- open-spaced-repetition/srs-benchmark (GitHub) — dataset e métricas FSRS/SM-2
- Anki FAQ / especificação SM-2
- MDN — Storage quotas and eviction criteria (5 jan 2026)

**Blog:**
- expertium.github.io/Benchmark.html (co-autor do FSRS)
- KaChiKa; PedagogyPath (explicações de FSRS, usadas só para caveats)

---

## 5. CONSULTAS DE BUSCA (14 set 2026)
**Scholar Gateway:** "how many options optimal MCQ meta-analysis"; "elaborated feedback vs KCR computer-based meta-analysis"; "multiple-choice testing retrieval practice competitive distractors negative suggestion"; "spacing temporal ridgeline optimal retention ratio"; "transfer of test-enhanced learning meta-analysis"; "generation effect meta-analysis"; "hypercorrection high confidence errors feedback"; "power of feedback meta-analysis effect size"; "illusions of competence JOL overconfidence rereading calibration".
**Web:** "Van der Kleij Feskens Eggen 2015 feedback d"; "Wisniewski Zierer Hattie 2020 d 0.48"; "FSRS benchmark vs SM-2 RMSE log-loss DSR"; "Haladyna 2002 item-writing all/none of the above"; "Cepeda Vul 2008 spacing 1350 participants"; "misconception-based distractors evidence"; "Little Bjork exonerated competitive alternatives"; "Roediger Marsh 2005 negative suggestion"; "localStorage quota 5MB MDN"; "SM-2 spec ease factor variables Anki"; "Karpicke Roediger 2007 expanding equal interval"; "Pan Rickard 2018 transfer d 0.40"; "Bertsch 2007 generation effect d"; "Butler Karpicke Roediger 2007 feedback timing"; "elaborated feedback too long cognitive load".
**Subagente:** verificação da base peer-reviewed do FSRS/DSR, tamanho do dataset do benchmark e ausência de RCT de aprendizagem.

---

## Recomendações (passos concretos, com gatilhos de mudança)

**Fase 1 — reescrever os itens (faça já):**
1. Converta cada questão para **3 alternativas** (1 certa + 2 distratores baseados em erros reais de trader). Aposente distratores "de enchimento".
2. Padronize comprimentos das alternativas; elimine "todas/nenhuma das anteriores"; garanta concordância gramatical com todas.
3. Reescreva perguntas de **definição** como **cenários de decisão** (aproveitando seus 12 cenários do simulador como molde). Meta: a maioria das 8–13 perguntas/módulo deve ser de aplicação, não de "o que é".
4. Para os 34 termos, crie **2–3 variantes** por termo (definição / cenário / cloze) para alternar nas revisões.

**Fase 2 — feedback (faça junto):**
5. Para **cada alternativa errada**, escreva 1–3 frases: por que ela está errada + qual é a certa e por quê. Feedback **imediato** (sua decisão). Explicação extra "sob demanda" (expandir), não empurrada.
6. Adicione um **botão de confiança de 1 clique** antes de revelar a resposta ("chutei / mais ou menos / tenho certeza").

**Fase 3 — revisão espaçada (comece simples):**
7. Implemente a **escada fixa por item**: acertou → 1→3→7→16→35 dias; errou → volta a 1 dia. Não tente "expandir" com precisão; só garanta que a 1ª revisão não seja no mesmo dia.
8. Misture termos de módulos diferentes na fila de revisão (interleaving).
9. Mostre um **painel objetivo** por módulo (ex.: "4/13 na última revisão") — combate a ilusão de competência.

**Fase 4 — localStorage:**
10. Grave o esquema mínimo por item/módulo (Seção 5 do Tópico); envolva `setItem` em `try/catch`; ofereça **export/import JSON**; avise que limpar o navegador apaga o progresso.

**Gatilhos que mudariam a recomendação:**
- **Migrar para SM-2/FSRS** só se: (a) o nº de itens crescer para as **centenas** e (b) você quiser minimizar *tempo* de revisão — lembrando que o ganho é de **eficiência prevista, não de aprendizagem demonstrada**. Se ficar em ~90 itens, **não vale a complexidade**.
- **Rever o feedback imediato** só se você passar a medir retenção com **atraso de dias/semanas** e observar que a explicação "gruda" pouco — nesse caso, a saída compatível é fazer a explicação **reaparecer na revisão espaçada**, não trocar por feedback atrasado dentro do quiz.
- **Encurtar o feedback** se perceber que para de ler as explicações (sinal de sobrecarga): reduza para 1 frase + "expandir".

## Caveats
- **Quase toda a evidência de tamanho de efeito vem de outros conteúdos** (trivia, vocabulário, anatomia, matemática), não de trading on-chain. As direções (distratores plausíveis, feedback elaborado, espaçamento, geração) são robustas e gerais; os números exatos são referências, não promessas para o seu domínio.
- **Cepeda 2008** é um único (embora grande) experimento com fatos verbais; a razão 10–20% é a melhor bússola disponível, não uma lei.
- **A escada 1/3/7/16/35 é derivada da teoria, não testada** nessa forma exata.
- **FSRS/SM-2:** superioridade documentada é de *previsão de recordação* e *eficiência simulada* — não há RCT mostrando mais aprendizagem que um cronograma fixo. Trate qualquer alegação de "X% melhor" como previsão/simulação.
- **Feedback direcionado ao distrator, variação de redação entre repetições e efeito de barra de progresso sobre aprendizagem** têm direção apoiada mas **sem tamanho de efeito** — implemente pela lógica, sem prometer magnitude.
- Como **você é o único aluno**, o maior risco não é o design dos itens, e sim a **ilusão de competência**: confie no registro objetivo de acertos/erros, não no seu "sentimento de saber".