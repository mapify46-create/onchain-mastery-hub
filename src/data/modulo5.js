// modulo5.js — conteúdo do Módulo 5 (A mecânica da execução).
//
// Fusão de quatro pesquisas independentes, feitas em chats separados:
//   pt1   — as seções de texto (12 tópicos)
//   pt1-4 — fact-check de custódia e custo real, com as fontes
//   pt2   — a tabela de taxas e o exemplo numérico
//   pt3   — os diagramas e o quiz
//
// RECONCILIAÇÃO (importante para quem for editar este arquivo):
//
// 1. As três pesquisas deram números diferentes para "o custo real de uma compra":
//    1,6% (pt1), 3,2% (pt2) e 1,05% (pt3). O pt1 e o pt2 NÃO se contradizem — são
//    ordens de tamanhos diferentes com o token em pools diferentes. Por isso o
//    módulo mostra uma MATRIZ de três cenários em vez de um número único: é a
//    própria variação que ensina a lição.
// 2. O número do pt3 estava errado: o diagrama do "caminho do dinheiro" tinha
//    esquecido a taxa da pool e a gorjeta do Jito, e por isso concluía que a taxa
//    da plataforma era quase todo o custo — o oposto do que o pt2 provou com fonte
//    primária. O diagrama foi reescrito aqui com as camadas completas.
// 3. Pela mesma razão, a pergunta 4 do quiz do pt3 foi reescrita: ela dava "a taxa
//    da plataforma" como o maior custo, o que é falso numa compra pequena na
//    bonding curve (plataforma R$0,94 < custos fixos R$1,03 < pool R$1,24).
// 4. A taxa da pool na bonding curve do pump.fun é 1,25% (pt2, com a decomposição
//    oficial), não 1% (pt1).
// 5. A frase-semente "de 12 palavras" saiu do texto e foi para naoVerificado: a
//    documentação oficial fala em "recovery phrase" sem citar o número de palavras.
//
// Formato: cada seção tem um campo `aba` que diz em qual aba da view ela aparece.
// Abas: 'terminal' | 'custodia' | 'taxas' | 'configuracoes' | 'erros' | 'processo'.
// A aba 'quiz' é montada à parte, a partir de modulo5.quiz.

