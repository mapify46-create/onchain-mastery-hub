# Briefing de pesquisa — Módulo 1 (onchain-mastery-hub)

> **Como usar:** anexe (ou cole) este arquivo inteiro numa conversa do Claude com
> busca na web habilitada. Ele é autossuficiente: tem o contexto do projeto, o
> rascunho que já existe e a tarefa. A entrega esperada é um único arquivo
> `PESQUISA-MODULO-1.md`.

---

## 1. Contexto do projeto

O **onchain-mastery-hub** é um hub de estudos local, estático, 100% no navegador,
em português do Brasil, para aprender trading on-chain e memecoins do zero. Sem
build, sem backend: HTML + Tailwind via CDN + JavaScript puro. O progresso do aluno
fica em `localStorage`.

**Público:** um iniciante absoluto. Desenvolvedor, mas sem nenhuma vivência de
cripto. Todo jargão precisa ser explicado na primeira vez que aparece.

**Estado atual:** os Módulos 2 (psicologia das memecoins), 3 (ferramentas social vs.
técnico) e 4 (gestão e decisão) estão escritos, e o glossário tem 34 termos. O
**Módulo 1 é o único vazio** — é o que esta pesquisa vai preencher.

**Data de referência:** setembro de 2026. O rascunho abaixo foi escrito com fatos
apurados em 2025, e é exatamente por isso que esta pesquisa existe.

**Regras do projeto que valem também para a pesquisa:**
- Nada de aconselhamento financeiro, jurídico ou tributário.
- Não inventar dado de mercado nem citação. O que não for confirmável entra
  marcado como **NÃO VERIFICADO**.
- O projeto tem uma nota metodológica: as referências "Jhaay" e "Matheus
  Quintiliano", citadas na origem do pedido, **não foram verificadas** — nenhuma
  fonte pública liga esses nomes à educação de trading on-chain. Não atribua
  nenhuma frase, método ou framework a eles. Trate os conceitos como conhecimento
  geral de mercado.

---

## 2. Rascunho atual (verbatim da seção "MÓDULO 1" do PLANEJAMENTO.md)

Este é o material que já existe. **Não é fonte** — é hipótese a ser conferida.

### MÓDULO 1 — Fundamentos & Segurança Cripto
**Objetivos de aprendizagem:** entender o que é blockchain e imutabilidade; diferenciar CEX, hot wallet e cold wallet; proteger a seed phrase; entender drenadores de carteira; saber como sacar para reais.

**Tópicos (resumo didático + fontes):**
- **Blockchain e imutabilidade:** um registro público em que cada transação é confirmada e não pode ser apagada; qualquer um audita pelos "block explorers" — **Solscan** (Solana), **BscScan** (BNB Chain), **Etherscan** (Ethereum), **Basescan** (Base). Explicação visual: bloco → confirmação → registro permanente.
- **Onde guardar cripto — tabela comparativa interativa:**

| Tipo | Exemplos | Custódia das chaves | Prós | Contras/risco |
|---|---|---|---|---|
| CEX (corretora) | Binance, Mercado Bitcoin | A corretora guarda | Fácil, tem Pix/entrada em R$, KYC | Você não controla as chaves ("not your keys, not your coins"); risco de bloqueio/hack da plataforma |
| Hot wallet | Phantom (Solana), MetaMask (EVM) | Você (na internet) | Grátis, conecta em dApps, negocia on-chain | Exposta a phishing, drainers, malware |
| Cold wallet | Ledger e outros hardware | Você (offline) | Chaves nunca tocam a internet; melhor p/ guardar | Custo do aparelho; menos prático p/ trade rápido |

