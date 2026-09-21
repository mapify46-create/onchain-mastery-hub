# Módulo 4 — texto reescrito

Medi o texto corrido que aparece na tela hoje, card a card: o módulo inteiro tem cerca de 4.854 caracteres visíveis, e 1.147 deles são a tributação, que fica recolhida. Os cards mais curtos são a tabela de teses (88), o mapa das catálises (101) e a calculadora dos degraus (184) — todos legenda de visual, nenhum explicação. Há ainda 2.678 caracteres de texto bom guardados em arrays que a tela parou de mostrar no redesenho (`teseVsCatalise.paragrafos`, `takeProfit.paragrafos`, `erroDeSegurar.paragrafos`): o módulo não ficou curto porque alguém escreveu pouco, ficou curto porque o texto saiu da tela. Esta reescrita devolve a explicação para dentro dos campos que o card mostra, na ordem fixa, sabendo que o visual vem antes dos parágrafos. Depois dela o módulo passa a ter cerca de 36.900 caracteres de texto escrito — 27.900 de texto corrido (parágrafos, parágrafos finais e os "Para ir mais fundo") e 9.000 nos quadros, exemplos e pontos da tributação.

---

## teseVsCatalise

ANTES: só a frase de abertura e a caixa verde "As duas juntas viram o seu critério de saída" — 338 caracteres na tela (mais 230 na regra de ouro); o array `paragrafos`, com 1.047 caracteres, está fora da tela desde o redesenho.

pergunta: REMOVER (hoje 'q1')

```js
  teseVsCatalise: {
    titulo: 'Tese vs. catálise: as duas frases que faltam antes de comprar',
    // A ideia central do card (a frase com a borda ciano). Não repete o título nem
    // legenda o visual: abre o que vem depois dele.
    emUmaFrase:
      'Duas frases escritas antes de clicar em comprar são o que separa uma operação de uma ' +
      'aposta — e são elas, depois, que decidem a hora de sair.',

    // (campos de visual inalterados: duasFrases, rotuloSozinha, juntas, regraDeOuro)

    // Texto corrido do card. Substitui o array antigo de 9 parágrafos, que estava
    // guardado aqui como referência e fora da tela desde o redesenho.
    paragrafos: [
      'Tese é a frase que responde "por que este token, e não outro?". Ela nomeia o que você ' +
        'viu: a narrativa que o token monta, a comunidade que já existia antes de você chegar, ' +
        'o nicho que ele ocupa, o momento de mercado que ele aproveita. Catálise é a frase que ' +
        'responde "por que agora?". Ela nomeia um evento concreto, com data, que precisa ' +
        'acontecer para trazer compradores que hoje ainda não compraram.',
      'As duas parecem burocracia até a primeira vez que o preço se mexe forte e você precisa ' +
        'decidir alguma coisa no susto. Quem não escreveu nada decide pela emoção do momento, e ' +
        'a emoção do momento diz sempre a mesma coisa: espera mais um pouco. Quem escreveu as ' +
        'duas frases tem um texto para consultar — escrito por você mesmo, com a cabeça fria, ' +
        'num dia em que ainda não havia nada em jogo.',
      'O efeito prático é este: as duas frases viram o seu critério de saída, sem que você ' +
        'precise inventar um no meio do aperto. Se a catálise aconteceu e o preço não reagiu, a ' +
        'tese estava errada — o mercado viu o mesmo evento que você e não ligou. Se a catálise ' +
        'foi cancelada, ou adiada sem data nova, o motivo da posição sumiu. Nos dois casos a ' +
        'decisão já estava tomada; o que resta é executar.',
      'Na figura acima as duas frases aparecem lado a lado, cada uma com a pergunta que ' +
        'responde. Embaixo de cada uma há um rótulo em vermelho, "Sozinha": é o que acontece ' +
        'quando você tem só aquela metade. Tese sem catálise é um token que pode ficar meses ' +
        'parado enquanto o seu dinheiro envelhece parado junto. Catálise sem tese é correr ' +
        'atrás de barulho: quando o evento passa, não sobra nada segurando o preço. A caixa ' +
        'verde no fim da figura é o que muda quando as duas existem ao mesmo tempo.',
      'Escrever não é escrever bonito, e não é relatório. São duas linhas no bloco de notas do ' +
        'celular, desde que a segunda tenha um evento e um dia. Se você não consegue escrever a ' +
        'segunda frase, isso já é a resposta: ainda não existe o "por que agora".',
    ],

    exemplo: {
      titulo: 'As mesmas duas frases, no dia em que o preço cai',
      passos: [
        'Antes de entrar você escreveu duas linhas. Tese: narrativa X em crescimento, com ' +
          'comunidade ativa há semanas. Catálise: evento do projeto anunciado para a próxima ' +
          'semana, com data marcada.',
        'Escreveu também o prazo: 7 dias. Passado o prazo sem a catálise, a tese venceu — como ' +
          'um pão vence, sem precisar de nenhuma notícia ruim.',
        'Dias depois o preço cai e o grupo diz que é manipulação. Nenhuma das suas duas frases ' +
          'fala de preço, então a queda, sozinha, não respondeu nada.',
        'No sétimo dia o evento acontece e o preço não reage. Aí sim: a catálise chegou e os ' +
          'compradores novos não vieram atrás dela. A pergunta foi respondida, e a resposta foi ' +
          'não.',
        'Repare no que você não precisou decidir no susto. A decisão foi tomada no dia em que ' +
          'você escreveu as frases, com a cabeça fria.',
      ],
    },

    paragrafosFinais: [
      'As duas frases são o começo da ficha de tese, no card seguinte: lá elas ganham mais três ' +
        'campos — prazo, invalidação e alvos de realização. E são também o que o simulador, no ' +
        'fim do módulo, mede em cada escolha: não se o preço subiu, mas se a decisão seguiu o ' +
        'que estava escrito.',
    ],

    detalhe: {
      titulo: 'o que as duas frases fazem, e o que elas não fazem',
      paragrafos: [
        'Escrever as duas frases não aumenta a sua chance de acertar o próximo token. Não é ' +
          'isso que elas fazem. Elas fazem duas coisas mais modestas e mais úteis: dão um ' +
          'critério de saída que não depende do seu humor, e deixam um registro para você reler ' +
          'depois — o único jeito de descobrir se os seus erros se repetem.',
        'Uma tese boa não é uma tese otimista. É uma tese que pode ser respondida com não. Se ' +
          'você não consegue imaginar nenhum resultado que faria você admitir que estava ' +
          'errado, o que você escreveu não é tese: é torcida com vocabulário técnico.',
        'Nada aqui é recomendação de compra ou venda. Este app não escreve a sua regra e não ' +
          'diz quando entrar nem quando sair: ele mostra o formato da decisão e devolve a ' +
          'caneta para você.',
      ],
    },
  },
```

---

## teseVsCatalise.fichaDeTese

ANTES: `introducao` com 149 caracteres, logo abaixo dos cinco cartões (a explicação de cada campo não existe em texto; só a pergunta dentro do cartão). O resto do card é `planoDaPosicao`, mais abaixo.

```js
    fichaDeTese: {
      titulo: 'Ficha de tese: cinco campos para preencher antes de clicar em comprar',
      introducao:
        'Copie estes cinco campos para o seu caderno de operações (o "caderno de trades", se ' +
        'você já ouviu o termo em inglês) e preencha na ordem, antes de cada entrada. Leva dois ' +
        'minutos. O valor não está no papel: está em ter respondido "o que me faria admitir que ' +
        'errei?" num momento em que responder ainda não custava nada.',
      // (os 5 campos são o visual do card e ficam como estão)
    },
```

---

## teseVsCatalise.tabelaDosExemplos

ANTES: só `emUmaFrase`, 88 caracteres, e a tabela de três linhas. Nenhum parágrafo — é o card mais curto do módulo.

