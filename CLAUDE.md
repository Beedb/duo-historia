# CLAUDE.md

## Projeto
App de estudos estilo Duolingo para **História**. Lições curtas, questões com feedback imediato, XP, vidas, streak e revisão de erros. Conteúdo organizado por **matéria → tempo → dificuldade**. Nome: **DUOPobre** (pasta `DUOPobre/`).

## Sobre o usuário
- Ded, estudante no Brasil.
- Iniciante em programação.
- Foco principal de estudo: OAB/concurso. Este app é um projeto paralelo. Se a conversa desviar muito do foco principal, lembrar disso com uma frase.

## Como responder
- Português do Brasil.
- Direto e conciso. Sem enrolação nem preâmbulo longo.
- Frases curtas. Ir direto ao resultado.
- Explicar passo a passo, com exemplo prático.
- Ao corrigir um erro, explicar **por que** ocorreu.
- Explicar termos técnicos na primeira vez que aparecerem.
- Não narrar o que está fazendo além do necessário.

## Stack
- **HTML + CSS + JavaScript puro** (sem framework no início).
- Dados em **JSON**.
- Progresso salvo em **localStorage**.
- **PWA** (`manifest.json` + `service-worker.js`) para instalar no Android.
- Fase final opcional: **Capacitor** para gerar o APK.
- Hospedagem: GitHub Pages.

Não introduzir framework, bundler ou backend sem pedido explícito do Ded.

## Estrutura de conteúdo

```
Matéria → Tempo → Dificuldade → Lições → Questões
```

### Matérias
1. **geral:** História Geral
2. **brasil:** História do Brasil
3. **america:** História da América (complementar)
4. **africa:** História da África (complementar)

### Tempos por matéria

**História Geral:** Pré-história, Antiguidade, Idade Média, Idade Moderna, Contemporânea.

**História do Brasil:** Colônia (1500–1822), Império (1822–1889), República Velha (1889–1930), Era Vargas (1930–1945), Democracia (1945–1964), Ditadura (1964–1985), Nova República (1985–hoje).

### Níveis de dificuldade
- 🟢 **facil:** fatos, datas, personagens ("o que foi").
- 🟡 **medio:** causas, consequências, relações ("por que aconteceu").
- 🔴 **dificil:** análise de fontes, comparação, historiografia ("como interpretar").

### Mapa de conteúdos

| Tempo | facil | medio | dificil |
|---|---|---|---|
| Pré-história | Paleolítico, Neolítico, fogo, agricultura | Revolução Neolítica, sedentarização | Periodização, povoamento da América |
| Antiguidade | Egito, Mesopotâmia, Grécia, Roma | Atenas x Esparta, República e Império romano | Escravismo antigo, queda de Roma, helenismo |
| Idade Média | Feudalismo, Igreja, Cruzadas | Suserania e vassalagem, Bizâncio, islã, Peste Negra | Transição feudalismo-capitalismo, "Idade das Trevas" |
| Idade Moderna | Renascimento, Reforma, Grandes Navegações | Absolutismo, mercantilismo, Iluminismo | Antigo Regime, acumulação primitiva, sistema colonial |
| Contemporânea | Revolução Francesa, Industrial, Guerras Mundiais | Imperialismo, Revolução Russa, crise de 1929, nazifascismo | Guerra Fria, descolonização, neoliberalismo, globalização |
| Colônia | Chegada dos portugueses, capitanias, pau-brasil, açúcar | Governo-geral, escravidão, mineração, bandeirantes | Pacto colonial, revoltas nativistas x separatistas |
| Império | Independência, D. Pedro I e II | Regências, revoltas regenciais, café | Estado nacional, processo da abolição, crise do Império |
| República Velha | Proclamação, coronelismo | Café com leite, Canudos, Contestado, tenentismo | Voto de cabresto, interpretações de 1930 |
| Era Vargas | Revolução de 1930, Estado Novo | Constituição de 1934, CLT, integralismo | Populismo e trabalhismo, historiografia |
| Democracia | JK, Plano de Metas, Jango | Nacionalismo x desenvolvimentismo, Reformas de Base | Causas do golpe de 1964 |
| Ditadura | AI-5, Milagre Econômico | Repressão e resistência, luta armada | Lei da Anistia, memória e justiça de transição |
| Nova República | Diretas Já, CF/88, Plano Real | Redemocratização, Collor, FHC, Lula | Limites da democracia, história do tempo presente |

