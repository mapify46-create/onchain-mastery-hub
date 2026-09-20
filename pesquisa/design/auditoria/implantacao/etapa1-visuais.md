# visuais

## Relatório inicial
Retomei a tarefa e conferi os 7 itens contra o código e contra o desenho. Boa parte já estava pronta de uma rodada anterior (arquivos de 18/09): `moldura()`, o mapa do módulo com o campo `mapa` nos 7 dados e as 7 chamadas, a correção das grades do M6 e do M7, os centros dos ciclos, as barras e a curva nova. Completei o que faltava e corrigi o que estava fora do desenho. O teste de fumaça `fumaca.mjs` passou em 1280px e em 390px, sem nenhum erro, exceção ou rolagem para o lado.

## Arquivos alterados nesta retomada
- **`src/components/visuais.js`**
  - **Ciclo:** as caixas de 2 ou 3 linhas da Revisão encostavam umas nas outras (defeito que o próprio desenho tem). Agora o círculo mede as caixas reais e cresce de 2 em 2px até elas ficarem a 8px uma da outra, com o traço de cada seta de pelo menos 12px. Onde as caixas já cabem, ele fica como no desenho: Início 340, M2 340, M3 360. Na Revisão vazia sobe de 360 para 376. O reajuste roda no quadro seguinte, para não dar o erro "ResizeObserver loop".
  - **Sequência:** aceita `colunas` por passo, para montar o painel "O que a vítima vê / O que está de fato acontecendo" do M1, e `rotuloDaLista`, o nome da lista para o leitor de tela.
  - **Grade de 100:** nova opção `espacoDaLegenda` (10px no M2 e no M7, como no desenho).
  - **Curva do M6:** a liquidez passa a ser lida de `modulo6.js` (seção "quanto-sai", "US$ 8 mil"), em vez do 8000 escrito à mão. Se o texto do dado mudar e a leitura falhar, a faixa em dólar some, em vez de mostrar um número inventado.
- **`styles/custom.css`**
  - Mapa: o centro usa `box-sizing: content-box`. Os 220px do desenho são só do texto, e antes o subtítulo quebrava em 2 linhas. O espaço antes do "→" dos ramos caiu para 4px.
  - Sequência: os passos esticam até a altura do mais alto, com a seta no meio, como no uso real do M1 e do M2. Entrou a classe do painel em colunas.
- **`src/views/modulo7.js`**: `espacoDaLegenda: 10` nas duas chamadas de `criarGradeDe100`.

## API para a etapa 2
- **`criarMapaDoModulo({ mapa, abas, idDasAbas, perguntas })`**
  - Ex.: `criarMapaDoModulo({ mapa: modulo6.mapa, abas: [{id:'numeros',rotulo:'Os números'}, …, {id:'quiz',rotulo:'Quiz'}], idDasAbas: 'modulo-6', perguntas: modulo6.quiz.length })`
  - O ramo da aba aberta fica roxo pelo evento `omh:aba-ativada`. Clicar no ramo abre a aba e leva o foco ao painel.
- **`criarMapaMental({ centro:{rotulo?,titulo,subtitulo?}, ramos:[{titulo,folhas,href?|aoAbrir?,concluido?}], limite=3, nota?, mostrarCabecalho?, titulo?, rotulo? })`**
- **`criarSequencia({ passos:[{titulo, texto?, colunas?:[{rotulo,texto}]}], atual=0, frase?, legenda?, rotuloDaLista='Passos' })`**
  - Ex.: `criarSequencia({ frase:'Como um drainer esvazia a carteira — clique num passo', rotuloDaLista:'Passos do drainer', atual:2, passos: modulo1.roteiroDrainer.map(p=>({ titulo:p.titulo, colunas:[{rotulo:'O que a vítima vê',texto:p.oQueVeem},{rotulo:'O que está de fato acontecendo',texto:p.oQueAcontece}] })) })`
- **`criarCiclo({ etapas:[{titulo,detalhe?,nota?,texto?,destaque?,tituloMono?,href?}], centro?: string|{texto,cor,tamanho,largura}, tamanho, raio, larguraDaCaixa, margem, corRetorno, marcador:'acento'|'neutro', descricao?, legenda? })`**
  - Ex. da Revisão: `centro:{texto:'errou: volta ao degrau 1', cor:'#F87171', tamanho:11, largura:104}`
