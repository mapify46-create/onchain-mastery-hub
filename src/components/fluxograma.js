// fluxograma.js — os fluxogramas do hub, desenhados em HTML no traço do design
// system (handoff "00 Componentes › Fluxograma"), sem Mermaid e sem CDN.
//
// Dois componentes moram aqui:
//
//   criarFluxograma  — árvore de cima para baixo: pergunta → ramos "Sim/Não" lado a
//                      lado no desktop (empilhados no celular) → o nó onde os ramos
//                      se juntam. Serve para "se isto, então aquilo".
//   criarFluxoLinear — espinha de perguntas, cada uma com duas saídas: o desvio
//                      ("Não compro…") e o "segue". Serve para as checagens em ordem
//                      (Checklist, checagem do contrato do Módulo 6).
//
// O fluxograma aceita os dados de dois jeitos:
//
//   1. Direto, como no desenho:
//        { nos:   [{ id, tipo, texto, suave?, nota?, peso? }],
//          setas: [{ de, para, rotulo?, tom?, tracejada?, ligacao? }] }
//      tipo  = 'pergunta' | 'acao' | 'bom' | 'ruim' | 'alerta'
//      suave = true pinta o texto de cinza (#9AA7B4): a caixa que só explica
//              ("Só resta esperar o terminal voltar"), como nos desenhos do M3 e M5.
//      nota  = true: caixa de observação, sem negrito e, no eixo, até 520px de
//              largura (o "No outro extremo…" âmbar embaixo do slippage, M5).
//      peso  = 400 ou 600: força o peso da letra da caixa quando o desenho foge
//              do padrão (padrão: início, pergunta e resultados em 600; ação
//              dentro de um ramo em 400).
//      tom   = cor do rótulo da seta ('bom' | 'ruim' | 'alerta' | 'neutro'). Sem tom,
//              a cor sai do nó para onde a seta leva (ver corDoRamo abaixo).
//      ligacao = true: não é seta, é um traço entre dois nós de partida que ficam
//              lado a lado no topo (o desenho do wash trading, M6).
//
//   2. O texto Mermaid que já está em src/data (`codigoMermaid`). O leitor abaixo
//      (interpretarDiagrama) traduz o texto para o formato 1. Sintaxe aceita:
//        flowchart TD | graph LR        cabeçalho, ignorado (o desenho é sempre de
//                                       cima para baixo)
//        A[Texto] / A["Texto"]          caixa de ação
//        B{Pergunta} / B{"Pergunta?"}   pergunta
//        A --> B                        seta simples
//        A -- Sim --> B                 seta com rótulo (com ou sem aspas)
//        A -->|Sim| B                   idem, forma alternativa
//        A -.-> B                       seta tracejada
//        A -.-|x| B / A -.- B           ligação sem ponta: A e B lado a lado, no
//                                       topo, ligados por um traço com o rótulo x
//        %% comentário                  ignorado
//        classDef nome ...              ignorado (as cores vêm do design system)
//        class X,Y nao                  tipo das caixas: nao = ruim, sim = bom,
//                                       alerta = âmbar (também alto/medio/baixo/fim)
//        class C ramoRuim               cor do RÓTULO da seta que chega em C, sem
//                                       pintar a caixa (ramoBom, ramoRuim,
//                                       ramoAlerta, ramoNeutro)
//        class C suave                  texto da caixa em cinza (caixa que só explica)
//        class C nota                   caixa de observação: sem negrito, até 520px
//        class C forte                  caixa em negrito (peso 600) mesmo sendo ação
//      Se o texto tiver algo que o leitor não entende, criarFluxograma devolve null
//      e quem chama (diagrama.js) mostra a reserva.
//
// As cores e medidas ficam nas classes .omh-fluxo* de styles/custom.css — é lá que
// o celular (≤ 640px) troca os ramos lado a lado pela pilha com borda colorida.

import { criarElemento } from '../ui.js';

// Os cinco tipos de nó que o desenho conhece.
const TIPOS = new Set(['pergunta', 'acao', 'bom', 'ruim', 'alerta']);

// Nome da classe no texto Mermaid → tipo da caixa.
const TIPO_DA_CLASSE = {
  nao: 'ruim',
  ruim: 'ruim',
  alto: 'ruim',
  sim: 'bom',
  bom: 'bom',
  baixo: 'bom',
  alerta: 'alerta',
  medio: 'alerta',
  fim: 'acao',
  acao: 'acao',
  pergunta: 'pergunta',
};

// Nome da classe no texto Mermaid → cor do rótulo da seta que chega no nó.
const TOM_DO_RAMO = { ramoBom: 'bom', ramoRuim: 'ruim', ramoAlerta: 'alerta', ramoNeutro: 'neutro' };

// ===========================================================================
// 1. Leitura dos dados
// ===========================================================================

// Tira as aspas de fora e troca <br> por espaço.
function limparTexto(texto) {
  return texto.trim().replace(/^"(.*)"$/s, '$1').replace(/<br\s*\/?>/gi, ' ').trim();
}

// Um lado da seta: `A`, `A[Texto]`, `A["Texto"]`, `A{Pergunta}` ou `A{"Pergunta?"}`.
const LADO = /^([A-Za-z0-9_]+)\s*(?:\["([^"]*)"\]|\[([^\]]*)\]|\{"([^"]*)"\}|\{([^}]*)\})?$/;

/**
 * Lê o texto Mermaid e devolve { nos, setas }, ou null se não entender.
 * (Também devolve `arestas`, o nome antigo de `setas`.)
 */
