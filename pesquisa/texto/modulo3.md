# Módulo 3 — texto reescrito

Medi antes de escrever, e o diagnóstico é diferente do que parecia. As duas abas práticas são
mesmo as mais longas do app, mas o que as faz longas é o visual: mockups, tabelas, passos e
armadilhas. De texto corrido elas quase não têm — o Pilar social tem 595, 806, 1.423 e 1.015
caracteres de prosa por seção, e as quatro ferramentas do Pilar técnico têm **zero**. A seção
`rotacao`, com 2.465 caracteres de linha do tempo e tabela, tem 90 caracteres de texto: só a
frase de abertura. Então o trabalho aqui foi escrever a explicação que falta, sem inflar o que
já é visual, e propor três divisões de card (ditas em APONTAMENTOS).

---

## dois-pilares

ANTES: emUmaFrase 128 + 2 parágrafos (313) + aviso (92) + detalhe (785) — a figura dos dois
pilares carrega o card sozinha; os parágrafos só repetem a legenda dela. Prosa: 1.318.

pergunta: REMOVER (hoje 'q4')

DEPOIS (campos de visual — `pilares`, `legendaDosPilares`, `aviso` — ficam como estão):

```js
      emUmaFrase:
        'Antes de comprar, você precisa de duas respostas: por que o token chama atenção, e se ' +
        'o contrato por trás dele merece confiança.',
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
```

---

## matriz

ANTES: só titulo + emUmaFrase (119) + o aviso do Sigma. O card é moldura da matriz filtrável; a
única coisa explicada é como usar o filtro. Prosa: 119.

pergunta: REMOVER (hoje 'q3')

DEPOIS (`avisoSemSolana` fica como está):

```js
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
          'Solana. Não-custodial quer dizer que a sua chave fica com você, e não no servidor ' +
          'da ferramenta.',
        'Guarde o nome certo: a matriz e o quiz cobram Axiom, e nomes parecidos são exatamente ' +
          'o material de que os golpes são feitos.',
      ],
    },
    paragrafosFinais: [
      'A etiqueta de risco de cada cartão não é nota de qualidade: é lembrete de quanto você ' +
        'entrega para usar aquilo. Ferramenta que só lê não pede nada seu; ferramenta que executa ' +
        'pede acesso ao seu dinheiro. Esse é o eixo que vale a pena carregar para o Módulo 5.',
    ],
    avisoSemSolana: 'Verificado: não suporta Solana.',
```

---

## cenarioLaunchpads

ANTES: emUmaFrase (110) + três eventos datados + um parágrafo de conclusão. Nenhuma frase
explica o que é launchpad, bonding curve ou graduação — as três palavras da própria emUmaFrase.
Prosa fora da linha do tempo: 110 + a conclusão.

DEPOIS (`eventos` e `conclusao` ficam como estão; os parágrafos entram antes da linha do tempo):

```js
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
    eventos: [ /* … inalterado … */ ],
    paragrafosFinais: [
      'O erro que isso evita é decorar marcas. Se você aprender "o site X é o lugar onde as ' +
        'memecoins nascem", vai procurar no lugar errado no trimestre seguinte. Se aprender ' +
        '"existe um site de lançamento, uma curva de preço e uma graduação", você reconhece o ' +
        'próximo antes de ele ter nome.',
    ],
    conclusao: [ /* … inalterado … */ ],
```

---

## ciclo

ANTES: emUmaFrase (145) + 1 parágrafo (191) + aviso âmbar (293) + detalhe (959), mais 7 itens em
`foraDaTela` que a tela nunca mostra. O círculo das cinco fases explica sozinho; o parágrafo só
diz "as cinco narrativas seguiram esse desenho". Prosa na tela: 1.588.

pergunta: REMOVER (hoje 'q13')

DEPOIS (`fases`, `centroDoCiclo`, `fimDoCiclo` e `aviso` ficam como estão):

