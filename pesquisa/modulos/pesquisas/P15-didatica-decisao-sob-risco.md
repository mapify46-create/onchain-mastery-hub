# Ensinar a decidir sob risco e incerteza: cenários, simulação e calibração — levantamento factual para um curso de trading on-chain

*Data de consulta de todas as fontes: 13 de setembro de 2026. Ferramentas usadas: Scholar Gateway (corpus acadêmico de texto completo), web_search e web_fetch (marcação por fonte). **Nenhuma afirmação aqui promete lucro**: nada neste documento melhora retorno financeiro. O objetivo é qualidade e disciplina de decisão, e a honestidade sobre a própria incerteza.*

---

## TL;DR (resposta direta em 3 pontos)

- **Sim, dá para ensinar alguém a decidir melhor sob incerteza, e a evidência mais forte é para calibração e simulação — mas o efeito é modesto e mensurável, não transformador.** O treino de raciocínio probabilístico do Good Judgment Project (menos de 1 hora) melhorou a acurácia (Brier score) em **6 a 11%** ao longo de quatro anos (Chang et al. 2016, *página aberta*), e a simulação com prática deliberada em medicina tem tamanho de efeito **d = 0,71** sobre o ensino tradicional (McGaghie et al. 2011).
- **Doze cenários NÃO bastam para treinar nem para medir calibração.** Para medir uma curva de calibração com sentido estatístico você precisa de dezenas a centenas de previsões; para treinar de forma detectável, os estudos usaram ~200 itens (Lichtenstein & Fischhoff 1980, *página aberta*) ou 55×4 previsões (Benson & Önkal 1992). A solução prática: manter os 12 cenários como narrativa, mas gerar **muitas micro-previsões por cenário**, repetir com variação e mirar **≥50–100 previsões com feedback**.
- **O maior risco do seu domínio é o "ambiente traiçoeiro" (wicked): em memecoin a decisão boa pode dar resultado ruim.** O feedback do simulador deve, portanto, **pontuar a qualidade da probabilidade e do processo (via Brier e checklist), nunca o P&L**, separando explicitamente qualidade-da-decisão de resultado — exatamente para não ensinar a lição errada (Baron & Hershey 1988; Hogarth, Lejarraga & Soyer 2015; Kahneman & Klein 2009).

---

## TABELA-RESUMO (um achado por linha)

