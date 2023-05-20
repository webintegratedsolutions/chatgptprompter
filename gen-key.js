const jose = require('jose');
const { generateKeyPairSync } = jose.JWK;

const key = generateKeyPairSync('oct', { size: 512, alg: 'HS512' });
console.log(key.toPEM(true));
