function randomPick(array) {
  let choice = Math.floor(Math.random() * array.length);
  return array[choice];
}

const getFixedAverage = (total, count) => (total / count).toFixed(0);

module.exports = {
  randomPick,
  getFixedAverage,
};
