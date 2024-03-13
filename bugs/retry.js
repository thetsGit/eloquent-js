class MultiplicatorUnitFailure extends Error {}

function primitiveMultiply(a, b) {
  if (Math.random() < 0.2) {
    return a * b;
  } else {
    throw new MultiplicatorUnitFailure('Klunk');
  }
}

function reliableMultiply(a, b) {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    try {
      return primitiveMultiply(a, b);
    } catch (error) {
      if (error instanceof MultiplicatorUnitFailure) continue;
      else throw error;
    }
  }
}

console.log(reliableMultiply(8, 8));
