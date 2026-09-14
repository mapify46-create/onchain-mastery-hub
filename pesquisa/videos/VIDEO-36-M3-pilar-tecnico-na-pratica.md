# Vídeo 36 de 46 — Pilar técnico na prática: RugCheck, Solscan, Bubblemaps e DexScreener, uma pergunta cada

**Módulo 3 — Os dois pilares (social × técnico) · Aba "Pilar técnico na prática" · Duração-alvo: 4 a 5 minutos (máximo 6)**

> Cole este documento inteiro no Gemini. Ele contém as instruções E o material-fonte.
> Gerado automaticamente a partir dos dados do app (`scripts/gerar-prompts-de-video.mjs`);
> se o texto do módulo mudar, gere de novo — o vídeo segue o texto, nunca o contrário.

## O papel deste vídeo no curso

Vídeo PROCEDIMENTAL, uma ferramenta por segmento, na ordem do app. Para cada uma: a pergunta que ela responde, o passo a passo e as armadilhas de leitura. Telas como ESQUEMA desenhado (a anatomia do app), não captura. As duas armadilhas que precisam aparecer: "GOOD" no RugCheck não aprova token, e o "Authority" do Solscan com endereço não prova que o dono ainda emite. Nenhuma ferramenta é recomendação.

**Conexões:** Detalha o vídeo 22. Continua no Módulo 6 (o que cada número da tela significa) e é a segunda parte do Checklist.

**Resumo do módulo, para contexto:** Nenhuma decisão de entrada deveria depender de um sinal só. O pilar social mostra onde a atenção está nascendo; o pilar técnico mostra se o contrato por trás merece confiança. Este módulo mostra como fazer cada checagem, passo a passo, e apresenta as ferramentas de cada pilar numa matriz filtrável.

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

- **4** — Ferramentas, uma pergunta cada. RugCheck: que riscos aparecem. Solscan: o que o dono ainda pode fazer. Bubblemaps: quem está ligado a quem. DexScreener: quanto dinheiro há na pool.
- **US$ 279 mil × 1,69 mi** — Liquidez do BONK, no mesmo dia, em dois sites. O DexScreener mostrou um par; o Solscan somou vários pools. O mesmo nome de campo mede coisas diferentes.
- **250** — Maiores holders no mapa grátis do Bubblemaps. O mapa com os 1.000 maiores, o cálculo de lucro e a IA exigem o token BMT.

## MATERIAL-FONTE (copiado do app — a base do vídeo; não vá além dele)

Quatro ferramentas grátis, cada uma respondendo uma pergunta. A ordem importa: primeiro o que o contrato permite, depois quem controla as carteiras, por fim quanto dinheiro há na pool. O exemplo é o BONK, conferido ao vivo em 12/09/2026. Nenhuma delas pede carteira conectada para ler.

### RugCheck (rugcheck.xyz) — Que riscos o contrato e as carteiras mostram?

**O que é grátis:** A página do token é grátis, sem cadastro. Só votar em "trending" pede carteira conectada — não conecte.

### Anatomia de tela: A página de um token no RugCheck

Mockup desenhado. Clique num item da legenda para localizar.

1. **Score** — Good, Warning ou Danger. Número maior é risco maior. A fórmula, os pesos e os limiares não são publicados.
2. **Risks** — Cada risco que disparou, com nome, descrição e nível. O próprio RugCheck manda ler o score junto com esta lista.
3. **Markets** — Os pares do token nas DEXs, com a liquidez de cada um.
4. **Insiders** — Redes de contas que só fazem sentido econômico se forem da mesma pessoa ou grupo. Sugere, não prova.
5. **Holders** — A distribuição das maiores carteiras. Concentração alta aparece como risco.
6. **Lockers & LP** — Quanto da liquidez está travada ou queimada. Não separa golpe de não golpe (Módulo 6).

*Nota:* Ao vivo, BONK em 12/09/2026: Score "GOOD", 1 risco, Markets US$ 358 mil, Insiders "2 networks", Holders 2,1 milhões, Lockers & LP US$ 54 mil · 21%.

#### Passo a passo

