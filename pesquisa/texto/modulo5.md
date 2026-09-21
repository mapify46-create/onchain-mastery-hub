# Módulo 5 — texto reescrito

Medi o texto corrido (paragrafos + paragrafosFinais) das 16 seções antes de começar: 2.519 caracteres no módulo inteiro, e **oito seções com zero parágrafos** — anatomia-da-tela, a-taxa-anunciada-nao-e-o-custo, calculadora-de-atrito, calculadora-de-impacto, tipos-de-ordem, a-venda-nao-caiu, do-token-ao-encerramento e registro-para-imposto. Nessas oito o card é só título, uma frase e o desenho: o visual está explicando sozinho, e quem não já sabia não aprende. A aba Taxas continua sendo a melhor do projeto na parte dos números (a matriz e o caminho do dinheiro estão certos e completos), mas até ela estava sem a prosa que liga os números à lição.

Os blocos DEPOIS trazem só os campos de texto. Onde o campo é visual ou é dado de calculadora, deixei uma linha de comentário `// <campo>: sem mudança` para quem for colar não apagar nada por engano.

---

## as-tres-camadas

ANTES: 1 parágrafo sobre "você paga conveniência, não preço melhor" — 255 caracteres. DEX, pool, swap, bonding curve e holders apareciam sem nenhuma explicação.

DEPOIS:

```js
      titulo: 'As três camadas entre a carteira e a pool',
      emUmaFrase:
        'Toda troca termina numa pool de liquidez. O que muda entre os três jeitos é o que ' +
        'fica entre você e essa pool — e só o terminal soma uma taxa própria por cima.',
      // pilha: sem mudança
      // tabela: sem mudança
      paragrafos: [
        'Uma troca de token não acontece entre duas pessoas. Ela acontece contra uma pool de ' +
          'liquidez: um par de reservas — por exemplo, SOL de um lado e o token do outro — ' +
          'guardado dentro de um contrato inteligente. Você entrega SOL a esse contrato e ele ' +
          'te devolve token, pelo preço que a proporção entre as duas reservas define naquele ' +
          'instante. O apelido dessa troca é swap, que em inglês quer dizer simplesmente troca.',
        'Quem hospeda essas pools é uma DEX, sigla de decentralized exchange: corretora ' +
          'descentralizada, um programa aberto rodando na blockchain, sem empresa nenhuma ' +
          'segurando o seu dinheiro. Raydium, Orca e PumpSwap são exemplos. Um token ' +
          'recém-criado costuma começar antes disso, numa bonding curve — curva de emissão: ' +
          'ali ainda não existe pool com duas reservas, existe um contrato que vende o token a ' +
          'um preço que sobe a cada compra e cai a cada venda. É por isso que a taxa cobrada ' +
          'nessa fase, 1,25% na bonding curve do pump.fun, é outra coisa que os 0,25% de uma ' +
          'DEX como a Raydium.',
        'O agregador é a camada do meio, e é a mais estranha das três porque ele não guarda ' +
          'liquidez nenhuma. Ele varre várias DEXs, compara o preço de cada uma e escolhe a ' +
          'rota — às vezes dividindo a sua ordem entre duas pools, se isso render mais token. ' +
          'O Jupiter é o exemplo aqui e, no modo manual, não cobra taxa de protocolo no swap ' +
          'básico. É a única camada que pode melhorar o seu preço sem cobrar por isso.',
        'O terminal de execução é a camada de cima: a tela bonita. Ele mostra tokens novos ' +
          'assim que nascem, desenha gráficos, lista os holders — as carteiras que têm aquele ' +
          'token —, oferece botões de compra rápida e deixa você seguir carteiras de outras ' +
          'pessoas. E quase sempre ele usa um agregador por baixo, ou seja: você já está ' +
          'pagando por aquela camada mesmo sem saber que ela existe. O que ele acrescenta de ' +
          'seu é a taxa própria — 0,95% líquido no nível de entrada — cobrada por cima de tudo ' +
          'o que as camadas de baixo já cobraram.',
        'O que você paga ao usar um terminal é conveniência: descoberta de tokens novos, ' +
          'gráficos, dados de holders, botões de compra rápida e rastreamento de carteiras. ' +
          'Você não paga por um preço melhor — é neste ponto que o marketing da categoria ' +
          'mais escorrega. E essa é exatamente a conta que decide se a taxa vale a pena para ' +
          'você: está comprando ferramenta, não execução superior.',
        'Na tela nada disso aparece separado. Você vê um campo, um botão e um número de taxa. ' +
          'A pilha aqui em cima é o que acontece depois do clique: a sua assinatura sai da ' +
          'carteira, passa pelo terminal, passa pelo agregador e termina na pool. Saber o ' +
          'caminho responde à pergunta "por que estou pagando isso?" e mostra o que sobra se o ' +
          'terminal sumir: a pool continua lá, e os seus tokens continuam na sua carteira, ' +
          'desde que as chaves sejam suas.',
      ],
      exemplo: {
        titulo: 'A mesma troca, por três caminhos',
        passos: [
          'Pela pool direto, na Raydium: você paga só a taxa da pool, 0,25%.',
          'Pelo agregador, no modo manual do Jupiter: nenhuma taxa de protocolo no swap ' +
            'básico, e a taxa da DEX por baixo continua sendo cobrada.',
          'Pelo terminal: as taxas de baixo continuam todas, e o Axiom soma 0,95% líquido no ' +
            'nível de entrada por cima delas.',
          'O token que chega na carteira é o mesmo nos três caminhos. O que muda é quanto do ' +
            'seu dinheiro chegou até a pool.',
        ],
      },
      paragrafosFinais: [
        'Nenhuma dessas camadas é obrigatória e nenhuma delas é vilã. O erro que entender a ' +
          'pilha evita é achar que o terminal é onde a troca acontece. Ele é a vitrine. A ' +
          'troca acontece na pool — e é por isso que a taxa dele aparece somada às outras, e ' +
          'nunca no lugar delas.',
      ],
      // detalhe: sem mudança
```

---

## anatomia-da-tela

ANTES: zero caracteres de texto corrido. Só título, emUmaFrase e o mockup com a legenda numerada.

DEPOIS:

```js
      titulo: 'Anatomia da tela de um terminal',
      emUmaFrase:
        'O que cada painel mostra, e o que cada um não prova. Ler os painéis reduz surpresa; ' +
        'não garante segurança.',
      // anatomia: sem mudança
      paragrafos: [
        'A tela de um terminal é sempre a mesma ideia, com nomes diferentes: um gráfico ' +
          'grande, uma tira de números, uma lista de quem tem o token, um feed do que está ' +
          'sendo negociado agora, um campo para digitar a quantia e um botão. A grade aqui em ' +
          'cima é essa divisão, de propósito sem valores: o que se aprende nesta seção é onde ' +
          'olhar, não quanto um número específico vale.',
        'Cada painel responde a uma pergunta diferente, e nenhum responde à pergunta que você ' +
          'mais quer fazer. O gráfico conta o passado. Os números contam o tamanho. Os holders ' +
          'contam a concentração. O feed conta o ritmo. Nenhum deles diz se o token é seguro, ' +
          'e nenhum diz para onde o preço vai. Quem lê os painéis compra com menos surpresa; ' +
          'não compra com garantia.',
        'Três palavras aparecem nesses painéis e voltam no resto do módulo. Market cap é o ' +
          'valor de mercado do token: o preço multiplicado pela quantidade em circulação. ' +
          'Liquidez é o tamanho da reserva dentro da pool, ou seja, quanto dinheiro está de ' +
          'fato disponível para trocar. E bundle é um pacote de transações enviadas juntas ' +
          'para o mesmo bloco — quatro ou mais compras no mesmo bloco podem ser demanda ' +
          'coordenada fingindo ser orgânica, e a própria documentação admite falsos positivos ' +
          'nessa detecção.',
        'Dos quatro painéis de informação, o que mais mexe com a SUA ordem é o da liquidez. ' +
          'Pool rasa quer dizer reserva pequena, e reserva pequena quer dizer que a sua ' +
          'própria compra empurra o preço para cima antes de ser executada. Essa distância ' +
          'entre o preço que você viu e o preço que você pagou tem nome: slippage, em ' +
          'português deslizamento. A aba Configurações trata dela por inteiro; por ora basta ' +
          'ligar as duas pontas — liquidez pequena, deslizamento grande.',
      ],
      exemplo: {
        titulo: 'Os dois painéis de baixo, que ninguém lê',
        passos: [
          'O campo de quantia guarda o último valor que você usou.',
          'O botão de compra rápida executa o valor pré-configurado num clique, sem tela de ' +
            'revisão.',
          'Se a operação anterior foi maior, é esse valor maior que continua ali.',
          'O painel mais perigoso da tela não é o gráfico: é o campo que você acha que já ' +
            'conferiu.',
        ],
      },
      paragrafosFinais: [
        'O erro que essa leitura evita é confundir painel cheio com token verificado. Nenhum ' +
          'indicador, sinal social ou rastreamento de carteira prova que um token é seguro. E ' +
          'o painel que mais convida ao erro é o gráfico, porque a vela que já subiu é ' +
          'exatamente a que dá vontade de perseguir — o que é falha de disciplina, não de ' +
          'análise.',
      ],
```

