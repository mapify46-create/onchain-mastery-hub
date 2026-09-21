// modulo4.js — conteúdo do Módulo 4 (gestão, catálise, tese de entrada, take profit).
// Aqui só tem DADOS: nenhuma lógica, nenhum HTML. Para mudar um texto ou um número,
// mude aqui — a interface se adapta sozinha.
// Os cenários do simulador ficam separados, em src/data/cenarios.js.

export const modulo4 = {
  id: 'modulo-4',
  titulo: 'Gestão, catálises & tomada de decisão',
  resumo:
    'Os módulos anteriores mostraram por que o preço se move e onde checar o que está por ' +
    'trás dele. Este módulo é sobre a única parte que depende só de você: decidir antes, por ' +
    'escrito, e cumprir o que decidiu — na entrada e, principalmente, na saída.',
  // Subtítulo do cabeçalho da página: só a segunda frase do resumo, como no desenho.
  subtitulo:
    'Este módulo é sobre a única parte que depende só de você: decidir antes, por escrito, e ' +
    'cumprir o que decidiu — na entrada e, principalmente, na saída.',

  objetivos: [
    'Escrever uma tese de entrada e a catálise esperada antes de qualquer compra.',
    'Reconhecer a diferença entre catálise concreta e narrativa vaga.',
    'Definir alvos de realização e entender por que realizar parcial tira risco da mesa.',
    'Identificar o erro de segurar demais na fase de Degradação (custo afundado).',
    'Treinar a decisão em 12 cenários de simulador e ler o próprio resumo de disciplina.',
  ],

  // Mapa do módulo ("O módulo inteiro numa olhada", no topo da página): o centro
  // e as folhas curtas de cada aba, copiados do desenho (M4 Desktop, renderVals ›
  // ABAS). `aba` é o id da aba na view. O ramo do Quiz não entra aqui: a view
  // conta as perguntas de `quiz` e escreve "N perguntas".
  mapa: {
    titulo: 'Gestão & decisão',
    subtitulo: 'Decidir antes, por escrito',
    ramos: [
      { aba: 'tese', folhas: ['as duas frases', 'ficha de tese', 'mapa das catálises'] },
      { aba: 'take-profit', folhas: ['escada', 'calculadora', 'recuperação', 'segurar demais'] },
      { aba: 'checagens', folhas: ['as 6 checagens', 'tamanho da posição'] },
      { aba: 'simulador', folhas: ['12 cenários fictícios'] },
    ],
  },

  // ---------------------------------------------------------------------------
  // Aba 1 — Tese vs. catálise
  // ---------------------------------------------------------------------------
  teseVsCatalise: {
    titulo: 'Tese vs. catálise: as duas frases que faltam antes de comprar',
    // A ideia central do card (a frase com a borda ciano). Não repete o título nem
    // legenda o visual: abre o que vem depois dele.
    emUmaFrase:
      'Duas frases escritas antes de clicar em comprar são o que separa uma operação de uma ' +
      'aposta — e são elas, depois, que decidem a hora de sair.',
    // O visual do card: as duas frases lado a lado. Cada uma com a pergunta que
    // responde, o que ela é e o que acontece quando vem sozinha.
    duasFrases: [
      {
        nome: 'Tese',
        pergunta: 'Por que este token?',
        oQueE:
          'A razão para ele chamar atenção: a narrativa que monta, a comunidade que já existe, o ' +
          'nicho que ocupa ou o momento de mercado que aproveita.',
        sozinha:
          'Tese sem catálise é um token que pode ficar meses parado, enquanto o seu capital ' +
          'envelhece.',
      },
      {
        nome: 'Catálise',
        pergunta: 'Por que agora?',
        oQueE:
          'O evento concreto que precisa acontecer para trazer compradores novos: uma listagem, ' +
          'uma campanha grande, a graduação para a DEX, um anúncio marcado.',
        sozinha:
          'Catálise sem tese é correr atrás de barulho. Quando o evento passa, não sobra nada que ' +
          'segure o preço.',
      },
    ],
    // Micro-rótulo em vermelho, embaixo de cada frase ("o que acontece se vier sozinha").
    rotuloSozinha: 'Sozinha',
    // A caixa verde embaixo das duas frases.
    juntas: {
      destaque: 'As duas juntas viram o seu critério de saída.',
      texto:
        'Se a catálise aconteceu e o preço não reagiu, a tese estava errada. Se a catálise foi ' +
        'cancelada, o motivo da posição sumiu. Nos dois casos, a decisão já está tomada — por você ' +
        'com a cabeça fria, e não às três da manhã com o gráfico caindo.',
    },
    // Texto corrido do card, logo depois do visual. Substitui o array antigo de 9
    // parágrafos (o texto da primeira versão), que estava guardado aqui só como
    // referência e fora da tela desde o redesenho. A "Pergunta rápida" saiu de
    // todas as seções em 20/09: as perguntas ficam só no quiz do fim do módulo.
    paragrafos: [
      'Tese é a frase que responde "por que este token, e não outro?". Ela nomeia o que você ' +
        'viu: a narrativa que o token monta, a comunidade que já existia antes de você chegar, ' +
        'o nicho que ele ocupa, o momento de mercado que ele aproveita. Catálise é a frase que ' +
        'responde "por que agora?". Ela nomeia um evento concreto, com data, que precisa ' +
        'acontecer para trazer compradores que hoje ainda não compraram.',
      'As duas parecem burocracia até a primeira vez que o preço se mexe forte e você precisa ' +
        'decidir alguma coisa no susto. Quem não escreveu nada decide pela emoção do momento, e ' +
        'a emoção do momento diz sempre a mesma coisa: espera mais um pouco. Quem escreveu as ' +
        'duas frases tem um texto para consultar — escrito por você mesmo, com a cabeça fria, ' +
        'num dia em que ainda não havia nada em jogo.',
      'O efeito prático é este: as duas frases viram o seu critério de saída, sem que você ' +
        'precise inventar um no meio do aperto. Se a catálise aconteceu e o preço não reagiu, a ' +
        'tese estava errada — o mercado viu o mesmo evento que você e não ligou. Se a catálise ' +
        'foi cancelada, ou adiada sem data nova, o motivo da posição sumiu. Nos dois casos a ' +
        'decisão já estava tomada; o que resta é executar.',
      'Na figura acima as duas frases aparecem lado a lado, cada uma com a pergunta que ' +
        'responde. Embaixo de cada uma há um rótulo em vermelho, "Sozinha": é o que acontece ' +
        'quando você tem só aquela metade. Tese sem catálise é um token que pode ficar meses ' +
        'parado enquanto o seu dinheiro envelhece parado junto. Catálise sem tese é correr ' +
        'atrás de barulho: quando o evento passa, não sobra nada segurando o preço. A caixa ' +
        'verde no fim da figura é o que muda quando as duas existem ao mesmo tempo.',
      'Escrever não é escrever bonito, e não é relatório. São duas linhas no bloco de notas do ' +
        'celular, desde que a segunda tenha um evento e um dia. Se você não consegue escrever a ' +
        'segunda frase, isso já é a resposta: ainda não existe o "por que agora".',
    ],

    exemplo: {
      titulo: 'As mesmas duas frases, no dia em que o preço cai',
      passos: [
        'Antes de entrar você escreveu duas linhas. Tese: narrativa X em crescimento, com ' +
          'comunidade ativa há semanas. Catálise: evento do projeto anunciado para a próxima ' +
          'semana, com data marcada.',
        'Escreveu também o prazo: 7 dias. Passado o prazo sem a catálise, a tese venceu — como ' +
          'um pão vence, sem precisar de nenhuma notícia ruim.',
        'Dias depois o preço cai e o grupo diz que é manipulação. Nenhuma das suas duas frases ' +
          'fala de preço, então a queda, sozinha, não respondeu nada.',
        'No sétimo dia o evento acontece e o preço não reage. Aí sim: a catálise chegou e os ' +
          'compradores novos não vieram atrás dela. A pergunta foi respondida, e a resposta foi ' +
          'não.',
        'Repare no que você não precisou decidir no susto. A decisão foi tomada no dia em que ' +
          'você escreveu as frases, com a cabeça fria.',
      ],
    },

    paragrafosFinais: [
      'As duas frases são o começo da ficha de tese, no card seguinte: lá elas ganham mais três ' +
        'campos — prazo, invalidação e alvos de realização. E são também o que o simulador, no ' +
        'fim do módulo, mede em cada escolha: não se o preço subiu, mas se a decisão seguiu o ' +
        'que estava escrito.',
    ],

    detalhe: {
      titulo: 'o que as duas frases fazem, e o que elas não fazem',
      paragrafos: [
        'Escrever as duas frases não aumenta a sua chance de acertar o próximo token. Não é ' +
          'isso que elas fazem. Elas fazem duas coisas mais modestas e mais úteis: dão um ' +
          'critério de saída que não depende do seu humor, e deixam um registro para você reler ' +
          'depois — o único jeito de descobrir se os seus erros se repetem.',
        'Uma tese boa não é uma tese otimista. É uma tese que pode ser respondida com não. Se ' +
          'você não consegue imaginar nenhum resultado que faria você admitir que estava ' +
          'errado, o que você escreveu não é tese: é torcida com vocabulário técnico.',
        'Nada aqui é recomendação de compra ou venda. Este app não escreve a sua regra e não ' +
          'diz quando entrar nem quando sair: ele mostra o formato da decisão e devolve a ' +
          'caneta para você.',
      ],
    },

    regraDeOuro: {
      titulo: 'Regra de ouro',
      texto:
        'Antes de entrar, escreva duas frases: (a) a tese — por que este token? e (b) a ' +
        'catálise esperada — qual evento concreto precisa acontecer para ele valorizar. Se ' +
        'você não consegue escrever a segunda frase, não é operação: é aposta.',
    },

    // A ficha aparece dentro do card "A anatomia de um plano", logo depois dos
    // níveis: cinco cartões lado a lado e a frase `introducao` embaixo. O título
    // não aparece na tela (o card já tem o dele).
    fichaDeTese: {
      titulo: 'Ficha de tese: cinco campos para preencher antes de clicar em comprar',
      introducao:
        'Copie estes cinco campos para o seu caderno de operações (o "caderno de trades", se ' +
        'você já ouviu o termo em inglês) e preencha na ordem, antes de cada entrada. Leva dois ' +
        'minutos. O valor não está no papel: está em ter respondido "o que me faria admitir que ' +
        'errei?" num momento em que responder ainda não custava nada.',
      campos: [
        {
          rotulo: 'Tese',
          pergunta: 'Por que este token, e não os outros mil de hoje?',
          exemplo: 'Ex.: narrativa X em crescimento, com comunidade ativa há semanas.',
        },
        {
          rotulo: 'Catálise',
          pergunta: 'Que evento concreto precisa acontecer para trazer compradores novos?',
          exemplo: 'Ex.: graduação para a DEX; campanha anunciada para a semana que vem.',
        },
        {
          rotulo: 'Prazo',
          pergunta: 'Até quando esse evento deve acontecer?',
          exemplo: 'Ex.: 7 dias. Passou o prazo sem a catálise, a tese venceu.',
        },
        {
          rotulo: 'Invalidação',
          pergunta: 'O que faria você admitir que estava errado?',
          exemplo: 'Ex.: catálise aconteceu e o preço não reagiu; ou LP destravada.',
        },
        {
          rotulo: 'Alvos de realização',
          pergunta: 'Em que pontos você vende parte, e quanto?',
          exemplo: 'Ex.: recuperar o investido no primeiro alvo; faixas seguintes definidas.',
        },
      ],
    },

    // A tabela "Tese fraca × tese que dá para invalidar": título, ideia central,
    // os cabeçalhos das 4 colunas e o nome da área que rola no celular.
    tabelaDosExemplos: {
      titulo: 'Tese fraca × tese que dá para invalidar',
      emUmaFrase:
        'A diferença não é a qualidade da escrita: é existir um evento com data que possa falhar.',
      colunas: {
        exemplo: 'Exemplo',
        tese: 'Tese',
        catalise: 'Catálise',
        veredito: 'Dá para invalidar?',
      },
      rotuloDaRolagem: 'Três exemplos de tese e catálise (role na horizontal se preciso)',

      paragrafos: [
        'Invalidar uma tese é conseguir dizer, antes de entrar, qual resultado faria você ' +
          'admitir que estava errado. Parece pessimismo. É o contrário: é o que permite ficar ' +
          'calmo na posição enquanto esse resultado não chega, porque você sabe exatamente o ' +
          'que está esperando.',
        'Uma tese que não pode ser invalidada nunca termina. Ela se adapta a qualquer notícia: ' +
          'se sobe, estava certa; se cai, "é só o mercado"; se fica parada, "ainda é cedo". Uma ' +
          'tese assim não erra nunca — e por isso também não ensina nada e nunca manda você ' +
          'sair. É confortável de escrever e cara de manter.',
        'A tabela acima tem quatro colunas: o exemplo, a tese, a catálise e o veredito, que ' +
          'responde "dá para invalidar?". Leia da direita para a esquerda: primeiro o veredito, ' +
          'depois volte para ver o que na tese e na catálise produziu aquele veredito. No ' +
          'celular a tabela rola na horizontal.',
        'Compare as três linhas e repare que o problema das duas primeiras não é estilo. Na ' +
          'primeira, o motivo da compra é o próprio preço — não há evento nenhum, e se cair a ' +
          'única regra disponível é a esperança. Na segunda existe uma tese razoável, mas a ' +
          'catálise é "uma hora isso explode": "uma hora" não é prazo e "explode" não é evento. ' +
          'Sem data e sem gatilho, nunca chega a hora de sair. A terceira linha tem as duas ' +
          'coisas — checagens técnicas em ordem e um evento anunciado para a próxima semana, ' +
          'com data marcada —, e por isso dá para verificar, dá para invalidar e dá para sair.',
        'O erro que esta tabela evita é o mais comum de todos: trocar a tese pelo gráfico. ' +
          '"Está subindo forte" descreve o passado e não contém nenhum evento futuro. Quem ' +
          'compra por isso fica sem resposta no primeiro dia ruim, porque nunca escreveu qual ' +
          'seria o dia da verdade.',
      ],

      paragrafosFinais: [
        'Um teste rápido, antes de entrar: leia a sua catálise em voz alta e procure a data. Se ' +
          'não houver data, nem que seja aproximada, você ainda não tem catálise — tem ' +
          'expectativa.',
      ],

      detalhe: {
        titulo: 'o que o prazo decide, e o que ele não decide',
        paragrafos: [
          'Prazo não é promessa. Ninguém consegue prometer que um evento acontece em sete dias, ' +
            'e não é isso que o campo faz. Ele marca o dia de reabrir a ficha e reler o que ' +
            'você escreveu, quando a memória do momento da compra já passou.',
          'Prazo vencido também não decide nada sozinho. Ele só obriga a uma de duas coisas: ' +
            'escrever a tese e a catálise de novo, com a data de hoje e um prazo novo, ou ' +
            'reconhecer que o motivo original acabou. As duas saídas são legítimas; o que não ' +
            'existe é a terceira, que é continuar sem reescrever nada.',
        ],
      },
    },

    // Uma linha da tabela por exemplo. O veredito responde à última coluna ("Dá
    // para invalidar?"), por isso começa com "Não." ou "Sim.".
    exemplos: [
      {
        tipo: 'fraca',
        rotulo: 'Tese fraca',
        tese: '"O gráfico está bonito e está subindo forte."',
        catalise: '"Se continuar subindo, vai muito mais."',
        veredito:
          'Não. O motivo da compra é o próprio preço, e não há evento nenhum — se cair, a única ' +
          'regra disponível é a esperança.',
      },
      {
        tipo: 'fraca',
        rotulo: 'Catálise vaga',
        tese: '"A comunidade é muito ativa e o projeto tem potencial."',
        catalise: '"Uma hora isso explode."',
        veredito:
          'Não. "Uma hora" não é prazo e "explode" não é evento: sem data e sem gatilho, nunca ' +
          'chega a hora de sair.',
      },
      {
        tipo: 'forte',
        rotulo: 'Tese + catálise concretas',
        tese: '"Token com comunidade ativa há semanas, checagens técnicas em ordem."',
        catalise: '"Evento do projeto anunciado para a próxima semana, com data marcada."',
        veredito:
          'Sim. Dá para verificar, dá para invalidar e dá para sair: se o evento acontecer e o ' +
          'preço não reagir, você sabe no mesmo dia.',
      },
    ],

    // O mapa das catálises: um centro e um ramo por catálise, cada ramo com a
    // descrição e a caixa âmbar "O que dá errado:". Tudo à vista, sem abrir nada.
    tiposDeCatalise: {
      titulo: 'O mapa das catálises — e o que costuma dar errado em cada uma',
      emUmaFrase:
        'Toda catálise tem um lado que trabalha contra você. Saber qual é muda o tamanho e o ' +
        'prazo da posição.',
      centro: { titulo: 'Catálise', subtitulo: '"por que agora?"' },
      rotuloDoAlerta: 'O que dá errado:',
      rotuloDaRolagem: 'Mapa das catálises (role na horizontal se preciso)',
      // Primeira frase da descrição que o leitor de tela lê no mapa. É função
      // porque leva a quantidade de catálises: o número sai da lista abaixo, e
      // não escrito à mão, para o texto não mentir se a lista mudar.
      aberturaDaDescricao: (quantidade) => quantidade + ' catálises comuns.',
      itens: [
        {
          nome: 'Listagem em corretora',
          descricao: 'Um evento com data, que traz compradores que antes não tinham acesso.',
          alerta:
            'O anúncio muitas vezes mexe mais no preço do que a listagem em si. Quem comprou ' +
            'pelo rumor costuma vender no fato.',
        },
        {
          nome: 'Graduação para a DEX',
          descricao:
            'O token sai da bonding curve (a curva de preço do lançamento) e ganha um pool com ' +
            'liquidez mais profunda. No Pump.fun, isso acontece com cerca de 85 SOL arrecadados ' +
            '(dados de set/2025). Em dólar não há limiar fixo: numa amostra de ago/2026, 80% das ' +
            'graduações ficaram entre US$ 11 mil e US$ 101 mil.',
          alerta:
            'É também quando quem comprou na curva finalmente consegue vender volume. A ' +
            'liquidez que atrai você é a mesma que dá saída para eles.',
        },
        {
          nome: 'Atenção de figura pública',
          descricao: 'Um perfil grande interage e traz uma multidão de olhos de uma vez.',
          alerta:
            'Costuma ser catálise curta, e o risco de contrato impostor é alto. Confirme o ' +
            'endereço oficial na fonte antes de qualquer coisa.',
        },
        {
          nome: 'Narrativa em crescimento',
          descricao:
            'Um tema puxa vários tokens ao mesmo tempo, e a atenção do setor migra para lá.',
          alerta:
            'É a catálise mais difícil de datar. Se você entra cedo demais, fica segurando. Se ' +
            'entra tarde demais, compra o topo.',
        },
        {
          nome: 'Evento do projeto com data marcada',
          descricao: 'Lançamento, parceria anunciada, campanha ou migração, com dia definido.',
          alerta:
            'É a melhor catálise para estudar, porque tem prazo. Cuidado com datas que vão ' +
            'sendo adiadas: adiamento é sinal, não detalhe.',
        },
      ],

      paragrafos: [
        'Catálise não é uma coisa só. O mapa acima parte de um centro — "por que agora?" — e ' +
          'abre nas cinco que mais aparecem: listagem em corretora, graduação para a DEX, ' +
          'atenção de figura pública, narrativa em crescimento e evento do projeto com data ' +
          'marcada. DEX é a corretora descentralizada: o lugar onde a troca acontece direto da ' +
          'sua carteira, sem uma empresa guardando o seu dinheiro no meio do caminho.',
        'Cada ramo traz a descrição e, embaixo dela, uma caixa âmbar com "O que dá errado:". ' +
          'Essa caixa é a parte útil do mapa. Toda catálise tem um lado que trabalha contra ' +
          'você, e esse lado quase sempre é a mesma coisa: o evento que traz compradores novos ' +
          'também é o evento que dá saída para quem entrou antes de você.',
        'Saber qual catálise você tem na mão muda duas decisões práticas, antes mesmo de ' +
          'qualquer número. A primeira é o prazo que você escreve na ficha: um evento com data ' +
          'marcada tem prazo óbvio; uma narrativa em crescimento é a catálise mais difícil de ' +
          'datar, e o mapa avisa que entrar cedo demais é ficar segurando e entrar tarde demais ' +
          'é comprar o topo. A segunda é o tamanho: a atenção de figura pública costuma ser ' +
          'catálise curta e vem junto com risco alto de contrato impostor — confirmar o ' +
          'endereço oficial na fonte vem antes de qualquer outra coisa.',
        'A graduação para a DEX é a que tem números no mapa, e vale entender o que eles são. O ' +
          'token começa numa bonding curve, a curva de preço do lançamento, em que o preço sobe ' +
          'conforme as pessoas compram. Quando arrecada o suficiente, ele "gradua": sai da ' +
          'curva e ganha um pool com liquidez mais profunda. No Pump.fun isso acontece com ' +
          'cerca de 85 SOL arrecadados (dados de set/2025). Em dólar não há limiar fixo: numa ' +
          'amostra de ago/2026, 80% das graduações ficaram entre US$ 11 mil e US$ 101 mil.',
        'O erro que o mapa evita é tratar toda catálise como se fosse a mesma coisa e comprar o ' +
          'barulho sem perguntar quem está do outro lado do barulho. Na listagem, a expressão ' +
          'que descreve isso é conhecida em inglês: buy the rumor, sell the news — comprar no ' +
          'rumor, vender no fato. Quem comprou pelo anúncio costuma vender no dia em que a ' +
          'listagem acontece, que é justamente o dia em que o iniciante compra.',
      ],

      exemplo: {
        titulo: 'A mesma listagem, lida por duas pessoas',
        passos: [
          'Sai o anúncio: a listagem numa corretora grande acontece na sexta-feira.',
          'A primeira pessoa entra pelo anúncio e escreve na ficha que a catálise é a ' +
            'sexta-feira. O prazo dela tem data e o dia da verdade já está marcado.',
          'A segunda entra na sexta, quando a listagem já aconteceu, porque "agora ficou ' +
            'oficial". A catálise dela já passou: ela comprou o fim do evento, não o começo.',
          'O mapa avisa exatamente isso na caixa âmbar: o anúncio muitas vezes mexe mais no ' +
            'preço do que a listagem em si.',
          'Nenhuma das duas leituras é uma regra de compra, e este app não escreve a sua. A ' +
            'diferença entre elas é só uma: a primeira sabe qual dia responde a pergunta dela; ' +
            'a segunda não marcou dia nenhum.',
        ],
      },

      paragrafosFinais: [
        'Repare que o mapa não ordena as catálises da melhor para a pior. Ele ordena pelo que ' +
          'você consegue fazer com cada uma. A de data marcada é a mais fácil de estudar, ' +
          'porque existe um dia em que a resposta chega — e por isso mesmo vale o alerta dela: ' +
          'cuidado com datas que vão sendo adiadas, porque adiamento é sinal, não detalhe.',
      ],

      detalhe: {
        titulo: 'as três ressalvas dos números da graduação',
        paragrafos: [
          'Os números da graduação merecem três ressalvas. Primeira: o limiar é contado em SOL, ' +
            'a moeda da rede Solana, e não em dólar — por isso a mesma regra, convertida, vira ' +
            'uma faixa larga em vez de um valor. Segunda: a faixa de US$ 11 mil a US$ 101 mil ' +
            'cobre 80% das graduações daquela amostra de ago/2026, ou seja, a maior parte, mas ' +
            'não todas. Terceira: é uma amostra de uma data, não uma promessa sobre a próxima ' +
            'graduação que você for ver.',
          'A graduação é a catálise com o aviso mais duro do mapa, e é bom lê-lo devagar: é ' +
            'também o momento em que quem comprou na curva finalmente consegue vender volume. A ' +
            'liquidez mais profunda que atrai você é a mesma que dá saída para eles.',
        ],
      },
    },
  },

  // ---------------------------------------------------------------------------
  // Aba 2 — Take profit
  // ---------------------------------------------------------------------------
  takeProfit: {
    // O título e os parágrafos abaixo são o texto corrido da primeira versão. A
    // tela não os mostra desde o redesenho (as ideias foram para os destaques da
    // aba e para o card da escada); ficam guardados aqui como referência.
    titulo: 'Take profit: o lucro que você não realizou não é seu',
    paragrafos: [
      'Enquanto a posição está aberta, o lucro é só um número na tela. É uma promessa que ' +
        'depende de existir comprador na hora em que você quiser sair.',
      'Em memecoin, essa promessa some rápido. A liquidez que sustenta o preço na subida é a ' +
        'mesma que desaparece na descida.',
      'Realização parcial resolve isso sem exigir que você acerte o topo. Você vende uma faixa ' +
        'e recupera o valor investido. O que sobra passa a correr por conta do lucro.',
      'A posição continua na mesa, mas o medo sai dela. E é o medo que piora as decisões.',
      'O ponto que quase ninguém aceita de primeira: o alvo de realização se define ANTES de ' +
        'entrar, junto com a tese.',
      'Definido depois, com o gráfico piscando, o alvo já nasce contaminado pela euforia ou ' +
        'pelo medo do momento.',
    ],

    // O card da escada: três faixas em degrau, a legenda com o selo "exemplo
    // didático" e o texto corrido. A "Pergunta rápida" q2 saiu em 20/09 (as
    // perguntas ficam só no quiz do fim do módulo).
    escada: {
      titulo: 'A escada de realização, faixa a faixa',
      emUmaFrase:
        'O lucro que você não realizou não é seu. Nenhuma faixa depende de prever o topo — a ' +
        'escada existe justamente porque ninguém acerta o topo de forma consistente.',
      legenda:
        'Exemplo didático da estrutura — não é sugestão de onde vender. O que importa é o ' +
        'formato: faixas definidas antes, cada uma com um motivo, e a última com regra de saída ' +
        'escrita.',
      selo: 'exemplo didático',

      // Substitui o campo `paragrafo` (singular) e absorve os parágrafos de
      // referência que estavam em takeProfit.paragrafos, acima.
      paragrafos: [
        'Realizar é vender uma parte da posição e transformar o número da tela em dinheiro que ' +
          'já está na sua carteira. Em inglês o gesto se chama take profit, literalmente "pegar ' +
          'o lucro" — é o nome desta aba. Enquanto a posição está aberta, o lucro não é seu: é ' +
          'uma promessa que depende de existir comprador na hora em que você quiser sair.',
        'Em memecoin essa promessa some rápido. Liquidez é o dinheiro parado do outro lado, ' +
          'pronto para comprar de você; a liquidez que sustenta o preço na subida é a mesma que ' +
          'desaparece na descida, porque são as mesmas pessoas. O preço que você vê na tela é ' +
          'só o preço do último negócio feito, não uma garantia de que existe alguém disposto a ' +
          'repetir aquele preço com o seu tamanho.',
        'Realização parcial resolve isso sem exigir que você acerte o topo. Você vende uma ' +
          'faixa e recupera o valor investido; o que sobra passa a correr por conta do lucro. A ' +
          'posição continua na mesa, mas o medo sai dela — e é o medo que piora as decisões.',
        'Na figura acima os três degraus aparecem de baixo para cima, cada um com o que se faz ' +
          'e, embaixo, o porquê. O selo "exemplo didático" não é formalidade jurídica: os ' +
          'degraus mostram o formato, não onde vender. Onde ficam os seus alvos é decisão sua, ' +
          'e este app não escreve essa regra por você.',
        'Falta o ponto que quase ninguém aceita de primeira: o alvo de realização se define ' +
          'antes de entrar, junto com a tese. Definido depois, com o gráfico piscando, ele já ' +
          'nasce contaminado pela euforia ou pelo medo do momento — e aí não é mais um alvo, é ' +
          'uma reação.',
      ],

      exemplo: {
        titulo: 'O degrau que muda o pior caso',
        passos: [
          'Você entrou com um valor que pode perder inteiro, e escreveu os três degraus antes ' +
            'de entrar.',
          'O preço sobe e o primeiro alvo é atingido. Você vende a fração que devolve ' +
            'exatamente o valor investido.',
          'Nada de mágico aconteceu no preço. O que mudou foi o pior caso: a partir daqui a ' +
            'posição não pode mais terminar em prejuízo. É a mudança que mais reduz o peso ' +
            'emocional da posição.',
          'O preço sobe de novo e o segundo alvo é atingido. Você vende outra faixa — isso já é ' +
            'lucro que existe fora da tela, sem depender de o movimento continuar.',
          'O que sobra corre com a regra escrita no terceiro degrau. Sem essa regra, é assim ' +
            'que uma posição que multiplicou por cinco termina valendo nada.',
        ],
      },

      paragrafosFinais: [
        'A escada não é um número, é um formato: faixas definidas antes, cada uma com um ' +
          'motivo, e a última com regra de saída escrita. As duas calculadoras a seguir existem ' +
          'para você mexer nesse formato e ver o que ele faz. A primeira mostra como a posição ' +
          'se reparte entre os degraus; a segunda mostra por que o degrau de baixo, a ' +
          'invalidação, importa tanto quanto os de cima.',
      ],

      detalhe: {
        titulo: 'por que a primeira faixa não é escolha sua',
        paragrafos: [
          'Por que a primeira faixa não é uma escolha: ela é definida pela conta. Se o objetivo ' +
            'do primeiro degrau é devolver exatamente o valor investido, a fração a vender sai ' +
            'do alvo escolhido, e não do seu gosto. Quanto mais alto o primeiro alvo, menor a ' +
            'fração necessária — é a única parte da escada que não é opinião.',
          'Realizar parcial não prevê topo nenhum, e é exatamente por isso que funciona. Quem ' +
            'espera o topo precisa acertar um instante; quem realiza em faixas precisa só ter ' +
            'escrito as faixas. A escada troca a promessa de acertar pelo hábito de decidir ' +
            'antes.',
          'Realizar também não muda a regra do imposto: cada venda é apurada por si. O que vem ' +
            'depois de realizar está no card do erro de segurar, recolhido em "Para ir mais ' +
            'fundo", e é informativo — não é aconselhamento tributário.',
        ],
      },
      // Cada faixa aparece como "<alvo> — <acao>" e, embaixo, o porquê.
      faixas: [
        {
          alvo: 'Primeiro alvo',
          acao: 'vender a fração que recupera o valor investido',
          porque:
            'A partir daqui o pior caso deixa de ser prejuízo. É a mudança que mais reduz o ' +
            'peso emocional da posição.',
        },
        {
          alvo: 'Segundo alvo',
          acao: 'vender outra faixa, já como lucro realizado',
          porque:
            'Transforma parte da alta em dinheiro que existe de verdade, sem depender de o ' +
            'movimento continuar.',
        },
        {
          alvo: 'Restante',
          acao: 'deixar correr, com uma regra de saída escrita',
          porque:
            'Ex.: sair se cair X% do topo, ou se a catálise falhar. O que não pode existir é ' +
            'restante sem regra — é assim que 5x vira 0.',
        },
      ],
    },

    // O card do erro de segurar: o fluxograma "você compraria hoje?", a legenda,
    // o texto corrido e a tributação dentro de "Para ir mais fundo". A "Pergunta
    // rápida" q3 saiu em 20/09 (as perguntas ficam só no quiz do fim do módulo).
    erroDeSegurar: {
      titulo: 'O erro de segurar demais (e por que ele parece racional na hora)',
      emUmaFrase:
        'O dinheiro já foi gasto de qualquer jeito. A única pergunta que importa: você compraria ' +
        'este token, neste preço, hoje?',
      // Situação → pergunta → dois ramos, cada um com dois passos. O primeiro
      // passo de cada ramo é a decisão; o segundo, a explicação (texto cinza).
      fluxograma: {
        situacao: 'A posição está em prejuízo, na fase de Degradação',
        pergunta: 'Você compraria este token, neste preço, hoje?',
        sim: {
          rotulo: 'Sim, compraria',
          decisao: 'A posição continua, pela tese — não pelo preço médio',
          explicacao: 'Reescreva a tese e a catálise com a data de hoje',
        },
        nao: {
          rotulo: 'Não compraria',
          decisao: 'A posição já está encerrada. Só falta executar.',
          explicacao: '"Assumir o prejuízo" não é o custo de vender: é o custo que já aconteceu',
        },
        legenda:
          'Na Degradação a liquidez seca porque a atenção foi embora: cada tentativa de venda ' +
          'encontra um livro de ofertas mais fino que o do dia anterior. O preço não cai por ' +
          'acaso — cai porque ninguém está mais olhando.',
      },
      // Texto corrido do card. Substitui o array de referência da primeira versão,
      // que a tela não mostrava, e o antigo campo `paragrafoFinal` (agora o
      // primeiro item de paragrafosFinais, abaixo).
      paragrafos: [
        'Degradação é a última das 4 fases do Módulo 2. Nela a atenção já migrou para outro ' +
          'token: o grupo esvazia, ninguém mais posta, e não chegam compradores novos. O preço ' +
          'não cai por acaso nem por maldade de ninguém — cai porque ninguém está mais olhando.',
        'Cada tentativa de venda encontra um livro de ofertas mais fino que o do dia anterior. ' +
          'Livro de ofertas é a fila de quem está disposto a comprar e a que preço; "mais fino" ' +
          'quer dizer menos gente nessa fila, com valores menores. Vender ali empurra o preço ' +
          'para baixo sozinho, e amanhã a fila estará ainda menor.',
        'É exatamente aí que aparece o custo afundado — em inglês, sunk cost: o dinheiro que já ' +
          'saiu e não volta, faça o que você fizer. A cabeça trata vender como "assumir o ' +
          'prejuízo", como se não vender mantivesse a operação viva. Mas o prejuízo não ' +
          'acontece no clique de vender; ele já aconteceu. O clique só reconhece o que existe.',
        'Por isso o fluxograma acima tem uma pergunta só, e ela não menciona o seu preço de ' +
          'entrada: você compraria este token, neste preço, hoje? Da pergunta saem dois ramos. ' +
          'No "sim, compraria", a posição continua pela tese — não pelo preço médio — e a tese ' +
          'precisa ser reescrita com a data de hoje. No "não compraria", a posição já está ' +
          'encerrada e só falta executar.',
        'O erro que essa pergunta evita tem várias fantasias, e a mais cara é comprar mais para ' +
          '"melhorar o preço médio". Isso não melhora nada: aumenta a posição num token que ' +
          'você acabou de admitir que não compraria hoje. A calculadora logo acima mostra o ' +
          'preço da demora em números — a partir de uma perda de 67%, o ganho necessário só ' +
          'para empatar já passa de 200%.',
      ],

      exemplo: {
        titulo: 'A pergunta, aplicada',
        passos: [
          'A posição está em prejuízo e o token entrou na Degradação: o grupo esvaziou, o ' +
            'volume sumiu, faz dias que não aparece comprador novo.',
          'Pergunta única: eu compraria este token, neste preço, hoje?',
          'Se a resposta é sim, a posição continua pela tese. Então reescreva a tese e a ' +
            'catálise com a data de hoje, e um prazo novo — se não der para reescrever, a ' +
            'resposta era não.',
          'Se a resposta é não, a posição já está encerrada. Só falta executar. "Assumir o ' +
            'prejuízo" não é o custo de vender: é o custo que já aconteceu.',
          'Repare que a pergunta não pergunta por quanto você comprou. O mercado também não ' +
            'sabe o seu preço de entrada, e não é por ele que o preço vai voltar.',
        ],
      },

      paragrafosFinais: [
        'Segurar por tempo demais transforma uma perda pequena e planejada num rombo que leva ' +
          'meses para recuperar. E esse erro, diferente de quase tudo neste mercado, não ' +
          'depende do token, da chain nem da sorte. Depende só de não ter escrito a regra antes.',
        'E se o caminho tiver sido o outro, e você tiver realizado lucro, existe uma parte ' +
          'chata que vem depois: o que o Brasil espera de quem vendeu. Ela está logo abaixo, ' +
          'recolhida em "Para ir mais fundo", e é informativa.',
      ],
      // Sem campo `detalhe` aqui: quem ocupa o "Para ir mais fundo" deste card é a
      // tributação, logo abaixo.
    },

    // Fica recolhida em "Para ir mais fundo", dentro do card do erro de segurar.
    tributacao: {
      titulo: 'Realizou lucro no Brasil? O que vem depois (informativo)',
      aviso:
        'Esta seção é informativa e NÃO é aconselhamento tributário. Regras mudam com ' +
        'frequência e há divergência entre fontes — confirme tudo com um contador ' +
        'especializado antes de declarar qualquer coisa.',

      // Texto de abertura, antes da lista de pontos.
      paragrafos: [
        'Realizar lucro tem uma consequência fora da tela. No Brasil, vender cripto com ganho ' +
          'pode gerar imposto, e apurar e pagar é responsabilidade sua, não da corretora. Ganho ' +
          'de capital, aqui, é a diferença entre o que você recebeu na venda e o que tinha ' +
          'pagado na compra daquilo que vendeu.',
        'O ponto que mais confunde quem está começando é o que conta para o limite de isenção: ' +
          'é o total vendido no mês, somando todas as vendas, e não o lucro. Dá para ter lucro ' +
          'pequeno e ainda assim passar do limite, se você girou muito. Por isso o hábito de ' +
          'anotar cada operação vale mais do que decorar alíquota.',
        'O que vem abaixo é o estado da regra segundo as fontes que este módulo usou, com a ' +
          'data de cada uma. Regra tributária muda, e muda por decisão política — o primeiro ' +
          'ponto da lista é justamente um caso de mudança anunciada que acabou não valendo.',
      ],

      pontos: [
        {
          rotulo: 'MP 1.303/2025 — não valeu',
          texto:
            'A medida provisória que propunha alíquota única de 17,5% e o fim da isenção ' +
            'mensal foi rejeitada pela Câmara dos Deputados em outubro de 2025 e perdeu a ' +
            'validade. Ou seja: essa mudança não entrou em vigor. Se você leu sobre ela em ' +
            'algum texto antigo, era uma proposta, e a proposta caiu.',
        },
        {
          rotulo: 'Isenção de R$ 35 mil no mês',
          texto:
            'Pela regra que segue vigente para o IRPF 2026, ganhos de capital com cripto em ' +
            'corretoras nacionais são isentos se a soma das VENDAS no mês não passar de ' +
            'R$ 35 mil. Repare: o limite é sobre o total vendido, não sobre o lucro. São todas ' +
            'as vendas do mês somadas, não cada venda olhada de forma separada.',
        },
        {
          rotulo: 'Acima do limite',
          texto:
            'Passando de R$ 35 mil em vendas no mês, aplicam-se alíquotas progressivas a ' +
            'partir de 15% (até 22,5%), apuradas no programa GCAP, com DARF (código 4600) ' +
            'até o último dia útil do mês seguinte. GCAP é o programa da Receita para ganho de ' +
            'capital e DARF é a guia com que o imposto é pago; o código identifica que tipo de ' +
            'imposto está sendo recolhido.',
        },
        {
          rotulo: 'Operações no exterior',
          texto:
            'Operações fora do país seguem a Lei 14.754/2023, com regras próprias — outro ' +
            'motivo para ter alguém especializado revisando, porque quem opera em corretora ' +
            'estrangeira ou direto na carteira cai em texto legal diferente do de cima.',
        },
        {
          rotulo: 'Saque em reais',
          texto:
            'Na prática, sair para real acontece via corretora nacional com Pix (exige KYC/CPF) ' +
            'ou via P2P. KYC é a verificação de identidade que a corretora faz antes de liberar ' +
            'saque; P2P é a negociação de pessoa para pessoa, sem a corretora no meio. No P2P, ' +
            'o risco é a contraparte: nunca libere a cripto antes de confirmar que o Pix caiu ' +
            'de fato na sua conta.',
        },
      ],

      paragrafosFinais: [
        'Duas atitudes práticas que não dependem de nenhuma regra específica: guardar o ' +
          'registro de cada compra e de cada venda, com data, valor e taxa, desde a primeira ' +
          'operação; e, se em algum mês você passar do limite, procurar um contador antes de ' +
          'declarar, não depois. Esta seção é informativa e não substitui essa conversa.',
      ],
    },
  },

  // ---------------------------------------------------------------------------
  // Aba 3 — Checagens técnicas antes de entrar
  // ---------------------------------------------------------------------------
  // O card das seis checagens: um fluxograma em que cada pergunta tem a saída
  // "Resposta boa: siga" embaixo e a saída "Alerta: não entra" à direita. Depois,
  // o texto corrido e o quadro de vocabulário. A "Pergunta rápida" q4 saiu em
  // 20/09 (as perguntas ficam só no quiz do fim do módulo).
  checagens: {
    titulo: 'As seis checagens que vêm antes da tese',
    emUmaFrase:
      'Qualquer resposta ruim aqui derruba a operação, por melhor que a narrativa esteja. Cada ' +
      '"não" leva ao mesmo lugar.',
    rotuloDoAlerta: 'Alerta: não entra',
    rotuloDaRespostaBoa: 'Resposta boa: siga',
    fim:
      'Passou nas seis: agora sim, escreva a tese e a catálise. Passar não aprova o token — só ' +
      'quer dizer que ele não mostrou os problemas que dá para ver.',
    paragrafos: [
      'As seis perguntas acima são sobre o contrato do token e sobre quem controla o quê. Não ' +
        'são sobre o projeto, a arte, o grupo nem a narrativa. São a peneira do Módulo 3 ' +
        'aplicada ao momento da decisão, e vêm antes da tese por um motivo simples: nenhuma ' +
        'tese sobrevive a um contrato desenhado para prender você lá dentro.',
      'No fluxograma, cada pergunta tem duas saídas: "Resposta boa: siga", embaixo, e "Alerta: ' +
        'não entra", à direita. Repare que todas as saídas de alerta vão para o mesmo lugar. ' +
        'Não é uma nota de zero a dez em que o bom compensa o ruim: basta um "não" para ' +
        'derrubar a operação inteira, e é por isso que a peneira é rápida.',
      'As seis perguntas usam palavras que o mercado só fala em inglês. O quadro abaixo traduz ' +
        'cada uma antes de você ler os alertas, para você não precisar adivinhar pelo contexto.',
    ],

    quadro: [
      {
        rotulo: 'Pool e LP',
        texto:
          'Pool é o par de moedas depositado numa corretora descentralizada para que as trocas ' +
          'possam acontecer: é o dinheiro que fica do outro lado quando você compra ou vende. ' +
          'LP vem de liquidity pool e, na prática, são os tokens que comprovam quem depositou. ' +
          'LP travada quer dizer que esse comprovante está bloqueado por um tempo e ninguém ' +
          'consegue sacar o pool; LP destravada quer dizer que dá para sacar a qualquer momento.',
      },
      {
        rotulo: 'Authority (autoridade)',
        texto:
          'É uma permissão gravada no próprio token, que continua valendo depois que ele nasce. ' +
          'Mint authority é a permissão de criar unidades novas. Freeze authority é a permissão ' +
          'de congelar contas, ou seja, impedir que alguém movimente o que tem. "Revogada" quer ' +
          'dizer que a permissão foi apagada e nem o criador pode mais usá-la.',
        destaque: true,
      },
      {
        rotulo: 'Supply, holders e concentração',
        texto:
          'Supply é a quantidade total de unidades do token que existe. Holders são as ' +
          'carteiras que detêm essas unidades. Concentração é quanto do supply está nas mãos ' +
          'das maiores carteiras — e "top 10" é a lista das dez maiores, que os exploradores de ' +
          'rede mostram prontinha.',
      },
      {
        rotulo: 'Bundle',
        texto:
          'Um pacote de várias compras enviadas juntas para caírem no mesmo bloco, isto é, no ' +
          'mesmo instante da rede. Serve para garantir que quem enviou compre antes de todo ' +
          'mundo, no preço mais baixo que vai existir naquele token.',
      },
      {
        rotulo: 'Market cap e honeypot',
        texto:
          'Market cap é o valor de mercado: o preço de uma unidade multiplicado pelo supply. É ' +
          'o número grande que impressiona e que não diz nada sobre quanto dinheiro existe do ' +
          'outro lado para comprar de você. Honeypot, "pote de mel", é o token em que dá para ' +
          'entrar e não dá para sair.',
      },
    ],

    exemplo: {
      titulo: 'Por que a primeira pergunta é a primeira',
      passos: [
        'O criador é dono dos tokens de LP, o comprovante do pool.',
        'Ele devolve esse comprovante ao pool e retira a liquidez inteira.',
        'Some o dinheiro que estava do outro lado das ofertas, e o preço vira pó no mesmo ' +
          'bloco. Não em minutos: no mesmo bloco. Isso é o hard rug, a puxada de tapete na ' +
          'forma mais rápida que existe.',
        'Ninguém reage, porque não há tempo entre uma coisa e a outra. Por isso esta pergunta ' +
          'vem antes de qualquer análise de narrativa.',
        'No pump.fun, depois da graduação, a pool é do protocolo e isso não acontece. O golpe ' +
          'que sobra lá é o criador vender a própria compra (Módulo 6).',
      ],
    },

    // Absorve o antigo campo `paragrafoFinal`.
    paragrafosFinais: [
      'Tese e catálise só importam se o contrato por trás resistir a uma checagem. É por isso ' +
        'que estas seis perguntas vêm primeiro, mesmo quando a narrativa está ótima e o grupo ' +
        'está eufórico: a peneira não melhora com entusiasmo.',
      'O erro que ela evita é começar pelo fim — se apaixonar pela história, escrever uma tese ' +
        'bonita e só então abrir o RugCheck, quando já é tarde para olhar com isenção. Passar ' +
        'nas seis não aprova o token; só quer dizer que ele não mostrou os problemas que dá ' +
        'para ver.',
    ],

    detalhe: {
      titulo: 'o estudo da liquidez travada e a ferramenta de cada pergunta',
      paragrafos: [
        'Trava não aprova token, e o número que mostra isso é desconfortável. No estudo citado ' +
          'no primeiro alerta, 97,3% dos tokens com liquidez travada eram maliciosos, contra ' +
          '97,7% no geral (Mazorra et al., 2022). Ou seja: entre os travados a proporção é ' +
          'praticamente a mesma do conjunto todo. A trava tira uma forma de golpe da mesa e não ' +
          'diz nada sobre as outras.',
        'Nota técnica verificada: na Solana, DEXs como a Raydium exigem freeze authority ' +
          'revogada para criar o pool. Isso quer dizer que, num token que já tem pool nessas ' +
          'DEXs, essa checagem específica costuma vir respondida — o que não dispensa conferir ' +
          'com os próprios olhos.',
        'As ferramentas de cada pergunta estão no campo "onde", dentro de cada checagem. ' +
          'RugCheck para travas e autoridades; Solscan e BscScan, que são exploradores de rede ' +
          '(sites onde dá para ver qualquer transação já feita), para a lista de holders e as ' +
          'primeiras transações; Bubblemaps para enxergar carteiras ligadas entre si; ' +
          'DexScreener para liquidez do par, volume e profundidade.',
      ],
    },

    itens: [
      {
        pergunta: 'Alguém consegue tirar a liquidez da pool?',
        porque:
          'Com a liquidez livre, o criador pode removê-la, e o preço vira pó no mesmo bloco. ' +
          'Esse é o hard rug. No pump.fun, depois da graduação, a pool é do protocolo e isso não ' +
          'acontece. O golpe que sobra lá é o criador vender a própria compra (Módulo 6).',
        onde: 'RugCheck (Lockers & LP); e o explorer para ver quem detém os tokens de LP.',
        alerta:
          'Tokens de LP numa carteira do criador. Mas trava não aprova token: num estudo, 97,3% ' +
          'dos tokens com liquidez travada eram maliciosos, contra 97,7% no geral (Mazorra et al., 2022).',
      },
      {
        pergunta: 'A mint authority foi revogada?',
        porque:
          'Mint authority ativa significa que ainda dá para criar tokens novos, diluindo quem ' +
          'já comprou sem aviso nenhum.',
        onde: 'RugCheck ou a página do token no Solscan.',
        alerta: 'Authority ativa numa carteira ligada ao criador.',
      },
      {
        pergunta: 'A freeze authority foi revogada?',
        porque:
          'Freeze authority ativa permite congelar contas do token. Você compra e pode não ' +
          'conseguir vender. É o sinal clássico de possível honeypot. Nota técnica ' +
          'verificada: na Solana, DEXs como a Raydium exigem freeze authority revogada para ' +
          'criar o pool.',
        onde: 'RugCheck ou Solscan.',
        alerta: 'Authority ativa — trate como token potencialmente sem saída.',
      },
      {
        pergunta: 'Como está a concentração dos maiores holders?',
        porque:
          'Se poucas carteiras detêm a maior parte do supply, o seu resultado depende da ' +
          'decisão de um punhado de pessoas — que podem ser a mesma pessoa.',
        onde: 'Solscan/BscScan para a lista; Bubblemaps para ver clusters ligados.',
        alerta: 'Top 10 com fatia grande, especialmente em carteiras conectadas entre si.',
      },
      {
        pergunta: 'Houve bundles no lançamento?',
        porque:
          'Várias compras no mesmo bloco costumam ser o próprio dev e insiders montando ' +
          'posição antes de todo mundo, com o preço mais baixo que existirá.',
        onde: 'RugCheck e ferramentas de análise on-chain; explorer para as primeiras transações.',
        alerta: 'Percentual alto do supply comprado no bloco do lançamento.',
      },
      {
        pergunta: 'A liquidez aguenta a sua saída?',
        porque:
          'Market cap alto com liquidez fina quer dizer que o preço na tela não é o preço que ' +
          'você consegue realizar. Compare o tamanho da sua posição com o pool.',
        onde: 'DexScreener: liquidez do par, volume e profundidade.',
        alerta: 'Posição grande demais para o pool — você derruba o preço ao vender.',
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // Aba 4 — Simulador (textos de apoio; os cenários ficam em cenarios.js)
  // ---------------------------------------------------------------------------
  simulador: {
    titulo: 'Simulador de decisão',
    introducao:
      'Doze situações, quatro escolhas em cada uma. Não existe pontuação de acerto de preço. ' +
      'O que está sendo medido é se a decisão segue a regra ou o impulso. Cada escolha mostra ' +
      'o feedback, o risco daquela decisão e o próximo passo técnico. O histórico fica salvo ' +
      'no seu navegador.',
    // Aviso amarelo do topo do simulador. O "Cenários fictícios:" em negrito é posto
    // pelo componente, antes deste texto (tela 34 do desenho).
    aviso:
      'os números que aparecem neles são inventados de propósito para o exercício, e a ordem ' +
      'é sorteada a cada rodada. Nenhum descreve um token real, e nada aqui é recomendação de ' +
      'compra ou venda.',
    // Parágrafo logo abaixo do aviso (tela 34 do desenho).
    abertura:
      'Não existe pontuação de acerto de preço: o que está sendo medido é se a decisão segue a ' +
      'regra ou o impulso. As quatro opções são sempre as mesmas — o que muda é a situação.',
    // Segunda frase da dica "antes de escolher". Só aparece nos cenários em que você
    // não tem posição (posicao: 'nenhuma' em cenarios.js). Nesses nove, "Realizar
    // parcial" é sempre a opção marcada como 'naoSeAplica' — conferido nos dados.
    dicaSemPosicao:
      '"Realizar parcial" aqui é a única que não se aplica — você não tem posição neste token.',
    // Frase ao lado do botão "Próximo cenário" (só quando a ordem é sorteada).
    ordemSorteada: 'A ordem é sorteada: o próximo vem de outro tema.',
    // Legenda das 4 barras do resultado final. É uma função porque leva o total de
    // cenários no meio do texto (hoje, 12).
    legendaBarras: (total) =>
      'Mesma escala, sobre os ' + total + ' cenários. "Não se aplica" não é erro de mérito: é ' +
      'escolher uma ação impossível na situação — vale 0 e é contada à parte.',
    // Legenda da lista das 4 faixas. O desenho diz "deste resultado de exemplo"; aqui o
    // resultado é o seu de verdade, então sem o "de exemplo".
    legendaFaixas: 'O simulador pega a primeira faixa que couber. A faixa em destaque é a deste resultado.',
    // Última frase do resultado final.
    fraseFinal: 'O simulador não avalia se você ganharia dinheiro, e sim se a decisão seguiu a regra escrita.',
  },

  // A moldura da aba Simulador (desenho "M4 Desktop"): o card que explica, antes
  // do simulador, como cada escolha é avaliada — 4 passos ligados por setas e o
  // feedback em 3 partes. O simulador em si vem logo depois (componente
  // simulator.js, com os textos do bloco `simulador` acima).
  //   tom: 'neutro' · 'acento' (ciano) · 'primaria' (roxo) · 'bom' · 'alerta'
  molduraDoSimulador: {
    titulo: 'Simulador de decisão',
    emUmaFrase:
      'Doze situações inventadas para treinar a única coisa que dá para treinar antes de ter ' +
      'dinheiro na mesa: decidir com a regra escrita na frente.',
    // O "Cenários fictícios:" em negrito vem antes deste texto (a view põe).
    // Este é o único aviso que aparece nesta aba (o componente entra sem o dele,
    // para o texto não sair duas vezes), então ele também avisa que a ordem é
    // sorteada — que é o que o simulador faz de verdade a cada rodada.
    rotuloDoAviso: 'Cenários fictícios:',
    aviso:
      'os números que aparecem neles são inventados de propósito para o exercício, e a ordem é ' +
      'sorteada a cada rodada. Nenhum deles descreve um token real, e nada aqui é recomendação ' +
      'de compra ou venda.',
    passos: {
      titulo: 'Como cada escolha é avaliada',
      itens: [
        {
          titulo: 'A situação',
          texto: 'Um cenário fictício, com os números inventados de propósito para o exercício.',
          tom: 'neutro',
        },
        {
          titulo: 'Quatro escolhas',
          texto: 'Você decide o que faria. Não há acerto de preço para adivinhar.',
          tom: 'acento',
        },
        {
          titulo: 'O feedback',
          texto: 'A escolha, o risco daquela decisão e o próximo passo técnico.',
          tom: 'neutro',
        },
        {
          titulo: 'O resumo de disciplina',
          texto: 'Mede processo, não resultado: se a decisão seguiu a regra escrita.',
          tom: 'primaria',
        },
      ],
      legenda: 'Doze situações, quatro escolhas em cada uma. O histórico fica salvo no seu navegador.',
    },
    partes: {
      titulo: 'O feedback de uma escolha, em três partes',
      itens: [
        {
          rotulo: 'A escolha',
          texto: 'Certa, ou "não foi essa" — sempre com explicação, nunca só o resultado.',
          tom: 'bom',
        },
        {
          rotulo: 'O risco daquela decisão',
          texto: 'O que aquela escolha expõe: contraparte, liquidez, impulso, ou tese sem invalidação.',
          tom: 'alerta',
        },
        {
          rotulo: 'O próximo passo técnico',
          texto: 'O que checar em seguida, e em qual ferramenta — ligando a decisão ao Módulo 3.',
          tom: 'acento',
        },
      ],
      // O desenho continua a legenda com "Quando a sua escolha tem contra-argumento,
      // ele aparece como 'Por que a sua não serve'". O simulador não tem esse bloco
      // (ele é do quiz), então a frase ficou de fora para a tela não prometer o que
      // não mostra.
      legenda:
        'O simulador não avalia se você ganharia dinheiro, e sim se a decisão seguiu a regra ' +
        'escrita.',
    },

    paragrafos: [
      'O simulador apresenta doze situações. Em cada uma você escolhe entre quatro ações — e ' +
        'são sempre as mesmas quatro: o que muda é a situação. Não existe preço para adivinhar ' +
        'e nenhuma situação descreve um token real.',
      'O que está sendo medido é processo, não resultado. Essa distinção é a mais difícil de ' +
        'engolir no começo, porque no mercado real os dois se confundem: uma decisão ruim pode ' +
        'dar certo por sorte, e uma decisão boa pode dar errado. Só o processo está sob o seu ' +
        'controle, e só ele dá para treinar com números inventados.',
      'Acima, quatro passos ligados por setas mostram o caminho de cada rodada: a situação, as ' +
        'quatro escolhas, o feedback e o resumo de disciplina no fim. O feedback vem em três ' +
        'partes — a escolha (certa, ou "não foi essa", sempre com explicação), o risco daquela ' +
        'decisão e o próximo passo técnico, que liga a decisão de volta à ferramenta do Módulo ' +
        '3. A ordem dos cenários é sorteada a cada rodada, de propósito, para você não decorar ' +
        'a sequência.',
      'No fim, o resumo de disciplina traz quatro barras na mesma escala, sobre os doze ' +
        'cenários. "Não se aplica" não é erro de mérito: é ter escolhido uma ação impossível ' +
        'naquela situação — por exemplo, "realizar parcial" num cenário em que você não tem ' +
        'posição nenhuma no token. Vale 0 e é contada à parte, justamente para não se misturar ' +
        'com decisão ruim.',
      'O erro que este formato evita é ler o resultado como nota de acerto de mercado. O ' +
        'simulador não avalia se você ganharia dinheiro, e sim se a decisão seguiu a regra ' +
        'escrita. É a mesma medida das duas frases do começo do módulo, agora aplicada doze ' +
        'vezes seguidas.',
    ],

    paragrafosFinais: [
      'O histórico fica salvo no seu navegador, neste computador, e não sai daqui. Vale ' +
        'refazer depois de algumas semanas: o interessante não é o primeiro resumo, é a ' +
        'diferença entre o primeiro e o segundo.',
    ],

    detalhe: {
      titulo: 'por que as quatro opções e os números são fixos',
      paragrafos: [
        'As quatro opções são fixas de propósito. Se cada cenário tivesse opções feitas sob ' +
          'medida, a resposta certa ficaria óbvia pelo enunciado, e você estaria treinando ' +
          'leitura de prova, não decisão. Com as mesmas quatro sempre, a pergunta vira: qual ' +
          'delas cabe nesta situação?',
        'Os números dos cenários são inventados pelo mesmo motivo. Número real convida a ' +
          'reconhecer o token, lembrar o que aconteceu depois e responder pela memória. Número ' +
          'inventado obriga a responder pela regra.',
      ],
    },
  },

  // ---------------------------------------------------------------------------
  // Destaques — os números grandes que abrem cada aba
  //
  // Este módulo não tem lista de `fontes`. Por isso todo destaque abaixo sai do
  // PRÓPRIO TEXTO do módulo (que já foi pesquisado) ou é aritmética pura. Nenhuma
  // estatística nova entra aqui — regra do CLAUDE.md.
  // ---------------------------------------------------------------------------
  destaques: {
    tese: [
      {
        rotulo: 'Frases antes de comprar',
        valor: '2',
        nota: 'A tese ("por que este token?") e a catálise ("por que agora?"). As duas são necessárias e nenhuma sozinha basta.',
      },
      {
        rotulo: 'Campos da ficha de tese',
        valor: '5',
        nota: 'Tese, catálise, prazo, invalidação e alvos. Dois minutos que separam uma decisão de um impulso.',
      },
      {
        rotulo: 'Sem a segunda frase',
        valor: 'Aposta',
        nota: 'Se você não consegue escrever qual evento concreto precisa acontecer, não é operação.',
        tom: 'alerta',
      },
    ],

    takeProfit: [
      {
        rotulo: 'Quando o alvo se define',
        valor: 'Antes',
        nota: 'Junto com a tese, não com o gráfico piscando. Definido depois, já nasce contaminado pela euforia ou pelo medo.',
      },
      {
        rotulo: 'Faixas na escada',
        valor: '3',
        nota: 'Recuperar o investido, realizar lucro, e um restante COM regra escrita. O que não pode existir é restante sem regra.',
      },
      {
        rotulo: 'Restante sem regra',
        valor: '5× → 0',
        nota: 'É assim que uma posição que multiplicou por cinco termina valendo nada. Não depende do token nem da sorte.',
        tom: 'alerta',
      },
    ],

    checagens: [
      {
        rotulo: 'Checagens antes da tese',
        valor: '6',
        nota: 'LP, mint, freeze, concentração, bundles e liquidez de saída. A peneira do Módulo 3 aplicada à decisão.',
      },
      {
        rotulo: 'Respostas ruins que derrubam a operação',
        valor: '1',
        nota: 'Qualquer uma delas. Por melhor que a narrativa esteja, o contrato precisa resistir primeiro.',
        tom: 'alerta',
      },
      {
        rotulo: 'Duração de um hard rug',
        valor: 'Um bloco',
        nota: 'Com a liquidez livre, o criador remove a LP e o preço vira pó no mesmo bloco. No pump.fun a pool pós-graduação é do protocolo; lá, o golpe que sobra é o criador vender.',
        tom: 'alerta',
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // O plano de uma posição (aba Tese): os níveis em linhas, de cima para baixo,
  // cada um com a sua cor. De propósito NÃO há linha de preço nem eixo: o plano
  // são níveis decididos antes, e não depende de prever o caminho até eles.
  // A ficha de tese (acima, em teseVsCatalise) aparece dentro deste mesmo card.
  //   tom: 'bom' (verde) · 'acento' (ciano) · 'neutro' (branco) · 'alerta' (vermelho)
  // ---------------------------------------------------------------------------
  planoDaPosicao: {
    titulo: 'A anatomia de um plano',
    emUmaFrase:
      'Quatro níveis escritos antes de entrar, e nenhuma linha de preço: o que está desenhado ' +
      'aqui é o que você decide, não o que o mercado faz.',
    legenda:
      'O plano não depende de prever o caminho — depende de ter os níveis decididos por você ' +
      'frio, para serem cumpridos por você sob pressão.',
    niveis: [
      { id: 'alvo2', rotulo: '2º alvo', detalhe: 'lucro realizado', tom: 'bom' },
      { id: 'alvo1', rotulo: '1º alvo', detalhe: 'recupera o investido', tom: 'acento' },
      { id: 'entrada', rotulo: 'Entrada', detalhe: 'tese + catálise escritas', tom: 'neutro' },
      { id: 'invalidacao', rotulo: 'Invalidação', detalhe: 'onde você admite que errou', tom: 'alerta' },
    ],
    restante: 'Restante: corre com regra escrita — sair se cair X% do topo, ou se a catálise falhar.',

    paragrafos: [
      'Um plano de posição é a lista dos níveis que você decide antes de entrar. São quatro, e ' +
        'estão na figura acima de cima para baixo: o 2º alvo (lucro realizado), o 1º alvo ' +
        '(recupera o investido), a Entrada (onde a tese e a catálise já estão escritas) e a ' +
        'Invalidação, embaixo, em vermelho — o ponto em que você admite que errou. Embaixo de ' +
        'tudo, a linha do restante: o que fica na mesa corre com regra escrita.',
      'Não há gráfico de preço nem eixo de tempo aqui, e isso é de propósito. O plano não ' +
        'depende de prever o caminho até os níveis: depende só de ter os níveis. Um gráfico ' +
        'convidaria você a imaginar o percurso, que é exatamente a parte que ninguém sabe, e a ' +
        'confundir o desenho bonito com probabilidade.',
      'Logo abaixo dos níveis vem a ficha de tese: os mesmos níveis em forma de pergunta, cinco ' +
        'campos para preencher. Tese e catálise você já conhece do primeiro card. Prazo é até ' +
        'quando o evento deve acontecer. Invalidação é o que faria você admitir que estava ' +
        'errado. Alvos de realização são os pontos em que você vende parte, e quanto.',
      'Vale explicar uma sigla que aparece no exemplo da invalidação: LP vem de liquidity pool, ' +
        'o pool de liquidez, o par de moedas depositado para que as trocas aconteçam na ' +
        'corretora descentralizada. LP destravada quer dizer que quem depositou pode tirar esse ' +
        'dinheiro de lá a qualquer momento — motivo de sobra para a tese acabar na hora. A aba ' +
        '"Antes de entrar" abre esse ponto em detalhe.',
      'O campo que quase todo mundo pula é a invalidação, e é o único que não dá para ' +
        'improvisar depois. Depois já é tarde: com a posição aberta e o preço caindo, qualquer ' +
        'número que você escrever vai ser escolhido para não doer. Repare também que nenhum ' +
        'nível aqui foi escolhido pelo app. Ele mostra o formato do plano; quem escreve os ' +
        'números é você.',
    ],

    exemplo: {
      titulo: 'Uma ficha preenchida, campo a campo',
      passos: [
        'Tese: narrativa X em crescimento, com comunidade ativa há semanas.',
        'Catálise: graduação para a DEX; campanha anunciada para a semana que vem.',
        'Prazo: 7 dias. Passou o prazo sem a catálise, a tese venceu.',
        'Invalidação: catálise aconteceu e o preço não reagiu; ou LP destravada.',
        'Alvos de realização: recuperar o investido no primeiro alvo; faixas seguintes ' +
          'definidas.',
        'Nada aqui é sugestão: os 7 dias e as faixas são exemplo de formato, para mostrar como ' +
          'um campo preenchido se parece.',
      ],
    },

    paragrafosFinais: [
      'O plano não depende de prever o caminho — depende de ter os níveis decididos por você ' +
        'frio, para serem cumpridos por você sob pressão. É a mesma pessoa nas duas pontas, e ' +
        'só uma delas está pensando direito.',
    ],

    detalhe: {
      titulo: 'por que a ficha tem cinco campos, e não três',
      paragrafos: [
        'Por que a ficha tem cinco campos e não três: tese e catálise sozinhas explicam a ' +
          'entrada, mas não fecham a saída. Prazo, invalidação e alvos são os três campos que ' +
          'transformam uma opinião sobre um token num plano com começo e fim.',
        'Dois minutos é o tempo real de preencher a ficha, e é pouco perto do tempo que se ' +
          'gasta olhando o gráfico depois. Se a ficha estiver difícil de preencher, isso não é ' +
          'problema da ficha: é a operação avisando que ainda não existe motivo para ela.',
      ],
    },
  },

  // ---------------------------------------------------------------------------
  // Calculadoras (a matemática mora em views/modulo4.js)
  // ---------------------------------------------------------------------------
  // Aba Take profit, logo depois da escada. Controles à esquerda; à direita, as 3
  // barras de "como a posição se reparte" e a caixa com o realizado e o pior caso.
  // O 2º alvo nunca fica abaixo do 1º: mexer no 1º empurra o 2º para cima, a
  // pelo menos `distanciaMinima` de distância (1º em 5× → 2º vai para 5,5×).
  calculadoraDeDegraus: {
    titulo: 'Mexa nos alvos e veja onde a posição para',
    emUmaFrase:
      'A primeira faixa vende exatamente o que recupera o investido — por isso ela não é um ' +
      'controle, é a definição.',
    distanciaMinima: 0.5,
    rotuloDaFigura: 'Como a posição se reparte',
    // As 3 barras. As notas que levam número são funções: recebem o número já
    // escrito ("2,0×") e devolvem a frase.
    barras: {
      primeiro: {
        rotulo: 'Vendido no 1º alvo',
        nota: (alvo1) => 'É a fração que, vendida a ' + alvo1 + ', devolve exatamente o valor investido.',
      },
      segundo: {
        rotulo: 'Vendido no 2º alvo',
        nota: 'Lucro que existe de verdade, sem depender de o movimento continuar.',
      },
      restante: {
        rotulo: 'Restante na mesa',
        nota: (naMesa, alvo2) =>
          'Só pode existir com regra de saída escrita. Vale ' + naMesa + ' o investido a ' + alvo2 + '.',
      },
      complemento: 'da posição', // "50% da posição"
    },
    // A caixa embaixo das barras, em múltiplos do valor investido.
    realizado: { rotulo: 'Realizado ao chegar no 2º alvo', nota: 'do valor investido' },
    piorCaso: {
      rotulo: 'Pior caso, com o restante a zero',
      notaAcima: 'acima do investido, mesmo se o resto for a zero',
      notaAbaixo: 'ainda abaixo do investido: o 1º alvo não foi atingido na conta',
    },
    // Texto antigo da calculadora (a tela não mostra desde o redesenho).
    descricao:
      'Exemplo didático da ESTRUTURA da escada — não é sugestão de onde vender. Ajuste os ' +
      'alvos e veja quanto fica realizado, quanto continua na mesa, e no que vira o pior caso.',
    controles: [
      {
        id: 'alvo1',
        rotulo: 'Primeiro alvo (múltiplo da entrada)',
        min: 1.5,
        max: 10,
        passo: 0.5,
        valor: 2,
        sufixo: '×',
        formatar: (n) => n.toFixed(1).replace('.', ','),
      },
      {
        id: 'alvo2',
        rotulo: 'Segundo alvo (múltiplo da entrada)',
        min: 2,
        max: 20,
        passo: 0.5,
        valor: 4,
        sufixo: '×',
        formatar: (n) => n.toFixed(1).replace('.', ','),
      },
      {
        id: 'fracao2',
        rotulo: 'Vendido no segundo alvo (do que sobrou)',
        min: 0,
        max: 100,
        passo: 5,
        valor: 50,
        sufixo: '%',
        formatar: (n) => String(n),
      },
    ],
    // Frase curta embaixo dos controles.
    nota: 'Exemplo didático da estrutura — os números são estrutura, não recomendação.',

    paragrafos: [
      'Esta calculadora não diz onde vender. Ela responde uma coisa só: dados dois alvos e a ' +
        'fração vendida no segundo, como a posição se reparte entre os três degraus da escada ' +
        '— e no que isso transforma o pior caso.',
      'Repare que não existe controle para "quanto vender no primeiro alvo". Não é ' +
        'esquecimento. A primeira faixa é, por definição, a fração que devolve exatamente o ' +
        'valor investido; ela sai da conta, não do seu gosto. Quanto mais alto o primeiro alvo, ' +
        'menor a fração que precisa ser vendida ali.',
      'Na tela, os controles ficam de um lado e, do outro, três barras com o título "Como a ' +
        'posição se reparte": vendido no 1º alvo, vendido no 2º alvo e restante na mesa. As ' +
        'três sempre somam a posição inteira. Embaixo delas há duas caixas. "Realizado ao ' +
        'chegar no 2º alvo" responde em múltiplos do valor investido: é quanto dinheiro saiu da ' +
        'posição e voltou para a sua carteira, comparado com o que entrou. "Pior caso, com o ' +
        'restante a zero" responde outra pergunta: se o que ficou na mesa virar nada, você ' +
        'termina acima ou abaixo do investido? A tela diz qual das duas frases vale.',
      'O erro que esta tela evita é mexer nos controles até achar o desenho mais bonito e ' +
        'chamar aquilo de plano. Os números aqui são estrutura, não recomendação: o selo de ' +
        'exemplo didático da escada vale para a calculadora inteira.',
    ],

    exemplo: {
      titulo: 'Uma passada pelos controles',
      passos: [
        'A tela abre com o primeiro alvo em 2×, o segundo em 4× e 50% do que sobrou vendido no ' +
          'segundo alvo.',
        'Arraste o primeiro alvo para 5×. O segundo é empurrado junto, para 5,5×: a calculadora ' +
          'não deixa o segundo alvo ficar abaixo do primeiro, e a distância mínima é de meio ' +
          'múltiplo.',
        'Veja as três barras mudarem de tamanho enquanto você arrasta. O que sai de uma entra ' +
          'na outra — a posição é sempre a mesma.',
        'Leve o segundo alvo ao mínimo e ao máximo (de 2× a 20×, de meio em meio) e repare no ' +
          'que acontece com a nota do "Restante na mesa", que diz quanto ele vale em relação ao ' +
          'investido naquele alvo.',
        'Agora zere a fração vendida no segundo alvo. Você acabou de descrever a escada sem o ' +
          'degrau do meio: tudo o que sobrou fica na mesa, dependendo só da regra escrita.',
      ],
    },

    paragrafosFinais: [
      'A caixa do pior caso é a que vale olhar mais tempo. Ela é a tradução em número da frase ' +
        'do primeiro degrau: a partir do momento em que o investido voltou, o pior resultado ' +
        'possível deixou de ser prejuízo. Nenhuma previsão foi necessária para isso — só uma ' +
        'venda feita antes.',
    ],

    detalhe: {
      titulo: 'o que a conta supõe, e de onde vêm os limites dos controles',
      paragrafos: [
        'A calculadora supõe uma coisa que o mercado não garante: que existe comprador para a ' +
          'sua fração no preço do alvo. Em memecoin, essa suposição é justamente a que falha ' +
          'primeiro — é o assunto da sexta checagem, "a liquidez aguenta a sua saída?".',
        'O primeiro alvo vai de 1,5× a 10× e o segundo de 2× a 20×, os dois de meio em meio. ' +
          'Esses limites são da tela, para a figura caber e o exercício fazer sentido; não são ' +
          'opinião sobre até onde um token vai.',
      ],
    },
  },

  // Aba Antes de entrar, depois das seis checagens. Tamanho = risco ÷ invalidação,
  // com uma casa decimal (0,5% é 0,5%, não 1%).
  calculadoraDeTamanho: {
    titulo: 'Quanto da carteira pode ir numa posição',
    emUmaFrase: 'Quanto mais longe a invalidação, menor a posição — é aritmética, não opinião.',
    // Botões que põem a invalidação num valor pronto. `destaque: true` = fica roxo
    // quando está valendo (só o "pode ir a zero", o cenário realista em memecoin).
    atalhos: [
      { rotulo: 'Pode ir a zero (100%)', valor: 100, destaque: true },
      { rotulo: 'Cai pela metade (50%)', valor: 50 },
    ],
    resultado: { rotulo: 'A sua regra implica', nota: 'do capital nesta posição' },
    rotuloDaFigura: 'A posição dentro do capital',
    legenda:
      'Em memecoin, invalidação em 100% ("pode ir a zero") é um cenário realista — e é o que ' +
      'produz a posição menor.',
    // Quando a conta passa de 100% do capital (ex.: risco 10% e invalidação 5% dão
    // 200%): a posição não passa do capital inteiro, e aí o que se perde na
    // invalidação é menos que o risco escolhido (100% × 5% = 5%, não 10%).
    acimaDoCapital: {
      aviso:
        'A regra permitiria mais do que 100% do capital. Isso não é sinal para alavancar — é ' +
        'sinal de que a invalidação está apertada demais para o risco escolhido.',
      perda: (perda) =>
        'Com a posição no teto de 100% do capital, bater a invalidação custa ' + perda +
        ' do capital — menos que o risco que você aceitou.',
    },
    // Texto antigo da calculadora (a tela não mostra desde o redesenho).
    descricao:
      'A conta que liga o risco que você aceita ao ponto de invalidação que você escreveu. ' +
      'Quanto mais longe a invalidação, menor a posição — é aritmética, não opinião.',
    controles: [
      {
        id: 'risco',
        rotulo: 'Risco aceito por operação (% do capital)',
        min: 0.5,
        max: 10,
        passo: 0.5,
        valor: 2,
        sufixo: '%',
        formatar: (n) => n.toFixed(1).replace('.', ','),
      },
      {
        id: 'invalidacao',
        rotulo: 'Ponto de invalidação (queda desde a entrada)',
        min: 5,
        max: 100,
        passo: 5,
        valor: 50,
        sufixo: '%',
        formatar: (n) => String(n),
      },
    ],
    nota:
      'Fórmula: tamanho = risco ÷ invalidação. A conta não diz quanto risco aceitar — isso é ' +
      'decisão sua e depende da sua vida, não do mercado.',

    paragrafos: [
      'Esta calculadora liga duas decisões que são suas e devolve uma terceira. As suas: quanto ' +
        'do capital você aceita perder numa operação, e a que distância da entrada fica o seu ' +
        'ponto de invalidação. A que sai da conta: o tamanho da posição. A fórmula está embaixo ' +
        'dos controles e é uma divisão só — tamanho = risco ÷ invalidação.',
      'Risco aceito não é "quanto vou investir". É quanto do seu capital inteiro some se a ' +
        'invalidação for atingida. Confundir os dois é o erro mais caro desta tela: quem pensa ' +
        '"arrisco 2%" e põe 2% do capital numa memecoin que pode ir a zero está, na verdade, ' +
        'arriscando os 2% inteiros, e não uma fração deles. O controle vai de 0,5% a 10%, de ' +
        'meio em meio, e o resultado aparece com uma casa decimal de propósito: 0,5% é 0,5%, ' +
        'não 1%.',
      'Os dois atalhos põem a invalidação em valores prontos: "pode ir a zero (100%)" e "cai ' +
        'pela metade (50%)". O de 100% fica em destaque quando está valendo, porque em memecoin ' +
        'ir a zero é cenário realista — e é justamente ele que produz a posição menor. À ' +
        'direita, a figura "A posição dentro do capital" e a caixa que fecha a conta: a sua ' +
        'regra implica tanto por cento do capital nesta posição.',
      'O resultado costuma parecer contraintuitivo na primeira vez: quanto mais longe a ' +
        'invalidação, menor a posição. A lógica é simples quando se vê ao contrário — se você ' +
        'aceita cair muito antes de admitir o erro, precisa carregar menos, senão essa queda ' +
        'custa mais do que você tinha combinado consigo mesmo.',
    ],

    exemplo: {
      titulo: 'Um caso extremo, para ver a conta trabalhando',
      passos: [
        'Ponha o risco em 10% e a invalidação em 5%.',
        'A fórmula pediria 200% do capital: dez dividido por cinco.',
        'A tela não permite isso. A posição não passa de 100% do capital, e aparece um aviso: ' +
          'não é sinal para alavancar, é sinal de que a invalidação está apertada demais para o ' +
          'risco escolhido.',
        'Com a posição no teto de 100% do capital, bater a invalidação custa 5% do capital — ' +
          'menos que o risco de 10% que você tinha aceitado.',
        'Agora volte a invalidação para 100%, no atalho "pode ir a zero". A mesma regra de ' +
          'risco produz a menor posição de todas, porque você admitiu que o pior caso é perder ' +
          'tudo o que entrou.',
      ],
    },

    paragrafosFinais: [
      'A conta não diz quanto risco aceitar. Isso é decisão sua e depende da sua vida, não do ' +
        'mercado: do que aquele dinheiro representa para você, de quanto tempo você teria para ' +
        'recompor, de quantas vezes por mês você pretende fazer isso. A calculadora entra ' +
        'depois dessa decisão, nunca antes dela.',
    ],

    detalhe: {
      titulo: 'o que a fórmula supõe, e o que esta tela nunca faz',
      paragrafos: [
        'A fórmula supõe que você consegue sair no ponto de invalidação que escreveu. Em ' +
          'memecoin essa suposição é frágil: a liquidez pode sumir antes de você chegar lá, e ' +
          'aí a perda real passa do combinado. É mais um motivo para a invalidação em 100% ser ' +
          'o cenário honesto — ela é a única que não depende de conseguir sair.',
        'Repare no que esta tela nunca faz: escolher por você. Ela não sugere risco, não sugere ' +
          'invalidação e não recomenda token nenhum. Ela só termina uma conta que você começou ' +
          'ao escrever a sua regra.',
      ],
    },
  },

  // Aba Take profit, depois da calculadora dos degraus. Ganho = 1 ÷ (1 − perda) − 1.
  // As duas barras (a perda e o ganho) usam a mesma escala, de 0 a `tetoDaTela`.
  // O teto é escolha de escala desta tela, não um número de mercado — e a tela
  // diz isso na legenda. A partir de 67% de perda o ganho passa do teto (200%).
  calculadoraDeRecuperacao: {
    titulo: 'O que uma perda exige de volta',
    emUmaFrase:
      'Perder e recuperar não são simétricos. Uma perda pequena e planejada custa pouco; um ' +
      'rombo custa um múltiplo.',
    rotuloDoNumero: 'Ganho necessário só para voltar ao ponto de partida',
    rotuloDaFigura: 'Na mesma escala',
    barras: { perda: 'A perda', ganho: 'O ganho para voltar' },
    tetoDaTela: 200,
    // Nota embaixo das barras. Recebe os números já escritos ("50%", "100%").
    notaAbaixoDoTeto: (perda, ganho) => 'Uma perda de ' + perda + ' exige ' + ganho + ' de ganho só para empatar.',
    notaAcimaDoTeto: (teto) => 'Passou de ' + teto + ': a barra está no limite da escala.',
    legenda: (teto, limiar) =>
      'As duas barras usam a mesma escala, de 0 a ' + teto + ' — escolha de escala desta tela, ' +
      'não um número do arquivo. A partir de ' + limiar + ' de perda, o ganho necessário passa ' +
      'desse teto e a barra fica no limite; é isso que o custo afundado produz.',
    // Texto antigo da calculadora (a tela não mostra desde o redesenho).
    descricao:
      'Perder e recuperar não são simétricos. Arraste a perda e veja o ganho que seria ' +
      'necessário só para voltar ao ponto de partida.',
    controles: [
      {
        id: 'perda',
        rotulo: 'Perda sobre a posição',
        min: 5,
        max: 95,
        passo: 5,
        valor: 50,
        sufixo: '%',
        formatar: (n) => String(n),
      },
    ],
    nota: 'Fórmula: ganho necessário = 1 ÷ (1 − perda) − 1. É por isso que o ponto de invalidação existe.',

    paragrafos: [
      'Esta calculadora responde uma pergunta só: depois de uma perda de tanto por cento, de ' +
        'quanto precisa ser o ganho apenas para voltar ao ponto de partida — não para lucrar, ' +
        'só para empatar.',
      'A assimetria existe porque a perda tira base. Você perde uma porcentagem do valor cheio ' +
        'e depois precisa ganhar uma porcentagem de um valor menor, que é o que sobrou. Quanto ' +
        'maior a perda, menor a base que precisa fazer o trabalho de volta — e por isso a ' +
        'exigência cresce muito mais rápido que a perda.',
      'Na tela há um controle só, a perda sobre a posição, de 5% a 95%, de cinco em cinco. Em ' +
        'cima aparece o número grande, "Ganho necessário só para voltar ao ponto de partida". ' +
        'Embaixo, duas barras na mesma escala: a perda e o ganho para voltar. Elas usam a mesma ' +
        'régua de propósito, porque a distância entre as duas é a coisa toda.',
      'Arraste a perda até 67%: a partir daí o ganho necessário passa de 200% e a barra encosta ' +
        'no limite da escala, com a tela avisando que ela está no limite. Esse teto de 200 é ' +
        'escolha de escala desta tela, não um número do mercado — e a legenda diz isso.',
      'O erro que esta tela desmonta é uma intuição que quase todo mundo tem: a de que uma ' +
        'queda e uma alta do mesmo tamanho se cancelam. Não se cancelam, e a diferença entre ' +
        'elas é o custo de ter demorado a decidir.',
    ],

    paragrafosFinais: [
      'É por isso que o ponto de invalidação existe. Ele não evita a perda: evita a perda ' +
        'grande, que é a única de que não se volta em tempo razoável. E é também a conta por ' +
        'trás do card seguinte — na Degradação, cada dia segurando empurra a barra de baixo ' +
        'para a direita, e a de cima cresce mais rápido ainda.',
    ],

    detalhe: {
      titulo: 'a fórmula em palavras',
      paragrafos: [
        'A fórmula está na nota da tela: ganho necessário = 1 ÷ (1 − perda) − 1. Em palavras: ' +
          'divida 1 pelo que sobrou depois da perda e tire 1. Se sobrou pouco, a divisão ' +
          'dispara — é toda a matemática do assunto, e ela não tem exceção nem sorte.',
        'A conta é sobre a posição, não sobre a sua carteira inteira. Quanto uma perda de X na ' +
          'posição custa do seu capital total depende do tamanho que você deu a ela, que é o ' +
          'assunto da calculadora da aba "Antes de entrar".',
      ],
    },
  },

  // ---------------------------------------------------------------------------
  // Aba 5 — Mini-quiz (4 perguntas)
  // ---------------------------------------------------------------------------

  // Por que cada alternativa errada do quiz não serve (o quiz mostra a da resposta escolhida).
  porqueErradas: {
    q1: {
      a: 'Gráfico e volume descrevem o que já aconteceu; catálise é um evento que ainda vai trazer compradores novos.',
      c: 'Animação da comunidade é atenção, não evento com data — e pode ser campanha paga.',
      d: 'Sensação não é verificável: sem evento, não há como saber quando a tese falhou.',
    },
    q2: {
      a: 'Realizar parcial não muda a regra do imposto: cada venda é apurada.',
      b: 'Nada garante o preço depois; realizar parcial funciona justamente sem prever o topo.',
      d: 'Vender não aumenta a liquidez da pool; tira dela.',
    },
    q3: {
      b: 'A rede não cobra por tempo de posição.',
      c: 'O token não é removido da DEX por ficar parado; ele só fica sem comprador.',
      d: 'Segurar não é neutro: na Degradação, cada dia sem comprador é preço caindo.',
    },
    q4: {
      a: 'Gráfico e volume não dizem nada sobre o contrato nem sobre quem controla o supply.',
      c: 'Seguidores e tamanho de grupo são fáceis de comprar e não checam o contrato.',
      d: 'Canal de call é atenção — muitas vezes paga —, não checagem.',
    },
  },

  quiz: [
    {
      id: 'q1',
      pergunta: 'Qual destas é uma catálise, no sentido do Módulo 4?',
      alternativas: [
        {
          id: 'a',
          texto: 'O gráfico está forte e o volume subiu hoje.',
        },
        {
          id: 'b',
          texto:
            'Uma listagem numa corretora grande, anunciada para sexta-feira.',
        },
        { id: 'c', texto: 'A comunidade no Telegram está muito animada.' },
        { id: 'd', texto: 'Você sente que agora é a hora de entrar.' },
      ],
      correta: 'b',
      explicacao:
        'Catálise responde "por que agora?": é o evento verificável que traz demanda nova. A ' +
        'tese responde "por que este token?". Sem a catálise, sobra torcida — e sem ela também ' +
        'não existe critério para saber que a tese falhou.',
    },
    {
      id: 'q2',
      pergunta: 'Por que realizar parcial, em vez de segurar tudo até o alvo final?',
      alternativas: [
        { id: 'a', texto: 'Porque reduz o imposto devido sobre a operação.' },
        { id: 'b', texto: 'Porque garante que o preço vai continuar subindo depois.' },
        {
          id: 'c',
          texto:
            'Porque tira risco da mesa: recuperado o valor investido, o restante corre por conta do lucro e a decisão deixa de ser tomada pelo medo.',
        },
        { id: 'd', texto: 'Porque aumenta a liquidez do pool em que você está.' },
      ],
      correta: 'c',
      explicacao:
        'Realizar parcial não prevê topo nenhum — e é justamente por isso que funciona. ' +
        'Vendendo uma faixa, o pior caso deixa de ser prejuízo e o resto da posição pode ' +
        'correr sem que o medo assuma o volante.',
    },
    {
      id: 'q3',
      pergunta: 'Qual é o erro de segurar uma posição por tempo demais na fase de Degradação?',
      alternativas: [
        {
          id: 'a',
          texto:
            'Custo afundado: a atenção já migrou e não há compradores novos, mas a cabeça trata vender como "assumir o prejuízo" e a perda pequena vira rombo.',
        },
        { id: 'b', texto: 'A rede cobra taxa maior de quem segura o token por muitos dias.' },
        { id: 'c', texto: 'O token é automaticamente removido da DEX depois de um tempo parado.' },
        { id: 'd', texto: 'Nenhum: segurar é sempre a decisão mais segura em memecoins.' },
      ],
      correta: 'a',
      explicacao:
        'Na Degradação a liquidez seca porque a atenção foi embora. O dinheiro gasto já foi ' +
        'gasto; a única pergunta útil é "eu compraria este token, neste preço, hoje?". Se a ' +
        'resposta é não, a posição já acabou — falta só executar.',
    },
    {
      id: 'q4',
      pergunta: 'O que checar antes de entrar, mesmo com tese e catálise bem escritas?',
      alternativas: [
        { id: 'a', texto: 'Só o gráfico das últimas 24 horas e o volume do dia.' },
        {
          id: 'b',
          texto:
            'Endereço oficial, extensões e autoridades do contrato, concentração real dos holders, bundles no lançamento e se a liquidez aguenta a sua saída.',
        },
        { id: 'c', texto: 'Quantos seguidores o projeto tem no X e o tamanho do grupo no Telegram.' },
        { id: 'd', texto: 'Apenas se o token já apareceu em algum canal de call que você segue.' },
      ],
      correta: 'b',
      explicacao:
        'A checagem técnica é a peneira que vem antes de tudo: com endereço errado, extensão fora do padrão, authorities ' +
        'ativas ou com supply concentrado, nenhuma tese se sustenta. Ferramentas: RugCheck, ' +
        'Solscan/BscScan, Bubblemaps e DexScreener.',
    },
  ],

  // ---------------------------------------------------------------------------
  // Vídeos — cada um vira o botão "Assistir a videoaula" dentro do card da seção
  // que ele reforça (o campo `secao` diz qual). O player só aparece no clique.
  // PENDENTE: a `transcricao`; enquanto ela não existe, o aviso padrão de
  // src/data/videoaulas.js entra embaixo do player.
  // ---------------------------------------------------------------------------
  videos: {
    'tese-vs-catalise': {
      titulo: 'Tese × catálise',
      secao: 'tese-vs-catalise',
      src: 'assets/videos/tese-vs-catalise.mp4',
      duracao: '7:22',
      descricao: 'As duas frases que faltam antes de comprar, e o exemplo com a graduação de 85 SOL.',
      transcricao: [],
    },
    'take-profit-em-degraus': {
      titulo: 'Take profit em degraus',
      secao: 'take-profit-em-degraus',
      src: 'assets/videos/take-profit-em-degraus.mp4',
      duracao: '8:12',
      descricao: 'A escada de realização e o erro de segurar demais na fase de degradação.',
      transcricao: [],
    },
    'simulador': {
      titulo: 'O simulador de 12 cenários',
      secao: 'simulador',
      src: 'assets/videos/simulador-de-decisao.mp4',
      duracao: '7:44',
      descricao: 'Como usar o simulador e ler o resumo de disciplina no fim.',
      transcricao: [],
    },
  },
};
