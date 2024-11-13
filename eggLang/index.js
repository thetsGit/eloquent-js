const { evaluate } = require('./evaluate.js');
const { parse } = require('./parse.js');
const { topScope } = require('./environment/topScope.js');

function run(program) {
  return evaluate(parse(program), Object.create(topScope));
}

run(`
do(define(plusOne, fun(a, +(a, 1))),
   print(plusOne(10)))
`);
// → 11

run(`
do(define(pow, fun(base, exp,
     if(==(exp, 0),
        1,
        *(base, pow(base, -(exp, 1)))))),
   print(pow(2, 10)))
`);
// → 1024
