// Starts the dev servers:
//
//   yarn start        — English site (:3000), Russian site (:3001) and the demo (:5173)
//   yarn start site   — the English site only
//   yarn start ru     — the Russian site only
//   yarn start demo   — the demo app only
//
// In dev, Docusaurus serves one locale per server, so both languages run side by side
// and the language switcher links between them (see devLocaleUrls in docusaurus.config.ts).

import { spawn } from 'node:child_process';

const COMMANDS = {
  site: { command: 'docusaurus start website --port 3000' },
  ru: {
    command: 'docusaurus start website --locale ru --port 3001 --no-open',
    // Its own generated-files folder, so the two Docusaurus servers don't overwrite each other's .docusaurus
    env: { DOCUSAURUS_GENERATED_FILES_DIR_NAME: '.docusaurus-ru' },
  },
  demo: { command: 'vite --configLoader runner --config website/demo/vite.config.ts' },
};

const target = process.argv[2];

if (target && !(target in COMMANDS)) {
  console.error(`\n✖ Unknown target "${target}". Use: yarn start [site|ru|demo]\n`);
  process.exit(1);
}

const names = target ? [target] : Object.keys(COMMANDS);

// yarn adds node_modules/.bin to PATH, so docusaurus and vite are available by name
const children = names.map((name) =>
  spawn(COMMANDS[name].command, {
    shell: true,
    stdio: 'inherit',
    env: { ...process.env, ...COMMANDS[name].env },
  }),
);

// If one server crashes, stop the others too
for (const child of children) {
  child.on('exit', (code) => {
    if (code) {
      children.forEach((other) => other.kill());
      process.exit(code);
    }
  });
}