| Tema | Achado em uma frase | Efeito / amostra / tipo de estudo | Status | Fonte |
|---|---|---|---|---|
| Simulação (medicina) | Simulação com prática deliberada supera ensino clínico tradicional | d = 0,71 (IC95% 0,65–0,76); 14 de 3.742 estudos (1990–2010); meta-análise | página aberta (snippet do texto) | McGaghie et al. 2011, Acad Med |
| Simulação (enfermagem) | Simulação melhora aprendizagem em vários domínios | SMD = 0,70; 40 estudos; meta-análise (alta-fid. 0,86; média 1,03; paciente-padrão 0,86) | só snippet | Kim, Park & Shin 2016, BMC Med Educ |
| Interleaving | Misturar tipos de item ajuda mais que praticar em blocos | Hedges g = 0,42 (IC95% 0,34–0,50); meta-análise | só snippet | Brunmair & Richter 2019 |
| Interferência contextual (motor) | Prática aleatória melhora retenção, sobretudo em adultos/idosos | efeito grande (idosos), médio (adultos), nulo (jovens); meta-análise | só snippet | Rodrigues et al. 2024, Sci Reports |
| Calibração (torneio GJP) | Treino de <1h melhora acurácia por anos | Brier 6–11% melhor que controle; 4 anos; RCT | página aberta | Chang, Chen, Mellers & Tetlock 2016 |
| Calibração (GJP, drivers) | Treino de probabilidade melhora calibração e resolução | Y1 F(2,1586)=14,29 p<0,001; ~1.593 participantes; RCT | página aberta | Mellers et al. 2014 |
| Calibração (laboratório) | Uma rodada de feedback já melhora calibração | escore de calibração .015→.005; 12 sujeitos; experimento | página aberta | Lichtenstein & Fischhoff 1980 |
| Calibração (previsão) | Prever eventos exige mais treino que perguntas de conhecimento | melhora entre 2ª e 3ª sessão; 55 previsões×4; experimento | só snippet (abstract) | Benson & Önkal 1992 |
| Calibração (app navegador) | App simples melhora calibração modestamente em <30 min | efeito "modesto", prova de conceito; N=153; RCT | só snippet (abstract) | Gruetzemacher, Lee & Paradice 2023/24 |
| Nº de itens (curva) | Curva/Brier com poucos itens é ruidosa; sem N mínimo canônico | trade-off viés/variância; heurística ≥10–20/faixa (não revisada) | só snippet | Tygert et al. 2022; docs scikit-learn |
| Ambiente ruidoso | Ambientes "wicked" ensinam lições erradas; tornar "kind" ajuda | revisão conceitual | só snippet | Hogarth, Lejarraga & Soyer 2015 |
| Intuição confiável | Intuição só é confiável em ambiente de alta validade com feedback rápido | colaboração adversarial | só snippet | Kahneman & Klein 2009 |
| Viés de resultado | Julga-se a decisão pelo resultado, não pela qualidade | d 0,77–1,1 (réplica N=692); d 0,21–0,53 (original N=20) | só snippet | Baron & Hershey 1988; réplica 2023 |
| Pré-mortem | Imaginar o fracasso já ocorrido gera ~30% mais razões | +30% razões corretas; experimento | só snippet | Mitchell, Russo & Pennington 1989 |
| Considerar o oposto | "Pense no contrário" reduz viés mais que "seja justo" | 2 experimentos; efeito corretivo maior | só snippet | Lord, Lepper & Preston 1984 |
| Frequências naturais | Reformular % como contagens melhora raciocínio bayesiano | respostas bayesianas de 16%→46% (média); experimento | só snippet | Gigerenzer & Hoffrage 1995 |
| Checklist (cirurgia) | Checklist reduziu complicações e mortes | complicações 11,0%→7,0%; mortes 1,5%→0,8%; 8 hospitais, ~7.688 pacientes | só snippet | Haynes et al. 2009 NEJM |
| Checklist (divergência) | Em Ontário não houve redução significativa | sem redução de mortalidade/complicações | só snippet | Urbach et al. 2014 NEJM |
| Debiasing por jogo | Um jogo único reduz vieses por ≥2 meses | jogos ≥ −23,57% aos 2 meses; longitudinal | só snippet | Morewedge et al. 2015 |
| Hubbard (trivia) | Alegação de transferência de trivia para qualquer estimativa | NÃO revisado por pares | NÃO VERIFICADO | Hubbard, *How to Measure Anything* |

---

## Glossário rápido (termos explicados na primeira aparição)

- **Sob risco / sob incerteza**: decidir sem saber o resultado; em "risco" as probabilidades são conhecidas, em "incerteza" não.
- **Tamanho de efeito (d de Cohen / Hedges g)**: número que diz o quanto um treino mudou o resultado, medido em "desvios-padrão". Regra de bolso: ~0,2 pequeno, ~0,5 médio, ~0,8 grande. Hedges g é o mesmo conceito com uma correção para amostras pequenas. **SMD** (standardized mean difference) é sinônimo.
- **Brier score (escore de Brier)**: mede a qualidade de uma probabilidade. Você diz "70%"; se o evento acontece conta como 1, se não, 0; o Brier é o quadrado da diferença. Vai de 0 (perfeito) a 1 (ou 2, dependendo da fórmula). Quanto **menor**, melhor.
- **Curva de calibração (diagrama de confiabilidade)**: gráfico que compara "quanta certeza você disse ter" (eixo horizontal) com "quantas vezes você acertou de fato" (eixo vertical). A linha perfeita é a diagonal. Pontos abaixo da diagonal = excesso de confiança.
- **Calibração / resolução**: calibração é dizer 70% e acertar 70% das vezes; resolução é a capacidade de separar o que vai acontecer do que não vai (dar probabilidades diferentes para casos diferentes).
- **Excesso de confiança (overconfidence)**: achar que sabe mais do que sabe.
- **Regra de pontuação própria (proper scoring rule)**: fórmula de nota (como o Brier) desenhada para que a melhor estratégia seja dizer honestamente o que você acredita — mentir sobre a própria confiança piora a nota.
- **Interleaving (prática intercalada) vs. blocked practice (prática em blocos)**: intercalar tipos diferentes de problema vs. repetir o mesmo tipo em bloco.
- **Interferência contextual**: a dificuldade extra criada ao misturar tarefas; atrapalha durante o treino mas ajuda a reter depois ("dificuldade desejável").
- **Viés de resultado (outcome bias) / "resulting"**: julgar a qualidade da decisão pelo resultado, mesmo quando o resultado dependeu de sorte.
- **Ambiente "kind" vs. "wicked" (Hogarth)**: ambiente "gentil" dá feedback rápido, claro e representativo; ambiente "traiçoeiro" dá feedback confuso, atrasado ou enganoso.
- **Feedback de resultado vs. de desempenho/cognitivo**: o primeiro só diz se acertou; o segundo mostra o padrão dos seus erros (ex.: sua curva de calibração) e como corrigir.

