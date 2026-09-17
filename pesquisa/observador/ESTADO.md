# Estado do projeto — leia isto primeiro

> 13/09/2026. Uma página. Serve para retomar o trabalho numa sessão nova sem
> precisar do histórico da conversa.

## As duas frentes

**1. O hub (`onchain-mastery-hub` / app "mmc")** — a versão publicada tem 5 módulos.
**A versão local, construída em 13/09/2026 e ainda não publicada, fecha o app:** 7
módulos e a página **Checklist antes de comprar**.
- **Módulo 6 — Ler a tela** (`src/data/modulo6.js`): números da tela e calculadora de
  saída, volume falso e bundles, contrato (SPL × Token-2022, extensões, autoridades,
  metadata, dev dump), o que a pesquisa prevê sobre rug. Quiz de 8.
- **Módulo 7 — A rotina** (`src/data/modulo7.js`): a forma de uma regra testável (sem
  escrever a regra), tamanho sob cauda pesada com calculadora de sequência de perdas,
  diário de 9 campos, revisão e amostra, catálogo de números inventados. Quiz de 8.
- **Módulo 3 reformado:** abas "Pilar social na prática" (rotina de 5 minutos, X,
  Discord, Telegram, calls pagos) e "Pilar técnico na prática" (RugCheck → Solscan →
  Bubblemaps → DexScreener, com anatomia de cada tela). Quiz de 10.
- **Checklist** (`src/data/checklist.js`): três blocos, cada item com etiqueta de força
  da evidência (fato do protocolo, sinal medido, sinal fraco, rotina) e fluxograma.
- Aviso trocado pela frase curta em rodapé, menu, início e README.
- Verificado no navegador: todas as abas montam, os fluxogramas desenham, as duas
  calculadoras dão a conta certa, zero erro no console. Cache do app em `omh-cache-v10`.

**2. O observatório (`pesquisa/observador/`)** — pesquisa concluída, sem código ainda.
Sistema que observa, testa hipóteses no papel e mede o mercado. **Nunca opera.**

## Onde ler o detalhe

| Assunto | Arquivo |
|---|---|
| Regras do projeto e da stack | `CLAUDE.md` (raiz) |
| O que é o observatório, em fases | `pesquisa/observador/PLANO.md` |
| **As sete pesquisas do observatório, cruzadas** | `pesquisa/observador/SINTESE-FASE-0.md` |
| Os documentos originais da Fase 0 | `pesquisa/observador/fase0/` (11 arquivos) |
| Prompts da Fase 0 | `pesquisa/observador/PROMPTS-PESQUISA.md` |
| **Plano dos Módulos 6 e 7, do M3 e do Checklist** | `pesquisa/modulos/PLANO.md` |
| Prompts das sete pesquisas dos módulos | `pesquisa/modulos/PROMPTS-PESQUISA.md` |
| **Resultados dessas pesquisas — leia antes as correções** | `pesquisa/modulos/pesquisas/VERIFICACOES-AO-VIVO.md` |
| Prompts dos 33 vídeos | `pesquisa/videos/README.md` |

## O achado que decide o observatório

Com o atraso obrigatório de 2 a 5 minutos, sobra uma deriva bruta de **1,21 pontos
percentuais** para capturar, e o custo de ida e volta em memecoin é de **3 a 6 pontos**.
O líquido é negativo por aritmética. **Decidido pelo dono em 11/09/2026: a hipótese
primária passa a ser "detectar quem vai dar rug"**; "prever quem sobe" continua como
hipótese secundária, com o mesmo rigor. Placar: Brier e skill score contra a frequência
histórica — nunca acurácia, porque com taxa-base altíssima de rug a acurácia premia quem
responde "rug" para tudo. No paper de referência, o chute "tudo é rug" tem F1 de 0,90 e o
melhor modelo, 0,79.

**O rótulo de rug foi fixado em 16/09/2026, antes da coleta** (ver `ROTULO-PRE-REGISTRO.md`). O paper de referência
("Catching the Rug", arXiv:2608.20271, preprint) define rug como **queda de 99% do TVL
desde o pico** OU **token parado por mais de 80% da própria vida** (seção V-B). Serve de
ponto de partida. *(Corrigido em 13/09: antes este arquivo dizia que esses limiares não
tinham sido publicados.)* A metade de liquidez **não é reconstruível** (o
`reserve_in_usd` do GeckoTerminal só tem o valor de agora); a de inatividade e a de preço
são. Instrução do dono: começar a fotografar liquidez e a reconstruir 6 meses de preço já;
o rótulo já está escrito, e ninguém analisa nada antes de a coleta existir.

