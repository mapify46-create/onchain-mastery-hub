# FASES — onchain-mastery-hub (prompts para o Claude Code)

Guia operacional. Uma fase por mensagem. Testar, commitar, só então avançar.

## Antes de começar

1. No app do Claude, aba **Code**, clique em "Nenhuma pasta" e selecione
   `C:\Users\dreis\Documents\onchain-mastery-hub`. Aceite a permissão de leitura/escrita.
2. Confirme que o `PLANEJAMENTO.md` da pasta é o certo — peça ao Claude Code:
   *"me mostre as 5 primeiras linhas do PLANEJAMENTO.md"*.
   A primeira linha tem que ser `# PLANEJAMENTO.md — onchain-mastery-hub`.
3. Rode `/init`.

## Comandos que você vai usar

| Comando / atalho | O que faz |
|---|---|
| `/model` | Troca o modelo da sessão |
| `/effort` | Abre o slider de esforço (low / medium / high / xhigh / max) |
| `/effort auto` | Volta ao padrão da superfície |
| **Shift+Tab** (2x) | Plan mode — planeja sem editar arquivo |
| **Esc Esc** | Rewind, desfaz o rumo tomado |
| `ultrathink` | Escrito no meio do prompt, pede raciocínio mais profundo só naquele turno |
| **Alt+V** | Colar imagem no Windows (não é Ctrl+V) |

## Regra de escalada (ordem oficial de diagnóstico)

1. Errou por **falta de contexto** → melhore o prompt, não o modelo.
2. Pulou arquivo, não rodou teste, abandonou refactor no meio → **suba o esforço**.
3. Errou mesmo com contexto certo e esforço alto → **suba o modelo**.

Fable 5.1 é o último recurso: custa 2× Opus, 5× Sonnet, e consome até 50% do
limite semanal. Nunca deixe como padrão.

---

## FASE 0 — Estrutura do projeto

Antes de enviar: **Shift+Tab duas vezes** (plan mode). Leia o plano, aprove, deixe executar.

```
Modelo: opusplan | Esforço: high | Motivo: arquitetura base multi-arquivo, vale planejar com Opus e executar com Sonnet

Leia o PLANEJAMENTO.md e execute a FASE 0. Crie a estrutura de pastas e arquivos exatamente como na seção 3: index.html, styles/custom.css, src/app.js, src/router.js, src/store.js, src/ui.js, src/components/ e src/data/. Configure index.html com Tailwind Play CDN v4, Google Fonts (Inter e JetBrains Mono) e <script type="module" src="src/app.js">. O app.js deve inicializar tema dark, store e router com placeholders. Sem build, sem npm, sem dependências externas além dos CDNs. Comentários em pt-BR.
```

Teste: `npx serve` e abra o endereço. Deve carregar uma página escura, ainda vazia.
Commit: `git add -A ; git commit -m "Fase 0: estrutura base"`

---

## FASE 1 — Navegação, sidebar e persistência

```
Modelo: Sonnet 5 | Esforço: high | Motivo: feature nova de complexidade média, dentro do padrão do Sonnet

Execute a FASE 1 do PLANEJAMENTO.md. Implemente sidebar.js (menu lateral no desktop, hambúrguer no mobile, aria-current no item ativo), router.js (rotas por hash: #/modulo-1 até #/glossario) e store.js (estado persistido em localStorage na chave omh_state_v1, com try/catch). Adicione progress bar global e um toast "Progresso salvo". Garanta navegação por teclado e contraste AA.
```

Teste: clique em cada item do menu, aperte F5 e veja se a rota se mantém.
Commit: `git commit -am "Fase 1: navegacao e store"`

---

## FASE 2 — Módulo 1 (Fundamentos & Segurança)

```
Modelo: Sonnet 5 | Esforço: high | Motivo: módulo com dois componentes interativos novos

Execute a FASE 2 do PLANEJAMENTO.md. Popule src/data/modulo1.js com o conteúdo da seção "MÓDULO 1" e implemente: seção blockchain/imutabilidade com referências a Solscan, BscScan, Etherscan e Basescan; comparisonTable.js com a tabela CEX vs Hot Wallet vs Cold Wallet e linhas expansíveis; checklist.js de segurança da seed e proteção contra drainers, salvando o estado no store; seção de saque em reais (Pix/CPF vs P2P); mini-quiz de 5 perguntas via quiz.js. Tudo em pt-BR, dark mode.
```

Teste: marque itens do checklist, dê F5, veja se continuam marcados.
Commit: `git commit -am "Fase 2: modulo 1"`

---

## FASE 3 — Módulo 2 (Psicologia + Mermaid)

```
Modelo: Sonnet 5 | Esforço: xhigh | Motivo: integração de biblioteca externa com render dinâmico, ponto onde o Sonnet costuma vacilar em esforço padrão

Execute a FASE 3 do PLANEJAMENTO.md. Popule src/data/modulo2.js e implemente o Módulo 2. Renderize o fluxograma das 4 fases com Mermaid via ESM CDN usando mermaid.initialize({startOnLoad:false}) e await mermaid.run({nodes}) ao abrir a aba. Se o Mermaid falhar em carregar, faça fallback automático para cards Tailwind em phaseFlow.js. Adicione cards de vieses com efeito flip e mapa de tipos de token filtrável. Inclua os casos TRUMP, MELANIA e LIBRA como exemplos verificados. Mini-quiz de 4 perguntas.
```

