let text = "'I'm the cook,' he said, 'it's my job.'";

// Using look-ahead "?<=", "?="
console.log(text.replace(/(?<=^|\P{L})'|'(?=$|\P{L})/gu, '"'));

// Using group replacement $1, $2
console.log(text.replace(/(^|\P{L})'|'($|\P{L})/gu, '$1"$2'));
