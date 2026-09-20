# Tarefa: fluxogramas no desenho

SEUS ARQUIVOS (só estes): `src/components/fluxograma.js`, `src/components/diagrama.js`, as regras `.omh-fluxo*` de `styles/custom.css` (só esse bloco), e os TEXTOS dos diagramas (`codigoMermaid` e afins) em `src/data/*.js` — só essas strings.
Relatórios: `pesquisa/design/auditoria/componentes.md` (seção 2), `checklist-glossario.md` (fluxograma do Checklist e "Fluxo de checagem linear"), `m6.md` (fluxograma do contrato), `m1.md` e `m5.md` (texto sem acento, Sim/Não invertidos, nó final duplicado). Desenhos: `00 Componentes.dc.html` (Fluxograma desktop/celular), `31 Checklist.dc.html` (script `passosBase`), `M6 Desktop.dc.html` (checagem do contrato ~449-464, `passosChecagem`) e os fluxogramas dos M1–M5.

1. `criarFluxograma` aceita também `{ nos:[{id,tipo:'pergunta'|'acao'|'bom'|'ruim'|'alerta',texto}], setas:[{de,para,rotulo?}] }` direto, além do Mermaid atual.
2. Moldura do desenho: só a caixa #0B0F17 (raio 8, padding 20), legenda DENTRO dela 13px centralizada; tirar o card de fora (`diagrama.js` ~126) mantendo as views atuais funcionando; `role="img"` + `aria-label` gerado; `overflow-x:auto` + `tabindex="0"` quando largo.
3. Cor dos rótulos Sim/Não pelo SENTIDO do ramo (destino ruim → vermelho, bom → verde, alerta → âmbar, demais neutro), nunca pelo texto do rótulo.
4. Nó de referência "↩" vira "⇢" com `aria-hidden="true"` (ou junção como no desenho). No celular, ramo empilhado com borda-esquerda 2px na cor do rótulo e padding-left 12px, pílula no topo; tirar o `align-items: stretch !important` que estica as pílulas (custom.css, `.omh-fluxo-ramo`).
5. Textos na tela em português correto: acentos, vírgula decimal ("0,95%"), "?" nas perguntas, sem nó final duplicado (M1 plano de emergência). Corrija nas strings de `src/data/*.js` (M1 ~1491-1591, M5 ~1322-1375, `checklist.js` e onde mais houver). Se o parser não aceitar acento/vírgula, conserte o parser.
6. `criarFluxoLinear` (Checklist e checagem do contrato do M6):
   - início → perguntas numeradas (marcador ciano 24px) com etiqueta de evidência opcional;
   - abaixo de cada pergunta, 2 colunas "desvio | segue" (rótulos coloridos; desvio no trio vermelho "Não compro…" ou âmbar; segue neutro), que viram 1 coluna no celular por CSS;
   - caixa final (borda verde 2px) → legenda → caixa ciano de fechamento ("Passar por tudo não aprova o token…").
   - Dados: `{ inicio, passos:[{ pergunta, evidencia?, desvio:{rotulo,texto,tom:'nao'|'ajusta'|'alerta'}, segue:{rotulo,texto} }], fim, legenda, fechamento }`. Medidas e cores dos desenhos 31 e M6.
   - Não mude a view do Checklist nem a do M6 (etapa 2). Teste por `js` no shot.mjs (import dinâmico) e não deixe arquivo de teste no projeto.
7. Não remova o Mermaid por CDN (`diagrama.js`): tirar é mudança de stack não autorizada. Só garanta que os 12 diagramas saem pelo desenho próprio.

## Verificação
Em `#/modulo-1` (Carteiras, Defesa, Brasil), `#/modulo-5`, `#/modulo-2`, `#/modulo-3`, `#/modulo-4` e `#/checklist` (aba Fluxograma), 1280px e 390px.
