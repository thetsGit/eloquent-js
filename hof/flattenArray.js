export const flattenArray = (arr) => arr.reduce((a, b) => a.concat(b));

console.log(flattenArray([[1, 2, 3], [4, 5], [6]]));
console.log(flattenArray([["a", "b", "c"]]));
