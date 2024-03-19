const month = (() => {
  const names = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  return {
    getName: function (number) {
      return names[number];
    },
    getNumber: function (name) {
      return names.indexOf(name);
    },
  };
})();

console.log(month.getName(2));
// → March
console.log(month.getNumber('November'));
// → 10
