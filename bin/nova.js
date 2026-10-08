#!/usr/bin/env node
/* Nova UI · CLI
   npx nova add button        — копирует компонент в src/components/
   npx nova list              — список доступных компонентов
   npx nova theme midnight    — устанавливает тему по умолчанию
   npx nova init              — создаёт nova.config.js и копирует assets/
*/
const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, '..', 'dist', 'components');
const CMD = process.argv[2];
const ARG = process.argv[3];

const AVAILABLE = [
  'button', 'badge', 'input', 'card', 'modal', 'drawer', 'toast',
  'dropdown', 'tabs', 'accordion', 'combobox', 'date-picker', 'calendar',
  'timeline', 'tree', 'data-grid', 'notification', 'stepper', 'chip-input'
];

function list() {
  console.log('\nNova UI · доступные компоненты:\n');
  AVAILABLE.forEach(function (c) { console.log('  •', c); });
  console.log('\nУстановка:  npx nova add <имя>');
  console.log('Цель:       ./src/components/ (измени через nova.config.js)\n');
}

function add(name) {
  if (!name) { console.error('Укажи имя компонента. Список: npx nova list'); process.exit(1); }
  if (AVAILABLE.indexOf(name) < 0) { console.error('Не найдено:', name); process.exit(1); }

  const cfgPath = path.join(process.cwd(), 'nova.config.js');
  const cfg = fs.existsSync(cfgPath) ? require(cfgPath) : { outDir: 'src/components' };
  const outDir = path.join(process.cwd(), cfg.outDir);

  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const src = path.join(SRC, name + '.js');
  if (!fs.existsSync(src)) {
    console.error('Файл компонента не найден в пакете. Собери: npm run build');
    process.exit(1);
  }

  const dst = path.join(outDir, name + '.js');
  fs.copyFileSync(src, dst);
  console.log('✔ Компонент добавлен →', path.relative(process.cwd(), dst));
}

function init() {
  const cfg = `/* Nova UI · конфиг проекта */
module.exports = {
  outDir: 'src/components',
  theme: 'nova',
  density: 'normal',
  radius: 'normal',
  mode: 'light',
};
`;
  if (!fs.existsSync('nova.config.js')) {
    fs.writeFileSync('nova.config.js', cfg);
    console.log('✔ Создан nova.config.js');
  }
  console.log('Готово. Установи компоненты: npx nova add button');
}

switch (CMD) {
  case 'list':  list(); break;
  case 'add':   add(ARG); break;
  case 'init':  init(); break;
  default:
    console.log(`Nova UI CLI

Использование:
  nova init               Создать nova.config.js
  nova list               Список компонентов
  nova add <имя>          Скопировать компонент в проект
`);
}