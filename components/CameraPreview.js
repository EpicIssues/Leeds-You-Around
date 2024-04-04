import { View, ImageBackground, TouchableOpacity, Text } from "react-native";
import * as FileSystem from "expo-file-system";
import { useContext, useEffect, useState } from "react";
import recognizeLandmark from "./APIrequest";
import LevelContext from "../contexts/LevelContext";
import HasStartedContext from "../contexts/HasStartedContext";
import TimerContext from "../contexts/TimerContext";
import LevelNumberContext from "../contexts/LevelNumberContext";
import UserContext from "../contexts/UserContext";
import { startRouteTracking, stopRouteTracking } from "../utils/routeTracking";
import { useNavigation } from "@react-navigation/native";
import db from "../db/firestore";
import { doc, updateDoc } from "firebase/firestore";

export default function CameraPreview({ photo, retakePicture }) {
    // const [landmarks, setLandmarks] = useState([false, {}]);
    const { currentLevel, setCurrentLevel } = useContext(LevelContext);
    const { hasStarted, setHasStarted } = useContext(HasStartedContext);
    const { timer, setTimer } = useContext(TimerContext);
    const { levelNumber, setLevelNumber } = useContext(LevelNumberContext);
    const { currentUser, setCurrentUser } = useContext(UserContext);

    const navigation = useNavigation();

    console.log(levelNumber, "------levelNumber");
    // console.log(currentUser.email, "----currentUser");

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
            recognizeLandmark(convertedPhoto).then((data) => {
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
                } else console.log("empty array of landmarks");

                // if (!landmarks[0]) setLandmarks([true, data]);
            });
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

        if (levelNumber === 2) {
            const updatedFields = { level2comp: true };
            db.collection("users")
                .doc(currentUser.email)
                .update(updatedFields)
                .then(() => {
                    console.log("Document updated successfully.");
                })
                .catch((error) => {
                    console.error("Error updating document: ", error);
                });
        }

        navigation.navigate("RewardsScreen");
    }

    const __handleBackButton = () => {
        navigation.goBack("MapScreen");
    };

    console.log(timer, "<---timer");
    console.log(currentLevel.length, "<------------ current level length");
    // console.log("whole page is rerendering");
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
                    width: "30%",
                    height: "6%",
                    backgroundColor: "white",
                    top: 100,
                    left: 5,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 2,
                    borderRadius: 10,
                    borderColor: "#0782F9",
                    borderWidth: 2,
                }}
            >
                <Text
                    style={{
                        color: "#0782F9",
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
                    backgroundColor: "white",
                    borderRadius: 10,
                    borderWidth: 2,
                    borderColor: "#0782F9",
                    fontWeight: "bold",
                }}
            >
                <Text
                    style={{
                        color: "#0782F9",
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

            <View
                style={{
                    width: "60%",
                    right: "0%",
                    top: "25%",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    height: 40,
                    position: "absolute",
                    flex: 1,
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "flex-end",
                    marginRight: 10,
                }}
            >
                <Text
                    style={{
                        backgroundColor: "white",
                        color: "#0782F9",
                        borderWidth: 2,
                        borderColor: "#0782F9",
                        padding: 15,
                        marginVertical: 10,
                        lineHeight: 10,
                        fontSize: 20,
                        fontWeight: "bold",
                        borderRadius: 10,
                        overflow: "hidden",
                    }}
                >
                    Places Left:
                </Text>

                {currentLevel.map((landmark, index) => {
                    return (
                        <Text
                            key={index}
                            style={{
                                borderColor: "white",
                                borderWidth: 2,
                                backgroundColor: "#0782F9",
                                color: "white",
                                paddingVertical: 15,
                                paddingHorizontal: 5,
                                marginVertical: 10,
                                lineHeight: 8,
                                fontWeight: "bold",
                                borderRadius: 10,
                                overflow: "hidden",
                            }}
                        >
                            {landmark.name}
                        </Text>
                    );
                })}
            </View>
        </View>
    );
}
