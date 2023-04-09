import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import GlobalStyles from "../components/GlobalStyles";
import { useEffect } from "react";
import { warningLogin } from "../ultis/warning";
import { useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";


function Post(props) {
    const { navigation, route } = props;
    const { navigate, goback } = navigation;
    const user = useSelector((state) => state.auth.login.currentUser);
    const isFocused = useIsFocused();
    useEffect(() => {
        if (isFocused && !user) {
            // navigate("MyProfile");   
            warningLogin(navigate, 'Login', 'Home');
        }
    }, [isFocused]);
    return (
        <SafeAreaView style={GlobalStyles.customSafeArea}>
            <Text>Post Screen</Text>
        </SafeAreaView>
    )
}

export default Post