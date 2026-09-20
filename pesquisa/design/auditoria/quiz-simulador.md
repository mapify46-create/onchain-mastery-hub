# Quiz e Simulador (desenho `34 Quiz e Simulador` × app)

## Resumo
O desenho 34 **não foi implantado**: `src/components/quiz.js`, `src/components/simulator.js`, `src/components/didatica.js` e `src/data/cenarios.js` foram mexidos pela última vez em 14/09 (commit f5ee779), antes dos commits do redesenho (17/09). O quiz do app é, linha por linha, o componente `Quiz` antigo do design system. Os desenhos M1–M7 ainda embutem esse componente, e é por isso que a aba Quiz dos módulos "bate" com eles e não bate com o 34.
O que mais pesa no quiz: a confiança **não é obrigatória** no app (o botão libera sem ela). A errada vem em âmbar, e não em vermelho. "Por que a sua não serve" e "Certeza e erro" ficam fora da caixa de feedback, e o aviso de "Certeza e erro" não tem caixa. O placar não tem a barra empilhada nem o botão de concluir.
No simulador: a opção escolhida é sempre roxa (não ganha a cor da qualidade). O feedback é uma caixa só, sem os blocos "Lição" e "Risco desta decisão". O resultado final troca as barras e a lista das 4 faixas por 4 números e um texto criado na implantação.
Há ainda um conflito dentro do próprio handoff (34 × M1–M7 × M4), que o dono precisa decidir antes (ver "Decisões pendentes").

Capturas usadas (em `shots/`): desenho `qs-desenho-{antes,acerto,erro,placar,parcial}-NN.png`, `qs-desenho-cel-erro-NN.png`, `qs-desenho-m6-quiz-NN.png`, `qs-desenho-m6-rapida-NN.png`; app `qs-app-m6-quiz-{antes,semconf,corrigido}-NN.png`, `qs-app-sim-{antes,boa,ruim,resumo,resumo-topo}-NN.png`, `qs-app-cel-{quiz,sim}-NN.png`, `qs-app-m6-rapida-NN.png`.
Como o estado foi reproduzido no app: pelo `js`, escolhendo confiança e alternativas e clicando em "Ver resultado". O simulador foi preparado com `atualizar()` do próprio `store.js`, deixando o cenário 1 como o único sem resposta (e, no resumo, com a mesma distribuição do exemplo do desenho: 7 sólidas, 2 defensáveis, 2 caras e 1 não se aplica). O `omh_state_v1` foi removido ao fim de cada captura, e a checagem final deu `null`.

## Decisões pendentes (conflitos dentro do handoff; resolver antes de implantar)
1. **Quiz: um "Ver resultado" por pergunta ou um só no fim?**
   - O 34 põe o botão, a dica ("Marque uma alternativa e diga quão certo você está.") e a correção **dentro do cartão de cada pergunta** ("Pergunta 2 de 8 · Módulo 6"), e mostra o placar como um estado à parte.
   - Os desenhos M1–M7 (aba Quiz e as 53 "Pergunta rápida") usam o `Quiz` do design system (`_ds_bundle.js:930-1205`): lista de perguntas e **um** "Ver resultado" no fim, liberado quando todas têm alternativa.
   - Recomendação: seguir o 34, que é a tela específica de "feedback visual" e a única com "confiança obrigatória", que o README repete (README, tabela da Fase 3). Cada pergunta seria corrigida sozinha, e o placar entraria quando a última fosse corrigida.
2. **Onde fica "Marcar módulo como concluído"?** No 34 ele fica dentro do placar. No M6 Desktop (e no app, `modulo4.js:580-620` e cópias em modulo1/2/3/5/6/7) ele fica num cartão à parte, "Terminou o módulo?".
3. **Simulador na aba do M4.** O `M4 Desktop` mostra, na aba Simulador, só uma explicação (4 passos, feedback em 3 partes e o link "Abrir o simulador →"), e diz que os cenários "são montados pelo componente atual — sem mudança nesta tela". O 34 redesenha esse componente. Leitura proposta: a aba do M4 é do revisor do M4; o **visual do simulador** é o do 34.
4. **Texto da faixa do placar entre 80% e 99%.** O 34 fala só de "abaixo de 80%" e de "100%". Para a faixa do meio não há texto.

## Diferenças, na ordem do desenho

### Cabeçalho da tela 34
- **[NÃO SE APLICA] "Fase 3 · feedback visual", título "Quiz e Simulador", nota "Estado de exemplo" e as pílulas de estado ("Antes de responder / Acertou / Errou com certeza / Placar do fim"; "Antes de escolher / Decisão sólida / Decisão cara / Resultado final")** — são controles de demonstração do protótipo (`34 Quiz e Simulador.dc.html:13-18, 26-30, 115-119`). Não vão para o app.

### Quiz — estado "Antes de responder"
- **[DIFERENTE] Contêiner da pergunta**
  - Desenho: caixa interna com raio 8, fundo `#0B0F17`, borda `#1F2733`, padding 20 e gap 14 (`:33`). No topo, o micro-rótulo "PERGUNTA 2 DE 8 · MÓDULO 6" (12px, maiúsculo, `#9AA7B4`); depois, a pergunta como `<p>` de 17px/600.
  - App: `<fieldset>` com raio 12 e fundo `#141A24`, com a pergunta numa `<legend>` "2. Numa pool…" de 16px que corta a borda de cima (`quiz.js:213-219`).
  - Fazer: trocar a legend pelo micro-rótulo "Pergunta N de M · <Módulo>" e a pergunta em `<p>`, com a caixa interna escura. Para leitor de tela, manter o agrupamento com `role="radiogroup"` + `aria-label` (ou `aria-labelledby` apontando para a pergunta).