**Observatório — decisões do dono em 16/09/2026:**
- Como funciona, no detalhe: `COMO-FUNCIONA.md` (quatro relógios, tabelas, relatório).
- **Onde roda:** PC do dono agora; VPS 24 h só se os buracos de coleta atrapalharem.
- **Rótulo de rug:** fixado ANTES da coleta, em `ROTULO-PRE-REGISTRO.md` (queda de 99% da
  liquidez desde o pico OU parado por mais de 80% da vida, em até 30 dias da graduação).
- **Ordem:** primeiro terminar o redesenho visual do hub; o código do observatório vem depois.
- **Falta do dono:** gerar a chave da GMGN OpenAPI e confirmar o GeckoTerminal como fonte
  única de preço e liquidez.

## Pendências

**Decisões do dono:**
1. **Fase 1 — três respostas para destravar o código:** aprovar o plano (5 tabelas em
   SQLite, 4 arquivos de código + README, **zero dependências** — Node 24.19.0 já traz
   SQLite, WebSocket e fetch, testado); confirmar o universo "só tokens que graduam"
   (graduação como gatilho, nunca filtro); e o banco em
   `observador/dados/observatorio.db`, fora do Git.
2. **Publicar a leva de 13/09:** commit e `git push origin master` só quando o dono
   mandar. Arquivos novos a versionar: `src/data/{checklist,modulo6,modulo7}.js`,
   `src/views/{checklist,modulo6,modulo7}.js` e a pasta `pesquisa/modulos/`.
   `PROMPT-RECEITA-APP-EXE-E-SITE.md` também está sem versionar. O app desktop precisa
   de uma versão nova para levar os Módulos 6 e 7.

**Feito em 13/09/2026:**
- ~~Mínimo da gorjeta do Jito~~ → 1.000 lamports (0,000001 SOL) nos dois lugares do M5.
- ~~Faixa de graduação~~ → redação de "80% das graduações entre US$ 11 mil e US$ 101
  mil, amostra de ago/2026" no glossário, no M4 e no cenário 3.
- ~~Regerar os prompts de vídeo~~ → os 33 regerados depois da correção do Jito.
- ~~Conferir as telas das ferramentas~~ → viraram as anatomias da aba técnica do M3.

**Redesenho visual (17/09/2026) — desenhos no Claude Design, implantação no app:**
- Claude Design entregou: 9 componentes, os 7 módulos (desktop e celular), 5 telas gerais
  (Início, Checklist, Glossário, Revisão, Quiz/Simulador) e 6 animações. Handoff com README
  em pesquisa/design/. A Fase 5 (folhas-resumo A4) foi cancelada pelo dono.
- Implantado no app: src/components/visuais.js (mapa mental, barras na mesma escala,
  grade de 100, sequência, ciclo, curva deslizante), mapa do módulo nos 7 módulos,
  barras e curva no M6, grades da mortalidade no M2, ciclo da narrativa no M3,
  sequência do drainer no M1, grades da ruína e do diário e barras da amostra no M7.
- Implantado também: src/components/fluxograma.js — os fluxogramas passaram a ser desenhados
  pelo próprio app (leitor do subconjunto de Mermaid usado nos dados: 12 de 12 diagramas
  lidos). O Mermaid do CDN continua só como reserva.
- Telas gerais: ciclo do estudo no Início, escada 1-3-7-16-35 na Revisão, mapa por categoria
  no Glossário.
- Passo a passo tocável (Tocar/Pausar/setas, tudo visível o tempo todo): drainer e
  envenenamento de endereço no M1, caminho do token e sanduíche no M5.
- Falta implantar: as animações mais elaboradas do Claude Design (cenas desenhadas) e os
  ajustes finos das telas de Quiz e Simulador.
- Cache do service worker em v17.
- Armadilha nova: o painel do navegador guarda os módulos por URL e ignora cache:reload.
  Portas alternativas (8081-8083) em .claude/launch.json servem para ver a versão nova.

**Didática do texto (14/09/2026) — local, não publicado:**
- O dono apontou a seção "Market cap, FDV e liquidez" como exemplo de explicação
  confusa (definições + exceções site a site no mesmo parágrafo).
- Novo `src/components/secao.js`: card único de seção para os Módulos 1, 2, 3, 5, 6 e 7,
  com `emUmaFrase` (ideia central), `quadro` (comparação lado a lado), `exemplo`
  (passo a passo) e `detalhe` (recolhido, "Para ir mais fundo"). O M4 segue com
  `criarSecaoDeTexto` e só teve a redação encurtada.
- Reescritas as seções de texto de todos os módulos, sem remover nem mudar número.
  Auditoria de legibilidade (frases, parênteses, travessões): textos longos de 251 →
  ~70; pesados (score ≥ 90) de 79 → ~12. Resta pesado: resumos dos módulos, detalheExtra
  das tabelas, jTracker do M3, nota da calculadora do M4.