```js
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

      paragrafos: [
        'Invalidar uma tese é conseguir dizer, antes de entrar, qual resultado faria você ' +
          'admitir que estava errado. Parece pessimismo. É o contrário: é o que permite ficar ' +
          'calmo na posição enquanto esse resultado não chega, porque você sabe exatamente o ' +
          'que está esperando.',
        'Uma tese que não pode ser invalidada nunca termina. Ela se adapta a qualquer notícia: ' +
          'se sobe, estava certa; se cai, "é só o mercado"; se fica parada, "ainda é cedo". Uma ' +
          'tese assim não erra nunca — e por isso também não ensina nada e nunca manda você ' +
          'sair. É confortável de escrever e cara de manter.',
        'A tabela acima tem quatro colunas: o exemplo, a tese, a catálise e o veredito, que ' +
          'responde "dá para invalidar?". Leia da direita para a esquerda: primeiro o veredito, ' +
          'depois volte para ver o que na tese e na catálise produziu aquele veredito. No ' +
          'celular a tabela rola na horizontal.',
        'Compare as três linhas e repare que o problema das duas primeiras não é estilo. Na ' +
          'primeira, o motivo da compra é o próprio preço — não há evento nenhum, e se cair a ' +
          'única regra disponível é a esperança. Na segunda existe uma tese razoável, mas a ' +
          'catálise é "uma hora isso explode": "uma hora" não é prazo e "explode" não é evento. ' +
          'Sem data e sem gatilho, nunca chega a hora de sair. A terceira linha tem as duas ' +
          'coisas — checagens técnicas em ordem e um evento anunciado para a próxima semana, ' +
          'com data marcada —, e por isso dá para verificar, dá para invalidar e dá para sair.',
        'O erro que esta tabela evita é o mais comum de todos: trocar a tese pelo gráfico. ' +
          '"Está subindo forte" descreve o passado e não contém nenhum evento futuro. Quem ' +
          'compra por isso fica sem resposta no primeiro dia ruim, porque nunca escreveu qual ' +
          'seria o dia da verdade.',
      ],

      paragrafosFinais: [
        'Um teste rápido, antes de entrar: leia a sua catálise em voz alta e procure a data. Se ' +
          'não houver data, nem que seja aproximada, você ainda não tem catálise — tem ' +
          'expectativa.',
      ],

      detalhe: {
        titulo: 'o que o prazo decide, e o que ele não decide',
        paragrafos: [
          'Prazo não é promessa. Ninguém consegue prometer que um evento acontece em sete dias, ' +
            'e não é isso que o campo faz. Ele marca o dia de reabrir a ficha e reler o que ' +
            'você escreveu, quando a memória do momento da compra já passou.',
          'Prazo vencido também não decide nada sozinho. Ele só obriga a uma de duas coisas: ' +
            'escrever a tese e a catálise de novo, com a data de hoje e um prazo novo, ou ' +
            'reconhecer que o motivo original acabou. As duas saídas são legítimas; o que não ' +
            'existe é a terceira, que é continuar sem reescrever nada.',
        ],
      },
    },
```

---

## teseVsCatalise.tiposDeCatalise

ANTES: `emUmaFrase` com 101 caracteres e o mapa de cinco ramos. Nenhum parágrafo; a explicação inteira está dentro do visual.

```js
    tiposDeCatalise: {
      titulo: 'O mapa das catálises — e o que costuma dar errado em cada uma',
      emUmaFrase:
        'Toda catálise tem um lado que trabalha contra você. Saber qual é muda o tamanho e o ' +
        'prazo da posição.',
      // (centro, rotuloDoAlerta, rotuloDaRolagem, aberturaDaDescricao e itens: visual, inalterados)

      paragrafos: [
        'Catálise não é uma coisa só. O mapa acima parte de um centro — "por que agora?" — e ' +
          'abre nas cinco que mais aparecem: listagem em corretora, graduação para a DEX, ' +
          'atenção de figura pública, narrativa em crescimento e evento do projeto com data ' +
          'marcada. DEX é a corretora descentralizada: o lugar onde a troca acontece direto da ' +
          'sua carteira, sem uma empresa guardando o seu dinheiro no meio do caminho.',
        'Cada ramo traz a descrição e, embaixo dela, uma caixa âmbar com "O que dá errado:". ' +
          'Essa caixa é a parte útil do mapa. Toda catálise tem um lado que trabalha contra ' +
          'você, e esse lado quase sempre é a mesma coisa: o evento que traz compradores novos ' +
          'também é o evento que dá saída para quem entrou antes de você.',
        'Saber qual catálise você tem na mão muda duas decisões práticas, antes mesmo de ' +
          'qualquer número. A primeira é o prazo que você escreve na ficha: um evento com data ' +
          'marcada tem prazo óbvio; uma narrativa em crescimento é a catálise mais difícil de ' +
          'datar, e o mapa avisa que entrar cedo demais é ficar segurando e entrar tarde demais ' +
          'é comprar o topo. A segunda é o tamanho: a atenção de figura pública costuma ser ' +
          'catálise curta e vem junto com risco alto de contrato impostor — confirmar o ' +
          'endereço oficial na fonte vem antes de qualquer outra coisa.',
        'A graduação para a DEX é a que tem números no mapa, e vale entender o que eles são. O ' +
          'token começa numa bonding curve, a curva de preço do lançamento, em que o preço sobe ' +
          'conforme as pessoas compram. Quando arrecada o suficiente, ele "gradua": sai da ' +
          'curva e ganha um pool com liquidez mais profunda. No Pump.fun isso acontece com ' +
          'cerca de 85 SOL arrecadados (dados de set/2025). Em dólar não há limiar fixo: numa ' +
          'amostra de ago/2026, 80% das graduações ficaram entre US$ 11 mil e US$ 101 mil.',
        'O erro que o mapa evita é tratar toda catálise como se fosse a mesma coisa e comprar o ' +
          'barulho sem perguntar quem está do outro lado do barulho. Na listagem, a expressão ' +
          'que descreve isso é conhecida em inglês: buy the rumor, sell the news — comprar no ' +
          'rumor, vender no fato. Quem comprou pelo anúncio costuma vender no dia em que a ' +
          'listagem acontece, que é justamente o dia em que o iniciante compra.',
      ],

      exemplo: {
        titulo: 'A mesma listagem, lida por duas pessoas',
        passos: [
          'Sai o anúncio: a listagem numa corretora grande acontece na sexta-feira.',
          'A primeira pessoa entra pelo anúncio e escreve na ficha que a catálise é a ' +
            'sexta-feira. O prazo dela tem data e o dia da verdade já está marcado.',
          'A segunda entra na sexta, quando a listagem já aconteceu, porque "agora ficou ' +
            'oficial". A catálise dela já passou: ela comprou o fim do evento, não o começo.',
          'O mapa avisa exatamente isso na caixa âmbar: o anúncio muitas vezes mexe mais no ' +
            'preço do que a listagem em si.',
          'Nenhuma das duas leituras é uma regra de compra, e este app não escreve a sua. A ' +
            'diferença entre elas é só uma: a primeira sabe qual dia responde a pergunta dela; ' +
            'a segunda não marcou dia nenhum.',
        ],
      },

      paragrafosFinais: [
        'Repare que o mapa não ordena as catálises da melhor para a pior. Ele ordena pelo que ' +
          'você consegue fazer com cada uma. A de data marcada é a mais fácil de estudar, ' +
          'porque existe um dia em que a resposta chega — e por isso mesmo vale o alerta dela: ' +
          'cuidado com datas que vão sendo adiadas, porque adiamento é sinal, não detalhe.',
      ],

      detalhe: {
        titulo: 'as três ressalvas dos números da graduação',
        paragrafos: [
          'Os números da graduação merecem três ressalvas. Primeira: o limiar é contado em SOL, ' +
            'a moeda da rede Solana, e não em dólar — por isso a mesma regra, convertida, vira ' +
            'uma faixa larga em vez de um valor. Segunda: a faixa de US$ 11 mil a US$ 101 mil ' +
            'cobre 80% das graduações daquela amostra de ago/2026, ou seja, a maior parte, mas ' +
            'não todas. Terceira: é uma amostra de uma data, não uma promessa sobre a próxima ' +
            'graduação que você for ver.',
          'A graduação é a catálise com o aviso mais duro do mapa, e é bom lê-lo devagar: é ' +
            'também o momento em que quem comprou na curva finalmente consegue vender volume. A ' +
            'liquidez mais profunda que atrai você é a mesma que dá saída para eles.',
        ],
      },
    },
```

