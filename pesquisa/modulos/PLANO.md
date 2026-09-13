# Plano — Módulos 6 e 7, reforma do Módulo 3 e o checklist

> 13/09/2026. Decidido com o dono. Prompts em [`PROMPTS-PESQUISA.md`](PROMPTS-PESQUISA.md);
> resultados em [`pesquisas/`](pesquisas/). **As sete pesquisas voltaram.** Leia primeiro
> [`pesquisas/VERIFICACOES-AO-VIVO.md`](pesquisas/VERIFICACOES-AO-VIVO.md), que corrige
> as pesquisas onde elas erram. Nada foi implementado ainda.

## O que motivou

Três coisas, na ordem em que apareceram:

1. **O glossário tem termos que o hub nunca ensina.** Medido: de 34 termos, **5 não
   aparecem em módulo nenhum** (dev dump, market cap vs. liquidez vs. FDV, metadata
   mutável, PnL, tax token) e **3 aparecem uma única vez** (SPL, KOL/call channels,
   volume falso). Seis dos oito formam um tema só: o que os números da tela escondem.
2. **O Módulo 3 é um catálogo, não uma aula.** Lista 16 ferramentas com "o que faz /
   quando usar / risco" e nunca mostra como usar. É o módulo mais fino do hub.
3. **Falta o produto final:** um fluxograma e um checklist de checagem antes de
   comprar, com os dois pilares.

## As três decisões do dono (12/09/2026)

| Decisão | Escolha |
|---|---|
| O aviso de "não é aconselhamento financeiro" | **Trocar por uma frase curta e honesta**, não remover de vez |
| Onde mora o checklist | **Página própria**, ao lado do Glossário — não enterrado num módulo |
| Ordem de trabalho | **Escrever todos os prompts de pesquisa antes de implementar** |

Modelo das pesquisas: Fable 5.1, esforço `xhigh` (escolha do dono).

## O que vai ser construído

### Página "Checklist" — a peça central
Rota própria (`#/checklist`), ao lado do Glossário. Usa o componente
`src/components/checklist.js`, que já persiste em `localStorage`. Três blocos:

- **Técnico:** concentração dos maiores holders, depois de juntar os bundles · carteiras
  coordenadas no lançamento (bundles) · o criador já vendeu (dev dump) · histórico do
  criador · quais extensões o token tem (Token-2022) · mint authority · freeze authority ·
  LP travada ou queimada · metadata mutável
- **Social:** o endereço veio da fonte oficial · a atenção é real ou fabricada · é call
  pago não declarado · o volume bate com o número de carteiras
- **Decisão:** tese escrita · catálise com prazo · o que invalida · alvos de saída ·
  tamanho definido antes · stop que executa sozinho

**Cada item leva uma cor**, conforme a evidência (ver "A regra das duas cores" abaixo). A
pesquisa 7 resolveu quais itens têm medição e quais são folclore.

Falta resolver no desenho: como zerar o checklist para um token novo (o `localStorage`
guarda por id; um checklist reutilizável precisa de botão de limpar).

### Fluxograma de decisão
Em Mermaid, como o das 4 fases do Módulo 2. De "vi um token" até "não opero" ou
"entrei com tese escrita". A maioria dos caminhos termina em "não opero", porque é o que
o próprio conteúdo do hub mostra.

### Módulo 6 — "Ler a tela"
O que os números dizem e o que escondem. Absorve os seis termos órfãos do glossário como
conteúdo de verdade: market cap × FDV × liquidez, PnL, volume falso, dev dump, metadata
mutável, tax token.

**É também onde a detecção de rug do observatório vai aterrissar** quando a Fase 1
produzir número.

### Módulo 7 — "A rotina"
Do zero ao encerramento. Promove e expande a aba "processo" que já existe no Módulo 5.
Cobre: escrever a regra antes, dimensionar, registrar tudo, revisar.

**Limite mantido:** o módulo ensina a montar e testar a regra; não escreve a regra de
entrada. Não é cautela — é que a regra é o que o observatório existe para medir. Se o
mesmo autor escreve a regra e mede a regra, o resultado não vale nada.

### Módulo 3 reformado
Os dois pilares com mão na massa, seguindo o padrão que **já existe no Módulo 1**
(tutorial clique a clique do Revoke.cash e do Token Approval Checker). Telas reais do
RugCheck, Solscan, Bubblemaps e DexScreener, campo por campo, e o mesmo para o social.

## As sete pesquisas

