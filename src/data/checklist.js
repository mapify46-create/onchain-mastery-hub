// checklist.js — conteúdo da página "Checklist antes de comprar" (#/checklist).
// Aqui só tem DADOS: nenhuma lógica, nenhum HTML.
//
// Cada item carrega uma `evidencia`, que diz POR QUE ele está no checklist:
//   fato   — mecânica do protocolo ou golpe documentado. Diz o que PODE acontecer,
//            por construção (ex.: freeze authority ativa permite congelar sua conta).
//   medido — sinal com pesquisa publicada mostrando que ele prevê rug ou prejuízo.
//   fraco  — sinal sem medição, ou que já é contornado de propósito. Triagem, nunca prova.
//   rotina — hábito de decisão. Ajuda a cumprir a própria regra; não diz nada do token.
//
// Por que quatro etiquetas e não duas cores: "freeze authority ativa" é mecânica
// certa (o dono consegue congelar), mas como PREDITOR de rug não tem medição. Com duas
// cores ela ficaria junto do folclore, e isso ensinaria errado.
//
// A classificação vem das pesquisas em pesquisa/modulos/pesquisas/ (em especial a P5,
// a P7 e as verificações ao vivo de 12 e 13/09/2026).

export const EVIDENCIAS = {
  fato: {
    rotulo: 'Fato do protocolo',
    tom: 'acento',
    descricao:
      'Mecânica da blockchain ou golpe documentado. Diz o que pode acontecer, por construção — não o que vai acontecer.',
  },
  medido: {
    rotulo: 'Sinal medido',
    tom: 'baixo',
    descricao:
      'Há pesquisa publicada mostrando que o sinal prevê rug ou prejuízo. Pede julgamento: não existe limiar oficial.',
  },
  fraco: {
    rotulo: 'Sinal fraco',
    tom: 'medio',
    descricao:
      'Sem medição, ou já contornado de propósito por quem monta golpes. Serve para triar, nunca para confiar.',
  },
  rotina: {
    rotulo: 'Rotina',
    tom: 'primaria',
    descricao:
      'Hábito de decisão. Ajuda você a cumprir a própria regra; não diz nada sobre o token.',
  },
};

