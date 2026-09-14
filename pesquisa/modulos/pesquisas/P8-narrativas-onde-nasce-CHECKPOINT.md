# Checkpoint: existe estudo que mediu em qual plataforma a atenção sobre um token/memecoin aparece PRIMEIRO?

## Resposta direta
**PARCIALMENTE — e, para o que você pediu exatamente, NÃO VERIFICADO / não encontrado.** Não foi encontrado nenhum estudo (revisado por pares ou preprint) que meça diretamente a ORDEM ou a defasagem temporal (lead-lag, isto é, qual série de dados se move antes da outra) da atenção sobre um token/tema de cripto ENTRE DUAS PLATAFORMAS SOCIAIS — por exemplo, aparecer primeiro no Telegram e só depois no X/Twitter, com X minutos de diferença. "Parcialmente" significa: existem estudos sólidos que medem coisas VIZINHAS — (a) uma plataforma contra o PREÇO; (b) mídia social contra a CRIAÇÃO on-chain do token no pump.fun; (c) difusão de convites/links entre plataformas sem cronometrar quem vem primeiro — mas nenhum responde "qual rede social vem antes da outra".

## TL;DR (3 pontos)
- A pergunta exata (rede social A vs. rede social B, com defasagem em minutos/horas, para cripto/memecoin) é uma LACUNA de pesquisa: NÃO ENCONTRADO em busca feita hoje (13/09/2026).
- O que existe e é confiável mede outra coisa: mídia social → criação do token on-chain no pump.fun; Telegram → preço; Twitter → preço; e difusão de convites entre Twitter/Telegram/Discord (estrutura, não cronômetro).
- A crença de mercado ("aparece antes nos grupos de call/Telegram e só depois no X") só aparece em blogs e threads, sem medição rigorosa — é fonte fraca, não estudo.

## Principais achados
- Nenhum artigo mede plataforma social vs. plataforma social para cripto com defasagem em minutos/horas: **NÃO VERIFICADO / não encontrado**.
- O estudo mais próximo que envolve timing "social vs. algo" em cripto mede mídia social → criação on-chain do token (pump.fun), não rede vs. rede.
- O estudo acadêmico mais próximo do conceito "uma plataforma lidera outra" é sobre AÇÕES meme (GameStop/AMC), em frequência diária — não é cripto e não é em minutos.
- Vários estudos medem atenção de UMA plataforma vs. PREÇO (Twitter→preço, Telegram→preço, Reddit→preço), o que é diferente do que você perguntou.

## Detalhes por estudo

### Estudos mais próximos, e por que NÃO respondem

**1. "Meme Coin Factories: Uncovering Large-Scale Manipulations on pump.fun"**
- Autores/ano/veículo: Szwajcok, Tsuchiya, Liu, Soska, Payer, Christin — preprint arXiv (09/09/2026), aceito no ACM CCS'26. Link: https://arxiv.org/html/2609.10246v1 (página aberta).
- O que mede (linguagem simples): pega milhões de tokens criados no pump.fun e cruza o horário de criação do token na blockchain (Solana) com posts em redes sociais ligados nos metadados do token. Mede o intervalo POST → CRIAÇÃO DO TOKEN.
- Números copiados da página: rastreia "all 15.2 million pump.fun coins on the Solana blockchain" no período de 14/jan/2024 a 14/jan/2026; "3.5 million (23.5% of all) coins are created after Twitter or Truth Social posts. Among these, we observe that 31 posts each helped their respective coin creators earn at least 1 million USD"; contexto de escala do launchpad: "attracting over 15 million new coins and totaling nearly 90 billion USD in trading volume".
- Por que NÃO responde: mede plataforma social → blockchain (criação do token), não plataforma social A → plataforma social B. Casos com defasagem específica (ex.: "4 minutos" de um post de notícia até a criação da moeda) aparecem como EXEMPLOS de caso, não como estatística de precedência entre plataformas.

**2. "Don't You Know, Pump it Up! Investigating Cryptocurrency Manipulation in Telegram-Driven Activity"**
- Autores/ano/veículo: Moura, Paoletti, Ferreira, Almeida — preprint arXiv (01/09/2026), submetido à ICWSM 2027. Link: https://arxiv.org/abs/2609.01176 ; resumo em https://pith.science/paper/2609.01176 (só snippet).
- O que mede: UMA plataforma (Telegram) contra o PREÇO/mercado. Escopo: 14.499 canais públicos, mais de 20 milhões de mensagens, mais de 17.000 criptos, ao longo de 1 ano.
- Números copiados do abstract oficial: identifica "47 events consistent with potential pump-and-dump activity and 73 sustained market reactions"; os sinais manipulativos "are characterized by extreme temporal synchronization and precede price movements by seconds"; "we estimate the cumulative financial volume of detected pump-and-dump events to exceed $200 million".
- Ressalva importante: números granulares que circulam em páginas-resumo (por ex. "a mensagem mediana precede o pico em ~4,3 min e o segue em ~14,5 min", ganho ~9,98% / queda ~14,84%) NÃO constam do abstract original e NÃO devem ser citados como literais sem conferir o PDF. **NÃO VERIFICADO.**
- Por que NÃO responde: é Telegram vs. PREÇO, não Telegram vs. outra rede social.

