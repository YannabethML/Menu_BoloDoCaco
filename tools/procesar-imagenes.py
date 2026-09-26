#!/usr/bin/env python3
"""
Convierte las fotos originales a los formatos que usa el menú.

    pip install Pillow
    python3 tools/procesar-imagenes.py assets/img/bolo-ajo.jpg

Genera, junto al original, el .avif y el .webp del mismo nombre, redimensionados
a 900 px de ancho. Luego basta con apuntar a la foto desde data/menu.js:

    image: { file: "bolo-ajo.jpg", formats: ["avif", "webp"] }
"""
import os
import sys

from PIL import Image, ImageFilter

ANCHO = 900
CALIDAD = {"jpg": 84, "webp": 80, "avif": 58}


def procesar(ruta):
    base, _ = os.path.splitext(ruta)
    img = Image.open(ruta).convert("RGB")
    if img.width > ANCHO:
        alto = round(img.height * ANCHO / img.width)
        img = img.resize((ANCHO, alto), Image.LANCZOS)
        img = img.filter(ImageFilter.UnsharpMask(radius=1.2, percent=55, threshold=3))

    img.save(base + ".jpg", quality=CALIDAD["jpg"], optimize=True, progressive=True)
    img.save(base + ".webp", quality=CALIDAD["webp"], method=6)
    img.save(base + ".avif", quality=CALIDAD["avif"])

    for ext in ("jpg", "webp", "avif"):
        destino = base + "." + ext
        print("  %-40s %4d KB" % (destino, os.path.getsize(destino) // 1024))


if __name__ == "__main__":
    if len(sys.argv) < 2:
        sys.exit("Uso: python3 tools/procesar-imagenes.py FOTO [FOTO...]")
    for ruta in sys.argv[1:]:
        print(ruta)
        procesar(ruta)
