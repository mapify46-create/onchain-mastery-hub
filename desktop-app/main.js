// main.js — processo principal do Electron.
//
// De propósito, esta janela carrega o site JÁ PUBLICADO no GitHub Pages, em vez
// de empacotar uma cópia dos arquivos aqui dentro. Isso significa que qualquer
// atualização feita no site (novo módulo, correção, etc.) aparece automaticamente
// para quem já tem o app instalado — sem precisar gerar um instalador novo a
// cada mudança. O service worker do próprio site (ver ../service-worker.js) cuida
// de deixar isso funcionando offline depois da primeira visita, porque o Electron
// usa o mesmo motor Chromium por baixo dos panos.

const { app, BrowserWindow, session } = require('electron');
const path = require('path');

const URL_DO_APP = 'https://mapify46-create.github.io/onchain-mastery-hub/';
const TITULO_DA_JANELA = 'mmc';

// Limpa o que guarda VERSÃO do site, antes de carregar.
//
// Por que isso existe: o Chromium (que roda por dentro do Electron) só confere se
// o service worker tem versão nova de vez em quando — não a cada abertura. Na
// prática, um app instalado podia ficar semanas preso numa versão antiga do site
// mesmo com o conteúdo novo publicado. Aconteceu de verdade em 06/09/2026: o app
// continuava sem o Módulo 5 depois de o site já estar atualizado.
//
// Limpar aqui força o app a buscar tudo da rede a cada abertura, que é justamente
// o combinado deste app: o conteúdo mora no site publicado e as atualizações
// precisam chegar sozinhas, sem gerar instalador novo.
//
// IMPORTANTE: 'localstorage' NÃO entra nesta lista. É lá que fica o progresso do
// usuário (módulos concluídos, quizzes, glossário, simulador) — apagar isso seria
// zerar o estudo de quem usa o app a cada vez que ele abrisse.
async function limparCacheDeVersao() {
  try {
    await session.defaultSession.clearCache();
    await session.defaultSession.clearStorageData({
      storages: ['serviceworkers', 'cachestorage'],
    });
  } catch (erro) {
    // Se a limpeza falhar, seguir mesmo assim: o app abrir numa versão antiga é
    // ruim, mas não abrir é pior.
    console.warn('[mmc] não consegui limpar o cache de versão:', erro);
  }
}

function criarJanela() {
  const janela = new BrowserWindow({
    title: TITULO_DA_JANELA,
    width: 1280,
    height: 800,
    minWidth: 360,
    minHeight: 500,
    backgroundColor: '#0B0F17', // evita o flash branco antes da página carregar
    autoHideMenuBar: true, // sem menu "Arquivo/Editar/Exibir" — não é um navegador
    icon: path.join(__dirname, 'build', 'icon.ico'),
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  // O site troca o <title> a cada rota (ex.: "Módulo 2 — ... — onchain-mastery-hub"),
  // e isso normalmente atualizaria o título da janela/barra de tarefas também.
  // Como o nome do app agora é fixo, ignoramos essa troca.
  janela.on('page-title-updated', (evento) => {
    evento.preventDefault();
  });

  janela.loadURL(URL_DO_APP);

  // Sem internet e sem cache ainda (primeiro uso, offline): a tela de erro padrão
  // do Chromium é feia e não fala a língua do usuário. Troca por uma mensagem
  // simples, com botão de tentar de novo.
  janela.webContents.on('did-fail-load', (_evento, codigoErro) => {
    // -3 é ERR_ABORTED, que também dispara em navegações normais (ex.: o próprio
    // app trocando de rota); só mostra a tela de erro para falhas de rede de verdade.
    if (codigoErro === -3) return;
    janela.loadFile(path.join(__dirname, 'offline.html'));
  });
}

// A limpeza roda ANTES de criar a janela, senão a página já teria começado a
// carregar do cache velho enquanto o clear acontecia.
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
