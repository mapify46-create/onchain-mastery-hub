# Observatório de narrativas — plano do projeto

> Documento vivo. Versão 1, 11/09/2026. Muda conforme as pesquisas da Fase 0 voltarem.

## 1. O que é — e o que não é

**É** um sistema que roda no seu computador e faz três coisas, em camadas:

1. **Observa** sinais sociais (contas grandes no X, canais de Telegram) e on-chain
   (tokens novos, preços, liquidez) e registra tudo com hora exata.
2. **Testa hipóteses sem dinheiro** — paper trading honesto: para cada regra que
   você escrever *antes* de olhar os dados, ele registra o que teria acontecido,
   descontando taxas reais, impacto de preço e o atraso realista de execução.
3. **Mede o mercado** — quantos tokens nascem por dia, quantos graduam, quanto tempo
   vivem, quantos viram zero. Números seus, com metodologia publicada, que podem
   voltar para o hub como conteúdo com fonte.

**Não é** um bot que opera. Nunca terá chave privada, nunca enviará transação, nunca
tocará em dinheiro. E não é um "motor de estratégia": **eu não escrevo a regra de
compra**. As regras testadas são hipóteses que *você* escreve antes de coletar — o
sistema mede se elas teriam funcionado, líquido de custos. Isso não é cautela
genérica: é o limite do que eu sou, e é também o que torna o resultado honesto.

## 2. Por que "além de um bot"

Um bot responde "esse sinal deu lucro?". O observatório responde três perguntas
maiores, e as duas últimas o curso hoje só afirma sem número próprio:

| Pergunta | Quem responde hoje | Quem responderia |
|---|---|---|
| "Sinais de conta grande antecipam alta, líquido de custo?" | ninguém, com dado seu | Camada 2 |
| "Quantos tokens vão a zero, e em quanto tempo?" | o Módulo 2 afirma; fonte de terceiros | Camada 3, medido por você |
| "Uma narrativa nasce como, espalha como, morre como?" | o Módulo 3, em prosa | Camadas 1+3, com linha do tempo real |

O resultado mais provável da camada 2 é confirmar o que o curso diz. **Esse resultado
vale o capital que você não perdeu para descobrir.** E a camada 3 produz o que
nenhum curso de memecoin tem: a taxa de mortalidade medida pelo próprio autor.

## 3. Princípios que não se negociam

- **Zero dinheiro real, zero chave privada.** Se um dia virar outra coisa, é outro projeto.
- **Pré-registro.** Toda hipótese é escrita num arquivo *antes* de olhar os dados,
  com a regra exata, o período e o critério de sucesso. Regra escrita depois de ver o
  resultado não conta — é assim que backtest mente.
- **Custo realista sempre.** As cinco camadas de taxa do Módulo 5, impacto de preço
  por produto constante (`impacto = dx/(X+dx)`) e um atraso simulado de execução
  (o tempo real entre o sinal e a transação entrar no bloco).
- **Nada se apaga.** Sinal que não deu em nada fica registrado. Hipótese que falhou
  fica registrada. É o que separa medição de propaganda.
- **Só dado público, dentro dos termos de uso.** Nada de scraping proibido, nada de
  conta fake, nada de burlar limite.
- **Números só com origem.** Cada número do relatório aponta para o registro que o
  gerou. Mesma regra do `CLAUDE.md`.

## 4. Fases

### Fase 0 — Pesquisa (agora)
Quatro pesquisas em chats separados (ver `PROMPTS-PESQUISA.md`). Elas decidem:
que fontes de dados são viáveis e a que custo; como simular execução de forma
honesta; que números o mercado já tem medidos; e o que é, afinal, o "J7 Tracker".

**Saída:** decisões de fonte de dados e orçamento; a metodologia escrita; e a
lista de números do mercado que já existem com fonte.

### Fase 1 — Coletor on-chain (a base)
Começa pelo que é **grátis, público e verificável**: tokens novos (lançamentos em
launchpad), preço e liquidez ao longo do tempo, graduação, morte. Sem X ainda.

