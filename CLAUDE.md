# CLAUDE.md — onchain-mastery-hub

## O que é
Hub de estudos local, estático, 100% no navegador, em pt-BR, para aprender trading on-chain e memecoins do zero.

## Stack (NÃO mudar sem pedir)
- HTML5 + Tailwind via Play CDN (dev only) + JavaScript puro com ES Modules.
- Mermaid via CDN (import ESM) para fluxogramas.
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
