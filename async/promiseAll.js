function promiseAll(promises) {
  let results = [];
  let totalResolved = 0;

  return new Promise((resolve, reject) => {
    if (promises.length === 0) {
      resolve([]);
    }

    promises.forEach((promise, i) => {
      promise.then((result) => {
        results[i] = result;
        totalResolved++;

        // Resolve the whole promise if all promises are resolved
        const isAllFulfilled = totalResolved === promises.length;
        if (isAllFulfilled) resolve(results);
      }, reject);
    });
  });
}

function awaitAll(promises) {
  let results = [];
  let totalResolved = 0;

  return new Promise((resolve, reject) => {
    if (promises.length === 0) {
      resolve([]);
    }

    promises.forEach(async (promise, i) => {
      try {
        const result = await promise;

        results[i] = result;
        totalResolved++;

        // Resolve the whole promise if all promises are resolved
        const isAllFulfilled = totalResolved === promises.length;
        if (isAllFulfilled) resolve(results);
      } catch (error) {
        reject(error);
      }
    });
  });
}

/** Test codes */

function soon(val) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(val), Math.random() * 500);
  });
}

/** promiseAll */
promiseAll([]).then((array) => {
  console.log('This should be []:', array);
});

promiseAll([soon(1), soon(2), soon(3)]).then((array) => {
  console.log('This should be [1, 2, 3]:', array);
});

promiseAll([soon(1), Promise.reject('X'), soon(3)])
  .then(() => {
    console.log('We should not get here');
  })
  .catch((error) => {
    if (error != 'X') {
      console.log('Unexpected failure:', error);
    }
  });

/** awaitAll */
awaitAll([]).then((array) => {
  console.log('This should be []:', array);
});

awaitAll([soon(1), soon(2), soon(3)]).then((array) => {
  console.log('This should be [1, 2, 3]:', array);
});

awaitAll([soon(1), Promise.reject('X'), soon(3)])
  .then(() => {
    console.log('We should not get here');
  })
  .catch((error) => {
    if (error != 'X') {
      console.log('Unexpected failure:', error);
    }
  });