export function interpretarDiagrama(codigo) {
  if (typeof codigo !== 'string' || !codigo.trim()) return null;

  const nos = new Map();
  const setas = [];

  const registrar = (id, texto, tipo) => {
    const existente = nos.get(id);
    if (!existente) {
      nos.set(id, { id, texto: texto ?? id, tipo: tipo ?? 'acao' });
      return;
    }
    if (texto && existente.texto === existente.id) existente.texto = texto;
    if (tipo && existente.tipo === 'acao') existente.tipo = tipo;
  };

  const lerLado = (bruto) => {
    const parte = LADO.exec(bruto.trim());
    if (!parte) return null;
    const [, id, caixaComAspas, caixa, perguntaComAspas, pergunta] = parte;
    const textoDaPergunta = perguntaComAspas ?? pergunta;
    const texto = textoDaPergunta ?? caixaComAspas ?? caixa;
    registrar(
      id,
      texto === undefined ? undefined : limparTexto(texto),
      textoDaPergunta !== undefined ? 'pergunta' : undefined,
    );
    return id;
  };

  for (const linhaBruta of codigo.split('\n')) {
    const original = linhaBruta.trim();
    if (!original || /^(flowchart|graph)\b/.test(original) || /^classDef\b/.test(original) || original.startsWith('%%')) continue;

    // `class X,Y nome`: pinta as caixas ou só o rótulo da seta que chega nelas.
    const marcacao = /^class\s+([A-Za-z0-9_,\s]+?)\s+([A-Za-z0-9_]+)$/.exec(original);
    if (marcacao) {
      const [, ids, nome] = marcacao;
      ids.split(',').map((id) => id.trim()).forEach((id) => {
        const no = nos.get(id);
        if (!no) return;
        if (TIPO_DA_CLASSE[nome]) no.tipo = TIPO_DA_CLASSE[nome];
        if (TOM_DO_RAMO[nome]) no.ramo = TOM_DO_RAMO[nome];
        if (nome === 'suave') no.suave = true;
        if (nome === 'nota') no.nota = true;
        if (nome === 'forte') no.peso = 600;
      });
      continue;
    }

    // Seta tracejada (-.->) vira seta normal com a marca `tracejada`. Traço sem
    // ponta (-.-|x| ou -.-) é uma LIGAÇÃO: junta dois nós lado a lado, sem dizer
    // que um vem depois do outro ("Carteira A" -.- "Carteira B": mesma pessoa).
    const tracejada = /-\.-/.test(original);
    const ligacao = /-\.-(?!>)/.test(original);
    const linha = original.replace(/-\.->/g, '-->').replace(/-\.-\|/g, '-->|').replace(/-\.-(?=\s)/g, '-->');

    const comRotuloDepois = /^(.+?)\s*-->\s*\|([^|]*)\|\s*(.+)$/.exec(linha);
    const comRotuloAntes = /^(.+?)\s*--\s*(.+?)\s*-->\s*(.+)$/.exec(linha);
    const simples = /^(.+?)\s*-->\s*(.+)$/.exec(linha);

    let origem;
    let destino;
    let rotulo = '';
    if (comRotuloDepois) {
      origem = lerLado(comRotuloDepois[1]);
      rotulo = limparTexto(comRotuloDepois[2]);
      destino = lerLado(comRotuloDepois[3]);
    } else if (comRotuloAntes) {
      origem = lerLado(comRotuloAntes[1]);
      rotulo = limparTexto(comRotuloAntes[2]);
      destino = lerLado(comRotuloAntes[3]);
    } else if (simples) {
      origem = lerLado(simples[1]);
      destino = lerLado(simples[2]);
    } else {
      // Um nó sozinho na linha (`A["Texto"]`) só declara o texto.
      if (lerLado(linha)) continue;
      return null;
    }
    if (!origem || !destino) return null;
    setas.push({ de: origem, para: destino, rotulo, tracejada, ligacao });
  }

  if (!nos.size || !setas.length) return null;
  return { nos: [...nos.values()], setas, arestas: setas };
}

// Confere o formato direto { nos, setas } e completa o que faltar.
function lerFormatoDireto(dados) {
  if (!dados || !Array.isArray(dados.nos) || !Array.isArray(dados.setas)) return null;
  const nos = dados.nos
    .filter((no) => no && no.id !== undefined)
    .map((no) => ({ ...no, id: String(no.id), texto: String(no.texto ?? no.id), tipo: TIPOS.has(no.tipo) ? no.tipo : 'acao' }));
  const ids = new Set(nos.map((no) => no.id));
  const setas = dados.setas
    .filter((s) => s && ids.has(String(s.de)) && ids.has(String(s.para)))
    .map((s) => ({ ...s, de: String(s.de), para: String(s.para), rotulo: s.rotulo ?? '' }));
  if (!nos.length) return null;
  return { nos, setas };
}

// Aceita { nos, setas } direto, { diagrama: { nos, setas } } ou { diagrama: 'texto Mermaid' }.
function lerDados(opcoes) {
  if (Array.isArray(opcoes.nos)) return lerFormatoDireto(opcoes);
  if (opcoes.diagrama && typeof opcoes.diagrama === 'object') return lerFormatoDireto(opcoes.diagrama);
  return interpretarDiagrama(opcoes.diagrama);
}

// ===========================================================================
// 2. Peças de desenho (as medidas estão nas classes .omh-fluxo* do CSS)
// ===========================================================================

// Cor do rótulo "Sim/Não": sai do SENTIDO do ramo, nunca do texto do rótulo.
// Ordem: tom escrito na seta → classe ramoX no nó de destino → tipo do nó de
// destino (ruim = vermelho, bom = verde, alerta = âmbar) → neutro.
function corDoRamo(seta, porId) {
  if (seta.tom) return seta.tom === 'nao' ? 'ruim' : seta.tom;
  const alvo = porId.get(seta.para);
  if (alvo?.ramo) return alvo.ramo;
  if (alvo && ['bom', 'ruim', 'alerta'].includes(alvo.tipo)) return alvo.tipo;
  return 'neutro';
}

