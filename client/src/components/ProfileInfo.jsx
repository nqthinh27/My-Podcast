import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { device } from "../constants/device";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { lightHeader, darkHeader } from '../constants/darkLight/themeHeaderUI'

function ProfileInfo(props) {
    const navigation = useNavigation();
    const { avt, name, followers, following, posts, id } = props;
    const navigateFollowersDetail = () => {
        navigation.navigate('FollowDetail', { type: 'followers', id: id })
    }
    const navigateFollowingDetail = () => {
        navigation.navigate('FollowDetail', { type: 'following', id: id })
    }
    console.log(id);

    const isDarkTheme = useSelector((state) => state.theme.isDarkTheme);
    const currentLanguage = useSelector(
        (state) => state.language.currentLanguage
    );
    return (
        <View style={styles.profileinfo}>
            <Image
                style={{
                    width: 75,
                    height: 75,
                    borderRadius: 50,
                }}
                source={{
                    uri: avt,
                }}
            />

            <View style={styles.profileinfoUser}>
                <View style={styles.profileinfoName}>
                    <Text
                        style={[{
                            fontWeight: "600",
                            fontSize: 20,
                        }, isDarkTheme ? darkHeader.text : lightHeader.text]}
                    >
                        {name}
                    </Text>
                </View>

                <View style={styles.profileinfoDetails}>
                    <View style={styles.profileinfoPostView}>
                        <Text style={[styles.textmedium, isDarkTheme ? darkHeader.text : lightHeader.text]}>{posts}</Text>
                        <Text style={[styles.textsmall, isDarkTheme ? darkHeader.text : lightHeader.text]}>{currentLanguage === "vi" ? "Bài đăng" : "Posts"}</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.profileinfoFollowerView}
                        onPress={navigateFollowersDetail}
                        activeOpacity={1}>
                        <Text style={[styles.textmedium, isDarkTheme ? darkHeader.text : lightHeader.text]}>{followers}</Text>
                        <Text style={[styles.textsmall, isDarkTheme ? darkHeader.text : lightHeader.text]}>{currentLanguage === "vi" ? "Người theo dõi" : "Followers"}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.profileinfoFollowingView}
                        onPress={navigateFollowingDetail}
                        activeOpacity={1}>
                        <Text style={[styles.textmedium, isDarkTheme ? darkHeader.text : lightHeader.text]}>{following}</Text>
                        <Text style={[styles.textsmall, isDarkTheme ? darkHeader.text : lightHeader.text]}>{currentLanguage === "vi" ? "Đang theo dõi" : "Following"}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    profileinfo: {
        width: device.width,
        flexDirection: "row",
        marginHorizontal: 16,
    },
    profileinfoAvt: {

    },
    profileinfoUser: {
        marginLeft: 13,
        alignSelf: 'center',
    },

    profileinfoName: {
        flex: 1,
        justifyContent: "center",
        alignItems: "flex-start",
    },
    profileinfoDetails: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'space-between',
        width: device.width - 16 * 2 - 13 - 75
    },

    textsmall: {
        fontSize: 13,
    },

    textmedium: {
        fontSize: 17,
        fontWeight: 500
    },

    profileinfoPostView: {
        justifyContent: "center",
        alignItems: "center",
    },
    profileinfoFollowerView: {
        justifyContent: "center",
        alignItems: "center",
    },

    profileinfoFollowingView: {
        justifyContent: "center",
        alignItems: "center",
    },
});

export default ProfileInfo;
