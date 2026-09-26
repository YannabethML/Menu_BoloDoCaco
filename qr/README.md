# Códigos QR del menú

Todos apuntan a **https://bolodocacofatima.github.io/**

| Archivo | Para qué |
|---|---|
| `hoja-qr-carta.pdf` | **Hoja carta con 6 tarjetas para recortar**, con los colores de la casa |
| `hoja-qr-carta-blanco.pdf` | La misma en blanco, gasta bastante menos tinta |
| `qr-menu-logo.png` | El bonito: colores de la casa con el logo en el centro |
| `qr-menu-marca.svg` / `.png` | Basalto sobre crema, sin logo |
| `qr-menu-negro.svg` / `.png` | Negro sobre blanco: el más fiable de todos |

**Los `.svg` son los buenos para imprimir.** No se pixelan nunca: sirven igual
para una tarjeta de mesa que para un cartel de dos metros. Dáselos a la
imprenta. Los `.png` son para pantalla, redes o si el programa que uses no
acepta SVG.

## La hoja de 6 tarjetas

Tamaño carta, seis tarjetas de **10 × 8,8 cm** en dos columnas. Cada una lleva
el logo, el código, la llamada en español y portugués, y el Instagram. Las
líneas punteadas son las guías de corte: un corte vertical y dos
horizontales.

Al imprimir, elige **Tamaño real** o **100%**, nunca "ajustar a la página":
si la escala cambia, el código encoge y puede dejar de leerse.

El código sale a unos **3,7 cm de lado**, que es cómodo para escanear desde
medio metro. Los seis se comprobaron renderizando el PDF a 300 ppp y
pasándolos por un lector: los seis devuelven la dirección correcta.

## Tamaño al imprimir

La regla práctica: el lado del código debe medir al menos **la décima parte de
la distancia desde la que se va a escanear**.

| Dónde | Lado mínimo | Se escanea desde |
|---|---|---|
| Tarjeta en la mesa | 3 cm | 30 cm |
| Cartel del mostrador | 10 cm | 1 m |
| Pendón o banner | 30 cm | 3 m |

Siempre con un **margen blanco alrededor** de al menos el ancho de cuatro
cuadritos (ya viene incluido en los archivos: no lo recortes).

## Lo que nunca hay que hacer

- Invertir los colores: el código tiene que ser **oscuro sobre claro**, nunca al revés.
- Imprimirlo sobre una foto o un fondo con dibujos.
- Estirarlo: siempre cuadrado, nunca ovalado.
- Taparlo más de lo que ya lo tapa el logo.

## Verificación

Los tres se comprobaron con un lector real, reducidos hasta 120 px, y los tres
devuelven la dirección correcta. El de logo usa corrección de errores alta
(nivel H): tolera que hasta un 30% quede tapado, y el logo ocupa solo un 20%.

## Si algún día cambia la dirección

Hay que regenerarlos. Los códigos se rehacen con `tools/generar-qr.py` y la
hoja de tarjetas con `tools/generar-hoja-qr.js`.
