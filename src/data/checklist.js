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
// Por que quatro etiquetas e não duas cores: o parágrafo está em
// `checklistPreCompra.etiquetas.porQueQuatro`, e a página mostra.
//
// A classificação vem das pesquisas em pesquisa/modulos/pesquisas/ (em especial a P5,
// a P7 e as verificações ao vivo de 12 e 13/09/2026).
//
// `peso` é a frase no pé do cartão de cada etiqueta (desenho "31 Checklist"): o quanto
// um item com essa etiqueta pesa na decisão.

export const EVIDENCIAS = {
  fato: {
    rotulo: 'Fato do protocolo',
    tom: 'acento',
    descricao:
      'Mecânica da blockchain ou golpe documentado: o que pode acontecer, não o que vai acontecer.',
    peso: 'Um "não" aqui encerra a checagem.',
  },
  medido: {
    rotulo: 'Sinal medido',
    tom: 'baixo',
    descricao:
      'Pesquisa publicada mostra que o sinal prevê rug ou prejuízo. Não há limiar oficial.',
    peso: 'Pesa, mas exige julgamento seu.',
  },
  fraco: {
    rotulo: 'Sinal fraco',
    tom: 'medio',
    descricao:
      'Sem medição, ou já contornado de propósito por golpistas. Só serve para triar.',
    peso: 'Não use como prova de nada.',
  },
  rotina: {
    rotulo: 'Rotina',
    tom: 'primaria',
    descricao:
      'Hábito de decisão: ajuda a cumprir a própria regra, não diz nada do token.',
    peso: 'Depende só de você.',
  },
};

