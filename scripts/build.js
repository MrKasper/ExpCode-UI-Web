/* Собирает dist/nova.css, dist/nova.js, dist/components/*.js
   без внешних зависимостей — обычная конкатенация. */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const COMPONENTS_DIR = path.join(DIST, 'components');

function ensure(p) { if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true }); }
function read(p) { return fs.readFileSync(path.join(ROOT, p), 'utf8'); }
function write(p, s) { fs.writeFileSync(path.join(DIST, p), s); }

ensure(DIST);
ensure(COMPONENTS_DIR);

// CSS
const css = read('assets/css/tokens.css') + '\n' + read('assets/css/base.css');
write('nova.css', css);
console.log('✔ dist/nova.css');

// JS
const js =
  read('assets/js/theme.js') + '\n' +
  read('assets/js/ui.js');
write('nova.js', js);
console.log('✔ dist/nova.js');

// Заготовки компонентов (для CLI)
const COMPONENTS = {
  'button': `export const Button = ({ variant='primary', size='md', label='', icon='' }) => \`
  <button class="btn btn-\${size} btn-\${variant}">
    \${icon ? \`<i data-lucide="\${icon}" class="w-4 h-4"></i>\` : ''}
    \${label}
  </button>\`;`,
  'badge': `export const Badge = ({ variant='primary', label='', dot=false }) => \`
  <span class="badge badge-\${variant}">
    \${dot ? '<span class="w-1.5 h-1.5 rounded-full bg-current"></span>' : ''}
    \${label}
  </span>\`;`,
  'input': `export const Input = ({ label='', placeholder='', error=false, icon='' }) => \`
  <div>
    \${label ? \`<label class="lbl">\${label}</label>\` : ''}
    <input class="inp \${error ? 'inp-error' : ''}" placeholder="\${placeholder}">
  </div>\`;`,
  // остальные можно добавить по мере надобности
};

Object.keys(COMPONENTS).forEach(function (name) {
  fs.writeFileSync(path.join(COMPONENTS_DIR, name + '.js'), COMPONENTS[name]);
});
console.log('✔ dist/components/*.js (' + Object.keys(COMPONENTS).length + ')');