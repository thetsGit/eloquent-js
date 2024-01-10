const loop = (from, test, update, read) => {
  let currentVal = from;

  while (test(currentVal)) {
    read(currentVal);
    currentVal = update(currentVal);
  }
};

loop(
  3,
  (n) => n > 0,
  (n) => n - 1,
  console.log,
);
