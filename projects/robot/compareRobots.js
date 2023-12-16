const TOTAL_TASKS = 500; // change it as needed

const { VillageState } = require("./VillageState");
const { runRobot } = require("./runRobot");

const getFixedAverage = (total, count) => (total / count).toFixed(0);

function compareRobots(robot1, memory1, robot2, memory2) {
	let totalSteps = [0, 0];

	console.time("complexity");

	for (let i = 0; i < TOTAL_TASKS; i++) {
		const state = VillageState.random();

		totalSteps[0] += runRobot(state, robot1, memory1);
		totalSteps[1] += runRobot(state, robot2, memory2);
	}

	console.timeEnd("complexity");

	return totalSteps.map((totalStepsPerRobot) =>
		getFixedAverage(totalStepsPerRobot, TOTAL_TASKS)
	);
}

module.exports = {
	compareRobots,
};
