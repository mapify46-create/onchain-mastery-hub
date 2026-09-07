# Vídeo 9 de 33 — Frase-semente: por que 12 ou 24 palavras SÃO a carteira

**Módulo 1 — Fundamentos & Segurança · Aba "Seed phrase" · Duração-alvo: 4 a 5 minutos (máximo 6)**

> Cole este documento inteiro no Gemini. Ele contém as instruções E o material-fonte.
> Gerado automaticamente a partir dos dados do app (`scripts/gerar-prompts-de-video.mjs`);
> se o texto do módulo mudar, gere de novo — o vídeo segue o texto, nunca o contrário.

## O papel deste vídeo no curso

O vídeo mais importante do Módulo 1. A frase não "protege" a carteira — ela É a carteira. Cada forma concreta de perder tudo deve virar uma cena. Fechar com o checklist de 20 itens do app como tarefa de casa.

**Conexões:** Assume o vídeo 3. É pré-requisito do Módulo 5 inteiro (exportar a seed é o plano B operacional).

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

- **12 ou 24** — Palavras que SÃO a carteira. Quem tem a frase tem todo o dinheiro, para sempre, em qualquer dispositivo — sem precisar da sua senha nem do seu aparelho.
- **0** — Cópias digitais seguras da frase. Foto, print, nuvem, e-mail, WhatsApp, bloco de notas — qualquer cópia digital é um ponto de vazamento. Papel ou metal, offline.
- **Ninguém** — Quem recupera uma frase perdida. Não existe "esqueci minha senha". Perdeu as palavras e o aparelho quebrou, o dinheiro ficou inacessível para sempre.

## MATERIAL-FONTE (copiado do app — a base do vídeo; não vá além dele)

### Frase-semente: por que 12 ou 24 palavras SÃO a carteira

A frase-semente (também chamada seed phrase, frase de recuperação ou mnemônica) é uma lista de 12 ou 24 palavras que a carteira gera quando você a cria. Ela segue um padrão chamado BIP-39, que usa uma lista fixa de 2.048 palavras. O aparelho pega uma quantidade de aleatoriedade (entropia), acrescenta uns bits de verificação (checksum, para detectar erros de digitação) e mapeia cada pedaço de 11 bits para uma palavra da lista. 128 bits de entropia viram 12 palavras; 256 bits viram 24 palavras.

O ponto mais importante: as palavras não são só um backup — elas geram a carteira inteira. A frase passa por uma função de embaralhamento (PBKDF2-HMAC-SHA512) e produz uma "semente" de 512 bits. A partir dela, o padrão BIP-32 cria uma árvore de chaves (carteira determinística hierárquica, ou HD), e o BIP-44 organiza essa árvore por moeda e conta. Por isso a mesma frase recria a mesma carteira, com todas as contas e endereços, em qualquer aplicativo compatível. Consequência prática: quem tem as 12/24 palavras tem todo o seu dinheiro, para sempre, em qualquer dispositivo — não precisa da sua senha nem do seu aparelho.

A outra face da mesma moeda: se você perder as palavras e o aparelho quebrar, ninguém no mundo recupera o seu dinheiro — não há "esqueci minha senha". Guardar a seed com segurança é, portanto, a habilidade de segurança número um de todo o módulo.

### As formas concretas de perder tudo pela seed

A regra de ouro é curta: ninguém legítimo jamais pede a sua seed phrase. Nenhum suporte, nenhuma corretora, nenhum airdrop, nenhum "verificador de carteira". Todo pedido de seed é golpe, sem exceção. Digitar as 12/24 palavras num site é entregar a carteira de mão beijada.

- Tirar foto da frase no celular, fazer print de tela, ou salvá-la na nuvem (Google Drive, iCloud, e-mail, WhatsApp) — se a nuvem ou o celular for invadido, a frase vai junto.
- Salvar num arquivo de texto no PC ou no gerenciador de senhas do navegador.
- Digitar a frase num site de phishing que imita a sua carteira, prometendo um airdrop ou "resgate" — nunca se digita a frase-semente em site nenhum.
- Cair em falso "suporte" (por Discord, Telegram, X/Twitter, e-mail) que pede a frase — suporte legítimo nunca pede a frase-semente.
- Malware infostealer (ladrão de informações), que varre a máquina atrás de arquivos, dados de extensões de carteira e da área de transferência. Famílias como RedLine e Lumma copiam arquivos de carteira (wallet.dat), dados de extensões de navegador (por exemplo MetaMask) e monitoram o clipboard atrás de frases e endereços.

