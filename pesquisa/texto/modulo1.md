# Módulo 1 — texto reescrito

O Módulo 1 tem 19 cards e 5.480 caracteres de texto corrido: média de 288 caracteres por card,
cerca de três frases cada. O texto virou legenda do visual — ele nomeia a ideia, mas não a
explica, não diz onde ela aparece na tela e não dá um exemplo. Em quatro cards (`seed-e-carteira`,
`formas-de-perder-tudo`, `onde-ficam-chaves`, `sacar-para-reais`) a explicação inteira cabe em uma
frase, e em `plano-de-emergencia` não existe nenhum parágrafo: são oito ordens sem motivo. Cada
seção abaixo passa a seguir a mesma ordem — o que é, por que importa para mim, como aparece na
tela, um exemplo, e o erro que a ideia evita — e todo jargão em inglês ganha tradução na primeira
vez que aparece no módulo.

---

## o-que-e-blockchain

ANTES: 2 parágrafos (614 caracteres) — banco × rede de cópias, hash, e as duas faces da
irreversibilidade; nada sobre confirmações, que é justamente o visual da seção.

pergunta: REMOVER (hoje 'q1')

```js
      emUmaFrase:
        'Ninguém consegue apagar o seu saldo. E ninguém consegue devolver o seu erro. As duas ' +
        'coisas saem exatamente da mesma regra.',
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
```

Demais campos (`titulo`, `confirmacoes`, `detalhe`): inalterados.

---

## explorador-de-blocos

ANTES: 1 parágrafo (270 caracteres) — diz que o explorador só lê, lista quatro sites e manda
conferir a URL. O `emUmaFrase` promete três respostas e o texto não diz onde ler nenhuma delas.

pergunta: REMOVER (hoje 'q9')

```js
      emUmaFrase:
        'O explorador é um site só de leitura que mostra o que realmente aconteceu. Procure ' +
        'três respostas: deu certo? Quanto custou? O que se moveu?',
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
```

Demais campos (`titulo`, `anatomia`, `detalhe`): inalterados.

---

## gas-taxa-de-rede

ANTES: 1 parágrafo (346 caracteres) — define gas, diz que uma parte é "queimada" e outra vai para
o "validador", e dá a taxa base da Solana. Nem "queimada" nem "validador" são explicados.

pergunta: REMOVER (hoje 'q14')

```js
      emUmaFrase:
        'A rede não cobra pelo resultado. Ela cobra pelo trabalho — e o trabalho existe mesmo ' +
        'quando o resultado não vem.',
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
```

Demais campos (`titulo`, `contraste`, `detalhe`): inalterados.

---

## cex-x-dex

ANTES: 1 parágrafo (239 caracteres) — diz que memecoin só existe em DEX e que o preço vem de pool.
"KYC", "AMM", "livro de ofertas" e "slippage" aparecem na tabela e no detalhe sem tradução.

pergunta: REMOVER (hoje 'q15')

```js
      emUmaFrase:
        'A diferença entre as duas não é o visual nem a taxa. É quem fica com a sua chave — e ' +
        'quem atende o telefone quando dá errado.',
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
```

Demais campos (`titulo`, `comparacao`, `detalhe`): inalterados.

---

## chave-publica-privada-endereco

ANTES: 1 parágrafo (296 caracteres) — par de chaves, a privada assina, o endereço é como o número
da conta do Pix. Não explica o que é "assinar" nem por que as setas são de mão única.

(sem `pergunta` hoje)

```js
      emUmaFrase:
        'São três coisas com nomes parecidos e funções opostas. Trocar uma pela outra é o ' +
        'jeito mais rápido de entregar a carteira sem perceber.',
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
```

Demais campos (`titulo`, `chaves`, `detalhe`): inalterados.

---

## onde-ficam-chaves

ANTES: 1 parágrafo (160 caracteres) — as moedas vivem na blockchain, o que você tem é a chave, e
o ditado em inglês aparece sem tradução. Card fraco: a tabela carrega sozinha a seção.

pergunta: REMOVER (hoje 'q2')

```js
      emUmaFrase:
        'Existem três lugares onde a sua chave pode estar, e a diferença entre eles não é ' +
        'conforto nem preço: é quem consegue gastar o seu dinheiro sem te pedir licença.',
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
```

Demais campos (`titulo`, `detalhe`): inalterados. O visual da seção continua sendo `tabelaCarteiras`.

---

## quando-cada-carteira-faz-sentido

ANTES: 1 parágrafo (252 caracteres) — duas regras práticas, sem explicar por que elas funcionam e
sem dizer como as três categorias convivem no dia a dia.

