/* ═══════════════════════════════════════════════════════════════════
   ExpCode UI-Web · behaviors
   Developer: ExpCode
   ─────────────────────────────────────────────────────────────────
   toast, modal, drawer, dropdown, tabs, accordion, rating,
   copy, command palette
   ═══════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';
  if (window.__EXPCODE_UI_LOADED__) return;
  window.__EXPCODE_UI_LOADED__ = true;

  /* ─── Toast ─────────────────────────────────────────────────────── */
  var TOAST_ICONS = {
    success: '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>',
    error:   '<circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>',
    warn:    '<path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
    info:    '<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>'
  };
  var TOAST_COLORS = {
    success: 'text-accent',
    error:   'text-danger',
    warn:    'text-warn',
    info:    'text-info'
  };

  function ensureToastBox() {
    var box = document.getElementById('expcode-toasts');
    if (!box) {
      box = document.createElement('div');
      box.id = 'expcode-toasts';
      box.className = 'fixed bottom-4 right-4 z-[80] flex flex-col gap-2 items-end';
      document.body.appendChild(box);
    }
    return box;
  }

  function toast(message, type) {
    type = type || 'info';
    var el = document.createElement('div');
    el.className = 'toast';
    el.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" ' +
      'stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ' +
      'class="w-4 h-4 shrink-0 ' + (TOAST_COLORS[type] || '') + '">' +
      (TOAST_ICONS[type] || TOAST_ICONS.info) + '</svg><span>' + message + '</span>';
    ensureToastBox().appendChild(el);
    requestAnimationFrame(function () { el.classList.add('in'); });
    setTimeout(function () {
      el.classList.remove('in');
      setTimeout(function () { el.remove(); }, 320);
    }, 3000);
  }

  /* ─── Modal / Drawer ────────────────────────────────────────────── */
  function openModal(id) {
    var m = document.getElementById(id);
    if (!m) return;
    m.classList.add('open');
    document.body.style.overflow = 'hidden';
    var f = m.querySelector('[autofocus], button, input, a[href]');
    if (f) setTimeout(function () { f.focus(); }, 50);
  }

  function closeModal(id) {
    var m = document.getElementById(id);
    if (!m) return;
    m.classList.remove('open');
    if (!document.querySelector('.modal.open, #expcode-palette.open')) {
      document.body.style.overflow = '';
    }
  }

  function openDrawer(id) {
    var d = document.getElementById(id);
    if (!d) return;
    d.classList.add('open');
    var sc = document.getElementById(d.dataset.scrim);
    if (sc) sc.classList.add('open');
  }

  function closeDrawer(id) {
    var d = document.getElementById(id);
    if (!d) return;
    d.classList.remove('open');
    var sc = document.getElementById(d.dataset.scrim);
    if (sc) sc.classList.remove('open');
  }

  /* ─── Copy ──────────────────────────────────────────────────────── */
  function copy(text) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(function () {
        toast('Скопировано', 'success');
      });
    } else {
      var t = document.createElement('textarea');
      t.value = text;
      document.body.appendChild(t);
      t.select();
      document.execCommand('copy');
      t.remove();
      toast('Скопировано', 'success');
    }
  }

  /* ─── Command palette ───────────────────────────────────────────── */
  var PALETTE_ITEMS = [
    { icon: 'layout-dashboard', label: 'На главную',              href: '../index.html' },
    { icon: 'ruler',            label: 'Основы',                  href: 'foundations.html' },
    { icon: 'component',        label: 'Компоненты',              href: 'components.html' },
    { icon: 'puzzle',           label: 'Компоненты II',           href: 'components-extra.html' },
    { icon: 'workflow',         label: 'Паттерны',                href: 'patterns.html' },
    { icon: 'layout-template',  label: 'Готовые экраны',          href: 'screens.html' },
    { icon: 'inbox',            label: 'Состояния',               href: 'states.html' },
    { icon: 'palette',          label: 'Темы',                    href: 'themes.html' },
    { icon: 'flask-conical',    label: 'Playground',              href: 'playground.html' },
    { icon: 'sun-moon',         label: 'Сменить light / dark',    action: 'theme' },
    { icon: 'palette',          label: 'Тема: Nova',              action: 'theme:nova' },
    { icon: 'palette',          label: 'Тема: Midnight',          action: 'theme:midnight' },
    { icon: 'palette',          label: 'Тема: Sunset',            action: 'theme:sunset' },
    { icon: 'palette',          label: 'Тема: Forest',            action: 'theme:forest' },
    { icon: 'palette',          label: 'Тема: Corporate',         action: 'theme:corporate' },
    { icon: 'palette',          label: 'Тема: Mono',              action: 'theme:mono' },
    { icon: 'palette',          label: 'Тема: Brutal',            action: 'theme:brutal' },
    { icon: 'density',          label: 'Плотность: compact',      action: 'density:compact' },
    { icon: 'density',          label: 'Плотность: normal',       action: 'density:normal' },
    { icon: 'density',          label: 'Плотность: comfortable',  action: 'density:comfortable' },
    { icon: 'square',           label: 'Радиусы: sharp',          action: 'radius:sharp' },
    { icon: 'square',           label: 'Радиусы: normal',         action: 'radius:normal' },
    { icon: 'square',           label: 'Радиусы: pill',           action: 'radius:pill' }
  ];

  function renderPalette(q) {
    var list = document.getElementById('expcode-palette-list');
    if (!list) return;
    q = (q || '').toLowerCase().trim();
    var items = !q ? PALETTE_ITEMS : PALETTE_ITEMS.filter(function (i) {
      return i.label.toLowerCase().indexOf(q) !== -1;
    });
    if (!items.length) {
      list.innerHTML = '<div class="px-3 py-8 text-sm text-muted text-center">Ничего не найдено</div>';
      return;
    }
    list.innerHTML = items.map(function (i, idx) {
      var attrs = 'data-palette-item ' +
        (i.href ? 'data-palette-href="' + i.href + '" ' : '') +
        (i.action ? 'data-palette-action="' + i.action + '" ' : '');
      return '<button type="button" class="dd-item' + (idx === 0 ? ' active' : '') + '" ' + attrs + '>' +
        '<i data-lucide="' + i.icon + '" class="w-4 h-4"></i>' +
        '<span>' + i.label + '</span></button>';
    }).join('');
    if (window.lucide) lucide.createIcons();
  }

  function closePalette() {
    var p = document.getElementById('expcode-palette');
    if (!p) return;
    p.classList.remove('open');
    if (!document.querySelector('.modal.open')) {
      document.body.style.overflow = '';
    }
  }

  function togglePalette() {
    var p = document.getElementById('expcode-palette');
    if (!p) return;
    var willOpen = !p.classList.contains('open');
    p.classList.toggle('open', willOpen);
    if (willOpen) {
      document.body.style.overflow = 'hidden';
      var inp = p.querySelector('input');
      if (inp) {
        inp.value = '';
        setTimeout(function () { inp.focus(); }, 60);
      }
      renderPalette('');
    } else {
      document.body.style.overflow = '';
    }
  }

  function handlePaletteAction(action) {
    if (!action) return;
    var T = window.ExpCodeTheme;
    if (action === 'theme') {
      if (T) T.toggleMode();
      toast('Режим переключён', 'success');
      return;
    }
    if (action.indexOf('theme:') === 0) {
      var v = action.slice(6);
      if (T) T.setTheme(v);
      toast('Тема: ' + v, 'success');
      return;
    }
    if (action.indexOf('density:') === 0) {
      var d = action.slice(8);
      if (T) T.setDensity(d);
      toast('Плотность: ' + d, 'success');
      return;
    }
    if (action.indexOf('radius:') === 0) {
      var r = action.slice(7);
      if (T) T.setRadius(r);
      toast('Радиусы: ' + r, 'success');
    }
  }

  /* ─── Click delegation ──────────────────────────────────────────── */
  function bindClickDelegation() {
    document.addEventListener('click', function (e) {
      var t;

      t = e.target.closest('[data-modal-open]');
      if (t) { openModal(t.dataset.modalOpen); return; }

      t = e.target.closest('[data-modal-close]');
      if (t) { closeModal(t.dataset.modalClose); return; }

      t = e.target.closest('[data-drawer-open]');
      if (t) { openDrawer(t.dataset.drawerOpen); return; }

      t = e.target.closest('[data-drawer-close]');
      if (t) { closeDrawer(t.dataset.drawerClose); return; }

      t = e.target.closest('[data-copy]');
      if (t) { copy(t.dataset.copy); return; }

      t = e.target.closest('[data-toast]');
      if (t) { toast(t.dataset.toast, t.dataset.toastType || 'info'); return; }

      t = e.target.closest('[data-palette-item]');
      if (t) {
        var href = t.dataset.paletteHref;
        var action = t.dataset.paletteAction;
        closePalette();
        if (href) { window.location.href = href; return; }
        if (action) { handlePaletteAction(action); return; }
        return;
      }

      var p = document.getElementById('expcode-palette');
      if (p && p.classList.contains('open') && !e.target.closest('#expcode-palette')) {
        closePalette();
      }
    });
  }

  /* ─── Keyboard (capture phase!) ─────────────────────────────────── */
  function bindKeydown() {
    document.addEventListener('keydown', function (e) {
      var isMac = /Mac|iPhone|iPad|iPod/.test(navigator.platform);
      var modKey = isMac ? e.metaKey : e.ctrlKey;

      /* ⌘K / Ctrl+K — палитра.
         capture:true гарантирует, что мы перехватим раньше браузера
         и раньше любых других keydown-слушателей на странице. */
      if (modKey && (e.key === 'k' || e.key === 'K' || e.key === 'л' || e.key === 'Л')) {
        e.preventDefault();
        e.stopPropagation();
        togglePalette();
        return false;
      }

      /* / — открыть палитру, если фокус не в поле ввода */
      if (e.key === '/' && !e.metaKey && !e.ctrlKey && !e.altKey) {
        var active = document.activeElement;
        var inField = active && (
          active.tagName === 'INPUT' ||
          active.tagName === 'TEXTAREA' ||
          active.tagName === 'SELECT' ||
          active.isContentEditable
        );
        if (!inField) {
          e.preventDefault();
          togglePalette();
          return;
        }
      }

      if (e.key === 'Escape') {
        document.querySelectorAll('.modal.open').forEach(function (m) { closeModal(m.id); });
        document.querySelectorAll('.drawer.open').forEach(function (d) { closeDrawer(d.id); });
        closePalette();
      }
    }, true); /* ← capture phase */
  }

  /* ─── Palette input ─────────────────────────────────────────────── */
  function bindPaletteInput() {
    document.querySelectorAll('#expcode-palette input').forEach(function (inp) {
      if (inp.__paletteBound) return;
      inp.__paletteBound = true;
      inp.addEventListener('input', function () { renderPalette(inp.value); });
      inp.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
          var first = document.querySelector('#expcode-palette-list [data-palette-item]');
          if (first) first.click();
        }
      });
    });
  }

  /* ─── Dropdown ──────────────────────────────────────────────────── */
  function bindDropdown() {
    document.addEventListener('click', function (e) {
      var trigger = e.target.closest('.dd > [data-dd-trigger]');
      if (trigger) {
        var dd = trigger.closest('.dd');
        var wasOpen = dd.classList.contains('open');
        document.querySelectorAll('.dd.open').forEach(function (d) { d.classList.remove('open'); });
        if (!wasOpen) dd.classList.add('open');
        return;
      }
      if (!e.target.closest('.dd-menu')) {
        document.querySelectorAll('.dd.open').forEach(function (d) { d.classList.remove('open'); });
      }
    });
  }

  /* ─── Tabs ──────────────────────────────────────────────────────── */
  function bindTabs() {
    document.querySelectorAll('[data-tabs]').forEach(function (root) {
      if (root.__tabsBound) return;
      root.__tabsBound = true;
      var tabs = Array.prototype.slice.call(root.querySelectorAll('[data-tab]'));
      var panels = Array.prototype.slice.call(root.querySelectorAll('[data-panel]'));
      tabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
          tabs.forEach(function (t) { t.classList.toggle('is-active', t === tab); });
          panels.forEach(function (p) { p.hidden = (p.dataset.panel !== tab.dataset.tab); });
        });
      });
    });
  }

  /* ─── Accordion ─────────────────────────────────────────────────── */
  function bindAccordion() {
    document.querySelectorAll('.acc-head').forEach(function (h) {
      if (h.__accBound) return;
      h.__accBound = true;
      h.addEventListener('click', function () {
        h.closest('.acc-item').classList.toggle('open');
      });
    });
  }

  /* ─── Rating ────────────────────────────────────────────────────── */
  var STAR_PATH = '<path d="M12 2l2.9 6.9L22 9.6l-5.3 5.2 1.3 7.2L12 18.6l-6 3.4 1.3-7.2L2 9.6l7.1-.7z"/>';
  var SVG_OPEN = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">';

  function initRating(host) {
    var count = 5;
    var value = Math.max(1, Math.min(count, +host.dataset.value || 0));

    function paint(v) {
      host.querySelectorAll('button').forEach(function (b, i) {
        b.classList.toggle('is-filled', i < v);
      });
      var out = document.getElementById(host.id + 'Value');
      if (out) out.textContent = v;
      host.dataset.value = v;
    }

    host.innerHTML = '';
    for (var i = 0; i < count; i++) {
      var b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('aria-label', (i + 1) + ' из ' + count);
      b.dataset.rating = i + 1;
      b.innerHTML = SVG_OPEN + STAR_PATH + '</svg>';
      host.appendChild(b);
    }

    host.tabIndex = 0;

    host.addEventListener('click', function (e) {
      var b = e.target.closest('button[data-rating]');
      if (!b) return;
      value = +b.dataset.rating;
      paint(value);
      toast('Рейтинг: ' + value + ' / ' + count, 'success');
    });

    host.addEventListener('mouseover', function (e) {
      var b = e.target.closest('button[data-rating]');
      if (!b) return;
      var hover = +b.dataset.rating;
      host.querySelectorAll('button').forEach(function (btn, i) {
        btn.classList.toggle('is-hover', i < hover);
      });
    });

    host.addEventListener('mouseleave', function () {
      host.querySelectorAll('button').forEach(function (b) { b.classList.remove('is-hover'); });
    });

    host.addEventListener('keydown', function (e) {
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
      e.preventDefault();
      value += (e.key === 'ArrowRight' ? 1 : -1);
      value = Math.max(1, Math.min(count, value));
      paint(value);
    });

    paint(value);
  }

  function bindRatings() {
    document.querySelectorAll('.rating').forEach(function (h) {
      if (h.__ratingBound) return;
      h.__ratingBound = true;
      initRating(h);
    });
  }

  /* ─── Инициализация ─────────────────────────────────────────────── */
  function init() {
    if (window.__EXPCODE_UI_INIT_DONE__) return;
    window.__EXPCODE_UI_INIT_DONE__ = true;
    bindClickDelegation();
    bindKeydown();
    bindPaletteInput();
    bindDropdown();
    bindTabs();
    bindAccordion();
    bindRatings();
  }

  /* ─── Public API ────────────────────────────────────────────────── */
  window.ExpCodeUI = {
    toast: toast,
    openModal: openModal,
    closeModal: closeModal,
    openDrawer: openDrawer,
    closeDrawer: closeDrawer,
    copy: copy,
    togglePalette: togglePalette,
    closePalette: closePalette,
    renderPalette: renderPalette,
    refresh: function () {
      bindTabs();
      bindAccordion();
      bindPaletteInput();
      bindRatings();
      if (window.lucide) lucide.createIcons();
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();