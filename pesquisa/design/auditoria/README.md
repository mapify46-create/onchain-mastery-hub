# Auditoria: desenho do Claude Design × app implantado

> 18/09/2026. O dono disse que a implantação do redesenho "ficou completamente diferente e
> parece que inventou coisa". Esta pasta mede, tela por tela, o que difere e o que fazer.

## Como foi feito
- O zip do dono (`Fase 1_ 00 Componentes-handoff.zip`) tem os **mesmos** desenhos que já
  estavam em `pesquisa/design/handoff/designs/` (idênticos byte a byte). Faltavam no
  projeto só a pasta do design system (`designs/_ds/`, com os componentes Quiz, Destaques,
  Botao e Checklist) e `PaginaDeModulo.dc.html` — copiados em 18/09. Sem o `_ds`, os
  desenhos não abriam por inteiro.
- 12 revisões em paralelo, uma por área, cada uma capturando desenho e app aba por aba
  (Chrome headless, página inteira) e lendo o código. Os relatórios estão nesta pasta.

## Diagnóstico em uma frase
**O conteúdo está certo; a forma não é a do desenho.** Textos, números e destaques vêm de
`src/data/*.js` e batem com o desenho. O que a implantação fez foi manter as telas antigas
e pendurar visuais em volta delas, com títulos e rótulos que o desenho não tem.

## Os padrões que se repetem em todas as telas
1. **Seção:** no desenho, cada seção é um card só: título → ideia central (borda ciano) →
   **o visual dentro do card** → 1 a 3 frases → "Para ir mais fundo" → **"Pergunta rápida"**
   (o Quiz do design system, com confiança). No app, a seção é texto (`secao.js`) e o
   visual vem num card separado depois dela.
2. **Rótulos inventados:** `moldura()` (`visuais.js:53-67`) põe em todo visual um título e
   "RELAÇÃO: …". São 23 títulos sem origem no desenho nem em `src/data`. Nos 7 módulos do
   desenho esse rótulo nunca aparece (ele só existe na vitrine `00 Componentes`).
3. **Visuais que faltam:** M1 ~20 de 24 · M2 9 de 12 · M3 17 de 17 diferentes ou ausentes ·
   M4 10 de 13 · M5 ~15 de 20 · M6 14 de 18 · M7 11 de 14. As telas 34 (Quiz e Simulador) e
   o Checklist em página única não foram implantados.
4. **Blocos que o desenho não tem:** "Antes de ler", "Parte X de N" com "Continuar",
   "Confira antes de seguir", "Lembrete" e introduções de aba, gráficos Chart.js, grade
   "Conteúdo do hub", anatomias extras. "O que você leva deste módulo" existe no desenho,
   mas no fim da aba Quiz, não no topo.
5. **Moldura:** sidebar com outros rótulos e ordem; cabeçalho sem o micro-rótulo "MÓDULO N";
   rodapé sem o card âmbar e **sem "não é recomendação de investimento"**; coluna de 934px
   (desenho: 868px); abas e botões de 38px (mínimo do desenho: 44px).
6. **Componentes fora do desenho:** curva deslizante (outra curva, outros atalhos),
   linha do tempo (sem proporção), comparação lado a lado (cards em vez de tabela), ciclo
   (setas soltas, curtas), sequência (texto duplicado no desktop), fluxograma (árvore do
   Mermaid, quebra o texto; o desenho usa fluxo linear), motor das animações (contrato da
   Fase 1, não o da Fase 4) e os 6 palcos (grade de cartões em vez da composição própria).

## Erros reais achados (consertar primeiro, independe de gosto)
- **M4, calculadora de tamanho arredonda para inteiro:** risco 0,5% com invalidação 100%
  mostra "1% do capital" (o certo é 0,5 ÷ 100 = 0,5%). Com risco 10% e invalidação 5% diz
  "você perde 10,0%" quando a perda seria 5%. (`modulo4.js:45-47`)
- **M4, calculadora dos degraus:** 1º alvo acima do 2º troca o valor em silêncio.
- **M7, grade da ruína:** 99 vermelhos + 1 verde "chegam à meta", contra o exato de 99,5%
  (`modulo7.js:159-160`). Barras 30/400/1.600 com a legenda "valor medido" (são contas).
- **M6, grade do detector:** cores trocadas (`modulo6.js:169-186`).
- **M3, ciclo das 5 fases:** legenda cortada no meio da palavra (`modulo3.js:195`); emoji
  na tabela das ferramentas (`src/data/modulo3.js:850`).
