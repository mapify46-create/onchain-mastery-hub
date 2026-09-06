// instalarApp.js — botão "Instalar app" na sidebar, em vez de depender do menu
// escondido de cada navegador (no Opera, por exemplo, fica bem difícil de achar).
//
// O evento beforeinstallprompt é capturado o mais cedo possível em index.html
// (antes de qualquer módulo carregar) e guardado em window.__omhInstallPrompt —
// ver o comentário lá para o porquê. Este componente só lê o que já foi guardado
// e escuta os eventos customizados para quando o navegador dispara depois do
// componente já ter montado.
//
// Safari (iPhone/iPad/Mac) não tem essa API: lá mostramos uma instrução em texto,
// porque não existe jeito de disparar a instalação por código.

import { criarElemento, criarBotao } from '../ui.js';

// iPad em "modo desktop" se identifica como Mac, mas com tela sensível ao toque —
// por isso o maxTouchPoints entra na conta, além do sniff clássico de iPhone/iPad.
function ehIOS() {
  const agenteDoUsuario = navigator.userAgent;
  const iphoneOuIpad = /iPad|iPhone|iPod/.test(agenteDoUsuario);
  const ipadEmModoDesktop = navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;
  return iphoneOuIpad || ipadEmModoDesktop;
}

// Já rodando como app instalado (aberto pelo ícone, não pelo navegador)? Então
// não há nada para oferecer.
function jaInstalado() {
  return window.matchMedia('(display-mode: standalone)').matches;
}

export function montarBotaoInstalar() {
  if (jaInstalado()) return null;

  const container = criarElemento('div', { class: 'mb-3' });

  if (ehIOS()) {
    // Sem API para programar: só a instrução manual mesmo.
    container.append(
      criarElemento('p', { class: 'rounded-lg border border-borda bg-fundo p-3 text-xs text-texto-suave' }, [
        criarElemento('strong', { class: 'text-texto' }, ['Instalar no iPhone/iPad: ']),
        'toque em Compartilhar (o quadrado com a seta) e depois em "Adicionar à Tela de Início".',
      ]),
    );
    return container;
  }

  const botao = criarBotao('Instalar app', {
    variante: 'primario',
    class: 'w-full',
    hidden: true,
    onclick: async () => {
      const evento = window.__omhInstallPrompt;
      if (!evento) return;

      botao.disabled = true;
      evento.prompt();
      // O navegador só permite usar cada convite uma vez, aceito ou não —
      // por isso o botão some nos dois casos.
      await evento.userChoice;
      window.__omhInstallPrompt = null;
      botao.hidden = true;
    },
  });

  function mostrarSeDisponivel() {
    if (window.__omhInstallPrompt) botao.hidden = false;
  }

  // O evento pode já ter disparado antes deste componente montar (mesma lição
  // do service worker: nunca confiar só em "vou escutar a partir de agora").
  mostrarSeDisponivel();
  window.addEventListener('omh:install-disponivel', mostrarSeDisponivel);
  window.addEventListener('omh:install-concluido', () => {
    botao.hidden = true;
  });

  container.append(botao);
  return container;
}
