import { randomFillSync, randomUUID, webcrypto } from 'node:crypto';
import { resolve } from 'node:path';

if (!globalThis.crypto || typeof globalThis.crypto.getRandomValues !== 'function') {
  globalThis.crypto = webcrypto ?? {
    getRandomValues(typedArray) {
      return randomFillSync(typedArray);
    },
    randomUUID: randomUUID ? () => randomUUID() : undefined,
  };
}

const [, , commandOrFlag, ...rest] = process.argv;
const args = [];
if (commandOrFlag) {
  args.push(commandOrFlag, ...rest);
}
process.argv = ['node', 'vite', ...args];

const viteCli = `file://${resolve('node_modules/vite/bin/vite.js')}`;
await import(viteCli);
