# Módulo 7 — texto reescrito

Medi antes de escrever: as 12 seções somam **2.075 caracteres** de texto corrido (`paragrafos` + `paragrafosFinais`), média de 173 por seção, e quatro seções (`por-que-antes`, `cinco-partes`, `ciclo`, `nove-campos`) têm **zero** — só título, uma frase e o desenho. Na prática o módulo virou legenda: quem não sabia o que é um stop, uma cauda pesada ou um Sharpe sai do card sem saber. A reescrita mantém todos os visuais intactos e coloca a explicação de volta em parágrafo, na ordem "o que é → por que me importa → como aparece → exemplo com número → o erro que evita". Depois da reescrita são **26.327 caracteres** de texto corrido (média de 2.194 por seção, nenhuma abaixo de 1.900) e **36.811** contando `exemplo`, `quadro` e `detalhe`. Nenhum número novo entrou: tudo que aparece abaixo já existia em `src/data/modulo7.js`.

---

## por-que-antes

ANTES: nenhum parágrafo — só `emUmaFrase`, o visual dos dois cartões e um `detalhe` com as fontes (0 caracteres de texto corrido).

```js
    {
      id: 'por-que-antes',
      aba: 'regra',
      titulo: 'Por que a regra vem antes da compra',
      emUmaFrase:
        'Depois do resultado, a memória reescreve o que você pensava. A regra escrita antes ' +
        'guarda o que você pensou de verdade.',
      // memoria: { ... } — o visual fica exatamente como está.
      paragrafos: [
        'Uma regra de operação é um texto curto, escrito e datado, que diz o que você vai fazer ' +
          'antes de ter qualquer resultado na frente. Ela não adivinha o futuro e não promete ' +
          'acerto: ela só registra, enquanto a cabeça está fria, qual era o seu critério. Escrever ' +
          'antes é o que separa "eu tinha um plano" de "eu me lembro de ter tido um plano". São ' +
          'coisas diferentes, e só a primeira dá para conferir depois.',
        'Isso importa porque a memória não guarda decisões: ela guarda histórias, e reescreve a ' +
          'história quando o final muda. Os dois cartões do desenho mostram a mesma decisão contada ' +
          'de dois jeitos. Se deu certo, vem o "eu sabia" — é o viés de retrospectiva, a impressão ' +
          'de que o que aconteceu era previsível, impressão que só aparece depois de ter ' +
          'acontecido. Junto dele vem o "foi habilidade", que é o viés de autoatribuição: fico com ' +
          'o mérito do ganho e empurro a perda para o azar. Se deu errado, a mesma decisão vira ' +
          '"foi azar". Repare que nada mudou na decisão. Mudou o resultado.',
        'Na prática, isso acontece num momento só, e é um momento curto: antes de você abrir a ' +
          'próxima tela de token. Depois que o gráfico está na frente, qualquer coisa que você ' +
          'escrever já nasce contaminada pelo que está vendo. Por isso a regra é escrita fora da ' +
          'tela de negociação, e por isso nenhum campo deste hub guarda o texto dela: o lugar da ' +
          'regra é o seu caderno. O que este módulo mostra é a forma de uma regra que dá para ' +
          'conferir depois. O conteúdo é decisão sua, do começo ao fim.',
      ],
      exemplo: {
        titulo: 'Pré-compromisso medido: o que funcionou e o que não colou',
        passos: [
          'Nas Filipinas, um banco ofereceu uma conta de poupança que travava os saques até uma data combinada.',
          'Entre quem aceitou, a poupança aumentou cerca de 82% em um ano — o compromisso funcionou.',
          'Só que apenas 28% das pessoas aceitaram abrir a conta.',
          'E outros estudos mostram muita gente abandonando o compromisso antes do prazo.',
          'Os dois números andam juntos: o efeito em quem aceitou foi grande, e a adesão foi pequena.',
        ],
      },
      paragrafosFinais: [
        'O erro que essa ideia evita é o mais comum de todos: revisar a operação de memória. Quem ' +
          'revisa de memória sempre conclui que a decisão foi coerente, porque a memória já arrumou ' +
          'a história para caber no resultado. Com a regra escrita antes, a revisão deixa de ser ' +
          'uma conversa com você mesmo e vira uma comparação entre dois textos: o que estava ' +
          'escrito e o que você fez.',
        'Vale dizer com todas as letras o que está medido e o que não está. O que foi medido é que ' +
          'planos do tipo "se acontecer X, eu faço Y", feitos antes, aumentam a chance de a pessoa ' +
          'cumprir o que planejou. Cumprir o que planejou e ganhar dinheiro são duas coisas ' +
          'diferentes, e só a primeira tem evidência aqui. Uma regra escrita não melhora a regra: ' +
          'ela só faz você ficar do lado dela.',
      ],
      detalhe: {
        titulo: 'de onde vem, e por que o pré-compromisso falha',
        paragrafos: [
          'O resultado dos planos "se acontecer X, eu faço Y" é de Gollwitzer & Sheeran (2006), e ' +
            'foi medido em metas de comportamento em geral — não em operações no mercado.',
          {
            destaque: 'Pré-compromisso funciona, e falha com frequência.',
            texto:
              'A conta de poupança das Filipinas do exemplo acima é de Ashraf, Karlan & Yin ' +
              '(2006). A lição prática dos dois números juntos é que o compromisso precisa ser ' +
              'rígido o bastante para valer e simples o bastante para você manter. Regra que você ' +
              'quebra toda semana não protege nada — e regra rígida demais para a sua vida vira ' +
              'uma das que se quebra toda semana.',
          },
          'Uma ressalva de honestidade sobre as fontes: Gollwitzer & Sheeran (2006) e Ashraf, ' +
            'Karlan & Yin (2006) foram confirmados por artigos revisados por pares que os citam, e ' +
            'não pelos textos originais, que estão atrás de paywall. "Revisado por pares" quer ' +
            'dizer que outros pesquisadores da área leram e criticaram o trabalho antes de ele ser ' +
            'publicado; é o selo de qualidade mais forte que este módulo usa, e por isso importa ' +
            'dizer quando ele foi conferido de segunda mão.',
        ],
      },
    },
```

---

## cinco-partes

ANTES: nenhum parágrafo — `emUmaFrase`, o formulário em branco das 5 partes e um `rodape` de duas linhas (0 caracteres de texto corrido).