```js
        emUmaFrase:
          'Uma narrativa nasce, cresce, chega ao pico, satura e morre. Os sinais descrevem o que ' +
          'aconteceu — nenhum foi medido como aviso de entrar ou sair.',
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
              '2020). Pump-and-dump é o esquema em que um grupo combina comprar junto para o preço ' +
              'subir e vender em cima de quem chegou depois. No estudo do pump.fun, 17% das ' +
              'negociações eram wash trading: alguém negociando consigo mesmo só para inflar o ' +
              'volume que aparece na tela.',
            'Em canais VIP de pump-and-dump, o nome da moeda sai de 12 a 24 horas antes do sinal ' +
              'público (Ardia & Bluteau, 2024). Quem vê o sinal na rede aberta chegou depois de ' +
              'quem organizou.',
            'Onde essa conversa acontece: no mesmo levantamento de três meses (Nizzoli et al., ' +
              'IEEE Access, 2020), o Discord tinha um único canal de pump-and-dump, contra 296 no ' +
              'Telegram. O estudo do pump.fun achou 800 mil canais públicos e 236 mil privados do ' +
              'Telegram ligados a tokens da plataforma, e viu que o top 1% dos grupos de criadores ' +
              'criou 58,6% de todos os tokens.',
            'O outro caso com data de nascimento: em outubro de 2024, o token GOAT nasce empurrado ' +
              'pelos posts de um bot de IA, o Truth Terminal.',
          ],
        },
```

---

## narrativa-e-preco

ANTES: emUmaFrase (133) + 2 parágrafos (439) + detalhe (786). Três visuais pesados (fluxograma
de triagem, barras do sinal × custo, três evidências) e nenhuma frase que explique por que 3
pontos de custo matam 3% de sinal. Prosa: 1.358. **Proponho dividir em duas seções** (APONTAMENTOS).

DEPOIS (`triagem`, `conta` e `evidencias` ficam como estão):

```js
        emUmaFrase:
          'Narrativa é um tema que puxa vários tokens juntos, e não o hype de um token só. E não ' +
          'há evidência de que ela ajude a prever o preço.',
        paragrafos: [
          'A primeira pergunta é de classificação e é fácil: o tema puxa vários tokens ao mesmo ' +
            'tempo? Se puxa, é narrativa. Se o que existe é um token só com muita gente falando, ' +
            'é hype daquele token. A diferença muda o que você procura: numa narrativa faz sentido ' +
            'perguntar quem foi o primeiro e quantos vieram depois; num hype isolado essa pergunta ' +
            'não tem resposta.',
          'A segunda pergunta é a que o mercado responde errado. Repete-se que narrativa move ' +
            'preço, e o que foi medido é bem menos do que isso. Para memecoin de launchpad — a ' +
            'criada num site de lançamento, como o pump.fun — não existe estudo revisado por pares ' +
            'que ligue, com um número, a atenção nas redes ao preço. Revisado por pares quer dizer ' +
            'conferido por outros cientistas antes de sair; é o selo que separa um resultado ' +
            'checado de uma afirmação de vendedor.',
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
          'O erro que esta seção evita é tratar "reconheci a narrativa" como "tenho uma vantagem". ' +
            'Reconhecer o tema é leitura de contexto, e contexto não é entrada. A tese de entrada ' +
            'do Módulo 4 precisa de outra coisa embaixo dela.',
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
```

---

## rotacao

ANTES: emUmaFrase (90) e mais nada. Nove marcos de linha do tempo e uma tabela de cinco
narrativas, sem um único parágrafo. É a seção com menos texto do módulo. Prosa: 90.

DEPOIS (`linhaDoTempo` e `tabela` ficam como estão):

```js
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
            'um pico com data, um tempo até perder a atenção e um destino. O que muda entre elas é ' +
            'a duração, e é aí que mora a armadilha de quem tenta virar isso em método.',
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
            'seguinte sempre começou antes de o anterior acabar. Ela não serve para estimar quanto ' +
            'tempo falta para o tema de hoje.',
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
```

---

## ferramentas

ANTES: emUmaFrase (91) + 1 parágrafo (251), e uma tabela de dez ferramentas com quatro colunas.
A tabela carrega tudo; o parágrafo é a legenda dela. Nada explica o que é "em alta", o que é API,
ou por que "fabricável" é a coluna que importa. Prosa: 342.

pergunta: REMOVER (hoje 'q12')

DEPOIS (`tabela` fica como está):

