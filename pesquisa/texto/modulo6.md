# Módulo 6 — texto reescrito

O texto do Módulo 6 virou legenda: medindo só o texto corrido (`paragrafos` + `paragrafosFinais`), as 16 seções somam **4.624 caracteres** — média de 289 por seção, e várias com um parágrafo único (as abas contando tudo, incluindo os textos dos visuais, tabelas e `detalhe`, é que chegam aos ~6.4 mil por aba). O padrão é sempre o mesmo: o visual mostra, e o texto comenta o visual em vez de explicar a ideia. Definições inteiras (o que é PnL, o que é XGBoost, o que são makers, o que são metadados) estão guardadas em `foraDaTela`, ou seja, o termo aparece na tela antes de ser explicado. Nesta reescrita cada seção ganha a sequência o que é → por que importa para mim → como aparece na tela → exemplo com números → o erro que isso evita, os termos voltam para dentro do texto, e nenhum número muda. Depois da reescrita, o mesmo texto corrido soma **27.725 caracteres** (média de 1.733 por seção), e todo número que aparece nele foi conferido, um a um, contra `src/data/modulo6.js`.

**Como ler os blocos DEPOIS.** Cada bloco traz só os campos de TEXTO, na ordem em que a tela os mostra. Os campos de visual (`barras`, `lupa`, `cartoes`, `tresPontos`, `custo`, `duasColunas`, `passos`, `bundle`, `arvore`, `autoridades`, `reguas`, `grades`, `f1`, `mcc`, `anuncio`, `link`) e o `foraDaTela` ficam exatamente como estão, no mesmo lugar do arquivo — quem cola troca campo por campo, não a seção inteira. Lembre que o visual aparece ANTES dos parágrafos.

---

## tres-numeros

ANTES: 2 parágrafos (308 caracteres) que comentam o visual — "por que o market cap engana" e uma regra prática; o exemplo com números e a frase de abertura estavam em `foraDaTela`, fora da tela; `quadro` com as três perguntas (330) e `detalhe` com o cálculo de cada site (454).

pergunta: REMOVER (hoje 'q1')

PROPOSTA DE DIVISÃO (aba Os números): a lista "cada site calcula do seu jeito" pode virar seção própria na parte 1 — são quatro ferramentas com nome e regra diferente, material de consulta, não de leitura corrida.

```js
      paragrafos: [
        'Na tela de qualquer memecoin aparecem três números grandes, um ao lado do outro. Eles ' +
          'parecem medir a mesma coisa, mas cada um responde a uma pergunta diferente. Market ' +
          'cap (valor de mercado) é o preço do último negócio multiplicado pelos tokens que já ' +
          'estão circulando. FDV é a sigla inglesa de fully diluted valuation, valor totalmente ' +
          'diluído: a mesma multiplicação, só que por todos os tokens que existem — o supply, o ' +
          'total emitido. Liquidez é outra coisa: é o dinheiro parado na pool, o par de reservas ' +
          'que uma DEX (corretora sem dono, onde quem faz a troca é um programa) usa para trocar ' +
          'um token pelo outro.',
        'A diferença importa porque os dois primeiros são conta, e o terceiro é caixa. Market ' +
          'cap e FDV pegam um preço que nasceu de uma negociação pequena e multiplicam por uma ' +
          'quantidade enorme de tokens. Ninguém precisou depositar esse dinheiro em lugar nenhum ' +
          'para o número existir. A liquidez é a única das três que responde à pergunta de quem ' +
          'comprou: existe dinheiro do outro lado quando eu quiser sair?',
        'Na tela, os três vêm em fila no topo do par, com o mesmo tamanho de letra e o mesmo ar ' +
          'de importância. Dois detalhes atrapalham. O primeiro é que cada site calcula do seu ' +
          'jeito, e o GeckoTerminal nem mostra market cap. O segundo é que a liquidez vem como um ' +
          'número só, somando os dois lados da pool — e só um dos lados é o dinheiro que paga ' +
          'quem vende.',
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
          // A caixa em destaque (borda ciano): a resposta que importa.
          destaque: true,
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
        'O erro que essa separação evita é o mais comum da tela: ler "market cap de US$ 50 mil" ' +
          'e entender que existem US$ 50 mil guardados ali dentro. O market cap supõe que todo ' +
          'mundo conseguiria vender pelo último preço, e esse preço foi feito por uma negociação ' +
          'pequena. Se muita gente vender junto, ele despenca muito antes. Por isso a ordem de ' +
          'leitura é ao contrário da ordem da tela: olhe primeiro a liquidez. Market cap de ' +
          'milhões com liquidez de milhares é número de vitrine.',
        'O contrário também não vale: liquidez alta não aprova token nenhum. Ela diz apenas que, ' +
          'naquele instante, havia mais dinheiro na pool. Quanto desse dinheiro sai de fato é a ' +
          'conta da próxima seção.',
      ],
      detalhe: {
        titulo: 'cada site calcula do seu jeito',
        lista: [
          'DexScreener: FDV = (supply total − tokens queimados) × preço. O market cap só fica ' +
            'diferente do FDV quando o projeto informa o circulante ou a CoinGecko tem esse dado.',
          'Token ainda na bonding curve (a fase em que o token é negociado dentro do próprio ' +
            'pump.fun, antes de migrar para uma pool numa DEX — é essa migração que o mercado ' +
            'chama de graduação): DexScreener e GeckoTerminal não descontam nada.',
          'GeckoTerminal: não mostra market cap, só FDV.',
          'Solscan: o campo chamado "Market Cap" é, pela documentação dele, o valor totalmente ' +
            'diluído (FDV). Ou seja: o mesmo rótulo, em dois sites, pode significar duas contas ' +
            'diferentes.',
        ],
      },
```

---

## quanto-sai

ANTES: 2 parágrafos (330 caracteres) que anunciam a surpresa da conta sem mostrá-la; a curva deslizante fica sem instrução de leitura; `tresPontos` (os três atalhos em texto), `exemplo` (326) e `detalhe` com a fórmula (602).

pergunta: REMOVER (hoje 'q2')

```js
      paragrafos: [
        'A liquidez anunciada não é o quanto você consegue tirar. A pool é um par de reservas: ' +
          'de um lado os tokens, do outro o SOL. Quem vende entrega token e leva SOL, e a cada ' +
          'venda sobra mais token e menos SOL na pool. É isso que derruba o preço, e é por isso ' +
          'que a segunda metade da sua venda sai mais barata que a primeira.',
        'Para mim, isso troca a pergunta. Não adianta perguntar "quanto de liquidez tem?", ' +
          'porque esse número é o caixa da pool inteira, incluindo o lado que não me paga. A ' +
          'pergunta útil é "quanto eu tiro antes de o preço cair X%?". E a resposta tem uma ' +
          'surpresa: em porcentagem, ela não depende do tamanho da pool. Pool grande e pool ' +
          'pequena devolvem a mesma fração — o que muda é só o valor em dólar.',
        'O visual acima é essa conta em forma de curva, e ela desliza: você escolhe uma queda de ' +
          'preço — 10%, 30% ou pela metade — e ela devolve dois números. O primeiro é quanto dos ' +
          'tokens da reserva foi preciso vender; o segundo é quanto você recebe, em porcentagem ' +
          'da liquidez anunciada. Leia o segundo número sempre como fatia da liquidez anunciada, ' +
          'nunca como fatia do saldo que a sua tela mostra: são coisas diferentes, e é a ' +
          'liquidez que manda.',
      ],
      // mantém igual: a curva lê daqui a liquidez do exemplo (não tire a primeira frase).
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
        'O erro que essa conta evita é ler "liquidez: US$ 8 mil" como "dá para tirar US$ 8 mil". ' +
          'Derrubar o preço pela metade — uma destruição enorme para quem ficou — devolve 14,64% ' +
          'da liquidez anunciada. E a sua própria venda entra nesse limite junto com a de todo ' +
          'mundo: se outras pessoas venderem ao mesmo tempo, a sua parte sai depois, e mais ' +
          'barata.',
      ],
      detalhe: {
        titulo: 'a fórmula por trás e a "proporção saudável"',
        paragrafos: [
          'A conta vale para pools de produto constante. É a fórmula x · y = k das AMMs, as ' +
            'pools automáticas das DEXs (automated market maker, formador de mercado ' +
            'automático: um programa que aceita qualquer troca no preço que as reservas ditam, ' +
            'sem ninguém do outro lado). A curva do pump.fun também usa essa fórmula. Na ' +
            'fórmula, x e y são as quantidades dos dois lados da pool. O produto das duas, k, ' +
            'fica constante a cada troca.',
          'Conta: vende = 1 ÷ √(1 − queda) − 1; recebe = (1 − √(1 − queda)) ÷ 2, em fração da ' +
            'liquidez anunciada. Sem taxas.',
          'Nenhuma pesquisa revisada por pares (aquela que outros pesquisadores da área ' +
            'checaram antes de a revista publicar) apresenta uma proporção "saudável" entre ' +
            'liquidez e market cap. Quem cita uma está usando regra de bolso.',
        ],
      },
```

