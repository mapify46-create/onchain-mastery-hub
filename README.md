# onchain-mastery-hub
Central de estudos local e interativa para aprender, do zero, trading on-chain e memecoins (Solana e EVM). Dark mode, 100% no navegador, sem backend.

## Aviso
Material de estudo próprio. Memecoin é o ativo de maior risco do mercado: 68,67% dos tokens do Pump.fun pararam de negociar no mesmo dia em que nasceram (CoinGecko Research).

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
- manifest.json + service-worker.js + assets/icons/icon.svg — PWA (ver seção abaixo)
- Conteúdo editável em src/data/*.js

## Instalar como app (PWA)
O hub pode ser instalado como um aplicativo — no computador (Chrome/Edge mostram um
ícone de instalar na barra de endereço) ou no celular ("Adicionar à tela inicial").
Depois da primeira visita, ele continua abrindo mesmo sem internet, graças ao
`service-worker.js`. Isso só funciona quando o site está servido por HTTPS (ou em
`localhost`) — abrir o `index.html` direto do disco não ativa esse recurso.

Se você editar algum arquivo do app (não conteúdo de `src/data/`, mas lógica em
`src/app.js`, `src/router.js` etc.), aumente o número em `CACHE_VERSAO` no topo de
`service-worker.js` — sem isso, quem já instalou continua vendo a versão antiga
guardada em cache.

## Como adicionar/editar conteúdo
Edite os arquivos em src/data/ (modulo1..4, cenarios, glossario). Não é preciso mexer na lógica.

## Progresso
Seu progresso (checklists, glossário, quizzes, simulador) fica salvo no localStorage do seu navegador.

## Estado atual do conteúdo
Os sete módulos, a página Checklist antes de comprar (com o fluxograma dos dois
pilares), o Glossário e o simulador estão prontos. As pesquisas dos Módulos 3 (reforma),
6 e 7 e do Checklist estão em `pesquisa/modulos/`. O conteúdo do Módulo 1
(Fundamentos & Segurança) foi escrito a partir de duas pesquisas independentes — os
arquivos `PESQUISA-MODULO-1-A.md` e `PESQUISA-MODULO-1-B.md`, na raiz do projeto,
guardam as fontes originais e ficam disponíveis para conferência.
