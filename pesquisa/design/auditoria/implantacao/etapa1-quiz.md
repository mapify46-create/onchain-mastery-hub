# quiz

## Relatório inicial
Quiz e blocos de didática estão no desenho da tela 34. Mexi só nos meus dois arquivos. O teste de fumaça saiu limpo em 1280 e em 390: nenhum erro, nenhuma exceção, nada rola para o lado. A primeira rodada em 1280 deu um aviso de tempo esgotado ao carregar o Chart.js (rede, no `grafico.js`, que não é meu); a segunda saiu limpa.

As capturas do app rodaram numa janela isolada do Chrome, com localStorage próprio, para não mexer no estado dos outros agentes. O perfil compartilhado ficou com `omh_state_v1 = null`.

## Arquivos alterados
- `C:/Users/dreis/Documents/onchain-mastery-hub/src/components/quiz.js`
- `C:/Users/dreis/Documents/onchain-mastery-hub/src/components/didatica.js`

**Como encontrei:** o agente anterior já tinha reescrito quase tudo, e a lógica estava certa. Corrigi quatro pontos:
- **Círculo da alternativa:** passou para 24px no total (20px por dentro mais 2px de borda), que é o tamanho com que ele aparece no desenho. Medi: o desenho mostra 24px porque o CSS dele soma a borda à largura. Com isso o texto da alternativa cai na mesma posição (x=96) e a altura fica igual (47px).
- **Teclado nos grupos de rádio:** o Tab agora entra uma vez só em cada grupo (na escolhida ou na primeira) e as setas escolhem. Vale para alternativas, confiança e "Antes de ler".
- **"Marcar módulo como concluído":** lê o estado na hora do clique, e não mais quando o botão foi criado.
- **didatica.js:** "Antes de ler", "Confira" e o rodapé "Continuar / Mostrar tudo" passaram a raio 8. O feedback do "Confira", que recebe o foco, ficou sem contorno e com o raio 8 fixo, para a regra de foco não trocar para 4px.

## API para a etapa 2
```js
montarQuiz({ id, titulo, descricao, perguntas,          // chamada antiga continua igual
  moduloNome = '', moduloId = '', salvar = true, emCard = true, nivelTitulo = 2 })
// ex.:
montarQuiz({ id: 'modulo-6', titulo: 'Mini-quiz do Módulo 6',
  descricao: 'Oito perguntas. As respostas ficam salvas no navegador.',
  perguntas: juntarPorques(modulo6.quiz, modulo6.porqueErradas),
  moduloNome: 'Módulo 6', moduloId: 'modulo-6' })

montarPerguntaRapida({ id, pergunta, moduloNome })  // 1 pergunta, "Pergunta rápida" em <h3>, sem card, salvar:false
// ex.: montarPerguntaRapida({ id: 'm6-rapida-q1', pergunta: juntarPorques(modulo6.quiz, modulo6.porqueErradas)[0], moduloNome: 'Módulo 6' })
```
- `quiz.js` também exporta, para reuso: `juntarPorques`, `LIMIAR_PARA_REFAZER` (0.8), `MICRO_ROTULO`, `mostrar`, `pintarAlternativa`, `criarAlternativa`, `preencherFeedback`, `navegarComSetas`, `ajustarTabDoGrupo`.
- `didatica.js` mantém as mesmas assinaturas: `montarSegmentos({ partes })`, `montarPerguntaPrevia({ id, pergunta })`, `montarPerguntaDaParte({ pergunta })`, `montarTermos(termos)`.

## Igual ao desenho (conferido em M6 e M1, em 1280 e 390)
- **Pergunta:** caixa interna, "Pergunta N de M · Módulo", texto de 17px e `radiogroup` com `aria-labelledby`.
- **Alternativas:** 44px ou mais, a escolhida em roxo, e depois de corrigir as marcas "A resposta certa." e "Foi a sua." embaixo do texto; as demais a 0,7.
- **Confiança obrigatória:** 3 pílulas de 44px, a escolhida em ciano; depois de corrigir ficam travadas e à vista, com "Você disse: …".
- **"Ver resultado" por pergunta:** só libera com alternativa e confiança, com a dica de 3 estados em `role=status`.
- **Feedback:** selo Certa/Errada; caixa verde ou vermelha com título colorido e `aria-live`; dentro dela, "Por que a sua não serve" e "Certeza e erro".
- **Placar:**
  - caixa roxa, "Você acertou X de N." e o % em Mono;
  - barra de 3 partes, com legenda e `aria-label`, que dá exatamente o texto do desenho;
  - mensagem por limiar (100%, de 80 a 99%, abaixo de 80%) e a caixa âmbar dos erros com certeza;
  - link "Revisão" com os dias tirados de `ESCADA_DIAS`;
  - "Refazer o quiz" e "Marcar módulo como concluído", que vira "Desmarcar módulo";
  - o foco vai para o placar.

**Gravação, testada:**
- Nada é gravado antes da última pergunta; depois o formato é exatamente `{acertos,total,respostas,confiancas}`.
- Ao recarregar, o quiz reabre corrigido e com o placar.
- "Refazer" apaga o resultado salvo.
- A pergunta rápida não grava nada.
- O botão de concluir alterna `modulosConcluidos`.

