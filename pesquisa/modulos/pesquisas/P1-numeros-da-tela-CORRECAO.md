# Pesquisa 1 — correção do TL;DR e da seção 2.4

> Resposta do chat da pesquisa 1 ao pedido de correção, recebida em 13/09/2026.
> **Substitui** o TL;DR e a seção 2.4 de `P1-numeros-da-tela.md`, que fica guardado como
> veio. O resto do documento original continua valendo.

## Conferência feita aqui (13/09/2026)

- **As contas batem.** Refeitas: 5,41% / 2,57% (queda de 10%), 19,52% / 8,17% (30%),
  41,42% / 14,64% (50%). No exemplo da CATE: 6.125,5091 ÷ 18.576.554 = 0,00032974 SOL por
  CATE, × 1 bilhão = 329.743 SOL de market cap → faixa de 0,300% → líquidos de 313,5 /
  997,5 / 1.788,7 SOL.
- **Confirmado na página oficial** (`pump.fun/docs/fees`, "Last Updated: 20 May 2026",
  relida em 13/09/2026), com as frases literais:
  - *"The market cap is calculated as the current price of the token in SOL or USDC
    multiplied by 1 billion tokens."*
  - *"As of May 21, 2026, token creators can use USDC as the paired token for their
    launched token instead of SOL."*
  - *"The pump.fun platform may change these fees at any time, without notice."*
  - *"Although these fees are displayed by the pump.fun web or mobile app as accurately
    as possible, there is no guarantee that the transaction fee(s) listed in the web or
    mobile app will exactly match those charged by the smart contract."*
- **As 25 faixas em SOL** batem linha a linha com uma leitura independente da página feita
  em 12/09/2026.
- **Duas ressalvas:**
  - A frase do +0,1% na página é *"Some users may experience fee increases of up to .1%
    on certain transactions."* — nesse trecho ela **não** diz que é no app de celular, como
    a correção afirma.
  - **Número de faixas em USDC: NÃO VERIFICADO.** A correção diz 30; duas leituras
    automáticas da página deram 31 e 20. Contagem automática não é confiável nessa página
    (uma delas contou 32 linhas na tabela em SOL, que tem 25 listadas linha a linha). As
    pontas batem nas três leituras: 1,250% de 0 a 59.000 USDC e 0,300% acima de 20.000.000
    USDC. Nenhuma conta do hub depende desse número.

---

## TL;DR (corrigido em 12/09/2026)

- **Market cap e FDV divergem principalmente por uma coisa: qual "supply" cada site multiplica pelo preço.** Num token pump.fun com 1 bilhão de tokens todos emitidos no lançamento, o FDV = preço × 1 bilhão. O "market cap" só difere quando o site usa um *circulante* menor (supply auto-reportado ou vindo da CoinGecko). Na prática, para o token **na curva** o GeckoTerminal e o DexScreener **não separam** market cap de FDV — a API do GeckoTerminal devolve `market_cap_usd: null` e o DexScreener devolve `marketCap == fdv`. Confirmei isso ao vivo com dois tokens (seção 4).
- **A liquidez que a tela mostra (ex.: `reserve_in_usd` do GeckoTerminal) é o valor total dos dois lados da pool, não o dinheiro que dá para sacar.** Numa pool de produto constante (x·y=k), você só consegue tirar uma fração dela antes de derrubar o preço: para cair **10%** você vende ≈5,41% dos tokens da reserva e recebe ≈**2,57% da liquidez total**; para cair **30%**, vende ≈19,52% e recebe ≈**8,17%**; para cair **50%**, vende ≈41,42% e recebe ≈**14,64%**. A conta está derivada e resolvida passo a passo na seção 2 (tabela 2.2 e exemplo 2.3).
- **O PnL "não realizado" que o terminal mostra é preço atual × tokens que você tem — não desconta o impacto de preço da sua própria venda nem, na maioria dos casos, as taxas.** Axiom documenta que o PnL de posição usa "preço médio de entrada"; GMGN documenta realizado vs. não realizado e que "os dados de preço podem ser imprecisos ou atrasados". Para memecoin de baixa liquidez, o número verde da tela quase nunca é o que entra na carteira — é preciso casar com a tabela da seção 2.