```js
    {
      id: 'cinco-partes',
      aba: 'regra',
      titulo: 'As cinco partes da sua regra',
      etiqueta: 'em branco: você escreve',
      emUmaFrase:
        'Uma regra que não dá para conferir depois não é regra: é intenção. Cada parte é ' +
        'escrita de um jeito que outra pessoa conseguiria verificar olhando o seu diário.',
      rotuloDoExemplo: 'exemplo de forma',
      // partes: [ ... ] e rodape: [ ... ] — o formulário em branco fica como está.
      paragrafos: [
        'Uma regra completa responde cinco perguntas, e são sempre as mesmas cinco: quando eu ' +
          'entro, com quanto eu entro, onde eu saio se der errado, onde eu saio se der certo ou se ' +
          'nada acontecer, e o que me faria jogar esta regra fora. São os cinco campos em branco ' +
          'aqui em cima. Eles estão em branco de propósito: o hub não sabe qual é o seu capital, ' +
          'qual é o seu prazo nem o que você aceita perder, e não tem como saber.',
        'A palavra que carrega o peso todo é verificável. Uma resposta é verificável quando outra ' +
          'pessoa, lendo só o seu diário semanas depois, consegue dizer sim ou não sem perguntar ' +
          'nada a você. "Comprei quando pareceu bom" não passa nesse teste, porque ninguém ' +
          'consegue conferir "pareceu". Um fato observável somado a um momento passa, porque ou ' +
          'aquilo estava lá na hora, ou não estava. Isso vale para as cinco partes, não só para a ' +
          'primeira.',
        'Isso importa porque as cinco partes são a única coisa que a revisão tem para comparar. Na ' +
          'aba O diário, o campo "segui a regra?" não sai da sua lembrança: sai de colocar lado a ' +
          'lado o que estava escrito antes e o que a corretora registrou depois. Se a regra estiver ' +
          'escrita de um jeito que não dá para conferir, a revisão fica sem lastro e o módulo ' +
          'inteiro para de funcionar a partir daí.',
        'Na tela, ao lado de cada parte, aparece um texto marcado como exemplo de forma. Leia essa ' +
          'etiqueta ao pé da letra: ali está o formato de uma resposta verificável, nunca um ' +
          'limiar, um percentual ou um gatilho para você seguir. E nada do que você digitar nesta ' +
          'tela é salvo — a tela é o molde, o lugar da regra é o caderno.',
      ],
      exemplo: {
        titulo: 'Por que o tamanho é escrito em porcentagem, e não em valor fixo',
        passos: [
          'Use o mesmo capital do exemplo da aba O tamanho: capital de 100, posição de 10.',
          'Escrito como porcentagem, o tamanho é "10% do capital de hoje".',
          'Escrito como valor fixo, o tamanho é "10", e parece a mesma coisa.',
          'Se a posição vai a zero, o capital cai para 90 — e o valor fixo de 10 passa a ser uma fatia maior do que sobrou.',
          'A porcentagem se ajusta sozinha; o valor fixo envelhece e vai apertando sem você perceber. A conta completa está na aba O tamanho.',
        ],
      },
      paragrafosFinais: [
        'O erro que essas cinco perguntas evitam é o da regra pela metade: a pessoa decide muito ' +
          'bem quando entrar e não decide nada sobre sair. Aí a saída acaba sendo decidida no pior ' +
          'momento possível, que é com a posição aberta e o preço andando. Repare que três das ' +
          'cinco partes falam de saída ou de abandono — não é desequilíbrio, é o ponto.',
        'A quinta parte, o que invalida a regra, é a que quase todo mundo pula. Sem ela, a regra ' +
          'nunca morre: ela só vai sendo ajustada um pouquinho a cada perda, até não ser mais a ' +
          'mesma regra e ninguém saber dizer quando mudou. Decidir antes o que faria você abandonar ' +
          'a regra é o que permite abandoná-la sem que isso vire uma decisão tomada no susto.',
      ],
    },
```

---

## ciclo

ANTES: nenhum parágrafo — `emUmaFrase` e o fluxograma com a `descricao` de acessibilidade (0 caracteres de texto corrido).
`pergunta: REMOVER (hoje 'q4')`

```js
    {
      id: 'ciclo',
      aba: 'regra',
      titulo: 'O ciclo de uma operação',
      emUmaFrase: 'A regra só muda na revisão — nunca no meio de uma operação.',
      // ciclo: { ... } — o fluxograma fica como está.
      paragrafos: [
        'O desenho acima é o caminho inteiro de uma operação, do papel até a revisão. Ele começa ' +
          'fora do mercado, com a regra escrita, e termina fora do mercado, na revisão. O meio — a ' +
          'parte em que o dinheiro está lá dentro — é curto de propósito: quase tudo já foi ' +
          'decidido antes de você clicar.',
        'Há dois filtros em sequência, e eles não são a mesma coisa. O primeiro é o checklist, a ' +
          'lista de conferência do hub: ele é o filtro mínimo, igual para qualquer token, e serve ' +
          'para reprovar o que nem deveria ser considerado. O segundo é o gatilho da sua regra, que ' +
          'é só seu. Um token pode passar no checklist e mesmo assim não ser comprado, porque o ' +
          'gatilho que você escreveu não aconteceu. Passar no checklist não é sinal de compra.',
        'A parte mais fácil de ignorar é a que não dá trabalho nenhum: quando reprova, você não ' +
          'compra e anota o motivo. Parece desperdício anotar uma operação que não existiu, mas é ' +
          'justamente esse registro que mostra, na revisão, se o seu filtro está funcionando ou se ' +
          'você vem inventando exceções. Uma pasta cheia de "não comprei porque" é um ativo do ' +
          'diário, não um refugo.',
        'A seta que importa é a do fim: a mudança na regra só acontece na revisão, e depois volta ' +
          'para o começo. No meio de uma operação, a regra é tratada como se fosse de outra pessoa ' +
          '— porque, em termos de memória, ela é mesmo: foi escrita por você num momento em que ' +
          'você não estava vendo o preço andar.',
      ],
      exemplo: {
        titulo: 'Os três fins possíveis, e todos os três viram registro',
        passos: [
          'O token reprova no checklist: não compro, e anoto o motivo. Fim.',
          'O token passa no checklist, mas o gatilho da minha regra não aconteceu: não compro, e anoto o motivo. Fim.',
          'Passou e o gatilho aconteceu: entro com o tamanho da regra e com a saída já programada.',
          'Anoto no diário antes de ver o resultado; a saída executa; anoto a saída executada.',
          'Na revisão, comparo o que estava escrito com o que foi executado — e é só aqui que a regra pode mudar.',
        ],
      },
      paragrafosFinais: [
        'O erro que esse ciclo evita tem nome informal: mudar a regra com a posição aberta. É ' +
          'quando o alvo escrito antes vira "vou segurar mais um pouco", ou a saída por perda vira ' +
          '"isso aqui ainda volta". Não é falta de disciplina abstrata: é que, com a posição ' +
          'aberta, quem está decidindo é uma versão sua que já tem dinheiro em jogo e já quer um ' +
          'resultado específico.',
        'Repare que o ciclo não diz o que comprar nem quando. Ele só garante que, seja qual for a ' +
          'sua regra, cada volta produza um registro conferível e um único momento legítimo para ' +
          'mudar de ideia.',
      ],
    },
```

---

## stop-automatico

ANTES: um parágrafo de 346 caracteres, que já definia stop-loss e citava slippage e a fonte, tudo num bloco só.

```js
    {
      id: 'stop-automatico',
      aba: 'regra',
      titulo: 'Saída automática, não lembrete',
      emUmaFrase:
        'Uma ordem de venda automática mudou o comportamento. Um lembrete para vender não mudou ' +
        'nada.',
      // comparacao: { ... } — os dois cartões ficam como estão.
      paragrafos: [
        'Stop-loss é uma ordem de venda automática. Em português: você programa antes um nível de ' +
          'preço, e a venda acontece sozinha quando o preço chega lá, com você olhando ou não. É ' +
          'diferente de um alarme, que só avisa, e é diferente de uma intenção, que só existe na ' +
          'sua cabeça. A palavra que separa os três é execução: a ordem executa, o alarme avisa, a ' +
          'intenção espera você.',
        'É exatamente essa diferença que um experimento mediu, e o resultado está nos dois cartões ' +
          'acima. Quem tinha a ordem de venda automática segurou menos as posições perdedoras. Quem ' +
          'recebia um lembrete para "considerar vender" não mudou nada. Repare no que foi medido: ' +
          'comportamento, não lucro. Ninguém mostrou ali que o stop dá mais dinheiro; mostrou que ' +
          'ele muda o que a pessoa faz. E o módulo não guarda um número de quanto reduziu — o que ' +
          'está medido é a direção do efeito, não o tamanho dele.',
        'Isso importa para você por um motivo específico: segurar posição perdedora é o hábito mais ' +
          'teimoso que existe em quem opera, e ele não cede com boa vontade. A pessoa sabe que ' +
          'deveria sair, promete sair, e não sai. O que corrige o viés é a execução, não a ' +
          'intenção. Por isso a terceira parte da sua regra não pergunta só onde você sai: ela ' +
          'pergunta quem executa essa saída.',
        'Na prática, a saída é programada no mesmo momento da entrada, não depois. Depois é tarde: ' +
          'com a posição aberta, o nível que você escolheria já não é o mesmo. E em memecoin a ' +
          'ordem automática tem um limite honesto — numa queda rápida, ela pode executar bem abaixo ' +
          'do nível programado. Isso é o slippage, o deslizamento entre o preço que você via e o ' +
          'preço em que a ordem de fato saiu (Módulo 5). O stop reduz o dano; ele não garante o ' +
          'preço.',
      ],
      exemplo: {
        titulo: 'O mesmo nível, dois caminhos',
        passos: [
          'Caminho A: no momento da entrada, você programa a ordem de venda no nível que escreveu na regra.',
          'O preço chega lá às três da manhã. A ordem executa sozinha. Você anota a saída executada no dia seguinte.',
          'Caminho B: você anota o mesmo nível num lembrete e promete vender quando chegar.',
          'O preço chega lá às três da manhã. Você está dormindo — e, se estivesse acordado, ainda teria de decidir de novo, com a perda na tela.',
          'O nível escrito é idêntico nos dois casos. O que muda é quem aperta o botão.',
        ],
      },
      paragrafosFinais: [
        'O erro que essa ideia evita é confundir ter decidido com ter programado. Uma saída ' +
          'decidida e não programada volta a ser uma decisão no pior momento, e o experimento ' +
          'sugere que é assim que ela se perde. O lembrete é a versão simpática da intenção: ele ' +
          'parece um compromisso e não é.',
      ],
      detalhe: {
        titulo: 'a fonte, e o que ela não cobre',
        paragrafos: [
          'O experimento é de Fischbacher, Hoffmann & Schudy (2017), confirmado por um artigo ' +
            'revisado por pares que o cita, e não pelo original, que está atrás de paywall.',
          'Ele foi feito com investidores num ambiente de experimento, não com memecoin. Levar o ' +
            'resultado para cá é uma inferência razoável — a direção do efeito é sobre ' +
            'comportamento humano, não sobre um mercado específico —, mas continua sendo uma ' +
            'inferência, e não uma medição feita aqui.',
        ],
      },
    },
```