- **`criarGradeDe100({ frase, grupos:[{rotulo,quantidade,cor:'ruim'|'bom'|'atencao'|'modelo'|'resto', exibicao?, tracejado?}], fonte?, exato?, credito?, contestacao?, caixa=true, padding='16px', tamanhoDaFrase=15, espacoDaLegenda=12, descricao? })`**
  - O arquivo também exporta `CORES_DA_GRADE`.
- **`criarBarrasNaMesmaEscala({ itens:[{rotulo,valor,exibicao,nota?,estilo?:'solido'|'tracejado'|'listrado',cor?,partes?}], legenda?:{solido?,tracejado?,listrado?}, exemploInventado?, rodape?, maximo?, descricao? })`**
  - Cada estilo só entra na legenda se aparecer numa barra e se quem chama der o rótulo; o tracejado usa "no papel" como padrão.
- **`criarCurvaDeslizante({ controle:{rotulo,min,max,passo,valor,formatar}, curva:{pontos,dominioX,dominioY,eixoX,eixoY,origem?,rotuloOrigem?,formula?}, marcador:(v,extras)=>({x,y}), numeros:(v,extras)=>[{rotulo,valor,nota?}|{largo:true,rotulo,valor}], atalhos:[{rotulo,valor}], alternativas:[{rotulo,extras}], descricao? })`**
- **`criarCurvaDeSaida()`**, sem argumento.
- Título e "Relação: …" só aparecem com `mostrarCabecalho: true`.

## O que ficou igual ao desenho (conferido com capturas)
- **Mapa:** M1, M3, M5 e M6 praticamente pixel a pixel, a 1280px e a 390px. No celular, ramos de 44px e centro na largura toda.
- **Grades:** M6 (95 vermelhos e 5 alarmes falsos em `#1F2733`; 68 roxos e 32 em `#1F2733`) e M7 (ruína com 100 vermelhos e "99,5%"; efeito 0,40) idênticas.
- **Curva do M6:**
  - Desenho igual, e os textos do gráfico ficam com 11px de verdade no celular.
  - Os números batem com o dado: 2,57% e 5,41% em "Cair 10%"; 14,64%, 41,42% e US$ 1.171 em "Cair pela metade"; US$ 11.712 com "Pool 10×".
  - Atalhos de 40px, `<label>` + `<output>` e `aria-valuetext`.
- **Ciclos** do Início, M2, M3 e Revisão: setas encostam nas caixas e o texto do centro é o de cada desenho.
- **Sequência:** sem o texto duplicado no desktop; `tabindex="0"` só quando a lista rola.
- **Teclado:** ← → Home End na sequência, e abrir aba pelo mapa, testados.

## O que não deu, e por quê (tudo fora dos meus arquivos)
- **`modulo6.js`** ainda chama `criarCurvaDeSaida({ liquidez: 8000 })`. O resultado é o mesmo, mas a linha não era minha; na etapa 2, chamar sem argumento.
- **Ciclo do M2:** o desenho tem 5 etapas curtas ("Alta na tela", "Dopamina", "Opera mais vezes", "Posições maiores", "Menos checagem") que não existem em `src/data`. Falta um campo em `modulo2.js`.
- **Grades do M2** (figura com "exato", crédito e caixa "Contestado"): o componente já aceita, mas os textos precisam ir para `modulo2.js`.
- **Barras do M6:** os rótulos da chamada diferem do desenho ("Market cap (= FDV aqui)", "tokens na pool", "SOL: paga quem vende"). É a chamada de `criarBarrasNaMesmaEscala` na view, que não era minha.
- **Trilha do Início:** com 7 passos estreitos, as palavras quebram no meio. No desenho, essa trilha nem é uma sequência, e a tela será refeita na etapa 2.
- **Ramo "concluído"** (verde) no mapa: o componente já aceita, mas `criarMapaDoModulo` não recebe o progresso. Não fazia parte da tarefa.
- **Mapa do Glossário:** o do desenho é outro componente (clicável, com os 34 termos). Fica para a tela do Glossário.
- **Textos do desenho das grades do M7** estão escritos na view; na etapa 2, passam para `src/data`.

## Capturas-chave
Pasta: `C:/Users/dreis/AppData/Local/Temp/claude/C--Users-dreis-Documents-onchain-mastery-hub/c6d85c7e-adeb-4e71-a56b-8b4f28704e46/scratchpad/shots/`
- Mapa do M6: `vz-m6-mapa-app2-01.png` (app) × `vz-m6-mapa-des-01.png` (desenho).
- Revisão com perguntas, caixas sem encostar: `vz-revisao-cheia-app3-01.png` × `vz-revisao-ciclo-des-01.png`.
- Curva do M6: `vz-m6-curva-app-1280-01.png` × `vz-m6-curva-des-01.png`, e o celular em `vz-m6-curva-app-390-01.png`.