export const checklistPreCompra = {
  // Micro-rótulo acima do título, como no desenho.
  rotulo: 'Rotina, a cada token',
  titulo: 'Checklist antes de comprar',
  resumo:
    'A checagem de cada compra: pilar social, pilar técnico e decisão. Cada item diz por que ' +
    'está aqui.',

  // Números grandes que abrem a página. Todos com fonte em `fontes`, abaixo.
  destaques: [
    {
      rotulo: 'A checagem que sozinha evita perda total',
      valor: 'O endereço',
      nota:
        'Nome e ticker qualquer um copia: em 12/09/2026, dois tokens do pump.fun usavam o ' +
        'ticker SATOSHI ao mesmo tempo.',
    },
    {
      rotulo: 'Tokens que deram rug no teste do melhor detector publicado',
      valor: '81,9%',
      nota:
        'No PumpFun (arXiv 2608.20271, preprint). Com a maioria dando rug, nenhum item aprova ' +
        'um token: só reprova.',
      tom: 'alerta',
    },
    {
      rotulo: 'Famílias de sinal com medição repetida entre estudos',
      valor: '3',
      nota:
        'Concentração real dos holders, carteiras coordenadas no lançamento e volume falso. ' +
        'O resto é mecânica ou folclore.',
    },
  ],

  // A seção "As quatro etiquetas de evidência": o parágrafo de abertura e a figura
  // com a contagem. Os números da contagem (8 de 23…) NÃO ficam aqui: a página conta
  // os itens dos blocos abaixo, então a figura acompanha qualquer mudança na lista.
  // "{total}" é trocado pelo total de itens.
  etiquetas: {
    titulo: 'As quatro etiquetas de evidência',
    porQueQuatro:
      'Por que quatro, e não duas cores: "freeze authority ativa" é mecânica certa (o dono ' +
      'consegue congelar), mas sem medição como preditor de rug. Com duas, ficaria junto do ' +
      'folclore e ensinaria errado.',
    tituloDaContagem: 'Quantos itens de cada etiqueta, no checklist inteiro',
    legendaDaContagem:
      'Mesma escala, de 0 a {total} itens. Só três famílias de sinal têm medição repetida ' +
      'entre estudos (destaque do topo); o resto é mecânica ou hábito seu.',
  },

  // Cada item da lista é um texto ou uma lista de pedaços; { forte } sai em negrito.
  comoUsar: {
    titulo: 'Como usar',
    paragrafos: [
      'Siga a ordem: social, técnico, decisão. Endereço errado torna o resto inútil; contrato ' +
        'com armadilha torna a tese irrelevante.',
      [
        'Um "não" em item de ',
        { forte: 'fato do protocolo' },
        ' encerra a checagem: não compre. Os ',
        { forte: 'sinais medidos' },
        ' pedem julgamento: não há limiar publicado para "concentração alta".',
      ],
      'Passar em tudo não aprova o token: só quer dizer que ele não mostrou os sinais visíveis.',
    ],
  },

  // Frase embaixo da lista de cada bloco.
  notaDoPainel: 'Marque conforme avança; as marcas ficam salvas no seu navegador.',

  blocos: [
    {
      id: 'social',
      rotuloCurto: 'Pilar social',
      titulo: 'Pilar social — o token é quem diz ser?',
      descricao:
        'Faça estes primeiro, à mão: no X, no Telegram e no Discord não há jeito gratuito e ' +
        'permitido de automatizar.',
      itens: [
        {
          id: 'endereco-oficial',
          texto: 'O endereço do contrato veio do site oficial e bate com o post fixado no X oficial',
          porque:
            'Nome e ticker qualquer um copia; o endereço é a identidade do token. Se as fontes ' +
            'divergem, não compre.',
          onde: 'Site oficial (aberto por link confiável) e post fixado ou bio do X do projeto.',
          evidencia: 'fato',
          fonte: 'Pesquisa 5 (regra de decisão) e amostra on-chain de 12/09/2026',
        },
        {
          id: 'link-oficial',
          texto:
            'Abri site, Discord e Telegram por link oficial, não por busca, anúncio, DM ou resposta de post',
          porque:
            'Servidor falso, bot falso de verificação e DM de "suporte" sempre começam por um ' +
            'link: assim o Inferno Drainer esvaziou mais de 30 mil carteiras.',
          onde: 'Links da bio do X oficial ou do próprio site.',
          evidencia: 'fato',
          fonte: 'Check Point Research, "Inferno Drainer Reloaded" (2025)',
        },
        {
          id: 'sem-assinatura',
          texto: 'Nenhuma "verificação" me pediu para conectar a carteira ou assinar algo',
          porque:
            'Bot legítimo de verificação não pede assinatura; pedido assim, vindo de link de ' +
            'comunidade, é roteiro de drainer.',
          onde: 'Canal de verificação do Discord ou do Telegram.',
          evidencia: 'fato',
          fonte: 'Check Point Research (2025): bot falso imitando o Collab.Land leva à assinatura maliciosa',
        },
        {
          id: 'conta-oficial',
          texto: 'Confirmei a conta oficial pelo link do site ou badge de afiliação, não pelo selo azul',
          porque:
            'No X, selo azul hoje é assinatura Premium ativa, não identidade verificada. Selo ' +
            'dourado e badge de afiliação dizem mais.',
          onde: 'Perfil no X: tipo de selo e badge ao lado do nome.',
          evidencia: 'fato',
          fonte: 'Central de ajuda do X, "About profile labels and checkmarks"',
        },
        {
          id: 'call-pago',
          texto: 'Se o token veio de influenciador, conferi se o post declara que foi pago',
          porque:
            'Após posts de influenciadores, os tokens caíram em média 6,53% em 30 dias. Call é ' +
            'atenção, não valor.',
          onde:
            'No post: "publi", "parceria", link de afiliado. Posts quase iguais em várias contas ' +
            'na mesma hora indicam campanha.',
          evidencia: 'medido',
          fonte: 'Merkley, Pacelli, Piorkowski & Williams, Review of Accounting Studies (2024)',
        },
        {
          id: 'atencao-real',
          texto: 'O número de carteiras negociando acompanha o volume',
          porque:
            'Quem vende volume falso já espalha as operações em mais de 100 carteiras, justamente ' +
            'para passar neste teste.',
          onde: 'DexScreener: Volume, Txns e Makers na mesma janela de tempo.',
          evidencia: 'fraco',
          fonte: 'OpenLiquid (vendedor de volume, autopublicado) e Midsummer (USENIX Security 2026)',
        },
      ],
    },
    {
      id: 'tecnico',
      rotuloCurto: 'Pilar técnico',
      titulo: 'Pilar técnico — o contrato e as carteiras resistem?',
      descricao:
        'Primeiro a mecânica: o que o dono do token consegue fazer com você. Depois os sinais ' +
        'medidos, que pedem julgamento.',
      itens: [
        {
          id: 'extensoes',
          texto: 'Conferi as extensões: num token do pump.fun, só metadataPointer e tokenMetadata',
          porque:
            'Hoje todo token do pump.fun é Token-2022 com exatamente essas duas (24 de 24 em ' +
            '12/09/2026). Taxa de transferência, delegado permanente ou hook: não compre.',
          onde: 'Solscan: campo "Token Extensions" e aba Metadata. RugCheck também sinaliza.',
          evidencia: 'fato',
          fonte: 'Documentação do Token-2022 e checagem própria na blockchain (12/09/2026)',
        },
        {
          id: 'mint-authority',
          texto: 'A mint authority está revogada',
          porque:
            'Ativa, o dono pode criar tokens do nada e diluir quem comprou. No pump.fun vem ' +
            'sempre revogada: lá, não diferencia tokens.',
          onde: 'Solscan: menu "Authority" (mint, freeze e metadados), com "N/A" se revogada. RugCheck.',
          evidencia: 'fato',
          fonte: 'Documentação da Solana; guia oficial do Solscan (campo Authority)',
        },
        {
          id: 'freeze-authority',
          texto: 'A freeze authority está revogada',
          porque:
            'Ativa, o dono pode congelar sua conta, e você não consegue vender. No pump.fun, ' +
            'também vem revogada.',
          onde: 'Solscan: menu "Authority". RugCheck.',
          evidencia: 'fato',
          fonte: 'Documentação da Solana (freeze account)',
        },
        {
          id: 'metadata',
          texto: 'Nome e imagem do token não podem mais ser alterados',
          porque:
            'Metadata mutável deixa o token se passar por outro depois da sua compra. No ' +
            'pump.fun vem travada (11 de 11 checados).',
          onde:
            'Solscan, aba Metadata: campo "Mutable" num SPL clássico; update authority do ' +
            'tokenMetadata num Token-2022.',
          evidencia: 'fato',
          fonte: 'Documentação do Metaplex e do Token-2022; checagem própria (12/09/2026)',
        },
        {
          id: 'concentracao-real',
          texto: 'Olhei a concentração dos maiores holders somando as carteiras ligadas entre si',
          porque:
            'Somando as carteiras coordenadas, a fatia do top 10 sobe 24 pontos percentuais nos ' +
            'tokens de alto risco, contra 6 nos de baixo. A lista crua esconde isso.',
          onde: 'Bubblemaps (clusters) e RugCheck (Insiders). Solscan para a lista de holders.',
          evidencia: 'medido',
          fonte: 'MELT/MemeTrans, arXiv 2602.13480 (preprint); Mazorra et al., Mathematics (2022)',
        },
        {
          id: 'bundles',
          texto: 'Vi se houve compra coordenada no lançamento (bundle) e quanto essas carteiras ainda seguram',
          porque:
            'Bundle está entre os sinais que mais preveem alto risco. Importa quanto as carteiras ' +
            'AINDA seguram, não quanto compraram.',
          onde:
            'trench.bot (só pump.fun): "Current held %". RugCheck e as compras do primeiro bloco ' +
            'no Solscan.',
          evidencia: 'medido',
          fonte: 'MELT/MemeTrans (preprint); documentação do trench.bot',
        },
        {
          id: 'historico-criador',
          texto: 'Olhei o histórico da carteira do criador',
          porque:
            'Em Ethereum e BSC, 1% dos endereços cria de 20% a 25% dos tokens; criador com ' +
            'tokens mortos no histórico é sinal forte. Sobre o pump.fun, só há dados de empresas.',
          onde: 'Solscan: campo "Creator" e o histórico dessa carteira.',
          evidencia: 'medido',
          fonte: 'Cernera et al., USENIX Security 2023 (Ethereum e BSC)',
        },
        {
          id: 'dev-dump',
          texto: 'O criador não vendeu a própria compra nos primeiros minutos (dev dump)',
          porque:
            'No pump.fun o criador não consegue tirar a liquidez: o golpe que sobra é vender. É ' +
            'o sinal que mais importa lá, e o menos medido.',
          onde: 'Solscan: carteira do "Creator", em Token Balance Change e nas transações.',
          evidencia: 'fraco',
          fonte: 'Pesquisa 7: nenhum preditor revisado por pares isola esse sinal',
        },
        {
          id: 'lp-travada',
          texto: 'Li o "LP travado ou queimado" sem contar a favor do token',
          porque:
            'No pump.fun a pool pós-graduação é do protocolo e sempre aparece "ok". Fora dele, ' +
            'tokens com trava eram maliciosos na mesma proporção que o resto.',
          onde: 'RugCheck: "Lockers & LP".',
          evidencia: 'fraco',
          fonte: 'Mazorra et al., Mathematics (2022): 97,3% maliciosos com trava, contra 97,7% no conjunto',
        },
      ],
    },
    {
      id: 'decisao',
      rotuloCurto: 'Decisão',
      titulo: 'Decisão — você sabe o que vai fazer?',
      descricao:
        'Estes itens não falam do token: falam de você, e só dependem de você.',
      itens: [
        {
          id: 'ficha',
          texto: 'Escrevi a tese, a catálise com prazo e a invalidação (o que me provaria errado)',
          porque:
            'Escrever antes congela o que você pensou; depois do resultado, a memória reescreve ' +
            'a história.',
          onde: 'Ficha de tese do Módulo 4.',
          evidencia: 'rotina',
          fonte: 'Módulo 4; pesquisa 6 (viés de retrospectiva e intenções "se-então")',
        },
        {
          id: 'saidas',
          texto: 'Defini os alvos de saída antes de entrar',
          porque: 'Alvo definido com o gráfico piscando nasce contaminado por euforia ou medo.',
          onde: 'Escada de realização do Módulo 4.',
          evidencia: 'rotina',
          fonte: 'Módulo 4',
        },
        {
          id: 'pre-mortem',
          texto: 'Imaginei que a operação já deu errado e escrevi três razões',
          porque:
            'Imaginar o fracasso como já acontecido gera cerca de 30% mais razões do que ' +
            'perguntar "o que pode dar errado" — mais hipóteses, não necessariamente melhores.',
          onde: 'Campo da tese no diário do Módulo 7.',
          evidencia: 'rotina',
          fonte: 'Mitchell, Russo & Pennington, J. Behavioral Decision Making (1989) — experimento fora de trading',
        },
        {
          id: 'argumento-contrario',
          texto: 'Escrevi o melhor argumento de que estou errado',
          porque:
            'Em dois experimentos, pedir para "considerar o oposto" reduziu o viés a favor da ' +
            'própria opinião mais do que pedir para "ser imparcial".',
          onde: 'Ficha de tese do Módulo 4.',
          evidencia: 'rotina',
          fonte: 'Lord, Lepper & Preston, J. Personality and Social Psychology (1984) — experimento fora de trading',
        },
        {
          id: 'taxa-base',
          texto: 'Pensei em contagem: de cada 100 tokens como este, quantos ainda negociam amanhã?',
          porque:
            'Contagem, em vez de porcentagem, ajuda a pesar a taxa-base (com que frequência algo ' +
            'acontece no conjunto todo): num experimento, os acertos foram de 16% para 46%. No ' +
            'pump.fun, cerca de 69 em 100 tokens param de negociar no dia em que nascem.',
          onde: 'Mortalidade no Módulo 2; aba Prever o golpe do Módulo 6.',
          evidencia: 'rotina',
          fonte: 'Gigerenzer & Hoffrage, Psychological Review (1995); CoinGecko Research (68,67%)',
        },
        {
          id: 'tamanho',
          texto: 'O valor é um que eu posso perder inteiro',
          porque:
            'Na cauda pesada da memecoin, não há fórmula de tamanho ótimo; nem a de Kelly se ' +
            'aplica. O que sobra é sobreviver.',
          onde: 'Aba Tamanho do Módulo 7.',
          evidencia: 'rotina',
          fonte: 'Bamberg & Neuhierl, German Economic Review (2012); ruína do apostador (Feller)',
        },
        {
          id: 'stop',
          texto: 'O stop (saída automática) executa sozinho, sem depender de eu lembrar',
          porque:
            'Stop reduz o erro de segurar perdedoras; lembrete, não. Veja no Módulo 5 se a ordem ' +
            'da sua plataforma depende do servidor dela.',
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

  // O fluxograma "Do token visto à decisão de entrar". `titulo`, `relacao` e
  // `introducao` são o cabeçalho do card; o resto vai direto para criarFluxoLinear.
  fluxograma: {
    titulo: 'Do token visto à decisão de entrar',
    relacao: 'Relação: se isto, então aquilo',
    introducao:
      'O checklist em forma de caminho: primeiro os cortes mecânicos, depois a decisão.',
    legenda:
      'Vermelho: onde a checagem termina. Verde: o único caminho até a compra. As duas ' +
      'primeiras perguntas são mecânica do protocolo; a terceira pede julgamento, por isso vem ' +
      'depois.',

    // O mesmo caminho no formato do fluxo linear (criarFluxoLinear, em
    // src/components/fluxograma.js), com os textos do desenho "31 Checklist".
    // tom do desvio: 'nao' = caixa vermelha ("Não compro"); 'ajusta' = âmbar.
    inicio: 'Vi um token',
    passos: [
      {
        pergunta: 'O endereço veio da fonte oficial e bate com o X oficial?',
        evidencia: { rotulo: 'Fato do protocolo', tom: 'fato' },
        desvio: { rotulo: 'Não bate', texto: 'Não compro', tom: 'nao' },
        segue: { rotulo: 'Bate', texto: 'Nome e ticker não identificam nada. Sigo para o contrato.' },
      },
      {
        pergunta: 'Extensão fora do padrão, ou mint ou freeze authority ativa?',
        evidencia: { rotulo: 'Fato do protocolo', tom: 'fato' },
        desvio: { rotulo: 'Sim', texto: 'Não compro: é mecânica, não opinião.', tom: 'nao' },
        segue: { rotulo: 'Não', texto: 'Metadata travada também. Sigo para as carteiras.' },
      },
      {
        pergunta: 'Carteiras ligadas concentram muito, ou o criador já vendeu?',
        evidencia: { rotulo: 'Sinal medido — pede julgamento', tom: 'medido' },
        desvio: { rotulo: 'Sim', texto: 'Não compro', tom: 'nao' },
        segue: {
          rotulo: 'Não',
          texto: 'É julgamento: não há limiar publicado para "muito".',
        },
      },
      {
        pergunta: 'Tese, catálise e invalidação estão escritas?',
        evidencia: { rotulo: 'Rotina', tom: 'rotina' },
        desvio: { rotulo: 'Não', texto: 'Não compro: sem isso é aposta.', tom: 'nao' },
        segue: { rotulo: 'Sim', texto: 'Com prazo e o que me provaria errado. Sigo para o tamanho.' },
      },
      {
        pergunta: 'É um valor que posso perder inteiro, com saída que executa sozinha?',
        evidencia: { rotulo: 'Rotina', tom: 'rotina' },
        desvio: { rotulo: 'Não', texto: 'Ajusto tamanho e saída e volto a esta pergunta.', tom: 'ajusta' },
        segue: { rotulo: 'Sim', texto: 'Tamanho e saída definidos antes de entrar.' },
      },
      {
        pergunta: 'Registrei a operação no diário antes de clicar?',
        evidencia: { rotulo: 'Rotina', tom: 'rotina' },
        desvio: {
          rotulo: 'Não',
          texto: 'Registro primeiro: a revisão precisa saber o que você pensou.',
          tom: 'ajusta',
        },
        segue: { rotulo: 'Sim', texto: 'Tese, tamanho e saída no papel, antes do resultado.' },
      },
    ],
    fim: 'Registro no diário e só então entro',
    fechamento:
      'Passar por tudo não aprova o token: só quer dizer que ele não mostrou os sinais visíveis.',
    // A versão em texto do caminho não fica mais aqui: o componente gera a
    // alternativa para leitor de tela a partir dos próprios passos acima.
  },

  // Sinais que ficaram de fora do checklist, e por quê.
  tituloDeFora: 'Sinais que ficaram de fora, e por quê',
  sinaisDeFora: [
    {
      titulo: 'A nota do RugCheck',
      texto:
        'A fórmula e os limiares da nota não são publicados: leia os riscos um a um, não o número.',
    },
    {
      titulo: 'O projeto ter site e redes sociais',
      texto:
        'Fácil de montar, e nenhuma pesquisa mediu isso como preditor de golpe. Golpe bem-feito ' +
        'tem site bonito.',
    },
    {
      titulo: '"Muitos holders"',
      texto:
        'Bots inflam a contagem. A medição é indireta: poucos holders se associa a alto risco; ' +
        'muitos não prova nada.',
    },
    {
      titulo: 'Detector automático de rug',
      texto:
        'No teste do PumpFun, o melhor modelo publicado teve F1 de 0,79; chutar "tudo é rug" dá ' +
        '0,90. Serve, no máximo, de pré-filtro.',
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

  // ---------------------------------------------------------------------------
  // Vídeos — cada um vira o botão "Assistir a videoaula" dentro do card da seção
  // que ele reforça (o campo `secao` diz qual). O player só aparece no clique.
  // PENDENTE: a `transcricao`; enquanto ela não existe, o aviso padrão de
  // src/data/videoaulas.js entra embaixo do player.
  // ---------------------------------------------------------------------------
  videos: {
    'checklist-antes-de-comprar': {
      titulo: 'O Checklist antes de comprar, item por item',
      secao: 'checklist',
      src: 'assets/videos/checklist-antes-de-comprar.mp4',
      duracao: '9:06',
      descricao: 'Os dois pilares, item por item, com a força de cada evidência.',
      transcricao: [],
    },
  },
};