---

## takeProfit (título e parágrafos do topo)

ANTES: 725 caracteres num array de referência, fora da tela desde o redesenho. DEPOIS: inalterado — não reescrevi nada aqui. O conteúdo desses seis parágrafos foi absorvido, ampliado, pelo card `takeProfit.escada` logo abaixo. Ver APONTAMENTOS: o array antigo pode ser apagado depois que a escada entrar, para não haver duas versões do mesmo texto no arquivo.

---

## takeProfit.escada

ANTES: `emUmaFrase` + legenda do visual + um parágrafo de 254 caracteres — 589 no total, sendo 254 de explicação de verdade.

pergunta: REMOVER (hoje 'q2')

```js
    escada: {
      titulo: 'A escada de realização, faixa a faixa',
      emUmaFrase:
        'O lucro que você não realizou não é seu. Nenhuma faixa depende de prever o topo — a ' +
        'escada existe justamente porque ninguém acerta o topo de forma consistente.',
      // (legenda, selo e faixas: visual, inalterados)

      // Substitui o campo `paragrafo` (singular) e absorve os parágrafos de referência
      // que estavam em takeProfit.paragrafos.
      paragrafos: [
        'Realizar é vender uma parte da posição e transformar o número da tela em dinheiro que ' +
          'já está na sua carteira. Em inglês o gesto se chama take profit, literalmente "pegar ' +
          'o lucro" — é o nome desta aba. Enquanto a posição está aberta, o lucro não é seu: é ' +
          'uma promessa que depende de existir comprador na hora em que você quiser sair.',
        'Em memecoin essa promessa some rápido. Liquidez é o dinheiro parado do outro lado, ' +
          'pronto para comprar de você; a liquidez que sustenta o preço na subida é a mesma que ' +
          'desaparece na descida, porque são as mesmas pessoas. O preço que você vê na tela é ' +
          'só o preço do último negócio feito, não uma garantia de que existe alguém disposto a ' +
          'repetir aquele preço com o seu tamanho.',
        'Realização parcial resolve isso sem exigir que você acerte o topo. Você vende uma ' +
          'faixa e recupera o valor investido; o que sobra passa a correr por conta do lucro. A ' +
          'posição continua na mesa, mas o medo sai dela — e é o medo que piora as decisões.',
        'Na figura acima os três degraus aparecem de baixo para cima, cada um com o que se faz ' +
          'e, embaixo, o porquê. O selo "exemplo didático" não é formalidade jurídica: os ' +
          'degraus mostram o formato, não onde vender. Onde ficam os seus alvos é decisão sua, ' +
          'e este app não escreve essa regra por você.',
        'Falta o ponto que quase ninguém aceita de primeira: o alvo de realização se define ' +
          'antes de entrar, junto com a tese. Definido depois, com o gráfico piscando, ele já ' +
          'nasce contaminado pela euforia ou pelo medo do momento — e aí não é mais um alvo, é ' +
          'uma reação.',
      ],

      exemplo: {
        titulo: 'O degrau que muda o pior caso',
        passos: [
          'Você entrou com um valor que pode perder inteiro, e escreveu os três degraus antes ' +
            'de entrar.',
          'O preço sobe e o primeiro alvo é atingido. Você vende a fração que devolve ' +
            'exatamente o valor investido.',
          'Nada de mágico aconteceu no preço. O que mudou foi o pior caso: a partir daqui a ' +
            'posição não pode mais terminar em prejuízo. É a mudança que mais reduz o peso ' +
            'emocional da posição.',
          'O preço sobe de novo e o segundo alvo é atingido. Você vende outra faixa — isso já é ' +
            'lucro que existe fora da tela, sem depender de o movimento continuar.',
          'O que sobra corre com a regra escrita no terceiro degrau. Sem essa regra, é assim ' +
            'que uma posição que multiplicou por cinco termina valendo nada.',
        ],
      },

      paragrafosFinais: [
        'A escada não é um número, é um formato: faixas definidas antes, cada uma com um ' +
          'motivo, e a última com regra de saída escrita. As duas calculadoras a seguir existem ' +
          'para você mexer nesse formato e ver o que ele faz. A primeira mostra como a posição ' +
          'se reparte entre os degraus; a segunda mostra por que o degrau de baixo, a ' +
          'invalidação, importa tanto quanto os de cima.',
      ],

      detalhe: {
        titulo: 'por que a primeira faixa não é escolha sua',
        paragrafos: [
          'Por que a primeira faixa não é uma escolha: ela é definida pela conta. Se o objetivo ' +
            'do primeiro degrau é devolver exatamente o valor investido, a fração a vender sai ' +
            'do alvo escolhido, e não do seu gosto. Quanto mais alto o primeiro alvo, menor a ' +
            'fração necessária — é a única parte da escada que não é opinião.',
          'Realizar parcial não prevê topo nenhum, e é exatamente por isso que funciona. Quem ' +
            'espera o topo precisa acertar um instante; quem realiza em faixas precisa só ter ' +
            'escrito as faixas. A escada troca a promessa de acertar pelo hábito de decidir ' +
            'antes.',
          'Realizar também não muda a regra do imposto: cada venda é apurada por si. O que vem ' +
            'depois de realizar está no card do erro de segurar, recolhido em "Para ir mais ' +
            'fundo", e é informativo — não é aconselhamento tributário.',
        ],
      },
    },
```

---

## takeProfit.erroDeSegurar

ANTES: `emUmaFrase` + legenda do fluxograma + um `paragrafoFinal` de 139 caracteres — 467 no total. Os 906 caracteres do array `paragrafos` estão fora da tela desde o redesenho.

pergunta: REMOVER (hoje 'q3')

```js
    erroDeSegurar: {
      titulo: 'O erro de segurar demais (e por que ele parece racional na hora)',
      emUmaFrase:
        'O dinheiro já foi gasto de qualquer jeito. A única pergunta que importa: você compraria ' +
        'este token, neste preço, hoje?',
      // (fluxograma: visual, inalterado)

      // Substitui o array `paragrafos` de referência, que a tela não mostrava.
      paragrafos: [
        'Degradação é a última das 4 fases do Módulo 2. Nela a atenção já migrou para outro ' +
          'token: o grupo esvazia, ninguém mais posta, e não chegam compradores novos. O preço ' +
          'não cai por acaso nem por maldade de ninguém — cai porque ninguém está mais olhando.',
        'Cada tentativa de venda encontra um livro de ofertas mais fino que o do dia anterior. ' +
          'Livro de ofertas é a fila de quem está disposto a comprar e a que preço; "mais fino" ' +
          'quer dizer menos gente nessa fila, com valores menores. Vender ali empurra o preço ' +
          'para baixo sozinho, e amanhã a fila estará ainda menor.',
        'É exatamente aí que aparece o custo afundado — em inglês, sunk cost: o dinheiro que já ' +
          'saiu e não volta, faça o que você fizer. A cabeça trata vender como "assumir o ' +
          'prejuízo", como se não vender mantivesse a operação viva. Mas o prejuízo não acontece ' +
          'no clique de vender; ele já aconteceu. O clique só reconhece o que existe.',
        'Por isso o fluxograma acima tem uma pergunta só, e ela não menciona o seu preço de ' +
          'entrada: você compraria este token, neste preço, hoje? Da pergunta saem dois ramos. ' +
          'No "sim, compraria", a posição continua pela tese — não pelo preço médio — e a tese ' +
          'precisa ser reescrita com a data de hoje. No "não compraria", a posição já está ' +
          'encerrada e só falta executar.',
        'O erro que essa pergunta evita tem várias fantasias, e a mais cara é comprar mais para ' +
          '"melhorar o preço médio". Isso não melhora nada: aumenta a posição num token que ' +
          'você acabou de admitir que não compraria hoje. A calculadora logo acima mostra o ' +
          'preço da demora em números — a partir de uma perda de 67%, o ganho necessário só ' +
          'para empatar já passa de 200%.',
      ],

      exemplo: {
        titulo: 'A pergunta, aplicada',
        passos: [
          'A posição está em prejuízo e o token entrou na Degradação: o grupo esvaziou, o ' +
            'volume sumiu, faz dias que não aparece comprador novo.',
          'Pergunta única: eu compraria este token, neste preço, hoje?',
          'Se a resposta é sim, a posição continua pela tese. Então reescreva a tese e a ' +
            'catálise com a data de hoje, e um prazo novo — se não der para reescrever, a ' +
            'resposta era não.',
          'Se a resposta é não, a posição já está encerrada. Só falta executar. "Assumir o ' +
            'prejuízo" não é o custo de vender: é o custo que já aconteceu.',
          'Repare que a pergunta não pergunta por quanto você comprou. O mercado também não ' +
            'sabe o seu preço de entrada, e não é por ele que o preço vai voltar.',
        ],
      },

      // Absorve o antigo campo `paragrafoFinal`.
      paragrafosFinais: [
        'Segurar por tempo demais transforma uma perda pequena e planejada num rombo que leva ' +
          'meses para recuperar. E esse erro, diferente de quase tudo neste mercado, não depende ' +
          'do token, da chain nem da sorte. Depende só de não ter escrito a regra antes.',
        'E se o caminho tiver sido o outro, e você tiver realizado lucro, existe uma parte chata ' +
          'que vem depois: o que o Brasil espera de quem vendeu. Ela está logo abaixo, recolhida ' +
          'em "Para ir mais fundo", e é informativa.',
      ],
      // Sem campo `detalhe` aqui: quem ocupa o "Para ir mais fundo" deste card é a
      // tributação, abaixo. Ver APONTAMENTOS.
    },
```