**América:** facil (maias, astecas, incas, colonização) / medio (independências, Doutrina Monroe, Revolução Mexicana) / dificil (Revolução Cubana, ditaduras do Cone Sul, Operação Condor).

**África:** facil (Egito, reinos africanos, tráfico atlântico) / medio (Conferência de Berlim, imperialismo) / dificil (descolonização, apartheid, pan-africanismo).

## Estrutura de pastas
```
DUOPobre/
├── CLAUDE.md
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── app.js          # inicialização e navegação entre telas
│   ├── licao.js        # lógica da lição (questões, acerto/erro)
│   ├── progresso.js    # XP, vidas, streak, desbloqueios, localStorage
│   ├── revisao.js      # erros e repetição espaçada
│   ├── montagem.js     # questões de montar resposta (ordenar, ligar)
│   └── trilha.js       # tela de matérias/tempos/níveis e bloqueio
├── data/
│   ├── materias.json   # matérias, tempos (com "disponivel") e níveis
│   ├── geral/
│   │   ├── pre-historia/   facil.json  medio.json  dificil.json
│   │   ├── antiguidade/    facil.json  medio.json  dificil.json
│   │   └── contemporanea/  facil.json  medio.json  dificil.json
│   ├── america/            facil.json  medio.json  dificil.json
│   └── brasil/
│       ├── colonia/        facil.json  medio.json  dificil.json
│       ├── imperio/        facil.json  medio.json  dificil.json
│       ├── republica-velha/ facil.json  medio.json  dificil.json
│       ├── era-vargas/     facil.json  dificil.json
│       ├── democracia/     facil.json  dificil.json
│       └── ditadura/       facil.json  dificil.json
├── docs/
│   └── prompts-notebooklm.md   # prompts para gerar questões
├── icons/              # ícones do app (gerados por script; 192, 512, maskable, apple)
├── manifest.json       # nome, ícones e cores do app instalado
├── .nojekyll           # GitHub Pages serve os arquivos sem processar
└── service-worker.js   # guarda o app para funcionar offline (rede primeiro)
```

Cada arquivo de `data/` é **um objeto de lição** (não um array solto), no formato abaixo.

## Formato dos dados

### Lição (`data/<materia>/<tempo>/<dificuldade>.json`)
```json
{
  "materia": "brasil",
  "tempo": "colonia",
  "dificuldade": "facil",
  "licao": "Capitanias hereditárias",
  "resumo": "Texto curto de 2 a 3 linhas (opcional).",
  "questoes": [
    {
      "id": "bra-col-f-001",
      "tipo": "multipla",
      "pergunta": "Em que ano os portugueses chegaram ao Brasil?",
      "opcoes": ["1492", "1500", "1530", "1549"],
      "correta": 1,
      "explicacao": "A esquadra de Cabral chegou em 1500.",
      "revisar": false
    }
  ]
}
```

Padrão de `id`: `<materia>-<tempo>-<nivel>-<numero>` (ex.: `bra-col-f-001`; `f` = facil, `m` = medio, `d` = dificil).

### Tipos de questão
- `multipla`: múltipla escolha.
- `verdadeiro_falso`: a `pergunta` é uma afirmativa; `correta` é `true` ou `false`; não tem `opcoes`.
- `lacuna`: igual à `multipla` (`opcoes` + `correta`), mas a `pergunta` tem `____` no lugar da resposta (ex.: "A Revolução Francesa começou em ____."). No feedback, o app mostra a frase completa.
- `ordenar`: campo `itens` com 3 a 5 fatos **já na ordem certa** (do mais antigo ao mais recente). Sem `opcoes`/`correta`: o app embaralha. Textos dos itens sem data (a data entrega a resposta); as datas vão na `explicacao`.
- `ligar`: campo `pares` com 3 a 4 pares `["esquerda", "direita"]` (ex.: `["Tomé de Sousa", "Primeiro governador-geral"]`). Sem `opcoes`/`correta`: o app embaralha o lado direito. Textos da direita não podem se repetir.
- `fonte`: campos extras `trecho` (até 40 palavras), `autor` e `ano`; depois segue como `multipla` (`pergunta`, `opcoes`, `correta`). Usado principalmente no nível difícil.