// A caixa de um nó. `eixo` = está na coluna do meio (não dentro de um ramo);
// `inicio` = é o primeiro nó do desenho; `fim` = não leva a lugar nenhum.
// No desenho, início e fim no eixo vão em negrito (peso 600); caixa de ação
// dentro de um ramo, não. `nota` e `peso` (vindos dos dados) mudam isso.
function caixa(no, { eixo = false, inicio = false, fim = false } = {}) {
  const tipo = TIPOS.has(no.tipo) ? no.tipo : 'acao';
  const classes = ['omh-fluxo-no', 'omh-fluxo-no--' + tipo];
  if (eixo) classes.push('omh-fluxo-no--eixo');
  if ((inicio || (eixo && fim)) && tipo === 'acao' && !no.nota) classes.push('omh-fluxo-no--inicio');
  if (no.suave) classes.push('omh-fluxo-no--suave');
  if (no.nota) classes.push('omh-fluxo-no--nota');
  if (Number(no.peso) === 600) classes.push('omh-fluxo-no--forte');
  if (Number(no.peso) === 400) classes.push('omh-fluxo-no--leve');
  return criarElemento('div', { class: classes.join(' ') }, [no.texto]);
}

// Seta para baixo: linha de 2px + ponta (quadrado girado 45°), como no desenho.
function seta({ tracejada = false, juncao = false } = {}) {
  const classes = ['omh-fluxo-seta'];
  if (tracejada) classes.push('omh-fluxo-seta--tracejada');
  if (juncao) classes.push('omh-fluxo-seta--juncao');
  return criarElemento('div', { class: classes.join(' '), 'aria-hidden': 'true' });
}

// Linha sem ponta (o começo de cada ramo, antes do rótulo).
function linha() {
  return criarElemento('div', { class: 'omh-fluxo-linha', 'aria-hidden': 'true' });
}

// Pílula do rótulo da seta ("Sim", "Não", "Caminho A · corretora"…).
function rotuloDaSeta(texto, tom) {
  return criarElemento('span', { class: 'omh-fluxo-rotulo omh-fluxo-rotulo--' + tom }, [texto]);
}

// Nó que já está desenhado em outro lugar (volta de laço): "⇢ texto do nó".
function referencia(no) {
  const tipo = TIPOS.has(no.tipo) ? no.tipo : 'acao';
  return criarElemento('div', { class: 'omh-fluxo-ref omh-fluxo-ref--' + tipo }, [
    criarElemento('span', { 'aria-hidden': 'true' }, ['⇢']),
    ' ' + no.texto,
  ]);
}

// ===========================================================================
// 3. A árvore
// ===========================================================================

// Ligação entre dois nós de partida lado a lado, como no desenho do M6: um
// tracejado de 56px e, embaixo dele, o rótulo em texto pequeno na cor do tom
// ("Carteira A" ‒ ‒ ‒ "Carteira B", com "mesma pessoa" embaixo do tracejado).
function ligacaoEntreRaizes(lig, tom) {
  return criarElemento('div', { class: 'omh-fluxo-ligacao omh-fluxo-ligacao--' + tom }, [
    criarElemento('span', { class: 'omh-fluxo-ligacao-traco', 'aria-hidden': 'true' }),
    lig.rotulo ? criarElemento('span', { class: 'omh-fluxo-ligacao-rotulo' }, [lig.rotulo]) : null,
  ]);
}

// Colchete que junta os nós de partida num fio só, antes da seta para o nó onde
// eles se encontram (as duas metades são as do desenho do M6).
function colchete() {
  return criarElemento('div', { class: 'omh-fluxo-colchete', 'aria-hidden': 'true' }, [
    criarElemento('span', { class: 'omh-fluxo-colchete-esquerda' }),
    criarElemento('span', { class: 'omh-fluxo-colchete-direita' }),
  ]);
}

