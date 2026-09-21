# Módulo 2 — texto reescrito

O módulo inteiro tem hoje **1.243 caracteres de texto corrido** (`paragrafos` + `paragrafosFinais`), repartidos em três seções apenas: `atencao` (576), `dopamina` (376) e `antidoto` (291). Os outros seis cards do módulo — tabela dos vieses, fluxo do FOMO, mapa dos tipos, post de hype, casos reais e as 4 fases — têm **zero**: só título, uma frase e o visual. Pior: o view passa `omitir: ['paragrafos']` nas três seções que têm texto, então hoje **nenhum parágrafo do módulo aparece na tela**. O que o dono lê é legenda de figura, e por isso o módulo parece raso. Abaixo, cada card ganha a estrutura completa (o que é → por que importa para mim → como aparece na prática → exemplo com números → o erro que evita), com todo jargão em inglês traduzido na estreia.

---

## atencao

ANTES: 5 parágrafos soltos, um deles de uma linha só ("Uma memecoin não tem produto, receita nem promessa de utilidade."), sem exemplo e sem definir memecoin, token, market cap, pump nem holders — **576 caracteres**.

`pergunta: REMOVER (hoje 'q1')` — atenção: hoje o valor não está no dado, está em `src/views/modulo2.js` linha 205 (`pergunta: perguntaRapida('q1')`). Ver APONTAMENTOS.

DEPOIS:

```js
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
```

---

## dopamina

ANTES: 4 frases curtas explicando dopamina e reforço intermitente, sem dizer o que é "posição" nem "operação", e com o exemplo em cinco fragmentos de três palavras — **376 caracteres**.

DEPOIS:

```js
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
```

---

## antidoto

ANTES: 3 frases e uma lista de 5 itens em que aparecem, sem explicação, os termos tese, catálise, alvos de realização, tempo de espera e teto de perda — **291 caracteres**.

DEPOIS: (`listaTitulo` e `lista` ficam **intocados** — o visual `criarCalmoOuEmpolgado` lê `antidoto.lista`; ver APONTAMENTOS)

```js
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
```

---

## tabelaDosVieses

ANTES: título, uma frase e a tabela. Nenhum parágrafo — **0 caracteres**. FOMO, sunk cost, ticker, liquidez, LP, holders, authorities, bot e call pago aparecem dentro da tabela sem nunca terem sido explicados.

`pergunta: REMOVER (hoje 'q2')` — hoje em `src/views/modulo2.js` linha 352.

DEPOIS: (este card hoje recebe só `titulo` e `emUmaFrase`; ver APONTAMENTOS item 2)

```js
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
```

---

## fluxoFomo

ANTES: título, uma frase e o fluxograma. Nenhum parágrafo — **0 caracteres**.

DEPOIS:

```js
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
  },
```

---

## mapaDosTipos

ANTES: título, uma frase e o mapa clicável. Nenhum parágrafo — **0 caracteres**. CTO, dev, supply, rug, launchpad, roadmap e repositório aparecem só dentro dos cards dos 10 tipos.

DEPOIS:

```js
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
    rotulos: { comoReconhecer: 'Como reconhecer', alerta: 'Alerta' },
  },
```

---

## seletorDeFases

ANTES: título, uma frase, o seletor, e depois dele um parágrafo de 232 caracteres só com os números da mortalidade. Texto corrido do card: **0 caracteres**. Bonding curve, pool, mint, freeze, bundles, sniper, graduação, DEX, lateralizar e listagem aparecem sem explicação.

`pergunta: REMOVER (hoje 'q3')` — hoje em `src/views/modulo2.js` linha 650.

PROPOSTA DE DIVISÃO: este card fica longo demais (seletor + 4 fases + parágrafo da mortalidade + duas grades de 100). Sugiro **dividir em duas seções**: (1) "As 4 fases: clique numa para ver o que checar", com os `paragrafos` abaixo; e (2) uma seção nova **"O que 'vai a zero' quer dizer"**, com o `paragrafoDaMortalidade`, as duas grades e os `paragrafosFinais` + `detalhe` abaixo. Abaixo está escrito como um card só, para funcionar mesmo sem a divisão.

