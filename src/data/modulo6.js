// modulo6.js — conteúdo do Módulo 6 (Ler a tela: o que os números escondem).
// Aqui só tem DADOS: nenhuma lógica, nenhum HTML. As contas dos visuais (largura
// das barras, posição na régua) moram em src/views/modulo6.js.
//
// De onde vem: pesquisas 1, 2, 3 e 7 dos módulos, com as correções e as checagens ao
// vivo registradas em pesquisa/modulos/pesquisas/VERIFICACOES-AO-VIVO.md. Onde uma
// pesquisa errou, vale a verificação.
//
// A tela segue o desenho do Claude Design (pesquisa/design/handoff/designs/"M6
// Desktop.dc.html"). Cada seção tem `aba` e `id` e vira um card, na ordem do
// desenho. Os textos que o desenho criou para os visuais (rótulos curtos,
// legendas) estão dentro de cada seção, junto do visual a que pertencem.

export const modulo6 = {
  id: 'modulo-6',
  titulo: 'Ler a tela',

  resumo:
    'Os números de um terminal parecem medir o token. Medem outra coisa — e alguns são ' +
    'fabricados de propósito. Este módulo mostra o que cada número é de verdade, como o ' +
    'volume é inventado, que armadilhas moram no contrato, e o que a pesquisa consegue e ' +
    'não consegue prever sobre um golpe.',

  // O "Lembrete" âmbar do cabeçalho (a view escreve "Lembrete: " em negrito na frente).
  lembrete:
    'números e nomes de campo conferidos em setembro de 2026. Interfaces e regras de ' +
    'plataforma mudam — se um campo sumir, procure o mesmo conceito.',

  // "Antes de ler: o que você acha?" no topo de cada aba de conteúdo: o id da
  // pergunta do quiz (bloco do app que o dono decidiu manter, 18/09/2026).
  perguntaAntes: { numeros: 'q1', volume: 'q5', contrato: 'q6', deteccao: 'q8' },

  // "Parte X de N" com o botão "Continuar" (também mantido pelo dono): os nomes
  // das partes das abas Os números e O contrato. Quais cards vão em cada parte
  // está na view (src/views/modulo6.js).
  partes: {
    numeros: ['Os três números', 'Quanto dá para vender', 'Preço e PnL'],
    contrato: ['SPL clássico ou Token-2022', 'Extensões e autoridades', 'Metadata, dev dump e redes EVM'],
  },

  // "O que você leva deste módulo": o card do fim da aba Quiz.
  objetivos: [
    'Diferenciar market cap, FDV e liquidez, e calcular quanto dá para vender de fato.',
    'Ler o preço e o PnL da tela sabendo o que eles escondem.',
    'Reconhecer volume fabricado e entender por que todo sinal público é contornado.',
    'Checar o contrato: SPL clássico ou Token-2022, extensões, autoridades e metadata.',
    'Saber o que a pesquisa sustenta — e o que não sustenta — sobre prever um rug.',
  ],

  // Mapa do módulo ("O módulo inteiro numa olhada", no topo da página): o centro
  // e as folhas curtas de cada aba, copiados do desenho (M6 Desktop, renderVals ›
  // ABAS). `aba` é o id da aba na view. O ramo do Quiz não entra aqui: a view
  // conta as perguntas de `quiz` e escreve "N perguntas".
  mapa: {
    titulo: 'Ler a tela',
    subtitulo: 'O que os números escondem',
    ramos: [
      { aba: 'numeros', folhas: ['market cap × liquidez', 'quanto sai', 'zeros compactados', 'PnL'] },
      { aba: 'volume', folhas: ['wash trading', 'custo por US$ 1 milhão', 'bundles'] },
      { aba: 'contrato', folhas: ['SPL × Token-2022', 'extensões', 'as 3 autoridades'] },
      { aba: 'deteccao', folhas: ['a régua', 'o detector', 'os sinais'] },
    ],
  },

  // ---------------------------------------------------------------------------
  // Seções de texto
  //
  // Cada seção vira um card, na ordem do desenho: título → ideia central
  // (emUmaFrase) → o visual → as frases (paragrafos) → "Para ir mais fundo"
  // (detalhe) → "Pergunta rápida" (perguntaRapida = o id da pergunta do quiz).
  // Os campos de cada visual (barras, lupa, cartoes…) trazem os textos do desenho.
  //
  // `foraDaTela`: frases da primeira versão que o desenho tirou e que não
  // aparecem em nenhum outro lugar da tela (definições, sobretudo). Ficam aqui
  // guardadas, caso o dono queira devolvê-las; a tela não as mostra.
  // ---------------------------------------------------------------------------
  secoes: [
    // ================================ NÚMEROS ================================
    {
      id: 'tres-numeros',
      aba: 'numeros',
      titulo: 'Market cap, FDV e liquidez: três números, três perguntas',
      emUmaFrase:
        'Market cap e FDV dizem quanto o token "valeria" no papel. Só a liquidez diz quanto ' +
        'dinheiro existe de verdade para pagar quem vende.',
      // Visual: as duas barras na mesma escala (criarBarrasNaMesmaEscala). Os
      // valores são os do exemplo inventado de `foraDaTela`: US$ 0,00005 × 1 bilhão
      // de tokens = US$ 50 mil; pool com US$ 4 mil em tokens e US$ 4 mil em SOL.
      barras: {
        exemploInventado: true,
        legenda: { tracejado: 'no papel', solido: 'tokens na pool', listrado: 'SOL: paga quem vende' },
        itens: [
          {
            rotulo: 'Market cap (= FDV aqui)',
            valor: 50000,
            exibicao: 'US$ 50 mil',
            estilo: 'tracejado',
            nota: 'US$ 0,00005 × 1 bilhão de tokens. Esse dinheiro não existe em lugar nenhum.',
          },
          {
            rotulo: 'Liquidez na pool',
            valor: 8000,
            exibicao: 'US$ 8 mil',
            partes: [
              { rotulo: 'tokens', valor: 4000, exibicao: 'US$ 4 mil', estilo: 'solido' },
              { rotulo: 'SOL', valor: 4000, exibicao: 'US$ 4 mil', estilo: 'listrado' },
            ],
            nota: 'Só a metade em SOL — US$ 4 mil — paga quem vende. E cada venda derruba o preço.',
          },
        ],
      },
      quadro: [
        {
          rotulo: 'Market cap',
          texto:
            'Pergunta: quanto valem os tokens que já estão circulando? Conta: preço × tokens ' +
            'em circulação.',
        },
        {
          rotulo: 'FDV (valor totalmente diluído)',
          texto:
            'Pergunta: quanto valeriam todos os tokens que existem? Conta: preço × supply total.',
        },
        {
          rotulo: 'Liquidez',
          texto:
            'Pergunta: quanto dinheiro tem na pool para pagar quem vende? É o valor dos dois ' +
            'lados da pool, somados.',
          // A caixa em destaque (borda ciano): a resposta que importa.
          destaque: true,
        },
      ],
      paragrafos: [
        'Por que o market cap engana: ele supõe que todo mundo conseguiria vender pelo último ' +
          'preço. Esse preço foi feito por uma negociação pequena. Se muita gente vender junto, ' +
          'o preço despenca muito antes.',
        'Regra prática: olhe primeiro a liquidez. Market cap de milhões com liquidez de ' +
          'milhares é número de vitrine.',
      ],
      detalhe: {
        titulo: 'cada site calcula do seu jeito',
        lista: [
          'DexScreener: FDV = (supply total − tokens queimados) × preço. O market cap só fica ' +
            'diferente do FDV quando o projeto informa o circulante ou a CoinGecko tem esse dado.',
          'Token ainda na bonding curve: DexScreener e GeckoTerminal não descontam nada.',
          'GeckoTerminal: não mostra market cap, só FDV.',
          'Solscan: o campo chamado "Market Cap" é, pela documentação dele, o valor totalmente ' +
            'diluído (FDV).',
        ],
      },
      perguntaRapida: 'q1',
      foraDaTela: {
        paragrafos: [
          'Na tela de qualquer memecoin aparecem três números grandes. Eles parecem medir a ' +
            'mesma coisa, mas cada um responde a uma pergunta diferente.',
        ],
        exemplo: {
          titulo: 'Exemplo com um token inventado do pump.fun',
          passos: [
            'O supply é de 1 bilhão de tokens, todos criados no lançamento. Então circulante = ' +
              'total, e market cap = FDV.',
            'O último negócio saiu a US$ 0,00005 por token. Market cap = 0,00005 × 1 bilhão = ' +
              'US$ 50 mil.',
            'A pool tem US$ 4 mil em SOL de um lado e US$ 4 mil em tokens do outro. Liquidez = ' +
              'US$ 8 mil.',
            'Os "US$ 50 mil" não existem em lugar nenhum. O que existe para pagar vendedores são ' +
              'os US$ 4 mil em SOL — e cada venda derruba o preço (a próxima seção faz essa conta).',
          ],
        },
      },
    },
    {
      id: 'quanto-sai',
      aba: 'numeros',
      titulo: 'Quanto dá para vender antes de derrubar o preço',
      emUmaFrase:
        'Cada venda derruba o preço. Derrubar o preço pela metade devolve só 14,64% da ' +
        'liquidez anunciada, seja a pool grande ou pequena.',
      // Visual: a curva deslizante x · y = k (criarCurvaDeSaida, em
      // components/visuais.js). Ela lê a liquidez do `exemplo` abaixo e os atalhos
      // (10, 30 e 50%) da tabelaVendaPorQueda. Depois das frases vem a animação
      // do pool, que conta o mesmo exemplo cena por cena.
      paragrafos: [
        'A liquidez anunciada não é o quanto você consegue tirar. Cada venda empurra o preço ' +
          'para baixo, e a parte seguinte da venda sai mais barata.',
        'Por isso a pergunta útil não é "quanto de liquidez tem?". É "quanto eu tiro antes de ' +
          'o preço cair X%?". A conta tem uma surpresa: a resposta, em porcentagem, não depende ' +
          'do tamanho da pool.',
      ],
      // A caixa depois da animação: os três pontos da tabelaVendaPorQueda, com os
      // dólares do exemplo (pool de US$ 8 mil).
      tresPontos: {
        titulo: 'Os três pontos da tabela, em texto',
        itens: [
          'Cair 10% — vende ≈ 5,41% da reserva; recebe ≈ 2,57% da liquidez anunciada (≈ US$ 206 ' +
            'na pool de US$ 8 mil).',
          'Cair 30% — vende ≈ 19,52%; recebe ≈ 8,17%.',
          'Cair pela metade — vende ≈ 41,42%; recebe ≈ 14,64% (≈ US$ 1.171).',
        ],
      },
      detalhe: {
        titulo: 'a fórmula por trás e a "proporção saudável"',
        paragrafos: [
          'A conta vale para pools de produto constante. É a fórmula x · y = k das AMMs, as ' +
            'pools automáticas das DEXs. A curva do pump.fun também usa essa fórmula. Na fórmula, ' +
            'x e y são as quantidades dos dois lados da pool. O produto das duas, k, fica ' +
            'constante a cada troca.',
          'Conta: vende = 1 ÷ √(1 − queda) − 1; recebe = (1 − √(1 − queda)) ÷ 2, em fração da ' +
            'liquidez anunciada. Sem taxas.',
          'Nenhuma pesquisa revisada por pares publica uma proporção "saudável" entre liquidez e ' +
            'market cap. Quem cita uma está usando regra de bolso.',
        ],
      },
      perguntaRapida: 'q2',
      // O exemplo não aparece na tela, mas a curva lê dele a liquidez: não tire a
      // frase "A liquidez anunciada é de US$ 8 mil." (components/visuais.js,
      // liquidezDoExemplo).
      exemplo: {
        titulo: 'Exemplo com o token inventado da seção anterior',
        passos: [
          'A liquidez anunciada é de US$ 8 mil.',
          'Para derrubar o preço em 10%, você recebe 2,57% disso: cerca de US$ 206.',
          'Para derrubar o preço pela metade, recebe 14,64%: cerca de US$ 1.171.',
          'Se a pool fosse dez vezes maior, as porcentagens seriam as mesmas. Só os valores em ' +
            'dólar mudariam.',
        ],
      },
      foraDaTela: {
        paragrafos: [
          'Por isso market cap de milhões com liquidez de milhares é número de fantasia. A ' +
            'liquidez limita quanto qualquer pessoa consegue sair.',
          'E a sua própria venda também entra nesse limite.',
        ],
      },
    },
    {
      id: 'zeros-compactados',
      aba: 'numeros',
      titulo: 'Zeros compactados: o preço que se lê errado',
      emUmaFrase:
        'Em $0.0₅2786, o 5 pequeno é a quantidade de zeros. Lido como número comum, o preço ' +
        'parece cerca de 19 mil vezes maior.',
      // Visual: a "lupa dos zeros" — o preço como a tela mostra, o mesmo preço por
      // extenso e, embaixo, o erro de quem copia para uma planilha. Cada preço vem
      // em três pedaços para o meio (o 5 pequeno, os cinco zeros) ganhar a cor ciano.
      lupa: {
        naTela: {
          rotulo: 'Na tela',
          antes: '$0.0',
          meio: '₅',
          depois: '2786',
          nota: 'O 5 pequeno diz quantos zeros vêm depois da vírgula, antes do 2786.',
        },
        porExtenso: {
          rotulo: 'Por extenso (a lupa)',
          antes: 'US$ 0,',
          meio: '00000',
          depois: '2786',
          nota: 'Cinco zeros. O preço real é US$ 0,000002786.',
        },
        copiado: {
          texto: 'Copiado para uma planilha, o 5 pequeno vira um 5 comum: ',
          valor: '$0.052786',
          vezes: '≈ 19 mil ×',
        },
        descricao:
          'Na tela: $0.0₅2786. O 5 pequeno vale cinco zeros. Por extenso: US$ 0,000002786. ' +
          'Lido como texto vira $0.052786, cerca de 19 mil vezes o preço real.',
      },
      paragrafos: [
        'O erro acontece quando o número vira texto: copiado para uma planilha, lido às pressas ' +
          'ou lido por um leitor de tela (programa que lê a tela em voz alta).',
      ],
      detalhe: {
        titulo: 'onde achar o preço completo',
        paragrafos: [
          'Nenhuma das ferramentas documenta essa notação. No DexScreener, o valor inteiro fica ' +
            'guardado na dica que aparece ao passar o mouse. A API (o acesso de dados para ' +
            'programas) entrega o preço completo.',
        ],
      },
      perguntaRapida: 'q4',
      foraDaTela: {
        paragrafos: [
          'Preços minúsculos têm zeros demais para caber na tela. Por isso aparecem com os zeros ' +
            'compactados.',
        ],
      },
    },
    {
      id: 'pnl',
      aba: 'numeros',
      titulo: 'PnL: o lucro que a tela mostra',
      emUmaFrase:
        'O lucro não realizado da tela não é o dinheiro que chega na carteira quando você vende.',
      // Visual: os dois PnL lado a lado. O realizado com borda verde (dinheiro que
      // existe); o não realizado com borda tracejada (uma estimativa).
      cartoes: {
        itens: [
          {
            rotulo: 'PnL realizado',
            destaque: 'O que você já travou vendendo.',
            texto: 'Esse dinheiro existe.',
            tom: 'bom',
          },
          {
            rotulo: 'PnL não realizado',
            destaque: 'Preço de agora × tokens que você tem.',
            texto:
              'É uma estimativa, e é aí que mora a ilusão. Não desconta o impacto da sua própria ' +
              'venda.',
            tom: 'tracejado',
          },
        ],
        descricao:
          'PnL realizado — o que você já travou vendendo; esse dinheiro existe. PnL não ' +
          'realizado — preço de agora × tokens que você tem; estimativa que não desconta a sua ' +
          'venda nem, pela documentação, as taxas.',
      },
      paragrafos: [
        'A documentação dos terminais consultados não diz que ele desconta as taxas. Em memecoin ' +
          'de pouca liquidez, o número verde quase nunca é o que chega na carteira. A curva acima ' +
          'mostra quanto chega.',
      ],
      detalhe: {
        titulo: 'o erro de leitura ao contrário',
        paragrafos: [
          'A central de ajuda da GMGN registra casos de quem vendeu 0,12 SOL pagando 0,2 SOL de ' +
            'taxa de prioridade. A taxa foi maior que a venda, e a pessoa achou que a venda não ' +
            'tinha caído na carteira.',
        ],
      },
      perguntaRapida: 'q3',
      foraDaTela: {
        paragrafos: [
          'PnL quer dizer lucro ou prejuízo (do inglês "profit and loss"). A tela mostra dois tipos.',
        ],
      },
    },

    // ================================ VOLUME =================================
    {
      id: 'como-fabrica',
      aba: 'volume',
      titulo: 'Como o volume é fabricado',
      emUmaFrase:
        'Volume falso é a mesma pessoa comprando e vendendo de si mesma, para o token parecer ' +
        'movimentado.',
      // Visual: a figura do wash trading, desenhada a partir de
      // diagramas['wash-trading'] (mais abaixo, neste arquivo).
      paragrafos: [
        'O nome disso é wash trading: negociar consigo mesmo para parecer movimento. Numa DEX, ' +
          'isso custa dinheiro de verdade. Cada troca paga a taxa da pool e a taxa da rede.',
      ],
      // As barras "Quanto custa fabricar US$ 1 milhão de volume", entre as frases.
      // A parte roxa é a taxa da pool sobre o volume (0,30% ou 1,25%); a listrada,
      // o 1% que um serviço de volume anuncia cobrar. A view faz a conta
      // (taxa × volume) e desenha as duas barras na mesma escala.
      custo: {
        titulo: 'Quanto custa fabricar US$ 1 milhão de volume',
        volume: 1000000,
        taxaDoServico: 1, // em %
        itens: [
          { rotulo: 'Token grande · taxa da pool 0,30%', taxaDaPool: 0.3, exibicao: '≈ US$ 13 mil' },
          { rotulo: 'Token recém-graduado · taxa da pool 1,25%', taxaDaPool: 1.25, exibicao: '≈ US$ 23 mil' },
        ],
        legenda: { pool: 'taxa da pool sobre US$ 1 milhão', servico: '1% do serviço de volume' },
        descricao:
          'Token grande, taxa de pool de 0,30% — perto de US$ 13 mil. Token recém-graduado, taxa ' +
          'de pool de 1,25% — perto de US$ 23 mil. As duas contas somam o 1% que um serviço de ' +
          'volume anuncia cobrar.',
      },
      paragrafosFinais: [
        'Por que alguém paga: volume compra lugar nas listas de "em alta". E a lista traz ' +
          'compradores de verdade. Uma ironia que vale guardar: a taxa da pool é mais alta ' +
          'justamente no token pequeno e recém-graduado. É ali que a manipulação das listas é ' +
          'mais usada.',
      ],
      detalhe: {
        titulo: 'os Boosts do DexScreener',
        paragrafos: [
          'O DexScreener vende "Boosts", que turbinam o token no trending (a lista de "em alta") ' +
            'por 12 a 24 horas. Ele não publica os pesos do algoritmo que monta essa lista.',
          'O custo acima soma a taxa oficial da pool com a taxa anunciada por um vendedor de ' +
            'volume (1%). Não é medição independente de campanha real, e não inclui slippage.',
        ],
      },
    },
    {
      id: 'otimizado-contra',
      aba: 'volume',
      titulo: 'Todo sinal público é otimizado contra',
      emUmaFrase:
        'Todo número que você aprende a olhar, quem manipula também aprende a falsificar.',
      // Visual: duas colunas. À esquerda (vermelho), o que um vendedor de volume
      // publica que faz; à direita (verde), a defesa: cruzar vários sinais.
      duasColunas: {
        diz: {
          rotulo: 'O que ele diz que faz',
          itens: [
            'Espalha as operações em mais de 100 carteiras — um token com US$ 300 mil de volume ' +
              'e só 50 carteiras "é imediatamente suspeito".',
            'Sorteia o tamanho e o horário de cada operação.',
            'Deixa algumas carteiras só comprando.',
            'Usa carteiras novas a cada campanha.',
          ],
        },
        defesa: {
          rotulo: 'A defesa: cruzar o que custa caro falsificar junto',
          sinais: ['volume', 'makers', 'concentração de holders', 'carteiras ligadas entre si', 'idade do token'],
          nota: 'Cada sinal é uma triagem (um primeiro filtro), nunca um veredito.',
        },
        descricao:
          'O que um vendedor de volume diz que faz: espalha em mais de 100 carteiras; sorteia ' +
          'tamanho e horário; deixa carteiras só comprando; usa carteiras novas. A defesa: cruzar ' +
          'volume, makers, concentração de holders, carteiras ligadas e idade do token.',
      },
      paragrafos: [
        'A lição vale para a tela inteira. Qualquer número único que você aprenda a olhar já ' +
          'foi, ou pode ser, calibrado contra você.',
      ],
      foraDaTela: {
        paragrafos: [
          'Um vendedor de volume publica, com todas as letras, como engana quem olha a tela.',
          'Isso não torna os sinais inúteis. Torna cada um uma triagem (um primeiro filtro), ' +
            'nunca um veredito.',
          'A defesa é cruzar vários sinais que custa caro falsificar ao mesmo tempo: volume, ' +
            'makers (carteiras diferentes que negociaram), concentração de holders, carteiras ' +
            'ligadas entre si e idade do token.',
        ],
      },
    },
    {
      id: 'o-que-da-para-ver',
      aba: 'volume',
      titulo: 'O que dá para ver de graça — e o que não dá',
      emUmaFrase:
        'O primeiro sinal de volume fabricado dá para ver de graça. A confirmação, não.',
      // Visual: os dois passos do estudo, lado a lado (um embaixo do outro no
      // celular), cada um com o selo do que sai de graça e do que não sai.
      passos: {
        itens: [
          {
            titulo: 'A suspeita',
            selo: 'de graça',
            tom: 'bom',
            texto:
              'O volume subiu mais de 500% com o preço variando menos de 5%. A variação de preço ' +
              'está de graça no DexScreener e no GeckoTerminal. O volume de ontem, para comparar, ' +
              'só dá para aproximar.',
          },
          {
            titulo: 'A confirmação',
            selo: 'não sai de graça',
            tom: 'ruim',
            texto:
              '"Volume circular": 99% ou mais do volume do dia vem de carteiras que compraram e ' +
              'venderam no mesmo dia. Isso exige cruzar milhares de operações, carteira por ' +
              'carteira. Não sai no plano gratuito de ferramenta nenhuma.',
          },
        ],
        descricao:
          'Passo 1, a suspeita, de graça: volume subiu mais de 500% com o preço variando menos ' +
          'de 5%. Passo 2, a confirmação, não sai no plano gratuito: volume circular, 99% ou mais ' +
          'do volume do dia vem de carteiras que compraram e venderam no mesmo dia.',
      },
      paragrafos: [
        'Um estudo revisado por pares analisou 34.988 tokens em busca de crescimento artificial e ' +
          'trabalha nesses dois passos. As razões populares, como "volume por carteira" ou "volume ' +
          'por liquidez", não têm limiar publicado com método e taxa de erro — os números que ' +
          'circulam são regra de bolso.',
      ],
      detalhe: {
        titulo: 'qual é o estudo',
        paragrafos: [
          'É o estudo Midsummer, do USENIX Security 2026, uma conferência de segurança com ' +
            'revisão por pares.',
        ],
      },
    },
    {
      id: 'bundles',
      aba: 'volume',
      titulo: 'Bundles: a compra coordenada do lançamento',
      emUmaFrase:
        'No lançamento, o bundle é o criador comprando em várias carteiras de uma vez. O sinal ' +
        'que importa é quanto essas carteiras ainda seguram.',
      // Visual: o bundle — até 5 transações, em ordem, que entram juntas no mesmo
      // bloco (ou nenhuma entra).
      bundle: {
        rotulo: 'Bundle · até 5 transações, em ordem',
        transacoes: [
          '1 · carteira do criador compra',
          '2 · outra carteira dele compra',
          '3 · outra carteira dele compra',
          '4 · …',
          '5 · …',
        ],
        // As duas linhas embaixo da seta, entre as transações e o bloco.
        juntas: ['ou entram todas,', 'ou nenhuma'],
        bloco: {
          rotulo: 'Mesmo bloco',
          texto:
            'O lote de transações que a rede grava de uma vez. As 5 entram juntas — antes de o ' +
            'token aparecer para o público.',
        },
        descricao:
          'Um bundle: até 5 transações, de carteiras diferentes do mesmo criador, entram juntas ' +
          'e em ordem no mesmo bloco — ou entram todas, ou nenhuma. Tudo antes de o token ' +
          'aparecer para o público.',
      },
      // Os dois números das ferramentas: o que engana (borda tracejada) e o que
      // importa (ciano).
      cartoes: [
        {
          rotulo: 'Engana: "Total bundled %"',
          texto:
            'Quanto foi comprado em bundle. Sozinho engana, porque o criador pode comprar, ' +
            'vender e recomprar.',
          tom: 'tracejado',
        },
        {
          rotulo: 'Importa: "Current held %"',
          texto:
            'Quanto as carteiras de bundle AINDA seguram. É assim que o trench.bot mostra esse ' +
            'número.',
          tom: 'acento',
        },
      ],
      // Um parágrafo pode ser texto ou uma lista de pedaços: { numero } sai em
      // fonte mono, como no desenho.
      paragrafos: [
        [
          'O peso disso é grande. Numa amostra de 41.470 tokens que graduaram, ',
          { numero: '36,5%' },
          ' do supply estava em carteiras de bundle na hora da migração para a DEX. Bundle não é ' +
            'prova de golpe: há quem use para se proteger de snipers (robôs que compram nos ' +
            'primeiros instantes de um token).',
        ],
      ],
      detalhe: {
        titulo: 'a infraestrutura, o estudo e o top 10',
        paragrafos: [
          'O Jito, usado por quase toda a rede, é a infraestrutura dos bundles. O número de 36,5% ' +
            'vem do MELT, um preprint (artigo ainda sem revisão por pares). No mesmo estudo, ' +
            'juntar as carteiras de bundle faz a fatia do top 10 subir 24 pontos nos tokens de ' +
            'alto risco. Nos de baixo risco, sobe 6.',
        ],
      },
      perguntaRapida: 'q5',
    },

    // =============================== CONTRATO ================================
    {
      id: 'spl-ou-2022',
      aba: 'contrato',
      titulo: 'SPL clássico ou Token-2022: o programa que manda no token',
      emUmaFrase:
        'Todo token da Solana roda num de dois programas. Token-2022 não é perigo por si só: ' +
        'perigosa é a extensão a mais.',
      // Visual: a árvore do programa. Em cima, o que é "programa"; embaixo, os dois
      // ramos (SPL clássico e Token-2022), cada um com o campo do Solscan e, no
      // fim, o que olhar (verde) e o que é alerta (vermelho).
      arvore: {
        raiz: 'Programa, na Solana: o código que administra o token',
        ramos: [
          {
            nome: 'SPL clássico',
            texto: 'O original. Não tem taxa de transferência nem extensões.',
            campo: 'Owner Program: Tokenkeg…',
            folhas: [
              {
                tom: 'bom',
                texto:
                  'Sem extensões. Olhe as autoridades e o "Mutable" da Metadata. É o que a ' +
                  'LetsBonk e a LaunchLab (Raydium) criam.',
              },
            ],
          },
          {
            nome: 'Token-2022',
            texto: 'O novo. Aceita "extensões" opcionais, escolhidas na criação.',
            campo: 'Owner Program: Tokenz…',
            folhas: [
              {
                tom: 'bom',
                rotulo: 'Padrão do pump.fun',
                nomes: ['metadataPointer', 'tokenMetadata'],
                texto: '24 de 24 tokens só com estas duas.',
              },
              {
                tom: 'ruim',
                rotulo: 'Qualquer outra = alerta',
                nomes: ['transferFeeConfig', 'permanentDelegate', 'transferHook'],
                texto: '0 de 24 no pump.fun.',
              },
            ],
          },
        ],
        descricao:
          'Programa do token: SPL clássico (Owner Program começa com Tokenkeg…; sem taxa, sem ' +
          'extensões) ou Token-2022 (começa com Tokenz…; aceita extensões). Extensões de ' +
          'metadados, metadataPointer e tokenMetadata, são o padrão do pump.fun. ' +
          'transferFeeConfig, permanentDelegate e transferHook são as perigosas.',
      },
      paragrafos: [
        'O pump.fun passou a criar tokens em Token-2022. Numa checagem na blockchain em ' +
          '12/09/2026, 24 de 24 tokens do pump.fun eram Token-2022, todos só com as duas ' +
          'extensões de metadados. Por isso, o alerta num token do pump.fun é aparecer qualquer ' +
          'extensão além dessas duas.',
      ],
      detalhe: {
        titulo: 'nomes técnicos e datas',
        paragrafos: [
          'A mudança no pump.fun veio com a instrução create_v2, ativada em 12/11/2025. As duas ' +
            'extensões de metadados se chamam metadataPointer e tokenMetadata.',
        ],
      },
      perguntaRapida: 'q6',
    },
    {
      id: 'extensoes',
      aba: 'contrato',
      titulo: 'As extensões que mudam o jogo',
      emUmaFrase:
        'Duas extensões pesam mais contra quem comprou: delegado permanente e gancho de ' +
        'transferência.',
      // Visual: a tabela das extensões (tabelaExtensoes, mais abaixo).
      paragrafos: [
        'A taxa de transferência só pode ser configurada na criação do token: um token criado ' +
          'sem ela não ganha taxa depois. Quando existe, mudar o valor só vale duas epochs ' +
          'depois, cerca de 4 dias (epoch é um ciclo de tempo da rede Solana). Mas a trava não ' +
          'protege de tudo: uma taxa alta pode vir desde o lançamento.',
      ],
    },
    {
      id: 'autoridades',
      aba: 'contrato',
      titulo: 'Autoridades: o que o dono ainda pode fazer',
      emUmaFrase:
        'Autoridade é uma permissão que o dono guardou. Com a de mint ele cria tokens; com a de ' +
        'freeze, congela contas.',
      // Visual: as três autoridades, cada uma num cartão (a de freeze em vermelho:
      // é o "honeypot" da Solana), com o que ela permite e como vem no pump.fun.
      autoridades: {
        itens: [
          {
            nome: 'Mint authority',
            acao: 'Criar tokens novos',
            texto: 'Ativa, dilui quem comprou: o seu pedaço do total fica menor.',
            pumpfun: 'pump.fun: revogada em todo token',
          },
          {
            nome: 'Freeze authority',
            acao: 'Congelar a conta de alguém',
            texto:
              'Ativa, você compra e pode não conseguir vender. É o "honeypot" da Solana — sem ' +
              'código esperto nenhum.',
            pumpfun: 'pump.fun: revogada em todo token',
            tom: 'ruim',
          },
          {
            nome: 'Autoridade de metadados',
            acao: 'Trocar nome, símbolo e imagem',
            texto:
              'Depois da compra, o token passa a se parecer com outro. "Mutable: true" no SPL; ' +
              'update authority no Token-2022.',
            pumpfun: 'pump.fun: nula em 11 de 11 checados',
          },
        ],
        descricao:
          'Mint authority — criar tokens novos; ativa, dilui quem comprou. Freeze authority — ' +
          'congelar a conta de alguém; ativa, você compra e pode não conseguir vender (o honeypot ' +
          'da Solana). Autoridade de metadados — trocar nome, símbolo e imagem depois da compra. ' +
          'No pump.fun, as três vêm revogadas.',
      },
      paragrafos: [
        'No pump.fun, mint e freeze vêm revogadas (desligadas) em todo token. Isso é bom, mas não ' +
          'ajuda a escolher: se estão sempre desligadas, não separam um token do outro. Fora do ' +
          'pump.fun, são a primeira coisa a olhar.',
      ],
      // Depois das frases: a checagem do contrato (checagemDoContrato, mais abaixo).
      detalhe: {
        titulo: 'o campo "Authority" do Solscan',
        paragrafos: [
          'Esse campo é um menu que junta três autoridades: de mint, de freeze e de metadados. ' +
            'Ele mostra "N/A" quando todas foram revogadas. Um endereço ali não quer dizer que o ' +
            'dono ainda emite tokens. Pode ser só a autoridade de metadados.',
        ],
      },
      perguntaRapida: 'q7',
    },
    {
      id: 'dev-dump',
      aba: 'contrato',
      titulo: 'Dev dump: o golpe que sobra no pump.fun',
      emUmaFrase:
        'No pump.fun o criador não consegue tirar a liquidez. O golpe que sobra é ele vender o ' +
        'que comprou barato.',
      // Visual: os 3 passos do dev dump, lado a lado (um embaixo do outro no
      // celular). O último em vermelho.
      passos: {
        itens: [
          { texto: 'O criador compra barato no lançamento, muitas vezes em várias carteiras, no mesmo bloco.' },
          { texto: 'Outras pessoas chegam depois e compram mais caro.' },
          { texto: 'O criador vende tudo em cima de quem chegou depois.', tom: 'ruim' },
        ],
      },
      paragrafos: [
        'Depois da graduação, a pool do pump.fun pertence ao protocolo. A trilha fica visível: a ' +
          'carteira que criou o token aparece como "Creator" no Solscan, e o histórico dela ' +
          'mostra quanto comprou e quando vendeu. Um guia de ferramenta descreve o padrão — as ' +
          'carteiras do primeiro bloco vendendo nos primeiros 30 minutos — mas é descrição, sem ' +
          'medição.',
      ],
      // O desenho juntou aqui o que eram duas seções à parte ("Metadata mutável" e
      // "Fora da Solana: a taxa mora no código") e os limites do sinal. Cada bloco
      // abre com um título curto em negrito.
      detalhe: {
        titulo: 'metadata mutável, os limites do sinal e as redes EVM',
        blocos: [
          {
            titulo: 'Metadata mutável.',
            texto:
              'Com a autoridade de metadados ativa, o dono pode trocar nome, símbolo e imagem ' +
              'depois que você comprou. Num SPL clássico aparece como "Mutable: true" na aba ' +
              'Metadata do Solscan; num Token-2022 é a update authority do tokenMetadata. Nos ' +
              'tokens do pump.fun checados, essa porta estava fechada.',
          },
          {
            titulo: 'Os dois limites do sinal.',
            texto:
              'Nenhum estudo revisado por pares isolou "o criador vendeu" como preditor de rug. ' +
              'Quem monta o golpe usa carteiras intermediárias para esconder o vínculo.',
          },
          {
            titulo: 'Fora da Solana.',
            texto:
              'Em Ethereum, BSC e Base, a taxa e o bloqueio da venda ficam no código do contrato. ' +
              'A checagem que funciona é simular uma compra e uma venda antes (o honeypot.is faz ' +
              'isso de graça) — mas a simulação é só um retrato do momento. Num contrato ' +
              'atualizável, o dono pode trocar a lógica depois.',
          },
        ],
      },
      foraDaTela: {
        paragrafos: [
          'Metadados são o nome, o símbolo e a imagem do token.',
          'Nenhum estudo revisado por pares isolou "o criador vendeu" como preditor de rug (um ' +
            'sinal que antecipa o golpe).',
          'Num contrato atualizável, o dono pode trocar a lógica por trás. Aí ele pode mudar a ' +
            'taxa ou bloquear vendas depois que você comprou.',
        ],
      },
    },

    // =============================== DETECÇÃO ================================
    {
      id: 'o-que-conta',
      aba: 'deteccao',
      titulo: 'O que conta como rug, para quem mede',
      emUmaFrase:
        'Quantos tokens "deram rug" depende da régua usada. Com réguas diferentes, os números vão ' +
        'de 3,59% a 98,6%.',
      // Visual: as 4 réguas, em barras na mesma escala (0 a 100% dos tokens de cada
      // amostra). `valor` é o percentual (a largura da barra); `tom` dá a cor:
      // 'atencao' = âmbar, 'modelo' = roxo, 'ruim' = vermelho.
      reguas: {
        itens: [
          { quem: 'Chainalysis', regua: 'suspeitos de pump-and-dump, tokens de 2024', valor: 3.59, exibicao: '3,59%', tom: 'atencao' },
          { quem: 'Catching the Rug · Raydium', regua: 'liquidez caiu 99% ou parado por mais de 80% da vida', valor: 60.8, exibicao: '60,8%', tom: 'modelo' },
          { quem: 'Catching the Rug · PumpFun', regua: 'mesma régua', valor: 81.9, exibicao: '81,9%', tom: 'modelo' },
          { quem: 'Solidus Labs', regua: 'liquidez abaixo de US$ 1.000 (colapso, não fraude provada)', valor: 98.6, exibicao: '98,6%', tom: 'ruim' },
        ],
        legenda:
          'A régua muda o número. Mesma escala, 0 a 100% dos tokens de cada amostra. Réguas e ' +
          'amostras são diferentes entre si: não compare os valores como se medissem a mesma ' +
          'coisa.',
        descricao:
          'Chainalysis, suspeitos de pump-and-dump em 2024 — 3,59%. Catching the Rug, Raydium, ' +
          'liquidez caiu 99% ou parado por mais de 80% da vida — 60,8%. Catching the Rug, ' +
          'PumpFun, mesma régua — 81,9%. Solidus Labs, liquidez abaixo de US$ 1.000 — 98,6%.',
      },
      paragrafos: [
        'Rug vem de "rug pull", puxar o tapete: o token desaba e quem comprou fica sem saída. Não ' +
          'existe uma definição única. Cada estudo escolhe a sua régua, e o número muda com ela.',
        'O maior estudo de detecção na Solana acompanhou 6,4 milhões de tokens do PumpFun e da ' +
          'Raydium, de 30/11/2024 a 30/06/2025, e chamou de rug o token cuja liquidez caiu 99% ' +
          'desde o pico, ou que ficou parado por mais de 80% da própria vida. A Solidus Labs ' +
          'contou colapso de liquidez, não fraude provada — e a pump.fun contestou publicamente ' +
          'esse número.',
      ],
      foraDaTela: {
        paragrafos: [
          'A Chainalysis usou outra régua. Contou 3,59% dos tokens de 2024 como suspeitos de ' +
            'pump-and-dump (inflar o preço e vender em cima de quem chega).',
        ],
      },
    },
    {
      id: 'melhor-detector',
      aba: 'deteccao',
      titulo: 'O melhor detector, em linguagem simples',
      emUmaFrase:
        'O melhor detector publicado acerta mais que o chute, mas pouco. Os próprios autores ' +
        'dizem que ele ainda não serve para uso real.',
      // Visual 1: as duas grades de 100 (estimativa reconstruída pelas contagens do
      // teste), com uma nota só embaixo das duas. cor: 'ruim' = vermelho,
      // 'modelo' = roxo, 'resto' = cinza-escuro.
      grades: {
        itens: [
          {
            frase: 'De cada 100 tokens que o modelo marca como rug, cerca de 95 são rug mesmo.',
            grupos: [
              { rotulo: 'são rug mesmo', quantidade: 95, cor: 'ruim' },
              { rotulo: 'alarme falso', quantidade: 5, cor: 'resto' },
            ],
          },
          {
            frase: 'De cada 100 rugs reais, ele pega uns 68.',
            grupos: [
              { rotulo: 'o modelo pega', quantidade: 68, cor: 'modelo' },
              { rotulo: 'passam despercebidos', quantidade: 32, cor: 'resto' },
            ],
          },
        ],
        nota:
          'Estimativa: o artigo não publica esses dois números. Eles foram reconstruídos pelas ' +
          'contagens do teste.',
      },
      // Visual 2, à esquerda: a nota F1 do modelo contra a do chute "tudo é rug".
      // estilo 'modelo' = barra roxa; 'chute' = barra tracejada vermelha.
      f1: {
        titulo: 'F1, de 0 a 1',
        barras: [
          { rotulo: 'Modelo (XGBoost)', valor: 0.79, exibicao: '0,79', estilo: 'modelo' },
          { rotulo: 'Chutar "tudo é rug"', valor: 0.9, exibicao: '0,90', estilo: 'chute' },
        ],
        nota: 'Quase todo token do teste era rug (81,9%), e aí até um chute burro tira nota alta.',
        descricao:
          'F1 do modelo — 0,79. F1 de chutar tudo é rug — 0,90, melhor que o modelo nessa nota.',
      },
      // Visual 2, à direita: o MCC do modelo na régua de −1 a 1. A marca tracejada é
      // o modelo treinado numa plataforma e testado na outra: o artigo só diz "perto
      // de zero", e a marca fica no 0 (o desenho a punha em 52%, o que daria 0,04).
      mcc: {
        titulo: 'MCC, de −1 a 1',
        valor: 0.39,
        exibicao: '0,39',
        rotuloDoModelo: 'modelo: ',
        outro: { valor: 0, rotulo: 'treinado na Raydium, testado no PumpFun: perto de zero' },
        marcas: ['−1 erra tudo', '0 = chute', '1 perfeito'],
        nota: 'O MCC não se deixa enganar quando quase tudo é rug. Acerto modesto.',
        descricao:
          'MCC, de menos 1 a 1: menos 1 é errar tudo, 0 é o mesmo que chutar, 1 é acerto quase ' +
          'perfeito. O modelo marca 0,39. Treinado na Raydium e testado no PumpFun, cai para ' +
          'perto de zero.',
      },
      paragrafos: [
        'O modelo que se saiu melhor se chama XGBoost. Ele olha só os 5 primeiros minutos de ' +
          'negociação: quantidade de compras e vendas, carteiras únicas, valores e variação de ' +
          'preço. Nenhuma das 23 características que ele usa é de holders, bundles, autoridades ' +
          'ou redes sociais. Os autores também reconhecem que o golpe muda com o tempo.',
      ],
      detalhe: {
        titulo: 'como ler F1 e MCC',
        paragrafos: [
          'O F1 junta duas perguntas. Do que o modelo acusou, quanto era rug? E, dos rugs reais, ' +
            'quantos ele achou? O MCC vai de −1 a 1. Perto de 1 é acerto quase perfeito, 0 é o ' +
            'mesmo que chutar, e −1 é errar tudo.',
        ],
      },
      perguntaRapida: 'q8',
      foraDaTela: {
        paragrafos: [
          'O modelo que se saiu melhor se chama XGBoost. É um tipo de programa que aprende ' +
            'padrões a partir de exemplos.',
          'E o que o modelo aprende num lugar não vale no outro.',
        ],
      },
    },
    {
      id: 'sinais',
      aba: 'deteccao',
      titulo: 'O que a pesquisa diz sobre os sinais',
      emUmaFrase:
        'Os sinais com mais apoio mostram quem controla o token no minuto zero. Os que o mercado ' +
        'mais repete têm menos apoio.',
      // Visual: a tabela dos sinais, com a etiqueta da evidência (tabelaSinais).
      paragrafos: [
        'Estudos independentes, em redes diferentes, concordam numa família de sinais: quem ' +
          'controla o token no minuto zero, e como disfarça isso. No pump.fun, o que sobra é o ' +
          'criador vendendo e a concentração de insiders — e é justamente aí que a medição ' +
          'revisada por pares é mais fraca.',
      ],
      foraDaTela: {
        quadro: [
          {
            rotulo: 'Têm apoio da pesquisa',
            texto:
              'Concentração de holders depois de juntar as carteiras ligadas. Compra coordenada ' +
              'no lançamento. Negociação artificial.',
          },
          {
            rotulo: 'O mercado repete, mas têm menos apoio',
            texto:
              'LP travada (liquidez trancada) não separa golpe de não golpe. Mint e freeze ' +
              'authority são mecânica certa, mas vêm sempre revogadas no pump.fun. Ausência de ' +
              'redes sociais nunca foi medida como preditor.',
          },
        ],
        paragrafos: [
          'No pump.fun, o que sobra é o criador vendendo e a concentração de insiders (gente de ' +
            'dentro, que entrou antes do público).',
        ],
      },
    },
    {
      id: 'por-que-importa',
      aba: 'deteccao',
      titulo: 'Como ler qualquer promessa de detecção',
      emUmaFrase:
        'Diante de "X% de precisão", pergunte: quanto acertaria quem chutasse "golpe" para tudo?',
      // Visual: o anúncio de "95% de precisão" contra o chute de uma amostra em
      // que 82% eram golpe (exemplo hipotético do arquivo: "suponha que eram 82%").
      // estilo 'chute' = barra tracejada; 'modelo' = barra roxa; `linha` = a linha
      // ciano do chute (82%) por cima da barra do anúncio.
      anuncio: {
        titulo: 'Testando um anúncio de "95% de precisão"',
        barras: [
          { rotulo: 'Chutar "golpe" para tudo (se 82% eram golpe)', valor: 82, exibicao: '82%', estilo: 'chute' },
          { rotulo: 'O anúncio', valor: 95, exibicao: '95%', estilo: 'modelo', linha: 82 },
        ],
        legenda:
          'O que o detector acrescenta é só a faixa entre a linha ciana (82%) e o fim da barra ' +
          '(95%). Compare com 82, não com zero. Números do exemplo do arquivo.',
        descricao:
          'Se 82% da amostra era golpe, chutar golpe para todo token já acertava 82%. Os 95% ' +
          'anunciados precisam ser comparados com esses 82%, não com zero.',
      },
      paragrafos: [
        'Um detector de rug vale tanto quanto duas coisas: a régua que define rug e a comparação ' +
          'com o chute mais burro possível. Por isso o checklist deste hub não aprova token ' +
          'nenhum. Ele reprova pelo que dá para ver, e separa cada item pela força da evidência.',
      ],
      // O card-link que fecha a seção, dentro do card.
      link: {
        href: '#/checklist',
        titulo: 'Checklist antes de comprar →',
        texto: 'Os dois pilares em itens marcáveis, cada um com a etiqueta da força da evidência.',
      },
      foraDaTela: {
        exemplo: {
          titulo: 'Testando um anúncio de "95% de precisão"',
          passos: [
            'Pergunte: quantos por cento eram golpe na amostra?',
            'Suponha que eram 82%.',
            'Então chutar "golpe" para todo token já acertava 82%.',
            'Os 95% precisam ser comparados com esses 82%, não com zero.',
          ],
        },
      },
    },
  ],

  // ---------------------------------------------------------------------------
  // Destaques — os números grandes que abrem cada aba (todos com fonte em `fontes`)
  // ---------------------------------------------------------------------------
  destaques: {
    numeros: [
      {
        rotulo: 'Liquidez que você tira derrubando o preço pela metade',
        valor: '14,6%',
        nota: 'Da liquidez anunciada, numa pool de produto constante. Não depende do tamanho da pool.',
        tom: 'alerta',
      },
      {
        rotulo: 'O que o "Market Cap" do Solscan mede',
        valor: 'Diluído',
        nota: 'A documentação dele define o campo como totalmente diluído — o que o DexScreener chama de FDV.',
      },
      {
        rotulo: 'Quanto um preço compactado engana, lido como texto',
        valor: '~19 mil ×',
        nota: '$0.0₅2786 vira "$0.052786" quando copiado. O 5 pequeno é a quantidade de zeros.',
        tom: 'alerta',
      },
    ],
    volume: [
      {
        rotulo: 'Custo de fabricar US$ 1 milhão de volume',
        valor: 'US$ 13–23 mil',
        nota: 'Taxa da pool mais 1% de um serviço de volume. Mais caro no token recém-graduado.',
      },
      {
        rotulo: 'Carteiras em que um serviço de volume espalha as operações',
        valor: '100+',
        nota: 'Declarado pelo próprio vendedor, para a razão volume/carteiras parecer normal.',
        tom: 'alerta',
      },
      {
        rotulo: 'Tokens que subiram mais de 100% com sinais de crescimento artificial',
        valor: '82,9%',
        nota: 'Estudo Midsummer (USENIX Security 2026), em quatro redes: Ethereum, BSC, Solana e Base.',
        tom: 'alerta',
      },
    ],
    contrato: [
      {
        rotulo: 'Tokens do pump.fun que são Token-2022',
        valor: '24 de 24',
        nota: 'Checagem própria na blockchain, 12/09/2026. Todos só com as duas extensões de metadados.',
      },
      {
        rotulo: 'Teto da taxa de transferência de um Token-2022',
        valor: '100%',
        nota: 'Mudar a taxa só vale duas epochs depois, cerca de 4 dias. Mas ela pode vir alta desde o início.',
        tom: 'alerta',
      },
      {
        rotulo: 'O que o criador de um token do pump.fun não consegue fazer',
        valor: 'Tirar a liquidez',
        nota: 'A pool pós-graduação é do protocolo. O golpe que sobra é vender a própria compra.',
      },
    ],
    deteccao: [
      {
        rotulo: 'Tokens que deram rug no teste do PumpFun',
        valor: '81,9%',
        nota: '43.835 de 53.546, no maior estudo de detecção na Solana (arXiv 2608.20271, preprint).',
        tom: 'alerta',
      },
      {
        rotulo: 'F1 do melhor detector publicado',
        valor: '0,79',
        nota: 'XGBoost, com os 5 primeiros minutos de negociação.',
      },
      {
        rotulo: 'F1 de chutar "tudo é rug"',
        valor: '0,90',
        nota: 'Melhor que o modelo nesse critério. Quando quase tudo é golpe, acurácia e F1 enganam.',
        tom: 'alerta',
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // Anatomias — mockups desenhados, não capturas de plataforma nenhuma.
  // Fora da tela desde o redesenho (18/09/2026): o desenho do M6 não as mostra.
  // A de "contratoNoExplorador" é a fonte da checagem do contrato, mais abaixo.
  // ---------------------------------------------------------------------------
  anatomias: {
    numerosDaTela: {
      titulo: 'Os números do topo de um par',
      descricao: 'O que cada número mede — e o que ele não mede. Clique num item da legenda para localizar.',
      viewBox: [0, 0, 640, 300],
      paineis: [
        { id: 'preco', x: 12, y: 12, w: 300, h: 80, rotulo: 'Preço', tipo: 'numeros' },
        { id: 'mcap', x: 328, y: 12, w: 300, h: 80, rotulo: 'Market cap · FDV', tipo: 'numeros' },
        { id: 'liquidez', x: 12, y: 104, w: 300, h: 80, rotulo: 'Liquidez', tipo: 'numeros', alerta: true },
        { id: 'volume', x: 328, y: 104, w: 300, h: 80, rotulo: 'Volume · Transações · Makers', tipo: 'numeros' },
        { id: 'pnl', x: 12, y: 196, w: 616, h: 92, rotulo: 'Sua posição · PnL não realizado', tipo: 'lista' },
      ],
      itens: [
        {
          painel: 'preco',
          titulo: 'Preço',
          texto: 'Pode vir com zeros compactados. Conte os zeros antes de comparar ou copiar.',
        },
        {
          painel: 'mcap',
          titulo: 'Market cap e FDV',
          texto: 'Preço vezes supply. Não é dinheiro que exista em lugar nenhum. Em token do pump.fun, os dois costumam coincidir.',
        },
        {
          painel: 'liquidez',
          titulo: 'Liquidez',
          texto: 'A soma dos dois lados da pool. É o limite real de quanto dá para sair — e você não tira nem ela inteira.',
        },
        {
          painel: 'volume',
          titulo: 'Volume, transações e makers',
          texto: 'O número mais fácil de fabricar desta tela. Veja a aba Volume falso.',
        },
        {
          painel: 'pnl',
          titulo: 'PnL não realizado',
          texto: 'Preço de agora vezes os seus tokens. Não desconta o impacto da sua venda.',
        },
      ],
      nota:
        'Os rótulos mudam de site para site: no Solscan, "Market Cap" é totalmente diluído; no ' +
        'DexScreener, "Mkt Cap" usa o circulante quando existe esse dado.',
    },

    contratoNoExplorador: {
      titulo: 'O que olhar do contrato no explorador',
      descricao: 'Os campos do Solscan que respondem "o que o dono ainda pode fazer com você".',
      viewBox: [0, 0, 640, 364],
      paineis: [
        { id: 'programa', x: 12, y: 12, w: 300, h: 64, rotulo: 'Owner Program', tipo: 'campo' },
        { id: 'extensoes', x: 328, y: 12, w: 300, h: 64, rotulo: 'Token Extensions', tipo: 'campo', alerta: true },
        { id: 'authority', x: 12, y: 88, w: 300, h: 64, rotulo: 'Authority', tipo: 'campo' },
        { id: 'creator', x: 328, y: 88, w: 300, h: 64, rotulo: 'Creator', tipo: 'campo' },
        { id: 'metadata', x: 12, y: 164, w: 616, h: 84, rotulo: 'Aba Metadata · Extensions', tipo: 'texto' },
        { id: 'holders', x: 12, y: 260, w: 616, h: 92, rotulo: 'Aba Holders', tipo: 'lista' },
      ],
      itens: [
        {
          painel: 'programa',
          titulo: 'Owner Program',
          texto: '"Tokenkeg…" é SPL clássico; "Tokenz…" é Token-2022. Diz qual conjunto de regras vale para o token.',
        },
        {
          painel: 'extensoes',
          titulo: 'Token Extensions',
          texto: 'Num token do pump.fun, só metadataPointer e tokenMetadata. Qualquer outra — taxa, delegado permanente, hook — é o alerta mais forte desta tela.',
        },
        {
          painel: 'authority',
          titulo: 'Authority',
          texto: 'Um menu com três autoridades: mint, freeze e metadados. "N/A" quando todas foram revogadas. Endereço aqui não prova que o dono ainda emite.',
        },
        {
          painel: 'creator',
          titulo: 'Creator',
          texto: 'A carteira que criou o token. Clique nela para ver o histórico: tokens anteriores, quanto comprou, quando vendeu.',
        },
        {
          painel: 'metadata',
          titulo: 'Metadata',
          texto: 'Nome, símbolo e imagem. "Mutable: true" (SPL clássico) ou update authority ativa (Token-2022) quer dizer que podem ser trocados.',
        },
        {
          painel: 'holders',
          titulo: 'Holders',
          texto: 'A lista crua das maiores carteiras. Carteiras ligadas entre si não aparecem juntas aqui — para isso, Bubblemaps.',
        },
      ],
      nota:
        'Nomes de campo segundo a documentação do Solscan, em setembro de 2026. Interfaces mudam: ' +
        'se um campo sumir, procure o mesmo conceito.',
    },
  },

  // ---------------------------------------------------------------------------
  // Tabelas
  // ---------------------------------------------------------------------------

  // Quanto sai, por queda de preço. A tela não mostra esta tabela como tabela:
  // as quedas (10, 30 e 50%) viram os atalhos da curva deslizante, e os três
  // pontos aparecem em texto na seção "quanto-sai" (tresPontos).
  tabelaVendaPorQueda: {
    colunas: [
      { chave: 'vende', rotulo: 'Tokens da reserva que você vende' },
      { chave: 'recebe', rotulo: 'O que você recebe' },
    ],
    linhas: [
      {
        id: 'queda-10',
        titulo: 'Derrubar o preço em 10%',
        valores: { vende: '≈ 5,41% dos tokens da reserva', recebe: '≈ 2,57% da liquidez anunciada' },
        detalheExtra:
          'Conta: vende = 1 ÷ √(1 − queda) − 1; recebe = (1 − √(1 − queda)) ÷ 2, em fração da ' +
          'liquidez anunciada. Sem taxas. A fração não depende do tamanho da pool.',
      },
      {
        id: 'queda-30',
        titulo: 'Derrubar o preço em 30%',
        valores: { vende: '≈ 19,52% dos tokens da reserva', recebe: '≈ 8,17% da liquidez anunciada' },
      },
      {
        id: 'queda-50',
        titulo: 'Derrubar o preço pela metade',
        valores: { vende: '≈ 41,42% dos tokens da reserva', recebe: '≈ 14,64% da liquidez anunciada' },
      },
    ],
  },

  // A tabela das extensões (seção "extensoes"). A coluna com `destaque` ganha a
  // borda ciano e mostra o texto num selo com a cor da linha: `tom` 'bom'
  // (verde) ou 'ruim' (vermelho). No celular a tabela rola para o lado.
  tabelaExtensoes: {
    rotulo: 'As extensões, uma a uma (role na horizontal se preciso)',
    rotuloDasLinhas: 'Extensão',
    colunas: [
      { chave: 'oQueFaz', rotulo: 'O que faz' },
      { chave: 'risco', rotulo: 'Risco para quem comprou', destaque: true },
      { chave: 'pumpfun', rotulo: 'No pump.fun' },
    ],
    linhas: [
      {
        id: 'metadados',
        titulo: 'metadataPointer + tokenMetadata',
        tom: 'bom',
        valores: {
          oQueFaz: 'Guardam nome, símbolo e imagem dentro do próprio token.',
          risco: 'Nenhum, se a autoridade de atualização estiver nula.',
          pumpfun: 'Padrão, com as autoridades nulas em 11 de 11 checados.',
        },
      },
      {
        id: 'taxa',
        titulo: 'transferFeeConfig',
        tom: 'ruim',
        valores: {
          oQueFaz: 'Cobra uma taxa em cada transferência, inclusive na venda.',
          risco: 'Pode chegar a 100%. Mudança só vale duas epochs depois.',
          pumpfun: 'Não aparece (0 de 24).',
        },
      },
      {
        id: 'delegado',
        titulo: 'permanentDelegate',
        tom: 'ruim',
        valores: {
          oQueFaz: 'Dá a uma conta o poder de mover ou queimar tokens de qualquer carteira.',
          risco: 'O dono pode tirar os tokens da sua carteira sem a sua assinatura.',
          pumpfun: 'Não aparece (0 de 24).',
        },
      },
      {
        id: 'hook',
        titulo: 'transferHook',
        tom: 'ruim',
        valores: {
          oQueFaz: 'Roda um programa do criador a cada transferência, que aprova ou recusa.',
          risco: 'Pode bloquear a sua venda.',
          pumpfun: 'Não aparece (0 de 24).',
        },
      },
    ],
  },

  // A tabela dos sinais (seção "sinais"). Cada linha tem a `etiqueta` da força da
  // evidência, que aparece num selo colorido na coluna "Evidência" (textos e
  // cores do desenho). No celular a tabela rola para o lado.
  tabelaSinais: {
    rotulo: 'Os sinais, pela força da evidência (role na horizontal se preciso)',
    rotuloDasLinhas: 'Sinal',
    rotuloDaEtiqueta: 'Evidência',
    etiquetas: {
      medido: { texto: 'Sinal medido', tom: 'bom' },
      desmentido: { texto: 'Medido e desmentido', tom: 'alerta' },
      fraco: { texto: 'Sinal fraco', tom: 'ruim' },
    },
    colunas: [
      { chave: 'evidencia', rotulo: 'O que a pesquisa diz' },
      { chave: 'pumpfun', rotulo: 'No pump.fun' },
    ],
    linhas: [
      {
        id: 'concentracao',
        titulo: 'Concentração real dos holders',
        etiqueta: 'medido',
        valores: {
          evidencia: 'Medido: juntando carteiras ligadas, o top 10 sobe 24 pontos nos tokens de alto risco.',
          pumpfun: 'Vale, se você olhar os clusters e não só a lista.',
        },
      },
      {
        id: 'bundles',
        titulo: 'Bundles no lançamento',
        etiqueta: 'medido',
        valores: {
          evidencia: 'Medido: entre os sinais mais preditivos de alto risco (MELT, preprint).',
          pumpfun: 'Vale; o que importa é quanto as carteiras ainda seguram.',
        },
      },
      {
        id: 'volume',
        titulo: 'Volume artificial',
        etiqueta: 'medido',
        valores: {
          evidencia: 'Medido: 82,9% dos tokens que subiram mais de 100% tinham sinais (Midsummer, USENIX Security 2026).',
          pumpfun: 'Vale, mas é o sinal mais contornado de propósito.',
        },
      },
      {
        id: 'lp',
        titulo: 'LP travada',
        etiqueta: 'desmentido',
        valores: {
          evidencia: 'Medido e desmentido: 97,3% dos tokens com trava eram maliciosos, contra 97,7% no geral.',
          pumpfun: 'Não se aplica: a pool pós-graduação é do protocolo.',
        },
      },
      {
        id: 'autoridades',
        titulo: 'Mint e freeze authority',
        etiqueta: 'fraco',
        valores: {
          evidencia: 'Mecânica certa, sem medição como preditor de rug.',
          pumpfun: 'Vêm sempre revogadas: não diferenciam um token do outro.',
        },
      },
      {
        id: 'dev-dump',
        titulo: 'O criador vendeu',
        etiqueta: 'fraco',
        valores: {
          evidencia: 'Nenhum preditor revisado por pares isola esse sinal.',
          pumpfun: 'É o golpe que sobra lá — e o menos medido.',
        },
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // Calculadora de saída. Fora da tela desde o redesenho (18/09/2026): o desenho
  // do M6 trocou a calculadora pela curva deslizante ("A curva acima mostra quanto
  // chega", na seção do PnL). A conta que ela usava (calcularSaida) estava em
  // src/views/modulo6.js e continua no histórico do git.
  // ---------------------------------------------------------------------------
  calculadoraDeSaida: {
    titulo: 'Quanto do seu PnL chega na carteira',
    exemplo: {
      passos: [
        'Posição de US$ 1.000 na tela, numa pool com US$ 20.000 de liquidez anunciada.',
        'O lado da pool que paga a sua venda é metade disso: US$ 10.000.',
        'Você recebe 1.000 × 10.000 ÷ (10.000 + 1.000) ≈ US$ 909.',
        'O preço fica multiplicado por (10.000 ÷ 11.000)² ≈ 0,83 — cai cerca de 17%.',
        'Agora arraste a liquidez para baixo e veja quanto do número verde some.',
      ],
    },
    descricao:
      'Arraste o valor da sua posição na tela e a liquidez anunciada da pool, e veja quanto ' +
      'você recebe vendendo tudo — e quanto a sua venda derruba o preço.',
    controles: [
      {
        id: 'posicao',
        rotulo: 'Valor da sua posição na tela',
        min: 100,
        max: 50000,
        passo: 100,
        valor: 1000,
        formatar: (n) => 'US$ ' + Number(n).toLocaleString('pt-BR'),
      },
      {
        id: 'liquidez',
        rotulo: 'Liquidez anunciada da pool',
        min: 2000,
        max: 1000000,
        passo: 1000,
        valor: 20000,
        formatar: (n) => 'US$ ' + Number(n).toLocaleString('pt-BR'),
      },
    ],
    nota:
      'Modelo de produto constante (x · y = k). A liquidez anunciada soma os dois lados da ' +
      'pool, então só metade dela é o lado que paga a sua venda. Não inclui taxas (de 0,25% a ' +
      '1,25%, conforme a pool) nem outras pessoas vendendo ao mesmo tempo — as duas coisas ' +
      'pioram o resultado.',
  },

  // ---------------------------------------------------------------------------
  // Checagem do contrato no explorador, na ordem do checklist (aba "O contrato").
  // Formato do fluxo linear em trilho: criarFluxoLinear({ variante: 'trilho',
  // numerar: false, ... }) em src/components/fluxograma.js. Textos do desenho
  // "M6 Desktop" (passosChecagem); origem em checklist.js (itens do pilar técnico)
  // e na anatomia contratoNoExplorador, abaixo.
  // tom do desvio: 'nao' = vermelho ("Não compro"); 'alerta' = âmbar (metadata
  // mutável é alerta, não "não compro"); 'neutro' = caixa comum (só desvia).
  // ---------------------------------------------------------------------------
  checagemDoContrato: {
    titulo:
      'Checagem do contrato no explorador, na ordem do checklist: programa → extensões → mint → freeze',
    passos: [
      {
        pergunta: 'Owner Program começa com Tokenz…?',
        segue: { rotulo: 'Sim: é Token-2022', tom: 'neutro' },
        desvio: {
          rotulo: 'Não',
          texto: 'SPL clássico (Tokenkeg…): não tem extensões. Siga para as autoridades.',
          tom: 'neutro',
        },
      },
      {
        pergunta: 'Token Extensions tem algo além de metadataPointer e tokenMetadata?',
        segue: { rotulo: 'Não', tom: 'neutro' },
        desvio: {
          rotulo: 'Sim',
          texto:
            'Não compro. Isso é mecânica, não opinião. Taxa, delegado permanente ou hook é o ' +
            'alerta mais forte desta tela.',
          tom: 'nao',
        },
      },
      {
        pergunta: 'Mint authority ativa?',
        segue: { rotulo: 'Não', tom: 'neutro' },
        desvio: {
          rotulo: 'Sim',
          texto: 'Não compro. Isso é mecânica, não opinião. O dono ainda pode criar tokens e diluir quem comprou.',
          tom: 'nao',
        },
      },
      {
        pergunta: 'Freeze authority ativa?',
        segue: { rotulo: 'Não', tom: 'neutro' },
        desvio: {
          rotulo: 'Sim',
          texto: 'Não compro. Isso é mecânica, não opinião. Você compra e pode não conseguir vender.',
          tom: 'nao',
        },
      },
      {
        pergunta: 'Metadata mutável ("Mutable: true" ou update authority ativa)?',
        segue: { rotulo: 'Não', tom: 'neutro' },
        desvio: {
          rotulo: 'Sim: alerta',
          texto:
            'O dono pode trocar nome, símbolo e imagem depois da compra. Fora do pump.fun é onde ' +
            'esse risco mora.',
          tom: 'alerta',
        },
      },
    ],
    fim: 'Passar por tudo não aprova o token: só quer dizer que ele não mostrou os sinais que dá para ver.',
  },

  // ---------------------------------------------------------------------------
  // Diagramas. O do wash trading é o visual da seção "como-fabrica": a view o
  // desenha com criarFluxograma (components/fluxograma.js), sem Mermaid, e a
  // versão em texto é a descrição para o leitor de tela.
  // ---------------------------------------------------------------------------
  diagramas: [
    {
      id: 'wash-trading',
      aba: 'volume',
      titulo: 'Como o volume falso vira compradores de verdade',
      legenda: 'Duas carteiras da mesma pessoa fabricam o volume que atrai os compradores reais.',
      codigoMermaid: [
        'flowchart LR',
        '  A["Carteira A compra"] --> T["A tela soma volume — como se fossem pessoas diferentes"]',
        '  B["Carteira B vende"] --> T',
        '  A -.-|mesma pessoa| B',
        '  T --> R[O token sobe nas listas de "em alta"]',
        '  R --> C["Compradores reais chegam"]',
        '  C --> S["O grupo vende para eles"]',
        // Como no desenho do M6 (também no celular): A e B lado a lado, ligados
        // pelo tracejado âmbar com "mesma pessoa" embaixo (o -.- sem ponta; o
        // ramoAlerta em B dá a cor âmbar à ligação); um colchete junta os dois na
        // caixa ciano "A tela soma volume…"; "O grupo vende para eles" em vermelho.
        '  class B ramoAlerta',
        '  class T pergunta',
        '  class S nao',
      ].join('\n'),
      versaoEmTexto: [
        'A carteira A compra o token.',
        'A carteira B, da mesma pessoa, vende quase a mesma quantidade.',
        'A tela soma as duas operações como volume, como se fossem pessoas diferentes.',
        'O volume alto empurra o token para as listas de "em alta".',
        'Compradores de verdade chegam atraídos pela lista.',
        'O grupo vende para eles.',
      ],
    },
  ],

  // ---------------------------------------------------------------------------
  // Quiz
  // ---------------------------------------------------------------------------
  // Termos de cada aba, mostrados antes do conteúdo (pré-treino).
  termos: {
    numeros: [
      { termo: 'Market cap', definicao: 'Preço vezes os tokens em circulação. É uma conta, não dinheiro que exista.' },
      { termo: 'Liquidez', definicao: 'O valor dos dois lados da pool — o dinheiro que paga quem vende.' },
      { termo: 'PnL não realizado', definicao: 'O lucro que a tela mostra enquanto você ainda não vendeu.' },
    ],
    volume: [
      { termo: 'Wash trading', definicao: 'Negociar consigo mesmo, em carteiras diferentes, para fabricar volume.' },
      { termo: 'Trending', definicao: 'Lista de tokens "em alta", montada por atividade recente e, em alguns sites, por pagamento.' },
      { termo: 'Bundle', definicao: 'Pacote de transações que entram juntas, no mesmo bloco, ou nenhuma entra.' },
    ],
    contrato: [
      { termo: 'Mint authority', definicao: 'A permissão de criar tokens novos.' },
      { termo: 'Freeze authority', definicao: 'A permissão de congelar a conta de alguém.' },
      { termo: 'Extensão', definicao: 'Recurso opcional de um token Token-2022, escolhido quando ele é criado.' },
    ],
    deteccao: [
      { termo: 'Taxa-base', definicao: 'Com que frequência algo acontece na amostra inteira, antes de olhar qualquer sinal.' },
      { termo: 'F1', definicao: 'Nota de 0 a 1 que mistura quantos rugs o modelo pega e quantos alarmes dele estão certos.' },
      { termo: 'MCC', definicao: 'Nota de −1 a 1 que não se deixa enganar quando quase tudo é rug.' },
    ],
  },

  // Por que cada alternativa errada do quiz não serve (o quiz mostra a da resposta escolhida).
  porqueErradas: {
    q1: {
      a: 'Market cap não é dinheiro disponível: é o último preço vezes o supply. Quem vende esbarra na liquidez, e mesmo dela tira só uma parte.',
      b: 'Liquidez pequena não diz nada sobre segurança. Diz que qualquer venda grande derruba o preço.',
      d: 'Market cap é preço vezes supply; liquidez é o valor dos dois lados da pool. Um é conta, o outro é dinheiro na pool.',
    },
    q2: {
      a: 'Metade só sairia se o preço não mudasse durante a venda. Cada token vendido sai por um preço pior que o anterior.',
      c: 'Para tirar tudo, o preço teria que ir a zero. E a liquidez soma os dois lados: só um deles paga a sua venda.',
      d: 'A fração não depende do supply nem do tamanho da pool: (1 − √0,5) ÷ 2 vale para qualquer pool de produto constante.',
    },
    q3: {
      b: 'O número verde é preço de agora vezes os seus tokens. Vender mexe no preço, e a tela não desconta isso.',
      c: 'Imposto não entra na conta da tela, mas o problema maior é outro: o impacto da própria venda.',
      d: 'A taxa de rede é fração de centavo na Solana. O que come o lucro de verdade é o impacto de preço e a taxa da pool.',
    },
    q4: {
      a: 'É o erro de ler o 5 pequeno como dígito comum: dá cerca de 19 mil vezes o preço real.',
      b: 'Ainda faltam zeros: o 5 pequeno diz que são cinco zeros depois da vírgula antes do 2786.',
      d: 'O preço está abaixo de um centavo. O 5 pequeno conta zeros, não milhares.',
    },
    q5: {
      a: 'Serviços de volume espalham as operações justamente para essa razão parecer normal. Razão boa não prova volume real.',
      c: 'Volume, real ou fabricado, não diz para onde o preço vai. E volume fabricado costuma vir antes da venda de quem organizou.',
      d: 'Espalhar em muitas carteiras é exatamente o que os bots fazem. Número de carteiras não descarta bot.',
    },
    q6: {
      a: 'Os tokens do pump.fun checados tinham só metadataPointer e tokenMetadata. Taxa de transferência foge do padrão.',
      b: 'Uma taxa em cada transferência pesa contra quem vende. Não protege quem comprou.',
      d: 'Extensões são escolhidas na criação do token. Graduar não acrescenta extensão.',
    },
    q7: {
      a: 'O campo junta três autoridades. Com mint e freeze nulas, o endereço pode ser só a de metadados.',
      c: 'Pelo mesmo motivo: o menu mostra as três juntas. Para saber da freeze, confira a autoridade específica.',
      d: 'O campo é real e útil: "N/A" quer dizer que as três foram revogadas. Só não diz qual está ativa sem abrir o menu.',
    },
    q8: {
      a: 'Com 82% de rugs na amostra, chutar "rug" para tudo já dá F1 de 0,90. O 0,79 fica abaixo do chute.',
      c: 'Inútil não é: o MCC de 0,39 mostra algum acerto real. Só não basta para uso.',
      d: 'F1 é uma nota do modelo, não a taxa de rug. A taxa de rug na amostra era de 81,9%.',
    },
  },

  quiz: [
    {
      id: 'q1',
      pergunta: 'Um token mostra market cap de US$ 2 milhões e liquidez de US$ 20 mil. O que isso quer dizer?',
      alternativas: [
        { id: 'a', texto: 'Que dá para vender até US$ 2 milhões desse token' },
        { id: 'b', texto: 'Que a liquidez é pequena porque o token é seguro' },
        { id: 'c', texto: 'Que market cap é preço vezes supply, e quem tentar sair esbarra na liquidez, cem vezes menor' },
        { id: 'd', texto: 'Que os dois números medem a mesma coisa' },
      ],
      correta: 'c',
      explicacao:
        'Market cap não é dinheiro: é o último preço multiplicado pelos tokens. O que existe ' +
        'para pagar quem vende é a liquidez — e mesmo dela você só tira uma fração, porque a ' +
        'sua venda derruba o preço.',
    },
    {
      id: 'q2',
      pergunta: 'Numa pool de produto constante, você vende até o preço cair pela metade. Quanto da liquidez anunciada você recebe?',
      alternativas: [
        { id: 'a', texto: 'Metade' },
        { id: 'b', texto: 'Cerca de 14,6%' },
        { id: 'c', texto: 'Tudo' },
        { id: 'd', texto: 'Depende de quantos tokens existem' },
      ],
      correta: 'b',
      explicacao:
        'A conta é (1 − √0,5) ÷ 2 ≈ 14,6%, e a fração não depende do tamanho da pool. A ' +
        'liquidez anunciada soma os dois lados; só um deles paga a sua venda, e cada venda ' +
        'recebe um preço pior que a anterior.',
    },
    {
      id: 'q3',
      pergunta: 'A tela mostra +US$ 1.000 de PnL não realizado. O que esse número não desconta?',
      alternativas: [
        { id: 'a', texto: 'O impacto de preço da sua própria venda' },
        { id: 'b', texto: 'Nada: é o valor que cai na carteira' },
        { id: 'c', texto: 'Só o imposto de renda' },
        { id: 'd', texto: 'Só a taxa de rede' },
      ],
      correta: 'a',
      explicacao:
        'Não realizado é preço de agora vezes os tokens que você tem. Vender mexe no preço — ' +
        'em pool rasa, muito — e os terminais consultados não documentam descontar isso, nem ' +
        'as taxas.',
    },
    {
      id: 'q4',
      pergunta: 'O preço aparece na tela como $0.0₅2786, com o 5 pequeno. Quanto vale o token?',
      alternativas: [
        { id: 'a', texto: 'US$ 0,052786' },
        { id: 'b', texto: 'US$ 0,0052786' },
        { id: 'c', texto: 'US$ 0,000002786' },
        { id: 'd', texto: 'US$ 52.786' },
      ],
      correta: 'c',
      explicacao:
        'O 5 pequeno diz quantos zeros vêm depois da vírgula antes do 2786: 0,000002786. Lido ' +
        'como texto, ele vira "0.052786" — cerca de 19 mil vezes mais.',
    },
    {
      id: 'q5',
      pergunta: 'Um token tem volume alto, e a razão entre volume e carteiras parece normal. O que dá para concluir?',
      alternativas: [
        { id: 'a', texto: 'Que o volume é orgânico' },
        { id: 'b', texto: 'Nada por si só: serviços de volume espalham as operações em mais de 100 carteiras para essa razão parecer normal' },
        { id: 'c', texto: 'Que o token vai subir' },
        { id: 'd', texto: 'Que não há bots negociando' },
      ],
      correta: 'b',
      explicacao:
        'É o exemplo mais claro de sinal otimizado contra: o próprio vendedor publica que ' +
        'distribui as operações justamente porque as pessoas olham essa razão. Serve de ' +
        'triagem, nunca de prova.',
    },
    {
      id: 'q6',
      pergunta: 'No Solscan, um token do pump.fun mostra a extensão transferFeeConfig. O que isso indica?',
      alternativas: [
        { id: 'a', texto: 'Nada: todo Token-2022 tem essa extensão' },
        { id: 'b', texto: 'Que o token é mais seguro' },
        { id: 'c', texto: 'Uma anomalia: os tokens do pump.fun saem só com as extensões de metadados, e essa cobra taxa em cada transferência' },
        { id: 'd', texto: 'Que o token já graduou' },
      ],
      correta: 'c',
      explicacao:
        'Na checagem de 12/09/2026, 24 de 24 tokens do pump.fun tinham só metadataPointer e ' +
        'tokenMetadata. Uma taxa de transferência foge do padrão e pode chegar a 100%.',
    },
    {
      id: 'q7',
      pergunta: 'O campo "Authority" do Solscan mostra um endereço. Isso prova que o dono ainda pode criar tokens?',
      alternativas: [
        { id: 'a', texto: 'Sim, é sempre a mint authority' },
        { id: 'b', texto: 'Não: o campo junta mint, freeze e metadados, e o endereço pode ser só a autoridade de metadados' },
        { id: 'c', texto: 'Sim, e também prova que ele pode congelar contas' },
        { id: 'd', texto: 'Não, porque o campo é decorativo' },
      ],
      correta: 'b',
      explicacao:
        'Pela documentação do Solscan, "Authority" é um menu com as três autoridades e mostra ' +
        '"N/A" só quando todas foram revogadas. Para saber se a mint authority está ativa, ' +
        'abra o menu ou confira no RugCheck.',
    },
    {
      id: 'q8',
      pergunta: 'Um detector de rug anuncia F1 de 0,79 numa amostra em que 82% dos tokens deram rug. Como ler esse número?',
      alternativas: [
        { id: 'a', texto: 'É excelente: acerta quase 80%' },
        { id: 'b', texto: 'Com cuidado: chutar "tudo é rug" já daria F1 de 0,90 nessa amostra' },
        { id: 'c', texto: 'É inútil em qualquer caso' },
        { id: 'd', texto: 'Quer dizer que 79% dos tokens são rug' },
      ],
      correta: 'b',
      explicacao:
        'Quando quase tudo é golpe, o chute mais burro já tem nota alta. Por isso a comparação ' +
        'que importa é com esse chute — e medidas como o MCC, que foi de 0,39 nesse estudo.',
    },
  ],

  // ---------------------------------------------------------------------------
  // Itens que não fecharam em fonte confiável
  // ---------------------------------------------------------------------------
  naoVerificado: [
    {
      titulo: 'Qual autoridade é o endereço no "Authority" do BONK',
      texto:
        'A documentação do Solscan diz que o campo junta mint, freeze e metadados. Com mint e ' +
        'freeze nulas na blockchain, o endereço deve ser a de metadados — mas o menu não foi ' +
        'aberto para confirmar.',
    },
    {
      titulo: 'Zeros compactados no Solscan e no RugCheck',
      texto:
        'A notação foi confirmada no código do DexScreener. Nas outras duas ferramentas, não ' +
        'foi inspecionada.',
    },
    {
      titulo: 'Extensões perigosas fora do pump.fun',
      texto:
        'O número ">40% dos novos tokens da Solana com delegado permanente" vem do RugCheck ' +
        'citado por terceiros, sem fonte primária. No pump.fun, deu 0 de 24.',
    },
    {
      titulo: 'Precisão e revocação do melhor detector',
      texto:
        'O artigo publica F1, MCC e AUCPRC. Os 95% e 68% são reconstrução a partir das ' +
        'contagens do teste, não números publicados.',
    },
    {
      titulo: 'Custo de fabricar volume',
      texto:
        'Soma a taxa oficial da pool com a taxa anunciada por um vendedor de volume (1%). Não é ' +
        'medição independente de campanha real, e não inclui slippage.',
    },
    {
      titulo: 'Dev dump como preditor',
      texto:
        'Nenhum estudo revisado por pares isolou "o criador vendeu" como sinal de rug. O padrão ' +
        'dos 30 minutos vem de guia de ferramenta, sem medição.',
    },
  ],

  // ---------------------------------------------------------------------------
  // Fontes
  // ---------------------------------------------------------------------------
  fontes: [
    { titulo: 'pump.fun — Fees (escala da PumpSwap, market cap = preço × 1 bilhão)', url: 'https://pump.fun/docs/fees', consultadoEm: '13/09/2026' },
    { titulo: 'pump.fun — Bonding curve (pool pós-graduação do protocolo)', url: 'https://pump.fun/docs/bonding-curve', consultadoEm: '12/09/2026' },
    { titulo: 'DexScreener — Token listing (FDV e market cap)', url: 'https://docs.dexscreener.com/token-listing', consultadoEm: '13/09/2026' },
    { titulo: 'DexScreener — API reference (priceUsd como texto)', url: 'https://docs.dexscreener.com/api/reference', consultadoEm: '13/09/2026' },
    { titulo: 'DexScreener — Boosting (trending pago por 12 a 24 horas)', url: 'https://docs.dexscreener.com/boosting', consultadoEm: '12/09/2026' },
    { titulo: 'GeckoTerminal — API FAQ (market_cap_usd nulo, FDV sobre o supply)', url: 'https://apiguide.geckoterminal.com/faq', consultadoEm: '12/09/2026' },
    { titulo: 'Solscan — Exploring Token Details page', url: 'https://info.solscan.io/exploring-token-details-page', consultadoEm: '13/09/2026' },
    { titulo: 'Axiom — Portfolio (PnL não realizado)', url: 'https://docs.axiom.trade/axiom/portfolio', consultadoEm: '12/09/2026' },
    { titulo: 'GMGN — Q&A (taxa de prioridade maior que o valor vendido)', url: 'https://docs.gmgn.ai/index/q-a', consultadoEm: '12/09/2026' },
    { titulo: 'Lehar & Parlour, The Journal of Finance 80(1) (2024) — impacto de preço previsível pela pool', url: 'https://doi.org/10.1111/jofi.13405', consultadoEm: '12/09/2026' },
    { titulo: 'Mongardini & Mei, "A Midsummer Meme\'s Dream" (USENIX Security 2026; 82,89% na versão publicada, 82,8% no arXiv 2507.01963v2)', url: 'https://www.usenix.org/conference/usenixsecurity26/presentation/mongardini', consultadoEm: '13/09/2026' },
    { titulo: 'Victor & Weintraud, "Detecting and Quantifying Wash Trading on DEX" (WWW 2021)', url: 'https://arxiv.org/pdf/2102.07001', consultadoEm: '12/09/2026' },
    { titulo: 'MELT / MemeTrans (arXiv 2602.13480, preprint) — bundles', url: 'https://arxiv.org/html/2602.13480v2', consultadoEm: '12/09/2026' },
    { titulo: 'Jito — Low latency transaction send (bundles de até 5 transações)', url: 'https://docs.jito.wtf/lowlatencytxnsend/', consultadoEm: '13/09/2026' },
    { titulo: 'trench.bot — documentação (Current held %)', url: 'https://docs.trench.bot/', consultadoEm: '12/09/2026' },
    { titulo: 'OpenLiquid (vendedor de volume) — distribuição em 100+ carteiras e taxa de 1%', url: 'https://openliquid.io/blog/trending-dexscreener-volume-thresholds/', consultadoEm: '12/09/2026' },
    { titulo: 'Solana Docs — Transfer fees (Token-2022)', url: 'https://solana.com/docs/tokens/extensions/transfer-fees', consultadoEm: '12/09/2026' },
    { titulo: 'Solana Docs — Metadata pointer e token metadata', url: 'https://solana.com/docs/tokens/extensions/metadata', consultadoEm: '12/09/2026' },
    { titulo: 'pump-public-docs — create_v2 e Token-2022', url: 'https://github.com/pump-fun/pump-public-docs', consultadoEm: '12/09/2026' },
    { titulo: 'Raydium Docs — Token-2022 transfer fees (LaunchLab cria SPL clássico)', url: 'https://docs.raydium.io/algorithms/token-2022-transfer-fees', consultadoEm: '12/09/2026' },
    { titulo: '"From Programming Bugs to Multimillion-Dollar Scams: Trapdoor Tokens on Uniswap" (arXiv 2309.04700)', url: 'https://arxiv.org/pdf/2309.04700', consultadoEm: '12/09/2026' },
    { titulo: 'Catching the Rug (arXiv 2608.20271, preprint)', url: 'https://arxiv.org/html/2608.20271v1', consultadoEm: '13/09/2026' },
    { titulo: 'Mazorra, Adan & Daza, "Do Not Rug on Me" (Mathematics, 2022)', url: 'https://doi.org/10.3390/math10060949', consultadoEm: '13/09/2026' },
    { titulo: 'Chainalysis — Crypto Market Manipulation 2025', url: 'https://www.chainalysis.com/blog/crypto-market-manipulation-wash-trading-pump-and-dump-2025/', consultadoEm: '12/09/2026' },
    { titulo: 'Solidus Labs — Solana Rug Pulls & Pump-and-Dumps', url: 'https://www.soliduslabs.com/reports/solana-rug-pulls-pump-dumps-crypto-compliance', consultadoEm: '12/09/2026' },
    { titulo: 'Checagem própria na blockchain (RPC público da Solana): Token-2022, extensões e autoridades em tokens do pump.fun', url: 'https://api.mainnet-beta.solana.com (getMultipleAccounts)', consultadoEm: '12/09/2026' },
  ],
};
