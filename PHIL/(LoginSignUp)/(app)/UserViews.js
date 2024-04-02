import { View, StyleSheet, Text} from "react-native";

export default function UserPage() {
    return (
        <View style={styles.mainContainer}>
            <Text style={styles.header}>User Stuff</Text>
            <View style={styles.questStuff}>

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
        backgroundColor: "white"
    },
    header: {
        marginBottom: 10
    },
    userArea: {
        backgroundColor: "pink",
        width: "90%",
        height: "80%",
        padding: 20,
        borderRadius: 20,
    },
});