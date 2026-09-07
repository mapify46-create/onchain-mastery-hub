# Vídeo 12 de 33 — Revogar aprovações: como fazer, e o que isso não resolve

**Módulo 1 — Fundamentos & Segurança · Aba "Defesa" · Duração-alvo: 4 a 5 minutos (máximo 6)**

> Cole este documento inteiro no Gemini. Ele contém as instruções E o material-fonte.
> Gerado automaticamente a partir dos dados do app (`scripts/gerar-prompts-de-video.mjs`);
> se o texto do módulo mudar, gere de novo — o vídeo segue o texto, nunca o contrário.

## O papel deste vídeo no curso

Vídeo PROCEDIMENTAL + conceitual. Mostrar o clique a clique de revogar, mas deixar claro o que a revogação NÃO cobre (Permit2 em duas camadas, EIP-7702). Não prometer que "revogar resolve tudo".

**Conexões:** Depende dos vídeos 5 e 10. É a resposta prática à pergunta de aprovação ilimitada do quiz do Módulo 5.

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

- **56,7%** — Roubos por assinatura via Permit (2024). Segundo a Scam Sniffer. Aparece na carteira como um inofensivo "assinar mensagem", sem taxa — e é isso que engana.
- **EIP-7702** — Vetor novo desde maio de 2025. Ativado na atualização Pectra do Ethereum. Casos reais: US$ 146,5 mil em 24/05/2025 e mais de US$ 1,54 mi em 24/08/2025.
- **Desfazer** — O que revogar NÃO faz. Revogar interrompe gastos futuros. Não recupera o que já saiu, não conserta uma seed vazada, não remove malware instalado.

## MATERIAL-FONTE (copiado do app — a base do vídeo; não vá além dele)

### Revogação de aprovações: como e o que ela não resolve

Como o dano dos drainers vem de permissões que ficam ativas para sempre, existe uma higiene simples: revisar e revogar approvals periodicamente. A ferramenta mais usada é o Revoke.cash, que cobre mais de 100 redes (o próprio site se descreve como "the biggest and most popular tool for revoking token approvals") e permite consultar suas permissões digitando o endereço (ou um nome ENS) sem conectar a carteira — mais seguro para só olhar. Para efetivamente revogar, aí sim você conecta a carteira, filtra e clica em "Revoke", o que gera uma transação e custa uma pequena taxa de gas.

Os próprios exploradores também têm essa função: o Token Approval Checker do Etherscan (e os equivalentes no BscScan e no Basescan) lista os contratos aprovados a gastar seus tokens, mostra o "valor em risco" e tem um botão "Revoke" para cada um, navegando entre os padrões ERC-20, ERC-721 e ERC-1155.

O ponto mais importante é o que a revogação NÃO resolve. Ela impede usos futuros da permissão, mas não recupera o que já saiu — nas próprias palavras do FAQ do Revoke.cash: "it cannot be used to recover any stolen funds". Revogar também não desfaz uma frase-semente comprometida (se alguém tem sua seed, a pessoa controla a carteira toda; a única saída é migrar tudo para uma carteira nova) e não protege contra malware ainda instalado na máquina (se há um infostealer ou clipper rodando, ele continua atuando). Regra de ouro: revogar interrompe gastos futuros; não é um botão de "desfazer".

### As duas camadas do Permit2 e o vetor novo (EIP-7702)

O Permit2 tem uma peculiaridade que confunde: ele guarda permissões em duas camadas. A primeira é o approval comum de ERC-20 que você deu ao contrato do Permit2 (geralmente ilimitado). A segunda são as sub-permissões que o Permit2 concede em seu nome, para cada app, já com valor e prazo de expiração (o app da Uniswap, por exemplo, costuma usar aprovação de 30 dias). Para a primeira camada, você revoga o approval normalmente; para a segunda, o Permit2 tem duas funções: lockdown, que revoga várias permissões de uma vez ("batch revoking approvals", nas palavras do próprio código da Uniswap), e invalidateNonces, que anula assinaturas que você já assinou mas que ainda não foram usadas. O Revoke.cash mostra as duas camadas em abas separadas, o que é mais fácil do que chamar o contrato na mão. O lado bom do Permit2 é que as permissões expiram sozinhas, eliminando a "aprovação ilimitada dormente"; o lado ruim é que o risco migra para a assinatura — uma assinatura EIP-712 maliciosa é mais fácil de conseguir porque não custa gas.