### Checklist de segurança do app (20 itens)

1. **Anotei minha frase-semente no papel ou em placa de metal e guardo offline.** — Papel e metal ficam offline; nuvem e foto podem vazar e entregar a carteira inteira.
2. **Nunca fotografei, fiz print nem salvei a frase em nuvem, e-mail, PC ou WhatsApp.** — Qualquer cópia digital é um ponto de vazamento; a frase É a carteira.
3. **Guardo cópias da frase em mais de um lugar físico seguro.** — Se o único papel se perder ou queimar, o dinheiro some para sempre.
4. **Nunca digito a frase-semente em nenhum site.** — Nenhum serviço legítimo pede a frase; todo pedido é golpe.
5. **Desconfio de todo "suporte" que peça a frase ou a chave privada.** — Suporte real nunca pede isso — por Discord, Telegram, X ou e-mail.
6. **Confiro a URL do site e do explorador antes de conectar a carteira.** — Sites falsos (drainers) imitam apps e exploradores conhecidos.
7. **Salvei nos favoritos os sites oficiais; não clico em anúncios nem em links de mensagem direta.** — Golpistas já compraram anúncios do Google mirando quem procurava carteiras conhecidas.
8. **Leio o que a carteira mostra antes de assinar qualquer coisa, e desconfio de "assinar mensagem" vindo de site que eu não abri digitando o endereço.** — Permit, Permit2 e EIP-7702 se escondem em assinaturas sem gás disfarçadas de "login" ou "claim".
9. **Prefiro aprovar valores limitados, não "ilimitado".** — Uma aprovação ilimitada dormente pode ser usada para sacar depois, sem nova interação sua.
10. **Reviso e revogo aprovações antigas periodicamente no Revoke.cash ou no Token Approval Checker do Etherscan.** — Contratos que você não usa mais continuam com permissão de gastar seus tokens.
11. **Confiro o endereço inteiro ao colar, não só o começo e o fim.** — Address poisoning e clipper malware trocam o endereço por um "sósia".
12. **Confirmo transações no aparelho da hardware wallet, lendo o endereço na telinha.** — Mesmo com clipper no PC, o aparelho mostra o destino real antes de você aprovar.
13. **Mantenho valores grandes em cold wallet e uso uma carteira quente separada, com pouco saldo, só para trade.** — Reduz o estrago se a carteira do dia a dia for comprometida.
14. **Se suspeitar de infecção, migro tudo para uma carteira nova (frase nova) a partir de um dispositivo limpo.** — Revogar não resolve frase comprometida nem malware ainda instalado.
15. **Baixo carteiras apenas do site ou loja oficial, nunca de anúncio patrocinado.** — Golpistas já distribuíram versões falsas de carteiras conhecidas via anúncio, que roubaram a frase-semente.
16. **Faço uma transação-teste de valor baixo antes de mover ou enviar quantia relevante.** — Um erro de endereço ou de rede é irreversível; o teste barato revela o problema antes.
17. **Antes de investir, consulto os alertas/stop orders da CVM e verifico se a instituição é autorizada pelo Banco Central.** — Estar numa lista de alerta, ou não constar entre as autorizadas, é um forte sinal de golpe.
18. **Nunca pago taxa adiantada a "serviços de recuperação" de cripto.** — Prometer recuperar fundos mediante taxa é golpe secundário — o próprio FBI/IC3 afirma que jamais cobra para isso.
19. **No P2P, só libero a cripto depois de confirmar que o Pix caiu de fato na minha conta.** — Comprovante falso e estorno são golpes comuns de contraparte.
20. **Guardo registro de todas as operações e vou consultar um contador.** — A obrigação tributária existe, e o registro evita cair na malha fina.

