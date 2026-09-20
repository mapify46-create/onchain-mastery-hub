# Início (`#/inicio`)

Desenhos: `30 Inicio.dc.html` (capturado nos 4 estados do seletor: Primeiro dia, No meio da trilha, Quiz abaixo de 80%, Tudo concluído, com o `<details>` aberto) e `30 Inicio Celular.dc.html`. App capturado vazio e com estado injetado equivalente a "No meio", "Quiz abaixo de 80%" e "Tudo concluído" (formato do `omh_state_v1` intacto; chave removida depois de cada captura).
Capturas: `shots/ir-desenho-inicio-*-det-0N.png`, `shots/ir-desenho-inicio-cel-0N.png`, `shots/ir-app-inicio-{vazio,meio,cel}-0N.png`.

## Resumo
A ordem de prioridade da "Próxima ação" é a mesma nos dois (código idêntico, conferido nos 4 estados), e os textos de plano, revisão e aviso também. Todo o resto difere. A "Próxima ação" do app é um card-link de 18px, sem botão, sem anel e sem "Como esta ação é escolhida". O mapa da trilha virou uma `criarSequencia` horizontal de abas que não mostra estado nem leva a lugar nenhum. O ciclo tem setas de 35px soltas no meio. Faltam a escada dos intervalos e o diagrama de exportar/importar. O progresso é um Chart.js de 4 barras agregadas no lugar das 9 barras por módulo. O app ainda tem uma grade "Conteúdo do hub" que não existe no desenho, e a ordem das seções está trocada. Há também um conflito real de regra: o desenho diz que o quiz vale 50% por ser respondido, mas o store (decisão do dono de 14/09) conta `acertos/total × 50`.

## Diferenças, na ordem do desenho

- **[DIFERENTE] Largura do conteúdo.** Desenho: `max-width:868px` com padding 32px 24px, o que dá 820px de conteúdo. App: `max-w-5xl` dentro de `main` com `lg:px-10`, 934px medidos a 1280 (`src/views/inicio.js:403`, `index.html:115`). Fazer: `max-w-[868px]` (ou 820px de conteúdo) nesta tela. É provável que valha para o shell todo.

- **[DIFERENTE] Cabeçalho.** Desenho: micro-rótulo "ONCHAIN-MASTERY-HUB" (12px, 600, caixa-alta, `#9AA7B4`), h1 de 1,875rem e subtítulo. App: sem micro-rótulo, h1 `text-2xl sm:text-3xl` e o mesmo subtítulo (`src/views/inicio.js:112-118`, `src/ui.js:192-197`). Fazer: acrescentar o micro-rótulo (dar a `criarTitulo` um parâmetro `rotulo`). O quadro "Estado de exemplo" e o seletor são só do protótipo e não vão para o app.

- **[DIFERENTE] 1. Próxima ação (o bloco dominante).** Desenho:
  - `<section>` com padding 24px, borda `#7C3AED` sólida e fundo `rgba(124,58,237,.15)`.
  - Micro-rótulo "PRÓXIMA AÇÃO", título de 1,5rem (1,25rem no celular), detalhe de 15px.
  - Botão primário de 44px com rótulo próprio de cada regra: "Revisar agora →", "Abrir o módulo →", "Abrir o quiz →", "Abrir o módulo →" e "Abrir o simulador →".
  - Ao lado, um anel SVG de 120px (trilha `#1F2733`, arco `#7C3AED`, `stroke-dasharray = circ × concluídos/7`, número de concluídos em JetBrains Mono 26/700 no centro, "de 7 módulos" embaixo) e a legenda "N% da trilha".
  - Nota "Um botão só, em vez de ter de decidir por onde continuar. A ordem de prioridade é fixa: revisar o que venceu vem antes de conteúdo novo."
  - `<details>` "Como esta ação é escolhida" com as 5 regras numeradas e ligadas por traços de 2px. A regra ativa aparece em ciano (borda `#22D3EE`, fundo 10%, marcador ciano) e o bloco fecha com "A regra em destaque é a que se aplica agora… (Locke & Latham, 2002)".

  No celular o anel desce para baixo do botão (`dirAcao: column`).

  App: o card inteiro é um `<a>` com padding 20px, borda `primaria/60`, título de 18px com "→" colado no texto e detalhe de 14px. Não tem botão, anel, nota nem `<details>`. A medição do DOM deu 0 botões e 0 SVG (`src/views/inicio.js:264-279`). A lógica de `calcularProximaAcao` (`src/views/inicio.js:204-243`) é igual à do desenho (linhas 265-270): conferi no DOM "Revisar 4 perguntas", "Refazer o quiz do Módulo 2 · Você acertou 2 de 4" e "Refazer o simulador do Módulo 4".

  Fazer:
  - fazer `calcularProximaAcao` devolver também `regra` (1 a 5) e `botao`;
  - montar a seção com o botão, o anel e o `<details>` com a regra ativa destacada;
  - trocar a linha por coluna com CSS (≤640px), não com JS;
  - o título usa o nome do módulo (ver o item "títulos" no mapa).

  Obs.: o README do handoff fala em "gradiente 135° roxo→ciano", mas o desenho hi-fi usa roxo liso a 15%. Seguir o arquivo `.dc.html`. No protótipo, o número do centro do anel não chega a renderizar (é um defeito do runtime); o que se pretende é o número de módulos concluídos.