---

## takeProfit.tributacao

ANTES: aviso + cinco pontos, 1.147 caracteres — é o bloco mais longo do módulo, mas começa direto nos cinco pontos, sem nada que explique o que é ganho de capital nem por que o limite é sobre as vendas.

```js
    tributacao: {
      titulo: 'Realizou lucro no Brasil? O que vem depois (informativo)',
      aviso:
        'Esta seção é informativa e NÃO é aconselhamento tributário. Regras mudam com ' +
        'frequência e há divergência entre fontes — confirme tudo com um contador ' +
        'especializado antes de declarar qualquer coisa.',

      paragrafos: [
        'Realizar lucro tem uma consequência fora da tela. No Brasil, vender cripto com ganho ' +
          'pode gerar imposto, e apurar e pagar é responsabilidade sua, não da corretora. Ganho ' +
          'de capital, aqui, é a diferença entre o que você recebeu na venda e o que tinha ' +
          'pagado na compra daquilo que vendeu.',
        'O ponto que mais confunde quem está começando é o que conta para o limite de isenção: ' +
          'é o total vendido no mês, somando todas as vendas, e não o lucro. Dá para ter lucro ' +
          'pequeno e ainda assim passar do limite, se você girou muito. Por isso o hábito de ' +
          'anotar cada operação vale mais do que decorar alíquota.',
        'O que vem abaixo é o estado da regra segundo as fontes que este módulo usou, com a ' +
          'data de cada uma. Regra tributária muda, e muda por decisão política — o primeiro ' +
          'ponto da lista é justamente um caso de mudança anunciada que acabou não valendo.',
      ],

      pontos: [
        {
          rotulo: 'MP 1.303/2025 — não valeu',
          texto:
            'A medida provisória que propunha alíquota única de 17,5% e o fim da isenção ' +
            'mensal foi rejeitada pela Câmara dos Deputados em outubro de 2025 e perdeu a ' +
            'validade. Ou seja: essa mudança não entrou em vigor. Se você leu sobre ela em ' +
            'algum texto antigo, era uma proposta, e a proposta caiu.',
        },
        {
          rotulo: 'Isenção de R$ 35 mil no mês',
          texto:
            'Pela regra que segue vigente para o IRPF 2026, ganhos de capital com cripto em ' +
            'corretoras nacionais são isentos se a soma das VENDAS no mês não passar de ' +
            'R$ 35 mil. Repare: o limite é sobre o total vendido, não sobre o lucro. São todas ' +
            'as vendas do mês somadas, não cada venda olhada de forma separada.',
        },
        {
          rotulo: 'Acima do limite',
          texto:
            'Passando de R$ 35 mil em vendas no mês, aplicam-se alíquotas progressivas a ' +
            'partir de 15% (até 22,5%), apuradas no programa GCAP, com DARF (código 4600) ' +
            'até o último dia útil do mês seguinte. GCAP é o programa da Receita para ganho de ' +
            'capital e DARF é a guia com que o imposto é pago; o código identifica que tipo de ' +
            'imposto está sendo recolhido.',
        },
        {
          rotulo: 'Operações no exterior',
          texto:
            'Operações fora do país seguem a Lei 14.754/2023, com regras próprias — outro ' +
            'motivo para ter alguém especializado revisando, porque quem opera em corretora ' +
            'estrangeira ou direto na carteira cai em texto legal diferente do de cima.',
        },
        {
          rotulo: 'Saque em reais',
          texto:
            'Na prática, sair para real acontece via corretora nacional com Pix (exige KYC/CPF) ' +
            'ou via P2P. KYC é a verificação de identidade que a corretora faz antes de liberar ' +
            'saque; P2P é a negociação de pessoa para pessoa, sem a corretora no meio. No P2P, ' +
            'o risco é a contraparte: nunca libere a cripto antes de confirmar que o Pix caiu ' +
            'de fato na sua conta.',
        },
      ],

      paragrafosFinais: [
        'Duas atitudes práticas que não dependem de nenhuma regra específica: guardar o registro ' +
          'de cada compra e de cada venda, com data, valor e taxa, desde a primeira operação; e, ' +
          'se em algum mês você passar do limite, procurar um contador antes de declarar, não ' +
          'depois. Esta seção é informativa e não substitui essa conversa.',
      ],
    },
```

---

## checagens

ANTES: `emUmaFrase` + o nó final do fluxograma + um `paragrafoFinal` de 142 caracteres — 404 no total, para seis checagens cheias de jargão em inglês que nunca é traduzido.

pergunta: REMOVER (hoje 'q4')