- **[DIFERENTE] Alternativas**
  - Desenho: `<button role="radio">` com min-height 44, raio 8, 14px e um círculo próprio de 20px (borda 2px `#9AA7B4`; preenchido `#7C3AED` quando escolhido). A escolhida, antes de corrigir, fica com **borda `#7C3AED` + fundo `rgba(124,58,237,.15)`** (`:41-44, 253-260`).
  - App: `<label>` com `<input type=radio>` nativo de 16px (`accent-primaria`). Antes de corrigir, a alternativa marcada **não muda** de borda nem de fundo; só aparece o ponto do rádio (`quiz.js:100-107, 191-208`).
  - Fazer: aplicar o estado "selecionado" roxo e o círculo de 20px. Pode continuar sendo input nativo escondido visualmente, desde que o visual seja o do desenho.
- **[DIFERENTE] Confiança (obrigatória)**
  - Desenho: micro-rótulo "QUÃO CERTO VOCÊ ESTÁ? (OBRIGATÓRIO)". Abaixo, 3 pílulas `<button role=radio>` com min-height **44px**, 14px/600 e padding 8×16. A escolhida fica com borda `#22D3EE` + fundo `rgba(34,211,238,.12)` (`:47-53, 261`).
  - App: "Quão certo você está?" em 12px, sem "(obrigatório)". Os rótulos-pílula têm rádio de 12px, **26px de altura** (medido) e nenhum estado visual de escolhido além do ponto (`quiz.js:156-185`).
  - Fazer: pílulas de 44px, com o estado ciano e o texto "(obrigatório)".
- **[DIFERENTE] Confiança não é obrigatória no app**
  - Desenho: "Ver resultado" só libera com alternativa **e** confiança (`:252, 265-267, 360`).
  - App: libera quando todas as alternativas estão marcadas, com 0 confianças (testado: 8/8 respondidas, 0 confianças, botão habilitado; `quiz.js:253-264`).
  - Fazer: exigir a confiança de cada pergunta.
- **[DIFERENTE] Botão "Ver resultado" e dica**
  - Desenho: botão com min-height 44, padding 10×20 e 15px. A dica ao lado muda em 3 estados: "Marque uma alternativa e diga quão certo você está." → "Falta dizer quão certo você está — é obrigatório antes de corrigir." → "Pronto: pode corrigir." (`:56-61, 267`).
  - App: botão `criarBotao` com **38px** de altura (medido; `ui.js:302-318`) e o contador "N de 8 perguntas respondidas" (`quiz.js:310-321, 260-263`).
  - Fazer: botão de 44px e a dica em 3 estados, com `role="status"`.
- **[IGUAL] Botão desabilitado** — opacidade 0,5 + `cursor: not-allowed` nos dois (medido; `ui.js:292-294`).

### Quiz — estado "Acertou"
- **[FALTA NO APP] Badge "Certa"/"Errada"** no canto do cabeçalho da pergunta. Desenho: pílula verde (`rgba(34,197,94,.5)`/`.12`/`#22C55E`) ou vermelha (`#F87171`) (`:36, 268`). No app, não existe.
- **[DIFERENTE] Marca na alternativa certa**
  - Desenho: "A resposta certa." em 12px/600 verde, **embaixo** do texto da alternativa (`:43, 256`).
  - App: "Certa — foi a sua" ou "Resposta certa" **à direita** (`ml-auto`), o que espreme o texto no celular (`quiz.js:124-128`).
  - Fazer: marca embaixo do texto, com o texto do desenho.
- **[DIFERENTE] Cores da certa**
  - Desenho: borda `rgba(34,197,94,.5)` e fundo `.12`.
  - App: `border-risco-baixo/60 bg-risco-baixo/10` (`quiz.js:112`).
  - Fazer: acertar para .5/.12.
- **[IGUAL] Demais alternativas a opacidade 0,7** — `quiz.js:114` (medido: `op 0.7`).
- **[DIFERENTE] Confiança depois de corrigir**
  - Desenho: as 3 pílulas **continuam visíveis**, com a escolhida em ciano e o cursor padrão. Abaixo delas, "Você disse: tenho certeza." em 13px `#9AA7B4` (`:50-54`).
  - App: as pílulas somem e fica só a linha "Você disse: …" em 12px (`quiz.js:143-154`).
  - Fazer: manter as pílulas travadas e acrescentar a linha.
- **[DIFERENTE] Caixa de feedback do acerto**
  - Desenho: caixa verde com o título "Você acertou." **em `#22C55E`** e a explicação, com `aria-live="polite"` (`:63-64, 270-271`).
  - App: caixa verde `border-risco-baixo/40 bg-risco-baixo/10`, título na cor do texto, sem aria-live (`quiz.js:225-239`).
  - Fazer: título colorido, trio .5/.12 e `aria-live`.

