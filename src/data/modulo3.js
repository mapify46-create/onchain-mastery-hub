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
    'confiança. Este módulo mostra como fazer cada checagem, passo a passo, e apresenta ' +
    'as ferramentas de cada pilar numa matriz filtrável.',

  objetivos: [
    'Entender que a decisão de entrada combina sinal social + checagem técnica.',
    'Confirmar o endereço oficial de um token em 5 minutos, e reconhecer os golpes de X, Discord e Telegram.',
    'Usar RugCheck, Solscan, Bubblemaps e DexScreener sabendo o que cada campo prova — e o que não prova.',
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
          'apoiada nos dois ao mesmo tempo: "este token é quem diz ser, e por que está ' +
          'chamando atenção agora" (social) e "o que o contrato e as carteiras ainda permitem ' +
          'fazer contra mim" (técnico). Passar nas duas checagens não torna um token seguro: ' +
          'só quer dizer que ele não mostrou os problemas que dá para ver.',
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
      titulo: '"J7 Tracker": existe, mas não é o que o nome sugere aqui',
      texto:
        'O J7 Tracker existe (j7tracker.io) — mas é uma ferramenta de sniping e deploy de ' +
        'token ("sub-1ms server-side deploys"), com um rastreador de tweets embutido como ' +
        'recurso auxiliar; acesso por credenciais via Discord. Não é uma ferramenta de ' +
        'tracker de narrativa como exemplo isolado. A categoria em si — "tracker de tweets / ' +
        'alertas sociais" — é real e usada no mercado; o hub cita o nome só para deixar ' +
        'claro o que ele de fato é, não como recomendação de uso.',
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
  // Cenário de launchpads 2025–2026 (aba "Cenário 2025–2026")
  // ---------------------------------------------------------------------------
  cenarioLaunchpads: {
    titulo: 'A liderança entre launchpads muda rápido',
    introducao:
      'Verificado, com uma ressalva importante: os números abaixo mudam de mês em mês. O ' +
      'que fica é o conceito — launchpad + bonding curve + graduação para uma DEX — não o ' +
      'nome de quem lidera hoje.',
    // Em ordem cronológica — a view desenha isto como linha do tempo, e uma
    // linha do tempo fora de ordem ensina errado.
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
    conclusao:
      'O líder muda rápido; o hub ensina o conceito e mantém os nomes e números editáveis ' +
      'bem aqui, em src/data/modulo3.js.',
  },

  // ---------------------------------------------------------------------------
  // Aba "Pilar social na prática" — pesquisa 5 dos módulos (pilar social) e a
  // prova ao vivo do ticker repetido (VERIFICACOES-AO-VIVO.md, seção 7).
  // ---------------------------------------------------------------------------
  praticaSocial: {
    introducao:
      'O pilar social responde duas perguntas: o token é quem diz ser, e a atenção em cima ' +
      'dele é real? A primeira evita a perda total e se resolve em 5 minutos. A segunda ' +
      'nunca se resolve por completo — e tudo aqui é manual, porque não existe forma ' +
      'gratuita e dentro das regras de automatizar o social, com uma exceção pequena.',

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

    rotina: {
      titulo: 'A rotina de 5 minutos, para todo token novo',
      descricao:
        'Na ordem em que você abre cada coisa. Qualquer divergência de endereço, em qualquer ' +
        'etapa, encerra a checagem: não compre.',
      passos: [
        {
          tempo: '0 a 45 s',
          titulo: 'Ache a conta oficial no X',
          texto:
            'Confira o @ letra por letra (l e I, 0 e o), veja se há badge de afiliação e se a bio ' +
            'aponta para um site. Se você só tem um @ que veio de resposta de post ou de DM, pare.',
        },
        {
          tempo: '45 s a 1 min 30',
          titulo: 'Abra o site oficial pelo link da bio',
          texto: 'Ache o endereço do contrato no site e copie dali. É a sua fonte de maior confiança.',
        },
        {
          tempo: '1 min 30 a 2 min',
          titulo: 'Compare com o post fixado do X oficial',
          texto: 'O endereço do site e o do post fixado têm que ser o mesmo, caractere por caractere. Se não forem, pare.',
        },
        {
          tempo: '2 min a 3 min 30',
          titulo: 'Cole o endereço no explorador',
          texto:
            'Na Solana, o Solscan: extensões, autoridades, idade e holders (passo a passo na aba ' +
            'Pilar técnico). Numa rede EVM, o Etherscan: contrato "verified" quer dizer que o ' +
            'código publicado bate com o que roda — não que é seguro ou auditado.',
        },
        {
          tempo: '3 min 30 a 4 min 30',
          titulo: 'Cole o endereço no DexScreener',
          texto:
            'Olhe liquidez, volume e negociações. Ícone e links da página não provam nada: são ' +
            'preenchidos e pagos pelo próprio projeto.',
        },
        {
          tempo: '4 min 30 a 5 min',
          titulo: 'Sanidade final no canal oficial',
          texto:
            'Abra t.me/s/nomedocanal no navegador e confira se o endereço anunciado bate com o ' +
            'que você já validou. Se o token chegou por um call, procure os sinais de call pago.',
        },
      ],
    },

    anatomiaPerfil: {
      titulo: 'O que olhar num perfil que se diz oficial',
      descricao: 'Mockup desenhado, não captura do X. Clique num item da legenda para localizar.',
      viewBox: [0, 0, 640, 332],
      paineis: [
        { id: 'nome', x: 12, y: 12, w: 400, h: 56, rotulo: 'Nome e @handle', tipo: 'texto' },
        { id: 'selo', x: 424, y: 12, w: 204, h: 56, rotulo: 'Selo · badge de afiliação', tipo: 'campo', alerta: true },
        { id: 'bio', x: 12, y: 80, w: 400, h: 64, rotulo: 'Bio com o link do site', tipo: 'texto' },
        { id: 'data', x: 424, y: 80, w: 204, h: 64, rotulo: 'Entrou em · seguidores', tipo: 'numeros' },
        { id: 'fixado', x: 12, y: 156, w: 616, h: 72, rotulo: 'Post fixado com o endereço', tipo: 'lista' },
        { id: 'respostas', x: 12, y: 240, w: 616, h: 80, rotulo: 'Respostas: "o endereço certo é este…"', tipo: 'lista', alerta: true },
      ],
      itens: [
        { painel: 'nome', titulo: 'Nome e @handle', texto: 'O nome qualquer um copia. O @ é único: compare letra por letra, atrás de caractere trocado.' },
        { painel: 'selo', titulo: 'Selo', texto: 'Azul é assinatura Premium, não identidade. Dourado é organização verificada; o badge de afiliação liga a conta a uma.' },
        { painel: 'bio', titulo: 'Bio', texto: 'O link do site sai daqui. Não use site achado por busca ou anúncio.' },
        { painel: 'data', titulo: 'Data de entrada e seguidores', texto: 'Conta nova para um projeto "antigo", ou muitos seguidores com pouco engajamento, são sinais de conta falsa.' },
        { painel: 'fixado', titulo: 'Post fixado', texto: 'É onde o projeto costuma deixar o endereço. Tem que bater com o do site.' },
        { painel: 'respostas', titulo: 'Respostas', texto: 'Endereço colado em resposta é o golpe clássico. Nunca pegue o endereço daqui.' },
      ],
      nota: 'Selos segundo a central de ajuda do X, consultada em setembro de 2026.',
    },

    secoes: [
      {
        id: 'endereco',
        titulo: 'O endereço: a checagem que sozinha evita a perda total',
        paragrafos: [
          'Nome e ticker qualquer um copia; o endereço do contrato é a identidade do token na ' +
            'blockchain. Em 12/09/2026, dois tokens diferentes do pump.fun usavam o ticker ' +
            'SATOSHI ao mesmo tempo, e um terceiro tinha o ticker "Usdt", imitando uma stablecoin.',
          'O projeto publica o endereço em três lugares, em ordem de confiança: o site oficial ' +
            '(aberto por um link confiável, não por anúncio ou busca), a bio ou o post fixado do ' +
            'X oficial, e o canal oficial de anúncios no Discord ou no Telegram.',
          'Quando as fontes divergem, vale a mais controlada pelo projeto: site e post fixado ' +
            'batendo entre si. Um canal fácil de sequestrar — resposta de post, DM, link curto do ' +
            'Discord — nunca desempata. Divergência, por si só, é motivo para não comprar.',
          'Compare o endereço inteiro. Golpistas geram endereços com os mesmos primeiros e ' +
            'últimos caracteres do original, para enganar quem só olha as pontas.',
        ],
        listaTitulo: 'Nunca pegue o endereço de:',
        lista: [
          'DM ou mensagem de desconhecido.',
          'Resposta embaixo de post viral.',
          'Site que veio de anúncio ou de busca.',
          'QR code ou link encurtado.',
        ],
      },
      {
        id: 'x',
        titulo: 'X: o que o selo prova, e como achar conta falsa',
        paragrafos: [
          'O selo azul, hoje, quer dizer assinatura Premium ativa — a central de ajuda do X diz ' +
            'que essas contas não passam por revisão de identidade. O selo dourado é de ' +
            'organização verificada, o cinza é de governo, e o badge de afiliação (a foto da ' +
            'organização ao lado do selo) liga a conta a uma organização verificada.',
          'A busca avançada funciona de graça, logado. from:conta mostra só os posts dela; ' +
            'since:2026-09-01 filtra por data; min_faves:100 corta posts sem curtidas; e aspas ' +
            'buscam o endereço exato. Os operadores near:, source: e geocode: foram removidos e ' +
            'devolvem página vazia, sem aviso de erro.',
          'Automatizar isso de graça não existe: raspar o X fora da API é proibido pelos termos, ' +
            'e a API é paga.',
        ],
        listaTitulo: 'Sinais grátis de conta falsa imitando um projeto:',
        lista: [
          '@ com caractere trocado (l por I, 0 por o).',
          'Conta criada há pouco, ou que trocou de @ recentemente.',
          'Selo azul sem badge de afiliação num "perfil oficial".',
          'Muitos seguidores com pouco engajamento, e respostas repetitivas de bots.',
        ],
      },
      {
        id: 'discord',
        titulo: 'Discord: os quatro golpes, e a defesa de cada um',
        paragrafos: [
          'Servidores de memecoin costumam ter canais de anúncios, verificação, conversa, calls e ' +
            'um canal com o endereço. Não dá para ler o histórico sem entrar no servidor, e ' +
            'automatizar a leitura com a sua conta (self-bot) é proibido pelas regras do Discord, ' +
            'com risco de perder a conta.',
          'A única automação grátis e permitida: seguir um canal de anúncios (o do ícone de ' +
            'megafone). Os anúncios passam a cair num canal do seu próprio servidor. Só funciona ' +
            'se o projeto usar esse tipo de canal, e só chega o que o admin escolher publicar.',
        ],
        listaTitulo: 'Os golpes, em ordem de frequência nos alertas de segurança:',
        lista: [
          'Servidor falso: o golpista assume o link curto (discord.gg/nome) que o projeto deixou ' +
            'de pagar e recria um servidor idêntico. Defesa: entre sempre pelo link do site ou do ' +
            'X oficial.',
          'Bot falso de verificação: parece o Collab.Land, mas o @ é outro, e ele leva a um site ' +
            'que pede para conectar a carteira e assinar. Foi o caminho do Inferno Drainer. ' +
            'Defesa: verificação legítima não pede assinatura.',
          '"Conecte a carteira": depois de conectar, uma assinatura autoriza a transferência ' +
            'silenciosa dos seus ativos. Defesa: não assine nada que veio de link de comunidade, ' +
            'e use uma carteira separada para projetos novos (Módulo 1).',
          'DM de "suporte" e admin invadido: suporte de verdade não chama primeiro, e até um ' +
            'anúncio oficial pode vir de conta sequestrada. Defesa: desligue DMs de membros do ' +
            'servidor e trate anúncio urgente com link como suspeito até conferir no site.',
        ],
      },
      {
        id: 'telegram',
        titulo: 'Telegram: ler sem entrar, e o risco dos bots de compra',
        paragrafos: [
          'Para ler um canal público sem app e sem conta, abra t.me/s/nomedocanal no navegador: ' +
            'o /s/ mostra o histórico de posts. Como membro, você vê posts, visualizações, ' +
            'fixados e, se houver grupo vinculado, os comentários.',
          'Automatizar também não dá num canal alheio: um bot só recebe os posts de um canal se ' +
            'for administrador dele.',
          'O risco maior do Telegram são os bots de compra. Muitos geram a carteira e guardam a ' +
            'chave privada no servidor deles: se o bot for comprometido, a perda pode ser total. ' +
            'Em outubro de 2023, falhas no Maestro (24/10) e no Unibot (31/10) somaram US$ 1,1 ' +
            'milhão roubados. Em 19/09/2024, uma falha no Banana Gun drenou cerca de US$ 3 ' +
            'milhões de 11 usuários — reembolsados pelo próprio bot.',
          'Bot falso com nome parecido drena quem cola a seed. O @ do bot se confere no site ' +
            'oficial dele, e a conta do Telegram precisa de verificação em duas etapas.',
        ],
      },
      {
        id: 'calls',
        titulo: 'Calls pagos: a regra, os números e como perceber',
        paragrafos: [
          'Nos EUA, a FTC exige que pagamento a quem recomenda seja declarado de forma clara. ' +
            'Para ativos que sejam valores mobiliários, a SEC exige mais: declarar o fato e o ' +
            'valor. Kim Kardashian pagou US$ 1,26 milhão em 2022 por promover o token EMAX sem ' +
            'dizer que tinha recebido US$ 250 mil — ela pôs #AD, e não bastou.',
          'No Brasil, o Código de Defesa do Consumidor proíbe publicidade disfarçada, o guia do ' +
            'CONAR para influenciadores (nova versão de maio de 2026) pede identificação clara já ' +
            'na primeira visualização, e a CVM reserva a recomendação de valores mobiliários a ' +
            'analistas registrados.',
          'Os números: num estudo com 36 mil tweets de 180 influenciadores sobre mais de 1.600 ' +
            'criptoativos, o preço subia 1,83% no primeiro dia e caía 2,24% em 10 dias e 6,53% em ' +
            '30. Quem pôs US$ 1.000 em tokens fora do top 100 no dia do tweet e segurou 30 dias ' +
            'perdeu US$ 79, em média. Os autores dizem que o padrão combina com pump-and-dump, mas ' +
            'que a prova é inconclusiva.',
        ],
        listaTitulo: 'Sinais de call pago não declarado, de graça:',
        lista: [
          'Posts quase idênticos em várias contas, na mesma janela de horário.',
          'A carteira do influenciador recebe o token antes do post (dá para ver no explorador).',
          'Post apagado logo depois da alta.',
          'Link de afiliado ou de indicação.',
          '"Não é conselho financeiro" seguido do endereço do contrato.',
        ],
      },
    ],

    tabela: {
      colunas: [
        { chave: 'prova', rotulo: 'O que prova' },
        { chave: 'naoProva', rotulo: 'O que não prova' },
      ],
      linhas: [
        { id: 'site', titulo: 'Endereço no site oficial', valores: { prova: 'A referência primária do projeto', naoProva: 'Que o site é o oficial — cruze com o X' } },
        { id: 'fixado', titulo: 'Endereço no post fixado do X oficial', valores: { prova: 'Coerência com o site: identidade confirmada', naoProva: 'Que o token é bom' } },
        { id: 'selo-azul', titulo: 'Selo azul no X', valores: { prova: 'Assinatura Premium ativa', naoProva: 'Que é a conta do projeto' } },
        { id: 'afiliacao', titulo: 'Selo dourado ou badge de afiliação', valores: { prova: 'Organização verificada, ou vínculo com uma', naoProva: 'Mérito do token' } },
        { id: 'socials-dex', titulo: 'Ícone e links no DexScreener', valores: { prova: 'Que alguém pagou para preencher a página', naoProva: 'Identidade oficial' } },
        { id: 'anuncio', titulo: 'Anúncio no canal oficial', valores: { prova: 'O que o admin publicou', naoProva: 'Que a conta do admin não foi invadida' } },
        { id: 'call', titulo: 'Call de influenciador', valores: { prova: 'Que houve atenção naquele momento', naoProva: 'Valor futuro' } },
        { id: 'verify', titulo: 'Verificação pedindo para conectar a carteira', valores: { prova: 'Golpe', naoProva: 'Nada legítimo' } },
      ],
    },
  },

  // ---------------------------------------------------------------------------
  // Aba "Pilar técnico na prática" — pesquisa 4 dos módulos (documentação oficial
  // de cada ferramenta) e as telas conferidas ao vivo (VERIFICACOES-AO-VIVO.md,
  // seções 5 e 6). As anatomias são mockups desenhados, não capturas.
  // ---------------------------------------------------------------------------
  praticaTecnica: {
    introducao:
      'Quatro ferramentas grátis, cada uma respondendo uma pergunta. A ordem importa: primeiro ' +
      'o que o contrato permite, depois quem controla as carteiras, por fim quanto dinheiro há ' +
      'na pool. O exemplo é o BONK, conferido ao vivo em 12/09/2026. Nenhuma delas pede ' +
      'carteira conectada para ler.',

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

    ferramentas: [
      {
        id: 'rugcheck',
        nome: 'RugCheck',
        endereco: 'rugcheck.xyz',
        pergunta: 'Que riscos o contrato e as carteiras mostram?',
        gratis:
          'A página do token é grátis, sem cadastro. Só votar em "trending" pede carteira ' +
          'conectada — não conecte.',
        anatomia: {
          titulo: 'A página de um token no RugCheck',
          descricao: 'Mockup desenhado. Clique num item da legenda para localizar.',
          viewBox: [0, 0, 640, 300],
          paineis: [
            { id: 'score', x: 12, y: 12, w: 200, h: 120, rotulo: 'Score', tipo: 'numeros' },
            { id: 'risks', x: 224, y: 12, w: 404, h: 120, rotulo: 'Risks', tipo: 'lista' },
            { id: 'markets', x: 12, y: 144, w: 200, h: 64, rotulo: 'Markets', tipo: 'numeros' },
            { id: 'insiders', x: 224, y: 144, w: 200, h: 64, rotulo: 'Insiders', tipo: 'campo', alerta: true },
            { id: 'holders', x: 436, y: 144, w: 192, h: 64, rotulo: 'Holders', tipo: 'numeros' },
            { id: 'lockers', x: 12, y: 220, w: 616, h: 68, rotulo: 'Lockers & LP', tipo: 'campo' },
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
          'Olhe Insiders. Num lançamento recente e limpo, o esperado é zero redes de transferência. Redes de negociação entre si preocupam quando são a maioria das contas negociando.',
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
        anatomia: {
          titulo: 'A página de um token no Solscan',
          descricao: 'Mockup desenhado. Clique num item da legenda para localizar.',
          viewBox: [0, 0, 640, 340],
          paineis: [
            { id: 'mcap', x: 12, y: 12, w: 200, h: 64, rotulo: 'Market Cap', tipo: 'numeros' },
            { id: 'holders', x: 224, y: 12, w: 200, h: 64, rotulo: 'Holders', tipo: 'numeros' },
            { id: 'authority', x: 436, y: 12, w: 192, h: 64, rotulo: 'Authority ▾', tipo: 'campo', alerta: true },
            { id: 'creator', x: 12, y: 88, w: 300, h: 56, rotulo: 'Creator', tipo: 'campo' },
            { id: 'programa', x: 328, y: 88, w: 300, h: 56, rotulo: 'Owner Program · Token Extensions', tipo: 'campo' },
            { id: 'abas', x: 12, y: 156, w: 616, h: 40, rotulo: 'Transfers · Activities · Holders · Metadata · Markets', tipo: 'texto' },
            { id: 'transfers', x: 12, y: 208, w: 616, h: 120, rotulo: 'Transfers, em ordem "Oldest First"', tipo: 'lista' },
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
          'Aba Transfers em "Oldest First": as primeiras compras. O Solscan não tem um campo "quanto o criador comprou"; a resposta está nessas linhas.',
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
        anatomia: {
          titulo: 'O mapa de bolhas do Bubblemaps',
          descricao: 'Mockup desenhado. Clique num item da legenda para localizar.',
          viewBox: [0, 0, 640, 320],
          paineis: [
            { id: 'mapa', x: 12, y: 12, w: 400, h: 296, rotulo: 'Mapa de bolhas · top 250', tipo: 'grafico' },
            { id: 'carteira', x: 424, y: 12, w: 204, h: 120, rotulo: 'Detalhe: % do supply', tipo: 'numeros', alerta: true },
            { id: 'magic', x: 424, y: 144, w: 204, h: 48, rotulo: 'Magic Nodes', tipo: 'botao' },
            { id: 'olho', x: 424, y: 204, w: 204, h: 48, rotulo: 'Mostrar contratos e CEX', tipo: 'botao' },
            { id: 'hora', x: 424, y: 264, w: 204, h: 44, rotulo: 'Hora do cálculo', tipo: 'campo' },
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
        anatomia: {
          titulo: 'A página de um par no DexScreener',
          descricao: 'Mockup desenhado. Clique num item da legenda para localizar.',
          viewBox: [0, 0, 640, 320],
          paineis: [
            { id: 'grafico', x: 12, y: 12, w: 400, h: 200, rotulo: 'Gráfico', tipo: 'grafico' },
            { id: 'preco', x: 424, y: 12, w: 204, h: 48, rotulo: 'Price USD', tipo: 'numeros' },
            { id: 'liquidez', x: 424, y: 72, w: 204, h: 64, rotulo: 'Liquidity · FDV · Mkt Cap', tipo: 'numeros' },
            { id: 'txns', x: 424, y: 148, w: 204, h: 64, rotulo: 'Txns · Volume · Makers', tipo: 'numeros', alerta: true },
            { id: 'info', x: 12, y: 224, w: 300, h: 84, rotulo: 'Info e socials', tipo: 'texto', alerta: true },
            { id: 'audit', x: 324, y: 224, w: 304, h: 84, rotulo: 'Audit', tipo: 'lista' },
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

    tabelaOnde: {
      colunas: [
        { chave: 'onde', rotulo: 'Onde checar' },
        { chave: 'campo', rotulo: 'Campo' },
      ],
      linhas: [
        { id: 'programa', titulo: 'Programa e extensões', valores: { onde: 'Solscan', campo: 'Owner Program, Token Extensions' } },
        { id: 'autoridades', titulo: 'Mint e freeze authority', valores: { onde: 'Solscan e RugCheck', campo: 'Authority (menu); Risks' } },
        { id: 'metadata', titulo: 'Nome e imagem podem mudar?', valores: { onde: 'Solscan', campo: 'Aba Metadata' } },
        { id: 'criador', titulo: 'Quem criou, e se já vendeu', valores: { onde: 'Solscan', campo: 'Creator + aba Transfers em "Oldest First"' } },
        { id: 'concentracao', titulo: 'Concentração real', valores: { onde: 'Bubblemaps e RugCheck', campo: 'Clusters e Magic Nodes; Insiders' } },
        { id: 'bundle', titulo: 'Compra coordenada no lançamento', valores: { onde: 'trench.bot (só pump.fun)', campo: 'Current held %' } },
        { id: 'liquidez', titulo: 'Liquidez do par', valores: { onde: 'DexScreener', campo: 'Liquidity' } },
        { id: 'fdv', titulo: 'FDV e market cap', valores: { onde: 'DexScreener', campo: 'FDV, Mkt Cap' } },
        { id: 'volume', titulo: 'Volume e negociações', valores: { onde: 'DexScreener', campo: 'Txns, Volume, Makers' } },
      ],
    },
  },

  // Itens das duas abas práticas que não fecharam em fonte confiável.
  naoVerificadoPratica: [
    { titulo: 'Preço da API do X em 2026', texto: 'O valor de US$ 0,005 por post lido vem de guias de terceiros coerentes entre si; a página oficial de preços não foi aberta.' },
    { titulo: 'Custódia da chave em cada bot de Telegram', texto: 'Varia de bot para bot, e alguns se declaram não custodiais. Não foi conferido na documentação de cada um.' },
    { titulo: 'Data de criação de um canal do Telegram', texto: 'Que ela não aparece para quem é só membro é o comportamento conhecido, sem página oficial que confirme.' },
    { titulo: '"Traders", "Buyers", "Sellers" e "Audit" do DexScreener', texto: 'Não têm definição na documentação oficial, e a origem dos dados da Audit não é informada.' },
    { titulo: 'Fórmula do score do RugCheck', texto: 'Não é publicada: a documentação da API mostra só os campos. Tabelas de 0 a 100 que circulam são de terceiros.' },
  ],

  fontesPratica: [
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
  // Mini-quiz (aba "Quiz") — 10 perguntas
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
  ],
};
