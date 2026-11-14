// Instalação como app (PWA): registra o service worker e cuida do botão "Instalar".

let pedidoInstalacao = null; // aviso do navegador de que o app pode ser instalado

function registrarServiceWorker() {
  // Só funciona em https ou localhost (não em file://)
  if (!("serviceWorker" in navigator)) return;
  navigator.serviceWorker.register("service-worker.js").catch((erro) => {
    console.warn("Service worker não registrado: o app não vai funcionar offline.", erro);
  });
}

// O Chrome avisa quando o app pode ser instalado. Guardamos o aviso
// para mostrar a janela de instalação só quando o aluno tocar no botão.
function prepararBotaoInstalar() {
  const botao = document.getElementById("botao-instalar");
  window.addEventListener("beforeinstallprompt", (evento) => {
    evento.preventDefault();
    pedidoInstalacao = evento;
    botao.classList.remove("escondida");
  });
  window.addEventListener("appinstalled", esconderBotaoInstalar);
  botao.addEventListener("click", instalarApp);
}

async function instalarApp() {
  if (!pedidoInstalacao) return;
  pedidoInstalacao.prompt();
  await pedidoInstalacao.userChoice;
  pedidoInstalacao = null; // o aviso só pode ser usado uma vez
  esconderBotaoInstalar();
}

function esconderBotaoInstalar() {
  document.getElementById("botao-instalar").classList.add("escondida");
}