---

## custodia-do-axiom

ANTES: 1 parágrafo sobre a semente exportável ser a prova prática — 265 caracteres, mais a lista de três achados da documentação (sem título). Custodial, não-custodial, chave privada e semente apareciam sem definição.

pergunta: REMOVER (hoje 'q1')

DEPOIS:

```js
      titulo: 'Custodial × não-custodial: os sinais na tela',
      emUmaFrase:
        'Antes de usar qualquer plataforma, pergunte: quem guarda as chaves? A resposta muda ' +
        'o seu risco por completo.',
      // modelos: sem mudança
      // descricaoDosModelos: sem mudança
      // legendaDosModelos: sem mudança
      paragrafos: [
        'Uma chave privada é o que assina transações. Quem tem a chave pode mover o dinheiro, ' +
          'e quem não tem não pode — nem sendo o dono. Custodial é o arranjo em que a empresa ' +
          'guarda essa chave por você: o dinheiro sai da sua carteira e vira um saldo dentro ' +
          'do sistema dela, como em qualquer corretora. Não-custodial é o contrário: a chave ' +
          'fica com você, o saldo nunca sai da blockchain, e a plataforma só monta a ' +
          'transação e pede a sua assinatura.',
        'Essa pergunta muda a natureza do risco, não o tamanho dele. No modelo custodial você ' +
          'acrescenta um risco que antes não existia: o risco de contraparte do Módulo 1. Se ' +
          'a empresa cair, for invadida ou agir de má-fé, o seu saldo vai junto — porque ele ' +
          'era uma promessa dela, e não uma posição sua. No modelo não-custodial esse risco ' +
          'some, e no lugar dele entra a responsabilidade: nenhum suporte recupera fundos ' +
          'perdidos, reverte uma assinatura ou desfaz uma operação ruim.',
        'Dá para descobrir em que modelo você está sem ler um único termo de uso, olhando ' +
          'três sinais na tela. Onde está o saldo: dentro da plataforma, ou no seu endereço? ' +
          'Existe um botão "Depositar"? Depositar significa entregar, e quem tem as chaves tem ' +
          'o dinheiro. E existe uma frase de recuperação exportável — a semente, aquela lista ' +
          'de palavras na ordem que recria a carteira inteira em qualquer outro aplicativo?',
        'O terceiro sinal é o mais forte dos três, e por um motivo lógico simples: uma ' +
          'empresa que te entrega a semente não está guardando o seu dinheiro. Ela não teria ' +
          'como entregar o que não fosse seu.',
      ],
      listaTitulo: 'O que a documentação oficial do Axiom diz',
      // lista: sem mudança
      exemplo: {
        titulo: 'O teste de dois minutos, em qualquer plataforma',
        passos: [
          'Procure nas configurações se existe uma frase de recuperação e se ela pode ser ' +
            'vista a qualquer momento.',
          'Procure na tela principal se existe um botão "Depositar" e um saldo que não seja o ' +
            'da sua carteira.',
          'Se a frase existe e é exportável, as chaves são suas: é o modelo da direita, e a ' +
            'segurança passa a ser 100% sua.',
          'Se há depósito e saldo interno, as chaves são da empresa: é o modelo da esquerda, e ' +
            'vale tratá-la como se trata qualquer corretora — o que está lá dentro depende de ' +
            'ela continuar de pé.',
        ],
      },
      paragrafosFinais: [
        'Essa checagem evita o erro mais silencioso do módulo, que é supor o modelo pela ' +
          'aparência. Várias ferramentas que operam por Telegram criam a carteira nos ' +
          'servidores delas e continuam parecendo suas. Confira antes de depositar qualquer ' +
          'coisa, nunca depois.',
      ],
```

---

## o-risco-real-e-o-frontend

ANTES: 1 parágrafo de duas linhas — 109 caracteres. O fluxograma e a legenda faziam todo o trabalho.

DEPOIS:

```js
      titulo: 'Se o app sair do ar',
      emUmaFrase:
        'Com as chaves na sua mão, o maior risco é o terminal travar na hora em que você ' +
        'precisa vender.',
      // diagrama: sem mudança
      paragrafos: [
        'O terminal é um site. Um site é um serviço que alguém opera, hospeda e atualiza — e ' +
          'serviços saem do ar. Quando ele cai, a blockchain não cai junto: as pools continuam ' +
          'funcionando, os contratos continuam executando e os seus tokens continuam no seu ' +
          'endereço. O que some é a porta de entrada que você usava para chegar até eles.',
        'Só que essa distinção não vale nada se o segundo caminho não estiver pronto ANTES de ' +
          'você precisar dele. Ter as chaves não é a mesma coisa que ter acesso: se a sua ' +
          'única forma de assinar é aquela tela, você está preso àquela tela. A semente ' +
          'exportada e guardada fora do computador é o que transforma "as chaves são minhas" ' +
          'de afirmação em capacidade.',
        'O caminho alternativo é simples e vale ensaiar uma vez, com calma, fora de pressão: ' +
          'importar a semente numa carteira comum — Phantom, Rabby ou Solflare são as citadas ' +
          'na própria documentação — e negociar direto no site da DEX ou no agregador. É mais ' +
          'trabalhoso e menos confortável que o terminal. É um inconveniente, não uma parede.',
      ],
      exemplo: {
        titulo: 'O ensaio que se faz uma vez, sem pressa',
        passos: [
          'Exporte a frase de recuperação nas configurações e anote-a no papel, fora do ' +
            'computador.',
          'Importe essa frase numa carteira comum, como Phantom, Rabby ou Solflare.',
          'Confira se os saldos aparecem: eles nunca estiveram no terminal, sempre estiveram ' +
            'na blockchain.',
          'Abra o site da DEX ou do agregador com essa carteira e veja a tela de troca ' +
            'funcionando.',
          'Pronto. O dia em que o terminal cair vira um inconveniente, e não uma posição que ' +
            'você não consegue encerrar.',
        ],
      },
      paragrafosFinais: [
        'A lição é mecânica, não moral. Exportar a semente não é burocracia de segurança: é o ' +
          'seu plano B operacional. E o erro que ela evita não é "confiar demais na ' +
          'plataforma" — é descobrir que o plano B existia só no dia em que já não dava tempo ' +
          'de montá-lo.',
      ],
```

---

## incidente-fevereiro-2026

ANTES: 2 parágrafos — 562 caracteres. Era a seção mais bem servida de texto do módulo, com os fatos e a conclusão, mas sem explicar o que é privilégio interno nem por que as duas perdas são independentes.

DEPOIS:

