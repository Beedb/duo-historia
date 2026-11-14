// Inicialização e navegação entre telas.

const CAMINHO_LICAO = "data/brasil/colonia/facil.json";
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

async function carregarLicao(caminho) {
  const resposta = await fetch(caminho);
  if (!resposta.ok) throw new Error(`Não foi possível abrir ${caminho}`);
  return resposta.json();
}

function preencherInicio(licao) {
  document.getElementById("inicio-materia").textContent = [licao.materia, licao.tempo, licao.dificuldade].map(nomeLegivel).join(" · ");
  document.getElementById("inicio-titulo").textContent = licao.licao;
  document.getElementById("inicio-resumo").textContent = licao.resumo || "";
  document.getElementById("botao-comecar").disabled = false;
}

function ligarBotoes() {
  document.getElementById("botao-comecar").addEventListener("click", () => iniciarLicao(licaoCarregada));
  document.getElementById("botao-continuar").addEventListener("click", proximaQuestao);
  document.getElementById("botao-refazer").addEventListener("click", () => iniciarLicao(licaoCarregada));
}

async function iniciarApp() {
  ligarBotoes();
  try {
    licaoCarregada = await carregarLicao(CAMINHO_LICAO);
    preencherInicio(licaoCarregada);
  } catch (erro) {
    // Erro comum: abrir o index.html direto (file://) bloqueia o fetch
    document.getElementById("inicio-titulo").textContent = "Erro ao carregar a lição.";
    document.getElementById("inicio-resumo").textContent = "Abra pelo servidor local (veja o passo a passo).";
    console.error(erro);
  }
}

iniciarApp();
