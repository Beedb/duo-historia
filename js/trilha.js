// Tela da trilha: matérias, tempos e níveis, com bloqueio sequencial.

let trilha = null; // conteúdo de data/materias.json

async function carregarTrilha() {
  const resposta = await fetch("data/materias.json");
  if (!resposta.ok) throw new Error("Não foi possível abrir data/materias.json");
  trilha = await resposta.json();
}

// Regras: o 1º tempo abre no fácil; o tempo seguinte abre ao concluir o fácil do anterior;
// médio e difícil abrem com 80% no nível anterior (salvo em "desbloqueios").
function nivelLiberado(materia, indiceTempo, nivel) {
  const tempo = materia.tempos[indiceTempo];
  if (nivel !== "facil") return nivelDesbloqueado(`${materia.id}/${tempo.id}/${nivel}`);
  if (indiceTempo === 0) return true;
  const anterior = materia.tempos[indiceTempo - 1];
  return licaoConcluida(`${materia.id}/${anterior.id}/facil`);
}

function nomeDoTempo(materiaId, tempoId) {
  const materia = trilha.materias.find((m) => m.id === materiaId);
  const tempo = materia && materia.tempos.find((t) => t.id === tempoId);
  return tempo ? tempo.nome : tempoId;
}

function nivelPorId(nivelId) {
  return trilha.niveis.find((n) => n.id === nivelId) || { nome: nivelId, icone: "" };
}

// Ex.: "brasil/colonia/medio" → "Colônia (1500–1822) · 🟡 Médio"
function descreverLicao(idLicao) {
  const [materia, tempo, nivelId] = idLicao.split("/");
  const nivel = nivelPorId(nivelId);
  return `${nomeDoTempo(materia, tempo)} · ${nivel.icone} ${nivel.nome}`;
}

function mostrarTrilha() {
  renderizarTrilha();
  mostrarTela("tela-trilha");
}

function renderizarTrilha() {
  atualizarBotaoRevisao();
  const caixa = document.getElementById("lista-materias");
  caixa.innerHTML = "";
  trilha.materias.forEach((materia) => caixa.appendChild(criarMateria(materia)));
}

function criarMateria(materia) {
  const secao = document.createElement("section");
  secao.className = "materia-bloco";

  const titulo = document.createElement("h2");
  titulo.textContent = materia.nome;
  secao.appendChild(titulo);

  materia.tempos.forEach((tempo, indice) => {
    if (tempo.disponivel) secao.appendChild(criarTempo(materia, indice));
  });
  secao.appendChild(criarAvisoEmBreve(materia));
  return secao;
}

// Lista numa linha só os tempos ainda sem conteúdo, para não poluir a tela
function criarAvisoEmBreve(materia) {
  const aviso = document.createElement("p");
  aviso.className = "em-breve";
  const pendentes = materia.tempos.filter((t) => !t.disponivel).map((t) => t.nome);
  if (materia.tempos.length === 0) aviso.textContent = "Em breve.";
  else if (pendentes.length > 0) aviso.textContent = `Em breve: ${pendentes.join(", ")}.`;
  return aviso;
}

function criarTempo(materia, indice) {
  const cartao = document.createElement("div");
  cartao.className = "tempo-cartao";

  const titulo = document.createElement("h3");
  titulo.textContent = materia.tempos[indice].nome;
  cartao.appendChild(titulo);

  const niveis = document.createElement("div");
  niveis.className = "niveis";
  trilha.niveis.forEach((nivel) => niveis.appendChild(criarBotaoNivel(materia, indice, nivel)));
  cartao.appendChild(niveis);
  return cartao;
}

function criarBotaoNivel(materia, indice, nivel) {
  const idLicao = `${materia.id}/${materia.tempos[indice].id}/${nivel.id}`;
  const liberado = nivelLiberado(materia, indice, nivel.id);
  const concluida = licaoConcluida(idLicao);

  const botao = document.createElement("button");
  botao.className = "botao botao-nivel";
  botao.disabled = !liberado;
  botao.textContent = `${liberado ? nivel.icone : "🔒"} ${nivel.nome}${concluida ? " ✓" : ""}`;
  botao.setAttribute("aria-label", `${nivel.nome}${liberado ? "" : ", bloqueado"}${concluida ? ", concluído" : ""}`);
  botao.addEventListener("click", () => abrirLicao(idLicao));
  return botao;
}
