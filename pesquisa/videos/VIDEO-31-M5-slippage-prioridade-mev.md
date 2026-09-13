# Vídeo 31 de 33 — Tipos de ordem, slippage, prioridade e proteção de MEV

**Módulo 5 — A mecânica da execução · Aba "Configurações" · Duração-alvo: 4 a 5 minutos (máximo 6)**

> Cole este documento inteiro no Gemini. Ele contém as instruções E o material-fonte.
> Gerado automaticamente a partir dos dados do app (`scripts/gerar-prompts-de-video.mjs`);
> se o texto do módulo mudar, gere de novo — o vídeo segue o texto, nunca o contrário.

## O papel deste vídeo no curso

O que cada configuração quebra quando está errada (baixo demais falha; alto demais vira alvo de sandwich). Ordem limite: o app marca como NÃO VERIFICADO se ela fica on-chain ou depende do servidor — o vídeo tem que dizer isso e orientar "teste com valor mínimo". A calculadora de impacto de preço mostra "pool rasa" em número.

**Conexões:** Assume o vídeo 30. Leva ao vídeo 32 (erros).

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

- **3** — Modos de proteção de MEV. Off, Reduced e Secure. A própria documentação recomenda o Secure sempre que possível.
- **0,001 SOL** — Priority fee e gorjeta, no padrão. Cada um. Somam 0,002 SOL por transação — cerca de 1% numa ordem de R$100.
- **Não verificado** — Ordem limite dispara com o app fechado?. A documentação oficial não diz se a ordem fica on-chain ou depende do servidor. Teste com valor mínimo antes de confiar.

## MATERIAL-FONTE (copiado do app — a base do vídeo; não vá além dele)

### Tipos de ordem e a pergunta que ninguém responde

A ordem a mercado é o swap padrão: compra ou vende ao preço atual, na hora. É o que acontece quando você clica no botão de comprar. A ordem limite executa só quando o preço atinge o nível que você definiu — a documentação oficial descreve que você pode definir um preço preciso e "se afastar da tela" (docs.axiom.trade/axiom/swap/limit-orders). Há também compras programadas em faixas (DCA, ou ordens em degraus) e, em material de terceiros, menções a stop-loss e take-profit como variações de ordem limite.

Agora a pergunta que decide se você pode confiar numa ordem limite, e que a documentação oficial NÃO responde: a ordem fica registrada na blockchain, ou um servidor da plataforma monitora o preço e dispara a transação quando chega a hora?

A diferença é enorme. Uma ordem que descansa on-chain executa mesmo que a empresa suma. Uma ordem que depende de um servidor executa enquanto aquele servidor estiver de pé — e você já viu, na aba de custódia, que servidores caem. A narrativa de que existem "monitores on-chain 24/7" aparece apenas em sites clones e afiliados, não na documentação oficial.

Enquanto isso não estiver documentado, a postura correta é operacional: não assuma que uma ordem limite dispara com o app fechado. Teste você mesmo, com um valor mínimo, antes de confiar nela para uma posição que importa.

### As três configurações que quebram a operação

Slippage é quanta variação de preço você autoriza entre o momento em que envia a ordem e o momento em que ela executa. Os dois extremos falham de formas diferentes: baixo demais e a transação reverte com "slippage exceeded" — você perde a taxa de rede e a oportunidade; alto demais e você autoriza ser executado a um preço muito pior, o que numa pool rasa vira um convite. A própria documentação da Solana diz que limitar o slippage é a defesa mais eficaz contra ataques de sandwich (solana.com/developers/guides/advanced/mev-protection).

Priority fee é o pagamento extra ao validador para a sua transação ser incluída mais rápido. Baixo demais em momento de congestionamento significa demora ou falha; alto demais significa pagar caro à toa. O default do Axiom é 0,001 SOL, e a plataforma afirma calcular automaticamente valores recomendados com base nas transações do momento.

A proteção de MEV tem três modos na documentação oficial: Off (exposto a front-running), Reduced (roteia via Jito, com algum risco remanescente) e Secure (só validadores da lista, mais protegido e possivelmente mais lento). A própria documentação recomenda usar o modo Secure sempre que possível.

Existe ainda o botão de compra rápida, que executa um valor pré-configurado num clique só, sem tela de revisão. É conveniente e é exatamente por isso que ele aparece na lista de erros comuns. Nenhuma dessas configurações aumenta chance de lucro: todas controlam apenas se a transação executa, falha ou é explorada.