- **[DIFERENTE] Posição do aviso "Antes de tudo".** Desenho: é o último bloco da página. App: é o 3º, logo depois da Próxima ação (`src/views/inicio.js:389-401`, `:403-414`). Fazer: mover para o fim (o texto é igual).

- **[DIFERENTE] 2. Mapa da trilha.**

  Desenho: card `#141A24` com h2 "O mapa da trilha", micro-rótulo "RELAÇÃO: ORDEM, E O QUE FALTA" e o parágrafo "Os 7 módulos na ordem — cada um assume o anterior — e as duas rotas que você usa durante e depois deles. Clique para abrir." Dentro de uma caixa `#0B0F17` vem uma **lista vertical** `<ol>` de **9 links** (7 módulos + "Checklist antes de comprar" + "Revisão espaçada"), ligados por traços de 2×12px. Cada item tem:
  - marcador redondo de 28px: verde se o módulo está concluído, ciano se "é aqui", cinza nos demais; ✓ no Checklist e ⇢ na Revisão;
  - título curto ("M1 Fundamentos & Segurança Cripto", "M4 Gestão, catálises & decisão"…);
  - etiqueta em pílula: Concluído (verde), Começado (roxo), A fazer (neutra), **Você está aqui** (ciano, no módulo da próxima ação), Rotina (Checklist), "N vencidas" ou "Em dia" (Revisão);
  - descrição de uma linha;
  - barra de 6px no percentual do módulo, na cor do estado.

  Fecha com a legenda de 4 cores (concluído / começado / a fazer / é onde você está). Borda do item: ciano quando é "aqui", verde 50% quando está concluído. Se a próxima ação é revisar, nenhum módulo é "aqui" e o item Revisão fica ciano.

  App: `criarSequencia` com o título "A trilha, do começo ao fim" e o rótulo "RELAÇÃO: ORDEM" (`src/views/inicio.js:247-262`). O resultado:
  - uma `<ol role="tablist">` **horizontal** de 7 `<button>`, sem nenhum link (medido: 7 botões, 0 links);
  - transborda na horizontal: scrollWidth 980 contra clientWidth 892, com M6 e M7 cortados na captura;
  - o passo 1 fica sempre selecionado, e o estado ("concluído", "começado, 35%", "a fazer") só aparece no painel "PASSO 1 DE 7" do passo escolhido;
  - o `tom` que a view calcula (`inicio.js:258`) é ignorado por `criarSequencia` (`src/components/visuais.js:191-254`): nenhum passo fica verde ou roxo;
  - não tem "Você está aqui", barra, Checklist, Revisão nem legenda;
  - fica numa `figure` `bg-fundo` solta, fora de um card.

  Fazer: trocar por um componente novo de lista vertical de status, como no desenho (ver "Trabalho para implantar"). Títulos e descrições do desenho não estão em `src/data` (fiz grep das 7 descrições, 0 resultados), e os de `ROTAS` são outros (`src/router.js:36-106`, ex.: "Blockchain, carteiras, seed phrase, drainers e saque em reais."). É preciso gravar os textos do desenho num arquivo de dados.

- **[DIFERENTE] 3. Como estudar: o ciclo.**

  Desenho: card com h2 "Como estudar", micro-rótulo "RELAÇÃO: O QUE SE REPETE" e a ideia central com borda ciano "Ler a aba → responder o quiz → revisar em 1, 3, 7, 16 e 35 dias. E volta ao começo, na aba seguinte." O ciclo é um palco de 340px, com raio 112, folga de 34°, caixas de 118px, **sem texto no centro**, e a etapa 3 traz o detalhe mono "1 · 3 · 7 · 16 · 35 dias". Medido: arcos de **102px** que vão de uma caixa à outra.

  App: fica dentro do card "Por onde começar", **depois** da lista (`src/views/inicio.js:359-378`). O ciclo tem 320px, raio 100, folga 50° e caixas de 120px (`src/components/visuais.js:268-304`). Medido: arcos de **35px** que terminam a 43px da caixa 2 e começam 52px acima da caixa 3. São as "setas soltas".
  - Tem "estudo" em ciano no centro (`inicio.js:366`).
  - A etapa 3 não tem detalhe, porque a view passa `texto`, e a caixa só mostra `detalhe`.
  - Embaixo, uma legenda em lista com textos criados na implantação (`inicio.js:362-364`) e uma nota (`inicio.js:367`).

  Fazer: usar a geometria do desenho do Início (C=170, R=112, folga 34°, caixa 118, palco 340), sem centro e com `detalhe` na etapa 3. Tirar a legenda e a nota inventadas. Pôr o h2, o rótulo e a ideia central.

  Origem do defeito: o app copiou os parâmetros da página `00 Componentes` (C=160, R=100, folga 50), que as telas refinaram depois.

