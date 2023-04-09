import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import GlobalStyles from "../components/GlobalStyles";
import HeaderUI from "../components/HeaderUI";

function Home(props) {
    return (
        <SafeAreaView style={GlobalStyles.customSafeArea}>
            <HeaderUI />
        </SafeAreaView>
    )
}

export default Home