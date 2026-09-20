# Tarefa: o vocabulário visual de src/components/visuais.js no desenho, e o mapa do módulo

SEUS ARQUIVOS: `src/components/visuais.js`; as regras `.omh-mapa*` e `.omh-sequencia*` de `styles/custom.css` (só esses blocos); um campo NOVO `mapa` em cada `src/data/modulo1.js` … `modulo7.js` (só acrescentar esse campo); e, nas views, SÓ as chamadas de `criarMapaDoModulo`, `criarCiclo` e `criarGradeDe100` (em `src/views/*.js`).
Relatórios: `pesquisa/design/auditoria/componentes.md` (seções 1, 3–7, "A mais" e "Trabalho › visuais.js"), `inicio-revisao.md` (ciclo), `m6.md`, `m7.md`, `m3.md`, `m2.md`. Desenhos: `00 Componentes.dc.html` e o uso real nos `M1..M7 Desktop.dc.html` (mapa "O módulo inteiro numa olhada"; `ABAS`/folhas no `renderVals`), `30 Inicio`, `33 Revisao`.

CONTRATO JÁ PRONTO em `src/ui.js` (não edite ui.js): `criarAbas` dispara `document.dispatchEvent(new CustomEvent('omh:aba-ativada', { detail: { id, aba } }))` a cada troca, inclusive na PRIMEIRA ativação (aba 0), que acontece dentro de `criarAbas`, antes de a view entrar no DOM. Não remova o listener só por `!isConnected` nesse momento; remova só depois de o mapa já ter estado conectado e saído.

1. `moldura()`: o visual passa a ser só a caixa interna #0B0F17 (raio 8, padding 16–20), SEM título e SEM "Relação: …". Os parâmetros `titulo`/`rotulo` continuam aceitos, mas só aparecem com uma opção explícita (ex. `mostrarCabecalho:true`), para as telas gerais usarem depois.
2. Mapa do módulo (`criarMapaDoModulo`) como nos módulos do desenho:
   - `<section aria-label="Mapa do módulo">` com card #141A24 (raio 12, padding 20), micro-rótulo "O módulo inteiro numa olhada" e UMA caixa interna #0B0F17;
   - centro só com título + subtítulo (sem "MÓDULO N"), padding 14px 18px, max-width 220px;
   - um ramo por aba, INCLUINDO o Quiz (folha "N perguntas", N calculado);
   - folhas CURTAS do novo campo `mapa` de cada `src/data/moduloN.js`, copiadas exatamente do `renderVals()` (`ABAS`/`folhas`) de cada `M<N> Desktop.dc.html`;
   - ramo da aba ativa em roxo (#7C3AED + .15), sincronizado pelo evento acima; começa na primeira aba;
   - estilos em classes CSS (44px no celular, centro a 100% no celular) em vez de inline que vence o CSS;
   - ajuste as 7 chamadas nas views para passar `mapa: moduloN.mapa`.
3. `criarSequencia`: corrigir o texto duplicado no desktop (o `display:block` inline anula o `sm:hidden`; esconda por CSS e mostre só ≤640px); `tabindex="0"` no `<ol>` que rola; ignorar `tom`.
4. `criarCiclo`:
   - arcos que TOCAM as caixas (a folga calculada pelo tamanho real das caixas; no Início e na Revisão as setas estão soltas e curtas — compare com `30 Inicio` e `33 Revisao`);
   - sem caixas sobrepostas;
   - texto do centro por tela, com `cor` opcional (Início: sem texto; M2: "e o laço aperta"; M3: "e o tema seguinte começa"; Revisão: "errou: volta ao degrau 1" em #F87171 11px — confira nos desenhos);
   - sem a legenda `<ol>` de baixo (a alternativa é o `aria-label`);
   - não transbordar no celular.
   Ajuste o `centro` nas chamadas de `inicio.js`, `modulo2.js`, `modulo3.js`, `revisao.js`. Defeito real: em `src/views/modulo3.js` (~195) a legenda do ciclo sai cortada no meio da palavra ("(po", "vário"); conserte essa chamada.
5. `criarGradeDe100`: aceitar `cor` com as 5 cores do desenho (vermelho = ruim, verde, âmbar, roxo = o que o modelo pega, #1F2733 = resto); sem o micro-rótulo `titulo`. Defeitos reais nas chamadas:
   - M6 `src/views/modulo6.js` (~169-186): os 95 "rug mesmo" em vermelho (#EF4444), os que passam despercebidos em #1F2733, com a frase do desenho;
   - M7 `src/views/modulo7.js` (~159-160): grade da ruína com 100 vermelhos, sem o 1 verde (o exato é 99,5%).
6. `criarBarrasNaMesmaEscala`: legenda do sólido só quando houver parte sólida, com o rótulo vindo de quem chama (nunca "valor medido"); sem título, "Relação" nem nota extra.
7. Novo `criarCurvaDeslizante({ controle:{rotulo,min,max,passo,valor,formatar}, curva, marcador, numeros:(v)=>[…], atalhos:[{rotulo,valor}], alternativas })` no desenho do `00 Componentes` (~452-498) e do M6 (~124-150):
   - curva x·y = k (tokens × SOL), SVG 320×230, max-width 360; ponto "antes da venda"; marcador roxo com borda branca e guias ciano; lado a lado com o controle em grade `auto-fit minmax(260px,1fr)`;
   - `<label for>` "Quero que o preço caia" + `<output>`; range com `aria-valuetext`;
   - atalhos "Cair 10%", "Cair 30%", "Cair pela metade", "Pool 10× maior" (40px, texto claro 600);
   - cartões "Você recebe"/"Você vende" (mono 1,5rem/700, tabular), faixa "Liquidez anunciada de US$ 8 mil (exemplo inventado) ≈ US$ 206" e `aria-live`;
   - `criarCurvaDeSaida` passa a usar esse componente (o M6 chama `criarCurvaDeSaida`), com as mesmas contas de hoje (s = 1/√(1−q) − 1; recebe = s/(1+s)·½) e os números lidos de `src/data/modulo6.js` em vez de escritos à mão;
   - no celular, os textos do SVG não podem ficar ilegíveis.

## Verificação
Em `#/modulo-6` (mapa, barras, curva, grades), `#/modulo-7` (grade da ruína), `#/modulo-2` e `#/modulo-3` (ciclos), `#/inicio` e `#/revisao` (ciclos), 1280px e 390px, contra os desenhos. Teste as teclas do mapa (abrir aba) e da sequência (← → Home End).
