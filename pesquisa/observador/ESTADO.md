# Estado do projeto — leia isto primeiro

> 11/09/2026. Uma página. Serve para retomar o trabalho numa sessão nova sem
> precisar do histórico da conversa.

## As duas frentes

**1. O hub (`onchain-mastery-hub` / app "mmc")** — pronto e publicado.
5 módulos, ~34 mil palavras, 5 a 6 horas de estudo. As 24 abas seguem o padrão visual
da aba Taxas do Módulo 5. Site no GitHub Pages, app desktop v1.1.0 com link de
download público.

**2. O observatório (`pesquisa/observador/`)** — pesquisa concluída, sem código ainda.
Sistema que observa, testa hipóteses no papel e mede o mercado. **Nunca opera.**

## Onde ler o detalhe

| Assunto | Arquivo |
|---|---|
| Regras do projeto e da stack | `CLAUDE.md` (raiz) |
| O que é o observatório, em fases | `pesquisa/observador/PLANO.md` |
| **As sete pesquisas cruzadas, com as decisões** | `pesquisa/observador/SINTESE-FASE-0.md` |
| Os documentos originais da pesquisa | `pesquisa/observador/fase0/` (11 arquivos) |
| Prompts das pesquisas, se precisar refazer | `pesquisa/observador/PROMPTS-PESQUISA.md` |
| Prompts dos 33 vídeos | `pesquisa/videos/README.md` |

## O achado que decide o observatório

Com o atraso obrigatório de 2 a 5 minutos, sobra uma deriva bruta de **1,21 pontos
percentuais** para capturar, e o custo de ida e volta em memecoin é de **3 a 6 pontos**.
O líquido é negativo por aritmética. **Recomendação pendente de confirmação: trocar a
hipótese primária de "prever quem sobe" para "detectar quem vai dar rug"**, que é o que
a ciência sustenta e onde a parede de custo não se aplica. Detalhe nas seções 2 e 3 da
síntese.

## Pendências

**Decisões do dono, nenhuma bloqueada por mim:**
1. Confirmar (ou não) a troca da hipótese primária para detecção de rug.
2. Publicar os commits locais: `git push origin master`.

**Trabalho pronto para executar, quando houver decisão:**
- **Fase 1 do observatório:** coletor on-chain. É código, ainda não começou. Vai pedir
  dependências novas (Node com SQLite), o que exige perguntar antes — regra do
  `CLAUDE.md`.

**Correções conhecidas no hub, todas pequenas:**
- `src/views/inicio.js:16` ainda manda "começar pelo Módulo 2". Texto velho de quando
  o Módulo 1 e o 5 não existiam.
- Módulo 3: o item do **J7 Tracker** diz que não há fonte confiável. A pesquisa
  confirmou que a ferramenta existe (j7tracker.io), mas é de **sniping e deploy**, não
  tracker de narrativa.
- Módulo 5: o "US$ 69 mil" da graduação é impreciso — não há limiar em dólar; o valor
  observado vai de US$ 11 mil a US$ 101 mil.
- Módulo 5: `tabelaOrdens`, `checklistExecucao` e `errosComuns` estão vazios,
  esperando a continuação de uma pesquisa. A view já ignora bloco vazio.
- Módulo 1: a transcrição do vídeo de gas está vazia. É hoje o único elemento do hub
  sem versão em texto.

## Como verificar qualquer coisa no app

Servidor local em `.claude/launch.json` (`http-server -c-1`, sem cache). Auditar pelo
DOM, não por captura de tela. As armadilhas conhecidas estão na memória do projeto.