DEPOIS:

```js
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
    rotulos: {
      oQueVoceVe: 'O que você vê',
      oQueChecar: 'O que checar',
      armadilha: 'Armadilha desta fase',
    },
  },
```

---

## anatomias.postDeHype

ANTES: título, uma linha de descrição e o post esquemático com seis marcadores. Nenhum parágrafo — **0 caracteres**. "Hype" nunca é traduzido em lugar nenhum do módulo.

DEPOIS: (aqui o campo que faz o papel de `emUmaFrase` é `descricao` — é o que o view passa)

```js
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
      rodape: 'Post esquemático. Nenhum perfil ou token real foi copiado.',
    },
```

---

## linhaDoTempoCasos

ANTES: título, uma linha de descrição, a linha do tempo, os três cards de números e a lição de 256 caracteres. Texto corrido do card: **0 caracteres**. Os números aparecem em lista, sem ninguém dizer o que significam. `notaDosCasos` (154 caracteres) está órfã no arquivo — não aparece em lugar nenhum.

`pergunta: REMOVER (hoje 'q4')` — hoje em `src/views/modulo2.js` linha 519.

DEPOIS:

```js
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
  },
```

---

## APONTAMENTOS

1. **Causa raiz do "virou legenda": os parágrafos estão desligados.** Em `src/views/modulo2.js`, as três seções da Visão geral são montadas com `omitir`: linha ~203 `omitir: ['paragrafos']` (atencao), ~209 `omitir: ['paragrafos', 'exemplo']` (dopamina), ~212 `omitir: ['paragrafos', 'lista']` (antidoto). Enquanto essas três linhas existirem, **nenhum texto novo aparece na tela** — nem o que já estava lá. Não toquei em `src/` (instrução). É a primeira coisa a corrigir, e é uma linha por seção.

2. **Os seis cards restantes só recebem título e frase.** O view monta cada um com um objeto literal: `criarCardDaSecao({ titulo: x.titulo, emUmaFrase: x.emUmaFrase }, ...)` nas linhas ~351 (tabela dos vieses), ~354 (fluxo do FOMO), ~355 (post de hype, onde `emUmaFrase` recebe `post.descricao`), ~469 (mapa dos tipos), ~512 (casos, onde `emUmaFrase` recebe `cronologia.descricao`) e ~643 (fases). Colar os `paragrafos` no arquivo de dados **não basta**: é preciso passar o objeto inteiro (`criarCardDaSecao(modulo2.tabelaDosVieses, ...)`) ou acrescentar os campos ao literal. Seis linhas.

3. **A "Pergunta rápida" não está no arquivo de dados.** Fiz a varredura: nenhuma seção de `src/data/modulo2.js` tem `pergunta:` nem `perguntaRapida:`. As quatro perguntas rápidas são injetadas pelo view, em `src/views/modulo2.js` linhas 205 (`q1`, seção atencao), 352 (`q2`, tabela dos vieses), 519 (`q4`, casos) e 650 (`q3`, fases). Para cumprir a decisão de hoje, é preciso apagar essas quatro linhas lá — eu não podia. O array `quiz` continua intacto, com as 4 perguntas.

4. **Ordem do `depois` na tela.** Dois cards passam um bloco `depois` para o card da seção (casos: a grade dos 3 casos + `licaoDosCasos`; fases: `paragrafoDaMortalidade` + as grades). Não sei se esse bloco entra antes ou depois de `paragrafosFinais`. Escrevi os textos para funcionarem nas duas ordens (não digo "abaixo" nem "acima" referindo-me a esses blocos), mas vale conferir na tela.

5. **`notaDosCasos` está órfã.** O próprio comentário do arquivo (linha ~586) diz que ela não aparece desde o redesenho. Recuperei o conteúdo dentro do `paragrafosFinais` do card dos casos, para não perder a ressalva de "cotação muda, fato histórico não". A chave pode ser apagada depois, se você confirmar que ninguém mais a lê.