```js
      titulo: 'O incidente de fevereiro de 2026 e o que ele ensina',
      emUmaFrase: '"Não-custodial" protege o seu dinheiro. Não protege a sua privacidade.',
      // cartoes: sem mudança
      // descricaoDosCartoes: sem mudança
      paragrafos: [
        'Em 26 de fevereiro de 2026, o investigador on-chain ZachXBT publicou uma ' +
          'investigação alegando que funcionários abusaram de ferramentas internas de suporte ' +
          'para consultar carteiras e histórico de usuários, ao longo de cerca de dez meses. ' +
          'Em poucas horas a empresa confirmou em público, disse estar "chocada e ' +
          'decepcionada", removeu o acesso e prometeu investigar (CoinDesk, 26/02/2026).',
        'O nome técnico do que aconteceu é abuso de privilégio interno. Privilégio interno é o ' +
          'acesso que funcionários de qualquer empresa têm às ferramentas de suporte, para ' +
          'poder ajudar quem abre um chamado. Esse acesso costuma mostrar dados: qual ' +
          'carteira, qual histórico, quais posições. Ele não assina transações, porque as ' +
          'chaves não estavam ali. É exatamente a diferença dos dois cartões acima — ' +
          'visibilidade, não controle.',
        'Vale separar as duas perdas possíveis, porque elas não andam juntas. Perder o ' +
          'dinheiro exige que alguém tenha a sua chave privada. Perder a privacidade exige ' +
          'muito menos: basta alguém ver o que você faz. E num mercado em que rastrear a ' +
          'carteira dos outros é uma funcionalidade vendida na própria tela, saber o que você ' +
          'comprou e quando já é informação de valor — informação que a plataforma tem por ' +
          'desenho, porque é ela que monta as suas ordens.',
        'Não existe botão de configuração para isso. O que existe é higiene: usar uma carteira ' +
          'separada só para operar, não deixar o histórico financeiro inteiro passar por um ' +
          'único endereço, e lembrar que toda ordem enviada por um terminal passa pela ' +
          'infraestrutura dele antes de chegar à rede.',
      ],
      exemplo: {
        titulo: 'As duas perguntas que o incidente separa',
        passos: [
          '"Podem tirar o meu dinheiro?" — só com a minha chave privada, e nenhuma chave ' +
            'privada foi reportada como exposta.',
          '"Podem ver o que eu faço?" — sim, e durante cerca de dez meses alguém de dentro fez ' +
            'exatamente isso.',
          'A primeira resposta depende do modelo de custódia. A segunda não depende dele em ' +
            'nada.',
          'Nenhum fundo foi reportado como roubado e, ainda assim, o episódio é um problema ' +
            'real: as duas perguntas são independentes uma da outra.',
        ],
      },
      paragrafosFinais: [
        'A conclusão prática não é "fuja desta plataforma". É não tratar nenhum terminal como ' +
          'seguro por desenho: assuma que o que você faz numa plataforma é visível para quem a ' +
          'opera. O erro que essa leitura evita é ler "não-custodial" como um carimbo geral de ' +
          'segurança. Ele responde bem a uma pergunta — mas é a uma pergunta só.',
      ],
```

---

## a-taxa-anunciada-nao-e-o-custo

ANTES: zero caracteres de texto corrido. O caminho do dinheiro (as cinco camadas, com os valores e a legenda) explicava tudo sozinho, e MEV, Jito, priority fee, sandwich e bonding curve apareciam sem tradução. Esta é a seção-coração do módulo.

pergunta: REMOVER (hoje 'q4')

DEPOIS:

```js
      titulo: 'A taxa anunciada é a menor das camadas',
      emUmaFrase:
        'O número anunciado é só a fatia da plataforma. Uma compra tem cinco camadas de ' +
        'custo, e as outras quatro saem do seu bolso do mesmo jeito.',
      // caminho: sem mudança
      paragrafos: [
        'Uma compra parece um evento só, mas cobra em cinco lugares diferentes. A taxa-base ' +
          'da rede Solana é o pedágio de existir: 0,000005 SOL por assinatura, uma fração de ' +
          'centavo — e ela é cobrada mesmo se a transação falhar. O priority fee, taxa de ' +
          'prioridade, é um pagamento extra ao validador para a sua transação ser incluída ' +
          'antes das outras quando há fila; o padrão do Axiom é 0,001 SOL. E a gorjeta de MEV, ' +
          'enviada via Jito, é outros 0,001 SOL no padrão do Axiom.',
        'MEV é a sigla de maximal extractable value: o valor que quem monta os blocos ' +
          'consegue extrair escolhendo a ordem em que as transações entram. O ataque de ' +
          'sandwich é a forma mais conhecida disso — um bot vê a sua compra esperando na fila, ' +
          'compra um instante antes e empurra o preço para cima, deixa a sua ordem executar ' +
          'mais caro, e vende logo depois embolsando a diferença. A gorjeta compra um caminho ' +
          'que evita essa vitrine, e o Jito é o serviço por onde ela é enviada.',
        'A quarta camada é a taxa da plataforma: 0,95% líquido no nível de entrada. É a única ' +
          'das cinco que aparece no marketing, e o módulo inteiro gira em torno disso. A ' +
          'quinta é a taxa da pool, cobrada por onde a troca acontece de fato — 1,25% na ' +
          'bonding curve, normalmente a maior camada num token novo.',
        'Agora repare no que o desenho aqui em cima está mostrando. Numa compra de R$100 num ' +
          'token na bonding curve, a taxa anunciada saiu por cerca de R$0,94. Os custos fixos ' +
          '— rede, prioridade e gorjeta — saíram por cerca de R$1,03. A taxa da pool, cerca de ' +
          'R$1,24. Ou seja: a camada anunciada foi a MENOR das três. O total, sem contar o ' +
          'slippage, ficou em cerca de R$3,20, ou 3,2% da ordem — mais de três vezes o número ' +
          'que estava na vitrine.',
        'Na tela nada disso vem somado, e é por isso que quase ninguém faz a conta. Você vê o ' +
          'número da plataforma numa página de taxas, vê o priority fee e a gorjeta numa tela ' +
          'de configuração em SOL (não em reais), e a taxa da pool você não vê em lugar ' +
          'nenhum: ela é descontada dentro da própria troca. Somar as cinco é trabalho seu, e ' +
          'é a única forma de saber quanto do seu dinheiro virou token de fato.',
      ],
      exemplo: {
        titulo: 'R$100 viram quanto de token?',
        passos: [
          'Taxa-base da rede: 0,000005 SOL por assinatura — fração de centavo, cobrada mesmo ' +
            'se a transação falhar.',
          'Priority fee, no padrão do Axiom: 0,001 SOL.',
          'Gorjeta de MEV via Jito, no padrão do Axiom: 0,001 SOL.',
          'Taxa da plataforma, 0,95% líquido no nível de entrada: cerca de R$0,94 — a única ' +
            'anunciada.',
          'Taxa da pool, 1,25% na bonding curve: cerca de R$1,24 — a maior das camadas.',
          'Total: cerca de R$3,20, ou 3,2% da ordem. O slippage é custo à parte e não entra ' +
            'nesta conta.',
        ],
      },
      paragrafosFinais: [
        'O erro que isso evita é comparar plataformas pelo número anunciado. Duas telas que ' +
          'anunciam a mesma taxa podem cobrar totais bem diferentes, porque o que define o ' +
          'total não é só a fatia delas: é onde o token está e quanto você está movendo. É ' +
          'exatamente o que a próxima seção mede.',
      ],
      // detalhe: sem mudança
```

---

## o-venue-muda-o-custo

ANTES: 2 parágrafos — 439 caracteres: o peso dos custos fixos e a ida e volta. Os dois são bons e estão preservados palavra por palavra. Faltava dizer o que é venue, o que é AMM e o que é graduar.

DEPOIS:

