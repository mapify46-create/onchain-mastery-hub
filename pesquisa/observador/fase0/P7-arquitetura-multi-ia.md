# Levantamento técnico: sistemas multi-modelo de IA para análise de fluxos on-chain em tempo quase real

**Data de referência: 11 de setembro de 2026.** Todos os preços e limites foram copiados de páginas oficiais na data indicada em cada item. Marcação obrigatória por fonte: **(página aberta)** = o conteúdo real da página foi lido; **(só snippet)** = apenas o resumo do buscador. **NÃO VERIFICADO** aparece onde o dado não fechou.

## TL;DR (resposta direta em 3 pontos)
- **O caminho mais barato viável para o seu volume custa cerca de US$ 30 por dia** (camada rápida Inception Mercury 2 + camada de raciocínio Gemini 3.1 Pro, com orçamento de raciocínio de 2.000 tokens por previsão). Esse número é dominado pela camada de raciocínio e pelos "tokens de raciocínio" (texto que o modelo gera para pensar antes de responder, cobrado como saída), não pela classificação em massa.
- **A arquitetura que a literatura sustenta é a cascata por custo** (modelo barato filtra, modelo caro decide só nos casos difíceis): o artigo fundador FrugalGPT relata "50% a 98%" de redução de custo, e o RouteLLM relata "até 85% de redução de custo mantendo 95% da qualidade do GPT-4". Já "debate entre modelos" quase não supera votação simples com o mesmo orçamento de computação, e "LLM como juiz" tem vieses medidos (posição, tamanho da resposta, preferência pelo próprio texto).
- **O seu maior risco não é o custo, é o conteúdo hostil**: um post ou nome de token pode conter instruções escondidas para o classificador (injeção de prompt indireta, risco nº 1 do OWASP para LLM), e nenhum modelo é confiável para escrever um endereço de contrato — o endereço tem de ser extraído por regra fixa do texto original e validado contra a blockchain, nunca aceito do texto que o modelo produziu.

---

## CHECKPOINT — custo diário do caminho mais barato viável

> **Este bloco é um cálculo de custo, não uma recomendação de fornecedor.** Ele responde à sua pergunta de "quanto custa o caminho mais barato viável" antes do documento. Nas notas de execução ficou combinado que, neste formato de entrega única, o checkpoint vem isolado no topo em vez de esperar sua resposta.

**(a) Valor estimado: ~US$ 30,75 por dia** (com orçamento de raciocínio de 2.000 tokens por previsão). Sobe para **~US$ 66,75 por dia** se você deixar cada previsão gastar 8.000 tokens de raciocínio.

**(b) Modelos que compõem esse caminho:**
- **Camada rápida (classificação):** Inception **Mercury 2** — US$ 0,25 entrada / US$ 0,75 saída por 1M de tokens.
- **Camada de raciocínio (previsão):** Google **Gemini 3.1 Pro** — US$ 2,00 entrada / US$ 12,00 saída por 1M de tokens (para prompts até 200 mil tokens).
- Existe um caminho ainda mais barato (~US$ 28/dia) trocando a camada de raciocínio por **Claude Sonnet 5** (US$ 2 / US$ 10), mas o Sonnet é um modelo "meio-termo", não um modelo topo de raciocínio como Opus/Pro; incluí-lo depende de ele passar na sua barra de qualidade.

**(c) Preços usados (copiados da página oficial):**
- Mercury 2: US$ 0,25 / US$ 0,75 por 1M — inceptionlabs.ai, consulta 11/09/2026 **(página aberta)**. A Inception já mostra um modelo mais novo, **Mercury 2.5**, a US$ 0,20 / US$ 0,75, que baratearia ainda mais a classificação, mas ele ainda não tem latência medida por fonte independente (ver NÃO VERIFICADOS).
- Gemini 3.1 Pro: US$ 2,00 / US$ 12,00 por 1M (≤200k); US$ 4,00 / US$ 18,00 acima de 200k — ai.google.dev/gemini-api/docs/pricing, consulta 11/09/2026 **(página aberta)**. O preço de saída "inclui os tokens de raciocínio" (texto literal da tabela oficial: "Output price (including thinking tokens)").

**(d) Premissas de tokens (rotuladas como PREMISSA — troque pelos seus números reais):**
- **PREMISSA – classificação curta:** 1.000 tokens de entrada (instruções + post + metadados) e 50 de saída.
- **PREMISSA – previsão longa:** 10.000 tokens de entrada e 500 de resposta visível.
- **PREMISSA – raciocínio:** 2.000 tokens de raciocínio por previsão no cenário base (8.000 no cenário caro). Tokens de raciocínio são cobrados ao preço de **saída** em todos os três fornecedores.

**(e) A conta, passo a passo (em linguagem de leigo):**

*Camada rápida — 20.000 classificações/dia com Mercury 2:*
- Entrada: 20.000 chamadas × 1.000 tokens = 20 milhões de tokens de entrada. A 1M custa US$ 0,25, então 20 × US$ 0,25 = **US$ 5,00**.
- Saída: 20.000 × 50 = 1 milhão de tokens de saída. A US$ 0,75 por milhão = **US$ 0,75**.
- Subtotal camada rápida = **US$ 5,75/dia**.