---

### 2.4 Efeito da taxa da pool (corrigido em 12/09/2026)

A taxa de negociação é uma fatia percentual do trade que a pool retém antes de o dinheiro "trabalhar" na conta x·y=k. Onde a documentação descreve o ponto exato da cobrança, a taxa sai do valor que entra na pool: a Raydium (CPMM) usa "All rate fields use a denominator of 1,000,000... 2500 means 0.25%" e deduz do input (docs.raydium.io/.../how-to-set-cpmm-fees, **só snippet**, 12/09/2026); a Uniswap v2 aplica 0,3% como `(x1 − 0,003·xin)` antes do invariante (app.uniswap.org/whitepaper.pdf, **só snippet**, 12/09/2026).

**PumpSwap (a pool para onde o token pump.fun migra ao graduar) — página oficial aberta.** A página pump.fun/docs/fees ("Last Updated: 20 May 2026", **página aberta**, 12/09/2026) **não** cobra 0,30% fixo. Ela cobra uma **escala por market cap** na "pool canônica" (a pool criada automaticamente na graduação), e define esse market cap como "the current price of the token in SOL or USDC multiplied by 1 billion tokens" — ou seja, o próprio contrato usa a base de 1 bilhão, o mesmo cálculo do FDV da seção 1.2, e não um circulante.

Escala completa para tokens pareados em SOL (copiada da página oficial, **página aberta**, 12/09/2026):

| Market cap (SOL) | Criador | Protocolo | LP | Total |
|---|---|---|---|---|
| 0 – 420 | 0,300% | 0,930% | 0,020% | **1,250%** |
| 420 – 1.470 | 0,950% | 0,050% | 0,200% | 1,200% |
| 1.470 – 2.460 | 0,900% | 0,050% | 0,200% | 1,150% |
| 2.460 – 3.440 | 0,850% | 0,050% | 0,200% | 1,100% |
| 3.440 – 4.420 | 0,800% | 0,050% | 0,200% | 1,050% |
| 4.420 – 9.820 | 0,750% | 0,050% | 0,200% | 1,000% |
| 9.820 – 14.740 | 0,700% | 0,050% | 0,200% | 0,950% |
| 14.740 – 19.650 | 0,650% | 0,050% | 0,200% | 0,900% |
| 19.650 – 24.560 | 0,600% | 0,050% | 0,200% | 0,850% |
| 24.560 – 29.470 | 0,550% | 0,050% | 0,200% | 0,800% |
| 29.470 – 34.380 | 0,500% | 0,050% | 0,200% | 0,750% |
| 34.380 – 39.300 | 0,450% | 0,050% | 0,200% | 0,700% |
| 39.300 – 44.210 | 0,400% | 0,050% | 0,200% | 0,650% |
| 44.210 – 49.120 | 0,350% | 0,050% | 0,200% | 0,600% |
| 49.120 – 54.030 | 0,300% | 0,050% | 0,200% | 0,550% |
| 54.030 – 58.940 | 0,275% | 0,050% | 0,200% | 0,525% |
| 58.940 – 63.860 | 0,250% | 0,050% | 0,200% | 0,500% |
| 63.860 – 68.770 | 0,225% | 0,050% | 0,200% | 0,475% |
| 68.770 – 73.681 | 0,200% | 0,050% | 0,200% | 0,450% |
| 73.681 – 78.590 | 0,175% | 0,050% | 0,200% | 0,425% |
| 78.590 – 83.500 | 0,150% | 0,050% | 0,200% | 0,400% |
| 83.500 – 88.400 | 0,125% | 0,050% | 0,200% | 0,375% |
| 88.400 – 93.330 | 0,100% | 0,050% | 0,200% | 0,350% |
| 93.330 – 98.240 | 0,075% | 0,050% | 0,200% | 0,325% |
| 98.240 e acima | 0,050% | 0,050% | 0,200% | **0,300%** |

