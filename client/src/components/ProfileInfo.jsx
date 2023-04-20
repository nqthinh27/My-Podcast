import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { device } from "../constants/device";
function ProfileInfo(props) {
    const { avt, name, followers, following, posts } = props;

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
                        style={{
                            fontWeight: "bold",
                            fontSize: 19,
                        }}
                    >
                        {name}
                    </Text>
                </View>

                <View style={styles.profileinfoDetails}>
                    <View style={styles.profileinfoPostView}>
                        <Text style={styles.textmedium}>{posts}</Text>
                        <Text style={styles.textsmall}>Bài đăng</Text>
                    </View>
                    <View style={styles.profileinfoFollowerView}>
                        <Text style={styles.textmedium}>{followers}</Text>
                        <Text style={styles.textsmall}>Người theo dõi</Text>
                    </View>
                    <View style={styles.profileinfoFollowingView}>
                        <Text style={styles.textmedium}>{following}</Text>
                        <Text style={styles.textsmall}>Đang theo dõi</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    profileinfo: {
        width: '100%',
        flexDirection: "row",
        marginHorizontal: 16
    },
    profileinfoAvt: {

    },
    profileinfoUser: {
        marginLeft: 10
    },

    profileinfoName: {
        flex: 1,
        justifyContent: "center",
        alignItems: "flex-start",
        marginTop: 10,
    },
    profileinfoDetails: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        width: 270
    },

    textsmall: {
        fontSize: 13,
    },

    textmedium: {
        fontSize: 15,
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