Todo tipo precisa de: pergunta, resposta correta e explicação.

**Suporte no app hoje:** todos os 6 tipos. Questões com `"revisar": true` são ignoradas.

**Tempo novo:** criar os JSONs em `data/<materia>/<tempo>/` e mudar `"disponivel"` para `true` em `data/materias.json`. Se faltar algum nível, listar só os que existem em `"niveis"` (ex.: `["facil", "dificil"]`); o que falta aparece como "em breve" e o difícil abre direto do fácil (80%). Matéria sem divisão por tempo (América, África): arquivos em `data/<materia>/<nivel>.json` e um único tempo com `"id": ""` em `materias.json`.

**Tamanho da lição:** cada lição sorteia até 10 questões do arquivo do nível. Arquivos grandes (30 questões) não deixam a lição longa; cada vez sai um conjunto diferente.

**Tempo vazio no meio:** a regra "o tempo seguinte abre ao concluir o fácil do anterior" pula tempos com `disponivel: false` (ex.: Contemporânea abre com o fácil da Antiguidade).

### Progresso (`localStorage`)
- `xp`: número
- `vidas`: número (máx. 5)
- `recargaVidas`: timestamp (ms) de quando começou a contar a próxima vida
- `streak`: dias seguidos
- `ultimoEstudo`: data ISO (`YYYY-MM-DD`)
- `licoesConcluidas`: lista de ids (`materia/tempo/nivel`)
- `desbloqueios`: lista de níveis liberados
- `erros`: lista de `{ id, origem, proximaRevisao, nivel }` (`origem` = id da lição, ex.: `brasil/colonia/facil`; `nivel` = etapa da revisão: 0, 1, 2)

Sempre envolver leitura e escrita em `try/catch`.

## Regras de jogo
- +10 XP por acerto no facil, +15 no medio, +20 no dificil.
- 5 vidas. Cada erro tira 1. Sem vidas, a lição termina.
- Vidas regeneram a cada 30 minutos ou ao concluir uma revisão.
- Revisão não gasta vidas (pode ser feita com 0 vidas). Errar na revisão volta a questão para 1 dia; acertar a etapa de 7 dias tira a questão da revisão.
- Streak sobe se estudou hoje e ontem. Zera se pular um dia.
- Questão errada vai para a revisão: volta em 1 dia, depois 3, depois 7.

### Progressão
1. Todo tempo abre no 🟢 facil.
2. 80% de acerto no facil libera o 🟡 medio.
3. 80% de acerto no medio libera o 🔴 dificil.
4. O tempo seguinte abre ao concluir o facil do anterior.

## Roadmap
1. **MVP:** Brasil Colônia, nível facil, múltipla escolha, acerto e erro, nota final.
2. **Gamificação:** XP, vidas, streak, barra de progresso.
3. **Trilha:** matérias, tempos, 3 níveis, desbloqueio.
4. **Revisão:** lição de erros com repetição espaçada.
5. **Novos tipos:** ordenar, ligar, fonte.
6. **PWA:** manifest, service worker, instalação no Android.
7. **APK (opcional):** Capacitor.

Trabalhar **uma fase por vez**. Não começar a seguinte sem a atual funcionando.

### Estado atual
- Fases 1 a 4 prontas: trilha com desbloqueio, XP, vidas, streak, revisão com repetição espaçada. Lições de até 10 questões sorteadas.
- Fase 5 pronta: `lacuna`, `ordenar` e `ligar` (além de `verdadeiro_falso` e `fonte`). Exemplos em Colônia fácil (`bra-col-f-036` a `039`) e Antiguidade fácil (`ger-ant-f-011`, `012`).
- Fase 6 (PWA) em andamento: manifest, service worker, ícones e botão "Instalar" prontos e testados no PC (instalável e offline). Site no ar: https://beedb.github.io/duo-historia/. Falta: testar a instalação num Android de verdade.
- Pendente: APK (Fase 7, opcional).

### PWA: cuidados
- Arquivo novo em `js/`, `css/` ou `icons/`: incluir em `ARQUIVOS_BASE` no `service-worker.js`, senão ele não funciona offline.
- Lições novas entram sozinhas: o service worker lê o `materias.json` (só tempos com `disponivel: true`).
- Estratégia "rede primeiro": com internet, o app sempre pega a versão nova. Não precisa mudar `VERSAO_CACHE` a cada atualização; mudar só para forçar a limpeza do cache antigo.
- Testar offline: DevTools → Application → Service Workers → marcar "Offline" e recarregar.

