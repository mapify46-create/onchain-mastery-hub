// modulo5.js — conteúdo do Módulo 5 (A mecânica da execução).
//
// Fusão de quatro pesquisas independentes, feitas em chats separados:
//   pt1   — as seções de texto (12 tópicos)
//   pt1-4 — fact-check de custódia e custo real, com as fontes
//   pt2   — a tabela de taxas e o exemplo numérico
//   pt3   — os diagramas e o quiz
//
// RECONCILIAÇÃO (importante para quem for editar este arquivo):
//
// 1. As três pesquisas deram números diferentes para "o custo real de uma compra":
//    1,6% (pt1), 3,2% (pt2) e 1,05% (pt3). O pt1 e o pt2 NÃO se contradizem — são
//    ordens de tamanhos diferentes com o token em pools diferentes. Por isso o
//    módulo mostra uma MATRIZ de três cenários em vez de um número único: é a
//    própria variação que ensina a lição.
// 2. O número do pt3 estava errado: o diagrama do "caminho do dinheiro" tinha
//    esquecido a taxa da pool e a gorjeta do Jito, e por isso concluía que a taxa
//    da plataforma era quase todo o custo — o oposto do que o pt2 provou com fonte
//    primária. O diagrama foi reescrito aqui com as camadas completas.
// 3. Pela mesma razão, a pergunta 4 do quiz do pt3 foi reescrita: ela dava "a taxa
//    da plataforma" como o maior custo, o que é falso numa compra pequena na
//    bonding curve (plataforma R$0,94 < custos fixos R$1,03 < pool R$1,24).
// 4. A taxa da pool na bonding curve do pump.fun é 1,25% (pt2, com a decomposição
//    oficial), não 1% (pt1).
// 5. A frase-semente "de 12 palavras" saiu do texto e foi para naoVerificado: a
//    documentação oficial fala em "recovery phrase" sem citar o número de palavras.
//
// COMO A TELA LÊ ESTE ARQUIVO (desde o redesenho de setembro de 2026):
// A página segue o desenho do dono (pesquisa/design/handoff/designs/"M5 Desktop").
// Cada aba abre com os `destaques` e depois tem um card por seção, na ordem de
// `secoes`. Cada seção tem o título, a ideia central (`emUmaFrase`), o visual (um
// campo com o nome do desenho: pilha, tabela, anatomia, modelos, caminho…), as
// frases curtas (`paragrafos`, `lista`), o "Para ir mais fundo" (`detalhe`) e a
// "Pergunta rápida" (`pergunta`: o id de uma pergunta do quiz). Tudo o que está
// em `secoes` aparece na tela.
// O texto da primeira versão do módulo (as seções longas, as tabelas em cards,
// as anatomias em SVG, o gráfico e as calculadoras antigas) não aparece mais:
// está guardado em `primeiraVersao`, no fim do arquivo, só para consulta.
//
// Abas: 'terminal' | 'custodia' | 'taxas' | 'configuracoes' | 'erros' | 'processo'.
// A aba 'quiz' é montada à parte, a partir de modulo5.quiz.

