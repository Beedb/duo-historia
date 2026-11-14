// Questão "numero": o aluno digita a resposta (contas de Matemática).
// Campos no JSON: "resposta" (número), "unidade" (opcional, ex.: "%", "reais")
// e "tolerancia" (opcional, aceita diferença de até esse valor, para arredondamentos).

function ehNumerica(questao) {
  return questao.tipo === "numero";
}

// Aceita vírgula ou ponto como decimal: "12,5" e "12.5" valem 12.5.
// Com vírgula, pontos são separador de milhar: "1.234,5" vale 1234.5.
function lerNumero(texto) {
  let limpo = String(texto).trim().replace(/\s/g, "");
  if (limpo.includes(",")) limpo = limpo.replace(/\./g, "").replace(",", ".");
  return limpo === "" ? NaN : Number(limpo);
}

// Mostra no jeito brasileiro: 1234.5 → "1.234,5"
function formatarNumero(numero) {
  return numero.toLocaleString("pt-BR", { maximumFractionDigits: 6 });
}

function iniciarNumerica(questao) {
  const caixa = document.getElementById("opcoes");
  caixa.innerHTML = "";
  caixa.classList.remove("com-letras");

  const linha = document.createElement("div");
  linha.className = "campo-numero-linha";
  linha.appendChild(criarCampoNumero());
  if (questao.unidade) linha.appendChild(criarUnidade(questao.unidade));
  caixa.appendChild(linha);

  document.getElementById("botao-conferir").disabled = true;
  document.getElementById("campo-numero").focus();
}

// type="text" com inputmode="decimal": o celular abre o teclado numérico
// e o campo aceita vírgula (o type="number" recusa vírgula em alguns aparelhos)
function criarCampoNumero() {
  const campo = document.createElement("input");
  campo.id = "campo-numero";
  campo.className = "campo-numero";
  campo.type = "text";
  campo.inputMode = "decimal";
  campo.autocomplete = "off";
  campo.setAttribute("aria-label", "Sua resposta");
  campo.addEventListener("input", () => {
    document.getElementById("botao-conferir").disabled = campo.value.trim() === "";
  });
  campo.addEventListener("keydown", (evento) => {
    const botao = document.getElementById("botao-conferir");
    if (evento.key === "Enter" && !botao.disabled) botao.click();
  });
  return campo;
}

function criarUnidade(texto) {
  const unidade = document.createElement("span");
  unidade.className = "campo-numero-unidade";
  unidade.textContent = texto;
  return unidade;
}

// Trava o campo, pinta de verde/vermelho e diz se acertou.
// A margem mínima evita erro de arredondamento do computador (0,1 + 0,2 = 0,30000000000000004).
function conferirNumerica(questao) {
  const campo = document.getElementById("campo-numero");
  const valor = lerNumero(campo.value);
  const margem = (questao.tolerancia || 0) + 1e-9;
  const acertou = Math.abs(valor - questao.resposta) <= margem;
  campo.disabled = true;
  campo.classList.add(acertou ? "certa" : "errada");
  return acertou;
}

function textoRespostaNumerica(questao) {
  const unidade = questao.unidade ? ` ${questao.unidade}` : "";
  return `Resposta: ${formatarNumero(questao.resposta)}${unidade}`;
}
