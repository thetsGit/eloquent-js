const {
  goalOrientedRobot,
  routeRobot,
  goalOrientedRobotV2,
  goalOrientedRobotV3,
  goalOrientedRobotV4,
} = require("./robots.js");
const { compareRobots } = require("./compareRobots.js");

// exercise(1)
// console.log(compareRobots(routeRobot, [], goalOrientedRobot, []));

// exercise (2)
console.log(compareRobots(goalOrientedRobotV4, [], goalOrientedRobot, []));
