// Fill in this regular expression.
let number = /^[-+]?(\p{N}+\.?\p{N}*|\.\p{N}+)(e[-+]?\p{N}+)?$/iu;

// Tests:
for (let str of [
  '1',
  '-1',
  '+15',
  '1.55',
  '.5',
  '5.',
  '55.555',
  '5345345.',
  '.34343',
  '3434.4343',
  '1.3e2',
  '1E-4',
  '1e+12',
]) {
  if (!number.test(str)) {
    console.log(`Failed to match '${str}'`);
  }
}
for (let str of ['1a', '+-1', '1.2.3', '1+1', '1e4.5', '.5.', '1f5', '.']) {
  if (number.test(str)) {
    console.log(`Incorrectly accepted '${str}'`);
  }
}