- **[FALTA NO APP] 3b. A escada dos intervalos, na mesma escala de tempo.** Desenho: uma figura com 5 barras de 14px (`#7C3AED`) proporcionais a d/35. Cada uma tem o rótulo "Degrau N" e, em mono, "amanhã (1 dia)" / "3 dias" / "7 dias" / "16 dias" / "35 dias". Embaixo, a legenda "Acertou, sobe um degrau; errou, volta ao primeiro. O primeiro nunca é 'hoje'… não foi testada nesta forma exata." e `aria-label` gerado. App: não existe (nenhum "escada" em `inicio.js`). Fazer: montar a partir de `ESCADA_DIAS` (`src/components/revisao.js:20`).

- **[DIFERENTE] 3c. Lista "como estudar".** Desenho: os 6 passos vêm **depois** do ciclo e da escada, dentro do card "Como estudar". App: o mesmo texto (`src/views/inicio.js:32-39`), mas no card "Por onde começar" (`:371`) e **antes** do ciclo. Fazer: renomear o card para "Como estudar" e reordenar para ideia central → ciclo → escada → lista.

- **[DIFERENTE] 4. Revisão de hoje.** Desenho:
  - card com borda `rgba(34,211,238,.5)` quando há vencidas;
  - h2 com a contagem mono à direita ("4 vencidas · 33 na fila" ou "fila vazia");
  - os 4 textos de estado;
  - **link-botão** de 44px ("Revisar agora →" com borda e fundo ciano quando há vencidas; senão "Abrir a Revisão →" neutro).

  App: os 4 textos são iguais e a borda também (`src/views/inicio.js:175-200`). Mas não há contagem, e o link é texto ciano simples, com 20px de altura medida (`:193-197`). Está depois do "Seu progresso" (no desenho vem antes). Fazer: pôr a contagem (`vencidos` e `naFila` já são calculados em `:175-176`), transformar o link em botão de 44px e mover a seção.

- **[DIFERENTE] 5. Seu progresso.**

  Desenho: h2 "Seu progresso, módulo a módulo" com "N% dos 7 módulos" à direita, barra geral de 8px e uma figura com **9 barras próprias de 20px**:
  - Módulo 1 a 7, em duas partes: ciano "quiz respondido" (50%) e verde "módulo concluído" (50%);
  - Glossário ("N de 34 termos estudados") e Simulador ("N de 12 cenários respondidos"), em ciano;
  - texto mono à direita ("100% · quiz 15/16 · concluído" ou "não começado");
  - legenda e a nota "Cada módulo vale metade por responder o quiz e metade por marcar como concluído — é a mesma conta do app…".

  App: h2 "Seu progresso", "N% dos módulos disponíveis" e a mesma barra de 8px. Mas o gráfico é Chart.js, com **4 barras agregadas** ("Módulos 2/7", "Quizzes 3/7", "Glossário 14/34", "Simulador 5/12"), eixo 0–100%, uma cor só e a legenda "Passe o mouse (ou toque)…" (`src/views/inicio.js:122-171`, `src/components/grafico.js:117-164`).

  Fazer: trocar pelas 9 barras do desenho, montadas em HTML (sem canvas) e com `aria-label` gerado.

  **Conflito de regra que o dono precisa decidir:** o store conta a metade do quiz como `acertos/total × 50` (`src/store.js:248-257`, decisão de 14/09 registrada na memória do projeto). Por isso o app mostra 97% / 88% / 35% e 31% no total, onde o desenho mostra 100% / 100% / 50% e 36% no mesmo estado. A nota do desenho ("é a mesma conta do app") está errada. Recomendo manter o store e fazer a parte ciano = `acertos/total × 50`, com a legenda "quiz: proporcional ao acerto (até 50%)". O comentário em `src/app.js:31-32` também está desatualizado.

- **[DIFERENTE] 6. Seu plano.** Desenho: h2 e texto (iguais), **rótulo visível** "O SEU PLANO" (`<label for>`), textarea `.omh-campo`, botão "Salvar o plano" e, ao lado, a nota "Fica salvo neste navegador. Planos 'quando X, eu faço Y' aumentam a chance de cumprir uma meta (Gollwitzer & Sheeran, 2006)." App: só `aria-label` (medido: sem label visível) e sem a nota (`src/views/inicio.js:285-310`). O botão é o do DS (padding 8×16, 38px), igual ao desenho. Fazer: acrescentar o label e a nota.

- **[DIFERENTE] 7. Guardar o progresso.** Desenho: h2 e texto (iguais), mais uma **figura** de 3 caixas: "Progresso neste navegador" → "Exportar" → `omh-progresso-AAAA-MM-DD.json` (mono, borda ciano) → "Importar" → "Outro navegador ou computador". Tem `aria-label` e vira coluna no celular. Depois vêm os botões Exportar e Importar. App: só texto e botões (`src/views/inicio.js:344-355`). Fazer: acrescentar o diagrama. No celular use "↓" em vez de "→": o desenho empilha as caixas mas mantém a seta para o lado, o que é um defeito do protótipo.

- **[DIFERENTE] 8. Aviso "Antes de tudo".** O texto é igual; só a posição muda (ver acima). Além dele, o app mostra o rodapé global "Aviso: material de estudo próprio…" (`index.html:117-122`), e o Início fica com dois avisos. O desenho do Início só tem o "Antes de tudo". Fazer: decidir no shell (o auditor do shell/sidebar deve cobrir isso).

