# Vídeo 29 de 33 — Quem guarda as chaves — e por que o risco real é o app sair do ar

**Módulo 5 — A mecânica da execução · Aba "Custódia" · Duração-alvo: 4 a 5 minutos (máximo 6)**

> Cole este documento inteiro no Gemini. Ele contém as instruções E o material-fonte.
> Gerado automaticamente a partir dos dados do app (`scripts/gerar-prompts-de-video.mjs`);
> se o texto do módulo mudar, gere de novo — o vídeo segue o texto, nunca o contrário.

## O papel deste vídeo no curso

Não-custodial confirmado em fonte oficial: as chaves são suas, e a semente é exportável. O risco real é operacional (o front-end cair na hora de vender) — a queda de agosto/2025 é a cena. O incidente de fevereiro/2026 ensina a diferença entre "roubo de chaves" e "abuso de acesso interno". Tudo que está em NÃO VERIFICADO precisa ser dito como não verificado.

**Conexões:** Assume o vídeo 9 (seed). "Exportar a semente" é o plano B que o vídeo 13 não tinha.

**Resumo do módulo, para contexto:** Este módulo fecha o ciclo do hub: depois de entender o mercado (Módulo 2), as ferramentas de análise (Módulo 3) e o processo de decisão (Módulo 4), falta a mecânica da execução — a tela onde a ordem é efetivamente enviada. O objetivo é estritamente operacional: entender o que cada botão faz, quem guarda as chaves, onde o dinheiro vaza em taxas que ninguém anuncia, e quais erros de operação são comuns. Nada aqui aumenta chance de lucro; tudo aqui existe para você não perder dinheiro por desatenção.

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

- **0** — Depósito na empresa, no trading spot. Não-custodial: o dinheiro fica na sua carteira, na blockchain. Confirmado na FAQ oficial.
- **0** — Chaves privadas expostas no incidente de fev/2026. Foi abuso de ferramenta interna de suporte — visibilidade, não controle. Nenhum fundo reportado como roubado.
- **App fora do ar** — O risco que sobra. Em 28–29/08/2025 usuários ficaram horas sem conseguir vender. Quem tinha a semente exportada vendeu por outro caminho.

## MATERIAL-FONTE (copiado do app — a base do vídeo; não vá além dele)

### Quem guarda as chaves

Esta é a primeira pergunta a fazer sobre qualquer plataforma, e a resposta muda completamente o seu risco. O Módulo 1 já estabeleceu a regra: "not your keys, not your coins" — se as chaves não são suas, as moedas não são suas.

No caso do Axiom, a documentação oficial afirma que o modelo é não-custodial. A FAQ diz, textualmente, que os ativos que você tem "estão sempre sob o seu controle e de mais ninguém", e que os fundos e transações são inteiramente on-chain (docs.axiom.trade/faqs). A infraestrutura de chaves é operada por uma empresa terceirizada, a Turnkey, que gera e usa as chaves dentro de ambientes isolados e declara que nenhuma chave privada é exposta nem a ela nem ao operador do app (turnkey.com/case-studies/axiom-global-defi-trading-platform).

A prova prática mais importante está na página oficial de cadastro: ela instrui o usuário a acessar a frase de recuperação a qualquer momento nas configurações e recomenda importá-la numa carteira comum como Phantom, Rabby ou Solflare, "para garantir que você sempre tenha acesso direto aos seus fundos sob quaisquer circunstâncias" (docs.axiom.trade/getting-started/signup). Uma plataforma que te entrega a semente não está guardando o seu dinheiro.

Na prática isso significa duas coisas ao mesmo tempo. A boa: não existe risco de contraparte no trading spot — não há um saldo depositado dentro da empresa que possa sumir com ela. A pesada: a responsabilidade de segurança é 100% sua. Não há suporte que recupere fundos perdidos, reverta uma assinatura ou desfaça uma operação ruim. A primeira coisa a fazer ao usar qualquer terminal não-custodial é exportar a semente e guardá-la offline, como o Módulo 1 ensinou.

### O risco real não é a custódia, é o app sair do ar

Se as chaves são suas, qual é o risco então? É operacional. O terminal é o seu painel de controle, e um painel de controle pode travar exatamente no minuto em que você precisa dele.

Aconteceu de forma documentada em 28 e 29 de agosto de 2025: o pump.fun publicou uma mudança na API sem avisar as ferramentas que dependiam dela, e usuários do Axiom ficaram horas sem conseguir vender, até a mudança ser revertida. Traders relataram perdas concretas no chat da plataforma. Quem tinha a semente exportada conseguiu contornar: abriu a carteira em outro lugar e vendeu direto no site do pump.fun ou no Jupiter.

Essa é a lição inteira, e ela é mecânica, não moral: exportar a semente não é burocracia de segurança, é o seu plano B operacional. Um terminal fora do ar com a sua semente guardada é um inconveniente. Um terminal fora do ar sem ela é uma posição que você não consegue encerrar.

