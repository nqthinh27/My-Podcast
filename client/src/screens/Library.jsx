import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import GlobalStyles from "../components/GlobalStyles";

function Library(props) {
    return (
        <SafeAreaView style={GlobalStyles.customSafeArea}>
            <Text>Library Screen</Text>
        </SafeAreaView>
    )
}

export default Library