(sem `pergunta` hoje)

```js
      emUmaFrase:
        'A pergunta certa não é "qual é a mais segura". É "para que serve esta aqui" — porque ' +
        'a mesma carteira que protege é a que atrapalha.',
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
```

Demais campos (`titulo`, `usoCarteira`, `detalhe`): inalterados.

---

## seed-e-carteira

ANTES: 1 parágrafo (83 caracteres) — "Guardar a frase-semente com segurança é a habilidade número
um de todo este módulo." Uma frase só, na ideia mais importante do módulo inteiro.

pergunta: REMOVER (hoje 'q10')

Este é o bloco que você aprovou. Vai aqui igual, como padrão dos demais.

```js
      emUmaFrase:
        'As 12 ou 24 palavras não são um backup da carteira. Elas são a carteira.',
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
```

Demais campos (`titulo`, `semente`, `contraste`, `detalhe`): inalterados.

---

## formas-de-perder-tudo

ANTES: 1 parágrafo (145 caracteres) — uma sequência de "nenhum" e a conclusão. "Phishing",
"airdrop" e "infostealer" aparecem no visual sem nenhuma tradução.

pergunta: REMOVER (hoje 'q3')

```js
      emUmaFrase:
        'As cinco formas parecem cinco problemas diferentes. São o mesmo problema cinco ' +
        'vezes: a frase saiu do papel.',
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
```

Demais campos (`titulo`, `formas`, `detalhe`): inalterados.

---

## wallet-drainers-conceito

ANTES: 1 parágrafo (392 caracteres) — define o kit, a assinatura e a divisão 80/20. A palavra
"aprovação/approval", que é o coração do golpe, só é definida três abas depois, na Defesa.

pergunta: REMOVER (hoje 'q6')

```js
      emUmaFrase:
        'Este golpe não precisa das suas palavras secretas. Ele precisa de um clique seu, ' +
        'num botão que parece rotina.',
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
```

Demais campos (`titulo`, `sequencia`, `detalhe`): inalterados.

---

## vetores-tecnicos

ANTES: 1 parágrafo (298 caracteres) — approval ilimitado, Permit e setApprovalForAll em três
frases. O `emUmaFrase` repete o título quase palavra por palavra, e "NFT" nunca é traduzido.

pergunta: REMOVER (hoje 'q4')

```js
      emUmaFrase:
        'Cada um dos três chega por uma tela diferente, com um nome diferente. Vale reconhecer ' +
        'os três pelo que eles pedem, não pelo que eles prometem.',
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
```

Demais campos (`titulo`, `truques`, `detalhe`): inalterados.

---

## address-poisoning-e-clipper

ANTES: 1 parágrafo (283 caracteres) — manda conferir a linha inteira e fazer teste de valor baixo.
"Address poisoning" fica sem tradução e o mecanismo dos dois golpes não é explicado no texto.

pergunta: REMOVER (hoje 'q7')

```js
      emUmaFrase:
        'Nestes dois golpes ninguém invade a sua carteira. Você mesmo envia, por vontade ' +
        'própria, para o endereço errado.',
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
```

Demais campos (`titulo`, `enderecos`, `clipper`, `detalhe`): inalterados.

---

## revogar-aprovacoes

ANTES: 2 parágrafos (390 caracteres) — define aprovação, diz que ela é eterna e resume o passo a
passo. "Spender", que é a coluna decisiva da lista, aparece só dentro do tutorial, sem tradução.

pergunta: REMOVER (hoje 'q12')

```js
      emUmaFrase:
        'Existe uma lista pública de tudo o que você já autorizou. A maioria das pessoas ' +
        'nunca abriu a sua.',
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
```

Demais campos (`titulo`, `contraste`, `detalhe`): inalterados.

---

## duas-camadas-permit2-e-eip7702

ANTES: 1 parágrafo (456 caracteres) — o card mais denso do módulo espremido num parágrafo só: os
dois lados do Permit2, o que é o EIP-7702, como é o golpe e dois casos com valor e data.

pergunta: REMOVER (hoje 'q11')

PROPOSTA DE DIVISÃO — este card carrega dois assuntos que só se parecem por estarem na mesma aba.
Mesmo reescrito, ele fica com quatro parágrafos longos, um quadro e um exemplo. Sugiro dividir em
duas seções, nesta ordem: `permit2-duas-camadas` (o que é o Permit2, as duas camadas, `lockdown` e
`invalidateNonces` — fica com o visual `camadas`) e `eip7702-delegacao` (o vetor novo, a Pectra e
os dois casos — sem visual próprio por enquanto). O corte natural fica entre o terceiro e o quarto
parágrafo abaixo. Se você preferir manter um card só, o bloco a seguir já está pronto para colar.

