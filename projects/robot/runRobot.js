function runRobot(state, robot, memory) {
  let turn = 0;

  while (state.parcels.length !== 0) {
    const action = robot(state, memory);
    state = state.move(action.direction);
    memory = action.memory;

    console.log(`Moved to ${action.direction}`);
    turn++;
  }

  console.log(`Done in ${turn} turns`);
  return turn;
}

module.exports = {
  runRobot,
};