function desenharArvore(nos, todasAsSetas) {
  // As ligações (traço sem ponta) não dizem ordem: ficam fora da árvore e só
  // aparecem entre dois nós de partida lado a lado.
  const setas = todasAsSetas.filter((s) => !s.ligacao);
  const ligacoes = todasAsSetas.filter((s) => s.ligacao);
  const porId = new Map(nos.map((no) => [no.id, no]));
  const saidasDe = (id) => setas.filter((s) => s.de === id && s.para !== id);
  const entradasDe = (id) => setas.filter((s) => s.para === id && s.de !== id);
  const ehFim = (id) => saidasDe(id).length === 0;

  // Os nós de partida: sem seta chegando. Quase sempre um só (a raiz).
  const raizes = nos.filter((no) => entradasDe(no.id).length === 0);
  const raiz = raizes[0] ?? nos[0];
  const ehPartida = (id) => id === raiz.id || raizes.some((no) => no.id === id);

  // Nós que continuam depois e já foram desenhados. Um nó de fim ("Não compro")
  // pode repetir em cada ramo, como no desenho: repetir um fim não confunde.
  const desenhados = new Set();

  // Todos os nós alcançáveis a partir de `inicio`, do mais perto ao mais longe,
  // sem entrar em `bloqueio` (quem já está acima) nem em `parada`.
  function alcance(inicio, bloqueio, parada) {
    const ordem = [];
    const vistos = new Set();
    const fila = [inicio];
    while (fila.length) {
      const id = fila.shift();
      if (vistos.has(id) || bloqueio.has(id) || parada.has(id)) continue;
      vistos.add(id);
      ordem.push(id);
      saidasDe(id).forEach((s) => fila.push(s.para));
    }
    return ordem;
  }

  // Todo caminho que sai de `inicio` passa por `alvo` antes de acabar?
  function todoCaminhoPassaPor(inicio, alvo, bloqueio, parada) {
    const vistos = new Set();
    const pilha = [inicio];
    while (pilha.length) {
      const id = pilha.pop();
      if (id === alvo || vistos.has(id)) continue;
      vistos.add(id);
      // Chegou a um fim, voltou para cima ou saiu do trecho sem passar por `alvo`.
      if (bloqueio.has(id) || parada.has(id) || ehFim(id)) return false;
      saidasDe(id).forEach((s) => pilha.push(s.para));
    }
    return true;
  }

  // O nó onde todos os ramos se juntam (desenhado uma vez só, embaixo deles).
  function pontoDeEncontro(saidas, bloqueio, parada) {
    if (saidas.length < 2) return null;
    return (
      alcance(saidas[0].para, bloqueio, parada).find((candidato) =>
        saidas.every((s) => todoCaminhoPassaPor(s.para, candidato, bloqueio, parada)),
      ) ?? null
    );
  }

  // O ramo acaba logo (num fim ou numa volta), sem abrir outra pergunta?
  function terminaLogo(inicio, bloqueio, parada) {
    const vistos = new Set();
    let atual = inicio;
    while (atual !== undefined) {
      if (vistos.has(atual) || bloqueio.has(atual) || parada.has(atual)) return true;
      if (desenhados.has(atual) && !ehFim(atual)) return true;
      vistos.add(atual);
      const saidas = saidasDe(atual);
      if (!saidas.length) return true;
      if (saidas.length > 1 || saidas[0].rotulo) return false;
      atual = saidas[0].para;
    }
    return true;
  }

  // No ramo que continua, qual nó desce pelo meio? Se o ramo começa com UMA caixa
  // de ação que leva direto a uma pergunta ("Siga para a próxima pergunta." →
  // pergunta 2, no "Estou em FOMO?" do M2), a caixa fica na coluna do ramo e a
  // pergunta desce pelo meio. Senão, o próprio primeiro nó desce pelo meio.
  function seguinteNoEixo(id, bloqueio) {
    const no = porId.get(id);
    const saidas = saidasDe(id);
    if (no.tipo === 'pergunta' || saidas.length !== 1 || saidas[0].rotulo) return id;
    const depois = porId.get(saidas[0].para);
    if (depois.tipo !== 'pergunta' || bloqueio.has(depois.id) || desenhados.has(depois.id)) return id;
    return depois.id;
  }

  // Ramos lado a lado. Devolve a grade e o nó que continua embaixo dela (ou null).
  function desenharRamos(saidas, caminho, parada) {
    const bloqueio = new Set(caminho);
    let continua = pontoDeEncontro(saidas, bloqueio, parada);
    let ordem = saidas;

    // Espinha: se só um ramo continua e os outros acabam logo ("Não compro"),
    // os que acabam ficam à esquerda e o caminho principal desce pelo meio.
    if (!continua && saidas.length > 1) {
      const longos = saidas.filter((s) => !terminaLogo(s.para, bloqueio, parada));
      if (longos.length === 1) {
        continua = seguinteNoEixo(longos[0].para, bloqueio);
        ordem = [...saidas.filter((s) => s !== longos[0]), longos[0]];
      }
    }

    const paradaDosRamos = new Set(parada);
    if (continua) paradaDosRamos.add(continua);

    const grade = criarElemento('div', {
      class: 'omh-fluxo-ramos',
      style: '--omh-fluxo-colunas:' + ordem.length,
    });
    ordem.forEach((s) => {
      const tom = corDoRamo(s, porId);
      const ramo = criarElemento('div', { class: 'omh-fluxo-ramo omh-fluxo-ramo--' + tom }, [linha()]);
      if (s.rotulo) ramo.append(rotuloDaSeta(s.rotulo, tom));
      // O ramo que vai direto ao nó de baixo mostra só o rótulo.
      if (s.para !== continua) {
        ramo.append(seta({ tracejada: s.tracejada }), desenharCadeia(s.para, caminho, paradaDosRamos, false));
      } else if (!s.rotulo) {
        // Sem rótulo e sem caixa: só a linha. No celular esse ramo some.
        ramo.classList.add('omh-fluxo-ramo--vazio');
      }
      grade.append(ramo);
    });
    return { grade, continua };
  }

  // Uma coluna: nó → seta → nó… até um fim, uma volta ou um nó de `parada`.
  function desenharCadeia(id, caminhoAcima, parada, eixo) {
    const cadeia = criarElemento('div', { class: 'omh-fluxo-cadeia' });
    let caminho = caminhoAcima;
    let atual = id;

    while (atual !== undefined) {
      const no = porId.get(atual);
      // Volta para cima (laço) ou nó que continua e já foi desenhado noutro ramo.
      if (caminho.includes(atual) || (desenhados.has(atual) && !ehFim(atual))) {
        cadeia.append(referencia(no));
        break;
      }
      if (!ehFim(atual)) desenhados.add(atual);
      caminho = [...caminho, atual];
      cadeia.append(caixa(no, { eixo, inicio: ehPartida(atual), fim: ehFim(atual) }));

      const saidas = saidasDe(atual);
      if (!saidas.length) break;

      // Seta simples, sem rótulo: segue na mesma coluna.
      if (saidas.length === 1 && !saidas[0].rotulo) {
        const proximo = saidas[0].para;
        if (parada.has(proximo)) break;
        cadeia.append(seta({ tracejada: saidas[0].tracejada }));
        atual = proximo;
        continue;
      }

      // Bifurcação: ramos lado a lado e, se houver, o nó comum embaixo.
      const { grade, continua } = desenharRamos(saidas, caminho, parada);
      cadeia.append(grade);
      if (!continua || parada.has(continua)) break;
      cadeia.append(seta({ juncao: true }));
      atual = continua;
    }
    return cadeia;
  }

  // Mais de um nó de partida (as carteiras A e B do wash trading, M6), como no
  // desenho: os nós lado a lado no topo, numa grade "1fr auto 1fr" (a coluna
  // "auto" é a ligação entre eles); embaixo, o colchete que junta os dois e a
  // seta para o nó onde se encontram, que segue pelo meio. No celular fica igual
  // (o CSS não empilha esta grade).
  function desenharVariasPartidas() {
    const encontro = pontoDeEncontro(raizes.map((no) => ({ para: no.id })), new Set(), new Set());
    const parada = new Set(encontro ? [encontro] : []);
    const itens = [];
    const molde = [];
    raizes.forEach((no, i) => {
      itens.push(criarElemento('div', { class: 'omh-fluxo-partida' }, [desenharCadeia(no.id, [], parada, false)]));
      molde.push('1fr');
      const proxima = raizes[i + 1];
      const lig =
        proxima &&
        ligacoes.find((l) => (l.de === no.id && l.para === proxima.id) || (l.de === proxima.id && l.para === no.id));
      if (lig) {
        itens.push(ligacaoEntreRaizes(lig, corDoRamo(lig, porId)));
        molde.push('auto');
      }
    });
    const topo = criarElemento('div', { class: 'omh-fluxo-partidas', style: '--omh-fluxo-molde:' + molde.join(' ') }, itens);
    const cadeia = criarElemento('div', { class: 'omh-fluxo-cadeia omh-fluxo-cadeia--partidas' }, [topo]);
    if (encontro) {
      const resto = desenharCadeia(encontro, raizes.map((no) => no.id), new Set(), true);
      cadeia.append(colchete(), seta(), ...Array.from(resto.childNodes));
    }
    return cadeia;
  }

  if (raizes.length > 1) return desenharVariasPartidas();
  return desenharCadeia(raiz.id, [], new Set(), true);
}

