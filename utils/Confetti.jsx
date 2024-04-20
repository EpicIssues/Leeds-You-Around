import React, { useEffect, useRef } from "react";
import { View } from "react-native";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";

export default function ConfettiAnimation() {
    const navigation = useNavigation()

    const animationRef = useRef(LottieView);

    useEffect(() => {
    animationRef.current?.play();

    // Or set a specific startFrame and endFrame with:
    // animationRef.current?.play(0);
    }, []);

    setTimeout(() => {
        navigation.navigate("RewardsScreen")
    }, 8500)

    return (
        <View>
            <LottieView
                ref={animationRef}
                source={require("../assets/confetti.json")}
                style={{width: "100%", height: "100%"}}
                loop={false}
                resizeMode="cover"
            />
        </View>

    );
}