```js
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
    // (itens: visual, inalterados)

    paragrafos: [
      'As seis perguntas acima são sobre o contrato do token e sobre quem controla o quê. Não ' +
        'são sobre o projeto, a arte, o grupo nem a narrativa. São a peneira do Módulo 3 ' +
        'aplicada ao momento da decisão, e vêm antes da tese por um motivo simples: nenhuma ' +
        'tese sobrevive a um contrato desenhado para prender você lá dentro.',
      'No fluxograma, cada pergunta tem duas saídas: "Resposta boa: siga", embaixo, e "Alerta: ' +
        'não entra", à direita. Repare que todas as saídas de alerta vão para o mesmo lugar. ' +
        'Não é uma nota de zero a dez em que o bom compensa o ruim: basta um "não" para derrubar ' +
        'a operação inteira, e é por isso que a peneira é rápida.',
      'As seis perguntas usam palavras que o mercado só fala em inglês. O quadro abaixo traduz ' +
        'cada uma antes de você ler os alertas, para você não precisar adivinhar pelo contexto.',
    ],

    quadro: [
      {
        rotulo: 'Pool e LP',
        texto:
          'Pool é o par de moedas depositado numa corretora descentralizada para que as trocas ' +
          'possam acontecer: é o dinheiro que fica do outro lado quando você compra ou vende. ' +
          'LP vem de liquidity pool e, na prática, são os tokens que comprovam quem depositou. ' +
          'LP travada quer dizer que esse comprovante está bloqueado por um tempo e ninguém ' +
          'consegue sacar o pool; LP destravada quer dizer que dá para sacar a qualquer momento.',
      },
      {
        rotulo: 'Authority (autoridade)',
        texto:
          'É uma permissão gravada no próprio token, que continua valendo depois que ele nasce. ' +
          'Mint authority é a permissão de criar unidades novas. Freeze authority é a permissão ' +
          'de congelar contas, ou seja, impedir que alguém movimente o que tem. "Revogada" quer ' +
          'dizer que a permissão foi apagada e nem o criador pode mais usá-la.',
        destaque: true,
      },
      {
        rotulo: 'Supply, holders e concentração',
        texto:
          'Supply é a quantidade total de unidades do token que existe. Holders são as carteiras ' +
          'que detêm essas unidades. Concentração é quanto do supply está nas mãos das maiores ' +
          'carteiras — e "top 10" é a lista das dez maiores, que os exploradores de rede mostram ' +
          'prontinha.',
      },
      {
        rotulo: 'Bundle',
        texto:
          'Um pacote de várias compras enviadas juntas para caírem no mesmo bloco, isto é, no ' +
          'mesmo instante da rede. Serve para garantir que quem enviou compre antes de todo ' +
          'mundo, no preço mais baixo que vai existir naquele token.',
      },
      {
        rotulo: 'Market cap e honeypot',
        texto:
          'Market cap é o valor de mercado: o preço de uma unidade multiplicado pelo supply. É ' +
          'o número grande que impressiona e que não diz nada sobre quanto dinheiro existe do ' +
          'outro lado para comprar de você. Honeypot, "pote de mel", é o token em que dá para ' +
          'entrar e não dá para sair.',
      },
    ],

    exemplo: {
      titulo: 'Por que a primeira pergunta é a primeira',
      passos: [
        'O criador é dono dos tokens de LP, o comprovante do pool.',
        'Ele devolve esse comprovante ao pool e retira a liquidez inteira.',
        'Some o dinheiro que estava do outro lado das ofertas, e o preço vira pó no mesmo ' +
          'bloco. Não em minutos: no mesmo bloco. Isso é o hard rug, a puxada de tapete na ' +
          'forma mais rápida que existe.',
        'Ninguém reage, porque não há tempo entre uma coisa e a outra. Por isso esta pergunta ' +
          'vem antes de qualquer análise de narrativa.',
        'No pump.fun, depois da graduação, a pool é do protocolo e isso não acontece. O golpe ' +
          'que sobra lá é o criador vender a própria compra (Módulo 6).',
      ],
    },

    // Absorve o antigo campo `paragrafoFinal`.
    paragrafosFinais: [
      'Tese e catálise só importam se o contrato por trás resistir a uma checagem. É por isso ' +
        'que estas seis perguntas vêm primeiro, mesmo quando a narrativa está ótima e o grupo ' +
        'está eufórico: a peneira não melhora com entusiasmo.',
      'O erro que ela evita é começar pelo fim — se apaixonar pela história, escrever uma tese ' +
        'bonita e só então abrir o RugCheck, quando já é tarde para olhar com isenção. Passar ' +
        'nas seis não aprova o token; só quer dizer que ele não mostrou os problemas que dá para ' +
        'ver.',
    ],

    detalhe: {
      titulo: 'o estudo da liquidez travada e a ferramenta de cada pergunta',
      paragrafos: [
        'Trava não aprova token, e o número que mostra isso é desconfortável. No estudo citado ' +
          'no primeiro alerta, 97,3% dos tokens com liquidez travada eram maliciosos, contra ' +
          '97,7% no geral (Mazorra et al., 2022). Ou seja: entre os travados a proporção é ' +
          'praticamente a mesma do conjunto todo. A trava tira uma forma de golpe da mesa e não ' +
          'diz nada sobre as outras.',
        'Nota técnica verificada: na Solana, DEXs como a Raydium exigem freeze authority ' +
          'revogada para criar o pool. Isso quer dizer que, num token que já tem pool nessas ' +
          'DEXs, essa checagem específica costuma vir respondida — o que não dispensa conferir ' +
          'com os próprios olhos.',
        'As ferramentas de cada pergunta estão no campo "onde", dentro de cada checagem. ' +
          'RugCheck para travas e autoridades; Solscan e BscScan, que são exploradores de rede ' +
          '(sites onde dá para ver qualquer transação já feita), para a lista de holders e as ' +
          'primeiras transações; Bubblemaps para enxergar carteiras ligadas entre si; ' +
          'DexScreener para liquidez do par, volume e profundidade.',
      ],
    },
  },
```

> Proposta de divisão, para o dono decidir: com o quadro de vocabulário, este card fica longo — visual de seis checagens, cinco verbetes, exemplo e detalhe. Sugiro quebrar em duas seções na aba: **"O vocabulário das seis checagens"** (emUmaFrase + os três primeiros parágrafos + o `quadro`) e **"As seis checagens que vêm antes da tese"** (o fluxograma + exemplo + paragrafosFinais + detalhe). Se preferir manter um card só, o bloco acima funciona como está.

---

## molduraDoSimulador

ANTES: `emUmaFrase` + duas legendas, 284 caracteres. Nenhum parágrafo explica como ler o resumo de disciplina.

```js
  molduraDoSimulador: {
    titulo: 'Simulador de decisão',
    emUmaFrase:
      'Doze situações inventadas para treinar a única coisa que dá para treinar antes de ter ' +
      'dinheiro na mesa: decidir com a regra escrita na frente.',
    rotuloDoAviso: 'Cenários fictícios:',
    aviso:
      'os números que aparecem neles são inventados de propósito para o exercício, e a ordem é ' +
      'sorteada a cada rodada. Nenhum deles descreve um token real, e nada aqui é recomendação ' +
      'de compra ou venda.',
    // (passos e partes: visual, inalterados)

    paragrafos: [
      'O simulador apresenta doze situações. Em cada uma você escolhe entre quatro ações — e ' +
        'são sempre as mesmas quatro: o que muda é a situação. Não existe preço para adivinhar ' +
        'e nenhuma situação descreve um token real.',
      'O que está sendo medido é processo, não resultado. Essa distinção é a mais difícil de ' +
        'engolir no começo, porque no mercado real os dois se confundem: uma decisão ruim pode ' +
        'dar certo por sorte, e uma decisão boa pode dar errado. Só o processo está sob o seu ' +
        'controle, e só ele dá para treinar com números inventados.',
      'Acima, quatro passos ligados por setas mostram o caminho de cada rodada: a situação, as ' +
        'quatro escolhas, o feedback e o resumo de disciplina no fim. O feedback vem em três ' +
        'partes — a escolha (certa, ou "não foi essa", sempre com explicação), o risco daquela ' +
        'decisão e o próximo passo técnico, que liga a decisão de volta à ferramenta do Módulo ' +
        '3. A ordem dos cenários é sorteada a cada rodada, de propósito, para você não decorar ' +
        'a sequência.',
      'No fim, o resumo de disciplina traz quatro barras na mesma escala, sobre os doze ' +
        'cenários. "Não se aplica" não é erro de mérito: é ter escolhido uma ação impossível ' +
        'naquela situação — por exemplo, "realizar parcial" num cenário em que você não tem ' +
        'posição nenhuma no token. Vale 0 e é contada à parte, justamente para não se misturar ' +
        'com decisão ruim.',
      'O erro que este formato evita é ler o resultado como nota de acerto de mercado. O ' +
        'simulador não avalia se você ganharia dinheiro, e sim se a decisão seguiu a regra ' +
        'escrita. É a mesma medida das duas frases do começo do módulo, agora aplicada doze ' +
        'vezes seguidas.',
    ],

    paragrafosFinais: [
      'O histórico fica salvo no seu navegador, neste computador, e não sai daqui. Vale refazer ' +
        'depois de algumas semanas: o interessante não é o primeiro resumo, é a diferença entre ' +
        'o primeiro e o segundo.',
    ],

    detalhe: {
      titulo: 'por que as quatro opções e os números são fixos',
      paragrafos: [
        'As quatro opções são fixas de propósito. Se cada cenário tivesse opções feitas sob ' +
          'medida, a resposta certa ficaria óbvia pelo enunciado, e você estaria treinando ' +
          'leitura de prova, não decisão. Com as mesmas quatro sempre, a pergunta vira: qual ' +
          'delas cabe nesta situação?',
        'Os números dos cenários são inventados pelo mesmo motivo. Número real convida a ' +
          'reconhecer o token, lembrar o que aconteceu depois e responder pela memória. Número ' +
          'inventado obriga a responder pela regra.',
      ],
    },
  },
```