---

## fracao-fixa

ANTES: um parágrafo de 224 caracteres sobre o "1% a 2%" ser convenção; o `detalhe` sobre Kelly já existia.
`pergunta: REMOVER (hoje 'q2')`

```js
    {
      id: 'fracao-fixa',
      aba: 'tamanho',
      titulo: 'Fração fixa: uma perda nunca zera a banca',
      emUmaFrase:
        'Arriscar sempre a mesma porcentagem do capital de hoje. O tamanho encolhe quando você ' +
        'perde e cresce quando ganha, sem precisar decidir de novo.',
      // mecanismo: { ... } — os três cartões do exemplo ficam como estão.
      paragrafos: [
        'Fração fixa é uma forma de decidir o tamanho da posição. A conta é sempre a mesma: você ' +
          'aplica uma porcentagem sobre o capital de hoje, e esse é o tamanho. O que é fixo é a ' +
          'porcentagem, não o valor. Banca, aqui, é o nome do capital todo que você separou para ' +
          'isso — a fração é sempre uma fatia dela, nunca ela inteira.',
        'O desenho acima mostra o mecanismo com 10%, que é o número do exemplo do arquivo e não uma ' +
          'sugestão de fração. Capital 100, posição 10. A posição vai a zero e sobram 90. A próxima ' +
          'posição é 10% de 90, ou seja, 9. Repare no que aconteceu sozinho: o tamanho encolheu sem ' +
          'que ninguém decidisse encolher. Se o capital tivesse subido, ele teria crescido do mesmo ' +
          'jeito. Essa é a propriedade inteira da fração fixa — ela transforma o tamanho numa ' +
          'consequência do capital, e não numa decisão tomada na hora, olhando o gráfico.',
        'Por que isso importa para você: numa fração fixa, uma perda nunca zera a banca. Sempre ' +
          'sobra alguma coisa, porque você arriscou só uma parte. A alternativa — decidir o tamanho ' +
          'a cada operação, pelo tanto que aquele token parece promissor — tem o defeito de colocar ' +
          'a maior posição exatamente onde a convicção é maior, e convicção alta é justamente a ' +
          'hora em que a memória está mais pronta para reescrever a história depois.',
        'O número que circula por aí, "arrisque de 1% a 2% por operação", é convenção de mercado. ' +
          'Nenhum estudo revisado por pares o fixa como ótimo: ele é coerente com a ideia de ' +
          'sobreviver, e é só isso. Qual fração você usa é decisão sua, e este módulo não escreve ' +
          'esse número no seu lugar — nem teria como, porque ele depende do seu capital e do que ' +
          'você aceita perder.',
      ],
      quadro: [
        {
          rotulo: 'Isto é conta',
          texto:
            'O mecanismo da fração fixa. Dado o capital e a porcentagem, o tamanho sai por ' +
            'aritmética, e o resultado é o mesmo para qualquer pessoa.',
        },
        {
          rotulo: 'Isto não é medição',
          texto:
            'Nada aqui diz que 10% é bom ou ruim. O exemplo usa 10% porque é um número redondo ' +
            'que deixa a conta visível.',
          destaque: true,
        },
      ],
      paragrafosFinais: [
        'O erro que a fração fixa evita é o da posição decidida pelo entusiasmo: entrar pequeno ' +
          'quando se está inseguro, entrar grande quando se está animado, e descobrir no fim do mês ' +
          'que as poucas posições grandes decidiram o resultado todo. Com fração fixa, o tamanho ' +
          'não conversa com o seu humor. Ele conversa com o seu capital.',
        'Falta responder qual fração é a melhor. A resposta honesta é que, para memecoin, ninguém ' +
          'sabe — e a razão disso está logo abaixo, em "Para ir mais fundo".',
      ],
      detalhe: {
        titulo: 'por que o critério de Kelly quebra aqui',
        paragrafos: [
          'O critério de Kelly responde que fração apostar para o capital crescer o mais rápido ' +
            'possível no longo prazo. Para um ativo contínuo, f* = μ ÷ σ², em que μ é o retorno ' +
            'esperado (a média dos resultados) e σ² é a variância (o tamanho típico das oscilações ' +
            'em torno dessa média). A fórmula só funciona se as duas existirem — e numa cauda ' +
            'muito pesada a variância pode ser infinita e a média pode nem existir, então ela não ' +
            'produz número nenhum.',
          '"Cauda pesada" é o apelido de uma distribuição em que os casos extremos aparecem com ' +
            'frequência alta demais para a média se comportar. Num mundo de cauda leve, uma ' +
            'amostra grande faz a média assentar num valor. Num mundo de cauda muito pesada, um ' +
            'único caso extremo pode mexer na média de tudo o que veio antes, e ela nunca assenta.',
          'Dá para ver a fórmula quebrando num caso simples: numa aposta com 50% de chance de ' +
            'dobrar e 50% de perder tudo, a fração de Kelly é 0 — f* = (0,5 × 1 − 0,5) ÷ 1. A ' +
            'possibilidade de perda total domina a conta, e a resposta matemática é não apostar ' +
            'nada. Não é um conselho: é o que a fórmula devolve.',
          'O que a pesquisa diz com segurança é a direção: quanto mais pesada a cauda, menor a ' +
            'fração ótima (Bamberg & Neuhierl, 2012; padrão de cauda em cripto em Grobys & ' +
            'Shahzad, 2025). O valor ótimo para memecoin, ninguém resolveu — e vale registrar que ' +
            'nenhum índice de cauda das memecoins foi publicado, então nem a premissa da cauda ' +
            'muito pesada vem de uma medição feita em memecoin.',
        ],
      },
    },
```

---

## sequencia-de-perdas

ANTES: um parágrafo de 86 caracteres ("Recuperar custa mais do que perder..."), sem objetivo da calculadora, sem exemplo resolvido e sem como ler o resultado.
`pergunta: REMOVER (hoje 'q3')`