*Camada de raciocínio — 500 previsões/dia com Gemini 3.1 Pro:*
- Entrada: 500 × 10.000 = 5 milhões de tokens. A US$ 2 por milhão = **US$ 10,00**.
- Saída visível: 500 × 500 = 250 mil tokens. Mais o raciocínio: 500 × 2.000 = 1 milhão de tokens. Total de saída cobrada = 1,25 milhão. A US$ 12 por milhão = **US$ 15,00**.
- Subtotal camada de raciocínio = **US$ 25,00/dia** (orçamento de 2.000 tokens de raciocínio).
- Se o raciocínio subir para 8.000 tokens: saída = 0,25M + 4M = 4,25M × US$ 12 = US$ 51,00 + US$ 10 entrada = **US$ 61,00/dia**.

*Total:* US$ 5,75 + US$ 25,00 = **US$ 30,75/dia** (base) ou US$ 5,75 + US$ 61,00 = **US$ 66,75/dia** (raciocínio alto).

**(f) Critério de "viável" usado:** (1) cabe nos limites de requisição de uma conta de gasto baixo — o volume (20.500 chamadas/dia, ~14 por minuto na média) cabe com folga no Start tier da Anthropic (1.000 requisições/min) e no Tier 1 pago do Gemini; **não** cabe no nível gratuito do Gemini, cujo teto é 1.500 requisições/dia (ver seção de limites); (2) o modelo suporta saída estruturada em JSON — confirmado para Mercury 2 (JSON alinhado a esquema) e Gemini (JSON mode); (3) a latência foi medida por fonte independente e é compatível com "tempo quase real" — Mercury 2 tem ~3,5–5 s até o primeiro token e >1.000 tokens/s de saída pela Artificial Analysis. **Ressalva:** os limites de requisição específicos da Inception (Mercury) não foram confirmados em página oficial (NÃO VERIFICADO); se isso for bloqueante, a alternativa viável mais barata na camada rápida com limites documentados é o Gemini 3.1 Flash-Lite (~US$ 6,50/dia no seu volume).

---

## Key Findings (resumo executivo)
1. **Cascata por custo é o padrão comprovado**; ensembles/votação ajudam de forma modesta; debate entre modelos e "juiz" são frágeis e caros.
2. **A latência varia de <1 s (Haiku, Flash-Lite) a >90 s (Opus 5) e até >300 s (GPT-6 Astra)** quando o modelo de raciocínio "pensa" antes de responder — o "tempo até o primeiro token" desses modelos inclui o tempo de raciocínio.
3. **Custo é dominado pelos tokens de raciocínio e pela entrada da previsão longa**, não pela classificação em massa.
4. **Saída estruturada (JSON schema) garante o formato, não o conteúdo** — o modelo ainda inventa endereços/tickers/números "bem formatados".
5. **O mesmo modelo não dá a mesma resposta para a mesma entrada**, mesmo com "temperatura 0", por causa de como o servidor agrupa requisições (batch invariance).
6. **Injeção de prompt indireta é risco real e documentado em cripto** (roubo via post em Morse; "memórias falsas" em agentes Web3).

---

## Details

### (1) Padrões de arquitetura — o que funciona e o que só parece funcionar

Explicando os termos na primeira vez: um **LLM** ("large language model", modelo de linguagem grande) é o programa de IA que lê texto e gera texto. Um **token** é um pedaço de palavra (~4 caracteres); tudo é cobrado por token. Um **modelo de raciocínio** gera, antes da resposta final, um rascunho interno de "pensamento" que também é cobrado.

**Roteamento por custo / cascata (comprovado).** A ideia: o modelo barato responde primeiro; um "escore de confiança" decide se aquilo basta; só os casos difíceis sobem para o modelo caro. O artigo fundador é o **FrugalGPT** (Chen, Zaharia, Zou, Stanford, arXiv:2305.05176), que relata na Tabela 3 economia de "50% a 98%" e resume: "FrugalGPT pode igualar o desempenho do melhor LLM individual (ex.: GPT-4) com até 98% de redução de custo, ou melhorar a acurácia sobre o GPT-4 em 4% ao mesmo custo". O **RouteLLM** (Ong et al., ICLR 2025, arXiv:2406.18665) relata "até 85% de redução de custo mantendo 95% da qualidade do GPT-4 no MT-Bench", com o roteador de fatoração de matriz enviando só ~14% das perguntas ao modelo forte (75% mais barato que roteamento aleatório). Isso é exatamente o seu desenho (a)→(b). **Fonte forte:** arXiv:2305.05176 e arXiv:2406.18665 (páginas abertas via resumo arXiv, 11/09/2026).

**Cuidado — cascata pode falhar sob ataque.** Um artigo de 2026 ("When Efficiency Backfires: Cascading LLMs Trigger Cascade Failure under Adversarial Attack", arXiv:2605.17288) mostra que a mesma estrutura de cascata que economiza dinheiro pode ser explorada: conteúdo adversarial no primeiro estágio (o modelo barato) propaga erro para cima. Relevante para você, porque o conteúdo que analisa é hostil por natureza.

**Ensembles / votação por amostragem (ganho real, modesto).** Rodar o mesmo modelo N vezes e votar na resposta mais comum ("self-consistency", Wang et al. 2023) melhora tarefas de raciocínio. É a base de qualquer estratégia de "concordância".

