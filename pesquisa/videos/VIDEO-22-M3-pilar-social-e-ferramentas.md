# Vídeo 22 de 33 — O pilar social e a matriz de ferramentas

**Módulo 3 — Os dois pilares (social × técnico) · Aba "Matriz de ferramentas" · Duração-alvo: 4 a 5 minutos (máximo 6)**

> Cole este documento inteiro no Gemini. Ele contém as instruções E o material-fonte.
> Gerado automaticamente a partir dos dados do app (`scripts/gerar-prompts-de-video.mjs`);
> se o texto do módulo mudar, gere de novo — o vídeo segue o texto, nunca o contrário.

## O papel deste vídeo no curso

Apresentar a matriz como mapa, não ranking: para cada ferramenta, o que faz, quando usar, em que rede, e o nível de risco. Ferramentas marcadas "não verificado" no app devem ser ditas como tal.

**Conexões:** É o "onde olhar" das checagens do Módulo 4 e da leitura de tela do Módulo 5.

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

### Pilar social: monitorar antes de checar

Trackers de tweets e de carteiras servem para detectar cedo quando uma conta grande — influenciador, projeto, carteira "smart money" — interage com um token, dando tempo de reação antes de a multidão chegar.

Isso não substitui a checagem técnica: serve só para você não ser o último a saber que algo está acontecendo. O que fazer com essa informação ainda depende do pilar técnico e da sua tese (Módulo 4).

#### "J7 Tracker": existe, mas não é o que o nome sugere aqui

O J7 Tracker existe (j7tracker.io) — mas é uma ferramenta de sniping e deploy de token ("sub-1ms server-side deploys"), com um rastreador de tweets embutido como recurso auxiliar; acesso por credenciais via Discord. Não é uma ferramenta de tracker de narrativa como exemplo isolado. A categoria em si — "tracker de tweets / alertas sociais" — é real e usada no mercado; o hub cita o nome só para deixar claro o que ele de fato é, não como recomendação de uso.

### A matriz de ferramentas (exemplos de categoria, sem ranking)

#### DexScreener — pilar tecnico, risco baixo

- **Redes:** Multi-chain
- **Papéis:** Visualização
- **O que faz:** Mostra gráfico de preço, liquidez, volume e transações recentes de qualquer par, em praticamente qualquer chain.
- **Quando usar:** É o primeiro lugar para olhar um token que você acabou de ouvir falar — dá o contexto de preço e liquidez antes de qualquer outra checagem.
- **Observações:** Padrão de mercado. Serve para visualizar; não executa ordens.

#### GMGN (gmgn.ai) — pilar tecnico, risco medio

- **Redes:** Multi-chain
- **Papéis:** Execução, Checagem
- **O que faz:** Terminal web e bot de Telegram: executa compra/venda, tem um scanner de segurança embutido (contrato, holders) e permite copy trade de carteiras.
- **Quando usar:** Quando você já decidiu entrar e quer executar rápido com uma checagem automática de segurança na mesma tela.
- **Observações:** Nasceu focado em Solana e hoje cobre múltiplas chains. Cobra taxa de execução (~1%, citada por reviews). Copy trade copia também as perdas da carteira copiada.

#### Axiom Trade — pilar tecnico, risco medio

- **Redes:** Solana
- **Papéis:** Execução, Visualização, Monitoramento social
- **O que faz:** Terminal web não-custodial focado em Solana: descoberta de tokens novos ("Pulse"), rastreamento de carteiras, monitoramento de X/Twitter, execução rápida e controles de MEV, slippage e priority fee.
- **Quando usar:** Para acompanhar lançamentos em tempo real (aba Pulse) e executar direto da mesma tela, sem trocar de ferramenta.
- **Observações:** Modelo de taxa em camadas. Apoiado pela Y Combinator.

#### Photon — pilar tecnico, risco medio

- **Redes:** Solana, EVM (Ethereum, Base, BSC, Arbitrum...)
- **Papéis:** Execução
- **O que faz:** Terminal web rápido de execução, com foco em velocidade para comprar/vender assim que um token chama atenção.
- **Quando usar:** Quando velocidade de execução importa mais do que análise — você já fez a checagem e só falta apertar o botão rápido.
- **Observações:** Cobre Solana e também ETH/Base/Tron/Blast. Taxa de 1% citada por reviews.

#### BullX (Neo) — pilar tecnico, risco medio

- **Redes:** Multi-chain
- **Papéis:** Execução, Visualização
- **O que faz:** Terminal multi-chain com gráficos e execução, também disponível como bot de Telegram.
- **Quando usar:** Quando você opera em mais de uma chain e quer uma única ferramenta para gráfico e execução.
- **Observações:** Multi-chain.

#### Trojan — pilar tecnico, risco alto

- **Redes:** Solana
- **Papéis:** Execução
- **O que faz:** Bot de execução via Telegram para Solana, focado em velocidade.
- **Quando usar:** Snipes pequenos e rápidos, direto do celular, sem abrir um terminal web.
- **Observações:** Rápido, mas executar via bot de Telegram remove a camada visual de checagem que um terminal web mostra antes de você confirmar a compra.

#### BonkBot — pilar tecnico, risco alto

- **Redes:** Solana
- **Papéis:** Execução
- **O que faz:** Bot de Telegram simples de "tap and trade" para Solana.
- **Quando usar:** Para quem está começando e quer a execução mais simples possível, sem instalar nenhum terminal.
- **Observações:** Simplicidade não é segurança: continua exigindo checagem manual do contrato (ex.: RugCheck) antes de comprar.

