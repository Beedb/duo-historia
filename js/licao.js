// Lógica da lição: preparar questões, mostrar, conferir resposta, encerrar.
// Uma "sessão" é uma lição normal ou uma revisão:
// { modo: "licao" | "revisao", id, titulo, questoes }

const TIPOS_SUPORTADOS = ["multipla", "verdadeiro_falso", "fonte"];
const ROTULOS_TIPO = { verdadeiro_falso: "Verdadeiro ou falso?", fonte: "Leia o trecho" };
const QUESTOES_POR_LICAO = 10;
const cacheLicoes = {};

let sessao = null;
let indiceQuestao = 0;
let acertos = 0;
let xpGanho = 0;

// --- Carregar e preparar ---

// Guarda a lição na memória para não baixar o mesmo arquivo de novo na revisão
async function carregarLicao(idLicao) {
  if (!cacheLicoes[idLicao]) {
    const resposta = await fetch(`data/${idLicao}.json`);
    if (!resposta.ok) throw new Error(`Não foi possível abrir data/${idLicao}.json`);
    cacheLicoes[idLicao] = await resposta.json();
  }
  return cacheLicoes[idLicao];
}

// Sorteia até 10 questões do banco do nível: lições curtas, e cada vez sai um conjunto diferente
function criarSessaoLicao(licao, idLicao) {
  const questoes = embaralhar(prepararQuestoes(licao, idLicao)).slice(0, QUESTOES_POR_LICAO);
  return { modo: "licao", id: idLicao, titulo: licao.licao, questoes };
}

// Tira questões "revisar" e tipos que o app ainda não mostra (ordenar, ligar, lacuna)
function prepararQuestoes(licao, origem) {
  return licao.questoes
    .filter((questao) => questao.revisar !== true && TIPOS_SUPORTADOS.includes(questao.tipo))
    .map((questao) => normalizarQuestao(questao, origem, licao.dificuldade));
}

// Deixa todo tipo no mesmo formato (opcoes + correta como número),
// assim o resto do código trata V/F e fonte igual à múltipla escolha
function normalizarQuestao(questao, origem, dificuldade) {
  const base = { ...questao, origem, dificuldade };
  if (questao.tipo === "verdadeiro_falso") {
    return { ...base, opcoes: ["Verdadeiro", "Falso"], correta: questao.correta ? 0 : 1 };
  }
  return embaralharOpcoes(base);
}

// As questões geradas têm a correta em posição previsível; embaralhar evita "decorar a letra"
function embaralharOpcoes(questao) {
  const ordem = embaralhar(questao.opcoes.map((_, indice) => indice));
  return {
    ...questao,
    opcoes: ordem.map((indice) => questao.opcoes[indice]),
    correta: ordem.indexOf(questao.correta),
  };
}