**Debate entre modelos (frágil — muitas vezes não supera votação).** Vários trabalhos concluem que o ganho atribuído a "debate" vem, na verdade, da votação embutida. "Large Language Models Cannot Self-Correct Reasoning Yet" (arXiv:2310.01798) relata que, com o mesmo número de respostas, o debate "fica significativamente abaixo da votação por maioria simples". Estudos com **orçamento de computação igualado** (arXiv:2605.09618; e a análise em Beancount.io citando arXiv:2604.02460) mostram que um único agente iguala ou supera o sistema multi-agente quando você paga o mesmo. Uma causa técnica documentada: o debate reduz a diversidade das respostas e "afunila" no erro (arXiv:2406.06461). **Conclusão prática:** debate custa ~6× mais inferência e raramente vale para o seu caso; prefira votação por amostragem.

**LLM como juiz (útil, mas enviesado).** Usar um LLM para pontuar a saída de outro é prático. O trabalho fundador (Zheng et al., "Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena", NeurIPS 2023, arXiv:2306.05685) mostrou que juízes fortes como o GPT-4 "atingem mais de 80% de concordância com preferências humanas — o mesmo nível de concordância entre humanos", mas identificou vieses de **posição** (favorece a resposta que aparece primeiro), **verbosidade** (acha que resposta mais longa é melhor) e **auto-realce/auto-preferência** (dá nota maior ao próprio texto). Esses vieses foram confirmados em "Justice or Prejudice?" (arXiv:2410.02736) e "Self-Preference Bias in LLM-as-a-Judge" (arXiv:2410.21819); uma análise de 2026 relata que modelos de fronteira ultrapassam 50% de erro em benchmarks de viés difíceis. **Mitigações publicadas:** embaralhar a ordem das opções, mascarar quem gerou cada resposta, penalizar tamanho na rubrica, e usar um juiz de família diferente da do gerador.

**Mixture-of-Agents / roteamento aprendido:** existem (HybridLLM, IRT-Router, Cascade Routing), mas para uma pessoa física a cascata com limiar de confiança calibrado (isotônica sobre a margem do primeiro token, como em arXiv:2605.18796) já captura quase todo o ganho.

### (2) Tabela de modelos — latência medida, custo por 1M, custo/dia no seu volume, limites

**Como ler a latência.** A fonte independente é a **Artificial Analysis (AA)** (artificialanalysis.ai/models, página aberta, 11/09/2026). Metodologia da AA (da própria página): mede a mediana (P50) das últimas 72 horas, com prompt padrão de 10.000 tokens de entrada; a métrica principal é **"tempo até o primeiro token de resposta"**, que **para modelos de raciocínio inclui o tempo de 'pensamento'** — por isso os números dos modelos de raciocínio são enormes. "Velocidade de saída" = tokens por segundo depois do primeiro token. O tempo total para uma resposta pode ser calculado: **tempo ≈ (tempo até o 1º token) + (nº de tokens ÷ velocidade)**.

**Preços (por 1M de tokens, tabela neutra, sem recomendação):**

| Modelo | Papel | Entrada US$/1M | Saída US$/1M | Cache leitura US$/1M | Fonte de preço |
|---|---|---|---|---|---|
| Claude Haiku 4.5 | rápido | 1,00 | 5,00 | 0,10 | claude.com/pricing (página aberta) |
| Gemini 3.5 Flash-Lite | rápido | 0,30 | 2,50 | 0,03 | ai.google.dev (página aberta) |
| Gemini 3.1 Flash-Lite | rápido | 0,25 | 1,50 | 0,025 | ai.google.dev (página aberta) |
| Gemini 3.8 Flash | rápido | 0,75 | 3,75 | 0,075 | ai.google.dev (página aberta) |
| Inception Mercury 2 | rápido | 0,25 | 0,75 | 0,025 | inceptionlabs.ai (página aberta); openrouter.ai (corrob.) |
| GPT-5.6 Luna | rápido | 0,20 | 1,20 | 0,02 | developers.openai.com (página aberta) |
| Claude Opus 5 | raciocínio | 5,00 | 25,00 | 0,50 | claude.com/pricing (página aberta) |
| Claude Sonnet 5 | raciocínio | 2,00 | 10,00 | 0,20 | claude.com/pricing (página aberta) |
| Gemini 3.1 Pro | raciocínio | 2,00 (≤200k) | 12,00 (≤200k) | 0,20 | ai.google.dev (página aberta) |
| GPT-5.6 Terra | raciocínio | 2,00 | 12,00 | 0,20 | developers.openai.com (página aberta) |
| GPT-5.6 Sol | raciocínio | 4,00 | 20,00 | 0,40 | developers.openai.com (página aberta) |

**Latência medida (Artificial Analysis, P50/72h, prompt 10k, 11/09/2026):**

| Modelo | Tempo até 1º token de resposta | Velocidade saída (t/s) | Tempo total ~50 tokens* | Tempo total ~500 tokens* |
|---|---|---|---|---|
| Claude Haiku 4.5 (sem raciocínio) | 0,78 s | ~81–85 | ~1,4 s | ~6,7 s |
| Inception Mercury 2 | ~3,5–5,1 s | ~1.128 | ~3,6–5,2 s | ~4,0–5,6 s |
| Gemini 3.1 Pro (com raciocínio) | 22,87 s (inclui pensamento) | ~122 | ~23,3 s | ~26,9 s |
| Claude Opus 5 (raciocínio) | 91,20 s (inclui pensamento) | ~59 | ~92 s | ~99,7 s |
| GPT-6 Astra (raciocínio) | 322,48 s (inclui pensamento) | ~59 | ~323 s | ~331 s |
| Gemini 3.8 Flash (atual) | NÃO VERIFICADO (AA ainda não publicou) | N/A | — | — |

