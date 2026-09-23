// modulo7.js — conteúdo do Módulo 7 (A rotina: regra, tamanho, diário e revisão).
// Aqui só tem DADOS: nenhuma lógica, nenhum HTML. A matemática da calculadora mora
// em src/views/modulo7.js.
//
// De onde vem: pesquisa 6 dos módulos, versão 2
// (pesquisa/modulos/pesquisas/P6-rotina-e-tamanho-de-posicao-v2.md).
//
// O que este módulo NÃO faz, por decisão do dono do projeto: escrever a regra de
// entrada, dizer quanto investir ou qual token comprar. Ele mostra o que uma regra
// precisa ter para ser testada, e a matemática do tamanho e da revisão.

export const modulo7 = {
  id: 'modulo-7',
  titulo: 'A rotina',

  resumo:
    'Uma forma de operar não é um palpite repetido: é uma regra escrita antes, um tamanho ' +
    'que aguenta ir a zero, uma saída que executa sozinha, um diário que guarda o que você ' +
    'pensou e uma revisão que olha o comportamento, não o saldo. Este módulo mostra o que ' +
    'cada peça tem de evidência — e o que não tem.',

  // Subtítulo do cabeçalho da página, como no desenho: o resumo sem a primeira frase.
  subtitulo:
    'Uma regra escrita antes, um tamanho que aguenta ir a zero, uma saída que executa ' +
    'sozinha, um diário que guarda o que você pensou e uma revisão que olha o ' +
    'comportamento, não o saldo. Este módulo mostra o que cada peça tem de evidência — e o ' +
    'que não tem.',

  // A caixa roxa do cabeçalho: a regra do dono dita na primeira tela.
  avisoDoCabecalho: {
    destaque: 'Este módulo não escreve a sua regra.',
    texto:
      'Ele mostra o que ela precisa ter para ser testada depois. Quando comprar é decisão ' +
      'sua — e fica no papel antes de você ver o próximo token. Nenhum campo desta tela vem ' +
      'preenchido, e todo exemplo aparece marcado como exemplo.',
  },

  objetivos: [
    'Escrever uma regra que dá para conferir depois — a regra é sua; o módulo mostra a forma.',
    'Entender por que o critério de Kelly quebra em memecoin e o que sobra: sobreviver.',
    'Calcular quanto sobra do capital depois de uma sequência de perdas totais.',
    'Montar um diário de 9 campos que separa comportamento de resultado.',
    'Revisar sem cair nos vieses, e saber quantas operações provam alguma coisa.',
    'Reconhecer as estatísticas de trading inventadas que circulam.',
  ],

  // Mapa do módulo ("O módulo inteiro numa olhada", no topo da página): o centro
  // e as folhas curtas de cada aba, copiados do desenho (M7 Desktop, renderVals ›
  // ABAS). `aba` é o id da aba na view. O ramo do Quiz não entra aqui: a view
  // conta as perguntas de `quiz` e escreve "N perguntas".
  mapa: {
    titulo: 'A rotina',
    subtitulo: 'A regra é sua; a forma é daqui',
    ramos: [
      { aba: 'regra', folhas: ['por que antes', 'as 5 partes em branco', 'o ciclo', 'saída automática'] },
      { aba: 'tamanho', folhas: ['fração fixa', 'sequência de perdas', 'ruína do apostador'] },
      { aba: 'diario', folhas: ['o que tem lastro', 'os 9 campos'] },
      { aba: 'revisao', folhas: ['olhar pouco', 'a pergunta', 'quantas operações'] },
      { aba: 'mitos', folhas: ['o que dizem × a evidência'] },
    ],
  },

  // ---------------------------------------------------------------------------
  // Seções — uma por card, na ordem do desenho (M7 Desktop). Cada seção tem o
  // título, a ideia central (`emUmaFrase`), os dados do visual que fica DENTRO
  // do card e o texto que explica a ideia. Decisão do dono (20/09): nenhuma
  // pergunta aparece nas abas de conteúdo — todas ficam no quiz do fim.
  //
  // Texto com pedaço em negrito: ['antes ', { forte: 'negrito' }, ' depois'].
  // Caixa com começo em negrito: { destaque: 'Frase forte.', texto: 'O resto.' }.
  // `tom` escolhe a cor do desenho: 'bom' (verde), 'ruim' (vermelho),
  // 'atencao' (âmbar), 'primaria' (roxo), 'acento' (ciano), 'neutro' (cinza).
  // ---------------------------------------------------------------------------
  secoes: [
    // ================================ A REGRA ================================
    {
      id: 'por-que-antes',
      aba: 'regra',
      titulo: 'Por que a regra vem antes da compra',
      emUmaFrase:
        'Depois do resultado, a memória reescreve o que você pensava. A regra escrita antes ' +
        'guarda o que você pensou de verdade.',
      // O que a cabeça diz depois do resultado: dois cartões e, embaixo, a caixa ciano.
      memoria: {
        cartoes: [
          {
            quando: 'Se deu certo',
            frase: '"Eu sabia."',
            vies: 'Viés de retrospectiva. E "foi habilidade": viés de autoatribuição.',
            tom: 'atencao',
          },
          {
            quando: 'Se deu errado',
            frase: '"Foi azar."',
            vies: 'A mesma decisão, contada de outro jeito — porque o resultado mudou.',
            tom: 'ruim',
          },
        ],
        conclusao: {
          destaque: 'A regra escrita antes é a única versão que não muda.',
          texto:
            'Planos do tipo "se acontecer X, eu faço Y", feitos antes, aumentam a chance de a ' +
            'pessoa cumprir o que planejou — é um resultado repetido da psicologia do comportamento.',
        },
      },
      paragrafos: [
        'Uma regra de operação é um texto curto, escrito e datado, que diz o que você vai fazer ' +
          'antes de ter qualquer resultado na frente. Ela não adivinha o futuro e não promete ' +
          'acerto: ela só registra, enquanto a cabeça está fria, qual era o seu critério. Escrever ' +
          'antes é o que separa "eu tinha um plano" de "eu me lembro de ter tido um plano". São ' +
          'coisas diferentes, e só a primeira dá para conferir depois.',
        'Isso importa porque a memória não guarda decisões: ela guarda histórias, e reescreve a ' +
          'história quando o final muda. Os dois cartões do desenho mostram a mesma decisão ' +
          'contada de dois jeitos. Se deu certo, vem o "eu sabia" — é o viés de retrospectiva, a ' +
          'impressão de que o que aconteceu era previsível, impressão que só aparece depois de ' +
          'ter acontecido. Junto dele vem o "foi habilidade", que é o viés de autoatribuição: ' +
          'fico com o mérito do ganho e empurro a perda para o azar. Se deu errado, a mesma ' +
          'decisão vira "foi azar". Repare que nada mudou na decisão. Mudou o resultado.',
        'Na prática, isso acontece num momento só, e é um momento curto: antes de você abrir a ' +
          'próxima tela de token. Depois que o gráfico está na frente, qualquer coisa que você ' +
          'escrever já nasce contaminada pelo que está vendo. Por isso a regra é escrita fora da ' +
          'tela de negociação, e por isso nenhum campo deste hub guarda o texto dela: o lugar da ' +
          'regra é o seu caderno. O que este módulo mostra é a forma de uma regra que dá para ' +
          'conferir depois. O conteúdo é decisão sua, do começo ao fim.',
      ],
      exemplo: {
        titulo: 'Pré-compromisso medido: o que funcionou e o que não colou',
        passos: [
          'Nas Filipinas, um banco ofereceu uma conta de poupança que travava os saques até uma data combinada.',
          'Entre quem aceitou, a poupança aumentou cerca de 82% em um ano — o compromisso funcionou.',
          'Só que apenas 28% das pessoas aceitaram abrir a conta.',
          'E outros estudos mostram muita gente abandonando o compromisso antes do prazo.',
          'Os dois números andam juntos: o efeito em quem aceitou foi grande, e a adesão foi pequena.',
        ],
      },
      paragrafosFinais: [
        'O erro que essa ideia evita é o mais comum de todos: revisar a operação de memória. Quem ' +
          'revisa de memória sempre conclui que a decisão foi coerente, porque a memória já ' +
          'arrumou a história para caber no resultado. Com a regra escrita antes, a revisão deixa ' +
          'de ser uma conversa com você mesmo e vira uma comparação entre dois textos: o que ' +
          'estava escrito e o que você fez.',
        'Vale dizer com todas as letras o que está medido e o que não está. O que foi medido é ' +
          'que planos do tipo "se acontecer X, eu faço Y", feitos antes, aumentam a chance de a ' +
          'pessoa cumprir o que planejou. Cumprir o que planejou e ganhar dinheiro são duas ' +
          'coisas diferentes, e só a primeira tem evidência aqui. Uma regra escrita não melhora a ' +
          'regra: ela só faz você ficar do lado dela.',
      ],
      detalhe: {
        titulo: 'de onde vem, e por que o pré-compromisso falha',
        paragrafos: [
          'O resultado dos planos "se acontecer X, eu faço Y" é de Gollwitzer & Sheeran (2006), e ' +
            'foi medido em metas de comportamento em geral — não em operações no mercado.',
          {
            destaque: 'Pré-compromisso funciona, e falha com frequência.',
            texto:
              'A conta de poupança das Filipinas do exemplo acima é de Ashraf, Karlan & Yin ' +
              '(2006). A lição prática dos dois números juntos é que o compromisso precisa ser ' +
              'rígido o bastante para valer e simples o bastante para você manter. Regra que ' +
              'você quebra toda semana não protege nada — e regra rígida demais para a sua vida ' +
              'vira uma das que se quebra toda semana.',
          },
          'Uma ressalva de honestidade sobre as fontes: Gollwitzer & Sheeran (2006) e Ashraf, ' +
            'Karlan & Yin (2006) foram confirmados por artigos revisados por pares que os citam, ' +
            'e não pelos textos originais, que estão atrás de paywall. "Revisado por pares" quer ' +
            'dizer que outros pesquisadores da área leram e criticaram o trabalho antes de ele ' +
            'ser publicado; é o selo de qualidade mais forte que este módulo usa, e por isso ' +
            'importa dizer quando ele foi conferido de segunda mão.',
        ],
      },
    },
    {
      // O formulário EM BRANCO. Regra do dono: o hub não escreve a regra de
      // ninguém. Cada parte diz o que ela tem e dá um exemplo só da FORMA de uma
      // resposta verificável — nunca um limiar, um percentual ou um gatilho.
      id: 'cinco-partes',
      aba: 'regra',
      titulo: 'As cinco partes da sua regra',
      etiqueta: 'em branco: você escreve',
      emUmaFrase:
        'Uma regra que não dá para conferir depois não é regra: é intenção. Cada parte é ' +
        'escrita de um jeito que outra pessoa conseguiria verificar olhando o seu diário.',
      rotuloDoExemplo: 'exemplo de forma',
      partes: [
        {
          id: 'gatilho',
          rotulo: 'Gatilho de entrada',
          oQueTem:
            'O que precisa acontecer, de um jeito que dá para ver, para você comprar. O ' +
            'checklist é o filtro mínimo; o gatilho é seu.',
          placeholder: 'Escreva o seu gatilho, de um jeito verificável',
          exemplo:
            'A forma de um gatilho verificável tem um fato observável e um momento — não ' +
            '"quando parecer bom".',
        },
        {
          id: 'tamanho',
          rotulo: 'Tamanho',
          oQueTem: 'Quanto entra, em porcentagem do capital. Decidido antes de ver o gráfico.',
          placeholder: 'Escreva a sua fração, em % do capital',
          exemplo: 'A forma é uma porcentagem do capital de hoje, e não um valor em reais que envelhece.',
        },
        {
          id: 'perda',
          rotulo: 'Saída por perda',
          oQueTem: 'O nível ou a condição em que você sai. Já fica programada.',
          placeholder: 'Escreva onde você sai, e como isso fica programado',
          exemplo:
            'A forma diz o nível e quem executa: você programou a ordem, ou vai depender de ' +
            'estar olhando?',
        },
        {
          id: 'ganho',
          rotulo: 'Saída por ganho e por tempo',
          oQueTem:
            'Quando realizar (a escada do Módulo 4) e quanto tempo esperar sem nada acontecer.',
          placeholder: 'Escreva os seus alvos e o prazo sem catálise',
          exemplo:
            'A forma tem faixas definidas antes e um prazo — "espero até quando?" precisa ter ' +
            'resposta.',
        },
        {
          id: 'invalida',
          rotulo: 'O que invalida a regra',
          oQueTem: 'O que precisaria acontecer, na revisão, para você parar de usá-la.',
          placeholder: 'Escreva o que faria você abandonar esta regra',
          exemplo:
            'A forma é uma condição que dá para conferir no diário, não uma sensação de que ' +
            '"não está funcionando".',
        },
      ],
      rodape: [
        [
          'Os exemplos mostram o ',
          { forte: 'formato' },
          ' de uma resposta verificável, nunca um limiar, um percentual ou um gatilho a seguir. ' +
            'O hub não sabe qual é o seu capital, o seu prazo nem o que você aceita perder — e ' +
            'não tem como saber.',
        ],
        'Nada digitado aqui é salvo: esta tela é a forma, e o lugar da regra é o seu caderno.',
      ],
      paragrafos: [
        'Uma regra completa responde cinco perguntas, e são sempre as mesmas cinco: quando eu ' +
          'entro, com quanto eu entro, onde eu saio se der errado, onde eu saio se der certo ou ' +
          'se nada acontecer, e o que me faria jogar esta regra fora. São os cinco campos em ' +
          'branco aqui em cima. Eles estão em branco de propósito: o hub não sabe qual é o seu ' +
          'capital, qual é o seu prazo nem o que você aceita perder, e não tem como saber.',
        'A palavra que carrega o peso todo é verificável. Uma resposta é verificável quando outra ' +
          'pessoa, lendo só o seu diário semanas depois, consegue dizer sim ou não sem perguntar ' +
          'nada a você. "Comprei quando pareceu bom" não passa nesse teste, porque ninguém ' +
          'consegue conferir "pareceu". Um fato observável somado a um momento passa, porque ou ' +
          'aquilo estava lá na hora, ou não estava. Isso vale para as cinco partes, não só para a ' +
          'primeira.',
        'Isso importa porque as cinco partes são a única coisa que a revisão tem para comparar. ' +
          'Na aba O diário, o campo "segui a regra?" não sai da sua lembrança: sai de colocar ' +
          'lado a lado o que estava escrito antes e o que a corretora registrou depois. Se a ' +
          'regra estiver escrita de um jeito que não dá para conferir, a revisão fica sem lastro ' +
          'e o módulo inteiro para de funcionar a partir daí.',
        'Na tela, ao lado de cada parte, aparece um texto marcado como exemplo de forma. Leia ' +
          'essa etiqueta ao pé da letra: ali está o formato de uma resposta verificável, nunca um ' +
          'limiar, um percentual ou um gatilho para você seguir. E nada do que você digitar nesta ' +
          'tela é salvo — a tela é o molde, o lugar da regra é o caderno.',
      ],
      exemplo: {
        titulo: 'Por que o tamanho é escrito em porcentagem, e não em valor fixo',
        passos: [
          'Use o mesmo capital do exemplo da aba O tamanho: capital de 100, posição de 10.',
          'Escrito como porcentagem, o tamanho é "10% do capital de hoje".',
          'Escrito como valor fixo, o tamanho é "10", e parece a mesma coisa.',
          'Se a posição vai a zero, o capital cai para 90 — e o valor fixo de 10 passa a ser uma fatia maior do que sobrou.',
          'A porcentagem se ajusta sozinha; o valor fixo envelhece e vai apertando sem você perceber. A conta completa está na aba O tamanho.',
        ],
      },
      paragrafosFinais: [
        'O erro que essas cinco perguntas evitam é o da regra pela metade: a pessoa decide muito ' +
          'bem quando entrar e não decide nada sobre sair. Aí a saída acaba sendo decidida no pior ' +
          'momento possível, que é com a posição aberta e o preço andando. Repare que três das ' +
          'cinco partes falam de saída ou de abandono — não é desequilíbrio, é o ponto.',
        'A quinta parte, o que invalida a regra, é a que quase todo mundo pula. Sem ela, a regra ' +
          'nunca morre: ela só vai sendo ajustada um pouquinho a cada perda, até não ser mais a ' +
          'mesma regra e ninguém saber dizer quando mudou. Decidir antes o que faria você ' +
          'abandonar a regra é o que permite abandoná-la sem que isso vire uma decisão tomada no ' +
          'susto.',
      ],
    },
    {
      id: 'ciclo',
      aba: 'regra',
      titulo: 'O ciclo de uma operação',
      emUmaFrase: 'A regra só muda na revisão — nunca no meio de uma operação.',
      // As caixas do ciclo, de cima para baixo.
      ciclo: {
        inicio: 'Escrevo a regra',
        filtro: 'Passo o token pelo checklist',
        reprovou: 'reprovou',
        passou: 'passou',
        naoCompro: 'Não compro e anoto o motivo',
        gatilho: 'O gatilho da minha regra aconteceu?',
        nao: 'não',
        sim: 'sim',
        entrada: 'Entro com o tamanho da regra e a saída já programada',
        depois: ['Anoto no diário antes de ver o resultado', 'A saída executa', 'Anoto a saída executada'],
        revisao: 'Revisão: segui a regra?',
        volta: 'mudança na regra só aqui, e volta para o começo',
        descricao:
          'Escrevo a regra. Passo o token pelo checklist: se reprovou, não compro e anoto o ' +
          'motivo. Se passou, confiro se o gatilho da minha regra aconteceu: se não, não compro e ' +
          'anoto o motivo; se sim, entro com o tamanho da regra e a saída já programada. Anoto no ' +
          'diário antes de ver o resultado. A saída executa, e eu anoto a saída executada. Na ' +
          'revisão, pergunto se segui a regra — qualquer mudança na regra acontece só aqui, e ' +
          'volta para o começo.',
      },
      paragrafos: [
        'O desenho acima é o caminho inteiro de uma operação, do papel até a revisão. Ele começa ' +
          'fora do mercado, com a regra escrita, e termina fora do mercado, na revisão. O meio — ' +
          'a parte em que o dinheiro está lá dentro — é curto de propósito: quase tudo já foi ' +
          'decidido antes de você clicar.',
        'Há dois filtros em sequência, e eles não são a mesma coisa. O primeiro é o checklist, a ' +
          'lista de conferência do hub: ele é o filtro mínimo, igual para qualquer token, e serve ' +
          'para reprovar o que nem deveria ser considerado. O segundo é o gatilho da sua regra, ' +
          'que é só seu. Um token pode passar no checklist e mesmo assim não ser comprado, porque ' +
          'o gatilho que você escreveu não aconteceu. Passar no checklist não é sinal de compra.',
        'A parte mais fácil de ignorar é a que não dá trabalho nenhum: quando reprova, você não ' +
          'compra e anota o motivo. Parece desperdício anotar uma operação que não existiu, mas é ' +
          'justamente esse registro que mostra, na revisão, se o seu filtro está funcionando ou ' +
          'se você vem inventando exceções. Uma pasta cheia de "não comprei porque" é um ativo do ' +
          'diário, não um refugo.',
        'A seta que importa é a do fim: a mudança na regra só acontece na revisão, e depois volta ' +
          'para o começo. No meio de uma operação, a regra é tratada como se fosse de outra ' +
          'pessoa — porque, em termos de memória, ela é mesmo: foi escrita por você num momento ' +
          'em que você não estava vendo o preço andar.',
      ],
      exemplo: {
        titulo: 'Os três fins possíveis, e todos os três viram registro',
        passos: [
          'O token reprova no checklist: não compro, e anoto o motivo. Fim.',
          'O token passa no checklist, mas o gatilho da minha regra não aconteceu: não compro, e anoto o motivo. Fim.',
          'Passou e o gatilho aconteceu: entro com o tamanho da regra e com a saída já programada.',
          'Anoto no diário antes de ver o resultado; a saída executa; anoto a saída executada.',
          'Na revisão, comparo o que estava escrito com o que foi executado — e é só aqui que a regra pode mudar.',
        ],
      },
      paragrafosFinais: [
        'O erro que esse ciclo evita tem nome informal: mudar a regra com a posição aberta. É ' +
          'quando o alvo escrito antes vira "vou segurar mais um pouco", ou a saída por perda ' +
          'vira "isso aqui ainda volta". Não é falta de disciplina abstrata: é que, com a posição ' +
          'aberta, quem está decidindo é uma versão sua que já tem dinheiro em jogo e já quer um ' +
          'resultado específico.',
        'Repare que o ciclo não diz o que comprar nem quando. Ele só garante que, seja qual for a ' +
          'sua regra, cada volta produza um registro conferível e um único momento legítimo para ' +
          'mudar de ideia.',
      ],
    },
    {
      id: 'stop-automatico',
      aba: 'regra',
      titulo: 'Saída automática, não lembrete',
      emUmaFrase:
        'Uma ordem de venda automática mudou o comportamento. Um lembrete para vender não mudou ' +
        'nada.',
      comparacao: {
        descricao:
          'Num experimento, investidores com ordem de venda automática seguraram menos as ' +
          'posições perdedoras. O lembrete para considerar vender não mudou nada.',
        cartoes: [
          { tom: 'bom', rotulo: 'Ordem de venda automática', frase: 'Seguraram menos as posições perdedoras.' },
          { tom: 'neutro', rotulo: 'Lembrete para "considerar vender"', frase: 'Não mudou nada.' },
        ],
      },
      paragrafos: [
        'Stop-loss é uma ordem de venda automática. Em português: você programa antes um nível de ' +
          'preço, e a venda acontece sozinha quando o preço chega lá, com você olhando ou não. É ' +
          'diferente de um alarme, que só avisa, e é diferente de uma intenção, que só existe na ' +
          'sua cabeça. A palavra que separa os três é execução: a ordem executa, o alarme avisa, ' +
          'a intenção espera você.',
        'É exatamente essa diferença que um experimento mediu, e o resultado está nos dois ' +
          'cartões acima. Quem tinha a ordem de venda automática segurou menos as posições ' +
          'perdedoras. Quem recebia um lembrete para "considerar vender" não mudou nada. Repare ' +
          'no que foi medido: comportamento, não lucro. Ninguém mostrou ali que o stop dá mais ' +
          'dinheiro; mostrou que ele muda o que a pessoa faz. E o módulo não guarda um número de ' +
          'quanto reduziu — o que está medido é a direção do efeito, não o tamanho dele.',
        'Isso importa para você por um motivo específico: segurar posição perdedora é o hábito ' +
          'mais teimoso que existe em quem opera, e ele não cede com boa vontade. A pessoa sabe ' +
          'que deveria sair, promete sair, e não sai. O que corrige o viés é a execução, não a ' +
          'intenção. Por isso a terceira parte da sua regra não pergunta só onde você sai: ela ' +
          'pergunta quem executa essa saída.',
        'Na prática, a saída é programada no mesmo momento da entrada, não depois. Depois é ' +
          'tarde: com a posição aberta, o nível que você escolheria já não é o mesmo. E em ' +
          'memecoin a ordem automática tem um limite honesto — numa queda rápida, ela pode ' +
          'executar bem abaixo do nível programado. Isso é o slippage, o deslizamento entre o ' +
          'preço que você via e o preço em que a ordem de fato saiu (Módulo 5). O stop reduz o ' +
          'dano; ele não garante o preço.',
      ],
      exemplo: {
        titulo: 'O mesmo nível, dois caminhos',
        passos: [
          'Caminho A: no momento da entrada, você programa a ordem de venda no nível que escreveu na regra.',
          'O preço chega lá às três da manhã. A ordem executa sozinha. Você anota a saída executada no dia seguinte.',
          'Caminho B: você anota o mesmo nível num lembrete e promete vender quando chegar.',
          'O preço chega lá às três da manhã. Você está dormindo — e, se estivesse acordado, ainda teria de decidir de novo, com a perda na tela.',
          'O nível escrito é idêntico nos dois casos. O que muda é quem aperta o botão.',
        ],
      },
      paragrafosFinais: [
        'O erro que essa ideia evita é confundir ter decidido com ter programado. Uma saída ' +
          'decidida e não programada volta a ser uma decisão no pior momento, e o experimento ' +
          'sugere que é assim que ela se perde. O lembrete é a versão simpática da intenção: ele ' +
          'parece um compromisso e não é.',
      ],
      detalhe: {
        titulo: 'a fonte, e o que ela não cobre',
        paragrafos: [
          'O experimento é de Fischbacher, Hoffmann & Schudy (2017), confirmado por um artigo ' +
            'revisado por pares que o cita, e não pelo original, que está atrás de paywall.',
          'Ele foi feito com investidores num ambiente de experimento, não com memecoin. Levar o ' +
            'resultado para cá é uma inferência razoável — a direção do efeito é sobre ' +
            'comportamento humano, não sobre um mercado específico —, mas continua sendo uma ' +
            'inferência, e não uma medição feita aqui.',
        ],
      },
    },

    // =============================== TAMANHO =================================
    {
      id: 'fracao-fixa',
      aba: 'tamanho',
      titulo: 'Fração fixa: uma perda nunca zera a banca',
      emUmaFrase:
        'Arriscar sempre a mesma porcentagem do capital de hoje. O tamanho encolhe quando você ' +
        'perde e cresce quando ganha, sem precisar decidir de novo.',
      // O exemplo do arquivo (10%), em três cartões. `barra` é o comprimento da
      // barrinha, em % do capital inicial.
      mecanismo: {
        titulo: 'O mecanismo, com 10% por posição',
        etiqueta: 'exemplo do arquivo, não sugestão de fração',
        descricao:
          'Você tem 100 de capital, a posição é 10. A posição vai a zero e sobram 90. A próxima ' +
          'posição é 10% de 90: 9.',
        passos: [
          { momento: 'Capital de hoje', capital: '100', texto: 'A posição é 10 — 10% do capital.', barra: 100, tom: 'primaria' },
          {
            momento: 'A posição vai a zero',
            capital: '90',
            texto: 'Sobram 90. A perda nunca zera a banca, porque você arriscou só uma parte.',
            barra: 90,
            tom: 'ruim',
          },
          {
            momento: 'Próxima posição',
            capital: '9',
            texto: '10% de 90. O tamanho encolheu sozinho, sem você decidir de novo.',
            barra: 9,
            tom: 'acento',
          },
        ],
      },
      paragrafos: [
        'Fração fixa é uma forma de decidir o tamanho da posição. A conta é sempre a mesma: você ' +
          'aplica uma porcentagem sobre o capital de hoje, e esse é o tamanho. O que é fixo é a ' +
          'porcentagem, não o valor. Banca, aqui, é o nome do capital todo que você separou para ' +
          'isso — a fração é sempre uma fatia dela, nunca ela inteira.',
        'O desenho acima mostra o mecanismo com 10%, que é o número do exemplo do arquivo e não ' +
          'uma sugestão de fração. Capital 100, posição 10. A posição vai a zero e sobram 90. A ' +
          'próxima posição é 10% de 90, ou seja, 9. Repare no que aconteceu sozinho: o tamanho ' +
          'encolheu sem que ninguém decidisse encolher. Se o capital tivesse subido, ele teria ' +
          'crescido do mesmo jeito. Essa é a propriedade inteira da fração fixa — ela transforma ' +
          'o tamanho numa consequência do capital, e não numa decisão tomada na hora, olhando o ' +
          'gráfico.',
        'Por que isso importa para você: numa fração fixa, uma perda nunca zera a banca. Sempre ' +
          'sobra alguma coisa, porque você arriscou só uma parte. A alternativa — decidir o ' +
          'tamanho a cada operação, pelo tanto que aquele token parece promissor — tem o defeito ' +
          'de colocar a maior posição exatamente onde a convicção é maior, e convicção alta é ' +
          'justamente a hora em que a memória está mais pronta para reescrever a história depois.',
        'O número que circula por aí, "arrisque de 1% a 2% por operação", é convenção de mercado. ' +
          'Nenhum estudo revisado por pares o fixa como ótimo: ele é coerente com a ideia de ' +
          'sobreviver, e é só isso. Qual fração você usa é decisão sua, e este módulo não escreve ' +
          'esse número no seu lugar — nem teria como, porque ele depende do seu capital e do que ' +
          'você aceita perder.',
      ],
      quadro: [
        {
          rotulo: 'Isto é conta',
          texto:
            'O mecanismo da fração fixa. Dado o capital e a porcentagem, o tamanho sai por ' +
            'aritmética, e o resultado é o mesmo para qualquer pessoa.',
        },
        {
          rotulo: 'Isto não é medição',
          texto:
            'Nada aqui diz que 10% é bom ou ruim. O exemplo usa 10% porque é um número redondo ' +
            'que deixa a conta visível.',
          destaque: true,
        },
      ],
      paragrafosFinais: [
        'O erro que a fração fixa evita é o da posição decidida pelo entusiasmo: entrar pequeno ' +
          'quando se está inseguro, entrar grande quando se está animado, e descobrir no fim do ' +
          'mês que as poucas posições grandes decidiram o resultado todo. Com fração fixa, o ' +
          'tamanho não conversa com o seu humor. Ele conversa com o seu capital.',
        'Falta responder qual fração é a melhor. A resposta honesta é que, para memecoin, ninguém ' +
          'sabe — e a razão disso está logo abaixo, em "Para ir mais fundo".',
      ],
      detalhe: {
        titulo: 'por que o critério de Kelly quebra aqui',
        paragrafos: [
          'O critério de Kelly responde que fração apostar para o capital crescer o mais rápido ' +
            'possível no longo prazo. Para um ativo contínuo, f* = μ ÷ σ², em que μ é o retorno ' +
            'esperado (a média dos resultados) e σ² é a variância (o tamanho típico das ' +
            'oscilações em torno dessa média). A fórmula só funciona se as duas existirem — e ' +
            'numa cauda muito pesada a variância pode ser infinita e a média pode nem existir, ' +
            'então ela não produz número nenhum.',
          '"Cauda pesada" é o apelido de uma distribuição em que os casos extremos aparecem com ' +
            'frequência alta demais para a média se comportar. Num mundo de cauda leve, uma ' +
            'amostra grande faz a média assentar num valor. Num mundo de cauda muito pesada, um ' +
            'único caso extremo pode mexer na média de tudo o que veio antes, e ela nunca assenta.',
          'Dá para ver a fórmula quebrando num caso simples: numa aposta com 50% de chance de ' +
            'dobrar e 50% de perder tudo, a fração de Kelly é 0 — f* = (0,5 × 1 − 0,5) ÷ 1. A ' +
            'possibilidade de perda total domina a conta, e a resposta matemática é não apostar ' +
            'nada. Não é um conselho: é o que a fórmula devolve.',
          'O que a pesquisa diz com segurança é a direção: quanto mais pesada a cauda, menor a ' +
            'fração ótima (Bamberg & Neuhierl, 2012; padrão de cauda em cripto em Grobys & ' +
            'Shahzad, 2025). O valor ótimo para memecoin, ninguém resolveu — e vale registrar que ' +
            'nenhum índice de cauda das memecoins foi publicado, então nem a premissa da cauda ' +
            'muito pesada vem de uma medição feita em memecoin.',
        ],
      },
    },
    {
      // O card da calculadora (os dados dela estão em `calculadoraDeSequencia`).
      id: 'sequencia-de-perdas',
      aba: 'tamanho',
      titulo: 'Quanto sobra depois de uma sequência de perdas totais',
      emUmaFrase:
        'Perder é mais rápido que recuperar, e a diferença cresce com a fração. É a matemática ' +
        'de uma regra, não uma sugestão de fração.',
      paragrafos: [
        'Esta calculadora responde uma pergunta só: se várias posições seguidas forem a zero, ' +
          'quanto sobra do capital e quanto seria preciso ganhar para voltar ao ponto de partida. ' +
          'Você escolhe dois números — a fração do capital em cada posição e quantas posições ' +
          'seguidas vão a zero — e ela devolve outros dois. Ela não prevê nada e não sugere ' +
          'fração nenhuma: é aritmética, e o resultado é o mesmo para qualquer pessoa que digitar ' +
          'os mesmos números.',
        'A fórmula é curta: sobra = (1 − f) elevado a n, em que f é a fração e n é o número de ' +
          'perdas. O elevado a n é o detalhe que muda tudo, porque a fração é recalculada sobre o ' +
          'que sobrou a cada vez, e não sobre o capital inicial. É a mesma lógica da fração fixa ' +
          'do card anterior: o tamanho encolhe sozinho junto com a banca.',
        'Isso importa porque o segundo número, o ganho para voltar ao começo, é sempre maior que ' +
          'a perda sofrida. O motivo é simples: o ganho é calculado sobre um capital menor. ' +
          'Perder metade do capital exige dobrar o que sobrou — ou seja, +100% — só para voltar ' +
          'ao ponto de partida. Não é pessimismo nem retórica; é a mesma conta vista do outro ' +
          'lado.',
        'Os dois atalhos, 10% por posição e 25% por posição, são as duas frações do exemplo do ' +
          'arquivo e servem para comparar uma com a outra. Troque entre eles com o mesmo número ' +
          'de perdas e observe o que acontece com o segundo número, o do ganho necessário: é ali ' +
          'que a diferença entre as frações aparece de forma mais violenta.',
      ],
      quadro: [
        {
          rotulo: 'O que a calculadora é',
          texto:
            'Uma conta. Ela supõe que cada posição perdida vai a zero e que a fração é ' +
            'recalculada sobre o capital que sobrou. Não inclui taxas nem ganhos no meio da ' +
            'sequência.',
        },
        {
          rotulo: 'O que ela não é',
          texto:
            'Uma previsão de quantas perdas você vai ter, e uma recomendação de fração. Os dois ' +
            'controles são seus; o hub não preenche nenhum dos dois por você.',
          destaque: true,
        },
      ],
      exemplo: {
        titulo: 'Um exemplo resolvido: 10% por posição, 5 perdas seguidas',
        passos: [
          'Fração de 10% e uma perda total: sobram 90% do capital. Até aqui, nada assustador.',
          'Cinco perdas seguidas: 0,9 × 0,9 × 0,9 × 0,9 × 0,9 = 0,59. Sobram cerca de 59%.',
          'Por que não 50%? Porque 50% seria o resultado se cada perda fosse calculada sobre o capital inicial. Ela é recalculada sobre o que sobrou.',
          'Para voltar ao começo, é preciso ganhar 69% sobre esse capital que restou.',
          'Leia os dois números juntos: perdi 5 vezes uma fatia pequena, e agora preciso de um ganho grande para empatar.',
        ],
      },
      paragrafosFinais: [
        'O erro que essa conta evita é o de somar porcentagens de cabeça. Perder 10% cinco vezes ' +
          'parece perder 50%, e não é: a sequência é multiplicativa, não somada. O engano costuma ' +
          'ser confortável quando se olha só as perdas — sobra mais do que se imaginava — e ' +
          'desconfortável quando se olha a volta, porque o ganho necessário cresce mais depressa ' +
          'do que a intuição acompanha.',
        'O que fazer com esse número é decisão sua. A calculadora mostra o custo aritmético de ' +
          'uma sequência ruim para cada fração; escolher com qual custo você consegue conviver ' +
          'não é uma conta, é uma escolha sobre a sua vida.',
      ],
    },
    {
      id: 'ruina',
      aba: 'tamanho',
      titulo: 'A ruína do apostador: sobreviver vem primeiro',
      emUmaFrase:
        'Com uma desvantagem pequena repetida muitas vezes, quebrar é quase certo. Aí a ' +
        'pergunta muda.',
      // Grade de 100: 99,5% arredonda para 100, então são 100 quadrados vermelhos e
      // nenhum escuro — a legenda diz o número exato.
      grade: {
        frase: 'Na roleta americana, apostando sempre no par: de cada 100 tentativas',
        grupos: [
          {
            quantidade: 100,
            cor: 'ruim',
            exibicao: '99,5%',
            rotulo: 'quebram (18 chances de ganhar em 38, começando com 50 fichas e parando só em 100)',
          },
          {
            quantidade: 0,
            cor: 'resto',
            exibicao: '',
            rotulo: 'menos de 1 em 100 chega a 100 fichas — e é por isso que não há quadrado escuro na grade',
          },
        ],
        fonte:
          'Ruína do apostador (Feller). Número exato: 99,5% — a grade desenha 100 quadrados, e ' +
          'por isso o arredondamento aparece.',
        descricao:
          'De cada 100 tentativas, cerca de 99 ou 100 quebram antes de chegar a 100 fichas: a ' +
          'chance de quebrar é de 99,5%. Começando com 50 fichas e parando só em 100.',
      },
      comparacao: {
        descricao:
          'Em memecoin, a pergunta sai de quanto cresce e entra quanto aguento perder sem ser ' +
          'eliminado.',
        cartoes: [
          {
            tom: 'neutro',
            rotulo: 'Sai a pergunta',
            frase: '"Quanto cresce?"',
            nota: 'A matemática do crescimento não funciona quando a média pode não existir.',
          },
          {
            tom: 'acento',
            rotulo: 'Entra a pergunta',
            frase: '"Quanto aguento perder sem ser eliminado?"',
            nota:
              'Daí a regra que sobra com fundamento: o tamanho de cada posição é um valor que ' +
              'você pode perder inteiro.',
          },
        ],
      },
      paragrafos: [
        'A ruína do apostador é um resultado clássico de probabilidade. Ele descreve alguém que ' +
          'aposta repetidamente com uma desvantagem pequena e só para em dois casos: quando ' +
          'quebra ou quando chega a um alvo. A conclusão é dura: se as apostas se repetem, ' +
          'quebrar antes de chegar ao alvo é quase certo, mesmo com a desvantagem sendo pequena ' +
          'em cada rodada.',
        'A grade acima mostra o caso da roleta americana, apostando sempre no par: são 18 chances ' +
          'de ganhar em 38, começando com 50 fichas e parando só em 100. De cada 100 tentativas, ' +
          'a chance de quebrar é de 99,5%. Por isso a grade está inteira vermelha: são 100 ' +
          'quadrados para representar 99,5%, e o arredondamento come o único quadrado que ' +
          'sobraria. Menos de 1 em 100 chega às 100 fichas.',
        'Isso importa porque, em cada rodada isolada, a desvantagem parece quase nada — 18 em 38 ' +
          'está pertinho da metade. A intuição olha uma rodada e conclui que dá para brigar; a ' +
          'conta olha a repetição e conclui que não. Repetição é o ingrediente que a intuição não ' +
          'consegue processar, e é exatamente o ingrediente que existe em qualquer rotina de ' +
          'operações.',
        'A consequência prática está nos dois cartões: a pergunta muda. Sai "quanto cresce", que ' +
          'é a pergunta que a matemática do crescimento não consegue responder quando a média ' +
          'pode nem existir, e entra "quanto aguento perder sem ser eliminado". Dessa troca sobra ' +
          'uma única regra com fundamento, e ela é modesta de propósito: o tamanho de cada ' +
          'posição é um valor que você pode perder inteiro. Quanto é esse valor, só você sabe — ' +
          'depende da sua vida, não do mercado.',
      ],
      quadro: [
        {
          rotulo: 'Conta',
          texto:
            'Os 99,5% da roleta. É probabilidade calculada a partir das regras do jogo (ruína do ' +
            'apostador, Feller), não uma medição de jogadores reais.',
        },
        {
          rotulo: 'Medição',
          texto:
            'Os 68,67% do Pump.fun. É contagem de tokens que existiram, feita sobre dados ' +
            'on-chain (CoinGecko Research).',
          destaque: true,
        },
      ],
      paragrafosFinais: [
        'Perder inteiro não é o caso extremo, é o caso comum: 68,67% dos tokens da plataforma de ' +
          'lançamento Pump.fun pararam de negociar no mesmo dia em que nasceram. Ou seja, a ' +
          'hipótese "esta posição pode valer zero" não é uma precaução exagerada que se coloca no ' +
          'papel para parecer prudente. É o desfecho mais frequente que já foi contado.',
        'O erro que essa ideia evita é raciocinar por rodada em vez de por sequência. Quem pensa ' +
          'por rodada acha que basta estar um pouco certo mais vezes do que errado; quem pensa ' +
          'por sequência percebe que ser eliminado encerra o jogo antes de qualquer média ' +
          'aparecer. Sobreviver não é uma virtude moral aqui: é a condição para que qualquer ' +
          'outra coisa neste módulo faça sentido.',
      ],
    },

    // ================================ DIÁRIO =================================
    {
      id: 'duas-frases',
      aba: 'diario',
      titulo: 'O que o diário faz, e o que não faz',
      emUmaFrase:
        'O diário ajuda você a seguir a sua regra. Ninguém mediu se ele faz ganhar dinheiro.',
      comparacao: {
        descricao:
          'Tem lastro: o registro ajuda você a seguir a sua própria regra — monitorar o ' +
          'progresso aumentou o cumprimento de metas de comportamento. Não tem lastro: o ' +
          'registro faz você ganhar dinheiro — nenhum estudo revisado por pares mediu isso.',
        cartoes: [
          {
            tom: 'bom',
            rotulo: 'Tem lastro',
            frase: '"O registro ajuda você a seguir a sua própria regra."',
            nota:
              'Monitorar o progresso aumentou o cumprimento de metas de comportamento: perder ' +
              'peso, parar de fumar, tomar remédio.',
          },
          {
            tom: 'ruim',
            rotulo: 'Não tem lastro',
            frase: '"O registro faz você ganhar dinheiro."',
            nota: 'Nenhum estudo revisado por pares mediu isso.',
          },
        ],
      },
      // Grade de 100: d = 0,40 dá 61 chances em 100 (sem efeito, seriam 50).
      grade: {
        frase: 'Quanto é um efeito de 0,40, em chances',
        grupos: [
          { quantidade: 61, cor: 'modelo', rotulo: 'de cada 100 sorteios, quem monitorou cumpriu mais a meta' },
          { quantidade: 39, cor: 'resto', rotulo: 'restantes' },
          { tracejado: true, rotulo: 'sem efeito nenhum, seriam 50' },
        ],
        fonte:
          'd = 0,40 — meta-análise de 138 experimentos com 19.951 pessoas (Harkin et al., 2016). ' +
          'Na régua usual, 0,2 é pequeno, 0,5 é médio e 0,8 é grande: 0,40 é de pequeno a médio.',
        descricao:
          'Sorteando uma pessoa que monitorou e uma que não monitorou, há 61 chances em 100 de a ' +
          'que monitorou ter cumprido mais a meta. Se não houvesse efeito nenhum, seriam 50 em 100.',
      },
      paragrafos: [
        'Um diário de operações é um registro escrito do que você decidiu, feito antes de saber ' +
          'como termina. Ele não é um relatório de lucro e não é um caderno de anotações sobre o ' +
          'mercado. É um registro de decisões suas, com data, para você comparar depois com o que ' +
          'de fato aconteceu.',
        'Os dois cartões acima separam o que tem lastro do que não tem, e a separação é ' +
          'importante porque os dois são vendidos juntos por aí. Tem lastro: o registro ajuda ' +
          'você a seguir a sua própria regra. Não tem lastro: o registro faz você ganhar ' +
          'dinheiro. Nenhum estudo revisado por pares mediu diário de operações levando a retorno ' +
          '— nenhum, nem a favor, nem contra.',
        'O que existe medido vem de outro lugar: uma meta-análise, que é um estudo que junta os ' +
          'resultados de muitos experimentos e calcula um efeito comum. Essa juntou 138 ' +
          'experimentos com 19.951 pessoas e achou um efeito de d = 0,40 de monitorar o progresso ' +
          'sobre cumprir metas de comportamento — perder peso, parar de fumar, tomar remédio na ' +
          'hora. O "d" é uma régua de tamanho de efeito: na convenção usual, 0,2 é pequeno, 0,5 é ' +
          'médio e 0,8 é grande. Então 0,40 é de pequeno a médio. Não é um efeito espetacular, e ' +
          'é honesto dizer isso.',
        'A grade acima traduz esse 0,40 para uma linguagem que dá para sentir. Sorteando uma ' +
          'pessoa que monitorou e uma que não monitorou, há 61 chances em 100 de a que monitorou ' +
          'ter cumprido mais a meta. Se não houvesse efeito nenhum, seriam 50 em 100 — é o que a ' +
          'linha tracejada marca. A distância entre 61 e 50 é o tamanho real do que se está ' +
          'prometendo aqui: uma ajuda, não uma virada.',
      ],
      exemplo: {
        titulo: 'Como o efeito vira decisão de formato',
        passos: [
          'O efeito foi maior quando o registro era escrito de verdade, e não conferido de cabeça.',
          'E foi maior também quando o resultado era mostrado a alguém.',
          'Daí sai uma consequência prática de formato: escrever, mesmo que ninguém leia, vale mais do que repassar mentalmente.',
          'E daí sai o limite honesto: isso foi medido em metas de saúde e comportamento, não em operações.',
        ],
      },
      paragrafosFinais: [
        'O erro que essa distinção evita é o mais caro do módulo: achar que o diário conserta a ' +
          'regra. Ele não conserta. Se a regra for ruim, o diário ajuda você a seguir uma regra ' +
          'ruim com mais fidelidade — e você vai executá-la melhor, com mais constância, perdendo ' +
          'com mais método. O diário mede aderência; a qualidade da regra é outro problema, e a ' +
          'aba A revisão mostra por que ele é tão difícil de resolver.',
        'Isso também é a sua defesa contra o discurso de venda. Quando alguém disser que manter ' +
          'diário melhora o desempenho em X%, você já sabe onde procurar: existe um efeito ' +
          'medido, ele é sobre cumprir metas de comportamento, e o caminho de diário até retorno ' +
          'nunca foi medido por ninguém.',
      ],
      detalhe: {
        titulo: 'a fonte, e a ponte que ela não atravessa',
        paragrafos: [
          'A meta-análise é Harkin et al. (2016), publicada no Psychological Bulletin: 138 ' +
            'experimentos, 19.951 pessoas, efeito d = 0,40.',
          'Toda a evidência de que monitorar ajuda vem de metas de saúde e comportamento. Levar ' +
            'isso para operações é uma inferência razoável, não um fato medido — e é assim que ' +
            'este módulo trata o assunto do começo ao fim.',
        ],
      },
    },
    {
      // O diário EM BRANCO: nove campos vazios. O campo 7 (a saída executada) é o
      // que amarra tudo e fica em destaque.
      id: 'nove-campos',
      aba: 'diario',
      titulo: 'O diário, campo a campo',
      etiqueta: 'em branco: você escreve',
      emUmaFrase:
        'Oito campos anotam o que você fez. Só um anota quanto ganhou ou perdeu. A peça que ' +
        'amarra tudo é o campo 7.',
      campos: [
        {
          titulo: 'A regra, escrita antes da entrada',
          tipo: 'Comportamento',
          porque: 'Sem ela, não dá para separar decisão de resultado.',
          placeholder: 'Cole aqui a regra que você escreveu antes',
        },
        {
          titulo: 'Data e hora, token e tamanho em % do capital',
          tipo: 'Comportamento',
          porque: 'O tamanho é parte da regra, não do resultado.',
          placeholder: 'Data, hora, token e % do capital',
        },
        {
          titulo: 'Preço de entrada, saída por perda programada e alvo',
          tipo: 'Comportamento',
          porque: 'O plano de saída, registrado antes de saber como termina.',
          placeholder: 'Entrada, saída por perda e alvo',
        },
        {
          titulo: 'A tese, em uma frase',
          tipo: 'Comportamento',
          porque: 'Congela a narrativa antes do resultado (a ficha do Módulo 4).',
          placeholder: 'Uma frase, escrita antes',
        },
        {
          titulo: 'Convicção, numa escala fixa de 1 a 5',
          tipo: 'Comportamento',
          porque: 'Deixa ver depois se convicção alta acerta mais — ou só aposta mais.',
          placeholder: 'De 1 a 5',
        },
        {
          titulo: 'Estado emocional na entrada',
          tipo: 'Comportamento',
          porque: 'Pressa, medo de ficar de fora, vontade de recuperar uma perda.',
          placeholder: 'Como você estava na hora de clicar',
        },
        {
          titulo: 'Saída executada: hora, preço e o que disparou',
          tipo: 'Comportamento',
          porque: 'Stop, alvo, tempo ou decisão na hora. É o que torna o campo 8 verificável.',
          placeholder: 'Hora, preço e o que disparou a saída',
          destaque: true,
        },
        {
          titulo: 'Segui a regra?',
          tipo: 'Comportamento',
          porque: 'Sai da comparação entre os campos 1 e 3 e o campo 7 — não da memória.',
          placeholder: 'Sim ou não, comparando os campos 1, 3 e 7',
        },
        {
          titulo: 'Resultado em dinheiro',
          tipo: 'Resultado',
          porque: 'O único campo de resultado. Olhe pouco (aba A revisão).',
          placeholder: 'Quanto entrou ou saiu',
        },
      ],
      rodape:
        'Sem o campo 7 anotado, "segui a regra?" vira lembrança. E lembrança é o que os vieses ' +
        'corrompem. Nada digitado aqui é salvo: o diário é seu, e mora fora do hub.',
      paragrafos: [
        'O formulário acima é o diário inteiro: nove campos, em branco, para você copiar no seu ' +
          'caderno. A proporção entre eles é a mensagem principal. Oito campos registram ' +
          'comportamento — o que você decidiu, quando, com quanto, por quê e como estava se ' +
          'sentindo. Um único campo, o nono, registra resultado em dinheiro. Um diário com essa ' +
          'proporção invertida é um extrato, não um diário.',
        'Os campos se dividem em dois momentos, e essa divisão é o que dá valor a eles. Os campos ' +
          '1 a 6 são escritos antes de você saber como termina: a regra, os dados da entrada, o ' +
          'plano de saída, a tese em uma frase, a convicção numa escala fixa de 1 a 5 e o seu ' +
          'estado emocional na hora de clicar. Depois vêm o campo 7, a saída executada, e só ' +
          'então os campos 8 e 9. Escrever os seis primeiros depois do resultado não é atraso: é ' +
          'perder o dado, porque a memória já reescreveu a história.',
        'O campo 7 está em destaque por um motivo mecânico. Ele anota a hora, o preço e o que ' +
          'disparou a saída — stop, alvo, tempo ou decisão na hora. Sem ele, o campo 8, "segui a ' +
          'regra?", vira lembrança, e lembrança é exatamente o que os vieses corrompem. Com ele, ' +
          'a resposta do campo 8 sai de uma comparação entre textos: o que estava escrito nos ' +
          'campos 1 e 3 contra o que está registrado no campo 7.',
        'Dois campos parecem opcionais e não são. A convicção de 1 a 5 só vira informação depois ' +
          'de muitas operações, quando dá para olhar para trás e perguntar se convicção alta ' +
          'acertou mais ou se ela só fez você apostar mais — são coisas diferentes, e sem a ' +
          'escala anotada não dá para distinguir. O estado emocional na entrada serve para o ' +
          'mesmo tipo de pergunta: pressa, medo de ficar de fora e vontade de recuperar uma perda ' +
          'deixam rastro no diário muito antes de deixarem rastro no saldo.',
      ],
      exemplo: {
        titulo: 'Como o campo 8 é respondido sem usar a memória',
        passos: [
          'Campo 1: a regra que você colou antes da entrada.',
          'Campo 3: o preço de entrada, a saída por perda programada e o alvo, escritos antes de saber o desfecho.',
          'Campo 7: a hora, o preço e o que disparou a saída de verdade.',
          'Campo 8: compare 1 e 3 com 7. Se bate, foi sim. Se não bate, foi não — e o não é o registro mais útil do diário.',
          'Só depois disso o campo 9, o resultado em dinheiro, é preenchido. Ele não muda a resposta do campo 8.',
        ],
      },
      paragrafosFinais: [
        'O erro que esse formato evita é o diário que só anota resultado. Ele parece objetivo, ' +
          'porque só tem número, e é justamente o menos informativo: o resultado de uma operação ' +
          'isolada é quase todo sorte, e um caderno cheio de resultados não permite responder a ' +
          'única pergunta que a revisão sabe responder, que é se você fez o que tinha escrito.',
        'Nada digitado nesta tela é salvo. O diário é seu e mora fora do hub — no caderno, na ' +
          'planilha, onde você quiser. O que o hub faz aqui é mostrar quais campos deixam a ' +
          'revisão possível.',
      ],
    },

    // =============================== REVISÃO =================================
    {
      id: 'olhar-pouco',
      aba: 'revisao',
      titulo: 'Olhe o resultado pouco, e o comportamento muito',
      emUmaFrase:
        'Olhar o dinheiro toda hora piora a decisão. Revisar se você seguiu a regra é outra ' +
        'coisa, e ajuda.',
      comparacao: {
        descricao:
          'Olhar o dinheiro com frequência piora a decisão — foi isso que os experimentos ' +
          'mediram. Revisar o comportamento, conferindo se você seguiu a regra, é o que o lastro ' +
          'do diário apoia.',
        cartoes: [
          {
            tom: 'ruim',
            rotulo: 'Olhar o dinheiro',
            frase: 'Com frequência, piora a decisão.',
            nota:
              'Aversão míope à perda: de tanto olhar de perto, cada perda pesa mais. E as ' +
              'pessoas preferem olhar com frequência, mesmo sendo prejudicadas.',
          },
          {
            tom: 'bom',
            rotulo: 'Revisar o comportamento',
            frase: 'Conferir se você seguiu a regra.',
            nota: 'É isso que o lastro do diário apoia.',
          },
        ],
      },
      paragrafos: [
        'Existem duas revisões diferentes, e o módulo trata elas de formas opostas. Uma é olhar o ' +
          'resultado em dinheiro: quanto estou ganhando ou perdendo agora. A outra é revisar o ' +
          'comportamento: eu fiz o que estava escrito? Parecem a mesma atividade porque acontecem ' +
          'no mesmo caderno, e não são.',
        'Olhar o dinheiro com frequência piora a decisão sob risco — foi isso que os experimentos ' +
          'mediram. O nome do efeito é aversão míope à perda. "Míope" aqui é literal: de tanto ' +
          'olhar de perto, cada perda isolada ocupa o campo de visão inteiro e pesa mais do que ' +
          'deveria numa sequência longa. Tem um detalhe que incomoda: as pessoas preferem olhar ' +
          'com frequência, mesmo quando isso as prejudica. Ou seja, a vontade de conferir não é ' +
          'um sinal de que conferir ajuda.',
        'A revisão do comportamento é a que tem lastro, e ela usa uma pergunta específica. Não ' +
          'pergunte se o resultado foi bom: essa pergunta convida os cinco vieses do desenho, ' +
          'porque ela já começa com o desfecho na mão. Pergunte se a decisão foi boa, dado o que ' +
          'você sabia antes. Essa segunda pergunta é desconfortável e tem uma vantagem enorme: ' +
          'ela só se responde com o diário aberto, e não de memória.',
        'Vale ler os cinco vieses do desenho sabendo que eles não são defeitos de caráter, são o ' +
          'funcionamento normal da cabeça. A retrospectiva faz parecer que você sabia; a ' +
          'autoatribuição guarda o ganho como habilidade e a perda como azar, e é daí que sai o ' +
          'excesso de confiança; o viés de resultado julga a decisão pelo desfecho; a ilusão de ' +
          'controle faz achar que você influencia o que é sorte; e o padrão no ruído faz ver ' +
          'sequência onde há acaso — num histórico curto de cauda pesada, quase todo padrão é ' +
          'ruído.',
        'Sobre a frequência, a resposta honesta é que ninguém mediu. Qual a cadência ideal de ' +
          'revisão para quem opera? Não existe número publicado. Semanal é uma escolha razoável ' +
          'para começar; trate como um teste seu, não como verdade — e anote a data, para poder ' +
          'rever a escolha depois como se fosse qualquer outra parte da regra.',
      ],
      // A figura "A pergunta da revisão", dentro do mesmo card.
      aPergunta: {
        titulo: 'A pergunta da revisão',
        comparacao: {
          descricao:
            'Não pergunte se o resultado foi bom: isso convida os vieses. Pergunte se a decisão ' +
            'foi boa, dado o que você sabia antes — e isso só se responde com o diário.',
          cartoes: [
            {
              tom: 'ruim',
              rotulo: 'Não pergunte',
              frase: '"O resultado foi bom?"',
              nota: 'Essa pergunta convida os cinco vieses abaixo.',
            },
            {
              tom: 'acento',
              rotulo: 'Pergunte',
              frase: '"A decisão foi boa, dado o que eu sabia antes?"',
              nota: 'Essa só se responde com o diário.',
            },
          ],
        },
        vieses: [
          { nome: 'Retrospectiva', texto: '"eu sabia que ia acontecer".' },
          { nome: 'Autoatribuição', texto: 'ganho é habilidade, perda é azar. Isso gera excesso de confiança.' },
          { nome: 'Viés de resultado', texto: 'julgar a decisão pelo desfecho.' },
          { nome: 'Ilusão de controle', texto: 'achar que influencia o que é sorte.' },
          {
            nome: 'Padrão no ruído',
            texto: 'ver sequência onde há acaso. Num histórico curto de cauda pesada, quase todo padrão é ruído.',
          },
        ],
      },
      exemplo: {
        titulo: 'Uma revisão que olha o comportamento, na ordem',
        passos: [
          'Abra as operações da semana e leia primeiro os campos 1 e 3: o que estava escrito antes.',
          'Leia o campo 7: o que de fato foi executado, com hora e preço.',
          'Responda o campo 8 comparando os dois. Conte quantos sim e quantos não.',
          'Só no fim, olhe o campo 9, o resultado em dinheiro — e olhe uma vez.',
          'A conversa da revisão é sobre a coluna dos "não", não sobre o saldo.',
        ],
      },
      paragrafosFinais: [
        'O erro que essa ordem evita é o viés de resultado disfarçado de autocrítica: abrir a ' +
          'revisão pelo saldo, ver vermelho e concluir que a regra está errada; ver verde e ' +
          'concluir que está certa. Nos dois casos a conclusão veio do desfecho, que em cauda ' +
          'pesada é quase todo sorte no curto prazo. Começar pelos campos escritos antes não é ' +
          'preciosismo: é a única ordem em que a pergunta certa ainda cabe.',
      ],
      detalhe: {
        titulo: 'de onde vem a aversão míope à perda',
        paragrafos: [
          'Os experimentos são de Gneezy, Kapteyn & Potters (2003) e Fellner & Sutter (2009), ' +
            'ambos publicados em revistas revisadas por pares.',
          'Eles mediram decisão sob risco em ambiente de experimento, com a frequência de ' +
            'informação sendo manipulada. Nenhum deles mediu a cadência ideal de revisão para ' +
            'quem opera memecoin — esse número não existe, e o hub não vai inventar um.',
        ],
      },
    },
    {
      id: 'amostra',
      aba: 'revisao',
      titulo: 'Quantas operações provam alguma coisa',
      emUmaFrase:
        '30 operações boas não provam habilidade. No melhor caso seriam centenas, e em cauda ' +
        'pesada talvez nenhum número baste.',
      // As três barras na mesma escala (0 a 1.600). São CONTAS, não medições:
      // n ≈ (2 ÷ SR)², de Lo (2002). O 30 é o exemplo da pergunta 6 do quiz.
      barras: {
        titulo: 'A conta no melhor caso: n ≈ (2 ÷ SR)²',
        maximo: 1600,
        itens: [
          {
            rotulo: 'Você fez',
            valorTexto: '30 operações',
            valor: 30,
            tom: 'neutro',
            nota: 'Não prova nada: 20 lucros em 30 cabem perfeitamente na sorte.',
          },
          {
            rotulo: 'SR de 0,1 por operação — um número bom',
            valorTexto: '(2 ÷ 0,1)² = 400',
            valor: 400,
            tom: 'primaria',
            nota: 'Operações para o resultado se distinguir de zero.',
          },
          {
            rotulo: 'SR de 0,05 por operação',
            valorTexto: '(2 ÷ 0,05)² = 1.600',
            valor: 1600,
            tom: 'acento',
            nota: 'Metade do SR, quatro vezes a amostra: a conta é quadrática.',
          },
        ],
        legenda:
          'Mesma escala, de 0 a 1.600 operações. SR é o retorno médio por operação dividido pelo ' +
          'desvio-padrão. A conta é de Lo (2002) e vale só com variância finita.',
        descricao:
          'Na mesma escala, de 0 a 1.600 operações: você fez 30, que não provam nada. Com SR de ' +
          '0,1 por operação seriam 400 operações. Com SR de 0,05, 1.600.',
      },
      paragrafos: [
        'Esta seção responde a pergunta que toda revisão acaba fazendo: a partir de quantas ' +
          'operações dá para dizer que o resultado veio da regra, e não da sorte? A resposta tem ' +
          'uma fórmula, e ela é desanimadora de propósito.',
        'Primeiro, o que é SR. É o Sharpe por operação: o retorno médio por operação dividido ' +
          'pelo desvio-padrão desses retornos. Desvio-padrão é uma medida de quanto os resultados ' +
          'variam em torno da média — quanto maior, mais bagunçada é a série. Então o SR pergunta ' +
          'o seguinte: o ganho médio é grande comparado com o tamanho normal das oscilações? Um ' +
          'SR pequeno significa que a vantagem, se existir, está enterrada no ruído.',
        'A conta é n ≈ (2 ÷ SR)², e as três barras acima estão na mesma escala, de 0 a 1.600 ' +
          'operações, para dar para comparar de olho. Com SR de 0,1 por operação, que já é um ' +
          'número bom, seriam necessárias 400 operações para o resultado se distinguir de zero. ' +
          'Com SR de 0,05, metade do anterior, seriam 1.600 — quatro vezes mais, porque a conta é ' +
          'quadrática: o SR entra elevado ao quadrado, então cortar o SR pela metade multiplica a ' +
          'amostra por quatro.',
        'A primeira barra é a sua: 30 operações. Ela quase não aparece ao lado das outras duas, e ' +
          'é esse o recado. Vinte lucros em 30 operações cabem perfeitamente na sorte — não é que ' +
          'seja provável que tenha sido sorte, é que esse resultado não permite separar as duas ' +
          'coisas. E tem um agravante que a barra não mostra: taxa de acerto sozinha não diz nada ' +
          'sem o tamanho dos ganhos e das perdas.',
      ],
      quadro: [
        {
          rotulo: 'Conta, não medição',
          texto:
            'Os 400 e os 1.600 saem da fórmula de Lo (2002), aplicada a dois valores de SR ' +
            'escolhidos como exemplo. Ninguém mediu o SR de ninguém aqui.',
        },
        {
          rotulo: 'E a conta tem uma condição',
          texto:
            'Ela vale só com variância finita, isto é, num mundo em que as oscilações têm um ' +
            'tamanho típico. Em memecoin essa condição é justamente a que está em dúvida.',
          destaque: true,
        },
      ],
      paragrafosFinais: [
        'Em cauda pesada, a média converge muito mais devagar, então até esses números seriam ' +
          'otimistas. E se a média nem existir, nenhum número de operações distingue habilidade ' +
          'de sorte pela média — não é uma questão de juntar mais dados, é que o alvo não fica ' +
          'parado. Vale repetir a ressalva: ninguém publicou o índice de cauda das memecoins, ' +
          'então isso é uma premissa herdada de estudos de cripto, não uma medição feita aqui.',
        'Tem ainda um agravante que não é sobre o tamanho da amostra: testar várias versões da ' +
          'própria regra e ficar com a que "funcionou" infla o resultado. Com só três tentativas ' +
          'independentes, a melhor já é provavelmente falsa. Isso acontece porque, quanto mais ' +
          'versões você experimenta, maior a chance de uma delas parecer boa só por acaso — e é ' +
          'exatamente a que parece boa que você escolhe guardar.',
        'O erro que essa seção evita é o de promover a própria sorte a habilidade, e é um erro ' +
          'simpático: ele chega depois de uma sequência boa, junto com a sensação de que ' +
          'finalmente entendi o jogo. A conclusão prática é modesta e vale para o módulo inteiro: ' +
          'o diário serve para saber se você seguiu a regra, não para provar que ela ganha.',
      ],
      detalhe: {
        titulo: 'quando nenhum número de operações basta',
        paragrafos: [
          'A conta n ≈ (2 ÷ SR)² é de Lo (2002), "The Statistics of Sharpe Ratios". O resultado ' +
            'sobre escolher a melhor entre poucas tentativas é de Bailey & López de Prado (2021).',
          'O caso extremo tem nome técnico: com cauda pesada demais (α ≤ 1), a média da amostra ' +
            'nunca se estabiliza. O α é o índice de cauda — quanto menor ele é, mais pesada é a ' +
            'cauda. Abaixo desse limite, juntar mais operações não faz a média assentar, e por ' +
            'isso o número de operações que bastaria é: nenhum.',
        ],
      },
    },

    // ================================ MITOS ==================================
    {
      id: 'mitos',
      aba: 'mitos',
      titulo: 'O que dizem × o que a evidência mostra',
      emUmaFrase:
        'Número preciso, nome de universidade e prazo curto: é o formato da estatística que ' +
        'vende curso e ferramenta.',
      rotulos: { dizem: 'O que dizem', fonte: 'Tem fonte?', evidencia: 'O que a evidência mostra' },
      // Cada número que circula: o que dizem (`titulo`), se tem fonte e o dado real.
      itens: [
        {
          titulo: '"Quem mantém diário melhora 23% o desempenho mensal em 60 dias"',
          fonte: 'Não. Número de blog de plataforma, sem estudo, autor ou método.',
          real: 'Nenhum estudo revisado por pares mede diário → retorno.',
        },
        {
          titulo: '"Estudo da Universidade da Califórnia: registro sistemático dá 73% de resultados melhores"',
          fonte: 'Distorção de dois estudos reais.',
          real:
            'O estudo real (Barber & Odean, 2000) mostra que quem mais opera ganha menos. O "73" ' +
            'é a diferença diária, em centésimos de ponto, entre os melhores e os piores day ' +
            'traders de Taiwan — sem relação com diário.',
        },
        {
          titulo: '"Diário reduz o drawdown máximo em 25% a 30%"',
          fonte: 'Não localizável.',
          real: 'Sem amostra e sem método publicados.',
        },
        {
          titulo: '"90% dos traders perdem 90% do dinheiro em 90 dias"',
          fonte: 'Folclore: não existe um número oficial único.',
          real: 'Na Europa, 74% a 89% das contas de varejo em CFD perdem dinheiro (ESMA, 2018).',
        },
        {
          titulo: '"95% dos traders falham"',
          fonte: 'Não. Número redondo que muda de blog para blog.',
          real: 'Na B3, 97% dos day traders que persistiram mais de 300 dias perderam dinheiro.',
        },
        {
          titulo: '"Com prática, você fica lucrativo"',
          fonte: 'Não sustentado.',
          real:
            'Traders aprendem devagar e de forma custosa, e os menos hábeis "aprendem" saindo do ' +
            'mercado. No estudo da B3, os autores não acharam evidência de aprendizado.',
        },
      ],
      paragrafos: [
        'A tabela acima tem três colunas de propósito: o que dizem, se tem fonte, e o que a ' +
          'evidência mostra. A coluna do meio é a que quase nunca aparece quando esses números ' +
          'circulam, e é a que decide tudo. Repare no formato repetido: um número preciso demais ' +
          '(23%, 73%, 95%), um prazo curto e redondo (60 dias, 90 dias) e, de vez em quando, um ' +
          'nome de instituição para dar peso. O formato é o produto.',
        'Dois termos em inglês aparecem nessa lista e merecem tradução. Drawdown é a maior queda ' +
          'do topo ao fundo do seu capital: a promessa de "reduzir o drawdown máximo em 25% a ' +
          '30%" está dizendo que o seu pior momento seria menos pior — só que sem amostra e sem ' +
          'método publicados, não dá nem para saber de onde essa comparação veio. CFD, o produto ' +
          'do dado europeu, é contrato por diferença: um contrato ligado ao preço de um ativo, em ' +
          'geral alavancado, em que você não tem o ativo. E day trade é comprar e vender no mesmo ' +
          'dia.',
        'O caso mais instrutivo da tabela é o do "estudo da Universidade da Califórnia", porque ' +
          'ele não é invenção pura: é distorção de dois estudos reais. Existe mesmo um estudo ' +
          'famoso de Berkeley, e ele mostra o quase oposto — quem mais opera ganha menos. E o ' +
          'número 73 existe mesmo, só que em outro estudo, sobre outra coisa, e sem nenhuma ' +
          'relação com diário. Distorção é mais difícil de detectar do que mentira, porque cada ' +
          'pedaço, sozinho, resiste a uma busca rápida.',
        'Isso importa porque esses números vão chegar até você — em anúncio, em vídeo, em curso — ' +
          'e quase sempre no momento em que você está mais disposto a acreditar. Ter lido a ' +
          'tabela uma vez não é para decorar os seis casos: é para reconhecer o formato quando o ' +
          'sétimo aparecer.',
      ],
      listaTitulo: 'As três perguntas que desmontam quase todos',
      lista: [
        'De onde vem o número? Um estudo com autor e método, ou um blog de plataforma que vende a ferramenta?',
        'Qual foi a amostra? Quantas pessoas, em que país, em que período?',
        'Comparado com quê? Um resultado sem grupo de comparação não é um resultado, é uma frase.',
      ],
      ordenada: true,
      exemplo: {
        titulo: 'Os números que sobrevivem às três perguntas',
        passos: [
          'Nos EUA: 66.465 contas, e quem mais operava teve 11,4% ao ano contra 17,9% do mercado (Barber & Odean, 2000).',
          'Em Taiwan: menos de 1% dos day traders ganha de forma previsível depois das taxas, com dados de 1992 a 2006.',
          'Na Europa: 74% a 89% das contas de varejo em CFD perdem dinheiro, segundo o regulador europeu (ESMA, 2018).',
          'No Brasil: entre 1.551 day traders da B3 que persistiram mais de 300 dias, 97% perderam dinheiro e só 1,1% ganhou mais que um salário mínimo.',
          'Nesse mesmo estudo brasileiro, os autores não acharam evidência de aprendizado — o que derruba o "com prática, você fica lucrativo".',
        ],
      },
      paragrafosFinais: [
        'O erro que essa seção evita tem duas caras, e a segunda é menos óbvia. A primeira é ' +
          'engolir o número bonito por causa do nome que vem junto. A segunda é o efeito rebote: ' +
          'descobrir que o "95% dos traders falham" é folclore e concluir que, então, nada disso ' +
          'vale e o pessimismo todo era exagero. Não é o caso. Os dados que existem de verdade, ' +
          'com amostra e método, apontam todos para o mesmo lado: a maioria de quem opera com ' +
          'frequência perde. O que muda não é a conclusão, é a qualidade da prova.',
      ],
      detalhe: {
        titulo: 'o que é cada fonte desta tabela',
        paragrafos: [
          'A B3 é a bolsa brasileira; a ESMA é o regulador de mercados da União Europeia, e a ' +
            'medida dela é de 23/03/2018, com perda média por cliente de € 1.600 a € 29.000.',
          'O dado brasileiro dos 97% é de Chague, De-Losso & Giovannetti, da FGV, e é um working ' +
            'paper: um artigo de trabalho, divulgado antes de passar pela revisão por pares. Vale ' +
            'saber disso — e, mesmo assim, é o dado brasileiro mais bem medido que existe sobre ' +
            'day trade, porque tem amostra identificada, período longo e método descrito.',
          'O "verdadeiro estudo da Califórnia" é Barber & Odean (2000), "Trading Is Hazardous to ' +
            'Your Wealth". O número 73 vem do estudo de day traders de Taiwan (Barber, Lee, Liu & ' +
            'Odean, 2014): é a diferença diária, em centésimos de ponto, entre os melhores e os ' +
            'piores — e não tem nada a ver com manter diário.',
          'Já os números sem fonte da tabela — o "23% em 60 dias" e o "drawdown 25% a 30%" — vêm ' +
            'de blogs de plataforma de diário, sem estudo, sem autor e sem método. Não é que ' +
            'sejam falsos: é que não há nada para conferir.',
        ],
      },
    },
  ],

  // ---------------------------------------------------------------------------
  // Destaques de cada aba (todos com fonte em `fontes`)
  // ---------------------------------------------------------------------------
  destaques: {
    regra: [
      {
        rotulo: 'Day traders da B3 que persistiram mais de 300 dias e perderam dinheiro',
        valor: '97%',
        nota: 'De 1.551. Só 1,1% ganhou mais que um salário mínimo. (Chague, De-Losso & Giovannetti, working paper da FGV)',
        tom: 'alerta',
      },
      {
        rotulo: 'Efeito de uma saída automática sobre segurar perdedoras',
        valor: 'Reduz',
        nota: 'Um lembrete para "considerar vender" não teve efeito (Fischbacher, Hoffmann & Schudy, 2017).',
        tom: 'ok',
      },
      {
        rotulo: 'Quem escreve a regra de entrada',
        valor: 'Você',
        nota: 'O módulo mostra a forma de uma regra testável. O conteúdo dela fica no papel antes do próximo token.',
      },
    ],
    tamanho: [
      {
        rotulo: 'Fração de Kelly numa aposta com 50% de chance de dobrar e 50% de perder tudo',
        valor: '0',
        nota: 'f* = (0,5 × 1 − 0,5) ÷ 1. A possibilidade de perda total domina a conta.',
      },
      {
        rotulo: 'Chance de quebrar com uma desvantagem pequena, repetida',
        valor: '99,5%',
        nota: 'Roleta, aposta no par: começando com 50 fichas e parando só em 100 (ruína do apostador, Feller).',
        tom: 'alerta',
      },
      {
        rotulo: 'Ganho necessário para recuperar uma perda de 50%',
        valor: '+100%',
        nota: 'Perder metade exige dobrar o que sobrou só para voltar ao ponto de partida.',
        tom: 'alerta',
      },
    ],
    diario: [
      {
        rotulo: 'Efeito de monitorar o progresso sobre cumprir metas',
        valor: 'd = 0,40',
        nota: 'Meta-análise de 138 experimentos com 19.951 pessoas (Harkin et al., 2016). Pequeno a médio.',
      },
      {
        rotulo: 'Chance de quem monitorou ter ido melhor que quem não monitorou',
        valor: '61%',
        nota: 'Contra 50% se não houvesse efeito.',
        tom: 'ok',
      },
      {
        rotulo: 'Estudos revisados por pares mostrando que diário dá lucro',
        valor: 'Nenhum',
        nota: 'O diário melhora a aderência à regra, não a qualidade da regra.',
        tom: 'alerta',
      },
    ],
    revisao: [
      {
        rotulo: 'Operações para distinguir habilidade de sorte, no melhor caso',
        valor: '400–1.600',
        nota: 'Com variância finita e Sharpe por operação entre 0,1 e 0,05: n ≈ (2 ÷ SR)² (Lo, 2002).',
      },
      {
        rotulo: 'Operações que bastam se a média do retorno não existir',
        valor: 'Nenhuma',
        nota: 'Com cauda pesada demais (α ≤ 1), a média da amostra nunca se estabiliza.',
        tom: 'alerta',
      },
      {
        rotulo: 'Versões testadas para a melhor já ser provavelmente falsa',
        valor: '3',
        nota: 'Escolher a melhor entre poucas tentativas infla o resultado (Bailey & López de Prado, 2021).',
        tom: 'alerta',
      },
    ],
    mitos: [
      {
        rotulo: 'Contas de varejo em CFD que perdem dinheiro, na Europa',
        valor: '74–89%',
        nota: 'Regulador europeu (ESMA, 2018), com perda média por cliente de € 1.600 a € 29.000.',
        tom: 'alerta',
      },
      {
        rotulo: 'Retorno anual de quem mais operava, contra o do mercado',
        valor: '11,4% × 17,9%',
        nota: '66.465 contas nos EUA (Barber & Odean, 2000) — o verdadeiro "estudo da Califórnia".',
        tom: 'alerta',
      },
      {
        rotulo: 'Day traders de Taiwan que ganham de forma previsível, depois das taxas',
        valor: 'Menos de 1%',
        nota: 'Barber, Lee, Liu & Odean (2014), dados de 1992 a 2006.',
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // Calculadora da sequência de perdas (card "Quanto sobra depois de uma
  // sequência de perdas totais"; a matemática mora em views/modulo7.js).
  // Os atalhos 10% e 25% são as duas frações do exemplo do arquivo: servem para
  // comparar, não são sugestão de fração.
  // ---------------------------------------------------------------------------
  calculadoraDeSequencia: {
    controles: [
      {
        id: 'fracao',
        rotulo: 'Fração do capital em cada posição',
        min: 1,
        max: 50,
        passo: 1,
        valor: 10,
        formatar: (n) => n + '%',
      },
      {
        id: 'perdas',
        rotulo: 'Posições seguidas que vão a zero',
        min: 1,
        max: 20,
        passo: 1,
        valor: 5,
        formatar: (n) => String(n),
      },
    ],
    atalhos: [
      { valor: 10, rotulo: '10% por posição' },
      { valor: 25, rotulo: '25% por posição' },
    ],
    rotuloDosAtalhos: 'Atalhos de comparação',
    nota:
      'Supõe que cada posição perdida vai a zero e que a fração é recalculada sobre o capital ' +
      'que sobrou. Não inclui taxas nem ganhos no meio da sequência.',
    rotuloDoResultado: 'O que sobra, e o que exige de volta',
    rotuloDaSobra: 'Sobra do capital',
    rotuloDoGanho: 'Ganho para voltar ao começo',
    legenda:
      'Cada barra é o capital depois de uma perda, da esquerda para a direita. A primeira é o ' +
      'capital inteiro. Fórmula: sobra = (1 − f) elevado a n.',
  },

  // ---------------------------------------------------------------------------
  // Quiz
  // ---------------------------------------------------------------------------
  // Por que cada alternativa errada do quiz não serve (o quiz mostra a da resposta escolhida).
  porqueErradas: {
    q1: {
      a: 'O "23% em 60 dias" vem de blog de plataforma, sem estudo, autor ou método.',
      c: 'Frequência não transforma registro em lucro. O que tem lastro é monitorar para cumprir a própria regra.',
      d: 'Monitorar ajuda a cumprir metas de comportamento (efeito de 0,40). Não há evidência de que atrapalhe.',
    },
    q2: {
      a: 'A fórmula é matemática e vale para qualquer ativo — desde que média e variância existam.',
      b: 'O problema não é apostar demais: com variância infinita, a fórmula nem produz número.',
      d: 'Não tem relação com regulação. É uma limitação da matemática.',
    },
    q3: {
      a: '50% seria se cada perda fosse sobre o capital inicial. A fração é recalculada sobre o que sobrou: 0,9 elevado a 5 ≈ 0,59.',
      c: '90% é o que sobra depois de uma perda só.',
      d: 'Com fração fixa, uma sequência finita de perdas nunca zera a banca: sempre sobra (1 − f) elevado a n.',
    },
    q4: {
      a: 'Foi o contrário: o lembrete não teve efeito, e só a ordem automática reduziu o hábito.',
      c: 'O experimento mediu o hábito de segurar perdedoras, não se o stop dá prejuízo.',
      d: 'A ordem automática mudou o comportamento; só o lembrete não mudou.',
    },
    q5: {
      a: 'Olhar o resultado com frequência piora a decisão sob risco (aversão míope à perda).',
      c: 'Revisar só quando perde é viés de resultado: julgar a decisão pelo desfecho.',
      d: 'Ninguém mediu uma cadência ideal. Sexta-feira é escolha sua, não evidência.',
    },
    q6: {
      a: 'Com retornos bem-comportados já seriam de 400 a 1.600 operações. Com cauda pesada, pode não haver número que baste.',
      c: 'Variar os tokens não resolve o tamanho da amostra nem a cauda pesada.',
      d: 'Lucro total positivo em 30 operações cabe perfeitamente na sorte.',
    },
    q7: {
      a: 'O nome da universidade é o que faz o número colar. O estudo real diz quase o contrário.',
      c: 'O problema não é o tamanho do número: é que ele não vem do estudo citado.',
      d: 'O estudo real é de ações nos EUA, mas o erro é outro: ele não fala de diário.',
    },
    q8: {
      a: 'É folclore: não existe um número oficial único por trás do "90-90-90".',
      c: 'Não: 97% dos que persistiram mais de 300 dias perderam dinheiro.',
      d: 'Existe, e é o de Chague, De-Losso & Giovannetti, da FGV.',
    },
  },

  quiz: [
    {
      id: 'q1',
      pergunta: 'Manter um diário de operações faz ganhar dinheiro?',
      alternativas: [
        { id: 'a', texto: 'Sim, estudos mostram 23% de melhora em 60 dias.' },
        { id: 'b', texto: 'Não foi medido. O que tem lastro é que monitorar ajuda a cumprir a própria regra.' },
        { id: 'c', texto: 'Sim, desde que seja feito todo dia.' },
        { id: 'd', texto: 'Não, e ainda atrapalha.' },
      ],
      correta: 'b',
      explicacao:
        'A meta-análise de Harkin (2016) mostra efeito de 0,40 sobre cumprir metas de ' +
        'comportamento. Nenhum estudo revisado por pares liga diário a retorno — o "23%" é de ' +
        'blog, sem fonte.',
    },
    {
      id: 'q2',
      pergunta: 'Por que o critério de Kelly (f* = μ ÷ σ²) não serve para dimensionar posições em memecoin?',
      alternativas: [
        { id: 'a', texto: 'Porque ele só funciona para ações.' },
        { id: 'b', texto: 'Porque ele manda apostar demais.' },
        { id: 'c', texto: 'Porque precisa de média e variância que existam, e em cauda muito pesada elas podem não existir.' },
        { id: 'd', texto: 'Porque é proibido pela CVM.' },
      ],
      correta: 'c',
      explicacao:
        'Com variância infinita, μ ÷ σ² não dá número nenhum; sem média, "crescimento esperado" ' +
        'nem faz sentido. O que a pesquisa garante é a direção: cauda mais pesada, fração menor.',
    },
    {
      id: 'q3',
      pergunta: 'Com 10% do capital em cada posição, 5 posições seguidas vão a zero. Quanto sobra?',
      alternativas: [
        { id: 'a', texto: '50%' },
        { id: 'b', texto: 'Cerca de 59%' },
        { id: 'c', texto: '90%' },
        { id: 'd', texto: 'Zero' },
      ],
      correta: 'b',
      explicacao:
        'A fração é recalculada sobre o que sobrou: 0,9 × 0,9 × 0,9 × 0,9 × 0,9 = 0,59. Para ' +
        'voltar ao começo, é preciso ganhar 69% sobre esse capital.',
    },
    {
      id: 'q4',
      pergunta: 'O que o experimento de Fischbacher, Hoffmann & Schudy mostrou sobre saídas?',
      alternativas: [
        { id: 'a', texto: 'Que lembretes para vender funcionam tão bem quanto ordens automáticas.' },
        { id: 'b', texto: 'Que a ordem de venda automática reduziu o hábito de segurar perdedoras; o lembrete não.' },
        { id: 'c', texto: 'Que stop-loss sempre dá prejuízo.' },
        { id: 'd', texto: 'Que nenhum dos dois muda o comportamento.' },
      ],
      correta: 'b',
      explicacao:
        'O que corrige o viés é a execução, não a intenção. Por isso a regra pede a saída já ' +
        'programada no momento da entrada.',
    },
    {
      id: 'q5',
      pergunta: 'Qual hábito de revisão tem apoio na pesquisa?',
      alternativas: [
        { id: 'a', texto: 'Olhar o saldo várias vezes por dia para reagir rápido.' },
        { id: 'b', texto: 'Revisar se seguiu a regra com frequência, e olhar o resultado em dinheiro com pouca frequência.' },
        { id: 'c', texto: 'Só revisar quando perder.' },
        { id: 'd', texto: 'Revisar exatamente toda sexta-feira, que é a cadência ideal medida.' },
      ],
      correta: 'b',
      explicacao:
        'Olhar o resultado com frequência piora a decisão sob risco (aversão míope à perda). ' +
        'Monitorar o comportamento é o que tem lastro. E a cadência ideal nunca foi medida.',
    },
    {
      id: 'q6',
      pergunta: 'Você fez 30 operações e 20 deram lucro. Isso prova que a sua regra funciona?',
      alternativas: [
        { id: 'a', texto: 'Sim, 67% de acerto é estatisticamente forte.' },
        { id: 'b', texto: 'Não: mesmo no melhor caso seriam necessárias centenas de operações, e com cauda pesada demais nenhum número basta.' },
        { id: 'c', texto: 'Sim, se as operações foram em tokens diferentes.' },
        { id: 'd', texto: 'Só se o lucro total for positivo.' },
      ],
      correta: 'b',
      explicacao:
        'Com retornos bem-comportados, n ≈ (2 ÷ SR)² dá de 400 a 1.600 operações. Em memecoin, ' +
        'onde a média pode nem existir, a amostra não resolve. Além disso, taxa de acerto não ' +
        'diz nada sem o tamanho dos ganhos e das perdas.',
    },
    {
      id: 'q7',
      pergunta: 'Um curso cita "estudo da Universidade da Califórnia: quem documenta as operações tem 73% de resultados melhores". O que dizer?',
      alternativas: [
        { id: 'a', texto: 'Que é uma fonte confiável, por ser universidade.' },
        { id: 'b', texto: 'Que é uma distorção: o estudo real mostra que quem mais opera ganha menos, e o "73" vem de outro estudo, sem relação com diário.' },
        { id: 'c', texto: 'Que o número é baixo demais.' },
        { id: 'd', texto: 'Que só vale para ações americanas.' },
      ],
      correta: 'b',
      explicacao:
        'Barber & Odean (2000): quem mais operava teve 11,4% ao ano, contra 17,9% do mercado. O ' +
        '73 é a diferença diária entre os melhores e os piores day traders de Taiwan.',
    },
    {
      id: 'q8',
      pergunta: 'Qual é o dado brasileiro mais bem medido sobre day trade?',
      alternativas: [
        { id: 'a', texto: '"90% perdem 90% em 90 dias".' },
        { id: 'b', texto: 'Entre os day traders da B3 que persistiram mais de 300 dias, 97% perderam dinheiro.' },
        { id: 'c', texto: 'Metade dos day traders da B3 lucra.' },
        { id: 'd', texto: 'Não existe dado brasileiro.' },
      ],
      correta: 'b',
      explicacao:
        'Chague, De-Losso & Giovannetti (FGV) acompanharam 1.551 pessoas que insistiram mais de ' +
        '300 dias: 97% perderam, só 1,1% ganhou mais que um salário mínimo, e não houve ' +
        'evidência de aprendizado.',
    },
  ],

  // ---------------------------------------------------------------------------
  // Itens que não fecharam em fonte confiável
  // ---------------------------------------------------------------------------
  naoVerificado: [
    {
      titulo: 'Originais atrás de paywall',
      texto:
        'Kelly (1956), Fischbacher, Hoffmann & Schudy (2017), Ashraf, Karlan & Yin (2006), ' +
        'Gollwitzer & Sheeran (2006) e os estudos de vieses foram confirmados por artigos ' +
        'revisados por pares que os citam, não pelos textos originais.',
    },
    {
      titulo: 'Índice de cauda das memecoins',
      texto:
        'Nenhum foi publicado. A premissa de cauda muito pesada vem de estudos sobre ' +
        'estratégias em cripto (Grobys & Shahzad, 2025), não de uma medição em memecoin.',
    },
    {
      titulo: 'Diário e trading',
      texto:
        'Toda a evidência de que monitorar ajuda vem de metas de saúde e comportamento. Levar ' +
        'isso para operações é uma inferência razoável, não um fato medido.',
    },
  ],

  // ---------------------------------------------------------------------------
  // Fontes
  // ---------------------------------------------------------------------------
  fontes: [
    { titulo: 'Harkin et al., "Does Monitoring Goal Progress Promote Goal Attainment?", Psychological Bulletin 142(2) (2016), DOI 10.1037/bul0000025', url: 'https://eprints.whiterose.ac.uk/id/eprint/87431/', consultadoEm: '12/09/2026' },
    { titulo: 'Sheeran & Webb, "The Intention–Behavior Gap" (2016) — resume Gollwitzer & Sheeran sobre planos se-então', url: 'https://doi.org/10.1111/spc3.12265', consultadoEm: '12/09/2026' },
    { titulo: 'Karlan, Ratan & Zinman, Review of Income and Wealth (2014) — resume a conta SEED (Ashraf, Karlan & Yin, 2006)', url: 'https://doi.org/10.1111/roiw.12101', consultadoEm: '12/09/2026' },
    { titulo: 'Kotomin & Varma, Financial Review (2021) — resume Fischbacher, Hoffmann & Schudy (2017)', url: 'https://doi.org/10.1111/fire.12288', consultadoEm: '12/09/2026' },
    { titulo: 'Carta & Conversano, "Practical Implementation of the Kelly Criterion", Frontiers in Applied Mathematics and Statistics (2020)', url: 'https://doi.org/10.3389/fams.2020.577050', consultadoEm: '12/09/2026' },
    { titulo: 'Bamberg & Neuhierl, German Economic Review 13(2) (2012) — fração ótima menor sob cauda pesada', url: 'https://doi.org/10.1111/j.1468-0475.2011.00553.x', consultadoEm: '12/09/2026' },
    { titulo: 'Feller, An Introduction to Probability Theory and Its Applications, vol. 1 (Wiley) — ruína do apostador', url: 'livro acadêmico', consultadoEm: '12/09/2026' },
    { titulo: 'Grobys & Shahzad (2025) — variâncias de estratégias em cripto sem média e variância definidas', url: 'pesquisa/observador/SINTESE-FASE-0.md, seção 5.3', consultadoEm: '12/09/2026' },
    { titulo: 'CoinGecko Research — mortalidade dos tokens do Pump.fun (68,67% no mesmo dia)', url: 'pesquisa/observador/SINTESE-FASE-0.md', consultadoEm: '12/09/2026' },
    { titulo: 'Gneezy, Kapteyn & Potters, The Journal of Finance 58(2) (2003) — aversão míope à perda', url: 'https://doi.org/10.1111/1540-6261.00547', consultadoEm: '12/09/2026' },
    { titulo: 'Fellner & Sutter, The Economic Journal 119(537) (2009)', url: 'https://doi.org/10.1111/j.1468-0297.2009.02251.x', consultadoEm: '12/09/2026' },
    { titulo: 'Lo, "The Statistics of Sharpe Ratios", Financial Analysts Journal 58(4) (2002)', url: 'https://traders.studentorg.berkeley.edu/papers/The-Statistics-of-Sharpe-Ratios.pdf', consultadoEm: '12/09/2026' },
    { titulo: 'Bailey & López de Prado, "How backtest overfitting leads to false discoveries", Significance 18(6) (2021)', url: 'https://doi.org/10.1111/1740-9713.01588', consultadoEm: '12/09/2026' },
    { titulo: 'Schumer & Jerolmack, Journal of Geophysical Research (2009) — média amostral que não converge', url: 'https://doi.org/10.1029/2009JF001266', consultadoEm: '12/09/2026' },
    { titulo: 'Barber & Odean, "Trading Is Hazardous to Your Wealth", The Journal of Finance 55(2) (2000)', url: 'https://faculty.haas.berkeley.edu/odean/', consultadoEm: '12/09/2026' },
    { titulo: 'Barber, Lee, Liu & Odean, "The Cross-Section of Speculator Skill", Journal of Financial Markets 18 (2014)', url: 'https://www.sciencedirect.com/science/article/abs/pii/S1386418113000190', consultadoEm: '12/09/2026' },
    { titulo: 'Chague, De-Losso & Giovannetti, "Day Trading for a Living?", SSRN 3423101 (working paper)', url: 'https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3423101', consultadoEm: '12/09/2026' },
    { titulo: 'ESMA — medidas sobre CFDs e opções binárias (23/03/2018)', url: 'https://www.esma.europa.eu/node/84933', consultadoEm: '12/09/2026' },
    { titulo: 'Catálogo de números sem fonte (blogs de plataforma de diário)', url: 'pesquisa/modulos/pesquisas/P6-rotina-e-tamanho-de-posicao-v2.md, seção 6', consultadoEm: '12/09/2026' },
  ],

  // ---------------------------------------------------------------------------
  // Vídeos — cada um vira o botão "Assistir a videoaula" dentro do card da seção
  // que ele reforça (o campo `secao` diz qual). O player só aparece no clique.
  // PENDENTE: a `transcricao`; enquanto ela não existe, o aviso padrão de
  // src/data/videoaulas.js entra embaixo do player.
  // ---------------------------------------------------------------------------
  videos: {
    'a-regra-escrita': {
      titulo: 'A regra escrita antes da compra',
      secao: 'por-que-antes',
      src: 'assets/videos/a-regra-escrita.mp4',
      duracao: '8:53',
      descricao: 'O que a regra precisa ter para ser testada — e por que ela vem antes, não depois.',
      transcricao: [],
    },
    'tamanho-de-posicao': {
      titulo: 'Tamanho de posição: por que a fórmula de Kelly quebra',
      secao: 'fracao-fixa',
      src: 'assets/videos/tamanho-de-posicao.mp4',
      duracao: '8:32',
      descricao: 'Fração fixa, sequência de perdas e ruína: o que sobra é sobreviver.',
      transcricao: [],
    },
    'o-diario': {
      titulo: 'O diário de 9 campos',
      secao: 'duas-frases',
      src: 'assets/videos/o-diario.mp4',
      duracao: '8:06',
      descricao: 'Ele ajuda a seguir a regra, não a ganhar dinheiro.',
      transcricao: [],
    },
    'a-revisao': {
      titulo: 'Revisar sem se enganar',
      secao: 'olhar-pouco',
      src: 'assets/videos/a-revisao.mp4',
      duracao: '7:44',
      descricao: 'Olhe o resultado pouco, o comportamento muito — e quantas operações provam algo.',
      transcricao: [],
    },
    'numeros-que-circulam': {
      titulo: 'As estatísticas de trading que circulam',
      secao: 'mitos',
      src: 'assets/videos/numeros-que-circulam.mp4',
      duracao: '8:19',
      descricao: 'Os números que se repetem por aí, e o dado real por trás de cada um.',
      transcricao: [],
    },
  },
};
