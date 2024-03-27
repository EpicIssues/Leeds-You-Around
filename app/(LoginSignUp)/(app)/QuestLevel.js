import { View, StyleSheet, Text } from "react-native";
import { Link } from "expo-router";

export default function QuestLevelPage() {
    return (
        <View style={styles.mainContainer}>
            <Text style={styles.header}>Quests/Levels</Text>
            <View style={styles.questStuff}>
                <Link href="/MapScreen" style={styles.devSkipBtn}>
                    <Text>To Map View</Text>
                </Link>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
    },
    header: {
        marginVertical: 10,
    },
    questStuff: {
        backgroundColor: "gold",
        width: "90%",
        height: "80%",
        padding: 20,
        borderRadius: 20,
    },
    devSkipBtn: {
        backgroundColor: "white",
        color: "black",
        height: 30,
        width: 150,
        flex: 1,
        textAlign: "center",
        lineHeight: 30,
        borderRadius: 20,
        position: "absolute",
        bottom: 40,
        right: 30
    }
});
