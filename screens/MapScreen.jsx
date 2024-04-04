import { View, StyleSheet, Text, TouchableOpacity} from "react-native";
import { useNavigation } from "@react-navigation/core";
import Map from "../components/Map";
import LevelContext from "../contexts/LevelContext";
import { useContext } from "react";
import { startRouteTracking } from "../utils/routeTracking";

export default function MapScreen() {
    startRouteTracking()
    const navigation = useNavigation()
    const { currentLevel, setCurrentLevel } = useContext(LevelContext);


    const toCameraHandler = () => {
        navigation.navigate('CameraScreen')
    }

    const backToHandler = () => {
        navigation.goBack("LevelSelector")
    }
    const userToHandler = () => {
      navigation.navigate("UserScreen");
    };
// console.log(
//     currentLevel
//     ,
//   "==========``````````````````````````````````````````````````````````````````````````````````````````````````"
// );

    return (
      <View style={styles.mainContainer}>
        <TouchableOpacity style={styles.userButton} onPress={userToHandler}>
          <Text style={styles.buttonOutlineText}>User</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.backButton} onPress={backToHandler}>
          <Text style={styles.buttonOutlineText}>Back</Text>
        </TouchableOpacity>
        <View style={styles.mapArea}>
          <Map style={styles.mapMap} />
        </View>
        <TouchableOpacity onPress={toCameraHandler} style={styles.cameraLink}>
          <Text style={styles.buttonOutlineText}>Camera</Text>
        </TouchableOpacity>
      </View>
    );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  header: {
    marginBottom: 10,
  },
  mapArea: {
    // backgroundColor: "lightblue",
    width: "100%",
    height: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  mapText: {
    color: "black",
  },
  cameraLink: {
    position: "absolute",
    zIndex: 2,
    bottom: 30,
    backgroundColor: "white",
    borderColor: "#0782F9",
    borderRadius: 10,
    borderWidth: 2,
    paddingVertical: 15,
    paddingHorizontal: 40,
  },
  backButton: {
    position: "absolute",
    zIndex: 2,
    left: 20,
    top: 60,
    backgroundColor: "white",
    borderColor: "#0782F9",
    borderRadius: 10,
    borderWidth: 2,
    paddingVertical: 15,
    paddingHorizontal: 40,
  },
  userButton: {
    position: "absolute",
    zIndex: 2,
    right: 20,
    top: 60,
    backgroundColor: "white",
    borderColor: "#0782F9",
    borderRadius: 10,
    borderWidth: 2,
    paddingVertical: 15,
    paddingHorizontal: 40,
  },
  buttonOutlineText: {
    color: "#0782F9",
    fontSize: 15
  },
});