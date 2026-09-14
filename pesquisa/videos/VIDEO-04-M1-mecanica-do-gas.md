# Vídeo 4 de 46 — A mecânica do gas (taxa de rede)

**Módulo 1 — Fundamentos & Segurança · Aba "Fundamentos" · Duração-alvo: 4 a 5 minutos (máximo 6)**

> Cole este documento inteiro no Gemini. Ele contém as instruções E o material-fonte.
> Gerado automaticamente a partir dos dados do app (`scripts/gerar-prompts-de-video.mjs`);
> se o texto do módulo mudar, gere de novo — o vídeo segue o texto, nunca o contrário.

## O papel deste vídeo no curso

Já existe um vídeo deste tema no app (assets/videos/mecanica-do-gas.mp4). Este prompt serve para regravar com o padrão do curso ou para gerar a TRANSCRIÇÃO em texto, que ainda está faltando. Pontos obrigatórios: por que o preço varia, e por que transação que falha cobra do mesmo jeito.

**Conexões:** O Módulo 5 inteiro de taxas assume este vídeo (priority fee e gorjeta de MEV são "gas" com outros nomes).

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

## MATERIAL-FONTE (copiado do app — a base do vídeo; não vá além dele)

### O que é gas (taxa de rede) e por que o preço varia

Na Ethereum e nas redes que funcionam como ela (as redes EVM), essa taxa se chama gas. Gas mede quanto trabalho de computador a sua transação exige.

Ações simples gastam pouco gas. Mandar ETH para outra pessoa usa 21.000 unidades de gas. Mexer com um contrato usa mais.

Você paga o gas de fato usado, vezes o preço de cada unidade (gas price). O gas limit é um teto de trabalho que você autoriza. Ele protege você de uma transação que consuma trabalho sem parar.

O preço sobe quando muita gente quer usar a rede ao mesmo tempo. Quando a rede esvazia, ele cai. Por isso a taxa muda minuto a minuto.

Uma parte da taxa é queimada, isto é, destruída. Outra parte, a gorjeta, vai para o validador, o computador que coloca sua transação no bloco.

Ponto crucial: transação que falha também paga. Os computadores da rede trabalharam até o erro, e esse trabalho é cobrado. Vale na EVM e na Solana. Não existe "deu errado, não paguei".

O custo muda muito de uma rede para outra:

- Gas limit = teto de trabalho autorizado; gas price = preço por unidade.
- Base fee é queimada; a gorjeta (priority fee) vai para o validador.
- Transação que falha custa gas do mesmo jeito, na EVM e na Solana.

