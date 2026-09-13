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
      paragrafos: [
        'Market cap é o preço multiplicado pelos tokens em circulação. FDV (valor ' +
          'totalmente diluído) é o preço multiplicado pelo supply total. Num token do pump.fun ' +
          'o supply é de 1 bilhão, todo criado no lançamento — por isso os dois costumam dar ' +
          'o mesmo número.',
        'Nenhum dos dois é dinheiro. Eles respondem "quanto valeria tudo, se todo mundo ' +
          'aceitasse o último preço". Esse preço foi feito por uma negociação pequena, e ' +
          'ninguém consegue vender o supply inteiro nele.',
        'Cada site conta "circulante" do seu jeito. Para o DexScreener, FDV é o supply total ' +
          'menos o queimado, vezes o preço; o market cap só muda quando o projeto informa o ' +
          'circulante ou a CoinGecko tem o dado. Para token ainda na bonding curve, DexScreener ' +
          'e GeckoTerminal não descontam nada — o GeckoTerminal nem mostra market cap, só FDV. ' +
          'E no Solscan o campo chamado "Market Cap" é, pela documentação dele, totalmente diluído.',
        'A liquidez é outra coisa: o valor dos dois lados da pool, somados. É o único dos três ' +
          'números que fala do dinheiro que existe para pagar quem vende — e mesmo ele não é ' +
          'o que você consegue sacar.',
      ],
    },
    {
      id: 'quanto-sai',
      aba: 'numeros',
      titulo: 'Quanto dá para vender antes de derrubar o preço',
      paragrafos: [
        'Numa pool de produto constante — a fórmula x · y = k das AMMs, que a curva do ' +
          'pump.fun também usa —, cada venda empurra o preço para baixo. A pergunta útil não é ' +
          '"quanto de liquidez tem", é "quanto eu tiro antes de o preço cair X%".',
        'A conta tem uma surpresa: a fração não depende do tamanho da pool. Para derrubar o ' +
          'preço em 10%, você vende cerca de 5,4% dos tokens da reserva e recebe 2,57% da ' +
          'liquidez anunciada. Para derrubar pela metade, recebe 14,64%.',
        'Por isso market cap de milhões com liquidez de milhares é número de fantasia: a ' +
          'liquidez limita quanto qualquer pessoa consegue sair, e a sua venda é parte desse ' +
          'limite. Nenhuma pesquisa revisada por pares publica uma proporção "saudável" entre ' +
          'liquidez e market cap — quem cita uma está usando regra de bolso.',
      ],
    },
    {
      id: 'zeros-compactados',
      aba: 'numeros',
      titulo: 'Zeros compactados: o preço que se lê errado',
      paragrafos: [
        'Preços minúsculos aparecem com os zeros compactados: $0.0₅2786. O 5 pequeno diz ' +
          'quantos zeros vêm depois da vírgula antes do 2786 — o preço real é US$ 0,000002786.',
        'O problema é quando esse número vira texto: copiado para uma planilha, lido às ' +
          'pressas ou lido por um leitor de tela. O 5 pequeno vira um 5 comum, e o preço ' +
          'aparece como "$0.052786" — cerca de 19 mil vezes o real.',
        'Nenhuma das ferramentas documenta essa notação. No DexScreener, o valor inteiro fica ' +
          'guardado na dica que aparece ao passar o mouse, e a API entrega o preço completo.',
      ],
    },
    {
      id: 'pnl',
      aba: 'numeros',
      titulo: 'PnL: o lucro que a tela mostra',
      paragrafos: [
        'PnL realizado é o que você já travou vendendo. PnL não realizado é "preço de agora ' +
          'vezes os tokens que você tem" — e é aí que mora a ilusão.',
        'O não realizado não desconta o impacto da sua própria venda, e a documentação dos ' +
          'terminais consultados não diz que desconta as taxas. Em memecoin de pouca liquidez, ' +
          'o número verde quase nunca é o que chega na carteira. A calculadora acima mostra ' +
          'quanto chega.',
        'Também existe o erro de leitura ao contrário: a central de ajuda da GMGN registra ' +
          'casos de quem vendeu 0,12 SOL pagando 0,2 SOL de taxa de prioridade e achou que a ' +
          'venda não tinha caído na carteira.',
      ],
    },

    // ================================ VOLUME =================================
    {
      id: 'como-fabrica',
      aba: 'volume',
      titulo: 'Como o volume é fabricado',
      paragrafos: [
        'Wash trading é negociar consigo mesmo para parecer movimento: a carteira A compra, a ' +
          'carteira B vende quase a mesma quantidade, e as duas são da mesma pessoa. Cada ' +
          'operação aparece na tela como se fosse de gente diferente.',
        'Numa DEX isso custa de verdade, porque cada troca paga a taxa da pool e a rede. Por ' +
          'US$ 1 milhão de volume, a conta fica perto de US$ 13 mil num token grande (taxa de ' +
          'pool de 0,30%) e de US$ 23 mil num recém-graduado (1,25%), somando o 1% que um ' +
          'serviço de volume anuncia cobrar.',
        'Por que alguém paga: volume compra lugar nas listas de "em alta", e a lista traz ' +
          'compradores de verdade. O DexScreener vende "Boosts" que turbinam o trending por 12 ' +
          'a 24 horas e não publica os pesos do algoritmo.',
        'Uma ironia que vale guardar: a taxa da pool é mais alta justamente no token pequeno ' +
          'e recém-graduado, onde a manipulação de trending é mais usada.',
      ],
    },
    {
      id: 'otimizado-contra',
      aba: 'volume',
      titulo: 'Todo sinal público é otimizado contra',
      paragrafos: [
        'Um vendedor de volume publica, com todas as letras, que espalha as operações em mais ' +
          'de 100 carteiras porque um token com US$ 300 mil de volume e só 50 carteiras "é ' +
          'imediatamente suspeito". Ele também sorteia tamanho e horário de cada operação, ' +
          'deixa algumas carteiras só comprando e usa carteiras novas a cada campanha.',
        'A consequência vale para a tela inteira: qualquer número único que você aprenda a ' +
          'olhar já foi, ou pode ser, calibrado contra você. Isso não torna os sinais inúteis. ' +
          'Torna cada um uma triagem, nunca um veredito.',
        'A defesa é cruzar sinais que custa caro falsificar ao mesmo tempo: volume, makers, ' +
          'concentração de holders, carteiras ligadas entre si, idade do token.',
      ],
    },
    {
      id: 'o-que-da-para-ver',
      aba: 'volume',
      titulo: 'O que dá para ver de graça — e o que não dá',
      paragrafos: [
        'Um estudo acadêmico de 34.988 tokens (Midsummer, preprint) começa a caça por ' +
          '"volume subiu mais de 500% com o preço variando menos de 5%". A variação de preço ' +
          'está de graça na tela do DexScreener e do GeckoTerminal. O volume de ontem, para ' +
          'comparar, só dá para aproximar.',
        'O mesmo estudo fecha o diagnóstico com "volume circular": 99% ou mais do volume do dia ' +
          'vindo de carteiras que compraram e venderam no mesmo dia. Isso exige cruzar milhares ' +
          'de operações carteira por carteira — não sai no plano gratuito de ferramenta nenhuma.',
        'Nenhuma razão do tipo "volume por carteira" ou "volume por liquidez" tem limiar ' +
          'publicado com método e taxa de erro. Os números que circulam são regra de bolso.',
      ],
    },
    {
      id: 'bundles',
      aba: 'volume',
      titulo: 'Bundles: a compra coordenada do lançamento',
      paragrafos: [
        'Um bundle é um pacote de até 5 transações que entram juntas, em ordem, no mesmo ' +
          'bloco — ou nenhuma entra. O Jito, usado por quase toda a rede, é a infraestrutura. ' +
          'No lançamento, o uso é o criador comprando uma fatia grande em várias carteiras ' +
          'antes de o token aparecer para o público.',
        'Numa amostra de 41.470 tokens que graduaram, 36,5% do supply estava em carteiras de ' +
          'bundle na hora da migração (MELT, preprint). Juntando essas carteiras, a fatia do ' +
          'top 10 sobe 24 pontos nos tokens de alto risco, contra 6 nos de baixo risco.',
        'Bundle não é prova de golpe: há quem use para se proteger de snipers. O que muda o ' +
          'sinal é quanto essas carteiras AINDA seguram. O trench.bot mostra isso como "Current ' +
          'held %"; o "Total bundled %" sozinho engana, porque o criador pode comprar, vender e ' +
          'recomprar.',
      ],
    },

    // =============================== CONTRATO ================================
    {
      id: 'spl-ou-2022',
      aba: 'contrato',
      titulo: 'SPL clássico ou Token-2022: o programa que manda no token',
      paragrafos: [
        'Todo token da Solana é administrado por um de dois programas. O SPL clássico é o ' +
          'original: não tem taxa de transferência nem extensões. O Token-2022 é o novo e ' +
          'aceita "extensões" opcionais, escolhidas na criação — metadados, taxa, delegado ' +
          'permanente, gancho de transferência.',
        'O pump.fun passou a criar tokens em Token-2022 com a instrução create_v2, ativada em ' +
          '12/11/2025. Numa checagem na blockchain em 12/09/2026, 24 de 24 tokens do pump.fun ' +
          'eram Token-2022, todos com só duas extensões: metadataPointer e tokenMetadata. A ' +
          'LetsBonk e a LaunchLab da Raydium seguem criando SPL clássico.',
        'Token-2022 não é sinal de perigo. Perigosa é a extensão a mais. Quem diz qual é o ' +
          'programa é o campo "Owner Program" do Solscan: Tokenkeg… é SPL clássico, Tokenz… é ' +
          'Token-2022.',
      ],
    },
    {
      id: 'extensoes',
      aba: 'contrato',
      titulo: 'As extensões que mudam o jogo',
      paragrafos: [
        'A taxa de transferência só pode ser configurada na criação do token: um token criado ' +
          'sem ela não ganha taxa depois. Quando existe, ela tem uma trava — mudar o valor só ' +
          'vale duas epochs depois, cerca de 4 dias. Mas o teto é 100%, e uma taxa alta pode ' +
          'vir desde o lançamento.',
        'Delegado permanente e gancho de transferência são as extensões que mais pesam contra ' +
          'quem comprou: o primeiro permite mover ou queimar seus tokens sem a sua assinatura; ' +
          'o segundo roda um programa do criador a cada transferência, que pode recusar a sua ' +
          'venda.',
      ],
    },
    {
      id: 'autoridades',
      aba: 'contrato',
      titulo: 'Autoridades: o que o dono ainda pode fazer',
      paragrafos: [
        'Mint authority é a permissão de criar tokens novos: ativa, dilui quem comprou. Freeze ' +
          'authority é a de congelar a conta de alguém: ativa, você compra e pode não conseguir ' +
          'vender — é o "honeypot" da Solana, sem código esperto nenhum.',
        'No pump.fun, as duas vêm revogadas em todo token. Isso é bom e inútil ao mesmo tempo: ' +
          'se estão sempre nulas, não separam um token do outro lá dentro. Fora do pump.fun, ' +
          'são a primeira coisa a olhar.',
        'No Solscan, o campo "Authority" é um menu que junta três autoridades — de mint, de ' +
          'freeze e de metadados — e mostra "N/A" quando todas foram revogadas. Um endereço ali ' +
          'não quer dizer que o dono ainda emite tokens: pode ser só a autoridade de metadados.',
      ],
    },
    {
      id: 'metadata',
      aba: 'contrato',
      titulo: 'Metadata mutável',
      paragrafos: [
        'Se a autoridade de metadados continua ativa, o dono pode trocar nome, símbolo e ' +
          'imagem depois da sua compra — e o token passa a se parecer com outro. Num token SPL ' +
          'clássico isso aparece como "Mutable: true" na aba Metadata do Solscan; num Token-2022, ' +
          'é a update authority do tokenMetadata.',
        'Nos tokens do pump.fun checados, as duas portas estavam fechadas: a autoridade do ' +
          'tokenMetadata e a do metadataPointer eram nulas em 11 de 11. O risco mora nos tokens ' +
          'criados fora dele.',
      ],
    },
    {
      id: 'dev-dump',
      aba: 'contrato',
      titulo: 'Dev dump: o golpe que sobra no pump.fun',
      paragrafos: [
        'Depois da graduação, a pool do pump.fun pertence ao protocolo: o criador não consegue ' +
          'retirar a liquidez. O que ele consegue é comprar barato no lançamento — muitas vezes ' +
          'em várias carteiras, no mesmo bloco — e vender tudo em cima de quem chegou depois.',
        'A trilha fica visível: a carteira que criou o token aparece como "Creator" no Solscan, ' +
          'e o histórico dela mostra quanto comprou e quando vendeu. Um guia de ferramenta, sem ' +
          'medição, descreve o padrão como as carteiras do primeiro bloco vendendo nos ' +
          'primeiros 30 minutos.',
        'Dois limites: nenhum estudo revisado por pares isolou "o criador vendeu" como preditor ' +
          'de rug, e quem monta o golpe usa carteiras intermediárias para esconder o vínculo.',
      ],
    },
    {
      id: 'evm',
      aba: 'contrato',
      titulo: 'Fora da Solana: a taxa mora no código',
      paragrafos: [
        'Em Ethereum, BSC e Base, a taxa de venda e o bloqueio da venda ficam no próprio código ' +
          'do contrato. Ali a checagem que funciona é simular uma compra e uma venda antes: o ' +
          'honeypot.is faz isso de graça.',
        'A simulação é um retrato do momento. Contrato atualizável — o dono troca a lógica por ' +
          'trás — pode mudar a taxa ou bloquear vendas depois que você comprou.',
      ],
    },

    // =============================== DETECÇÃO ================================
    {
      id: 'o-que-conta',
      aba: 'deteccao',
      titulo: 'O que conta como rug, para quem mede',
      paragrafos: [
        'O maior estudo de detecção de rug na Solana acompanhou 6,4 milhões de tokens do ' +
          'PumpFun e da Raydium, de 30/11/2024 a 30/06/2025, e chamou de rug o token cuja ' +
          'liquidez caiu 99% desde o pico, ou que ficou parado por mais de 80% da própria vida.',
        'Por essa régua, 81,9% dos tokens de teste do PumpFun e 60,8% dos da Raydium deram rug. ' +
          'O número muda com a régua. A Chainalysis contou 3,59% dos tokens de 2024 como suspeitos ' +
          'de pump-and-dump; a Solidus Labs contou 98,6% dos tokens do pump.fun com a liquidez ' +
          'abaixo de US$ 1.000 — colapso de liquidez, não fraude provada, e a pump.fun contestou ' +
          'publicamente o número.',
      ],
    },
    {
      id: 'melhor-detector',
      aba: 'deteccao',
      titulo: 'O melhor detector, em linguagem simples',
      paragrafos: [
        'O modelo que se saiu melhor (XGBoost) olha só os 5 primeiros minutos de negociação: ' +
          'quantidade de compras e vendas, carteiras únicas, valores, variação de preço. ' +
          'Nenhuma das 23 características é de holders, bundles, autoridades ou redes sociais.',
        'Ele teve F1 de 0,79. Parece bom até comparar com o chute "tudo é rug", que dá 0,90 no ' +
          'mesmo teste, porque quase tudo é rug. O MCC — uma medida de −1 a 1 que não se deixa ' +
          'enganar por isso — foi de 0,39: acerto modesto.',
        'Reconstruindo pelas contagens do teste, de cada 100 tokens que o modelo marca como ' +
          'rug, cerca de 95 são; de cada 100 rugs reais, ele pega uns 68. É estimativa: o artigo ' +
          'não publica esses dois números. Os próprios autores dizem que o resultado ainda não ' +
          'serve para uso real.',
        'E o que ele aprende num lugar não vale no outro: treinado na Raydium e testado no ' +
          'PumpFun, o MCC cai para perto de zero. Os autores também reconhecem que o golpe muda ' +
          'com o tempo.',
      ],
    },
    {
      id: 'sinais',
      aba: 'deteccao',
      titulo: 'O que a pesquisa diz sobre os sinais',
      paragrafos: [
        'Estudos independentes, em redes diferentes, concordam numa família de sinais: quem ' +
          'controla o token no minuto zero, e como disfarça isso. Concentração de holders ' +
          'depois de juntar as carteiras ligadas, compra coordenada no lançamento e negociação ' +
          'artificial.',
        'O que o mercado mais repete tem menos apoio. LP travada não separa golpe de não golpe. ' +
          'Mint e freeze authority são mecânica certa, mas vêm sempre revogadas no pump.fun. ' +
          'Ausência de redes sociais nunca foi medida como preditor.',
        'No pump.fun, o que sobra é o criador vendendo e a concentração de insiders — ' +
          'justamente onde a medição revisada por pares é mais fraca.',
      ],
    },
    {
      id: 'por-que-importa',
      aba: 'deteccao',
      titulo: 'Como ler qualquer promessa de detecção',
      paragrafos: [
        'Um detector de rug vale tanto quanto a régua que define rug e a comparação com o chute ' +
          'mais burro possível. Quando alguém anunciar "95% de precisão", pergunte: quantos por ' +
          'cento eram golpe na amostra? Se eram 82%, chutar "golpe" para tudo já acertava 82%.',
        'Por isso o checklist deste hub não aprova token nenhum. Ele reprova pelo que dá para ' +
          'ver, e separa cada item pela força da evidência.',
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
        valor: '82,8%',
        nota: 'Estudo Midsummer, preprint, em quatro redes (Ethereum, BSC, Solana e Base).',
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
          evidencia: 'Medido: 82,8% dos tokens que subiram mais de 100% tinham sinais (Midsummer).',
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
    { titulo: '"A Midsummer Meme\'s Dream" (arXiv 2507.01963, preprint)', url: 'https://arxiv.org/html/2507.01963v2', consultadoEm: '13/09/2026' },
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
