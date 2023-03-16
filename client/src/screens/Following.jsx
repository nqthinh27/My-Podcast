import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import GlobalStyles from "../components/GlobalStyles";

function Following(props) {
    return (
        <SafeAreaView style={GlobalStyles.customSafeArea}>
            <Text>Folw screen</Text>
        </SafeAreaView>
    )
}

export default Following