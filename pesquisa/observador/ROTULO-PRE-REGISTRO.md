# Pré-registro do rótulo — o que conta como rug

> Versão 1, escrita em 16/09/2026, **antes de qualquer coleta**.
> Decisão do dono do projeto. Eu não escrevo a regra; aqui só registro a que ele fixou.
> Qualquer mudança entra como uma versão nova, datada, e esta continua no arquivo.

## A regra

Um token graduado recebe o rótulo **RUG** se, em até 30 dias depois da graduação,
acontecer pelo menos uma destas duas coisas:

1. **Queda de 99% da liquidez desde o pico.** A liquidez em dólar da pool cai para 1% ou
   menos do maior valor já fotografado daquele token.
2. **Parado por mais de 80% da própria vida.** "Parado" é dia sem negociação registrada.
   A vida é contada da graduação até o dia da avaliação.

Se nenhuma das duas acontecer, o rótulo é **NÃO RUG**.

Origem: é a definição do estudo "Catching the Rug" (arXiv:2608.20271), seção V-B —
o maior conjunto até hoje, 6,4 milhões de tokens da Solana em 7 meses.

## O que vale junto com a regra

- **Fonte única:** liquidez e preço vêm só do GeckoTerminal. Misturar fontes entre a
  referência e o resultado é vazamento.
- **O instante da previsão é o da graduação.** Qualquer previsão usa apenas o que era
  conhecido naquele instante.
- **A população é "tokens que graduaram".** A conclusão não se estende aos tokens que
  nunca graduaram. Graduação é gatilho do evento, nunca filtro aplicado depois.
- **Buraco de coleta não vira rótulo.** Token cujo histórico tenha cobertura abaixo de
  80% no período fica com rótulo **INDEFINIDO** e sai do placar, contado à parte.
- **Nada se apaga.** Token que mudar de rótulo (por exemplo, voltar a negociar) mantém o
  histórico das duas avaliações.

## Placar

Brier e skill score contra a frequência histórica de rug. Nunca acurácia. Medianas,
percentis e bootstrap em blocos; nada de média, variância ou Sharpe.

## Assinatura

Fixado por: dono do projeto (Victor) — 16/09/2026.
Registrado por: Claude Code, sem alterar o conteúdo da regra.
