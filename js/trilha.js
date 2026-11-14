// Tela da trilha: áreas, matérias, tempos (ou assuntos, na Matemática) e níveis, com bloqueio sequencial.

let trilha = null; // conteúdo de data/materias.json

async function carregarTrilha() {
  const resposta = await fetch("data/materias.json");
  if (!resposta.ok) throw new Error("Não foi possível abrir data/materias.json");
  trilha = await resposta.json();
}

// --- Regras de bloqueio ---

// Tempo sem a lista "niveis" tem os três níveis
function nivelExiste(tempo, nivel) {
  return !tempo.niveis || tempo.niveis.includes(nivel);
}

// Pula tempos ainda sem conteúdo; senão um tempo depois deles nunca abriria
function tempoAnteriorDisponivel(materia, indiceTempo) {
  for (let i = indiceTempo - 1; i >= 0; i--) {
    if (materia.tempos[i].disponivel) return materia.tempos[i];
  }
  return null;
}

// Regras: o 1º tempo abre no fácil; o tempo seguinte abre ao concluir o fácil do anterior;
// médio e difícil abrem com 80% no nível anterior (salvo em "desbloqueios").
function nivelLiberado(materia, indiceTempo, nivel) {
  const tempo = materia.tempos[indiceTempo];
  if (nivel === "facil") {
    const anterior = tempoAnteriorDisponivel(materia, indiceTempo);
    return !anterior || licaoConcluida(montarIdLicao(materia.id, anterior.id, "facil"));
  }
  if (nivelDesbloqueado(montarIdLicao(materia.id, tempo.id, nivel))) return true;

  // Tempo sem médio: o difícil abre com o desbloqueio que o fácil (80%) daria ao médio
  const anterior = nivel === "dificil" ? "medio" : null;
  return Boolean(anterior) && !nivelExiste(tempo, anterior)
    && nivelDesbloqueado(montarIdLicao(materia.id, tempo.id, anterior));
}

// Nível que de fato abre para o aluno: se o liberado não existe (tempo sem médio), é o seguinte
function nivelQueAbre(idLiberado) {
  const { materia: materiaId, tempo: tempoId, nivel } = separarIdLicao(idLiberado);
  const materia = trilha.materias.find((m) => m.id === materiaId);
  const tempo = materia && materia.tempos.find((t) => t.id === tempoId);
  if (!tempo || nivelExiste(tempo, nivel) || !PROXIMO_NIVEL[nivel]) return idLiberado;
  return montarIdLicao(materiaId, tempoId, PROXIMO_NIVEL[nivel]);
}

// --- Áreas (História, Matemática) ---
// Cada matéria tem "area" no materias.json; sem ela, conta como História (conteúdo antigo).

const AREA_PADRAO = "historia";
const CHAVE_AREA = "areaAtual"; // só lembra a aba escolhida; não é progresso
let areaAtual = null;

function listarAreas() {
  return trilha.areas || [{ id: AREA_PADRAO, nome: "História", titulo: "Linha do tempo" }];
}

function areaDaMateria(materia) {
  return materia.area || AREA_PADRAO;
}

function lerAreaSalva() {
  try {
    return localStorage.getItem(CHAVE_AREA);
  } catch (erro) {
    return null;
  }
}

function salvarArea(idArea) {
  try {
    localStorage.setItem(CHAVE_AREA, idArea);
  } catch (erro) {
    // Sem localStorage o app funciona igual; só não lembra a aba
  }
}

// Volta na aba usada da última vez; se ela sumiu do materias.json, abre a primeira
function areaInicial() {
  const salva = lerAreaSalva();
  return listarAreas().some((area) => area.id === salva) ? salva : listarAreas()[0].id;
}

function trocarArea(idArea) {
  areaAtual = idArea;
  salvarArea(idArea);
  renderizarTrilha();
}

function renderizarAbas() {
  const caixa = document.getElementById("abas-areas");
  const areas = listarAreas();
  caixa.innerHTML = "";
  caixa.classList.toggle("escondida", areas.length < 2);
  areas.forEach((area) => {
    const botao = document.createElement("button");
    botao.className = "botao aba";
    botao.textContent = area.nome;
    botao.setAttribute("aria-pressed", String(area.id === areaAtual));
    botao.addEventListener("click", () => trocarArea(area.id));
    caixa.appendChild(botao);
  });
  const atual = areas.find((area) => area.id === areaAtual);
  document.getElementById("titulo-trilha").textContent = atual.titulo || atual.nome;
}

// --- Nomes ---

function nivelPorId(nivelId) {
  return trilha.niveis.find((n) => n.id === nivelId) || { nome: nivelId };
}

// Ex.: "brasil/colonia/medio" → "Colônia (1500–1822) · Médio"
// Sem tempo ("america/facil") → "História da América · Fácil"
function descreverLicao(idLicao) {
  const { materia: materiaId, tempo: tempoId, nivel: nivelId } = separarIdLicao(idLicao);
  const materia = trilha.materias.find((m) => m.id === materiaId);
  const tempo = materia && materia.tempos.find((t) => t.id === tempoId);
  const nome = tempoId && tempo ? tempo.nome : (materia ? materia.nome : materiaId);
  const nivel = nivelPorId(nivelId);
  return `${nome} · ${nivel.nome}`;
}

// --- Tela ---

function mostrarTrilha() {
  renderizarTrilha();
  mostrarTela("tela-trilha");
}

function renderizarTrilha() {
  if (!areaAtual) areaAtual = areaInicial();
  atualizarBotaoRevisao();
  renderizarAbas();
  const caixa = document.getElementById("lista-materias");
  caixa.innerHTML = "";
  trilha.materias
    .filter((materia) => areaDaMateria(materia) === areaAtual)
    .forEach((materia) => caixa.appendChild(criarMateria(materia)));
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
  const idFacil = montarIdLicao(materia.id, materia.tempos[indice].id, "facil");
  cartao.classList.toggle("tempo-concluido", licaoConcluida(idFacil));

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
  const tempo = materia.tempos[indice];
  const botao = document.createElement("button");
  botao.className = "botao botao-nivel";

  if (!nivelExiste(tempo, nivel.id)) {
    botao.disabled = true;
    botao.textContent = `${nivel.nome}: em breve`;
    return botao;
  }

  const idLicao = montarIdLicao(materia.id, tempo.id, nivel.id);
  const liberado = nivelLiberado(materia, indice, nivel.id);
  const concluida = licaoConcluida(idLicao);

  botao.disabled = !liberado;
  botao.classList.toggle("concluida", concluida);
  botao.textContent = `${nivel.nome}${concluida ? " ✓" : ""}`;
  botao.setAttribute("aria-label", `${nivel.nome}${liberado ? "" : ", bloqueado"}${concluida ? ", concluído" : ""}`);
  botao.addEventListener("click", () => abrirLicao(idLicao));
  return botao;
}
