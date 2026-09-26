/**
 * Genera el MP4 de la pantalla en bucle, a partir de pantalla/index.html.
 *
 * Dibuja el bucle fotograma a fotograma (no graba en tiempo real), así que
 * el resultado es idéntico en cualquier equipo y no se salta ningún cuadro.
 * Los fotogramas van directos a ffmpeg por tubería: no se escriben en disco.
 *
 * Requisitos:
 *   npm install playwright
 *   pip install imageio-ffmpeg        (trae un ffmpeg con H.264)
 *
 * Uso:
 *   python3 -m http.server 8340          # desde la raíz del proyecto
 *   node tools/generar-video.js http://localhost:8340 menu-pantalla.mp4
 */
const { chromium } = require('playwright');
const { spawn, execSync } = require('child_process');

const BASE   = process.argv[2] || 'http://localhost:8340';
const SALIDA = process.argv[3] || 'menu-pantalla.mp4';
const FPS    = 25;
const ANCHO  = 1920;
const ALTO   = 1080;

function rutaFfmpeg() {
  if (process.env.FFMPEG) return process.env.FFMPEG;
  return execSync('python3 -c "import imageio_ffmpeg;print(imageio_ffmpeg.get_ffmpeg_exe())"')
    .toString().trim();
}

(async () => {
  const navegador = await chromium.launch({
    executablePath: process.env.CHROME || undefined,
    args: ['--force-device-scale-factor=1', '--hide-scrollbars']
  });
  const pagina = await navegador.newPage({ viewport: { width: ANCHO, height: ALTO } });
  const fallos = [];
  pagina.on('pageerror', e => fallos.push(e.message));
  pagina.on('requestfailed', r => fallos.push('no cargó ' + r.url()));

  await pagina.goto(BASE + '/pantalla/?manual', { waitUntil: 'networkidle' });
  await pagina.waitForTimeout(1500);           // que asienten fuentes y fotos

  const total = await pagina.evaluate(() => PANTALLA.total);
  const cuadros = Math.round(total * FPS);
  console.log(`Bucle de ${total}s · ${cuadros} fotogramas a ${FPS} fps`);

  const ffmpeg = spawn(rutaFfmpeg(), [
    '-y', '-f', 'image2pipe', '-framerate', String(FPS), '-i', 'pipe:0',
    '-c:v', 'libx264', '-preset', 'medium', '-crf', '20',
    '-pix_fmt', 'yuv420p', '-profile:v', 'high', '-level', '4.0',
    '-movflags', '+faststart', '-an', SALIDA
  ], { stdio: ['pipe', 'ignore', 'pipe'] });

  let errFfmpeg = '';
  ffmpeg.stderr.on('data', d => { errFfmpeg += d.toString(); });

  const inicio = Date.now();
  for (let i = 0; i < cuadros; i++) {
    await pagina.evaluate(t => PANTALLA.pintar(t), i / FPS);
    const jpg = await pagina.screenshot({ type: 'jpeg', quality: 94 });
    if (!ffmpeg.stdin.write(jpg)) {
      await new Promise(r => ffmpeg.stdin.once('drain', r));
    }
    if (i % 250 === 0 || i === cuadros - 1) {
      const s = (Date.now() - inicio) / 1000;
      const falta = i ? Math.round(s / i * (cuadros - i)) : 0;
      console.log(`  ${i + 1}/${cuadros}  ·  quedan ~${falta}s`);
    }
  }

  ffmpeg.stdin.end();
  await new Promise((ok, mal) => {
    ffmpeg.on('close', c => c === 0 ? ok() : mal(new Error('ffmpeg salió con ' + c + '\n' + errFfmpeg.slice(-1200))));
  });
  await navegador.close();

  console.log(fallos.length ? 'AVISOS: ' + fallos.join(' | ') : 'Sin errores en la página');
  console.log('Listo:', SALIDA);
})();
