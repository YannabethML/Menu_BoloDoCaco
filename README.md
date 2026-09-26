# Menú digital — Bolo do Caco Fátima, C.A.

Menú para escanear con código QR. Mobile-first, bilingüe (ES/PT), estático y
sin dependencias: HTML5, CSS3 y JavaScript vanilla.

**Un pedazo de Portugal en cada bocado.**

---

## Antes de cada evento

El menú se escanea en el stand, así que la última sección cuenta **qué se
celebra ese día**. Se cambia en `data/menu.js`, en el bloque `evento`:

```js
evento: {
  active: true,                       // false = la sección desaparece sola
  name:     { es: "A Vindima", pt: "A Vindima" },
  subtitle: { es: "La fiesta de la vendimia portuguesa", pt: "..." },
  text:     { es: "Dos o tres frases sobre la tradición...", pt: "..." },
  facts: [                            // opcional, hasta tres
    { label: { es: "Cuándo", pt: "Quando" },
      value: { es: "De finales de agosto a octubre", pt: "..." } }
  ]
}
```

Con `active: false` desaparecen tanto la sección como su pestaña en la barra
de categorías, sin tocar nada más.

Esto manda solo sobre el menú del QR. La pantalla del televisor tiene su
propio interruptor, `MOSTRAR_EVENTO` en `pantalla/pantalla.js`, para poder
contar el evento en el móvil sin alargar el bucle del stand.

## Cómo editar el menú

Todo el contenido está en un solo archivo: **`data/menu.js`**.
Precios, nombres, descripciones, categorías, WhatsApp y fotos se cambian ahí.
No hace falta tocar el HTML, el CSS ni el JS.

```js
{
  id: "bolo-ajo",
  category: "bolo-do-caco",
  price: 5,                       // solo el número, sin el $
  badges: ["estrella"],
  image: null,                    // "bolo-ajo.jpg" cuando exista la foto
  name:  { es: "...", pt: "..." },
  short: { es: "...", pt: "..." }, // una línea, se ve en la tarjeta
  long:  { es: "...", pt: "..." }  // se ve al abrir el detalle
}
```

### Pendientes de rellenar


Nada. El contacto es solo Instagram: el menú se escanea en el stand y el
pedido se hace ahí mismo, así que no lleva botones de encargo.

## Vista previa

Doble clic en `index.html` funciona sin servidor (los datos se cargan con
`<script>`, no con `fetch`). Para servirlo en local:

```bash
python3 -m http.server 8000   # → http://localhost:8000
```

## Publicar en GitHub Pages

Publicado en **https://bolodocacofatima.github.io/**

El repositorio se llama igual que la organización más `.github.io`, que es la
convención de GitHub para servir en la raíz: por eso la dirección no lleva
carpeta detrás. Se configura en *Settings → Pages → Deploy from a branch*.

Todas las rutas del proyecto son relativas y hay un `.nojekyll`, así que el
sitio funciona igual servido desde la raíz o desde una subcarpeta. El QR debe
apuntar a esa dirección.

## Estructura

```
index.html              Marcado semántico; el menú se inyecta desde los datos
site.webmanifest        Para "añadir a pantalla de inicio" (se abre como app)
favicon.svg
data/menu.js            ← ÚNICO archivo de contenido
assets/css/styles.css   Tokens de color, tipografía y componentes
assets/js/app.js        Render, idioma, carrusel, scroll-spy, bottom sheet
                        y la sección del evento del día
assets/img/             Fotos (avif/webp/jpg), logo y patrón de azulejo
pantalla/               Bucle 16:9 para el televisor del stand + el MP4
tools/                  Scripts: convertir fotos y generar el video
assets/fonts/           Fraunces + Inter (variables, subsets, OFL)
```

## Decisiones técnicas

- **Sin frameworks.** 7 productos y 2 categorías no justifican React; el peso
  total de código es ~50 KB sin comprimir.
- **Fuentes auto-alojadas** (Fraunces + Inter variables, subsets `latin` y
  `latin-ext` con diacríticos portugueses), `font-display: swap` y `preload`
  de las dos que se ven en el primer pintado.
- **Cero salto de diseño (CLS 0):** todas las cajas de imagen tienen
  `aspect-ratio` reservado antes de cargar la foto.
- **Modo oscuro automático** con `prefers-color-scheme`, sobre los mismos tokens.
- **Accesibilidad:** navegación por teclado, `focus trap` en el detalle, cierre
  con `Esc` o deslizando hacia abajo, contraste AA, áreas de toque ≥ 44 px y
  respeto por `prefers-reduced-motion`.
- **Idioma** detectado del navegador y recordado en `localStorage` (envuelto en
  `try/catch` para modo privado).
