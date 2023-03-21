import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
function ProfileInfo(props) {
    const { avt, name, followers, following, posts } = props;

    return (
        <View style={styles.profileinfo}>
            <View style={{ marginHorizontal: 20 }}>
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
            </View>

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

                <View style={styles.textView2}>
                    <View style={styles.viewpost}>
                        <Text style={styles.textmedium}>{posts}</Text>
                        <Text style={styles.textsmall}>Bài đăng</Text>
                    </View>
                    <View style={styles.viewfollower}>
                        <Text style={styles.textmedium}>{followers}</Text>
                        <Text style={styles.textsmall}>Người theo dõi</Text>
                    </View>
                    <View style={styles.viewfollowing}>
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
        flexDirection: "row",
    },

    profileinfoName: {
        flex: 1,
        justifyContent: "center",
        alignItems: "flex-start",
        marginTop: 10,
    },
    textView2: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
    },

    textsmall: {
        fontSize: 13,
    },

    textmedium: {
        fontSize: 15,
    },
    viewuser: {
        flex: 4,
        marginRight: 20,
    },
    viewpost: {
        justifyContent: "center",
        alignItems: "center",
    },
    viewfollower: {
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: "9%",
    },

    viewfollowing: {
        justifyContent: "center",
        alignItems: "center",
    },
});

export default ProfileInfo;
