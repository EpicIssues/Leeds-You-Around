import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useState } from "react";

export default function HeaderNav() {
    const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    const burgerMenuOpenHandler = () => {
        setIsBurgerMenuOpen((currValue) => {
            // console.log(`isBurgerMenuOpen is now ${!currValue}`)
            return !currValue
        })
    }

    // const userMenuHandler = () => {
    //     setIsUserMenuOpen((currValue) => {
    //         // console.log(`isUserMenuOpen is now ${!currValue}`)
    //         return !currValue
    //     })
    // }

    return (
        <View style={styles.mainContainer}>
            <TouchableOpacity style={styles.placeHolder} onPress={burgerMenuOpenHandler}>
                <Text style={styles.btn}>Burger Menu</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.placeHolder}> 
                <Text style={styles.btn}>User icon</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#eee",
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
    }
});
