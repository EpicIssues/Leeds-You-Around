import { View, ImageBackground, TouchableOpacity, Text } from "react-native";
import * as FileSystem from "expo-file-system";
import recognizeLandmark from "./APIrequest";
import { useEffect, useState } from "react";

export default function CameraPreview({ photo, retakePicture }) {
    const [landmarks, setLandmarks] = useState({})
    
        const convertToBase64 = async (photo) => {
          try {
            base64 = await FileSystem.readAsStringAsync(photo.uri, {
              encoding: FileSystem.EncodingType.Base64,
            });
            return base64
          } catch (error) {
            console.error("Error converting to base64:", error);
          }
        };
        convertToBase64(photo)
            .then(convertedPhoto => {
                recognizeLandmark(convertedPhoto)
                    .then((data) => {
                        if (Object.keys(landmarks).length === 0)
                        setLandmarks(data)
                    })
})
            
            
            
            
            
console.log('whole page is rerendering');
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
                        position: "absolute"
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
                    position: 'absolute',
                    top: 40,
                    left: 0,
                    backgroundColor: 'white',
                            color: "black",
                            fontWeight: "bold",
                            textAlign: "center",
                        }}
            >
                {JSON.stringify(landmarks)}

                    </Text>
        </View>
    );
}