# Vídeo 1 de 33 — O que é uma blockchain e por que ela é "imutável"

**Módulo 1 — Fundamentos & Segurança · Aba "Fundamentos" · Duração-alvo: 4 a 5 minutos (máximo 6)**

> Cole este documento inteiro no Gemini. Ele contém as instruções E o material-fonte.
> Gerado automaticamente a partir dos dados do app (`scripts/gerar-prompts-de-video.mjs`);
> se o texto do módulo mudar, gere de novo — o vídeo segue o texto, nunca o contrário.

## O papel deste vídeo no curso

Sair do abstrato: o caderno compartilhado, o hash como impressão digital, e por que "confirmações" são o que torna uma transação definitiva. É a base de tudo; sem isso o resto do curso não faz sentido.

**Conexões:** Prepara o vídeo 2 (ler uma transação) e o Módulo 5 (por que uma transação que falha ainda cobra taxa).

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

- **Ficam gravadas** — Transações que falharam. Para sempre — e cobram a taxa de gas do mesmo jeito. O explorador mostra "Failed" em vermelho, mas o custo já foi pago.
- **2** — Partes do preço do gas. Desde a EIP-1559 (agosto de 2021): uma taxa-base, que é queimada, e uma gorjeta ao validador. É por isso que o preço varia com a demanda.
- **Ninguém** — Quem reverte uma transação confirmada. Nem corretora, nem suporte, nem você. Cada bloco novo em cima do seu aumenta o custo de reescrever a história.

## MATERIAL-FONTE (copiado do app — a base do vídeo; não vá além dele)

### O que é uma blockchain

Uma blockchain é um caderno de registros público e compartilhado. Em vez de um banco guardar sozinho a lista de quem tem o quê, milhares de computadores no mundo guardam cópias idênticas da mesma lista. Cada página desse caderno é chamada de "bloco", e cada bloco guarda um punhado de transações (por exemplo: "o endereço A enviou 2 moedas ao endereço B"). Quando um bloco enche, ele é fechado e um novo começa, formando uma corrente de blocos — daí o nome "block-chain", corrente de blocos.

O que amarra um bloco ao anterior é uma espécie de impressão digital matemática chamada "hash": um código que resume todo o conteúdo do bloco. Cada bloco carrega o hash do bloco anterior. Se alguém tentar mudar uma transação antiga, o hash daquele bloco muda, e isso quebra a ligação com todos os blocos seguintes — a fraude fica evidente para toda a rede. Mudar uma transação antiga exigiria refazer tudo em todas as cópias ao mesmo tempo, na prática impossível.

Você não precisa de permissão nem de conta para "ler" a blockchain. Qualquer pessoa pode consultar qualquer transação ou endereço. Essa transparência é a base de tudo o que vem adiante: é ela que permite auditar golpes, conferir se um pagamento chegou e revisar permissões dadas a contratos.

- Bloco: uma "página" do caderno, com várias transações.
- Hash: a impressão digital que resume um bloco e o liga ao anterior.
- Rede: os milhares de computadores que guardam cópias iguais.

### Imutabilidade e "confirmações"

Imutável quer dizer "que não pode ser alterado depois de gravado". Numa blockchain, uma transação, depois de confirmada, fica registrada para sempre — não há botão de "desfazer", não há suporte que estorna. Isso é ótimo (ninguém apaga o seu saldo) e perigoso (se você mandar para o endereço errado, ou cair num golpe, o dinheiro se foi).

"Confirmação" é o número de blocos que já foram fechados em cima do bloco onde a sua transação entrou. Uma transação com 1 confirmação já está na corrente; com 12, 30 ou mais confirmações, fica cada vez mais impossível de reverter, porque um atacante teria de reescrever todos aqueles blocos ao mesmo tempo. Por isso as corretoras esperam um número mínimo de confirmações antes de liberar um depósito.

Uma consequência importante para iniciantes: uma transação que falhou também fica registrada para sempre. Você pode ver na blockchain tentativas que não se completaram. Errar o destino, cair num golpe ou assinar algo indevido são ações que a rede executa e grava — a irreversibilidade não distingue acerto de erro.

