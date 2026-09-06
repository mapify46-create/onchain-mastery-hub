// cenarios.js — catálogo de cenários do simulador do Módulo 4.
//
// Aqui só tem DADOS: nenhuma lógica, nenhum HTML. Para acrescentar um cenário,
// copie um bloco abaixo e mude os textos — o simulador se adapta sozinho.
//
// IMPORTANTE: os cenários são situações FICTÍCIAS, montadas para treino. Os números
// que aparecem neles (percentuais, quantidade de holders) são inventados de propósito
// para o exercício e não descrevem nenhum token real.
//
// Formato de cada cenário:
//   id           identificador estável (vira a chave do histórico no localStorage)
//   numero       posição na sequência de estudo
//   titulo       título curto do cenário
//   tags         etiquetas de contexto (chain, fase do ciclo, pilar)
//   posicao      'nenhuma' = você ainda não comprou | 'aberta' = você já tem o token
//   descricao    a situação em si, em 2 a 4 frases
//   sinais       o que está na sua tela naquele momento (lista curta)
//   risco        risco da SITUAÇÃO ('baixo' | 'medio' | 'alto') — o badge do card
//   opcoes       feedback de cada escolha. Cada opção tem:
//                  rotulo     (opcional) troca o texto do botão neste cenário
//                  qualidade  'boa' | 'aceitavel' | 'ruim' | 'naoSeAplica' -> vira pontuação
//                  risco      risco DA DECISÃO ('baixo'=verde, 'medio'=amarelo, 'alto'=vermelho)
//                  feedback   por que essa escolha custa caro ou se sustenta
//   proximoPasso o próximo passo técnico, mostrado depois de qualquer escolha
//   ferramentas  onde executar esse passo
//   licao        a regra que fica do cenário

// As quatro opções fixas do simulador, na ordem em que aparecem.
export const OPCOES = [
  {
    id: 'entrar',
    rotulo: 'Entrar',
    descricao: 'Comprar agora (ou aumentar a posição que já existe).',
  },
  {
    id: 'esperar',
    rotulo: 'Esperar',
    descricao: 'Não agir agora e seguir observando, com um gatilho definido.',
  },
  {
    id: 'ignorar',
    rotulo: 'Ignorar',
    descricao: 'Descartar de vez este token e ir para a próxima oportunidade.',
  },
  {
    id: 'parcial',
    rotulo: 'Realizar parcial',
    descricao: 'Vender uma parte da posição que você já tem, tirando risco da mesa.',
  },
];

// Quanto vale cada qualidade de decisão no resumo de disciplina.
// 'naoSeAplica' não é "errado" no mérito: é escolher uma ação impossível na situação
// (realizar parcial sem ter posição). Vale 0 e é contado à parte no resumo.
export const QUALIDADES = {
  boa: { pontos: 2, rotulo: 'Decisão sólida' },
  aceitavel: { pontos: 1, rotulo: 'Defensável' },
  ruim: { pontos: 0, rotulo: 'Decisão cara' },
  naoSeAplica: { pontos: 0, rotulo: 'Não se aplica aqui' },
};

// Faixas do resumo final, da melhor para a pior (o simulador pega a primeira que couber).
export const FAIXAS_DE_DISCIPLINA = [
  {
    minimo: 85,
    titulo: 'Disciplina consistente',
    texto:
      'Você escolheu conforme a regra, não conforme a vontade. Repita o simulador daqui a ' +
      'algumas semanas: disciplina não é traço de personalidade, é hábito que enferruja.',
  },
  {
    minimo: 60,
    titulo: 'No caminho, com vazamentos',
    texto:
      'A base está certa, mas alguns cenários ainda pegaram você no impulso. Releia os ' +
      'feedbacks marcados como "Decisão cara" na lista abaixo: é ali que o capital vaza.',
  },
  {
    minimo: 35,
    titulo: 'O impulso ainda manda',
    texto:
      'Em boa parte dos cenários a escolha foi agir, não checar. Esse é exatamente o padrão ' +
      'descrito no Módulo 2: a decisão sai antes da checagem. Vale refazer depois de reler a ' +
      'seção "Tese vs. catálise".',
  },
  {
    minimo: 0,
    titulo: 'Alto risco de queimar capital',
    texto:
      'Quase toda escolha foi entrar ou segurar, inclusive nos cenários com sinal técnico ' +
      'vermelho na cara. Vale revisar o Módulo 1 (segurança) e este módulo inteiro antes de ' +
      'operar com dinheiro de verdade.',
  },
];