### Quiz — estado "Errou com certeza"
- **[DIFERENTE] Alternativa escolhida errada**
  - Desenho: borda `rgba(239,68,68,.5)`, fundo `.12`, **texto `#F87171`** e a marca "Foi a sua." embaixo (`:257`).
  - App: `border-risco-alto/60 bg-risco-alto/10`, texto `#E6EDF3` (medido) e a marca "Sua resposta" à direita (`quiz.js:113, 129-132`).
- **[DIFERENTE] Caixa de feedback do erro**
  - Desenho: **vermelha** (`rgba(239,68,68,.5)`/`.12`), com o título "Não foi essa." em `#F87171` (`:63-64, 270-271`).
  - App: **âmbar** (`border-risco-medio/40 bg-risco-medio/10`), título na cor do texto (`quiz.js:229-233`).
- **[DIFERENTE] "Por que a sua não serve"**
  - Desenho: fica **dentro** da caixa de feedback, numa subcaixa vermelha (raio 6, `rgba(239,68,68,.5)`/`.12`, padding 10×12) com o texto em `#E6EDF3` (`:65-69`).
  - App: `<p>` à parte, **fora** do feedback, com borda neutra `border-borda`, fundo `bg-fundo` e texto `text-texto-suave` (`quiz.js:241-247`).
- **[FALTA NO APP] Caixa "Certeza e erro"**
  - Desenho: subcaixa âmbar dentro do feedback: "**Certeza e erro:** é a explicação que mais vale reler." (`:70-72, 274`). A mesma frase também aparece, em cinza, no fim da linha "Você disse: tenho certeza." (`:269`).
  - App: só a frase em `<strong>` âmbar, emendada na linha "Você disse" (`quiz.js:148-152`); não existe a caixa.
  - Fazer: criar a caixa e tirar o âmbar da linha.

### Quiz — estado "Placar do fim"
- **[DIFERENTE] Contêiner**
  - Desenho: caixa roxa (borda `rgba(124,58,237,.6)`, fundo `.12`, padding 20, gap 12) (`:79`).
  - App: cartão neutro `rounded-card border-borda bg-superficie p-5` (`quiz.js:274-282`).
- **[DIFERENTE] Linha do título**
  - Desenho: "Você acertou 6 de 8." (18px/600) e, à direita, o percentual "75%" em JetBrains Mono (`:80-83`).
  - App: só o título, sem percentual (`quiz.js:284-286`).
- **[FALTA NO APP] Barra empilhada**
  - Desenho: `<figure role=img>` de 22px com certas em `#22C55E`, erradas em `#EF4444` e erradas com "Tenho certeza" em `#F59E0B`, com legenda "6 certas · 1 errada · 1 errada com 'Tenho certeza'" e `aria-label` gerado (`:84-95`).
  - App: barra de progresso roxa única, com o percentual de acertos (`quiz.js:302`, `ui.js:234-253`).
- **[DIFERENTE] Mensagem**
  - Desenho: "Abaixo de 80%: releia as explicações das que errou e refaça o quiz. Com 100%, a mensagem é outra: 'Gabarito…'" (`:96`). É uma especificação por limiar, com o limiar de 80% igual ao da tela de Início (`inicio.js:222`).
  - App: 100% → "Gabarito…"; qualquer outro → "Leia as explicações das que errou e refaça — o objetivo é reconhecer o padrão, não decorar a alternativa." (`quiz.js:287-291`).
  - Fazer: aplicar o limiar de 80% (texto de 80–99% a decidir; ver "Decisões pendentes").
- **[DIFERENTE] "1 erro feito com certeza — comece por ele."**
  - Desenho: caixa âmbar (raio 6, `rgba(245,158,11,.4)`/`.12`), texto `#E6EDF3` (`:97`).
  - App: texto âmbar 600, sem caixa (`quiz.js:292-297`). O texto é o mesmo.
- **[DIFERENTE] "Estas perguntas voltam amanhã…"**
  - Desenho: "Revisão" é um **link** para `#/revisao` (`:98`).
  - App: texto puro (`quiz.js:298-301`). Os dias "3, 7, 16 e 35" estão escritos à mão, em vez de virem de `ESCADA_DIAS` (`revisao.js:20`).
- **[DIFERENTE] Botões**
  - Desenho: "Refazer o quiz" (secundário) + "Marcar módulo como concluído" (primário), lado a lado dentro do placar (`:99-102`).
  - App: só "Refazer o quiz" (`quiz.js:303-305`). O "concluir" está num cartão separado, "Terminou o módulo?" (`modulo4.js:580-620` e iguais nos outros 6 módulos, ex. `modulo6.js:377`).
- **[IGUAL] Título do quiz no módulo** — "Mini-quiz do Módulo N" + descrição (`quiz.js:326-329`) é o mesmo que os desenhos M1–M7 mostram. O "Quiz do módulo / Mesmo componente nos 7 módulos" do 34 é rótulo de vitrine.

