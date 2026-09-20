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

  // "Antes de ler: o que você acha?" no topo de cada aba: o id de uma pergunta do
  // quiz. Não é corrigida ali; a mesma pergunta volta corrigida na "Pergunta rápida".
  perguntaAntes: { regra: 'q4', tamanho: 'q3', diario: 'q1', revisao: 'q6', mitos: 'q7' },

  // ---------------------------------------------------------------------------
  // Seções — uma por card, na ordem do desenho (M7 Desktop). Cada seção tem o
  // título, a ideia central (`emUmaFrase`) e os dados do visual que fica DENTRO
  // do card. `pergunta` é a "Pergunta rápida" do fim do card: o id de uma
  // pergunta do `quiz` (não grava nada).
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
      detalhe: {
        titulo: 'de onde vem, e por que o pré-compromisso falha',
        paragrafos: [
          'O resultado dos planos "se acontecer X, eu faço Y" é de Gollwitzer & Sheeran (2006).',
          {
            destaque: 'Pré-compromisso funciona, e falha com frequência.',
            texto:
              'Numa conta de poupança das Filipinas que travava os saques até uma data, a ' +
              'poupança aumentou cerca de 82% em um ano — mas só 28% das pessoas aceitaram ' +
              'abrir a conta, e outros estudos mostram muita gente abandonando o compromisso ' +
              'antes do prazo (Ashraf, Karlan & Yin, 2006). A lição: o compromisso precisa ser ' +
              'rígido o bastante para valer e simples o bastante para você manter. Regra que ' +
              'você quebra toda semana não protege nada.',
          },
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
      pergunta: 'q4',
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
        'Stop-loss é uma ordem de venda automática: você programa um nível, e a venda acontece ' +
          'sozinha quando o preço chega lá. Em memecoin ela também tem limite — numa queda ' +
          'rápida, pode executar bem abaixo do nível programado (slippage, Módulo 5). Mesmo ' +
          'assim, é o único pré-compromisso de saída com efeito medido (Fischbacher, Hoffmann & ' +
          'Schudy, 2017).',
      ],
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
        'O número que circula, "arrisque de 1% a 2% por operação", é convenção de mercado. ' +
          'Nenhum estudo revisado por pares o fixa como ótimo: ele é coerente com a ideia de ' +
          'sobreviver, e é só isso. Qual fração você usa é decisão sua.',
      ],
      detalhe: {
        titulo: 'por que o critério de Kelly quebra aqui',
        paragrafos: [
          'O critério de Kelly responde que fração apostar para o capital crescer o mais rápido ' +
            'possível no longo prazo. Para um ativo contínuo, f* = μ ÷ σ², em que μ é o retorno ' +
            'esperado e σ² é a variância. A fórmula só funciona se as duas existirem — e numa ' +
            'cauda muito pesada a variância pode ser infinita e a média pode nem existir, então ' +
            'ela não produz número nenhum.',
          'O que a pesquisa diz com segurança é a direção: quanto mais pesada a cauda, menor a ' +
            'fração ótima (Bamberg & Neuhierl, 2012; padrão de cauda em cripto em Grobys & ' +
            'Shahzad, 2025). O valor ótimo para memecoin, ninguém resolveu.',
        ],
      },
      pergunta: 'q2',
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
        'Recuperar custa mais do que perder, porque o ganho é calculado sobre um capital menor.',
      ],
      pergunta: 'q3',
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
        'Perder inteiro não é o caso extremo: 68,67% dos tokens do Pump.fun pararam de negociar ' +
          'no mesmo dia em que nasceram (CoinGecko Research). Quanto é "um valor que você pode ' +
          'perder inteiro" só você sabe — depende da sua vida, não do mercado.',
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
        'Se a regra for ruim, o diário ajuda você a seguir uma regra ruim com mais fidelidade. O ' +
          'efeito foi maior quando o registro era escrito de verdade, e não conferido de cabeça — ' +
          'e maior também quando o resultado era mostrado a alguém.',
      ],
      pergunta: 'q1',
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
        'Qual a cadência ideal de revisão para quem opera? Ninguém mediu. Semanal é uma escolha ' +
          'razoável para começar — trate como um teste seu, não como verdade (Gneezy, Kapteyn & ' +
          'Potters, 2003; Fellner & Sutter, 2009).',
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
      pergunta: 'q5',
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
        'Em cauda pesada, a média converge muito mais devagar. E se a média nem existe, nenhum ' +
          'número de operações distingue habilidade de sorte pela média — ninguém publicou o ' +
          'índice de cauda das memecoins.',
        'Tem um agravante: testar várias versões da própria regra e ficar com a que "funcionou" ' +
          'infla o resultado. Com só três tentativas independentes, a melhor já é provavelmente ' +
          'falsa (Bailey & López de Prado, 2021). Na prática: o diário serve para saber se você ' +
          'seguiu a regra, não para provar que ela ganha.',
      ],
      pergunta: 'q6',
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
        'A defesa é a mesma do checklist: pergunte de onde vem o número, qual foi a amostra, e ' +
          'comparado com quê. Os dados que existem de verdade, com amostra e método, apontam todos ' +
          'para o mesmo lado: a maioria de quem opera com frequência perde.',
      ],
      pergunta: 'q7',
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
};