```js
      titulo: 'A matriz: a mesma plataforma, três custos diferentes',
      emUmaFrase:
        'Não existe um número único para "quanto custa operar". O tamanho da ordem e o lugar ' +
        'onde o token está mudam a conta inteira.',
      // barras: sem mudança
      // tabela: sem mudança
      paragrafos: [
        'Venue é o lugar onde o token é negociado, e o mesmo token muda de venue ao longo da ' +
          'vida. Ele nasce na bonding curve e, se juntar compradores suficientes, gradua: ' +
          'ganha uma pool canônica, com reservas de verdade dos dois lados, dentro de uma AMM. ' +
          'AMM é automated market maker, criador de mercado automatizado — o contrato que faz ' +
          'o preço sozinho a partir das duas reservas, sem ninguém do outro lado da sua ordem. ' +
          'A Raydium é o exemplo de AMM madura aqui, com taxa padrão de 0,25%.',
        'A matriz acima é a mesma plataforma, no mesmo dia, em três situações. Ordem de R$100 ' +
          'num token na bonding curve: 3,2%. Ordem de R$512 no mesmo token, na mesma curva: ' +
          '2,4%. Ordem de R$512 num token já em AMM madura: 1,4%. Nenhuma taxa de tabela ' +
          'mudou entre as três linhas — a fatia da plataforma ficou perto de 0,95% nas três.',
        'Parte do custo é fixa: o priority fee e a gorjeta somam 0,002 SOL nos valores ' +
          'padrão, e custam igual se você move o equivalente a R$50 ou a R$5.000. Numa ordem ' +
          'de R$100 isso pesa cerca de 1%; numa ordem dez vezes maior, cerca de 0,1%. A taxa é ' +
          'a mesma — o peso ficou dez vezes menor.',
        'O segundo salto vem do venue, e é maior ainda. Entre a segunda e a terceira linha ' +
          'nada mudou além de onde o token estava: mesmo terminal, mesmo tamanho, mesmo dia. A ' +
          'taxa da pool caiu de 1,25% para 0,25% e o total caiu de 2,4% para 1,4%. Comprar um ' +
          'token muito novo custa mais caro por mecânica, antes de o preço fazer qualquer ' +
          'coisa.',
        'Na tela isso aparece como uma etiqueta discreta dizendo em que pool o token está, ou ' +
          'como o nome da DEX ao lado do par. Vale olhar antes de definir o tamanho, porque ' +
          'dos dois fatores que mexem na conta esse é o único que você não controla no momento ' +
          'do clique. O tamanho, você controla.',
        'E a matriz não mostra um detalhe: toda operação é ida e volta. Você paga essas taxas ' +
          'ao comprar e paga de novo ao vender, inclusive quando sai no prejuízo.',
      ],
      exemplo: {
        titulo: 'As mesmas taxas, três contas diferentes',
        passos: [
          'R$100 na bonding curve: pool 1,25% ≈ R$1,24, plataforma ≈ R$0,94, custos fixos ' +
            '0,002 SOL ≈ R$1,03 — cerca de 1% da ordem. Total ≈ R$3,20 · 3,2%.',
          'R$512 na mesma curva: pool 1,25% ≈ R$6,39, custos fixos ≈ R$1,03 — agora cerca de ' +
            '0,2% da ordem. Total ≈ R$12,27 · 2,4%.',
          'R$512 num token já em AMM madura: pool 0,25% ≈ R$1,28, custos fixos ≈ R$1,03 — os ' +
            'mesmos 0,2%. Total ≈ R$7,16 · 1,4%.',
          'Da primeira para a segunda conta, só o tamanho mudou. Da segunda para a terceira, ' +
            'só o venue.',
        ],
      },
      paragrafosFinais: [
        'O erro que a matriz evita é decorar um número. Quem guarda "operar custa 1%" ' +
          'subestima a conta por três vezes justamente no cenário em que iniciante mais opera: ' +
          'ordem pequena, token recém-lançado. E o remédio não é fugir de taxa — é saber qual ' +
          'das três contas é a sua antes de clicar.',
      ],
      detalhe: {
        titulo: 'o caminho do token e o estudo da Uniswap Labs',
        ordenada: true,
        lista: [
          'Bonding curve do pump.fun: taxa da pool de 1,25% — oficialmente 0,300% para o ' +
            'criador do token e 0,95% para o protocolo.',
          'PumpSwap: o token graduou e ganhou a pool canônica. A taxa continua em 1,25% ' +
            'enquanto o market cap é pequeno, e cai por faixas conforme cresce.',
          'AMM madura, como a Raydium: taxa padrão de 0,25%.',
        ],
        paragrafos: [
          'Ponto-base é a unidade em que custos assim costumam ser medidos: cada ponto-base é ' +
            'um centésimo de ponto percentual.',
          'Um estudo com 534 mil negociações reais (Adams, Chan, Markovich & Wan, "Don\'t Let ' +
            'MEV Slip", Financial Cryptography 2024, da Uniswap Labs) mediu o custo total ' +
            'efetivo — taxa, deslizamento e o que bots de MEV extraem: 140 pontos-base por ' +
            'dólar negociado numa memecoin popular, contra 22 num par de moedas estáveis. Seis ' +
            'vezes mais. A chance de sofrer deslizamento causado por um bot adversário foi cerca ' +
            'de 80% maior na memecoin. E a pool estudada era mais funda que a maioria das de ' +
            'memecoin recém-lançada.',
        ],
      },
```

---

## calculadora-de-atrito

ANTES: zero caracteres de texto corrido. Só a calculadora, com a nota e a legenda da fórmula.

DEPOIS:

```js
      titulo: 'Quanto o atrito come, com o mercado parado',
      emUmaFrase:
        'Cada operação cobra o pedágio na ida e na volta. Isto é aritmética de custo, não ' +
        'previsão: o preço fica parado justamente para isolar o atrito.',
      // calculadora: sem mudança
      paragrafos: [
        'Atrito é o nome do custo que existe só por operar: taxas, e nada mais. Esta ' +
          'calculadora congela o preço de propósito — ela supõe que o token não subiu nem caiu ' +
          'um centavo entre a compra e a venda, e pergunta uma coisa só: quanto do seu capital ' +
          'sobrou depois de passar várias vezes pelo pedágio.',
        'O motivo de isolar assim é que o atrito é a única parte do resultado que é certa. ' +
          'Ganho é hipótese; custo é fato. E ele não soma, ele multiplica: cada ida e volta ' +
          'cobra a porcentagem sobre o que sobrou da anterior, e não sobre o valor com que ' +
          'você começou. É a mesma matemática dos juros compostos, virada ao contrário.',
        'O primeiro controle é o número de operações completas, e cada operação completa é uma ' +
          'compra com a venda correspondente. O segundo é o custo de cada ida e volta — e os ' +
          'três atalhos são exatamente os cenários da matriz da seção anterior: 3,2% para uma ' +
          'ordem de R$100 na bonding curve, 2,4% para R$512 na mesma curva, 1,4% para R$512 ' +
          'numa AMM madura.',
        'A leitura é a barra da direita, embaixo de "Sobra do capital, com o preço parado". ' +
          'Cada barra, da esquerda para a direita, é o capital depois de mais uma ida e volta, ' +
          'e a fórmula é a que está na legenda: sobra = (1 − custo) elevado ao número de ' +
          'operações. O número que sai não é previsão de perda. Ele é o piso: o quanto o preço ' +
          'precisaria andar a seu favor, no total, só para você voltar ao ponto de partida.',
      ],
      quadro: [
        {
          rotulo: 'O que a conta supõe',
          texto:
            'Preço exatamente parado entre a compra e a venda, e o mesmo custo percentual em ' +
            'todas as operações.',
        },
        {
          rotulo: 'O que ela não inclui',
          texto:
            'Qualquer movimento de preço, para cima ou para baixo, e o slippage — que é custo ' +
            'à parte e vem por cima.',
          destaque: true,
        },
      ],
      exemplo: {
        titulo: 'Como rodar uma vez, do jeito certo',
        passos: [
          'Deixe o primeiro controle em 20 operações completas: vinte compras com as vinte ' +
            'vendas correspondentes.',
          'Clique no atalho de 3,2%, o cenário de uma ordem de R$100 num token na bonding ' +
            'curve.',
          'Leia a barra do fim: é quanto sobrou de cada R$100, com o preço exatamente onde ' +
            'estava quando você começou.',
          'Agora clique no atalho de 1,4%, o cenário de R$512 numa AMM madura, e compare as ' +
            'duas leituras.',
          'A diferença entre elas é o preço de operar pequeno em token muito novo — repetido ' +
            'vinte vezes.',
        ],
      },
      paragrafosFinais: [
        'O erro que este número evita é contar só os acertos. Quem opera muito costuma medir ' +
          'o desempenho pelas operações que deram certo, e o atrito não aparece em nenhuma ' +
          'delas: ele já foi descontado antes de qualquer resultado. A pergunta certa não é ' +
          '"quanto ganhei nas que deram certo", é "quanto sobrou do capital depois de todas".',
      ],
```

---

## slippage-priority-mev

ANTES: 1 parágrafo com as duas recomendações de documentação — 257 caracteres, além dos três cartões e do fluxograma. Slippage, priority fee, MEV, sandwich e front-running eram usados sem definição no corpo da seção.

pergunta: REMOVER (hoje 'q2')

DEPOIS:

```js
      titulo: 'As três configurações que quebram a operação',
      emUmaFrase:
        'Elas só decidem se a transação executa, falha ou é explorada. Nenhuma aumenta ' +
        'chance de lucro.',
      // configs: sem mudança
      // rotulosDosConfigs: sem mudança
      // diagrama: sem mudança
      paragrafos: [
        'Slippage, em português deslizamento, é a distância entre o preço que você viu na tela ' +
          'e o preço que a transação de fato executa. Ela existe porque o tempo passa: entre o ' +
          'seu clique e o bloco ser produzido, outras pessoas negociaram na mesma pool e ' +
          'moveram o preço. O que você configura não é o deslizamento em si — é o limite que ' +
          'você aceita. "Slippage de 1%" quer dizer: se o preço piorar mais do que isso, ' +
          'cancele a minha ordem.',
        'Priority fee é a taxa de prioridade: um pagamento extra ao validador para a sua ' +
          'transação ser escolhida antes das outras quando há fila. Não é taxa de serviço da ' +
          'plataforma, é um leilão por posição na fila. O padrão do Axiom é 0,001 SOL, e a ' +
          'plataforma afirma calcular valores recomendados automaticamente com base nas ' +
          'transações do momento.',
        'A proteção de MEV é a defesa contra bots que se posicionam em volta da sua ordem. O ' +
          'mais comum é o ataque de sandwich, em que o bot compra logo antes de você e vende ' +
          'logo depois, ficando com a diferença. No Axiom há três modos: Off, Reduced e ' +
          'Secure.',
        'As três têm a mesma forma de erro: existe um valor baixo demais e um alto demais, e ' +
          'os dois quebram coisas diferentes. Slippage baixo demais faz a transação falhar com ' +
          '"slippage exceeded" e você perde a taxa de rede; alto demais faz você aceitar um ' +
          'preço muito pior e, numa pool rasa, vira alvo fácil de bots. Prioridade baixa ' +
          'demais demora ou falha no congestionamento; alta demais paga caro à toa. E no modo ' +
          'Off você fica exposto a front-running, que é alguém passar na frente da sua ordem.',
        'Nada disso é opinião de quem escreveu o módulo: a documentação da Solana diz que ' +
          'limitar o slippage é a defesa mais eficaz contra ataques de sandwich, e a própria ' +
          'documentação do Axiom recomenda o modo Secure sempre que possível.',
        'As três moram na mesma tela de configuração, quase sempre atrás de um ícone de ' +
          'engrenagem ao lado do campo de quantia, e ficam guardadas de uma operação para a ' +
          'outra. Isso quer dizer que o valor que está lá agora é o da última vez que você ' +
          'mexeu — possivelmente numa pool bem diferente da de hoje.',
      ],
      exemplo: {
        titulo: '40% de slippage numa pool rasa',
        passos: [
          'Você configura 40% para a ordem não falhar de jeito nenhum.',
          'A pool é rasa, então a sua própria compra já empurra bastante o preço.',
          'Um bot lê a ordem esperando na fila e vê que você autorizou até 40% de piora.',
          'Ele compra antes, deixa a sua ordem executar no preço pior, e vende depois.',
          'Você recebe bem menos token do que esperava. A diferença não foi azar: foi a margem ' +
            'que você mesmo autorizou.',
        ],
      },
      paragrafosFinais: [
        'O erro que entender as três evita é tratá-las como "ajustes avançados" que se deixa ' +
          'no padrão e nunca mais se olha. Nenhuma delas aumenta chance de lucro; todas ' +
          'decidem se a operação executa, falha ou é explorada. E há um quarto ajuste na mesma ' +
          'tela que merece a mesma atenção: o botão de compra rápida, que executa um valor ' +
          'pré-configurado num clique, sem tela de revisão. Ele é conveniente, e é por isso ' +
          'que está na lista de erros comuns.',
      ],
      // detalhe: sem mudança
```

---

## calculadora-de-impacto

ANTES: zero caracteres de texto corrido. Só a calculadora, com a nota do modelo e os textos do gráfico.

DEPOIS:

```js
      titulo: 'Quanto a sua própria ordem empurra o preço',
      emUmaFrase:
        '"Pool rasa" é adjetivo até virar número. Arraste e veja quanto do preço cotado você ' +
        'de fato recebe.',
      // calculadora: sem mudança
      paragrafos: [
        'Impacto de preço é a parte do deslizamento que você mesmo causa. Ele não depende de ' +
          'mais ninguém negociar junto: acontece porque a pool tem duas reservas e a sua ' +
          'compra muda a proporção entre elas. Quanto maior a sua ordem em relação à reserva, ' +
          'mais o preço se move enquanto ela executa — e o preço final fica pior que o cotado.',
        'O modelo por trás da conta é o de produto constante: as duas reservas multiplicadas ' +
          'uma pela outra têm de continuar dando o mesmo número, x · y = k. É esse desenho que ' +
          'faz a curva do gráfico entortar. E a conta que a calculadora faz é essa: você ' +
          'recebe 1 dividido por (1 + ordem ÷ pool) do que o preço cotado sugeria.',
        'É isto que transforma "pool rasa" de adjetivo em número. A liquidez que você leu no ' +
          'painel da tela vira aqui uma porcentagem concreta do que o preço prometia, e vira ' +
          'antes de você clicar. Cuidado com uma armadilha de leitura: pools reais anunciam ' +
          'liquidez somando os dois lados, então uma pool "de 100 SOL" tem cerca de 50 SOL ' +
          'deste lado. Use metade do número anunciado.',
        'Os dois controles são o tamanho da sua ordem e a liquidez da pool, ambos em SOL. A ' +
          'leitura é o "Você recebe", em porcentagem do que o preço cotado sugeria, com o ' +
          '"Impacto da sua ordem" ao lado. O gráfico vai até uma ordem do tamanho do dobro da ' +
          'pool; passando disso o marcador para no fim da escala, mas os números ao lado ' +
          'continuam exatos. E o aviso que mais importa: isto não inclui a taxa da pool nem o ' +
          'slippage configurado — os dois vêm por cima.',
      ],
      exemplo: {
        titulo: 'Uma ordem de 1 SOL numa pool de 50',
        passos: [
          'Deixe a ordem em 1 SOL e a liquidez em 50 SOL, que são os valores em que a ' +
            'calculadora abre.',
          'Lembre que uma pool anunciada como "de 100 SOL" é mais ou menos isso: cerca de 50 ' +
            'SOL deste lado.',
          'Leia o "Você recebe": é a fatia do preço cotado que sobrou depois do empurrão que a ' +
            'sua própria ordem deu.',
          'Agora arraste a ordem até 20 SOL sem mexer na pool e leia de novo. A ordem não ' +
            'mudou de natureza — mudou de tamanho em relação à reserva.',
          'Volte a ordem para 1 SOL e derrube a pool para 1 SOL: o mesmo efeito aparece pelo ' +
            'outro lado.',
        ],
      },
      paragrafosFinais: [
        'O erro que esta conta evita é culpar a configuração pelo preço ruim. Numa pool ' +
          'pequena, boa parte da diferença não veio de bot nem de slippage mal ajustado: veio ' +
          'do tamanho da ordem contra o tamanho da reserva, e nenhum ajuste de tela conserta ' +
          'isso. Nada aqui diz qual tamanho você deve usar — diz só o que cada tamanho custa, ' +
          'antes de qualquer outra coisa acontecer.',
      ],
```

---

## tipos-de-ordem

ANTES: zero caracteres de texto corrido. Dois cartões, a descrição deles e a ressalva de não verificado. "Ordem limite" nunca era explicada.

pergunta: REMOVER (hoje 'q3')

DEPOIS:

```js
      titulo: 'Tipos de ordem e a pergunta que ninguém responde',
      emUmaFrase:
        'Não assuma que uma ordem limite dispara com o app fechado. A documentação oficial não ' +
        'diz.',
      // cartoes: sem mudança
      // descricaoDosCartoes: sem mudança
      paragrafos: [
        'Existem dois tipos de ordem, e a diferença entre eles é quando executam. A ordem a ' +
          'mercado executa agora, pelo preço que houver: é o botão de comprar que você já viu ' +
          'na anatomia da tela. A ordem limite executa só se o preço chegar a um valor que ' +
          'você definiu antes — você diz "compre se cair até aqui" ou "venda se subir até ali" ' +
          'e vai cuidar da vida.',
        'A ordem limite é atraente justamente por isso: ela promete que você não precisa ficar ' +
          'olhando a tela. Só que essa promessa tem duas implementações possíveis, e do ponto ' +
          'de vista do risco elas não se parecem em nada. Ou a ordem está registrada na ' +
          'blockchain, e aí executa mesmo que a empresa suma; ou existe um servidor da ' +
          'plataforma vigiando o preço e disparando a ordem na hora certa, e aí ela só executa ' +
          'enquanto esse servidor estiver de pé.',
        'E na tela os dois casos são idênticos. Você preenche o preço, confirma, vê a ordem ' +
          'listada como aberta e fecha o navegador. Nada na interface diz onde ela está ' +
          'guardada. É por isso que o cartão da direita aparece tracejado aqui em cima: ele é ' +
          'o que pode sumir sem aviso — e a aba Custódia já mostrou que servidores caem.',
        'No caso do Axiom, a resposta honesta é que não se sabe. A documentação oficial ' +
          'descreve a ordem limite e diz que você pode se afastar da tela, mas não afirma se a ' +
          'ordem descansa na blockchain ou se um servidor monitora o preço e dispara. A ' +
          'narrativa de monitores rodando o tempo todo na blockchain aparece só em sites ' +
          'clones e em afiliados, que não são fonte.',
      ],
      exemplo: {
        titulo: 'Como descobrir sozinho, com o mínimo em risco',
        passos: [
          'Crie uma ordem limite de valor mínimo, num preço que só deva ser alcançado depois ' +
            'de algum tempo.',
          'Feche o aplicativo e o navegador por completo.',
          'Espere o preço cruzar o valor que você definiu.',
          'Confira pelo endereço da sua carteira no explorador de blocos, e não pela tela da ' +
            'plataforma: a blockchain é a fonte da verdade.',
          'Executou com tudo fechado? Então ela não dependia da sua tela. Não executou? Então ' +
            'você já sabe que não pode contar com ela numa posição que importa.',
        ],
      },
      paragrafosFinais: [
        'O erro que essa desconfiança evita é caro e silencioso: montar um plano de saída ' +
          'inteiro em cima de uma ordem limite e descobrir, no dia em que ela precisava ' +
          'disparar, que dependia de um servidor que estava fora do ar. Uma ordem que você ' +
          'nunca conferiu é uma suposição com nome de ferramenta.',
      ],
      // naoVerificado: sem mudança
```