---

## zeros-compactados

ANTES: 1 parágrafo (154 caracteres) listando onde o erro acontece; a explicação da notação estava só no `emUmaFrase` e no visual, e a frase de abertura em `foraDaTela`; `detalhe` com o preço completo (257).

pergunta: REMOVER (hoje 'q4')

```js
      paragrafos: [
        'Preço de memecoin costuma ter zeros demais para caber na tela. Em vez de escrever todos, ' +
          'as ferramentas compactam: escrevem um zero, um número pequenininho embaixo e o resto ' +
          'do preço. Esse número pequeno não faz parte do valor. Ele é uma contagem: diz quantos ' +
          'zeros vêm depois da vírgula antes de os algarismos começarem.',
        'Isso importa porque é um erro que não parece erro. Nada na tela fica quebrado, nenhum ' +
          'aviso aparece: o preço simplesmente é lido com uma ordem de grandeza a mais, e todas ' +
          'as contas feitas em cima dele saem erradas na mesma proporção — quanto eu tenho, ' +
          'quanto vale a minha posição, quanto subiu.',
        'Na prática, o tropeço acontece quando o número deixa de ser desenho e vira texto: ' +
          'copiado para uma planilha, lido às pressas ou lido em voz alta por um leitor de tela ' +
          '(programa que narra o que está escrito). Fora da tela, o zero pequenininho vira um ' +
          'algarismo comum, e ninguém percebe a troca.',
      ],
      exemplo: {
        titulo: 'O mesmo preço, de três jeitos',
        passos: [
          'Na tela: $0.0₅2786. O 5 pequeno vale cinco zeros.',
          'Por extenso: US$ 0,000002786 — cinco zeros depois da vírgula, e só então o 2786.',
          'Copiado para uma planilha, o 5 pequeno vira um 5 comum: $0.052786.',
          'É cerca de 19 mil vezes o preço real, e nada na planilha avisa.',
        ],
      },
      paragrafosFinais: [
        'O erro que essa leitura evita não é só de conta, é de decisão: quem lê o preço grande ' +
          'demais acha que uma alta já aconteceu, ou calcula uma posição com uma quantidade de ' +
          'tokens que não existe. Sempre que o preço aparecer com zeros compactados, confirme o ' +
          'valor por extenso antes de usá-lo em qualquer conta.',
      ],
      detalhe: {
        titulo: 'onde achar o preço completo',
        paragrafos: [
          'Nenhuma das ferramentas documenta essa notação. No DexScreener, o valor inteiro fica ' +
            'guardado na dica que aparece ao passar o mouse. A API (o acesso de dados para ' +
            'programas: a mesma informação, entregue em texto puro para quem for automatizar) ' +
            'entrega o preço completo.',
        ],
      },
```

---

## pnl

ANTES: 1 parágrafo (195 caracteres) sobre taxas; a definição de PnL estava em `foraDaTela`; `cartoes` com os dois tipos e `detalhe` com o caso da GMGN (253). Não havia exemplo com números.

pergunta: REMOVER (hoje 'q3')

```js
      paragrafos: [
        'PnL quer dizer lucro ou prejuízo, do inglês profit and loss. A tela mostra dois, e eles ' +
          'não são da mesma natureza. O realizado é o que você já travou vendendo: dinheiro que ' +
          'existe, que já entrou na carteira. O não realizado é uma multiplicação feita agora — ' +
          'preço do momento × tokens que você tem — para mostrar quanto a sua posição "valeria" ' +
          'se fosse vendida.',
        'A ilusão mora no segundo. Ele usa o preço do último negócio, que pode ter sido feito ' +
          'com muito pouco dinheiro, e supõe que a sua venda inteira sairia por esse mesmo ' +
          'preço. Só que a sua venda é o que derruba o preço: quanto maior a sua posição diante ' +
          'da pool, mais o número verde promete algo que a própria venda vai desmanchar.',
        'Na tela, os dois aparecem juntos, com a mesma cor e o mesmo destaque. O realizado é ' +
          'histórico e não muda sozinho; o não realizado pisca a cada segundo, porque o preço ' +
          'muda. A documentação dos terminais consultados não diz que ele desconta as taxas. Em ' +
          'memecoin de pouca liquidez, o número verde quase nunca é o que chega na carteira — e ' +
          'a curva da seção "Quanto dá para vender" é o jeito de estimar quanto chega.',
      ],
      exemplo: {
        titulo: 'Quanto do seu PnL chega na carteira',
        passos: [
          'Posição de US$ 1.000 na tela, numa pool com US$ 20.000 de liquidez anunciada.',
          'O lado da pool que paga a sua venda é metade disso: US$ 10.000.',
          'Você recebe 1.000 × 10.000 ÷ (10.000 + 1.000) ≈ US$ 909.',
          'O preço fica multiplicado por (10.000 ÷ 11.000)² ≈ 0,83 — cai cerca de 17%.',
          'E isso antes das taxas: a tela dizia US$ 1.000.',
        ],
      },
      paragrafosFinais: [
        'O erro que essa distinção evita é planejar a vida pelo número não realizado — somar o ' +
          'verde ao patrimônio, calcular imposto, decidir o tamanho da próxima entrada. Enquanto ' +
          'não houver venda, esse número é uma estimativa otimista: não desconta o impacto da ' +
          'sua própria venda nem, pela documentação, as taxas.',
      ],
      detalhe: {
        titulo: 'o erro de leitura ao contrário e as taxas que somem da conta',
        paragrafos: [
          'A central de ajuda da GMGN registra casos de quem vendeu 0,12 SOL pagando 0,2 SOL de ' +
            'taxa de prioridade (o valor extra que se paga para a rede colocar a sua transação ' +
            'na frente das outras). A taxa foi maior que a venda, e a pessoa achou que a venda ' +
            'não tinha caído na carteira.',
          'A conta do exemplo é o modelo de produto constante (x · y = k). A liquidez anunciada ' +
            'soma os dois lados da pool, então só metade dela é o lado que paga a sua venda. Não ' +
            'inclui taxas (de 0,25% a 1,25%, conforme a pool) nem outras pessoas vendendo ao ' +
            'mesmo tempo — as duas coisas pioram o resultado.',
        ],
      },
```

---

## como-fabrica

ANTES: 1 parágrafo (166 caracteres) com a definição de wash trading + 1 parágrafo final (255) com o "por que alguém paga" e a ironia da taxa; `custo` (visual das barras) e `detalhe` sobre os Boosts (388). Texto corrido total: 421.