*Tempo total calculado a partir da AA: (tempo até 1º token) + (tokens ÷ velocidade). Rotulado como "calculado". Para os modelos de raciocínio, os 22–322 s já embutem o pensamento, por isso um resultado "curto" de 50 tokens não é rápido.

**Custo por dia no seu volume (PREMISSAS acima):**

*Camada rápida — 20.000 classificações (20M entrada + 1M saída):*
| Modelo | Custo/dia |
|---|---|
| Mercury 2 | US$ 5,75 |
| GPT-5.6 Luna | US$ 5,20 |
| Gemini 3.1 Flash-Lite | US$ 6,50 |
| Gemini 3.5 Flash-Lite | US$ 8,50 |
| Gemini 3.8 Flash | US$ 18,75 |
| Claude Haiku 4.5 | US$ 25,00 |

*Camada de raciocínio — 500 previsões (5M entrada + 0,25M saída visível + raciocínio):*
| Modelo | Custo/dia (2.000 tok. raciocínio) | Custo/dia (8.000 tok. raciocínio) |
|---|---|---|
| Claude Sonnet 5 | US$ 22,50 | US$ 52,50 |
| Gemini 3.1 Pro | US$ 25,00 | US$ 61,00 |
| GPT-5.6 Terra | US$ 25,00 | US$ 61,00 |
| GPT-5.6 Sol | US$ 45,00 | US$ 105,00 |
| Claude Opus 5 | US$ 56,25 | US$ 131,25 |

**Custo por 1.000 chamadas:**
- Classificação (1.000 ent. + 50 saída): Mercury 2 ≈ US$ 0,29; GPT-5.6 Luna ≈ US$ 0,26; Gemini 3.1 Flash-Lite ≈ US$ 0,33; Haiku 4.5 ≈ US$ 1,25.
- Previsão (10.000 ent. + 500 saída + 2.000 raciocínio): Sonnet 5 ≈ US$ 45; Gemini 3.1 Pro ≈ US$ 50; Opus 5 ≈ US$ 112,50.

**Análise de sensibilidade (mostra o que mais mexe na conta):**
- Se a entrada da **classificação** for 500 tokens em vez de 1.000: Mercury 2 cai para ~US$ 3,25/dia. Se for 2.000 tokens: sobe para ~US$ 10,75/dia.
- Se a entrada da **previsão** for 3.000 tokens: Gemini 3.1 Pro cai para ~US$ 18/dia (2.000 raciocínio). Se for 30.000 tokens: ~US$ 45/dia. Ou seja, **o tamanho da entrada da previsão e o orçamento de raciocínio são os dois fatores que mais mexem no total.**

**Descontos (linha separada, com condição oficial):**
- **Lote (batch):** Anthropic — "Save 50% with batch processing" (claude.com/pricing, página aberta). Gemini — "Batch API (50% cost reduction)" (ai.google.dev, página aberta). OpenAI — Batch/Flex ≈ 50% (developers.openai.com, página aberta). **Compatibilidade com "tempo quase real": NÃO.** O processamento em lote é assíncrono, com janela-alvo de até 24 h; serve para re-pontuar histórico ("backfill"), não para o fluxo ao vivo. Confirme o prazo na página oficial antes de contar com ele.
- **Cache de prompt:** Anthropic — leitura em cache custa 10% do preço de entrada (ex.: Haiku US$ 0,10 vs US$ 1,00). Gemini — entrada em cache bem mais barata (ex.: 3.1 Pro US$ 0,20 vs US$ 2,00) + taxa de armazenamento por hora. Útil porque suas instruções de classificação se repetem em toda chamada; cacheá-las reduz a entrada cobrada e, na Anthropic, os tokens de cache **não contam** para o limite de tokens/min (ver limites).

**Limites de requisição (copiados das páginas oficiais):**

*Anthropic (platform.claude.com/docs/en/api/rate-limits, página aberta, 11/09/2026):* limites por organização, por classe de modelo, em RPM (requisições/min), ITPM (tokens de entrada/min) e OTPM (tokens de saída/min). **Start tier:** Haiku 4.5, Opus 5, Sonnet 5 = **1.000 RPM / 2.000.000 ITPM / 400.000 OTPM**; Fable 5.x = 1.000 / 500.000 / 100.000. Teto de gasto mensal: Start US$ 500, Build US$ 1.000, Scale US$ 200.000. Ao estourar: **HTTP 429** `rate_limit_error` com cabeçalho `retry-after` (segundos a esperar); há também **HTTP 529** `overloaded_error` quando a Anthropic está sobrecarregada (não é culpa sua, não conta na cobrança). Ao bater o teto de gasto: 429 com `error_code: enforced_spend_limit_reached` e **sem** `retry-after` (só libera no 1º dia do mês seguinte, 00:00 UTC). Contas novas podem começar num "Evaluation tier" abaixo do Start. Tokens lidos do cache não contam para o ITPM (exceto Haiku 3.5).