---

## erros-de-execucao

ANTES: 1 parágrafo sobre a carteira separada — 188 caracteres, mais o mockup do impostor e a lista de quatro erros (sem título). Ticker e endereço de contrato apareciam sem explicação.

DEPOIS:

```js
      titulo: 'O token impostor',
      emUmaFrase:
        'O erro mais caro é comprar o token errado. Nome e ticker são apelidos; endereço do ' +
        'contrato é identidade.',
      // impostor: sem mudança
      paragrafos: [
        'Qualquer pessoa pode criar um token com qualquer nome e qualquer ticker — a sigla ' +
          'curta que aparece ao lado do nome, como as três ou quatro letras de uma ação. Não ' +
          'existe cartório: nome e ticker não são exclusivos e nunca foram. O que é único é o ' +
          'endereço do contrato, aquela sequência longa de letras e números que identifica o ' +
          'token dentro da blockchain. Dois tokens podem se chamar igual; dois endereços, não.',
        'É por isso que o token impostor é o erro mais caro da lista. Ele não depende de você ' +
          'ser distraído: depende só de você buscar pelo nome, que é o gesto mais natural do ' +
          'mundo. E o prejuízo é total, não parcial — quem compra o impostor comprou um token ' +
          'que mais ninguém vai comprar, e não existe venda para uma coisa sem comprador.',
        'O mockup aqui em cima é o que a busca devolve: dois resultados com o mesmo nome e o ' +
          'mesmo ticker. O primeiro tem liquidez alta e milhares de holders; o segundo, ' +
          'liquidez baixa e contrato diferente. Liquidez e número de holders ajudam a ' +
          'desconfiar, mas não são a identidade — são coincidências úteis. A identidade é o ' +
          'endereço, e o gesto correto é copiar o endereço de uma fonte confiável e buscar por ' +
          'ele, nunca pelo nome.',
      ],
      listaTitulo: 'Os outros quatro erros de execução mais comuns',
      // lista: sem mudança
      exemplo: {
        titulo: 'O hábito que fecha essa porta',
        passos: [
          'Pegue o endereço do contrato numa fonte confiável, e não no resultado da busca.',
          'Cole o endereço no campo de busca do terminal, em vez de digitar o nome.',
          'Confira o começo e o fim do endereço que apareceu contra o que você copiou.',
          'Só então olhe liquidez, holders e gráfico — agora como informação, e não como ' +
            'identificação.',
        ],
      },
      paragrafosFinais: [
        'E um erro que vem antes de todos: operar na carteira principal. Uma carteira separada ' +
          'só para operar limita o estrago se o dispositivo ou o app forem comprometidos. E ' +
          'não custa nada criar.',
        'Os cinco erros desta seção têm a mesma raiz: todos acontecem no minuto entre decidir ' +
          'e clicar, quando a pressa é maior que a atenção. Nenhum deles é erro de análise — e ' +
          'é por isso que eles se corrigem por hábito, não por estudo.',
      ],
```

---

## bots-de-sniping

ANTES: 2 parágrafos — 444 caracteres: a infraestrutura dos bots e a tentação da IA. Os dois estão preservados palavra por palavra. Faltava dizer o que é sniping e ler as três barras de tempo.

pergunta: REMOVER (hoje 'q6')

DEPOIS:

```js
      titulo: 'Por que velocidade não é uma disputa que você vença',
      emUmaFrase:
        'Um bot reage em dezenas de milissegundos. Você leva de 30 a 60 segundos. Essa corrida ' +
        'não é sua.',
      // tempos: sem mudança
      paragrafos: [
        'Sniping vem de sniper, atirador: é comprar um token no instante exato em que ele ' +
          'nasce, antes de o preço se mover. Quem faz isso não é uma pessoa clicando rápido. É ' +
          'um programa ligado direto à infraestrutura da rede, com a transação já montada e ' +
          'assinada, esperando só o gatilho para ser enviada.',
        'As três barras aqui em cima estão na mesma escala, de até 60 segundos, e é a ' +
          'comparação entre elas que conta a história. Um slot da Solana — a janela em que a ' +
          'rede produz um bloco — dura 350 ms, desde a mudança de 21/08/2026 que baixou esse ' +
          'tempo de 400 ms. O bot reage em dezenas de milissegundos, ou seja, dentro de um ' +
          'único slot. E você, do "vi" ao "confirmado", leva de 30 a 60 segundos. As duas ' +
          'primeiras barras são tão curtas nesta escala que quase não aparecem: é exatamente ' +
          'o ponto.',
        'O diferencial deles não é inteligência: é infraestrutura, com transações ' +
          'pré-assinadas rodando colado à produção de blocos. Quando você vê um token "novo" já ' +
          'subindo, os bots já entraram — o preço que você consegue no lançamento é um preço ' +
          'que um bot mais rápido decidiu recusar.',
        'Pôr inteligência artificial para reagir por você não resolve: uma chamada de modelo ' +
          'leva segundos, e a disputa se decide em milissegundos. A IA te deixa mais lento.',
        'A conclusão prática não é desistir de tudo. É que velocidade não é um eixo em que ' +
          'você tenha algo a ganhar, e portanto não deve ser o eixo em que você decide. Todo o ' +
          'resto deste hub — checagem, tese, ponto de invalidação, tamanho da posição — ' +
          'acontece numa escala de tempo em que um humano ainda funciona: minutos e horas, não ' +
          'milissegundos.',
      ],
      exemplo: {
        titulo: 'A corrida, contada em números',
        passos: [
          'A rede fecha um bloco a cada 350 ms.',
          'O bot decide e envia em dezenas de milissegundos: cabe inteiro dentro de um bloco.',
          'Você vê a informação, abre a tela, confere, digita e assina: 30 a 60 segundos.',
          'Nesse intervalo a rede já fechou muitos blocos, e o bot já comprou e possivelmente ' +
            'já vendeu.',
          'Não existe configuração de prioridade que feche essa diferença: ela não é de taxa, ' +
            'é de tempo.',
        ],
      },
      paragrafosFinais: [
        'O erro que essa comparação evita é comprar um lançamento achando que chegou cedo. ' +
          'Não existe "cedo" para um humano num lançamento: o cedo já foi ocupado por máquinas ' +
          'antes de a primeira vela aparecer no seu gráfico.',
      ],
```

---

## a-venda-nao-caiu

ANTES: zero caracteres de texto corrido. Só o fluxograma de diagnóstico e a legenda dele.

pergunta: REMOVER (hoje 'q7')

DEPOIS:

```js
      titulo: 'A venda não caiu na carteira?',
      emUmaFrase:
        'Duas falhas parecidas, com causas diferentes. Saber qual é diz o que fazer em seguida.',
      // diagrama: sem mudança
      paragrafos: [
        'Você clicou em vender, a tela confirmou alguma coisa, e o dinheiro não apareceu na ' +
          'carteira. Isso não é um estado só: são duas falhas diferentes, com causas ' +
          'diferentes. E o que separa uma da outra é uma pergunta única — a transação chegou a ' +
          'existir na blockchain?',
        'No primeiro caso ela chegou e foi recusada. É a reversão com "slippage exceeded", que ' +
          'em inglês quer dizer deslizamento excedido: entre o seu clique e a execução, o ' +
          'preço andou além do limite que você tinha autorizado, e a rede cancelou em vez de ' +
          'entregar um preço pior. Isso não é defeito. É a proteção fazendo exatamente o que ' +
          'você pediu que ela fizesse.',
        'No segundo caso ela nem chegou: não foi incluída em bloco nenhum. Pode ter sido ' +
          'priority fee baixo demais num momento de congestionamento, ou o terminal fora do ar ' +
          'antes de enviar. Do lado de fora as duas falhas são idênticas, porque o saldo não ' +
          'mudou em nenhuma das duas. Por dentro são opostas, e a diferença aparece no ' +
          'explorador de blocos.',
        'Nos dois casos você perde a taxa de rede, e não o valor da venda: os tokens continuam ' +
          'seus e a posição continua aberta. Confundir as duas é o que faz alguém clicar em ' +
          'vender de novo, e de novo, empilhando transações e taxas enquanto o problema era ' +
          'outro. Saber qual das duas aconteceu é o que diz o passo seguinte: ajustar o limite ' +
          'de slippage, ou aumentar a prioridade e tentar por outro caminho.',
        'A checagem é sempre a mesma, e não é na tela da plataforma: abra o explorador de ' +
          'blocos pelo endereço da sua carteira e veja se a transação está lá. A blockchain é ' +
          'a fonte da verdade; a interface é só a opinião dela sobre o que aconteceu.',
      ],
      exemplo: {
        titulo: 'O diagnóstico em cinco passos',
        passos: [
          'Copie o endereço da sua carteira e abra o explorador de blocos por ele.',
          'A transação aparece na lista? Então ela chegou: leia o motivo da falha.',
          'Se o motivo for "slippage exceeded", o preço andou além do seu limite e a rede ' +
            'cancelou. Você perdeu a taxa de rede.',
          'A transação não aparece? Então ela não foi incluída: priority fee baixo no ' +
            'congestionamento, ou o terminal fora do ar.',
          'Nos dois casos, confira o saldo do token antes de tentar de novo — ele continua na ' +
            'carteira.',
        ],
      },
      paragrafosFinais: [
        'O erro que este diagnóstico evita é o pânico como método. A reação natural ao ' +
          '"sumiu" é repetir o clique, e repetir o clique é a única coisa capaz de transformar ' +
          'uma transação que falhou barato em três transações que custaram taxa. Olhe o ' +
          'explorador primeiro.',
      ],
```

---

## do-token-ao-encerramento

ANTES: zero caracteres de texto corrido. Só os sete passos do processo e a legenda das duas saídas.

DEPOIS:

```js
      titulo: 'Do "vi um token" ao "encerrei a posição"',
      emUmaFrase:
        'Cada passo é uma chance de parar antes de gastar dinheiro. "Não opero" é um resultado ' +
        'válido — e frequente.',
      // processo: sem mudança
      paragrafos: [
        'Este é o roteiro inteiro, do momento em que um token aparece na sua frente até a ' +
          'posição estar encerrada. Ele não existe para aumentar acerto. Existe para que as ' +
          'decisões aconteçam numa ordem fixa, escritas antes, em vez de acontecerem na ordem ' +
          'em que a tela pedir.',
        'A ordem dos passos é a parte que faz diferença. Repare que a checagem e a tese vêm ' +
          'antes de qualquer configuração e antes do tamanho da posição: as duas únicas saídas ' +
          'em "não opero" do fluxo estão ali em cima, onde ainda não se gastou nada. Depois ' +
          'desse ponto o processo só trata de execução, e execução não conserta decisão ruim — ' +
          'só a cumpre mais rápido.',
        'Dois passos merecem atenção porque são os que as pessoas pulam. O primeiro é abrir o ' +
          'terminal pelo favorito oficial: existem sites falsos imitando plataformas ' +
          'conhecidas, e eles aparecem em anúncio e em rede social exatamente onde a pressa ' +
          'procura. O último é sair em degraus, conforme o plano feito antes da entrada, e não ' +
          'conforme o que você sente durante.',
        'Como o Módulo 2 mostrou, a maioria das memecoins vai a zero. Isso quer dizer que ' +
          'passar na maioria das vezes é o comportamento esperado de quem segue o processo, e ' +
          'não sinal de que ele travou. Um roteiro que quase nunca diz "não" não está ' +
          'filtrando nada.',
      ],
      exemplo: {
        titulo: 'Onde o processo costuma terminar',
        passos: [
          'Passo 3, a página Checklist: endereço oficial, extensões e autoridades do contrato, ' +
            'concentração de holders, bundles e histórico de quem criou. Checagem reprovada: ' +
            'não opero.',
          'Passo 4, a tese escrita junto com o ponto de invalidação — onde você admite que ' +
            'errou e sai. Tese que não fica clara: não opero.',
          'Dos sete passos, esses dois são os únicos com saída, e os dois acontecem antes de ' +
            'qualquer dinheiro sair da carteira.',
          'Se o token passar pelos dois, o passo 6 ainda pede uma operação-teste com valor ' +
            'mínimo antes da posição de verdade.',
        ],
      },
      paragrafosFinais: [
        'O erro que o roteiro evita não é escolher o token errado: é decidir na ordem errada. ' +
          'Quem define o tamanho antes de escrever a tese já decidiu operar, e passou a usar a ' +
          'checagem como confirmação do que já queria fazer. Escrever antes é o que impede o ' +
          'processo de virar cerimônia.',
      ],
```

---

## registro-para-imposto

ANTES: zero caracteres de texto corrido. Os três cartões do registro, a legenda e a ressalva de não verificado. O `emUmaFrase` era paráfrase do título e foi trocado — a ideia dele virou o segundo parágrafo.

pergunta: REMOVER (hoje 'q8')

DEPOIS:

```js
      titulo: 'Guardar registro desde a primeira operação',
      emUmaFrase:
        'Três campos por operação, anotados no dia. É pouco trabalho por vez — e é o que ' +
        'separa um histórico pronto de um garimpo de um ano inteiro.',
      // registro: sem mudança
      paragrafos: [
        'Registrar é guardar, operação por operação, três informações: a data, o valor em ' +
          'reais que entrou ou saiu, e o custo de aquisição — quanto custou comprar aquilo que ' +
          'você vendeu. Os três cartões aqui em cima são isso, e não existe um quarto campo ' +
          'escondido. É uma planilha, e pode ser literalmente uma planilha.',
        'A obrigação de registrar começa na primeira operação, não quando aparece lucro. O ' +
          'motivo é que o custo de aquisição é um dado do passado: é ele que permite apurar o ' +
          'ganho operação por operação, e ninguém o calcula para você depois. Quem só começa a ' +
          'anotar quando ganha descobre que não consegue provar quanto pagou — e quem não ' +
          'prova quanto pagou não consegue mostrar quanto ganhou.',
        'Na prática o campo que dá trabalho é o valor em reais, porque a operação aconteceu em ' +
          'SOL e a declaração é em reais: é uma conversão feita na data, e a data importa. A ' +
          'boa notícia é que o registro não depende da plataforma continuar existindo. O que ' +
          'está on-chain — quer dizer, gravado na própria blockchain — sempre pode ser ' +
          'recuperado pelo endereço da carteira.',
        'Isto liga direto com a seção de impostos do Módulo 1: a IN RFB 2.291/2025 e o ' +
          'programa DeCripto. E vale repetir o que está embaixo dos cartões: nada aqui é ' +
          'orientação tributária. Guarde o registro e procure um contador — a parte que este ' +
          'módulo pode ensinar é só a de não chegar ao contador de mãos vazias.',
      ],
      exemplo: {
        titulo: 'Uma linha da planilha, de cada ponta da operação',
        passos: [
          'Na compra: a data, o valor em reais que saiu, e quanto aquilo custou — esse valor é ' +
            'o custo de aquisição.',
          'Na venda: a data e o valor em reais que entrou.',
          'O ganho da operação sai da diferença entre as duas linhas, e não do saldo da ' +
            'carteira no fim do ano.',
          'Guarde junto o endereço da carteira que operou: é por ele que o explorador de ' +
            'blocos reconstrói o histórico.',
        ],
      },
      paragrafosFinais: [
        'O erro que isso evita é confundir print com registro. Uma captura de tela do lucro ' +
          'não tem data confiável, não tem valor em reais e não tem custo de aquisição: tem só ' +
          'um número bonito. E o ganho é apurado operação por operação, nunca pelo saldo do ' +
          'fim do ano.',
      ],
      // naoVerificado: sem mudança
```

---

## APONTAMENTOS

