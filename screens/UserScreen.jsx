import React, { useContext, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Map from "../components/Map";
import MapView, { PROVIDER_GOOGLE, Polyline } from "react-native-maps";
import UserContext from "../contexts/UserContext";
import LevelContext from "../contexts/LevelContext";
import LandmarksContext from "../contexts/LandmarksContext";
import db from "../db/firestore";
function UserScreen() {
  const { currentUser } = useContext(UserContext);
  const { currentLevel } = useContext(LevelContext);
  const { landmarks } = useContext(LandmarksContext);
  const [level, setLevel] = useState();
  // console.log(currentUser.data.level1comp === true)
  const polylineArray = currentUser.data.level1route;
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.main}>
        <View style={styles.hero}>
          <Text style={styles.userText}>Hello {currentUser.data.username}</Text>
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
            <View style={styles.rankingBtn}>
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
            />
          </MapView>
        </View>
        <View style={styles.timeAndDistance}>
          <Text style={styles.timeAndDistanceText}>Time: </Text>
        </View>
        <View style={styles.sightsContainer}>
          {landmarks
            .filter((landmark) => landmark.level === 1)
            .map((landmark, index) => {
              return (
                <Text key={landmark.name} style={styles.sight}>
                  <Text>{landmark.description}</Text>
                </Text>
              );
            })}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
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
    flexDirection: "column",
  },
  sight: {
    height: 100,
    height: "auto",
    width: "90%",
    borderRadius: 20,
    textAlign: "center",
    backgroundColor: "#e7e7e7",
    padding: 20,
    borderRadius: 20,
    overflow: "hidden",
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
    fontSize: 10,
  },
});

export default UserScreen;
