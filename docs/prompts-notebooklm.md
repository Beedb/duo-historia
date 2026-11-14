# Prompts do NotebookLM: Duo História

## Como usar

1. Crie **um caderno por tempo** (ex.: "Brasil Imperial") e suba as fontes dele.
2. Nas configurações do chat do caderno, cole o bloco **Instruções do caderno** (abaixo) no campo de instruções personalizadas. Faça isso uma vez por caderno.
3. Cole o prompt do nível (fácil, médio, difícil). Ele gera o **lote 1** (10 questões).
4. Cole o **Prompt de continuação** duas vezes para os lotes 2 e 3 (30 questões por nível).
5. Junte os 3 lotes em um único array e salve no caminho indicado.
6. Cole o JSON num validador antes de usar e confira tudo com `"revisar": true`.

## Instruções do caderno (colar uma vez por caderno)

```text
Você gera questões de História para um app de estudos.

REGRAS
- Use apenas as fontes deste caderno. Se elas não cobrirem o tema, gere menos questões em vez de inventar.
- Responda SOMENTE com o JSON (um array), sem texto antes ou depois e sem bloco de código markdown.
- Toda questão "multipla" e "fonte" tem 4 opções e só 1 correta. "correta" é o índice da certa, começando em 0.
- Varie a posição da resposta correta de forma aleatória, sem padrão (nada de 0,1,2,3,0,1,2,3).
- Distratores plausíveis (mesmo período e mesmo tipo de resposta). Proibido "todas as anteriores" e "nenhuma das anteriores".
- "explicacao": 1 a 2 frases dizendo por que a certa está certa e, se couber, por que a mais tentadora está errada. Nunca escreva "de acordo com as fontes".
- Redação original: não copie frases das fontes.
- Nunca repita pergunta ou assunto já gerado em lotes anteriores.
- "revisar": true se as fontes forem ambíguas, divergirem entre si ou se data/nome precisar de conferência. Senão, false.
- "id": use exatamente os ids pedidos no prompt.

FORMATOS
multipla:
{"id": "...", "tipo": "multipla", "pergunta": "...", "opcoes": ["...", "...", "...", "..."], "correta": 0, "explicacao": "...", "revisar": false}

verdadeiro_falso (a "pergunta" é uma afirmativa a ser julgada):
{"id": "...", "tipo": "verdadeiro_falso", "pergunta": "...", "correta": true, "explicacao": "...", "revisar": false}

fonte ("trecho" com até 40 palavras, tirado de um documento histórico citado nas fontes; se não houver documento citável, troque por "multipla"):
{"id": "...", "tipo": "fonte", "trecho": "...", "autor": "...", "ano": "...", "pergunta": "...", "opcoes": ["...", "...", "...", "..."], "correta": 0, "explicacao": "...", "revisar": false}
```

## Prompt de continuação (lotes 2 e 3)

```text
Crie mais 10 questões, mesma matéria, mesmo nível e mesmos temas.
IDs: de <ID-BASE>-011 a <ID-BASE>-020 (lote 2) ou 021 a 030 (lote 3).
Não repita nenhuma pergunta ou assunto já gerado. Priorize subtemas ainda não cobertos.
```

Troque `<ID-BASE>` pela base dos ids do prompt original (ex.: `ger-ant-m`).


---

# História Geral


## Pré-história


### 🟢 Fácil

Salvar em: `data/geral/pre-historia/facil.json`

```text
Crie 10 questões. Matéria: História Geral / Pré-história. Nível: FÁCIL (fatos, datas, personagens ("o que foi")).
Temas permitidos: Paleolítico e Neolítico; uso do fogo; surgimento da agricultura.
Composição: 10 questões do tipo "multipla".
IDs: de ger-pre-f-001 a ger-pre-f-010.
Formatos: siga os formatos definidos nas instruções do caderno.
```


### 🟡 Médio

Salvar em: `data/geral/pre-historia/medio.json`

```text
Crie 10 questões. Matéria: História Geral / Pré-história. Nível: MÉDIO (causas, consequências e relações ("por que aconteceu")).
Temas permitidos: Revolução Neolítica; sedentarização.
Composição: 8 questões "multipla" + 2 questões "verdadeiro_falso".
IDs: de ger-pre-m-001 a ger-pre-m-010.
Formatos: siga os formatos definidos nas instruções do caderno.
```


