// Starts the dev servers:
//
//   yarn start        — the site (http://localhost:3000/frontend-notes/) and the demo (http://localhost:5173)
//   yarn start site   — the site only
//   yarn start ru     — the site in Russian (in dev, Docusaurus serves one locale at a time)
//   yarn start demo   — the demo app only

import { spawn } from 'node:child_process';

const COMMANDS = {
  site: 'docusaurus start website',
  ru: 'docusaurus start website --locale ru',
  demo: 'vite --configLoader runner --config website/demo/vite.config.ts',
};

const target = process.argv[2];

if (target && !(target in COMMANDS)) {
  console.error(`\n✖ Unknown target "${target}". Use: yarn start [site|ru|demo]\n`);
  process.exit(1);
}

const names = target ? [target] : ['site', 'demo'];

// yarn adds node_modules/.bin to PATH, so docusaurus and vite are available by name
const children = names.map((name) => spawn(COMMANDS[name], { shell: true, stdio: 'inherit' }));

// If one server crashes, stop the others too
for (const child of children) {
  child.on('exit', (code) => {
    if (code) {
      children.forEach((other) => other.kill());
      process.exit(code);
    }
  });
}