---

## planoDaPosicao

ANTES: `emUmaFrase` + legenda + a linha do restante, 348 caracteres — e a ficha de tese inteira dentro do mesmo card, sem um parágrafo que explique os campos.

```js
  planoDaPosicao: {
    titulo: 'A anatomia de um plano',
    emUmaFrase:
      'Quatro níveis escritos antes de entrar, e nenhuma linha de preço: o que está desenhado ' +
      'aqui é o que você decide, não o que o mercado faz.',
    // (legenda, niveis e restante: visual, inalterados)

    paragrafos: [
      'Um plano de posição é a lista dos níveis que você decide antes de entrar. São quatro, e ' +
        'estão na figura acima de cima para baixo: o 2º alvo (lucro realizado), o 1º alvo ' +
        '(recupera o investido), a Entrada (onde a tese e a catálise já estão escritas) e a ' +
        'Invalidação, embaixo, em vermelho — o ponto em que você admite que errou. Embaixo de ' +
        'tudo, a linha do restante: o que fica na mesa corre com regra escrita.',
      'Não há gráfico de preço nem eixo de tempo aqui, e isso é de propósito. O plano não ' +
        'depende de prever o caminho até os níveis: depende só de ter os níveis. Um gráfico ' +
        'convidaria você a imaginar o percurso, que é exatamente a parte que ninguém sabe, e a ' +
        'confundir o desenho bonito com probabilidade.',
      'Logo abaixo dos níveis vem a ficha de tese: os mesmos níveis em forma de pergunta, cinco ' +
        'campos para preencher. Tese e catálise você já conhece do primeiro card. Prazo é até ' +
        'quando o evento deve acontecer. Invalidação é o que faria você admitir que estava ' +
        'errado. Alvos de realização são os pontos em que você vende parte, e quanto.',
      'Vale explicar uma sigla que aparece no exemplo da invalidação: LP vem de liquidity pool, ' +
        'o pool de liquidez, o par de moedas depositado para que as trocas aconteçam na ' +
        'corretora descentralizada. LP destravada quer dizer que quem depositou pode tirar esse ' +
        'dinheiro de lá a qualquer momento — motivo de sobra para a tese acabar na hora. A aba ' +
        '"Antes de entrar" abre esse ponto em detalhe.',
      'O campo que quase todo mundo pula é a invalidação, e é o único que não dá para ' +
        'improvisar depois. Depois já é tarde: com a posição aberta e o preço caindo, qualquer ' +
        'número que você escrever vai ser escolhido para não doer. Repare também que nenhum ' +
        'nível aqui foi escolhido pelo app. Ele mostra o formato do plano; quem escreve os ' +
        'números é você.',
    ],

    exemplo: {
      titulo: 'Uma ficha preenchida, campo a campo',
      passos: [
        'Tese: narrativa X em crescimento, com comunidade ativa há semanas.',
        'Catálise: graduação para a DEX; campanha anunciada para a semana que vem.',
        'Prazo: 7 dias. Passou o prazo sem a catálise, a tese venceu.',
        'Invalidação: catálise aconteceu e o preço não reagiu; ou LP destravada.',
        'Alvos de realização: recuperar o investido no primeiro alvo; faixas seguintes ' +
          'definidas.',
        'Nada aqui é sugestão: os 7 dias e as faixas são exemplo de formato, para mostrar como ' +
          'um campo preenchido se parece.',
      ],
    },

    paragrafosFinais: [
      'O plano não depende de prever o caminho — depende de ter os níveis decididos por você ' +
        'frio, para serem cumpridos por você sob pressão. É a mesma pessoa nas duas pontas, e ' +
        'só uma delas está pensando direito.',
    ],

    detalhe: {
      titulo: 'por que a ficha tem cinco campos, e não três',
      paragrafos: [
        'Por que a ficha tem cinco campos e não três: tese e catálise sozinhas explicam a ' +
          'entrada, mas não fecham a saída. Prazo, invalidação e alvos são os três campos que ' +
          'transformam uma opinião sobre um token num plano com começo e fim.',
        'Dois minutos é o tempo real de preencher a ficha, e é pouco perto do tempo que se ' +
          'gasta olhando o gráfico depois. Se a ficha estiver difícil de preencher, isso não é ' +
          'problema da ficha: é a operação avisando que ainda não existe motivo para ela.',
      ],
    },
  },
```

---

## calculadoraDeDegraus

ANTES: `emUmaFrase` + a nota curta embaixo dos controles, 184 caracteres — nada explica o que a calculadora faz nem como ler o resultado.

```js
  calculadoraDeDegraus: {
    titulo: 'Mexa nos alvos e veja onde a posição para',
    emUmaFrase:
      'A primeira faixa vende exatamente o que recupera o investido — por isso ela não é um ' +
      'controle, é a definição.',
    // (distanciaMinima, rotuloDaFigura, barras, realizado, piorCaso e controles: inalterados)

    paragrafos: [
      'Esta calculadora não diz onde vender. Ela responde uma coisa só: dados dois alvos e a ' +
        'fração vendida no segundo, como a posição se reparte entre os três degraus da escada — ' +
        'e no que isso transforma o pior caso.',
      'Repare que não existe controle para "quanto vender no primeiro alvo". Não é esquecimento. ' +
        'A primeira faixa é, por definição, a fração que devolve exatamente o valor investido; ' +
        'ela sai da conta, não do seu gosto. Quanto mais alto o primeiro alvo, menor a fração ' +
        'que precisa ser vendida ali.',
      'Na tela, os controles ficam de um lado e, do outro, três barras com o título "Como a ' +
        'posição se reparte": vendido no 1º alvo, vendido no 2º alvo e restante na mesa. As ' +
        'três sempre somam a posição inteira. Embaixo delas há duas caixas. "Realizado ao ' +
        'chegar no 2º alvo" responde em múltiplos do valor investido: é quanto dinheiro saiu da ' +
        'posição e voltou para a sua carteira, comparado com o que entrou. "Pior caso, com o ' +
        'restante a zero" responde outra pergunta: se o que ficou na mesa virar nada, você ' +
        'termina acima ou abaixo do investido? A tela diz qual das duas frases vale.',
      'O erro que esta tela evita é mexer nos controles até achar o desenho mais bonito e ' +
        'chamar aquilo de plano. Os números aqui são estrutura, não recomendação: o selo de ' +
        'exemplo didático da escada vale para a calculadora inteira.',
    ],

    exemplo: {
      titulo: 'Uma passada pelos controles',
      passos: [
        'A tela abre com o primeiro alvo em 2×, o segundo em 4× e 50% do que sobrou vendido no ' +
          'segundo alvo.',
        'Arraste o primeiro alvo para 5×. O segundo é empurrado junto, para 5,5×: a calculadora ' +
          'não deixa o segundo alvo ficar abaixo do primeiro, e a distância mínima é de meio ' +
          'múltiplo.',
        'Veja as três barras mudarem de tamanho enquanto você arrasta. O que sai de uma entra ' +
          'na outra — a posição é sempre a mesma.',
        'Leve o segundo alvo ao mínimo e ao máximo (de 2× a 20×, de meio em meio) e repare no ' +
          'que acontece com a nota do "Restante na mesa", que diz quanto ele vale em relação ao ' +
          'investido naquele alvo.',
        'Agora zere a fração vendida no segundo alvo. Você acabou de descrever a escada sem o ' +
          'degrau do meio: tudo o que sobrou fica na mesa, dependendo só da regra escrita.',
      ],
    },

    paragrafosFinais: [
      'A caixa do pior caso é a que vale olhar mais tempo. Ela é a tradução em número da frase ' +
        'do primeiro degrau: a partir do momento em que o investido voltou, o pior resultado ' +
        'possível deixou de ser prejuízo. Nenhuma previsão foi necessária para isso — só uma ' +
        'venda feita antes.',
    ],

    detalhe: {
      titulo: 'o que a conta supõe, e de onde vêm os limites dos controles',
      paragrafos: [
        'A calculadora supõe uma coisa que o mercado não garante: que existe comprador para a ' +
          'sua fração no preço do alvo. Em memecoin, essa suposição é justamente a que falha ' +
          'primeiro — é o assunto da sexta checagem, "a liquidez aguenta a sua saída?".',
        'O primeiro alvo vai de 1,5× a 10× e o segundo de 2× a 20×, os dois de meio em meio. ' +
          'Esses limites são da tela, para a figura caber e o exercício fazer sentido; não são ' +
          'opinião sobre até onde um token vai.',
      ],
    },
  },
```