---

## 1. Ensino por cenários e simulação

**O que a pesquisa mediu.** Em medicina, a evidência mais forte é meta-analítica. McGaghie, Issenberg, Cohen, Barsuk & Wayne (2011, *Academic Medicine* 86(6):706–711) compararam simulação com prática deliberada contra o ensino clínico tradicional e acharam, em 14 de 3.742 artigos triados (1990–2010), tamanho de efeito **d = 0,71 (IC95% 0,65–0,76; P<0,001)** a favor da simulação (*página aberta via snippet do texto*). Em enfermagem, a meta-análise de Kim, Park & Shin (2016, *BMC Medical Education* 16:152), de 40 estudos, achou **SMD combinado (efeitos aleatórios) = 0,70**, com subgrupos de **0,86 (alta fidelidade), 1,03 (média fidelidade) e 0,86 (paciente padronizado)** (*só snippet*).

Um ponto crucial para leigos: **quase toda essa literatura mede aquisição de habilidade em ambiente de treino ou logo após**; a transferência comprovada para o desfecho real (o paciente) é menos comum e mais fraca — os próprios autores tratam desfecho de paciente como "o objetivo final" ainda em construção. **Lição para o curso:** simulação ensina o processo de decisão de forma robusta, mas provar que isso muda o comportamento na vida real (na sua conta, no seu dinheiro) exige medição própria — não se pode presumir.

**Quantos cenários, com que variação e em que ordem.** A evidência vem da ciência da aprendizagem, não do trading:

- **Intercalar (interleaving) em vez de agrupar (blocked).** A meta-análise de Brunmair & Richter (2019) achou vantagem média do interleaving de **Hedges g = 0,42 (IC95% 0,34–0,50)** (*só snippet*). Ressalva honesta: o mesmo estudo achou que para **listas de palavras** o bloco foi melhor (g = −0,39), e o efeito do interleaving é maior quando as categorias são **parecidas entre si** e o material é **mais complexo** — exatamente o caso de "cenários de decisão que se parecem, mas exigem escolhas diferentes".
- **Prática variável / aleatória melhora a retenção.** Na literatura motora, a prática aleatória (alta interferência contextual) piora o desempenho durante o treino mas melhora a retenção; a meta-análise de Rodrigues et al. (2024, *Scientific Reports*) achou efeito **grande em idosos, médio em adultos e praticamente nulo em jovens** (*só snippet*). **Divergência:** um estudo pré-registrado de shuffleboard não achou vantagem da prática variável (*só snippet*) — o efeito é real, mas não universal.
- **Implicação prática:** misturar os 12 cenários (não fazê-los sempre na mesma ordem nem agrupados por tipo) e variar os detalhes de superfície mantendo a estrutura de decisão tende a melhorar a transferência — ao custo de o aluno "sentir" que está indo pior durante o treino. Isso é esperado e chamado de "dificuldade desejável".

## 2. Calibração

### 2.1 Confirmação dos números do Good Judgment Project (GJP)

**Chang, Chen, Mellers & Tetlock (2016, *Judgment and Decision Making*, 11(5):509–526) — página aberta (PDF em goodjudgment.com).** Confirmado no texto:
- O treino de debiasing ("CHAMPS KNOW") **durava menos de uma hora** e **melhorou o Brier em 6 a 11% sobre o controle**, de forma consistente ao longo de **quatro anos**. Verbatim: *"Although the training lasted less than one hour, it consistently improved accuracy (Brier scores) by 6 to 11% over the control condition."*
- Por ano (Tabela 4, lida no texto): Ano 1 — treino de probabilidade **10%**, treino de cenários **11%** (N: controle 152, prob 119, cenário 113); Ano 2 — **12%** (controle 194, treino 205); Ano 3 — **6%** (controle 116, treino 97); Ano 4 — **7%** (controle 131, treino 102). Tipo de estudo: experimento com atribuição aleatória (RCT) dentro do torneio.
- **Persistência:** o efeito reaparece nos quatro anos; treino e prática deram contribuições largamente independentes. O princípio isolado mais associado à acurácia foi **usar classes de comparação / taxas de base** (a letra "C" de CHAMPS): 580 explicações com "C" tiveram Brier médio 0,17, contra 0,49 no grupo controle.
- **Transferência para outro domínio:** o desenho é multi-domínio (questões geopolíticas e econômicas variadas); os autores dizem que os efeitos são "estimativas de piso" (*"lower-bound estimates"*).

