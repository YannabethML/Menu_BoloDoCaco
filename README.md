# Menú digital — Bolo do Caco Fátima, C.A.

Menú para escanear con código QR. Mobile-first, bilingüe (ES/PT), estático y
sin dependencias: HTML5, CSS3 y JavaScript vanilla.

**El sabor de Madeira, en cada evento.**

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

Solo queda el **número de WhatsApp** → `site.whatsapp` en `data/menu.js`, con
solo dígitos y código de país (ej. `"584121234567"`). Mientras esté vacío, el
botón flotante enlaza a Instagram automáticamente.

## Vista previa

Doble clic en `index.html` funciona sin servidor (los datos se cargan con
`<script>`, no con `fetch`). Para servirlo en local:

```bash
python3 -m http.server 8000   # → http://localhost:8000
```

## Publicar en GitHub Pages

*Settings → Pages → Source: Deploy from a branch → rama `main`, carpeta `/ (root)`.*

Ya está preparado: `index.html` en la raíz, `.nojekyll` incluido y todas las
rutas son relativas, así que funciona igual en `usuario.github.io/repo/`.
El QR debe apuntar a esa URL.

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
tools/                  Script para convertir fotos nuevas
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
