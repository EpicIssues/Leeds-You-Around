import { StyleSheet, Text, View, TouchableOpacity } from "react-native"
import { router } from "expo-router";

export default function ARArea() {

    const backToMapHandler = () => {
        router.replace('/MapScreen')
    }

    return (
        <View style={styles.mainContainer}>
            <Text style={styles.placeholderText}>AR Area</Text>
            <TouchableOpacity onPress={backToMapHandler} style={styles.backToMap}>
                <Text>
                    Back To Map
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        width: "100%",
        height: "100%",
        backgroundColor: "yellow",
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    placeholderText: {
        color: "black",
        backgroundColor: "white",
        padding: 20
    },
    backToMap: {
        position: "absolute",
        bottom: 10,
        left: 20,
        backgroundColor: "lightgreen",
        padding: 15
    }
})