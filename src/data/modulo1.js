// modulo1.js — conteúdo do Módulo 1 (Fundamentos & Segurança Cripto).
//
// Fusão de duas pesquisas independentes: PESQUISA-MODULO-1-A.md (fundamentos de
// onboarding — chaves, gas, criar carteira, contrato inteligente, CEX vs. DEX,
// tutorial de revogação, plano de emergência, golpes no Brasil) e
// PESQUISA-MODULO-1-B.md (profundidade de segurança — confirmações, EIP-7702,
// address poisoning medido, correção da fatia dos afiliados em drainers). As
// duas ficam na raiz do projeto para quem quiser conferir as fontes originais.
//
// Formato: cada seção tem um campo `aba` que diz em qual aba da view ela aparece.
// Abas: 'fundamentos' | 'carteiras' | 'seed' | 'golpes' | 'defesa' | 'brasil'.
// A aba 'quiz' é montada à parte, a partir de modulo1.quiz. A tela segue o desenho
// "M1 Desktop" (pesquisa/design/handoff/designs): a view monta cada seção pelo id,
// com o visual descrito no próprio dado da seção.

export const modulo1 = {
  id: 'modulo-1',
  titulo: 'Fundamentos & Segurança Cripto',

  // Cabeçalho da página, como no desenho: a frase curta embaixo do título e o
  // "Lembrete" âmbar (a view escreve o "Lembrete: " em negrito na frente).
  subtitulo:
    'Como a blockchain funciona, onde ficam as suas chaves, como os golpes acontecem e o ' +
    'que fazer antes, durante e depois.',
  lembrete:
    'este módulo ensina segurança e fundamentos técnicos. Nomes de carteiras e corretoras ' +
    'aparecem só como exemplos de categoria, nunca como recomendação.',

  resumo:
    'Do zero: como a blockchain funciona e por que ela é "imutável", como ler uma ' +
    'transação num explorador de blocos, o que são chave privada, chave pública, gas e ' +
    'contrato inteligente, e a diferença entre corretora (CEX) e troca on-chain (DEX). ' +
    'Depois, a segurança: onde guardar cripto, por que a frase-semente É a sua carteira, ' +
    'como funcionam os golpes de esvaziamento de carteira (wallet drainers), como revogar ' +
    'aprovações e o que fazer nos primeiros minutos após uma drenagem. Por fim, os golpes ' +
    'mais comuns no Brasil e como sacar para reais no cenário regulatório atual.',

  objetivos: [
    'Abrir uma transação num explorador de blocos e explicar, em voz alta, o que aconteceu.',
    'Explicar a diferença entre chave privada, chave pública e endereço, e por que a frase-semente gera todas elas.',
    'Explicar o que é gas, por que uma transação que falha ainda cobra taxa, e diferenciar CEX de DEX.',
    'Criar uma carteira com segurança e escolher a categoria certa (CEX, hot wallet, cold wallet) para cada situação.',
    'Proteger a frase-semente e reconhecer as formas mais comuns de perdê-la.',
    'Identificar o roteiro de um golpe de drainer, revogar aprovações e agir nos primeiros minutos após uma drenagem.',
    'Reconhecer os golpes cripto mais comuns no Brasil e sacar para reais entendendo o cenário regulatório.',
  ],

  // Mapa do módulo ("O módulo inteiro numa olhada", no topo da página): o centro
  // e as folhas curtas de cada aba, copiados do desenho (M1 Desktop, renderVals ›
  // ABAS). `aba` é o id da aba na view. O ramo do Quiz não entra aqui: a view
  // conta as perguntas de `quiz` e escreve "N perguntas".
  mapa: {
    titulo: 'Fundamentos & Segurança',
    subtitulo: 'Quem tem a chave tem o dinheiro',
    ramos: [
      { aba: 'fundamentos', folhas: ['confirmações', 'explorador', 'gas', 'CEX × DEX'] },
      { aba: 'carteiras', folhas: ['chave → endereço', 'CEX · hot · cold', 'qual faz sentido'] },
      { aba: 'seed', folhas: ['12 palavras = a carteira', '5 formas de perder', 'checklist'] },
      { aba: 'golpes', folhas: ['drainer', 'os 3 truques', 'endereço quase igual'] },
      { aba: 'defesa', folhas: ['revogar', 'Permit2 · EIP-7702', 'emergência'] },
      { aba: 'brasil', folhas: ['4 golpes', 'CVM · BC', 'cronologia PSAV', 'impostos', 'sacar em reais'] },
    ],
  },

  // ---------------------------------------------------------------------------
  // Seções, na ordem do desenho (M1 Desktop). O campo `aba` diz em qual aba a
  // seção aparece; a view monta cada uma pelo `id`, com o visual dela.
  //
  // Cada seção segue o card do desenho: titulo → emUmaFrase (a ideia central) →
  // o visual (um campo próprio, descrito em cada seção) → paragrafos → "Para ir
  // mais fundo" (detalhe) → "Pergunta rápida" (pergunta: 'qN' = a pergunta N do
  // quiz deste módulo). Os textos curtos são os do desenho; o que o desenho
  // recolhe fica no `detalhe`.
  //
  // detalhe: { titulo, paragrafos?, lista?, ordenada?, selo?, partes?, paragrafosFinais? }
  //   ordenada: true = lista numerada; selo: etiqueta âmbar no fim do último item
  //   ("exemplo inventado"); partes: [{ titulo, passos }] = duas listas numeradas,
  //   cada uma com o seu subtítulo (o tutorial de revogação).
  //
  // Tons usados nos visuais: 'ok' (verde), 'alerta' (vermelho), 'atencao' (âmbar),
  // 'acento' (ciano), 'roxo' e 'neutro'.
  // ---------------------------------------------------------------------------
  secoes: [
    // ================================ FUNDAMENTOS ================================
    {
      id: 'o-que-e-blockchain',
      aba: 'fundamentos',
      titulo: 'O que é uma blockchain, e por que não tem "desfazer"',
      emUmaFrase:
        'Ninguém consegue apagar o seu saldo, e ninguém consegue devolver o seu erro. As duas ' +
        'coisas saem da mesma regra.',
      // A vida de uma transação: 4 passos, cada um com a pilha de blocos (o roxo é
      // o bloco com a sua transação; os cinzas, os blocos fechados por cima).
      confirmacoes: {
        frase: 'A vida de uma transação: cada bloco em cima é uma confirmação',
        passos: [
          { titulo: 'Entra num bloco', confirmacoes: '1 confirmação', texto: 'Já está na corrente.', blocosPorCima: 0 },
          { titulo: 'Blocos por cima', confirmacoes: '2, 3, 4…', texto: 'Cada bloco fechado em cima soma uma.', blocosPorCima: 2 },
          {
            titulo: 'Reverter fica impossível',
            confirmacoes: '12, 30 ou mais',
            texto: 'Um atacante teria de reescrever todos ao mesmo tempo.',
            blocosPorCima: 4,
            destaque: true,
          },
          {
            titulo: 'A corretora libera',
            confirmacoes: 'mínimo atingido',
            texto: 'Por isso ela espera um número mínimo antes de liberar um depósito.',
            blocosPorCima: 4,
          },
        ],
        legenda: { suaTransacao: 'o bloco com a sua transação', porCima: 'blocos fechados por cima' },
        descricao:
          '1. Sua transação entra num bloco: 1 confirmação. 2. Novos blocos são fechados em ' +
          'cima; cada um soma uma confirmação. 3. Com 12, 30 ou mais, reverter fica cada vez ' +
          'mais impossível. 4. Por isso as corretoras esperam um mínimo de confirmações antes ' +
          'de liberar um depósito.',
      },
      paragrafos: [
        'Uma blockchain é um caderno de registros que milhares de computadores copiam ao ' +
          'mesmo tempo. Não há um dono da lista, como o banco: a verdade é aquilo em que as ' +
          'cópias concordam. Cada página é um bloco, e cada bloco carrega o hash do anterior — ' +
          'uma impressão digital, um código curto que muda por inteiro se qualquer detalhe do ' +
          'bloco mudar.',
        'Por isso não há "desfazer". Mexer num bloco antigo muda o hash dele e quebra a ' +
          'ligação com todos os seguintes: para esconder uma transação, alguém teria de refazer ' +
          'tudo, em todas as cópias, ao mesmo tempo. "Imutável" não quer dizer proibido mudar; ' +
          'quer dizer caro demais.',
        'O lado bom: nenhuma empresa congela ou "corrige" o seu saldo. O ruim: se você digitou ' +
          'o endereço de destino errado ou caiu num golpe, o dinheiro se foi — sem estorno, sem ' +
          'gerente. E a transação que deu errado também fica gravada para sempre.',
        'Na tela, isso vira confirmações. A carteira (o aplicativo com que você envia e recebe ' +
          'cripto) mostra "pendente" até a transação entrar num bloco; depois, cada bloco ' +
          'fechado em cima do seu soma uma confirmação.',
      ],
      exemplo: {
        titulo: 'A mesma transação, minuto a minuto',
        passos: [
          'Ela entra num bloco: 1 confirmação. O saldo já mudou.',
          'A rede fecha blocos em cima dele: 2, 3, 4…',
          'Com 12, 30 ou mais, reverter é impossível na prática: seria preciso reescrever todos, em todas as cópias.',
          'Por isso a corretora só libera o seu depósito depois do mínimo de confirmações que ela mesma definiu.',
        ],
      },
      paragrafosFinais: [
        'O erro que isso evita é operar como se houvesse socorro depois. No cartão você ' +
          'contesta; no Pix há pedido de devolução; aqui, nada. Confira antes de apertar o botão.',
      ],
      detalhe: {
        titulo: 'bloco, hash e rede',
        lista: [
          'Bloco: uma "página" do caderno, com várias transações.',
          'Hash: a impressão digital que resume um bloco e o liga ao anterior.',
          'Rede: os milhares de computadores que guardam cópias iguais.',
          'Qualquer pessoa "lê" a blockchain, sem conta nem permissão — é o que permite ' +
            'auditar golpes e revisar permissões.',
        ],
      },
    },
    {
      id: 'explorador-de-blocos',
      aba: 'fundamentos',
      titulo: 'Explorador de blocos: como ler uma transação',
      emUmaFrase:
        'O explorador é um site só de leitura que mostra o que realmente aconteceu. Procure ' +
        'três respostas: deu certo? Quanto custou? O que se moveu?',
      // O visual é a anatomia modulo1.anatomias.transacao (mais abaixo neste arquivo).
      anatomia: 'transacao',
      paragrafos: [
        'Um explorador de blocos é um site que lê a blockchain e mostra o que ficou ' +
          'registrado. Só mostra: não guarda nada seu, não faz trocas, não pede senha. Quando a ' +
          'carteira ou um site dizem uma coisa e o explorador diz outra, vale o explorador. Cada ' +
          'rede tem o seu: Solscan (Solana), Etherscan (Ethereum), BscScan (BNB Chain) e ' +
          'Basescan (Base).',
        'As três respostas ficam em campos fixos, os da ilustração. "Deu certo?" é o Status: ' +
          'Success ou Failed. "Quanto custou?" é o Transaction Fee (ou Gas), cobrado mesmo com ' +
          'Failed. "O que se moveu?" fica na aba Token Transfers. Token é qualquer moeda criada ' +
          'dentro de uma rede, além da moeda nativa dela (a própria da rede, como o ETH na ' +
          'Ethereum).',
        'O campo To às vezes mostra um contrato (ou contrato inteligente): um programa que ' +
          'mora na blockchain e executa sozinho quando é chamado — tokens e trocas funcionam ' +
          'assim. E confira sempre a URL, porque há exploradores falsos. O verdadeiro nunca pede ' +
          'senha, nem a frase-semente (as palavras secretas da carteira, vistas adiante), nem ' +
          'que você conecte a carteira para ver uma transação.',
      ],
      exemplo: {
        titulo: 'A transação que "não fez nada"',
        passos: [
          'Você troca um token, abre a transação e o campo Value mostra 0 ETH.',
          'O impulso é achar que deu errado e refazer.',
          'Mas Value só conta a moeda nativa (o ETH). Numa troca de tokens, ele pode ser zero com tudo certo.',
          'Na aba Token Transfers aparece o que saiu e o que entrou na sua carteira.',
          'Success, Value 0 e Token Transfers preenchido: operação normal, não erro.',
        ],
      },
      paragrafosFinais: [
        'O erro que essa leitura evita é o mais caro do módulo: refazer uma operação que já ' +
          'tinha dado certo, pagando taxa duas vezes — e achar que foi roubado.',
      ],
      detalhe: {
        titulo: 'os outros campos, e como é no Solscan',
        lista: [
          'Transaction Hash: identificador único de 66 caracteres, começando com "0x". ' +
            'Block: o bloco e as confirmações. Timestamp: data e hora em UTC (o horário ' +
            'universal).',
          'Logs: a aba de eventos.',
          'No Solscan a lógica é a mesma: Signature (o identificador), Block/Slot, Timestamp, ' +
            'Result (Success/Failed), Signer (quem iniciou e pagou), Fee (em SOL, frações de ' +
            'centavo), Main Actions e Balance Changes (saldo antes e depois).',
        ],
      },
    },
    {
      id: 'gas-taxa-de-rede',
      aba: 'fundamentos',
      titulo: 'Gas: toda ação paga uma taxa, mesmo quando dá errado',
      emUmaFrase:
        'A rede não cobra pelo resultado. Cobra pelo trabalho — e o trabalho existe mesmo ' +
        'quando o resultado não vem.',
      // Success × Failed: dois cartões lado a lado. `texto` é uma lista de pedaços;
      // o pedaço { forte } sai em negrito.
      contraste: {
        cartoes: [
          { rotulo: 'Success', tom: 'ok', texto: ['Trabalho feito → ', { forte: 'paga o gas' }, ' → o resultado acontece.'] },
          { rotulo: 'Failed', tom: 'alerta', texto: ['Trabalho feito até o erro → ', { forte: 'paga o gas' }, ' → nada acontece.'] },
        ],
        descricao:
          'Transação com sucesso: paga gas, o resultado acontece. Transação que falha: paga ' +
          'gas do mesmo jeito, o resultado não acontece. Vale na EVM e na Solana.',
      },
      paragrafos: [
        'Gas é o trabalho de computador que a sua transação exige da rede: mandar uma moeda ' +
          'dá pouco; usar um contrato complicado, muito. Você paga o trabalho usado vezes o ' +
          'preço da unidade, que sobe quando muita gente usa a rede ao mesmo tempo — como ' +
          'corrida de aplicativo no horário de pico.',
        'Quem faz o trabalho são os validadores, os computadores que montam os blocos. Parte ' +
          'do que você paga vai para eles, como gorjeta; outra parte é queimada — destruída de ' +
          'propósito, sai de circulação. As duas saem do seu bolso.',
        'O que pega o iniciante é o cartão vermelho: se a transação falha — o preço mudou no ' +
          'caminho, o limite de gas era baixo, o contrato recusou —, a rede já trabalhou até o ' +
          'erro e cobra. Você paga e não leva nada, na EVM (a família de redes compatíveis com ' +
          'a Ethereum, como BNB Chain e Base) e na Solana.',
        'Na tela, o gas aparece antes, na carteira, como "taxa estimada de rede" (pode mudar), ' +
          'e depois, no explorador, como Transaction Fee (o valor real). Na Solana a taxa base ' +
          'é fixa: 5.000 lamports por assinatura (0,000005 SOL), mais gorjeta opcional; lamport ' +
          'é a menor fração do SOL, a moeda da Solana, como o centavo é do real.',
      ],
      exemplo: {
        titulo: 'Duas transações, duas taxas',
        passos: [
          'Você manda ETH para alguém: 21.000 unidades de gas, a operação mais simples da Ethereum.',
          'Status: Success. Você paga a taxa e o dinheiro chega.',
          'Depois, numa troca, algo dá errado no meio: Status Failed.',
          'O Transaction Fee continua lá: a rede trabalhou até o erro e cobrou. Seus tokens não mudaram; só a taxa saiu.',
        ],
      },
      paragrafosFinais: [
        'O erro que isso evita é apertar "tentar de novo" cinco vezes: cinco falhas, cinco ' +
          'taxas. Falhou duas vezes? Pare e veja o motivo no explorador.',
      ],
      detalhe: {
        titulo: 'EIP-1559, base fee, max fee e as redes L2',
        paragrafos: [
          'A EIP-1559 (agosto de 2021), mudança nas regras da Ethereum, dividiu o preço do gas ' +
            'em duas partes: a base fee, calculada pelo congestionamento e queimada, e a ' +
            'priority fee, opcional, que vai para o validador. O max fee é o teto que você ' +
            'aceita pagar; a sobra volta. Base é uma L2, uma rede construída em cima da ' +
            'Ethereum; a BNB Chain é uma rede alternativa.',
        ],
      },
    },
    {
      id: 'cex-x-dex',
      aba: 'fundamentos',
      titulo: 'Corretora (CEX) × troca on-chain (DEX): quem guarda a chave',
      emUmaFrase:
        'A diferença entre as duas não é o visual nem a taxa: é quem fica com a sua chave — e ' +
        'quem atende quando dá errado.',
      // Tabela de verdade: critérios nas linhas, CEX e DEX nas colunas.
      comparacao: {
        rotulo: 'Comparação CEX e DEX (role na horizontal se preciso)',
        larguraMinima: 540,
        criterios: [
          { chave: 'guarda', rotulo: 'Quem guarda o dinheiro', decisivo: true },
          { chave: 'cadastro', rotulo: 'Cadastro' },
          { chave: 'erro', rotulo: 'Se der errado' },
          { chave: 'preco', rotulo: 'De onde vem o preço' },
          { chave: 'quem', rotulo: 'Quem vive lá' },
        ],
        opcoes: [
          {
            titulo: 'CEX',
            subtitulo: 'corretora centralizada',
            valores: {
              guarda: 'A empresa (custódia).',
              cadastro: 'KYC obrigatório.',
              erro: 'Tem suporte; às vezes reverte um erro internamente.',
              preco: 'Livro de ofertas (order book).',
              quem: 'Moedas listadas pela empresa.',
            },
          },
          {
            titulo: 'DEX',
            subtitulo: 'programa na blockchain',
            valores: {
              guarda: 'Você, direto da sua carteira.',
              cadastro: 'Sem cadastro.',
              erro: 'Sem suporte e sem reversão.',
              preco: 'Pool de liquidez, via AMM.',
              quem: 'Quase todo token novo e memecoin.',
            },
          },
        ],
      },
      paragrafos: [
        'CEX é a corretora centralizada: uma empresa, com CNPJ, que guarda o dinheiro dos ' +
          'clientes. DEX é a troca descentralizada, ou on-chain (direto na blockchain): um ' +
          'contrato publicado na rede, que ninguém atende. A linha que decide é a primeira da ' +
          'tabela: quem guarda o dinheiro — ou seja, quem tem a chave, o segredo que autoriza ' +
          'movê-lo (a aba Carteiras explica).',
        'Três termos da tabela. KYC ("conheça o seu cliente") é o cadastro com documento, ' +
          'selfie e comprovante, como num banco. Livro de ofertas (order book) é a lista de ' +
          'quem quer comprar e vender, com preços; o negócio fecha quando duas pontas se ' +
          'encontram. Pool de liquidez é um reservatório com duas moedas, depositadas por ' +
          'outras pessoas: você tira uma e deixa a outra.',
        'Na DEX não há ninguém do outro lado: um AMM ("criador de mercado automático") calcula ' +
          'o preço pela proporção entre as duas moedas do pool. Quanto mais você tira de uma, ' +
          'mais cara ela fica, dentro da própria ordem. Essa diferença entre o preço da tela e ' +
          'o que você recebe é o slippage (escorregamento).',
        'Quase todo token novo e toda memecoin (token feito em torno de uma piada ou meme, sem ' +
          'produto por trás; tema do Módulo 2) só existem em DEX, porque criar um pool não pede ' +
          'licença a ninguém. É liberdade e desamparo juntos: na CEX, a empresa às vezes desfaz ' +
          'um erro; na DEX, o que você confirmou, valeu.',
      ],
      exemplo: {
        titulo: 'O mesmo token, dois caminhos',
        passos: [
          'Na CEX: cadastro, Pix, compra. O saldo fica na conta da empresa — as chaves são dela.',
          'Esqueceu a senha? E-mail de recuperação. Errou um envio? Chamado no suporte.',
          'Na DEX: você conecta a carteira, escolhe o token e confirma. Sem cadastro, sem senha para recuperar, sem chamado.',
          'O preço sai da proporção do pool — a conta está em "Para ir mais fundo", com um pool inventado.',
          'Comprar é fácil nos dois. Errar só tem conserto num deles.',
        ],
      },
      paragrafosFinais: [
        'O erro que isso evita é procurar suporte onde não existe. Depois de um erro numa DEX, ' +
          'quem responde ao seu pedido de "atendimento" é o golpista, que vigia essas ' +
          'mensagens. O próximo passo é o explorador, não o chat.',
      ],
      detalhe: {
        titulo: 'como o preço anda numa DEX (pool inventado, sem taxas)',
        ordenada: true,
        lista: [
          'Um pool com 10 ETH e 10.000 tokens. O AMM olha a proporção: 10.000 ÷ 10 = 1.000 ' +
            'tokens por ETH.',
          'Fórmula do produto constante: x × y = k. Aqui, 10 × 10.000 = 100.000, e isso não ' +
            'pode mudar.',
          'Você coloca 1 ETH. O pool fica com 11 ETH, então só pode ficar com 100.000 ÷ 11 ≈ ' +
            '9.091 tokens.',
          'Você recebe cerca de 909 tokens, não os 1.000 que a tela mostrava. A diferença é o ' +
            'slippage: quanto menor o pool e maior a ordem, pior.',
        ],
        selo: 'exemplo inventado',
      },
    },

    // ================================= CARTEIRAS =================================
    {
      id: 'chave-publica-privada-endereco',
      aba: 'carteiras',
      titulo: 'Chave privada, chave pública e endereço',
      emUmaFrase:
        'Três coisas de nomes parecidos e funções opostas. Confundir uma com a outra é o jeito ' +
        'mais rápido de entregar a carteira sem perceber.',
      // Da frase-semente ao endereço: 4 caixas ligadas por setas de mão única.
      chaves: {
        passos: [
          { etiqueta: 'Segredo absoluto', titulo: 'Frase-semente', texto: 'A raiz de tudo. 12 ou 24 palavras.', tom: 'alerta' },
          { etiqueta: 'Segredo absoluto', titulo: 'Chave privada', texto: 'Número secreto que assina as transações.', tom: 'alerta' },
          { etiqueta: 'Calculada', titulo: 'Chave pública', texto: 'Vem da privada. Da pública, ninguém volta à privada.', tom: 'neutro' },
          { etiqueta: 'Pode divulgar', titulo: 'Endereço', texto: 'Vem da pública. Como o número da conta para receber um Pix.', tom: 'ok' },
        ],
        legenda:
          'Cada passo é de mão única. Saber o seu endereço não permite a ninguém descobrir a ' +
          'sua chave.',
        descricao:
          'Da frase-semente nasce a chave privada; da privada, a pública; da pública, o ' +
          'endereço. Cada seta é de mão única: do endereço ninguém volta à chave.',
      },
      paragrafos: [
        'Em cripto não há senha guardada pelo site. Há a chave privada: um número secreto ' +
          'sorteado quando a carteira é criada, a partir da frase-semente — as 12 ou 24 ' +
          'palavras que o aplicativo mostra nessa hora (a aba Seed phrase explica). Da privada ' +
          'se calcula a chave pública; da pública, o endereço. As setas são de mão única: ' +
          'nunca voltam.',
        'Assinar — verbo que você vai ver o tempo todo — é usar a chave privada para provar, ' +
          'com matemática, que a ordem partiu de você. A rede confere a prova com a chave ' +
          'pública, sem ver a privada. Por isso, quem assina no seu lugar é, para a rede, você.',
        'O endereço serve para receber: pode ir num grupo ou num QR Code, como o número da ' +
          'conta para receber um Pix. Quem o tem vê o seu saldo e o seu histórico (a lista é ' +
          'pública), mas não descobre a sua chave nem gasta um centavo. A chave privada serve ' +
          'para gastar e nunca sai do aparelho: nenhuma tela legítima pede que você a digite. ' +
          'Privacidade e segurança, aqui, são problemas diferentes.',
      ],
      quadro: [
        {
          rotulo: 'Pode divulgar',
          texto:
            'O endereço. Serve para receber. Quem o tem consegue ver quanto você tem e o que ' +
            'você fez — e nada além disso.',
        },
        {
          rotulo: 'Segredo absoluto',
          texto:
            'A chave privada e a frase-semente que a gerou. Servem para gastar. Quem as tem ' +
            'assina no seu lugar, de qualquer lugar do mundo.',
          destaque: true,
        },
      ],
      paragrafosFinais: [
        'O erro que isso evita é o do "me manda sua chave para eu te enviar o token". Para te ' +
          'pagar, basta o endereço. Pedir chave privada, frase-semente ou print do backup é ' +
          'pedir posse, não pagamento.',
      ],
      detalhe: {
        titulo: 'bytes, curvas e o formato em cada rede',
        lista: [
          'A chave privada tem 32 bytes (256 bits de aleatoriedade). Da privada à pública, a ' +
            'conta usa a curva secp256k1 na EVM e a Ed25519 na Solana.',
          'Na EVM, o endereço são os últimos 20 bytes do hash Keccak-256 da chave pública: 42 ' +
            'caracteres começando com "0x", um resumo dela, não ela mesma.',
          'Na Solana, a chave pública de 32 bytes é o próprio endereço, em base58 (32 a 44 ' +
            'letras e números). Por isso chamar endereço de "chave pública" está certo na ' +
            'Solana, não na Ethereum.',
        ],
      },
    },
    {
      id: 'onde-ficam-chaves',
      aba: 'carteiras',
      titulo: 'Onde ficam suas chaves: CEX, hot wallet e cold wallet',
      emUmaFrase:
        'A sua chave pode estar em três lugares. A diferença entre eles não é conforto nem ' +
        'preço: é quem consegue gastar o seu dinheiro sem te pedir licença.',
      // O visual é a tabela modulo1.tabelaCarteiras (mais abaixo neste arquivo).
      paragrafos: [
        'As moedas não ficam "dentro" da carteira, como dinheiro num envelope: ficam ' +
          'registradas na blockchain, e você possui a chave privada que autoriza movê-las. Daí ' +
          'o ditado "not your keys, not your coins": se as chaves não são suas, as moedas não ' +
          'são suas.',
        'Na CEX, a corretora guarda as chaves por você (custódia, como num banco). Na hot ' +
          'wallet, ou carteira quente, você guarda, num aparelho ligado à internet — celular ou ' +
          'navegador. Na cold wallet, ou carteira fria, num aparelho físico que nunca se conecta.',
        'Cada uma falha de um jeito. Na CEX, a empresa pode quebrar, ser bloqueada ou ' +
          'bloquear a sua conta: é o risco de contraparte, de depender de alguém que pode ' +
          'sumir. Na quente, o perigo entra pelo aparelho — site falso, vírus, assinatura ' +
          'errada. Na fria, é quase todo humano: perder o papel ou digitar a frase-semente onde ' +
          'não devia.',
        'O teste prático: "para tirar o dinheiro agora, de madrugada, preciso da autorização ' +
          'de alguém?". Na CEX, sim — ela pode estar em manutenção, pedir documentos ou ' +
          'suspender saques. Nas outras, não: a sua chave assina e pronto. É liberdade, e ' +
          'também falta de rede de proteção.',
      ],
      exemplo: {
        titulo: 'O celular caiu na piscina',
        passos: [
          'Dinheiro na CEX: você instala o app em outro aparelho, faz login e o saldo está lá.',
          'Carteira quente, com a frase-semente anotada: você instala a carteira no aparelho novo, importa a frase e o saldo reaparece.',
          'Carteira quente SEM a frase anotada: acabou. Sem suporte, sem recuperação, sem segunda via.',
          'Carteira fria: o celular não tinha as chaves, então nada aconteceu.',
        ],
      },
      paragrafosFinais: [
        'O erro que isso evita é pôr o dinheiro na categoria errada: tudo numa corretora que um ' +
          'dia some, ou tudo numa carteira quente que clica em site novo todo dia. Antes de ' +
          'escolher, pergunte qual falha você aguenta.',
      ],
      detalhe: {
        titulo: 'exemplos de cada categoria e o risco de contraparte',
        lista: [
          'CEX: Binance e Mercado Bitcoin, só como exemplos. O risco de contraparte apareceu ' +
            'nos colapsos da FTX, Celsius e Mt. Gox.',
          'Hot wallet: Phantom (Solana) e MetaMask (EVM), só como exemplos. A entropia (a ' +
            'aleatoriedade que gera a chave) vem do próprio aparelho.',
          'Cold wallet: aparelhos da Ledger e de outros fabricantes. Protegem a chave, mas não ' +
            'impedem você de digitar a frase-semente num site de golpe. Em dezembro de 2023, a ' +
            'biblioteca Ledger Connect Kit foi adulterada num ataque de cadeia de suprimentos ' +
            '(uma peça de software usada por vários aplicativos).',
        ],
      },
    },
    {
      id: 'quando-cada-carteira-faz-sentido',
      aba: 'carteiras',
      titulo: 'Em que situação cada carteira faz sentido',
      emUmaFrase:
        'A pergunta certa não é "qual é a mais segura", e sim "para que serve esta" — porque a ' +
        'mesma carteira que protege é a que atrapalha.',
      // Árvore "Para que você vai usar?": uma pergunta no topo e 3 ramos.
      usoCarteira: {
        pergunta: 'Para que você vai usar?',
        ramos: [
          {
            se: 'Para entrar e sair em reais',
            entao: 'Corretora (CEX)',
            texto: 'Resolve Pix, conversão, KYC e suporte num só lugar. Costuma ser o ponto de partida.',
          },
          {
            se: 'Para operar on-chain',
            entao: 'Carteira quente, com pouco dinheiro',
            texto: 'Conecta nos sites e assina transações. É a ferramenta para negociar memecoins.',
          },
          {
            se: 'Para guardar por muito tempo',
            entao: 'Carteira fria',
            texto: 'Tira as chaves da internet. É para o que não vai ser mexido tão cedo.',
          },
        ],
        legenda:
          'Muitos usuários combinam as três, cada uma com uma função. Nada disso é ' +
          'recomendação: é a descrição de como as categorias se encaixam.',
        descricao:
          'Para que você vai usar? Para entrar e sair em reais: corretora (CEX). Para operar ' +
          'on-chain: carteira quente, com pouco dinheiro. Para guardar por muito tempo: ' +
          'carteira fria. Nada disso é recomendação.',
      },
      paragrafos: [
        'Não existe "a melhor" carteira, e sim a certa para cada uso — a árvore acima mostra ' +
          'os três que cobrem quase tudo.',
        'O prejuízo de iniciante raramente vem de uma carteira ruim: vem de usar uma só para ' +
          'tudo. A carteira que você conecta em dez sites por semana não deveria guardar o que ' +
          'você não pode perder — uma assinatura errada num desses sites alcança todo o saldo ' +
          'dela.',
        'Daí duas regras que muita gente adota. Não deixar na corretora mais do que aceitaria ' +
          'perder num bloqueio, porque ali as chaves não são suas. E operar com uma carteira ' +
          'quente de pouco saldo, separada do grosso do patrimônio. Não é recomendação de ' +
          'investimento: é arrumação de risco.',
        'O dinheiro costuma entrar pela corretora, passar pela quente quando vai ser usado e ' +
          'ir para a fria quando não será mexido tão cedo. Quem começa quase sempre usa só a ' +
          'corretora, e está certo: a fria faz sentido quando já há algo para guardar.',
      ],
      exemplo: {
        titulo: 'Três carteiras, três papéis, um mês comum',
        passos: [
          'Corretora: você deposita reais por Pix e compra. É a porta de entrada e de saída.',
          'Carteira quente: recebe só o que você vai usar na semana; é a que você conecta nos sites.',
          'Carteira fria: guarda o que você decidiu não mexer. Quase nunca assina nada.',
          'Se a quente for comprometida, você perde o saldo da semana, não tudo. É a separação, e não a marca do aparelho, que limita o estrago.',
        ],
      },
      paragrafosFinais: [
        'O erro que isso evita é concentrar. Carteira quente com pouco saldo é ferramenta de ' +
          'trabalho; com tudo dentro, é aposta diária. Como criar a primeira carteira está em ' +
          '"Para ir mais fundo".',
      ],
      detalhe: {
        titulo: 'como criar sua primeira carteira, em 7 passos',
        ordenada: true,
        lista: [
          'Baixe só da fonte oficial. NUNCA a partir de anúncio patrocinado.',
          'Escolha "criar nova carteira", não "importar".',
          'Anote a frase-semente no papel, na ordem e numerada. NUNCA foto, print ou nuvem.',
          'Confirme a frase quando o app pedir palavras de posições específicas.',
          'Crie a senha ou PIN do app — ela é diferente da frase-semente.',
          'Faça um teste com valor pequeno: envie, confira, envie de volta.',
          'Confira no explorador de blocos. A blockchain é a fonte da verdade.',
        ],
      },
    },

    // ================================== SEED PHRASE ==================================
    {
      id: 'seed-e-carteira',
      aba: 'seed',
      titulo: 'Frase-semente: por que 12 ou 24 palavras SÃO a carteira',
      emUmaFrase:
        'As 12 ou 24 palavras não são um backup da carteira. Elas são a carteira.',
      // 12 palavras → a semente → as contas (a árvore de chaves).
      semente: {
        palavras: 12,
        titulo: 'A semente',
        bits: '512 bits',
        contas: ['Conta 1', 'Conta 2', 'Conta 3 …'],
        textoDaConta: ['chave privada', '→ endereço'],
        legenda:
          'Todas as suas chaves e endereços são calculados a partir das palavras. Por isso a ' +
          'mesma frase recria a mesma carteira em qualquer aplicativo compatível — e uma ' +
          'conta "nova" dentro da mesma frase não protege nada se a frase vazou.',
        descricao:
          '12 palavras viram uma semente; da semente nasce uma árvore de chaves: conta 1, ' +
          'conta 2, conta 3, cada uma com chave privada e endereço, em qualquer rede. A mesma ' +
          'frase recria tudo em qualquer aplicativo compatível.',
      },
      // Os dois cartões vermelhos logo abaixo da árvore.
      contraste: {
        cartoes: [
          {
            rotulo: 'Quem tem as palavras',
            tom: 'alerta',
            texto: 'Tem todo o seu dinheiro, para sempre, em qualquer aparelho. Não precisa da sua senha nem do seu celular.',
          },
          {
            rotulo: 'Quem perde as palavras',
            tom: 'alerta',
            texto: 'Se o aparelho quebrar, ninguém no mundo recupera o dinheiro. Não existe "esqueci minha senha".',
          },
        ],
        descricao:
          'Quem tem as palavras tem todo o seu dinheiro, para sempre, em qualquer aparelho. ' +
          'Quem perde as palavras: se o aparelho quebrar, ninguém no mundo recupera.',
      },
      paragrafos: [
        'Ao criar uma carteira, o aplicativo sorteia um número secreto e o mostra como ' +
          'palavras comuns, em ordem: a frase-semente (em inglês, seed phrase). Ela não é cópia ' +
          'de nada — é a origem da chave privada, do endereço e de todas as contas que você ' +
          'criar.',
        'Por isso, perder o celular não é perder o dinheiro: em outro aparelho, você escolhe ' +
          '"importar carteira", digita as mesmas palavras na mesma ordem e os saldos reaparecem ' +
          '— eles estavam na blockchain, não no celular. Perder as palavras, sim, é perder o ' +
          'dinheiro.',
        'Na tela, isso acontece uma vez só: logo depois de "criar nova carteira", o aplicativo ' +
          'mostra as palavras numeradas e pede algumas de volta ("qual é a palavra 9?"). Não é ' +
          'burocracia: é a única conferência de que você anotou.',
      ],
      exemplo: {
        titulo: 'O erro que parece cuidado',
        passos: [
          'Você desconfia que a carteira foi comprometida e cria uma "Conta 2" no mesmo aplicativo.',
          'A Conta 2 tem endereço novo e parece limpa.',
          'Mas nasceu das mesmas palavras: é outro galho da mesma árvore.',
          'Quem tem a frase abre a Conta 2 junto com a Conta 1. Carteira nova de verdade exige frase nova.',
        ],
      },
      paragrafosFinais: [
        'Guardar a frase-semente com segurança é a habilidade número um deste módulo. Tudo o ' +
          'que vem depois — golpes, aprovações, plano de emergência — supõe que isso está ' +
          'resolvido.',
      ],
      detalhe: {
        titulo: 'como as palavras viram chaves (BIP-39, BIP-32, BIP-44)',
        lista: [
          'BIP-39 é o padrão das palavras: uma lista fixa de 2.048. O aparelho sorteia a ' +
            'entropia (o número aleatório) e acrescenta um checksum (um trecho de conferência).',
          'Cada pedaço de 11 bits vira uma palavra: 128 bits dão 12 palavras; 256 bits, 24.',
          'A frase passa pela função PBKDF2-HMAC-SHA512 e vira uma semente de 512 bits. O ' +
            'BIP-32 cria a árvore de chaves (carteira HD); o BIP-44 organiza por moeda e por ' +
            'conta.',
        ],
      },
    },
    {
      id: 'formas-de-perder-tudo',
      aba: 'seed',
      titulo: 'As formas concretas de perder tudo pela seed',
      emUmaFrase:
        'As cinco formas parecem cinco problemas diferentes. São o mesmo problema cinco ' +
        'vezes: a frase saiu do papel.',
      // 5 formas numeradas → a caixa vermelha "O que todas fazem".
      formas: {
        frase: 'As cinco formas mais comuns — e o que cada uma tem em comum',
        itens: [
          {
            titulo: 'Foto, print ou nuvem.',
            texto: 'Google Drive, iCloud, e-mail, WhatsApp. Se a nuvem ou o celular for invadido, a frase vai junto.',
          },
          { titulo: 'Arquivo de texto no PC,', texto: 'ou o gerenciador de senhas do navegador.' },
          { titulo: 'Site de phishing', texto: 'que imita a sua carteira e promete um airdrop ou um "resgate".' },
          {
            titulo: 'Falso "suporte"',
            texto: 'no Discord, Telegram, X ou e-mail que pede a frase. Suporte de verdade nunca pede.',
          },
          { titulo: 'Malware infostealer,', texto: 'um programa que vasculha o computador atrás de carteiras.' },
        ],
        conclusao: {
          rotulo: 'O que todas fazem',
          texto:
            'A frase sai do papel e vira algo digital, ou vai para a mão de alguém. A partir ' +
            'daí, a carteira é de quem tem a cópia.',
        },
      },
      paragrafos: [
        'Três termos da lista acima. Phishing ("pescaria") é a isca — site, e-mail, página — que ' +
          'imita algo legítimo para você digitar ali o que o golpista quer. Airdrop é uma ' +
          'distribuição gratuita de tokens: existe de verdade, por isso é ótima isca. ' +
          'Infostealer é um programa que se instala escondido e vasculha o computador atrás de ' +
          'dados valiosos, como arquivos de carteira.',
        'O pior: a frase não tem revogação, e você nem fica sabendo que ela vazou. Senha ' +
          'vazada se troca, cartão clonado se cancela; frase vazada só tem uma defesa — mover ' +
          'tudo para uma carteira nova, com frase nova, antes de quem copiou.',
        'O pedido chega com cara de ajuda, prêmio ou emergência: um atendente que aparece ' +
          'sozinho no Telegram, um "verificador de carteira", um resgate que expira em minutos. ' +
          'Nenhum precisa das suas 12 ou 24 palavras: a frase não serve para conferir nada, só ' +
          'para gastar.',
      ],
      exemplo: {
        titulo: 'Como o pedido costuma chegar',
        passos: [
          'Você comenta num grupo público que está com problema na carteira.',
          'Minutos depois, alguém com foto e nome parecidos com os do suporte oficial te chama no privado. Suporte de verdade não faz isso.',
          'A conversa é educada e técnica, até aparecer um link para "validar" ou "sincronizar" a carteira.',
          'A página pede as 12 palavras em campos numerados, igual à tela do aplicativo.',
          'Digitar ali não valida nada: entrega a carteira inteira.',
        ],
      },
      paragrafosFinais: [
        'O erro que isso evita é achar que existe lugar digital seguro para a frase. ' +
          'Gerenciador, nuvem privada, pasta com senha: toda cópia digital pode vazar. E todo ' +
          'pedido da sua frase-semente é golpe.',
      ],
      detalhe: {
        titulo: 'o que um infostealer copia',
        paragrafos: [
          'Famílias como RedLine e Lumma copiam arquivos de carteira (wallet.dat) e dados de ' +
            'extensões de navegador, como a MetaMask. Também vigiam a área de transferência (o ' +
            '"copiar e colar") atrás de frases e endereços.',
        ],
      },
    },

    // =================================== GOLPES ===================================
    {
      id: 'wallet-drainers-conceito',
      aba: 'golpes',
      titulo: 'Wallet drainers: o golpe que não rouba a sua seed',
      emUmaFrase:
        'Este golpe não precisa das suas palavras secretas. Precisa de um clique seu, num ' +
        'botão que parece rotina.',
      // A sequência clicável dos 5 passos (os passos são modulo1.roteiroDrainer).
      // `passoInicial` e `passoDeVirada` contam do zero: 2 = o passo 3, "Assinar".
      sequencia: {
        frase: 'Como um drainer esvazia a carteira — clique num passo',
        rotuloDaLista: 'Passos do drainer',
        colunas: { oQueVeem: 'O que a vítima vê', oQueAcontece: 'O que está de fato acontecendo' },
        passoInicial: 2,
        passoDeVirada: 2,
        legenda: 'O dano não está em conectar, e sim em assinar. O passo 3 é o ponto de virada.',
      },
      paragrafos: [
        'Wallet drainer ("esvaziador de carteira") é um kit de golpe num site falso que imita ' +
          'uma marca conhecida. O site oferece algo — um resgate, um sorteio, um "mint" de NFT ' +
          '(a criação de um item digital de coleção) — e pede que você assine uma operação com ' +
          'cara de rotina. A assinatura não move dinheiro na hora: dá uma permissão, e o ' +
          'golpista esvazia a carteira depois.',
        'Essa permissão é a aprovação (approval): autorizar um contrato a mover um token seu ' +
          'sem te perguntar de novo. Quase todo site de troca honesto usa isso — por isso a tela ' +
          'do golpista é igual à do site honesto.',
        'Conectar a carteira não move nada: só deixa o site ver os seus saldos, que já são ' +
          'públicos. O dano começa quando você assina — por isso o passo 3 é o ponto de virada.',
        'Por trás há um negócio, não um hacker solitário: o operador aluga o kit a afiliados, ' +
          'que espalham as páginas, compram anúncios e copiam marcas. Um contrato reparte o ' +
          'roubo sozinho — o mais comum é 80% para o afiliado e 20% para o operador. Por isso ' +
          'os sites voltam tão rápido quando um cai.',
      ],
      exemplo: {
        titulo: 'Por que "eu nunca dei minha seed" não protege aqui',
        passos: [
          'Você nunca digitou a sua frase-semente em lugar nenhum. Essa parte está certa.',
          'Mas o drainer quer uma assinatura — e ela sai da sua própria carteira, com a sua chave, a seu pedido.',
          'Para a rede, a permissão foi dada por você: não há nada irregular a reverter.',
          'A defesa aqui é ler o que a tela pede antes de confirmar, e desconfiar do que promete algo de graça.',
        ],
      },
      paragrafosFinais: [
        'O erro que isso evita é se achar seguro só por proteger a frase-semente. São dois ' +
          'golpes: um se evita guardando as palavras; o outro, na janela de assinatura — o tema ' +
          'dos dois próximos cards.',
      ],
      detalhe: {
        titulo: 'os números da Scam Sniffer e o estudo revisado por pares',
        lista: [
          '2023: cerca de US$ 295,5 milhões, mais de 324.000 vítimas. 2024: US$ 494 milhões, ' +
            '332.000 carteiras (+67%). 2025: US$ 83,85 milhões, 106.106 carteiras (−83% nas ' +
            'perdas). A queda acompanhou o mercado; "à medida que drainers antigos saem, ' +
            'novos surgem".',
          'He et al. (Zhejiang/BlockSec, ACM IMC 2025), Ethereum de 01/03/2023 a 01/04/2025: ' +
            'US$ 135 milhões de 76.582 vítimas; 1.910 contratos de partilha, 56 operadores, ' +
            '6.087 afiliados; afiliados ficam "tipicamente com 80% a 90%".',
          'Inferno Drainer (nov/2022–nov/2023): mais de US$ 80 milhões de cerca de 137.000 ' +
            'vítimas, 16.000 domínios, mais de 100 marcas imitadas (Group-IB).',
          'Na drenagem, o golpista chama a função transferFrom, que usa a permissão dada.',
        ],
      },
    },
    {
      id: 'vetores-tecnicos',
      aba: 'golpes',
      titulo: 'Os três truques: nos três, você entrega uma permissão sem perceber',
      emUmaFrase:
        'Cada um chega por uma tela diferente, com um nome diferente. Reconheça os três pelo ' +
        'que pedem, não pelo que prometem.',
      // 3 cartões; o pé de cada um diz onde os três terminam.
      truques: {
        consequencia: '→ permissão sobre seus ativos',
        itens: [
          {
            titulo: 'Approval ilimitado',
            texto:
              'Você autoriza um contrato a gastar um token seu, sem limite de valor. Ele fica ' +
              'livre para esvaziar aquele token quando quiser, sem pedir de novo.',
          },
          {
            titulo: 'Permit e Permit2',
            texto:
              'Aparecem como um inofensivo "assinar mensagem", sem taxa, e não como uma ' +
              'transação. Mas a assinatura dá permissão sobre seus tokens.',
          },
          {
            titulo: 'setApprovalForAll (NFT)',
            texto:
              'Dá a um "operador" o direito de gerenciar todos os seus NFTs de uma coleção de ' +
              'uma vez. Um único clique pode entregar a coleção inteira.',
          },
        ],
        descricao:
          'Approval ilimitado: autoriza um contrato a gastar um token seu sem limite. Permit ' +
          'e Permit2: um inofensivo assinar mensagem, sem taxa, que dá permissão sobre seus ' +
          'tokens. setApprovalForAll: dá a um operador o direito sobre todos os NFTs de uma ' +
          'coleção. Os três terminam no mesmo lugar: permissão para mover seus ativos.',
      },
      paragrafos: [
        'Os três cartões acima são as três formas de conseguir aquela permissão. Um termo novo ' +
          'neles: NFT ("token não fungível") é um token que representa um item único. Duas ' +
          'notas de dez reais são iguais entre si (fungíveis); duas figurinhas numeradas, não. ' +
          'Os sites de compra e venda desses itens pedem o setApprovalForAll para mover a sua ' +
          'figurinha quando alguém a compra.',
        'Sites honestos pedem os três todos os dias; o golpe mora no detalhe. No approval, é o ' +
          'valor: ilimitado, em vez do exato da operação. No Permit, é o disfarce: sem taxa, ' +
          'parece "só um login". No setApprovalForAll, é o alcance: a coleção inteira, não o ' +
          'item que você vende.',
        'Na janela da carteira, leia o tipo do pedido, o valor e quem recebe a permissão. ' +
          'Aprovação de gasto? Troque o valor pelo da operação, se der. Nenhuma taxa? É ' +
          'assinatura, e assinatura também autoriza. Há ainda um quarto caminho: o EIP-7702, de ' +
          '2025, que faz a carteira agir como um contrato (aba Defesa).',
      ],
      exemplo: {
        titulo: 'A mesma tela, honesta e desonesta',
        passos: [
          'Site honesto de troca: aprovação do token que você vai vender, no valor da operação.',
          'Site de golpe: aprovação do token de que você tem mais, com valor ILIMITADO.',
          'Site honesto de coleção: setApprovalForAll quando você põe um item à venda. É normal.',
          'Site de golpe: o mesmo pedido para "verificar" a carteira ou liberar um resgate, sem você vender nada.',
          'A diferença não está no botão: está em por que aquilo é pedido agora.',
        ],
      },
      paragrafosFinais: [
        'O erro que isso evita é achar "assinar mensagem" inofensivo por não cobrar taxa. Quem ' +
          'paga o gas é o golpista, depois, ao usar a permissão que você deu.',
      ],
      detalhe: {
        titulo: 'os padrões técnicos e os números da Scam Sniffer',
        // Um item pode vir em pedaços: { mono } sai na fonte de código (o endereço).
        lista: [
          [
            'ERC-20 é o padrão dos tokens na EVM; Permit e Permit2 são assinaturas EIP-712 sem ' +
              'gás. O Permit2 fica em ',
            { mono: '0x000000000022D473030F116dDEE9F6B43aC78BA3' },
            ' em várias redes. setApprovalForAll é dos padrões de NFT ERC-721 e ERC-1155.',
          ],
          'Relatório 2024 da Scam Sniffer: Permit 56,7% dos roubos, setOwner 31,9%, Transfer ' +
            '4,5%, increaseAllowance 3,5%. A Ethereum concentrou 85,3% das perdas. Em 2025, ' +
            'Permit/Permit2 responderam por 38% das perdas acima de US$ 1 milhão.',
        ],
      },
    },
    {
      id: 'address-poisoning-e-clipper',
      aba: 'golpes',
      titulo: 'Address poisoning e clipper: quando o alvo é o endereço',
      emUmaFrase:
        'Nestes dois golpes ninguém invade a sua carteira. Você mesmo envia, por vontade ' +
        'própria, para o endereço errado.',
      // "O endereço quase igual": dois endereços INVENTADOS com o mesmo começo e o
      // mesmo fim; só o meio muda.
      enderecos: {
        frase: 'O endereço quase igual',
        selo: 'endereços inventados',
        itens: [
          { rotulo: 'O endereço certo', inicio: '0x3aF1', meio: '9c2e8B7d40a1f6E3c9D2b58A7e14C0f3', fim: 'Bf07', tom: 'ok' },
          { rotulo: 'O endereço do golpista', inicio: '0x3aF1', meio: '7D0b3e4C91f2a8B6d5E0c73F1a9e2D48', fim: 'Bf07', tom: 'alerta' },
        ],
        legenda:
          'A gente costuma conferir só as pontas. O golpista gera um endereço com o mesmo ' +
          'começo e o mesmo fim, manda uma transação minúscula para ele aparecer no seu ' +
          'histórico, e espera você copiar dali.',
        descricao:
          'Dois endereços com o mesmo começo (0x3aF1) e o mesmo fim (Bf07). Só os caracteres ' +
          'do meio mudam. Conferindo só as pontas, os dois parecem iguais.',
      },
      // Clipper em 4 passos; o passo em destaque (vermelho) é o golpe.
      clipper: {
        frase: 'Clipper: o vírus troca o endereço na hora de colar',
        passos: [
          { texto: 'Você copia o endereço certo.' },
          { texto: 'Um vírus no aparelho vigia o "copiar e colar".' },
          { texto: 'Na hora de colar, ele troca em silêncio pelo do golpista.', destaque: true },
          { texto: 'Você confere só as pontas e envia. Irreversível.' },
        ],
        descricao:
          '1. Você copia o endereço certo. 2. O vírus no aparelho vigia o copiar e colar. 3. ' +
          'Na hora de colar, ele troca em silêncio pelo do golpista. 4. Você confere só as ' +
          'pontas e envia. O dinheiro vai para o golpista.',
      },
      paragrafos: [
        'Address poisoning é "envenenamento de endereço". O golpista gera, por tentativa e ' +
          'erro em massa, um endereço com o começo e o fim iguais aos de um que você usa, como ' +
          'no par acima. Depois manda para você uma transação de valor insignificante, só para ' +
          'plantar o endereço falso no seu histórico.',
        'O clipper (de clipboard, a área de transferência onde fica o que você copiou) é um ' +
          'vírus que vigia esse lugar: você copia o endereço certo e, ao colar, ele troca por ' +
          'outro parecido, em silêncio, em menos de um segundo.',
        'Os dois exploram o hábito de conferir só as pontas, porque endereço é longo e sem ' +
          'sentido para o olho. E vale a regra do primeiro card: enviado, confirmado, acabou.',
        'A defesa serve para os dois: copiar da fonte original, nunca do histórico; conferir a ' +
          'linha inteira depois de colar; e enviar primeiro um valor baixo. A carteira fria soma ' +
          'uma camada: mostra o destino na telinha do próprio aparelho, fora do alcance de um ' +
          'vírus no computador.',
      ],
      exemplo: {
        titulo: 'O teste de valor baixo, na ordem certa',
        passos: [
          'Copie o endereço da fonte original — a tela de depósito da corretora ou a carteira de destino. Nunca do histórico.',
          'Cole e confira a linha inteira, caractere por caractere.',
          'Envie um valor pequeno e espere a confirmação.',
          'Confira no explorador que chegou no saldo de destino, não só no comprovante de envio.',
          'Só então envie o resto. O cuidado custa uma taxa a mais; pular custa o valor inteiro.',
        ],
      },
      paragrafosFinais: [
        'O erro que isso evita é copiar do histórico porque "já mandei para esse antes". ' +
          'Histórico não é lista de contatos: qualquer um escreve nele, e é isso que o golpe faz.',
      ],
      detalhe: {
        titulo: 'o tamanho do problema',
        paragrafos: [
          'Estudo da Carnegie Mellon ("Blockchain Address Poisoning", USENIX Security 2025), ' +
            'Ethereum e BNB Chain, de julho de 2022 a junho de 2024: 270 milhões de tentativas ' +
            'contra 17 milhões de vítimas, 6.633 incidentes bem-sucedidos e ao menos US$ 83,8 ' +
            'milhões em perdas. Variantes de clipper usam endereços parecidos com o verdadeiro, ' +
            'para enganar quem confere só o começo depois de colar.',
        ],
      },
    },

    // =================================== DEFESA ===================================
    {
      id: 'revogar-aprovacoes',
      aba: 'defesa',
      titulo: 'Revogação de aprovações: como e o que ela não resolve',
      emUmaFrase:
        'Existe uma lista pública de tudo o que você já autorizou. A maioria das pessoas ' +
        'nunca abriu a sua.',
      // Revogar resolve (borda verde sólida) × não resolve (borda vermelha tracejada).
      contraste: {
        cartoes: [
          {
            rotulo: 'Revogar resolve',
            tom: 'ok',
            contorno: 'solido',
            itens: ['Impede usos futuros de uma permissão que você deu.'],
          },
          {
            rotulo: 'Revogar NÃO resolve',
            tom: 'alerta',
            contorno: 'tracejado',
            itens: [
              'Não recupera o que já saiu.',
              'Não salva uma frase-semente vazada.',
              'Não remove um vírus que ainda está no aparelho.',
            ],
          },
        ],
        descricao:
          'Revogar resolve: impede usos futuros de uma permissão que você deu. Revogar não ' +
          'resolve: não recupera o que já saiu, não salva uma frase-semente vazada, não ' +
          'remove um vírus que ainda está no aparelho.',
      },
      paragrafos: [
        'Aprovação é a permissão que você dá a um contrato para mexer nos seus tokens (aba ' +
          'Golpes). Ela não tem prazo: continua ativa depois que você fecha a aba, larga o site ' +
          'ou o projeto morre — até você cancelar. Revogar é esse cancelamento.',
        'Na lista, a coluna que decide é o spender ("quem vai gastar"): o contrato que recebeu ' +
          'a permissão. Ao lado vêm o token, o valor — "ilimitado" é o sinal vermelho — e a ' +
          'idade. Spender que você não reconhece, ou valor ilimitado num site usado uma vez só, ' +
          'é candidato a revogação.',
        'Para só olhar, basta digitar o seu endereço no Revoke.cash, sem conectar nada: a ' +
          'lista é pública. Para revogar, você conecta a carteira e clica em "Revoke" — uma ' +
          'transação com taxa de rede. Assim dá para auditar de qualquer computador e só ' +
          'assinar no aparelho de confiança.',
        'O limite está no contraste acima: revogar fecha a porta para o futuro, mas não ' +
          'devolve o que saiu, não salva uma frase-semente vazada (quem tem a frase não precisa ' +
          'de permissão) e não remove vírus do aparelho. É tranca, não botão de desfazer.',
      ],
      exemplo: {
        titulo: 'Por onde começar quando a lista é longa',
        passos: [
          'Ordene das mais recentes para as mais antigas: a suspeita costuma ser a última coisa que você assinou.',
          'Comece pelas do token de maior valor — é o que um atacante levaria primeiro.',
          'Depois, as de spender que você não reconhece e as ilimitadas em sites usados uma vez só.',
          'Por último, as pequenas em sites que você usa toda semana: cada revogação custa taxa.',
          'Confira também a aba do Permit2, assunto do próximo card.',
        ],
      },
      paragrafosFinais: [
        'O erro que isso evita é revogar depois de drenado e achar que resolveu. Revogar é ' +
          'manutenção, feita com a carteira em paz; depois do estrago, é só um dos passos, e ' +
          'nem sempre o primeiro.',
      ],
      detalhe: {
        titulo: 'o tutorial clique a clique',
        partes: [
          {
            titulo: 'No Revoke.cash',
            passos: [
              'Abra revoke.cash conferindo a URL letra por letra. Digite você mesmo.',
              '"Connect Wallet" para revogar, ou cole o endereço/ENS para só olhar.',
              'Selecione a rede.',
              'Leia a lista: token, spender, valor aprovado e idade.',
              'Ordene por "Newest to Oldest" para achar uma aprovação suspeita recente.',
              'Clique em "Revoke" e confirme na carteira, pagando o gas.',
              'Confira a aba do Permit2 e revogue também as permissões internas.',
            ],
          },
          {
            titulo: 'No Token Approval Checker do Etherscan',
            passos: [
              'Menu "More" → "Token Approvals".',
              'Cole seu endereço ou conecte.',
              'Selecione ERC-20, ERC-721 ou ERC-1155 e ative "Show all approvals".',
              'Localize e clique em "Revoke".',
            ],
          },
        ],
        paragrafosFinais: [
          'Cada revogação custa gas: revogue primeiro as de maior valor e de contratos que ' +
            'você não reconhece.',
        ],
      },
    },
    {
      id: 'duas-camadas-permit2-e-eip7702',
      aba: 'defesa',
      titulo: 'As duas camadas do Permit2 e o golpe novo (EIP-7702)',
      emUmaFrase:
        'Uma única assinatura pode valer a carteira inteira. Leia sempre o que a carteira ' +
        'pede antes de confirmar.',
      // Permit2 em 2 camadas: do app ao Permit2 (roxo) e do Permit2 a cada app
      // (ciano), e as duas funções que revogam (verde).
      camadas: {
        inicio: 'Você usa uma DEX',
        camadas: [
          { rotulo: 'Camada 1 · você → Permit2', texto: 'Approval de token ao Permit2, geralmente ilimitado', tom: 'roxo' },
          { rotulo: 'Camada 2 · Permit2 → cada app', texto: 'Permit2 guarda sub-permissões por app, com valor e prazo', tom: 'acento' },
        ],
        funcoes: [
          { nome: 'lockdown', texto: 'revoga várias sub-permissões de uma vez' },
          { nome: 'invalidateNonces', texto: 'anula assinaturas já feitas e não usadas' },
        ],
        legenda: 'Revogar a camada certa importa. O Revoke.cash mostra as duas em abas separadas.',
        descricao:
          'Você usa uma DEX. Dá um approval de token ao contrato Permit2: a camada 1. O ' +
          'Permit2 guarda sub-permissões por app: a camada 2. Dela saem duas funções: ' +
          'lockdown revoga várias de uma vez; invalidateNonces anula assinaturas não usadas.',
      },
      paragrafos: [
        'O Permit2 é um contrato intermediário: sem ele, cada site novo pede uma aprovação ' +
          'nova, com taxa. Com ele, você aprova uma vez só — o próprio Permit2 — e ele distribui ' +
          'permissões menores a cada aplicativo, por assinatura, sem taxa. Por isso virou ' +
          'padrão.',
        'Na camada 1, você autoriza o Permit2 a mexer num token seu, geralmente sem teto. Na ' +
          'camada 2, ele guarda uma sub-permissão por aplicativo, com valor e prazo próprios. ' +
          'Revogar na camada errada dá a sensação de limpar a casa sem limpar nada.',
        'As permissões da camada 2 expiram sozinhas, o que é bom. O ruim: o risco sai da ' +
          'transação, que custa taxa e tem cara de operação, e vai para a assinatura, grátis e ' +
          'com cara de formalidade. Enganar fica mais barato, e os drainers exploram isso.',
        'O EIP-7702, ativado na atualização Pectra da Ethereum em maio de 2025, é outra ' +
          'coisa: deixa uma carteira comum agir como um contrato, delegando o comportamento ' +
          'dela a um código — útil para pagar a taxa em outro token ou juntar várias operações ' +
          'numa só. O golpe esconde essa delegação numa assinatura com cara de troca: quem ' +
          'assina entrega o controle do endereço, não um token. Casos reais: cerca de US$ 146,5 ' +
          'mil em 24/05/2025 e mais de US$ 1,54 milhão em 24/08/2025.',
      ],
      quadro: [
        {
          rotulo: 'O que você lê numa aprovação comum',
          texto:
            'Um token, um valor e um destinatário da permissão. O estrago possível é do ' +
            'tamanho daquele token.',
        },
        {
          rotulo: 'O que você lê numa delegação',
          texto:
            'Não há token nem valor: o que está sendo autorizado é o comportamento do seu ' +
            'endereço. O estrago possível é a carteira inteira.',
          destaque: true,
        },
      ],
      exemplo: {
        titulo: 'Onde clicar para fechar as duas camadas',
        passos: [
          'Na camada 2, o aplicativo da Uniswap (uma DEX) costuma usar aprovação de 30 dias, que caduca sozinha.',
          'A função lockdown apaga várias sub-permissões de uma vez (revogação em lote, diz o código da Uniswap).',
          'A função invalidateNonces anula assinaturas feitas e ainda não usadas.',
          'Nenhuma das duas toca na camada 1: o approval ao próprio Permit2 fica de pé até ser revogado à parte.',
          'Auditoria completa, então, são duas passadas, uma aba de cada vez.',
        ],
      },
      paragrafosFinais: [
        'O erro que isso evita é julgar o risco pelo esforço da tela. Uma assinatura grátis, ' +
          'de dois segundos, pode valer mais do que qualquer transação que você já pagou. ' +
          'Pergunte: "o que exatamente estou autorizando, e sobre o quê?".',
      ],
      detalhe: {
        titulo: 'as funções do Permit2 e as fontes dos casos',
        lista: [
          'lockdown é "batch revoking approvals" nas palavras do código da Uniswap.',
          'As assinaturas do Permit2 seguem o padrão EIP-712.',
          'Caso de 24/05/2025: ataque EIP-7702 ligado ao Inferno Drainer, analisado pela ' +
            'SlowMist. Caso de 24/08/2025: mesma técnica, monitorada pela Scam Sniffer.',
        ],
      },
    },
    {
      id: 'plano-de-emergencia',
      aba: 'defesa',
      titulo: 'Plano de emergência: os primeiros 10 minutos',
      emUmaFrase:
        'A ordem dos passos não é detalhe: fazer o certo na hora errada é o que faz perder o ' +
        'que ainda dava para salvar.',
      // A árvore de decisão: "Sim" (a frase vazou) é o ramo ruim, em vermelho;
      // "Não" é o verde. Os dois terminam no mesmo nó final.
      emergencia: {
        inicio: 'Você percebeu a drenagem',
        pergunta: 'A frase-semente vazou?',
        ramos: [
          {
            rotulo: 'Sim',
            tom: 'alerta',
            nos: ['Crie carteira nova em dispositivo limpo', 'Mova o que sobrou (cuidado com o sweeper bot)'],
          },
          { rotulo: 'Não', tom: 'ok', nos: ['Revogue as aprovações'] },
        ],
        fim: 'Registre evidências e reporte',
        legenda: 'A frase-semente vazou ou foi só uma assinatura maliciosa? A resposta muda tudo.',
        descricao:
          'Você percebe que a carteira foi drenada. A frase-semente vazou? Se sim: crie uma ' +
          'carteira nova em um dispositivo limpo e mova o que sobrou, atento ao sweeper bot. ' +
          'Se não: revogue as aprovações. Em qualquer caso: registre as evidências e reporte.',
      },
      // Os 8 passos, do mais urgente ao menos urgente. `forte` sai em negrito.
      passos: [
        { forte: 'Pare de usar o aparelho.', texto: 'Ele pode ter um infostealer ou um clipper. Só volte a operar de um aparelho limpo.' },
        { forte: 'Crie uma carteira NOVA, com frase NOVA,', texto: 'num aparelho limpo. Uma conta "nova" na mesma frase não serve.' },
        { forte: 'Mova o que sobrou,', texto: 'começando pelo que vale mais. Deixe gas suficiente.' },
        {
          forte: 'Cuidado com os sweeper bots.',
          texto: 'Se a frase vazou, um robô leva em segundos tudo o que chega, inclusive o gas.',
        },
        { forte: 'Revogue as aprovações só se a frase NÃO vazou.', texto: 'Se vazou, revogar não adianta.' },
        { forte: 'Guarde as provas:', texto: 'hashes, prints, URL do site, data e horário.' },
        {
          forte: 'Denuncie:',
          texto: 'boletim de ocorrência, Chainabuse, Scam Sniffer. Se o dinheiro foi para uma CEX, avise rápido.',
        },
        { forte: 'Desconfie de quem promete "recuperar seu cripto" cobrando adiantado.', texto: 'É um segundo golpe.' },
      ],
      paragrafos: [
        'Este card é para o pior dia: o saldo sumiu ou diminuiu. O tempo e o pânico trabalham ' +
          'contra você — quem age rápido e na ordem errada costuma perder o resto. A pergunta da ' +
          'árvore resolve metade do problema: a frase-semente vazou, ou foi só uma assinatura ' +
          'maliciosa?',
        'Se foi só uma assinatura, o atacante tem permissão sobre alguns tokens, e nada além: ' +
          'revogar fecha a porta, e o resto continua seu. Se a frase vazou, revogar não adianta ' +
          '— quem tem a frase tem as chaves. A carteira acabou: não volta a ser segura nem ' +
          'formatando o aparelho, nem com uma conta nova dentro dela.',
        'Aí entra o sweeper bot ("robô varredor"): um programa que o ladrão deixa vigiando o ' +
          'endereço vinte e quatro horas por dia e que leva na hora tudo o que chega. Por isso ' +
          '"mandar um pouco de gas para resgatar os tokens" quase sempre falha: o robô leva o ' +
          'gas antes.',
        'Daí a ordem da lista no fim do card: parar de usar o aparelho, porque ele pode ser a ' +
          'origem do problema; mover primeiro o mais valioso, porque talvez só dê tempo de ' +
          'salvar uma coisa; e só depois provas e denúncia, que não salvam o bolso agora, mas ' +
          'permitem qualquer apuração.',
        'Seja realista: recuperar o que saiu é raro. Dá para impedir a segunda perda, a do que ' +
          'sobrou, e registrar tudo. E cuidado com a terceira: perfis oferecendo "recuperação ' +
          'de cripto" com pagamento adiantado são sempre um segundo golpe, que chega quando a ' +
          'vítima mais quer acreditar.',
      ],
      exemplo: {
        titulo: 'Os dois caminhos, lado a lado',
        passos: [
          'Assinatura maliciosa, frase intacta: pare de usar o aparelho, revogue a aprovação, confira o resto da lista e guarde as provas. A carteira segue utilizável.',
          'Frase vazada: pare de usar o aparelho, crie carteira nova com frase nova num aparelho limpo e mova o que sobrou, do mais valioso para baixo.',
          'Nesse caso, não deposite gas para "resgatar" nada: o robô varredor leva.',
          'Nos dois casos: hashes, prints, URL do site, data e horário — e a denúncia.',
        ],
      },
      paragrafosFinais: [
        'O erro que isso evita é mexer antes de pensar. Trocar a senha do aplicativo não ' +
          'resolve: a senha não é a chave. Conta nova na mesma carteira não resolve: a frase é a ' +
          'mesma. E revogar com a frase vazada só gasta taxa num cofre já aberto.',
      ],
      detalhe: {
        titulo: 'por que depositar gas falha e o que o FBI diz',
        paragrafos: [
          'Depositar gas falha porque o robô o leva primeiro; a MetaMask recomenda abandonar a ' +
            'carteira e criar outra. O FBI, no alerta IC3 I-072026 (20/07/2026), afirma que o ' +
            'IC3 — o centro de denúncias de crimes na internet — nunca cobra para recuperar ' +
            'fundos, não indica empresa que cobre e não tem perfil em rede social.',
        ],
      },
    },

    // =================================== BRASIL ===================================
    {
      id: 'golpes-comuns-no-brasil',
      aba: 'brasil',
      titulo: 'Golpes comuns no Brasil',
      emUmaFrase:
        'Os quatro trocam de roupa, mas a coreografia é a mesma: entrar é fácil, render é ' +
        'lindo, sair é impossível.',
      // 4 cartões: o que cada golpe promete, onde está a armadilha e o sinal.
      golpes: {
        rotulos: { promete: 'Promete', armadilha: 'Onde está a armadilha', sinal: 'Sinal' },
        // Os mesmos campos no texto que só o leitor de tela ouve. O desenho (M1
        // Desktop, `golpesBrAlt`) abrevia "Onde está a armadilha" para
        // "Armadilha", porque ali não há a coluna para dar o contexto.
        alt: { promete: 'promete:', armadilha: 'Armadilha:', sinal: 'Sinal:' },
        itens: [
          {
            titulo: '1. Falso robô de trade',
            promete: 'Lucro fixo com um "robô" que sempre ganha.',
            armadilha:
              'Impossível num mercado de risco. Caso mais conhecido: Atlas Quantum, multada ' +
              'pela CVM em mais de R$ 55,8 milhões em 2024.',
            sinal: 'Rendimento garantido',
          },
          {
            titulo: '2. Grupo de sinais',
            promete: 'Avisos de "compre agora".',
            armadilha:
              'O organizador compra antes, manda o grupo comprar e vende no topo (pump and ' +
              'dump). Muitas vezes ganha comissão da corretora pelo seu volume.',
            sinal: 'Urgência: "é agora ou nunca"',
          },
          {
            titulo: '3. Pirâmide com cara de fundo cripto',
            promete: 'Um "fundo" que rende sempre.',
            armadilha:
              'Esquema Ponzi: paga os antigos com o dinheiro dos novos, até desabar. A CVM ' +
              'avisa com stop orders.',
            sinal: 'Exigência de recrutar',
          },
          {
            titulo: '4. Falso investimento por WhatsApp',
            promete: 'Um "assessor" e lucros subindo na tela.',
            armadilha:
              'Pig butchering: ganha sua confiança por semanas e indica uma plataforma falsa. ' +
              'Na hora de sacar, o saque trava.',
            sinal: 'Saque bloqueado até nova "taxa"',
          },
        ],
      },
      paragrafos: [
        'Os quatro cartões são disfarces do mesmo enredo: o falso robô vende acerto garantido ' +
          '(impossível num mercado de risco — quem acertasse sempre teria todo o dinheiro do ' +
          'mundo); o grupo de sinais, antecipação; a falsa gestora, rendimento; o "assessor" do ' +
          'WhatsApp, relacionamento. Em todos, o dinheiro entra sem atrito e trava na saída.',
        'Os nomes, traduzidos. Pump and dump ("inflar e despejar"): o organizador compra ' +
          'antes, manda o grupo comprar e vende no topo — o lucro dele é a perda de quem ' +
          'obedeceu. Esquema Ponzi é a pirâmide: não há investimento; os antigos recebem o ' +
          'dinheiro dos novos, até pararem de entrar novos e tudo desabar. Pig butchering ' +
          '("engorda do porco"): semanas de conversa afetuosa para engordar a confiança antes do ' +
          'abate. E a CVM (Comissão de Valores Mobiliários) fiscaliza ofertas de investimento; ' +
          'stop order é a ordem dela para uma empresa parar de oferecer algo ao público.',
        'Nenhum se apresenta como golpe. O que os denuncia é a estrutura, não a aparência — ' +
          'por isso os sinais abaixo valem mais do que julgar se o site parece sério.',
      ],
      listaTitulo: 'Os cinco sinais que se repetem nos quatro',
      lista: [
        'Rendimento fixo ou garantido. Em mercado de risco, garantia não existe: quem garante mente ou paga com o dinheiro do próximo.',
        'Urgência: "é agora ou nunca", contagem regressiva, vaga que acaba hoje. A pressa existe para impedir a pergunta seguinte.',
        'Exigência de recrutar outras pessoas. Se o seu ganho depende de quem você trouxer, o produto é você.',
        'Saque bloqueado até um novo depósito ou uma "taxa". Empresa legítima não cobra para devolver o seu dinheiro.',
        'Empresa sem registro ou autorização. É o único sinal que dá para conferir sozinho, antes de pôr dinheiro.',
      ],
      paragrafosFinais: [
        'Esse último sinal é o que a checagem abaixo resolve: primeiro a CVM (estar num alerta ' +
          'ou numa stop order é sinal forte de perigo), depois o Banco Central, que autoriza ' +
          'quem pode operar. Passar não garante nada; reprovar é motivo para parar. No caso mais ' +
          'conhecido do país, o falso robô da Atlas Quantum, as multas da CVM passaram de R$ ' +
          '55,8 milhões em 2024 — e nenhuma devolveu dinheiro a quem investiu.',
      ],
      // A checagem antes de colocar dinheiro: CVM primeiro, Banco Central depois.
      checagem: {
        frase: 'Antes de colocar dinheiro: a checagem na CVM e no Banco Central',
        perguntaCvm: 'Está nos alertas ou stop orders da CVM (gov.br/investidor)?',
        perguntaBc: 'É autorizada pelo Banco Central?',
        perigo: 'Forte sinal de perigo',
        passou: 'Passou pela checagem. Não é garantia.',
        // Rótulos das setas: na CVM, "Sim" é o ramo ruim (vermelho); no BC, é o bom.
        sim: 'Sim',
        nao: 'Não',
        descricao:
          'Está nos alertas ou stop orders da CVM? Sim: forte sinal de perigo. Não: é ' +
          'autorizada pelo Banco Central? Não: forte sinal de perigo. Sim: passou pela ' +
          'checagem, o que não é garantia.',
      },
      detalhe: {
        titulo: 'datas, multas e números de cada golpe',
        lista: [
          'Atlas Quantum: a Deliberação CVM nº 826 (13/08/2019) mandou parar a oferta. Em ' +
            '21/05/2024, multas de mais de R$ 55,8 milhões por operação fraudulenta e embaraço ' +
            'à fiscalização. Prejuízo: estimativas da imprensa vão de R$ 1,1 bilhão e 47 mil ' +
            'investidores a R$ 7 bilhões e 200 mil pessoas — sem número oficial único.',
          'Pig butchering: a CVM (06/10/2025) estima prejuízo global acima de US$ 75 bilhões ' +
            'entre 2020 e 2024. Operação Criptoabate (Polícia Civil do RS, 13/08/2026): uma ' +
            'vítima transferiu R$ 37 milhões em seis meses; a estrutura tinha mais de R$ 30 ' +
            'bilhões em transações suspeitas.',
        ],
      },
    },
    {
      id: 'cronologia-brasil',
      aba: 'brasil',
      titulo: 'Cripto no Brasil: a cronologia que importa',
      emUmaFrase:
        'A regra nova não mudou o que você pode fazer: mudou quem pode te atender. E já tirou ' +
        'cinco corretoras do atendimento a pessoa física.',
      // O visual é a linha do tempo modulo1.linhaDoTempoRegulacao (mais abaixo).
      paragrafos: [
        'PSAV (Prestadora de Serviços de Ativos Virtuais) é o nome oficial de toda empresa que ' +
          'guarda, intermedeia ou negocia cripto por você: corretoras, intermediárias e ' +
          'custodiantes. Antes, operavam sem autorização própria; desde fevereiro de 2026, ' +
          'seguem regras do Banco Central — prevenção à lavagem de dinheiro, governança, ' +
          'segurança e segregação do dinheiro dos clientes.',
        'Segregar — manter o dinheiro dos clientes separado do caixa da empresa — é o que mais ' +
          'te interessa: a mistura é o que transforma o problema de uma corretora no prejuízo ' +
          'dos clientes (o risco de contraparte da aba Carteiras).',
        'Regra nova custa caro. Quem já operava tem até 30 de outubro de 2026 para pedir ' +
          'autorização, e nem todas quiseram: em 2026, Bitso, Coinext, NovaDAX, Digitra e ' +
          'Bitnuvem anunciaram o fim do varejo (o atendimento a pessoa física) no Brasil, ' +
          'citando o custo de se adequar. Para os clientes delas, foi mudança obrigatória.',
        'Para você, fica uma pergunta antes de escolher onde pôr dinheiro: essa corretora ' +
          'pediu autorização e vai continuar atendendo pessoa física? Consulte no próprio Banco ' +
          'Central, na hora — listas envelhecem rápido. Comprar, vender e guardar cripto ' +
          'continua permitido.',
      ],
      exemplo: {
        titulo: 'O que aconteceu com quem tinha conta numa das cinco',
        passos: [
          'A corretora anuncia o fim do varejo e dá um prazo para os clientes retirarem o que têm.',
          'A Bitso transferiu a base de clientes para o Mercado Bitcoin, em setembro de 2026; a Coinext anunciou o fim em 03/09/2026.',
          'Quem acompanhava migrou com calma; quem não acompanhava soube pelo e-mail de encerramento.',
          'A lição: a conta na corretora depende de a empresa continuar existindo e querendo te atender.',
        ],
      },
      paragrafosFinais: [
        'Não confunda: a Resolução BCB 561 veda stablecoins (tokens feitos para valer sempre o ' +
          'mesmo que uma moeda tradicional, quase sempre o dólar) na liquidação de câmbio ' +
          'eletrônico, isto é, em pagamentos internacionais. Ela não proíbe comprar, vender nem ' +
          'guardar cripto no país. Regulação muda: confira no Banco Central e na CVM antes de ' +
          'decidir com base nela.',
      ],
      detalhe: {
        titulo: 'números das resoluções e a Resolução 561',
        lista: [
          'Resoluções BCB 519, 520 e 521, fruto das Consultas Públicas 109, 110 e 111 de ' +
            '2024. Elas classificam as PSAVs em modalidades: intermediária, custodiante e ' +
            'corretora.',
          'Resolução BCB 561 (30/04/2026, vigor em 01/10/2026): veda stablecoins como ' +
            'liquidação em câmbio eletrônico (eFX), isto é, pagamentos internacionais. Não ' +
            'proíbe comprar, vender nem guardar cripto internamente.',
        ],
      },
    },
    {
      id: 'impostos',
      aba: 'brasil',
      titulo: 'Impostos: a obrigação existe (e este módulo não ensina a calcular)',
      emUmaFrase:
        'Este card não ensina a calcular. Existe para você não descobrir tarde demais que ' +
        'precisava ter anotado.',
      // "O que guardar de cada operação": Data, Valor e Taxas.
      registro: {
        frase: 'O que guardar de cada operação',
        itens: [
          {
            campo: 'Data',
            oQue: 'O dia da venda ou da troca',
            detalhe: 'Vender ou trocar pode gerar imposto — e esse imposto pode ter prazo.',
          },
          {
            campo: 'Valor',
            oQue: 'Quanto entrou e quanto saiu, em reais',
            detalhe: 'Cripto é tratada como um bem; o lucro está sujeito a ganho de capital.',
          },
          {
            campo: 'Taxas',
            oQue: 'Taxa da corretora, da pool e de rede',
            detalhe: 'Elas entram na conta. Sem o registro, não dá para calcular certo.',
          },
        ],
        legenda:
          'Guarde o registro de todas as operações, com datas, valores e taxas. É isso que ' +
          'permite calcular corretamente.',
        descricao:
          'De cada operação, guarde: a data (dia da venda ou da troca), o valor (quanto ' +
          'entrou e quanto saiu, em reais) e as taxas (taxa da corretora, da pool e de rede). ' +
          'É isso que permite calcular corretamente.',
      },
      // Os 4 passos: da venda ao contador. `forte` = texto em negrito.
      passosDoImposto: {
        passos: [
          { texto: 'Você vende ou troca cripto', tom: 'neutro' },
          { texto: 'Pode gerar imposto, e esse imposto pode ter prazo', tom: 'atencao' },
          { texto: 'Guarde o registro: data, valor e taxas', tom: 'acento', forte: true },
          { texto: 'Consulte um contador para o seu caso concreto', tom: 'ok', forte: true },
        ],
        descricao:
          '1. Você vende ou troca cripto. 2. Isso pode gerar imposto, e esse imposto pode ter ' +
          'prazo. 3. Guarde o registro da operação: data, valor e taxas. 4. Consulte um ' +
          'contador para o seu caso concreto.',
      },
      paragrafos: [
        'No Brasil, cripto é tratada como um bem — parecida com um carro ou um imóvel, não com ' +
          'dinheiro na conta. Vender por mais do que pagou dá lucro, e o lucro pode ser ' +
          'tributado: é o ganho de capital, cobrado quando você realiza o ganho, não enquanto o ' +
          'preço só sobe na tela.',
        'A surpresa comum: trocar também conta. Trocar um token por outro, sem passar por ' +
          'reais, pode ser tributado como uma venda. E há obrigações de declarar que valem ' +
          'mesmo sem imposto a pagar.',
        'Isto está num módulo de segurança porque o registro não se reconstrói depois: data, ' +
          'valor em reais e taxas se anotam no dia. Meses depois, a corretora pode ter fechado, ' +
          'o histórico pode ter sumido e a cotação daquele instante vira garimpo. Sem as taxas, ' +
          'o cálculo sai errado para mais.',
        'Este material não dá orientação tributária — nem alíquota, nem prazo, nem formulário; ' +
          'só avisa que a obrigação existe e tem prazo. As regras mudaram, e a Receita Federal ' +
          'passou a receber muito mais informação sobre cripto: diferença entre o que você ' +
          'declara e o que ela já sabe tende a aparecer. É a malha fina, a retenção da ' +
          'declaração para conferência.',
      ],
      exemplo: {
        titulo: 'O que anotar no dia da operação',
        passos: [
          'A data exata da venda ou da troca: ela define em qual período a operação entra.',
          'O que saiu: qual cripto, quanto, e o valor em reais naquele momento.',
          'O que entrou: o que você recebeu, e o valor em reais no mesmo momento.',
          'As taxas: da corretora, da pool e de rede. Entram no custo e reduzem o ganho.',
          'Onde: em qual corretora ou carteira, para reencontrar o comprovante depois.',
        ],
      },
      paragrafosFinais: [
        'O erro que isso evita é deixar para organizar na época da declaração. Quem anota na ' +
          'hora leva ao contador uma planilha; quem não anota leva um problema. Para o seu caso ' +
          'concreto, consulte um contador: aqui o assunto para, de propósito.',
      ],
      detalhe: {
        titulo: 'a lei e a plataforma DeCripto',
        lista: [
          'As regras mudaram com a Lei 14.754/2023 (a "Lei das Offshores") e com novas ' +
            'normas da Receita Federal.',
          'A partir de julho de 2026, a plataforma DeCripto amplia a fiscalização: as ' +
            'plataformas informam as operações à Receita Federal.',
          'A DeCripto foi instituída pela IN RFB nº 2.291/2025 (uma instrução normativa da ' +
            'Receita) e segue o padrão internacional CARF, da OCDE.',
        ],
      },
    },
    {
      id: 'sacar-para-reais',
      aba: 'brasil',
      titulo: 'Sacar para reais: Pix, KYC e P2P',
      emUmaFrase:
        'Sair é o que a maioria menos estuda — e é onde moram dois riscos só dele: o estorno e ' +
        'o bloqueio da sua conta.',
      // Dois caminhos a partir da carteira. O tom pinta o último nó de cada um.
      saque: {
        inicio: 'Cripto na sua carteira',
        caminhos: [
          {
            rotulo: 'Caminho A · corretora',
            nos: [
              { texto: 'Envio para uma CEX com KYC' },
              { texto: 'Venda por reais' },
              { texto: 'Saque via Pix', tom: 'ok' },
            ],
          },
          {
            rotulo: 'Caminho B · P2P',
            nos: [
              { texto: 'Negociação P2P, direto com outra pessoa' },
              { texto: 'Só libera após confirmar o Pix na sua conta', tom: 'atencao' },
            ],
          },
        ],
        legenda:
          'Dois caminhos: corretora com Pix, ou P2P direto com outra pessoa. Em ambos há ' +
          'obrigação tributária a considerar com um contador.',
        descricao:
          'Cripto na sua carteira. Caminho A: envio para uma CEX com KYC, venda por reais, ' +
          'saque via Pix. Caminho B: negociação P2P; só libera após confirmar o Pix.',
      },
      paragrafos: [
        'O caminho A é a corretora: você envia a cripto para uma CEX onde tem cadastro (o KYC ' +
          'da aba Fundamentos), vende por reais e saca por Pix. O caminho B é o P2P ' +
          '(peer-to-peer, "de pessoa para pessoa"): você negocia direto com outra pessoa, sem a ' +
          'corretora comprando de você.',
        'O A é mais simples e, com o cadastro, facilita explicar ao banco a origem do ' +
          'dinheiro. O B costuma pagar melhor — e esse preço melhor é o pagamento pelo risco.',
        'São três riscos, nenhum técnico: a pessoa não pagar depois que você libera a cripto; ' +
          'pagar e depois pedir ao banco dela o estorno do Pix, alegando fraude; ou pagar com ' +
          'dinheiro de crime, que cai na sua conta, é rastreado até você e pode levar ao bloqueio ' +
          'dela, mesmo sem culpa sua. Esse terceiro é o mais subestimado.',
        'O escrow (depósito em garantia) das plataformas de P2P segura a cripto até as duas ' +
          'pontas confirmarem o pagamento. Reduz o risco, não elimina: protege de não receber, ' +
          'não de dinheiro sujo nem de estorno. Regra sem exceção: só solte a cripto depois de ' +
          'ver o valor creditado na sua conta.',
      ],
      exemplo: {
        titulo: 'A ordem que não se inverte, no P2P',
        passos: [
          'Combine dentro da plataforma, com o escrow ativo. Conversa que migra para fora é o primeiro alerta.',
          'Espere o comprovante — e ignore o comprovante: é uma imagem, e imagem se edita.',
          'No aplicativo do banco, confirme que o valor está creditado e disponível, não só agendado.',
          'Confira se quem pagou tem o nome do cadastro da negociação. Pagamento de terceiro: não libere.',
          'Só então libere a cripto. Algo estranho? Abra disputa na plataforma em vez de liberar.',
        ],
      },
      paragrafosFinais: [
        'O erro que essa ordem evita é liberar contra o comprovante, e não contra o saldo. E ' +
          'sair também gera obrigação tributária, a ver com um contador, como diz o card anterior.',
      ],
      detalhe: {
        titulo: 'o arranjo Binance + Z.ro Bank no Pix',
        paragrafos: [
          'Anunciado em 20/05/2025, integrando o Binance Pay ao Pix, operacionalizado pelo ' +
            'Z.ro Bank. Se o arranjo continua idêntico em setembro de 2026: não verificado.',
        ],
      },
    },
  ],

  // ---------------------------------------------------------------------------
  // Conteúdo pesquisado que o desenho NÃO mostra. Não aparece na tela; fica aqui
  // até o dono decidir se volta em outro lugar ou se sai de vez (auditoria de
  // 18/09, m1.md: "Decisão do dono: remover ou manter").
  // ---------------------------------------------------------------------------
  foraDoDesenho: {
    contratoInteligente: {
      titulo: 'O que é um contrato inteligente, em linguagem de leigo',
      emUmaFrase:
        'Um contrato inteligente é um programa que roda sozinho na blockchain. Poder ler ' +
        'o código não quer dizer que ele é seguro.',
      paragrafos: [
        'Um contrato inteligente (smart contract) é um programa que mora na blockchain. ' +
          'Quando as condições programadas acontecem, ele executa sozinho, sem uma ' +
          'empresa no meio para "apertar o botão".',
        'Ele é público: qualquer um pode ler. E, em geral, é imutável: depois de ' +
          'publicado, o código fica naquele endereço para sempre.',
        'Você usa contratos sem perceber. Ao dar um "approve", você chama uma função de ' +
          'um contrato e o autoriza a mexer nos seus tokens. Se o contrato for ' +
          'malicioso, esse approve inocente vira a chave da sua carteira.',
        'No Etherscan e no Solscan, alguns contratos têm o selo "código verificado" ' +
          '(verified):',
      ],
      quadro: [
        {
          rotulo: 'Código verificado',
          texto:
            'O autor publicou o código-fonte, e ele confere com o que roda na rede. Você ' +
            '(ou alguém técnico) consegue ler o que o contrato faz.',
        },
        {
          rotulo: 'Código não verificado',
          texto:
            'Uma caixa-preta: você não sabe o que ele executa. Merece cuidado redobrado.',
        },
      ],
      paragrafosFinais: [
        'Este é o ponto que engana iniciante: "imutável" e "verificado" não significam ' +
          '"seguro". Verificado só quer dizer "dá para ler", não "é confiável".',
        'O código pode ter um bug. Ou pode ser malicioso de propósito e, mesmo assim, ' +
          'estar verificado.',
        'Outro risco é o dono do contrato (owner). Se ele pode pausar transferências, ' +
          'emitir novas moedas ou trocar a lógica, ele tem poder sobre o seu dinheiro.',
      ],
      detalhe: {
        titulo: 'contratos que podem ser trocados (proxy) e o que checar',
        paragrafos: [
          'Existem contratos atualizáveis via proxy. O proxy é uma "porta da frente" com ' +
            'endereço fixo. Ela aponta para uma lógica que o dono pode trocar depois, ' +
            'inclusive por um código malicioso.',
          'Por isso, num contrato, vale a pena checar:',
        ],
        lista: [
          'Se ele é um proxy.',
          'A lógica de implementação, isto é, o código para onde a porta da frente aponta.',
          'Quem é o owner, e se o controle foi renunciado ou está numa carteira multisig ' +
            '(que exige várias assinaturas para agir).',
        ],
      },
    },
    stablecoinsNaReceita: {
      titulo: 'as stablecoins nos números da Receita Federal',
      paragrafos: [
        'Stablecoins são tokens que tentam valer o mesmo que uma moeda tradicional, quase ' +
          'sempre o dólar. No Brasil, boa parte da entrada e do saque de cripto passa por ' +
          'elas.',
        'Segundo nota oficial da Receita Federal (30 de junho de 2026), entre agosto de ' +
          '2019 e dezembro de 2025 foram declarados cerca de R$ 1,58 trilhão em operações ' +
          'com os principais criptoativos.',
        'A participação das stablecoins no volume mensal saltou de 3,5% em 2019 para ' +
          '79,7% em 2022 e 91,5% em 2023. O pico mensal, de R$ 39,7 bilhões, foi em ' +
          'novembro de 2025.',
        'A USDT sozinha respondeu por 88,7% do volume de stablecoins no período. ' +
          '(Citamos as marcas só como retrato do mercado, não como recomendação.)',
      ],
    },
    // O antigo "Ver mais" de cada categoria da tabela de carteiras. A maior parte
    // foi para o "Para ir mais fundo" da seção "Onde ficam suas chaves".
    verMaisDasCarteiras: {
      cex:
        'Colapsos como FTX, Celsius e Mt. Gox mostraram que quem deixou fundos na ' +
        'plataforma perdeu acesso quando ela faliu. No Brasil, desde 2 de fevereiro de ' +
        '2026 só devem seguir operando no varejo as corretoras que obtiverem ' +
        'autorização de PSAV do Banco Central (prazo para pedir: 30 de outubro de ' +
        '2026); Bitso, Coinext, NovaDAX, Digitra e Bitnuvem já anunciaram saída do ' +
        'varejo em 2026 por causa do custo de adequação.',
      hotWallet:
        'A entropia (aleatoriedade) é gerada pelo próprio dispositivo, considerada ' +
        'menos robusta que a de um chip dedicado de hardware wallet. Prática comum: ' +
        'manter uma carteira quente separada só para trade, com pouco saldo, isolada ' +
        'do patrimônio principal — uma assinatura EIP-712 maliciosa (sem custo de ' +
        'gas) pode drenar a carteira sem você perceber.',
      coldWallet:
        'Muitas usam um chip Secure Element que dificulta a extração das chaves. ' +
        'Protege a chave, mas não protege você de digitar a seed num site de golpe — ' +
        'a disciplina com a seed vale para todas as categorias. Até marcas de hardware ' +
        'podem ter incidentes: em dezembro de 2023, a biblioteca Ledger Connect Kit ' +
        'foi comprometida num ataque de cadeia de suprimentos que injetou um drainer ' +
        'em vários aplicativos.',
    },

    // As três anatomias do desenho antigo (SVG, montarAnatomia). O desenho do M1
    // só mostra a anatomia da transação, que ficou em `anatomias`, acima.
    telaDeBackup: {
      titulo: 'Anatomia da tela de backup da carteira',
      descricao: 'O momento em que a carteira te entrega a frase — e os quatro lugares onde se erra.',
      viewBox: [0, 0, 640, 320],
      paineis: [
        { id: 'palavras', x: 12, y: 12, w: 400, h: 200, rotulo: 'Sua frase de recuperação — 12 palavras, numeradas', tipo: 'lista' },
        { id: 'copiar', x: 424, y: 12, w: 204, h: 60, rotulo: 'Copiar', tipo: 'botao', alerta: true },
        { id: 'confirmo', x: 424, y: 84, w: 204, h: 60, rotulo: 'Anotei em local seguro', tipo: 'campo' },
        { id: 'continuar', x: 424, y: 156, w: 204, h: 56, rotulo: 'Continuar', tipo: 'botao' },
        { id: 'conferencia', x: 12, y: 224, w: 616, h: 84, rotulo: 'Conferência: qual é a palavra 9? E a 3?', tipo: 'campo' },
      ],
      itens: [
        {
          painel: 'palavras',
          titulo: 'Anote no papel, na ordem, numeradas',
          texto: 'É a carteira inteira. Escreva 1, 2, 3… à mão. NUNCA fotografe, faça print nem salve em nuvem ou bloco de notas.',
        },
        {
          painel: 'copiar',
          titulo: 'O botão que você não usa',
          texto: 'Copiar coloca a frase na área de transferência — exatamente o que um clipper malware vigia. Papel, não clipboard.',
        },
        {
          painel: 'conferencia',
          titulo: 'A conferência não é burocracia',
          texto: 'O app pede palavras em posições específicas para provar que você anotou certo. Pular isso "para anotar depois" é como se perde tudo.',
        },
        {
          painel: 'confirmo',
          titulo: 'A caixa que mente por você',
          texto: 'Marcar "anotei" sem ter anotado desliga o único aviso que a carteira vai te dar. Ela acredita em você.',
        },
        {
          painel: 'continuar',
          titulo: 'Só depois',
          texto: 'De ter a frase no papel, guardada offline. Se você perder as palavras e o aparelho quebrar, ninguém no mundo recupera.',
        },
      ],
      nota: 'Tela esquemática do fluxo de criação; cada app desenha diferente, mas os quatro elementos — as palavras, o copiar, a confirmação e a conferência — aparecem em quase todos.',
    },

    sitePhishing: {
      titulo: 'Anatomia de um site de phishing',
      descricao: 'Os seis elementos que se repetem em quase toda página feita para drenar carteira.',
      viewBox: [0, 0, 640, 340],
      paineis: [
        { id: 'url', x: 12, y: 12, w: 616, h: 48, rotulo: 'Barra de endereço: nome-parecido-com-o-oficial.com', tipo: 'campo', alerta: true },
        { id: 'banner', x: 12, y: 72, w: 616, h: 70, rotulo: 'AIRDROP EXCLUSIVO — resgate seus tokens', tipo: 'texto' },
        { id: 'contador', x: 12, y: 154, w: 300, h: 70, rotulo: 'Termina em 09:41', tipo: 'numeros', alerta: true },
        { id: 'selos', x: 328, y: 154, w: 300, h: 70, rotulo: 'Auditado · Verificado · Parceiro oficial', tipo: 'lista' },
        { id: 'conectar', x: 12, y: 236, w: 616, h: 60, rotulo: 'Conectar carteira para resgatar', tipo: 'botao', alerta: true },
        { id: 'rodape', x: 12, y: 304, w: 616, h: 28, rotulo: 'Suporte 24h no Telegram', tipo: 'texto' },
      ],
      itens: [
        {
          painel: 'url',
          titulo: 'O domínio quase certo',
          texto: 'Um caractere trocado, um hífen a mais, um subdomínio. Confira letra por letra — e desconfie de qualquer link que chegou por mensagem ou anúncio patrocinado.',
        },
        {
          painel: 'banner',
          titulo: 'A isca',
          texto: 'Airdrop, resgate, compensação, "seus tokens presos". A promessa existe para você clicar sem pensar.',
        },
        {
          painel: 'contador',
          titulo: 'A urgência',
          texto: 'A contagem regressiva existe para impedir a pergunta "espera, isso faz sentido?". Pressa é ferramenta do golpe, não coincidência.',
        },
        {
          painel: 'selos',
          titulo: 'Selos que qualquer um desenha',
          texto: '"Auditado", "verificado", "parceiro oficial". Um selo numa página é só uma imagem. Verificação de verdade se confere na fonte, não no site.',
        },
        {
          painel: 'conectar',
          titulo: 'O botão que drena',
          texto: 'Conectar é inofensivo; o que vem depois não é — uma assinatura ou aprovação que entrega os tokens. É aqui que o roteiro do drainer começa.',
        },
        {
          painel: 'rodape',
          titulo: 'O "suporte" que pede a seed',
          texto: 'Suporte legítimo nunca pede a frase-semente, nunca aparece sozinho no seu Telegram, nunca cobra taxa para "recuperar" fundos.',
        },
      ],
      nota: 'Página esquemática. Nenhum site real foi copiado; os elementos são os que se repetem em quase todo phishing de carteira.',
    },

    telaDeAssinatura: {
      titulo: 'Anatomia do pop-up de assinatura',
      descricao: 'Os campos que se leem ANTES de aprovar — e o que cada um denuncia.',
      viewBox: [0, 0, 640, 340],
      paineis: [
        { id: 'origem', x: 12, y: 12, w: 616, h: 52, rotulo: 'Solicitação de: nome-do-site.com', tipo: 'campo' },
        { id: 'tipo', x: 12, y: 76, w: 300, h: 60, rotulo: 'Tipo: Aprovação de gasto (approve)', tipo: 'numeros' },
        { id: 'token', x: 328, y: 76, w: 300, h: 60, rotulo: 'Token: XYZ', tipo: 'numeros' },
        { id: 'valor', x: 12, y: 148, w: 300, h: 70, rotulo: 'Valor aprovado: ILIMITADO', tipo: 'numeros', alerta: true },
        { id: 'spender', x: 328, y: 148, w: 300, h: 70, rotulo: 'Spender (quem poderá gastar): 0x…', tipo: 'campo', alerta: true },
        { id: 'rejeitar', x: 12, y: 232, w: 300, h: 56, rotulo: 'Rejeitar', tipo: 'botao' },
        { id: 'aprovar', x: 328, y: 232, w: 300, h: 56, rotulo: 'Aprovar', tipo: 'botao', alerta: true },
        { id: 'gas', x: 12, y: 300, w: 616, h: 32, rotulo: 'Taxa estimada de rede', tipo: 'texto' },
      ],
      itens: [
        {
          painel: 'origem',
          titulo: 'Quem está pedindo',
          texto: 'Confere com o site que VOCÊ abriu? Se a solicitação veio de uma aba que você não reconhece, já é resposta.',
        },
        {
          painel: 'tipo',
          titulo: 'O que está sendo pedido',
          texto: 'Approve (permissão de gasto), setApprovalForAll (todos os NFTs de uma coleção) ou "assinar mensagem" (Permit — sem taxa, e por isso mais enganoso).',
        },
        {
          painel: 'valor',
          titulo: 'O campo que os drainers usam',
          texto: 'ILIMITADO deixa o contrato livre para esvaziar aquele token quando quiser, sem nova interação sua. Sites legítimos funcionam com o valor exato — edite.',
        },
        {
          painel: 'spender',
          titulo: 'Quem vai poder mover',
          texto: 'É o contrato que recebe a permissão. Se você não reconhece o endereço, não existe motivo para aprovar.',
        },
        {
          painel: 'aprovar',
          titulo: 'Só depois dos três acima',
          texto: 'Aprovar sem ler é o roteiro inteiro do drainer resumido num clique.',
        },
        {
          painel: 'rejeitar',
          titulo: 'Custa zero',
          texto: 'Rejeitar não custa gas nem quebra nada. Na dúvida, é sempre a resposta certa — o site legítimo pede de novo.',
        },
      ],
      nota: 'Pop-up esquemático. As carteiras mudam o layout, mas os campos — origem, tipo, valor, spender — são os mesmos, e é neles que se lê o golpe antes de assinar.',
    },
  },

  // ---------------------------------------------------------------------------
  // Tabela comparativa (aba "Carteiras", seção "Onde ficam suas chaves")
  //
  // Critérios nas linhas, as três categorias nas colunas (montarComparacaoLadoALado).
  // O critério decisivo é "Quem guarda as chaves": as células dele têm tom
  // (vermelho = a empresa guarda; âmbar = você guarda, mas online; verde = você
  // guarda, offline). O que antes ficava no "Ver mais" de cada categoria foi para
  // o "Para ir mais fundo" da seção, como no desenho.
  // ---------------------------------------------------------------------------
  tabelaCarteiras: {
    rotulo: 'Comparação: CEX, hot wallet e cold wallet (role na horizontal se preciso)',
    larguraMinima: 600,
    frase: 'Se as chaves não são suas, as moedas não são suas.',
    criterios: [
      { chave: 'custodia', rotulo: 'Quem guarda as chaves', decisivo: true },
      { chave: 'pros', rotulo: 'Prós' },
      { chave: 'contras', rotulo: 'Contras' },
    ],
    opcoes: [
      {
        titulo: 'CEX (corretora centralizada)',
        subtitulo: 'Binance, Mercado Bitcoin — exemplos de categoria',
        valores: {
          custodia: { texto: 'A empresa guarda as chaves por você, como um banco (custódia de terceiro).', tom: 'alerta' },
          pros: 'Fácil de usar; aceita Pix e entrada/saída em reais; faz KYC; tem suporte.',
          contras: 'Você não controla as chaves ("not your keys, not your coins"); risco de bloqueio de conta, hack ou encerramento da plataforma.',
        },
      },
      {
        titulo: 'Hot wallet (carteira quente)',
        subtitulo: 'Phantom (Solana), MetaMask (EVM) — exemplos de categoria',
        valores: {
          custodia: { texto: 'Você guarda as chaves, mas num aparelho conectado à internet.', tom: 'atencao' },
          pros: 'Grátis; conecta em aplicativos descentralizados; é o que se usa para negociar on-chain.',
          contras: 'Exposta a site falso, golpe e vírus; uma assinatura errada pode esvaziá-la.',
        },
      },
      {
        titulo: 'Cold wallet (carteira fria)',
        subtitulo: 'Aparelhos de hardware — exemplos de categoria',
        valores: {
          custodia: { texto: 'Você guarda as chaves num dispositivo físico offline.', tom: 'ok' },
          pros: 'As chaves nunca tocam a internet; melhor categoria para guardar por muito tempo; mostra o destino na telinha, longe de vírus.',
          contras: 'Custo do aparelho; menos prática para trocas rápidas.',
        },
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // Checklist de segurança (aba "Seed phrase")
  //
  // O título e a frase de abertura do card são conteúdo (estão no desenho, em
  // "M1 Desktop.dc.html"), por isso ficam aqui e não na view.
  // ---------------------------------------------------------------------------
  checklistSegurancaTitulo: 'Checklist de segurança',
  checklistSegurancaDescricao: 'Marque conforme for aplicando; fica salvo no seu navegador. Alguns itens usam termos das abas Golpes, Defesa e Brasil: volte a eles depois.',

  checklistSeguranca: [
    {
      id: 'anotar-papel',
      texto: 'Anotei minha frase-semente no papel ou em placa de metal e guardo offline.',
      porque: 'Papel e metal ficam offline; nuvem e foto podem vazar e entregar a carteira inteira.',
    },
    {
      id: 'nunca-nuvem',
      texto: 'Nunca fotografei, fiz print nem salvei a frase em nuvem, e-mail, PC ou WhatsApp.',
      porque: 'Qualquer cópia digital é um ponto de vazamento; a frase É a carteira.',
    },
    {
      id: 'copias-fisicas',
      texto: 'Guardo cópias da frase em mais de um lugar físico seguro.',
      porque: 'Se o único papel se perder ou queimar, o dinheiro some para sempre.',
    },
    {
      id: 'nunca-digitar',
      texto: 'Nunca digito a frase-semente em nenhum site.',
      porque: 'Nenhum serviço legítimo pede a frase; todo pedido é golpe.',
    },
    {
      id: 'desconfiar-suporte',
      texto: 'Desconfio de todo "suporte" que peça a frase ou a chave privada.',
      porque: 'Suporte real nunca pede isso — por Discord, Telegram, X ou e-mail.',
    },
    {
      id: 'conferir-url',
      texto: 'Confiro a URL do site e do explorador antes de conectar a carteira.',
      porque: 'Sites falsos (drainers) imitam apps e exploradores conhecidos.',
    },
    {
      id: 'favoritos-sem-anuncio',
      texto: 'Salvei nos favoritos os sites oficiais; não clico em anúncios nem em links de mensagem direta.',
      porque: 'Golpistas já compraram anúncios do Google mirando quem procurava carteiras conhecidas.',
    },
    {
      id: 'ler-antes-de-assinar',
      texto: 'Leio o que a carteira mostra antes de assinar qualquer coisa, e desconfio de "assinar mensagem" vindo de site que eu não abri digitando o endereço.',
      porque: 'Permit, Permit2 e EIP-7702 se escondem em assinaturas sem gás disfarçadas de "login" ou "claim".',
    },
    {
      id: 'aprovar-limitado',
      texto: 'Prefiro aprovar valores limitados, não "ilimitado".',
      porque: 'Uma aprovação ilimitada dormente pode ser usada para sacar depois, sem nova interação sua.',
    },
    {
      id: 'revisar-aprovacoes',
      texto: 'Reviso e revogo aprovações antigas periodicamente no Revoke.cash ou no Token Approval Checker do Etherscan.',
      porque: 'Contratos que você não usa mais continuam com permissão de gastar seus tokens.',
    },
    {
      id: 'conferir-endereco',
      texto: 'Confiro o endereço inteiro ao colar, não só o começo e o fim.',
      porque: 'Address poisoning e clipper malware trocam o endereço por um "sósia".',
    },
    {
      id: 'confirmar-no-aparelho',
      texto: 'Confirmo transações no aparelho da carteira fria, lendo o endereço na telinha.',
      porque: 'Mesmo com clipper no PC, o aparelho mostra o destino real antes de você aprovar.',
    },
    {
      id: 'segregar-carteiras',
      texto: 'Mantenho valores grandes em cold wallet e uso uma carteira quente separada, com pouco saldo, só para trade.',
      porque: 'Reduz o estrago se a carteira do dia a dia for comprometida.',
    },
    {
      id: 'migrar-se-infectado',
      texto: 'Se suspeitar de infecção, migro tudo para uma carteira nova (frase nova) a partir de um dispositivo limpo.',
      porque: 'Revogar não resolve frase comprometida nem malware ainda instalado.',
    },
    {
      id: 'baixar-fonte-oficial',
      texto: 'Baixo carteiras apenas do site ou loja oficial, nunca de anúncio patrocinado.',
      porque: 'Golpistas já distribuíram versões falsas de carteiras conhecidas via anúncio, que roubaram a frase-semente.',
    },
    {
      id: 'teste-de-valor-baixo',
      texto: 'Faço uma transação-teste de valor baixo antes de mover ou enviar quantia relevante.',
      porque: 'Um erro de endereço ou de rede é irreversível; o teste barato revela o problema antes.',
    },
    {
      id: 'consultar-cvm-bc',
      texto: 'Antes de investir, consulto os alertas/stop orders da CVM e verifico se a instituição é autorizada pelo Banco Central.',
      porque: 'Estar numa lista de alerta, ou não constar entre as autorizadas, é um forte sinal de golpe.',
    },
    {
      id: 'nunca-recuperacao-paga',
      texto: 'Nunca pago taxa adiantada a "serviços de recuperação" de cripto.',
      porque: 'Prometer recuperar fundos mediante taxa é golpe secundário — o próprio FBI/IC3 afirma que jamais cobra para isso.',
    },
    {
      id: 'p2p-confirmar-pix',
      texto: 'No P2P, só libero a cripto depois de confirmar que o Pix caiu de fato na minha conta.',
      porque: 'Comprovante falso e estorno são golpes comuns de contraparte.',
    },
    {
      id: 'registrar-para-contador',
      texto: 'Guardo registro de todas as operações e vou consultar um contador.',
      porque: 'A obrigação tributária existe, e o registro evita cair na malha fina.',
    },
  ],

  // ---------------------------------------------------------------------------
  // Roteiro do golpe de drainer (aba "Golpes")
  // ---------------------------------------------------------------------------
  roteiroDrainer: [
    {
      numero: 1,
      titulo: 'Isca',
      oQueVeem: 'Um anúncio, "airdrop", "mint" de NFT, conta de projeto conhecida no X/Discord, ou site clonado que parece oficial.',
      oQueAcontece: 'O golpista usa marca imitada e conta hackeada ou falsa para atrair; kits de drainer clonam sites automaticamente.',
    },
    {
      numero: 2,
      titulo: 'Conectar carteira',
      oQueVeem: '"Conecte sua carteira para reivindicar/participar" — parece o passo normal de qualquer app.',
      oQueAcontece: 'Conectar em si não rouba: só permite que o site veja seus saldos públicos. O passo leva à tela onde a assinatura maliciosa será pedida.',
    },
    {
      numero: 3,
      titulo: 'Assinar',
      oQueVeem: 'Uma janela pedindo para "assinar", chamada de "verificação" ou "claim" (resgate) grátis, sem taxa.',
      oQueAcontece: 'Uma permissão disfarçada — approve ilimitado, Permit ou setApprovalForAll, os truques do próximo card — que deixa o golpista mover seus ativos.',
    },
    {
      numero: 4,
      titulo: 'Drenagem',
      oQueVeem: 'Nada, ou uma tela de "erro"/"tente de novo"; o saldo some minutos depois.',
      oQueAcontece: 'O golpista usa a permissão e transfere os fundos, sem precisar de nova ação da vítima.',
    },
    {
      numero: 5,
      titulo: 'Lavagem',
      oQueVeem: '(a vítima costuma perceber tarde, quando o saldo já sumiu)',
      oQueAcontece: 'Os fundos correm por mixers (que embaralham o rastro), pontes entre redes ou corretoras; um contrato paga sozinho a divisão operador/afiliado (tipicamente 20%/80%).',
    },
  ],

  // ---------------------------------------------------------------------------
  // Mini-quiz (aba "Quiz") — 16 perguntas, sem sobreposição entre as duas pesquisas
  // ---------------------------------------------------------------------------
  // Por que cada alternativa errada do quiz não serve (o quiz mostra a da resposta
  // escolhida). Feedback que explica rende muito mais que "certo/errado" (Van der
  // Kleij, Feskens & Eggen, 2015: 0,49 contra 0,05).
  porqueErradas: {
    q1: {
      a: 'Nem a corretora nem o suporte conseguem desfazer um bloco já confirmado.',
      c: 'O valor não muda nada: uma transação de centavos é tão definitiva quanto uma de milhões.',
      d: 'Não existe botão de "final": o que torna a transação definitiva são os blocos empilhados por cima.',
    },
    q2: {
      a: 'Na cold wallet as chaves ficam num aparelho seu, fora da internet.',
      b: 'Na hot wallet as chaves ficam no seu celular ou navegador — conectadas, mas suas.',
      d: 'Carteira de hardware é um tipo de cold wallet: as chaves ficam no aparelho, com você.',
    },
    q3: {
      a: 'O cadeado só diz que a conexão é criptografada. Site de golpe também tem cadeado.',
      b: 'Pressa é o gatilho que o golpe usa; ela não torna nada seguro.',
      d: 'Uma vez basta: quem recebe a frase recria a carteira inteira na hora.',
    },
    q4: {
      a: 'Um approval é permissão sobre tokens, não acesso ao seu e-mail.',
      c: 'Assinar na blockchain não expõe dados pessoais; expõe o que você autorizou a mover.',
      d: 'Approval não roda nada no seu computador: é uma permissão registrada na blockchain.',
    },
    q5: {
      b: 'Um tradutor não lê permissões na blockchain.',
      c: 'Um explorador só de leitura mostra as aprovações, mas para revogar é preciso conectar e assinar a revogação.',
      d: 'O banco não enxerga permissões dadas na blockchain.',
    },
    q6: {
      a: 'Conectar sozinho não move nada: o roubo precisa de uma assinatura sua.',
      c: 'A frase-semente nunca sai da carteira quando você conecta.',
      d: 'Conectar não custa taxa; taxa só aparece quando uma transação é enviada.',
    },
    q7: {
      a: 'No address poisoning você copia um endereço parecido do próprio histórico — cola o que copiou. No clipper, você copia o certo e o vírus cola outro.',
      c: 'Permit2 é um sistema de permissões de token; não troca o que você cola.',
      d: 'Rug pull é o criador do token tirando a liquidez; não tem relação com a área de transferência.',
    },
    q8: {
      a: 'Mudou: as Resoluções BCB 519, 520 e 521 criaram a autorização de PSAV.',
      b: 'O Pix continua sendo usado para comprar e vender cripto.',
      d: 'Não houve banimento: as empresas precisam de autorização, e várias saíram do varejo por conta própria.',
    },
    q9: {
      a: '"Success" quer dizer que a transação executou — alguma coisa aconteceu.',
      b: 'Uma falha apareceria como "Failed", não "Success".',
      d: 'Value 0 não é devolução: a transferência foi de token, não da moeda nativa.',
    },
    q10: {
      a: 'A frase não é login de corretora: é a origem de todas as chaves da carteira.',
      c: 'A frase não expira: vale para sempre.',
      d: 'Funciona em qualquer app compatível — é justamente isso que a torna perigosa.',
    },
    q11: {
      a: 'Sem gas não quer dizer inofensiva: um Permit autoriza mover seus tokens.',
      c: 'Assinatura de login existe, mas a mesma tela pode esconder um Permit.',
      d: 'A assinatura vale sem gas; quem paga o gas é o atacante, depois, ao usar a permissão.',
    },
    q12: {
      a: 'O Revoke.cash não estorna nada: a blockchain não tem estorno.',
      c: 'Não há prazo que recupere: revogar só impede o próximo uso.',
      d: 'Vale igual para NFT: revogar não traz de volta o que já saiu.',
    },
    q13: {
      a: 'A Solana tem taxas — pequenas, mas tem.',
      c: 'Na EVM existe aprovação: é o allowance de ERC-20, justamente o que se revoga.',
      d: 'Na Solana dá para revogar delegações; o mecanismo é por conta, não por allowance.',
    },
    q14: {
      a: 'Não há devolução: a rede fez o trabalho até o ponto do erro.',
      b: 'Falhar não isenta: o gas paga o processamento, não o resultado.',
      d: 'Transação que falha também paga — é por isso que slippage mal configurado custa dinheiro.',
    },
    q15: {
      a: 'Não são sinônimos: numa há uma empresa no meio, na outra não.',
      c: 'A DEX não é mais segura: sem suporte, erro seu não tem volta.',
      d: 'A DEX também cobra: taxa da pool e taxa de rede.',
    },
    q16: {
      a: 'Corretora de verdade não cobra "taxa para liberar o saque".',
      c: 'O Banco Central não cobra imposto para liberar saque.',
      d: 'Pedir dinheiro para liberar dinheiro é o padrão do golpe, não garantia.',
    },
  },

  quiz: [
    {
      id: 'q1',
      pergunta: 'O que torna uma transação praticamente imutável numa blockchain?',
      alternativas: [
        { id: 'a', texto: 'O suporte da corretora aprovar' },
        { id: 'b', texto: 'O número de confirmações (blocos empilhados por cima)' },
        { id: 'c', texto: 'O valor ser alto' },
        { id: 'd', texto: 'Você marcar como "final"' },
      ],
      correta: 'b',
      explicacao:
        'Cada bloco novo em cima do seu aumenta o custo de reescrever a história; por ' +
        'isso corretoras esperam um mínimo de confirmações. Transações que falharam ' +
        'também ficam gravadas para sempre.',
    },
    {
      id: 'q2',
      pergunta: 'Qual opção NÃO guarda as chaves com você?',
      alternativas: [
        { id: 'a', texto: 'Cold wallet' },
        { id: 'b', texto: 'Hot wallet' },
        { id: 'c', texto: 'CEX (corretora)' },
        { id: 'd', texto: 'Carteira de hardware' },
      ],
      correta: 'c',
      explicacao:
        'Na CEX, a empresa custodia as chaves, como um banco. Daí o ditado "not your ' +
        'keys, not your coins": sem as chaves, você depende da plataforma.',
    },
    {
      id: 'q3',
      pergunta: 'É seguro digitar sua frase-semente num site que promete um airdrop?',
      alternativas: [
        { id: 'a', texto: 'Sim, se o site tiver cadeado' },
        { id: 'b', texto: 'Sim, se for rápido' },
        { id: 'c', texto: 'Não, nunca — nenhum serviço legítimo pede a frase' },
        { id: 'd', texto: 'Só na primeira vez' },
      ],
      correta: 'c',
      explicacao:
        'A frase recria a carteira inteira em qualquer aparelho. Todo pedido de frase é ' +
        'golpe; a forma segura é mantê-la offline, no papel ou no metal.',
    },
    {
      id: 'q4',
      pergunta: 'O que um "approval" malicioso permite ao atacante?',
      alternativas: [
        { id: 'a', texto: 'Descobrir sua senha do e-mail' },
        { id: 'b', texto: 'Transferir seus tokens usando uma permissão que você assinou' },
        { id: 'c', texto: 'Ver seu CPF' },
        { id: 'd', texto: 'Minerar Bitcoin no seu PC' },
      ],
      correta: 'b',
      explicacao:
        'O golpe de drainer não rouba a frase-semente; ele faz você assinar uma ' +
        'permissão e depois usa transferFrom para levar os tokens. Ler o que se assina ' +
        'é a defesa.',
    },
    {
      id: 'q5',
      pergunta: 'Qual ferramenta serve para revisar e revogar aprovações?',
      alternativas: [
        { id: 'a', texto: 'Revoke.cash' },
        { id: 'b', texto: 'Um tradutor online' },
        { id: 'c', texto: 'Um explorador só de leitura, sem conectar' },
        { id: 'd', texto: 'O aplicativo do banco' },
      ],
      correta: 'a',
      explicacao:
        'O Revoke.cash (100+ redes) e o Token Approval Checker do Etherscan listam e ' +
        'revogam permissões. Revogar impede usos futuros, mas não recupera o que já ' +
        'saiu.',
    },
    {
      id: 'q6',
      pergunta: 'Você conectou a carteira num site e não assinou nada. O que aconteceu?',
      alternativas: [
        { id: 'a', texto: 'Seus tokens já foram roubados' },
        { id: 'b', texto: 'O site só passou a ver seus saldos públicos' },
        { id: 'c', texto: 'Sua frase-semente foi exposta' },
        { id: 'd', texto: 'Você pagou uma taxa alta' },
      ],
      correta: 'b',
      explicacao:
        'Conectar, sozinho, não move fundos — apenas mostra saldos. O risco aparece no ' +
        'passo seguinte, quando o site pede uma assinatura disfarçada.',
    },
    {
      id: 'q7',
      pergunta: 'Você copiou um endereço, mas colou outro, e o dinheiro sumiu. Que golpe é esse?',
      alternativas: [
        { id: 'a', texto: 'Address poisoning' },
        { id: 'b', texto: 'Clipper malware' },
        { id: 'c', texto: 'Permit2' },
        { id: 'd', texto: 'Rug pull' },
      ],
      correta: 'b',
      explicacao:
        'O clipper é um vírus que troca o endereço na área de transferência. Conferir a ' +
        'linha inteira e usar uma carteira fria (que mostra o destino na telinha) ' +
        'defende contra ele.',
    },
    {
      id: 'q8',
      pergunta: 'Desde fevereiro de 2026, o que mudou para corretoras no Brasil?',
      alternativas: [
        { id: 'a', texto: 'Nada mudou' },
        { id: 'b', texto: 'O Pix foi proibido para cripto' },
        { id: 'c', texto: 'Passou a valer a regra de PSAV do Banco Central, e várias corretoras encerraram o varejo' },
        { id: 'd', texto: 'Todas as corretoras estrangeiras foram banidas para sempre' },
      ],
      correta: 'c',
      explicacao:
        'As Resoluções BCB 519, 520 e 521 criaram a PSAV; empresas têm até 30/10/2026 ' +
        'para pedir autorização, e Bitso, Coinext, NovaDAX, Digitra e Bitnuvem ' +
        'anunciaram saída do varejo em 2026.',
    },
    {
      id: 'q9',
      pergunta: 'Você abre uma transação no Etherscan e vê "Value: 0 ETH" com Status: Success. O que provavelmente aconteceu?',
      alternativas: [
        { id: 'a', texto: 'Nada aconteceu, foi um erro' },
        { id: 'b', texto: 'A transação falhou' },
        { id: 'c', texto: 'Pode ter havido transferência de tokens — confira a aba "Token Transfers"' },
        { id: 'd', texto: 'O ETH foi devolvido automaticamente' },
      ],
      correta: 'c',
      explicacao:
        'Em transferências de token o campo "Value" (moeda nativa) costuma ser 0, mas ' +
        'os tokens se movem e aparecem em "Token Transfers"/Logs. "Success" só diz que ' +
        'a transação executou, não o que ela fez.',
    },
    {
      id: 'q10',
      pergunta: 'Por que as 12 ou 24 palavras da frase-semente são tão perigosas se vazarem?',
      alternativas: [
        { id: 'a', texto: 'Porque são a senha de login da corretora' },
        { id: 'b', texto: 'Porque geram todas as chaves e endereços da carteira, em qualquer app compatível' },
        { id: 'c', texto: 'Porque expiram a cada 30 dias' },
        { id: 'd', texto: 'Porque só funcionam no aparelho original' },
      ],
      correta: 'b',
      explicacao:
        'Pelos padrões BIP-39/BIP-32/BIP-44, a frase vira uma "semente" que deriva toda ' +
        'a árvore de chaves. Quem tem a frase recria a carteira inteira em qualquer ' +
        'dispositivo, sem precisar de senha nem do seu aparelho.',
    },
    {
      id: 'q11',
      pergunta: 'Um site pede para você assinar uma mensagem que não cobra gas. Por que isso pode ser perigoso?',
      alternativas: [
        { id: 'a', texto: 'Assinaturas sem gas são sempre seguras' },
        { id: 'b', texto: 'Uma assinatura Permit/Permit2 (EIP-712) pode autorizar o saque dos seus tokens' },
        { id: 'c', texto: 'Assinar só serve para fazer login' },
        { id: 'd', texto: 'Sem gas, a transação nunca é válida' },
      ],
      correta: 'b',
      explicacao:
        'Assinaturas offchain não custam gas e não parecem transações, mas um ' +
        'Permit/Permit2 autoriza mover seus fundos. Foi o método por trás da maior ' +
        'parte dos roubos por drainer em 2024–2025.',
    },
    {
      id: 'q12',
      pergunta: 'Você foi vítima de um drainer e os fundos já saíram. Revogar as aprovações no Revoke.cash vai recuperar o dinheiro?',
      alternativas: [
        { id: 'a', texto: 'Sim, o Revoke.cash estorna tudo' },
        { id: 'b', texto: 'Não — revogar só impede gastos futuros; não recupera o que já saiu' },
        { id: 'c', texto: 'Sim, se você revogar em até 24 horas' },
        { id: 'd', texto: 'Só recupera se for NFT' },
      ],
      correta: 'b',
      explicacao:
        'Revogar é preventivo: zera permissões para o futuro. Não recupera fundos ' +
        'drenados, não desfaz uma frase comprometida e não remove malware — nesses ' +
        'casos, migre para uma carteira nova a partir de um dispositivo limpo.',
    },
    {
      id: 'q13',
      pergunta: 'Qual é a diferença central entre a Solana e as redes EVM que muda como os golpes e a revogação funcionam?',
      alternativas: [
        { id: 'a', texto: 'Solana não tem taxas' },
        { id: 'b', texto: 'Na Solana os tokens vivem em token accounts (ATAs) com rent, e a delegação/troca de authority é por conta — não por "allowance" de token como na EVM' },
        { id: 'c', texto: 'Na EVM não existe aprovação' },
        { id: 'd', texto: 'Solana não permite revogar nada' },
      ],
      correta: 'b',
      explicacao:
        'Na EVM você revoga allowances de ERC-20; na Solana você lida com token ' +
        'accounts (ATAs, que exigem rent), delegação por conta e o risco específico de ' +
        'assinar uma troca de authority (SetAuthority), que pode entregar o controle da ' +
        'conta.',
    },
    {
      id: 'q14',
      pergunta: 'Sua transação numa DEX falhou (Status: Failed). O que acontece com a taxa de gas?',
      alternativas: [
        { id: 'a', texto: 'É devolvida integralmente' },
        { id: 'b', texto: 'Você não paga nada porque falhou' },
        { id: 'c', texto: 'Você paga o gas assim mesmo, pois a rede fez o trabalho computacional até o ponto do erro' },
        { id: 'd', texto: 'A taxa só é cobrada em transações de sucesso' },
      ],
      correta: 'c',
      explicacao:
        'O gas paga o trabalho computacional dos computadores da rede, que foi ' +
        'realizado até o ponto da falha. Por isso uma transação que falha ainda custa ' +
        'gas — vale tanto na EVM quanto na Solana.',
    },
    {
      id: 'q15',
      pergunta: 'Qual é a diferença central entre uma CEX e uma DEX?',
      alternativas: [
        { id: 'a', texto: 'Nenhuma, são sinônimos' },
        { id: 'b', texto: 'Na CEX a empresa faz a custódia, com KYC e suporte; na DEX você negocia direto da sua carteira contra um pool de liquidez, sem cadastro, sem suporte e sem reversão' },
        { id: 'c', texto: 'A DEX é sempre mais segura' },
        { id: 'd', texto: 'Só a CEX cobra taxas' },
      ],
      correta: 'b',
      explicacao:
        'Na CEX há uma empresa no meio (custódia, KYC, suporte, às vezes reversão). Na ' +
        'DEX você opera direto da carteira contra um pool via AMM — se errar, não há ' +
        'para quem recorrer, e por isso a maioria dos memecoins só vive em DEX.',
    },
    {
      id: 'q16',
      pergunta: 'Um "assessor" que você conheceu por WhatsApp mostra lucros crescentes numa plataforma e, quando você tenta sacar, pedem uma "taxa" para liberar. O que provavelmente é?',
      alternativas: [
        { id: 'a', texto: 'Uma exigência normal de qualquer corretora' },
        { id: 'b', texto: 'Um golpe: o lucro na tela é falso e a "taxa para liberar o saque" é sinal clássico de fraude (pig butchering)' },
        { id: 'c', texto: 'Um imposto cobrado pelo Banco Central' },
        { id: 'd', texto: 'Uma garantia de que o dinheiro está seguro' },
      ],
      correta: 'b',
      explicacao:
        'Lucro na tela é só um número numa plataforma falsa; pedir uma "taxa" para ' +
        'liberar o saque é sinal clássico de golpe. Antes de depositar, consulte os ' +
        'alertas da CVM e verifique a autorização da instituição no Banco Central.',
    },
  ],

  // ---------------------------------------------------------------------------
  // Fontes consultadas (aba "Quiz", seção de rodapé) — união deduplicada por URL
  // das duas pesquisas. Datas de consulta: 06/09/2026.
  // ---------------------------------------------------------------------------
  fontes: [
  { titulo: 'Etherscan Information Center "Understanding an Ethereum Transaction"', url: 'https://info.etherscan.com/understanding-an-ethereum-transaction/', consultadoEm: '06/09/2026' },
  { titulo: 'CCN "Lost on Etherscan?"', url: 'https://www.ccn.com/education/crypto/how-to-read-etherscan-hashes-transactions-blocks/', consultadoEm: '06/09/2026' },
  { titulo: 'Solscan Docs "Transaction Details"', url: 'https://docs.solscan.io/transaction-details/transaction-details', consultadoEm: '06/09/2026' },
  { titulo: 'CoinLedger "What is Solscan?"', url: 'https://coinledger.io/learn/what-is-solscan', consultadoEm: '06/09/2026' },
  { titulo: 'Yahoo Finance "Not your keys, not your coins"', url: 'https://finance.yahoo.com/personal-finance/investing/article/self-custody-wallet-130000280.html', consultadoEm: '06/09/2026' },
  { titulo: 'Kraken Learn "Custodial vs. non-custodial wallets"', url: 'https://www.kraken.com/learn/custodial-non-custodial-crypto-wallet', consultadoEm: '06/09/2026' },
  { titulo: 'crypto.news "What is self-custody?"', url: 'https://crypto.news/what-is-self-custody-cold-wallets-versus-exchanges/', consultadoEm: '06/09/2026' },
  { titulo: 'Cube Exchange "What Is Key Derivation (BIP32/39/44)?"', url: 'https://www.cube.exchange/what-is/key-derivation-bip32-39-44', consultadoEm: '06/09/2026' },
  { titulo: 'Spark "BIP-39"', url: 'https://www.spark.money/glossary/bip-39', consultadoEm: '06/09/2026' },
  { titulo: 'SentinelOne "What Is an Infostealer?"', url: 'https://www.sentinelone.com/cybersecurity-101/cybersecurity/infostealer/', consultadoEm: '06/09/2026' },
  { titulo: 'Uniswap Labs Support "What is a Permit2 approval?"', url: 'https://support.uniswap.org/hc/en-us/articles/39683402190733-What-is-a-Permit2-approval', consultadoEm: '06/09/2026' },
  { titulo: 'GitHub Uniswap/permit2', url: 'https://github.com/Uniswap/permit2', consultadoEm: '06/09/2026' },
  { titulo: 'Revoke.cash "What Is Permit2?"', url: 'https://revoke.cash/learn/approvals/what-is-permit2', consultadoEm: '06/09/2026' },
  { titulo: 'Revoke.cash "How to Revoke Token Approvals" e FAQ', url: 'https://revoke.cash/learn/approvals/how-to-revoke-token-approvals', consultadoEm: '06/09/2026' },
  { titulo: 'Revoke.cash página inicial (sweeper bots / suporte a 100+ redes)', url: 'https://revoke.cash/', consultadoEm: '06/09/2026' },
  { titulo: 'MetaMask Help Center "What is a token approval?"', url: 'https://support.metamask.io/stay-safe/safety-in-web3/what-is-a-token-approval/', consultadoEm: '06/09/2026' },
  { titulo: 'MetaMask Help Center "What to do if you have a sweeper bot on your wallet"', url: 'https://support.metamask.io/stay-safe/protect-yourself/fighting-back-against-sweeper-bots/', consultadoEm: '06/09/2026' },
  { titulo: 'Phantom Help "Beware of sweeper bots"', url: 'https://help.phantom.com/hc/en-us/articles/40330224994067-Beware-of-sweeper-bots', consultadoEm: '06/09/2026' },
  { titulo: 'Chainalysis "Anatomy of an Address Poisoning Scam"', url: 'https://www.chainalysis.com/blog/address-poisoning-scam/', consultadoEm: '06/09/2026' },
  { titulo: 'Chainalysis "Pig butchering"', url: 'https://www.chainalysis.com/glossary/pig-butchering/', consultadoEm: '06/09/2026' },
  { titulo: 'BleepingComputer "New clipboard hijacker"', url: 'https://www.bleepingcomputer.com/news/security/new-clipboard-hijacker-replaces-crypto-wallet-addresses-with-lookalikes/', consultadoEm: '06/09/2026' },
  { titulo: 'BleepingComputer "MetaMask phishing steals cryptocurrency wallets via Google ads"', url: 'https://www.bleepingcomputer.com/news/security/metamask-phishing-steals-cryptocurrency-wallets-via-google-ads/', consultadoEm: '06/09/2026' },
  { titulo: 'Group-IB "Crypto Drainer: Wallet Drainer Guide & Prevention"', url: 'https://www.group-ib.com/resources/knowledge-hub/crypto-wallet-drainers/', consultadoEm: '06/09/2026' },
  { titulo: 'ACM IMC 2025 "A Deep Dive into Drainer-as-a-Service Phishing on Ethereum"', url: 'https://dl.acm.org/doi/10.1145/3730567.3764476', consultadoEm: '06/09/2026' },
  { titulo: 'Scam Sniffer "2024: Wallet Drainers Drain $494 Million"', url: 'https://drops.scamsniffer.io/scam-sniffer-2024-web3-phishing-attacks-wallet-drainers-drain-494-million/', consultadoEm: '06/09/2026' },
  { titulo: 'SecurityWeek "Wallet Drainer Malware Used to Steal $500 Million in 2024"', url: 'https://www.securityweek.com/wallet-drainer-malware-used-to-steal-500-million-in-cryptocurrency-in-2024/', consultadoEm: '06/09/2026' },
  { titulo: 'Scam Sniffer "2025: Crypto Phishing Losses Fall 83% to $84 Million"', url: 'https://drops.scamsniffer.io/scam-sniffer-2025-crypto-phishing-losses-fall-83-to-84-million/', consultadoEm: '06/09/2026' },
  { titulo: 'Cointelegraph "Crypto Phishing Losses Fell 83% in 2025"', url: 'https://cointelegraph.com/news/crypto-phishing-losses-fell-83-percent-2025-wallet-drainers', consultadoEm: '06/09/2026' },
  { titulo: 'EIP-1559 "Fee market change for ETH 1.0 chain"', url: 'https://eips.ethereum.org/EIPS/eip-1559', consultadoEm: '06/09/2026' },
  { titulo: 'Etherscan Gas Tracker', url: 'https://etherscan.io/gastracker', consultadoEm: '06/09/2026' },
  { titulo: 'Eco Support "What Is a Public Key in Blockchain? Addresses Explained"', url: 'https://eco.com/support/en/articles/10080473-what-is-a-public-key-in-blockchain-addresses-explained', consultadoEm: '06/09/2026' },
  { titulo: 'RareSkills "How Ethereum addresses are derived"', url: 'https://rareskills.io/post/ethereum-address-derivation', consultadoEm: '06/09/2026' },
  { titulo: 'Chainstack "How do Ethereum and Solana generate public and private keys?"', url: 'https://chainstack.com/how-do-ethereum-and-solana-generate-public-and-private-keys/', consultadoEm: '06/09/2026' },
  { titulo: 'Solana Docs "Account Structure"', url: 'https://solana.com/docs/core/accounts/account-structure', consultadoEm: '06/09/2026' },
  { titulo: 'Coldcard "How to Store Your Seed Phrase"', url: 'https://coldcard.com/learn/seed-phrases/how-to-store-seed-phrase', consultadoEm: '06/09/2026' },
  { titulo: 'Yahoo Finance "How to set up a crypto wallet"', url: 'https://finance.yahoo.com/personal-finance/investing/article/how-to-set-up-a-crypto-wallet-a-step-by-step-guide-211638698.html', consultadoEm: '06/09/2026' },
  { titulo: 'DEXTools "How to Verify a Smart Contract Onchain 2026"', url: 'https://www.dextools.io/tutorials/how-to-verify-smart-contract-onchain-etherscan-2026', consultadoEm: '06/09/2026' },
  { titulo: 'Crypto University "How To Verify A Smart Contract On Etherscan"', url: 'https://cryptouniversity.network/guides/how-to-verify-a-smart-contract-on-etherscan-a-beginners-walkthrough', consultadoEm: '06/09/2026' },
  { titulo: 'Medium/Onomy "What Is Slippage in DeFi?"', url: 'https://medium.com/onomy-protocol/what-is-slippage-in-defi-62a0d068feb3', consultadoEm: '06/09/2026' },
  { titulo: 'DEXTools "What Is Slippage in Crypto? 2026"', url: 'https://www.dextools.io/tutorials/what-is-slippage-in-crypto-guide-2026', consultadoEm: '06/09/2026' },
  { titulo: 'Solana Docs "SPL Token Basics" e "Approve Delegate"', url: 'https://solana.com/docs/tokens/basics/approve-delegate', consultadoEm: '06/09/2026' },
  { titulo: 'Blueshift "Token Accounts and Ownership"', url: 'https://learn.blueshift.gg/en/courses/tokens-on-solana/functionalities', consultadoEm: '06/09/2026' },
  { titulo: 'Receita Federal "Stablecoins já respondem por cerca de 80% do volume declarado de criptoativos no Brasil"', url: 'https://www.gov.br/receitafederal/pt-br/assuntos/noticias/2026/junho/stablecoins-ja-respondem-por-cerca-de-80-do-volume-declarado-de-criptoativos-no-brasil', consultadoEm: '06/09/2026' },
  { titulo: 'CVM Portal do Investidor "Você conhece o pig butchering scam?"', url: 'https://www.gov.br/investidor/pt-br/penso-logo-invisto/voce-conhece-o-pig-butchering-scam', consultadoEm: '06/09/2026' },
  { titulo: 'CVM Portal do Investidor "Stop Orders e Alertas ao Mercado"', url: 'https://www.gov.br/investidor/pt-br/investir/cuidados-ao-investir/stop-orders-e-alertas-ao-mercado', consultadoEm: '06/09/2026' },
  { titulo: 'CVM "Alertas ao cidadão"', url: 'https://www.gov.br/cvm/pt-br/assuntos/protecao/alertas', consultadoEm: '06/09/2026' },
  { titulo: 'CVM "CVM aplica multas de mais de R$ 55,8 milhões..."', url: 'https://www.gov.br/cvm/pt-br/assuntos/noticias/2024/cvm-aplica-multas-de-mais-de-r-55-8-milhoes-em-processo-envolvendo-operacao-fraudulenta-no-mercado-de-valores-mobiliarios', consultadoEm: '06/09/2026' },
  { titulo: 'InfoMoney "CVM multa em R$ 55,8 milhões... pirâmide cripto de R$ 7 bi"', url: 'https://www.infomoney.com.br/onde-investir/cvm-multa-em-r-558-milhoes-envolvidos-em-piramide-cripto-de-r-7-bi/', consultadoEm: '06/09/2026' },
  { titulo: 'Blocknews "Pirâmide Atlas..."', url: 'https://www.blocknews.com.br/opiniao/atlas-de-falso-robo-a-investigacao-da-pf-da-maior-piramide-de-cripto-do-brasil/', consultadoEm: '06/09/2026' },
  { titulo: 'Livecoins "CVM manda robô de criptomoedas parar de captar brasileiros" (RoboForex, Ato Declaratório CVM 20.519)', url: 'https://livecoins.com.br/cvm-manda-robo-de-criptomoedas-parar-de-captar-brasileiros/', consultadoEm: '06/09/2026' },
  { titulo: 'Conjur "CVM emite stop order sobre oferta irregular de tokens de renda fixa"', url: 'https://www.conjur.com.br/2025-mar-12/cvm-emite-stop-order-sobre-oferta-irregular-de-tokens-de-renda-fixa/', consultadoEm: '06/09/2026' },
  { titulo: 'Exame "Investigação cripto: por dentro dos grupos de Pump and Dump"', url: 'https://exame.com/future-of-money/investigacao-cripto-por-dentro-dos-grupos-de-pump-and-dump-e-golpes-com-criptomoedas/', consultadoEm: '06/09/2026' },
  { titulo: 'Chainspect "Grupo de sinais de trading no Telegram é golpe?"', url: 'https://chainspect.com.br/blog/grupos-telegram-whatsapp-sinais-golpe', consultadoEm: '06/09/2026' },
  { titulo: 'Terra "Operação Criptoabate..."', url: 'https://www.terra.com.br/noticias/brasil/cidades/operacao-da-policia-civil-do-rs-mira-grupo-criminoso-que-aplicou-golpe-vitima-perdeu-r-37-milhoes-em-falso-investimento,b12717c998ccbba4aa02f016e444d3bextro1ts2.html', consultadoEm: '06/09/2026' },
  { titulo: 'abc+ "Golpe de falsa plataforma de investimentos... R$ 30 bilhões em transações suspeitas"', url: 'https://www.abcmais.com/brasil/rio-grande-do-sul/golpe-de-falsa-plataforma-de-investimentos-causa-prejuizo-de-r-37-milhoes-a-uma-unica-vitima-e-revela-r-30-bilhoes-em-transacoes-suspeitas/', consultadoEm: '06/09/2026' },
  { titulo: 'FBI IC3 PSA I-072026 "FBI Warns of Scammers Impersonating the IC3"', url: 'https://www.ic3.gov/PSA/2026/PSA260720', consultadoEm: '06/09/2026' },
  { titulo: 'FBI IC3 PSA 2023 "Guidance for Cryptocurrency Scam Victims"', url: 'https://www.ic3.gov/PSA/2023/PSA230824', consultadoEm: '06/09/2026' },
  { titulo: 'Consulta oficial "Consultar instituições autorizadas pelo Banco Central"', url: 'https://www.gov.br/pt-br/servicos/consultar-instituicoes-autorizadas-pelo-banco-central', consultadoEm: '06/09/2026' },
  { titulo: 'Banco Central "Relação de Instituições em Funcionamento no País"', url: 'https://www.bcb.gov.br/estabilidadefinanceira/relacao_instituicoes_funcionamento', consultadoEm: '06/09/2026' },
  { titulo: 'Conjur "Enfim, as regras do Banco Central sobre ativos virtuais"', url: 'https://www.conjur.com.br/2025-nov-12/enfim-as-regras-do-banco-central-sobre-ativos-virtuais/', consultadoEm: '06/09/2026' },
  { titulo: 'Bichara e Motta "Banco Central publica regulamentação das PSAVs"', url: 'https://www.bicharaemotta.com.br/banco-central-publica-regulamentacao-das-prestadoras-de-servicos-de-ativos-virtuais-no-brasil/', consultadoEm: '06/09/2026' },
  { titulo: 'Machado Meyer "Banco Central altera regras do eFX"', url: 'https://www.machadomeyer.com.br/pt/inteligencia-juridica/publicacoes-ij/bancario-seguros-e-financeiro-ij/banco-central-altera-regras-do-efx', consultadoEm: '06/09/2026' },
  { titulo: 'CoinDesk "Brazil\x27s central bank bans stablecoin and crypto settlement in cross-border payments"', url: 'https://www.coindesk.com/policy/2026/05/02/brazil-s-central-bank-bans-stablecoin-and-crypto-settlement-in-cross-border-payments', consultadoEm: '06/09/2026' },
  { titulo: 'The Fintech Times "Binance and Pix Join Forces"', url: 'https://thefintechtimes.com/making-reais-payments-with-crypto-binance-and-pix-join-forces-to-enable-greater-payment-flexibility/', consultadoEm: '06/09/2026' },
  { titulo: 'Times Brasil/CNBC "Binance integra Pix"', url: 'https://timesbrasil.com.br/cripto-brasil/noticias-cripto/binance-integra-pix-e-permite-conversao-automatica-de-criptomoedas-em-real/', consultadoEm: '06/09/2026' },
  { titulo: 'Finsiders Brasil "Guilherme Nazar, ex-Binance, novo conselheiro do Z.ro"', url: 'https://finsidersbrasil.com.br/gente-em-fintechs/guilherme-nazar-ex-binance-e-uber-e-o-novo-conselheiro-do-z-ro/', consultadoEm: '06/09/2026' },
  { titulo: 'The Block, cobertura do relatório Scam Sniffer 2023', url: 'https://www.theblock.co/', consultadoEm: '06/09/2026' },
  { titulo: 'Solana Docs "Fees"', url: 'https://solana.com/docs/core/fees', consultadoEm: '06/09/2026' },
  { titulo: 'Solana Docs "Fee Structure"', url: 'https://solana.com/docs/core/fees/fee-structure', consultadoEm: '06/09/2026' },
  { titulo: 'BlockSec, "Drainer-as-a-Service: Inside Ethereum\x27\x27s $135M Phishing Economy"', url: 'https://blocksec.com/blog/inside-ethereum-s-shadow-economy-new-research-unmasks-the-135-m-drainer-as-a-service-industry', consultadoEm: '06/09/2026' },
  { titulo: 'Recorded Future / Insikt Group, "Rublevka Team: Anatomy of a Russian Crypto Drainer Operation" (4 fev. 2026)', url: 'https://www.recordedfuture.com/research/rublevka-team-anatomy-russian-crypto-drainer-operation', consultadoEm: '06/09/2026' },
  { titulo: 'Etherscan, "Token Approvals | Information Center"', url: 'https://info.etherscan.com/tokenapprovals/', consultadoEm: '06/09/2026' },
  { titulo: 'Uniswap, permit2 `IAllowanceTransfer.sol` (lockdown/invalidateNonces)', url: 'https://github.com/Uniswap/permit2/blob/main/src/interfaces/IAllowanceTransfer.sol', consultadoEm: '06/09/2026' },
  { titulo: 'GoPlus, "Understanding EIP-7702 Phishing Attacks"', url: 'https://blog.gopluslabs.io/2025/06/03/financing/2025-06-03-Understanding-EIP-7702-Phishing-Attacks-A-Comprehensive-Guide-to-Protection-Strategies-for-Wallets/', consultadoEm: '06/09/2026' },
  { titulo: 'Qi et al., "EIP-7702 Phishing Attack", arXiv 2512.12174 (dez. 2025)', url: 'https://arxiv.org/abs/2512.12174', consultadoEm: '06/09/2026' },
  { titulo: 'Tsuchiya, Dong, Soska, Christin (Carnegie Mellon University), "Blockchain Address Poisoning", USENIX Security Symposium 2025, arXiv 2501.16681', url: 'https://arxiv.org/abs/2501.16681', consultadoEm: '06/09/2026' },
  { titulo: 'Trust Wallet, "What is a seed phrase, and why is it important?"', url: 'https://trustwallet.com/blog/academy/what-is-a-seed-phrase-and-why-is-it-important', consultadoEm: '06/09/2026' },
  { titulo: 'Ledger Academy, "BIP-39"', url: 'https://www.ledger.com/academy/bip-39-the-low-key-guardian-of-your-crypto-freedom', consultadoEm: '06/09/2026' },
  { titulo: 'Trust Wallet, "What is an Address Poisoning Scam in Crypto?"', url: 'https://trustwallet.com/blog/security/what-is-an-address-poisoning-scam-in-crypto', consultadoEm: '06/09/2026' },
  { titulo: 'Merkle Science, "How Clipper Malware Poses a Threat to Crypto Transactions"', url: 'https://www.merklescience.com/blog/how-clipper-malware-poses-a-threat-to-crypto-transactions', consultadoEm: '06/09/2026' },
  { titulo: 'Alchemy, "What is an Associated Token Account on Solana?"', url: 'https://www.alchemy.com/overviews/associated-token-account', consultadoEm: '06/09/2026' },
  { titulo: 'Solana Docs, "Create a Token Account"', url: 'https://solana.com/docs/tokens/basics/create-token-account', consultadoEm: '06/09/2026' },
  { titulo: 'Banco Central do Brasil, apresentação "Regulamentação da prestação de serviços de ativos virtuais" (nov. 2025)', url: 'https://www.bcb.gov.br/conteudo/home-ptbr/TextosApresentacoes/AVs_mercado_cambio_%20e_capitais_coletiva1_10.11.25.pdf', consultadoEm: '06/09/2026' },
  { titulo: 'Mattos Filho, "Banco Central divulga normas para a regulamentação de ativos virtuais"', url: 'https://www.mattosfilho.com.br/unico/normas-regulamentacao-ativos-virtuais/', consultadoEm: '06/09/2026' },
  { titulo: 'Agência Brasil, "Banco Central estabelece regras para o mercado de criptoativos"', url: 'https://agenciabrasil.ebc.com.br/economia/noticia/2025-11/banco-central-estabelece-regras-para-o-mercado-de-criptoativos', consultadoEm: '06/09/2026' },
  { titulo: 'Brasil Bitcoin (blog), "Corretoras de criptomoedas que estão encerrando operações no Brasil em 2026"', url: 'https://brasilbitcoin.com.br/blog/corretoras-criptomoedas-encerrando-operacoes-brasil/', consultadoEm: '06/09/2026' },
  { titulo: 'Exame, "Exclusivo: corretora de criptomoedas Coinext encerra atividades"', url: 'https://exame.com/future-of-money/exclusivo-corretora-de-criptomoedas-coinext-encerra-atividades/', consultadoEm: '06/09/2026' },
  { titulo: 'CNN Brasil, "Binance permite Pix para pagamento em criptos; entenda"', url: 'https://www.cnnbrasil.com.br/economia/money/macroeconomia/binance-permite-pix-para-pagamento-em-criptos-entenda/', consultadoEm: '06/09/2026' },
  { titulo: 'CNN Brasil, "Criptoativos no Imposto de Renda 2026"', url: 'https://www.cnnbrasil.com.br/economia/financas/criptoativos-no-imposto-de-renda-2026-o-que-declarar-e-como-calcular/', consultadoEm: '06/09/2026' },
  { titulo: 'Ledger, "Security Incident Report" (Angel Drainer / Ledger Connect Kit, dez. 2023)', url: 'https://www.ledger.com/blog/security-incident-report', consultadoEm: '06/09/2026' },
  ],

  // ---------------------------------------------------------------------------
  // Itens não verificados (aba "Quiz", seção de rodapé)
  // ---------------------------------------------------------------------------
  // ---------------------------------------------------------------------------
  // Destaques — os números grandes que abrem cada aba
  //
  // REGRA: todo número aqui já está no texto deste módulo, com fonte em
  // `fontes`. Onde não há número pesquisado, o destaque é uma afirmação concreta.
  // ---------------------------------------------------------------------------
  destaques: {
    fundamentos: [
      {
        rotulo: 'Transações que falharam',
        valor: 'Ficam gravadas',
        nota: 'Para sempre — e cobram a taxa da rede (o gas) do mesmo jeito. Falhou, mas o custo já foi pago.',
        tom: 'alerta',
      },
      {
        rotulo: 'Partes do preço do gas',
        valor: '2',
        nota: 'Desde agosto de 2021 (EIP-1559): taxa-base, destruída pela rede, e gorjeta a quem monta o bloco. Por isso o preço varia com a demanda.',
      },
      {
        rotulo: 'Quem reverte uma transação confirmada',
        valor: 'Ninguém',
        nota: 'Nem corretora, nem suporte, nem você. Cada bloco novo em cima do seu aumenta o custo de reescrever a história.',
      },
    ],

    carteiras: [
      {
        rotulo: 'Quem guarda a chave na corretora',
        valor: 'A empresa',
        nota: 'Quando FTX, Celsius e Mt. Gox quebraram, quem deixou fundos lá perdeu o acesso. Sem a chave, você depende dela.',
        tom: 'alerta',
      },
      {
        rotulo: 'Corretoras que anunciaram saída do varejo em 2026',
        valor: '5',
        nota: 'Bitso, Coinext, NovaDAX, Digitra e Bitnuvem deixam o varejo (atender pessoa física) pelo custo da regulação. Nomes são exemplo, não recomendação.',
      },
      {
        rotulo: 'Custo de uma hot wallet',
        valor: 'Grátis',
        nota: 'Você guarda as chaves, num aparelho conectado. O preço é o risco de vírus e site falso — e a responsabilidade inteira.',
      },
    ],

    seed: [
      {
        rotulo: 'Palavras que SÃO a carteira',
        valor: '12 ou 24',
        nota: 'Quem tem a frase tem todo o dinheiro, para sempre, em qualquer dispositivo — sem precisar da sua senha nem do seu aparelho.',
      },
      {
        rotulo: 'Cópias digitais seguras da frase',
        valor: '0',
        nota: 'Foto, print, nuvem, e-mail, WhatsApp, bloco de notas — qualquer cópia digital é um ponto de vazamento. Papel ou metal, offline.',
        tom: 'alerta',
      },
      {
        rotulo: 'Quem recupera uma frase perdida',
        valor: 'Ninguém',
        nota: 'Não existe "esqueci minha senha". Perdeu as palavras e o aparelho quebrou, o dinheiro ficou inacessível para sempre.',
        tom: 'alerta',
      },
    ],

    golpes: [
      {
        rotulo: 'Roubado por drainers em 2024',
        valor: 'US$ 494 mi',
        nota: 'Esvaziam carteiras: mais de 332 mil, +67% sobre 2023. Em 2025, −83%: cerca de US$ 83,85 milhões.',
      },
      {
        rotulo: 'Fatia de quem espalha a isca',
        valor: '80%',
        nota: 'A divisão mais comum entre afiliado e operador do kit. O drainer é um negócio com franquia — e o afiliado é quem te aborda.',
        tom: 'alerta',
      },
      {
        rotulo: 'O que o drainer NÃO precisa',
        valor: 'Sua seed',
        nota: 'Ele rouba com a sua assinatura, não com a sua frase. Você aprova, sem ler, uma permissão que entrega os tokens.',
        tom: 'alerta',
      },
    ],

    defesa: [
      {
        rotulo: 'Roubos por assinatura via Permit (2024)',
        valor: '56,7%',
        nota: 'Segundo a Scam Sniffer. Aparece na carteira como um inofensivo "assinar mensagem", sem taxa — e é isso que engana.',
        tom: 'alerta',
      },
      {
        rotulo: 'Golpe novo desde maio de 2025',
        valor: 'EIP-7702',
        nota: 'Ativado na atualização Pectra do Ethereum. Casos reais: US$ 146,5 mil em 24/05/2025 e mais de US$ 1,54 mi em 24/08/2025.',
        tom: 'alerta',
      },
      {
        rotulo: 'O que revogar NÃO faz',
        valor: 'Desfazer',
        nota: 'Revogar interrompe gastos futuros. Não recupera o que já saiu, não conserta uma seed vazada, não remove malware instalado.',
      },
    ],

    brasil: [
      {
        rotulo: 'Resoluções do BC que regulam as PSAVs',
        valor: '519 · 520 · 521',
        nota: 'Publicadas em 10/11/2025, em vigor desde 02/02/2026. Corretoras já em operação têm até 30/10/2026 para pedir autorização.',
      },
      {
        rotulo: 'Prejuízo global do pig butchering (2020–2024)',
        valor: 'US$ 75 bi+',
        nota: 'Falso assessor; estimativa da CVM. Aqui, uma vítima transferiu R$ 37 milhões em seis meses (Operação Criptoabate, 13/08/2026).',
        tom: 'alerta',
      },
      {
        rotulo: 'Quem informa suas operações à Receita desde julho de 2026',
        valor: 'As plataformas',
        nota: 'DeCripto, pela IN RFB 2.291/2025. A obrigação de declarar já existia; agora a Receita recebe os dados também pelo outro lado.',
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // Anatomias — mockups desenhados com marcadores numerados
  //
  // Ilustrações esquemáticas, não capturas de nenhum site ou carteira: captura
  // seria republicação de material de terceiro, pareceria endosso, e nasceria
  // vencida. A legenda é o conteúdo; o desenho é enriquecimento.
  // ---------------------------------------------------------------------------
  // ---------------------------------------------------------------------------
  // Vídeos
  //
  // Ficam em assets/videos/, servidos pelo próprio GitHub Pages — sem YouTube,
  // sem conta de terceiro. Cada um vira um botão "Assistir a videoaula" dentro do
  // card da seção que ele reforça, logo depois da ideia central; o campo `secao`
  // diz qual. O player só aparece no clique (components/video.js).
  //
  // O vídeo NUNCA substitui a seção de texto: ele entra ao lado dela. Quem lê
  // rápido pula, quem prefere assistir assiste, e quem está sem internet ainda
  // tem o módulo inteiro — porque o vídeo fica fora do precache do service
  // worker (300 MB de precache tornaria a primeira visita insuportável).
  // ---------------------------------------------------------------------------
  // PENDENTE em todos: a `transcricao`. Todo outro visual do hub tem versão em
  // texto (diagrama tem versaoEmTexto, anatomia tem legenda). Enquanto ela não
  // existe, o player mostra o aviso padrão de `src/data/videoaulas.js`. Preencher
  // com o resumo navegável de cada aula (o segundo entregável do prompt).
  videos: {
    'o-que-e-blockchain': {
      titulo: 'A mecânica da blockchain',
      // A seção onde o botão "Assistir a videoaula" aparece (id em `secoes`).
      secao: 'o-que-e-blockchain',
      src: 'assets/videos/o-que-e-blockchain.mp4',
      duracao: '7:08',
      descricao: 'O que é uma blockchain e por que ela é chamada de "imutável".',
      transcricao: [],
    },
    'ler-uma-transacao': {
      titulo: 'Ler uma transação',
      secao: 'explorador-de-blocos',
      src: 'assets/videos/ler-uma-transacao.mp4',
      duracao: '7:50',
      descricao: 'Como ler uma transação no explorador de blocos, campo por campo.',
      transcricao: [],
    },
    'chaves-e-enderecos': {
      titulo: 'Chaves e endereços',
      secao: 'chave-publica-privada-endereco',
      src: 'assets/videos/chaves-e-enderecos.mp4',
      duracao: '5:46',
      descricao: 'Chave pública, chave privada e endereço: o que cada um faz.',
      transcricao: [],
    },
    'mecanica-do-gas': {
      titulo: 'A mecânica do gas',
      secao: 'gas-taxa-de-rede',
      src: 'assets/videos/mecanica-do-gas.mp4',
      duracao: '6:40',
      descricao:
        'Por que toda transação cobra taxa, por que ela varia de minuto a minuto, e por que ' +
        'uma transação que falha cobra do mesmo jeito.',
      transcricao: [],
    },
    'cex-x-dex': {
      titulo: 'CEX × DEX: o que muda',
      secao: 'cex-x-dex',
      src: 'assets/videos/cex-x-dex.mp4',
      duracao: '7:07',
      descricao: 'Corretora e troca on-chain: o que muda na prática para quem opera.',
      transcricao: [],
    },
    'onde-ficam-as-chaves': {
      titulo: 'CEX, hot e cold wallet',
      secao: 'onde-ficam-chaves',
      src: 'assets/videos/onde-ficam-as-chaves.mp4',
      duracao: '8:10',
      descricao: 'Onde ficam suas chaves em cada tipo de carteira, e o que isso custa.',
      transcricao: [],
    },
    'wallet-drainers': {
      titulo: 'O golpe do drainer',
      secao: 'wallet-drainers-conceito',
      src: 'assets/videos/wallet-drainers.mp4',
      duracao: '7:57',
      descricao: 'O golpe que não pede a sua frase-semente — e mesmo assim esvazia a carteira.',
      transcricao: [],
    },
    'vetores-e-address-poisoning': {
      titulo: 'Vetores e address poisoning',
      secao: 'vetores-tecnicos',
      src: 'assets/videos/vetores-e-address-poisoning.mp4',
      duracao: '8:05',
      descricao: 'Os vetores técnicos do golpe e o endereço sósia no seu histórico.',
      transcricao: [],
    },
    'plano-de-emergencia': {
      titulo: 'Plano de emergência',
      secao: 'plano-de-emergencia',
      src: 'assets/videos/plano-de-emergencia.mp4',
      duracao: '8:51',
      descricao: 'Os primeiros 10 minutos depois de descobrir que a carteira foi drenada.',
      transcricao: [],
    },
    'sacar-para-reais': {
      titulo: 'Sacar cripto no Brasil',
      secao: 'sacar-para-reais',
      src: 'assets/videos/sacar-para-reais.mp4',
      duracao: '9:11',
      descricao: 'Pix, KYC, o marco regulatório e o registro para o imposto.',
      transcricao: [],
    },
    'golpes-comuns-no-brasil': {
      titulo: 'Golpes comuns no Brasil',
      secao: 'golpes-comuns-no-brasil',
      src: 'assets/videos/golpes-comuns-no-brasil.mp4',
      duracao: '5:12',
      descricao: 'Os golpes que aparecem em português, e o que todos têm em comum.',
      transcricao: [],
    },
    'contrato-inteligente': {
      titulo: 'O que é um contrato inteligente, em linguagem de leigo',
      secao: 'o-que-e-blockchain',
      src: 'assets/videos/contrato-inteligente.mp4',
      duracao: '6:55',
      descricao: 'Um programa que roda sozinho na blockchain, e por que ler o que ele pede é defesa.',
      transcricao: [],
    },
    'criar-primeira-carteira': {
      titulo: 'Como criar sua primeira carteira, passo a passo',
      secao: 'quando-cada-carteira-faz-sentido',
      src: 'assets/videos/criar-primeira-carteira.mp4',
      duracao: '5:42',
      descricao: 'As etapas de criar uma carteira com segurança, da instalação à primeira conferência.',
      transcricao: [],
    },
    'frase-semente': {
      titulo: 'Frase-semente: por que 12 ou 24 palavras SÃO a carteira',
      secao: 'seed-e-carteira',
      src: 'assets/videos/frase-semente.mp4',
      duracao: '6:30',
      descricao: 'Quem tem as palavras tem o dinheiro — e onde guardá-las.',
      transcricao: [],
    },
    'revogar-aprovacoes': {
      titulo: 'Revogar aprovações: como fazer, e o que isso não resolve',
      secao: 'revogar-aprovacoes',
      src: 'assets/videos/revogar-aprovacoes.mp4',
      duracao: '5:46',
      descricao: 'Revogar interrompe gastos futuros. Não é um botão de desfazer.',
      transcricao: [],
    },
  },

  anatomias: {
    // A anatomia da transação vai DENTRO da seção "Explorador de blocos", no traço
    // do desenho: uma grade de painéis só com os rótulos (sem valores de mentira),
    // em 5 linhas. `linhas` diz quais painéis ficam lado a lado e a altura mínima
    // de cada linha, em px. O painel com `alerta` (Status, Value) sai em âmbar; o
    // painel que tem item na legenda ganha a borda ciano e o número do item.
    transacao: {
      titulo: 'Anatomia de uma transação no explorador',
      descricao: 'Os campos que importam para um iniciante, e o erro clássico de leitura.',
      aviso:
        'Ilustração esquemática, não é a tela de nenhuma plataforma específica. Os campos ' +
        'aparecem sem valores de propósito: o que se aprende aqui é onde olhar.',
      // O texto que só o leitor de tela ouve, nas palavras do desenho (M1
      // Desktop, `anatomia.alt`): a contagem vai por extenso. A lista dos
      // marcadores entra entre as duas partes, montada pela view a partir dos
      // rótulos. Se um painel ou um item entrar ou sair daqui, acerte os
      // números por extenso desta frase.
      alt: {
        antes: 'Ilustração esquemática de uma transação no explorador, com nove campos e seis marcadores:',
        depois: 'Os campos aparecem sem valores.',
      },
      paineis: [
        { id: 'hash', rotulo: 'Transaction Hash — 0x… (66 caracteres)' },
        { id: 'status', rotulo: 'Status', alerta: true },
        { id: 'bloco', rotulo: 'Block + confirmações' },
        { id: 'timestamp', rotulo: 'Timestamp (UTC)' },
        { id: 'de', rotulo: 'From — quem enviou' },
        { id: 'para', rotulo: 'To — quem recebeu (ou "Contract")' },
        { id: 'value', rotulo: 'Value — moeda nativa', alerta: true },
        { id: 'fee', rotulo: 'Transaction Fee / Gas' },
        { id: 'tokens', rotulo: 'Aba Token Transfers — o que de fato se moveu' },
      ],
      linhas: [
        { paineis: ['hash'], altura: 40 },
        { paineis: ['status', 'bloco', 'timestamp'], altura: 58 },
        { paineis: ['de', 'para'], altura: 50 },
        { paineis: ['value', 'fee'], altura: 50 },
        { paineis: ['tokens'], altura: 40 },
      ],
      itens: [
        {
          painel: 'hash',
          titulo: 'O identificador único.',
          texto: 'Cole no explorador para achar a transação. Na Ethereum e similares começa com "0x"; na Solana, é a Signature.',
        },
        {
          painel: 'status',
          titulo: 'Success ou Failed.',
          texto: 'Verde deu certo, vermelho falhou — e, mesmo falhando, você pagou a taxa (o gas).',
        },
        {
          painel: 'para',
          titulo: '"To" pode ser um contrato.',
          texto: 'Em transferência de token, o "To" costuma ser o contrato do token, não uma pessoa. A palavra "Contract" no lugar de um endereço comum denuncia isso.',
        },
        {
          painel: 'value',
          titulo: 'Value 0 não significa "nada aconteceu".',
          texto: 'O erro clássico de iniciante. Numa transferência de token, o Value (moeda nativa) pode ser zero enquanto tokens se moveram — olhe a aba de baixo.',
        },
        {
          painel: 'tokens',
          titulo: 'Onde o movimento de verdade aparece.',
          texto: 'A aba Token Transfers (ou Balance Changes, no Solscan) mostra o que de fato saiu e entrou de cada carteira.',
        },
        {
          painel: 'bloco',
          titulo: 'Confirmações.',
          texto: 'Quantos blocos já foram empilhados em cima do seu. Cada um aumenta o custo de reescrever a história — é o que torna a transação imutável.',
        },
      ],
      nota: 'Layout genérico inspirado em Etherscan e Solscan; muda o nome dos campos, não a lógica. Confira sempre a URL do explorador (etherscan.io, solscan.io) — existem sites falsos.',
    },
  },

  // ---------------------------------------------------------------------------
  // Linha do tempo (aba Brasil): marcos regulatórios, golpes emblemáticos e os
  // prazos que ainda estão correndo. Todas as datas vêm do texto deste módulo.
  // ---------------------------------------------------------------------------
  linhaDoTempoRegulacao: {
    titulo: 'Cripto no Brasil: a cronologia que importa',
    descricao: 'Marcos regulatórios, golpes emblemáticos e os prazos ainda em aberto — tudo com data.',
    marcos: [
      { data: '13/08/2019', titulo: 'CVM proíbe a Atlas Quantum de ofertar o "robô"', texto: 'Deliberação CVM nº 826. O caso emblemático do falso robô de arbitragem no Brasil.', tom: 'alerta' },
      { data: '2023', titulo: 'Lei 14.754/2023, a "Lei das Offshores"', texto: 'Regras próprias para operações no exterior.' },
      { data: '21/05/2024', titulo: 'CVM multa a Atlas Quantum em mais de R$ 55,8 milhões', texto: 'Por operação fraudulenta e embaraço à fiscalização.', tom: 'alerta' },
      { data: '20/05/2025', titulo: 'Binance Pay integrado ao Pix via Z.ro Bank', texto: 'Se o arranjo continua idêntico em setembro de 2026: não verificado.', tom: 'atencao' },
      { data: '06/10/2025', titulo: 'CVM alerta para o pig butchering', texto: 'Prejuízo global estimado em mais de US$ 75 bilhões entre 2020 e 2024.', tom: 'alerta' },
      { data: '10/11/2025', titulo: 'BC publica as Resoluções 519, 520 e 521', texto: 'O marco regulatório das PSAVs — corretoras, intermediárias e custodiantes.' },
      { data: '02/02/2026', titulo: 'As Resoluções entram em vigor', texto: 'Prevenção à lavagem, governança, segurança e segregação de recursos de clientes passam a valer para cripto.' },
      { data: '30/04/2026', titulo: 'Resolução BCB 561', texto: 'Veda stablecoins como liquidação em câmbio eletrônico (eFX). Não proíbe comprar, vender nem guardar.', tom: 'atencao' },
      { data: '07/2026', titulo: 'DeCripto passa a valer', texto: 'IN RFB 2.291/2025: as plataformas informam operações à Receita, no padrão CARF da OCDE.' },
      { data: '13/08/2026', titulo: 'Operação Criptoabate', texto: 'Polícia Civil do RS. Uma vítima transferiu R$ 37 milhões em seis meses a um falso "professor" de WhatsApp.', tom: 'alerta' },
      { data: '03/09/2026', titulo: 'Coinext anuncia o fim das atividades', texto: 'Uma das cinco corretoras que deixaram o varejo em 2026 citando o custo da adequação.', tom: 'atencao' },
      { data: '01/10/2026', titulo: 'Resolução 561 entra em vigor', tom: 'atencao' },
      { data: '30/10/2026', titulo: 'Prazo para as PSAVs pedirem autorização', texto: 'Quem já operava precisa ter pedido até aqui. Qualquer lista de "quem opera" envelhece rápido — confira no BC.', tom: 'atencao' },
    ],
    nota: 'Datas conforme o texto deste módulo e suas fontes. Regulação muda: confira no Banco Central e na CVM antes de tomar qualquer decisão baseada nela.',
    // O que cada cor de ponto quer dizer (a legenda embaixo da linha, como no desenho).
    legenda: {
      neutro: 'marco regulatório',
      alerta: 'golpe ou alerta',
      atencao: 'prazo em aberto ou não verificado',
    },
  },

  naoVerificado: [
    {
      titulo: 'Continuidade do arranjo Binance + Z.ro Bank (Pix) em setembro de 2026',
      texto:
        'O lançamento foi confirmado em 20 de maio de 2025, mas não há fonte de 2026 ' +
        'que confirme se o Z.ro Bank segue operacionalizando o serviço — a empresa ' +
        'migrou para um modelo B2B e encerrou contas de pessoa física em abril de 2026. ' +
        'Trate como plausível, mas não confirmado, e confira a Central de Ajuda da ' +
        'Binance antes de contar com isso.',
    },
    {
      titulo: 'Prejuízo e número de vítimas da Atlas Quantum',
      texto:
        'As fontes de imprensa divergem bastante — de cerca de R$ 1,1 bilhão e 47 mil ' +
        'investidores até cerca de R$ 7 bilhões e 200 mil vítimas. Não há um número ' +
        'oficial único consolidado; o único valor confirmado em fonte primária é o das ' +
        'multas aplicadas pela CVM (mais de R$ 55,8 milhões, julgamento de 21/05/2024).',
    },
    {
      titulo: 'Lista oficial consolidada de PSAVs autorizadas pelo Banco Central',
      texto:
        'Como o regime de autorização das PSAVs só entrou em vigor em 02/02/2026, não ' +
        'existe ainda uma página estática com a relação completa de autorizadas — a ' +
        'consulta cabível é a de instituições autorizadas a funcionar no site do Banco ' +
        'Central. Recomenda-se checar diretamente lá antes de usar qualquer corretora.',
    },
    {
      titulo: 'Perdas de drainers em 2023 (US$ 295,5 milhões / 324.000 vítimas)',
      texto:
        'O número foi reportado pela Scam Sniffer e repercutido pela imprensa (The ' +
        'Block), mas não foi possível abrir o relatório anual original de 2023 para ' +
        'confirmação direta na fonte primária.',
    },
  ],
};
