# Veredito de integração — aula-001 (jhaay, 3h25)

> **DECISÃO: nada deste documento foi para o app.**
>
> A extração de origem afirmou conformidade falsa quatro vezes seguidas e fabricou
> pelo menos um número. Como ninguém assistiu ao vídeo para conferir, não há como
> estimar a taxa de erro do que restou. Ver `README.md` desta pasta.
>
> O que segue abaixo continua útil como **pauta de pesquisa** — a lista do que vale
> investigar em fonte primária. Não é fonte, e nenhuma linha daqui deve ser copiada
> para `src/data/` sem lastro independente.

Cruzamento da extração contra o que já existe em `src/data/`. Decide o que vira
conteúdo do app, o que fica no acervo e o que precisa de verificação antes.

---

## 1. O que esta aula é

Sessão ao vivo de 3h25, não aula. Densidade real em 5 de 14 blocos. Dos 25 números
citados, **3 são regra, 1 é meta, 21 são anedota** — 84%.

O título ("perdi 600 dólares e recuperei em 10 minutos") **não se sustenta**, e a
própria extração demonstra isso na seção 15: nunca houve perda realizada de 600
dólares; houve drawdown em posição aberta que ele se recusou a estopar; e a reversão
veio de fluxo comprador externo, não de nenhuma ação dele. Os valores do título não
aparecem na tela nem são ditos em nenhum momento das 3h25.

**Conclusão:** como método de lucro, a aula não entrega nada. Como material sobre
**triagem, descarte e indisciplina**, entrega bastante.

---

## 2. O achado principal — a contradição do "vamp"

O item mais valioso das 3h25, e não está em nenhuma tabela de critério:

- `[00:49:51]` — ele escreve no próprio bloco de notas, como regra: comprar sempre o
  "vamp", nunca ser o "vamp".
- `[03:08:25]` — duas horas e vinte depois, compra no impulso e leva o despejo.
- `[03:10:40]` — reconhece: operou mal.

Regra formulada por escrito e quebrada pelo autor na mesma sessão, com timestamp dos
dois lados. Isso é a tese do Módulo 2 documentada em uma pessoa: o problema não é
falta de conhecimento, é o comportamento sob pressão.

**Destino:** `src/data/modulo2.js` como card de destaque ou estudo de caso, e
`src/data/modulo4.js` na parte de disciplina. É o melhor conteúdo que saiu da aula.

---

## 3. O que entra

| Item da extração | Destino | Estado |
|---|---|---|
| Erros confessados (seção 11) | `modulo5.js` → `errosComuns` (hoje `[]`) | Pronto, 5 itens aproveitáveis |
| Taxa de transferência abusiva; ordem falha antes de rug; carteira quente segregada (seções 9 e 10) | `modulo5.js` → `checklistExecucao` (hoje `[]`) | Pronto |
| Contradição do "vamp" (seção 16) | `modulo2.js` destaque + `modulo4.js` disciplina | Pronto |
| Playbook `triagem-launchpad-x` (checagem de conta hackeada no X) | `modulo3.js` — pilar social | Pronto, é fluxo real e ancorado |
| "O que ele NÃO checa" dos 7 playbooks | `modulo1.js` / `modulo4.js` — o que falta num método | Pronto, é o melhor campo da seção 5 |
| Cenário de drawdown sem ponto de invalidação | `cenarios.js` (hoje 16 cenários) | Precisa de redesenho — ver seção 5 |
| 4 termos novos de léxico | `glossario.js` (hoje 34 termos) | Ver seção 4 |

**Slots vazios que esta aula preenche:** `modulo5.js` tem `checklistExecucao: []`,
`errosComuns: []` e `tabelaOrdens: { colunas: [], linhas: [] }`. A aula resolve os
dois primeiros. O terceiro ela não toca — ele só usa ordem a mercado.

---

## 4. Léxico — só 4 dos 14 termos são novos

O glossário já tem 34 termos e cobre a maioria: `rug`, `bundle`, `insider`, `migrar`
(como "Graduation / migration"), `tax tokens`, `wallet tracking`, `slippage`,
`priority fee`, `PnL`.

**Entram:**

| Termo | Categoria sugerida | Por que entra |
|---|---|---|
| vamp | `liquidez` | Conceito central da aula e ausente do glossário. Serve para dois sentidos: drenar a atenção/liquidez de outro token, e levar o despejo logo após comprar. |
| cabal / buy a floor | `social` | Grupo fechado que compra piso coordenado e repassa para salas maiores. Diferente de "KOL / call channels", que já existe e é público. |
| round trip | `execucao` | Lucro não realizado que volta a zero. Conceito de gestão de saída que falta no glossário. |
| serial deployer | `seguranca` | Adjacente a "Factory" e "Dev dump", mas distinto: é histórico de carteira como sinal de descarte. |