## Correção 1
Corrigi os três defeitos que eram das minhas partes. Três outros ficaram para a etapa 2: dependem de campos em `src/data` ou de arquivos que não são meus, então não mexi. A fumaça saiu limpa nas duas larguras: 11 telas cada, sem erro, sem exceção e sem rolagem lateral.

Arquivos alterados:
- `C:/Users/dreis/Documents/onchain-mastery-hub/src/components/visuais.js`
- `C:/Users/dreis/Documents/onchain-mastery-hub/styles/custom.css` (só nos blocos `.omh-mapa-card` e `.omh-sequencia-painel`)
- `C:/Users/dreis/Documents/onchain-mastery-hub/src/views/revisao.js` (só o `descricao` da chamada de `criarCiclo`)

## Defeito por defeito

**3. Sequência com texto duplicado no celular (média): corrigido.**
- Em ≤640px o painel roxo sai da tela, mas continua lá para o leitor de tela, com `aria-live`. O texto aparece uma vez só, dentro do passo, como no "00 Componentes › Celular".
- O texto dentro do botão ficou `aria-hidden`, para o leitor de tela não ouvir duas vezes.
- Passo com `colunas` não leva texto no botão, e o painel fica visível nas duas larguras, como no M1 compacto.
- Medido: a 390px o painel não aparece e o texto do passo sim; a 1280px é o contrário. As setas ← e Home funcionam.

**4. Ciclo do M2 (média): corrigido em parte.**
- `criarCiclo` agora aceita `frase` e a passa para a caixa.
- A chamada do M2 não mudou. As 5 etapas curtas, a frase e a legenda do desenho não existem em `src/data`, e o campo `laco` em `src/data/modulo2.js` não é meu (o m2.md, linha 113, já o põe na etapa 2).

**1/4. Caixa e letras do ciclo no celular (baixa): corrigido.**
- O padding passou para `clamp(16px, 4vw, 20px)`: 16px no celular, 20px no desktop.
- O ciclo não encolhe mais inteiro. Quando a área é mais estreita que o círculo, ele vira um oval da largura da área, e a altura cresce o que precisar.
- Se preciso, o texto do centro quebra em mais linhas (largura máxima menor), para não encostar nas caixas.
- O encolhimento inteiro ficou só como último recurso, para telas menores que 390px.
- O ajuste leva de 10 a 14ms e não roda de novo se a largura e as caixas não mudaram.
- A 390px, todos em escala 1, sem caixas sobrepostas e sem nada saindo da figura:

| Tela | Palco | Menor letra |
|---|---|---|
| Início | 282×340 | 11px |
| M2 | 324×340 | 12px |
| M3 | 324×360 | 12px |
| Revisão | 324×448 | 11px |

- No desktop a geometria segue o desenho: Início 340, M2 340, M3 360. A Revisão fica em 376, como antes, porque as caixas reais têm 106px de altura.
- Também medi a Revisão em 360, 375, 430 e 500px: sem encolher e com todas as letras em 11px ou mais.

**7/2. Alvo de toque dos atalhos (baixa): corrigido.**
- Os atalhos agora usam as classes `min-h-[44px] sm:min-h-[40px]`: medido 44px a 390px e 40px a 1280px, como no desenho.
- Os ramos do mapa já tinham 44/40.

**7. Liquidez da curva escrita à mão (baixa): corrigido sem mexer na view.**
- `criarCurvaDeSaida` agora usa sempre a liquidez lida de `src/data/modulo6.js`. O `liquidez` passado só vale se não der para ler o dado.
- Testado com `criarCurvaDeSaida({ liquidez: 1234 })`: a faixa continua "US$ 8 mil ≈ US$ 206".
- Na etapa 2, o `8000` pode sair de `modulo6.js`.

**Rótulos do desenho em `src/data` (baixa): não mudei.** Os textos das grades de M6 e M7 precisam de campos novos em `src/data`, e só o campo `mapa` é meu. Fica para a etapa 2.

**5. Grades do M2 no formato antigo (baixa): não mudei a chamada**, pelo mesmo motivo (falta o campo `grades` em `src/data/modulo2.js`). Deixei o componente pronto para a etapa 2:
- Nova `criarGradesLadoALado`: uma figura com a frase no topo, as grades em `auto-fit minmax(250px)` e a legenda comum embaixo.
- A alternativa em texto de `criarGradeDe100` agora inclui "Número exato: … (crédito)." e a contestação, como no desenho.

