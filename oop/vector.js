// eslint-disable-next-line no-unused-vars
class Vec {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  get length() {
    // according to pythagorean theorem
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }

  plus(vec) {
    return new Vec(this.x + vec.x, this.y + vec.y);
  }

  minus(vec) {
    return new Vec(this.x - vec.x, this.y - vec.y);
  }
}
