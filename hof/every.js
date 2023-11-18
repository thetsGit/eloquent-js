export const everyWithNormalLoop = (arr, test) => {
	for (const currentVal of arr) {
		if (!test(currentVal)) {
			return false;
		}
	}

	return true;
};

console.log(everyWithNormalLoop([1, 3, 5], (n) => n < 10));
// → true

console.log(everyWithNormalLoop([2, 4, 16], (n) => n < 10));
// → false

console.log(everyWithNormalLoop([], (n) => n < 10));
// → true

export const everyWithSomeFunc = (arr, test) =>
	!arr.reduce(
		(accumulator, current) => accumulator + (![current].some(test) || ""),
		""
	);

console.log(everyWithSomeFunc([1, 3, 5], (n) => n < 1));
// → false

console.log(
	everyWithSomeFunc(
		[2, 4, 16],
		(n) => !(n % 2) // checks if even number
	)
);
// → true

console.log(everyWithSomeFunc([], (n) => n < 10));
// → true