```js
    {
      id: 'sequencia-de-perdas',
      aba: 'tamanho',
      titulo: 'Quanto sobra depois de uma sequência de perdas totais',
      emUmaFrase:
        'Perder é mais rápido que recuperar, e a diferença cresce com a fração. É a matemática ' +
        'de uma regra, não uma sugestão de fração.',
      // A calculadora (calculadoraDeSequencia) fica como está.
      paragrafos: [
        'Esta calculadora responde uma pergunta só: se várias posições seguidas forem a zero, ' +
          'quanto sobra do capital e quanto seria preciso ganhar para voltar ao ponto de partida. ' +
          'Você escolhe dois números — a fração do capital em cada posição e quantas posições ' +
          'seguidas vão a zero — e ela devolve outros dois. Ela não prevê nada e não sugere fração ' +
          'nenhuma: é aritmética, e o resultado é o mesmo para qualquer pessoa que digitar os ' +
          'mesmos números.',
        'A fórmula é curta: sobra = (1 − f) elevado a n, em que f é a fração e n é o número de ' +
          'perdas. O elevado a n é o detalhe que muda tudo, porque a fração é recalculada sobre o ' +
          'que sobrou a cada vez, e não sobre o capital inicial. É a mesma lógica da fração fixa do ' +
          'card anterior: o tamanho encolhe sozinho junto com a banca.',
        'Isso importa porque o segundo número, o ganho para voltar ao começo, é sempre maior que a ' +
          'perda sofrida. O motivo é simples: o ganho é calculado sobre um capital menor. Perder ' +
          'metade do capital exige dobrar o que sobrou — ou seja, +100% — só para voltar ao ponto ' +
          'de partida. Não é pessimismo nem retórica; é a mesma conta vista do outro lado.',
        'Os dois atalhos, 10% por posição e 25% por posição, são as duas frações do exemplo do ' +
          'arquivo e servem para comparar uma com a outra. Troque entre eles com o mesmo número de ' +
          'perdas e observe o que acontece com o segundo número, o do ganho necessário: é ali que a ' +
          'diferença entre as frações aparece de forma mais violenta.',
      ],
      exemplo: {
        titulo: 'Um exemplo resolvido: 10% por posição, 5 perdas seguidas',
        passos: [
          'Fração de 10% e uma perda total: sobram 90% do capital. Até aqui, nada assustador.',
          'Cinco perdas seguidas: 0,9 × 0,9 × 0,9 × 0,9 × 0,9 = 0,59. Sobram cerca de 59%.',
          'Por que não 50%? Porque 50% seria o resultado se cada perda fosse calculada sobre o capital inicial. Ela é recalculada sobre o que sobrou.',
          'Para voltar ao começo, é preciso ganhar 69% sobre esse capital que restou.',
          'Leia os dois números juntos: perdi 5 vezes uma fatia pequena, e agora preciso de um ganho grande para empatar.',
        ],
      },
      quadro: [
        {
          rotulo: 'O que a calculadora é',
          texto:
            'Uma conta. Ela supõe que cada posição perdida vai a zero e que a fração é ' +
            'recalculada sobre o capital que sobrou. Não inclui taxas nem ganhos no meio da ' +
            'sequência.',
        },
        {
          rotulo: 'O que ela não é',
          texto:
            'Uma previsão de quantas perdas você vai ter, e uma recomendação de fração. Os dois ' +
            'controles são seus; o hub não preenche nenhum dos dois por você.',
          destaque: true,
        },
      ],
      paragrafosFinais: [
        'O erro que essa conta evita é o de somar porcentagens de cabeça. Perder 10% cinco vezes ' +
          'parece perder 50%, e não é: a sequência é multiplicativa, não somada. O engano costuma ' +
          'ser confortável quando se olha só as perdas — sobra mais do que se imaginava — e ' +
          'desconfortável quando se olha a volta, porque o ganho necessário cresce mais depressa do ' +
          'que a intuição acompanha.',
        'O que fazer com esse número é decisão sua. A calculadora mostra o custo aritmético de uma ' +
          'sequência ruim para cada fração; escolher com qual custo você consegue conviver não é ' +
          'uma conta, é uma escolha sobre a sua vida.',
      ],
    },
```

---

## ruina

ANTES: um parágrafo de 238 caracteres com o dado do Pump.fun; a grade e os dois cartões já carregavam o resto.

```js
    {
      id: 'ruina',
      aba: 'tamanho',
      titulo: 'A ruína do apostador: sobreviver vem primeiro',
      emUmaFrase:
        'Com uma desvantagem pequena repetida muitas vezes, quebrar é quase certo. Aí a ' +
        'pergunta muda.',
      // grade: { ... } e comparacao: { ... } — os dois visuais ficam como estão.
      paragrafos: [
        'A ruína do apostador é um resultado clássico de probabilidade. Ele descreve alguém que ' +
          'aposta repetidamente com uma desvantagem pequena e só para em dois casos: quando quebra ' +
          'ou quando chega a um alvo. A conclusão é dura: se as apostas se repetem, quebrar antes ' +
          'de chegar ao alvo é quase certo, mesmo com a desvantagem sendo pequena em cada rodada.',
        'A grade acima mostra o caso da roleta americana, apostando sempre no par: são 18 chances ' +
          'de ganhar em 38, começando com 50 fichas e parando só em 100. De cada 100 tentativas, a ' +
          'chance de quebrar é de 99,5%. Por isso a grade está inteira vermelha: são 100 quadrados ' +
          'para representar 99,5%, e o arredondamento come o único quadrado que sobraria. Menos de ' +
          '1 em 100 chega às 100 fichas.',
        'Isso importa porque, em cada rodada isolada, a desvantagem parece quase nada — 18 em 38 ' +
          'está pertinho da metade. A intuição olha uma rodada e conclui que dá para brigar; a ' +
          'conta olha a repetição e conclui que não. Repetição é o ingrediente que a intuição não ' +
          'consegue processar, e é exatamente o ingrediente que existe em qualquer rotina de ' +
          'operações.',
        'A consequência prática está nos dois cartões: a pergunta muda. Sai "quanto cresce", que é ' +
          'a pergunta que a matemática do crescimento não consegue responder quando a média pode ' +
          'nem existir, e entra "quanto aguento perder sem ser eliminado". Dessa troca sobra uma ' +
          'única regra com fundamento, e ela é modesta de propósito: o tamanho de cada posição é um ' +
          'valor que você pode perder inteiro. Quanto é esse valor, só você sabe — depende da sua ' +
          'vida, não do mercado.',
      ],
      quadro: [
        {
          rotulo: 'Conta',
          texto:
            'Os 99,5% da roleta. É probabilidade calculada a partir das regras do jogo (ruína do ' +
            'apostador, Feller), não uma medição de jogadores reais.',
        },
        {
          rotulo: 'Medição',
          texto:
            'Os 68,67% do Pump.fun. É contagem de tokens que existiram, feita sobre dados ' +
            'on-chain (CoinGecko Research).',
          destaque: true,
        },
      ],
      paragrafosFinais: [
        'Perder inteiro não é o caso extremo, é o caso comum: 68,67% dos tokens da plataforma de ' +
          'lançamento Pump.fun pararam de negociar no mesmo dia em que nasceram. Ou seja, a ' +
          'hipótese "esta posição pode valer zero" não é uma precaução exagerada que se coloca no ' +
          'papel para parecer prudente. É o desfecho mais frequente que já foi contado.',
        'O erro que essa ideia evita é raciocinar por rodada em vez de por sequência. Quem pensa ' +
          'por rodada acha que basta estar um pouco certo mais vezes do que errado; quem pensa por ' +
          'sequência percebe que ser eliminado encerra o jogo antes de qualquer média aparecer. ' +
          'Sobreviver não é uma virtude moral aqui: é a condição para que qualquer outra coisa ' +
          'neste módulo faça sentido.',
      ],
    },
```

---

## duas-frases

ANTES: um parágrafo de 231 caracteres (regra ruim, registro escrito, mostrado a alguém); a grade do 61 em 100 e os dois cartões já estavam lá.
`pergunta: REMOVER (hoje 'q1')`

