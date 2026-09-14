# Vídeo 13 de 46 — Plano de emergência: os primeiros 10 minutos se você foi drenado

**Módulo 1 — Fundamentos & Segurança · Aba "Defesa" · Duração-alvo: 4 a 5 minutos (máximo 6)**

> Cole este documento inteiro no Gemini. Ele contém as instruções E o material-fonte.
> Gerado automaticamente a partir dos dados do app (`scripts/gerar-prompts-de-video.mjs`);
> se o texto do módulo mudar, gere de novo — o vídeo segue o texto, nunca o contrário.

## O papel deste vídeo no curso

Vídeo curto e de ação. A pessoa vai assistir isso com o coração acelerado — ordem de prioridade clara, sem enrolação, uma decisão por tela. Idealmente 3 minutos.

**Conexões:** Fecha a sequência 10 → 12 → 13. Referenciar "o que ainda dá para salvar" e "o que não adianta mais".

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

## MATERIAL-FONTE (copiado do app — a base do vídeo; não vá além dele)

### Plano de emergência: os primeiros 10 minutos se você descobrir que foi drenado

Siga a lista na ordem: ela vai do mais urgente ao menos urgente.

Este material não promete recuperação. Na prática, a chance de reaver os fundos é baixa.

1. Pare de usar o aparelho. Ele pode ter um vírus que rouba dados (infostealer) ou que troca endereços copiados (clipper). Continuar nele espalha o dano. Só volte a operar de um aparelho limpo.
2. Crie uma carteira NOVA, com frase-semente NOVA, num aparelho limpo. Uma conta "nova" dentro da MESMA frase não serve: se a frase vazou, todas as contas dela estão comprometidas, em todas as redes.
3. Mova o que sobrou, começando pelo que vale mais. Deixe gas suficiente na carteira: sem gas, a transferência não sai.
4. Cuidado com os "sweeper bots" (robôs varredores). Se a frase vazou, o golpista costuma deixar um robô vigiando a carteira. Ele leva, em segundos, tudo o que chega, inclusive o gas que você depositar.
5. Revogue as aprovações só se a frase NÃO vazou. Se o golpe foi uma assinatura ou um approve malicioso, revogar corta o roubo futuro. Se a frase ou a chave privada vazou, revogar não adianta: o golpista controla tudo.
6. Guarde as provas: os hashes (códigos) das transações, prints de tela, a URL do site do golpe, data e horário. Sem isso, a denúncia fica fraca.
7. Denuncie: faça boletim de ocorrência na delegacia e registre em plataformas como Chainabuse e Scam Sniffer. Se o dinheiro foi para uma corretora (CEX), avise-a rápido: ela pode conseguir congelar.
8. Desconfie de quem promete "recuperar seu cripto" cobrando adiantado. É um segundo golpe, extremamente comum, contra quem já perdeu. Quem aparece sozinho no seu Telegram ou Discord oferecendo isso é quase sempre golpista.

## Roteiro visual sugerido (diagramas do app, em texto)

Cada bloco abaixo é um diagrama que já existe no app, descrito passo a passo. Use como storyboard: uma tela por passo, ilustração esquemática, sem captura de tela de plataforma real.

### Decisão de emergência ao descobrir a drenagem

*A frase-semente vazou ou foi só uma assinatura maliciosa? A resposta muda tudo.*

1. Você percebe que a carteira foi drenada.
2. Pergunte-se: a frase-semente vazou, ou foi só uma assinatura maliciosa?
3. Se a frase vazou: crie uma carteira nova em um dispositivo limpo e mova o que sobrou, atento ao sweeper bot que pode roubar o gas que chega.
4. Se a frase não vazou: revogue as aprovações para cortar o vazamento futuro.
5. Em qualquer caso: registre as evidências e reporte às autoridades e à corretora envolvida.

