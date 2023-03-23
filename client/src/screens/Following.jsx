import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeaderUI, FollowingItem } from "../components";
import GlobalStyles from "../components/GlobalStyles";
import { FollowingData } from "../../dummyData";

export default function Following(props) {
    return (
        <SafeAreaView style={GlobalStyles.customSafeArea}>
            <ScrollView>
                <HeaderUI />
                <View style={followStyles.contentWrapper}>
                    <View style={followStyles.contentSection}>
                        <View
                            // onPress={() => {
                            //     playerNavigate();
                            // }}
                        >
                            <FollowingItem
                                avtUrl={FollowingData[0].avtUrl}
                                name={FollowingData[0].name}
                                date={FollowingData[0].date}
                                title={FollowingData[0].title}
                                descripttion={FollowingData[0].descripttion}
                                ranking={FollowingData[0].ranking}
                            />
                            <FollowingItem
                                avtUrl={FollowingData[0].avtUrl}
                                name={FollowingData[0].name}
                                date={FollowingData[0].date}
                                title={FollowingData[0].title}
                                descripttion={FollowingData[0].descripttion}
                                ranking={FollowingData[0].ranking}
                            /> 
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

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
