// modulo2.js — conteúdo do Módulo 2 (psicologia das memecoins, tipos de token, 4 fases).
// Aqui só tem DADOS: nenhuma lógica, nenhum HTML. Para mudar um texto, mude aqui —
// a interface se adapta sozinha. As fontes de cada caso real ficam no próprio caso.

export const modulo2 = {
  id: 'modulo-2',
  titulo: 'Psicologia das memecoins & economia da atenção',
  resumo:
    'Memecoin não tem produto nem receita: o preço é feito de atenção. Este módulo ' +
    'mostra como essa atenção nasce, como ela some, e quais vieses do seu próprio ' +
    'cérebro fazem você comprar no topo e segurar no fundo.',

  objetivos: [
    'Entender por que o preço de uma memecoin depende de atenção, e não de fundamento.',
    'Reconhecer em você os vieses que fazem comprar no topo e segurar no prejuízo.',
    'Classificar tipos de token para saber o que você está olhando antes de agir.',
    'Visualizar as 4 fases do ciclo de vida de uma moeda e onde mora o risco em cada uma.',
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
        'Existe preço com chão embaixo e existe preço sem chão nenhum. A diferença entre os ' +
        'dois decide tudo o que vem depois neste módulo.',
      paragrafos: [
        'Token é o nome genérico de qualquer moeda criada dentro de uma blockchain — o ' +
          'registro público que o Módulo 1 apresentou. Memecoin é um tipo de token que não ' +
          'tem produto, receita nem promessa de utilidade: não existe empresa vendendo nada, ' +
          'não existe serviço cobrando mensalidade, não existe nada sendo entregue a ninguém. ' +
          'O que ela tem é uma piada, uma imagem ou um nome que muita gente resolveu levar a ' +
          'sério ao mesmo tempo. "Economia da atenção" é o nome dessa troca: o único ' +
          'combustível do preço é quanta gente está olhando.',
        'Compare com uma ação de empresa. Se o preço de uma ação cai demais, ainda existe ' +
          'alguma coisa embaixo dele: fábrica, contrato assinado, dinheiro em caixa, lucro que ' +
          'entra todo mês. Isso não impede a queda, mas cria um chão — um ponto abaixo do qual ' +
          'vender fica difícil de justificar. Numa memecoin não há nada disso. Embaixo do ' +
          'preço só tem atenção, e atenção não fica parada em lugar nenhum: ela é escassa e ' +
          'muda de lugar.',
        'Isso importa porque muda a pergunta que você deve fazer. Quando uma ação cai, faz ' +
          'sentido perguntar "o que aconteceu com a empresa?". Quando uma memecoin cai, essa ' +
          'pergunta não tem resposta, porque não existe empresa. A pergunta que funciona é ' +
          'outra: "para onde foi a atenção?". E quase sempre ela foi para outro token, ' +
          'lançado ontem, com uma piada mais nova. Você não está comprando um pedaço de um ' +
          'negócio; está apostando que mais gente vai olhar depois de você.',
        'Na tela, a atenção aparece em três agulhas que se mexem juntas. O volume é quanto ' +
          'dinheiro trocou de mãos naquele token num período. Os holders são as carteiras que ' +
          'detêm o token — é a palavra em inglês para "quem segura", e ela vai voltar em todo ' +
          'o hub. E as menções são quantas vezes o token foi citado nas redes. Quando as três ' +
          'sobem juntas, a atenção está chegando. Quando o preço ainda está alto mas as ' +
          'menções já caíram, a atenção já foi embora e o preço só não percebeu. Repare: ' +
          'nenhuma das três fala de lucro, de produto ou de receita. Não há o que medir desse ' +
          'lado, porque esse lado não existe.',
      ],
      quadro: [
        {
          rotulo: 'Market cap',
          texto:
            'Capitalização de mercado: o preço de uma unidade multiplicado por quantas ' +
            'unidades existem. É o número que diz o tamanho do token, e é por ele que se ' +
            'comparam moedas diferentes. Preço baixo não quer dizer token pequeno — um preço ' +
            'de centavos com bilhões de unidades dá um market cap grande.',
        },
        {
          rotulo: 'O "x": 2x, 5x, 10x',
          texto:
            'O "x" é multiplicação, não porcentagem. 10x quer dizer dez vezes o preço de ' +
            'partida; 2x, o dobro. Neste hub o "x" aparece tanto para descrever uma subida ' +
            'que já aconteceu quanto para marcar um alvo de venda combinado antes.',
        },
        {
          rotulo: 'Pump, dump e pump-and-dump',
          texto:
            'Pump é a alta rápida puxada por atenção. Dump é a venda em massa que vem logo ' +
            'depois. "Pump-and-dump" é o nome do par quando alguém organiza os dois de ' +
            'propósito: sobe com barulho e vende para quem chegou pelo barulho. As três ' +
            'palavras voltam nas próximas abas.',
          destaque: true,
        },
      ],
      exemplo: {
        titulo: 'Um dia inteiro de uma memecoin',
        passos: [
          'De manhã quase ninguém está olhando: volume baixo, menções que cabem nos dedos.',
          'Uma conta grande posta. Em horas o preço faz 10x — cada real virou dez, e quem ' +
            'entrou cedo está com dez vezes o que pôs.',
          'A multidão que chegou pelo post já está dentro. Não sobrou mais ninguém de fora ' +
            'para comprar.',
          'A atenção acha o próximo token. Sem comprador novo, cada venda empurra o preço ' +
            'para baixo, e ele volta ao ponto de partida no mesmo dia.',
          'Ninguém precisou de uma má notícia para isso acontecer. Bastou a atenção mudar de ' +
            'lugar.',
        ],
      },
      paragrafosFinais: [
        'O erro que essa ideia evita é o mais comum de todos: procurar um motivo de ' +
          'fundamento para uma queda que não tem fundamento nenhum. Quem pensa "o projeto é ' +
          'bom, o mercado é que não entendeu" fica segurando um token que já perdeu a única ' +
          'coisa que o sustentava. Subir 10x em horas e voltar ao ponto de partida no mesmo ' +
          'dia não é anomalia: é o funcionamento normal desse mercado.',
        'Quando você aceita isso, as regras dos próximos módulos deixam de parecer exagero e ' +
          'passam a parecer o mínimo. Nada aqui é recomendação de compra ou de venda — é ' +
          'descrição de como o preço se forma.',
      ],
    },
    {
      id: 'dopamina',
      titulo: 'Dopamina e reforço intermitente',
      emUmaFrase:
        'Ganhar às vezes, e não sempre, é o que mais prende. É o mesmo mecanismo das máquinas ' +
        'de aposta.',
      paragrafos: [
        'Dopamina é uma substância que o cérebro libera diante da chance de uma recompensa. ' +
          'Repare na palavra chance: ela não vem só quando você ganha, vem quando você acha ' +
          'que pode ganhar. Por isso o número subindo na tela já produz a sensação, mesmo ' +
          'antes de qualquer dinheiro entrar ou sair da sua conta.',
        'O cérebro aprende por repetição: ele registra o que você fez pouco antes da ' +
          'recompensa e manda repetir. Aqui a regra que ele aprende é curta — abrir o gráfico ' +
          'e clicar em comprar traz recompensa. Se a recompensa viesse sempre, o hábito seria ' +
          'fraco: bastaria um dia ruim para você desconfiar. Como ela vem às vezes, e sem hora ' +
          'marcada, o hábito fica muito mais forte. Isso tem nome: reforço intermitente. É a ' +
          'mesma lógica das máquinas de aposta, que pagam pouco e de vez em quando, e por isso ' +
          'são tão difíceis de largar.',
        'Duas palavras antes de seguir, porque elas voltam o tempo todo. Uma posição é o ' +
          'dinheiro que você tem parado dentro de um token: "abrir posição" é comprar, ' +
          '"fechar" é vender. Uma operação é o ciclo completo, da compra até a venda. Quando ' +
          'este módulo fala em "tamanho da posição", está falando de quanto do seu dinheiro ' +
          'está exposto naquele token ao mesmo tempo.',
        'O que faz esse mecanismo ser perigoso é que o estrago não aparece como perda: ' +
          'aparece como entusiasmo. Você não sente que está perdendo o controle, sente que ' +
          'está melhorando. Na prática, o sinal é a sua rotina mudando sem que você tenha ' +
          'decidido mudar nada — você abre o aplicativo em horários em que antes não abria, ' +
          'opera em dias em que não havia nada para operar, e passa a checar o preço em ' +
          'intervalos cada vez menores. Nenhum desses passos parece errado sozinho.',
      ],
      exemplo: {
        titulo: 'Como o laço aperta, passo a passo',
        passos: [
          'Você acerta algumas operações seguidas — nenhuma delas por um motivo que você ' +
            'saiba explicar por escrito.',
          'Passa a operar mais vezes, porque operar virou a parte boa do dia.',
          'Com posições maiores, porque o tamanho antigo agora parece tímido perto do que ' +
            'você "podia ter ganhado".',
          'E com menos checagem, porque checar atrasa a entrada e as últimas vezes deram ' +
            'certo sem checar.',
          'O ganho de ontem financia o erro de amanhã: o dinheiro que sobrou dos acertos é ' +
            'exatamente o que permite fazer a operação grande e sem checagem que devolve tudo.',
        ],
      },
      paragrafosFinais: [
        'O erro que essa ideia evita é o de ler uma sequência boa como prova de habilidade. ' +
          'Num mercado que se mexe tanto, acertar várias vezes seguidas acontece com quem sabe ' +
          'e com quem não sabe — e o cérebro não distingue as duas coisas, porque a dopamina é ' +
          'a mesma nos dois casos.',
        'Quem entende o mecanismo troca de pergunta. Sai de "estou ganhando?" e entra em "eu ' +
          'decidi isto, ou fui puxado até aqui?". É a segunda pergunta que protege a conta, e ' +
          'ela só tem resposta honesta se a decisão estiver escrita em algum lugar — que é ' +
          'exatamente o assunto da próxima seção.',
      ],
      detalhe: {
        titulo: 'de onde vem essa ideia',
        paragrafos: [
          'Esse padrão é descrito em literatura de divulgação e em artigos revisados por pares ' +
            'sobre jogo e investimento especulativo (disponíveis no PMC/NCBI).',
          'Aqui ele é usado de forma educacional, para você reconhecer o mecanismo. Não é ' +
            'material clínico, não serve para diagnóstico e não substitui ajuda profissional.',
        ],
      },
    },
    {
      id: 'antidoto',
      titulo: 'O antídoto não é força de vontade',
      emUmaFrase:
        'Você não vai conseguir ser outra pessoa na hora H. O que dá para fazer é chegar na ' +
        'hora H com a decisão já tomada.',
      paragrafos: [
        'Viés cognitivo é um atalho que o cérebro usa para decidir rápido. Não é burrice: é ' +
          'economia — sem atalhos, ninguém atravessaria a rua. O problema é que cada atalho ' +
          'erra sempre para o mesmo lado, e o mercado de memecoins é feito justamente do lado ' +
          'para onde eles erram. Como o erro é sistemático, ele é previsível. E porque é ' +
          'previsível, existe antídoto.',
        'O antídoto não é força de vontade, e vale entender por quê. Força de vontade é um ' +
          'recurso que acaba: ela depende de você estar descansado, sem pressa e sem plateia. ' +
          'Com o gráfico piscando, um grupo gritando e o preço subindo sem você, é exatamente ' +
          'quando ela está no fim. Contar com ela nesse momento é como combinar de fazer dieta ' +
          'e resolver isso na frente do bolo. Ninguém vence um viés cognitivo no impulso.',
        'O que funciona é mudar a hora da decisão. Você decide antes, frio, sem nada em risco ' +
          'naquele segundo, e deixa a decisão escrita. Na hora do impulso você não decide ' +
          'nada: você executa o que já estava escrito. A regra escrita é o seu "eu calmo" ' +
          'mandando no seu "eu empolgado" — e ela só manda se estiver escrita mesmo, porque ' +
          'uma regra lembrada de cabeça é uma regra negociável.',
        'Escrever antes quer dizer cinco coisas concretas, que estão na figura acima e voltam ' +
          'nos próximos módulos. Tese é a frase que explica por que este token subiria. ' +
          'Catálise é o evento concreto que faria isso acontecer, com data ou prazo — sem ' +
          'catálise clara não é tese, é aposta. Alvos de realização são os preços em que você ' +
          'já combinou vender um pedaço; realizar é justamente isso, transformar parte do ' +
          'lucro de tela em dinheiro de verdade. Tempo de espera é o intervalo entre "quero ' +
          'comprar" e "comprei": 5, 10 ou 30 minutos, o suficiente para o impulso passar e a ' +
          'tese continuar de pé — ou não. Teto de perda é quanto você aceita perder por ' +
          'operação e por dia; quando bate, você para de verdade, e não "só mais uma".',
      ],
      listaTitulo: 'Na prática:',
      lista: [
        'Escreva a tese e a catálise antes de comprar (Módulo 4). Sem catálise clara, é aposta.',
        'Defina os alvos de realização antes de entrar. Não depois de já estar no lucro.',
        'Imponha um tempo de espera (5, 10, 30 minutos) entre "quero comprar" e "comprei".',
        'Estabeleça um teto de perda por operação e por dia. Quando bater, pare de verdade.',
        'Nunca opere com dinheiro que faz falta. A maioria dos tokens vai a zero.',
      ],
      exemplo: {
        titulo: 'A mesma tarde, com e sem regra escrita',
        passos: [
          'Sem regra: o preço sobe, você compra em segundos e só depois começa a pensar em ' +
            'quanto vender e quando sair.',
          'Com regra: você escreve tese e catálise antes de qualquer clique. Se não conseguir ' +
            'escrever a catálise, a operação acaba ali — de graça.',
          'Com regra: você marca os alvos antes de entrar, por exemplo vender uma parte no 2x ' +
            'e outra parte no 5x, e anota o teto de perda daquela operação.',
          'Com regra: você deixa os 10 minutos de espera passarem. Se a tese continuar de pé ' +
            'depois deles, aí sim entra, com tamanho reduzido.',
          'No fim do mês a diferença não é ter acertado mais vezes. É que as perdas ficaram ' +
            'do tamanho que você escolheu, e não do tamanho que o susto escolheu.',
        ],
      },
      paragrafosFinais: [
        'O erro que essa ideia evita é o de achar que já se protegeu porque entendeu. ' +
          'Entender o viés não protege ninguém: a leitura acontece no seu "eu calmo" e o ' +
          'prejuízo acontece no seu "eu empolgado". Só a regra escrita atravessa os dois.',
        'E a regra é sua: ela depende do seu dinheiro e do seu prazo. Nada aqui é recomendação ' +
          'de compra ou de venda. O único item da lista acima que não admite ajuste é o ' +
          'último — a maioria dos tokens vai a zero, então nunca opere com dinheiro que faz ' +
          'falta.',
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
      texto: 'Produto, receita e caixa ficam embaixo do preço. Eles seguram um chão.',
      legenda: 'O bloco roxo é o chão: lucro e caixa.',
    },
    semChao: {
      rotulo: 'Memecoin',
      texto: 'Não há produto, receita nem utilidade. Embaixo do preço só tem atenção.',
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
      'voltar ao ponto de partida no mesmo dia — isso não é anomalia, é o funcionamento ' +
      'normal desse mercado.',
    // Alternativa em texto da figura inteira (leitor de tela).
    descricao:
      'Numa ação com empresa, produto, receita e caixa ficam embaixo do preço e seguram um ' +
      'chão. Numa memecoin não há produto, receita nem utilidade: embaixo do preço só tem ' +
      'atenção, e não existe chão. A atenção cresce, o preço cresce junto, a multidão acha o ' +
      'próximo token, a atenção vai embora e o preço vai atrás.',
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
      'Como a recompensa vem às vezes, e não sempre, o hábito fica mais reforçado — é o ' +
      '"reforço intermitente". Cada alta na tela libera dopamina, e o cérebro aprende que ' +
      'olhar o gráfico e clicar em comprar traz recompensa.',
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
        'Você vê o gráfico subindo sem você e sente que esta é a última chance da sua vida. ' +
        'Compra correndo, sem checar contrato, liquidez nem nada.',
      quandoAparece: 'Logo depois de um pump que você assistiu de fora.',
      antidoto:
        'Aceite que perder oportunidade é o custo normal de operar com regra — e que existe ' +
        'token novo toda hora. Use o tempo de espera: se depois de 10 minutos a tese ainda ' +
        'fizer sentido por escrito, aí sim considere entrar, com tamanho reduzido.',
      custo: 'É o mecanismo número 1 de compra no topo.',
    },
    {
      id: 'prova-social',
      nome: 'Prova social',
      subtitulo: 'Se todo mundo está comprando, deve estar certo',
      gatilho:
        'Milhares de posts, um grupo eufórico e vários influenciadores repetindo o mesmo ' +
        'ticker. Parece validação — e é só volume de vozes.',
      quandoAparece: 'Quando a timeline e os grupos são inundados pelo mesmo token.',
      antidoto:
        'Separe barulho de evidência. Volume de posts não é liquidez, não é número de holders ' +
        'e não é contrato auditável. Antes de dar peso a qualquer post, cheque LP, authorities ' +
        'e concentração dos maiores holders.',
      custo: 'Prova social é fabricável: bots e calls pagos custam pouco.',
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
        'O dinheiro já perdido não volta por você segurar. A pergunta certa não é "quanto eu ' +
        'já perdi?", é "com o preço de hoje, eu compraria este token agora?". Se a resposta ' +
        'for não, a posição não deveria existir.',
      custo: 'É o que transforma uma perda de 30% numa perda de 100%.',
    },
    {
      id: 'excesso-confianca',
      nome: 'Excesso de confiança',
      subtitulo: 'Três acertos seguidos e você acha que pegou o jeito',
      gatilho:
        'A sequência boa vira explicação: "eu tenho olho". O tamanho da posição dobra, a ' +
        'checagem encolhe e o horário de operar se estende madrugada adentro.',
      quandoAparece: 'Depois da sua melhor semana, nunca depois da pior.',
      antidoto:
        'Registre todas as operações, não só as boas. Em mercado de altíssima volatilidade, ' +
        'sequência de acertos é estatisticamente esperada mesmo sem habilidade nenhuma. ' +
        'Mantenha o tamanho da posição fixo por regra, não por humor.',
      custo:
        'A operação que quebra a banca costuma ser a maior — feita logo depois da melhor sequência.',
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
        'Inverta a assimetria por regra: alvos de realização parcial escalonados (parte no ' +
        '2x, parte no 5x) e um limite de perda definido antes da entrada. A decisão de sair ' +
        'não pode ser tomada no calor do gráfico.',
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
      'São cinco, e cada um age numa hora diferente: dois fazem você entrar, dois fazem você ' +
      'sair na hora errada, e um aumenta o tamanho da aposta sem você perceber.',
    paragrafos: [
      'A tabela acima lê cada viés em três tempos. "O que você pensa" é a frase que passa ' +
        'pela sua cabeça e parece razoável naquele momento. "O que acontece" é o resultado ' +
        'prático dessa frase na sua conta. "O que fazer" é o antídoto — e repare que todos os ' +
        'antídotos são coisas decididas antes, nunca reações no calor do gráfico.',
      'Os dois primeiros fazem você entrar. FOMO é a sigla do inglês fear of missing out, o ' +
        'medo de ficar de fora: você vê o gráfico subindo sem você e sente que esta é a última ' +
        'chance da sua vida. Prova social é o outro: mil pessoas repetindo o mesmo ticker ' +
        'parece confirmação, e é só volume de vozes. Ticker é o apelido curto do token, ' +
        'aquelas três ou cinco letras com um cifrão na frente. Ele não é único: qualquer ' +
        'pessoa pode lançar um token com o mesmo ticker. O que é único é o endereço do ' +
        'contrato, às vezes escrito como CA, de contract address — é ele que você confere, ' +
        'nunca o nome nem a imagem.',
      'O antídoto da prova social manda separar barulho de evidência, e para isso é preciso ' +
        'saber o que conta como evidência aqui. Nenhuma das quatro coisas do quadro abaixo se ' +
        'vê num post; todas se veem na página do token. Enquanto isso, o que se vê no post é ' +
        'barato de fabricar: bot é conta automatizada e call pago é post de divulgação ' +
        'comprado. Os dois custam pouco e produzem exatamente a aparência de multidão.',
      'Os dois seguintes agem depois que você já está dentro. Custo afundado é a tradução de ' +
        'sunk cost: o dinheiro já gasto vira argumento para gastar mais. Com a posição em ' +
        '−70%, vender parece assumir a perda, então você segura — e o que você está segurando ' +
        'não é o token, é a sensação de ainda não ter errado. Efeito disposição é o gêmeo ' +
        'dele: vender rápido o que sobe, para "garantir", e segurar para sempre o que cai, ' +
        'para "não perder". Parece prudência e é o contrário: corta os ganhos no começo e ' +
        'deixa as perdas correrem até o fim.',
      'O quinto age no tamanho. Depois de três acertos seguidos, a sequência vira explicação ' +
        '— "eu tenho olho" — e o tamanho da posição dobra enquanto a checagem encolhe. Só que ' +
        'em mercado de altíssima volatilidade (volatilidade é o tamanho das oscilações de ' +
        'preço) uma sequência de acertos é estatisticamente esperada mesmo sem habilidade ' +
        'nenhuma. É por isso que a operação que quebra a banca costuma ser a maior, feita ' +
        'logo depois da melhor sequência, e nunca depois da pior.',
    ],
    quadro: [
      {
        rotulo: 'Liquidez e LP',
        texto:
          'Liquidez é quanto dinheiro está disponível no par de negociação para absorver ' +
          'compras e vendas. Com pouca liquidez, a sua própria venda derruba o preço. LP é a ' +
          'sigla de liquidity pool, o depósito que segura essa liquidez.',
      },
      {
        rotulo: 'Holders',
        texto:
          'As carteiras que detêm o token. O que interessa não é o total de holders, é quanto ' +
          'os maiores detêm juntos: se poucas carteiras seguram muito, elas decidem sozinhas ' +
          'o que acontece com o preço.',
      },
      {
        rotulo: 'Authorities',
        texto:
          'As permissões que sobraram no contrato do token. As duas que importam são a de ' +
          'criar novas unidades e a de congelar as unidades que estão na sua carteira. ' +
          'Revogar quer dizer abrir mão dessas permissões em definitivo.',
      },
      {
        rotulo: 'O que nada disso é',
        texto:
          'Volume de posts não é liquidez, não é número de holders e não é contrato ' +
          'auditável. Um post pode te dar entusiasmo; ele não consegue te dar nenhum dos três.',
        destaque: true,
      },
    ],
    exemplo: {
      titulo: 'O mês de quem acertou mais do que errou e mesmo assim perdeu',
      passos: [
        'Duas posições sobem 20%. Você realiza as duas "para garantir": dois ganhos pequenos ' +
          'no bolso.',
        'Uma terceira cai 60%. Você segura "para não perder", porque vender seria assumir a ' +
          'perda.',
        'Ela continua caindo e chega a −70%. Agora vender parece ainda mais impossível: "já ' +
          'perdi tanto que agora tenho que esperar voltar".',
        'A atenção migrou para outro token e não volta. A perda de 30% que dava para cortar ' +
          'no começo virou perda de 100%.',
        'No placar você acertou mais vezes do que errou. Na conta, o mês fechou no vermelho: ' +
          'os ganhos foram pequenos e a perda foi inteira.',
      ],
    },
    paragrafosFinais: [
      'O erro que essa tabela evita é o de tratar cada uma dessas frases como opinião sua. ' +
        'Elas não são: são atalhos que aparecem na cabeça de todo mundo, na mesma ordem e nas ' +
        'mesmas horas. Reconhecer a frase — "é a última chance", "todo mundo está comprando", ' +
        '"já perdi tanto que agora tenho que esperar" — é o sinal de que o viés está agindo, ' +
        'e não de que você pensou.',
      'E o antídoto de todos eles é o mesmo: precisa estar escrito antes. No momento em que ' +
        'você mais precisa dele, já não dá para escrever.',
    ],
    detalhe: {
      titulo: 'os nomes em inglês, para procurar depois',
      paragrafos: [
        'Se quiser ler sobre cada um fora daqui, os nomes em inglês são: FOMO (fear of ' +
          'missing out), social proof (prova social), sunk cost (custo afundado), ' +
          'overconfidence (excesso de confiança) e disposition effect (efeito disposição).',
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
      'O fluxograma acima é para usar no momento exato em que a vontade aparece, não depois. ' +
        'São três perguntas, cada uma com uma saída que reprova. Não é teste de caráter, é ' +
        'filtro. Ele existe porque, no minuto em que o preço está subindo, você não consegue ' +
        'avaliar nada com calma — mas consegue, sim, responder sim ou não a três perguntas ' +
        'curtas.',
      'A primeira é a mais importante: a vontade nasceu do gráfico já ter subido? Se a ' +
        'resposta for sim, é FOMO por definição. Repare na inversão de tempo. Numa decisão ' +
        'com tese, você primeiro encontra um motivo e só então olha o preço. No FOMO, o preço ' +
        'é o motivo. Aí o antídoto é um só, e é de relógio: espere 10 minutos antes de ' +
        'qualquer clique. Dez minutos não fazem você perder nada que valesse a pena — se a ' +
        'única coisa que a operação tinha era pressa, ela não tinha nada.',
      'A segunda pergunta cobra o que a seção anterior pediu: existe tese e catálise ' +
        'escritas, de antes? "De antes" quer dizer antes de o preço subir, e não escritas ' +
        'agora para justificar a vontade de agora — essa diferença é a coisa mais fácil de ' +
        'burlar e a mais cara de burlar. Sem catálise clara, é aposta, e aposta não entra.',
      'A terceira cobra a saída: os alvos de realização e o limite de perda já estão ' +
        'definidos? Definir depois de já estar no lucro não vale, porque aí quem define é a ' +
        'euforia. E passar nas três não é autorização para comprar: ainda falta a checagem ' +
        'técnica do token — contrato, liquidez, concentração de holders — que é assunto do ' +
        'Módulo 3 e do Checklist. Passar nas três só quer dizer que a sua cabeça está em ' +
        'condições de fazer essa checagem.',
    ],
    exemplo: {
      titulo: 'Os 10 minutos, na prática',
      passos: [
        'É noite. Um token que você nunca viu aparece na sua timeline com o gráfico em pé.',
        'Você sente que precisa comprar agora. Primeira pergunta respondida: a vontade nasceu ' +
          'do gráfico. É FOMO.',
        'Em vez de clicar, você marca 10 minutos e usa esse tempo para tentar escrever a tese ' +
          'e a catálise.',
        'Se aos 10 minutos você não conseguiu escrever que evento concreto faria o preço ' +
          'subir, a resposta da segunda pergunta é não — e a operação morre ali, sem custar ' +
          'nada.',
        'Se conseguiu escrever, ainda faltam os alvos e o limite de perda antes de entrar. E ' +
          'a entrada é com tamanho reduzido.',
      ],
    },
    paragrafosFinais: [
      'O erro que esse filtro evita é o de confundir oportunidade perdida com prejuízo. ' +
        'Perder uma alta não tira dinheiro da sua conta; entrar sem tese tira. Aceite que ' +
        'perder oportunidade é o custo normal de operar com regra — e que existe token novo ' +
        'toda hora.',
      'A aba seguinte mostra três casos em que a oportunidade que "não dava para perder" ' +
        'durou horas. Quem ficou de fora não perdeu nada.',
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
      'Saber que tipo você está olhando muda a pergunta que você faz. Cada um tem um motor ' +
      'de atenção diferente — e 8 dos 10 são risco alto.',
    paragrafos: [
      'Classificar aqui não é decorar. A utilidade de saber o tipo é que cada tipo tem um ' +
        'motor de atenção diferente — quer dizer, um motivo diferente para as pessoas ' +
        'olharem — e motores diferentes quebram de jeitos diferentes. Um token que vive de ' +
        'uma notícia morre quando a notícia envelhece. Um token que vive de um meme antigo ' +
        'aguenta mais tempo, porque o meme não depende de cripto para existir. A pergunta ' +
        'que você faz muda junto com o motor.',
      'São 5 categorias e 10 tipos no mapa acima. "IA / agentes de IA" reúne os tokens que se ' +
        'apresentam como inteligência artificial: de um lado o agente de verdade, um programa ' +
        'com personalidade fixa que publica sozinho nas redes; do outro a narrativa "IA" sem ' +
        'produto nenhum, em que a sigla é só marketing. "Comunidade / CTO" junta o token que ' +
        'nasce de um grupo que já existia antes dele e o CTO. CTO é sigla de community ' +
        'takeover, tomada pela comunidade: o criador abandona o projeto e um grupo de ' +
        'voluntários assume as redes e o site, enquanto o token continua exatamente o mesmo.',
      '"Memes orgânicos e culturais" são os que existiam fora de cripto antes de virar moeda. ' +
        '"Narrativas virais" são os oportunistas: o token de notícia e o token que copia o ' +
        'formato do que está dando certo no launchpad do momento — launchpad é o site onde ' +
        'qualquer pessoa cria e lança um token em minutos. E "Figuras públicas" separa o ' +
        'token que a própria pessoa anunciou daquele que usa o nome dela sem autorização ' +
        'nenhuma.',
      'Três palavras aparecem nos alertas dos cards e vale fixar agora. Dev é o ' +
        'desenvolvedor, quem criou o token. Supply é a quantidade total de unidades que ' +
        'existem daquele token — e o que importa não é o número em si, é quanto dele está na ' +
        'mão de poucos, porque quem tem muito pode vender tudo de uma vez. Rug pull, ou só ' +
        'rug, é quando quem está por dentro tira a liquidez ou despeja o supply de uma vez e ' +
        'o preço vai a praticamente nada em segundos: "puxar o tapete", ao pé da letra.',
      'Repare no que o mapa não tem: nenhum tipo é risco baixo. 8 dos 10 são risco alto, e os ' +
        'dois que ficam em risco médio são médios por motivos limitados. O token de ' +
        'comunidade nativa é médio porque comunidade real reduz o risco de rug — há gente com ' +
        'nome e reputação envolvida — mas comunidade não sustenta preço sozinha: atenção de ' +
        'fora ainda precisa chegar. E o meme cultural de longa duração é médio porque ser ' +
        'antigo não impede quedas de 90%; só torna o desaparecimento total um pouco menos ' +
        'provável.',
    ],
    exemplo: {
      titulo: 'O teste dos 30 segundos, e os dois extremos do mapa',
      passos: [
        'Um token se apresenta como projeto de IA. O site fala em modelos, agentes e roadmap ' +
          '— roadmap é a lista de entregas prometidas, dividida por trimestre.',
        'Abra o produto e tente usar. Se em 30 segundos você não conseguiu usar nada, o ' +
          'produto é o token.',
        'Procure o repositório público, que é o lugar onde o código fica aberto para qualquer ' +
          'um ler. Se não existe, não há como conferir se existe tecnologia.',
        'No outro extremo: o meme do Shiba Inu é de 2013 e o token DOGE nasceu no mesmo ano. ' +
          'Alguém que nunca ouviu falar de blockchain reconhece a imagem.',
        'No meio fica a maioria. A WIF nasceu da imagem de um cão de gorro, arte única e ' +
          'reconhecível, sem história anterior fora de cripto — e com dezenas de cópias de ' +
          'mesmo nome e mesma arte aparecendo em horas.',
      ],
    },
    paragrafosFinais: [
      'O erro que o mapa evita é o de olhar todo token com a mesma pergunta. Quem pergunta ' +
        '"isso é bom?" não chega a lugar nenhum, porque nada aqui tem fundamento para ser ' +
        'bom. Quem pergunta "de onde vem a atenção deste, e o que a faria acabar?" já sabe ' +
        'onde olhar.',
      'E uma regra vale para os dez: confira sempre o contrato, nunca o nome nem a imagem. ' +
        'Impersonação — usar nome, rosto ou marca de alguém sem autorização — é o padrão, e ' +
        'não a exceção. Sem anúncio no canal oficial da pessoa, assuma que é falso. Os nomes ' +
        'citados aqui aparecem como exemplo de categoria, não como indicação.',
    ],
    detalhe: {
      titulo: 'duas ressalvas que não cabem no mapa',
      paragrafos: [
        'No CTO, nem toda tomada pela comunidade vinga — e o supply que o dev original tinha ' +
          'continua existindo. Vale checar se ele já vendeu ou se ainda pode vender: um ' +
          'projeto "adotado" não apaga o que ficou na carteira de quem saiu.',
        'Os tokens de agente de IA são uma categoria consolidada desde 2024, mas os nomes ' +
          'específicos mudam a cada ciclo; por isso o mapa descreve o tipo e não fica preso a ' +
          'exemplos que envelhecem. Automatizar posts é barato e não exige tecnologia ' +
          'própria: "ter um agente" não é diferencial técnico nem garantia de nada.',
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
        'Um bot com personalidade própria posta sozinho nas redes e tem um token associado. ' +
        'O produto é o próprio personagem: o token vale enquanto o personagem chamar atenção.',
      comoReconhecer:
        'Conta automatizada com identidade fixa, publicando sem parar, e um contrato ' +
        'divulgado na bio do perfil.',
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
        'Usa a palavra IA no nome, na arte e no texto de divulgação, sem nenhum agente, ' +
        'modelo ou produto por trás. A IA é o marketing.',
      comoReconhecer:
        'Site com jargão genérico, nenhum repositório público, nenhuma demonstração ' +
        'funcionando e roadmap cheio de trimestres vagos.',
      exemplos: [],
      risco: 'alto',
      alerta: 'Se você não consegue usar o produto em 30 segundos, o produto é o token.',
    },
    {
      id: 'cto',
      nome: 'CTO (community takeover)',
      categoria: 'comunidade',
      descricao:
        'O criador abandona o projeto e a comunidade assume: novas redes sociais, novo site, ' +
        'novos organizadores. O token continua o mesmo; quem cuida dele é que muda.',
      comoReconhecer:
        'Anúncio público do takeover, contas oficiais transferidas e dev original sumido ' +
        'ou tendo renunciado ao controle.',
      exemplos: [],
      risco: 'alto',
      alerta:
        'Nem todo CTO vinga. E o supply que o dev original tinha continua existindo — cheque ' +
        'se ele já vendeu ou se ainda pode vender.',
    },
    {
      id: 'comunidade-nativa',
      nome: 'Token de comunidade nativa',
      categoria: 'comunidade',
      descricao:
        'Nasce de um grupo que já existia antes do token: um servidor de Discord, um fórum, ' +
        'uma cena local. A comunidade não foi comprada, ela veio junto.',
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
        'O meme existia e já era popular muito antes do token. O token é a expressão ' +
        'financeira de algo que a cultura carrega há anos.',
      comoReconhecer:
        'O meme sobrevive fora do universo cripto — alguém que nunca ouviu falar de ' +
        'blockchain reconhece a imagem.',
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
        'Nasce nas horas seguintes a um acontecimento: uma declaração, um vídeo, um ' +
        'escândalo. Aposta num pico curto de busca e de conversa.',
      comoReconhecer: 'Lançado poucos minutos depois da notícia; o nome copia a manchete.',
      exemplos: [],
      risco: 'alto',
      alerta:
        'Janela de atenção curtíssima e vários tokens disputando o mesmo assunto. Costuma ' +
        'haver mais vendedor do que comprador já na primeira hora.',
    },
    {
      id: 'tendencia-plataforma',
      nome: 'Token de tendência de plataforma',
      categoria: 'narrativa',
      descricao:
        'Copia o formato do que está performando no launchpad da vez — mesmo tema, mesma ' +
        'estética, mesma mecânica — para pegar carona no fluxo de quem garimpa ali.',
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
        'Lançado, assinado ou publicamente endossado pela própria pessoa. Endosso real, ' +
        'risco real: os casos mais documentados de 2025 são exatamente desse tipo.',
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
        'Usa nome, rosto ou marca de alguém sem autorização nenhuma, contando com a confusão ' +
        'para atrair compradores.',
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
        'Em cerca de 24 horas virou a segunda maior memecoin do mercado, atrás apenas do ' +
        'Dogecoin. Depois despencou e passou a operar por uma fração do topo.',
      numeros: [
        { rotulo: 'Pico de preço', valor: 'cerca de US$ 73 a US$ 75' },
        { rotulo: 'Pico de market cap', valor: 'cerca de US$ 15 bilhões em ~24h' },
        { rotulo: 'Posição atingida', valor: '2ª maior memecoin naquele momento' },
        { rotulo: 'Queda registrada', valor: 'mais de 96% abaixo do topo (perto de US$ 2,27)' },
      ],
      fontes: ['CoinGecko'],
      licao:
        'A atenção máxima aconteceu no primeiro dia. Quem chegou no segundo dia comprou de ' +
        'quem estava saindo.',
    },
    {
      id: 'melania',
      nome: 'MELANIA MEME',
      ticker: 'MELANIA',
      chain: 'Solana',
      data: 'Lançada em janeiro de 2025',
      resumo:
        'Lançada poucos dias depois da TRUMP, aproveitando a mesma onda de atenção. A queda ' +
        'foi mais rápida e mais profunda.',
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
        'O segundo token da mesma narrativa aproveita a atenção que sobrou — e ela sobra ' +
        'por muito menos tempo.',
    },
    {
      id: 'libra',
      nome: 'LIBRA',
      ticker: 'LIBRA',
      chain: 'Solana',
      data: '14/02/2025, Argentina',
      resumo:
        'Promovida publicamente pelo presidente argentino Javier Milei. Subiu e desabou no ' +
        'mesmo dia, com evidência on-chain de saques de insiders. Virou investigação de ' +
        'fraude na Argentina.',
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
    'Hype e endosso de celebridade não garantem durabilidade. Nos três casos o pico de ' +
    'atenção durou horas, e quem comprou perto do topo ficou com o prejuízo quando a ' +
    'atenção migrou. É o padrão clássico de pump-and-dump — só que com nomes conhecidos ' +
    'no anúncio.',

  // Não aparece na tela desde o redesenho (o desenho não tem esta nota; a nota
  // da linha do tempo, em `linhaDoTempoCasos`, diz o mesmo sobre as fontes).
  notaDosCasos:
    'Números registrados pelas fontes citadas, nas datas indicadas. Cotação muda todo dia; ' +
    'fato histórico, não. Nada aqui é recomendação de compra ou de venda.',

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
        'Alguém consegue tirar a liquidez? (No pump.fun, a pool pós-graduação é do protocolo; fora dele, trava não prova que é seguro.)',
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
      'As quatro fases são um jeito de organizar o que você está vendo, não uma profecia. ' +
        'Elas descrevem o caminho completo de um token que dá certo por algum tempo: nasce, ' +
        'se acalma, ganha atenção nova e depois perde tudo. A maioria não faz esse caminho. A ' +
        'utilidade do modelo não é adivinhar a próxima fase; é saber qual pergunta fazer na ' +
        'fase em que você está.',
      'No Lançamento tudo acontece em minutos. A idade do token se mede em minutos, há um ' +
        'punhado de holders e o volume vem de bots e de snipers — sniper é um programa feito ' +
        'para comprar no primeiro segundo do lançamento, antes de qualquer pessoa. O preço ' +
        'sai de uma bonding curve ou do primeiro pool. Bonding curve é uma regra automática ' +
        'em que o preço sobe conforme as pessoas compram e cai conforme vendem, sem precisar ' +
        'de ninguém do outro lado; pool é o depósito onde o token e o dinheiro ficam juntos ' +
        'para as trocas acontecerem. Nessa fase as checagens são todas sobre o contrato: dá ' +
        'para alguém tirar a liquidez? As permissões de criar novas unidades (mint) e de ' +
        'congelar (freeze) foram revogadas? Quanto os maiores holders detêm juntos? Houve ' +
        'compras em bloco, os bundles — várias compras enfiadas na mesma transação, para o ' +
        'mesmo dono parecer muita gente?',
      'Vale guardar duas palavras que voltam logo abaixo. Pump.fun é um launchpad de ' +
        'memecoins, e é de lá que vêm os números que acompanham este card. Graduação é o ' +
        'momento em que um token junta compradores suficientes e sai da bonding curve para ' +
        'uma pool normal numa DEX — DEX é corretora descentralizada, um site onde as trocas ' +
        'acontecem direto entre carteiras, sem empresa no meio guardando o seu dinheiro. E ' +
        'atenção à ressalva da própria checagem: no pump.fun, a pool que nasce depois da ' +
        'graduação é do protocolo; fora dele, ver a liquidez travada não prova que é seguro.',
      'Na Consolidação o preço lateraliza, quer dizer, anda de lado, sem altas nem quedas ' +
        'violentas. Quem estava só pelo pump vai embora, e quem fica começa a virar ' +
        'comunidade. As perguntas mudam de contrato para gente: a comunidade é de verdade ou ' +
        'são bots repetindo a mesma frase? O dev continua presente e comunicando? Existe ' +
        'alguma catálise concreta marcada para acontecer? Na Expansão por catálise, um evento ' +
        'concreto traz atenção nova — uma listagem (quando uma corretora passa a oferecer o ' +
        'token), um post de conta grande, a graduação para a DEX — e o preço destrava. A ' +
        'pergunta mais útil aqui é desconfortável: a catálise que chegou é a que você tinha ' +
        'previsto, ou é outra? Se for outra, você acertou por sorte, e sorte não se repete ' +
        'por método.',
      'Na Degradação a atenção já migrou. Volume caindo junto com o preço, holders ' +
        'diminuindo, grupo esvaziando ou virando reclamação, máximas cada vez mais baixas — ' +
        'máxima é o ponto mais alto que o preço tocou num período, e uma sequência de máximas ' +
        'mais baixas é o desenho de quem está indo embora. Sem atenção não há comprador; sem ' +
        'comprador o preço só tem um caminho. As duas perguntas desta fase são as mais curtas ' +
        'do módulo: eu compraria este token pelo preço de hoje? Se a resposta é não, por que ' +
        'eu ainda estou dentro?',
      'Repare onde estão os riscos altos: 2 de 4, no começo e no fim. No Lançamento o risco é ' +
        'comprar nos primeiros segundos disputando com bots que enxergam o lançamento antes ' +
        'de você e já estão posicionados quando a sua ordem chega. Na Degradação o risco é ' +
        'não sair, por custo afundado, segurando "até voltar" — é nesta fase que a maior ' +
        'parte do capital de quem está começando é destruída. As duas fases do meio são risco ' +
        'médio e têm armadilhas próprias: confundir consolidação com garantia (muito token ' +
        'lateraliza e morre ali, sem nunca ter uma fase 3) e entrar no meio da expansão ' +
        'achando que ainda é a fase 2, comprando de quem já vai realizar.',
      '"A maioria vai a zero" é a frase mais repetida deste hub, e ela precisa de uma ' +
        'explicação honesta, porque o número depende da régua. Nenhuma das fontes que ' +
        'acompanham este card mede o preço chegando literalmente a zero. Uma mede quantos ' +
        'tokens simplesmente param de negociar; a outra mede quantos ficam com a liquidez ' +
        'abaixo de um valor mínimo, que é quando não há mais como vender sem derrubar tudo. ' +
        'São réguas diferentes, dão números diferentes, e as duas descrevem a mesma coisa na ' +
        'prática: o token continua existindo e não dá mais para sair dele. É isso que "vai a ' +
        'zero" quer dizer.',
    ],
    paragrafosFinais: [
      'O erro que as quatro fases evitam é o de usar a mesma cabeça o tempo todo. A pergunta ' +
        'que protege no Lançamento ("dá para alguém tirar a liquidez?") não serve de nada na ' +
        'Degradação, e a pergunta que salva na Degradação ("eu compraria isto hoje?") não faz ' +
        'sentido no minuto zero de um token. Antes de decidir qualquer coisa, decida em que ' +
        'fase você está olhando.',
      'E lembre da moldura: isto é modelo didático, não previsão. Muitos tokens pulam fases, ' +
        'a maioria não passa da primeira, e nada aqui é recomendação de compra ou de venda.',
    ],
    detalhe: {
      titulo: 'por que os dois números não batem entre si',
      paragrafos: [
        'Os dois números que acompanham este card medem coisas diferentes, e por isso não ' +
          'batem: um mede tokens que pararam de negociar, o outro mede tokens que ficaram sem ' +
          'liquidez. Nenhum dos dois mede preço zerado, e nenhum dos dois mede fraude. Quando ' +
          'alguém disser um número sozinho, a primeira pergunta a fazer é qual régua ele usou.',
        'A plataforma citada contestou publicamente um desses relatórios, e a contestação ' +
          'está registrada ao lado do número, com fonte e data. Os dois lados ficam à vista de ' +
          'propósito: o número é forte o bastante para orientar o tamanho da sua posição, e ' +
          'frágil o bastante para não virar acusação.',
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
        nota: 'Não fundamento: atenção. "O preço é feito de olhos" — quando a atenção migra, o preço vai junto.',
      },
      {
        rotulo: 'Fases de um ciclo típico',
        valor: '4',
        nota: 'Lançamento, consolidação, expansão por catálise, degradação. Muitos tokens pulam fases — e a maioria não passa da primeira.',
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
        nota: 'FOMO, prova social, custo afundado, excesso de confiança e efeito disposição. Cada um tem gatilho, momento e antídoto.',
      },
      {
        rotulo: 'Mecanismo nº 1 de compra no topo',
        valor: 'FOMO',
        nota: 'Você vê o gráfico subindo sem você e sente que é a última chance. Compra correndo, sem checar nada.',
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
        nota: 'Em 5 categorias: IA, comunidade, memes culturais, narrativas virais e figuras públicas. Cada um com um motor de atenção diferente.',
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
        nota: '"Se você não consegue usar o produto em 30 segundos, o produto é o token." Vale para toda narrativa "IA" sem produto.',
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
        nota: 'Quem comprou perto do topo ficou com o prejuízo quando a atenção migrou. Pump-and-dump com nomes conhecidos.',
        tom: 'alerta',
      },
    ],

    fases: [
      {
        rotulo: 'Fases com risco alto',
        valor: '2 de 4',
        nota: 'Lançamento e degradação — o começo e o fim. É onde a atenção está no extremo, e onde mais se perde.',
        tom: 'alerta',
      },
      {
        rotulo: 'Tempo de vida de um lançamento',
        valor: 'Minutos',
        nota: 'Idade medida em minutos, punhado de holders, volume de bots e snipers. Nenhum histórico para comparar.',
      },
      {
        rotulo: 'O que muda a pergunta certa',
        valor: 'A fase',
        nota: 'Saber em que fase você está muda o que perguntar. É modelo didático, não previsão — muitos tokens pulam fases.',
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
          'urgência. Nem todo barulho é armado — às vezes a empolgação é sincera. Mas o ' +
          'barulho armado tem forma fixa, e é a forma que você aprende a reconhecer aqui. O ' +
          'post acima é esquemático: nenhum perfil ou token real foi copiado.',
        'Cada elemento marcado está ali de propósito, mirando um viés específico dos cinco da ' +
          'tabela anterior. O texto sem tese mira o FOMO: "vai 100x", "não fique de fora", ' +
          'nenhum evento concreto, nenhum prazo, só o preço como motivo. O print do gráfico ' +
          'mira o FOMO também, de outro jeito — ele mostra o que você perdeu, não o que vem, ' +
          'e quem posta comprou antes do print. As métricas miram a prova social: milhares de ' +
          'curtidas e dezenas de "eu comprei" que custam pouco para fabricar. E o perfil ' +
          'grande e verificado mira a autoridade que você empresta automaticamente a quem tem ' +
          'muitos seguidores, mesmo sabendo que ele muitas vezes recebe pelo post ou comprou ' +
          'antes.',
        'Repare que dois campos estão marcados em cor de alerta, e que eles funcionam em ' +
          'par. O endereço do contrato na bio é onde o impostor mora: como o ticker é só ' +
          'apelido e qualquer um pode repetir, quem busca pelo nome pode comprar o token ' +
          'errado — e é o post que escolhe qual endereço você vai copiar. A pressa é o outro: ' +
          '"últimas horas antes da listagem" existe para impedir exatamente a espera de 10 ' +
          'minutos que o antídoto do FOMO pede. Urgência e endereço andam juntos porque a ' +
          'pressa serve para você colar o endereço sem conferir na fonte oficial, que é o que ' +
          'o Módulo 1 mandou fazer.',
      ],
      exemplo: {
        titulo: 'Lendo o mesmo post duas vezes',
        passos: [
          'Primeira leitura, sem método: perfil grande, gráfico subindo, milhares de ' +
            'curtidas, gente dizendo "eu comprei" e uma listagem chegando. Parece oportunidade ' +
            'com confirmação de todos os lados.',
          'Segunda leitura, elemento por elemento: a promessa não tem evento concreto nem ' +
            'prazo, só o preço como motivo.',
          'O print é de uma alta que já aconteceu, e quem postou comprou antes dela.',
          'As curtidas e os "eu comprei" são compráveis: bots e calls pagos custam pouco.',
          'O perfil grande pode ter sido pago ou ter comprado antes — endosso não é análise.',
          'Sobra o quê? Um endereço na bio e uma pressa. Nenhuma tese, nenhuma catálise e ' +
            'nenhuma checagem possível a partir do post.',
        ],
      },
      paragrafosFinais: [
        'O erro que essa leitura evita é o de tratar entusiasmo como informação. Entusiasmo é ' +
          'barato de produzir e não diz nada sobre liquidez, sobre concentração de holders ou ' +
          'sobre o que sobrou no contrato — as únicas coisas que você consegue conferir ' +
          'sozinho, e nenhuma delas cabe num post.',
        'E vale a direção do exercício: ele é defensivo, na lógica do módulo. A ideia é ' +
          'reconhecer, não produzir.',
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
          texto: '"Vai 100x", "não fique de fora". Nenhum evento concreto, nenhum prazo — só o preço como motivo. É o FOMO sendo fabricado, não descrito.',
        },
        {
          painel: 'grafico',
          titulo: 'O gráfico que já subiu',
          texto: 'Print de vela verde é a isca do FOMO: mostra o que você perdeu, não o que vem. Quem posta comprou antes do print.',
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
      'Os três casos abaixo não estão aqui como fofoca nem como denúncia. Estão porque são os ' +
        'mais documentados de 2025 e porque mostram, com número e data, o que as abas ' +
        'anteriores explicaram em teoria: atenção que chega de repente também vai embora de ' +
        'repente. Os três são da mesma chain — chain é a blockchain em que o token vive, e ' +
        'aqui é a Solana nos três — e os três tiveram endosso de figura pública no anúncio.',
      'A OFFICIAL TRUMP foi lançada em 17/01/2025. Em cerca de 24 horas virou a segunda maior ' +
        'memecoin do mercado, atrás apenas do Dogecoin, com pico de market cap perto de US$ ' +
        '15 bilhões e preço no topo entre cerca de US$ 73 e US$ 75. A lição não está na ' +
        'subida, está no calendário: a atenção máxima aconteceu no primeiro dia. Quem chegou ' +
        'no segundo dia comprou de quem estava saindo. Depois, o token passou a operar mais ' +
        'de 96% abaixo do topo, perto de US$ 2,27 (CoinGecko).',
      'A MELANIA MEME veio poucos dias depois, em janeiro de 2025, aproveitando a mesma onda ' +
        'de atenção. O segundo token de uma narrativa sempre pega a atenção que sobrou, e ela ' +
        'sobra por muito menos tempo: o pico de preço ficou perto de US$ 13,73 e o market cap ' +
        'saiu de cerca de US$ 1,73 bilhão para cerca de US$ 164 milhões. Em 06/02/2025 a ' +
        'queda já era de cerca de 90% (Bloomberg) e, até dezembro de 2025, passava de 99% do ' +
        'pico (Messari).',
      'A LIBRA é o caso mais curto e o mais grave. Lançada em 14/02/2025 na Argentina e ' +
        'promovida publicamente pelo presidente Javier Milei, chegou a um pico de market cap ' +
        'de cerca de US$ 4,56 bilhões no mesmo dia e caiu cerca de 94%, para cerca de US$ 257 ' +
        'milhões, em cerca de 11 horas. Dois números explicam a velocidade. Cerca de 82% do ' +
        'supply já estava desbloqueado no lançamento (Bubblemaps) — quer dizer, disponível ' +
        'para venda desde o primeiro minuto, sem nenhuma trava de tempo. E cerca de 8 ' +
        'carteiras de insiders sacaram cerca de US$ 107 milhões (Lookonchain). Insider é quem ' +
        'estava por dentro antes do público; on-chain quer dizer que esses saques ficam ' +
        'registrados na blockchain, à vista de qualquer pessoa que saiba olhar. O caso virou ' +
        'investigação de fraude na Argentina.',
      'Junte as duas coisas que a LIBRA teve ao mesmo tempo: concentração de supply e endosso ' +
        'de autoridade, na mesma operação. São exatamente as duas coisas que você aprende a ' +
        'checar neste hub, falhando juntas em 11 horas. E repare no espaço entre os marcos da ' +
        'linha do tempo acima: entre o lançamento da TRUMP e a queda da MELANIA foram ' +
        'semanas; entre a LIBRA nascer e a LIBRA cair, foram horas dentro do mesmo dia.',
    ],
    paragrafosFinais: [
      'O erro que esses três casos evitam é o de ler nome conhecido como garantia. É o ' +
        'contrário: o nome conhecido é o que faz a atenção chegar toda de uma vez, e atenção ' +
        'que chega toda de uma vez não tem para onde crescer depois. Endosso concentra ' +
        'atenção num pico curto e depois a leva embora junto.',
      'Os números acima foram registrados pelas fontes citadas, nas datas indicadas. Cotação ' +
        'muda todo dia; fato histórico, não. Nada aqui é recomendação de compra ou de venda, ' +
        'e os nomes aparecem como exemplo de categoria, não como julgamento de pessoa.',
    ],
    detalhe: {
      titulo: 'por que a MELANIA aparece só com o mês',
      paragrafos: [
        'Na linha do tempo, dois marcos têm só o mês no arquivo (01/2025 e 12/2025), porque ' +
          'foi só isso que a fonte registrou. Quando não dá para contar os dias, o intervalo ' +
          'não é chutado: ele aparece como "cerca de", como "no mesmo mês", ou simplesmente ' +
          'não aparece. Quando o dado não existe, o espaço fica vazio — e não preenchido por ' +
          'estimativa.',
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
      'Números registrados pelas fontes citadas em cada caso, nas datas indicadas. Fato ' +
      'histórico, não recomendação. Dois marcos têm só o mês no arquivo (01/2025 e 12/2025): ' +
      'quando o arquivo não permite contar os dias, o intervalo aparece como "cerca de" ou ' +
      'como "no mesmo mês", e onde nem isso dá para dizer ele não aparece.',
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
