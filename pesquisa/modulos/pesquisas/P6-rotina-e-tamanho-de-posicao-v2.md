# Levantamento: o que sustenta uma ROTINA de operação — registro, revisão periódica e regra de tamanho de posição em ativos de cauda pesada

**Data de consulta de TODAS as fontes: 12/09/2026.** Escrito em português do Brasil, para leigo em estatística. Não recomenda quanto investir — só a matemática das regras.

Convenções de status usadas o tempo todo: **[revisado por pares]** / **[livro acadêmico]** / **[preprint]** / **[livro de mercado]** / **[blog de plataforma]** / **[folclore]** / **[documento de regulador]**. E marcação de acesso: **(página aberta)** = abri o texto/PDF; **(só snippet)** = vi apenas o resultado de busca/abstract.

---

## TL;DR (resposta direta em 3 pontos)

- **NÃO existe estudo revisado por pares mostrando que "manter diário de operações faz ganhar dinheiro".** Isso é folclore de mercado. O que existe, com fonte forte, é evidência de que **monitorar o próprio progresso ajuda a cumprir metas de comportamento** (Harkin et al. 2016, meta-análise de 138 estudos, d+ = 0,40). Traduzido para o seu caso: *"o registro ajuda você a seguir a sua própria regra"* tem lastro; *"o registro faz você ganhar dinheiro"* **não tem** — é "não medido".
- **A fração fixa e o critério de Kelly dependem de média e variância finitas.** Em memecoin, cuja variância (e possivelmente a média) não é definida — na linha de Grobys & Shahzad (2025) —, a fórmula de Kelly **quebra literalmente** (f* = μ/σ² não existe se σ² é infinita). A literatura acadêmica **NÃO resolve** o dimensionamento ótimo de crescimento para cauda muito pesada; o que resta com fundamento é o argumento de **sobrevivência / ruína do apostador** e a "regra do zero".
- **Se a média não é definida (índice de cauda α ≤ 1), NENHUM tamanho de amostra distingue habilidade de sorte pela média** — a média amostral nunca converge. Mesmo no regime "bem-comportado", são necessárias centenas a milhares de operações. As estatísticas de trading que circulam ("23% em 60 dias", "estudo da Universidade da Califórnia / 73%") são **inventadas ou distorcidas** e viram catálogo de exemplos negativos no seu curso.

---

## KEY FINDINGS (o essencial, com o veredito)

1. **Diário → cumprir a própria regra: SUSTENTADO** (evidência adjacente robusta, Harkin 2016). **Diário → ganhar dinheiro: NÃO MEDIDO** (confirmado por varredura no Scholar Gateway).
2. **Traders aprendem com a experiência, mas devagar, de forma custosa e incompleta** (Seru et al. 2010; Feng & Seasholes 2005 mostram redução do disposition effect; Barber et al. 2014 mostram que a maioria continua perdendo). Não sustenta "com prática você fica lucrativo".
3. **O desenho do diário importa**: Harkin acha efeitos MAIORES quando o resultado é registrado fisicamente e reportado/tornado público. Harkin **não** trata de "antes x depois do fato".
4. **Kelly quebra sob cauda pesada** por razão matemática simples: precisa de μ e σ² finitos. Bamberg & Neuhierl (2012) mostram que a fração ótima é **menor** quanto mais pesada a cauda; no limite de σ² infinita, tende a zero.
5. **Sobrevivência primeiro**: gambler's ruin (Feller) formaliza que, em jogo desfavorável repetido, a ruína é praticamente certa. Esse é o fundamento publicado mais próximo da "regra do zero".
6. **Pré-compromisso funciona, mas falha com frequência** (Ashraf/Karlan/Yin 2006; John 2020). **Stop-loss automático reduz o disposition effect**; lembrete não (Fischbacher, Hoffmann & Schudy 2017).
7. **Olhar o resultado com mais frequência piora a decisão sob risco** (myopic loss aversion: Benartzi & Thaler 1995; Gneezy & Potters 1997). Cadência ótima de revisão de PROCESSO para trader **nunca foi medida**.
8. **As "estatísticas de diário" que circulam são folclore**; os dados reais existentes (ESMA sobre CFDs; Chague et al. sobre a B3; Barber & Odean/Barber et al. sobre EUA e Taiwan) dizem outra coisa — a maioria perde.

---

## DETALHES

## (1) Registro de operações: o que tem lastro e o que é folclore

### 1.1 As duas frases lado a lado (exigência do usuário)

> **FRASE A — SUSTENTADA:** *"O registro ajuda você a SEGUIR A SUA PRÓPRIA REGRA."*
> Lastro: Harkin, B., Webb, T. L., Chang, B. P. I., Prestwich, A., Conner, M., Kellar, I., Benn, Y. & Sheeran, P. (2016), *"Does Monitoring Goal Progress Promote Goal Attainment? A Meta-Analysis of the Experimental Evidence"*, **Psychological Bulletin, 142(2), 198–229**, DOI 10.1037/bul0000025. **[revisado por pares]**. Meta-análise de 138 estudos randomizados (N = 19.951). Resultado verbatim: *"A random effects model revealed that, on average, interventions were successful at increasing the frequency of monitoring goal progress (d+ = 1.98, 95% CI [1.71, 2.24]) and promoted goal attainment (d+ = 0.40, 95% CI [0.32, 0.48])."* **(página aberta — abstract do repositório institucional White Rose, versão do autor)**. As metas eram majoritariamente de saúde (perda de peso, parar de fumar, atividade física, adesão a medicação, gestão de tempo). **Nada envolve resultado financeiro em ativo de cauda pesada.**

> **FRASE B — NÃO SUSTENTADA:** *"O registro faz você GANHAR DINHEIRO."*
> Status: **NÃO MEDIDO.** Nenhum estudo revisado por pares testa diretamente "manter diário de operações → melhora o retorno financeiro". Confirmado por varredura no Scholar Gateway (várias consultas — ver seção 10). O que existe é evidência ADJACENTE (Harkin, acima) sobre metas de comportamento, e evidência de finanças sobre aprendizado (abaixo), que **não** chega a "ganhar dinheiro".

**Por que a separação importa (para o módulo não mentir):** Harkin mede se a pessoa **executa o comportamento que planejou** (comer menos, andar mais, tomar o remédio). Traduzido, isso sustenta *"escrever e monitorar a regra aumenta a chance de você de fato seguir a regra"*. **Não** mede se o comportamento planejado é lucrativo. Se a sua regra for ruim, o diário te ajuda a executar uma regra ruim com mais fidelidade. O diário melhora a **aderência**, não o **edge**.

**Termos explicados na primeira aparição:**
- **Meta-análise**: técnica que combina os resultados de muitos estudos separados num único número-resumo.
- **Tamanho de efeito (d, "d de Cohen")**: mede o tamanho da diferença entre dois grupos em desvios-padrão, independente da unidade. É diferente de "significância" (que só diz se o efeito provavelmente não é zero).
- **Intervalo de confiança (IC 95%)**: faixa em que o valor verdadeiro provavelmente está; se não inclui zero, o efeito é estatisticamente detectável.
- **Moderador**: uma característica do estudo que muda o tamanho do efeito (ex.: registrar no papel vs. não).

### 1.2 O "não medido" confirmado, e o que a literatura de finanças permite dizer a mais

A pergunta correta subjacente é: **traders aprendem com a experiência?** A resposta honesta da literatura é "**um pouco, devagar, de forma custosa, e a maioria continua perdendo**":