### Perguntas rápidas das seções (o mesmo componente Quiz, segundo os desenhos M1–M7)
- **[DIFERENTE] Componente**
  - Desenho: cada seção dos M1–M7 termina com `Quiz` de 1 pergunta, `titulo="Pergunta rápida"`: confiança, "Ver resultado", "0 de 1 perguntas respondidas" (ex.: `M6 Desktop.dc.html:117, 172, 202…`; captura `qs-desenho-m6-rapida-01.png`). São 53 no total: M1 15 · M2 4 · M3 8 · M4 4 · M5 7 · M6 8 · M7 7.
  - App: não usa o quiz. Usa `montarPerguntaDaParte` ("CONFIRA ANTES DE SEGUIR"): botões corrigidos no clique, **sem confiança**, "Isso."/"Não foi essa." e "Tentar de novo" (`didatica.js:154-236`). Existe só em 9 lugares: M3 (`modulo3.js:350, 365, 452, 458, 461, 539`) e M6 (`modulo6.js:253, 272, 314`). M1, M2, M4, M5 e M7 não têm pergunta rápida nenhuma.
  - O erro da pergunta rápida também sai em âmbar e com "Por que a sua não serve" fora da caixa (`didatica.js:190-212`); o 34 pede vermelho.
  - Fazer: a pergunta rápida passa a usar o mesmo componente do quiz, com o visual do 34. Não pode gravar em `quizzes` (ver "Trabalho").

### Simulador — cabeçalho da seção
- **[FALTA NO APP] Cartão da seção**
  - Desenho: cartão (raio 12, `#141A24`, padding 20) com o h2 "Simulador de decisão" e, à direita, o micro-rótulo "MÓDULO 4 · 12 CENÁRIOS" (`:108-112`).
  - App: o simulador não tem cartão nem título (`simulator.js:530-552`). `modulo4.simulador.titulo` existe em `src/data/modulo4.js:354`, mas não é usado.
- **[DIFERENTE] Aviso "Cenários fictícios"**
  - Desenho: raio 8, padding 12×16, texto na cor principal: "**Cenários fictícios:** os números que aparecem neles são inventados de propósito para o exercício, e a ordem é sorteada a cada rodada. Nenhum descreve um token real, e nada aqui é recomendação de compra ou venda." (`:113`).
  - App: raio 12 (`rounded-card`), `p-3`, texto `text-texto-suave`: "**Cenários fictícios:** Os cenários são fictícios e os números neles são inventados…", mais uma frase extra, "A ordem é sorteada a cada visita, de propósito: misturar os tipos de situação treina a distinguir uma da outra." (`simulator.js:533-546`, texto de `modulo4.js:360-362`).
  - Fazer: trocar o texto em `modulo4.simulador.aviso` pelo do desenho e apagar a frase fixa no componente.
- **[DIFERENTE] Parágrafo de abertura**
  - Desenho: "Não existe pontuação de acerto de preço: o que está sendo medido é se a decisão segue a regra ou o impulso. As quatro opções são sempre as mesmas — o que muda é a situação." (`:114`).
  - App: a ideia está espalhada em 3 destaques (12 / 4 / "Nenhuma"), no parágrafo `modulo4.simulador.introducao` e na legenda "Badges de risco:" (`modulo4.js:533-573`). A composição da aba é do revisor do M4; o parágrafo do 34 não existe no app nem em `src/data`.
- **[A MAIS NO APP] Cabeçalho de progresso** — "Cenário X de 12", "N de 12 respondidos" e a barra roxa (`simulator.js:150-165`). O desenho não tem barra; a posição vai no micro-rótulo do cenário.

### Simulador — estado "Antes de escolher"
- **[DIFERENTE] Estrutura do cenário**
  - Desenho: **uma** caixa interna (raio 8, `#0B0F17`, padding 20, gap 14) com tudo dentro: cabeçalho, título, tags, situação, "O que você vê" e as 4 opções (`:122-175`).
  - App: um cartão `#141A24` com a situação, e as opções **fora** dele, sob um h4 "O que você faz?" (`simulator.js:315-357`).
- **[DIFERENTE] Linha do cabeçalho**
  - Desenho: micro-rótulo "CENÁRIO 1 DE 12 · SEM POSIÇÃO" e, à direita, a pílula "Risco alto" (12px/600, trio vermelho) (`:123-126`).
  - App: h3 do título + `criarBadgeRisco` "Risco alto na situação" (12px/500) ao lado do título. A posição vira um chip, "Você não tem posição" / "Você já tem posição" (ciano) (`simulator.js:305-311, 320-325`).
  - Fazer: posição no micro-rótulo ("sem posição"; "com posição" para `aberta`, texto a confirmar), badge "Risco alto" sem "na situação", e remover o chip de posição.
- **[DIFERENTE] Título** — desenho: h3 de 17px/600 (`:127`); app: `text-lg`, 18px (`simulator.js:321`).
- **[DIFERENTE] Tags**
  - Desenho: chips com fundo `#141A24`, 12px, padding 2×10, gap 6 (`:128-130`).
  - App: chips `bg-fundo`, gap 8 (`simulator.js:66-75, 327`).
- **[DIFERENTE] Situação** — desenho: 14px `#9AA7B4` (`:131`); app: 16px `text-texto-suave` (`simulator.js:329`).
- **[DIFERENTE] Caixa de sinais**
  - Desenho: rótulo "**O QUE VOCÊ VÊ**" em 11px, caixa `#141A24`, padding 12×14 (`:132-137`).
  - App: rótulo "**NA SUA TELA**", caixa `#0B0F17`, padding 16 (`simulator.js:331-343`).
  - Fazer: trocar o rótulo e as cores.
- **[DIFERENTE] Opções (4 fixas)**
  - Desenho: `role="radiogroup"` com botões `role=radio` de min-height 44, **fundo `#141A24`**, padding 12×14, rótulo 15px/600 e descrição 13px, em grade de 2 colunas (1 no celular) (`:138-145`).
  - App: `role="group"`, `aria-pressed`, fundo `#0B0F17`, rótulo 14px e descrição 12px; hover roxo (`simulator.js:168-194, 348-356`).
  - Os textos das 4 opções vêm de `cenarios.js:29-50` nos dois. **IGUAL** nos textos.