**Didática:** o erro sai em vermelho, com "Por que a sua não serve" dentro do feedback; os botões têm 44px; os termos estão em `auto-fit/minmax(200px,1fr)` (3 colunas em 1280, 1 em 390).

## O que não deu, e por quê
- **Link "Revisão" sublinhado:** o desenho não sublinha, mas ciano sobre o cinza do texto dá cerca de 1,4:1 e reprova no AA quando a cor é a única diferença entre link e texto (WCAG 1.4.1). Mantive o sublinhado, igual ao de `linhaDoTempo.js`.
- **"Marcar módulo como concluído" e "· Módulo N":** só aparecem quando a view passar `moduloId` e `moduloNome`. As views atuais não passam (é trabalho da etapa 2). Testei montando o quiz direto na página.
- **Pergunta rápida com 1 pergunta:** mostra o placar completo ("Você acertou 1 de 1.", barra e "Refazer"). É o "mesmo visual" que a tarefa pede, mas fica pesado para uma pergunta só; vale o dono olhar.

## Capturas-chave
Todas em `C:/Users/dreis/AppData/Local/Temp/claude/C--Users-dreis-Documents-onchain-mastery-hub/c6d85c7e-adeb-4e71-a56b-8b4f28704e46/scratchpad/shots/`:
- `qzi-app-m6-estados-1.png` (acertou, errou com certeza, falta a confiança) × `qzi-des-Errou_com_certeza.png`
- `qzi-app-harness-b.png` (placar com o botão de concluir) × `qzi-des-Placar_do_fim.png`
- Em 390: `qzi-app-cel-estados-1.png` × `qzi-des-cel-Errou_com_certeza.png`

## Correção 1
Corrigi os três defeitos. Em um ponto do terceiro (alternativas e botões) usei um valor diferente do que o revisor sugeriu, porque as medidas do desenho contradizem a sugestão. Mexi só em `src/components/quiz.js` e `src/components/didatica.js`. O teste de fumaça saiu limpo em 1280 e em 390: sem exceção, sem erro no console e sem "rola para o lado". Todas as medidas abaixo foram tiradas com o mesmo script no desenho 34 e no app.

## Defeitos
1. **Placar com raio 4px ao receber foco pelo teclado: corrigido.** O raio foi para o `style` (`style: RAIO_CAIXA`) e saiu o `rounded-lg`. Testei com teclas de verdade (Tab, depois Enter em "Ver resultado" da última pergunta): o placar fica focado, com `:focus-visible` ativo, raio 8px e sem contorno. Fiz o mesmo no próprio "Ver resultado", que também caía para 4px no foco pelo teclado.
2. **"Ver resultado" com cursor de seta e 46px de altura: corrigido.**
   - Acrescentei `enabled:cursor-pointer` e `leading-[normal]`. Não usei `leading-none` nem `leading-[1.2]`, como o revisor sugeriu: no desenho a altura de linha do botão é "normal". Mede 139×44 como no desenho, com mãozinha quando liberado e "proibido" quando bloqueado.
   - Passei `class: 'cursor-pointer'` no `criarBotao` de "Refazer o quiz" e de "Marcar/Desmarcar módulo", sem mexer em `ui.js`.
   - Fiz o mesmo em "Continuar", "Mostrar tudo" e "Tentar de novo" (`didatica.js`).
3. **Altura de linha dos textos de 12px e 14px: corrigido, com uma diferença.**
   - **Onde segui o revisor (`leading-[1.6]`):** micro-rótulo, selo, os três parágrafos do feedback, textos do placar, título e % do placar, e o título do quiz (32px, como na "Pergunta rápida" do M6). Em `didatica.js`: o rótulo "Antes de ler" e os "Termos desta aba".
   - **Onde não segui:** nas alternativas, na marca "A resposta certa." / "Foi a sua." e nas pílulas de confiança. No desenho todos são botões, que só herdam a fonte (`button{font-family:inherit}`), então a altura de linha é "normal". Medi 17px no texto, 15px na marca e 58px na alternativa com marca. Com 1,6 ficariam maiores que o desenho. Usei `leading-[normal]`, que dá exatamente essas medidas.
   - **Resultado, igual ao desenho:** caixa "antes" 496,8px, caixa do acerto 571,3px, feedback do acerto 74,8px, feedback do erro 206px, selo 23,2px, micro-rótulo 19,2px.
   - **A mais:** a barra do placar passou de 22px para 24px no total (22 por dentro mais a borda, como no desenho). A figura agora mede 52,8px, igual ao desenho.

## API final (a mesma de antes, nenhuma assinatura mudou)
- **Quiz do módulo:** `montarQuiz({ id, titulo, descricao, perguntas, moduloNome?, moduloId?, salvar = true, emCard = true, nivelTitulo = 2 })`
  ```js
  montarQuiz({ id: 'modulo-6', titulo: 'Mini-quiz do Módulo 6',
    descricao: 'Oito perguntas. As respostas ficam salvas no navegador.',
    perguntas: juntarPorques(modulo6.quiz, modulo6.porqueErradas),
    moduloNome: 'Módulo 6', moduloId: 'modulo-6' })
  ```