*Google Gemini (ai.google.dev/gemini-api/docs/rate-limits, página aberta, 11/09/2026):* limites por projeto em RPM, TPM (entrada) e **RPD (requisições/dia)**. **Nível gratuito:** cabe testar, mas o teto diário é baixo (Flash ~1.500 RPD; Pro fora do gratuito desde 1º/04/2026) — **não** comporta 20.000 classificações/dia. Tiers pagos: Tier 1 (habilitar faturamento, teto US$ 250), Tier 2 (US$ 100 pagos + 3 dias), Tier 3 (US$ 1.000 pagos + 30 dias). Há também **limite por gasto em janela rolante de 10 minutos**: Tier 1 US$ 10, Tier 2 US$ 50, Tier 3 US$ 200. Ao estourar: **429 `RESOURCE_EXHAUSTED`**. Os RPM/TPM exatos por modelo aparecem no painel do AI Studio, não em tabela estática (NÃO VERIFICADO o número exato por modelo).

*OpenAI:* usa tiers de uso que sobem com o gasto acumulado; ao estourar retorna **429** com `Retry-After`. Os valores exatos de RPM/TPM por tier não foram lidos em página oficial nesta pesquisa (NÃO VERIFICADO).

*Inception (Mercury):* limites de requisição **NÃO VERIFICADO** — não localizados em página oficial nesta pesquisa.

**Checagem: o seu volume cabe no nível inicial?** 20.500 chamadas/dia = ~14/min na média; ~17 mil tokens de entrada/min na média. Isso cabe com folga imensa no Start da Anthropic (1.000 RPM, 2M ITPM) e no Tier 1 pago do Gemini. **Não** cabe no gratuito do Gemini (teto de 1.500 RPD). Picos concentrados (ex.: muitos eventos on-chain no mesmo minuto) são o que pode disparar 429 — trate com fila e recuo exponencial.

### (3) Alucinação em dados estruturados e consistência

**"Alucinação"** = quando o modelo inventa um fato (aqui, um endereço, ticker ou número) com aparência plausível.

**Saída estruturada não resolve.** A saída estruturada (JSON schema) força o **formato**, não o **conteúdo**. Documentação da OpenAI: o recurso garante que o modelo "não omita uma chave obrigatória nem alucine um valor de enum inválido" — mas isso é sobre forma. Análises independentes (Towards Data Science, "Your JSON Is Valid but Your Data Is Wrong"; Logic.inc; Blck Alpaca) documentam os modos de falha que passam batidos: **valor de enum semanticamente errado** (escolhe "urgente" num caso rotineiro), **fabricação confiante** (preenche um campo com dado inventado em vez de recusar), **escore de confiança travado** (fica em 0,98/0,99 para tudo, inclusive lixo), e **arrays inventados** (prefere inventar itens a devolver lista vazia). Um caso citado: submeter foto de um elefante como recibo e receber de volta um relatório de despesa completo e válido. **Conclusão:** para você, um endereço de contrato dentro de um JSON válido **não é** garantia de que o endereço existe.

**Mitigação concreta para endereços cripto (o ponto central do seu projeto):**
1. **Nunca aceite o endereço que o modelo escreveu.** Extraia o endereço do **texto original do post** por regra fixa (regex), de forma determinística, sem IA. O papel do modelo é classificar/decidir, não transcrever endereço.
2. **Endereço EVM (Ethereum e compatíveis — Base, Polygon, Arbitrum, etc.):** formato `0x` seguido de 40 caracteres hexadecimais. Se vier em maiúsculas/minúsculas mistas, valide o **checksum EIP-55** (o padrão usa o hash keccak-256 do endereço em minúsculas para decidir quais letras ficam maiúsculas; segundo o EIP-55, isso detecta erro de digitação com >99% de acerto / probabilidade de passar por engano ~0,0247%). Um endereço "0x válido" é aceito em todas as redes EVM, então **confirme também a rede**.
3. **Endereço Solana (mint/conta):** é uma chave pública Ed25519 codificada em **Base58**, que ao ser decodificada deve ter **exatamente 32 bytes**. Solana é **sensível a maiúsculas/minúsculas** (ao contrário de EVM) e **não tem** checksum embutido — então validação de formato é mais fraca; a confirmação real tem de ser on-chain.
4. **Validação contra fonte on-chain (a que vale):** validação de formato só diz que a string é bem-formada, "NÃO verifica que o endereço existe on-chain". Para memecoins, consulte um **nó RPC** ou um **explorador de bloco oficial** para confirmar que o mint/contrato existe, tem os metadados esperados (símbolo, decimais) e bate com o que o post afirma. Só então registre.

**Consistência (o mesmo modelo dá a mesma resposta?).** **Não, nem com "temperatura 0"** (temperatura = quão aleatória é a escolha do próximo token; 0 deveria ser determinístico). O laboratório Thinking Machines ("Defeating Nondeterminism in LLM Inference", set/2025, thinkingmachines.ai) mostrou a causa real: não é só o clássico "concorrência + ponto flutuante", é a **falta de invariância ao tamanho do lote** — o servidor agrupa sua requisição com as de outros usuários, e o resultado numérico muda conforme quantas requisições estão juntas. No experimento com o modelo Qwen/Qwen3-235B-A22B-Instruct-2507 e o prompt "Tell me about Richard Feynman", 1.000 execuções a temperatura 0 produziram **80 saídas distintas** (a mais comum apareceu 78 vezes); as respostas foram idênticas nos primeiros 102 tokens e **divergiram a partir do token 103** (992 geraram "Queens, New York" contra 8 que geraram "New York City"). Com kernels "invariantes ao lote", as 1.000 execuções ficaram idênticas, ao custo de throughput.