**2. Espaço entre o mapa e as abas (baixa): corrigido.**
- `.omh-mapa-card` ganhou `margin-bottom: 24px`. Medido nos 7 módulos, nas duas larguras: 24px acima e 24px abaixo.
- Isso é provisório e está comentado no CSS: quando a view usar uma coluna com gap de 24px, essa margem tem de sair, senão o espaço dobra.

**Nota inventada no Glossário (baixa): não mudei.** A chamada fica em `src/views/glossario.js`, que não é meu. Quem cuida do Glossário, ou a etapa 2, tira a `nota` de lá.

**7. Tamanho do texto do gráfico no desktop (baixa): corrigido.**
- O gráfico agora acompanha a própria largura (`container-type:inline-size`), e o texto usa `max(11px, 3.4375cqw)`.
- Medido: 12,375px a 1280px e 11px a 390px.

**4. "cinco" na alternativa da Revisão (baixa): corrigido.** A frase agora sai "Escada de cinco degraus: …", com o número por extenso dentro da própria chamada.

## API final (para a etapa 2)
- **Mapa do módulo:**
  `criarMapaDoModulo({ mapa: moduloN.mapa, abas: [{id, rotulo}, …, {id:'quiz', rotulo:'Quiz'}], idDasAbas: 'modulo-N', perguntas: moduloN.quiz.length })`
- **Mapa genérico:**
  `criarMapaMental({ centro: {titulo, subtitulo?}, ramos: [{titulo, folhas, href?|aoAbrir?, concluido?}], limite, mostrarCabecalho })`
- **Sequência:**
  `criarSequencia({ frase, rotuloDaLista, legenda, atual, passos: [{titulo, texto} | {titulo, colunas: [{rotulo, texto}]}] })`
  - Exemplo M1: `criarSequencia({ frase: 'Como um drainer esvazia a carteira — clique num passo', rotuloDaLista: 'Passos do drainer', passos: modulo1.roteiroDrainer.map(p => ({ titulo: p.titulo, colunas: [{ rotulo: 'O que a vítima vê', texto: p.oQueVeem }, { rotulo: 'O que está de fato acontecendo', texto: p.oQueAcontece }] })) })`
- **Ciclo:**
  `criarCiclo({ etapas: [{titulo, detalhe?, nota?, texto?, destaque?, tituloMono?, href?}], tamanho, raio, larguraDaCaixa, margem, centro: 'texto' | {texto, cor, tamanho, largura}, frase, legenda, corRetorno, marcador: 'neutro', descricao })`
  - Exemplo M2, quando o campo `laco` existir: `criarCiclo({ etapas: modulo2.laco.etapas.map(t => ({ titulo: t })), tamanho: 340, raio: 116, larguraDaCaixa: 112, margem: 2, centro: { texto: 'e o laço aperta', largura: 96 }, frase: modulo2.laco.frase, legenda: modulo2.laco.legenda, descricao: modulo2.laco.alternativa })`
- **Grade de 100:**
  `criarGradeDe100({ frase, grupos: [{rotulo, quantidade, cor: 'ruim'|'bom'|'atencao'|'modelo'|'resto', exibicao?, tracejado?}], fonte, exato, credito, contestacao, caixa, padding, tamanhoDaFrase, espacoDaLegenda, descricao })`
- **Duas grades numa figura (nova):**
  `criarGradesLadoALado({ frase, grades: [opções de criarGradeDe100], legenda })`
  - Exemplo M2: `criarGradesLadoALado({ frase: modulo2.grades.frase, grades: modulo2.grades.itens, legenda: modulo2.grades.legenda })`
- **Barras:**
  `criarBarrasNaMesmaEscala({ itens: [{rotulo, valor, exibicao, estilo?, cor?, partes?}], legenda: {solido, tracejado, listrado}, exemploInventado, rodape, maximo })`
- **Curva:**
  `criarCurvaDeslizante({ controle: {rotulo, min, max, passo, valor, formatar}, curva: {pontos, dominioX, dominioY, eixoX, eixoY, origem, rotuloOrigem, formula}, marcador, numeros, atalhos, alternativas, descricao })`
  - No M6, basta `criarCurvaDeSaida()`, sem argumento.
- **Abrir aba pelo mapa:** `abrirAba(idDoBotao)`

