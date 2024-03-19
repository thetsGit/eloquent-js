// NOTE: eloquent-js (v2)

const { readFileSync } = require('fs');

function improvedRequire(name) {
  if (name in improvedRequire.cache) return improvedRequire.cache[name];

  try {
    const data = readFileSync(name, 'utf8');
    const code = new Function('exports, module', data);
    const exports = {},
      module = { exports: exports };

    code(exports, module);

    improvedRequire.cache[name] = module.exports;
    return module.exports;
  } catch (err) {
    console.error(err);
  }
}

improvedRequire.cache = Object.create(null);

// console.log(improvedRequire(`${__dirname}/weekDay.js`)(1));
// → Monday