Por que começar aqui: a camada 3 (medir o mercado) já produz valor desde o dia 1,
não depende de API paga, e é o "chão" que a camada 2 precisa — sem histórico de
preço com hora exata, não há como medir "o que teria acontecido".

**Saída:** 30 dias de coleta contínua; primeiro relatório de ciclo de vida.

### Fase 2 — Sinais sociais
Entra o X (se o custo fechar na Fase 0) e/ou Telegram. Cada post passa por um
classificador barato (Haiku ou Mercury 2, testados lado a lado nos seus dados):
"é sobre cripto? qual token? qual contrato?". O sinal é ligado ao token pelo
**endereço de contrato**, nunca pelo nome — o Módulo 5 explica por quê.

**Saída:** feed de sinais com hora exata, ligados a tokens com histórico de preço.

### Fase 3 — Laboratório de hipóteses
Você escreve as hipóteses (pré-registradas). O sistema roda a simulação honesta e
gera relatório semanal: por hipótese, quantas observações, resultado líquido,
intervalo de confiança, e quantas vezes "o token não existia mais 24 h depois".

**Saída:** os seus números. Nenhuma conclusão antes do N mínimo que a pesquisa 3
definir.

### Fase 4 — Devolutiva ao hub
Os números medidos viram conteúdo do hub, com a metodologia publicada e o
observatório como fonte. Candidatos: a taxa de mortalidade real no Módulo 2; uma
seção "de onde nasce uma narrativa" no Módulo 3 com linha do tempo de casos
observados; e, se houver, um "Módulo 6 — O que os dados mostram".

Entra no hub como **dado estático exportado** (JSON), respeitando a regra de sem
backend.

## 5. Arquitetura (esboço, muda com a Fase 0)

- Pasta **`observador/`** separada, como `desktop-app/` — o hub continua estático.
- **Node** com um punhado de pacotes (SQLite, cliente HTTP, agendador). **Toda
  dependência será pedida antes de entrar**, como manda o `CLAUDE.md`.
- **SQLite** local: um arquivo, fácil de copiar, fácil de consultar.
- Chaves de API em `.env`, **nunca** versionadas. Não existe chave de carteira.
- Roda no seu PC (ou num Raspberry/VPS barato se precisar de 24/7 — decisão sua).
- Relatório em **HTML estático** que abre no navegador — mesma linguagem visual do hub.
- Classificador de posts: Haiku e Mercury 2 testados lado a lado; fica o que acertar
  mais nos seus dados. Custo estimado: centavos por dia.

## 6. O que pode matar o projeto

| Risco | Como aparece | O que fazemos |
|---|---|---|
| Custo da API do X | tier útil custa centenas de dólares/mês | Fase 0 decide; Telegram e on-chain seguem sem X |
| Bloqueio no Telegram | conta banida por ler canal com cliente | só Bot API em canal onde o bot está; nada de cliente automatizado |
| Limite de requisições | buracos na coleta de preço | provedor com tier grátis suficiente (pesquisa 2) + fila com retentativa |
| Classificador errando | sinal ligado ao token errado | ligação sempre pelo contrato; amostra revisada à mão toda semana |
| Backtest mentindo | regra "funciona" porque foi escrita depois | pré-registro obrigatório; hipótese sem data de registro não roda |
| Achar que mede vantagem | resultado positivo pequeno tratado como edge | N mínimo e intervalo de confiança antes de qualquer frase |

## 7. Critérios de sucesso

- **Fase 1:** 30 dias sem buraco de coleta; taxa de graduação e tempo até a morte
  medidos, com intervalo de confiança.
- **Fase 3:** cada hipótese só recebe conclusão depois do N mínimo; o relatório
  mostra o resultado *bruto* e o *líquido* lado a lado — a diferença entre os dois
  é a lição.
- **Fase 4:** pelo menos um número do hub passa a ter como fonte "medido pelo
  observatório, metodologia em anexo".

## 8. Decisões que ficam com você

1. **Orçamento mensal** para dados (a pesquisa 1 traz os números).
2. **Quais contas e canais** entram na lista de observação.
3. **Onde roda**: seu PC (para de coletar quando desliga) ou uma máquina 24/7.
4. Se a **Fase 4** entra no hub e em que formato.
