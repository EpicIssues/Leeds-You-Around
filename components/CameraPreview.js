import { View, ImageBackground, TouchableOpacity, Text } from "react-native";

export default function CameraPreview({ photo, retakePicture }) {
    // console.log("sdsfds", photo);
    return (
        <View
            style={{
                backgroundColor: "transparent",
                flex: 1,
                width: "100%",
                height: "100%",
            }}
        >
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
        </View>
    );
}