- **Fluxogramas (M1, M5):** texto sem acento e com ponto decimal na tela ("Nao opero",
  "0.95 por cento"); Sim/Não com as cores invertidas (a cor sai do texto do rótulo,
  `fluxograma.js:37-43`); nó final duplicado no plano de emergência do M1.
- **Quiz:** a confiança não é obrigatória; pílulas de 26px.
- **Simulador:** "Em 1 cenários".
- **Animações:** o modo "reduzir movimento" (que o app liga sozinho se o Windows pedir)
  põe uma cópia do palco em cada miniatura — o Drainer vira 12.433px de altura.
- **Cor fora da paleta** `#6B7889` (contraste 4,27:1, abaixo de AA) em `animacoes.js:207`;
  texto vermelho em `#EF4444` onde a regra pede `#F87171`.

## Onde o desenho erra — seguir `src/data`, não o desenho
- M3: troca "início de agosto de 2025" por "01/08/2025" e tira o "~" das datas da rotação.
- M2: "cerca de 20 dias depois" na linha do tempo não tem origem (o arquivo só dá o mês).
- M1: marco "2023" sem mês gera "3 anos e 11 meses"; intervalos ignoram o dia.
- M5: "R$100 ou R$1.000" (o dado é R$50 ou R$5.000); rótulo "R$512 no PumpSwap ≈ 2,4%"
  sem origem (o 2,40% de `modulo5.js:1231` é da bonding curve).
- Tela 34: "17 de 24 pontos · 71%" — a própria distribuição do desenho dá 16 de 24 (67%).
- Protótipo: botão "Próxima" que não destrava, anel sem número no centro, ciclo que
  transborda a 390px, destaques em 3 colunas no celular. Não copiar.
- Glossário: a busca do app (ignora acento e procura no alerta) é melhor que a do
  desenho. Manter a do app.

## Decisões do dono (respondidas em 18/09/2026)
1. **Blocos de didática que só o app tem** ("Antes de ler", "Parte X de N" com Continuar,
   "Confira antes de seguir"): **manter os dois** — implantar a "Pergunta rápida" do
   desenho no fim de cada seção **e** manter esses blocos, no traço do desenho.
2. **Barra de progresso: pelo acerto** (decisão de 14/09 mantida). Ajustar só a legenda
   que o desenho escreve ("quiz respondido (50%)").
3. **Quiz final: corrigir por pergunta**, como a tela 34 (confiança obrigatória, "Ver
   resultado" por pergunta, placar no fim).
4. **Chart.js: tirar** do projeto e da regra da stack no `CLAUDE.md` quando o último uso
   sair (Início, M2, M5 passam para as barras do desenho).
5. Funções que o desenho não mostra (% por módulo na sidebar, "Instalar app", "Limpar
   progresso", "Começar a checagem de um token novo", vídeos): **manter**, no traço do
   desenho (padrão, sem pergunta).

## Plano (depois das decisões)
1. **Base, vale para todas as telas:** moldura (sidebar, cabeçalho, rodapé, largura, 44px),
   card de seção com o visual dentro e a "Pergunta rápida" (quiz com `salvar:false`, para
   não inflar "Quizzes X/7" em `inicio.js:108`), fim dos rótulos inventados, componentes
   (ciclo, sequência, curva, linha do tempo, tabela comparativa, fluxo linear) e os erros
   reais acima.
2. **Telas, uma por vez, conferidas com captura contra o desenho:** Início → Revisão →
   Checklist → Glossário → Quiz e Simulador → M1 a M7. Os textos novos que o desenho
   criou (folhas do mapa, rótulos curtos, "exemplo de forma" do M7 etc.) vão para
   `src/data/*.js`.
3. **Animações:** motor no contrato da Fase 4, os 6 palcos na composição do desenho e uma
   miniatura simples por cena para o modo parado.

## Relatórios
| Área | Arquivo |
|---|---|
| Componentes e moldura | `componentes.md` |
| Início e Revisão | `inicio-revisao.md` |
| Checklist e Glossário | `checklist-glossario.md` |
| Quiz e Simulador | `quiz-simulador.md` |
| Módulos 1 a 7 | `m1.md` … `m7.md` |
| As 6 animações | `animacoes.md` |

Cada relatório termina com "Trabalho para implantar", arquivo por arquivo, com tamanho
P / M / G. As capturas ficaram no scratchpad da sessão de 18/09 (não versionadas).