**Ficam de fora:** `drilled`, `runner`, `DD candle`, `zuking`, `scan`. Gíria sem
conteúdo conceitual — não ensinam nada a um iniciante.

---

## 5. O que NÃO entra — e por quê

A seção 18 da extração ("mapa para o app") sugeriu duas coisas que **prejudicariam**
o app. Registrado aqui para não passar despercebido numa integração futura.

**1. `aula-001-reg-rali-parabolico` como calculadora.** A extração sugeriu uma
calculadora de realização parcial "em múltiplos de capitalização", marcada como não
precisando de verificação. Essa regra tem confiança **Baixa** por decisão da própria
extração: ele executou uma vez, sem enunciar, sob euforia. O nível de 500k MC é
post-hoc — foi onde o token chegou, não onde ele decidiu vender. Virar calculadora
seria o app ensinar um número inventado.

**2. O cenário de simulador como a extração propôs.** Ela sugeriu "usuário sofre
retração de 70% e decide entre cortar ou esperar". Dois problemas: os 70% não existem
em lugar nenhum da aula, e nesta sessão **segurar deu certo — por sorte**. Um cenário
em que "segurar" é premiado ensina exatamente o contrário do Módulo 4.

**Redesenho correto:** o cenário deve ser sobre a ausência de ponto de invalidação. A
decisão de qualidade não é "cortar" nem "segurar" — é ter definido a invalidação antes
de entrar. Sem isso, as duas escolhas são igualmente indisciplinadas, e é isso que o
feedback tem que dizer. Encaixa no formato de `cenarios.js` (`opcoes` com `qualidade`
e `risco` separados) e complementa os 16 existentes, que hoje não cobrem "estou no
vermelho e não defini nada antes".

**3. Todos os níveis de MC da tabela 6-B.** 260k, 400k, 500k, 16k-20k, 50k, 2.5M,
"4 minutos". São descrição do que aconteceu, não critério. Não viram checklist, não
viram filtro, não viram calculadora. A própria extração já os isolou corretamente.

---

## 6. Precisa de verificação antes de publicar

| Afirmação | Como verificar |
|---|---|
| Dev com 40 contratos emitidos = sinal de descarte | Confirmar que a contagem de deploys é visível em ferramenta pública, e se 40 é um patamar com sentido ou número solto daquele caso |
| Taxa de 11% em pool V2 | Confirmar como a taxa de transferência aparece nas ferramentas e qual é o padrão normal — o "11%" é o caso, não o limiar |
| Compra `>= 3 SOL` como sinal de carteira relevante | Sem lastro fora da aula. Provavelmente vira "observar tamanho relativo das compras", sem número |
| Retração `>= 90%` para caçar fundo | Idem — o conceito serve, o número não |

Nenhum dos quatro números entra no app como está. O que entra é o **conceito**; o
número precisa de fonte, conforme a regra do projeto.

---

## 7. Pendências desta aula

- **Timestamps por linha nunca saíram.** Três tentativas. As tabelas das seções 2, 3,
  6, 7, 10, 11, 13, 14 estão sem âncora por linha. As citações e o texto corrido têm
  timestamp e são confiáveis. O mapa cobre o resto — dá para localizar qualquer tema
  pela janela de 15 min.
- **"50 scans em 5 dias"** ficou na tabela 6-A como critério. É descrição de fadiga,
  não critério. Tratar como rotina (seção 12) na hora de integrar.
- **A ambiguidade dos 16k** ficou registrada como `[CONTRADIÇÃO]` e não foi resolvida.
  A citação de `[03:08:53]` sugere que ele comprou achando que era o fundo e caiu
  depois. Não muda nenhuma decisão de integração — só a narrativa do caso.

---

## 8. O que procurar na próxima aula

Esta aula não cobre, e o app precisa:

- Dimensionamento de posição como percentual de banca (ele opera em unidades soltas).
- Definição de ponto de invalidação **antes** de entrar.
- Leitura de contrato em explorador de blocos — mint authority, freeze, blacklist.
  O glossário já tem os termos; falta alguém demonstrando a checagem.
- Configuração explícita de slippage e priority fee com os valores visíveis na tela.
  Isso é o coração do Módulo 5 e nenhuma tela legível apareceu em 3h25.

**Critério para a próxima:** procure aula com tela legível e narração da configuração,
não sessão ao vivo com call. O formato "live com amigos" rende psicologia e triagem,
mas não rende mecânica.
