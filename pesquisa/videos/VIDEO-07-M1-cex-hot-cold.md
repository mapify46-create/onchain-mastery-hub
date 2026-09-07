# Vídeo 7 de 33 — Onde ficam suas chaves: CEX, hot wallet e cold wallet

**Módulo 1 — Fundamentos & Segurança · Aba "Carteiras" · Duração-alvo: 4 a 5 minutos (máximo 6)**

> Cole este documento inteiro no Gemini. Ele contém as instruções E o material-fonte.
> Gerado automaticamente a partir dos dados do app (`scripts/gerar-prompts-de-video.mjs`);
> se o texto do módulo mudar, gere de novo — o vídeo segue o texto, nunca o contrário.

## O papel deste vídeo no curso

Comparação lado a lado das três categorias — prós, contras e para que situação cada uma serve. Usar a tabela do app como espinha do vídeo.

**Conexões:** Depende do vídeo 3 (chaves). O Módulo 5 retoma isso ao explicar o modelo de custódia de um terminal.

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

## Ganchos — os números para abrir o vídeo

São os três números do app para esta parte. Abra o vídeo com o mais surpreendente deles. Use SOMENTE estes números como gancho — não invente outros.

- **A empresa** — Quem guarda a chave na corretora. "Not your keys, not your coins." Quando FTX, Celsius e Mt. Gox quebraram, quem deixou fundos lá perdeu o acesso.
- **5** — Corretoras que anunciaram saída do varejo em 2026. Bitso, Coinext, NovaDAX, Digitra e Bitnuvem, citando o custo de adequação à regulação. Nome de corretora é exemplo de categoria, nunca recomendação.
- **Grátis** — Custo de uma hot wallet. Você guarda as chaves, num aparelho conectado. O preço é o risco de malware e phishing — e a responsabilidade inteira.

## MATERIAL-FONTE (copiado do app — a base do vídeo; não vá além dele)

### Onde ficam suas chaves: CEX, hot wallet e cold wallet

Suas moedas não ficam "dentro" da carteira como dinheiro numa carteira de couro — elas vivem na blockchain. O que você realmente possui é a chave privada, o segredo que autoriza mover as moedas. Quem controla a chave privada controla o dinheiro. A frase que resume tudo é: "not your keys, not your coins" (se as chaves não são suas, as moedas não são suas).

Existem três categorias. Uma CEX (corretora centralizada, do inglês Centralized Exchange) — como Binance ou Mercado Bitcoin, citadas aqui só como exemplos da categoria — é uma empresa que guarda as chaves por você, como um banco. É a porta de entrada mais fácil: aceita Pix, converte para reais e faz o KYC (a checagem de identidade com CPF e documento). O preço dessa comodidade é o risco de contraparte: se a empresa quebrar, for hackeada ou congelar saques, você depende dela — como se viu nos colapsos da FTX, Celsius e Mt. Gox.

Uma hot wallet (carteira quente) — como Phantom, na Solana, ou MetaMask, nas redes EVM, também citadas só como exemplos — é um programa no seu celular ou navegador em que você guarda as chaves, mas o aparelho está conectado à internet. É grátis, conecta em aplicativos descentralizados e é o que se usa para negociar on-chain. Como vive on-line, fica exposta a phishing, a drainers e a vírus.

Uma cold wallet (carteira fria) — os aparelhos da Ledger e outros fabricantes de hardware — guarda as chaves num dispositivo físico que fica offline. As chaves nunca tocam a internet, o que a torna a melhor opção para guardar valores por muito tempo. Em troca, custa dinheiro e é menos prática para trocas rápidas.

### Em que situação cada carteira faz sentido

Não existe "a melhor" carteira; existe a certa para cada uso. Para o primeiro contato — comprar cripto com Pix e experimentar — a corretora costuma ser o ponto de partida, porque resolve conversão, KYC e suporte num só lugar. A regra prática que muita gente adota é não deixar na corretora mais do que se está disposto a perder num eventual bloqueio ou incidente.

