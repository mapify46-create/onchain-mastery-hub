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

**O rótulo de rug ainda não está escrito — de propósito.** O paper de referência
("Catching the Rug", arXiv:2608.20271, preprint) define rug como **queda de 99% do TVL
desde o pico** OU **token parado por mais de 80% da própria vida** (seção V-B). Serve de
ponto de partida. *(Corrigido em 13/09: antes este arquivo dizia que esses limiares não
tinham sido publicados.)* A metade de liquidez **não é reconstruível** (o
`reserve_in_usd` do GeckoTerminal só tem o valor de agora); a de inatividade e a de preço
são. Instrução do dono: começar a fotografar liquidez e a reconstruir 6 meses de preço já;
o rótulo só é fixado por escrito depois, e ninguém analisa nada antes disso.

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
