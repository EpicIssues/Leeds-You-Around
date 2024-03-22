import { useState } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";
import GoToCamera from "./components/GoToCamera";
import CameraPreview from "./components/CameraPreview";

export default function App() {
    // Set state for if camera is being used
    const [startCamera, setStartCamera] = useState(false);

    // Function that Requests permissions to use camera if not already granted/denied
    const __startCamera = async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        if (status === "granted") {
            setStartCamera(true);
        } else {
            Alert.alert("Camera permissions denied");
        }
    };

    // Set state for the preview of a captured photo (ie after you've taken it you can see it)
    const [previewVisible, setPreviewVisible] = useState(false);

    // Set state for a captured image.
    const [capturedImage, setCapturedImage] = useState(null);

    // Assigns a new Camera instance
    let camera = new Camera();

    // Function for taking a picture.
    const __takePicture = async () => {
        if (!camera) return;
        const photo = await camera.takePictureAsync();
        // console.log(photo);
        setPreviewVisible(true);
        setCapturedImage(photo);
    };

    // Function for retaking an image (ie bringing you back to the camera)
    const __retakePicture = () => {
        setCapturedImage(null);
        setPreviewVisible(false);
        __startCamera();
    };

    return (
        <View style={styles.container}>
            {startCamera ? (
                previewVisible && capturedImage ? (
                    <CameraPreview
                        photo={capturedImage}
                        retakePicture={__retakePicture}
                    />
                ) : (
                    <Camera
                        style={{ flex: 1, width: "100%" }}
                        ref={(r) => {
                            camera = r;
                        }}
                    >
                        <View
                            style={{
                                position: "absolute",
                                bottom: 0,
                                flexDirection: "row",
                                flex: 1,
                                width: "100%",
                                padding: 20,
                                justifyContent: "space-between",
                            }}
                        >
                            <View
                                style={{
                                    alignSelf: "center",
                                    flex: 1,
                                    alignItems: "center",
                                }}
                            >
                                <TouchableOpacity
                                    onPress={__takePicture}
                                    style={{
                                        width: 70,
                                        height: 70,
                                        bottom: 0,
                                        borderRadius: 50,
                                        backgroundColor: "#fff",
                                    }}
                                />
                            </View>
                        </View>
                    </Camera>
                )
            ) : (
                <GoToCamera startCamera={__startCamera} />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