- Cache do service worker em v15; prompts de vídeo regerados.

**Próxima frente do hub — narrativas no pilar social do Módulo 3 (13/09/2026):**
- O dono quer que o pilar social ensine a achar narrativas, onde e com que
  ferramentas rastrear, e se elas movem o preço. Hoje o app não ensina isso.
- Prompts escritos: `pesquisa/modulos/PROMPTS-PESQUISA-NARRATIVAS.md` (P8 fontes,
  P9 ferramentas, P10 narrativa × preço, P11 ciclo de vida). Esperando o dono rodar.
- Depois: aba "Narrativas" no M3, campo de narrativa na ficha do M4, item no
  Checklist e campo no diário do M7.

**Próxima frente do hub — didática do app (13/09/2026):**
- O dono pediu para melhorar a didática. Prompts escritos:
  `pesquisa/modulos/PROMPTS-PESQUISA-DIDATICA.md` (P12 ciência da aprendizagem,
  P13 quiz/feedback/revisão espaçada, P14 texto/diagrama/calculadora/vídeo,
  P15 decisão sob risco e calibração, P16 motivação e hábito).

**As 9 pesquisas (P8 a P16) voltaram em 13/09 — leia `VERIFICACOES-AO-VIVO-2.md`:**
- Só 3 vieram completas (P11, P14, P15). As outras 6 pararam no checkpoint porque o
  plano do dono acabou; as respostas prontas estão na seção 5, por prioridade (P13 e
  P9 primeiro).
- Conferido ao vivo: o Midsummer **é** USENIX Security '26 (82,89% publicado). O app
  foi corrigido localmente (M6 e checklist, cache `v11`) — **não publicado**.
- Erros achados: P11 repete o "US$ 69 mil" e afirma tendências sem base na própria
  tabela; P10 escreve 82,6%; P12 usa a meta-análise errada para pré-teste.
- Alerta de princípio: calibração com Brier em cenário fictício precisaria de uma
  "verdade" escrita por mim (= eu escrever a regra). Só sobre fatos conhecidos, ou com
  taxas-base reais do observatório.
- **Construído em 13/09 (local, não publicado, cache `omh-cache-v12`), verificado no
  navegador:**
  - Aba **"Narrativas"** no M3 (onde nasce, quanto é fabricado, ciclo de vida,
    rotação 2024–2025, narrativa × preço, tabela de ferramentas, rotina de estudo) e
    3 perguntas novas no quiz (13 no total).
  - Didática, em `src/components/didatica.js`: **partes com "Continuar"** nas abas
    longas (M3 Narrativas, Social, Técnico; M6 Números, Contrato), **pergunta antes de
    ler** (M3, M6, M7), **termos da aba** (M6 e Narrativas).
  - Quiz: **"por que a sua não serve"** na alternativa errada (M6, M7 e as novas do
    M3). Calculadoras do M6 e M7 com **exemplo resolvido**. Checklist com
    **pré-mortem, argumento contrário e taxa-base** (8 itens na decisão).
  - Prompts de vídeo: entregável virou **resumo navegável** (não a narração palavra
    por palavra), vídeo em 2–3 segmentos; frase final sem "aconselhamento". 33 regerados.
- **Leva 3 (14/09): as 7 continuações voltaram completas** — análise em
  `VERIFICACOES-AO-VIVO-2.md`, "Leva 3". Conferido ao vivo: a Chainalysis diz 3,59%
  para **2024**; a P10 errou, o app está certo. GOAT (US$ 1,34 bi em 17/11/2024) e
  MOODENG (15/11/2024) resolvidos. Preço dos Boosts do DexScreener: não existe em
  página oficial.
- **Construído em 14/09 (local, não publicado, cache `omh-cache-v13`), verificado no
  navegador:** página **Revisão espaçada** (`#/revisao`, escada 1/3/7/16/35 dias,
  confiança antes de responder, placar "quando tenho certeza, acerto?"); chips de
  confiança no quiz dos módulos; na tela de início, card "Revisão de hoje", plano
  "se-então" e Exportar/Importar do progresso; aba Narrativas com a coluna "Ler é
  grátis?", os preços, os componentes do Trending Score e três parágrafos novos em
  "Narrativa e preço".
