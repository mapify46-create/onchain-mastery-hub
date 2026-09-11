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
      paragrafos: [
        'Um terminal de execução on-chain é uma camada de software — um site ou app — ' +
          'que fica entre a sua carteira e a DEX (a exchange descentralizada onde a troca ' +
          'realmente acontece). Ele não substitui a blockchain e não guarda uma lista de ' +
          'preços própria: o que ele faz é montar a transação para você, aplicar as suas ' +
          'configurações (slippage, prioridade, proteção de MEV) e mandar você assinar.',
        'A confusão mais comum de iniciante é achar que o terminal "é" a exchange. Não é. ' +
          'A troca acontece numa pool de liquidez, num contrato inteligente que existe ' +
          'independentemente dele. Se o terminal sair do ar amanhã, a pool continua lá e ' +
          'seus tokens continuam na sua carteira — desde que as chaves sejam suas, que é ' +
          'exatamente o assunto da próxima aba.',
        'O que você compra ao usar um terminal é conveniência: descoberta de tokens novos, ' +
          'gráficos, dados de holders, botões de compra rápida, rastreamento de carteiras. ' +
          'Você não compra preço melhor. Isso precisa ficar claro desde já, porque é o ' +
          'ponto onde o marketing da categoria mais escorrega.',
      ],
    },
    {
      id: 'as-tres-camadas',
      aba: 'terminal',
      titulo: 'As três camadas — e o que cada uma cobra',
      paragrafos: [
        'Existem três formas de fazer a mesma troca, e cada camada que você acrescenta é ' +
          'uma taxa a mais. Entender isso é o que permite responder à pergunta "por que ' +
          'estou pagando isso?" em vez de simplesmente pagar.',
        'Ir direto na DEX (Raydium, Orca, PumpSwap) significa interagir com a pool de ' +
          'liquidez pela interface dela. Você paga a taxa da pool e mais nada — no padrão ' +
          'da Raydium, 0,25%, dos quais 0,22% vão para quem forneceu a liquidez ' +
          '(docs.raydium.io/ray/protocol-fees).',
        'Usar um agregador (o Jupiter é o exemplo mais conhecido na Solana) acrescenta uma ' +
          'busca: ele varre dezenas de DEXs procurando a melhor rota para a sua ordem. No ' +
          'modo manual, o Jupiter não cobra taxa de protocolo pelo swap básico — você ' +
          'segue pagando a taxa da DEX por baixo (docs.jup.ag/user-docs/trade/swap/manual-mode).',
        'Usar um terminal (Axiom, Photon, BullX) acrescenta a taxa da plataforma POR CIMA ' +
          'de tudo isso. No Axiom, a documentação oficial lista de 0,95% líquido no nível ' +
          'de entrada a 0,75% no topo (docs.axiom.trade/getting-started/fees/axiom-fees). ' +
          'Essa taxa não compra preço melhor: compra a interface e as ferramentas.',
      ],
    },
    {
      id: 'alternativas-da-categoria',
      aba: 'terminal',
      titulo: 'Não existe uma opção única',
      paragrafos: [
        'O Axiom é usado neste módulo como exemplo concreto porque é preciso mostrar uma ' +
          'interface real, com números reais, para o conteúdo não virar abstração. Ele não ' +
          'é indicação, e não é a única plataforma da categoria. Saber que há alternativas ' +
          'importa por um motivo prático: evita você achar que "operar on-chain" e "usar ' +
          'aquele site" são a mesma coisa.',
        'Uma linha neutra de cada uma que estava ativa na data desta pesquisa, sem ranking ' +
          'e sem comparação de qualidade:',
      ],
      lista: [
        'Photon — terminal web para Solana, com foco em escanear e executar manualmente.',
        'BullX (NEO) — terminal com suporte a mais de uma rede.',
        'Trojan — opera dentro do Telegram: rastrear, negociar, copiar operações.',
        'Bonkbot — bot de Telegram, foco em simplicidade, só Solana.',
        'GMGN — web e Telegram, cobertura multi-rede, foco em copy trading e anti-MEV.',
        'Banana Gun, Maestro e Padre — outros nomes ativos na categoria em 2026.',
      ],
    },

    // ================================ CUSTÓDIA ================================
    {
      id: 'custodia-do-axiom',
      aba: 'custodia',
      titulo: 'Quem guarda as chaves',
      paragrafos: [
        'Esta é a primeira pergunta a fazer sobre qualquer plataforma, e a resposta muda ' +
          'completamente o seu risco. O Módulo 1 já estabeleceu a regra: "not your keys, ' +
          'not your coins" — se as chaves não são suas, as moedas não são suas.',
        'No caso do Axiom, a documentação oficial afirma que o modelo é não-custodial. A ' +
          'FAQ diz, textualmente, que os ativos que você tem "estão sempre sob o seu ' +
          'controle e de mais ninguém", e que os fundos e transações são inteiramente ' +
          'on-chain (docs.axiom.trade/faqs). A infraestrutura de chaves é operada por uma ' +
          'empresa terceirizada, a Turnkey, que gera e usa as chaves dentro de ambientes ' +
          'isolados e declara que nenhuma chave privada é exposta nem a ela nem ao ' +
          'operador do app (turnkey.com/case-studies/axiom-global-defi-trading-platform).',
        'A prova prática mais importante está na página oficial de cadastro: ela instrui o ' +
          'usuário a acessar a frase de recuperação a qualquer momento nas configurações e ' +
          'recomenda importá-la numa carteira comum como Phantom, Rabby ou Solflare, "para ' +
          'garantir que você sempre tenha acesso direto aos seus fundos sob quaisquer ' +
          'circunstâncias" (docs.axiom.trade/getting-started/signup). Uma plataforma que ' +
          'te entrega a semente não está guardando o seu dinheiro.',
        'Na prática isso significa duas coisas ao mesmo tempo. A boa: não existe risco de ' +
          'contraparte no trading spot — não há um saldo depositado dentro da empresa que ' +
          'possa sumir com ela. A pesada: a responsabilidade de segurança é 100% sua. Não ' +
          'há suporte que recupere fundos perdidos, reverta uma assinatura ou desfaça uma ' +
          'operação ruim. A primeira coisa a fazer ao usar qualquer terminal não-custodial ' +
          'é exportar a semente e guardá-la offline, como o Módulo 1 ensinou.',
      ],
    },
    {
      id: 'o-risco-real-e-o-frontend',
      aba: 'custodia',
      titulo: 'O risco real não é a custódia, é o app sair do ar',
      paragrafos: [
        'Se as chaves são suas, qual é o risco então? É operacional. O terminal é o seu ' +
          'painel de controle, e um painel de controle pode travar exatamente no minuto em ' +
          'que você precisa dele.',
        'Aconteceu de forma documentada em 28 e 29 de agosto de 2025: o pump.fun publicou ' +
          'uma mudança na API sem avisar as ferramentas que dependiam dela, e usuários do ' +
          'Axiom ficaram horas sem conseguir vender, até a mudança ser revertida. Traders ' +
          'relataram perdas concretas no chat da plataforma. Quem tinha a semente exportada ' +
          'conseguiu contornar: abriu a carteira em outro lugar e vendeu direto no site do ' +
          'pump.fun ou no Jupiter.',
        'Essa é a lição inteira, e ela é mecânica, não moral: exportar a semente não é ' +
          'burocracia de segurança, é o seu plano B operacional. Um terminal fora do ar com ' +
          'a sua semente guardada é um inconveniente. Um terminal fora do ar sem ela é uma ' +
          'posição que você não consegue encerrar.',
      ],
    },
    {
      id: 'incidente-fevereiro-2026',
      aba: 'custodia',
      titulo: 'O incidente de fevereiro de 2026 e o que ele ensina',
      paragrafos: [
        'Em 26 de fevereiro de 2026, o investigador on-chain ZachXBT publicou uma ' +
          'investigação alegando que funcionários do Axiom abusaram de ferramentas internas ' +
          'de suporte para consultar carteiras e histórico de usuários ao longo de cerca de ' +
          'dez meses. Em poucas horas a própria empresa confirmou publicamente: disse estar ' +
          '"chocada e decepcionada" ao saber que membros da equipe usaram indevidamente as ' +
          'ferramentas internas de suporte para consultar carteiras de usuários, removeu o ' +
          'acesso e prometeu investigar (CoinDesk, 26/02/2026).',
        'A distinção mecânica aqui é o que interessa para o módulo, e ela é sutil: isso ' +
          'NÃO foi invasão de contrato, roubo de chaves nem saque de fundos. O painel ' +
          'interno dava visibilidade, não controle. Nenhum fundo de usuário foi reportado ' +
          'como roubado e nenhuma chave privada como exposta. A arquitetura não-custodial ' +
          'continuou fazendo o que promete.',
        'Mas é justamente por isso que o caso é útil. Ele mostra que "não-custodial" ' +
          'protege o seu dinheiro e não protege a sua privacidade. Existe uma classe ' +
          'inteira de risco — abuso de privilégio interno — que a autocustódia não resolve, ' +
          'e que não aparece em nenhuma página de marketing. A conclusão prática não é ' +
          '"fuja desta plataforma": é não tratar nenhum terminal como seguro por desenho, e ' +
          'assumir que o que você faz numa plataforma é visível para quem a opera.',
      ],
    },

    // ================================== TAXAS ==================================
    {
      id: 'a-taxa-anunciada-nao-e-o-custo',
      aba: 'taxas',
      titulo: 'A taxa anunciada não é o que você paga',
      paragrafos: [
        'Toda plataforma da categoria anuncia um número — "1%", "a partir de 0,75%". Esse ' +
          'número é honesto no que diz e enganoso no que omite: ele é apenas a fatia da ' +
          'plataforma. Uma compra tem cinco camadas de custo, e a taxa anunciada é uma ' +
          'delas.',
        'As outras quatro são: a taxa-base da rede Solana, fixa em 5.000 lamports por ' +
          'assinatura (0,000005 SOL) e cobrada mesmo quando a transação falha ' +
          '(solana.com/docs/core/fees); o priority fee, um pagamento extra ao validador ' +
          'para a transação entrar mais rápido; a gorjeta de MEV (o "bribe", via Jito), que ' +
          'compra proteção contra ser atacado por bots; e a taxa da pool onde a troca ' +
          'acontece.',
        'Os defaults do próprio Axiom para as duas configuráveis são 0,001 SOL de priority ' +
          'fee e 0,001 SOL de gorjeta (docs.axiom.trade/getting-started/fees/solana-fees). ' +
          'Essas duas não são receita da plataforma — vão para validadores. Mas saem do seu ' +
          'bolso do mesmo jeito, e são justamente as que não aparecem no número anunciado.',
        'Repare no que isso significa: numa compra pequena, a taxa da plataforma pode ser ' +
          'a MENOR das camadas. Não a maior. É o contrário do que a intuição sugere, e é ' +
          'por isso que a matriz abaixo existe.',
      ],
    },
    {
      id: 'custo-fixo-pesa-mais-em-ordem-pequena',
      aba: 'taxas',
      titulo: 'Por que ordem pequena é mecanicamente penalizada',
      paragrafos: [
        'Parte do custo é percentual e parte é fixa. Essa diferença é o que faz a mesma ' +
          'operação custar percentuais completamente diferentes conforme o tamanho.',
        'O priority fee e a gorjeta somam 0,002 SOL nos valores padrão. Isso é fixo: custa ' +
          'igual se você move o equivalente a R$50 ou a R$5.000. Numa ordem de R$100, esses ' +
          'mesmos 0,002 SOL representam cerca de 1% do valor. Numa ordem dez vezes maior, ' +
          'representam 0,1%. A conta é a mesma; o peso é dez vezes menor.',
        'E vale lembrar de um detalhe que a matriz não mostra: toda operação é ida e volta. ' +
          'Você paga esse conjunto de taxas ao comprar e paga de novo ao vender — inclusive ' +
          'quando a operação dá errado e você sai no prejuízo.',
        'A conclusão é mecânica e não é conselho de tamanho de posição: existe um valor ' +
          'abaixo do qual o atrito das taxas domina o resultado. Saber calcular onde fica ' +
          'esse ponto é diferente de receber um número pronto de alguém.',
      ],
    },
    {
      id: 'o-venue-muda-o-custo',
      aba: 'taxas',
      titulo: 'O mesmo terminal cobra diferente conforme onde o token está',
      paragrafos: [
        'A quinta camada — a taxa da pool — não depende do terminal. Depende de onde o ' +
          'token está no ciclo de vida dele, e a variação é grande o bastante para mudar a ' +
          'conta inteira.',
        'Um token ainda na bonding curve do pump.fun paga 1,25% de taxa de pool, decomposta ' +
          'oficialmente em 0,300% para o criador do token e 0,95% para o protocolo ' +
          '(pump.fun/docs/fees). Depois de "graduar" para uma pool canônica do PumpSwap, ' +
          'continua em 1,25% enquanto o market cap é pequeno, e cai por faixas conforme ' +
          'cresce. Numa AMM madura como a Raydium, a taxa padrão é 0,25% ' +
          '(docs.raydium.io/ray/protocol-fees).',
        'Ou seja: a mesma ordem, no mesmo terminal, no mesmo dia, custa cinco vezes mais em ' +
          'taxa de pool se o token for novo. Isso não é um defeito do terminal — é onde a ' +
          'troca está acontecendo. Mas é informação que muda a sua conta e que raramente ' +
          'aparece explicada.',
        'Isso não é só taxa anunciada: um estudo da Uniswap Labs sobre 534 mil negociações ' +
          'reais mediu o custo total efetivo (taxa, deslizamento de preço e o que bots de ' +
          'MEV extraem) em 140 pontos-base por dólar negociado numa memecoin popular, contra ' +
          '22 pontos-base num par entre duas moedas estáveis — 6 vezes mais caro, numa pool ' +
          'mais funda do que a maioria das de memecoin recém-lançada. O mesmo estudo mediu ' +
          'a chance de sofrer deslizamento de preço causado por um bot adversário como ' +
          'cerca de 80% maior ao negociar a memecoin do que ao negociar a moeda madura ' +
          '(Adams, Chan, Markovich & Wan, "Don\'t Let MEV Slip", Financial Cryptography 2024).',
      ],
    },

    // ============================== CONFIGURAÇÕES ==============================
    {
      id: 'tipos-de-ordem',
      aba: 'configuracoes',
      titulo: 'Tipos de ordem e a pergunta que ninguém responde',
      paragrafos: [
        'A ordem a mercado é o swap padrão: compra ou vende ao preço atual, na hora. É o ' +
          'que acontece quando você clica no botão de comprar. A ordem limite executa só ' +
          'quando o preço atinge o nível que você definiu — a documentação oficial descreve ' +
          'que você pode definir um preço preciso e "se afastar da tela" ' +
          '(docs.axiom.trade/axiom/swap/limit-orders). Há também compras programadas em ' +
          'faixas (DCA, ou ordens em degraus) e, em material de terceiros, menções a ' +
          'stop-loss e take-profit como variações de ordem limite.',
        'Agora a pergunta que decide se você pode confiar numa ordem limite, e que a ' +
          'documentação oficial NÃO responde: a ordem fica registrada na blockchain, ou um ' +
          'servidor da plataforma monitora o preço e dispara a transação quando chega a ' +
          'hora?',
        'A diferença é enorme. Uma ordem que descansa on-chain executa mesmo que a empresa ' +
          'suma. Uma ordem que depende de um servidor executa enquanto aquele servidor ' +
          'estiver de pé — e você já viu, na aba de custódia, que servidores caem. A ' +
          'narrativa de que existem "monitores on-chain 24/7" aparece apenas em sites ' +
          'clones e afiliados, não na documentação oficial.',
        'Enquanto isso não estiver documentado, a postura correta é operacional: não assuma ' +
          'que uma ordem limite dispara com o app fechado. Teste você mesmo, com um valor ' +
          'mínimo, antes de confiar nela para uma posição que importa.',
      ],
    },
    {
      id: 'slippage-priority-mev',
      aba: 'configuracoes',
      titulo: 'As três configurações que quebram a operação',
      paragrafos: [
        'Slippage é quanta variação de preço você autoriza entre o momento em que envia a ' +
          'ordem e o momento em que ela executa. Os dois extremos falham de formas ' +
          'diferentes: baixo demais e a transação reverte com "slippage exceeded" — você ' +
          'perde a taxa de rede e a oportunidade; alto demais e você autoriza ser executado ' +
          'a um preço muito pior, o que numa pool rasa vira um convite. A própria ' +
          'documentação da Solana diz que limitar o slippage é a defesa mais eficaz contra ' +
          'ataques de sandwich (solana.com/developers/guides/advanced/mev-protection).',
        'Priority fee é o pagamento extra ao validador para a sua transação ser incluída ' +
          'mais rápido. Baixo demais em momento de congestionamento significa demora ou ' +
          'falha; alto demais significa pagar caro à toa. O default do Axiom é 0,001 SOL, e ' +
          'a plataforma afirma calcular automaticamente valores recomendados com base nas ' +
          'transações do momento.',
        'A proteção de MEV tem três modos na documentação oficial: Off (exposto a ' +
          'front-running), Reduced (roteia via Jito, com algum risco remanescente) e Secure ' +
          '(só validadores da lista, mais protegido e possivelmente mais lento). A própria ' +
          'documentação recomenda usar o modo Secure sempre que possível.',
        'Existe ainda o botão de compra rápida, que executa um valor pré-configurado num ' +
          'clique só, sem tela de revisão. É conveniente e é exatamente por isso que ele ' +
          'aparece na lista de erros comuns. Nenhuma dessas configurações aumenta chance de ' +
          'lucro: todas controlam apenas se a transação executa, falha ou é explorada.',
      ],
    },
    {
      id: 'ler-a-tela-de-operacao',
      aba: 'configuracoes',
      titulo: 'Ler a tela — e o que ela não prova',
      paragrafos: [
        'A tela de um token num terminal costuma reunir gráfico de preço, market cap, ' +
          'volume, liquidez da pool, número e distribuição de holders, e um feed de ' +
          'transações recentes com link para o explorador de blocos. É bastante informação ' +
          'de uma vez, e o Módulo 3 já ensinou o que procurar nela.',
        'As checagens que importam são as mesmas de lá. Liquidez travada ou queimada: se a ' +
          'LP não está travada, quem criou o token pode retirar a liquidez e sumir. ' +
          'Concentração de holders: poucas carteiras com percentual alto significam risco de ' +
          'despejo. E a detecção de bundles — compras coordenadas no mesmo bloco, que ' +
          'simulam demanda orgânica.',
        'Sobre bundles, vale notar como a própria documentação do Axiom descreve a ' +
          'limitação da ferramenta: se pelo menos quatro transações acontecem no mesmo ' +
          'bloco, elas são sinalizadas como possível bundle, e a documentação admite que ' +
          '"nenhum método de detecção de bundle é 100% infalível — alguns falsos positivos ' +
          'ou bundles não detectados são inevitáveis" (docs.axiom.trade/faqs).',
        'Esse é o enquadramento certo para a tela inteira: ler os painéis reduz surpresa, ' +
          'não garante segurança. Nenhum indicador, sinal social ou rastreamento de carteira ' +
          'é prova de que um token é seguro.',
      ],
    },

    // ================================== ERROS ==================================
    {
      id: 'erros-de-execucao',
      aba: 'erros',
      titulo: 'Os erros que custam dinheiro sem envolver o mercado',
      paragrafos: [
        'Existe uma classe de prejuízo que não tem nada a ver com o token ter subido ou ' +
          'caído. São erros de operação, e a característica deles é que a pessoa sabia a ' +
          'regra e errou mesmo assim, por pressa ou por reflexo.',
        'O mais caro é comprar o token errado. Nomes e tickers podem ser duplicados à ' +
          'vontade — qualquer um cria um token chamado igual ao que está em alta. A regra ' +
          'mecânica que resolve é buscar sempre pelo endereço do contrato verificado, nunca ' +
          'pelo nome. Ticker é apelido; endereço é identidade.',
        'Os outros aparecem na aba de erros com detalhe. Em resumo: slippage alto numa pool ' +
          'rasa, em que a sua própria compra move o preço; quantia errada digitada ou botão ' +
          'de compra rápida ainda configurado no valor da operação anterior; assinar sem ler ' +
          'o que a transação autoriza (o Módulo 1 já mostrou onde isso termina); e perseguir ' +
          'uma vela que já subiu, que é erro de disciplina disfarçado de decisão.',
        'Um erro de fundo, que precede todos os outros: operar na carteira principal. Uma ' +
          'carteira separada só para operar limita o estrago se o dispositivo ou o app forem ' +
          'comprometidos, e não custa nada criar.',
      ],
    },
    {
      id: 'bots-de-sniping',
      aba: 'erros',
      titulo: 'Por que velocidade não é uma disputa que você vença',
      paragrafos: [
        'Bots de sniping são programas que monitoram a blockchain e compram tokens novos ' +
          'em frações de segundo depois que a liquidez é criada. Esta seção não ensina a ' +
          'usar bot: ela existe para calibrar expectativa, porque a expectativa errada aqui ' +
          'custa dinheiro real.',
        'A conta é simples. Um slot na Solana passou de 400 ms para 350 ms em 21 de agosto ' +
          'de 2026, na primeira redução desde o lançamento da rede (SIMD-0525, ' +
          'solana.com/upgrades/reduced-slot-times). Bots reagem na casa das dezenas de ' +
          'milissegundos, com transações pré-assinadas e infraestrutura colada à produção de ' +
          'blocos. Um humano leva de 30 a 60 segundos entre ver a informação e ter a ' +
          'transação confirmada.',
        'O diferencial deles não é inteligência, é infraestrutura. E a consequência prática ' +
          'é desconfortável: quando você vê um token "novo" já subindo, os bots já entraram. ' +
          'Qualquer preço que você consegue no instante do lançamento é um preço que um bot ' +
          'mais rápido decidiu recusar.',
        'Isso vale também para a ideia de automatizar a sua própria reação com inteligência ' +
          'artificial. Uma chamada de modelo leva segundos; a disputa se decide em ' +
          'milissegundos. Colocar uma camada de IA no meio do caminho te deixa mais lento, ' +
          'não mais rápido.',
      ],
    },

    // ================================= PROCESSO =================================
    {
      id: 'registro-para-imposto',
      aba: 'processo',
      titulo: 'Guardar registro desde a primeira operação',
      paragrafos: [
        'A obrigação de registrar nasce na primeira operação, não quando aparece lucro. ' +
          'Isso conecta diretamente com a seção de impostos do Módulo 1 (IN RFB 2.291/2025 ' +
          'e o programa DeCripto).',
        'Sobre exportação de histórico pelo próprio terminal: NÃO VERIFICADO. A ' +
          'documentação oficial do Axiom descreve visualizar o histórico de operações no ' +
          'app e dá links para o Solscan, mas não há nenhuma página oficial sobre exportar ' +
          'CSV ou gerar relatório fiscal. Não conte com isso sem confirmar você mesmo no ' +
          'app.',
        'A boa notícia mecânica é que não depende do terminal. Como todas as transações ' +
          'ficam on-chain, o histórico é sempre recuperável pelo endereço da carteira num ' +
          'explorador de blocos, que permite exportar. Guarde o seu próprio registro — data, ' +
          'valor em reais e custo de aquisição de cada compra e venda.',
        'E o de sempre: isto não é orientação tributária. Guarde o registro e procure um ' +
          'contador.',
      ],
    },
    {
      id: 'do-token-ao-encerramento',
      aba: 'processo',
      titulo: 'Do "vi um token" ao "encerrei a posição"',
      paragrafos: [
        'Este é o fluxo que amarra o módulo inteiro com o Módulo 4. Ele é um processo de ' +
          'disciplina operacional, não um método de achar oportunidade — e a diferença mais ' +
          'importante entre os dois é que este tem saídas pelo caminho.',
        'A ordem dos passos importa, porque cada um deles é uma oportunidade de parar antes ' +
          'de gastar dinheiro:',
      ],
      ordenada: true,
      lista: [
        'Abrir o terminal pelo favorito oficial, nunca por link de anúncio ou rede social — existem domínios de phishing imitando plataformas conhecidas.',
        'Buscar pelo endereço do contrato verificado, não pelo nome nem pelo ticker.',
        'Fazer as checagens do Módulo 3: liquidez da pool, LP travada ou queimada, autoridades do contrato, concentração de holders, bundles, histórico de quem criou.',
        'Escrever a tese antes de comprar, e junto com ela o ponto de invalidação — onde você admite que errou e sai.',
        'Definir o tamanho da posição e conferir o valor no campo, com atenção redobrada se o botão de compra rápida estiver ligado.',
        'Configurar slippage, prioridade e proteção de MEV conscientemente, e fazer uma operação-teste com valor mínimo primeiro.',
        'Sair em degraus, conforme o plano definido antes da entrada — não conforme o que você está sentindo durante.',
      ],
      paragrafosFinais: [
        'E o passo que não é passo: decidir NÃO operar é um resultado legítimo e frequente ' +
          'do processo, não uma falha dele. Se as checagens acendem alerta ou se você não ' +
          'consegue escrever a tese de forma clara, o movimento certo é não clicar. Como o ' +
          'Módulo 2 estabeleceu, a maioria das memecoins vai a zero — passar na maioria das ' +
          'vezes é o comportamento esperado de quem está seguindo o processo, não sinal de ' +
          'que ele está travado.',
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
          quanto: 'Configurável; o padrão do Axiom é 0,001 SOL. O mínimo do Jito é 0,00001 SOL.',
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
        'Faço a checagem de segurança: liquidez, LP travada, concentração de holders, contrato. Se falhar, não opero — o processo termina aqui.',
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
        'O valor mínimo do Jito (0,00001 SOL) e o padrão do Axiom (0,001 SOL) estão ' +
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
    { titulo: 'Jito — Low latency transaction send (mínimo de gorjeta)', url: 'https://docs.jito.wtf/lowlatencytxnsend', consultadoEm: '06/09/2026' },
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
