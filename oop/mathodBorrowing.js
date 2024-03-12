// fixed version
let map = { one: true, two: true, hasOwnProperty: true };

// Fix this call
console.log(map.hasOwnProperty('one'));
// TypeError: map.hasOwnProperty is not a function

// fixed
console.log(Object.hasOwn(map, 'one'));
// → true
