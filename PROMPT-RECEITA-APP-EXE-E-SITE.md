# Prompt para o chat do projeto novo — app `.exe` + site publicado

> Cole tudo isto na primeira mensagem do chat do projeto novo.
> Foi escrito a partir de um projeto que **já está no ar e funcionando**
> (`onchain-mastery-hub`, app "mmc"), não de teoria. As armadilhas listadas na
> Parte 4 aconteceram de verdade e cada uma custou horas.

---

## O que eu quero

Quero o mesmo arranjo que já funcionou num projeto anterior meu: **um site estático
publicado de graça no GitHub Pages, que também instala como app no celular (PWA), e
um instalador `.exe` para Windows** que abre esse mesmo conteúdo numa janela própria,
com ícone na área de trabalho.

Antes de escrever qualquer código, leia a receita abaixo inteira. Ela não é um
palpite: é a descrição de um sistema que está rodando.

---

## A decisão de arquitetura, em uma frase

**O site é a verdade. O `.exe` é só uma janela que aponta para ele.**

O executável **não** carrega uma cópia dos arquivos dentro dele. Ele carrega a URL
publicada. Isso tem uma consequência que é o motivo inteiro de fazer assim:

> Publicou uma correção no site → quem já instalou o app recebe sozinho, na próxima
> vez que abrir. **Nunca mais precisa gerar instalador novo por causa de conteúdo.**

O instalador só é regerado quando muda algo da *janela* (nome, ícone, tamanho) — o
que, na prática, é quase nunca. No projeto anterior foram duas versões em toda a vida
do projeto.

O preço dessa escolha: sem internet **na primeiríssima vez**, o app não tem o que
mostrar. Depois da primeira abertura o service worker resolve isso e ele abre offline.

---

## Parte 1 — o site

### Stack

Sem build, sem npm, sem framework, sem backend. HTML + CSS + JavaScript com ES
Modules nativos. Bibliotecas, se precisar, entram por CDN com versão fixada.

Isso não é preciosismo: é o que permite o GitHub Pages servir a pasta direto, sem
pipeline nenhum, e o que faz o projeto continuar abrindo daqui a dois anos sem
`npm install` quebrado.

### Estrutura

```
projeto/
  index.html
  manifest.json          ← faz virar app instalável
  service-worker.js      ← faz abrir offline
  assets/icons/          ← icon.svg, icon-192.png, icon-512.png
  styles/
  src/
    app.js               ← ponto de entrada, registra o service worker
    router.js            ← navegação por #hash (obrigatório: ver Parte 4)
    store.js             ← estado em localStorage
    components/
    data/                ← conteúdo separado da lógica
    views/
```

### Publicar

Não precisa de GitHub Actions nem de branch `gh-pages`. No projeto anterior:

1. `git push origin master`
2. Settings → Pages → Source: **Deploy from a branch** → branch `master`, pasta `/ (root)`
3. Sai `https://<usuario>.github.io/<repositorio>/`

Todos os caminhos no código são **relativos** (`./src/app.js`, `assets/icons/...`),
nunca começando com `/`. Com barra na frente o site quebra, porque ele não fica na
raiz do domínio e sim dentro de `/<repositorio>/`.

### Os três arquivos que fazem virar app

**`manifest.json`** — o que dá o botão "Instalar" no navegador:

```json
{
  "name": "Nome Completo Do App",
  "short_name": "Apelido",
  "description": "Uma linha.",
  "start_url": "./index.html#/inicio",
  "scope": "./",
  "display": "standalone",
  "background_color": "#0B0F17",
  "theme_color": "#0B0F17",
  "lang": "pt-BR",
  "icons": [
    { "src": "assets/icons/icon.svg", "sizes": "any", "type": "image/svg+xml", "purpose": "any" },
    { "src": "assets/icons/icon-192.png", "sizes": "192x192", "type": "image/png", "purpose": "any" },
    { "src": "assets/icons/icon-512.png", "sizes": "512x512", "type": "image/png", "purpose": "any" }
  ]
}
```

**No `<head>` do `index.html`**, e o primeiro bloco tem que vir **antes de qualquer
outro script**, inclusive antes de CDN:

