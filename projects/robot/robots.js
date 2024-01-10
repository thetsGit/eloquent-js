const { roadGraph } = require("./buildGraph");

function randomPick(array) {
  let choice = Math.floor(Math.random() * array.length);
  return array[choice];
}

function randomRobot(state) {
  return { direction: randomPick(roadGraph[state.place]) };
}

function routeRobot(state, memory) {
  if (memory.length == 0) {
    memory = require("./data").staticMailRoute;
  }
  return { direction: memory[0], memory: memory.slice(1) };
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

function goalOrientedRobot({ place, parcels }, route) {
  if (route.length == 0) {
    let parcel = parcels[0];
    if (parcel.place != place) {
      route = findRoute(roadGraph, place, parcel.place);
    } else {
      route = findRoute(roadGraph, place, parcel.address);
    }
  }
  return { direction: route[0], memory: route.slice(1) };
}

// added smarter route calculation
function goalOrientedRobotV2({ place: currentPlace, parcels }, route) {
  if (route.length == 0) {
    let allPossiblePaths = [];

    const allPossibleDestinations = parcels
      .reduce((allDestinations, { place, address }) => {
        const isDestinationIncluded = (newDestination) =>
          allDestinations.includes(newDestination);

        let destinationsToBeAdded = [];

        if (!isDestinationIncluded(place)) {
          destinationsToBeAdded.push(place);
        }

        if (place === currentPlace && !isDestinationIncluded(address)) {
          destinationsToBeAdded.push(address);
        }

        return [...allDestinations, ...destinationsToBeAdded];
      }, [])
      .filter((destination) => destination !== currentPlace);

    for (const destination of allPossibleDestinations) {
      allPossiblePaths.push(findRoute(roadGraph, currentPlace, destination));
    }

    route = allPossiblePaths.sort(
      (route1, route2) => route1.length - route2.length,
    )[0];
  }

  return {
    direction: route[0],
    memory: route.slice(1),
  };
}

// added smarter route calculation + cache system for faster route calculation
function goalOrientedRobotV3(
  { place: currentPlace, parcels },
  { route, cachedPaths },
) {
  if (route.length == 0) {
    let allPotentialPaths = [];

    const allPotentialDestinations = parcels
      .reduce((allDestinations, { place, address }) => {
        const isDestinationIncluded = (newDestination) =>
          allDestinations.includes(newDestination);

        let destinationsToBeAdded = [];

        if (!isDestinationIncluded(place)) {
          destinationsToBeAdded.push(place);
        }

        if (place === currentPlace && !isDestinationIncluded(address)) {
          destinationsToBeAdded.push(address);
        }

        return [...allDestinations, ...destinationsToBeAdded];
      }, [])
      .filter((destination) => destination !== currentPlace);

    for (const destination of allPotentialDestinations) {
      const cachePathKey = `${currentPlace}-${destination}`;

      if (!cachedPaths[cachePathKey]) {
        cachedPaths[cachePathKey] = findRoute(
          roadGraph,
          currentPlace,
          destination,
        );
      }

      allPotentialPaths.push(cachedPaths[cachePathKey]);
    }

    route = allPotentialPaths.sort(
      (route1, route2) => route1.length - route2.length,
    )[0];
  }
  return {
    direction: route[0],
    memory: { route: route.slice(1), cachedPaths },
  };
}

// added smarter route calculation + task priority calculation to determine which route should be prioritized if there're more than two or more shortest routes
function goalOrientedRobotV4({ place: currentPlace, parcels }, route) {
  if (route.length == 0) {
    const allPossibleDestinations = parcels
      .reduce((allDestinations, { place, address }) => {
        let destinationsToBeAdded = [];
        const isAddressConsidered = place === currentPlace; // address is only considered if the parcel is already picked

        const isDestinationIncluded = (locationToBeChecked) =>
          allDestinations.find(
            ({ location }) => location === locationToBeChecked,
          );

        // priority per place = 2 | priority per address = 1
        const destinationsMightBeAdded = [
          { location: place, priority: 2 },
          {
            location: isAddressConsidered ? address : null,
            priority: 1,
          },
        ];

        destinationsMightBeAdded.map(({ location, priority }) => {
          if (location) {
            if (!isDestinationIncluded(location)) {
              destinationsToBeAdded.push({
                location,
                priority,
              });
            } else {
              allDestinations = allDestinations.map((destination) => {
                return destination.location === location
                  ? {
                      location,
                      priority: destination.priority + priority,
                    }
                  : destination;
              });
            }
          }
        });

        return [...allDestinations, ...destinationsToBeAdded];
      }, [])
      .filter(({ location }) => location !== currentPlace);

    let allPossiblePaths = [];
    for (const { location, priority } of allPossibleDestinations) {
      allPossiblePaths.push({
        paths: findRoute(roadGraph, currentPlace, location),
        priority,
      });
    }

    // exclude "priority"
    route = allPossiblePaths.sort((route1, route2) => {
      if (route1.paths.length !== route2.paths.length) {
        return route1.paths.length - route2.paths.length;
      }

      // swap route2 and route1 positions for substration since priority and route's length are inversely proportional
      return route2.priority - route1.priority;
    })[0].paths;
  }

  return {
    direction: route[0],
    memory: route.slice(1),
  };
}

module.exports = {
  randomPick,
  randomRobot,
  routeRobot,
  goalOrientedRobot,
  goalOrientedRobotV2,
  goalOrientedRobotV3,
  goalOrientedRobotV4,
};