// Abertura de um ramo na alternativa em texto. Rótulo que é condição vira "Se …:"
// ("Sim" → "Se sim:", "Não, pool funda" → "Se não, pool funda:", "Reprovou" →
// "Se reprovou:"); rótulo que só nomeia o caminho fica como está ("Caminho A ·
// corretora:").
function aberturaDoRamo(rotulo) {
  const limpo = String(rotulo).trim();
  const ehCondicao = /^(sim|não)(?![a-zà-ÿ])/i.test(limpo) || !/\s/.test(limpo);
  return ehCondicao ? 'Se ' + comMinuscula(limpo) + ': ' : comMaiuscula(limpo) + ': ';
}

// Alternativa em texto, gerada dos dados, na ordem em que se lê o desenho (o
// formato do handoff, "00 Componentes › Fluxograma"):
// "Você percebeu a drenagem. A frase-semente vazou? Se sim: crie carteira nova…;
// depois, mova o que sobrou…. Se não: revogue as aprovações. Em qualquer caso:
// registre as evidências e reporte."
function descreverFluxograma(nos, todasAsSetas) {
  const setas = todasAsSetas.filter((s) => !s.ligacao);
  const porId = new Map(nos.map((no) => [no.id, no]));
  const saidasDe = (id) => setas.filter((s) => s.de === id && s.para !== id);
  const entradas = (id) => setas.filter((s) => s.para === id && s.de !== id).length;
  const ehFim = (id) => saidasDe(id).length === 0;
  const partidas = nos.filter((no) => entradas(no.id) === 0);
  if (!partidas.length) partidas.push(nos[0]);

  const falados = new Set(); // nós cujo texto já entrou na descrição
  const fila = []; // nós cujas saídas ainda faltam descrever
  const juncoes = []; // { id, pergunta }: nó onde caminhos se juntam e a pergunta de onde os ramos saíram
  const perguntaDoRamo = new Map(); // nó → a pergunta (bifurcação) de onde saiu o ramo dele
  const frases = [];

  const voltaA = (id) => 'volta a "' + porId.get(id).texto + '"';

  // Um trecho: o nó e os seguintes, enquanto a seta for simples (sem rótulo) e o
  // próximo nó não juntar caminhos. A volta para um nó já dito (laço) entra no
  // próprio trecho, na ordem do desenho: "…; depois, volta a "…"".
  function trecho(id, pergunta) {
    const textos = [];
    let atual = id;
    for (;;) {
      falados.add(atual);
      if (pergunta !== undefined) perguntaDoRamo.set(atual, pergunta);
      textos.push(porId.get(atual).texto);
      const saidas = saidasDe(atual);
      const proximo = saidas.length === 1 && !saidas[0].rotulo ? saidas[0].para : null;
      if (proximo !== null && falados.has(proximo)) {
        textos.push(ehFim(proximo) ? porId.get(proximo).texto : voltaA(proximo));
        return textos;
      }
      if (proximo === null || entradas(proximo) > 1) {
        if (saidas.length) fila.push(atual);
        return textos;
      }
      atual = proximo;
    }
  }

  // Todo caminho que sai de `inicio` chega a `alvo` antes de acabar ou de voltar
  // à `pergunta`? (É o que permite dizer "Em qualquer caso".)
  function chegaSempre(inicio, alvo, pergunta) {
    const vistos = new Set();
    const pilha = [inicio];
    while (pilha.length) {
      const id = pilha.pop();
      if (id === alvo || vistos.has(id)) continue;
      if (id === pergunta || ehFim(id)) return false;
      vistos.add(id);
      saidasDe(id).forEach((s) => pilha.push(s.para));
    }
    return true;
  }
  const juntaTodosOsRamos = (pergunta, alvo) =>
    pergunta !== undefined && saidasDe(pergunta).every((s) => chegaSempre(s.para, alvo, pergunta));

  // Frase solta: cada texto com ponto e começando com maiúscula.
  const frasesSoltas = (textos) => textos.map((t) => comPonto(comMaiuscula(t))).join(' ');
  // Frase de ramo: "texto1; depois, texto2." (tudo em minúscula depois do rótulo).
  const fraseDeRamo = (textos) => comPonto(textos.map(semPontoFinal).map(comMinuscula).join('; depois, '));

  partidas.forEach((no) => frases.push(frasesSoltas(trecho(no.id))));
  // Ligação entre dois nós (traço sem ponta): 'Mesma pessoa: "A" e "B".'
  todasAsSetas
    .filter((s) => s.ligacao)
    .forEach((s) => {
      const par = '"' + porId.get(s.de).texto + '" e "' + porId.get(s.para).texto + '".';
      frases.push(s.rotulo ? comMaiuscula(s.rotulo) + ': ' + par : 'Ligados: ' + par);
    });
  for (;;) {
    while (fila.length) {
      const origem = fila.shift();
      const saidas = saidasDe(origem);
      let semRotulo = 0; // ramos sem rótulo: o primeiro abre com "Depois,", os outros com "Ou,"
      saidas.forEach((s) => {
        const jaDito = falados.has(s.para) && !ehFim(s.para);
        if (!s.rotulo && saidas.length === 1) {
          // Seta simples para um nó que junta caminhos: vira frase própria, no fim.
          if (jaDito) frases.push('Depois, ' + comPonto(voltaA(s.para)));
          else juncoes.push({ id: s.para, pergunta: perguntaDoRamo.get(origem) });
          return;
        }
        const inicio = s.rotulo ? aberturaDoRamo(s.rotulo) : semRotulo++ ? 'Ou, ' : 'Depois, ';
        frases.push(inicio + (jaDito ? comPonto(voltaA(s.para)) : fraseDeRamo(trecho(s.para, origem))));
      });
    }
    const juncao = juncoes.find((j) => !falados.has(j.id));
    if (juncao === undefined) break;
    const textos = trecho(juncao.id, perguntaDoRamo.get(juncao.pergunta));
    // O nó onde TODOS os ramos da pergunta se juntam abre com "Em qualquer caso:".
    // Uma caixa de observação (`nota`) não é consequência dos ramos: frase solta.
    const emQualquerCaso = !porId.get(juncao.id).nota && juntaTodosOsRamos(juncao.pergunta, juncao.id);
    frases.push(emQualquerCaso ? 'Em qualquer caso: ' + fraseDeRamo(textos) : frasesSoltas(textos));
  }
  return frases.join(' ');
}

