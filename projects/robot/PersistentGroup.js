class PGroup {
	constructor(items) {
		this.items = items;
	}

	add(item) {
		if (this.has(item)) return this;

		return new PGroup([...this.items, item]);
	}

	delete(item) {
		if (!this.has(item)) return this;

		return new PGroup(
			this.items.filter((existingItem) => existingItem !== item)
		);
	}

	has(item) {
		return this.items.includes(item);
	}

	static empty = new PGroup([]);
}