---

## calculadoraDeTamanho

ANTES: `emUmaFrase` + legenda + a nota da fórmula, 322 caracteres. A conta aparece sem nenhum exemplo resolvido.

```js
  calculadoraDeTamanho: {
    titulo: 'Quanto da carteira pode ir numa posição',
    emUmaFrase:
      'Quanto mais longe a invalidação, menor a posição — é aritmética, não opinião.',
    // (atalhos, resultado, rotuloDaFigura, legenda, acimaDoCapital e controles: inalterados)

    paragrafos: [
      'Esta calculadora liga duas decisões que são suas e devolve uma terceira. As suas: quanto ' +
        'do capital você aceita perder numa operação, e a que distância da entrada fica o seu ' +
        'ponto de invalidação. A que sai da conta: o tamanho da posição. A fórmula está embaixo ' +
        'dos controles e é uma divisão só — tamanho = risco ÷ invalidação.',
      'Risco aceito não é "quanto vou investir". É quanto do seu capital inteiro some se a ' +
        'invalidação for atingida. Confundir os dois é o erro mais caro desta tela: quem pensa ' +
        '"arrisco 2%" e põe 2% do capital numa memecoin que pode ir a zero está, na verdade, ' +
        'arriscando os 2% inteiros, e não uma fração deles. O controle vai de 0,5% a 10%, de ' +
        'meio em meio, e o resultado aparece com uma casa decimal de propósito: 0,5% é 0,5%, ' +
        'não 1%.',
      'Os dois atalhos põem a invalidação em valores prontos: "pode ir a zero (100%)" e "cai ' +
        'pela metade (50%)". O de 100% fica em destaque quando está valendo, porque em memecoin ' +
        'ir a zero é cenário realista — e é justamente ele que produz a posição menor. À ' +
        'direita, a figura "A posição dentro do capital" e a caixa que fecha a conta: a sua ' +
        'regra implica tanto por cento do capital nesta posição.',
      'O resultado costuma parecer contraintuitivo na primeira vez: quanto mais longe a ' +
        'invalidação, menor a posição. A lógica é simples quando se vê ao contrário — se você ' +
        'aceita cair muito antes de admitir o erro, precisa carregar menos, senão essa queda ' +
        'custa mais do que você tinha combinado consigo mesmo.',
    ],

    exemplo: {
      titulo: 'Um caso extremo, para ver a conta trabalhando',
      passos: [
        'Ponha o risco em 10% e a invalidação em 5%.',
        'A fórmula pediria 200% do capital: dez dividido por cinco.',
        'A tela não permite isso. A posição não passa de 100% do capital, e aparece um aviso: ' +
          'não é sinal para alavancar, é sinal de que a invalidação está apertada demais para o ' +
          'risco escolhido.',
        'Com a posição no teto de 100% do capital, bater a invalidação custa 5% do capital — ' +
          'menos que o risco de 10% que você tinha aceitado.',
        'Agora volte a invalidação para 100%, no atalho "pode ir a zero". A mesma regra de ' +
          'risco produz a menor posição de todas, porque você admitiu que o pior caso é perder ' +
          'tudo o que entrou.',
      ],
    },

    paragrafosFinais: [
      'A conta não diz quanto risco aceitar. Isso é decisão sua e depende da sua vida, não do ' +
        'mercado: do que aquele dinheiro representa para você, de quanto tempo você teria para ' +
        'recompor, de quantas vezes por mês você pretende fazer isso. A calculadora entra ' +
        'depois dessa decisão, nunca antes dela.',
    ],

    detalhe: {
      titulo: 'o que a fórmula supõe, e o que esta tela nunca faz',
      paragrafos: [
        'A fórmula supõe que você consegue sair no ponto de invalidação que escreveu. Em ' +
          'memecoin essa suposição é frágil: a liquidez pode sumir antes de você chegar lá, e ' +
          'aí a perda real passa do combinado. É mais um motivo para a invalidação em 100% ser ' +
          'o cenário honesto — ela é a única que não depende de conseguir sair.',
        'Repare no que esta tela nunca faz: escolher por você. Ela não sugere risco, não sugere ' +
          'invalidação e não recomenda token nenhum. Ela só termina uma conta que você começou ' +
          'ao escrever a sua regra.',
      ],
    },
  },
```

---

## calculadoraDeRecuperacao

ANTES: `emUmaFrase` + a nota da fórmula, 203 caracteres. O teto de 200 e o limiar de 67% só aparecem em legenda dinâmica.

```js
  calculadoraDeRecuperacao: {
    titulo: 'O que uma perda exige de volta',
    emUmaFrase:
      'Perder e recuperar não são simétricos. Uma perda pequena e planejada custa pouco; um ' +
      'rombo custa um múltiplo.',
    // (rotuloDoNumero, rotuloDaFigura, barras, tetoDaTela, notas, legenda e controles: inalterados)

    paragrafos: [
      'Esta calculadora responde uma pergunta só: depois de uma perda de tanto por cento, de ' +
        'quanto precisa ser o ganho apenas para voltar ao ponto de partida — não para lucrar, ' +
        'só para empatar.',
      'A assimetria existe porque a perda tira base. Você perde uma porcentagem do valor cheio ' +
        'e depois precisa ganhar uma porcentagem de um valor menor, que é o que sobrou. Quanto ' +
        'maior a perda, menor a base que precisa fazer o trabalho de volta — e por isso a ' +
        'exigência cresce muito mais rápido que a perda.',
      'Na tela há um controle só, a perda sobre a posição, de 5% a 95%, de cinco em cinco. Em ' +
        'cima aparece o número grande, "Ganho necessário só para voltar ao ponto de partida". ' +
        'Embaixo, duas barras na mesma escala: a perda e o ganho para voltar. Elas usam a mesma ' +
        'régua de propósito, porque a distância entre as duas é a coisa toda.',
      'Arraste a perda até 67%: a partir daí o ganho necessário passa de 200% e a barra encosta ' +
        'no limite da escala, com a tela avisando que ela está no limite. Esse teto de 200 é ' +
        'escolha de escala desta tela, não um número do mercado — e a legenda diz isso.',
      'O erro que esta tela desmonta é uma intuição que quase todo mundo tem: a de que uma ' +
        'queda e uma alta do mesmo tamanho se cancelam. Não se cancelam, e a diferença entre ' +
        'elas é o custo de ter demorado a decidir.',
    ],

    paragrafosFinais: [
      'É por isso que o ponto de invalidação existe. Ele não evita a perda: evita a perda ' +
        'grande, que é a única de que não se volta em tempo razoável. E é também a conta por ' +
        'trás do card seguinte — na Degradação, cada dia segurando empurra a barra de baixo ' +
        'para a direita, e a de cima cresce mais rápido ainda.',
    ],

    detalhe: {
      titulo: 'a fórmula em palavras',
      paragrafos: [
        'A fórmula está na nota da tela: ganho necessário = 1 ÷ (1 − perda) − 1. Em palavras: ' +
          'divida 1 pelo que sobrou depois da perda e tire 1. Se sobrou pouco, a divisão ' +
          'dispara — é toda a matemática do assunto, e ela não tem exceção nem sorte.',
        'A conta é sobre a posição, não sobre a sua carteira inteira. Quanto uma perda de X na ' +
          'posição custa do seu capital total depende do tamanho que você deu a ela, que é o ' +
          'assunto da calculadora da aba "Antes de entrar".',
      ],
    },
  },
```