- **[DIFERENTE] Dica antes de escolher**
  - Desenho: "Escolha uma das quatro para ver o feedback. 'Realizar parcial' aqui é a única que não se aplica — você não tem posição neste token." (`:172-174`). A segunda frase vale para os 9 cenários com `posicao: 'nenhuma'`, onde `parcial` é sempre `naoSeAplica` (conferido nos dados).
  - App: "Escolha uma das quatro opções para liberar o feedback." (`simulator.js:294-297`).
  - Fazer: a primeira frase sempre; a segunda só quando `posicao === 'nenhuma'`.

### Simulador — estados "Decisão sólida" e "Decisão cara"
- **[DIFERENTE] Opção escolhida**
  - Desenho: fica com o **trio da qualidade** (verde para sólida, vermelho para cara, âmbar para não se aplica, ciano para defensável), com uma pílula de qualidade dentro do botão ("Decisão sólida"). As demais ficam a **0,7** (`:141, 307-310`).
  - App: sempre roxa (`border-primaria bg-primaria/15`), sem pílula; as demais a **0,6** e `disabled` (`simulator.js:175-186`; medido `op 0.6`).
- **[DIFERENTE] Bloco do feedback**
  - Desenho: caixa com a borda na cor da qualidade e fundo `#141A24`. Duas pílulas: a da qualidade ("Decisão sólida") e "**Risco desta decisão: baixo**" no trio do risco. Depois, o feedback em 14px `#E6EDF3` (`:148-154`).
  - App: tudo numa caixa única `border-primaria/40 bg-fundo p-5`. Linha "Você escolheu: Esperar" + badge "Risco baixo nesta decisão" + qualidade como **texto maiúsculo colorido**, não pílula. Feedback em 16px `text-texto-suave` (`simulator.js:204-232`).
- **[DIFERENTE] Próximo passo técnico**
  - Desenho: borda **sólida `#22D3EE`**, fundo `rgba(34,211,238,.1)`, texto 14px `#E6EDF3`. As ferramentas são chips em **JetBrains Mono** com fundo `#141A24` (`:155-161`).
  - App: `border-acento/40 bg-acento/5`, texto `text-texto-suave`, chips em Inter `text-texto-suave` com fundo `bg-fundo` (`simulator.js:235-252`).
  - Texto e ferramentas vêm de `cenarios.js` (`proximoPasso`, `ferramentas`) nos dois.
- **[DIFERENTE] Lição**
  - Desenho: caixa roxa própria (`rgba(124,58,237,.6)`/`.12`), micro-rótulo "LIÇÃO" e a lição em 15px/600 (`:162-165`).
  - App: linha "**Fica a regra:** …" em 14px, dentro da caixa única (`simulator.js:254-257`).
- **[DIFERENTE] Rodapé do feedback**
  - Desenho: "Próximo cenário" (primário) + "A ordem é sorteada: o próximo vem de outro tema." (`:166-169`).
  - App: "Trocar minha resposta" (fantasma) dentro do feedback, e uma linha à parte com "Cenário anterior", "Próximo cenário" (desabilitado até responder) e "Ver resumo de disciplina" (`simulator.js:259-264, 269-299`). Falta a frase sobre a ordem sorteada.
- **[DIFERENTE] Cor das qualidades**
  - Desenho: Defensável = **ciano** (`rgba(34,211,238,.5)`/`.1`/`#22D3EE`); Não se aplica = **âmbar** (`:291-294`).
  - App: Defensável = âmbar (`text-risco-medio`); Não se aplica = cinza (`text-texto-suave`) (`simulator.js:28-33, 431-435`).
- **[IGUAL] Textos do cenário 1** — título, tags, situação, sinais, os 4 feedbacks, qualidades, riscos, próximo passo, ferramentas e lição batem com `cenarios.js:99-152`.

### Simulador — estado "Resultado final"
- **[DIFERENTE] Contêiner e título**
  - Desenho: caixa roxa (`rgba(124,58,237,.6)`/`.12`, padding 20). Título da faixa em 18px/600 e, à direita, "17 de 24 pontos · 71%" em Mono. Depois, o texto da faixa em 14px `#9AA7B4` (`:179-184`).
  - App: cabeçalho "Resumo de disciplina · 12 de 12 respondidos" + barra cheia. Cartão com borda `primaria/40` e fundo `#141A24`, faixa em h3 de 20px, "Disciplina: 16 de 24 pontos (67%)." em cinza, barra roxa e o texto da faixa em 16px (`simulator.js:150-165, 441-459`).
- **[FALTA NO APP] "As 12 decisões, por qualidade"**
  - Desenho: 4 barras horizontais na **mesma escala** (de 12). Cada uma tem rótulo + "(2 pontos)" + "7 de 12" em Mono, nas cores verde/ciano/vermelho/âmbar, com `role=img` + `aria-label` gerado e a legenda "Mesma escala, sobre os 12 cenários. 'Não se aplica' não é erro de mérito…" (`:185-196, 339-341, 352`).
  - App: no lugar, 4 cartões com um número grande cada (7 / 2 / 2 / 1) (`simulator.js:430-476`).