### 🔴 Difícil

Salvar em: `data/geral/pre-historia/dificil.json`

```text
Crie 10 questões. Matéria: História Geral / Pré-história. Nível: DIFÍCIL (análise de fontes, comparação e interpretações historiográficas ("como interpretar")).
Temas permitidos: debates de periodização; povoamento da América.
Composição: 8 questões "multipla" + 2 questões "fonte".
IDs: de ger-pre-d-001 a ger-pre-d-010.
Formatos: siga os formatos definidos nas instruções do caderno.
```


## Antiguidade


### 🟢 Fácil

Salvar em: `data/geral/antiguidade/facil.json`

```text
Crie 10 questões. Matéria: História Geral / Antiguidade. Nível: FÁCIL (fatos, datas, personagens ("o que foi")).
Temas permitidos: Egito; Mesopotâmia; Grécia; Roma.
Composição: 10 questões do tipo "multipla".
IDs: de ger-ant-f-001 a ger-ant-f-010.
Formatos: siga os formatos definidos nas instruções do caderno.
```


### 🟡 Médio

Salvar em: `data/geral/antiguidade/medio.json`

```text
Crie 10 questões. Matéria: História Geral / Antiguidade. Nível: MÉDIO (causas, consequências e relações ("por que aconteceu")).
Temas permitidos: Atenas x Esparta; República e Império romano.
Composição: 8 questões "multipla" + 2 questões "verdadeiro_falso".
IDs: de ger-ant-m-001 a ger-ant-m-010.
Formatos: siga os formatos definidos nas instruções do caderno.
```


### 🔴 Difícil

Salvar em: `data/geral/antiguidade/dificil.json`

```text
Crie 10 questões. Matéria: História Geral / Antiguidade. Nível: DIFÍCIL (análise de fontes, comparação e interpretações historiográficas ("como interpretar")).
Temas permitidos: escravismo antigo; queda de Roma; helenismo.
Composição: 8 questões "multipla" + 2 questões "fonte".
IDs: de ger-ant-d-001 a ger-ant-d-010.
Formatos: siga os formatos definidos nas instruções do caderno.
```


## Idade Média


### 🟢 Fácil

Salvar em: `data/geral/idade-media/facil.json`

```text
Crie 10 questões. Matéria: História Geral / Idade Média. Nível: FÁCIL (fatos, datas, personagens ("o que foi")).
Temas permitidos: feudalismo; Igreja; Cruzadas.
Composição: 10 questões do tipo "multipla".
IDs: de ger-med-f-001 a ger-med-f-010.
Formatos: siga os formatos definidos nas instruções do caderno.
```


### 🟡 Médio

Salvar em: `data/geral/idade-media/medio.json`

```text
Crie 10 questões. Matéria: História Geral / Idade Média. Nível: MÉDIO (causas, consequências e relações ("por que aconteceu")).
Temas permitidos: suserania e vassalagem; Império Bizantino; islã; Peste Negra.
Composição: 8 questões "multipla" + 2 questões "verdadeiro_falso".
IDs: de ger-med-m-001 a ger-med-m-010.
Formatos: siga os formatos definidos nas instruções do caderno.
```


### 🔴 Difícil

Salvar em: `data/geral/idade-media/dificil.json`

```text
Crie 10 questões. Matéria: História Geral / Idade Média. Nível: DIFÍCIL (análise de fontes, comparação e interpretações historiográficas ("como interpretar")).
Temas permitidos: transição do feudalismo ao capitalismo; "Idade das Trevas" como conceito historiográfico.
Composição: 8 questões "multipla" + 2 questões "fonte".
IDs: de ger-med-d-001 a ger-med-d-010.
Formatos: siga os formatos definidos nas instruções do caderno.
```


## Idade Moderna


### 🟢 Fácil

Salvar em: `data/geral/idade-moderna/facil.json`

```text
Crie 10 questões. Matéria: História Geral / Idade Moderna. Nível: FÁCIL (fatos, datas, personagens ("o que foi")).
Temas permitidos: Renascimento; Reforma; Grandes Navegações.
Composição: 10 questões do tipo "multipla".
IDs: de ger-mod-f-001 a ger-mod-f-010.
Formatos: siga os formatos definidos nas instruções do caderno.
```


