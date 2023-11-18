export class Group {
	constructor() {
		this.group = [];
	}

	get length() {
		return this.group.length;
	}

	get(index) {
		return this.group[index];
	}

	has(item) {
		return this.group.includes(item);
	}

	add(item) {
		if (!this.has(item)) {
			this.group.push(item);
		}
	}

	delete(item) {
		this.group = this.group.filter((member) => member !== item);
	}

	static from(iterable) {
		let group = new Group();

		for (const currentItem of iterable) {
			if (!group.has(currentItem)) group.add(currentItem);
		}

		return group;
	}
}

let group = Group.from([10, 20]);
console.log(group.has(10));
// → true
console.log(group.has(30));
// → false
group.add(10);
group.delete(10);
console.log(group.has(10));
// → false