- **Guia crítico da seed phrase:** as 12/24 palavras SÃO a carteira. Nunca digitar em site, nunca fotografar, nunca salvar em nuvem/PC/print/WhatsApp. Anotar em papel (ou placa de metal) e guardar offline. Ninguém legítimo pede sua seed.
- **Drenadores de carteira (wallet drainers) — conceito central de segurança:** são kits de phishing que esvaziam a carteira fazendo você **assinar uma permissão**, não roubando a seed. O golpe segue um roteiro: isca (falso airdrop/mint/suporte) → você conecta a carteira (isso só mostra saldos) → o site pede uma **assinatura/approval** disfarçada de "claim" ou "login" → o atacante usa a permissão (`transferFrom`) para transferir seus tokens. Vetores comuns: approval ilimitado de ERC-20, mensagens **Permit/Permit2** (assinatura sem gás via EIP-712, aparece como "assinar mensagem" e não como transação), `setApprovalForAll` de NFTs, "address poisoning", extensões falsas e malware "clipper" (troca o endereço colado). Kits operam como "drainer-as-a-service", com afiliados ficando tipicamente com 75–95% do valor roubado. Fonte: MetaMask, Trust Wallet, Revoke.cash/DEXTools/BloFin.
- **Revogação de aprovações:** revisar e revogar approvals periodicamente com **Revoke.cash** (cobre 100+ redes, aceita endereço/ENS sem conectar carteira) ou o **Token Approval Checker do Etherscan** (e BscScan/Basescan equivalentes). Permit2 tem duas camadas (`lockdown`/`invalidateNonces`); Revoke.cash expõe as duas. Revogar não recupera o que já saiu — só impede novo uso da permissão.
- **Solana vs EVM (modelo de conta):** em Solana os tokens ficam em "token accounts" (ATAs) derivados por par (carteira, token) e há "rent"; contratos são SPL (Solana Program Library). Em EVM os tokens são ERC-20 e as permissões são approvals/allowances. Isso muda como funcionam golpes e revogações.
- **Como virar dinheiro real (R$):** via **CEX com Pix** (Mercado Bitcoin, Bitso, Foxbit, Coinext e outras oferecem saque em R$ via Pix; exige KYC/CPF) ou **P2P** (você negocia direto com outra pessoa, recebendo por Pix). A Binance oferece principalmente P2P e "vender para cartão"; em 2025 passou a permitir pagamentos em cripto convertidos a real via Pix (operados pelo Z.ro Bank). No P2P, o risco é a contraparte — nunca liberar cripto antes de confirmar que o Pix caiu de fato na conta. **Tributação (ver Módulo 4 / disclaimer).**

**Componentes interativos:** tabela comparativa com linhas expansíveis; **checklist de proteção** (marca itens; salva no localStorage) — ex.: "[ ] Anotei a seed no papel/metal", "[ ] Nunca salvei a seed na nuvem", "[ ] Uso carteira separada só para trade", "[ ] Sei revogar approvals no Revoke.cash", "[ ] Bookmark dos sites oficiais (não clico em anúncio/DM)".

**Mini-quiz (5):** 1) O que torna uma transação imutável? 2) Qual opção NÃO guarda suas chaves com você? (CEX) 3) É seguro digitar a seed num site que promete airdrop? (Não) 4) O que um "approval" malicioso permite? 5) Qual ferramenta revoga aprovações?


---

## 3. A tarefa

Para cada tópico abaixo: **confirme** o que continua verdade em setembro de 2026,
**corrija** o que mudou desde 2025 (dizendo qual fonte prova) e **aprofunde** o que
está raso demais para um iniciante absoluto.

**Profundidade alvo:** o módulo pronto deve dar 25 a 30 minutos de leitura. Não é um
resumo — é uma aula. Cada conceito precisa de pelo menos um exemplo concreto, e todo
termo técnico precisa ser explicado na primeira vez que aparece, dentro da própria
frase. Prefira explicar de novo a supor que o aluno lembra.

1. **Blockchain e imutabilidade** explicadas para quem nunca viu, e como ler uma
   transação nos exploradores: Solscan (Solana), Etherscan (Ethereum), BscScan
   (BNB Chain), Basescan (Base).
2. **CEX vs hot wallet vs cold wallet:** quem guarda as chaves, prós, contras e em
   que situação cada uma faz sentido.
3. **Seed phrase:** o que é, por que as 12/24 palavras *são* a carteira, e as
   formas concretas de perder tudo.
4. **Wallet drainers:** o roteiro do golpe passo a passo (isca → conectar →
   assinar → `transferFrom`), approval ilimitado de ERC-20, Permit/Permit2 e
   EIP-712, `setApprovalForAll` de NFT, address poisoning e clipper malware.
5. **Revogação de aprovações:** como funciona na prática no Revoke.cash e no Token
   Approval Checker do Etherscan, as duas camadas do Permit2 (`lockdown` e
   `invalidateNonces`) e o que revogar **não** resolve.
6. **Solana vs EVM:** token accounts (ATA) e rent, contra ERC-20 e allowances — só
   o suficiente para explicar por que golpe e revogação funcionam diferente nas
   duas.
7. **Saque para reais no Brasil:** CEX com Pix e KYC, P2P e o risco de contraparte.
   Sem instrução tributária: aponte que a obrigação existe e mande consultar
   contador.

