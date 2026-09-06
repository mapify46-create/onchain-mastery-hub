// modulo2.js — conteúdo do Módulo 2 (psicologia das memecoins, tipos de token, 4 fases).
// Aqui só tem DADOS: nenhuma lógica, nenhum HTML. Para mudar um texto, mude aqui —
// a interface se adapta sozinha. As fontes de cada caso real ficam no próprio caso.

export const modulo2 = {
  id: 'modulo-2',
  titulo: 'Psicologia das memecoins & economia da atenção',
  resumo:
    'Memecoin não tem produto nem receita: o preço é feito de atenção. Este módulo ' +
    'mostra como essa atenção nasce, como ela some, e quais vieses do seu próprio ' +
    'cérebro fazem você comprar no topo e segurar no fundo.',

  objetivos: [
    'Entender por que o preço de uma memecoin depende de atenção, e não de fundamento.',
    'Reconhecer em você os vieses que fazem comprar no topo e segurar no prejuízo.',
    'Classificar tipos de token para saber o que você está olhando antes de agir.',
    'Visualizar as 4 fases do ciclo de vida de uma moeda e onde mora o risco em cada uma.',
  ],

  // ---------------------------------------------------------------------------
  // Seções de texto (aba "Visão geral")
  // ---------------------------------------------------------------------------
  secoes: [
    {
      id: 'atencao',
      titulo: 'Economia da atenção: o preço é feito de olhos',
      paragrafos: [
        'Uma memecoin não tem produto, receita nem promessa de utilidade. O que sustenta ' +
          'o preço é a atenção coletiva: quantas pessoas estão falando, postando e comprando ' +
          'ao mesmo tempo. Enquanto a atenção cresce, o preço cresce junto.',
        'O problema é que atenção é um recurso escasso e migratório. Quando a multidão ' +
          'descobre o próximo token, ela leva a atenção embora — e o preço vai atrás. Não ' +
          'existe lucro, caixa ou utilidade segurando um chão embaixo.',
        'Por isso o mesmo token pode subir 10x em horas e voltar ao ponto de partida no ' +
          'mesmo dia. Isso não é anomalia: é o funcionamento normal desse mercado.',
      ],
    },
    {
      id: 'dopamina',
      titulo: 'Dopamina e reforço intermitente',
      paragrafos: [
        'Cada alta na tela libera dopamina e o cérebro aprende uma regra simples: olhar o ' +
          'gráfico e clicar em comprar traz recompensa. Como a recompensa vem às vezes e não ' +
          'sempre, o comportamento é reforçado por "reforço intermitente" — o mesmo mecanismo ' +
          'que torna máquinas de aposta tão difíceis de largar.',
        'A consequência prática aparece rápido: depois de alguns acertos você passa a operar ' +
          'mais vezes, com posições maiores e com menos checagem. O ganho de ontem financia ' +
          'o erro de amanhã.',
        'Esse padrão é descrito em literatura de divulgação e em artigos revisados por pares ' +
          'sobre jogo e investimento especulativo (disponíveis no PMC/NCBI). Aqui ele é usado ' +
          'de forma educacional, para você reconhecer o mecanismo — não como material clínico.',
      ],
    },
    {
      id: 'antidoto',
      titulo: 'O antídoto não é força de vontade',
      paragrafos: [
        'Ninguém vence viés cognitivo no impulso, com o gráfico piscando na frente. O que ' +
          'funciona é decidir antes, por escrito, enquanto você ainda está frio. A regra ' +
          'escrita é o seu "eu calmo" mandando no seu "eu empolgado".',
      ],
      lista: [
        'Escreva a tese e a catálise antes de comprar (Módulo 4). Sem catálise clara, é aposta.',
        'Defina os alvos de realização antes de entrar, não depois de já estar no lucro.',
        'Imponha um tempo de espera (5, 10, 30 minutos) entre "quero comprar" e "comprei".',
        'Estabeleça um teto de perda por operação e por dia — e pare de verdade quando bater.',
        'Nunca opere com dinheiro que faz falta. A maioria dos tokens vai a zero.',
      ],
    },
  ],

  // ---------------------------------------------------------------------------
  // Vieses (aba "Vieses") — viram cards com efeito flip:
  // frente = a armadilha, verso = o antídoto.
  // ---------------------------------------------------------------------------
  vieses: [
    {
      id: 'fomo',
      nome: 'FOMO',
      subtitulo: 'Fear of missing out — medo de ficar de fora',
      gatilho:
        'Você vê o gráfico subindo sem você e sente que esta é a última chance da sua vida. ' +
        'Compra correndo, sem checar contrato, liquidez nem nada.',
      quandoAparece: 'Logo depois de um pump que você assistiu de fora.',
      antidoto:
        'Aceite que perder oportunidade é o custo normal de operar com regra — e que existe ' +
        'token novo toda hora. Use o tempo de espera: se depois de 10 minutos a tese ainda ' +
        'fizer sentido por escrito, aí sim considere entrar, com tamanho reduzido.',
      custo: 'É o mecanismo número 1 de compra no topo.',
    },
    {
      id: 'prova-social',
      nome: 'Prova social',
      subtitulo: 'Se todo mundo está comprando, deve estar certo',
      gatilho:
        'Milhares de posts, um grupo eufórico e vários influenciadores repetindo o mesmo ' +
        'ticker. Parece validação — e é só volume de vozes.',
      quandoAparece: 'Quando a timeline e os grupos são inundados pelo mesmo token.',
      antidoto:
        'Separe barulho de evidência. Volume de posts não é liquidez, não é número de holders ' +
        'e não é contrato auditável. Antes de dar peso a qualquer post, cheque LP, authorities ' +
        'e concentração dos maiores holders.',
      custo: 'Prova social é fabricável: bots e calls pagos custam pouco.',
    },
    {
      id: 'custo-afundado',
      nome: 'Custo afundado',
      subtitulo: 'Sunk cost — "já perdi tanto que agora tenho que esperar voltar"',
      gatilho:
        'A posição está -70%. Vender parece assumir a perda, então você segura. O dinheiro ' +
        'já gasto vira argumento para gastar mais tempo (e, muitas vezes, mais dinheiro).',
      quandoAparece: 'Na fase de Degradação, quando a atenção já migrou para outro token.',
      antidoto:
        'O dinheiro já perdido não volta por você segurar. A pergunta certa não é "quanto eu ' +
        'já perdi?", é "com o preço de hoje, eu compraria este token agora?". Se a resposta ' +
        'for não, a posição não deveria existir.',
      custo: 'É o que transforma uma perda de 30% numa perda de 100%.',
    },
    {
      id: 'excesso-confianca',
      nome: 'Excesso de confiança',
      subtitulo: 'Três acertos seguidos e você acha que pegou o jeito',
      gatilho:
        'A sequência boa vira explicação: "eu tenho olho". O tamanho da posição dobra, a ' +
        'checagem encolhe e o horário de operar se estende madrugada adentro.',
      quandoAparece: 'Depois da sua melhor semana, nunca depois da pior.',
      antidoto:
        'Registre todas as operações, não só as boas. Em mercado de altíssima volatilidade, ' +
        'sequência de acertos é estatisticamente esperada mesmo sem habilidade nenhuma. ' +
        'Mantenha o tamanho da posição fixo por regra, não por humor.',
      custo:
        'A operação que quebra a banca costuma ser a maior — feita logo depois da melhor sequência.',
    },
    {
      id: 'disposicao',
      nome: 'Efeito disposição',
      subtitulo: 'Vender rápido o que sobe, segurar para sempre o que cai',
      gatilho:
        'Você realiza +20% "para garantir" e segura -60% "para não perder". No fim do mês, ' +
        'os ganhos são pequenos e as perdas são inteiras.',
      quandoAparece: 'Em toda posição aberta, o tempo todo.',
      antidoto:
        'Inverta a assimetria por regra: alvos de realização parcial escalonados (parte no ' +
        '2x, parte no 5x) e um limite de perda definido antes da entrada. A decisão de sair ' +
        'não pode ser tomada no calor do gráfico.',
      custo: 'Explica por que muita gente acerta mais do que erra e mesmo assim perde dinheiro.',
    },
  ],

  // ---------------------------------------------------------------------------
  // Mapa de tipos de token (aba "Tipos de token") — filtrável por categoria
  // ---------------------------------------------------------------------------
  categoriasDeToken: [
    { id: 'ia', nome: 'IA / agentes de IA' },
    { id: 'comunidade', nome: 'Comunidade / CTO' },
    { id: 'cultural', nome: 'Memes orgânicos e culturais' },
    { id: 'narrativa', nome: 'Narrativas virais' },
    { id: 'figura-publica', nome: 'Figuras públicas' },
  ],

  tiposDeToken: [
    {
      id: 'agente-ia',
      nome: 'Token de agente de IA',
      categoria: 'ia',
      descricao:
        'Um bot com personalidade própria posta sozinho nas redes e tem um token associado. ' +
        'O produto é o próprio personagem: o token vale enquanto o personagem chamar atenção.',
      comoReconhecer:
        'Conta automatizada com identidade fixa, publicando sem parar, e um contrato ' +
        'divulgado na bio do perfil.',
      exemplos: ['Categoria consolidada desde 2024; os nomes específicos mudam a cada ciclo'],
      risco: 'alto',
      alerta:
        'Automatizar posts é barato e não exige tecnologia própria. "Ter um agente" não é ' +
        'diferencial técnico nem garantia de nada.',
    },
    {
      id: 'narrativa-ia',
      nome: 'Token de narrativa "IA" sem produto',
      categoria: 'ia',
      descricao:
        'Usa a palavra IA no nome, na arte e no texto de divulgação, sem nenhum agente, ' +
        'modelo ou produto por trás. A IA é o marketing.',
      comoReconhecer:
        'Site com jargão genérico, nenhum repositório público, nenhuma demonstração ' +
        'funcionando e roadmap cheio de trimestres vagos.',
      exemplos: [],
      risco: 'alto',
      alerta: 'Se você não consegue usar o produto em 30 segundos, o produto é o token.',
    },
    {
      id: 'cto',
      nome: 'CTO (community takeover)',
      categoria: 'comunidade',
      descricao:
        'O criador abandona o projeto e a comunidade assume: novas redes sociais, novo site, ' +
        'novos organizadores. O token continua o mesmo; quem cuida dele é que muda.',
      comoReconhecer:
        'Anúncio público do takeover, contas oficiais transferidas e dev original sumido ' +
        'ou tendo renunciado ao controle.',
      exemplos: [],
      risco: 'alto',
      alerta:
        'Nem todo CTO vinga. E o supply que o dev original tinha continua existindo — cheque ' +
        'se ele já vendeu ou se ainda pode vender.',
    },
    {
      id: 'comunidade-nativa',
      nome: 'Token de comunidade nativa',
      categoria: 'comunidade',
      descricao:
        'Nasce de um grupo que já existia antes do token: um servidor de Discord, um fórum, ' +
        'uma cena local. A comunidade não foi comprada, ela veio junto.',
      comoReconhecer:
        'Histórico de conversa anterior ao lançamento, membros que se conhecem pelo nome e ' +
        'piadas internas antigas.',
      exemplos: [],
      risco: 'medio',
      alerta:
        'Comunidade real reduz o risco de rug, mas não sustenta preço sozinha: atenção de ' +
        'fora ainda precisa chegar.',
    },
    {
      id: 'meme-longa-duracao',
      nome: 'Meme cultural de longa duração',
      categoria: 'cultural',
      descricao:
        'O meme existia e já era popular muito antes do token. O token é a expressão ' +
        'financeira de algo que a cultura carrega há anos.',
      comoReconhecer:
        'O meme sobrevive fora do universo cripto — alguém que nunca ouviu falar de ' +
        'blockchain reconhece a imagem.',
      exemplos: ['DOGE — o meme do Shiba Inu é de 2013 e o token nasceu no mesmo ano'],
      risco: 'medio',
      alerta:
        'Ser antigo não impede quedas de 90%. Só torna o desaparecimento total um pouco ' +
        'menos provável.',
    },
    {
      id: 'mascote-do-ciclo',
      nome: 'Mascote do ciclo',
      categoria: 'cultural',
      descricao:
        'Uma imagem específica viraliza (um chapéu, um bicho, um print) e vira token. ' +
        'Vive do ciclo em que nasceu e raramente sobrevive ao próximo.',
      comoReconhecer: 'Arte única e reconhecível, sem história anterior fora de cripto.',
      exemplos: ['WIF (dogwifhat) — memecoin de Solana nascida da imagem de um cão de gorro'],
      risco: 'alto',
      alerta:
        'Dezenas de cópias com o mesmo nome e a mesma arte aparecem em horas. Confira sempre ' +
        'o contrato, nunca o nome nem a imagem.',
    },
    {
      id: 'evento-noticia',
      nome: 'Token de evento ou notícia',
      categoria: 'narrativa',
      descricao:
        'Nasce nas horas seguintes a um acontecimento: uma declaração, um vídeo, um ' +
        'escândalo. Aposta num pico curto de busca e de conversa.',
      comoReconhecer: 'Lançado poucos minutos depois da notícia; o nome copia a manchete.',
      exemplos: [],
      risco: 'alto',
      alerta:
        'Janela de atenção curtíssima e vários tokens disputando o mesmo assunto. Costuma ' +
        'haver mais vendedor do que comprador já na primeira hora.',
    },
    {
      id: 'tendencia-plataforma',
      nome: 'Token de tendência de plataforma',
      categoria: 'narrativa',
      descricao:
        'Copia o formato do que está performando no launchpad da vez — mesmo tema, mesma ' +
        'estética, mesma mecânica — para pegar carona no fluxo de quem garimpa ali.',
      comoReconhecer: 'Vários tokens quase idênticos lançados no mesmo dia, na mesma plataforma.',
      exemplos: [],
      risco: 'alto',
      alerta: 'Você está competindo com bots que enxergam o lançamento antes de você.',
    },
    {
      id: 'figura-oficial',
      nome: 'Token oficial de figura pública',
      categoria: 'figura-publica',
      descricao:
        'Lançado, assinado ou publicamente endossado pela própria pessoa. Endosso real, ' +
        'risco real: os casos mais documentados de 2025 são exatamente desse tipo.',
      comoReconhecer: 'Anúncio nas contas oficiais e verificadas da própria pessoa.',
      exemplos: ['TRUMP', 'MELANIA', 'LIBRA — veja a aba "Casos reais"'],
      risco: 'alto',
      alerta:
        'Endosso de celebridade concentra atenção num pico curto e depois a leva embora. ' +
        'Os três casos da aba "Casos reais" caíram mais de 90% do topo.',
    },
    {
      id: 'figura-nao-oficial',
      nome: 'Token não-oficial com nome de terceiro',
      categoria: 'figura-publica',
      descricao:
        'Usa nome, rosto ou marca de alguém sem autorização nenhuma, contando com a confusão ' +
        'para atrair compradores.',
      comoReconhecer:
        'Nenhuma menção nas contas oficiais da pessoa; o contrato só circula em grupos e em ' +
        'respostas de posts.',
      exemplos: [],
      risco: 'alto',
      alerta:
        'Impersonação é o padrão, não a exceção. Sem anúncio no canal oficial, assuma que é falso.',
    },
  ],

  // ---------------------------------------------------------------------------
  // Casos reais (aba "Casos reais") — números conferidos nas fontes citadas
  // ---------------------------------------------------------------------------
  casos: [
    {
      id: 'trump',
      nome: 'OFFICIAL TRUMP',
      ticker: 'TRUMP',
      chain: 'Solana',
      data: 'Lançada em 17/01/2025',
      resumo:
        'Em cerca de 24 horas virou a segunda maior memecoin do mercado, atrás apenas do ' +
        'Dogecoin. Depois despencou e passou a operar por uma fração do topo.',
      numeros: [
        { rotulo: 'Pico de preço', valor: 'cerca de US$ 73 a US$ 75' },
        { rotulo: 'Pico de market cap', valor: 'cerca de US$ 15 bilhões em ~24h' },
        { rotulo: 'Posição atingida', valor: '2ª maior memecoin naquele momento' },
        { rotulo: 'Queda registrada', valor: 'mais de 96% abaixo do topo (perto de US$ 2,27)' },
      ],
      fontes: ['CoinGecko'],
      licao:
        'A atenção máxima aconteceu no primeiro dia. Quem chegou no segundo dia comprou de ' +
        'quem estava saindo.',
    },
    {
      id: 'melania',
      nome: 'MELANIA MEME',
      ticker: 'MELANIA',
      chain: 'Solana',
      data: 'Lançada em janeiro de 2025',
      resumo:
        'Lançada poucos dias depois da TRUMP, aproveitando a mesma onda de atenção. A queda ' +
        'foi mais rápida e mais profunda.',
      numeros: [
        { rotulo: 'Pico de preço', valor: 'cerca de US$ 13,73' },
        {
          rotulo: 'Market cap: pico e depois',
          valor: 'de ~US$ 1,73 bilhão para ~US$ 164 milhões',
        },
        { rotulo: 'Queda em 06/02/2025', valor: 'cerca de 90% (noticiado pela Bloomberg)' },
        {
          rotulo: 'Queda acumulada',
          valor: 'mais de 99% do pico, até dezembro de 2025 (Messari)',
        },
      ],
      fontes: ['Bloomberg (06/02/2025)', 'Messari (dezembro de 2025)'],
      licao:
        'O segundo token da mesma narrativa aproveita a atenção que sobrou — e ela sobra ' +
        'por muito menos tempo.',
    },
    {
      id: 'libra',
      nome: 'LIBRA',
      ticker: 'LIBRA',
      chain: 'Solana',
      data: '14/02/2025, Argentina',
      resumo:
        'Promovida publicamente pelo presidente argentino Javier Milei. Subiu e desabou no ' +
        'mesmo dia, com evidência on-chain de saques de insiders. Virou investigação de ' +
        'fraude na Argentina.',
      numeros: [
        { rotulo: 'Pico de market cap', valor: 'cerca de US$ 4,56 bilhões em 14/02/2025' },
        { rotulo: 'Queda', valor: 'cerca de 94%, para ~US$ 257 milhões, em cerca de 11 horas' },
        {
          rotulo: 'Saques de insiders',
          valor: '~US$ 107 milhões por ~8 carteiras (Lookonchain)',
        },
        { rotulo: 'Supply desbloqueado', valor: 'cerca de 82% já no lançamento (Bubblemaps)' },
      ],
      fontes: ['Lookonchain', 'Bubblemaps'],
      licao:
        'Concentração de supply e endosso de autoridade na mesma operação: as duas coisas ' +
        'que você aprende a checar neste hub, falhando juntas em 11 horas.',
    },
  ],

  licaoDosCasos:
    'Hype e endosso de celebridade não garantem durabilidade. Nos três casos o pico de ' +
    'atenção durou horas, e quem comprou perto do topo ficou com o prejuízo quando a ' +
    'atenção migrou. É o padrão clássico de pump-and-dump — só que com nomes conhecidos ' +
    'no anúncio.',

  notaDosCasos:
    'Números registrados pelas fontes citadas, nas datas indicadas. Cotação muda todo dia; ' +
    'fato histórico, não. Nada aqui é recomendação de compra ou de venda.',

  // ---------------------------------------------------------------------------
  // As 4 fases (aba "As 4 fases") — o diagrama abaixo é renderizado pelo Mermaid
  // ---------------------------------------------------------------------------
  fases: [
    {
      id: 'lancamento',
      numero: 1,
      nome: 'Lançamento',
      resumo:
        'O token nasce. Liquidez fina, poucos holders, preço definido pela bonding curve ou ' +
        'pelo primeiro pool. Tudo acontece em minutos.',
      oQueVoceVe: [
        'Idade medida em minutos',
        'Punhado de holders',
        'Volume vindo de bots e snipers',
        'Nenhum histórico para comparar',
      ],
      oQueChecar: [
        'A LP está bloqueada ou queimada?',
        'Mint e freeze authority foram revogadas?',
        'Quanto os maiores holders detêm juntos?',
        'Houve compras em bloco (bundles) no lançamento?',
      ],
      armadilha:
        'Comprar nos primeiros segundos disputando com bots que enxergam o lançamento antes ' +
        'de você e já estão posicionados quando a sua ordem chega.',
      risco: 'alto',
    },
    {
      id: 'consolidacao',
      numero: 2,
      nome: 'Consolidação / Acumulação',
      resumo:
        'O preço para de se mexer com violência e lateraliza. Quem estava só pelo pump vai ' +
        'embora; quem fica começa a virar comunidade.',
      oQueVoceVe: [
        'Preço lateral por horas ou dias',
        'Volume caindo',
        'Holders crescendo devagar',
        'Conversa mais consistente e menos eufórica',
      ],
      oQueChecar: [
        'A comunidade é gente de verdade ou são bots repetindo a mesma frase?',
        'O dev continua presente e comunicando?',
        'Existe alguma catálise concreta marcada para acontecer?',
      ],
      armadilha:
        'Confundir consolidação com garantia. Muito token lateraliza e morre exatamente ' +
        'ali, sem nunca ter uma fase 3.',
      risco: 'medio',
    },
    {
      id: 'expansao',
      numero: 3,
      nome: 'Expansão por catálise',
      resumo:
        'Um evento concreto traz atenção nova: uma listagem, um post de conta grande, a ' +
        'graduação para a DEX, uma narrativa que pega. O preço destrava.',
      oQueVoceVe: [
        'Salto de volume e de holders ao mesmo tempo',
        'Menções aumentando fora do círculo original',
        'Sequência de máximas cada vez mais altas',
      ],
      oQueChecar: [
        'A catálise é a que você tinha previsto, ou é outra?',
        'Seus alvos de realização parcial já estão definidos?',
        'A liquidez aguenta você sair sem derrubar o preço?',
      ],
      armadilha:
        'Entrar aqui achando que ainda é a fase 2. Quem entra no meio da expansão está ' +
        'comprando de quem já vai realizar.',
      risco: 'medio',
    },
    {
      id: 'degradacao',
      numero: 4,
      nome: 'Degradação',
      resumo:
        'A atenção migra para o próximo token. Sem atenção não há comprador; sem comprador ' +
        'o preço só tem um caminho.',
      oQueVoceVe: [
        'Volume caindo junto com o preço',
        'Holders diminuindo',
        'Grupo esvaziando ou virando reclamação',
        'Máximas cada vez mais baixas',
      ],
      oQueChecar: [
        'Eu compraria este token pelo preço de hoje?',
        'Se a resposta é não, por que eu ainda estou dentro?',
      ],
      armadilha:
        'Custo afundado: segurar "até voltar". É nesta fase que a maior parte do capital ' +
        'de quem está começando é destruída.',
      risco: 'alto',
    },
  ],

  // Diagrama do fluxo em sintaxe Mermaid. As cores seguem o design system do hub.
  // Fica como array de linhas só para o arquivo ficar legível; o join monta o texto final.
  diagramaFases: [
    'graph LR',
    '  A["1. Lançamento"] --> B["2. Consolidação / Acumulação"]',
    '  B --> C["3. Expansão por catálise"]',
    '  C --> D["4. Degradação"]',
    '  D -.-> E["Maioria vai a zero"]',
    '  classDef alto fill:#3B1418,stroke:#EF4444,color:#FCA5A5,stroke-width:2px',
    '  classDef medio fill:#3A2A0E,stroke:#F59E0B,color:#FCD34D,stroke-width:2px',
    '  classDef fim fill:#141A24,stroke:#1F2733,color:#9AA7B4,stroke-width:2px',
    '  class A,D alto',
    '  class B,C medio',
    '  class E fim',
  ].join('\n'),

  // Último nó do fluxo, usado tanto pelo diagrama quanto pelos cards de reserva.
  desfechoFases: 'Maioria vai a zero',

  observacaoFases:
    'Modelo didático de ciclo de vida. Serve para você saber que perguntas fazer em cada ' +
    'momento — não é previsão nem garantia de comportamento. Muitos tokens pulam fases, ' +
    'e a maioria não passa da primeira.',

  // ---------------------------------------------------------------------------
  // Mini-quiz (aba "Quiz") — 4 perguntas
  // ---------------------------------------------------------------------------
  // ---------------------------------------------------------------------------
  // Destaques — os números grandes que abrem cada aba
  //
  // Este módulo não tem lista de `fontes` no topo; os casos reais trazem as
  // suas próprias. Todo destaque abaixo sai do texto do módulo ou dos números
  // dos casos, com a fonte que já está lá. Nada novo entra.
  // ---------------------------------------------------------------------------
  destaques: {
    visaoGeral: [
      {
        rotulo: 'O que move o preço de uma memecoin',
        valor: 'Olhos',
        nota: 'Não fundamento: atenção. "O preço é feito de olhos" — quando a atenção migra, o preço vai junto.',
      },
      {
        rotulo: 'Fases de um ciclo típico',
        valor: '4',
        nota: 'Lançamento, consolidação, expansão por catálise, degradação. Muitos tokens pulam fases — e a maioria não passa da primeira.',
      },
      {
        rotulo: 'Desfecho da maioria',
        valor: 'Zero',
        nota: 'A tese central do módulo. Não é pessimismo: é a base de qualquer regra de tamanho e de saída.',
        tom: 'alerta',
      },
    ],

    vieses: [
      {
        rotulo: 'Vieses que fazem quase todo o estrago',
        valor: '5',
        nota: 'FOMO, prova social, custo afundado, excesso de confiança e efeito disposição. Cada um tem gatilho, momento e antídoto.',
      },
      {
        rotulo: 'Mecanismo nº 1 de compra no topo',
        valor: 'FOMO',
        nota: 'Você vê o gráfico subindo sem você e sente que é a última chance. Compra correndo, sem checar nada.',
        tom: 'alerta',
      },
      {
        rotulo: 'O que o custo afundado faz com uma perda de 30%',
        valor: '→ 100%',
        nota: '"Já perdi tanto que agora tenho que esperar voltar." É o viés que transforma perda pequena em perda total.',
        tom: 'alerta',
      },
    ],

    tipos: [
      {
        rotulo: 'Tipos de token catalogados',
        valor: '10',
        nota: 'Em 5 categorias: IA, comunidade, memes culturais, narrativas virais e figuras públicas. Cada um com um motor de atenção diferente.',
      },
      {
        rotulo: 'Tipos com risco alto',
        valor: '8 de 10',
        nota: 'Só o token de comunidade nativa e o meme cultural de longa duração ficam em risco médio. Nenhum é baixo.',
        tom: 'alerta',
      },
      {
        rotulo: 'O teste dos 30 segundos',
        valor: '30 s',
        nota: '"Se você não consegue usar o produto em 30 segundos, o produto é o token." Vale para toda narrativa "IA" sem produto.',
      },
    ],

    casos: [
      {
        rotulo: 'Market cap da TRUMP em cerca de 24 horas',
        valor: 'US$ 15 bi',
        nota: 'Lançada em 17/01/2025, virou a 2ª maior memecoin naquele momento. Depois, mais de 96% abaixo do topo.',
      },
      {
        rotulo: 'Queda da MELANIA até dezembro de 2025',
        valor: '99%+',
        nota: 'Do pico, segundo a Messari. Em 06/02/2025 já tinha caído cerca de 90% (Bloomberg).',
        tom: 'alerta',
      },
      {
        rotulo: 'Duração do pico de atenção nos três casos',
        valor: 'Horas',
        nota: 'Quem comprou perto do topo ficou com o prejuízo quando a atenção migrou. Pump-and-dump com nomes conhecidos.',
        tom: 'alerta',
      },
    ],

    fases: [
      {
        rotulo: 'Fases com risco alto',
        valor: '2 de 4',
        nota: 'Lançamento e degradação — o começo e o fim. É onde a atenção está no extremo, e onde mais se perde.',
        tom: 'alerta',
      },
      {
        rotulo: 'Tempo de vida de um lançamento',
        valor: 'Minutos',
        nota: 'Idade medida em minutos, punhado de holders, volume de bots e snipers. Nenhum histórico para comparar.',
      },
      {
        rotulo: 'O que muda a pergunta certa',
        valor: 'A fase',
        nota: 'Saber em que fase você está muda o que perguntar. É modelo didático, não previsão — muitos tokens pulam fases.',
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // Anatomia — um post de hype, com os sinais de manipulação marcados
  //
  // Post esquemático; nenhum perfil ou token real foi copiado. Cada marcador liga
  // um elemento do post ao viés que ele explora. É defensivo, na lógica do
  // módulo: reconhecer, não produzir.
  // ---------------------------------------------------------------------------
  anatomias: {
    postDeHype: {
      titulo: 'Anatomia de um post de hype',
      descricao: 'Os seis elementos que quase toda campanha repete — e o viés que cada um está tentando acionar em você.',
      viewBox: [0, 0, 640, 320],
      paineis: [
        { id: 'autor', x: 12, y: 12, w: 400, h: 56, rotulo: '@perfil-grande · verificado', tipo: 'campo' },
        { id: 'texto', x: 12, y: 80, w: 400, h: 110, rotulo: '"$TICKER vai 100x, ainda dá tempo, não fique de fora"', tipo: 'texto' },
        { id: 'grafico', x: 424, y: 12, w: 204, h: 178, rotulo: 'Print do gráfico subindo', tipo: 'grafico' },
        { id: 'metricas', x: 12, y: 202, w: 400, h: 50, rotulo: 'milhares de curtidas · reposts · "eu comprei"', tipo: 'numeros' },
        { id: 'contrato', x: 424, y: 202, w: 204, h: 50, rotulo: 'CA: 0x… (na bio)', tipo: 'campo', alerta: true },
        { id: 'urgencia', x: 12, y: 264, w: 616, h: 44, rotulo: '"Últimas horas antes da listagem"', tipo: 'texto', alerta: true },
      ],
      itens: [
        {
          painel: 'texto',
          titulo: 'A promessa sem tese',
          texto: '"Vai 100x", "não fique de fora". Nenhum evento concreto, nenhum prazo — só o preço como motivo. É o FOMO sendo fabricado, não descrito.',
        },
        {
          painel: 'grafico',
          titulo: 'O gráfico que já subiu',
          texto: 'Print de vela verde é a isca do FOMO: mostra o que você perdeu, não o que vem. Quem posta comprou antes do print.',
        },
        {
          painel: 'metricas',
          titulo: 'Prova social comprável',
          texto: 'Milhares de curtidas, dezenas de "eu comprei". Bots e calls pagos custam pouco. Volume de vozes não é liquidez nem contrato auditável.',
        },
        {
          painel: 'autor',
          titulo: 'O perfil grande',
          texto: 'Muitas vezes recebe pelo post ou comprou antes. Endosso não é análise — e o Módulo 1 lembra: confirme o endereço oficial na fonte.',
        },
        {
          painel: 'contrato',
          titulo: 'O contrato na bio',
          texto: 'Onde o impostor mora. Ticker é apelido; quem busca pelo nome pode comprar o token errado.',
        },
        {
          painel: 'urgencia',
          titulo: 'A pressa',
          texto: '"Últimas horas" existe para impedir a espera de 10 minutos que o antídoto do FOMO pede.',
        },
      ],
      nota: 'Post esquemático. Nenhum perfil ou token real foi copiado; os elementos são os que se repetem em quase toda campanha de hype.',
    },
  },

  // ---------------------------------------------------------------------------
  // Linha do tempo dos casos reais (aba Casos). Datas e números dos próprios
  // casos acima, com as mesmas fontes.
  // ---------------------------------------------------------------------------
  linhaDoTempoCasos: {
    titulo: 'Os três casos, na ordem em que aconteceram',
    descricao: 'Da estreia ao esquecimento, em semanas. Repare na distância entre o pico e a queda.',
    marcos: [
      { data: '17/01/2025', titulo: 'OFFICIAL TRUMP é lançada', texto: 'Em cerca de 24 horas vira a 2ª maior memecoin, com pico de market cap perto de US$ 15 bilhões. Quem chegou no segundo dia comprou de quem estava saindo.' },
      { data: '01/2025', titulo: 'MELANIA MEME é lançada' },
      { data: '06/02/2025', titulo: 'MELANIA já caiu cerca de 90%', texto: 'Noticiado pela Bloomberg.', tom: 'alerta' },
      { data: '14/02/2025', titulo: 'LIBRA é lançada na Argentina', texto: 'Pico de market cap de cerca de US$ 4,56 bilhões no mesmo dia. O pico de atenção durou horas.', tom: 'alerta' },
      { data: '12/2025', titulo: 'MELANIA acumula queda de mais de 99% do pico', texto: 'Segundo a Messari. A TRUMP, mais de 96% abaixo do topo.', tom: 'alerta' },
    ],
    nota: 'Números registrados pelas fontes citadas em cada caso, nas datas indicadas. Fato histórico, não recomendação.',
  },

  quiz: [
    {
      id: 'q1',
      pergunta: 'O que sustenta o preço de uma memecoin?',
      alternativas: [
        { id: 'a', texto: 'O lucro e a receita do projeto por trás dela.' },
        {
          id: 'b',
          texto: 'A atenção coletiva: quantas pessoas estão falando e comprando ao mesmo tempo.',
        },
        { id: 'c', texto: 'Uma reserva de dólares que garante um valor mínimo.' },
        { id: 'd', texto: 'O número de desenvolvedores trabalhando no código.' },
      ],
      correta: 'b',
      explicacao:
        'Memecoin não tem produto nem receita. O preço é função direta da atenção — e ' +
        'atenção migra. Quando ela vai para o próximo token, o preço vai junto.',
    },
    {
      id: 'q2',
      pergunta: 'O que é FOMO?',
      alternativas: [
        { id: 'a', texto: 'Uma taxa que a corretora cobra em cada venda.' },
        { id: 'b', texto: 'Uma ferramenta para checar se a liquidez está bloqueada.' },
        {
          id: 'c',
          texto:
            'O medo de ficar de fora, que faz você comprar correndo depois de ver o gráfico já subindo.',
        },
        { id: 'd', texto: 'A estratégia de vender metade da posição quando ela dobra.' },
      ],
      correta: 'c',
      explicacao:
        'FOMO é "fear of missing out". Ele leva à compra no topo, porque o gatilho é o preço ' +
        'já ter subido. O antídoto é o tempo de espera entre querer comprar e comprar.',
    },
    {
      id: 'q3',
      pergunta:
        'Por que segurar uma posição por tempo demais na fase de Degradação destrói capital?',
      alternativas: [
        { id: 'a', texto: 'Porque a corretora cobra aluguel diário por posição aberta.' },
        {
          id: 'b',
          texto:
            'Porque o viés de custo afundado transforma a decisão em "esperar voltar", enquanto a atenção — e o comprador — já foi embora.',
        },
        { id: 'c', texto: 'Porque os tokens expiram automaticamente depois de 30 dias.' },
        { id: 'd', texto: 'Porque o preço sempre volta ao topo se você esperar o suficiente.' },
      ],
      correta: 'b',
      explicacao:
        'O dinheiro já perdido não volta por você segurar. A pergunta útil é "eu compraria ' +
        'isso pelo preço de hoje?". É assim que uma queda de 30% vira uma perda de 100%.',
    },
    {
      id: 'q4',
      pergunta: 'O que os casos TRUMP, MELANIA e LIBRA ensinam?',
      alternativas: [
        {
          id: 'a',
          texto: 'Que tokens de figuras públicas são a opção mais segura, por causa do endosso.',
        },
        { id: 'b', texto: 'Que basta esperar o anúncio oficial para lucrar com segurança.' },
        {
          id: 'c',
          texto:
            'Que endosso de celebridade concentra atenção num pico curto e não garante durabilidade: os três caíram mais de 90% do topo.',
        },
        { id: 'd', texto: 'Que memecoins de políticos são proibidas e por isso caem.' },
      ],
      correta: 'c',
      explicacao:
        'TRUMP passou a operar mais de 96% abaixo do topo (CoinGecko); MELANIA caiu cerca de ' +
        '99% do pico (Bloomberg, Messari); LIBRA perdeu ~94% em cerca de 11 horas e virou ' +
        'investigação de fraude na Argentina. Atenção que chega de repente também vai embora ' +
        'de repente.',
    },
  ],
};
