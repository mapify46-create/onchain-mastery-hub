# Tarefa: LinhaDoTempo e ComparacaoLadoALado no desenho

SEUS ARQUIVOS (só estes): `src/components/linhaDoTempo.js`, `src/components/comparisonTable.js`.
Relatório: `pesquisa/design/auditoria/componentes.md` (seções 8 e 9). Desenho: `00 Componentes.dc.html` (LinhaDoTempo ~539-556 e funções `parse/meses/intervalo` no `renderVals` ~752-766; ComparacaoLadoALado) e os usos nos M1 (Brasil; CEX × DEX; carteiras), M2 (TRUMP/MELANIA/LIBRA), M3 (rotação, launchpads), M5, M6 (SPL × Token-2022), M7 ("o que dizem × evidência"). Veja `m1.md`, `m2.md`, `m3.md`.

1. **LinhaDoTempo** (`{ marcos:[{data,titulo,texto?,tom?,href?}], proporcional?:true }`):
   - espaço proporcional (24px + 1,2px/mês, teto 96px) e pílula do intervalo no trilho;
   - `<time>` em JetBrains Mono 12/600, maiúsculo, .05em, ciano;
   - legenda dos tons; `href` por marco; max-width 620px;
   - vira a caixa interna #0B0F17 (raio 8, padding 20) de um card de seção, sem card próprio nem `<h3>`; modo compatível para as views atuais.
   - **REGRA DE DADOS:** o desenho erra datas (troca "início de agosto de 2025" por "01/08/2025", tira "~" e intervalos, inventa mês). O componente aceita a data como está no dado, com precisão de dia, mês ou ano ("2023", "ago/2025", "~10/2024", "10–11/10/2024"). Sem precisão, o intervalo sai aproximado ou não sai — nunca inventa dia ou mês; considera o dia quando existe ("21 dias", não "1 mês").
2. **ComparacaoLadoALado:** `montarComparacaoLadoALado({ criterios:[{chave,rotulo,decisivo?}], opcoes:[{titulo,subtitulo?,valores:{[chave]: string|{texto,tom}}}], frase? })`:
   - `<table>` de verdade, min-width 560px, numa área que rola (`tabindex="0"`, `role="group"`);
   - critérios nas linhas; linha decisiva com borda-esquerda 2px #22D3EE, fundo ciano 6% e "critério decisivo";
   - células com tom (ok / atenção / alerta / neutro) em pílula de raio 6; frase final 13px;
   - no celular (CSS), um card por opção, com o decisivo primeiro;
   - adaptador para o formato atual `{ colunas, linhas }`; o export antigo continua funcionando.

## Verificação
Em `#/modulo-1` (Brasil: linha do tempo; Carteiras: comparação), `#/modulo-2`, `#/modulo-3`, 1280px e 390px; monte a comparação nova por `js` no shot.mjs (import dinâmico) com um exemplo do desenho. Não crie arquivo de teste dentro do projeto.
