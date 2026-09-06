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

  objetivos: [
    'Escrever uma tese de entrada e a catálise esperada antes de qualquer compra.',
    'Reconhecer a diferença entre catálise concreta e narrativa vaga.',
    'Definir alvos de realização e entender por que realizar parcial tira risco da mesa.',
    'Identificar o erro de segurar demais na fase de Degradação (custo afundado).',
    'Treinar a decisão em 12 cenários de simulador e ler o próprio resumo de disciplina.',
  ],

  // ---------------------------------------------------------------------------
  // Aba 1 — Tese vs. catálise
  // ---------------------------------------------------------------------------
  teseVsCatalise: {
    titulo: 'Tese vs. catálise: as duas frases que faltam antes de comprar',
    paragrafos: [
      'A tese responde "por que este token?". É a razão pela qual ele deveria chamar atenção: ' +
        'a narrativa que ele monta, a comunidade que já existe, o nicho que ele ocupa, o ' +
        'momento do mercado que ele aproveita.',
      'A catálise responde "por que agora?". É o evento concreto que precisa acontecer para ' +
        'trazer compradores novos: uma listagem, uma campanha grande, a graduação para a DEX, ' +
        'um anúncio marcado, uma narrativa que está claramente crescendo esta semana.',
      'As duas são necessárias e nenhuma sozinha basta. Tese sem catálise é um token que pode ' +
        'ficar meses parado enquanto o seu capital envelhece. Catálise sem tese é correr atrás ' +
        'de barulho: quando o evento passa, não sobra nada que segure o preço.',
      'Escrever as duas frases antes de comprar tem um efeito prático que nada mais tem: elas ' +
        'viram o critério de saída. Se a catálise aconteceu e o preço não reagiu, a tese ' +
        'estava errada. Se a catálise foi cancelada, o motivo da posição sumiu. Nos dois ' +
        'casos, a decisão já está tomada — e tomada por você frio, não por você às três da ' +
        'manhã com o gráfico caindo.',
    ],

    regraDeOuro: {
      titulo: 'Regra de ouro',
      texto:
        'Antes de entrar, escreva duas frases: (a) a tese — por que este token? e (b) a ' +
        'catálise esperada — qual evento concreto precisa acontecer para ele valorizar. Se ' +
        'você não consegue escrever a segunda frase, não é operação: é aposta.',
    },

    fichaDeTese: {
      titulo: 'Ficha de tese: cinco campos para preencher antes de clicar em comprar',
      introducao:
        'Copie estes cinco campos para o seu caderno de trades e preencha antes de cada ' +
        'entrada. Leva dois minutos e é o que separa uma decisão de um impulso.',
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

    exemplos: [
      {
        tipo: 'fraca',
        rotulo: 'Tese fraca',
        tese: '"O gráfico está bonito e está subindo forte."',
        catalise: '"Se continuar subindo, vai muito mais."',
        veredito:
          'Não há evento nenhum: o motivo da compra é o próprio preço. Isso não tem critério ' +
          'de invalidação — se cair, a única regra disponível é a esperança.',
      },
      {
        tipo: 'fraca',
        rotulo: 'Catálise vaga',
        tese: '"A comunidade é muito ativa e o projeto tem potencial."',
        catalise: '"Uma hora isso explode."',
        veredito:
          '"Uma hora" não é prazo e "explode" não é evento. Sem data e sem gatilho, não dá ' +
          'para dizer se a tese falhou — então nunca chega a hora de sair.',
      },
      {
        tipo: 'forte',
        rotulo: 'Tese + catálise concretas',
        tese: '"Token com comunidade ativa há semanas, checagens técnicas em ordem."',
        catalise: '"Evento do projeto anunciado para a próxima semana, com data marcada."',
        veredito:
          'Dá para verificar, dá para invalidar e dá para sair. Se o evento acontecer e o ' +
          'preço não reagir, a tese estava errada — e você sabe disso no mesmo dia.',
      },
    ],

    tiposDeCatalise: {
      titulo: 'Catálises comuns — e o que costuma dar errado em cada uma',
      itens: [
        {
          nome: 'Listagem em corretora',
          descricao: 'Um evento com data, que traz compradores que antes não tinham acesso.',
          alerta:
            'O anúncio muitas vezes movimenta mais o preço do que a listagem em si; quem ' +
            'comprou pelo rumor costuma vender no fato.',
        },
        {
          nome: 'Graduação para a DEX',
          descricao:
            'O token sai da bonding curve e ganha um pool com liquidez mais profunda ' +
            '(no Pump.fun, por volta de 85 SOL / ~US$ 69 mil).',
          alerta:
            'É também o momento em que quem comprou na curva finalmente consegue vender ' +
            'volume — a liquidez que te atrai é a mesma que dá saída para eles.',
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
            'A narrativa é a catálise mais difícil de datar: entra-se cedo demais e fica-se ' +
            'segurando, ou tarde demais e compra-se o topo.',
        },
        {
          nome: 'Evento do projeto com data marcada',
          descricao: 'Lançamento, parceria anunciada, campanha, migração — com dia definido.',
          alerta:
            'A melhor catálise para estudar, porque tem prazo. Cuidado com datas que vão ' +
            'sendo adiadas: adiamento é sinal, não detalhe.',
        },
      ],
    },
  },

  // ---------------------------------------------------------------------------
  // Aba 2 — Take profit
  // ---------------------------------------------------------------------------
  takeProfit: {
    titulo: 'Take profit: o lucro que você não realizou não é seu',
    paragrafos: [
      'Enquanto a posição está aberta, o lucro é um número na tela — uma promessa que depende ' +
        'de existir comprador na hora em que você quiser sair. Em memecoin, essa promessa some ' +
        'rápido: a liquidez que sustenta o preço na subida é a mesma que desaparece na descida.',
      'Realização parcial é a ferramenta que resolve isso sem exigir acertar o topo. Vendendo ' +
        'uma faixa, você recupera o valor investido e o que sobra passa a correr por conta do ' +
        'lucro. A posição continua na mesa, mas o medo sai dela — e é o medo que faz as ' +
        'decisões piores.',
      'O ponto que quase ninguém aceita de primeira: alvo de realização se define ANTES de ' +
        'entrar, junto com a tese. Definido depois, com o gráfico piscando, ele já nasce ' +
        'contaminado pela euforia ou pelo medo do momento.',
    ],

    escada: {
      titulo: 'Escada de realização (exemplo didático — não é recomendação)',
      introducao:
        'Os números abaixo são exemplo para você entender a estrutura, não uma sugestão de ' +
        'onde vender. O que importa é o formato: faixas definidas antes, cada uma com um ' +
        'motivo, e a última com regra de saída — nunca "vou ver na hora".',
      faixas: [
        {
          alvo: 'Primeiro alvo',
          acao: 'Vender a fração que recupera o valor investido.',
          porque:
            'A partir daqui o pior caso deixa de ser prejuízo. É a mudança que mais reduz o ' +
            'peso emocional da posição.',
        },
        {
          alvo: 'Segundo alvo',
          acao: 'Vender outra faixa, já como lucro realizado.',
          porque:
            'Transforma parte da alta em dinheiro que existe de verdade, sem depender de o ' +
            'movimento continuar.',
        },
        {
          alvo: 'Restante',
          acao: 'Deixar correr, com uma regra de saída escrita.',
          porque:
            'Ex.: sair se cair X% do topo, ou se a catálise falhar. O que não pode existir é ' +
            'restante sem regra — é assim que 5x vira 0.',
        },
      ],
      observacao:
        'Repare que nenhuma faixa depende de prever o topo. A escada existe justamente porque ' +
        'ninguém acerta o topo de forma consistente.',
    },

    erroDeSegurar: {
      titulo: 'O erro de segurar demais (e por que ele parece racional na hora)',
      paragrafos: [
        'Na fase de Degradação — a última das 4 fases do Módulo 2 — a atenção já migrou para ' +
          'outro token. Não há compradores novos chegando, e cada tentativa de venda encontra ' +
          'um livro mais fino que o do dia anterior. O preço não cai por acaso: cai porque ' +
          'ninguém está mais olhando.',
        'É exatamente aí que aparece o custo afundado ("sunk cost"): a cabeça diz que vender ' +
          'agora é "assumir o prejuízo", como se não vender mantivesse a operação viva. Mas o ' +
          'dinheiro já foi gasto de qualquer jeito — a única pergunta que importa é se você ' +
          'compraria este token, neste preço, hoje. Se a resposta é não, a posição já está ' +
          'sendo encerrada; só falta executar.',
        'Segurar por tempo demais é o que transforma uma perda pequena e planejada num rombo ' +
          'que leva meses para recuperar. E, diferente de quase tudo neste mercado, esse erro ' +
          'não depende do token, da chain nem da sorte: depende só de não ter escrito a regra ' +
          'antes.',
      ],
    },

    tributacao: {
      titulo: 'Realizou lucro no Brasil? O que vem depois (informativo)',
      aviso:
        'Esta seção é informativa e NÃO é aconselhamento tributário. Regras mudam com ' +
        'frequência e há divergência entre fontes — confirme tudo com um contador ' +
        'especializado antes de declarar qualquer coisa.',
      pontos: [
        {
          rotulo: 'MP 1.303/2025 — não valeu',
          texto:
            'A medida provisória que propunha alíquota única de 17,5% e o fim da isenção ' +
            'mensal foi rejeitada pela Câmara dos Deputados em outubro de 2025 e perdeu a ' +
            'validade. Ou seja: essa mudança não entrou em vigor.',
        },
        {
          rotulo: 'Isenção de R$ 35 mil no mês',
          texto:
            'Pela regra que segue vigente para o IRPF 2026, ganhos de capital com cripto em ' +
            'corretoras nacionais são isentos se a soma das VENDAS no mês não passar de ' +
            'R$ 35 mil. Repare: o limite é sobre o total vendido, não sobre o lucro.',
        },
        {
          rotulo: 'Acima do limite',
          texto:
            'Passando de R$ 35 mil em vendas no mês, aplicam-se alíquotas progressivas a ' +
            'partir de 15% (até 22,5%), apuradas no programa GCAP, com DARF (código 4600) ' +
            'até o último dia útil do mês seguinte.',
        },
        {
          rotulo: 'Operações no exterior',
          texto:
            'Operações fora do país seguem a Lei 14.754/2023, com regras próprias — outro ' +
            'motivo para ter alguém especializado revisando.',
        },
        {
          rotulo: 'Saque em reais',
          texto:
            'Na prática, sair para real acontece via corretora nacional com Pix (exige KYC/CPF) ' +
            'ou via P2P. No P2P, o risco é a contraparte: nunca libere a cripto antes de ' +
            'confirmar que o Pix caiu de fato na sua conta.',
        },
      ],
    },
  },

  // ---------------------------------------------------------------------------
  // Aba 3 — Checagens técnicas antes de entrar
  // ---------------------------------------------------------------------------
  checagens: {
    titulo: 'As checagens que vêm antes da tese',
    introducao:
      'Tese e catálise só importam se o contrato por trás resistir a uma checagem. Estas seis ' +
      'perguntas são a peneira do Módulo 3 aplicada à decisão: qualquer resposta ruim aqui ' +
      'derruba a operação, por melhor que a narrativa esteja.',
    itens: [
      {
        pergunta: 'A LP está bloqueada ou queimada?',
        porque:
          'Com a liquidez livre, o criador pode removê-la e o preço vira pó no mesmo bloco — ' +
          'o hard rug. Nenhuma outra checagem sobrevive a essa.',
        onde: 'RugCheck; e o explorer para ver quem detém os tokens de LP.',
        alerta: 'LP livre, ou lock com vencimento próximo.',
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
          'Freeze authority ativa permite congelar contas do token: você compra e pode não ' +
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
      'Doze situações, quatro escolhas em cada uma. Não existe pontuação de acerto de preço: ' +
      'o que está sendo medido é se a decisão segue a regra ou o impulso. Cada escolha mostra ' +
      'o feedback, o risco daquela decisão e o próximo passo técnico — e o histórico fica ' +
      'salvo no seu navegador.',
    aviso:
      'Os cenários são fictícios e os números neles são inventados para o exercício. Nenhum ' +
      'deles descreve um token real, e nada aqui é recomendação de compra ou venda.',
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
        nota: 'Com a liquidez livre, o criador remove a LP e o preço vira pó no mesmo bloco. Nenhuma outra checagem sobrevive a essa.',
        tom: 'alerta',
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // O plano de uma posição, desenhado (aba Tese). Só os rótulos; o SVG mora na
  // view. De propósito NÃO há linha de preço no desenho: o plano são níveis
  // decididos antes, e não depende de prever o caminho até eles.
  // ---------------------------------------------------------------------------
  planoDaPosicao: {
    titulo: 'A anatomia de um plano',
    legenda:
      'Todos os níveis são escritos ANTES de entrar. Não há gráfico de preço aqui de ' +
      'propósito: o plano não depende de prever o caminho — depende de ter os níveis ' +
      'decididos por você frio, para serem cumpridos por você sob pressão.',
    niveis: [
      { id: 'alvo2', rotulo: '2º alvo', detalhe: 'lucro realizado', y: 34 },
      { id: 'alvo1', rotulo: '1º alvo', detalhe: 'recupera o investido', y: 78 },
      { id: 'entrada', rotulo: 'Entrada', detalhe: 'tese + catálise escritas', y: 128, base: true },
      { id: 'invalidacao', rotulo: 'Invalidação', detalhe: 'onde você admite que errou', y: 176, alerta: true },
    ],
    restante: 'Restante: corre com regra escrita — sair se cair X% do topo, ou se a catálise falhar.',
  },

  // ---------------------------------------------------------------------------
  // Calculadoras (a matemática mora em views/modulo4.js)
  // ---------------------------------------------------------------------------
  calculadoraDeDegraus: {
    titulo: 'Onde a posição vai parar, faixa a faixa',
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
    nota:
      'A primeira faixa vende exatamente o que recupera o valor investido — por isso ela não é ' +
      'um controle, é a definição. Os números são estrutura, não recomendação: o módulo inteiro ' +
      'existe para você escrever os seus antes de entrar.',
  },

  calculadoraDeTamanho: {
    titulo: 'Quanto da carteira pode ir numa posição',
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
      'decisão sua e depende da sua vida, não do mercado. Ela diz só o que a sua própria regra ' +
      'implica. Em memecoin, invalidação em 100% ("pode ir a zero") é um cenário realista.',
  },

  calculadoraDeRecuperacao: {
    titulo: 'O que uma perda exige de volta',
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
    nota:
      'Fórmula: ganho necessário = 1 ÷ (1 − perda) − 1. É por isso que o ponto de invalidação ' +
      'existe: uma perda pequena e planejada custa pouco para recuperar; um rombo custa um ' +
      'múltiplo — e é o rombo que o custo afundado produz.',
  },

  // ---------------------------------------------------------------------------
  // Aba 5 — Mini-quiz (4 perguntas)
  // ---------------------------------------------------------------------------
  quiz: [
    {
      id: 'q1',
      pergunta: 'O que é uma catálise, na formulação de uma entrada?',
      alternativas: [
        {
          id: 'a',
          texto: 'A sensação de que o token vai subir porque o gráfico está forte.',
        },
        {
          id: 'b',
          texto:
            'O evento concreto que precisa acontecer para trazer compradores novos — listagem, graduação para a DEX, campanha, evento com data.',
        },
        { id: 'c', texto: 'O momento em que você decide vender toda a posição.' },
        { id: 'd', texto: 'A taxa paga à rede para a transação ser confirmada.' },
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
            'LP bloqueada ou queimada, mint e freeze authority revogadas, concentração dos maiores holders, bundles no lançamento e se a liquidez aguenta a sua saída.',
        },
        { id: 'c', texto: 'Quantos seguidores o projeto tem no X e o tamanho do grupo no Telegram.' },
        { id: 'd', texto: 'Apenas se o token já apareceu em algum canal de call que você segue.' },
      ],
      correta: 'b',
      explicacao:
        'A checagem técnica é a peneira que vem antes de tudo: sem LP travada, com authorities ' +
        'ativas ou com supply concentrado, nenhuma tese se sustenta. Ferramentas: RugCheck, ' +
        'Solscan/BscScan, Bubblemaps e DexScreener.',
    },
  ],
};