### 🟡 Médio

Salvar em: `data/geral/idade-moderna/medio.json`

```text
Crie 10 questões. Matéria: História Geral / Idade Moderna. Nível: MÉDIO (causas, consequências e relações ("por que aconteceu")).
Temas permitidos: absolutismo; mercantilismo; Iluminismo.
Composição: 8 questões "multipla" + 2 questões "verdadeiro_falso".
IDs: de ger-mod-m-001 a ger-mod-m-010.
Formatos: siga os formatos definidos nas instruções do caderno.
```


### 🔴 Difícil

Salvar em: `data/geral/idade-moderna/dificil.json`

```text
Crie 10 questões. Matéria: História Geral / Idade Moderna. Nível: DIFÍCIL (análise de fontes, comparação e interpretações historiográficas ("como interpretar")).
Temas permitidos: Antigo Regime; acumulação primitiva; sistema colonial.
Composição: 8 questões "multipla" + 2 questões "fonte".
IDs: de ger-mod-d-001 a ger-mod-d-010.
Formatos: siga os formatos definidos nas instruções do caderno.
```


## Idade Contemporânea


### 🟢 Fácil

Salvar em: `data/geral/contemporanea/facil.json`

```text
Crie 10 questões. Matéria: História Geral / Idade Contemporânea. Nível: FÁCIL (fatos, datas, personagens ("o que foi")).
Temas permitidos: Revolução Francesa; Revolução Industrial; Guerras Mundiais.
Composição: 10 questões do tipo "multipla".
IDs: de ger-con-f-001 a ger-con-f-010.
Formatos: siga os formatos definidos nas instruções do caderno.
```


### 🟡 Médio

Salvar em: `data/geral/contemporanea/medio.json`

```text
Crie 10 questões. Matéria: História Geral / Idade Contemporânea. Nível: MÉDIO (causas, consequências e relações ("por que aconteceu")).
Temas permitidos: imperialismo; Revolução Russa; crise de 1929; nazifascismo.
Composição: 8 questões "multipla" + 2 questões "verdadeiro_falso".
IDs: de ger-con-m-001 a ger-con-m-010.
Formatos: siga os formatos definidos nas instruções do caderno.
```


### 🔴 Difícil

Salvar em: `data/geral/contemporanea/dificil.json`

```text
Crie 10 questões. Matéria: História Geral / Idade Contemporânea. Nível: DIFÍCIL (análise de fontes, comparação e interpretações historiográficas ("como interpretar")).
Temas permitidos: Guerra Fria; descolonização; neoliberalismo; globalização.
Composição: 8 questões "multipla" + 2 questões "fonte".
IDs: de ger-con-d-001 a ger-con-d-010.
Formatos: siga os formatos definidos nas instruções do caderno.
```


---

# História do Brasil


## Colônia (1500–1822)


### 🟡 Médio

Salvar em: `data/brasil/colonia/medio.json`

```text
Crie 10 questões. Matéria: História do Brasil / Colônia (1500–1822). Nível: MÉDIO (causas, consequências e relações ("por que aconteceu")).
Temas permitidos: governo-geral; escravidão indígena e africana; mineração; bandeirantes.
Composição: 8 questões "multipla" + 2 questões "verdadeiro_falso".
IDs: de bra-col-m-001 a bra-col-m-010.
Formatos: siga os formatos definidos nas instruções do caderno.
```


### 🔴 Difícil

Salvar em: `data/brasil/colonia/dificil.json`

```text
Crie 10 questões. Matéria: História do Brasil / Colônia (1500–1822). Nível: DIFÍCIL (análise de fontes, comparação e interpretações historiográficas ("como interpretar")).
Temas permitidos: pacto colonial; revoltas nativistas x separatistas.
Composição: 8 questões "multipla" + 2 questões "fonte".
IDs: de bra-col-d-001 a bra-col-d-010.
Formatos: siga os formatos definidos nas instruções do caderno.
```


## Império (1822–1889)


### 🟢 Fácil

Salvar em: `data/brasil/imperio/facil.json`

