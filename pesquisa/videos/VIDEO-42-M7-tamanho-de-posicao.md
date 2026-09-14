# Vídeo 42 de 46 — Tamanho de posição: por que a fórmula de Kelly quebra, e o que sobra é sobreviver

**Módulo 7 — A rotina · Aba "Tamanho" · Duração-alvo: 4 a 5 minutos (máximo 6)**

> Cole este documento inteiro no Gemini. Ele contém as instruções E o material-fonte.
> Gerado automaticamente a partir dos dados do app (`scripts/gerar-prompts-de-video.mjs`);
> se o texto do módulo mudar, gere de novo — o vídeo segue o texto, nunca o contrário.

## O papel deste vídeo no curso

A matemática, sem sugerir fração. Arco: fração fixa → Kelly precisa de média e variância que talvez não existam em memecoin → ruína do apostador (99,5% na roleta) → a conta (1 − f)ⁿ com o exemplo resolvido da calculadora → recuperar custa mais do que perder. A frase que precisa cravar: o tamanho de cada posição é um valor que você pode perder inteiro.

**Conexões:** Assume o vídeo 26 (curva de recuperação). Conecta com a mortalidade do Módulo 2 (68,67% no mesmo dia).

**Resumo do módulo, para contexto:** Uma forma de operar não é um palpite repetido: é uma regra escrita antes, um tamanho que aguenta ir a zero, uma saída que executa sozinha, um diário que guarda o que você pensou e uma revisão que olha o comportamento, não o saldo. Este módulo mostra o que cada peça tem de evidência — e o que não tem.

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

- **0** — Fração de Kelly numa aposta com 50% de chance de dobrar e 50% de perder tudo. f* = (0,5 × 1 − 0,5) ÷ 1. A possibilidade de perda total domina a conta.
- **99,5%** — Chance de quebrar com uma desvantagem pequena, repetida. Roleta, aposta no par: começando com 50 fichas e parando só em 100 (ruína do apostador, Feller).
- **+100%** — Ganho necessário para recuperar uma perda de 50%. Perder metade exige dobrar o que sobrou só para voltar ao ponto de partida.

## MATERIAL-FONTE (copiado do app — a base do vídeo; não vá além dele)

### Fração fixa: o ponto de partida, e por quê

Fração fixa é arriscar sempre a mesma porcentagem do capital que você tem hoje. Duas propriedades explicam por que ela é o ponto de partida.

O número que circula, "arrisque de 1% a 2% por operação", é convenção de mercado. Nenhum estudo revisado por pares o fixa como ótimo.

Ele é coerente com a ideia de sobreviver. E é só isso.

### O critério de Kelly, e por que ele quebra em memecoin

O critério de Kelly responde uma pergunta: que fração apostar para o capital crescer o mais rápido possível no longo prazo?

Para um ativo contínuo, a fórmula é f* = μ ÷ σ². O μ é o retorno esperado (a média). O σ² é a variância, que mede o quanto os retornos se espalham.

A fórmula só funciona se a média e a variância existirem.

Cauda é a ponta da distribuição, onde ficam os resultados extremos. Numa cauda muito pesada, retornos gigantes, para cima e para baixo, aparecem com frequência demais.

Aí a variância pode ser infinita, e a média pode nem existir. A fórmula não produz número nenhum.

O que a pesquisa diz com segurança é a direção: quanto mais pesada a cauda, menor a fração ótima.

O valor ótimo para memecoin, ninguém resolveu.

### A ruína do apostador: sobreviver vem primeiro

Num jogo com uma desvantagem pequena, repetido muitas vezes, a ruína é quase certa.

Em memecoin, a matemática do crescimento não funciona e a perda total é comum. Aí a pergunta muda.

Sai "quanto cresce?". Entra "quanto aguento perder sem ser eliminado?".

Daí a regra que sobra com fundamento: o tamanho de cada posição é um valor que você pode perder inteiro.

Perder inteiro não é o caso extremo. 68,67% dos tokens do Pump.fun pararam de negociar no mesmo dia em que nasceram (CoinGecko Research).

### A conta que a calculadora faz

Se cada posição perdida vai a zero, depois de n perdas seguidas com a fração f sobra (1 − f)ⁿ do capital.

Em palavras: a cada perda, você fica com (1 − f) do que tinha.

Recuperar custa mais do que perder, porque o ganho é calculado sobre um capital menor.

### Ferramenta interativa do app: Quanto sobra depois de uma sequência de perdas totais

Escolha a fração do capital em cada posição e quantas posições seguidas vão a zero. É a matemática de uma regra, não uma sugestão de fração.

No vídeo, mostre a ideia da ferramenta com um ou dois exemplos numéricos — e diga que no app a pessoa pode mexer nos controles e ver o resultado mudar na hora.

#### Exemplo resolvido que o app mostra

1. 10% do capital em cada posição, e 5 posições seguidas vão a zero.
2. Depois da primeira, sobra 90%. Depois da segunda, 90% de 90%: 81%.
3. Depois da quinta: 0,9 × 0,9 × 0,9 × 0,9 × 0,9 ≈ 59%.
4. Para voltar ao começo: 1 ÷ 0,59 − 1 ≈ 69% de ganho sobre o que sobrou.
5. Agora suba a fração para 25% e compare.

*Premissa que a ferramenta assume:* Supõe que cada posição perdida vai a zero e que a fração é recalculada sobre o capital que sobrou. Não inclui taxas nem ganhos no meio da sequência.

