// gerar-prompts-de-video.mjs — gera um prompt por vídeo a partir dos dados do hub.
//
// Uso (na raiz do projeto):   node scripts/gerar-prompts-de-video.mjs
// Saída:                       pesquisa/videos/VIDEO-NN-<slug>.md  (+ README.md)
//
// Por que um gerador e não 33 arquivos escritos à mão: o material-fonte de cada
// vídeo é o texto que JÁ está em src/data/. Copiar 34 mil palavras na mão erra;
// e quando o texto do módulo mudar (um número corrigido, um "não verificado"
// resolvido), basta rodar de novo e os 33 prompts acompanham. O vídeo tem que
// seguir o texto, nunca o contrário.
//
// Este script é ferramenta de desenvolvimento: não faz parte do app, não entra no
// service worker, não precisa de npm. Só Node (24+, que importa ES module direto).

import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SAIDA = path.join(RAIZ, 'pesquisa', 'videos');

const { modulo1 } = await import('../src/data/modulo1.js');
const { modulo2 } = await import('../src/data/modulo2.js');
const { modulo3 } = await import('../src/data/modulo3.js');
const { modulo4 } = await import('../src/data/modulo4.js');
const { modulo5 } = await import('../src/data/modulo5.js');
const { cenarios, OPCOES, FAIXAS_DE_DISCIPLINA } = await import('../src/data/cenarios.js');

const MODULOS = { 1: modulo1, 2: modulo2, 3: modulo3, 4: modulo4, 5: modulo5 };
const TITULO_DO_MODULO = {
  1: 'Fundamentos & Segurança',
  2: 'Psicologia das memecoins',
  3: 'Os dois pilares (social × técnico)',
  4: 'Gestão & decisão',
  5: 'A mecânica da execução',
};

// ---------------------------------------------------------------------------
// Serializadores: transformam cada formato de src/data/ em markdown legível.
// Tudo que vira texto aqui é cópia literal do app — nada é resumido.
// ---------------------------------------------------------------------------

const h = (nivel, texto) => '#'.repeat(nivel) + ' ' + texto + '\n\n';
const p = (texto) => (texto ? texto + '\n\n' : '');
const li = (itens, ordenada = false) =>
  (itens ?? []).map((t, i) => (ordenada ? i + 1 + '. ' : '- ') + t).join('\n') + '\n\n';

function secao(s) {
  let out = h(3, s.titulo);
  out += (s.paragrafos ?? []).map(p).join('');
  for (const sub of s.subListas ?? []) {
    out += h(4, sub.titulo) + li(sub.passos, true);
  }
  if (s.lista?.length) out += li(s.lista, Boolean(s.ordenada));
  out += (s.paragrafosFinais ?? []).map(p).join('');
  return out;
}

function secoesPorId(mod, ids) {
  return ids
    .map((id) => mod.secoes.find((s) => s.id === id))
    .filter(Boolean)
    .map(secao)
    .join('');
}

function destaques(lista) {
  if (!lista?.length) return '';
  let out = h(2, 'Ganchos — os números para abrir o vídeo');
  out += p(
    'São os três números do app para esta parte. Abra o vídeo com o mais surpreendente ' +
      'deles. Use SOMENTE estes números como gancho — não invente outros.',
  );
  for (const d of lista) {
    out += `- **${d.valor}** — ${d.rotulo}. ${d.nota ?? ''}\n`;
  }
  return out + '\n';
}

// Tabela comparativa (tabelaCarteiras, tabelaCamadas, tabelaTaxas, matrizDeCusto).
function tabela(t, titulo) {
  if (!t?.linhas?.length) return '';
  let out = h(3, titulo);
  if (t.cotacaoAssumida) out += p('**Cotação assumida:** ' + t.cotacaoAssumida);
  const cab = ['', ...t.colunas.map((c) => c.rotulo)];
  out += '| ' + cab.join(' | ') + ' |\n';
  out += '|' + cab.map(() => '---').join('|') + '|\n';
  for (const l of t.linhas) {
    const nome = l.subtitulo ? `**${l.titulo}** (${l.subtitulo})` : `**${l.titulo}**`;
    out += '| ' + [nome, ...t.colunas.map((c) => l.valores?.[c.chave] ?? '')].join(' | ') + ' |\n';
  }
  out += '\n';
  for (const l of t.linhas) {
    if (l.detalheExtra) out += `- *${l.titulo}* — ${l.detalheExtra}\n`;
  }
  return out + '\n';
}

function checklist(itens, titulo) {
  if (!itens?.length) return '';
  return h(3, titulo) + itens.map((i, n) => `${n + 1}. **${i.texto}** — ${i.porque}`).join('\n') + '\n\n';
}

function roteiroDrainer(passos) {
  if (!passos?.length) return '';
  let out = h(3, 'O roteiro do golpe, passo a passo (o que a vítima vê × o que acontece)');
  for (const s of passos) {
    out += `${s.numero}. **${s.titulo}**\n   - O que a vítima vê: ${s.oQueVeem}\n   - O que está acontecendo: ${s.oQueAcontece}\n`;
  }
  return out + '\n';
}

function linhaDoTempo(lt) {
  if (!lt?.marcos?.length) return '';
  let out = h(3, lt.titulo) + p(lt.descricao);
  out += lt.marcos.map((m) => `- **${m.data}** — ${m.titulo}: ${m.texto}`).join('\n') + '\n\n';
  return out + p(lt.nota ? '*Nota:* ' + lt.nota : '');
}

function diagramas(mod, ids) {
  const lista = ids.map((id) => mod.diagramas?.find((d) => d.id === id)).filter(Boolean);
  if (!lista.length) return '';
  let out = h(2, 'Roteiro visual sugerido (diagramas do app, em texto)');
  out += p(
    'Cada bloco abaixo é um diagrama que já existe no app, descrito passo a passo. Use como ' +
      'storyboard: uma tela por passo, ilustração esquemática, sem captura de tela de plataforma real.',
  );
  for (const d of lista) {
    out += h(3, d.titulo) + p('*' + d.legenda + '*') + li(d.versaoEmTexto, true);
  }
  return out;
}

function anatomias(mod, chaves) {
  const lista = chaves.map((k) => mod.anatomias?.[k]).filter(Boolean);
  if (!lista.length) return '';
  let out = h(2, 'Anatomia de tela (o que mostrar e apontar)');
  for (const a of lista) {
    out += h(3, a.titulo) + p(a.descricao);
    out += (a.itens ?? []).map((it, i) => `${i + 1}. **${it.titulo}** — ${it.texto}`).join('\n') + '\n\n';
  }
  return out;
}

