/* =============================================================
   BOLO DO CACO FÁTIMA — app.js
   Vanilla JS, sin dependencias. Render desde window.MENU.
   ============================================================= */
(function () {
  'use strict';

  var DATA = window.MENU;
  if (!DATA) { console.error('[menu] data/menu.js no se cargó'); return; }

  var LANGS = ['es', 'pt'];
  var STORE_KEY = 'bdc.lang';
  var lang = readLang();

  /* ---------- utilidades ---------- */

  function readLang() {
    try {
      var saved = localStorage.getItem(STORE_KEY);
      if (saved && LANGS.indexOf(saved) > -1) return saved;
    } catch (e) { /* modo privado: seguimos con el idioma del navegador */ }
    var nav = (navigator.language || 'es').slice(0, 2).toLowerCase();
    return nav === 'pt' ? 'pt' : 'es';
  }

  function saveLang(v) {
    try { localStorage.setItem(STORE_KEY, v); } catch (e) { /* sin persistencia */ }
  }

  function t(obj) {
    if (obj == null) return '';
    if (typeof obj === 'string') return obj;
    return obj[lang] || obj.es || '';
  }

  function ui(key) { return DATA.ui[lang][key] || DATA.ui.es[key] || ''; }

  function money(n) {
    var c = DATA.site.currency || '$';
    return c + (n % 1 === 0 ? n : n.toFixed(2));
  }

  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* ---------- iconos SVG inline ---------- */

  var ICON = {
    arrow: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="17.2" cy="6.8" r="1.2" fill="currentColor"/></svg>',
    dough: '<svg viewBox="0 0 32 32" aria-hidden="true" focusable="false"><path d="M4 21c0-5 5.4-9 12-9s12 4 12 9" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M3 21h26a1 1 0 010 2H3a1 1 0 010-2z" fill="currentColor"/><path d="M11 16.5c1.2-1 2.6-1 3.8 0M17.5 15c1.2-1 2.6-1 3.8 0" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" opacity=".6"/></svg>',
    lume: '<svg viewBox="0 0 32 32" aria-hidden="true" focusable="false"><path d="M5 24l3-5h16l3 5z" fill="currentColor" opacity=".25"/><path d="M5 24h22" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" fill="none"/><ellipse cx="16" cy="15" rx="8" ry="3.4" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M11 9.5c0-1.6 1-2.2 1-3.5M16 8.5c0-1.6 1-2.2 1-3.5M21 9.5c0-1.6 1-2.2 1-3.5" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" opacity=".6"/></svg>',
    stand: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M4 10h16v9a1 1 0 01-1 1H5a1 1 0 01-1-1z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M3 10l1.6-4.4A1 1 0 015.5 5h13a1 1 0 01.9.6L21 10c0 1.4-1.1 2.5-2.5 2.5S16 11.4 16 10c0 1.4-1.1 2.5-2.5 2.5S11 11.4 11 10c0 1.4-1.1 2.5-2.5 2.5S6 11.4 6 10" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M10 20v-4.5h4V20" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>',
    butter: '<svg viewBox="0 0 32 32" aria-hidden="true" focusable="false"><path d="M6 17c0-4.4 4.5-8 10-8s10 3.6 10 8v1c0 3.3-4.5 6-10 6S6 21.3 6 18z" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M6 17c3 2.4 7 3.4 10 3.4S23 19.4 26 17" fill="none" stroke="currentColor" stroke-width="1.4" opacity=".6"/><path d="M13 12.5l1.5 1.5 3-3" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>'
  };

  /* ---------- media (foto o placeholder de azulejo) ---------- */

  function mediaMarkup(item, ratioClass) {
    var img = item.image;
    var alt = esc(t(item.name) || '');
    var inner;

    if (!img) {
      inner = '<div class="ph"><span class="ph__letter" aria-hidden="true">' +
        esc((t(item.name) || 'B').charAt(0)) + '</span>' +
        '<span class="ph__note">' + esc(ui('photoSoon')) + '</span></div>';
    } else if (typeof img === 'string') {
      inner = '<img src="assets/img/' + esc(img) + '" alt="' + alt + '" loading="lazy" decoding="async">';
    } else {
      var base = img.file.replace(/\.[^.]+$/, '');
      var sources = (img.formats || []).map(function (f) {
        return '<source type="image/' + esc(f) + '" srcset="assets/img/' + esc(base) + '.' + esc(f) + '">';
      }).join('');
      inner = '<picture>' + sources +
        '<img src="assets/img/' + esc(img.file) + '" alt="' + alt + '" loading="lazy" decoding="async"></picture>';
    }
    return '<div class="media ' + (ratioClass || '') + '">' + inner + '</div>';
  }

  function badgesMarkup(list) {
    if (!list || !list.length) return '';
    return '<div class="badges">' + list.map(function (b) {
      var label = (DATA.ui[lang].badges || {})[b] || b;
      return '<span class="badge badge--' + esc(b) + '">' + esc(label) + '</span>';
    }).join('') + '</div>';
  }

  /* ---------- render del menú ---------- */

  var menuRoot = document.getElementById('menu');
  var catnavList = document.getElementById('catnavList');

  function productsOf(catId) {
    return DATA.products.filter(function (p) { return p.category === catId; });
  }

  function renderMenu() {
    menuRoot.innerHTML = '';
    catnavList.innerHTML = '';

    DATA.categories.forEach(function (cat) {
      var items = productsOf(cat.id);
      if (!items.length) return;

      /* chip de navegación */
      var li = el('li');
      li.innerHTML = '<a class="chip" href="#' + esc(cat.id) + '" data-chip="' + esc(cat.id) + '">' +
        esc(t(cat.name)) + '</a>';
      catnavList.appendChild(li);

      /* sección */
      var sec = el('section', 'section' + (cat.hero ? ' section--hero' : ''));
      sec.id = cat.id;
      sec.setAttribute('aria-labelledby', cat.id + '-title');

      var head = el('div', 'section__head reveal');
      head.innerHTML =
        '<p class="kicker">' + esc(t(cat.kicker)) + '</p>' +
        '<h2 class="section__title" id="' + esc(cat.id) + '-title">' + esc(t(cat.name)) + '</h2>' +
        '<span class="flourish' + (cat.hero ? '' : ' flourish--dark') + '" aria-hidden="true"></span>' +
        (t(cat.tagline) ? '<p class="section__tagline">' + esc(t(cat.tagline)) + '</p>' : '');
      sec.appendChild(head);

      sec.appendChild(cat.hero ? buildCarousel(items) : buildGrid(items));
      if (cat.hero) sec.appendChild(buildStory());

      menuRoot.appendChild(sec);
    });

    /* pestaña del evento del día, solo si hay uno activo */
    if (DATA.evento && DATA.evento.active) {
      var liEv = el('li');
      liEv.innerHTML = '<a class="chip" href="#evento" data-chip="evento">' +
        esc(ui('eventoChip')) + '</a>';
      catnavList.appendChild(liEv);
    }

    catnavList.parentElement.setAttribute('aria-label', ui('menuLabel'));
  }

  /* carrusel de la sección monográfica */
  function buildCarousel(items) {
    var wrapEl = el('div', 'carousel reveal');
    var track = el('div', 'carousel__track');
    track.setAttribute('role', 'list');

    items.forEach(function (p) {
      var card = el('button', 'bolo');
      card.type = 'button';
      card.setAttribute('role', 'listitem');
      card.dataset.id = p.id;
      card.innerHTML =
        '<div class="bolo__media">' + mediaMarkup(p, 'media--11') +
          '<span class="bolo__price">' + esc(money(p.price)) + '</span>' +
          (p.badges && p.badges.length ? '<span class="bolo__badges">' + badgesMarkup(p.badges) + '</span>' : '') +
        '</div>' +
        '<div class="bolo__body">' +
          '<h3 class="bolo__name">' + esc(t(p.name)) + '</h3>' +
          '<p class="bolo__short">' + esc(t(p.short)) + '</p>' +
          '<span class="bolo__more">' + esc(ui('viewMore')) + ICON.arrow + '</span>' +
        '</div>';
      track.appendChild(card);
    });

    var dots = el('div', 'carousel__dots');
    items.forEach(function (p, i) {
      var d = el('button', 'dot' + (i === 0 ? ' is-active' : ''));
      d.type = 'button';
      d.setAttribute('aria-label', t(p.name));
      d.addEventListener('click', function () {
        var target = track.children[i];
        var center = target.offsetLeft - track.offsetLeft
          - (track.clientWidth - target.offsetWidth) / 2;
        track.scrollTo({ left: Math.max(0, center), behavior: 'smooth' });
      });
      dots.appendChild(d);
    });

    track.addEventListener('scroll', function () {
      var mid = track.scrollLeft + track.clientWidth / 2;
      var best = 0, bestD = Infinity;
      for (var i = 0; i < track.children.length; i++) {
        var c = track.children[i];
        var d = Math.abs(c.offsetLeft - track.offsetLeft + c.offsetWidth / 2 - mid);
        if (d < bestD) { bestD = d; best = i; }
      }
      for (var j = 0; j < dots.children.length; j++) {
        dots.children[j].classList.toggle('is-active', j === best);
      }
    }, { passive: true });

    wrapEl.appendChild(track);
    wrapEl.appendChild(dots);
    return wrapEl;
  }

  /* grid del resto de categorías */
  function buildGrid(items) {
    var grid = el('div', 'grid reveal');
    items.forEach(function (p) {
      var card = el('button', 'card');
      card.type = 'button';
      card.dataset.id = p.id;
      card.innerHTML =
        '<div class="card__media">' + mediaMarkup(p, 'media--11') + '</div>' +
        '<div class="card__body">' +
          '<h3 class="card__name">' + esc(t(p.name)) + '</h3>' +
          '<p class="card__short">' + esc(t(p.short)) + '</p>' +
          '<div class="card__foot">' +
            '<span class="card__price">' + esc(money(p.price)) + '</span>' +
            (p.badges && p.badges.length ? badgesMarkup(p.badges) : '') +
          '</div>' +
        '</div>';
      grid.appendChild(card);
    });
    return grid;
  }

  /* tira narrativa */
  function buildStory() {
    var box = el('div', 'story reveal');
    (DATA.story || []).forEach(function (s) {
      var item = el('div', 'story__item');
      item.innerHTML =
        '<span class="story__icon" aria-hidden="true">' + (ICON[s.icon] || '') + '</span>' +
        '<div><p class="story__title">' + esc(t(s.title)) + '</p>' +
        '<p class="story__text">' + esc(t(s.text)) + '</p></div>';
      box.appendChild(item);
    });
    return box;
  }

  /* ---------- enlaces de contacto ---------- */

  function igLink() {
    return 'https://instagram.com/' + DATA.site.instagram;
  }

  function renderEvento() {
    var sec = document.getElementById('evento');
    var ev = DATA.evento;
    if (!ev || !ev.active) { sec.hidden = true; return; }

    sec.hidden = false;
    document.getElementById('eventoKicker').textContent = ui('eventoKicker');
    document.getElementById('evento-title').textContent = t(ev.name);

    var sub = document.getElementById('eventoSubtitle');
    sub.textContent = t(ev.subtitle);
    sub.hidden = !t(ev.subtitle);

    document.getElementById('eventoText').textContent = t(ev.text);

    var facts = document.getElementById('eventoFacts');
    facts.innerHTML = '';
    (ev.facts || []).forEach(function (f) {
      var box = el('div', 'fact');
      box.innerHTML = '<dt class="fact__label">' + esc(t(f.label)) + '</dt>' +
                      '<dd class="fact__value">' + esc(t(f.value)) + '</dd>';
      facts.appendChild(box);
    });
    facts.hidden = !(ev.facts && ev.facts.length);
  }

  function renderFooter() {
    var a = document.getElementById('footerIg');
    a.href = igLink();
    a.innerHTML = ICON.instagram + '<span>@' + esc(DATA.site.instagram) + '</span>';
    a.setAttribute('aria-label', ui('igLabel'));
  }

  function renderFab() {
    var fab = document.getElementById('fab');
    document.getElementById('fabIcon').innerHTML = ICON.instagram;
    document.getElementById('fabLabel').textContent = ui('follow');
    fab.href = igLink();
    fab.setAttribute('aria-label', ui('igLabel') + ' @' + DATA.site.instagram);
  }

  /* ---------- textos estáticos e idioma ---------- */

  function applyStatic() {
    document.documentElement.lang = lang;
    document.documentElement.dataset.lang = lang;

    document.querySelectorAll('[data-i18n]').forEach(function (node) {
      var path = node.dataset.i18n.split('.');
      var val = path[0] === 'ui' ? ui(path[1]) : t((DATA.site || {})[path[1]]);
      if (val) node.textContent = val;
    });

    document.querySelectorAll('[data-lang-btn]').forEach(function (b) {
      var on = b.dataset.langBtn === lang;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });

    document.querySelector('.sheet__close').setAttribute('aria-label', ui('close'));
    document.querySelector('.skip-link').textContent =
      lang === 'pt' ? 'Ir para o menu' : 'Ir al menú';
  }

  function setLang(next) {
    if (next === lang) return;
    lang = next;
    saveLang(next);
    applyStatic();
    renderMenu();
    renderEvento();
    renderFooter();
    renderFab();
    observeAll();
    if (sheetState.id) openSheet(sheetState.id, true);
  }

  document.querySelectorAll('[data-lang-btn]').forEach(function (b) {
    b.addEventListener('click', function () { setLang(b.dataset.langBtn); });
  });

  /* ---------- hero ---------- */

  function renderHero() {
    var media = document.getElementById('heroMedia');
    var img = DATA.site.heroImage;
    if (!img) { media.className = 'hero__media azulejo'; return; }

    var file = typeof img === 'string' ? img : img.file;
    var formats = (typeof img === 'string' ? [] : img.formats) || [];
    var base = 'assets/img/' + file.replace(/\.[^.]+$/, '');
    var fallback = "url('assets/img/" + file + "')";

    media.className = 'hero__media has-photo';
    media.style.backgroundImage = fallback;

    /* AVIF/WebP cuando el navegador los admite, con reserva a JPG */
    if (formats.length && window.CSS && CSS.supports) {
      var parts = formats.map(function (f) {
        return "url('" + base + "." + f + "') type('image/" + f + "')";
      });
      parts.push(fallback + " type('image/jpeg')");
      var value = 'image-set(' + parts.join(', ') + ')';
      if (CSS.supports('background-image', value)) media.style.backgroundImage = value;
    }
  }

  /* ---------- bottom sheet ---------- */

  var sheet = document.getElementById('sheet');
  var sheetPanel = sheet.querySelector('.sheet__panel');
  var sheetState = { id: null, lastFocus: null };

  function findProduct(id) {
    return DATA.products.filter(function (p) { return p.id === id; })[0];
  }

  function openSheet(id, keepScroll) {
    var p = findProduct(id);
    if (!p) return;
    sheetState.id = id;
    if (!keepScroll) sheetState.lastFocus = document.activeElement;

    document.getElementById('sheetMedia').innerHTML = mediaMarkup(p, '');
    document.getElementById('sheetBadges').innerHTML = badgesMarkup(p.badges);
    document.getElementById('sheetTitle').textContent = t(p.name);
    document.getElementById('sheetPrice').textContent = money(p.price);
    document.getElementById('sheetDesc').textContent = t(p.long) || t(p.short);

    document.getElementById('sheetActions').innerHTML =
      '<p class="sheet__stand">' + ICON.stand +
      '<span>' + esc(ui('orderAtStand')) + '</span></p>';

    if (keepScroll) return;

    sheet.hidden = false;
    document.body.classList.add('is-locked');
    requestAnimationFrame(function () {
      sheet.classList.add('is-open');
      sheetPanel.scrollTop = 0;
      sheet.querySelector('.sheet__close').focus();
    });
  }

  function closeSheet() {
    if (!sheetState.id) return;
    sheet.classList.remove('is-open');
    document.body.classList.remove('is-locked');
    var focus = sheetState.lastFocus;
    sheetState.id = null;
    window.setTimeout(function () { sheet.hidden = true; }, 340);
    if (focus && focus.focus) focus.focus();
  }

  document.addEventListener('click', function (e) {
    var trigger = e.target.closest('[data-id]');
    if (trigger) { openSheet(trigger.dataset.id); return; }
    if (e.target.closest('[data-sheet-close]')) closeSheet();
  });

  document.addEventListener('keydown', function (e) {
    if (!sheetState.id) return;
    if (e.key === 'Escape') { closeSheet(); return; }
    if (e.key !== 'Tab') return;
    /* focus trap */
    var f = sheetPanel.querySelectorAll('a[href],button:not([disabled])');
    if (!f.length) return;
    var first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });

  /* deslizar hacia abajo para cerrar */
  (function enableSwipe() {
    var y0 = null, dy = 0;
    sheetPanel.addEventListener('touchstart', function (e) {
      if (sheetPanel.scrollTop > 0) { y0 = null; return; }
      y0 = e.touches[0].clientY; dy = 0;
    }, { passive: true });
    sheetPanel.addEventListener('touchmove', function (e) {
      if (y0 === null) return;
      dy = e.touches[0].clientY - y0;
      if (dy > 0) sheetPanel.style.transform = 'translateY(' + dy + 'px)';
    }, { passive: true });
    sheetPanel.addEventListener('touchend', function () {
      if (y0 === null) return;
      sheetPanel.style.transform = '';
      if (dy > 110) closeSheet();
      y0 = null;
    });
  })();

  /* ---------- scroll-spy + estado de la cabecera ---------- */

  function setActiveChip(id) {
    document.querySelectorAll('[data-chip]').forEach(function (c) {
      c.classList.toggle('is-active', c.dataset.chip === id);
    });
  }

  var spy = null;
  function observeSections() {
    if (spy) spy.disconnect();
    spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) setActiveChip(en.target.id);
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

    DATA.categories.forEach(function (c) {
      var n = document.getElementById(c.id);
      if (n) spy.observe(n);
    });
    var ev = document.getElementById('evento');
    if (ev && !ev.hidden) spy.observe(ev);
  }

  var revealer = null;
  function observeReveals() {
    if (revealer) revealer.disconnect();
    revealer = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('is-in');
          revealer.unobserve(en.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: .08 });
    document.querySelectorAll('.reveal').forEach(function (n) { revealer.observe(n); });
  }

  function observeAll() { observeSections(); observeReveals(); }

  /* cabecera sólida al pasar el hero + FAB que se esconde en el hero */
  (function scrollUi() {
    var topbar = document.getElementById('topbar');
    var fab = document.getElementById('fab');
    var hero = document.getElementById('hero');
    var ticking = false;

    function update() {
      ticking = false;
      var bottom = hero.getBoundingClientRect().bottom;
      topbar.classList.toggle('is-stuck', bottom <= topbar.offsetHeight + 2);
    }
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();

    new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        fab.classList.toggle('is-hidden', en.intersectionRatio > .55);
      });
    }, { threshold: [0, .55, 1] }).observe(hero);
  })();

  /* ---------- arranque ---------- */

  renderHero();
  applyStatic();
  renderMenu();
  renderEvento();
  renderFooter();
  renderFab();
  observeAll();
})();