## Capturas-chave
Na pasta `C:/Users/dreis/AppData/Local/Temp/claude/C--Users-dreis-Documents-onchain-mastery-hub/c6d85c7e-adeb-4e71-a56b-8b4f28704e46/scratchpad/shots/`:
- `vz4-final-ciclo-rev-390-01.png`: o oval da Revisão, sem encolher, letras de 11px.
- `vz4-final-seq-ini-390-01.png` e `vz4-seq-m1-390-01.png`: o texto aparece uma vez só.
- `vz4-curva-m6-1280-01.png` e `vz4-curva-m6-390-01.png`: a curva nas duas larguras.
- Outros ciclos: `vz4-ciclo-m3-390-01.png`, `vz4-ciclo-ini-390-01.png`, `vz4-ciclo-m2-390-01.png`, `vz4-ciclo-rev-1280-01.png`.

A saída da fumaça está em `scratchpad/vz4-fumaca-1280.txt` e `scratchpad/vz4-fumaca-390.txt`.

## Defeitos rodada 2
[
 {
  "item": "3. criarSequencia: palavras cortadas no meio no desktop (regressão desta etapa)",
  "onde": "styles/custom.css:550-553 (.omh-sequencia-passo com min-width:0) e 591-597 (.omh-sequencia-titulo com overflow-wrap:break-word). Telas #/inicio (trilha) e #/modulo-6 › Volume falso, a 1280px",
  "desenho": "Nos usos reais do desenho (M1 drainer, M2 fases), os títulos dos passos são curtos e nenhuma palavra quebra. A auditoria trata palavra cortada no meio como 'defeito real' (a legenda do ciclo do M3 saía como '(po', 'vário'). No HEAD o botão não tinha min-width:0 e o título não tinha overflow-wrap, então nenhuma palavra quebrava.",
  "app": "Medido palavra por palavra com Range.getClientRects a 1280px. No Início quebram 'Fundame|ntos', 'Seguran|ça', 'Psicologi|a', 'memecoi|ns', 'mecânic|a' e 'execuçã|o'; no M6 Volume falso, 'Comprad|ores'. Cada li fica em 150px e sobram cerca de 64px para o título. Capturas: rev-visuais-r2-seq-ini-app-1280-01.png e rev-visuais-r2-seq-m6-app-1280-01.png. A 390px nada quebra.",
  "gravidade": "media",
  "correcao": "Acima de 640px: `.omh-sequencia > li { flex: 1 0 150px; min-width: min-content }` e `.omh-sequencia-passo { min-width: auto }`. Testei injetando o CSS na página: nenhuma palavra cortada, nenhum botão passando do seu li, e a lista continua rolando dentro da caixa (1094px, com tabindex=0). O celular não muda."
 },
 {
  "item": "6. criarBarrasNaMesmaEscala: alternativa em texto quebrada",
  "onde": "src/components/visuais.js:991-1002 (a alternativa monta `rotulo + ': ' + (p.exibicao ?? '')` para cada parte); o docstring em visuais.js:962 aceita partes sem `exibicao`. Tela #/modulo-6 › Os números",
  "desenho": "00 Componentes, linha 855: 'Market cap — US$ 50 mil (no papel); Liquidez na pool — US$ 8 mil (tokens: US$ 4 mil; SOL, o lado que paga quem vende: US$ 4 mil). Exemplo inventado.' O M6 Desktop (linha 82) tem uma frase equivalente. README: a alternativa é gerada dos dados.",
  "app": "aria-label medido: 'Market cap = FDV — US$ 50 mil; Liquidez na pool — US$ 8 mil (tokens: ; SOL: ). Exemplo inventado.' Um leitor de tela lê os dois-pontos e o ponto e vírgula sem valor, e perde a relação que o visual mostra: só a metade em SOL paga quem vende.",
  "gravidade": "media",
  "correcao": "Na alternativa, usar só as partes que têm `exibicao`. Parte sem valor sai sem ': '. Se nenhuma parte tiver valor, tirar os parênteses. Na etapa 2, a chamada do M6 passa `exibicao` em cada parte, com o valor tirado do dado."
 },
 {
  "item": "4. criarCiclo: ciclo da dopamina (M2) ainda diferente do desenho (pendente do histórico, corrigido só em parte)",
  "onde": "src/views/modulo2.js:436-451. O componente já aceita `frase` (visuais.js:468 e 795)",
  "desenho": "M2 Desktop, linhas 106-130 e 468-480: 5 etapas curtas ('Alta na tela', 'Dopamina', 'Opera mais vezes', 'Posições maiores', 'Menos checagem'). No topo, a frase 'O laço que se fecha: o ganho de ontem financia o erro de amanhã'. Figcaption 'Como a recompensa vem às vezes…' com margin-top de 16px. A alternativa termina em '…O ganho de ontem financia o erro de amanhã.'",
  "app": "Medido a 1280px: 4 caixas com as frases longas de exemplo.passos, de 80 a 96px de altura. Não há frase no topo. Legenda: 'O ganho de ontem financia o erro de amanhã.', com margin-top de 12px. Alternativa: '1 Você acerta algumas operações. → … → volta a 1, e o laço aperta.' Capturas: rev-visuais-r2-ciclo-m2-app-1280-01.png e rev-visuais-r2-ciclo-m2-des-1280-01.png. O centro 'e o laço aperta' (12px, ciano, largura máxima 96px) está igual.",
  "gravidade": "media",
  "correcao": "Precisa do campo `laco` em src/data/modulo2.js (m2.md, linha 113). A tarefa só libera o campo `mapa`, então fica para a etapa 2, ou o dono autoriza agora. Depois, a chamada usa etapas, frase, legenda e descricao do campo, como no exemplo da API que o corretor deixou."
 },
 {
  "item": "5. criarGradeDe100: grades do M2 ainda no formato antigo (pendente do histórico)",
  "onde": "src/views/modulo2.js:410-431",
  "desenho": "M2 Desktop, linhas 362-380 e 593-601: uma figura com '\"Vai a zero\" depende da régua — de cada 100 tokens do Pump.fun'. Em cada grade: frase, a linha '68,67% exato · CoinGecko Research · 18,67 mi de tokens' e, na de 98,6%, a caixa âmbar 'Contestado'. Uma figcaption comum embaixo.",
  "app": "Medido: duas figuras separadas, com as frases antigas ('De cada 100 tokens do Pump.fun, 69 pararam de negociar no mesmo dia.', 'Pela liquidez, 99 de cada 100 — mas essa medida é contestada.'), frase de 15px e padding de 16px. Não há linha do exato nem caixa Contestado. O componente já está pronto: criarGradesLadoALado, e exato/credito/contestacao, que conferi contra a marcação do desenho.",
  "gravidade": "baixa",
  "correcao": "Na etapa 2: criar o campo `grades` em src/data/modulo2.js e chamar criarGradesLadoALado({ frase, grades, legenda })."
 },
 {
  "item": "Regra: rótulos do desenho que são dado vão para src/data (pendente do histórico)",
  "onde": "src/views/modulo6.js:170-195 ('são rug mesmo', 'alarme falso', 'o modelo pega', 'passam despercebidos', prefixo 'Estimativa: '); src/views/modulo7.js:155-199 (frases, rótulos, fonte e descrição das duas grades)",
  "desenho": "INSTRUCOES-IMPLANTACAO: 'Rótulos do desenho que forem dado (não interface) vão para src/data'.",
  "app": "Os textos batem com o M6 Desktop (linhas 759-761) e com o M7 Desktop (linhas 241-281), e os números têm origem em src/data. Mas os textos continuam escritos no código das views.",
  "gravidade": "baixa",
  "correcao": "Na etapa 2, mover esses textos para src/data/modulo6.js e src/data/modulo7.js (por exemplo, um campo `grades`) e ler de lá."
 },
 {
  "item": "Fora dos arquivos desta tarefa: chamadas e textos que ainda diferem do desenho (para a etapa 2)",
  "onde": "src/views/glossario.js:27 (nota de criarMapaMental); src/views/modulo6.js:244-256 (barras); src/views/modulo1.js:229-237 (sequência do drainer)",
  "desenho": "32 Glossario não tem a nota 'Alguns termos aparecem em mais de uma categoria…'. M6 Desktop, linhas 82-99: legenda 'tokens na pool' e 'SOL: paga quem vende', rótulo 'Market cap (= FDV aqui)', espaço de 18px entre as barras e legenda a 14px. M1 Desktop, linhas 308-320: frase 'Como um drainer esvazia a carteira — clique num passo', painel com as colunas 'O que a vítima vê' e 'O que está de fato acontecendo', e a legenda '…O passo 3 é o ponto de virada.'",
  "app": "#/glossario mostra a nota inventada. As barras do M6 usam os rótulos da vitrine 00 Componentes ('dinheiro na pool', 'o lado que paga quem vende') e as notas antigas da view. A sequência do drainer no M1 sai com 'PASSO N DE 5' e texto, sem frase e sem colunas. O componente já aceita `frase` e `colunas`.",
  "gravidade": "baixa",
  "correcao": "Na etapa 2, nas views: tirar a `nota` do Glossário; passar os rótulos do M6 Desktop nas barras; montar o drainer com { frase, rotuloDaLista, passos com colunas }, lendo de src/data."
 }
]

