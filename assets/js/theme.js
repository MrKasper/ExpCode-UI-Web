/* Nova UI · theme controller
   Управляет: темой палитры, light/dark/auto, density, radius.
   API: NovaTheme.setTheme(...) / setMode(...) / setDensity(...) / setRadius(...)
*/
(function () {
  var STORE = {
    theme:   'nova-theme',     // nova | midnight | sunset | forest | corporate | mono | brutal
    mode:    'nova-mode',      // light | dark | auto
    density: 'nova-density',   // compact | normal | comfortable
    radius:  'nova-radius',    // sharp | normal | pill
  };

  var THEMES = ['nova','midnight','sunset','forest','corporate','mono','brutal'];
  var MODES  = ['light','dark','auto'];
  var DENS   = ['compact','normal','comfortable'];
  var RADII  = ['sharp','normal','pill'];

  function get(k) { try { return localStorage.getItem(STORE[k]); } catch (e) { return null; } }
  function set(k, v) { try { localStorage.setItem(STORE[k], v); } catch (e) {} }

  function apply() {
    var root = document.documentElement;

    // Тема палитры
    var theme = get('theme') || 'nova';
    if (THEMES.indexOf(theme) < 0) theme = 'nova';
    root.setAttribute('data-theme', theme);

    // Режим
    var mode = get('mode') || 'light';
    if (MODES.indexOf(mode) < 0) mode = 'light';
    var isDark = mode === 'dark' ||
                 (mode === 'auto' && matchMedia('(prefers-color-scheme: dark)').matches);
    root.classList.toggle('dark', isDark);

    // Density / radius
    var den = get('density') || 'normal';
    if (DENS.indexOf(den) < 0) den = 'normal';
    if (den === 'normal') root.removeAttribute('data-density');
    else root.setAttribute('data-density', den);

    var rad = get('radius') || 'normal';
    if (RADII.indexOf(rad) < 0) rad = 'normal';
    if (rad === 'normal') root.removeAttribute('data-radius');
    else root.setAttribute('data-radius', rad);

    // meta theme-color
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      var css = getComputedStyle(root).getPropertyValue('--c-bg').trim();
      if (css) meta.setAttribute('content', 'rgb(' + css + ')');
    }

    // события наружу
    document.dispatchEvent(new CustomEvent('nova:theme-change', {
      detail: { theme: theme, mode: mode, isDark: isDark, density: den, radius: rad }
    }));
  }

  // Авто-реакция на системную тему
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function () {
    if ((get('mode') || 'light') === 'auto') apply();
  });

  var NovaTheme = {
    THEMES: THEMES, MODES: MODES, DENSITIES: DENS, RADII: RADII,
    getTheme:   function () { return get('theme')   || 'nova'; },
    getMode:    function () { return get('mode')    || 'light'; },
    getDensity: function () { return get('density') || 'normal'; },
    getRadius:  function () { return get('radius')  || 'normal'; },
    setTheme:   function (v) { set('theme',   v); apply(); },
    setMode:    function (v) { set('mode',    v); apply(); },
    setDensity: function (v) { set('density', v); apply(); },
    setRadius:  function (v) { set('radius',  v); apply(); },
    toggleMode: function () {
      var cur = this.getMode();
      this.setMode(cur === 'dark' ? 'light' : 'dark');
      return this.getMode();
    },
  };

  window.NovaTheme = NovaTheme;
  apply();
})();