- **[FALTA NO APP] "As quatro faixas do resumo"**
  - Desenho: lista das 4 faixas de `FAIXAS_DE_DISCIPLINA`, cada uma com título, limiar ("de 85% para cima", "de 60% para cima", "de 35% para cima", "abaixo de 35%") e texto. A faixa atual fica em roxo. Legenda: "O simulador pega a primeira faixa que couber…" (`:197-208, 342-350`).
  - App: não mostra as outras faixas.
- **[DIFERENTE] Lista dos 12 cenários**
  - Desenho: caixa escura com o micro-rótulo "OS 12 CENÁRIOS, E A DECISÃO … EM CADA UM". Linhas **em ordem de `numero`** (01…12, Mono), título e pílula de qualidade (`:209-216`).
  - App: cartão "Suas escolhas, cenário a cenário" na **ordem sorteada**, com "Cenário i" (posição na rodada, não o `numero`). Mostra ainda a opção escolhida, a qualidade como texto colorido e o botão "Rever" (`simulator.js:389-421, 509-516`).
- **[DIFERENTE] Frase final**
  - Desenho: "O simulador não avalia se você ganharia dinheiro, e sim se a decisão seguiu a regra escrita." (`:217`).
  - App: essa frase aparece como último item da lista "Leitura do seu padrão", seguida de "Resultado a gente não controla; processo, sim." (`simulator.js:503-505`).
- **[A MAIS NO APP] "Voltar aos cenários" e "Refazer o simulador"** (`simulator.js:518-524`). O resultado do desenho não tem botão nenhum.

### Rodapé
- **[DIFERENTE, fora da área] Aviso final**
  - Desenho: "Aviso: material de estudo próprio, **não é recomendação de investimento**. Memecoin é…" (`:222`).
  - App: o rodapé comum não traz "não é recomendação de investimento" (captura `qs-app-sim-ruim-02.png`). É do revisor da casca/layout.

## A mais no app (não está no desenho)
- Contador "N de M perguntas respondidas" — `quiz.js:310-321` — (a). O 34 troca por uma dica de 3 estados.
- Toast "Progresso salvo" e foco no placar — `quiz.js:85-87` — (a).
- Barra de progresso roxa do placar — `quiz.js:302` — (b) em relação ao 34 (vem do `Quiz` antigo do design system).
- Frase "Leia as explicações das que errou e refaça — o objetivo é reconhecer o padrão, não decorar a alternativa." — `quiz.js:290` — (b) em relação ao 34 (vem do `Quiz` antigo).
- Cartão "Terminou o módulo?" separado, repetido em 7 views — `modulo1.js:318`, `modulo2.js:521`, `modulo3.js:643`, `modulo4.js:604`, `modulo5.js:511`, `modulo6.js:377`, `modulo7.js:315` — (a). Está também no M6 Desktop; o 34 põe o botão dentro do placar.
- "Antes de ler: o que você acha?" (pergunta prévia sem correção) — `didatica.js:103-141`; usada em `modulo3.js:334, 439, 530`, `modulo6.js:224, 283, 300, 335` e `modulo7.js:206, 228, 252, 267, 281` — (a). Nenhum desenho M1–M7 tem esse bloco.
- "Confira antes de seguir" (pergunta da parte, corrigida no clique, "Isso."/"Tentar de novo") — `didatica.js:154-236` — (a), com texto próprio (b). Os desenhos usam "Pergunta rápida" com o componente Quiz.
- Cabeçalho "Cenário X de 12 · N de 12 respondidos" + barra — `simulator.js:150-165` — (a).
- h4 "O que você faz?" — `simulator.js:347` — (b) (vem do `CardDeCenario` antigo do design system).
- Chip "Você não tem posição" / "Você já tem posição" — `simulator.js:307-310` — (b). No desenho a posição está no micro-rótulo.
- "Você escolheu: X" — `simulator.js:216-219` — (b).
- "Trocar minha resposta" — `simulator.js:259-264` — (a).
- "Cenário anterior" e "Ver resumo de disciplina" — `simulator.js:275-292` — (a).
- Frase "A ordem é sorteada a cada visita, de propósito: misturar os tipos de situação treina a distinguir uma da outra." — `simulator.js:544` — (b).
- 4 cartões de número no resumo (Decisões sólidas / Defensáveis / Decisões caras / Não se aplicavam) — `simulator.js:430-476` — (b).
- "Leitura do seu padrão" (entradas, entradas caras, "realizar parcial sem posição", "nenhuma decisão cara") — `simulator.js:478-507` — (b): texto criado na implantação, não está em `src/data` nem no desenho. Tem erro de concordância: "Em 1 cenários você escolheu…" (`:493-498`, visto na captura `qs-app-sim-resumo-02.png`).
- Botão "Rever" por cenário, "Voltar aos cenários", "Refazer o simulador" — `simulator.js:414-418, 518-524` — (a).
- Rótulos de opção trocados por cenário ("Entrar / aumentar", "Entrar / assinar") — `cenarios.js` (opções `rotulo` dos cenários 3, 5, 6 e 7) — (c). O 34 mostra só as 4 opções fixas; não é defeito, é dado que o desenho não exibe.
- Na aba Simulador do M4: 3 destaques (12 / 4 / Nenhuma), o parágrafo `simulador.introducao` e a legenda "Badges de risco:" — `modulo4.js:533-573` — (b)/(c). Composição do revisor do M4.

