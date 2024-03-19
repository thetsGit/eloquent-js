// NOTE: eloquent-js (v2)

const { readFileSync } = require('fs');

function customRequire(name) {
  try {
    const data = readFileSync(name, 'utf8');
    const code = new Function('exports', data);
    const exports = {};

    code(exports);

    return exports;
  } catch (err) {
    console.error(err);
  }
}

console.log(customRequire(`${__dirname}/weekDay.js`).name(1));
// → Monday