- **Finalizado em 14/09 (o dono pediu "finalize tudo"; cache `omh-cache-v14`),
  verificado no navegador:**
  - "Por que a sua não serve" em **todas** as 183 alternativas erradas dos 7 quizzes.
  - Perguntas de definição viraram cenário (M2 q2 FOMO, M4 q1 catálise); M3 q4
    atualizado para o pilar social novo.
  - **Glossário na Revisão:** marcar um termo como estudado põe duas perguntas na fila
    (pela definição e por uma situação), com 3 alternativas da mesma categoria.
  - Pergunta "Confira antes de seguir" no fim de partes das abas longas (M3 Narrativas,
    Social e Técnico; M6 Números e Contrato), corrigida na hora.
  - Ordem dos cenários do simulador sorteada a cada visita.
  - **Barra de progresso mede domínio:** metade do módulo agora é o acerto no quiz (6 de
    8 dão 37,5 de 50), não só ter respondido. Reversível em `progressoDoModulo`.
  - "Próxima ação" única no topo da tela de início.
  - LP travada corrigida onde ainda era tratada como sinal de segurança: M4 (checagem,
    destaque, quiz q4), M2 (fases) e glossário (Mazorra 2022; pool do pump.fun é do
    protocolo).
  - 13 prompts de vídeo novos (M3 práticas, M6, M7, Checklist): 46 no total. Com 46
    vídeos, 4 minutos já passam de 1 GB no bitrate do primeiro — o README explica.
- **Não feito, de propósito:** 3 alternativas em vez de 4 nos quizzes. A pesquisa diz
  que a 4ª não prejudica a medida e não mede ganho de aprendizagem com a troca; tirar
  alternativa quebraria respostas salvas. As perguntas do glossário na Revisão já usam 3.
- **Conferido ao vivo em 14/09:** o "Meme Coin Factories" não aparece na lista de aceitos
  do site do CCS 2026 — segue como preprint no app.

**Pendências menores (não bloqueiam publicar):**
- **Vídeos dos conteúdos novos:** o gerador `scripts/gerar-prompts-de-video.mjs` tem a
  lista fixa dos 33 vídeos dos Módulos 1 a 5. M6, M7, Checklist e as duas abas novas do
  M3 não têm prompt.
- **"~85 SOL" da graduação** — continua NÃO VERIFICADO para hoje (escrito com a data).
- **Menu "Authority" do Solscan:** o clique no navegador interno não abriu o menu em
  13/09. Segue como inferência pela documentação (marcado no M6).
- **Módulo 5, fluxo de decisão:** ainda cita "LP travada" como checagem; a pesquisa 7
  mostra que a trava não separa golpe de não golpe. Ajuste opcional, apontando para o
  Checklist.
- **Coletor da Fase 1, quando aprovado:** gravar também o programa de token e as
  extensões de cada mint. Todo token do pump.fun hoje é Token-2022 (24 de 24 na
  verificação de 12/09); medir isso em escala é barato e alimenta o checklist.

**Correções já feitas (11/09/2026), verificadas no navegador, ainda não publicadas:**
- ~~`src/views/inicio.js:16` mandava "começar pelo Módulo 2"~~ → corrigido para
  Módulo 1 ao 5.
- ~~Módulo 3, item J7 Tracker dizia "não confirmado"~~ → corrigido: a ferramenta
  existe (j7tracker.io), mas é de **sniping e deploy**, não tracker de narrativa.
- ~~"US$ 69 mil" fixo em `cenarios.js`, `glossario.js` e `modulo4.js`~~ → trocado por
  faixa observada (US$ 11 mil a US$ 101 mil); não há limiar em dólar, só em SOL.
- ~~Módulo 2 sem número para "a maioria vai a zero"~~ → `observacaoFases` ganhou a
  tabela de mortalidade (CoinGecko: 68,67% no dia, 4,55% além de 90 dias) e a
  contestação pública da pump.fun ao número da Solidus Labs.
- ~~Módulo 5 sem o dado do Uniswap Labs~~ → acrescentado na seção "o venue muda o
  custo": 140 pontos-base por dólar em memecoin contra 22 num par estável.

**Correções ainda pendentes, fora de escopo por ora (são conteúdo novo, não fix):**
- Módulo 5: `tabelaOrdens`, `checklistExecucao` e `errosComuns` estão vazios,
  esperando a continuação de uma pesquisa. A view já ignora bloco vazio.
- Módulo 1: a transcrição do vídeo de gas está vazia. É hoje o único elemento do hub
  sem versão em texto.

## Como verificar qualquer coisa no app

Servidor local em `.claude/launch.json` (`http-server -c-1`, sem cache). Auditar pelo
DOM, não por captura de tela. As armadilhas conhecidas estão na memória do projeto.

Fato de mercado (programa do token, extensões, autoridades) se confere na cadeia, pelo
RPC público da Solana — método em `pesquisa/modulos/pesquisas/VERIFICACOES-AO-VIVO.md`.
Número tirado de paper se confere no texto (HTML do arXiv), nunca em resumo automático:
foi resumo automático que gerou os erros corrigidos em 13/09.
