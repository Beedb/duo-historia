// Lógica da lição: mostrar questão, conferir resposta, contar acertos.

let licaoAtual = null;
let indiceQuestao = 0;
let acertos = 0;
let xpGanho = 0;

function iniciarLicao(licao) {
  // Proteção extra: o botão "Começar" já fica travado sem vidas
  if (lerVidas() === 0) return;

  licaoAtual = licao;
  indiceQuestao = 0;
  acertos = 0;
  xpGanho = 0;
  mostrarTela("tela-questao");
  mostrarQuestao();
}

function mostrarQuestao() {
  const questao = licaoAtual.questoes[indiceQuestao];
  const total = licaoAtual.questoes.length;

  document.getElementById("contador").textContent = `Questão ${indiceQuestao + 1} de ${total}`;
  atualizarBarra(indiceQuestao);
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

function atualizarBarra(respondidas) {
  const total = licaoAtual.questoes.length;
  document.getElementById("barra-progresso").style.width = `${(respondidas / total) * 100}%`;
}

function responder(indiceEscolhido) {
  const questao = licaoAtual.questoes[indiceQuestao];
  const acertou = indiceEscolhido === questao.correta;
  const mensagem = acertou ? registrarAcerto() : registrarErro();

  registrarEstudo();
  atualizarPainel();
  atualizarBarra(indiceQuestao + 1);
  marcarOpcoes(indiceEscolhido, questao.correta);
  mostrarFeedback(acertou, mensagem, questao.explicacao);
}

function registrarAcerto() {
  acertos++;
  const ganho = ganharXp(licaoAtual.dificuldade);
  xpGanho += ganho;
  return `Correto! +${ganho} XP`;
}

function registrarErro() {
  const restantes = perderVida();
  if (restantes === 0) return "Errou. Acabaram as vidas.";
  return `Errou. −1 vida (restam ${restantes}).`;
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

function mostrarFeedback(acertou, mensagem, explicacao) {
  const caixa = document.getElementById("feedback");
  caixa.classList.remove("escondida", "acertou", "errou");
  caixa.classList.add(acertou ? "acertou" : "errou");

  document.getElementById("feedback-titulo").textContent = mensagem;
  document.getElementById("feedback-explicacao").textContent = explicacao;
  document.getElementById("botao-continuar").focus();
}

function proximaQuestao() {
  indiceQuestao++;
  const acabaramQuestoes = indiceQuestao >= licaoAtual.questoes.length;

  // Sem vidas, a lição termina mesmo que ainda haja questões
  if (lerVidas() === 0) mostrarResultado(false);
  else if (acabaramQuestoes) mostrarResultado(true);
  else mostrarQuestao();
}

function idDaLicao(licao) {
  return `${licao.materia}/${licao.tempo}/${licao.dificuldade}`;
}

function mostrarResultado(concluiu) {
  const total = licaoAtual.questoes.length;
  const porcentagem = Math.round((acertos / total) * 100);

  if (concluiu) marcarLicaoConcluida(idDaLicao(licaoAtual));

  document.getElementById("resultado-titulo").textContent = concluiu ? "Lição concluída!" : "Acabaram as vidas";
  document.getElementById("nota").textContent = `${acertos}/${total}`;
  document.getElementById("nota-texto").textContent = concluiu
    ? `Você acertou ${porcentagem}% das questões.`
    : "As vidas voltam com o tempo: 1 a cada 30 minutos.";
  document.getElementById("resultado-xp").textContent = `+${xpGanho} XP nesta lição`;
  mostrarTela("tela-resultado");
}
