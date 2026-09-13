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

  objetivos: [
    'Escrever uma regra que dá para conferir depois — a regra é sua; o módulo mostra a forma.',
    'Entender por que o critério de Kelly quebra em memecoin e o que sobra: sobreviver.',
    'Calcular quanto sobra do capital depois de uma sequência de perdas totais.',
    'Montar um diário de 9 campos que separa comportamento de resultado.',
    'Revisar sem cair nos vieses, e saber quantas operações provam alguma coisa.',
    'Reconhecer as estatísticas de trading inventadas que circulam.',
  ],

  // ---------------------------------------------------------------------------
  // Seções de texto
  // ---------------------------------------------------------------------------
  secoes: [
    // ================================ A REGRA ================================
    {
      id: 'por-que-antes',
      aba: 'regra',
      titulo: 'Por que a regra vem antes da compra',
      paragrafos: [
        'Depois que o resultado chega, a memória reescreve o que você pensava. Se deu certo, ' +
          '"eu sabia" (viés de retrospectiva) e "foi habilidade" (viés de autoatribuição). Se ' +
          'deu errado, "foi azar". Escrita antes, a regra guarda o que você de fato pensou.',
        'Planos do tipo "se acontecer X, eu faço Y", formados antes, aumentam a chance de a ' +
          'pessoa executar o que planejou — um resultado repetido da psicologia do ' +
          'comportamento (Gollwitzer & Sheeran, 2006).',
        'Este módulo não escreve a sua regra. Ele mostra o que ela precisa ter para ser ' +
          'testada depois. Quando comprar é decisão sua, e fica no papel antes de você ver o ' +
          'próximo token.',
      ],
    },
    {
      id: 'o-que-a-regra-tem',
      aba: 'regra',
      titulo: 'O que uma regra testável precisa ter',
      paragrafos: [
        'Uma regra que não dá para conferir depois não é regra, é intenção. São cinco partes, ' +
          'cada uma escrita de um jeito que outra pessoa conseguiria verificar olhando o diário.',
      ],
      lista: [
        'Gatilho de entrada: o que precisa acontecer, em termos observáveis, para você ' +
          'comprar. O checklist é o filtro mínimo; o gatilho é seu.',
        'Tamanho: quanto entra, em porcentagem do capital, decidido antes de ver o gráfico.',
        'Saída por perda: o nível ou a condição em que você sai — e que já fica programada.',
        'Saída por ganho e por tempo: quando realizar (a escada do Módulo 4) e quanto tempo ' +
          'esperar sem nada acontecer.',
        'O que invalida a regra: o que precisaria acontecer, na revisão, para você parar de usá-la.',
      ],
    },
    {
      id: 'pre-compromisso',
      aba: 'regra',
      titulo: 'Pré-compromisso: funciona, e falha com frequência',
      paragrafos: [
        'Decidir agora e tornar caro mudar depois funciona. Nas Filipinas, uma conta que ' +
          'travava saques até uma data aumentou a poupança em cerca de 82% em um ano (Ashraf, ' +
          'Karlan & Yin, 2006). Mas só 28% das pessoas aceitaram abrir a conta, e outros ' +
          'estudos mostram muita gente abandonando o compromisso antes do prazo.',
        'A lição para a rotina: o compromisso precisa ser rígido o bastante para valer e ' +
          'simples o bastante para você manter. Regra que você quebra toda semana não protege ' +
          'nada.',
      ],
    },
    {
      id: 'stop-automatico',
      aba: 'regra',
      titulo: 'Saída automática, não lembrete',
      paragrafos: [
        'Num experimento, investidores com uma ordem de venda automática (stop-loss) ' +
          'seguraram menos as posições perdedoras — o efeito disposição, de vender o que ganha ' +
          'e segurar o que perde. Um lembrete para "considerar vender" não mudou nada ' +
          '(Fischbacher, Hoffmann & Schudy, 2017).',
        'Em memecoin, a ordem automática também tem limite: numa queda rápida, ela pode ' +
          'executar bem abaixo do nível programado (slippage, Módulo 5). Mesmo assim, é o ' +
          'único pré-compromisso de saída com efeito medido.',
      ],
    },

    // =============================== TAMANHO =================================
    {
      id: 'fracao-fixa',
      aba: 'tamanho',
      titulo: 'Fração fixa: o ponto de partida, e por quê',
      paragrafos: [
        'Fração fixa é arriscar sempre a mesma porcentagem do capital de hoje. Duas ' +
          'propriedades explicam por que é o ponto de partida: uma perda sozinha nunca zera a ' +
          'banca, e o tamanho encolhe quando você perde e cresce quando ganha, sem precisar ' +
          'decidir de novo.',
        'O número que circula, "arrisque de 1% a 2% por operação", é convenção de mercado. ' +
          'Nenhum estudo revisado por pares o fixa como ótimo. Ele é coerente com a ideia de ' +
          'sobreviver — e é só isso.',
      ],
    },
    {
      id: 'kelly',
      aba: 'tamanho',
      titulo: 'O critério de Kelly, e por que ele quebra em memecoin',
      paragrafos: [
        'O critério de Kelly responde "que fração apostar para o capital crescer o mais rápido ' +
          'possível no longo prazo". Para um ativo contínuo, a fórmula é f* = μ ÷ σ²: o retorno ' +
          'esperado dividido pela variância.',
        'A fórmula precisa que a média e a variância existam. Em distribuições de cauda muito ' +
          'pesada — onde retornos gigantes, para cima e para baixo, aparecem com frequência ' +
          'demais —, a variância pode ser infinita e a média pode nem existir. Estudos sobre ' +
          'estratégias em cripto encontram esse padrão (Grobys & Shahzad, 2025). Aí a fórmula ' +
          'não produz número nenhum.',
        'O que a pesquisa diz com segurança é a direção: quanto mais pesada a cauda, menor a ' +
          'fração ótima (Bamberg & Neuhierl, 2012). O valor ótimo para memecoin, ninguém ' +
          'resolveu.',
      ],
    },
    {
      id: 'ruina',
      aba: 'tamanho',
      titulo: 'A ruína do apostador: sobreviver vem primeiro',
      paragrafos: [
        'Num jogo com uma desvantagem pequena, repetido muitas vezes, a ruína é quase certa. ' +
          'Na roleta americana, apostando no par (18 chances em 38), quem começa com 50 fichas ' +
          'e só para ao chegar a 100 quebra em 99,5% das vezes.',
        'Quando a matemática do crescimento não funciona e a perda total é comum, a pergunta ' +
          'muda de "quanto cresce" para "quanto aguento perder sem ser eliminado". Daí a regra ' +
          'que sobra com fundamento: o tamanho de cada posição é um valor que você pode perder ' +
          'inteiro.',
        'Em memecoin, perder inteiro não é o caso extremo: 68,67% dos tokens do Pump.fun ' +
          'pararam de negociar no mesmo dia em que nasceram (CoinGecko Research).',
      ],
    },
    {
      id: 'a-conta',
      aba: 'tamanho',
      titulo: 'A conta que a calculadora faz',
      paragrafos: [
        'Se cada posição perdida vai a zero, depois de n perdas seguidas com a fração f sobra ' +
          '(1 − f)ⁿ do capital. Com 10% por posição, 5 perdas deixam 59%; com 25%, deixam 24%.',
        'E recuperar custa mais do que perder: quem ficou com 59% precisa ganhar 69% sobre o ' +
          'que sobrou para voltar ao começo; quem ficou com 24% precisa ganhar 321%.',
      ],
    },

    // ================================ DIÁRIO =================================
    {
      id: 'duas-frases',
      aba: 'diario',
      titulo: 'O que o diário faz, e o que não faz',
      paragrafos: [
        '"O registro ajuda você a seguir a sua própria regra" tem lastro. Numa meta-análise ' +
          'de 138 experimentos, monitorar o progresso aumentou o cumprimento de metas de ' +
          'comportamento — perder peso, parar de fumar, tomar remédio (Harkin et al., 2016).',
        '"O registro faz você ganhar dinheiro" não tem: nenhum estudo revisado por pares mediu ' +
          'isso. Se a regra for ruim, o diário ajuda você a seguir uma regra ruim com mais ' +
          'fidelidade.',
        'O efeito foi maior quando o registro era escrito de verdade — não conferido de ' +
          'cabeça — e quando o resultado era mostrado a alguém.',
      ],
    },
    {
      id: 'o-tamanho-do-efeito',
      aba: 'diario',
      titulo: 'Quanto é um efeito de 0,40',
      paragrafos: [
        'O efeito medido foi d = 0,40: quem monitorou ficou, em média, 0,40 desvio-padrão ' +
          'melhor. Na régua usual, 0,2 é pequeno, 0,5 é médio e 0,8 é grande — então é pequeno ' +
          'a médio.',
        'Em chances: sorteando uma pessoa que monitorou e uma que não, há 61% de chance de a ' +
          'que monitorou ter cumprido mais a meta, contra 50% se não houvesse efeito. E a ' +
          'pessoa mediana que monitorou supera 66% de quem não monitorou.',
      ],
    },
    {
      id: 'nove-campos',
      aba: 'diario',
      titulo: 'Os nove campos',
      paragrafos: [
        'Oito campos de comportamento, que está sob o seu controle, e um de resultado, que não ' +
          'está. A peça que amarra tudo é o campo 7: sem a saída executada anotada, "segui a ' +
          'regra?" vira lembrança — e lembrança é o que os vieses corrompem.',
      ],
    },

    // =============================== REVISÃO =================================
    {
      id: 'olhar-pouco',
      aba: 'revisao',
      titulo: 'Olhe o resultado pouco, e o comportamento muito',
      paragrafos: [
        'Em experimentos, quem via o resultado das apostas com mais frequência assumia menos ' +
          'risco e decidia pior — a aversão míope à perda (Gneezy, Kapteyn & Potters, 2003; ' +
          'Fellner & Sutter, 2009). E as pessoas preferem olhar com frequência, mesmo sendo ' +
          'prejudicadas.',
        'Isso não contradiz o diário: aquela pesquisa é sobre olhar o dinheiro. Revisar se ' +
          'você seguiu a regra é outra coisa, e é essa que o lastro do diário apoia.',
        'Qual a cadência ideal de revisão para quem opera? Ninguém mediu. Semanal é uma ' +
          'escolha razoável para começar — trate como um teste seu, não como verdade.',
      ],
    },
    {
      id: 'a-pergunta',
      aba: 'revisao',
      titulo: 'A pergunta da revisão',
      paragrafos: [
        'Troque "o resultado foi bom?" por "a decisão foi boa, dado o que eu sabia antes?". A ' +
          'primeira convida os vieses abaixo; a segunda só se responde com o diário.',
      ],
      listaTitulo: 'Os vieses de quem revisa o próprio histórico:',
      lista: [
        'Retrospectiva: "eu sabia que ia acontecer" (Fischhoff, 1975).',
        'Autoatribuição: ganho é habilidade, perda é azar — e isso gera excesso de confiança ' +
          '(Gervais & Odean, 2001).',
        'Viés de resultado: julgar a decisão pelo desfecho (Baron & Hershey, 1988).',
        'Ilusão de controle: achar que influencia o que é sorte (Langer, 1975).',
        'Padrão no ruído: ver sequência onde há acaso. Num histórico curto de cauda pesada, ' +
          'quase todo padrão é ruído.',
      ],
    },
    {
      id: 'amostra',
      aba: 'revisao',
      titulo: 'Quantas operações provam alguma coisa',
      paragrafos: [
        'Se os retornos se comportassem bem, a conta seria n ≈ (2 ÷ SR)², em que SR é o ' +
          'retorno médio por operação dividido pelo desvio-padrão (Lo, 2002). Com SR de 0,1 ' +
          'por operação — um número bom —, são 400 operações para o resultado se distinguir de ' +
          'zero. Com 0,05, são 1.600.',
        'Em cauda pesada, a média converge muito mais devagar. E se a média nem existe (índice ' +
          'de cauda α ≤ 1), nenhum número de operações distingue habilidade de sorte pela ' +
          'média. Ninguém publicou o índice de cauda das memecoins.',
        'Agravante: testar várias versões da própria regra e ficar com a que "funcionou" ' +
          'infla o resultado. Com só três tentativas independentes, a melhor já é ' +
          'provavelmente falsa (Bailey & López de Prado, 2021).',
        'Na prática: 30 operações boas não provam habilidade. O diário serve para saber se ' +
          'você seguiu a regra — não para provar que ela ganha.',
      ],
    },

    // ================================ MITOS ==================================
    {
      id: 'por-que-circulam',
      aba: 'mitos',
      titulo: 'Por que esses números colam',
      paragrafos: [
        'Um número preciso, uma universidade e um prazo curto: é o formato de estatística que ' +
          'vende curso e ferramenta. A defesa é a mesma do checklist — perguntar de onde vem, ' +
          'qual foi a amostra, e comparado com quê.',
        'Os dados que existem de verdade, com amostra e método, apontam todos para o mesmo ' +
          'lado: a maioria de quem opera com frequência perde.',
      ],
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
  // Tabelas
  // ---------------------------------------------------------------------------
  tabelaCampos: {
    colunas: [
      { chave: 'tipo', rotulo: 'Tipo' },
      { chave: 'porque', rotulo: 'Por que existe' },
    ],
    linhas: [
      { id: 'c1', titulo: '1. A regra, escrita antes da entrada', valores: { tipo: 'Comportamento', porque: 'Sem ela, não dá para separar decisão de resultado.' } },
      { id: 'c2', titulo: '2. Data e hora, token e tamanho em % do capital', valores: { tipo: 'Comportamento', porque: 'O tamanho é parte da regra, não do resultado.' } },
      { id: 'c3', titulo: '3. Preço de entrada, saída por perda programada e alvo', valores: { tipo: 'Comportamento', porque: 'O plano de saída, registrado antes de saber como termina.' } },
      { id: 'c4', titulo: '4. A tese, em uma frase', valores: { tipo: 'Comportamento', porque: 'Congela a narrativa antes do resultado (a ficha do Módulo 4).' } },
      { id: 'c5', titulo: '5. Convicção, numa escala fixa de 1 a 5', valores: { tipo: 'Comportamento', porque: 'Deixa ver depois se convicção alta acerta mais — ou só aposta mais.' } },
      { id: 'c6', titulo: '6. Estado emocional na entrada', valores: { tipo: 'Comportamento', porque: 'Pressa, medo de ficar de fora, vontade de recuperar uma perda.' } },
      { id: 'c7', titulo: '7. Saída executada: hora, preço e o que disparou', valores: { tipo: 'Comportamento', porque: 'Stop, alvo, tempo ou decisão na hora. É o que torna o campo 8 verificável.' } },
      { id: 'c8', titulo: '8. Segui a regra?', valores: { tipo: 'Comportamento', porque: 'Sai da comparação entre os campos 1 e 3 e o campo 7 — não da memória.' } },
      { id: 'c9', titulo: '9. Resultado em dinheiro', valores: { tipo: 'Resultado', porque: 'O único campo de resultado. Olhe pouco (aba A revisão).' } },
    ],
  },

  tabelaMitos: {
    colunas: [
      { chave: 'fonte', rotulo: 'Tem fonte?' },
      { chave: 'real', rotulo: 'O que o dado real diz' },
    ],
    linhas: [
      {
        id: 'm23',
        titulo: '"Quem mantém diário melhora 23% o desempenho mensal em 60 dias"',
        valores: {
          fonte: 'Não. Número de blog de plataforma, sem estudo, autor ou método.',
          real: 'Nenhum estudo revisado por pares mede diário → retorno.',
        },
      },
      {
        id: 'm73',
        titulo: '"Estudo da Universidade da Califórnia: registro sistemático dá 73% de resultados melhores"',
        valores: {
          fonte: 'Distorção de dois estudos reais.',
          real:
            'O estudo real (Barber & Odean, 2000) mostra que quem mais opera ganha menos. O "73" é a ' +
            'diferença diária, em centésimos de ponto, entre os melhores e os piores day traders de ' +
            'Taiwan — sem relação com diário.',
        },
      },
      {
        id: 'm25',
        titulo: '"Diário reduz o drawdown máximo em 25% a 30%"',
        valores: { fonte: 'Não localizável.', real: 'Sem amostra e sem método publicados.' },
      },
      {
        id: 'm909090',
        titulo: '"90% dos traders perdem 90% do dinheiro em 90 dias"',
        valores: {
          fonte: 'Folclore: não existe um número oficial único.',
          real: 'Na Europa, 74% a 89% das contas de varejo em CFD perdem dinheiro (ESMA, 2018).',
        },
      },
      {
        id: 'm95',
        titulo: '"95% dos traders falham"',
        valores: {
          fonte: 'Não. Número redondo que muda de blog para blog.',
          real: 'Na B3, 97% dos day traders que persistiram mais de 300 dias perderam dinheiro.',
        },
      },
      {
        id: 'mpratica',
        titulo: '"Com prática, você fica lucrativo"',
        valores: {
          fonte: 'Não sustentado.',
          real:
            'Traders aprendem devagar e de forma custosa, e os menos hábeis "aprendem" saindo do ' +
            'mercado. No estudo da B3, os autores não acharam evidência de aprendizado.',
        },
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // Calculadora da sequência de perdas (a matemática mora em views/modulo7.js)
  // ---------------------------------------------------------------------------
  calculadoraDeSequencia: {
    titulo: 'Quanto sobra depois de uma sequência de perdas totais',
    descricao:
      'Escolha a fração do capital em cada posição e quantas posições seguidas vão a zero. ' +
      'É a matemática de uma regra, não uma sugestão de fração.',
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
    nota:
      'Supõe que cada posição perdida vai a zero e que a fração é recalculada sobre o capital ' +
      'que sobrou. Não inclui taxas nem ganhos no meio da sequência.',
  },

  // ---------------------------------------------------------------------------
  // Diagrama
  // ---------------------------------------------------------------------------
  diagramas: [
    {
      id: 'ciclo',
      aba: 'regra',
      titulo: 'O ciclo de uma operação',
      legenda: 'A regra só muda na revisão — nunca no meio de uma operação.',
      codigoMermaid: [
        'flowchart TD',
        '  A["Escrevo a regra"] --> B["Passo o token pelo checklist"]',
        '  B -->|reprovou| X["Não compro e anoto o motivo"]',
        '  B -->|passou| C{"O gatilho da minha regra aconteceu?"}',
        '  C -->|não| X',
        '  C -->|sim| D["Entro com o tamanho da regra e a saída já programada"]',
        '  D --> E["Anoto no diário antes de ver o resultado"]',
        '  E --> F["A saída executa"]',
        '  F --> G["Anoto a saída executada"]',
        '  G --> H{"Revisão: segui a regra?"}',
        '  H -->|"mudança só aqui"| A',
      ].join('\n'),
      versaoEmTexto: [
        'Escrevo a regra.',
        'Passo o token pelo checklist. Se reprovou, não compro e anoto o motivo.',
        'Se passou, confiro se o gatilho da minha regra aconteceu. Se não, não compro e anoto o motivo.',
        'Se sim, entro com o tamanho da regra e a saída já programada.',
        'Anoto no diário antes de ver o resultado.',
        'A saída executa, e eu anoto a saída executada.',
        'Na revisão, pergunto se segui a regra. Qualquer mudança na regra acontece só aqui, e volta para o começo.',
      ],
    },
  ],

  // ---------------------------------------------------------------------------
  // Quiz
  // ---------------------------------------------------------------------------
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
