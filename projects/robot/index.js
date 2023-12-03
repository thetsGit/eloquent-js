const { runRobot } = require("./runRobot.js");
const { VillageState } = require("./VillageState.js");
const { goalOrientedRobot } = require("./robots.js");

runRobot(VillageState.random(), goalOrientedRobot, []);
