# Rastreador de narrativas no Telegram — plano revisado

Status: proposta, não aprovada. Nenhum código escrito. Escrito em 14/09/2026.

## Objetivo

Não é um "leitor de mensagens" e não é um previsor de preço. É um **medidor de atenção**:
registrar, com horário exato, **onde** um token ou uma narrativa aparece primeiro, **por onde se
espalha**, **em quanto tempo** e **quando satura**. O próprio Módulo 3 diz que reconhecer a
narrativa não prevê o preço sozinho. Então o sistema mede, e a regra de decisão fica com o dono.

## Regras que valem aqui (do ESTADO.md e do CLAUDE.md)

1. Zero dinheiro real, zero chave privada.
2. Nada se apaga: todo evento bruto fica guardado.
3. O sistema **não** escreve regra de decisão nem score com pesos. O dono escreve e
   pré-registra antes de ver os dados.
4. Dependência nova só com autorização explícita.
5. Número ou comportamento de API só com fonte conferida.
6. Sem perfil de pessoas: guardar canal e mensagem, não quem escreveu (LGPD).

## O que rastrear

| Dado | Fase 1 (canais públicos, sem login) | Fase 2 (conta separada, só se aprovada) |
|---|---|---|
| Mensagem nova | ✅ a cada 1–2 min | ✅ em tempo real |
| Texto completo | ✅ | ✅ |
| Data/hora exata | ✅ | ✅ |
| Canal | ✅ | ✅ |
| ID da mensagem | ✅ | ✅ |
| Links | ✅ | ✅ |
| @canais citados | ✅ | ✅ |
| Contratos (Solana, EVM) | ✅ | ✅ |
| $TICKER | ✅ | ✅ |
| Visualizações | ✅ se a página pública mostrar (conferir) | ✅ |
| Mensagem encaminhada de outro canal | ✅ se a página mostrar (conferir) | ✅ |
| Mensagem editada | ⚠️ só percebe se comparar leituras | ✅ (conferir na documentação) |
| Mensagem apagada | ⚠️ só percebe se sumir entre leituras | ✅ (conferir na documentação) |
| Histórico recente (backfill) | ✅ rolando a página pública | ✅ |
| Grupos privados | ❌ | ✅ só com acesso da conta |
| Autor / remetente | ❌ não guardar | ❌ não guardar (só "é o dono do canal" ou não) |
| Novos membros | ❌ | ❌ não guardar |
| Imagens/vídeos | ❌ só o link | opcional |

Calculado a partir dos dados brutos (sem pesos, só contagem):

- **first_seen**: primeiro canal e horário em que um contrato ou ticker apareceu.
- **Propagação**: ordem dos canais e tempo até o 2º, 5º e 10º canal.
- **Duplicação**: mesma mensagem (ou quase) em vários canais, com o horário de cada uma.
- **Esteira**: tokens diferentes que aparecem ligados à mesma palavra de narrativa depois
  do primeiro.
- **Curva de atenção**: menções por hora de cada narrativa (subida, pico, queda).

Fica **fora** até o dono escrever a regra: "Narrative Velocity Score", status tipo
"🔥 EXPANSÃO", classificador de sentimento e "spam provável".

## Como a narrativa é detectada

Sem IA na Fase 1. Uma lista de palavras escrita pelo dono, por exemplo:

```
AI AGENTS: ai agent, agente, autonomous, ...
ANIMAL:    dog, cat, frog, hippo, ...
POLITICAL: trump, election, ...
```

A lista fica versionada. Mudou a lista, o sistema reprocessa o histórico bruto inteiro.
Classificador de IA só entra depois, e comparado contra essa lista.

## Exemplo do que o parser extrai

Mensagem:

```
$MOON
CA: 7xY...abc
AI agent meta
```

Registro:

```json
{
  "canal": "nome_do_canal",
  "message_id": 18372,
  "horario": "2026-09-14T00:38:12Z",
  "tickers": ["MOON"],
  "contratos": ["7xY...abc"],
  "narrativas": ["AI AGENTS"],
  "versao_da_lista": 3
}
```

Depois o contrato é cruzado com o observatório on-chain que já está planejado (preço,
liquidez, holders), no mesmo banco.

## Painel (valores ilustrativos, não são dados)

```
┌──────────────────────────────────────────────┐
│ Última leitura: há 40 s                      │
│ Canais monitorados: N                        │
│ Mensagens hoje: N                            │
│ Contratos novos hoje: N                      │
└──────────────────────────────────────────────┘

MENÇÕES POR NARRATIVA (última hora)
AI AGENTS   ████████████  N
ANIMAL      ███████       N

PROPAGAÇÃO DE UM CONTRATO
00:38:12  Canal A   $ABC + contrato   ← first_seen
00:39:05  Canal B   $ABC
00:40:30  Canal C   $ABC + contrato
Canais: 3 | tempo até o 3º: 2 min 18 s
Liquidez agora: US$ N (do observatório)
```

Na Fase 1 a precisão de horário é a da leitura (1–2 min), não do segundo. O painel mostra isso.

## Armazenamento (bruto primeiro)

Um arquivo SQLite, fora do Git, junto do banco do observatório:

```
leituras_brutas   (html/texto de cada leitura, com horário)  ← nunca apagar
mensagens         (canal, message_id, horário, texto, visto_em)
eventos           (editada, sumiu, reapareceu)
canais            (nome, link, adicionado_em, público/privado)
mencoes           (mensagem → ticker / contrato / narrativa, versão da lista)
listas_narrativa  (versões da lista de palavras)
```

## Stack

**Fase 1: sem dependência nova.**

```
Página pública t.me/s/<canal>
      ↓  fetch a cada 1–2 min (Node 24)
Leitura bruta salva
      ↓
Parser (regex: contrato, $TICKER, links, @canais; lista de narrativas)
      ↓
SQLite (node:sqlite)
      ↓
Painel HTML local lendo o banco
```

**Fase 2: só se a Fase 1 mostrar valor e o dono aprovar.**

- Conta de Telegram **separada**, nunca a pessoal (risco de bloqueio).
- Exceção escrita à regra "cliente MTProto é proibido".
- Dependências a pedir: Python + Telethon, ou uma biblioteca MTProto para Node.
  Supabase e Redis só se o volume exigir, o que não se sabe hoje.
- Antes de codar: conferir na documentação oficial os eventos de edição e exclusão, o
  `catch_up()` e os contadores de visualizações e encaminhamentos.

## Passos

1. O dono lista os canais: link público ou privado.
2. O dono escreve a primeira lista de palavras por narrativa.
3. Conferir o que a página `t.me/s/` mostra de fato (visualizações? encaminhamento? até onde
   o histórico vai?) e anotar com data.
4. Coletor da Fase 1 + banco bruto, rodando uma semana sem painel.
5. Painel de first_seen e propagação.
6. Só então decidir sobre a Fase 2 e sobre qualquer score, com a regra escrita pelo dono.

## O que continua não verificado

- Frequência de leitura que o `t.me/s/` tolera sem bloquear.
- Quais campos a página pública mostra hoje.
- Os eventos do Telethon citados na proposta original.