### Pontos que eu especificamente desconfio que envelheceram

Confira estes com prioridade e diga explicitamente se o rascunho continua certo:

- **A fatia de 75–95% para o afiliado nos kits de "drainer-as-a-service".** De qual
  relatório saiu esse intervalo, de que ano, e qual é o número mais recente
  publicado? Se a fonte original não for localizável, marque NÃO VERIFICADO em vez
  de repetir o número.
- **O arranjo Binance / Z.ro Bank** para pagamentos em cripto convertidos a real
  via Pix, citado como novidade de 2025. Ainda existe? Mudou de operador?
- **A cobertura do Revoke.cash** ("100+ redes, aceita endereço/ENS sem conectar
  carteira") e a existência do Token Approval Checker nos exploradores.
- **Quais corretoras brasileiras oferecem saque em R$ via Pix hoje.** O rascunho
  cita Mercado Bitcoin, Bitso, Foxbit e Coinext — cite como exemplos de categoria,
  nunca como recomendação, e confirme que seguem operando.
- **Qualquer vetor de golpe novo** que tenha aparecido depois do rascunho e que um
  iniciante de 2026 precise conhecer.

---

## 4. Regras inegociáveis da entrega

- Tudo em **português do Brasil**, linguagem de iniciante absoluto.
- Todo número, data ou afirmação factual precisa de **fonte pública com link e data
  de consulta**.
- O que não der para confirmar: escreva **NÃO VERIFICADO** e explique o que faltou.
  Ausência de fonte não vira estimativa.
- **Nenhuma recomendação** de comprar, vender ou usar uma corretora/carteira
  específica. Descreva categorias; cite marcas como exemplo de categoria.
- Quando o rascunho estiver errado ou desatualizado, **diga isso explicitamente**,
  com a fonte que prova.
- Não escreva código e não gere arquivos `.js`. A entrega é texto.

---

## 5. Formato da entrega

Um único arquivo **`PESQUISA-MODULO-1.md`** com as seções abaixo. Essa estrutura
espelha o formato de dados do app, então respeitá-la faz a implementação seguinte
ser mecânica.

- **`resumo`** — 2 a 3 frases sobre o módulo inteiro.
- **`objetivos`** — 4 a 5 frases curtas no formato "ao fim deste módulo você
  consegue...".
- **`secoes`** — **12 a 15 blocos**, cada um com título, 3 a 5 parágrafos e uma lista
  opcional de itens curtos. Cada seção precisa se sustentar sozinha: quem cair nela
  sem ter lido as anteriores entende. Não repita explicação entre seções — se um
  conceito volta, referencie ("como vimos em X") em vez de reescrever.
- **`tabelaCarteiras`** — as linhas CEX / hot wallet / cold wallet, cada uma com:
  exemplos, quem guarda as chaves, prós, contras e um detalhe extra que só aparece
  quando o aluno expande a linha.
- **`checklistSeguranca`** — 10 a 14 itens acionáveis, cada um com o texto do item e
  uma frase de "por que isso importa".
- **`roteiroDrainer`** — os passos do golpe em ordem; para cada passo, o que a
  vítima vê na tela e o que está de fato acontecendo por trás.
- **`diagramas`** — 3 a 4 diagramas, entregues **em texto**, não como imagem. Para
  cada um, dê as três coisas abaixo. Sugestões de tema: o roteiro do golpe de
  drainer; quem guarda a chave em cada tipo de carteira; o caminho da cripto até
  virar reais na conta; as camadas de uma aprovação (approval, Permit2).
  - **titulo** e **legenda** curtos.
  - **codigoMermaid**: o diagrama em sintaxe Mermaid (`flowchart LR` ou `TD`).
    Mantenha simples: no máximo 8 nós, sem emoji e sem caractere especial nos
    rótulos, porque o desenho precisa caber na tela de um celular.
  - **versaoEmTexto**: a mesma informação como lista ordenada de passos, cada passo
    com uma frase. Isso não é opcional — é o que aparece se o desenho não carregar
    e é o que um leitor de tela lê.
- **`quiz`** — **8 perguntas**, cada uma com 4 alternativas, a indicação de qual é a
  correta e uma explicação de 2 frases que ensine algo mesmo para quem acertou.
- **`fontes`** — tudo que você usou: título, link e data de consulta.
- **`divergencias`** — lista do que você corrigiu ou não conseguiu confirmar em
  relação ao rascunho da seção 2, com a fonte de cada correção.
