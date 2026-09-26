# Pantalla del stand

Bucle de 72 segundos en 16:9 para el televisor del stand. Doce pantallas:
portada, los cinco Bolo do Caco, los cuatro dulces, el evento del día y el
cierre con el Instagram.

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
| `DURACION` | Segundos por pantalla (6 por defecto) |
| `FUNDIDO` | Segundos de cruce entre una y la siguiente |
| `LANG` | `'es'` o `'pt'` — el idioma de la pantalla del stand |

El bucle dura `DURACION × número de pantallas`. Al añadir un producto en
`data/menu.js` aparece solo, y el video se alarga seis segundos.
