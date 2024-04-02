import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import CameraView from "./screens/CameraScreen";
import CameraScreen from "./screens/CameraScreen";
import LevelSelector from "./screens/LevelSelector";
import UserContext from "./contexts/UserContext";
import LevelContext from "./contexts/LevelContext";
import { useState } from "react";
// import { AppRegistry } from "react-native";
// import App from "./App";

// AppRegistry.registerComponent("firebaseAuth", () => App);

const Stack = createNativeStackNavigator();

export default function App() {
  // const [currentUser, setCurrenUser] = useState('yeahyeah')
  const [currentUser, setCurrentUser] = useState('')
  const [currentLevel, setCurrentLevel] = useState(0)
  return (
    <UserContext.Provider value={{currentUser, setCurrentUser}}>
    <LevelContext.Provider value={{currentLevel, setCurrentLevel}}>
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
          {/* <Stack.Screen
            options={{ headerShown: false }}
            name="MapView"
            component={MapView}
          /> */}
          <Stack.Screen
            options={{ headerShown: false }}
            name="CameraScreen"
            component={CameraScreen}
          />
          {/* <Stack.Screen
            options={{ headerShown: false }}
            name="Rewards"
            component={Rewards}
          /> */}
          {/* <Stack.Screen
            options={{ headerShown: false }}
            name="UserPage"
            component={UserPage}
          /> */}
          {/* <Stack.Screen
            options={{ headerShown: false }}
            name="LeaderBoard"
            component={LeaderBoard}
          /> */}
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
    </LevelContext.Provider>
    </UserContext.Provider>
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
