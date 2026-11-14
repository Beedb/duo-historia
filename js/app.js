// Inicialização e navegação entre telas.

const INTERVALO_ATUALIZACAO = 30 * 1000; // confere a recarga de vidas a cada 30 s

// Lição escolhida na trilha: { licao, id }. A sessão é criada a cada "Começar",
// para as opções saírem embaralhadas de novo quando refizer.
let licaoAberta = null;

function mostrarTela(idTela) {
  document.querySelectorAll(".tela").forEach((tela) => tela.classList.add("escondida"));
  document.getElementById(idTela).classList.remove("escondida");
  window.scrollTo(0, 0);
}

// --- Painel (streak, XP, vidas) ---

// aria-label deixa o leitor de tela dizer "3 vidas" em vez de "coração 3"
function preencherItemPainel(id, icone, valor, descricao) {
  const item = document.getElementById(id);
  item.textContent = `${icone} ${valor}`;
  item.setAttribute("aria-label", `${valor} ${descricao}`);
}

function atualizarPainel() {
  preencherItemPainel("painel-streak", "🔥", lerStreak(), "dias seguidos");
  preencherItemPainel("painel-xp", "⭐", lerXp(), "XP");
  preencherItemPainel("painel-vidas", "❤️", lerVidas(), "vidas");
}

// --- Tela de início da lição ---

async function abrirLicao(idLicao) {
  try {
    const licao = await carregarLicao(idLicao);
    licaoAberta = { licao, id: idLicao };
    preencherInicio(licao, idLicao);
    mostrarTela("tela-inicio");
  } catch (erro) {
    console.error(erro);
    mostrarAvisoTrilha("Não foi possível abrir a lição. Confira o console (F12).");
  }
}

function preencherInicio(licao, idLicao) {
  document.getElementById("inicio-materia").textContent = descreverLicao(idLicao);
  document.getElementById("inicio-titulo").textContent = licao.licao;
  document.getElementById("inicio-resumo").textContent = licao.resumo || "";
  atualizarBotaoComecar();
}

function atualizarBotaoComecar() {
  if (!licaoAberta) return;
  const botao = document.getElementById("botao-comecar");
  const semQuestoes = prepararQuestoes(licaoAberta.licao, licaoAberta.id).length === 0;
  const semVidas = lerVidas() === 0;

  botao.disabled = semQuestoes || semVidas;
  if (semQuestoes) botao.textContent = "Nenhuma questão liberada ainda";
  else if (semVidas) botao.textContent = `Sem vidas · próxima em ${minutosParaProximaVida()} min`;
  else botao.textContent = "Começar";
}

function comecarLicaoAberta() {
  iniciarLicao(criarSessaoLicao(licaoAberta.licao, licaoAberta.id));
}

// --- Trilha ---

function mostrarAvisoTrilha(texto) {
  document.getElementById("aviso-trilha").textContent = texto;
}

function voltarParaTrilha() {
  mostrarAvisoTrilha("");
  atualizarPainel();
  mostrarTrilha();
}

// --- Inicialização ---

function ligarBotoes() {
  document.getElementById("botao-comecar").addEventListener("click", comecarLicaoAberta);
  document.getElementById("botao-voltar-inicio").addEventListener("click", voltarParaTrilha);
  document.getElementById("botao-continuar").addEventListener("click", proximaQuestao);
  document.getElementById("botao-sair").addEventListener("click", voltarParaTrilha);
  document.getElementById("botao-voltar").addEventListener("click", voltarParaTrilha);
  document.getElementById("botao-revisao").addEventListener("click", iniciarRevisao);
}

function atualizarPeriodicamente() {
  atualizarPainel();
  atualizarBotaoComecar();
}

async function iniciarApp() {
  ligarBotoes();
  atualizarPainel();
  setInterval(atualizarPeriodicamente, INTERVALO_ATUALIZACAO);
  try {
    await carregarTrilha();
    mostrarTrilha();
  } catch (erro) {
    // Erro comum: abrir o index.html direto (file://) bloqueia o fetch
    console.error(erro);
    mostrarAvisoTrilha("Erro ao carregar o conteúdo. Abra pelo servidor local (python3 -m http.server).");
  }
}

iniciarApp();
