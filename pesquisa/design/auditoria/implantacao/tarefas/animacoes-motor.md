# Tarefa: motor das animações no contrato da Fase 4 + separar os 6 palcos em arquivos

SEUS ARQUIVOS: `src/components/animacoes.js`, a pasta NOVA `src/components/animacoes/`
(um arquivo por animação), e o bloco `.omh-anim*` de `styles/custom.css` (só esse bloco).
Relatório: `pesquisa/design/auditoria/animacoes.md` — seções "Motor comum", "A mais no app",
"Celular" e "Trabalho para implantar". Desenhos: os 6 `Animacao N - *.dc.html` (o motor é
igual nos 6: moldura, controles, barra de cenas, teclado, "Reduzir movimento", "Ler como
texto", bloco `modoParado`) e a seção "Animações (Fase 4)" do README do handoff.

1. **Separar os palcos** para que 6 agentes possam trabalhar em paralelo depois: mova cada
   animação para o próprio arquivo — `src/components/animacoes/pool.js`, `drainer.js`,
   `sanduiche.js`, `caminho-do-token.js`, `narrativa.js`, `envenenamento.js` — e deixe em
   `src/components/animacoes.js` só o motor (`criarAnimacao`) e os utilitários comuns
   (exportados para os palcos), reexportando as 6 funções com os MESMOS nomes de hoje
   (`criarAnimacaoPool`, `criarAnimacaoDrainer`, `criarAnimacaoSanduiche`,
   `criarAnimacaoCaminhoDoToken`, `criarAnimacaoNarrativa`, `criarAnimacaoEnvenenamento`),
   porque as views importam de `../components/animacoes.js`. Cuidado com import circular
   (os palcos importam o motor; o motor não importa os palcos — faça a reexportação sem
   ciclo, ex.: os palcos importam utilitários de um arquivo `animacoes/motor.js` e o
   `animacoes.js` reexporta tudo).
2. **Motor no contrato da Fase 4** (a lista completa está em "Trabalho › motor" do
   relatório): section #141A24 raio 12 padding 20 gap 14; no topo "cena N de T" à esquerda
   e a caixa "Reduzir movimento: cenas paradas, lado a lado" à direita; palco
   `div tabindex=0 role=group` com o aria-label das teclas ("Palco da animação. Espaço toca
   ou pausa; setas trocam a cena.") envolvendo o `role=img` com o alt; fundo #0B0F17
   padding 20; legenda 1,0625rem em `aria-live="polite"`; botões "← Voltar cena" /
   "Tocar"/"Pausar"/"Tocar de novo" (min-width 110) / "Avançar cena →" com 44px e fundo
   #0B0F17; segmentos da barra com min-height 44, traço 6px e número mono 11px, cada um
   `<button aria-label="Cena N: legenda">`; teclado espaço, ← →, Home, End.
3. **Reduzir movimento**: marcar a caixa (ou `prefers-reduced-motion: reduce`) SUBSTITUI
   palco, legenda, controles e barra pela grade `auto-fill minmax(230px,1fr)` de
   miniaturas simples — cada animação passa `criarMiniatura(cena, i)` (novo parâmetro do
   motor; o bloco `modoParado` de cada `.dc.html` mostra a marcação). Até os palcos
   ganharem a miniatura deles, o motor usa uma miniatura padrão SIMPLES (número da cena +
   legenda), nunca uma cópia do palco inteiro (hoje o Drainer vira 12.433px). Sem "Próxima
   cena".
4. "Ler como texto": `<details>` com `ol` decimal, "legenda — alt" em #9AA7B4.
5. Título de cada figura e a sobrancelha "Animação N · Módulo M · X s" como no desenho
   (sem o micro-rótulo inventado "ANIMAÇÃO · N CENAS · ~S S").
6. CSS: `.omh-anim-transicao` inclui `color` e `margin-left`; transições 400–500ms `ease`
   só em height, width, opacity, transform, background e border-color; nada com
   `prefers-reduced-motion`.
7. Nenhuma medida de `window.innerWidth` (layout responsivo é CSS). Nenhuma cor fora da
   paleta; texto vermelho sempre #F87171.

NÃO refaça os palcos (outra etapa, um agente por palco, logo depois de você). Só mova
cada um para o seu arquivo, sem mudar o que ele desenha, e garanta que as 6 continuam
funcionando no novo motor (M6 Os números; M1 Golpes; M5 Taxas e Configurações; M3
Narrativas). Verifique com capturas contra os desenhos (motor: controles, barra, modo
parado, ler como texto) e com `fumaca.mjs` em 1280 e 390.

Resposta final: arquivos, a API do motor (assinatura de `criarAnimacao`, o que cada palco
deve passar, incluindo `criarMiniatura`), os utilitários exportados e como um palco novo
deve ser escrito.