function naoVerificado(mod) {
  if (!mod.naoVerificado?.length) return '';
  let out = h(2, 'Itens NÃO VERIFICADOS — o vídeo precisa tratá-los como tal');
  out += p(
    'Se o vídeo tocar em algum destes pontos, ele deve dizer explicitamente que não está ' +
      'confirmado em fonte oficial. Não "resolva" a dúvida por conta própria.',
  );
  for (const n of mod.naoVerificado) out += `- **${n.titulo}** — ${n.texto}\n`;
  return out + '\n';
}

function calculadora(c) {
  if (!c) return '';
  let out = h(3, 'Ferramenta interativa do app: ' + c.titulo) + p(c.descricao);
  out += p(
    'No vídeo, mostre a ideia da ferramenta com um ou dois exemplos numéricos — e diga que no ' +
      'app a pessoa pode mexer nos controles e ver o resultado mudar na hora.',
  );
  return out + p(c.nota ? '*Premissa que a ferramenta assume:* ' + c.nota : '');
}

// Qualquer objeto simples vira "rótulo: valor" — usado para formatos pequenos.
function generico(obj, titulo) {
  if (!obj) return '';
  let out = titulo ? h(3, titulo) : '';
  if (typeof obj === 'string') return out + p(obj);
  for (const [k, v] of Object.entries(obj)) {
    if (typeof v === 'string') out += `- **${k}:** ${v}\n`;
    else if (Array.isArray(v) && typeof v[0] === 'string') out += `- **${k}:**\n` + v.map((x) => '  - ' + x).join('\n') + '\n';
  }
  return out + '\n';
}

// ----- Módulo 2 -----
function vieses(lista) {
  let out = h(3, 'Os cinco vieses');
  for (const v of lista) {
    out += h(4, `${v.nome} — ${v.subtitulo}`);
    out += `- **Gatilho:** ${v.gatilho}\n- **Quando aparece:** ${v.quandoAparece}\n- **Antídoto:** ${v.antidoto}\n- **Custo de ignorar:** ${v.custo}\n\n`;
  }
  return out;
}

function tiposDeToken(mod) {
  const nomeCat = Object.fromEntries((mod.categoriasDeToken ?? []).map((c) => [c.id, c.nome]));
  let out = h(3, 'Os tipos de token');
  for (const t of mod.tiposDeToken ?? []) {
    out += h(4, `${t.nome} (categoria: ${nomeCat[t.categoria] ?? t.categoria}; risco ${t.risco})`);
    out += p(t.descricao) + `- **Como reconhecer:** ${t.comoReconhecer}\n`;
    if (t.exemplos?.length) out += `- **Exemplos (de categoria, não indicação):** ${t.exemplos.join('; ')}\n`;
    out += `- **Alerta:** ${t.alerta}\n\n`;
  }
  return out;
}

function casos(mod) {
  let out = h(3, 'Casos reais');
  for (const c of mod.casos ?? []) {
    out += h(4, `${c.nome} (${c.ticker}, ${c.chain}, ${c.data})`) + p(c.resumo);
    out += (c.numeros ?? []).map((n) => `- ${n.rotulo}: **${n.valor}**`).join('\n') + '\n';
    out += `- **Lição:** ${c.licao}\n- **Fontes:** ${(c.fontes ?? []).join('; ')}\n\n`;
  }
  out += p(mod.licaoDosCasos ? '**Lição comum aos casos:** ' + mod.licaoDosCasos : '');
  out += p(mod.notaDosCasos ? '*Nota:* ' + mod.notaDosCasos : '');
  return out;
}

function fases(mod) {
  let out = h(3, 'As quatro fases');
  for (const f of mod.fases ?? []) {
    out += h(4, `Fase ${f.numero} — ${f.nome} (risco ${f.risco})`) + p(f.resumo);
    out += '**O que você vê:**\n' + li(f.oQueVoceVe) + '**O que checar:**\n' + li(f.oQueChecar);
    out += p('**Armadilha:** ' + f.armadilha);
  }
  out += p(mod.diagramaFases ? '**Como o app descreve o fluxo:** ' + mod.diagramaFases : '');
  out += p(mod.desfechoFases ? '**Desfecho mais comum:** ' + mod.desfechoFases : '');
  out += p(mod.observacaoFases ? '*Observação:* ' + mod.observacaoFases : '');
  return out;
}

// ----- Módulo 3 -----
function ferramentas(mod) {
  const nomeChain = Object.fromEntries((mod.chains ?? []).map((c) => [c.id, c.nome]));
  const nomePapel = Object.fromEntries((mod.papeis ?? []).map((c) => [c.id, c.nome]));
  let out = h(3, 'A matriz de ferramentas (exemplos de categoria, sem ranking)');
  for (const f of mod.ferramentas ?? []) {
    out += h(4, `${f.nome} — pilar ${f.pilar}, risco ${f.risco}`);
    out += `- **Redes:** ${(f.chains ?? []).map((c) => nomeChain[c] ?? c).join(', ')}\n`;
    out += `- **Papéis:** ${(f.papeis ?? []).map((c) => nomePapel[c] ?? c).join(', ')}\n`;
    out += `- **O que faz:** ${f.oQueFaz}\n- **Quando usar:** ${f.quandoUsar}\n`;
    if (f.observacoes) out += `- **Observações:** ${f.observacoes}\n`;
    out += '\n';
  }
  return out;
}

function pilarSocial(ps) {
  if (!ps) return '';
  let out = h(3, ps.titulo) + (ps.paragrafos ?? []).map(p).join('');
  if (ps.jTracker) out += h(4, ps.jTracker.titulo) + p(ps.jTracker.texto);
  return out;
}

function cenarioLaunchpads(c) {
  if (!c) return '';
  let out = h(3, c.titulo) + p(c.introducao);
  out += (c.eventos ?? []).map((e) => `- **${e.data}** — ${e.texto}`).join('\n') + '\n\n';
  return out + p(c.conclusao);
}

