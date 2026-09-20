# Tarefa: simulador de decisão no desenho da tela 34

SEUS ARQUIVOS (só estes): `src/components/simulator.js`, `src/data/cenarios.js`, e os campos do bloco `simulador` em `src/data/modulo4.js` (só esse bloco).
Relatório: `pesquisa/design/auditoria/quiz-simulador.md` (Simulador e "Trabalho › simulator.js"). Desenho: `34 Quiz e Simulador.dc.html` (antes de escolher, decisão sólida, decisão cara, resultado final). No app: `#/modulo-4`, aba Simulador.

1. Cartão da seção com h2 "Simulador de decisão" (`modulo4.simulador.titulo`) + micro-rótulo "Módulo 4 · {N} cenários". Aviso "Cenários fictícios" com o texto do desenho (raio 8, padding 12×16, texto na cor principal), em `modulo4.simulador.aviso`; sem a frase fixa no componente. Parágrafo "Não existe pontuação de acerto de preço: …" como campo novo em `src/data/modulo4.js`.
2. Cenário numa caixa interna (#0B0F17, raio 8, padding 20, gap 14):
   - micro-rótulo "Cenário i de N · sem posição" / "· com posição" + pílula "Risco alto" (sem "na situação"); sem chip de posição nem h4 "O que você faz?";
   - título 17px; tags com fundo #141A24; situação 14px; caixa "O que você vê" (#141A24);
   - 4 opções fixas `role="radio"` num `radiogroup`, 44px, fundo #141A24, rótulo 15px/600, descrição 13px, 2 colunas (1 no celular por CSS).
3. Dica: "Escolha uma das quatro para ver o feedback." + a segunda frase do desenho só quando `posicao === 'nenhuma'`.
4. Depois de escolher:
   - opção escolhida com o trio da qualidade (sólida verde, defensável CIANO, cara vermelha, não se aplica ÂMBAR) + pílula de qualidade; demais a .7;
   - feedback em 4 blocos: (1) pílulas de qualidade e "Risco desta decisão: X" + texto 14px #E6EDF3; (2) próximo passo com borda sólida #22D3EE, texto claro, chips de ferramenta em JetBrains Mono; (3) caixa "Lição" roxa; (4) "Próximo cenário" (primário) + "A ordem é sorteada: o próximo vem de outro tema.";
   - manter "Trocar minha resposta", "Cenário anterior" e "Ver resumo" como fantasma/secundário depois do primário.
5. Resultado final:
   - caixa roxa com o título da faixa + "X de Y pontos · Z%" CALCULADO (o desenho erra: 17/24 · 71%; a distribuição dele dá 16/24 · 67%);
   - 4 barras na mesma escala (de N), com `aria-label`;
   - lista das 4 faixas com o limiar (gerado de `minimo`) e a atual em destaque;
   - lista dos N cenários em ordem de `numero`, com pílula de qualidade;
   - frase final do desenho;
   - sem os 4 cartões de número e sem "Leitura do seu padrão" (inventado, com o erro "Em 1 cenários"); manter "Refazer o simulador".
6. Formato salvo em `estado.simulador` inalterado (não mude `store.js`). Uma tabela única de trios por qualidade.

## Verificação
Em `#/modulo-4`, aba Simulador, nos 4 estados (prepare pelo `js` com o formato real do store, depois `localStorage.removeItem('omh_state_v1')`), 1280px e 390px, contra o desenho 34.
