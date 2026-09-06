// app.js — ponto de entrada do hub.
// Ordem de boot: tema dark -> store (progresso salvo) -> sidebar -> router.

import { iniciarStore, assinar, progressoGeral } from './store.js';
import { iniciarRouter, MODULOS_DISPONIVEIS } from './router.js';
import { montarSidebar } from './components/sidebar.js';
import { atualizarProgressoGlobal } from './ui.js';

// Dark mode é o único tema do projeto: garantimos a classe mesmo que o HTML mude.
function iniciarTema() {
  document.documentElement.classList.add('dark');
  document.documentElement.style.colorScheme = 'dark';
}

// Registra o service worker (ver service-worker.js na raiz) — é o que permite
// "Instalar app" e abrir offline depois da primeira visita. Roda em segundo
// plano, sem atrasar o boot: se falhar (navegador antigo, arquivo ausente no
// servidor), o app funciona normalmente do mesmo jeito, só sem o recurso extra.
function iniciarServiceWorker() {
  if (!('serviceWorker' in navigator)) return;

  const registrar = () => {
    navigator.serviceWorker
      .register('./service-worker.js')
      .catch((erro) => console.warn('[app] service worker não registrou:', erro));
  };

  // Não basta esperar o "load": numa página pequena como esta, ele pode disparar
  // ANTES deste código rodar (o script é type="module", que executa um pouco
  // depois do parse do HTML) — e um evento que já passou nunca mais dispara de
  // novo, deixando o service worker sem registrar para sempre. Por isso primeiro
  // checamos se já está "complete"; só esperamos o evento se ainda não estiver.
  if (document.readyState === 'complete') registrar();
  else window.addEventListener('load', registrar);
}

// Progresso geral mostrado na barra fixa do topo: média dos módulos que já têm
// conteúdo (ver MODULOS_DISPONIVEIS em router.js). Cada módulo vale metade por
// responder o quiz e metade por ser marcado como concluído.
function calcularProgressoGeral(estado) {
  return progressoGeral(MODULOS_DISPONIVEIS, estado);
}

function iniciar() {
  iniciarTema();
  iniciarServiceWorker();

  const estado = iniciarStore();
  atualizarProgressoGlobal(calcularProgressoGeral(estado));

  // A barra do topo acompanha qualquer mudança de progresso.
  assinar((novoEstado) => atualizarProgressoGlobal(calcularProgressoGeral(novoEstado)));

  // A sidebar antes do router: ela assina a troca de rota e precisa estar
  // escutando quando o primeiro render acontecer, para marcar o item ativo.
  montarSidebar();
  iniciarRouter();
}

// O script é type="module", então já roda depois do parse do HTML;
// o defer implícito dispensa esperar o DOMContentLoaded.
iniciar();