// ----- Módulo 4 -----
function teseVsCatalise(t) {
  let out = h(3, t.titulo) + (t.paragrafos ?? []).map(p).join('');
  out += h(4, t.regraDeOuro.titulo) + p(t.regraDeOuro.texto);
  out += h(4, t.fichaDeTese.titulo) + p(t.fichaDeTese.introducao);
  out += (t.fichaDeTese.campos ?? []).map((c) => `- **${c.rotulo}** — ${c.pergunta} *(ex.: ${c.exemplo})*`).join('\n') + '\n\n';
  out += h(4, 'Exemplos de tese × catálise');
  for (const e of t.exemplos ?? []) {
    out += `- **${e.rotulo}** (${e.tipo}) — tese: ${e.tese} | catálise: ${e.catalise} | veredito: **${e.veredito}**\n`;
  }
  out += '\n' + h(4, t.tiposDeCatalise.titulo);
  out += (t.tiposDeCatalise.itens ?? []).map((i) => `- **${i.nome}** — ${i.descricao} *Alerta:* ${i.alerta}`).join('\n') + '\n\n';
  return out;
}

function takeProfit(t) {
  let out = h(3, t.titulo) + (t.paragrafos ?? []).map(p).join('');
  out += h(4, t.escada.titulo) + p(t.escada.introducao);
  out += (t.escada.faixas ?? []).map((f) => `- **${f.alvo}** — ${f.acao}. *Por quê:* ${f.porque}`).join('\n') + '\n\n';
  out += p('*' + t.escada.observacao + '*');
  out += h(4, t.erroDeSegurar.titulo) + (t.erroDeSegurar.paragrafos ?? []).map(p).join('');
  out += h(4, t.tributacao.titulo) + p('**Aviso:** ' + t.tributacao.aviso);
  out += (t.tributacao.pontos ?? []).map((x) => `- **${x.rotulo}** — ${x.texto}`).join('\n') + '\n\n';
  return out;
}

function checagens(c) {
  let out = h(3, c.titulo) + p(c.introducao);
  out += (c.itens ?? [])
    .map((i, n) => `${n + 1}. **${i.pergunta}**\n   - Por quê: ${i.porque}\n   - Onde olhar: ${i.onde}\n   - Alerta: ${i.alerta}`)
    .join('\n') + '\n\n';
  return out;
}

// O simulador: a introdução do app, as quatro escolhas, como o resumo de
// disciplina é lido, os doze cenários por título, e dois deles por dentro — SEM
// feedback, qualidade ou lição, para o vídeo não entregar o gabarito.
function simulador(mod, lista, opcoes, faixas) {
  const s = mod.simulador;
  let out = h(3, s.titulo) + p(s.introducao) + p('**Aviso do app (repetir no vídeo):** ' + s.aviso);

  out += h(4, 'As quatro escolhas possíveis em cada cenário');
  out += li((opcoes ?? []).map((o) => `**${o.rotulo}**${o.descricao ? ' — ' + o.descricao : ''}`));

  out += h(4, 'Como o resumo de disciplina é lido no fim');
  out += p(
    'O resumo soma a qualidade de cada uma das doze escolhas e devolve uma leitura do PADRÃO ' +
      'de decisão — não do resultado financeiro, que ninguém controla. As faixas que o app usa:',
  );
  for (const f of faixas ?? []) {
    out += '- ' + Object.values(f).filter((x) => typeof x === 'string' || typeof x === 'number').join(' — ') + '\n';
  }
  out += '\n' + h(4, 'Os doze cenários (título e contexto)');
  out +=
    (lista ?? [])
      .map(
        (c) =>
          `${c.numero}. **${c.titulo}** — contexto: ${(c.tags ?? []).join(', ')}; posição inicial: ${c.posicao}; risco do cenário: ${c.risco}`,
      )
      .join('\n') + '\n\n';

  out += h(4, 'Dois cenários por dentro (SEM o gabarito — o vídeo não revela feedback nem lição)');
  for (const c of [lista[0], lista[Math.min(4, lista.length - 1)]].filter(Boolean)) {
    out += `**Cenário ${c.numero} — ${c.titulo}**\n\n` + p(c.descricao);
    out += '**Sinais na tela:**\n' + li(c.sinais);
    out +=
      '**Escolhas oferecidas:** ' +
      (opcoes ?? []).map((o) => c.opcoes?.[o.id]?.rotulo ?? o.rotulo).join(' / ') +
      '\n\n';
  }
  return out;
}

function planoDaPosicao(pp) {
  if (!pp) return '';
  let out = h(3, pp.titulo) + p(pp.legenda);
  out += (pp.niveis ?? []).map((n) => `- **${n.rotulo}** — ${n.detalhe}`).join('\n') + '\n\n';
  return out + p(pp.restante);
}

// ---------------------------------------------------------------------------
// Os 33 vídeos. `partes` é uma lista de funções que devolvem markdown — a ordem
// aqui é a ordem em que o material aparece no prompt.
// ---------------------------------------------------------------------------
const m1 = modulo1, m2 = modulo2, m3 = modulo3, m4 = modulo4, m5 = modulo5;