- **Seru, A., Shumway, T. & Stoffman, N. (2010), "Learning by Trading", Review of Financial Studies** — citado consistentemente (via Kano et al. 2025 e Gathergood et al. 2023, ambos [revisado por pares], **página aberta**): à medida que negociam mais, os investidores aprendem e o disposition effect diminui. **Porém**, os menos hábeis "aprendem" é a sair do mercado (efeito de seleção, Linnainmaa via Kaustia & Knüpfer 2008).
- **Feng, L. & Seasholes, S. (2005)** e **Dhar & Zhu (2006)**: experiência atenua vieses (via Jugnandan & Willows 2023, **[revisado por pares], página aberta**).
- **Mahani, R. & Bernhardt, D. (2007), "Financial Speculators' Underperformance", The Journal of Finance, 62(3), 1313–1340** **[revisado por pares], (página aberta)**: modelo em que a maioria dos especuladores perde, os novatos começam pequeno, e os que perdem cessam. *"most individual speculators lose money."*
- **Kaustia, M. & Knüpfer, S. (2008), "Do Investors Overweight Personal Experience? Evidence from IPO Subscriptions", The Journal of Finance, 63(6)** **[revisado por pares], (página aberta)**: aprendizado por reforço enviesado — o investidor superpondera a experiência pessoal recente, o que pode piorar decisões.
- **CONTRA-EVIDÊNCIA a "aprender ajuda": Barber, B., Lee, Y.-T., Liu, Y.-J. & Odean, T. (2014), "The Cross-Section of Speculator Skill: Evidence from Day Trading", Journal of Financial Markets, 18, 1–24** (Taiwan, 1992–2006) **[revisado por pares], (página aberta)**. Verbatim: *"Less than 1% of the day trader population is able to predictably and reliably earn positive abnormal returns net of fees."* E, na versão "Learning, Fast or Slow", os autores concluem que o aprendizado, quando existe, é *"slow, suboptimal, and costly"*, e que os traders mais experientes ainda perdem.

**Limite escrito:** a literatura permite dizer *"há alguma evidência de que a experiência reduz certos vieses (ex.: disposition effect)"*. Ela **NÃO** permite dizer *"com prática/registro você fica lucrativo"* — especialmente em ativo de cauda pesada, onde nem os day traders profissionais de mercados líquidos conseguem, em geral.

### 1.3 Mecanismos da psicologia da decisão (por que registrar pode ajudar, e por que a memória atrapalha)

- **Condições para aprender com a experiência**: Kahneman, D. & Klein, G. (2009) — expertise genuína exige (a) um **ambiente regular** (regularidades estáveis) e (b) **feedback rápido e claro**. Hogarth distingue **"kind" vs. "wicked" learning environments**. **Memecoin é um ambiente "wicked"**: feedback ruidoso, regularidades instáveis, cauda pesada. Isso prevê que a experiência crua ensina pouco ou ensina a coisa errada. (Marco conceitual clássico; **não reaberto agora — ver NÃO VERIFICADOS**.)
- **Vieses ao revisar o próprio histórico** (todos abaixo aparecem também na seção 4.3, com fonte):
  - **Hindsight bias** ("eu sabia") — Fischhoff 1975.
  - **Self-attribution bias** (atribuir ganho à habilidade, perda ao azar) — Gervais & Odean 2001; Miller & Ross 1975.
  - **Outcome bias** (julgar a decisão pelo resultado) — Baron & Hershey 1988.
  - **Illusion of control** — Langer 1975.
  - **Detecção de padrão em ruído / "hot hand"** — Gilovich, Vallone & Tversky 1985; correção de viés por Miller & Sanjurjo 2018.

O valor de escrever a tese **antes** de saber o resultado é anular hindsight bias e self-attribution: o registro guarda o que você **realmente** pensou, não o que a memória reescreve depois (mecanismo reconhecido nos próprios blogs de plataforma, mas cujo teste financeiro direto não existe na literatura revisada).

### 1.4 Campos que o registro precisa ter para virar DADO (não só diário)

Fundamentado em: (a) pré-registro/hipótese antes (Gollwitzer & Sheeran 2006, implementation intentions; prática de pré-registro AsPredicted/OSF/Registered Reports já estabelecida na sua pesquisa anterior); (b) distinção de Harkin entre monitorar **comportamento** vs. **resultado**; (c) distinção decisão boa vs. resultado bom (análise de decisão / "resulting" — Annie Duke é **[livro de mercado]**, marcar como tal); (d) evidência de que a saída EXECUTADA (não a intenção de saída) é o que corrige viés — Fischbacher, Hoffmann & Schudy (2017): o que reduz o disposition effect é o dispositivo automático de saída, não o lembrete.

Campos mínimos para medir as próprias decisões depois (9 campos):
1. **A regra escrita ANTES da entrada** (o gatilho pré-definido) — sem isto, não há como separar decisão de resultado.
2. Data/hora; ativo; **tamanho da posição em % do capital**.
3. Preço de entrada; **stop pré-definido** (nível e regra de saída); alvo, se houver.
4. **Tese/razão** da entrada (texto curto) — congela a narrativa antes do resultado.
5. **Nível de convicção** (escala fixa, ex. 1–5).
6. **Estado emocional** no momento da entrada.
7. **Saída executada** (data/hora, preço, e o gatilho real: stop, alvo, discricionária ou por tempo) — campo de COMPORTAMENTO. Sem este campo, "segui a regra?" (item 8) vira autorrelato de memória, exatamente o que hindsight bias e self-attribution bias corrompem (seção 4.3). É o "então" do plano se-então (Gollwitzer & Sheeran 2006) e o análogo de executar o plano pré-registrado como escrito, não como a memória reconstrói depois. Também é o campo que Fischbacher, Hoffmann & Schudy (2017) mostram ser o que de fato corrige o disposition effect — a execução, não a intenção.
8. **"Segui a regra?" (on-plan / off-plan)** — derivado comparando o plano (itens 1 e 3) com a execução real (item 7), não julgado de memória. Este é o campo de COMPORTAMENTO que Harkin sustenta monitorar.
9. **Resultado** (P&L) — campo de RESULTADO, a ser olhado com menos frequência (ver seção 4.2).

A chave metodológica: registre o **comportamento** (itens 1–3, 7, 8) separado do **resultado** (item 9), porque só o comportamento está sob seu controle e só o comportamento tem lastro em Harkin. O item 7 (saída executada) é o que torna o item 8 verificável em vez de autorrelatado.

---

## (2) O "como" do diário, a partir de Harkin 2016 e adjacentes

### 2.1 Moderadores confirmados (o desenho que funciona melhor)

Do abstract da versão do autor (White Rose, **página aberta**), verbatim: *"Moderation tests revealed that progress monitoring had larger effects on goal attainment when the outcomes were reported or made public, and when the information was physically recorded."*

Portanto, com lastro:
- **Registro físico** (escrever/registrar, não só "conferir de cabeça") → efeito maior.
- **Reportar/tornar público** (mostrar a alguém, ou registrar de forma verificável) → efeito maior.
- **Frequência de monitoramento**: a intervenção aumentou muito a frequência de monitorar (**d+ = 1,98**) e essa mudança **mediou** o efeito no comportamento (d+ = 0,40). Ou seja: o mecanismo é *aumentar a frequência com que você confere seu progresso versus a regra*. Isso apoia **registrar toda operação**, não amostrar.
- **Casar o foco com o objetivo**: monitorar o **comportamento** quando o objetivo é mudar comportamento; monitorar o **resultado** quando o objetivo é mudar resultado (via Sheeran & Webb 2016 e Simonson 2020, ambos **[revisado por pares], página aberta**, resumindo Harkin).

### 2.2 O que Harkin NÃO responde (dito com todas as letras)

- **Antes x depois do fato (timing do registro)**: Harkin **não trata** disso. A meta-análise é sobre *monitorar progresso*, não sobre *escrever a hipótese antes de ver o resultado*. Para "escrever antes", o lastro vem de outra literatura:
  - **Gollwitzer, P. M. & Sheeran, P. (2006), implementation intentions** ("planos se-então"): formar o plano *antes* aumenta a execução; via Sheeran & Webb (2016), **[revisado por pares], página aberta**: *"forming if-then plans can promote the initiation, maintenance, and successful closure of goal pursuit."*
  - **Pré-registro** (AsPredicted/OSF/Registered Reports): a hipótese e o plano de análise escritos antes de ver os dados — já estabelecido na sua pesquisa anterior.
- **Frequência ótima numérica** (diária? semanal?): Harkin mostra que "mais monitoramento → mais efeito", mas **não** define uma cadência ótima, nem para trading. (Ver a tensão com myopic loss aversion na seção 4.2.)

### 2.3 Traduzir d+ = 0,40 para linguagem concreta (com a conta mostrada e fonte por conversão)

Um tamanho de efeito de 0,40 significa que o grupo que monitorou ficou, em média, **0,40 desvio-padrão** melhor que o grupo que não monitorou. Três traduções, cada uma com a conta:

