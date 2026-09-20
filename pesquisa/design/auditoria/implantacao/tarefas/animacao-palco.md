# Tarefa: refazer UM palco de animação na composição do desenho

Você recebe no pedido: o nome da animação, o arquivo dela em `src/components/animacoes/`,
o desenho `pesquisa/design/handoff/designs/Animacao N - <nome>.dc.html` e a seção do
relatório `pesquisa/design/auditoria/animacoes.md` ("Animação N — …" e a linha dela em
"Trabalho para implantar").

SEU ARQUIVO: só o arquivo desta animação em `src/components/animacoes/`. O motor
(`src/components/animacoes.js` / `animacoes/motor.js`) já está no contrato da Fase 4 — use
a API dele (leia o arquivo) e não o edite; se precisar de algo do motor, descreva no
relatório ("pedido de mudança").

1. Refaça o palco **cena a cena** na composição própria do desenho (não uma grade de
   cartões iguais): mesmos elementos, posições, cores, rótulos, números e legendas (≤ 12
   palavras), mesma quantidade de cenas. Leia o `renderVals()` e a marcação do desenho
   inteiros; as cenas estão lá.
2. Números só com fonte em `src/data/*.js` (o desenho diz de onde vem cada um). Exemplo
   hipotético marcado "exemplo inventado". Onde o desenho erra ou não tem fonte (o
   relatório aponta: ex. "R$512 no PumpSwap ≈ 2,4%", cujo 2,40% é da bonding curve em
   `modulo5.js`), siga `src/data` ou marque "não verificado".
3. `criarMiniatura(cena, i)`: a miniatura simples da cena para o modo "Reduzir movimento",
   como no bloco `modoParado` do desenho.
4. Transições 400–500ms `ease` só em height/width/opacity/transform/background/
   border-color; marcadores SVG movidos por `transform: translate()` (ou atributo com
   transição) — sem pulo.
5. Responsivo por CSS (`auto-fit/minmax`), nunca `window.innerWidth`. Funciona a 390px sem
   rolagem lateral da página (diagrama largo rola dentro da própria caixa com
   `tabindex="0"`). Textos do SVG legíveis no celular.
6. Paleta fechada; texto vermelho sempre #F87171; sem emoji; contraste AA.

Verificação: avance cena a cena no desenho e no app (clique no segmento N da barra) e
capture só o palco (role até ele; esconda o resto se ajudar), em 1280 e 390; compare
lado a lado até ficar igual. Teste teclado e o modo "Reduzir movimento". Rode
`fumaca.mjs` em 1280 e 390.

Resposta final: o que ficou igual, cena por cena; o que ficou diferente e por quê;
números marcados "não verificado"; capturas-chave.