### Ler a tela — e o que ela não prova

A tela de um token num terminal costuma reunir gráfico de preço, market cap, volume, liquidez da pool, número e distribuição de holders, e um feed de transações recentes com link para o explorador de blocos. É bastante informação de uma vez, e o Módulo 3 já ensinou o que procurar nela.

As checagens que importam são as mesmas de lá. Liquidez travada ou queimada: se a LP não está travada, quem criou o token pode retirar a liquidez e sumir. Concentração de holders: poucas carteiras com percentual alto significam risco de despejo. E a detecção de bundles — compras coordenadas no mesmo bloco, que simulam demanda orgânica.

Sobre bundles, vale notar como a própria documentação do Axiom descreve a limitação da ferramenta: se pelo menos quatro transações acontecem no mesmo bloco, elas são sinalizadas como possível bundle, e a documentação admite que "nenhum método de detecção de bundle é 100% infalível — alguns falsos positivos ou bundles não detectados são inevitáveis" (docs.axiom.trade/faqs).

Esse é o enquadramento certo para a tela inteira: ler os painéis reduz surpresa, não garante segurança. Nenhum indicador, sinal social ou rastreamento de carteira é prova de que um token é seguro.

### Ferramenta interativa do app: Quanto a sua própria ordem empurra o preço

"Pool rasa" é adjetivo até virar número. Arraste o tamanho da ordem e a liquidez da pool e veja quanto do preço cotado você de fato recebe.

No vídeo, mostre a ideia da ferramenta com um ou dois exemplos numéricos — e diga que no app a pessoa pode mexer nos controles e ver o resultado mudar na hora.

*Premissa que a ferramenta assume:* Modelo de produto constante (x · y = k), a fórmula básica das AMMs. Pools reais anunciam liquidez somando os dois lados, então uma pool "de 100 SOL" tem cerca de 50 SOL deste lado. O impacto aqui é só o da sua ordem: não inclui a taxa da pool nem o slippage que você configurou — os dois vêm por cima.

## Anatomia de tela (o que mostrar e apontar)

### Anatomia da tela de um terminal

O que cada painel mostra, e o que cada um NÃO prova. Clique num item da legenda para localizar no desenho.

1. **Gráfico de preço** — Mostra o passado. A vela que já subiu é exatamente a que você não deveria perseguir — isso é erro de disciplina, não de análise.
2. **Market cap, volume e liquidez** — O que importa para a SUA ordem é a liquidez: pool rasa significa que a sua própria compra move o preço. Conecta direto com o slippage.
3. **Distribuição de holders** — Poucas carteiras com percentual alto significam risco de despejo. É a checagem de concentração do Módulo 3.
4. **Feed de transações** — Quatro ou mais compras no mesmo bloco podem ser bundle — demanda coordenada fingindo ser orgânica. A própria documentação admite falsos positivos.
5. **Campo de quantia** — Confira o valor antes de clicar. O botão de compra rápida executa o preset sem tela de revisão — e o preset pode ser o da operação anterior.
6. **O botão** — Executa com o slippage, a prioridade e a proteção de MEV que estiverem configurados. Se algum estiver errado, é aqui que o erro vira prejuízo.

### Custodial × não-custodial, lado a lado

Dois sinais na tela dizem qual dos dois modelos você está usando.

1. **Botão de depósito** — Sinal de custódia: o dinheiro sai da sua carteira e vira um saldo dentro da empresa. Quem tem as chaves tem o dinheiro.
2. **Chaves nos servidores** — Se a plataforma cair, for hackeada ou agir de má-fé, o saldo vai junto. É o risco de contraparte do Módulo 1.
3. **Frase de recuperação exportável** — Sinal de autocustódia: a plataforma te entrega a semente. Uma empresa que te entrega a semente não está guardando o seu dinheiro.
4. **Chaves com você** — Se o app sair do ar, você importa a semente em outra carteira e continua com acesso. A responsabilidade de segurança também é 100% sua.

### Anatomia do token impostor

Dois resultados para a mesma busca. Um deles foi criado para pegar quem busca pelo nome.

1. **Buscar pelo nome** — Este é o erro. Nome e ticker podem ser duplicados à vontade — qualquer um cria um token chamado igual ao que está em alta, em minutos.
2. **O token que você queria** — Liquidez, holders e histórico coerentes. Mas nada disso é o que o identifica.
3. **O impostor** — Mesmo nome, mesmo ticker, contrato diferente. Quem compra aqui comprou um token que ninguém mais vai comprar.

