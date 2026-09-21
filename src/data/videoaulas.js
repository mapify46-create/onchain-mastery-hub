// data/videoaulas.js — os textos comuns a todas as videoaulas do hub.
//
// Cada aula em si (título, arquivo, duração, transcrição) fica no módulo dela,
// no objeto `videos` de src/data/moduloN.js. Aqui ficam só as frases que se
// repetem em toda seção que tem vídeo: o botão, a nota ao lado dele e o aviso
// para navegador que não toca vídeo. A montagem está em src/components/video.js.

export const videoaulas = {
  // O botão fica logo depois da ideia central da seção. O vídeo só aparece
  // quando a pessoa clica; quem quer só ler não vê o player.
  botaoAbrir: 'Assistir a videoaula',
  botaoFechar: 'Fechar a videoaula',

  // Ao lado do botão. Diz as duas coisas que a pessoa precisa saber antes de
  // clicar: o vídeo não é obrigatório, e ele não funciona offline (fica fora
  // do precache do service worker — o texto do módulo funciona).
  nota: 'Opcional: o texto abaixo cobre o mesmo assunto. O vídeo precisa de internet.',

  // Enquanto uma aula não tem transcrição (`transcricao: []`), o player diz isso
  // embaixo do vídeo, em vez de deixar o bloco sem nenhuma versão em texto. Some
  // sozinho quando a transcrição é preenchida. Cada vídeo pode trocar esta frase
  // pela sua, no campo `avisoDeTranscricao`.
  avisoDeTranscricaoPendente:
    'Transcrição em texto: ainda não disponível. O assunto deste vídeo está escrito nesta ' +
    'seção, logo abaixo.',

  // Só aparece em navegador que não consegue tocar o vídeo.
  semSuporte:
    'Seu navegador não consegue reproduzir este vídeo. O assunto dele está escrito nesta seção.',
};
