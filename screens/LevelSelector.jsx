import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import Map from "../components/Map";
import { useNavigation } from "@react-navigation/core";
import { useContext } from "react";
import LevelContext from "../contexts/LevelContext";
import LandmarksContext from "../contexts/LandmarksContext";

export default function LevelSelector() {
  const navigation = useNavigation();
  const { currentLevel, setCurrentLevel } = useContext(LevelContext);
  const { landmarks } = useContext(LandmarksContext)

  // let ctrl = true
  // do {
  //   landmarksSelector()
  //   ctrl = false
  // }
  // while (ctrl === true)

  function landmarksSelector(level=1) {
    setCurrentLevel(landmarks.filter(landmark=> landmark.level === level))
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.hero}>
        <Text>Which level</Text>
        <View style={styles.levelSelector} height="30%" width="80%">
          <TouchableOpacity
            style={[styles.one, currentLevel === 0 && styles.selectedButton]}
            onPress={() => landmarksSelector(1)}
          >
            <Text>1X</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.two, currentLevel === 1 && styles.selectedButton]}
            onPress={() => landmarksSelector(2)}
          >
            <Text>2X</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.three, currentLevel === 2 && styles.selectedButton]}
            onPress={() => landmarksSelector(3)}
          >
            <Text>3X</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.mapView}>
        <Map
          style={styles.map}
          initialRegion={{
            latitude: 53.79543,
            longitude: -1.54765,
            latitudeDelta: 200,
            longitudeDelta: 200,
          }}
        />
      </View>
      <View style={styles.itemListContainer}>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.backBtn}>
            <Text>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("MapScreen")}
            style={styles.goBtn}
          >
            <Text>Go</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white",
  },
  hero: {
    height: "30%",
    backgroundColor: "#eee",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "20%",
  },
  levelSelector: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 30,
    overflow: "hidden",
  },
  one: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: 1,
  },
  two: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: 1,
  },
  three: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },

  selectedButton: {
    backgroundColor: "#ccc", 
  },
  map: {
    backgroundColor: "#eee",
    height: "50%",
    width: "50%",
  },
  mapView: {
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
    height: "30%",
    width: "100%",
  },
  itemListContainer: {
    backgroundColor: "#eee",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  buttonsContainer: {
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginBottom: 20,
    height: "20%",
    borderRadius: 5,
    overflow: "hidden",
  },
  backBtn: {
    backgroundColor: "white",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  goBtn: {
    backgroundColor: "#e9e9e9",
    height: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
