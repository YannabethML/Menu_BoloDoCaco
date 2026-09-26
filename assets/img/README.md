# Imágenes

## Ya integradas

| Archivo | Se usa en |
|---|---|
| `hero-bolo.*` | Portada (recortada 3:4, sin la marca de agua del original) |
| `bolo-natural.*` | Bolo do Caco Grande |
| `bolo-monserratina.*` | Bolo do Caco con Chorizo Ahumado Monserratina |
| `bolo-portugues.*` | Bolo do Caco con Chorizo Portugués |
| `og-cover.jpg` | Vista previa al compartir el enlace (1200 × 630) |
| `logo.png` | Logo maestro, 1200 px, fondo transparente |
| `logo-256.png` | Logo de la cabecera y del icono de la app |
| `logo-512.webp` | Logo para usos grandes (carteles, redes) |
| `bolo-ovo.*` | **Sin asignar** — es el bolo relleno de huevo y perejil; no está en la carta |

Cada foto se genera en tres formatos: `.avif` (el más ligero), `.webp` y `.jpg`
de reserva. El navegador elige el que admite, así que el menú carga rápido en
datos móviles sin perder calidad.

## Faltan

- **Bolo do Caco con Margarina de Ajo y Perejil** → `bolo-ajo.jpg`
- **Bolo do Caco con Nutella** → `bolo-nutella.jpg`
- **Bolo de Mel** → `bolo-de-mel.jpg`
- **Galletas Broas** → `broas.jpg`

Mientras no existan, el menú muestra un mosaico de azulejo con la inicial del
producto: no se ve roto, se ve intencional.

## Cómo añadir una foto nueva

1. Deja el original (sin comprimir) en esta carpeta.
2. Genera los tres formatos con el script `tools/procesar-imagenes.py`.
3. En `data/menu.js`, en el producto correspondiente:

```js
image: { file: "bolo-ajo.jpg", formats: ["avif", "webp"] }
```

Si solo tienes el JPG y no quieres generar los otros formatos:

```js
image: "bolo-ajo.jpg"
```

## Medidas recomendadas al fotografiar

| Uso | Proporción | Mínimo |
|---|---|---|
| Portada | 3:4 vertical | 1400 × 1900 px |
| Productos | vertical u horizontal, se recorta a cuadrado | 1200 px de lado |

Luz natural lateral, sin flash directo, fondo neutro y el producto con algo de
aire alrededor para que el recorte cuadrado no lo corte.