1. **Régua de Cohen (1988)** **[livro acadêmico]**: 0,2 = pequeno, 0,5 = médio, 0,8 = grande. Logo **0,40 é "pequeno a médio"** — real e útil, mas longe de "transformador".
2. **Probabilidade de superioridade / common language effect size (McGraw & Wong 1992)**: probabilidade de que uma pessoa sorteada do grupo tratado esteja melhor que uma sorteada do controle = Φ(d/√2). Conta: Φ(0,40/1,414) = Φ(0,283) ≈ **0,61 (61%)**. Em português claro: se você pegar ao acaso uma pessoa que monitorou e uma que não, há **~61% de chance** de a que monitorou estar melhor (contra 50% se não houvesse efeito).
3. **U3 de Cohen (1988)**: fração do grupo controle que a pessoa MEDIANA do grupo tratado supera = Φ(d) = Φ(0,40) ≈ **0,655 (66%)**. Ou seja, quem monitorou, na mediana, sai melhor que **66%** de quem não monitorou.

Comparação de referência: **0,40 é da ordem de grandeza típica de intervenções comportamentais bem-sucedidas** (a própria meta-análise trata de perda de peso, cessação de tabagismo etc.). É um efeito digno de construir uma rotina em cima — desde que você lembre que ele mede **fazer o que você planejou**, não **ganhar dinheiro**.

---

## (3) Tamanho de posição sob cauda pesada

### 3.1 Fração fixa (o que é e por que é o padrão)

**Fração fixa** = arriscar sempre a **mesma porcentagem** do capital atual em cada operação (ex.: sempre 1% do que você tem hoje). Duas propriedades a tornam o padrão:
- **Nunca zera a banca com uma única perda** (você arrisca uma fração, não tudo).
- **Escala com o capital**: cresce as apostas quando ganha, encolhe quando perde, automaticamente.

O tratamento popular (Ralph Vince, "position sizing"/"optimal f") é **[livro de mercado]** — pode ser citado como "afirmação comum de mercado", não como fonte. O tratamento acadêmico da ideia de crescimento ótimo vem da literatura de **growth-optimal / log-optimal portfolios** (Kelly; Thorp; MacLean/Thorp/Ziemba), abaixo.

### 3.2 O critério de Kelly e por que quebra sem variância definida

**O que é (leigo):** o **critério de Kelly** responde "que fração do capital apostar para maximizar o crescimento de longo prazo?". Formalmente, maximiza o valor esperado do **logaritmo** do capital (crescimento composto), não o valor esperado do capital. Fonte primária: **Kelly, J. L. (1956), "A New Interpretation of Information Rate", Bell System Technical Journal** **[revisado por pares / periódico técnico], (só snippet, via múltiplas fontes secundárias abertas)**. Sistematização acadêmica: **MacLean, L. C., Thorp, E. O. & Ziemba, W. T. (2011), "The Kelly Capital Growth Investment Criterion", World Scientific** **[livro acadêmico], (paywall — só snippet; ver NÃO VERIFICADOS)**.

**A fórmula do Kelly contínuo:** para um ativo aproximadamente contínuo, a fração ótima é

> **f\* = μ / σ²**

onde **μ** = retorno esperado (excedente) e **σ²** = **variância** (o "espalhamento" dos retornos ao quadrado). Confirmação em fonte revisada por pares: Carta, A. & Conversano, C. (2020), *"Practical Implementation of the Kelly Criterion"*, **Frontiers in Applied Mathematics and Statistics, 6** **[revisado por pares], (página aberta)**, que deriva o caso contínuo "seguindo Thorp" e afirma verbatim: *"The knowledge of the first two moments of the distribution of the returns makes the Kelly criterion able to find the optimal fraction to be invested in a single stock."* A forma explícita f = μ/σ² também aparece em Kuo et al. (arXiv:1806.05293) **[preprint], (só snippet)**: *"one obtains a Kelly fraction of f = μ/σ²."*

**Por que quebra em memecoin (a razão matemática, em português simples):**
- **Variância** é a média dos desvios ao quadrado. Numa distribuição de **cauda pesada** com "lei de potência" (a probabilidade de retornos gigantes decai devagar, como 1/x^α, onde **α = alfa de cauda** = quão pesada é a cauda; α menor = cauda mais pesada), **a variância pode ser infinita/não definida** (isso ocorre quando α ≤ 2). Se σ² não existe, **f\* = μ/σ² = μ/∞ → 0**: a fórmula simplesmente **não produz um número** — ela pressupõe uma quantidade que não existe.
- **Pior ainda: se a própria média não é definida** (quando α ≤ 1), então **μ não existe**, e a noção de "taxa de crescimento esperada" que o Kelly maximiza **deixa de fazer sentido**. Não há "média de longo prazo" para a qual convergir (ver seção 5.2).
- Isso conecta diretamente com **Grobys & Shahzad (2025)** (sua pesquisa anterior): variâncias de estratégias de momentum em cripto seguem leis de potência com média e variância populacionais **não definidas** → métricas baseadas em variância "não são informativas". Kelly é uma métrica baseada em variância. **Logo, Kelly não é informativo aqui.**

**Duas fontes sobre a direção do efeito (trago as duas):**
- **Bamberg, G. & Neuhierl, A. (2012), "Growth Optimal Investment Strategy: The Impact of Reallocation Frequency and Heavy Tails", German Economic Review, 13(2), 228–240** **[revisado por pares], (página aberta — abstract)**. Verbatim: *"the optimal fraction to be invested in the risky asset (i) depends on the length of the basic return period and (ii) is lower for heavy-tailed log returns than for light-tailed log returns."* Ou seja: **quanto mais pesada a cauda, MENOR a fração ótima** — coerente com "no limite de σ² infinita, a fração tende a zero".
- **Whelan, K. (2024), "On optimal betting strategies with multiple mutually exclusive outcomes", Bulletin of Economic Research, 77(1), 67–85** **[revisado por pares], (página aberta)**. Reforça que estimar corretamente as médias é decisivo, citando MacLean et al. (2011): *"getting means correctly estimated is crucial for portfolio success. This is true for the Kelly criterion... Caveat emptor."* Se a média nem existe, o alerta vira impossibilidade.

**Exemplo numérico resolvido (Kelly discreto simples):** aposta com probabilidade p = 0,5 de ganhar +1× e 0,5 de **perder tudo** (perda de 100%). A fórmula de Kelly "edge/odds" é f\* = (p·b − q)/b, com b = 1 (ganho por unidade), q = 0,5. f\* = (0,5·1 − 0,5)/1 = **0**. Kelly manda **não apostar** — porque a possibilidade de perda total domina. Isto é a ponte natural para a "regra do zero" (3.4).

### 3.3 O que a literatura oferece para cauda pesada — e onde NÃO resolve

Existe (com fonte), mas **nada resolve o caso de α baixo/média não definida**:
- **Fractional Kelly** (apostar uma fração do Kelly cheio para reduzir volatilidade e drawdown): MacLean, Ziemba & Blazenko (1992); MacLean, Thorp, Zhao & Ziemba (2011). **[livro acadêmico / revisado por pares], (só snippet — ver NÃO VERIFICADOS)**. **Cuidado**: Whelan (2024) mostra que a "regra" popular de fractional Kelly = Kelly/σ (aversão ao risco) **não** é o ótimo geral: *"it is not an accurate description of the optimal betting problem."* Além disso, fractional Kelly ainda pressupõe que o Kelly cheio exista — o que não ocorre aqui.
- **Controle de drawdown** (dimensionar para limitar a queda máxima): Grossman, S. & Zhou, Z. (1993), "Optimal investment strategies for controlling drawdowns". **(só snippet — citação secundária).**
- **Growth-optimal sob distribuições estáveis/α-estáveis**: Bamberg & Neuhierl (2012, acima) é o tratamento revisado por pares mais direto, e a conclusão é "reduza a fração".

**Veredito honesto (com todas as letras):** **a literatura NÃO resolve o dimensionamento de crescimento ótimo para caudas muito pesadas com média/variância não definidas.** Quando a média não existe, "maximizar o crescimento esperado" não é sequer bem definido. O problema deixa de ser "otimizar crescimento" e passa a ser "**sobreviver**".

### 3.4 A "regra do zero" e o gambler's ruin

Quando a média não é definida e a perda total é um evento de probabilidade real, o critério muda de "crescer" para "não ser eliminado". O fundamento publicado é:

