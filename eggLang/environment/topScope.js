const topScope = Object.create(null);

topScope.true = true;
topScope.false = false;

for (let op of ['+', '-', '*', '/', '==', '<', '>', '<=', '>=']) {
  topScope[op] = Function('a, b', `return a ${op} b;`);
}

topScope.print = (value) => {
  console.log(value);
  return value;
};

/**
 * Array support
 */

topScope.array = (...elements) => elements;

topScope.length = (array) => {
  if (!Array.isArray(array)) {
    throw new TypeError('length() expects an array as argument');
  }

  return array.length;
};

topScope.element = (array, index) => {
  if (!Array.isArray(array)) {
    throw new TypeError('element() expects an array as first argument');
  }

  if (typeof index !== 'number') {
    throw new TypeError('element() expects a number as second argument');
  }

  return array[index];
};

module.exports = { topScope };
