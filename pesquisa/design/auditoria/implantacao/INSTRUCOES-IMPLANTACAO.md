# Implantação do desenho — instruções comuns (etapa 1: componentes)

## Contexto
Projeto: `C:/Users/dreis/Documents/onchain-mastery-hub` — hub de estudos estático em pt-BR,
HTML + Tailwind (Play CDN) + JavaScript puro com ES Modules. **Sem build, sem npm, sem
framework, sem dependência nova.** Leia `CLAUDE.md` na raiz. O dono não programa: código
simples, funções pequenas, **comentários em português**, no mesmo estilo dos arquivos que já
existem (`criarElemento` e `html``/svg`` de `src/ui.js`).

O dono desenhou todas as telas no Claude Design. A implantação anterior saiu diferente do
desenho e inventou rótulos. Foi feita uma auditoria completa. Agora estamos reimplantando,
**fiel ao desenho, sem simplificar**. Leia antes:
- `pesquisa/design/auditoria/README.md` — diagnóstico, erros, onde o desenho erra (seguir
  `src/data`, não o desenho), **as decisões do dono** e o plano.
- `pesquisa/design/handoff/README.md` — tokens, medidas, estados, acessibilidade.
- O relatório da sua área em `pesquisa/design/auditoria/*.md` (indicado no seu pedido).
- Os desenhos em `pesquisa/design/handoff/designs/*.dc.html` (marcação no `<x-dc>`, dados e
  lógica no `renderVals()` do `<script type="text/x-dc">`). O componente de referência de
  cada peça está em `00 Componentes.dc.html`; o uso real, nos arquivos `M1..M7 Desktop`.
  **A vitrine `00 Componentes` põe "Relação: …" e títulos em cada peça; os módulos não.**

Decisões do dono (18/09): manter "Antes de ler", "Parte X de N" e "Confira antes de seguir"
JUNTO com a "Pergunta rápida" do desenho (no traço do desenho); progresso do módulo pelo
acerto (não mudar `store.js`); quiz corrigido **por pergunta** como a tela 34; Chart.js sai
quando o último uso sair (não é tarefa desta etapa); funções que o desenho não mostra
(sidebar com %, instalar, limpar, vídeos) ficam.

## Regras de trabalho
- **Mexa só nos arquivos que o seu pedido lista como seus.** Outros agentes trabalham ao
  mesmo tempo em outros arquivos. Se o Edit falhar porque o arquivo mudou, leia de novo e
  refaça só o seu trecho.
- **Não quebre quem já chama o componente.** As views (`src/views/*.js`) serão refeitas
  na etapa 2; até lá, as chamadas atuais precisam continuar funcionando (sem erro no
  console). Acrescente opções novas; não remova export nem mude assinatura sem manter o
  formato antigo funcionando.
- Nenhum texto novo na tela que não esteja no desenho ou em `src/data`. Nenhum número
  novo. Rótulos do desenho que forem dado (não interface) vão para `src/data`.
- Tokens exatos do README do handoff (13 cores, raios 12/8/999/6, 44px de toque, foco
  `2px #22D3EE offset 2`, texto vermelho sempre `#F87171`, trios de estado .4–.5 / .10–.15).
- Layout responsivo em CSS (`auto-fit/minmax`, `@media`), nunca medindo `window.innerWidth`.
- Não publique, não faça commit, não mexa em `service-worker.js` (eu faço no fim).

## Verificação (obrigatória antes de terminar)
Servidor em `http://localhost:8084` e Chrome headless na porta 9555 já rodando (não pare).
Não use as ferramentas `mcp__Claude_Browser__*`. Use o script de captura (ele já ignora o
service worker e o cache):
```
cd "C:/Users/dreis/AppData/Local/Temp/claude/C--Users-dreis-Documents-onchain-mastery-hub/c6d85c7e-adeb-4e71-a56b-8b4f28704e46/scratchpad"
node shot.mjs "shots/<prefixo-unico>" "<url>" [largura] ["<js antes de capturar>"] [faixa]
```
(ignore a linha final `Assertion failed ... async.c`). Veja as imagens com Read. Compare lado
a lado com o desenho (`http://localhost:8084/pesquisa/design/handoff/designs/00%20Componentes.dc.html`
ou o módulo). Confira também **erros no console**: rode no `js` algo como
`(async()=>{await new Promise(r=>setTimeout(r,800));return document.querySelectorAll('[role=img]').length})()`
e, para erros, abra a página e verifique que a view montou (o `<main id=conteudo>` tem filhos).
Teste 1280px e 390px. Teclado: foco visível e as teclas que o desenho pede.

Teste de fumaça (obrigatório no fim): `node fumaca.mjs http://localhost:8084 1280` e
`node fumaca.mjs http://localhost:8084 390` na mesma pasta — abre todas as telas e abas e
lista exceções, erros de console e rolagem lateral. O resultado tem de sair sem nenhuma
linha de erro/exceção e sem "rola para o lado".

Se o Chrome da porta 9555 cair (ECONNREFUSED), suba de novo em segundo plano:
`"C:/Program Files/Google/Chrome/Application/chrome.exe" --headless=new --disable-gpu --no-first-run --remote-debugging-port=9555 --user-data-dir="C:\Users\dreis\AppData\Local\Temp\claude\C--Users-dreis-Documents-onchain-mastery-hub\c6d85c7e-adeb-4e71-a56b-8b4f28704e46\scratchpad\perfil-teste" about:blank`.
Se `http://localhost:8084` parar de responder, suba em segundo plano:
`npx http-server "C:/Users/dreis/Documents/onchain-mastery-hub" -c-1 --silent -p 8084`.

## Resposta final
Devolva: arquivos alterados; a API nova de cada componente (assinatura e exemplo de
chamada, para a etapa 2 usar); o que ficou igual ao desenho; o que não deu (com motivo);
e 1 ou 2 capturas-chave (caminho do PNG).