```html
<!-- O navegador dispara beforeinstallprompt UMA vez só, e cedo demais na carga.
     Se esperar um módulo carregar para escutar, o evento já passou e o botão
     "Instalar" nunca aparece. Guarda numa global e avisa por evento customizado. -->
<script>
  window.__installPrompt = null;
  window.addEventListener('beforeinstallprompt', function (evento) {
    evento.preventDefault();
    window.__installPrompt = evento;
    window.dispatchEvent(new CustomEvent('app:install-disponivel'));
  });
</script>

<link rel="manifest" href="manifest.json">
<link rel="icon" type="image/svg+xml" href="assets/icons/icon.svg">
<link rel="apple-touch-icon" href="assets/icons/icon.svg">
<meta name="theme-color" content="#0B0F17">
<meta name="apple-mobile-web-app-capable" content="yes">
```

**`service-worker.js`** — copie a versão da Parte 3. Não improvise esta parte; ela
tem duas correções que só aparecem depois de o app quebrar em produção.

Registro, em `src/app.js`, **sem esperar o evento `load`** (esperar já se mostrou
frágil; `register()` não precisa disso):

```js
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('./service-worker.js')
    .catch((erro) => console.warn('[app] service worker não registrou:', erro));
}
```

---

## Parte 2 — o `.exe`

Pasta `desktop-app/` dentro do mesmo repositório. É o **único** lugar com `npm` —
o site continua sem build.

### `desktop-app/package.json`

```json
{
  "name": "meu-app-desktop",
  "version": "1.0.0",
  "private": true,
  "description": "Janela Electron que carrega o site publicado no GitHub Pages.",
  "main": "main.js",
  "scripts": {
    "start": "electron .",
    "build": "electron-builder --win nsis"
  },
  "build": {
    "appId": "com.seudominio.desktop",
    "productName": "NomeDoApp",
    "directories": { "output": "dist" },
    "win": { "target": "nsis", "icon": "build/icon.ico" },
    "nsis": {
      "oneClick": false,
      "allowToChangeInstallationDirectory": true,
      "createDesktopShortcut": true,
      "createStartMenuShortcut": true
    }
  },
  "devDependencies": {
    "electron": "^32.0.0",
    "electron-builder": "^25.1.8"
  }
}
```

`productName` é o nome que aparece no atalho, na barra de tarefas e no instalador.

### `desktop-app/main.js`

As três partes marcadas com ★ não são óbvias e cada uma existe por causa de um
problema real.

```js
const { app, BrowserWindow, session } = require('electron');
const path = require('path');

const URL_DO_APP = 'https://SEU-USUARIO.github.io/SEU-REPOSITORIO/';
const TITULO_DA_JANELA = 'NomeDoApp';

// ★ 1 — Limpa o que guarda VERSÃO do site, antes de carregar.
//
// O Chromium (que roda dentro do Electron) só confere se o service worker tem
// versão nova de vez em quando, NÃO a cada abertura. Na prática um app instalado
// pode ficar SEMANAS preso numa versão antiga mesmo com o conteúdo novo já
// publicado. Isso aconteceu de verdade no projeto anterior.
//
// IMPORTANTE: 'localstorage' NÃO entra nesta lista. É lá que mora o progresso do
// usuário — apagar seria zerar o trabalho dele toda vez que abrisse o app.
async function limparCacheDeVersao() {
  try {
    await session.defaultSession.clearCache();
    await session.defaultSession.clearStorageData({
      storages: ['serviceworkers', 'cachestorage'],
    });
  } catch (erro) {
    // Se falhar, seguir mesmo assim: abrir numa versão antiga é ruim, não abrir é pior.
    console.warn('[app] não consegui limpar o cache de versão:', erro);
  }
}

function criarJanela() {
  const janela = new BrowserWindow({
    title: TITULO_DA_JANELA,
    width: 1280,
    height: 800,
    minWidth: 360,
    minHeight: 500,
    backgroundColor: '#0B0F17',   // evita o flash branco antes da página carregar
    autoHideMenuBar: true,        // sem menu Arquivo/Editar/Exibir — não é um navegador
    icon: path.join(__dirname, 'build', 'icon.ico'),
    webPreferences: { contextIsolation: true, nodeIntegration: false },
  });

  // ★ 2 — O site troca o <title> a cada rota, e isso mudaria o nome na barra de
  // tarefas junto. Como o app tem nome fixo, ignoramos a troca.
  janela.on('page-title-updated', (evento) => evento.preventDefault());

  janela.loadURL(URL_DO_APP);

  // ★ 3 — Sem internet e sem cache (primeiro uso, offline): a tela de erro padrão
  // do Chromium é feia e em inglês. Troca por uma página própria com botão de
  // tentar de novo.
  janela.webContents.on('did-fail-load', (_evento, codigoErro) => {
    // -3 é ERR_ABORTED, que também dispara em navegação normal do próprio app.
    // Sem este if, a tela de erro aparece durante uso normal.
    if (codigoErro === -3) return;
    janela.loadFile(path.join(__dirname, 'offline.html'));
  });
}

// A limpeza roda ANTES de criar a janela — senão a página já começou a carregar
// do cache velho enquanto o clear acontecia.
app.whenReady().then(async () => {
  await limparCacheDeVersao();
  criarJanela();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) criarJanela();
});
```