| # | Pesquisa | Alimenta | Estado em 13/09/2026 |
|---|---|---|---|
| 1 | Os números da tela (market cap, FDV, liquidez, PnL) | Módulo 6 | **completa** — TL;DR e taxa da PumpSwap corrigidos em `P1-numeros-da-tela-CORRECAO.md` (conferido) |
| 2 | Volume falso, wash trading e bundles | Módulo 6 | **completa** — correção em `P2-volume-falso-e-bundles-CORRECAO.md`; **cuidado:** ela chama de implausível a faixa de graduação que está no app, e erra nisso (ver verificações) |
| 3 | Dev dump, metadata mutável, tax token | Módulo 6 | **completa** — Token-2022 corrigido em `P3-vetores-de-contrato-CORRECAO.md`, com a data oficial do `create_v2` (12/11/2025) |
| 4 | As quatro ferramentas, tela por tela | Módulo 3 | **documentação completa** em `P4-ferramentas-DOCUMENTACAO.md`; falta conferir as telas ao vivo aqui |
| 5 | O pilar social na prática | Módulo 3 | **completa** |
| 6 | Rotina, registro e tamanho de posição | Módulo 7 | **completa** — `P6-rotina-e-tamanho-de-posicao-v2.md` fecha o diário em 9 campos |
| 7 | Que sinais têm evidência publicada | Checklist | **completa** — `P7-sinais-com-evidencia.md` |

## O que as pesquisas já mudaram no desenho

### Checklist — a regra das duas cores (pesquisa 7)

| Cor | Sinais | Por quê |
|---|---|---|
| **Verde — medido** | concentração dos holders depois de juntar os bundles · carteiras coordenadas no lançamento · negociação artificial (wash trading) · criador com histórico de tokens mortos (medido fora do pump.fun) · número baixo de holders (medido de forma indireta) | Estudos independentes, em redes diferentes, apontam para a mesma família: **quem controla o token no minuto zero, e como disfarça isso** |
| **Amarelo — folclore ou só indústria** | mint authority · freeze authority · metadata mutável · ausência de redes sociais · dev dump · extensão Token-2022 fora do padrão | Sem medição revisada por pares como preditor. As extensões têm fonte de indústria (RugCheck, PeckShield), não acadêmica |
| **Problemático** | volume alto com poucas carteiras (já é contornado de propósito) · LP travada (a medição não mostra proteção) | Ver os dois pontos abaixo |

- **Nenhum item verde aprova um token sozinho.** Todos já são contornados de propósito:
  bundles escondidos com carteiras intermediárias, contagem de holders inflada por bots,
  volume espalhado em 100+ carteiras.
- **LP travada não diferencia.** Pelos próprios números da pesquisa 7 (Mazorra et al.,
  revisado por pares, Uniswap V2): dos tokens com trava da Unicrypt, 97,3% eram
  maliciosos, contra 97,7% no conjunto inteiro. A trava não protege — mas também não
  indica rug; ela simplesmente não separa um token do outro.
- **No pump.fun, três itens não discriminam nada:** mint e freeze authority vêm nulas em
  todo token, e a pool pós-graduação é do protocolo. O rug que sobra lá é o criador
  vender e a concentração de insiders — justamente onde a evidência revisada por pares é
  mais fraca.
- **Qualquer extensão Token-2022 além de `metadataPointer` + `tokenMetadata` num token do
  pump.fun é anomalia forte** (0 de 24 na verificação de 12/09/2026).
- **Nenhum detector automático serve de veredito.** O melhor modelo publicado (F1 0,7885)
  perde para o chute "tudo é rug" (F1 ≈ 0,90) no teste do PumpFun, onde 81,9% dos tokens
  deram rug. No máximo, pré-filtro.

### Checklist — bloco social
- **"O endereço veio da fonte oficial?"** é a checagem que sozinha evita perda total
  (pesquisa 5). Regra de decisão: site oficial e post fixado do X têm que bater; **fontes
  divergem = não compra**.
- "O volume bate com o número de carteiras?" entra como **triagem, não veredito**: quem
  vende volume falso publica que distribui em mais de 100 carteiras justamente porque as
  pessoas olham essa razão (pesquisa 2). Nenhuma razão tem limiar publicado.
- "É call pago?" ganha número: depois de tweets de influenciadores, **−6,53% em 30 dias**
  em média (Merkley et al., *Review of Accounting Studies*, 2024 — pesquisa 5).

### Checklist — bloco de decisão
- "Tamanho definido antes" se apoia em **sobrevivência**, não em fórmula: sob cauda
  pesada o critério de Kelly não existe (precisa de variância finita) e a literatura não
  resolve o tamanho ótimo. O tamanho é o que se pode perder inteiro (pesquisa 6).
- **Stop que executa sozinho reduz o viés de segurar perdedor; lembrete não**
  (Fischbacher, Hoffmann & Schudy, *Review of Financial Studies*, 2017 — pesquisa 6).

### Módulo 6 — "Ler a tela"
- A tabela "quanto dá para vender": derrubando o preço em 10%, 30% e 50%, você tira
  **2,57%, 8,17% e 14,64%** da liquidez anunciada (pesquisa 1, conta refeita e corrigida).
- A taxa da PumpSwap cai de **1,25% a 0,30%** conforme o market cap, e a própria pump.fun
  calcula esse market cap como **preço × 1 bilhão** — o mesmo cálculo do FDV (pesquisa 1,
  conferido na página oficial).
