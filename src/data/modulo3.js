// modulo3.js — conteúdo do Módulo 3 (os dois pilares: social vs. técnico) e o
// catálogo de ferramentas usado pela matriz filtrável.
// Aqui só tem DADOS: nenhuma lógica, nenhum HTML. Para adicionar/trocar uma
// ferramenta ou corrigir um número, mude aqui — a interface se adapta sozinha.

export const modulo3 = {
  id: 'modulo-3',
  titulo: 'Os dois pilares (Social vs. Técnico)',
  resumo:
    'Nenhuma decisão de entrada deveria depender de um sinal só. O pilar social mostra ' +
    'onde a atenção está nascendo; o pilar técnico mostra se o contrato por trás merece ' +
    'confiança. Este módulo apresenta as ferramentas de cada pilar numa matriz filtrável.',

  objetivos: [
    'Entender que a decisão de entrada combina sinal social + checagem técnica.',
    'Reconhecer o papel de cada ferramenta: visualização, execução, checagem ou monitoramento social.',
    'Saber filtrar ferramentas por chain (Solana, EVM, BNB Chain, multi-chain) e por papel.',
    'Conhecer a correção "Axon → Axiom" e o caso do Sigma, que não suporta Solana.',
  ],

  // ---------------------------------------------------------------------------
  // Seções de texto (aba "Visão geral")
  // ---------------------------------------------------------------------------
  secoes: [
    {
      id: 'dois-pilares',
      titulo: 'Por que duas checagens, e não uma só',
      paragrafos: [
        'O pilar social cobre X/Twitter, Discord e Telegram: é onde a atenção nasce, antes ' +
          'de virar preço. Ver uma conta grande interagir com um projeto é um sinal cedo — ' +
          'mas sinal social nenhum prova que o contrato por trás é seguro.',
        'O pilar técnico cobre gráfico, contrato, liquidez e holders: mostra se o que está ' +
          'por trás do hype resiste a uma checagem. Um contrato limpo sem nenhuma atenção ' +
          'também não vale nada — sem atenção não há comprador.',
        'Os dois pilares se completam. Uma tese de entrada (Módulo 4) só fica de pé quando ' +
          'apoiada nos dois ao mesmo tempo: "por que este token está chamando atenção agora" ' +
          '(social) e "por que é seguro entrar nele" (técnico).',
      ],
    },
  ],

  // ---------------------------------------------------------------------------
  // Correção em destaque (mostrada no topo da página, difícil de não ver)
  // ---------------------------------------------------------------------------
  correcaoAxiom: {
    titulo: 'Correção: "Axon" não existe — o nome certo é Axiom',
    texto:
      'O pedido original citava "Axon" como terminal de execução para Solana. Pesquisa ' +
      'dedicada não encontrou nenhum terminal de execução relevante com esse nome. O ' +
      'provável terminal citado é o Axiom Trade: um terminal web não-custodial focado em ' +
      'Solana. Este hub usa "Axiom" em todo o conteúdo e mantém esta correção à vista.',
  },

  // ---------------------------------------------------------------------------
  // Pilar social (aba "Visão geral", seção própria) — inclui a ressalva do J7 Tracker
  // ---------------------------------------------------------------------------
  pilarSocial: {
    titulo: 'Pilar social: monitorar antes de checar',
    paragrafos: [
      'Trackers de tweets e de carteiras servem para detectar cedo quando uma conta grande ' +
        '— influenciador, projeto, carteira "smart money" — interage com um token, dando ' +
        'tempo de reação antes de a multidão chegar.',
      'Isso não substitui a checagem técnica: serve só para você não ser o último a saber ' +
        'que algo está acontecendo. O que fazer com essa informação ainda depende do pilar ' +
        'técnico e da sua tese (Módulo 4).',
    ],
    jTracker: {
      titulo: '"J7 Tracker": exemplo de categoria, não confirmado',
      texto:
        'O pedido original cita "J7 Tracker" como ferramenta específica. Não foi encontrada ' +
        'fonte pública confiável que confirme uma ferramenta com esse nome — por isso ela ' +
        'aparece marcada como "não verificado" na matriz abaixo. A categoria em si — ' +
        '"tracker de tweets / alertas sociais" — é real e usada no mercado; o hub usa "J7 ' +
        'Tracker" só como exemplo didático dessa categoria, não como recomendação.',
    },
  },

  // ---------------------------------------------------------------------------
  // Dimensões de filtro da matriz (aba "Matriz de ferramentas")
  // ---------------------------------------------------------------------------
  chains: [
    { id: 'solana', nome: 'Solana' },
    { id: 'evm', nome: 'EVM (Ethereum, Base, BSC, Arbitrum...)' },
    { id: 'bnb', nome: 'BNB Chain' },
    { id: 'multi', nome: 'Multi-chain' },
  ],

  papeis: [
    { id: 'visualizacao', nome: 'Visualização' },
    { id: 'execucao', nome: 'Execução' },
    { id: 'checagem', nome: 'Checagem' },
    { id: 'monitoramento-social', nome: 'Monitoramento social' },
  ],

  // ---------------------------------------------------------------------------
  // Matriz de ferramentas (aba "Matriz de ferramentas") — filtrável por
  // pilar (social/técnico), chain e papel. Cada ferramenta abre (via <details>)
  // um card com "o que faz", "quando usar" e "risco".
  // ---------------------------------------------------------------------------
  ferramentas: [
    {
      id: 'dexscreener',
      nome: 'DexScreener',
      pilar: 'tecnico',
      chains: ['multi'],
      papeis: ['visualizacao'],
      oQueFaz:
        'Mostra gráfico de preço, liquidez, volume e transações recentes de qualquer par, ' +
        'em praticamente qualquer chain.',
      quandoUsar:
        'É o primeiro lugar para olhar um token que você acabou de ouvir falar — dá o ' +
        'contexto de preço e liquidez antes de qualquer outra checagem.',
      risco: 'baixo',
      observacoes: 'Padrão de mercado. Serve para visualizar; não executa ordens.',
    },
    {
      id: 'gmgn',
      nome: 'GMGN (gmgn.ai)',
      pilar: 'tecnico',
      chains: ['multi'],
      papeis: ['execucao', 'checagem'],
      oQueFaz:
        'Terminal web e bot de Telegram: executa compra/venda, tem um scanner de segurança ' +
        'embutido (contrato, holders) e permite copy trade de carteiras.',
      quandoUsar:
        'Quando você já decidiu entrar e quer executar rápido com uma checagem automática ' +
        'de segurança na mesma tela.',
      risco: 'medio',
      observacoes:
        'Nasceu focado em Solana e hoje cobre múltiplas chains. Cobra taxa de execução ' +
        '(~1%, citada por reviews). Copy trade copia também as perdas da carteira copiada.',
    },
    {
      id: 'axiom',
      nome: 'Axiom Trade',
      pilar: 'tecnico',
      chains: ['solana'],
      papeis: ['execucao', 'visualizacao', 'monitoramento-social'],
      correcao:
        'Correção: o pedido original citava "Axon". Não há terminal relevante com esse ' +
        'nome — o correto é Axiom Trade.',
      oQueFaz:
        'Terminal web não-custodial focado em Solana: descoberta de tokens novos ("Pulse"), ' +
        'rastreamento de carteiras, monitoramento de X/Twitter, execução rápida e controles ' +
        'de MEV, slippage e priority fee.',
      quandoUsar:
        'Para acompanhar lançamentos em tempo real (aba Pulse) e executar direto da mesma ' +
        'tela, sem trocar de ferramenta.',
      risco: 'medio',
      observacoes: 'Modelo de taxa em camadas. Apoiado pela Y Combinator.',
    },
    {
      id: 'photon',
      nome: 'Photon',
      pilar: 'tecnico',
      chains: ['solana', 'evm'],
      papeis: ['execucao'],
      oQueFaz:
        'Terminal web rápido de execução, com foco em velocidade para comprar/vender assim ' +
        'que um token chama atenção.',
      quandoUsar:
        'Quando velocidade de execução importa mais do que análise — você já fez a checagem ' +
        'e só falta apertar o botão rápido.',
      risco: 'medio',
      observacoes: 'Cobre Solana e também ETH/Base/Tron/Blast. Taxa de 1% citada por reviews.',
    },
    {
      id: 'bullx',
      nome: 'BullX (Neo)',
      pilar: 'tecnico',
      chains: ['multi'],
      papeis: ['execucao', 'visualizacao'],
      oQueFaz:
        'Terminal multi-chain com gráficos e execução, também disponível como bot de ' +
        'Telegram.',
      quandoUsar:
        'Quando você opera em mais de uma chain e quer uma única ferramenta para gráfico ' +
        'e execução.',
      risco: 'medio',
      observacoes: 'Multi-chain.',
    },
    {
      id: 'trojan',
      nome: 'Trojan',
      pilar: 'tecnico',
      chains: ['solana'],
      papeis: ['execucao'],
      oQueFaz: 'Bot de execução via Telegram para Solana, focado em velocidade.',
      quandoUsar: 'Snipes pequenos e rápidos, direto do celular, sem abrir um terminal web.',
      risco: 'alto',
      observacoes:
        'Rápido, mas executar via bot de Telegram remove a camada visual de checagem que ' +
        'um terminal web mostra antes de você confirmar a compra.',
    },
    {
      id: 'bonkbot',
      nome: 'BonkBot',
      pilar: 'tecnico',
      chains: ['solana'],
      papeis: ['execucao'],
      oQueFaz: 'Bot de Telegram simples de "tap and trade" para Solana.',
      quandoUsar:
        'Para quem está começando e quer a execução mais simples possível, sem instalar ' +
        'nenhum terminal.',
      risco: 'alto',
      observacoes:
        'Simplicidade não é segurança: continua exigindo checagem manual do contrato (ex.: ' +
        'RugCheck) antes de comprar.',
    },
    {
      id: 'padre',
      nome: 'Padre',
      pilar: 'tecnico',
      chains: ['solana'],
      papeis: ['visualizacao', 'execucao'],
      oQueFaz: 'Terminal web "pro" para Solana, com analytics mais profundos além da execução.',
      quandoUsar: 'Quando você quer mais dado analítico na mesma tela em que executa.',
      risco: 'medio',
      observacoes: 'Foco em analytics.',
    },
    {
      id: 'sigma',
      nome: 'Sigma',
      pilar: 'tecnico',
      chains: ['evm'],
      papeis: ['execucao', 'checagem'],
      naoSuportaSolana: true,
      oQueFaz:
        'Bot de Telegram de execução/sniping em chains EVM (Base, Ethereum, BSC, Arbitrum, ' +
        'Avalanche, Blast), com checagem rápida do contrato de deploy ("factory").',
      quandoUsar: 'Sniping e checagem rápida em redes EVM — nunca em Solana.',
      risco: 'alto',
      observacoes:
        'Verificado: o Sigma NÃO suporta Solana. "Factory" é o contrato que faz o deploy ' +
        'de outros contratos/tokens; checar a factory é um padrão conhecido para detectar scam.',
    },
    {
      id: 'rugcheck',
      nome: 'RugCheck',
      pilar: 'tecnico',
      chains: ['solana'],
      papeis: ['checagem'],
      oQueFaz:
        'Analisa a segurança de um token em Solana: status da LP, mint/freeze authority, ' +
        'concentração de holders e sinais de honeypot.',
      quandoUsar:
        'Sempre, antes de comprar qualquer token novo em Solana — é a checagem técnica mínima.',
      risco: 'baixo',
      observacoes: 'Ferramenta de leitura: não executa nada por você.',
    },
    {
      id: 'bubblemaps',
      nome: 'Bubblemaps',
      pilar: 'tecnico',
      chains: ['multi'],
      papeis: ['visualizacao', 'checagem'],
      oQueFaz:
        'Visualiza clusters de carteiras em forma de bolhas, mostrando concentração e ' +
        'possíveis carteiras de insiders ligadas entre si.',
      quandoUsar:
        'Quando a checagem de holders (ex.: no explorer) já mostra concentração alta e você ' +
        'quer ver se essas carteiras estão conectadas.',
      risco: 'baixo',
      observacoes:
        'Foi a ferramenta usada para apontar ~82% do supply do caso LIBRA já desbloqueado ' +
        'no lançamento (ver Módulo 2, aba "Casos reais").',
    },
    {
      id: 'explorers',
      nome: 'Solscan / BscScan / Etherscan / Basescan',
      pilar: 'tecnico',
      chains: ['solana', 'evm'],
      papeis: ['visualizacao', 'checagem'],
      oQueFaz:
        'Block explorers oficiais de cada rede: mostram todo o histórico de transações, ' +
        'holders e as autoridades/permissões de um contrato, direto da fonte.',
      quandoUsar:
        'Para conferir sem intermediário nenhum as authorities, os holders e o histórico ' +
        'de um contrato.',
      risco: 'baixo',
      observacoes:
        'Use o explorer da chain certa: Solscan (Solana), Etherscan (Ethereum), BscScan ' +
        '(BNB Chain), Basescan (Base).',
    },
    {
      id: 'launchpads-solana',
      nome: 'Pump.fun / LetsBonk (Bonk.fun) / Raydium / Meteora / Jupiter',
      pilar: 'tecnico',
      chains: ['solana'],
      papeis: ['execucao', 'visualizacao'],
      oQueFaz:
        'Launchpads (Pump.fun, LetsBonk) que lançam tokens via bonding curve, e DEX/' +
        'agregadores (Raydium, Meteora, Jupiter) para onde o token "gradua" quando junta ' +
        'liquidez de verdade.',
      quandoUsar:
        'Para acompanhar o nascimento de um token no launchpad e negociar depois que ele ' +
        'tem pool de liquidez numa DEX.',
      risco: 'alto',
      observacoes: 'Veja a aba "Cenário 2025–2026": a liderança entre launchpads muda muito rápido.',
    },
    {
      id: 'bnb-launchpads',
      nome: 'Four.meme / PancakeSwap',
      pilar: 'tecnico',
      chains: ['bnb'],
      papeis: ['execucao'],
      oQueFaz:
        'Launchpad de fair-launch de baixo custo (Four.meme) e a DEX principal da BNB Chain ' +
        '(PancakeSwap).',
      quandoUsar: 'Quando o token que você está olhando nasceu ou negocia na BNB Chain.',
      risco: 'alto',
      observacoes:
        'Custo de lançamento citado em ~0,005 BNB — barato o suficiente para gerar dezenas ' +
        'de milhares de tokens por dia em picos de atividade.',
    },
    {
      id: 'uniswap',
      nome: 'Uniswap',
      pilar: 'tecnico',
      chains: ['evm'],
      papeis: ['execucao'],
      oQueFaz:
        'DEX padrão do ecossistema EVM: troca direta de tokens via pools de liquidez, sem ' +
        'intermediário.',
      quandoUsar: 'Para negociar um token EVM depois de já ter feito a checagem técnica em outro lugar.',
      risco: 'medio',
      observacoes: 'Padrão de mercado; sozinho não faz nenhuma checagem de segurança do token.',
    },
    {
      id: 'j7-tracker',
      nome: 'J7 Tracker',
      pilar: 'social',
      chains: ['multi'],
      papeis: ['monitoramento-social'],
      naoVerificado: true,
      oQueFaz:
        'Categoria: tracker de tweets / alertas sociais. Monitora quando uma conta ' +
        'específica (influenciador, projeto, carteira) interage com um token, para avisar cedo.',
      quandoUsar:
        'Como parte do pilar social — para não ser o último a saber que uma conta grande ' +
        'interagiu com um token.',
      risco: 'medio',
      observacoes:
        'Não verificado: nenhuma fonte pública confiável confirma uma ferramenta chamada ' +
        '"J7 Tracker". Tratado aqui como exemplo didático da categoria "tracker de tweets", ' +
        'que é real e usada no mercado.',
    },
  ],

  // ---------------------------------------------------------------------------
  // Cenário de launchpads 2025–2026 (aba "Cenário 2025–2026")
  // ---------------------------------------------------------------------------
  cenarioLaunchpads: {
    titulo: 'A liderança entre launchpads muda rápido',
    introducao:
      'Verificado, com uma ressalva importante: os números abaixo mudam de mês em mês. O ' +
      'que fica é o conceito — launchpad + bonding curve + graduação para uma DEX — não o ' +
      'nome de quem lidera hoje.',
    eventos: [
      {
        data: 'Início de agosto de 2025',
        texto:
          'O Pump.fun capturou cerca de 98% da receita de launchpad rastreada (~US$ 1,1 mi ' +
          'de receita sobre ~US$ 542 mi de volume).',
      },
      {
        data: '07/07/2025',
        texto:
          'O LetsBonk (Bonk.fun) ultrapassou o Pump.fun, com ~54,8–55% de market share e ' +
          '~US$ 539 mi de volume diário.',
      },
      {
        data: 'Fim de 2025',
        texto:
          'A atividade migrou fortemente para a Four.meme (BNB Chain): em 08/10/2025 ela ' +
          'gerou ~US$ 1,4 mi de receita em 24h contra ~US$ 885 mil do Pump.fun, com mais de ' +
          '20.000 tokens criados no dia.',
      },
    ],
    conclusao:
      'O líder muda rápido; o hub ensina o conceito e mantém os nomes e números editáveis ' +
      'bem aqui, em src/data/modulo3.js.',
  },

  // ---------------------------------------------------------------------------
  // Mini-quiz (aba "Quiz") — 4 perguntas
  // ---------------------------------------------------------------------------
  quiz: [
    {
      id: 'q1',
      pergunta: 'O DexScreener serve para visualizar ou para executar ordens?',
      alternativas: [
        { id: 'a', texto: 'Só para executar compra e venda diretamente.' },
        { id: 'b', texto: 'Para visualizar: gráfico, liquidez, volume e transações.' },
        { id: 'c', texto: 'Só para checar mint e freeze authority.' },
        { id: 'd', texto: 'Para monitorar posts no X/Twitter.' },
      ],
      correta: 'b',
      explicacao:
        'DexScreener é uma ferramenta de visualização: mostra preço, liquidez e volume. Não ' +
        'executa ordens — para isso existem terminais como Axiom, Photon ou GMGN.',
    },
    {
      id: 'q2',
      pergunta: 'Qual é o nome correto do terminal de execução focado em Solana (não "Axon")?',
      alternativas: [
        { id: 'a', texto: 'Axon Trade' },
        { id: 'b', texto: 'Axiom Trade' },
        { id: 'c', texto: 'Apex Trade' },
        { id: 'd', texto: 'Axium Finance' },
      ],
      correta: 'b',
      explicacao:
        'O nome correto é Axiom Trade. "Axon" não corresponde a nenhum terminal de execução ' +
        'relevante encontrado em fontes públicas — é a correção em destaque no topo do módulo.',
    },
    {
      id: 'q3',
      pergunta: 'O Sigma suporta Solana?',
      alternativas: [
        { id: 'a', texto: 'Sim, é a chain principal do Sigma.' },
        { id: 'b', texto: 'Não — o Sigma cobre apenas chains EVM.' },
        { id: 'c', texto: 'Sim, mas só para checagem, nunca para execução.' },
        { id: 'd', texto: 'O suporte a Solana está em fase de testes.' },
      ],
      correta: 'b',
      explicacao:
        'Não. O Sigma é um bot de Telegram para chains EVM (Base, Ethereum, BSC, Arbitrum, ' +
        'Avalanche, Blast) e não suporta Solana — ponto verificado e destacado na matriz.',
    },
    {
      id: 'q4',
      pergunta: 'Para que serve o pilar social?',
      alternativas: [
        {
          id: 'a',
          texto:
            'Para detectar cedo quando uma conta grande interage com um projeto — não para provar que o contrato é seguro.',
        },
        { id: 'b', texto: 'Para revogar approvals de carteiras automaticamente.' },
        { id: 'c', texto: 'Para substituir totalmente a checagem técnica antes de comprar.' },
        { id: 'd', texto: 'Para calcular o take profit ideal de uma posição.' },
      ],
      correta: 'a',
      explicacao:
        'O pilar social (X/Twitter, Discord, Telegram, trackers de tweets) avisa cedo que a ' +
        'atenção está se formando. Ele não substitui o pilar técnico — os dois se completam.',
    },
  ],
};