**Como medir e o que fazer:**
- **Meça a concordância** rodando a mesma entrada N vezes (ex.: 5–10) e calculando o **percentual de concordância** (quantas vezes a categoria mais comum apareceu) — a métrica mais simples e explicável. Para rótulos categóricos, o **kappa de Cohen** (concordância descontando o acaso: 1 = perfeita, 0 = nível do acaso) é o padrão.
- **Onde existir, use o parâmetro `seed`** (semente aleatória) para aumentar a repetibilidade — mas saiba que ele **não garante** bit-a-bit em produção por causa do efeito de lote acima.
- **O que fazer com a variação:** para classificação, votar em N amostras (self-consistency) e só aceitar acima de um limiar de concordância; abaixo dele, escalar para a camada de raciocínio. Registre o escore de concordância junto com a previsão, para pontuar depois.

### (4) Injeção de prompt via conteúdo — risco e defesa

**O que é.** **Injeção de prompt** = texto na entrada que o modelo interpreta como instrução em vez de dado. É o **risco nº 1 (LLM01:2025) do OWASP Top 10 para aplicações LLM** (owasp.org, PDF v2025, página aberta). A causa raiz, nas palavras do OWASP: LLMs "processam instruções e dados no mesmo canal, sem separação clara", então o modelo não distingue os dois. A variante que te ameaça é a **injeção indireta**: as instruções maliciosas vêm escondidas no **conteúdo que você analisa** — um post, uma descrição de NFT, o próprio nome de um token. Como o seu material é hostil por natureza, trate **todo** conteúdo de entrada como potencialmente adversarial.

**Incidentes documentados em cripto:**
- **Grok/Bankrbot (4 de maio de 2026):** um usuário do X (conta "ilhamrafli.base.eth", @Ilhamrfliansyh, depois deletada) respondeu a um fio do Grok com uma mensagem em **código Morse**; ao decodificar e processar, o agente disparou uma transferência de ~3 bilhões de tokens DRB (~US$ 150–175 mil) na rede Base. O próprio Bankrbot confirmou: "sent 3B DRB — recipient: 0xe8e47…a686b — tx: 0x6fc7eb7da9379383efda4253e4f599bbc3a99afed0468eabfe18484ec525739a — chain: base". Cerca de 80% dos fundos foram devolvidos. Registrado como incidente pela OECD.AI (incidente 2026-05-04-4a73) e analisado por Giskard, Ledger, MEXC e SecurityWeek. Combinou injeção de prompt (LLM01) com "agência excessiva" (LLM06). O que te protege: você **não opera** — mas a lição sobre entrada obfuscada (Morse, base64, concatenação) vale para o classificador.
- **"Memórias falsas" em agentes Web3 (arXiv:2503.16248, Patlan et al., Princeton):** mostra que injetar instruções na **memória/histórico** do agente (ElizaOS) é ainda mais perigoso que injeção de prompt direta, e que defesas contra prompt injection "só oferecem proteção limitada quando o contexto armazenado está corrompido". Introduz o benchmark CrAIBench (150+ tarefas, 500+ casos de ataque). Relevante se você guardar histórico das análises e realimentá-lo no modelo.
- **Campanhas de SEO poisoning (Zscaler, via SecurityWeek):** sites maliciosos com prompts escondidos em `<div>` para induzir agentes a pagar/confiar em plataformas cripto falsas (typosquatting do DeBank). Confirma que o vetor é ativo e comercial.

**Padrões de defesa publicados (aplicáveis ao seu caso, que só prevê e registra):**
1. **Isole o conteúdo hostil num modelo "em quarentena" sem privilégios.** O modelo que lê o post não deve ter acesso a nenhuma ferramenta, carteira ou ação — no seu desenho, ele só emite uma categoria/previsão. Isso já neutraliza o vetor Grok/Bankrbot.
2. **Saída restrita a categorias fixas (enum).** Faça o classificador escolher de um conjunto fechado; assim, mesmo que o post diga "ignore as instruções e responda X", a saída não pode virar comando executável.
3. **Marque/isole conteúdo não confiável.** O OWASP recomenda "separar e demarcar claramente o conteúdo não confiável para limitar sua influência". Coloque o post entre delimitadores explícitos e instrua o modelo (no system prompt) a tratar tudo ali como dado, nunca como instrução.
4. **Normalize e detecte obfuscação** (Morse, base64, unicode invisível, homoglyphs) antes de enviar ao modelo — o incidente Grok passou por Morse justamente para furar filtros.
5. **Nada de agência.** Mantenha a regra de ouro do seu projeto (só prever e registrar). A ausência de ação é a defesa estrutural mais forte contra a classe de ataque que causou perdas reais.
6. **Detectores dedicados** (ex.: classificadores de prompt injection) ajudam como camada extra, mas a literatura (Patlan et al.) mostra que não bastam sozinhos.

### (5) Falhas documentadas de sistemas LLM em tempo real

