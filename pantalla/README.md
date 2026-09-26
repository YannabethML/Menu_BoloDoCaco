# Pantalla del stand

Bucle de 57 segundos en 16:9 para el televisor del stand. Nueve pantallas:
portada, el bolo solo, la promoción de dos, el de margarina de ajo, los dos
chorizos juntos, el de Nutella, el bolo de mel con las broas, el chorizo por
kilo con la mantequilla en pote, y el cierre con el Instagram.

El evento del día **no sale aquí**, aunque sí esté en el menú del QR: son
dos interruptores distintos a propósito. Para que aparezca también en el
televisor, pon `MOSTRAR_EVENTO = true` en `pantalla/pantalla.js`; entonces se
añade una pantalla antes del cierre y el bucle pasa a 60 segundos.

Los productos que se comparan entre sí comparten pantalla: así se ve la
diferencia de precio de un vistazo, sin tener que recordar la anterior.

## Dos formas de usarlo

**Televisor con pendrive** → copia `menu-pantalla-1080p.mp4` al pendrive,
conéctalo al televisor y activa la repetición automática (en el menú del
televisor suele llamarse *Repeat* o *Repetir todo*). 1920×1080, H.264, sin
audio: lo reproduce cualquier televisor de los últimos quince años.

**Laptop o tablet conectada al televisor** → abre `pantalla/index.html`
(o `.../pantalla/` en la web publicada) y pulsa **F11** para pantalla
completa. Se ve más nítido que el video y los precios salen directamente de
`data/menu.js`, así que se actualizan solos.

## Cuando cambien los precios

La página se actualiza sola. **El video no**: hay que volver a generarlo.

```bash
npm install playwright
pip install imageio-ffmpeg

python3 -m http.server 8340            # desde la raíz del proyecto
node tools/generar-video.js http://localhost:8340 pantalla/menu-pantalla-1080p.mp4
```

Tarda unos cuatro minutos. Dibuja el bucle fotograma a fotograma en vez de
grabar en tiempo real, así que sale idéntico en cualquier equipo y no se
pierde ningún cuadro.

## Ajustes

En `pantalla/pantalla.js`, arriba del todo:

| Variable | Qué hace |
|---|---|
| `DURACION` | Segundos de cada tipo de pantalla: portada, producto, pareja, evento y cierre |
| `FUNDIDO` | Segundos de cruce entre una y la siguiente |
| `PAREJAS` | Qué productos comparten pantalla, por su `id` |
| `MOSTRAR_EVENTO` | Si el evento del día sale también en el televisor |
| `LANG` | `'es'` o `'pt'` — el idioma de la pantalla del stand |

Al añadir un producto en `data/menu.js` aparece solo, en su propia pantalla.
Para que comparta pantalla con otro, añade la pareja a `PAREJAS`. Si un
producto de una pareja se borra, el otro pasa a mostrarse solo: no se rompe
nada.
