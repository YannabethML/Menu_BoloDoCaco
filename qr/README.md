# Códigos QR del menú

Todos apuntan a **https://bolodocacofatima.github.io/**

| Archivo | Para qué |
|---|---|
| `qr-menu-logo.png` | El bonito: colores de la casa con el logo en el centro |
| `qr-menu-marca.svg` / `.png` | Basalto sobre crema, sin logo |
| `qr-menu-negro.svg` / `.png` | Negro sobre blanco: el más fiable de todos |

**Los `.svg` son los buenos para imprimir.** No se pixelan nunca: sirven igual
para una tarjeta de mesa que para un cartel de dos metros. Dáselos a la
imprenta. Los `.png` son para pantalla, redes o si el programa que uses no
acepta SVG.

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

Hay que regenerarlos. El código que los hizo está en `tools/generar-qr.py`.
