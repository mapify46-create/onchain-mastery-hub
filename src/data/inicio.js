// inicio.js — os textos da tela de Início (#/inicio).
// Aqui só tem DADOS: nenhuma lógica, nenhum HTML. A tela que usa isto é
// src/views/inicio.js.
//
// Os textos vêm do desenho "30 Inicio" (pesquisa/design/handoff/designs). Onde o
// desenho erra a regra do app, vale o app — está marcado no comentário do campo.
//
// Números que aparecem aqui ("1, 3, 7, 16 e 35 dias", "12 cenários") são os mesmos
// de ESCADA_DIAS (src/components/revisao.js) e de src/data/cenarios.js. As contas da
// tela (quantos módulos, termos e cenários) são feitas na view, a partir dos dados.
//
// Frases com número usam lacunas entre chaves: "Revisar {n} perguntas". A view troca
// {n}, {modulo}, {total} etc. pelos números do seu progresso. Quando a frase muda no
// singular, há duas formas: { um: '…1…', varios: '…{n}…' }.

export const inicio = {
  cabecalho: {
    rotulo: 'onchain-mastery-hub',
    titulo: 'Bem-vindo ao seu hub de estudos on-chain',
    subtitulo:
      'Um curso local para aprender, do zero, como funcionam as memecoins, quais ferramentas ' +
      'existem e — principalmente — como decidir sem se enganar. Tudo roda no seu navegador, ' +
      'e o progresso fica salvo aqui mesmo.',
  },

  // 1. O bloco dominante: um botão só, escolhido por uma regra fixa.
  proximaAcao: {
    rotulo: 'Próxima ação',
    nota:
      'Um botão só, em vez de ter de decidir por onde continuar. A ordem de prioridade é ' +
      'fixa: revisar o que venceu vem antes de conteúdo novo.',
    // O que cada regra mostra: o título grande, a frase de baixo e o botão.
    // {n} = quantas perguntas venceram; {modulo} = o título ou o "Módulo N" do módulo.
    acoes: {
      revisar: {
        titulo: { um: 'Revisar 1 pergunta', varios: 'Revisar {n} perguntas' },
        detalhe: 'A revisão de hoje vem antes de conteúdo novo.',
        botao: 'Revisar agora',
      },
      continuar: {
        titulo: 'Continuar: {modulo}',
        detalhe: 'Falta estudar as abas e responder o quiz.',
        botao: 'Abrir o módulo',
      },
      refazerQuiz: {
        titulo: 'Refazer o quiz do {modulo}',
        // Vem antes do detalhe: "Você acertou 2 de 4. Releia as explicações…"
        acertos: 'Você acertou {acertos} de {total}.',
        detalhe: 'Releia as explicações das que errou e refaça.',
        botao: 'Abrir o quiz',
      },
      concluir: {
        titulo: 'Concluir: {modulo}',
        detalhe: 'Quiz feito. Falta marcar o módulo como concluído, no fim da aba Quiz.',
        botao: 'Abrir o módulo',
      },
      simulador: {
        titulo: 'Refazer o simulador do Módulo 4',
        detalhe: 'Todos os módulos concluídos. Refaça os cenários sem olhar os feedbacks antes.',
        botao: 'Abrir o simulador',
        href: '#/modulo-4',
      },
    },
    // O anel ao lado do botão: módulos concluídos no centro, % da trilha embaixo.
    // O desenho diz "contando quiz e conclusão"; no app a metade do quiz vale pelo acerto.
    anel: {
      centro: 'de {total} módulos',
      legenda: '{percentual}% da trilha',
      descricao:
        '{concluidos} de {total} módulos concluídos, {percentual} por cento da trilha contando ' +
        'o acerto no quiz e a conclusão.',
    },
    // O <details> "Como esta ação é escolhida": as 5 regras, na ordem em que são testadas.
    tituloDasRegras: 'Como esta ação é escolhida',
    regras: [
      'Venceu alguma pergunta na revisão? Revisar vem antes de conteúdo novo.',
      'Existe um módulo sem quiz respondido? Continuar o primeiro deles.',
      'Algum quiz ficou abaixo de 80%? Refazer, depois de reler as explicações.',
      'Quiz feito mas módulo não marcado? Concluir o módulo.',
      'Tudo concluído? Refazer o simulador do Módulo 4, sem olhar os feedbacks antes.',
    ],
    fechamentoDasRegras:
      'A regra em destaque é a que se aplica agora. Meta concreta e única rende mais que ' +
      'meta vaga (Locke & Latham, 2002).',
  },

  // 2. O mapa da trilha: os 7 módulos na ordem e as duas rotas de uso contínuo.
  trilha: {
    titulo: 'O mapa da trilha',
    // O nome da seção para o leitor de tela (o aria-label do desenho).
    rotuloDaSecao: 'Mapa da trilha',
    rotulo: 'Relação: ordem, e o que falta',
    texto:
      'Os 7 módulos na ordem — cada um assume o anterior — e as duas rotas que você usa ' +
      'durante e depois deles. Clique para abrir.',
    // Título curto e descrição de uma linha de cada módulo, como no desenho.
    // `curto` é o nome usado na Próxima ação ("Refazer o quiz do Módulo 2") e nas
    // barras de progresso.
    modulos: {
      'modulo-1': {
        curto: 'Módulo 1',
        titulo: 'M1 Fundamentos & Segurança Cripto',
        descricao: 'Blockchain, carteiras, frase-semente, golpes, defesa e o Brasil.',
      },
      'modulo-2': {
        curto: 'Módulo 2',
        titulo: 'M2 Psicologia das memecoins',
        descricao: 'Economia da atenção, os 5 vieses, tipos de token e as 4 fases.',
      },
      'modulo-3': {
        curto: 'Módulo 3',
        titulo: 'M3 Os dois pilares',
        descricao: 'Pilar social e pilar técnico, narrativas e a matriz de ferramentas.',
      },
      'modulo-4': {
        curto: 'Módulo 4',
        titulo: 'M4 Gestão, catálises & decisão',
        descricao: 'Tese, catálise, take profit e o simulador de decisão.',
      },
      'modulo-5': {
        curto: 'Módulo 5',
        titulo: 'M5 A mecânica da execução',
        descricao: 'Terminal, custódia, as cinco camadas de taxa e os erros de operação.',
      },
      'modulo-6': {
        curto: 'Módulo 6',
        titulo: 'M6 Ler a tela',
        descricao: 'Market cap × liquidez, volume falso, o contrato e prever o golpe.',
      },
      'modulo-7': {
        curto: 'Módulo 7',
        titulo: 'M7 A rotina',
        descricao: 'A regra, o tamanho, o diário, a revisão e os números que circulam.',
      },
    },
    checklist: {
      marca: '✓',
      titulo: 'Checklist antes de comprar',
      descricao: 'Usado a cada token, durante e depois dos módulos. Nunca "concluído": é rotina.',
      etiqueta: 'Rotina',
      href: '#/checklist',
    },
    revisao: {
      marca: '⇢',
      titulo: 'Revisão espaçada',
      descricao: 'As perguntas dos quizzes voltam em 1, 3, 7, 16 e 35 dias.',
      // Depois da descrição vem uma destas frases:
      //   com fila, "33 na fila.";
      //   sem fila e sem quiz feito, filaVazia (a do desenho);
      //   sem fila mas com quiz feito (um quiz de antes da fila, ou um progresso
      //   importado), a frase "Abra a Revisão uma vez…" do card Revisão de hoje —
      //   o desenho não tem esse caso, e "começa no primeiro quiz" seria falso.
      naFila: '{n} na fila.',
      filaVazia: 'A fila começa no primeiro quiz.',
      emDia: 'Em dia',
      href: '#/revisao',
    },
    etiquetas: {
      feito: 'Concluído',
      comecado: 'Começado',
      aFazer: 'A fazer',
      aqui: 'Você está aqui',
    },
    legenda: {
      feito: 'concluído',
      comecado: 'começado',
      aFazer: 'a fazer',
      aqui: 'é onde você está',
    },
    // O mapa inteiro em uma frase, para o leitor de tela. {itens} é a lista dos
    // módulos e das duas rotas, separados por "; ".
    descricao: {
      modelo: 'Mapa da trilha: {itens}.',
      modulo: '{titulo} — {etiqueta}, {percentual} por cento',
      rota: '{titulo} — {etiqueta}',
    },
  },

  // "1 vencida" / "4 vencidas": a etiqueta da Revisão no mapa e a contagem do card
  // Revisão de hoje.
  vencidas: { um: '1 vencida', varios: '{n} vencidas' },

  // 3. Como estudar: o ciclo, a escada dos intervalos e os 6 passos.
  comoEstudar: {
    titulo: 'Como estudar',
    rotulo: 'Relação: o que se repete',
    ideia:
      'Ler a aba → responder o quiz → revisar em 1, 3, 7, 16 e 35 dias. E volta ao começo, ' +
      'na aba seguinte.',
    etapas: ['Ler a aba', 'Responder o quiz', 'Revisar'],
    // Os dias vêm de ESCADA_DIAS: {dias} = "1 · 3 · 7 · 16 · 35" embaixo de "Revisar"
    // e "1, 3, 7, 16 e 35" na descrição do ciclo para leitor de tela.
    detalheDoRevisar: '{dias} dias',
    descricaoDoCiclo:
      '1 {ler} → 2 {responder} → 3 {revisar} em {dias} dias → e volta ao começo, na aba seguinte.',
    tituloDaEscada: 'A escada dos intervalos, na mesma escala de tempo',
    // Cada barra da escada: "Degrau 1" à esquerda e o intervalo à direita.
    degrau: 'Degrau {n}',
    intervalo: { um: 'amanhã (1 dia)', varios: '{n} dias' },
    // A escada em uma frase, para o leitor de tela.
    descricaoDaEscada: {
      modelo: 'Intervalos por degrau, na mesma escala: {itens}.',
      item: { um: 'degrau {degrau}, 1 dia', varios: 'degrau {degrau}, {n} dias' },
    },
    legendaDaEscada:
      'Acertou, sobe um degrau; errou, volta ao primeiro. O primeiro nunca é "hoje": a ' +
      'primeira revisão no mesmo dia vira releitura, e releitura ensina pouco. A escada é ' +
      'derivada da teoria do espaçamento — não foi testada nesta forma exata.',
    passos: [
      'Comece pelo Módulo 1 e siga na ordem até o 7 — cada um assume o anterior.',
      'Abra o Glossário sempre que aparecer um termo novo e marque como estudado o que já entendeu.',
      'Responda o mini-quiz no fim de cada módulo antes de marcar o módulo como concluído.',
      'Volte à página Revisão quando ela avisar: as perguntas retornam em 1, 3, 7, 16 e 35 dias.',
      'Treine a decisão nos 12 cenários do simulador do Módulo 4.',
      'Antes de qualquer compra, passe o token pela página Checklist antes de comprar.',
    ],
  },

  // 4. Revisão de hoje: um dos quatro textos, conforme a fila.
  revisaoDeHoje: {
    titulo: 'Revisão de hoje',
    // À direita do título: "4 vencidas · 33 na fila" ({vencidas} vem de inicio.vencidas).
    contagem: '{vencidas} · {n} na fila',
    filaVazia: 'fila vazia',
    // Com vencidas: "4 perguntas venceram. Responder de novo, …".
    vencidas: {
      um: '1 pergunta venceu.',
      varios: '{n} perguntas venceram.',
      resto: 'Responder de novo, dias depois, é o que faz o conteúdo ficar.',
    },
    nadaVencido: 'Nada vencido hoje. As perguntas voltam em 1, 3, 7, 16 e 35 dias, conforme você acerta.',
    abrirUmaVez: 'Abra a Revisão uma vez: as perguntas dos quizzes que você já fez entram na fila.',
    semQuiz: 'Responda o quiz de um módulo e as perguntas dele voltam aqui no dia seguinte.',
    botaoVencidas: 'Revisar agora',
    botao: 'Abrir a Revisão',
  },

  // 5. Seu progresso, módulo a módulo.
  progresso: {
    titulo: 'Seu progresso, módulo a módulo',
    rotuloDaSecao: 'Seu progresso',
    // À direita do título e na barra geral.
    geral: '{percentual}% dos {total} módulos',
    descricaoDaBarraGeral: 'Progresso geral dos módulos: {geral}',
    // A barra de cada módulo: "88% · quiz 15/16 · concluído", e o nome das duas
    // partes (aparece ao passar o mouse).
    modulo: {
      valor: '{percentual}% · {detalhes}',
      quiz: 'quiz {acertos}/{total}',
      concluido: 'concluído',
      parteQuiz: 'acerto no quiz',
      parteConcluida: 'módulo concluído',
    },
    // As duas últimas barras contam itens: {total} vem de glossario.js e cenarios.js.
    glossario: {
      rotulo: 'Glossário',
      valor: '{feitos} de {total} termos estudados',
      parte: 'termos estudados',
    },
    simulador: {
      rotulo: 'Simulador',
      valor: '{feitos} de {total} cenários respondidos',
      parte: 'cenários respondidos',
    },
    // As 9 barras em uma frase, para o leitor de tela.
    descricao:
      'Progresso por módulo, cada um valendo metade pelo acerto no quiz e metade pela ' +
      'conclusão: {modulos}. E ainda: {extras}.',
    // O desenho diz "quiz respondido (50%)". No app, a metade do quiz vale pelo
    // ACERTO (store.js, decisão do dono de 14/09 mantida em 18/09).
    legendaQuiz: 'acerto no quiz (50%)',
    legendaConcluido: 'módulo concluído (50%)',
    // Idem: o desenho diz "metade por responder o quiz". A conta do app é pelo acerto.
    // {termos} e {cenarios} a view troca pelos totais de glossario.js e cenarios.js.
    nota:
      'Cada módulo vale metade pelo acerto no quiz e metade por marcar como concluído — é a ' +
      'mesma conta do app. As duas últimas barras contam itens, não metades: termos ' +
      'estudados de {termos} no Glossário e cenários respondidos de {cenarios} no Simulador.',
    naoComecado: 'não começado',
  },

  // 6. Seu plano "quando X, eu faço Y".
  plano: {
    titulo: 'Seu plano: quando, e o quê',
    rotuloDaSecao: 'Seu plano',
    texto:
      'Escreva "quando X, eu faço Y" e "se surgir o obstáculo Z, então W". Escolha um obstáculo ' +
      'concreto e superável: "falta de tempo" foi o caso em que esse tipo de plano não funcionou.',
    rotulo: 'O seu plano',
    exemplo:
      'Quando [terminar o café], eu [abro a Revisão e leio uma aba]. Se [chegar um call no ' +
      'Telegram], então [passo o token pelo Checklist antes de qualquer coisa].',
    botao: 'Salvar o plano',
    // Os avisos que aparecem no canto depois de clicar em Salvar.
    salvou: 'Plano salvo',
    naoSalvou: 'Não consegui salvar o plano',
    nota:
      'Fica salvo neste navegador. Planos "quando X, eu faço Y" aumentam a chance de cumprir ' +
      'uma meta (Gollwitzer & Sheeran, 2006).',
  },

  // 7. Guardar o progresso: exportar e importar um arquivo.
  guardar: {
    titulo: 'Guardar o progresso',
    texto:
      'Tudo fica só neste navegador: limpar os dados dele apaga o progresso. Exporte um arquivo ' +
      'de vez em quando; ele importa em outro navegador ou computador.',
    diagrama: {
      origem: 'Progresso neste navegador',
      exportar: 'Exportar',
      // O nome do arquivo, em três pedaços: o do meio sai em cinza.
      arquivo: ['omh-progresso-', 'AAAA-MM-DD', '.json'],
      importar: 'Importar',
      destino: 'Outro navegador ou computador',
      descricao:
        'Exportar gera um arquivo .json com o seu progresso, que sai do navegador para o seu ' +
        'computador. Importar lê esse arquivo e substitui o progresso do navegador.',
    },
    botaoExportar: 'Exportar',
    botaoImportar: 'Importar',
    // O nome do campo escondido que abre a janela de escolher arquivo.
    escolherArquivo: 'Escolher o arquivo de progresso',
    // Os avisos depois de escolher o arquivo.
    importou: 'Progresso importado',
    arquivoInvalido: 'Esse arquivo não é um progresso válido',
  },

  // O fecho da página (o router não põe o aviso de rodapé no Início).
  antesDeTudo: {
    rotulo: 'Antes de tudo: ',
    texto:
      'este hub é material de estudo próprio, e os números dos exercícios são de treino. ' +
      'Memecoin é o ativo de maior risco do mercado: 68,67% dos tokens do Pump.fun pararam ' +
      'de negociar no mesmo dia em que nasceram (CoinGecko Research).',
  },
};