**3. "The Role of Twitter in Cryptocurrency Pump-and-Dumps" / "Twitter and cryptocurrency pump-and-dumps"**
- Autores/ano/veículo: David Ardia, Keven Bluteau — preprint arXiv 2306.02148 (2023); versão publicada em International Review of Financial Analysis (2024), ScienceDirect S1057521924004113. Link: https://arxiv.org/pdf/2306.02148v1 (página aberta).
- O que mede: usa o timestamp EXATO do anúncio no Telegram como marco zero (t=0) e mede a atividade do Twitter (tweets anormais) e o preço/volume em torno desse marco. 1.160 eventos de pump-and-dump; 322 classificados como "bem-sucedidos"; preço/volume por minuto (Binance).
- Números copiados da página: em média 187,81 tweets por evento (mediana 15); em canais VIP, o nome da moeda é liberado "12-24 hours before the pump signal release"; a reversão do preço só ocorre "at least 30 minutes after the dump phase".
- Por que NÃO responde: o Telegram entra apenas como RELÓGIO de referência (marco zero); o estudo compara Twitter vs. preço em torno do anúncio do Telegram. Não mede se o assunto surgiu antes no Telegram ou no Twitter como medida de ordem entre plataformas.

**4. "Charting the Landscape of Online Cryptocurrency Manipulation" (Nizzoli et al.)**
- Autores/ano/veículo: Nizzoli, Tardelli, Avvenuti, Cresci, Tesconi, Ferrara — IEEE Access, 2020. Link: https://arxiv.org/abs/2001.10289 ; https://ieeexplore.ieee.org/document/9120022/ (só snippet).
- O que mede: ecossistema multi-plataforma (Twitter + Telegram + Discord): "more than 50M messages published by almost 7M users on Twitter, Telegram and Discord, over three months"; segue invite-links de uma plataforma para outra (rede de convites).
- Números copiados da página: "more than 56%" das contas do Twitter que compartilhavam invite-links eram bots ou suspensas; "93% of the invite links shared by Twitter bots point to Telegram pump-and-dump channels"; entre os dois messengers, "68.5% of the retrieved channels, 81.3% of distinct users and 69.7% of messages belong to Telegram"; no Telegram, "296 channels involved in pump-and-dump and 432 involved in Ponzi schemes".
- Por que NÃO responde: mapeia a ESTRUTURA de difusão de convites entre plataformas, mas não cronometra qual plataforma menciona um token PRIMEIRO nem mede defasagem em minutos/horas.

**5. Estudos de lead-lag entre atenção de UMA plataforma e PREÇO (não plataforma vs. plataforma)**
- "Exploring Relationships Between Cryptocurrency News Outlets and Influencers' Twitter Activity and Market Prices" (Alizadeh et al., arXiv 2411.05577, 2024, página aberta): para as 3 maiores criptos, o sinal de trading detectado por LLM em tweets "granger-causes fluctuations in their market prices, exhibiting a lag of at least 6 hours". Só Twitter vs. preço.
- "What affects the price movements in Bitcoin and Ethereum?" (Sabalionis, Wang, Park, The Manchester School, 2020, DOI 10.1111/manc.12352, só snippet): "price has one-way mean spillover effects on tweet, not vice versa"; endereços ativos on-chain são a variável mais influente. Só Twitter/Google/on-chain vs. preço.
- "From HODL to MOON" (arXiv 2312.08394, só snippet): para o Bitcoin, "the number of posts tends to lead changes in the Bitcoin price by 11 days". Só Reddit vs. preço.
- Estudos de transfer entropy (fluxo de informação Twitter/Google Trends → retornos). Só atenção vs. preço.
- Por que NÃO respondem: todos medem atenção de UMA plataforma contra o PREÇO, não plataforma vs. plataforma.

**6. Analogia mais próxima (fora de cripto): "uma plataforma lidera outra" em ações meme**
- Cahill, Liu & Smales (2024), "Investigating proxies for retail investor attention in financial markets", Accounting & Finance, DOI 10.1111/acfi.13338 (só snippet). Usando VAR (vetor autorregressivo), encontram que "Twitter attention leads other retail attention proxies" (artigos de mídia e posts do WallStreetBets), em frequência diária, para ações meme (GameStop, AMC).
- Por que NÃO responde à sua pergunta: é mercado de AÇÕES (meme stocks), não cripto/memecoin, e em frequência diária, não em minutos. Serve apenas como referência de método e como indício de que o caso cripto plataforma-vs-plataforma em alta frequência permanece inexplorado.

### Fontes fracas (blogs/threads — NÃO usar como fato)
Guias e posts afirmam anedoticamente uma ordem — por exemplo, que uma moeda "started appearing in smaller Telegram groups, then crypto influencers began to pick it up, and finally, it exploded across Twitter" (Medium, fonte fraca), ou que no Telegram "signals appear seconds before they're reposted on Twitter" (blog de agência, fonte fraca). Nenhum traz medição rigorosa nem dado reproduzível; são apenas corroboração fraca da hipótese de campo.