## Correção 2
Resultado da rodada: corrigi os três defeitos, o do ciclo do M2 só em parte. O resto dele depende de um campo novo em `src/data/modulo2.js`, que não é arquivo meu nesta etapa. `fumaca.mjs` a 1280px e a 390px saiu sem erro, sem exceção e sem "rola para o lado".

**Arquivos alterados:** `src/components/visuais.js`, `styles/custom.css` (só o bloco `.omh-sequencia*`) e `src/views/modulo2.js` (só a chamada de `criarCiclo`).

## Defeitos

**3. `criarSequencia`, palavras cortadas no desktop: corrigido.**
- Acima de 640px, cada `li` passou a `flex: 1 0 150px; min-width: min-content`, e o botão do passo perdeu o `min-width: 0`.
- No celular o `li` fica `flex: 1 1 0` como antes, e a lista vertical não muda.
- Medi palavra por palavra com `Range.getClientRects` nas 8 sequências (Início, M1 ×2, M2, M4, M5 ×2, M6):
  - Antes, a 1280px: Início cortava Fundamentos, Segurança, Psicologia, memecoins, mecânica e execução; M6 cortava Compradores.
  - Depois, a 1280px e a 390px: nenhuma palavra cortada e nenhum botão passa do seu `li`.
  - Início e M6 › Volume falso rolam dentro da caixa (1094/826 e 928/826) com `tabindex="0"`.

