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
      emUmaFrase:
        'Blockchain é um caderno de registros público, copiado em milhares de ' +
        'computadores, que ninguém consegue alterar escondido.',
      paragrafos: [
        'No banco, uma empresa guarda sozinha a lista de quem tem o quê. Numa ' +
          'blockchain, milhares de computadores no mundo guardam cópias idênticas da ' +
          'mesma lista.',
        'Cada página desse caderno se chama bloco. Um bloco guarda um punhado de ' +
          'transações, como "o endereço A enviou 2 moedas ao endereço B".',
        'Quando um bloco enche, ele é fechado e um novo começa. Os blocos formam uma ' +
          'corrente, daí o nome: block-chain, corrente de blocos.',
        'Cada bloco carrega o hash do bloco anterior. Hash é uma impressão digital ' +
          'matemática: um código que resume todo o conteúdo do bloco.',
      ],
      lista: [
        'Bloco: uma "página" do caderno, com várias transações.',
        'Hash: a impressão digital que resume um bloco e o liga ao anterior.',
        'Rede: os milhares de computadores que guardam cópias iguais.',
      ],
      exemplo: {
        titulo: 'O que acontece se alguém tentar mudar uma transação antiga',
        passos: [
          'A pessoa altera uma transação dentro de um bloco antigo.',
          'O hash daquele bloco muda, porque o conteúdo mudou.',
          'Isso quebra a ligação com todos os blocos seguintes. A fraude fica evidente ' +
            'para toda a rede.',
          'Para esconder, ela teria de refazer tudo em todas as cópias ao mesmo tempo. Na ' +
            'prática, impossível.',
        ],
      },
      paragrafosFinais: [
        'Você não precisa de permissão nem de conta para "ler" a blockchain. Qualquer ' +
          'pessoa pode consultar qualquer transação ou endereço.',
        'Essa transparência é a base de tudo o que vem adiante. É ela que permite ' +
          'auditar golpes, conferir se um pagamento chegou e revisar permissões dadas a ' +
          'contratos.',
      ],
    },
    {
      id: 'imutabilidade-e-confirmacoes',
      aba: 'fundamentos',
      titulo: 'Imutabilidade e "confirmações"',
      emUmaFrase:
        'Depois de confirmada, uma transação não tem botão de "desfazer". Nem para golpe, ' +
        'nem para erro.',
      paragrafos: [
        'Imutável quer dizer "que não pode ser alterado depois de gravado". Na ' +
          'blockchain, não há suporte que estorne uma transação confirmada.',
        'Isso tem dois lados. É ótimo, porque ninguém apaga o seu saldo. E é perigoso: se ' +
          'você mandar para o endereço errado ou cair num golpe, o dinheiro se foi.',
        '"Confirmação" é o número de blocos já fechados em cima do bloco onde a sua ' +
          'transação entrou.',
      ],
      exemplo: {
        titulo: 'Como as confirmações se acumulam',
        passos: [
          'Sua transação entra num bloco. Com 1 confirmação, ela já está na corrente.',
          'Novos blocos são fechados em cima dele. Cada um soma uma confirmação.',
          'Com 12, 30 ou mais confirmações, reverter fica cada vez mais impossível. Um ' +
            'atacante teria de reescrever todos aqueles blocos ao mesmo tempo.',
          'Por isso as corretoras esperam um número mínimo de confirmações antes de ' +
            'liberar um depósito.',
        ],
      },
      paragrafosFinais: [
        'Atenção: uma transação que falhou também fica registrada para sempre. Dá para ' +
          'ver na blockchain tentativas que não se completaram.',
        'Errar o destino, cair num golpe ou assinar algo indevido são ações que a rede ' +
          'executa e grava. A irreversibilidade não distingue acerto de erro.',
      ],
    },
    {
      id: 'explorador-de-blocos',
      aba: 'fundamentos',
      titulo: 'Explorador de blocos: como ler uma transação',
      emUmaFrase:
        'O explorador de blocos é um site só de leitura que mostra o que realmente ' +
        'aconteceu na blockchain.',
      paragrafos: [
        'Pense num "Google da blockchain". Você cola um endereço, o código de uma ' +
          'transação ou um contrato. O site mostra, organizado, o que a rede registrou.',
        'Ele só mostra. Não guarda suas chaves, não faz trocas e não consegue mexer no ' +
          'seu dinheiro.',
        'Cada rede tem o seu explorador: Solscan para a Solana, Etherscan para a ' +
          'Ethereum, BscScan para a BNB Chain e Basescan para a Base.',
        'Ao abrir uma transação, procure três respostas: deu certo? Quanto custou? O que ' +
          'se moveu?',
      ],
      lista: [
        'Explorador = janela de auditoria; a carteira mostra o que você fez, o explorador confirma o que de fato aconteceu na rede.',
        'Um explorador é só de leitura: ele não envia nem recebe cripto por você.',
        'Cuidado com sites falsos de explorador: confira sempre a URL (etherscan.io, solscan.io) e desconfie de links recebidos por mensagem.',
      ],
      exemplo: {
        titulo: 'Lendo uma transação no Etherscan, campo a campo',
        passos: [
          'Status: Success (verde) quer dizer que deu certo. Failed (vermelho) quer dizer ' +
            'que falhou. Mesmo falhando, você pagou a taxa de gas.',
          'Transaction Fee: quanto custou processar a transação.',
          'From e To: quem enviou e quem recebeu. Se aparecer a palavra "Contract", o ' +
            'destino é um contrato inteligente, não uma pessoa.',
          'Value: quanto da moeda principal da rede (o ETH) foi enviado. Pode ser 0 numa ' +
            'transferência de token.',
          'Tokens Transferred: os tokens que de fato se moveram. Viu "Value: 0 ETH"? Olhe ' +
            'aqui antes de achar que nada aconteceu.',
        ],
      },
      detalhe: {
        titulo: 'os outros campos, e como é no Solscan',
        paragrafos: [
          'Os campos abaixo valem para a Ethereum e redes EVM parecidas com ela.',
        ],
        lista: [
          'Transaction Hash: identificador único de 66 caracteres, começando com "0x".',
          'Block: em qual bloco a transação entrou, mais o número de confirmações.',
          'Timestamp: data e hora, em UTC (o horário universal).',
          'To em transações de token: costuma ser o contrato do token, não uma pessoa.',
          'Logs: a aba de eventos. Junto com Tokens Transferred, mostra o que de fato se ' +
            'moveu. O erro comum de iniciante é ver "Value: 0 ETH" e não abrir a aba ' +
            '"Token Transfers", onde os tokens aparecem.',
          'No Solscan (Solana) a lógica é a mesma; mudam o layout e alguns nomes. Signature ' +
            'é o identificador, equivalente ao hash. Há também Block/Slot, Timestamp e ' +
            'Result (Success/Failed).',
          'Ainda no Solscan: Signer (a carteira que iniciou e pagou), Fee (em SOL, ' +
            'geralmente frações de centavo) e Main Actions (a transação quebrada em uma ' +
            'ou mais transferências).',
          'Balance Changes, no Solscan: SOL Balance Change e Token Balance Change, com o ' +
            'saldo antes e depois.',
          'O próprio Solscan foi adquirido pela Etherscan, o que aproximou as duas ' +
            'ferramentas.',
        ],
      },
    },
    {
      id: 'chave-publica-privada-endereco',
      aba: 'fundamentos',
      titulo: 'Chave pública, chave privada e endereço: o que é cada um',
      emUmaFrase:
        'O endereço serve para receber e pode ser divulgado. A chave privada serve para ' +
        'gastar e nunca pode ser mostrada.',
      paragrafos: [
        'Em cripto não existe uma senha só. Você tem um par de chaves ligadas por ' +
          'matemática, mais um endereço. Cada peça tem um papel.',
      ],
      quadro: [
        {
          rotulo: 'Chave privada',
          texto:
            'Um número secreto, sorteado ao acaso. Ela assina as transações e prova que ' +
            'você autoriza mover as moedas. É como uma assinatura de próprio punho: quem ' +
            'tiver a sua, assina no seu lugar.',
        },
        {
          rotulo: 'Chave pública',
          texto:
            'Calculada a partir da privada. A conta só vai num sentido: da pública, ' +
            'ninguém consegue voltar à privada.',
        },
        {
          rotulo: 'Endereço',
          texto:
            'Gerado a partir da pública. É como o número da conta que você passa para ' +
            'receber um Pix: pode divulgar à vontade.',
        },
      ],
      lista: [
        'Endereço = para receber (pode divulgar à vontade).',
        'Chave privada e frase-semente = para gastar (segredo absoluto).',
      ],
      exemplo: {
        titulo: 'Da frase-semente ao endereço, em quatro passos',
        passos: [
          'A frase-semente é a raiz de tudo (ela tem uma aba própria, mais adiante).',
          'Da frase nasce a chave privada.',
          'Da chave privada nasce a chave pública.',
          'Da chave pública nasce o endereço.',
        ],
      },
      paragrafosFinais: [
        'Cada passo é de mão única. Por isso, saber o seu endereço não permite a ninguém ' +
          'descobrir a sua chave.',
        'Confusão comum: muita gente chama o endereço de "chave pública". Na Solana, está ' +
          'certo. Na Ethereum, tecnicamente, não é a mesma coisa (veja abaixo).',
      ],
      detalhe: {
        titulo: 'bytes, curvas e o formato do endereço em cada rede',
        lista: [
          'O nome técnico disso é criptografia de chave pública, ou criptografia ' +
            'assimétrica.',
          'A chave privada tem, na prática, 32 bytes, ou seja, 256 bits de aleatoriedade.',
          'A conta que leva da chave privada à pública usa a curva elíptica secp256k1 na ' +
            'Ethereum e redes EVM. Na Solana, usa a curva Ed25519.',
          'Na EVM, pega-se o hash Keccak-256 (um resumo matemático) da chave pública e ' +
            'ficam os últimos 20 bytes. Isso vira o endereço de 42 caracteres que começa ' +
            'com "0x". O endereço é um resumo da chave pública, não ela mesma.',
          'Na Solana, a chave pública tem 32 bytes e é o próprio endereço. Ela só é escrita ' +
            'em base58: aquela sequência de 32 a 44 letras e números.',
          'Curiosidade: ao enviar uma transação, a assinatura expõe a chave pública na ' +
            'rede. Mesmo assim, isso não compromete a privada, porque o caminho de volta ' +
            'continua impossível na prática.',
        ],
      },
    },
    {
      id: 'gas-taxa-de-rede',
      aba: 'fundamentos',
      titulo: 'O que é gas (taxa de rede) e por que o preço varia',
      emUmaFrase:
        'Toda ação na blockchain paga uma taxa à rede, e paga mesmo quando dá errado.',
      paragrafos: [
        'Na Ethereum e nas redes que funcionam como ela (as redes EVM), essa taxa se ' +
          'chama gas. Gas mede quanto trabalho de computador a sua transação exige.',
        'Ações simples gastam pouco gas. Mandar ETH para outra pessoa usa 21.000 ' +
          'unidades de gas. Mexer com um contrato usa mais.',
        'Você paga o gas de fato usado, vezes o preço de cada unidade (gas price). O gas ' +
          'limit é um teto de trabalho que você autoriza. Ele protege você de uma ' +
          'transação que consuma trabalho sem parar.',
        'O preço sobe quando muita gente quer usar a rede ao mesmo tempo. Quando a rede ' +
          'esvazia, ele cai. Por isso a taxa muda minuto a minuto.',
        'Uma parte da taxa é queimada, isto é, destruída. Outra parte, a gorjeta, vai ' +
          'para o validador, o computador que coloca sua transação no bloco.',
        'Ponto crucial: transação que falha também paga. Os computadores da rede ' +
          'trabalharam até o erro, e esse trabalho é cobrado. Vale na EVM e na Solana. ' +
          'Não existe "deu errado, não paguei".',
        'O custo muda muito de uma rede para outra:',
      ],
      quadro: [
        {
          rotulo: 'Ethereum (rede principal)',
          texto:
            'Varia bastante ao longo do dia e do ano. Transações simples vão de frações ' +
            'de centavo a alguns reais. Confira sempre um "gas tracker" atualizado antes ' +
            'de operar.',
        },
        {
          rotulo: 'Base, BNB Chain e outras',
          texto:
            'Costuma ser uma fração de centavo. Essas redes empacotam muitas transações ' +
            'juntas.',
        },
        {
          rotulo: 'Solana',
          texto:
            'Modelo mais simples: taxa base fixa de 5.000 lamports por assinatura ' +
            '(0,000005 SOL), mais uma gorjeta opcional para furar a fila.',
        },
      ],
      lista: [
        'Gas limit = teto de trabalho autorizado; gas price = preço por unidade.',
        'Base fee é queimada; a gorjeta (priority fee) vai para o validador.',
        'Transação que falha custa gas do mesmo jeito, na EVM e na Solana.',
      ],
      detalhe: {
        titulo: 'EIP-1559, base fee, max fee e as redes L2',
        paragrafos: [
          'Desde a mudança chamada EIP-1559 (ativada em agosto de 2021), o preço do gas ' +
            'na Ethereum tem dois componentes.',
          'A base fee é calculada automaticamente pela rede conforme o congestionamento. ' +
            'Ela é queimada: some de circulação e não vai para ninguém. Quando muita gente ' +
            'disputa espaço no bloco, ela sobe. Quando a rede esvazia, ela cai.',
          'A priority fee (gorjeta) é opcional e vai para o validador, para acelerar a ' +
            'inclusão da transação.',
          'Existe ainda o max fee, o teto total que você aceita pagar. O que sobrar entre ' +
            'o teto e o custo real é devolvido.',
          'Base é uma rede L2 (construída em cima da Ethereum), e a BNB Chain é uma rede ' +
            'alternativa. Redes L2 e alternativas empacotam muitas transações e usam a ' +
            'rede principal só como camada de dados.',
          'Na Solana, a taxa base de 5.000 lamports por assinatura vai metade para queima ' +
            'e metade para o validador. A priority fee é opcional.',
        ],
      },
    },
    {
      id: 'contrato-inteligente',
      aba: 'fundamentos',
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
    {
      id: 'cex-x-dex',
      aba: 'fundamentos',
      titulo: 'Corretora (CEX) x troca on-chain (DEX): o que muda na prática',
      emUmaFrase:
        'Na CEX, uma empresa guarda seu dinheiro e tem suporte. Na DEX, você negocia ' +
        'sozinho, direto da carteira, e não tem a quem recorrer.',
      paragrafos: [
        'CEX é a corretora centralizada: uma empresa. DEX é a corretora descentralizada: ' +
          'um programa na blockchain, sem empresa no meio.',
      ],
      quadro: [
        {
          rotulo: 'CEX (corretora centralizada)',
          texto:
            'A empresa guarda suas moedas (custódia) e exige KYC, a verificação de ' +
            'identidade. Um livro de ofertas (order book) casa compradores e vendedores. ' +
            'Tem suporte e, às vezes, consegue reverter um erro internamente.',
        },
        {
          rotulo: 'DEX (corretora descentralizada)',
          texto:
            'Você negocia direto da sua carteira. Sem cadastro, sem suporte e sem ' +
            'reversão: se errar, não há para quem recorrer. O preço vem de um pool de ' +
            'liquidez, não de um livro de ofertas.',
        },
      ],
      exemplo: {
        titulo: 'Como o preço anda numa DEX (pool inventado, sem contar taxas)',
        passos: [
          'Um pool de liquidez é um par de moedas guardado num contrato. Imagine um pool ' +
            'com 10 ETH e 10.000 tokens.',
          'Quem define o preço é um AMM (formador de mercado automático, do inglês ' +
            'Automated Market Maker). Ele olha a proporção: 10.000 ÷ 10 = 1.000 tokens ' +
            'por ETH.',
          'A fórmula mais comum é o "produto constante", x × y = k. Aqui, 10 × 10.000 = ' +
            '100.000, e esse resultado não pode mudar.',
          'Você coloca 1 ETH. O pool fica com 11 ETH, então só pode ficar com 100.000 ÷ ' +
            '11 ≈ 9.091 tokens.',
          'Você recebe cerca de 909 tokens, e não os 1.000 que a tela mostrava. Essa ' +
            'diferença é o slippage (deslizamento de preço).',
          'Quanto menor o pool e maior a sua ordem em relação a ele, pior o slippage.',
        ],
      },
      paragrafosFinais: [
        'Quase todo token novo e memecoin só existe em DEX. Criar um pool não exige ' +
          'autorização de ninguém. Isso também significa menos proteção e muito mais ' +
          'espaço para golpe.',
        'Stablecoins são tokens que tentam valer o mesmo que uma moeda tradicional, quase ' +
          'sempre o dólar. No Brasil, boa parte da entrada e do saque de cripto passa por ' +
          'elas.',
      ],
      detalhe: {
        titulo: 'as stablecoins nos números da Receita Federal',
        paragrafos: [
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
    },

    // ================================= CARTEIRAS =================================
    {
      id: 'onde-ficam-chaves',
      aba: 'carteiras',
      titulo: 'Onde ficam suas chaves: CEX, hot wallet e cold wallet',
      emUmaFrase:
        'Quem controla a chave privada controla o dinheiro. As três categorias de ' +
        'carteira só mudam quem guarda essa chave, e onde.',
      paragrafos: [
        'Suas moedas não ficam "dentro" da carteira, como notas numa carteira de couro. ' +
          'Elas vivem na blockchain.',
        'O que você possui de fato é a chave privada, o segredo que autoriza mover as ' +
          'moedas. Daí o ditado "not your keys, not your coins": se as chaves não são ' +
          'suas, as moedas não são suas.',
      ],
      quadro: [
        {
          rotulo: 'CEX (corretora)',
          texto:
            'Uma empresa guarda as chaves por você, como um banco. É a entrada mais ' +
            'fácil: aceita Pix e converte para reais. Risco: se ela quebrar, for hackeada ' +
            'ou congelar saques, você depende dela.',
        },
        {
          rotulo: 'Hot wallet (carteira quente)',
          texto:
            'Um app no celular ou no navegador. Você guarda as chaves, mas o aparelho ' +
            'está na internet. É grátis e é o que se usa para negociar on-chain. Fica ' +
            'exposta a phishing, drainers e vírus.',
        },
        {
          rotulo: 'Cold wallet (carteira fria)',
          texto:
            'Um aparelho físico que fica offline: as chaves nunca tocam a internet. É a ' +
            'melhor opção para guardar por muito tempo. Custa dinheiro e é menos prática ' +
            'para trocas rápidas.',
        },
      ],
      detalhe: {
        titulo: 'exemplos de cada categoria e o risco de contraparte',
        lista: [
          'CEX vem do inglês Centralized Exchange (corretora centralizada). Binance e ' +
            'Mercado Bitcoin são citadas só como exemplos da categoria.',
          'A CEX faz o KYC: a checagem de identidade com CPF e documento.',
          'Risco de contraparte é o risco de depender de outra parte, a empresa. Esse ' +
            'risco apareceu nos colapsos da FTX, Celsius e Mt. Gox.',
          'Exemplos de hot wallet, também citados só como exemplos: Phantom, na Solana, e ' +
            'MetaMask, nas redes EVM. Elas conectam em aplicativos descentralizados.',
          'Exemplos de cold wallet: os aparelhos da Ledger e de outros fabricantes de ' +
            'hardware.',
        ],
      },
    },
    {
      id: 'quando-cada-carteira-faz-sentido',
      aba: 'carteiras',
      titulo: 'Em que situação cada carteira faz sentido',
      emUmaFrase: 'Não existe "a melhor" carteira. Existe a certa para cada uso.',
      paragrafos: [
        'Muitos usuários combinam as três categorias, cada uma com uma função. Veja como ' +
          'elas se encaixam.',
      ],
      quadro: [
        {
          rotulo: 'Para entrar e sair em reais',
          texto:
            'Corretora (CEX). Resolve Pix, conversão, KYC e suporte num só lugar. Costuma ' +
            'ser o ponto de partida para comprar cripto pela primeira vez e experimentar.',
        },
        {
          rotulo: 'Para operar on-chain',
          texto:
            'Carteira quente, com pouco dinheiro. Ela conecta nos sites e assina ' +
            'transações. É a ferramenta para usar aplicativos on-chain e negociar ' +
            'memecoins.',
        },
        {
          rotulo: 'Para guardar por muito tempo',
          texto:
            'Carteira fria, porque tira as chaves da internet. É para o que não vai ser ' +
            'mexido tão cedo ("hodl", gíria para segurar sem vender).',
        },
      ],
      paragrafosFinais: [
        'Regra prática que muita gente adota: não deixar na corretora mais do que se está ' +
          'disposto a perder num eventual bloqueio ou incidente.',
        'Outra prática de segurança muito citada: ter uma carteira quente só para trade, ' +
          'com pouco saldo. Ela fica separada da carteira onde está o grosso do ' +
          'patrimônio.',
        'Nada disso é recomendação. É a descrição de como as categorias se encaixam.',
      ],
    },
    {
      id: 'criar-primeira-carteira',
      aba: 'carteiras',
      titulo: 'Como criar sua primeira carteira, passo a passo',
      ordenada: true,
      emUmaFrase:
        'Crie a carteira do zero, anote a frase no papel e teste com pouco dinheiro antes ' +
        'de mover qualquer valor.',
      paragrafos: [
        'Antes de começar: atualize o sistema operacional e remova extensões de navegador ' +
          'que você não reconhece. Evite Wi-Fi público e tenha papel e caneta à mão.',
        'Os passos abaixo são genéricos, por categoria. Nomes de produtos aparecem só ' +
          'como exemplos, nunca como recomendação de uso.',
      ],
      lista: [
        'Baixe só da fonte oficial. Use o site oficial ou a loja oficial do aparelho e confira a URL letra por letra. NUNCA baixe a partir de anúncio patrocinado no buscador.',
        'Escolha "criar nova carteira", não "importar". Importar é para quem já tem uma frase, e é justamente essa opção que sites falsos usam para capturar a sua. NUNCA importe nada num site que você não digitou você mesmo.',
        'Anote a frase-semente no papel. O app mostra as 12 ou 24 palavras uma a uma. Escreva na ordem e numeradas (1, 2, 3...). NUNCA fotografe, faça print ou salve na nuvem ou no bloco de notas.',
        'Confirme a frase. O app pede palavras de posições específicas ("qual é a palavra 9? e a 3?"). Isso prova que você anotou certo. NUNCA pule esta etapa achando que "depois anoto".',
        'Crie a senha ou PIN do app. Ela só destranca o app naquele aparelho e é diferente da frase-semente. Se você perder o aparelho, é a frase, não a senha, que recupera tudo em outro. NUNCA confunda as duas nem reutilize senha de outro serviço.',
        'Faça um teste com valor pequeno. Envie um valor mínimo, confira que chegou e envie de volta. NUNCA transfira tudo de uma vez sem o teste.',
        'Confira no explorador de blocos. Cole seu endereço e veja se a transação de teste aparece com o valor certo. NUNCA confie só na tela do app: a blockchain é a fonte da verdade.',
      ],
      detalhe: {
        titulo: 'carteira de hardware e o golpe do anúncio patrocinado',
        lista: [
          'Os passos valem para carteira de navegador ou celular e para carteira de ' +
            'hardware (o aparelho físico).',
          'Carteira de hardware: compre no site do fabricante ou num revendedor ' +
            'autorizado. Evite aparelho usado e confira se a embalagem não foi violada.',
          'Por que nunca clicar em anúncio: golpistas já compraram anúncios do Google ' +
            'mirando quem procurava carteiras conhecidas. Eles levaram vítimas a domínios ' +
            'falsos, que roubaram a frase-semente e esvaziaram as carteiras.',
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
      paragrafos: [
        'Quando você cria uma carteira, ela mostra uma lista de 12 ou 24 palavras. Essa ' +
          'lista tem vários nomes: frase-semente, seed phrase, frase de recuperação.',
        'Todas as suas chaves e todos os seus endereços são calculados a partir dessas ' +
          'palavras. Por isso a mesma frase recria a mesma carteira em qualquer aplicativo ' +
          'compatível.',
      ],
      quadro: [
        {
          rotulo: 'Quem tem as palavras',
          texto:
            'Tem todo o seu dinheiro, para sempre, em qualquer aparelho. Não precisa da sua ' +
            'senha nem do seu celular.',
        },
        {
          rotulo: 'Quem perde as palavras',
          texto:
            'Se o aparelho quebrar, ninguém no mundo recupera o dinheiro. Não existe "esqueci ' +
            'minha senha".',
        },
      ],
      paragrafosFinais: [
        'Guardar a frase-semente com segurança é a habilidade número um de todo este módulo.',
      ],
      detalhe: {
        titulo: 'como as palavras viram chaves (BIP-39, BIP-32, BIP-44)',
        lista: [
          'BIP-39 é o padrão das palavras. Ele usa uma lista fixa de 2.048 palavras.',
          'O aparelho sorteia um número aleatório (a entropia) e acrescenta alguns bits de ' +
            'verificação (o checksum, que detecta erro de digitação).',
          'Cada pedaço de 11 bits vira uma palavra da lista. 128 bits de entropia viram 12 ' +
            'palavras. 256 bits viram 24 palavras.',
          'A frase passa por uma função de embaralhamento (PBKDF2-HMAC-SHA512) e vira uma ' +
            '"semente" de 512 bits.',
          'Dessa semente, o padrão BIP-32 cria uma árvore de chaves (a carteira HD, ' +
            'determinística hierárquica). O BIP-44 organiza essa árvore por moeda e por conta.',
        ],
      },
    },
    {
      id: 'formas-de-perder-tudo',
      aba: 'seed',
      titulo: 'As formas concretas de perder tudo pela seed',
      emUmaFrase: 'Ninguém legítimo jamais pede a sua frase-semente. Todo pedido é golpe.',
      paragrafos: [
        'Nenhum suporte, nenhuma corretora, nenhum airdrop, nenhum "verificador de ' +
          'carteira". Digitar as 12 ou 24 palavras num site é entregar a carteira.',
      ],
      listaTitulo: 'As cinco formas mais comuns de perder a frase:',
      lista: [
        'Foto, print de tela ou cópia na nuvem (Google Drive, iCloud, e-mail, WhatsApp). Se a nuvem ou o celular for invadido, a frase vai junto.',
        'Arquivo de texto no PC, ou o gerenciador de senhas do navegador.',
        'Site de phishing que imita a sua carteira e promete um airdrop ou um "resgate". A frase-semente não se digita em site nenhum.',
        'Falso "suporte" no Discord, Telegram, X ou e-mail que pede a frase. Suporte de verdade nunca pede.',
        'Malware infostealer, um programa "ladrão de informações" que vasculha o computador atrás de carteiras.',
      ],
      detalhe: {
        titulo: 'o que um infostealer copia',
        paragrafos: [
          'Famílias como RedLine e Lumma copiam arquivos de carteira (wallet.dat) e dados de ' +
            'extensões de navegador, como a MetaMask. Também vigiam a área de transferência ' +
            '(o "copiar e colar") atrás de frases e endereços.',
        ],
      },
    },
    // =================================== GOLPES ===================================
    {
      id: 'wallet-drainers-conceito',
      aba: 'golpes',
      titulo: 'Wallet drainers: o golpe que não rouba a sua seed',
      emUmaFrase:
        'Você pode guardar a frase-semente perfeitamente e ainda assim perder tudo por ' +
        'causa de uma única assinatura.',
      paragrafos: [
        'Um wallet drainer ("esvaziador de carteira") é um kit de golpe. Ele fica num ' +
          'site falso, feito para parecer um site conhecido. Esse tipo de site falso se ' +
          'chama phishing.',
        'O site pede que você assine uma transação ou uma mensagem. Parece rotina. Mas a ' +
          'assinatura dá ao golpista permissão sobre seus tokens, e ele esvazia a ' +
          'carteira sem nunca ver a sua seed.',
        'Por trás existe um negócio organizado, o "drainer como serviço" (DaaS, do ' +
          'inglês drainer-as-a-service). Um grupo, chamado operador, cria o kit e o aluga ' +
          'para golpistas menores, os afiliados. São os afiliados que espalham os sites ' +
          'falsos.',
        'Quando o roubo acontece, um contrato divide o dinheiro sozinho entre os dois. ' +
          'A divisão mais comum é 80% para o afiliado e 20% para o operador.',
        'A boa notícia: as perdas caíram muito em 2025. Os números abaixo são da Scam ' +
          'Sniffer e contam perdas com drainers em redes EVM (a Ethereum e as redes ' +
          'que funcionam como ela).',
      ],
      quadro: [
        {
          rotulo: '2023',
          texto: 'Cerca de US$ 295,5 milhões perdidos, de mais de 324.000 vítimas.',
        },
        {
          rotulo: '2024',
          texto:
            'Cerca de US$ 494 milhões, de mais de 332.000 carteiras. Alta de 67% sobre 2023.',
        },
        {
          rotulo: '2025',
          texto:
            'Cerca de US$ 83,85 milhões, de 106.106 carteiras. Queda de 83% nas perdas e ' +
            'de 68% no número de vítimas.',
        },
      ],
      paragrafosFinais: [
        'A má notícia: o golpe continua ativo. A própria Scam Sniffer avisa que a queda ' +
          'acompanhou o mercado como um todo, e que "à medida que drainers antigos saem, ' +
          'novos surgem".',
      ],
      detalhe: {
        titulo: 'os estudos, a divisão do dinheiro e os maiores roubos',
        lista: [
          'Estudo revisado por pares (He et al., Universidade de Zhejiang com a BlockSec), ' +
            'apresentado na ACM Internet Measurement Conference de 2025. Ele mediu o ' +
            'Ethereum de 1º de março de 2023 a 1º de abril de 2025.',
          'Resultado do estudo: US$ 135 milhões roubados de 76.582 vítimas. Foram US$ ' +
            '111,9 milhões para afiliados e US$ 23,1 milhões para operadores.',
          'Tamanho do mercado no estudo: 1.910 contratos de partilha de lucro, 56 ' +
            'operadores e 6.087 afiliados.',
          'Divisão do dinheiro: segundo o estudo, os afiliados ficam "tipicamente com 80% ' +
            'a 90%" do roubo. A fatia do operador variou de 10% a 40% entre os contratos ' +
            'observados.',
          'Um piso de 75% para o afiliado aparece em material de recrutamento do grupo ' +
            '"Rublevka Team", segundo relatório da Recorded Future/Insikt Group. O ' +
            'anúncio dizia "starting percentage of 75% and 80% for \'experienced users\'".',
          'Caso documentado pela própria Ledger: no incidente do Angel Drainer, associado ' +
            'ao ataque à biblioteca Ledger Connect Kit (dezembro de 2023), a divisão ' +
            'observada foi 85% para o atacante e 15% para o kit.',
          'Maiores roubos isolados, segundo a Scam Sniffer: US$ 24 milhões em 2023, US$ ' +
            '55,48 milhões em 2024 e US$ 6,5 milhões em 2025 (via assinatura Permit, em ' +
            'setembro).',
          'Em 2025 houve só 11 casos acima de US$ 1 milhão, contra 30 em 2024.',
          'Inferno Drainer: entre novembro de 2022 e novembro de 2023, o Group-IB (citando ' +
            'dados da Scam Sniffer) estima mais de US$ 80 milhões roubados de cerca de ' +
            '137.000 vítimas. Ele usou mais de 16.000 domínios únicos e imitou mais de ' +
            '100 marcas cripto.',
        ],
      },
    },
    {
      id: 'roteiro-do-golpe-passo-a-passo',
      aba: 'golpes',
      titulo: 'O roteiro do golpe, passo a passo',
      emUmaFrase: 'Conectar a carteira não rouba nada. O roubo começa quando você assina.',
      paragrafos: [
        'Entender a sequência desarma o golpe. São quatro etapas, e o ponto de virada é ' +
          'a terceira.',
      ],
      exemplo: {
        titulo: 'As quatro etapas do golpe',
        passos: [
          'A isca. Pode ser um falso airdrop (distribuição grátis de tokens), um "mint" de ' +
            'NFT, um falso suporte ou um anúncio patrocinado quando você pesquisa o nome ' +
            'de um site. Você clica e chega a um site que imita o verdadeiro.',
          'A conexão. Você conecta a carteira. Sozinho, esse passo é inofensivo: o site só ' +
            'passa a ver seus saldos públicos e não move nada.',
          'A assinatura. O site pede para assinar algo disfarçado de "claim" ' +
            '("resgatar"), "login" ou "verificação". Na verdade, a assinatura dá uma ' +
            'permissão sobre seus tokens. É aqui que o golpe acontece.',
          'O saque. Com a permissão, o golpista usa a função transferFrom, uma ordem que ' +
            'diz "transfira daquele endereço para o meu". Como foi você quem deu a ' +
            'permissão, a blockchain considera tudo legítimo. A transferência é ' +
            'irreversível.',
        ],
      },
      paragrafosFinais: [
        'O dano não está em conectar, e sim em assinar. A defesa central é ler o que a ' +
          'carteira mostra antes de confirmar.',
        'Desconfie de qualquer "assinar mensagem" vindo de um site que você não abriu ' +
          'digitando o endereço você mesmo.',
      ],
    },
    {
      id: 'vetores-tecnicos',
      aba: 'golpes',
      titulo: 'Os vetores técnicos que você precisa reconhecer',
      emUmaFrase:
        'Os drainers usam três truques principais. Nos três, você entrega uma permissão ' +
        'sem perceber.',
      paragrafos: [
        'Saber o nome de cada truque ajuda a reconhecer o pedido quando ele aparecer na ' +
          'sua carteira.',
      ],
      quadro: [
        {
          rotulo: 'Approval ilimitado',
          texto:
            'Você autoriza um contrato a gastar um token seu, sem limite de valor. Ele ' +
            'fica livre para esvaziar aquele token quando quiser, sem pedir de novo.',
        },
        {
          rotulo: 'Permit e Permit2',
          texto:
            'Aparecem como um inofensivo "assinar mensagem", sem taxa, e não como uma ' +
            'transação. Mas a assinatura dá permissão sobre seus tokens.',
        },
        {
          rotulo: 'setApprovalForAll (NFT)',
          texto:
            'Dá a um "operador" o direito de gerenciar todos os seus NFTs de uma coleção ' +
            'de uma vez. Um único clique pode entregar a coleção inteira.',
        },
      ],
      paragrafosFinais: [
        'Sites legítimos também pedem approval para funcionar. O perigo é o valor ' +
          'ilimitado. Aprovações ilimitadas e esquecidas ("dormentes") foram, por anos, a ' +
          'maior categoria de perdas em DeFi (finanças descentralizadas).',
        'O Permit engana porque não parece uma transação. O Permit2, contrato criado pela ' +
          'Uniswap e hoje muito usado, concentra permissões de vários tokens.',
        'O setApprovalForAll é o que faz um marketplace legítimo funcionar. E é também o ' +
          'mecanismo por trás de quase toda drenagem de NFT por phishing.',
        'Há ainda um vetor novo, surgido em 2025, que merece atenção redobrada: o ' +
          'EIP-7702. Ele é tratado na aba "Defesa", junto com as duas camadas do Permit2.',
      ],
      detalhe: {
        titulo: 'os padrões técnicos e os números da Scam Sniffer',
        lista: [
          'ERC-20 é o padrão dos tokens nas redes EVM. "Approval" é a permissão que você ' +
            'dá a um contrato para gastar esses tokens.',
          'Permit e Permit2 são assinaturas "sem gás" (sem taxa) feitas por um padrão ' +
            'chamado EIP-712.',
          'O Permit2 fica no mesmo endereço, 0x000000000022D473030F116dDEE9F6B43aC78BA3, ' +
            'em várias redes EVM.',
          'O setApprovalForAll é uma função dos padrões de NFT ERC-721 e ERC-1155.',
          'Relatório anual da Scam Sniffer de 2024, tipos de assinatura de phishing: ' +
            'Permit (56,7% dos roubos), setOwner (31,9%), Transfer (4,5%) e ' +
            'increaseAllowance (3,5%).',
          'No mesmo relatório, a rede Ethereum concentrou 85,3% das perdas (cerca de US$ ' +
            '152 milhões).',
          'Em 2025, Permit/Permit2 seguiram como as ferramentas mais eficazes dos ' +
            'golpistas, respondendo por 38% das perdas nos casos acima de US$ 1 milhão.',
        ],
      },
    },
    {
      id: 'address-poisoning-e-clipper',
      aba: 'golpes',
      titulo: 'Address poisoning e clipper: quando o alvo é o endereço',
      emUmaFrase:
        'Antes de enviar, confira o endereço inteiro e faça um teste com valor baixo. ' +
        'Começo e fim iguais não bastam.',
      paragrafos: [
        'Nem todo golpe passa por assinatura. Nestes dois, o golpista faz você mandar o ' +
          'dinheiro para o endereço errado. Como a transação é irreversível, o dinheiro ' +
          'se perde.',
      ],
      quadro: [
        {
          rotulo: 'Address poisoning ("envenenamento de endereço")',
          texto:
            'O golpista cria um endereço com o mesmo começo e o mesmo fim de um que você ' +
            'usa. Depois "suja" o seu histórico com ele, esperando que você o copie dali.',
        },
        {
          rotulo: 'Clipper malware',
          texto:
            'Um vírus no seu aparelho vigia o "copiar e colar". Você copia o endereço ' +
            'certo, mas, na hora de colar, ele troca em silêncio pelo do golpista.',
        },
      ],
      exemplo: {
        titulo: 'Como o envenenamento de endereço pega alguém',
        passos: [
          'Endereços são enormes, então a gente costuma conferir só os primeiros e os ' +
            'últimos caracteres.',
          'O golpista gera um endereço parecido: mesmo começo e mesmo fim.',
          'Ele envia para você uma transação minúscula, só para esse endereço aparecer no ' +
            'seu histórico.',
          'Da próxima vez que você for enviar, copia um endereço do histórico e confere só ' +
            'as pontas.',
          'Sem perceber, você copiou o endereço do golpista. O dinheiro vai para ele.',
        ],
      },
      paragrafosFinais: [
        'A defesa contra os dois é a mesma: nunca confiar só no começo e no fim. Confira ' +
          'a linha inteira do endereço.',
        'Acima de tudo, envie sempre uma transação-teste de valor baixo antes de mandar ' +
          'um valor alto.',
        'Uma carteira fria ajuda muito. Ela mostra o endereço de destino na telinha do ' +
          'próprio aparelho, fora do alcance do clipper.',
      ],
      detalhe: {
        titulo: 'o tamanho do problema e o clipper mais esperto',
        paragrafos: [
          'Um estudo acadêmico da Carnegie Mellon University ("Blockchain Address ' +
            'Poisoning", apresentado no USENIX Security Symposium de 2025) mediu Ethereum ' +
            'e BNB Chain de julho de 2022 a junho de 2024.',
          'O estudo identificou 270 milhões de tentativas de ataque contra 17 milhões de ' +
            'vítimas, com 6.633 incidentes bem-sucedidos e ao menos US$ 83,8 milhões em ' +
            'perdas.',
          'Variantes sofisticadas de clipper usam endereços parecidos com o verdadeiro. ' +
            'Assim enganam quem confere só os primeiros caracteres depois de colar.',
        ],
      },
    },

    // =================================== DEFESA ===================================
    {
      id: 'revogar-aprovacoes',
      aba: 'defesa',
      titulo: 'Revogação de aprovações: como e o que ela não resolve',
      emUmaFrase:
        'Revogar uma aprovação impede roubos futuros por aquela permissão. Mas não ' +
        'devolve nada que já saiu.',
      paragrafos: [
        'Aprovação (approval) é a permissão que você dá a um contrato para mexer nos seus ' +
          'tokens. Ela fica ativa para sempre, até você cancelar.',
        'É por essas permissões que os drainers causam dano. Por isso vale revisar e ' +
          'cancelar (revogar) as que você não usa, de tempos em tempos.',
        'Para só olhar, não precisa conectar a carteira. No Revoke.cash, a ferramenta ' +
          'mais usada, basta digitar o seu endereço. É o jeito mais seguro de conferir.',
        'Para revogar de fato, você conecta a carteira, filtra e clica em "Revoke". Isso ' +
          'gera uma transação e custa uma pequena taxa de gas.',
      ],
      quadro: [
        {
          rotulo: 'Revogar resolve',
          texto: 'Impede usos futuros de uma permissão que você deu.',
        },
        {
          rotulo: 'Revogar NÃO resolve',
          texto:
            'Não recupera o que já saiu. Não salva uma frase-semente vazada. Não remove ' +
            'um vírus que ainda está no aparelho.',
        },
      ],
      paragrafosFinais: [
        'Se alguém tem a sua seed, controla a carteira toda. A única saída é migrar tudo ' +
          'para uma carteira nova.',
        'Se há um infostealer ou clipper rodando na máquina, ele continua atuando depois ' +
          'da revogação.',
        'Regra de ouro: revogar interrompe gastos futuros. Não é um botão de "desfazer".',
      ],
      detalhe: {
        titulo: 'o Revoke.cash nas palavras dele e o revogador do Etherscan',
        paragrafos: [
          'O Revoke.cash cobre mais de 100 redes e se descreve como "the biggest and most ' +
            'popular tool for revoking token approvals". Para consultar, aceita o endereço ' +
            'ou um nome ENS (um apelido legível para um endereço).',
          'O FAQ do próprio Revoke.cash avisa: "it cannot be used to recover any stolen ' +
            'funds". Ou seja, não serve para recuperar fundos roubados.',
          'Os exploradores também revogam. O Token Approval Checker do Etherscan (e os ' +
            'equivalentes no BscScan e no Basescan) lista os contratos aprovados a gastar ' +
            'seus tokens e mostra o "valor em risco".',
          'Ele tem um botão "Revoke" para cada aprovação e separa as listas pelos padrões ' +
            'ERC-20, ERC-721 e ERC-1155.',
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
      paragrafos: [
        'O Permit2 é um contrato que gerencia permissões de tokens para vários apps. Ele ' +
          'guarda essas permissões em duas camadas, e é isso que confunde.',
      ],
      quadro: [
        {
          rotulo: 'Camada 1: você → Permit2',
          texto:
            'O approval comum de ERC-20 que você deu ao contrato do Permit2, geralmente ' +
            'ilimitado. Você revoga como qualquer approval.',
        },
        {
          rotulo: 'Camada 2: Permit2 → cada app',
          texto:
            'Permissões que o Permit2 dá em seu nome a cada app, já com valor e prazo de ' +
            'validade. O Revoke.cash mostra esta camada numa aba separada.',
        },
      ],
      paragrafosFinais: [
        'O lado bom do Permit2: as permissões expiram sozinhas. Acaba a "aprovação ' +
          'ilimitada dormente", aquela esquecida que dura para sempre.',
        'O lado ruim: o risco passa para a assinatura. Assinar não custa gas, então fica ' +
          'mais fácil enganar a vítima para assinar algo malicioso.',
        'O vetor mais novo, que quem começa em 2026 precisa conhecer, é o EIP-7702. Ele ' +
          'foi ativado na atualização "Pectra" do Ethereum, em maio de 2025.',
        'O EIP-7702 deixa uma carteira comum agir como um contrato inteligente e fazer ' +
          'várias ações numa só transação.',
        'O golpe: uma assinatura disfarçada de troca rotineira esconde uma "delegação". ' +
          'Ela entrega o controle do seu endereço a um contrato do golpista, que esvazia ' +
          'tudo de uma vez.',
        'Já houve casos reais. Em 24 de maio de 2025, uma vítima perdeu cerca de US$ ' +
          '146,5 mil. Em 24 de agosto de 2025, outra perdeu mais de US$ 1,54 milhão.',
      ],
      detalhe: {
        titulo: 'as funções do Permit2 e as fontes dos casos',
        lista: [
          'Na camada 2, o app da Uniswap, por exemplo, costuma usar aprovação de 30 dias.',
          'lockdown: função do Permit2 que revoga várias permissões de uma vez ("batch ' +
            'revoking approvals", nas palavras do próprio código da Uniswap).',
          'invalidateNonces: função que anula assinaturas que você já assinou, mas que ' +
            'ainda não foram usadas.',
          'O Revoke.cash mostra as duas camadas em abas separadas. É mais fácil do que ' +
            'chamar o contrato na mão.',
          'As assinaturas do Permit2 seguem o padrão EIP-712. Uma assinatura EIP-712 ' +
            'maliciosa é mais fácil de conseguir porque não custa gas.',
          'Caso de 24 de maio de 2025 (cerca de US$ 146,5 mil): ataque EIP-7702 ligado ao ' +
            'grupo Inferno Drainer, analisado pela SlowMist.',
          'Caso de 24 de agosto de 2025 (mais de US$ 1,54 milhão): mesma técnica, ' +
            'monitorada pela Scam Sniffer.',
        ],
      },
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
      emUmaFrase:
        'Primeiro salve o que sobrou. Depois guarde as provas e denuncie. Recuperar o ' +
        'que já saiu é raro.',
      paragrafos: [
        'Siga a lista na ordem: ela vai do mais urgente ao menos urgente.',
        'Este material não promete recuperação. Na prática, a chance de reaver os fundos ' +
          'é baixa.',
      ],
      lista: [
        'Pare de usar o aparelho. Ele pode ter um vírus que rouba dados (infostealer) ou que troca endereços copiados (clipper). Continuar nele espalha o dano. Só volte a operar de um aparelho limpo.',
        'Crie uma carteira NOVA, com frase-semente NOVA, num aparelho limpo. Uma conta "nova" dentro da MESMA frase não serve: se a frase vazou, todas as contas dela estão comprometidas, em todas as redes.',
        'Mova o que sobrou, começando pelo que vale mais. Deixe gas suficiente na carteira: sem gas, a transferência não sai.',
        'Cuidado com os "sweeper bots" (robôs varredores). Se a frase vazou, o golpista costuma deixar um robô vigiando a carteira. Ele leva, em segundos, tudo o que chega, inclusive o gas que você depositar.',
        'Revogue as aprovações só se a frase NÃO vazou. Se o golpe foi uma assinatura ou um approve malicioso, revogar corta o roubo futuro. Se a frase ou a chave privada vazou, revogar não adianta: o golpista controla tudo.',
        'Guarde as provas: os hashes (códigos) das transações, prints de tela, a URL do site do golpe, data e horário. Sem isso, a denúncia fica fraca.',
        'Denuncie: faça boletim de ocorrência na delegacia e registre em plataformas como Chainabuse e Scam Sniffer. Se o dinheiro foi para uma corretora (CEX), avise-a rápido: ela pode conseguir congelar.',
        'Desconfie de quem promete "recuperar seu cripto" cobrando adiantado. É um segundo golpe, extremamente comum, contra quem já perdeu. Quem aparece sozinho no seu Telegram ou Discord oferecendo isso é quase sempre golpista.',
      ],
      detalhe: {
        titulo: 'por que depositar gas falha e o que o FBI diz sobre recuperação',
        paragrafos: [
          'Quando a frase vazou, "depositar gas para salvar tokens" costuma fracassar: o ' +
            'robô leva o gas primeiro. A própria central de ajuda da MetaMask recomenda, ' +
            'nesses casos, abandonar a carteira e criar uma nova.',
          'O FBI, no alerta público IC3 I-072026 (20 de julho de 2026), afirma que "IC3 ' +
            'will never ask for payment to recover lost funds, nor will IC3 refer someone ' +
            'to a company requesting payment for recovering funds". Ou seja: o IC3 nunca ' +
            'cobra para recuperar fundos, nem indica empresa que cobre por isso.',
          'O mesmo alerta diz que "IC3 does not maintain any social media presence": o IC3 ' +
            'não tem perfil em rede social.',
        ],
      },
    },

    // =================================== BRASIL ===================================
    {
      id: 'sacar-para-reais',
      aba: 'brasil',
      titulo: 'Sacar para reais no Brasil: Pix, KYC e P2P',
      emUmaFrase:
        'O caminho mais comum é vender numa corretora e sacar por Pix. No P2P, nunca ' +
        'solte a cripto antes de ver o Pix na sua conta.',
      paragrafos: ['Existem dois caminhos para transformar cripto em reais.'],
      quadro: [
        {
          rotulo: 'Corretora (CEX), o mais comum',
          texto:
            'Você vende a cripto, o valor vira reais e você saca via Pix para sua conta. ' +
            'A corretora exige KYC (do inglês Know Your Customer), a verificação de ' +
            'identidade obrigatória.',
        },
        {
          rotulo: 'P2P (pessoa para pessoa)',
          texto:
            'Você negocia direto com outra pessoa. O risco de contraparte é sério: tudo ' +
            'depende de a outra pessoa cumprir a parte dela.',
        },
      ],
      paragrafosFinais: [
        'No P2P, a outra pessoa pode não pagar. Pode pagar e depois pedir estorno. Ou o ' +
          'dinheiro pode ter origem em fraude.',
        'Nesse último caso, sua conta bancária pode ser bloqueada por receber valores ' +
          '"sujos".',
        'As plataformas têm sistemas de garantia (escrow), que reduzem esse risco, mas ' +
          'não eliminam.',
        'Regra prática: nunca libere a cripto antes de confirmar que o Pix caiu de fato ' +
          'na sua conta.',
      ],
      detalhe: {
        titulo: 'o arranjo Binance + Z.ro Bank no Pix',
        paragrafos: [
          'O lançamento oficial foi anunciado em 20 de maio de 2025, integrando o Binance ' +
            'Pay ao Pix. Segundo a empresa, foi a primeira vez que o Binance Pay foi ' +
            'integrado a um sistema nacional de pagamentos no mundo.',
          'A operacionalização foi anunciada como feita pelo Z.ro Bank, instituição de ' +
            'pagamento autorizada pelo Banco Central.',
          'Se esse arranjo continua idêntico em setembro de 2026: NÃO VERIFICADO (ver a ' +
            'seção de fontes no fim do módulo).',
        ],
      },
    },
    {
      id: 'marco-regulatorio-psav',
      aba: 'brasil',
      titulo: 'O novo marco regulatório: PSAVs e a saída de corretoras do varejo',
      emUmaFrase:
        'Desde fevereiro de 2026, corretoras de cripto no Brasil seguem regras do Banco ' +
        'Central. Por causa do custo, várias anunciaram que vão parar de atender pessoas ' +
        'comuns.',
      paragrafos: [
        'PSAV quer dizer Prestadora de Serviços de Ativos Virtuais. Na prática, são as ' +
          'corretoras, as intermediárias e as custodiantes (empresas que guardam cripto ' +
          'para os clientes).',
        'O Banco Central publicou as regras das PSAVs em 10 de novembro de 2025, depois de ' +
          'anos de espera. Elas entraram em vigor em 2 de fevereiro de 2026.',
        'As regras levam às empresas de cripto exigências de prevenção à lavagem de ' +
          'dinheiro, governança, segurança e transparência. Também exigem separar o ' +
          'dinheiro dos clientes do dinheiro da empresa (segregação).',
        'Empresas que já operavam têm até 30 de outubro de 2026 para pedir autorização.',
        'O efeito já apareceu. Em 2026, corretoras como Bitso, Coinext, NovaDAX, Digitra ' +
          'e Bitnuvem anunciaram o fim das operações de varejo no Brasil. Varejo é o ' +
          'atendimento a pessoas comuns. Elas citaram o custo de se adequar.',
        'Antes de usar uma corretora, verifique se ela é uma PSAV autorizada pelo Banco ' +
          'Central. Os nomes de corretoras deste módulo são só exemplos de categoria, ' +
          'nunca recomendação.',
        'Uma outra regra, a Resolução BCB 561, vale a partir de 1º de outubro de 2026. Ela ' +
          'proíbe usar stablecoins para liquidar pagamentos internacionais feitos por ' +
          'empresas de câmbio eletrônico.',
        'Atenção: ela não proíbe stablecoins no Brasil. Comprar, vender e guardar cripto ' +
          'internamente segue permitido.',
      ],
      detalhe: {
        titulo: 'números das resoluções e o que aconteceu com cada corretora',
        lista: [
          'As regras das PSAVs são as Resoluções BCB 519, 520 e 521, fruto das Consultas ' +
            'Públicas 109, 110 e 111 de 2024.',
          'Elas classificam as PSAVs em modalidades: intermediária, custodiante e ' +
            'corretora.',
          'A Bitso transferiu sua base de clientes para o Mercado Bitcoin (setembro de ' +
            '2026). A Coinext anunciou o fim das atividades em 3 de setembro de 2026.',
          'Mercado Bitcoin e Foxbit seguiam operando na data desta pesquisa. Qualquer ' +
            'lista de "quais operam" envelhece rápido.',
          'A Resolução BCB 561 foi publicada em 30 de abril de 2026. Ela veda o uso de ' +
            'ativos virtuais/stablecoins como meio de liquidação em operações de câmbio ' +
            'eletrônico (eFX), isto é, pagamentos internacionais.',
          'O alvo da BCB 561 é a "canalização" de pagamentos internacionais por ' +
            'prestadores de eFX.',
        ],
      },
    },
    {
      id: 'golpes-comuns-no-brasil',
      aba: 'brasil',
      titulo: 'Golpes comuns no Brasil',
      emUmaFrase:
        'Os golpes mudam de disfarce, mas repetem a mesma promessa: lucro fácil. E, na ' +
        'hora de sacar, pedem mais dinheiro.',
      paragrafos: [
        'Quatro golpes aparecem muito no Brasil. Veja o que cada um promete e onde está a ' +
          'armadilha.',
      ],
      quadro: [
        {
          rotulo: '1. Falso robô de trade',
          texto:
            'Promete lucro fixo com um "robô" que sempre ganha. Isso é impossível num mercado ' +
            'de risco. Caso mais conhecido: a Atlas Quantum, multada pela CVM (o órgão que ' +
            'fiscaliza investimentos) em mais de R$ 55,8 milhões em 2024.',
        },
        {
          rotulo: '2. Grupo de sinais',
          texto:
            'Vende avisos de "compre agora". O organizador compra antes, manda o grupo comprar ' +
            'e vende no topo (pump and dump). Muitas vezes também ganha comissão da corretora ' +
            'pelo volume que você opera.',
        },
        {
          rotulo: '3. Pirâmide com cara de fundo cripto',
          texto:
            'É um esquema Ponzi: paga os antigos com o dinheiro dos novos, sem lucro real, até ' +
            'desabar. A CVM avisa com alertas chamados stop orders, que mandam parar na hora.',
        },
        {
          rotulo: '4. Falso investimento por WhatsApp',
          texto:
            'O pig butchering. Um falso "assessor" ganha sua confiança por semanas e indica uma ' +
            'plataforma falsa com lucros subindo na tela. Na hora de sacar, o saque trava.',
        },
      ],
      exemplo: {
        titulo: 'Um caso real: Operação Criptoabate (Rio Grande do Sul, 2026)',
        passos: [
          'A vítima entrou num grupo de WhatsApp com um falso "professor".',
          'Seguindo as orientações dele, transferiu dinheiro por seis meses.',
          'Total perdido: R$ 37 milhões.',
        ],
      },
      listaTitulo: 'Sinais de alerta comuns aos quatro:',
      lista: [
        'Promessa de rendimento fixo ou garantido.',
        'Pressão por urgência: "é agora ou nunca".',
        'Exigência de recrutar outras pessoas.',
        'Saque bloqueado até um novo depósito ou o pagamento de uma "taxa".',
        'Empresa sem registro ou autorização.',
      ],
      paragrafosFinais: [
        'Como se defender: antes de colocar dinheiro, consulte os alertas e stop orders da CVM ' +
          '(gov.br/investidor) e veja se a instituição é autorizada pelo Banco Central ' +
          '(gov.br/bcb.gov.br). Estar numa lista de alerta, ou fora da lista de autorizadas, é ' +
          'um forte sinal de perigo.',
      ],
      detalhe: {
        titulo: 'datas, multas e números de cada golpe',
        lista: [
          'Atlas Quantum dizia ter um robô de arbitragem de Bitcoin chamado "Quantum" ' +
            '(arbitragem é lucrar com a diferença de preço entre dois lugares).',
          'Grupos de sinais: o conflito de interesse é o "trader" ganhar comissão da ' +
            'corretora pelo volume. Quanto mais você opera e perde, mais ele fatura.',
          'Pig butchering: a aproximação às vezes envolve relação afetiva. Quando o saque ' +
            'trava, pedem outro depósito ou uma "taxa" para liberar.',
          'Atlas Quantum: a Deliberação CVM nº 826, de 13 de agosto de 2019, mandou parar a ' +
            'oferta pública do serviço. Em julgamento do Colegiado em 21 de maio de 2024, a ' +
            'CVM aplicou multas que somaram mais de R$ 55,8 milhões aos envolvidos, por ' +
            'operação fraudulenta e embaraço à fiscalização.',
          'Prejuízo da Atlas Quantum: as estimativas da imprensa variam muito, de cerca de ' +
            'R$ 1,1 bilhão e 47 mil investidores até cerca de R$ 7 bilhões e 200 mil ' +
            'pessoas. Não há um número oficial único consolidado.',
          'Pirâmides: as stop orders da CVM são alertas de suspensão. Além da CVM, o ' +
            'Ministério Público atua nas esferas cível e criminal.',
          'Pig butchering: a CVM, no Portal do Investidor (6 de outubro de 2025), estima ' +
            'que o prejuízo global tenha ultrapassado US$ 75 bilhões entre 2020 e 2024, ' +
            'com parte significativa em criptoativos.',
          'Operação Criptoabate: deflagrada pela Polícia Civil do Rio Grande do Sul em 13 ' +
            'de agosto de 2026. Além do caso de R$ 37 milhões, a investigação revelou uma ' +
            'estrutura com mais de R$ 30 bilhões em transações suspeitas.',
        ],
      },
    },
    {
      id: 'impostos',
      aba: 'brasil',
      titulo: 'Impostos: a obrigação existe (e este módulo não ensina a calcular)',
      emUmaFrase:
        'Vender ou trocar cripto pode gerar imposto. Guarde o registro de tudo e consulte ' +
        'um contador.',
      paragrafos: [
        'Este material não dá orientação tributária. O objetivo é só deixar claro que a ' +
          'obrigação existe.',
        'No Brasil, cripto é tratada como um bem. O lucro está sujeito a imposto sobre ' +
          'ganho de capital, e há também obrigações de declaração.',
        'Primeiro recado: vender ou trocar cripto pode gerar imposto, e esse imposto pode ' +
          'ter prazo.',
        'Segundo recado: guarde o registro de todas as operações, com datas, valores e ' +
          'taxas. É isso que permite calcular corretamente.',
        'As regras mudaram nos últimos anos, e a Receita Federal passou a receber mais ' +
          'informações. Como qualquer erro pode levar à malha fina, consulte um contador ' +
          'para o seu caso concreto.',
      ],
      detalhe: {
        titulo: 'a lei e a plataforma DeCripto',
        lista: [
          'As regras mudaram com a Lei 14.754/2023 (a "Lei das Offshores") e com novas ' +
            'normas da Receita Federal.',
          'A partir de julho de 2026, a plataforma DeCripto amplia a fiscalização, ' +
            'exigindo que plataformas informem as operações à Receita Federal.',
          'A DeCripto foi instituída pela IN RFB nº 2.291/2025 e é alinhada ao padrão ' +
            'internacional CARF da OCDE.',
        ],
      },
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
  // sem conta de terceiro. Cada um aparece logo depois da seção que ele reforça
  // (ver criarSecoesComIntervalo em views/modulo1.js).
  //
  // O vídeo NUNCA substitui a seção de texto: ele entra ao lado dela. Quem lê
  // rápido pula, quem prefere assistir assiste, e quem está sem internet ainda
  // tem o módulo inteiro — porque o vídeo fica fora do precache do service
  // worker (300 MB de precache tornaria a primeira visita insuportável).
  // ---------------------------------------------------------------------------
  videos: {
    'mecanica-do-gas': {
      titulo: 'A mecânica do gas',
      src: 'assets/videos/mecanica-do-gas.mp4',
      duracao: '8:01',
      descricao:
        'Por que toda transação cobra taxa, por que ela varia de minuto a minuto, e por que ' +
        'uma transação que falha cobra do mesmo jeito.',
      // PENDENTE: transcrição. Todo outro visual do hub tem versão em texto
      // (diagrama tem versaoEmTexto, gráfico tem reserva, anatomia tem legenda).
      // Sem ela, este vídeo é o único elemento do hub sem equivalente em texto —
      // o que quebra o padrão de acessibilidade e deixa quem está offline sem
      // nada. Preencher assim que houver a transcrição do áudio.
      transcricao: [],
    },
  },

  anatomias: {
    transacao: {
      titulo: 'Anatomia de uma transação no explorador',
      descricao:
        'Os campos que importam para um iniciante, e o erro clássico de leitura. Clique num ' +
        'item da legenda para localizar no desenho.',
      viewBox: [0, 0, 640, 360],
      paineis: [
        { id: 'hash', x: 12, y: 12, w: 616, h: 52, rotulo: 'Transaction Hash — 0x… (66 caracteres)', tipo: 'campo' },
        { id: 'status', x: 12, y: 76, w: 200, h: 70, rotulo: 'Status', tipo: 'numeros', alerta: true },
        { id: 'bloco', x: 224, y: 76, w: 200, h: 70, rotulo: 'Block + confirmações', tipo: 'numeros' },
        { id: 'timestamp', x: 436, y: 76, w: 192, h: 70, rotulo: 'Timestamp (UTC)', tipo: 'numeros' },
        { id: 'de', x: 12, y: 158, w: 300, h: 60, rotulo: 'From — quem enviou', tipo: 'campo' },
        { id: 'para', x: 328, y: 158, w: 300, h: 60, rotulo: 'To — quem recebeu (ou "Contract")', tipo: 'campo' },
        { id: 'value', x: 12, y: 230, w: 300, h: 56, rotulo: 'Value — moeda nativa', tipo: 'numeros', alerta: true },
        { id: 'fee', x: 328, y: 230, w: 300, h: 56, rotulo: 'Transaction Fee / Gas', tipo: 'numeros' },
        { id: 'tokens', x: 12, y: 298, w: 616, h: 50, rotulo: 'Aba Token Transfers — o que de fato se moveu', tipo: 'lista' },
      ],
      itens: [
        {
          painel: 'hash',
          titulo: 'O identificador único',
          texto: 'Cole no explorador para achar a transação. Começa com "0x" em redes EVM; na Solana o equivalente é a Signature.',
        },
        {
          painel: 'status',
          titulo: 'Success ou Failed',
          texto: 'Verde deu certo, vermelho falhou — e atenção: mesmo falhando, você pagou a taxa de gas.',
        },
        {
          painel: 'para',
          titulo: '"To" pode ser um contrato',
          texto: 'Em transferência de token, o "To" costuma ser o contrato do token, não uma pessoa. A palavra "Contract" no lugar de um endereço comum denuncia isso.',
        },
        {
          painel: 'value',
          titulo: 'Value 0 não significa "nada aconteceu"',
          texto: 'O erro clássico de iniciante. Numa transferência de token, o Value (moeda nativa) pode ser zero enquanto tokens se moveram — olhe a aba de baixo.',
        },
        {
          painel: 'tokens',
          titulo: 'Onde o movimento de verdade aparece',
          texto: 'A aba Token Transfers (ou Balance Changes, no Solscan) mostra o que de fato saiu e entrou de cada carteira.',
        },
        {
          painel: 'bloco',
          titulo: 'Confirmações',
          texto: 'Quantos blocos já foram empilhados em cima do seu. Cada um aumenta o custo de reescrever a história — é o que torna a transação imutável.',
        },
      ],
      nota: 'Layout genérico inspirado em Etherscan e Solscan; muda o nome dos campos, não a lógica. Confira sempre a URL do explorador (etherscan.io, solscan.io) — existem sites falsos.',
    },

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
