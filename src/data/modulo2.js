// modulo2.js — conteúdo do Módulo 2 (psicologia das memecoins, tipos de token, 4 fases).
// Aqui só tem DADOS: nenhuma lógica, nenhum HTML. Para mudar um texto, mude aqui —
// a interface se adapta sozinha. As fontes de cada caso real ficam no próprio caso.

export const modulo2 = {
  id: 'modulo-2',
  titulo: 'Psicologia das memecoins & economia da atenção',
  resumo:
    'Memecoin não tem produto nem receita: o preço é feito de atenção. Aqui você vê como ' +
    'essa atenção nasce e some, e quais vieses do seu cérebro fazem você comprar no topo e ' +
    'segurar no fundo.',

  objetivos: [
    'Entender por que o preço de uma memecoin depende de atenção, e não de fundamento.',
    'Reconhecer em você os vieses que fazem comprar no topo e segurar no prejuízo.',
    'Classificar tipos de token para saber o que você está olhando antes de agir.',
    'Reconhecer as 4 fases da vida de uma moeda e onde mora o risco em cada uma.',
  ],

  // Mapa do módulo ("O módulo inteiro numa olhada", no topo da página): o centro
  // e as folhas curtas de cada aba, copiados do desenho (M2 Desktop, renderVals ›
  // ABAS). `aba` é o id da aba na view. O ramo do Quiz não entra aqui: a view
  // conta as perguntas de `quiz` e escreve "N perguntas".
  mapa: {
    titulo: 'Psicologia',
    subtitulo: 'O preço é feito de olhos',
    ramos: [
      { aba: 'visao-geral', folhas: ['preço feito de olhos', 'dopamina', 'o antídoto'] },
      { aba: 'vieses', folhas: ['os 5 vieses', 'estou em FOMO?', 'post de hype'] },
      { aba: 'tipos', folhas: ['5 categorias', '10 tipos'] },
      { aba: 'casos', folhas: ['TRUMP', 'MELANIA', 'LIBRA'] },
      { aba: 'fases', folhas: ['o que checar em cada uma', 'o que "vai a zero" quer dizer'] },
    ],
  },

  // ---------------------------------------------------------------------------
  // Seções de texto (aba "Visão geral")
  // ---------------------------------------------------------------------------
  secoes: [
    {
      id: 'atencao',
      titulo: 'Economia da atenção: o preço é feito de olhos',
      emUmaFrase:
        'Existe preço com chão embaixo e preço sem chão nenhum. Essa diferença decide tudo o ' +
        'que vem depois.',
      paragrafos: [
        'Token é qualquer moeda criada numa blockchain, o registro público do Módulo 1. ' +
          'Memecoin é um token sem produto, receita nem promessa de utilidade: só uma piada, ' +
          'imagem ou nome que muita gente levou a sério ao mesmo tempo. O único combustível do ' +
          'preço é quanta gente olha: é a "economia da atenção".',
        'Compare com uma ação de empresa: se o preço dela cai demais, fábrica, dinheiro em ' +
          'caixa e lucro todo mês não impedem a queda, mas criam um chão. Na memecoin, embaixo ' +
          'do preço só tem atenção, que é escassa e muda de lugar. Por isso a pergunta muda: ' +
          'numa ação que cai, "o que aconteceu com a empresa?"; numa memecoin, "para onde foi ' +
          'a atenção?". Quase sempre, para um token lançado ontem, com uma piada mais nova. ' +
          'Você não compra um pedaço de negócio: aposta que mais gente vai olhar depois de você.',
        'Na tela, a atenção aparece em três números. Volume: quanto dinheiro trocou de mãos ' +
          'no token num período. Holders ("quem segura", em inglês): as carteiras que têm o ' +
          'token. Menções: quantas vezes o token foi citado nas redes. Os três subindo juntos: ' +
          'a atenção está chegando. Preço alto com menções caindo: ela já foi embora, e o ' +
          'preço só não percebeu.',
      ],
      quadro: [
        {
          rotulo: 'Market cap',
          texto:
            'Capitalização de mercado: preço de uma unidade vezes quantas unidades existem. ' +
            'É por ele que se compara o tamanho das moedas. Preço baixo não é token pequeno: ' +
            'centavos vezes bilhões de unidades dá market cap grande.',
        },
        {
          rotulo: 'O "x": 2x, 5x, 10x',
          texto:
            'Multiplicação, não porcentagem: 10x é dez vezes o preço de partida; 2x, o dobro. ' +
            'Serve para uma alta que já aconteceu e para um alvo de venda combinado antes.',
        },
        {
          rotulo: 'Pump, dump e pump-and-dump',
          texto:
            'Pump é a alta rápida puxada por atenção. Dump é a venda em massa logo depois. ' +
            'Pump-and-dump é o par feito de propósito: sobe com barulho e vende para quem ' +
            'chegou pelo barulho.',
          destaque: true,
        },
      ],
      exemplo: {
        titulo: 'Um dia inteiro de uma memecoin',
        passos: [
          'De manhã quase ninguém olha: volume baixo, poucas menções.',
          'Uma conta grande posta. Em horas o preço faz 10x: cada real de quem entrou cedo ' +
            'virou dez.',
          'Quem chegou pelo post já comprou. Não sobrou ninguém de fora para comprar.',
          'A atenção vai para o próximo token. Sem comprador novo, cada venda derruba o preço, ' +
            'que volta ao ponto de partida no mesmo dia.',
          'Sem nenhuma má notícia: bastou a atenção mudar de lugar.',
        ],
      },
      paragrafosFinais: [
        'O erro que isso evita: procurar motivo de fundamento para uma queda sem fundamento. ' +
          'Quem pensa "o projeto é bom, o mercado é que não entendeu" segura um token que já ' +
          'perdeu a única coisa que o sustentava. Nada aqui é recomendação de compra ou de ' +
          'venda.',
      ],
    },
    {
      id: 'dopamina',
      titulo: 'Dopamina e reforço intermitente',
      emUmaFrase:
        'Ganhar às vezes, e não sempre, é o que mais prende: o mecanismo das máquinas de ' +
        'aposta.',
      paragrafos: [
        'Dopamina é uma substância que o cérebro libera diante da chance de recompensa — ' +
          'quando você acha que pode ganhar, não só quando ganha. Por isso o número subindo na ' +
          'tela já dá a sensação, antes de qualquer dinheiro entrar.',
        'O cérebro repete o que veio antes da recompensa: aqui, abrir o gráfico e clicar em ' +
          'comprar. Recompensa certa formaria um hábito fraco, que um dia ruim desmancha. ' +
          'Recompensa às vezes, sem hora marcada, forma um hábito muito mais forte: é o reforço ' +
          'intermitente, a lógica das máquinas de aposta, que pagam pouco e de vez em quando.',
        'Duas palavras que voltam sempre. Posição é o dinheiro que você tem parado num token ' +
          '(abrir posição é comprar; fechar, vender), e o tamanho da posição é quanto do seu ' +
          'dinheiro está ali. Operação é o ciclo completo, da compra à venda.',
        'O estrago aparece como entusiasmo, não como perda. O sinal é a rotina mudando sem ' +
          'você decidir: aplicativo aberto em horários novos, operação em dia sem nada para ' +
          'operar, preço checado cada vez mais. Nenhum passo parece errado sozinho.',
      ],
      exemplo: {
        titulo: 'Como o laço aperta, passo a passo',
        passos: [
          'Você acerta algumas operações seguidas, sem motivo que saiba explicar por escrito.',
          'Passa a operar mais vezes: operar virou a parte boa do dia.',
          'Com posições maiores: o tamanho antigo parece tímido perto do que você "podia ter ' +
            'ganhado".',
          'E com menos checagem: nas últimas vezes deu certo sem checar.',
          'O ganho de ontem financia o erro de amanhã: o dinheiro dos acertos paga a operação ' +
            'grande e sem checagem que devolve tudo.',
        ],
      },
      paragrafosFinais: [
        'O erro que isso evita é ler sequência boa como habilidade: num mercado que se mexe ' +
          'tanto, acertos seguidos acontecem com quem sabe e com quem não sabe, e a dopamina é ' +
          'a mesma. Troque "estou ganhando?" por "eu decidi isto, ou fui puxado até aqui?". Só ' +
          'a decisão escrita, assunto da próxima seção, responde com honestidade.',
      ],
      detalhe: {
        titulo: 'de onde vem essa ideia',
        paragrafos: [
          'Esse padrão aparece em literatura de divulgação e em artigos revisados por pares ' +
            '(conferidos por outros pesquisadores) sobre jogo e investimento especulativo, no ' +
            'PMC/NCBI, acervo público de artigos científicos dos EUA.',
          'Aqui ele serve para você reconhecer o mecanismo. Não é material clínico nem ' +
            'diagnóstico, e não substitui ajuda profissional.',
        ],
      },
    },
    {
      id: 'antidoto',
      titulo: 'O antídoto não é força de vontade',
      emUmaFrase:
        'Na hora H você não vira outra pessoa. Dá para chegar nela com a decisão já tomada.',
      paragrafos: [
        'Viés cognitivo é um atalho que o cérebro usa para decidir rápido. Não é burrice, é ' +
          'economia; o problema é que cada atalho erra sempre para o mesmo lado, e o mercado de ' +
          'memecoins vive desse lado. Erro previsível tem antídoto.',
        'Esse antídoto não é força de vontade: ela acaba justo quando o gráfico pisca, o grupo ' +
          'grita e o preço sobe sem você. É resolver a dieta na frente do bolo. O que funciona ' +
          'é mudar a hora da decisão: decidir antes, frio, deixar escrito e, no impulso, só ' +
          'executar. Regra de cabeça é negociável; escrita, é o seu "eu calmo" mandando no "eu ' +
          'empolgado".',
        'Escrever antes quer dizer as cinco coisas da figura. Tese: a frase que explica por ' +
          'que este token subiria. Catálise: o evento concreto, com data ou prazo, que faria ' +
          'isso acontecer; sem ela, é aposta. Alvos de realização: os preços em que você já ' +
          'combinou vender um pedaço (realizar é transformar parte do lucro de tela em ' +
          'dinheiro de verdade). Tempo de espera: a pausa entre "quero comprar" e "comprei", ' +
          'para o impulso passar. Teto de perda: quanto você aceita perder por operação e por ' +
          'dia, sem "só mais uma".',
      ],
      listaTitulo: 'Na prática:',
      lista: [
        'Escreva a tese e a catálise antes de comprar (Módulo 4). Sem catálise clara, é aposta.',
        'Defina os alvos de realização antes de entrar, não depois de já estar no lucro.',
        'Imponha um tempo de espera (5, 10, 30 minutos) entre "quero comprar" e "comprei".',
        'Estabeleça um teto de perda por operação e por dia. Quando bater, pare de verdade.',
        'Nunca opere com dinheiro que faz falta. A maioria dos tokens vai a zero.',
      ],
      exemplo: {
        titulo: 'A mesma tarde, com e sem regra escrita',
        passos: [
          'Sem regra: o preço sobe, você compra em segundos e só depois pensa em quanto vender ' +
            'e quando sair.',
          'Com regra: tese e catálise escritas antes do clique. Sem catálise, a operação acaba ' +
            'ali, de graça.',
          'Com regra: alvos marcados antes (uma parte no 2x, outra no 5x) e teto de perda ' +
            'anotado.',
          'Com regra: passam os 10 minutos de espera. Se a tese continua de pé, você entra, ' +
            'com tamanho reduzido.',
          'No fim do mês, suas perdas ficaram do tamanho que você escolheu, não do que o susto ' +
            'escolheu.',
        ],
      },
      paragrafosFinais: [
        'O erro que isso evita é achar que entender já protege. Você entende com o "eu calmo" ' +
          'e perde com o "eu empolgado"; só a regra escrita atravessa os dois.',
        'A regra é sua, do seu dinheiro e do seu prazo; nada aqui é recomendação de compra ou ' +
          'de venda. Só o último item da figura não admite ajuste: nunca opere com dinheiro ' +
          'que faz falta.',
      ],
    },
  ],

  // ---------------------------------------------------------------------------
  // Os visuais das três seções da "Visão geral" (desenho M2 Desktop). No
  // desenho, cada seção troca os parágrafos por um visual + uma legenda; os
  // textos desses visuais moram aqui. Os parágrafos acima continuam no arquivo.
  // ---------------------------------------------------------------------------

  // "Economia da atenção": ação com empresa (tem chão) × memecoin (sem chão), e
  // embaixo a sequência da atenção. A 1ª caixa da sequência sai em ciano e a
  // última em vermelho, como no desenho.
  figuraDaAtencao: {
    comChao: {
      rotulo: 'Ação com empresa',
      texto: 'Produto, receita e caixa embaixo do preço seguram um chão.',
      legenda: 'O bloco roxo é o chão: lucro e caixa.',
    },
    semChao: {
      rotulo: 'Memecoin',
      texto: 'Sem produto, receita nem utilidade: embaixo do preço só tem atenção.',
      legenda: 'Tracejado: não existe chão nenhum.',
    },
    sequencia: [
      'A atenção cresce',
      'O preço cresce junto',
      'A multidão acha o próximo token',
      'A atenção vai embora, e o preço atrás',
    ],
    legenda:
      'Atenção é escassa e muda de lugar. Por isso o mesmo token pode subir 10x em horas e ' +
      'voltar ao ponto de partida no mesmo dia — não é anomalia, é o normal desse mercado.',
    // Alternativa em texto da figura inteira (leitor de tela).
    descricao:
      'Ação com empresa: produto, receita e caixa embaixo do preço seguram um chão. ' +
      'Memecoin: sem produto, receita nem utilidade, só atenção embaixo do preço, e nenhum ' +
      'chão. A atenção cresce, o preço cresce junto, a multidão acha o próximo token, a ' +
      'atenção vai embora e o preço vai atrás.',
  },

  // "Dopamina e reforço intermitente": o laço em círculo. As 5 etapas curtas
  // resumem os passos de `secoes[1].exemplo` ("Você acerta algumas operações. /
  // Passa a operar mais vezes. / Com posições maiores. / E com menos checagem.")
  // e os parágrafos da seção (a alta na tela libera dopamina).
  laco: {
    frase: 'O laço que se fecha: o ganho de ontem financia o erro de amanhã',
    etapas: ['Alta na tela', 'Dopamina', 'Opera mais vezes', 'Posições maiores', 'Menos checagem'],
    centro: 'e o laço aperta',
    legenda:
      'Cada alta na tela libera dopamina. Como a recompensa vem às vezes, e não sempre, o ' +
      'hábito fica mais forte: é o "reforço intermitente".',
    descricao:
      '1 Alta na tela → 2 Dopamina → 3 Opera mais vezes → 4 Posições maiores → 5 Menos ' +
      'checagem → volta a 1, e o laço aperta. O ganho de ontem financia o erro de amanhã.',
  },

  // "O antídoto não é força de vontade": você calmo × você empolgado. A lista
  // do "calmo" é a `lista` da seção "antidoto" (os 5 itens de "Na prática").
  calmoOuEmpolgado: {
    calmo: { rotulo: 'Você calmo, antes' },
    empolgado: {
      rotulo: 'Você empolgado, com o gráfico piscando',
      texto:
        'Ninguém vence um viés cognitivo no impulso. Viés cognitivo é um atalho do cérebro ' +
        'que erra sempre para o mesmo lado.',
      fecho: 'A regra escrita é o seu "eu calmo" mandando no seu "eu empolgado".',
    },
  },

  // ---------------------------------------------------------------------------
  // Vieses (aba "Vieses") — viram a tabela "o que você pensa → o que acontece
  // → o que fazer": gatilho = o que você pensa, custo = o que acontece,
  // antídoto = o que fazer.
  // ---------------------------------------------------------------------------
  vieses: [
    {
      id: 'fomo',
      nome: 'FOMO',
      subtitulo: 'Fear of missing out — medo de ficar de fora',
      gatilho:
        'O gráfico sobe sem você e parece a última chance da sua vida. Você compra correndo, ' +
        'sem checar contrato, liquidez nem nada.',
      quandoAparece: 'Logo depois de um pump que você assistiu de fora.',
      antidoto:
        'Perder oportunidade é o custo normal de operar com regra: existe token novo toda ' +
        'hora. Espere 10 minutos; se a tese ainda fizer sentido por escrito, aí sim considere ' +
        'entrar, com tamanho reduzido.',
      custo: 'É o mecanismo número 1 de compra no topo.',
    },
    {
      id: 'prova-social',
      nome: 'Prova social',
      subtitulo: 'Se todo mundo está comprando, deve estar certo',
      gatilho:
        'Milhares de posts, um grupo eufórico e vários influenciadores repetindo o mesmo ' +
        'token. Parece validação, e é só volume de vozes.',
      quandoAparece: 'Quando a timeline e os grupos são inundados pelo mesmo token.',
      antidoto:
        'Separe barulho de evidência: volume de posts não é liquidez, nem holders, nem ' +
        'contrato auditável. Antes de confiar num post, cheque liquidez, permissões do ' +
        'contrato e concentração dos maiores holders.',
      custo: 'Prova social é fabricável: robôs e posts pagos custam pouco.',
    },
    {
      id: 'custo-afundado',
      nome: 'Custo afundado',
      subtitulo: 'Sunk cost — "já perdi tanto que agora tenho que esperar voltar"',
      gatilho:
        'A posição está −70%. Vender parece assumir a perda, então você segura. O dinheiro ' +
        'já gasto vira argumento para gastar mais tempo (e, muitas vezes, mais dinheiro).',
      quandoAparece: 'Na fase de Degradação, quando a atenção já migrou para outro token.',
      antidoto:
        'O dinheiro perdido não volta por você segurar. A pergunta não é "quanto já perdi?", ' +
        'é "com o preço de hoje, eu compraria este token agora?". Se não, a posição não ' +
        'deveria existir.',
      custo: 'É o que transforma uma perda de 30% numa perda de 100%.',
    },
    {
      id: 'excesso-confianca',
      nome: 'Excesso de confiança',
      subtitulo: 'Três acertos seguidos e você acha que pegou o jeito',
      gatilho:
        'A sequência boa vira explicação ("eu tenho olho"): a posição dobra, a checagem ' +
        'encolhe e o horário de operar vai madrugada adentro.',
      quandoAparece: 'Depois da sua melhor semana, nunca depois da pior.',
      antidoto:
        'Registre todas as operações, não só as boas. Num mercado que oscila tanto, sequência ' +
        'de acertos é esperada mesmo sem habilidade nenhuma. Mantenha o tamanho da posição ' +
        'fixo por regra, não por humor.',
      custo:
        'A operação que zera a conta costuma ser a maior, feita logo depois da melhor sequência.',
    },
    {
      id: 'disposicao',
      nome: 'Efeito disposição',
      subtitulo: 'Vender rápido o que sobe, segurar para sempre o que cai',
      gatilho:
        'Você realiza +20% "para garantir" e segura −60% "para não perder". No fim do mês, ' +
        'os ganhos são pequenos e as perdas são inteiras.',
      quandoAparece: 'Em toda posição aberta, o tempo todo.',
      antidoto:
        'Inverta isso por regra: realização parcial em etapas (parte no 2x, parte no 5x) e ' +
        'limite de perda definido antes da entrada. Nunca decida a saída no calor do gráfico.',
      custo: 'Explica por que muita gente acerta mais do que erra e mesmo assim perde dinheiro.',
    },
  ],

  // Título, ideia central e cabeçalho da tabela dos vieses. Cada coluna mostra
  // um campo de `vieses`: nome (+ subtítulo e "Aparece …"), gatilho, custo e
  // antídoto. `rotuloDaRolagem` é o nome da caixa que rola para o lado no
  // celular (a tabela tem no mínimo 720px).
  tabelaDosVieses: {
    titulo: 'Os cinco vieses: o que você pensa → o que acontece → o que fazer',
    emUmaFrase:
      'São cinco, cada um numa hora: dois fazem você entrar, dois fazem você sair na hora ' +
      'errada, e um aumenta a aposta sem você perceber.',
    paragrafos: [
      'Repare na última coluna: todo antídoto é decidido antes, nunca no calor do gráfico.',
      'FOMO é a sigla do inglês fear of missing out, o medo de ficar de fora. Na prova ' +
        'social, mil pessoas repetindo o mesmo ticker parece confirmação. Ticker é o apelido ' +
        'curto do token (três ou cinco letras com um cifrão na frente), e qualquer um pode ' +
        'lançar outro token com o mesmo. Único é o endereço do contrato, às vezes escrito CA ' +
        '(de contract address): é ele que você confere, nunca o nome nem a imagem.',
      'O que se vê num post é barato de fabricar: bot é conta automatizada, e call pago é ' +
        'post de divulgação comprado. Evidência é o quadro abaixo, que se vê na página do ' +
        'token, nunca num post.',
      'Custo afundado traduz sunk cost: com a posição em −70%, você não segura o token, e ' +
        'sim a sensação de ainda não ter errado. O efeito disposição, gêmeo dele, parece ' +
        'prudência e é o contrário: corta os ganhos cedo e deixa as perdas correrem.',
      'No excesso de confiança, lembre: em mercado de altíssima volatilidade (volatilidade é ' +
        'o tamanho das oscilações de preço), uma sequência de acertos é estatisticamente ' +
        'esperada mesmo sem habilidade.',
    ],
    quadro: [
      {
        rotulo: 'Liquidez e LP',
        texto:
          'Quanto dinheiro há no pool do token (o reservatório do Módulo 1) para absorver ' +
          'compras e vendas. Com pouca, a sua própria venda derruba o preço. LP é a sigla de ' +
          'liquidity pool, o depósito que segura essa liquidez.',
      },
      {
        rotulo: 'Holders',
        texto:
          'As carteiras que têm o token. Importa quanto os maiores detêm juntos: se poucas ' +
          'seguram muito, decidem sozinhas o preço.',
      },
      {
        rotulo: 'Authorities',
        texto:
          'As permissões que sobraram no contrato: criar novas unidades e congelar as que ' +
          'estão na sua carteira. Revogar é abrir mão delas em definitivo.',
      },
      {
        rotulo: 'O que nada disso é',
        texto:
          'Volume de posts não é liquidez, não é número de holders e não é contrato ' +
          'auditável. Um post pode te dar entusiasmo, mas nenhum dos três.',
        destaque: true,
      },
    ],
    exemplo: {
      titulo: 'O mês de quem acertou mais do que errou e mesmo assim perdeu',
      passos: [
        'Duas posições sobem 20%. Você realiza as duas "para garantir".',
        'Uma terceira cai 60%. Você segura "para não perder".',
        'Ela chega a −70%: "já perdi tanto que agora tenho que esperar voltar".',
        'A atenção migrou e não volta. A perda de 30% que dava para cortar no começo virou ' +
          '100%.',
        'Você acertou mais do que errou, e o mês fechou no vermelho: ganhos pequenos, perda ' +
          'inteira.',
      ],
    },
    paragrafosFinais: [
      'O erro que a tabela evita é tratar essas frases como opinião sua: são atalhos que ' +
        'aparecem na cabeça de todo mundo, nas mesmas horas. Ouvir "é a última chance" ou ' +
        '"todo mundo está comprando" é sinal de viés agindo, não de pensamento.',
      'E o antídoto precisa estar escrito antes: na hora em que você mais precisa dele, já ' +
        'não dá para escrever.',
    ],
    detalhe: {
      titulo: 'os nomes em inglês, para procurar depois',
      paragrafos: [
        'Para ler sobre cada um fora daqui: FOMO (fear of missing out), social proof (prova ' +
          'social), sunk cost (custo afundado), overconfidence (excesso de confiança) e ' +
          'disposition effect (efeito disposição).',
      ],
    },
    colunas: {
      nome: 'Viés',
      gatilho: 'O que você pensa',
      custo: 'O que acontece',
      antidoto: 'O que fazer',
    },
    aparece: 'Aparece',
    rotuloDaRolagem: 'Os cinco vieses (role na horizontal se preciso)',
  },

  // "Estou em FOMO?" — o fluxograma do desenho. Cada passo é uma pergunta com
  // duas saídas: `desvio` (a que reprova, em vermelho) e `segue` (a que passa,
  // em verde). A view desenha no traço do desenho (M2 Desktop).
  // Os textos vêm do antídoto do FOMO e da seção "O antídoto não é força de
  // vontade" (tempo de espera, tese e catálise escritas, alvos e limite de perda).
  fluxoFomo: {
    titulo: 'Estou em FOMO?',
    emUmaFrase:
      'O gatilho do FOMO é o preço já ter subido. Se a vontade de comprar nasceu do gráfico, ' +
      'ela não é tese.',
    paragrafos: [
      'Use o fluxograma na hora em que a vontade aparece: com o preço subindo, você ainda ' +
        'consegue responder sim ou não a três perguntas curtas.',
      'A primeira é a mais importante. Numa decisão com tese, você primeiro acha um motivo e ' +
        'só depois olha o preço; no FOMO, o preço é o motivo. Se a operação só tinha pressa, ' +
        'esperar 10 minutos não tira de você nada que valesse a pena.',
      'Na segunda, "de antes" quer dizer antes de o preço subir, e não escritas agora para ' +
        'justificar a vontade de agora: é o ponto mais fácil e mais caro de burlar.',
      'Na terceira, definir a saída depois de já estar no lucro não vale: aí quem define é a ' +
        'euforia. E passar nas três não autoriza a compra. Falta a checagem técnica do token ' +
        '(contrato, liquidez, concentração de holders), assunto do Módulo 3 e do Checklist.',
    ],
    exemplo: {
      titulo: 'Os 10 minutos, na prática',
      passos: [
        'É noite. Um token que você nunca viu aparece na timeline com o gráfico em pé.',
        'A vontade de comprar agora nasceu do gráfico: é FOMO.',
        'Em vez de clicar, você marca 10 minutos e tenta escrever tese e catálise.',
        'Não achou um evento concreto que faria o preço subir? A operação morre ali, sem ' +
          'custar nada.',
        'Achou? Ainda faltam os alvos e o limite de perda. E a entrada é com tamanho reduzido.',
      ],
    },
    paragrafosFinais: [
      'O erro que esse filtro evita é confundir oportunidade perdida com prejuízo. Perder ' +
        'uma alta não tira dinheiro da sua conta; entrar sem tese tira. A aba "Casos reais" ' +
        'mostra três oportunidades que "não dava para perder" e duraram horas.',
    ],
    inicio: 'Quero comprar agora',
    passos: [
      {
        pergunta: 'A vontade nasceu do gráfico já ter subido?',
        desvio: { rotulo: 'Sim', texto: 'É FOMO. Espere 10 minutos antes de qualquer clique.' },
        segue: { rotulo: 'Não', texto: 'Siga para a próxima pergunta.' },
      },
      {
        pergunta: 'Existe tese e catálise escritas, de antes?',
        desvio: { rotulo: 'Não', texto: 'Sem catálise clara, é aposta. Não entra.' },
        segue: { rotulo: 'Sim', texto: 'Siga para a próxima pergunta.' },
      },
      {
        pergunta: 'Os alvos de realização e o limite de perda já estão definidos?',
        desvio: { rotulo: 'Não', texto: 'Defina antes de entrar, nunca depois de já estar no lucro.' },
        segue: { rotulo: 'Sim', texto: 'Checagem técnica feita? (Módulo 3 e Checklist)' },
      },
    ],
    fim: 'Passou nas três: siga a regra escrita, com tamanho reduzido.',
    legenda:
      'Aceite que perder oportunidade é o custo normal de operar com regra — e que existe ' +
      'token novo toda hora.',
    // Alternativa em texto do fluxograma inteiro (leitor de tela).
    descricao:
      'Quero comprar agora. A vontade nasceu do gráfico já ter subido? Se sim, é FOMO: ' +
      'espere 10 minutos. Se não: existe tese e catálise escritas, de antes? Se não, é ' +
      'aposta: não entra. Se sim: os alvos de realização e o limite de perda já estão ' +
      'definidos? Se não, defina antes de entrar. Passou nas três: siga a regra escrita, com ' +
      'tamanho reduzido.',
  },

  // ---------------------------------------------------------------------------
  // Mapa de tipos de token (aba "Tipos de token") — filtrável por categoria
  // ---------------------------------------------------------------------------

  // O card "O mapa dos tipos de token" (desenho M2 Desktop). O centro do mapa
  // escreve "5 categorias, 10 tipos" contando as listas abaixo; "Nenhum tipo é
  // risco baixo." só aparece enquanto nenhum tipo tiver risco "baixo".
  mapaDosTipos: {
    titulo: 'O mapa dos tipos de token',
    emUmaFrase:
      'Saber o tipo muda a pergunta que você faz. Cada um tem um motor de atenção ' +
      'diferente, e 8 dos 10 são risco alto.',
    paragrafos: [
      'Cada tipo tem um motor de atenção, o motivo para as pessoas olharem, e cada motor ' +
        'quebra de um jeito: token de notícia morre quando a notícia envelhece; meme antigo ' +
        'aguenta mais, porque não depende de cripto para existir.',
      'Alguns nomes do mapa pedem tradução. Agente de IA: um programa com personalidade fixa ' +
        'que publica sozinho nas redes. CTO (community takeover, tomada pela comunidade): o ' +
        'criador abandona o projeto, voluntários assumem as redes e o site, e o token continua ' +
        'o mesmo. Launchpad: o site onde qualquer pessoa cria e lança um token em minutos.',
      'E três palavras dos alertas. Dev: o desenvolvedor, quem criou o token. Supply: o total ' +
        'de unidades do token; importa quanto está na mão de poucos, que podem vender tudo de ' +
        'uma vez. Rug pull, ou só rug ("puxar o tapete"): quem está por dentro tira a liquidez ' +
        'ou despeja o supply de uma vez, e o preço vai a quase nada em segundos.',
      'Nenhum tipo é risco baixo. Mesmo os dois médios têm motivo limitado: comunidade real ' +
        'reduz o risco de rug (há gente com nome e reputação envolvida), mas não sustenta ' +
        'preço; e ser antigo não impede um meme de cair 90%.',
    ],
    exemplo: {
      titulo: 'O teste dos 30 segundos, e os dois extremos do mapa',
      passos: [
        'Um token se diz projeto de IA; o site fala em modelos, agentes e roadmap (a lista de ' +
          'entregas prometidas, por trimestre).',
        'Abra o produto e tente usar. Se em 30 segundos não conseguiu, o produto é o token.',
        'Procure o repositório público, onde o código fica aberto para leitura. Sem ele, não ' +
          'há como conferir se existe tecnologia.',
        'No outro extremo, o meme do Shiba Inu é de 2013, e o token DOGE nasceu no mesmo ano.',
        'No meio fica a maioria, como a WIF: um cão de gorro sem história fora de cripto, com ' +
          'dezenas de cópias de mesmo nome e mesma arte em horas.',
      ],
    },
    paragrafosFinais: [
      'O erro que o mapa evita é perguntar "isso é bom?" para todo token: nada aqui tem ' +
        'fundamento para ser bom. A pergunta útil é "de onde vem a atenção deste, e o que a ' +
        'faria acabar?".',
      'E uma regra vale para os dez: confira o contrato, nunca o nome nem a imagem. ' +
        'Impersonação (usar nome, rosto ou marca de alguém sem autorização) é o padrão: sem ' +
        'anúncio no canal oficial da pessoa, assuma que é falso. Os nomes citados são exemplo ' +
        'de categoria, não indicação.',
    ],
    detalhe: {
      titulo: 'duas ressalvas que não cabem no mapa',
      paragrafos: [
        'No CTO, um projeto "adotado" não apaga o que ficou na carteira de quem saiu.',
        'Agentes de IA são categoria consolidada desde 2024, mas os nomes mudam a cada ciclo; ' +
          'por isso o mapa descreve o tipo, sem exemplos que envelhecem.',
      ],
    },
    centro: 'Tipos de token',
    rotuloDaRolagem: 'Mapa dos tipos de token por categoria (role na horizontal se preciso)',
    legenda: { alto: 'risco alto', medio: 'risco médio', semBaixo: 'Nenhum tipo é risco baixo.' },
    instrucao: 'Clique numa categoria do mapa para filtrar; clique de novo para ver todas.',
    // Os dois micro-rótulos de dentro do card de cada tipo (o desenho os
    // escreve assim; quem desenha o card põe em maiúsculas pelo CSS).
    rotulos: { comoReconhecer: 'Como reconhecer', alerta: 'Alerta' },
  },

  categoriasDeToken: [
    { id: 'ia', nome: 'IA / agentes de IA' },
    { id: 'comunidade', nome: 'Comunidade / CTO' },
    { id: 'cultural', nome: 'Memes orgânicos e culturais' },
    { id: 'narrativa', nome: 'Narrativas virais' },
    { id: 'figura-publica', nome: 'Figuras públicas' },
  ],

  tiposDeToken: [
    {
      id: 'agente-ia',
      nome: 'Token de agente de IA',
      categoria: 'ia',
      descricao:
        'Um bot com personalidade própria posta sozinho nas redes e tem um token associado, ' +
        'que vale enquanto o personagem chamar atenção.',
      comoReconhecer:
        'Conta automatizada com identidade fixa, publicando sem parar, e um contrato ' +
        'divulgado na bio.',
      exemplos: ['Categoria consolidada desde 2024; os nomes específicos mudam a cada ciclo'],
      risco: 'alto',
      alerta:
        'Automatizar posts é barato e não exige tecnologia própria. "Ter um agente" não é ' +
        'diferencial técnico nem garantia de nada.',
    },
    {
      id: 'narrativa-ia',
      nome: 'Token de narrativa "IA" sem produto',
      categoria: 'ia',
      descricao:
        'Usa "IA" no nome, na arte e na divulgação, sem agente, modelo ou produto por trás. ' +
        'A IA é o marketing.',
      comoReconhecer:
        'Site com jargão genérico, sem repositório público, sem demonstração funcionando e ' +
        'com roadmap de trimestres vagos.',
      exemplos: [],
      risco: 'alto',
      alerta: 'Se você não consegue usar o produto em 30 segundos, o produto é o token.',
    },
    {
      id: 'cto',
      nome: 'CTO (community takeover)',
      categoria: 'comunidade',
      descricao:
        'O criador abandona o projeto e a comunidade assume: novas redes, novo site, novos ' +
        'organizadores. O token é o mesmo; muda quem cuida dele.',
      comoReconhecer:
        'Anúncio público do takeover, contas oficiais transferidas e dev original sumido ' +
        'ou tendo renunciado ao controle.',
      exemplos: [],
      risco: 'alto',
      alerta:
        'Nem todo CTO vinga, e o supply do dev original continua existindo: cheque se ele já ' +
        'vendeu ou ainda pode vender.',
    },
    {
      id: 'comunidade-nativa',
      nome: 'Token de comunidade nativa',
      categoria: 'comunidade',
      descricao:
        'Nasce de um grupo que já existia antes do token: um servidor de Discord, um fórum, ' +
        'uma cena local. A comunidade veio junto, não foi comprada.',
      comoReconhecer:
        'Histórico de conversa anterior ao lançamento, membros que se conhecem pelo nome e ' +
        'piadas internas antigas.',
      exemplos: [],
      risco: 'medio',
      alerta:
        'Comunidade real reduz o risco de rug, mas não sustenta preço sozinha: atenção de ' +
        'fora ainda precisa chegar.',
    },
    {
      id: 'meme-longa-duracao',
      nome: 'Meme cultural de longa duração',
      categoria: 'cultural',
      descricao:
        'O meme já era popular muito antes do token. O token é a expressão financeira de ' +
        'algo que a cultura carrega há anos.',
      comoReconhecer:
        'O meme vive fora de cripto: quem nunca ouviu falar de blockchain reconhece a imagem.',
      exemplos: ['DOGE — o meme do Shiba Inu é de 2013 e o token nasceu no mesmo ano'],
      risco: 'medio',
      alerta:
        'Ser antigo não impede quedas de 90%. Só torna o desaparecimento total um pouco ' +
        'menos provável.',
    },
    {
      id: 'mascote-do-ciclo',
      nome: 'Mascote do ciclo',
      categoria: 'cultural',
      descricao:
        'Uma imagem específica viraliza (um chapéu, um bicho, um print) e vira token. ' +
        'Vive do ciclo em que nasceu e raramente sobrevive ao próximo.',
      comoReconhecer: 'Arte única e reconhecível, sem história anterior fora de cripto.',
      exemplos: ['WIF (dogwifhat) — memecoin de Solana nascida da imagem de um cão de gorro'],
      risco: 'alto',
      alerta:
        'Dezenas de cópias com o mesmo nome e a mesma arte aparecem em horas. Confira sempre ' +
        'o contrato, nunca o nome nem a imagem.',
    },
    {
      id: 'evento-noticia',
      nome: 'Token de evento ou notícia',
      categoria: 'narrativa',
      descricao:
        'Nasce horas depois de um acontecimento (uma declaração, um vídeo, um escândalo) e ' +
        'aposta num pico curto de busca e de conversa.',
      comoReconhecer: 'Lançado poucos minutos depois da notícia; o nome copia a manchete.',
      exemplos: [],
      risco: 'alto',
      alerta:
        'Janela de atenção curtíssima e vários tokens disputando o mesmo assunto. Costuma ' +
        'haver mais vendedor que comprador já na primeira hora.',
    },
    {
      id: 'tendencia-plataforma',
      nome: 'Token de tendência de plataforma',
      categoria: 'narrativa',
      descricao:
        'Copia o formato do que está dando certo no launchpad da vez — mesmo tema, estética ' +
        'e mecânica — para pegar carona em quem garimpa ali.',
      comoReconhecer: 'Vários tokens quase idênticos lançados no mesmo dia, na mesma plataforma.',
      exemplos: [],
      risco: 'alto',
      alerta: 'Você está competindo com bots que enxergam o lançamento antes de você.',
    },
    {
      id: 'figura-oficial',
      nome: 'Token oficial de figura pública',
      categoria: 'figura-publica',
      descricao:
        'Lançado, assinado ou endossado publicamente pela própria pessoa. Endosso real, ' +
        'risco real: os casos mais documentados de 2025 são desse tipo.',
      comoReconhecer: 'Anúncio nas contas oficiais e verificadas da própria pessoa.',
      exemplos: ['TRUMP', 'MELANIA', 'LIBRA — veja a aba "Casos reais"'],
      risco: 'alto',
      alerta:
        'Endosso de celebridade concentra atenção num pico curto e depois a leva embora. ' +
        'Os três casos da aba "Casos reais" caíram mais de 90% do topo.',
    },
    {
      id: 'figura-nao-oficial',
      nome: 'Token não-oficial com nome de terceiro',
      categoria: 'figura-publica',
      descricao:
        'Usa nome, rosto ou marca de alguém sem autorização, contando com a confusão para ' +
        'atrair compradores.',
      comoReconhecer:
        'Nenhuma menção nas contas oficiais da pessoa; o contrato só circula em grupos e em ' +
        'respostas de posts.',
      exemplos: [],
      risco: 'alto',
      alerta:
        'Impersonação é o padrão, não a exceção. Sem anúncio no canal oficial, assuma que é falso.',
    },
  ],

  // ---------------------------------------------------------------------------
  // Casos reais (aba "Casos reais") — números conferidos nas fontes citadas
  // ---------------------------------------------------------------------------
  casos: [
    {
      id: 'trump',
      nome: 'OFFICIAL TRUMP',
      ticker: 'TRUMP',
      chain: 'Solana',
      data: 'Lançada em 17/01/2025',
      resumo:
        'Em cerca de 24 horas virou a segunda maior memecoin do mercado, atrás só do ' +
        'Dogecoin. Depois despencou para uma fração do topo.',
      numeros: [
        { rotulo: 'Pico de preço', valor: 'cerca de US$ 73 a US$ 75' },
        { rotulo: 'Pico de market cap', valor: 'cerca de US$ 15 bilhões em ~24h' },
        { rotulo: 'Posição atingida', valor: '2ª maior memecoin naquele momento' },
        { rotulo: 'Queda registrada', valor: 'mais de 96% abaixo do topo (perto de US$ 2,27)' },
      ],
      fontes: ['CoinGecko'],
      licao:
        'A atenção máxima foi no primeiro dia: quem chegou no segundo comprou de quem estava ' +
        'saindo.',
    },
    {
      id: 'melania',
      nome: 'MELANIA MEME',
      ticker: 'MELANIA',
      chain: 'Solana',
      data: 'Lançada em janeiro de 2025',
      resumo:
        'Lançada poucos dias depois da TRUMP, na mesma onda de atenção. A queda foi mais ' +
        'rápida e mais profunda.',
      numeros: [
        { rotulo: 'Pico de preço', valor: 'cerca de US$ 13,73' },
        {
          rotulo: 'Market cap: pico e depois',
          valor: 'de ~US$ 1,73 bilhão para ~US$ 164 milhões',
        },
        { rotulo: 'Queda em 06/02/2025', valor: 'cerca de 90% (Bloomberg)' },
        {
          rotulo: 'Queda acumulada',
          valor: 'mais de 99% do pico, até dezembro de 2025 (Messari)',
        },
      ],
      fontes: ['Bloomberg (06/02/2025)', 'Messari (dezembro de 2025)'],
      licao:
        'O segundo token da mesma narrativa pega a atenção que sobrou, e ela sobra por muito ' +
        'menos tempo.',
    },
    {
      id: 'libra',
      nome: 'LIBRA',
      ticker: 'LIBRA',
      chain: 'Solana',
      data: '14/02/2025, Argentina',
      resumo:
        'Promovida publicamente pelo presidente argentino Javier Milei. Subiu e desabou no ' +
        'mesmo dia, com evidência on-chain de saques de insiders, e virou investigação de ' +
        'fraude.',
      numeros: [
        { rotulo: 'Pico de market cap', valor: 'cerca de US$ 4,56 bilhões em 14/02/2025' },
        { rotulo: 'Queda', valor: 'cerca de 94%, para ~US$ 257 milhões, em cerca de 11 horas' },
        {
          rotulo: 'Saques de insiders',
          valor: '~US$ 107 milhões por ~8 carteiras (Lookonchain)',
        },
        { rotulo: 'Supply desbloqueado', valor: 'cerca de 82% já no lançamento (Bubblemaps)' },
      ],
      fontes: ['Lookonchain', 'Bubblemaps'],
      licao:
        'Concentração de supply e endosso de autoridade na mesma operação: as duas coisas ' +
        'que você aprende a checar neste hub, falhando juntas em 11 horas.',
    },
  ],

  // Os dois rótulos de dentro do card de cada caso, como no desenho. O
  // "Fontes: " já vem com o espaço, porque a lista de fontes vem logo depois.
  rotulosDosCasos: { licao: 'Lição', fontes: 'Fontes: ' },

  licaoDosCasos:
    'Hype e endosso de celebridade não garantem durabilidade: nos três casos o pico de ' +
    'atenção durou horas, e quem comprou perto do topo ficou com o prejuízo. É o padrão ' +
    'clássico de pump-and-dump, com nomes conhecidos no anúncio.',

  // Não aparece na tela desde o redesenho (o desenho não tem esta nota; a nota
  // da linha do tempo, em `linhaDoTempoCasos`, diz o mesmo sobre as fontes).
  notaDosCasos:
    'Números das fontes citadas, nas datas indicadas. Cotação muda; fato histórico, não. ' +
    'Nada aqui é recomendação de compra ou de venda.',

  // ---------------------------------------------------------------------------
  // As 4 fases (aba "As 4 fases") — o seletor das fases com o painel "o que
  // você vê / o que checar / armadilha" de cada uma
  // ---------------------------------------------------------------------------
  fases: [
    {
      id: 'lancamento',
      numero: 1,
      nome: 'Lançamento',
      resumo:
        'O token nasce. Liquidez fina, poucos holders, preço definido pela bonding curve ou ' +
        'pelo primeiro pool. Tudo acontece em minutos.',
      oQueVoceVe: [
        'Idade medida em minutos',
        'Punhado de holders',
        'Volume vindo de bots e snipers',
        'Nenhum histórico para comparar',
      ],
      oQueChecar: [
        'Alguém consegue tirar a liquidez?',
        'Mint e freeze authority foram revogadas?',
        'Quanto os maiores holders detêm juntos?',
        'Houve compras em bloco (bundles) no lançamento?',
      ],
      armadilha:
        'Comprar nos primeiros segundos disputando com bots que enxergam o lançamento antes ' +
        'de você e já estão posicionados quando a sua ordem chega.',
      risco: 'alto',
    },
    {
      id: 'consolidacao',
      numero: 2,
      nome: 'Consolidação / Acumulação',
      resumo:
        'O preço para de se mexer com violência e lateraliza. Quem estava só pelo pump vai ' +
        'embora; quem fica começa a virar comunidade.',
      oQueVoceVe: [
        'Preço lateral por horas ou dias',
        'Volume caindo',
        'Holders crescendo devagar',
        'Conversa mais consistente e menos eufórica',
      ],
      oQueChecar: [
        'A comunidade é gente de verdade ou são bots repetindo a mesma frase?',
        'O dev continua presente e comunicando?',
        'Existe alguma catálise concreta marcada para acontecer?',
      ],
      armadilha:
        'Confundir consolidação com garantia. Muito token lateraliza e morre exatamente ' +
        'ali, sem nunca ter uma fase 3.',
      risco: 'medio',
    },
    {
      id: 'expansao',
      numero: 3,
      nome: 'Expansão por catálise',
      resumo:
        'Um evento concreto traz atenção nova: uma listagem, um post de conta grande, a ' +
        'graduação para a DEX, uma narrativa que pega. O preço destrava.',
      oQueVoceVe: [
        'Salto de volume e de holders ao mesmo tempo',
        'Menções aumentando fora do círculo original',
        'Sequência de máximas cada vez mais altas',
      ],
      oQueChecar: [
        'A catálise é a que você tinha previsto, ou é outra?',
        'Seus alvos de realização parcial já estão definidos?',
        'A liquidez aguenta você sair sem derrubar o preço?',
      ],
      armadilha:
        'Entrar aqui achando que ainda é a fase 2. Quem entra no meio da expansão está ' +
        'comprando de quem já vai realizar.',
      risco: 'medio',
    },
    {
      id: 'degradacao',
      numero: 4,
      nome: 'Degradação',
      resumo:
        'A atenção migra para o próximo token. Sem atenção não há comprador; sem comprador ' +
        'o preço só tem um caminho.',
      oQueVoceVe: [
        'Volume caindo junto com o preço',
        'Holders diminuindo',
        'Grupo esvaziando ou virando reclamação',
        'Máximas cada vez mais baixas',
      ],
      oQueChecar: [
        'Eu compraria este token pelo preço de hoje?',
        'Se a resposta é não, por que eu ainda estou dentro?',
      ],
      armadilha:
        'Custo afundado: segurar "até voltar". É nesta fase que a maior parte do capital ' +
        'de quem está começando é destruída.',
      risco: 'alto',
    },
  ],

  // O desfecho que vem depois da última fase, na caixa cinza do fim do seletor.
  desfechoFases: 'Maioria vai a zero',

  // O card "As 4 fases" do desenho (M2 Desktop): o seletor das fases, o
  // parágrafo da CoinGecko e as duas grades de 100. O texto corrido que ficava
  // aqui num campo só (`observacaoFases`) foi dividido nos pedaços que o
  // desenho mostra, para os números não ficarem escritos em dois lugares:
  // `seletorDeFases.emUmaFrase`, `paragrafoDaMortalidade` e `grades` (com a
  // contestação da pump.fun e a legenda final).
  seletorDeFases: {
    titulo: 'As 4 fases: clique numa para ver o que checar',
    emUmaFrase:
      'Saber em que fase você está muda o que perguntar. É modelo didático, não previsão: ' +
      'muitos tokens pulam fases, e a maioria não passa da primeira.',
    paragrafos: [
      'As fases descrevem um token que dá certo por um tempo: nasce, se acalma, ganha ' +
        'atenção nova e perde tudo. O modelo não adivinha a próxima; diz qual pergunta fazer ' +
        'na fase em que você está.',
      'O Lançamento traz os termos mais novos. Sniper é um programa que compra no primeiro ' +
        'segundo, antes de qualquer pessoa. Bonding curve é uma regra automática: o preço sobe ' +
        'quando compram e cai quando vendem, sem ninguém do outro lado; pool é o reservatório ' +
        'do Módulo 1. Mint e freeze são as permissões de criar novas unidades e de congelar. ' +
        'Bundles são várias compras enfiadas numa só transação, para um dono parecer muita ' +
        'gente. Aqui, as checagens são todas sobre o contrato.',
      'Pump.fun é um launchpad de memecoins, de onde vêm os números abaixo. Graduação é ' +
        'quando um token junta compradores suficientes e sai da bonding curve para uma pool ' +
        'normal numa DEX, a troca on-chain do Módulo 1.',
      'Na Consolidação o preço lateraliza (anda de lado, sem altas nem quedas violentas) e as ' +
        'perguntas mudam de contrato para gente. Na Expansão, a pergunta útil é ' +
        'desconfortável: a catálise que chegou é a que você previu? Se for outra, você acertou ' +
        'por sorte, e sorte não se repete por método.',
      'Na Degradação, repare nas máximas. Máxima é o ponto mais alto que o preço tocou num ' +
        'período; máximas cada vez mais baixas são o desenho de quem está indo embora. Sem ' +
        'atenção não há comprador; sem comprador, o preço só tem um caminho.',
      'Os riscos altos são 2 de 4, no começo e no fim: disputar os primeiros segundos com ' +
        'bots, e segurar "até voltar" na Degradação, onde a maior parte do capital de quem ' +
        'está começando é destruída.',
      '"A maioria vai a zero" depende da régua. Nenhuma das fontes abaixo mede o preço ' +
        'chegando literalmente a zero: medem tokens que param de negociar ou que ficam com ' +
        'tão pouca liquidez que não dá mais para vender sem derrubar tudo. Nos dois casos, o ' +
        'token existe e você não consegue sair dele.',
    ],
    paragrafosFinais: [
      'O erro que as fases evitam é usar a mesma pergunta o tempo todo: "dá para alguém ' +
        'tirar a liquidez?" protege no Lançamento e não serve na Degradação; "eu compraria ' +
        'isto hoje?" salva na Degradação e não faz sentido no minuto zero. Decida primeiro em ' +
        'que fase você está. Nada aqui é recomendação de compra ou de venda.',
    ],
    detalhe: {
      titulo: 'os números que não batem e a liquidez "travada"',
      paragrafos: [
        'Os dois números abaixo não batem porque medem coisas diferentes, e nenhum mede ' +
          'fraude. Quando alguém disser um número sozinho, pergunte qual régua ele usou.',
        'A plataforma contestou publicamente um dos relatórios (a contestação está ao lado do ' +
          'número, com fonte e data). O número é forte o bastante para orientar o tamanho da ' +
          'sua posição, e frágil o bastante para não virar acusação.',
        'Sobre "dá para alguém tirar a liquidez?": no pump.fun, a pool que nasce depois da ' +
          'graduação é do protocolo (o programa da própria plataforma). Fora dele, ver a ' +
          'liquidez "travada" (presa num contrato por um tempo) não prova que é seguro.',
      ],
    },
    rotuloDaLista: 'As quatro fases',
    // Os três micro-rótulos do painel da fase escolhida, como no desenho.
    rotulos: {
      oQueVoceVe: 'O que você vê',
      oQueChecar: 'O que checar',
      armadilha: 'Armadilha desta fase',
    },
  },

  paragrafoDaMortalidade:
    'Segundo a CoinGecko Research (18,67 milhões de tokens, jan/2024–jun/2026), 68,67% dos ' +
    'tokens do Pump.fun pararam de negociar no mesmo dia do lançamento. Em até dois dias, ' +
    'foram 80,37%. Só 4,55% seguiram negociando depois de 90 dias.',

  // "Vai a zero" em quadradinhos: duas grades, porque o número muda conforme a
  // régua. A grade arredonda (69 e 99 de 100); o número exato vai ao lado, em
  // `exato`, e a conta fica escrita na fonte. `cor`: 'ruim' = vermelho, 'resto'
  // = cinza. A contestação da pump.fun vai na caixa âmbar "Contestado".
  grades: {
    frase: '"Vai a zero" depende da régua — de cada 100 tokens do Pump.fun',
    itens: [
      {
        frase:
          'Pela régua "parou de negociar": 69 de cada 100 param no mesmo dia em que nasceram.',
        grupos: [
          { rotulo: 'param no mesmo dia', quantidade: 69, cor: 'ruim' },
          { rotulo: 'seguem para o dia seguinte', quantidade: 31, cor: 'resto' },
        ],
        exato: '68,67%',
        credito: 'CoinGecko Research · 18,67 mi de tokens',
        fonte:
          'Número exato: 68,67% — 69 de 100 é o arredondamento que a grade desenha. Fonte: ' +
          'CoinGecko Research, 18,67 milhões de tokens, jan/2024–jun/2026. Em até dois dias, ' +
          '80,37%; só 4,55% seguem negociando depois de 90 dias.',
      },
      {
        frase: 'Pela régua "liquidez abaixo de US$ 1.000": 99 de cada 100.',
        grupos: [
          { rotulo: 'ficam sem liquidez', quantidade: 99, cor: 'ruim' },
          { rotulo: 'restante', quantidade: 1, cor: 'resto' },
        ],
        exato: '98,6%',
        credito: 'Solidus Labs · liquidez abaixo de US$ 1.000',
        fonte:
          'Número exato: 98,6% — 99 de 100 é o arredondamento que a grade desenha. Fonte: ' +
          'Solidus Labs, pela liquidez abaixo de US$ 1.000. A régua muda o número: uma mede ' +
          'parar de negociar, a outra mede colapso de liquidez.',
        contestacao:
          'A pump.fun contestou publicamente este relatório, dizendo que ele "carece de ' +
          'entendimento básico de memecoins" (CoinDesk, 07/05/2025). O número mede colapso de ' +
          'liquidez, não fraude provada.',
      },
    ],
    legenda:
      'Nenhuma dessas fontes mede o preço chegando literalmente a zero. Todas medem parar de ' +
      'negociar ou ficar sem liquidez. É isso que "vai a zero" quer dizer na prática.',
  },

  // ---------------------------------------------------------------------------
  // Mini-quiz (aba "Quiz") — 4 perguntas
  // ---------------------------------------------------------------------------
  // ---------------------------------------------------------------------------
  // Destaques — os números grandes que abrem cada aba
  //
  // Este módulo não tem lista de `fontes` no topo; os casos reais trazem as
  // suas próprias. Todo destaque abaixo sai do texto do módulo ou dos números
  // dos casos, com a fonte que já está lá. Nada novo entra.
  // ---------------------------------------------------------------------------
  destaques: {
    visaoGeral: [
      {
        rotulo: 'O que move o preço de uma memecoin',
        valor: 'Olhos',
        nota: 'Não fundamento: atenção. Quando a atenção migra, o preço vai junto.',
      },
      {
        rotulo: 'Fases de um ciclo típico',
        valor: '4',
        nota: 'Lançamento, consolidação, expansão e degradação. Muitos tokens pulam fases, e a maioria não passa da primeira.',
      },
      {
        rotulo: 'Desfecho da maioria',
        valor: 'Zero',
        nota: 'A tese central do módulo. Não é pessimismo: é a base de qualquer regra de tamanho e de saída.',
        tom: 'alerta',
      },
    ],

    vieses: [
      {
        rotulo: 'Vieses que fazem quase todo o estrago',
        valor: '5',
        nota: 'FOMO, prova social, custo afundado, excesso de confiança e efeito disposição.',
      },
      {
        rotulo: 'Mecanismo nº 1 de compra no topo',
        valor: 'FOMO',
        nota: 'Medo de ficar de fora: o gráfico sobe sem você, parece a última chance, e você compra sem checar nada.',
        tom: 'alerta',
      },
      {
        rotulo: 'O que o custo afundado faz com uma perda de 30%',
        valor: '→ 100%',
        nota: '"Já perdi tanto que agora tenho que esperar voltar." É o viés que transforma perda pequena em perda total.',
        tom: 'alerta',
      },
    ],

    tipos: [
      {
        rotulo: 'Tipos de token catalogados',
        valor: '10',
        nota: 'Em 5 categorias: IA, comunidade, memes culturais, narrativas virais e figuras públicas. Cada um com seu motor de atenção.',
      },
      {
        rotulo: 'Tipos com risco alto',
        valor: '8 de 10',
        nota: 'Só o token de comunidade nativa e o meme cultural de longa duração ficam em risco médio. Nenhum é baixo.',
        tom: 'alerta',
      },
      {
        rotulo: 'O teste dos 30 segundos',
        valor: '30 s',
        nota: '"Se você não consegue usar o produto em 30 segundos, o produto é o token."',
      },
    ],

    casos: [
      {
        rotulo: 'Market cap da TRUMP em cerca de 24 horas',
        valor: 'US$ 15 bi',
        nota: 'Lançada em 17/01/2025, virou a 2ª maior memecoin naquele momento. Depois, mais de 96% abaixo do topo.',
      },
      {
        rotulo: 'Queda da MELANIA até dezembro de 2025',
        valor: '99%+',
        nota: 'Do pico, segundo a Messari. Em 06/02/2025 já tinha caído cerca de 90% (Bloomberg).',
        tom: 'alerta',
      },
      {
        rotulo: 'Duração do pico de atenção nos três casos',
        valor: 'Horas',
        nota: 'Quem comprou perto do topo ficou com o prejuízo quando a atenção migrou.',
        tom: 'alerta',
      },
    ],

    fases: [
      {
        rotulo: 'Fases com risco alto',
        valor: '2 de 4',
        nota: 'Lançamento e degradação, o começo e o fim: onde a atenção está no extremo e onde mais se perde.',
        tom: 'alerta',
      },
      {
        rotulo: 'Tempo de vida de um lançamento',
        valor: 'Minutos',
        nota: 'Idade medida em minutos, punhado de holders, volume vindo de robôs. Nenhum histórico para comparar.',
      },
      {
        rotulo: 'O que muda a pergunta certa',
        valor: 'A fase',
        nota: 'Saber a fase muda o que perguntar. É modelo didático, não previsão: muitos tokens pulam fases.',
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // Anatomia — um post de hype, com os sinais de manipulação marcados
  //
  // Post esquemático; nenhum perfil ou token real foi copiado. Cada marcador liga
  // um elemento do post ao viés que ele explora. É defensivo, na lógica do
  // módulo: reconhecer, não produzir.
  // ---------------------------------------------------------------------------
  anatomias: {
    postDeHype: {
      titulo: 'Anatomia de um post de hype',
      descricao: 'Os seis elementos que quase toda campanha repete — e o viés que cada um está tentando acionar em você.',
      paragrafos: [
        'Hype é o barulho organizado em volta de um token: posts, prints, gente animada, ' +
          'urgência. Às vezes a empolgação é sincera, mas o barulho armado tem forma fixa, e é ' +
          'ela que você aprende a reconhecer.',
        'Cada elemento mira um dos cinco vieses: a promessa sem tese e o print miram o FOMO; ' +
          'curtidas e "eu comprei" miram a prova social; o perfil grande mira a autoridade que ' +
          'você empresta a quem tem muitos seguidores.',
        'Os dois campos em alerta andam juntos. Como qualquer um repete o ticker, é o post que ' +
          'escolhe o endereço que você copia; e a pressa ("últimas horas antes da listagem" — ' +
          'listagem é quando uma corretora passa a oferecer o token) serve para você colar esse ' +
          'endereço sem esperar os 10 minutos nem conferir na fonte oficial, como o Módulo 1 ' +
          'mandou.',
      ],
      exemplo: {
        titulo: 'Lendo o mesmo post duas vezes',
        passos: [
          'Primeira leitura, sem método: perfil grande, gráfico subindo, milhares de ' +
            'curtidas, "eu comprei", listagem chegando. Parece oportunidade confirmada.',
          'Segunda leitura: a promessa não tem evento concreto nem prazo.',
          'O print é de uma alta que já aconteceu, e quem postou comprou antes.',
          'Curtidas e "eu comprei" são compráveis: bots e calls pagos custam pouco.',
          'O perfil grande pode ter sido pago ou ter comprado antes: endosso não é análise.',
          'Sobra um endereço na bio e uma pressa. Nenhuma tese, nenhuma catálise, nenhuma ' +
            'checagem possível a partir do post.',
        ],
      },
      paragrafosFinais: [
        'O erro que essa leitura evita é tratar entusiasmo como informação. Entusiasmo é ' +
          'barato e não diz nada sobre liquidez, concentração de holders ou o que sobrou no ' +
          'contrato, as únicas coisas que você confere sozinho.',
      ],
      // Os seis campos do post. `rotulo` é o texto que aparece dentro do campo;
      // `alerta: true` pinta o campo de âmbar (os outros são ciano). A posição
      // de cada campo na tela vem de `grade`, mais abaixo.
      paineis: [
        { id: 'autor', rotulo: '@perfil-grande · verificado' },
        { id: 'texto', rotulo: '"$TICKER vai 100x, ainda dá tempo, não fique de fora"' },
        { id: 'grafico', rotulo: 'Print do gráfico subindo' },
        { id: 'metricas', rotulo: 'milhares de curtidas · reposts · "eu comprei"' },
        { id: 'contrato', rotulo: 'CA: 0x… (na bio)', alerta: true },
        { id: 'urgencia', rotulo: '"Últimas horas antes da listagem"', alerta: true },
      ],
      itens: [
        {
          painel: 'texto',
          titulo: 'A promessa sem tese',
          texto: '"Vai 100x", "não fique de fora". Nenhum evento, nenhum prazo: só o preço como motivo. É o FOMO sendo fabricado.',
        },
        {
          painel: 'grafico',
          titulo: 'O gráfico que já subiu',
          texto: 'Print de alta é a isca do FOMO: mostra o que você perdeu, não o que vem. Quem posta comprou antes do print.',
        },
        {
          painel: 'metricas',
          titulo: 'Prova social comprável',
          texto: 'Milhares de curtidas, dezenas de "eu comprei". Bots e calls pagos custam pouco. Volume de vozes não é liquidez nem contrato auditável.',
        },
        {
          painel: 'autor',
          titulo: 'O perfil grande',
          texto: 'Muitas vezes recebe pelo post ou comprou antes. Endosso não é análise — e o Módulo 1 lembra: confirme o endereço oficial na fonte.',
        },
        {
          painel: 'contrato',
          titulo: 'O contrato na bio',
          texto: 'Onde o impostor mora. Ticker é apelido; quem busca pelo nome pode comprar o token errado.',
        },
        {
          painel: 'urgencia',
          titulo: 'A pressa',
          texto: '"Últimas horas" existe para impedir a espera de 10 minutos que o antídoto do FOMO pede.',
        },
      ],
      // Como o desenho (M2 Desktop) monta o post: 4 linhas em grade HTML. `cols`
      // é a divisão da linha, `paineis` os ids de `paineis` acima e `altura` a
      // altura mínima de cada painel, em px. No celular as linhas continuam
      // iguais; só a lista numerada desce para baixo do post.
      grade: [
        { cols: '2fr 1fr', paineis: ['autor', 'grafico'], altura: 46 },
        { cols: '1fr', paineis: ['texto'], altura: 52 },
        { cols: '2fr 1fr', paineis: ['metricas', 'contrato'], altura: 46 },
        { cols: '1fr', paineis: ['urgencia'], altura: 40 },
      ],
      // A frase miúda embaixo do post e a legenda da figura inteira.
      rodape: 'Post esquemático. Nenhum perfil ou token real foi copiado.',
      legenda:
        'Os elementos são os que se repetem em quase toda campanha de hype. É defensivo, na ' +
        'lógica do módulo: reconhecer, não produzir.',
    },
  },

  // ---------------------------------------------------------------------------
  // Linha do tempo dos casos reais (aba Casos). Datas e números dos próprios
  // casos acima, com as mesmas fontes.
  // ---------------------------------------------------------------------------
  linhaDoTempoCasos: {
    titulo: 'Os três casos, na ordem em que aconteceram',
    descricao: 'Da estreia ao esquecimento, em semanas. Repare na distância entre o pico e a queda.',
    paragrafos: [
      'São os três casos mais documentados de 2025: atenção que chega de repente vai embora ' +
        'de repente, com número e data. Os três são da mesma chain (a blockchain em que o ' +
        'token vive, aqui a Solana) e tiveram endosso de figura pública.',
      'A OFFICIAL TRUMP, lançada em 17/01/2025, virou em cerca de 24 horas a segunda maior ' +
        'memecoin do mercado, atrás só do Dogecoin: pico de market cap perto de US$ 15 ' +
        'bilhões, preço no topo entre cerca de US$ 73 e US$ 75. A atenção máxima foi no ' +
        'primeiro dia; quem chegou no segundo comprou de quem saía. Depois, mais de 96% abaixo ' +
        'do topo, perto de US$ 2,27 (CoinGecko).',
      'A MELANIA MEME veio poucos dias depois, em janeiro de 2025, com a atenção que sobrou, ' +
        'e ela sobra por muito menos tempo. Pico de preço perto de US$ 13,73; market cap de ' +
        'cerca de US$ 1,73 bilhão para cerca de US$ 164 milhões; queda de cerca de 90% em ' +
        '06/02/2025 (Bloomberg) e de mais de 99% do pico até dezembro de 2025 (Messari).',
      'A LIBRA, o caso mais curto e mais grave, foi lançada em 14/02/2025 na Argentina e ' +
        'promovida publicamente pelo presidente Javier Milei. No mesmo dia chegou a um pico de ' +
        'market cap de cerca de US$ 4,56 bilhões e caiu cerca de 94%, para cerca de US$ 257 ' +
        'milhões, em cerca de 11 horas. Cerca de 82% do supply já estava desbloqueado no ' +
        'lançamento, livre para venda desde o primeiro minuto (Bubblemaps), e cerca de 8 ' +
        'carteiras de insiders (quem estava por dentro antes do público) sacaram cerca de US$ ' +
        '107 milhões (Lookonchain). Esses saques são on-chain: ficam registrados na ' +
        'blockchain, à vista de quem souber olhar. Virou investigação de fraude.',
      'A LIBRA juntou concentração de supply e endosso de autoridade, as duas coisas que você ' +
        'aprende a checar, falhando juntas em 11 horas. Da TRUMP à queda da MELANIA foram ' +
        'semanas; da LIBRA nascer a cair, horas.',
    ],
    paragrafosFinais: [
      'O erro que esses casos evitam é ler nome conhecido como garantia. O nome conhecido faz ' +
        'a atenção chegar toda de uma vez, e aí ela não tem para onde crescer: endosso ' +
        'concentra atenção num pico curto e depois a leva embora.',
      'Nada aqui é recomendação de compra ou de venda, e os nomes são exemplo de categoria, ' +
        'não julgamento de pessoa.',
    ],
    detalhe: {
      titulo: 'por que a MELANIA aparece só com o mês',
      paragrafos: [
        'Dois marcos têm só o mês (01/2025 e 12/2025), porque foi só isso que a fonte ' +
          'registrou. Sem os dias, o intervalo não é chutado: aparece como "cerca de", como ' +
          '"no mesmo mês", ou não aparece.',
      ],
    },
    marcos: [
      { data: '17/01/2025', titulo: 'OFFICIAL TRUMP é lançada', texto: 'Em cerca de 24 horas vira a 2ª maior memecoin, com pico de market cap perto de US$ 15 bilhões. Quem chegou no segundo dia comprou de quem estava saindo.' },
      { data: '01/2025', titulo: 'MELANIA MEME é lançada', texto: 'Poucos dias depois da TRUMP. O arquivo registra só o mês.' },
      { data: '06/02/2025', titulo: 'MELANIA já caiu cerca de 90%', texto: 'Noticiado pela Bloomberg.', tom: 'alerta' },
      { data: '14/02/2025', titulo: 'LIBRA é lançada na Argentina', texto: 'Pico de market cap de cerca de US$ 4,56 bilhões no mesmo dia. O pico de atenção durou horas.', tom: 'alerta' },
      { data: '12/2025', titulo: 'MELANIA acumula queda de mais de 99% do pico', texto: 'Segundo a Messari, em dezembro de 2025. A TRUMP, mais de 96% abaixo do topo.', tom: 'alerta' },
    ],
    // A pílula entre os marcos é calculada das datas (linhaDoTempo.js). Com a
    // MELANIA registrada só pelo mês (01/2025), não dá para dizer quantos dias
    // passaram até 06/02/2025: ali a pílula não sai.
    nota:
      'Números das fontes citadas em cada caso, nas datas indicadas. Fato histórico, não ' +
      'recomendação. Dois marcos têm só o mês (01/2025 e 12/2025): sem os dias, o intervalo ' +
      'aparece como "cerca de" ou "no mesmo mês", e onde nem isso dá, não aparece.',
  },

  // Por que cada alternativa errada do quiz não serve (o quiz mostra a da resposta escolhida).
  porqueErradas: {
    q1: {
      a: 'Memecoin não tem produto nem receita por trás.',
      c: 'Não existe reserva que garanta preço mínimo.',
      d: 'Desenvolvedor não sustenta preço de memecoin; muitas nem têm código além do próprio token.',
    },
    q2: {
      a: 'Custo afundado é segurar o que já caiu para não "assumir" a perda; aqui você nem tem posição.',
      b: 'Efeito disposição é vender o que sobe e segurar o que cai; aqui ainda não há posição.',
      d: 'Excesso de confiança é achar que sabe mais do que sabe; o gatilho aqui é o gráfico subindo sem você.',
    },
    q3: {
      a: 'Nenhuma corretora cobra aluguel por posição aberta em token.',
      c: 'Tokens não expiram.',
      d: 'Na maioria das memecoins o preço não volta: a atenção foi embora.',
    },
    q4: {
      a: 'Endosso concentra atenção num pico curto; os três caíram mais de 90%.',
      b: 'Esperar o anúncio oficial é chegar quando quem entrou antes já está vendendo.',
      d: 'Não foram proibidas; caíram porque a atenção foi embora.',
    },
  },

  quiz: [
    {
      id: 'q1',
      pergunta: 'O que sustenta o preço de uma memecoin?',
      alternativas: [
        { id: 'a', texto: 'O lucro e a receita do projeto por trás dela.' },
        {
          id: 'b',
          texto: 'A atenção coletiva: quantas pessoas estão falando e comprando ao mesmo tempo.',
        },
        { id: 'c', texto: 'Uma reserva de dólares que garante um valor mínimo.' },
        { id: 'd', texto: 'O número de desenvolvedores trabalhando no código.' },
      ],
      correta: 'b',
      explicacao:
        'Memecoin não tem produto nem receita. O preço é função direta da atenção — e ' +
        'atenção migra. Quando ela vai para o próximo token, o preço vai junto.',
    },
    {
      id: 'q2',
      pergunta: 'Um token subiu 300% na última hora. Você nunca tinha ouvido falar dele e sente que precisa comprar agora, antes que suba mais. Qual viés está agindo?',
      alternativas: [
        { id: 'a', texto: 'Custo afundado.' },
        { id: 'b', texto: 'Efeito disposição.' },
        {
          id: 'c',
          texto:
            'FOMO: o medo de ficar de fora, disparado justamente pelo preço já ter subido.',
        },
        { id: 'd', texto: 'Excesso de confiança.' },
      ],
      correta: 'c',
      explicacao:
        'FOMO é "fear of missing out". Ele leva à compra no topo, porque o gatilho é o preço ' +
        'já ter subido. O antídoto é o tempo de espera entre querer comprar e comprar.',
    },
    {
      id: 'q3',
      pergunta:
        'Por que segurar uma posição por tempo demais na fase de Degradação destrói capital?',
      alternativas: [
        { id: 'a', texto: 'Porque a corretora cobra aluguel diário por posição aberta.' },
        {
          id: 'b',
          texto:
            'Porque o viés de custo afundado transforma a decisão em "esperar voltar", enquanto a atenção — e o comprador — já foi embora.',
        },
        { id: 'c', texto: 'Porque os tokens expiram automaticamente depois de 30 dias.' },
        { id: 'd', texto: 'Porque o preço sempre volta ao topo se você esperar o suficiente.' },
      ],
      correta: 'b',
      explicacao:
        'O dinheiro já perdido não volta por você segurar. A pergunta útil é "eu compraria ' +
        'isso pelo preço de hoje?". É assim que uma queda de 30% vira uma perda de 100%.',
    },
    {
      id: 'q4',
      pergunta: 'O que os casos TRUMP, MELANIA e LIBRA ensinam?',
      alternativas: [
        {
          id: 'a',
          texto: 'Que tokens de figuras públicas são a opção mais segura, por causa do endosso.',
        },
        { id: 'b', texto: 'Que basta esperar o anúncio oficial para lucrar com segurança.' },
        {
          id: 'c',
          texto:
            'Que endosso de celebridade concentra atenção num pico curto e não garante durabilidade: os três caíram mais de 90% do topo.',
        },
        { id: 'd', texto: 'Que memecoins de políticos são proibidas e por isso caem.' },
      ],
      correta: 'c',
      explicacao:
        'TRUMP passou a operar mais de 96% abaixo do topo (CoinGecko); MELANIA caiu cerca de ' +
        '99% do pico (Bloomberg, Messari); LIBRA perdeu ~94% em cerca de 11 horas e virou ' +
        'investigação de fraude na Argentina. Atenção que chega de repente também vai embora ' +
        'de repente.',
    },
  ],

  // ---------------------------------------------------------------------------
  // Vídeos — cada um vira o botão "Assistir a videoaula" dentro do card da seção
  // que ele reforça (o campo `secao` diz qual). O player só aparece no clique.
  // PENDENTE: a `transcricao`; enquanto ela não existe, o aviso padrão de
  // src/data/videoaulas.js entra embaixo do player.
  // ---------------------------------------------------------------------------
  videos: {
    'economia-da-atencao': {
      titulo: 'Economia da atenção',
      secao: 'atencao',
      src: 'assets/videos/economia-da-atencao.mp4',
      duracao: '7:11',
      descricao: 'Por que o preço de uma memecoin é feito de olhos, e não de lucro.',
      transcricao: [],
    },
    'os-cinco-vieses': {
      titulo: 'Os cinco vieses que fazem você clicar',
      secao: 'vieses',
      src: 'assets/videos/os-cinco-vieses.mp4',
      duracao: '11:33',
      descricao: 'FOMO, prova social, custo afundado, excesso de confiança e efeito disposição.',
      transcricao: [],
    },
    'tipos-de-memecoin': {
      titulo: 'Os tipos de token e como reconhecer cada um',
      secao: 'tipos',
      src: 'assets/videos/tipos-de-memecoin.mp4',
      duracao: '7:04',
      descricao: 'As categorias de memecoin, o que marca cada uma e o risco de cada tipo.',
      transcricao: [],
    },
    'casos-reais': {
      titulo: 'Casos reais: o que aconteceu, com números e fonte',
      secao: 'casos',
      src: 'assets/videos/casos-reais.mp4',
      duracao: '7:24',
      descricao: 'TRUMP, MELANIA e LIBRA: a linha do tempo e o que cada caso ensina.',
      transcricao: [],
    },
    'as-quatro-fases': {
      titulo: 'As quatro fases de uma memecoin',
      secao: 'fases',
      src: 'assets/videos/as-quatro-fases.mp4',
      duracao: '9:40',
      descricao: 'Lançamento, consolidação, expansão e degradação — e quantos tokens chegam ao fim.',
      transcricao: [],
    },
  },
};