export const modulo5 = {
  id: 'modulo-5',
  titulo: 'A mecânica da execução',

  resumo:
    'Este módulo fecha o ciclo do hub: depois de entender o mercado (Módulo 2), as ' +
    'ferramentas de análise (Módulo 3) e o processo de decisão (Módulo 4), falta a ' +
    'mecânica da execução — a tela onde a ordem é efetivamente enviada. O objetivo é ' +
    'estritamente operacional: entender o que cada botão faz, quem guarda as chaves, ' +
    'onde o dinheiro vaza em taxas que ninguém anuncia, e quais erros de operação são ' +
    'comuns. Nada aqui aumenta chance de lucro; tudo aqui existe para você não perder ' +
    'dinheiro por desatenção.',

  objetivos: [
    'Explicar o que é um terminal de execução e o que ele acrescenta (e cobra) em cima de uma DEX.',
    'Descobrir, na documentação oficial de uma plataforma, se as chaves ficam com você ou com ela.',
    'Somar as cinco camadas de custo de uma compra e calcular quanto sobra de fato para virar token.',
    'Explicar por que a mesma ordem custa percentuais diferentes conforme o tamanho e conforme o venue.',
    'Configurar slippage, priority fee e proteção de MEV entendendo o que cada erro de configuração quebra.',
    'Reconhecer os erros de execução mais comuns antes de cometê-los, e por que velocidade não é uma disputa que você vença.',
    'Percorrer o processo do "vi um token" até "encerrei a posição" sabendo onde ele deve terminar em "não opero".',
  ],

  // ---------------------------------------------------------------------------
  // Seções de texto, uma por aba (campo `aba` diz onde a view a coloca)
  // ---------------------------------------------------------------------------
  secoes: [
    // ================================ TERMINAL ================================
    {
      id: 'o-que-e-terminal',
      aba: 'terminal',
      titulo: 'O que é um terminal de execução',
      emUmaFrase: 'O terminal é um site que monta a sua ordem e a manda para a DEX. Ele não é a exchange.',
      paragrafos: [
        'Quando você clica em "comprar" num terminal, ele não faz a troca sozinho. Ele ' +
          'monta a transação, aplica as suas configurações e pede que você assine.',
        'A troca de verdade acontece na DEX, a exchange descentralizada. Lá, os tokens saem ' +
          'de uma pool de liquidez: um contrato inteligente que guarda os dois lados da troca.',
        'O terminal fica no meio, entre a sua carteira e a DEX. Ele não substitui a ' +
          'blockchain e não tem uma lista de preços própria.',
      ],
      quadro: [
        {
          rotulo: 'O terminal (site ou app)',
          texto:
            'Monta a transação, aplica slippage, prioridade e proteção de MEV, e pede a sua ' +
            'assinatura.',
        },
        {
          rotulo: 'A pool da DEX (contrato)',
          texto: 'Faz a troca de fato. Continua existindo mesmo se o terminal sair do ar.',
        },
      ],
      paragrafosFinais: [
        'Se o terminal sair do ar amanhã, a pool continua lá. Seus tokens continuam na sua ' +
          'carteira, desde que as chaves sejam suas. Esse é o assunto da próxima aba.',
        'O que você paga ao usar um terminal é conveniência: descoberta de tokens novos, ' +
          'gráficos, dados de holders, botões de compra rápida e rastreamento de carteiras.',
        'Você não paga por um preço melhor. É neste ponto que o marketing da categoria mais ' +
          'escorrega.',
      ],
      detalhe: {
        titulo: 'as palavras desta seção',
        lista: [
          'Slippage: quanto o preço pode mudar entre enviar a ordem e ela executar. Está na aba Configurações.',
          'Prioridade (priority fee): um pagamento extra para a transação entrar mais rápido.',
          'Proteção de MEV: defesa contra bots que tentam lucrar se posicionando em volta da sua ordem.',
          'Holders: as carteiras que têm aquele token.',
        ],
      },
    },
    {
      id: 'as-tres-camadas',
      aba: 'terminal',
      titulo: 'As três camadas — e o que cada uma cobra',
      emUmaFrase:
        'A mesma troca pode ser feita de três jeitos. Só o terminal soma uma taxa própria por cima.',
      paragrafos: [
        'Toda troca termina numa pool de liquidez. O que muda entre os três jeitos é o que ' +
          'fica entre você e essa pool.',
        'Saber isso responde à pergunta "por que estou pagando isso?". Sem essa resposta, ' +
          'você só paga.',
      ],
      quadro: [
        {
          rotulo: 'DEX direto',
          texto:
            'Você usa o site da própria DEX, como Raydium, Orca ou PumpSwap. Paga só a taxa ' +
            'da pool: 0,25% no padrão da Raydium.',
        },
        {
          rotulo: 'Agregador',
          texto:
            'Um site como o Jupiter procura a melhor rota entre dezenas de DEXs. No modo ' +
            'manual, não cobra taxa própria no swap básico.',
        },
        {
          rotulo: 'Terminal',
          texto:
            'Um site como Axiom, Photon ou BullX. Cobra a taxa da plataforma POR CIMA de ' +
            'tudo: no Axiom, de 0,95% a 0,75%.',
        },
      ],
      paragrafosFinais: [
        'A taxa do terminal não compra preço melhor. Ela paga a interface e as ferramentas.',
      ],
      detalhe: {
        titulo: 'as letras miúdas de cada camada',
        lista: [
          'Raydium: dos 0,25%, 0,22% vão para quem forneceu a liquidez (docs.raydium.io/ray/protocol-fees).',
          'Jupiter: a taxa que ele não cobra se chama taxa de protocolo. Você segue pagando a taxa da DEX por baixo (docs.jup.ag/user-docs/trade/swap/manual-mode).',
          'Axiom: 0,95% líquido é o nível de entrada e 0,75% é o topo (docs.axiom.trade/getting-started/fees/axiom-fees).',
        ],
      },
    },
    {
      id: 'alternativas-da-categoria',
      aba: 'terminal',
      titulo: 'Não existe uma opção única',
      emUmaFrase: 'O Axiom é só o exemplo deste módulo. Não é indicação, e não é a única opção.',
      paragrafos: [
        'O módulo usa o Axiom porque precisa mostrar uma tela real, com números reais. Sem ' +
          'isso, o conteúdo vira abstração.',
        'Saber que existem outras plataformas evita uma confusão: achar que "operar ' +
          'on-chain" e "usar aquele site" são a mesma coisa.',
      ],
      listaTitulo:
        'Outras plataformas ativas na data desta pesquisa, sem ranking e sem comparação de qualidade:',
      lista: [
        'Photon — terminal web para Solana, com foco em escanear e executar manualmente.',
        'BullX (NEO) — terminal que funciona em mais de uma rede.',
        'Trojan — funciona dentro do aplicativo Telegram: rastrear, negociar e copiar operações.',
        'Bonkbot — bot de Telegram, foco em simplicidade, só Solana.',
        'GMGN — web e Telegram, várias redes, foco em copiar operações de outras carteiras (copy trading) e em proteção contra MEV.',
        'Banana Gun, Maestro e Padre — outros nomes ativos na categoria em 2026.',
      ],
    },

    // ================================ CUSTÓDIA ================================
    {
      id: 'custodia-do-axiom',
      aba: 'custodia',
      titulo: 'Quem guarda as chaves',
      emUmaFrase:
        'No Axiom, segundo a documentação oficial, as chaves ficam com você. O dinheiro fica ' +
        'protegido, e a segurança fica toda nas suas mãos.',
      paragrafos: [
        'Antes de usar qualquer plataforma, pergunte: quem guarda as chaves? A resposta muda ' +
          'o seu risco por completo.',
        'A regra vem do Módulo 1: "not your keys, not your coins". Se as chaves não são ' +
          'suas, as moedas também não são.',
      ],
      quadro: [
        {
          rotulo: 'Custodial',
          texto:
            'A empresa guarda as chaves. Você deposita, e o saldo fica dentro dela. Se ela ' +
            'cair ou sumir, o saldo vai junto.',
        },
        {
          rotulo: 'Não-custodial',
          texto:
            'As chaves ficam com você. O dinheiro fica na sua carteira, na blockchain. É o ' +
            'modelo que a documentação do Axiom afirma usar.',
        },
      ],
      listaTitulo: 'O que a documentação oficial do Axiom diz:',
      lista: [
        'A FAQ afirma que os seus ativos "estão sempre sob o seu controle e de mais ninguém".',
        'A FAQ também diz que fundos e transações são inteiramente on-chain, ou seja, registrados na própria blockchain.',
        'A página de cadastro ensina a ver a frase de recuperação (a semente, as palavras que recriam a carteira) nas configurações, a qualquer momento.',
        'A mesma página recomenda importar a semente numa carteira comum, como Phantom, Rabby ou Solflare, "para garantir que você sempre tenha acesso direto aos seus fundos sob quaisquer circunstâncias".',
      ],
      paragrafosFinais: [
        'Essa última é a prova prática mais forte. Uma plataforma que te entrega a semente ' +
          'não está guardando o seu dinheiro.',
        'A parte boa: no trading spot, que é comprar e vender o próprio token, não existe ' +
          'saldo depositado na empresa que possa sumir com ela. Isso elimina o risco de ' +
          'contraparte.',
        'A parte pesada: a segurança é 100% sua. Nenhum suporte recupera fundos perdidos, ' +
          'reverte uma assinatura ou desfaz uma operação ruim.',
        'Por isso, o primeiro passo em qualquer terminal não-custodial é exportar a semente ' +
          'e guardá-la offline, como o Módulo 1 ensinou.',
      ],
      detalhe: {
        titulo: 'quem opera as chaves por trás do Axiom',
        paragrafos: [
          'A infraestrutura de chaves é operada por uma empresa terceirizada, a Turnkey. Ela ' +
            'gera e usa as chaves dentro de ambientes isolados.',
          'A Turnkey declara que nenhuma chave privada fica exposta, nem a ela nem ao ' +
            'operador do app (turnkey.com/case-studies/axiom-global-defi-trading-platform).',
          'Risco de contraparte é o risco de quem guarda o seu dinheiro falhar. Fontes do ' +
            'Axiom: docs.axiom.trade/faqs e docs.axiom.trade/getting-started/signup.',
        ],
      },
    },
    {
      id: 'o-risco-real-e-o-frontend',
      aba: 'custodia',
      titulo: 'O risco real não é a custódia, é o app sair do ar',
      emUmaFrase:
        'Com as chaves na sua mão, o maior risco é o app travar na hora em que você precisa vender.',
      paragrafos: [
        'Se as chaves são suas, a empresa não pode sumir com o seu dinheiro. O risco que ' +
          'sobra é operacional: o terminal parar de funcionar.',
        'O terminal é o seu painel de controle. E um painel pode travar justo no minuto em ' +
          'que você precisa dele.',
      ],
      exemplo: {
        titulo: 'O que aconteceu em 28 e 29 de agosto de 2025',
        passos: [
          'O pump.fun publicou uma mudança na API sem avisar as ferramentas que dependiam dela. API é a porta pela qual um sistema conversa com outro.',
          'Usuários do Axiom ficaram horas sem conseguir vender, até a mudança ser revertida.',
          'Traders relataram perdas concretas no chat da plataforma.',
          'Quem tinha a semente exportada contornou o problema: abriu a carteira em outro lugar e vendeu direto no site do pump.fun ou no Jupiter.',
        ],
      },
      paragrafosFinais: [
        'A lição é mecânica, não moral. Exportar a semente não é burocracia de segurança. É ' +
          'o seu plano B operacional.',
        'Terminal fora do ar, com a semente guardada: um inconveniente.',
        'Terminal fora do ar, sem a semente: uma posição que você não consegue encerrar.',
      ],
    },
    {
      id: 'incidente-fevereiro-2026',
      aba: 'custodia',
      titulo: 'O incidente de fevereiro de 2026 e o que ele ensina',
      emUmaFrase: '"Não-custodial" protege o seu dinheiro. Não protege a sua privacidade.',
      paragrafos: [
        'Em 26 de fevereiro de 2026, o investigador on-chain ZachXBT publicou uma ' +
          'investigação sobre o Axiom.',
        'Ela alegava que funcionários abusaram de ferramentas internas de suporte para ' +
          'consultar carteiras e histórico de usuários, ao longo de cerca de dez meses.',
        'Em poucas horas, a empresa confirmou em público. Disse estar "chocada e ' +
          'decepcionada" com o uso indevido das ferramentas, removeu o acesso e prometeu ' +
          'investigar (CoinDesk, 26/02/2026).',
      ],
      quadro: [
        {
          rotulo: 'O que NÃO foi',
          texto:
            'Invasão de contrato, roubo de chaves ou saque de fundos. Nenhum fundo foi ' +
            'reportado como roubado e nenhuma chave privada como exposta.',
        },
        {
          rotulo: 'O que foi',
          texto:
            'Abuso de privilégio interno: gente de dentro olhando dados de usuários. O painel ' +
            'dava visibilidade, não controle.',
        },
      ],
      paragrafosFinais: [
        'A arquitetura não-custodial continuou fazendo o que promete. É justamente por isso ' +
          'que o caso é útil.',
        'Ele mostra um tipo de risco que a autocustódia não resolve: o abuso de privilégio ' +
          'interno. E esse risco não aparece em nenhuma página de marketing.',
        'A conclusão prática não é "fuja desta plataforma". É não tratar nenhum terminal como ' +
          'seguro por desenho.',
        'Assuma que o que você faz numa plataforma é visível para quem a opera.',
      ],
    },

    // ================================== TAXAS ==================================
    {
      id: 'a-taxa-anunciada-nao-e-o-custo',
      aba: 'taxas',
      titulo: 'A taxa anunciada não é o que você paga',
      emUmaFrase:
        'O número anunciado é só a fatia da plataforma. Uma compra tem cinco camadas de custo.',
      paragrafos: [
        'Toda plataforma anuncia um número, como "1%" ou "a partir de 0,75%". Esse número é ' +
          'verdadeiro, mas incompleto.',
        'Ele mostra só o que a plataforma cobra. As outras quatro camadas saem do seu bolso ' +
          'do mesmo jeito, e não aparecem nele.',
      ],
      listaTitulo: 'As cinco camadas de uma compra:',
      lista: [
        'Taxa da plataforma: a única anunciada.',
        'Taxa-base da rede Solana: 5.000 lamports por assinatura, ou 0,000005 SOL. Lamport é a menor fração do SOL. É cobrada mesmo quando a transação falha.',
        'Priority fee: um pagamento extra ao validador, o computador que registra transações na rede, para a sua entrar mais rápido. No Axiom, o padrão é 0,001 SOL.',
        'Gorjeta de MEV (o "bribe", via Jito): compra proteção contra ataques de bots. No Axiom, o padrão é 0,001 SOL.',
        'Taxa da pool: cobrada pela pool onde a troca acontece.',
      ],
      exemplo: {
        titulo: 'Uma compra de R$100 num token na bonding curve (a primeira linha da matriz)',
        passos: [
          'Taxa da plataforma, a anunciada: ≈ R$0,94.',
          'Custos fixos (rede, priority fee e gorjeta): ≈ R$1,03.',
          'Taxa da pool: ≈ R$1,24.',
          'Total: ≈ R$3,20, ou 3,2% do valor. A taxa anunciada foi a MENOR das três partes.',
        ],
      },
      paragrafosFinais: [
        'Numa compra pequena, a taxa da plataforma pode ser a menor das camadas, e não a ' +
          'maior. É o contrário do que a intuição sugere. Por isso a matriz desta aba existe.',
      ],
      detalhe: {
        titulo: 'quem recebe o priority fee e a gorjeta',
        paragrafos: [
          'Essas duas não são receita da plataforma. Vão para validadores. Mas são ' +
            'justamente as que não aparecem no número anunciado.',
          'Fontes: padrões do Axiom em docs.axiom.trade/getting-started/fees/solana-fees. ' +
            'Taxa-base cobrada mesmo em falha em solana.com/docs/core/fees.',
        ],
      },
    },
    {
      id: 'custo-fixo-pesa-mais-em-ordem-pequena',
      aba: 'taxas',
      titulo: 'Por que ordem pequena é mecanicamente penalizada',
      emUmaFrase: 'Parte do custo é fixa. Por isso, quanto menor a ordem, maior o peso das taxas.',
      paragrafos: [
        'Algumas taxas são percentuais: crescem junto com a ordem. Outras são fixas: custam ' +
          'o mesmo valor em SOL, qualquer que seja o tamanho.',
        'O priority fee e a gorjeta somam 0,002 SOL nos valores padrão. Custam igual se você ' +
          'move o equivalente a R$50 ou a R$5.000.',
      ],
      exemplo: {
        titulo: 'Os mesmos 0,002 SOL em duas ordens',
        passos: [
          'Ordem de R$100: os 0,002 SOL pesam cerca de 1% do valor.',
          'Ordem dez vezes maior: os mesmos 0,002 SOL pesam cerca de 0,1%.',
          'A taxa é a mesma. O peso ficou dez vezes menor.',
        ],
      },
      paragrafosFinais: [
        'A matriz não mostra um detalhe: toda operação é ida e volta. Você paga essas taxas ' +
          'ao comprar e paga de novo ao vender, inclusive quando sai no prejuízo.',
        'Existe um valor abaixo do qual o atrito das taxas domina o resultado. Isto não é ' +
          'conselho de tamanho de posição.',
        'É saber calcular onde fica esse ponto, em vez de receber um número pronto de alguém.',
      ],
    },
    {
      id: 'o-venue-muda-o-custo',
      aba: 'taxas',
      titulo: 'O mesmo terminal cobra diferente conforme onde o token está',
      emUmaFrase:
        'A taxa da pool depende de onde o token está, não do terminal. Na bonding curve, ela é ' +
        'cinco vezes a de uma AMM madura (1,25% contra 0,25%).',
      paragrafos: [
        'O "venue" é o lugar onde a troca acontece de fato: a pool em que o token está sendo ' +
          'negociado.',
        'Um token passa por lugares diferentes ao longo da vida. Cada lugar cobra uma taxa ' +
          'de pool diferente, e isso muda a conta inteira.',
      ],
      listaTitulo: 'O caminho de um token do pump.fun, e a taxa de pool em cada etapa:',
      ordenada: true,
      lista: [
        'Bonding curve do pump.fun: o token acabou de nascer, e uma fórmula define o preço conforme as pessoas compram. Taxa da pool: 1,25%.',
        'PumpSwap: o token "graduou" e ganhou a sua pool canônica, a pool oficial dele. A taxa continua em 1,25% enquanto o market cap (o valor total do token) é pequeno, e cai por faixas conforme cresce.',
        'AMM madura, como a Raydium: a taxa padrão é 0,25%. AMM é a DEX em que a própria pool calcula o preço.',
      ],
      exemplo: {
        titulo: 'A mesma ordem de R$512, no mesmo terminal (linhas 2 e 3 da matriz)',
        passos: [
          'Token na bonding curve: taxa da pool ≈ R$6,39. Custo total ≈ 2,4%.',
          'Token já numa AMM madura: taxa da pool ≈ R$1,28. Custo total ≈ 1,4%.',
          'Só mudou o lugar onde o token está.',
        ],
      },
      paragrafosFinais: [
        'Isso não é defeito do terminal. É onde a troca acontece. Mas muda a sua conta, e ' +
          'raramente aparece explicado.',
        'E a taxa é só uma parte do custo. Um estudo com 534 mil negociações reais mediu o ' +
          'custo total numa memecoin popular: 6 vezes o de um par entre duas moedas estáveis.',
      ],
      detalhe: {
        titulo: 'a divisão da taxa e o estudo da Uniswap Labs',
        paragrafos: [
          'Na bonding curve, os 1,25% se dividem oficialmente em 0,300% para o criador do ' +
            'token e 0,95% para o protocolo (pump.fun/docs/fees). A taxa da Raydium está em ' +
            'docs.raydium.io/ray/protocol-fees.',
          'O estudo: Adams, Chan, Markovich & Wan, "Don\'t Let MEV Slip", Financial ' +
            'Cryptography 2024, feito pela Uniswap Labs.',
          'Ele mediu o custo total efetivo: taxa, deslizamento de preço e o que bots de MEV ' +
            'extraem. Deu 140 pontos-base por dólar negociado na memecoin, contra 22 no par ' +
            'de moedas estáveis. Um ponto-base é 0,01%.',
          'A pool da memecoin estudada era mais funda, ou seja, tinha mais liquidez, do que a ' +
            'maioria das de memecoin recém-lançada.',
          'O mesmo estudo mediu a chance de sofrer deslizamento causado por um bot adversário: ' +
            'cerca de 80% maior na memecoin do que na moeda madura.',
        ],
      },
    },

    // ============================== CONFIGURAÇÕES ==============================
    {
      id: 'tipos-de-ordem',
      aba: 'configuracoes',
      titulo: 'Tipos de ordem e a pergunta que ninguém responde',
      emUmaFrase:
        'Não assuma que uma ordem limite dispara com o app fechado. A documentação oficial não diz.',
      paragrafos: [
        'Ao clicar em comprar, você faz uma ordem a mercado. Ela compra ou vende ao preço ' +
          'atual, na hora. É o swap padrão.',
        'A ordem limite só executa quando o preço chega ao nível que você definiu. A ' +
          'documentação do Axiom diz que você pode definir um preço preciso e "se afastar da ' +
          'tela".',
        'Aí vem a pergunta que decide se dá para confiar nela: quem fica vigiando o preço ' +
          'enquanto você está longe? A documentação oficial NÃO responde.',
      ],
      quadro: [
        {
          rotulo: 'Se a ordem fica registrada na blockchain',
          texto: 'Ela executa mesmo que a empresa suma.',
        },
        {
          rotulo: 'Se um servidor da plataforma vigia o preço',
          texto:
            'Ela só executa enquanto esse servidor estiver de pé. E servidores caem, como a ' +
            'aba Custódia mostrou.',
        },
      ],
      paragrafosFinais: [
        'Até isso estar documentado, não conte com a ordem limite com o app fechado. Teste ' +
          'você mesmo, com um valor mínimo, antes de usá-la numa posição que importa.',
      ],
      detalhe: {
        titulo: 'outros tipos de ordem e os "monitores 24/7"',
        paragrafos: [
          'Existem também compras programadas em faixas: DCA, que é comprar aos poucos, ou ' +
            'ordens em degraus. Página oficial: docs.axiom.trade/axiom/swap/limit-orders.',
          'Material de terceiros menciona stop-loss (vender se cair até um preço) e ' +
            'take-profit (vender se subir até um preço) como variações de ordem limite.',
          'A promessa de "monitores on-chain 24/7" aparece só em sites clones e afiliados, ' +
            'não na documentação oficial.',
        ],
      },
    },
    {
      id: 'slippage-priority-mev',
      aba: 'configuracoes',
      titulo: 'As três configurações que quebram a operação',
      emUmaFrase:
        'Estas configurações só decidem se a transação executa, falha ou é explorada. ' +
        'Nenhuma aumenta chance de lucro.',
      paragrafos: [
        'Antes de comprar, o terminal usa três configurações. Errar qualquer uma quebra a ' +
          'operação, para um lado ou para o outro.',
      ],
      quadro: [
        {
          rotulo: 'Slippage',
          texto:
            'Quanto o preço pode mudar entre enviar a ordem e ela executar. Baixo demais: a ' +
            'transação falha. Alto demais: você aceita um preço muito pior.',
        },
        {
          rotulo: 'Priority fee',
          texto:
            'Pagamento extra ao validador para entrar mais rápido. Baixo demais no ' +
            'congestionamento: demora ou falha. Alto demais: paga caro à toa.',
        },
        {
          rotulo: 'Proteção de MEV',
          texto:
            'Defesa contra bots que se posicionam em volta da sua ordem. No Axiom há três ' +
            'modos: Off, Reduced e Secure.',
        },
      ],
      exemplo: {
        titulo: 'Slippage na prática (valores hipotéticos, só para ilustrar)',
        passos: [
          'Você aceita slippage de 1%. O preço piora mais que 1% antes de a ordem executar.',
          'A rede cancela a transação com "slippage exceeded". Você perde a taxa de rede e a oportunidade, mas não compra caro.',
          'Agora você aceita 50%. A ordem quase sempre passa, mas pode executar a um preço muito pior. Numa pool rasa, isso vira um convite para bots.',
        ],
      },
      paragrafosFinais: [
        'A documentação da Solana diz que limitar o slippage é a defesa mais eficaz contra ' +
          'ataques de sandwich. Nesse ataque, um bot compra logo antes de você e vende logo ' +
          'depois.',
        'Na proteção de MEV, a própria documentação do Axiom recomenda usar o modo Secure ' +
          'sempre que possível.',
        'Cuidado com o botão de compra rápida. Ele executa um valor pré-configurado num ' +
          'clique, sem tela de revisão. É conveniente, e por isso está na lista de erros ' +
          'comuns.',
      ],
      detalhe: {
        titulo: 'os três modos de MEV e o priority fee automático',
        lista: [
          'Off: exposto a front-running, que é alguém passar na frente da sua ordem.',
          'Reduced: roteia via Jito, com algum risco remanescente.',
          'Secure: só validadores da lista. Mais protegido e possivelmente mais lento.',
          'O priority fee padrão do Axiom é 0,001 SOL. A plataforma afirma calcular valores recomendados automaticamente, com base nas transações do momento.',
          'Fonte sobre slippage como defesa: solana.com/developers/guides/advanced/mev-protection.',
        ],
      },
    },
    {
      id: 'ler-a-tela-de-operacao',
      aba: 'configuracoes',
      titulo: 'Ler a tela — e o que ela não prova',
      emUmaFrase: 'Ler os painéis reduz surpresa. Não garante segurança.',
      paragrafos: [
        'A tela de um token junta muita coisa: gráfico de preço, market cap, volume, liquidez ' +
          'da pool, número e distribuição de holders.',
        'Tem também um feed de transações recentes, com link para o explorador de blocos, o ' +
          'site que mostra tudo o que foi gravado na blockchain.',
        'É muita informação de uma vez. O Módulo 3 já ensinou o que procurar nela.',
      ],
      listaTitulo: 'As três checagens que importam:',
      lista: [
        'Liquidez travada ou queimada. Se a LP, o recibo da liquidez, não está travada, quem criou o token pode retirar a liquidez e sumir.',
        'Concentração de holders. Poucas carteiras com percentual alto significam risco de despejo, uma venda grande de uma vez.',
        'Bundles. São compras coordenadas no mesmo bloco, que simulam demanda orgânica.',
      ],
      paragrafosFinais: [
        'Nenhum indicador, sinal social ou rastreamento de carteira é prova de que um token é ' +
          'seguro.',
      ],
      detalhe: {
        titulo: 'como o Axiom marca bundles, e onde isso falha',
        paragrafos: [
          'Pela documentação do Axiom, se pelo menos quatro transações acontecem no mesmo ' +
            'bloco, elas são sinalizadas como possível bundle.',
          'A própria documentação admite: "nenhum método de detecção de bundle é 100% ' +
            'infalível — alguns falsos positivos ou bundles não detectados são inevitáveis" ' +
            '(docs.axiom.trade/faqs).',
          'Falso positivo é alertar sem haver bundle. Bundle não detectado é o contrário: ' +
            'haver bundle e não alertar.',
        ],
      },
    },

    // ================================== ERROS ==================================
    {
      id: 'erros-de-execucao',
      aba: 'erros',
      titulo: 'Os erros que custam dinheiro sem envolver o mercado',
      emUmaFrase: 'Dá para perder dinheiro sem o preço se mexer: basta errar na operação.',
      paragrafos: [
        'Alguns prejuízos não têm nada a ver com o token subir ou cair. São erros de operação.',
        'Neles, a pessoa sabia a regra e errou mesmo assim, por pressa ou por reflexo.',
        'O mais caro é comprar o token errado. Qualquer um pode criar um token com o mesmo ' +
          'nome e o mesmo ticker, a sigla curta, do que está em alta.',
      ],
      quadro: [
        {
          rotulo: 'Nome e ticker',
          texto: 'São apelidos. Podem ser repetidos à vontade.',
        },
        {
          rotulo: 'Endereço do contrato',
          texto: 'É a identidade. Busque sempre pelo endereço verificado, nunca pelo nome.',
        },
      ],
      listaTitulo: 'Os outros erros comuns, em resumo:',
      lista: [
        'Slippage alto numa pool rasa, em que a sua própria compra move o preço.',
        'Quantia digitada errada, ou botão de compra rápida ainda no valor da operação anterior.',
        'Assinar sem ler o que a transação autoriza. O Módulo 1 já mostrou onde isso termina.',
        'Perseguir uma vela que já subiu. É erro de disciplina disfarçado de decisão.',
      ],
      paragrafosFinais: [
        'E um erro que vem antes de todos: operar na carteira principal.',
        'Uma carteira separada só para operar limita o estrago se o dispositivo ou o app ' +
          'forem comprometidos. E não custa nada criar.',
      ],
    },
    {
      id: 'bots-de-sniping',
      aba: 'erros',
      titulo: 'Por que velocidade não é uma disputa que você vença',
      emUmaFrase:
        'Um bot reage em milissegundos. Você leva de 30 a 60 segundos. Essa corrida não é sua.',
      paragrafos: [
        'Bots de sniping são programas que vigiam a blockchain. Eles compram tokens novos ' +
          'frações de segundo depois que a liquidez é criada.',
        'Esta seção não ensina a usar bot. Ela existe para ajustar a sua expectativa, porque ' +
          'expectativa errada aqui custa dinheiro real.',
      ],
      quadro: [
        {
          rotulo: 'O bot',
          texto:
            'Reage na casa das dezenas de milissegundos, com transações pré-assinadas e ' +
            'infraestrutura colada à produção de blocos.',
        },
        {
          rotulo: 'Você',
          texto: 'Leva de 30 a 60 segundos entre ver a informação e ter a transação confirmada.',
        },
      ],
      paragrafosFinais: [
        'O diferencial deles não é inteligência. É infraestrutura.',
        'Quando você vê um token "novo" já subindo, os bots já entraram. O preço que você ' +
          'consegue no lançamento é um preço que um bot mais rápido decidiu recusar.',
        'Pôr inteligência artificial para reagir por você não resolve. Uma chamada de modelo ' +
          'leva segundos, e a disputa se decide em milissegundos. A IA te deixa mais lento.',
      ],
      detalhe: {
        titulo: 'o tamanho de um slot na Solana',
        paragrafos: [
          'Slot é a janela de tempo em que a rede produz um bloco novo. Um milissegundo (ms) ' +
            'é um milésimo de segundo.',
          'Em 21 de agosto de 2026, o slot passou de 400 ms para 350 ms. Foi a primeira ' +
            'redução desde o lançamento da rede (SIMD-0525, ' +
            'solana.com/upgrades/reduced-slot-times).',
        ],
      },
    },

    // ================================= PROCESSO =================================
    {
      id: 'registro-para-imposto',
      aba: 'processo',
      titulo: 'Guardar registro desde a primeira operação',
      emUmaFrase:
        'A obrigação de registrar começa na primeira operação, não quando aparece lucro.',
      paragrafos: [
        'Isso liga direto com a seção de impostos do Módulo 1 (IN RFB 2.291/2025 e o ' +
          'programa DeCripto).',
      ],
      listaTitulo: 'Guarde o seu próprio registro de cada compra e venda:',
      lista: [
        'Data.',
        'Valor em reais.',
        'Custo de aquisição, ou seja, quanto custou comprar.',
      ],
      paragrafosFinais: [
        'Exportar o histórico pelo próprio terminal: NÃO VERIFICADO. Não conte com isso sem ' +
          'confirmar você mesmo no app.',
        'A boa notícia é que você não depende do terminal. Todas as transações ficam ' +
          'on-chain, gravadas na blockchain.',
        'O histórico sempre pode ser recuperado pelo endereço da carteira num explorador de ' +
          'blocos, que permite exportar.',
        'Isto não é orientação tributária. Guarde o registro e procure um contador.',
      ],
      detalhe: {
        titulo: 'o que a documentação do Axiom diz sobre histórico',
        paragrafos: [
          'A documentação oficial descreve ver o histórico de operações no app e dá links ' +
            'para o Solscan, um explorador de blocos.',
          'Mas não há nenhuma página oficial sobre exportar CSV, o arquivo de planilha, nem ' +
            'sobre gerar relatório fiscal.',
        ],
      },
    },
    {
      id: 'do-token-ao-encerramento',
      aba: 'processo',
      titulo: 'Do "vi um token" ao "encerrei a posição"',
      emUmaFrase:
        'Cada passo é uma chance de parar antes de gastar dinheiro. "Não opero" é um resultado válido.',
      paragrafos: [
        'Este fluxo amarra este módulo com o Módulo 4. É disciplina operacional, não um ' +
          'método para achar oportunidade.',
        'A grande diferença é que este processo tem saídas pelo caminho. Por isso a ordem dos ' +
          'passos importa.',
      ],
      ordenada: true,
      lista: [
        'Abra o terminal pelo favorito oficial. Nunca por link de anúncio ou rede social: existem sites falsos (phishing) imitando plataformas conhecidas.',
        'Busque pelo endereço do contrato verificado. Nunca pelo nome ou pelo ticker.',
        'Passe o token pela página Checklist antes de comprar: endereço oficial, extensões e autoridades do contrato, concentração de holders, bundles e histórico de quem criou.',
        'Escreva a tese antes de comprar. Junto com ela, escreva o ponto de invalidação: onde você admite que errou e sai.',
        'Defina o tamanho da posição e confira o valor no campo. Atenção redobrada se o botão de compra rápida estiver ligado.',
        'Configure slippage, prioridade e proteção de MEV com consciência. Faça primeiro uma operação-teste com valor mínimo.',
        'Saia em degraus, conforme o plano feito antes da entrada. Não conforme o que você sente durante.',
      ],
      paragrafosFinais: [
        'E o passo que não é passo: decidir NÃO operar. É um resultado legítimo e frequente do ' +
          'processo, não uma falha dele.',
        'Se as checagens acendem alerta, ou se você não consegue escrever a tese com clareza, ' +
          'o certo é não clicar.',
        'Como o Módulo 2 mostrou, a maioria das memecoins vai a zero. Passar na maioria das ' +
          'vezes é o esperado de quem segue o processo, não sinal de que ele travou.',
      ],
    },
  ],

  // ---------------------------------------------------------------------------
  // Tabela: as três camadas e o que cada uma cobra (aba "terminal")
  // ---------------------------------------------------------------------------
  tabelaCamadas: {
    colunas: [
      { chave: 'oQueFaz', rotulo: 'O que faz' },
      { chave: 'cobra', rotulo: 'O que cobra' },
      { chave: 'observacao', rotulo: 'Observação' },
    ],
    linhas: [
      {
        id: 'dex-direto',
        titulo: 'DEX direto',
        subtitulo: 'Raydium, Orca, PumpSwap — exemplos de categoria',
        valores: {
          oQueFaz: 'É a pool de liquidez onde a troca acontece de fato, no contrato inteligente.',
          cobra: 'Só a taxa da pool — 0,25% no padrão da Raydium, 1,25% na bonding curve do pump.fun.',
          observacao: 'Camada mais barata e a menos confortável: sem descoberta de token, sem gráfico integrado, sem dados de holders.',
        },
        detalheExtra:
          'Na Raydium (AMM v4), os 0,25% se dividem em 0,22% para quem fornece liquidez e ' +
          '0,03% para recompra de RAY. A taxa da pool existe independentemente de qual ' +
          'interface você usou para chegar até ela — inclusive quando você usa um terminal.',
      },
      {
        id: 'agregador',
        titulo: 'Agregador de liquidez',
        subtitulo: 'Jupiter — exemplo de categoria',
        valores: {
          oQueFaz: 'Varre várias DEXs procurando a melhor rota para a sua ordem e divide entre pools se compensar.',
          cobra: 'No modo manual, sem taxa de protocolo no swap básico; você paga a DEX por baixo e a rede.',
          observacao: 'Acrescenta busca de preço sem acrescentar custo de plataforma.',
        },
        detalheExtra:
          'É a camada que efetivamente pode melhorar o seu preço de execução, porque ' +
          'compara rotas. Um terminal normalmente usa um agregador por baixo — ou seja, ' +
          'você já está pagando por essa camada mesmo sem saber que ela existe.',
      },
      {
        id: 'terminal',
        titulo: 'Terminal de execução',
        subtitulo: 'Axiom, Photon, BullX — exemplos de categoria',
        valores: {
          oQueFaz: 'Interface, descoberta de tokens, gráficos, dados de holders, botões de compra rápida, rastreamento.',
          cobra: 'Taxa da plataforma POR CIMA de tudo — no Axiom, 0,95% líquido no nível de entrada.',
          observacao: 'Você paga por conveniência e ferramentas, não por preço melhor.',
        },
        detalheExtra:
          'A tabela de níveis do Axiom vai de 0,95% líquido (Wood, entrada) a 0,75% ' +
          '(Champion, topo), com devolução em SOL de 0,05% a 0,25%. Os limiares de volume ' +
          'para subir de nível não são publicados oficialmente — ou seja, não dá para ' +
          'calcular quanto é preciso operar para chegar ao nível mais barato.',
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // Tabela: as cinco camadas de custo de uma compra (aba "taxas")
  // ---------------------------------------------------------------------------
  tabelaTaxas: {
    colunas: [
      { chave: 'quanto', rotulo: 'Quanto é' },
      { chave: 'quemRecebe', rotulo: 'Quem recebe' },
      { chave: 'tipo', rotulo: 'Fixa ou variável' },
    ],
    linhas: [
      {
        id: 'plataforma',
        titulo: '1. Taxa da plataforma',
        subtitulo: 'A única que costuma ser anunciada',
        valores: {
          quanto: '0,95% líquido no nível de entrada, até 0,75% no topo (1% bruto menos a devolução em SOL).',
          quemRecebe: 'A plataforma; parte volta ao usuário como devolução em SOL.',
          tipo: 'Variável por nível de volume.',
        },
        detalheExtra:
          'Fonte: docs.axiom.trade/getting-started/fees/axiom-fees. Fontes de terceiros de ' +
          '2025 citavam 0,9%; onde houver conflito, vale a documentação oficial — a ' +
          'divergência normalmente indica material desatualizado.',
      },
      {
        id: 'rede',
        titulo: '2. Taxa-base da rede',
        subtitulo: 'A menor de todas, e ainda assim inescapável',
        valores: {
          quanto: '0,000005 SOL por assinatura (5.000 lamports). Fração de centavo.',
          quemRecebe: 'Validadores — metade é queimada.',
          tipo: 'Fixa.',
        },
        detalheExtra:
          'Cobrada mesmo quando a transação falha: "Charged whether the transaction ' +
          'succeeds or fails" (solana.com/docs/core/fees). É por isso que uma transação ' +
          'revertida por slippage ainda custa alguma coisa — pouca, mas não zero.',
      },
      {
        id: 'priority',
        titulo: '3. Priority fee',
        subtitulo: 'Não aparece na taxa anunciada',
        valores: {
          quanto: 'Configurável; o padrão do Axiom é 0,001 SOL.',
          quemRecebe: 'O validador, integralmente.',
          tipo: 'Fixa em SOL — por isso pesa mais em ordem pequena.',
        },
        detalheExtra:
          'Sobe em momentos de congestionamento. Traders relatam precisar elevar bastante ' +
          'esse valor em picos, o que sozinho pode transformar o custo total de uma compra ' +
          'pequena.',
      },
      {
        id: 'gorjeta',
        titulo: '4. Gorjeta de MEV (Jito)',
        subtitulo: 'Também não aparece na taxa anunciada',
        valores: {
          quanto: 'Configurável; o padrão do Axiom é 0,001 SOL. O mínimo do Jito é 1.000 lamports (0,000001 SOL).',
          quemRecebe: 'Validadores, pelas contas de gorjeta do Jito.',
          tipo: 'Fixa em SOL.',
        },
        detalheExtra:
          'É o que compra a proteção contra ataques de sandwich. Não é receita da ' +
          'plataforma. Junto com o priority fee, soma 0,002 SOL nos valores padrão — cerca ' +
          'de 1% numa ordem de R$100 e 0,1% numa ordem dez vezes maior.',
      },
      {
        id: 'pool',
        titulo: '5. Taxa da pool',
        subtitulo: 'A que mais varia, e não depende do terminal',
        valores: {
          quanto: '1,25% na bonding curve do pump.fun; 1,25% caindo por faixa no PumpSwap; 0,25% na Raydium.',
          quemRecebe: 'Criador do token, protocolo e provedores de liquidez, conforme o venue.',
          tipo: 'Variável conforme onde o token está.',
        },
        detalheExtra:
          'Na bonding curve do pump.fun a decomposição oficial é 0,300% para o criador do ' +
          'token e 0,95% para o protocolo (pump.fun/docs/fees). Numa compra pequena de ' +
          'token novo, esta costuma ser a MAIOR das cinco camadas — maior que a taxa da ' +
          'plataforma, que é a única anunciada.',
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // Matriz de custo: a mesma operação em três situações (aba "taxas")
  //
  // Substitui de propósito o "número único" de custo. As três pesquisas deram
  // números diferentes justamente porque usaram tamanhos e venues diferentes —
  // mostrar a variação ensina mais do que escolher um número e esconder o resto.
  // ---------------------------------------------------------------------------
  matrizDeCusto: {
    cotacaoAssumida:
      'Contas feitas com SOL ≈ R$512, obtido por SOL→USD (mercado) × USD→BRL (Banco ' +
      'Central, 5,1253 em 04/09/2026). A cotação é suposição declarada e muda o peso das ' +
      'taxas fixas: reconfira antes de usar os valores em reais.',
    colunas: [
      { chave: 'pool', rotulo: 'Taxa da pool' },
      { chave: 'fixos', rotulo: 'Peso dos custos fixos' },
      { chave: 'total', rotulo: 'Custo total aproximado' },
    ],
    linhas: [
      {
        id: 'pequena-bonding',
        titulo: 'Ordem de R$100, token na bonding curve',
        subtitulo: 'O cenário mais caro dos três',
        valores: {
          pool: '1,25% ≈ R$1,24',
          fixos: '0,002 SOL ≈ R$1,03 — cerca de 1% da ordem',
          total: '≈ R$3,20, ou 3,2% do valor',
        },
        detalheExtra:
          'Decomposição: custos fixos R$1,03 + plataforma R$0,94 + pool R$1,24. Repare na ' +
          'ordem de grandeza: a taxa da plataforma, a única anunciada, é a MENOR das três. ' +
          'Slippage não está incluído e seria custo adicional.',
      },
      {
        id: 'maior-bonding',
        titulo: 'Ordem de R$512, mesmo token na bonding curve',
        subtitulo: 'Só o tamanho mudou',
        valores: {
          pool: '1,25% ≈ R$6,39',
          fixos: '0,002 SOL ≈ R$1,03 — cerca de 0,2% da ordem',
          total: '≈ R$12,27, ou 2,4% do valor',
        },
        detalheExtra:
          'Os custos fixos são exatamente os mesmos em SOL da linha anterior, mas o peso ' +
          'percentual caiu de ~1% para ~0,2%, porque estão diluídos numa ordem cinco vezes ' +
          'maior. Nada mudou na plataforma nem no token — só o tamanho da ordem.',
      },
      {
        id: 'maior-amm',
        titulo: 'Ordem de R$512, token já em AMM madura',
        subtitulo: 'O mesmo terminal, o mesmo tamanho, outro venue',
        valores: {
          pool: '0,25% ≈ R$1,28',
          fixos: '0,002 SOL ≈ R$1,03 — cerca de 0,2% da ordem',
          total: '≈ R$7,16, ou 1,4% do valor',
        },
        detalheExtra:
          'Comparando com a linha de cima: mesma plataforma, mesmo tamanho de ordem, mesmo ' +
          'dia — e o custo cai de 2,4% para 1,4% apenas porque o token já saiu da bonding ' +
          'curve. É a prova de que "quanto custa operar" não tem um número único.',
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // Destaques — os números grandes que abrem cada aba
  //
  // São a primeira coisa que alguém lê ao abrir a aba, e cada um contradiz uma
  // suposição comum. REGRA: todo número aqui já está com fonte em `fontes`; onde
  // não há número pesquisado, o destaque é uma afirmação concreta, nunca uma
  // estatística inventada.
  // ---------------------------------------------------------------------------
  destaques: {
    terminal: [
      {
        rotulo: 'Camadas entre você e a pool',
        valor: '3',
        nota: 'Carteira → terminal → agregador → pool. Cada camada que você acrescenta é uma taxa a mais.',
      },
      {
        rotulo: 'O que o agregador cobra',
        valor: '0%',
        nota: 'No modo manual do Jupiter, sem taxa de protocolo no swap básico. Você paga a DEX por baixo e a rede.',
        tom: 'ok',
      },
      {
        rotulo: 'A camada mais cara',
        valor: '0,95%',
        nota: 'O terminal. Não compra preço melhor — compra a interface, a descoberta e os botões.',
        tom: 'alerta',
      },
    ],

    custodia: [
      {
        rotulo: 'Depósito na empresa, no trading spot',
        valor: '0',
        nota: 'Não-custodial: o dinheiro fica na sua carteira, na blockchain. Confirmado na FAQ oficial.',
        tom: 'ok',
      },
      {
        rotulo: 'Chaves privadas expostas no incidente de fev/2026',
        valor: '0',
        nota: 'Foi abuso de ferramenta interna de suporte — visibilidade, não controle. Nenhum fundo reportado como roubado.',
      },
      {
        rotulo: 'O risco que sobra',
        valor: 'App fora do ar',
        nota: 'Em 28–29/08/2025 usuários ficaram horas sem conseguir vender. Quem tinha a semente exportada vendeu por outro caminho.',
        tom: 'alerta',
      },
    ],

    taxas: [
      {
        rotulo: 'A fatia que é anunciada',
        valor: '0,95%',
        nota: 'A taxa da plataforma no nível de entrada. É a única que aparece no marketing.',
        tom: 'neutro',
      },
      {
        rotulo: 'O custo real de uma compra pequena',
        valor: '3,2%',
        nota: 'Somando as cinco camadas, numa ordem de R$100 em token na bonding curve. Mais de três vezes o número anunciado.',
        tom: 'alerta',
      },
      {
        rotulo: 'Quantas vezes você paga isso',
        valor: '2×',
        nota: 'Comprar é uma transação, vender é outra. O pedágio é cobrado nas duas pontas — inclusive quando a operação dá errado.',
        tom: 'neutro',
      },
    ],

    configuracoes: [
      {
        rotulo: 'Modos de proteção de MEV',
        valor: '3',
        nota: 'Off, Reduced e Secure. A própria documentação recomenda o Secure sempre que possível.',
      },
      {
        rotulo: 'Priority fee e gorjeta, no padrão',
        valor: '0,001 SOL',
        nota: 'Cada um. Somam 0,002 SOL por transação — cerca de 1% numa ordem de R$100.',
      },
      {
        rotulo: 'Ordem limite dispara com o app fechado?',
        valor: 'Não verificado',
        nota: 'A documentação oficial não diz se a ordem fica on-chain ou depende do servidor. Teste com valor mínimo antes de confiar.',
        tom: 'alerta',
      },
    ],

    erros: [
      {
        rotulo: 'Duração de um slot na Solana',
        valor: '350 ms',
        nota: 'Desde 21/08/2026. Um bot reage em dezenas de milissegundos, com transação pré-assinada.',
      },
      {
        rotulo: 'Você, do "vi" ao "confirmado"',
        valor: '30–60 s',
        nota: 'Quando você vê um token novo já subindo, os bots já entraram. O preço que sobra é o que eles recusaram.',
        tom: 'alerta',
      },
      {
        rotulo: 'Tokens que podem ter o mesmo ticker',
        valor: 'Ilimitado',
        nota: 'Nome e ticker são apelido; endereço do contrato é identidade. Busque sempre pelo endereço.',
        tom: 'alerta',
      },
    ],

    processo: [
      {
        rotulo: 'Saídas em "não opero" no fluxo',
        valor: '2',
        nota: 'Checagem reprovada, ou tese que não fica clara. Passar na maioria das vezes é o comportamento esperado.',
        tom: 'ok',
      },
      {
        rotulo: 'Quando nasce a obrigação de registrar',
        valor: '1ª operação',
        nota: 'Não quando aparece lucro. Data, valor em reais e custo de aquisição de cada compra e venda.',
      },
      {
        rotulo: 'Exportação de histórico pelo terminal',
        valor: 'Não verificado',
        nota: 'Nenhuma página oficial sobre isso. O histórico on-chain sempre pode ser exportado do explorador.',
        tom: 'alerta',
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // Anatomias — mockups desenhados com marcadores numerados
  //
  // Ilustrações esquemáticas, não capturas de plataforma nenhuma: captura seria
  // republicação de material de terceiro, pareceria endosso, e nasceria vencida.
  // Coordenadas no viewBox; a legenda é o conteúdo, o desenho é enriquecimento.
  // ---------------------------------------------------------------------------
  anatomias: {
    telaDoTerminal: {
      titulo: 'Anatomia da tela de um terminal',
      descricao:
        'O que cada painel mostra, e o que cada um NÃO prova. Clique num item da legenda para ' +
        'localizar no desenho.',
      viewBox: [0, 0, 640, 400],
      paineis: [
        { id: 'grafico', x: 12, y: 12, w: 400, h: 220, rotulo: 'Gráfico de preço', tipo: 'grafico' },
        { id: 'numeros', x: 424, y: 12, w: 204, h: 100, rotulo: 'Market cap · Volume · Liquidez', tipo: 'numeros' },
        { id: 'holders', x: 424, y: 124, w: 204, h: 108, rotulo: 'Holders', tipo: 'lista' },
        { id: 'transacoes', x: 12, y: 244, w: 400, h: 144, rotulo: 'Transações recentes', tipo: 'lista' },
        { id: 'quantia', x: 424, y: 244, w: 204, h: 66, rotulo: 'Quantia', tipo: 'campo' },
        { id: 'comprar', x: 424, y: 322, w: 204, h: 66, rotulo: 'Comprar', tipo: 'botao', alerta: true },
      ],
      itens: [
        {
          painel: 'grafico',
          titulo: 'Gráfico de preço',
          texto: 'Mostra o passado. A vela que já subiu é exatamente a que você não deveria perseguir — isso é erro de disciplina, não de análise.',
        },
        {
          painel: 'numeros',
          titulo: 'Market cap, volume e liquidez',
          texto: 'O que importa para a SUA ordem é a liquidez: pool rasa significa que a sua própria compra move o preço. Conecta direto com o slippage.',
        },
        {
          painel: 'holders',
          titulo: 'Distribuição de holders',
          texto: 'Poucas carteiras com percentual alto significam risco de despejo. É a checagem de concentração do Módulo 3.',
        },
        {
          painel: 'transacoes',
          titulo: 'Feed de transações',
          texto: 'Quatro ou mais compras no mesmo bloco podem ser bundle — demanda coordenada fingindo ser orgânica. A própria documentação admite falsos positivos.',
        },
        {
          painel: 'quantia',
          titulo: 'Campo de quantia',
          texto: 'Confira o valor antes de clicar. O botão de compra rápida executa o preset sem tela de revisão — e o preset pode ser o da operação anterior.',
        },
        {
          painel: 'comprar',
          titulo: 'O botão',
          texto: 'Executa com o slippage, a prioridade e a proteção de MEV que estiverem configurados. Se algum estiver errado, é aqui que o erro vira prejuízo.',
        },
      ],
      nota: 'Ler os painéis reduz surpresa, não garante segurança. Nenhum indicador, sinal social ou rastreamento de carteira é prova de que um token é seguro.',
    },

    custodia: {
      titulo: 'Custodial × não-custodial, lado a lado',
      descricao: 'Dois sinais na tela dizem qual dos dois modelos você está usando.',
      viewBox: [0, 0, 640, 300],
      paineis: [
        { id: 'saldo-c', x: 12, y: 12, w: 300, h: 80, rotulo: 'CUSTODIAL — saldo na plataforma', tipo: 'numeros' },
        { id: 'deposito', x: 12, y: 104, w: 300, h: 70, rotulo: 'Depositar', tipo: 'botao', alerta: true },
        { id: 'chaves-c', x: 12, y: 186, w: 300, h: 100, rotulo: 'Chaves: nos servidores da empresa', tipo: 'texto', alerta: true },
        { id: 'saldo-n', x: 328, y: 12, w: 300, h: 80, rotulo: 'NÃO-CUSTODIAL — saldo na sua carteira', tipo: 'numeros' },
        { id: 'semente', x: 328, y: 104, w: 300, h: 70, rotulo: 'Frase de recuperação (exportável)', tipo: 'campo' },
        { id: 'chaves-n', x: 328, y: 186, w: 300, h: 100, rotulo: 'Chaves: com você', tipo: 'texto' },
      ],
      itens: [
        {
          painel: 'deposito',
          titulo: 'Botão de depósito',
          texto: 'Sinal de custódia: o dinheiro sai da sua carteira e vira um saldo dentro da empresa. Quem tem as chaves tem o dinheiro.',
        },
        {
          painel: 'chaves-c',
          titulo: 'Chaves nos servidores',
          texto: 'Se a plataforma cair, for hackeada ou agir de má-fé, o saldo vai junto. É o risco de contraparte do Módulo 1.',
        },
        {
          painel: 'semente',
          titulo: 'Frase de recuperação exportável',
          texto: 'Sinal de autocustódia: a plataforma te entrega a semente. Uma empresa que te entrega a semente não está guardando o seu dinheiro.',
        },
        {
          painel: 'chaves-n',
          titulo: 'Chaves com você',
          texto: 'Se o app sair do ar, você importa a semente em outra carteira e continua com acesso. A responsabilidade de segurança também é 100% sua.',
        },
      ],
      nota: 'O Axiom, exemplo deste módulo, está no modelo da direita segundo a documentação oficial. Vários bots de Telegram estão no da esquerda. Confira antes de depositar qualquer coisa.',
    },

    tokenImpostor: {
      titulo: 'Anatomia do token impostor',
      descricao: 'Dois resultados para a mesma busca. Um deles foi criado para pegar quem busca pelo nome.',
      viewBox: [0, 0, 640, 260],
      paineis: [
        { id: 'busca', x: 12, y: 12, w: 616, h: 56, rotulo: 'Buscar: nome do token', tipo: 'campo' },
        { id: 'legitimo', x: 12, y: 84, w: 616, h: 76, rotulo: 'Resultado 1 — liquidez alta, milhares de holders', tipo: 'numeros' },
        { id: 'impostor', x: 12, y: 172, w: 616, h: 76, rotulo: 'Resultado 2 — mesmo nome, mesmo ticker, liquidez baixa', tipo: 'numeros', alerta: true },
      ],
      itens: [
        {
          painel: 'busca',
          titulo: 'Buscar pelo nome',
          texto: 'Este é o erro. Nome e ticker podem ser duplicados à vontade — qualquer um cria um token chamado igual ao que está em alta, em minutos.',
        },
        {
          painel: 'legitimo',
          titulo: 'O token que você queria',
          texto: 'Liquidez, holders e histórico coerentes. Mas nada disso é o que o identifica.',
        },
        {
          painel: 'impostor',
          titulo: 'O impostor',
          texto: 'Mesmo nome, mesmo ticker, contrato diferente. Quem compra aqui comprou um token que ninguém mais vai comprar.',
        },
      ],
      nota: 'A única identidade de um token é o endereço do contrato. Copie o endereço de uma fonte confiável e busque por ele — nunca pelo nome.',
    },
  },

  // ---------------------------------------------------------------------------
  // Ilustração das camadas (aba Terminal): o caminho da ordem com a taxa de cada
  // etapa anotada. Desenhada em SVG na view; aqui ficam só os rótulos.
  // ---------------------------------------------------------------------------
  ilustracaoCamadas: [
    { id: 'carteira', rotulo: 'Carteira', taxa: 'assina', detalhe: 'Você autoriza cada transação' },
    { id: 'terminal', rotulo: 'Terminal', taxa: '0,95%', detalhe: 'Interface e ferramentas' },
    { id: 'agregador', rotulo: 'Agregador', taxa: '0%', detalhe: 'Busca a melhor rota' },
    { id: 'pool', rotulo: 'Pool da DEX', taxa: '0,25–1,25%', detalhe: 'Onde a troca acontece' },
  ],

  // ---------------------------------------------------------------------------
  // Calculadora de impacto de preço (a matemática mora em views/modulo5.js)
  // ---------------------------------------------------------------------------
  calculadoraDeImpacto: {
    titulo: 'Quanto a sua própria ordem empurra o preço',
    descricao:
      '"Pool rasa" é adjetivo até virar número. Arraste o tamanho da ordem e a liquidez da pool ' +
      'e veja quanto do preço cotado você de fato recebe.',
    controles: [
      {
        id: 'ordem',
        rotulo: 'Tamanho da sua ordem',
        min: 0.1,
        max: 20,
        passo: 0.1,
        valor: 1,
        sufixo: ' SOL',
        formatar: (n) => n.toFixed(1).replace('.', ','),
      },
      {
        id: 'pool',
        rotulo: 'Liquidez da pool (lado do SOL)',
        min: 1,
        max: 500,
        passo: 1,
        valor: 50,
        sufixo: ' SOL',
        formatar: (n) => String(n),
      },
    ],
    nota:
      'Modelo de produto constante (x · y = k), a fórmula básica das AMMs. Pools reais anunciam ' +
      'liquidez somando os dois lados, então uma pool "de 100 SOL" tem cerca de 50 SOL deste ' +
      'lado. O impacto aqui é só o da sua ordem: não inclui a taxa da pool nem o slippage que ' +
      'você configurou — os dois vêm por cima.',
  },

  // ---------------------------------------------------------------------------
  // Gráfico de barras empilhadas: como o custo se reparte em cada cenário
  //
  // Mesmos três cenários da matrizDeCusto, mas mostrando a PROPORÇÃO entre as
  // camadas. A tabela dá os números; só a barra empilhada mostra que a fatia
  // anunciada é a única que praticamente não muda de um cenário para o outro.
  // ---------------------------------------------------------------------------
  graficoDeCamadas: {
    camadas: [
      { chave: 'fixos', rotulo: 'Custos fixos (rede, prioridade, gorjeta)', cor: 'acento' },
      { chave: 'plataforma', rotulo: 'Taxa da plataforma (a anunciada)', cor: 'primaria' },
      { chave: 'pool', rotulo: 'Taxa da pool', cor: 'risco-medio' },
    ],
    grupos: [
      {
        rotulo: 'R$100, bonding curve',
        detalhe: '3,21%',
        valores: { fixos: 1.03, plataforma: 0.94, pool: 1.24 },
      },
      {
        rotulo: 'R$512, bonding curve',
        detalhe: '2,40%',
        valores: { fixos: 0.2, plataforma: 0.95, pool: 1.25 },
      },
      {
        rotulo: 'R$512, AMM madura',
        detalhe: '1,40%',
        valores: { fixos: 0.2, plataforma: 0.95, pool: 0.25 },
      },
    ],
    sufixo: '%',
    legenda:
      'Cada barra é uma compra, repartida nas camadas de custo, em porcentagem da ordem. ' +
      'Repare que a faixa roxa — a única taxa anunciada — é quase do mesmo tamanho nas três.',
  },

  // ---------------------------------------------------------------------------
  // Calculadora de atrito (a matemática mora em views/modulo5.js)
  // ---------------------------------------------------------------------------
  calculadoraDeAtrito: {
    titulo: 'Quanto o atrito come, com o mercado parado',
    descricao:
      'Cada operação cobra o pedágio na ida e na volta. Arraste os controles para ver o que ' +
      'sobra do capital depois de um tanto de operações — sem o preço ter subido nem caído.',
    controles: [
      {
        id: 'operacoes',
        rotulo: 'Operações completas (comprar e vender)',
        min: 1,
        max: 100,
        passo: 1,
        valor: 20,
        // Contagem é número inteiro; sem isto o padrão de 2 casas mostraria "20,00".
        formatar: (n) => String(n),
      },
      {
        id: 'custo',
        rotulo: 'Custo de cada ida e volta',
        min: 0.5,
        max: 8,
        passo: 0.1,
        valor: 3.2,
        sufixo: '%',
      },
    ],
    nota:
      'Isto não é uma previsão e não diz nada sobre ganhar ou perder no mercado — é aritmética ' +
      'de custo, assumindo o preço parado, justamente para isolar o atrito. No mundo real o ' +
      'preço também se move, para os dois lados, e o atrito continua acontecendo por cima disso.',
  },

  // ---------------------------------------------------------------------------
  // ETAPA B — preencher quando chegar a continuação da pesquisa do Prompt 2.
  // A view ignora estes três campos enquanto estiverem vazios, então o módulo
  // funciona sem eles; ao preencher, nada precisa mudar na view.
  // ---------------------------------------------------------------------------
  tabelaOrdens: { colunas: [], linhas: [] },
  checklistExecucao: [],
  errosComuns: [],

  // ---------------------------------------------------------------------------
  // Diagramas
  // ---------------------------------------------------------------------------
  diagramas: [
    {
      id: 'camadas-carteira-dex',
      aba: 'terminal',
      titulo: 'As camadas entre a carteira e a DEX',
      legenda: 'A ordem sai da carteira, passa pelo terminal e pelo agregador, até chegar à pool.',
      codigoMermaid:
        'flowchart LR\n' +
        '  A[Carteira] --> B[Terminal de execucao]\n' +
        '  B --> C[Agregador de liquidez]\n' +
        '  C --> D[Pool da DEX]\n' +
        '  D --> E[Token na carteira]',
      versaoEmTexto: [
        'A ordem começa na sua carteira, que assina a transação.',
        'O terminal recebe a ordem e aplica as suas configurações de slippage, prioridade e proteção de MEV.',
        'O terminal envia para um agregador de liquidez, que procura a melhor rota entre várias DEXs.',
        'O agregador roteia a ordem para uma ou mais pools de liquidez.',
        'O token comprado volta para a sua carteira.',
      ],
    },
    {
      // REESCRITO. A versão original da pesquisa (pt3) omitia a taxa da pool e a
      // gorjeta do Jito, e por isso concluía que a taxa da plataforma era quase
      // todo o custo — o contrário do que o pt2 demonstrou com fonte primária.
      id: 'caminho-do-dinheiro',
      aba: 'taxas',
      titulo: 'O caminho do dinheiro numa compra',
      legenda: 'As cinco camadas de custo entre o seu dinheiro e o token na carteira.',
      codigoMermaid:
        'flowchart TD\n' +
        '  A[Compro R$ 100 em token] --> B[Taxa de rede fracao de centavo]\n' +
        '  B --> C[Priority fee 0.001 SOL]\n' +
        '  C --> D[Gorjeta de MEV 0.001 SOL]\n' +
        '  D --> E[Taxa da plataforma 0.95 por cento]\n' +
        '  E --> F[Taxa da pool 0.25 a 1.25 por cento]\n' +
        '  F --> G[Recebo o token]',
      versaoEmTexto: [
        'Envio o equivalente a R$100 para comprar o token.',
        'Pago a taxa-base da rede Solana, 0,000005 SOL por assinatura — fração de centavo, cobrada mesmo se a transação falhar.',
        'Pago o priority fee, 0,001 SOL no padrão, para a transação ser incluída mais rápido.',
        'Pago a gorjeta de MEV, 0,001 SOL no padrão, que compra proteção contra ataque de sandwich.',
        'Pago a taxa da plataforma, 0,95% líquido no nível de entrada — a única camada que costuma ser anunciada.',
        'Pago a taxa da pool, de 0,25% numa AMM madura a 1,25% na bonding curve — normalmente a maior camada numa compra de token novo.',
        'Recebo o token, já descontada a diferença de preço (slippage), que é custo à parte e não entra nesta conta.',
      ],
    },
    {
      id: 'slippage-mal-configurado',
      aba: 'configuracoes',
      titulo: 'O que acontece quando o slippage está mal configurado',
      legenda: 'Slippage alto numa pool rasa abre espaço para preço ruim e para ataque de bot.',
      codigoMermaid:
        'flowchart TD\n' +
        '  A[Configuro slippage muito alto] --> B{Pool tem liquidez rasa}\n' +
        '  B -- Sim --> C[Aceito preco muito pior]\n' +
        '  C --> D[Bot faz sandwich e lucra]\n' +
        '  D --> E[Recebo menos token]\n' +
        '  B -- Nao --> F[Impacto menor mas ainda perco]',
      versaoEmTexto: [
        'Configuro um slippage muito alto, por exemplo 40%.',
        'Se a pool é rasa, a transação aceita um preço muito pior do que o cotado.',
        'Isso abre espaço para um bot fazer um ataque de sandwich, comprando antes e vendendo depois de mim.',
        'O bot lucra com a diferença que eu autorizei ao deixar o slippage tão folgado.',
        'Recebo bem menos token do que esperava.',
        'No outro extremo, slippage baixo demais numa memecoin volátil faz a transação reverter com "slippage exceeded" — perco a taxa de rede e a oportunidade.',
      ],
    },
    {
      id: 'fluxo-de-decisao',
      aba: 'processo',
      titulo: 'Do token visto à posição encerrada',
      legenda: 'O trajeto completo, com dois pontos onde o processo termina em "não opero".',
      codigoMermaid:
        'flowchart TD\n' +
        '  A[Vi um token novo] --> B{Passou na checagem}\n' +
        '  B -- Nao --> C[Nao opero]\n' +
        '  B -- Sim --> D[Defino tese e invalidacao]\n' +
        '  D --> E{Tese esta clara}\n' +
        '  E -- Nao --> C\n' +
        '  E -- Sim --> F[Defino tamanho e entro]\n' +
        '  F --> G[Saio em degraus]\n' +
        '  G --> H[Encerrei a posicao]',
      versaoEmTexto: [
        'Vejo um token novo e decido investigar.',
        'Passo o token pelo Checklist antes de comprar: endereço, contrato, concentração de holders. Se falhar, não opero — o processo termina aqui.',
        'Se a checagem passa, defino a tese de entrada e o ponto de invalidação antes de cogitar comprar.',
        'Se não consigo deixar a tese e a invalidação claras e objetivas, também não opero — o processo termina aqui.',
        'Se a tese está clara, defino o tamanho da posição e entro.',
        'Acompanho a posição e saio em degraus, conforme o plano definido antes da entrada.',
        'Encerro a posição.',
      ],
    },
  ],

  // ---------------------------------------------------------------------------
  // Quiz
  // ---------------------------------------------------------------------------

  // Por que cada alternativa errada do quiz não serve (o quiz mostra a da resposta escolhida).
  porqueErradas: {
    q1: {
      a: 'Carteira criada nos servidores da plataforma não é só sua: quem tem as chaves tem o dinheiro.',
      c: 'A blockchain não trava nada: ela executa o que a chave assina.',
      d: 'Alguém sempre controla — quem tem as chaves.',
    },
    q2: {
      a: 'Slippage não muda a taxa; muda o preço que você aceita.',
      b: 'Slippage alto é o contrário de garantia: autoriza um preço pior.',
      d: 'Muda, e muito: numa pool rasa, 40% abre espaço para um ataque de sandwich.',
    },
    q3: {
      a: 'Ordem guardada num servidor não está na blockchain; se o servidor cai, ninguém dispara.',
      c: 'A blockchain só executa o que foi assinado e enviado; essa ordem nunca chegou lá.',
      d: 'Ela não vira ordem de mercado sozinha: simplesmente não dispara.',
    },
    q4: {
      a: 'A taxa anunciada é a menor fatia; rede, prioridade, gorjeta e pool vêm à parte.',
      b: 'A taxa da pool é cobrada à parte, pela própria pool.',
      d: 'A taxa de rede da Solana é fração de centavo, e não é a taxa anunciada.',
    },
    q5: {
      a: 'Permissão ilimitada é exatamente o mecanismo dos drainers do Módulo 1.',
      c: 'Aprovar não altera a taxa de rede das próximas transações.',
      d: 'Uma aprovação não afeta a velocidade da blockchain.',
    },
    q6: {
      a: 'Não é questão de taxa: é tempo — o bot compra antes de o humano ver o token.',
      c: 'Não precisa de informação secreta: velocidade basta.',
      d: 'O humano tem carteira; só chega depois.',
    },
    q7: {
      a: 'A rede não fica com o valor da compra: a transação reverte e você perde só a taxa de rede.',
      c: 'A plataforma não travou: a transação chegou e foi recusada pelo limite que você definiu.',
      d: 'Não tem relação com a taxa da plataforma: o preço andou além do seu limite.',
    },
    q8: {
      a: 'Print de lucro não é registro: falta data, valor em reais e custo de aquisição.',
      c: 'A plataforma não apura o imposto por você.',
      d: 'O ganho é apurado operação por operação, não pelo saldo do fim do ano.',
    },
  },

  quiz: [
    {
      id: 'q1',
      pergunta:
        'Você depositou seu dinheiro numa carteira interna criada pela plataforma. Quem controla esse dinheiro na prática?',
      alternativas: [
        { id: 'a', texto: 'Só você, sempre' },
        { id: 'b', texto: 'A plataforma, porque as chaves ficam nos servidores dela' },
        { id: 'c', texto: 'A blockchain, que trava o dinheiro' },
        { id: 'd', texto: 'Ninguém controla' },
      ],
      correta: 'b',
      explicacao:
        'Em modelo custodial, a carteira vive nos servidores da plataforma: quem tem as ' +
        'chaves tem o dinheiro, e um vazamento ou má-fé pode drenar tudo. Em terminal ' +
        'não-custodial é o oposto — a semente é sua e exportável, e é isso que você deve ' +
        'confirmar na documentação oficial antes de depositar qualquer coisa.',
    },
    {
      id: 'q2',
      pergunta: 'Você configurou slippage de 40% numa pool rasa. O que provavelmente acontece?',
      alternativas: [
        { id: 'a', texto: 'A transação fica mais barata' },
        { id: 'b', texto: 'Você garante o melhor preço' },
        { id: 'c', texto: 'Você aceita um preço muito pior e vira alvo fácil de bots' },
        { id: 'd', texto: 'Nada muda' },
      ],
      correta: 'c',
      explicacao:
        'Slippage é quanta variação de preço você autoriza; um número alto numa pool rasa ' +
        'deixa a execução acontecer a um preço muito pior e reduz a proteção contra ' +
        'sandwich, porque é justamente o slippage apertado que corta a margem do atacante. ' +
        'O erro oposto — slippage baixo demais numa memecoin volátil — faz a transação ' +
        'falhar em vez de proteger.',
    },
    {
      id: 'q3',
      pergunta:
        'Uma ordem limite que a plataforma segura fora da blockchain até o preço bater: o que acontece se a plataforma cair?',
      alternativas: [
        { id: 'a', texto: 'A ordem executa sozinha na blockchain' },
        { id: 'b', texto: 'A ordem pode não ser executada, porque dependia do servidor' },
        { id: 'c', texto: 'A blockchain executa por você' },
        { id: 'd', texto: 'A ordem vira ordem de mercado' },
      ],
      correta: 'b',
      explicacao:
        'Uma ordem que depende de um servidor para disparar só funciona enquanto aquele ' +
        'servidor estiver de pé — diferente de uma ordem já assinada e postada on-chain. ' +
        'Atenção: no caso do Axiom especificamente, qual dos dois modelos é usado NÃO está ' +
        'documentado oficialmente, e é por isso que a orientação do módulo é testar com ' +
        'valor mínimo antes de confiar numa ordem limite.',
    },
    {
      // REESCRITA. A versão original perguntava qual custo é o maior e dava "a taxa
      // da plataforma" como correta — o que é falso numa compra pequena na bonding
      // curve (plataforma R$0,94 < fixos R$1,03 < pool R$1,24). A pergunta agora
      // testa o que é de fato incontestável: o que a taxa anunciada omite.
      id: 'q4',
      pergunta: 'A taxa anunciada de um terminal (por volta de 1%) cobre o quê?',
      alternativas: [
        { id: 'a', texto: 'Tudo que você paga na operação' },
        { id: 'b', texto: 'A taxa da plataforma e a taxa da pool' },
        { id: 'c', texto: 'Só a fatia da plataforma — rede, prioridade, gorjeta e pool são à parte' },
        { id: 'd', texto: 'Só a taxa de rede da Solana' },
      ],
      correta: 'c',
      explicacao:
        'O número anunciado é apenas a fatia da plataforma. Priority fee e gorjeta de MEV ' +
        '(0,001 SOL cada no padrão) e a taxa da pool (0,25% a 1,25%) são cobrados à parte. ' +
        'Numa compra pequena de token novo, a taxa da plataforma chega a ser a MENOR das ' +
        'camadas — o custo total pode passar de três vezes o número anunciado.',
    },
    {
      id: 'q5',
      pergunta: 'Você ligou a aprovação automática com permissão ilimitada para um contrato. Qual é o risco?',
      alternativas: [
        { id: 'a', texto: 'Nenhum, é só conveniência' },
        { id: 'b', texto: 'O contrato pode mover aquele token da sua carteira sem pedir nova assinatura' },
        { id: 'c', texto: 'A taxa de rede aumenta' },
        { id: 'd', texto: 'A blockchain fica mais lenta' },
      ],
      correta: 'b',
      explicacao:
        'Uma aprovação ilimitada dá ao contrato permissão contínua de gastar aquele token, ' +
        'sem precisar de nova autorização sua. Se ele for malicioso ou for comprometido ' +
        'depois, o saldo pode ser drenado — é exatamente o mecanismo dos drainers do Módulo ' +
        '1, e a defesa é a mesma: revisar e revogar aprovações periodicamente.',
    },
    {
      id: 'q6',
      pergunta: 'Por que um humano não compete com um bot de sniping no lançamento de um token?',
      alternativas: [
        { id: 'a', texto: 'O humano paga mais taxa' },
        { id: 'b', texto: 'O bot age em dezenas de milissegundos, antes de qualquer clique humano' },
        { id: 'c', texto: 'O bot tem informação secreta sempre' },
        { id: 'd', texto: 'O humano não tem carteira' },
      ],
      correta: 'b',
      explicacao:
        'A disputa se decide abaixo de um segundo, com transações pré-assinadas rodando em ' +
        'infraestrutura colada à produção de blocos; um humano leva de 30 a 60 segundos do ' +
        '"vi a informação" até a transação confirmada. E a janela só encolheu: em 21 de ' +
        'agosto de 2026 a Solana reduziu o slot de 400 ms para 350 ms.',
    },
    {
      id: 'q7',
      pergunta: 'Sua transação chegou à blockchain e reverteu com "slippage exceeded". O que aconteceu?',
      alternativas: [
        { id: 'a', texto: 'A rede roubou seu dinheiro' },
        { id: 'b', texto: 'O preço se moveu além do slippage que você aceitou, e a rede cancelou' },
        { id: 'c', texto: 'A plataforma travou' },
        { id: 'd', texto: 'Você não pagou a taxa da plataforma' },
      ],
      correta: 'b',
      explicacao:
        'Quando o preço varia mais que o seu limite entre o envio e a execução, o swap ' +
        'reverte para não te entregar um preço pior que o autorizado — você perde a taxa de ' +
        'rede, não o valor da compra. Vale distinguir do outro problema parecido: falha por ' +
        'priority fee é a transação não ter sido incluída a tempo, que é coisa diferente.',
    },
    {
      id: 'q8',
      pergunta: 'Para o imposto de renda no Brasil, o que você precisa guardar de cada operação?',
      alternativas: [
        { id: 'a', texto: 'Só o print do lucro' },
        { id: 'b', texto: 'Data, valor em reais e o custo de aquisição de cada compra e venda' },
        { id: 'c', texto: 'Nada, a plataforma faz tudo' },
        { id: 'd', texto: 'Só o saldo final do ano' },
      ],
      correta: 'b',
      explicacao:
        'O ganho é apurado operação por operação, então data, valor em reais e custo de ' +
        'aquisição são o mínimo — e a obrigação de registrar nasce na primeira operação, ' +
        'não quando aparece lucro. Como tudo fica on-chain, o histórico é sempre ' +
        'recuperável pelo endereço da carteira num explorador, mesmo que o terminal não ' +
        'exporte nada.',
    },
  ],

  // ---------------------------------------------------------------------------
  // Itens que a pesquisa NÃO conseguiu confirmar em fonte confiável
  // ---------------------------------------------------------------------------
  naoVerificado: [
    {
      titulo: 'Ordem limite: fica on-chain ou depende do servidor da plataforma?',
      texto:
        'A documentação oficial do Axiom descreve a ordem limite e diz que você pode "se ' +
        'afastar da tela", mas não afirma se a ordem descansa na blockchain ou se um ' +
        'servidor monitora o preço e dispara. A narrativa de "monitores on-chain 24/7" ' +
        'aparece só em sites clones e afiliados. Teste com valor mínimo antes de confiar.',
    },
    {
      titulo: 'A frase-semente tem 12 palavras?',
      texto:
        'Várias fontes de terceiros afirmam que sim, mas a documentação oficial fala em ' +
        '"recovery phrase" sem citar o número de palavras. O que ESTÁ confirmado ' +
        'oficialmente é o que importa: a frase é mostrada no cadastro, acessível a qualquer ' +
        'momento nas configurações, e importável em carteiras externas.',
    },
    {
      titulo: 'Exportação de histórico em CSV para fins fiscais',
      texto:
        'Não há nenhuma página na documentação oficial do Axiom sobre exportar CSV ou gerar ' +
        'relatório fiscal. A página de portfólio descreve ver o histórico no app e dá links ' +
        'para o explorador de blocos. Não conte com essa exportação sem confirmar você ' +
        'mesmo — e lembre que o histórico on-chain sempre pode ser exportado do explorador.',
    },
    {
      titulo: 'Valor real da gorjeta de MEV no momento',
      texto:
        'O valor mínimo do Jito (1.000 lamports, ou 0,000001 SOL) e o padrão do Axiom (0,001 SOL) estão ' +
        'confirmados, mas o "tip floor" ao vivo em setembro de 2026 não pôde ser lido ' +
        'diretamente na pesquisa. Os percentis citados por aí vêm de um exemplo estático da ' +
        'documentação, datado de 2024.',
    },
    {
      titulo: 'Quanto é preciso operar para chegar ao nível de taxa mais barato',
      texto:
        'A tabela de níveis do Axiom (0,95% até 0,75%) é oficial, mas os limiares de volume ' +
        'de cada nível não são publicados por nenhuma fonte confiável. Ou seja: não dá para ' +
        'calcular quanto volume seria necessário para pagar menos.',
    },
    {
      titulo: 'Como o desconto de indicação se combina com a devolução em SOL',
      texto:
        'A documentação oficial concede 10% de desconto nas taxas por link de indicação, ' +
        'mas não documenta como isso se soma à devolução de 0,05%–0,25%. Qualquer "taxa ' +
        'líquida combinada" única que você encontrar é não confirmada. Códigos de terceiros ' +
        'anunciando 15% ou 20% divergem do número oficial.',
    },
    {
      titulo: 'Texto dos Termos de Uso',
      texto:
        'A linguagem jurídica sobre custódia só apareceu em resultado de busca, num ' +
        'subdomínio bloqueado a acesso automatizado. A página não pôde ser aberta na ' +
        'pesquisa. O modelo não-custodial está confirmado pela FAQ e pela página de ' +
        'cadastro, mas o texto contratual em si continua não verificado.',
    },
    {
      titulo: 'Números de receita, volume e participação de mercado',
      texto:
        'Números como "mais de 50% do mercado" ou "US$390 milhões de receita" vêm de ' +
        'reportagem, de agregadores e da própria empresa, sem auditoria independente. São ' +
        'contexto de negócio, não fato verificável — e não afetam nenhuma das contas deste ' +
        'módulo.',
    },
    {
      titulo: 'Cotação usada nos exemplos em reais',
      texto:
        'As contas em reais assumem SOL ≈ R$512, obtido por SOL→USD × USD→BRL do Banco ' +
        'Central em 04/09/2026. Agregadores de conversão direta SOL→BRL mostraram valores ' +
        'muito dispersos, provavelmente por cache velho. Os valores em SOL são os que ' +
        'importam; reconfira os reais.',
    },
  ],

  // ---------------------------------------------------------------------------
  // Fontes
  // ---------------------------------------------------------------------------
  fontes: [
    { titulo: 'Adams, Chan, Markovich & Wan — "Don\'t Let MEV Slip" (Uniswap Labs, custo real de negociar memecoin)', url: 'https://arxiv.org/abs/2309.13648', consultadoEm: '11/09/2026' },
    { titulo: 'Axiom — FAQs (custódia, infraestrutura, bundle checker)', url: 'https://docs.axiom.trade/faqs', consultadoEm: '06/09/2026' },
    { titulo: 'Axiom — Signup (frase de recuperação exportável)', url: 'https://docs.axiom.trade/getting-started/signup', consultadoEm: '06/09/2026' },
    { titulo: 'Axiom — Axiom Fees (tabela de níveis 0,95%–0,75%)', url: 'https://docs.axiom.trade/getting-started/fees/axiom-fees', consultadoEm: '06/09/2026' },
    { titulo: 'Axiom — Solana Fees (priority fee, gorjeta, modos de MEV)', url: 'https://docs.axiom.trade/getting-started/fees/solana-fees', consultadoEm: '06/09/2026' },
    { titulo: 'Axiom — Limit Orders', url: 'https://docs.axiom.trade/axiom/swap/limit-orders', consultadoEm: '06/09/2026' },
    { titulo: 'Axiom — Deposit (taxa de perpétuos via Hyperliquid)', url: 'https://docs.axiom.trade/perpetuals/deposit', consultadoEm: '06/09/2026' },
    { titulo: 'Turnkey — Case study Axiom (infraestrutura de chaves)', url: 'https://www.turnkey.com/case-studies/axiom-global-defi-trading-platform', consultadoEm: '06/09/2026' },
    { titulo: 'Solana Docs — Fee Structure (taxa-base, cobrada mesmo em falha)', url: 'https://solana.com/docs/core/fees/fee-structure', consultadoEm: '06/09/2026' },
    { titulo: 'Solana Developers — MEV Protection (slippage como defesa)', url: 'https://solana.com/developers/guides/advanced/mev-protection', consultadoEm: '06/09/2026' },
    { titulo: 'Solana — Reduced Slot Times (SIMD-0525, 400 ms → 350 ms)', url: 'https://solana.com/upgrades/reduced-slot-times', consultadoEm: '06/09/2026' },
    { titulo: 'Solana Docs — Rent exemption (depósito de conta de token)', url: 'https://solana.com/docs/rpc/http/getminimumbalanceforrentexemption', consultadoEm: '06/09/2026' },
    { titulo: 'pump.fun — Fees (bonding curve 1,25%, decomposição oficial)', url: 'https://pump.fun/docs/fees', consultadoEm: '06/09/2026' },
    { titulo: 'pump.fun — Bonding curve', url: 'https://pump.fun/docs/bonding-curve', consultadoEm: '06/09/2026' },
    { titulo: 'Raydium — Protocol Fees (0,25% padrão)', url: 'https://docs.raydium.io/ray/protocol-fees', consultadoEm: '06/09/2026' },
    { titulo: 'Jupiter — Manual mode (agregador, sem taxa de protocolo no swap básico)', url: 'https://docs.jup.ag/user-docs/trade/swap/manual-mode', consultadoEm: '06/09/2026' },
    { titulo: 'Jito — Low latency transaction send (mínimo de gorjeta)', url: 'https://docs.jito.wtf/lowlatencytxnsend', consultadoEm: '13/09/2026' },
    { titulo: 'Solscan — Why did my transaction fail (slippage exceeded)', url: 'https://info.solscan.io/why-did-my-transaction-fail', consultadoEm: '06/09/2026' },
    { titulo: 'Alchemy — Associated Token Account (depósito reembolsável)', url: 'https://www.alchemy.com/overviews/associated-token-account', consultadoEm: '06/09/2026' },
    { titulo: 'CoinDesk — ZachXBT alleges Axiom employee conducted insider trading (26/02/2026)', url: 'https://www.coindesk.com/markets/2026/02/26/zachxbt-alleges-axiom-employee-conducted-insider-trading', consultadoEm: '06/09/2026' },
    { titulo: 'The Block — Axiom hits $100 million in revenue (sem token nativo)', url: 'https://www.theblock.co/post/355676/axiom-exchange-hits-100-million-in-revenue-just-four-months-after-launch', consultadoEm: '06/09/2026' },
    { titulo: 'Blockworks — Axiom, Y Combinator e o modelo de terminal web', url: 'https://blockworks.com/news/axiom-ycombinator-startup-solana-memecoin-revenue-10m', consultadoEm: '06/09/2026' },
    { titulo: 'DefiLlama — Axiom fees, revenue & volume (dados on-chain)', url: 'https://defillama.com/protocol/axiom', consultadoEm: '06/09/2026' },
    { titulo: 'PhishDestroy — domínios de phishing imitando a plataforma', url: 'https://phishdestroy.io/domain/auth-axiom.trade', consultadoEm: '06/09/2026' },
    { titulo: 'Phantom — Revoke token approvals', url: 'https://help.phantom.com/hc/en-us/articles/19142125651731-Revoke-token-approvals', consultadoEm: '06/09/2026' },
    { titulo: 'Banco Central do Brasil — conversão de moedas (USD/BRL em 04/09/2026)', url: 'https://www.bcb.gov.br/en/currencyconversion', consultadoEm: '06/09/2026' },
    { titulo: 'Receita Federal — regulamentação de criptoativos e o programa DeCripto', url: 'https://www.gov.br/fazenda/pt-br/assuntos/noticias/2025/novembro/receita-federal-atualiza-regulamentacao-de-criptoativos-para-adapta-la-ao-padrao-internacional', consultadoEm: '06/09/2026' },
  ],
};
