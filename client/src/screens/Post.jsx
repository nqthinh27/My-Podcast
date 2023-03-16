import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import GlobalStyles from "../components/GlobalStyles";

function Post(props) {
    return (
        <SafeAreaView style={GlobalStyles.customSafeArea}>
            <Text>Post Screen</Text>
        </SafeAreaView>
    )
}

export default Post