**Mellers et al. (2014, *Psychological Science*, 25(5):1106–1115) — página aberta (PDF).** Confirmado:
- Torneio de 2 anos; **Ano 1 começou com 2.246 participantes (1.593 de survey), Ano 2 com 1.648**; ~177 por condição; treino de ~45 min.
- Treino melhorou o Brier no Ano 1, **F(2,1586)=14,29, p<0,001** (probabilidade > cenário > sem treino); no Ano 2, **F(1,882)=19,12, p<0,001**.
- **Calibração** melhorou com treino no Ano 1 **F(2,1586)=3,16, p=0,04** e Ano 2 **F(1,938)=3,78, p<0,05**; a **resolução** também. Brier definido de 0 (melhor) a 2 (pior).
- Verbatim sobre persistência: *"a brief probabilistic training module paid off over an extended time"* — o módulo de ~45 min teve benefício ao longo de períodos de 8 a 10 meses.
- Superforecasters (top 2% do Ano 1) foram os mais bem calibrados (t(293)=11,03, p<0,001).

### 2.2 Lichtenstein & Fischhoff (1980, "Training for calibration") — página aberta (texto integral via Academia.edu)

- **Experimento 1:** 12 sujeitos, **11 sessões de 200 itens** de duas alternativas cada, com feedback detalhado. O escore médio de calibração caiu de **.015 (sessão 1) para .005 (sessão 11)**. Verbatim: *"almost all of which was accomplished after receipt of the first feedback"* — **quase todo o ganho apareceu já após o primeiro feedback** (CONFIRMADO no texto).
- **Experimento 2:** 12 sujeitos, **3 sessões**; escores médios .010, .005, .007; mesmo padrão (aprendizado entre sessões 1 e 2).
- **Generalização parcial (CONFIRMADO):** verbatim — *"There was modest generalization to several related probability assessment tasks, but no generalization at all to two others."* Melhorou nas tarefas de Formas (Shapes) e de 4 alternativas; **não** generalizou para caligrafia nem para quantidades incertas (fractis). Ou seja, generaliza quando o **modo de resposta** é parecido, e falha quando é diferente.
- **Cerca de 1/3 dos sujeitos já era bem calibrado antes do treino.**
- Sobre número de itens para uma medida estável: verbatim — *"our intuitive feeling... is that perfectly calibrated individuals will generally produce calibration scores of .007 or less with a sample of 200 responses"* — ou seja, **a própria medida de calibração precisa de muitas respostas (na casa das 200) para ser confiável**.

### 2.3 Quantas previsões são necessárias? 12 bastam?

**Resposta direta: 12 não bastam para medir calibração de forma estatisticamente significativa, e provavelmente não bastam para treiná-la de forma detectável.** Evidência:

- **Para medir** (curva/Brier): não existe um N mínimo canônico revisado por pares, mas a curva é dividida em faixas ("bins") de probabilidade; com poucos itens por faixa a estimativa é ruidosa. A literatura metodológica (Tygert et al. 2022, "Metrics of calibration", arXiv:2205.09680) enquadra isso como um **trade-off inevitável entre viés e variância** e recomenda métricas cumulativas sem bins (*só snippet*). A heurística de praticantes é **~10 faixas com ≥10–20 observações por faixa** (≈100–200+ no total; a documentação do scikit-learn diz que "mais bins exigem mais dados"), mas isso **não é revisado por pares** (documentação de software). Com 12 itens, você teria ~1 observação por faixa — **sem sentido estatístico** para uma curva.
- **Para treinar** de forma detectável: Lichtenstein & Fischhoff obtiveram ganho já após **200 itens** (uma sessão). Benson & Önkal (1992) usaram **55 previsões × 4 sessões = 220 previsões** e a melhora só apareceu **entre a 2ª e a 3ª sessão** — e concluíram que **prever eventos exige mais treino do que responder perguntas de conhecimento** (*só snippet/abstract*). Gruetzemacher, Lee & Paradice (2023/24) obtiveram efeito **modesto** ("prova de conceito") com **60 vs. 120 questões** de treino em <30 min, N=153, seguido de 52 previsões reais; o grupo de 120 foi melhor, mas os autores atribuem isso à **ordem de dificuldade** (10 questões difíceis após as 60 primeiras), não ao número em si (*só snippet/abstract*).
- **O que fazer com 12 cenários:** (a) **repetir com variação** (mudar detalhes de superfície mantendo a estrutura), (b) **gerar dezenas de itens curtos de previsão** dentro de cada cenário (várias micro-previsões por cenário — "qual a probabilidade de este sinal ser dos que sobem?", "qual a probabilidade de gatilho de stop nas próximas N velas?"), mirando **pelo menos ~50 previsões com feedback** para começar a treinar e idealmente **100+** antes de mostrar uma curva de calibração ao aluno. Os doze cenários servem como espinha dorsal narrativa; a calibração precisa de muitos mais pontos de previsão.

