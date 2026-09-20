# CLAUDE.md — onchain-mastery-hub

## O que é
Hub de estudos local, estático, 100% no navegador, em pt-BR, para aprender trading on-chain e memecoins do zero.

## Stack (NÃO mudar sem pedir)
- HTML5 + Tailwind via Play CDN (dev only) + JavaScript puro com ES Modules.
- Fluxogramas, mapas, ciclos, grades e barras são desenhados pelo próprio app, em
  SVG (src/components/fluxograma.js, visuais.js). Mermaid via CDN continua só como
  reserva, se o desenho próprio não conseguir ler o diagrama (src/components/diagrama.js).
- Chart.js saiu do projeto em 19/09/2026 (decisão do dono): nenhum gráfico usa mais
  biblioteca externa — todos são desenho próprio, no traço do handoff de design.
- SEM build, SEM Vite, SEM npm, SEM backend. Nada de frameworks (React/Vue).
- Persistência só com localStorage (chave omh_state_v1).

## Convenções
- Idioma: TODO texto de interface e comentários em português do Brasil.
- Conteúdo em src/data/*.js (JSON-like), separado da lógica.
- Dark mode por padrão; acessibilidade AA; HTML semântico; navegação por teclado.
- Código simples e comentado (o dono é iniciante). Funções pequenas.
- Servir sempre por HTTP local (ES Modules quebram em file://).

## Regras
- Não adicionar dependências novas sem me perguntar.
- Não inventar dados de mercado nem citações; marcar "não verificado" quando aplicável.
- Nada de aconselhamento financeiro; manter o disclaimer visível.