// Diagrama largo rola dentro da caixa. Só quando rola ele entra no Tab
// (tabindex="0"), para quem usa teclado conseguir rolar com ← →. Mede o próprio
// elemento (não a janela), então acompanha qualquer mudança de largura.
function vigiarRolagem(rolagem, nome) {
  if (typeof ResizeObserver !== 'function') return;
  const atualizar = () => {
    const largo = rolagem.scrollWidth > rolagem.clientWidth + 1;
    if (largo && !rolagem.hasAttribute('tabindex')) {
      rolagem.setAttribute('tabindex', '0');
      rolagem.setAttribute('role', 'group');
      rolagem.setAttribute('aria-label', nome + ' (role na horizontal para ver tudo)');
    } else if (!largo && rolagem.hasAttribute('tabindex')) {
      rolagem.removeAttribute('tabindex');
      rolagem.removeAttribute('role');
      rolagem.removeAttribute('aria-label');
    }
  };
  const observador = new ResizeObserver(atualizar);
  observador.observe(rolagem);
  if (rolagem.firstElementChild) observador.observe(rolagem.firstElementChild);
}

/**
 * Desenha o fluxograma em árvore.
 *
 * Aceita:
 *   criarFluxograma({ nos, setas, legenda?, titulo?, rotuloAcessivel? })
 *   criarFluxograma({ diagrama: { nos, setas }, legenda?, titulo?, rotuloAcessivel? })
 *   criarFluxograma({ diagrama: 'flowchart TD …', legenda?, titulo?, rotuloAcessivel? })
 *
 *   legenda         — frase embaixo do desenho, dentro da caixa (13px, centralizada)
 *   titulo          — frase em negrito no topo da caixa (desenho do slippage, M5)
 *   rotuloAcessivel — substitui a alternativa em texto gerada dos dados. Evite: a
 *                     gerada segue a ordem do desenho e diz só o que está nele
 *                     ("… Se sim: … Se não: … Em qualquer caso: …").
 *
 * Devolve a <figure> pronta (caixa #0B0F17 com a legenda dentro), ou null quando
 * não consegue ler o texto do diagrama — quem chama mostra a reserva no lugar.
 */
export function criarFluxograma(opcoes = {}) {
  const dados = lerDados(opcoes);
  if (!dados) return null;
  const { nos, setas } = dados;
  const legenda = opcoes.legenda ?? '';

  const descricao = opcoes.rotuloAcessivel || descreverFluxograma(nos, setas);
  const imagem = criarElemento('div', { class: 'omh-fluxo-arvore', role: 'img', 'aria-label': descricao }, [
    desenharArvore(nos, setas),
  ]);
  const rolagem = criarElemento('div', { class: 'omh-fluxo-rolagem' }, [imagem]);
  vigiarRolagem(rolagem, opcoes.titulo || legenda || 'Fluxograma');

  return criarElemento('figure', { class: 'omh-fluxo omh-fluxo--arvore' }, [
    opcoes.titulo ? criarElemento('p', { class: 'omh-fluxo-titulo' }, [opcoes.titulo]) : null,
    rolagem,
    legenda ? criarElemento('figcaption', { class: 'omh-fluxo-legenda' }, [legenda]) : null,
  ]);
}

// ===========================================================================
// 4. O fluxo linear (Checklist e checagem do contrato)
// ===========================================================================

// Cor da etiqueta de evidência embaixo da pergunta. Aceita as chaves de EVIDENCIAS
// (src/data/checklist.js: fato, medido, fraco, rotina) e também o `tom` que está
// lá dentro (acento, baixo, medio, primaria).
const TOM_DA_EVIDENCIA = {
  fato: 'fato',
  acento: 'fato',
  medido: 'medido',
  baixo: 'medido',
  fraco: 'fraco',
  medio: 'fraco',
  rotina: 'rotina',
  primaria: 'rotina',
};

