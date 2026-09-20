// views/glossario.js — monta a página do Glossário a partir de src/data/glossario.js,
// na ordem do desenho (32 Glossario): cabeçalho → contador → mapa dos termos →
// busca e filtro → estado vazio → cards. Tudo abaixo do cabeçalho vem do
// componente montarGlossario (src/components/glossary.js), porque o mapa, os
// chips e a lista dividem o mesmo estado (categoria escolhida e termos estudados).
// O aviso âmbar do fim da página é posto pelo router.js.

import { glossario, CATEGORIAS_GLOSSARIO, TEXTOS_GLOSSARIO } from '../data/glossario.js';
import { criarElemento, criarTitulo } from '../ui.js';
import { montarGlossario } from '../components/glossary.js';

export function montarViewGlossario() {
  // Micro-rótulo "34 TERMOS" (o número sai dos dados), h1 e subtítulo.
  const cabecalho = criarTitulo(TEXTOS_GLOSSARIO.titulo, {
    rotulo: glossario.length + ' termos',
    subtitulo: TEXTOS_GLOSSARIO.subtitulo,
  });

  const conteudo = montarGlossario({
    termos: glossario,
    categorias: CATEGORIAS_GLOSSARIO,
    textos: TEXTOS_GLOSSARIO,
  });

  // 24px entre o cabeçalho e o resto, como a coluna do desenho.
  return criarElemento('div', { class: 'space-y-6' }, [cabecalho, conteudo]);
}