```js
      paragrafos: [
        'O nome disso é wash trading: negociar consigo mesmo para parecer movimento. A mesma ' +
          'pessoa, ou o mesmo grupo, compra de um lado e vende do outro, com carteiras ' +
          'diferentes. A tela não tem como saber que é a mesma pessoa: ela soma tudo e mostra um ' +
          'volume alto. Numa DEX isso custa dinheiro de verdade, porque cada troca paga a taxa ' +
          'da pool e a taxa da rede.',
        'Alguém paga esse custo porque o volume compra lugar nas listas de "em alta" — e a lista ' +
          'traz compradores de verdade. O volume falso, portanto, não é o objetivo: é a isca. O ' +
          'dinheiro queimado nas taxas é o preço do anúncio, e quem paga espera recuperá-lo ' +
          'vendendo para quem chegou pela lista.',
        'Na tela, isso aparece como volume grande em um token que quase não se mexe, e como ' +
          'muitos makers (as carteiras diferentes que negociaram no período) sem que o preço ' +
          'reaja. O visual acima mostra a outra ponta: quanto custa fabricar US$ 1 milhão de ' +
          'volume, somando a taxa que a pool cobra com o 1% que um serviço de volume anuncia ' +
          'cobrar.',
      ],
      exemplo: {
        titulo: 'A conta de quem compra volume',
        passos: [
          'Num token grande, a taxa da pool é de 0,30% sobre cada troca.',
          'Fabricar US$ 1 milhão de volume ali sai perto de US$ 13 mil, já somando o 1% do ' +
            'serviço.',
          'Num token recém-graduado, a taxa da pool é de 1,25%: a mesma fabricação sai perto de ' +
            'US$ 23 mil.',
          'A ironia que vale guardar: é mais caro justamente no token pequeno — e é ali que a ' +
            'manipulação das listas é mais usada.',
        ],
      },
      paragrafosFinais: [
        'O erro que isso evita é ler volume como interesse. Volume não é gente: é a soma do ' +
          'dinheiro que passou pela pool, e não existe campo na tela que separe o movimento ' +
          'comprado do movimento espontâneo. Um token pode estar no alto da lista de "em alta" ' +
          'porque alguém pagou por isso.',
        'Também não vale a leitura contrária — volume alto não prova fabricação. É suspeita, e a ' +
          'seção seguinte mostra até onde dá para ir com ela sem pagar por dados.',
      ],
      detalhe: {
        titulo: 'os Boosts do DexScreener',
        paragrafos: [
          'O DexScreener vende "Boosts", que turbinam o token no trending (a lista de "em alta") ' +
            'por 12 a 24 horas. Ele não publica os pesos do algoritmo que monta essa lista.',
          'O custo acima soma a taxa oficial da pool com a taxa anunciada por um vendedor de ' +
            'volume (1%). Não é medição independente de campanha real, e não inclui slippage (a ' +
            'diferença entre o preço que aparece na tela e o preço em que a troca realmente sai, ' +
            'justamente porque a sua ordem move a pool).',
        ],
      },
```

---

## otimizado-contra

ANTES: 1 parágrafo (124 caracteres) com a lição geral; tudo o mais estava no visual `duasColunas` e em `foraDaTela` (inclusive a definição de makers e a ideia de triagem). Sem `detalhe`.

```js
      paragrafos: [
        'A coluna vermelha do visual acima não é suposição minha: é o que um vendedor de volume ' +
          'publica, com todas as letras, sobre o próprio serviço. Ele descreve como espalha as ' +
          'operações, como sorteia tamanhos e horários e como troca de carteiras a cada ' +
          'campanha. Quer dizer: quem fabrica o número lê as mesmas telas que você e ajusta o ' +
          'trabalho para que cada sinal pareça normal.',
        'Isso importa porque muda o valor de qualquer sinal isolado. Um número que ficou famoso ' +
          'como "prova de token limpo" é exatamente o número que passa a ser falsificado ' +
          'primeiro, porque agora vale a pena falsificá-lo. Não é que os sinais sejam inúteis: é ' +
          'que cada um deles, sozinho, é uma triagem (um primeiro filtro), nunca um veredito.',
        'Na prática, a defesa é cruzar sinais que custam caro falsificar ao mesmo tempo: volume, ' +
          'makers, concentração de holders (as carteiras que seguram o token, e o quanto o topo ' +
          'da lista concentra), carteiras ligadas entre si e idade do token. Fabricar um deles é ' +
          'barato; fabricar todos, de um jeito coerente entre si, é caro e deixa rastro.',
      ],
      exemplo: {
        titulo: 'O próprio vendedor diz o que denuncia',
        passos: [
          'Ele avisa que um token com US$ 300 mil de volume e só 50 carteiras "é imediatamente ' +
            'suspeito".',
          'Por isso espalha as operações em mais de 100 carteiras.',
          'Sorteia o tamanho e o horário de cada operação, e deixa algumas carteiras só ' +
            'comprando.',
          'E usa carteiras novas a cada campanha, para a idade das carteiras não entregar a ' +
            'repetição.',
        ],
      },
      paragrafosFinais: [
        'O erro que isso evita é a caça ao número mágico: aquele limiar único que separaria os ' +
          'tokens bons dos ruins. Ele não existe, e se existisse teria vida curta — no dia em ' +
          'que virasse regra pública, passaria a ser alvo. A lição vale para a tela inteira: ' +
          'qualquer número que você aprenda a olhar já foi, ou pode ser, calibrado contra você.',
      ],
      detalhe: {
        titulo: 'de onde vem essa lista',
        paragrafos: [
          'Os quatro itens da coluna vermelha são declarados pelo próprio vendedor de volume, no ' +
            'material em que ele anuncia o serviço — inclusive o 1% que ele cobra e a ' +
            'distribuição em mais de 100 carteiras. Não é medição independente: é propaganda de ' +
            'quem vende, usada aqui como confissão.',
        ],
      },
```

---

## o-que-da-para-ver

ANTES: 1 parágrafo (288 caracteres) com o estudo e as razões populares; os dois passos ficam só no visual; `detalhe` com o nome do estudo (144).

```js
      paragrafos: [
        'Detectar volume fabricado tem dois estágios, e eles custam coisas muito diferentes. O ' +
          'primeiro é a suspeita: um descompasso entre o movimento e o preço. O segundo é a ' +
          'confirmação: mostrar que o dinheiro andou em círculo, saindo e voltando para as ' +
          'mesmas carteiras. Um estudo revisado por pares analisou 34.988 tokens em busca de ' +
          'crescimento artificial e trabalha exatamente nesses dois passos.',
        'Para mim, importa saber em qual dos dois eu consigo pisar. O primeiro está ao alcance ' +
          'de qualquer pessoa, de graça. O segundo exige cruzar milhares de operações, carteira ' +
          'por carteira, e isso não sai no plano gratuito de ferramenta nenhuma. Reconhecer esse ' +
          'limite evita tanto a paralisia ("não dá para ver nada") quanto o excesso de confiança ' +
          '("eu confirmei").',
        'Na tela, o que está de graça é a variação de preço, no DexScreener e no GeckoTerminal. ' +
          'O volume de ontem, necessário para comparar com o de hoje, só dá para aproximar. E a ' +
          'confirmação — o tal volume circular — não aparece em campo nenhum: ela teria de ser ' +
          'calculada por fora, a partir do histórico completo de operações.',
      ],
      exemplo: {
        titulo: 'Os dois passos com os números do estudo',
        passos: [
          'Suspeita: o volume subiu mais de 500% com o preço variando menos de 5%.',
          'Isso sai de graça, porque a variação de preço está publicada nas duas ferramentas.',
          'Confirmação: 99% ou mais do volume do dia vem de carteiras que compraram e venderam ' +
            'no mesmo dia.',
          'Isso não sai de graça — e sem ele você tem uma suspeita forte, não um fato.',
        ],
      },
      paragrafosFinais: [
        'O erro que essa separação evita é tratar suspeita como prova, nos dois sentidos: nem ' +
          'anunciar "esse token é wash trading" por causa de um descompasso, nem descartar o ' +
          'descompasso porque "não dá para provar". Ele é um alerta caro de fabricar e barato de ' +
          'ver — vale o que vale.',
        'Evita também um atalho popular: as razões prontas, como "volume por carteira" ou ' +
          '"volume por liquidez", não têm limiar publicado com método e taxa de erro. Os números ' +
          'que circulam com elas são regra de bolso.',
      ],
      detalhe: {
        titulo: 'qual é o estudo',
        paragrafos: [
          'É o estudo Midsummer, do USENIX Security 2026, uma conferência de segurança com ' +
            'revisão por pares.',
          'No mesmo estudo, em quatro redes (Ethereum, BSC, Solana e Base), 82,9% dos tokens que ' +
            'subiram mais de 100% mostravam sinais de crescimento artificial. É a medida do ' +
            'tamanho do problema, não um teste que você possa rodar sozinho.',
        ],
      },
```

---

## bundles

