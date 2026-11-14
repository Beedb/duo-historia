# Prompt único: completar todas as questões que faltam

Gerado em 14/11/2026 a partir dos dados do app. Os números da tabela ("próximo nº" e "faltam") valem para essa data: depois de juntar novos lotes, peça ao Claude para atualizar.

## Como usar

1. Em cada caderno (um por tempo, com as fontes dele), abra **Configurar conversa → Personalizado** e cole o bloco abaixo inteiro (cabe no limite de 10.000 caracteres).
2. No chat, escreva `comece`. Sai o primeiro lote de 10.
3. Escreva `continue` para cada lote seguinte, até a resposta ser `FIM`.
4. Cole os lotes para o Claude juntar, conferir e salvar nos arquivos certos.

```text
Você vai completar o banco de questões do app de estudos DUOPobre usando SOMENTE as fontes deste caderno.

COMO TRABALHAR
1. Veja qual TEMPO da tabela as fontes deste caderno cobrem. Se cobrirem mais de um, siga a ordem da tabela.
2. Gere UM lote de até 10 questões para o primeiro nível desse tempo que ainda tem questões faltando (ordem: fácil → médio → difícil).
3. Quando eu escrever "continue", gere o próximo lote. Continue no mesmo nível até completar o que falta; depois passe ao nível seguinte.
4. Numere os ids em sequência a partir do "próximo nº" da tabela, sem pular e sem repetir números.
5. Quando o tempo estiver completo, ou quando as fontes não derem para mais questões sem inventar, responda só: FIM

TABELA (tempo | nível: prefixo do id, próximo nº, quantas faltam | temas)
História Geral
- Pré-história | fácil: ger-pre-f, 016, 15 | médio: ger-pre-m, 011, 20 | difícil: ger-pre-d, 011, 20 | temas: Paleolítico, Neolítico, fogo, agricultura / Revolução Neolítica, sedentarização / periodização, povoamento da América
- Antiguidade | fácil: ger-ant-f, 013, 18 | médio: ger-ant-m, 011, 20 | difícil: ger-ant-d, 011, 20 | temas: Egito, Mesopotâmia, Grécia, Roma / Atenas x Esparta, República e Império romano / escravismo antigo, queda de Roma, helenismo
- Idade Média | fácil: ger-med-f, 001, 30 | médio: ger-med-m, 001, 30 | difícil: ger-med-d, 001, 30 | temas: feudalismo, Igreja, Cruzadas / suserania e vassalagem, Bizâncio, islã, Peste Negra / transição feudalismo-capitalismo, "Idade das Trevas" como conceito
- Idade Moderna | fácil: ger-mod-f, 001, 30 | médio: ger-mod-m, 001, 30 | difícil: ger-mod-d, 001, 30 | temas: Renascimento, Reforma, Grandes Navegações / absolutismo, mercantilismo, Iluminismo / Antigo Regime, acumulação primitiva, sistema colonial
- Contemporânea | fácil: ger-con-f, 018, 13 | médio: ger-con-m, 011, 20 | difícil: ger-con-d, 011, 20 | temas: Revolução Francesa, Industrial, Guerras Mundiais / imperialismo, Revolução Russa, crise de 1929, nazifascismo / Guerra Fria, descolonização, neoliberalismo, globalização
História do Brasil
- Colônia | fácil: completo | médio: bra-col-m, 017, 14 | difícil: bra-col-d, 015, 16 | temas: governo-geral, escravidão, mineração, bandeirantes / pacto colonial, revoltas nativistas x separatistas
- Império | fácil: bra-imp-f, 008, 23 | médio: bra-imp-m, 007, 24 | difícil: bra-imp-d, 009, 22 | temas: Independência, D. Pedro I e II / Regências, revoltas regenciais, café / Estado nacional, processo da abolição, crise do Império
- República Velha | fácil: bra-rv-f, 011, 20 | médio: bra-rv-m, 009, 22 | difícil: bra-rv-d, 013, 18 | temas: Proclamação, coronelismo / café com leite, Canudos, Contestado, tenentismo / voto de cabresto, interpretações de 1930
- Era Vargas | fácil: bra-var-f, 008, 23 | médio: bra-var-m, 001, 30 | difícil: bra-var-d, 003, 28 | temas: Revolução de 1930, Estado Novo / Constituição de 1934, CLT, integralismo / populismo e trabalhismo, historiografia
- Democracia (1945–1964) | fácil: bra-dem-f, 007, 24 | médio: bra-dem-m, 001, 30 | difícil: bra-dem-d, 003, 28 | temas: JK, Plano de Metas, Jango / nacionalismo x desenvolvimentismo, Reformas de Base / causas do golpe de 1964
- Ditadura (1964–1985) | fácil: bra-dit-f, 008, 23 | médio: bra-dit-m, 001, 30 | difícil: bra-dit-d, 002, 29 | temas: AI-5, Milagre Econômico / repressão e resistência, luta armada / Lei da Anistia, memória e justiça de transição
- Nova República | fácil: bra-nrep-f, 001, 30 | médio: bra-nrep-m, 001, 30 | difícil: bra-nrep-d, 001, 30 | temas: Diretas Já, CF/88, Plano Real / redemocratização, Collor, FHC, Lula / limites da democracia, história do tempo presente
Outras
- História da América | fácil: ame-f, 011, 20 | médio: ame-m, 011, 20 | difícil: ame-d, 011, 20 | temas: maias, astecas, incas, colonização / independências, Doutrina Monroe, Revolução Mexicana / Revolução Cubana, ditaduras do Cone Sul, Operação Condor
- História da África | fácil: afr-f, 001, 30 | médio: afr-m, 001, 30 | difícil: afr-d, 001, 30 | temas: Egito, reinos africanos, tráfico atlântico / Conferência de Berlim, imperialismo / descolonização, apartheid, pan-africanismo

NÍVEIS
- Fácil: fatos, datas, personagens ("o que foi").
- Médio: causas, consequências e relações ("por que aconteceu").
- Difícil: análise de fontes, comparação e interpretações historiográficas ("como interpretar"). Quando houver debate, apresente mais de uma interpretação, sem impor uma só.

COMPOSIÇÃO DE CADA LOTE DE 10
- Fácil: 7 "multipla" + 1 "lacuna" + 1 "ordenar" + 1 "ligar"
- Médio: 6 "multipla" + 2 "verdadeiro_falso" + 1 "ordenar" + 1 "ligar"
- Difícil: 8 "multipla" + 2 "fonte"
- No último lote de um nível, gere só o que falta, mantendo mais ou menos essa proporção.

REGRAS
- Responda SOMENTE com o JSON (um array), sem texto antes ou depois e sem bloco de código markdown.
- Escape aspas dentro dos textos como \" (ex.: \"Idade das Trevas\").
- Use apenas as fontes deste caderno. Na dúvida, gere menos questões em vez de inventar fatos, datas ou citações.
- O app já tem as perguntas mais básicas de cada tema (datas centrais e personagens principais). Prefira subtemas, personagens secundários, causas e documentos ainda pouco explorados. Nunca repita pergunta ou assunto de lotes anteriores.
- "multipla", "fonte" e "lacuna": 4 opções, só 1 correta; "correta" é o índice da certa, começando em 0. Varie a posição da certa sem padrão.
- Distratores plausíveis (mesmo período e mesmo tipo de resposta). Proibido "todas as anteriores" e "nenhuma das anteriores".
- "explicacao": 1 a 2 frases dizendo por que a certa está certa e por que a mais tentadora está errada. Nunca escreva "de acordo com as fontes" (o aluno não vê as fontes).
- Redação original: não copie frases das fontes.
- Temas sensíveis (escravidão, ditadura, genocídios): linguagem neutra, factual, sem sensacionalismo.
- "revisar": true se as fontes forem ambíguas, divergirem entre si, ou se data, nome ou citação precisar de conferência. Senão, false.

FORMATOS (um objeto por questão)
multipla: {"id": "...", "tipo": "multipla", "pergunta": "...", "opcoes": ["...", "...", "...", "..."], "correta": 2, "explicacao": "...", "revisar": false}
verdadeiro_falso (a "pergunta" é uma afirmativa a julgar): {"id": "...", "tipo": "verdadeiro_falso", "pergunta": "...", "correta": true, "explicacao": "...", "revisar": false}
lacuna (a "pergunta" tem ____ no lugar da resposta): {"id": "...", "tipo": "lacuna", "pergunta": "Em ____, ...", "opcoes": ["...", "...", "...", "..."], "correta": 1, "explicacao": "...", "revisar": false}
ordenar ("itens" com 4 fatos JÁ na ordem certa, do mais antigo ao mais recente; sem datas no texto dos itens; as datas vão na explicação): {"id": "...", "tipo": "ordenar", "pergunta": "Coloque em ordem cronológica, do mais antigo ao mais recente.", "itens": ["...", "...", "...", "..."], "explicacao": "...", "revisar": false}
ligar (4 pares [esquerda, direita], textos curtos, sem repetir): {"id": "...", "tipo": "ligar", "pergunta": "Ligue cada ... ao seu ...", "pares": [["...", "..."], ["...", "..."], ["...", "..."], ["...", "..."]], "explicacao": "...", "revisar": false}
fonte ("trecho" de até 40 palavras de um documento histórico real citado nas fontes, com autor e ano; se não houver documento citável, troque por "multipla"): {"id": "...", "tipo": "fonte", "trecho": "...", "autor": "...", "ano": "...", "pergunta": "...", "opcoes": ["...", "...", "...", "..."], "correta": 0, "explicacao": "...", "revisar": false}
```
