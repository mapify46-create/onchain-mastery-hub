# Vídeo 6 de 33 — Corretora (CEX) × troca on-chain (DEX): o que muda na prática

**Módulo 1 — Fundamentos & Segurança · Aba "Fundamentos" · Duração-alvo: 4 a 5 minutos (máximo 6)**

> Cole este documento inteiro no Gemini. Ele contém as instruções E o material-fonte.
> Gerado automaticamente a partir dos dados do app (`scripts/gerar-prompts-de-video.mjs`);
> se o texto do módulo mudar, gere de novo — o vídeo segue o texto, nunca o contrário.

## O papel deste vídeo no curso

A diferença que importa é quem guarda a chave e quem pode bloquear. Nomes de corretoras e DEXs aparecem só como exemplo de categoria — nunca como indicação.

**Conexões:** Leva ao vídeo 7 (onde ficam as chaves) e às "três camadas" do Módulo 5 (DEX → agregador → terminal).

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

### Corretora (CEX) x troca on-chain (DEX): o que muda na prática

Numa CEX (corretora centralizada), você negocia dentro da empresa, num livro de ofertas (order book) que casa compradores e vendedores. A empresa faz a custódia (guarda suas moedas), exige KYC (verificação de identidade) e oferece suporte e, às vezes, a chance de reverter internamente um erro. Numa DEX (corretora descentralizada), você negocia direto da sua carteira, sem cadastro, sem suporte e sem reversão — se errar, não há para quem recorrer.

A DEX quase sempre usa um AMM (formador de mercado automático, do inglês Automated Market Maker). Em vez de casar comprador e vendedor, existe um pool de liquidez: um par de moedas depositado num contrato (por exemplo, ETH e um token), e uma fórmula matemática (a mais comum é o "produto constante", x × y = k) define o preço pela proporção entre elas. Cada troca muda essa proporção e, portanto, move o preço. Daí surge o slippage (deslizamento de preço): a diferença entre o preço que você viu na tela e o preço pelo qual a ordem de fato executou. Quanto menor o pool e maior a sua ordem em relação a ele, pior o slippage.

Quase todo token novo e memecoin só existe em DEX, porque criar um pool não exige autorização de ninguém — o que também significa menos proteção e muito mais espaço para golpe.

Stablecoins, em um parágrafo: são tokens que buscam manter paridade com uma moeda tradicional, quase sempre o dólar. No Brasil, boa parte do saque e da entrada de recursos em cripto passa por elas — segundo nota oficial da Receita Federal (30 de junho de 2026), entre agosto de 2019 e dezembro de 2025 foram declarados cerca de R$ 1,58 trilhão em operações com os principais criptoativos, e a participação das stablecoins no volume mensal saltou de 3,5% em 2019 para 79,7% em 2022 e 91,5% em 2023, com pico mensal de R$ 39,7 bilhões em novembro de 2025; a USDT sozinha respondeu por 88,7% do volume de stablecoins no período. (Citamos as marcas só como retrato do mercado, não como recomendação.)

