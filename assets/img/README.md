# Cómo añadir las fotos

Deja los archivos en esta carpeta y luego apunta a ellos desde `data/menu.js`.

## Nombres recomendados

| Producto / uso                  | Archivo                        |
|---------------------------------|--------------------------------|
| Hero (portada)                  | `hero-bolo.jpg`                |
| Bolo do Caco Grande             | `bolo-natural.jpg`             |
| Con margarina de ajo y perejil  | `bolo-ajo.jpg`                 |
| Con chorizo Monserratina        | `bolo-monserratina.jpg`        |
| Con chorizo portugués           | `bolo-portugues.jpg`           |
| Con Nutella                     | `bolo-nutella.jpg`             |
| Bolo de Mel                     | `bolo-de-mel.jpg`              |
| Broas                           | `broas.jpg`                    |
| Vista previa al compartir enlace| `og-cover.jpg` (1200 × 630 px) |
| Logo                            | `logo.svg` (o `logo.png`)      |

## Cómo conectarlas en `data/menu.js`

Opción simple (una sola imagen JPG):

```js
image: "bolo-ajo.jpg"
```

Opción óptima (cuando también existan las versiones AVIF/WebP del mismo nombre):

```js
image: { file: "bolo-ajo.jpg", formats: ["avif", "webp"] }
```

Para el hero, en el bloque `site`:

```js
heroImage: "hero-bolo.jpg"
```

## Medidas

| Uso                | Proporción | Mínimo        |
|--------------------|-----------|---------------|
| Hero               | 3:4 vertical | 1400 × 1900 px |
| Tarjetas de bolos  | 4:3 horizontal | 1400 × 1050 px |
| Doçaria            | 1:1 cuadrado | 900 × 900 px |

Mientras una foto no exista, el menú muestra un mosaico de azulejo con la
inicial del producto: no se ve roto, se ve intencional.