- **Gambler's ruin (ruína do apostador)** — **Feller, W., "An Introduction to Probability Theory and Its Applications", Vol. 1, Wiley** **[livro acadêmico]**. Resultado (via derivação de ensino que reproduz Feller, **página aberta**; e cross-check Grinstead & Snell): num jogo **desfavorável repetido**, a ruína é praticamente certa se você continuar apostando.
  - **Fórmula (jogo desfavorável):** com probabilidade de perder q > probabilidade de ganhar p, defina **r = q/p > 1**. Começando com stake S e alvo M, a probabilidade de ruína é **P(ruína) = (r^M − r^S) / (r^M − 1)**. No jogo **justo** (p = q), simplifica para **P(ruína) = (M − S)/M**.
  - **Exemplo numérico resolvido (roleta americana, aposta par):** p = 18/38, q = 20/38, então r = 20/18 = 10/9 ≈ 1,111. Começando com S = 50, alvo M = 100: r^M = (10/9)^100 ≈ 37.649; r^S = (10/9)^50 ≈ 194. P(ruína) = (37.649 − 194)/(37.649 − 1) ≈ **0,9949 (99,5%)**. Uma desvantagem pequena por aposta, repetida muitas vezes, praticamente garante a ruína.
  - **Moral aplicável:** quanto mais apostas você faz num jogo com expectativa negativa, mais perto de 1 vai a probabilidade de ruína. Reduzir número/tamanho das apostas é o que preserva capital.
- **Ergodicity economics** — **Peters, O. & Gell-Mann, M. (2016), "Evaluating gambles using dynamics", Chaos, 26, 023103** **[revisado por pares — periódico de física; a APLICAÇÃO à economia é CONTROVERSA]**. Ideia (via Kwakkel 2020 e Poitras et al. 2015, **[revisado por pares], página aberta**): a média sobre o **ensemble** (muitas cópias paralelas de você) pode ser irrelevante; o que importa é a média ao longo do **tempo** para um único você. Verbatim (via Kwakkel 2020): *"an expected value over an ensemble of scenarios is meaningful only if the expected value is independent of time, and the average over time in any scenario converges to this expected value."* Em processos multiplicativos (compostos), as duas médias divergem, e a de tempo é menor. **Marcação de status:** o venue original é sólido, mas a tese de que isso reescreve a economia é **debatida** — apresente como argumento forte, não consenso.
- **"Survival first"**: a síntese das duas ideias acima é que, sob cauda pesada com risco de perda total, **o tamanho da posição deve ser aquele que você pode perder inteiro sem ser eliminado** — porque a matemática de crescimento não te socorre (não existe) e a matemática de ruína te pune por repetir apostas grandes.

---

## (4) Pré-compromisso e revisão

### 4.1 Commitment devices (dispositivos de pré-compromisso): funcionam? quando falham?

**Definição:** decidir agora e tornar difícil/custoso mudar depois. **Hard commitment** = penalidade econômica real (bloqueio, multa). **Soft commitment** = custo psicológico (promessa, rótulo). (Karlan, Ratan & Zinman 2014, Review of Income and Wealth, **[revisado por pares], página aberta**.)

**Funcionam (com fonte):**
- **Ashraf, N., Karlan, D. & Yin, W. (2006), conta SEED, Filipinas, Quarterly Journal of Economics** (via Karlan et al. 2014 e Burke et al. 2017, **página aberta**): conta que trava saques até uma data/meta aumentou os saldos poupados **~82% em um ano** vs. grupo de comparação. **Take-up ~28%.**
- **Giné, Karlan & Zinman (contrato CARES de cessação de tabagismo)** (via Vlaev et al. 2016, **[revisado por pares], página aberta**): quem depositou o próprio dinheiro sob condição de passar em teste de nicotina teve mais sucesso em parar, inclusive num teste-surpresa aos 12 meses.
- **Thaler & Benartzi, "Save More Tomorrow"** (via Vlaev et al. 2016): pré-compromisso de aumentar poupança elevou a taxa média de 3,5% para 11,6%.
- **Ariely & Wertenbroch (2002)** e **Gollwitzer & Sheeran (2006)**: prazos auto-impostos e planos se-então melhoram execução. (**citação secundária / conceitual**.)

**Falham (trago a divergência):**
- **John, A. (2020), "When Commitment Fails"** (via Ogawa & Ohno 2023, **[revisado por pares], página aberta**): muitos abrem contas de compromisso e **as abandonam antes do vencimento** — violação do compromisso. Em geral, **só uma pequena fração usa** os dispositivos (Giné et al. 2010; Augenblick et al. 2015; John 2020).
- **Burke, Luoto & Perez-Arce (2017), "Soft versus Hard Commitments", Journal of Consumer Affairs** **[revisado por pares], página aberta**: take-up de hard commitment é baixo; e o "safety valve" (válvula de escape) reduz a eficácia. Lição: rigidez demais afasta adesão; frouxidão demais elimina o efeito.

**Aplicação a trading — stop-loss como pré-compromisso (evidência revisada por pares direta):**
- **Fischbacher, U., Hoffmann, G. & Schudy, S. (2017), "The Causal Effect of Stop-Loss and Take-Gain Orders on the Disposition Effect", Review of Financial Studies** (via Kotomin & Varma 2021, **[revisado por pares], página aberta**). Verbatim: *"an automatic selling device treatment (i.e., stop-loss orders) significantly reduces the disposition effect, but a reminder treatment does not."* **Conclusão prática com lastro:** o stop que **executa sozinho** funciona como pré-compromisso e corrige o viés de segurar perdedores; um mero **lembrete** para "considerar vender" **não** funciona. Isto sustenta "**automatize o stop; não confie em lembrete/força de vontade**".

### 4.2 Cadência de revisão: o que há e o que não foi medido

- **Myopic loss aversion (MLA)** — olhar o resultado com **mais frequência PIORA** a decisão sob risco:
  - **Benartzi & Thaler (1995)**; **Gneezy & Potters (1997), QJE**; **Gneezy, Kapteyn & Potters (2003), "Evaluation Periods and Asset Prices in a Market Experiment", The Journal of Finance, 58(2)** **[revisado por pares], página aberta**. Verbatim: *"we find that more information and more flexibility result in less risk taking."*
  - **Fellner & Sutter (2009), The Economic Journal** **[revisado por pares], página aberta**: frequência de feedback E horizonte de investimento contribuem quase igualmente; **feedback menos frequente → mais investimento em ativo de risco com retorno positivo esperado**. E há um viés: as pessoas *preferem* checar com frequência, embora isso as prejudique.
- **A distinção crucial**: essa literatura é sobre **olhar o P&L (resultado)**. Ela sugere **olhar o resultado com MENOS frequência**. Isso **não** contradiz Harkin (que apoia monitorar o **comportamento/processo** com frequência) — são coisas diferentes. **Revisar o processo (segui a regra?) ≠ olhar o dinheiro (quanto ganhei?).**
- **Cadência ótima de revisão de PROCESSO para trader**: **NÃO MEDIDA.** Ninguém publicou (revisado por pares) qual frequência de revisão de processo maximiza desempenho de trader. Harkin apoia "mais monitoramento de progresso é melhor", mas não define número, e não é sobre trading. **Resposta honesta: a literatura não responde a cadência ótima.**

### 4.3 Armadilhas conhecidas em revisar o próprio resultado (com fonte)

- **Hindsight bias** ("eu sabia que ia acontecer") — Fischhoff (1975). Corrompe a avaliação: a decisão parece óbvia depois. (Via Jugnandan & Willows 2023, que nota que expertise **mitiga** hindsight; **página aberta**.)
- **Self-attribution bias** (ganho = minha habilidade; perda = azar) → gera **excesso de confiança** — **Gervais & Odean (2001), "Learning to Be Overconfident"**; Miller & Ross (1975). (Via Kano et al. 2025 e RFE 2025, **página aberta**: mais experiência pode aumentar overconfidence e até **aumentar** o disposition effect em alguns dados — divergência real na literatura.)
- **Outcome bias** (julgar a qualidade da decisão pelo resultado, não pelo processo) — Baron & Hershey (1988). É exatamente o erro que a distinção "decisão boa vs. resultado bom" combate.
- **Illusion of control** — Langer (1975).
- **Overconfidence e trading** — **Barber & Odean (2001), "Boys Will Be Boys", QJE**: quem opera mais, ganha menos.
- **Padrão em ruído / "hot hand"** — Gilovich, Vallone & Tversky (1985) vs. correção de **Miller & Sanjurjo (2018), Econometrica** **[revisado por pares]** (o "efeito quente" foi parcialmente reabilitado por um viés de cálculo — divergência a registrar). Em cauda pesada, "ver um padrão" no próprio histórico curto é quase garantidamente ruído.