### O incidente de fevereiro de 2026 e o que ele ensina

Em 26 de fevereiro de 2026, o investigador on-chain ZachXBT publicou uma investigação alegando que funcionários do Axiom abusaram de ferramentas internas de suporte para consultar carteiras e histórico de usuários ao longo de cerca de dez meses. Em poucas horas a própria empresa confirmou publicamente: disse estar "chocada e decepcionada" ao saber que membros da equipe usaram indevidamente as ferramentas internas de suporte para consultar carteiras de usuários, removeu o acesso e prometeu investigar (CoinDesk, 26/02/2026).

A distinção mecânica aqui é o que interessa para o módulo, e ela é sutil: isso NÃO foi invasão de contrato, roubo de chaves nem saque de fundos. O painel interno dava visibilidade, não controle. Nenhum fundo de usuário foi reportado como roubado e nenhuma chave privada como exposta. A arquitetura não-custodial continuou fazendo o que promete.

Mas é justamente por isso que o caso é útil. Ele mostra que "não-custodial" protege o seu dinheiro e não protege a sua privacidade. Existe uma classe inteira de risco — abuso de privilégio interno — que a autocustódia não resolve, e que não aparece em nenhuma página de marketing. A conclusão prática não é "fuja desta plataforma": é não tratar nenhum terminal como seguro por desenho, e assumir que o que você faz numa plataforma é visível para quem a opera.

## Itens NÃO VERIFICADOS — o vídeo precisa tratá-los como tal

Se o vídeo tocar em algum destes pontos, ele deve dizer explicitamente que não está confirmado em fonte oficial. Não "resolva" a dúvida por conta própria.

- **Ordem limite: fica on-chain ou depende do servidor da plataforma?** — A documentação oficial do Axiom descreve a ordem limite e diz que você pode "se afastar da tela", mas não afirma se a ordem descansa na blockchain ou se um servidor monitora o preço e dispara. A narrativa de "monitores on-chain 24/7" aparece só em sites clones e afiliados. Teste com valor mínimo antes de confiar.
- **A frase-semente tem 12 palavras?** — Várias fontes de terceiros afirmam que sim, mas a documentação oficial fala em "recovery phrase" sem citar o número de palavras. O que ESTÁ confirmado oficialmente é o que importa: a frase é mostrada no cadastro, acessível a qualquer momento nas configurações, e importável em carteiras externas.
- **Exportação de histórico em CSV para fins fiscais** — Não há nenhuma página na documentação oficial do Axiom sobre exportar CSV ou gerar relatório fiscal. A página de portfólio descreve ver o histórico no app e dá links para o explorador de blocos. Não conte com essa exportação sem confirmar você mesmo — e lembre que o histórico on-chain sempre pode ser exportado do explorador.
- **Valor real da gorjeta de MEV no momento** — O valor mínimo do Jito (0,00001 SOL) e o padrão do Axiom (0,001 SOL) estão confirmados, mas o "tip floor" ao vivo em setembro de 2026 não pôde ser lido diretamente na pesquisa. Os percentis citados por aí vêm de um exemplo estático da documentação, datado de 2024.
- **Quanto é preciso operar para chegar ao nível de taxa mais barato** — A tabela de níveis do Axiom (0,95% até 0,75%) é oficial, mas os limiares de volume de cada nível não são publicados por nenhuma fonte confiável. Ou seja: não dá para calcular quanto volume seria necessário para pagar menos.
- **Como o desconto de indicação se combina com a devolução em SOL** — A documentação oficial concede 10% de desconto nas taxas por link de indicação, mas não documenta como isso se soma à devolução de 0,05%–0,25%. Qualquer "taxa líquida combinada" única que você encontrar é não confirmada. Códigos de terceiros anunciando 15% ou 20% divergem do número oficial.
- **Texto dos Termos de Uso** — A linguagem jurídica sobre custódia só apareceu em resultado de busca, num subdomínio bloqueado a acesso automatizado. A página não pôde ser aberta na pesquisa. O modelo não-custodial está confirmado pela FAQ e pela página de cadastro, mas o texto contratual em si continua não verificado.
- **Números de receita, volume e participação de mercado** — Números como "mais de 50% do mercado" ou "US$390 milhões de receita" vêm de reportagem, de agregadores e da própria empresa, sem auditoria independente. São contexto de negócio, não fato verificável — e não afetam nenhuma das contas deste módulo.
- **Cotação usada nos exemplos em reais** — As contas em reais assumem SOL ≈ R$512, obtido por SOL→USD × USD→BRL do Banco Central em 04/09/2026. Agregadores de conversão direta SOL→BRL mostraram valores muito dispersos, provavelmente por cache velho. Os valores em SOL são os que importam; reconfira os reais.

