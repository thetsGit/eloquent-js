const { SCRIPTS } = require("../scripts");

function dominantDirection(text) {
	function countBy(items, getName) {
		let counts = [];

		for (let item of items) {
			let name = getName(item);
			let foundIndex = counts.findIndex((count) => count.name === name);

			if (foundIndex === -1) {
				counts.push({ name, count: 1 });
			} else {
				counts[foundIndex].count++;
			}
		}

		return counts;
	}

	const getCharacterScript = (code) => {
		if (!code) return null;

		for (let script of SCRIPTS) {
			if (
				script.ranges.some(([from, to]) => {
					return code >= from && code < to;
				})
			) {
				return script;
			}
		}

		return null;
	};

	const countsByDirection = countBy(text, (char) => {
		return getCharacterScript(char.charCodeAt(0))?.direction;
	});

	if (!countsByDirection.length) {
		throw new Error("No scripts found");
	}

	const sortByCount = (a, b) => {
		if (a.count > b.count) {
			return -1;
		} else if (a.count === b.count) {
			return 0;
		}
		return 1;
	};

	// sort from largest to smallest
	return countsByDirection.sort(sortByCount)[0];
}

console.log(dominantDirection("Hey, مساء الخير"));