**Síntese:** revisar o **resultado** convida hindsight + self-attribution + outcome bias. Revisar o **comportamento pré-registrado** (segui a regra que escrevi antes?) é a única forma de revisão relativamente imune a esses vieses — e é a que Harkin sustenta.

---

## (5) O tamanho de amostra para distinguir habilidade de sorte

### 5.1 Regime "bem-comportado" (variância finita)

Aqui vale o **Teorema do Limite Central (TLC)** — o teorema que diz que médias de muitas amostras independentes se aproximam de uma curva normal (sino), com erro que encolhe a **1/√n**.

- **Sharpe (SR)** = retorno médio dividido pelo desvio-padrão (retorno "por unidade de risco"). **t-stat** = quantos erros-padrão o resultado está longe de zero; t ≈ 2 é o corte usual de "estatisticamente detectável".
- **Fonte primária**: **Lo, A. W. (2002), "The Statistics of Sharpe Ratios", Financial Analysts Journal, 58(4), 36–52** **[revisado por pares], (página aberta, PDF)**. Erro-padrão do Sharpe estimado (retornos IID), verbatim (Eq. 9): *"SE(SR) ≈ √[(1 + ½SR²)/T]."*
- **De onde vem o n ≈ (2/SR)²** (implicação de Lo, mostrada — **não** é citação literal de Lo): o t-stat do Sharpe é t = SR·√T / √(1 + ½SR²) ≈ SR·√T para SR pequeno. Impondo t = 2: √T ≈ 2/SR → **T ≈ (2/SR)²** (SR por operação).
- **Exemplo numérico resolvido**: suponha um Sharpe **por operação** de SR = 0,1 (bom, para trade individual). n ≈ (2/0,1)² = **400 operações** para atingir t = 2. Se SR por operação = 0,05, n ≈ (2/0,05)² = **1.600 operações**. Uma pessoa física raramente acumula isso com disciplina e no mesmo regime de mercado.
- **Agravantes**:
  - **Deflated Sharpe / false strategy theorem** — **Bailey & López de Prado (2021), "How backtest overfitting leads to false discoveries", Significance** **[revisado por pares], página aberta**: se você testa muitas variações da própria estratégia e fica com a melhor, o Sharpe observado é inflado. Verbatim: *"as few as three independent trials suffice to produce an investment strategy that is likely false."*
  - **Múltiplas comparações / "p-hacking do próprio histórico"** — **Harvey, Liu & Zhu (2016), "…and the Cross-Section of Expected Returns", RFS** **[revisado por pares]**; **Bailey, Borwein, López de Prado & Zhu (2014), "Pseudo-Mathematics and Financial Charlatanism", Notices of the AMS** **[revisado por pares]**. (Ambos **só snippet / citação** — ver NÃO VERIFICADOS.) Olhar seu histórico procurando "o que funcionou" é rodar muitos testes sem correção → falsos positivos.

### 5.2 Regime de cauda pesada (α < 2): o TLC não vale

- Quando a variância é infinita (α < 2), **o TLC clássico não se aplica**. A soma/média converge para uma **distribuição α-estável (Lévy)**, não para a normal (generalized central limit theorem). Fonte: Necir, Meraghni & Zitikis (2010), *Journal of Probability and Statistics* **[revisado por pares], página aberta**, e Frank (2009), *Journal of Evolutionary Biology* **[revisado por pares], página aberta** (exposição didática de leis estáveis e caudas 1/|x|^α).
- **Taxa de convergência**: no regime bem-comportado a média amostral converge a **n^(−1/2)** (o "1/√n" do TLC). Sob cauda pesada com índice α < 2, a média amostral converge muito mais devagar, a **n^(1/α − 1)**. Ex.: com α = 1,5 → expoente = 1/1,5 − 1 = **−1/3** (n^(−1/3), muito pior que n^(−1/2)); com α = 1,2 → −1/6. Quanto mais pesada a cauda, mais lenta a convergência → **precisa de ordens de magnitude mais dados**.
- **Se α ≤ 1 (média NÃO definida)**: a Lei dos Grandes Números falha — **a média amostral nunca converge** para valor nenhum (novos extremos continuam mudando a média). Fonte (exposição, **página aberta**): Schumer & Jerolmack (2009, *JGR*) — *"the sample mean of an infinite mean distribution will never converge to a constant value... because the mean of the parent distribution does not exist"*; e Mei et al. (2011) — *"in a heavy tailed distribution with infinite mean, the law of large numbers does not apply and the sample mean can have variance that does not decrease with sample size."*
  - **Consequência dita com todas as letras:** se os retornos de memecoin têm α ≤ 1, **NENHUM tamanho de amostra distingue habilidade de sorte pela média**. Não existe "opere mais e a estatística resolve". O número que você quer (média verdadeira) **não existe**.
- **Livro técnico a marcar**: Taleb, *"Statistical Consequences of Fat Tails"* — **[livro técnico / preprint]**, não é fonte revisada por pares (marcar como tal). O artigo revisado por pares de Taleb, *"Finiteness of variance is irrelevant in the practice of quantitative finance", Complexity (2008)* **[revisado por pares], página aberta**, argumenta que a distinção variância finita/infinita é menos operacional do que parece — divergência a registrar. Livro acadêmico de referência sobre extremos: Embrechts, Klüppelberg & Mikosch, *"Modelling Extremal Events"* **[livro acadêmico], (só snippet)**.
- **Conexão com Grobys & Shahzad (2025)**: exatamente por isso, para estratégias de momentum em cripto com leis de potência e variância não definida, métricas baseadas em variância "não são informativas" — e por extensão, o Sharpe e a conta n ≈ (2/SR)² **também deixam de valer**. **Sem Sharpe, sem essa conta.**

---

## (6) Catálogo de afirmações de mercado sem fonte (entrega própria para o curso)

| Afirmação (como circula) | Onde circula (link) | Existe fonte real por trás? | Por que NÃO se sustenta |
|---|---|---|---|
| **"Traders com diário sistemático têm 23% de melhora no desempenho mensal em 60 dias"** | traderlens.app/en/blog/trading-journal-guide **[blog de plataforma]** | **Não localizável.** Nenhuma citação, autor ou estudo. | Número sem fonte. Nenhum estudo revisado por pares mede journaling→retorno (seção 1). Tamanho de efeito implausível para 60 dias. |
| **"Estudo da Universidade da Califórnia: documentação sistemática = 73% melhores resultados"** | traderlens.app; repetida em medium.com (Steady Turtle Trading) **[blog]** | **Distorção de duas coisas reais.** (a) O "estudo da Califórnia" real é Barber & Odean (2000), "Trading Is Hazardous to Your Wealth", *Journal of Finance* 55(2), 66.465 contas — verbatim: *"those that trade most earn an annual return of 11.4 percent, while the market returns 17.9 percent"* — mostra que **quem mais opera PERDE**, o oposto. (b) O "73%" real é o spread de ~73 bps/dia entre topo e base em Barber, Lee, Liu & Odean (2014): *"top-ranked day traders go on to earn ... 61.3 ... bps per day; bottom-ranked ... −11.5 ... bps per day"* (61,3 − (−11,5) ≈ 73), que **não tem nada a ver com diário**. | Número real existe, mas foi **arrancado do contexto** e colado num claim sobre journaling. A fonte real diz quase o inverso. |
| **"Redução de 25–30% no drawdown máximo entre quem mantém diários detalhados"** | traderlens.app **[blog]** | Não localizável. | Sem fonte, sem amostra, sem desenho. |
| **"Introspecção emocional reduz erros emocionais em 30%, segundo dados de plataformas especializadas"** | traderlens.app **[blog]** | Não localizável. "Dados de plataformas" ≠ estudo. | Autoridade vaga ("plataformas especializadas"), sem link nem método. |
| **"Pesquisa Bear Bull Traders (2021): 62% dos que abandonaram o diário citaram desconforto emocional"** | tradealgo.com **[blog]** | **Não localizável.** | Sem publicação rastreável; número específico sem fonte primária. |
| **"32% de melhora em retorno ajustado ao risco em 6 meses (Tradervue)" / "Sharpe +0,4 em 6 meses (Kinfo)"** | tradealgo.com **[blog]** | Dados internos de plataforma, não publicados nem auditados. | "Dados de plataforma" com seleção/sobrevivência; não revisado por pares. |
| **"Estudo de 5.000 contas: expectância vira positiva em 60 dias com diário" / "412 traders"** | blog.ultratrader.app; tradezella.com **[blog]** | Não localizável como estudo independente. | Marketing de produto; sem metodologia pública. |
| **"90% dos traders perdem 90% do dinheiro em 90 dias" (regra 90-90-90)** | udemy.com; tradingview.com; trendspider.com; medium.com **[folclore]** | **Parcial.** Não há "planilha mestra". O grão de verdade vem de reguladores e academia (coluna ao lado). | Como enunciada (número triplo exato), é **folclore**; o próprio iqoption.com admite: *"'90% of traders lose money' is not a single official number."* |
| **"95% dos traders falham"** | vários blogs **[folclore]** | Não. | Número redondo sem origem; varia de blog para blog. |
| **"90% das opções expiram sem valor, logo venda opções"** | gaspntrader.com **[blog]** cita como mito | Não. | Confunde "expirar sem valor" com "trade perdedor"; ignora risco de cauda. |