const VIDEOS = [
  // ============================ MÓDULO 1 (15) ============================
  {
    modulo: 1, aba: 'Fundamentos', slug: 'o-que-e-blockchain',
    titulo: 'O que é uma blockchain e por que ela é "imutável"',
    foco: 'Sair do abstrato: o caderno compartilhado, o hash como impressão digital, e por que "confirmações" são o que torna uma transação definitiva. É a base de tudo; sem isso o resto do curso não faz sentido.',
    conexoes: 'Prepara o vídeo 2 (ler uma transação) e o Módulo 5 (por que uma transação que falha ainda cobra taxa).',
    partes: [() => destaques(m1.destaques?.fundamentos), () => secoesPorId(m1, ['o-que-e-blockchain', 'imutabilidade-e-confirmacoes'])],
  },
  {
    modulo: 1, aba: 'Fundamentos', slug: 'ler-uma-transacao',
    titulo: 'Explorador de blocos: como ler uma transação',
    foco: 'Vídeo PROCEDIMENTAL. Mostrar, campo a campo, o que significa cada linha de uma transação num explorador. O espectador deve conseguir abrir uma transação sozinho e explicar em voz alta o que aconteceu — esse é o objetivo nº 1 do Módulo 1.',
    conexoes: 'Usa o que o vídeo 1 explicou (hash, confirmações). O Módulo 5 volta ao explorador para exportar histórico.',
    partes: [() => secoesPorId(m1, ['explorador-de-blocos']), () => anatomias(m1, ['transacao'])],
  },
  {
    modulo: 1, aba: 'Fundamentos', slug: 'chave-publica-privada-endereco',
    titulo: 'Chave pública, chave privada e endereço',
    foco: 'A metáfora precisa ficar cravada: endereço é o que você mostra, chave privada é o que assina, e a frase-semente gera todas. Quem entende isso entende por que "a seed É a carteira" (vídeo 9).',
    conexoes: 'Base direta dos vídeos 7, 8 e 9 (carteiras e seed) e da aba Custódia do Módulo 5.',
    partes: [() => secoesPorId(m1, ['chave-publica-privada-endereco'])],
  },
  {
    modulo: 1, aba: 'Fundamentos', slug: 'mecanica-do-gas',
    titulo: 'A mecânica do gas (taxa de rede)',
    foco: 'Já existe um vídeo deste tema no app (assets/videos/mecanica-do-gas.mp4). Este prompt serve para regravar com o padrão do curso ou para gerar a TRANSCRIÇÃO em texto, que ainda está faltando. Pontos obrigatórios: por que o preço varia, e por que transação que falha cobra do mesmo jeito.',
    conexoes: 'O Módulo 5 inteiro de taxas assume este vídeo (priority fee e gorjeta de MEV são "gas" com outros nomes).',
    partes: [() => secoesPorId(m1, ['gas-taxa-de-rede'])],
  },
  {
    modulo: 1, aba: 'Fundamentos', slug: 'contrato-inteligente',
    titulo: 'O que é um contrato inteligente, em linguagem de leigo',
    foco: 'Contrato = programa que roda sozinho na blockchain. O ponto que precisa ficar: quando você "aprova" um contrato, está dando permissão a um programa — e é isso que o golpe de drainer explora (vídeo 10).',
    conexoes: 'Prepara os vídeos 10 e 12 (drainers e revogação) e a pergunta sobre aprovação ilimitada no quiz do Módulo 5.',
    partes: [() => secoesPorId(m1, ['contrato-inteligente'])],
  },
  {
    modulo: 1, aba: 'Fundamentos', slug: 'cex-x-dex',
    titulo: 'Corretora (CEX) × troca on-chain (DEX): o que muda na prática',
    foco: 'A diferença que importa é quem guarda a chave e quem pode bloquear. Nomes de corretoras e DEXs aparecem só como exemplo de categoria — nunca como indicação.',
    conexoes: 'Leva ao vídeo 7 (onde ficam as chaves) e às "três camadas" do Módulo 5 (DEX → agregador → terminal).',
    partes: [() => secoesPorId(m1, ['cex-x-dex'])],
  },
  {
    modulo: 1, aba: 'Carteiras', slug: 'cex-hot-cold',
    titulo: 'Onde ficam suas chaves: CEX, hot wallet e cold wallet',
    foco: 'Comparação lado a lado das três categorias — prós, contras e para que situação cada uma serve. Usar a tabela do app como espinha do vídeo.',
    conexoes: 'Depende do vídeo 3 (chaves). O Módulo 5 retoma isso ao explicar o modelo de custódia de um terminal.',
    partes: [
      () => destaques(m1.destaques?.carteiras),
      () => secoesPorId(m1, ['onde-ficam-chaves', 'quando-cada-carteira-faz-sentido']),
      () => tabela(m1.tabelaCarteiras, 'Tabela comparativa do app: CEX × hot wallet × cold wallet'),
    ],
    diagramas: ['quem-guarda-chave'],
  },
  {
    modulo: 1, aba: 'Carteiras', slug: 'criar-primeira-carteira',
    titulo: 'Como criar sua primeira carteira, passo a passo',
    foco: 'Vídeo PROCEDIMENTAL. Passo a passo genérico (vale para qualquer carteira da categoria), com ênfase no momento da frase-semente: onde anotar, onde NUNCA salvar. Ilustração esquemática de telas — não captura de tela de um produto real.',
    conexoes: 'Continua direto no vídeo 9 (seed). O checklist de segurança do app deve ser mencionado como "próximo passo".',
    partes: [() => secoesPorId(m1, ['criar-primeira-carteira'])],
  },
  {
    modulo: 1, aba: 'Seed phrase', slug: 'frase-semente',
    titulo: 'Frase-semente: por que 12 ou 24 palavras SÃO a carteira',
    foco: 'O vídeo mais importante do Módulo 1. A frase não "protege" a carteira — ela É a carteira. Cada forma concreta de perder tudo deve virar uma cena. Fechar com o checklist de 20 itens do app como tarefa de casa.',
    conexoes: 'Assume o vídeo 3. É pré-requisito do Módulo 5 inteiro (exportar a seed é o plano B operacional).',
    partes: [
      () => destaques(m1.destaques?.seed),
      () => secoesPorId(m1, ['seed-e-carteira', 'formas-de-perder-tudo']),
      () => checklist(m1.checklistSeguranca, 'Checklist de segurança do app (20 itens)'),
    ],
  },
  {
    modulo: 1, aba: 'Golpes', slug: 'wallet-drainers',
    titulo: 'Wallet drainers: o golpe que não rouba a sua seed',
    foco: 'O drainer não precisa da sua seed — ele precisa de uma assinatura sua. O roteiro passo a passo (o que a vítima vê × o que está acontecendo) é o coração do vídeo: uma cena por passo.',
    conexoes: 'Depende do vídeo 5 (contrato/aprovação). Leva ao vídeo 12 (revogar) e 13 (emergência).',
    partes: [
      () => destaques(m1.destaques?.golpes),
      () => secoesPorId(m1, ['wallet-drainers-conceito', 'roteiro-do-golpe-passo-a-passo']),
      () => roteiroDrainer(m1.roteiroDrainer),
    ],
    diagramas: ['roteiro-drainer'],
  },
  {
    modulo: 1, aba: 'Golpes', slug: 'vetores-e-address-poisoning',
    titulo: 'Os vetores técnicos e o address poisoning',
    foco: 'Reconhecimento de padrões: cada vetor é "como se parece na tela" + "o que fazer". Address poisoning merece demonstração visual do endereço parecido (primeiros e últimos caracteres iguais).',
    conexoes: 'Complementa o vídeo 10. O Módulo 5 retoma o "token impostor", que é o mesmo princípio aplicado a tickers.',
    partes: [() => secoesPorId(m1, ['vetores-tecnicos', 'address-poisoning-e-clipper'])],
  },
  {
    modulo: 1, aba: 'Defesa', slug: 'revogar-aprovacoes',
    titulo: 'Revogar aprovações: como fazer, e o que isso não resolve',
    foco: 'Vídeo PROCEDIMENTAL + conceitual. Mostrar o clique a clique de revogar, mas deixar claro o que a revogação NÃO cobre (Permit2 em duas camadas, EIP-7702). Não prometer que "revogar resolve tudo".',
    conexoes: 'Depende dos vídeos 5 e 10. É a resposta prática à pergunta de aprovação ilimitada do quiz do Módulo 5.',
    partes: [
      () => destaques(m1.destaques?.defesa),
      () => secoesPorId(m1, ['revogar-aprovacoes', 'duas-camadas-permit2-e-eip7702', 'tutorial-revogar-clique-a-clique']),
    ],
    diagramas: ['permit2-camadas'],
  },
  {
    modulo: 1, aba: 'Defesa', slug: 'plano-de-emergencia',
    titulo: 'Plano de emergência: os primeiros 10 minutos se você foi drenado',
    foco: 'Vídeo curto e de ação. A pessoa vai assistir isso com o coração acelerado — ordem de prioridade clara, sem enrolação, uma decisão por tela. Idealmente 3 minutos.',
    conexoes: 'Fecha a sequência 10 → 12 → 13. Referenciar "o que ainda dá para salvar" e "o que não adianta mais".',
    partes: [() => secoesPorId(m1, ['plano-de-emergencia'])],
    diagramas: ['plano-emergencia'],
  },
  {
    modulo: 1, aba: 'Brasil', slug: 'sacar-para-reais-e-regulacao',
    titulo: 'Sacar para reais no Brasil: Pix, KYC, o marco regulatório e o imposto',
    foco: 'O caminho da cripto até virar reais na conta, e o que mudou com o marco regulatório (PSAV). Sobre imposto: dizer que a obrigação existe desde a primeira operação e que o curso NÃO ensina a calcular — "guarde registro, procure contador". Usar a linha do tempo do app.',
    conexoes: 'Conecta com o Módulo 5 (registro para imposto) e com o vídeo 15 (golpes locais no saque).',
    partes: [
      () => destaques(m1.destaques?.brasil),
      () => secoesPorId(m1, ['sacar-para-reais', 'marco-regulatorio-psav', 'impostos']),
      () => linhaDoTempo(m1.linhaDoTempoRegulacao),
    ],
    diagramas: ['cripto-para-reais'],
    naoVerificado: true,
  },
  {
    modulo: 1, aba: 'Brasil', slug: 'golpes-comuns-no-brasil',
    titulo: 'Golpes comuns no Brasil',
    foco: 'Um golpe por cena: como chega (WhatsApp, Instagram, "consultor"), qual é o gancho, e o sinal que denuncia. Tom de alerta sem ser sensacionalista.',
    conexoes: 'Reaproveita a lógica do vídeo 10 (o golpe precisa da SUA ação). Prepara o Módulo 2 (por que o hype funciona).',
    partes: [() => secoesPorId(m1, ['golpes-comuns-no-brasil'])],
  },

  // ============================ MÓDULO 2 (5) ============================
  {
    modulo: 2, aba: 'Visão geral', slug: 'economia-da-atencao',
    titulo: 'Economia da atenção: o preço é feito de olhos',
    foco: 'A tese central do curso, dita com todas as letras: memecoin sobe e desce por atenção, não por fundamento, e A MAIORIA VAI A ZERO. Dopamina e reforço intermitente explicam por que é difícil parar. O antídoto não é força de vontade — é processo.',
    conexoes: 'Enquadra os vídeos 17–20 e todo o Módulo 4. Deve ser citado no vídeo 33 (por que "não operar" é resultado frequente).',
    partes: [() => destaques(m2.destaques?.visaoGeral), () => secoesPorId(m2, ['atencao', 'dopamina', 'antidoto'])],
  },
  {
    modulo: 2, aba: 'Vieses', slug: 'os-cinco-vieses',
    titulo: 'Os cinco vieses que fazem você clicar',
    foco: 'Um viés por cena: gatilho → onde aparece → antídoto → custo de ignorar. O espectador deve se reconhecer em pelo menos um. Sem moralizar: viés é fiação do cérebro, não defeito de caráter.',
    conexoes: 'Base do simulador do Módulo 4 (os 12 cenários são vieses em ação).',
    partes: [() => destaques(m2.destaques?.vieses), () => vieses(m2.vieses)],
  },
  {
    modulo: 2, aba: 'Tipos de token', slug: 'tipos-de-token',
    titulo: 'Os tipos de token e como reconhecer cada um',
    foco: 'Catálogo com "como reconhecer" e "alerta" para cada tipo. Exemplos citados são de categoria — o vídeo NÃO pode soar como lista de compras.',
    conexoes: 'Prepara as checagens do Módulo 3 e a leitura de tela do Módulo 5.',
    partes: [() => destaques(m2.destaques?.tipos), () => tiposDeToken(m2)],
  },
  {
    modulo: 2, aba: 'Casos reais', slug: 'casos-reais',
    titulo: 'Casos reais: o que aconteceu, com números e fonte',
    foco: 'Só os números que estão no material, com as fontes citadas na tela. A lição de cada caso é o que fica. Usar a linha do tempo do app.',
    conexoes: 'Ilustra os vieses (vídeo 17) e as fases (vídeo 20) com fatos.',
    partes: [() => destaques(m2.destaques?.casos), () => casos(m2), () => linhaDoTempo(m2.linhaDoTempoCasos)],
  },
  {
    modulo: 2, aba: 'As 4 fases', slug: 'as-quatro-fases',
    titulo: 'As quatro fases de uma memecoin',
    foco: 'REGRA DURA: NÃO desenhar um gráfico de preço em forma de pump-and-dump — isso vira "padrão para caçar" na cabeça de quem assiste, e o módulo existe para dizer o contrário. Descrever cada fase pelo que se VÊ e pelo que CHECAR, não por um formato de candle. O desfecho mais comum deve ficar explícito.',
    conexoes: 'Fecha o Módulo 2 e entrega o Módulo 4 (o que fazer em cada fase é decisão, não previsão).',
    partes: [() => destaques(m2.destaques?.fases), () => fases(m2)],
  },

  // ============================ MÓDULO 3 (3) ============================
  {
    modulo: 3, aba: 'Visão geral', slug: 'por-que-duas-checagens',
    titulo: 'Por que duas checagens, e não uma só',
    foco: 'Social e técnico são perguntas diferentes: "quem está falando" e "o que o contrato/pool mostra". Uma sem a outra engana. Incluir a correção sobre o Axiom que o app registra (nenhuma ferramenta é indicação).',
    conexoes: 'Enquadra os vídeos 22 e 23; o Módulo 5 retoma "ler a tela" como checagem técnica.',
    partes: [() => secoesPorId(m3, ['dois-pilares']), () => generico(m3.correcaoAxiom, m3.correcaoAxiom?.titulo)],
  },
  {
    modulo: 3, aba: 'Matriz de ferramentas', slug: 'pilar-social-e-ferramentas',
    titulo: 'O pilar social e a matriz de ferramentas',
    foco: 'Apresentar a matriz como mapa, não ranking: para cada ferramenta, o que faz, quando usar, em que rede, e o nível de risco. Ferramentas marcadas "não verificado" no app devem ser ditas como tal.',
    conexoes: 'É o "onde olhar" das checagens do Módulo 4 e da leitura de tela do Módulo 5.',
    partes: [() => pilarSocial(m3.pilarSocial), () => ferramentas(m3)],
  },
  {
    modulo: 3, aba: 'Cenário 2025–2026', slug: 'cenario-2025-2026',
    titulo: 'O cenário 2025–2026: launchpads e o que mudou',
    foco: 'Linha do tempo com os eventos que o app registra, com data. Conclusão do app é a conclusão do vídeo — não extrapolar para "o que vem por aí".',
    conexoes: 'Contexto para o Módulo 5 (bonding curve, PumpSwap, taxa da pool).',
    partes: [() => cenarioLaunchpads(m3.cenarioLaunchpads)],
  },

  // ============================ MÓDULO 4 (4) ============================
  {
    modulo: 4, aba: 'Tese vs. catálise', slug: 'tese-vs-catalise',
    titulo: 'Tese × catálise: escrever antes de entrar',
    foco: 'A regra de ouro (duas frases por escrito) é o centro. A ficha de tese do app vira tela. Os exemplos com veredito mostram a diferença entre catálise concreta e narrativa vaga — e o veredito "não é operação, é aposta" precisa aparecer.',
    conexoes: 'Assume o Módulo 2. Alimenta o fluxo de decisão do Módulo 5 (vídeo 33).',
    partes: [() => destaques(m4.destaques?.tese), () => teseVsCatalise(m4.teseVsCatalise)],
  },
  {
    modulo: 4, aba: 'Take profit', slug: 'take-profit-em-degraus',
    titulo: 'Take profit em degraus e o erro de segurar demais',
    foco: 'A escada de realização parcial: por que tirar risco da mesa em degraus é decisão, não palpite. O "erro de segurar" (custo afundado) é a segunda metade. A calculadora de degraus do app deve ser mostrada com um exemplo. Sobre tributação: só o aviso — não ensinar a calcular.',
    conexoes: 'Base do passo "saio em degraus" do fluxo do Módulo 5.',
    partes: [
      () => destaques(m4.destaques?.takeProfit),
      () => takeProfit(m4.takeProfit),
      () => planoDaPosicao(m4.planoDaPosicao),
      () => calculadora(m4.calculadoraDeDegraus),
    ],
  },
  {
    modulo: 4, aba: 'Antes de entrar', slug: 'antes-de-entrar',
    titulo: 'Antes de entrar: as checagens, o tamanho da posição e a curva de recuperação',
    foco: 'As seis checagens como lista de "não clique antes de". Depois, a aritmética que mais surpreende iniciante: quem perde 50% precisa de +100% para voltar. As duas calculadoras do app (tamanho e recuperação) viram exemplos numéricos na tela.',
    conexoes: 'Conecta com o vídeo 30 (taxas) — o tamanho da posição também é decidido pelo atrito.',
    partes: [
      () => destaques(m4.destaques?.checagens),
      () => checagens(m4.checagens),
      () => calculadora(m4.calculadoraDeTamanho),
      () => calculadora(m4.calculadoraDeRecuperacao),
    ],
  },
  {
    modulo: 4, aba: 'Simulador', slug: 'como-usar-o-simulador',
    titulo: 'O simulador de 12 cenários: como usar e como ler o resumo',
    foco: 'Vídeo de orientação: o que é o simulador, as quatro escolhas, por que os cenários e os números neles são FICTÍCIOS (dizer isso na tela), e como ler o "resumo de disciplina" no fim — ele mede padrão de decisão, não resultado. Mostrar dois cenários por dentro para a pessoa sentir o formato, mas NÃO revelar feedback, qualidade nem lição de nenhum cenário: o gabarito é o exercício.',
    conexoes: 'É a prova prática dos vídeos 17 (vieses) e 24–26. Fechar convidando a fazer os doze no app.',
    partes: [() => simulador(m4, cenarios, OPCOES, FAIXAS_DE_DISCIPLINA)],
  },

  // ============================ MÓDULO 5 (6) ============================
  {
    modulo: 5, aba: 'Terminal', slug: 'o-que-e-um-terminal',
    titulo: 'O que é um terminal de execução e as três camadas',
    foco: 'Terminal não é DEX: é uma camada por cima. Carteira → terminal → agregador → pool, e o que cada camada cobra. O Axiom é EXEMPLO da categoria; a lista de alternativas existe justamente para o vídeo não soar como indicação.',
    conexoes: 'Assume os vídeos 6 (CEX × DEX) e 7 (chaves). Prepara o vídeo 30 (taxas).',
    partes: [
      () => destaques(m5.destaques?.terminal),
      () => secoesPorId(m5, ['o-que-e-terminal', 'as-tres-camadas', 'alternativas-da-categoria']),
      () => tabela(m5.tabelaCamadas, 'Tabela do app: as três camadas'),
      () => generico({ camadas: (m5.ilustracaoCamadas ?? []).map((c) => `${c.rotulo} — ${c.taxa} (${c.detalhe})`) }, 'Ilustração das camadas (com a taxa anotada)'),
    ],
    diagramas: ['camadas-carteira-dex'],
  },
  {
    modulo: 5, aba: 'Custódia', slug: 'custodia-e-o-risco-real',
    titulo: 'Quem guarda as chaves — e por que o risco real é o app sair do ar',
    foco: 'Não-custodial confirmado em fonte oficial: as chaves são suas, e a semente é exportável. O risco real é operacional (o front-end cair na hora de vender) — a queda de agosto/2025 é a cena. O incidente de fevereiro/2026 ensina a diferença entre "roubo de chaves" e "abuso de acesso interno". Tudo que está em NÃO VERIFICADO precisa ser dito como não verificado.',
    conexoes: 'Assume o vídeo 9 (seed). "Exportar a semente" é o plano B que o vídeo 13 não tinha.',
    partes: [() => destaques(m5.destaques?.custodia), () => secoesPorId(m5, ['custodia-do-axiom', 'o-risco-real-e-o-frontend', 'incidente-fevereiro-2026'])],
    naoVerificado: true,
  },
  {
    modulo: 5, aba: 'Taxas', slug: 'a-taxa-anunciada-nao-e-o-custo',
    titulo: 'A taxa anunciada não é o que você paga',
    foco: 'O vídeo de referência do curso — é a aba que definiu o padrão. Arco: gancho (0,95% / 3,2% / 2×) → as cinco camadas → por que ordem pequena é penalizada → o venue muda o custo → a matriz de três cenários → a calculadora de atrito. A lição que precisa cravar: a fatia anunciada é a MENOR e a única que quase não muda.',
    conexoes: 'Assume o vídeo 4 (gas). É a base do vídeo 26 (tamanho de posição) e da pergunta "com quanto dá pra começar".',
    partes: [
      () => destaques(m5.destaques?.taxas),
      () => secoesPorId(m5, ['a-taxa-anunciada-nao-e-o-custo', 'custo-fixo-pesa-mais-em-ordem-pequena', 'o-venue-muda-o-custo']),
      () => tabela(m5.tabelaTaxas, 'Tabela do app: as cinco camadas de custo'),
      () => tabela(m5.matrizDeCusto, 'Matriz do app: a mesma operação em três situações'),
      () => p(m5.graficoDeCamadas?.legenda ? '**Como o gráfico do app resume:** ' + m5.graficoDeCamadas.legenda : ''),
      () => calculadora(m5.calculadoraDeAtrito),
    ],
    diagramas: ['caminho-do-dinheiro'],
  },
  {
    modulo: 5, aba: 'Configurações', slug: 'slippage-prioridade-mev',
    titulo: 'Tipos de ordem, slippage, prioridade e proteção de MEV',
    foco: 'O que cada configuração quebra quando está errada (baixo demais falha; alto demais vira alvo de sandwich). Ordem limite: o app marca como NÃO VERIFICADO se ela fica on-chain ou depende do servidor — o vídeo tem que dizer isso e orientar "teste com valor mínimo". A calculadora de impacto de preço mostra "pool rasa" em número.',
    conexoes: 'Assume o vídeo 30. Leva ao vídeo 32 (erros).',
    partes: [
      () => destaques(m5.destaques?.configuracoes),
      () => secoesPorId(m5, ['tipos-de-ordem', 'slippage-priority-mev', 'ler-a-tela-de-operacao']),
      () => calculadora(m5.calculadoraDeImpacto),
      () => anatomias(m5, Object.keys(m5.anatomias ?? {})),
    ],
    diagramas: ['slippage-mal-configurado'],
    naoVerificado: true,
  },
  {
    modulo: 5, aba: 'Erros', slug: 'erros-de-execucao-e-bots',
    titulo: 'Os erros que custam dinheiro sem envolver o mercado — e por que você não vence bots',
    foco: 'Erro operacional, não de estratégia: token impostor (buscar pelo contrato, não pelo ticker), quantia errada, aprovar sem ler, perseguir vela. Bots: calibrar expectativa, NÃO ensinar a usar bot — inclusive dizer que colocar IA no meio deixa a pessoa mais lenta, não mais rápida.',
    conexoes: 'Assume os vídeos 11 (impostor) e 31 (slippage).',
    partes: [() => destaques(m5.destaques?.erros), () => secoesPorId(m5, ['erros-de-execucao', 'bots-de-sniping'])],
  },
  {
    modulo: 5, aba: 'Processo', slug: 'do-token-ao-encerramento',
    titulo: 'Do "vi um token" ao "encerrei a posição" — e o registro para imposto',
    foco: 'O fluxo de decisão inteiro, uma tela por passo, com DOIS caminhos que terminam em "não opero" mostrados como resultado legítimo e frequente — não como falha. Registro para imposto: exportação de CSV é NÃO VERIFICADO; o histórico on-chain é sempre recuperável pelo explorador. Fechar o curso ligando de volta ao Módulo 2: passar na maioria das vezes é o comportamento esperado.',
    conexoes: 'É o fechamento do curso: amarra 16 (atenção), 24 (tese), 25 (degraus), 26 (checagens) e 30 (taxas).',
    partes: [() => destaques(m5.destaques?.processo), () => secoesPorId(m5, ['registro-para-imposto', 'do-token-ao-encerramento'])],
    diagramas: ['fluxo-de-decisao'],
    naoVerificado: true,
  },
];