### 2.4 Treino de calibração em ambiente ruidoso (memecoin) e feito no navegador

- **Dá para treinar no navegador?** Sim, com ressalvas. Gruetzemacher et al. usaram um app interativo simples baseado em navegador e obtiveram efeito modesto (*só snippet*). Stone et al. (2023, *J. Behavioral Decision Making* 36(4)) automatizaram o feedback individualizado de Lichtenstein & Fischhoff e reduziram o excesso de confiança numa tarefa controlada (blackjack), mas **não** numa tarefa mais realista e ruidosa (beisebol) (*Scholar Gateway*). **Lição:** o navegador funciona; o ruído do domínio é o inimigo.
- **O problema do ruído.** Hogarth, Lejarraga & Soyer (2015, *Current Directions in Psychological Science* 24(5):379–385) distinguem ambientes **"kind"** (feedback rápido, claro, representativo) de **"wicked"** (feedback confuso/atrasado/enganoso). Memecoin é um ambiente "wicked": a decisão boa pode dar resultado ruim e vice-versa. Kahneman & Klein (2009, *American Psychologist* 64(6):515–526) reforçam: a intuição só se torna confiável em **ambiente de alta validade com oportunidade de aprender via feedback rápido e inequívoco** — condição que o mercado de memecoin **não** satisfaz (*ambos só snippet*).
- **Como dar feedback sem ensinar errado:** (1) pontuar a **probabilidade contra a verdade do cenário** com uma regra própria (Brier), separada de qualquer "lucro"; (2) dar feedback sobre a **qualidade da decisão / do processo**, não sobre o resultado (contra o viés de resultado de Baron & Hershey); (3) quando quiser mostrar consequência, **sortear o resultado de uma distribuição e repetir muitas vezes**, para o aluno ver que a mesma boa decisão às vezes perde; (4) **agregar sobre muitos casos** — julgar o padrão, não o caso isolado. Isso equivale a **tornar o ambiente "kind"** dentro do simulador.

## 3. Técnicas de decisão com evidência

- **Pré-mortem / hindsight prospectivo.** Mitchell, Russo & Pennington (1989, *J. Behavioral Decision Making* 2(1):25–38) mostraram que imaginar que um evento **já ocorreu** aumenta em **~30%** o número de razões corretas geradas para o desfecho — verbatim, *"increases the number of reasons generated for the potential future outcome by approximately 30%"* (*só snippet*). Klein transformou isso na técnica do pré-mortem ("imagine que o plano já fracassou; por quê?"). Ressalva: o estudo original observou que essas razões extras tendem a ser menos preditivas — a técnica gera mais hipóteses, não necessariamente melhores. Útil no checklist pré-compra para legitimar a dúvida.
- **Considerar o oposto.** Lord, Lepper & Preston (1984, *J. Personality and Social Psychology* 47:1231–1243) acharam, em dois experimentos, que instruir a pessoa a **"considerar o oposto"** reduz o viés mais do que pedir para "ser justo e imparcial" (*só snippet*).
- **Taxa de base / frequências naturais.** Gigerenzer & Hoffrage (1995, *Psychological Review* 102(4):684–704) mostraram que reformular probabilidades como **contagens naturais** ("10 em 1.000" em vez de "1%") aumenta o raciocínio bayesiano correto — em média de **16% para 46%** de respostas bayesianas ao mudar o formato (*só snippet*). Aplicável a "de cada 100 tokens com este sinal, quantos historicamente...".
- **Checklists.** Haynes et al. (2009, *NEJM* 360:491–499) associaram um checklist cirúrgico de 19 itens a queda de complicações de **11,0%→7,0% (P<0,001)** e de mortes de **1,5%→0,8% (P=0,003)**, comparando ~3.733 pacientes basais com ~3.955 pós-checklist em 8 hospitais (*só snippet*). **Divergência importante:** Urbach et al. (2014, *NEJM*) **não** acharam redução significativa em Ontário (*só snippet*) — o checklist ajuda a lembrar o passo certo na hora certa, mas não é mágica e depende fortemente da implementação e da adesão real.
- **Debiasing por jogo.** Morewedge et al. (2015, *Policy Insights BBS* 2(1):129–140) mostraram que **um único** jogo de treino reduziu vieses (viés de confirmação, ponto cego de viés, atribuição fundamental) com efeitos que **persistiram ≥2 meses** (jogos ≥ −23,57% de redução de viés aos 2 meses; vídeos ≥ −19,20%), e de forma **generalizável entre contextos** (*só snippet*). O jogo (com feedback personalizado e prática) superou o vídeo.
- **Aprender com resultado ruidoso.** Hogarth et al. (2015) e Kahneman & Klein (2009), já citados: em ambiente "wicked", a experiência ensina lições erradas; a saída é a reengenharia do feedback (tornar "kind"), não "mais experiência".

