const Group = require("./group");

class IterableGroup {
  constructor(group) {
    this.index = 0;
    this.group = group;
  }

  next() {
    if (this.index === this.group.length) {
      return { done: true };
    }

    return {
      value: this.group.get(this.index++),
      done: false,
    };
  }
}

Group.prototype[Symbol.iterator] = function () {
  return new IterableGroup(this);
};

for (let value of Group.from(["a", "b", "c"])) {
  console.log(value);
}
