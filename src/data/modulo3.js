// modulo3.js — conteúdo do Módulo 3 (os dois pilares: social vs. técnico) e o
// catálogo de ferramentas usado pela matriz filtrável.
// Aqui só tem DADOS: nenhuma lógica, nenhum HTML. Para adicionar/trocar uma
// ferramenta ou corrigir um número, mude aqui — a interface se adapta sozinha.
//
// Campo `foraDaTela`: trechos da pesquisa que o desenho condensou e a tela não
// mostra (definições para iniciante e números com fonte). Ficam guardados aqui
// para não se perderem; nenhuma view lê este campo. Para pôr um deles de volta
// na tela, mova a frase para `paragrafos`, `detalhe` ou `exemplo` da seção.

export const modulo3 = {
  id: 'modulo-3',
  titulo: 'Os dois pilares (Social vs. Técnico)',
  // Frase embaixo do título da página (desenho "M3 Desktop", cabeçalho).
  subtitulo:
    'Nenhuma decisão de entrada deveria depender de um sinal só. O pilar social mostra ' +
    'onde a atenção está nascendo; o pilar técnico mostra se o contrato por trás merece ' +
    'confiança.',

  objetivos: [
    'Entender que a decisão de entrada combina sinal social + checagem técnica.',
    'Reconhecer uma narrativa, situar em que fase ela está e saber o que as listas de "em alta" medem — e o que a pesquisa não sabe.',
    'Confirmar o endereço oficial de um token em 5 minutos, e reconhecer os golpes de X, Discord e Telegram.',
    'Usar RugCheck, Solscan, Bubblemaps e DexScreener sabendo o que cada campo prova — e o que não prova.',
    'Reconhecer o papel de cada ferramenta: visualização, execução, checagem ou monitoramento social.',
    'Saber filtrar ferramentas por chain (Solana, EVM, BNB Chain, multi-chain) e por papel.',
    'Conhecer a correção "Axon → Axiom" e o caso do Sigma, que não suporta Solana.',
  ],

  // Mapa do módulo ("O módulo inteiro numa olhada", no topo da página): o centro
  // e as folhas curtas de cada aba, copiados do desenho (M3 Desktop, renderVals ›
  // ABAS). `aba` é o id da aba na view. O ramo do Quiz não entra aqui: a view
  // conta as perguntas de `quiz` e escreve "N perguntas".
  mapa: {
    titulo: 'Os dois pilares',
    subtitulo: 'Duas perguntas, nunca uma',
    ramos: [
      { aba: 'visao-geral', folhas: ['social × técnico', 'o que cada um pergunta'] },
      { aba: 'narrativas', folhas: ['ciclo', 'narrativa × hype', 'rotação 2024–2025', 'ferramentas'] },
      { aba: 'social', folhas: ['rotina de 5 min', 'perfil oficial', 'Discord e Telegram', 'calls'] },
      { aba: 'tecnico', folhas: ['RugCheck', 'Solscan', 'Bubblemaps', 'DexScreener'] },
      { aba: 'matriz', folhas: ['filtro por pilar, rede e papel'] },
      { aba: 'cenario', folhas: ['quem liderou quando'] },
    ],
  },

  // ---------------------------------------------------------------------------
  // Correção em destaque. Fica no cabeçalho da página, visível em todas as abas
  // (caixa âmbar do desenho): o título em negrito e o texto em seguida.
  // ---------------------------------------------------------------------------
  correcaoAxiom: {
    titulo: 'Correção: "Axon" não existe — o nome certo é Axiom.',
    texto:
      'O pedido original citava "Axon" como terminal de execução para Solana. Pesquisa ' +
      'dedicada não encontrou nenhum terminal de execução relevante com esse nome. O ' +
      'provável terminal citado é o Axiom Trade: um terminal web não-custodial focado em ' +
      'Solana.',
  },

  // ---------------------------------------------------------------------------
  // Aba "Visão geral" — uma seção só, como no desenho.
  //
  // Formato dos textos com destaque, usado em todo este arquivo: um texto pode
  // ser uma string ou uma lista de pedaços. Um pedaço { forte: '…' } sai em
  // negrito; { mono: '…' } sai em fonte de código (um endereço, um operador de
  // busca).
  //
  // `pergunta` é a "Pergunta rápida" do fim do card: o id de uma pergunta do
  // `quiz` deste arquivo.
  // ---------------------------------------------------------------------------
  secoes: [
    {
      id: 'dois-pilares',
      titulo: 'Por que duas checagens, e não uma só',
      emUmaFrase:
        'Antes de comprar, você precisa de duas respostas: por que o token chama atenção, e se ' +
        'o contrato por trás dele merece confiança.',
      // A figura dos dois pilares lado a lado. `tom`: 'acento' (ciano) ou 'primaria' (roxo).
      pilares: [
        {
          nome: 'Pilar social',
          pergunta: 'Este token é quem diz ser? Por que está chamando atenção agora?',
          cobre: ['X/Twitter', 'Discord', 'Telegram', 'calls'],
          sozinho: 'Sozinho: nenhum sinal social prova que o contrato por trás é seguro.',
          tom: 'acento',
        },
        {
          nome: 'Pilar técnico',
          pergunta: 'O que o contrato e as carteiras ainda permitem fazer contra mim?',
          cobre: ['gráfico', 'contrato', 'liquidez', 'holders'],
          sozinho:
            'Sozinho: um contrato limpo sem nenhuma atenção não vale nada — sem atenção, não ' +
            'aparece comprador.',
          tom: 'primaria',
        },
      ],
      // A legenda âmbar embaixo dos dois pilares.
      legendaDosPilares: [
        { forte: 'Os dois juntos, e nem isso aprova: ' },
        'passar nas duas checagens não torna um token seguro. Só quer dizer que ele não ' +
          'mostrou os problemas que dá para ver.',
      ],
      paragrafos: [
        'Um token novo tem duas histórias ao mesmo tempo, e elas não se conversam. A primeira é ' +
          'a história das pessoas: alguém postou, alguém repetiu, um grupo se formou. A segunda é ' +
          'a história do código: o contrato — o programa que cria o token e define o que pode ser ' +
          'feito com ele — pode ter ficado com portas abertas para quem o criou. Chamar essas ' +
          'duas histórias de "pilar social" e "pilar técnico" é só um jeito de lembrar que são ' +
          'duas perguntas, e que uma não responde a outra.',
        'O pilar social pergunta se o token é quem diz ser e por que está chamando atenção agora. ' +
          'O pilar técnico pergunta o que o contrato e as carteiras ainda permitem fazer contra ' +
          'você. Aqui, carteira é uma conta na blockchain; liquidez é o dinheiro parado num par ' +
          'de negociação, que é de onde sai o seu dinheiro quando você vende; e holders (quem ' +
          'tem) são as carteiras que guardam o token.',
        'Isso importa para você porque os dois erros custam dinheiro, e são erros opostos. Quem ' +
          'só olha o social compra o token errado com o nome certo, ou compra o token certo na ' +
          'hora em que a atenção já acabou. Quem só olha o técnico encontra um contrato limpo que ' +
          'ninguém quer — e um token que ninguém quer não tem comprador na hora de sair.',
        'Na prática isso vira uma ordem de leitura, não um selo. Você abre a conta oficial e o ' +
          'site para descobrir qual é o endereço verdadeiro do token; depois cola esse endereço ' +
          'nas ferramentas de checagem para ver o que o contrato permite. As duas leituras usam ' +
          'telas diferentes, e o resultado de uma nunca aparece na tela da outra.',
      ],
      // Aviso 1 de 3 do "reconhecer narrativa não prevê preço": antecipa o limite
      // antes das abas práticas (linha com borda âmbar).
      aviso:
        'Aviso desde já: o pilar social diz de onde vem a atenção. Ele não diz para onde vai o ' +
        'preço.',
      exemplo: {
        titulo: 'Quando um pilar sozinho decide',
        passos: [
          'Em 14/02/2025, a LIBRA foi promovida por Javier Milei. Atenção máxima: não dá para ' +
            'pedir sinal social mais forte do que um presidente postando.',
          'Das 15.430 carteiras que negociaram mais de US$ 1.000, mais de 86% venderam no ' +
            'prejuízo, somando US$ 251 milhões (Nansen).',
          'O sinal social estava certo sobre o que ele mede: havia atenção. Ele não media mais nada.',
          'Foi o fim da onda de memecoins políticas — e o caso está na linha do tempo da aba ' +
            'Narrativas, com os outros oito marcos.',
        ],
      },
      paragrafosFinais: [
        'Passar nas duas checagens não torna um token seguro: só quer dizer que ele não mostrou ' +
          'os problemas que dá para ver. É por isso que o Módulo 4 fala em tese, e não em ' +
          'aprovação — uma tese de entrada só fica de pé quando está apoiada nos dois pilares ao ' +
          'mesmo tempo.',
      ],
      detalhe: {
        titulo: 'o pilar social e o "J7 Tracker"',
        paragrafos: [
          'Trackers de tweets e de carteiras servem para detectar cedo quando uma conta grande — ' +
            'influenciador, projeto, ou uma carteira rotulada como "smart money" (dinheiro ' +
            'esperto: carteiras que uma empresa de dados marcou como historicamente lucrativas) — ' +
            'interage com um token, dando tempo de reação antes de a multidão chegar. Serve só ' +
            'para você não ser o último a saber; o que fazer com isso depende do pilar técnico e ' +
            'da sua tese.',
          [
            { forte: '"J7 Tracker": existe, mas não é o que o nome sugere aqui. ' },
            'Ele existe (j7tracker.io) — mas é uma ferramenta de sniping e deploy de token ' +
              '("sub-1ms server-side deploys"), com um rastreador de tweets embutido como recurso ' +
              'auxiliar; acesso por credenciais via Discord. Sniping é comprar nos primeiros ' +
              'instantes de vida de um token, na frente dos outros; deploy é publicar o contrato ' +
              'do token na blockchain. A categoria em si — "tracker de tweets / alertas sociais" — ' +
              'é real e usada no mercado; o hub cita o nome só para deixar claro o que ele de fato ' +
              'é, não como recomendação de uso.',
          ],
        ],
      },
    },
  ],

  // ---------------------------------------------------------------------------
  // Dimensões de filtro da matriz (aba "Matriz de ferramentas"). `nomeCurto` é o
  // nome que aparece no filtro e nos chips do cartão (o desenho escreve só "EVM").
  // ---------------------------------------------------------------------------
  chains: [
    { id: 'solana', nome: 'Solana' },
    { id: 'evm', nome: 'EVM (Ethereum, Base, BSC, Arbitrum...)', nomeCurto: 'EVM' },
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
  // pilar (social/técnico), chain e papel. Cada ferramenta vira um cartão aberto
  // com o risco, "o que faz" e "quando usar"; só as observações ficam recolhidas.
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
      // Sem repetir "não suporta Solana": isso já sai na faixa vermelha do cartão
      // (matriz.avisoSemSolana), como no desenho.
      observacoes:
        '"Factory" é o contrato que faz o deploy de outros contratos/tokens; checar a ' +
        'factory é um padrão conhecido para detectar scam.',
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
      oQueFaz:
        'Ferramenta de sniping e deploy de token ("sub-1ms server-side deploys"), com um ' +
        'rastreador de tweets embutido como recurso auxiliar. Categoria de fundo: tracker de ' +
        'tweets / alertas sociais — monitora quando uma conta específica (influenciador, ' +
        'projeto, carteira) interage com um token, para avisar cedo.',
      quandoUsar:
        'A categoria "tracker de tweets" serve para não ser o último a saber que uma conta ' +
        'grande interagiu com um token. Esta ferramenta específica não é isso: é focada em ' +
        'velocidade de execução (sniping), não em leitura de narrativa.',
      risco: 'medio',
      observacoes:
        'Site oficial j7tracker.io, acesso por credenciais via Discord. Preço exato e se ' +
        'expõe API pública: não verificado.',
    },
  ],

  // ---------------------------------------------------------------------------
  // Aba "Matriz de ferramentas": o card em volta da matriz filtrável. As
  // ferramentas em si estão em `ferramentas`, logo acima.
  // ---------------------------------------------------------------------------
  matriz: {
    titulo: 'Matriz de ferramentas',
    emUmaFrase:
      'Antes de escolher uma ferramenta, decida qual é o papel dela na sua semana: ver, ' +
      'executar, checar ou acompanhar o que se fala.',
    paragrafos: [
      'A matriz é uma lista de dezesseis ferramentas com três etiquetas cada uma: o pilar a que ' +
        'ela serve, as redes em que funciona e o papel que cumpre. Os quatro papéis são ' +
        'visualização (ver preço, liquidez e negociações), execução (comprar e vender), checagem ' +
        '(olhar contrato e carteiras) e monitoramento social (acompanhar o que se fala). As redes ' +
        'são Solana, EVM, BNB Chain e multi-chain. Rede, ou chain, é a blockchain onde o token ' +
        'vive; EVM é o grupo de redes que rodam o mesmo tipo de contrato do Ethereum, e por isso ' +
        'aparecem juntas.',
      'Isso importa porque a maior parte dos erros de ferramenta é erro de papel, não de marca. ' +
        'Usar um site de visualização para decidir se o contrato é seguro, ou um terminal de ' +
        'execução para descobrir quem controla as carteiras, dá resposta — só não é a resposta da ' +
        'pergunta que você fez. Cada cartão da matriz traz "o que faz" e "quando usar" ' +
        'justamente para separar as duas coisas.',
      'Na prática, os filtros são três listas de botões: um pilar, uma rede, um papel. O contador ' +
        'acima da grade diz quantas ferramentas sobraram do total de dezesseis. Só uma delas é do ' +
        'pilar social (o J7 Tracker); todas as outras são do pilar técnico — o que já conta uma ' +
        'história: quase tudo o que o mercado construiu foi para olhar o contrato e executar, não ' +
        'para ler gente.',
      'Duas etiquetas da matriz são avisos, e valem mais que o resto do cartão. O cartão do Sigma ' +
        'tem uma faixa vermelha porque ele não suporta Solana, verificado — se a sua rede é ' +
        'Solana, o cartão acaba ali. E o cartão do Axiom Trade tem uma faixa âmbar com a correção ' +
        'de nome que aparece no alto de todas as abas.',
    ],
    exemplo: {
      titulo: 'Axiom, não Axon',
      passos: [
        'O pedido original deste módulo citava "Axon" como terminal de execução para Solana.',
        'Pesquisa dedicada não encontrou nenhum terminal de execução relevante com esse nome.',
        'O provável terminal citado é o Axiom Trade: um terminal web não-custodial focado em ' +
          'Solana. Não-custodial quer dizer que a sua chave fica com você, e não no servidor da ' +
          'ferramenta.',
        'Guarde o nome certo: a matriz e o quiz cobram Axiom, e nomes parecidos são exatamente o ' +
          'material de que os golpes são feitos.',
      ],
    },
    paragrafosFinais: [
      'A etiqueta de risco de cada cartão não é nota de qualidade: é lembrete de quanto você ' +
        'entrega para usar aquilo. Ferramenta que só lê não pede nada seu; ferramenta que executa ' +
        'pede acesso ao seu dinheiro. Esse é o eixo que vale a pena carregar para o Módulo 5.',
    ],
    // A faixa vermelha no cartão de quem tem `naoSuportaSolana: true` (o Sigma).
    avisoSemSolana: 'Verificado: não suporta Solana.',
  },

  // ---------------------------------------------------------------------------
  // Cenário de launchpads 2025–2026 (aba "Cenário 2025–2026")
  // ---------------------------------------------------------------------------
  cenarioLaunchpads: {
    titulo: 'A liderança entre launchpads muda rápido',
    emUmaFrase:
      'O que fica é o conceito — launchpad + bonding curve + graduação para uma DEX — não o ' +
      'nome de quem lidera hoje.',
    paragrafos: [
      'Launchpad é um site que cria o token para você em poucos cliques, sem programar nada. ' +
        'Bonding curve, ou curva, é a regra de preço que esse site usa enquanto o token é novo: ' +
        'o preço sobe sozinho conforme as pessoas compram e desce conforme vendem, porque quem ' +
        'está do outro lado da sua ordem é a própria curva, e não outro comprador. Graduação é o ' +
        'momento em que o token junta dinheiro suficiente na curva e passa a ser negociado numa ' +
        'DEX — uma corretora que funciona por contrato, sem empresa no meio.',
      'Esses três passos são o encanamento por onde passa quase toda memecoin de que você vai ' +
        'ouvir falar. Saber o caminho importa mais do que saber o nome da empresa da vez, porque ' +
        'o caminho é o que explica o que você vê na tela: por que o preço se move sem ninguém do ' +
        'outro lado, por que existe um "antes" e um "depois" da graduação, e por que a liquidez ' +
        'de um token recém-graduado é tão pequena.',
      'Na prática, a liderança entre esses sites muda em semanas, e os números abaixo são o ' +
        'retrato de três momentos, não uma tendência. Em 07/07/2025 o LetsBonk (Bonk.fun) ' +
        'ultrapassou o Pump.fun com cerca de 54,8 a 55% de market share. No início de agosto de ' +
        '2025 o Pump.fun capturou cerca de 98% da receita de launchpad rastreada. No fim de 2025 ' +
        'a atividade migrou fortemente para a Four.meme, na BNB Chain.',
    ],
    paragrafosFinais: [
      'O erro que isso evita é decorar marcas. Se você aprender "o site X é o lugar onde as ' +
        'memecoins nascem", vai procurar no lugar errado no trimestre seguinte. Se aprender ' +
        '"existe um site de lançamento, uma curva de preço e uma graduação", você reconhece o ' +
        'próximo antes de ele ter nome.',
    ],
    // Em ordem cronológica — a view desenha isto como linha do tempo, e uma
    // linha do tempo fora de ordem ensina errado. As datas ficam como a
    // pesquisa achou: "Início de agosto de 2025" e "Fim de 2025" não têm dia
    // (o desenho escreveu "01/08/2025", que não tem fonte).
    eventos: [
      {
        data: '07/07/2025',
        texto:
          'O LetsBonk (Bonk.fun) ultrapassou o Pump.fun, com ~54,8–55% de market share e ' +
          '~US$ 539 mi de volume diário.',
      },
      {
        data: 'Início de agosto de 2025',
        texto:
          'O Pump.fun capturou cerca de 98% da receita de launchpad rastreada (~US$ 1,1 mi ' +
          'de receita sobre ~US$ 542 mi de volume).',
      },
      {
        data: 'Fim de 2025',
        texto:
          'A atividade migrou fortemente para a Four.meme (BNB Chain): em 08/10/2025 ela ' +
          'gerou ~US$ 1,4 mi de receita em 24h contra ~US$ 885 mil do Pump.fun, com mais de ' +
          '20.000 tokens criados no dia.',
      },
    ],
    // O parágrafo que fecha a aba (no formato de pedaços: { mono } é o caminho do arquivo).
    conclusao: [
      'Verificado, com uma ressalva importante: os números acima mudam de mês em mês. O ' +
        'líder muda rápido; o hub ensina o conceito e mantém os nomes e números editáveis em ',
      { mono: 'src/data/modulo3.js' },
      '.',
    ],
  },

  // ---------------------------------------------------------------------------
  // Aba "Narrativas" — pesquisas 8 a 11 dos módulos, com as correções de
  // pesquisa/modulos/pesquisas/VERIFICACOES-AO-VIVO-2.md (seção 3). Onde a
  // pesquisa e a conferência divergem, vale a conferência.
  // As cinco seções seguem o desenho "M3 Desktop", na ordem da aba.
  // ---------------------------------------------------------------------------
  praticaNarrativas: {
    // Esta aba NÃO tem "Antes de ler: o que você acha?" (o desenho também não
    // tem o bloco). A q11 usada aqui antes ("em qual rede social a atenção
    // aparece primeiro?") é respondida pelo 2º destaque da própria aba
    // ("Estudos que mediram... — Nenhum"), 24px abaixo e na mesma tela: o aluno
    // lia a resposta antes de tentar, e a tentativa perdia o efeito. Das 13
    // perguntas do quiz não sobra nenhuma para o lugar: q13 e q12 são a
    // "Pergunta rápida" das seções desta aba, e as livres (q2, do nome Axiom, e
    // q10, do Bubblemaps) são de outras abas. O bloco fica no Pilar técnico.
    perguntaAntes: null,

    termos: [
      { termo: 'Narrativa', definicao: 'Um tema que puxa vários tokens ao mesmo tempo, e não o hype de um token só.' },
      { termo: 'Esteira', definicao: 'Os tokens que copiam o tema depois que o primeiro chamou atenção.' },
      { termo: 'Mindshare', definicao: 'A fatia da conversa nas redes que um projeto ou tema ocupa.' },
    ],

    destaques: [
      {
        rotulo: 'Tokens do pump.fun criados logo depois de um post no X ou no Truth Social',
        valor: '23,5%',
        nota:
          '3,5 milhões de 15,2 milhões, de jan/2024 a jan/2026 ("Meme Coin Factories", preprint). ' +
          'A narrativa nasce fora da blockchain; o token vem depois.',
      },
      {
        rotulo: 'Estudos que mediram em qual rede social a atenção aparece primeiro',
        valor: 'Nenhum',
        nota: '"Primeiro no Telegram, depois no X" é observação de mercado, sem medição.',
        tom: 'alerta',
      },
      {
        rotulo: 'Valor somado das memecoins, do pico ao fim de 2025',
        valor: 'US$ 150,6 → 47,2 bi',
        nota:
          'De dez/2024 a nov/2025 (CoinGecko, State of Memecoins 2025). As narrativas se ' +
          'revezaram enquanto o setor inteiro encolhia.',
        tom: 'alerta',
      },
    ],

    secoes: [
      {
        id: 'ciclo',
        titulo: 'O ciclo de vida de uma narrativa',
        emUmaFrase:
          'Uma narrativa nasce, cresce, chega ao pico, satura e morre. Os sinais descrevem o que ' +
          'aconteceu — nenhum foi medido como aviso de entrar ou sair.',
        // As cinco fases: o título vai na caixa do círculo; título e texto, na lista embaixo.
        fases: [
          {
            titulo: 'Nascimento',
            texto: 'um evento fora de cripto (post, notícia, vídeo viral) e um primeiro token que chama atenção.',
          },
          {
            titulo: 'Crescimento',
            texto:
              'aparecem vários tokens com o mesmo tema. Uma corretora grande lista um deles, e uma ' +
              'figura pública entra na conversa. O PNUT foi listado na Binance em 11/11/2024, com ' +
              'Elon Musk usando o esquilo no X.',
          },
          {
            titulo: 'Pico',
            texto:
              'o valor somado do tema para de subir. A imprensa fora de cripto costuma chegar aqui ' +
              'ou depois — nos casos PNUT e LIBRA, a cobertura veio no topo.',
          },
          {
            titulo: 'Saturação',
            texto:
              'continuam nascendo tokens do tema, mas o valor dele já cai. Há registro disso nos ' +
              'agentes de IA e no Believe; nos outros três casos, não há dado.',
          },
          {
            titulo: 'Morte',
            texto:
              'as cópias perdem quase tudo. Dos 30 tokens de celebridades lançados na Solana a ' +
              'partir de maio de 2024, a queda média foi de 94% em cerca de um mês.',
          },
        ],
        // O texto no meio do círculo, e a frase que fecha a descrição para leitor de tela.
        centroDoCiclo: 'e o tema seguinte começa',
        fimDoCiclo: 'Depois da morte, o tema seguinte começa.',
        paragrafos: [
          'Narrativa, aqui, é um tema que puxa vários tokens ao mesmo tempo: "animais virais", ' +
            '"agentes de IA", "políticos". Não é o hype de um token só. O ciclo das cinco fases é ' +
            'a forma que esses temas tiveram nos casos com dados públicos: um evento acende o ' +
            'tema, aparecem imitadores, a atenção somada chega ao topo, os imitadores continuam ' +
            'nascendo depois que o dinheiro já começou a sair, e no fim quase tudo perde valor.',
          'A narrativa quase sempre nasce fora da blockchain. Primeiro vem o post, a notícia ou o ' +
            'vídeo; o token vem depois, feito por alguém que viu o mesmo post que você. De 15,2 ' +
            'milhões de tokens criados no pump.fun entre janeiro de 2024 e janeiro de 2026, 23,5% ' +
            'nasceram logo depois de um post no X ou no Truth Social.',
          'Isso importa para você por um motivo bem concreto: saber a fase muda o que você espera ' +
            'da tela, não o que você faz com o dinheiro. Na fase de crescimento, achar um token ' +
            'novo do tema é fácil e barato; na saturação, achar um token novo do tema continua ' +
            'fácil, e é exatamente aí que a facilidade engana. Os dois momentos parecem iguais no ' +
            'feed de lançamentos.',
          'Na prática você reconhece a fase por três coisas que dá para ver de graça: há quanto ' +
            'tempo o tema existe, quantos tokens já copiaram, e se o valor somado do tema ainda ' +
            'sobe. Muitos tokens novos com o valor do tema caindo é o desenho da saturação. A ' +
            'imprensa fora de cripto é um sinal atrasado: nos casos PNUT e LIBRA, a cobertura ' +
            'veio no topo.',
        ],
        // Aviso 2 de 3: limita a leitura da fase (caixa âmbar).
        aviso: [
          { forte: 'O que o ciclo mostra, e o que não mostra: ' },
          'as cinco fases descrevem a atenção subindo e caindo. Situar a fase não posiciona o ' +
            'preço na mesma linha — nos casos com data, a imprensa chegou no topo, e a saturação ' +
            'só ficou visível depois. A fase é leitura do que já aconteceu, não do próximo passo.',
        ],
        exemplo: {
          titulo: 'Uma narrativa inteira, do nascimento à morte',
          passos: [
            'Nascimento: no fim de outubro de 2024, o esquilo Peanut é apreendido e morto em Nova ' +
              'York. Na esteira do caso surge o token PNUT.',
            'Crescimento: o PNUT é listado na Binance em 11/11/2024, com Elon Musk usando o ' +
              'esquilo no X.',
            'Pico: a cobertura da imprensa fora de cripto chega aqui — depois de a listagem, o ' +
              'preço e a conversa já terem acontecido.',
            'Morte: dos 30 tokens de celebridades lançados na Solana a partir de maio de 2024, a ' +
              'queda média foi de 94% em cerca de um mês. Metade perdeu mais de 99%.',
            'Quem entrou lendo a notícia entrou no quarto passo achando que estava no segundo.',
          ],
        },
        paragrafosFinais: [
          'O erro comum que o ciclo evita é o mais caro dos iniciantes: confundir "o tema está em ' +
            'alta" com "este token vai subir". O tema explica de onde vem a atenção. Ele não diz ' +
            'qual token, nem quando, nem por quanto tempo.',
        ],
        detalhe: {
          titulo: 'onde a narrativa nasce, e quanto da atenção é fabricada',
          lista: [
            'O estudo dos 15,2 milhões de tokens é o "Meme Coin Factories", um preprint — estudo ' +
              'divulgado antes de passar pela revisão de outros cientistas. Ele achou 23,5% dos ' +
              'tokens criados logo depois de um post no X ou no Truth Social, e 31 desses posts ' +
              'renderam pelo menos US$ 1 milhão cada a quem criou o token.',
            'Cópias: 1,5 milhão de tokens copiam nome, símbolo, descrição e imagem de outro — mais ' +
              'de 10% de tudo. Entre os originais que ganharam cópia, 9,2% graduaram; entre as ' +
              'cópias, 0,86%. Graduar é completar a fase inicial do pump.fun e passar a ser ' +
              'negociado fora dela. O número alto dos originais tem um viés: só ganha cópia quem ' +
              'já chamou atenção.',
            'Fabricação: mais de 56% das contas do X que espalhavam convites para grupos eram bots ' +
              '— contas operadas por programa — ou foram suspensas, e 93% dos links postados por ' +
              'bots levavam a canais de pump-and-dump no Telegram (Nizzoli et al., IEEE Access, ' +
              '2020). Pump-and-dump é o esquema em que um grupo combina comprar junto para o ' +
              'preço subir e vender em cima de quem chegou depois. No estudo do pump.fun, 17% das ' +
              'negociações eram wash trading: alguém negociando consigo mesmo só para inflar o ' +
              'volume que aparece na tela.',
            'Em canais VIP de pump-and-dump, o nome da moeda sai de 12 a 24 horas antes do sinal ' +
              'público (Ardia & Bluteau, 2024). Quem vê o sinal na rede aberta chegou depois de ' +
              'quem organizou.',
            'Onde essa conversa acontece: no mesmo levantamento de três meses (Nizzoli et al., ' +
              'IEEE Access, 2020), o Discord tinha um único canal de pump-and-dump, contra 296 no ' +
              'Telegram. O estudo do pump.fun achou 800 mil canais públicos e 236 mil privados do ' +
              'Telegram ligados a tokens da plataforma, e viu que o top 1% dos grupos de ' +
              'criadores criou 58,6% de todos os tokens.',
            'O outro caso com data de nascimento: em outubro de 2024, o token GOAT nasce empurrado ' +
              'pelos posts de um bot de IA, o Truth Terminal.',
          ],
        },
        // Guardado, fora da tela (ver o cabeçalho do arquivo): as definições para
        // iniciante e os números com fonte que o desenho condensou nesta seção.
        foraDaTela: [
          'O estudo dos 15,2 milhões de tokens é o "Meme Coin Factories", um preprint de 2026. ' +
            'Preprint é um estudo divulgado antes de passar pela revisão de outros cientistas.',
          'Graduar é completar a fase inicial do pump.fun e passar a ser negociado fora dela.',
          'O número alto dos originais tem um viés: só ganha cópia quem já chamou atenção.',
          'Onde a narrativa nasce, nos dois casos com data: no fim de outubro de 2024, o esquilo ' +
            'Peanut é apreendido e morto em Nova York, e na esteira do caso surge o token PNUT; em ' +
            'outubro de 2024, o token GOAT nasce empurrado pelos posts de um bot de IA, o Truth ' +
            'Terminal.',
          'No mesmo levantamento de três meses (Nizzoli et al., IEEE Access, 2020), o Discord ' +
            'tinha um único canal de pump-and-dump, contra 296 no Telegram.',
          'O estudo do pump.fun achou 800 mil canais públicos e 236 mil privados do Telegram ' +
            'ligados a tokens da plataforma.',
          'No mesmo estudo, o top 1% dos grupos de criadores criou 58,6% de todos os tokens.',
        ],
      },
      {
        id: 'narrativa-e-preco',
        titulo: 'Narrativa ou hype de um token? E narrativa move preço?',
        emUmaFrase:
          'Narrativa é um tema que puxa vários tokens juntos, e não o hype de um token só. E não ' +
          'há evidência de que ela ajude a prever o preço.',
        // O fluxograma de triagem: uma pergunta, dois ramos e o nó final que os
        // dois ramos encontram. O nó final é o aviso 3 de 3 (ponte para as barras).
        triagem: {
          pergunta: 'O tema puxa vários tokens ao mesmo tempo?',
          sim: {
            rotulo: 'Sim',
            titulo: 'É narrativa',
            texto: 'Um tema, como "agentes de IA", que puxa vários tokens ao mesmo tempo',
          },
          nao: { rotulo: 'Não', titulo: 'Não é narrativa', texto: 'É o hype de um token só' },
          fim:
            'Nos dois casos: o tema explica a atenção, não a direção do preço. As barras abaixo ' +
            'mostram por quê.',
          descricao:
            'O tema puxa vários tokens ao mesmo tempo? Se sim, é narrativa: um tema, como agentes ' +
            'de IA, que puxa vários tokens. Se não, não é narrativa: é o hype de um token só. Nos ' +
            'dois casos, reconhecer o tema não diz qual token comprar, nem quando.',
        },
        // As duas barras na mesma escala. `valor` é o teto de cada faixa (3% e 6
        // pontos), só para o comprimento da barra; o que aparece escrito é `exibicao`.
        conta: {
          titulo: 'A conta que nenhum estudo fez para memecoin',
          sinal: {
            rotulo: 'O sinal social, no melhor caso',
            exibicao: '1% a 3%',
            valor: 3,
            nota: 'E só por poucos minutos.',
          },
          custo: {
            rotulo: 'Custo de entrar e sair (Módulo 5)',
            exibicao: '3 a 6 pontos',
            valor: 6,
            nota: 'O custo come o sinal antes de ele virar lucro.',
          },
          legenda:
            'Mesma escala, em pontos percentuais. A faixa de 1 a 3% é o teto do que os estudos ' +
            'acharam; nenhum deles é de memecoin de launchpad.',
          descricao:
            'No melhor caso, o sinal social rende de 1% a 3%, e só por poucos minutos. Entrar e ' +
            'sair de uma memecoin custa de 3 a 6 pontos. O custo come o sinal antes de ele virar ' +
            'lucro.',
        },
        // Os três achados. `tom` dá a cor do rótulo: 'alerta' (vermelho),
        // 'atencao' (âmbar) ou 'acento' (ciano).
        evidencias: [
          {
            rotulo: 'Aponta para perda',
            texto:
              'Depois do tweet de um influenciador, o preço sobe 1,83% no dia e cai 6,53% em 30 ' +
              'dias.',
            tom: 'alerta',
          },
          {
            rotulo: 'Dura minutos',
            texto:
              'A atenção prevê melhor quanto se negocia e quanto o preço oscila do que para que ' +
              'lado ele vai. Quando acerta o lado, o efeito dura minutos.',
            tom: 'atencao',
          },
          {
            rotulo: 'Muitas vezes é ao contrário',
            texto: 'O preço sobe primeiro, e só depois as pessoas falam dele.',
            tom: 'acento',
          },
        ],
        paragrafos: [
          'A primeira pergunta é de classificação e é fácil: o tema puxa vários tokens ao mesmo ' +
            'tempo? Se puxa, é narrativa. Se o que existe é um token só com muita gente falando, ' +
            'é hype daquele token. A diferença muda o que você procura: numa narrativa faz ' +
            'sentido perguntar quem foi o primeiro e quantos vieram depois; num hype isolado essa ' +
            'pergunta não tem resposta.',
          'A segunda pergunta é a que o mercado responde errado. Repete-se que narrativa move ' +
            'preço, e o que foi medido é bem menos do que isso. Para memecoin de launchpad — a ' +
            'criada num site de lançamento, como o pump.fun — não existe estudo revisado por ' +
            'pares que ligue, com um número, a atenção nas redes ao preço. Revisado por pares ' +
            'quer dizer conferido por outros cientistas antes de sair; é o selo que separa um ' +
            'resultado checado de uma afirmação de vendedor.',
          'O que existe são medições de fora dos launchpads, e elas apontam em três direções, ' +
            'todas ruins para quem quer usar atenção como sinal de compra: o retorno médio depois ' +
            'do post aponta para perda, o efeito que às vezes existe dura minutos, e muitas vezes ' +
            'a ordem é ao contrário — o preço sobe primeiro e a conversa vem depois.',
          'Na prática, a conta que decide não é a do sinal: é a do custo. Mesmo aceitando o melhor ' +
            'número que os estudos acharam, o sinal social rende de 1% a 3%, e só por poucos ' +
            'minutos. Entrar e sair de uma memecoin custa de 3 a 6 pontos percentuais (Módulo 5). ' +
            'As duas barras estão na mesma escala de propósito: o custo come o sinal antes de ele ' +
            'virar lucro.',
        ],
        exemplo: {
          titulo: 'Um número que parece um sinal, e não é',
          passos: [
            'Circula que tokens com link de Telegram no cadastro graduam cerca de 9 vezes mais no ' +
              'pump.fun (Kamat, preprint de 2026).',
            'Parece um filtro grátis: é só olhar se tem link.',
            'Mas o estudo mede só se o link existe — não se o canal tem gente, nem se alguém ' +
              'escreve nele.',
            'Link é o sinal mais barato de falsificar que existe: custa um campo preenchido.',
            'Se bastasse isso para prever graduação, bastaria isso para fabricar graduação.',
          ],
        },
        paragrafosFinais: [
          'O erro que esta seção evita é tratar "reconheci a narrativa" como "tenho uma ' +
            'vantagem". Reconhecer o tema é leitura de contexto, e contexto não é entrada. A tese ' +
            'de entrada do Módulo 4 precisa de outra coisa embaixo dela.',
        ],
        detalhe: {
          titulo: 'quais estudos dizem o quê',
          lista: [
            'Revisados que chegam perto, mas medem outra coisa: Li et al. (ACM Web Science 2025) ' +
              'compara o sentimento no X com a quantidade de negociações, não com o preço. Long, ' +
              'Wong & Cai (WWW 2025) só descreve médias.',
            'Tweet de influenciador, +1,83% no dia e −6,53% em 30 dias: Merkley et al., 2024. É um ' +
              'dado de fora dos launchpads.',
            'Atenção prevê negociação e oscilação melhor do que direção: Shen, Urquhart & Wang, ' +
              '2019. Efeito de minutos: com um milhão de mensagens sobre o Bitcoin, o sinal só ' +
              'valia por 15 minutos, e os autores escrevem que custos de transação razoáveis ' +
              'tornam impossível lucrar com ele (Guégan & Renault, 2021).',
            'Preço subindo antes da conversa: Süssmuth, Journal of Forecasting, 2021. Link de ' +
              'Telegram e graduação 9 vezes maior: Kamat, preprint de 2026.',
          ],
        },
        // Guardado, fora da tela (ver o cabeçalho do arquivo).
        foraDaTela: [
          'Memecoin de launchpad é a criada num site de lançamento, como o pump.fun.',
          'Revisado por pares quer dizer conferido por outros cientistas antes de sair.',
        ],
      },
      {
        id: 'rotacao',
        titulo: 'A rotação das narrativas, 2024–2025',
        emUmaFrase:
          'Cada tema dominou por semanas e deu lugar ao seguinte — enquanto o setor inteiro ' +
          'encolhia.',
        paragrafos: [
          'Rotação é isto: um tema domina a atenção por um tempo, perde força, e outro tema ocupa ' +
            'o lugar. Não é um tema crescendo e depois outro crescendo em cima; é revezamento. ' +
            'Entre dezembro de 2024 e novembro de 2025, o valor somado de todas as memecoins caiu ' +
            'de US$ 150,6 bilhões para US$ 47,2 bilhões (CoinGecko, State of Memecoins 2025). As ' +
            'narrativas se revezaram enquanto o setor inteiro encolhia.',
          'Esse é o ponto que a linha do tempo ensina e que nenhuma lista de "em alta" mostra: ' +
            'trocar de tema não é o mesmo que entrar num mercado que cresce. Dá para acertar qual ' +
            'é o tema da semana em cinco semanas seguidas e ainda assim estar dentro de um setor ' +
            'que encolheu.',
          'Para ler a tabela, uma palavra: market cap é o valor de mercado do token — quantas ' +
            'unidades existem vezes o preço de cada uma. É o número que a imprensa cita, e ele ' +
            'sobe e desce muito rápido justamente porque o preço multiplica tudo. O HAWK chegou a ' +
            'US$ 491 milhões de market cap e caiu mais de 90% em horas.',
          'Na prática, cada narrativa da tabela tem a mesma anatomia: um primeiro token com data, ' +
            'um pico com data, um tempo até perder a atenção e um destino. O que muda entre elas ' +
            'é a duração, e é aí que mora a armadilha de quem tenta virar isso em método.',
        ],
        exemplo: {
          titulo: 'Cinco casos não formam tendência',
          passos: [
            'Celebridades: primeiro token JENNER em 26/05/2024, pico em junho de 2024, cerca de 1 ' +
              'mês até perder a atenção.',
            'Animais virais: MOODENG em 11/09/2024, dois picos (28/09 e 15/11/2024), cerca de 2 ' +
              'meses — o dobro da anterior.',
            'Internet Capital Markets: LAUNCHCOIN em 03/05/2025, pico em 15/05/2025, cerca de 4 ' +
              'dias.',
            'Se você tivesse usado a duração da primeira para cronometrar a segunda, erraria por ' +
              'cerca de um mês. Se tivesse usado a segunda para cronometrar a última, erraria por ' +
              'semanas.',
            'A última foi de longe a mais curta, mas a de animais durou mais que a de ' +
              'celebridades: a sequência não é "cada vez mais rápido".',
          ],
        },
        paragrafosFinais: [
          'O erro comum que esta seção evita é usar a linha do tempo como relógio. Ela serve para ' +
            'você reconhecer o formato — nasce, pico, esteira, queda — e para lembrar que o tema ' +
            'seguinte sempre começou antes de o anterior acabar. Ela não serve para estimar ' +
            'quanto tempo falta para o tema de hoje.',
        ],
        detalhe: {
          titulo: 'o que está confirmado e o que veio de resumo de busca',
          lista: [
            'Os dois picos de preço confirmados em duas fontes: o do MOODENG em 15/11/2024 e o do ' +
              'GOAT em 17/11/2024, na CoinMarketCap e na CoinGecko.',
            'Vieram de resumo de busca, e não da página aberta: a queda média de 94% das ' +
              'celebridades, o MOODENG, as mais de 700 memecoins-cópia enviadas à carteira do ' +
              'TRUMP em três semanas e as mais de 21 mil moedas da primeira semana do Believe. A ' +
              'lista completa está em "não verificado", na aba Quiz.',
            'Uma divergência aberta: a pesquisa 11 data os futuros de MOODENG na Binance em ' +
              '15/11/2024; a reconciliação dela diz 25/10/2024.',
            'O que 2026 mostra até aqui não é um tema novo: é retração do setor, sem nenhuma ' +
              'narrativa dominante confirmada.',
          ],
        },
        // A linha do tempo. As datas ficam EXATAMENTE como a pesquisa achou: com o
        // intervalo ("10–11/10/2024") e o "~" de aproximado. O desenho tirou os dois;
        // não copiar. `tom: 'atencao'` = ponto âmbar.
        linhaDoTempo: {
          marcos: [
            {
              data: '26/05/2024',
              titulo: 'Celebridades: Caitlyn Jenner lança o JENNER',
              texto:
                'Na esteira vieram MOTHER (Iggy Azalea) e DADDY (Andrew Tate). Cerca de um mês depois, ' +
                'os 30 tokens de celebridades da Solana acumulavam queda média de 94%.',
            },
            {
              data: '11/09/2024',
              titulo: 'Animais: nasce o MOODENG',
              texto: 'Depois viria o PNUT, listado na Binance em 11/11/2024.',
            },
            {
              data: '10–11/10/2024',
              titulo: 'IA: nasce o GOAT, empurrado pelo bot Truth Terminal',
              texto:
                'O GOAT chegou a cerca de US$ 1,3 bilhão em 17/11/2024. O tema vira "agentes de IA": ' +
                'ai16z, Virtuals, AIXBT.',
            },
            {
              data: '04–05/12/2024',
              titulo: 'HAWK, o token da influenciadora Hawk Tuah',
              texto:
                'O market cap chegou a US$ 491 milhões e caiu mais de 90% em horas. Virou ação ' +
                'coletiva nos EUA.',
              tom: 'atencao',
            },
            {
              data: '~06/01/2025',
              titulo: 'Pico dos agentes de IA: cerca de US$ 20 bilhões somados',
              texto: 'Em fevereiro, cerca de US$ 6,5 bilhões.',
            },
            {
              data: '17/01/2025',
              titulo: 'Políticos: lançamento do TRUMP',
              texto: 'Em três semanas, mais de 700 memecoins-cópia foram enviadas à carteira dele.',
            },
            {
              data: '14/02/2025',
              titulo: 'LIBRA, promovida por Javier Milei',
              texto:
                'Das 15.430 carteiras que negociaram mais de US$ 1.000, mais de 86% venderam no ' +
                'prejuízo, somando US$ 251 milhões (Nansen). Fim da onda de memecoins políticas.',
              tom: 'atencao',
            },
            {
              data: '12–15/05/2025',
              titulo: '"Internet Capital Markets": pico do LAUNCHCOIN, no app Believe',
              texto: 'Mais de 21 mil moedas na primeira semana; a queda começou em dias.',
            },
            {
              data: '2026',
              titulo: 'Nenhuma narrativa dominante confirmada',
              texto: 'O que os dados mostram é retração do setor.',
              tom: 'atencao',
            },
          ],
          nota:
            'Datas e números de imprensa e de relatórios de empresa, vários só por resumo de busca. ' +
            'Detalhes em "não verificado", na aba Quiz.',
        },
        // A tabela das cinco narrativas: uma narrativa por linha.
        tabela: {
          rotuloDasLinhas: 'Narrativa',
          rotulo: 'As cinco narrativas, lado a lado (role na horizontal se preciso)',
          larguraMinima: 640,
          colunas: [
            { chave: 'nascimento', rotulo: 'Primeiro token' },
            { chave: 'pico', rotulo: 'Pico' },
            { chave: 'duracao', rotulo: 'Até perder a atenção' },
            { chave: 'destino', rotulo: 'O que aconteceu' },
          ],
          linhas: [
            {
              titulo: 'Celebridades',
              valores: {
                nascimento: 'JENNER, 26/05/2024',
                pico: 'Junho de 2024',
                duracao: 'Cerca de 1 mês',
                destino: '30 tokens: queda média de 94%; metade perdeu mais de 99%',
              },
            },
            {
              titulo: 'Animais virais',
              valores: {
                nascimento: 'MOODENG, 11/09/2024',
                pico: 'Dois picos: 28/09 e 15/11/2024 (~US$ 614 mi)',
                duracao: 'Cerca de 2 meses',
                destino: 'MOODENG −44% do pico até 27/11/2024',
              },
            },
            {
              titulo: 'IA / agentes',
              valores: {
                nascimento: 'GOAT, 10–11/10/2024',
                pico: '~06/01/2025, cerca de US$ 20 bi somados',
                duracao: 'Cerca de 1 mês de queda',
                destino: 'Setor −67% até fevereiro de 2025',
              },
            },
            {
              titulo: 'Políticos',
              valores: {
                nascimento: 'TRUMP, 17/01/2025',
                pico: 'Janeiro de 2025',
                duracao: 'Cerca de 1 mês, até a LIBRA',
                destino: 'LIBRA: mais de 86% das carteiras acima de US$ 1.000 no prejuízo',
              },
            },
            {
              titulo: 'Internet Capital Markets',
              valores: {
                nascimento: 'LAUNCHCOIN, 03/05/2025',
                pico: '15/05/2025',
                duracao: 'Cerca de 4 dias',
                destino: 'Receita semanal do Believe −94% do pico, em junho de 2025',
              },
            },
          ],
          frase:
            'A última das cinco (Believe) foi de longe a mais curta, mas cinco casos não formam ' +
            'tendência: a de animais durou mais que a de celebridades.',
        },
      },
      {
        id: 'ferramentas',
        titulo: 'Rastrear: o que cada ferramenta mede',
        emUmaFrase:
          'Uma lista de "em alta" mostra onde a atenção está agora. Não mostra se essa atenção é ' +
          'real.',
        // A tabela, conferida na documentação de cada ferramenta em 13 e 14/09/2026.
        // A coluna `novo` é um selo com cor (`tom`): 'alerta' (vermelho) = cobre
        // memecoin nova; 'atencao' (âmbar) = em parte, ou não verificado; 'ok'
        // (verde) = não cobre. `selo: 'curto'` = selo numa linha só, em 13px e
        // negrito. A coluna `comprado` tem a borda ciano do desenho.
        tabela: {
          rotuloDasLinhas: 'Ferramenta',
          rotulo: 'O que cada ferramenta mede (role na horizontal se preciso)',
          larguraMinima: 680,
          colunas: [
            { chave: 'mede', rotulo: 'O que mede' },
            { chave: 'novo', rotulo: 'Memecoin nova', selo: 'curto' },
            { chave: 'gratis', rotulo: 'Ler é grátis' },
            { chave: 'comprado', rotulo: 'Pago ou fabricável', destaque: true },
          ],
          linhas: [
            {
              titulo: 'DexScreener',
              subtitulo: 'lista "em alta"',
              valores: {
                mede: 'Um "Trending Score" próprio: volume, liquidez, transações, carteiras distintas, holders, visitas à página e reações. A fórmula não é publicada.',
                novo: { texto: 'Sim', tom: 'alerta' },
                gratis: 'Sim',
                comprado: 'Sim: Boosts pagos multiplicam o score por 12 a 24 horas. Visitas e reações também são fabricáveis.',
              },
            },
            {
              titulo: 'GMGN',
              subtitulo: 'lista "em alta" e carteiras',
              valores: {
                mede: 'Compras e vendas, volume, variação de preço e crescimento de holders, por minuto; também carteiras "smart money" e de influenciadores.',
                novo: { texto: 'Sim', tom: 'alerta' },
                gratis: 'Sim. Operar pede login com a chave privada num bot do Telegram — risco de custódia (Módulo 5).',
                comprado: 'Fabricável: são os números que o wash trading infla.',
              },
            },
            {
              titulo: 'Birdeye',
              valores: {
                mede: 'Tokens que mais se moveram numa janela de tempo; mais vistos e mais negociados.',
                novo: { texto: 'Sim', tom: 'alerta' },
                gratis: 'Sim. A API custa de US$ 39 a US$ 499 por mês; o PRO, US$ 45 por mês (não verificado).',
                comprado: 'Fabricável pela mesma via.',
              },
            },
            {
              titulo: 'pump.fun',
              subtitulo: 'board',
              valores: {
                mede: 'A atividade recente de negociação dos tokens da plataforma.',
                novo: { texto: 'Sim — é onde nascem', tom: 'alerta' },
                gratis: 'Sim. Negociar na curva custa 1,25% por operação.',
                comprado: 'Fabricável.',
              },
            },
            {
              titulo: 'LunarCrush',
              valores: {
                mede: 'Sentimento e volume de posts no X, Reddit, YouTube e TikTok.',
                novo: { texto: 'Em parte', tom: 'atencao' },
                gratis: 'Não para o social: o plano grátis só tem dados de mercado. O social vai de US$ 5 a US$ 45 por dia.',
                comprado: 'Sem mecanismo de compra documentado, mas posts podem vir de bots.',
              },
            },
            {
              titulo: 'Santiment',
              valores: {
                mede: 'Volume social e as palavras que dispararam, a partir de mais de 6.000 canais de cripto.',
                novo: { texto: 'Não verificado', tom: 'atencao' },
                gratis: 'Grátis limitado; o resto é pago.',
                comprado: 'Posts podem vir de bots.',
              },
            },
            {
              titulo: 'Kaito',
              valores: {
                mede: 'Mindshare de projetos e de temas.',
                novo: { texto: 'Não', tom: 'ok' },
                gratis: 'Pago. O programa "Yaps" acabou em 15/01/2026 (não verificado).',
                comprado: 'Não pesquisado.',
              },
            },
            {
              titulo: 'Google Trends',
              valores: {
                mede: 'Interesse de busca relativo, de 0 a 100, por termo, período e região.',
                novo: { texto: 'Só com busca suficiente', tom: 'atencao' },
                gratis: 'Sim',
                comprado: 'Sem mecanismo de compra documentado. O número é relativo e tem ruído de propósito.',
              },
            },
            {
              titulo: 'X',
              subtitulo: 'busca avançada e listas',
              valores: {
                mede: 'Posts públicos, filtráveis por conta, data e curtidas.',
                novo: { texto: 'Sim', tom: 'alerta' },
                gratis: 'Sim, mas só logado. O Premium vai de US$ 3 a US$ 40 por mês e não muda a busca.',
                comprado: 'Contas e curtidas podem ser de bots: de 9% a 15% das contas ativas do X são bots (Varol et al., 2017).',
              },
            },
            {
              titulo: 'Arkham e Nansen',
              valores: {
                mede: 'Carteiras rotuladas como traders lucrativos ("smart money").',
                novo: { texto: 'Em parte', tom: 'atencao' },
                gratis: 'Nível grátis limitado. Nansen Pro: US$ 49 a US$ 69 por mês.',
                comprado: 'Não pesquisado.',
              },
            },
          ],
        },
        paragrafos: [
          'Toda ferramenta desta tabela responde à mesma pergunta — "o que está bombando agora?" ' +
            '— e cada uma responde com uma matéria-prima diferente. Umas contam negociação ' +
            '(quantas compras, quanto volume, quantas carteiras). Outras contam conversa (quantos ' +
            'posts, com que sentimento). Uma conta busca no Google. Saber qual matéria-prima está ' +
            'por trás do ranking é a diferença entre ler o número e acreditar nele.',
          'Isso importa porque as duas matérias-primas são fabricáveis, e são fabricadas. ' +
            'Negociação se fabrica com wash trading, que é negociar consigo mesmo para inflar o ' +
            'volume — o Módulo 6 mostra como isso aparece na tela. Conversa se fabrica com bots: ' +
            'de 9% a 15% das contas ativas do X são bots (Varol et al., 2017). E há um terceiro ' +
            'caminho, mais direto que os dois: comprar o lugar na lista. Os Boosts do DexScreener ' +
            'multiplicam o score de um token por 12 a 24 horas.',
          'Na prática, leia a tabela da direita para a esquerda. A coluna "Pago ou fabricável" diz ' +
            'o que pode ter sido comprado ou inventado naquele número; a coluna "Ler é grátis" diz ' +
            'quanto custa a resposta. Onde está escrito "API", trata-se do jeito de um programa ' +
            'puxar os dados automaticamente, sem ninguém clicando — é quase sempre a parte cara.',
          'Um detalhe de vocabulário que aparece em duas linhas: mindshare é a fatia da conversa ' +
            'nas redes que um projeto ou tema ocupa. É uma medida de atenção relativa, não de ' +
            'dinheiro, e ninguém publicou validação dela como previsão de preço.',
        ],
        exemplo: {
          titulo: 'O mesmo token, três listas, três respostas',
          passos: [
            'No DexScreener ele está em alta porque o Trending Score somou volume, liquidez, ' +
              'transações, carteiras distintas, holders, visitas à página e reações — com uma ' +
              'fórmula que não é publicada.',
            'No LunarCrush ele pode não aparecer: o plano grátis só traz dados de mercado, e o ' +
              'social vai de US$ 5 a US$ 45 por dia.',
            'No Google Trends ele pode marcar zero, porque o índice é relativo, de 0 a 100, e só ' +
              'registra o que tem busca suficiente.',
            'Nenhuma das três está errada. As três medem coisas diferentes — e só uma delas ' +
              'poderia ter sido comprada por 12 a 24 horas.',
          ],
        },
        paragrafosFinais: [
          'O erro comum que isso evita é usar "está em alta" como confirmação. A lista confirma ' +
            'que houve atividade, e atividade é exatamente o que o volume falso do Módulo 6 ' +
            'fabrica. Nenhuma dessas métricas tem validação publicada como previsão de preço de ' +
            'memecoin.',
        ],
        detalhe: {
          titulo: 'preços, fórmulas e o que não foi conferido',
          lista: [
            'O Galaxy Score e o AltRank do LunarCrush são descritos só por material do próprio ' +
              'vendedor.',
            'A fórmula do Trending Score do DexScreener não é publicada; os componentes, sim. O ' +
              'preço dos Boosts não aparece em nenhuma página oficial: os pacotes que circulam ' +
              'são de terceiros.',
            'Preços que vieram de resumo de busca, não da página aberta: o Birdeye PRO (US$ 45 ' +
              'por mês), o X Premium (US$ 3 a US$ 40 por mês) e o Nansen Pro (US$ 49 a US$ 69 por ' +
              'mês). Os da API do Birdeye (US$ 39 a US$ 499 por mês) e do LunarCrush vieram da ' +
              'página de preços.',
            'Operar pelo GMGN pede login com a chave privada num bot do Telegram — risco de ' +
              'custódia, tratado no Módulo 5. Negociar na curva do pump.fun custa 1,25% por ' +
              'operação. O programa "Yaps", do Kaito, acabou em 15/01/2026 (não verificado).',
          ],
        },
        // Guardado, fora da tela (ver o cabeçalho do arquivo).
        foraDaTela: [
          'O Galaxy Score e o AltRank do LunarCrush são descritos só por material do próprio ' +
            'vendedor.',
        ],
      },
      {
        id: 'rotina',
        titulo: 'Uma rotina de estudo de narrativa',
        emUmaFrase:
          'Esta rotina serve para treinar o olho. Não é método de entrada — nenhum destes passos ' +
          'foi medido como capaz de melhorar resultado.',
        paragrafos: [
          'A rotina é um exercício de observação com caderno, não um procedimento de compra. Você ' +
            'abre as mesmas telas todo dia, anota o que viu, e semanas depois confere se a sua ' +
            'leitura batia com o que aconteceu. O produto dela não é uma entrada: é uma taxa de ' +
            'acerto sua, medida por você.',
          'Ela importa porque o julgamento de fase — "isto está crescendo" contra "isto está ' +
            'saturando" — é a única parte deste módulo que não tem ferramenta. Não existe campo ' +
            'nenhum, em tela nenhuma, escrito "fase". Só existe você olhando muitos temas e ' +
            'errando barato, em vez de errar caro uma vez.',
          'Na prática são dois blocos. O primeiro é olhar: o feed de lançamentos, duas listas de ' +
            '"em alta", e a caça à origem do tema fora de cripto. Na busca avançada do X, que ' +
            'funciona de graça desde que você esteja logado, o operador from: filtra por conta e ' +
            'since: filtra por data. O segundo bloco é anotar no diário do Módulo 7 — data, tema, ' +
            'primeiro token e a fase que você acha que é — e voltar depois para conferir.',
        ],
        paragrafosFinais: [
          'O erro comum que esta rotina evita é o pior de todos: transformar observação em ordem ' +
            'de compra no mesmo instante. Por isso o último passo é uma porta, e não uma seta. Se ' +
            'um token chamar a sua atenção durante o exercício, ele passa pelo Checklist antes de ' +
            'qualquer outra coisa.',
        ],
        rotuloDosPassos: 'Uma vez por dia, ou quando um tema chamar atenção',
        // O último passo (o Checklist) sai destacado em ciano.
        passos: [
          'Abra o feed de lançamentos do pump.fun e duas listas de "em alta". Anote os temas que ' +
            'se repetem.',
          'Ao ler as listas, lembre: parte delas é paga, e as cópias seguem a narrativa, não a ' +
            'criam.',
          'Procure a origem fora de cripto: o post, a notícia, o vídeo. Na busca avançada do X ' +
            '(só logado), from: filtra por conta e since: filtra por data.',
          'Veja há quanto tempo o tema existe e quantos tokens já copiaram. Muitos tokens novos ' +
            'com o valor do tema caindo é o desenho da saturação.',
          'Anote no diário do Módulo 7: data, tema, primeiro token e a fase que você acha que é.',
          'Depois de algumas semanas, confira quantas vezes a sua leitura de fase acertou.',
          'Se um token chamar sua atenção, ele passa pelo Checklist antes de qualquer outra coisa.',
        ],
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // Aba "Pilar social na prática" — pesquisa 5 dos módulos (pilar social) e a
  // prova ao vivo do ticker repetido (VERIFICACOES-AO-VIVO.md, seção 7).
  // As quatro seções seguem o desenho "M3 Desktop", na ordem da aba.
  // ---------------------------------------------------------------------------
  praticaSocial: {
    // Esta aba NÃO tem "Antes de ler: o que você acha?" (o desenho também não
    // tem o bloco). As 13 perguntas do quiz já estão ocupadas: q6, q5 e q7 são a
    // "Pergunta rápida" das seções desta aba, q8 fecha a Parte 3, e as que
    // sobram (q2 sobre o nome Axiom, q10 sobre o Bubblemaps) são de outras abas.
    // A q4 usada antes aqui já é a "Pergunta rápida" da aba "Visão geral": o
    // aluno chegaria a este pré-teste depois de ter visto a resposta certa.
    perguntaAntes: null,

    destaques: [
      {
        rotulo: 'Jeitos grátis, permitidos e automáticos de monitorar o social',
        valor: '1',
        nota:
          'Seguir um canal de anúncios do Discord no seu próprio servidor. X, Telegram e o resto ' +
          'do Discord: só à mão, ou com API paga.',
      },
      {
        rotulo: 'Carteiras esvaziadas pelo Inferno Drainer',
        valor: '30 mil+',
        nota:
          'Pelo menos US$ 9 milhões em seis meses. O caminho: bot falso de verificação → site ' +
          'falso → assinatura. (Check Point Research, 2025)',
        tom: 'alerta',
      },
      {
        rotulo: 'Retorno médio 30 dias depois do tweet de um influenciador',
        valor: '−6,53%',
        nota: '36 mil tweets de 180 influenciadores (Review of Accounting Studies, 2024). Call é atenção, não valor.',
        tom: 'alerta',
      },
    ],

    secoes: [
      {
        id: 'rotina',
        titulo: 'A rotina de 5 minutos, para todo token novo',
        emUmaFrase: 'Qualquer divergência de endereço, em qualquer etapa, encerra a checagem: não compre.',
        // Os passos abrem um de cada vez (clique ou setas). `tempo` é a janela de
        // cada passo, em minutos:segundos.
        passos: [
          {
            tempo: '0–45 s',
            titulo: 'Ache a conta oficial no X',
            texto:
              'Confira o @ letra por letra (l e I, 0 e o), veja se há badge de afiliação e se a bio ' +
              'aponta para um site. Se você só tem um @ que veio de resposta de post ou de DM, pare.',
          },
          {
            tempo: '45 s–1:30',
            titulo: 'Abra o site oficial pelo link da bio',
            texto: 'Ache o endereço do contrato no site e copie dali. É a sua fonte de maior confiança.',
          },
          {
            tempo: '1:30–2:00',
            titulo: 'Compare com o post fixado do X oficial',
            texto: 'O endereço do site e o do post fixado têm que ser o mesmo, caractere por caractere. Se não forem, pare.',
          },
          {
            tempo: '2:00–3:30',
            titulo: 'Cole o endereço no explorador',
            texto:
              'Na Solana, o Solscan: extensões, autoridades, idade e holders. Numa rede EVM, o ' +
              'Etherscan: contrato "verified" quer dizer que o código publicado bate com o que roda ' +
              '— não que é seguro ou auditado.',
          },
          {
            tempo: '3:30–4:30',
            titulo: 'Cole o endereço no DexScreener',
            texto:
              'Olhe liquidez, volume e negociações. Ícone e links da página não provam nada: são ' +
              'preenchidos e pagos pelo próprio projeto.',
          },
          {
            tempo: '4:30–5:00',
            titulo: 'Sanidade final no canal oficial',
            texto:
              'Abra t.me/s/nomedocanal no navegador e confira se o endereço anunciado bate com o ' +
              'que você já validou. Se o token chegou por um call, procure os sinais de call pago.',
          },
        ],
        legendaDosPassos: 'Na ordem em que você abre cada coisa. O tempo é uma referência, não um cronômetro.',
        // Os dois endereços são INVENTADOS (o selo "endereços inventados" aparece na
        // tela): mostram a forma do golpe, não um token real. Só o meio muda.
        enderecos: {
          titulo: 'Endereço oficial × endereço colado numa resposta',
          selo: 'endereços inventados',
          itens: [
            {
              rotulo: 'Do site oficial, e igual ao post fixado',
              inicio: '7xKq',
              meio: 'Rt4mP9vZ2hLbN6yDcE8sWfJ3aQu5',
              fim: 'gT1n',
              nota: 'As duas fontes oficiais batem, caractere por caractere. Identidade confirmada.',
              tom: 'ok',
            },
            {
              rotulo: 'De uma resposta embaixo do post viral',
              inicio: '7xKq',
              meio: 'Bd7wS1kY4jXzM8pFhR2vNc6tLe9o',
              fim: 'gT1n',
              nota: 'Mesmo começo, mesmo fim. Só o meio muda. Não compre.',
              tom: 'alerta',
            },
          ],
          descricao:
            'Dois endereços com o mesmo começo e o mesmo fim; só os caracteres do meio mudam. O ' +
            'primeiro vem do site oficial e bate com o post fixado. O segundo veio de uma resposta ' +
            'embaixo de um post viral.',
          legenda:
            'Golpistas geram endereços com os mesmos primeiros e últimos caracteres do original, ' +
            'para enganar quem só olha as pontas. Compare o endereço inteiro, caractere por ' +
            'caractere.',
        },
        paragrafos: [
          'O endereço do contrato é uma sequência longa de letras e números, e é a identidade do ' +
            'token na blockchain. Duas coisas decorrem disso. A primeira: o nome e o ticker — o ' +
            'apelido curto do token — não identificam nada, porque qualquer pessoa pode criar um ' +
            'token com o nome e o ticker que quiser. A segunda: a rotina toda existe para ' +
            'responder a uma pergunta só, que é qual dos endereços parecidos é o verdadeiro.',
          'Isso importa porque o golpe mais barato do mercado não mexe no seu dinheiro: ele mexe ' +
            'no que você copia. Você faz tudo certo — checa a liquidez, checa o contrato, calcula ' +
            'o tamanho da posição — em cima do token errado. Nenhuma checagem técnica te protege ' +
            'disso, porque ela vai analisar direitinho o contrato que você pediu.',
          'Na prática, a ordem das fontes é o que decide. O projeto publica o endereço em três ' +
            'lugares. Do mais confiável para o menos: o site oficial, a bio ou o post fixado do X ' +
            'oficial, e o canal oficial de anúncios no Discord ou no Telegram. Nunca pegue o ' +
            'endereço de DM (mensagem privada), de resposta embaixo de post viral, de site que ' +
            'veio de anúncio ou de busca, nem de QR code ou link encurtado.',
          'Os seis passos cronometrados são essa ordem virada em relógio. O tempo é referência, ' +
            'não meta: o que importa é que cada passo confirme o anterior, e que o passo do post ' +
            'fixado seja literalmente comparar dois endereços caractere por caractere. Golpistas ' +
            'geram endereços com os mesmos primeiros e últimos caracteres do original, para ' +
            'enganar quem só olha as pontas.',
        ],
        exemplo: {
          titulo: 'Três tokens, um nome',
          passos: [
            'Em 12/09/2026, dois tokens diferentes do pump.fun usavam o ticker SATOSHI ao mesmo ' +
              'tempo.',
            'Um terceiro tinha o ticker "Usdt", imitando uma stablecoin — moeda feita para ' +
              'acompanhar o dólar.',
            'Nos três casos o nome na tela estava "certo". Os endereços eram outros.',
            'Se a sua checagem começa pelo nome, ela começa no único campo que não prova nada.',
          ],
        },
        paragrafosFinais: [
          'O erro comum que esta rotina evita é confiar na semelhança. Mesmo começo e mesmo fim ' +
            'não são confirmação: são o desenho do golpe. Divergência entre duas fontes oficiais ' +
            'também não é para investigar — é para encerrar a checagem.',
        ],
        // Guardado, fora da tela (ver o cabeçalho do arquivo).
        foraDaTela: [
          'O endereço do contrato é uma sequência longa de letras e números. Ele é a identidade ' +
            'do token na blockchain.',
          'Ticker é o apelido curto do token.',
          'O terceiro token com o ticker "Usdt" imitava uma stablecoin: moeda feita para ' +
            'acompanhar o dólar.',
        ],
      },
      {
        id: 'perfil',
        titulo: 'O que olhar num perfil que se diz oficial',
        emUmaFrase:
          'No X, o selo azul só quer dizer que a conta paga uma assinatura. Ele não prova que a ' +
          'conta é do projeto.',
        // Mockup desenhado (não é captura): cada painel tem um número, e a lista ao
        // lado explica o que olhar nele. `grade` monta as linhas do mockup: `cols`
        // é a divisão da linha, `ids` os painéis, `altura` a altura mínima.
        // Painel com `alerta: true` sai em âmbar.
        anatomia: {
          paineis: {
            nome: { rotulo: 'Nome e @handle' },
            selo: { rotulo: 'Selo · badge de afiliação', alerta: true },
            bio: { rotulo: 'Bio com o link do site' },
            data: { rotulo: 'Entrou em · seguidores' },
            fixado: { rotulo: 'Post fixado com o endereço' },
            respostas: { rotulo: 'Respostas: "o endereço certo é este…"', alerta: true },
          },
          grade: [
            { cols: '2fr 1fr', ids: ['nome', 'selo'], altura: '46px' },
            { cols: '2fr 1fr', ids: ['bio', 'data'], altura: '50px' },
            { cols: '1fr', ids: ['fixado'], altura: '46px' },
            { cols: '1fr', ids: ['respostas'], altura: '52px' },
          ],
          itens: [
            { painel: 'nome', titulo: 'Nome e @handle', texto: 'O nome qualquer um copia. O @ é único: compare letra por letra, atrás de caractere trocado.' },
            { painel: 'selo', titulo: 'Selo', texto: 'Azul é assinatura Premium, não identidade. Dourado é organização verificada; o badge de afiliação liga a conta a uma.' },
            { painel: 'bio', titulo: 'Bio', texto: 'O link do site sai daqui. Não use site achado por busca ou anúncio.' },
            { painel: 'data', titulo: 'Data de entrada e seguidores', texto: 'Conta nova para um projeto "antigo", ou muitos seguidores com pouco engajamento, são sinais de conta falsa.' },
            { painel: 'fixado', titulo: 'Post fixado', texto: 'É onde o projeto costuma deixar o endereço. Tem que bater com o do site.' },
            { painel: 'respostas', titulo: 'Respostas', texto: 'Endereço colado em resposta é o golpe clássico. Nunca pegue o endereço daqui.' },
          ],
          nota: 'Mockup desenhado, não captura do X. Os campos aparecem sem valores: o que se aprende é onde olhar.',
          legenda:
            'Selos segundo a central de ajuda do X, consultada em setembro de 2026. Selo azul: ' +
            'assinatura Premium ativa, sem revisão de identidade. Dourado: organização verificada. ' +
            'Cinza: governo.',
        },
        paragrafos: [
          'Um perfil no X tem um campo que é único e vários que não são. O único é o @handle — o ' +
            'arroba, o endereço da conta. Nome, foto, bio e número de seguidores qualquer pessoa ' +
            'copia em minutos. Por isso a leitura de um perfil "oficial" é sempre a mesma: achar ' +
            'o campo que não pode ser copiado e conferir letra por letra.',
          'O selo confunde porque parece identidade e não é. Azul quer dizer assinatura Premium ' +
            'ativa, sem revisão de quem é a pessoa — e o Premium custa de US$ 3 a US$ 40 por mês. ' +
            'Dourado quer dizer organização verificada. O badge de afiliação é o selinho que liga ' +
            'uma conta a uma organização dessas, e esse, sim, diz alguma coisa sobre vínculo.',
          'Isso importa porque o perfil é a porta de entrada da rotina de 5 minutos: é dele que ' +
            'sai o link do site, e é do site que sai o endereço. Errar o perfil contamina tudo o ' +
            'que vem depois, e o perfil errado costuma ser o mais caprichado dos dois.',
          'Na prática, os sinais grátis de conta falsa são quatro: @ com caractere trocado (l por ' +
            'I, 0 por o); conta criada há pouco, ou que trocou de @ recentemente, para um projeto ' +
            'que se diz antigo; selo azul sem badge de afiliação num "perfil oficial"; e muitos ' +
            'seguidores com pouco engajamento, com respostas repetitivas de bots. Nenhum deles ' +
            'custa dinheiro nem exige ferramenta.',
        ],
        exemplo: {
          titulo: 'O que o selo azul prova',
          passos: [
            'Uma conta que se diz oficial tem selo azul, muitos seguidores e o endereço no post ' +
              'fixado.',
            'O selo azul prova uma coisa: que alguém está pagando a assinatura Premium daquela ' +
              'conta.',
            'Não prova que a conta é do projeto, que o endereço é o certo, nem que o token existe.',
            'O que prova vínculo é o badge de afiliação — e, mesmo com ele, o endereço ainda tem ' +
              'de bater com o do site.',
          ],
        },
        paragrafosFinais: [
          'O erro comum aqui é ler o perfil como um documento. Ele é uma vitrine: quase tudo nela ' +
            'foi escolhido por quem montou. Trate cada campo pela pergunta "isto pode ser copiado ' +
            'por qualquer um?" — e o que sobrar é a sua checagem.',
        ],
        detalhe: {
          titulo: 'a busca avançada do X',
          lista: [
            [
              'Funciona de graça, desde que você esteja logado. ',
              { mono: 'from:conta' },
              ' mostra só os posts dela; ',
              { mono: 'since:2026-09-01' },
              ' filtra por data; ',
              { mono: 'min_faves:100' },
              ' mostra só os posts com pelo menos 100 curtidas; aspas buscam o endereço exato.',
            ],
            [
              'Os operadores ',
              { mono: 'near:' },
              ', ',
              { mono: 'source:' },
              ' e ',
              { mono: 'geocode:' },
              ' foram removidos. Eles devolvem página vazia, sem aviso de erro — o que é pior que ' +
                'um erro, porque parece resposta.',
            ],
            'Automatizar essa checagem de graça não existe: raspar o X fora da API é proibido pelos ' +
              'termos, e a API é paga. Raspar é um programa lendo as páginas como se fosse uma ' +
              'pessoa.',
          ],
        },
      },
      {
        id: 'discord-telegram',
        titulo: 'Discord e Telegram: os golpes, e a defesa de cada um',
        emUmaFrase:
          'Os golpes chegam por link e por bot falso. A defesa é entrar pelo site oficial e não ' +
          'assinar nada que veio da comunidade.',
        // Os quatro golpes do Discord, do mais frequente nos alertas de segurança
        // para o menos: como o golpe funciona, e a defesa de cada um.
        golpes: [
          {
            titulo: 'Servidor falso',
            como:
              'O projeto deixa de pagar o link curto (discord.gg/nome), o golpista assume esse link ' +
              'e recria um servidor idêntico.',
            defesa: 'Entre sempre pelo link do site ou do X oficial.',
          },
          {
            titulo: 'Bot falso de verificação',
            como:
              'Parece o Collab.Land, mas o @ é outro. Leva a um site que pede para conectar a ' +
              'carteira e assinar. Foi o caminho do Inferno Drainer.',
            defesa: 'Verificação legítima não pede assinatura.',
          },
          {
            titulo: '"Conecte a carteira"',
            como: 'Depois de conectar, uma assinatura autoriza a transferência silenciosa dos seus ativos.',
            defesa:
              'Não assine nada que veio de link de comunidade; use uma carteira separada para ' +
              'projetos novos (Módulo 1).',
          },
          {
            titulo: 'DM de "suporte" e admin invadido',
            como:
              'Suporte de verdade não chama primeiro, e até um anúncio oficial pode vir de conta ' +
              'sequestrada.',
            defesa:
              'Desligue DMs de membros do servidor. Trate anúncio urgente com link como suspeito até ' +
              'conferir no site.',
          },
        ],
        paragrafos: [
          'Assinar é aprovar uma mensagem com a sua carteira. Parece inofensivo porque não é uma ' +
            'transferência: você não está mandando dinheiro, está autorizando algo. É exatamente ' +
            'por isso que funciona como golpe — em golpe, uma assinatura pode autorizar a saída ' +
            'dos seus ativos sem você perceber, na hora que o golpista escolher.',
          'No Discord, os quatro golpes dos cartões acima são variações de um truque só: fazer ' +
            'você chegar num site pela comunidade em vez de chegar pelo site oficial. O bot falso ' +
            'de verificação foi o caminho do Inferno Drainer — drainer é um golpe feito para ' +
            'esvaziar carteiras —, que esvaziou mais de 30 mil carteiras e levou pelo menos ' +
            'US$ 9 milhões em seis meses. A defesa é curta: verificação legítima não pede ' +
            'assinatura.',
          [
            'No Telegram o risco muda de lugar. Ler é seguro e nem exige entrar no grupo: abra ',
            { mono: 't.me/s/nomedocanal' },
            ' no navegador. O perigo está nos bots de compra — robôs dentro do Telegram que ' +
              'compram e vendem tokens por você. Muitos criam a carteira e guardam a chave ' +
              'privada no servidor deles, e chave privada é a senha mestra da carteira: quem tem ' +
              'a chave mexe no dinheiro. Uma falha no bot, então, pode custar tudo.',
          ],
          'Isso importa porque é o único ponto deste módulo em que você entrega a chave para um ' +
            'terceiro. Nas outras telas — RugCheck, Solscan, Bubblemaps, DexScreener — você só ' +
            'lê, e nenhuma delas pede carteira conectada. Aqui você escolhe entre conveniência e ' +
            'custódia, e essa escolha tem histórico.',
        ],
        exemplo: {
          titulo: 'Três falhas de bot, com data',
          passos: [
            'Maestro, 24/10/2023, e Unibot, 31/10/2023: as duas falhas somaram US$ 1,1 milhão ' +
              'roubados.',
            'Banana Gun, 19/09/2024: cerca de US$ 3 milhões de 11 usuários — reembolsados pelo ' +
              'próprio bot.',
            'Onze usuários e cerca de três milhões de dólares: o tamanho médio da conta mostra ' +
              'quem usa esse tipo de ferramenta com saldo grande.',
            'O reembolso do Banana Gun foi decisão da empresa, não uma garantia. Não há para quem ' +
              'recorrer.',
          ],
        },
        paragrafosFinais: [
          'O erro comum que esta seção evita é tratar "canal oficial" como fonte primária. Até um ' +
            'anúncio verdadeiro pode vir de conta de admin sequestrada. O canal serve para ' +
            'confirmar o que você já validou no site — nunca para substituí-lo.',
        ],
        detalhe: {
          titulo: 'o que dá e o que não dá para automatizar',
          lista: [
            'Discord: não dá para ler o histórico sem entrar no servidor. Automatizar com a própria ' +
              'conta (self-bot, quando o programa se passa por você) é proibido, com risco de ' +
              'perder a conta. A única automação grátis e permitida é seguir um canal de anúncios ' +
              '(ícone de megafone) — e só chega o que o admin escolher publicar.',
            'Telegram: automatizar a leitura de canal alheio não dá. Um bot só recebe os posts de ' +
              'um canal se for administrador dele. É por isso que o placar do topo da aba diz ' +
              '"1": aquele canal de anúncios do Discord é o único caminho grátis, permitido e ' +
              'automático que a pesquisa achou.',
            'Bot falso, com nome parecido com o verdadeiro, drena quem cola a frase-semente (as 12 ' +
              'ou 24 palavras que são a carteira, do Módulo 1). Confira o @ do bot no site oficial ' +
              'dele e ative a verificação em duas etapas na sua conta.',
            'Duas ressalvas: a custódia da chave varia de bot para bot, e alguns se declaram não ' +
              'custodiais — isso não foi conferido na documentação de cada um. E que a data de ' +
              'criação de um canal do Telegram não apareça para quem é só membro é comportamento ' +
              'conhecido, sem página oficial que confirme.',
          ],
        },
        // Guardado, fora da tela (ver o cabeçalho do arquivo).
        foraDaTela: [
          'Bot de compra é um robô dentro do Telegram que compra e vende tokens por você.',
          'Chave privada é a senha mestra da carteira: quem tem a chave mexe no dinheiro.',
        ],
        // O "Confira antes de seguir" do fim desta parte (que era a q8, sobre ler
        // canal de Telegram) saiu em 20/09/2026, junto com todas as "Pergunta
        // rápida" do módulo: as perguntas ficam só no quiz do fim. A q8 continua
        // no `quiz`, intacta.
      },
      {
        id: 'calls',
        titulo: 'Calls pagos, e o que cada sinal social prova',
        emUmaFrase:
          'Um call mostra que houve atenção naquele momento. Na média, o preço caiu nos 30 dias ' +
          'seguintes.',
        // As barras com o zero no centro: `valor` positivo cresce para a direita
        // (verde), negativo para a esquerda (vermelho). Números do estudo de
        // Merkley et al. (Review of Accounting Studies, 2024).
        barras: {
          titulo: 'Retorno médio depois do tweet de um influenciador',
          itens: [
            { quando: '1 dia depois do tweet', valor: 1.83, exibicao: '+1,83%' },
            { quando: '10 dias depois', valor: -2.24, exibicao: '−2,24%' },
            { quando: '30 dias depois', valor: -6.53, exibicao: '−6,53%' },
          ],
          descricao:
            'No primeiro dia depois do tweet, o preço subia 1,83%. Em 10 dias, caía 2,24%. Em 30 ' +
            'dias, caía 6,53%. Quem pôs mil dólares em tokens fora do top 100 no dia do tweet e ' +
            'segurou 30 dias perdeu 79 dólares, em média.',
          legenda:
            'Mesma escala, zero no centro. 36 mil tweets de 180 influenciadores, sobre mais de 1.600 ' +
            'criptoativos (Review of Accounting Studies, 2024). Os autores dizem que o padrão ' +
            'combina com pump-and-dump, mas que a prova é inconclusiva.',
        },
        // O que cada sinal prova. `tom` pinta o selo da coluna "O que prova":
        // 'ok' (verde), 'alerta' (vermelho) ou nada (texto cinza).
        tabela: {
          rotuloDasLinhas: 'Sinal',
          rotulo: 'O que cada sinal prova e não prova (role na horizontal se preciso)',
          larguraMinima: 560,
          colunas: [
            { chave: 'prova', rotulo: 'O que prova', selo: true },
            { chave: 'naoProva', rotulo: 'O que não prova', destaque: true },
          ],
          linhas: [
            { titulo: 'Endereço no site oficial', valores: { prova: { texto: 'A referência primária do projeto', tom: 'ok' }, naoProva: 'Que o site é o oficial — cruze com o X' } },
            { titulo: 'Endereço no post fixado do X oficial', valores: { prova: { texto: 'Coerência com o site: identidade confirmada', tom: 'ok' }, naoProva: 'Que o token é bom' } },
            { titulo: 'Selo azul no X', valores: { prova: 'Assinatura Premium ativa', naoProva: 'Que é a conta do projeto' } },
            { titulo: 'Selo dourado ou badge de afiliação', valores: { prova: 'Organização verificada, ou vínculo com uma', naoProva: 'Mérito do token' } },
            { titulo: 'Ícone e links no DexScreener', valores: { prova: 'Que alguém pagou para preencher a página', naoProva: 'Identidade oficial' } },
            { titulo: 'Anúncio no canal oficial', valores: { prova: 'O que o admin publicou', naoProva: 'Que a conta do admin não foi invadida' } },
            { titulo: 'Call de influenciador', valores: { prova: 'Que houve atenção naquele momento', naoProva: 'Valor futuro' } },
            { titulo: 'Verificação pedindo para conectar a carteira', valores: { prova: { texto: 'Golpe', tom: 'alerta' }, naoProva: 'Nada legítimo' } },
          ],
        },
        paragrafos: [
          'Call é quando alguém com público aponta um token e diz para olhar — um post, um vídeo, ' +
            'uma mensagem num grupo. Não é uma categoria formal e não tem regra: vai do ' +
            'entusiasmo sincero ao anúncio pago não declarado, e as duas coisas se parecem muito ' +
            'na tela.',
          'O que um call prova é estreito: que houve atenção naquele momento. Não prova valor ' +
            'futuro, não prova que o contrato é limpo, não prova sequer que quem postou ainda tem ' +
            'o token. A tabela abaixo faz esse exercício com oito sinais sociais, um por linha: ' +
            'de um lado o que ele prova, do outro o que ele não prova. Vale ler a coluna da ' +
            'direita primeiro.',
          'Isso importa porque a média está medida e aponta para baixo. Em 36 mil tweets de 180 ' +
            'influenciadores, sobre mais de 1.600 criptoativos, o preço subia 1,83% no primeiro ' +
            'dia, caía 2,24% em 10 dias e caía 6,53% em 30 dias (Review of Accounting Studies, ' +
            '2024). Os autores dizem que o padrão combina com pump-and-dump, mas que a prova é ' +
            'inconclusiva.',
          'Na prática, os sinais de call pago não declarado são de graça e você vê no próprio ' +
            'feed: posts quase idênticos em várias contas, na mesma janela de horário; a carteira ' +
            'do influenciador recebe o token antes do post (dá para ver no explorador); post ' +
            'apagado logo depois da alta; link de afiliado; e "não é conselho financeiro" seguido ' +
            'do endereço do contrato.',
        ],
        exemplo: {
          titulo: 'Mil dólares no dia do tweet',
          passos: [
            'Você põe mil dólares em tokens fora do top 100 no dia em que o influenciador posta.',
            'No primeiro dia, a média está a seu favor: +1,83%.',
            'Em 10 dias a média já é −2,24%; em 30 dias, −6,53%.',
            'Segurando os 30 dias, o resultado médio é perder 79 dólares — e isso antes dos ' +
              'custos de entrar e sair (Módulo 5).',
            'A janela em que o call "funcionou" existiu. Ela durou um dia.',
          ],
        },
        paragrafosFinais: [
          'O erro comum que esta seção evita é ler quantidade de gente falando como qualidade do ' +
            'token. Call é atenção, não valor. E atenção comprada se parece exatamente com ' +
            'atenção espontânea, do lado de fora.',
        ],
        detalhe: {
          titulo: 'as regras nos EUA e no Brasil',
          lista: [
            'EUA, FTC: pagamento a quem recomenda tem que ser declarado de forma clara. SEC: para ' +
              'ativos que sejam valores mobiliários, é preciso declarar o fato e o valor. Caso real: ' +
              'Kim Kardashian pagou US$ 1,26 milhão em 2022 por promover o token EMAX sem dizer que ' +
              'tinha recebido US$ 250 mil — ela pôs #AD, e não bastou.',
            'Brasil: o Código de Defesa do Consumidor proíbe publicidade disfarçada; o guia do CONAR ' +
              'para influenciadores (nova versão de maio de 2026) pede identificação clara já na ' +
              'primeira visualização; a CVM reserva a recomendação de valores mobiliários a ' +
              'analistas registrados.',
            'Nada disso é proteção sua: são regras que punem depois. O caso da Kardashian mostra ' +
              'o tamanho do problema — houve multa, houve declaração parcial, e quem comprou no ' +
              'dia do post não recebeu nada por isso.',
          ],
        },
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // Aba "Pilar técnico na prática" — pesquisa 4 dos módulos (documentação oficial
  // de cada ferramenta) e as telas conferidas ao vivo (VERIFICACOES-AO-VIVO.md,
  // seções 5 e 6). As anatomias são mockups desenhados, não capturas.
  // ---------------------------------------------------------------------------
  praticaTecnica: {
    // "Antes de ler: o que você acha?" no topo da aba (bloco de didática do app).
    // Não repete a q9, que é a "Pergunta rápida" do fim da aba.
    perguntaAntes: 'q1',

    destaques: [
      {
        rotulo: 'Ferramentas, uma pergunta cada',
        valor: '4',
        nota:
          'RugCheck: que riscos aparecem. Solscan: o que o dono ainda pode fazer. Bubblemaps: ' +
          'quem está ligado a quem. DexScreener: quanto dinheiro há na pool.',
      },
      {
        rotulo: 'Liquidez do BONK, no mesmo dia, em dois sites',
        valor: 'US$ 279 mil × 1,69 mi',
        nota: 'O DexScreener mostrou um par; o Solscan somou vários pools. O mesmo nome de campo mede coisas diferentes.',
        tom: 'alerta',
      },
      {
        rotulo: 'Maiores holders no mapa grátis do Bubblemaps',
        valor: '250',
        nota: 'O mapa com os 1.000 maiores, o cálculo de lucro e a IA exigem o token BMT.',
      },
    ],

    // A seção que escolhe a ferramenta (as quatro, em ordem, trocam o painel embaixo).
    ordem: {
      titulo: 'Quatro ferramentas, uma pergunta cada — nesta ordem',
      emUmaFrase:
        'Primeiro o que o contrato permite, depois quem controla as carteiras, por fim quanto ' +
        'dinheiro há na pool.',
      paragrafos: [
        'A ordem não é gosto: é a ordem em que uma resposta ruim dispensa a próxima pergunta. Se ' +
          'o contrato ainda permite que o dono crie moedas do nada, não interessa quem são os ' +
          'holders. Se as maiores carteiras são todas da mesma pessoa, não interessa quanto ' +
          'dinheiro há na pool. Cada passo só faz sentido depois de o anterior ter passado.',
        'Quatro palavras aparecem nas quatro telas e vale fixá-las aqui. Autoridade é uma ' +
          'permissão que fica guardada dentro do token e diz quem ainda pode mudar alguma coisa ' +
          'nele — criar mais moedas (mint), congelar saldos de outras pessoas (freeze), trocar ' +
          'nome e imagem (metadados). Holder é qualquer carteira que tem o token. Pool é o par de ' +
          'negociação onde o dinheiro fica parado, e liquidez é quanto dinheiro está nesse par. ' +
          'Cluster é um grupo de carteiras ligadas entre si por transferências.',
        'Isso importa porque as quatro ferramentas leem a mesma blockchain e mostram números ' +
          'diferentes. Não é erro de nenhuma delas: é escolha de recorte. Um site soma todos os ' +
          'pares de um token, outro mostra um par só; um conta os 250 maiores holders, outro ' +
          'conta todos. Comparar o mesmo nome de campo entre dois sites é o erro mais comum de ' +
          'quem está começando.',
        'Na prática, nenhuma das quatro pede carteira conectada para ler, e ler é de graça nas ' +
          'quatro. Você cola o endereço do contrato — nunca busca pelo nome — e lê. Se alguma ' +
          'tela pedir para conectar a carteira e assinar algo para "liberar" a consulta, isso não ' +
          'faz parte do processo.',
      ],
      legenda:
        'Nenhuma delas pede carteira conectada para ler. O exemplo é o BONK, conferido ao vivo ' +
        'em 12/09/2026.',
    },

    // A frase que fica embaixo de todo mockup das ferramentas.
    notaDoMockup:
      'Mockup desenhado, não é captura de nenhuma plataforma. Os campos aparecem sem valores: o ' +
      'que se aprende é onde olhar.',

    // Cada ferramenta: a pergunta que ela responde, o que é grátis, a anatomia da
    // página (mockup no mesmo formato da anatomia do perfil, na aba social), o
    // passo a passo e as armadilhas de leitura.
    ferramentas: [
      {
        id: 'rugcheck',
        nome: 'RugCheck',
        endereco: 'rugcheck.xyz',
        pergunta: 'Que riscos o contrato e as carteiras mostram?',
        gratis:
          'A página do token é grátis, sem cadastro. Só votar em "trending" pede carteira ' +
          'conectada — não conecte.',
        paragrafos: [
          'O RugCheck é um site que lê o contrato de um token e devolve uma lista de riscos ' +
            'encontrados, com um resumo colorido em cima — Good, Warning ou Danger. Ele não é uma ' +
            'auditoria e não é um parecer: é uma varredura automática que procura padrões ' +
            'conhecidos e conta o que achou.',
          'A pergunta dele é a primeira da fila porque é a mais barata de responder e a que mais ' +
            'elimina candidatos. Em poucos segundos você descobre se o contrato ainda tem portas ' +
            'abertas, se a distribuição das maiores carteiras está concentrada e se há redes de ' +
            'contas que só fazem sentido econômico se forem da mesma pessoa ou grupo — o que o ' +
            'site chama de Insiders, e que sugere, mas não prova.',
          'Leia sempre o resumo colorido junto com a lista de Risks, nunca sozinho. O próprio ' +
            'RugCheck manda fazer assim, e por um motivo honesto: a fórmula, os pesos e os ' +
            'limiares do score não são publicados. No BONK, em 12/09/2026, o score estava "GOOD" ' +
            'com 1 risco na lista, Markets US$ 358 mil, Insiders "2 networks", Holders 2,1 ' +
            'milhões e Lockers & LP US$ 54 mil, ou 21%.',
        ],
        paragrafosFinais: [
          'O erro comum que esta ferramenta evita é comprar sem saber o que o contrato ainda ' +
            'permite. O erro que ela cria, se mal lida, é o oposto: tratar "GOOD" como aprovação. ' +
            '"GOOD" é um retrato do momento, que muda com o mercado e cujo cálculo ninguém ' +
            'conhece.',
        ],
        anatomia: {
          titulo: 'A página de um token no RugCheck',
          paineis: {
            score: { rotulo: 'Score' },
            risks: { rotulo: 'Risks' },
            markets: { rotulo: 'Markets' },
            insiders: { rotulo: 'Insiders', alerta: true },
            holders: { rotulo: 'Holders' },
            lockers: { rotulo: 'Lockers & LP' },
          },
          grade: [
            { cols: '1fr 2fr', ids: ['score', 'risks'], altura: '58px' },
            { cols: '1fr 1fr 1fr', ids: ['markets', 'insiders', 'holders'], altura: '52px' },
            { cols: '1fr', ids: ['lockers'], altura: '44px' },
          ],
          itens: [
            { painel: 'score', titulo: 'Score', texto: 'Good, Warning ou Danger. Número maior é risco maior. A fórmula, os pesos e os limiares não são publicados.' },
            { painel: 'risks', titulo: 'Risks', texto: 'Cada risco que disparou, com nome, descrição e nível. O próprio RugCheck manda ler o score junto com esta lista.' },
            { painel: 'markets', titulo: 'Markets', texto: 'Os pares do token nas DEXs, com a liquidez de cada um.' },
            { painel: 'insiders', titulo: 'Insiders', texto: 'Redes de contas que só fazem sentido econômico se forem da mesma pessoa ou grupo. Sugere, não prova.' },
            { painel: 'holders', titulo: 'Holders', texto: 'A distribuição das maiores carteiras. Concentração alta aparece como risco.' },
            { painel: 'lockers', titulo: 'Lockers & LP', texto: 'Quanto da liquidez está travada ou queimada. Não separa golpe de não golpe (Módulo 6).' },
          ],
          nota: 'Ao vivo, BONK em 12/09/2026: Score "GOOD", 1 risco, Markets US$ 358 mil, Insiders "2 networks", Holders 2,1 milhões, Lockers & LP US$ 54 mil · 21%.',
        },
        passos: [
          'Abra rugcheck.xyz e cole o endereço do contrato. Nunca busque pelo nome.',
          'Leia o Score junto com a lista de Risks, nunca sozinho.',
          'Abra cada item de Risks: o nível diz o peso, a descrição diz o porquê.',
          'Olhe Insiders. Num lançamento recente e limpo, o esperado é zero redes de transferência.',
          'Clique nas contas de uma rede: o RugCheck leva ao explorador para você conferir.',
        ],
        armadilhas: [
          '"GOOD" não aprova token. O score é um retrato do momento, muda com o mercado, e não se sabe como é calculado.',
          'Token popular pode ter redes pequenas de insiders sem ser golpe — o BONK mostrou 2. O próprio RugCheck diz que isso é normal.',
        ],
      },
      {
        id: 'solscan',
        nome: 'Solscan',
        endereco: 'solscan.io',
        pergunta: 'O que o dono ainda pode fazer, e quem criou o token?',
        gratis:
          'Consulta sem login. O preço só aparece se o token estiver listado na CoinGecko.',
        paragrafos: [
          'O Solscan é um explorador da Solana: um site que mostra, em forma legível, o que está ' +
            'registrado na blockchain. Ele não opina e não pontua. Tudo o que aparece ali é o ' +
            'dado cru — quem criou o token, quando, quais permissões existem, quem transferiu ' +
            'para quem. Cada rede tem o seu: BscScan, Etherscan, Basescan.',
          'A pergunta dele — o que o dono ainda pode fazer, e quem criou o token — é a única ' +
            'deste módulo cuja resposta é definitiva. Score muda; registro na blockchain, não. ' +
            'Dois campos concentram a resposta. Owner Program diz qual programa manda no token: ' +
            '"Tokenkeg…" é o SPL clássico, "Tokenz…" é o Token-2022, a versão que aceita ' +
            'extensões. Token Extensions lista essas extensões, e qualquer uma além das de ' +
            'metadados é o alerta mais forte do Módulo 6.',
          'O campo Creator é o que mais ensina e o menos olhado. Ele mostra a carteira que criou ' +
            'o token, e um clique leva ao histórico dela: quantos outros tokens essa mesma ' +
            'carteira já criou, e o que fez com eles. Não existe campo "quanto o criador comprou" ' +
            '— a resposta está nas primeiras linhas da aba Transfers, que você precisa trocar ' +
            'para "Oldest First", porque ela vem do mais recente para o mais antigo.',
          'No BONK, em 12/09/2026: Holders 1.014.349, "Token Extensions: FALSE" e "Owner ' +
            'Program: Token Program TokenkegQ…" — ou seja, SPL clássico, sem extensão nenhuma.',
        ],
        paragrafosFinais: [
          'O erro comum que o Solscan evita é confiar num resumo. O erro que ele cria é ler um ' +
            'campo sem saber o que ele mede: no BONK, "Authority" mostra um endereço, e mesmo ' +
            'assim mint e freeze estão nulas na blockchain — aquele endereço é a autoridade de ' +
            'metadados. Um endereço no menu não prova que o dono ainda emite tokens.',
        ],
        anatomia: {
          titulo: 'A página de um token no Solscan',
          paineis: {
            mcap: { rotulo: 'Market Cap' },
            holders: { rotulo: 'Holders' },
            authority: { rotulo: 'Authority ▾', alerta: true },
            creator: { rotulo: 'Creator' },
            programa: { rotulo: 'Owner Program · Token Extensions' },
            abas: { rotulo: 'Transfers · Activities · Holders · Metadata · Markets' },
            transfers: { rotulo: 'Transfers, em ordem "Oldest First"' },
          },
          grade: [
            { cols: '1fr 1fr 1fr', ids: ['mcap', 'holders', 'authority'], altura: '52px' },
            { cols: '1fr 1fr', ids: ['creator', 'programa'], altura: '48px' },
            { cols: '1fr', ids: ['abas'], altura: '38px' },
            { cols: '1fr', ids: ['transfers'], altura: '52px' },
          ],
          itens: [
            { painel: 'mcap', titulo: 'Market Cap', texto: 'Aqui é totalmente diluído — o que o DexScreener chama de FDV.' },
            { painel: 'holders', titulo: 'Holders', texto: 'Quantas carteiras têm o token. Não diz quantas são da mesma pessoa.' },
            { painel: 'authority', titulo: 'Authority', texto: 'Um menu com as autoridades de metadados, mint e freeze. "N/A" quando todas foram revogadas. Um endereço aqui não prova que o dono ainda emite tokens.' },
            { painel: 'creator', titulo: 'Creator', texto: 'A carteira que criou o token, com a transação. Clique para ver o histórico dela.' },
            { painel: 'programa', titulo: 'Owner Program e Token Extensions', texto: '"Tokenkeg…" é SPL clássico, "Tokenz…" é Token-2022. Extensões além das de metadados são o alerta mais forte (Módulo 6).' },
            { painel: 'abas', titulo: 'Abas', texto: 'Holders lista as maiores carteiras; Metadata mostra se nome e imagem podem mudar; Markets, os pares.' },
            { painel: 'transfers', titulo: 'Transfers', texto: 'Vem do mais recente para o mais antigo. Troque para "Oldest First" para ver quem comprou primeiro e se o criador já vendeu.' },
          ],
          nota: 'Ao vivo, BONK em 12/09/2026: Holders 1.014.349, "Token Extensions: FALSE", "Owner Program: Token Program TokenkegQ…" — é SPL clássico.',
        },
        passos: [
          'Cole o endereço na busca do solscan.io e confira que nome e endereço batem com o que você validou.',
          'Owner Program: diz qual programa manda no token. Todo token do pump.fun hoje é Token-2022.',
          'Token Extensions: num token do pump.fun, só metadataPointer e tokenMetadata. Qualquer outra, pare.',
          'Authority: abra o menu e veja quais autoridades aparecem. Para confirmar mint e freeze, o RugCheck também mostra.',
          'Creator: clique na carteira e veja o histórico — outros tokens criados, e se vendeu.',
          'Aba Transfers em "Oldest First": as primeiras compras. Não há campo "quanto o criador comprou"; a resposta está nessas linhas.',
        ],
        armadilhas: [
          'No BONK, "Authority" mostra um endereço — o mesmo do Creator —, mas mint e freeze estão nulas na blockchain. O endereço é a autoridade de metadados.',
          'O "Liquidity" do Solscan soma vários pools. Não compare com o de outro site.',
        ],
      },
      {
        id: 'bubblemaps',
        nome: 'Bubblemaps',
        endereco: 'bubblemaps.io',
        pergunta: 'As maiores carteiras estão ligadas entre si?',
        gratis:
          'Grátis, com Magic Nodes, Time Travel e dados em tempo real. O token BMT libera o mapa ' +
          'com 1.000 holders, lucro e prejuízo, análise entre redes e IA.',
        paragrafos: [
          'O Bubblemaps desenha os maiores holders como bolhas: o tamanho da bolha é quanto a ' +
            'carteira tem, e uma linha entre duas bolhas quer dizer que houve transferência do ' +
            'token entre elas, registrada na blockchain. Bolhas ligadas formam um cluster. No ' +
            'plano grátis o mapa mostra os 250 maiores holders; o mapa com 1.000, o cálculo de ' +
            'lucro e prejuízo e a análise por IA exigem o token BMT.',
          'A pergunta dele não tem substituto nas outras três telas. Uma lista de holders, como a ' +
            'do Solscan, mostra dez carteiras com pouco cada uma e parece distribuída. O mapa ' +
            'mostra que as dez estão ligadas — e aí a soma delas está na mão de uma pessoa só. ' +
            'Clicando numa bolha dentro de um cluster, o site soma o cluster inteiro: é essa soma ' +
            'que é a concentração real.',
          'Duas coisas atrapalham a leitura e estão na própria tela. A primeira é o tempo: o mapa ' +
            'é atualizado dentro de 6 horas, e num token de poucas horas de vida isso é muito ' +
            'tempo — confira a hora do cálculo antes de concluir qualquer coisa. A segunda é o ' +
            'ruído: contratos e exchanges ficam escondidos por padrão justamente porque eles ' +
            'transferem com todo mundo e ligariam o mapa inteiro.',
        ],
        paragrafosFinais: [
          'O erro comum que o mapa evita é ler concentração por uma lista. O erro que ele cria é ' +
            'ler o cluster como veredito: um cluster levanta a pergunta "por quê?", não a ' +
            'resposta. Empresa pagando equipe, fundo recebendo tokens ou alguém escondendo o ' +
            'rastro geram exatamente o mesmo desenho.',
        ],
        anatomia: {
          titulo: 'O mapa de bolhas do Bubblemaps',
          paineis: {
            mapa: { rotulo: 'Mapa de bolhas · top 250' },
            carteira: { rotulo: 'Detalhe: % do supply', alerta: true },
            magic: { rotulo: 'Magic Nodes' },
            olho: { rotulo: 'Mostrar contratos e CEX' },
            hora: { rotulo: 'Hora do cálculo' },
          },
          grade: [
            { cols: '2fr 1fr', ids: ['mapa', 'carteira'], altura: '80px' },
            { cols: '1fr 1fr', ids: ['magic', 'olho'], altura: '44px' },
            { cols: '1fr', ids: ['hora'], altura: '40px' },
          ],
          itens: [
            { painel: 'mapa', titulo: 'Bolhas e linhas', texto: 'Cada bolha é um holder; o tamanho é quanto ele tem. Uma linha é uma transferência na blockchain entre os dois. Bolhas ligadas formam um cluster.' },
            { painel: 'carteira', titulo: 'Detalhe', texto: 'Clicando numa bolha: % do supply, quantidade e valor. Se ela está num cluster, aparece a soma do cluster — é a concentração real.' },
            { painel: 'magic', titulo: 'Magic Nodes', texto: 'Mostra ligações por intermediários: várias carteiras abastecidas pelo mesmo endereço, ou mandando para o mesmo depósito.' },
            { painel: 'olho', titulo: 'Contratos e exchanges', texto: 'Ficam escondidos por padrão, para o mapa mostrar holders comuns. O botão de olho revela.' },
            { painel: 'hora', titulo: 'Hora do cálculo', texto: 'O mapa é atualizado dentro de 6 horas. Num token de poucas horas de vida, isso é muito tempo.' },
          ],
          nota: 'Nomes dos recursos segundo a wiki oficial do Bubblemaps, consultada em setembro de 2026.',
        },
        passos: [
          'Abra bubblemaps.io e busque pelo endereço do contrato.',
          'Olhe se há clusters grandes entre as maiores bolhas.',
          'Clique no cluster e leia a % do supply somada — a lista crua de holders do Solscan esconde isso.',
          'Ative Magic Nodes para ver ligações por intermediários.',
          'Confira a hora do último cálculo antes de concluir qualquer coisa.',
        ],
        armadilhas: [
          'Cluster levanta a pergunta "por quê?", não a resposta. Empresa pagando equipe, fundo recebendo tokens ou alguém escondendo o rastro geram o mesmo desenho.',
          'Carteiras de altíssima atividade, como exchanges e roteadores, criam ligações que são ruído. Bolha grande de exchange não é baleia insider.',
        ],
      },
      {
        id: 'dexscreener',
        nome: 'DexScreener',
        endereco: 'dexscreener.com',
        pergunta: 'Quanto dinheiro há na pool, e como estão negociando?',
        gratis:
          'Tudo o que se lê é grátis. O que é pago é do lado do projeto: "Enhanced Token Info" ' +
          '(a partir de US$ 299) e Boosts para aparecer em alta.',
        paragrafos: [
          'O DexScreener mostra o gráfico e os números de um par de negociação: preço, liquidez, ' +
            'volume, transações. Par é a dupla token/dinheiro onde a negociação acontece, e um ' +
            'mesmo token pode ter vários pares ao mesmo tempo — por isso o primeiro cuidado é ' +
            'conferir que o par aberto é o do endereço que você validou.',
          'O número que importa mais é o primeiro a ler: Liquidity, o dinheiro parado nesse par. ' +
            'Ele é o tamanho da porta de saída. Ao lado dele aparece o FDV — o supply total menos ' +
            'o queimado, vezes o preço — e o Mkt Cap. Comparar liquidez com market cap é comparar ' +
            'o tamanho da porta com o tamanho do prédio, e essa comparação é a conta da ' +
            'calculadora do Módulo 6.',
          'Os outros campos pedem desconfiança na medida certa. Txns, Volume e Makers mudam por ' +
            'janela (5 minutos, 1 hora, 6 horas, 24 horas) e são o número mais fácil de fabricar ' +
            'da tela. Info e socials são preenchidos e pagos pelo próprio projeto — o "Enhanced ' +
            'Token Info" custa a partir de US$ 299 —, então ícone bonito e links não dizem nada ' +
            'sobre legitimidade. E a caixa Audit não é definida na documentação, que também não ' +
            'diz de onde vêm os dados; a própria tela avisa que ela pode não estar correta.',
          'No BONK, em 12/09/2026: Liquidity US$ 279 mil num par, na Orca; FDV US$ 247,5 milhões; ' +
            'Mkt Cap US$ 245,1 milhões.',
        ],
        paragrafosFinais: [
          'O erro comum que esta tela evita é entrar sem saber o tamanho da saída. O erro que ela ' +
            'cria é confundir visibilidade com validação: aparecer em alta pode ter sido ' +
            'comprado, porque os Boosts turbinam o trending por 12 a 24 horas. Para mint, freeze, ' +
            'holders e insiders, volte ao RugCheck e ao Solscan.',
        ],
        anatomia: {
          titulo: 'A página de um par no DexScreener',
          paineis: {
            grafico: { rotulo: 'Gráfico' },
            preco: { rotulo: 'Price USD' },
            liquidez: { rotulo: 'Liquidity · FDV · Mkt Cap' },
            txns: { rotulo: 'Txns · Volume · Makers', alerta: true },
            info: { rotulo: 'Info e socials', alerta: true },
            audit: { rotulo: 'Audit' },
          },
          grade: [
            { cols: '2fr 1fr', ids: ['grafico', 'preco'], altura: '60px' },
            { cols: '2fr 1fr', ids: ['liquidez', 'txns'], altura: '52px' },
            { cols: '1fr 1fr', ids: ['info', 'audit'], altura: '48px' },
          ],
          itens: [
            { painel: 'grafico', titulo: 'Gráfico', texto: 'O preço do par escolhido. Um token pode ter vários pares; confira que é o do endereço certo.' },
            { painel: 'preco', titulo: 'Price USD', texto: 'Pode vir com zeros compactados. Passe o mouse para ver o valor inteiro.' },
            { painel: 'liquidez', titulo: 'Liquidity, FDV e Mkt Cap', texto: 'Liquidez é a pool deste par. FDV é o supply total menos o queimado, vezes o preço. Compare a liquidez com o market cap (calculadora do Módulo 6).' },
            { painel: 'txns', titulo: 'Txns, Volume e Makers', texto: 'Por janela: 5 minutos, 1 hora, 6 horas, 24 horas. É o número mais fácil de fabricar da tela. "Traders", "Buyers" e "Sellers" não têm definição oficial.' },
            { painel: 'info', titulo: 'Info e socials', texto: 'Preenchidos e pagos pelo próprio projeto. Não provam que o token é o oficial.' },
            { painel: 'audit', titulo: 'Audit', texto: 'Não é definida na documentação, que também não diz de onde vêm os dados. A própria tela avisa: "Audits may not be 100% accurate!".' },
          ],
          nota: 'Ao vivo, BONK em 12/09/2026: Liquidity US$ 279 mil (um par, na Orca), FDV US$ 247,5 milhões, Mkt Cap US$ 245,1 milhões.',
        },
        passos: [
          'Busque pelo endereço do contrato e escolha o par com a liquidez principal.',
          'Leia Liquidity antes de qualquer outro número.',
          'Compare Liquidity com Mkt Cap: é o tamanho da porta de saída perto do tamanho do prédio.',
          'Troque as janelas de Txns e Volume (5m, 1h, 24h) e veja se as negociações acompanham o volume.',
          'Para mint, freeze, holders e insiders, volte ao RugCheck e ao Solscan — a Audit daqui não substitui.',
        ],
        armadilhas: [
          'Aparecer em alta pode ser comprado: os Boosts turbinam o trending por 12 a 24 horas.',
          'Ícone bonito, site e redes sociais na página não dizem nada sobre legitimidade.',
        ],
      },
    ],

    // A última seção da aba: a tabela "onde checar", um campo por pergunta.
    onde: {
      titulo: 'Onde checar cada coisa',
      emUmaFrase:
        'Cada pergunta tem um lugar e um campo. O mesmo nome de campo mede coisas diferentes em ' +
        'sites diferentes.',
      // A coluna `campo` sai em fonte de código (o nome do campo como está no site).
      tabela: {
        rotuloDasLinhas: 'O que você quer saber',
        rotulo: 'Onde checar cada coisa (role na horizontal se preciso)',
        larguraMinima: 560,
        colunas: [
          { chave: 'onde', rotulo: 'Onde checar' },
          { chave: 'campo', rotulo: 'Campo', mono: true },
        ],
        linhas: [
          { titulo: 'Programa e extensões', valores: { onde: 'Solscan', campo: 'Owner Program, Token Extensions' } },
          { titulo: 'Mint e freeze authority', valores: { onde: 'Solscan e RugCheck', campo: 'Authority (menu); Risks' } },
          { titulo: 'Nome e imagem podem mudar?', valores: { onde: 'Solscan', campo: 'Aba Metadata' } },
          { titulo: 'Quem criou, e se já vendeu', valores: { onde: 'Solscan', campo: 'Creator + Transfers em "Oldest First"' } },
          { titulo: 'Concentração real', valores: { onde: 'Bubblemaps e RugCheck', campo: 'Clusters e Magic Nodes; Insiders' } },
          { titulo: 'Compra coordenada no lançamento', valores: { onde: 'trench.bot (só pump.fun)', campo: 'Current held %' } },
          { titulo: 'Liquidez do par', valores: { onde: 'DexScreener', campo: 'Liquidity' } },
          { titulo: 'FDV e market cap', valores: { onde: 'DexScreener', campo: 'FDV, Mkt Cap' } },
          { titulo: 'Volume e negociações', valores: { onde: 'DexScreener', campo: 'Txns, Volume, Makers' } },
        ],
      },
      paragrafos: [
        'Esta tabela é a única página deste módulo que vale ter aberta na hora de checar um ' +
          'token. Ela não ensina nada novo: junta as quatro telas numa lista de perguntas e diz, ' +
          'para cada uma, onde olhar e qual é o nome exato do campo naquele site.',
        'A parte que surpreende é a segunda coluna. Campos com o mesmo nome não medem a mesma ' +
          'coisa. No mesmo dia, o BONK mostrou liquidez de US$ 279 mil no DexScreener e US$ 1,69 ' +
          'milhão no Solscan. Nenhum dos dois está errado: o primeiro mostrou um par, o segundo ' +
          'somou vários pools. Se você comparar os dois números como se fossem o mesmo, chega a ' +
          'uma conclusão inventada.',
        'Uma linha da tabela aponta para fora das quatro ferramentas: compra coordenada no ' +
          'lançamento se vê no trench.bot, e só para tokens do pump.fun, no campo "Current held ' +
          '%". É a exceção que confirma o resto — cada pergunta tem um lugar, e esse lugar às ' +
          'vezes não é nenhum dos quatro.',
      ],
      paragrafosFinais: [
        'O erro comum que esta tabela evita é o mais silencioso de todos: achar que discordância ' +
          'entre sites é sinal de fraude. Quase sempre é diferença de recorte. Antes de concluir ' +
          'qualquer coisa de um número, confirme o que aquele campo, naquele site, está somando.',
      ],
    },
  },

  // Itens das duas abas práticas que não fecharam em fonte confiável.
  naoVerificadoPratica: [
    { titulo: 'Aceitação do "Meme Coin Factories" no ACM CCS 2026', texto: 'A página do arXiv diz que foi aceito, mas o artigo não aparece na lista de aceitos publicada no site do CCS 2026, conferida em 14/09/2026. O app o trata como preprint.' },
    { titulo: 'Números da linha do tempo das narrativas', texto: 'A queda média de 94% das celebridades (compilação de um pesquisador no X), o MOODENG, as mais de 700 cópias do TRUMP e as 21 mil moedas do Believe vieram de resumo de busca, não da página aberta.' },
    { titulo: 'Data dos futuros de MOODENG na Binance', texto: 'A pesquisa 11 diz 15/11/2024; a reconciliação dela diz 25/10/2024. O pico de preço em 15/11/2024 está confirmado na CoinMarketCap e na CoinGecko; o do GOAT, em 17/11/2024, também.' },
    { titulo: 'Nizzoli et al. (2020)', texto: 'Os 56% e os 93% vieram do resumo do artigo, sem abrir o texto completo.' },
    { titulo: 'Preço dos Boosts do DexScreener', texto: 'Não é publicado em nenhuma página oficial (documentação, API ou marketplace). Os pacotes que circulam — de 10 por US$ 99 a 500 por US$ 3.999 — são de terceiros. As telas de compra do DexScreener, do Birdeye e do pump.fun não foram vistas ao vivo.' },
    { titulo: 'Preços do Birdeye PRO, do X Premium e do Nansen', texto: 'Vieram de resumo de busca, não da página aberta. Os da API do Birdeye e do LunarCrush vieram da página de preços.' },
    { titulo: 'Saturação: tokens nascendo com o tema em queda', texto: 'Há registro nos agentes de IA e no Believe; nas outras três narrativas, não há dado.' },
    { titulo: 'Preço da API do X em 2026', texto: 'O valor de US$ 0,005 por post lido vem de guias de terceiros coerentes entre si; a página oficial de preços não foi aberta.' },
    { titulo: 'Custódia da chave em cada bot de Telegram', texto: 'Varia de bot para bot, e alguns se declaram não custodiais. Não foi conferido na documentação de cada um.' },
    { titulo: 'Data de criação de um canal do Telegram', texto: 'Que ela não aparece para quem é só membro é o comportamento conhecido, sem página oficial que confirme.' },
    { titulo: '"Traders", "Buyers", "Sellers" e "Audit" do DexScreener', texto: 'Não têm definição na documentação oficial, e a origem dos dados da Audit não é informada.' },
    { titulo: 'Fórmula do score do RugCheck', texto: 'Não é publicada: a documentação da API mostra só os campos. Tabelas de 0 a 100 que circulam são de terceiros.' },
  ],

  fontesPratica: [
    { titulo: 'Szwajcok et al., "Meme Coin Factories: Uncovering Large-Scale Manipulations on pump.fun" (arXiv 2609.10246, preprint)', url: 'https://arxiv.org/html/2609.10246v1', consultadoEm: '13/09/2026' },
    { titulo: 'Ardia & Bluteau, "Twitter and cryptocurrency pump-and-dumps", International Review of Financial Analysis (2024)', url: 'https://arxiv.org/pdf/2306.02148v1', consultadoEm: '13/09/2026' },
    { titulo: 'Nizzoli et al., "Charting the Landscape of Online Cryptocurrency Manipulation", IEEE Access (2020)', url: 'https://arxiv.org/abs/2001.10289', consultadoEm: '13/09/2026' },
    { titulo: 'Moura et al., manipulação em grupos de Telegram (arXiv 2609.01176, preprint)', url: 'https://arxiv.org/abs/2609.01176', consultadoEm: '13/09/2026' },
    { titulo: 'Li, Yao, Huo & Cai, "Trust Dynamics and Bot-Driven Responses", ACM Web Science 2025', url: 'https://dl.acm.org/doi/10.1145/3717867.3717922', consultadoEm: '13/09/2026' },
    { titulo: 'Long, Wong & Cai, "Bridging Culture and Finance", WWW Companion 2025', url: 'https://dl.acm.org/doi/10.1145/3701716.3715561', consultadoEm: '13/09/2026' },
    { titulo: 'Kamat, graduação no pump.fun e presença social (arXiv 2607.02823, preprint)', url: 'https://arxiv.org/abs/2607.02823', consultadoEm: '13/09/2026' },
    { titulo: 'CoinGecko, State of Memecoins Report 2025 (US$ 150,6 bi e US$ 47,2 bi; rotação das narrativas)', url: 'link não registrado pela pesquisa 11', consultadoEm: '13/09/2026' },
    { titulo: 'Nansen sobre a LIBRA, via CoinDesk (20/02/2025)', url: 'link não registrado pela pesquisa 11', consultadoEm: '13/09/2026' },
    { titulo: 'Guégan & Renault, "Does investor sentiment on social media provide robust information for Bitcoin returns predictability?", Finance Research Letters (2021)', url: 'https://doi.org/10.1016/j.frl.2020.101494', consultadoEm: '14/09/2026' },
    { titulo: 'Süssmuth, Journal of Forecasting (2021) — causalidade do preço para a atenção', url: 'https://doi.org/10.1002/for.2819', consultadoEm: '14/09/2026' },
    { titulo: 'Shen, Urquhart & Wang, Economics Letters (2019) — tweets preveem volume e volatilidade, não retorno (só resumo)', url: 'https://doi.org/10.1016/j.econlet.2018.11.007', consultadoEm: '14/09/2026' },
    { titulo: 'Varol et al., "Online Human-Bot Interactions" (2017) — 9% a 15% das contas ativas do X são bots', url: 'https://arxiv.org/abs/1703.03107', consultadoEm: '14/09/2026' },
    { titulo: 'CoinMarketCap — GOAT (máxima em 17/11/2024) e MOODENG (máxima em 15/11/2024)', url: 'https://coinmarketcap.com/currencies/goatseus-maximus/', consultadoEm: '14/09/2026' },
    { titulo: 'DexScreener — Trending Score (componentes do ranking)', url: 'https://docs.dexscreener.com/trending', consultadoEm: '14/09/2026' },
    { titulo: 'DexScreener — Boosting', url: 'https://docs.dexscreener.com/boosting', consultadoEm: '13/09/2026' },
    { titulo: 'LunarCrush — preços (plano grátis só com dados de mercado)', url: 'https://lunarcrush.com/pricing', consultadoEm: '14/09/2026' },
    { titulo: 'Birdeye — preços da Data API', url: 'https://birdeye.so/data-api/pricing', consultadoEm: '14/09/2026' },
    { titulo: 'GMGN — Trending', url: 'https://gmgn.ai/trend', consultadoEm: '13/09/2026' },
    { titulo: 'LunarCrush', url: 'https://lunarcrush.com', consultadoEm: '13/09/2026' },
    { titulo: 'Santiment Academy — Social Trends', url: 'https://academy.santiment.net/sanbase/social-trends', consultadoEm: '13/09/2026' },
    { titulo: 'Kaito — Kaito Pro', url: 'https://docs.kaito.ai/overview/kaito-pro-ai-platform', consultadoEm: '13/09/2026' },
    { titulo: 'Google — Trends start', url: 'https://developers.google.com/search/docs/monitor-debug/trends-start', consultadoEm: '13/09/2026' },
    { titulo: 'Pesquisas 8 a 11 dos módulos e a conferência delas', url: 'pesquisa/modulos/pesquisas/P8… a P11… e VERIFICACOES-AO-VIVO-2.md', consultadoEm: '13/09/2026' },
    { titulo: 'Discord — Channel Following FAQ', url: 'https://support.discord.com/hc/en-us/articles/360028384531', consultadoEm: '12/09/2026' },
    { titulo: 'Discord — Community Guidelines (self-bots)', url: 'https://discord.com/guidelines', consultadoEm: '12/09/2026' },
    { titulo: 'Check Point Research — Inferno Drainer Reloaded (2025)', url: 'https://research.checkpoint.com/2025/inferno-drainer-reloaded-deep-dive-into-the-return-of-the-most-sophisticated-crypto-drainer/', consultadoEm: '12/09/2026' },
    { titulo: 'Coinbase — golpes em comunidades de Discord e Telegram', url: 'https://www.coinbase.com/blog/consumer-protection-tuesday-how-scammers-are-targeting-crypto-communities', consultadoEm: '12/09/2026' },
    { titulo: 'X — About X Premium (selo azul)', url: 'https://help.x.com/en/using-x/x-premium', consultadoEm: '12/09/2026' },
    { titulo: 'X — About profile labels and checkmarks', url: 'https://help.x.com/en/rules-and-policies/profile-labels', consultadoEm: '12/09/2026' },
    { titulo: 'ReplySocial — operadores de busca do X (2026)', url: 'https://replysocial.co/blog/twitter-advanced-search-operators', consultadoEm: '12/09/2026' },
    { titulo: 'Etherscan — How to Safely Interact with Smart Contracts ("verified")', url: 'https://info.etherscan.com/how-to-safely-interact-with-smart-contracts-on-the-explorer/', consultadoEm: '12/09/2026' },
    { titulo: 'Telegram Bot API (bot precisa ser admin do canal)', url: 'https://core.telegram.org/bots/api', consultadoEm: '12/09/2026' },
    { titulo: 'CertiK — Maestro e Unibot (out/2023)', url: 'https://www.certik.com/blog/maestro-and-unibot', consultadoEm: '12/09/2026' },
    { titulo: 'Cointelegraph via TradingView — Banana Gun (set/2024)', url: 'https://in.tradingview.com/news/cointelegraph:a181b02c0094b:0-telegram-bot-banana-gun-to-absorb-3m-loss-from-hack', consultadoEm: '12/09/2026' },
    { titulo: 'crypto.news — custódia da chave em bots de Telegram', url: 'https://crypto.news/what-are-telegram-trading-bots-unibot-banana-gun-how-they-work/', consultadoEm: '12/09/2026' },
    { titulo: 'FTC — Endorsement Guides, 16 CFR Part 255', url: 'https://www.ecfr.gov/current/title-16/chapter-I/subchapter-B/part-255', consultadoEm: '12/09/2026' },
    { titulo: 'SEC — Press Release 2022-183 (Kim Kardashian)', url: 'https://www.sec.gov/newsroom/press-releases/2022-183', consultadoEm: '12/09/2026' },
    { titulo: 'Salusse Marangoni — novo guia do CONAR para influenciadores', url: 'https://smabr.com/conar-emite-novo-guia-para-influenciadores-digitais/', consultadoEm: '12/09/2026' },
    { titulo: 'Merkley, Pacelli, Piorkowski & Williams, "Crypto-influencers", Review of Accounting Studies (2024), DOI 10.1007/s11142-024-09838-4', url: 'https://doi.org/10.1007/s11142-024-09838-4', consultadoEm: '12/09/2026' },
    { titulo: 'RugCheck — API (Swagger)', url: 'https://api.rugcheck.xyz/swagger/index.html', consultadoEm: '13/09/2026' },
    { titulo: 'RugCheck — Insider Network Analysis (X oficial)', url: 'https://x.com/Rugcheckxyz/status/1900552758064714218', consultadoEm: '13/09/2026' },
    { titulo: 'Solscan — Exploring Token Details page', url: 'https://info.solscan.io/exploring-token-details-page', consultadoEm: '12/09/2026' },
    { titulo: 'Bubblemaps Wiki — How does it work', url: 'https://wiki.bubblemaps.io/bubblemaps-v2/how-does-it-work', consultadoEm: '12/09/2026' },
    { titulo: 'Bubblemaps Wiki — Premium (recursos do BMT)', url: 'https://wiki.bubblemaps.io/bubblemaps-v2/premium', consultadoEm: '12/09/2026' },
    { titulo: 'DexScreener — Token listing (FDV e market cap)', url: 'https://docs.dexscreener.com/token-listing', consultadoEm: '12/09/2026' },
    { titulo: 'DexScreener Marketplace — Enhanced Token Info', url: 'https://marketplace.dexscreener.com/product/token-info', consultadoEm: '12/09/2026' },
    { titulo: 'Telas de RugCheck, Solscan e DexScreener conferidas ao vivo com o BONK (navegador interno)', url: 'pesquisa/modulos/pesquisas/VERIFICACOES-AO-VIVO.md, seção 5', consultadoEm: '12/09/2026' },
  ],

  // ---------------------------------------------------------------------------
  // Mini-quiz (aba "Quiz") — 13 perguntas
  // ---------------------------------------------------------------------------

  // A frase embaixo do título do quiz. Se mudar o número de perguntas, mude aqui.
  descricaoDoQuiz: 'Treze perguntas. As respostas ficam salvas no navegador.',

  // Por que cada alternativa errada não serve (q1 a q10; q11 a q13 trazem o
  // `porque` dentro da própria alternativa).
  porqueErradas: {
    q1: {
      a: 'O DexScreener não executa ordens; para isso existem os terminais.',
      c: 'Mint e freeze se checam no RugCheck e no Solscan; o DexScreener é visualização.',
      d: 'Monitorar o X é pilar social; o DexScreener mostra dados de mercado.',
    },
    q2: {
      a: '"Axon" não existe como terminal relevante — é o erro de nome que a correção aponta.',
      c: 'Apex Trade não é o terminal citado.',
      d: 'Axium Finance não é o terminal. Nome parecido é o que um impostor explora.',
    },
    q3: {
      a: 'O Sigma é bot de Telegram só para redes EVM.',
      c: 'Não suporta Solana para nada, nem para checagem.',
      d: 'Não há suporte em teste: o Sigma cobre só redes EVM.',
    },
    q4: {
      b: 'Revogar approvals é segurança de carteira (Módulo 1), não pilar social.',
      c: 'Nenhum pilar substitui o outro: um token oficial pode ter contrato com armadilha.',
      d: 'Take profit é gestão da posição (Módulo 4).',
    },
    q5: {
      a: 'Selo azul é assinatura Premium; qualquer um compra.',
      c: 'O X não audita token nenhum.',
      d: 'O selo não diz nada sobre o endereço estar certo.',
    },
    q6: {
      a: 'O site sozinho não desempata: se ele diverge do post fixado, um dos dois pode ter sido invadido.',
      b: 'Discord é canal fácil de sequestrar; nunca desempata.',
      d: 'Volume não diz qual é o oficial; cópia também tem volume.',
    },
    q7: {
      a: 'Verificação legítima não pede assinatura.',
      c: 'Provar que não é robô não exige conectar carteira nem assinar.',
      d: 'O nome Collab.Land é justamente o que os golpistas imitam, com outro @.',
    },
    q8: {
      a: 'Um bot só recebe os posts de canal onde é administrador.',
      c: 'Automatizar a própria conta deixa a conta sob observação e não é o caminho grátis e dentro das regras.',
      d: 'O Telegram Premium não libera leitura automática de canal alheio.',
    },
    q9: {
      a: 'O score não aprova token: é retrato do momento, com fórmula não publicada.',
      c: 'O RugCheck não verifica a equipe do projeto.',
      d: 'O score não garante trava de liquidez — e trava não separa golpe de não golpe.',
    },
    q10: {
      a: 'Uma linha é uma transferência na blockchain; pode ter explicação legítima.',
      c: 'Mapa recente não transforma ligação em prova.',
      d: 'O Bubblemaps mostra holders em geral; exchanges e contratos ficam escondidos por padrão.',
    },
  },

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
            'Para confirmar que o token é quem diz ser e ler de onde vem a atenção — não para provar que o contrato é seguro.',
        },
        { id: 'b', texto: 'Para revogar approvals de carteiras automaticamente.' },
        { id: 'c', texto: 'Para substituir totalmente a checagem técnica antes de comprar.' },
        { id: 'd', texto: 'Para calcular o take profit ideal de uma posição.' },
      ],
      correta: 'a',
      explicacao:
        'O pilar social confirma o endereço oficial e mostra de onde a atenção vem — e quanto ' +
        'dela é campanha. Ele não substitui o pilar técnico: os dois se completam.',
    },
    {
      id: 'q5',
      pergunta: 'Um perfil no X com selo azul posta o endereço de um token. O que o selo prova?',
      alternativas: [
        { id: 'a', texto: 'Que a conta é do projeto oficial.' },
        { id: 'b', texto: 'Que a conta tem assinatura Premium ativa — e só isso.' },
        { id: 'c', texto: 'Que o X auditou o token.' },
        { id: 'd', texto: 'Que o endereço está correto.' },
      ],
      correta: 'b',
      explicacao:
        'Pela central de ajuda do X, o selo azul hoje quer dizer assinatura Premium, sem ' +
        'revisão de identidade. Quem liga a conta a uma organização é o selo dourado ou o badge ' +
        'de afiliação — e nem isso diz algo sobre o token.',
    },
    {
      id: 'q6',
      pergunta: 'O endereço no site oficial é diferente do endereço no post fixado do X oficial. O que fazer?',
      alternativas: [
        { id: 'a', texto: 'Usar o do site, que é a fonte mais confiável.' },
        { id: 'b', texto: 'Perguntar no Discord qual é o certo.' },
        { id: 'c', texto: 'Não comprar: divergência entre as fontes oficiais, por si só, encerra a checagem.' },
        { id: 'd', texto: 'Usar o endereço que tiver mais volume no DexScreener.' },
      ],
      correta: 'c',
      explicacao:
        'Site e post fixado precisam bater. Um canal mais fácil de sequestrar, como o Discord ou ' +
        'uma resposta de post, nunca desempata — e volume não diz qual é o oficial.',
    },
    {
      id: 'q7',
      pergunta: 'Ao entrar num Discord, um bot de verificação pede para você conectar a carteira num site e assinar. O que é isso?',
      alternativas: [
        { id: 'a', texto: 'O procedimento normal de verificação.' },
        { id: 'b', texto: 'O roteiro de drainer: foi assim que o Inferno Drainer esvaziou mais de 30 mil carteiras.' },
        { id: 'c', texto: 'Um jeito de provar que você não é robô.' },
        { id: 'd', texto: 'Seguro, desde que o bot se chame Collab.Land.' },
      ],
      correta: 'b',
      explicacao:
        'Verificação legítima não pede assinatura. Os golpistas imitam justamente o Collab.Land, ' +
        'com um @ diferente, e levam a um site que pede a assinatura que esvazia a carteira.',
    },
    {
      id: 'q8',
      pergunta: 'Dá para acompanhar um canal de Telegram de outro projeto de graça, com um robô, dentro das regras?',
      alternativas: [
        { id: 'a', texto: 'Sim, qualquer bot recebe os posts de qualquer canal.' },
        { id: 'b', texto: 'Não: um bot só recebe os posts se for admin do canal. O que existe é ler à mão em t.me/s/nomedocanal.' },
        { id: 'c', texto: 'Sim, usando a própria conta como robô.' },
        { id: 'd', texto: 'Só pagando o Telegram Premium.' },
      ],
      correta: 'b',
      explicacao:
        'A única automação grátis e permitida no pilar social é seguir um canal de anúncios do ' +
        'Discord. No Telegram, a leitura de canal alheio é manual — o /s/ no endereço mostra o ' +
        'histórico no navegador, sem conta.',
    },
    {
      id: 'q9',
      pergunta: 'O RugCheck mostra "GOOD" para um token. O que isso quer dizer?',
      alternativas: [
        { id: 'a', texto: 'Que o token foi aprovado e é seguro comprar.' },
        { id: 'b', texto: 'Que é um retrato do momento, calculado por uma fórmula que não é publicada — e precisa ser lido junto com a lista de riscos.' },
        { id: 'c', texto: 'Que a equipe do projeto foi verificada.' },
        { id: 'd', texto: 'Que a liquidez está travada para sempre.' },
      ],
      correta: 'b',
      explicacao:
        'O score muda com o mercado e não tem fórmula, pesos nem limiares publicados. O próprio ' +
        'RugCheck manda considerar o score e os avisos juntos.',
    },
    {
      id: 'q10',
      pergunta: 'No Bubblemaps, as cinco maiores bolhas estão ligadas num cluster. Isso prova que são da mesma pessoa?',
      alternativas: [
        { id: 'a', texto: 'Sim, linha entre bolhas é prova de golpe.' },
        { id: 'b', texto: 'Não: a ligação é uma transferência na blockchain, e o cluster levanta a pergunta "por quê?" — pode ser equipe, fundo ou exchange.' },
        { id: 'c', texto: 'Sim, se o mapa tiver sido calculado há menos de 6 horas.' },
        { id: 'd', texto: 'Não, porque o Bubblemaps só mostra exchanges.' },
      ],
      correta: 'b',
      explicacao:
        'A wiki do Bubblemaps apresenta o cluster como algo que vale investigar, não como ' +
        'conclusão. O que muda a leitura é a % do supply somada e o que você descobre abrindo as ' +
        'carteiras.',
    },
    {
      id: 'q11',
      pergunta: 'Segundo a pesquisa, em qual rede social a atenção sobre um token aparece primeiro?',
      alternativas: [
        {
          id: 'a',
          texto: 'No Telegram, sempre antes do X.',
          porque: 'É observação de mercado repetida em blogs. Nenhum estudo mediu a ordem entre redes.',
        },
        {
          id: 'b',
          texto: 'No X, porque é onde estão os influenciadores.',
          porque:
            'Também não foi medido. O que se mediu é que 23,5% dos tokens do pump.fun nascem logo ' +
            'depois de um post no X ou no Truth Social: a narrativa vem antes do token, não antes de outra rede.',
        },
        { id: 'c', texto: 'Ninguém mediu: os estudos comparam uma rede com o preço, não uma rede com outra.' },
        {
          id: 'd',
          texto: 'No TikTok, porque é onde os memes nascem.',
          porque: 'Não há estudo com TikTok e memecoin que meça ordem.',
        },
      ],
      correta: 'c',
      explicacao:
        'A lacuna é a resposta. Quem ensina uma ordem fixa entre redes está repetindo ' +
        'observação, não dado.',
    },
    {
      id: 'q12',
      pergunta: 'Um token aparece no topo da lista "em alta" do DexScreener. O que isso mostra?',
      alternativas: [
        {
          id: 'a',
          texto: 'Que a comunidade escolheu o token.',
          porque: 'A lista é montada por um score próprio de atividade, e Boosts pagos multiplicam esse score.',
        },
        {
          id: 'b',
          texto: 'Que o preço vai continuar subindo.',
          porque: 'Nenhuma lista de "em alta" foi validada como previsão de preço.',
        },
        { id: 'c', texto: 'Atividade recente e, possivelmente, pagamento: Boosts pagos multiplicam o score da lista.' },
        {
          id: 'd',
          texto: 'Que o token passou numa auditoria.',
          porque: 'Estar em alta não tem relação com checagem de contrato. Isso é o pilar técnico.',
        },
      ],
      correta: 'c',
      explicacao:
        'Toda lista de "em alta" é feita de atividade de negociação, de pagamento ou das duas ' +
        'coisas — e atividade é o que o wash trading fabrica.',
    },
    {
      id: 'q13',
      pergunta: 'Nas narrativas de 2024 e 2025 estudadas, quando a imprensa fora de cripto cobriu o tema?',
      alternativas: [
        {
          id: 'a',
          texto: 'Antes de o preço subir, dando tempo de entrar.',
          porque: 'Nos casos com data, como PNUT e LIBRA, a cobertura veio no topo, não antes.',
        },
        { id: 'b', texto: 'No topo ou depois dele.' },
        {
          id: 'c',
          texto: 'Nunca: a imprensa geral ignora memecoin.',
          porque: 'O PNUT saiu em veículos como CBC e NBC; a LIBRA, na Bloomberg e na Reuters.',
        },
        {
          id: 'd',
          texto: 'Sempre no dia exato do pico, o que serve de sinal de venda.',
          porque: 'Aconteceu perto do topo, mas cinco casos não formam regra, e ninguém mediu isso como sinal.',
        },
      ],
      correta: 'b',
      explicacao:
        'É descrição do que aconteceu, não gatilho: nos casos com data, a imprensa geral chegou no ' +
        'topo ou depois.',
    },
  ],

  // ---------------------------------------------------------------------------
  // Vídeos — cada um vira o botão "Assistir a videoaula" dentro do card da seção
  // que ele reforça (o campo `secao` diz qual). O player só aparece no clique.
  // PENDENTE: a `transcricao`; enquanto ela não existe, o aviso padrão de
  // src/data/videoaulas.js entra embaixo do player.
  // ---------------------------------------------------------------------------
  videos: {
    'dois-pilares': {
      titulo: 'Por que duas checagens',
      secao: 'dois-pilares',
      src: 'assets/videos/dois-pilares.mp4',
      duracao: '7:32',
      descricao: 'Por que o pilar social e o técnico respondem a perguntas diferentes.',
      transcricao: [],
    },
    'narrativas': {
      titulo: 'Narrativas: de onde vem a atenção',
      secao: 'ciclo',
      src: 'assets/videos/narrativas-de-onde-vem-a-atencao.mp4',
      duracao: '9:16',
      descricao: 'De onde nasce a atenção em torno de um token, e por que ela não prevê o resultado.',
      transcricao: [],
    },
    'pilar-tecnico-na-pratica': {
      titulo: 'Pilar técnico na prática',
      secao: 'pilar-tecnico-na-pratica',
      src: 'assets/videos/pilar-tecnico-na-pratica.mp4',
      duracao: '10:15',
      descricao: 'RugCheck, Solscan, Bubblemaps e DexScreener: uma pergunta que cada ferramenta responde.',
      transcricao: [],
    },
    'cenario-2025-2026': {
      titulo: 'O cenário 2025–2026',
      secao: 'cenario-2025-2026',
      src: 'assets/videos/cenario-2025-2026.mp4',
      duracao: '7:43',
      descricao: 'Como a liderança entre launchpads mudou em 2025, e por que perseguir o nome do momento não é estratégia.',
      transcricao: [],
    },
    'pilar-social-na-pratica': {
      titulo: 'Pilar social na prática: o endereço oficial em 5 minutos',
      secao: 'pilar-social-na-pratica',
      src: 'assets/videos/pilar-social-na-pratica.mp4',
      duracao: '6:57',
      descricao: 'A rotina de 5 minutos e os golpes do X, do Discord e do Telegram.',
      transcricao: [],
    },
  },
};
