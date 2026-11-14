# Matemática: como montar as questões

O app já tem a área **Matemática** (aba no topo da trilha). Os assuntos aparecem como "em breve" até ganharem questões.

## Onde salvar

```
data/matematica/<assunto>/<nivel>.json
```

| Assunto | id (pasta) | Prefixo do id |
|---|---|---|
| Operações e números | `operacoes` | `mat-ope` |
| Frações e decimais | `fracoes` | `mat-fra` |
| Razão e proporção | `razao-proporcao` | `mat-raz` |
| Porcentagem | `porcentagem` | `mat-por` |
| Juros simples e compostos | `juros` | `mat-jur` |
| Equações e sistemas | `equacoes` | `mat-equ` |
| Funções | `funcoes` | `mat-fun` |
| Geometria plana | `geometria` | `mat-geo` |
| Probabilidade e estatística | `probabilidade` | `mat-pro` |
| Raciocínio lógico | `logica` | `mat-log` |

Exemplo de id: `mat-por-f-001` (Porcentagem, fácil, nº 1).

**Liberar um assunto:** criar o JSON e mudar `"disponivel"` para `true` no `data/materias.json`. Se tiver só alguns níveis, listar em `"niveis"` (ex.: `["facil"]`).

## Níveis

- **facil:** conta direta, um passo ("quanto é 20% de 150?").
- **medio:** problema curto com contexto, dois ou três passos.
- **dificil:** problema estilo prova de concurso, várias etapas ou pegadinha clássica.

## Formato do arquivo

```json
{
  "materia": "matematica",
  "tempo": "porcentagem",
  "dificuldade": "facil",
  "licao": "Porcentagem básica",
  "resumo": "Porcentagem é uma fração de denominador 100: 20% = 20/100 = 0,2.",
  "questoes": [ ... ]
}
```

## Tipos de questão

Valem todos os tipos da História (`multipla`, `verdadeiro_falso`, `lacuna`, `ordenar`, `ligar`). Para Matemática há também o tipo **`numero`**: o aluno digita a resposta.

### `numero` (digitar a resposta)

```json
{
  "id": "mat-por-f-001",
  "tipo": "numero",
  "pergunta": "Quanto é 20% de 150?",
  "resposta": 30,
  "explicacao": "20% = 0,2\n0,2 × 150 = 30",
  "revisar": false
}
```

- `resposta`: **número** no JSON, com ponto decimal (`12.5`, não `"12,5"`). O aluno pode digitar `12,5` ou `12.5`.
- `unidade` (opcional): texto ao lado do campo, ex.: `"%"`, `"reais"`, `"cm²"`.
- `tolerancia` (opcional): diferença aceita, para respostas arredondadas. Ex.: resposta `3.14` com `"tolerancia": 0.01` aceita de 3,13 a 3,15.
- Resposta precisa ser um único número. Fração vira decimal exato (1/4 → 0.25). Se não der decimal exato (1/3), usar `multipla`.

### `multipla` (para respostas que não são um número só)

```json
{
  "id": "mat-fra-f-001",
  "tipo": "multipla",
  "pergunta": "Qual fração é equivalente a 0,75?",
  "opcoes": ["3/4", "7/5", "1/75", "75/10"],
  "correta": 0,
  "explicacao": "0,75 = 75/100 = 3/4 (dividindo por 25).",
  "revisar": false
}
```

Alternativas erradas boas são **erros comuns de conta** (ex.: esquecer de dividir por 100), não números aleatórios.

## Dicas de escrita

- Quebra de linha na `explicacao` com `\n`: mostra a conta passo a passo.
- Símbolos direto no texto: × ÷ − ² ³ √ ≤ ≥ ≠ π. Fração como `3/4`.
- Números no texto no jeito brasileiro: `12,5`, `R$ 1.200,00`.
- Sem imagens por enquanto. Geometria só com figuras descritas em texto.

## Checklist antes de salvar

1. JSON válido.
2. **Refazer a conta** de cada questão. A `resposta` (ou a opção `correta`) bate com a explicação.
3. Em `multipla`, só uma opção pode estar certa (cuidado com `0,5` e `1/2` juntas).
4. `id` no padrão e sem repetir.
5. `resposta` é número, não texto.