ANTES: 1 parágrafo (283 caracteres) com o peso do fenômeno e a ressalva dos snipers; `bundle` e `cartoes` (visuais) carregam o resto; `detalhe` com Jito, MELT e o top 10 (356).

pergunta: REMOVER (hoje 'q5')

```js
      paragrafos: [
        'Bundle quer dizer pacote: um lote de até 5 transações enviadas juntas para a rede, com ' +
          'uma regra rígida — ou entram todas no mesmo bloco, na ordem pedida, ou não entra ' +
          'nenhuma. Bloco é o lote de transações que a rede grava de uma vez. No lançamento de ' +
          'um token, isso permite ao criador comprar com várias carteiras suas antes de o token ' +
          'aparecer para o público.',
        [
          'O peso disso é grande. Numa amostra de 41.470 tokens que graduaram, ',
          { numero: '36,5%' },
          ' do supply estava em carteiras de bundle na hora da migração para a DEX. Bundle não é ' +
            'prova de golpe: há quem use para se proteger de snipers (robôs que compram nos ' +
            'primeiros instantes de um token). O que ele faz, sempre, é concentrar o token em ' +
            'mãos que chegaram antes de você.',
        ],
        'Na tela, o fenômeno aparece em ferramentas especializadas, com dois números de nomes ' +
          'parecidos e sentidos opostos. "Total bundled %" conta o lançamento: quanto foi ' +
          'comprado em bundle. "Current held %" conta o agora: quanto essas mesmas carteiras ' +
          'ainda seguram. É assim que o trench.bot mostra esse número.',
      ],
      exemplo: {
        titulo: 'O que aparece quando se juntam as carteiras do bundle',
        passos: [
          'A lista de holders trata cada carteira do bundle como se fosse uma pessoa diferente.',
          'Juntando as carteiras ligadas entre si, a fatia do top 10 sobe 24 pontos nos tokens ' +
            'de alto risco.',
          'Nos de baixo risco, sobe 6.',
          'É o mesmo token e a mesma lista: o que mudou foi parar de contar o mesmo dono várias ' +
            'vezes.',
        ],
      },
      paragrafosFinais: [
        'O erro que isso evita é ler "Total bundled %" como veredito. Ele pode estar alto num ' +
          'token cujas carteiras de bundle já venderam tudo, e pode estar baixo num token em que ' +
          'o criador comprou depois, sem bundle. O número que fala do risco de hoje é quanto ' +
          'essas carteiras ainda seguram.',
        'E evita o erro simétrico: tratar bundle como crime. Ele é uma ferramenta de ' +
          'infraestrutura, usada também para defesa. O que importa é a concentração que sobra ' +
          'depois dele.',
      ],
      detalhe: {
        titulo: 'a infraestrutura e o estudo',
        paragrafos: [
          'O Jito, usado por quase toda a rede, é a infraestrutura dos bundles. O número de ' +
            '36,5% e o do top 10 vêm do MELT, um preprint (artigo ainda sem revisão por pares, ' +
            'publicado antes de outros pesquisadores checarem).',
        ],
      },
```

---

## spl-ou-2022

ANTES: 1 parágrafo (268 caracteres) com a checagem dos 24 tokens; o que é "programa" só aparece na raiz da árvore (visual); `detalhe` com create_v2 e as datas (203).

pergunta: REMOVER (hoje 'q6')

```js
      paragrafos: [
        'Na Solana, um token não costuma ter um contrato próprio: existe um programa — o código ' +
          'que administra tokens — e cada token é uma conta administrada por ele. Programas ' +
          'assim são dois. O SPL clássico é o original: não tem taxa de transferência nem ' +
          'extensões. O Token-2022 é o novo, e aceita "extensões" opcionais, escolhidas na hora ' +
          'da criação.',
        'Saber em qual dos dois o token roda é o primeiro passo porque isso define o que pode ' +
          'acontecer depois. Num SPL clássico não há como existir taxa na venda, então não ' +
          'adianta procurar. Num Token-2022 há — e aí a pergunta passa a ser quais extensões ' +
          'esse token específico carrega. Token-2022 não é perigo por si só: perigosa é a ' +
          'extensão a mais.',
        'Na tela do explorador, isso é um campo só: "Owner Program". Se o endereço começa com ' +
          'Tokenkeg…, é SPL clássico. Se começa com Tokenz…, é Token-2022, e existe uma lista ' +
          'chamada "Token Extensions" para conferir logo em seguida. É a mesma ordem do visual ' +
          'acima: programa primeiro, extensões depois.',
      ],
      exemplo: {
        titulo: 'O que uma checagem na blockchain encontrou',
        passos: [
          'Em 12/09/2026, 24 de 24 tokens do pump.fun eram Token-2022.',
          'Todos os 24 tinham só as duas extensões de metadados: metadataPointer e tokenMetadata.',
          'As três extensões perigosas — transferFeeConfig, permanentDelegate e transferHook — ' +
            'apareceram em 0 de 24.',
          'Logo, num token do pump.fun, o alerta não é ser Token-2022: é aparecer qualquer ' +
            'extensão além daquelas duas.',
        ],
      },
      paragrafosFinais: [
        'O erro que isso evita é o atalho "Token-2022 = golpe", que circulou quando o padrão era ' +
          'raro. Desde que o pump.fun passou a criar tokens assim, o rótulo deixou de separar ' +
          'qualquer coisa: quase todo token novo de lá é Token-2022.',
        'O atalho contrário também não serve. "Tokenkeg… = seguro" ignora que o SPL clássico tem ' +
          'as suas próprias portas abertas — as autoridades e o "Mutable" da Metadata, que são ' +
          'as próximas seções. É nesse formato que a LetsBonk e a LaunchLab (Raydium) criam os ' +
          'tokens delas.',
      ],
      detalhe: {
        titulo: 'nomes técnicos e datas',
        paragrafos: [
          'A mudança no pump.fun veio com a instrução create_v2, ativada em 12/11/2025. As duas ' +
            'extensões de metadados se chamam metadataPointer e tokenMetadata.',
        ],
      },
```

---

## extensoes

ANTES: 1 parágrafo (308 caracteres) só sobre a taxa de transferência; as outras extensões só existem na tabela (visual). Sem `exemplo`, sem `detalhe`, sem pergunta.

PROPOSTA DE DIVISÃO (aba O contrato): esta seção comporta duas. Uma sobre `transferFeeConfig` (a taxa: teto, trava das duas epochs, o que a trava não protege), outra sobre as duas extensões que tiram o controle do seu token (`permanentDelegate` e `transferHook`). A `tabelaExtensoes` continuaria inteira na primeira, ou se dividiria pelas mesmas linhas.

```js
      paragrafos: [
        'Extensão é um pedaço de comportamento a mais, escolhido pelo criador na hora em que o ' +
          'token nasce. Duas delas só guardam nome, símbolo e imagem dentro do próprio token, e ' +
          'são o padrão do pump.fun. As outras três da tabela acima mudam o que pode acontecer ' +
          'com o seu token depois que ele já está na sua carteira: transferFeeConfig cobra uma ' +
          'taxa em cada transferência, inclusive na venda; permanentDelegate (delegado ' +
          'permanente) dá a uma conta o poder de mover ou queimar tokens de qualquer carteira; e ' +
          'transferHook (gancho de transferência) roda um programa do criador a cada ' +
          'transferência, que aprova ou recusa.',
        'Duas dessas três pesam mais contra quem comprou. O delegado permanente tira os seus ' +
          'tokens sem a sua assinatura — não é preciso convencer você de nada. O gancho pode ' +
          'recusar a sua venda e deixar a compra passar, que é o resultado prático de um ' +
          'honeypot: um token que se compra e não se vende. A taxa, ao menos, você consegue ' +
          'calcular antes.',
        'Na tela, tudo isso é uma lista de nomes em inglês no campo "Token Extensions" do ' +
          'explorador. O trabalho de leitura é curto: comparar essa lista com as duas de ' +
          'metadados. Se houver qualquer nome além delas, vale abrir a tabela acima e ver o que ' +
          'aquele nome permite.',
      ],
      exemplo: {
        titulo: 'A taxa de transferência, do começo ao fim',
        passos: [
          'A taxa só pode ser configurada na criação: um token criado sem ela não ganha taxa ' +
            'depois.',
          'Quando existe, o teto é de 100% — a transferência inteira pode virar taxa.',
          'Mudar o valor só vale duas epochs depois, cerca de 4 dias (epoch é um ciclo de tempo ' +
            'da rede Solana).',
          'Mas a trava só atrasa a mudança: uma taxa alta pode vir configurada desde o ' +
            'lançamento.',
        ],
      },
      paragrafosFinais: [
        'O erro que isso evita é confundir "tem aviso prévio" com "estou protegido". As duas ' +
          'epochs de espera protegem contra a surpresa, não contra a taxa: se ela já nasceu ' +
          'alta, não há atraso nenhum a aguardar.',
        'O erro simétrico é assustar-se com a palavra "extensão". As duas de metadados são o ' +
          'padrão e não fazem mal, desde que a autoridade de atualização esteja nula — o que ' +
          'leva à próxima seção, sobre as permissões que o dono guardou.',
      ],
      detalhe: {
        titulo: 'o que a checagem encontrou, extensão por extensão',
        lista: [
          'metadataPointer + tokenMetadata: padrão no pump.fun, com as autoridades nulas em 11 ' +
            'de 11 checados.',
          'transferFeeConfig: não aparece (0 de 24).',
          'permanentDelegate: não aparece (0 de 24).',
          'transferHook: não aparece (0 de 24).',
          'A regra da taxa e a trava das duas epochs estão na documentação da Solana sobre ' +
            'transfer fees do Token-2022.',
        ],
      },
```

