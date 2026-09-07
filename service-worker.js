// service-worker.js — deixa o hub abrir offline depois da primeira visita.
//
// Duas estratégias diferentes, porque os arquivos têm naturezas diferentes:
//   1. Arquivos do próprio app (esta lista): "cache primeiro". Eles só mudam quando
//      alguém publica uma versão nova — e aí CACHE_VERSAO muda junto (ver abaixo).
//   2. CDN externo (Tailwind, Mermaid, Chart.js): "rede primeiro, cache de reserva".
//      Tenta buscar a versão mais nova; se não tiver internet, usa a cópia salva da
//      visita anterior. Isso é o que permite abrir Módulo 1/2 (com diagrama) e a
//      tela de Início (com gráfico) mesmo offline, depois da primeira vez.
//
// IMPORTANTE ao editar arquivos do app: aumente o número em CACHE_VERSAO. Sem isso,
// quem já instalou o app continua vendo a versão antiga guardada em cache.

const CACHE_VERSAO = 'omh-cache-v9';

const ARQUIVOS_DO_APP = [
  './',
  'assets/icons/icon.svg',
  'assets/icons/icon-192.png',
  'assets/icons/icon-512.png',
  'index.html',
  'manifest.json',
  'src/app.js',
  'src/components/anatomia.js',
  'src/components/calculadora.js',
  'src/components/checklist.js',
  'src/components/comparisonTable.js',
  'src/components/destaques.js',
  'src/components/diagrama.js',
  'src/components/glossary.js',
  'src/components/grafico.js',
  'src/components/linhaDoTempo.js',
  'src/components/phaseFlow.js',
  'src/components/quiz.js',
  'src/components/sidebar.js',
  'src/components/simulator.js',
  'src/components/toolMatrix.js',
  'src/components/video.js',
  'src/data/cenarios.js',
  'src/data/glossario.js',
  'src/data/modulo1.js',
  'src/data/modulo2.js',
  'src/data/modulo3.js',
  'src/data/modulo4.js',
  'src/data/modulo5.js',
  'src/data/referencias.js',
  'src/router.js',
  'src/store.js',
  'src/ui.js',
  'src/views/glossario.js',
  'src/views/inicio.js',
  'src/views/modulo1.js',
  'src/views/modulo2.js',
  'src/views/modulo3.js',
  'src/views/modulo4.js',
  'src/views/modulo5.js',
  'styles/custom.css',
];

// skipWaiting: a versão nova assume assim que instala, sem esperar todas as abas
// da versão antiga fecharem — combinando com clients.claim() no activate.
self.addEventListener('install', (evento) => {
  self.skipWaiting();
  evento.waitUntil(
    caches
      .open(CACHE_VERSAO)
      .then((cache) =>
        // NÃO usar cache.addAll(): ele faz fetch() normal, que respeita o cache
        // HTTP comum (o GitHub Pages serve com Cache-Control: max-age=600 via
        // Fastly). Se alguém abrir o site nos ~10 minutos depois de um deploy,
        // o addAll podia gravar o arquivo VELHO dentro do cache da versão NOVA
        // — e aí ele ficava preso ali até o próximo bump de CACHE_VERSAO. Isso
        // já aconteceu na prática (06/09/2026). `cache: 'reload'` força buscar
        // da rede, ignorando esse cache HTTP intermediário.
        Promise.allSettled(
          ARQUIVOS_DO_APP.map((url) =>
            fetch(url, { cache: 'reload' }).then((resposta) => cache.put(url, resposta)),
          ),
        ),
      )
      .then((resultados) => {
        // Um único arquivo faltando não devia derrubar a instalação inteira;
        // melhor logar os que falharam e seguir do que deixar o app inteiro
        // sem funcionar offline.
        const falhas = resultados.filter((r) => r.status === 'rejected');
        if (falhas.length) {
          console.warn(
            '[service-worker] não consegui guardar em cache:',
            falhas.map((f) => f.reason),
          );
        }
      }),
  );
});

// Apaga caches de versões antigas (de uma publicação anterior) e assume o
// controle das abas já abertas, sem precisar de F5.
self.addEventListener('activate', (evento) => {
  evento.waitUntil(
    caches
      .keys()
      .then((chaves) =>
        Promise.all(
          chaves.filter((chave) => chave !== CACHE_VERSAO).map((chave) => caches.delete(chave)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (evento) => {
  const { request } = evento;

  // Só GET é seguro de cachear; POST/PUT etc. (nenhum existe hoje neste app) passam direto.
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // Vídeo passa direto, sem o service worker no meio. Dois motivos:
  //   1. O <video> não baixa o arquivo inteiro: ele pede pedaços, com cabeçalho
  //      Range, e recebe respostas 206. A Cache API não guarda 206 de forma
  //      confiável, e mediar esse vai-e-vem pelo SW tem comportamento irregular
  //      entre navegadores — é uma das causas clássicas de vídeo que não toca
  //      dentro de PWA.
  //   2. Os vídeos são grandes demais para o cache do app. Deixar o navegador
  //      cuidar deles (com o cache HTTP normal) é o certo aqui.
  // Consequência assumida: o texto do módulo funciona offline, o vídeo não.
  if (/\.(mp4|webm|m4v|mov)$/i.test(url.pathname)) return;

  const ehArquivoDoApp = url.origin === self.location.origin;

  if (ehArquivoDoApp) {
    evento.respondWith(
      caches.match(request).then((resposta) => resposta ?? fetch(request)),
    );
    return;
  }

  // CDN externo: tenta a rede primeiro para pegar atualização; guarda uma cópia
  // nova a cada sucesso; se a rede falhar (offline), usa a cópia mais recente salva.
  evento.respondWith(
    fetch(request)
      .then((resposta) => {
        const copia = resposta.clone();
        caches.open(CACHE_VERSAO).then((cache) => cache.put(request, copia));
        return resposta;
      })
      .catch(() => caches.match(request)),
  );
});