- **Pergunta rápida:** `montarPerguntaRapida({ id, pergunta, moduloNome })`, por exemplo `montarPerguntaRapida({ id: 'm6-rapida-q2', pergunta: P[1], moduloNome: 'Módulo 6' })`. Não grava nada; o título sai em `<h3>` e o bloco vai dentro do card da seção.
- **Porquês das erradas:** `juntarPorques(perguntas, mapaDePorques)`.
- **Blocos de didática** (`didatica.js`):
  - `montarSegmentos({ partes: [{ titulo, conteudo: [nós], pergunta? }] })`
  - `montarPerguntaPrevia({ id, pergunta })`
  - `montarPerguntaDaParte({ pergunta })`
  - `montarTermos([{ termo, definicao }])`
- **Peças compartilhadas** (exportadas de `quiz.js`): `MICRO_ROTULO`, `criarAlternativa`, `pintarAlternativa`, `preencherFeedback`, `ajustarTabDoGrupo`, `navegarComSetas`, `mostrar` e `LIMIAR_PARA_REFAZER`.

Chamadas atuais das 7 views continuam funcionando. Também conferi que:
- a "Pergunta rápida" não grava nada;
- "Marcar módulo como concluído" alterna para "Desmarcar módulo" e salva o progresso.

O estado de teste foi apagado (`omh_state_v1`).

## Capturas-chave
Ficam em `C:/Users/dreis/AppData/Local/Temp/claude/C--Users-dreis-Documents-onchain-mastery-hub/c6d85c7e-adeb-4e71-a56b-8b4f28704e46/scratchpad/shots/`:
- `qzfix-m6-1280-b.png`: acertou.
- `qzfix-m6-1280-c.png`: errou com certeza.
- `qzfix-m6-1280-d.png`: placar 6 de 8, 75%.
- `qzfix-m6-390-c.png` e `qzfix-m6-390-d.png`: os mesmos estados em 390px.
- `qzfix-kb-placar-a.png`: placar focado pelo teclado, raio 8px.
- `qzfix-did-1280-b.png`: "Confira antes de seguir" depois de errar.
- `qzfix-m1-390-a-1.png`: quiz do Módulo 1 em 390px.

## Defeitos rodada 2
[
 {
  "item": "Regra do README 'Animação: easing ease puro, sem cubic-bezier' (alternativas, pílulas, 'Ver resultado' e botões da área)",
  "onde": "src/components/quiz.js:125 (alternativa), :364 ('Ver resultado'), :459 (pílulas); botões do criarBotao usados em quiz.js:526/632 e didatica.js:84/91/237; aba Quiz e aba Os números do #/modulo-6",
  "desenho": "README do handoff, seção Animação: '150ms: cor de botão, link, borda em hover' e 'Easing: ease puro. Sem cubic-bezier, sem spring, sem bounce.' No desenho 34 esses controles nem têm transição.",
  "app": "getComputedStyle mede transition-duration 0.15s (certo) e transition-timing-function cubic-bezier(0.4, 0, 0.2, 1), o padrão do Tailwind v4 para transition-colors. Vale para as alternativas, as pílulas, 'Ver resultado', 'Refazer o quiz', 'Marcar módulo', 'Continuar', 'Mostrar tudo' e 'Tentar de novo'. O mesmo valor aparece fora da área ('Instalar app', 'Limpar progresso'): o defeito vale para o app inteiro, não é só do quiz.",
  "gravidade": "baixa",
  "correcao": "Correção global, fora dos arquivos desta área: acrescentar `--default-transition-timing-function: ease;` ao @theme do index.html. Se a correção tiver de ficar só na área, acrescentar a classe `ease-[ease]` junto de cada `transition-colors duration-150` em quiz.js (pintarAlternativa, pílulas, 'Ver resultado')."
 },
 {
  "item": "Regra do README 'Hover: botão primário opacity .85' ('Ver resultado')",
  "onde": "src/components/quiz.js:364 (enabled:hover:bg-primaria/85)",
  "desenho": "README, seção Estados: 'Hover: clarear a borda… Botão primário: opacity: .85'. No desenho 34, o 'Ver resultado' não tem hover (não há style-hover no botão, :58).",
  "app": "Hover medido com o mouse de verdade (CDP mouseMoved, :hover = true): opacity 1, fundo oklab(roxo / 0.85), borda rgb(124,58,237) inteira e texto #FFFFFF inteiro. Só o fundo fica transparente, e sobra um anel de 1px de borda roxa cheia em volta. O criarBotao 'primario' de ui.js tem o mesmo padrão (hover:bg-primaria/85).",
  "gravidade": "baixa",
  "correcao": "Trocar `enabled:hover:bg-primaria/85` por `enabled:hover:opacity-85` no 'Ver resultado', como pede o README. Se o dono preferir manter o padrão atual do criarBotao, basta registrar a divergência. Não é regressão: o desenho 34 não define hover para esse botão."
 }
]

## Correção 2
(nenhuma)
