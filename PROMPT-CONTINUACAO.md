# Prompt para continuar em outro chat

Cole o bloco abaixo inteiro como primeira mensagem do chat novo (Claude Code, na pasta
`C:\Users\dreis\Documents\onchain-mastery-hub`).

---

```
Estou continuando o projeto onchain-mastery-hub de onde parei num chat anterior. Leia, nesta ordem, antes de fazer qualquer coisa:
1. CLAUDE.md (regras da stack: HTML + Tailwind CDN + JavaScript puro, sem build, sem npm, sem framework; conteúdo em src/data/*.js; nenhuma dependência nova sem me perguntar; nenhum número inventado — marcar "não verificado").
2. pesquisa/observador/ESTADO.md (estado do projeto, decisões e pendências — é a página de retomada).
3. pesquisa/design/handoff/README.md (o handoff do Claude Design; os desenhos estão em pesquisa/design/handoff/designs/*.dc.html) — é a referência visual: tudo no app deve seguir esse traço, sem simplificar.

QUEM SOU: o dono do projeto, sem experiência em programação, aprendendo trading on-chain do zero. Responda em português, curto (até 3 passos), e quando houver conta, me dê a conta.

REGRAS QUE NÃO MUDAM:
- Zero dinheiro real, zero chave privada. O observatório nunca opera.
- Eu escrevo a regra de decisão e o rótulo de rug ANTES de ver os dados (já está em pesquisa/observador/ROTULO-PRE-REGISTRO.md). Você não escreve regra de compra.
- Nada se apaga; todo evento observado fica registrado.
- Toda dependência nova pede permissão antes.
- Qualquer número, taxa ou comportamento de API citado tem que vir dos documentos; se faltar, diga que vai pesquisar.
- Ao fim de cada etapa, atualize pesquisa/observador/ESTADO.md.
- Commit e push só quando eu mandar ("publique").
- Ao editar arquivos do app, aumente CACHE_VERSAO em service-worker.js (hoje v20) e liste arquivos novos em ARQUIVOS_DO_APP.

O QUE JÁ ESTÁ FEITO E PUBLICADO (site: https://mapify46-create.github.io/onchain-mastery-hub, último commit 39455db):
- 7 módulos, Glossário, Checklist, Revisão espaçada, Início. Texto reescrito para didática clara (src/components/secao.js: ideia central, quadro, exemplo, "Para ir mais fundo").
- Vocabulário visual no traço do handoff (src/components/visuais.js): mapa mental com ramos que abrem a aba, sequência como tablist com teclado, ciclo em SVG, grade de 100, barras sólido/tracejado/listrado, curva deslizante.
- Fluxogramas desenhados pelo próprio app (src/components/fluxograma.js), sem Mermaid; 12 diagramas lidos.
- As 6 animações (src/components/animacoes.js): pool x·y=k (M6), drainer e endereço quase igual (M1), sanduíche e caminho do token (M5), vida de uma narrativa (M3).
- 46 prompts de vídeo em pesquisa/videos (gerados por scripts/gerar-prompts-de-video.mjs). Estou criando os vídeos no Gemini e vou mandar os resumos para virarem a transcrição no app.

ARMADILHAS DE VERIFICAÇÃO (leia antes de testar no navegador):
- O service worker é cache-first: antes de testar, desregistre o SW e limpe os caches.
- O painel do navegador do Claude Code guarda os módulos por URL e ignora cache:'reload'. Para ver a versão nova, suba o servidor em OUTRA porta (.claude/launch.json tem onchain-mastery-hub-8081 … 8093).
- Audite pelo DOM, não por screenshot (a aba pode parar de pintar).
- No site publicado, use fetch(url, {cache:'reload'}) por arquivo e espere o deploy do GitHub Pages (~1 min).

PENDÊNCIAS (em ordem):
1. Vídeos: quando eu mandar o resumo de cada vídeo, ligar na aba certa do módulo (campo `transcricao` em src/data/moduloN.js) e checar o limite de 1 GB do site (ver pesquisa/videos/README.md).
2. Decisões minhas ainda abertas: (a) manter ou tirar pesquisa/observador/PROMPT-CHATGPT.md do GitHub (está público, sem segredos); (b) gerar a chave da GMGN OpenAPI; (c) confirmar o GeckoTerminal como fonte única de preço e liquidez do observatório.
3. Observatório (depois do app): plano em pesquisa/observador/COMO-FUNCIONA.md (quatro relógios, tabelas SQLite, relatório), rótulo em ROTULO-PRE-REGISTRO.md, Telegram em PLANO-TELEGRAM.md. Roda no meu PC com Node 24 (SQLite nativo, sem dependência). Ordem de construção: banco + registro de coletas → descoberta de graduações (GMGN) → acompanhamento de preço/liquidez (GeckoTerminal) → janela dos 5 minutos → contrato (RPC) → relatório → placar.
4. Itens marcados "não verificado" seguem assim até existir fonte: preço dos Boosts do DexScreener, aceitação do estudo Meme Coin Factories no CCS, data dos futuros de MOODENG, "~85 SOL" para graduar, menu Authority do Solscan.

Como primeira ação: leia os três arquivos acima, me diga em até 5 linhas o que entendeu e pergunte por onde eu quero começar.
```
