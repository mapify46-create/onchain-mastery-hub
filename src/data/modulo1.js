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
    'Este módulo ensina, do zero, como a blockchain funciona e por que ela é "imutável", ' +
    'como ler uma transação num explorador de blocos, o que são chave privada, chave ' +
    'pública, gas e contrato inteligente, e a diferença entre corretora (CEX) e troca ' +
    'on-chain (DEX). Aprofunda a segurança: onde guardar cripto, por que a frase-semente ' +
    'É a sua carteira, como funcionam os golpes de esvaziamento de carteira (wallet ' +
    'drainers), como revogar aprovações clique a clique e o que fazer nos primeiros ' +
    'minutos se você descobrir que foi drenado. Por fim, cobre os golpes mais comuns no ' +
    'Brasil e como sacar para reais dentro do cenário regulatório atual.',

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
        'Ninguém consegue apagar o seu saldo. E ninguém consegue devolver o seu erro. As duas ' +
        'coisas saem exatamente da mesma regra.',
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
        'Uma blockchain é um caderno de registros que muita gente copia ao mesmo tempo. No ' +
          'banco, uma empresa guarda sozinha a lista de quem tem o quê, e essa lista é a ' +
          'verdade. Numa blockchain, milhares de computadores espalhados pelo mundo guardam ' +
          'cópias idênticas da mesma lista, e a verdade é aquilo em que as cópias concordam. ' +
          'Cada página desse caderno se chama bloco. Cada bloco carrega o hash do bloco ' +
          'anterior — hash é uma impressão digital, um código curto que resume todo o conteúdo ' +
          'de um bloco e muda por inteiro se qualquer detalhe lá dentro mudar.',
        'É esse detalhe que fecha a porta. Mexer numa vírgula de um bloco antigo muda o hash ' +
          'dele, o que quebra a ligação com o bloco seguinte, que quebra a ligação com o ' +
          'próximo, e assim por diante. Para esconder uma transação do passado, alguém teria ' +
          'de refazer aquele bloco e todos os que vieram depois, em todas as cópias, ao mesmo ' +
          'tempo. É isso que a palavra "imutável" quer dizer aqui: não é que seja proibido ' +
          'mudar, é que sai caro demais.',
        'Isso importa para você por causa do segundo lado. O lado bom: nenhuma empresa ' +
          'congela, apaga ou "corrige" o seu saldo por conta própria, porque nenhuma empresa é ' +
          'dona da lista. O lado ruim: se você digitou o endereço errado, ou assinou um golpe, ' +
          'o dinheiro se foi. Não existe estorno, não existe contestação de cartão, não existe ' +
          'falar com o gerente. A irreversibilidade não distingue acerto de erro — e uma ' +
          'transação que deu errado também fica gravada para sempre.',
        'Na tela, tudo isso aparece numa palavra só: confirmações. Quando você envia algo, a ' +
          'carteira mostra "pendente" por alguns segundos, porque a transação ainda não entrou ' +
          'em nenhum bloco. Depois ela entra, e daí em diante o explorador e a corretora ' +
          'passam a contar quantos blocos já foram fechados em cima do seu. O número só cresce, ' +
          'e cada unidade a mais é mais um bloco que um atacante teria de refazer.',
      ],
      exemplo: {
        titulo: 'A mesma transação, minuto a minuto',
        passos: [
          'Ela entra num bloco: 1 confirmação. Já está na corrente, e o saldo já mudou.',
          'A rede fecha os blocos seguintes em cima dele: 2, 3, 4… Cada bloco fechado soma uma confirmação.',
          'Com 12, 30 ou mais, reverter deixa de ser difícil e passa a ser impossível na prática: seria preciso reescrever todos ao mesmo tempo, em todas as cópias.',
          'É por isso que a corretora não libera o seu depósito no instante em que ele chega: ela espera o número mínimo de confirmações que ela mesma definiu e só então credita.',
        ],
      },
      paragrafosFinais: [
        'O erro que essa ideia evita é o de operar como se houvesse um socorro depois. No ' +
          'cartão você contesta; no Pix existe um caminho para pedir devolução. Aqui não existe ' +
          'nenhum dos dois. A hora de conferir é sempre antes de apertar o botão, porque depois ' +
          'a única coisa que a blockchain oferece é a prova detalhada de que aconteceu.',
      ],
      detalhe: {
        titulo: 'bloco, hash e rede',
        lista: [
          'Bloco: uma "página" do caderno, com várias transações.',
          'Hash: a impressão digital que resume um bloco e o liga ao anterior.',
          'Rede: os milhares de computadores que guardam cópias iguais.',
          'Você não precisa de permissão nem de conta para "ler" a blockchain. É essa ' +
            'transparência que permite auditar golpes e revisar permissões.',
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
        'Um explorador de blocos é um site que lê a blockchain e mostra o conteúdo dela numa ' +
          'página. Ele só mostra. Não guarda suas chaves, não faz trocas, não pede senha e não ' +
          'consegue mexer no seu dinheiro — você pode abrir o endereço de qualquer pessoa sem ' +
          'permissão nenhuma, porque a lista é pública. Cada rede tem o seu: Solscan para a ' +
          'Solana, Etherscan para a Ethereum, BscScan para a BNB Chain e Basescan para a Base.',
        'Isso importa porque o explorador é o único lugar onde ninguém está tentando te vender ' +
          'nada. A tela da carteira e a tela do site que você usou mostram o que os programas ' +
          'deles dizem; o explorador mostra o que ficou registrado. Quando as duas versões ' +
          'discordam, quem ganha é o explorador.',
        'As três respostas ficam em três campos fixos, os mesmos da ilustração acima. "Deu ' +
          'certo?" está no campo Status: Success quer dizer que executou, Failed quer dizer ' +
          'que falhou. "Quanto custou?" está no campo Transaction Fee (ou Gas): é a taxa que a ' +
          'rede cobrou, e ela é cobrada mesmo quando o Status é Failed. "O que se moveu?" quase ' +
          'nunca está na primeira tela — está na aba Token Transfers, mais abaixo.',
        'Confira sempre a URL antes de colar qualquer coisa. Existem cópias falsas de ' +
          'explorador, feitas para você digitar ali algo que não deveria. Um explorador ' +
          'legítimo nunca pede a sua frase-semente, nunca pede senha e nunca pede para conectar ' +
          'a carteira só para ver uma transação.',
      ],
      exemplo: {
        titulo: 'A transação que "não fez nada"',
        passos: [
          'Você troca um token, abre a transação no explorador e o campo Value mostra 0 ETH.',
          'O primeiro impulso é achar que deu errado e refazer a operação.',
          'Mas Value só conta a moeda nativa da rede — o ETH. Numa troca de tokens, ela pode ser zero mesmo quando tudo deu certo.',
          'Desça até a aba Token Transfers: é ali que aparece o que de fato saiu e o que de fato entrou na sua carteira.',
          'Só depois olhe o Status. Success com Value 0 e Token Transfers preenchido é uma operação normal, não um erro.',
        ],
      },
      paragrafosFinais: [
        'O erro comum que essa leitura evita é o mais caro do módulo: refazer uma operação que ' +
          'já tinha dado certo, pagando taxa duas vezes e, pior, pensando que foi roubado ' +
          'quando não foi. Saber ler essa página é o que separa "sumiu meu dinheiro" de ' +
          '"entendi exatamente o que aconteceu com ele".',
      ],
      detalhe: {
        titulo: 'os outros campos, e como é no Solscan',
        lista: [
          'Transaction Hash: identificador único de 66 caracteres, começando com "0x". ' +
            'Block: em qual bloco entrou, mais o número de confirmações. Timestamp: data e ' +
            'hora em UTC.',
          'Logs: a aba de eventos. O erro comum de iniciante é ver "Value: 0 ETH" e não abrir ' +
            '"Token Transfers", onde os tokens aparecem.',
          'No Solscan a lógica é a mesma: Signature é o identificador, há Block/Slot, ' +
            'Timestamp, Result (Success/Failed), Signer (quem iniciou e pagou), Fee (em SOL, ' +
            'frações de centavo), Main Actions e Balance Changes (saldo antes e depois).',
        ],
      },
    },
    {
      id: 'gas-taxa-de-rede',
      aba: 'fundamentos',
      titulo: 'Gas: toda ação paga uma taxa, mesmo quando dá errado',
      emUmaFrase:
        'A rede não cobra pelo resultado. Ela cobra pelo trabalho — e o trabalho existe mesmo ' +
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
        'Gas é a medida de quanto trabalho de computador a sua transação exige da rede. Mandar ' +
          'uma moeda de uma carteira para outra dá pouco trabalho; usar um programa complicado ' +
          'dá muito mais. A conta final é simples: quanto trabalho a sua transação usou, vezes ' +
          'o preço de cada unidade de trabalho naquele momento. Esse preço não é fixo — ele ' +
          'sobe quando muita gente quer usar a rede ao mesmo tempo, como uma corrida de ' +
          'aplicativo em horário de pico.',
        'Quem executa esse trabalho são os validadores: os computadores que montam os blocos e ' +
          'mantêm as cópias da lista. Parte do que você paga vai para eles, como uma gorjeta ' +
          'por ter colocado a sua transação num bloco. Outra parte é queimada, que é o nome ' +
          'que se dá a destruir moedas de propósito: elas saem de circulação e não vão para ' +
          'ninguém. O que interessa para você é que as duas partes saem do seu bolso.',
        'A parte que pega iniciante é o cartão vermelho ali em cima. Se a sua transação falhar ' +
          '— porque o preço mudou no meio do caminho, porque o limite que você deu era baixo ' +
          'demais, porque o contrato rejeitou — a rede já fez o trabalho até o ponto do erro, e ' +
          'esse trabalho é cobrado. Você paga e não leva nada. Vale na EVM (a família de redes ' +
          'compatíveis com a Ethereum, que inclui a BNB Chain e a Base) e vale na Solana.',
        'Na tela, o gas aparece duas vezes. Antes, na janela da carteira, como "taxa estimada ' +
          'de rede": é uma estimativa, e por isso o valor final pode sair diferente. Depois, no ' +
          'explorador, como Transaction Fee: esse é o valor real, e é o que você paga. Na ' +
          'Solana a taxa base é fixa: 5.000 lamports por assinatura (0,000005 SOL), mais uma ' +
          'gorjeta opcional. Lamport é só o nome da menor fração do SOL, como o centavo é do real.',
      ],
      exemplo: {
        titulo: 'Duas transações, duas taxas',
        passos: [
          'Você manda ETH para outra pessoa. Essa operação usa 21.000 unidades de gas — é a mais simples que existe na Ethereum.',
          'Status: Success. Você paga a taxa e o dinheiro chega.',
          'Na segunda tentativa, agora uma troca, algo dá errado no meio e o Status volta Failed.',
          'O campo Transaction Fee continua preenchido: a rede trabalhou até o ponto do erro e cobrou por isso.',
          'Nada mudou no seu saldo de tokens. Só a taxa saiu.',
        ],
      },
      paragrafosFinais: [
        'O erro que essa ideia evita é apertar "tentar de novo" cinco vezes seguidas numa ' +
          'transação que insiste em falhar. Cada tentativa é uma taxa a mais, e cinco falhas ' +
          'custam cinco taxas sem produzir nada. Quando uma transação falha duas vezes, o certo ' +
          'é parar e descobrir o motivo no explorador, não repetir mais rápido.',
      ],
      detalhe: {
        titulo: 'EIP-1559, base fee, max fee e as redes L2',
        paragrafos: [
          'Desde a EIP-1559 (agosto de 2021), o preço do gas na Ethereum tem dois componentes: ' +
            'a base fee, calculada pela rede conforme o congestionamento e queimada, e a ' +
            'priority fee, opcional, que vai para o validador. O max fee é o teto que você ' +
            'aceita pagar; o que sobrar é devolvido. Base é uma L2 construída em cima da ' +
            'Ethereum; a BNB Chain é uma rede alternativa. Mandar ETH para outra pessoa usa ' +
            '21.000 unidades de gas.',
        ],
      },
    },
    {
      id: 'cex-x-dex',
      aba: 'fundamentos',
      titulo: 'Corretora (CEX) × troca on-chain (DEX): quem guarda a chave',
      emUmaFrase:
        'A diferença entre as duas não é o visual nem a taxa. É quem fica com a sua chave — e ' +
        'quem atende o telefone quando dá errado.',
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
        'CEX quer dizer corretora centralizada: uma empresa, com CNPJ, que guarda o dinheiro ' +
          'dos clientes e registra internamente quanto é de cada um. DEX quer dizer troca ' +
          'descentralizada: não é uma empresa, é um programa publicado na blockchain, que ' +
          'ninguém atende e ninguém opera no dia a dia. A tabela acima compara as duas, e a ' +
          'linha que decide tudo é a primeira: quem guarda o dinheiro.',
        'Três palavras da tabela precisam de tradução. KYC é a sigla inglesa de "conheça o seu ' +
          'cliente": é o cadastro com documento, selfie e comprovante que a corretora é ' +
          'obrigada a fazer — o mesmo ritual de abrir conta em banco. Livro de ofertas (order ' +
          'book) é a lista de quem quer comprar e de quem quer vender, com os preços de cada ' +
          'um; o negócio fecha quando duas pontas se encontram. Pool de liquidez é um ' +
          'reservatório com duas moedas dentro, depositadas por outras pessoas, de onde você ' +
          'tira uma e no qual você deixa a outra.',
        'Numa DEX não existe alguém do outro lado da sua ordem. Existe um AMM — "criador de ' +
          'mercado automático", em português —, que é a fórmula que calcula o preço olhando ' +
          'apenas a proporção entre as duas moedas do pool. Quanto mais de uma moeda você ' +
          'tira, mais cara ela fica para você mesmo, dentro da sua própria ordem. Essa ' +
          'diferença entre o preço que a tela mostrava e o que você de fato recebeu chama-se ' +
          'slippage (escorregamento).',
        'Isso importa porque quase todo token novo e toda memecoin só existem em DEX: criar um ' +
          'pool não exige autorização de ninguém, não passa por análise e não tem porta de ' +
          'entrada. É liberdade e é desamparo ao mesmo tempo. Na CEX existe suporte, e às vezes ' +
          'a empresa até desfaz um erro internamente, porque o registro dela é interno. Na DEX ' +
          'não há suporte, não há reversão e não há a quem recorrer: o que você assinou, valeu.',
      ],
      exemplo: {
        titulo: 'O mesmo token, dois caminhos',
        passos: [
          'Na CEX: você faz o cadastro (KYC), manda reais por Pix, compra, e o saldo aparece na conta da empresa — as chaves são dela.',
          'Se você esquecer a senha, recupera por e-mail. Se errar um envio, existe alguém para abrir um chamado.',
          'Na DEX: você conecta a sua carteira, escolhe o token e assina. Não há cadastro, não há senha para recuperar, não há chamado.',
          'O preço que você paga sai da proporção do pool na hora — o cálculo está em "Para ir mais fundo", com um pool inventado.',
          'A diferença aparece no dia ruim, não no dia bom: nos dois lugares comprar é fácil; num deles, errar tem conserto.',
        ],
      },
      paragrafosFinais: [
        'O erro que essa distinção evita é procurar suporte onde não existe suporte. Muita ' +
          'gente perde horas escrevendo para um "atendimento" depois de um erro numa DEX — e ' +
          'quem responde é o golpista, que monitora justamente essas mensagens. Se a operação ' +
          'foi on-chain, não há ninguém para chamar: o próximo passo é o explorador, não o chat.',
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
            'slippage. Quanto menor o pool e maior a sua ordem, pior.',
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
        'São três coisas com nomes parecidos e funções opostas. Trocar uma pela outra é o ' +
        'jeito mais rápido de entregar a carteira sem perceber.',
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
        'Em cripto não existe uma senha só, do tipo que você cria e o site guarda. Existe um ' +
          'par de números ligados por matemática, mais um endereço que nasce desse par. A ' +
          'chave privada é um número secreto sorteado ao acaso na hora em que a carteira é ' +
          'criada. A chave pública é calculada a partir dela. O endereço é calculado a partir ' +
          'da chave pública. O diagrama acima mostra essa fila, e as setas são todas de mão ' +
          'única: dá para ir para a frente, nunca para trás.',
        '"Assinar" é o verbo que aparece o tempo todo daqui em diante, então vale fixar o que ' +
          'ele significa. Assinar é usar a chave privada para produzir uma prova matemática de ' +
          'que aquela ordem partiu de você. A rede confere essa prova com a chave pública e ' +
          'aceita a transação — sem nunca ver a chave privada. Por isso a assinatura é tudo: ' +
          'quem consegue assinar no seu lugar é, para a rede, você.',
        'Na prática, a divisão é simples. O endereço serve para receber, e pode ser colado num ' +
          'grupo, mandado por mensagem, impresso num QR Code — é como o número da conta que ' +
          'você passa para alguém te mandar um Pix. A chave privada serve para gastar, e nunca ' +
          'sai do aparelho: nenhuma tela legítima pede que você a digite. Se algo pede a chave ' +
          'privada, a resposta é não, sem exceção e sem discussão.',
        'A mão única é a razão de você poder divulgar o endereço sem medo. Saber o seu endereço ' +
          'permite a qualquer pessoa ver o seu saldo e o seu histórico, porque a lista é ' +
          'pública — mas não permite a ninguém descobrir a sua chave, nem gastar um centavo. ' +
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
        'O erro comum que isso evita é o do "me manda sua chave para eu te enviar o token". ' +
          'Quem quer te pagar precisa apenas do endereço. Qualquer pedido que vá além disso — ' +
          'chave privada, frase-semente, print da tela de backup — não é um pedido de ' +
          'pagamento, é um pedido de posse.',
      ],
      detalhe: {
        titulo: 'bytes, curvas e o formato em cada rede',
        lista: [
          'A chave privada tem 32 bytes (256 bits de aleatoriedade). Da privada à pública: ' +
            'curva secp256k1 na EVM, Ed25519 na Solana.',
          'Na EVM, o endereço são os últimos 20 bytes do hash Keccak-256 da chave pública: 42 ' +
            'caracteres começando com "0x". É um resumo da chave pública, não ela mesma.',
          'Na Solana, a chave pública de 32 bytes é o próprio endereço, escrita em base58 (32 ' +
            'a 44 letras e números). Por isso chamar endereço de "chave pública" está certo na ' +
            'Solana e não na Ethereum.',
        ],
      },
    },
    {
      id: 'onde-ficam-chaves',
      aba: 'carteiras',
      titulo: 'Onde ficam suas chaves: CEX, hot wallet e cold wallet',
      emUmaFrase:
        'Existem três lugares onde a sua chave pode estar, e a diferença entre eles não é ' +
        'conforto nem preço: é quem consegue gastar o seu dinheiro sem te pedir licença.',
      // O visual é a tabela modulo1.tabelaCarteiras (mais abaixo neste arquivo).
      paragrafos: [
        'Comece desfazendo uma imagem errada: as suas moedas não ficam "dentro" da carteira, ' +
          'como dinheiro dentro de um envelope. Elas ficam registradas na blockchain, na lista ' +
          'pública que todo mundo copia. O que você possui de fato é a chave privada que ' +
          'autoriza mover aquele saldo. Daí o ditado em inglês "not your keys, not your coins" ' +
          '— se as chaves não são suas, as moedas não são suas.',
        'A tabela acima compara as três categorias, e a linha decisiva é a primeira. Na CEX, a ' +
          'corretora guarda as chaves por você: isso se chama custódia, e é o mesmo arranjo do ' +
          'banco. Na hot wallet, ou carteira quente, você guarda as suas chaves, mas num ' +
          'aparelho ligado à internet — celular ou navegador. Na cold wallet, ou carteira fria, ' +
          'você guarda as chaves num aparelho físico que nunca se conecta.',
        'Isso importa porque cada categoria falha de um jeito diferente, e conhecer a falha ' +
          'certa muda o que você faz. Na CEX, o perigo não é o golpista: é a própria empresa ' +
          'quebrar, ser bloqueada ou bloquear a sua conta. Isso tem nome — risco de contraparte ' +
          '— e é o risco de depender de alguém que pode sumir. Na carteira quente, o perigo é o ' +
          'que entra pelo aparelho: um site falso, um vírus, uma assinatura errada. Na carteira ' +
          'fria, o perigo passa a ser quase todo humano: perder o papel, ou digitar a frase ' +
          'onde não devia.',
        'Na prática, a pergunta que separa as três é uma só: "se eu quiser tirar o dinheiro ' +
          'agora, de madrugada, preciso da autorização de alguém?". Na CEX, precisa — a empresa ' +
          'pode estar em manutenção, pedir mais documentos ou suspender saques. Nas outras ' +
          'duas, não: a sua chave assina e pronto. Essa é a liberdade, e é também a ausência de ' +
          'rede de proteção.',
      ],
      exemplo: {
        titulo: 'O celular caiu na piscina',
        passos: [
          'Se o dinheiro estava na CEX: você instala o app em outro aparelho, faz login e o saldo está lá. A empresa guardava tudo.',
          'Se estava numa carteira quente e você anotou a frase-semente: instala a carteira no aparelho novo, importa a frase, e o saldo reaparece.',
          'Se estava numa carteira quente e você NÃO anotou a frase: acabou. Não há suporte, não há e-mail de recuperação, não há segunda via.',
          'Se estava numa carteira fria: o celular molhado não tinha as chaves, então nada aconteceu.',
        ],
      },
      paragrafosFinais: [
        'O erro comum que essa ideia evita é confiar a categoria errada ao dinheiro errado — ' +
          'deixar tudo o que se tem numa corretora e descobrir tarde que a empresa não está ' +
          'mais lá, ou deixar tudo numa carteira quente que se usa para clicar em site novo ' +
          'todo dia. Antes de escolher a ferramenta, a pergunta é qual falha você consegue ' +
          'suportar.',
      ],
      detalhe: {
        titulo: 'exemplos de cada categoria e o risco de contraparte',
        lista: [
          'CEX: Binance e Mercado Bitcoin, só como exemplos da categoria. A CEX faz o KYC. O ' +
            'risco de contraparte apareceu nos colapsos da FTX, Celsius e Mt. Gox.',
          'Hot wallet: Phantom (Solana) e MetaMask (EVM), só como exemplos. A entropia é ' +
            'gerada pelo próprio dispositivo.',
          'Cold wallet: aparelhos da Ledger e de outros fabricantes. Protegem a chave, mas não ' +
            'protegem você de digitar a seed num site de golpe. Em dezembro de 2023, a ' +
            'biblioteca Ledger Connect Kit foi comprometida num ataque de cadeia de ' +
            'suprimentos.',
        ],
      },
    },
    {
      id: 'quando-cada-carteira-faz-sentido',
      aba: 'carteiras',
      titulo: 'Em que situação cada carteira faz sentido',
      emUmaFrase:
        'A pergunta certa não é "qual é a mais segura". É "para que serve esta aqui" — porque ' +
        'a mesma carteira que protege é a que atrapalha.',
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
        'Não existe "a melhor" carteira, existe a certa para cada uso, e a árvore acima mostra ' +
          'os três usos que cobrem quase tudo. Entrar e sair em reais é trabalho de corretora: ' +
          'é ela que fala com o Pix, faz o cadastro e converte. Operar on-chain é trabalho de ' +
          'carteira quente: é ela que conecta nos sites e assina. Guardar por muito tempo é ' +
          'trabalho de carteira fria: é ela que mantém as chaves longe da internet.',
        'Isso importa porque a maioria dos prejuízos de iniciante não vem de escolher uma ' +
          'carteira ruim — vem de usar uma só para tudo. A mesma carteira que você conecta em ' +
          'dez sites por semana não deveria ser a que guarda o que você não pode perder, ' +
          'porque basta uma assinatura errada em qualquer um desses dez sites para alcançar ' +
          'todo o saldo que estiver ali dentro.',
        'Daí as duas regras práticas que muita gente adota. A primeira: não deixar na corretora ' +
          'mais do que se está disposto a perder num eventual bloqueio ou incidente, porque ' +
          'ali as chaves não são suas. A segunda: manter uma carteira quente só para operar, ' +
          'com pouco saldo, separada da carteira onde está o grosso do patrimônio. Nenhuma das ' +
          'duas é recomendação de investimento — é arrumação de risco.',
        'Na prática, as três convivem, e o dinheiro anda entre elas numa direção só na maior ' +
          'parte do tempo: entra pela corretora, passa pela carteira quente quando vai ser ' +
          'usado, e o que sobrar e não for mexido tão cedo vai para a fria. Quem está ' +
          'começando quase sempre começa só com a primeira, e isso está certo: a carteira fria ' +
          'faz sentido quando já existe algo para guardar.',
      ],
      exemplo: {
        titulo: 'Três carteiras, três papéis, um mês comum',
        passos: [
          'Corretora: você deposita reais por Pix e compra. É a porta de entrada e a porta de saída.',
          'Carteira quente: você envia dali só o que vai usar na semana, e é essa que você conecta nos sites.',
          'Carteira fria: recebe o que você decidiu não mexer. Ela quase nunca assina nada.',
          'Se a carteira quente for comprometida, o prejuízo é o saldo da semana — não o de tudo.',
          'É essa separação, e não a marca do aparelho, que limita o tamanho do estrago.',
        ],
      },
      paragrafosFinais: [
        'O erro comum que isso evita é o inverso do esperado: não é usar a carteira "insegura", ' +
          'é concentrar. Uma carteira quente com pouco saldo é uma ferramenta de trabalho ' +
          'normal; a mesma carteira com tudo dentro é uma aposta diária. O passo a passo para ' +
          'criar a sua primeira carteira, em sete etapas, está em "Para ir mais fundo".',
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
        'Quando você cria uma carteira, o aplicativo sorteia um número secreto e te mostra ' +
          'esse número escrito como uma lista de palavras comuns, na ordem. É a frase-semente ' +
          '(em inglês, seed phrase). Ela não é uma cópia de segurança de algo guardado em ' +
          'outro lugar: ela é a origem. Da frase nascem a chave privada, o endereço, e todas ' +
          'as contas que você criar depois.',
        'Isso muda o que "perder a carteira" significa. Perder o celular não é perder o ' +
          'dinheiro: você compra outro aparelho, escolhe "importar carteira", digita as mesmas ' +
          'palavras na mesma ordem, e os saldos reaparecem — porque eles nunca estiveram no ' +
          'celular. Estavam na blockchain, e as palavras só provam que são seus. Perder as ' +
          'palavras, esse sim é perder o dinheiro.',
        'Na tela isso aparece uma vez só. Logo depois de "criar nova carteira", o aplicativo ' +
          'mostra as palavras numeradas e, em seguida, pede algumas de volta: "qual é a ' +
          'palavra 9?". Essa conferência não é burocracia. É a única vez em que o aplicativo ' +
          'checa se você realmente anotou.',
      ],
      exemplo: {
        titulo: 'O erro que parece cuidado',
        passos: [
          'Você desconfia que sua carteira foi comprometida e cria uma "Conta 2" dentro do mesmo aplicativo.',
          'A Conta 2 tem endereço novo e parece limpa.',
          'Mas ela nasceu das mesmas palavras: é outro galho da mesma árvore.',
          'Se a frase vazou, quem tem a frase abre a Conta 2 junto com a Conta 1. Carteira nova de verdade exige frase nova.',
        ],
      },
      paragrafosFinais: [
        'Guardar a frase-semente com segurança é a habilidade número um de todo este módulo. ' +
          'Tudo o que vem depois — golpes, aprovações, plano de emergência — supõe que essa ' +
          'parte está resolvida.',
      ],
      detalhe: {
        titulo: 'como as palavras viram chaves (BIP-39, BIP-32, BIP-44)',
        lista: [
          'BIP-39 é o padrão das palavras: uma lista fixa de 2.048. O aparelho sorteia a ' +
            'entropia e acrescenta um checksum.',
          'Cada pedaço de 11 bits vira uma palavra. 128 bits viram 12 palavras; 256 bits, 24.',
          'A frase passa por PBKDF2-HMAC-SHA512 e vira uma semente de 512 bits. O BIP-32 cria ' +
            'a árvore de chaves (carteira HD); o BIP-44 organiza por moeda e por conta.',
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
        'Perder a frase-semente para alguém não tem nada de sofisticado. Nos cinco casos ' +
          'listados acima, o que acontece é sempre a mesma coisa: as palavras deixam de ' +
          'existir só no papel, na sua gaveta, e passam a existir também em algum lugar que ' +
          'outra pessoa consegue alcançar. Uma nuvem, um arquivo, um site, uma conversa. A ' +
          'partir daí a carteira pertence a quem tiver a cópia, e você nem fica sabendo.',
        'Três palavras dessa lista precisam de tradução. Phishing é "pescaria": o golpista ' +
          'joga uma isca — um site, um e-mail, uma página — que imita algo legítimo e espera ' +
          'você digitar ali o que ele quer. Airdrop é uma distribuição gratuita de tokens, ' +
          'algo que existe de verdade e que por isso funciona tão bem como isca. Infostealer ' +
          'é um programa que se instala escondido e vasculha o seu computador atrás de dados ' +
          'valiosos, inclusive arquivos de carteira.',
        'Isso importa porque a frase-semente não tem revogação. Uma senha vazada se troca; um ' +
          'cartão clonado se cancela. A frase, não. No instante em que ela vira um arquivo, ' +
          'uma foto ou uma mensagem, a única defesa que resta é mover tudo para uma carteira ' +
          'nova, gerada a partir de uma frase nova — e isso só funciona se você chegar antes ' +
          'de quem copiou.',
        'Na prática, o pedido quase nunca chega com cara de roubo. Chega como ajuda, como ' +
          'prêmio ou como emergência: um atendente que aparece sozinho no seu Telegram, uma ' +
          'página de "verificador de carteira" que precisa sincronizar, um resgate que expira ' +
          'em minutos. Nenhum suporte, nenhuma corretora, nenhum airdrop e nenhum verificador ' +
          'precisa das suas 12 ou 24 palavras — porque a frase não serve para conferir nada, ' +
          'serve só para gastar.',
      ],
      exemplo: {
        titulo: 'Como o pedido costuma chegar',
        passos: [
          'Você comenta num grupo público que está com um problema na carteira.',
          'Minutos depois, alguém com foto e nome parecidos com os do suporte oficial chama você no privado. Suporte de verdade não faz isso.',
          'A conversa é educada, técnica e sem pressa. Em algum momento aparece um link para "validar" ou "sincronizar" a carteira.',
          'A página pede as 12 palavras, na ordem, em campos numerados — exatamente como a tela original do aplicativo.',
          'Digitar ali não é um passo de validação. É a transferência da carteira inteira, e ela acontece antes de você fechar a aba.',
        ],
      },
      paragrafosFinais: [
        'O erro comum que essa ideia evita é achar que existe um lugar digital seguro o ' +
          'bastante para a frase. Não existe gerenciador, nuvem privada ou pasta com senha ' +
          'que mude a conta: qualquer cópia digital é uma cópia a mais que pode vazar. ' +
          'Ninguém legítimo jamais pede a sua frase-semente, e todo pedido é golpe — sem ' +
          'meio-termo.',
      ],
      detalhe: {
        titulo: 'o que um infostealer copia',
        paragrafos: [
          'Famílias como RedLine e Lumma copiam arquivos de carteira (wallet.dat) e dados de ' +
            'extensões de navegador, como a MetaMask. Também vigiam a área de transferência ' +
            'atrás de frases e endereços.',
        ],
      },
    },

    // =================================== GOLPES ===================================
    {
      id: 'wallet-drainers-conceito',
      aba: 'golpes',
      titulo: 'Wallet drainers: o golpe que não rouba a sua seed',
      emUmaFrase:
        'Este golpe não precisa das suas palavras secretas. Ele precisa de um clique seu, ' +
        'num botão que parece rotina.',
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
        'Um wallet drainer — literalmente, "esvaziador de carteira" — é um kit de golpe ' +
          'instalado num site falso. O site imita uma marca conhecida, oferece alguma coisa ' +
          '(um resgate, um sorteio, um mint de NFT, que é a criação de um item novo numa ' +
          'coleção) e pede que você assine uma operação que parece rotina. A assinatura não ' +
          'transfere dinheiro na hora: ela concede uma permissão. Com a permissão na mão, o ' +
          'golpista esvazia a carteira depois, no tempo dele.',
        'Essa permissão tem nome, e ele aparece o tempo todo daqui para a frente: aprovação, ' +
          'em inglês approval. Aprovar é autorizar um programa da blockchain a mover um token ' +
          'seu sem precisar te perguntar de novo. É um mecanismo legítimo — quase todo site ' +
          'de troca depende dele para funcionar — e é justamente por ser legítimo que serve ' +
          'tão bem ao golpe: a tela do golpista é a mesma tela do site honesto.',
        'Isso importa porque muda o lugar do perigo. Conectar a carteira a um site não move ' +
          'nada: conectar só deixa o site ver os seus saldos, que já são públicos de qualquer ' +
          'jeito. O dano começa no momento em que você assina. Por isso o passo 3 da ' +
          'sequência acima é marcado como ponto de virada: antes dele, dá para fechar a aba e ' +
          'nada aconteceu; depois dele, não há o que desfazer.',
        'Por trás dos sites há um negócio montado, não um hacker solitário. O operador ' +
          'escreve o kit e o aluga para afiliados, que cuidam de espalhar as páginas falsas, ' +
          'comprar anúncios e copiar marcas. O que for roubado é repartido automaticamente ' +
          'por um contrato, sem que as partes precisem confiar umas nas outras: a divisão ' +
          'mais comum é 80% para o afiliado e 20% para o operador. Entender isso explica por ' +
          'que os sites reaparecem tão rápido quando um domínio cai.',
      ],
      exemplo: {
        titulo: 'Por que "eu nunca dei minha seed" não protege aqui',
        passos: [
          'Você guardou a frase-semente no papel e nunca a digitou em lugar nenhum. Essa parte está certa.',
          'Mas o drainer não quer a frase: ele quer uma assinatura — e a assinatura é feita pela própria carteira, com a sua chave, a seu pedido.',
          'Do ponto de vista da rede, a permissão foi concedida por você. Não há nada de irregular a reverter.',
          'Por isso a defesa deste card é outra: ler o que a tela pede antes de confirmar, e desconfiar do que promete algo de graça.',
        ],
      },
      paragrafosFinais: [
        'O erro comum que essa ideia evita é se sentir seguro por não ter caído no golpe da ' +
          'frase-semente. São dois golpes diferentes, com defesas diferentes. Proteger as ' +
          'palavras resolve um deles. O outro se resolve na janela de assinatura, e é sobre ' +
          'ela que falam os dois próximos cards.',
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
        ],
      },
    },
    {
      id: 'vetores-tecnicos',
      aba: 'golpes',
      titulo: 'Os três truques: nos três, você entrega uma permissão sem perceber',
      emUmaFrase:
        'Cada um dos três chega por uma tela diferente, com um nome diferente. Vale reconhecer ' +
        'os três pelo que eles pedem, não pelo que eles prometem.',
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
        'Os três cartões acima são as três formas que um drainer usa para obter aquela ' +
          'permissão. O primeiro é o approval ilimitado: você autoriza um contrato a gastar ' +
          'um token seu sem teto de valor, e ele fica livre para levar aquele token quando ' +
          'quiser, sem pedir nada de novo. O segundo é o Permit (e o Permit2): a mesma ' +
          'autorização, mas obtida por um simples "assinar mensagem", sem taxa. O terceiro é ' +
          'o setApprovalForAll, que entrega de uma vez todos os seus NFTs de uma coleção.',
        'NFT é a sigla de "token não fungível": um token que representa um item único, com ' +
          'número próprio, em vez de uma quantidade intercambiável. Duas notas de dez reais ' +
          'são iguais entre si — isso é ser fungível. Duas figurinhas numeradas de uma coleção ' +
          'não são. O setApprovalForAll existe porque os sites de compra e venda desses itens ' +
          'precisam poder mover a sua figurinha no instante em que alguém a compra.',
        'Isso importa porque nenhum dos três é ilegal ou estranho: sites honestos pedem os ' +
          'três todos os dias. O que muda no golpe são os detalhes que ninguém lê. No ' +
          'approval, o detalhe é o valor: ilimitado, em vez do valor exato daquela operação. ' +
          'No Permit, o detalhe é o disfarce: como não cobra taxa e não parece uma transação, ' +
          'a cabeça registra aquilo como "só uma assinatura de login". No setApprovalForAll, o ' +
          'detalhe é o alcance: um clique cobre a coleção inteira, não o item que você está ' +
          'vendendo.',
        'Na tela, os três se distinguem em três campos da janela da carteira: o tipo do ' +
          'pedido, o valor e quem recebe a permissão. Se o tipo for uma aprovação de gasto, ' +
          'procure o valor e troque-o pelo valor da operação sempre que a carteira deixar. Se ' +
          'não houver taxa de rede nenhuma, desconfie: é sinal de assinatura, e assinatura ' +
          'também autoriza. Há ainda um quarto caminho, mais novo, o EIP-7702, de 2025, ' +
          'tratado no próximo card da aba "Defesa".',
      ],
      exemplo: {
        titulo: 'A mesma tela, honesta e desonesta',
        passos: [
          'Site honesto de troca: pede aprovação do token que você vai vender, e o valor mostrado é o da sua operação.',
          'Site de golpe: pede aprovação do token de que você tem mais, e o valor mostrado é ILIMITADO.',
          'Site honesto de coleção: pede setApprovalForAll quando você põe um item à venda — o alcance é a coleção, e é assim mesmo.',
          'Site de golpe: pede a mesma coisa para "verificar" a carteira ou para liberar um resgate, sem que você esteja vendendo nada.',
          'A diferença nunca está no botão. Está em por que aquilo está sendo pedido agora.',
        ],
      },
      paragrafosFinais: [
        'O erro comum que isso evita é tratar "assinar mensagem" como inofensivo porque não ' +
          'cobra taxa. A ausência de taxa não quer dizer ausência de consequência — quer dizer ' +
          'apenas que quem vai pagar o gas é o golpista, mais tarde, na hora de usar a ' +
          'permissão que você deu.',
      ],
      detalhe: {
        titulo: 'os padrões técnicos e os números da Scam Sniffer',
        // Um item pode vir em pedaços: { mono } sai na fonte de código (o endereço).
        lista: [
          [
            'ERC-20 é o padrão dos tokens na EVM; Permit e Permit2 são assinaturas EIP-712 sem ' +
              'gás. O Permit2 fica em ',
            { mono: '0x000000000022D473030F116dDEE9F6B43aC78BA3' },
            ' em várias redes. setApprovalForAll é dos padrões ERC-721 e ERC-1155.',
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
        'Address poisoning quer dizer "envenenamento de endereço". O golpista gera, por ' +
          'tentativa e erro em massa, um endereço cujos primeiros e últimos caracteres são ' +
          'iguais aos de um endereço que você usa de verdade — o par acima mostra a ideia, com ' +
          'o mesmo começo, o mesmo fim e só o miolo diferente. Depois ele manda uma transação ' +
          'de valor insignificante para você. O objetivo daquela migalha não é o dinheiro: é ' +
          'plantar o endereço falso no seu histórico, esperando que um dia você copie dali.',
        'O clipper é o outro caminho para o mesmo fim, e o nome vem de clipboard, a área de ' +
          'transferência — o lugar invisível onde fica o que você acabou de copiar. É um vírus ' +
          'que vigia esse lugar. Você copia o endereço certo; na hora de colar, ele troca o ' +
          'texto por outro, parecido, em silêncio. Os quatro passos ilustrados acima acontecem ' +
          'em menos de um segundo e sem nenhum aviso na tela.',
        'Isso importa porque os dois exploram um hábito que quase todo mundo tem: conferir só ' +
          'as pontas. Endereços são longos e sem sentido para o olho humano, então a gente ' +
          'olha o começo, olha o fim, vê que bate e envia. É exatamente esse atalho que os ' +
          'dois golpes compram. E o resultado cai na regra do primeiro card do módulo: ' +
          'enviado, confirmado, acabou.',
        'A defesa é a mesma para os dois e tem duas partes. A primeira: nunca copiar endereço ' +
          'do histórico de transações, sempre da fonte original, e conferir a linha inteira ' +
          'depois de colar, não só as pontas. A segunda, que vale ainda mais: enviar primeiro ' +
          'uma transação de valor baixo e confirmar que chegou, antes de enviar o valor cheio. ' +
          'Uma carteira fria acrescenta uma terceira camada, porque mostra o endereço de ' +
          'destino na telinha do próprio aparelho, fora do alcance de um vírus que esteja no ' +
          'computador.',
      ],
      exemplo: {
        titulo: 'O teste de valor baixo, na ordem certa',
        passos: [
          'Copie o endereço da fonte original — a tela de depósito da corretora, ou a carteira de destino aberta na sua frente. Nunca do histórico.',
          'Cole e confira a linha inteira, caractere por caractere, não só o começo e o fim.',
          'Envie um valor pequeno primeiro e espere a confirmação.',
          'Confira no explorador que chegou na carteira certa — e confira no saldo de destino, não só no comprovante de envio.',
          'Só então envie o restante. O custo desse cuidado é uma taxa a mais; o custo de pular é o valor inteiro.',
        ],
      },
      paragrafosFinais: [
        'O erro comum que isso evita é o mais silencioso do módulo: copiar um endereço do ' +
          'próprio histórico porque "já mandei para esse antes". O histórico não é uma lista ' +
          'de contatos confiáveis — qualquer pessoa pode escrever nele, e é exatamente isso ' +
          'que o golpe faz.',
      ],
      detalhe: {
        titulo: 'o tamanho do problema',
        paragrafos: [
          'Estudo da Carnegie Mellon ("Blockchain Address Poisoning", USENIX Security 2025), ' +
            'Ethereum e BNB Chain de julho de 2022 a junho de 2024: 270 milhões de tentativas ' +
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
        'Aprovação, como vimos na aba "Golpes", é a permissão que você dá a um contrato para ' +
          'mexer nos seus tokens. O ponto deste card é o que ninguém conta: essa permissão não ' +
          'tem prazo. Ela continua ativa depois que você fecha a aba, depois que você para de ' +
          'usar o site, depois que o projeto morre — até você cancelar. Revogar é esse ' +
          'cancelamento, e ele existe justamente porque o padrão é a permissão ficar.',
        'A lista tem uma coluna que decide tudo: o spender, que em inglês quer dizer "quem vai ' +
          'gastar". É o contrato que recebeu a permissão. Ao lado dele aparecem o token ' +
          'autorizado, o valor aprovado — e aqui a palavra "ilimitado" é o sinal vermelho — e ' +
          'a idade da aprovação. Ler essas quatro colunas é a tarefa inteira: se você não ' +
          'reconhece o spender, ou se o valor é ilimitado num site que você usou uma única ' +
          'vez, é candidato a revogação.',
        'Para só olhar, você não precisa conectar nada: no Revoke.cash basta digitar o seu ' +
          'endereço, porque a lista é pública como todo o resto. Para revogar de fato, aí sim ' +
          'você conecta a carteira, filtra e clica em "Revoke" — e isso é uma transação como ' +
          'qualquer outra, com taxa de rede. Essa diferença é útil na prática: dá para ' +
          'auditar a própria carteira de qualquer computador, sem risco, e só assinar quando ' +
          'estiver no aparelho de confiança.',
        'Isso importa, mas dentro de um limite que o contraste acima deixa explícito. Revogar ' +
          'fecha a porta para o futuro: aquela permissão deixa de poder ser usada. Revogar não ' +
          'abre o cofre de volta. O que já saiu, saiu; uma frase-semente vazada continua ' +
          'vazada, porque quem tem a frase não precisa de permissão nenhuma; e um vírus que ' +
          'ainda está no aparelho continua lá. Revogar é uma tranca, não um botão de desfazer.',
      ],
      exemplo: {
        titulo: 'Por onde começar quando a lista é longa',
        passos: [
          'Ordene das aprovações mais recentes para as mais antigas: uma aprovação suspeita costuma ser a última coisa que você assinou.',
          'Comece pelas que estão sobre o token de maior valor que você tem — é o que um atacante levaria primeiro.',
          'Em seguida, as de spender que você não reconhece, e as de valor ilimitado em sites que você usou uma vez só.',
          'Deixe por último as de valor pequeno em sites que você usa toda semana: cada revogação custa taxa.',
          'Confira também a aba do Permit2, que guarda permissões próprias — é o assunto do próximo card.',
        ],
      },
      paragrafosFinais: [
        'O erro comum que essa ideia evita é revogar depois de ter sido drenado e achar que o ' +
          'problema está resolvido. A ordem certa é a inversa: revogar é rotina de manutenção, ' +
          'feita de vez em quando com a carteira em paz. Depois do estrago, revogar é só um ' +
          'dos passos — e nem sempre o primeiro, como mostra o card do plano de emergência.',
      ],
      detalhe: {
        titulo: 'o tutorial clique a clique',
        partes: [
          {
            titulo: 'No Revoke.cash',
            passos: [
              'Abra revoke.cash conferindo a URL letra por letra. Digite você mesmo.',
              '"Connect Wallet" para revogar, ou cole o endereço/ENS para só olhar.',
              'Selecione a rede no menu.',
              'Leia a lista: token, spender, valor aprovado e idade.',
              'Ordene de "Newest to Oldest" para achar uma aprovação suspeita recente.',
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
      titulo: 'As duas camadas do Permit2 e o vetor novo (EIP-7702)',
      emUmaFrase:
        'Uma única assinatura pode valer a carteira inteira. Leia sempre o que a carteira ' +
        'pede antes de confirmar.',
      // Permit2 em 2 camadas: do app ao Permit2 (roxo) e do Permit2 a cada app
      // (ciano), e as duas funções que revogam (verde).
      camadas: {
        inicio: 'Você usa um app DeFi',
        camadas: [
          { rotulo: 'Camada 1 · você → Permit2', texto: 'Approval ERC-20 ao contrato Permit2, geralmente ilimitado', tom: 'roxo' },
          { rotulo: 'Camada 2 · Permit2 → cada app', texto: 'Permit2 guarda sub-permissões por app, com valor e prazo', tom: 'acento' },
        ],
        funcoes: [
          { nome: 'lockdown', texto: 'revoga várias sub-permissões de uma vez' },
          { nome: 'invalidateNonces', texto: 'anula assinaturas já feitas e não usadas' },
        ],
        legenda: 'Revogar a camada certa importa. O Revoke.cash mostra as duas em abas separadas.',
        descricao:
          'Você usa um app DeFi. Dá um approval ERC-20 ao contrato Permit2: a camada 1. O ' +
          'Permit2 guarda sub-permissões por app: a camada 2. Dela saem duas funções: ' +
          'lockdown revoga várias de uma vez; invalidateNonces anula assinaturas não usadas.',
      },
      paragrafos: [
        'O Permit2 é um contrato intermediário criado para resolver um incômodo real: sem ele, ' +
          'cada site novo pede uma aprovação nova, e cada aprovação custa taxa. Com ele, você ' +
          'aprova uma vez só — o próprio Permit2 — e depois distribui permissões menores a ' +
          'cada aplicativo, por assinatura, sem taxa. É por isso que ele virou padrão em tanto ' +
          'lugar. E é também por isso que ele precisa ser entendido antes de ser usado.',
        'O desenho acima mostra as duas camadas, e a distinção é prática, não teórica. A ' +
          'camada 1 é você autorizando o contrato Permit2 a mexer num token seu, geralmente ' +
          'sem teto de valor. A camada 2 são as sub-permissões que o Permit2 guarda, uma para ' +
          'cada aplicativo, com valor e prazo próprios. Revogar na camada errada dá a sensação ' +
          'de ter limpado a casa sem ter limpado nada — o Revoke.cash mostra as duas em abas ' +
          'separadas justamente por causa disso.',
        'O lado bom do arranjo é que as permissões da camada 2 expiram sozinhas, o que reduz o ' +
          'acúmulo de autorizações esquecidas. O lado ruim é que o risco muda de lugar: sai da ' +
          'transação, que custa taxa e tem cara de operação, e vai para a assinatura, que é ' +
          'gratuita e tem cara de formalidade. Fica mais barato e mais fácil enganar a vítima ' +
          '— e é exatamente isso que os drainers exploram.',
        'O EIP-7702 é o vetor novo, e é de outra natureza. Ativado na atualização Pectra, de ' +
          'maio de 2025, ele permite que uma carteira comum passe a agir como um contrato, ' +
          'delegando o seu comportamento a um código. Existe para coisas úteis, como pagar a ' +
          'taxa em outro token ou agrupar várias operações numa só. O golpe consiste em ' +
          'esconder essa delegação dentro de uma assinatura que parece uma troca qualquer: ' +
          'quem assina não entrega um token, entrega o controle do próprio endereço. Casos ' +
          'reais: cerca de US$ 146,5 mil em 24/05/2025 e mais de US$ 1,54 milhão em ' +
          '24/08/2025.',
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
          'Na camada 2, o aplicativo da Uniswap costuma usar aprovação de 30 dias — ou seja, ela caduca sozinha se você não renovar.',
          'Para apagar várias sub-permissões de uma vez existe a função lockdown, que o código da Uniswap descreve como revogação em lote.',
          'Para anular assinaturas que você já fez mas que ainda não foram usadas existe a função invalidateNonces.',
          'Nenhuma das duas toca na camada 1: o approval que você deu ao próprio Permit2 continua de pé até ser revogado à parte.',
          'Por isso a auditoria completa é sempre em duas passadas, uma aba de cada vez.',
        ],
      },
      paragrafosFinais: [
        'O erro comum que este card evita é julgar o risco pelo esforço da tela. Uma ' +
          'assinatura sem taxa, feita em dois segundos, pode valer mais do que qualquer ' +
          'transação que você já pagou. A pergunta certa nunca é "isso custa caro?", e sim "o ' +
          'que exatamente eu estou autorizando, e sobre o quê?".',
      ],
      detalhe: {
        titulo: 'as funções do Permit2 e as fontes dos casos',
        lista: [
          'Na camada 2, o app da Uniswap costuma usar aprovação de 30 dias. lockdown é ' +
            '"batch revoking approvals" nas palavras do código da Uniswap.',
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
        'A ordem dos passos aqui não é detalhe: fazer o certo na hora errada é o que faz ' +
        'perder o que ainda dava para salvar.',
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
        'Este card é para o pior dia. Você abre a carteira e o saldo não está lá, ou está ' +
          'menor. A primeira coisa a saber é que o tempo trabalha contra você e o pânico ' +
          'também: quem age rápido e na ordem errada costuma perder o resto. A segunda é que ' +
          'a pergunta da árvore acima resolve metade do problema — a frase-semente vazou, ou ' +
          'foi só uma assinatura maliciosa? Tudo o que você vai fazer depende dessa resposta.',
        'Se foi só uma assinatura, o atacante tem permissão sobre alguns tokens, e nada além ' +
          'disso. Revogar aquela permissão fecha a porta, e o que não estava coberto por ela ' +
          'continua seu. Se a frase vazou, revogar não adianta nada: quem tem a frase tem as ' +
          'chaves, e quem tem as chaves não precisa de permissão para mover o que quiser. ' +
          'Nesse caso a carteira acabou — ela não volta a ser segura nunca mais, nem depois de ' +
          'formatar o aparelho, nem criando uma conta nova dentro dela.',
        'É aqui que entra a palavra sweeper bot, que quer dizer "robô varredor". Quando uma ' +
          'frase-semente vaza, o ladrão não fica olhando a tela: ele deixa um programa vigiando ' +
          'aquele endereço vinte e quatro horas por dia. No instante em que qualquer coisa ' +
          'chega ali, o robô assina uma transferência de saída. Por isso o conselho intuitivo ' +
          '— "vou mandar um pouco de gas para conseguir resgatar meus tokens" — falha quase ' +
          'sempre: o robô leva o gas antes de você conseguir usá-lo.',
        'Por isso a ordem é esta. Primeiro parar de usar o aparelho, porque ele pode ser a ' +
          'origem do problema e tudo o que você fizer nele pode ser observado. Depois criar ' +
          'uma carteira nova, com frase nova, num aparelho limpo — e mover para lá o que ' +
          'sobrou, começando pelo que vale mais, já que talvez só dê tempo de salvar uma ' +
          'coisa. Só então vêm as provas e a denúncia, que não são urgentes para o seu bolso ' +
          'nos primeiros minutos, mas são o que permite qualquer apuração depois.',
        'Guarde expectativas realistas: recuperar o que já saiu é raro. O que está ao seu ' +
          'alcance é impedir a segunda perda — a do que ainda estava lá — e registrar tudo. E ' +
          'sobre a terceira perda, a mais cruel: assim que a notícia circula, aparecem perfis ' +
          'oferecendo "recuperação de cripto" mediante pagamento adiantado. Isso é sempre um ' +
          'segundo golpe, montado em cima do primeiro, e ele encontra a vítima no momento em ' +
          'que ela está mais disposta a acreditar.',
      ],
      exemplo: {
        titulo: 'Os dois caminhos, lado a lado',
        passos: [
          'Assinatura maliciosa, frase intacta: pare de usar o aparelho, revogue a aprovação envolvida, confira o resto da lista de aprovações e guarde as provas. A carteira continua utilizável.',
          'Frase vazada: pare de usar o aparelho, crie carteira nova com frase nova num aparelho limpo, e mova o que sobrou começando pelo mais valioso.',
          'No segundo caso, não deposite gas para "resgatar" o que ficou: o robô varredor leva o depósito.',
          'Nos dois casos, o último passo é o mesmo: hashes, prints, URL do site, data e horário — e a denúncia.',
        ],
      },
      paragrafosFinais: [
        'O erro comum que este card evita é o mais humano de todos: mexer primeiro e pensar ' +
          'depois. Trocar a senha do aplicativo não resolve nada, porque a senha não é a ' +
          'chave. Criar uma conta nova dentro da mesma carteira não resolve nada, porque a ' +
          'frase é a mesma. E revogar aprovações quando a frase vazou só gasta taxa num cofre ' +
          'que já está aberto.',
      ],
      detalhe: {
        titulo: 'por que depositar gas falha e o que o FBI diz',
        paragrafos: [
          'Quando a frase vazou, "depositar gas para salvar tokens" costuma fracassar: o robô ' +
            'leva o gas primeiro. A MetaMask recomenda abandonar a carteira e criar uma nova. ' +
            'O FBI, no alerta IC3 I-072026 (20/07/2026), afirma que o IC3 nunca cobra para ' +
            'recuperar fundos, nem indica empresa que cobre, e não tem perfil em rede social.',
        ],
      },
    },

    // =================================== BRASIL ===================================
    {
      id: 'golpes-comuns-no-brasil',
      aba: 'brasil',
      titulo: 'Golpes comuns no Brasil',
      emUmaFrase:
        'Os quatro trocam de roupa o tempo todo, mas a coreografia é sempre a mesma: entrar é ' +
        'fácil, render é lindo, e sair é impossível.',
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
        'Os quatro cartões acima são disfarces diferentes do mesmo enredo. O falso robô vende ' +
          'a ideia de um programa que acerta sempre — impossível num mercado de risco, onde ' +
          'acertar sempre significaria ter capturado todo o dinheiro do mundo. O grupo de ' +
          'sinais vende antecipação. A falsa gestora vende rendimento. O "assessor" do ' +
          'WhatsApp vende relacionamento. Em todos, o dinheiro entra sem atrito e trava na ' +
          'saída.',
        'Três nomes que aparecem nos cartões merecem tradução. Pump and dump é "inflar e ' +
          'despejar": o organizador compra barato antes, manda o grupo comprar, o preço sobe ' +
          'com a entrada de vocês, e ele vende no topo — o lucro dele é a perda de quem ' +
          'obedeceu. Esquema Ponzi é a pirâmide clássica: não existe investimento nenhum, os ' +
          'antigos são pagos com o dinheiro dos novos, e o esquema desaba quando param de ' +
          'entrar novos. Pig butchering, "engorda do porco", é o nome que o crime organizado ' +
          'dá ao golpe de longo prazo: semanas de conversa afetuosa para engordar a confiança ' +
          'antes do abate.',
        'Isso importa porque nenhum dos quatro se apresenta como golpe. Eles se apresentam ' +
          'como oportunidade, como grupo de amigos, como assessoria. O que os denuncia não é ' +
          'a aparência, é a estrutura — e é por isso que os sinais abaixo funcionam melhor do ' +
          'que qualquer tentativa de julgar se o site parece sério.',
      ],
      listaTitulo: 'Os cinco sinais que se repetem nos quatro',
      lista: [
        'Promessa de rendimento fixo ou garantido. Em mercado de risco, garantia não existe; quem garante está mentindo ou está pagando com o dinheiro do próximo.',
        'Pressão por urgência: "é agora ou nunca", contagem regressiva, vaga que acaba hoje. A pressa existe para impedir a pergunta seguinte.',
        'Exigência de recrutar outras pessoas. Se o seu ganho depende de quem você trouxer, o produto é você.',
        'Saque bloqueado até um novo depósito ou o pagamento de uma "taxa". Nenhuma empresa legítima cobra para devolver o seu próprio dinheiro.',
        'Empresa sem registro ou autorização. É o único sinal que dá para conferir sozinho, fora da conversa, antes de pôr dinheiro.',
      ],
      paragrafosFinais: [
        'Esse último sinal é o que a checagem acima resolve, e ela tem duas paradas. A ' +
          'primeira é a CVM, a Comissão de Valores Mobiliários, que fiscaliza ofertas de ' +
          'investimento e publica alertas e stop orders — a stop order é a ordem formal para ' +
          'uma empresa parar de ofertar algo ao público, e estar numa delas é sinal forte de ' +
          'perigo. A segunda é o Banco Central, que autoriza quem pode operar. Passar pelas ' +
          'duas não é garantia de nada; reprovar em qualquer uma é motivo para parar ali. O ' +
          'caso mais conhecido do país, o do falso robô da Atlas Quantum, terminou em multas ' +
          'da CVM de mais de R$ 55,8 milhões em 2024 — e nenhuma dessas multas devolveu ' +
          'dinheiro a quem investiu.',
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
          'Atlas Quantum: Deliberação CVM nº 826 (13/08/2019) mandou parar a oferta. Em ' +
            '21/05/2024, multas de mais de R$ 55,8 milhões por operação fraudulenta e embaraço ' +
            'à fiscalização. Prejuízo: estimativas da imprensa vão de R$ 1,1 bilhão e 47 mil ' +
            'investidores a R$ 7 bilhões e 200 mil pessoas — sem número oficial único.',
          'Grupos de sinais: o conflito é o "trader" ganhar comissão da corretora pelo volume ' +
            'que você opera.',
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
        'A regra nova não mudou o que você pode fazer. Mudou quem pode te atender — e isso já ' +
        'tirou cinco corretoras do varejo.',
      // O visual é a linha do tempo modulo1.linhaDoTempoRegulacao (mais abaixo).
      paragrafos: [
        'PSAV quer dizer Prestadora de Serviços de Ativos Virtuais. É o nome oficial de ' +
          'qualquer empresa que guarde, intermedeie ou negocie cripto por você: corretoras, ' +
          'intermediárias e custodiantes. Até pouco tempo atrás, essas empresas operavam no ' +
          'Brasil sem uma autorização própria. Desde fevereiro de 2026 elas passaram a seguir ' +
          'regras do Banco Central, com exigências de prevenção à lavagem de dinheiro, ' +
          'governança, segurança e segregação do dinheiro dos clientes.',
        'Essa última exigência é a que mais interessa a você. Segregar significa manter o ' +
          'dinheiro dos clientes separado do caixa da empresa, em vez de misturar tudo numa ' +
          'conta só. É exatamente a mistura que transforma o problema financeiro de uma ' +
          'corretora no prejuízo dos clientes dela — o risco de contraparte de que falamos na ' +
          'aba "Carteiras".',
        'Regra nova custa caro, e é aí que está a consequência prática. Empresas que já ' +
          'operavam têm até 30 de outubro de 2026 para pedir autorização, e nem todas ' +
          'quiseram. Em 2026, Bitso, Coinext, NovaDAX, Digitra e Bitnuvem anunciaram o fim do ' +
          'varejo no Brasil, citando justamente o custo de se adequar. Para quem tinha conta ' +
          'em alguma delas, isso não é notícia de jornal: é uma mudança de endereço obrigatória.',
        'Na prática, o que muda para você é uma pergunta a mais antes de escolher onde ' +
          'colocar dinheiro: essa corretora pediu autorização, e pretende continuar atendendo ' +
          'pessoa física? Qualquer lista de "quem está autorizado" envelhece rápido, então a ' +
          'consulta que vale é a do próprio Banco Central, feita na hora. Nada disso muda o ' +
          'que você pode fazer: comprar, vender e guardar cripto continua permitido.',
      ],
      exemplo: {
        titulo: 'O que aconteceu com quem tinha conta numa das cinco',
        passos: [
          'A corretora anuncia o fim do varejo e dá um prazo para os clientes retirarem o que têm.',
          'A Bitso transferiu a base de clientes para o Mercado Bitcoin, em setembro de 2026; a Coinext anunciou o fim em 03/09/2026.',
          'Quem acompanhava, migrou com calma. Quem não acompanhava, descobriu pelo e-mail de encerramento.',
          'A lição não é sobre essas empresas em particular: é que a conta na corretora depende de uma empresa continuar existindo e continuar querendo te atender.',
        ],
      },
      paragrafosFinais: [
        'Vale separar duas coisas que costumam ser confundidas nas manchetes. A Resolução BCB ' +
          '561 veda o uso de stablecoins — tokens feitos para valer sempre o mesmo que uma ' +
          'moeda tradicional, quase sempre o dólar — como forma de liquidação em câmbio ' +
          'eletrônico, isto é, em pagamentos internacionais. Ela não proíbe comprar, vender ' +
          'nem guardar cripto dentro do país. Regulação muda: confira no Banco Central e na ' +
          'CVM antes de tomar qualquer decisão baseada nela.',
      ],
      detalhe: {
        titulo: 'números das resoluções e a Resolução 561',
        lista: [
          'Resoluções BCB 519, 520 e 521, fruto das Consultas Públicas 109, 110 e 111 de ' +
            '2024. Elas classificam as PSAVs em modalidades: intermediária, custodiante e ' +
            'corretora. A Bitso transferiu a base para o Mercado Bitcoin (setembro de 2026); ' +
            'a Coinext anunciou o fim em 03/09/2026.',
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
        'Este card não ensina a calcular nada. Ele existe para você não descobrir tarde ' +
        'demais que precisava ter anotado.',
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
        'No Brasil, cripto é tratada como um bem — juridicamente parecida com um carro ou um ' +
          'imóvel, não com dinheiro na conta. Isso tem uma consequência direta: quando você ' +
          'vende um bem por mais do que pagou, a diferença é lucro, e esse lucro pode ser ' +
          'tributado. O nome disso é ganho de capital: é o imposto sobre a valorização, ' +
          'cobrado no momento em que você realiza o ganho, não enquanto o preço apenas sobe na ' +
          'tela.',
        'A parte que surpreende iniciante é que trocar também conta. Trocar um token por ' +
          'outro, sem passar por reais, pode ser um fato tributável do mesmo jeito que vender ' +
          '— porque, aos olhos da regra, você se desfez de um bem. Além do imposto em si, ' +
          'existem obrigações de declaração, que valem mesmo quando não há imposto a pagar.',
        'Isso importa por um motivo bem prático, e é o motivo deste card estar num módulo de ' +
          'segurança: o registro não dá para reconstruir depois. Os três campos do quadro ' +
          'acima — data, valor em reais e taxas — precisam ser anotados no dia, porque meses ' +
          'depois a corretora pode ter encerrado, o histórico pode não estar mais acessível e ' +
          'a cotação daquele instante vira uma garimpagem. As taxas entram na conta, e sem ' +
          'elas o cálculo sai errado para mais.',
        'Este material não dá orientação tributária e não vai dizer alíquota, prazo nem ' +
          'formulário. O objetivo é deixar claro que a obrigação existe e que ela tem prazo. ' +
          'As regras mudaram nos últimos anos e a Receita Federal passou a receber muito mais ' +
          'informação sobre operações com cripto — o que significa que divergências entre o ' +
          'que você declara e o que a Receita já sabe tendem a aparecer. Essa retenção para ' +
          'conferência é o que se chama popularmente de malha fina.',
      ],
      exemplo: {
        titulo: 'O que anotar no dia da operação',
        passos: [
          'A data: o dia exato da venda ou da troca. É ela que define em qual período a operação entra.',
          'O que saiu: qual cripto e qual quantidade você entregou, e quanto aquilo valia em reais naquele momento.',
          'O que entrou: o que você recebeu, e quanto valia em reais no mesmo momento.',
          'As taxas: a da corretora, a da pool e a de rede. Todas fazem parte do custo e reduzem o ganho.',
          'Onde: em qual corretora ou em qual carteira — é o que permite reencontrar o comprovante depois.',
        ],
      },
      paragrafosFinais: [
        'O erro comum que isso evita é deixar para organizar na época da declaração. Quem ' +
          'anota na hora leva ao contador uma planilha; quem não anota leva um problema, e às ' +
          'vezes nem consegue reconstruir. Consulte um contador para o seu caso concreto: ' +
          'aqui o assunto para por aqui, de propósito.',
      ],
      detalhe: {
        titulo: 'a lei e a plataforma DeCripto',
        lista: [
          'As regras mudaram com a Lei 14.754/2023 (a "Lei das Offshores") e com novas ' +
            'normas da Receita Federal.',
          'A partir de julho de 2026, a plataforma DeCripto amplia a fiscalização, exigindo ' +
            'que plataformas informem as operações à Receita Federal.',
          'A DeCripto foi instituída pela IN RFB nº 2.291/2025 e é alinhada ao padrão ' +
            'internacional CARF da OCDE.',
        ],
      },
    },
    {
      id: 'sacar-para-reais',
      aba: 'brasil',
      titulo: 'Sacar para reais: Pix, KYC e P2P',
      emUmaFrase:
        'Sair é o caminho que a maioria estuda menos e é onde moram dois riscos que não ' +
        'existem em nenhum outro card: o estorno e o bloqueio da sua conta.',
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
        'Há dois caminhos para transformar cripto em reais, e o desenho acima mostra os dois. ' +
          'O caminho A é a corretora: você envia a cripto para uma CEX que fez o seu cadastro ' +
          '(o KYC, aquela verificação de identidade da aba "Fundamentos"), vende por reais ' +
          'dentro da plataforma e saca por Pix para a sua conta bancária. O caminho B é o P2P, ' +
          'sigla de peer-to-peer, ou seja, "de pessoa para pessoa": você negocia direto com ' +
          'outro indivíduo, sem a corretora comprando de você.',
        'O caminho A é mais simples e tem um efeito colateral útil: como o cadastro existe, ' +
          'fica mais fácil explicar a origem do dinheiro ao seu banco. O caminho B costuma ' +
          'oferecer preço melhor, e é aí que mora o problema — o preço melhor é o pagamento ' +
          'pelo risco que você está assumindo.',
        'São três riscos concretos, e nenhum deles é técnico. A outra pessoa pode simplesmente ' +
          'não pagar depois de você liberar a cripto. Pode pagar e depois pedir o estorno do ' +
          'Pix ao banco dela, alegando fraude. E pode pagar com dinheiro de origem criminosa ' +
          '— nesse caso, o valor cai na sua conta, é rastreado até você e a sua conta bancária ' +
          'pode ser bloqueada, mesmo sem você ter feito nada de errado. Esse terceiro risco é ' +
          'o que mais gente subestima.',
        'As plataformas de P2P reduzem parte disso com o escrow, que é um depósito em garantia: ' +
          'a plataforma segura a cripto enquanto o pagamento é feito e só a libera quando as ' +
          'duas pontas confirmam. Reduz, não elimina — o escrow protege você de não receber, ' +
          'mas não protege de receber dinheiro sujo nem de um estorno posterior. Por isso a ' +
          'regra é simples e não tem exceção: nunca solte a cripto antes de ver o valor ' +
          'efetivamente creditado na sua conta.',
      ],
      exemplo: {
        titulo: 'A ordem que não se inverte, no P2P',
        passos: [
          'Combine o negócio dentro da plataforma, com o escrow ativo. Conversa que migra para fora da plataforma é o primeiro sinal de alerta.',
          'Espere o comprovante — e ignore o comprovante. Ele é uma imagem, e imagem se edita.',
          'Abra o aplicativo do seu banco e confirme que o valor está creditado e disponível, não apenas agendado.',
          'Confira se o nome de quem pagou é o mesmo do cadastro da negociação. Pagamento de terceiro é motivo para não liberar.',
          'Só então libere a cripto. Se algo ficar estranho em qualquer um dos passos, abra a disputa na plataforma em vez de liberar.',
        ],
      },
      paragrafosFinais: [
        'O erro comum que essa ordem evita é liberar contra um comprovante em vez de contra o ' +
          'saldo. E vale lembrar, para fechar a aba: sair também é um fato com consequência ' +
          'tributária. Os dois caminhos geram obrigação a considerar com um contador, como ' +
          'diz o card anterior.',
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
          contras: 'Exposta a phishing, drainers e malware; uma assinatura errada pode esvaziá-la.',
        },
      },
      {
        titulo: 'Cold wallet (carteira fria)',
        subtitulo: 'Aparelhos de hardware — exemplos de categoria',
        valores: {
          custodia: { texto: 'Você guarda as chaves num dispositivo físico offline.', tom: 'ok' },
          pros: 'As chaves nunca tocam a internet; melhor categoria para guardar por muito tempo; mostra o destino na própria telinha (defesa contra clipper).',
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
  checklistSegurancaDescricao: 'Marque conforme for aplicando. Fica salvo no seu navegador.',

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
      texto: 'Confirmo transações no aparelho da hardware wallet, lendo o endereço na telinha.',
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
      oQueVeem: 'Um pop-up pedindo para "assinar", às vezes chamado de "verificação" ou "claim" gratuito, sem taxa.',
      oQueAcontece: 'É um approve ilimitado, uma assinatura Permit/Permit2 (EIP-712, sem gás) ou um setApprovalForAll de NFTs — autorizando o golpista a mover seus ativos.',
    },
    {
      numero: 4,
      titulo: 'Drenagem',
      oQueVeem: 'Nada, ou uma tela de "erro"/"tente de novo"; o saldo some minutos depois.',
      oQueAcontece: 'O golpista chama transferFrom (ou usa a assinatura/delegação) e transfere os fundos, sem precisar de nova ação da vítima.',
    },
    {
      numero: 5,
      titulo: 'Lavagem',
      oQueVeem: '(a vítima costuma perceber tarde, quando o saldo já sumiu)',
      oQueAcontece: 'Os fundos passam por mixers, pontes entre redes ou corretoras rapidamente; a divisão operador/afiliado (tipicamente 20%/80%) é paga automaticamente por um contrato.',
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
        nota: 'Para sempre — e cobram a taxa de gas do mesmo jeito. O explorador mostra "Failed" em vermelho, mas o custo já foi pago.',
        tom: 'alerta',
      },
      {
        rotulo: 'Partes do preço do gas',
        valor: '2',
        nota: 'Desde a EIP-1559 (agosto de 2021): uma taxa-base, que é queimada, e uma gorjeta ao validador. É por isso que o preço varia com a demanda.',
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
        nota: '"Not your keys, not your coins." Quando FTX, Celsius e Mt. Gox quebraram, quem deixou fundos lá perdeu o acesso.',
        tom: 'alerta',
      },
      {
        rotulo: 'Corretoras que anunciaram saída do varejo em 2026',
        valor: '5',
        nota: 'Bitso, Coinext, NovaDAX, Digitra e Bitnuvem, citando o custo de adequação à regulação. Nome de corretora é exemplo de categoria, nunca recomendação.',
      },
      {
        rotulo: 'Custo de uma hot wallet',
        valor: 'Grátis',
        nota: 'Você guarda as chaves, num aparelho conectado. O preço é o risco de malware e phishing — e a responsabilidade inteira.',
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
        nota: 'Mais de 332 mil carteiras, alta de 67% sobre 2023. Em 2025 caiu 83%, para cerca de US$ 83,85 milhões.',
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
        rotulo: 'Vetor novo desde maio de 2025',
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
        nota: 'Estimativa citada pela CVM. No Brasil, uma só vítima transferiu R$ 37 milhões em seis meses (Operação Criptoabate, 13/08/2026).',
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
          texto: 'Cole no explorador para achar a transação. Começa com "0x" em redes EVM; na Solana o equivalente é a Signature.',
        },
        {
          painel: 'status',
          titulo: 'Success ou Failed.',
          texto: 'Verde deu certo, vermelho falhou — e atenção: mesmo falhando, você pagou a taxa de gas.',
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
