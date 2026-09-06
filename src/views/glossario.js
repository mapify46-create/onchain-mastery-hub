// views/glossario.js — monta a página do Glossário a partir de src/data/glossario.js.
// Sem abas: busca, filtro, barra de progresso e a lista de termos vêm todos do
// componente montarGlossario (src/components/glossary.js).

import { glossario, CATEGORIAS_GLOSSARIO } from '../data/glossario.js';
import { criarElemento, criarTitulo } from '../ui.js';
import { montarGlossario } from '../components/glossary.js';

export function montarViewGlossario() {
  const cabecalho = criarTitulo('Glossário interativo on-chain', {
    subtitulo:
      'Termos que aparecem o tempo todo em memecoins e no ecossistema on-chain. Busque, ' +
      'filtre por categoria e marque como estudado o que já faz sentido para você.',
  });

  const conteudo = montarGlossario({ termos: glossario, categorias: CATEGORIAS_GLOSSARIO });

  return criarElemento('div', { class: 'mx-auto max-w-5xl' }, [cabecalho, conteudo]);
}