```text
Crie 10 questões. Matéria: História do Brasil / Império (1822–1889). Nível: FÁCIL (fatos, datas, personagens ("o que foi")).
Temas permitidos: Independência; D. Pedro I e D. Pedro II.
Composição: 10 questões do tipo "multipla".
IDs: de bra-imp-f-001 a bra-imp-f-010.
Formatos: siga os formatos definidos nas instruções do caderno.
```


### 🟡 Médio

Salvar em: `data/brasil/imperio/medio.json`

```text
Crie 10 questões. Matéria: História do Brasil / Império (1822–1889). Nível: MÉDIO (causas, consequências e relações ("por que aconteceu")).
Temas permitidos: Regências; revoltas regenciais; ciclo do café.
Composição: 8 questões "multipla" + 2 questões "verdadeiro_falso".
IDs: de bra-imp-m-001 a bra-imp-m-010.
Formatos: siga os formatos definidos nas instruções do caderno.
```


### 🔴 Difícil

Salvar em: `data/brasil/imperio/dificil.json`

```text
Crie 10 questões. Matéria: História do Brasil / Império (1822–1889). Nível: DIFÍCIL (análise de fontes, comparação e interpretações historiográficas ("como interpretar")).
Temas permitidos: formação do Estado nacional; processo da abolição; crise do Império.
Composição: 8 questões "multipla" + 2 questões "fonte".
IDs: de bra-imp-d-001 a bra-imp-d-010.
Formatos: siga os formatos definidos nas instruções do caderno.
```


## República Velha (1889–1930)


### 🟢 Fácil

Salvar em: `data/brasil/republica-velha/facil.json`

```text
Crie 10 questões. Matéria: História do Brasil / República Velha (1889–1930). Nível: FÁCIL (fatos, datas, personagens ("o que foi")).
Temas permitidos: Proclamação da República; coronelismo.
Composição: 10 questões do tipo "multipla".
IDs: de bra-rv-f-001 a bra-rv-f-010.
Formatos: siga os formatos definidos nas instruções do caderno.
```


### 🟡 Médio

Salvar em: `data/brasil/republica-velha/medio.json`

```text
Crie 10 questões. Matéria: História do Brasil / República Velha (1889–1930). Nível: MÉDIO (causas, consequências e relações ("por que aconteceu")).
Temas permitidos: política do café com leite; Canudos; Contestado; tenentismo.
Composição: 8 questões "multipla" + 2 questões "verdadeiro_falso".
IDs: de bra-rv-m-001 a bra-rv-m-010.
Formatos: siga os formatos definidos nas instruções do caderno.
```


### 🔴 Difícil

Salvar em: `data/brasil/republica-velha/dificil.json`

```text
Crie 10 questões. Matéria: História do Brasil / República Velha (1889–1930). Nível: DIFÍCIL (análise de fontes, comparação e interpretações historiográficas ("como interpretar")).
Temas permitidos: mecanismos do voto de cabresto; interpretações da Revolução de 1930.
Composição: 8 questões "multipla" + 2 questões "fonte".
IDs: de bra-rv-d-001 a bra-rv-d-010.
Formatos: siga os formatos definidos nas instruções do caderno.
```


## Era Vargas (1930–1945)


### 🟢 Fácil

Salvar em: `data/brasil/era-vargas/facil.json`

```text
Crie 10 questões. Matéria: História do Brasil / Era Vargas (1930–1945). Nível: FÁCIL (fatos, datas, personagens ("o que foi")).
Temas permitidos: Revolução de 1930; Estado Novo.
Composição: 10 questões do tipo "multipla".
IDs: de bra-var-f-001 a bra-var-f-010.
Formatos: siga os formatos definidos nas instruções do caderno.
```


### 🟡 Médio

Salvar em: `data/brasil/era-vargas/medio.json`

```text
Crie 10 questões. Matéria: História do Brasil / Era Vargas (1930–1945). Nível: MÉDIO (causas, consequências e relações ("por que aconteceu")).
Temas permitidos: Constituição de 1934; CLT; integralismo.
Composição: 8 questões "multipla" + 2 questões "verdadeiro_falso".
IDs: de bra-var-m-001 a bra-var-m-010.
Formatos: siga os formatos definidos nas instruções do caderno.
```