## A mais no app (não está no desenho)
- Grade "Conteúdo do hub" com 9 cards-link (7 módulos, Checklist, Revisão e Glossário), "N% concluído", barra e "Abrir →": `src/views/inicio.js:380-387`, `:43-91`. Tipo (a): no desenho, a navegação está no mapa da trilha. O Glossário deixa de ter card no Início (continua na sidebar e nas barras de progresso).
- Gráfico Chart.js de progresso e sua legenda "Passe o mouse (ou toque) numa barra…": `src/views/inicio.js:122-156`, `src/components/grafico.js`. Tipo (a): função antiga (commit 6c03bc8) que o desenho substitui por barras próprias. O Chart.js continua em uso em M2 e M5 (`src/views/modulo2.js:31`, `src/views/modulo5.js:31`), então tirá-lo do Início não remove a dependência. O CLAUDE.md cita o "progresso na tela de Início" como exemplo de uso do Chart.js: vale avisar o dono.
- Título e nota da sequência: "A trilha, do começo ao fim", "Cada módulo assume o anterior. O Checklist e a Revisão não se concluem: são rotina." e o painel "PASSO 1 DE 7": `src/views/inicio.js:248,261`, `src/components/visuais.js:195-215`. Tipo (b).
- Título do ciclo "O laço que faz o conteúdo ficar", centro "estudo", legenda "uma aba por vez, sem correr" / "com a confiança marcada antes de ver a resposta" e nota "Errou, a pergunta volta amanhã. Reler não produz…": `src/views/inicio.js:359-368`. Tipo (b).
- Título do card "Por onde começar" (no desenho, "Como estudar"): `src/views/inicio.js:371`. Tipo (b).
- Toasts "Plano salvo", "Não consegui salvar o plano", "Progresso importado" e "Esse arquivo não é um progresso válido": `src/views/inicio.js:306,336,339`. Tipo (a); manter.
- Rodapé global "Aviso:", que duplica o "Antes de tudo": `index.html:117-122`. Tipo (a), do shell.

## Números
- Nenhum número exibido sem origem. "68,67%" (CoinGecko Research) está em `src/data/modulo2.js:543`, `modulo7.js:245` e `checklist.js:327`. "34 termos" e "12 cenários" batem com `glossario.length` = 34 e `cenarios.length` = 12 (conferido com o Node). "1, 3, 7, 16, 35" vem de `ESCADA_DIAS` (`src/components/revisao.js:20`). "80%" é o limiar da lógica, igual nos dois.
- Atenção na implantação: o desenho fixa "de 7 módulos", `TOTAL_TERMOS = 34` e `TOTAL_CENARIOS = 12` no código. No app, derive de `modulosDisponiveis.length`, `glossario.length` e `cenarios.length`, como o app já faz em `inicio.js:125-144`. Os percentuais do seletor (36%, 21%…) são estado de exemplo.
- Divergência de conta (não é número inventado): as porcentagens por módulo usam fórmulas diferentes no desenho e no store. Ver o item 5.

## Celular
- Desenho (390px): a Próxima ação empilha (o anel desce), o mapa segue vertical (etiquetas quebram abaixo do título), as barras de progresso quebram o texto mono, e o diagrama de exportar vira coluna. Defeitos do protótipo que não se devem copiar: o ciclo de 340px transborda a caixa interna (a caixa "Responder o quiz" passa da borda) e o diagrama de exportar empilha com a seta "→".
- App (390px): a Próxima ação cabe, mas continua sem botão e sem anel. A sequência vira uma coluna de botões e só o passo 1 mostra estado. O ciclo de 320px cabe, mas as setas continuam soltas. O Chart.js fica espremido (os rótulos tomam cerca de 1/3 da largura; na captura as barras saíram curtas, talvez no meio da animação, não verificado). A grade "Conteúdo do hub" vira 9 cards empilhados, o que dá cerca de 1.800px a mais de rolagem.
- Fazer: ciclo em posições percentuais, ou `overflow-x:auto; tabindex=0` dentro da caixa; a Próxima ação e o diagrama de exportar mudam de linha para coluna por CSS (`@media (max-width:640px)`), nunca medindo `innerWidth`.

## Trabalho para implantar
- `src/views/inicio.js`:
  - Reordenar para cabeçalho → Próxima ação → Mapa → Como estudar → Revisão de hoje → Progresso → Plano → Guardar → "Antes de tudo". **P**
  - Refazer a Próxima ação: `section`, título de 24px, botão de 44px com o rótulo da regra, anel SVG, nota e `<details>` com as 5 regras e a ativa destacada; `calcularProximaAcao` passa a devolver `{texto, detalhe, href, botao, regra}`. **M**
  - Trocar `criarSequencia` pelo mapa vertical de 9 itens com etiqueta, barra, "Você está aqui" e legenda. **M**
  - Card "Como estudar" com h2, rótulo, ideia central, ciclo do desenho, escada de 5 barras e lista (tirar os textos inventados do ciclo). **M**
  - Revisão de hoje: contagem mono e link-botão de 44px. **P**
  - Progresso: 9 barras HTML em duas partes (7 módulos, Glossário, Simulador), legenda e nota; tirar `montarGraficoDeBarras` e `renderizarGrafico` desta view. **M**
  - Plano: `<label for>` visível e a nota com Gollwitzer & Sheeran. **P**
  - Guardar: diagrama de exportar/importar. **P**
  - Remover a grade "Conteúdo do hub" e `criarCardDeRota` (confirmar com o dono). **P**
