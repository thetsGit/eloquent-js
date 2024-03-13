// fixed version
let map = { one: true, two: true, hasOwnProperty: true };

// Fix this call
console.log(Object.hasOwnProperty.call(map, 'one'));
// TypeError: map.hasOwnProperty is not a function

// fixed
console.log(Object.hasOwn(map, 'one'));
// → true
