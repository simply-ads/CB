const nodeCrypto = require('node:crypto');

if (!globalThis.crypto || typeof globalThis.crypto.getRandomValues !== 'function') {
  if (nodeCrypto.webcrypto) {
    globalThis.crypto = nodeCrypto.webcrypto;
  } else {
    globalThis.crypto = {
      getRandomValues(typedArray) {
        return nodeCrypto.randomFillSync(typedArray);
      },
      randomUUID: nodeCrypto.randomUUID
        ? () => nodeCrypto.randomUUID()
        : undefined,
    };
  }
}
