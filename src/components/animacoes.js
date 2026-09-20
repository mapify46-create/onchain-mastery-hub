// animacoes.js — a porta de entrada das animações do hub.
//
// As views importam daqui (import { criarAnimacaoPool } from '../components/animacoes.js').
// O código mora na pasta animacoes/:
//   - animacoes/motor.js          o motor (criarAnimacao) e os utilitários comuns;
//   - animacoes/pool.js           Animação 1 · Pool x·y = k (Módulo 6);
//   - animacoes/drainer.js        Animação 2 · Drainer (Módulo 1);
//   - animacoes/sanduiche.js      Animação 3 · Sandwich (Módulo 5);
//   - animacoes/caminho-do-token.js  Animação 4 · Caminho do token (Módulo 5);
//   - animacoes/narrativa.js      Animação 5 · Vida de uma narrativa (Módulo 3);
//   - animacoes/envenenamento.js  Animação 6 · Address poisoning (Módulo 1).
//
// Este arquivo só repassa (reexporta) o que está lá. Os palcos importam o motor;
// o motor não importa os palcos. Assim não há import em círculo.

export * from './animacoes/motor.js';
export { criarAnimacaoPool } from './animacoes/pool.js';
export { criarAnimacaoDrainer } from './animacoes/drainer.js';
export { criarAnimacaoSanduiche } from './animacoes/sanduiche.js';
export { criarAnimacaoCaminhoDoToken } from './animacoes/caminho-do-token.js';
export { criarAnimacaoNarrativa } from './animacoes/narrativa.js';
export { criarAnimacaoEnvenenamento } from './animacoes/envenenamento.js';
