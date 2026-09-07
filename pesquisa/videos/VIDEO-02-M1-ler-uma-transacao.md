# Vídeo 2 de 33 — Explorador de blocos: como ler uma transação

**Módulo 1 — Fundamentos & Segurança · Aba "Fundamentos" · Duração-alvo: 4 a 5 minutos (máximo 6)**

> Cole este documento inteiro no Gemini. Ele contém as instruções E o material-fonte.
> Gerado automaticamente a partir dos dados do app (`scripts/gerar-prompts-de-video.mjs`);
> se o texto do módulo mudar, gere de novo — o vídeo segue o texto, nunca o contrário.

## O papel deste vídeo no curso

Vídeo PROCEDIMENTAL. Mostrar, campo a campo, o que significa cada linha de uma transação num explorador. O espectador deve conseguir abrir uma transação sozinho e explicar em voz alta o que aconteceu — esse é o objetivo nº 1 do Módulo 1.

**Conexões:** Usa o que o vídeo 1 explicou (hash, confirmações). O Módulo 5 volta ao explorador para exportar histórico.

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

### Explorador de blocos: como ler uma transação

Um explorador de blocos (block explorer) é um site que funciona como um "Google da blockchain": você cola um endereço, um código de transação ou um contrato e ele mostra, de forma organizada, o que a rede registrou. Cada rede tem o seu: Solscan para a Solana, Etherscan para Ethereum, BscScan para a BNB Chain e Basescan para a Base. Eles são só de leitura: não guardam suas chaves, não fazem trocas e não conseguem mexer no seu dinheiro.

Numa transação de Ethereum (e redes EVM parecidas), os campos que mais importam para um iniciante são: Transaction Hash (identificador único de 66 caracteres, começando com "0x"); Status (Success/verde = deu certo, Failed/vermelho = falhou — e atenção: mesmo falhando você pagou a taxa de gas); Block (em qual bloco entrou, mais o número de confirmações); Timestamp (data e hora, em UTC); From/To (quem enviou e quem recebeu — em transações de token, o "To" costuma ser o contrato do token, não uma pessoa; se aparecer a palavra "Contract" em vez de um endereço comum, o destino é um contrato inteligente); Value (quanto da moeda nativa foi enviado — pode ser 0 numa transferência de token); Transaction Fee/Gas (o custo pago para processar); e as abas Tokens Transferred e Logs de eventos, que mostram o que de fato se moveu. Um erro comum de iniciante é olhar "Value: 0 ETH" e achar que nada aconteceu, quando na verdade tokens se moveram na aba "Token Transfers".

No Solscan (Solana) os campos equivalentes são: Signature (o identificador, equivalente ao hash), Block/Slot, Timestamp, Result (Success/Failed), Signer (a carteira que iniciou e pagou), Fee (em SOL, geralmente frações de centavo), Main Actions (a transação quebrada em uma ou mais transferências) e Balance Changes (SOL Balance Change e Token Balance Change, mostrando o saldo antes e depois). A lógica é a mesma do Etherscan; muda o layout e alguns nomes — inclusive, o próprio Solscan foi adquirido pela Etherscan, o que aproximou as duas ferramentas.

- Explorador = janela de auditoria; a carteira mostra o que você fez, o explorador confirma o que de fato aconteceu na rede.
- Um explorador é só de leitura: ele não envia nem recebe cripto por você.
- Cuidado com sites falsos de explorador: confira sempre a URL (etherscan.io, solscan.io) e desconfie de links recebidos por mensagem.

## Anatomia de tela (o que mostrar e apontar)

### Anatomia de uma transação no explorador

Os campos que importam para um iniciante, e o erro clássico de leitura. Clique num item da legenda para localizar no desenho.

1. **O identificador único** — Cole no explorador para achar a transação. Começa com "0x" em redes EVM; na Solana o equivalente é a Signature.
2. **Success ou Failed** — Verde deu certo, vermelho falhou — e atenção: mesmo falhando, você pagou a taxa de gas.
3. **"To" pode ser um contrato** — Em transferência de token, o "To" costuma ser o contrato do token, não uma pessoa. A palavra "Contract" no lugar de um endereço comum denuncia isso.
4. **Value 0 não significa "nada aconteceu"** — O erro clássico de iniciante. Numa transferência de token, o Value (moeda nativa) pode ser zero enquanto tokens se moveram — olhe a aba de baixo.
5. **Onde o movimento de verdade aparece** — A aba Token Transfers (ou Balance Changes, no Solscan) mostra o que de fato saiu e entrou de cada carteira.
6. **Confirmações** — Quantos blocos já foram empilhados em cima do seu. Cada um aumenta o custo de reescrever a história — é o que torna a transação imutável.

