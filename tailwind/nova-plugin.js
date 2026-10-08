/* Nova UI · Tailwind plugin
   Подключается в tailwind.config.js:
   plugins: [require('nova-ui-kit/tailwind/nova-plugin')]
*/
const plugin = require('tailwindcss/plugin');

module.exports = plugin.withOptions(function () {
  return function ({ addBase, addComponents, addUtilities, theme }) {
    addBase({
      ':root': {
        '--c-bg': '246 247 251',
        '--c-surface': '255 255 255',
        '--c-line': '230 233 240',
        '--c-ink': '15 23 42',
        '--c-primary': '99 102 241',
        '--c-accent': '16 185 129',
      },
      'html.dark': {
        '--c-bg': '7 11 20',
        '--c-surface': '15 22 38',
        '--c-line': '30 39 64',
        '--c-ink': '232 236 245',
        '--c-primary': '129 140 248',
        '--c-accent': '52 211 153',
      },
    });

    addUtilities({
      '.text-ink': { color: 'rgb(var(--c-ink))' },
      '.text-muted': { color: 'rgb(var(--c-muted))' },
      '.bg-bg': { background: 'rgb(var(--c-bg))' },
      '.bg-surface': { background: 'rgb(var(--c-surface))' },
      '.border-line': { borderColor: 'rgb(var(--c-line))' },
    });
  };
}, function () {
  return {
    theme: {
      extend: {
        colors: {
          bg: 'rgb(var(--c-bg) / <alpha-value>)',
          surface: 'rgb(var(--c-surface) / <alpha-value>)',
          line: 'rgb(var(--c-line) / <alpha-value>)',
          ink: 'rgb(var(--c-ink) / <alpha-value>)',
          primary: 'rgb(var(--c-primary) / <alpha-value>)',
          accent: 'rgb(var(--c-accent) / <alpha-value>)',
        },
      },
    },
  };
});