## Números
- **Desenho, inconsistente consigo mesmo:** "17 de 24 pontos · 71%" (`34 Quiz e Simulador.dc.html:182`). A lista de exemplo do próprio desenho (`:324-337`) tem 7 "boa" × 2 + 2 "aceitável" × 1 + 2 "ruim" × 0 + 1 "não se aplica" × 0 = **16 de 24 = 67%**, e as barras mostram 7/2/2/1. O app, com a mesma distribuição, calcula "16 de 24 pontos (67%)" (`simulator.js:100-109`; captura `qs-app-sim-resumo-topo-02.png`). A nota "Estado de exemplo" declara os números fictícios, mas o número tem de ser calculado (`pontuacao()`), não copiado do desenho. A faixa não muda (≥ 60%).
- "Abaixo de 80%" (desenho `:96`): não está em `src/data`. O limiar existe só como lógica em `inicio.js:222` (`< 0.8`). Na implantação, usar uma constante única nos dois lugares.
- Conferidos, com origem: "Pergunta 2 de 8" (`modulo6.js` quiz, 8 perguntas); "Módulo 4 · 12 cenários" (`cenarios.length`); "3, 7, 16 e 35 dias" (`ESCADA_DIAS`, `revisao.js:20`; no app está escrito à mão em `quiz.js:300`); faixas 85/60/35 (`FAIXAS_DE_DISCIPLINA`, `cenarios.js:63-94`); "(2 pontos)/(1 ponto)/(0 ponto)" (`QUALIDADES`, `cenarios.js:55-60`); "68,67%" do aviso (`modulo2.js:543`, `modulo7.js:245`, CoinGecko Research); "6 de 8 / 75% / 12,5%" do placar (exemplo fictício declarado, e a conta fecha).
- Detalhe de texto no desenho: "(0 ponto)" deveria ser "(0 pontos)".

## Celular
- Nem o app nem o desenho rolam para o lado a 390px (`scrollWidth` = 390). Opções do simulador em 1 coluna nos dois (desenho `colsDois: '1fr'`; app `sm:grid-cols-2`, medido `358px`).
- Quiz no app: a `<legend>` de 3 linhas corta a borda do cartão. A marca "Resposta certa"/"Sua resposta" à direita espreme a alternativa em até 5 linhas. As pílulas de confiança têm 26px, abaixo dos 44px do alvo de toque. No desenho, as pílulas de 44px quebram em 2 linhas e a marca fica embaixo do texto (`qs-desenho-cel-erro-01.png` × `qs-app-cel-quiz-02.png`).
- Simulador no app: o cenário só começa a ~2.400px do topo, depois de 3 destaques, introdução, legenda, aviso e barra. No desenho, vem logo após o aviso e um parágrafo.
- O feedback do app a 390px empilha "Você escolheu", o badge e a qualidade, e depois "Cenário anterior / Próximo cenário / Ver resumo" em 2 linhas. O desenho empilha as duas pílulas e termina com um único botão primário (`qs-desenho-cel-erro-03.png` × `qs-app-cel-sim-03.png`).

## Trabalho para implantar
**`src/components/quiz.js`** (G no total)
- **M** — Cabeçalho da pergunta: micro-rótulo "Pergunta N de M · <Módulo>" (precisa receber o nome do módulo), badge "Certa"/"Errada" depois de corrigir, pergunta em `<p>` de 17px/600, caixa interna `#0B0F17`, raio 8, padding 20. Trocar `fieldset/legend` por `div role=radiogroup` com `aria-labelledby`.
- **M** — Alternativas: estado "selecionado" roxo antes de corrigir e círculo de 20px. Depois de corrigir: certa com o trio verde .5/.12 e "A resposta certa." embaixo; escolhida errada com o trio vermelho, texto `#F87171` e "Foi a sua." embaixo; demais a 0,7 (já existe).
- **M** — Confiança: micro-rótulo "Quão certo você está? (obrigatório)", 3 pílulas-botão de 44px, escolhida em ciano. Depois de corrigir, pílulas travadas (visíveis) + "Você disse: …" em 13px cinza, com a frase de certeza e erro emendada sem cor.
- **P** — Regra do botão: exigir alternativa **e** confiança. Dica em 3 estados com `role=status`. Botão de 44px/15px (via `class` extra no `criarBotao`).
- **M** — Feedback: caixa verde ou vermelha (não âmbar), título colorido, `aria-live="polite"`. Dentro dela, a subcaixa vermelha "Por que a sua não serve:" e a subcaixa âmbar "Certeza e erro: …".
- **M** — Placar: caixa roxa, "Você acertou X de N." + "P%" em Mono, barra empilhada de 3 partes com legenda e `aria-label`, mensagem por limiar de 80%, caixa âmbar dos erros com certeza, link para `#/revisao`, dias montados a partir de `ESCADA_DIAS`. Botões "Refazer o quiz" + "Marcar módulo como concluído" (receber `moduloId` ou `aoConcluir`). Tirar a barra roxa e o contador.
- **M** — Fluxo por pergunta (se o dono aprovar a decisão 1): corrigir e gravar cada pergunta sozinha, e mostrar o placar quando todas estiverem corrigidas. Manter o formato salvo `{ acertos, total, respostas, confiancas }`, para não quebrar `store.js`, a tela de Início e a revisão.
- **P** — Modo "sem gravar" (`gravar: false`), para as perguntas rápidas não entrarem em `estado.quizzes`. Sem isso, `inicio.js:108` (que conta `Object.keys(estado.quizzes)`) passaria a mostrar "Quizzes X/7" errado. `progressoDoModulo` (`store.js:252-257`) não é afetado, porque lê só `quizzes[moduloId]`.

