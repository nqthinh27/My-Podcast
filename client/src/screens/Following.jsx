import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, SafeAreaView } from "react-native";
import { useSelector } from "react-redux";

import { HeaderUI, FollowingItem } from "../components";
import GlobalStyles from "../components/GlobalStyles";
import { FollowingData } from "../../dummyData";
import { lightfollowStyles, darkfollowStyles} from "../constants/darkLight/themeFollowing"
import colors from "../constants/colors";
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
        <SafeAreaView style={[{backgroundColor: isDarkTheme ? colors.dark : colors.white} ,GlobalStyles.customSafeArea]}>
            <ScrollView>
                <HeaderUI />
                <View style={isDarkTheme ? darkfollowStyles.contentWrapper : lightfollowStyles.contentWrapper}>
                    <View style={followStyles.contentSection}>
                        <View
                        // onPress={() => {
                        //     playerNavigate();
                        // }}
                        >
                            {FollowingData.map((item, index) => {
                                return (
                                    <View key={index}>
                                        <FollowingItem
                                            avtUrl={item.avtUrl}
                                            name={item.name}
                                            date={item.date}
                                            title={item.title}
                                            descripttion={item.descripttion}
                                        />
                                    </View>
                                )
                            })}
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
    
const followStyles = StyleSheet.create({
    contentWrapper: {
        // width: 315,
        // marginRight: 16,
        marginTop: 10,
        // borderRadius: 20,
        backgroundColor: "#EDEDED",
    },

    contentSection: {
        marginVertical: 6,
        // marginHorizontal: 12,
    },
});
}