## NÃO VERIFICADOS
- Existência de QUALQUER estudo acadêmico que meça ordem/defasagem entre DUAS plataformas sociais (X, Telegram, Discord, TikTok, YouTube, Reddit) para cripto/memecoin: NÃO ENCONTRADO.
- Números granulares de precedência do preprint Telegram (2609.01176), como ~4,3 min / ~14,5 min / ~9,98% / ~14,84%: aparecem em página-resumo, mas NÃO no abstract original — NÃO citar como literais sem conferir o PDF.
- Qualquer defasagem medida entre TikTok/YouTube e X/Telegram para memecoins: NÃO ENCONTRADO.
- Feed de lançamentos de launchpad (pump.fun) vs. mídia social como medida de ordem ENTRE plataformas sociais: só existe mídia social → criação on-chain (item 1), não social vs. social.

## Recomendações
1. No módulo do curso, escreva de forma honesta: "Não há estudo publicado que meça qual plataforma social vem primeiro para um token/narrativa de cripto. O que a ciência mede hoje é: (a) mídia social vs. criação on-chain do token; (b) atenção de uma plataforma vs. preço; (c) difusão de convites entre plataformas." Isso é uma resposta boa e defensável.
2. Se quiser ancorar em número concreto de artigo, use os dois mais sólidos, sempre deixando claro que NÃO são rede-vs-rede: o pump.fun ("23,5% das moedas criadas após posts no Twitter/Truth Social") e o Telegram vs. preço (sinais "precede price movements by seconds"; volume acima de US$ 200 milhões).
3. Trate a sequência "grupos de call/Telegram primeiro → X depois" como hipótese de campo NÃO medida academicamente. Se for ensinar isso, rotule explicitamente como observação prática/anedótica, não como achado de estudo.
4. Gatilho para mudar a recomendação: se surgir um estudo que (i) alinhe timestamps de duas plataformas sociais e (ii) reporte defasagem em minutos/horas para os mesmos tokens, ele passa a ser a fonte primária — reabra a busca por termos como "cross-platform lead-lag cryptocurrency attention" e "temporal precedence social media platforms crypto".

## Fontes (consulta: 13/09/2026)
- arXiv 2609.10246 (Meme Coin Factories, pump.fun) — https://arxiv.org/html/2609.10246v1 — (página aberta)
- arXiv 2609.01176 (Telegram-Driven Activity) — https://arxiv.org/abs/2609.01176 ; https://pith.science/paper/2609.01176 — (só snippet)
- arXiv 2306.02148 / ScienceDirect S1057521924004113 (Ardia & Bluteau) — https://arxiv.org/pdf/2306.02148v1 — (página aberta)
- IEEE Access 2020 (Nizzoli et al.) — https://arxiv.org/abs/2001.10289 — (só snippet)
- arXiv 2411.05577 (Alizadeh et al.) — https://arxiv.org/pdf/2411.05577 — (página aberta)
- The Manchester School 2020 (Sabalionis et al.) — https://onlinelibrary.wiley.com/ai/10.1111/manc.12352 — (só snippet)
- arXiv 2312.08394 (From HODL to MOON) — https://arxiv.org/pdf/2312.08394 — (só snippet)
- Accounting & Finance 2024 (Cahill, Liu & Smales) — DOI 10.1111/acfi.13338 — (só snippet)

## Consultas (queries) realizadas
1. (Scholar Gateway) atenção cripto/memecoin aparece primeiro Telegram ou Twitter — lead-lag cross-platform
2. cryptocurrency attention lead-lag Twitter Telegram
3. cross-platform information diffusion cryptocurrency memecoin
4. pump and dump Telegram Discord Twitter timing lead time minutes
5. Reddit Twitter cryptocurrency Granger causality attention diffusion order
6. memecoin social media attention which platform first Solana pump.fun
7. "Twitter and cryptocurrency pump-and-dumps" tweets before after Telegram announcement minutes
8. cross-platform lead-lag information diffusion Twitter Reddit hours which leads
9. memecoin narrative attention Twitter Telegram temporal precedence study
10. meme coin ecosystem market manipulation Twitter Telegram launch timing pump.fun (arXiv 2507.01963)
11. social media crypto price lead lag hours Twitter leads Reddit cross-correlation
12. memecoin launch Twitter mention before token creation on-chain timestamp study
13. which platform crypto hype starts first Telegram before Twitter empirical measurement
14. information flow between social media platforms cryptocurrency temporal ordering transfer entropy
15. TikTok meme coin trend before Twitter crypto attention brainrot study
16. Nizzoli online cryptocurrency manipulation ecosystem Telegram Discord Twitter invite links
17. meme coin mention appears first Twitter Telegram before pump.fun launch lead lag minutes
18. crypto call channels Telegram signal propagation Twitter timing empirical seconds
19. (subagente) verificação da lacuna plataforma-vs-plataforma + checagem dos preprints 2609.10246 e 2609.01176

Aguardo sua resposta para escrever o documento completo.