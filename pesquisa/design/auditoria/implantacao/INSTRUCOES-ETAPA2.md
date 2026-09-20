# Etapa 2 — implantar cada tela no desenho (instruções comuns)

Leia antes, nesta ordem:
1. `INSTRUCOES-IMPLANTACAO.md` (nesta mesma pasta) — contexto, regras de trabalho,
   ferramentas de captura (`shot.mjs`) e de fumaça (`fumaca.mjs`), como reerguer o Chrome e
   o servidor. Tudo lá vale aqui.
2. `pesquisa/design/auditoria/README.md` — diagnóstico, erros, **onde o desenho erra
   (seguir src/data)** e as decisões do dono.
3. O relatório da sua tela em `pesquisa/design/auditoria/` — cada um termina com
   "Trabalho para implantar", arquivo por arquivo. É o seu roteiro.
4. O desenho da sua tela (`pesquisa/design/handoff/designs/*.dc.html`): marcação no
   `<x-dc>` e dados/lógica no `renderVals()`. É a especificação. Leia inteiro.
5. `APIS-ETAPA1.md` (nesta pasta) — os componentes prontos da etapa 1 e como chamar.

## O objetivo
A tela do app fica **igual ao desenho**: mesma ordem, mesmos blocos, mesmos visuais, mesmas
medidas, mesmos textos — com o conteúdo lido de `src/data`. Nada de título, rótulo ou
bloco que não esteja no desenho ou em `src/data`.

## Decisões do dono que valem para todas as telas
- **Blocos de didática que só o app tinha** ("Antes de ler", "Parte X de N" com
  Continuar, "Confira antes de seguir"): **ficam**, junto com a "Pergunta rápida" do
  desenho. Ponha-os onde fizer sentido sem quebrar a ordem do desenho (ex.: "Antes de ler"
  no topo da aba, antes da primeira seção; "Confira antes de seguir" no fim da parte), no
  traço do desenho.
- **"Pergunta rápida"** no fim de cada card de seção, exatamente nas seções e com as
  perguntas que o desenho usa (`quiz.qN` → a pergunta N do quiz do módulo): use
  `montarPerguntaRapida` (não grava, não conta no Início).
- **Quiz final** corrigido por pergunta (tela 34), com `moduloNome` ("Módulo N"). O card
  "Terminou o módulo?" continua separado, como nos desenhos dos módulos — não passe
  `moduloId` ao quiz, para não haver dois botões iguais.
- **"O que você leva deste módulo"**: onde o desenho do módulo põe (no fim da aba Quiz).
- **Progresso pelo acerto** (não mude `store.js`). Legendas que digam "quiz respondido
  (50%)" viram "acerto no quiz (50%)".
- **Chart.js sai**: onde a sua tela usa `grafico.js`/Chart.js, troque pelo visual do
  desenho (barras próprias). Não remova o import do Chart.js nem o `grafico.js` — eu faço
  no fim, quando o último uso sair.
- **Vídeos** (`video.js`, campo `transcricao`) ficam, perto da seção a que pertencem.
- **Funções que o desenho não mostra** (instalar, limpar progresso, "Começar a checagem de
  um token novo", exportar/importar) ficam, no traço do desenho.
- **Cabeçalho do módulo**: `criarTitulo('<nome do desenho>', { rotulo: 'Módulo N',
  subtitulo })`; o "Lembrete" âmbar vai dentro do cabeçalho, como no desenho.
- **Onde o desenho erra um dado** (datas, contas, textos de exemplo): siga `src/data`; se
  faltar dado, marque "não verificado" e diga no relatório. **Nenhum número novo.** Textos
  novos do desenho que forem conteúdo (rótulos curtos, "exemplo de forma", legendas)
  vão para `src/data/<sua tela>.js`.
- **M7**: o app **não escreve a regra do aluno**. As 5 partes da regra e os 9 campos do
  diário são campos em branco com "em branco: você escreve"; exemplos rotulados "exemplo de
  forma", sem limiar, percentual ou gatilho; nada digitado é salvo.

## Arquivos
- Seus: a view da sua tela e o arquivo de dados dela (e o componente exclusivo dela, quando
  o pedido disser). **Não edite componentes compartilhados** (`src/components/*.js` que
  não sejam seus, `src/ui.js`, `src/store.js`, `src/router.js`, `index.html`,
  `styles/custom.css`, `service-worker.js`). Se um componente não fizer o que o desenho
  pede, monte a peça como função local na sua view; se for uma mudança pequena e aditiva
  num componente compartilhado, NÃO faça: descreva no relatório ("pedido de mudança"),
  que eu aplico.
- Outros agentes trabalham ao mesmo tempo nas outras telas.

## Verificação (obrigatória)
Capture o desenho e o app, aba por aba, em 1280px e 390px, e compare lado a lado até
ficarem iguais. Meça pelo DOM. Rode `fumaca.mjs` nas duas larguras: zero erro, zero
rolagem lateral. Teclado (abas, mapa, sequências, quizzes) e foco visível.

## Resposta final
Arquivos alterados; o que ficou igual ao desenho, aba por aba; o que ficou diferente e por
quê (dado do desenho errado, decisão do dono, limite); pedidos de mudança em componentes
compartilhados; textos/números que você marcou "não verificado"; 2 ou 3 capturas-chave.