Teste: abra o Módulo 2, saia para outra aba, volte — o diagrama tem que renderizar de novo.
Commit: `git commit -am "Fase 3: modulo 2 e mermaid"`

---

## FASE 4 — Módulo 3 (Dois Pilares)

```
Modelo: Sonnet 5 | Esforço: high | Motivo: matriz filtrável, padrão conhecido

Execute a FASE 4 do PLANEJAMENTO.md. Popule src/data/modulo3.js e implemente a matriz interativa Social vs Técnico, com filtros por chain e por papel (visualização, execução, checagem, monitoramento social). Cada ferramenta abre um card com "o que faz", "quando usar" e "risco". Destaque a correção "Axon -> Axiom", a observação de que o Sigma não suporta Solana e a marcação de que o J7 Tracker é exemplo de categoria (não verificado). Mini-quiz de 4 perguntas.
```

Commit: `git commit -am "Fase 4: modulo 3"`

---

## FASE 5 — Módulo 4 + Simulador

A fase mais complexa. **Shift+Tab duas vezes** antes de enviar.

```
Modelo: opusplan | Esforço: xhigh | Motivo: feature interativa mais complexa do projeto, com estado, ramificações e persistência

Execute a FASE 5 do PLANEJAMENTO.md. Popule src/data/modulo4.js e src/data/cenarios.js com os 12 cenários da seção "Simulador". Implemente simulator.js: cada cenário mostra a descrição e as opções Entrar, Esperar, Ignorar e Realizar parcial; ao escolher, exibe feedback didático, badge de risco (verde, amarelo ou vermelho) e o próximo passo técnico. Salve o histórico de escolhas no store e mostre um resumo de disciplina ao final. Inclua as seções de tese vs catálise e take profit. Mini-quiz de 4 perguntas.
```

Teste: percorra pelo menos 3 cenários e veja se o resumo final aparece.
Commit: `git commit -am "Fase 5: modulo 4 e simulador"`

---

## FASE 6 — Glossário

```
Modelo: Sonnet 5 | Esforço: high | Motivo: busca e filtro com persistência, escopo bem definido

Execute a FASE 6 do PLANEJAMENTO.md. Popule src/data/glossario.js com os 34 termos da seção "GLOSSÁRIO INTERATIVO ON-CHAIN", cada um com termo, categoria, definição, exemplo prático e sinal de alerta. Implemente glossary.js com busca por texto, filtro por categoria (Segurança, Liquidez, Execução, Social, Solana, EVM), botão "marcar como estudado" salvo no store e progress bar do glossário.
```

Commit: `git commit -am "Fase 6: glossario"`

---

## FASE 7 — Revisão geral

```
Modelo: Opus 5 | Esforço: xhigh | Motivo: revisão fim-a-fim de arquitetura, acessibilidade e responsividade — o tipo de tarefa em que o Opus rende mais que o Sonnet

Revise todo o app com ultrathink: responsividade em telas estreitas e largas, foco visível, aria-current, contraste AA, prefers-reduced-motion. Corrija bugs de navegação e de persistência que encontrar. Gere o README.md com o conteúdo da seção 7 do PLANEJAMENTO.md. Não altere a stack nem adicione dependências.
```

Commit: `git commit -am "Fase 7: revisao e readme"`

---

## FASE 8 — Checklist de testes

```
Modelo: Haiku 4.5 | Esforço: não se aplica | Motivo: tarefa mecânica de redação; o Haiku 4.5 não aceita parâmetro de esforço

Gere um TESTES.md com checklist manual numerado: abrir via servidor local, navegar por todas as rotas, marcar e desmarcar itens do checklist e conferir persistência após F5, rodar cada mini-quiz, percorrer o simulador, buscar e filtrar no glossário, e testar em tela estreita.
```

Commit: `git commit -am "Fase 8: testes"`

---

## Se travar

Antes de trocar de modelo, tente nesta ordem:

1. **O prompt tinha contexto suficiente?** Se ele não sabia de um arquivo, cite o arquivo pelo nome.
2. **Ele pulou etapas?** Rode `/effort xhigh` e repita o mesmo prompt.
3. **Continua errando com contexto certo?** Aí sim:

```
Modelo: Opus 5 | Esforço: xhigh | Motivo: bug que o Sonnet nao resolveu mesmo com contexto e esforco altos

ultrathink

O que eu fiz: <passos>
O que eu esperava: <resultado>
O que aconteceu: <resultado real>
Erro no console (F12 > Console): <colar aqui>
```

Só considere Fable 5.1 se o Opus 5 em `xhigh` falhar por capacidade, e volte para
Sonnet logo depois.

## Rodar o servidor local

Num segundo PowerShell, dentro da pasta do projeto:

```powershell
npx serve
```

Alternativa: `python -m http.server 5500` e abra `http://localhost:5500`.

Nunca abra o `index.html` com duplo clique — os módulos ES quebram em `file://`
e a tela fica em branco.