```js
        emUmaFrase:
          'Uma lista de "em alta" mostra onde a atenção está agora. Não mostra se essa atenção é ' +
          'real.',
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
            'que houve atividade, e atividade é exatamente o que o volume falso fabrica. Nenhuma ' +
            'dessas métricas tem validação publicada como previsão de preço de memecoin.',
        ],
        detalhe: {
          titulo: 'preços, fórmulas e o que não foi conferido',
          lista: [
            'O Galaxy Score e o AltRank do LunarCrush são descritos só por material do próprio ' +
              'vendedor.',
            'A fórmula do Trending Score do DexScreener não é publicada; os componentes, sim. O ' +
              'preço dos Boosts não aparece em nenhuma página oficial: os pacotes que circulam são ' +
              'de terceiros.',
            'Preços que vieram de resumo de busca, não da página aberta: o Birdeye PRO (US$ 45 por ' +
              'mês), o X Premium (US$ 3 a US$ 40 por mês) e o Nansen Pro (US$ 49 a US$ 69 por ' +
              'mês). Os da API do Birdeye (US$ 39 a US$ 499 por mês) e do LunarCrush vieram da ' +
              'página de preços.',
            'Operar pelo GMGN pede login com a chave privada num bot do Telegram — risco de ' +
              'custódia, tratado no Módulo 5. Negociar na curva do pump.fun custa 1,25% por ' +
              'operação. O programa "Yaps", do Kaito, acabou em 15/01/2026 (não verificado).',
          ],
        },
```

---

## rotina (aba Narrativas)

ANTES: emUmaFrase (130) e mais nada — sete passos numerados e nenhum parágrafo. A rotina diz o
que fazer, nunca por quê. Prosa: 130.

DEPOIS (`rotuloDosPassos` e `passos` ficam como estão):

```js
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
```

---

## social/rotina

ANTES: emUmaFrase (84) + 2 parágrafos (511), mais seis passos cronometrados e a comparação de
endereços. Os parágrafos estão certos, mas entram depois do visual sem apresentar o que é um
endereço de contrato — que é o objeto inteiro da seção. Três definições estão presas em
`foraDaTela`. Prosa: 595.

pergunta: REMOVER (hoje 'q6')

DEPOIS (`passos`, `legendaDosPassos` e `enderecos` ficam como estão):

```js
        emUmaFrase: 'Qualquer divergência de endereço, em qualquer etapa, encerra a checagem: não compre.',
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
```

---

## social/perfil

ANTES: emUmaFrase (104) + 1 parágrafo de sinais (257) + detalhe com os operadores de busca
(445). O mockup do perfil e a lista ao lado já explicam painel por painel; o parágrafo repete
parte disso em forma de bullet corrido. Prosa: 806.

pergunta: REMOVER (hoje 'q5')

DEPOIS (`anatomia` fica como está):

```js
        emUmaFrase:
          'No X, o selo azul só quer dizer que a conta paga uma assinatura. Ele não prova que a ' +
          'conta é do projeto.',
        paragrafos: [
          'Um perfil no X tem um campo que é único e vários que não são. O único é o @handle — o ' +
            'arroba, o endereço da conta. Nome, foto, bio e número de seguidores qualquer pessoa ' +
            'copia em minutos. Por isso a leitura de um perfil "oficial" é sempre a mesma: achar o ' +
            'campo que não pode ser copiado e conferir letra por letra.',
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
```

---

## social/discord-telegram

ANTES: emUmaFrase (121) + 2 parágrafos (704) + detalhe (598), mais os quatro golpes em cartões.
É a seção com mais prosa da aba, e mistura dois aplicativos com riscos diferentes no mesmo card.
Prosa: 1.423. **Proponho dividir em duas seções** (APONTAMENTOS).

pergunta: REMOVER (hoje 'q7')
confira: 'q8' — mantido (é o "Confira antes de seguir" do fim da parte, não a Pergunta rápida do card; decisão do dono).

DEPOIS (`golpes` fica como está):