if (VIDEOS.length !== 33) throw new Error('Esperava 33 vídeos, encontrei ' + VIDEOS.length);

// ---------------------------------------------------------------------------
// O cabeçalho comum: é aqui que mora "o que queremos" em todo vídeo.
// ---------------------------------------------------------------------------
function cabecalho(v, n) {
  const mod = MODULOS[v.modulo];
  return `# Vídeo ${n} de 33 — ${v.titulo}

**Módulo ${v.modulo} — ${TITULO_DO_MODULO[v.modulo]} · Aba "${v.aba}" · Duração-alvo: 4 a 5 minutos (máximo 6)**

> Cole este documento inteiro no Gemini. Ele contém as instruções E o material-fonte.
> Gerado automaticamente a partir dos dados do app (\`scripts/gerar-prompts-de-video.mjs\`);
> se o texto do módulo mudar, gere de novo — o vídeo segue o texto, nunca o contrário.

## O papel deste vídeo no curso

${v.foco}

**Conexões:** ${v.conexoes}

**Resumo do módulo, para contexto:** ${mod.resumo}

## Instruções para o Gemini

### Público e tom
- Público: **iniciante absoluto** — alguém que nunca abriu uma carteira. Português do Brasil, conversa direta, sem tom de palestra.
- Todo termo técnico é explicado **na primeira vez em que aparece, dentro da própria frase**. Nunca "como você já sabe".
- Uma ideia por tela. Se uma tela precisa de dois conceitos, são duas telas.

### Formato
- Narração + ilustrações esquemáticas (slides, diagramas, animações simples). Estilo visual: fundo escuro, acentos roxo e ciano, texto grande e legível no celular.
- **Estrutura obrigatória:**
  1. **Gancho (até 15 s):** abra com o número ou fato mais surpreendente da seção "Ganchos" abaixo.
  2. **Explicação:** o material-fonte, na ordem em que está.
  3. **Exemplo concreto:** pelo menos um, com número — e só números que estejam no material.
  4. **O que fazer / o que não fazer:** duas listas curtas.
  5. **Recapitulação em 3 frases.**
  6. **Frase final obrigatória (literal):** "Este vídeo é material de estudo. Não é aconselhamento financeiro, jurídico ou tributário. Memecoin é o ativo de maior risco do mercado — a maioria vai a zero."

### Regras duras — o vídeo é REJEITADO se quebrar qualquer uma
- **Não inventar número.** Use somente os números do material-fonte. Se faltar um dado, diga "isso não está verificado" em vez de estimar.
- **Não recomendar plataforma, carteira, corretora ou ferramenta.** Todo nome que aparece é exemplo de categoria. Nunca "use X", "eu recomendo", "a melhor é".
- **Não prometer resultado.** Proibido: "vai subir", "garantido", "sinal", "oportunidade", "aumenta suas chances de lucro". O enquadramento é sempre: **reduzir erro de operação e não perder dinheiro por desatenção.**
- **Não usar captura de tela de plataforma real.** Ilustração esquemática, sempre — por direito autoral, por parecer endosso, e porque interface de cripto muda em semanas.
- **Não desenhar gráfico de preço em forma de pump-and-dump** como se fosse padrão para caçar.
- **Manter a tese do curso:** memecoin sobe e desce por atenção, não por fundamento, e a maioria vai a zero.
- Se algum ponto está marcado **NÃO VERIFICADO** abaixo, o vídeo diz isso com todas as letras.

### Entregáveis (os três, sempre)
1. **O vídeo.**
2. **O roteiro de narração em texto**, em parágrafos corridos, sem timestamps — ele vira a transcrição dentro do app (acessibilidade e modo offline). Mesmo texto que foi narrado, palavra por palavra.
3. **A lista de números usados**, cada um com a frase do material-fonte de onde veio.

---

`;
}

