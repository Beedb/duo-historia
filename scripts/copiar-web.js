// Copia só os arquivos do site para a pasta www/, que o Capacitor coloca dentro do APK.
// Por que não usar a raiz do projeto? Ela tem node_modules, android/ e docs/, que não fazem parte do app.
// Uso: npm run web

const fs = require("fs");
const path = require("path");

const RAIZ = path.join(__dirname, "..");
const DESTINO = path.join(RAIZ, "www");
const ITENS_DO_SITE = ["index.html", "manifest.json", "service-worker.js", "css", "js", "data", "icons"];

fs.rmSync(DESTINO, { recursive: true, force: true });
fs.mkdirSync(DESTINO);
for (const item of ITENS_DO_SITE) {
  fs.cpSync(path.join(RAIZ, item), path.join(DESTINO, item), { recursive: true });
}
console.log(`Site copiado para www/ (${ITENS_DO_SITE.length} itens).`);