- **Fabricar US$ 1 milhão de volume custa ~US$ 13 mil num token grande e ~US$ 23 mil num
  recém-graduado** (taxa da pool + 1% do serviço). Ironia que vira aula: a manipulação sai
  mais cara justo onde ela é mais usada (pesquisa 2, correção).
- Três armadilhas de tela: o preço com zeros compactados (`$0.0₅2786` lido como texto vira
  "$0.052786", ~19 mil vezes mais); o "Authority" do Solscan, que junta três autoridades
  num menu só; e o "Market Cap" do Solscan, que a documentação dele define como
  **totalmente diluído** (pesquisa 4).
- **Todo sinal público é otimizado contra** (pesquisas 2 e 7) — a espinha do módulo.
- O filtro revisado por pares do Midsummer (volume +500% com preço variando menos de 5%)
  dá para **aproximar** de graça; o "volume circular ≥ 99%", que fecha o diagnóstico,
  **não** dá.

### Módulo 7 — "A rotina"
- As duas frases lado a lado: **"o registro ajuda a seguir a sua regra"** tem lastro
  (Harkin et al., *Psychological Bulletin*, 2016, d = 0,40); **"o registro faz ganhar
  dinheiro"** não foi medido por ninguém.
- **O diário tem 9 campos**, e o 7º é o que faz o resto funcionar: **"saída executada"**
  (data, preço e o gatilho real). Com ele, "segui a regra?" deixa de ser lembrança e passa
  a ser comparação entre o plano e o que aconteceu (pesquisa 6, v2).
- O diário separa **comportamento** (revisar com frequência) de **resultado** (P&L, olhar
  com pouca frequência — olhar o dinheiro toda hora piora a decisão).
- Dado brasileiro: dos day traders da B3 que persistiram mais de 300 dias, **97%
  perderam dinheiro**, sem evidência de aprendizado (Chague, De-Losso & Giovannetti, FGV,
  *working paper* — não revisado por pares).
- Catálogo pronto de estatísticas falsas de trading ("23% em 60 dias", "estudo da
  Universidade da Califórnia / 73%", "90-90-90"), cada uma com a fonte real que diz outra
  coisa.
- Honestidade estatística: com cauda pesada e média não definida, **nenhum número de
  operações prova habilidade**; mesmo no caso bem-comportado, são 400 a 1.600.

### Módulo 3 reformado
- O pilar social de graça e dentro das regras é **manual**. Única exceção automática e
  legítima: seguir o canal de anúncios de um servidor do Discord (pesquisa 5).
- Golpes de Discord com roteiro e ponto de defesa (bot falso de verificação, servidor
  falso, DM de "suporte") — o Inferno Drainer vitimou mais de 30 mil carteiras (Check
  Point Research, 2025).
- Rotina de 5 minutos, numerada, pronta (pesquisa 5, seção 6).
- **O que cada ferramenta documenta (pesquisa 4):** no RugCheck, score maior = risco maior,
  mas a fórmula não é publicada, e as "Insider networks" levantam hipótese de controle
  comum, não provam. No Solscan, o preço só aparece se o token estiver na CoinGecko. No
  Bubblemaps, o grátis mostra os 250 maiores holders, e o token BMT libera os 1.000
  maiores, cálculo de P&L e IA; cluster sugere, não prova. No DexScreener, FDV = (supply
  total − queimado) × preço, e "Traders", "Buyers/Sellers" e "Audit" **não têm definição
  oficial**.

## Restrições que o desenho tem de respeitar

- **Não renumerar módulo.** O progresso é salvo no `localStorage` por id de texto
  (`'modulo-1'`, `'modulo-2'`…). Renumerar faria todo mundo que já usa o app perder o
  progresso em silêncio — inclusive quem baixou o `.exe`. O M3 cresce no lugar; o que é
  novo entra como 6 e 7.
- **Números só com fonte.** Isso NÃO muda com a troca do aviso: a regra é sobre
  exatidão, não sobre responsabilidade legal.
- **Conferir na cadeia antes de publicar fato de mercado.** O pump.fun passou a criar
  tokens em Token-2022, e uma pesquisa descreveu o estado antigo como se fosse o atual.
- **Mockup em SVG, nunca print** — mesmo para as telas das ferramentas da Pesquisa 4.
- Cada aba segue o arco de quatro tempos: gancho → explicação → visual → ferramenta.

## Custo de acrescentar um módulo

`src/data/moduloN.js` + `src/views/moduloN.js` + um bloco no `router.js` + duas linhas
no `service-worker.js` + `CACHE_VERSAO` novo + regerar os prompts de vídeo
(`node scripts/gerar-prompts-de-video.mjs`).

## Onde o aviso aparece hoje (12 lugares)

`index.html` (meta description e rodapé) · `src/components/sidebar.js:163` ·
`src/views/inicio.js:180` · rodapé de cada uma das cinco views de módulo ·
`src/data/modulo4.js:236` (tributário — este fica, é outra coisa) · `README.md`.
