const { Group } = require('./group');

Group.prototype[Symbol.iterator] = function* () {
  for (let i = 0; i < this.group.length; i++) {
    yield this.get(i);
  }
};

for (let value of Group.from(['a', 'b', 'c'])) {
  console.log(value);
}