```js
    {
      id: 'duas-frases',
      aba: 'diario',
      titulo: 'O que o diário faz, e o que não faz',
      emUmaFrase:
        'O diário ajuda você a seguir a sua regra. Ninguém mediu se ele faz ganhar dinheiro.',
      // comparacao: { ... } e grade: { ... } — os dois visuais ficam como estão.
      paragrafos: [
        'Um diário de operações é um registro escrito do que você decidiu, feito antes de saber ' +
          'como termina. Ele não é um relatório de lucro e não é um caderno de anotações sobre o ' +
          'mercado. É um registro de decisões suas, com data, para você comparar depois com o que ' +
          'de fato aconteceu.',
        'Os dois cartões acima separam o que tem lastro do que não tem, e a separação é importante ' +
          'porque os dois são vendidos juntos por aí. Tem lastro: o registro ajuda você a seguir a ' +
          'sua própria regra. Não tem lastro: o registro faz você ganhar dinheiro. Nenhum estudo ' +
          'revisado por pares mediu diário de operações levando a retorno — nenhum, nem a favor, ' +
          'nem contra.',
        'O que existe medido vem de outro lugar: uma meta-análise, que é um estudo que junta os ' +
          'resultados de muitos experimentos e calcula um efeito comum. Essa juntou 138 ' +
          'experimentos com 19.951 pessoas e achou um efeito de d = 0,40 de monitorar o progresso ' +
          'sobre cumprir metas de comportamento — perder peso, parar de fumar, tomar remédio na ' +
          'hora. O "d" é uma régua de tamanho de efeito: na convenção usual, 0,2 é pequeno, 0,5 é ' +
          'médio e 0,8 é grande. Então 0,40 é de pequeno a médio. Não é um efeito espetacular, e é ' +
          'honesto dizer isso.',
        'A grade acima traduz esse 0,40 para uma linguagem que dá para sentir. Sorteando uma pessoa ' +
          'que monitorou e uma que não monitorou, há 61 chances em 100 de a que monitorou ter ' +
          'cumprido mais a meta. Se não houvesse efeito nenhum, seriam 50 em 100 — é o que a linha ' +
          'tracejada marca. A distância entre 61 e 50 é o tamanho real do que se está prometendo ' +
          'aqui: uma ajuda, não uma virada.',
      ],
      exemplo: {
        titulo: 'Como o efeito vira decisão de formato',
        passos: [
          'O efeito foi maior quando o registro era escrito de verdade, e não conferido de cabeça.',
          'E foi maior também quando o resultado era mostrado a alguém.',
          'Daí sai uma consequência prática de formato: escrever, mesmo que ninguém leia, vale mais do que repassar mentalmente.',
          'E daí sai o limite honesto: isso foi medido em metas de saúde e comportamento, não em operações.',
        ],
      },
      paragrafosFinais: [
        'O erro que essa distinção evita é o mais caro do módulo: achar que o diário conserta a ' +
          'regra. Ele não conserta. Se a regra for ruim, o diário ajuda você a seguir uma regra ruim ' +
          'com mais fidelidade — e você vai executá-la melhor, com mais constância, perdendo com ' +
          'mais método. O diário mede aderência; a qualidade da regra é outro problema, e a aba A ' +
          'revisão mostra por que ele é tão difícil de resolver.',
        'Isso também é a sua defesa contra o discurso de venda. Quando alguém disser que manter ' +
          'diário melhora o desempenho em X%, você já sabe onde procurar: existe um efeito medido, ' +
          'ele é sobre cumprir metas de comportamento, e o caminho de diário até retorno nunca foi ' +
          'medido por ninguém.',
      ],
      detalhe: {
        titulo: 'a fonte, e a ponte que ela não atravessa',
        paragrafos: [
          'A meta-análise é Harkin et al. (2016), publicada no Psychological Bulletin: 138 ' +
            'experimentos, 19.951 pessoas, efeito d = 0,40.',
          'Toda a evidência de que monitorar ajuda vem de metas de saúde e comportamento. Levar ' +
            'isso para operações é uma inferência razoável, não um fato medido — e é assim que ' +
            'este módulo trata o assunto do começo ao fim.',
        ],
      },
    },
```

---

## nove-campos

ANTES: nenhum parágrafo — `emUmaFrase`, os nove campos em branco e um `rodape` de duas frases (0 caracteres de texto corrido).

```js
    {
      id: 'nove-campos',
      aba: 'diario',
      titulo: 'O diário, campo a campo',
      etiqueta: 'em branco: você escreve',
      emUmaFrase:
        'Oito campos anotam o que você fez. Só um anota quanto ganhou ou perdeu. A peça que ' +
        'amarra tudo é o campo 7.',
      // campos: [ ... ] e rodape: '...' — o formulário em branco fica como está.
      paragrafos: [
        'O formulário acima é o diário inteiro: nove campos, em branco, para você copiar no seu ' +
          'caderno. A proporção entre eles é a mensagem principal. Oito campos registram ' +
          'comportamento — o que você decidiu, quando, com quanto, por quê e como estava se ' +
          'sentindo. Um único campo, o nono, registra resultado em dinheiro. Um diário com essa ' +
          'proporção invertida é um extrato, não um diário.',
        'Os campos se dividem em dois momentos, e essa divisão é o que dá valor a eles. Os campos 1 ' +
          'a 6 são escritos antes de você saber como termina: a regra, os dados da entrada, o plano ' +
          'de saída, a tese em uma frase, a convicção numa escala fixa de 1 a 5 e o seu estado ' +
          'emocional na hora de clicar. Depois vêm o campo 7, a saída executada, e só então os ' +
          'campos 8 e 9. Escrever os seis primeiros depois do resultado não é atraso: é perder o ' +
          'dado, porque a memória já reescreveu a história.',
        'O campo 7 está em destaque por um motivo mecânico. Ele anota a hora, o preço e o que ' +
          'disparou a saída — stop, alvo, tempo ou decisão na hora. Sem ele, o campo 8, "segui a ' +
          'regra?", vira lembrança, e lembrança é exatamente o que os vieses corrompem. Com ele, a ' +
          'resposta do campo 8 sai de uma comparação entre textos: o que estava escrito nos campos ' +
          '1 e 3 contra o que está registrado no campo 7.',
        'Dois campos parecem opcionais e não são. A convicção de 1 a 5 só vira informação depois de ' +
          'muitas operações, quando dá para olhar para trás e perguntar se convicção alta acertou ' +
          'mais ou se ela só fez você apostar mais — são coisas diferentes, e sem a escala anotada ' +
          'não dá para distinguir. O estado emocional na entrada serve para o mesmo tipo de ' +
          'pergunta: pressa, medo de ficar de fora e vontade de recuperar uma perda deixam rastro ' +
          'no diário muito antes de deixarem rastro no saldo.',
      ],
      exemplo: {
        titulo: 'Como o campo 8 é respondido sem usar a memória',
        passos: [
          'Campo 1: a regra que você colou antes da entrada.',
          'Campo 3: o preço de entrada, a saída por perda programada e o alvo, escritos antes de saber o desfecho.',
          'Campo 7: a hora, o preço e o que disparou a saída de verdade.',
          'Campo 8: compare 1 e 3 com 7. Se bate, foi sim. Se não bate, foi não — e o não é o registro mais útil do diário.',
          'Só depois disso o campo 9, o resultado em dinheiro, é preenchido. Ele não muda a resposta do campo 8.',
        ],
      },
      paragrafosFinais: [
        'O erro que esse formato evita é o diário que só anota resultado. Ele parece objetivo, ' +
          'porque só tem número, e é justamente o menos informativo: o resultado de uma operação ' +
          'isolada é quase todo sorte, e um caderno cheio de resultados não permite responder a ' +
          'única pergunta que a revisão sabe responder, que é se você fez o que tinha escrito.',
        'Nada digitado nesta tela é salvo. O diário é seu e mora fora do hub — no caderno, na ' +
          'planilha, onde você quiser. O que o hub faz aqui é mostrar quais campos deixam a revisão ' +
          'possível.',
      ],
    },
```

---

## olhar-pouco

ANTES: um parágrafo de 211 caracteres sobre a cadência semanal; a figura "A pergunta da revisão" com os cinco vieses já estava lá.
`pergunta: REMOVER (hoje 'q5')`

