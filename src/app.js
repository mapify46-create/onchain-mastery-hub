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

// Progresso geral mostrado na barra fixa do topo: média dos módulos que já têm
// conteúdo (ver MODULOS_DISPONIVEIS em router.js). Cada módulo vale metade por
// responder o quiz e metade por ser marcado como concluído.
function calcularProgressoGeral(estado) {
  return progressoGeral(MODULOS_DISPONIVEIS, estado);
}

function iniciar() {
  iniciarTema();

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