## Roteiro visual sugerido (diagramas do app, em texto)

Cada bloco abaixo é um diagrama que já existe no app, descrito passo a passo. Use como storyboard: uma tela por passo, ilustração esquemática, sem captura de tela de plataforma real.

### O que acontece quando o slippage está mal configurado

*Slippage alto numa pool rasa abre espaço para preço ruim e para ataque de bot.*

1. Configuro um slippage muito alto, por exemplo 40%.
2. Se a pool é rasa, a transação aceita um preço muito pior do que o cotado.
3. Isso abre espaço para um bot fazer um ataque de sandwich, comprando antes e vendendo depois de mim.
4. O bot lucra com a diferença que eu autorizei ao deixar o slippage tão folgado.
5. Recebo bem menos token do que esperava.
6. No outro extremo, slippage baixo demais numa memecoin volátil faz a transação reverter com "slippage exceeded" — perco a taxa de rede e a oportunidade.

## Itens NÃO VERIFICADOS — o vídeo precisa tratá-los como tal

Se o vídeo tocar em algum destes pontos, ele deve dizer explicitamente que não está confirmado em fonte oficial. Não "resolva" a dúvida por conta própria.

- **Ordem limite: fica on-chain ou depende do servidor da plataforma?** — A documentação oficial do Axiom descreve a ordem limite e diz que você pode "se afastar da tela", mas não afirma se a ordem descansa na blockchain ou se um servidor monitora o preço e dispara. A narrativa de "monitores on-chain 24/7" aparece só em sites clones e afiliados. Teste com valor mínimo antes de confiar.
- **A frase-semente tem 12 palavras?** — Várias fontes de terceiros afirmam que sim, mas a documentação oficial fala em "recovery phrase" sem citar o número de palavras. O que ESTÁ confirmado oficialmente é o que importa: a frase é mostrada no cadastro, acessível a qualquer momento nas configurações, e importável em carteiras externas.
- **Exportação de histórico em CSV para fins fiscais** — Não há nenhuma página na documentação oficial do Axiom sobre exportar CSV ou gerar relatório fiscal. A página de portfólio descreve ver o histórico no app e dá links para o explorador de blocos. Não conte com essa exportação sem confirmar você mesmo — e lembre que o histórico on-chain sempre pode ser exportado do explorador.
- **Valor real da gorjeta de MEV no momento** — O valor mínimo do Jito (1.000 lamports, ou 0,000001 SOL) e o padrão do Axiom (0,001 SOL) estão confirmados, mas o "tip floor" ao vivo em setembro de 2026 não pôde ser lido diretamente na pesquisa. Os percentis citados por aí vêm de um exemplo estático da documentação, datado de 2024.
- **Quanto é preciso operar para chegar ao nível de taxa mais barato** — A tabela de níveis do Axiom (0,95% até 0,75%) é oficial, mas os limiares de volume de cada nível não são publicados por nenhuma fonte confiável. Ou seja: não dá para calcular quanto volume seria necessário para pagar menos.
- **Como o desconto de indicação se combina com a devolução em SOL** — A documentação oficial concede 10% de desconto nas taxas por link de indicação, mas não documenta como isso se soma à devolução de 0,05%–0,25%. Qualquer "taxa líquida combinada" única que você encontrar é não confirmada. Códigos de terceiros anunciando 15% ou 20% divergem do número oficial.
- **Texto dos Termos de Uso** — A linguagem jurídica sobre custódia só apareceu em resultado de busca, num subdomínio bloqueado a acesso automatizado. A página não pôde ser aberta na pesquisa. O modelo não-custodial está confirmado pela FAQ e pela página de cadastro, mas o texto contratual em si continua não verificado.
- **Números de receita, volume e participação de mercado** — Números como "mais de 50% do mercado" ou "US$390 milhões de receita" vêm de reportagem, de agregadores e da própria empresa, sem auditoria independente. São contexto de negócio, não fato verificável — e não afetam nenhuma das contas deste módulo.
- **Cotação usada nos exemplos em reais** — As contas em reais assumem SOL ≈ R$512, obtido por SOL→USD × USD→BRL do Banco Central em 04/09/2026. Agregadores de conversão direta SOL→BRL mostraram valores muito dispersos, provavelmente por cache velho. Os valores em SOL são os que importam; reconfira os reais.

