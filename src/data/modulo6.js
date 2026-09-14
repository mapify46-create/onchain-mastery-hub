// modulo6.js — conteúdo do Módulo 6 (Ler a tela: o que os números escondem).
// Aqui só tem DADOS: nenhuma lógica, nenhum HTML. A matemática da calculadora mora
// em src/views/modulo6.js.
//
// De onde vem: pesquisas 1, 2, 3 e 7 dos módulos, com as correções e as checagens ao
// vivo registradas em pesquisa/modulos/pesquisas/VERIFICACOES-AO-VIVO.md. Onde uma
// pesquisa errou, vale a verificação.
//
// Cada seção tem `aba` e `id`. A view monta cada aba escolhendo as seções por id,
// para poder intercalar texto, desenho, tabela e calculadora na ordem certa.

export const modulo6 = {
  id: 'modulo-6',
  titulo: 'Ler a tela',

  resumo:
    'Os números de um terminal parecem medir o token. Medem outra coisa — e alguns são ' +
    'fabricados de propósito. Este módulo mostra o que cada número é de verdade, como o ' +
    'volume é inventado, que armadilhas moram no contrato, e o que a pesquisa consegue e ' +
    'não consegue prever sobre um golpe.',

  objetivos: [
    'Diferenciar market cap, FDV e liquidez, e calcular quanto dá para vender de fato.',
    'Ler o preço e o PnL da tela sabendo o que eles escondem.',
    'Reconhecer volume fabricado e entender por que todo sinal público é contornado.',
    'Checar o contrato: SPL clássico ou Token-2022, extensões, autoridades e metadata.',
    'Saber o que a pesquisa sustenta — e o que não sustenta — sobre prever um rug.',
  ],

  // ---------------------------------------------------------------------------
  // Seções de texto
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
      paragrafos: [
        'Na tela de qualquer memecoin aparecem três números grandes. Eles parecem medir a ' +
          'mesma coisa, mas cada um responde a uma pergunta diferente.',
      ],
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
        },
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
      paragrafosFinais: [
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
    },
    {
      id: 'quanto-sai',
      aba: 'numeros',
      titulo: 'Quanto dá para vender antes de derrubar o preço',
      emUmaFrase:
        'Cada venda derruba o preço. Derrubar o preço pela metade devolve só 14,64% da ' +
        'liquidez anunciada, seja a pool grande ou pequena.',
      paragrafos: [
        'A liquidez anunciada não é o quanto você consegue tirar. Cada venda empurra o preço ' +
          'para baixo, e a parte seguinte da venda sai mais barata.',
        'Por isso a pergunta útil não é "quanto de liquidez tem?". É "quanto eu tiro antes de ' +
          'o preço cair X%?".',
        'A conta tem uma surpresa: a resposta, em porcentagem, não depende do tamanho da pool.',
      ],
      quadro: [
        {
          rotulo: 'Para o preço cair 10%',
          texto:
            'Você vende cerca de 5,4% dos tokens da reserva. Recebe 2,57% da liquidez anunciada.',
        },
        {
          rotulo: 'Para o preço cair pela metade',
          texto: 'Você recebe 14,64% da liquidez anunciada.',
        },
      ],
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
      paragrafosFinais: [
        'Por isso market cap de milhões com liquidez de milhares é número de fantasia. A ' +
          'liquidez limita quanto qualquer pessoa consegue sair.',
        'E a sua própria venda também entra nesse limite.',
      ],
      detalhe: {
        titulo: 'a fórmula por trás e a "proporção saudável"',
        paragrafos: [
          'A conta vale para pools de produto constante. É a fórmula x · y = k das AMMs, as ' +
            'pools automáticas das DEXs. A curva do pump.fun também usa essa fórmula.',
          'Na fórmula, x e y são as quantidades dos dois lados da pool. O produto das duas, k, ' +
            'fica constante a cada troca.',
          'Nenhuma pesquisa revisada por pares publica uma proporção "saudável" entre liquidez e ' +
            'market cap. Quem cita uma está usando regra de bolso.',
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
      paragrafos: [
        'Preços minúsculos têm zeros demais para caber na tela. Por isso aparecem com os zeros ' +
          'compactados.',
      ],
      exemplo: {
        titulo: 'Lendo $0.0₅2786',
        passos: [
          'O 5 pequeno diz quantos zeros vêm depois da vírgula, antes do 2786.',
          'Escrito por extenso, o preço real é US$ 0,000002786.',
          'Copiado para uma planilha, o 5 pequeno vira um 5 comum: "$0.052786".',
          'Esse número é cerca de 19 mil vezes o preço real.',
        ],
      },
      paragrafosFinais: [
        'O erro acontece quando o número vira texto: copiado para uma planilha, lido às pressas ' +
          'ou lido por um leitor de tela (programa que lê a tela em voz alta).',
      ],
      detalhe: {
        titulo: 'onde achar o preço completo',
        paragrafos: [
          'Nenhuma das ferramentas documenta essa notação.',
          'No DexScreener, o valor inteiro fica guardado na dica que aparece ao passar o mouse. ' +
            'A API (o acesso de dados para programas) entrega o preço completo.',
        ],
      },
    },
    {
      id: 'pnl',
      aba: 'numeros',
      titulo: 'PnL: o lucro que a tela mostra',
      emUmaFrase:
        'O lucro não realizado da tela não é o dinheiro que chega na carteira quando você vende.',
      paragrafos: [
        'PnL quer dizer lucro ou prejuízo (do inglês "profit and loss"). A tela mostra dois tipos.',
      ],
      quadro: [
        {
          rotulo: 'PnL realizado',
          texto: 'O que você já travou vendendo. Esse dinheiro existe.',
        },
        {
          rotulo: 'PnL não realizado',
          texto:
            'Preço de agora × tokens que você tem. É uma estimativa, e é aí que mora a ilusão.',
        },
      ],
      paragrafosFinais: [
        'O não realizado não desconta o impacto da sua própria venda.',
        'E a documentação dos terminais consultados não diz que ele desconta as taxas.',
        'Em memecoin de pouca liquidez, o número verde quase nunca é o que chega na carteira. A ' +
          'calculadora acima mostra quanto chega.',
      ],
      detalhe: {
        titulo: 'o erro de leitura ao contrário',
        paragrafos: [
          'A central de ajuda da GMGN registra casos de quem vendeu 0,12 SOL pagando 0,2 SOL de ' +
            'taxa de prioridade.',
          'A taxa foi maior que a venda, e a pessoa achou que a venda não tinha caído na carteira.',
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
      paragrafos: [
        'O nome disso é wash trading: negociar consigo mesmo para parecer movimento.',
      ],
      exemplo: {
        titulo: 'Uma rodada de volume falso',
        passos: [
          'A carteira A compra uma quantidade do token.',
          'A carteira B vende quase a mesma quantidade.',
          'As duas carteiras são da mesma pessoa.',
          'Na tela, cada operação aparece como se fosse de gente diferente. O volume sobe.',
        ],
      },
      paragrafosFinais: [
        'Numa DEX, isso custa dinheiro de verdade. Cada troca paga a taxa da pool e a taxa da rede.',
        'Fabricar US$ 1 milhão de volume custa perto de US$ 13 mil num token grande, com taxa de ' +
          'pool de 0,30%.',
        'Num token recém-graduado, com taxa de pool de 1,25%, custa perto de US$ 23 mil. As duas ' +
          'contas já somam o 1% que um serviço de volume anuncia cobrar.',
        'Por que alguém paga: volume compra lugar nas listas de "em alta". E a lista traz ' +
          'compradores de verdade.',
        'Uma ironia que vale guardar: a taxa da pool é mais alta justamente no token pequeno e ' +
          'recém-graduado. É ali que a manipulação das listas de "em alta" é mais usada.',
      ],
      detalhe: {
        titulo: 'os Boosts do DexScreener',
        paragrafos: [
          'O DexScreener vende "Boosts", que turbinam o token no trending (a lista de "em alta") ' +
            'por 12 a 24 horas.',
          'Ele não publica os pesos do algoritmo que monta essa lista.',
        ],
      },
    },
    {
      id: 'otimizado-contra',
      aba: 'volume',
      titulo: 'Todo sinal público é otimizado contra',
      emUmaFrase:
        'Todo número que você aprende a olhar, quem manipula também aprende a falsificar.',
      paragrafos: [
        'Um vendedor de volume publica, com todas as letras, como engana quem olha a tela.',
      ],
      listaTitulo: 'O que ele diz que faz:',
      lista: [
        'Espalha as operações em mais de 100 carteiras. O motivo, nas palavras dele: um token ' +
          'com US$ 300 mil de volume e só 50 carteiras "é imediatamente suspeito".',
        'Sorteia o tamanho e o horário de cada operação.',
        'Deixa algumas carteiras só comprando.',
        'Usa carteiras novas a cada campanha.',
      ],
      paragrafosFinais: [
        'A lição vale para a tela inteira. Qualquer número único que você aprenda a olhar já ' +
          'foi, ou pode ser, calibrado contra você.',
        'Isso não torna os sinais inúteis. Torna cada um uma triagem (um primeiro filtro), ' +
          'nunca um veredito.',
        'A defesa é cruzar vários sinais que custa caro falsificar ao mesmo tempo: volume, ' +
          'makers (carteiras diferentes que negociaram), concentração de holders, carteiras ' +
          'ligadas entre si e idade do token.',
      ],
    },
    {
      id: 'o-que-da-para-ver',
      aba: 'volume',
      titulo: 'O que dá para ver de graça — e o que não dá',
      emUmaFrase:
        'O primeiro sinal de volume fabricado dá para ver de graça. A confirmação, não.',
      paragrafos: [
        'Um estudo revisado por pares analisou 34.988 tokens em busca de crescimento artificial. ' +
          'Ele trabalha em dois passos.',
      ],
      quadro: [
        {
          rotulo: 'Passo 1: a suspeita',
          texto:
            'O volume subiu mais de 500% com o preço variando menos de 5%. A variação de preço ' +
            'está de graça no DexScreener e no GeckoTerminal. O volume de ontem, para comparar, ' +
            'só dá para aproximar.',
        },
        {
          rotulo: 'Passo 2: a confirmação',
          texto:
            '"Volume circular": 99% ou mais do volume do dia vem de carteiras que compraram e ' +
            'venderam no mesmo dia. Isso exige cruzar milhares de operações, carteira por ' +
            'carteira. Não sai no plano gratuito de ferramenta nenhuma.',
        },
      ],
      paragrafosFinais: [
        'E as razões populares, como "volume por carteira" ou "volume por liquidez", não têm ' +
          'limiar publicado com método e taxa de erro.',
        'Os números que circulam para elas são regra de bolso.',
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
      paragrafos: [
        'Um bundle é um pacote de até 5 transações que entram juntas, em ordem, no mesmo bloco. ' +
          'Ou entram todas, ou nenhuma entra.',
        'Bloco é o lote de transações que a rede grava de uma vez.',
        'No lançamento, o bundle serve para o criador comprar uma fatia grande em várias ' +
          'carteiras. Tudo antes de o token aparecer para o público.',
        'O peso disso é grande. Numa amostra de 41.470 tokens que graduaram, 36,5% do supply ' +
          'estava em carteiras de bundle na hora da migração para a DEX.',
      ],
      quadro: [
        {
          rotulo: 'Engana: "Total bundled %"',
          texto:
            'Quanto foi comprado em bundle. Sozinho engana, porque o criador pode comprar, ' +
            'vender e recomprar.',
        },
        {
          rotulo: 'Importa: "Current held %"',
          texto:
            'Quanto as carteiras de bundle AINDA seguram. É assim que o trench.bot mostra esse ' +
            'número.',
        },
      ],
      paragrafosFinais: [
        'Bundle não é prova de golpe. Há quem use para se proteger de snipers (robôs que compram ' +
          'nos primeiros instantes de um token).',
      ],
      detalhe: {
        titulo: 'a infraestrutura, o estudo e o top 10',
        paragrafos: [
          'O Jito, usado por quase toda a rede, é a infraestrutura dos bundles.',
          'O número de 36,5% vem do MELT, um preprint (artigo ainda sem revisão por pares).',
          'No mesmo estudo, juntar as carteiras de bundle faz a fatia do top 10 subir 24 pontos ' +
            'nos tokens de alto risco. Nos de baixo risco, sobe 6.',
        ],
      },
    },

    // =============================== CONTRATO ================================
    {
      id: 'spl-ou-2022',
      aba: 'contrato',
      titulo: 'SPL clássico ou Token-2022: o programa que manda no token',
      emUmaFrase:
        'Todo token da Solana roda num de dois programas. Token-2022 não é perigo por si só: ' +
        'perigosa é a extensão a mais.',
      paragrafos: [
        'Programa, na Solana, é o código que administra o token. Existem dois para isso.',
      ],
      quadro: [
        {
          rotulo: 'SPL clássico',
          texto:
            'O original. Não tem taxa de transferência nem extensões. No Solscan, o campo ' +
            '"Owner Program" começa com Tokenkeg…',
        },
        {
          rotulo: 'Token-2022',
          texto:
            'O novo. Aceita "extensões" opcionais, escolhidas na criação: metadados, taxa, ' +
            'delegado permanente, gancho de transferência. No Solscan, começa com Tokenz…',
        },
      ],
      paragrafosFinais: [
        'O pump.fun passou a criar tokens em Token-2022. Numa checagem na blockchain em ' +
          '12/09/2026, 24 de 24 tokens do pump.fun eram Token-2022.',
        'Todos tinham só duas extensões, as de metadados. Por isso, o alerta num token do ' +
          'pump.fun é aparecer qualquer extensão além dessas duas.',
        'A LetsBonk e a LaunchLab da Raydium seguem criando SPL clássico.',
      ],
      detalhe: {
        titulo: 'nomes técnicos e datas',
        paragrafos: [
          'A mudança no pump.fun veio com a instrução create_v2, ativada em 12/11/2025.',
          'As duas extensões de metadados se chamam metadataPointer e tokenMetadata.',
        ],
      },
    },
    {
      id: 'extensoes',
      aba: 'contrato',
      titulo: 'As extensões que mudam o jogo',
      emUmaFrase:
        'Duas extensões pesam mais contra quem comprou: delegado permanente e gancho de ' +
        'transferência.',
      paragrafos: [
        'Extensão é um recurso extra ligado no token na hora em que ele é criado.',
      ],
      quadro: [
        {
          rotulo: 'Delegado permanente',
          texto: 'Permite mover ou queimar os seus tokens sem a sua assinatura.',
        },
        {
          rotulo: 'Gancho de transferência',
          texto:
            'Roda um programa do criador a cada transferência. Esse programa pode recusar a sua ' +
            'venda.',
        },
      ],
      paragrafosFinais: [
        'A taxa de transferência é outra extensão. O teto dela é 100%.',
        'Ela só pode ser configurada na criação do token. Um token criado sem ela não ganha ' +
          'taxa depois.',
        'Quando existe, ela tem uma trava: mudar o valor só vale duas epochs depois, cerca de 4 ' +
          'dias. Epoch é um ciclo de tempo da rede Solana.',
        'Mas a trava não protege de tudo. Uma taxa alta pode vir desde o lançamento.',
      ],
    },
    {
      id: 'autoridades',
      aba: 'contrato',
      titulo: 'Autoridades: o que o dono ainda pode fazer',
      emUmaFrase:
        'Autoridade é uma permissão que o dono guardou. Com a de mint ele cria tokens; com a de ' +
        'freeze, congela contas.',
      paragrafos: [
        'Autoridade, na Solana, é uma permissão especial sobre o token. Duas importam mais para ' +
          'quem compra.',
      ],
      quadro: [
        {
          rotulo: 'Mint authority',
          texto:
            'Permissão de criar tokens novos. Ativa, dilui quem comprou: o seu pedaço do total ' +
            'fica menor.',
        },
        {
          rotulo: 'Freeze authority',
          texto:
            'Permissão de congelar a conta de alguém. Ativa, você compra e pode não conseguir ' +
            'vender.',
        },
      ],
      paragrafosFinais: [
        'A freeze ativa é o "honeypot" da Solana: o token deixa comprar e pode não deixar ' +
          'vender. Não precisa de código esperto nenhum.',
        'No pump.fun, as duas vêm revogadas (desligadas) em todo token. Isso é bom, mas não ' +
          'ajuda a escolher: se estão sempre desligadas, não separam um token do outro.',
        'Fora do pump.fun, são a primeira coisa a olhar.',
        'Cuidado no Solscan: um endereço no campo "Authority" pode ser só a autoridade de ' +
          'metadados. Veja abaixo.',
      ],
      detalhe: {
        titulo: 'o campo "Authority" do Solscan',
        paragrafos: [
          'Esse campo é um menu que junta três autoridades: de mint, de freeze e de metadados.',
          'Ele mostra "N/A" quando todas foram revogadas.',
          'Um endereço ali não quer dizer que o dono ainda emite tokens. Pode ser só a ' +
            'autoridade de metadados.',
        ],
      },
    },
    {
      id: 'metadata',
      aba: 'contrato',
      titulo: 'Metadata mutável',
      emUmaFrase:
        'Com a autoridade de metadados ativa, o dono pode trocar nome, símbolo e imagem depois ' +
        'que você comprou.',
      paragrafos: [
        'Metadados são o nome, o símbolo e a imagem do token.',
        'Se a autoridade de metadados continua ativa, o dono pode trocá-los depois da sua ' +
          'compra. E o token passa a se parecer com outro.',
      ],
      quadro: [
        {
          rotulo: 'Num token SPL clássico',
          texto: 'Aparece como "Mutable: true" na aba Metadata do Solscan.',
        },
        {
          rotulo: 'Num Token-2022',
          texto: 'É a update authority (autoridade de atualização) do tokenMetadata.',
        },
      ],
      paragrafosFinais: [
        'Nos tokens do pump.fun checados, essa porta estava fechada. O risco mora nos tokens ' +
          'criados fora dele.',
      ],
      detalhe: {
        titulo: 'a checagem no pump.fun',
        paragrafos: [
          'A autoridade do tokenMetadata e a do metadataPointer eram nulas em 11 de 11 tokens ' +
            'checados.',
        ],
      },
    },
    {
      id: 'dev-dump',
      aba: 'contrato',
      titulo: 'Dev dump: o golpe que sobra no pump.fun',
      emUmaFrase:
        'No pump.fun o criador não consegue tirar a liquidez. O golpe que sobra é ele vender o ' +
        'que comprou barato.',
      paragrafos: [
        'Depois da graduação, a pool do pump.fun pertence ao protocolo. O criador não consegue ' +
          'retirar a liquidez.',
      ],
      exemplo: {
        titulo: 'Como o dev dump acontece',
        passos: [
          'O criador compra barato no lançamento, muitas vezes em várias carteiras, no mesmo bloco.',
          'Outras pessoas chegam depois e compram mais caro.',
          'O criador vende tudo em cima de quem chegou depois.',
        ],
      },
      paragrafosFinais: [
        'A trilha fica visível. A carteira que criou o token aparece como "Creator" no Solscan.',
        'O histórico dessa carteira mostra quanto ela comprou e quando vendeu.',
        'Um guia de ferramenta descreve o padrão: as carteiras do primeiro bloco vendendo nos ' +
          'primeiros 30 minutos. É descrição, sem medição.',
      ],
      detalhe: {
        titulo: 'os dois limites desse sinal',
        lista: [
          'Nenhum estudo revisado por pares isolou "o criador vendeu" como preditor de rug (um ' +
            'sinal que antecipa o golpe).',
          'Quem monta o golpe usa carteiras intermediárias para esconder o vínculo.',
        ],
      },
    },
    {
      id: 'evm',
      aba: 'contrato',
      titulo: 'Fora da Solana: a taxa mora no código',
      emUmaFrase:
        'Em Ethereum, BSC e Base, a taxa e o bloqueio da venda ficam no código. A checagem é ' +
        'simular antes.',
      paragrafos: [
        'Nessas redes, a taxa de venda e o bloqueio da venda ficam no próprio código do contrato.',
        'A checagem que funciona é simular uma compra e uma venda antes de comprar de verdade. ' +
          'O honeypot.is faz isso de graça.',
        'Mas a simulação é só um retrato do momento.',
        'Num contrato atualizável, o dono pode trocar a lógica por trás. Aí ele pode mudar a ' +
          'taxa ou bloquear vendas depois que você comprou.',
      ],
    },

    // =============================== DETECÇÃO ================================
    {
      id: 'o-que-conta',
      aba: 'deteccao',
      titulo: 'O que conta como rug, para quem mede',
      emUmaFrase:
        'Quantos tokens "deram rug" depende da régua usada. Com réguas diferentes, os números vão ' +
        'de 3,59% a 98,6%.',
      paragrafos: [
        'Rug vem de "rug pull", puxar o tapete: o token desaba e quem comprou fica sem saída.',
        'Não existe uma definição única. Cada estudo escolhe a sua régua, e o número muda com ela.',
      ],
      exemplo: {
        titulo: 'A régua do maior estudo de detecção de rug na Solana',
        passos: [
          'Acompanhou 6,4 milhões de tokens do PumpFun e da Raydium, de 30/11/2024 a 30/06/2025.',
          'Chamou de rug o token cuja liquidez caiu 99% desde o pico.',
          'Ou o token que ficou parado por mais de 80% da própria vida.',
          'Por essa régua, 81,9% dos tokens de teste do PumpFun deram rug. Na Raydium, 60,8%.',
        ],
      },
      paragrafosFinais: [
        'A Chainalysis usou outra régua. Contou 3,59% dos tokens de 2024 como suspeitos de ' +
          'pump-and-dump (inflar o preço e vender em cima de quem chega).',
        'A Solidus Labs contou 98,6% dos tokens do pump.fun com a liquidez abaixo de US$ 1.000. ' +
          'Isso é colapso de liquidez, não fraude provada.',
        'A pump.fun contestou publicamente o número da Solidus Labs.',
      ],
    },
    {
      id: 'melhor-detector',
      aba: 'deteccao',
      titulo: 'O melhor detector, em linguagem simples',
      emUmaFrase:
        'O melhor detector publicado acerta mais que o chute, mas pouco. Os próprios autores ' +
        'dizem que ele ainda não serve para uso real.',
      paragrafos: [
        'O modelo que se saiu melhor se chama XGBoost. É um tipo de programa que aprende ' +
          'padrões a partir de exemplos.',
        'Ele olha só os 5 primeiros minutos de negociação: quantidade de compras e vendas, ' +
          'carteiras únicas, valores e variação de preço.',
        'Nenhuma das 23 características que ele usa é de holders, bundles, autoridades ou redes ' +
          'sociais.',
        'A nota mais citada dele é o F1, que vai de 0 a 1. O problema: quase todo token do ' +
          'teste era rug, e aí até um chute burro tira nota alta.',
      ],
      quadro: [
        {
          rotulo: 'F1 do modelo',
          texto: '0,79.',
        },
        {
          rotulo: 'F1 de chutar "tudo é rug"',
          texto: '0,90 no mesmo teste. Melhor que o modelo nessa nota.',
        },
        {
          rotulo: 'MCC do modelo',
          texto:
            '0,39. O MCC vai de −1 a 1 e não se deixa enganar quando quase tudo é rug. Acerto ' +
            'modesto.',
        },
      ],
      exemplo: {
        titulo: 'Em 100 tokens (estimativa)',
        passos: [
          'De cada 100 tokens que o modelo marca como rug, cerca de 95 são rug mesmo.',
          'De cada 100 rugs reais, ele pega uns 68.',
          'O artigo não publica esses dois números. Eles foram reconstruídos pelas contagens do ' +
            'teste.',
        ],
      },
      paragrafosFinais: [
        'Os próprios autores dizem que o resultado ainda não serve para uso real.',
        'E o que o modelo aprende num lugar não vale no outro. Treinado na Raydium e testado no ' +
          'PumpFun, o MCC cai para perto de zero.',
        'Os autores também reconhecem que o golpe muda com o tempo.',
      ],
      detalhe: {
        titulo: 'como ler F1 e MCC',
        paragrafos: [
          'O F1 junta duas perguntas. Do que o modelo acusou, quanto era rug? E, dos rugs reais, ' +
            'quantos ele achou?',
          'O MCC vai de −1 a 1. Perto de 1 é acerto quase perfeito, 0 é o mesmo que chutar, e ' +
            '−1 é errar tudo.',
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
      paragrafos: [
        'Estudos independentes, em redes diferentes, concordam numa família de sinais: quem ' +
          'controla o token no minuto zero, e como disfarça isso.',
      ],
      quadro: [
        {
          rotulo: 'Têm apoio da pesquisa',
          texto:
            'Concentração de holders depois de juntar as carteiras ligadas. Compra coordenada no ' +
            'lançamento. Negociação artificial.',
        },
        {
          rotulo: 'O mercado repete, mas têm menos apoio',
          texto:
            'LP travada (liquidez trancada) não separa golpe de não golpe. Mint e freeze ' +
            'authority são mecânica certa, mas vêm sempre revogadas no pump.fun. Ausência de ' +
            'redes sociais nunca foi medida como preditor.',
        },
      ],
      paragrafosFinais: [
        'No pump.fun, o que sobra é o criador vendendo e a concentração de insiders (gente de ' +
          'dentro, que entrou antes do público).',
        'É justamente aí que a medição revisada por pares é mais fraca.',
      ],
    },
    {
      id: 'por-que-importa',
      aba: 'deteccao',
      titulo: 'Como ler qualquer promessa de detecção',
      emUmaFrase:
        'Diante de "X% de precisão", pergunte: quanto acertaria quem chutasse "golpe" para tudo?',
      paragrafos: [
        'Um detector de rug vale tanto quanto duas coisas: a régua que define rug e a comparação ' +
          'com o chute mais burro possível.',
      ],
      exemplo: {
        titulo: 'Testando um anúncio de "95% de precisão"',
        passos: [
          'Pergunte: quantos por cento eram golpe na amostra?',
          'Suponha que eram 82%.',
          'Então chutar "golpe" para todo token já acertava 82%.',
          'Os 95% precisam ser comparados com esses 82%, não com zero.',
        ],
      },
      paragrafosFinais: [
        'Por isso o checklist deste hub não aprova token nenhum.',
        'Ele reprova pelo que dá para ver, e separa cada item pela força da evidência.',
      ],
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
  // Anatomias — mockups desenhados, não capturas de plataforma nenhuma
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

  tabelaExtensoes: {
    colunas: [
      { chave: 'oQueFaz', rotulo: 'O que faz' },
      { chave: 'risco', rotulo: 'Risco para quem comprou' },
      { chave: 'pumpfun', rotulo: 'No pump.fun' },
    ],
    linhas: [
      {
        id: 'metadados',
        titulo: 'metadataPointer + tokenMetadata',
        valores: {
          oQueFaz: 'Guardam nome, símbolo e imagem dentro do próprio token.',
          risco: 'Nenhum, se a autoridade de atualização estiver nula.',
          pumpfun: 'Padrão, com as autoridades nulas em 11 de 11 checados.',
        },
      },
      {
        id: 'taxa',
        titulo: 'transferFeeConfig',
        valores: {
          oQueFaz: 'Cobra uma taxa em cada transferência, inclusive na venda.',
          risco: 'Pode chegar a 100%. Mudança só vale duas epochs depois.',
          pumpfun: 'Não aparece (0 de 24).',
        },
      },
      {
        id: 'delegado',
        titulo: 'permanentDelegate',
        valores: {
          oQueFaz: 'Dá a uma conta o poder de mover ou queimar tokens de qualquer carteira.',
          risco: 'O dono pode tirar os tokens da sua carteira sem a sua assinatura.',
          pumpfun: 'Não aparece (0 de 24).',
        },
      },
      {
        id: 'hook',
        titulo: 'transferHook',
        valores: {
          oQueFaz: 'Roda um programa do criador a cada transferência, que aprova ou recusa.',
          risco: 'Pode bloquear a sua venda.',
          pumpfun: 'Não aparece (0 de 24).',
        },
      },
    ],
  },

  tabelaSinais: {
    colunas: [
      { chave: 'evidencia', rotulo: 'O que a pesquisa diz' },
      { chave: 'pumpfun', rotulo: 'No pump.fun' },
    ],
    linhas: [
      {
        id: 'concentracao',
        titulo: 'Concentração real dos holders',
        valores: {
          evidencia: 'Medido: juntando carteiras ligadas, o top 10 sobe 24 pontos nos tokens de alto risco.',
          pumpfun: 'Vale, se você olhar os clusters e não só a lista.',
        },
      },
      {
        id: 'bundles',
        titulo: 'Bundles no lançamento',
        valores: {
          evidencia: 'Medido: entre os sinais mais preditivos de alto risco (MELT, preprint).',
          pumpfun: 'Vale; o que importa é quanto as carteiras ainda seguram.',
        },
      },
      {
        id: 'volume',
        titulo: 'Volume artificial',
        valores: {
          evidencia: 'Medido: 82,9% dos tokens que subiram mais de 100% tinham sinais (Midsummer, USENIX Security 2026).',
          pumpfun: 'Vale, mas é o sinal mais contornado de propósito.',
        },
      },
      {
        id: 'lp',
        titulo: 'LP travada',
        valores: {
          evidencia: 'Medido e desmentido: 97,3% dos tokens com trava eram maliciosos, contra 97,7% no geral.',
          pumpfun: 'Não se aplica: a pool pós-graduação é do protocolo.',
        },
      },
      {
        id: 'autoridades',
        titulo: 'Mint e freeze authority',
        valores: {
          evidencia: 'Mecânica certa, sem medição como preditor de rug.',
          pumpfun: 'Vêm sempre revogadas: não diferenciam um token do outro.',
        },
      },
      {
        id: 'dev-dump',
        titulo: 'O criador vendeu',
        valores: {
          evidencia: 'Nenhum preditor revisado por pares isola esse sinal.',
          pumpfun: 'É o golpe que sobra lá — e o menos medido.',
        },
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // Calculadora de saída (a matemática mora em views/modulo6.js)
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
  // Diagramas
  // ---------------------------------------------------------------------------
  diagramas: [
    {
      id: 'wash-trading',
      aba: 'volume',
      titulo: 'Como o volume falso vira compradores de verdade',
      legenda: 'Duas carteiras da mesma pessoa fabricam o volume que atrai os compradores reais.',
      codigoMermaid: [
        'flowchart LR',
        '  A["Carteira A compra"] --> T["A tela soma volume"]',
        '  B["Carteira B vende"] --> T',
        '  A -.-|mesma pessoa| B',
        '  T --> R["O token sobe nas listas de em alta"]',
        '  R --> C["Compradores reais chegam"]',
        '  C --> S["O grupo vende para eles"]',
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
