import { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import GlobalStyles from "../components/GlobalStyles";
import { warningLogin } from "../ultis/warning";
import { useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";

export default function Following(props) {
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
            <Text>Folw screen</Text>
        </SafeAreaView>
    )
}