// Algoritmo de Fisher-Yates: cada ordem tem a mesma chance
function embaralhar(lista) {
  const copia = [...lista];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

// --- Fluxo da sessão ---

function iniciarLicao(novaSessao) {
  // Revisão não gasta vidas, então pode ser feita mesmo com 0
  if (novaSessao.modo === "licao" && lerVidas() === 0) return;
  if (novaSessao.questoes.length === 0) return;

  sessao = novaSessao;
  indiceQuestao = 0;
  acertos = 0;
  xpGanho = 0;
  mostrarTela("tela-questao");
  mostrarQuestao();
}

function mostrarQuestao() {
  const questao = sessao.questoes[indiceQuestao];
  const total = sessao.questoes.length;
  const prefixo = sessao.modo === "revisao" ? "Revisão · " : "";

  document.getElementById("contador").textContent = `${prefixo}Questão ${indiceQuestao + 1} de ${total}`;
  document.getElementById("tipo-questao").textContent = ROTULOS_TIPO[questao.tipo] || "";
  atualizarBarra(indiceQuestao);
  mostrarTrecho(questao);
  document.getElementById("pergunta").textContent = questao.pergunta;
  document.getElementById("feedback").classList.add("escondida");
  criarOpcoes(questao.opcoes);
}

function mostrarTrecho(questao) {
  const caixa = document.getElementById("trecho");
  const temTrecho = questao.tipo === "fonte" && questao.trecho;
  caixa.classList.toggle("escondida", !temTrecho);
  if (!temTrecho) return;
  document.getElementById("trecho-texto").textContent = `“${questao.trecho}”`;
  document.getElementById("trecho-autor").textContent = `${questao.autor}, ${questao.ano}`;
}

function criarOpcoes(opcoes) {
  const caixa = document.getElementById("opcoes");
  caixa.innerHTML = "";
  opcoes.forEach((texto, indice) => {
    const botao = document.createElement("button");
    botao.className = "botao opcao";
    botao.textContent = texto;
    botao.addEventListener("click", () => responder(indice));
    caixa.appendChild(botao);
  });
}

function atualizarBarra(respondidas) {
  const total = sessao.questoes.length;
  document.getElementById("barra-progresso").style.width = `${(respondidas / total) * 100}%`;
}

function responder(indiceEscolhido) {
  const questao = sessao.questoes[indiceQuestao];
  const acertou = indiceEscolhido === questao.correta;
  const mensagem = acertou ? registrarAcerto(questao) : registrarErro(questao);

  registrarEstudo();
  atualizarPainel();
  atualizarBarra(indiceQuestao + 1);
  marcarOpcoes(indiceEscolhido, questao.correta);
  mostrarFeedback(acertou, mensagem, questao.explicacao);
}

function registrarAcerto(questao) {
  acertos++;
  const ganho = ganharXp(questao.dificuldade);
  xpGanho += ganho;
  if (sessao.modo === "revisao") avancarRevisao(questao.id);
  return `Correto! +${ganho} XP`;
}

function registrarErro(questao) {
  guardarErro(questao.id, questao.origem);
  if (sessao.modo === "revisao") return "Errou. Ela volta amanhã na revisão.";

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
  const acabaramQuestoes = indiceQuestao >= sessao.questoes.length;

  // Sem vidas, a lição termina mesmo que ainda haja questões
  if (sessao.modo === "licao" && lerVidas() === 0) mostrarResultado(false);
  else if (acabaramQuestoes) mostrarResultado(true);
  else mostrarQuestao();
}

// --- Resultado ---

function mostrarResultado(concluiu) {
  const total = sessao.questoes.length;
  const porcentagem = Math.round((acertos / total) * 100);

  document.getElementById("resultado-titulo").textContent = tituloResultado(concluiu);
  document.getElementById("nota").textContent = `${acertos}/${total}`;
  document.getElementById("nota-texto").textContent = concluiu
    ? `Você acertou ${porcentagem}% das questões.`
    : "As vidas voltam 1 a cada 30 minutos. Concluir uma revisão também recarrega.";
  document.getElementById("resultado-xp").textContent = `+${xpGanho} XP`;
  document.getElementById("resultado-extra").textContent = concluiu ? finalizarSessao(porcentagem) : "";
  atualizarPainel();
  mostrarTela("tela-resultado");
}

function tituloResultado(concluiu) {
  if (!concluiu) return "Acabaram as vidas";
  return sessao.modo === "revisao" ? "Revisão concluída!" : "Lição concluída!";
}

// Salva a conclusão (e desbloqueios) e devolve a mensagem extra da tela final
function finalizarSessao(porcentagem) {
  if (sessao.modo === "revisao") {
    restaurarVidas();
    return "Vidas recarregadas! ❤️";
  }

  const liberado = registrarConclusao(sessao.id, porcentagem);
  if (liberado) return `🎉 Liberado: ${descreverLicao(nivelQueAbre(liberado))}`;

  const { nivel } = separarIdLicao(sessao.id);
  const temProximo = Boolean(PROXIMO_NIVEL[nivel]);
  if (temProximo && porcentagem < ACERTO_PARA_LIBERAR) {
    return `Acerte ${ACERTO_PARA_LIBERAR}% ou mais para liberar o próximo nível.`;
  }
  return "";
}