---

## autoridades

ANTES: 1 parágrafo (213 caracteres) sobre o pump.fun revogar mint e freeze; o que cada autoridade faz só existe nos cartões (visual); `detalhe` com o campo "Authority" do Solscan (296).

pergunta: REMOVER (hoje 'q7')

PROPOSTA DE DIVISÃO (aba O contrato): a autoridade de metadados pode virar seção própria. Ela reaparece na seção do dev dump ("Metadata mutável"), pertence à parte 3 pelo nome ("Metadata, dev dump e redes EVM") e é a única das três que segue ativa em muitos tokens fora do pump.fun.

```js
      paragrafos: [
        'Autoridade, aqui, é uma permissão que ficou guardada com alguém depois que o token ' +
          'nasceu. São três, e cada uma é um poder diferente. A de mint (cunhar) permite criar ' +
          'tokens novos. A de freeze (congelar) permite congelar a conta de alguém. A de ' +
          'metadados permite trocar nome, símbolo e imagem — metadados são isso: a identidade ' +
          'visível do token.',
        'Para quem comprou, as três agem depois da compra, e é isso que as torna importantes. ' +
          'Mint ativa dilui você: o dono cria mais tokens e o seu pedaço do total encolhe. ' +
          'Freeze ativa é o honeypot da Solana — você compra e pode simplesmente não conseguir ' +
          'vender, sem código esperto nenhum, só uma permissão. Metadados ativa faz o token que ' +
          'você comprou passar a se parecer com outro.',
        'No explorador, isso se lê num campo chamado "Authority". Ele mostra "N/A" quando todas ' +
          'foram revogadas — revogar é abrir mão da permissão, de forma definitiva. No ' +
          'Token-2022, a autoridade de metadados aparece como a update authority do ' +
          'tokenMetadata; num SPL clássico, como "Mutable: true" na aba Metadata.',
      ],
      exemplo: {
        titulo: 'Por que esse campo quase não ajuda dentro do pump.fun',
        passos: [
          'No pump.fun, mint e freeze vêm revogadas (desligadas) em todo token.',
          'A autoridade de metadados veio nula em 11 de 11 tokens checados.',
          'Ou seja: o campo dá o mesmo resultado em praticamente todos os tokens de lá.',
          'Um sinal que nunca varia não separa um token do outro — ele só confirma a regra da ' +
            'plataforma.',
        ],
      },
      paragrafosFinais: [
        'O erro que isso evita é o mais vendido dos selos: "mint e freeze revogadas, token ' +
          'seguro". Revogadas é bom, mas dentro do pump.fun é o padrão, e padrão não informa ' +
          'nada sobre um token específico. Fora do pump.fun a história muda: lá as autoridades ' +
          'variam de token para token, e são a primeira coisa a olhar.',
      ],
      detalhe: {
        titulo: 'o campo "Authority" do Solscan',
        paragrafos: [
          'Esse campo é um menu que junta três autoridades: de mint, de freeze e de metadados. ' +
            'Ele mostra "N/A" quando todas foram revogadas. Um endereço ali não quer dizer que o ' +
            'dono ainda emite tokens. Pode ser só a autoridade de metadados.',
        ],
      },
```

---

## dev-dump

ANTES: 1 parágrafo (346 caracteres) com a trilha do Creator; a tradução de "dev dump" nunca aparece; três blocos de `detalhe` (943) guardam metadata mutável, os limites do sinal e as redes EVM.

PROPOSTA DE DIVISÃO (aba O contrato): o bloco "Fora da Solana" do `detalhe` merece seção própria. Ele não fala de pump.fun nem de dev dump — fala de Ethereum, BSC e Base, de simular compra e venda e de contrato atualizável — e a parte 3 da aba já se chama "Metadata, dev dump e redes EVM".

```js
      paragrafos: [
        'Dev dump é o nome de rua do golpe: dev é o criador do token (de developer, ' +
          'desenvolvedor) e dump é despejar tudo de uma vez. Ele existe porque, no pump.fun, o ' +
          'golpe clássico foi fechado: depois da graduação, a pool pertence ao protocolo, e o ' +
          'criador não consegue tirar a liquidez de lá. O que sobra para ele é vender, de uma ' +
          'vez, o que comprou barato no minuto zero.',
        'Isso importa porque muda quem paga a conta. Não é a pool que some: é o preço que ' +
          'desaba, em cima de quem comprou depois. E a compra barata costuma ter sido feita em ' +
          'várias carteiras ao mesmo tempo, no mesmo bloco, o que faz um criador só parecer ' +
          'várias pessoas na lista de holders.',
        'A trilha, ao menos, fica visível. A carteira que criou o token aparece como "Creator" ' +
          'no Solscan, e o histórico dela mostra quanto comprou e quando vendeu. Dá para abrir ' +
          'essa carteira e ler as operações uma a uma, sem ferramenta paga.',
      ],
      exemplo: {
        titulo: 'O padrão que um guia de ferramenta descreve',
        passos: [
          'O criador compra barato no lançamento, muitas vezes em várias carteiras, no mesmo ' +
            'bloco.',
          'Outras pessoas chegam depois e compram mais caro.',
          'As carteiras do primeiro bloco vendem nos primeiros 30 minutos.',
          'Importante: isso é descrição de guia de ferramenta, sem medição. É um padrão ' +
            'relatado, não um limiar testado.',
        ],
      },
      paragrafosFinais: [
        'O erro que isso evita é ler "a liquidez não pode ser retirada" como "não pode haver ' +
          'golpe". A trava da pool fecha uma porta e deixa a outra aberta, e é pela outra que se ' +
          'sai carregado.',
        'O erro oposto também custa caro: carteira de Creator parada não prova inocência. Quem ' +
          'monta o golpe usa carteiras intermediárias para esconder o vínculo, e nenhum estudo ' +
          'revisado por pares isolou "o criador vendeu" como preditor de rug — um sinal que ' +
          'antecipa o golpe. É evidência fraca — mas não é evidência nenhuma.',
      ],
      detalhe: {
        titulo: 'metadata mutável, os limites do sinal e as redes EVM',
        blocos: [
          {
            titulo: 'Metadata mutável.',
            texto:
              'Com a autoridade de metadados ativa, o dono pode trocar nome, símbolo e imagem ' +
              'depois que você comprou. Num SPL clássico aparece como "Mutable: true" na aba ' +
              'Metadata do Solscan; num Token-2022 é a update authority do tokenMetadata. Nos ' +
              'tokens do pump.fun checados, essa porta estava fechada.',
          },
          {
            titulo: 'Os dois limites do sinal.',
            texto:
              'Nenhum estudo revisado por pares isolou "o criador vendeu" como preditor de rug. ' +
              'Quem monta o golpe usa carteiras intermediárias para esconder o vínculo.',
          },
          {
            titulo: 'Fora da Solana.',
            texto:
              'Em Ethereum, BSC e Base — as redes EVM, que rodam contratos no mesmo padrão do ' +
              'Ethereum —, a taxa e o bloqueio da venda ficam no código do contrato, e não num ' +
              'campo padronizado que dê para conferir de relance. A checagem que funciona é ' +
              'simular uma compra e uma venda antes (o honeypot.is faz isso de graça) — mas a ' +
              'simulação é só um retrato do momento. Num contrato atualizável, o dono pode ' +
              'trocar a lógica depois, e mudar a taxa ou bloquear vendas quando quiser.',
          },
        ],
      },
```

