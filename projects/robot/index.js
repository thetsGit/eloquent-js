const { runRobot } = require("./runRobot.js");
const { VillageState } = require("./VillageState.js");
const { goalOrientedRobot, routeRobot } = require("./robots.js");
const { compareRobots } = require("./compareRobots.js");

// exercise(1)
console.log(compareRobots(routeRobot, [], goalOrientedRobot, []));