```js
      emUmaFrase:
        'Uma única assinatura pode valer a carteira inteira. Leia sempre o que a carteira ' +
        'pede antes de confirmar.',
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
```

Demais campos (`titulo`, `camadas`, `detalhe`): inalterados.

---

## plano-de-emergencia

ANTES: ZERO parágrafos (0 caracteres) — o card mais grave do módulo não tem uma linha de texto
corrido. São oito ordens em sequência, sem nenhum motivo explicado, e "sweeper bot" aparece
duas vezes sem tradução.

pergunta: REMOVER (hoje 'q5')

```js
      emUmaFrase:
        'A ordem dos passos aqui não é detalhe: fazer o certo na hora errada é o que faz ' +
        'perder o que ainda dava para salvar.',
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
```

Demais campos (`titulo`, `emergencia`, `passos`, `detalhe`): inalterados. Sobre o array `passos`
(as oito ordens), veja APONTAMENTOS.

---

## golpes-comuns-no-brasil

ANTES: 1 parágrafo (241 caracteres) — cinco sinais de alerta espremidos numa frase só, separados
por ponto e vírgula. "Pump and dump", "Ponzi", "pig butchering" e "stop order" aparecem nos cartões
sem tradução nenhuma.

pergunta: REMOVER (hoje 'q16')

```js
      emUmaFrase:
        'Os quatro trocam de roupa o tempo todo, mas a coreografia é sempre a mesma: entrar é ' +
        'fácil, render é lindo, e sair é impossível.',
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
```

Demais campos (`titulo`, `golpes`, `checagem`, `detalhe`): inalterados.

---

## cronologia-brasil

ANTES: 1 parágrafo (401 caracteres) — define PSAV, lista as exigências, dá o prazo e nomeia as
cinco corretoras que saíram. Não diz o que muda para quem só quer comprar e vender, e
"stablecoin" aparece no detalhe sem explicação.

pergunta: REMOVER (hoje 'q8')

```js
      emUmaFrase:
        'A regra nova não mudou o que você pode fazer. Mudou quem pode te atender — e isso já ' +
        'tirou cinco corretoras do varejo.',
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
```

Demais campos (`titulo`, `detalhe`): inalterados. O visual da seção continua sendo
`linhaDoTempoRegulacao`.

---

## impostos

ANTES: 2 parágrafos (409 caracteres) — diz que cripto é bem, que há imposto sobre ganho de capital
e que é preciso consultar um contador. "Ganho de capital" e "malha fina" não são explicados.

(sem `pergunta` hoje)

```js
      emUmaFrase:
        'Este card não ensina a calcular nada. Ele existe para você não descobrir tarde ' +
        'demais que precisava ter anotado.',
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
```

Demais campos (`titulo`, `registro`, `passosDoImposto`, `detalhe`): inalterados.

---

## sacar-para-reais

ANTES: 1 parágrafo (205 caracteres) — lista três riscos do P2P numa frase e diz que existe escrow,
sem traduzir "escrow" nem "P2P" e sem dizer o que fazer na ordem certa.

(sem `pergunta` hoje)

```js
      emUmaFrase:
        'Sair é o caminho que a maioria estuda menos e é onde moram dois riscos que não ' +
        'existem em nenhum outro card: o estorno e o bloqueio da sua conta.',
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
```

Demais campos (`titulo`, `saque`, `detalhe`): inalterados.

---

## APONTAMENTOS

Nada foi corrigido no arquivo de dados. O que segue são divergências e dúvidas para você decidir.

1. **`plano-de-emergencia.passos` ficou intocado.** Esse array de oito itens (`{forte, texto}`)
   não está na lista de campos que eu podia usar, nem na lista de visuais que outro chat cuida.
   Como ele é o corpo do card, deixei exatamente como está e escrevi os parágrafos para dar o
   motivo de cada ordem. Se ele for considerado visual, está tudo certo; se for texto, ele precisa
   entrar no escopo de alguém.

2. **A pergunta `q13` do quiz não tem card correspondente.** Ela trata de taxas e revogação de
   delegações na Solana. Nenhuma das 19 seções ensina delegação na Solana — o único conteúdo
   Solana sobre o assunto é a taxa base no card de gas. O aluno pode responder a `q13` sem ter
   lido nada a respeito.