```js
        emUmaFrase:
          'Os golpes chegam por link e por bot falso. A defesa é entrar pelo site oficial e não ' +
          'assinar nada que veio da comunidade.',
        paragrafos: [
          'Assinar é aprovar uma mensagem com a sua carteira. Parece inofensivo porque não é uma ' +
            'transferência: você não está mandando dinheiro, está autorizando algo. É exatamente ' +
            'por isso que funciona como golpe — em golpe, uma assinatura pode autorizar a saída ' +
            'dos seus ativos sem você perceber, na hora que o golpista escolher.',
          'No Discord, os quatro golpes dos cartões acima são variações de um truque só: fazer ' +
            'você chegar num site pela comunidade em vez de chegar pelo site oficial. O bot falso ' +
            'de verificação foi o caminho do Inferno Drainer — drainer é um golpe feito para ' +
            'esvaziar carteiras —, que esvaziou mais de 30 mil carteiras e levou pelo menos US$ 9 ' +
            'milhões em seis meses. A defesa é curta: verificação legítima não pede assinatura.',
          'No Telegram o risco muda de lugar. Ler é seguro e nem exige entrar no grupo: abra ' +
            't.me/s/nomedocanal no navegador. O perigo está nos bots de compra — robôs dentro do ' +
            'Telegram que compram e vendem tokens por você. Muitos criam a carteira e guardam a ' +
            'chave privada no servidor deles, e chave privada é a senha mestra da carteira: quem ' +
            'tem a chave mexe no dinheiro. Uma falha no bot, então, pode custar tudo.',
          'Isso importa porque é o único ponto deste módulo em que você entrega a chave para um ' +
            'terceiro. Nas outras telas — RugCheck, Solscan, Bubblemaps, DexScreener — você só lê, ' +
            'e nenhuma delas pede carteira conectada. Aqui você escolhe entre conveniência e ' +
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
```

---

## social/calls

ANTES: emUmaFrase (95) + 1 parágrafo de sinais de call pago (311) + detalhe com FTC, SEC e CONAR
(609), mais as barras e a tabela de oito sinais. Em nenhum lugar se diz o que é um call. Prosa:
1.015.

DEPOIS (`barras` e `tabela` ficam como estão):

```js
        emUmaFrase:
          'Um call mostra que houve atenção naquele momento. Na média, o preço caiu nos 30 dias ' +
          'seguintes.',
        paragrafos: [
          'Call é quando alguém com público aponta um token e diz para olhar — um post, um vídeo, ' +
            'uma mensagem num grupo. Não é uma categoria formal e não tem regra: vai do entusiasmo ' +
            'sincero ao anúncio pago não declarado, e as duas coisas se parecem muito na tela.',
          'O que um call prova é estreito: que houve atenção naquele momento. Não prova valor ' +
            'futuro, não prova que o contrato é limpo, não prova sequer que quem postou ainda tem ' +
            'o token. A tabela abaixo faz esse exercício com oito sinais sociais, um por linha: de ' +
            'um lado o que ele prova, do outro o que ele não prova. Vale ler a coluna da direita ' +
            'primeiro.',
          'Isso importa porque a média está medida e aponta para baixo. Em 36 mil tweets de 180 ' +
            'influenciadores, sobre mais de 1.600 criptoativos, o preço subia 1,83% no primeiro ' +
            'dia, caía 2,24% em 10 dias e caía 6,53% em 30 dias (Review of Accounting Studies, ' +
            '2024). Os autores dizem que o padrão combina com pump-and-dump, mas que a prova é ' +
            'inconclusiva.',
          'Na prática, os sinais de call pago não declarado são de graça e você vê no próprio ' +
            'feed: posts quase idênticos em várias contas, na mesma janela de horário; a carteira ' +
            'do influenciador recebe o token antes do post, o que dá para ver no explorador; post ' +
            'apagado logo depois da alta; link de afiliado; e "não é conselho financeiro" seguido ' +
            'do endereço do contrato.',
        ],
        exemplo: {
          titulo: 'Mil dólares no dia do tweet',
          passos: [
            'Você põe mil dólares em tokens fora do top 100 no dia em que o influenciador posta.',
            'No primeiro dia, a média está a seu favor: +1,83%.',
            'Em 10 dias a média já é −2,24%; em 30 dias, −6,53%.',
            'Segurando os 30 dias, o resultado médio é perder 79 dólares — e isso antes dos custos ' +
              'de entrar e sair (Módulo 5).',
            'A janela em que o call "funcionou" existiu. Ela durou um dia.',
          ],
        },
        paragrafosFinais: [
          'O erro comum que esta seção evita é ler quantidade de gente falando como qualidade do ' +
            'token. Call é atenção, não valor. E atenção comprada se parece exatamente com atenção ' +
            'espontânea, do lado de fora.',
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
            'Nada disso é proteção sua: são regras que punem depois. O caso da Kardashian mostra o ' +
              'tamanho do problema — houve multa, houve declaração parcial, e quem comprou no dia ' +
              'do post não recebeu nada por isso.',
          ],
        },
```

