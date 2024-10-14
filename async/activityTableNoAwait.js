const { textFile, activityGraph } = require('./deps');

async function activityTable(day) {
  // Initialize an array to count activities for each hour of the day (0-23)
  const activityTable = Array.from({ length: 24 }, () => 0);

  // Read the names of log files from 'camera_logs.txt'
  return textFile('camera_logs.txt')
    .then((logFileNames) => {
      // Read the contents of each log file concurrently
      return Promise.all(
        logFileNames.split('\n').map((logFile) =>
          textFile(logFile).then((logs) => {
            // Filter logs to include only those that match the specified day of the week
            const logsOnSpecifiedDay = logs.split('\n').filter((dateString) => {
              const timestamp = Number(dateString);
              const date = new Date(timestamp);

              // Check if the date is valid and matches the specified day
              return !isNaN(date) && date.getDay() === day;
            });

            // Iterate over the filtered logs to count activities by hour
            logsOnSpecifiedDay.forEach((dateString) => {
              const hour = new Date(Number(dateString)).getHours();

              // Increse the count for the corresponding hour if it's valid
              if (!isNaN(hour)) activityTable[hour]++;
            });
          }),
        ),
      );
    })
    .then(() => activityTable)
    .catch((error) => {
      throw error;
    });
}

activityTable(1).then((table) => console.log(activityGraph(table)));
