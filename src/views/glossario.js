// views/glossario.js — monta a página do Glossário a partir de src/data/glossario.js.
// Sem abas: um mapa dos termos por categoria no topo, e abaixo a busca, o filtro,
// a barra de progresso e a lista, todos vindos do componente montarGlossario
// (src/components/glossary.js).

import { glossario, CATEGORIAS_GLOSSARIO } from '../data/glossario.js';
import { criarElemento, criarTitulo } from '../ui.js';
import { montarGlossario } from '../components/glossary.js';
import { criarMapaMental } from '../components/visuais.js';

// O mapa dos termos: um ramo por categoria, com a contagem no título. Termo que
// pertence a duas categorias aparece nas duas — é informação, não repetição, e o
// próprio ramo diz quantos termos tem.
function criarMapaDoGlossario() {
  const ramos = CATEGORIAS_GLOSSARIO.map((categoria) => {
    const termos = glossario.filter((termo) => termo.categorias.includes(categoria.id));
    return {
      titulo: categoria.nome + ' (' + termos.length + ')',
      folhas: termos.map((termo) => termo.termo),
    };
  }).filter((ramo) => ramo.folhas.length > 0);

  return criarMapaMental({
    titulo: 'Mapa do glossário',
    centro: glossario.length + ' termos, em ' + ramos.length + ' categorias',
    ramos,
    nota: 'Alguns termos aparecem em mais de uma categoria: é o caso de quem cruza segurança com outra área.',
  });
}

export function montarViewGlossario() {
  const cabecalho = criarTitulo('Glossário interativo on-chain', {
    subtitulo:
      'Termos que aparecem o tempo todo em memecoins e no ecossistema on-chain. Busque, ' +
      'filtre por categoria e marque como estudado o que já faz sentido para você.',
  });

  const conteudo = montarGlossario({ termos: glossario, categorias: CATEGORIAS_GLOSSARIO });

  return criarElemento('div', { class: 'mx-auto max-w-5xl' }, [
    cabecalho,
    criarMapaDoGlossario(),
    conteudo,
  ]);
}
