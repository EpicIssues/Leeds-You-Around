import { useState } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { Camera } from "expo-camera";
import CameraPreview from "../../../components/CameraPreview";
import OpenCamera from "../../../components/OpenCamera";
import { useNavigation } from "@react-navigation/native";

export default function CameraView() {
    const navigation = useNavigation();

    // Set state for if camera is being used
    const [startCamera, setStartCamera] = useState(true);

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

    // Function for retaking an image (ie bringing you back to the camera)
    const __retakePicture = () => {
        setCapturedImage(null);
        setPreviewVisible(false);
        __startCamera();
    };

    return (
        <View style={styles.container}>
            {previewVisible && capturedImage ? (
                <CameraPreview
                    style={styles.CameraPreview}
                    photo={capturedImage}
                    retakePicture={__retakePicture}
                />
            ) : (
                <OpenCamera
                    setPreviewVisible={setPreviewVisible}
                    setCapturedImage={setCapturedImage}
                    setStartCamera={setStartCamera}
                    camera={camera}
                />
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
    CameraPreview: {
        width: "100%",
        height: "10%",
    },
});
