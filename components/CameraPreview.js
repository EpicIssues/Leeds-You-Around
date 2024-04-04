import { View, ImageBackground, TouchableOpacity, Text } from "react-native";
import * as FileSystem from "expo-file-system";
import { useContext, useEffect, useState } from "react";
import recognizeLandmark from "./APIrequest";
import LevelContext from "../contexts/LevelContext";
import { startRouteTracking, stopRouteTracking } from "../utils/routeTracking";
import HasStartedContext from "../contexts/HasStartedContext";
import TimerContext from "../contexts/TimerContext";
import { useNavigation } from "@react-navigation/native";

export default function CameraPreview({ photo, retakePicture }) {
    // const [landmarks, setLandmarks] = useState([false, {}]);
    const { currentLevel, setCurrentLevel } = useContext(LevelContext);
    const { hasStarted, setHasStarted } = useContext(HasStartedContext);
    const { timer, setTimer } = useContext(TimerContext);
    const navigation = useNavigation()

    useEffect(() => {
        const convertToBase64 = async (photo) => {
            try {
                base64 = await FileSystem.readAsStringAsync(photo.uri, {
                    encoding: FileSystem.EncodingType.Base64,
                });
                return base64;
            } catch (error) {
                console.error("Error converting to base64:", error);
            }
        };
        convertToBase64(photo).then((convertedPhoto) => {
            recognizeLandmark(convertedPhoto)
                .then((data) => {
                    if (data.length !== 0) {
                        console.log(
                            data,
                            "====================================data"
                        );

                        // target will go here ----------
                        setCurrentLevel(
                            currentLevel.filter(
                                (landmark) => !data.includes(landmark.name)
                            )
                        );

                        // console.log(
                        //     currentLevel,
                        //     "=================currentLevel"
                        // );
                    } else console.log("empty array of landmarks");

                    // if (!landmarks[0]) setLandmarks([true, data]);
                })
            });
        }, []);
        
        if (currentLevel.length === 0 && hasStarted === true) {
            setTimer((currTime) => ({
                startTime: currTime.startTime,
                endTime: Date.now(),
            }));
            stopRouteTracking();
            setHasStarted(false);

            console.log("");
            console.log("You Have Finished");
            console.log("");

            navigation.navigate("RewardsScreen")
        }

        const __handleBackButton = () => {
            navigation.goBack("MapScreen");
        };
        
        
    console.log(timer, "<---timer");
    console.log(currentLevel.length, "<------------ current level length");
    console.log("whole page is rerendering");
    return (
        <View
            style={{
                backgroundColor: "transparent",
                flex: 1,
                width: "100%",
                height: "100%",
            }}
        >
             <TouchableOpacity
                onPress={__handleBackButton}
                style={{
                    position: "absolute",
                    width: "20%",
                    height: "6%",
                    backgroundColor: "#14274e",
                    top: 100,
                    left: 10,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    opacity: 0.8,
                    zIndex: 2
                }}
            >
                <Text
                    style={{
                        color: "#fff",
                        fontWeight: "bold",
                        textAlign: "center",
                    }}
                >
                    Back To Map
                </Text>
            </TouchableOpacity>
            <ImageBackground
                source={{ uri: photo && photo.uri }}
                style={{
                    flex: 1,
                }}
            />
            <TouchableOpacity
                onPress={retakePicture}
                style={{
                    width: "50%",
                    right: "25%",
                    bottom: "2%",
                    backgroundColor: "#14274e",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    height: 40,
                    position: "absolute",
                }}
            >
                <Text
                    style={{
                        color: "#fff",
                        fontWeight: "bold",
                        textAlign: "center",
                    }}
                >
                    Re-take
                </Text>
            </TouchableOpacity>
            <Text
                style={{
                    position: "absolute",
                    top: 40,
                    left: 0,
                    backgroundColor: "white",
                    color: "black",
                    fontWeight: "bold",
                    textAlign: "center",
                }}
            >
                {/* {JSON.stringify(landmarks[1])} */}
            </Text>
        </View>
    );
}
