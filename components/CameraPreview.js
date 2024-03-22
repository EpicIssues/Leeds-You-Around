import { View, ImageBackground, TouchableOpacity, Text } from "react-native";
import * as FileSystem from "expo-file-system";

export default function CameraPreview({ photo, retakePicture }) {
    // console.log(photo, 'photo');
        const convertToBase64 = async (photo) => {
          try {
            base64 = await FileSystem.readAsStringAsync(photo.uri, {
              encoding: FileSystem.EncodingType.Base64,
            });
            //   console.log(base64, 'baseeee');
            return base64
          } catch (error) {
            console.error("Error converting to base64:", error);
          }
        };
    convertToBase64(photo)
        .then(convertedPhoto => {
        console.log(convertedPhoto,'convertedPhoto');
    })
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