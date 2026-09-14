# Vídeo 40 de 46 — Dá para prever um rug? O que o melhor detector acerta — e o chute que ganha dele

**Módulo 6 — Ler a tela · Aba "Prever o golpe" · Duração-alvo: 4 a 5 minutos (máximo 6)**

> Cole este documento inteiro no Gemini. Ele contém as instruções E o material-fonte.
> Gerado automaticamente a partir dos dados do app (`scripts/gerar-prompts-de-video.mjs`);
> se o texto do módulo mudar, gere de novo — o vídeo segue o texto, nunca o contrário.

## O papel deste vídeo no curso

Vídeo sobre como ler QUALQUER promessa de detecção. O número central: com 81,9% de rugs na amostra, chutar "tudo é rug" dá F1 de 0,90 e o melhor modelo publicado dá 0,79. Explicar taxa-base em linguagem de leigo, com contagem ("de cada 100 tokens…"). Fechar dizendo que o Checklist não aprova token nenhum: só reprova pelo que dá para ver.

**Conexões:** Fecha o Módulo 6. Justifica as etiquetas de força da evidência do Checklist.

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

- **81,9%** — Tokens que deram rug no teste do PumpFun. 43.835 de 53.546, no maior estudo de detecção na Solana (arXiv 2608.20271, preprint).
- **0,79** — F1 do melhor detector publicado. XGBoost, com os 5 primeiros minutos de negociação.
- **0,90** — F1 de chutar "tudo é rug". Melhor que o modelo nesse critério. Quando quase tudo é golpe, acurácia e F1 enganam.

## MATERIAL-FONTE (copiado do app — a base do vídeo; não vá além dele)

### O que conta como rug, para quem mede

Rug vem de "rug pull", puxar o tapete: o token desaba e quem comprou fica sem saída.

Não existe uma definição única. Cada estudo escolhe a sua régua, e o número muda com ela.

A Chainalysis usou outra régua. Contou 3,59% dos tokens de 2024 como suspeitos de pump-and-dump (inflar o preço e vender em cima de quem chega).

A Solidus Labs contou 98,6% dos tokens do pump.fun com a liquidez abaixo de US$ 1.000. Isso é colapso de liquidez, não fraude provada.

A pump.fun contestou publicamente o número da Solidus Labs.

### O melhor detector, em linguagem simples

O modelo que se saiu melhor se chama XGBoost. É um tipo de programa que aprende padrões a partir de exemplos.

Ele olha só os 5 primeiros minutos de negociação: quantidade de compras e vendas, carteiras únicas, valores e variação de preço.

Nenhuma das 23 características que ele usa é de holders, bundles, autoridades ou redes sociais.

A nota mais citada dele é o F1, que vai de 0 a 1. O problema: quase todo token do teste era rug, e aí até um chute burro tira nota alta.

Os próprios autores dizem que o resultado ainda não serve para uso real.

E o que o modelo aprende num lugar não vale no outro. Treinado na Raydium e testado no PumpFun, o MCC cai para perto de zero.

Os autores também reconhecem que o golpe muda com o tempo.

### O que a pesquisa diz sobre os sinais

Estudos independentes, em redes diferentes, concordam numa família de sinais: quem controla o token no minuto zero, e como disfarça isso.

No pump.fun, o que sobra é o criador vendendo e a concentração de insiders (gente de dentro, que entrou antes do público).

É justamente aí que a medição revisada por pares é mais fraca.

### Tabela do app: os sinais, pela força da evidência

|  | O que a pesquisa diz | No pump.fun |
|---|---|---|
| **Concentração real dos holders** | Medido: juntando carteiras ligadas, o top 10 sobe 24 pontos nos tokens de alto risco. | Vale, se você olhar os clusters e não só a lista. |
| **Bundles no lançamento** | Medido: entre os sinais mais preditivos de alto risco (MELT, preprint). | Vale; o que importa é quanto as carteiras ainda seguram. |
| **Volume artificial** | Medido: 82,9% dos tokens que subiram mais de 100% tinham sinais (Midsummer, USENIX Security 2026). | Vale, mas é o sinal mais contornado de propósito. |
| **LP travada** | Medido e desmentido: 97,3% dos tokens com trava eram maliciosos, contra 97,7% no geral. | Não se aplica: a pool pós-graduação é do protocolo. |
| **Mint e freeze authority** | Mecânica certa, sem medição como preditor de rug. | Vêm sempre revogadas: não diferenciam um token do outro. |
| **O criador vendeu** | Nenhum preditor revisado por pares isola esse sinal. | É o golpe que sobra lá — e o menos medido. |


### Como ler qualquer promessa de detecção

Um detector de rug vale tanto quanto duas coisas: a régua que define rug e a comparação com o chute mais burro possível.

Por isso o checklist deste hub não aprova token nenhum.

Ele reprova pelo que dá para ver, e separa cada item pela força da evidência.

## Itens NÃO VERIFICADOS — o vídeo precisa tratá-los como tal

Se o vídeo tocar em algum destes pontos, ele deve dizer explicitamente que não está confirmado em fonte oficial. Não "resolva" a dúvida por conta própria.

- **Qual autoridade é o endereço no "Authority" do BONK** — A documentação do Solscan diz que o campo junta mint, freeze e metadados. Com mint e freeze nulas na blockchain, o endereço deve ser a de metadados — mas o menu não foi aberto para confirmar.
- **Zeros compactados no Solscan e no RugCheck** — A notação foi confirmada no código do DexScreener. Nas outras duas ferramentas, não foi inspecionada.
- **Extensões perigosas fora do pump.fun** — O número ">40% dos novos tokens da Solana com delegado permanente" vem do RugCheck citado por terceiros, sem fonte primária. No pump.fun, deu 0 de 24.
- **Precisão e revocação do melhor detector** — O artigo publica F1, MCC e AUCPRC. Os 95% e 68% são reconstrução a partir das contagens do teste, não números publicados.
- **Custo de fabricar volume** — Soma a taxa oficial da pool com a taxa anunciada por um vendedor de volume (1%). Não é medição independente de campanha real, e não inclui slippage.
- **Dev dump como preditor** — Nenhum estudo revisado por pares isolou "o criador vendeu" como sinal de rug. O padrão dos 30 minutos vem de guia de ferramenta, sem medição.