6. **`antidoto.lista` virou campo de visual.** `criarCalmoOuEmpolgado(antidoto)` lê `antidoto.lista` para desenhar a coluna "Você calmo, antes", e o card omite a lista. Por isso **não mexi nos 5 itens** — expliquei cada um em prosa, sem repetir a lista.

7. **`dopamina` não tem nenhum número no arquivo.** O item 4 da estrutura (exemplo com números) ficou qualitativo só nessa seção, porque a regra de ouro proíbe trazer número de fora. Se você quiser um número ali, precisa vir de uma pesquisa.

8. **Fonte genérica em `dopamina.detalhe`.** O texto cita "literatura de divulgação e artigos revisados por pares (PMC/NCBI)" sem apontar nenhum artigo específico — não dá para conferir. Mantive como estava, mas isso talvez mereça uma etiqueta "não verificado" ou uma referência concreta. Decisão sua.

9. **Divergência real na explicação do quiz.** `quiz[3].explicacao` (q4) escreve "MELANIA caiu cerca de 99% do pico (Bloomberg, Messari)". No caso, os dois números são de momentos diferentes e de fontes diferentes: Bloomberg = cerca de 90% em 06/02/2025; Messari = mais de 99% até dezembro de 2025. Atribuir os 99% às duas fontes juntas é impreciso. Não corrigi (regra: não mexer em número nem em fonte).

10. **Grafia inconsistente de Pump.fun.** O arquivo escreve "Pump.fun" com maiúscula em `paragrafoDaMortalidade` e nas `grades`, e "pump.fun" com minúscula em `fases[0].oQueChecar` e na `contestacao`. Nos meus textos usei "Pump.fun" quando é o nome da plataforma e "pump.fun" ao citar a ressalva do próprio arquivo. Vale padronizar num único lugar.

11. **Forma estranha no fluxo do FOMO.** Em `fluxoFomo.passos[2].segue.texto` a saída que "passa" é outra pergunta ("Checagem técnica feita? (Módulo 3 e Checklist)"), enquanto nos passos anteriores é "Siga para a próxima pergunta". É campo de visual, não mexi — mas escrevi o parágrafo correspondente explicando que passar nas três não é autorização para comprar, e sim permissão para começar a checagem técnica.

12. **Proposta de divisão de card.** O card das 4 fases ficou o maior de todos (seletor + quatro fases + mortalidade + duas grades de 100). Sugiro dividir em "As 4 fases" e "O que 'vai a zero' quer dizer", como está anotado naquela seção. O card dos vieses também ficou grande, mas ele tem a tabela como âncora visual e aguenta.

13. **O que cresceu.** De 1.243 para **26.725** caracteres de texto corrido (`paragrafos` + `paragrafosFinais`), em 9 cards — antes eram 3 cards com texto e 6 com nenhum. Por card: atencao 2.592, dopamina 2.512, antidoto 2.340, tabelaDosVieses 3.053, fluxoFomo 1.957, mapaDosTipos 3.533, seletorDeFases 5.420, postDeHype 1.937, linhaDoTempoCasos 3.381. Os 9 blocos `DEPOIS` foram passados pelo interpretador: os 9 compilam sem erro de sintaxe.

---

## TERMOS TRADUZIDOS

Varredura de todo jargão em inglês ou técnico do módulo, e onde cada um passa a ser explicado pela primeira vez (na ordem de leitura das abas: Visão geral → Vieses → Tipos → Casos → Fases).

