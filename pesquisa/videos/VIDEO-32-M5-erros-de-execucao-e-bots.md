# Vídeo 32 de 33 — Os erros que custam dinheiro sem envolver o mercado — e por que você não vence bots

**Módulo 5 — A mecânica da execução · Aba "Erros" · Duração-alvo: 4 a 5 minutos (máximo 6)**

> Cole este documento inteiro no Gemini. Ele contém as instruções E o material-fonte.
> Gerado automaticamente a partir dos dados do app (`scripts/gerar-prompts-de-video.mjs`);
> se o texto do módulo mudar, gere de novo — o vídeo segue o texto, nunca o contrário.

## O papel deste vídeo no curso

Erro operacional, não de estratégia: token impostor (buscar pelo contrato, não pelo ticker), quantia errada, aprovar sem ler, perseguir vela. Bots: calibrar expectativa, NÃO ensinar a usar bot — inclusive dizer que colocar IA no meio deixa a pessoa mais lenta, não mais rápida.

**Conexões:** Assume os vídeos 11 (impostor) e 31 (slippage).

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

- **350 ms** — Duração de um slot na Solana. Desde 21/08/2026. Um bot reage em dezenas de milissegundos, com transação pré-assinada.
- **30–60 s** — Você, do "vi" ao "confirmado". Quando você vê um token novo já subindo, os bots já entraram. O preço que sobra é o que eles recusaram.
- **Ilimitado** — Tokens que podem ter o mesmo ticker. Nome e ticker são apelido; endereço do contrato é identidade. Busque sempre pelo endereço.

## MATERIAL-FONTE (copiado do app — a base do vídeo; não vá além dele)

### Os erros que custam dinheiro sem envolver o mercado

Existe uma classe de prejuízo que não tem nada a ver com o token ter subido ou caído. São erros de operação, e a característica deles é que a pessoa sabia a regra e errou mesmo assim, por pressa ou por reflexo.

O mais caro é comprar o token errado. Nomes e tickers podem ser duplicados à vontade — qualquer um cria um token chamado igual ao que está em alta. A regra mecânica que resolve é buscar sempre pelo endereço do contrato verificado, nunca pelo nome. Ticker é apelido; endereço é identidade.

Os outros aparecem na aba de erros com detalhe. Em resumo: slippage alto numa pool rasa, em que a sua própria compra move o preço; quantia errada digitada ou botão de compra rápida ainda configurado no valor da operação anterior; assinar sem ler o que a transação autoriza (o Módulo 1 já mostrou onde isso termina); e perseguir uma vela que já subiu, que é erro de disciplina disfarçado de decisão.

Um erro de fundo, que precede todos os outros: operar na carteira principal. Uma carteira separada só para operar limita o estrago se o dispositivo ou o app forem comprometidos, e não custa nada criar.

### Por que velocidade não é uma disputa que você vença

Bots de sniping são programas que monitoram a blockchain e compram tokens novos em frações de segundo depois que a liquidez é criada. Esta seção não ensina a usar bot: ela existe para calibrar expectativa, porque a expectativa errada aqui custa dinheiro real.

A conta é simples. Um slot na Solana passou de 400 ms para 350 ms em 21 de agosto de 2026, na primeira redução desde o lançamento da rede (SIMD-0525, solana.com/upgrades/reduced-slot-times). Bots reagem na casa das dezenas de milissegundos, com transações pré-assinadas e infraestrutura colada à produção de blocos. Um humano leva de 30 a 60 segundos entre ver a informação e ter a transação confirmada.

O diferencial deles não é inteligência, é infraestrutura. E a consequência prática é desconfortável: quando você vê um token "novo" já subindo, os bots já entraram. Qualquer preço que você consegue no instante do lançamento é um preço que um bot mais rápido decidiu recusar.

Isso vale também para a ideia de automatizar a sua própria reação com inteligência artificial. Uma chamada de modelo leva segundos; a disputa se decide em milissegundos. Colocar uma camada de IA no meio do caminho te deixa mais lento, não mais rápido.