---

## praticaTecnica/ordem

ANTES: titulo + emUmaFrase (105) + legenda (100). É o card que abre a aba inteira e não tem um
parágrafo. Prosa: 205.

DEPOIS — esta é a seção que recebe o vocabulário compartilhado das quatro ferramentas, para que
os quatro painéis fiquem curtos (`legenda` fica como está):

```js
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
          'pares de um token, outro mostra um par só; um conta os 250 maiores holders, outro conta ' +
          'todos. Comparar o mesmo nome de campo entre dois sites é o erro mais comum de quem ' +
          'está começando.',
        'Na prática, nenhuma das quatro pede carteira conectada para ler, e ler é de graça nas ' +
          'quatro. Você cola o endereço do contrato — nunca busca pelo nome — e lê. Se alguma ' +
          'tela pedir para conectar a carteira e assinar algo para "liberar" a consulta, isso não ' +
          'faz parte do processo.',
      ],
      legenda:
        'Nenhuma delas pede carteira conectada para ler. O exemplo é o BONK, conferido ao vivo ' +
        'em 12/09/2026.',
    },
```

---

## praticaTecnica/rugcheck

ANTES: nome, pergunta, endereço, a linha do "o que é grátis", o mockup com seis painéis, cinco
passos e duas armadilhas. Texto corrido: **0 caracteres**.

DEPOIS — dois parágrafos de abertura e um de fecho; `anatomia`, `passos` e `armadilhas` ficam
como estão. (Estes campos precisam de fiação na view — ver APONTAMENTOS, itens 1 e 2.)

```js
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
```

---

## praticaTecnica/solscan

ANTES: nome, pergunta, endereço, linha do grátis, mockup de sete painéis, seis passos e duas
armadilhas. Texto corrido: **0 caracteres**.

DEPOIS (`anatomia`, `passos` e `armadilhas` ficam como estão):

```js
        paragrafos: [
          'O Solscan é um explorador da Solana: um site que mostra, em forma legível, o que está ' +
            'registrado na blockchain. Ele não opina e não pontua. Tudo o que aparece ali é o dado ' +
            'cru — quem criou o token, quando, quais permissões existem, quem transferiu para ' +
            'quem. Cada rede tem o seu: BscScan, Etherscan, Basescan.',
          'A pergunta dele — o que o dono ainda pode fazer, e quem criou o token — é a única deste ' +
            'módulo cuja resposta é definitiva. Score muda; registro na blockchain, não. Dois ' +
            'campos concentram a resposta. Owner Program diz qual programa manda no token: ' +
            '"Tokenkeg…" é o SPL clássico, "Tokenz…" é o Token-2022, a versão que aceita ' +
            'extensões. Token Extensions lista essas extensões, e qualquer uma além das de ' +
            'metadados é o alerta mais forte do Módulo 6.',
          'O campo Creator é o que mais ensina e o menos olhado. Ele mostra a carteira que criou o ' +
            'token, e um clique leva ao histórico dela: quantos outros tokens essa mesma carteira ' +
            'já criou, e o que fez com eles. Não existe campo "quanto o criador comprou" — a ' +
            'resposta está nas primeiras linhas da aba Transfers, que você precisa trocar para ' +
            '"Oldest First", porque ela vem do mais recente para o mais antigo.',
          'No BONK, em 12/09/2026: Holders 1.014.349, "Token Extensions: FALSE" e "Owner Program: ' +
            'Token Program TokenkegQ…" — ou seja, SPL clássico, sem extensão nenhuma.',
        ],
        paragrafosFinais: [
          'O erro comum que o Solscan evita é confiar num resumo. O erro que ele cria é ler um ' +
            'campo sem saber o que ele mede: no BONK, "Authority" mostra um endereço, e mesmo ' +
            'assim mint e freeze estão nulas na blockchain — aquele endereço é a autoridade de ' +
            'metadados. Um endereço no menu não prova que o dono ainda emite tokens.',
        ],
```

