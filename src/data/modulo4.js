// modulo4.js — conteúdo do Módulo 4 (gestão, catálise, tese de entrada, take profit).
// Aqui só tem DADOS: nenhuma lógica, nenhum HTML. Para mudar um texto ou um número,
// mude aqui — a interface se adapta sozinha.
// Os cenários do simulador ficam separados, em src/data/cenarios.js.

export const modulo4 = {
  id: 'modulo-4',
  titulo: 'Gestão, catálises & tomada de decisão',
  resumo:
    'Os módulos anteriores mostraram por que o preço se move e onde checar o que há por trás. ' +
    'Este módulo é sobre a parte que depende só de você: decidir antes, por escrito, e cumprir ' +
    '— na entrada e, principalmente, na saída.',
  // Subtítulo do cabeçalho da página: só a segunda frase do resumo, como no desenho.
  subtitulo:
    'Este módulo é sobre a parte que depende só de você: decidir antes, por escrito, e cumprir ' +
    '— na entrada e, principalmente, na saída.',

  objetivos: [
    'Escrever a tese e a catálise esperada antes de qualquer compra.',
    'Diferenciar catálise concreta de narrativa vaga.',
    'Definir alvos de realização e entender por que realizar parcial tira risco da mesa.',
    'Reconhecer o erro de segurar demais na fase de Degradação (custo afundado).',
    'Treinar a decisão em 12 cenários do simulador e ler o seu resumo de disciplina.',
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
      'Duas frases escritas antes de comprar separam uma operação de uma aposta — e, depois, ' +
      'decidem a hora de sair.',
    // O visual do card: as duas frases lado a lado. Cada uma com a pergunta que
    // responde, o que ela é e o que acontece quando vem sozinha.
    duasFrases: [
      {
        nome: 'Tese',
        pergunta: 'Por que este token?',
        oQueE:
          'A razão para ele chamar atenção: a narrativa, a comunidade que já existe, o nicho ou ' +
          'o momento de mercado.',
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
        'Se a catálise aconteceu e o preço não reagiu, a tese estava errada. Se foi cancelada, o ' +
        'motivo da posição sumiu. Nos dois casos a decisão já está tomada — por você com a cabeça ' +
        'fria, não às três da manhã com o gráfico caindo.',
    },
    // Texto corrido do card, logo depois do visual. Substitui o array antigo de 9
    // parágrafos (o texto da primeira versão), que estava guardado aqui só como
    // referência e fora da tela desde o redesenho. A "Pergunta rápida" saiu de
    // todas as seções em 20/09: as perguntas ficam só no quiz do fim do módulo.
    paragrafos: [
      'Tese responde "por que este token, e não outro?": narrativa, comunidade, nicho, momento ' +
        'de mercado. Catálise responde "por que agora?": um evento concreto, com data, que ' +
        'precisa acontecer para trazer compradores novos.',
      'Parece burocracia até o preço se mexer forte e você precisar decidir no susto. Sem nada ' +
        'escrito, decide a emoção — e ela sempre diz "espera mais um pouco". Escritas, as duas ' +
        'frases são a sua voz de cabeça fria.',
      'Elas viram o critério de saída: a catálise aconteceu e o preço não reagiu, a tese estava ' +
        'errada; a catálise foi cancelada ou adiada sem data nova, o motivo sumiu. A decisão já ' +
        'estava tomada; resta executar.',
      'O rótulo "Sozinha" mostra o erro de ter só uma metade: tese sem catálise fica parada ' +
        'meses; catálise sem tese é correr atrás de barulho.',
      'Bastam duas linhas no bloco de notas, desde que a segunda tenha evento e dia. Se você ' +
        'não consegue escrever a segunda, ainda não existe o "por que agora".',
    ],

    exemplo: {
      titulo: 'As mesmas duas frases, no dia em que o preço cai',
      passos: [
        'Tese: narrativa X em crescimento, comunidade ativa há semanas. Catálise: evento do ' +
          'projeto marcado para a próxima semana.',
        'Prazo: 7 dias. Passou sem a catálise, a tese venceu — como um pão, sem precisar de ' +
          'notícia ruim.',
        'Dias depois o preço cai e o grupo fala em manipulação. Suas frases não falam de ' +
          'preço: a queda, sozinha, não responde nada.',
        'No sétimo dia o evento acontece e o preço não reage: os compradores novos não vieram. ' +
          'A resposta foi não.',
        'Nada disso foi decidido no susto: foi decidido quando você escreveu as frases.',
      ],
    },

    paragrafosFinais: [
      'As duas frases abrem a ficha de tese, no card seguinte. E são o que o simulador, no fim ' +
        'do módulo, mede: não se o preço subiu, mas se a decisão seguiu o que estava escrito.',
    ],

    detalhe: {
      titulo: 'o que as duas frases fazem, e o que elas não fazem',
      paragrafos: [
        'As duas frases não aumentam a chance de acertar o próximo token. Fazem duas coisas ' +
          'mais modestas e úteis: dão um critério de saída que não depende do humor e deixam um ' +
          'registro para reler — o único jeito de ver se os seus erros se repetem.',
        'Tese boa não é otimista: pode ser respondida com não. Se nenhum resultado faria você ' +
          'admitir o erro, é torcida com vocabulário técnico.',
        'Nada aqui é recomendação de compra ou venda: o app mostra o formato da decisão e ' +
          'devolve a caneta para você.',
      ],
    },

    regraDeOuro: {
      titulo: 'Regra de ouro',
      texto:
        'Antes de entrar, escreva duas frases: (a) a tese — por que este token? — e (b) a ' +
        'catálise — qual evento concreto precisa acontecer para ele valorizar. Sem a segunda ' +
        'frase, não é operação: é aposta.',
    },

    // A ficha aparece dentro do card "A anatomia de um plano", logo depois dos
    // níveis: cinco cartões lado a lado e a frase `introducao` embaixo. O título
    // não aparece na tela (o card já tem o dele).
    fichaDeTese: {
      titulo: 'Ficha de tese: cinco campos para preencher antes de clicar em comprar',
      introducao:
        'Copie estes campos para o seu caderno de operações (o "caderno de trades") e preencha ' +
        'antes de cada entrada. Leva dois minutos — e obriga a responder "o que me faria admitir ' +
        'que errei?" enquanto isso ainda não custa nada.',
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
        'Invalidar uma tese é dizer, antes de entrar, que resultado faria você admitir o erro. ' +
          'Não é pessimismo: é o que deixa você calmo, porque sabe o que está esperando.',
        'Tese que não pode ser invalidada nunca termina: subiu, estava certa; caiu, "é o ' +
          'mercado"; parou, "ainda é cedo". Nunca erra — por isso nunca ensina nem manda sair.',
        'Leia a tabela pelo veredito, a última coluna (no celular, ela rola para o lado). Na ' +
          'primeira linha o motivo é o próprio preço; na segunda, "uma hora" não é prazo e ' +
          '"explode" não é evento. Só a terceira tem evento com data — dá para verificar, ' +
          'invalidar e sair.',
        'O erro mais comum é trocar a tese pelo gráfico: "está subindo forte" descreve o passado ' +
          'e não tem evento futuro. Quem compra por isso fica sem resposta no primeiro dia ruim.',
      ],

      paragrafosFinais: [
        'Teste rápido: procure a data na sua catálise. Sem data, nem aproximada, é expectativa, ' +
          'não catálise.',
      ],

      detalhe: {
        titulo: 'o que o prazo decide, e o que ele não decide',
        paragrafos: [
          'Prazo não é promessa de que o evento acontece em sete dias: marca o dia de reabrir a ' +
            'ficha e reler, já sem o calor da compra.',
          'Prazo vencido obriga a uma de duas coisas: reescrever tese e catálise com data e ' +
            'prazo novos, ou admitir que o motivo acabou. Seguir sem reescrever não é opção.',
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
          'Não. O motivo é o próprio preço, sem evento nenhum — se cair, a única regra é a ' +
          'esperança.',
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
          'Sim. Dá para verificar, invalidar e sair: se o evento acontecer e o preço não reagir, ' +
          'você sabe no mesmo dia.',
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
            'O anúncio muitas vezes mexe mais no preço do que a listagem. Quem comprou pelo ' +
            'rumor costuma vender no fato.',
        },
        {
          nome: 'Graduação para a DEX',
          descricao:
            'O token sai da bonding curve (a curva de preço do lançamento) e ganha um pool com ' +
            'mais liquidez. No Pump.fun, isso acontece com cerca de 85 SOL arrecadados (dados de ' +
            'set/2025). Em dólar não há limiar fixo: numa amostra de ago/2026, 80% das ' +
            'graduações ficaram entre US$ 11 mil e US$ 101 mil.',
          alerta:
            'É também quando quem comprou na curva consegue vender volume: a liquidez que atrai ' +
            'você dá saída para eles.',
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
            'É a mais difícil de datar: cedo demais, você fica segurando; tarde demais, compra o ' +
            'topo.',
        },
        {
          nome: 'Evento do projeto com data marcada',
          descricao: 'Lançamento, parceria anunciada, campanha ou migração, com dia definido.',
          alerta:
            'É a melhor para estudar, porque tem prazo. Cuidado com datas adiadas: adiamento é ' +
            'sinal, não detalhe.',
        },
      ],

      paragrafos: [
        'O mapa mostra as cinco catálises mais comuns. DEX, na segunda, é a corretora ' +
          'descentralizada: a troca acontece direto da sua carteira, sem empresa guardando o ' +
          'dinheiro.',
        'A parte útil é a caixa âmbar. Quase sempre o lado ruim é o mesmo: o evento que traz ' +
          'compradores novos também dá saída para quem entrou antes.',
        'Saber qual catálise você tem muda duas decisões: o prazo da ficha (evento com data tem ' +
          'prazo óbvio; narrativa, não) e o tamanho (atenção de figura pública dura pouco e traz ' +
          'risco de contrato impostor — confirme o endereço oficial na fonte).',
        'Na graduação, o token nasce numa bonding curve, em que o preço sobe conforme as pessoas ' +
          'compram; ao arrecadar o suficiente, sai da curva e ganha um pool com mais liquidez. As ' +
          'ressalvas dos números estão em "Para ir mais fundo".',
        'O erro que o mapa evita é comprar o barulho sem perguntar quem está do outro lado. Na ' +
          'listagem isso tem nome: buy the rumor, sell the news — comprar no rumor, vender no ' +
          'fato. Quem comprou pelo anúncio vende no dia da listagem, quando o iniciante compra.',
      ],

      exemplo: {
        titulo: 'A mesma listagem, lida por duas pessoas',
        passos: [
          'Sai o anúncio: listagem numa corretora grande na sexta.',
          'A primeira pessoa entra pelo anúncio e anota que a catálise é a sexta: o dia da ' +
            'verdade está marcado.',
          'A segunda entra na sexta, depois da listagem, porque "ficou oficial". Comprou o fim ' +
            'do evento, não o começo.',
          'É o aviso da caixa âmbar: o anúncio muitas vezes mexe mais no preço do que a listagem.',
          'Nenhuma das duas leituras é regra de compra — o app não escreve a sua. A diferença: a ' +
            'primeira sabe qual dia responde a pergunta dela; a segunda não marcou dia.',
        ],
      },

      paragrafosFinais: [
        'O mapa não ordena da melhor para a pior catálise, e sim pelo que dá para fazer com cada ' +
          'uma. A de data marcada é a mais fácil de estudar: existe um dia em que a resposta ' +
          'chega.',
      ],

      detalhe: {
        titulo: 'as três ressalvas dos números da graduação',
        paragrafos: [
          'Primeira: o limiar é contado em SOL, a moeda da rede Solana, não em dólar — ' +
            'convertido, vira uma faixa larga. Segunda: a faixa de US$ 11 mil a US$ 101 mil cobre ' +
            '80% das graduações da amostra de ago/2026, não todas. Terceira: é uma amostra de uma ' +
            'data, não promessa sobre a próxima graduação.',
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
      'Enquanto a posição está aberta, o lucro é só um número: depende de existir comprador na ' +
        'hora de sair, e em memecoin essa liquidez some rápido.',
      'Realização parcial resolve isso sem acertar o topo: você recupera o investido e o resto ' +
        'corre por conta do lucro — sem o medo, que piora as decisões.',
      'O alvo de realização se define ANTES de entrar, junto com a tese. Definido depois, nasce ' +
        'contaminado pela euforia ou pelo medo.',
    ],

    // O card da escada: três faixas em degrau, a legenda com o selo "exemplo
    // didático" e o texto corrido. A "Pergunta rápida" q2 saiu em 20/09 (as
    // perguntas ficam só no quiz do fim do módulo).
    escada: {
      titulo: 'A escada de realização, faixa a faixa',
      emUmaFrase:
        'O lucro que você não realizou não é seu. Nenhuma faixa depende de prever o topo — a ' +
        'escada existe porque ninguém acerta o topo de forma consistente.',
      legenda:
        'Exemplo didático da estrutura — não é sugestão de onde vender. O que importa é o ' +
        'formato: faixas definidas antes, cada uma com um motivo, e a última com regra de saída ' +
        'escrita.',
      selo: 'exemplo didático',

      // Substitui o campo `paragrafo` (singular) e absorve os parágrafos de
      // referência que estavam em takeProfit.paragrafos, acima.
      paragrafos: [
        'Realizar é vender parte da posição e transformar o número da tela em dinheiro na ' +
          'carteira — em inglês, take profit, "pegar o lucro". Até lá, o lucro é promessa: ' +
          'depende de existir comprador na hora de sair.',
        'Em memecoin essa promessa some rápido. Liquidez é o dinheiro do outro lado, pronto para ' +
          'comprar de você; a que sustenta a subida some na descida, porque são as mesmas ' +
          'pessoas. O preço na tela é só o do último negócio.',
        'A realização parcial resolve isso sem exigir acertar o topo: você recupera o investido ' +
          'e o resto corre por conta do lucro. O medo sai da posição — e é ele que piora as ' +
          'decisões.',
        'O selo "exemplo didático" é sério: os degraus mostram o formato, não onde vender. Onde ' +
          'ficam os seus alvos é decisão sua.',
        'E o alvo se define antes de entrar, junto com a tese. Definido com o gráfico piscando, ' +
          'não é alvo: é reação.',
      ],

      exemplo: {
        titulo: 'O degrau que muda o pior caso',
        passos: [
          'Você entrou com um valor que pode perder inteiro, com os três degraus escritos.',
          'O preço bate o primeiro alvo. Você vende a fração que devolve exatamente o investido.',
          'Nada de mágico aconteceu no preço; mudou o pior caso: a posição não pode mais ' +
            'terminar em prejuízo.',
          'O preço bate o segundo alvo. Você vende outra faixa: lucro fora da tela.',
          'O resto corre com a regra do terceiro degrau. Sem ela, é assim que uma posição que ' +
            'multiplicou por cinco termina valendo nada.',
        ],
      },

      paragrafosFinais: [
        'As duas calculadoras a seguir deixam você mexer nesse formato: a primeira mostra como a ' +
          'posição se reparte entre os degraus; a segunda, por que a invalidação importa tanto ' +
          'quanto os alvos.',
      ],

      detalhe: {
        titulo: 'por que a primeira faixa não é escolha sua',
        paragrafos: [
          'A primeira faixa sai da conta: para devolver exatamente o investido, a fração depende ' +
            'do alvo, não do gosto. Quanto mais alto o alvo, menor a fração.',
          'Realizar em faixas não prevê topo, e por isso funciona: quem espera o topo precisa ' +
            'acertar um instante; quem realiza só precisa ter escrito as faixas.',
          'Realizar em partes não muda o imposto: cada venda é apurada. O que vem depois está no ' +
            'card do erro de segurar, em "Para ir mais fundo" — informativo, não aconselhamento ' +
            'tributário.',
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
          'Na Degradação a liquidez seca porque a atenção foi embora: cada venda encontra menos ' +
          'dinheiro no pool que na véspera. O preço não cai por acaso — cai porque ninguém está ' +
          'mais olhando.',
      },
      // Texto corrido do card. Substitui o array de referência da primeira versão,
      // que a tela não mostrava, e o antigo campo `paragrafoFinal` (agora o
      // primeiro item de paragrafosFinais, abaixo).
      paragrafos: [
        'Degradação é a última das 4 fases do Módulo 2: a atenção migrou, o grupo esvazia e não ' +
          'chegam compradores novos. O preço cai porque ninguém está mais olhando.',
        'Cada venda encontra menos dinheiro no pool (o reservatório de duas moedas do Módulo 1): ' +
          'sem comprador novo repondo, cada venda tira mais um pouco e empurra o preço para baixo.',
        'É aí que aparece o custo afundado (sunk cost): o dinheiro que já saiu e não volta. A ' +
          'cabeça trata vender como "assumir o prejuízo", mas o prejuízo já aconteceu; o clique ' +
          'só o reconhece.',
        'Por isso a pergunta do fluxograma ignora o seu preço de entrada. Se você compraria ' +
          'hoje, a posição segue pela tese, reescrita com a data de hoje — não pelo preço médio ' +
          '(a média do que você pagou nas compras). Se não compraria, só falta executar.',
        'A fantasia mais cara é comprar mais para "melhorar o preço médio": só aumenta a posição ' +
          'num token que você não compraria hoje. E a demora cobra caro: a partir de uma perda de ' +
          '67%, empatar exige mais de 200% de ganho.',
      ],

      exemplo: {
        titulo: 'A pergunta, aplicada',
        passos: [
          'Posição em prejuízo, token na Degradação: grupo vazio, volume sumido, dias sem ' +
            'comprador novo.',
          'Pergunta única: eu compraria este token, neste preço, hoje?',
          'Sim: a posição segue pela tese — reescreva tese e catálise com a data de hoje e um ' +
            'prazo novo. Se não der para reescrever, a resposta era não.',
          'Não: a posição já está encerrada; só falta executar. "Assumir o prejuízo" não é o ' +
            'custo de vender: é o custo que já aconteceu.',
          'Repare: a pergunta não quer saber por quanto você comprou — o mercado também não sabe.',
        ],
      },

      paragrafosFinais: [
        'Segurar demais transforma uma perda pequena e planejada num rombo de meses. E não ' +
          'depende do token nem da sorte: só de não ter escrito a regra antes.',
        'Se você realizou lucro, vem a parte chata: o que o Brasil espera de quem vendeu. Está ' +
          'logo abaixo, em "Para ir mais fundo".',
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
        'No Brasil, vender cripto com ganho pode gerar imposto, e apurar e pagar é ' +
          'responsabilidade sua, não da corretora. Ganho de capital é a diferença entre o que ' +
          'você recebeu na venda e o que pagou na compra.',
        'O que mais confunde: o limite de isenção conta o total vendido no mês, somando todas as ' +
          'vendas — não o lucro. Dá para ter lucro pequeno e passar do limite, se você girou ' +
          'muito. Por isso anotar cada operação vale mais do que decorar alíquota (a porcentagem ' +
          'do imposto).',
        'Abaixo, a regra segundo as fontes deste módulo, com a data de cada uma. Ela muda por ' +
          'decisão política — o primeiro ponto é uma mudança anunciada que não valeu.',
      ],

      pontos: [
        {
          rotulo: 'MP 1.303/2025 — não valeu',
          texto:
            'A medida provisória que propunha alíquota única de 17,5% e o fim da isenção ' +
            'mensal foi rejeitada pela Câmara dos Deputados em outubro de 2025 e perdeu a ' +
            'validade: não entrou em vigor. Se você leu sobre ela em texto antigo, era uma ' +
            'proposta, e caiu.',
        },
        {
          rotulo: 'Isenção de R$ 35 mil no mês',
          texto:
            'Pela regra que segue vigente para o IRPF 2026 (o Imposto de Renda da pessoa ' +
            'física), ganhos de capital com cripto em corretoras nacionais são isentos se a ' +
            'soma das VENDAS no mês não passar de R$ 35 mil — todas as vendas somadas, não o ' +
            'lucro.',
        },
        {
          rotulo: 'Acima do limite',
          texto:
            'Passando de R$ 35 mil em vendas no mês, aplicam-se alíquotas progressivas a ' +
            'partir de 15% (até 22,5%), apuradas no programa GCAP, com DARF (código 4600) ' +
            'até o último dia útil do mês seguinte. GCAP é o programa da Receita para ganho de ' +
            'capital; DARF é a guia de pagamento, e o código diz que imposto está sendo pago.',
        },
        {
          rotulo: 'Operações no exterior',
          texto:
            'Operações fora do país seguem a Lei 14.754/2023, com regras próprias. Quem opera ' +
            'em corretora estrangeira ou direto na carteira cai em texto legal diferente do de ' +
            'cima — outro motivo para ter alguém especializado revisando.',
        },
        {
          rotulo: 'Saque em reais',
          texto:
            'Sair para real acontece via corretora nacional com Pix (exige KYC/CPF) ou via P2P. ' +
            'KYC é a verificação de identidade que a corretora faz antes de liberar saque; P2P é ' +
            'a negociação direta entre pessoas, sem corretora no meio. No P2P o risco é a ' +
            'contraparte: nunca libere a cripto antes de confirmar que o Pix caiu na sua conta.',
        },
      ],

      paragrafosFinais: [
        'Duas atitudes que não dependem de regra específica: guardar o registro de cada compra ' +
          'e venda, com data, valor e taxa, desde a primeira operação; e, se algum mês passar do ' +
          'limite, procurar um contador antes de declarar, não depois. Esta seção é informativa ' +
          'e não substitui essa conversa.',
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
      'As seis perguntas são sobre o contrato e quem controla o quê — não sobre arte, grupo ou ' +
        'narrativa. São a peneira do Módulo 3 na hora da decisão: nenhuma tese sobrevive a um ' +
        'contrato feito para prender você.',
      'Não é nota de zero a dez em que o bom compensa o ruim: basta um "não" para derrubar a ' +
        'operação.',
      'O quadro abaixo traduz as palavras em inglês do fluxo; se alguma travou você, leia e ' +
        'volte.',
    ],

    quadro: [
      {
        rotulo: 'Pool e LP',
        texto:
          'Pool é o par de moedas depositado numa corretora descentralizada: o dinheiro do ' +
          'outro lado quando você compra ou vende. LP (de liquidity pool) são os tokens que ' +
          'comprovam quem depositou. LP travada: bloqueada por um tempo, ninguém saca o pool. ' +
          'LP destravada: dá para sacar a qualquer momento.',
      },
      {
        rotulo: 'Authority (autoridade)',
        texto:
          'Permissão gravada no token, que continua valendo depois que ele nasce. Mint ' +
          'authority é a permissão de criar unidades novas; freeze authority, a de congelar ' +
          'contas (impedir que alguém movimente o que tem). "Revogada" quer dizer apagada: nem ' +
          'o criador pode mais usar.',
        destaque: true,
      },
      {
        rotulo: 'Supply, holders e concentração',
        texto:
          'Supply é o total de unidades do token. Holders são as carteiras que detêm essas ' +
          'unidades. Concentração é quanto do supply está com as maiores carteiras — o ' +
          '"top 10" é a lista das dez maiores, que os exploradores de rede mostram pronta.',
      },
      {
        rotulo: 'Bundle',
        texto:
          'Várias compras enviadas juntas para caírem no mesmo bloco, isto é, no mesmo ' +
          'instante da rede. Garante que quem enviou compre antes de todo mundo, no preço mais ' +
          'baixo que aquele token vai ter.',
      },
      {
        rotulo: 'Market cap e honeypot',
        texto:
          'Market cap é o valor de mercado: preço de uma unidade vezes o supply. Impressiona e ' +
          'não diz quanto dinheiro existe para comprar de você. Honeypot, "pote de mel", é o ' +
          'token em que dá para entrar e não dá para sair.',
      },
    ],

    exemplo: {
      titulo: 'Por que a primeira pergunta é a primeira',
      passos: [
        'O criador é dono dos tokens de LP, o comprovante do pool.',
        'Ele devolve o comprovante e retira a liquidez inteira.',
        'O preço vira pó no mesmo bloco, não em minutos: é o hard rug, a puxada de tapete mais ' +
          'rápida que existe. Não há tempo para reagir.',
        'Por isso esta pergunta vem antes de qualquer análise de narrativa.',
        'No pump.fun, depois da graduação, a pool é do protocolo e isso não acontece; lá, o ' +
          'golpe que sobra é o criador vender a própria compra (Módulo 6).',
      ],
    },

    // Absorve o antigo campo `paragrafoFinal`.
    paragrafosFinais: [
      'Tese e catálise só importam se o contrato resistir. Por isso a peneira vem primeiro, ' +
        'mesmo com a narrativa ótima: ela não melhora com entusiasmo.',
      'O erro que ela evita é começar pelo fim: se apaixonar pela história e só abrir o ' +
        'RugCheck quando já não dá para olhar com frieza.',
    ],

    detalhe: {
      titulo: 'o estudo da liquidez travada e a ferramenta de cada pergunta',
      paragrafos: [
        'Trava não aprova token: no estudo do primeiro alerta, 97,3% dos tokens com liquidez ' +
          'travada eram maliciosos, contra 97,7% no geral (Mazorra et al., 2022). A trava tira ' +
          'uma forma de golpe da mesa e não diz nada sobre as outras.',
        'Nota técnica verificada: na Solana, DEXs como a Raydium exigem freeze authority ' +
          'revogada para criar o pool. Num token que já tem pool nelas, essa checagem costuma ' +
          'vir respondida — o que não dispensa conferir.',
        'Ferramentas, no campo "onde": RugCheck para travas e autoridades; Solscan e BscScan, ' +
          'exploradores de rede (sites que mostram qualquer transação já feita), para holders e ' +
          'primeiras transações; Bubblemaps para carteiras ligadas; DexScreener para liquidez, ' +
          'volume e profundidade (quanto dá para vender sem derrubar o preço).',
      ],
    },

    itens: [
      {
        pergunta: 'Alguém consegue tirar a liquidez da pool?',
        porque:
          'Com a liquidez livre, o criador pode removê-la e o preço vira pó no mesmo bloco: é o ' +
          'hard rug. No pump.fun, depois da graduação, a pool é do protocolo e isso não ' +
          'acontece; o golpe que sobra lá é o criador vender a própria compra (Módulo 6).',
        onde: 'RugCheck (Lockers & LP); e o explorer para ver quem detém os tokens de LP.',
        alerta:
          'Tokens de LP numa carteira do criador. Mas trava não aprova token: num estudo, 97,3% ' +
          'dos tokens com liquidez travada eram maliciosos, contra 97,7% no geral (Mazorra et al., 2022).',
      },
      {
        pergunta: 'A mint authority foi revogada?',
        porque:
          'Mint authority ativa: ainda dá para criar tokens novos e encolher, sem aviso, a ' +
          'fatia de quem já comprou.',
        onde: 'RugCheck ou a página do token no Solscan.',
        alerta: 'Authority ativa numa carteira ligada ao criador.',
      },
      {
        pergunta: 'A freeze authority foi revogada?',
        porque:
          'Freeze authority ativa permite congelar contas do token: você compra e pode não ' +
          'conseguir vender. É o sinal clássico de possível honeypot, o token sem saída.',
        onde: 'RugCheck ou Solscan.',
        alerta: 'Authority ativa — trate como token potencialmente sem saída.',
      },
      {
        pergunta: 'Como está a concentração dos maiores holders?',
        porque:
          'Se poucas carteiras detêm a maior parte do supply, o seu resultado depende de um ' +
          'punhado de pessoas — que podem ser a mesma.',
        onde: 'Solscan/BscScan para a lista; Bubblemaps para ver clusters ligados.',
        alerta: 'Top 10 com fatia grande, especialmente em carteiras conectadas entre si.',
      },
      {
        pergunta: 'Houve bundles no lançamento?',
        porque:
          'Várias compras no mesmo bloco costumam ser o próprio dev e insiders montando ' +
          'posição antes de todo mundo, no preço mais baixo que existirá.',
        onde: 'RugCheck e ferramentas de análise on-chain; explorer para as primeiras transações.',
        alerta: 'Percentual alto do supply comprado no bloco do lançamento.',
      },
      {
        pergunta: 'A liquidez aguenta a sua saída?',
        porque:
          'Market cap alto com liquidez fina: o preço na tela não é o que você consegue ' +
          'realizar. Compare o tamanho da sua posição com o pool.',
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
      'Doze situações, quatro escolhas em cada. Não há pontuação de acerto de preço: mede-se se ' +
      'a decisão segue a regra ou o impulso. Cada escolha mostra o feedback, o risco e o ' +
      'próximo passo técnico. O histórico fica salvo no seu navegador.',
    // Aviso amarelo do topo do simulador. O "Cenários fictícios:" em negrito é posto
    // pelo componente, antes deste texto (tela 34 do desenho).
    aviso:
      'os números são inventados de propósito para o exercício, e a ordem é sorteada a cada ' +
      'rodada. Nenhum descreve um token real, e nada aqui é recomendação de compra ou venda.',
    // Parágrafo logo abaixo do aviso (tela 34 do desenho).
    abertura:
      'Não há pontuação de acerto de preço: mede-se se a decisão segue a regra ou o impulso. ' +
      'As quatro opções são sempre as mesmas — o que muda é a situação.',
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
      'Doze situações inventadas para treinar o que dá para treinar antes de ter dinheiro na ' +
      'mesa: decidir com a regra escrita na frente.',
    // O "Cenários fictícios:" em negrito vem antes deste texto (a view põe).
    // Este é o único aviso que aparece nesta aba (o componente entra sem o dele,
    // para o texto não sair duas vezes), então ele também avisa que a ordem é
    // sorteada — que é o que o simulador faz de verdade a cada rodada.
    rotuloDoAviso: 'Cenários fictícios:',
    aviso:
      'os números são inventados de propósito para o exercício, e a ordem é sorteada a cada ' +
      'rodada. Nenhum descreve um token real, e nada aqui é recomendação de compra ou venda.',
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
      'São doze situações com as mesmas quatro ações; muda só a situação. Não há preço para ' +
        'adivinhar, e nenhuma descreve um token real.',
      'Mede-se processo, não resultado. No mercado real os dois se confundem: decisão ruim pode ' +
        'dar certo por sorte, e boa pode dar errado. Só o processo está sob o seu controle — e ' +
        'só ele dá para treinar com números inventados.',
      'O feedback liga cada escolha ao risco que ela expõe e à ferramenta do Módulo 3. A ordem ' +
        'é sorteada a cada rodada, para você não decorar a sequência.',
      'No resumo final, "Não se aplica" não é erro de mérito: é escolher uma ação impossível — ' +
        'como "realizar parcial" sem ter posição. Vale 0 e é contada à parte.',
      'O erro que o formato evita é ler o resultado como nota de acerto de mercado. É a medida ' +
        'das duas frases do começo do módulo, aplicada doze vezes.',
    ],

    paragrafosFinais: [
      'O histórico fica salvo só neste navegador. Vale refazer depois de algumas semanas e ' +
        'comparar os dois resumos.',
    ],

    detalhe: {
      titulo: 'por que as quatro opções e os números são fixos',
      paragrafos: [
        'As quatro opções são fixas de propósito: opções sob medida entregariam a resposta pelo ' +
          'enunciado, e você treinaria leitura de prova, não decisão.',
        'Os números são inventados pelo mesmo motivo: número real convida a reconhecer o token e ' +
          'responder pela memória, não pela regra.',
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
        nota: 'A tese ("por que este token?") e a catálise ("por que agora?"). Nenhuma sozinha basta.',
      },
      {
        rotulo: 'Campos da ficha de tese',
        valor: '5',
        nota: 'Tese, catálise, prazo, invalidação e alvos. Dois minutos que separam decisão de impulso.',
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
        nota: 'Junto com a tese, não com o gráfico piscando. Definido depois, nasce contaminado pela euforia ou pelo medo.',
      },
      {
        rotulo: 'Faixas na escada',
        valor: '3',
        nota: 'Recuperar o investido, realizar lucro, e um restante COM regra escrita.',
      },
      {
        rotulo: 'Restante sem regra',
        valor: '5× → 0',
        nota: 'É assim que uma posição que multiplicou por cinco termina valendo nada.',
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
        nota: 'Qualquer uma. Por melhor que a narrativa esteja, o contrato precisa resistir primeiro.',
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
      'Quatro níveis escritos antes de entrar, sem linha de preço: o desenho mostra o que você ' +
      'decide, não o que o mercado faz.',
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
      'Um plano de posição são os níveis decididos antes de entrar: dois alvos, a entrada e a ' +
        'invalidação — onde você admite que errou. O que sobra na mesa corre com regra escrita.',
      'Não há gráfico, de propósito: o plano não depende de prever o caminho, só de ter os ' +
        'níveis. Um gráfico convidaria a imaginar o percurso — a parte que ninguém sabe.',
      'A ficha de tese põe o plano em cinco campos. Prazo é até quando o evento deve ' +
        'acontecer; invalidação, o que faria você admitir o erro; alvos, onde você vende parte, ' +
        'e quanto.',
      'No exemplo da invalidação aparece LP, de liquidity pool: o par de moedas depositado para ' +
        'as trocas acontecerem na corretora descentralizada. LP destravada quer dizer que quem ' +
        'depositou pode tirar esse dinheiro a qualquer momento — motivo para a tese acabar. A ' +
        'aba "Antes de entrar" detalha isso.',
      'O campo que quase todo mundo pula é a invalidação — o único que não dá para improvisar: ' +
        'com o preço caindo, qualquer número vai ser escolhido para não doer. E nenhum nível ' +
        'aqui foi escolhido pelo app: quem escreve é você.',
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
        'Nada aqui é sugestão: os 7 dias e as faixas só mostram como um campo preenchido se ' +
          'parece.',
      ],
    },

    paragrafosFinais: [
      'É a mesma pessoa nas duas pontas — você frio, que decide, e você sob pressão, que ' +
        'cumpre — e só uma delas está pensando direito.',
    ],

    detalhe: {
      titulo: 'por que a ficha tem cinco campos, e não três',
      paragrafos: [
        'Tese e catálise explicam a entrada, mas não fecham a saída: prazo, invalidação e alvos ' +
          'fazem de uma opinião um plano com começo e fim.',
        'Se a ficha estiver difícil de preencher em dois minutos, o problema não é a ficha: é a ' +
          'operação avisando que ainda não tem motivo.',
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
      'alvos e veja o realizado, o que fica na mesa e o pior caso.',
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
      'A calculadora não diz onde vender: mostra como a posição se reparte entre os três ' +
        'degraus e no que isso transforma o pior caso.',
      'Não há controle para "quanto vender no primeiro alvo", e não é esquecimento: a primeira ' +
        'faixa é, por definição, a fração que devolve o investido. Quanto mais alto o alvo, ' +
        'menor a fração.',
      'As três barras sempre somam a posição inteira. "Realizado" mostra, em múltiplos do ' +
        'investido, quanto voltou para a carteira; "Pior caso" diz se, com o restante a zero, ' +
        'você termina acima ou abaixo do investido.',
      'O erro que a tela evita é ajustar os controles até achar o desenho mais bonito e chamar ' +
        'isso de plano: os números são estrutura, não recomendação.',
    ],

    exemplo: {
      titulo: 'Uma passada pelos controles',
      passos: [
        'A tela abre com o primeiro alvo em 2× (o dobro do preço de entrada), o segundo em 4× ' +
          'e 50% do que sobrou vendido no segundo.',
        'Leve o primeiro alvo a 5×: o segundo é empurrado para 5,5×, porque nunca fica abaixo ' +
          'do primeiro — a distância mínima é meio múltiplo.',
        'As barras mudam de tamanho: o que sai de uma entra na outra.',
        'Leve o segundo alvo de 2× a 20× e veja a nota do "Restante na mesa": quanto ele vale, ' +
          'em relação ao investido, naquele alvo.',
        'Zere a fração do segundo alvo: é a escada sem o degrau do meio, com tudo o que sobrou ' +
          'dependendo da regra escrita.',
      ],
    },

    paragrafosFinais: [
      'Olhe a caixa do pior caso: depois que o investido voltou, o pior resultado deixou de ser ' +
        'prejuízo — sem previsão nenhuma, só com uma venda feita antes.',
    ],

    detalhe: {
      titulo: 'o que a conta supõe, e de onde vêm os limites dos controles',
      paragrafos: [
        'A conta supõe que existe comprador para a sua fração no preço do alvo — em memecoin, é ' +
          'o que falha primeiro. É a sexta checagem da aba "Antes de entrar": a liquidez aguenta ' +
          'a sua saída?',
        'Os limites (primeiro alvo de 1,5× a 10×; segundo de 2× a 20×, de meio em meio) são da ' +
          'tela, não opinião sobre até onde um token vai.',
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
        'A regra pediria mais que 100% do capital. Não é convite a usar dinheiro emprestado: a ' +
        'invalidação está apertada demais para o risco escolhido.',
      perda: (perda) =>
        'Com a posição no teto de 100% do capital, bater a invalidação custa ' + perda +
        ' do capital — menos que o risco que você aceitou.',
    },
    // Texto antigo da calculadora (a tela não mostra desde o redesenho).
    descricao:
      'A conta que liga o risco que você aceita ao ponto de invalidação que você escreveu.',
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
      'A calculadora pega duas decisões suas — quanto do capital você aceita perder numa ' +
        'operação e a que distância fica a invalidação — e devolve o tamanho da posição: ' +
        'tamanho = risco ÷ invalidação.',
      'Risco aceito não é "quanto vou investir": é quanto do capital some se a invalidação for ' +
        'atingida. Confundir os dois é o erro mais caro aqui: 2% do capital numa memecoin que ' +
        'pode ir a zero arrisca os 2% inteiros. O resultado tem uma casa decimal: 0,5% é 0,5%, ' +
        'não 1%.',
      'O atalho "pode ir a zero (100%)" fica em destaque porque, em memecoin, esse é um ' +
        'cenário realista — e é o que produz a menor posição.',
      'Parece contraintuitivo: quanto mais longe a invalidação, menor a posição. Visto ao ' +
        'contrário é simples — se você aceita cair muito antes de admitir o erro, precisa ' +
        'carregar menos.',
    ],

    exemplo: {
      titulo: 'Um caso extremo, para ver a conta trabalhando',
      passos: [
        'Ponha o risco em 10% e a invalidação em 5%.',
        'A fórmula pediria 200% do capital: dez dividido por cinco.',
        'A tela trava a posição em 100% do capital e avisa: não é sinal para alavancar (operar ' +
          'com dinheiro emprestado), e sim de invalidação apertada demais para o risco.',
        'Nesse teto, bater a invalidação custa 5% do capital — menos que os 10% de risco ' +
          'aceitos.',
        'Volte a invalidação para 100%, "pode ir a zero": a mesma regra dá a menor posição de ' +
          'todas, porque o pior caso é perder tudo o que entrou.',
      ],
    },

    paragrafosFinais: [
      'A conta não diz quanto risco aceitar: isso depende da sua vida — do que aquele dinheiro ' +
        'representa, de quanto tempo levaria para recompor, de quantas vezes por mês pretende ' +
        'operar. A calculadora entra depois dessa decisão.',
    ],

    detalhe: {
      titulo: 'o que a fórmula supõe, e o que esta tela nunca faz',
      paragrafos: [
        'A fórmula supõe que você consegue sair na invalidação. Em memecoin a liquidez pode ' +
          'sumir antes, e a perda passa do combinado — por isso a invalidação em 100% é o ' +
          'cenário honesto: não depende de conseguir sair.',
        'A tela nunca escolhe por você: não sugere risco, invalidação nem token. Só termina uma ' +
          'conta que você começou.',
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
      'não do mercado. A partir de ' + limiar + ' de perda, o ganho necessário passa ' +
      'desse teto e a barra fica no limite; é isso que o custo afundado produz.',
    // Texto antigo da calculadora (a tela não mostra desde o redesenho).
    descricao:
      'Perder e recuperar não são simétricos. Arraste a perda e veja o ganho necessário só ' +
      'para voltar ao ponto de partida.',
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
      'Depois de perder tanto por cento, quanto é preciso ganhar só para empatar? É a única ' +
        'pergunta desta calculadora.',
      'A assimetria vem da base: você perde uma porcentagem do valor cheio e precisa ganhar ' +
        'uma porcentagem do que sobrou, que é menor. Por isso a exigência cresce mais rápido que ' +
        'a perda.',
      'O controle vai de 5% a 95% de perda, e as duas barras usam a mesma régua: a distância ' +
        'entre elas é a coisa toda. A partir de 67% de perda, empatar exige mais de 200% e a ' +
        'barra encosta no limite — um teto desta tela, não do mercado.',
      'O erro que a tela desmonta: achar que queda e alta do mesmo tamanho se cancelam. A ' +
        'diferença entre elas é o custo de ter demorado a decidir.',
    ],

    paragrafosFinais: [
      'Por isso existe a invalidação: não evita a perda, evita a grande, de que não se volta em ' +
        'tempo razoável. É a conta do card seguinte: na Degradação, cada dia segurando aumenta a ' +
        'barra da perda — e a do ganho cresce mais rápido.',
    ],

    detalhe: {
      titulo: 'a fórmula em palavras',
      paragrafos: [
        'A fórmula da nota em palavras: divida 1 pelo que sobrou depois da perda e tire 1. Se ' +
          'sobrou pouco, a divisão dispara.',
        'A conta é sobre a posição. Quanto a perda custa do seu capital depende do tamanho da ' +
          'posição — assunto da calculadora da aba "Antes de entrar".',
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
    'antes-de-entrar': {
      titulo: 'Antes de entrar: as checagens, o tamanho da posição e a curva de recuperação',
      secao: 'antes-de-entrar',
      src: 'assets/videos/antes-de-entrar.mp4',
      duracao: '7:12',
      descricao: 'As seis checagens antes da compra, e por que perder 50% pede 100% para voltar.',
      transcricao: [],
    },
  },
};