export const modulo5 = {
  id: 'modulo-5',
  titulo: 'A mecânica da execução',

  resumo:
    'Depois do mercado (Módulo 2), das ferramentas de análise (Módulo 3) e do processo ' +
    'de decisão (Módulo 4), falta a mecânica da execução — a tela onde a ordem é ' +
    'enviada. O objetivo é operacional: o que cada botão faz, quem guarda as chaves, onde ' +
    'o dinheiro vaza em taxas que ninguém anuncia e quais erros de operação são comuns. ' +
    'Nada aqui aumenta chance de lucro; tudo existe para você não perder dinheiro por ' +
    'desatenção.',

  // O parágrafo curto embaixo do título da página. O desenho usa só o fim do
  // `resumo` acima.
  subtitulo:
    'A tela onde a ordem é enviada: o que cada botão faz, quem guarda as chaves, onde o ' +
    'dinheiro vaza em taxas que ninguém anuncia e quais erros de operação são comuns. ' +
    'Nada aqui aumenta chance de lucro; tudo existe para você não perder dinheiro por ' +
    'desatenção.',

  // A caixa âmbar dentro do cabeçalho da página: o Axiom é só o exemplo. (Na
  // primeira versão era a seção "Não existe uma opção única", da aba Terminal.)
  avisoExemplo: {
    destaque: 'O Axiom é o exemplo deste módulo, não indicação.',
    texto:
      'Ele aparece porque o conteúdo precisa de uma tela real, com números reais. Photon, ' +
      'BullX (NEO), Trojan, Bonkbot, GMGN, Banana Gun, Maestro e Padre eram outras ' +
      'plataformas ativas na data da pesquisa — sem ranking nem comparação de qualidade.',
  },

  // A cotação por trás de todas as contas em reais. Aparece na aba Taxas: no fim
  // da legenda do caminho do dinheiro e embaixo da tabela da matriz.
  cotacao:
    'Contas feitas com SOL ≈ R$512, obtido por SOL→USD (mercado) × USD→BRL (Banco ' +
    'Central, 5,1253 em 04/09/2026). A cotação é suposição declarada e muda o peso das ' +
    'taxas fixas: reconfira antes de usar os valores em reais.',

  objetivos: [
    'Explicar o que é um terminal de execução e o que ele acrescenta (e cobra) em cima de uma DEX.',
    'Descobrir, na documentação oficial de uma plataforma, se as chaves ficam com você ou com ela.',
    'Somar as cinco camadas de custo de uma compra e calcular quanto sobra de fato para virar token.',
    'Explicar por que a mesma ordem custa percentuais diferentes conforme o tamanho e o lugar onde o token é negociado.',
    'Configurar slippage, priority fee e proteção de MEV entendendo o que cada erro de configuração quebra.',
    'Reconhecer os erros de execução mais comuns antes de cometê-los, e por que velocidade não é uma disputa que você vença.',
    'Percorrer o processo do "vi um token" até "encerrei a posição" sabendo onde ele deve terminar em "não opero".',
  ],

  // Mapa do módulo ("O módulo inteiro numa olhada", no topo da página): o centro
  // e as folhas curtas de cada aba, copiados do desenho (M5 Desktop, renderVals ›
  // ABAS). `aba` é o id da aba na view. O ramo do Quiz não entra aqui: a view
  // conta as perguntas de `quiz` e escreve "N perguntas".
  mapa: {
    titulo: 'A execução',
    subtitulo: 'Onde o dinheiro vaza sem o preço se mexer',
    ramos: [
      { aba: 'terminal', folhas: ['3 camadas em pilha', 'anatomia da tela'] },
      { aba: 'custodia', folhas: ['quem guarda as chaves', 'se o app sair do ar', 'fev/2026'] },
      { aba: 'taxas', folhas: ['as 5 camadas', 'a matriz 3,2 / 2,4 / 1,4%', 'atrito'] },
      { aba: 'configuracoes', folhas: ['slippage', 'prioridade', 'MEV', 'impacto de preço'] },
      { aba: 'erros', folhas: ['token impostor', 'velocidade', 'a venda não caiu?'] },
      { aba: 'processo', folhas: ['do token ao encerramento', 'registro'] },
    ],
  },

  // ---------------------------------------------------------------------------
  // As seções, na ordem da tela (o campo `aba` diz em qual aba cada uma aparece)
  //
  // Os tons (`tom`) são os estados do design system: 'neutro'; 'bom' (verde);
  // 'ruim' (vermelho); 'alerta' (âmbar). Nas tabelas, a pílula da coluna em
  // destaque usa 'ok' (verde), 'medio' (âmbar) ou 'alerta' (vermelho).
  // ---------------------------------------------------------------------------
  secoes: [
    // ================================ TERMINAL ================================
    {
      id: 'as-tres-camadas',
      aba: 'terminal',
      titulo: 'As três camadas entre a carteira e a pool',
      emUmaFrase:
        'Toda troca termina numa pool de liquidez. Muda só o que fica entre você e ela — ' +
        'e só o terminal soma uma taxa própria por cima.',
      // A pilha: o caminho da ordem, de cima para baixo, com a taxa de cada camada.
      // O terminal é a camada mais cara (vermelho); o agregador não cobra (verde).
      pilha: {
        camadas: [
          { rotulo: 'Carteira', detalhe: 'Você autoriza cada transação', taxa: 'assina', tom: 'neutro' },
          { rotulo: 'Terminal', detalhe: 'Interface, descoberta e ferramentas', taxa: '0,95%', tom: 'ruim' },
          { rotulo: 'Agregador', detalhe: 'Busca a melhor rota entre DEXs', taxa: '0%', tom: 'bom' },
          { rotulo: 'Pool da DEX', detalhe: 'Onde a troca acontece de fato', taxa: '0,25–1,25%', tom: 'alerta' },
        ],
        fim: 'O token volta para a sua carteira',
        legenda:
          'A ordem sai da carteira, passa pelo terminal e pelo agregador e chega à pool. ' +
          'Se o terminal sair do ar, a pool continua lá — e seus tokens, na sua ' +
          'carteira, desde que as chaves sejam suas.',
      },
      // As três camadas lado a lado. `colunaEmDestaque` é a coluna que importa
      // ("O que cobra"): vai com o fio ciano e com o valor numa pílula no `tom`
      // de cada linha.
      tabela: {
        rotulo: 'As três camadas, lado a lado (role na horizontal se preciso)',
        colunas: ['Camada', 'O que faz', 'O que cobra', 'Observação'],
        colunaEmDestaque: 2,
        larguraMinima: 680,
        linhas: [
          {
            titulo: 'DEX direto',
            subtitulo: 'Raydium, Orca, PumpSwap — exemplos de categoria',
            tom: 'medio',
            valores: [
              'A pool de liquidez onde a troca acontece, num contrato inteligente.',
              'Só a taxa da pool — 0,25% na Raydium, 1,25% na bonding curve do pump.fun.',
              'A mais barata e a menos confortável: sem descoberta de token, gráfico ou ' +
                'dados de holders.',
            ],
          },
          {
            titulo: 'Agregador de liquidez',
            subtitulo: 'Jupiter — exemplo de categoria',
            tom: 'ok',
            valores: [
              'Varre várias DEXs procurando a melhor rota e divide entre pools se compensar.',
              'No modo manual, sem taxa própria no swap básico.',
              'Busca preço sem cobrar por isso. É a camada que pode melhorar o seu preço.',
            ],
          },
          {
            titulo: 'Terminal de execução',
            subtitulo: 'Axiom, Photon, BullX — exemplos de categoria',
            tom: 'alerta',
            valores: [
              'Interface, descoberta de tokens, gráficos, dados de holders, botões de ' +
                'compra rápida, rastreamento.',
              'Taxa da plataforma POR CIMA de tudo — 0,95% líquido no nível de entrada.',
              'Você paga por conveniência e ferramentas, não por preço melhor.',
            ],
          },
        ],
      },
      paragrafos: [
        'Uma troca de token não acontece entre duas pessoas: acontece contra uma pool de ' +
          'liquidez, um par de reservas (SOL de um lado, o token do outro) guardado num ' +
          'contrato inteligente. Você entrega SOL e recebe token pelo preço que a ' +
          'proporção entre as reservas define na hora. Essa troca se chama swap ' +
          '("troca", em inglês).',
        'As pools ficam numa DEX (corretora descentralizada): um programa aberto na ' +
          'blockchain, sem empresa segurando o seu dinheiro, como Raydium, Orca e ' +
          'PumpSwap. Token recém-criado começa antes, numa bonding curve (curva de ' +
          'emissão): ainda não há pool com duas reservas, e sim um contrato que vende o ' +
          'token a um preço que sobe a cada compra e cai a cada venda. Por isso a taxa ' +
          'ali, 1,25% no pump.fun, é diferente dos 0,25% da Raydium.',
        'O agregador, no meio, não guarda liquidez: compara o preço de várias DEXs e ' +
          'escolhe a rota, às vezes dividindo a ordem entre duas pools. O Jupiter, no ' +
          'modo manual, não cobra taxa própria no swap básico. É a única camada que pode ' +
          'melhorar o seu preço sem cobrar por isso.',
        'O terminal é a camada de cima: a tela que mostra tokens novos, gráficos e ' +
          'holders (as carteiras que têm o token), com compra rápida e rastreamento de ' +
          'carteiras. Ele soma a taxa própria por cima de tudo: 0,95% líquido no nível ' +
          'de entrada. "Nível de entrada" é a faixa de quem opera pouco (a taxa cai em ' +
          'níveis conforme o volume); "líquido" quer dizer já descontada a devolução em ' +
          'SOL que a plataforma dá. Você paga por conveniência, não por preço melhor — é ' +
          'onde o marketing da categoria mais escorrega.',
        'Na tela você vê só um campo, um botão e uma taxa; a pilha abaixo é o que ' +
          'acontece depois do clique.',
      ],
      exemplo: {
        titulo: 'A mesma troca, por três caminhos',
        passos: [
          'Pela pool direto, na Raydium: só a taxa da pool, 0,25%.',
          'Pelo agregador (Jupiter, modo manual): nenhuma taxa própria; a da DEX por ' +
            'baixo continua.',
          'Pelo terminal: tudo isso, mais os 0,95% líquidos do Axiom por cima.',
          'O token que chega à carteira é o mesmo nos três. Muda quanto do seu dinheiro ' +
            'chegou à pool.',
        ],
      },
      paragrafosFinais: [
        'O erro que a pilha evita é achar que a troca acontece no terminal. Ele é a ' +
          'vitrine; a troca é na pool — por isso a taxa dele se soma às outras, nunca as ' +
          'substitui.',
      ],
      detalhe: {
        titulo: 'as letras miúdas de cada camada',
        lista: [
          'Raydium: dos 0,25%, 0,22% vão para quem forneceu a liquidez e 0,03% para ' +
            'recompra de RAY, o token da Raydium.',
          'Jupiter: a taxa que ele não cobra se chama taxa de protocolo.',
          'Axiom: 0,95% líquido no nível de entrada e 0,75% no topo, com devolução em ' +
            'SOL de 0,05% a 0,25%. Os limiares de volume de cada nível não são ' +
            'publicados: não dá para calcular quanto operar para pagar menos.',
          'O terminal quase sempre usa um agregador por baixo: você usa essa camada sem ver.',
        ],
      },
    },
    {
      id: 'anatomia-da-tela',
      aba: 'terminal',
      titulo: 'Anatomia da tela de um terminal',
      emUmaFrase:
        'O que cada painel mostra, e o que não prova. Ler os painéis reduz surpresa; não ' +
        'garante segurança.',
      // O mockup: uma grade de painéis sem valores, ao lado da legenda numerada.
      //   paineis  o rótulo de cada painel; `alerta` pinta de âmbar (o botão).
      //   linhas   a grade, linha a linha: as colunas, os painéis e a altura
      //            mínima de cada painel (em px).
      //   itens    a legenda. O número de cada painel é a posição dele aqui.
      anatomia: {
        paineis: {
          grafico: { rotulo: 'Gráfico de preço' },
          numeros: { rotulo: 'Market cap · Volume · Liquidez' },
          holders: { rotulo: 'Holders' },
          transacoes: { rotulo: 'Transações recentes' },
          quantia: { rotulo: 'Quantia' },
          comprar: { rotulo: 'Comprar', alerta: true },
        },
        linhas: [
          { colunas: '2fr 1fr', paineis: ['grafico', 'numeros'], altura: 58 },
          { colunas: '2fr 1fr', paineis: ['transacoes', 'holders'], altura: 52 },
          { colunas: '1fr 1fr', paineis: ['quantia', 'comprar'], altura: 44 },
        ],
        nota:
          'Ilustração esquemática, não é a tela de nenhuma plataforma. Sem valores de ' +
          'propósito: o que se aprende é onde olhar.',
        itens: [
          {
            painel: 'grafico',
            titulo: 'Gráfico de preço',
            texto: 'Mostra o passado. Correr atrás da alta que já aconteceu é erro de disciplina, não de análise.',
          },
          {
            painel: 'numeros',
            titulo: 'Market cap, volume e liquidez',
            texto: 'Para a SUA ordem, o que importa é a liquidez: em pool rasa, a sua própria compra move o preço. Daí vem o slippage.',
          },
          {
            painel: 'holders',
            titulo: 'Distribuição de holders',
            texto: 'Poucas carteiras com fatia grande significam risco de despejo. É a checagem de concentração do Módulo 3.',
          },
          {
            painel: 'transacoes',
            titulo: 'Feed de transações',
            texto: 'Quatro ou mais compras no mesmo bloco podem ser bundle: compra combinada fingindo ser espontânea. A própria documentação admite que o alerta erra.',
          },
          {
            painel: 'quantia',
            titulo: 'Campo de quantia',
            texto: 'Confira o valor antes de clicar. A compra rápida executa o valor salvo, sem revisão — e ele pode ser o da operação anterior.',
          },
          {
            painel: 'comprar',
            titulo: 'O botão',
            texto: 'Executa com o slippage, a prioridade e a proteção contra robôs (MEV) salvos. Se algum estiver errado, o erro vira prejuízo aqui.',
          },
        ],
        legenda:
          'Nenhum indicador, sinal social ou rastreamento de carteira é prova de que um ' +
          'token é seguro.',
      },
      paragrafos: [
        'Toda tela de terminal tem as mesmas peças: gráfico, tira de números, lista de ' +
          'holders, feed do que está sendo negociado, campo de quantia e botão. A grade ' +
          'abaixo mostra a divisão sem valores: aqui se aprende onde olhar.',
        'Cada painel responde a uma pergunta. O gráfico conta o passado (cada barrinha ' +
          'dele, a vela, é o preço num intervalo de tempo); os números, o tamanho; os ' +
          'holders, a concentração; o feed, o ritmo. Nenhum diz se o token é seguro nem ' +
          'para onde o preço vai.',
        'Market cap é o valor de mercado: preço vezes quantidade em circulação. Liquidez ' +
          'é o tamanho da reserva da pool, o dinheiro de fato disponível para trocar. ' +
          'Bundle é um pacote de transações enviadas juntas para o mesmo bloco.',
        'Para a SUA ordem, o painel que pesa é o da liquidez: em pool rasa, a sua ' +
          'própria compra empurra o preço antes de executar. Essa distância entre o ' +
          'preço que você viu e o que pagou é o slippage (deslizamento), tema da aba ' +
          'Configurações.',
      ],
      exemplo: {
        titulo: 'Os dois painéis de baixo, que ninguém lê',
        passos: [
          'O campo de quantia guarda o último valor que você usou.',
          'A compra rápida executa esse valor num clique, sem tela de revisão.',
          'Se a operação anterior foi maior, é o valor maior que está ali.',
          'O painel mais perigoso não é o gráfico: é o campo que você acha que já conferiu.',
        ],
      },
      paragrafosFinais: [
        'O erro que essa leitura evita é confundir painel cheio com token verificado — e ' +
          'correr atrás da vela que já subiu, que é falha de disciplina, não de análise.',
      ],
    },

    // ================================ CUSTÓDIA ================================
    {
      id: 'custodia-do-axiom',
      aba: 'custodia',
      titulo: 'Custodial × não-custodial: os sinais na tela',
      emUmaFrase:
        'Antes de usar qualquer plataforma, pergunte: quem guarda as chaves? A resposta ' +
        'muda o seu risco por completo.',
      // Os dois modelos lado a lado: três sinais na tela de cada um (o painel, em
      // fonte mono, e o que ele quer dizer) e a consequência, na cor do modelo.
      modelos: [
        {
          nome: 'Custodial',
          tom: 'ruim',
          sinais: [
            { painel: 'Saldo na plataforma', texto: 'O dinheiro sai da sua carteira e vira um saldo dentro da empresa.' },
            { painel: 'Botão "Depositar"', texto: 'Sinal de custódia. Quem tem as chaves tem o dinheiro.' },
            { painel: 'Chaves: nos servidores', texto: 'É o risco de contraparte do Módulo 1.' },
          ],
          consequencia: 'Se a plataforma cair, for hackeada ou agir de má-fé, o saldo vai junto.',
        },
        {
          nome: 'Não-custodial',
          tom: 'bom',
          sinais: [
            { painel: 'Saldo na sua carteira', texto: 'O dinheiro fica na blockchain, no seu endereço.' },
            {
              painel: 'Frase de recuperação exportável',
              texto: 'Sinal de autocustódia: uma empresa que te entrega a semente não está guardando o seu dinheiro.',
            },
            { painel: 'Chaves: com você', texto: 'A responsabilidade de segurança também é 100% sua.' },
          ],
          consequencia:
            'Se o app sair do ar, você importa a semente em outra carteira e continua com acesso.',
        },
      ],
      // O que o leitor de tela ouve no lugar dos dois modelos.
      descricaoDosModelos:
        'Custodial: saldo na plataforma, botão de depositar, chaves nos servidores — se ' +
        'a plataforma cair, o saldo vai junto. Não-custodial: saldo na sua carteira, ' +
        'frase de recuperação exportável, chaves com você — se o app sair do ar, você ' +
        'importa a semente em outra carteira.',
      legendaDosModelos:
        'Desenho esquemático, não é captura de nenhuma plataforma. Pela documentação ' +
        'oficial, o Axiom, exemplo deste módulo, é não-custodial; vários bots de ' +
        'Telegram são custodiais. Confira antes de depositar qualquer coisa.',
      paragrafos: [
        'A chave privada assina as transações: quem tem a chave move o dinheiro, e quem ' +
          'não tem não move — nem sendo o dono. Custodial é quando a empresa guarda a ' +
          'chave por você e o seu dinheiro vira saldo no sistema dela, como numa ' +
          'corretora. Não-custodial é o contrário: a chave fica com você, o saldo fica ' +
          'na blockchain, e a plataforma só monta a transação e pede a sua assinatura.',
        'Isso muda a natureza do risco. No custodial entra o risco de contraparte do ' +
          'Módulo 1: se a empresa cair, for invadida ou agir de má-fé, o saldo vai ' +
          'junto, porque era uma promessa dela. No não-custodial esse risco some e entra ' +
          'a responsabilidade: nenhum suporte recupera fundos, reverte assinatura ou ' +
          'desfaz operação ruim.',
        'Três sinais na tela dizem o modelo: onde está o saldo, se existe botão ' +
          '"Depositar" e se existe frase de recuperação exportável (a semente, a lista ' +
          'de palavras que recria a carteira em outro aplicativo). A semente é o sinal ' +
          'mais forte: a empresa não teria como entregá-la se o dinheiro não fosse seu.',
      ],
      listaTitulo: 'O que a documentação oficial do Axiom diz',
      lista: [
        'A FAQ do Axiom afirma que os seus ativos "estão sempre sob o seu controle e de ' +
          'mais ninguém", e que fundos e transações são inteiramente on-chain.',
        'A página de cadastro ensina a ver a frase de recuperação nas configurações, a ' +
          'qualquer momento.',
        'A mesma página recomenda importar a semente numa carteira comum, como Phantom, ' +
          'Rabby ou Solflare, "para garantir que você sempre tenha acesso direto aos ' +
          'seus fundos sob quaisquer circunstâncias".',
      ],
      exemplo: {
        titulo: 'O teste de dois minutos, em qualquer plataforma',
        passos: [
          'Nas configurações, procure uma frase de recuperação visível a qualquer momento.',
          'Na tela principal, procure botão "Depositar" e um saldo que não é o da sua carteira.',
          'Frase exportável: as chaves são suas (não-custodial), e a segurança é 100% sua.',
          'Depósito e saldo interno: as chaves são da empresa (custodial). Trate como corretora — o ' +
            'que está lá depende de ela continuar de pé.',
        ],
      },
      paragrafosFinais: [
        'O erro que isso evita é supor o modelo pela aparência: várias ferramentas de ' +
          'Telegram criam a carteira nos servidores delas, e ela continua parecendo sua. ' +
          'Confira antes de depositar, nunca depois.',
      ],
    },
    {
      id: 'o-risco-real-e-o-frontend',
      aba: 'custodia',
      titulo: 'Se o app sair do ar',
      emUmaFrase:
        'Com as chaves na sua mão, o maior risco é o terminal travar na hora em que você ' +
        'precisa vender.',
      // O fluxograma está em `diagramas` (id 'fora-do-ar'), com a legenda do caso
      // de agosto de 2025.
      diagrama: 'fora-do-ar',
      paragrafos: [
        'O terminal é um site, e sites saem do ar. A blockchain não cai junto: pools e ' +
          'contratos seguem funcionando, e os tokens seguem no seu endereço. Some só a ' +
          'porta de entrada.',
        'Mas ter as chaves não é ter acesso: se a única forma de assinar é aquela tela, ' +
          'você está preso a ela. A semente exportada e guardada fora do computador ' +
          'transforma "as chaves são minhas" em capacidade — se estiver pronta ANTES de ' +
          'você precisar.',
        'O plano B é importar a semente numa carteira comum (Phantom, Rabby ou Solflare, ' +
          'citadas na documentação) e negociar direto no site da DEX ou do agregador. É ' +
          'menos confortável: um inconveniente, não uma parede.',
      ],
      exemplo: {
        titulo: 'O ensaio que se faz uma vez, sem pressa',
        passos: [
          'Exporte a frase de recuperação e anote no papel, fora do computador.',
          'Importe a frase numa carteira comum, como Phantom, Rabby ou Solflare.',
          'Confira os saldos: eles sempre estiveram na blockchain, nunca no terminal.',
          'Abra o site da DEX ou do agregador com essa carteira e veja a tela de troca.',
          'Pronto: terminal fora do ar vira inconveniente, não uma posição que você não ' +
            'consegue encerrar.',
        ],
      },
      paragrafosFinais: [
        'O erro que esse ensaio evita é descobrir que o plano B não existia no dia em ' +
          'que já não dá tempo de montá-lo.',
      ],
    },
    {
      id: 'incidente-fevereiro-2026',
      aba: 'custodia',
      titulo: 'O incidente de fevereiro de 2026 e o que ele ensina',
      emUmaFrase: '"Não-custodial" protege o seu dinheiro. Não protege a sua privacidade.',
      // Dois cartões com borda de 2px: o que o incidente NÃO foi (verde) e o que foi
      // (vermelho).
      cartoes: [
        {
          rotulo: 'O que NÃO foi',
          texto:
            'Invasão de contrato, roubo de chaves ou saque de fundos. Nenhum fundo foi ' +
            'reportado como roubado e nenhuma chave privada como exposta.',
          tom: 'bom',
        },
        {
          rotulo: 'O que foi',
          texto:
            'Abuso de privilégio interno: gente de dentro olhando dados de usuários. O ' +
            'painel dava visibilidade, não controle.',
          tom: 'ruim',
        },
      ],
      descricaoDosCartoes:
        'O que não foi: invasão de contrato, roubo de chaves ou saque de fundos — nenhum ' +
        'fundo reportado como roubado e nenhuma chave privada como exposta. O que foi: ' +
        'abuso de privilégio interno, gente de dentro olhando dados de usuários. O ' +
        'painel dava visibilidade, não controle.',
      paragrafos: [
        'Em 26 de fevereiro de 2026, o investigador on-chain ZachXBT publicou uma ' +
          'investigação alegando que funcionários abusaram de ferramentas internas de ' +
          'suporte para consultar carteiras e histórico de usuários, por cerca de dez ' +
          'meses. Em poucas horas a empresa confirmou, disse estar "chocada e ' +
          'decepcionada", removeu o acesso e prometeu investigar (CoinDesk, 26/02/2026).',
        'Isso se chama abuso de privilégio interno: mau uso do acesso que funcionários ' +
          'têm às ferramentas de suporte para atender chamados. Esse acesso mostra dados ' +
          '(carteira, histórico, posições), mas não assina transações — as chaves não ' +
          'estavam ali.',
        'Perder o dinheiro exige a sua chave privada; para perder a privacidade, basta ' +
          'alguém ver o que você faz. Num mercado que vende rastreamento de carteiras na ' +
          'própria tela, saber o que você comprou e quando vale dinheiro — e a ' +
          'plataforma tem essa informação por desenho, porque monta as suas ordens.',
        'Não há configuração para isso; há higiene: uma carteira separada só para ' +
          'operar, sem o seu histórico financeiro inteiro num único endereço.',
      ],
      exemplo: {
        titulo: 'As duas perguntas que o incidente separa',
        passos: [
          '"Podem tirar o meu dinheiro?" Só com a minha chave privada, e nenhuma foi ' +
            'reportada como exposta.',
          '"Podem ver o que eu faço?" Sim, e por cerca de dez meses alguém de dentro fez isso.',
          'A primeira resposta depende do modelo de custódia. A segunda, não: as duas ' +
            'são independentes.',
        ],
      },
      paragrafosFinais: [
        'A conclusão não é "fuja desta plataforma", e sim assumir que quem opera um ' +
          'terminal vê o que você faz nele. O erro que isso evita é ler "não-custodial" ' +
          'como carimbo geral de segurança: ele responde a uma pergunta só.',
      ],
    },

    // ================================== TAXAS ==================================
    {
      id: 'a-taxa-anunciada-nao-e-o-custo',
      aba: 'taxas',
      titulo: 'A taxa anunciada é a menor das camadas',
      emUmaFrase:
        'O número anunciado é só a fatia da plataforma. Uma compra tem cinco camadas de ' +
        'custo, e as outras quatro também saem do seu bolso.',
      // O caminho do dinheiro: as cinco camadas, cada uma com o valor à direita.
      // `tom`: 'suave' (valor em cinza), 'neutro', 'anunciada' (roxo, com a pílula
      // `seloDaAnunciada`) ou 'alerta' (âmbar, a maior camada).
      caminho: {
        titulo: 'O caminho do dinheiro numa compra de R$100 num token na bonding curve',
        passos: [
          {
            rotulo: 'Taxa-base da rede Solana',
            detalhe: '0,000005 SOL por assinatura — cobrada mesmo se a transação falhar',
            valor: 'fração de centavo',
            tom: 'suave',
          },
          {
            rotulo: 'Priority fee',
            detalhe: 'Para a transação ser incluída mais rápido. Padrão do Axiom',
            valor: '0,001 SOL',
            tom: 'neutro',
          },
          {
            rotulo: 'Gorjeta de MEV (via Jito)',
            detalhe: 'Compra proteção contra ataque de sandwich. Padrão do Axiom',
            valor: '0,001 SOL',
            tom: 'neutro',
          },
          {
            rotulo: 'Taxa da plataforma',
            detalhe: '0,95% líquido no nível de entrada',
            valor: '≈ R$0,94',
            tom: 'anunciada',
          },
          {
            rotulo: 'Taxa da pool',
            detalhe: '1,25% na bonding curve — normalmente a maior camada num token novo',
            valor: '≈ R$1,24',
            tom: 'alerta',
          },
        ],
        seloDaAnunciada: 'a única anunciada',
        total: { rotulo: 'Total, sem contar o slippage', valor: '≈ R$3,20 · 3,2%' },
        // A tela junta a `cotacao` (lá no topo do arquivo) no fim desta legenda.
        legenda:
          'A taxa anunciada (R$0,94) foi a MENOR das três partes — menor que os custos ' +
          'fixos (R$1,03) e que a taxa da pool (R$1,24). O slippage é custo à parte e ' +
          'não entra nesta conta.',
      },
      paragrafos: [
        'Uma compra cobra em cinco lugares. A taxa-base da rede Solana, 0,000005 SOL por ' +
          'assinatura, é fração de centavo e é cobrada mesmo se a transação falhar. O ' +
          'priority fee (taxa de prioridade) é um extra ao validador para a sua ' +
          'transação passar na frente quando há fila: 0,001 SOL no padrão do Axiom. A ' +
          'gorjeta de MEV, enviada via Jito, é outros 0,001 SOL no padrão.',
        'MEV (maximal extractable value, "valor máximo extraível") é o lucro que quem ' +
          'monta os blocos consegue tirar escolhendo a ordem das transações. O caso mais ' +
          'conhecido é o ataque de sandwich (sanduíche): um robô vê a sua compra na ' +
          'fila, compra um instante antes, deixa a sua executar mais cara e vende logo ' +
          'depois, embolsando a diferença — a sua ordem fica espremida entre as duas ' +
          'dele. A gorjeta paga um caminho que tira a sua ordem dessa vitrine; o Jito é ' +
          'o serviço por onde ela vai.',
        'A quarta camada é a taxa da plataforma, 0,95% líquido no nível de entrada — a ' +
          'única das cinco que aparece no marketing. A quinta é a taxa da pool: 1,25% na ' +
          'bonding curve, normalmente a maior num token novo.',
        'Na compra de R$100 do desenho, a anunciada saiu por cerca de R$0,94; os custos ' +
          'fixos (rede, prioridade e gorjeta), R$1,03; a pool, R$1,24. A anunciada foi a ' +
          'MENOR das três. O total, sem o slippage, ficou em cerca de R$3,20, ou 3,2% — ' +
          'mais de três vezes o número da vitrine.',
        'Na tela nada vem somado: a taxa da plataforma está numa página, prioridade e ' +
          'gorjeta numa configuração em SOL (não em reais), e a da pool nem aparece — ' +
          'sai de dentro da troca. Somar as cinco é trabalho seu, e o único jeito de ' +
          'saber quanto virou token.',
      ],
      exemplo: {
        titulo: 'R$100 viram quanto de token?',
        passos: [
          'Rede, priority fee e gorjeta (0,000005 + 0,001 + 0,001 SOL): cerca de R$1,03.',
          'Taxa da plataforma, 0,95% líquido: cerca de R$0,94 — a única anunciada.',
          'Taxa da pool, 1,25% na bonding curve: cerca de R$1,24 — a maior das camadas.',
          'Total: cerca de R$3,20, ou 3,2% da ordem, sem contar o slippage.',
        ],
      },
      paragrafosFinais: [
        'O erro que isso evita é comparar plataformas pelo número anunciado: duas telas ' +
          'com a mesma taxa cobram totais diferentes, conforme onde o token está e ' +
          'quanto você move. É o que a próxima seção mede.',
      ],
      detalhe: {
        titulo: 'quem recebe o priority fee e a gorjeta',
        paragrafos: [
          'Não são receita da plataforma: vão para validadores — e são justamente as que ' +
            'ficam fora do número anunciado. A taxa-base da rede (0,000005 SOL por ' +
            'assinatura) é cobrada mesmo quando a transação falha.',
        ],
      },
    },
    {
      id: 'o-venue-muda-o-custo',
      aba: 'taxas',
      titulo: 'A matriz: a mesma plataforma, três custos diferentes',
      emUmaFrase:
        'Não existe um número único para "quanto custa operar": o tamanho da ordem e o ' +
        'lugar onde o token está mudam a conta inteira.',
      // Barras empilhadas, todas na mesma escala: cada barra é uma compra da
      // matriz, repartida nas camadas, em % da ordem. `cor`: 'acento' (ciano),
      // 'primaria' (roxo) e 'alerta' (âmbar). O total escrito é o da matriz
      // (3,2%); a primeira barra soma 1,03 + 0,94 + 1,24 = 3,21 e é a mais longa.
      barras: {
        partes: [
          { chave: 'fixos', rotulo: 'custos fixos (rede, prioridade, gorjeta)', curto: 'fixos', cor: 'acento' },
          { chave: 'plataforma', rotulo: 'taxa da plataforma (a anunciada)', curto: 'plataforma', cor: 'primaria' },
          { chave: 'pool', rotulo: 'taxa da pool', curto: 'pool', cor: 'alerta' },
        ],
        grupos: [
          {
            rotulo: 'R$100, bonding curve',
            total: '3,2%',
            valores: { fixos: 1.03, plataforma: 0.94, pool: 1.24 },
            nota: 'O cenário mais caro dos três. Os custos fixos pesam cerca de 1% da ordem.',
          },
          {
            rotulo: 'R$512, bonding curve',
            total: '2,4%',
            valores: { fixos: 0.2, plataforma: 0.95, pool: 1.25 },
            nota: 'Só o tamanho mudou: os mesmos 0,002 SOL agora pesam cerca de 0,2%.',
          },
          {
            rotulo: 'R$512, AMM madura',
            total: '1,4%',
            valores: { fixos: 0.2, plataforma: 0.95, pool: 0.25 },
            nota: 'Mesma plataforma, tamanho e dia — só mudou onde o token está.',
          },
        ],
        legenda:
          'Cada barra é uma compra, repartida nas camadas, em porcentagem da ordem, ' +
          'todas na mesma escala. A faixa roxa, a única anunciada, é quase do mesmo ' +
          'tamanho nas três.',
        // O que o leitor de tela ouve no lugar das barras: a `abertura`, os números
        // de cada barra (com o nome `curto` de cada parte) e a `conclusao`.
        abertura:
          'Três compras na mesma escala, repartidas em custos fixos, taxa da plataforma ' +
          'e taxa da pool',
        conclusao: 'A taxa da plataforma é quase do mesmo tamanho nas três.',
      },
      // A matriz em tabela. A coluna em destaque é o custo total; a tela põe a
      // `cotacao` embaixo da tabela.
      tabela: {
        rotulo: 'A matriz de custo, cenário a cenário (role na horizontal se preciso)',
        colunas: ['Cenário', 'Taxa da pool', 'Peso dos custos fixos', 'Custo total'],
        colunaEmDestaque: 3,
        larguraMinima: 640,
        linhas: [
          {
            titulo: 'Ordem de R$100, token na bonding curve',
            subtitulo: 'O cenário mais caro dos três',
            tom: 'alerta',
            valores: ['1,25% ≈ R$1,24', '0,002 SOL ≈ R$1,03 — cerca de 1% da ordem', '≈ R$3,20 · 3,2%'],
          },
          {
            titulo: 'Ordem de R$512, mesmo token na bonding curve',
            subtitulo: 'Só o tamanho mudou',
            tom: 'medio',
            valores: ['1,25% ≈ R$6,39', '0,002 SOL ≈ R$1,03 — cerca de 0,2% da ordem', '≈ R$12,27 · 2,4%'],
          },
          {
            titulo: 'Ordem de R$512, token já em AMM madura',
            subtitulo: 'Mesmo terminal e tamanho, token em outro lugar',
            tom: 'ok',
            valores: ['0,25% ≈ R$1,28', '0,002 SOL ≈ R$1,03 — cerca de 0,2% da ordem', '≈ R$7,16 · 1,4%'],
          },
        ],
      },
      paragrafos: [
        'Venue ("local", em inglês) é onde o token é negociado, e isso muda ao longo da ' +
          'vida do token. Nasce na bonding curve e, se juntar compradores suficientes, ' +
          'gradua: ganha uma pool oficial, com reservas dos dois lados, numa AMM. AMM ' +
          '(automated market maker, criador de mercado automático) é o contrato que ' +
          'calcula o preço sozinho a partir das duas reservas. A Raydium é o exemplo de ' +
          'AMM madura, já estabelecida, com taxa padrão de 0,25%.',
        'A matriz abaixo é a mesma plataforma, no mesmo dia, em três situações. Nenhuma ' +
          'taxa de tabela mudou: a fatia da plataforma ficou perto de 0,95% nas três.',
        // O desenho escreveu "R$100 ou a R$1.000" na primeira frase; a pesquisa diz
        // "R$50 ou a R$5.000" — vale a pesquisa.
        'Parte do custo é fixa: priority fee e gorjeta somam 0,002 SOL no padrão e ' +
          'custam igual se você move R$50 ou R$5.000. Numa ordem de R$100 pesam cerca de ' +
          '1%; numa dez vezes maior, cerca de 0,1%.',
        'O salto maior vem do lugar: entre a segunda e a terceira linha, só mudou onde o ' +
          'token estava. A taxa da pool caiu de 1,25% para 0,25%, e o total, de 2,4% ' +
          'para 1,4%. Token muito novo custa mais caro por mecânica, antes de o preço ' +
          'fazer qualquer coisa.',
        'Na tela, o lugar aparece numa etiqueta discreta com a pool ou o nome da DEX ao ' +
          'lado do par. Olhe antes de definir o tamanho: é o fator que você não controla ' +
          'no clique. E toda operação é ida e volta: você paga ao comprar e de novo ao ' +
          'vender, inclusive no prejuízo.',
      ],
      exemplo: {
        titulo: 'As mesmas taxas, três contas diferentes',
        passos: [
          'R$100 na bonding curve: pool 1,25% ≈ R$1,24, plataforma ≈ R$0,94, custos ' +
            'fixos 0,002 SOL ≈ R$1,03 (cerca de 1% da ordem). Total ≈ R$3,20 · 3,2%.',
          'R$512 na mesma curva: pool ≈ R$6,39, custos fixos ≈ R$1,03 (agora cerca de ' +
            '0,2%). Total ≈ R$12,27 · 2,4%.',
          'R$512 em AMM madura: pool 0,25% ≈ R$1,28, os mesmos custos fixos. Total ≈ ' +
            'R$7,16 · 1,4%.',
          'Da primeira para a segunda conta, só mudou o tamanho. Da segunda para a ' +
            'terceira, só o lugar.',
        ],
      },
      paragrafosFinais: [
        'O erro que a matriz evita é decorar um número. Quem guarda "operar custa 1%" ' +
          'subestima a conta por três vezes justo onde o iniciante mais opera: ordem ' +
          'pequena, token recém-lançado. O remédio é saber qual das três contas é a sua ' +
          'antes de clicar.',
      ],
      detalhe: {
        titulo: 'o caminho do token e o estudo da Uniswap Labs',
        ordenada: true,
        lista: [
          'Bonding curve do pump.fun: taxa da pool de 1,25% — oficialmente 0,300% para o ' +
            'criador do token e 0,95% para o protocolo.',
          'PumpSwap: o token graduou e ganhou a pool oficial. A taxa segue em 1,25% ' +
            'enquanto o market cap é pequeno e cai por faixas conforme cresce.',
          'AMM madura, como a Raydium: taxa padrão de 0,25%.',
        ],
        paragrafos: [
          'Ponto-base, a unidade em que custos assim costumam ser medidos, é um ' +
            'centésimo de ponto percentual.',
          'Um estudo com 534 mil negociações reais (Adams, Chan, Markovich & Wan, ' +
            '"Don\'t Let MEV Slip", Financial Cryptography 2024, da Uniswap Labs) mediu ' +
            'o custo total efetivo — taxa, deslizamento e o que robôs de MEV extraem: ' +
            '140 pontos-base por dólar negociado numa memecoin popular, contra 22 num ' +
            'par de moedas estáveis, seis vezes mais. A chance de deslizamento causado ' +
            'por robô foi cerca de 80% maior na memecoin — e a pool estudada era mais ' +
            'funda que a da maioria das memecoins recém-lançadas.',
        ],
      },
    },
    {
      id: 'calculadora-de-atrito',
      aba: 'taxas',
      titulo: 'Quanto o atrito come, com o mercado parado',
      emUmaFrase:
        'Cada operação cobra o pedágio na ida e na volta. Isto é aritmética de custo, ' +
        'não previsão: o preço fica parado para isolar o atrito.',
      // A calculadora (a conta mora na view): sobra = (1 − custo) ^ operações.
      // Os atalhos são os três custos da matriz, acima.
      calculadora: {
        operacoes: { rotulo: 'Operações completas (comprar e vender)', min: 1, max: 100, passo: 1, valor: 20 },
        custo: { rotulo: 'Custo de cada ida e volta', min: 0.5, max: 8, passo: 0.1, valor: 3.2 },
        atalhos: [
          { valor: 3.2, rotulo: '3,2% (R$100, bonding curve)' },
          { valor: 2.4, rotulo: '2,4% (R$512, bonding curve)' },
          { valor: 1.4, rotulo: '1,4% (R$512, AMM madura)' },
        ],
        nota:
          'No mundo real o preço também se move, para os dois lados, e o atrito acontece ' +
          'por cima disso.',
        rotuloDaSobra: 'Sobra do capital, com o preço parado',
        legenda:
          'Cada barra é o capital depois de uma ida e volta, da esquerda para a direita. ' +
          'Fórmula: sobra = (1 − custo) elevado ao número de operações.',
      },
      paragrafos: [
        'Atrito é o custo que existe só por operar: taxas, e nada mais. A calculadora ' +
          'congela o preço de propósito (o token não sobe nem cai entre a compra e a ' +
          'venda) e pergunta quanto do capital sobra depois de passar várias vezes pelo ' +
          'pedágio.',
        'O atrito é a única parte certa do resultado: ganho é hipótese, custo é fato. E ' +
          'ele multiplica, não soma: cada ida e volta cobra sobre o que sobrou da ' +
          'anterior. São os juros compostos ao contrário.',
        'Escolha o número de operações completas (cada uma, uma compra e a venda ' +
          'correspondente) e o custo de cada ida e volta; os atalhos são os três ' +
          'cenários da matriz. O número que sai não é previsão de perda. É o piso: ' +
          'quanto o preço precisaria andar a seu favor só para você voltar ao ponto de ' +
          'partida.',
      ],
      quadro: [
        {
          rotulo: 'O que a conta supõe',
          texto:
            'Preço exatamente parado entre a compra e a venda, e o mesmo custo ' +
            'percentual em todas as operações.',
        },
        {
          rotulo: 'O que ela não inclui',
          texto:
            'Qualquer movimento de preço, para cima ou para baixo, e o slippage, que é ' +
            'custo à parte e vem por cima.',
          destaque: true,
        },
      ],
      exemplo: {
        titulo: 'Como rodar uma vez, do jeito certo',
        passos: [
          'Deixe o primeiro controle em 20 operações completas.',
          'Clique em 3,2% (R$100 num token na bonding curve) e leia quanto sobrou de ' +
            'cada R$100, com o preço parado.',
          'Clique em 1,4% (R$512 numa AMM madura) e compare.',
          'A diferença é o preço de operar pequeno em token muito novo — repetido vinte vezes.',
        ],
      },
      paragrafosFinais: [
        'O erro que este número evita é contar só os acertos: o atrito não aparece nas ' +
          'operações que deram certo, porque já foi descontado antes. A pergunta certa é ' +
          '"quanto sobrou do capital depois de todas".',
      ],
    },

    // ============================== CONFIGURAÇÕES ==============================
    {
      id: 'slippage-priority-mev',
      aba: 'configuracoes',
      titulo: 'As três configurações que quebram a operação',
      emUmaFrase:
        'Elas só decidem se a transação executa, falha ou é explorada. Nenhuma aumenta ' +
        'chance de lucro.',
      // Um cartão por configuração: o que é, e o que quebra quando fica baixa
      // demais (caixa vermelha) ou alta demais (caixa âmbar).
      configs: [
        {
          nome: 'Slippage',
          oQueE: 'Quanto o preço pode mudar entre enviar a ordem e ela executar.',
          baixo: 'a transação falha com "slippage exceeded" e você perde a taxa de rede.',
          alto: 'você aceita um preço muito pior — e, numa pool rasa, vira alvo fácil de bots.',
        },
        {
          nome: 'Priority fee',
          oQueE: 'Pagamento extra ao validador para a sua transação entrar mais rápido.',
          baixo: 'no congestionamento, demora ou falha por não ser incluída a tempo.',
          alto: 'paga caro à toa.',
        },
        {
          nome: 'Proteção de MEV',
          oQueE:
            'Defesa contra bots que se posicionam em volta da sua ordem. No Axiom há ' +
            'três modos: Off, Reduced e Secure.',
          baixo: 'no modo Off, exposto a front-running.',
          alto:
            'o modo Secure é o mais protegido e possivelmente mais lento — a ' +
            'documentação recomenda usá-lo sempre que possível.',
        },
      ],
      rotulosDosConfigs: { baixo: 'Baixo demais:', alto: 'Alto demais:' },
      // O fluxograma do slippage mal configurado está em `diagramas`.
      diagrama: 'slippage-mal-configurado',
      paragrafos: [
        'Slippage (deslizamento) é a distância entre o preço que você viu e o preço em ' +
          'que a transação executa: entre o clique e o bloco, outras pessoas negociam na ' +
          'mesma pool. O que você configura é o limite: "slippage de 1%" quer dizer "se ' +
          'o preço piorar mais que isso, cancele a minha ordem".',
        'Priority fee (taxa de prioridade) é um extra ao validador para a sua transação ' +
          'ser escolhida antes quando há fila — um leilão por lugar na fila, não taxa da ' +
          'plataforma. O padrão do Axiom é 0,001 SOL, e a plataforma afirma calcular ' +
          'valores recomendados conforme as transações do momento.',
        'A proteção de MEV defende contra robôs que se posicionam em volta da sua ordem, ' +
          'como no sanduíche da aba Taxas. No Axiom há três modos: Off (desligado), ' +
          'Reduced (reduzido) e Secure (seguro).',
        'As três erram para os dois lados, e cada lado quebra uma coisa (os cartões ' +
          'abaixo). "Slippage exceeded" quer dizer deslizamento excedido: a transação ' +
          'falhou e a taxa de rede foi paga. Front-running é alguém passar na frente da ' +
          'sua ordem. Não é opinião do módulo: a documentação da Solana diz que limitar ' +
          'o slippage é a defesa mais eficaz contra ataques de sandwich, e a do Axiom ' +
          'recomenda o modo Secure sempre que possível.',
        'As três ficam atrás de uma engrenagem perto do campo de quantia e ficam salvas: ' +
          'o valor que está lá é o da última vez que você mexeu, talvez numa pool bem ' +
          'diferente da de hoje.',
      ],
      exemplo: {
        titulo: '40% de slippage numa pool rasa',
        passos: [
          'Você configura 40% para a ordem não falhar de jeito nenhum.',
          'A pool é rasa: a sua própria compra já empurra bastante o preço.',
          'Um robô vê a ordem na fila e a margem de 40% que você autorizou.',
          'Ele compra antes, deixa a sua ordem executar no preço pior e vende depois.',
          'Você recebe bem menos token. Não foi azar: foi a margem que você mesmo autorizou.',
        ],
      },
      paragrafosFinais: [
        'O erro que isso evita é tratar as três como "ajustes avançados" que ficam no ' +
          'padrão para sempre — quando são elas que decidem se a operação executa, falha ' +
          'ou é explorada.',
      ],
      // Item com `rotulo` sai com o rótulo em negrito na frente.
      detalhe: {
        titulo: 'os três modos de MEV e o botão de compra rápida',
        lista: [
          { rotulo: 'Off:', texto: 'exposto a front-running, que é alguém passar na frente da sua ordem.' },
          { rotulo: 'Reduced:', texto: 'manda a ordem pelo Jito, com algum risco restante.' },
          { rotulo: 'Secure:', texto: 'só validadores da lista. Mais protegido e possivelmente mais lento.' },
          'O botão de compra rápida, na mesma tela, executa um valor pré-configurado num ' +
            'clique, sem tela de revisão. É conveniente, e por isso está na lista de ' +
            'erros comuns.',
        ],
      },
    },
    {
      id: 'calculadora-de-impacto',
      aba: 'configuracoes',
      titulo: 'Quanto a sua própria ordem empurra o preço',
      emUmaFrase:
        '"Pool rasa" é adjetivo até virar número. Arraste e veja quanto do preço cotado ' +
        'você de fato recebe.',
      // A calculadora (a conta mora na view): modelo de produto constante. Você
      // recebe 1 / (1 + ordem ÷ pool) do que o preço cotado sugeria.
      calculadora: {
        ordem: { rotulo: 'Tamanho da sua ordem', min: 0.1, max: 20, passo: 0.1, valor: 1 },
        pool: { rotulo: 'Liquidez da pool (lado do SOL)', min: 1, max: 500, passo: 1, valor: 50 },
        rotuloRecebe: 'Você recebe',
        notaRecebe: 'do que o preço cotado sugeria',
        rotuloImpacto: 'Impacto da sua ordem',
        nota:
          'Modelo de produto constante (x · y = k). Pools reais anunciam liquidez ' +
          'somando os dois lados: uma pool "de 100 SOL" tem cerca de 50 SOL deste lado. ' +
          'Não inclui a taxa da pool nem o slippage configurado — os dois vêm por cima.',
        // Os textos do gráfico da curva.
        grafico: { origem: 'preço cotado', eixoX: 'SOL que entra na pool →', formula: 'x · y = k' },
        escala: 'O gráfico vai até uma ordem do tamanho do dobro da pool.',
        foraDaEscala:
          'A sua ordem vale mais que o dobro da pool: o marcador está parado no fim da ' +
          'escala do gráfico (2× a pool). Os números ao lado continuam exatos.',
      },
      paragrafos: [
        'Impacto de preço é a parte do deslizamento que você mesmo causa, sem ninguém ' +
          'negociar junto: a sua compra muda a proporção entre as duas reservas da pool. ' +
          'Quanto maior a ordem em relação à reserva, mais o preço anda enquanto ela ' +
          'executa, e pior fica o preço final.',
        'O modelo é o de produto constante: as duas reservas multiplicadas dão sempre o ' +
          'mesmo número, x · y = k, e é isso que entorta a curva do gráfico. A ' +
          'calculadora faz a conta: você recebe 1 dividido por (1 + ordem ÷ pool) do que ' +
          'o preço cotado sugeria.',
        'Armadilha de leitura: pools reais anunciam liquidez somando os dois lados, ' +
          'então uma pool "de 100 SOL" tem cerca de 50 SOL deste lado. Use metade do ' +
          'número anunciado. E a conta não inclui a taxa da pool nem o slippage ' +
          'configurado: os dois vêm por cima.',
      ],
      exemplo: {
        titulo: 'Uma ordem de 1 SOL numa pool de 50',
        passos: [
          'A calculadora abre com a ordem em 1 SOL e a liquidez em 50 SOL — mais ou ' +
            'menos uma pool anunciada como "de 100 SOL".',
          'Leia o "Você recebe": a fatia do preço cotado que sobrou depois do empurrão ' +
            'da sua própria ordem.',
          'Arraste a ordem até 20 SOL sem mexer na pool e leia de novo. A ordem não ' +
            'mudou de natureza, só de tamanho em relação à reserva.',
          'Volte a ordem para 1 SOL e baixe a pool para 1 SOL: o mesmo efeito, pelo outro lado.',
        ],
      },
      paragrafosFinais: [
        'O erro que esta conta evita é culpar a configuração pelo preço ruim. Numa pool ' +
          'pequena, boa parte da diferença veio do tamanho da ordem contra o da reserva, ' +
          'e nenhum ajuste de tela conserta isso. A conta não diz que tamanho usar; diz ' +
          'o que cada tamanho custa.',
      ],
    },
    {
      id: 'tipos-de-ordem',
      aba: 'configuracoes',
      titulo: 'Tipos de ordem e a pergunta que ninguém responde',
      emUmaFrase:
        'Não assuma que uma ordem limite dispara com o app fechado. A documentação ' +
        'oficial não diz.',
      // Os dois jeitos de uma ordem limite existir. O do servidor vai com a borda
      // tracejada (`tracejado`): é o que pode sumir.
      cartoes: [
        { rotulo: 'Se a ordem fica na blockchain', texto: 'Ela executa mesmo que a empresa suma.', tom: 'bom' },
        {
          rotulo: 'Se um servidor vigia o preço',
          texto: 'Ela só executa enquanto esse servidor estiver de pé.',
          nota: 'E servidores caem, como a aba Custódia mostrou.',
          tom: 'ruim',
          tracejado: true,
        },
      ],
      descricaoDosCartoes:
        'Se a ordem fica registrada na blockchain, ela executa mesmo que a empresa suma. ' +
        'Se um servidor da plataforma vigia o preço, ela só executa enquanto esse ' +
        'servidor estiver de pé.',
      paragrafos: [
        'A ordem a mercado executa agora, pelo preço que houver: é o botão de comprar da ' +
          'anatomia da tela. A ordem limite executa só se o preço chegar a um valor que ' +
          'você definiu antes ("compre se cair até aqui", "venda se subir até ali"), e ' +
          'você vai cuidar da vida.',
        'Essa promessa tem duas implementações, e no risco elas não se parecem: ou a ' +
          'ordem fica registrada na blockchain e executa mesmo que a empresa suma, ou um ' +
          'servidor da plataforma vigia o preço e dispara — e ela só executa enquanto ' +
          'esse servidor estiver de pé. Na tela os dois casos são idênticos; por isso o ' +
          'cartão do servidor aparece tracejado.',
        'No Axiom, a resposta honesta é que não se sabe: a documentação diz que você ' +
          'pode se afastar da tela, mas não diz se a ordem fica na blockchain ou se um ' +
          'servidor dispara. A história de monitores rodando o tempo todo na blockchain ' +
          'aparece só em sites clones e afiliados (quem ganha comissão por indicar), que ' +
          'não são fonte.',
      ],
      exemplo: {
        titulo: 'Como descobrir sozinho, com o mínimo em risco',
        passos: [
          'Crie uma ordem limite de valor mínimo, num preço que só deva ser alcançado ' +
            'depois de algum tempo.',
          'Feche o aplicativo e o navegador por completo.',
          'Espere o preço cruzar o valor que você definiu.',
          'Confira no explorador de blocos, pelo endereço da sua carteira, e não pela ' +
            'tela da plataforma.',
          'Executou com tudo fechado? Ela não dependia da sua tela. Não executou? Não ' +
            'conte com ela numa posição que importa.',
        ],
      },
      paragrafosFinais: [
        'O erro que essa desconfiança evita é montar o plano de saída numa ordem limite ' +
          'e descobrir, no dia em que ela precisava disparar, que dependia de um ' +
          'servidor fora do ar. Ordem nunca conferida é suposição com nome de ' +
          'ferramenta.',
      ],
      naoVerificado:
        'qual dos dois modelos o Axiom usa não está documentado oficialmente. Até estar, ' +
        'não conte com a ordem limite com o app fechado — teste você mesmo, com um valor ' +
        'mínimo, antes de usá-la numa posição que importa.',
    },

    // ================================== ERROS ==================================
    {
      id: 'erros-de-execucao',
      aba: 'erros',
      titulo: 'O token impostor',
      emUmaFrase:
        'O erro mais caro é comprar o token errado. Nome e ticker são apelidos; endereço ' +
        'do contrato é identidade.',
      // O mockup da busca: o campo e os dois resultados. O `impostor` sai em
      // vermelho.
      impostor: {
        titulo: 'Dois resultados para a mesma busca pelo nome',
        selo: 'mockup esquemático',
        busca: 'Buscar: nome do token',
        resultados: [
          {
            rotulo: 'Resultado 1 — liquidez alta, milhares de holders',
            texto: 'O token que você queria. Liquidez, holders e histórico coerentes — mas nada disso é o que o identifica.',
          },
          {
            rotulo: 'Resultado 2 — mesmo nome, mesmo ticker, liquidez baixa',
            texto: 'O impostor: contrato diferente. Quem compra aqui comprou um token que ninguém mais vai comprar.',
            impostor: true,
          },
        ],
        descricao:
          'Buscando pelo nome, dois resultados aparecem. O primeiro tem liquidez alta e ' +
          'milhares de holders. O segundo tem o mesmo nome e o mesmo ticker, com ' +
          'liquidez baixa e contrato diferente: é o impostor.',
        legenda:
          'A única identidade de um token é o endereço do contrato. Copie o endereço de ' +
          'uma fonte confiável e busque por ele — nunca pelo nome.',
      },
      paragrafos: [
        'Qualquer pessoa pode criar um token com qualquer nome e qualquer ticker (a ' +
          'sigla curta ao lado do nome, como as letras de uma ação). Não existe ' +
          'cartório. Único é o endereço do contrato, a sequência longa de letras e ' +
          'números que identifica o token na blockchain: dois tokens podem se chamar ' +
          'igual; dois endereços, não.',
        'Por isso o impostor é o erro mais caro da lista: basta buscar pelo nome, o ' +
          'gesto mais natural do mundo. E o prejuízo é total — ninguém mais vai comprar ' +
          'o impostor, e sem comprador não há venda. Liquidez e número de holders ajudam ' +
          'a desconfiar, mas são coincidências úteis, não identidade.',
      ],
      listaTitulo: 'Os outros quatro erros de execução mais comuns',
      lista: [
        'Slippage alto numa pool rasa, em que a sua própria compra move o preço.',
        'Quantia digitada errada, ou botão de compra rápida ainda no valor da operação anterior.',
        'Assinar sem ler o que a transação autoriza. O Módulo 1 já mostrou onde isso termina.',
        'Perseguir uma vela que já subiu. É erro de disciplina disfarçado de decisão.',
      ],
      exemplo: {
        titulo: 'O hábito que fecha essa porta',
        passos: [
          'Pegue o endereço do contrato numa fonte confiável, não no resultado da busca.',
          'Cole o endereço na busca do terminal, em vez de digitar o nome.',
          'Confira o começo e o fim do endereço que apareceu contra o que você copiou.',
          'Só então olhe liquidez, holders e gráfico — como informação, não como identificação.',
        ],
      },
      paragrafosFinais: [
        'E um erro vem antes de todos: operar na carteira principal. Uma carteira ' +
          'separada só para operar limita o estrago se o dispositivo ou o app forem ' +
          'comprometidos.',
        'Os cinco erros acontecem no minuto entre decidir e clicar, quando a pressa ' +
          'vence a atenção. Não são erros de análise — por isso se corrigem por hábito, ' +
          'não por estudo.',
      ],
    },
    {
      id: 'bots-de-sniping',
      aba: 'erros',
      titulo: 'Por que velocidade não é uma disputa que você vença',
      emUmaFrase:
        'Um bot reage em dezenas de milissegundos. Você leva de 30 a 60 segundos. Essa ' +
        'corrida não é sua.',
      // Três barras na mesma escala de tempo (60 segundos = a barra inteira).
      // `segundos` dá o comprimento. O bot fica sem número: a pesquisa só diz
      // "dezenas de milissegundos", então a barra dele fica no mínimo (um traço).
      // `tom`: 'acento' (ciano), 'ruim' (vermelho) ou 'primaria' (roxo).
      tempos: {
        titulo: 'Na mesma escala de tempo, até 60 segundos',
        escala: 60,
        barras: [
          {
            rotulo: 'Um slot da Solana',
            valor: '350 ms',
            segundos: 0.35,
            tom: 'acento',
            nota: 'A janela em que a rede produz um bloco. Passou de 400 ms para 350 ms em 21/08/2026.',
          },
          {
            rotulo: 'O bot',
            valor: 'dezenas de ms',
            segundos: null,
            tom: 'ruim',
            nota: 'Com transações pré-assinadas e infraestrutura colada à produção de blocos.',
          },
          {
            rotulo: 'Você, do "vi" ao "confirmado"',
            valor: '30 a 60 s',
            segundos: 60,
            tom: 'primaria',
            nota: 'Entre ver a informação e ter a transação confirmada.',
          },
        ],
        descricao:
          'Na mesma escala de até 60 segundos: um slot da Solana dura 350 milissegundos, ' +
          'o bot reage em dezenas de milissegundos, e você leva de 30 a 60 segundos ' +
          'entre ver a informação e ter a transação confirmada.',
        legenda:
          'O slot da Solana — a janela em que a rede produz um bloco — passou de 400 ms ' +
          'para 350 ms em 21/08/2026, a primeira redução desde o lançamento da rede. As ' +
          'duas primeiras barras são tão curtas nesta escala que quase não aparecem: é ' +
          'esse o ponto.',
      },
      paragrafos: [
        'Sniping (de sniper, atirador) é comprar um token no instante em que ele nasce, ' +
          'antes de o preço se mover. Quem faz isso não é uma pessoa clicando rápido: é ' +
          'um programa ligado direto à infraestrutura da rede, com a transação já ' +
          'montada e assinada, esperando só o gatilho.',
        'Nas barras abaixo, na mesma escala: um slot da Solana (a janela em que a rede ' +
          'produz um bloco) dura 350 ms desde 21/08/2026 (eram 400 ms); o bot reage em ' +
          'dezenas de milissegundos, dentro de um único slot; você leva de 30 a 60 ' +
          'segundos do "vi" ao "confirmado".',
        'A vantagem deles é infraestrutura, não inteligência. Quando você vê um token ' +
          '"novo" já subindo, os bots já entraram, e o preço que você consegue é um que ' +
          'um bot mais rápido recusou. Pôr inteligência artificial para reagir por você ' +
          'não resolve: uma chamada de modelo leva segundos, e a disputa se decide em ' +
          'milissegundos.',
        'Então não faça da velocidade o eixo da sua decisão. O resto deste hub — ' +
          'checagem, tese, ponto de invalidação, tamanho da posição — acontece em ' +
          'minutos e horas, a escala em que um humano ainda funciona.',
      ],
      exemplo: {
        titulo: 'A corrida, contada em números',
        passos: [
          'A rede fecha um bloco a cada 350 ms.',
          'O bot decide e envia em dezenas de milissegundos: cabe dentro de um bloco.',
          'Você vê a informação, abre a tela, confere, digita e assina: 30 a 60 segundos.',
          'Nesse tempo a rede fechou muitos blocos, e o bot já comprou e possivelmente já vendeu.',
          'Nenhuma prioridade fecha essa diferença: ela não é de taxa, é de tempo.',
        ],
      },
      paragrafosFinais: [
        'O erro que isso evita é comprar um lançamento achando que chegou cedo: o "cedo" ' +
          'foi ocupado por máquinas antes de a primeira vela aparecer no seu gráfico.',
      ],
    },
    {
      id: 'a-venda-nao-caiu',
      aba: 'erros',
      titulo: 'A venda não caiu na carteira?',
      emUmaFrase:
        'Duas falhas parecidas, com causas diferentes. Saber qual é diz o que fazer em seguida.',
      // O fluxograma de diagnóstico está em `diagramas` (id 'diagnostico-da-venda'),
      // com a legenda que separa as duas falhas.
      diagrama: 'diagnostico-da-venda',
      paragrafos: [
        'Você clicou em vender, a tela confirmou alguma coisa e o dinheiro não apareceu. ' +
          'São duas falhas diferentes, e uma pergunta separa as duas: a transação chegou ' +
          'a existir na blockchain?',
        'Se chegou, foi recusada: reverteu (foi desfeita) com "slippage exceeded", ' +
          'deslizamento excedido. O preço andou além do limite que você autorizou, e a ' +
          'rede cancelou em vez de entregar preço pior. Não é defeito: é a proteção ' +
          'fazendo o que você pediu.',
        'Se não chegou, nem entrou em bloco: priority fee baixo demais no ' +
          'congestionamento, ou o terminal fora do ar antes de enviar. Por fora as duas ' +
          'falhas são idênticas, porque o saldo não mudou; a diferença aparece no ' +
          'explorador de blocos.',
        'Nos dois casos você perde a taxa de rede, não o valor da venda: os tokens ' +
          'seguem seus e a posição, aberta. Confundir as duas faz clicar em vender de ' +
          'novo e de novo, empilhando taxas. Saber qual aconteceu diz o próximo passo: ' +
          'ajustar o limite de slippage, ou aumentar a prioridade e tentar por outro ' +
          'caminho.',
        'A checagem é no explorador, pelo endereço da sua carteira, não na tela da ' +
          'plataforma. A blockchain é a fonte da verdade; a interface é só a opinião ' +
          'dela sobre o que aconteceu.',
      ],
      exemplo: {
        titulo: 'O diagnóstico em cinco passos',
        passos: [
          'Abra o explorador de blocos pelo endereço da sua carteira.',
          'A transação aparece? Então ela chegou: leia o motivo da falha.',
          'Motivo "slippage exceeded": o preço passou do seu limite e a rede cancelou. ' +
            'Você perdeu a taxa de rede.',
          'Não aparece? Não foi incluída: priority fee baixo no congestionamento, ou o ' +
            'terminal fora do ar.',
          'Nos dois casos, confira o saldo do token antes de tentar de novo — ele ' +
            'continua na carteira.',
        ],
      },
      paragrafosFinais: [
        'O erro que este diagnóstico evita é o pânico como método: repetir o clique ' +
          'transforma uma transação que falhou barato em três que custaram taxa. Olhe o ' +
          'explorador primeiro.',
      ],
    },

    // ================================= PROCESSO =================================
    {
      id: 'do-token-ao-encerramento',
      aba: 'processo',
      titulo: 'Do "vi um token" ao "encerrei a posição"',
      emUmaFrase:
        'Cada passo é uma chance de parar antes de gastar dinheiro. "Não opero" é um ' +
        'resultado válido — e frequente.',
      // Os 7 passos, em ordem. O passo com `saida` tem uma saída do processo à
      // direita (vermelha): é ali que o processo pode terminar em "não opero".
      processo: {
        passos: [
          {
            texto:
              'Abra o terminal pelo favorito oficial. Nunca por link de anúncio ou rede ' +
              'social: existem sites falsos imitando plataformas conhecidas.',
          },
          { texto: 'Busque pelo endereço do contrato verificado. Nunca pelo nome ou pelo ticker.' },
          {
            texto:
              'Faça as checagens dos Módulos 3 e 4: endereço oficial, extensões e ' +
              'autoridades do contrato, concentração de holders, bundles e histórico de ' +
              'quem criou.',
            saida: 'Checagem reprovada: não opero.',
          },
          {
            texto:
              'Escreva a tese antes de comprar. Junto com ela, escreva o ponto de ' +
              'invalidação: onde você admite que errou e sai.',
            saida: 'Tese que não fica clara: não opero.',
          },
          {
            texto:
              'Defina o tamanho da posição e confira o valor no campo. Atenção redobrada ' +
              'se o botão de compra rápida estiver ligado.',
          },
          {
            texto:
              'Configure slippage, prioridade e proteção de MEV com consciência. Faça ' +
              'primeiro uma operação-teste com valor mínimo.',
          },
          {
            texto:
              'Saia em degraus, conforme o plano feito antes da entrada. Não conforme o ' +
              'que você sente durante.',
          },
        ],
        rotuloDaSaida: 'Saída do processo',
        fim: 'Encerrei a posição',
        legenda:
          'Duas saídas em "não opero": checagem reprovada, ou tese que não fica clara. ' +
          'Como o Módulo 2 mostrou, a maioria das memecoins vai a zero — passar na ' +
          'maioria das vezes é o esperado de quem segue o processo, não sinal de que ele ' +
          'travou.',
      },
      paragrafos: [
        'Este é o roteiro inteiro, do token que aparece na sua frente até a posição ' +
          'encerrada. Ele não existe para aumentar acerto, e sim para as decisões ' +
          'acontecerem numa ordem fixa, escritas antes — não na ordem em que a tela ' +
          'pedir.',
        'Checagem e tese vêm antes da configuração e do tamanho: as duas saídas em "não ' +
          'opero" ficam no alto, onde ainda não se gastou nada. Depois disso é só ' +
          'execução, e execução não conserta decisão ruim — só a cumpre mais rápido.',
        'Os passos mais pulados são o primeiro (os sites falsos aparecem em anúncio e ' +
          'rede social, onde a pressa procura) e o último (sair em degraus pelo plano, ' +
          'não pelo que você sente). E, como diz a legenda, passar na maioria das vezes ' +
          'é o esperado: roteiro que quase nunca diz "não" não está filtrando nada.',
      ],
      exemplo: {
        titulo: 'Onde o processo costuma terminar',
        passos: [
          'Passo 3, as checagens dos Módulos 3 e 4 (endereço, contrato, holders, ' +
            'bundles, criador). Checagem reprovada: não opero.',
          'Passo 4, a tese escrita com o ponto de invalidação — onde você admite que ' +
            'errou e sai. Tese que não fica clara: não opero.',
          'Dos sete passos, só esses dois têm saída, e os dois vêm antes de qualquer ' +
            'dinheiro sair da carteira.',
          'Se o token passar pelos dois, o passo 6 ainda pede uma operação-teste com valor mínimo.',
        ],
      },
      paragrafosFinais: [
        'O erro que o roteiro evita é decidir na ordem errada. Quem define o tamanho ' +
          'antes de escrever a tese já decidiu operar, e passa a usar a checagem só para ' +
          'confirmar. Escrever antes impede o processo de virar cerimônia.',
      ],
    },
    {
      id: 'registro-para-imposto',
      aba: 'processo',
      titulo: 'Guardar registro desde a primeira operação',
      emUmaFrase:
        'Três campos por operação, anotados no dia. É pouco trabalho por vez — e evita o ' +
        'garimpo de um ano inteiro.',
      // Os três campos que o registro precisa ter, um cartão por campo.
      registro: {
        titulo: 'O que guardar de cada compra e venda',
        campos: [
          { campo: 'Data', texto: 'De cada compra e de cada venda.' },
          { campo: 'Valor em reais', texto: 'Quanto entrou ou saiu, na moeda da declaração.' },
          {
            campo: 'Custo de aquisição',
            texto: 'Quanto custou comprar. É o que permite apurar o ganho operação por operação.',
          },
        ],
        descricao:
          'De cada compra e venda, guarde a data, o valor em reais e o custo de aquisição.',
        legenda:
          'Isto liga direto com a seção de impostos do Módulo 1 (IN RFB 2.291/2025 e o ' +
          'programa DeCripto). Não é orientação tributária: guarde o registro e procure ' +
          'um contador.',
      },
      paragrafos: [
        'Registrar é guardar, de cada operação, a data, o valor em reais que entrou ou ' +
          'saiu e o custo de aquisição (quanto custou comprar o que você vendeu). Não há ' +
          'quarto campo escondido: pode ser uma planilha.',
        'A obrigação de registrar começa na primeira operação, não quando aparece lucro. ' +
          'O custo de aquisição é dado do passado: é ele que apura o ganho operação por ' +
          'operação, e ninguém o calcula por você depois. Quem não prova quanto pagou ' +
          'não consegue mostrar quanto ganhou.',
        'O campo trabalhoso é o valor em reais: a operação foi em SOL, e a conversão ' +
          'é feita na data da operação. A boa notícia é que o registro não depende da plataforma: o ' +
          'que está on-chain sempre pode ser recuperado pelo endereço da carteira.',
        'Nada aqui é orientação tributária: este módulo só ensina a não chegar ao ' +
          'contador de mãos vazias.',
      ],
      exemplo: {
        titulo: 'Uma linha da planilha, de cada ponta da operação',
        passos: [
          'Na compra: a data, o valor em reais que saiu e quanto aquilo custou — o custo ' +
            'de aquisição.',
          'Na venda: a data e o valor em reais que entrou.',
          'O ganho sai da diferença entre as duas linhas, não do saldo da carteira no fim do ano.',
          'Guarde junto o endereço da carteira que operou: é por ele que o explorador de ' +
            'blocos reconstrói o histórico.',
        ],
      },
      paragrafosFinais: [
        'O erro que isso evita é confundir print com registro. Uma captura de tela do ' +
          'lucro não tem data confiável, valor em reais nem custo de aquisição: tem só ' +
          'um número bonito.',
      ],
      naoVerificado:
        'exportar o histórico pelo próprio terminal. Nenhuma página oficial trata disso ' +
        '— não conte com isso sem confirmar no app. Você não depende do terminal: as ' +
        'transações ficam on-chain, e o histórico sempre pode ser recuperado pelo ' +
        'endereço da carteira num explorador de blocos, que permite exportar.',
    },
  ],

  // ---------------------------------------------------------------------------
  // Destaques — os números grandes que abrem cada aba
  //
  // São a primeira coisa que alguém lê ao abrir a aba, e cada um contradiz uma
  // suposição comum. REGRA: todo número aqui já está com fonte em `fontes`; onde
  // não há número pesquisado, o destaque é uma afirmação concreta, nunca uma
  // estatística inventada.
  // ---------------------------------------------------------------------------
  destaques: {
    terminal: [
      {
        rotulo: 'Camadas entre você e a pool',
        valor: '3',
        nota: 'Carteira → terminal → agregador → pool. Só o terminal soma uma taxa própria por cima.',
      },
      {
        rotulo: 'O que o agregador cobra',
        valor: '0%',
        nota: 'No modo manual do Jupiter, sem taxa própria no swap básico. Você ainda paga a DEX e a rede.',
        tom: 'ok',
      },
      {
        rotulo: 'A camada mais cara',
        valor: '0,95%',
        nota: 'O terminal. Não compra preço melhor — compra a interface, a descoberta e os botões.',
        tom: 'alerta',
      },
    ],

    custodia: [
      {
        rotulo: 'Depósito na empresa, compra à vista',
        valor: '0',
        nota: 'Não-custodial: o dinheiro fica na sua carteira, na blockchain. Confirmado na FAQ oficial.',
        tom: 'ok',
      },
      {
        rotulo: 'Chaves privadas expostas no incidente de fev/2026',
        valor: '0',
        nota: 'Foi abuso de ferramenta interna de suporte — visibilidade, não controle. Nenhum fundo reportado como roubado.',
      },
      {
        rotulo: 'O risco que sobra',
        valor: 'App fora do ar',
        nota: 'Em 28–29/08/2025 usuários ficaram horas sem conseguir vender. Quem tinha a semente exportada vendeu por outro caminho.',
        tom: 'alerta',
      },
    ],

    taxas: [
      {
        rotulo: 'A fatia que é anunciada',
        valor: '0,95%',
        nota: 'A taxa da plataforma no nível de entrada. É a única que aparece no marketing.',
        tom: 'neutro',
      },
      {
        rotulo: 'O custo real de uma compra pequena',
        valor: '3,2%',
        nota: 'Somando as cinco camadas, numa ordem de R$100 em token na bonding curve. Mais de três vezes o número anunciado.',
        tom: 'alerta',
      },
      {
        rotulo: 'Quantas vezes você paga isso',
        valor: '2×',
        nota: 'Comprar é uma transação, vender é outra: o pedágio vem nas duas pontas, mesmo quando a operação dá errado.',
        tom: 'neutro',
      },
    ],

    configuracoes: [
      {
        rotulo: 'Modos de proteção de MEV',
        valor: '3',
        nota: 'Off, Reduced e Secure. A própria documentação recomenda o Secure sempre que possível.',
      },
      {
        rotulo: 'Priority fee e gorjeta, no padrão',
        valor: '0,001 SOL',
        nota: 'Cada um. Somam 0,002 SOL por transação — cerca de 1% numa ordem de R$100.',
      },
      {
        rotulo: 'Ordem limite dispara com o app fechado?',
        valor: 'Não verificado',
        nota: 'A documentação oficial não diz se a ordem fica on-chain ou depende do servidor. Teste com valor mínimo antes de confiar.',
        tom: 'alerta',
      },
    ],

    erros: [
      {
        rotulo: 'Duração de um slot na Solana',
        valor: '350 ms',
        nota: 'Desde 21/08/2026. Um bot reage em dezenas de milissegundos, com transação pré-assinada.',
      },
      {
        rotulo: 'Você, do "vi" ao "confirmado"',
        valor: '30–60 s',
        nota: 'Quando você vê um token novo já subindo, os bots já entraram. O preço que sobra é o que eles recusaram.',
        tom: 'alerta',
      },
      {
        rotulo: 'Tokens que podem ter o mesmo ticker',
        valor: 'Ilimitado',
        nota: 'Nome e ticker são apelido; endereço do contrato é identidade. Busque sempre pelo endereço.',
        tom: 'alerta',
      },
    ],

    processo: [
      {
        rotulo: 'Saídas em "não opero" no fluxo',
        valor: '2',
        nota: 'Checagem reprovada, ou tese que não fica clara. Passar na maioria das vezes é o comportamento esperado.',
        tom: 'ok',
      },
      {
        rotulo: 'Quando nasce a obrigação de registrar',
        valor: '1ª operação',
        nota: 'Não quando aparece lucro. Data, valor em reais e custo de aquisição de cada compra e venda.',
      },
      {
        rotulo: 'Exportação de histórico pelo terminal',
        valor: 'Não verificado',
        nota: 'Nenhuma página oficial sobre isso. O histórico on-chain sempre pode ser exportado do explorador.',
        tom: 'alerta',
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // ETAPA B — preencher quando chegar a continuação da pesquisa do Prompt 2.
  // A tela redesenhada ainda não tem lugar para estes três campos (o desenho do
  // módulo não os mostra): se forem preenchidos, é preciso desenhar onde entram.
  // ---------------------------------------------------------------------------
  tabelaOrdens: { colunas: [], linhas: [] },
  checklistExecucao: [],
  errosComuns: [],

  // ---------------------------------------------------------------------------
  // Fluxogramas. A tela desenha a partir do texto Mermaid (components/
  // fluxograma.js); `versaoEmTexto` é a reserva, se o texto não puder ser lido.
  // ---------------------------------------------------------------------------
  diagramas: [
    {
      id: 'fora-do-ar',
      aba: 'custodia',
      titulo: 'Se o app sair do ar',
      // A legenda embaixo do fluxograma: o caso de agosto de 2025.
      legenda:
        'Em 28 e 29 de agosto de 2025, o pump.fun mudou sem aviso a sua API (a porta por ' +
        'onde outros apps se ligam a ele): usuários do Axiom ficaram horas sem conseguir ' +
        'vender, com perdas relatadas no chat da plataforma. Quem tinha a semente exportada ' +
        'vendeu por outra carteira, direto no pump.fun ou no Jupiter.',
      // Textos e cores como no desenho (M5 › Custódia): "Sim" leva à caixa verde,
      // "Não" à vermelha; a segunda caixa de cada ramo só explica (`suave`, cinza).
      codigoMermaid:
        'flowchart TD\n' +
        '  A["O terminal está fora do ar e eu preciso vender"] --> B{"A semente está exportada e guardada offline?"}\n' +
        '  B -->|"Sim"| C["Importo a semente numa carteira comum"]\n' +
        '  C --> D["Vendo direto no site da DEX ou no agregador. Um inconveniente."]\n' +
        '  B -->|"Não"| E["Uma posição que você não consegue encerrar"]\n' +
        '  E --> F["Só resta esperar o terminal voltar"]\n' +
        '  class C sim\n' +
        '  class E nao\n' +
        '  class D,F suave',
      versaoEmTexto: [
        'O terminal está fora do ar e eu preciso vender.',
        'A semente está exportada e guardada offline?',
        'Se sim: importo a semente numa carteira comum e vendo direto no site da DEX ou no agregador. Um inconveniente.',
        'Se não: é uma posição que você não consegue encerrar. Só resta esperar o terminal voltar.',
      ],
    },
    {
      id: 'slippage-mal-configurado',
      aba: 'configuracoes',
      titulo: 'O que acontece quando o slippage está mal configurado',
      // A tela não mostra esta legenda: no desenho, esta figura só tem o título.
      legenda: 'Slippage alto numa pool rasa abre espaço para preço ruim e para ataque de bot.',
      // Textos, rótulos e cores como no desenho (M5 › Configurações): "Sim, pool rasa"
      // em vermelho, "Não, pool funda" em âmbar, e a caixa âmbar do outro extremo
      // embaixo dos dois ramos. `suave` = caixa que só explica, em cinza. `nota` =
      // a caixa do outro extremo é observação: âmbar, mas sem negrito e mais larga.
      codigoMermaid:
        'flowchart TD\n' +
        '  A["Configuro um slippage muito alto"] --> B{"A pool tem liquidez rasa?"}\n' +
        '  B -->|"Sim, pool rasa"| C["Aceito um preço muito pior que o cotado"]\n' +
        '  C --> D["Um bot faz sandwich: compra antes e vende depois de mim"]\n' +
        '  D --> E["Recebo bem menos token do que esperava"]\n' +
        '  B -->|"Não, pool funda"| F["Impacto menor, mas ainda perco"]\n' +
        '  F --> G["Slippage folgado continua sendo margem que você autorizou"]\n' +
        '  E --> Z[No outro extremo, slippage baixo demais numa memecoin volátil faz a transação reverter com "slippage exceeded": você perde a taxa de rede e a oportunidade, mas não compra caro.]\n' +
        '  G --> Z\n' +
        '  class C,E nao\n' +
        '  class F,Z alerta\n' +
        '  class Z nota\n' +
        '  class D,G suave',
      versaoEmTexto: [
        'Configuro um slippage muito alto, por exemplo 40%.',
        'Se a pool é rasa, a transação aceita um preço muito pior do que o cotado.',
        'Isso abre espaço para um bot fazer um ataque de sandwich, comprando antes e vendendo depois de mim.',
        'O bot lucra com a diferença que eu autorizei ao deixar o slippage tão folgado.',
        'Recebo bem menos token do que esperava.',
        'No outro extremo, slippage baixo demais numa memecoin volátil faz a transação reverter com "slippage exceeded" — perco a taxa de rede e a oportunidade.',
      ],
    },
    {
      id: 'diagnostico-da-venda',
      aba: 'erros',
      titulo: 'A venda não caiu na carteira?',
      // A tela não mostra este título: no desenho, esta figura só tem a legenda.
      legenda:
        'Reverter com "slippage exceeded" é diferente de não ser incluída por priority fee ' +
        'baixo: na primeira, a transação chegou e foi recusada pelo limite que você definiu; ' +
        'na segunda, ela não entrou a tempo. Nos dois casos você perde a taxa de rede, não o ' +
        'valor da compra.',
      // Textos, rótulos e cores como no desenho (M5 › Erros): "Sim, aparece" em
      // âmbar, "Não aparece" em vermelho. `suave` = caixa que só explica, em
      // cinza; `forte` = caixa de conclusão em negrito; a última caixa do ramo
      // vermelho é a ciano do desenho (o que fazer em seguida).
      codigoMermaid:
        'flowchart TD\n' +
        '  A["Vendi e o valor não caiu na carteira"] --> B{"A transação aparece no explorador de blocos?"}\n' +
        '  B -->|"Sim, aparece"| C[Reverteu com "slippage exceeded"]\n' +
        '  C --> D["O preço andou além do limite que você autorizou: a rede cancelou para não entregar preço pior"]\n' +
        '  D --> E["Você perde a taxa de rede, não o valor da venda"]\n' +
        '  B -->|"Não aparece"| F["A transação não foi incluída"]\n' +
        '  F --> G["Priority fee baixo no congestionamento, ou o terminal fora do ar"]\n' +
        '  G --> H["Confira pelo endereço da carteira no explorador — a blockchain é a fonte da verdade"]\n' +
        '  class C alerta\n' +
        '  class F nao\n' +
        '  class D,G suave\n' +
        '  class E forte\n' +
        '  class H pergunta',
      versaoEmTexto: [
        'Vendi e o valor não caiu na carteira.',
        'A transação aparece no explorador de blocos?',
        'Se sim: ela reverteu com "slippage exceeded" — o preço andou além do limite que você autorizou e a rede cancelou para não entregar preço pior. Você perde a taxa de rede, não o valor da venda.',
        'Se não aparece: a transação não foi incluída — priority fee baixo no congestionamento, ou o terminal fora do ar. Confira pelo endereço da carteira no explorador: a blockchain é a fonte da verdade.',
      ],
    },
  ],

  // ---------------------------------------------------------------------------
  // Quiz
  // ---------------------------------------------------------------------------

  // Por que cada alternativa errada do quiz não serve (o quiz mostra a da resposta escolhida).
  porqueErradas: {
    q1: {
      a: 'Carteira criada nos servidores da plataforma não é só sua: quem tem as chaves tem o dinheiro.',
      c: 'A blockchain não trava nada: ela executa o que a chave assina.',
      d: 'Alguém sempre controla — quem tem as chaves.',
    },
    q2: {
      a: 'Slippage não muda a taxa; muda o preço que você aceita.',
      b: 'Slippage alto é o contrário de garantia: autoriza um preço pior.',
      d: 'Muda, e muito: numa pool rasa, 40% abre espaço para um ataque de sandwich.',
    },
    q3: {
      a: 'Ordem guardada num servidor não está na blockchain; se o servidor cai, ninguém dispara.',
      c: 'A blockchain só executa o que foi assinado e enviado; essa ordem nunca chegou lá.',
      d: 'Ela não vira ordem de mercado sozinha: simplesmente não dispara.',
    },
    q4: {
      a: 'A taxa anunciada é a menor fatia; rede, prioridade, gorjeta e pool vêm à parte.',
      b: 'A taxa da pool é cobrada à parte, pela própria pool.',
      d: 'A taxa de rede da Solana é fração de centavo, e não é a taxa anunciada.',
    },
    q5: {
      a: 'Permissão ilimitada é exatamente o mecanismo dos drainers do Módulo 1.',
      c: 'Aprovar não altera a taxa de rede das próximas transações.',
      d: 'Uma aprovação não afeta a velocidade da blockchain.',
    },
    q6: {
      a: 'Não é questão de taxa: é tempo — o bot compra antes de o humano ver o token.',
      c: 'Não precisa de informação secreta: velocidade basta.',
      d: 'O humano tem carteira; só chega depois.',
    },
    q7: {
      a: 'A rede não fica com o valor da compra: a transação reverte e você perde só a taxa de rede.',
      c: 'A plataforma não travou: a transação chegou e foi recusada pelo limite que você definiu.',
      d: 'Não tem relação com a taxa da plataforma: o preço andou além do seu limite.',
    },
    q8: {
      a: 'Print de lucro não é registro: falta data, valor em reais e custo de aquisição.',
      c: 'A plataforma não apura o imposto por você.',
      d: 'O ganho é apurado operação por operação, não pelo saldo do fim do ano.',
    },
  },

  quiz: [
    {
      id: 'q1',
      pergunta:
        'Você depositou seu dinheiro numa carteira interna criada pela plataforma. Quem controla esse dinheiro na prática?',
      alternativas: [
        { id: 'a', texto: 'Só você, sempre' },
        { id: 'b', texto: 'A plataforma, porque as chaves ficam nos servidores dela' },
        { id: 'c', texto: 'A blockchain, que trava o dinheiro' },
        { id: 'd', texto: 'Ninguém controla' },
      ],
      correta: 'b',
      explicacao:
        'Em modelo custodial, a carteira vive nos servidores da plataforma: quem tem as ' +
        'chaves tem o dinheiro, e um vazamento ou má-fé pode drenar tudo. Em terminal ' +
        'não-custodial é o oposto — a semente é sua e exportável, e é isso que você deve ' +
        'confirmar na documentação oficial antes de depositar qualquer coisa.',
    },
    {
      id: 'q2',
      pergunta: 'Você configurou slippage de 40% numa pool rasa. O que provavelmente acontece?',
      alternativas: [
        { id: 'a', texto: 'A transação fica mais barata' },
        { id: 'b', texto: 'Você garante o melhor preço' },
        { id: 'c', texto: 'Você aceita um preço muito pior e vira alvo fácil de bots' },
        { id: 'd', texto: 'Nada muda' },
      ],
      correta: 'c',
      explicacao:
        'Slippage é quanta variação de preço você autoriza; um número alto numa pool rasa ' +
        'deixa a execução acontecer a um preço muito pior e reduz a proteção contra ' +
        'sandwich, porque é justamente o slippage apertado que corta a margem do atacante. ' +
        'O erro oposto — slippage baixo demais numa memecoin volátil — faz a transação ' +
        'falhar em vez de proteger.',
    },
    {
      id: 'q3',
      pergunta:
        'Uma ordem limite que a plataforma segura fora da blockchain até o preço bater: o que acontece se a plataforma cair?',
      alternativas: [
        { id: 'a', texto: 'A ordem executa sozinha na blockchain' },
        { id: 'b', texto: 'A ordem pode não ser executada, porque dependia do servidor' },
        { id: 'c', texto: 'A blockchain executa por você' },
        { id: 'd', texto: 'A ordem vira ordem de mercado' },
      ],
      correta: 'b',
      explicacao:
        'Uma ordem que depende de um servidor para disparar só funciona enquanto aquele ' +
        'servidor estiver de pé — diferente de uma ordem já assinada e postada on-chain. ' +
        'Atenção: no caso do Axiom especificamente, qual dos dois modelos é usado NÃO está ' +
        'documentado oficialmente, e é por isso que a orientação do módulo é testar com ' +
        'valor mínimo antes de confiar numa ordem limite.',
    },
    {
      // REESCRITA. A versão original perguntava qual custo é o maior e dava "a taxa
      // da plataforma" como correta — o que é falso numa compra pequena na bonding
      // curve (plataforma R$0,94 < fixos R$1,03 < pool R$1,24). A pergunta agora
      // testa o que é de fato incontestável: o que a taxa anunciada omite.
      id: 'q4',
      pergunta: 'A taxa anunciada de um terminal (por volta de 1%) cobre o quê?',
      alternativas: [
        { id: 'a', texto: 'Tudo que você paga na operação' },
        { id: 'b', texto: 'A taxa da plataforma e a taxa da pool' },
        { id: 'c', texto: 'Só a fatia da plataforma — rede, prioridade, gorjeta e pool são à parte' },
        { id: 'd', texto: 'Só a taxa de rede da Solana' },
      ],
      correta: 'c',
      explicacao:
        'O número anunciado é apenas a fatia da plataforma. Priority fee e gorjeta de MEV ' +
        '(0,001 SOL cada no padrão) e a taxa da pool (0,25% a 1,25%) são cobrados à parte. ' +
        'Numa compra pequena de token novo, a taxa da plataforma chega a ser a MENOR das ' +
        'camadas — o custo total pode passar de três vezes o número anunciado.',
    },
    {
      id: 'q5',
      pergunta: 'Você ligou a aprovação automática com permissão ilimitada para um contrato. Qual é o risco?',
      alternativas: [
        { id: 'a', texto: 'Nenhum, é só conveniência' },
        { id: 'b', texto: 'O contrato pode mover aquele token da sua carteira sem pedir nova assinatura' },
        { id: 'c', texto: 'A taxa de rede aumenta' },
        { id: 'd', texto: 'A blockchain fica mais lenta' },
      ],
      correta: 'b',
      explicacao:
        'Uma aprovação ilimitada dá ao contrato permissão contínua de gastar aquele token, ' +
        'sem precisar de nova autorização sua. Se ele for malicioso ou for comprometido ' +
        'depois, o saldo pode ser drenado — é exatamente o mecanismo dos drainers do Módulo ' +
        '1, e a defesa é a mesma: revisar e revogar aprovações periodicamente.',
    },
    {
      id: 'q6',
      pergunta: 'Por que um humano não compete com um bot de sniping no lançamento de um token?',
      alternativas: [
        { id: 'a', texto: 'O humano paga mais taxa' },
        { id: 'b', texto: 'O bot age em dezenas de milissegundos, antes de qualquer clique humano' },
        { id: 'c', texto: 'O bot tem informação secreta sempre' },
        { id: 'd', texto: 'O humano não tem carteira' },
      ],
      correta: 'b',
      explicacao:
        'A disputa se decide abaixo de um segundo, com transações pré-assinadas rodando em ' +
        'infraestrutura colada à produção de blocos; um humano leva de 30 a 60 segundos do ' +
        '"vi a informação" até a transação confirmada. E a janela só encolheu: em 21 de ' +
        'agosto de 2026 a Solana reduziu o slot de 400 ms para 350 ms.',
    },
    {
      id: 'q7',
      pergunta: 'Sua transação chegou à blockchain e reverteu com "slippage exceeded". O que aconteceu?',
      alternativas: [
        { id: 'a', texto: 'A rede roubou seu dinheiro' },
        { id: 'b', texto: 'O preço se moveu além do slippage que você aceitou, e a rede cancelou' },
        { id: 'c', texto: 'A plataforma travou' },
        { id: 'd', texto: 'Você não pagou a taxa da plataforma' },
      ],
      correta: 'b',
      explicacao:
        'Quando o preço varia mais que o seu limite entre o envio e a execução, o swap ' +
        'reverte para não te entregar um preço pior que o autorizado — você perde a taxa de ' +
        'rede, não o valor da compra. Vale distinguir do outro problema parecido: falha por ' +
        'priority fee é a transação não ter sido incluída a tempo, que é coisa diferente.',
    },
    {
      id: 'q8',
      pergunta: 'Para o imposto de renda no Brasil, o que você precisa guardar de cada operação?',
      alternativas: [
        { id: 'a', texto: 'Só o print do lucro' },
        { id: 'b', texto: 'Data, valor em reais e o custo de aquisição de cada compra e venda' },
        { id: 'c', texto: 'Nada, a plataforma faz tudo' },
        { id: 'd', texto: 'Só o saldo final do ano' },
      ],
      correta: 'b',
      explicacao:
        'O ganho é apurado operação por operação, então data, valor em reais e custo de ' +
        'aquisição são o mínimo — e a obrigação de registrar nasce na primeira operação, ' +
        'não quando aparece lucro. Como tudo fica on-chain, o histórico é sempre ' +
        'recuperável pelo endereço da carteira num explorador, mesmo que o terminal não ' +
        'exporte nada.',
    },
  ],

  // ---------------------------------------------------------------------------
  // Itens que a pesquisa NÃO conseguiu confirmar em fonte confiável
  // ---------------------------------------------------------------------------
  naoVerificado: [
    {
      titulo: 'Ordem limite: fica on-chain ou depende do servidor da plataforma?',
      texto:
        'A documentação oficial do Axiom diz que você pode "se afastar da tela", mas não ' +
        'afirma se a ordem fica na blockchain ou se um servidor monitora o preço e dispara. ' +
        'A narrativa de "monitores on-chain 24/7" aparece só em sites clones e afiliados. ' +
        'Teste com valor mínimo antes de confiar.',
    },
    {
      titulo: 'A frase-semente tem 12 palavras?',
      texto:
        'Fontes de terceiros dizem que sim, mas a documentação oficial fala em "recovery ' +
        'phrase" sem citar o número de palavras. O que ESTÁ confirmado é o que importa: a ' +
        'frase aparece no cadastro, fica acessível nas configurações e pode ser importada ' +
        'em carteiras externas.',
    },
    {
      titulo: 'Exportação de histórico em CSV para fins fiscais',
      texto:
        'Nenhuma página da documentação oficial do Axiom trata de exportar CSV (planilha) ou ' +
        'gerar relatório fiscal; a de portfólio mostra o histórico no app, com links para o ' +
        'explorador de blocos. Não conte com essa exportação sem confirmar — o histórico ' +
        'on-chain sempre pode ser exportado do explorador.',
    },
    {
      titulo: 'Valor real da gorjeta de MEV no momento',
      texto:
        'O valor mínimo do Jito (1.000 lamports, ou 0,000001 SOL) e o padrão do Axiom (0,001 ' +
        'SOL) estão confirmados, mas a gorjeta mínima ao vivo ("tip floor") em setembro de ' +
        '2026 não pôde ser lida na pesquisa. Os percentis citados por aí vêm de um exemplo ' +
        'fixo da documentação, de 2024.',
    },
    {
      titulo: 'Quanto é preciso operar para chegar ao nível de taxa mais barato',
      texto:
        'A tabela de níveis do Axiom (0,95% até 0,75%) é oficial, mas nenhuma fonte ' +
        'confiável publica os limiares de volume de cada nível: não dá para calcular quanto ' +
        'operar para pagar menos.',
    },
    {
      titulo: 'Como o desconto de indicação se combina com a devolução em SOL',
      texto:
        'A documentação oficial dá 10% de desconto nas taxas por link de indicação, mas não ' +
        'diz como isso se soma à devolução de 0,05%–0,25%. Qualquer "taxa líquida ' +
        'combinada" que você encontrar é não confirmada. Códigos de terceiros anunciando 15% ' +
        'ou 20% divergem do número oficial.',
    },
    {
      titulo: 'Texto dos Termos de Uso',
      texto:
        'A linguagem jurídica sobre custódia só apareceu em resultado de busca, numa página ' +
        'que bloqueia acesso automatizado e não pôde ser aberta. O modelo não-custodial está ' +
        'confirmado pela FAQ e pela página de cadastro; o texto do contrato continua não ' +
        'verificado.',
    },
    {
      titulo: 'Números de receita, volume e participação de mercado',
      texto:
        'Números como "mais de 50% do mercado" ou "US$390 milhões de receita" vêm de ' +
        'reportagem, de agregadores e da própria empresa, sem auditoria independente. São ' +
        'contexto de negócio, não fato verificável, e não afetam as contas deste módulo.',
    },
    {
      titulo: 'Cotação usada nos exemplos em reais',
      texto:
        'As contas em reais assumem SOL ≈ R$512, obtido por SOL→USD × USD→BRL do Banco ' +
        'Central em 04/09/2026. Conversores diretos SOL→BRL mostraram valores muito ' +
        'dispersos, provavelmente por dado velho. Valem os valores em SOL; reconfira os reais.',
    },
  ],

  // ---------------------------------------------------------------------------
  // Fontes
  // ---------------------------------------------------------------------------
  fontes: [
    { titulo: 'Adams, Chan, Markovich & Wan — "Don\'t Let MEV Slip" (Uniswap Labs, custo real de negociar memecoin)', url: 'https://arxiv.org/abs/2309.13648', consultadoEm: '11/09/2026' },
    { titulo: 'Axiom — FAQs (custódia, infraestrutura, bundle checker)', url: 'https://docs.axiom.trade/faqs', consultadoEm: '06/09/2026' },
    { titulo: 'Axiom — Signup (frase de recuperação exportável)', url: 'https://docs.axiom.trade/getting-started/signup', consultadoEm: '06/09/2026' },
    { titulo: 'Axiom — Axiom Fees (tabela de níveis 0,95%–0,75%)', url: 'https://docs.axiom.trade/getting-started/fees/axiom-fees', consultadoEm: '06/09/2026' },
    { titulo: 'Axiom — Solana Fees (priority fee, gorjeta, modos de MEV)', url: 'https://docs.axiom.trade/getting-started/fees/solana-fees', consultadoEm: '06/09/2026' },
    { titulo: 'Axiom — Limit Orders', url: 'https://docs.axiom.trade/axiom/swap/limit-orders', consultadoEm: '06/09/2026' },
    { titulo: 'Axiom — Deposit (taxa de perpétuos via Hyperliquid)', url: 'https://docs.axiom.trade/perpetuals/deposit', consultadoEm: '06/09/2026' },
    { titulo: 'Turnkey — Case study Axiom (infraestrutura de chaves)', url: 'https://www.turnkey.com/case-studies/axiom-global-defi-trading-platform', consultadoEm: '06/09/2026' },
    { titulo: 'Solana Docs — Fee Structure (taxa-base, cobrada mesmo em falha)', url: 'https://solana.com/docs/core/fees/fee-structure', consultadoEm: '06/09/2026' },
    { titulo: 'Solana Developers — MEV Protection (slippage como defesa)', url: 'https://solana.com/developers/guides/advanced/mev-protection', consultadoEm: '06/09/2026' },
    { titulo: 'Solana — Reduced Slot Times (SIMD-0525, 400 ms → 350 ms)', url: 'https://solana.com/upgrades/reduced-slot-times', consultadoEm: '06/09/2026' },
    { titulo: 'Solana Docs — Rent exemption (depósito de conta de token)', url: 'https://solana.com/docs/rpc/http/getminimumbalanceforrentexemption', consultadoEm: '06/09/2026' },
    { titulo: 'pump.fun — Fees (bonding curve 1,25%, decomposição oficial)', url: 'https://pump.fun/docs/fees', consultadoEm: '06/09/2026' },
    { titulo: 'pump.fun — Bonding curve', url: 'https://pump.fun/docs/bonding-curve', consultadoEm: '06/09/2026' },
    { titulo: 'Raydium — Protocol Fees (0,25% padrão)', url: 'https://docs.raydium.io/ray/protocol-fees', consultadoEm: '06/09/2026' },
    { titulo: 'Jupiter — Manual mode (agregador, sem taxa de protocolo no swap básico)', url: 'https://docs.jup.ag/user-docs/trade/swap/manual-mode', consultadoEm: '06/09/2026' },
    { titulo: 'Jito — Low latency transaction send (mínimo de gorjeta)', url: 'https://docs.jito.wtf/lowlatencytxnsend', consultadoEm: '13/09/2026' },
    { titulo: 'Solscan — Why did my transaction fail (slippage exceeded)', url: 'https://info.solscan.io/why-did-my-transaction-fail', consultadoEm: '06/09/2026' },
    { titulo: 'Alchemy — Associated Token Account (depósito reembolsável)', url: 'https://www.alchemy.com/overviews/associated-token-account', consultadoEm: '06/09/2026' },
    { titulo: 'CoinDesk — ZachXBT alleges Axiom employee conducted insider trading (26/02/2026)', url: 'https://www.coindesk.com/markets/2026/02/26/zachxbt-alleges-axiom-employee-conducted-insider-trading', consultadoEm: '06/09/2026' },
    { titulo: 'The Block — Axiom hits $100 million in revenue (sem token nativo)', url: 'https://www.theblock.co/post/355676/axiom-exchange-hits-100-million-in-revenue-just-four-months-after-launch', consultadoEm: '06/09/2026' },
    { titulo: 'Blockworks — Axiom, Y Combinator e o modelo de terminal web', url: 'https://blockworks.com/news/axiom-ycombinator-startup-solana-memecoin-revenue-10m', consultadoEm: '06/09/2026' },
    { titulo: 'DefiLlama — Axiom fees, revenue & volume (dados on-chain)', url: 'https://defillama.com/protocol/axiom', consultadoEm: '06/09/2026' },
    { titulo: 'PhishDestroy — domínios de phishing imitando a plataforma', url: 'https://phishdestroy.io/domain/auth-axiom.trade', consultadoEm: '06/09/2026' },
    { titulo: 'Phantom — Revoke token approvals', url: 'https://help.phantom.com/hc/en-us/articles/19142125651731-Revoke-token-approvals', consultadoEm: '06/09/2026' },
    { titulo: 'Banco Central do Brasil — conversão de moedas (USD/BRL em 04/09/2026)', url: 'https://www.bcb.gov.br/en/currencyconversion', consultadoEm: '06/09/2026' },
    { titulo: 'Receita Federal — regulamentação de criptoativos e o programa DeCripto', url: 'https://www.gov.br/fazenda/pt-br/assuntos/noticias/2025/novembro/receita-federal-atualiza-regulamentacao-de-criptoativos-para-adapta-la-ao-padrao-internacional', consultadoEm: '06/09/2026' },
  ],

  // ---------------------------------------------------------------------------
  // PRIMEIRA VERSÃO — guardada para consulta; a tela não lê nada daqui
  //
  // O texto do módulo antes do redesenho de setembro de 2026: as seções longas,
  // as tabelas em cards com "Ver mais", a tabela das cinco taxas, as anatomias em
  // SVG, o gráfico de barras, as calculadoras e os fluxogramas antigos. O desenho
  // do dono resumiu e reorganizou esse conteúdo nas `secoes` lá de cima. Os
  // comentários de dentro falam da tela antiga. Pode ser apagado quando o dono
  // quiser (as fontes de tudo continuam em `fontes`).
  // ---------------------------------------------------------------------------
  primeiraVersao: {
    // ---------------------------------------------------------------------------
    // Seções de texto, uma por aba (campo `aba` diz onde a view a coloca)
    // ---------------------------------------------------------------------------
    secoes: [
      // ================================ TERMINAL ================================
      {
        id: 'o-que-e-terminal',
        aba: 'terminal',
        titulo: 'O que é um terminal de execução',
        emUmaFrase: 'O terminal é um site que monta a sua ordem e a manda para a DEX. Ele não é a exchange.',
        paragrafos: [
          'Quando você clica em "comprar" num terminal, ele não faz a troca sozinho. Ele ' +
            'monta a transação, aplica as suas configurações e pede que você assine.',
          'A troca de verdade acontece na DEX, a exchange descentralizada. Lá, os tokens saem ' +
            'de uma pool de liquidez: um contrato inteligente que guarda os dois lados da troca.',
          'O terminal fica no meio, entre a sua carteira e a DEX. Ele não substitui a ' +
            'blockchain e não tem uma lista de preços própria.',
        ],
        quadro: [
          {
            rotulo: 'O terminal (site ou app)',
            texto:
              'Monta a transação, aplica slippage, prioridade e proteção de MEV, e pede a sua ' +
              'assinatura.',
          },
          {
            rotulo: 'A pool da DEX (contrato)',
            texto: 'Faz a troca de fato. Continua existindo mesmo se o terminal sair do ar.',
          },
        ],
        paragrafosFinais: [
          'Se o terminal sair do ar amanhã, a pool continua lá. Seus tokens continuam na sua ' +
            'carteira, desde que as chaves sejam suas. Esse é o assunto da próxima aba.',
          'O que você paga ao usar um terminal é conveniência: descoberta de tokens novos, ' +
            'gráficos, dados de holders, botões de compra rápida e rastreamento de carteiras.',
          'Você não paga por um preço melhor. É neste ponto que o marketing da categoria mais ' +
            'escorrega.',
        ],
        detalhe: {
          titulo: 'as palavras desta seção',
          lista: [
            'Slippage: quanto o preço pode mudar entre enviar a ordem e ela executar. Está na aba Configurações.',
            'Prioridade (priority fee): um pagamento extra para a transação entrar mais rápido.',
            'Proteção de MEV: defesa contra bots que tentam lucrar se posicionando em volta da sua ordem.',
            'Holders: as carteiras que têm aquele token.',
          ],
        },
      },
      {
        id: 'as-tres-camadas',
        aba: 'terminal',
        titulo: 'As três camadas — e o que cada uma cobra',
        emUmaFrase:
          'A mesma troca pode ser feita de três jeitos. Só o terminal soma uma taxa própria por cima.',
        paragrafos: [
          'Toda troca termina numa pool de liquidez. O que muda entre os três jeitos é o que ' +
            'fica entre você e essa pool.',
          'Saber isso responde à pergunta "por que estou pagando isso?". Sem essa resposta, ' +
            'você só paga.',
        ],
        quadro: [
          {
            rotulo: 'DEX direto',
            texto:
              'Você usa o site da própria DEX, como Raydium, Orca ou PumpSwap. Paga só a taxa ' +
              'da pool: 0,25% no padrão da Raydium.',
          },
          {
            rotulo: 'Agregador',
            texto:
              'Um site como o Jupiter procura a melhor rota entre dezenas de DEXs. No modo ' +
              'manual, não cobra taxa própria no swap básico.',
          },
          {
            rotulo: 'Terminal',
            texto:
              'Um site como Axiom, Photon ou BullX. Cobra a taxa da plataforma POR CIMA de ' +
              'tudo: no Axiom, de 0,95% a 0,75%.',
          },
        ],
        paragrafosFinais: [
          'A taxa do terminal não compra preço melhor. Ela paga a interface e as ferramentas.',
        ],
        detalhe: {
          titulo: 'as letras miúdas de cada camada',
          lista: [
            'Raydium: dos 0,25%, 0,22% vão para quem forneceu a liquidez (docs.raydium.io/ray/protocol-fees).',
            'Jupiter: a taxa que ele não cobra se chama taxa de protocolo. Você segue pagando a taxa da DEX por baixo (docs.jup.ag/user-docs/trade/swap/manual-mode).',
            'Axiom: 0,95% líquido é o nível de entrada e 0,75% é o topo (docs.axiom.trade/getting-started/fees/axiom-fees).',
          ],
        },
      },
      {
        id: 'alternativas-da-categoria',
        aba: 'terminal',
        titulo: 'Não existe uma opção única',
        emUmaFrase: 'O Axiom é só o exemplo deste módulo. Não é indicação, e não é a única opção.',
        paragrafos: [
          'O módulo usa o Axiom porque precisa mostrar uma tela real, com números reais. Sem ' +
            'isso, o conteúdo vira abstração.',
          'Saber que existem outras plataformas evita uma confusão: achar que "operar ' +
            'on-chain" e "usar aquele site" são a mesma coisa.',
        ],
        listaTitulo:
          'Outras plataformas ativas na data desta pesquisa, sem ranking e sem comparação de qualidade:',
        lista: [
          'Photon — terminal web para Solana, com foco em escanear e executar manualmente.',
          'BullX (NEO) — terminal que funciona em mais de uma rede.',
          'Trojan — funciona dentro do aplicativo Telegram: rastrear, negociar e copiar operações.',
          'Bonkbot — bot de Telegram, foco em simplicidade, só Solana.',
          'GMGN — web e Telegram, várias redes, foco em copiar operações de outras carteiras (copy trading) e em proteção contra MEV.',
          'Banana Gun, Maestro e Padre — outros nomes ativos na categoria em 2026.',
        ],
      },

      // ================================ CUSTÓDIA ================================
      {
        id: 'custodia-do-axiom',
        aba: 'custodia',
        titulo: 'Quem guarda as chaves',
        emUmaFrase:
          'No Axiom, segundo a documentação oficial, as chaves ficam com você. O dinheiro fica ' +
          'protegido, e a segurança fica toda nas suas mãos.',
        paragrafos: [
          'Antes de usar qualquer plataforma, pergunte: quem guarda as chaves? A resposta muda ' +
            'o seu risco por completo.',
          'A regra vem do Módulo 1: "not your keys, not your coins". Se as chaves não são ' +
            'suas, as moedas também não são.',
        ],
        quadro: [
          {
            rotulo: 'Custodial',
            texto:
              'A empresa guarda as chaves. Você deposita, e o saldo fica dentro dela. Se ela ' +
              'cair ou sumir, o saldo vai junto.',
          },
          {
            rotulo: 'Não-custodial',
            texto:
              'As chaves ficam com você. O dinheiro fica na sua carteira, na blockchain. É o ' +
              'modelo que a documentação do Axiom afirma usar.',
          },
        ],
        listaTitulo: 'O que a documentação oficial do Axiom diz:',
        lista: [
          'A FAQ afirma que os seus ativos "estão sempre sob o seu controle e de mais ninguém".',
          'A FAQ também diz que fundos e transações são inteiramente on-chain, ou seja, registrados na própria blockchain.',
          'A página de cadastro ensina a ver a frase de recuperação (a semente, as palavras que recriam a carteira) nas configurações, a qualquer momento.',
          'A mesma página recomenda importar a semente numa carteira comum, como Phantom, Rabby ou Solflare, "para garantir que você sempre tenha acesso direto aos seus fundos sob quaisquer circunstâncias".',
        ],
        paragrafosFinais: [
          'Essa última é a prova prática mais forte. Uma plataforma que te entrega a semente ' +
            'não está guardando o seu dinheiro.',
          'A parte boa: no trading spot, que é comprar e vender o próprio token, não existe ' +
            'saldo depositado na empresa que possa sumir com ela. Isso elimina o risco de ' +
            'contraparte.',
          'A parte pesada: a segurança é 100% sua. Nenhum suporte recupera fundos perdidos, ' +
            'reverte uma assinatura ou desfaz uma operação ruim.',
          'Por isso, o primeiro passo em qualquer terminal não-custodial é exportar a semente ' +
            'e guardá-la offline, como o Módulo 1 ensinou.',
        ],
        detalhe: {
          titulo: 'quem opera as chaves por trás do Axiom',
          paragrafos: [
            'A infraestrutura de chaves é operada por uma empresa terceirizada, a Turnkey. Ela ' +
              'gera e usa as chaves dentro de ambientes isolados.',
            'A Turnkey declara que nenhuma chave privada fica exposta, nem a ela nem ao ' +
              'operador do app (turnkey.com/case-studies/axiom-global-defi-trading-platform).',
            'Risco de contraparte é o risco de quem guarda o seu dinheiro falhar. Fontes do ' +
              'Axiom: docs.axiom.trade/faqs e docs.axiom.trade/getting-started/signup.',
          ],
        },
      },
      {
        id: 'o-risco-real-e-o-frontend',
        aba: 'custodia',
        titulo: 'O risco real não é a custódia, é o app sair do ar',
        emUmaFrase:
          'Com as chaves na sua mão, o maior risco é o app travar na hora em que você precisa vender.',
        paragrafos: [
          'Se as chaves são suas, a empresa não pode sumir com o seu dinheiro. O risco que ' +
            'sobra é operacional: o terminal parar de funcionar.',
          'O terminal é o seu painel de controle. E um painel pode travar justo no minuto em ' +
            'que você precisa dele.',
        ],
        exemplo: {
          titulo: 'O que aconteceu em 28 e 29 de agosto de 2025',
          passos: [
            'O pump.fun publicou uma mudança na API sem avisar as ferramentas que dependiam dela. API é a porta pela qual um sistema conversa com outro.',
            'Usuários do Axiom ficaram horas sem conseguir vender, até a mudança ser revertida.',
            'Traders relataram perdas concretas no chat da plataforma.',
            'Quem tinha a semente exportada contornou o problema: abriu a carteira em outro lugar e vendeu direto no site do pump.fun ou no Jupiter.',
          ],
        },
        paragrafosFinais: [
          'A lição é mecânica, não moral. Exportar a semente não é burocracia de segurança. É ' +
            'o seu plano B operacional.',
          'Terminal fora do ar, com a semente guardada: um inconveniente.',
          'Terminal fora do ar, sem a semente: uma posição que você não consegue encerrar.',
        ],
      },
      {
        id: 'incidente-fevereiro-2026',
        aba: 'custodia',
        titulo: 'O incidente de fevereiro de 2026 e o que ele ensina',
        emUmaFrase: '"Não-custodial" protege o seu dinheiro. Não protege a sua privacidade.',
        paragrafos: [
          'Em 26 de fevereiro de 2026, o investigador on-chain ZachXBT publicou uma ' +
            'investigação sobre o Axiom.',
          'Ela alegava que funcionários abusaram de ferramentas internas de suporte para ' +
            'consultar carteiras e histórico de usuários, ao longo de cerca de dez meses.',
          'Em poucas horas, a empresa confirmou em público. Disse estar "chocada e ' +
            'decepcionada" com o uso indevido das ferramentas, removeu o acesso e prometeu ' +
            'investigar (CoinDesk, 26/02/2026).',
        ],
        quadro: [
          {
            rotulo: 'O que NÃO foi',
            texto:
              'Invasão de contrato, roubo de chaves ou saque de fundos. Nenhum fundo foi ' +
              'reportado como roubado e nenhuma chave privada como exposta.',
          },
          {
            rotulo: 'O que foi',
            texto:
              'Abuso de privilégio interno: gente de dentro olhando dados de usuários. O painel ' +
              'dava visibilidade, não controle.',
          },
        ],
        paragrafosFinais: [
          'A arquitetura não-custodial continuou fazendo o que promete. É justamente por isso ' +
            'que o caso é útil.',
          'Ele mostra um tipo de risco que a autocustódia não resolve: o abuso de privilégio ' +
            'interno. E esse risco não aparece em nenhuma página de marketing.',
          'A conclusão prática não é "fuja desta plataforma". É não tratar nenhum terminal como ' +
            'seguro por desenho.',
          'Assuma que o que você faz numa plataforma é visível para quem a opera.',
        ],
      },

      // ================================== TAXAS ==================================
      {
        id: 'a-taxa-anunciada-nao-e-o-custo',
        aba: 'taxas',
        titulo: 'A taxa anunciada não é o que você paga',
        emUmaFrase:
          'O número anunciado é só a fatia da plataforma. Uma compra tem cinco camadas de custo.',
        paragrafos: [
          'Toda plataforma anuncia um número, como "1%" ou "a partir de 0,75%". Esse número é ' +
            'verdadeiro, mas incompleto.',
          'Ele mostra só o que a plataforma cobra. As outras quatro camadas saem do seu bolso ' +
            'do mesmo jeito, e não aparecem nele.',
        ],
        listaTitulo: 'As cinco camadas de uma compra:',
        lista: [
          'Taxa da plataforma: a única anunciada.',
          'Taxa-base da rede Solana: 5.000 lamports por assinatura, ou 0,000005 SOL. Lamport é a menor fração do SOL. É cobrada mesmo quando a transação falha.',
          'Priority fee: um pagamento extra ao validador, o computador que registra transações na rede, para a sua entrar mais rápido. No Axiom, o padrão é 0,001 SOL.',
          'Gorjeta de MEV (o "bribe", via Jito): compra proteção contra ataques de bots. No Axiom, o padrão é 0,001 SOL.',
          'Taxa da pool: cobrada pela pool onde a troca acontece.',
        ],
        exemplo: {
          titulo: 'Uma compra de R$100 num token na bonding curve (a primeira linha da matriz)',
          passos: [
            'Taxa da plataforma, a anunciada: ≈ R$0,94.',
            'Custos fixos (rede, priority fee e gorjeta): ≈ R$1,03.',
            'Taxa da pool: ≈ R$1,24.',
            'Total: ≈ R$3,20, ou 3,2% do valor. A taxa anunciada foi a MENOR das três partes.',
          ],
        },
        paragrafosFinais: [
          'Numa compra pequena, a taxa da plataforma pode ser a menor das camadas, e não a ' +
            'maior. É o contrário do que a intuição sugere. Por isso a matriz desta aba existe.',
        ],
        detalhe: {
          titulo: 'quem recebe o priority fee e a gorjeta',
          paragrafos: [
            'Essas duas não são receita da plataforma. Vão para validadores. Mas são ' +
              'justamente as que não aparecem no número anunciado.',
            'Fontes: padrões do Axiom em docs.axiom.trade/getting-started/fees/solana-fees. ' +
              'Taxa-base cobrada mesmo em falha em solana.com/docs/core/fees.',
          ],
        },
      },
      {
        id: 'custo-fixo-pesa-mais-em-ordem-pequena',
        aba: 'taxas',
        titulo: 'Por que ordem pequena é mecanicamente penalizada',
        emUmaFrase: 'Parte do custo é fixa. Por isso, quanto menor a ordem, maior o peso das taxas.',
        paragrafos: [
          'Algumas taxas são percentuais: crescem junto com a ordem. Outras são fixas: custam ' +
            'o mesmo valor em SOL, qualquer que seja o tamanho.',
          'O priority fee e a gorjeta somam 0,002 SOL nos valores padrão. Custam igual se você ' +
            'move o equivalente a R$50 ou a R$5.000.',
        ],
        exemplo: {
          titulo: 'Os mesmos 0,002 SOL em duas ordens',
          passos: [
            'Ordem de R$100: os 0,002 SOL pesam cerca de 1% do valor.',
            'Ordem dez vezes maior: os mesmos 0,002 SOL pesam cerca de 0,1%.',
            'A taxa é a mesma. O peso ficou dez vezes menor.',
          ],
        },
        paragrafosFinais: [
          'A matriz não mostra um detalhe: toda operação é ida e volta. Você paga essas taxas ' +
            'ao comprar e paga de novo ao vender, inclusive quando sai no prejuízo.',
          'Existe um valor abaixo do qual o atrito das taxas domina o resultado. Isto não é ' +
            'conselho de tamanho de posição.',
          'É saber calcular onde fica esse ponto, em vez de receber um número pronto de alguém.',
        ],
      },
      {
        id: 'o-venue-muda-o-custo',
        aba: 'taxas',
        titulo: 'O mesmo terminal cobra diferente conforme onde o token está',
        emUmaFrase:
          'A taxa da pool depende de onde o token está, não do terminal. Na bonding curve, ela é ' +
          'cinco vezes a de uma AMM madura (1,25% contra 0,25%).',
        paragrafos: [
          'O "venue" é o lugar onde a troca acontece de fato: a pool em que o token está sendo ' +
            'negociado.',
          'Um token passa por lugares diferentes ao longo da vida. Cada lugar cobra uma taxa ' +
            'de pool diferente, e isso muda a conta inteira.',
        ],
        listaTitulo: 'O caminho de um token do pump.fun, e a taxa de pool em cada etapa:',
        ordenada: true,
        lista: [
          'Bonding curve do pump.fun: o token acabou de nascer, e uma fórmula define o preço conforme as pessoas compram. Taxa da pool: 1,25%.',
          'PumpSwap: o token "graduou" e ganhou a sua pool canônica, a pool oficial dele. A taxa continua em 1,25% enquanto o market cap (o valor total do token) é pequeno, e cai por faixas conforme cresce.',
          'AMM madura, como a Raydium: a taxa padrão é 0,25%. AMM é a DEX em que a própria pool calcula o preço.',
        ],
        exemplo: {
          titulo: 'A mesma ordem de R$512, no mesmo terminal (linhas 2 e 3 da matriz)',
          passos: [
            'Token na bonding curve: taxa da pool ≈ R$6,39. Custo total ≈ 2,4%.',
            'Token já numa AMM madura: taxa da pool ≈ R$1,28. Custo total ≈ 1,4%.',
            'Só mudou o lugar onde o token está.',
          ],
        },
        paragrafosFinais: [
          'Isso não é defeito do terminal. É onde a troca acontece. Mas muda a sua conta, e ' +
            'raramente aparece explicado.',
          'E a taxa é só uma parte do custo. Um estudo com 534 mil negociações reais mediu o ' +
            'custo total numa memecoin popular: 6 vezes o de um par entre duas moedas estáveis.',
        ],
        detalhe: {
          titulo: 'a divisão da taxa e o estudo da Uniswap Labs',
          paragrafos: [
            'Na bonding curve, os 1,25% se dividem oficialmente em 0,300% para o criador do ' +
              'token e 0,95% para o protocolo (pump.fun/docs/fees). A taxa da Raydium está em ' +
              'docs.raydium.io/ray/protocol-fees.',
            'O estudo: Adams, Chan, Markovich & Wan, "Don\'t Let MEV Slip", Financial ' +
              'Cryptography 2024, feito pela Uniswap Labs.',
            'Ele mediu o custo total efetivo: taxa, deslizamento de preço e o que bots de MEV ' +
              'extraem. Deu 140 pontos-base por dólar negociado na memecoin, contra 22 no par ' +
              'de moedas estáveis. Um ponto-base é 0,01%.',
            'A pool da memecoin estudada era mais funda, ou seja, tinha mais liquidez, do que a ' +
              'maioria das de memecoin recém-lançada.',
            'O mesmo estudo mediu a chance de sofrer deslizamento causado por um bot adversário: ' +
              'cerca de 80% maior na memecoin do que na moeda madura.',
          ],
        },
      },

      // ============================== CONFIGURAÇÕES ==============================
      {
        id: 'tipos-de-ordem',
        aba: 'configuracoes',
        titulo: 'Tipos de ordem e a pergunta que ninguém responde',
        emUmaFrase:
          'Não assuma que uma ordem limite dispara com o app fechado. A documentação oficial não diz.',
        paragrafos: [
          'Ao clicar em comprar, você faz uma ordem a mercado. Ela compra ou vende ao preço ' +
            'atual, na hora. É o swap padrão.',
          'A ordem limite só executa quando o preço chega ao nível que você definiu. A ' +
            'documentação do Axiom diz que você pode definir um preço preciso e "se afastar da ' +
            'tela".',
          'Aí vem a pergunta que decide se dá para confiar nela: quem fica vigiando o preço ' +
            'enquanto você está longe? A documentação oficial NÃO responde.',
        ],
        quadro: [
          {
            rotulo: 'Se a ordem fica registrada na blockchain',
            texto: 'Ela executa mesmo que a empresa suma.',
          },
          {
            rotulo: 'Se um servidor da plataforma vigia o preço',
            texto:
              'Ela só executa enquanto esse servidor estiver de pé. E servidores caem, como a ' +
              'aba Custódia mostrou.',
          },
        ],
        paragrafosFinais: [
          'Até isso estar documentado, não conte com a ordem limite com o app fechado. Teste ' +
            'você mesmo, com um valor mínimo, antes de usá-la numa posição que importa.',
        ],
        detalhe: {
          titulo: 'outros tipos de ordem e os "monitores 24/7"',
          paragrafos: [
            'Existem também compras programadas em faixas: DCA, que é comprar aos poucos, ou ' +
              'ordens em degraus. Página oficial: docs.axiom.trade/axiom/swap/limit-orders.',
            'Material de terceiros menciona stop-loss (vender se cair até um preço) e ' +
              'take-profit (vender se subir até um preço) como variações de ordem limite.',
            'A promessa de "monitores on-chain 24/7" aparece só em sites clones e afiliados, ' +
              'não na documentação oficial.',
          ],
        },
      },
      {
        id: 'slippage-priority-mev',
        aba: 'configuracoes',
        titulo: 'As três configurações que quebram a operação',
        emUmaFrase:
          'Estas configurações só decidem se a transação executa, falha ou é explorada. ' +
          'Nenhuma aumenta chance de lucro.',
        paragrafos: [
          'Antes de comprar, o terminal usa três configurações. Errar qualquer uma quebra a ' +
            'operação, para um lado ou para o outro.',
        ],
        quadro: [
          {
            rotulo: 'Slippage',
            texto:
              'Quanto o preço pode mudar entre enviar a ordem e ela executar. Baixo demais: a ' +
              'transação falha. Alto demais: você aceita um preço muito pior.',
          },
          {
            rotulo: 'Priority fee',
            texto:
              'Pagamento extra ao validador para entrar mais rápido. Baixo demais no ' +
              'congestionamento: demora ou falha. Alto demais: paga caro à toa.',
          },
          {
            rotulo: 'Proteção de MEV',
            texto:
              'Defesa contra bots que se posicionam em volta da sua ordem. No Axiom há três ' +
              'modos: Off, Reduced e Secure.',
          },
        ],
        exemplo: {
          titulo: 'Slippage na prática (valores hipotéticos, só para ilustrar)',
          passos: [
            'Você aceita slippage de 1%. O preço piora mais que 1% antes de a ordem executar.',
            'A rede cancela a transação com "slippage exceeded". Você perde a taxa de rede e a oportunidade, mas não compra caro.',
            'Agora você aceita 50%. A ordem quase sempre passa, mas pode executar a um preço muito pior. Numa pool rasa, isso vira um convite para bots.',
          ],
        },
        paragrafosFinais: [
          'A documentação da Solana diz que limitar o slippage é a defesa mais eficaz contra ' +
            'ataques de sandwich. Nesse ataque, um bot compra logo antes de você e vende logo ' +
            'depois.',
          'Na proteção de MEV, a própria documentação do Axiom recomenda usar o modo Secure ' +
            'sempre que possível.',
          'Cuidado com o botão de compra rápida. Ele executa um valor pré-configurado num ' +
            'clique, sem tela de revisão. É conveniente, e por isso está na lista de erros ' +
            'comuns.',
        ],
        detalhe: {
          titulo: 'os três modos de MEV e o priority fee automático',
          lista: [
            'Off: exposto a front-running, que é alguém passar na frente da sua ordem.',
            'Reduced: roteia via Jito, com algum risco remanescente.',
            'Secure: só validadores da lista. Mais protegido e possivelmente mais lento.',
            'O priority fee padrão do Axiom é 0,001 SOL. A plataforma afirma calcular valores recomendados automaticamente, com base nas transações do momento.',
            'Fonte sobre slippage como defesa: solana.com/developers/guides/advanced/mev-protection.',
          ],
        },
      },
      {
        id: 'ler-a-tela-de-operacao',
        aba: 'configuracoes',
        titulo: 'Ler a tela — e o que ela não prova',
        emUmaFrase: 'Ler os painéis reduz surpresa. Não garante segurança.',
        paragrafos: [
          'A tela de um token junta muita coisa: gráfico de preço, market cap, volume, liquidez ' +
            'da pool, número e distribuição de holders.',
          'Tem também um feed de transações recentes, com link para o explorador de blocos, o ' +
            'site que mostra tudo o que foi gravado na blockchain.',
          'É muita informação de uma vez. O Módulo 3 já ensinou o que procurar nela.',
        ],
        listaTitulo: 'As três checagens que importam:',
        lista: [
          'Liquidez travada ou queimada. Se a LP, o recibo da liquidez, não está travada, quem criou o token pode retirar a liquidez e sumir.',
          'Concentração de holders. Poucas carteiras com percentual alto significam risco de despejo, uma venda grande de uma vez.',
          'Bundles. São compras coordenadas no mesmo bloco, que simulam demanda orgânica.',
        ],
        paragrafosFinais: [
          'Nenhum indicador, sinal social ou rastreamento de carteira é prova de que um token é ' +
            'seguro.',
        ],
        detalhe: {
          titulo: 'como o Axiom marca bundles, e onde isso falha',
          paragrafos: [
            'Pela documentação do Axiom, se pelo menos quatro transações acontecem no mesmo ' +
              'bloco, elas são sinalizadas como possível bundle.',
            'A própria documentação admite: "nenhum método de detecção de bundle é 100% ' +
              'infalível — alguns falsos positivos ou bundles não detectados são inevitáveis" ' +
              '(docs.axiom.trade/faqs).',
            'Falso positivo é alertar sem haver bundle. Bundle não detectado é o contrário: ' +
              'haver bundle e não alertar.',
          ],
        },
      },

      // ================================== ERROS ==================================
      {
        id: 'erros-de-execucao',
        aba: 'erros',
        titulo: 'Os erros que custam dinheiro sem envolver o mercado',
        emUmaFrase: 'Dá para perder dinheiro sem o preço se mexer: basta errar na operação.',
        paragrafos: [
          'Alguns prejuízos não têm nada a ver com o token subir ou cair. São erros de operação.',
          'Neles, a pessoa sabia a regra e errou mesmo assim, por pressa ou por reflexo.',
          'O mais caro é comprar o token errado. Qualquer um pode criar um token com o mesmo ' +
            'nome e o mesmo ticker, a sigla curta, do que está em alta.',
        ],
        quadro: [
          {
            rotulo: 'Nome e ticker',
            texto: 'São apelidos. Podem ser repetidos à vontade.',
          },
          {
            rotulo: 'Endereço do contrato',
            texto: 'É a identidade. Busque sempre pelo endereço verificado, nunca pelo nome.',
          },
        ],
        listaTitulo: 'Os outros erros comuns, em resumo:',
        lista: [
          'Slippage alto numa pool rasa, em que a sua própria compra move o preço.',
          'Quantia digitada errada, ou botão de compra rápida ainda no valor da operação anterior.',
          'Assinar sem ler o que a transação autoriza. O Módulo 1 já mostrou onde isso termina.',
          'Perseguir uma vela que já subiu. É erro de disciplina disfarçado de decisão.',
        ],
        paragrafosFinais: [
          'E um erro que vem antes de todos: operar na carteira principal.',
          'Uma carteira separada só para operar limita o estrago se o dispositivo ou o app ' +
            'forem comprometidos. E não custa nada criar.',
        ],
      },
      {
        id: 'bots-de-sniping',
        aba: 'erros',
        titulo: 'Por que velocidade não é uma disputa que você vença',
        emUmaFrase:
          'Um bot reage em milissegundos. Você leva de 30 a 60 segundos. Essa corrida não é sua.',
        paragrafos: [
          'Bots de sniping são programas que vigiam a blockchain. Eles compram tokens novos ' +
            'frações de segundo depois que a liquidez é criada.',
          'Esta seção não ensina a usar bot. Ela existe para ajustar a sua expectativa, porque ' +
            'expectativa errada aqui custa dinheiro real.',
        ],
        quadro: [
          {
            rotulo: 'O bot',
            texto:
              'Reage na casa das dezenas de milissegundos, com transações pré-assinadas e ' +
              'infraestrutura colada à produção de blocos.',
          },
          {
            rotulo: 'Você',
            texto: 'Leva de 30 a 60 segundos entre ver a informação e ter a transação confirmada.',
          },
        ],
        paragrafosFinais: [
          'O diferencial deles não é inteligência. É infraestrutura.',
          'Quando você vê um token "novo" já subindo, os bots já entraram. O preço que você ' +
            'consegue no lançamento é um preço que um bot mais rápido decidiu recusar.',
          'Pôr inteligência artificial para reagir por você não resolve. Uma chamada de modelo ' +
            'leva segundos, e a disputa se decide em milissegundos. A IA te deixa mais lento.',
        ],
        detalhe: {
          titulo: 'o tamanho de um slot na Solana',
          paragrafos: [
            'Slot é a janela de tempo em que a rede produz um bloco novo. Um milissegundo (ms) ' +
              'é um milésimo de segundo.',
            'Em 21 de agosto de 2026, o slot passou de 400 ms para 350 ms. Foi a primeira ' +
              'redução desde o lançamento da rede (SIMD-0525, ' +
              'solana.com/upgrades/reduced-slot-times).',
          ],
        },
      },

      // ================================= PROCESSO =================================
      {
        id: 'registro-para-imposto',
        aba: 'processo',
        titulo: 'Guardar registro desde a primeira operação',
        emUmaFrase:
          'A obrigação de registrar começa na primeira operação, não quando aparece lucro.',
        paragrafos: [
          'Isso liga direto com a seção de impostos do Módulo 1 (IN RFB 2.291/2025 e o ' +
            'programa DeCripto).',
        ],
        listaTitulo: 'Guarde o seu próprio registro de cada compra e venda:',
        lista: [
          'Data.',
          'Valor em reais.',
          'Custo de aquisição, ou seja, quanto custou comprar.',
        ],
        paragrafosFinais: [
          'Exportar o histórico pelo próprio terminal: NÃO VERIFICADO. Não conte com isso sem ' +
            'confirmar você mesmo no app.',
          'A boa notícia é que você não depende do terminal. Todas as transações ficam ' +
            'on-chain, gravadas na blockchain.',
          'O histórico sempre pode ser recuperado pelo endereço da carteira num explorador de ' +
            'blocos, que permite exportar.',
          'Isto não é orientação tributária. Guarde o registro e procure um contador.',
        ],
        detalhe: {
          titulo: 'o que a documentação do Axiom diz sobre histórico',
          paragrafos: [
            'A documentação oficial descreve ver o histórico de operações no app e dá links ' +
              'para o Solscan, um explorador de blocos.',
            'Mas não há nenhuma página oficial sobre exportar CSV, o arquivo de planilha, nem ' +
              'sobre gerar relatório fiscal.',
          ],
        },
      },
      {
        id: 'do-token-ao-encerramento',
        aba: 'processo',
        titulo: 'Do "vi um token" ao "encerrei a posição"',
        emUmaFrase:
          'Cada passo é uma chance de parar antes de gastar dinheiro. "Não opero" é um resultado válido.',
        paragrafos: [
          'Este fluxo amarra este módulo com o Módulo 4. É disciplina operacional, não um ' +
            'método para achar oportunidade.',
          'A grande diferença é que este processo tem saídas pelo caminho. Por isso a ordem dos ' +
            'passos importa.',
        ],
        ordenada: true,
        lista: [
          'Abra o terminal pelo favorito oficial. Nunca por link de anúncio ou rede social: existem sites falsos (phishing) imitando plataformas conhecidas.',
          'Busque pelo endereço do contrato verificado. Nunca pelo nome ou pelo ticker.',
          'Passe o token pela página Checklist antes de comprar: endereço oficial, extensões e autoridades do contrato, concentração de holders, bundles e histórico de quem criou.',
          'Escreva a tese antes de comprar. Junto com ela, escreva o ponto de invalidação: onde você admite que errou e sai.',
          'Defina o tamanho da posição e confira o valor no campo. Atenção redobrada se o botão de compra rápida estiver ligado.',
          'Configure slippage, prioridade e proteção de MEV com consciência. Faça primeiro uma operação-teste com valor mínimo.',
          'Saia em degraus, conforme o plano feito antes da entrada. Não conforme o que você sente durante.',
        ],
        paragrafosFinais: [
          'E o passo que não é passo: decidir NÃO operar. É um resultado legítimo e frequente do ' +
            'processo, não uma falha dele.',
          'Se as checagens acendem alerta, ou se você não consegue escrever a tese com clareza, ' +
            'o certo é não clicar.',
          'Como o Módulo 2 mostrou, a maioria das memecoins vai a zero. Passar na maioria das ' +
            'vezes é o esperado de quem segue o processo, não sinal de que ele travou.',
        ],
      },
    ],

    // ---------------------------------------------------------------------------
    // Tabela: as três camadas e o que cada uma cobra (aba "terminal")
    // ---------------------------------------------------------------------------
    tabelaCamadas: {
      colunas: [
        { chave: 'oQueFaz', rotulo: 'O que faz' },
        { chave: 'cobra', rotulo: 'O que cobra' },
        { chave: 'observacao', rotulo: 'Observação' },
      ],
      linhas: [
        {
          id: 'dex-direto',
          titulo: 'DEX direto',
          subtitulo: 'Raydium, Orca, PumpSwap — exemplos de categoria',
          valores: {
            oQueFaz: 'É a pool de liquidez onde a troca acontece de fato, no contrato inteligente.',
            cobra: 'Só a taxa da pool — 0,25% no padrão da Raydium, 1,25% na bonding curve do pump.fun.',
            observacao: 'Camada mais barata e a menos confortável: sem descoberta de token, sem gráfico integrado, sem dados de holders.',
          },
          detalheExtra:
            'Na Raydium (AMM v4), os 0,25% se dividem em 0,22% para quem fornece liquidez e ' +
            '0,03% para recompra de RAY. A taxa da pool existe independentemente de qual ' +
            'interface você usou para chegar até ela — inclusive quando você usa um terminal.',
        },
        {
          id: 'agregador',
          titulo: 'Agregador de liquidez',
          subtitulo: 'Jupiter — exemplo de categoria',
          valores: {
            oQueFaz: 'Varre várias DEXs procurando a melhor rota para a sua ordem e divide entre pools se compensar.',
            cobra: 'No modo manual, sem taxa de protocolo no swap básico; você paga a DEX por baixo e a rede.',
            observacao: 'Acrescenta busca de preço sem acrescentar custo de plataforma.',
          },
          detalheExtra:
            'É a camada que efetivamente pode melhorar o seu preço de execução, porque ' +
            'compara rotas. Um terminal normalmente usa um agregador por baixo — ou seja, ' +
            'você já está pagando por essa camada mesmo sem saber que ela existe.',
        },
        {
          id: 'terminal',
          titulo: 'Terminal de execução',
          subtitulo: 'Axiom, Photon, BullX — exemplos de categoria',
          valores: {
            oQueFaz: 'Interface, descoberta de tokens, gráficos, dados de holders, botões de compra rápida, rastreamento.',
            cobra: 'Taxa da plataforma POR CIMA de tudo — no Axiom, 0,95% líquido no nível de entrada.',
            observacao: 'Você paga por conveniência e ferramentas, não por preço melhor.',
          },
          detalheExtra:
            'A tabela de níveis do Axiom vai de 0,95% líquido (Wood, entrada) a 0,75% ' +
            '(Champion, topo), com devolução em SOL de 0,05% a 0,25%. Os limiares de volume ' +
            'para subir de nível não são publicados oficialmente — ou seja, não dá para ' +
            'calcular quanto é preciso operar para chegar ao nível mais barato.',
        },
      ],
    },

    // ---------------------------------------------------------------------------
    // Tabela: as cinco camadas de custo de uma compra (aba "taxas")
    // ---------------------------------------------------------------------------
    tabelaTaxas: {
      colunas: [
        { chave: 'quanto', rotulo: 'Quanto é' },
        { chave: 'quemRecebe', rotulo: 'Quem recebe' },
        { chave: 'tipo', rotulo: 'Fixa ou variável' },
      ],
      linhas: [
        {
          id: 'plataforma',
          titulo: '1. Taxa da plataforma',
          subtitulo: 'A única que costuma ser anunciada',
          valores: {
            quanto: '0,95% líquido no nível de entrada, até 0,75% no topo (1% bruto menos a devolução em SOL).',
            quemRecebe: 'A plataforma; parte volta ao usuário como devolução em SOL.',
            tipo: 'Variável por nível de volume.',
          },
          detalheExtra:
            'Fonte: docs.axiom.trade/getting-started/fees/axiom-fees. Fontes de terceiros de ' +
            '2025 citavam 0,9%; onde houver conflito, vale a documentação oficial — a ' +
            'divergência normalmente indica material desatualizado.',
        },
        {
          id: 'rede',
          titulo: '2. Taxa-base da rede',
          subtitulo: 'A menor de todas, e ainda assim inescapável',
          valores: {
            quanto: '0,000005 SOL por assinatura (5.000 lamports). Fração de centavo.',
            quemRecebe: 'Validadores — metade é queimada.',
            tipo: 'Fixa.',
          },
          detalheExtra:
            'Cobrada mesmo quando a transação falha: "Charged whether the transaction ' +
            'succeeds or fails" (solana.com/docs/core/fees). É por isso que uma transação ' +
            'revertida por slippage ainda custa alguma coisa — pouca, mas não zero.',
        },
        {
          id: 'priority',
          titulo: '3. Priority fee',
          subtitulo: 'Não aparece na taxa anunciada',
          valores: {
            quanto: 'Configurável; o padrão do Axiom é 0,001 SOL.',
            quemRecebe: 'O validador, integralmente.',
            tipo: 'Fixa em SOL — por isso pesa mais em ordem pequena.',
          },
          detalheExtra:
            'Sobe em momentos de congestionamento. Traders relatam precisar elevar bastante ' +
            'esse valor em picos, o que sozinho pode transformar o custo total de uma compra ' +
            'pequena.',
        },
        {
          id: 'gorjeta',
          titulo: '4. Gorjeta de MEV (Jito)',
          subtitulo: 'Também não aparece na taxa anunciada',
          valores: {
            quanto: 'Configurável; o padrão do Axiom é 0,001 SOL. O mínimo do Jito é 1.000 lamports (0,000001 SOL).',
            quemRecebe: 'Validadores, pelas contas de gorjeta do Jito.',
            tipo: 'Fixa em SOL.',
          },
          detalheExtra:
            'É o que compra a proteção contra ataques de sandwich. Não é receita da ' +
            'plataforma. Junto com o priority fee, soma 0,002 SOL nos valores padrão — cerca ' +
            'de 1% numa ordem de R$100 e 0,1% numa ordem dez vezes maior.',
        },
        {
          id: 'pool',
          titulo: '5. Taxa da pool',
          subtitulo: 'A que mais varia, e não depende do terminal',
          valores: {
            quanto: '1,25% na bonding curve do pump.fun; 1,25% caindo por faixa no PumpSwap; 0,25% na Raydium.',
            quemRecebe: 'Criador do token, protocolo e provedores de liquidez, conforme o venue.',
            tipo: 'Variável conforme onde o token está.',
          },
          detalheExtra:
            'Na bonding curve do pump.fun a decomposição oficial é 0,300% para o criador do ' +
            'token e 0,95% para o protocolo (pump.fun/docs/fees). Numa compra pequena de ' +
            'token novo, esta costuma ser a MAIOR das cinco camadas — maior que a taxa da ' +
            'plataforma, que é a única anunciada.',
        },
      ],
    },

    // ---------------------------------------------------------------------------
    // Matriz de custo: a mesma operação em três situações (aba "taxas")
    //
    // Substitui de propósito o "número único" de custo. As três pesquisas deram
    // números diferentes justamente porque usaram tamanhos e venues diferentes —
    // mostrar a variação ensina mais do que escolher um número e esconder o resto.
    // ---------------------------------------------------------------------------
    matrizDeCusto: {
      cotacaoAssumida:
        'Contas feitas com SOL ≈ R$512, obtido por SOL→USD (mercado) × USD→BRL (Banco ' +
        'Central, 5,1253 em 04/09/2026). A cotação é suposição declarada e muda o peso das ' +
        'taxas fixas: reconfira antes de usar os valores em reais.',
      colunas: [
        { chave: 'pool', rotulo: 'Taxa da pool' },
        { chave: 'fixos', rotulo: 'Peso dos custos fixos' },
        { chave: 'total', rotulo: 'Custo total aproximado' },
      ],
      linhas: [
        {
          id: 'pequena-bonding',
          titulo: 'Ordem de R$100, token na bonding curve',
          subtitulo: 'O cenário mais caro dos três',
          valores: {
            pool: '1,25% ≈ R$1,24',
            fixos: '0,002 SOL ≈ R$1,03 — cerca de 1% da ordem',
            total: '≈ R$3,20, ou 3,2% do valor',
          },
          detalheExtra:
            'Decomposição: custos fixos R$1,03 + plataforma R$0,94 + pool R$1,24. Repare na ' +
            'ordem de grandeza: a taxa da plataforma, a única anunciada, é a MENOR das três. ' +
            'Slippage não está incluído e seria custo adicional.',
        },
        {
          id: 'maior-bonding',
          titulo: 'Ordem de R$512, mesmo token na bonding curve',
          subtitulo: 'Só o tamanho mudou',
          valores: {
            pool: '1,25% ≈ R$6,39',
            fixos: '0,002 SOL ≈ R$1,03 — cerca de 0,2% da ordem',
            total: '≈ R$12,27, ou 2,4% do valor',
          },
          detalheExtra:
            'Os custos fixos são exatamente os mesmos em SOL da linha anterior, mas o peso ' +
            'percentual caiu de ~1% para ~0,2%, porque estão diluídos numa ordem cinco vezes ' +
            'maior. Nada mudou na plataforma nem no token — só o tamanho da ordem.',
        },
        {
          id: 'maior-amm',
          titulo: 'Ordem de R$512, token já em AMM madura',
          subtitulo: 'O mesmo terminal, o mesmo tamanho, outro venue',
          valores: {
            pool: '0,25% ≈ R$1,28',
            fixos: '0,002 SOL ≈ R$1,03 — cerca de 0,2% da ordem',
            total: '≈ R$7,16, ou 1,4% do valor',
          },
          detalheExtra:
            'Comparando com a linha de cima: mesma plataforma, mesmo tamanho de ordem, mesmo ' +
            'dia — e o custo cai de 2,4% para 1,4% apenas porque o token já saiu da bonding ' +
            'curve. É a prova de que "quanto custa operar" não tem um número único.',
        },
      ],
    },

    // ---------------------------------------------------------------------------
    // Anatomias — mockups desenhados com marcadores numerados
    //
    // Ilustrações esquemáticas, não capturas de plataforma nenhuma: captura seria
    // republicação de material de terceiro, pareceria endosso, e nasceria vencida.
    // Coordenadas no viewBox; a legenda é o conteúdo, o desenho é enriquecimento.
    // ---------------------------------------------------------------------------
    anatomias: {
      telaDoTerminal: {
        titulo: 'Anatomia da tela de um terminal',
        descricao:
          'O que cada painel mostra, e o que cada um NÃO prova. Clique num item da legenda para ' +
          'localizar no desenho.',
        viewBox: [0, 0, 640, 400],
        paineis: [
          { id: 'grafico', x: 12, y: 12, w: 400, h: 220, rotulo: 'Gráfico de preço', tipo: 'grafico' },
          { id: 'numeros', x: 424, y: 12, w: 204, h: 100, rotulo: 'Market cap · Volume · Liquidez', tipo: 'numeros' },
          { id: 'holders', x: 424, y: 124, w: 204, h: 108, rotulo: 'Holders', tipo: 'lista' },
          { id: 'transacoes', x: 12, y: 244, w: 400, h: 144, rotulo: 'Transações recentes', tipo: 'lista' },
          { id: 'quantia', x: 424, y: 244, w: 204, h: 66, rotulo: 'Quantia', tipo: 'campo' },
          { id: 'comprar', x: 424, y: 322, w: 204, h: 66, rotulo: 'Comprar', tipo: 'botao', alerta: true },
        ],
        itens: [
          {
            painel: 'grafico',
            titulo: 'Gráfico de preço',
            texto: 'Mostra o passado. A vela que já subiu é exatamente a que você não deveria perseguir — isso é erro de disciplina, não de análise.',
          },
          {
            painel: 'numeros',
            titulo: 'Market cap, volume e liquidez',
            texto: 'O que importa para a SUA ordem é a liquidez: pool rasa significa que a sua própria compra move o preço. Conecta direto com o slippage.',
          },
          {
            painel: 'holders',
            titulo: 'Distribuição de holders',
            texto: 'Poucas carteiras com percentual alto significam risco de despejo. É a checagem de concentração do Módulo 3.',
          },
          {
            painel: 'transacoes',
            titulo: 'Feed de transações',
            texto: 'Quatro ou mais compras no mesmo bloco podem ser bundle — demanda coordenada fingindo ser orgânica. A própria documentação admite falsos positivos.',
          },
          {
            painel: 'quantia',
            titulo: 'Campo de quantia',
            texto: 'Confira o valor antes de clicar. O botão de compra rápida executa o preset sem tela de revisão — e o preset pode ser o da operação anterior.',
          },
          {
            painel: 'comprar',
            titulo: 'O botão',
            texto: 'Executa com o slippage, a prioridade e a proteção de MEV que estiverem configurados. Se algum estiver errado, é aqui que o erro vira prejuízo.',
          },
        ],
        nota: 'Ler os painéis reduz surpresa, não garante segurança. Nenhum indicador, sinal social ou rastreamento de carteira é prova de que um token é seguro.',
      },

      custodia: {
        titulo: 'Custodial × não-custodial, lado a lado',
        descricao: 'Dois sinais na tela dizem qual dos dois modelos você está usando.',
        viewBox: [0, 0, 640, 300],
        paineis: [
          { id: 'saldo-c', x: 12, y: 12, w: 300, h: 80, rotulo: 'CUSTODIAL — saldo na plataforma', tipo: 'numeros' },
          { id: 'deposito', x: 12, y: 104, w: 300, h: 70, rotulo: 'Depositar', tipo: 'botao', alerta: true },
          { id: 'chaves-c', x: 12, y: 186, w: 300, h: 100, rotulo: 'Chaves: nos servidores da empresa', tipo: 'texto', alerta: true },
          { id: 'saldo-n', x: 328, y: 12, w: 300, h: 80, rotulo: 'NÃO-CUSTODIAL — saldo na sua carteira', tipo: 'numeros' },
          { id: 'semente', x: 328, y: 104, w: 300, h: 70, rotulo: 'Frase de recuperação (exportável)', tipo: 'campo' },
          { id: 'chaves-n', x: 328, y: 186, w: 300, h: 100, rotulo: 'Chaves: com você', tipo: 'texto' },
        ],
        itens: [
          {
            painel: 'deposito',
            titulo: 'Botão de depósito',
            texto: 'Sinal de custódia: o dinheiro sai da sua carteira e vira um saldo dentro da empresa. Quem tem as chaves tem o dinheiro.',
          },
          {
            painel: 'chaves-c',
            titulo: 'Chaves nos servidores',
            texto: 'Se a plataforma cair, for hackeada ou agir de má-fé, o saldo vai junto. É o risco de contraparte do Módulo 1.',
          },
          {
            painel: 'semente',
            titulo: 'Frase de recuperação exportável',
            texto: 'Sinal de autocustódia: a plataforma te entrega a semente. Uma empresa que te entrega a semente não está guardando o seu dinheiro.',
          },
          {
            painel: 'chaves-n',
            titulo: 'Chaves com você',
            texto: 'Se o app sair do ar, você importa a semente em outra carteira e continua com acesso. A responsabilidade de segurança também é 100% sua.',
          },
        ],
        nota: 'O Axiom, exemplo deste módulo, está no modelo da direita segundo a documentação oficial. Vários bots de Telegram estão no da esquerda. Confira antes de depositar qualquer coisa.',
      },

      tokenImpostor: {
        titulo: 'Anatomia do token impostor',
        descricao: 'Dois resultados para a mesma busca. Um deles foi criado para pegar quem busca pelo nome.',
        viewBox: [0, 0, 640, 260],
        paineis: [
          { id: 'busca', x: 12, y: 12, w: 616, h: 56, rotulo: 'Buscar: nome do token', tipo: 'campo' },
          { id: 'legitimo', x: 12, y: 84, w: 616, h: 76, rotulo: 'Resultado 1 — liquidez alta, milhares de holders', tipo: 'numeros' },
          { id: 'impostor', x: 12, y: 172, w: 616, h: 76, rotulo: 'Resultado 2 — mesmo nome, mesmo ticker, liquidez baixa', tipo: 'numeros', alerta: true },
        ],
        itens: [
          {
            painel: 'busca',
            titulo: 'Buscar pelo nome',
            texto: 'Este é o erro. Nome e ticker podem ser duplicados à vontade — qualquer um cria um token chamado igual ao que está em alta, em minutos.',
          },
          {
            painel: 'legitimo',
            titulo: 'O token que você queria',
            texto: 'Liquidez, holders e histórico coerentes. Mas nada disso é o que o identifica.',
          },
          {
            painel: 'impostor',
            titulo: 'O impostor',
            texto: 'Mesmo nome, mesmo ticker, contrato diferente. Quem compra aqui comprou um token que ninguém mais vai comprar.',
          },
        ],
        nota: 'A única identidade de um token é o endereço do contrato. Copie o endereço de uma fonte confiável e busque por ele — nunca pelo nome.',
      },
    },

    // ---------------------------------------------------------------------------
    // Ilustração das camadas (aba Terminal): o caminho da ordem com a taxa de cada
    // etapa anotada. Desenhada em SVG na view; aqui ficam só os rótulos.
    // ---------------------------------------------------------------------------
    ilustracaoCamadas: [
      { id: 'carteira', rotulo: 'Carteira', taxa: 'assina', detalhe: 'Você autoriza cada transação' },
      { id: 'terminal', rotulo: 'Terminal', taxa: '0,95%', detalhe: 'Interface e ferramentas' },
      { id: 'agregador', rotulo: 'Agregador', taxa: '0%', detalhe: 'Busca a melhor rota' },
      { id: 'pool', rotulo: 'Pool da DEX', taxa: '0,25–1,25%', detalhe: 'Onde a troca acontece' },
    ],

    // ---------------------------------------------------------------------------
    // Calculadora de impacto de preço (a matemática mora em views/modulo5.js)
    // ---------------------------------------------------------------------------
    calculadoraDeImpacto: {
      titulo: 'Quanto a sua própria ordem empurra o preço',
      descricao:
        '"Pool rasa" é adjetivo até virar número. Arraste o tamanho da ordem e a liquidez da pool ' +
        'e veja quanto do preço cotado você de fato recebe.',
      controles: [
        {
          id: 'ordem',
          rotulo: 'Tamanho da sua ordem',
          min: 0.1,
          max: 20,
          passo: 0.1,
          valor: 1,
          sufixo: ' SOL',
          formatar: (n) => n.toFixed(1).replace('.', ','),
        },
        {
          id: 'pool',
          rotulo: 'Liquidez da pool (lado do SOL)',
          min: 1,
          max: 500,
          passo: 1,
          valor: 50,
          sufixo: ' SOL',
          formatar: (n) => String(n),
        },
      ],
      nota:
        'Modelo de produto constante (x · y = k), a fórmula básica das AMMs. Pools reais anunciam ' +
        'liquidez somando os dois lados, então uma pool "de 100 SOL" tem cerca de 50 SOL deste ' +
        'lado. O impacto aqui é só o da sua ordem: não inclui a taxa da pool nem o slippage que ' +
        'você configurou — os dois vêm por cima.',
    },

    // ---------------------------------------------------------------------------
    // Gráfico de barras empilhadas: como o custo se reparte em cada cenário
    //
    // Mesmos três cenários da matrizDeCusto, mas mostrando a PROPORÇÃO entre as
    // camadas. A tabela dá os números; só a barra empilhada mostra que a fatia
    // anunciada é a única que praticamente não muda de um cenário para o outro.
    // ---------------------------------------------------------------------------
    graficoDeCamadas: {
      camadas: [
        { chave: 'fixos', rotulo: 'Custos fixos (rede, prioridade, gorjeta)', cor: 'acento' },
        { chave: 'plataforma', rotulo: 'Taxa da plataforma (a anunciada)', cor: 'primaria' },
        { chave: 'pool', rotulo: 'Taxa da pool', cor: 'risco-medio' },
      ],
      grupos: [
        {
          rotulo: 'R$100, bonding curve',
          detalhe: '3,21%',
          valores: { fixos: 1.03, plataforma: 0.94, pool: 1.24 },
        },
        {
          rotulo: 'R$512, bonding curve',
          detalhe: '2,40%',
          valores: { fixos: 0.2, plataforma: 0.95, pool: 1.25 },
        },
        {
          rotulo: 'R$512, AMM madura',
          detalhe: '1,40%',
          valores: { fixos: 0.2, plataforma: 0.95, pool: 0.25 },
        },
      ],
      sufixo: '%',
      legenda:
        'Cada barra é uma compra, repartida nas camadas de custo, em porcentagem da ordem. ' +
        'Repare que a faixa roxa — a única taxa anunciada — é quase do mesmo tamanho nas três.',
    },

    // ---------------------------------------------------------------------------
    // Calculadora de atrito (a matemática mora em views/modulo5.js)
    // ---------------------------------------------------------------------------
    calculadoraDeAtrito: {
      titulo: 'Quanto o atrito come, com o mercado parado',
      descricao:
        'Cada operação cobra o pedágio na ida e na volta. Arraste os controles para ver o que ' +
        'sobra do capital depois de um tanto de operações — sem o preço ter subido nem caído.',
      controles: [
        {
          id: 'operacoes',
          rotulo: 'Operações completas (comprar e vender)',
          min: 1,
          max: 100,
          passo: 1,
          valor: 20,
          // Contagem é número inteiro; sem isto o padrão de 2 casas mostraria "20,00".
          formatar: (n) => String(n),
        },
        {
          id: 'custo',
          rotulo: 'Custo de cada ida e volta',
          min: 0.5,
          max: 8,
          passo: 0.1,
          valor: 3.2,
          sufixo: '%',
        },
      ],
      nota:
        'Isto não é uma previsão e não diz nada sobre ganhar ou perder no mercado — é aritmética ' +
        'de custo, assumindo o preço parado, justamente para isolar o atrito. No mundo real o ' +
        'preço também se move, para os dois lados, e o atrito continua acontecendo por cima disso.',
    },

    // ---------------------------------------------------------------------------
    // Fluxogramas antigos. A tela nova desenha o caminho do dinheiro (aba Taxas),
    // as camadas (aba Terminal) e o processo (aba Processo) com peças próprias.
    // ---------------------------------------------------------------------------
    diagramas: [
      {
        id: 'camadas-carteira-dex',
        aba: 'terminal',
        titulo: 'As camadas entre a carteira e a DEX',
        legenda: 'A ordem sai da carteira, passa pelo terminal e pelo agregador, até chegar à pool.',
        codigoMermaid:
          'flowchart LR\n' +
          '  A[Carteira] --> B[Terminal de execução]\n' +
          '  B --> C[Agregador de liquidez]\n' +
          '  C --> D[Pool da DEX]\n' +
          '  D --> E[Token na carteira]',
        versaoEmTexto: [
          'A ordem começa na sua carteira, que assina a transação.',
          'O terminal recebe a ordem e aplica as suas configurações de slippage, prioridade e proteção de MEV.',
          'O terminal envia para um agregador de liquidez, que procura a melhor rota entre várias DEXs.',
          'O agregador roteia a ordem para uma ou mais pools de liquidez.',
          'O token comprado volta para a sua carteira.',
        ],
      },
      {
        // REESCRITO. A versão original da pesquisa (pt3) omitia a taxa da pool e a
        // gorjeta do Jito, e por isso concluía que a taxa da plataforma era quase
        // todo o custo — o contrário do que o pt2 demonstrou com fonte primária.
        id: 'caminho-do-dinheiro',
        aba: 'taxas',
        titulo: 'O caminho do dinheiro numa compra',
        legenda: 'As cinco camadas de custo entre o seu dinheiro e o token na carteira.',
        // A taxa da pool em âmbar: é a camada que o desenho pinta de âmbar (a maior
        // numa compra de token novo).
        codigoMermaid:
          'flowchart TD\n' +
          '  A["Compro R$ 100 em token"] --> B["Taxa de rede: fração de centavo"]\n' +
          '  B --> C["Priority fee: 0,001 SOL"]\n' +
          '  C --> D["Gorjeta de MEV: 0,001 SOL"]\n' +
          '  D --> E["Taxa da plataforma: 0,95%"]\n' +
          '  E --> F["Taxa da pool: de 0,25% a 1,25%"]\n' +
          '  F --> G["Recebo o token"]\n' +
          '  class F alerta',
        versaoEmTexto: [
          'Envio o equivalente a R$100 para comprar o token.',
          'Pago a taxa-base da rede Solana, 0,000005 SOL por assinatura — fração de centavo, cobrada mesmo se a transação falhar.',
          'Pago o priority fee, 0,001 SOL no padrão, para a transação ser incluída mais rápido.',
          'Pago a gorjeta de MEV, 0,001 SOL no padrão, que compra proteção contra ataque de sandwich.',
          'Pago a taxa da plataforma, 0,95% líquido no nível de entrada — a única camada que costuma ser anunciada.',
          'Pago a taxa da pool, de 0,25% numa AMM madura a 1,25% na bonding curve — normalmente a maior camada numa compra de token novo.',
          'Recebo o token, já descontada a diferença de preço (slippage), que é custo à parte e não entra nesta conta.',
        ],
      },
      {
        id: 'fluxo-de-decisao',
        aba: 'processo',
        titulo: 'Do token visto à posição encerrada',
        legenda: 'O trajeto completo, com dois pontos onde o processo termina em "não opero".',
        // "Não opero" em vermelho e "Encerrei a posição" em verde, como no desenho
        // (M5 › Processo). `ramoBom` pinta de verde só o rótulo "Sim".
        codigoMermaid:
          'flowchart TD\n' +
          '  A["Vi um token novo"] --> B{"Passou na checagem?"}\n' +
          '  B -- Não --> C["Não opero"]\n' +
          '  B -- Sim --> D["Defino tese e invalidação"]\n' +
          '  D --> E{"A tese está clara?"}\n' +
          '  E -- Não --> C\n' +
          '  E -- Sim --> F["Defino tamanho e entro"]\n' +
          '  F --> G["Saio em degraus"]\n' +
          '  G --> H["Encerrei a posição"]\n' +
          '  class C nao\n' +
          '  class H sim\n' +
          '  class D,F ramoBom',
        versaoEmTexto: [
          'Vejo um token novo e decido investigar.',
          'Passo o token pelo Checklist antes de comprar: endereço, contrato, concentração de holders. Se falhar, não opero — o processo termina aqui.',
          'Se a checagem passa, defino a tese de entrada e o ponto de invalidação antes de cogitar comprar.',
          'Se não consigo deixar a tese e a invalidação claras e objetivas, também não opero — o processo termina aqui.',
          'Se a tese está clara, defino o tamanho da posição e entro.',
          'Acompanho a posição e saio em degraus, conforme o plano definido antes da entrada.',
          'Encerro a posição.',
        ],
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // Vídeos — cada um vira o botão "Assistir a videoaula" dentro do card da seção
  // que ele reforça (o campo `secao` diz qual, casando com o `id` da seção em
  // `secoes`). O player só aparece no clique.
  // PENDENTE: a `transcricao`; enquanto ela não existe, o aviso padrão de
  // src/data/videoaulas.js entra embaixo do player.
  // ---------------------------------------------------------------------------
  videos: {
    'erros-de-execucao-e-bots': {
      titulo: 'Erros de execução e bots',
      secao: 'erros-de-execucao',
      src: 'assets/videos/erros-de-execucao-e-bots.mp4',
      duracao: '8:17',
      descricao: 'Por que você não vence bots na velocidade, e os erros que custam dinheiro sem envolver o mercado.',
      transcricao: [],
    },
    'do-token-ao-encerramento': {
      titulo: 'Do token ao encerramento',
      secao: 'do-token-ao-encerramento',
      src: 'assets/videos/do-token-ao-encerramento.mp4',
      duracao: '5:40',
      descricao: 'O fluxo completo de uma operação, do "vi um token" ao registro para o imposto.',
      transcricao: [],
    },
    'o-que-e-um-terminal': {
      titulo: 'O que é um terminal de execução e as três camadas',
      secao: 'as-tres-camadas',
      src: 'assets/videos/o-que-e-um-terminal.mp4',
      duracao: '7:27',
      descricao: 'Rede, protocolo e terminal: quem faz o quê numa compra.',
      transcricao: [],
    },
    'custodia-e-o-risco-real': {
      titulo: 'Quem guarda as chaves — e por que o risco real é o app sair do ar',
      secao: 'custodia-do-axiom',
      src: 'assets/videos/custodia-e-o-risco-real.mp4',
      duracao: '6:20',
      descricao: 'Não-custodial elimina o risco de contraparte, mas não o de o terminal parar.',
      transcricao: [],
    },
    'a-taxa-anunciada-nao-e-o-custo': {
      titulo: 'A taxa anunciada não é o que você paga',
      secao: 'a-taxa-anunciada-nao-e-o-custo',
      src: 'assets/videos/a-taxa-anunciada-nao-e-o-custo.mp4',
      duracao: '5:34',
      descricao: 'As cinco camadas de custo de uma compra pequena, e por que você paga duas vezes.',
      transcricao: [],
    },
    'slippage-prioridade-mev': {
      titulo: 'Tipos de ordem, slippage, prioridade e proteção de MEV',
      secao: 'slippage-priority-mev',
      src: 'assets/videos/slippage-prioridade-mev.mp4',
      duracao: '6:45',
      descricao: 'As três configurações que quebram uma operação quando ficam erradas.',
      transcricao: [],
    },
  },
};