- `src/data/inicio.js` (novo, só dados, seguindo "conteúdo em `src/data`"): `COMO_ESTUDAR` (hoje em `inicio.js:32-39`), as 5 regras, os títulos curtos e as descrições da trilha, os textos dos itens Checklist e Revisão e as notas das figuras. **P**
- `src/components/visuais.js` → `criarCiclo` (`:268-340`):
  - aceitar `tamanho`, `raio`, `folga`, `larguraCaixa`, `corRetorno` e `centro` opcional;
  - por etapa, aceitar `destaque` (borda e fundo ciano) e uma linha extra (`quantas`);
  - mostrar `detalhe` e não gerar a legenda em lista quando a tela não pedir;
  - escalar no celular.

  Muda também os ciclos de M2 e M3 (`modulo2.js:441`, `modulo3.js:198`): conferir. **M**
- `src/ui.js` → `criarTitulo` (`:192-197`): parâmetro `rotulo` para o micro-rótulo acima do h1. **P**
- `src/store.js` (`:252-257`): nada, se o dono mantiver a conta por acerto. Se ele preferir a do desenho, volta a "50 por responder". Decisão dele. **P**
- `styles/custom.css`: linha→coluna da Próxima ação e do diagrama de exportar, conectores de 2px do mapa e das regras. **P**
- Componentes novos: `criarAnelDeProgresso` (não há nada parecido no app), `criarMapaDaTrilha` (lista vertical de status; `criarMapaMental` não serve porque mostra o todo e as partes, não a ordem com estado), `criarBarraEmPartes` (dá para estender `criarBarrasNaMesmaEscala`, `visuais.js:405`, que já tem `partes` com `cor`, mas ela tem barra de 28px e legenda fixa "valor medido"; um parâmetro de altura e de legenda resolve) e `criarDiagramaExportar` (pequeno, pode ficar inline).

---

# Revisão (`#/revisao`)

Desenhos: `33 Revisao.dc.html` (estados Fila cheia, Sessão em andamento respondida errada com "Tenho certeza", e Nada vencido) e `33 Revisao Celular.dc.html`. App capturado vazio, com fila (4 vencidas, 61 na fila, 35 respondidas para a calibração), com a sessão antes de responder e depois de uma resposta errada com certeza.
Capturas: `shots/ir-desenho-revisao-{fila,sessao,vazio,cel}-0N.png` e `shots/ir-app-revisao-{vazio,fila,sessao-escolher,sessao-responder,cel}-0N.png`.

## Resumo
Os textos-base batem: título, "De onde vem", "Nada vencido hoje", o parágrafo da fila e o da calibração. Mas cada visual do desenho está ausente ou foi trocado por texto:
- o ciclo não mostra quantas perguntas há em cada degrau nem onde há vencidas, tem setas escondidas atrás das caixas e caixas que se encostam;
- não existem as barras "De onde vêm as perguntas", as barras de calibração nem as colunas das próximas revisões;
- a sessão vem atrás de um botão "Começar" e, depois de responder, some com as alternativas, em vez de marcar "Esta é a certa." e "Foi a sua." no lugar.

O que mais pesa: o ciclo sem contagem, a sessão (é a interação principal) e a calibração sem barras.

## Diferenças, na ordem do desenho

- **[DIFERENTE] Cabeçalho.** Desenho: micro-rótulo "ROTINA DE ESTUDO", h1 "Revisão espaçada" e o subtítulo "…voltam em 1, 3, 7, 16 **e** 35 dias…". App: sem micro-rótulo; o subtítulo junta com `ESCADA_DIAS.join(', ')` e sai "1, 3, 7, 16, 35 dias" (`src/views/revisao.js:422-428`). Fazer: acrescentar o rótulo e juntar o último item com " e ".

- **[IGUAL] "De onde vem".** Mesmo texto e mesmo trio âmbar (`src/views/revisao.js:430-444`). Diferença mínima: padding 12px no app e 12×16 no desenho.

