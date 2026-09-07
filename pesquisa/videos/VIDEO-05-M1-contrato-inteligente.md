# Vídeo 5 de 33 — O que é um contrato inteligente, em linguagem de leigo

**Módulo 1 — Fundamentos & Segurança · Aba "Fundamentos" · Duração-alvo: 4 a 5 minutos (máximo 6)**

> Cole este documento inteiro no Gemini. Ele contém as instruções E o material-fonte.
> Gerado automaticamente a partir dos dados do app (`scripts/gerar-prompts-de-video.mjs`);
> se o texto do módulo mudar, gere de novo — o vídeo segue o texto, nunca o contrário.

## O papel deste vídeo no curso

Contrato = programa que roda sozinho na blockchain. O ponto que precisa ficar: quando você "aprova" um contrato, está dando permissão a um programa — e é isso que o golpe de drainer explora (vídeo 10).

**Conexões:** Prepara os vídeos 10 e 12 (drainers e revogação) e a pergunta sobre aprovação ilimitada no quiz do Módulo 5.

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

## MATERIAL-FONTE (copiado do app — a base do vídeo; não vá além dele)

### O que é um contrato inteligente, em linguagem de leigo

Um contrato inteligente (smart contract) é um programa que roda na própria blockchain. Ele executa sozinho quando as condições programadas são atendidas, sem precisar de uma empresa no meio para "apertar o botão". É público (qualquer um pode ler) e, em geral, imutável depois de publicado: o código fica ali, naquele endereço, para sempre.

No Etherscan/Solscan você às vezes vê um selo de "código verificado" (verified). Isso significa que o autor publicou o código-fonte e ele confere com o que está de fato rodando na rede — então você (ou alguém técnico) pode ler o que o contrato faz. Um contrato sem código verificado é uma caixa-preta: você não sabe o que ele executa, então merece cuidado redobrado.

Atenção, porque este é o ponto que engana iniciante: "imutável" e "verificado" não significam "seguro". O código pode ter um bug, ou pode ter sido feito malicioso de propósito e ainda assim estar verificado — verificado só quer dizer "dá para ler", não "é confiável". Além disso, existem contratos atualizáveis via proxy: uma "porta da frente" com endereço fixo que aponta para uma lógica que pode ser trocada depois pelo dono, inclusive por um código malicioso. E existem funções administrativas de um "owner" (dono): se o dono pode pausar transferências, emitir novas moedas ou trocar a lógica, ele tem poder sobre o seu dinheiro. Por isso vale a pena, num contrato, checar se ele é um proxy, ler a lógica de implementação e ver quem é o owner (e se o controle foi renunciado ou está numa carteira multisig).

Conexão direta com os golpes de drainer: quando você dá um "approve", está justamente chamando uma função de um contrato para autorizá-lo a mexer nos seus tokens. Se o contrato por trás for malicioso, esse approve inocente vira a chave da sua carteira.