**Fontes REAIS que substituem o folclore (com a distância entre o dado real e o boato):**
- **ESMA (regulador da UE), decisão de 23/03/2018** **[documento de regulador], (página aberta)**: verbatim: *"74-89% of retail accounts typically lose money on their investments, with average losses per client ranging from €1,600 to €29,000."* → É sobre **CFDs alavancados**, não "todos os traders", e é % de contas perdedoras, não "90% perde 90% em 90 dias".
- **Chague, F., De-Losso, R. & Giovannetti, B. (2020), "Day Trading for a Living?", SSRN 3423101 / FGV EESP TD 525** **[preprint / working paper], (página aberta)**. Verbatim (dos 1.551 que persistiram >300 dias na B3): *"97% of them lost money. Only 1.1% earned more than the Brazilian minimum wage and only 0.5% earned more than the initial salary of a bank teller — all with great risk."* E: *"we find no evidence of learning by day trading."* → dado brasileiro específico, muito mais duro e mais bem medido que "90%".
- **Barber, Lee, Liu & Odean (2014), Journal of Financial Markets** **[revisado por pares], (página aberta)**: *"Less than 1% of the day trader population is able to predictably and reliably earn positive abnormal returns net of fees."* (Taiwan.)
- **Barber & Odean (2000), Journal of Finance** **[revisado por pares], (página aberta)**: o verdadeiro "estudo da Califórnia".

---

## (7) Afirmações de PRÁTICA: tem lastro? (para as regras de rotina)

