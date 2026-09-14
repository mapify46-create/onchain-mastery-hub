# Vídeo 10 de 46 — Wallet drainers: o golpe que não rouba a sua seed

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
  6. **Frase final obrigatória (literal):** "Este vídeo é material de estudo próprio. Memecoin é o ativo de maior risco do mercado — a maioria vai a zero."
- **Segmentos:** divida o vídeo em 2 ou 3 partes, cada uma com um título na tela e uma pausa curta entre elas. Dividir em partes com pausa marcada ajuda a reter e a aplicar (meta-análise de Rey et al., 2019).

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
2. **Um resumo navegável do vídeo, em texto**: o título de cada segmento e, abaixo dele, de 2 a 4 frases curtas com as ideias e os números. Ele aparece ao lado do vídeo no app (acessibilidade e modo offline). **Não é a narração palavra por palavra**: texto idêntico à fala, mostrado junto do vídeo, atrapalha em vez de ajudar (efeito de redundância — Adesope & Nesbit, 2012).
3. **A lista de números usados**, cada um com a frase do material-fonte de onde veio.

---

## Ganchos — os números para abrir o vídeo

São os três números do app para esta parte. Abra o vídeo com o mais surpreendente deles. Use SOMENTE estes números como gancho — não invente outros.

- **US$ 494 mi** — Roubado por drainers em 2024. Mais de 332 mil carteiras, alta de 67% sobre 2023. Em 2025 caiu 83%, para cerca de US$ 83,85 milhões.
- **80%** — Fatia de quem espalha a isca. A divisão mais comum entre afiliado e operador do kit. O drainer é um negócio com franquia — e o afiliado é quem te aborda.
- **Sua seed** — O que o drainer NÃO precisa. Ele rouba com a sua assinatura, não com a sua frase. Você aprova, sem ler, uma permissão que entrega os tokens.

## MATERIAL-FONTE (copiado do app — a base do vídeo; não vá além dele)

### Wallet drainers: o golpe que não rouba a sua seed

Um wallet drainer ("esvaziador de carteira") é um kit de golpe. Ele fica num site falso, feito para parecer um site conhecido. Esse tipo de site falso se chama phishing.

O site pede que você assine uma transação ou uma mensagem. Parece rotina. Mas a assinatura dá ao golpista permissão sobre seus tokens, e ele esvazia a carteira sem nunca ver a sua seed.

Por trás existe um negócio organizado, o "drainer como serviço" (DaaS, do inglês drainer-as-a-service). Um grupo, chamado operador, cria o kit e o aluga para golpistas menores, os afiliados. São os afiliados que espalham os sites falsos.

Quando o roubo acontece, um contrato divide o dinheiro sozinho entre os dois. A divisão mais comum é 80% para o afiliado e 20% para o operador.

A boa notícia: as perdas caíram muito em 2025. Os números abaixo são da Scam Sniffer e contam perdas com drainers em redes EVM (a Ethereum e as redes que funcionam como ela).

A má notícia: o golpe continua ativo. A própria Scam Sniffer avisa que a queda acompanhou o mercado como um todo, e que "à medida que drainers antigos saem, novos surgem".

### O roteiro do golpe, passo a passo

Entender a sequência desarma o golpe. São quatro etapas, e o ponto de virada é a terceira.

O dano não está em conectar, e sim em assinar. A defesa central é ler o que a carteira mostra antes de confirmar.

Desconfie de qualquer "assinar mensagem" vindo de um site que você não abriu digitando o endereço você mesmo.

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

