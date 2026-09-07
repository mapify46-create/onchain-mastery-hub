# Vídeo 28 de 33 — O que é um terminal de execução e as três camadas

**Módulo 5 — A mecânica da execução · Aba "Terminal" · Duração-alvo: 4 a 5 minutos (máximo 6)**

> Cole este documento inteiro no Gemini. Ele contém as instruções E o material-fonte.
> Gerado automaticamente a partir dos dados do app (`scripts/gerar-prompts-de-video.mjs`);
> se o texto do módulo mudar, gere de novo — o vídeo segue o texto, nunca o contrário.

## O papel deste vídeo no curso

Terminal não é DEX: é uma camada por cima. Carteira → terminal → agregador → pool, e o que cada camada cobra. O Axiom é EXEMPLO da categoria; a lista de alternativas existe justamente para o vídeo não soar como indicação.

**Conexões:** Assume os vídeos 6 (CEX × DEX) e 7 (chaves). Prepara o vídeo 30 (taxas).

**Resumo do módulo, para contexto:** Este módulo fecha o ciclo do hub: depois de entender o mercado (Módulo 2), as ferramentas de análise (Módulo 3) e o processo de decisão (Módulo 4), falta a mecânica da execução — a tela onde a ordem é efetivamente enviada. O objetivo é estritamente operacional: entender o que cada botão faz, quem guarda as chaves, onde o dinheiro vaza em taxas que ninguém anuncia, e quais erros de operação são comuns. Nada aqui aumenta chance de lucro; tudo aqui existe para você não perder dinheiro por desatenção.

## Instruções para o Gemini

### Público e tom
- Público: **iniciante absoluto** — alguém que nunca abriu uma carteira. Português do Brasil, conversa direta, sem tom de palestra.
- Todo termo técnico é explicado **na primeira vez em que aparece, dentro da própria frase**. Nunca "como você já sabe".
- Uma ideia por tela. Se uma tela precisa de dois conceitos, são duas telas.

### Formato
- Narração + ilustrações esquemáticas (slides, diagramas, animações simples). Estilo visual: fundo escuro, acentos roxo e ciano, texto grande e legível no celular.
- **Estrutura obrigatória:**
  1. **Gancho (até 15 s):** abra com o número ou fato mais surpreendente da seção "Ganchos" abaixo.
  2. **Explicação:** o material-fonte, na ordem em que está.
  3. **Exemplo concreto:** pelo menos um, com número — e só números que estejam no material.
  4. **O que fazer / o que não fazer:** duas listas curtas.
  5. **Recapitulação em 3 frases.**
  6. **Frase final obrigatória (literal):** "Este vídeo é material de estudo. Não é aconselhamento financeiro, jurídico ou tributário. Memecoin é o ativo de maior risco do mercado — a maioria vai a zero."

### Regras duras — o vídeo é REJEITADO se quebrar qualquer uma
- **Não inventar número.** Use somente os números do material-fonte. Se faltar um dado, diga "isso não está verificado" em vez de estimar.
- **Não recomendar plataforma, carteira, corretora ou ferramenta.** Todo nome que aparece é exemplo de categoria. Nunca "use X", "eu recomendo", "a melhor é".
- **Não prometer resultado.** Proibido: "vai subir", "garantido", "sinal", "oportunidade", "aumenta suas chances de lucro". O enquadramento é sempre: **reduzir erro de operação e não perder dinheiro por desatenção.**
- **Não usar captura de tela de plataforma real.** Ilustração esquemática, sempre — por direito autoral, por parecer endosso, e porque interface de cripto muda em semanas.
- **Não desenhar gráfico de preço em forma de pump-and-dump** como se fosse padrão para caçar.
- **Manter a tese do curso:** memecoin sobe e desce por atenção, não por fundamento, e a maioria vai a zero.
- Se algum ponto está marcado **NÃO VERIFICADO** abaixo, o vídeo diz isso com todas as letras.

### Entregáveis (os três, sempre)
1. **O vídeo.**
2. **O roteiro de narração em texto**, em parágrafos corridos, sem timestamps — ele vira a transcrição dentro do app (acessibilidade e modo offline). Mesmo texto que foi narrado, palavra por palavra.
3. **A lista de números usados**, cada um com a frase do material-fonte de onde veio.

---

## Ganchos — os números para abrir o vídeo

São os três números do app para esta parte. Abra o vídeo com o mais surpreendente deles. Use SOMENTE estes números como gancho — não invente outros.

- **3** — Camadas entre você e a pool. Carteira → terminal → agregador → pool. Cada camada que você acrescenta é uma taxa a mais.
- **0%** — O que o agregador cobra. No modo manual do Jupiter, sem taxa de protocolo no swap básico. Você paga a DEX por baixo e a rede.
- **0,95%** — A camada mais cara. O terminal. Não compra preço melhor — compra a interface, a descoberta e os botões.

## MATERIAL-FONTE (copiado do app — a base do vídeo; não vá além dele)

### O que é um terminal de execução

Um terminal de execução on-chain é uma camada de software — um site ou app — que fica entre a sua carteira e a DEX (a exchange descentralizada onde a troca realmente acontece). Ele não substitui a blockchain e não guarda uma lista de preços própria: o que ele faz é montar a transação para você, aplicar as suas configurações (slippage, prioridade, proteção de MEV) e mandar você assinar.

A confusão mais comum de iniciante é achar que o terminal "é" a exchange. Não é. A troca acontece numa pool de liquidez, num contrato inteligente que existe independentemente dele. Se o terminal sair do ar amanhã, a pool continua lá e seus tokens continuam na sua carteira — desde que as chaves sejam suas, que é exatamente o assunto da próxima aba.

