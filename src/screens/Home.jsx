import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import GlobalStyles from "../components/GlobalStyles";

function Home(props) {
    return (
        <SafeAreaView style={GlobalStyles.customSafeArea}>
            <Text>Home Screen</Text>
        </SafeAreaView>
    )
}

export default Home