1. Abra rugcheck.xyz e cole o endereço do contrato. Nunca busque pelo nome.
2. Leia o Score junto com a lista de Risks, nunca sozinho.
3. Abra cada item de Risks: o nível diz o peso, a descrição diz o porquê.
4. Olhe Insiders. Num lançamento recente e limpo, o esperado é zero redes de transferência. Redes de negociação entre si preocupam quando são a maioria das contas negociando.
5. Clique nas contas de uma rede: o RugCheck leva ao explorador para você conferir.

#### Armadilhas de leitura

- "GOOD" não aprova token. O score é um retrato do momento, muda com o mercado, e não se sabe como é calculado.
- Token popular pode ter redes pequenas de insiders sem ser golpe — o BONK mostrou 2. O próprio RugCheck diz que isso é normal.

### Solscan (solscan.io) — O que o dono ainda pode fazer, e quem criou o token?

**O que é grátis:** Consulta sem login. O preço só aparece se o token estiver listado na CoinGecko.

### Anatomia de tela: A página de um token no Solscan

Mockup desenhado. Clique num item da legenda para localizar.

1. **Market Cap** — Aqui é totalmente diluído — o que o DexScreener chama de FDV.
2. **Holders** — Quantas carteiras têm o token. Não diz quantas são da mesma pessoa.
3. **Authority** — Um menu com as autoridades de metadados, mint e freeze. "N/A" quando todas foram revogadas. Um endereço aqui não prova que o dono ainda emite tokens.
4. **Creator** — A carteira que criou o token, com a transação. Clique para ver o histórico dela.
5. **Owner Program e Token Extensions** — "Tokenkeg…" é SPL clássico, "Tokenz…" é Token-2022. Extensões além das de metadados são o alerta mais forte (Módulo 6).
6. **Abas** — Holders lista as maiores carteiras; Metadata mostra se nome e imagem podem mudar; Markets, os pares.
7. **Transfers** — Vem do mais recente para o mais antigo. Troque para "Oldest First" para ver quem comprou primeiro e se o criador já vendeu.

*Nota:* Ao vivo, BONK em 12/09/2026: Holders 1.014.349, "Token Extensions: FALSE", "Owner Program: Token Program TokenkegQ…" — é SPL clássico.

#### Passo a passo

1. Cole o endereço na busca do solscan.io e confira que nome e endereço batem com o que você validou.
2. Owner Program: diz qual programa manda no token. Todo token do pump.fun hoje é Token-2022.
3. Token Extensions: num token do pump.fun, só metadataPointer e tokenMetadata. Qualquer outra, pare.
4. Authority: abra o menu e veja quais autoridades aparecem. Para confirmar mint e freeze, o RugCheck também mostra.
5. Creator: clique na carteira e veja o histórico — outros tokens criados, e se vendeu.
6. Aba Transfers em "Oldest First": as primeiras compras. O Solscan não tem um campo "quanto o criador comprou"; a resposta está nessas linhas.

#### Armadilhas de leitura

- No BONK, "Authority" mostra um endereço — o mesmo do Creator —, mas mint e freeze estão nulas na blockchain. O endereço é a autoridade de metadados.
- O "Liquidity" do Solscan soma vários pools. Não compare com o de outro site.

### Bubblemaps (bubblemaps.io) — As maiores carteiras estão ligadas entre si?

**O que é grátis:** Grátis, com Magic Nodes, Time Travel e dados em tempo real. O token BMT libera o mapa com 1.000 holders, lucro e prejuízo, análise entre redes e IA.

### Anatomia de tela: O mapa de bolhas do Bubblemaps

Mockup desenhado. Clique num item da legenda para localizar.

1. **Bolhas e linhas** — Cada bolha é um holder; o tamanho é quanto ele tem. Uma linha é uma transferência na blockchain entre os dois. Bolhas ligadas formam um cluster.
2. **Detalhe** — Clicando numa bolha: % do supply, quantidade e valor. Se ela está num cluster, aparece a soma do cluster — é a concentração real.
3. **Magic Nodes** — Mostra ligações por intermediários: várias carteiras abastecidas pelo mesmo endereço, ou mandando para o mesmo depósito.
4. **Contratos e exchanges** — Ficam escondidos por padrão, para o mapa mostrar holders comuns. O botão de olho revela.
5. **Hora do cálculo** — O mapa é atualizado dentro de 6 horas. Num token de poucas horas de vida, isso é muito tempo.

