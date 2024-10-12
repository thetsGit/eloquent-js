const { VillageState } = require('./VillageState');
const { getFixedAverage } = require('./utils');

const TOTAL_TASKS = 500; // change it as needed

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

function compareRobots(robot1, memory1, robot2, memory2) {
  let totalSteps = [0, 0];

  console.time('complexity');

  for (let i = 0; i < TOTAL_TASKS; i++) {
    const state = VillageState.random();

    totalSteps[0] += runRobot(state, robot1, memory1);
    totalSteps[1] += runRobot(state, robot2, memory2);
  }

  console.timeEnd('complexity');

  return totalSteps.map((totalStepsPerRobot) =>
    getFixedAverage(totalStepsPerRobot, TOTAL_TASKS),
  );
}

function findRoute(graph, from, to) {
  let work = [{ at: from, route: [] }];
  for (let i = 0; i < work.length; i++) {
    let { at, route } = work[i];
    for (let place of graph[at]) {
      if (place == to) return route.concat(place);
      if (!work.some((w) => w.at == place)) {
        work.push({ at: place, route: route.concat(place) });
      }
    }
  }
}

module.exports = {
  runRobot,
  compareRobots,
  findRoute,
};
