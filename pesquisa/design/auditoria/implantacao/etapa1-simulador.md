# simulador

## Relatório inicial
O simulador está implantado conforme o desenho 34, nos 4 estados, em 1280px e em 390px. O teste de fumaça (`fumaca.mjs`) passou nas duas larguras: nenhuma exceção, nenhum erro de console e nada rola para o lado. Nada foi publicado nem commitado, e o `omh_state_v1` ficou `null` ao fim de cada teste.

O agente anterior já tinha reescrito quase tudo. Conferi item por item contra o código e contra as capturas, e completei duas coisas:
- **Teclado nas opções:** agora só uma das 4 fica na ordem do Tab (a escolhida, ou a primeira antes de escolher). As setas, Home e End andam entre elas sem escolher; Enter ou Espaço escolhem.
- **Frase "A ordem é sorteada…":** só aparece quando a ordem é mesmo sorteada. Com `embaralhar: false` ela seria falsa.

## Arquivos alterados
- `src/components/simulator.js`, reescrito.
- `src/data/modulo4.js`, só o bloco `simulador`:
  - `aviso` agora tem o texto do desenho. O "Cenários fictícios:" em negrito é o componente que põe.
  - `abertura` é campo novo, com o parágrafo "Não existe pontuação de acerto de preço: …".
  - `dicaSemPosicao` é campo novo. Conferi nos dados que, nos 9 cenários sem posição, "Realizar parcial" é sempre a que não se aplica.
  - `titulo` e `introducao` continuam iguais.
- `src/data/cenarios.js` não mudou. Os limiares das faixas são gerados de `minimo`, como o desenho faz.

## API (para a etapa 2)
```js
montarSimulador({
  cenarios,                                   // obrigatório
  aviso = modulo4.simulador.aviso,
  titulo = modulo4.simulador.titulo,          // h2 do cartão
  abertura = modulo4.simulador.abertura,      // parágrafo abaixo do aviso
  dicaSemPosicao = modulo4.simulador.dicaSemPosicao,
  embaralhar = true,
}) → <section aria-label="Simulador de decisão">
```
- A chamada atual da view continua valendo: `montarSimulador({ cenarios, aviso: simulador.aviso })`.
- O mais simples na etapa 2 é `montarSimulador({ cenarios })`.
- O componente já é o cartão inteiro (raio 12, padding 20). A view não precisa envolvê-lo em outro card.
- O formato salvo em `estado.simulador` (`{ escolhas, concluido }`) não mudou.

## Igual ao desenho
- **Topo do cartão:** h2 "Simulador de decisão" com "Módulo 4 · 12 cenários" à direita (o número vem de `cenarios.length`). Aviso âmbar com raio 8, padding 12×16 e texto na cor principal, seguido do parágrafo de abertura.
- **Caixa do cenário:** fundo #0B0F17, raio 8, padding 20, gap 14. Tem:
  - o rótulo "Cenário i de N · sem posição / com posição" e a pílula "Risco alto";
  - título de 17px, tags com fundo #141A24, situação em 14px e a caixa "O que você vê";
  - as 4 opções num `radiogroup`, com 44px, rótulo 15/600 e descrição 13px, em 2 colunas (1 no celular, por CSS).
- **Dica antes de escolher:** a segunda frase só aparece quando você não tem posição. Conferi no cenário 3, que é com posição.
- **Depois de escolher:** a opção escolhida ganha a cor da qualidade e a pílula; as outras ficam a .7. Há uma tabela única de cores por qualidade: sólida verde, defensável ciano, cara vermelha, não se aplica âmbar.
- **Feedback em 4 blocos:**
  1. pílula da qualidade + "Risco desta decisão: X" + texto em 14px;
  2. próximo passo técnico com borda ciano sólida e as ferramentas em JetBrains Mono;
  3. caixa roxa "Lição";
  4. "Próximo cenário" como botão primário + "A ordem é sorteada: o próximo vem de outro tema.".
- **Depois do botão primário:** "Ver resumo" e "Cenário anterior" (secundários) e "Trocar minha resposta" (fantasma).
- **Resultado final:** caixa roxa com a faixa e "X de Y pontos · Z%" calculado. Com a distribuição do desenho dá 16 de 24 · 67%. Depois vêm:
  - as 4 barras na mesma escala, com `aria-label`;
  - as 4 faixas com o limiar, e a atual em roxo;
  - os 12 cenários na ordem de `numero`, cada um com a pílula da qualidade;
  - a frase final e "Refazer o simulador".
- **Testado nos fluxos:** travar a opção depois de escolher, trocar a resposta, avançar, "Ver resumo" no último cenário e "Refazer" (que zera as escolhas). O foco vai para o feedback, para o cenário novo ou para o resumo; o anel ciano aparece nas opções.

