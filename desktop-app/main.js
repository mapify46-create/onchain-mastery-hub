// main.js — processo principal do Electron.
//
// De propósito, esta janela carrega o site JÁ PUBLICADO no GitHub Pages, em vez
// de empacotar uma cópia dos arquivos aqui dentro. Isso significa que qualquer
// atualização feita no site (novo módulo, correção, etc.) aparece automaticamente
// para quem já tem o app instalado — sem precisar gerar um instalador novo a
// cada mudança. O service worker do próprio site (ver ../service-worker.js) cuida
// de deixar isso funcionando offline depois da primeira visita, porque o Electron
// usa o mesmo motor Chromium por baixo dos panos.

const { app, BrowserWindow } = require('electron');
const path = require('path');

const URL_DO_APP = 'https://mapify46-create.github.io/onchain-mastery-hub/';

function criarJanela() {
  const janela = new BrowserWindow({
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

app.whenReady().then(criarJanela);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) criarJanela();
});
