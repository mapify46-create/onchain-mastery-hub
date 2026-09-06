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
// A aba 'quiz' é montada à parte, a partir de modulo1.quiz.

export const modulo1 = {
  id: 'modulo-1',
  titulo: 'Fundamentos & Segurança Cripto',

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

  // ---------------------------------------------------------------------------
  // Seções de texto, uma por aba (campo `aba` diz onde a view a coloca)
  // ---------------------------------------------------------------------------
  secoes: [
    // ================================ FUNDAMENTOS ================================
    {
      id: 'o-que-e-blockchain',
      aba: 'fundamentos',
      titulo: 'O que é uma blockchain',
      paragrafos: [
        'Uma blockchain é um caderno de registros público e compartilhado. Em vez de um ' +
          'banco guardar sozinho a lista de quem tem o quê, milhares de computadores no ' +
          'mundo guardam cópias idênticas da mesma lista. Cada página desse caderno é ' +
          'chamada de "bloco", e cada bloco guarda um punhado de transações (por ' +
          'exemplo: "o endereço A enviou 2 moedas ao endereço B"). Quando um bloco enche, ' +
          'ele é fechado e um novo começa, formando uma corrente de blocos — daí o nome ' +
          '"block-chain", corrente de blocos.',
        'O que amarra um bloco ao anterior é uma espécie de impressão digital matemática ' +
          'chamada "hash": um código que resume todo o conteúdo do bloco. Cada bloco ' +
          'carrega o hash do bloco anterior. Se alguém tentar mudar uma transação antiga, ' +
          'o hash daquele bloco muda, e isso quebra a ligação com todos os blocos ' +
          'seguintes — a fraude fica evidente para toda a rede. Mudar uma transação ' +
          'antiga exigiria refazer tudo em todas as cópias ao mesmo tempo, na prática ' +
          'impossível.',
        'Você não precisa de permissão nem de conta para "ler" a blockchain. Qualquer ' +
          'pessoa pode consultar qualquer transação ou endereço. Essa transparência é a ' +
          'base de tudo o que vem adiante: é ela que permite auditar golpes, conferir se ' +
          'um pagamento chegou e revisar permissões dadas a contratos.',
      ],
      lista: [
        'Bloco: uma "página" do caderno, com várias transações.',
        'Hash: a impressão digital que resume um bloco e o liga ao anterior.',
        'Rede: os milhares de computadores que guardam cópias iguais.',
      ],
    },
    {
      id: 'imutabilidade-e-confirmacoes',
      aba: 'fundamentos',
      titulo: 'Imutabilidade e "confirmações"',
      paragrafos: [
        'Imutável quer dizer "que não pode ser alterado depois de gravado". Numa ' +
          'blockchain, uma transação, depois de confirmada, fica registrada para sempre ' +
          '— não há botão de "desfazer", não há suporte que estorna. Isso é ótimo ' +
          '(ninguém apaga o seu saldo) e perigoso (se você mandar para o endereço ' +
          'errado, ou cair num golpe, o dinheiro se foi).',
        '"Confirmação" é o número de blocos que já foram fechados em cima do bloco onde ' +
          'a sua transação entrou. Uma transação com 1 confirmação já está na corrente; ' +
          'com 12, 30 ou mais confirmações, fica cada vez mais impossível de reverter, ' +
          'porque um atacante teria de reescrever todos aqueles blocos ao mesmo tempo. ' +
          'Por isso as corretoras esperam um número mínimo de confirmações antes de ' +
          'liberar um depósito.',
        'Uma consequência importante para iniciantes: uma transação que falhou também ' +
          'fica registrada para sempre. Você pode ver na blockchain tentativas que não se ' +
          'completaram. Errar o destino, cair num golpe ou assinar algo indevido são ' +
          'ações que a rede executa e grava — a irreversibilidade não distingue acerto ' +
          'de erro.',
      ],
    },
    {
      id: 'explorador-de-blocos',
      aba: 'fundamentos',
      titulo: 'Explorador de blocos: como ler uma transação',
      paragrafos: [
        'Um explorador de blocos (block explorer) é um site que funciona como um ' +
          '"Google da blockchain": você cola um endereço, um código de transação ou um ' +
          'contrato e ele mostra, de forma organizada, o que a rede registrou. Cada rede ' +
          'tem o seu: Solscan para a Solana, Etherscan para Ethereum, BscScan para a BNB ' +
          'Chain e Basescan para a Base. Eles são só de leitura: não guardam suas ' +
          'chaves, não fazem trocas e não conseguem mexer no seu dinheiro.',
        'Numa transação de Ethereum (e redes EVM parecidas), os campos que mais ' +
          'importam para um iniciante são: Transaction Hash (identificador único de 66 ' +
          'caracteres, começando com "0x"); Status (Success/verde = deu certo, ' +
          'Failed/vermelho = falhou — e atenção: mesmo falhando você pagou a taxa de ' +
          'gas); Block (em qual bloco entrou, mais o número de confirmações); Timestamp ' +
          '(data e hora, em UTC); From/To (quem enviou e quem recebeu — em transações de ' +
          'token, o "To" costuma ser o contrato do token, não uma pessoa; se aparecer a ' +
          'palavra "Contract" em vez de um endereço comum, o destino é um contrato ' +
          'inteligente); Value (quanto da moeda nativa foi enviado — pode ser 0 numa ' +
          'transferência de token); Transaction Fee/Gas (o custo pago para processar); e ' +
          'as abas Tokens Transferred e Logs de eventos, que mostram o que de fato se ' +
          'moveu. Um erro comum de iniciante é olhar "Value: 0 ETH" e achar que nada ' +
          'aconteceu, quando na verdade tokens se moveram na aba "Token Transfers".',
        'No Solscan (Solana) os campos equivalentes são: Signature (o identificador, ' +
          'equivalente ao hash), Block/Slot, Timestamp, Result (Success/Failed), Signer ' +
          '(a carteira que iniciou e pagou), Fee (em SOL, geralmente frações de ' +
          'centavo), Main Actions (a transação quebrada em uma ou mais transferências) e ' +
          'Balance Changes (SOL Balance Change e Token Balance Change, mostrando o saldo ' +
          'antes e depois). A lógica é a mesma do Etherscan; muda o layout e alguns ' +
          'nomes — inclusive, o próprio Solscan foi adquirido pela Etherscan, o que ' +
          'aproximou as duas ferramentas.',
      ],
      lista: [
        'Explorador = janela de auditoria; a carteira mostra o que você fez, o explorador confirma o que de fato aconteceu na rede.',
        'Um explorador é só de leitura: ele não envia nem recebe cripto por você.',
        'Cuidado com sites falsos de explorador: confira sempre a URL (etherscan.io, solscan.io) e desconfie de links recebidos por mensagem.',
      ],
    },
    {
      id: 'chave-publica-privada-endereco',
      aba: 'fundamentos',
      titulo: 'Chave pública, chave privada e endereço: o que é cada um',
      paragrafos: [
        'Cripto usa criptografia de chave pública (criptografia assimétrica): em vez de ' +
          'uma única senha, você tem um par de chaves ligadas por matemática. A chave ' +
          'privada é um número secreto escolhido ao acaso — na prática, 32 bytes, ou ' +
          'seja, 256 bits de aleatoriedade. Ela é o segredo que assina as transações: é ' +
          'a prova de que você autoriza mover as moedas. Pense nela como uma assinatura ' +
          'de próprio punho que ninguém pode ver nem copiar — quem tiver a sua, assina ' +
          'no seu lugar.',
        'A partir da chave privada, a matemática gera a chave pública. É uma via de mão ' +
          'única: dá para ir da privada para a pública, mas é impossível voltar — não ' +
          'existe conta que descubra a privada a partir da pública. Na Ethereum e redes ' +
          'EVM isso usa a curva elíptica secp256k1; na Solana, usa a curva Ed25519.',
        'O endereço é derivado da chave pública, mas o caminho muda conforme a rede. Na ' +
          'EVM, pega-se o hash Keccak-256 da chave pública e ficam os últimos 20 bytes — ' +
          'é isso que vira o endereço de 42 caracteres começando com "0x". Na Solana o ' +
          'caminho é mais curto: a chave pública tem 32 bytes e é o próprio endereço, ' +
          'apenas escrito em base58 (aquela sequência de 32 a 44 letras e números). Uma ' +
          'confusão comum: muita gente chama o endereço de "chave pública". Na EVM, ' +
          'tecnicamente, não é a mesma coisa — o endereço é um resumo (hash) da chave ' +
          'pública. Na Solana, sim, o endereço É a chave pública, só que codificada em ' +
          'base58.',
        'Como isso se conecta com a seção da frase-semente (mais adiante): a frase é a ' +
          'raiz de tudo. Dela nasce a chave privada, da privada nasce a pública, e da ' +
          'pública nasce o endereço. Por isso o endereço você divulga à vontade (é como ' +
          'o número da conta que você passa para receber um Pix), mas a chave privada e ' +
          'a frase-semente você nunca mostra a ninguém. E, como toda a cadeia é de mão ' +
          'única, saber o seu endereço não permite a ninguém descobrir sua chave.',
      ],
      lista: [
        'Endereço = para receber (pode divulgar à vontade).',
        'Chave privada e frase-semente = para gastar (segredo absoluto).',
        'Curiosidade: ao enviar uma transação, a assinatura expõe a chave pública na rede — mesmo assim, isso não compromete a privada, porque o caminho de volta continua impossível na prática.',
      ],
    },
    {
      id: 'gas-taxa-de-rede',
      aba: 'fundamentos',
      titulo: 'O que é gas (taxa de rede) e por que o preço varia',
      paragrafos: [
        'Toda ação na blockchain custa uma taxa, chamada gas na EVM. Gas é a unidade que ' +
          'mede o trabalho computacional de uma transação: mandar ETH usa pouco (21.000 ' +
          'unidades de gas para uma transferência simples entre pessoas); interagir com ' +
          'um contrato usa mais. A conta final tem duas partes: o gas limit (o teto de ' +
          'trabalho que você autoriza) e o gas price (o preço por unidade de gas). Você ' +
          'paga apenas pelo trabalho de fato usado, mas o gas limit protege você de uma ' +
          'transação que consuma trabalho sem parar.',
        'Desde a mudança chamada EIP-1559 (ativada em agosto de 2021), o preço tem dois ' +
          'componentes. A base fee é calculada automaticamente pela rede conforme o ' +
          'congestionamento e é queimada — destruída, some de circulação, não vai para ' +
          'ninguém. A priority fee (gorjeta) é opcional e vai para o validador, para ' +
          'acelerar a inclusão da transação. Quando muita gente disputa espaço no bloco, ' +
          'a base fee sobe; quando a rede esvazia, ela cai — é por isso que a taxa varia ' +
          'minuto a minuto. Existe ainda um max fee (o teto total que você aceita ' +
          'pagar); o que sobrar entre o teto e o custo real é devolvido.',
        'Ponto crucial para iniciante: uma transação que falha ainda cobra gas. O ' +
          'trabalho computacional foi feito pelos computadores da rede até o ponto em ' +
          'que deu erro, então esse esforço é cobrado do mesmo jeito — vale tanto na EVM ' +
          'quanto na Solana. Não existe "deu errado, não paguei".',
        'As ordens de grandeza mudam muito entre redes. Na Ethereum mainnet o preço do ' +
          'gas costuma variar bastante ao longo do dia e do ano, deixando transações ' +
          'simples entre frações de centavo e alguns reais dependendo do congestionamento ' +
          '— confira sempre um "gas tracker" atualizado antes de operar, pois isso muda o ' +
          'tempo todo. Nas redes L2 e alternativas, como Base e BNB Chain, o custo ' +
          'costuma ser uma fração de centavo, porque essas redes empacotam muitas ' +
          'transações e usam a rede principal só como camada de dados. Na Solana o ' +
          'modelo é diferente e mais simples: uma taxa base fixa de 5.000 lamports por ' +
          'assinatura (0,000005 SOL, metade queimada e metade para o validador), mais ' +
          'uma priority fee opcional para furar a fila.',
      ],
      lista: [
        'Gas limit = teto de trabalho autorizado; gas price = preço por unidade.',
        'Base fee é queimada; a gorjeta (priority fee) vai para o validador.',
        'Transação que falha custa gas do mesmo jeito, na EVM e na Solana.',
      ],
    },
    {
      id: 'contrato-inteligente',
      aba: 'fundamentos',
      titulo: 'O que é um contrato inteligente, em linguagem de leigo',
      paragrafos: [
        'Um contrato inteligente (smart contract) é um programa que roda na própria ' +
          'blockchain. Ele executa sozinho quando as condições programadas são ' +
          'atendidas, sem precisar de uma empresa no meio para "apertar o botão". É ' +
          'público (qualquer um pode ler) e, em geral, imutável depois de publicado: o ' +
          'código fica ali, naquele endereço, para sempre.',
        'No Etherscan/Solscan você às vezes vê um selo de "código verificado" ' +
          '(verified). Isso significa que o autor publicou o código-fonte e ele confere ' +
          'com o que está de fato rodando na rede — então você (ou alguém técnico) pode ' +
          'ler o que o contrato faz. Um contrato sem código verificado é uma caixa-preta: ' +
          'você não sabe o que ele executa, então merece cuidado redobrado.',
        'Atenção, porque este é o ponto que engana iniciante: "imutável" e "verificado" ' +
          'não significam "seguro". O código pode ter um bug, ou pode ter sido feito ' +
          'malicioso de propósito e ainda assim estar verificado — verificado só quer ' +
          'dizer "dá para ler", não "é confiável". Além disso, existem contratos ' +
          'atualizáveis via proxy: uma "porta da frente" com endereço fixo que aponta ' +
          'para uma lógica que pode ser trocada depois pelo dono, inclusive por um ' +
          'código malicioso. E existem funções administrativas de um "owner" (dono): se ' +
          'o dono pode pausar transferências, emitir novas moedas ou trocar a lógica, ele ' +
          'tem poder sobre o seu dinheiro. Por isso vale a pena, num contrato, checar se ' +
          'ele é um proxy, ler a lógica de implementação e ver quem é o owner (e se o ' +
          'controle foi renunciado ou está numa carteira multisig).',
        'Conexão direta com os golpes de drainer: quando você dá um "approve", está ' +
          'justamente chamando uma função de um contrato para autorizá-lo a mexer nos ' +
          'seus tokens. Se o contrato por trás for malicioso, esse approve inocente vira ' +
          'a chave da sua carteira.',
      ],
    },
    {
      id: 'cex-x-dex',
      aba: 'fundamentos',
      titulo: 'Corretora (CEX) x troca on-chain (DEX): o que muda na prática',
      paragrafos: [
        'Numa CEX (corretora centralizada), você negocia dentro da empresa, num livro de ' +
          'ofertas (order book) que casa compradores e vendedores. A empresa faz a ' +
          'custódia (guarda suas moedas), exige KYC (verificação de identidade) e ' +
          'oferece suporte e, às vezes, a chance de reverter internamente um erro. Numa ' +
          'DEX (corretora descentralizada), você negocia direto da sua carteira, sem ' +
          'cadastro, sem suporte e sem reversão — se errar, não há para quem recorrer.',
        'A DEX quase sempre usa um AMM (formador de mercado automático, do inglês ' +
          'Automated Market Maker). Em vez de casar comprador e vendedor, existe um pool ' +
          'de liquidez: um par de moedas depositado num contrato (por exemplo, ETH e um ' +
          'token), e uma fórmula matemática (a mais comum é o "produto constante", ' +
          'x × y = k) define o preço pela proporção entre elas. Cada troca muda essa ' +
          'proporção e, portanto, move o preço. Daí surge o slippage (deslizamento de ' +
          'preço): a diferença entre o preço que você viu na tela e o preço pelo qual a ' +
          'ordem de fato executou. Quanto menor o pool e maior a sua ordem em relação a ' +
          'ele, pior o slippage.',
        'Quase todo token novo e memecoin só existe em DEX, porque criar um pool não ' +
          'exige autorização de ninguém — o que também significa menos proteção e muito ' +
          'mais espaço para golpe.',
        'Stablecoins, em um parágrafo: são tokens que buscam manter paridade com uma ' +
          'moeda tradicional, quase sempre o dólar. No Brasil, boa parte do saque e da ' +
          'entrada de recursos em cripto passa por elas — segundo nota oficial da ' +
          'Receita Federal (30 de junho de 2026), entre agosto de 2019 e dezembro de ' +
          '2025 foram declarados cerca de R$ 1,58 trilhão em operações com os principais ' +
          'criptoativos, e a participação das stablecoins no volume mensal saltou de ' +
          '3,5% em 2019 para 79,7% em 2022 e 91,5% em 2023, com pico mensal de R$ 39,7 ' +
          'bilhões em novembro de 2025; a USDT sozinha respondeu por 88,7% do volume de ' +
          'stablecoins no período. (Citamos as marcas só como retrato do mercado, não ' +
          'como recomendação.)',
      ],
    },

    // ================================= CARTEIRAS =================================
    {
      id: 'onde-ficam-chaves',
      aba: 'carteiras',
      titulo: 'Onde ficam suas chaves: CEX, hot wallet e cold wallet',
      paragrafos: [
        'Suas moedas não ficam "dentro" da carteira como dinheiro numa carteira de ' +
          'couro — elas vivem na blockchain. O que você realmente possui é a chave ' +
          'privada, o segredo que autoriza mover as moedas. Quem controla a chave ' +
          'privada controla o dinheiro. A frase que resume tudo é: "not your keys, not ' +
          'your coins" (se as chaves não são suas, as moedas não são suas).',
        'Existem três categorias. Uma CEX (corretora centralizada, do inglês ' +
          'Centralized Exchange) — como Binance ou Mercado Bitcoin, citadas aqui só como ' +
          'exemplos da categoria — é uma empresa que guarda as chaves por você, como um ' +
          'banco. É a porta de entrada mais fácil: aceita Pix, converte para reais e faz ' +
          'o KYC (a checagem de identidade com CPF e documento). O preço dessa ' +
          'comodidade é o risco de contraparte: se a empresa quebrar, for hackeada ou ' +
          'congelar saques, você depende dela — como se viu nos colapsos da FTX, ' +
          'Celsius e Mt. Gox.',
        'Uma hot wallet (carteira quente) — como Phantom, na Solana, ou MetaMask, nas ' +
          'redes EVM, também citadas só como exemplos — é um programa no seu celular ou ' +
          'navegador em que você guarda as chaves, mas o aparelho está conectado à ' +
          'internet. É grátis, conecta em aplicativos descentralizados e é o que se usa ' +
          'para negociar on-chain. Como vive on-line, fica exposta a phishing, a ' +
          'drainers e a vírus.',
        'Uma cold wallet (carteira fria) — os aparelhos da Ledger e outros fabricantes ' +
          'de hardware — guarda as chaves num dispositivo físico que fica offline. As ' +
          'chaves nunca tocam a internet, o que a torna a melhor opção para guardar ' +
          'valores por muito tempo. Em troca, custa dinheiro e é menos prática para ' +
          'trocas rápidas.',
      ],
    },
    {
      id: 'quando-cada-carteira-faz-sentido',
      aba: 'carteiras',
      titulo: 'Em que situação cada carteira faz sentido',
      paragrafos: [
        'Não existe "a melhor" carteira; existe a certa para cada uso. Para o primeiro ' +
          'contato — comprar cripto com Pix e experimentar — a corretora costuma ser o ' +
          'ponto de partida, porque resolve conversão, KYC e suporte num só lugar. A ' +
          'regra prática que muita gente adota é não deixar na corretora mais do que se ' +
          'está disposto a perder num eventual bloqueio ou incidente.',
        'Para usar aplicativos on-chain e negociar memecoins, a carteira quente é a ' +
          'ferramenta, porque conecta nos sites e assina transações. Uma prática de ' +
          'segurança muito citada é manter uma carteira quente separada só para trade, ' +
          'com pouco saldo, isolada da carteira onde você guarda o grosso do ' +
          'patrimônio.',
        'Para guardar valor por muito tempo ("hodl"), a carteira fria é a categoria ' +
          'indicada, justamente porque tira as chaves da internet. Muitos usuários ' +
          'combinam as três: corretora para entrar e sair em reais, carteira quente com ' +
          'pouco dinheiro para operar, e carteira fria para o que não vai ser mexido tão ' +
          'cedo. Nada disso é recomendação — é a descrição de como as categorias se ' +
          'encaixam.',
      ],
    },
    {
      id: 'criar-primeira-carteira',
      aba: 'carteiras',
      titulo: 'Como criar sua primeira carteira, passo a passo',
      ordenada: true,
      paragrafos: [
        'Antes de tudo, prepare o terreno: atualize o sistema operacional, remova ' +
          'extensões de navegador que você não reconhece, tenha papel e caneta à mão e ' +
          'evite Wi-Fi público. Este é um passo a passo genérico por categoria (carteira ' +
          'de navegador/celular e carteira de hardware); nomes de produtos aparecem só ' +
          'como exemplos da categoria, nunca como recomendação de uso.',
      ],
      lista: [
        'Baixe apenas da fonte oficial e confira a URL. Para carteira de navegador/celular, use o site oficial ou a loja oficial do aparelho, conferindo a URL letra por letra. Para carteira de hardware, compre no site do fabricante ou revendedor autorizado, evitando aparelho usado e inspecionando se a embalagem não foi violada. NUNCA baixe a partir de anúncio patrocinado em buscador: golpistas já compraram anúncios do Google mirando quem procurava carteiras conhecidas e levaram vítimas a domínios falsos que roubaram a frase-semente e esvaziaram as carteiras.',
        'Crie carteira nova, não importe. Escolha "criar nova carteira", não "importar" — a opção importar é para quem já tem uma frase, e é justamente ela que os sites falsos exploram para capturar sua frase. NUNCA importe nada num site que você não digitou você mesmo.',
        'Anote a frase-semente no papel. O app mostra as 12/24 palavras uma a uma; escreva na ordem e numeradas (1, 2, 3...). NUNCA fotografe, faça print ou salve em nuvem/bloco de notas.',
        'Confirme a frase. O app pede para você reinserir palavras em posições específicas ("qual é a palavra 9? e a 3?"). Isso prova que você anotou certo. NUNCA pule esta etapa achando que "depois anoto".',
        'Defina senha/PIN local. Essa senha (ou PIN) destranca o app naquele aparelho — é diferente da frase-semente. Se você perder o aparelho, é a frase (não a senha) que recupera tudo em outro dispositivo. NUNCA confunda as duas nem reutilize uma senha de outro serviço.',
        'Faça um teste com valor pequeno. Antes de mover quantia relevante, envie um valor mínimo, confira que chegou e envie de volta. NUNCA transfira tudo de uma vez sem o teste.',
        'Verifique o endereço recebido no explorador. Cole seu endereço no explorador de blocos e confirme que a transação de teste aparece com o valor certo. NUNCA confie só na tela do app — a blockchain é a fonte da verdade.',
      ],
    },

    // ================================== SEED PHRASE ==================================
    {
      id: 'seed-e-carteira',
      aba: 'seed',
      titulo: 'Frase-semente: por que 12 ou 24 palavras SÃO a carteira',
      paragrafos: [
        'A frase-semente (também chamada seed phrase, frase de recuperação ou ' +
          'mnemônica) é uma lista de 12 ou 24 palavras que a carteira gera quando você a ' +
          'cria. Ela segue um padrão chamado BIP-39, que usa uma lista fixa de 2.048 ' +
          'palavras. O aparelho pega uma quantidade de aleatoriedade (entropia), ' +
          'acrescenta uns bits de verificação (checksum, para detectar erros de ' +
          'digitação) e mapeia cada pedaço de 11 bits para uma palavra da lista. 128 ' +
          'bits de entropia viram 12 palavras; 256 bits viram 24 palavras.',
        'O ponto mais importante: as palavras não são só um backup — elas geram a ' +
          'carteira inteira. A frase passa por uma função de embaralhamento ' +
          '(PBKDF2-HMAC-SHA512) e produz uma "semente" de 512 bits. A partir dela, o ' +
          'padrão BIP-32 cria uma árvore de chaves (carteira determinística ' +
          'hierárquica, ou HD), e o BIP-44 organiza essa árvore por moeda e conta. Por ' +
          'isso a mesma frase recria a mesma carteira, com todas as contas e endereços, ' +
          'em qualquer aplicativo compatível. Consequência prática: quem tem as 12/24 ' +
          'palavras tem todo o seu dinheiro, para sempre, em qualquer dispositivo — não ' +
          'precisa da sua senha nem do seu aparelho.',
        'A outra face da mesma moeda: se você perder as palavras e o aparelho quebrar, ' +
          'ninguém no mundo recupera o seu dinheiro — não há "esqueci minha senha". ' +
          'Guardar a seed com segurança é, portanto, a habilidade de segurança número um ' +
          'de todo o módulo.',
      ],
    },
    {
      id: 'formas-de-perder-tudo',
      aba: 'seed',
      titulo: 'As formas concretas de perder tudo pela seed',
      paragrafos: [
        'A regra de ouro é curta: ninguém legítimo jamais pede a sua seed phrase. ' +
          'Nenhum suporte, nenhuma corretora, nenhum airdrop, nenhum "verificador de ' +
          'carteira". Todo pedido de seed é golpe, sem exceção. Digitar as 12/24 ' +
          'palavras num site é entregar a carteira de mão beijada.',
      ],
      lista: [
        'Tirar foto da frase no celular, fazer print de tela, ou salvá-la na nuvem (Google Drive, iCloud, e-mail, WhatsApp) — se a nuvem ou o celular for invadido, a frase vai junto.',
        'Salvar num arquivo de texto no PC ou no gerenciador de senhas do navegador.',
        'Digitar a frase num site de phishing que imita a sua carteira, prometendo um airdrop ou "resgate" — nunca se digita a frase-semente em site nenhum.',
        'Cair em falso "suporte" (por Discord, Telegram, X/Twitter, e-mail) que pede a frase — suporte legítimo nunca pede a frase-semente.',
        'Malware infostealer (ladrão de informações), que varre a máquina atrás de arquivos, dados de extensões de carteira e da área de transferência. Famílias como RedLine e Lumma copiam arquivos de carteira (wallet.dat), dados de extensões de navegador (por exemplo MetaMask) e monitoram o clipboard atrás de frases e endereços.',
      ],
    },
    // =================================== GOLPES ===================================
    {
      id: 'wallet-drainers-conceito',
      aba: 'golpes',
      titulo: 'Wallet drainers: o golpe que não rouba a sua seed',
      paragrafos: [
        'Um wallet drainer ("esvaziador de carteira") é um kit de golpe, geralmente ' +
          'hospedado num site de phishing, que induz a vítima a assinar uma transação ou ' +
          'assinatura maliciosa — e então esvazia a carteira, sem precisar da sua seed. ' +
          'É uma mudança de mentalidade importante: você pode ter guardado a frase ' +
          'perfeitamente e ainda assim perder tudo por causa de uma assinatura.',
        'Esses golpes viraram uma indústria chamada "drainer-as-a-service" (DaaS, ' +
          'drenador como serviço): um grupo de desenvolvedores cria o kit e o "aluga" ' +
          'para golpistas menores (os "afiliados"), que espalham os sites falsos; quando ' +
          'o roubo acontece, um contrato divide automaticamente o dinheiro entre os ' +
          'dois. Um estudo revisado por pares apresentado na conferência ACM Internet ' +
          'Measurement Conference de 2025 (He et al., Universidade de Zhejiang com a ' +
          'BlockSec) mediu esse mercado no Ethereum entre 1º de março de 2023 e 1º de ' +
          'abril de 2025: US$ 135 milhões roubados de 76.582 vítimas, dos quais US$ ' +
          '111,9 milhões foram para afiliados e US$ 23,1 milhões para operadores, ' +
          'distribuídos por 1.910 contratos de partilha de lucro, 56 operadores e 6.087 ' +
          'afiliados. Segundo o estudo, os afiliados ficam "tipicamente com 80% a 90%" ' +
          'do roubo — a divisão mais comum é 80% para o afiliado e 20% para o operador, ' +
          'com a fatia do operador variando de 10% a 40% entre os contratos observados. ' +
          'Um piso de 75% para o afiliado também aparece em material de recrutamento de ' +
          'uma dessas operações (relatório da Recorded Future/Insikt Group sobre o grupo ' +
          '"Rublevka Team", que anunciava "starting percentage of 75% and 80% for ' +
          '\'experienced users\'"). Um caso concreto documentado pela própria Ledger: no ' +
          'incidente do Angel Drainer associado ao ataque à biblioteca Ledger Connect ' +
          'Kit (dezembro de 2023), a divisão observada foi 85% para o atacante e 15% ' +
          'para o kit.',
        'A boa notícia é que o volume caiu muito. Segundo a Scam Sniffer, as perdas com ' +
          'drainers em redes EVM foram de cerca de US$ 295,5 milhões em 2023 (mais de ' +
          '324.000 vítimas, maior roubo isolado de US$ 24 milhões), subiram para cerca ' +
          'de US$ 494 milhões em 2024 (mais de 332.000 carteiras, alta de 67% sobre ' +
          '2023, maior roubo isolado de US$ 55,48 milhões) e caíram 83% em 2025, para ' +
          'cerca de US$ 83,85 milhões (106.106 carteiras, queda de 68% no número de ' +
          'vítimas; maior roubo isolado de US$ 6,5 milhões via assinatura Permit, em ' +
          'setembro; só 11 casos acima de US$ 1 milhão, contra 30 em 2024). A própria ' +
          'Scam Sniffer avisa que a queda acompanhou o mercado como um todo, e que "à ' +
          'medida que drainers antigos saem, novos surgem" — o ecossistema segue ativo.',
        'Para dimensionar um caso concreto de DaaS: o Inferno Drainer, entre novembro de ' +
          '2022 e novembro de 2023, é estimado pelo Group-IB (citando dados da Scam ' +
          'Sniffer) em mais de US$ 80 milhões roubados de cerca de 137.000 vítimas, ' +
          'usando mais de 16.000 domínios únicos e imitando mais de 100 marcas cripto.',
      ],
    },
    {
      id: 'roteiro-do-golpe-passo-a-passo',
      aba: 'golpes',
      titulo: 'O roteiro do golpe, passo a passo',
      paragrafos: [
        'Entender a sequência desarma o golpe. Primeiro vem a isca: um falso airdrop, ' +
          'um "mint" de NFT, um falso suporte ou um anúncio patrocinado que aparece ' +
          'quando você pesquisa o nome de um site. Você clica e chega a um site que ' +
          'imita o verdadeiro.',
        'Depois você conecta a carteira. Esse passo, sozinho, é inofensivo: conectar só ' +
          'permite que o site veja seus saldos públicos — não move nada. O problema é o ' +
          'passo seguinte. O site pede uma assinatura disfarçada de "claim" ' +
          '("resgatar"), "login" ou "verificação". É aqui que o golpe acontece: a ' +
          'assinatura, na verdade, concede uma permissão sobre seus tokens.',
        'Com a permissão em mãos, o atacante usa a função transferFrom (uma ordem que ' +
          'diz "transfira daquele endereço para o meu") para levar seus tokens. Como a ' +
          'permissão foi você quem deu, a blockchain considera tudo legítimo e a ' +
          'transferência é irreversível. Repare no ponto de virada: o dano não está em ' +
          'conectar, e sim em assinar. A defesa central é ler o que a carteira mostra ' +
          'antes de confirmar e desconfiar de qualquer "assinar mensagem" vindo de um ' +
          'site que você não abriu digitando o endereço você mesmo.',
      ],
    },
    {
      id: 'vetores-tecnicos',
      aba: 'golpes',
      titulo: 'Os vetores técnicos que você precisa reconhecer',
      paragrafos: [
        'Os drainers usam alguns truques específicos, e vale conhecer o nome de cada ' +
          'um. O approval ilimitado de ERC-20: ERC-20 é o padrão dos tokens nas redes ' +
          'EVM, e "approval" é a permissão que você dá a um contrato para gastar seus ' +
          'tokens. Sites legítimos pedem approval para funcionar, mas golpistas pedem um ' +
          'approval de valor ilimitado, que deixa o contrato livre para esvaziar aquele ' +
          'token quando quiser — sem nova interação sua. Aprovações "dormentes" e ' +
          'ilimitadas foram, por anos, a maior categoria de perdas em DeFi.',
        'As mensagens Permit e Permit2 são um segundo vetor, mais sutil. Elas são ' +
          'assinaturas "sem gás" (sem taxa) feitas por um padrão chamado EIP-712, e ' +
          'aparecem na carteira como um inofensivo "assinar mensagem", não como uma ' +
          'transação — o que engana a vítima. O Permit2, contrato criado pela Uniswap e ' +
          'hoje muito usado (no mesmo endereço 0x000000000022D473030F116dDEE9F6B43aC78BA3 ' +
          'em várias redes EVM), concentra permissões de vários tokens. Segundo o ' +
          'relatório anual da Scam Sniffer de 2024, os tipos de assinatura de phishing ' +
          'se dividiram em Permit (56,7% dos roubos), setOwner (31,9%), Transfer (4,5%) ' +
          'e increaseAllowance (3,5%), com a rede Ethereum concentrando 85,3% das perdas ' +
          '(cerca de US$ 152 milhões). Em 2025, Permit/Permit2 seguiram como as ' +
          'ferramentas mais eficazes dos golpistas, respondendo por 38% das perdas nos ' +
          'casos acima de US$ 1 milhão.',
        'Ainda há o setApprovalForAll de NFT (ERC-721/ERC-1155): essa função dá a um ' +
          '"operador" o direito de gerenciar todos os seus NFTs de uma coleção de uma só ' +
          'vez. É o que faz um marketplace legítimo funcionar — e é também o primitivo ' +
          'por trás de quase toda drenagem de NFT por phishing. Um único clique pode ' +
          'entregar a coleção inteira.',
        'Um vetor novo, surgido em 2025 e que merece atenção redobrada, é o EIP-7702 — ' +
          'tratado em detalhe na aba "Defesa", junto com as duas camadas do Permit2.',
      ],
    },
    {
      id: 'address-poisoning-e-clipper',
      aba: 'golpes',
      titulo: 'Address poisoning e clipper: quando o alvo é o endereço',
      paragrafos: [
        'Nem todo golpe passa por assinatura. O address poisoning ("envenenamento de ' +
          'endereço") explora um hábito: como os endereços são enormes, a gente confere ' +
          'só os primeiros e últimos caracteres. O golpista gera um endereço parecido ' +
          '(mesmo começo e mesmo fim) e envia para você uma transação minúscula, só para ' +
          '"sujar" o seu histórico. Depois, quando você for enviar de novo e copiar um ' +
          'endereço do histórico, pode copiar o do golpista sem perceber. Um estudo ' +
          'acadêmico da Carnegie Mellon University ("Blockchain Address Poisoning", ' +
          'apresentado no USENIX Security Symposium de 2025) mediu Ethereum e BNB Chain ' +
          'de julho de 2022 a junho de 2024 e identificou 270 milhões de tentativas de ' +
          'ataque contra 17 milhões de vítimas, com 6.633 incidentes bem-sucedidos e ao ' +
          'menos US$ 83,8 milhões em perdas.',
        'O clipper malware é um vírus no seu aparelho que vigia a área de transferência ' +
          '(o "copiar e colar"). Quando ele detecta que você copiou um endereço de ' +
          'cripto, troca silenciosamente pelo endereço do atacante no momento em que ' +
          'você cola. Você copiou o endereço certo, mas cola o errado — e, como a ' +
          'transação é irreversível, o dinheiro se perde. Variantes sofisticadas usam ' +
          'endereços parecidos com o seu de verdade, para enganar quem confere só os ' +
          'primeiros caracteres depois de colar.',
        'A defesa contra os dois é a mesma disciplina: nunca confiar no começo-e-fim do ' +
          'endereço, conferir a linha inteira e, acima de tudo, enviar sempre uma ' +
          'transação-teste de valor baixo antes de mandar um valor alto. Uma carteira ' +
          'fria ajuda muito aqui, porque mostra o endereço de destino na telinha do ' +
          'próprio aparelho, fora do alcance do clipper.',
      ],
    },

    // =================================== DEFESA ===================================
    {
      id: 'revogar-aprovacoes',
      aba: 'defesa',
      titulo: 'Revogação de aprovações: como e o que ela não resolve',
      paragrafos: [
        'Como o dano dos drainers vem de permissões que ficam ativas para sempre, ' +
          'existe uma higiene simples: revisar e revogar approvals periodicamente. A ' +
          'ferramenta mais usada é o Revoke.cash, que cobre mais de 100 redes (o próprio ' +
          'site se descreve como "the biggest and most popular tool for revoking token ' +
          'approvals") e permite consultar suas permissões digitando o endereço (ou um ' +
          'nome ENS) sem conectar a carteira — mais seguro para só olhar. Para ' +
          'efetivamente revogar, aí sim você conecta a carteira, filtra e clica em ' +
          '"Revoke", o que gera uma transação e custa uma pequena taxa de gas.',
        'Os próprios exploradores também têm essa função: o Token Approval Checker do ' +
          'Etherscan (e os equivalentes no BscScan e no Basescan) lista os contratos ' +
          'aprovados a gastar seus tokens, mostra o "valor em risco" e tem um botão ' +
          '"Revoke" para cada um, navegando entre os padrões ERC-20, ERC-721 e ERC-1155.',
        'O ponto mais importante é o que a revogação NÃO resolve. Ela impede usos ' +
          'futuros da permissão, mas não recupera o que já saiu — nas próprias palavras ' +
          'do FAQ do Revoke.cash: "it cannot be used to recover any stolen funds". ' +
          'Revogar também não desfaz uma frase-semente comprometida (se alguém tem sua ' +
          'seed, a pessoa controla a carteira toda; a única saída é migrar tudo para uma ' +
          'carteira nova) e não protege contra malware ainda instalado na máquina (se há ' +
          'um infostealer ou clipper rodando, ele continua atuando). Regra de ouro: ' +
          'revogar interrompe gastos futuros; não é um botão de "desfazer".',
      ],
    },
    {
      id: 'duas-camadas-permit2-e-eip7702',
      aba: 'defesa',
      titulo: 'As duas camadas do Permit2 e o vetor novo (EIP-7702)',
      paragrafos: [
        'O Permit2 tem uma peculiaridade que confunde: ele guarda permissões em duas ' +
          'camadas. A primeira é o approval comum de ERC-20 que você deu ao contrato do ' +
          'Permit2 (geralmente ilimitado). A segunda são as sub-permissões que o Permit2 ' +
          'concede em seu nome, para cada app, já com valor e prazo de expiração (o app ' +
          'da Uniswap, por exemplo, costuma usar aprovação de 30 dias). Para a primeira ' +
          'camada, você revoga o approval normalmente; para a segunda, o Permit2 tem ' +
          'duas funções: lockdown, que revoga várias permissões de uma vez ("batch ' +
          'revoking approvals", nas palavras do próprio código da Uniswap), e ' +
          'invalidateNonces, que anula assinaturas que você já assinou mas que ainda não ' +
          'foram usadas. O Revoke.cash mostra as duas camadas em abas separadas, o que é ' +
          'mais fácil do que chamar o contrato na mão. O lado bom do Permit2 é que as ' +
          'permissões expiram sozinhas, eliminando a "aprovação ilimitada dormente"; o ' +
          'lado ruim é que o risco migra para a assinatura — uma assinatura EIP-712 ' +
          'maliciosa é mais fácil de conseguir porque não custa gas.',
        'O vetor mais novo que quem começa em 2026 precisa conhecer é o EIP-7702, ' +
          'ativado na atualização "Pectra" do Ethereum em maio de 2025. Ele permite que ' +
          'uma carteira comum passe a agir como um contrato inteligente e execute várias ' +
          'ações numa só transação. O problema: golpistas passaram a embutir, numa única ' +
          'assinatura disfarçada de troca rotineira, uma "delegação" que dá controle do ' +
          'endereço a um contrato do atacante, que então esvazia tudo de uma vez.',
        'Casos reais já apareceram: em 24 de maio de 2025, uma vítima perdeu cerca de ' +
          'US$ 146,5 mil num ataque EIP-7702 ligado ao grupo Inferno Drainer (analisado ' +
          'pela SlowMist); em 24 de agosto de 2025, outra vítima perdeu mais de US$ 1,54 ' +
          'milhão pela mesma técnica (monitorada pela Scam Sniffer). A lição é a mesma ' +
          'de sempre, agora ainda mais forte: uma assinatura pode valer a carteira ' +
          'inteira — leia sempre o que a carteira pede antes de confirmar.',
      ],
    },
    {
      id: 'tutorial-revogar-clique-a-clique',
      aba: 'defesa',
      titulo: 'Tutorial de como revogar uma aprovação, clique a clique',
      paragrafos: [
        'Esta seção é só o passo a passo operacional; a teoria (o que a revogação ' +
          'resolve, as duas camadas do Permit2) está na seção anterior.',
      ],
      // Dois procedimentos distintos (Revoke.cash e Etherscan), cada um com sua
      // própria numeração — por isso `subListas`, e não `lista`.
      subListas: [
        {
          titulo: 'No Revoke.cash',
          passos: [
            'Abra o site oficial revoke.cash conferindo a URL letra por letra. Prefira digitar o endereço você mesmo; nunca chegue por link recebido de terceiros.',
            'Clique em "Connect Wallet" para conectar a carteira OU cole seu endereço/ENS na barra de busca para ver em modo somente-leitura. No modo somente-leitura você vê tudo, mas para efetivamente revogar precisa conectar a carteira.',
            'Selecione a rede no menu suspenso (o site abre em Ethereum por padrão; troque para BNB Chain, Base, Polygon etc. conforme o caso).',
            'Leia a lista de aprovações. Cada linha mostra o token, o "spender" (quem tem permissão), o valor aprovado e a idade da aprovação.',
            'Ordene de "Newest to Oldest" para achar depressa uma aprovação suspeita que você tenha assinado minutos ou horas antes, ou busque pelo endereço do spender.',
            'Clique em "Revoke" na aprovação-alvo. A carteira abre um pop-up: confirme a transação e pague o gas. Cada revogação é uma transação onchain.',
            'Confira a aba do Permit2 e revogue também as permissões internas que não usa (a segunda camada, ver seção anterior).',
          ],
        },
        {
          titulo: 'No Token Approval Checker do Etherscan',
          passos: [
            'No etherscan.io, abra o menu "More" na barra de navegação e clique em "Token Approvals".',
            'Cole seu endereço de carteira (ou conecte a carteira).',
            'Selecione o tipo de token (ERC-20, ERC-721 ou ERC-1155) e ative "Show all approvals" para não perder nenhuma.',
            'Localize a aprovação e clique em "Revoke", confirmando a transação na carteira e pagando o gas.',
          ],
        },
      ],
      lista: [
        'Custo e prioridade: como cada revogação custa gas, revogue primeiro as aprovações de maior valor e de contratos que você não reconhece; deixe as pequenas e conhecidas para depois. Escolher janelas de rede mais vazia deixa o gas mais barato.',
      ],
    },
    {
      id: 'plano-de-emergencia',
      aba: 'defesa',
      titulo: 'Plano de emergência: os primeiros 10 minutos se você descobrir que foi drenado',
      ordenada: true,
      paragrafos: [
        'Aja em ordem de prioridade. Este material não promete recuperação — na ' +
          'prática, a chance de reaver os fundos é baixa.',
      ],
      lista: [
        'Assuma que o dispositivo pode estar comprometido e pare de usá-lo. Se houve malware (infostealer ou clipper), continuar usando a mesma máquina/celular espalha o dano. Só volte a operar de um dispositivo limpo.',
        'Migre o que sobrou para uma carteira NOVA, criada num dispositivo limpo. Alerta crítico: não adianta mover para uma carteira "nova" derivada da MESMA frase-semente — se a frase vazou, todas as contas dela estão comprometidas, em todas as redes. Tem que ser uma frase-semente inteiramente nova.',
        'Resgate na ordem de valor. Tire primeiro os ativos de maior valor; garanta que há gas suficiente na carteira para conseguir enviar (sem gas, a transferência não sai).',
        'Cuidado com os "sweeper bots". Se a frase vazou, o atacante costuma deixar um bot automático vigiando a carteira, que esvazia qualquer valor (inclusive o gas) assim que chega, em segundos. Por isso "depositar gas para salvar tokens" costuma fracassar: o bot leva o gas primeiro. A própria central de ajuda da MetaMask recomenda, nesses casos, abandonar a carteira e criar uma nova.',
        'Revogue aprovações SE a frase NÃO foi comprometida. Se o golpe foi apenas uma assinatura/approve malicioso (e não o vazamento da frase), revogar corta o vazamento futuro. Se a frase ou a chave privada vazou, revogar não adianta — o atacante controla tudo.',
        'Registre evidências: hashes das transações, prints de tela, a URL do site do golpe, data e horário. Isso é essencial para qualquer denúncia.',
        'Reporte: faça boletim de ocorrência na delegacia; registre em plataformas de denúncia como Chainabuse e Scam Sniffer; e avise a corretora se os fundos foram parar numa CEX (ela pode conseguir congelar, se você agir rápido).',
        'Desconfie de "serviços de recuperação" que cobram adiantado. É um golpe secundário extremamente comum, que revitimiza quem já perdeu. O FBI, no alerta público IC3 I-072026 (20 de julho de 2026), afirma que "IC3 will never ask for payment to recover lost funds, nor will IC3 refer someone to a company requesting payment for recovering funds" e que "IC3 does not maintain any social media presence". Qualquer pessoa ou serviço que prometa "recuperar seu cripto" mediante taxa adiantada, ou que apareça sozinho no seu Telegram/Discord, é quase sempre um novo golpe.',
      ],
    },

    // =================================== BRASIL ===================================
    {
      id: 'sacar-para-reais',
      aba: 'brasil',
      titulo: 'Sacar para reais no Brasil: Pix, KYC e P2P',
      paragrafos: [
        'Para virar reais, o caminho mais comum é uma corretora centralizada (CEX) que ' +
          'aceita Pix e faz KYC (Know Your Customer, a verificação de identidade ' +
          'obrigatória). Você vende a cripto, o valor vira reais e você saca via Pix ' +
          'para sua conta. O outro caminho é o P2P (pessoa para pessoa), em que você ' +
          'negocia direto com outra pessoa. O P2P tem risco de contraparte sério: a ' +
          'outra pessoa pode não pagar, pode pagar e depois pedir estorno, ou o dinheiro ' +
          'recebido pode ter origem em fraude — e sua conta bancária pode ser bloqueada ' +
          'se receber valores "sujos". Sistemas de garantia (escrow) das plataformas ' +
          'reduzem, mas não eliminam esse risco. Regra prática: nunca libere a cripto ' +
          'antes de confirmar que o Pix caiu de fato na sua conta.',
        'Sobre o arranjo Binance + Z.ro Bank (Pix): o lançamento oficial foi anunciado ' +
          'em 20 de maio de 2025, integrando o Binance Pay ao Pix — segundo a empresa, a ' +
          'primeira vez que o Binance Pay foi integrado a um sistema nacional de ' +
          'pagamentos no mundo; a operacionalização foi anunciada como feita pelo Z.ro ' +
          'Bank, instituição de pagamento autorizada pelo Banco Central. Se esse arranjo ' +
          'continua idêntico em setembro de 2026: NÃO VERIFICADO (ver a seção de fontes ' +
          'no fim do módulo).',
      ],
    },
    {
      id: 'marco-regulatorio-psav',
      aba: 'brasil',
      titulo: 'O novo marco regulatório: PSAVs e a saída de corretoras do varejo',
      paragrafos: [
        'Depois de anos de espera, o Banco Central publicou em 10 de novembro de 2025 ' +
          'as Resoluções BCB 519, 520 e 521, que regulamentam as PSAVs (Prestadoras de ' +
          'Serviços de Ativos Virtuais — as corretoras, intermediárias e custodiantes), ' +
          'fruto das Consultas Públicas 109, 110 e 111 de 2024. As três entraram em ' +
          'vigor em 2 de fevereiro de 2026. Elas estendem às empresas de cripto regras ' +
          'de prevenção à lavagem de dinheiro, governança, segurança, transparência e ' +
          'segregação de recursos de clientes, e classificam as PSAVs em modalidades ' +
          '(intermediária, custodiante e corretora). Empresas já em operação têm prazo ' +
          'até 30 de outubro de 2026 para pedir autorização.',
        'O efeito prático já é visível: em 2026, corretoras como Bitso, Coinext, ' +
          'NovaDAX, Digitra e Bitnuvem anunciaram o encerramento das operações de varejo ' +
          'no Brasil, citando o custo de se adequar à nova regulação — a Bitso ' +
          'transferindo sua base de clientes para o Mercado Bitcoin (setembro de 2026) e ' +
          'a Coinext anunciando o fim das atividades em 3 de setembro de 2026. Mercado ' +
          'Bitcoin e Foxbit seguiam operando na data desta pesquisa. Por isso, os nomes ' +
          'de corretoras citados neste módulo são sempre exemplos de categoria, nunca ' +
          'recomendação — e qualquer lista de "quais operam" envelhece rápido; antes de ' +
          'usar uma corretora, verifique se ela é uma PSAV autorizada pelo Banco ' +
          'Central.',
        'Em 30 de abril de 2026, o BC publicou a Resolução BCB 561, que veda o uso de ' +
          'ativos virtuais/stablecoins como meio de liquidação em operações de câmbio ' +
          'eletrônico (eFX) — pagamentos internacionais —, com entrada em vigor em 1º de ' +
          'outubro de 2026. Atenção: essa norma não proíbe stablecoins no Brasil; ela ' +
          'restringe seu uso na "canalização" de pagamentos internacionais por ' +
          'prestadores de eFX. Comprar, vender e guardar cripto internamente segue ' +
          'permitido.',
      ],
    },
    {
      id: 'golpes-comuns-no-brasil',
      aba: 'brasil',
      titulo: 'Golpes comuns no Brasil',
      paragrafos: [
        'Falso robô de trade / robô de arbitragem. Prometem rendimento fixo ' +
          'automatizado por um "robô" que compraria e venderia sozinho sempre com lucro ' +
          '— o que é impossível em mercado de risco. O caso emblemático brasileiro é a ' +
          'Atlas Quantum, que dizia ter um robô de arbitragem de Bitcoin chamado ' +
          '"Quantum". A CVM determinou em 2019 que a empresa parasse de ofertar ' +
          'publicamente o serviço (Deliberação CVM nº 826, de 13 de agosto de 2019) e, ' +
          'em julgamento do Colegiado em 21 de maio de 2024, aplicou multas que somaram ' +
          'mais de R$ 55,8 milhões aos envolvidos por operação fraudulenta e embaraço à ' +
          'fiscalização. As estimativas de prejuízo e de número de vítimas variam muito ' +
          'entre as fontes de imprensa (de cerca de R$ 1,1 bilhão e 47 mil investidores ' +
          'até cerca de R$ 7 bilhões e 200 mil pessoas) — não há um número oficial único ' +
          'consolidado.',
        'Grupos de sinais. Grupos de Telegram/WhatsApp que vendem "sinais" de compra. Há ' +
          'dois problemas típicos. Primeiro, o pump and dump (inflar e despejar): o ' +
          'organizador compra a moeda barato antes, manda o grupo comprar num dia e ' +
          'horário combinados, o preço sobe com essa enxurrada de ordens, e ele vende no ' +
          'topo — deixando os membros comprados no prejuízo. Segundo, o conflito de ' +
          'interesse: muitas vezes o "trader" ganha comissão por afiliação de uma ' +
          'corretora, ou seja, ele lucra com o seu volume de operações, não com o seu ' +
          'resultado — quanto mais você opera e perde, mais ele fatura.',
        'Pirâmide disfarçada de fundo cripto. É um esquema Ponzi: paga os investidores ' +
          'antigos com o dinheiro dos novos, sem geração real de lucro, até a estrutura ' +
          'desabar. No Brasil, a CVM comunica o mercado por meio de alertas de suspensão ' +
          '(as chamadas stop orders), que podem determinar a interrupção imediata da ' +
          'atividade irregular sob pena de multa; e o Ministério Público atua nas ' +
          'esferas cível e criminal.',
        'Golpe do falso investimento por WhatsApp (pig butchering). Um "assessor" aborda ' +
          'por mensagem (perfil falso), constrói confiança — às vezes afetiva — por ' +
          'semanas, apresenta uma plataforma falsa que mostra lucros crescentes na tela ' +
          'e induz depósitos cada vez maiores. Quando a vítima tenta sacar, o saque é ' +
          'bloqueado e pedem mais depósitos ou uma "taxa" para liberar. A própria CVM, ' +
          'no Portal do Investidor (6 de outubro de 2025), descreve o golpe e estima que ' +
          'o prejuízo global tenha ultrapassado US$ 75 bilhões entre 2020 e 2024, com ' +
          'parte significativa em criptoativos. No Brasil o esquema já causou perdas ' +
          'milionárias individuais: na Operação Criptoabate, deflagrada pela Polícia ' +
          'Civil do Rio Grande do Sul em 13 de agosto de 2026, uma vítima transferiu R$ ' +
          '37 milhões ao longo de seis meses para plataformas indicadas por um falso ' +
          '"professor" num grupo de WhatsApp, e a investigação revelou uma estrutura com ' +
          'mais de R$ 30 bilhões em transações suspeitas.',
      ],
      lista: [
        'Sinais de alerta comuns a todos: promessa de rendimento fixo ou garantido; pressão por urgência ("é agora ou nunca"); exigência de recrutar outras pessoas; saque bloqueado até um novo depósito ou o pagamento de uma "taxa"; empresa sem registro/autorização.',
        'Como se defender: antes de colocar dinheiro, consulte os alertas e stop orders da CVM (gov.br/investidor) e verifique se a instituição é autorizada a funcionar pelo Banco Central (gov.br/bcb.gov.br). Estar numa lista de alerta, ou não constar entre as autorizadas, é um forte sinal de perigo.',
      ],
    },
    {
      id: 'impostos',
      aba: 'brasil',
      titulo: 'Impostos: a obrigação existe (e este módulo não ensina a calcular)',
      paragrafos: [
        'Este material não dá orientação tributária — o objetivo aqui é só deixar claro ' +
          'que a obrigação existe. No Brasil, cripto é tratada como bem sujeito a ' +
          'tributação sobre ganho de capital, e há também obrigações de declaração. As ' +
          'regras mudaram nos últimos anos com a Lei 14.754/2023 (a "Lei das ' +
          'Offshores") e com novas normas da Receita Federal — a partir de julho de ' +
          '2026, a plataforma DeCripto (instituída pela IN RFB nº 2.291/2025, alinhada ' +
          'ao padrão internacional CARF da OCDE) amplia a fiscalização, exigindo que ' +
          'plataformas informem as operações à Receita Federal.',
        'A mensagem para quem está começando é dupla: primeiro, vender ou trocar cripto ' +
          'pode gerar imposto e ter prazo; segundo, guardar registro de todas as ' +
          'operações (datas, valores, taxas) é o que permite calcular corretamente. ' +
          'Como qualquer erro pode levar à malha fina, consulte um contador para o seu ' +
          'caso concreto.',
      ],
    },
  ],

  // ---------------------------------------------------------------------------
  // Tabela comparativa (aba "Carteiras")
  // ---------------------------------------------------------------------------
  tabelaCarteiras: {
    colunas: [
      { chave: 'custodia', rotulo: 'Quem guarda as chaves' },
      { chave: 'pros', rotulo: 'Prós' },
      { chave: 'contras', rotulo: 'Contras' },
    ],
    linhas: [
      {
        id: 'cex',
        titulo: 'CEX (corretora centralizada)',
        subtitulo: 'Binance, Mercado Bitcoin — exemplos de categoria',
        valores: {
          custodia: 'A empresa guarda as chaves por você, como um banco (custódia de terceiro).',
          pros: 'Fácil de usar; aceita Pix e entrada/saída em reais; faz KYC; tem suporte.',
          contras: 'Você não controla as chaves ("not your keys, not your coins"); risco de bloqueio de conta, hack ou encerramento da plataforma.',
        },
        detalheExtra:
          'Colapsos como FTX, Celsius e Mt. Gox mostraram que quem deixou fundos na ' +
          'plataforma perdeu acesso quando ela faliu. No Brasil, desde 2 de fevereiro de ' +
          '2026 só devem seguir operando no varejo as corretoras que obtiverem ' +
          'autorização de PSAV do Banco Central (prazo para pedir: 30 de outubro de ' +
          '2026); Bitso, Coinext, NovaDAX, Digitra e Bitnuvem já anunciaram saída do ' +
          'varejo em 2026 por causa do custo de adequação.',
      },
      {
        id: 'hot-wallet',
        titulo: 'Hot wallet (carteira quente)',
        subtitulo: 'Phantom (Solana), MetaMask (EVM) — exemplos de categoria',
        valores: {
          custodia: 'Você guarda as chaves, mas num aparelho conectado à internet.',
          pros: 'Grátis; conecta em aplicativos descentralizados; é o que se usa para negociar on-chain.',
          contras: 'Exposta a phishing, drainers e malware; uma assinatura errada pode esvaziá-la.',
        },
        detalheExtra:
          'A entropia (aleatoriedade) é gerada pelo próprio dispositivo, considerada ' +
          'menos robusta que a de um chip dedicado de hardware wallet. Prática comum: ' +
          'manter uma carteira quente separada só para trade, com pouco saldo, isolada ' +
          'do patrimônio principal — uma assinatura EIP-712 maliciosa (sem custo de ' +
          'gas) pode drenar a carteira sem você perceber.',
      },
      {
        id: 'cold-wallet',
        titulo: 'Cold wallet (carteira fria)',
        subtitulo: 'Aparelhos de hardware — exemplos de categoria',
        valores: {
          custodia: 'Você guarda as chaves num dispositivo físico offline.',
          pros: 'As chaves nunca tocam a internet; melhor categoria para guardar por muito tempo; mostra o destino na própria telinha (defesa contra clipper).',
          contras: 'Custo do aparelho; menos prática para trocas rápidas.',
        },
        detalheExtra:
          'Muitas usam um chip Secure Element que dificulta a extração das chaves. ' +
          'Protege a chave, mas não protege você de digitar a seed num site de golpe — ' +
          'a disciplina com a seed vale para todas as categorias. Até marcas de hardware ' +
          'podem ter incidentes: em dezembro de 2023, a biblioteca Ledger Connect Kit ' +
          'foi comprometida num ataque de cadeia de suprimentos que injetou um drainer ' +
          'em vários aplicativos.',
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // Checklist de segurança (aba "Seed phrase")
  // ---------------------------------------------------------------------------
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
  // Diagramas (Mermaid, com fallback em texto — ver src/components/diagrama.js)
  // ---------------------------------------------------------------------------
  diagramas: [
    {
      id: 'quem-guarda-chave',
      aba: 'carteiras',
      titulo: 'Quem guarda a chave em cada carteira',
      legenda: 'Se as chaves não são suas, as moedas não são suas.',
      codigoMermaid:
        'flowchart TD\n' +
        '  A[Suas moedas na blockchain] --> B[CEX empresa guarda a chave]\n' +
        '  A --> C[Hot wallet voce guarda online]\n' +
        '  A --> D[Cold wallet voce guarda offline]\n' +
        '  B --> E[Risco de contraparte]\n' +
        '  C --> F[Risco de malware]\n' +
        '  D --> G[Maior seguranca responsabilidade sua]',
      versaoEmTexto: [
        'Suas moedas vivem na blockchain; o que muda entre as carteiras é quem guarda a chave.',
        'Na CEX, a empresa guarda a chave por você — o risco é de contraparte (a empresa quebrar ou congelar saques).',
        'Na hot wallet, você guarda a chave, mas ela fica online — o risco é de malware e phishing.',
        'Na cold wallet, você guarda a chave offline — maior segurança, mas a responsabilidade é toda sua.',
      ],
    },
    {
      id: 'roteiro-drainer',
      aba: 'golpes',
      titulo: 'Como um drainer esvazia a carteira',
      legenda: 'O dano não está em conectar, e sim em assinar.',
      codigoMermaid:
        'flowchart LR\n' +
        '  A[Isca site falso ou airdrop] --> B[Vitima conecta carteira]\n' +
        '  B --> C[Vitima assina approve ou permit]\n' +
        '  C --> D[Golpista usa transferFrom]\n' +
        '  D --> E[Tokens transferidos sem volta]\n' +
        '  E --> F[Lavagem via mixers e pontes]',
      versaoEmTexto: [
        'Uma isca (falso airdrop, mint ou suporte) atrai a vítima a um site clonado.',
        'A vítima conecta a carteira, o que apenas mostra os saldos.',
        'A vítima assina um approve ou um Permit/Permit2 que parece inofensivo.',
        'O golpista usa essa autorização (transferFrom) e move os fundos para fora.',
        'Os fundos são lavados, passando por mixers e pontes entre redes.',
      ],
    },
    {
      id: 'permit2-camadas',
      aba: 'defesa',
      titulo: 'As duas camadas do Permit2',
      legenda: 'Revogar a camada certa importa.',
      codigoMermaid:
        'flowchart TD\n' +
        '  A[Voce usa um app DeFi] --> B[Approval ERC20 ao contrato Permit2]\n' +
        '  B --> C[Permit2 guarda subpermissoes por app]\n' +
        '  C --> D[lockdown revoga varias de uma vez]\n' +
        '  C --> E[invalidateNonces anula assinaturas nao usadas]',
      versaoEmTexto: [
        'Ao usar um app, você dá um approval de ERC-20 ao contrato do Permit2 — a primeira camada.',
        'O Permit2 passa a guardar sub-permissões em seu nome, uma por app — a segunda camada.',
        'Para revogar várias sub-permissões de uma vez, usa-se a função lockdown.',
        'Para anular assinaturas já feitas mas ainda não usadas, usa-se invalidateNonces.',
        'O Revoke.cash mostra as duas camadas em abas separadas, facilitando a revogação.',
      ],
    },
    {
      id: 'plano-emergencia',
      aba: 'defesa',
      titulo: 'Decisão de emergência ao descobrir a drenagem',
      legenda: 'A frase-semente vazou ou foi só uma assinatura maliciosa? A resposta muda tudo.',
      codigoMermaid:
        'flowchart TD\n' +
        '  A[Voce percebeu a drenagem] --> B{A frase-semente vazou}\n' +
        '  B -->|Sim| C[Crie carteira nova em dispositivo limpo]\n' +
        '  B -->|Nao| D[Revogue as aprovacoes]\n' +
        '  C --> E[Mova o que sobrou cuidado com sweeper bot]\n' +
        '  D --> F[Registre evidencias e reporte]\n' +
        '  E --> F',
      versaoEmTexto: [
        'Você percebe que a carteira foi drenada.',
        'Pergunte-se: a frase-semente vazou, ou foi só uma assinatura maliciosa?',
        'Se a frase vazou: crie uma carteira nova em um dispositivo limpo e mova o que sobrou, atento ao sweeper bot que pode roubar o gas que chega.',
        'Se a frase não vazou: revogue as aprovações para cortar o vazamento futuro.',
        'Em qualquer caso: registre as evidências e reporte às autoridades e à corretora envolvida.',
      ],
    },
    {
      id: 'cripto-para-reais',
      aba: 'brasil',
      titulo: 'Da cripto até virar reais na conta',
      legenda: 'Dois caminhos: corretora com Pix, ou P2P direto com outra pessoa.',
      codigoMermaid:
        'flowchart LR\n' +
        '  A[Cripto na sua carteira] --> B[Envio para uma CEX com KYC]\n' +
        '  B --> C[Venda por reais]\n' +
        '  C --> D[Saque via Pix]\n' +
        '  A --> E[Negociacao P2P]\n' +
        '  E --> F[So libera apos confirmar o Pix]',
      versaoEmTexto: [
        'Você parte de uma cripto guardada na sua carteira.',
        'Caminho A: envia para uma corretora (CEX), vende por reais com KYC e saca via Pix.',
        'Caminho B: negocia P2P direto com outra pessoa.',
        'No P2P, só libere a cripto depois de confirmar que o Pix caiu na sua conta.',
        'Em ambos os caminhos, há obrigação tributária a considerar com um contador.',
      ],
    },
  ],

  // ---------------------------------------------------------------------------
  // Mini-quiz (aba "Quiz") — 16 perguntas, sem sobreposição entre as duas pesquisas
  // ---------------------------------------------------------------------------
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
