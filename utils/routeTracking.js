import * as Location from 'expo-location'
import { useContext, useEffect, useState } from 'react';
import RouteContext from '../contexts/RouteContext';




let locationSubscription = null

export function stopRouteTracking() {
    locationSubscription?.remove()
    console.log("Stopping watch...");
    }

export function startRouteTracking() {

    const {route, setRoute} = useContext(RouteContext)

    const [liveLocation, setLiveLocation] = useState(null);
    const [permission, setPermission] = useState(undefined);
    const [errorMsg, setErrorMsg] = useState(null);

    const polylineArray = []
    // const timeStampArray = []

    const getPermission = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        setPermission(status)
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied. Please allow access in your settings to continue using the app');
            return;
        }
    }

    const getLiveLocation = async () => {
            locationSubscription = await Location.watchPositionAsync (
                {
                accuracy: Location.Accuracy.BestForNavigation,
                timeInterval: 1000,
                distanceInterval: 10  
                },
                (livePos) => {
                    console.log(livePos.coords.latitude, "-----latitude");
                    console.log(livePos.coords.longitude, "-----longitude");
                    console.log(livePos.timestamp, "-----timestamp");
                    let lat = livePos.coords.latitude
                    let lng = livePos.coords.longitude
                    let timeStamp = livePos.timestamp
                    
                    polylineArray.push({latitude: lat, longitude: lng})
                    console.log(polylineArray, "-----polyline array");
                    setLiveLocation(polylineArray)
                    // [...route, {latitude: lat, longitude: lng}]
                    setRoute({latitude, lng})
                    console.log(route, "-----route");
                    // timeStampArray.push(timeStamp)
                    // console.log(timeStampArray, "-----timestamp Array");
                })
        }

    useEffect(() => {
        if (permission === undefined){
            console.log("Needs permission");
            getPermission()
        } else {
            getLiveLocation()
            console.log('starting live location');
        }
    }, [permission])

}