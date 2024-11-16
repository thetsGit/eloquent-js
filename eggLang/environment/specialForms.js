const { evaluate } = require('../evaluate.js');

const specialForms = Object.create(null);

specialForms.if = (args, scope) => {
  if (args.length != 3) {
    throw new SyntaxError('Wrong number of args to if');
  } else if (evaluate(args[0], scope) !== false) {
    return evaluate(args[1], scope);
  } else {
    return evaluate(args[2], scope);
  }
};

specialForms.while = (args, scope) => {
  if (args.length != 2) {
    throw new SyntaxError('Wrong number of args to while');
  }
  while (evaluate(args[0], scope) !== false) {
    evaluate(args[1], scope);
  }

  // Since undefined does not exist in Egg, we return false,
  // for lack of a meaningful result
  return false;
};

specialForms.do = (args, scope) => {
  let value = false;
  for (let arg of args) {
    value = evaluate(arg, scope);
  }
  return value;
};

specialForms.define = (args, scope) => {
  if (args.length != 2 || args[0].type != 'word') {
    throw new SyntaxError('Incorrect use of define');
  }
  let value = evaluate(args[1], scope);
  scope[args[0].name] = value;
  return value;
};

specialForms.fun = (args, scope) => {
  if (!args.length) {
    throw new SyntaxError('Functions need a body');
  }
  let body = args[args.length - 1];
  let params = args.slice(0, args.length - 1).map((expr) => {
    if (expr.type != 'word') {
      throw new SyntaxError('Parameter names must be words');
    }
    return expr.name;
  });

  return function (...args) {
    if (args.length != params.length) {
      throw new TypeError('Wrong number of arguments');
    }
    /**
     * exercise: 12.2: Closure recognition
     *
     * A closure is created when a function retains access to variables from its outer scope.
     * Here, localScope is a new object created with scope as its prototype:
     * - This creates a scope chain where variables are first looked up in localScope,
     *   then in its prototype (scope), and so on
     * - This mechanism allows for lexical scoping, enabling closures
     */
    let localScope = Object.create(scope);
    for (let i = 0; i < args.length; i++) {
      localScope[params[i]] = args[i];
    }
    return evaluate(body, localScope);
  };
};

/**
 * While version
 */

specialForms.set = (args, scope) => {
  if (args.length != 2) {
    throw new SyntaxError('Incorrect use of set: Expected exactly 2 arguments');
  }

  if (args[0].type != 'word') {
    throw new SyntaxError(
      'Incorrect use of set: First argument must be a variable name',
    );
  }

  const key = args[0].name;

  let prototype = scope;
  while (prototype) {
    if (Object.hasOwn(prototype, key)) {
      const val = evaluate(args[1], scope);
      prototype[key] = val;
      return val;
    } else {
      prototype = Object.getPrototypeOf(prototype);
    }
  }

  throw new ReferenceError(`${key} is not defined!`);
};

/**
 * Recursive version: less readable
 */
// specialForms.set = (args, scope) => {
//   if (args.length != 2) {
//     throw new SyntaxError('Incorrect use of set: Expected exactly 2 arguments');
//   }

//   if (args[0].type != 'word') {
//     throw new SyntaxError(
//       'Incorrect use of set: First argument must be a variable name',
//     );
//   }

//   const key = args[0].name;
//   const val = evaluate(args[1], scope);

//   if (Object.hasOwn(scope, key)) {
//     scope[key] = val;
//     return val;
//   }

//   const prototype = Object.getPrototypeOf(scope);
//   if (prototype) {
//     // Copy properties up the prototype chain because 'val' only exists in the first recursive call's scope,
//     // but we need to modify it from deeper recursive calls
//     const aggregatedScope = Object.assign(prototype, scope);
//     return specialForms.set(args, aggregatedScope);
//   }

//   throw new ReferenceError(`${key} is not defined!`);
// };

module.exports = { specialForms };