## Convenções de código
- Nomes de variáveis e funções em português, `camelCase` (`mostrarQuestao`, `calcularXp`).
- Um arquivo JS por responsabilidade.
- Funções curtas, com uma tarefa cada.
- Comentários curtos explicando o **porquê**, não o óbvio.
- Mobile first: botões grandes, área de toque mínima de 44px, bom contraste.
- Sem dependências externas. Se precisar de alguma, perguntar antes.

## Conteúdo histórico
- Questões originais. Não copiar provas, apostilas ou livros didáticos.
- Conferir datas e nomes. Em caso de dúvida, marcar `"revisar": true`.
- Explicação curta: por que a correta está certa e por que as outras erram.
- Nível dificil: apresentar mais de uma interpretação quando houver debate historiográfico, sem impor uma só visão.
- Usar linguagem neutra em temas sensíveis (escravidão, ditadura, genocídios): factual e sem sensacionalismo.
- Para `fonte`, usar apenas documentos de domínio público ou trechos curtos citados com autor e ano.
- Não inventar fatos, datas ou citações.
- Questões com `"revisar": true` **não entram nas lições do app** até serem conferidas (o app deve filtrá-las; ao conferir, mudar para `false`).
- `id` único em todo o projeto, no padrão `<materia>-<tempo>-<nivel>-<numero>`. Sem tempo (América, África): `ame-f-001`, `afr-m-001`.
- O `correta` das questões geradas segue um padrão previsível (0,1,2,3...). Embaralhar as `opcoes` em `licao.js` e recalcular o índice da correta.

## Geração de conteúdo com NotebookLM
O NotebookLM não tem API pública. O fluxo é manual:
1. Um caderno por **tempo**, com as fontes dele.
2. Colar as "Instruções do caderno" de `docs/prompts-notebooklm.md` nas configurações do chat (uma vez por caderno).
3. Colar o prompt do nível (lote 1 = 10 questões) e depois o prompt de continuação para os lotes 2 e 3. Meta: 30 questões por nível.
4. Composição por lote: fácil = 10 `multipla`; médio = 8 `multipla` + 2 `verdadeiro_falso`; difícil = 8 `multipla` + 2 `fonte`.
5. Juntar os lotes, corrigir o JSON, passar o checklist abaixo e salvar em `data/<materia>/<tempo>/<nivel>.json`.

### Checklist de revisão (antes de salvar)
1. **JSON válido.** A saída vem com aspas internas sem escape (`"Pré-História"`). Escapar como `\"`.
2. **`correta` aponta para a opção certa.** A explicação tem que bater com a opção marcada. Erro real já ocorrido: `ger-pre-m-005`.
3. **Datas e nomes conferidos.** Erros reais já ocorridos: Lei das Doze Tábuas é c. 450 a.C. (não 445); o Rio de Janeiro foi fundado em 1565 e consolidado em 1567.
4. **Trechos de `fonte` são citações reais**, com autor e ano. Se não for possível confirmar, `"revisar": true`.
5. **Explicação sem "de acordo com as fontes"** (o aluno não vê as fontes).
6. **`id` no padrão e sem repetição.**

## Status do conteúdo

| Matéria / tempo | facil | medio | dificil |
|---|---|---|---|
| Brasil / Colônia | 39 (8 do MVP + 27 do NotebookLM + 4 de ordenar/ligar/lacuna) | 16 (3 V/F) | 14 (3 V/F, 2 de fonte) |
| Brasil / Império | 7 | 6 (2 V/F) | 8 (2 de fonte) |
| Brasil / República Velha | 10 | 8 (2 V/F) | 12 (3 de fonte) |
| Brasil / Era Vargas | 7 | falta | 2 |
| Brasil / Democracia | 6 | falta | 2 |
| Brasil / Ditadura | 7 | falta | 1 |
| Geral / Pré-história | 15 | 10 (2 V/F) | 10 |
| Geral / Antiguidade | 12 (1 ordenar, 1 ligar) | 10 (2 V/F) | 10 (2 de fonte) |
| Geral / Contemporânea | 17 | 10 (2 V/F) | 10 |
| América (sem divisão por tempo) | 10 | 10 (2 V/F) | 10 (1 de fonte) |