O vetor mais novo que quem começa em 2026 precisa conhecer é o EIP-7702, ativado na atualização "Pectra" do Ethereum em maio de 2025. Ele permite que uma carteira comum passe a agir como um contrato inteligente e execute várias ações numa só transação. O problema: golpistas passaram a embutir, numa única assinatura disfarçada de troca rotineira, uma "delegação" que dá controle do endereço a um contrato do atacante, que então esvazia tudo de uma vez.

Casos reais já apareceram: em 24 de maio de 2025, uma vítima perdeu cerca de US$ 146,5 mil num ataque EIP-7702 ligado ao grupo Inferno Drainer (analisado pela SlowMist); em 24 de agosto de 2025, outra vítima perdeu mais de US$ 1,54 milhão pela mesma técnica (monitorada pela Scam Sniffer). A lição é a mesma de sempre, agora ainda mais forte: uma assinatura pode valer a carteira inteira — leia sempre o que a carteira pede antes de confirmar.

### Tutorial de como revogar uma aprovação, clique a clique

Esta seção é só o passo a passo operacional; a teoria (o que a revogação resolve, as duas camadas do Permit2) está na seção anterior.

#### No Revoke.cash

1. Abra o site oficial revoke.cash conferindo a URL letra por letra. Prefira digitar o endereço você mesmo; nunca chegue por link recebido de terceiros.
2. Clique em "Connect Wallet" para conectar a carteira OU cole seu endereço/ENS na barra de busca para ver em modo somente-leitura. No modo somente-leitura você vê tudo, mas para efetivamente revogar precisa conectar a carteira.
3. Selecione a rede no menu suspenso (o site abre em Ethereum por padrão; troque para BNB Chain, Base, Polygon etc. conforme o caso).
4. Leia a lista de aprovações. Cada linha mostra o token, o "spender" (quem tem permissão), o valor aprovado e a idade da aprovação.
5. Ordene de "Newest to Oldest" para achar depressa uma aprovação suspeita que você tenha assinado minutos ou horas antes, ou busque pelo endereço do spender.
6. Clique em "Revoke" na aprovação-alvo. A carteira abre um pop-up: confirme a transação e pague o gas. Cada revogação é uma transação onchain.
7. Confira a aba do Permit2 e revogue também as permissões internas que não usa (a segunda camada, ver seção anterior).

#### No Token Approval Checker do Etherscan

1. No etherscan.io, abra o menu "More" na barra de navegação e clique em "Token Approvals".
2. Cole seu endereço de carteira (ou conecte a carteira).
3. Selecione o tipo de token (ERC-20, ERC-721 ou ERC-1155) e ative "Show all approvals" para não perder nenhuma.
4. Localize a aprovação e clique em "Revoke", confirmando a transação na carteira e pagando o gas.

- Custo e prioridade: como cada revogação custa gas, revogue primeiro as aprovações de maior valor e de contratos que você não reconhece; deixe as pequenas e conhecidas para depois. Escolher janelas de rede mais vazia deixa o gas mais barato.

## Roteiro visual sugerido (diagramas do app, em texto)

Cada bloco abaixo é um diagrama que já existe no app, descrito passo a passo. Use como storyboard: uma tela por passo, ilustração esquemática, sem captura de tela de plataforma real.

### As duas camadas do Permit2

*Revogar a camada certa importa.*

1. Ao usar um app, você dá um approval de ERC-20 ao contrato do Permit2 — a primeira camada.
2. O Permit2 passa a guardar sub-permissões em seu nome, uma por app — a segunda camada.
3. Para revogar várias sub-permissões de uma vez, usa-se a função lockdown.
4. Para anular assinaturas já feitas mas ainda não usadas, usa-se invalidateNonces.
5. O Revoke.cash mostra as duas camadas em abas separadas, facilitando a revogação.

