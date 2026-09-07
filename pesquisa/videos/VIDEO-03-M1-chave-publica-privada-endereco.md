# Vídeo 3 de 33 — Chave pública, chave privada e endereço

**Módulo 1 — Fundamentos & Segurança · Aba "Fundamentos" · Duração-alvo: 4 a 5 minutos (máximo 6)**

> Cole este documento inteiro no Gemini. Ele contém as instruções E o material-fonte.
> Gerado automaticamente a partir dos dados do app (`scripts/gerar-prompts-de-video.mjs`);
> se o texto do módulo mudar, gere de novo — o vídeo segue o texto, nunca o contrário.

## O papel deste vídeo no curso

A metáfora precisa ficar cravada: endereço é o que você mostra, chave privada é o que assina, e a frase-semente gera todas. Quem entende isso entende por que "a seed É a carteira" (vídeo 9).

**Conexões:** Base direta dos vídeos 7, 8 e 9 (carteiras e seed) e da aba Custódia do Módulo 5.

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

### Chave pública, chave privada e endereço: o que é cada um

Cripto usa criptografia de chave pública (criptografia assimétrica): em vez de uma única senha, você tem um par de chaves ligadas por matemática. A chave privada é um número secreto escolhido ao acaso — na prática, 32 bytes, ou seja, 256 bits de aleatoriedade. Ela é o segredo que assina as transações: é a prova de que você autoriza mover as moedas. Pense nela como uma assinatura de próprio punho que ninguém pode ver nem copiar — quem tiver a sua, assina no seu lugar.

A partir da chave privada, a matemática gera a chave pública. É uma via de mão única: dá para ir da privada para a pública, mas é impossível voltar — não existe conta que descubra a privada a partir da pública. Na Ethereum e redes EVM isso usa a curva elíptica secp256k1; na Solana, usa a curva Ed25519.

O endereço é derivado da chave pública, mas o caminho muda conforme a rede. Na EVM, pega-se o hash Keccak-256 da chave pública e ficam os últimos 20 bytes — é isso que vira o endereço de 42 caracteres começando com "0x". Na Solana o caminho é mais curto: a chave pública tem 32 bytes e é o próprio endereço, apenas escrito em base58 (aquela sequência de 32 a 44 letras e números). Uma confusão comum: muita gente chama o endereço de "chave pública". Na EVM, tecnicamente, não é a mesma coisa — o endereço é um resumo (hash) da chave pública. Na Solana, sim, o endereço É a chave pública, só que codificada em base58.

Como isso se conecta com a seção da frase-semente (mais adiante): a frase é a raiz de tudo. Dela nasce a chave privada, da privada nasce a pública, e da pública nasce o endereço. Por isso o endereço você divulga à vontade (é como o número da conta que você passa para receber um Pix), mas a chave privada e a frase-semente você nunca mostra a ninguém. E, como toda a cadeia é de mão única, saber o seu endereço não permite a ninguém descobrir sua chave.

- Endereço = para receber (pode divulgar à vontade).
- Chave privada e frase-semente = para gastar (segredo absoluto).
- Curiosidade: ao enviar uma transação, a assinatura expõe a chave pública na rede — mesmo assim, isso não compromete a privada, porque o caminho de volta continua impossível na prática.

