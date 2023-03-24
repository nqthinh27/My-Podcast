import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, SafeAreaView } from "react-native";
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
