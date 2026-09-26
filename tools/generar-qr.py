#!/usr/bin/env python3
"""
Genera los códigos QR del menú.

    pip install segno pillow
    python3 tools/generar-qr.py [URL]

Crea en qr/ las tres versiones: negra, de marca y con el logo en el centro.
"""
import os
import sys

import segno
from PIL import Image, ImageDraw

URL = sys.argv[1] if len(sys.argv) > 1 else 'https://bolodocacofatima.github.io/'
OUT = 'qr/'

# Nivel H de corrección de errores: admite que hasta un 30% del código quede
# tapado y aun así se lea. Es lo que hace posible poner el logo encima.
qr = segno.make(URL, error='h')

os.makedirs(OUT, exist_ok=True)
for nombre, oscuro, claro in (('qr-menu-negro', '#000000', '#FFFFFF'),
                              ('qr-menu-marca', '#221D1A', '#FAF6EE')):
    qr.save(OUT + nombre + '.svg', scale=10, border=4, dark=oscuro, light=claro)
    qr.save(OUT + nombre + '.png', scale=40, border=4, dark=oscuro, light=claro)

# Versión con el logo: ocupa un 20% del ancho, holgadamente por debajo del
# 30% que el nivel H tolera, sobre un disco crema que lo separa del código.
base = Image.open(OUT + 'qr-menu-marca.png').convert('RGBA')
w = base.width
logo = Image.open('assets/img/logo.png').convert('RGBA')
lado = int(w * 0.20)
logo = logo.resize((lado, lado), Image.LANCZOS)

disco = Image.new('RGBA', (int(lado * 1.16),) * 2, (0, 0, 0, 0))
ImageDraw.Draw(disco).ellipse((0, 0, disco.width - 1, disco.height - 1), fill=(250, 246, 238, 255))
base.alpha_composite(disco, ((w - disco.width) // 2, (w - disco.height) // 2))
base.alpha_composite(logo, ((w - lado) // 2, (w - lado) // 2))
base.convert('RGB').save(OUT + 'qr-menu-logo.png', optimize=True)

print('Códigos generados para', URL)
for f in sorted(os.listdir(OUT)):
    print(f'  {f:24} {os.path.getsize(OUT + f) // 1024:5} KB')
