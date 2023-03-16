import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import GlobalStyles from "../components/GlobalStyles";

function Setting(props) {
    return (
        <SafeAreaView style={GlobalStyles.customSafeArea}>
            <Text>Setting Screen</Text>
        </SafeAreaView>
    )
}

export default Setting