```js
    {
      id: 'olhar-pouco',
      aba: 'revisao',
      titulo: 'Olhe o resultado pouco, e o comportamento muito',
      emUmaFrase:
        'Olhar o dinheiro toda hora piora a decisão. Revisar se você seguiu a regra é outra ' +
        'coisa, e ajuda.',
      // comparacao: { ... } e aPergunta: { ... } — os dois visuais ficam como estão.
      paragrafos: [
        'Existem duas revisões diferentes, e o módulo trata elas de formas opostas. Uma é olhar o ' +
          'resultado em dinheiro: quanto estou ganhando ou perdendo agora. A outra é revisar o ' +
          'comportamento: eu fiz o que estava escrito? Parecem a mesma atividade porque acontecem ' +
          'no mesmo caderno, e não são.',
        'Olhar o dinheiro com frequência piora a decisão sob risco — foi isso que os experimentos ' +
          'mediram. O nome do efeito é aversão míope à perda. "Míope" aqui é literal: de tanto ' +
          'olhar de perto, cada perda isolada ocupa o campo de visão inteiro e pesa mais do que ' +
          'deveria numa sequência longa. Tem um detalhe que incomoda: as pessoas preferem olhar com ' +
          'frequência, mesmo quando isso as prejudica. Ou seja, a vontade de conferir não é um sinal ' +
          'de que conferir ajuda.',
        'A revisão do comportamento é a que tem lastro, e ela usa uma pergunta específica. Não ' +
          'pergunte se o resultado foi bom: essa pergunta convida os cinco vieses do desenho, ' +
          'porque ela já começa com o desfecho na mão. Pergunte se a decisão foi boa, dado o que ' +
          'você sabia antes. Essa segunda pergunta é desconfortável e tem uma vantagem enorme: ela ' +
          'só se responde com o diário aberto, e não de memória.',
        'Vale ler os cinco vieses do desenho sabendo que eles não são defeitos de caráter, são o ' +
          'funcionamento normal da cabeça. A retrospectiva faz parecer que você sabia; a ' +
          'autoatribuição guarda o ganho como habilidade e a perda como azar, e é daí que sai o ' +
          'excesso de confiança; o viés de resultado julga a decisão pelo desfecho; a ilusão de ' +
          'controle faz achar que você influencia o que é sorte; e o padrão no ruído faz ver ' +
          'sequência onde há acaso — num histórico curto de cauda pesada, quase todo padrão é ' +
          'ruído.',
        'Sobre a frequência, a resposta honesta é que ninguém mediu. Qual a cadência ideal de ' +
          'revisão para quem opera? Não existe número publicado. Semanal é uma escolha razoável ' +
          'para começar; trate como um teste seu, não como verdade — e anote a data, para poder ' +
          'rever a escolha depois como se fosse qualquer outra parte da regra.',
      ],
      exemplo: {
        titulo: 'Uma revisão que olha o comportamento, na ordem',
        passos: [
          'Abra as operações da semana e leia primeiro os campos 1 e 3: o que estava escrito antes.',
          'Leia o campo 7: o que de fato foi executado, com hora e preço.',
          'Responda o campo 8 comparando os dois. Conte quantos sim e quantos não.',
          'Só no fim, olhe o campo 9, o resultado em dinheiro — e olhe uma vez.',
          'A conversa da revisão é sobre a coluna dos "não", não sobre o saldo.',
        ],
      },
      paragrafosFinais: [
        'O erro que essa ordem evita é o viés de resultado disfarçado de autocrítica: abrir a ' +
          'revisão pelo saldo, ver vermelho e concluir que a regra está errada; ver verde e concluir ' +
          'que está certa. Nos dois casos a conclusão veio do desfecho, que em cauda pesada é quase ' +
          'todo sorte no curto prazo. Começar pelos campos escritos antes não é preciosismo: é a ' +
          'única ordem em que a pergunta certa ainda cabe.',
      ],
      detalhe: {
        titulo: 'de onde vem a aversão míope à perda',
        paragrafos: [
          'Os experimentos são de Gneezy, Kapteyn & Potters (2003) e Fellner & Sutter (2009), ' +
            'ambos publicados em revistas revisadas por pares.',
          'Eles mediram decisão sob risco em ambiente de experimento, com a frequência de ' +
            'informação sendo manipulada. Nenhum deles mediu a cadência ideal de revisão para quem ' +
            'opera memecoin — esse número não existe, e o hub não vai inventar um.',
        ],
      },
    },
```

---

## amostra

ANTES: dois parágrafos, 501 caracteres, já com cauda pesada e Bailey & López de Prado — mas sem explicar o que é SR nem o que a conta significa.
`pergunta: REMOVER (hoje 'q6')`

```js
    {
      id: 'amostra',
      aba: 'revisao',
      titulo: 'Quantas operações provam alguma coisa',
      emUmaFrase:
        '30 operações boas não provam habilidade. No melhor caso seriam centenas, e em cauda ' +
        'pesada talvez nenhum número baste.',
      // barras: { ... } — as três barras ficam como estão.
      paragrafos: [
        'Esta seção responde a pergunta que toda revisão acaba fazendo: a partir de quantas ' +
          'operações dá para dizer que o resultado veio da regra, e não da sorte? A resposta tem ' +
          'uma fórmula, e ela é desanimadora de propósito.',
        'Primeiro, o que é SR. É o Sharpe por operação: o retorno médio por operação dividido pelo ' +
          'desvio-padrão desses retornos. Desvio-padrão é uma medida de quanto os resultados variam ' +
          'em torno da média — quanto maior, mais bagunçada é a série. Então o SR pergunta o ' +
          'seguinte: o ganho médio é grande comparado com o tamanho normal das oscilações? Um SR ' +
          'pequeno significa que a vantagem, se existir, está enterrada no ruído.',
        'A conta é n ≈ (2 ÷ SR)², e as três barras acima estão na mesma escala, de 0 a 1.600 ' +
          'operações, para dar para comparar de olho. Com SR de 0,1 por operação, que já é um ' +
          'número bom, seriam necessárias 400 operações para o resultado se distinguir de zero. Com ' +
          'SR de 0,05, metade do anterior, seriam 1.600 — quatro vezes mais, porque a conta é ' +
          'quadrática: o SR entra elevado ao quadrado, então cortar o SR pela metade multiplica a ' +
          'amostra por quatro.',
        'A primeira barra é a sua: 30 operações. Ela quase não aparece ao lado das outras duas, e é ' +
          'esse o recado. Vinte lucros em 30 operações cabem perfeitamente na sorte — não é que ' +
          'seja provável que tenha sido sorte, é que esse resultado não permite separar as duas ' +
          'coisas. E tem um agravante que a barra não mostra: taxa de acerto sozinha não diz nada ' +
          'sem o tamanho dos ganhos e das perdas.',
      ],
      quadro: [
        {
          rotulo: 'Conta, não medição',
          texto:
            'Os 400 e os 1.600 saem da fórmula de Lo (2002), aplicada a dois valores de SR ' +
            'escolhidos como exemplo. Ninguém mediu o SR de ninguém aqui.',
        },
        {
          rotulo: 'E a conta tem uma condição',
          texto:
            'Ela vale só com variância finita, isto é, num mundo em que as oscilações têm um ' +
            'tamanho típico. Em memecoin essa condição é justamente a que está em dúvida.',
          destaque: true,
        },
      ],
      paragrafosFinais: [
        'Em cauda pesada, a média converge muito mais devagar, então até esses números seriam ' +
          'otimistas. E se a média nem existir, nenhum número de operações distingue habilidade de ' +
          'sorte pela média — não é uma questão de juntar mais dados, é que o alvo não fica parado. ' +
          'Vale repetir a ressalva: ninguém publicou o índice de cauda das memecoins, então isso é ' +
          'uma premissa herdada de estudos de cripto, não uma medição feita aqui.',
        'Tem ainda um agravante que não é sobre o tamanho da amostra: testar várias versões da ' +
          'própria regra e ficar com a que "funcionou" infla o resultado. Com só três tentativas ' +
          'independentes, a melhor já é provavelmente falsa. Isso acontece porque, quanto mais ' +
          'versões você experimenta, maior a chance de uma delas parecer boa só por acaso — e é ' +
          'exatamente a que parece boa que você escolhe guardar.',
        'O erro que essa seção evita é o de promover a própria sorte a habilidade, e é um erro ' +
          'simpático: ele chega depois de uma sequência boa, junto com a sensação de que finalmente ' +
          'entendi o jogo. A conclusão prática é modesta e vale para o módulo inteiro: o diário ' +
          'serve para saber se você seguiu a regra, não para provar que ela ganha.',
      ],
      detalhe: {
        titulo: 'quando nenhum número de operações basta',
        paragrafos: [
          'A conta n ≈ (2 ÷ SR)² é de Lo (2002), "The Statistics of Sharpe Ratios". O resultado ' +
            'sobre escolher a melhor entre poucas tentativas é de Bailey & López de Prado (2021).',
          'O caso extremo tem nome técnico: com cauda pesada demais (α ≤ 1), a média da amostra ' +
            'nunca se estabiliza. O α é o índice de cauda — quanto menor ele é, mais pesada é a ' +
            'cauda. Abaixo desse limite, juntar mais operações não faz a média assentar, e por isso ' +
            'o número de operações que bastaria é: nenhum.',
        ],
      },
    },
```

