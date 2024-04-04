import { useNavigation } from "@react-navigation/native";
import { Camera } from "expo-camera";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function OpenCamera({
  setPreviewVisible,
  setCapturedImage,
  setStartCamera,
  camera,
}) {
  const navigation = useNavigation();

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
    navigation.goBack("MapScreen");
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
        style={styles.buttonOutline}
      >
        <Text style={styles.buttonOutlineText}> Back To Map</Text>
      </TouchableOpacity>
            <View style={{
                position: "absolute",
                    width: "40%",
                    height: "30%",
                    
                    top: "35%",
                    left: "30%",
                    borderColor: "white",
                    borderWidth: "2%",
            }}>

            </View>
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

const styles = StyleSheet.create({
  buttonOutlineText: {
    color: "#0782F9",
    fontSize: 15,
    padding: 10,
  },
  buttonOutline: {
    top: 80,
    left: 20,
    width: "30%",
    height: "5%",
    borderRadius: 20,
    backgroundColor: "white",
    borderColor: "#0782F9",
    borderWidth: 2,
    marginTop: 10,
  },
});