// Cor da saída de desvio: 'nao' = vermelho ("Não compro"), 'ajusta' e 'alerta' =
// âmbar, 'neutro' = caixa comum (um desvio que não encerra nada).
const TONS_DO_DESVIO = new Set(['nao', 'ajusta', 'alerta', 'neutro']);

// Fecha a frase com ponto, se ela ainda não termina em pontuação.
function comPonto(texto) {
  const limpo = String(texto ?? '').trim();
  return /[.?!:…]$/.test(limpo) ? limpo : limpo + '.';
}

// Primeira letra minúscula ("Registro no diário" → "registro no diário"; "A tese
// está clara?" → "a tese está clara?"). Sigla e nome próprio ficam como estão
// ("CEX…", "Owner Program…"): só troca quando a palavra é uma letra só ("A", "O",
// "É") ou quando a segunda letra já é minúscula e não há maiúscula no meio.
function comMinuscula(texto) {
  const primeira = String(texto).split(' ')[0];
  if (!/^[A-ZÀ-Ý]([a-zà-ÿ]|$)/.test(primeira) || /[A-ZÀ-Ý]/.test(primeira.slice(1))) return texto;
  return texto.charAt(0).toLowerCase() + texto.slice(1);
}

// Tira o ponto final (para juntar frases com "; depois, "). "?" e "…" ficam.
function semPontoFinal(texto) {
  return String(texto).trim().replace(/\.$/, '');
}