| Afirmação comum de prática | Tem lastro? | Fonte / observação |
|---|---|---|
| **"Sempre arrisque 1–2% por operação"** | **Parcial / convenção.** Sem estudo revisado por pares que fixe 1–2% como ótimo. | Coerente com sobrevivência (gambler's ruin, Feller) e com "fração menor sob cauda pesada" (Bamberg & Neuhierl 2012). Mas **o número específico é convenção de mercado**, não resultado. |
| **"Mantenha um diário"** | **Sim para comportamento; não para retorno.** | Harkin et al. (2016) sustenta que monitorar ajuda a **cumprir a regra**; nenhum estudo liga diário a **retorno**. |
| **"Registre no papel / de forma verificável e compartilhe"** | **Sim.** | Harkin: efeito maior com registro físico e reportado/público. |
| **"Escreva a tese ANTES de entrar"** | **Sim (indireto).** | Implementation intentions (Gollwitzer & Sheeran 2006); pré-registro. Combate hindsight/self-attribution. |
| **"Revise semanalmente"** | **Não medido.** | Cadência ótima de revisão de processo nunca foi testada (seção 4.2). |
| **"Não fique olhando o P&L o tempo todo"** | **Sim.** | Myopic loss aversion (Gneezy & Potters 1997; Gneezy et al. 2003; Fellner & Sutter 2009): olhar resultado com mais frequência piora a decisão. |
| **"Nunca mova o stop / use stop automático"** | **Sim (parcial).** | Fischbacher, Hoffmann & Schudy (2017): stop automático reduz disposition effect; lembrete não. |
| **"Corte perdas rápido, deixe ganhos correrem"** | **Parcial.** | É o antídoto ao **disposition effect** (segurar perdedor, vender ganhador), fenômeno bem documentado (Shefrin & Statman; Barberis & Xiong 2009). Mas não é "lei de lucro". |

---

## (8) NÃO VERIFICADOS (citados mas não abertos/confirmados agora)

- **Kelly (1956), Bell System Technical Journal** — confirmado por múltiplas secundárias, mas **não abri o original (só snippet)**.
- **MacLean, Thorp & Ziemba (2011), "The Kelly Capital Growth Investment Criterion", World Scientific** e **Thorp (2011), capítulo "The Kelly Criterion..."** — **paywall; só snippet**. A fórmula f\* = μ/σ² foi confirmada via fonte revisada por pares que a deriva "seguindo Thorp" (Carta & Conversano 2020).
- **MacLean, Ziemba & Blazenko (1992)** e **MacLean, Thorp, Zhao & Ziemba (2011)** sobre fractional Kelly — **só citação secundária**.
- **Grossman & Zhou (1993)** sobre controle de drawdown — **só citação secundária**.
- **Kahneman & Klein (2009)**; **Hogarth (kind/wicked)**; **Fischhoff (1975)**; **Langer (1975)**; **Baron & Hershey (1988)**; **Miller & Ross (1975)**; **Gollwitzer & Sheeran (2006)** — marcos conceituais **não reabertos agora** (citados via fontes revisadas por pares abertas que os resumem).
- **Harvey, Liu & Zhu (2016), RFS** e **Bailey, Borwein, López de Prado & Zhu (2014), Notices of the AMS** — **só snippet/citação** (o conceito foi confirmado via Bailey & López de Prado 2021, aberto).
- **Ashraf, Karlan & Yin (2006), QJE**; **Giné, Karlan & Zinman**; **Thaler & Benartzi**; **Ariely & Wertenbroch (2002)**; **John (2020)** — confirmados **via** artigos revisados por pares abertos que os citam (Karlan et al. 2014; Burke et al. 2017; Vlaev et al. 2016; Ogawa & Ohno 2023), **não pelos originais**.
- **Seru, Shumway & Stoffman (2010)**; **Feng & Seasholes (2005)**; **Gervais & Odean (2001)**; **Barber & Odean (2001)**; **Fischbacher, Hoffmann & Schudy (2017)**; **Benartzi & Thaler (1995)**; **Miller & Sanjurjo (2018)** — confirmados **via** secundárias revisadas por pares abertas, **não pelos originais**.
- **Peters & Gell-Mann (2016), Chaos** — confirmado **via** Kwakkel (2020) e Poitras et al. (2015), abertos; original **não aberto**.
- **Grobys & Shahzad (2025)** — não reexecutado; usado conforme sua pesquisa anterior.
- **Taleb, "Statistical Consequences of Fat Tails"** — **[livro técnico/preprint]**, não aberto; usado só como referência a marcar.

---

## (9) Fontes (link, venue, status, acesso, data 12/09/2026)

**Registro / monitoramento / psicologia da decisão**
- Harkin et al. (2016), *Psychological Bulletin* 142(2):198–229, DOI 10.1037/bul0000025 — **[revisado por pares]** — eprints.whiterose.ac.uk/id/eprint/87431/ — **(página aberta, abstract do repositório)**.
- Sheeran & Webb (2016), "The Intention–Behavior Gap", *Social & Personality Psych. Compass* 10(9) — **[revisado por pares]** — onlinelibrary.wiley.com/ai/10.1111/spc3.12265 — **(só snippet)**.
- Simonson (2020), *Journal of Consumer Psychology* — **[revisado por pares]** — DOI 10.1002/jcpy.1182 — **(só snippet)**.
- Webb, Chang & Benn (2013), "The Ostrich Problem", *Soc. & Pers. Psych. Compass* 7(11) — **[revisado por pares]** — 10.1111/spc3.12071 — **(só snippet)**.

**Aprendizado de traders / vieses**
- Mahani & Bernhardt (2007), *Journal of Finance* 62(3) — **[revisado por pares]** — 10.1111/j.1540-6261.2007.01237.x — **(página aberta)**.
- Barber, Lee, Liu & Odean (2014), *Journal of Financial Markets* 18 — **[revisado por pares]** — sciencedirect.com/science/article/abs/pii/S1386418113000190 e faculty.haas.berkeley.edu/odean — **(página aberta)**.
- Barber & Odean (2000), *Journal of Finance* 55(2):773–806 — **[revisado por pares]** — **(via snippet/PDF Haas, página aberta secundária)**.
- Kaustia & Knüpfer (2008), *Journal of Finance* 63(6) — **[revisado por pares]** — 10.1111/j.1540-6261.2008.01411.x — **(página aberta)**.
- Jugnandan & Willows (2023), *Int. J. Consumer Studies* 47(4) — **[revisado por pares]** — 10.1111/ijcs.12935 — **(página aberta)**.
- Chang, Solomon & Westerfield (2015), *Journal of Finance* 71(1) — **[revisado por pares]** — 10.1111/jofi.12311 — **(página aberta)**.

**Kelly / cauda pesada / dimensionamento**
- Kelly (1956), *Bell System Technical Journal* — **[revisado por pares/periódico técnico]** — **(só snippet)**.
- Carta & Conversano (2020), *Frontiers in Applied Math. & Statistics* 6, DOI 10.3389/fams.2020.577050 — **[revisado por pares]** — frontiersin.org — **(página aberta)**.
- Bamberg & Neuhierl (2012), *German Economic Review* 13(2):228–240 — **[revisado por pares]** — 10.1111/j.1468-0475.2011.00553.x — **(página aberta, abstract)**.
- Whelan (2024), *Bulletin of Economic Research* 77(1):67–85 — **[revisado por pares]** — 10.1111/boer.12474 — **(página aberta)**.
- MacLean, Thorp & Ziemba (2011), *The Kelly Capital Growth Investment Criterion*, World Scientific — **[livro acadêmico]** — **(só snippet, paywall)**.
- Taleb (2008), "Finiteness of variance is irrelevant...", *Complexity* 14(3) — **[revisado por pares]** — 10.1002/cplx.20263 — **(só snippet)**.

**Cauda pesada / estatística / amostra**
- Lo (2002), "The Statistics of Sharpe Ratios", *Financial Analysts Journal* 58(4):36–52 — **[revisado por pares]** — traders.studentorg.berkeley.edu/papers/The-Statistics-of-Sharpe-Ratios.pdf — **(página aberta, PDF)**.
- Bailey & López de Prado (2021), "How backtest overfitting leads to false discoveries", *Significance* 18(6) — **[revisado por pares]** — 10.1111/1740-9713.01588 — **(página aberta)**.
- Necir, Meraghni & Zitikis (2010), *Journal of Probability and Statistics* — **[revisado por pares]** — 10.1155/2010/707146 — **(página aberta)**.
- Frank (2009), "The common patterns of nature", *Journal of Evolutionary Biology* 22(8) — **[revisado por pares]** — 10.1111/j.1420-9101.2009.01775.x — **(página aberta)**.
- Schumer & Jerolmack (2009), *J. Geophysical Research* — **[revisado por pares]** — 10.1029/2009JF001266 — **(página aberta)**.
- Mei et al. (2011), *European Transactions on Electrical Power* 21(1) — **[revisado por pares]** — 10.1002/etep.412 — **(página aberta)**.
- Embrechts, Klüppelberg & Mikosch, *Modelling Extremal Events* — **[livro acadêmico]** — **(só snippet)**.
- Feller, *An Introduction to Probability Theory and Its Applications*, Vol. 1, Wiley — **[livro acadêmico]** — **(derivação aberta em notas de ensino que reproduzem Feller; cross-check Grinstead & Snell)**.
- Peters & Gell-Mann (2016), "Evaluating gambles using dynamics", *Chaos* 26:023103 — **[revisado por pares; aplicação econômica controversa]** — **(via Kwakkel 2020, 10.1002/wcc.638, página aberta; Poitras et al. 2015, 10.1155/2015/737905, página aberta)**.

**Pré-compromisso / cadência**
- Karlan, Ratan & Zinman (2014), *Review of Income and Wealth* 60(1) — **[revisado por pares]** — 10.1111/roiw.12101 — **(página aberta)**.
- Burke, Luoto & Perez-Arce (2017), *Journal of Consumer Affairs* 52(3) — **[revisado por pares]** — 10.1111/joca.12170 — **(página aberta)**.
- Vlaev, King, Dolan & Darzi (2016), *Public Administration Review* 76(4) — **[revisado por pares]** — 10.1111/puar.12564 — **(página aberta)**.
- Ogawa & Ohno (2023), *Economica* 91(362) — **[revisado por pares]** — 10.1111/ecca.12507 — **(página aberta)**.
- Fischbacher, Hoffmann & Schudy (2017), *Review of Financial Studies* — **[revisado por pares]** — **(via Kotomin & Varma 2021, 10.1111/fire.12288, página aberta)**.
- Gneezy, Kapteyn & Potters (2003), *Journal of Finance* 58(2) — **[revisado por pares]** — 10.1111/1540-6261.00547 — **(página aberta)**.
- Fellner & Sutter (2009), *The Economic Journal* 119(537) — **[revisado por pares]** — 10.1111/j.1468-0297.2009.02251.x — **(página aberta)**.

**Reguladores / dados reais**
- ESMA (2018), medidas CFD/opções binárias — **[documento de regulador]** — esma.europa.eu/node/84933 — **(página aberta)**.
- Chague, De-Losso & Giovannetti (2020), "Day Trading for a Living?", SSRN 3423101 — **[preprint/working paper]** — papers.ssrn.com/sol3/papers.cfm?abstract_id=3423101 — **(página aberta, abstract)**.

**Blogs/folclore (para o catálogo, não como fonte de fato)**
- traderlens.app/en/blog/trading-journal-guide — **[blog]** — **(página aberta)**.
- tradealgo.com/.../day-trading-journal-... — **[blog]** — **(página aberta)**.
- blog.ultratrader.app; tradezella.com; fortraders.com; crosstrade.io; tradelogr.com; journalplus.co — **[blog]** — **(página aberta)**.
- udemy.com; tradingview.com; trendspider.com; medium.com; iqoption.com; gaspntrader.com — **[folclore/blog]** — **(página aberta)**.

**Base já estabelecida (pesquisa anterior do usuário)**
- Grobys & Shahzad (2025) — **[revisado por pares, conforme pesquisa anterior]** — **(não reexecutado)**.

## (10) Consultas feitas (ferramenta + query)

- Scholar Gateway: "Do individual traders learn from experience by trading? Learning by trading and investor performance improvement over time"
- Scholar Gateway: "Does monitoring goal progress promote goal attainment meta-analysis experimental evidence"
- web_search: "trading journal 23% improvement 60 days study"
- Scholar Gateway: "Learning by trading: do investors reduce the disposition effect and improve with experience? Seru Shumway Stoffman"
- Scholar Gateway: "Kelly criterion growth-optimal betting and its failure under heavy-tailed distributions with undefined variance"
- Scholar Gateway: "commitment devices behavior change savings smoking self-control field experiment"
- TinyFish fetch_content: eprints.whiterose.ac.uk/id/eprint/87431/ (Harkin, moderadores/effect size)
- Scholar Gateway: "stop-loss and take-gain orders causal effect on disposition effect experiment"
- Scholar Gateway: "myopic loss aversion evaluation frequency risk taking experiment more information worse decisions"
- Scholar Gateway: "statistics of Sharpe ratio sampling error number of observations to establish statistical significance"
- Scholar Gateway: "time average versus ensemble average ergodicity economics multiplicative dynamics Peters Gell-Mann"
- web_search: "90% traders lose money 90-90-90 rule origin no source"
- web_search: "Chague De-Losso Giovannetti day trading Brazil B3 profitable percentage"
- web_search: "ESMA CFD retail accounts lose money percentage 74-89"
- Scholar Gateway: "stable distributions infinite variance sample mean convergence rate law of large numbers alpha less than one power law tails finance"
- web_search: "Barber Odean Taiwan day traders lose money learning"
- web_search: '"trading journal" "23%" University of California study 73% better results origin'
- Verificação matemática interna: f*=μ/σ², Bamberg & Neuhierl, gambler's ruin (Feller), Lo (2002) erro-padrão
- Verificação de claims quantitativos contra as fontes citadas

## (11) CHECKPOINT (obrigatório)

**CONFIRMADO (com fonte revisada por pares/regulador aberta):**
- Monitorar progresso promove alcance de metas de comportamento: d+ = 0,40 (IC 0,32–0,48); frequência de monitoramento aumentou d+ = 1,98 e mediou o efeito; efeitos maiores com registro físico e reportado/público (Harkin 2016).
- Traders aprendem devagar/de forma custosa; a maioria continua perdendo (Barber et al. 2014; Mahani & Bernhardt 2007; Chague et al. 2020; ESMA).
- Kelly = μ/σ²; fração ótima menor sob cauda pesada (Bamberg & Neuhierl 2012); médias corretas são cruciais (Whelan 2024).
- Gambler's ruin: ruína quase certa em jogo desfavorável repetido (Feller) — fórmula e exemplo resolvidos.
- Stop automático reduz disposition effect; lembrete não (Fischbacher et al. 2017).
- Olhar resultado com mais frequência piora decisão (myopic loss aversion: Gneezy et al. 2003; Fellner & Sutter 2009).
- Erro-padrão do Sharpe ≈ √((1+SR²/2)/T); n ≈ (2/SR)² para t = 2 (Lo 2002) — exemplo resolvido.
- Sob α ≤ 1, média não definida → LGN falha → nenhum n distingue habilidade de sorte pela média (Schumer & Jerolmack 2009; Mei et al. 2011). Conecta com Grobys & Shahzad (2025).
- Estatísticas de trading "23%", "Universidade da Califórnia/73%", "25–30% drawdown", "30% menos erros", "62% Bear Bull Traders", "90-90-90", "95% falham": sem fonte / distorcidas; dados reais (ESMA 74–89%; Chague et al. 97%; Barber & Odean 11,4% vs 17,9%) dizem outra coisa.

**NÃO HÁ EVIDÊNCIA (dito com todas as letras):**
- "Manter diário → ganhar dinheiro": não medido em literatura revisada por pares.
- Cadência ótima de revisão de PROCESSO para trader: não medida.
- Dimensionamento de crescimento ótimo para α baixo / média-variância não definidas: a literatura NÃO resolve.
- "1–2% por operação" como ótimo: sem estudo; é convenção coerente com sobrevivência.

**NÃO VERIFICADO (ver seção 8):** originais de Kelly 1956, MacLean/Thorp/Ziemba 2011, Thorp 2011, Seru et al. 2010, Feng & Seasholes 2005, Gervais & Odean 2001, Ashraf et al. 2006, Giné et al., Thaler & Benartzi, John 2020, Peters & Gell-Mann 2016, Harvey/Liu/Zhu 2016, Bailey et al. 2014 (AMS), Kahneman & Klein 2009, Fischhoff 1975, Langer 1975, Baron & Hershey 1988, Miller & Sanjurjo 2018, Embrechts et al., Taleb (livro), Grobys & Shahzad 2025 — usados via secundárias abertas ou pesquisa anterior.

**O QUE FALTOU:** abrir os PDFs primários atrás de paywall (Kelly 1956; MacLean/Thorp/Ziemba 2011; vários originais de finanças comportamentais), confirmados aqui apenas via fontes secundárias revisadas por pares abertas. Nenhum índice de Hill (alfa de cauda) publicado especificamente para memecoin foi encontrado — confirma o "não existe" da sua pesquisa anterior.

## RECOMENDAÇÕES (o que fazer, faseado, com os gatilhos que mudam a decisão)

Estas são recomendações de **processo** (não de quanto investir). Cada uma diz o gatilho que a alteraria.

**Fase 1 — Construir o registro como DADO, não como diário.**
- Adote os 9 campos da seção 1.4, com a **regra escrita ANTES da entrada** e o campo **"segui a regra? (on/off-plan)"** derivado da comparação entre plano e **saída executada** — não de autorrelato. Lastro: Harkin (monitorar comportamento) + implementation intentions (escrever antes) + Fischbacher, Hoffmann & Schudy 2017 (o que corrige viés é a execução, não a intenção).
- Registre **fisicamente/verificável** e, se possível, **reporte a alguém** (accountability) — são os moderadores que ampliam o efeito em Harkin.
- **Benchmark que mudaria isto:** se surgir um estudo revisado por pares medindo journaling→retorno, revisar a promessa do módulo. Até lá, prometa só "aderência à regra", nunca "lucro".

**Fase 2 — Revisão que evita os vieses.**
- Revise o **comportamento** (segui a regra?) com frequência (semanal, p.ex.), mas **olhe o P&L com pouca frequência** — myopic loss aversion mostra que olhar resultado o tempo todo piora a decisão.
- Na revisão, faça a pergunta de análise de decisão: *"a decisão foi boa dado o que eu sabia ANTES?"* — não *"o resultado foi bom?"* (combate outcome/hindsight/self-attribution bias).
- **Benchmark:** como ninguém mediu a cadência ótima, teste a sua própria (ex.: revisão de processo semanal vs. quinzenal) e trate como experimento pessoal, não como verdade.

**Fase 3 — Tamanho de posição sob a premissa de cauda pesada.**
- Trate memecoin como ativo onde **Kelly não se aplica** (σ² e talvez μ não definidas). Não calcule Kelly; não use Sharpe; não use "n ≈ (2/SR)²" — todos pressupõem momentos finitos.
- Dimensione por **sobrevivência**: parta do princípio de que a posição pode ir a zero, e escolha o tamanho **que você pode perder inteiro** sem ser eliminado (fundamento: gambler's ruin + "fração menor sob cauda pesada" de Bamberg & Neuhierl). Menos apostas grandes reduz probabilidade de ruína.
- **Automatize** a regra de saída (stop que executa sozinho), não confie em lembrete (Fischbacher et al. 2017).
- **Benchmark que mudaria isto:** se aparecer uma estimativa publicada e crível do **índice de cauda (α)** para memecoin, com α > 2, então variância existe e Sharpe/Kelly voltam a valer parcialmente. Enquanto α for desconhecido ou ≤ 2, mantenha o regime de sobrevivência.

**Fase 4 — Expectativa estatística honesta no curso.**
- Ensine explicitamente: *"você provavelmente NUNCA terá operações suficientes para provar habilidade num ativo de cauda pesada"* — no melhor caso (variância finita, SR/operação 0,05–0,1) são **400–1.600 operações**; se α ≤ 1, **nenhum número basta**. Isso protege o aluno de confundir sorte com skill.
- Use o **catálogo da seção 6** como conteúdo: mostre o número folclórico, a fonte real, e a distância entre os dois.

## CAVEATS

- **Toda a evidência de "monitorar ajuda" vem de fora de finanças** (saúde/comportamento). A transferência para trading é uma **inferência razoável**, não um fato medido — está marcado como tal em todo o texto.
- **Vários originais não foram abertos** (paywall) e são confirmados via secundárias revisadas por pares abertas (seção 8). Os números centrais (Harkin d+=0,40; Lo SE; ESMA 74–89%; Chague 97%; Barber & Odean 11,4% vs 17,9%; Barber et al. spread ~73 bps) foram verificados verbatim.
- **Ergodicity economics (Peters & Gell-Mann)** é publicada em venue sólido, mas sua **pretensão de reescrever a economia é controversa**; use como argumento forte a favor de "sobrevivência", não como consenso.
- **Miller & Sanjurjo (2018)** reabriu o debate do "hot hand"; trate detecção de padrão no próprio histórico curto com ceticismo, mas saiba que a literatura não é unânime.
- **Não foi encontrado índice de Hill (alfa de cauda) publicado para memecoin** — confirma o "não existe" da sua pesquisa anterior. Toda a análise de cauda pesada aqui é **condicional** à premissa (bem fundamentada por Grobys & Shahzad 2025) de que memecoin tem cauda extremamente pesada e possivelmente média/variância não definidas.
- **Este documento não recomenda quanto investir** — por decisão explícita do usuário. Ele dá a matemática das regras e os gatilhos que mudariam cada recomendação.
