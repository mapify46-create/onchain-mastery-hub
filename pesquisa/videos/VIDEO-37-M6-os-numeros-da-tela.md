# Vídeo 37 de 46 — Market cap, liquidez e o PnL que não chega na carteira

**Módulo 6 — Ler a tela · Aba "Os números" · Duração-alvo: 4 a 5 minutos (máximo 6)**

> Cole este documento inteiro no Gemini. Ele contém as instruções E o material-fonte.
> Gerado automaticamente a partir dos dados do app (`scripts/gerar-prompts-de-video.mjs`);
> se o texto do módulo mudar, gere de novo — o vídeo segue o texto, nunca o contrário.

## O papel deste vídeo no curso

O número que mais engana é o PnL não realizado. Arco: market cap não é dinheiro → a liquidez é o limite de saída → derrubar o preço pela metade devolve só 14,6% da liquidez → a calculadora com o exemplo resolvido → os zeros compactados ($0.0₅2786). Um exemplo numérico por tela, só com os números do app.

**Conexões:** Assume o vídeo 30 (taxas) e o 31 (impacto de preço). Prepara o vídeo sobre volume falso.

**Resumo do módulo, para contexto:** Os números de um terminal parecem medir o token. Medem outra coisa — e alguns são fabricados de propósito. Este módulo mostra o que cada número é de verdade, como o volume é inventado, que armadilhas moram no contrato, e o que a pesquisa consegue e não consegue prever sobre um golpe.

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

- **14,6%** — Liquidez que você tira derrubando o preço pela metade. Da liquidez anunciada, numa pool de produto constante. Não depende do tamanho da pool.
- **Diluído** — O que o "Market Cap" do Solscan mede. A documentação dele define o campo como totalmente diluído — o que o DexScreener chama de FDV.
- **~19 mil ×** — Quanto um preço compactado engana, lido como texto. $0.0₅2786 vira "$0.052786" quando copiado. O 5 pequeno é a quantidade de zeros.

## MATERIAL-FONTE (copiado do app — a base do vídeo; não vá além dele)

### Market cap, FDV e liquidez: três números, três perguntas

Na tela de qualquer memecoin aparecem três números grandes. Eles parecem medir a mesma coisa, mas cada um responde a uma pergunta diferente.

Por que o market cap engana: ele supõe que todo mundo conseguiria vender pelo último preço. Esse preço foi feito por uma negociação pequena. Se muita gente vender junto, o preço despenca muito antes.

Regra prática: olhe primeiro a liquidez. Market cap de milhões com liquidez de milhares é número de vitrine.

### Quanto dá para vender antes de derrubar o preço

A liquidez anunciada não é o quanto você consegue tirar. Cada venda empurra o preço para baixo, e a parte seguinte da venda sai mais barata.

Por isso a pergunta útil não é "quanto de liquidez tem?". É "quanto eu tiro antes de o preço cair X%?".

A conta tem uma surpresa: a resposta, em porcentagem, não depende do tamanho da pool.

Por isso market cap de milhões com liquidez de milhares é número de fantasia. A liquidez limita quanto qualquer pessoa consegue sair.

E a sua própria venda também entra nesse limite.

### Tabela do app: quanto sai, por queda de preço

|  | Tokens da reserva que você vende | O que você recebe |
|---|---|---|
| **Derrubar o preço em 10%** | ≈ 5,41% dos tokens da reserva | ≈ 2,57% da liquidez anunciada |
| **Derrubar o preço em 30%** | ≈ 19,52% dos tokens da reserva | ≈ 8,17% da liquidez anunciada |
| **Derrubar o preço pela metade** | ≈ 41,42% dos tokens da reserva | ≈ 14,64% da liquidez anunciada |

- *Derrubar o preço em 10%* — Conta: vende = 1 ÷ √(1 − queda) − 1; recebe = (1 − √(1 − queda)) ÷ 2, em fração da liquidez anunciada. Sem taxas. A fração não depende do tamanho da pool.

### Ferramenta interativa do app: Quanto do seu PnL chega na carteira

Arraste o valor da sua posição na tela e a liquidez anunciada da pool, e veja quanto você recebe vendendo tudo — e quanto a sua venda derruba o preço.

No vídeo, mostre a ideia da ferramenta com um ou dois exemplos numéricos — e diga que no app a pessoa pode mexer nos controles e ver o resultado mudar na hora.

#### Exemplo resolvido que o app mostra

1. Posição de US$ 1.000 na tela, numa pool com US$ 20.000 de liquidez anunciada.
2. O lado da pool que paga a sua venda é metade disso: US$ 10.000.
3. Você recebe 1.000 × 10.000 ÷ (10.000 + 1.000) ≈ US$ 909.
4. O preço fica multiplicado por (10.000 ÷ 11.000)² ≈ 0,83 — cai cerca de 17%.
5. Agora arraste a liquidez para baixo e veja quanto do número verde some.

*Premissa que a ferramenta assume:* Modelo de produto constante (x · y = k). A liquidez anunciada soma os dois lados da pool, então só metade dela é o lado que paga a sua venda. Não inclui taxas (de 0,25% a 1,25%, conforme a pool) nem outras pessoas vendendo ao mesmo tempo — as duas coisas pioram o resultado.

### Zeros compactados: o preço que se lê errado

Preços minúsculos têm zeros demais para caber na tela. Por isso aparecem com os zeros compactados.

O erro acontece quando o número vira texto: copiado para uma planilha, lido às pressas ou lido por um leitor de tela (programa que lê a tela em voz alta).

### PnL: o lucro que a tela mostra

PnL quer dizer lucro ou prejuízo (do inglês "profit and loss"). A tela mostra dois tipos.

O não realizado não desconta o impacto da sua própria venda.

E a documentação dos terminais consultados não diz que ele desconta as taxas.

Em memecoin de pouca liquidez, o número verde quase nunca é o que chega na carteira. A calculadora acima mostra quanto chega.

## Anatomia de tela (o que mostrar e apontar)

### Os números do topo de um par

O que cada número mede — e o que ele não mede. Clique num item da legenda para localizar.

1. **Preço** — Pode vir com zeros compactados. Conte os zeros antes de comparar ou copiar.
2. **Market cap e FDV** — Preço vezes supply. Não é dinheiro que exista em lugar nenhum. Em token do pump.fun, os dois costumam coincidir.
3. **Liquidez** — A soma dos dois lados da pool. É o limite real de quanto dá para sair — e você não tira nem ela inteira.
4. **Volume, transações e makers** — O número mais fácil de fabricar desta tela. Veja a aba Volume falso.
5. **PnL não realizado** — Preço de agora vezes os seus tokens. Não desconta o impacto da sua venda.

