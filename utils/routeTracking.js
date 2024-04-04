import * as Location from 'expo-location'
import { useContext, useEffect, useState } from 'react';
import RouteContext from '../contexts/RouteContext';
import LastLocationContext from '../contexts/LastLocation';
import db from "../db/firestore";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

// const liveLocationRef = db.collection('users').doc('greg@greg.com')
// const multipleUnionRes = await liveLocationRef.update({level1route: arrayUnion(...routeOnePolyline)})

let locationSubscription = null

export function stopRouteTracking() {
    locationSubscription?.remove()
    console.log("Stopping watch...");
    }

export function startRouteTracking() {

    // const {route, setRoute} = useContext(RouteContext)
    const {lastLocation, setLastLocation} = useContext(LastLocationContext)

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
                let lat = livePos.coords.latitude
                let lng = livePos.coords.longitude
                // let timeStamp = livePos.timestamp
                
                setLiveLocation(livePos)
                setLastLocation({latitude: lat, longitude: lng})
                console.log(lastLocation, "-----lastLocation");
                
                // setRoute([...route], {latitude: lat, longitude: lng})
                // polylineArray.push({latitude: lat, longitude: lng})
                // console.log(polylineArray, "-----polyline array");
                

                // setRoute([...polylineArray])
                // console.log(route, "-----route");
            })
            // console.log(lastLocation);
        }
        
        useEffect(() => {
            if (permission === undefined){
                // console.log("Needs permission");
                getPermission()
            } else {
                getLiveLocation()
                console.log('starting live location');
            }
        }, [permission])

        if (errorMsg) {
            console.log("Error fetching: ", errorMsg);
            text = errorMsg;
        } else if (liveLocation) {
            // console.log(liveLocation, "-----liveLocation");
            console.log(liveLocation.coords.latitude, "-----latitude");
            console.log(liveLocation.coords.longitude, "-----longitude");
            console.log(liveLocation.timestamp, "-----timestamp");
            let lat = liveLocation.coords.latitude
            let lng = liveLocation.coords.longitude
            let timeStamp = liveLocation.timestamp
                
            polylineArray.push({latitude: lat, longitude: lng})
            console.log(polylineArray, "-----polyline array");

            // setLiveLocation({latitude: lat, longitude: lng})
            // console.log(liveLocation, "------liveLocation");

            // console.log(lastLocation, "-----lastLocation");
            // console.log(route, "-----route");
        }
        
}