Como ler a escala: a partir de 420 SOL, protocolo (0,050%) e LP (0,200%) ficam fixos e só a fatia do criador cai, de 0,950% até 0,050%. Os 0,30% que a versão anterior citava (via HackMD, corroboração fraca) são **só a última faixa**; essa citação fica substituída pela página oficial.

Tokens pareados em **USDC** (permitido desde 21/05/2026, segundo a mesma página) têm escala própria de 30 faixas, de 1,250% (0 – 59.000 USDC) até 0,300% (20.000.000 USDC e acima); a tabela inteira está na página (pump.fun/docs/fees, **página aberta**, 12/09/2026).

**Pools não canônicas** do PumpSwap (qualquer pool que não seja a criada na graduação): 0% criador / 0,05% protocolo / 0,25% LP = **0,3% total** (pump.fun/docs/fees, **página aberta**, 12/09/2026).

**Taxa da bonding curve** (token ainda não graduado), na mesma página oficial: 0,300% criador / 0,95% protocolo / 0% LP = **1,25% total**, para tokens em SOL e em USDC (pump.fun/docs/fees, **página aberta**, 12/09/2026). Isso confirma na fonte oficial a divisão que a seção 1.3 tinha marcado como corroboração fraca. A página lista ainda 0 SOL para criar um token e 0,015 SOL cobrados na graduação.

Ressalvas da própria página: o pump.fun "may change these fees at any time, without notice"; o valor exibido no app pode não bater exatamente com o cobrado pelo contrato; e alguns usuários do app mobile podem pagar até 0,1% a mais (pump.fun/docs/fees, **página aberta**, 12/09/2026). **NÃO VERIFICADO:** a página não diz se a taxa do PumpSwap é descontada do que entra na pool (como Raydium e Uniswap v2) ou do que sai; no exemplo abaixo, desconto do valor recebido.

**Exemplo resolvido — a pool CATE/SOL da seção 2.3.** A pool `HMzvs...` é a canônica (a API do GeckoTerminal registrou a migração da curva para ela, seção 4). Preço em SOL = 6.125,5091 SOL ÷ 18.576.554 CATE = 0,00032974 SOL/CATE. Market cap para a escala = 0,00032974 × 1.000.000.000 = **329.740 SOL** → faixa "98.240 SOL e acima" → taxa total **0,300%**. Aplicando sobre o SOL bruto da seção 2.3:

| Queda de preço | SOL bruto (seção 2.3) | Líquido com 0,300% (faixa da CATE) | Líquido se estivesse na 1ª faixa (1,250%) |
|---|---|---|---|
| 10% | 314,4 | 314,4 × 0,997 = **313,5** | 314,4 × 0,9875 = 310,5 |
| 30% | 1.000,5 | 1.000,5 × 0,997 = **997,5** | 1.000,5 × 0,9875 = 988,0 |
| 50% | 1.794,1 | 1.794,1 × 0,997 = **1.788,7** | 1.794,1 × 0,9875 = 1.771,7 |

Para comparação com outras pools: com os 0,25% da Raydium, a venda de 30% renderia 1.000,5 × 0,9975 = 998,0 SOL; com os 1,25% da bonding curve (token ainda não graduado), 988,0 SOL. Em todos os casos a taxa muda o resultado em unidades de porcento — o que decide se dá para sair continua sendo o impacto de preço da tabela 2.2, que chega a dezenas de porcento.

Observação lateral: a seção 2.3 cita "preço ≈ 0,0003313 SOL/CATE"; a razão das reservas dá 0,00032974. Nenhuma conta da 2.3 usa esse número (todas partem de y = 6.125,5091 SOL diretamente), mas vale trocar o texto.

---

## Mudança na lista de fontes

Acrescentar "pump.fun/docs/fees — escala de taxas por market cap (PumpSwap canônica), pools não canônicas, taxa da curva, 'Last Updated: 20 May 2026' — **(página aberta)**, 12/09/2026" e remover a entrada do HackMD.
