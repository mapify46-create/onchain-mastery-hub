# Vídeo 10 de 33 — Wallet drainers: o golpe que não rouba a sua seed

**Módulo 1 — Fundamentos & Segurança · Aba "Golpes" · Duração-alvo: 4 a 5 minutos (máximo 6)**

> Cole este documento inteiro no Gemini. Ele contém as instruções E o material-fonte.
> Gerado automaticamente a partir dos dados do app (`scripts/gerar-prompts-de-video.mjs`);
> se o texto do módulo mudar, gere de novo — o vídeo segue o texto, nunca o contrário.

## O papel deste vídeo no curso

O drainer não precisa da sua seed — ele precisa de uma assinatura sua. O roteiro passo a passo (o que a vítima vê × o que está acontecendo) é o coração do vídeo: uma cena por passo.

**Conexões:** Depende do vídeo 5 (contrato/aprovação). Leva ao vídeo 12 (revogar) e 13 (emergência).

**Resumo do módulo, para contexto:** Este módulo ensina, do zero, como a blockchain funciona e por que ela é "imutável", como ler uma transação num explorador de blocos, o que são chave privada, chave pública, gas e contrato inteligente, e a diferença entre corretora (CEX) e troca on-chain (DEX). Aprofunda a segurança: onde guardar cripto, por que a frase-semente É a sua carteira, como funcionam os golpes de esvaziamento de carteira (wallet drainers), como revogar aprovações clique a clique e o que fazer nos primeiros minutos se você descobrir que foi drenado. Por fim, cobre os golpes mais comuns no Brasil e como sacar para reais dentro do cenário regulatório atual.

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

- **US$ 494 mi** — Roubado por drainers em 2024. Mais de 332 mil carteiras, alta de 67% sobre 2023. Em 2025 caiu 83%, para cerca de US$ 83,85 milhões.
- **80%** — Fatia de quem espalha a isca. A divisão mais comum entre afiliado e operador do kit. O drainer é um negócio com franquia — e o afiliado é quem te aborda.
- **Sua seed** — O que o drainer NÃO precisa. Ele rouba com a sua assinatura, não com a sua frase. Você aprova, sem ler, uma permissão que entrega os tokens.

## MATERIAL-FONTE (copiado do app — a base do vídeo; não vá além dele)

### Wallet drainers: o golpe que não rouba a sua seed

Um wallet drainer ("esvaziador de carteira") é um kit de golpe, geralmente hospedado num site de phishing, que induz a vítima a assinar uma transação ou assinatura maliciosa — e então esvazia a carteira, sem precisar da sua seed. É uma mudança de mentalidade importante: você pode ter guardado a frase perfeitamente e ainda assim perder tudo por causa de uma assinatura.

Esses golpes viraram uma indústria chamada "drainer-as-a-service" (DaaS, drenador como serviço): um grupo de desenvolvedores cria o kit e o "aluga" para golpistas menores (os "afiliados"), que espalham os sites falsos; quando o roubo acontece, um contrato divide automaticamente o dinheiro entre os dois. Um estudo revisado por pares apresentado na conferência ACM Internet Measurement Conference de 2025 (He et al., Universidade de Zhejiang com a BlockSec) mediu esse mercado no Ethereum entre 1º de março de 2023 e 1º de abril de 2025: US$ 135 milhões roubados de 76.582 vítimas, dos quais US$ 111,9 milhões foram para afiliados e US$ 23,1 milhões para operadores, distribuídos por 1.910 contratos de partilha de lucro, 56 operadores e 6.087 afiliados. Segundo o estudo, os afiliados ficam "tipicamente com 80% a 90%" do roubo — a divisão mais comum é 80% para o afiliado e 20% para o operador, com a fatia do operador variando de 10% a 40% entre os contratos observados. Um piso de 75% para o afiliado também aparece em material de recrutamento de uma dessas operações (relatório da Recorded Future/Insikt Group sobre o grupo "Rublevka Team", que anunciava "starting percentage of 75% and 80% for 'experienced users'"). Um caso concreto documentado pela própria Ledger: no incidente do Angel Drainer associado ao ataque à biblioteca Ledger Connect Kit (dezembro de 2023), a divisão observada foi 85% para o atacante e 15% para o kit.