Para usar aplicativos on-chain e negociar memecoins, a carteira quente é a ferramenta, porque conecta nos sites e assina transações. Uma prática de segurança muito citada é manter uma carteira quente separada só para trade, com pouco saldo, isolada da carteira onde você guarda o grosso do patrimônio.

Para guardar valor por muito tempo ("hodl"), a carteira fria é a categoria indicada, justamente porque tira as chaves da internet. Muitos usuários combinam as três: corretora para entrar e sair em reais, carteira quente com pouco dinheiro para operar, e carteira fria para o que não vai ser mexido tão cedo. Nada disso é recomendação — é a descrição de como as categorias se encaixam.

### Tabela comparativa do app: CEX × hot wallet × cold wallet

|  | Quem guarda as chaves | Prós | Contras |
|---|---|---|---|
| **CEX (corretora centralizada)** (Binance, Mercado Bitcoin — exemplos de categoria) | A empresa guarda as chaves por você, como um banco (custódia de terceiro). | Fácil de usar; aceita Pix e entrada/saída em reais; faz KYC; tem suporte. | Você não controla as chaves ("not your keys, not your coins"); risco de bloqueio de conta, hack ou encerramento da plataforma. |
| **Hot wallet (carteira quente)** (Phantom (Solana), MetaMask (EVM) — exemplos de categoria) | Você guarda as chaves, mas num aparelho conectado à internet. | Grátis; conecta em aplicativos descentralizados; é o que se usa para negociar on-chain. | Exposta a phishing, drainers e malware; uma assinatura errada pode esvaziá-la. |
| **Cold wallet (carteira fria)** (Aparelhos de hardware — exemplos de categoria) | Você guarda as chaves num dispositivo físico offline. | As chaves nunca tocam a internet; melhor categoria para guardar por muito tempo; mostra o destino na própria telinha (defesa contra clipper). | Custo do aparelho; menos prática para trocas rápidas. |

- *CEX (corretora centralizada)* — Colapsos como FTX, Celsius e Mt. Gox mostraram que quem deixou fundos na plataforma perdeu acesso quando ela faliu. No Brasil, desde 2 de fevereiro de 2026 só devem seguir operando no varejo as corretoras que obtiverem autorização de PSAV do Banco Central (prazo para pedir: 30 de outubro de 2026); Bitso, Coinext, NovaDAX, Digitra e Bitnuvem já anunciaram saída do varejo em 2026 por causa do custo de adequação.
- *Hot wallet (carteira quente)* — A entropia (aleatoriedade) é gerada pelo próprio dispositivo, considerada menos robusta que a de um chip dedicado de hardware wallet. Prática comum: manter uma carteira quente separada só para trade, com pouco saldo, isolada do patrimônio principal — uma assinatura EIP-712 maliciosa (sem custo de gas) pode drenar a carteira sem você perceber.
- *Cold wallet (carteira fria)* — Muitas usam um chip Secure Element que dificulta a extração das chaves. Protege a chave, mas não protege você de digitar a seed num site de golpe — a disciplina com a seed vale para todas as categorias. Até marcas de hardware podem ter incidentes: em dezembro de 2023, a biblioteca Ledger Connect Kit foi comprometida num ataque de cadeia de suprimentos que injetou um drainer em vários aplicativos.

## Roteiro visual sugerido (diagramas do app, em texto)

Cada bloco abaixo é um diagrama que já existe no app, descrito passo a passo. Use como storyboard: uma tela por passo, ilustração esquemática, sem captura de tela de plataforma real.

### Quem guarda a chave em cada carteira

*Se as chaves não são suas, as moedas não são suas.*

1. Suas moedas vivem na blockchain; o que muda entre as carteiras é quem guarda a chave.
2. Na CEX, a empresa guarda a chave por você — o risco é de contraparte (a empresa quebrar ou congelar saques).
3. Na hot wallet, você guarda a chave, mas ela fica online — o risco é de malware e phishing.
4. Na cold wallet, você guarda a chave offline — maior segurança, mas a responsabilidade é toda sua.