1. **A soma da primeira barra.** Na matriz, o cenário de R$100 tem `fixos 1,03 + plataforma 0,94 + pool 1,24 = 3,21`, mas o total escrito é `3,2%` e `≈ R$3,20`. O próprio comentário do arquivo (linha da seção `barras`) já registra isso. Não corrigi nada; o meu texto usa "cerca de" e "≈" em todos esses valores.

2. **0,94 × 0,95 e 1,24 × 1,25.** No cenário de R$100 a plataforma aparece como 0,94 e a pool como 1,24; nos de R$512, como 0,95 e 1,25. É arredondamento de reais, e mantive os dois conjuntos exatamente como estão no arquivo. Se o dono quiser uniformizar, é decisão dele — eu não mexi.

3. **"Numa ordem dez vezes maior, cerca de 0,1%".** Esse parágrafo (preservado palavra por palavra) fala de uma ordem de R$1.000, enquanto a matriz logo acima usa R$512 e 0,2%. Os dois números existem no arquivo e não se contradizem, mas ficam a dois centímetros um do outro e o leitor pode tropeçar. Sugiro decidir se os dois continuam na mesma seção.

4. **As duas calculadoras não trazem o resultado escrito.** A regra de ouro proíbe número derivado novo, e o resultado de "20 operações a 3,2%" ou de "1 SOL numa pool de 50 SOL" seria exatamente isso. Por isso os exemplos ensinam a rodar e a ler a saída, sem afirmar o número que sai. Se o dono quiser o número escrito no texto, ele precisa ser decidido por ele e entrar no arquivo de dados.

5. **A pergunta q5 do quiz não tem seção.** q5 pergunta sobre aprovação automática com permissão ilimitada, e nenhuma das 16 seções trata disso — o tema aparece só como um item da lista de erros ("Assinar sem ler o que a transação autoriza"). Vale checar se o dono quer uma seção sobre aprovações e revogação na aba Erros, ou se a pergunta deve sair do quiz.

6. **Termos que o visual usa antes do parágrafo explicar.** Como a ordem da tela é visual → parágrafos, "bonding curve", "DEX" e "holders" aparecem na tabela de `as-tres-camadas` antes da explicação, que está no parágrafo logo abaixo. O mesmo acontece com "slippage" na anatomia e com "MEV", "Jito" e "priority fee" no caminho do dinheiro. Resolvi explicando na primeira frase possível depois do desenho; resolver de vez exige mexer nos campos de visual, que não são meus.

7. **Proposta de divisão.** `slippage-priority-mev` virou o card mais longo do módulo: três configurações, um fluxograma, um exemplo e um detalhe. Proponho dividir em duas seções — "Slippage: o limite que você autoriza" (com o fluxograma e o exemplo dos 40%) e "Prioridade e proteção de MEV" (com os três modos e o detalhe). `a-taxa-anunciada-nao-e-o-custo` também ficou longa, mas é o coração do módulo e prefiro não cortá-la; se for dividir, a costura natural é "as cinco camadas" e "a conta de R$100".

8. **Repetição que evitei de propósito.** Em `tipos-de-ordem` e em `registro-para-imposto`, a frase sobre testar com valor mínimo e a frase sobre recuperar o histórico no explorador já estão no campo `naoVerificado`. Não repeti as duas nos `paragrafosFinais`. Se a tela mostrar o `naoVerificado` discreto demais, vale repor.

9. **`emUmaFrase` trocado em uma seção.** Em `registro-para-imposto`, o texto antigo ("A obrigação de registrar começa na primeira operação, não quando aparece lucro.") era paráfrase do título. Virou a abertura do segundo parágrafo, sem perder nada.

10. **Um número que NÃO usei.** Os naoVerificado citam o mínimo do Jito (1.000 lamports, 0,000001 SOL) e o desconto de indicação de 10%. Deixei os dois onde estão — são ressalvas, não conteúdo de seção — mas se o dono quiser, o mínimo do Jito caberia bem no `detalhe` de `a-taxa-anunciada-nao-e-o-custo`, ao lado do padrão de 0,001 SOL.

---

## TERMOS TRADUZIDOS

Varredura dos jargões do módulo, na ordem em que passam a ser explicados. Cada um é explicado uma vez, na primeira seção em que aparece no texto, e depois é usado sem cerimônia.

| Termo | Onde estreia explicado | Como é explicado |
| --- | --- | --- |
| pool de liquidez | as-tres-camadas, P1 | par de reservas guardado num contrato inteligente |
| swap | as-tres-camadas, P1 | troca |
| contrato inteligente | as-tres-camadas, P1 | usado no contexto de "guardado dentro de" (já vem do Módulo 1) |
| DEX | as-tres-camadas, P2 | decentralized exchange, corretora descentralizada |
| bonding curve | as-tres-camadas, P2 | curva de emissão: preço que sobe a cada compra |
| agregador | as-tres-camadas, P3 | varre DEXs e escolhe a rota, sem guardar liquidez |
| taxa de protocolo | as-tres-camadas, P3 | a taxa que o agregador não cobra no swap básico |
| terminal de execução | as-tres-camadas, P4 | a camada de cima: tela, descoberta, gráficos, botões |
| holders | as-tres-camadas, P4 | as carteiras que têm aquele token |
| market cap | anatomia-da-tela, P3 | valor de mercado: preço × quantidade em circulação |
| liquidez | anatomia-da-tela, P3 | tamanho da reserva dentro da pool |
| bundle | anatomia-da-tela, P3 | pacote de transações enviadas juntas para o mesmo bloco |
| pool rasa | anatomia-da-tela, P4 | reserva pequena |
| slippage | anatomia-da-tela, P4 (gloss) e slippage-priority-mev, P1 (completo) | deslizamento: distância entre o preço visto e o executado |
| chave privada | custodia-do-axiom, P1 | o que assina transações |
| custodial / não-custodial | custodia-do-axiom, P1 | quem guarda a chave: a empresa, ou você |
| risco de contraparte | custodia-do-axiom, P2 | remissão ao Módulo 1 |
| frase de recuperação / semente | custodia-do-axiom, P3 | lista de palavras na ordem que recria a carteira |
| privilégio interno | incidente-fevereiro-2026, P2 | o acesso de funcionários às ferramentas de suporte |
| taxa-base da rede | a-taxa-anunciada-nao-e-o-custo, P1 | pedágio de existir, cobrado mesmo em falha |
| priority fee | a-taxa-anunciada-nao-e-o-custo, P1 | taxa de prioridade: pagamento ao validador por lugar na fila |
| MEV | a-taxa-anunciada-nao-e-o-custo, P2 | maximal extractable value: valor extraído pela ordem das transações |
| ataque de sandwich | a-taxa-anunciada-nao-e-o-custo, P2 | bot compra antes, deixa você executar caro, vende depois |
| Jito | a-taxa-anunciada-nao-e-o-custo, P2 | o serviço por onde a gorjeta é enviada |
| venue | o-venue-muda-o-custo, P1 | o lugar onde o token é negociado |
| graduar | o-venue-muda-o-custo, P1 | sair da curva e ganhar pool canônica |
| AMM | o-venue-muda-o-custo, P1 | automated market maker, criador de mercado automatizado |
| ponto-base | o-venue-muda-o-custo, detalhe | um centésimo de ponto percentual |
| atrito | calculadora-de-atrito, P1 | o custo que existe só por operar |
| front-running | slippage-priority-mev, P4 | alguém passar na frente da sua ordem |
| "slippage exceeded" | slippage-priority-mev, P4 e a-venda-nao-caiu, P2 | deslizamento excedido: a rede cancelou em vez de dar preço pior |
| impacto de preço | calculadora-de-impacto, P1 | a parte do deslizamento que você mesmo causa |
| produto constante (x · y = k) | calculadora-de-impacto, P2 | as duas reservas multiplicadas continuam dando o mesmo número |
| ordem a mercado / ordem limite | tipos-de-ordem, P1 | executa agora / executa se o preço chegar ao valor definido |
| ticker | erros-de-execucao, P1 | a sigla curta ao lado do nome |
| endereço do contrato | erros-de-execucao, P1 | a sequência que identifica o token na blockchain |
| sniping | bots-de-sniping, P1 | de sniper, atirador: comprar no instante do nascimento |
| slot | bots-de-sniping, P2 | a janela em que a rede produz um bloco |
| explorador de blocos | a-venda-nao-caiu, P5 | onde se confere pelo endereço; a fonte da verdade |
| on-chain | registro-para-imposto, P3 | gravado na própria blockchain |
| custo de aquisição | registro-para-imposto, P1 | quanto custou comprar o que você vendeu |