**6. `criarBarrasNaMesmaEscala`, alternativa em texto quebrada: corrigido.**
- A alternativa agora é gerada assim:
  - uma frase por barra;
  - parte com `exibicao` sai como "rótulo: valor", e parte sem valor sai sem ": ";
  - se nenhuma parte tem valor, não há parênteses;
  - barra de um estilo só leva o rótulo da legenda, como o "(no papel)" do desenho.
- Acrescentei a `nota` de cada barra, que não estava no pedido do revisor: ela fica dentro do `role="img"` e o leitor de tela não a lia. É ela que devolve agora a ideia de que só a metade em SOL paga quem vende.
- M6 medido: "Market cap = FDV — US$ 50 mil (no papel). Preço da última negociação × 1 bilhão de tokens. Ninguém tem esse dinheiro. Liquidez na pool — US$ 8 mil. Só a metade em SOL (US$ 4 mil) paga quem vende. Exemplo inventado."
- Com `exibicao` nas partes: "… Liquidez na pool — US$ 8 mil (tokens: US$ 4 mil; SOL: US$ 4 mil). …"
- M3, M4 e M7 não mostram mais ": ;" soltos.
- Na etapa 2, a chamada do M6 ainda precisa passar `exibicao` em cada parte, com o valor lido de `src/data/modulo6.js`.

**4. `criarCiclo`, laço da dopamina do M2: em parte.**
- Feito:
  - opção nova `espacoDaLegenda` (padrão 12; o M2 do desenho usa 16);
  - a frase do dado "O ganho de ontem financia o erro de amanhã." saiu da legenda e foi para o topo, em negrito, onde o desenho a põe. Não inventei o prefixo "O laço que se fecha:".
- Não mudei o resto:
  - as 5 etapas curtas, a frase inteira, a legenda "Como a recompensa…" e a alternativa só existem no desenho (M2 Desktop, linhas 108, 469–471, 474 e 480);
  - a regra manda texto do desenho que é dado para `src/data`, e na tarefa só o campo `mapa` é meu;
  - fica para a etapa 2, ou para o dono autorizar, criar em `src/data/modulo2.js`:
    `laco: { frase, etapas: ['Alta na tela','Dopamina','Opera mais vezes','Posições maiores','Menos checagem'], centro: 'e o laço aperta', legenda, descricao }`

## API final (para a etapa 2)

- **`criarMapaDoModulo({ mapa, abas, idDasAbas, perguntas })`**
  `criarMapaDoModulo({ mapa: modulo6.mapa, idDasAbas: 'modulo-6', perguntas: modulo6.quiz.length, abas: [{ id: 'numeros', rotulo: 'Os números' }, …, { id: 'quiz', rotulo: 'Quiz' }] })`
  O formato antigo (`nome`, `subtitulo`, `secoes`, `limite`) continua aceito.
