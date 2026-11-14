# CLAUDE.md

## Projeto
App de estudos estilo Duolingo para **História**. Lições curtas, questões com feedback imediato, XP, vidas, streak e revisão de erros. Conteúdo organizado por **matéria → tempo → dificuldade**. Nome provisório: **Duo História**.

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
duo-historia/
├── CLAUDE.md
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── app.js          # inicialização e navegação entre telas
│   ├── licao.js        # lógica da lição (questões, acerto/erro)
│   ├── progresso.js    # XP, vidas, streak, desbloqueios, localStorage
│   └── revisao.js      # erros e repetição espaçada
├── data/
│   ├── materias.json   # matérias, tempos e níveis
│   ├── geral/
│   │   └── antiguidade/
│   │       ├── facil.json
│   │       ├── medio.json
│   │       └── dificil.json
│   └── brasil/
│       └── colonia/
│           ├── facil.json
│           ├── medio.json
│           └── dificil.json
├── manifest.json
└── service-worker.js
```

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
- `verdadeiro_falso`: afirmativa com `true` ou `false`.
- `lacuna`: completar a frase (ex.: "A Revolução Francesa começou em ____").
- `ordenar`: colocar fatos em ordem cronológica (muito útil em História).
- `ligar`: ligar personagem, evento e data.
- `fonte`: trecho curto de documento ou imagem + pergunta (principalmente no nível difícil).

Todo tipo precisa de: pergunta, resposta correta e explicação.

### Progresso (`localStorage`)
- `xp`: número
- `vidas`: número (máx. 5)
- `streak`: dias seguidos
- `ultimoEstudo`: data ISO (`YYYY-MM-DD`)
- `licoesConcluidas`: lista de ids (`materia/tempo/nivel`)
- `desbloqueios`: lista de níveis liberados
- `erros`: lista de `{ id, proximaRevisao, nivel }`

Sempre envolver leitura e escrita em `try/catch`.

## Regras de jogo
- +10 XP por acerto no facil, +15 no medio, +20 no dificil.
- 5 vidas. Cada erro tira 1. Sem vidas, a lição termina.
- Vidas regeneram a cada 30 minutos ou ao concluir uma revisão.
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

## Como testar
- Abrir o `index.html` no navegador ou usar um servidor local simples.
- Testar no tamanho de celular (DevTools, modo responsivo).
- Conferir: acerto, erro, fim de vidas, nota final, XP salvo ao recarregar, desbloqueio de nível.
- Validar JSON novo antes de usar (vírgulas e aspas são o erro mais comum).

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
