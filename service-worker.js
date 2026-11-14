// Service worker: guarda o app no aparelho para abrir sem internet.
// Estratégia "rede primeiro": com internet, sempre busca a versão nova (conteúdo atualizado);
// sem internet, usa a cópia guardada.

const VERSAO_CACHE = "duopobre-v1";

// Arquivo novo em js/, css/ ou icons/ precisa entrar nesta lista
const ARQUIVOS_BASE = [
  "./",
  "index.html",
  "manifest.json",
  "css/style.css",
  "js/progresso.js",
  "js/montagem.js",
  "js/licao.js",
  "js/revisao.js",
  "js/trilha.js",
  "js/pwa.js",
  "js/app.js",
  "data/materias.json",
  "icons/icone-192.png",
  "icons/icone-512.png",
];

self.addEventListener("install", (evento) => {
  evento.waitUntil(guardarTudo().then(() => self.skipWaiting()));
});

self.addEventListener("activate", (evento) => {
  evento.waitUntil(apagarCachesAntigos().then(() => self.clients.claim()));
});

self.addEventListener("fetch", (evento) => {
  const pedido = evento.request;
  // Só cuida dos arquivos do próprio app
  if (pedido.method !== "GET" || new URL(pedido.url).origin !== self.location.origin) return;
  evento.respondWith(redePrimeiro(pedido));
});

async function guardarTudo() {
  const cache = await caches.open(VERSAO_CACHE);
  await cache.addAll(ARQUIVOS_BASE);
  // Uma lição que falhar não pode impedir a instalação do resto
  const licoes = await listarLicoes();
  await Promise.all(licoes.map((caminho) => cache.add(caminho).catch(() => null)));
}

// Lê o materias.json para baixar todas as lições já na instalação:
// assim o app funciona offline mesmo nas lições que ainda não foram abertas
async function listarLicoes() {
  try {
    const trilha = await (await fetch("data/materias.json")).json();
    const niveisPadrao = trilha.niveis.map((nivel) => nivel.id);
    const caminhos = [];
    trilha.materias.forEach((materia) => {
      materia.tempos.filter((tempo) => tempo.disponivel).forEach((tempo) => {
        (tempo.niveis || niveisPadrao).forEach((nivel) => {
          caminhos.push(`data/${[materia.id, tempo.id, nivel].filter(Boolean).join("/")}.json`);
        });
      });
    });
    return caminhos;
  } catch (erro) {
    return [];
  }
}

async function apagarCachesAntigos() {
  const nomes = await caches.keys();
  await Promise.all(nomes.filter((nome) => nome !== VERSAO_CACHE).map((nome) => caches.delete(nome)));
}

async function redePrimeiro(pedido) {
  const cache = await caches.open(VERSAO_CACHE);
  try {
    // "no-cache" = sempre confere com o servidor. Sem isso o navegador podia entregar
    // uma cópia velha do próprio cache HTTP e a atualização demorava a aparecer.
    // Um Request novo (só com a URL) porque o de navegação não aceita opções extras.
    const resposta = await fetch(new Request(pedido.url, { cache: "no-cache", credentials: "same-origin" }));
    if (resposta.ok) cache.put(pedido, resposta.clone());
    return resposta;
  } catch (erro) {
    const guardada = await cache.match(pedido, { ignoreSearch: true });
    return guardada || Response.error();
  }
}
