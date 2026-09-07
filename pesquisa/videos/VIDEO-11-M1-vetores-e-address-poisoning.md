# Vídeo 11 de 33 — Os vetores técnicos e o address poisoning

**Módulo 1 — Fundamentos & Segurança · Aba "Golpes" · Duração-alvo: 4 a 5 minutos (máximo 6)**

> Cole este documento inteiro no Gemini. Ele contém as instruções E o material-fonte.
> Gerado automaticamente a partir dos dados do app (`scripts/gerar-prompts-de-video.mjs`);
> se o texto do módulo mudar, gere de novo — o vídeo segue o texto, nunca o contrário.

## O papel deste vídeo no curso

Reconhecimento de padrões: cada vetor é "como se parece na tela" + "o que fazer". Address poisoning merece demonstração visual do endereço parecido (primeiros e últimos caracteres iguais).

**Conexões:** Complementa o vídeo 10. O Módulo 5 retoma o "token impostor", que é o mesmo princípio aplicado a tickers.

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

## MATERIAL-FONTE (copiado do app — a base do vídeo; não vá além dele)

### Os vetores técnicos que você precisa reconhecer

Os drainers usam alguns truques específicos, e vale conhecer o nome de cada um. O approval ilimitado de ERC-20: ERC-20 é o padrão dos tokens nas redes EVM, e "approval" é a permissão que você dá a um contrato para gastar seus tokens. Sites legítimos pedem approval para funcionar, mas golpistas pedem um approval de valor ilimitado, que deixa o contrato livre para esvaziar aquele token quando quiser — sem nova interação sua. Aprovações "dormentes" e ilimitadas foram, por anos, a maior categoria de perdas em DeFi.

As mensagens Permit e Permit2 são um segundo vetor, mais sutil. Elas são assinaturas "sem gás" (sem taxa) feitas por um padrão chamado EIP-712, e aparecem na carteira como um inofensivo "assinar mensagem", não como uma transação — o que engana a vítima. O Permit2, contrato criado pela Uniswap e hoje muito usado (no mesmo endereço 0x000000000022D473030F116dDEE9F6B43aC78BA3 em várias redes EVM), concentra permissões de vários tokens. Segundo o relatório anual da Scam Sniffer de 2024, os tipos de assinatura de phishing se dividiram em Permit (56,7% dos roubos), setOwner (31,9%), Transfer (4,5%) e increaseAllowance (3,5%), com a rede Ethereum concentrando 85,3% das perdas (cerca de US$ 152 milhões). Em 2025, Permit/Permit2 seguiram como as ferramentas mais eficazes dos golpistas, respondendo por 38% das perdas nos casos acima de US$ 1 milhão.

Ainda há o setApprovalForAll de NFT (ERC-721/ERC-1155): essa função dá a um "operador" o direito de gerenciar todos os seus NFTs de uma coleção de uma só vez. É o que faz um marketplace legítimo funcionar — e é também o primitivo por trás de quase toda drenagem de NFT por phishing. Um único clique pode entregar a coleção inteira.

Um vetor novo, surgido em 2025 e que merece atenção redobrada, é o EIP-7702 — tratado em detalhe na aba "Defesa", junto com as duas camadas do Permit2.

### Address poisoning e clipper: quando o alvo é o endereço

Nem todo golpe passa por assinatura. O address poisoning ("envenenamento de endereço") explora um hábito: como os endereços são enormes, a gente confere só os primeiros e últimos caracteres. O golpista gera um endereço parecido (mesmo começo e mesmo fim) e envia para você uma transação minúscula, só para "sujar" o seu histórico. Depois, quando você for enviar de novo e copiar um endereço do histórico, pode copiar o do golpista sem perceber. Um estudo acadêmico da Carnegie Mellon University ("Blockchain Address Poisoning", apresentado no USENIX Security Symposium de 2025) mediu Ethereum e BNB Chain de julho de 2022 a junho de 2024 e identificou 270 milhões de tentativas de ataque contra 17 milhões de vítimas, com 6.633 incidentes bem-sucedidos e ao menos US$ 83,8 milhões em perdas.

O clipper malware é um vírus no seu aparelho que vigia a área de transferência (o "copiar e colar"). Quando ele detecta que você copiou um endereço de cripto, troca silenciosamente pelo endereço do atacante no momento em que você cola. Você copiou o endereço certo, mas cola o errado — e, como a transação é irreversível, o dinheiro se perde. Variantes sofisticadas usam endereços parecidos com o seu de verdade, para enganar quem confere só os primeiros caracteres depois de colar.

A defesa contra os dois é a mesma disciplina: nunca confiar no começo-e-fim do endereço, conferir a linha inteira e, acima de tudo, enviar sempre uma transação-teste de valor baixo antes de mandar um valor alto. Uma carteira fria ajuda muito aqui, porque mostra o endereço de destino na telinha do próprio aparelho, fora do alcance do clipper.

