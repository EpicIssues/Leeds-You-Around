import React, { useEffect, useRef, useState } from "react";
import MapView, {
    Callout,
    Marker,
    PROVIDER_GOOGLE,
    Region,
} from "react-native-maps";
import { StyleSheet, TouchableOpacity, View, Text, Alert } from "react-native";
import { useNavigation } from "expo-router";
import { one, two, three } from "../assets/markers";

const Map = () => {
    const mapRef = useRef();
    const navigation = useNavigation();
    const level = two;
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
    }, [level]);
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
    };
    const callOutPressed = (ev) => {
        console.log(ev);
    };
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
                {level.map((marker, index) => (
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
export default Map;
