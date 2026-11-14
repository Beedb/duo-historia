// XP, vidas, streak e lições concluídas, salvos no localStorage.

const VIDAS_MAX = 5;
const MS_POR_VIDA = 30 * 60 * 1000; // 30 minutos
const XP_POR_NIVEL = { facil: 10, medio: 15, dificil: 20 };

// --- Leitura e escrita segura ---

// localStorage pode falhar (aba anônima, memória cheia, dado corrompido).
// Nesse caso o app segue funcionando com o valor padrão.
function lerDado(chave, padrao) {
  try {
    const valor = localStorage.getItem(chave);
    return valor === null ? padrao : JSON.parse(valor);
  } catch (erro) {
    return padrao;
  }
}

function salvarDado(chave, valor) {
  try {
    localStorage.setItem(chave, JSON.stringify(valor));
  } catch (erro) {
    console.warn(`Não foi possível salvar "${chave}".`, erro);
  }
}

// --- Datas ---

// Data local no formato YYYY-MM-DD.
// Não usar toISOString(): ele usa o fuso UTC e, no Brasil, "vira o dia" às 21h.
function dataLocal(data = new Date()) {
  const ano = data.getFullYear();
  const mes = String(data.getMonth() + 1).padStart(2, "0");
  const dia = String(data.getDate()).padStart(2, "0");
  return `${ano}-${mes}-${dia}`;
}

function dataOntem() {
  const ontem = new Date();
  ontem.setDate(ontem.getDate() - 1);
  return dataLocal(ontem);
}

// --- XP ---

function lerXp() {
  return lerDado("xp", 0);
}

function ganharXp(dificuldade) {
  const ganho = XP_POR_NIVEL[dificuldade] || XP_POR_NIVEL.facil;
  salvarDado("xp", lerXp() + ganho);
  return ganho;
}

// --- Vidas ---

function lerVidas() {
  atualizarVidas();
  return lerDado("vidas", VIDAS_MAX);
}

// Devolve as vidas que voltaram desde a última recarga (1 a cada 30 min)
function atualizarVidas() {
  const vidas = lerDado("vidas", VIDAS_MAX);
  if (vidas >= VIDAS_MAX) return;

  const inicio = lerDado("recargaVidas", null);
  if (inicio === null) {
    salvarDado("recargaVidas", Date.now());
    return;
  }

  const recuperadas = Math.floor((Date.now() - inicio) / MS_POR_VIDA);
  if (recuperadas <= 0) return;

  salvarDado("vidas", Math.min(VIDAS_MAX, vidas + recuperadas));
  // Avança o relógio só pelo tempo usado, para não perder os minutos que sobraram
  salvarDado("recargaVidas", inicio + recuperadas * MS_POR_VIDA);
}

function perderVida() {
  const vidas = lerVidas();
  // O relógio da recarga só começa quando sai a primeira vida
  if (vidas === VIDAS_MAX) salvarDado("recargaVidas", Date.now());

  const restantes = Math.max(0, vidas - 1);
  salvarDado("vidas", restantes);
  return restantes;
}

// Concluir uma revisão enche as vidas (regra do jogo)
function restaurarVidas() {
  salvarDado("vidas", VIDAS_MAX);
}

function minutosParaProximaVida() {
  if (lerVidas() >= VIDAS_MAX) return 0;
  const inicio = lerDado("recargaVidas", Date.now());
  return Math.max(1, Math.ceil((inicio + MS_POR_VIDA - Date.now()) / 60000));
}

// --- Streak ---

// Se o último estudo foi antes de ontem, a sequência quebrou: mostra 0
function lerStreak() {
  const ultimo = lerDado("ultimoEstudo", null);
  if (ultimo === dataLocal() || ultimo === dataOntem()) return lerDado("streak", 0);
  return 0;
}

function registrarEstudo() {
  const hoje = dataLocal();
  const ultimo = lerDado("ultimoEstudo", null);
  if (ultimo === hoje) return;

  const novoStreak = ultimo === dataOntem() ? lerDado("streak", 0) + 1 : 1;
  salvarDado("streak", novoStreak);
  salvarDado("ultimoEstudo", hoje);
}

// --- Lições concluídas e desbloqueios ---
// ids no formato "materia/tempo/nivel" (ex.: "brasil/colonia/facil").
// Matéria sem divisão por tempo (América, África) fica "materia/nivel" (ex.: "america/facil").

function montarIdLicao(materia, tempo, nivel) {
  return [materia, tempo, nivel].filter(Boolean).join("/");
}

function separarIdLicao(idLicao) {
  const partes = idLicao.split("/");
  const nivel = partes.pop();
  return { materia: partes[0], tempo: partes[1] || "", nivel };
}

const PROXIMO_NIVEL = { facil: "medio", medio: "dificil" };
const ACERTO_PARA_LIBERAR = 80; // %

// Se o dado salvo estiver corrompido (não for lista), recomeça vazio
function lerLista(chave) {
  const salva = lerDado(chave, []);
  return Array.isArray(salva) ? salva : [];
}

function adicionarNaLista(chave, valor) {
  const lista = lerLista(chave);
  if (lista.includes(valor)) return;
  lista.push(valor);
  salvarDado(chave, lista);
}

function licaoConcluida(idLicao) {
  return lerLista("licoesConcluidas").includes(idLicao);
}

function nivelDesbloqueado(idLicao) {
  return lerLista("desbloqueios").includes(idLicao);
}

// Marca a lição como concluída e, com 80% ou mais, libera o nível seguinte.
// Devolve o id do nível liberado agora, ou null.
function registrarConclusao(idLicao, porcentagem) {
  adicionarNaLista("licoesConcluidas", idLicao);
  if (porcentagem < ACERTO_PARA_LIBERAR) return null;

  const { materia, tempo, nivel } = separarIdLicao(idLicao);
  const proximo = PROXIMO_NIVEL[nivel];
  if (!proximo) return null;

  const idProximo = montarIdLicao(materia, tempo, proximo);
  if (nivelDesbloqueado(idProximo)) return null;
  adicionarNaLista("desbloqueios", idProximo);
  return idProximo;
}
