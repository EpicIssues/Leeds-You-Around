import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Link } from "expo-router";

export default function LoginSignUpPage() {
    return (
        <View style={styles.mainContainer}>
            <View style={styles.container}>
                <View style={styles.textStyling}></View>
                <Text style={styles.loginSignUp}>Login</Text>
                <Text style={styles.loginSignUp} styles={styles.selected}>
                    Sign up
                </Text>
            </View>
            <View style={styles.userInput}>
                <Link href="/QuestLevel" style={styles.devSkipBtn}>
                    <Text >To Quest Selector</Text>
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
    },
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "flex-start",
        justifyContent: "center",
        flexDirection: "row",
        marginTop: 50,
    },
    loginSignUp: {
        textAlign: "center",
        lineHeight: 10,
        color: "#000",
        height: 10,
        width: 150,
        backgroundColor: "pink",
        padding: 20,
        marginHorizontal: 10,
    },
    userInput: {
        backgroundColor: "pink",
        width: "90%",
        height: "80%",
        padding: 20,
        marginBottom: 20,
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