function corpo(v) {
  const mod = MODULOS[v.modulo];
  let out = '';
  out += v.partes.map((fn) => fn() ?? '').join('');
  // Ganchos vêm dentro de `partes` quando existem. O bloco que destaques() gera
  // tem forma fixa — título, parágrafo de instrução, bullets, linha em branco —
  // e o título de MATERIAL-FONTE precisa entrar DEPOIS dos bullets, não depois
  // do primeiro parágrafo (foi um bug: os ganchos iam parar debaixo do título
  // errado).
  const TITULO_FONTE = h(2, 'MATERIAL-FONTE (copiado do app — a base do vídeo; não vá além dele)');
  const blocoDeGanchos = /^(## Ganchos[^\n]*\n\n[^\n]+\n\n(?:- [^\n]*\n)+\n)/;
  out = blocoDeGanchos.test(out)
    ? out.replace(blocoDeGanchos, (_, ganchos) => ganchos + TITULO_FONTE)
    : TITULO_FONTE + out;
  out += diagramas(mod, v.diagramas ?? []);
  if (v.naoVerificado) out += naoVerificado(mod);
  return out;
}

function slugArquivo(n, v) {
  return `VIDEO-${String(n).padStart(2, '0')}-M${v.modulo}-${v.slug}.md`;
}

// ---------------------------------------------------------------------------
await mkdir(SAIDA, { recursive: true });

const indice = [];
let totalPalavras = 0;

for (const [i, v] of VIDEOS.entries()) {
  const n = i + 1;
  const conteudo = cabecalho(v, n) + corpo(v);
  const arquivo = slugArquivo(n, v);
  await writeFile(path.join(SAIDA, arquivo), conteudo, 'utf8');
  const palavras = conteudo.split(/\s+/).length;
  totalPalavras += palavras;
  indice.push({ n, v, arquivo, palavras });
}

const readme = `# Prompts de vídeo — um por aula (33)

Gerados por \`scripts/gerar-prompts-de-video.mjs\` a partir de \`src/data/\`. **Não edite
estes arquivos à mão**: mude o texto do módulo (ou o script) e rode de novo:

\`\`\`
node scripts/gerar-prompts-de-video.mjs
\`\`\`

## Como usar

Um chat por vídeo. Copie o arquivo inteiro e cole no Gemini. Peça os **três
entregáveis** que o prompt lista: o vídeo, o roteiro de narração em texto e a lista
de números usados. O roteiro vira a \`transcricao\` do vídeo em \`src/data/moduloN.js\`
— sem ele, o vídeo é o único elemento do hub sem versão em texto.

## Limite de tamanho — leia antes de gerar os 33

Os vídeos ficam no próprio repositório, servidos pelo GitHub Pages, que aceita
**site publicado de até 1 GB**. O primeiro vídeo (8 min, 720p) tem 48,5 MB.

| Se cada vídeo tiver | 33 vídeos ocupam | Cabe? |
|---|---:|---|
| 8 min (como o primeiro) | ~1,6 GB | **não** |
| 5 min | ~1,0 GB | no limite |
| 4 min | ~800 MB | sim |

Por isso a duração-alvo em todos os prompts é **4 a 5 minutos**. Se o Gemini entregar
mais longo, re-encodar para caber (ou aceitar menos vídeos). Vídeo **não** entra no
precache do service worker — funciona online; o texto do módulo funciona offline.

## Ordem sugerida de gravação

Comece pelos que o curso mais depende: **9** (seed), **10** (drainers), **30**
(taxas), **33** (fluxo de decisão). Os procedimentais (**2, 8, 12, 13**) são os que
mais ganham com vídeo.

## Índice

| # | Módulo | Aba | Vídeo | Arquivo | Palavras |
|---|---|---|---|---|---:|
${indice.map(({ n, v, arquivo, palavras }) => `| ${n} | M${v.modulo} | ${v.aba} | ${v.titulo} | \`${arquivo}\` | ${palavras} |`).join('\n')}

Total: ${indice.length} prompts, ~${totalPalavras.toLocaleString('pt-BR')} palavras.
`;

await writeFile(path.join(SAIDA, 'README.md'), readme, 'utf8');

console.log(`OK — ${indice.length} prompts em ${path.relative(RAIZ, SAIDA)} (~${totalPalavras} palavras)`);
for (const { n, arquivo, palavras } of indice) console.log(String(n).padStart(2), String(palavras).padStart(5) + 'w', arquivo);