3. **Divisão operador/afiliado aparece com dois valores diferentes.** No texto de
   `wallet-drainers-conceito`: "80% para o afiliado e 20% para o operador". No `detalhe` da mesma
   seção, citando He et al.: afiliados ficam "tipicamente com 80% a 90%". No `roteiroDrainer`,
   passo 5: "tipicamente 20%/80%". Mantive 80/20 no texto porque é o que estava lá, mas as três
   passagens não dizem exatamente a mesma coisa.

4. **Dois números quase idênticos, de assuntos diferentes.** Perdas de drainers em 2025: US$ 83,85
   milhões (Scam Sniffer). Perdas de address poisoning em dois anos: US$ 83,8 milhões (Carnegie
   Mellon). São estudos e recortes distintos, mas ficam em abas vizinhas e podem ser lidos como o
   mesmo dado. Não mexi em nenhum.

5. **"Contrato inteligente" está nos objetivos e no resumo, mas não tem card.** O `resumo` promete
   ensinar "o que são chave privada, chave pública, gas e contrato inteligente". O conteúdo existe,
   pronto e bem escrito, mas em `foraDoDesenho.contratoInteligente`, que não aparece na tela.
   Decisão sua: volta como seção (a aba "Fundamentos" seria o lugar) ou sai do resumo.

6. **`foraDoDesenho.stablecoinsNaReceita` não foi usado.** Como o card `cronologia-brasil` passou a
   explicar o que é stablecoin (por causa da Resolução 561), os números da Receita sobre
   stablecoins caberiam ali. Não usei porque esse bloco está fora do desenho e aguarda decisão sua.

7. **Divisão proposta:** `duas-camadas-permit2-e-eip7702` em duas seções. Detalhe e ponto de corte
   estão escritos na própria seção, acima.

8. **Seções sem número disponível para o exemplo.** Em `quando-cada-carteira-faz-sentido`,
   `revogar-aprovacoes`, `impostos` e `sacar-para-reais` não há nenhum valor no arquivo de dados que
   sirva de exemplo numérico. Escrevi exemplos em passos concretos, sem inventar cifra nenhuma. Se
   você quiser exemplos com valores nesses quatro, eles precisam vir de você ou de uma pesquisa.

9. **"Lamport" nunca é definido no arquivo.** O card de gas diz "5.000 lamports por assinatura
   (0,000005 SOL)". Escrevi, de conhecimento próprio, que lamport é a menor fração do SOL, como o
   centavo é do real. É explicação, não número novo — mas fica registrado que não veio da pesquisa.

10. **Cinco corretoras citadas, uma data só.** `cronologia-brasil` nomeia Bitso, Coinext, NovaDAX,
    Digitra e Bitnuvem, mas só a Coinext tem data de anúncio (03/09/2026) e só a Bitso tem destino
    (Mercado Bitcoin, setembro de 2026). Usei apenas o que está lá.

11. **Alerta do FBI.** O `detalhe` de `plano-de-emergencia` cita "IC3 I-072026 (20/07/2026)". Não
    trouxe o número do alerta para o texto principal, só a ideia (o IC3 não cobra para recuperar
    fundos). Se o identificador estiver errado, ele continua no `detalhe` como está.

12. **Cabeçalho do módulo não foi tocado.** `subtitulo`, `lembrete`, `resumo` e `objetivos` não são
    seções e ficaram fora do escopo. Com a reescrita, o `resumo` ficou curto em relação ao corpo, e
    o item 5 acima afeta diretamente uma das promessas dele.

13. **Repetição proposital.** "Frase-semente", "aprovação" e "assinar" passaram a ser reexplicados
    de forma curta quando reaparecem numa aba nova, porque o aluno pode entrar por qualquer aba.
    Se você preferir que cada termo seja explicado uma vez só, é fácil enxugar.

## TERMOS TRADUZIDOS

Cada jargão e a seção onde ele passou a ser explicado pela primeira vez no módulo (na ordem em que
o aluno encontra).

