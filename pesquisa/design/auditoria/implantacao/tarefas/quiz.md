# Tarefa: quiz no desenho da tela 34 + traço do desenho nos blocos de didática

SEUS ARQUIVOS (só estes): `src/components/quiz.js`, `src/components/didatica.js`.
Relatório: `pesquisa/design/auditoria/quiz-simulador.md` (parte do Quiz e "Trabalho › quiz.js"). Desenho: `34 Quiz e Simulador.dc.html` (estados do quiz: antes, acertou, errou com certeza, placar) e a "Pergunta rápida" em `M6 Desktop.dc.html` (~linhas 117, 172…) e `M1 Desktop.dc.html`. Componente Quiz do design system: `pesquisa/design/handoff/designs/_ds/omh-hub-design-system-05e041a1-8f6b-44c1-8038-f16ca9435f23/_ds_bundle.js` (~930-1205).

## quiz.js (decisão do dono: corrigir POR PERGUNTA, como a tela 34)
1. Cada pergunta numa caixa interna (#0B0F17, raio 8, borda #1F2733, padding 20, gap 14) com micro-rótulo "Pergunta N de M · <nome do módulo>" (opção `moduloNome`, ex. 'Módulo 6'; sem ela, só "Pergunta N de M"), pergunta em `<p>` 17px/600, grupo `role="radiogroup"` com `aria-labelledby`.
2. Alternativas no visual do desenho (44px, raio 8, círculo de 20px; escolhida antes de corrigir em roxo #7C3AED + fundo .15). Teclado e leitor de tela corretos.
3. Confiança OBRIGATÓRIA: micro-rótulo "Quão certo você está? (obrigatório)", 3 pílulas de 44px (Chutei · Mais ou menos · Tenho certeza), escolhida em ciano (#22D3EE + .12).
4. "Ver resultado" POR PERGUNTA (44px), liberado só com alternativa + confiança, dica de 3 estados em `role="status"` ("Marque uma alternativa e diga quão certo você está." → "Falta dizer quão certo você está — é obrigatório antes de corrigir." → "Pronto: pode corrigir.").
5. Depois de corrigir: pílula "Certa"/"Errada" no cabeçalho; marcas embaixo do texto da alternativa ("A resposta certa." verde; "Foi a sua." na escolhida errada, texto #F87171 e trio vermelho); demais a .7; pílulas de confiança travadas e visíveis + "Você disse: …" 13px; caixa de feedback verde ou VERMELHA (nunca âmbar) com título colorido ("Você acertou." / "Não foi essa.") e `aria-live="polite"`; dentro dela subcaixa vermelha "Por que a sua não serve:" (se houver `porque`) e subcaixa âmbar "Certeza e erro: é a explicação que mais vale reler." (errou com "Tenho certeza").
6. Placar quando todas estiverem corrigidas:
   - caixa roxa (rgba(124,58,237,.6)/.12), "Você acertou X de N." + % em JetBrains Mono;
   - barra empilhada de 3 partes (certas #22C55E, erradas #EF4444, erradas com certeza #F59E0B), com legenda e `aria-label`;
   - mensagem por limiar: 100% → "Gabarito…" (o texto existente); abaixo de 80% → "Releia as explicações das que errou e refaça o quiz."; de 80% a 99% → "Leia as explicações das que errou e refaça — o objetivo é reconhecer o padrão, não decorar a alternativa.";
   - caixa âmbar dos erros com certeza;
   - "Estas perguntas voltam amanhã na página Revisão…" com LINK `#/revisao` e os dias de `ESCADA_DIAS` (`src/components/revisao.js`);
   - botões "Refazer o quiz" (secundário) + "Marcar módulo como concluído" (primário), este com a opção `moduloId`: alterna `modulosConcluidos` com `atualizar()`, como `montarConclusao` em `src/views/modulo6.js`, e vira "Desmarcar…" quando já concluído;
   - sem a barra roxa e o contador antigos; foco no placar.
7. Gravação: formato EXATO `{ acertos, total, respostas, confiancas }` em `estado.quizzes[id]`, gravado quando a última pergunta é corrigida; `semearDoQuiz` só nesse momento; quiz salvo reabre corrigido + placar. Opção `salvar = true`; com `false` não grava, não semeia, sem toast.
8. Export `montarPerguntaRapida({ id, pergunta, moduloNome })`: quiz de 1 pergunta, `titulo` "Pergunta rápida", `salvar:false`, mesmo visual.
9. Chamadas atuais `montarQuiz({ id, titulo, descricao, perguntas })` nas 7 views continuam funcionando.

## didatica.js (os blocos ficam, no traço do desenho)
"Confira antes de seguir" (`montarPerguntaDaParte`) com erro em vermelho e "Por que a sua não serve" dentro do feedback como no 34, botões 44px; "Antes de ler" e "Parte N de M"/"Continuar"/"Mostrar tudo" com tokens do desenho (micro-rótulo 12px/600/.05em, botões 44px, caixas raio 8); `montarTermos` com `grid-template-columns: repeat(auto-fit, minmax(200px, 1fr))`. Não mude o que esses blocos fazem.

## Verificação
Em `#/modulo-6` (aba Quiz: antes, acertou, errou com certeza, placar; um "Confira antes de seguir" da aba Os números) e `#/modulo-1`, 1280px e 390px, contra o desenho 34. Depois apague o estado: `localStorage.removeItem('omh_state_v1')`.