---

## o-que-conta

ANTES: 2 parágrafos (524 caracteres, a seção mais longa do módulo) com a definição de rug e o maior estudo; a régua da Chainalysis estava em `foraDaTela`; sem `exemplo`, sem `detalhe`.

```js
      paragrafos: [
        'Rug vem de "rug pull", puxar o tapete: o token desaba e quem comprou fica sem saída. ' +
          'Não existe uma definição única. Cada estudo escolhe a sua régua — um exige prova de ' +
          'intenção, outro se contenta com o colapso da liquidez — e o número muda junto com a ' +
          'régua escolhida.',
        'Isso importa porque a mesma realidade pode ser descrita como "3,59% dos tokens" ou ' +
          '"98,6% dos tokens", sem que ninguém esteja mentindo. Quando alguém cita uma dessas ' +
          'porcentagens sem dizer o que contou, o número deixa de ser informação e vira ' +
          'sensação: serve para assustar ou para acalmar, conforme a régua que deu mais jeito.',
        'No visual acima, as quatro medições aparecem na mesma escala, de 0 a 100% dos tokens de ' +
          'cada amostra. Leia as barras como quatro perguntas diferentes, não como quatro ' +
          'respostas para a mesma pergunta: as réguas e as amostras são diferentes entre si.',
      ],
      exemplo: {
        titulo: 'Os dois extremos, lado a lado',
        passos: [
          'A Chainalysis contou 3,59% dos tokens de 2024 como suspeitos de pump-and-dump ' +
            '(inflar o preço e vender em cima de quem chega).',
          'A Solidus Labs contou 98,6% dos tokens com liquidez abaixo de US$ 1.000.',
          'A primeira régua pede indício de manipulação; a segunda registra colapso de liquidez, ' +
            'não fraude provada.',
          'A pump.fun contestou publicamente o número da Solidus Labs. Os dois continuam ' +
            'verdadeiros dentro da própria régua.',
        ],
      },
      paragrafosFinais: [
        'O erro que isso evita é comparar porcentagens de estudos diferentes como se fossem ' +
          'placares do mesmo campeonato — e, pior, decidir alguma coisa com base nessa ' +
          'comparação. Antes de usar qualquer número deste tipo, a pergunta é sempre a mesma: o ' +
          'que exatamente foi contado, em que amostra, em que período?',
      ],
      detalhe: {
        titulo: 'o maior estudo e a régua dele',
        paragrafos: [
          'O maior estudo de detecção na Solana acompanhou 6,4 milhões de tokens do PumpFun e da ' +
            'Raydium, de 30/11/2024 a 30/06/2025, e chamou de rug o token cuja liquidez caiu 99% ' +
            'desde o pico, ou que ficou parado por mais de 80% da própria vida.',
          'Com essa régua, 60,8% dos tokens da Raydium e 81,9% dos do PumpFun foram classificados ' +
            'como rug — no PumpFun, 43.835 de 53.546 tokens do teste. É o arXiv 2608.20271, ' +
            'ainda preprint.',
        ],
      },
```

---

## melhor-detector

ANTES: 1 parágrafo (329 caracteres) com as características do modelo; o que é XGBoost estava em `foraDaTela`; três visuais (`grades`, `f1`, `mcc`) e `detalhe` com F1 e MCC (252). Sem exemplo.

pergunta: REMOVER (hoje 'q8')

```js
      paragrafos: [
        'O modelo que se saiu melhor se chama XGBoost: um tipo de programa que aprende padrões a ' +
          'partir de exemplos, sem que ninguém escreva as regras à mão. Ele olha só os 5 ' +
          'primeiros minutos de negociação — quantidade de compras e vendas, carteiras únicas, ' +
          'valores e variação de preço — e devolve um palpite. Nenhuma das 23 características ' +
          'que ele usa é de holders, bundles, autoridades ou redes sociais.',
        'Ele importa porque é o teto do que está publicado: quando alguém promete detecção de ' +
          'rug, é com esse resultado que a promessa deveria ser comparada. E os próprios autores ' +
          'reconhecem dois limites duros — o golpe muda com o tempo, e o que o modelo aprende ' +
          'numa plataforma não vale na outra.',
        'Os visuais acima mostram o desempenho de três ângulos. As duas grades de 100 respondem ' +
          '"quando ele acusa, ele acerta?" e "dos rugs reais, quantos ele pega?". A barra do F1 ' +
          'compara a nota dele com a de um chute burro. A régua do MCC mostra o quanto ele é ' +
          'melhor que o acaso, de −1 a 1.',
      ],
      exemplo: {
        titulo: 'As três notas, lidas em ordem',
        passos: [
          'De cada 100 tokens que o modelo marca como rug, cerca de 95 são rug mesmo; e de cada ' +
            '100 rugs reais, ele pega uns 68.',
          'Parece ótimo, até comparar: o F1 dele é 0,79, e o de chutar "tudo é rug" é 0,90.',
          'Isso acontece porque quase todo token do teste era rug (81,9%) — num lugar assim, ' +
            'chutar sempre a mesma coisa tira nota alta.',
          'O MCC, que não se deixa enganar por isso, dá 0,39. Treinado na Raydium e testado no ' +
            'PumpFun, cai para perto de zero — ou seja, perto de chutar.',
        ],
      },
      paragrafosFinais: [
        'O erro que esses números evitam é acreditar em "acertou 95%" sem perguntar o que ' +
          'chutar teria acertado. Numa amostra em que quase tudo é golpe, quase qualquer coisa ' +
          'parece um bom detector.',
        'E evita o excesso na direção contrária: 0,39 de MCC não é zero. O modelo enxerga ' +
          'alguma coisa nos 5 primeiros minutos — só não o bastante para virar semáforo, e os ' +
          'próprios autores dizem que ele ainda não serve para uso real.',
      ],
      detalhe: {
        titulo: 'como ler F1 e MCC, e de onde vêm esses números',
        paragrafos: [
          'O F1 junta duas perguntas. Do que o modelo acusou, quanto era rug? E, dos rugs reais, ' +
            'quantos ele achou? O MCC vai de −1 a 1. Perto de 1 é acerto quase perfeito, 0 é o ' +
            'mesmo que chutar, e −1 é errar tudo.',
          'Os números de F1 e MCC são do artigo (arXiv 2608.20271, preprint). Os dois das ' +
            'grades, 95 e 68, são estimativa: o artigo não os publica, e eles foram ' +
            'reconstruídos pelas contagens do teste — 43.835 rugs em 53.546 tokens.',
        ],
      },
```

---

## sinais

ANTES: 1 parágrafo (279 caracteres); o quadro com os dois grupos de sinais e a definição de insiders estavam em `foraDaTela`; a tabela (visual) carrega as etiquetas de evidência. Sem exemplo, sem `detalhe`.

