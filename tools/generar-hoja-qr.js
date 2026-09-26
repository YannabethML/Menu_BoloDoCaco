/**
 * Genera la hoja carta con 6 tarjetas QR en PDF, lista para imprimir.
 *
 *   npm install playwright
 *   python3 -m http.server 8350      # desde la raíz del proyecto
 *   node tools/generar-hoja-qr.js http://localhost:8350
 *
 * Saca dos archivos en qr/: la versión de marca, con el fondo crema de la
 * casa, y una en blanco que gasta bastante menos tinta.
 */
const { chromium } = require('playwright');

const BASE = process.argv[2] || 'http://localhost:8350';

(async () => {
  const navegador = await chromium.launch({ executablePath: process.env.CHROME || undefined });
  const pagina = await navegador.newPage();
  const fallos = [];
  pagina.on('requestfailed', r => fallos.push('no cargó ' + r.url()));

  for (const [sufijo, salida] of [['', 'qr/hoja-qr-carta.pdf'],
                                  ['?blanco', 'qr/hoja-qr-carta-blanco.pdf']]) {
    await pagina.goto(BASE + '/qr/hoja-carta.html' + sufijo, { waitUntil: 'networkidle' });
    await pagina.waitForTimeout(900);          // que asienten fuentes e imágenes
    await pagina.pdf({
      path: salida,
      format: 'Letter',
      printBackground: true,
      preferCSSPageSize: true
    });
    console.log('  ' + salida);
  }

  await navegador.close();
  console.log(fallos.length ? 'AVISOS: ' + fallos.join(' | ') : 'Sin recursos que fallaran');
})();
