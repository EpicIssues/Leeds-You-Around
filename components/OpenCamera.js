import { TouchableOpacity, Text, View } from "react-native";
import { Camera } from "expo-camera";
import { useNavigation } from "@react-navigation/native";

export default function OpenCamera({
    setPreviewVisible,
    setCapturedImage,
    setStartCamera,
    camera,
}) {

    const navigation = useNavigation()


    // Function for taking a picture.
    const __takePicture = async () => {
        if (!camera) return;
        const photo = await camera.takePictureAsync();
        // console.log(photo);
        setPreviewVisible(true);
        setCapturedImage(photo);
    };

    const __handleBackButton = () => {
        setStartCamera(false);
        navigation.replace("MapScreen");
    };

    return (
        <Camera
            ratio={"16:9"}
            style={{ objectFit: "fill", width: "100%", height: "100%" }}
            ref={(r) => {
                camera = r;
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
    );
}
