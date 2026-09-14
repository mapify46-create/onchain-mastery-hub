# Vídeo 39 de 46 — O contrato: SPL ou Token-2022, extensões, autoridades e o dev dump

**Módulo 6 — Ler a tela · Aba "O contrato" · Duração-alvo: 4 a 5 minutos (máximo 6)**

> Cole este documento inteiro no Gemini. Ele contém as instruções E o material-fonte.
> Gerado automaticamente a partir dos dados do app (`scripts/gerar-prompts-de-video.mjs`);
> se o texto do módulo mudar, gere de novo — o vídeo segue o texto, nunca o contrário.

## O papel deste vídeo no curso

O que o dono do token ainda pode fazer com você. Arco: qual programa manda no token → as extensões que mudam o jogo (taxa, delegado permanente, hook) → mint e freeze → metadata mutável → dev dump, o golpe que sobra no pump.fun. A armadilha do campo "Authority" do Solscan precisa de uma cena própria. Esquemas desenhados, não capturas.

**Conexões:** Assume o vídeo do Pilar técnico na prática. Alimenta o bloco técnico do Checklist.

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

- **24 de 24** — Tokens do pump.fun que são Token-2022. Checagem própria na blockchain, 12/09/2026. Todos só com as duas extensões de metadados.
- **100%** — Teto da taxa de transferência de um Token-2022. Mudar a taxa só vale duas epochs depois, cerca de 4 dias. Mas ela pode vir alta desde o início.
- **Tirar a liquidez** — O que o criador de um token do pump.fun não consegue fazer. A pool pós-graduação é do protocolo. O golpe que sobra é vender a própria compra.

## MATERIAL-FONTE (copiado do app — a base do vídeo; não vá além dele)

### SPL clássico ou Token-2022: o programa que manda no token

Programa, na Solana, é o código que administra o token. Existem dois para isso.

O pump.fun passou a criar tokens em Token-2022. Numa checagem na blockchain em 12/09/2026, 24 de 24 tokens do pump.fun eram Token-2022.

Todos tinham só duas extensões, as de metadados. Por isso, o alerta num token do pump.fun é aparecer qualquer extensão além dessas duas.

A LetsBonk e a LaunchLab da Raydium seguem criando SPL clássico.

### As extensões que mudam o jogo

Extensão é um recurso extra ligado no token na hora em que ele é criado.

A taxa de transferência é outra extensão. O teto dela é 100%.

Ela só pode ser configurada na criação do token. Um token criado sem ela não ganha taxa depois.

Quando existe, ela tem uma trava: mudar o valor só vale duas epochs depois, cerca de 4 dias. Epoch é um ciclo de tempo da rede Solana.

Mas a trava não protege de tudo. Uma taxa alta pode vir desde o lançamento.

### Tabela do app: as extensões, uma a uma

|  | O que faz | Risco para quem comprou | No pump.fun |
|---|---|---|---|
| **metadataPointer + tokenMetadata** | Guardam nome, símbolo e imagem dentro do próprio token. | Nenhum, se a autoridade de atualização estiver nula. | Padrão, com as autoridades nulas em 11 de 11 checados. |
| **transferFeeConfig** | Cobra uma taxa em cada transferência, inclusive na venda. | Pode chegar a 100%. Mudança só vale duas epochs depois. | Não aparece (0 de 24). |
| **permanentDelegate** | Dá a uma conta o poder de mover ou queimar tokens de qualquer carteira. | O dono pode tirar os tokens da sua carteira sem a sua assinatura. | Não aparece (0 de 24). |
| **transferHook** | Roda um programa do criador a cada transferência, que aprova ou recusa. | Pode bloquear a sua venda. | Não aparece (0 de 24). |


### Autoridades: o que o dono ainda pode fazer

Autoridade, na Solana, é uma permissão especial sobre o token. Duas importam mais para quem compra.

A freeze ativa é o "honeypot" da Solana: o token deixa comprar e pode não deixar vender. Não precisa de código esperto nenhum.

No pump.fun, as duas vêm revogadas (desligadas) em todo token. Isso é bom, mas não ajuda a escolher: se estão sempre desligadas, não separam um token do outro.

Fora do pump.fun, são a primeira coisa a olhar.

Cuidado no Solscan: um endereço no campo "Authority" pode ser só a autoridade de metadados. Veja abaixo.

### Metadata mutável

Metadados são o nome, o símbolo e a imagem do token.

Se a autoridade de metadados continua ativa, o dono pode trocá-los depois da sua compra. E o token passa a se parecer com outro.

Nos tokens do pump.fun checados, essa porta estava fechada. O risco mora nos tokens criados fora dele.

### Dev dump: o golpe que sobra no pump.fun

Depois da graduação, a pool do pump.fun pertence ao protocolo. O criador não consegue retirar a liquidez.

A trilha fica visível. A carteira que criou o token aparece como "Creator" no Solscan.

O histórico dessa carteira mostra quanto ela comprou e quando vendeu.

Um guia de ferramenta descreve o padrão: as carteiras do primeiro bloco vendendo nos primeiros 30 minutos. É descrição, sem medição.

### Fora da Solana: a taxa mora no código

Nessas redes, a taxa de venda e o bloqueio da venda ficam no próprio código do contrato.

A checagem que funciona é simular uma compra e uma venda antes de comprar de verdade. O honeypot.is faz isso de graça.

Mas a simulação é só um retrato do momento.

Num contrato atualizável, o dono pode trocar a lógica por trás. Aí ele pode mudar a taxa ou bloquear vendas depois que você comprou.

## Anatomia de tela (o que mostrar e apontar)

### O que olhar do contrato no explorador

Os campos do Solscan que respondem "o que o dono ainda pode fazer com você".

1. **Owner Program** — "Tokenkeg…" é SPL clássico; "Tokenz…" é Token-2022. Diz qual conjunto de regras vale para o token.
2. **Token Extensions** — Num token do pump.fun, só metadataPointer e tokenMetadata. Qualquer outra — taxa, delegado permanente, hook — é o alerta mais forte desta tela.
3. **Authority** — Um menu com três autoridades: mint, freeze e metadados. "N/A" quando todas foram revogadas. Endereço aqui não prova que o dono ainda emite.
4. **Creator** — A carteira que criou o token. Clique nela para ver o histórico: tokens anteriores, quanto comprou, quando vendeu.
5. **Metadata** — Nome, símbolo e imagem. "Mutable: true" (SPL clássico) ou update authority ativa (Token-2022) quer dizer que podem ser trocados.
6. **Holders** — A lista crua das maiores carteiras. Carteiras ligadas entre si não aparecem juntas aqui — para isso, Bubblemaps.