---

## APONTAMENTOS

1. **Risco maior de todos — os `paragrafos` podem não aparecer na tela.** O próprio arquivo diz, em três lugares (`teseVsCatalise.paragrafos`, `takeProfit.paragrafos`, `erroDeSegurar.paragrafos`), que "a tela não os mostra desde o redesenho". Se a view do módulo 4 não passa esses objetos pelo card de `secao.js`, o texto novo entra no arquivo e continua invisível. Antes de colar, é preciso conferir card a card se `paragrafos`, `exemplo`, `quadro`, `paragrafosFinais` e `detalhe` estão sendo renderizados. Não mexi em `src/` para checar isso (o pedido proibia).
2. **Campos antigos que eu absorvi, e que precisam ser apagados na mesma colagem, senão o texto sai duplicado:** `takeProfit.escada.paragrafo` (singular), `takeProfit.erroDeSegurar.paragrafoFinal`, `checagens.paragrafoFinal`. Mantive intactos `checagens.fim` e todas as legendas de visual.
3. **`erroDeSegurar` ficou sem campo `detalhe` de propósito**: o comentário do arquivo diz que quem ocupa o "Para ir mais fundo" daquele card é `tributacao`. Se a view aceitar os dois, dá para mover o parágrafo sobre custo afundado para lá; hoje ele está em `paragrafos`.
4. **Divergência real encontrada, não corrigida — o limiar de 67%.** O comentário e a legenda da `calculadoraDeRecuperacao` dizem "a partir de 67% de perda o ganho passa do teto (200%)", mas o controle tem `passo: 5`, ou seja, só dá para escolher 65%, 70%, 75%... 67% não é selecionável. Escrevi "arraste até 67%" porque é o número que está no arquivo, mas na tela o usuário vai parar em 65% ou 70%. Decisão do dono: ou a legenda passa a citar o primeiro valor selecionável acima do teto, ou o passo muda. Não alterei nenhum dos dois.
5. **Jargão que estreia no visual, antes do texto explicar.** Os `destaques` (os números grandes no topo de cada aba) usam "hard rug", "LP, mint, freeze, concentração, bundles" e "5× → 0" antes de qualquer explicação, e eu não podia reescrevê-los (são visual, outro chat). Os `objetivos`, no topo do módulo, usam "custo afundado". Fica o registro para quem cuidar do visual.
6. **Grafia inconsistente de Pump.fun.** O mapa das catálises escreve "Pump.fun" e a primeira checagem escreve "pump.fun". Mantive cada uma como está no campo correspondente, para não mudar nada por conta própria. Vale padronizar num varrida só.
7. **Duplicação entre `simulador` e `molduraDoSimulador`.** `simulador.abertura` diz quase exatamente o que `molduraDoSimulador.emUmaFrase` dizia, `simulador.aviso` é quase idêntico a `molduraDoSimulador.aviso`, e `simulador.introducao` repete `molduraDoSimulador.passos.legenda`. O comentário do arquivo sugere que o componente entra sem o aviso dele, o que deixaria esses campos como texto morto. Não toquei em nenhum; só sinalizo.
8. **`takeProfit.titulo` e `escada.emUmaFrase` repetem a mesma frase** ("o lucro que você não realizou não é seu"). Como o título do topo está fora da tela, hoje não aparece duas vezes — mas se ele voltar, vai aparecer.
9. **Exemplos resolvidos nas calculadoras: usei só o que já estava escrito no arquivo.** A regra de ouro proíbe número derivado novo, e resultado de calculadora é exatamente isso. Por isso os exemplos usam os pares que o próprio arquivo já traz nos comentários (risco 10% + invalidação 5% → 200%, com perda de 5% no teto; 1º alvo em 5× → 2º em 5,5×; perda de 67% → acima de 200%) e, onde não havia par pronto, descrevo como ler o número em vez de afirmar qual ele é. Se o dono quiser exemplos com o resultado escrito por extenso (por exemplo, o que sai com 2× e 4×), é preciso ele confirmar os números antes.
10. **Proposta de divisão de card**, repetida aqui para não se perder: `checagens` ficou longo com o quadro de vocabulário. Sugiro duas seções — "O vocabulário das seis checagens" e "As seis checagens que vêm antes da tese". Está explicado no fim daquela seção.
11. **Nada foi apagado do `quiz` nem de `porqueErradas`.** As quatro `perguntaRapida` (q1 em `teseVsCatalise`, q2 em `escada`, q3 em `erroDeSegurar`, q4 em `checagens`) estão marcadas para remoção nas seções acima, conforme a decisão de hoje; as perguntas seguem existindo no quiz do fim do módulo.

---

## TERMOS TRADUZIDOS

Ordem de estreia na tela (aba Tese → Take profit → Antes de entrar → Simulador), não a ordem do arquivo.

| Termo | Onde passa a ser explicado |
| --- | --- |
| tese / catálise | `teseVsCatalise`, parágrafo 1 — as duas perguntas que cada frase responde |
| caderno de trades | `fichaDeTese.introducao` — traduzido para "caderno de operações", com o termo em inglês entre parênteses |
| invalidar / invalidação | `tabelaDosExemplos`, parágrafo 1; o campo da ficha é explicado em `planoDaPosicao`, parágrafo 3 |
| DEX (corretora descentralizada) | `tiposDeCatalise`, parágrafo 1 |
| bonding curve (curva de preço do lançamento) | `tiposDeCatalise`, parágrafo 4 |
| graduação | `tiposDeCatalise`, parágrafo 4 |
| buy the rumor, sell the news | `tiposDeCatalise`, parágrafo 5 — "comprar no rumor, vender no fato" |
| LP / liquidity pool / pool de liquidez | `planoDaPosicao`, parágrafo 4 (primeira aparição, no exemplo da invalidação); retomado no `quadro` de `checagens` |
| take profit (realizar) | `escada`, parágrafo 1 |
| liquidez | `escada`, parágrafo 2 |
| realização parcial | `escada`, parágrafo 3 |
| múltiplo da entrada (2×, 5×) | `calculadoraDeDegraus`, exemplo "Uma passada pelos controles" |
| risco aceito por operação | `calculadoraDeTamanho`, parágrafo 2 |
| alavancar | `calculadoraDeTamanho`, exemplo (passo 3, no contexto do aviso da tela) |
| livro de ofertas | `erroDeSegurar`, parágrafo 2 |
| custo afundado / sunk cost | `erroDeSegurar`, parágrafo 3 |
| preço médio | `erroDeSegurar`, parágrafo 5 |
| ganho de capital | `tributacao`, parágrafo 1 |
| GCAP / DARF | `tributacao`, ponto "Acima do limite" |
| KYC / P2P | `tributacao`, ponto "Saque em reais" |
| pool | `checagens`, quadro "Pool e LP" |
| LP travada × destravada | `checagens`, quadro "Pool e LP" |
| authority / mint authority / freeze authority / revogada | `checagens`, quadro "Authority (autoridade)" |
| supply / holders / concentração / top 10 | `checagens`, quadro "Supply, holders e concentração" |
| bundle | `checagens`, quadro "Bundle" |
| market cap (valor de mercado) | `checagens`, quadro "Market cap e honeypot" |
| honeypot (pote de mel) | `checagens`, quadro "Market cap e honeypot" |
| hard rug (puxada de tapete) | `checagens`, exemplo "Por que a primeira pergunta é a primeira" |
| bloco | `checagens`, quadro "Bundle" e exemplo do hard rug |
| explorador de rede (Solscan, BscScan) | `checagens`, detalhe "Para ir mais fundo" |
| RugCheck / Bubblemaps / DexScreener | `checagens`, detalhe "Para ir mais fundo" |
| resumo de disciplina / "não se aplica" | `molduraDoSimulador`, parágrafo 4 |
