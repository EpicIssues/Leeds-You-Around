import { View, StyleSheet, Text, TouchableOpacity} from "react-native";
import { router } from "expo-router";

export default function MapPage() {

    const toCameraHandler = () => {
        router.replace('/CameraViews')
    }

    const toARHandler = () => {
        router.replace('/AR')
    }

    return (
        <View style={styles.mainContainer}>
            <View style={styles.mapArea}>
                <Text style={styles.mapText}>Map</Text>
            </View>
            <TouchableOpacity onPress={toCameraHandler} style={styles.cameraLink}>
            <Text style={styles.cameraOpenBtn}>
                Camera
            </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={toARHandler} style={styles.arLink}>
            <Text style={styles.arOpenBtn}>
                Ar
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
        backgroundColor: "lightblue",
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
    arLink: {
        position: "absolute",
        zIndex: 2,
        top: 100,
        right: 10,
        backgroundColor: "orange",
        paddingVertical: 10,
        paddingHorizontal: 40,
    }
});