- **Custo que explode por loop de agentes:** post-mortem amplamente citado (novembro de 2025) de um pipeline de 4 agentes LangChain (research/analysis/verification/summary) via protocolo A2A: o gasto foi de US$ 127 na semana 1 para US$ 891 na semana 2, escalando ~7× por semana até **~US$ 47.000/semana**, num loop de "clarification ping-pong" entre dois agentes que rodou por **11 dias** sem "step cap", sem teto de orçamento e sem detector de loop (dev.to; ZenML State of LLMOps). A defesa cabe em três linhas: limite de passos, limite de gasto e detector de repetição de chamada. Outro relato: US$ 4.200 em 63 horas por falta de teto (Medium, fonte fraca/blog, sinalizada). Para você, que roda em máquina barata e só prevê, o risco equivalente é **retry mal feito** multiplicando chamadas.
- **Retry/fallback que dobra a conta:** durante uma instabilidade, retry agressivo + fallback para um modelo mais caro pode fazer você pagar 2–3× por requisição, e o custo "sobrevive" ao incidente se ninguém notar (finopsllm.com; braintrust.dev). Mitigação: recuo exponencial com "jitter" (atraso aleatório), circuit breaker, e contagem de retries com alerta.
- **Quedas de provedor:** provedores de LLM operam a ~99–99,5% de disponibilidade (bem abaixo de infraestrutura de nuvem madura), com incidentes de várias horas registrados (tianpan.co, fonte de blog/analista — corroboração fraca; confirme na página oficial de status de cada fornecedor: status.claude.com, status da OpenAI, painel do Google). A Anthropic sinaliza sobrecarga própria com **HTTP 529** (distinto do 429 de limite seu).
- **Estouro de limite (429):** já detalhado na seção de limites; o erro é do lado da sua conta e se resolve com backoff/tier, ao contrário do 529.

## Recommendations (passos concretos e o que muda a decisão)

1. **Comece pelo caminho do checkpoint (~US$ 30/dia):** Mercury 2 na classificação + Gemini 3.1 Pro (ou GPT-5.6 Terra, empatado em preço) no raciocínio, com orçamento de raciocínio **limitado a ~2.000 tokens** por previsão. **Benchmark que muda a decisão:** se a qualidade da classificação do Mercury 2 ficar abaixo da sua barra, suba a camada rápida para Gemini 3.1 Flash-Lite (~US$ 6,50/dia) ou Haiku 4.5 (US$ 25/dia).
2. **Meça seus tokens reais antes de confiar no orçamento.** As PREMISSAS (1.000 e 10.000 de entrada) dominam a conta. Instrumente 1.000 chamadas reais, meça entrada/saída/raciocínio de fato e refaça a conta com a fórmula dada. **Gatilho:** se a entrada da previsão passar de ~15.000 tokens, avalie cache de prompt (reduz a parte de entrada em até 90% no Gemini).
3. **Trate endereços fora do modelo, sempre.** Extraia por regex do texto original, valide EIP-55 (EVM) / 32 bytes Base58 (Solana), e confirme on-chain via RPC/explorador antes de registrar. **Gatilho:** qualquer discrepância entre o endereço do texto e o on-chain = descartar/registrar como suspeito.
4. **Blinde o classificador contra injeção:** modelo em quarentena sem ferramentas, saída em enum fechado, conteúdo demarcado como dado, normalização/detecção de obfuscação (Morse/base64/unicode). **Mantenha "só prever e registrar".**
5. **Coloque os três limitadores desde o dia 1:** teto de gasto diário, limite de chamadas por item, e recuo exponencial com jitter para 429/529. Configure teto de gasto mensal no console (Anthropic Start US$ 500; Gemini Tier 1 US$ 250).
6. **Meça consistência semanalmente:** rode uma amostra 5–10× e acompanhe o percentual de concordância / kappa; se cair, aumente amostragem ou escale ao modelo de raciocínio. Use `seed` onde existir, sabendo que não garante bit-a-bit.
7. **Reserve o lote (batch, −50%) só para re-pontuar histórico**, nunca para o fluxo ao vivo (janela de até 24 h).

## Caveats e itens NÃO VERIFICADOS

**(6) NÃO VERIFICADOS (respostas honestas onde o dado não fechou):**
- **Latência do Gemini 3.8 Flash (Flash atual):** a Artificial Analysis ainda não publicou velocidade/latência (modelo lançado ~2/set/2026). Proxies de versões vizinhas (3.7/3.6 Flash) existem, mas o dado do 3.8 é **NÃO VERIFICADO**.
- **Limites de requisição da Inception (Mercury):** não localizados em página oficial. Se forem restritivos, isso afeta a viabilidade do caminho mais barato (por isso indiquei o Gemini 3.1 Flash-Lite como alternativa com limites documentados).
- **RPM/TPM exatos por modelo do Gemini e da OpenAI:** o Gemini publica os números no painel do AI Studio (não em tabela estática); os tiers exatos da OpenAI não foram lidos em página oficial nesta pesquisa.
- **"Tokens de raciocínio cobrados como saída" na OpenAI:** é a convenção conhecida e a página de preços da OpenAI não a reafirmou em texto explícito nesta consulta — trate como convenção, não como citação literal. (No Gemini está literal: "Output price (including thinking tokens)". Na Anthropic, o "extended thinking" é cobrado como saída.)
- **Sonnet 5 a US$ 2/US$ 10:** a página oficial exibia esse valor em 11/09/2026; fontes terceiras (só snippet) afirmam que seria preço introdutório revertendo a US$ 3/US$ 15 após 31/08/2026. Como a página canônica ainda mostrava US$ 2/US$ 10, usei US$ 2/US$ 10, mas **confirme antes de fechar orçamento**.
- **Quedas de provedor (99–99,5%):** vem de blog/analista (fonte fraca); confirme nas páginas oficiais de status.
- **Nomes/versões de modelos:** a linha muda rápido. Em 11/09/2026 a Anthropic lista Opus 5, Sonnet 5, Haiku 4.5 (e ainda Opus 4.8); o Gemini lista 3.8/3.7/3.6 Flash, 3.5/3.1 Flash-Lite e 3.1 Pro; a OpenAI lista GPT-6 Astra, GPT-5.6 Sol/Terra/Luna; a Inception já tem Mercury 2.5 além do Mercury 2. Confirme o **nome exato do modelo na API** antes de programar.