## 4. Melhorias propostas para o simulador e o checklist (cada uma com a evidência)

1. **Adicionar um pedido de probabilidade em cada cenário.** Antes de escolher (entrar/esperar/sair/não operar), o aluno declara uma probabilidade numérica (ex.: "qual a chance de este cenário ser dos que sobem?"). *Evidência:* todo o programa do GJP baseia-se em elicitar e pontuar probabilidade; treino curto melhorou o Brier em 6–11% (Chang 2016, *página aberta*) e a calibração/resolução (Mellers 2014, *página aberta*). **Sem promessa de lucro** — o objetivo é a honestidade da incerteza.
2. **Calcular e mostrar Brier e curva de calibração no navegador.** Brier por item = (p − resultado)²; média ao longo dos itens. Curva: agrupar previsões em ~5–10 faixas e plotar "% de acerto real" vs. "confiança média declarada". *Evidência:* Lichtenstein & Fischhoff (1980, *página aberta*) mostram que o **feedback de desempenho com a própria curva** é o ingrediente ativo; Stone et al. (2023) automatizaram isso. **Aviso de leitura embutido no produto:** só exibir a curva quando houver itens suficientes (mirar ≥50–100 previsões), pois com poucos itens ela é ruidosa (Tygert 2022; docs scikit-learn, *só snippet*). Exiba também, em linguagem simples, "excesso de confiança = seus 90% valeram só X% na prática".
3. **Estruturar o feedback separando qualidade da decisão do resultado.** Duas notas distintas e visualmente separadas: (a) qualidade do processo (seguiu a regra escrita? considerou a taxa de base? fez o pré-mortem?), (b) calibração da probabilidade (Brier contra a "verdade" do cenário) — e **nunca** premiar/punir pelo P&L simulado. *Evidência:* viés de resultado (Baron & Hershey 1988; réplica com d 0,77–1,1, N=692) e ambientes "wicked" (Hogarth 2015). Isso é exatamente o que o seu "resumo de disciplina" atual já tenta fazer — reforce-o e torne-o o placar principal.
4. **Resolver o "12 cenários bastam?".** Não bastam para calibração. Manter os 12 como narrativa, mas (a) gerar **múltiplas micro-previsões por cenário**, (b) **repetir cenários com variação** de superfície, e (c) mirar **≥50 previsões com feedback** para efeito detectável e **100+** antes de exibir a curva. *Evidência:* L&F 1980 (ganho após ~200 itens); Benson & Önkal 1992 (previsão exige mais que conhecimento; melhora entre 2ª e 3ª sessão de 55 itens); Gruetzemacher 2023/24 (60 vs 120; a ordem de dificuldade importa).
5. **Ordenar/misturar os cenários (interleaving + dificuldade crescente com "picos" difíceis).** Não apresentar sempre na mesma ordem nem agrupados por tipo; intercalar tipos e inserir alguns itens difíceis cedo. *Evidência:* Brunmair & Richter 2019 (g=0,42); interferência contextual (Rodrigues 2024); Gruetzemacher (ganho atribuído à ordem de dificuldade). Avisar o aluno que "sentir-se pior" durante o treino é esperado (dificuldade desejável).
6. **Resultado sorteado e repetido.** Quando mostrar consequência, sortear de uma distribuição e repetir o mesmo cenário várias vezes, para o aluno ver a boa decisão perdendo às vezes e a má decisão ganhando por sorte. *Evidência:* tornar o ambiente "kind" (Hogarth 2015); condições para intuição confiável (Kahneman & Klein 2009).
7. **Enriquecer o checklist pré-compra com técnicas testadas:** um item de **pré-mortem** ("imagine que esta operação já deu errado; liste 3 razões"), um item de **considerar o oposto** ("qual é o melhor argumento de que estou errado?"), e um item de **taxa de base em frequência natural** ("de cada 100 situações como esta, em quantas isto costuma dar certo?"). *Evidência:* Mitchell/Russo/Pennington 1989 (+30% razões); Lord/Lepper/Preston 1984; Gigerenzer & Hoffrage 1995 (16%→46%). Manter o checklist **curto** — o valor está em lembrar no momento certo (Haynes 2009), mas a eficácia depende da implementação real (Urbach 2014).
8. **Considerar um mini-jogo de debiasing único** com feedback personalizado, focado em viés de confirmação (o mais perigoso para quem "se apaixona" por uma tese). *Evidência:* Morewedge 2015 (efeito persistente ≥2 meses, generalizável entre contextos).

