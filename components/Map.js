import React, { useEffect, useRef } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps";
// import { useContext } from 'react';
import { useNavigation } from "@react-navigation/core";
import { useContext } from "react";
import LevelContext from "../contexts/LevelContext";

const Map = () => {
  const mapRef = useRef();
  const navigation = useNavigation();
  const { currentLevel } = useContext(LevelContext);
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
    // setIsLoading(false)
    // setLevel(two)
  };
  const callOutPressed = (ev) => {
    // console.log(ev);
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
        initialRegion={
          // City Centre - 53.79959044936186, -1.5471033798488403
          {
            latitude: 53.795525067393335,
            longitude: -1.5461106378887122,
            latitudeDelta: 0.02,
            longitudeDelta: 0.01,
          }
        }
        // ref={mapRef}
        // minZoomLevel={9}
      >
        {currentLevel.map((landmark, index) => (
          <Marker
            pinColor={landmark.color}
            key={index}
            coordinate={{
              latitude: landmark.location.latitude,
              longitude: landmark.location.longitude,
              name: landmark.name,
              color: landmark.colour,
            }}
            onPress={() => onMarkerSelected(landmark)}
          >
            <Callout>
              <View style={{ padding: 10 }}>
                <Text style={{ fontSize: 24 }}>{landmark.name}</Text>
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
