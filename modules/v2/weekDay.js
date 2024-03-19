const names = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

exports.name = function (number) {
  return names[number];
};

exports.number = function (name) {
  return names.indexOf(name);
};

/** To test improvedRequire func 
 * module.exports = function (number) {
  return names[number];
};
*/
