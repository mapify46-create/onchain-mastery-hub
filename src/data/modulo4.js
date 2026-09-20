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
    // A ideia central do card (a frase com a borda ciano).
    emUmaFrase:
      'A tese responde "por que este token?". A catálise responde "por que agora?". Você ' +
      'precisa das duas.',
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
    // A "Pergunta rápida" que fecha o card: a pergunta q1 do quiz do módulo.
    perguntaRapida: 'q1',

    // Os parágrafos abaixo são o texto corrido da primeira versão. A tela não os
    // mostra desde o redesenho (o desenho trocou o texto pelas duas frases lado a
    // lado, acima); ficam guardados aqui como referência.
    paragrafos: [
      'A tese responde "por que este token?". É a razão para ele chamar atenção.',
      'Essa razão pode ser a narrativa que ele monta, a comunidade que já existe, o nicho que ' +
        'ele ocupa ou o momento do mercado que ele aproveita.',
      'A catálise responde "por que agora?". É o evento concreto que precisa acontecer para ' +
        'trazer compradores novos.',
      'Exemplos de catálise: uma listagem, uma campanha grande, a graduação para a DEX, um ' +
        'anúncio marcado, uma narrativa claramente crescendo esta semana.',
      'Você precisa das duas. Tese sem catálise é um token que pode ficar meses parado, ' +
        'enquanto o seu capital envelhece.',
      'Catálise sem tese é correr atrás de barulho. Quando o evento passa, não sobra nada que ' +
        'segure o preço.',
      'Escrever as duas frases antes de comprar tem um efeito prático que nada mais tem: elas ' +
        'viram o seu critério de saída.',
      'Se a catálise aconteceu e o preço não reagiu, a tese estava errada. Se a catálise foi ' +
        'cancelada, o motivo da posição sumiu.',
      'Nos dois casos, a decisão já está tomada. Tomada por você com a cabeça fria, e não às ' +
        'três da manhã com o gráfico caindo.',
    ],

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
    // didático", um parágrafo e a Pergunta rápida q2.
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
      paragrafo:
        'Realização parcial resolve o problema sem exigir que você acerte o topo. Você vende uma ' +
        'faixa e recupera o valor investido; o que sobra passa a correr por conta do lucro. A ' +
        'posição continua na mesa, mas o medo sai dela — e é o medo que piora as decisões.',
      perguntaRapida: 'q2',
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
    // um parágrafo, a tributação dentro de "Para ir mais fundo" e a Pergunta rápida q3.
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
      paragrafoFinal:
        'Esse erro, diferente de quase tudo neste mercado, não depende do token, da chain nem da ' +
        'sorte. Depende só de não ter escrito a regra antes.',
      perguntaRapida: 'q3',
      // O texto corrido da primeira versão. A tela não o mostra desde o redesenho
      // (virou o fluxograma acima); fica guardado aqui como referência.
      paragrafos: [
        'Degradação é a última das 4 fases do Módulo 2. Nela, a atenção já migrou para outro ' +
          'token.',
        'Não chegam compradores novos. Cada tentativa de venda encontra um livro de ofertas ' +
          'mais fino que o do dia anterior, com menos gente querendo comprar.',
        'O preço não cai por acaso. Cai porque ninguém está mais olhando.',
        'É exatamente aí que aparece o custo afundado ("sunk cost"). A cabeça diz que vender ' +
          'agora é "assumir o prejuízo", como se não vender mantivesse a operação viva.',
        'Mas o dinheiro já foi gasto de qualquer jeito. A única pergunta que importa: você ' +
          'compraria este token, neste preço, hoje?',
        'Se a resposta é não, a posição já está sendo encerrada. Só falta executar.',
        'Segurar por tempo demais transforma uma perda pequena e planejada num rombo que leva ' +
          'meses para recuperar.',
        'E esse erro, diferente de quase tudo neste mercado, não depende do token, da chain nem ' +
          'da sorte. Depende só de não ter escrito a regra antes.',
      ],
    },

    // Fica recolhida em "Para ir mais fundo", dentro do card do erro de segurar.
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
  // O card das seis checagens: um fluxograma em que cada pergunta tem a saída
  // "Resposta boa: siga" embaixo e a saída "Alerta: não entra" à direita. Depois,
  // um parágrafo e a Pergunta rápida q4.
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
    paragrafoFinal:
      'Tese e catálise só importam se o contrato por trás resistir a uma checagem. Estas seis ' +
      'perguntas são a peneira do Módulo 3 aplicada à decisão.',
    perguntaRapida: 'q4',
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
      'Não existe pontuação de acerto de preço. O que está sendo medido é se a decisão segue a ' +
      'regra ou o impulso.',
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
      'Todos os níveis são escritos antes de entrar. Não há gráfico de preço aqui de ' +
      'propósito: o plano não depende de prever o caminho.',
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
};
