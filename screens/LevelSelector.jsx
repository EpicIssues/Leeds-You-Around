import React, { useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import Map from "../components/Map";
import { useNavigation } from "@react-navigation/core";
import { useContext } from "react";
import LevelContext from "../contexts/LevelContext";
import LandmarksContext from "../contexts/LandmarksContext";
import UserContext from "../contexts/UserContext";
import { auth } from "../firebase";
import db from "../db/firestore";
import { startRouteTracking, stopRouteTracking } from "../utils/routeTracking";
import HasStartedContext from "../contexts/HasStartedContext";
import TimerContext from "../contexts/TimerContext";

export default function LevelSelector() {
  const navigation = useNavigation();
  const { currentLevel, setCurrentLevel } = useContext(LevelContext);
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const { landmarks, setLandmarks } = useContext(LandmarksContext);
  const { setHasStarted } = useContext(HasStartedContext);
  const { timer, setTimer } = useContext(TimerContext);

  useEffect(() => {
    setCurrentLevel(landmarks.filter((landmark) => landmark.level === 1));
    stopRouteTracking();
  }, []);

  // let ctrl = true
  // do {
  //   landmarksSelector()
  //   ctrl = false
  // }
  // while (ctrl === true)

  // setCurrentLevel(landmarks.filter(landmark => landmark.level === 1))
  function landmarksSelector(level = 1) {
    setCurrentLevel(landmarks.filter((landmark) => landmark.level === level));
  }
  // console.log(currentLevel[0].level, '=======================lan');

    const rewardsHandler = () => {
      navigation.navigate("Confetti");
    };

  const handleGo = () => {
    // startRouteTracking()
    setTimer({ startTime: Date.now(), endTime: null });
    setHasStarted(true);
    console.log("----------STARTED----------");
    navigation.navigate("MapScreen");
  };

  if (currentLevel.length > 0) {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.hero}>
          <View>
            <TouchableOpacity onPress={rewardsHandler}>
              <Text>Rewards</Text>
            </TouchableOpacity>
          </View>
          <Text>Select Level</Text>
          <View style={styles.levelSelector} height="30%" width="80%">
            <TouchableOpacity
              style={[
                styles.one,
                currentLevel[0].level === 1 && styles.selectedButton,
              ]}
              onPress={() => landmarksSelector(1)}
            >
              <Text>Level 1</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.two,
                currentLevel[0].level === 2 && styles.selectedButton,
              ]}
              onPress={() => landmarksSelector(2)}
            >
              <Text>Level 2</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.three,
                currentLevel[0].level === 3 && styles.selectedButton,
              ]}
              onPress={() => landmarksSelector(3)}
            >
              <Text>Level 3</Text>
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
            <TouchableOpacity onPress={handleGo} style={styles.goBtn}>
              <Text>Go</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
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
  goBtn: {
    backgroundColor: "#e9e9e9",
    height: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