A boa notícia é que o volume caiu muito. Segundo a Scam Sniffer, as perdas com drainers em redes EVM foram de cerca de US$ 295,5 milhões em 2023 (mais de 324.000 vítimas, maior roubo isolado de US$ 24 milhões), subiram para cerca de US$ 494 milhões em 2024 (mais de 332.000 carteiras, alta de 67% sobre 2023, maior roubo isolado de US$ 55,48 milhões) e caíram 83% em 2025, para cerca de US$ 83,85 milhões (106.106 carteiras, queda de 68% no número de vítimas; maior roubo isolado de US$ 6,5 milhões via assinatura Permit, em setembro; só 11 casos acima de US$ 1 milhão, contra 30 em 2024). A própria Scam Sniffer avisa que a queda acompanhou o mercado como um todo, e que "à medida que drainers antigos saem, novos surgem" — o ecossistema segue ativo.

Para dimensionar um caso concreto de DaaS: o Inferno Drainer, entre novembro de 2022 e novembro de 2023, é estimado pelo Group-IB (citando dados da Scam Sniffer) em mais de US$ 80 milhões roubados de cerca de 137.000 vítimas, usando mais de 16.000 domínios únicos e imitando mais de 100 marcas cripto.

### O roteiro do golpe, passo a passo

Entender a sequência desarma o golpe. Primeiro vem a isca: um falso airdrop, um "mint" de NFT, um falso suporte ou um anúncio patrocinado que aparece quando você pesquisa o nome de um site. Você clica e chega a um site que imita o verdadeiro.

Depois você conecta a carteira. Esse passo, sozinho, é inofensivo: conectar só permite que o site veja seus saldos públicos — não move nada. O problema é o passo seguinte. O site pede uma assinatura disfarçada de "claim" ("resgatar"), "login" ou "verificação". É aqui que o golpe acontece: a assinatura, na verdade, concede uma permissão sobre seus tokens.

Com a permissão em mãos, o atacante usa a função transferFrom (uma ordem que diz "transfira daquele endereço para o meu") para levar seus tokens. Como a permissão foi você quem deu, a blockchain considera tudo legítimo e a transferência é irreversível. Repare no ponto de virada: o dano não está em conectar, e sim em assinar. A defesa central é ler o que a carteira mostra antes de confirmar e desconfiar de qualquer "assinar mensagem" vindo de um site que você não abriu digitando o endereço você mesmo.

### O roteiro do golpe, passo a passo (o que a vítima vê × o que acontece)

1. **Isca**
   - O que a vítima vê: Um anúncio, "airdrop", "mint" de NFT, conta de projeto conhecida no X/Discord, ou site clonado que parece oficial.
   - O que está acontecendo: O golpista usa marca imitada e conta hackeada ou falsa para atrair; kits de drainer clonam sites automaticamente.
2. **Conectar carteira**
   - O que a vítima vê: "Conecte sua carteira para reivindicar/participar" — parece o passo normal de qualquer app.
   - O que está acontecendo: Conectar em si não rouba: só permite que o site veja seus saldos públicos. O passo leva à tela onde a assinatura maliciosa será pedida.
3. **Assinar**
   - O que a vítima vê: Um pop-up pedindo para "assinar", às vezes chamado de "verificação" ou "claim" gratuito, sem taxa.
   - O que está acontecendo: É um approve ilimitado, uma assinatura Permit/Permit2 (EIP-712, sem gás) ou um setApprovalForAll de NFTs — autorizando o golpista a mover seus ativos.
4. **Drenagem**
   - O que a vítima vê: Nada, ou uma tela de "erro"/"tente de novo"; o saldo some minutos depois.
   - O que está acontecendo: O golpista chama transferFrom (ou usa a assinatura/delegação) e transfere os fundos, sem precisar de nova ação da vítima.
5. **Lavagem**
   - O que a vítima vê: (a vítima costuma perceber tarde, quando o saldo já sumiu)
   - O que está acontecendo: Os fundos passam por mixers, pontes entre redes ou corretoras rapidamente; a divisão operador/afiliado (tipicamente 20%/80%) é paga automaticamente por um contrato.

## Roteiro visual sugerido (diagramas do app, em texto)

Cada bloco abaixo é um diagrama que já existe no app, descrito passo a passo. Use como storyboard: uma tela por passo, ilustração esquemática, sem captura de tela de plataforma real.

### Como um drainer esvazia a carteira

*O dano não está em conectar, e sim em assinar.*

1. Uma isca (falso airdrop, mint ou suporte) atrai a vítima a um site clonado.
2. A vítima conecta a carteira, o que apenas mostra os saldos.
3. A vítima assina um approve ou um Permit/Permit2 que parece inofensivo.
4. O golpista usa essa autorização (transferFrom) e move os fundos para fora.
5. Os fundos são lavados, passando por mixers e pontes entre redes.