export const checklistPreCompra = {
  titulo: 'Checklist antes de comprar',
  resumo:
    'A checagem de cada compra, com os dois pilares — social e técnico — e o que decide se ' +
    'você entra. Cada item diz por que está aqui: mecânica do protocolo, sinal medido por ' +
    'pesquisa, sinal fraco ou hábito de decisão.',

  // Números grandes que abrem a página. Todos com fonte em `fontes`, abaixo.
  destaques: [
    {
      rotulo: 'A checagem que sozinha evita perda total',
      valor: 'O endereço',
      nota:
        'Nome e ticker qualquer um copia. Em 12/09/2026, dois tokens diferentes do pump.fun ' +
        'usavam o ticker SATOSHI ao mesmo tempo.',
    },
    {
      rotulo: 'Tokens que deram rug no teste do melhor detector publicado',
      valor: '81,9%',
      nota:
        'No PumpFun (arXiv 2608.20271, preprint). Com a maioria dando rug, nenhum item aprova ' +
        'um token — eles só reprovam.',
      tom: 'alerta',
    },
    {
      rotulo: 'Famílias de sinal com medição que se repete entre estudos',
      valor: '3',
      nota:
        'Concentração real dos holders, carteiras coordenadas no lançamento e volume ' +
        'artificial. O resto é mecânica do protocolo ou folclore.',
    },
  ],

  comoUsar: {
    titulo: 'Como usar',
    paragrafos: [
      'Siga a ordem: pilar social, pilar técnico, decisão. Um endereço errado torna o resto ' +
        'inútil, e um contrato com armadilha torna a tese irrelevante.',
      'Um "não" em qualquer item marcado como fato do protocolo encerra a checagem: não ' +
        'compre. Os sinais medidos pedem julgamento — não existe limiar publicado para ' +
        '"concentração alta".',
      'Passar em tudo não aprova o token. Só quer dizer que ele não mostrou os sinais que dá ' +
        'para ver.',
    ],
  },

  blocos: [
    {
      id: 'social',
      rotuloCurto: 'pilar social',
      titulo: 'Pilar social — o token é quem diz ser?',
      descricao:
        'Faça estes primeiro. Tudo aqui é manual: não existe forma gratuita e dentro das ' +
        'regras de automatizar o pilar social no X, no Telegram ou no Discord.',
      itens: [
        {
          id: 'endereco-oficial',
          texto: 'O endereço do contrato veio do site oficial e bate com o post fixado do X oficial',
          porque:
            'Nome e ticker qualquer um copia; o endereço é a identidade do token. Se as fontes ' +
            'divergem, não compre.',
          onde: 'Site oficial (alcançado por link confiável) e post fixado ou bio do X do projeto.',
          evidencia: 'fato',
          fonte: 'Pesquisa 5 (regra de decisão) e amostra on-chain de 12/09/2026',
        },
        {
          id: 'link-oficial',
          texto:
            'Cheguei ao site, ao Discord e ao Telegram por link oficial — não por busca, anúncio, DM ou resposta de post',
          porque:
            'Servidor falso, bot falso de verificação e DM de "suporte" começam sempre por um ' +
            'link. O Inferno Drainer esvaziou mais de 30 mil carteiras por esse caminho.',
          onde: 'Links da bio do X oficial ou do próprio site.',
          evidencia: 'fato',
          fonte: 'Check Point Research, "Inferno Drainer Reloaded" (2025)',
        },
        {
          id: 'sem-assinatura',
          texto: 'Nenhuma "verificação" me pediu para conectar a carteira ou assinar algo',
          porque:
            'Bot legítimo de verificação não precisa da sua assinatura. Pedido de assinatura ' +
            'vindo de link de comunidade é o roteiro do drainer.',
          onde: 'Canal de verificação do Discord ou do Telegram.',
          evidencia: 'fato',
          fonte: 'Check Point Research (2025): bot falso imitando o Collab.Land leva à assinatura maliciosa',
        },
        {
          id: 'conta-oficial',
          texto: 'Confirmei a conta oficial pelo link do site ou pelo badge de afiliação — não pelo selo azul',
          porque:
            'Hoje o selo azul do X quer dizer assinatura Premium ativa, não identidade ' +
            'verificada. Selo dourado e badge de afiliação dizem mais.',
          onde: 'Perfil no X: tipo de selo e badge ao lado do nome.',
          evidencia: 'fato',
          fonte: 'Central de ajuda do X, "About profile labels and checkmarks"',
        },
        {
          id: 'call-pago',
          texto: 'Se o token chegou por um influenciador, conferi se o post declara que foi pago',
          porque:
            'Depois de tweets de influenciadores, os tokens caíram em média 6,53% em 30 dias. ' +
            'Call é atenção, não valor.',
          onde:
            'O próprio post: "publi", "parceria", link de afiliado. Posts quase idênticos em ' +
            'várias contas na mesma hora indicam campanha.',
          evidencia: 'medido',
          fonte: 'Merkley, Pacelli, Piorkowski & Williams, Review of Accounting Studies (2024)',
        },
        {
          id: 'atencao-real',
          texto: 'O número de carteiras negociando acompanha o volume',
          porque:
            'Quem vende volume falso espalha as operações em mais de 100 carteiras justamente ' +
            'porque você olha isso. Use para triar, não para confiar.',
          onde: 'DexScreener: Volume, Txns e Makers na mesma janela de tempo.',
          evidencia: 'fraco',
          fonte: 'OpenLiquid (vendedor de volume, autopublicado) e Midsummer (arXiv 2507.01963, preprint)',
        },
      ],
    },
    {
      id: 'tecnico',
      rotuloCurto: 'pilar técnico',
      titulo: 'Pilar técnico — o contrato e as carteiras resistem?',
      descricao:
        'Os itens mecânicos vêm primeiro: eles dizem o que o dono do token consegue fazer com ' +
        'você. Os sinais medidos vêm depois e pedem julgamento.',
      itens: [
        {
          id: 'extensoes',
          texto: 'Conferi as extensões do token: num token do pump.fun, só metadataPointer e tokenMetadata',
          porque:
            'Hoje todo token do pump.fun é Token-2022 com exatamente essas duas (24 de 24 em ' +
            '12/09/2026). Taxa de transferência, delegado permanente ou hook fora disso: não compre.',
          onde: 'Solscan: campo "Token Extensions" e aba Metadata. O RugCheck também sinaliza.',
          evidencia: 'fato',
          fonte: 'Documentação do Token-2022 e checagem própria na blockchain (12/09/2026)',
        },
        {
          id: 'mint-authority',
          texto: 'A mint authority está revogada',
          porque:
            'Ativa, o dono pode criar tokens do nada e diluir quem comprou. No pump.fun ela vem ' +
            'sempre revogada — lá, não separa um token do outro.',
          onde:
            'Solscan: menu "Authority", que junta mint, freeze e metadados e mostra "N/A" quando ' +
            'estão revogadas. RugCheck.',
          evidencia: 'fato',
          fonte: 'Documentação da Solana; guia oficial do Solscan (campo Authority)',
        },
        {
          id: 'freeze-authority',
          texto: 'A freeze authority está revogada',
          porque:
            'Ativa, o dono pode congelar sua conta e você não consegue vender. Também vem ' +
            'revogada no pump.fun.',
          onde: 'Solscan: menu "Authority". RugCheck.',
          evidencia: 'fato',
          fonte: 'Documentação da Solana (freeze account)',
        },
        {
          id: 'metadata',
          texto: 'O nome e a imagem do token não podem mais ser alterados',
          porque:
            'Metadata mutável permite o token se passar por outro depois da sua compra. No ' +
            'pump.fun ela vem travada (11 de 11 checados).',
          onde:
            'Solscan: aba Metadata — campo "Mutable" num token SPL clássico, ou a update authority ' +
            'do tokenMetadata num Token-2022.',
          evidencia: 'fato',
          fonte: 'Documentação do Metaplex e do Token-2022; checagem própria (12/09/2026)',
        },
        {
          id: 'concentracao-real',
          texto: 'Olhei a concentração dos maiores holders juntando as carteiras ligadas entre si',
          porque:
            'Juntando as carteiras coordenadas, a fatia do top 10 sobe 24 pontos nos tokens de ' +
            'alto risco, contra 6 nos de baixo risco. A lista crua de holders esconde isso.',
          onde: 'Bubblemaps (clusters) e RugCheck (Insiders). Solscan para a lista de holders.',
          evidencia: 'medido',
          fonte: 'MELT/MemeTrans, arXiv 2602.13480 (preprint); Mazorra et al., Mathematics (2022)',
        },
        {
          id: 'bundles',
          texto: 'Vi se houve compra coordenada no lançamento, e quanto essas carteiras ainda seguram',
          porque:
            'Bundle está entre os sinais mais preditivos de alto risco. O que importa é quanto ' +
            'elas AINDA seguram, não quanto compraram.',
          onde:
            'trench.bot (só pump.fun): "Current held %". RugCheck, e as compras do bloco de ' +
            'criação no Solscan.',
          evidencia: 'medido',
          fonte: 'MELT/MemeTrans (preprint); documentação do trench.bot',
        },
        {
          id: 'historico-criador',
          texto: 'Olhei o histórico da carteira do criador',
          porque:
            'Em Ethereum e BSC, 1% dos endereços cria de 20% a 25% dos tokens. Criador com ' +
            'tokens anteriores mortos é sinal forte. No pump.fun, só há dado de empresa.',
          onde: 'Solscan: campo "Creator" e o histórico dessa carteira.',
          evidencia: 'medido',
          fonte: 'Cernera et al., USENIX Security 2023 (Ethereum e BSC)',
        },
        {
          id: 'dev-dump',
          texto: 'O criador não vendeu a própria compra nos primeiros minutos',
          porque:
            'No pump.fun o criador não consegue retirar a liquidez, então o golpe que sobra é ' +
            'vender. É o sinal que mais importa lá — e o menos medido pela pesquisa.',
          onde: 'Solscan: carteira do "Creator", em Token Balance Change e nas transações.',
          evidencia: 'fraco',
          fonte: 'Pesquisa 7: nenhum preditor revisado por pares isola esse sinal',
        },
        {
          id: 'lp-travada',
          texto: 'Li o "LP travado ou queimado" sem contar a favor do token',
          porque:
            'No pump.fun a pool pós-graduação é do protocolo, então está sempre "ok". Em outros ' +
            'lugares, tokens com trava eram maliciosos na mesma proporção que o resto.',
          onde: 'RugCheck: "Lockers & LP".',
          evidencia: 'fraco',
          fonte: 'Mazorra et al., Mathematics (2022): 97,3% maliciosos com trava, contra 97,7% no conjunto',
        },
      ],
    },
    {
      id: 'decisao',
      rotuloCurto: 'decisão',
      titulo: 'Decisão — você sabe o que vai fazer?',
      descricao:
        'Nenhum destes itens diz nada sobre o token. Dizem sobre você, e são os únicos que ' +
        'dependem só de você.',
      itens: [
        {
          id: 'ficha',
          texto: 'Escrevi a tese, a catálise com prazo e o que me provaria errado',
          porque:
            'Escrever antes congela o que você pensou. Depois do resultado, a memória reescreve ' +
            'a própria história.',
          onde: 'Ficha de tese do Módulo 4.',
          evidencia: 'rotina',
          fonte: 'Módulo 4; pesquisa 6 (viés de retrospectiva e intenções "se-então")',
        },
        {
          id: 'saidas',
          texto: 'Defini os alvos de saída antes de entrar',
          porque: 'Alvo definido com o gráfico piscando nasce contaminado pela euforia ou pelo medo.',
          onde: 'Escada de realização do Módulo 4.',
          evidencia: 'rotina',
          fonte: 'Módulo 4',
        },
        {
          id: 'tamanho',
          texto: 'O valor é um que eu posso perder inteiro',
          porque:
            'Com a cauda pesada da memecoin, não existe fórmula de tamanho ótimo — a de Kelly ' +
            'nem se aplica. O que sobra é sobreviver.',
          onde: 'Aba Tamanho do Módulo 7.',
          evidencia: 'rotina',
          fonte: 'Bamberg & Neuhierl, German Economic Review (2012); ruína do apostador (Feller)',
        },
        {
          id: 'stop',
          texto: 'A saída de proteção executa sozinha, sem depender de eu lembrar',
          porque:
            'Stop automático reduz o erro de segurar perdedor; lembrete não reduz. Confira no ' +
            'Módulo 5 se a ordem da sua plataforma depende do servidor dela.',
          onde: 'Configuração de ordens do terminal.',
          evidencia: 'rotina',
          fonte: 'Fischbacher, Hoffmann & Schudy, Review of Financial Studies (2017)',
        },
        {
          id: 'diario',
          texto: 'Registrei a operação no diário antes de clicar',
          porque:
            'Monitorar o próprio plano ajuda a cumpri-lo (meta-análise de 138 estudos). Não ' +
            'prova que a regra dá dinheiro.',
          onde: 'Aba Diário do Módulo 7.',
          evidencia: 'rotina',
          fonte: 'Harkin et al., Psychological Bulletin (2016)',
        },
      ],
    },
  ],

  fluxograma: {
    titulo: 'Do token visto à decisão de entrar',
    introducao:
      'O checklist em forma de caminho. Os primeiros cortes são mecânicos; a decisão só ' +
      'entra depois que o token passou por eles.',
    legenda: 'Em vermelho, os pontos onde a checagem termina. Em verde, o único caminho até a compra.',
    codigoMermaid: [
      'flowchart TD',
      '  A["Vi um token"] --> B{"O endereço veio da fonte oficial e bate?"}',
      '  B -- "Não" --> X["Não compro"]',
      '  B -- "Sim" --> C{"Extensão fora do padrão, ou mint ou freeze ativa?"}',
      '  C -- "Sim" --> X',
      '  C -- "Não" --> D{"Carteiras ligadas concentram muito, ou o criador já vendeu?"}',
      '  D -- "Sim" --> X',
      '  D -- "Não" --> E{"Tese, catálise e invalidação escritas?"}',
      '  E -- "Não" --> Y["Não compro: sem isso é aposta"]',
      '  E -- "Sim" --> F{"Valor que posso perder inteiro, com saída que executa sozinha?"}',
      '  F -- "Não" --> G["Ajusto o tamanho e a saída"]',
      '  G --> F',
      '  F -- "Sim" --> H["Registro no diário e só então entro"]',
      '  classDef nao fill:#3B1418,stroke:#EF4444,color:#FCA5A5,stroke-width:2px',
      '  classDef sim fill:#0E2A1B,stroke:#22C55E,color:#86EFAC,stroke-width:2px',
      '  class X,Y nao',
      '  class H sim',
    ].join('\n'),
    versaoEmTexto: [
      'Vejo um token e decido checar.',
      'Confiro se o endereço veio do site oficial e bate com o X oficial. Se não bate, não compro — nome e ticker não identificam nada.',
      'Confiro as extensões, a mint authority e a freeze authority. Extensão fora do padrão, ou mint ou freeze ativa: não compro. Isso é mecânica, não opinião.',
      'Olho as carteiras: quanto o top 10 concentra depois de juntar as carteiras ligadas, e se o criador já vendeu. Concentração muito alta ou venda do criador: não compro. Não existe limiar publicado para "muito alta" — é julgamento, e por isso vem depois dos itens mecânicos.',
      'Escrevo tese, catálise e invalidação. Se não consigo escrever, não compro: é aposta.',
      'Defino um valor que posso perder inteiro e uma saída que executa sozinha. Se não estão definidos, ajusto antes de seguir.',
      'Registro no diário e só então entro. Passar por tudo não aprova o token: só quer dizer que ele não mostrou os sinais que dá para ver.',
    ],
  },

  // Sinais que ficaram de fora do checklist, e por quê.
  sinaisDeFora: [
    {
      titulo: 'A nota do RugCheck',
      texto:
        'A fórmula e os limiares da nota não são publicados. Leia os riscos listados um por um, ' +
        'não o número.',
    },
    {
      titulo: 'O projeto ter site e redes sociais',
      texto:
        'É trivial de montar, e nenhuma pesquisa mediu isso como preditor de golpe. Golpe ' +
        'bem-feito tem site bonito.',
    },
    {
      titulo: '"Muitos holders"',
      texto:
        'Existem bots que inflam a contagem. A medição que existe é indireta: poucos holders se ' +
        'associa a alto risco, mas muitos não prova nada.',
    },
    {
      titulo: 'Detector automático de rug',
      texto:
        'No teste do PumpFun, o melhor modelo publicado teve F1 de 0,79 — e chutar "tudo é rug" ' +
        'dá 0,90. Serve, no máximo, de pré-filtro.',
    },
  ],

  fontes: [
    {
      titulo: 'Catching the Rug (arXiv 2608.20271, preprint) — rótulo, taxa-base e desempenho do detector',
      url: 'https://arxiv.org/html/2608.20271v1',
      consultadoEm: '13/09/2026',
    },
    {
      titulo: 'MELT / MemeTrans (arXiv 2602.13480, preprint) — bundles e concentração escondida',
      url: 'https://arxiv.org/html/2602.13480v2',
      consultadoEm: '13/09/2026',
    },
    {
      titulo: 'Mazorra, Adan & Daza, "Do Not Rug on Me" (Mathematics, 2022) — LP travada',
      url: 'https://doi.org/10.3390/math10060949',
      consultadoEm: '13/09/2026',
    },
    {
      titulo: 'Cernera et al., "Token Spammers, Rug Pulls, and Sniper Bots" (USENIX Security 2023)',
      url: 'https://www.usenix.org/conference/usenixsecurity23/presentation/cernera',
      consultadoEm: '13/09/2026',
    },
    {
      titulo: 'Merkley, Pacelli, Piorkowski & Williams, "Crypto-influencers" (Review of Accounting Studies, 2024)',
      url: 'https://doi.org/10.1007/s11142-024-09838-4',
      consultadoEm: '12/09/2026',
    },
    {
      titulo: 'Check Point Research — Inferno Drainer Reloaded (2025)',
      url: 'https://research.checkpoint.com/2025/inferno-drainer-reloaded-deep-dive-into-the-return-of-the-most-sophisticated-crypto-drainer/',
      consultadoEm: '12/09/2026',
    },
    {
      titulo: 'X — About profile labels and checkmarks',
      url: 'https://help.x.com/en/rules-and-policies/profile-labels',
      consultadoEm: '12/09/2026',
    },
    {
      titulo: 'OpenLiquid (vendedor de volume) — distribuição do volume em mais de 100 carteiras',
      url: 'https://openliquid.io/blog/trending-dexscreener-volume-thresholds/',
      consultadoEm: '12/09/2026',
    },
    {
      titulo: 'Solscan — Exploring Token Details page (campos Authority, Creator, Token Extensions)',
      url: 'https://info.solscan.io/exploring-token-details-page',
      consultadoEm: '13/09/2026',
    },
    {
      titulo: 'trench.bot — documentação do Bundle Scanner',
      url: 'https://docs.trench.bot/',
      consultadoEm: '12/09/2026',
    },
    {
      titulo: 'Checagem própria na blockchain (RPC público da Solana): Token-2022 e extensões em 24 tokens do pump.fun',
      url: 'https://api.mainnet-beta.solana.com (getMultipleAccounts)',
      consultadoEm: '12/09/2026',
    },
    {
      titulo: 'Harkin et al., Psychological Bulletin 142(2) (2016) — monitorar o próprio progresso',
      url: 'https://doi.org/10.1037/bul0000025',
      consultadoEm: '12/09/2026',
    },
    {
      titulo: 'Fischbacher, Hoffmann & Schudy (Review of Financial Studies, 2017), via Kotomin & Varma (2021) — stop automático',
      url: 'https://doi.org/10.1111/fire.12288',
      consultadoEm: '12/09/2026',
    },
    {
      titulo: 'Bamberg & Neuhierl, German Economic Review 13(2) (2012) — tamanho ótimo sob cauda pesada',
      url: 'https://doi.org/10.1111/j.1468-0475.2011.00553.x',
      consultadoEm: '12/09/2026',
    },
  ],
};