## O que não ficou igual (e por quê)
- **"(0 pontos)" no lugar de "(0 ponto)":** a auditoria marcou o do desenho como erro de concordância.
- **Tirei "de exemplo"** de dois textos do resumo ("…a deste resultado de exemplo" e "…a decisão de exemplo em cada um"). No app o resultado é o do aluno, não um exemplo.
- **O feedback recebe o foco, em vez de usar `aria-live`.** O bloco é criado de novo a cada escolha, e um `aria-live` criado junto com o conteúdo não é anunciado com segurança.
- **O rótulo trocado das opções continua** em 4 cenários ("Entrar / aumentar", "Entrar / assinar"). É dado de `cenarios.js`, e a auditoria diz que não é defeito.
- **Numa opção focada, os cantos ficam com raio 4px.** Isso vem da regra global de foco do projeto em `styles/custom.css`, que não é arquivo meu.

## Capturas-chave
- Decisão sólida, 1280px: `C:/Users/dreis/AppData/Local/Temp/claude/C--Users-dreis-Documents-onchain-mastery-hub/c6d85c7e-adeb-4e71-a56b-8b4f28704e46/scratchpad/shots/simR-app-boa-01.png` (desenho: `sim34-des-boa-02.png`, na mesma pasta)
- Resultado final, 1280px: `…/scratchpad/shots/simR-app-resumo-01.png` (desenho: `sim34-des-resumo-02.png`)
- Na mesma pasta:
  - os outros estados em 1280px: `simR-app-antes-01.png`, `simR-app-ruim-01.png`, `simR-app-resumo-02.png`;
  - o celular (390px): `simR-cel-{antes,boa,resumo}-NN.png`;
  - o foco pelo teclado: `simR-foco-opcoes.png`.

## Correção 1
Corrigi os 8 defeitos da minha área e não mexi no 9º, que fica para a etapa 2 como o próprio revisor pediu. A fumaça (`fumaca.mjs`) passou em 1280px e 390px sem exceção, sem erro de console e sem rolagem lateral.

**Arquivos alterados:** `C:/Users/dreis/Documents/onchain-mastery-hub/src/components/simulator.js` e o bloco `simulador` de `C:/Users/dreis/Documents/onchain-mastery-hub/src/data/modulo4.js`. `cenarios.js` ficou como estava.

## Defeito por defeito
1. **"Sorteada a cada rodada" × Refazer (média): corrigido.** `cenarios` virou `let` e `recomecar()` sorteia de novo quando `embaralhar` é true. Medido: 5 rodadas seguidas de "Refazer o simulador" deram 5 ordens diferentes (antes, as 5 saíam iguais).
2. **aria-live (baixa): corrigido.**
   - O cartão agora tem duas partes: `corpo`, que o `renderizar()` redesenha, e uma região `<p role="status" aria-live="polite" class="sr-only">` fixa, fora do que é redesenhado.
   - Depois de cada escolha, essa região recebe a qualidade, "Risco desta decisão: X" e o texto do feedback. Ela é limpa ao trocar a resposta, trocar de cenário ou refazer, para a mesma frase ser anunciada de novo.
   - O foco agora fica na opção escolhida, como no desenho. Antes ia para o div do feedback, que perdeu o `tabindex`; manter as duas coisas faria o leitor de tela ler tudo duas vezes.
   - Medido: a região é o mesmo nó antes e depois da escolha.
3. **Cursor (baixa): corrigido.** `cursor-pointer` nas opções antes de escolher (medido: pointer ×4) e `default` depois. `criarBotao` em `ui.js` não é meu arquivo e ficou igual.
4. **Opacidade .7 × regra de contraste (baixa): corrigido do jeito que o revisor sugeriu.**
   - O `.7` ficou só no rótulo da opção. A descrição em #9AA7B4 fica sem opacidade (medido: botão 1, rótulo 0.7, descrição 1), com contraste de cerca de 7,1:1 sobre #141A24; antes eram 4,09:1.
   - Motivo: a seção Acessibilidade do README do handoff diz "requisito, não opcional" e proíbe opacity em container com texto #9AA7B4.
   - Fica mais claro que o desenho, que apaga o botão inteiro. **O dono decide:** para voltar ao desenho basta pôr `opacity-70` de novo no botão (`simulator.js:348-349`).
5. **Rótulo do radiogroup (baixa): corrigido.** Agora é `aria-label="Opções"`, como no desenho (:138).
6. **"Sem posição" (baixa): corrigido.** `semPosicao = cenario.posicao === 'nenhuma'`, e o micro-rótulo sai de `{ nenhuma: 'sem posição', aberta: 'com posição' }`. Sem o campo `posicao`, o rótulo fica sem complemento. Conferido: "Cenário 1 de 12 · sem posição" com a 2ª frase da dica, e "Cenário 3 de 12 · com posição" sem ela.
7. **Textos do desenho fixos no componente (baixa): corrigido.** Passaram para `modulo4.simulador` com os nomes `ordemSorteada`, `legendaBarras`, `legendaFaixas` e `fraseFinal`.
   - `legendaBarras` é uma função `(total) => texto`, porque leva o total no meio da frase. O padrão já existe no arquivo (`formatar`). O componente também aceita texto pronto.
   - Em `legendaFaixas` tirei o "de exemplo" do desenho, porque aqui o resultado é o do próprio usuário.