O que você compra ao usar um terminal é conveniência: descoberta de tokens novos, gráficos, dados de holders, botões de compra rápida, rastreamento de carteiras. Você não compra preço melhor. Isso precisa ficar claro desde já, porque é o ponto onde o marketing da categoria mais escorrega.

### As três camadas — e o que cada uma cobra

Existem três formas de fazer a mesma troca, e cada camada que você acrescenta é uma taxa a mais. Entender isso é o que permite responder à pergunta "por que estou pagando isso?" em vez de simplesmente pagar.

Ir direto na DEX (Raydium, Orca, PumpSwap) significa interagir com a pool de liquidez pela interface dela. Você paga a taxa da pool e mais nada — no padrão da Raydium, 0,25%, dos quais 0,22% vão para quem forneceu a liquidez (docs.raydium.io/ray/protocol-fees).

Usar um agregador (o Jupiter é o exemplo mais conhecido na Solana) acrescenta uma busca: ele varre dezenas de DEXs procurando a melhor rota para a sua ordem. No modo manual, o Jupiter não cobra taxa de protocolo pelo swap básico — você segue pagando a taxa da DEX por baixo (docs.jup.ag/user-docs/trade/swap/manual-mode).

Usar um terminal (Axiom, Photon, BullX) acrescenta a taxa da plataforma POR CIMA de tudo isso. No Axiom, a documentação oficial lista de 0,95% líquido no nível de entrada a 0,75% no topo (docs.axiom.trade/getting-started/fees/axiom-fees). Essa taxa não compra preço melhor: compra a interface e as ferramentas.

### Não existe uma opção única

O Axiom é usado neste módulo como exemplo concreto porque é preciso mostrar uma interface real, com números reais, para o conteúdo não virar abstração. Ele não é indicação, e não é a única plataforma da categoria. Saber que há alternativas importa por um motivo prático: evita você achar que "operar on-chain" e "usar aquele site" são a mesma coisa.

Uma linha neutra de cada uma que estava ativa na data desta pesquisa, sem ranking e sem comparação de qualidade:

- Photon — terminal web para Solana, com foco em escanear e executar manualmente.
- BullX (NEO) — terminal com suporte a mais de uma rede.
- Trojan — opera dentro do Telegram: rastrear, negociar, copiar operações.
- Bonkbot — bot de Telegram, foco em simplicidade, só Solana.
- GMGN — web e Telegram, cobertura multi-rede, foco em copy trading e anti-MEV.
- Banana Gun, Maestro e Padre — outros nomes ativos na categoria em 2026.

### Tabela do app: as três camadas

|  | O que faz | O que cobra | Observação |
|---|---|---|---|
| **DEX direto** (Raydium, Orca, PumpSwap — exemplos de categoria) | É a pool de liquidez onde a troca acontece de fato, no contrato inteligente. | Só a taxa da pool — 0,25% no padrão da Raydium, 1,25% na bonding curve do pump.fun. | Camada mais barata e a menos confortável: sem descoberta de token, sem gráfico integrado, sem dados de holders. |
| **Agregador de liquidez** (Jupiter — exemplo de categoria) | Varre várias DEXs procurando a melhor rota para a sua ordem e divide entre pools se compensar. | No modo manual, sem taxa de protocolo no swap básico; você paga a DEX por baixo e a rede. | Acrescenta busca de preço sem acrescentar custo de plataforma. |
| **Terminal de execução** (Axiom, Photon, BullX — exemplos de categoria) | Interface, descoberta de tokens, gráficos, dados de holders, botões de compra rápida, rastreamento. | Taxa da plataforma POR CIMA de tudo — no Axiom, 0,95% líquido no nível de entrada. | Você paga por conveniência e ferramentas, não por preço melhor. |

- *DEX direto* — Na Raydium (AMM v4), os 0,25% se dividem em 0,22% para quem fornece liquidez e 0,03% para recompra de RAY. A taxa da pool existe independentemente de qual interface você usou para chegar até ela — inclusive quando você usa um terminal.
- *Agregador de liquidez* — É a camada que efetivamente pode melhorar o seu preço de execução, porque compara rotas. Um terminal normalmente usa um agregador por baixo — ou seja, você já está pagando por essa camada mesmo sem saber que ela existe.
- *Terminal de execução* — A tabela de níveis do Axiom vai de 0,95% líquido (Wood, entrada) a 0,75% (Champion, topo), com devolução em SOL de 0,05% a 0,25%. Os limiares de volume para subir de nível não são publicados oficialmente — ou seja, não dá para calcular quanto é preciso operar para chegar ao nível mais barato.

### Ilustração das camadas (com a taxa anotada)

- **camadas:**
  - Carteira — assina (Você autoriza cada transação)
  - Terminal — 0,95% (Interface e ferramentas)
  - Agregador — 0% (Busca a melhor rota)
  - Pool da DEX — 0,25–1,25% (Onde a troca acontece)

## Roteiro visual sugerido (diagramas do app, em texto)

Cada bloco abaixo é um diagrama que já existe no app, descrito passo a passo. Use como storyboard: uma tela por passo, ilustração esquemática, sem captura de tela de plataforma real.

### As camadas entre a carteira e a DEX

*A ordem sai da carteira, passa pelo terminal e pelo agregador, até chegar à pool.*

1. A ordem começa na sua carteira, que assina a transação.
2. O terminal recebe a ordem e aplica as suas configurações de slippage, prioridade e proteção de MEV.
3. O terminal envia para um agregador de liquidez, que procura a melhor rota entre várias DEXs.
4. O agregador roteia a ordem para uma ou mais pools de liquidez.
5. O token comprado volta para a sua carteira.