// Primeira letra maiúscula ("mudança só aqui" → "Mudança só aqui").
function comMaiuscula(texto) {
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

// Etiqueta de evidência: aceita { rotulo, tom } ou só o texto. Sem tom, a cor sai
// do começo do texto, como no desenho ("Fato…" ciano, "Sinal medido…" verde).
function etiquetaDeEvidencia(evidencia) {
  if (!evidencia) return null;
  const rotulo = typeof evidencia === 'string' ? evidencia : evidencia.rotulo;
  if (!rotulo) return null;
  let tom = TOM_DA_EVIDENCIA[evidencia.tom];
  if (!tom) {
    if (/^fato/i.test(rotulo)) tom = 'fato';
    else if (/^sinal medido/i.test(rotulo)) tom = 'medido';
    else if (/^sinal fraco/i.test(rotulo)) tom = 'fraco';
    else tom = 'rotina';
  }
  return criarElemento('span', { class: 'omh-fluxo-evidencia omh-fluxo-evidencia--' + tom }, [rotulo]);
}

// Marcador numerado: círculo ciano de 24px.
function marcador(numero) {
  return criarElemento('span', { class: 'omh-fluxo-marcador', 'aria-hidden': 'true' }, [String(numero)]);
}

// A caixa ciano da pergunta, com número, etiqueta e (no trilho) o porquê e o onde.
function caixaDaPergunta(passo, numero, variante) {
  const texto = criarElemento('span', { class: 'omh-fluxo-passo-texto' }, [
    variante === 'trilho' ? criarElemento('span', { class: 'omh-fluxo-passo-pergunta' }, [passo.pergunta]) : passo.pergunta,
    passo.porque && criarElemento('span', { class: 'omh-fluxo-passo-porque' }, [passo.porque]),
    passo.onde && criarElemento('span', { class: 'omh-fluxo-passo-onde' }, [passo.onde]),
    etiquetaDeEvidencia(passo.evidencia),
  ]);
  return criarElemento('div', { class: 'omh-fluxo-passo omh-fluxo-passo--' + variante }, [
    numero && marcador(numero),
    texto,
  ]);
}

// Espinha (desenho 31 Checklist): pergunta → "desvio | segue" embaixo → próxima.
function desenharEspinha({ inicio, passos, fim, numerar }) {
  const partes = [];
  if (inicio) {
    partes.push(criarElemento('div', { class: 'omh-fluxo-no omh-fluxo-no--acao omh-fluxo-no--inicio omh-fluxo-no--eixo' }, [inicio]));
  }

  passos.forEach((passo, i) => {
    if (partes.length) partes.push(seta());
    partes.push(caixaDaPergunta(passo, numerar ? i + 1 : null, 'espinha'));

    const tomDesvio = TONS_DO_DESVIO.has(passo.desvio?.tom) ? passo.desvio.tom : 'nao';
    const tomSegue = passo.segue?.tom === 'neutro' ? 'neutro' : 'bom';
    const desvio = criarElemento('div', { class: 'omh-fluxo-saida' }, [
      linha(),
      rotuloDaSeta(passo.desvio?.rotulo ?? '', tomDesvio === 'nao' ? 'ruim' : tomDesvio === 'neutro' ? 'neutro' : 'alerta'),
      linha(),
      criarElemento('div', { class: 'omh-fluxo-desvio omh-fluxo-desvio--' + tomDesvio }, [passo.desvio?.texto ?? '']),
    ]);
    const segue = criarElemento('div', { class: 'omh-fluxo-saida' }, [
      linha(),
      rotuloDaSeta(passo.segue?.rotulo ?? '', tomSegue),
      passo.segue?.texto ? linha() : null,
      passo.segue?.texto ? criarElemento('div', { class: 'omh-fluxo-segue' }, [passo.segue.texto]) : null,
    ]);
    partes.push(criarElemento('div', { class: 'omh-fluxo-saidas' }, [desvio, segue]));
  });

  if (fim) {
    partes.push(
      criarElemento('div', { class: 'omh-fluxo-seta omh-fluxo-seta--juncao omh-fluxo-seta--verde', 'aria-hidden': 'true' }),
      criarElemento('div', { class: 'omh-fluxo-fim' }, [fim]),
    );
  }
  return criarElemento('div', { class: 'omh-fluxo-espinha' }, partes);
}

// Trilho (desenhos M6 e M4): pergunta à esquerda com o "segue" embaixo, e o
// desvio à direita depois de uma seta →. No celular, uma coluna só.
function desenharTrilho({ passos, fim, numerar }) {
  const linhas = passos.map((passo, i) => {
    const tomDesvio = TONS_DO_DESVIO.has(passo.desvio?.tom) ? passo.desvio.tom : 'nao';
    const tomSegue = passo.segue?.tom === 'neutro' ? 'neutro' : 'bom';
    const esquerda = criarElemento('div', { class: 'omh-fluxo-trilho-esquerda' }, [
      caixaDaPergunta(passo, numerar ? i + 1 : null, 'trilho'),
      criarElemento('div', { class: 'omh-fluxo-trilho-segue' }, [
        criarElemento('span', { class: 'omh-fluxo-trilho-fio', 'aria-hidden': 'true' }),
        rotuloDaSeta(passo.segue?.rotulo ?? '', tomSegue),
        passo.segue?.texto ? criarElemento('span', { class: 'omh-fluxo-trilho-segue-texto' }, [passo.segue.texto]) : null,
      ]),
    ]);
    const direita = criarElemento('div', { class: 'omh-fluxo-trilho-direita' }, [
      criarElemento('span', { class: 'omh-fluxo-trilho-seta', 'aria-hidden': 'true' }, ['→']),
      criarElemento('div', { class: 'omh-fluxo-desvio omh-fluxo-desvio--trilho omh-fluxo-desvio--' + tomDesvio }, [
        criarElemento('span', { class: 'omh-fluxo-desvio-rotulo' }, [passo.desvio?.rotulo ?? '']),
        passo.desvio?.texto ?? '',
      ]),
    ]);
    return criarElemento('div', { class: 'omh-fluxo-trilho-linha' }, [esquerda, direita]);
  });
  if (fim) linhas.push(criarElemento('div', { class: 'omh-fluxo-fim omh-fluxo-fim--trilho' }, [fim]));
  return criarElemento('div', { class: 'omh-fluxo-trilho' }, linhas);
}

// Alternativa em texto do fluxo linear, na ordem do desenho.
function descreverFluxoLinear({ inicio, passos, fim, fechamento, numerar, variante }) {
  const partes = [];
  if (inicio) partes.push(comPonto(inicio));
  passos.forEach((passo, i) => {
    partes.push(
      (numerar ? i + 1 + '. ' : '') +
        comPonto(passo.pergunta) +
        ' ' + (passo.desvio?.rotulo ?? '') + ': ' + comPonto(passo.desvio?.texto ?? '') +
        ' ' + (passo.segue?.rotulo ?? '') + ': ' + comPonto(passo.segue?.texto || 'siga'),
    );
  });
  // Na espinha o fim é um passo ("Registro no diário…"); no trilho, uma conclusão.
  if (fim) partes.push(variante === 'trilho' ? comPonto(fim) : 'No fim: ' + comMinuscula(comPonto(fim)));
  if (fechamento) partes.push(comPonto(fechamento));
  return partes.join(' ');
}

/**
 * Desenha o fluxo linear de checagem.
 *
 * criarFluxoLinear({
 *   inicio?,          // 'Vi um token' — caixa de partida (só na espinha)
 *   passos: [{
 *     pergunta,       // 'O endereço veio da fonte oficial e bate com o X oficial?'
 *     evidencia?,     // { rotulo: 'Fato do protocolo', tom: 'fato'|'medido'|'fraco'|'rotina' }
 *     porque?, onde?, // textos extras dentro da pergunta (trilho do M4)
 *     desvio: { rotulo, texto, tom: 'nao'|'ajusta'|'alerta'|'neutro' },
 *     segue:  { rotulo, texto?, tom?: 'bom'|'neutro' },
 *   }],
 *   fim?,             // caixa verde do fim ('Registro no diário e só então entro')
 *   legenda?,         // figcaption dentro da caixa
 *   fechamento?,      // caixa ciano depois da figura ('Passar por tudo não aprova…')
 *   titulo?,          // frase em negrito no topo da caixa (checagem do contrato, M6)
 *   variante?,        // 'espinha' (padrão, desenho 31) | 'trilho' (desenhos M6 e M4)
 *   numerar?,         // true (padrão): marcador ciano 1, 2, 3…
 *   rotuloAcessivel?, // substitui a alternativa em texto gerada dos dados
 * })
 *
 * Devolve um <div> com a <figure> e, se houver, a caixa de fechamento.
 */
export function criarFluxoLinear(dados = {}) {
  const passos = Array.isArray(dados.passos) ? dados.passos.filter((p) => p && p.pergunta) : [];
  const variante = dados.variante === 'trilho' ? 'trilho' : 'espinha';
  const numerar = dados.numerar !== false;
  const opcoes = { ...dados, passos, numerar, variante };

  const descricao = dados.rotuloAcessivel || descreverFluxoLinear(opcoes);
  const desenho = variante === 'trilho' ? desenharTrilho(opcoes) : desenharEspinha(opcoes);
  desenho.setAttribute('role', 'img');
  desenho.setAttribute('aria-label', descricao);

  const figura = criarElemento('figure', { class: 'omh-fluxo omh-fluxo--linear omh-fluxo--' + variante }, [
    dados.titulo ? criarElemento('p', { class: 'omh-fluxo-titulo' }, [dados.titulo]) : null,
    desenho,
    dados.legenda ? criarElemento('figcaption', { class: 'omh-fluxo-legenda omh-fluxo-legenda--linear' }, [dados.legenda]) : null,
  ]);

  return criarElemento('div', { class: 'omh-fluxo-linear' }, [
    figura,
    dados.fechamento
      ? criarElemento('div', { class: 'omh-fluxo-fechamento' }, [criarElemento('p', {}, [dados.fechamento])])
      : null,
  ]);
}