- **[DIFERENTE] 1. A escada, e onde cada pergunta está.**

  Desenho: **card** com h2 "A escada, e onde cada pergunta está", micro-rótulo "RELAÇÃO: O QUE SE REPETE" e a ideia central com borda ciano "Acertou, sobe um degrau. Errou, volta ao primeiro — e a pergunta reaparece amanhã." O ciclo tem 360px (C=180, R=122, folga 26°, caixas de 112px). Cada caixa mostra:
  - o marcador do degrau;
  - "1 dia" / "3 dias"… em mono 13px/600;
  - **"9 perguntas · 4 vencidas"** ou "sem perguntas".

  A caixa com vencidas fica ciano (borda `#22D3EE`, fundo 10%, marcador ciano). O arco de volta 5→1 é **vermelho `#EF4444` tracejado**, e no centro vem "errou: volta ao degrau 1" em `#F87171`. Medido: arcos de 43px que encostam nas caixas. Embaixo, a legenda de 3 itens (linha "acertou: sobe um degrau", tracejado vermelho "errou: volta ao primeiro", quadrado ciano "tem pergunta vencida aqui") e a nota "O primeiro degrau nunca é 'hoje'… A fila sai misturada entre os módulos de propósito…".

  App: `criarCiclo` numa `figure` solta, sem card, com o título "A escada dos intervalos" (`src/views/revisao.js:448-456`):
  - centro "acertou?" em ciano, arco de volta ciano;
  - caixas só com "1 dia" (sem mono), **sem contagem e sem destaque de vencidas**;
  - legenda em lista com textos criados na implantação ("primeira volta, ou depois de errar", "acertou de novo, sobe um degrau") e uma nota própria.

  Na geometria medida, os arcos têm **21px**, e dois deles (1→2 e 3→4) começam dentro da caixa, escondidos atrás dela, porque as caixas são desenhadas por cima do SVG. As caixas 3 e 4 se sobrepõem 2px (R=100 com caixas de 120px, `src/components/visuais.js:269-304`).

  Fazer:
  - card com h2, rótulo e ideia central;
  - `criarCiclo` com a geometria do desenho, `corRetorno` vermelho e centro vermelho;
  - por degrau, `quantas` = itens com `degrau === i` e `vencidas` = os que também têm `proximaTS <= agora` (dados já em `store.revisao.itens`);
  - legenda de 3 itens e a nota do desenho;
  - tirar a legenda em lista.

- **[DIFERENTE] 2. Fila de hoje (com vencidas).**

  Desenho: card com borda `rgba(34,211,238,.5)`, h2 "N perguntas para hoje" com a **contagem mono "N vencidas · M na fila"** à direita e o parágrafo "Misturadas entre os módulos…" (igual). Depois vem a figura **"De onde vêm as perguntas da fila"**, com 3 barras na mesma escala sobre o total da fila:
  - "Perguntas dos quizzes dos módulos" (roxo), com a nota "Entram quando o quiz é corrigido, e a primeira volta amanhã.";
  - "Termos do glossário marcados como estudados" (ciano), com a nota "Cada termo entra com duas perguntas…";
  - "Já respondidas antes, subindo a escada" (verde), com a nota "Reagendadas conforme você acertou.";
  - mais uma legenda.

  Em seguida, a **sessão já aberta** dentro do mesmo card.

  App: card com a mesma borda, h2 e parágrafo, mais um botão **"Começar"** (`src/views/revisao.js:167-181`). Não tem contagem nem as barras de origem.

  Fazer: contagem, a figura das 3 origens (classificar primeiro `tentativas > 0` → "já respondidas", depois `moduloId === 'glossario'` → termos, e o resto → quizzes, para as partes somarem o total) e a sessão inline, sem o "Começar".

- **[DIFERENTE] 2b. Sessão, uma pergunta por vez.**

  Desenho, antes de responder: uma caixa de raio 8, borda `rgba(124,58,237,.6)` e fundo `rgba(124,58,237,.08)`, dentro do card da fila. No topo, o micro-rótulo "PERGUNTA 1 DE 7" e o chip "Módulo 6 · degrau 2". Depois:
  - a pergunta em 1,0625rem (17px)/600;
  - as alternativas como `button role=radio`: 44px, fundo `#141A24`, círculo próprio de 20px; a escolhida ganha borda `#7C3AED` e fundo roxo 15%;
  - o rótulo "QUÃO CERTO VOCÊ ESTÁ? (OBRIGATÓRIO)" e 3 **pílulas** de 999px ("Chutei", "Mais ou menos", "Tenho certeza"), com a selecionada em borda ciano e fundo 12%;
  - o botão "Responder" (desabilitado a 0,5) com uma **dica dinâmica** ao lado: "Escolha uma alternativa e diga quão certo você está." / "Falta dizer quão certo você está — é obrigatório antes de ver a resposta." / "Pronto: pode responder.".

  Desenho, depois de responder: a mesma caixa continua, com as alternativas marcadas. A certa fica em trio verde com "Esta é a certa."; a escolhida errada, em trio vermelho com texto `#F87171` e "Foi a sua.". O rótulo passa a "· CORRIGIDA" e o botão a "Próxima", com a dica "A próxima vem misturada, de outro módulo.". Abaixo vem a caixa de feedback `aria-live`, em trio vermelho ou verde, com:
  - o título "Não foi essa." ou "Isso.";
  - a explicação;
  - se foi erro com certeza, a caixa âmbar "Certeza e erro: é a explicação que mais vale reler. Esta volta amanhã.";
  - a linha de reagendamento: "Errou: volta ao degrau 1 e reaparece amanhã." ou "Acertou: sobe para o degrau 3 e volta em 7 dias.".

  App, antes de responder: um `fieldset` com borda ciano 50% e legenda ciano "MÓDULO 1 · 1 DE 4" (sem o degrau). A pergunta vem em 16px. As alternativas são `label` com radio nativo em fundo `#0B0F17`. Abaixo, "Quão certo você está?" (14px, sem "(obrigatório)"), com 3 caixas iguais às alternativas em grade de 3 colunas. Por fim, o botão "Responder", sem dica (`src/views/revisao.js:114-134`, `:192-249`).

  App, depois de responder: tudo é **substituído** por um card novo **sem as alternativas** (`:251-313`), que traz:
  - o feedback: "Você acertou." em verde ou "Não foi essa." em **âmbar** (`:268-270`), quando o desenho usa vermelho;
  - a linha "A certa: …" (`:277-281`);
  - a caixa "Por que a sua não serve: …" (`:282-287`);
  - a linha "Você disse: tenho certeza. **Certeza e erro: é a explicação que mais vale reler.** Volta amanhã." (`:288-298`);
  - o botão "Próxima", ou "Ver o resumo" na última pergunta.

  Fazer:
  - reescrever a sessão como no desenho: caixa roxa 8%, chip com o degrau (`item.degrau + 1`, porque o store guarda de 0 a 4), alternativas e confiança nos estilos do desenho, dica dinâmica;
  - na correção, manter as alternativas com as marcas; feedback em trio vermelho/verde; ponto cego numa caixa âmbar; frase de reagendamento com degrau e dias (`ESCADA_DIAS[novoDegrau]`).
  - Não copiar o defeito do protótipo: lá o "Próxima" fica desabilitado depois de corrigir (`bloqueado = !pronto || corrigido`).
  - "Por que a sua não serve" aparece no desenho do Quiz (`34 Quiz e Simulador`), mas não no da Revisão. Recomendo manter, abaixo da explicação, por coerência com o quiz. Decisão do dono.

