// Lógica da lição: mostrar questão, conferir resposta, contar acertos.

let licaoAtual = null;
let indiceQuestao = 0;
let acertos = 0;

function iniciarLicao(licao) {
  licaoAtual = licao;
  indiceQuestao = 0;
  acertos = 0;
  mostrarTela("tela-questao");
  mostrarQuestao();
}

function mostrarQuestao() {
  const questao = licaoAtual.questoes[indiceQuestao];
  const total = licaoAtual.questoes.length;

  document.getElementById("contador").textContent = `Questão ${indiceQuestao + 1} de ${total}`;
  document.getElementById("barra-progresso").style.width = `${(indiceQuestao / total) * 100}%`;
  document.getElementById("pergunta").textContent = questao.pergunta;
  document.getElementById("feedback").classList.add("escondida");

  const caixaOpcoes = document.getElementById("opcoes");
  caixaOpcoes.innerHTML = "";

  questao.opcoes.forEach((texto, indice) => {
    const botao = document.createElement("button");
    botao.className = "botao opcao";
    botao.textContent = texto;
    botao.addEventListener("click", () => responder(indice));
    caixaOpcoes.appendChild(botao);
  });
}

function responder(indiceEscolhido) {
  const questao = licaoAtual.questoes[indiceQuestao];
  const acertou = indiceEscolhido === questao.correta;

  if (acertou) acertos++;

  marcarOpcoes(indiceEscolhido, questao.correta);
  mostrarFeedback(acertou, questao);
}

// Trava as opções para impedir trocar a resposta depois de ver o gabarito
function marcarOpcoes(escolhida, correta) {
  const botoes = document.querySelectorAll("#opcoes .opcao");
  botoes.forEach((botao, indice) => {
    botao.disabled = true;
    if (indice === correta) botao.classList.add("certa");
    else if (indice === escolhida) botao.classList.add("errada");
  });
}

function mostrarFeedback(acertou, questao) {
  const caixa = document.getElementById("feedback");
  caixa.classList.remove("escondida", "acertou", "errou");
  caixa.classList.add(acertou ? "acertou" : "errou");

  document.getElementById("feedback-titulo").textContent = acertou ? "Correto!" : "Errou.";
  document.getElementById("feedback-explicacao").textContent = questao.explicacao;
  document.getElementById("botao-continuar").focus();
}

function proximaQuestao() {
  indiceQuestao++;
  if (indiceQuestao < licaoAtual.questoes.length) {
    mostrarQuestao();
  } else {
    mostrarResultado();
  }
}

function mostrarResultado() {
  const total = licaoAtual.questoes.length;
  const porcentagem = Math.round((acertos / total) * 100);

  document.getElementById("nota").textContent = `${acertos}/${total}`;
  document.getElementById("nota-texto").textContent = `Você acertou ${porcentagem}% das questões.`;
  mostrarTela("tela-resultado");
}