---

## mitos

ANTES: um parágrafo de 238 caracteres com a defesa em três perguntas; a tabela de seis mitos já carregava os números.
`pergunta: REMOVER (hoje 'q7')`

```js
    {
      id: 'mitos',
      aba: 'mitos',
      titulo: 'O que dizem × o que a evidência mostra',
      emUmaFrase:
        'Número preciso, nome de universidade e prazo curto: é o formato da estatística que ' +
        'vende curso e ferramenta.',
      // rotulos: { ... } e itens: [ ... ] — a tabela fica como está.
      paragrafos: [
        'A tabela acima tem três colunas de propósito: o que dizem, se tem fonte, e o que a ' +
          'evidência mostra. A coluna do meio é a que quase nunca aparece quando esses números ' +
          'circulam, e é a que decide tudo. Repare no formato repetido: um número preciso demais ' +
          '(23%, 73%, 95%), um prazo curto e redondo (60 dias, 90 dias) e, de vez em quando, um ' +
          'nome de instituição para dar peso. O formato é o produto.',
        'Dois termos em inglês aparecem nessa lista e merecem tradução. Drawdown é a maior queda do ' +
          'topo ao fundo do seu capital: a promessa de "reduzir o drawdown máximo em 25% a 30%" ' +
          'está dizendo que o seu pior momento seria menos pior — só que sem amostra e sem método ' +
          'publicados, não dá nem para saber de onde essa comparação veio. CFD, o produto do dado ' +
          'europeu, é contrato por diferença: um contrato ligado ao preço de um ativo, em geral ' +
          'alavancado, em que você não tem o ativo. E day trade é comprar e vender no mesmo dia.',
        'O caso mais instrutivo da tabela é o do "estudo da Universidade da Califórnia", porque ele ' +
          'não é invenção pura: é distorção de dois estudos reais. Existe mesmo um estudo famoso de ' +
          'Berkeley, e ele mostra o quase oposto — quem mais opera ganha menos. E o número 73 existe ' +
          'mesmo, só que em outro estudo, sobre outra coisa, e sem nenhuma relação com diário. ' +
          'Distorção é mais difícil de detectar do que mentira, porque cada pedaço, sozinho, ' +
          'resiste a uma busca rápida.',
        'Isso importa porque esses números vão chegar até você — em anúncio, em vídeo, em curso — e ' +
          'quase sempre no momento em que você está mais disposto a acreditar. Ter lido a tabela ' +
          'uma vez não é para decorar os seis casos: é para reconhecer o formato quando o sétimo ' +
          'aparecer.',
      ],
      listaTitulo: 'As três perguntas que desmontam quase todos',
      lista: [
        'De onde vem o número? Um estudo com autor e método, ou um blog de plataforma que vende a ferramenta?',
        'Qual foi a amostra? Quantas pessoas, em que país, em que período?',
        'Comparado com quê? Um resultado sem grupo de comparação não é um resultado, é uma frase.',
      ],
      ordenada: true,
      exemplo: {
        titulo: 'Os números que sobrevivem às três perguntas',
        passos: [
          'Nos EUA: 66.465 contas, e quem mais operava teve 11,4% ao ano contra 17,9% do mercado (Barber & Odean, 2000).',
          'Em Taiwan: menos de 1% dos day traders ganha de forma previsível depois das taxas, com dados de 1992 a 2006.',
          'Na Europa: 74% a 89% das contas de varejo em CFD perdem dinheiro, segundo o regulador europeu (ESMA, 2018).',
          'No Brasil: entre 1.551 day traders da B3 que persistiram mais de 300 dias, 97% perderam dinheiro e só 1,1% ganhou mais que um salário mínimo.',
          'Nesse mesmo estudo brasileiro, os autores não acharam evidência de aprendizado — o que derruba o "com prática, você fica lucrativo".',
        ],
      },
      paragrafosFinais: [
        'O erro que essa seção evita tem duas caras, e a segunda é menos óbvia. A primeira é ' +
          'engolir o número bonito por causa do nome que vem junto. A segunda é o efeito rebote: ' +
          'descobrir que o "95% dos traders falham" é folclore e concluir que, então, nada disso ' +
          'vale e o pessimismo todo era exagero. Não é o caso. Os dados que existem de verdade, com ' +
          'amostra e método, apontam todos para o mesmo lado: a maioria de quem opera com ' +
          'frequência perde. O que muda não é a conclusão, é a qualidade da prova.',
      ],
      detalhe: {
        titulo: 'o que é cada fonte desta tabela',
        paragrafos: [
          'A B3 é a bolsa brasileira; a ESMA é o regulador de mercados da União Europeia, e a ' +
            'medida dela é de 23/03/2018, com perda média por cliente de € 1.600 a € 29.000.',
          'O dado brasileiro dos 97% é de Chague, De-Losso & Giovannetti, da FGV, e é um working ' +
            'paper: um artigo de trabalho, divulgado antes de passar pela revisão por pares. Vale ' +
            'saber disso — e, mesmo assim, é o dado brasileiro mais bem medido que existe sobre day ' +
            'trade, porque tem amostra identificada, período longo e método descrito.',
          'O "verdadeiro estudo da Califórnia" é Barber & Odean (2000), "Trading Is Hazardous to ' +
            'Your Wealth". O número 73 vem do estudo de day traders de Taiwan (Barber, Lee, Liu & ' +
            'Odean, 2014): é a diferença diária, em centésimos de ponto, entre os melhores e os ' +
            'piores — e não tem nada a ver com manter diário.',
          'Já os números sem fonte da tabela — o "23% em 60 dias" e o "drawdown 25% a 30%" — vêm ' +
            'de blogs de plataforma de diário, sem estudo, sem autor e sem método. Não é que ' +
            'sejam falsos: é que não há nada para conferir.',
        ],
      },
    },
```

---

## APONTAMENTOS

1. **A "Pergunta rápida" saiu de 7 seções**, conforme a decisão de hoje: `ciclo` (q4), `fracao-fixa` (q2), `sequencia-de-perdas` (q3), `duas-frases` (q1), `olhar-pouco` (q5), `amostra` (q6) e `mitos` (q7). O array `quiz` continua intacto, com as 8 perguntas. Atenção: `porqueErradas` traz `q8`, e `q8` não é usada por nenhuma seção — ela só aparece no quiz do fim, o que continua correto.

2. **`perguntaAntes` não foi tocada.** Ela é um campo do módulo, não das seções: `{ regra: 'q4', tamanho: 'q3', diario: 'q1', revisao: 'q6', mitos: 'q7' }`, e alimenta o "Antes de ler: o que você acha?" no topo de cada aba. Como a decisão de hoje falou só da "Pergunta rápida" de dentro dos cards, deixei como está — mas repare que, tirando a pergunta do fim do card, a mesma pergunta do topo da aba **deixa de voltar corrigida** (o comentário do arquivo, na linha 63-64, diz que ela "volta corrigida na Pergunta rápida"). Decisão sua: ou o "Antes de ler" também sai, ou esse comentário precisa mudar.

3. **`ruina` e `por-que-antes` não tinham `pergunta`** e continuam sem. `cinco-partes` e `nove-campos` também não tinham.

4. **Três seções ficaram sem exemplo numérico, de propósito.** Em `cinco-partes` e `ciclo`, qualquer número que eu colocasse viraria um limiar sugerido — exatamente o que o aviso do cabeçalho proíbe. Em `cinco-partes` contornei usando o capital 100 e o 90 que já existem no exemplo da aba O tamanho, sem calcular nada novo. Em `ciclo` o exemplo é dos três fins possíveis, sem número.

5. **`stop-automatico` não tem número no arquivo** — só "Reduz" e "Seguraram menos as posições perdedoras". Escrevi isso explicitamente no texto ("o módulo não guarda um número de quanto reduziu"). Se você quiser o tamanho do efeito, ele precisa vir de uma nova checagem da fonte, não de mim.