- **[DIFERENTE] 3. Estado vazio "Nada vencido hoje".** Desenho: card com h2, um dos dois textos (iguais aos do app) e **dois link-botões** de 44px: "Abrir um módulo →" (`#/modulo-1`) e "Marcar termos no Glossário →". App: sem os botões (`src/views/revisao.js:156-165`). Fazer: acrescentar os dois links.

- **[DIFERENTE] 4. Calibração, "Quando você tem certeza, acerta?".**

  Desenho: h2 e texto (iguais), depois uma figura com **3 barras de 22px** (acerto verde `#22C55E` e erro vermelho; na linha "Tenho certeza" o vermelho é sólido `#EF4444`, nas outras é `rgba(239,68,68,.55)`). Cada linha tem o rótulo entre aspas, "14 de 18 certas (78%)" em mono e uma **nota**:
  - na linha "Tenho certeza": em âmbar "É a linha que importa: longe de 100%, a sua certeza está enganando você." quando fica abaixo de 100%, ou "Certeza e acerto combinam nesta amostra.";
  - nas outras: "Aqui o erro é esperado — o problema é errar com certeza.";
  - sem respostas: "Responda a fila de hoje para esta linha aparecer.".

  Fecha com a legenda (acertou / errou) e "Cada barra é 100% das respostas daquele nível…".

  Os pontos cegos ficam numa caixa âmbar, com o título em micro-rótulo **âmbar** "PONTOS CEGOS: ERROS FEITOS COM CERTEZA", a frase "4 erros feitos com certeza. Eles voltam amanhã: releia as explicações antes." e a lista com a origem em mono branco + " · " + a pergunta.

  App: só 3 linhas de texto "rótulo … 12 de 18 certas (67%)", **sem barras, notas nem legenda** (`src/views/revisao.js:349-373`). Os pontos cegos têm título em texto 14px branco, sem a frase de contagem, com a lista "Módulo 1: pergunta" e limite de 6 itens (`:374-388`).

  Fazer: as barras em duas partes com notas e legenda; nos pontos cegos, título âmbar, frase de contagem (hoje só aparece no resumo da sessão, `:322-327`) e origem em mono.

- **[DIFERENTE] 5. Próximas revisões.** Desenho: h2 com "21 perguntas agendadas" à direita, uma figura de **5 colunas verticais** na mesma escala (amanhã em ciano; em 3, 7, 16 e 35 dias em roxo; número em mono sobre cada coluna; altura de 110px), a legenda "Quantas perguntas voltam em cada janela…" e a lista de 8 itens com **data relativa em mono** ("amanhã", "em 3 dias") + "Origem · pergunta". App: h2, "57 perguntas agendadas." num parágrafo e a lista de 8 com **data absoluta "19/09"** (`src/views/revisao.js:395-417`, `dataCurta` em `:91-93`). Fazer: as colunas (agrupar por dias até `proximaTS`: ≤1, ≤3, ≤7, ≤16, >16), o resumo à direita do h2 e a data relativa.

- **[DIFERENTE] 6. Aviso final.** Desenho: um card âmbar dentro do conteúdo, "Aviso: material de estudo próprio, **não é recomendação de investimento**. Memecoin é o ativo de maior risco…". App: rodapé global em texto simples com `border-t` e **sem** "não é recomendação de investimento" (`index.html:117-122`). Fazer: acertar o texto e o estilo no shell (item transversal).

