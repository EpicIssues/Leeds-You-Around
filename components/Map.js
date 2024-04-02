import React, { useEffect, useRef, useState } from "react";
import MapView, {
    Callout,
    Marker,
    PROVIDER_GOOGLE,
    Region,
} from "react-native-maps";
import { StyleSheet, TouchableOpacity, View, Text, Alert } from "react-native";
import { one, two, three } from "../PHIL/assets/markers";
// import { useContext } from 'react';
import LevelContext, { ThemeContext } from '../contexts/LevelContext';
import { useNavigation } from "@react-navigation/core";
import { useContext } from "react";

const Map = () => {
    const landmarks = [one, two, three]
    const mapRef = useRef();
    const navigation = useNavigation();
    const { currentLevel } = useContext(LevelContext)
    // const[isLoading,setIsLoading] = useState(true)

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={focusMap}>
                    <View style={{ padding: 10 }}>
                        <Text>Focus</Text>
                    </View>
                </TouchableOpacity>
            ),
        });
    }, []);
    const focusMap = () => {
        const test = {
            latitude: 53.8008,
            longitude: -1.5491,
        };
        mapRef.current?.animateCamera(
            { center: test, zoom: 14 },
            { duration: 3000 }
        );
    };
    const onRegionChange = (region) => {
        // console.log(region,'line 33 ---')
    };
    const onMarkerSelected = (marker) => {
        // Alert.alert(marker.name);
        setIsLoading(false)
        // setLevel(two)
    };
    const callOutPressed = (ev) => {
        console.log(ev);
    };
    // if(isLoading){
    //     <View>
    //     <Text>Is loading</Text>
    //     </View>
    // }else{
    return (
        <View style={{ flex: 1, width: "100%" }}>
            <MapView
                style={StyleSheet.absoluteFill}
                provider={PROVIDER_GOOGLE}
                showsUserLocation
                showsMyLocationButton
                onRegionChangeComplete={onRegionChange}
                
                // ref={mapRef}
                // minZoomLevel={9}
                >
                {landmarks[currentLevel].map((marker, index) => (
                    <Marker
                    pinColor={marker.color}
                    key={index}
                    coordinate={marker}
                    onPress={() => onMarkerSelected(marker)}
                    >
                        <Callout>
                            <View style={{ padding: 10 }}>
                                <Text style={{ fontSize: 24 }}>
                                    {marker.name}
                                </Text>
                            </View>
                        </Callout>
                    </Marker>
                ))}
            </MapView>
        </View>
    );
};
// }
export default Map;