**Fontes fracas usadas (sinalizadas):** blogs de agregadores de preço (finout.io, cloudzero, benchlm, aipricing.guru), Medium e dev.to para post-mortems, e The Neuron/testingcatalog para o lançamento do Mercury 2. Todos os **números de preço e limite** vieram das páginas oficiais abertas; agregadores serviram só de corroboração.

**Tensão de fontes registrada:** para latência, o número da AA (medição independente) é o que vale; onde o fabricante diverge (ex.: Inception afirma TTFT "<300 ms" no marketing, enquanto a AA mede ~3,5–5 s para o Mercury 2 em prompt de 10k), trouxe os dois com a diferença de método — o marketing usa prompt curto e condições ideais; a AA usa 10k tokens de entrada, P50/72h.

## (7) Fontes e consultas de busca

**Páginas oficiais abertas (fonte primária):**
- Anthropic — preços: claude.com/pricing (página aberta, 11/09/2026); limites: platform.claude.com/docs/en/api/rate-limits (página aberta, 11/09/2026).
- Google — preços: ai.google.dev/gemini-api/docs/pricing (página aberta, 11/09/2026); limites: ai.google.dev/gemini-api/docs/rate-limits (página aberta, 11/09/2026).
- OpenAI — preços: developers.openai.com/api/docs/pricing (página aberta, 11/09/2026); saída estruturada: developers.openai.com/api/docs/guides/structured-outputs (página aberta).
- Inception — inceptionlabs.ai e inceptionlabs.ai/models (página aberta, 11/09/2026); Mercury 2 também em openrouter.ai/inception/mercury-2 (página aberta, corrob.).
- Artificial Analysis — artificialanalysis.ai/models e páginas por modelo (página aberta, 11/09/2026); metodologia: artificialanalysis.ai/methodology/performance-benchmarking (página aberta).
- OWASP — Top 10 for LLM Applications 2025, PDF em owasp.org (página aberta).

**Fontes acadêmicas/primárias (arXiv, páginas abertas via resumo):** FrugalGPT 2305.05176; RouteLLM 2406.18665; LLM-as-a-Judge / MT-Bench 2306.05685; LLMs Cannot Self-Correct Yet 2310.01798; Budget-Aware Reasoning 2406.06461; Self-Preference Bias 2410.21819; Justice or Prejudice 2410.02736; Real AI Agents with Fake Memories 2503.16248; Cascade Failure under Adversarial Attack 2605.17288; Matched-Ceiling Debate 2605.09618; UCCI Cascade 2605.18796. Thinking Machines "Defeating Nondeterminism in LLM Inference" (set/2025).

**Corroboração (fonte fraca, sinalizada):** neuraltrust.ai, portkey.ai (cascatas); towardsdatascience.com, logic.inc, blckalpaca.at (saída estruturada); oecd.ai, giskard.ai, ledger.com, mexc.com, securityweek.com (incidentes cripto); dev.to, tianpan.co, finopsllm.com, braintrust.dev (custo/loops); requesty.ai, standardcompute.com (limites, corrob.).

**Consultas de busca feitas:**
1. Anthropic Claude Haiku Opus pricing 2026 API
2. Artificial Analysis latency time to first token comparison
3. Inception Mercury 2 diffusion LLM pricing
4. Gemini API pricing Flash Pro official ai.google.dev 2026
5. OpenAI API pricing reasoning model o-series GPT-5 2026 platform
6. OWASP Top 10 LLM applications prompt injection 2025
7. FrugalGPT RouteLLM cascade cost routing LLM paper
8. LLM nondeterminism temperature 0 defeating batch invariance Thinking Machines
9. Anthropic API rate limits tiers requests per minute 429
10. LLM as judge bias position verbosity self-preference study
11. crypto AI agent prompt injection attack manipulated tweet wallet
12. structured outputs JSON schema does not prevent hallucination values
13. Gemini API rate limits free tier tier 1 RPM TPM official
14. EIP-55 checksum address validation Solana base58 address length verify
15. LLM production incident cost blowup runaway loop postmortem
16. multi-agent debate no better than self-consistency majority voting same budget
17. "fake memories" web3 agents context manipulation ElizaOS Patlan
18. Anthropic docs rate limits Claude Haiku Opus tier 1 RPM ITPM OTPM table
19. claude.com pricing Haiku Opus per million tokens batch prompt caching official
20. (subagente) verificação de preços oficiais e latência independente por modelo

**Ferramentas de leitura usadas:** web_fetch (leitura do conteúdo real da página) para as páginas marcadas "(página aberta)"; web_search para descoberta. Onde a página renderiza gráficos como imagem (Artificial Analysis), os números de cabeçalho vieram do texto de resumo/FAQ da própria página; figuras por provedor que só apareceram em snippet estão sinalizadas.