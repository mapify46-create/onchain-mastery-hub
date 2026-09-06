# onchain-mastery-hub
Central de estudos local e interativa para aprender, do zero, trading on-chain e memecoins (Solana e EVM). Dark mode, 100% no navegador, sem backend.

## Aviso
Conteúdo educacional. NÃO é aconselhamento financeiro, jurídico ou tributário. Trading de memecoins é de altíssimo risco; a maioria dos tokens perde todo o valor.

## Requisitos
- Um navegador moderno (Chrome, Edge, Firefox).
- Um servidor estático local (os módulos ES não funcionam abrindo o arquivo direto).

## Como abrir localmente (Windows) — escolha uma opção
1. VS Code + extensão Live Server: abra a pasta e clique em "Go Live".
2. Node: `npx serve` e abra o endereço mostrado.
3. Python: `python -m http.server 5500` e abra http://localhost:5500

## Estrutura
- index.html — página única
- src/ — app.js, router.js, store.js, ui.js, components/, views/, data/
- styles/custom.css — ajustes de estilo
- Conteúdo editável em src/data/*.js

## Como adicionar/editar conteúdo
Edite os arquivos em src/data/ (modulo1..4, cenarios, glossario). Não é preciso mexer na lógica.

## Progresso
Seu progresso (checklists, glossário, quizzes, simulador) fica salvo no localStorage do seu navegador.

## Estado atual do conteúdo
Os quatro módulos, o Glossário e o simulador estão prontos. O conteúdo do Módulo 1
(Fundamentos & Segurança) foi escrito a partir de duas pesquisas independentes — os
arquivos `PESQUISA-MODULO-1-A.md` e `PESQUISA-MODULO-1-B.md`, na raiz do projeto,
guardam as fontes originais e ficam disponíveis para conferência.
