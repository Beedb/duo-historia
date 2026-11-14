// Questões de montar a resposta: "ordenar" (fatos em ordem) e "ligar" (pares).
// O aluno toca nas opções de baixo para preencher as vagas de cima.
// Tocar numa vaga preenchida devolve a opção para baixo (desfazer sem apagar tudo).

const TIPOS_MONTAGEM = ["ordenar", "ligar"];

// { questao, vagas: [texto | null], banco: [texto], travada: boolean }
let montagem = null;

function ehMontagem(questao) {
  return TIPOS_MONTAGEM.includes(questao.tipo);
}

// O que deve ficar em cada vaga, na ordem
function respostaEsperada(questao) {
  return questao.tipo === "ordenar" ? questao.itens : questao.pares.map((par) => par[1]);
}

function rotuloVaga(questao, indice) {
  return questao.tipo === "ordenar" ? `${indice + 1}º` : questao.pares[indice][0];
}

function iniciarMontagem(questao) {
  const esperada = respostaEsperada(questao);
  montagem = { questao, vagas: esperada.map(() => null), banco: embaralharDiferente(esperada), travada: false };
  desenharMontagem();
}

// Se as opções saíssem já na ordem certa, a questão de ordenar viria respondida
function embaralharDiferente(lista) {
  let mistura = embaralhar(lista);
  for (let tentativa = 0; tentativa < 10 && mistura.every((texto, i) => texto === lista[i]); tentativa++) {
    mistura = embaralhar(lista);
  }
  return mistura;
}

function desenharMontagem() {
  const caixa = document.getElementById("opcoes");
  caixa.innerHTML = "";
  caixa.classList.remove("com-letras"); // letras A-D são da múltipla escolha
  caixa.appendChild(criarVagas());
  caixa.appendChild(criarBanco());
  document.getElementById("botao-conferir").disabled = montagem.vagas.includes(null);
}

function criarVagas() {
  const lista = document.createElement("ol");
  lista.className = `vagas vagas-${montagem.questao.tipo}`;
  montagem.vagas.forEach((texto, indice) => lista.appendChild(criarVaga(texto, indice)));
  return lista;
}

function criarVaga(texto, indice) {
  const item = document.createElement("li");
  item.className = "vaga";

  const rotulo = document.createElement("span");
  rotulo.className = "vaga-rotulo";
  rotulo.textContent = rotuloVaga(montagem.questao, indice);

  const botao = document.createElement("button");
  botao.className = `botao vaga-botao${texto ? "" : " vazia"}`;
  botao.textContent = texto || "Toque numa opção abaixo";
  botao.disabled = !texto || montagem.travada;
  if (texto) botao.setAttribute("aria-label", `${texto}. Toque para desfazer`);
  botao.addEventListener("click", () => devolverAoBanco(indice));

  item.append(rotulo, botao);
  return item;
}

function criarBanco() {
  const banco = document.createElement("div");
  banco.className = "banco";
  montagem.banco.forEach((texto) => {
    const botao = document.createElement("button");
    botao.className = "botao opcao";
    botao.textContent = texto;
    botao.disabled = montagem.travada;
    botao.addEventListener("click", () => colocarNaVaga(texto));
    banco.appendChild(botao);
  });
  return banco;
}

function colocarNaVaga(texto) {
  const vazia = montagem.vagas.indexOf(null);
  if (vazia === -1) return;
  montagem.vagas[vazia] = texto;
  montagem.banco = montagem.banco.filter((t) => t !== texto);
  desenharMontagem();
}

function devolverAoBanco(indice) {
  montagem.banco.push(montagem.vagas[indice]);
  montagem.vagas[indice] = null;
  desenharMontagem();
}

// Trava a montagem, pinta cada vaga de verde/vermelho e diz se acertou tudo
function conferirMontagem() {
  const esperada = respostaEsperada(montagem.questao);
  const acertou = montagem.vagas.every((texto, i) => texto === esperada[i]);
  montagem.travada = true;
  desenharMontagem();
  document.querySelectorAll(".vaga-botao").forEach((botao, i) => {
    botao.classList.add(montagem.vagas[i] === esperada[i] ? "certa" : "errada");
  });
  return acertou;
}

function textoRespostaMontagem(questao) {
  if (questao.tipo === "ordenar") return `Ordem certa: ${questao.itens.join(" → ")}`;
  return `Pares certos: ${questao.pares.map(([esquerda, direita]) => `${esquerda} — ${direita}`).join("; ")}`;
}
