// A function that returns the name and distance of the closest landmark
// from the current level array


// This function takes 3 arguments:
// 1) current level array | e.g. [{landmark Obj1}, {landmark Obj2}, {landmark Obj3}]
// 2) users current location object | e.g. {latitude: xxxxx, longitude, xxxxxx}
// 3) util Function that works out distance between two points | e.g. Function(lat1, long1, lat2, long2)
const closestTarget = (
    currentLevel,
    userLocation,
    distanceFromUtilFunction
) => {

    // Target is initially set to first landmark from current level array
    let target = {
        name: currentLevel[0].name,
        distance: distanceFromUtilFunction(
            currentLevel[0].location.latitude,
            currentLevel[0].location.longitude,
            userLocation.latitude,
            userLocation.longitude
        ),
    };

    // Loops through currrent level array. For each landmark checks distance from user,
    // if distance is less than currently set target then this becomes the new target
    for (const location in currentLevel) {
        if (
            distanceFromUtilFunction(
                location.location.latitude,
                location.location.longitude,
                userLocation.latitude,
                userLocation.longitude < target.distance
            )
        ) {
            target = {
                name: location.name,
                distance: distanceFromUtilFunction(
                    location.location.latitude,
                    location.location.longitude,
                    userLocation.latitude,
                    userLocation.longitude
                ),
            };
        }
    }

    // returns target as an object with the landmark name and distance
    return target;
};

export default closestTarget;
