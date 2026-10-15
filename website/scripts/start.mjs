// Запуск dev-серверов:
//
//   yarn start        — сайт (http://localhost:3000/frontend-notes/) и демо (http://localhost:5173)
//   yarn start site   — только сайт
//   yarn start demo   — только демо-приложение

import { spawn } from 'node:child_process';

const COMMANDS = {
  site: 'docusaurus start website',
  demo: 'vite --configLoader runner --config website/demo/vite.config.ts',
};

const target = process.argv[2];

if (target && !(target in COMMANDS)) {
  console.error(`\n✖ Неизвестная цель «${target}». Используйте: yarn start [site|demo]\n`);
  process.exit(1);
}

const names = target ? [target] : Object.keys(COMMANDS);

// yarn добавляет node_modules/.bin в PATH, поэтому docusaurus и vite доступны по имени
const children = names.map((name) => spawn(COMMANDS[name], { shell: true, stdio: 'inherit' }));

// Если один из серверов упал — останавливаем и остальные
for (const child of children) {
  child.on('exit', (code) => {
    if (code) {
      children.forEach((other) => other.kill());
      process.exit(code);
    }
  });
}