**Meça o seu próprio efeito.** Como toda a evidência acima vem de outros domínios, a única forma honesta de saber se o seu curso funciona é instrumentar o simulador: registrar o Brier do aluno ao longo do tempo, a evolução do excesso de confiança e a adesão ao checklist — e comparar início vs. fim. Não prometa transferência para "ganhar dinheiro"; meça transferência para "decidir com disciplina e calibração".

## 5. NÃO VERIFICADOS (lista explícita do que não fechou)

- **"6–11% de melhora no Brier":** **VERIFICADO** no texto (Chang et al. 2016, *página aberta*). A faixa da resposta preliminar é confirmada.
- **"Quase todo o ganho nas primeiras rodadas de feedback" (L&F 1980):** **VERIFICADO** no texto (*página aberta*).
- **"Generalização parcial para outras tarefas" (L&F 1980):** **VERIFICADO** no texto — generaliza para modo de resposta similar (Formas, 4 alternativas); falha para caligrafia e quantidades incertas.
- **Calibração é específica de domínio (meteorologistas bem calibrados no próprio domínio):** sustentada por fontes revisadas por pares citando Murphy & Winkler (1977); confirmada como **citação secundária** em Stone et al. 2023 e Kelly & Mandel 2024 (*Scholar Gateway*). **Não** li Murphy & Winkler no original — status: **parcialmente verificado (secundário)**.
- **Alegação de Hubbard (treino com trivia transfere para qualquer estimativa):** **NÃO VERIFICADO / não revisado por pares.** É livro comercial (*How to Measure Anything*); os próprios dados de Hubbard não são de ensaio controlado publicado. Trate como marketing, não como evidência.
- **N de participantes de Benson & Önkal 1992:** não lido no texto (só abstract). L&F 1980 confirmado (12 + 12 sujeitos, *página aberta*).
- **Número mínimo de itens para curva de calibração ter sentido estatístico:** **sem valor canônico revisado por pares**; a heurística ≥10–20 por faixa vem de documentação de software (não revisada por pares); Tygert et al. 2022 trata como trade-off viés/variância, não como limiar fixo.
- **Tamanhos de efeito de simulação (0,71; 0,70):** confirmados via snippets de meta-análises e via enriquecimento com citação verbatim, mas **não abri o texto integral** de McGaghie 2011 nem de Kim 2016.
- **Efeitos exatos de Benson & Önkal e Gruetzemacher:** baseados em abstract/citações, não no texto integral (bloqueio de acesso).

## 6. Fontes (data de consulta 13/09/2026; marcação por fonte)

