// Inicialização e navegação entre telas.

const CAMINHO_LICAO = "data/brasil/colonia/facil.json";
const INTERVALO_ATUALIZACAO = 30 * 1000; // confere a recarga de vidas a cada 30 s
let licaoCarregada = null;

// Provisório: na Fase 3 esses nomes virão do materias.json
const NOMES = {
  brasil: "História do Brasil",
  colonia: "Colônia (1500–1822)",
  facil: "🟢 Fácil",
  medio: "🟡 Médio",
  dificil: "🔴 Difícil",
};

function nomeLegivel(codigo) {
  return NOMES[codigo] || codigo;
}

function mostrarTela(idTela) {
  document.querySelectorAll(".tela").forEach((tela) => tela.classList.add("escondida"));
  document.getElementById(idTela).classList.remove("escondida");
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

// --- Tela de início ---

function atualizarBotaoComecar() {
  if (!licaoCarregada) return;
  const botao = document.getElementById("botao-comecar");
  const semVidas = lerVidas() === 0;
  botao.disabled = semVidas;
  botao.textContent = semVidas ? `Sem vidas · próxima em ${minutosParaProximaVida()} min` : "Começar";
}

function atualizarTelaInicio() {
  atualizarPainel();
  atualizarBotaoComecar();
}

function voltarAoInicio() {
  mostrarTela("tela-inicio");
  atualizarTelaInicio();
}

async function carregarLicao(caminho) {
  const resposta = await fetch(caminho);
  if (!resposta.ok) throw new Error(`Não foi possível abrir ${caminho}`);
  return resposta.json();
}

function preencherInicio(licao) {
  document.getElementById("inicio-materia").textContent =
    [licao.materia, licao.tempo, licao.dificuldade].map(nomeLegivel).join(" · ");
  document.getElementById("inicio-titulo").textContent = licao.licao;
  document.getElementById("inicio-resumo").textContent = licao.resumo || "";
  atualizarBotaoComecar();
}

function ligarBotoes() {
  document.getElementById("botao-comecar").addEventListener("click", () => iniciarLicao(licaoCarregada));
  document.getElementById("botao-continuar").addEventListener("click", proximaQuestao);
  document.getElementById("botao-voltar").addEventListener("click", voltarAoInicio);
}

async function iniciarApp() {
  ligarBotoes();
  atualizarPainel();
  setInterval(atualizarTelaInicio, INTERVALO_ATUALIZACAO);
  try {
    licaoCarregada = await carregarLicao(CAMINHO_LICAO);
    preencherInicio(licaoCarregada);
  } catch (erro) {
    // Erro comum: abrir o index.html direto (file://) bloqueia o fetch
    document.getElementById("inicio-titulo").textContent = "Erro ao carregar a lição.";
    document.getElementById("inicio-resumo").textContent = "Abra pelo servidor local (python3 -m http.server).";
    console.error(erro);
  }
}

iniciarApp();
