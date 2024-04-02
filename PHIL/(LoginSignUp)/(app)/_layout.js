import { Slot } from "expo-router";
import HeaderNav from "../../../components/HeaderNav";
import { StyleSheet, View } from "react-native";

export default function Layout() {
    return (
        <View style={styles.mainContainer}>
            <HeaderNav style={styles.headerNav}/>
            <Slot style={styles.slot}/>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "stretch",

    },
    headerNav: {
        
    },
    slot: {
    }
});
