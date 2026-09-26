/* =============================================================
   BOLO DO CACO FÁTIMA — Pantalla en bucle
   -------------------------------------------------------------
   Lee los mismos datos que el menú del QR (data/menu.js), así que
   cambiar un precio ahí lo cambia en los dos sitios.

   Expone window.PANTALLA.pintar(t) para poder grabar el video
   fotograma a fotograma, sin depender de la velocidad del equipo.
   ============================================================= */
(function () {
  'use strict';

  var DATA = window.MENU;
  if (!DATA) { console.error('[pantalla] falta data/menu.js'); return; }

  var LANG = 'es';          // idioma de la pantalla del stand
  var FUNDIDO = 0.9;        // segundos de cruce entre una y la siguiente
  var PREPARA = 1.0;        // segundos de antelación con que se prepara la siguiente

  /* Segundos de cada tipo de diapositiva. Las parejas y el evento duran más
     porque hay más que leer. */
  var DURACION = {
    portada: 5.5,
    producto: 6.0,
    pareja: 7.5,
    evento: 9.0,
    cierre: 5.5
  };

  /* ¿Sale el evento del día en la pantalla del stand? Es independiente del
     menú del QR: allí se controla con evento.active en data/menu.js. */
  var MOSTRAR_EVENTO = false;

  /* Productos que comparten diapositiva. El menú del QR los sigue mostrando
     por separado: esto es solo cómo se agrupan en la pantalla del stand. */
  var PAREJAS = [
    ['bolo-montserratina', 'bolo-portugues'],
    ['bolo-de-mel', 'broas'],
    ['chorizo-kilo', 'margarina-ajo']
  ];

  function t(o) { return o ? (o[LANG] || o.es || '') : ''; }
  function ui(k) { return DATA.ui[LANG][k] || DATA.ui.es[k] || ''; }
  function dinero(n) {
    var c = DATA.site.currency || '$';
    return c + (n % 1 === 0 ? n : n.toFixed(2));
  }
  function precioHTML(p) {
    var u = t(p.unit);
    return esc(dinero(p.price)) +
      (u ? '<span class="precio__unidad">' + esc(u) + '</span>' : '');
  }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function fondo(img) {
    if (!img) return '';
    var f = typeof img === 'string' ? img : img.file;
    var base = '../assets/img/' + f.replace(/\.[^.]+$/, '');
    var jpg = "url('../assets/img/" + f + "')";
    var formatos = (typeof img === 'string' ? [] : img.formats) || [];
    if (!formatos.length || !window.CSS || !CSS.supports) return jpg;
    var partes = formatos.map(function (x) {
      return "url('" + base + '.' + x + "') type('image/" + x + "')";
    });
    partes.push(jpg + " type('image/jpeg')");
    var v = 'image-set(' + partes.join(', ') + ')';
    return CSS.supports('background-image', v) ? v : jpg;
  }

  var IG = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="17.2" cy="6.8" r="1.2" fill="currentColor"/></svg>';

  /* ---------- construcción de las diapositivas ---------- */

  var lista = [];   // { html, oscura, foto (elemento a mover) }

  function portada() {
    return {
      dur: DURACION.portada,
      oscura: true,
      firma: false,
      html:
        '<div class="dia dia--portada">' +
          '<div class="portada__foto" data-kb style="background-image:' + fondo(DATA.site.heroImage) + '"></div>' +
          '<div class="portada__velo"></div>' +
          '<div class="portada__caja" data-entra>' +
            '<img class="portada__logo" src="../assets/img/logo-256.png" alt="">' +
            '<p class="portada__marca">' + esc(DATA.site.name) + '</p>' +
            '<h1 class="portada__titulo">Bolo do Caco</h1>' +
            '<span class="filete filete--centro"></span>' +
            '<p class="portada__lema">' + esc(t(DATA.site.tagline)) + '</p>' +
          '</div>' +
        '</div>'
    };
  }

  function producto(p, categoria) {
    var etiqueta = (p.badges && p.badges[0]) || '';
    var nombreEtiqueta = etiqueta ? (DATA.ui[LANG].badges || {})[etiqueta] || etiqueta : '';
    return {
      dur: DURACION.producto,
      oscura: false,
      firma: true,
      html:
        '<div class="dia dia--producto">' +
          '<div class="prod__marco">' +
            '<div class="prod__foto" data-kb style="background-image:' + fondo(p.image) + '"></div>' +
            '<div class="prod__borde"></div>' +
          '</div>' +
          '<div class="prod__caja" data-entra>' +
            '<p class="prod__categoria">' + esc(t(categoria.name)) + '</p>' +
            '<h2 class="prod__nombre">' + esc(t(p.name)) + '</h2>' +
            '<p class="prod__desc">' + esc(t(p.short)) + '</p>' +
            (etiqueta ? '<span class="prod__sello sello--' + esc(etiqueta) + '">' +
                        esc(nombreEtiqueta) + '</span>' : '') +
            '<p class="prod__precio">' + precioHTML(p) + '</p>' +
          '</div>' +
        '</div>'
    };
  }

  function pareja(ps, categoria) {
    var columnas = ps.map(function (p) {
      var etiqueta = (p.badges && p.badges[0]) || '';
      var nombreEtiqueta = etiqueta ? (DATA.ui[LANG].badges || {})[etiqueta] || etiqueta : '';
      return '<div class="par__col">' +
        '<div class="par__marco"><div class="par__foto" data-kb style="background-image:' +
          fondo(p.image) + '"></div>' +
          (etiqueta ? '<span class="par__sello sello--' + esc(etiqueta) + '">' +
                      esc(nombreEtiqueta) + '</span>' : '') +
        '</div>' +
        '<h3 class="par__nombre">' + esc(t(p.name)) + '</h3>' +
        '<p class="par__desc">' + esc(t(p.short)) + '</p>' +
        '<p class="par__precio">' + precioHTML(p) + '</p>' +
      '</div>';
    }).join('');

    return {
      dur: DURACION.pareja,
      oscura: false,
      firma: true,
      html:
        '<div class="dia dia--pareja">' +
          '<div class="azulejo"></div>' +
          '<div class="par__todo" data-entra>' +
            '<p class="prod__categoria par__categoria">' + esc(t(categoria.name)) + '</p>' +
            '<div class="par__rejilla">' + columnas + '</div>' +
          '</div>' +
        '</div>'
    };
  }

  function evento() {
    var ev = DATA.evento;
    var datos = (ev.facts || []).map(function (f) {
      return '<div class="ev__dato"><dt>' + esc(t(f.label)) + '</dt>' +
             '<dd>' + esc(t(f.value)) + '</dd></div>';
    }).join('');
    return {
      dur: DURACION.evento,
      oscura: false,
      firma: true,
      html:
        '<div class="dia dia--evento">' +
          '<div class="azulejo"></div>' +
          '<div data-entra style="display:flex;flex-direction:column;align-items:center">' +
            '<p class="ev__kicker">' + esc(ui('eventoKicker')) + '</p>' +
            '<h2 class="ev__titulo">' + esc(t(ev.name)) + '</h2>' +
            '<span class="filete filete--terracota filete--centro"></span>' +
            '<p class="ev__sub">' + esc(t(ev.subtitle)) + '</p>' +
            '<p class="ev__texto">' + esc(t(ev.text)) + '</p>' +
            (datos ? '<dl class="ev__datos">' + datos + '</dl>' : '') +
          '</div>' +
        '</div>'
    };
  }

  function cierre() {
    return {
      dur: DURACION.cierre,
      oscura: true,
      firma: false,
      html:
        '<div class="dia dia--cierre">' +
          '<div class="azulejo azulejo--oscuro"></div>' +
          '<div data-entra style="display:flex;flex-direction:column;align-items:center">' +
            '<img class="cierre__logo" src="../assets/img/logo-256.png" alt="">' +
            '<h2 class="cierre__titulo">' + esc(ui('orderAtStand')) + '</h2>' +
            '<span class="filete filete--centro"></span>' +
            '<span class="cierre__ig">' + IG + '<span>@' + esc(DATA.site.instagram) + '</span></span>' +
          '</div>' +
        '</div>'
    };
  }

  function construir() {
    lista.push(portada());

    var yaPuesto = {};
    DATA.categories.forEach(function (cat) {
      DATA.products.filter(function (p) { return p.category === cat.id; })
        .forEach(function (p) {
          if (yaPuesto[p.id]) return;

          var grupo = null;
          for (var i = 0; i < PAREJAS.length; i++) {
            if (PAREJAS[i].indexOf(p.id) > -1) { grupo = PAREJAS[i]; break; }
          }

          if (grupo) {
            var ps = grupo.map(function (id) {
              return DATA.products.filter(function (q) { return q.id === id; })[0];
            }).filter(Boolean);
            ps.forEach(function (q) { yaPuesto[q.id] = true; });
            /* si algún producto del grupo ya no existe, se muestra solo */
            lista.push(ps.length > 1 ? pareja(ps, cat) : producto(ps[0] || p, cat));
          } else {
            yaPuesto[p.id] = true;
            lista.push(producto(p, cat));
          }
        });
    });
    if (MOSTRAR_EVENTO && DATA.evento && DATA.evento.active) lista.push(evento());
    lista.push(cierre());

    var cont = document.getElementById('diapositivas');
    cont.innerHTML = lista.map(function (d) { return d.html; }).join('');
    var acumulado = 0;
    Array.prototype.forEach.call(cont.children, function (nodo, i) {
      lista[i].nodo = nodo;
      lista[i].fotos = Array.prototype.slice.call(nodo.querySelectorAll('[data-kb]'));
      lista[i].entra = nodo.querySelector('[data-entra]');
      if (lista[i].entra) lista[i].entra.style.opacity = 1;
      nodo.style.visibility = 'hidden';
      lista[i].pintando = false;
      lista[i].inicio = acumulado;
      acumulado += lista[i].dur;
    });
  }

  /* ---------- reloj ---------- */

  var TOTAL;
  var firma = document.getElementById('firma');
  var barra = document.getElementById('progresoBarra');

  function opacidad(a, dur) {
    /* a = segundos transcurridos desde que empieza esta diapositiva */
    if (a >= -FUNDIDO && a < 0) return (a + FUNDIDO) / FUNDIDO;   // entrando
    if (a >= 0 && a <= dur - FUNDIDO) return 1;                   // a plena vista
    if (a > dur - FUNDIDO && a <= dur) return (dur - a) / FUNDIDO;
    return 0;
  }

  /* Segundos transcurridos de esta diapositiva, contando el bucle: devuelve
     null si no le toca estar en pantalla. Antes se comparaban tres valores
     por separado y en el salto del final al principio la animación del texto
     retrocedía de golpe. */
  function fase(t0, d) {
    for (var k = -1; k <= 1; k++) {
      var a = t0 - d.inicio + k * TOTAL;
      /* se devuelve también el margen de preparación: la diapositiva se pinta
         antes de hacer falta, aunque siga invisible, para que el televisor no
         tenga que pintarla justo en el momento del cambio */
      if (a >= -(FUNDIDO + PREPARA) && a <= d.dur) return a;
    }
    return null;
  }

  function suave(p) { p = Math.min(1, Math.max(0, p)); return 1 - Math.pow(1 - p, 3); }

  function pintar(tiempo) {
    var t0 = ((tiempo % TOTAL) + TOTAL) % TOTAL;
    var visible = 0, mayor = -1;

    lista.forEach(function (d, i) {
      var a = fase(t0, d);

      if (a === null) {
        if (d.pintando) {
          /* fuera de su turno no se pinta: en un televisor modesto, nueve
             capas a pantalla completa componiendo a la vez hacen parpadear */
          d.nodo.style.visibility = 'hidden';
          d.nodo.style.willChange = 'auto';
          d.nodo.style.opacity = 0;
          d.pintando = false;
        }
        return;
      }

      if (!d.pintando) {
        d.nodo.style.visibility = 'visible';
        d.nodo.style.willChange = 'opacity';
        d.pintando = true;
      }

      var op = opacidad(a, d.dur);
      d.nodo.style.opacity = op;
      if (op > mayor) { mayor = op; visible = i; }

      /* acercamiento de la foto: continuo de principio a fin, sin saltos */
      var avance = (a + FUNDIDO) / (d.dur + FUNDIDO);
      d.fotos.forEach(function (f) {
        f.style.transform = 'scale(' + (1.05 - 0.05 * avance).toFixed(4) + ')';
      });

      /* el texto entra DURANTE el cruce, no después: así la diapositiva
         nueva nunca aparece con la foto puesta y el texto todavía invisible.
         No lleva opacidad propia; se desvanece con la diapositiva entera. */
      if (d.entra) {
        var e = suave((a + FUNDIDO) / (FUNDIDO + 0.35));
        d.entra.style.transform = 'translateY(' + (22 * (1 - e)).toFixed(2) + 'px)';
      }
    });

    var d = lista[visible];
    firma.classList.toggle('firma--oculta', !d.firma);
    firma.classList.toggle('firma--sobre-oscuro', !!d.oscura);
    barra.style.width = (t0 / TOTAL * 100).toFixed(3) + '%';
  }

  /* ---------- escalado al tamaño del televisor ---------- */

  function encajar() {
    var e = document.getElementById('escenario');
    var k = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
    e.style.transform = 'translate(-50%,-50%) scale(' + k + ')';
  }

  /* ---------- precarga de las fotos ---------- */

  /* Si el televisor descarta una foto mientras no se ve, al volver tiene que
     descodificarla otra vez y eso se nota como un tirón justo antes del
     cambio. Se cargan todas al arrancar y se guarda la referencia, para que
     no las suelte. */
  var retenidas = [];

  function admite(formato, muestra) {
    return new Promise(function (ok) {
      var i = new Image();
      i.onload = function () { ok(i.width > 0); };
      i.onerror = function () { ok(false); };
      i.src = muestra;
    });
  }

  function precargar() {
    var pruebas = {
      avif: 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=',
      webp: 'data:image/webp;base64,UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA=='
    };
    Promise.all([admite('avif', pruebas.avif), admite('webp', pruebas.webp)])
      .then(function (r) {
        var ext = r[0] ? 'avif' : (r[1] ? 'webp' : 'jpg');
        var fotos = DATA.products.map(function (p) { return p.image; })
          .concat([DATA.site.heroImage])
          .filter(Boolean)
          .map(function (img) {
            var f = typeof img === 'string' ? img : img.file;
            var formatos = (typeof img === 'string' ? [] : img.formats) || [];
            var usa = formatos.indexOf(ext) > -1 ? ext : 'jpg';
            return '../assets/img/' + f.replace(/\.[^.]+$/, '') + '.' + usa;
          });
        fotos.forEach(function (url) {
          var i = new Image();
          i.src = url;
          if (i.decode) i.decode().catch(function () {});
          retenidas.push(i);          // guardadas: así no se descartan
        });
      });
  }

  /* ---------- para verla en el televisor ---------- */

  /* Evita que la pantalla se apague sola mientras corre el bucle.
     Se vuelve a pedir si el televisor la suspende y regresa. */
  function mantenerDespierta() {
    if (!('wakeLock' in navigator)) return;
    var cerrojo = null;
    function pedir() {
      navigator.wakeLock.request('screen').then(function (c) {
        cerrojo = c;
        c.addEventListener('release', function () { cerrojo = null; });
      }).catch(function () { /* el navegador lo negó: seguimos igual */ });
    }
    pedir();
    document.addEventListener('visibilitychange', function () {
      if (document.visibilityState === 'visible' && !cerrojo) pedir();
    });
  }

  /* Botón de pantalla completa que se esconde solo, para no estorbar.
     Vuelve a aparecer al mover el ratón o pulsar cualquier tecla del control. */
  function botonPantallaCompleta() {
    var b = document.createElement('button');
    b.className = 'completa';
    b.type = 'button';
    b.textContent = 'Pantalla completa';
    b.addEventListener('click', function () {
      var d = document.documentElement;
      if (document.fullscreenElement) {
        (document.exitFullscreen || function(){}).call(document);
      } else {
        (d.requestFullscreen || d.webkitRequestFullscreen || function(){}).call(d);
      }
    });
    document.body.appendChild(b);

    var reloj;
    function mostrar() {
      b.classList.remove('completa--oculto');
      clearTimeout(reloj);
      reloj = setTimeout(function () { b.classList.add('completa--oculto'); }, 4000);
    }
    ['mousemove', 'keydown', 'click', 'touchstart'].forEach(function (e) {
      document.addEventListener(e, mostrar, { passive: true });
    });
    mostrar();
  }

  /* ---------- arranque ---------- */

  construir();
  TOTAL = lista.reduce(function (s, d) { return s + d.dur; }, 0);
  encajar();
  window.addEventListener('resize', encajar);

  window.PANTALLA = { pintar: pintar, total: TOTAL, diapositivas: lista.length };

  /* Reproducción automática. La grabación la desactiva con ?manual
     para ir fotograma a fotograma. */
  if (location.search.indexOf('manual') === -1) {
    precargar();
    mantenerDespierta();
    botonPantallaCompleta();
    var inicio = null;
    (function paso(ahora) {
      if (inicio === null) inicio = ahora;
      pintar((ahora - inicio) / 1000);
      requestAnimationFrame(paso);
    })(performance.now());
  } else {
    pintar(0);
  }
})();