- **`criarMapaMental({ centro, ramos: [{ titulo, folhas, href?, aoAbrir?, concluido? }], limite = 3, mostrarCabecalho? })`**
- **`abrirAba(idDoBotao)`**
- **`criarSequencia({ passos: [{ titulo, texto, colunas? }], atual = 0, frase, legenda, rotuloDaLista })`**
  `criarSequencia({ frase: '…', rotuloDaLista: 'Passos do drainer', passos: modulo1.roteiroDrainer.map((p) => ({ titulo: p.titulo, colunas: [{ rotulo: 'O que a vítima vê', texto: p.oQueVeem }, { rotulo: 'O que está de fato acontecendo', texto: p.oQueAcontece }] })) })`
- **`criarCiclo({ etapas, centro, frase, legenda, espacoDaLegenda = 12, corRetorno, tamanho, raio, larguraDaCaixa, margem, marcador, descricao })`**
  - `etapas`: `[{ titulo, detalhe?, nota?, texto?, destaque?, tituloMono?, href? }]`
  - `centro`: texto ou `{ texto, cor, tamanho, largura }`
  - M2, com o campo `laco`: `criarCiclo({ tamanho: 340, raio: 116, larguraDaCaixa: 112, margem: 2, etapas: modulo2.laco.etapas.map((titulo) => ({ titulo })), centro: { texto: modulo2.laco.centro, largura: 96 }, frase: modulo2.laco.frase, legenda: modulo2.laco.legenda, espacoDaLegenda: 16, descricao: modulo2.laco.descricao })`
  - Revisão: `centro: { texto: 'errou: volta ao degrau 1', cor: '#F87171', tamanho: 11, largura: 104 }, corRetorno: '#EF4444', marcador: 'neutro'`
- **`criarGradeDe100({ frase, grupos, fonte, exato, credito, contestacao, caixa, padding, tamanhoDaFrase, espacoDaLegenda, descricao })`**
  - `grupos`: `[{ rotulo, quantidade, cor, exibicao?, tracejado? }]`
  - `cor`: `'ruim' | 'bom' | 'atencao' | 'modelo' | 'resto'` ou o hex; as cores estão em `CORES_DA_GRADE`, que é exportado.
  - Exemplo: `criarGradeDe100({ frase: 'De cada 100 rugs reais, ele pega uns 68.', grupos: [{ rotulo: 'o modelo pega', quantidade: 68, cor: 'modelo' }, { rotulo: 'passam despercebidos', quantidade: 32, cor: 'resto' }] })`
- **`criarGradesLadoALado({ frase, grades: [opções de criarGradeDe100], legenda })`**
- **`criarBarrasNaMesmaEscala({ itens, maximo, legenda: { tracejado, solido, listrado }, exemploInventado, rodape, descricao })`**
  - `itens`: `[{ rotulo, valor, exibicao, nota?, estilo?, cor?, partes?: [{ rotulo, valor, estilo, cor?, exibicao? }] }]`
  - Exemplo: `criarBarrasNaMesmaEscala({ exemploInventado: true, legenda: {...}, itens: [{ rotulo: 'Market cap', valor: 50000, exibicao: 'US$ 50 mil', estilo: 'tracejado' }, { rotulo: 'Liquidez na pool', valor: 8000, exibicao: 'US$ 8 mil', partes: [{ rotulo: 'tokens', valor: 4000, exibicao: 'US$ 4 mil', estilo: 'solido' }, { rotulo: 'SOL', valor: 4000, exibicao: 'US$ 4 mil', estilo: 'listrado' }] }] })`
- **`criarCurvaDeslizante({ controle: { rotulo, min, max, passo, valor, formatar }, curva: { pontos, dominioX, dominioY, eixoX, eixoY, origem, rotuloOrigem, formula }, marcador, numeros, atalhos, alternativas, descricao })`**
- **`criarCurvaDeSaida()`**: os números vêm de `src/data/modulo6.js`; `{ liquidez }` só vale como reserva.

## Capturas principais

Pasta: `C:/Users/dreis/AppData/Local/Temp/claude/C--Users-dreis-Documents-onchain-mastery-hub/c6d85c7e-adeb-4e71-a56b-8b4f28704e46/scratchpad/shots/`
- `vz5-seq-ini-1280-01.png` e `vz5-seq-m6-1280-01.png`: sequências sem palavra cortada
- `vz5-seq-ini-390-01.png` e `vz5-seq-m6-390-01.png`: celular sem mudança
- `vz5-ciclo-m2-1280-01.png` e `vz5-ciclo-m2-390-01.png`: laço com a frase no topo

As saídas da fumaça estão em `vz5-fumaca-1280.txt` e `vz5-fumaca-390.txt`, na pasta de trabalho logo acima de `shots/`.