### 🔴 Difícil

Salvar em: `data/brasil/era-vargas/dificil.json`

```text
Crie 10 questões. Matéria: História do Brasil / Era Vargas (1930–1945). Nível: DIFÍCIL (análise de fontes, comparação e interpretações historiográficas ("como interpretar")).
Temas permitidos: populismo e trabalhismo; historiografia do varguismo.
Composição: 8 questões "multipla" + 2 questões "fonte".
IDs: de bra-var-d-001 a bra-var-d-010.
Formatos: siga os formatos definidos nas instruções do caderno.
```


## Democracia (1945–1964)


### 🟢 Fácil

Salvar em: `data/brasil/democracia/facil.json`

```text
Crie 10 questões. Matéria: História do Brasil / Democracia (1945–1964). Nível: FÁCIL (fatos, datas, personagens ("o que foi")).
Temas permitidos: JK; Plano de Metas; Jango.
Composição: 10 questões do tipo "multipla".
IDs: de bra-dem-f-001 a bra-dem-f-010.
Formatos: siga os formatos definidos nas instruções do caderno.
```


### 🟡 Médio

Salvar em: `data/brasil/democracia/medio.json`

```text
Crie 10 questões. Matéria: História do Brasil / Democracia (1945–1964). Nível: MÉDIO (causas, consequências e relações ("por que aconteceu")).
Temas permitidos: nacionalismo x desenvolvimentismo; Reformas de Base.
Composição: 8 questões "multipla" + 2 questões "verdadeiro_falso".
IDs: de bra-dem-m-001 a bra-dem-m-010.
Formatos: siga os formatos definidos nas instruções do caderno.
```


### 🔴 Difícil

Salvar em: `data/brasil/democracia/dificil.json`

```text
Crie 10 questões. Matéria: História do Brasil / Democracia (1945–1964). Nível: DIFÍCIL (análise de fontes, comparação e interpretações historiográficas ("como interpretar")).
Temas permitidos: causas do golpe de 1964.
Composição: 8 questões "multipla" + 2 questões "fonte".
IDs: de bra-dem-d-001 a bra-dem-d-010.
Formatos: siga os formatos definidos nas instruções do caderno.
```


## Ditadura (1964–1985)


### 🟢 Fácil

Salvar em: `data/brasil/ditadura/facil.json`

```text
Crie 10 questões. Matéria: História do Brasil / Ditadura (1964–1985). Nível: FÁCIL (fatos, datas, personagens ("o que foi")).
Temas permitidos: AI-5; Milagre Econômico.
Composição: 10 questões do tipo "multipla".
IDs: de bra-dit-f-001 a bra-dit-f-010.
Formatos: siga os formatos definidos nas instruções do caderno.
```


### 🟡 Médio

Salvar em: `data/brasil/ditadura/medio.json`

```text
Crie 10 questões. Matéria: História do Brasil / Ditadura (1964–1985). Nível: MÉDIO (causas, consequências e relações ("por que aconteceu")).
Temas permitidos: repressão e resistência; luta armada.
Composição: 8 questões "multipla" + 2 questões "verdadeiro_falso".
IDs: de bra-dit-m-001 a bra-dit-m-010.
Formatos: siga os formatos definidos nas instruções do caderno.
```


### 🔴 Difícil

Salvar em: `data/brasil/ditadura/dificil.json`

```text
Crie 10 questões. Matéria: História do Brasil / Ditadura (1964–1985). Nível: DIFÍCIL (análise de fontes, comparação e interpretações historiográficas ("como interpretar")).
Temas permitidos: Lei da Anistia; memória e justiça de transição.
Composição: 8 questões "multipla" + 2 questões "fonte".
IDs: de bra-dit-d-001 a bra-dit-d-010.
Formatos: siga os formatos definidos nas instruções do caderno.
```


## Nova República (1985–hoje)


### 🟢 Fácil

Salvar em: `data/brasil/nova-republica/facil.json`

```text
Crie 10 questões. Matéria: História do Brasil / Nova República (1985–hoje). Nível: FÁCIL (fatos, datas, personagens ("o que foi")).
Temas permitidos: Diretas Já; Constituição de 1988; Plano Real.
Composição: 10 questões do tipo "multipla".
IDs: de bra-nrep-f-001 a bra-nrep-f-010.
Formatos: siga os formatos definidos nas instruções do caderno.
```


