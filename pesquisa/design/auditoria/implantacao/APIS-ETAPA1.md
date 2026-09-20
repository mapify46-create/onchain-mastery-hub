# Componentes prontos da etapa 1 — como usar

Os relatórios completos, com a API final e exemplos, estão nesta pasta:
`etapa1-final-quiz.md`, `etapa1-final-simulador.md`, `etapa1-final-tempo-tabela.md`,
`etapa1-final-fluxo.md`, `etapa1-final-visuais.md`. Leia a seção da API de cada um
(a mais recente vale: "Correção 2" > "Correção 1" > "Relatório inicial"). **Leia o código
do componente antes de usar** — o código é a verdade.

## Moldura (feita pelo coordenador)
- `src/router.js` põe cada página numa coluna `.omh-coluna` (868px, 24px entre blocos) e
  acrescenta o aviso âmbar no fim (menos no Início). A view devolve só o conteúdo.
- `criarTitulo(texto, { rotulo, subtitulo })` — `rotulo` é o micro-rótulo ("Módulo 6").
- `criarAbas` — 44px, dispara `omh:aba-ativada`. `criarBotao` — 44px.
- `criarCardDaSecao(secao, { visual, pergunta, omitir:[...campos], depois:[...nós], class })`
  (`src/components/secao.js`): título → ideia central → **visual** → parágrafos → quadro
  (`quadro[i].destaque` = borda ciano) → listas → exemplo → parágrafos finais → "Para ir
  mais fundo" → `depois` → **pergunta**. `omitir` esconde campos do dado que o desenho
  trocou pelo visual (o dado fica no arquivo).
- `src/components/aviso.js` — `criarAvisoDeRodape()`, `TEXTO_DO_AVISO`.

## Quiz e didática (`quiz.js`, `didatica.js`)
- `montarQuiz({ id, titulo, descricao, perguntas, moduloNome, moduloId?, salvar=true })`
  — corrigido por pergunta (tela 34). Nos módulos: `moduloNome: 'Módulo N'`, SEM
  `moduloId` (o card "Terminou o módulo?" continua separado).
- `montarPerguntaRapida({ id, pergunta, moduloNome })` — a "Pergunta rápida" do fim de
  cada card (não grava). `id` sugerido: `mN-rapida-qK`. `pergunta` = item de
  `juntarPorques(moduloN.quiz, moduloN.porqueErradas)`.
- `montarSegmentos`, `montarPerguntaPrevia`, `montarPerguntaDaParte`, `montarTermos`
  (mesmas assinaturas, no traço do desenho).

## Simulador (`simulator.js`)
- `montarSimulador({ cenarios })` — já é o card inteiro da tela 34 (título, aviso, abertura).

## Linha do tempo e comparação (`linhaDoTempo.js`, `comparisonTable.js`)
- `montarLinhaDoTempo({ marcos, caixa: true, legenda?, nota?, proporcional=true, pxPorMes=1.2 })`
  — `caixa:true` devolve só a caixa interna, para ir dentro do card da seção. Escala por
  módulo como no desenho (M1 1.2, M2 6.7, M3 8). A data sai como está no dado.
- `montarComparacaoLadoALado({ criterios:[{chave,rotulo,decisivo?}], opcoes:[{titulo,subtitulo?,valores}], frase?, larguraMinima=560, orientacao?:'criterios-nas-linhas'|'opcoes-nas-linhas' })`
  e o formato antigo `{ colunas, linhas, decisivo:'chave' }`. `valores[chave]` pode ser
  `{ texto, tom:'ok'|'atencao'|'alerta'|'neutro' }`.

## Fluxogramas (`fluxograma.js`, `diagrama.js`)
- `criarFluxograma({ nos, setas, legenda?, titulo? })` ou `{ diagrama: 'Mermaid' | {nos,setas} }`
  → a caixa do desenho, sem card. `montarDiagrama` continua funcionando.
- `criarFluxoLinear({ inicio?, passos, fim?, legenda?, fechamento?, titulo?, variante:'espinha'|'trilho', numerar? })`
  — Checklist: `criarFluxoLinear({ ...checklistPreCompra.fluxograma })`; M6 (checagem do
  contrato): dados já prontos em `src/data/modulo6.js` (procure `checagem`), com
  `variante:'trilho', numerar:false`.

## Visuais (`visuais.js`)
- `criarMapaDoModulo({ mapa: moduloN.mapa, abas, idDasAbas, perguntas })` — o card "O
  módulo inteiro numa olhada" com o ramo da aba ativa sincronizado.
- `criarMapaMental`, `abrirAba`, `criarSequencia({ passos:[{titulo,texto,colunas?}], atual, frase, legenda, rotuloDaLista })`,
  `criarCiclo({ etapas, centro, frase, legenda, espacoDaLegenda, corRetorno, tamanho, raio, larguraDaCaixa, margem, marcador, descricao })`,
  `criarGradeDe100({ frase, grupos:[{rotulo,quantidade,cor:'ruim'|'bom'|'atencao'|'modelo'|'resto'}], fonte, exato, credito, contestacao, ... })`,
  `criarGradesLadoALado`, `criarBarrasNaMesmaEscala({ itens, maximo, legenda, exemploInventado, rodape, descricao })`,
  `criarCurvaDeslizante({...})` (genérica, para M4/M5/M7 também), `criarCurvaDeSaida()` (M6, sem argumento).
- Nenhum visual desenha título nem "Relação: …" por conta própria (só com
  `mostrarCabecalho: true`, que as telas gerais usam no cabeçalho do card, como no desenho).

## Pendências da etapa 1 que caem nas telas (faça na sua)
- M6: `criarCurvaDeSaida()` sem argumento; barras com os rótulos do desenho e `exibicao`
  em cada parte (valores de `src/data/modulo6.js`); fluxo do contrato com `criarFluxoLinear`.
- M2: campo `laco` em `src/data/modulo2.js` (etapas curtas, frase, centro "e o laço
  aperta", legenda) para o ciclo da dopamina; textos das grades (exato, crédito,
  contestação da pump.fun) em dado.
- M7: textos das grades em `src/data/modulo7.js`.
- M1: a sequência do drainer com `colunas` ("O que a vítima vê" / "O que está de fato
  acontecendo"), aberta no passo 3.
- Checklist: `criarFluxoLinear` no lugar da árvore.
- Glossário: o mapa clicável do desenho é um componente próprio da tela.
- Início: a trilha é uma lista vertical com status (não `criarSequencia`).
- Animações: estão sendo refeitas agora por outro fluxo, cada uma no seu arquivo em
  `src/components/animacoes/`. A view só chama `criarAnimacaoX()` de
  `../components/animacoes.js`, no lugar que o relatório da tela indica. Não edite os
  arquivos das animações.