#### Padre — pilar tecnico, risco medio

- **Redes:** Solana
- **Papéis:** Visualização, Execução
- **O que faz:** Terminal web "pro" para Solana, com analytics mais profundos além da execução.
- **Quando usar:** Quando você quer mais dado analítico na mesma tela em que executa.
- **Observações:** Foco em analytics.

#### Sigma — pilar tecnico, risco alto

- **Redes:** EVM (Ethereum, Base, BSC, Arbitrum...)
- **Papéis:** Execução, Checagem
- **O que faz:** Bot de Telegram de execução/sniping em chains EVM (Base, Ethereum, BSC, Arbitrum, Avalanche, Blast), com checagem rápida do contrato de deploy ("factory").
- **Quando usar:** Sniping e checagem rápida em redes EVM — nunca em Solana.
- **Observações:** Verificado: o Sigma NÃO suporta Solana. "Factory" é o contrato que faz o deploy de outros contratos/tokens; checar a factory é um padrão conhecido para detectar scam.

#### RugCheck — pilar tecnico, risco baixo

- **Redes:** Solana
- **Papéis:** Checagem
- **O que faz:** Analisa a segurança de um token em Solana: status da LP, mint/freeze authority, concentração de holders e sinais de honeypot.
- **Quando usar:** Sempre, antes de comprar qualquer token novo em Solana — é a checagem técnica mínima.
- **Observações:** Ferramenta de leitura: não executa nada por você.

#### Bubblemaps — pilar tecnico, risco baixo

- **Redes:** Multi-chain
- **Papéis:** Visualização, Checagem
- **O que faz:** Visualiza clusters de carteiras em forma de bolhas, mostrando concentração e possíveis carteiras de insiders ligadas entre si.
- **Quando usar:** Quando a checagem de holders (ex.: no explorer) já mostra concentração alta e você quer ver se essas carteiras estão conectadas.
- **Observações:** Foi a ferramenta usada para apontar ~82% do supply do caso LIBRA já desbloqueado no lançamento (ver Módulo 2, aba "Casos reais").

#### Solscan / BscScan / Etherscan / Basescan — pilar tecnico, risco baixo

- **Redes:** Solana, EVM (Ethereum, Base, BSC, Arbitrum...)
- **Papéis:** Visualização, Checagem
- **O que faz:** Block explorers oficiais de cada rede: mostram todo o histórico de transações, holders e as autoridades/permissões de um contrato, direto da fonte.
- **Quando usar:** Para conferir sem intermediário nenhum as authorities, os holders e o histórico de um contrato.
- **Observações:** Use o explorer da chain certa: Solscan (Solana), Etherscan (Ethereum), BscScan (BNB Chain), Basescan (Base).

#### Pump.fun / LetsBonk (Bonk.fun) / Raydium / Meteora / Jupiter — pilar tecnico, risco alto

- **Redes:** Solana
- **Papéis:** Execução, Visualização
- **O que faz:** Launchpads (Pump.fun, LetsBonk) que lançam tokens via bonding curve, e DEX/agregadores (Raydium, Meteora, Jupiter) para onde o token "gradua" quando junta liquidez de verdade.
- **Quando usar:** Para acompanhar o nascimento de um token no launchpad e negociar depois que ele tem pool de liquidez numa DEX.
- **Observações:** Veja a aba "Cenário 2025–2026": a liderança entre launchpads muda muito rápido.

#### Four.meme / PancakeSwap — pilar tecnico, risco alto

- **Redes:** BNB Chain
- **Papéis:** Execução
- **O que faz:** Launchpad de fair-launch de baixo custo (Four.meme) e a DEX principal da BNB Chain (PancakeSwap).
- **Quando usar:** Quando o token que você está olhando nasceu ou negocia na BNB Chain.
- **Observações:** Custo de lançamento citado em ~0,005 BNB — barato o suficiente para gerar dezenas de milhares de tokens por dia em picos de atividade.

#### Uniswap — pilar tecnico, risco medio

- **Redes:** EVM (Ethereum, Base, BSC, Arbitrum...)
- **Papéis:** Execução
- **O que faz:** DEX padrão do ecossistema EVM: troca direta de tokens via pools de liquidez, sem intermediário.
- **Quando usar:** Para negociar um token EVM depois de já ter feito a checagem técnica em outro lugar.
- **Observações:** Padrão de mercado; sozinho não faz nenhuma checagem de segurança do token.

#### J7 Tracker — pilar social, risco medio

- **Redes:** Multi-chain
- **Papéis:** Monitoramento social
- **O que faz:** Ferramenta de sniping e deploy de token ("sub-1ms server-side deploys"), com um rastreador de tweets embutido como recurso auxiliar. Categoria de fundo: tracker de tweets / alertas sociais — monitora quando uma conta específica (influenciador, projeto, carteira) interage com um token, para avisar cedo.
- **Quando usar:** A categoria "tracker de tweets" serve para não ser o último a saber que uma conta grande interagiu com um token. Esta ferramenta específica não é isso: é focada em velocidade de execução (sniping), não em leitura de narrativa.
- **Observações:** Site oficial j7tracker.io, acesso por credenciais via Discord. Preço exato e se expõe API pública: não verificado.

