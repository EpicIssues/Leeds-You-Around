import { Slot } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function Layout() {
    return (
        <View style={styles.mainContainer}>
            <Slot style={styles.slot} />
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        width: "100%",
        height: "100%",
    },
});
