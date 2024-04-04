import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import HasStartedContext from "./contexts/HasStartedContext";
import LandmarksContext from "./contexts/LandmarksContext";
import LastLocationContext from "./contexts/LastLocation";
import LevelContext from "./contexts/LevelContext";
import LevelNumberContext from "./contexts/LevelNumberContext"
import RouteContext from "./contexts/RouteContext";
import TimerContext from "./contexts/TimerContext";
import UserContext from "./contexts/UserContext";
import db from "./db/firestore";
import CameraScreen from "./screens/CameraScreen";
import HomeScreen from "./screens/HomeScreen";
import LevelSelector from "./screens/LevelSelector";
import LoginScreen from "./screens/LoginScreen";
import MapScreen from "./screens/MapScreen";
import SignUpScreen from "./screens/SignUpScreen";
import Rewards from "./screens/RewardsScreen";
import UserScreen from "./screens/UserScreen";
import Rankings from "./screens/RankingScreen";
import ConfettiAnimation from "./utils/Confetti";


const Stack = createNativeStackNavigator();

export default function App() {
  const [currentUser, setCurrentUser] = useState('')
  const [currentLevel, setCurrentLevel] = useState([])
  const [landmarks, setLandmarks] = useState([])
  const [route, setRoute] = useState([])
  const [lastLocation, setLastLocation] = useState({})
  const [hasStarted, setHasStarted] = useState(false)
  const [timer, setTimer] = useState({startTime: null, endTime: null})
  const [levelNumber, setLevelNumber] = useState(null)

    useEffect(() => {
      const fetchData = async () => {
        try {
          const obj = await db.collection("landmarks").get();
          const landmarksData = obj.docs.map((doc) => doc.data());
          setLandmarks(landmarksData);
          // console.log(landmarksData[0].location);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    }, []);
  return (
    <LevelNumberContext.Provider value={{levelNumber, setLevelNumber}}>
    <TimerContext.Provider value={{timer, setTimer}}>
    <HasStartedContext.Provider value={{hasStarted, setHasStarted}}>
    <RouteContext.Provider value={{route, setRoute}}>
    <UserContext.Provider value={{currentUser, setCurrentUser}}>
    <LevelContext.Provider value={{currentLevel, setCurrentLevel}}>
    <LandmarksContext.Provider value={{landmarks, setLandmarks}}>
    <LastLocationContext.Provider value={{lastLocation, setLastLocation}}>
    <NavigationContainer>
                <Stack.Navigator>
                  <Stack.Screen
                    options={{ headerShown: true }}
                    name="Login"
                    component={LoginScreen}
                  />
                  <Stack.Screen
                    options={{ headerShown: false }}
                    name="Home"
                    component={HomeScreen}
                  />
                  <Stack.Screen
                    options={{ headerShown: false }}
                    name="SignUp"
                    component={SignUpScreen}
                  />
                  <Stack.Screen
                    options={{ headerShown: false }}
                    name="LevelSelector"
                    component={LevelSelector}
                  />
                  <Stack.Screen
                    options={{ headerShown: false }}
                    name="MapScreen"
                    component={MapScreen}
                  />
                  <Stack.Screen
                    options={{ headerShown: false }}
                    name="CameraScreen"
                    component={CameraScreen}
                  />
                  <Stack.Screen
                    options={{ headerShown: false }}
                    name="RewardsScreen"
                    component={Rewards}
                  />
                  <Stack.Screen
                    options={{ headerShown: false }}
                    name="UserScreen"
                    component={UserScreen}
                  />
                  <Stack.Screen
                    options={{ headerShown: false }}
                    name="RankingScreen"
                    component={Rankings}
                  />
                  <Stack.Screen
                    options={{ headerShown: false }}
                    name="Confetti"
                    component={ConfettiAnimation}
                  />
                  {/* <Stack.Screen
            options={{ headerShown: false }}
            name="LevelAnalysis"
            component={LevelAnalysis}
          /> */}
                  {/* <Stack.Screen
            options={{ headerShown: false }}
            name="Tutorial"
            component={Tutorial}
          /> */}
                </Stack.Navigator>
              </NavigationContainer>
    </LastLocationContext.Provider>
    </LandmarksContext.Provider>
    </LevelContext.Provider>
    </UserContext.Provider>
    </RouteContext.Provider>
    </HasStartedContext.Provider>
    </TimerContext.Provider>
    </LevelNumberContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
  },
});