| Termo | Onde passou a ser explicado | Como |
| --- | --- | --- |
| hash | `o-que-e-blockchain` | impressão digital que resume o bloco e muda por inteiro se algo lá dentro mudar |
| bloco / confirmações | `o-que-e-blockchain` | página do caderno; confirmação é cada bloco fechado em cima do seu |
| Status / Success / Failed | `explorador-de-blocos` | "deu certo?" — Success executou, Failed falhou |
| Token Transfers | `explorador-de-blocos` | a aba onde aparece o que de fato se moveu; Value 0 não quer dizer nada aconteceu |
| validador | `gas-taxa-de-rede` | os computadores que montam os blocos e recebem a gorjeta |
| queimada | `gas-taxa-de-rede` | destruir moedas de propósito: saem de circulação e não vão para ninguém |
| EVM | `gas-taxa-de-rede` | a família de redes compatíveis com a Ethereum, que inclui BNB Chain e Base |
| lamport | `gas-taxa-de-rede` | a menor fração do SOL, como o centavo é do real |
| KYC | `cex-x-dex` | "conheça o seu cliente": o cadastro com documento e comprovante |
| livro de ofertas (order book) | `cex-x-dex` | a lista de quem quer comprar e de quem quer vender |
| pool de liquidez | `cex-x-dex` | reservatório com duas moedas, de onde você tira uma e deixa a outra |
| AMM | `cex-x-dex` | "criador de mercado automático": a fórmula que calcula o preço pela proporção do pool |
| slippage | `cex-x-dex` | escorregamento: a diferença entre o preço da tela e o que você recebeu |
| custódia | `cex-x-dex` e `onde-ficam-chaves` | uma empresa guardar o dinheiro por você, como o banco |
| assinar | `chave-publica-privada-endereco` | usar a chave privada para provar que a ordem partiu de você |
| "not your keys, not your coins" | `onde-ficam-chaves` | se as chaves não são suas, as moedas não são suas |
| hot wallet / cold wallet | `onde-ficam-chaves` | carteira quente (aparelho conectado) e carteira fria (aparelho offline) |
| risco de contraparte | `onde-ficam-chaves` | o risco de depender de alguém que pode sumir |
| frase-semente (seed phrase) | `seed-e-carteira` | a origem de todas as chaves, não um backup delas |
| phishing | `formas-de-perder-tudo` | "pescaria": uma isca que imita algo legítimo |
| airdrop | `formas-de-perder-tudo` | distribuição gratuita de tokens — existe de verdade, por isso funciona como isca |
| infostealer | `formas-de-perder-tudo` | programa escondido que vasculha o computador atrás de dados valiosos |
| wallet drainer | `wallet-drainers-conceito` | "esvaziador de carteira": kit de golpe instalado num site falso |
| mint | `wallet-drainers-conceito` | a criação de um item novo numa coleção |
| aprovação / approval | `wallet-drainers-conceito` | autorizar um programa a mover um token seu sem perguntar de novo |
| NFT | `vetores-tecnicos` | "token não fungível": um item único com número próprio, não uma quantidade |
| address poisoning | `address-poisoning-e-clipper` | envenenamento de endereço |
| clipper | `address-poisoning-e-clipper` | de clipboard, a área de transferência: o vírus que troca o que você colou |
| spender | `revogar-aprovacoes` | "quem vai gastar": o contrato que recebeu a permissão |
| revogar | `revogar-aprovacoes` | cancelar uma permissão; é tranca para o futuro, não botão de desfazer |
| delegação (EIP-7702) | `duas-camadas-permit2-e-eip7702` | autorizar o comportamento do próprio endereço, e não um token |
| sweeper bot | `plano-de-emergencia` | "robô varredor": leva tudo o que chega num endereço cuja frase vazou |
| pump and dump | `golpes-comuns-no-brasil` | "inflar e despejar": ele compra antes, manda o grupo comprar e vende no topo |
| esquema Ponzi | `golpes-comuns-no-brasil` | paga os antigos com o dinheiro dos novos, até desabar |
| pig butchering | `golpes-comuns-no-brasil` | "engorda do porco": semanas de confiança antes do abate |
| stop order | `golpes-comuns-no-brasil` | a ordem formal da CVM para uma empresa parar de ofertar algo ao público |
| CVM | `golpes-comuns-no-brasil` | Comissão de Valores Mobiliários: fiscaliza ofertas de investimento |
| PSAV | `cronologia-brasil` | Prestadora de Serviços de Ativos Virtuais |
| segregação de recursos | `cronologia-brasil` | manter o dinheiro dos clientes separado do caixa da empresa |
| stablecoin | `cronologia-brasil` | token feito para valer sempre o mesmo que uma moeda tradicional |
| câmbio eletrônico (eFX) | `cronologia-brasil` | pagamentos internacionais |
| ganho de capital | `impostos` | o imposto sobre a valorização, cobrado quando você realiza o ganho |
| malha fina | `impostos` | a retenção da declaração para conferência |
| P2P | `sacar-para-reais` | peer-to-peer: negociação direta de pessoa para pessoa |
| escrow | `sacar-para-reais` | depósito em garantia: a plataforma segura a cripto até as duas pontas confirmarem |
| estorno | `sacar-para-reais` | o pagador pedir o dinheiro de volta ao banco depois de já ter pago |
