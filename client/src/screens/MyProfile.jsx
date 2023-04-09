import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Image,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import colors from "../constants/colors";
import Icon from "react-native-vector-icons/Entypo";
import GlobalStyles from "../components/GlobalStyles";
import ProfileInfo from "../components/ProfileInfo";
import { MyPopularData } from "../../dummyData";
import ProfilePodcast from "../components/ProfilePodcast";
import { MyNewReLeaseData } from "../../dummyData";

function MyProfile(props) {
    //navigation
    // const { navigation, route } = props;
    // //function of navigate
    // const { navigate, goback } = navigation;

    const [posts, setPosts] = useState(1)
    const [followers, setFollowers] = useState(1)
    const [following, setFollowing] = useState(1)

    function updatePosts() {
        setPosts(posts + 1)
    }

    return (
        <SafeAreaView style={[styles.myprofile, GlobalStyles.droidSafeArea]}>
            <ScrollView>
                <View style={styles.myprofileHeader}>
                    <Icon
                        name={"chevron-left"}
                        size={26}
                        onPress={() => {
                            navigate("UIScreen");
                        }}
                    />
                    <Text style={styles.myprofileTextHeader}>
                        Trang cá nhân
                    </Text>
                    <Text> </Text>
                </View>

                <View style={styles.myprofileContainer}>
                    <ProfileInfo
                        styles={{
                            width: "100%",
                            backgroundColor: "red",
                        }}
                        avt="https://firebasestorage.googleapis.com/v0/b/mypodcast-88135.appspot.com/o/avatar.jpg?alt=media&token=fc074eb8-e67f-4235-8230-160cae1557b5"
                        name="Nguyễn Quang Thịnh"
                        followers={2002}
                        following={2002}
                        posts={20}
                    ></ProfileInfo>

                    <TouchableOpacity style={styles.myprofileEditProfile}>
                        <Text style={styles.myprofileButtonEditprofile}>
                            Chỉnh sửa trang cá nhân
                        </Text>
                    </TouchableOpacity>

                    <Text
                        style={{
                            marginLeft: 16,
                            fontSize: 18,
                            fontWeight: "bold",
                            marginBottom: 10,
                        }}
                    >
                        Nổi bật
                    </Text>
                    <View
                        style={{
                            marginHorizontal: 9,
                            flexDirection: "row",
                            justifyContent: "space-around",
                        }}
                        horizontal={true}
                    >
                        {MyPopularData.map((item, index) => {
                            return (
                                <TouchableOpacity key={index}>
                                    <ProfilePodcast item={item} />
                                </TouchableOpacity>
                            );
                        })}
                    </View>

                    <Text
                        style={{
                            marginLeft: 16,
                            fontSize: 18,
                            fontWeight: "bold",
                            marginBottom: 10,
                        }}
                    >
                        Mới phát hành
                    </Text>

                    <View
                        style={{
                            marginHorizontal: 9,
                            flexDirection: "row",
                            justifyContent: "space-around",
                            flexWrap: "wrap",
                        }}
                        horizontal={true}
                    >
                        {MyNewReLeaseData.map((item, index) => {
                            return (
                                <TouchableOpacity key={index}>
                                    <ProfilePodcast item={item} />
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    myprofile: {
        flex: 1,
        backgroundColor: "#fff",
    },

    myprofileHeader: {
        flex: 1,
        marginHorizontal: 20,
        marginBottom: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
    },

    myprofileTextHeader: {
        fontWeight: "bold",
        fontSize: 21,
    },
    myprofileContainer: {
        flex: 20,
        // alignItems: 'center',
        marginTop: 5,
    },

    myprofileEditProfile: {
        width: "62%",
        height: 40,
        borderRadius: 6,
        borderWidth: 1,
        backgroundColor: "#D6D6D6",
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 16,
        borderColor: "white",
        alignSelf: "center",
    },

    myprofileButtonEditprofile: {
        fontSize: 15,
        fontWeight: "500",
    },
});

export default MyProfile;