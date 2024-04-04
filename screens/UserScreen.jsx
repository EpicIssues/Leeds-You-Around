import React, { useContext } from 'react'
import { useNavigation } from "@react-navigation/core";
import { View, Text,Image,StyleSheet,ScrollView,TouchableOpacity } from 'react-native';
import Map from "../components/Map";
import MapView, { PROVIDER_GOOGLE, Polyline } from 'react-native-maps';
import UserContext from "../contexts/UserContext";
import LevelContext from '../contexts/LevelContext';


function UserScreen() {
  const {currentUser} = useContext(UserContext)
  const { currentLevel } = useContext(LevelContext)
  
  const polylineArray = currentUser.data.level1route

  const navigation = useNavigation();
  return (
    <ScrollView style={styles.container}>
      <View style={styles.main}>
        <View style={styles.hero}>
          <Text style={styles.userText}>Hello</Text>
          <View style={styles.trophys}>
            <Image
              style={styles.image}
              source={require("./images/trophy.png")}
            />
            <Image
              style={styles.image}
              source={require("./images/trophy.png")}
            />
            <Image
              style={styles.image}
              source={require("./images/trophy.png")}
            />
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("RankingScreen")}
          >
            <View
              style={styles.rankingBtn}
            >
              <Text style={{ color: "white" }}>Rankings</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={[
            styles.mapView,
            { height: "30%", borderWidth: 1, borderStyle: "dashed" },
          ]}
        >
          <MapView
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            initialRegion={{
              latitude: 53.792660191135305,
              longitude: -1.563090465482172,
              latitudeDelta: 0.04,
              longitudeDelta: 0.02,
            }}
          >
            <Polyline
              coordinates={polylineArray}
              strokeColor="#000"
              fillColor="rgba(255,0,47,1)"
              strokeWidth={6}
              lineDashPattern={[1]}
              // zIndex={1}
            />
          </MapView>
        </View>
        <View style={styles.timeAndDistance}>
          <Text style={styles.timeAndDistanceText}>Distance:</Text>
          <Text style={styles.timeAndDistanceText}>Time: </Text>
        </View>
        <View style={[styles.sightsContainer]}>
          <Text style={styles.sight}>sight 1</Text>
          <Text style={styles.sight}>two</Text>
          <Text style={styles.sight}>three</Text>
          <Text style={styles.sight}>four</Text>
          <Text style={styles.sight}>five</Text>
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  main: {
    height: "100%",
  },
  hero: {
    height: "30%",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  trophys: {
    flexDirection: "row",
  },
  userText: {
    textAlign: "center",
    fontSize: 30,
  },
  image: {
    height: 100,
    width: 100,
    opacity: 0.3,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  timeAndDistance: {
    height: 100,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  timeAndDistanceText: {
    fontSize: 30,
  },
  sightsContainer: {
    gap: 20,
    alignItems: "center",
  },
  sight: {
    height: 100,
    width: "100%",
    backgroundColor: "#E7E7E7",
    width: "90%",
    borderRadius: 20,
    overflow: "hidden",
    textAlign: "center",
  },
  rankingBtn: {
    height: 50,
    width: 250,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "white",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#89CFF0",
    fontSize: 20,
  },
});

export default UserScreen