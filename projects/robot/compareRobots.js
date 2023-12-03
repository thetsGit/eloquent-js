const TOTAL_TASKS = 500; // change it as needed

const { VillageState } = require("./VillageState");
const { runRobot } = require("./runRobot");

const getSumOfNumArray = (numArray) =>
	numArray.reduce((total, currentNum) => total + currentNum, 0);

const getFixedAverage = (total, count) => (total / count).toFixed(0);

function compareRobots(robot1, memory1, robot2, memory2) {
	let stepCountsByRobots = [[], []];

	console.time("complexity");

	for (let i = 0; i < TOTAL_TASKS; i++) {
		const state = VillageState.random();

		stepCountsByRobots[0].push(runRobot(state, robot1, memory1));
		stepCountsByRobots[1].push(runRobot(state, robot2, memory2));
	}

	console.timeEnd("complexity");

	return stepCountsByRobots.map((stepCountsPerRobot) =>
		getFixedAverage(
			getSumOfNumArray(stepCountsPerRobot),
			stepCountsPerRobot.length
		)
	);
}

module.exports = {
	compareRobots,
};
