# Vídeo 4 de 33 — A mecânica do gas (taxa de rede)

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

### O que é gas (taxa de rede) e por que o preço varia

Toda ação na blockchain custa uma taxa, chamada gas na EVM. Gas é a unidade que mede o trabalho computacional de uma transação: mandar ETH usa pouco (21.000 unidades de gas para uma transferência simples entre pessoas); interagir com um contrato usa mais. A conta final tem duas partes: o gas limit (o teto de trabalho que você autoriza) e o gas price (o preço por unidade de gas). Você paga apenas pelo trabalho de fato usado, mas o gas limit protege você de uma transação que consuma trabalho sem parar.

Desde a mudança chamada EIP-1559 (ativada em agosto de 2021), o preço tem dois componentes. A base fee é calculada automaticamente pela rede conforme o congestionamento e é queimada — destruída, some de circulação, não vai para ninguém. A priority fee (gorjeta) é opcional e vai para o validador, para acelerar a inclusão da transação. Quando muita gente disputa espaço no bloco, a base fee sobe; quando a rede esvazia, ela cai — é por isso que a taxa varia minuto a minuto. Existe ainda um max fee (o teto total que você aceita pagar); o que sobrar entre o teto e o custo real é devolvido.

Ponto crucial para iniciante: uma transação que falha ainda cobra gas. O trabalho computacional foi feito pelos computadores da rede até o ponto em que deu erro, então esse esforço é cobrado do mesmo jeito — vale tanto na EVM quanto na Solana. Não existe "deu errado, não paguei".

As ordens de grandeza mudam muito entre redes. Na Ethereum mainnet o preço do gas costuma variar bastante ao longo do dia e do ano, deixando transações simples entre frações de centavo e alguns reais dependendo do congestionamento — confira sempre um "gas tracker" atualizado antes de operar, pois isso muda o tempo todo. Nas redes L2 e alternativas, como Base e BNB Chain, o custo costuma ser uma fração de centavo, porque essas redes empacotam muitas transações e usam a rede principal só como camada de dados. Na Solana o modelo é diferente e mais simples: uma taxa base fixa de 5.000 lamports por assinatura (0,000005 SOL, metade queimada e metade para o validador), mais uma priority fee opcional para furar a fila.

- Gas limit = teto de trabalho autorizado; gas price = preço por unidade.
- Base fee é queimada; a gorjeta (priority fee) vai para o validador.
- Transação que falha custa gas do mesmo jeito, na EVM e na Solana.