**Views dos módulos (`modulo1.js`…`modulo7.js`)** (M)
- **M** — Extrair a função `montarConclusao` (7 cópias quase iguais) para um componente único, e chamá-la de dentro do placar (decisão 2). Remover o cartão "Terminou o módulo?", ou mantê-lo, conforme a decisão.
- **G** (dos revisores dos módulos, mas depende deste componente) — Trocar `montarPerguntaDaParte` pelas "Pergunta rápida" com o quiz no visual do 34, nas posições dos desenhos (53 perguntas; hoje há 9). Decidir o destino de `montarPerguntaPrevia` (12 usos, sem desenho).

**`src/components/didatica.js`** (P)
- **P** — Se `montarPerguntaDaParte` continuar existindo em algum lugar: erro em vermelho e "Por que a sua não serve" dentro do feedback, como no 34.

**`src/components/simulator.js`** (G no total)
- **P** — Envolver num cartão com o h2 "Simulador de decisão" (de `modulo4.simulador.titulo`) + "Módulo 4 · {N} cenários". Aviso com raio 8, padding 12×16 e texto na cor principal, sem a frase fixa (`:544`). Parágrafo "Não existe pontuação…" vindo de dado novo.
- **M** — Tirar o cabeçalho com barra (`:150-165`). Micro-rótulo "Cenário i de N · sem posição/com posição" + pílula "Risco alto" na mesma linha. Tirar o chip de posição.
- **M** — Uma caixa interna só (`#0B0F17`) com título de 17px, tags com fundo `#141A24`, situação em 14px, "O que você vê" (`#141A24`) e as opções dentro. Tirar o h4 "O que você faz?". Opções como `role=radio` em `radiogroup`, 44px, fundo `#141A24`, rótulo 15px e descrição 13px.
- **P** — Depois de escolher: a opção escolhida com o trio da qualidade + pílula de qualidade dentro dela; as demais a 0,7.
- **P** — `CLASSES_QUALIDADE` / tabela de trios: Defensável em ciano, Não se aplica em âmbar. Mesma tabela para pílulas, bordas e barras.
- **M** — Feedback em 4 blocos: (1) caixa da qualidade com as pílulas de qualidade e "Risco desta decisão: X" + texto em 14px `#E6EDF3`; (2) próximo passo com borda sólida `#22D3EE`, texto claro e chips em Mono; (3) caixa "Lição"; (4) "Próximo cenário" + "A ordem é sorteada: o próximo vem de outro tema.". Tirar "Você escolheu:". Decidir o que fazer com "Trocar minha resposta" / "Cenário anterior" / "Ver resumo" (sugestão: manter como fantasma/secundário depois do botão primário, porque sem eles não se chega ao resumo nem se corrige um clique errado).
- **P** — Dica antes de escolher, com a segunda frase condicionada a `posicao === 'nenhuma'`.
- **G** — Resumo: caixa roxa com título da faixa + "X de Y pontos · Z%" (calculado); figura das 4 barras na mesma escala, com `aria-label`; lista das 4 faixas com limiar e a atual em destaque; lista dos N cenários ordenada por `numero` com pílula de qualidade; frase final. Tirar os 4 cartões de número e "Leitura do seu padrão" (ou, se o dono quiser manter, corrigir "Em 1 cenários"). Manter "Refazer o simulador" como único botão (o desenho não mostra nenhum; sem ele não há como recomeçar).

**`src/data/modulo4.js`** (P)
- **P** — `simulador.aviso` com o texto do desenho; novo campo para "Não existe pontuação de acerto de preço: …"; texto da dica de posição.

**`src/data/cenarios.js`** (P)
- **P** — Opcional: mover para cá os limiares em texto das faixas ("de 85% para cima"…) ou gerá-los de `minimo` (o desenho gera, `:349`).

**Componentes novos / reaproveitamento**
- **Barra empilhada horizontal** (placar do quiz) e **barras na mesma escala** (resumo do simulador): o app já tem `criarBarrasNaMesmaEscala` (`src/components/visuais.js:405`, usada em `modulo6.js`). Dá para reaproveitar nas 4 barras do resumo. Para a barra empilhada de 3 cores do placar, cabe um helper pequeno em `ui.js` (`criarBarraEmpilhada(partes, alt)`), ou estender a de barras com `partes`.
- **Pílula de estado em trio** (Certa/Errada, qualidade, "Risco desta decisão"): generalizar `criarBadgeRisco` (`ui.js:224-231`) para receber um tom (`ok | atencao | alerta | ciano | roxo`), com os trios do README.
- **Pílula-botão de confiança / opção radio**: não existe. O mais parecido é a aba ativa e o chip de filtro (estilo "selecionado" roxo) do app.
- **Caixa de aviso em trio** (âmbar/vermelho/roxo/ciano): o app repete a mesma string de classes em vários lugares (ex. `simulator.js:537-539`, `quiz.js:229-233`). Vale um helper `criarCaixaDeTom(tom, filhos)`.