```js
      paragrafos: [
        'A tabela acima não lista sinais em ordem de popularidade: lista em ordem de evidência. ' +
          'Cada linha recebe uma etiqueta — "Sinal medido" quando algum estudo mediu o poder de ' +
          'previsão, "Medido e desmentido" quando alguém mediu e não encontrou diferença, e ' +
          '"Sinal fraco" quando a mecânica faz sentido mas ninguém mediu se antecipa o golpe.',
        'Essa separação importa mais do que a lista em si. Sinal medido e sinal plausível não ' +
          'pesam igual, e tratá-los como iguais é o começo de toda falsa segurança. Os sinais ' +
          'com mais apoio são de uma família só: quem controla o token no minuto zero, e como ' +
          'disfarça isso. Os que o mercado mais repete estão, em geral, do lado fraco.',
        'No pump.fun a tabela encurta sozinha, e é por isso que a coluna "No pump.fun" existe: ' +
          'mint e freeze vêm sempre revogadas, LP travada não se aplica porque a pool é do ' +
          'protocolo, e o que sobra é o criador vendendo e a concentração de insiders (gente de ' +
          'dentro, que entrou antes do público). Justamente aí a medição revisada por pares é a ' +
          'mais fraca.',
      ],
      quadro: [
        {
          rotulo: 'Têm apoio da pesquisa',
          texto:
            'Concentração de holders depois de juntar as carteiras ligadas. Compra coordenada ' +
            'no lançamento. Negociação artificial.',
        },
        {
          rotulo: 'O mercado repete, mas têm menos apoio',
          texto:
            'LP travada (liquidez trancada, quando o criador deixa a liquidez presa num ' +
            'contrato por um tempo) não separa golpe de não golpe. Mint e freeze authority são ' +
            'mecânica certa, mas vêm sempre revogadas no pump.fun. Ausência de redes sociais ' +
            'nunca foi medida como preditor.',
        },
      ],
      exemplo: {
        titulo: 'O sinal que foi medido e não passou',
        passos: [
          'LP travada é vendida como selo de segurança: a liquidez está presa, logo o criador ' +
            'não a levaria embora.',
          'Entre os tokens com trava, 97,3% eram maliciosos.',
          'No conjunto geral, sem trava nenhuma, 97,7%.',
          'A trava não separou quase nada — e é exatamente isso que a etiqueta "Medido e ' +
            'desmentido" quer dizer.',
        ],
      },
      paragrafosFinais: [
        'O erro que essa tabela evita é somar selos. Uma lista de itens verdes dá a sensação de ' +
          'aprovação, mas a soma de muitos sinais fracos continua fraca — e alguns deles já ' +
          'foram testados e não sustentaram a promessa.',
        'Nenhum desses sinais, medido ou não, diz quando comprar. Eles servem para reprovar pelo ' +
          'que dá para ver, e para dizer qual é o tamanho da sua incerteza no resto.',
      ],
      detalhe: {
        titulo: 'de onde vêm as etiquetas',
        paragrafos: [
          'A concentração de holders depois de juntar carteiras ligadas e o peso dos bundles ' +
            'vêm do MELT, ainda preprint: juntando as carteiras, o top 10 sobe 24 pontos nos ' +
            'tokens de alto risco.',
          'O volume artificial vem do Midsummer (USENIX Security 2026, com revisão por pares): ' +
            '82,9% dos tokens que subiram mais de 100% tinham sinais. É também o sinal mais ' +
            'contornado de propósito, como mostrou a aba do volume.',
        ],
      },
```

---

## por-que-importa

ANTES: 1 parágrafo (254 caracteres) com a regra e a menção ao checklist; o passo a passo do teste estava em `foraDaTela`; `anuncio` (visual) e `link` para o checklist.

```js
      paragrafos: [
        'Todo anúncio de detecção traz uma porcentagem sozinha: "95% de precisão". Um número ' +
          'assim não quer dizer nada sem duas informações que quase nunca vêm junto. A primeira ' +
          'é a régua: o que foi chamado de rug ali dentro. A segunda é a comparação certa: ' +
          'quanto acertaria o chute mais burro possível, o de responder "golpe" para todo token.',
        'Isso importa porque a porcentagem é desenhada para ser comparada com zero, e a ' +
          'comparação honesta é com o chute. Em amostras onde quase tudo é golpe, o chute já ' +
          'acerta quase tudo — e aí o que o detector acrescenta é muito menor do que o número ' +
          'anunciado sugere.',
        'O visual acima é esse teste em duas barras. A linha ciana marca o que o chute acertaria; ' +
          'a barra inteira é o que o anúncio promete. O que o detector de fato acrescenta é só a ' +
          'faixa entre a linha e o fim da barra.',
      ],
      exemplo: {
        titulo: 'Quatro perguntas diante de um "95% de precisão"',
        passos: [
          'Primeira: quantos por cento da amostra eram golpe?',
          'Suponha que eram 82%.',
          'Então chutar "golpe" para todo token já acertava 82%.',
          'Os 95% precisam ser comparados com esses 82%, não com zero — e ainda falta saber que ' +
            'régua definiu "golpe".',
        ],
      },
      paragrafosFinais: [
        'O erro que isso evita é terceirizar a decisão para um selo. Um detector não é um ' +
          'semáforo: ele é um número que só significa alguma coisa ao lado da régua e do chute.',
        'É por isso que o checklist deste hub não aprova token nenhum. Ele reprova pelo que dá ' +
          'para ver, e separa cada item pela força da evidência — a mesma lógica das etiquetas ' +
          'da seção anterior.',
      ],
      detalhe: {
        titulo: 'os números deste exemplo',
        paragrafos: [
          'Os 82% do exemplo são uma suposição do próprio exemplo, para mostrar a conta: não são ' +
            'medição de amostra nenhuma. Os 95% representam um anúncio genérico, desses que ' +
            'circulam sem método publicado.',
          'A régua que define "golpe" muda o resultado sozinha, como a seção "O que conta como ' +
            'rug" mostra: com réguas diferentes, os números vão de 3,59% a 98,6%.',
        ],
      },
```

---

## APONTAMENTOS

1. **Contagem de caracteres.** O pedido falava em ~6.394 (Os números) e ~6.320 (O contrato). Medindo só o texto corrido (`paragrafos` + `paragrafosFinais`), as abas tinham 987 e 1.135 caracteres — o número maior deve contar também os textos dos visuais, das tabelas, dos `destaques`, do `detalhe` e do quiz. Módulo inteiro, antes: 4.624 caracteres de texto corrido em 16 seções.
2. **`perguntaAntes` fica ou sai?** Além dos `perguntaRapida` das seções, existe `perguntaAntes: { numeros: 'q1', volume: 'q5', contrato: 'q6', deteccao: 'q8' }`, o bloco "Antes de ler: o que você acha?" no topo de cada aba. São exatamente as quatro perguntas que saem dos cards. Não mexi nele; a decisão de hoje falava da "Pergunta rápida".
3. **O campo se chama `perguntaRapida`**, não `pergunta`. São 8 ocorrências (q1 em tres-numeros, q2 em quanto-sai, q4 em zeros-compactados, q3 em pnl, q5 em bundles, q6 em spl-ou-2022, q7 em autoridades, q8 em melhor-detector). O array `quiz` está intacto. Não abri `src/views/modulo6.js` (economia de tokens), então não conferi se a view quebra quando o campo some — vale um teste rápido ao colar.
4. **82,9% × 82,89% × 82,8%.** A fonte do Midsummer registra "82,89% na versão publicada, 82,8% no arXiv 2507.01963v2", e os `destaques` e a `tabelaSinais` usam 82,9%. Não corrigi: usei 82,9%, como está no texto da tela.
5. **O par 97,3% / 97,7% (LP travada) não tem fonte nomeada** na `tabelaSinais`. As candidatas na lista de `fontes` seriam "Do Not Rug on Me" ou o estudo dos Trapdoor Tokens. Usei os números sem atribuir a ninguém.
6. **F1 e MCC nunca são abertos por extenso** no arquivo. Não inventei o nome completo das siglas; expliquei só a escala de cada uma, como o `detalhe` já fazia.
7. **`calculadoraDeSaida` está marcada como fora da tela** desde o redesenho de 18/09, mas guarda o melhor exemplo resolvido do módulo (posição de US$ 1.000, pool de US$ 20.000, recebe ≈ US$ 909, preço cai ~17%). Trouxe esses números para o `exemplo` da seção `pnl` e a nota das taxas (0,25% a 1,25%) para o `detalhe` dela. Se a calculadora voltar para a tela, o mesmo exemplo aparecerá duas vezes.
8. **A única peça interativa na tela hoje é a curva deslizante** da seção `quanto-sai`. O terceiro parágrafo dessa seção passou a dar objetivo, o que cada um dos dois números significa e como ler o resultado (fração da liquidez anunciada, não do saldo da tela). O exemplo dela ficou intacto, porque a curva lê a liquidez dali.
9. **Divergência entre a definição de FDV e a do DexScreener.** O `quadro` define FDV como "preço × supply total"; o `detalhe` diz que no DexScreener é "(supply total − tokens queimados) × preço". As duas continuam como estão; só acrescentei, no fim do `detalhe`, que o mesmo rótulo significa contas diferentes em sites diferentes.
10. **"24 de 24" e "11 de 11"** vêm da mesma checagem de 12/09/2026, com amostras de tamanhos diferentes (extensões × autoridades). Mantive cada número no seu lugar, sem juntar.
11. **`foraDaTela` agora duplica texto visível.** As definições que estavam guardadas lá (PnL, XGBoost, makers, metadados, pump-and-dump, o exemplo dos 95%/82%, o quadro dos sinais) voltaram para o texto da tela, como o pedido manda. Os campos `foraDaTela` continuam no arquivo, intactos — o dono decide se limpa depois.
12. **Propostas de divisão** (nenhuma aplicada; todas exigem mexer em `src/views/modulo6.js` e talvez em `partes`, o que este trabalho não toca):
    - `tres-numeros` → tirar "cada site calcula do seu jeito" para uma seção própria de consulta, na parte 1 da aba Os números.
    - `extensoes` → uma seção para `transferFeeConfig` (taxa, teto, trava das duas epochs) e outra para `permanentDelegate` + `transferHook` (as que tiram o controle do token).
    - `autoridades` → a autoridade de metadados como seção própria, já que reaparece em `dev-dump` e a parte 3 se chama "Metadata, dev dump e redes EVM".
    - `dev-dump` → o bloco "Fora da Solana" (Ethereum, BSC, Base, honeypot.is, contrato atualizável) como seção própria, fechando a parte 3.