Colônia fácil: 3 questões do NotebookLM foram descartadas por repetir assunto do MVP (capitanias, São Vicente, pau-brasil). Meta por nível: 30 questões. Demais tempos: ainda sem conteúdo.

### Pendências
- Revisão de 14/11 (Claude): `revisar: true` em `bra-col-f-024` (feitoria de Santa Cruz com 24 homens: a conhecida é a de Cabo Frio, 1503–1504), `bra-col-f-025` ("primeiro engenho" em 1533 é disputado), `ger-pre-f-012` (nome do sítio "Toca do Baixão do Perna Quatro" não confirmado) e `ame-d-001` (frase do "grande porrete" é de set./1901, quando Roosevelt era vice; a Emenda Platt é do governo McKinley). Corrigidos: gabarito de `bra-var-d-002` (era 1, é 0), datas de `bra-col-f-020` e `f-023`, explicações de `f-022`, `f-027`, `ger-con-f-008` e `ger-con-m-010`, nome em `f-029` (Eckhout) e `ame-f-002` (Hernán Cortés).
- `bra-rv-m-005` trata do Governo Provisório pós-1930: combina mais com Era Vargas.
- Aristides Lobo ("bestializado") aparece em `bra-imp-d-001` e `bra-rv-d-002`: escolher um dos tempos.
- Níveis com poucas questões no app: Império difícil (4), Vargas difícil (2), Democracia difícil (2), Ditadura difícil (1).
- Lote de 14/11: `bra-rv-d-001` (trecho de J. M. de Carvalho: citação e ano a confirmar) e `bra-rv-d-006` (trecho de Manoel Bomfim, 1905) estão com `revisar: true`. `bra-rv-d-002` (Aristides Lobo, 1889) foi trocada pela citação conhecida da Proclamação; conferir em Carvalho, *Os Bestializados*. O lote repetido de Colônia/Pré-história/Vargas/Democracia/Ditadura foi descartado (já existia).
- Conferir e liberar as questões com `"revisar": true`: `ger-pre-m-006`, `ger-pre-m-007`, `ger-ant-d-004`, `bra-col-d-002`, `bra-col-d-003`, `ger-con-d-008`, `ger-con-d-009` (enquadramento político: conferir neutralidade) (trechos de fonte e afirmações a confirmar) e `bra-col-f-015` (tese de um autor, não consenso).
- Colônia (lote 2): `bra-col-m-014` (o Quilombo do Jabaquara é do séc. XIX) e `bra-col-d-010` (atribuição a Boris Fausto) estão com `revisar: true`.
- Questões de Império e República Velha com `revisar: true` (`bra-imp-f-004`, `bra-imp-f-006`, `bra-imp-d-004`, `bra-imp-d-005`, `bra-imp-d-006`, `bra-imp-d-008`, `bra-rv-f-009`, `bra-rv-m-007`): frases atribuídas a autores e afirmações apoiadas em uma única fonte. Conferir em bibliografia.
- Os dois primeiros blocos de Colônia (médio e difícil) vieram sem nível no id e foram classificados por tema e tipo. Reclassificar se necessário.

## Como testar
- Abrir o `index.html` no navegador ou usar um servidor local simples.
- Testar no tamanho de celular (DevTools, modo responsivo).
- Conferir: acerto, erro, fim de vidas, nota final, XP salvo ao recarregar, desbloqueio de nível.
- Validar JSON novo antes de usar (vírgulas e aspas são o erro mais comum).
- Para dados: conferir `id` único, 4 `opcoes` em `multipla`, `fonte` e `lacuna`, `correta` entre 0 e 3, `revisar` booleano, `itens` (3 a 5) em `ordenar` e `pares` (3 a 4, sem repetir) em `ligar`.

## Fluxo de trabalho com o Claude
1. Dizer qual fase está em andamento.
2. Pedir uma etapa por vez.
3. Colar o erro completo do console quando algo quebrar.
4. Claude explica a causa, corrige e diz como evitar.
5. Ao final de cada fase, revisar o que foi feito e confirmar o próximo passo.

## Fora de escopo (por enquanto)
- Login, contas e servidor.
- Ranking entre usuários.
- Pagamento.
- Publicação em loja de apps.
