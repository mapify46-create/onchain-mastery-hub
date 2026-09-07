# Vídeo 26 de 33 — Antes de entrar: as checagens, o tamanho da posição e a curva de recuperação

**Módulo 4 — Gestão & decisão · Aba "Antes de entrar" · Duração-alvo: 4 a 5 minutos (máximo 6)**

> Cole este documento inteiro no Gemini. Ele contém as instruções E o material-fonte.
> Gerado automaticamente a partir dos dados do app (`scripts/gerar-prompts-de-video.mjs`);
> se o texto do módulo mudar, gere de novo — o vídeo segue o texto, nunca o contrário.

## O papel deste vídeo no curso

As seis checagens como lista de "não clique antes de". Depois, a aritmética que mais surpreende iniciante: quem perde 50% precisa de +100% para voltar. As duas calculadoras do app (tamanho e recuperação) viram exemplos numéricos na tela.

**Conexões:** Conecta com o vídeo 30 (taxas) — o tamanho da posição também é decidido pelo atrito.

**Resumo do módulo, para contexto:** Os módulos anteriores mostraram por que o preço se move e onde checar o que está por trás dele. Este módulo é sobre a única parte que depende só de você: decidir antes, por escrito, e cumprir o que decidiu — na entrada e, principalmente, na saída.

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

## Ganchos — os números para abrir o vídeo

São os três números do app para esta parte. Abra o vídeo com o mais surpreendente deles. Use SOMENTE estes números como gancho — não invente outros.

- **6** — Checagens antes da tese. LP, mint, freeze, concentração, bundles e liquidez de saída. A peneira do Módulo 3 aplicada à decisão.
- **1** — Respostas ruins que derrubam a operação. Qualquer uma delas. Por melhor que a narrativa esteja, o contrato precisa resistir primeiro.
- **Um bloco** — Duração de um hard rug. Com a liquidez livre, o criador remove a LP e o preço vira pó no mesmo bloco. Nenhuma outra checagem sobrevive a essa.

## MATERIAL-FONTE (copiado do app — a base do vídeo; não vá além dele)

### As checagens que vêm antes da tese

Tese e catálise só importam se o contrato por trás resistir a uma checagem. Estas seis perguntas são a peneira do Módulo 3 aplicada à decisão: qualquer resposta ruim aqui derruba a operação, por melhor que a narrativa esteja.

1. **A LP está bloqueada ou queimada?**
   - Por quê: Com a liquidez livre, o criador pode removê-la e o preço vira pó no mesmo bloco — o hard rug. Nenhuma outra checagem sobrevive a essa.
   - Onde olhar: RugCheck; e o explorer para ver quem detém os tokens de LP.
   - Alerta: LP livre, ou lock com vencimento próximo.
2. **A mint authority foi revogada?**
   - Por quê: Mint authority ativa significa que ainda dá para criar tokens novos, diluindo quem já comprou sem aviso nenhum.
   - Onde olhar: RugCheck ou a página do token no Solscan.
   - Alerta: Authority ativa numa carteira ligada ao criador.
3. **A freeze authority foi revogada?**
   - Por quê: Freeze authority ativa permite congelar contas do token: você compra e pode não conseguir vender. É o sinal clássico de possível honeypot. Nota técnica verificada: na Solana, DEXs como a Raydium exigem freeze authority revogada para criar o pool.
   - Onde olhar: RugCheck ou Solscan.
   - Alerta: Authority ativa — trate como token potencialmente sem saída.
4. **Como está a concentração dos maiores holders?**
   - Por quê: Se poucas carteiras detêm a maior parte do supply, o seu resultado depende da decisão de um punhado de pessoas — que podem ser a mesma pessoa.
   - Onde olhar: Solscan/BscScan para a lista; Bubblemaps para ver clusters ligados.
   - Alerta: Top 10 com fatia grande, especialmente em carteiras conectadas entre si.
5. **Houve bundles no lançamento?**
   - Por quê: Várias compras no mesmo bloco costumam ser o próprio dev e insiders montando posição antes de todo mundo, com o preço mais baixo que existirá.
   - Onde olhar: RugCheck e ferramentas de análise on-chain; explorer para as primeiras transações.
   - Alerta: Percentual alto do supply comprado no bloco do lançamento.
6. **A liquidez aguenta a sua saída?**
   - Por quê: Market cap alto com liquidez fina quer dizer que o preço na tela não é o preço que você consegue realizar. Compare o tamanho da sua posição com o pool.
   - Onde olhar: DexScreener: liquidez do par, volume e profundidade.
   - Alerta: Posição grande demais para o pool — você derruba o preço ao vender.

### Ferramenta interativa do app: Quanto da carteira pode ir numa posição

A conta que liga o risco que você aceita ao ponto de invalidação que você escreveu. Quanto mais longe a invalidação, menor a posição — é aritmética, não opinião.

No vídeo, mostre a ideia da ferramenta com um ou dois exemplos numéricos — e diga que no app a pessoa pode mexer nos controles e ver o resultado mudar na hora.

*Premissa que a ferramenta assume:* Fórmula: tamanho = risco ÷ invalidação. A conta não diz quanto risco aceitar — isso é decisão sua e depende da sua vida, não do mercado. Ela diz só o que a sua própria regra implica. Em memecoin, invalidação em 100% ("pode ir a zero") é um cenário realista.

### Ferramenta interativa do app: O que uma perda exige de volta

Perder e recuperar não são simétricos. Arraste a perda e veja o ganho que seria necessário só para voltar ao ponto de partida.

No vídeo, mostre a ideia da ferramenta com um ou dois exemplos numéricos — e diga que no app a pessoa pode mexer nos controles e ver o resultado mudar na hora.

*Premissa que a ferramenta assume:* Fórmula: ganho necessário = 1 ÷ (1 − perda) − 1. É por isso que o ponto de invalidação existe: uma perda pequena e planejada custa pouco para recuperar; um rombo custa um múltiplo — e é o rombo que o custo afundado produz.