---

## praticaTecnica/bubblemaps

ANTES: nome, pergunta, endereço, linha do grátis, mockup de cinco painéis, cinco passos e duas
armadilhas. Texto corrido: **0 caracteres**.

DEPOIS (`anatomia`, `passos` e `armadilhas` ficam como estão):

```js
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
```

---

## praticaTecnica/dexscreener

ANTES: nome, pergunta, endereço, linha do grátis, mockup de seis painéis, cinco passos e duas
armadilhas. Texto corrido: **0 caracteres**.

DEPOIS (`anatomia`, `passos` e `armadilhas` ficam como estão):

```js
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
            'cria é confundir visibilidade com validação: aparecer em alta pode ter sido comprado, ' +
            'porque os Boosts turbinam o trending por 12 a 24 horas. Para mint, freeze, holders e ' +
            'insiders, volte ao RugCheck e ao Solscan.',
        ],
```

---

## praticaTecnica/onde

ANTES: emUmaFrase (104) + 1 parágrafo (201) + a tabela de nove linhas. O parágrafo dá o caso do
BONK sem explicar por que dois sites discordam. Prosa: 305.

pergunta: REMOVER (hoje 'q9')

DEPOIS (`tabela` fica como está):

```js
      titulo: 'Onde checar cada coisa',
      emUmaFrase:
        'Cada pergunta tem um lugar e um campo. O mesmo nome de campo mede coisas diferentes em ' +
        'sites diferentes.',
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
```

---

## APONTAMENTOS

1. **Fiação na view (bloqueante para colar).** As seções do M3 não usam o card genérico:
   `src/views/modulo3.js` monta cada card à mão, com `criarSecao({ titulo, emUmaFrase, blocos })`,
   e hoje só lê `paragrafos`, `aviso`, `detalhe` e as tabelas. Os campos `exemplo` e
   `paragrafosFinais` que escrevi **não aparecem na tela** sem uma linha a mais em cada
   `blocos: [...]`. As funções já existem em `src/components/secao.js` (`criarExemplo`,
   `criarDetalhe`). Quem colar o texto precisa pedir essa fiação — eu não toquei em `src/`.

2. **As quatro ferramentas técnicas não são "seções" hoje.** `praticaTecnica.ferramentas[]` é
   renderizado por `criarConteudoDaFerramenta`, que só desenha nome+pergunta, a linha do grátis,
   a anatomia e as duas colunas (passos/armadilhas) — por isso elas têm zero texto corrido. Para
   os parágrafos aparecerem, esse painel precisa de mais um bloco. **Ressalva de acessibilidade:**
   o painel é `aria-live="polite"`; com texto longo dentro, o leitor de tela relê tudo a cada
   troca de ferramenta. Sugiro pôr os parágrafos **fora** do painel que troca, ou rever o
   `aria-live`. Decisão do dono.

3. **Três divisões de card propostas.**
   - `social/discord-telegram` → duas seções: `discord` (os quatro golpes, o Inferno Drainer, a
     defesa "não assine nada que veio da comunidade") e `telegram` (ler sem entrar, bots de
     compra, as três falhas com data). São dois aplicativos com riscos de natureza diferente: no
     Discord o risco é a assinatura; no Telegram é a custódia da chave. Hoje dividem o mesmo card
     e a mesma pergunta.
   - `narrativa-e-preco` → duas seções: `narrativa-ou-hype` (o fluxograma de triagem) e
     `narrativa-e-preco` (as barras sinal × custo e as três evidências). O título atual tem duas
     perguntas dentro; são dois assuntos que só se encontram no nó final do fluxograma.
   - Aba **Pilar técnico** → duas partes no segmento: "o que o contrato permite" (RugCheck +
     Solscan) e "quem controla, e quanto dinheiro há" (Bubblemaps + DexScreener). As quatro
     ferramentas somam 7.550 caracteres, fora `ordem` e `onde`.
   Em todos os casos entreguei o DEPOIS como um bloco só, para colar sem quebrar a view.

4. **`confira: 'q8'` ficou.** A decisão de hoje tira a "Pergunta rápida" do fim dos cards. O
   `confira` de `social/discord-telegram` é outro bloco — o "Confira antes de seguir", no fim da
   parte do segmento, fora do card. Não mexi. Se a decisão valer para ele também, é uma linha.