8. **"Sem resposta" (baixa): corrigido.** Linha sem qualidade fica sem pílula. Medido: 12 pílulas no resumo e nenhum "Sem resposta".
9. **Composição da aba no M4 (`views/modulo4.js`): não mudei.** O arquivo não é meu, e o revisor pede "Não mexer agora" (etapa 2, depende da decisão 3 do `quiz-simulador.md`).

## API final: `montarSimulador(opcoes) → <section>`
```js
import { montarSimulador } from '../components/simulator.js';
import { cenarios } from '../data/cenarios.js';
import { modulo4 } from '../data/modulo4.js';

montarSimulador({ cenarios });                                    // chamada mínima
montarSimulador({ cenarios, aviso: modulo4.simulador.aviso });    // chamada atual da view (continua valendo)
```
Todas as opções, com o padrão vindo de `modulo4.simulador`:

| Opção | O que é |
|---|---|
| `cenarios` | lista de cenários (padrão `[]`) |
| `aviso` | texto do aviso "Cenários fictícios" |
| `titulo` | h2 do cartão |
| `abertura` | parágrafo abaixo do aviso |
| `dicaSemPosicao` | 2ª frase da dica, só com `posicao: 'nenhuma'` |
| `ordemSorteada` | frase ao lado de "Próximo cenário" |
| `legendaBarras` | função `(total) => texto`, ou texto pronto |
| `legendaFaixas` | legenda da lista das 4 faixas |
| `fraseFinal` | última frase do resultado |
| `embaralhar` | `true` sorteia ao montar e a cada Refazer; `false` mantém a ordem de `cenarios.js` |

O formato de `estado.simulador` (`{ escolhas, concluido }`) não mudou.

## Verificação
- **4 estados (antes de escolher, sólida, cara, resumo) em 1280 e 390:** batem com o desenho 34. O resumo calcula "16 de 24 pontos · 67%" com a distribuição do desenho.
- **Teclado real:** setas, Home e End andam entre as opções, Espaço escolhe e o anel ciano aparece na opção escolhida. Os outros dados medidos estão em `sim3-verif.js`, na pasta de rascunho.
- **Capturas-chave**, em `C:/Users/dreis/AppData/Local/Temp/claude/C--Users-dreis-Documents-onchain-mastery-hub/c6d85c7e-adeb-4e71-a56b-8b4f28704e46/scratchpad/shots/`:
  - `sim3-ruim-1280-01.png`: decisão cara, com as opções não escolhidas apagadas só no rótulo.
  - `sim3-resumo-1280-01.png`: resultado final.
  - `sim3-boa-390-01.png`: decisão sólida no celular.
  - `sim3-teclado-feedback-foco.png`: foco na opção escolhida depois do Espaço.

## Defeitos rodada 2
[
 {
  "item": "Cursor dos botões do simulador (item 4, bloco 4, e item 5, 'Refazer o simulador'). Continua pendente da revisão anterior, na parte do ui.js.",
  "onde": "src/ui.js:294-322 (CLASSES_BOTAO e criarBotao, fora desta área). Chamadas em src/components/simulator.js:460-461, 472-478 e 688.",
  "desenho": "O Botao do design system usa cursor pointer. Medido no desenho 34: 'Próximo cenário' com getComputedStyle.cursor = 'pointer'.",
  "app": "Medido por getComputedStyle: cursor 'default' em 'Próximo cenário', 'Trocar minha resposta' e 'Refazer o simulador', em 1280 e em 390. O Tailwind v4 do CDN dá cursor default aos <button>, e criarBotao não põe cursor-pointer. As 4 opções já estão certas (pointer antes de escolher, default depois).",
  "gravidade": "baixa",
  "correcao": "Quem cuida do src/ui.js acrescenta `cursor-pointer` nas três variantes de CLASSES_BOTAO e mantém o `disabled:cursor-not-allowed`. Assim todos os botões do app ficam iguais. Paliativo só neste arquivo: passar `class: 'cursor-pointer'` nas chamadas de criarBotao do simulator.js."
 },
 {
  "item": "Nome acessível do cartão da seção (item 1)",
  "onde": "src/components/simulator.js:185",
  "desenho": "`<section aria-label=\"Simulador\">` (34 Quiz e Simulador.dc.html:108).",
  "app": "aria-label=\"Simulador de decisão\" (vem de `titulo`). Não é rótulo inventado: é o h2 do desenho e está em src/data. Só não é o valor que o desenho põe no atributo. Pelo mesmo critério aplicado ao radiogroup na rodada anterior, fica registrado.",
  "gravidade": "baixa",
  "correcao": "Usar `'aria-label': 'Simulador'`, como no desenho. Se o dono preferir o nome do h2, deixar como está e registrar a escolha. Atenção: os scripts de verificação no rascunho procuram `section[aria-label=\"Simulador de decisão\"]` e teriam de ser ajustados. Nenhum arquivo do projeto depende desse seletor."
 }
]

## Correção 2
(nenhuma)