*Nota:* Nomes dos recursos segundo a wiki oficial do Bubblemaps, consultada em setembro de 2026.

#### Passo a passo

1. Abra bubblemaps.io e busque pelo endereço do contrato.
2. Olhe se há clusters grandes entre as maiores bolhas.
3. Clique no cluster e leia a % do supply somada — a lista crua de holders do Solscan esconde isso.
4. Ative Magic Nodes para ver ligações por intermediários.
5. Confira a hora do último cálculo antes de concluir qualquer coisa.

#### Armadilhas de leitura

- Cluster levanta a pergunta "por quê?", não a resposta. Empresa pagando equipe, fundo recebendo tokens ou alguém escondendo o rastro geram o mesmo desenho.
- Carteiras de altíssima atividade, como exchanges e roteadores, criam ligações que são ruído. Bolha grande de exchange não é baleia insider.

### DexScreener (dexscreener.com) — Quanto dinheiro há na pool, e como estão negociando?

**O que é grátis:** Tudo o que se lê é grátis. O que é pago é do lado do projeto: "Enhanced Token Info" (a partir de US$ 299) e Boosts para aparecer em alta.

### Anatomia de tela: A página de um par no DexScreener

Mockup desenhado. Clique num item da legenda para localizar.

1. **Gráfico** — O preço do par escolhido. Um token pode ter vários pares; confira que é o do endereço certo.
2. **Price USD** — Pode vir com zeros compactados. Passe o mouse para ver o valor inteiro.
3. **Liquidity, FDV e Mkt Cap** — Liquidez é a pool deste par. FDV é o supply total menos o queimado, vezes o preço. Compare a liquidez com o market cap (calculadora do Módulo 6).
4. **Txns, Volume e Makers** — Por janela: 5 minutos, 1 hora, 6 horas, 24 horas. É o número mais fácil de fabricar da tela. "Traders", "Buyers" e "Sellers" não têm definição oficial.
5. **Info e socials** — Preenchidos e pagos pelo próprio projeto. Não provam que o token é o oficial.
6. **Audit** — Não é definida na documentação, que também não diz de onde vêm os dados. A própria tela avisa: "Audits may not be 100% accurate!".

*Nota:* Ao vivo, BONK em 12/09/2026: Liquidity US$ 279 mil (um par, na Orca), FDV US$ 247,5 milhões, Mkt Cap US$ 245,1 milhões.

#### Passo a passo

1. Busque pelo endereço do contrato e escolha o par com a liquidez principal.
2. Leia Liquidity antes de qualquer outro número.
3. Compare Liquidity com Mkt Cap: é o tamanho da porta de saída perto do tamanho do prédio.
4. Troque as janelas de Txns e Volume (5m, 1h, 24h) e veja se as negociações acompanham o volume.
5. Para mint, freeze, holders e insiders, volte ao RugCheck e ao Solscan — a Audit daqui não substitui.

#### Armadilhas de leitura

- Aparecer em alta pode ser comprado: os Boosts turbinam o trending por 12 a 24 horas.
- Ícone bonito, site e redes sociais na página não dizem nada sobre legitimidade.

### Tabela do app: o que eu quero checar → onde eu checo

|  | Onde checar | Campo |
|---|---|---|
| **Programa e extensões** | Solscan | Owner Program, Token Extensions |
| **Mint e freeze authority** | Solscan e RugCheck | Authority (menu); Risks |
| **Nome e imagem podem mudar?** | Solscan | Aba Metadata |
| **Quem criou, e se já vendeu** | Solscan | Creator + aba Transfers em "Oldest First" |
| **Concentração real** | Bubblemaps e RugCheck | Clusters e Magic Nodes; Insiders |
| **Compra coordenada no lançamento** | trench.bot (só pump.fun) | Current held % |
| **Liquidez do par** | DexScreener | Liquidity |
| **FDV e market cap** | DexScreener | FDV, Mkt Cap |
| **Volume e negociações** | DexScreener | Txns, Volume, Makers |