export const cenarios = [
  // ---------------------------------------------------------------------------
  {
    id: 'lancamento-sem-catalise',
    numero: 1,
    titulo: 'Token lançado há 10 minutos, sem catálise',
    tags: ['Solana', 'Lançamento', 'Sem tese'],
    posicao: 'nenhuma',
    descricao:
      'Um token acabou de ser criado num launchpad. O gráfico é uma linha vertical de dez ' +
      'minutos, o chat está eufórico e ninguém sabe dizer por que este token subiria — só ' +
      'que "ainda está cedo". Você não tem posição.',
    sinais: [
      'Idade: 10 minutos, ainda na bonding curve',
      'Nenhum evento concreto marcado para acontecer',
      'Liquidez fina: qualquer venda média derruba o preço',
    ],
    risco: 'alto',
    opcoes: {
      entrar: {
        qualidade: 'ruim',
        risco: 'alto',
        feedback:
          '"Ainda está cedo" não é tese nem catálise: é torcida. Sem um evento concreto que ' +
          'traga compradores novos, você está pagando para descobrir o que acontece — e a ' +
          'maior parte dos lançamentos morre nas primeiras horas, sem nunca graduar.',
      },
      esperar: {
        qualidade: 'boa',
        risco: 'baixo',
        feedback:
          'Esperar custa zero e compra as duas informações que faltam: a checagem técnica ' +
          '(LP, mint e freeze authority, concentração) e a catálise. Se o token subir sem ' +
          'você, você perdeu uma alta; se for um rug, você não perdeu nada.',
      },
      ignorar: {
        qualidade: 'boa',
        risco: 'baixo',
        feedback:
          'Ignorar é decisão, não covardia. Aparecem milhares de tokens por dia; a vantagem ' +
          'não vem de olhar todos, vem de descartar rápido os que não têm tese.',
      },
      parcial: {
        qualidade: 'naoSeAplica',
        risco: 'medio',
        feedback:
          'Não há o que realizar: você não tem posição neste token. Vale notar o reflexo — ' +
          'aqui a decisão real é só entre entrar, esperar e ignorar.',
      },
    },
    proximoPasso:
      'Antes de qualquer coisa, cole o endereço do token no RugCheck e confira três campos: a ' +
      'LP está bloqueada ou queimada? a mint authority foi revogada? a freeze authority foi ' +
      'revogada? Depois, no Solscan, veja a concentração dos maiores holders.',
    ferramentas: ['RugCheck', 'Solscan', 'DexScreener'],
    licao: 'Sem catálise escrita antes da compra, não é operação: é aposta.',
  },

  // ---------------------------------------------------------------------------
  {
    id: 'figura-publica-no-x',
    numero: 2,
    titulo: 'Uma figura pública interagiu com o projeto no X',
    tags: ['Pilar social', 'Catálise duvidosa'],
    posicao: 'nenhuma',
    descricao:
      'Uma conta grande curtiu e respondeu ao post do projeto. Em minutos aparecem três ' +
      'contratos diferentes sendo divulgados como "o oficial", e o preço de todos eles sobe ' +
      'ao mesmo tempo. Você não tem posição.',
    sinais: [
      'Interação social real, mas sem anúncio oficial do projeto',
      'Pelo menos três endereços disputando o mesmo nome',
      'Volume subindo em todos eles ao mesmo tempo',
    ],
    risco: 'medio',
    opcoes: {
      entrar: {
        qualidade: 'ruim',
        risco: 'alto',
        feedback:
          'Este é o cenário clássico de token impostor: você compra o contrato errado e fica ' +
          'com um token sem liquidez nenhuma. E mesmo acertando o contrato, atenção de ' +
          'celebridade costuma ser catálise curta — os casos TRUMP e LIBRA, em 2025, ficaram ' +
          'conhecidos justamente pelo colapso rápido depois do pico.',
      },
      esperar: {
        qualidade: 'boa',
        risco: 'baixo',
        feedback:
          'Certo: primeiro confirmar qual endereço é oficial, direto no perfil ou no site do ' +
          'projeto, e conferir esse endereço no explorer. Enquanto houver dúvida sobre o ' +
          'contrato, não existe operação possível — existe roleta.',
      },
      ignorar: {
        qualidade: 'aceitavel',
        risco: 'baixo',
        feedback:
          'Defensável: você abre mão de uma possível alta, mas evita o risco de contrato ' +
          'falso. Só cuidado para "ignorar" não virar desculpa de não estudar o caso — ' +
          'entender por que subiu é o que treina o pilar social.',
      },
      parcial: {
        qualidade: 'naoSeAplica',
        risco: 'medio',
        feedback:
          'Você ainda não comprou, então não há parte a realizar. A pergunta aqui é de ' +
          'entrada, não de saída.',
      },
    },
    proximoPasso:
      'Copie o endereço do contrato da fonte oficial (perfil verificado ou site do projeto) e ' +
      'abra no explorer da chain. Compare com o endereço que está circulando no X, confira a ' +
      'data de criação e olhe os maiores holders antes de decidir.',
    ferramentas: ['Solscan / BscScan / Etherscan', 'DexScreener', 'Bubblemaps'],
    licao:
      'Interação de figura pública é sinal social, não prova de contrato. Endereço oficial se ' +
      'confirma na fonte, nunca no meio da timeline.',
  },

  // ---------------------------------------------------------------------------
  {
    id: 'graduacao-para-dex',
    numero: 3,
    titulo: 'O token graduou da bonding curve para a DEX',
    tags: ['Solana', 'Graduação', 'Posição aberta'],
    posicao: 'aberta',
    descricao:
      'Você entrou ainda na bonding curve, com uma posição pequena, e está no lucro. O token ' +
      'atingiu o limiar de graduação (no Pump.fun, por volta de 85 SOL / ~US$ 69 mil) e a ' +
      'liquidez migrou para a DEX. O livro ficou mais fundo: agora dá para vender um valor ' +
      'maior sem derrubar o preço.',
    sinais: [
      'Liquidez migrada para a DEX, profundidade bem maior que na curva',
      'Volume alto nas primeiras horas pós-graduação',
      'Compradores da curva com lucro grande e, agora, liquidez para sair',
    ],
    risco: 'medio',
    opcoes: {
      entrar: {
        rotulo: 'Entrar / aumentar',
        qualidade: 'aceitavel',
        risco: 'medio',
        feedback:
          'Defensável se — e só se — a tese continua a mesma e existe uma catálise nova depois ' +
          'da graduação. O detalhe que morde: a graduação é exatamente o momento em que quem ' +
          'comprou na curva finalmente tem liquidez para vender em cima de você.',
      },
      esperar: {
        qualidade: 'aceitavel',
        risco: 'medio',
        feedback:
          'Observar as primeiras horas para ver se a liquidez segura é razoável. Mas note: ' +
          'você já tem posição e lucro, e "esperar" sem alvo escrito é como quase todo lucro ' +
          'de memecoin evapora — devagar, sem nenhuma decisão consciente no meio.',
      },
      ignorar: {
        qualidade: 'ruim',
        risco: 'alto',
        feedback:
          'Ignorar uma posição aberta não é neutralidade, é decidir por omissão. Você continua ' +
          '100% exposto, só que sem olhar. É assim que um lucro de 3x vira prejuízo.',
      },
      parcial: {
        qualidade: 'boa',
        risco: 'baixo',
        feedback:
          'Realizar parte quando a liquidez está mais profunda encaixa a decisão no mercado: ' +
          'você vende com menos slippage justamente porque o token graduou. Tirar o valor ' +
          'investido da mesa faz o resto da posição correr sem custo emocional.',
      },
    },
    proximoPasso:
      'No DexScreener, confirme o novo par: liquidez total, volume das últimas horas e o ' +
      'perfil das transações. No RugCheck, veja se a LP do novo pool está bloqueada ou ' +
      'queimada — graduar não garante isso sozinho.',
    ferramentas: ['DexScreener', 'RugCheck'],
    licao: 'Realização se faz onde existe liquidez para vender, não onde o preço é bonito.',
  },

  // ---------------------------------------------------------------------------
  {
    id: 'concentracao-de-holders',
    numero: 4,
    titulo: 'Top 10 carteiras detêm 60% do supply',
    tags: ['Pilar técnico', 'Concentração'],
    posicao: 'nenhuma',
    descricao:
      'O gráfico está bonito e a narrativa é boa, mas a aba de holders mostra dez carteiras ' +
      'com 60% de tudo. O mapa de bolhas mostra várias delas ligadas entre si por ' +
      'transferências, o que sugere um mesmo dono usando carteiras diferentes.',
    sinais: [
      'Top 10 holders com ~60% do supply',
      'Clusters conectados no mapa de bolhas',
      'Parte dessas carteiras foi financiada pelo mesmo endereço no lançamento',
    ],
    risco: 'alto',
    opcoes: {
      entrar: {
        qualidade: 'ruim',
        risco: 'alto',
        feedback:
          'Com essa concentração, um único dono decide o seu resultado. Não é preciso má-fé ' +
          'nem plano: basta uma carteira grande realizar lucro para o preço cair mais rápido ' +
          'do que qualquer saída sua conseguiria acompanhar.',
      },
      esperar: {
        qualidade: 'aceitavel',
        risco: 'medio',
        feedback:
          'Esperar só ajuda se você souber o que está esperando. Concentração é problema ' +
          'estrutural: não some com o tempo, só muda se essas carteiras distribuírem — o que ' +
          'normalmente acontece vendendo no mercado, ou seja, derrubando o preço.',
      },
      ignorar: {
        qualidade: 'boa',
        risco: 'baixo',
        feedback:
          'Distribuição ruim é um dos poucos critérios que funcionam como corte seco: elimina ' +
          'candidatos rápido, sem discussão, e sobra tempo para os que passam.',
      },
      parcial: {
        qualidade: 'naoSeAplica',
        risco: 'medio',
        feedback:
          'Não há posição para realizar. Aqui o que está em jogo é a decisão de entrada, e o ' +
          'dado de concentração já responde a ela.',
      },
    },
    proximoPasso:
      'Abra o Bubblemaps para ver se as carteiras grandes formam clusters (carteiras ligadas ' +
      'entre si). No explorer, confira quando cada uma recebeu o token: se todas foram ' +
      'financiadas pelo mesmo endereço no lançamento, é um dono só fingindo ser vários.',
    ferramentas: ['Bubblemaps', 'Solscan / BscScan', 'RugCheck'],
    licao:
      'Quem controla o supply controla o seu resultado. Concentração alta é veto, não detalhe.',
  },

  // ---------------------------------------------------------------------------
  {
    id: 'lucro-de-300-desacelerando',
    numero: 5,
    titulo: 'Você está +300% e a alta desacelerou',
    tags: ['Take profit', 'Posição aberta'],
    posicao: 'aberta',
    descricao:
      'A posição está com lucro de 300%. Nas últimas horas o volume caiu, os posts novos ' +
      'rarearam e o preço passou a andar de lado. A parte da sua cabeça que quer um 10x está ' +
      'falando mais alto do que o alvo que você escreveu antes de entrar.',
    sinais: [
      'Posição em +300%, nenhuma realização feita até agora',
      'Volume caindo e menções sociais desacelerando',
      'Você tinha escrito "vender parte no 2x" — e não vendeu',
    ],
    risco: 'medio',
    opcoes: {
      entrar: {
        rotulo: 'Entrar / aumentar',
        qualidade: 'ruim',
        risco: 'alto',
        feedback:
          'Aumentar quando a atenção já desacelera é comprar caro o que você comprou barato, ' +
          'piorando o preço médio bem no fim do movimento. Se a tese justificasse aumento, o ' +
          'momento teria sido antes — não depois do 3x.',
      },
      esperar: {
        qualidade: 'aceitavel',
        risco: 'medio',
        feedback:
          'Só é defensável se existir um alvo escrito ainda não atingido e um gatilho de saída ' +
          'definido. Se "esperar" quer dizer "ver o que acontece", é o roteiro padrão de ' +
          'devolver o lucro inteiro.',
      },
      ignorar: {
        qualidade: 'ruim',
        risco: 'alto',
        feedback:
          'Fechar a tela com posição aberta e lucro na mão é a versão passiva do erro de ' +
          'segurar demais. A posição continua correndo risco integral, e você abriu mão até de ' +
          'decidir.',
      },
      parcial: {
        qualidade: 'boa',
        risco: 'baixo',
        feedback:
          'Realizar parte tira o risco da mesa: recuperando o valor investido, o que sobra ' +
          'corre por conta do lucro. É a decisão que transforma "estou ganhando na tela" em ' +
          'dinheiro que existe de verdade.',
      },
    },
    proximoPasso:
      'Escreva agora a escada de realização, em números: quanto vender no alvo atual, quanto ' +
      'no próximo e qual queda faz você sair do restante. Execute a primeira faixa hoje e ' +
      'guarde o texto — no próximo trade ele já vira a sua regra pronta.',
    ferramentas: ['Seu caderno de trades', 'DexScreener'],
    licao: 'Lucro na tela não é lucro. Realização parcial é o que separa os dois.',
  },

  // ---------------------------------------------------------------------------
  {
    id: 'assinatura-para-airdrop',
    numero: 6,
    titulo: 'Um site pede assinatura "para reivindicar o airdrop"',
    tags: ['Segurança', 'Drainer'],
    posicao: 'nenhuma',
    descricao:
      'Chegou no seu Discord um link de airdrop com o visual de um projeto conhecido. O site ' +
      'pede para conectar a carteira e assinar uma mensagem "para verificar elegibilidade". O ' +
      'domínio parece o oficial, com uma letra trocada, e um cronômetro marca 9 minutos.',
    sinais: [
      'Domínio parecido com o oficial, mas não idêntico',
      'Pedido de assinatura antes de qualquer verificação',
      'Cronômetro e urgência artificial na tela',
    ],
    risco: 'alto',
    opcoes: {
      entrar: {
        rotulo: 'Entrar / assinar',
        qualidade: 'ruim',
        risco: 'alto',
        feedback:
          'Essa é a mecânica de um drainer: a "assinatura de verificação" costuma ser uma ' +
          'autorização de gasto. Você não aprova uma transferência visível — você entrega ' +
          'permissão para esvaziarem a carteira depois, quando a aba já estiver fechada.',
      },
      esperar: {
        qualidade: 'aceitavel',
        risco: 'medio',
        feedback:
          'Melhor do que assinar, mas indeciso demais para o caso. Não existe informação nova ' +
          'capaz de salvar esse link: domínio trocado somado a urgência artificial já fecha o ' +
          'diagnóstico. A resposta é fechar a aba.',
      },
      ignorar: {
        qualidade: 'boa',
        risco: 'baixo',
        feedback:
          'Exato. Airdrop legítimo não deixa de existir porque você demorou 20 minutos para ' +
          'conferir o domínio na fonte oficial. Pressa na tela é ferramenta de quem está ' +
          'atacando você.',
      },
      parcial: {
        qualidade: 'naoSeAplica',
        risco: 'medio',
        feedback:
          'Não há posição nem token: o que está em jogo é o acesso à carteira inteira, não o ' +
          'tamanho de uma posição.',
      },
    },
    proximoPasso:
      'Abra o Revoke.cash com a sua carteira e revise as autorizações ativas, revogando o que ' +
      'não reconhecer. Confira o link do airdrop só a partir do site ou perfil oficial do ' +
      'projeto — e lembre: seed phrase não se digita em site nenhum, em hipótese alguma.',
    ferramentas: ['Revoke.cash', 'Explorer da chain'],
    licao:
      'Urgência é a ferramenta favorita do golpe. Nenhuma oportunidade real expira em 9 minutos.',
  },

  // ---------------------------------------------------------------------------
  {
    id: 'freeze-authority-ativa',
    numero: 7,
    titulo: 'A freeze authority ainda está ativa no token',
    tags: ['Solana', 'Honeypot', 'Posição aberta'],
    posicao: 'aberta',
    descricao:
      'Você comprou uma posição pequena rápido demais e só depois foi checar. O RugCheck ' +
      'mostra a freeze authority ainda ativa: o criador pode congelar contas do token, e você ' +
      'pode simplesmente não conseguir vender. O preço está subindo, o que deixa tudo mais ' +
      'tentador e nada mais seguro.',
    sinais: [
      'Freeze authority NÃO revogada',
      'Mint authority também ativa (o supply ainda pode aumentar)',
      'Posição pequena aberta, no lucro neste momento',
    ],
    risco: 'alto',
    opcoes: {
      entrar: {
        rotulo: 'Entrar / aumentar',
        qualidade: 'ruim',
        risco: 'alto',
        feedback:
          'Aumentar posição num token que pode congelar a sua conta é dobrar a aposta no único ' +
          'risco que anula todos os outros: não adianta o preço subir se a venda não passa. ' +
          'Com a mint authority ativa, ainda dá para inflar o supply por cima disso.',
      },
      esperar: {
        qualidade: 'ruim',
        risco: 'alto',
        feedback:
          'Esperar aqui é apostar que o criador não vai usar um poder que ele decidiu manter. ' +
          'Vale lembrar o dado técnico: na Solana, DEXs como a Raydium exigem freeze authority ' +
          'revogada para criar o pool — manter a authority ativa é escolha, não descuido.',
      },
      ignorar: {
        qualidade: 'ruim',
        risco: 'alto',
        feedback:
          'Você tem posição aberta: ignorar não tira você do risco, só tira a informação. Se a ' +
          'conta for congelada depois, a decisão terá sido tomada por outra pessoa.',
      },
      parcial: {
        qualidade: 'boa',
        risco: 'medio',
        feedback:
          'Tentar vender uma fração é a checagem prática de honeypot: se a venda pequena ' +
          'passa, a saída existe agora — e reduzir exposição enquanto ela existe é a resposta ' +
          'certa a um risco que você já sabe que está lá. Se a venda falhar, você descobriu ' +
          'pelo menor custo possível.',
      },
    },
    proximoPasso:
      'Confirme mint e freeze authority no Solscan (aba do token) e no RugCheck. Com a freeze ' +
      'authority ativa, trate o token como potencialmente sem saída e teste uma venda pequena ' +
      'antes de qualquer outra decisão.',
    ferramentas: ['RugCheck', 'Solscan'],
    licao:
      'A checagem vem antes da compra. Feita depois, ela vira só a notícia de um risco que você ' +
      'já está correndo.',
  },

  // ---------------------------------------------------------------------------
  {
    id: 'volume-alto-poucos-holders',
    numero: 8,
    titulo: 'Volume altíssimo, mas quase nenhum holder',
    tags: ['Pilar técnico', 'Wash trading'],
    posicao: 'nenhuma',
    descricao:
      'O token aparece no topo das listas de volume do dia, mas o explorer mostra pouquíssimas ' +
      'carteiras detentoras. Olhando as transações, os mesmos endereços aparecem comprando e ' +
      'vendendo entre si, em intervalos regulares.',
    sinais: [
      'Volume entre os maiores do dia',
      'Número de holders muito baixo para esse volume',
      'Transações se repetindo entre os mesmos endereços',
    ],
    risco: 'medio',
    opcoes: {
      entrar: {
        qualidade: 'ruim',
        risco: 'alto',
        feedback:
          'Volume é a métrica mais fácil de fabricar: basta o mesmo grupo negociar entre si ' +
          'para aparecer no topo das listas e atrair quem filtra por volume. Você entraria por ' +
          'causa de um número montado justamente para atrair você.',
      },
      esperar: {
        qualidade: 'boa',
        risco: 'baixo',
        feedback:
          'Certo: o teste é cruzar volume com holders e com carteiras únicas. Se o volume for ' +
          'real, ele traz gente nova — o número de holders sobe junto. Se não subir, o volume ' +
          'não representa demanda.',
      },
      ignorar: {
        qualidade: 'aceitavel',
        risco: 'baixo',
        feedback:
          'Não perde nada. Só vale fazer a checagem antes de descartar: essa comparação entre ' +
          'volume e holders é rápida e treina o olho para os próximos casos.',
      },
      parcial: {
        qualidade: 'naoSeAplica',
        risco: 'medio',
        feedback:
          'Sem posição aberta, não há parte a realizar. A decisão em jogo é de entrada.',
      },
    },
    proximoPasso:
      'No explorer, compare três números: volume em 24h, quantidade de holders e quantidade de ' +
      'carteiras únicas nas transações recentes. Volume grande com poucas carteiras únicas é ' +
      'sinal de negociação circular, não de demanda.',
    ferramentas: ['Solscan / BscScan', 'DexScreener', 'GMGN'],
    licao: 'Volume se fabrica; holders novos, não. Cruze sempre os dois.',
  },

  // ---------------------------------------------------------------------------
  {
    id: 'perdeu-a-entrada-5x',
    numero: 9,
    titulo: 'Você perdeu a entrada e o token já fez 5x',
    tags: ['Psicologia', 'FOMO'],
    posicao: 'nenhuma',
    descricao:
      'Você viu o token cedo, achou arriscado e não entrou. Ele fez 5x. Agora a timeline está ' +
      'cheia de prints de lucro e a sensação é de estar ficando para trás. A voz na sua cabeça ' +
      'diz que "ainda dá tempo".',
    sinais: [
      'Alta de 5x já realizada, movimento maduro',
      'Prints de lucro por toda parte (você só vê os ganhadores)',
      'Nenhuma catálise nova depois da alta',
    ],
    risco: 'alto',
    opcoes: {
      entrar: {
        qualidade: 'ruim',
        risco: 'alto',
        feedback:
          'É o erro mais caro e mais comum do mercado: comprar o topo dos outros. Você entraria ' +
          'sem catálise nova, movido por arrependimento — e os prints que está vendo são viés ' +
          'de sobrevivência em ação: ninguém posta print de prejuízo.',
      },
      esperar: {
        qualidade: 'boa',
        risco: 'baixo',
        feedback:
          'Certo, desde que "esperar" signifique algo concreto: uma retração até uma região ' +
          'definida por você, ou uma catálise nova. Sem isso, esperar vira só um FOMO com ' +
          'atraso.',
      },
      ignorar: {
        qualidade: 'boa',
        risco: 'baixo',
        feedback:
          'Oportunidade perdida não é prejuízo. Você não perdeu dinheiro nenhum nesse ' +
          'movimento; só não ganhou — e essas duas coisas se confundem exatamente quando o ' +
          'cansaço e a inveja estão altos.',
      },
      parcial: {
        qualidade: 'naoSeAplica',
        risco: 'medio',
        feedback:
          'Não existe posição: o 5x aconteceu sem você. Nada a realizar, e nada a recuperar.',
      },
    },
    proximoPasso:
      'Escreva no seu caderno de trades qual teria sido a tese e a catálise deste token, e o ' +
      'que faltava para você entrar com regra. O objetivo não é se punir: é ter o critério ' +
      'pronto no próximo caso parecido, quando ainda estiver cedo.',
    ferramentas: ['Seu caderno de trades'],
    licao: 'Perder uma alta custa zero. Entrar no topo por causa dela custa capital.',
  },

  // ---------------------------------------------------------------------------
  {
    id: 'call-pago-nao-declarado',
    numero: 10,
    titulo: 'Um influenciador fez "call" pago sem declarar',
    tags: ['Pilar social', 'Conflito de interesse'],
    posicao: 'nenhuma',
    descricao:
      'Um perfil que você acompanha publicou um token com entusiasmo incomum e sem nenhuma ' +
      'menção a publicidade. Nos comentários, alguém aponta que a carteira ligada ao perfil ' +
      'recebeu tokens antes do post. O preço já subiu bastante desde a publicação.',
    sinais: [
      'Nenhuma declaração de publicidade no post',
      'Indício de recebimento de tokens antes da divulgação',
      'Alta forte logo depois do post',
    ],
    risco: 'medio',
    opcoes: {
      entrar: {
        qualidade: 'ruim',
        risco: 'alto',
        feedback:
          'Se quem divulgou recebeu tokens antes, alguém precisa comprar para essa pessoa ' +
          'realizar. Entrar depois do post é se candidatar a ser essa saída — o post não é a ' +
          'análise, é a distribuição.',
      },
      esperar: {
        qualidade: 'boa',
        risco: 'baixo',
        feedback:
          'Certo: ceticismo primeiro, checagem depois. O conteúdo pode até apontar um token ' +
          'real, mas o incentivo de quem publicou está do outro lado da mesa — e isso muda o ' +
          'peso que a informação merece.',
      },
      ignorar: {
        qualidade: 'boa',
        risco: 'baixo',
        feedback:
          'Descartar fontes com conflito de interesse não declarado economiza um tempo enorme. ' +
          'Um perfil que esconde publicidade uma vez vai esconder de novo.',
      },
      parcial: {
        qualidade: 'naoSeAplica',
        risco: 'medio',
        feedback:
          'Sem posição, não há realização possível. Aqui a pergunta é se a fonte merece ' +
          'crédito.',
      },
    },
    proximoPasso:
      'Ignore por um momento quem falou e olhe só o token: LP bloqueada ou queimada, ' +
      'authorities revogadas, concentração de holders, liquidez frente ao market cap. Se ele ' +
      'não passar nessas checagens, quem divulgou deixa de importar.',
    ferramentas: ['RugCheck', 'Bubblemaps', 'DexScreener'],
    licao:
      'Pergunte sempre quem ganha se você comprar. Se a resposta for "quem me contou", recue.',
  },

  // ---------------------------------------------------------------------------
  {
    id: 'lp-nao-bloqueada',
    numero: 11,
    titulo: 'A liquidez não está bloqueada nem queimada',
    tags: ['Pilar técnico', 'Rug pull'],
    posicao: 'nenhuma',
    descricao:
      'O token passa nas outras checagens: authorities revogadas, distribuição razoável, ' +
      'narrativa com tração. Mas a LP não está bloqueada nem queimada, e os tokens de ' +
      'liquidez estão numa carteira ligada ao criador — que pode retirar a liquidez a qualquer ' +
      'momento.',
    sinais: [
      'LP sem lock e sem burn',
      'Tokens de LP concentrados numa carteira ligada ao dev',
      'Resto das checagens técnicas em ordem',
    ],
    risco: 'alto',
    opcoes: {
      entrar: {
        qualidade: 'ruim',
        risco: 'alto',
        feedback:
          'Com a LP livre, o criador pode remover a liquidez e o preço vira pó no mesmo bloco ' +
          '— o hard rug clássico. Não existe saída que proteja disso: quando a liquidez sai, ' +
          'não há mais para quem vender.',
      },
      esperar: {
        qualidade: 'aceitavel',
        risco: 'medio',
        feedback:
          'Faz sentido se você espera um evento específico: o dev bloquear ou queimar a LP, de ' +
          'forma verificável. Sem esse gatilho, "esperar" só adia a mesma decisão com a mesma ' +
          'informação.',
      },
      ignorar: {
        qualidade: 'boa',
        risco: 'baixo',
        feedback:
          'LP livre é um dos vetos mais objetivos que existem: um único campo decide, sem ' +
          'depender de interpretação. Descartar rápido aqui é o que libera tempo para os casos ' +
          'que merecem análise.',
      },
      parcial: {
        qualidade: 'naoSeAplica',
        risco: 'medio',
        feedback:
          'Sem posição não há o que realizar — e vale notar que, se a liquidez for retirada, ' +
          'nem quem tem posição consegue realizar.',
      },
    },
    proximoPasso:
      'No RugCheck, veja o status da LP (bloqueada, queimada ou livre) e quem detém os tokens ' +
      'de liquidez. Se houver bloqueio, confira o prazo: um lock que vence semana que vem é ' +
      'quase o mesmo que não ter lock.',
    ferramentas: ['RugCheck', 'DexScreener', 'Explorer da chain'],
    licao: 'Todas as outras checagens perdem valor se a liquidez pode sair a qualquer momento.',
  },

  // ---------------------------------------------------------------------------
  {
    id: 'consolidacao-com-comunidade',
    numero: 12,
    titulo: 'Consolidação há dias, com comunidade ativa',
    tags: ['Acumulação', 'Sem catálise'],
    posicao: 'nenhuma',
    descricao:
      'O preço anda de lado há vários dias, sem picos e sem colapso. A comunidade continua ' +
      'ativa, o número de holders cresce devagar e as checagens técnicas estão em ordem. Só ' +
      'que não há nenhum evento marcado no horizonte.',
    sinais: [
      'Preço lateral, volatilidade baixa para o padrão do setor',
      'Holders crescendo devagar, sem entrada de multidão',
      'Checagens em ordem: LP travada, authorities revogadas',
      'Nenhuma catálise concreta anunciada',
    ],
    risco: 'medio',
    opcoes: {
      entrar: {
        qualidade: 'aceitavel',
        risco: 'medio',
        feedback:
          'Defensável, e bem melhor do que entrar em euforia: aqui o risco é de tempo, não de ' +
          'topo. Mas continua faltando metade da regra — sem catálise, você depende de que ' +
          'apareça uma. Se entrar, entre sabendo que está comprando uma tese ainda sem gatilho.',
      },
      esperar: {
        qualidade: 'boa',
        risco: 'baixo',
        feedback:
          'A resposta com melhor relação custo-benefício: defina qual catálise você está ' +
          'esperando (listagem, campanha, migração, evento do projeto) e o que faria você ' +
          'desistir. Aí a espera tem começo, meio e fim — não é indecisão.',
      },
      ignorar: {
        qualidade: 'aceitavel',
        risco: 'baixo',
        feedback:
          'Não custa capital, mas talvez custe treino: acompanhar sem posição um token que ' +
          'passa nas checagens é o exercício mais barato que existe.',
      },
      parcial: {
        qualidade: 'naoSeAplica',
        risco: 'medio',
        feedback:
          'Não há posição aberta. O que existe aqui é uma tese esperando gatilho, não um lucro ' +
          'esperando realização.',
      },
    },
    proximoPasso:
      'Escreva, em uma frase, qual evento específico faria este token valorizar e até quando ' +
      'você dá para ele acontecer. Configure um alerta de preço e de volume e revise a tese na ' +
      'data marcada — se a catálise não vier, a decisão já está tomada.',
    ferramentas: ['DexScreener (alertas)', 'Seu caderno de trades'],
    licao: 'Espera com gatilho escrito é estratégia. Espera sem gatilho é torcida devagar.',
  },
];