Falta ainda `desktop-app/offline.html` (uma página simples, ~50 linhas, com a
mensagem e um botão que chama `location.reload()`) e `desktop-app/build/icon.ico`.

### Gerar o instalador

```bash
cd desktop-app && npm install && npm run build
```

Sai em `desktop-app/dist/NomeDoApp Setup 1.0.0.exe`.

**Duas coisas para o dono saber antes de distribuir:**

- **O arquivo tem ~161 MB.** Electron embute o Chromium inteiro. É o preço do
  formato; não tem como reduzir muito sem trocar de tecnologia.
- **O instalador não é assinado digitalmente**, então o Windows vai mostrar o aviso
  azul do SmartScreen ("Windows protegeu o computador"), e a pessoa precisa clicar
  em "Mais informações → Executar assim mesmo". Isso é normal para software sem
  certificado. Certificado de assinatura de código custa dinheiro por ano; só vale
  se for distribuir para desconhecidos.

### `.gitignore`

```gitignore
node_modules/
desktop-app/dist*/     # instaladores de 161 MB — nunca versionar
.vscode/
.idea/
Thumbs.db
.DS_Store
```

O `desktop-app/package-lock.json` **fica versionado de propósito**, para fixar as
versões exatas que geraram o build que funciona.

---

## Parte 3 — o `service-worker.js`

```js
// Duas estratégias, porque os arquivos têm naturezas diferentes:
//   1. Arquivos do próprio app: "cache primeiro" — só mudam quando alguém publica.
//   2. CDN externo: "rede primeiro, cache de reserva" — pega atualização quando dá,
//      e funciona offline com a cópia da visita anterior.
//
// AO EDITAR QUALQUER ARQUIVO DA LISTA: aumente o número em CACHE_VERSAO.
// Sem isso, quem já instalou continua vendo a versão antiga. Não tem jeito
// automático; é disciplina.

const CACHE_VERSAO = 'meu-app-cache-v1';

const ARQUIVOS_DO_APP = [
  './', 'index.html', 'manifest.json', 'styles/custom.css',
  'assets/icons/icon.svg', 'assets/icons/icon-192.png', 'assets/icons/icon-512.png',
  'src/app.js', 'src/router.js', 'src/store.js',
  // ... TODO arquivo .js do projeto, um por um
];

self.addEventListener('install', (evento) => {
  self.skipWaiting();
  evento.waitUntil(
    caches.open(CACHE_VERSAO).then((cache) =>
      // NÃO usar cache.addAll(). Ele faz fetch() normal, que respeita o cache HTTP
      // comum — e o GitHub Pages serve com Cache-Control: max-age=600 via Fastly.
      // Quem abrisse o site nos ~10 minutos depois de um deploy gravava o arquivo
      // VELHO dentro do cache da versão NOVA, e ficava preso ali até o próximo
      // bump de CACHE_VERSAO. Aconteceu de verdade. `cache: 'reload'` ignora esse
      // cache HTTP intermediário e força buscar da rede.
      Promise.allSettled(
        ARQUIVOS_DO_APP.map((url) =>
          fetch(url, { cache: 'reload' }).then((resposta) => cache.put(url, resposta)),
        ),
      ),
    ).then((resultados) => {
      // Um arquivo faltando não deve derrubar a instalação inteira.
      const falhas = resultados.filter((r) => r.status === 'rejected');
      if (falhas.length) console.warn('[sw] não guardei em cache:', falhas.map((f) => f.reason));
    }),
  );
});

// Apaga caches de versões antigas e assume as abas abertas sem precisar de F5.
self.addEventListener('activate', (evento) => {
  evento.waitUntil(
    caches.keys()
      .then((chaves) => Promise.all(
        chaves.filter((c) => c !== CACHE_VERSAO).map((c) => caches.delete(c)),
      ))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (evento) => {
  const { request } = evento;
  if (request.method !== 'GET') return;   // só GET é seguro de cachear

  const url = new URL(request.url);

  // Vídeo passa direto, SEM o service worker no meio. O <video> pede pedaços com
  // cabeçalho Range e recebe respostas 206, que a Cache API não guarda de forma
  // confiável — é uma das causas clássicas de "vídeo não toca dentro do PWA".
  // Consequência assumida: o texto funciona offline, o vídeo não.
  if (/\.(mp4|webm|m4v|mov)$/i.test(url.pathname)) return;

  if (url.origin === self.location.origin) {
    evento.respondWith(caches.match(request).then((r) => r ?? fetch(request)));
    return;
  }

  // CDN externo: rede primeiro, cache de reserva.
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
```