13. **Nada prescreve compra ou venda.** Onde o arquivo já traz "Não compro" (`checagemDoContrato`), não toquei: é a regra do dono, não do app. As seções novas dizem o que cada número significa e o que ele não prova.
14. **O quiz não foi tocado** e as 8 perguntas continuam lá; a `checagemDoContrato`, a `tabelaSinais`, a `tabelaExtensoes` e todos os campos de visual também ficaram como estavam.

---

## TERMOS TRADUZIDOS

Varredura na ordem em que o leitor encontra cada termo. Todo jargão em inglês passa a ter tradução ou explicação na primeira aparição no texto (o visual de cada seção vem antes dos parágrafos e alguns rótulos curtos aparecem lá primeiro — quando é o caso, o parágrafo seguinte explica).

| Termo | Estreia em | Como passa a ser explicado |
| --- | --- | --- |
| market cap | tres-numeros, parágrafo 1 | valor de mercado: preço do último negócio × tokens em circulação |
| FDV / fully diluted valuation | tres-numeros, parágrafo 1 | valor totalmente diluído: a mesma multiplicação, por todos os tokens que existem |
| supply | tres-numeros, parágrafo 1 | o total emitido |
| pool | tres-numeros, parágrafo 1 | o par de reservas que faz a troca |
| DEX | tres-numeros, parágrafo 1 | corretora sem dono, onde quem faz a troca é um programa |
| bonding curve / graduação | tres-numeros, detalhe | a fase em que o token é negociado dentro do próprio pump.fun, antes de migrar para uma pool numa DEX; a essa migração o mercado chama de graduação |
| AMM / automated market maker | quanto-sai, detalhe | formador de mercado automático: um programa que aceita a troca no preço que as reservas ditam |
| revisado por pares | quanto-sai, detalhe | outros pesquisadores da área checaram antes de a revista publicar |
| leitor de tela | zeros-compactados, parágrafo 3 | programa que narra o que está escrito |
| API | zeros-compactados, detalhe | o acesso de dados para programas: a mesma informação em texto puro |
| PnL / profit and loss | pnl, parágrafo 1 | lucro ou prejuízo; realizado (já vendido) × não realizado (estimativa) |
| taxa de prioridade | pnl, detalhe | o valor extra pago para a rede colocar a sua transação na frente |
| wash trading | como-fabrica, parágrafo 1 | negociar consigo mesmo para parecer movimento |
| makers | como-fabrica, parágrafo 3 | as carteiras diferentes que negociaram no período |
| trending / "em alta" | como-fabrica, parágrafo 2 e detalhe | a lista de tokens em destaque, que o DexScreener também vende via Boosts |
| slippage | como-fabrica, detalhe | a diferença entre o preço da tela e o preço em que a troca sai |
| holders | otimizado-contra, parágrafo 3 | as carteiras que seguram o token, e o quanto o topo da lista concentra |
| triagem | otimizado-contra, parágrafo 2 | um primeiro filtro, nunca um veredito |
| volume circular | o-que-da-para-ver, parágrafo 3 e exemplo | 99% ou mais do volume do dia vindo de carteiras que compraram e venderam no mesmo dia |
| bundle | bundles, parágrafo 1 | pacote: lote de até 5 transações que entram juntas, ou nenhuma entra |
| bloco | bundles, parágrafo 1 | o lote de transações que a rede grava de uma vez |
| sniper | bundles, parágrafo 2 | robôs que compram nos primeiros instantes de um token |
| preprint | bundles, detalhe | artigo ainda sem revisão por pares |
| cluster / carteiras ligadas | bundles, exemplo | várias carteiras do mesmo dono, contadas como uma só |
| programa (Solana) | spl-ou-2022, parágrafo 1 | o código que administra tokens; cada token é uma conta administrada por ele |
| SPL clássico / Token-2022 | spl-ou-2022, parágrafo 1 | o original, sem extensões × o novo, que aceita extensões opcionais |
| Owner Program | spl-ou-2022, parágrafo 3 | o campo do explorador que diz qual dos dois programas manda (Tokenkeg… ou Tokenz…) |
| extensão / Token Extensions | extensoes, parágrafo 1 | pedaço de comportamento a mais, escolhido na criação do token |
| transferFeeConfig | extensoes, parágrafo 1 | cobra taxa em cada transferência, inclusive na venda |
| permanentDelegate | extensoes, parágrafo 1 | delegado permanente: pode mover ou queimar tokens de qualquer carteira |
| transferHook | extensoes, parágrafo 1 | gancho de transferência: roda um programa do criador que aprova ou recusa |
| honeypot | extensoes, parágrafo 2 | um token que se compra e não se vende |
| epoch | extensoes, exemplo | um ciclo de tempo da rede Solana (duas epochs ≈ 4 dias) |
| autoridade / revogar | autoridades, parágrafos 1 e 3 | permissão guardada com alguém depois da criação; revogar é abrir mão dela |
| mint / freeze | autoridades, parágrafo 1 | cunhar (criar tokens novos) / congelar a conta de alguém |
| metadados / "Mutable: true" / update authority | autoridades, parágrafos 1 e 3 | nome, símbolo e imagem: a identidade visível do token, e os campos que dizem se ela pode mudar |
| dev dump | dev-dump, parágrafo 1 | dev é o criador (developer) e dump é despejar tudo de uma vez |
| Creator | dev-dump, parágrafo 3 | o campo do Solscan com a carteira que criou o token |
| EVM | dev-dump, detalhe | as redes que rodam contratos no mesmo padrão do Ethereum |
| contrato atualizável | dev-dump, detalhe | contrato cuja lógica o dono pode trocar depois |
| preditor | dev-dump, parágrafos finais | um sinal que antecipa o golpe |
| rug / rug pull | o-que-conta, parágrafo 1 | puxar o tapete: o token desaba e quem comprou fica sem saída |
| pump-and-dump | o-que-conta, exemplo | inflar o preço e vender em cima de quem chega |
| XGBoost | melhor-detector, parágrafo 1 | um tipo de programa que aprende padrões a partir de exemplos |
| F1 e MCC | melhor-detector, parágrafo 3 e detalhe | duas notas de desempenho; o F1 junta duas perguntas, o MCC vai de −1 a 1 (siglas não abertas no arquivo) |
| LP travada | sinais, quadro | liquidez trancada: o criador deixa a liquidez presa num contrato por um tempo |
| insiders | sinais, parágrafo 3 | gente de dentro, que entrou antes do público |

Termos que já vêm explicados dos módulos anteriores e por isso não foram reabertos aqui: memecoin, carteira, token, blockchain, SOL, explorador, taxa da rede.
