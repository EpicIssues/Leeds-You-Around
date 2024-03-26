import { View, StyleSheet, Text } from "react-native";
import { Link } from "expo-router";

export default function HeaderNav() {
    return (
        <View style={styles.mainContainer}>
            <Text style={styles.placeHolder}>Burger Menu</Text>
            <Link href="/UserViews" style={styles.placeHolder}>
                <Text >User icon</Text>
            </Link>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "rgba(68, 224, 35, 0.61)",
        width: "100%",
        position: "absolute",
        height: "10%",
        zIndex: 1,
        alignItems: "center",
    },
    placeHolder: {
        color: "black",
        marginHorizontal: 15,
        backgroundColor: "white",
        padding: 10,
    },
});