---

## Parte 4 — as armadilhas (a parte que não dá para adivinhar)

Todas aconteceram no projeto anterior. Leia antes de depurar qualquer coisa, porque
todas se disfarçam de "meu código está errado" quando não está.

**1. `cache.addAll()` respeita o cache HTTP.** Já explicado no código acima. Sintoma:
publica a correção, o site continua velho, e o arquivo velho está *dentro* do cache
da versão nova. Parece impossível e não é.

**2. Trocar `location.hash` não recarrega a página.** Os ES Modules já carregados
continuam em memória. Você edita um arquivo, navega, e continua rodando o código
antigo — concluindo que a correção não funcionou quando funcionou. Para conferir de
verdade: `location.reload()`.

**3. Servidor local de desenvolvimento precisa de cache desligado.** `npx serve`
guarda o conteúdo do lado do servidor e devolve bytes velhos na mesma URL. Use:

```bash
npx http-server . -c-1 --silent
```

O `-c-1` desliga o cache. Sem isso você depura um arquivo que já corrigiu.

**4. Nunca limpe `localstorage` no Electron.** É onde mora o progresso do usuário.
Está no `clearStorageData` de propósito **fora** da lista.

**5. Git LFS não funciona com GitHub Pages.** O Pages serve o arquivo-ponteiro de
texto em vez do arquivo real. Se o projeto tiver vídeo ou mídia grande, ou entra no
git normal (e fica **permanente** no histórico público — pense antes) ou vai para
hospedagem externa.

**6. Arquivo grande no git é para sempre.** `git rm` depois não tira do histórico.
Decida antes do primeiro push, não depois.

**7. Caminho absoluto quebra o site.** `/src/app.js` procura na raiz do domínio;
o site mora em `/<repositorio>/`. Sempre relativo.

**8. Verifique pelo DOM, não por captura de tela.** Aba de preview pode parar de
pintar (zero quadros de animação mesmo com a aba "visível"), e aí a captura falha ou
mente. Confira lendo o conteúdo da página.

---

## Parte 5 — a ordem de execução

1. Site funcionando localmente (`http-server . -c-1`), navegação e conteúdo prontos.
2. `manifest.json` + ícones + `service-worker.js`. Testar: abrir, desligar a rede
   nas ferramentas do desenvolvedor, recarregar — tem que abrir.
3. Repositório no GitHub, `push`, Settings → Pages. Confirmar a URL pública no ar.
4. **Só agora** o `desktop-app/`, já com a URL real em `URL_DO_APP`.
5. `npm run build`, instalar o `.exe`, conferir que abre o conteúdo publicado.
6. Testar o ciclo que justifica tudo: mude uma palavra no site, suba
   `CACHE_VERSAO`, `push`, espere ~1 minuto, abra o `.exe` de novo — a palavra nova
   tem que aparecer **sem reinstalar nada**. Se isso funcionar, está pronto.

---

## O que trocar para o projeto novo

- [ ] `URL_DO_APP` em `main.js` — a URL real do Pages
- [ ] `productName`, `appId`, `name`, `description` em `package.json`
- [ ] `TITULO_DA_JANELA` em `main.js`
- [ ] `name`, `short_name`, `description`, `lang`, cores no `manifest.json`
- [ ] Ícones: `assets/icons/` (site) e `desktop-app/build/icon.ico` (app)
- [ ] Prefixo do `CACHE_VERSAO`
- [ ] A lista `ARQUIVOS_DO_APP` inteira
- [ ] `.claude/launch.json`, se usar Claude Code

---

## Como quero que você trabalhe

- Comentário e interface em português do Brasil.
- Código simples e comentado — eu não sou programador.
- **Não adicione dependência nova sem me perguntar.** O site é zero dependência; o
  `desktop-app/` tem exatamente duas (electron e electron-builder).
- Não invente dado nem citação. Se não verificou, escreva "não verificado".
- Antes de dizer que algo funciona, verifique de verdade e me diga como verificou.
  Se não deu para verificar, diga isso em vez de afirmar que está pronto.

Agora me diga o que o projeto novo é, e comece pelo passo 1.