## A mais no app (não está no desenho)
- Botão "Começar" antes da sessão: `src/views/revisao.js:176-178`. Tipo (a). O desenho abre a sessão direto.
- Resumo de fim de sessão ("Você acertou X de N.", a frase dos erros com certeza e o botão "Concluir"): `src/views/revisao.js:315-341`. Tipo (a), função real que o desenho não mostra. Manter, no estilo do desenho.
- Legenda em lista do ciclo ("primeira volta, ou depois de errar" / "acertou de novo, sobe um degrau"), centro "acertou?" e a nota "Acertou, sobe um degrau. Errou, volta para o primeiro. A escada é fixa…": `src/views/revisao.js:448-456`. Tipo (b).
- "A certa: …" como linha separada: `src/views/revisao.js:277-281`. Tipo (b); o desenho marca a certa no próprio botão.
- "Por que a sua não serve: …": `src/views/revisao.js:282-287`. Tipo (c): vem de `porqueErradas` em `src/data/modulo*.js` e aparece no desenho do Quiz, não no da Revisão.
- "Você disse: <confiança>. … Volta em N dias / Volta amanhã.": `src/views/revisao.js:288-298`. Tipo (b); o desenho usa "Acertou: sobe para o degrau N e volta em D dias." / "Errou: volta ao degrau 1 e reaparece amanhã.".
- Data absoluta "dd/mm" nas próximas revisões: `src/views/revisao.js:91-93,409`. Tipo (b).
- Limite de 6 pontos cegos: `src/views/revisao.js:382`. Tipo (a); o desenho não limita (mostra 4).

## Números
- Nenhum achado. As perguntas de exemplo do desenho saíram todas de `src/data` (grep: "cair pela metade" e "14,6" em `modulo6.js`, "não assinou nada" e "approval" em `modulo1.js`, "sustenta o preço" em `modulo2.js`, "por volta de 1%" em `modulo5.js`, "selo azul" em `modulo3.js`, "uma catálise, no sentido" e "10% do capital em cada" em `modulo4.js`/`modulo7.js`). As contagens da fila e da calibração do desenho são estado de exemplo. "Cepeda et al., 2006, e Latimier et al., 2021" são citações, iguais nos dois (no app, `revisao.js:438-439`). "68,67%" tem fonte (ver Início).

## Celular
- Desenho (390px): o ciclo de 360px **transborda** (a caixa do degrau 2 é cortada na borda direita e os arcos desalinham), o que é um defeito do protótipo. As barras de calibração, as origens e as colunas cabem, e as pílulas de confiança quebram linha.
- App (390px): o ciclo de 320px cabe, mas com as setas escondidas e as caixas 3 e 4 coladas. A sessão vira coluna (a grade de confiança passa a 1 coluna abaixo de `sm`).
- Fazer: ciclo com posições em % do palco (ou `overflow-x:auto; tabindex="0"` dentro da caixa, como pede o README); confiança em pílulas com `flex-wrap`; colunas das próximas revisões com rótulos que quebram sem desalinhar a base (no desenho, a coluna "amanhã" sai desalinhada porque as outras têm rótulo de 2 linhas).

## Trabalho para implantar
- `src/views/revisao.js`:
  - Cabeçalho com micro-rótulo e " e " no fim da lista de dias. **P**
  - Card da escada: h2, rótulo, ideia central, ciclo com contagem e vencidas por degrau, retorno vermelho, legenda de 3 itens e nota (tirar a legenda em lista). **M**
  - Card da fila: contagem, figura "De onde vêm as perguntas" (3 barras) e sessão inline sem "Começar". **M**
  - Sessão refeita: caixa roxa, chip de degrau, alternativas e pílulas de confiança, dica dinâmica, correção no lugar com marcas, trio vermelho/verde, ponto cego âmbar e frase de reagendamento; manter o resumo final e "Por que a sua não serve" (decisão). **G**
  - Estado vazio com os 2 link-botões. **P**
  - Calibração com barras, notas e legenda; pontos cegos com título âmbar, frase de contagem e origem em mono. **M**
  - Próximas revisões com 5 colunas, resumo à direita do h2 e data relativa. **M**
- `src/components/visuais.js` → `criarCiclo`: as mesmas extensões listadas no Início (`corRetorno`, `destaque` e `quantas` por etapa, geometria por tela, escala no celular). **M**, feito uma vez para as duas telas.
- `src/components/revisao.js`: um seletor de apoio `resumoDaFila()` que devolve `porDegrau`, `vencidasPorDegrau`, `origens` (quiz, glossário, respondidas) e `porJanela` (≤1, ≤3, ≤7, ≤16, >16 dias). Só leitura; não muda o formato do store. **P**
- `index.html` (shell, transversal): o texto do aviso ganha "não é recomendação de investimento", e o estilo passa a card âmbar se o shell seguir o desenho. **P**
- Componentes novos: `criarColunasNaMesmaEscala` (colunas verticais das próximas revisões, não existe nada parecido); barras em duas partes para a calibração e as origens (dá para reaproveitar `criarBarrasNaMesmaEscala`, `visuais.js:405`, com parâmetros de altura, cor por parte, nota colorida e legenda configurável); `criarPerguntaComConfianca` (alternativas `role=radio`, pílulas de confiança, dica, correção com marcas), para ser **compartilhado com `src/components/quiz.js`**, porque o desenho `34 Quiz e Simulador` usa o mesmo padrão e hoje o quiz também não o tem (ver o relatório da área Quiz).
