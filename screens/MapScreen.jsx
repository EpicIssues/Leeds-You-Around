import { View, StyleSheet, Text, TouchableOpacity} from "react-native";
import { useNavigation } from "@react-navigation/core";
import Map from "../components/Map";

export default function MapPage() {
    const navigation = useNavigation()

    const toCameraHandler = () => {
        navigation.replace('CameraScreen')
    }



    return (
        <View style={styles.mainContainer}>
            <View style={styles.mapArea}>
                <Map style={styles.mapMap}/>
            </View>
            <TouchableOpacity onPress={toCameraHandler} style={styles.cameraLink}>
            <Text style={styles.cameraOpenBtn}>
                Camera
            </Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white"
    },
    header: {
        marginBottom: 10
    },
    mapArea: {
        // backgroundColor: "lightblue",
        width: "100%",
        height: "100%",
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    mapText: {
        color: "black"
    },
    cameraLink: {
        position: "absolute",
        zIndex: 2,
        bottom: 30,
        backgroundColor: "lightgreen",
        paddingVertical: 15,
        paddingHorizontal: 40,
    },
});