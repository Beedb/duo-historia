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

// --- Lições concluídas ---

function marcarLicaoConcluida(idLicao) {
  const salvas = lerDado("licoesConcluidas", []);
  const concluidas = Array.isArray(salvas) ? salvas : [];
  if (concluidas.includes(idLicao)) return;
  concluidas.push(idLicao);
  salvarDado("licoesConcluidas", concluidas);
}
