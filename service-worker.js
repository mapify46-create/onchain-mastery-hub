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

const CACHE_VERSAO = 'omh-cache-v6';

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
      .then((cache) => cache.addAll(ARQUIVOS_DO_APP))
      .catch((erro) => {
        // Um único arquivo faltando derrubaria a instalação inteira; melhor logar
        // e seguir do que deixar o app inteiro sem funcionar offline.
        console.warn('[service-worker] não consegui guardar tudo em cache:', erro);
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

  const ehArquivoDoApp = new URL(request.url).origin === self.location.origin;

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