### 🟡 Médio

Salvar em: `data/brasil/nova-republica/medio.json`

```text
Crie 10 questões. Matéria: História do Brasil / Nova República (1985–hoje). Nível: MÉDIO (causas, consequências e relações ("por que aconteceu")).
Temas permitidos: redemocratização; governos Collor, FHC e Lula.
Composição: 8 questões "multipla" + 2 questões "verdadeiro_falso".
IDs: de bra-nrep-m-001 a bra-nrep-m-010.
Formatos: siga os formatos definidos nas instruções do caderno.
```


### 🔴 Difícil

Salvar em: `data/brasil/nova-republica/dificil.json`

```text
Crie 10 questões. Matéria: História do Brasil / Nova República (1985–hoje). Nível: DIFÍCIL (análise de fontes, comparação e interpretações historiográficas ("como interpretar")).
Temas permitidos: limites da democracia; história do tempo presente.
Composição: 8 questões "multipla" + 2 questões "fonte".
IDs: de bra-nrep-d-001 a bra-nrep-d-010.
Formatos: siga os formatos definidos nas instruções do caderno.
```


---

# História da América


### 🟢 Fácil

Salvar em: `data/america/facil.json`

```text
Crie 10 questões. Matéria: História da América. Nível: FÁCIL (fatos, datas, personagens ("o que foi")).
Temas permitidos: maias, astecas e incas; colonização espanhola.
Composição: 10 questões do tipo "multipla".
IDs: de ame-f-001 a ame-f-010.
Formatos: siga os formatos definidos nas instruções do caderno.
```


### 🟡 Médio

Salvar em: `data/america/medio.json`

```text
Crie 10 questões. Matéria: História da América. Nível: MÉDIO (causas, consequências e relações ("por que aconteceu")).
Temas permitidos: independências latino-americanas; Doutrina Monroe; Revolução Mexicana.
Composição: 8 questões "multipla" + 2 questões "verdadeiro_falso".
IDs: de ame-m-001 a ame-m-010.
Formatos: siga os formatos definidos nas instruções do caderno.
```


### 🔴 Difícil

Salvar em: `data/america/dificil.json`

```text
Crie 10 questões. Matéria: História da América. Nível: DIFÍCIL (análise de fontes, comparação e interpretações historiográficas ("como interpretar")).
Temas permitidos: Revolução Cubana; ditaduras do Cone Sul; Operação Condor.
Composição: 8 questões "multipla" + 2 questões "fonte".
IDs: de ame-d-001 a ame-d-010.
Formatos: siga os formatos definidos nas instruções do caderno.
```


---

# História da África


### 🟢 Fácil

Salvar em: `data/africa/facil.json`

```text
Crie 10 questões. Matéria: História da África. Nível: FÁCIL (fatos, datas, personagens ("o que foi")).
Temas permitidos: Egito; reinos africanos; tráfico atlântico.
Composição: 10 questões do tipo "multipla".
IDs: de afr-f-001 a afr-f-010.
Formatos: siga os formatos definidos nas instruções do caderno.
```


### 🟡 Médio

Salvar em: `data/africa/medio.json`

```text
Crie 10 questões. Matéria: História da África. Nível: MÉDIO (causas, consequências e relações ("por que aconteceu")).
Temas permitidos: Conferência de Berlim; imperialismo.
Composição: 8 questões "multipla" + 2 questões "verdadeiro_falso".
IDs: de afr-m-001 a afr-m-010.
Formatos: siga os formatos definidos nas instruções do caderno.
```


### 🔴 Difícil

Salvar em: `data/africa/dificil.json`

```text
Crie 10 questões. Matéria: História da África. Nível: DIFÍCIL (análise de fontes, comparação e interpretações historiográficas ("como interpretar")).
Temas permitidos: descolonização; apartheid; pan-africanismo.
Composição: 8 questões "multipla" + 2 questões "fonte".
IDs: de afr-d-001 a afr-d-010.
Formatos: siga os formatos definidos nas instruções do caderno.
```


---

Total: 41 prompts (Brasil Colônia fácil já foi gerado).