6. **O atalho de 25% da calculadora não tem resultado calculado em lugar nenhum do arquivo.** Só o caso de 10% com 5 perdas tem os dois números (59% e +69%, na explicação da q3). Por isso o texto manda você *trocar entre os atalhos e observar*, em vez de citar um resultado para 25% — eu teria de calcular, e calcular é proibido aqui.

7. **Divergência de rótulo em `fracao-fixa`, não corrigida.** No visual `mecanismo`, o terceiro passo tem `momento: 'Próxima posição'` e `capital: '9'` — mas 9 é o *tamanho da posição*, não o capital, que continua 90. A coluna se chama "Capital de hoje" no primeiro passo. Pode confundir. Não mexi porque é campo de visual e porque mexer mudaria um número de lugar.

8. **Números que usei e de onde vieram** (todos já existiam no arquivo): 82% e 28% (detalhe de `por-que-antes`); 100/90/9 (visual de `fracao-fixa`); 1% a 2% e f* = 0 com (0,5 × 1 − 0,5) ÷ 1 (parágrafo e `destaques.tamanho`); 90%, 0,9^5 = 0,59, +69% e +100% (`porqueErradas.q3`, explicação da q3 e `destaques.tamanho`); 18 em 38, 50 fichas, 100 fichas, 99,5% e 68,67% (visual de `ruina`); 138 experimentos, 19.951 pessoas, d = 0,40, 61 e 50 em 100, régua 0,2/0,5/0,8 (visual de `duas-frases`); campos 1 a 9 e escala de 1 a 5 (visual de `nove-campos`); 30, 400, 1.600, SR 0,1 e 0,05, três tentativas, α ≤ 1 (visual de `amostra`, `destaques.revisao`); 23%, 60 dias, 73, 25% a 30%, 95%, 74% a 89%, € 1.600 a € 29.000, 66.465, 11,4% × 17,9%, menos de 1%, 1992 a 2006, 1.551, 97%, 1,1%, 23/03/2018 (visual de `mitos`, `destaques.mitos` e `destaques.regra`).

9. **Nenhum card ficou longo a ponto de precisar ser dividido**, na minha leitura. O mais pesado é `olhar-pouco`, que tem cinco parágrafos porque carrega dois visuais (a comparação e a figura "A pergunta da revisão") e os cinco vieses. Se você achar que ficou grande na tela, a divisão natural é: "Olhe o resultado pouco" (comparação + cadência) vira uma seção, e "A pergunta da revisão" (figura + os cinco vieses) vira outra, na mesma aba. Os dois blocos de dados já são independentes no arquivo, então a divisão é mecânica.

10. **Escrevi o texto assumindo que o visual aparece antes dos parágrafos**, como você disse. Por isso uso "o desenho acima", "os dois cartões acima", "a tabela acima". Em `olhar-pouco`, que tem dois visuais e eu não sei a ordem entre eles, usei "o desenho" sem dizer acima ou abaixo.

11. **Nada de aconselhamento.** Em `fracao-fixa`, `sequencia-de-perdas` e `ruina`, toda frase que chegava perto de um tamanho de posição termina devolvendo a decisão para você. O "1% a 2%" continua marcado como convenção de mercado sem estudo, e o exemplo de 10% continua marcado como exemplo do arquivo.

## TERMOS TRADUZIDOS

Varredura dos jargões do módulo, na ordem das seções. "Estreia" = onde ele passa a ser explicado pela primeira vez no texto novo.

| Termo | Estreia (seção) | Como fica explicado |
|---|---|---|
| viés de retrospectiva | `por-que-antes`, parágrafo 2 | a impressão de que o que aconteceu era previsível, que só aparece depois de ter acontecido |
| viés de autoatribuição | `por-que-antes`, parágrafo 2 | fico com o mérito do ganho e empurro a perda para o azar |
| pré-compromisso | `por-que-antes`, `exemplo` e `detalhe` | o compromisso travado antes, com o caso da conta de poupança |
| revisado por pares | `por-que-antes`, `detalhe` | outros pesquisadores da área leram e criticaram o trabalho antes de ele ser publicado |
| paywall | `por-que-antes`, `detalhe` | usado no mesmo contexto do original; o sentido fica claro pela frase ("confirmados por artigos que os citam, não pelos textos originais") |
| verificável | `cinco-partes`, parágrafo 2 | outra pessoa, lendo só o seu diário semanas depois, consegue dizer sim ou não |
| checklist | `ciclo`, parágrafo 2 | a lista de conferência do hub, o filtro mínimo igual para qualquer token |
| gatilho | `ciclo`, parágrafo 2 | contrastado com o checklist: o gatilho é só seu |
| stop-loss / stop | `stop-automatico`, parágrafo 1 | ordem de venda automática: você programa antes um nível, e a venda acontece sozinha |
| slippage | `stop-automatico`, parágrafo 4 | o deslizamento entre o preço que você via e o preço em que a ordem de fato saiu |
| banca | `fracao-fixa`, parágrafo 1 | o capital todo que você separou para isso |
| fração fixa | `fracao-fixa`, parágrafo 1 | uma porcentagem aplicada sobre o capital de hoje; fixa é a porcentagem, não o valor |
| critério de Kelly | `fracao-fixa`, `detalhe` | que fração apostar para o capital crescer o mais rápido possível no longo prazo |
| μ (retorno esperado) | `fracao-fixa`, `detalhe` | a média dos resultados |
| σ² (variância) | `fracao-fixa`, `detalhe` | o tamanho típico das oscilações em torno da média |
| cauda pesada | `fracao-fixa`, `detalhe` | distribuição em que os casos extremos aparecem com frequência alta demais para a média se comportar |
| ruína do apostador | `ruina`, parágrafo 1 | alguém que aposta repetidamente com desvantagem pequena e só para ao quebrar ou ao chegar num alvo |
| meta-análise | `duas-frases`, parágrafo 3 | um estudo que junta os resultados de muitos experimentos e calcula um efeito comum |
| d (tamanho de efeito) | `duas-frases`, parágrafo 3 | uma régua: 0,2 pequeno, 0,5 médio, 0,8 grande |
| aversão míope à perda | `olhar-pouco`, parágrafo 2 | de tanto olhar de perto, cada perda isolada ocupa o campo de visão inteiro |
| viés de resultado | `olhar-pouco`, parágrafo 4 | julgar a decisão pelo desfecho |
| ilusão de controle | `olhar-pouco`, parágrafo 4 | achar que você influencia o que é sorte |
| padrão no ruído | `olhar-pouco`, parágrafo 4 | ver sequência onde há acaso |
| SR (Sharpe por operação) | `amostra`, parágrafo 2 | o retorno médio por operação dividido pelo desvio-padrão desses retornos |
| desvio-padrão | `amostra`, parágrafo 2 | medida de quanto os resultados variam em torno da média |
| variância finita | `amostra`, `quadro` | um mundo em que as oscilações têm um tamanho típico |
| quadrática | `amostra`, parágrafo 3 | o SR entra elevado ao quadrado, então cortar o SR pela metade multiplica a amostra por quatro |
| α (índice de cauda) | `amostra`, `detalhe` | quanto menor ele é, mais pesada é a cauda |
| drawdown | `mitos`, parágrafo 2 | a maior queda do topo ao fundo do seu capital |
| CFD | `mitos`, parágrafo 2 | contrato por diferença: contrato ligado ao preço de um ativo, em geral alavancado, sem você ter o ativo |
| day trade / day trader | `mitos`, parágrafo 2 | comprar e vender no mesmo dia |
| B3 | `mitos`, `detalhe` | a bolsa brasileira |
| ESMA | `mitos`, `detalhe` | o regulador de mercados da União Europeia |
| working paper | `mitos`, `detalhe` | artigo de trabalho, divulgado antes de passar pela revisão por pares |

Termos que **não** glosei, por serem assunto central do hub e já explicados em módulos anteriores: memecoin, token, blockchain, on-chain, corretora. Se você quiser uma glosa curta de algum deles aqui também, é uma linha em cada seção onde estreiam.