5. **`perguntaAntes: 'q1'`** continua no topo da aba Pilar técnico. Mesma situação do item 4: é
   pré-teste de aba, não Pergunta rápida de seção. Mantido.

6. **`foraDaTela` agora duplica o `detalhe`.** Promovi para o texto visível, como pedido ("nada
   se perde"): as definições de preprint, graduar, ticker, endereço do contrato, stablecoin,
   chave privada, bot de compra, memecoin de launchpad e revisado por pares, mais o nascimento do
   PNUT e do GOAT, o Discord 1 × 296 Telegram, os 800 mil/236 mil canais e o top 1% com 58,6%.
   Não apaguei nada de `foraDaTela` (é campo de arquivo, não de tela). Se o dono quiser, dá para
   enxugar os itens já promovidos depois.

7. **Divergência que não corrigi** (está no próprio arquivo, em `naoVerificadoPratica`): a data
   dos futuros de MOODENG na Binance — a pesquisa 11 diz 15/11/2024 e a reconciliação dela diz
   25/10/2024. Levei a divergência para o `detalhe` de `rotacao`, sem escolher lado.

8. **Número que não está no dado e por isso quase não usei:** o "16" da matriz aparece só em
   `src/views/modulo3.js` (o contador "N ferramentas de 16"); no dado, é o tamanho do array
   `ferramentas`. Escrevi "dezesseis ferramentas" por contagem do próprio array — se o dono
   preferir não fixar o número no texto, troco por "as ferramentas da matriz".

9. **Axiom ≠ Axon:** conferido em três lugares — `correcaoAxiom` no cabeçalho, o campo `correcao`
   do cartão `axiom` na matriz, e a q2 do quiz. O nome certo é **Axiom Trade**; "Axon" só aparece
   como a alternativa errada (a) da q2. Não troquei nenhum dos dois. O Sigma continua como a
   única ferramenta com `naoSuportaSolana: true`.

10. **Uma imprecisão que evitei de propósito:** o destaque da aba técnica diz "250" maiores
    holders no mapa grátis do Bubblemaps, e o painel do mapa diz "top 250". Escrevi "os 250
    maiores holders" nos dois lugares para não criar uma terceira formulação.

11. **Não toquei** em `quiz`, `porqueErradas`, `naoVerificadoPratica`, `fontesPratica`, `mapa`,
    `objetivos`, `subtitulo`, `termos`, `destaques`, `chains`, `papeis`, `ferramentas` (o catálogo
    da matriz), nem em nenhum campo que alimenta desenho.

---

## TERMOS TRADUZIDOS

Varredura na ordem em que o aluno percorre o módulo (Visão geral → Narrativas → Pilar social →
Pilar técnico → Matriz → Cenário). "Estreia" = onde o termo passou a ser explicado.

| Termo | Estreia agora em | Como fica explicado |
|---|---|---|
| contrato | dois-pilares, §1 | o programa que cria o token e define o que pode ser feito com ele |
| carteira | dois-pilares, §2 | uma conta na blockchain |
| liquidez | dois-pilares, §2 | o dinheiro parado num par de negociação; é de onde sai o seu dinheiro quando você vende |
| holders | dois-pilares, §2 | "quem tem" — as carteiras que guardam o token |
| smart money | dois-pilares, detalhe | dinheiro esperto: carteiras que uma empresa de dados marcou como historicamente lucrativas |
| sniping | dois-pilares, detalhe | comprar nos primeiros instantes de vida de um token, na frente dos outros |
| deploy | dois-pilares, detalhe | publicar o contrato do token na blockchain |
| narrativa | ciclo, §1 | um tema que puxa vários tokens ao mesmo tempo |
| preprint | ciclo, detalhe | estudo divulgado antes de passar pela revisão de outros cientistas |
| graduar / graduação | ciclo, detalhe (e cenarioLaunchpads, §1) | completar a fase inicial do launchpad e passar a ser negociado fora dela |
| bot | ciclo, detalhe | conta operada por programa |
| pump-and-dump | ciclo, detalhe | grupo que combina comprar junto para o preço subir e vender em cima de quem chegou depois |
| wash trading | ciclo, detalhe | negociar consigo mesmo só para inflar o volume que aparece na tela |
| hype | narrativa-e-preco, §1 | por contraste com narrativa: um token só com muita gente falando |
| memecoin de launchpad | narrativa-e-preco, §2 | a criada num site de lançamento, como o pump.fun |
| revisado por pares | narrativa-e-preco, §2 | conferido por outros cientistas antes de sair |
| rotação | rotacao, §1 | um tema domina, perde força e outro ocupa o lugar — revezamento, não crescimento |
| market cap | rotacao, §3 | valor de mercado: quantas unidades existem vezes o preço de cada uma |
| "em alta" / trending | ferramentas, §1 e §3 | ranking montado com negociação, com conversa, ou com pagamento |
| Boosts | ferramentas, §2 | pagamento que multiplica o score de um token por 12 a 24 horas |
| API | ferramentas, §3 | o jeito de um programa puxar os dados automaticamente, sem ninguém clicando |
| mindshare | ferramentas, §4 | a fatia da conversa nas redes que um projeto ou tema ocupa |
| endereço do contrato | social/rotina, §1 | sequência longa de letras e números; a identidade do token na blockchain |
| ticker | social/rotina, §1 | o apelido curto do token |
| DM | social/rotina, §3 | mensagem privada |
| stablecoin | social/rotina, exemplo | moeda feita para acompanhar o dólar |
| @handle | social/perfil, §1 | o arroba: o endereço da conta, e o único campo que não dá para copiar |
| badge de afiliação | social/perfil, §2 | o selinho que liga uma conta a uma organização verificada |
| raspar (scraping) | social/perfil, detalhe | um programa lendo as páginas como se fosse uma pessoa |
| assinar / assinatura | social/discord-telegram, §1 | aprovar uma mensagem com a sua carteira (mantido do texto atual) |
| drainer | social/discord-telegram, §2 | golpe feito para esvaziar carteiras |
| bot de compra | social/discord-telegram, §3 | robô dentro do Telegram que compra e vende tokens por você |
| chave privada | social/discord-telegram, §3 | a senha mestra da carteira: quem tem a chave mexe no dinheiro |
| self-bot | social/discord-telegram, detalhe | quando o programa se passa por você na sua própria conta |
| frase-semente | social/discord-telegram, detalhe | as 12 ou 24 palavras que são a carteira (Módulo 1) |
| call | social/calls, §1 | quando alguém com público aponta um token e diz para olhar |
| autoridade (mint, freeze, metadados) | praticaTecnica/ordem, §2 | permissão guardada dentro do token que diz quem ainda pode mudar alguma coisa nele |
| pool | praticaTecnica/ordem, §2 | o par de negociação onde o dinheiro fica parado |
| cluster | praticaTecnica/ordem, §2 | grupo de carteiras ligadas entre si por transferências |
| explorador | praticaTecnica/solscan, §1 | site que mostra, em forma legível, o que está registrado na blockchain |
| SPL clássico × Token-2022 | praticaTecnica/solscan, §2 | "Tokenkeg…" é o SPL clássico; "Tokenz…" é o Token-2022, a versão que aceita extensões |
| par | praticaTecnica/dexscreener, §1 | a dupla token/dinheiro onde a negociação acontece |
| FDV | praticaTecnica/dexscreener, §2 | o supply total menos o queimado, vezes o preço |
| chain / rede / EVM | matriz, §1 | a blockchain onde o token vive; EVM é o grupo de redes que rodam o mesmo tipo de contrato do Ethereum |
| não-custodial | matriz, exemplo | a sua chave fica com você, e não no servidor da ferramenta |
| launchpad | cenarioLaunchpads, §1 | site que cria o token para você em poucos cliques, sem programar |
| bonding curve | cenarioLaunchpads, §1 | a regra de preço da fase nova: quem está do outro lado da sua ordem é a curva, não outro comprador |
| DEX | cenarioLaunchpads, §1 | corretora que funciona por contrato, sem empresa no meio |

Termos que já estavam explicados no texto atual e eu mantive como estavam: "verified" (o código
publicado bate com o que roda, na rotina de 5 minutos), "Esteira" e "Mindshare" no bloco `termos`
da aba Narrativas, e "Insiders" na própria anatomia do RugCheck.