1. Mellers et al. 2014, *Psychological Science* 25(5):1106–1115 — **página aberta** (PDF sydneyscott.nfshost.com / houdekpetr.cz). DOI 10.1177/0956797614524255
2. Chang, Chen, Mellers & Tetlock 2016, *Judgment and Decision Making* 11(5):509–526 — **página aberta** (PDF goodjudgment.com).
3. Lichtenstein & Fischhoff 1980, *Organizational Behavior and Human Performance* 26(2):149–171 — **página aberta** (texto integral Academia.edu). DOI 10.1016/0030-5073(80)90052-5
4. Benson & Önkal 1992, *Int. J. Forecasting* 8(4):559–573 — **só snippet** (abstract ScienceDirect). DOI 10.1016/0169-2070(92)90066-I
5. Gruetzemacher, Lee & Paradice 2023/24, *Futures & Foresight Science* 6(2):e177 — **só snippet** (abstract Wiley / Scholar Gateway). DOI 10.1002/ffo2.177
6. Stone, Luu, Costello & Somerville 2023, *J. Behavioral Decision Making* 36(4) — **só snippet** (Scholar Gateway). DOI 10.1002/bdm.2334
7. Martin & Mandel 2024, *Futures & Foresight Science* 7(1) — **só snippet** (Scholar Gateway). DOI 10.1002/ffo2.199
8. Kelly & Mandel 2024, *Applied Cognitive Psychology* 38(5) — **só snippet** (Scholar Gateway). DOI 10.1002/acp.4236
9. McGaghie, Issenberg, Cohen, Barsuk & Wayne 2011, *Academic Medicine* 86(6):706–711 — **só snippet**. DOI 10.1097/ACM.0b013e318217e119
10. Kim, Park & Shin 2016, *BMC Medical Education* 16:152 (simulação em enfermagem) — **só snippet** (PMC4877810).
11. Brunmair & Richter 2019, meta-análise de interleaving — **só snippet** (PDF Uni-Würzburg).
12. Rodrigues et al. 2024, *Scientific Reports*, interferência contextual — **só snippet**.
13. Morewedge et al. 2015, *Policy Insights from the Behavioral and Brain Sciences* 2(1):129–140 — **só snippet**. DOI 10.1177/2372732215600886
14. Mitchell, Russo & Pennington 1989, *J. Behavioral Decision Making* 2(1):25–38 — **só snippet**. DOI 10.1002/bdm.3960020103
15. Lord, Lepper & Preston 1984, *J. Personality and Social Psychology* 47:1231–1243 — **só snippet**.
16. Gigerenzer & Hoffrage 1995, *Psychological Review* 102(4):684–704 — **só snippet**.
17. Haynes et al. 2009, *NEJM* 360:491–499 — **só snippet**. DOI 10.1056/NEJMsa0810119
18. Urbach et al. 2014, *NEJM* — **só snippet**. DOI 10.1056/NEJMsa1308261
19. Hogarth, Lejarraga & Soyer 2015, *Current Directions in Psychological Science* 24(5):379–385 — **só snippet**.
20. Kahneman & Klein 2009, *American Psychologist* 64(6):515–526 — **só snippet**. DOI 10.1037/a0016755
21. Baron & Hershey 1988 + réplica Aiyer et al. 2023, *Int. Review of Social Psychology* — **só snippet**. DOI 10.5334/irsp.751
22. Tygert et al. 2022, "Metrics of calibration for probabilistic predictions", arXiv:2205.09680; documentação scikit-learn (calibração) — **só snippet**.
23. Hubbard, *How to Measure Anything* — **NÃO revisado por pares**.

## Consultas realizadas
1. training practice calibration accuracy geopolitical forecasting Brier (Scholar Gateway)
2. training for calibration subjective probability feedback (Scholar Gateway)
3. Mellers 2014 psychological strategies geopolitical tournament Brier
4. Chang Chen Mellers Tetlock 2016 developing expert political judgment
5. Lichtenstein Fischhoff 1980 training for calibration
6. simulation-based medical education meta-analysis effect size
7. interleaving vs blocked practice meta-analysis effect size
8. Morewedge 2015 debiasing training game persistence effect size
9. Mitchell Russo Pennington 1989 prospective hindsight premortem
10. Hogarth Lejarraga Soyer 2015 kind wicked learning environments
11. Haynes 2009 NEJM surgical safety checklist mortality
12. Lord Lepper Preston 1984 consider the opposite
13. Gigerenzer Hoffrage 1995 natural frequencies Bayesian reasoning
14. Kahneman Klein 2009 conditions intuitive expertise
15. Baron Hershey 1988 outcome bias decision quality
16. Hubbard How to Measure Anything calibration trivia transfer
17. number of items reliable calibration curve Brier few observations
18. Benson Onkal 1992 feedback training probability forecasters
19. Gruetzemacher 2023 calibration app 30 minutes generalize
20. variability of practice motor learning transfer meta-analysis
21. (subagente) número mínimo de itens para curva de calibração + melhora detectável

---
*Nota final de escopo e ética: este documento resume evidência sobre como se ensina a decidir sob incerteza e a calibrar probabilidades. Nenhum estudo aqui mostra que esse treino aumenta retorno financeiro em trading de memecoins — um ambiente de baixa validade e alto ruído onde a boa decisão frequentemente dá resultado ruim. O uso apropriado desta pesquisa é melhorar a disciplina e a honestidade da incerteza do aluno, e medir esse ganho diretamente no simulador — não prometer ganhos.*