| Termo | Explicado pela primeira vez em |
|---|---|
| token | `atencao`, 1º parágrafo |
| blockchain (remissão ao Módulo 1) | `atencao`, 1º parágrafo |
| memecoin | `atencao`, 1º parágrafo |
| economia da atenção | `atencao`, 1º parágrafo |
| chão (a metáfora do módulo) | `atencao`, 2º parágrafo |
| volume | `atencao`, 4º parágrafo |
| holders | `atencao`, 4º parágrafo |
| menções | `atencao`, 4º parágrafo |
| market cap / capitalização de mercado | `atencao`, quadro |
| o "x" (2x, 5x, 10x) | `atencao`, quadro |
| pump, dump, pump-and-dump | `atencao`, quadro |
| dopamina | `dopamina`, 1º parágrafo |
| reforço intermitente | `dopamina`, 2º parágrafo |
| posição / abrir e fechar posição | `dopamina`, 3º parágrafo |
| operação | `dopamina`, 3º parágrafo |
| tamanho da posição | `dopamina`, 3º parágrafo |
| viés cognitivo | `antidoto`, 1º parágrafo |
| tese | `antidoto`, 4º parágrafo |
| catálise | `antidoto`, 4º parágrafo |
| alvos de realização / realizar | `antidoto`, 4º parágrafo |
| tempo de espera | `antidoto`, 4º parágrafo |
| teto (limite) de perda | `antidoto`, 4º parágrafo |
| FOMO (fear of missing out) | `tabelaDosVieses`, 2º parágrafo |
| prova social (social proof) | `tabelaDosVieses`, 2º parágrafo |
| ticker | `tabelaDosVieses`, 2º parágrafo |
| CA (contract address) / endereço do contrato | `tabelaDosVieses`, 2º parágrafo |
| bot | `tabelaDosVieses`, 3º parágrafo |
| call pago | `tabelaDosVieses`, 3º parágrafo |
| liquidez | `tabelaDosVieses`, quadro |
| LP (liquidity pool) | `tabelaDosVieses`, quadro |
| authorities (permissões do contrato) | `tabelaDosVieses`, quadro |
| custo afundado (sunk cost) | `tabelaDosVieses`, 4º parágrafo |
| efeito disposição (disposition effect) | `tabelaDosVieses`, 4º parágrafo |
| excesso de confiança (overconfidence) | `tabelaDosVieses`, 5º parágrafo |
| volatilidade | `tabelaDosVieses`, 5º parágrafo |
| timeline | `fluxoFomo`, exemplo |
| agente de IA | `mapaDosTipos`, 2º parágrafo |
| CTO (community takeover) | `mapaDosTipos`, 2º parágrafo |
| launchpad | `mapaDosTipos`, 3º parágrafo |
| dev | `mapaDosTipos`, 4º parágrafo |
| supply | `mapaDosTipos`, 4º parágrafo |
| rug pull / rug | `mapaDosTipos`, 4º parágrafo |
| roadmap | `mapaDosTipos`, exemplo |
| repositório público | `mapaDosTipos`, exemplo |
| impersonação | `mapaDosTipos`, `paragrafosFinais` |
| hype | `anatomias.postDeHype`, 1º parágrafo |
| chain | `linhaDoTempoCasos`, 1º parágrafo |
| insider | `linhaDoTempoCasos`, 4º parágrafo |
| on-chain | `linhaDoTempoCasos`, 4º parágrafo |
| sniper | `seletorDeFases`, 2º parágrafo |
| bonding curve | `seletorDeFases`, 2º parágrafo |
| pool | `seletorDeFases`, 2º parágrafo |
| mint e freeze (revogar) | `seletorDeFases`, 2º parágrafo (reforço do quadro dos vieses) |
| bundles (compras em bloco) | `seletorDeFases`, 2º parágrafo |
| Pump.fun | `seletorDeFases`, 3º parágrafo |
| graduação | `seletorDeFases`, 3º parágrafo |
| DEX (corretora descentralizada) | `seletorDeFases`, 3º parágrafo |
| lateralizar | `seletorDeFases`, 4º parágrafo |
| listagem | `seletorDeFases`, 4º parágrafo |
| máxima (e máximas mais baixas) | `seletorDeFases`, 5º parágrafo |
| régua (o problema de medir "vai a zero") | `seletorDeFases`, 7º parágrafo |

Ordem de leitura conferida: nenhum termo da tabela aparece nos textos novos antes da linha em que é explicado. As duas exceções são propositais e estão marcadas como reforço: `mint`/`freeze` (explicados no quadro dos vieses, retomados nas fases) e `holders` (explicado na Visão geral, retomado nos vieses e nas fases).
