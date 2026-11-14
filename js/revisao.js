// Revisão de erros com repetição espaçada.
// Cada erro salvo: { id, origem, proximaRevisao, nivel }
// - origem: lição de onde veio ("brasil/colonia/facil"), para achar a questão de novo
// - nivel: etapa da repetição (0 = volta em 1 dia, 1 = em 3, 2 = em 7)

const INTERVALOS_REVISAO = [1, 3, 7]; // dias
const MAX_QUESTOES_REVISAO = 10;

function lerErros() {
  return lerLista("erros");
}

function salvarErros(erros) {
  salvarDado("erros", erros);
}

function dataDaquiA(dias) {
  const data = new Date();
  data.setDate(data.getDate() + dias);
  return dataLocal(data);
}

// Errou (na lição ou na revisão): a questão volta para o começo da fila, em 1 dia
function guardarErro(idQuestao, origem) {
  const erros = lerErros().filter((erro) => erro.id !== idQuestao);
  erros.push({ id: idQuestao, origem, proximaRevisao: dataDaquiA(INTERVALOS_REVISAO[0]), nivel: 0 });
  salvarErros(erros);
}

// Acertou na revisão: sobe uma etapa. Depois de acertar a de 7 dias, sai da revisão.
function avancarRevisao(idQuestao) {
  const erros = lerErros();
  const erro = erros.find((e) => e.id === idQuestao);
  if (!erro) return;

  erro.nivel++;
  if (erro.nivel >= INTERVALOS_REVISAO.length) {
    salvarErros(erros.filter((e) => e.id !== idQuestao));
    return;
  }
  erro.proximaRevisao = dataDaquiA(INTERVALOS_REVISAO[erro.nivel]);
  salvarErros(erros);
}

// Datas no formato YYYY-MM-DD podem ser comparadas como texto
function errosParaHoje() {
  const hoje = dataLocal();
  return lerErros().filter((erro) => erro.proximaRevisao <= hoje);
}

function removerErros(ids) {
  salvarErros(lerErros().filter((erro) => !ids.includes(erro.id)));
}

// Busca as questões vencidas nas lições de origem e monta a sessão de revisão
async function montarRevisao() {
  const pendentes = errosParaHoje().slice(0, MAX_QUESTOES_REVISAO);
  const questoes = [];
  const sumidas = [];

  for (const erro of pendentes) {
    const questao = await buscarQuestao(erro);
    if (questao) questoes.push(questao);
    else sumidas.push(erro.id);
  }

  // Questão apagada, renumerada ou marcada "revisar": tira da fila para não travar a revisão
  if (sumidas.length > 0) removerErros(sumidas);

  return { modo: "revisao", id: "revisao", titulo: "Revisão de erros", questoes };
}

async function buscarQuestao(erro) {
  try {
    const licao = await carregarLicao(erro.origem);
    const encontrada = prepararQuestoes(licao, erro.origem).find((q) => q.id === erro.id);
    return encontrada || null;
  } catch (falha) {
    console.warn(`Revisão: não achei a lição ${erro.origem}.`, falha);
    return null;
  }
}

function atualizarBotaoRevisao() {
  const botao = document.getElementById("botao-revisao");
  const quantidade = errosParaHoje().length;
  botao.disabled = quantidade === 0;
  botao.textContent = quantidade === 0 ? "Nenhum erro para revisar hoje" : `Revisar erros (${quantidade})`;
}

async function iniciarRevisao() {
  const sessao = await montarRevisao();
  if (sessao.questoes.length === 0) {
    renderizarTrilha();
    return;
  }
  iniciarLicao(sessao);
}
