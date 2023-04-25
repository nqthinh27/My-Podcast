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
import React, { useEffect, useState } from "react";
import colors from "../constants/colors";
import Icon from "react-native-vector-icons/Feather";
import ProfileInfo from "../components/ProfileInfo";
import { MyPopularData } from "../../dummyData";
import ProfilePodcast from "../components/ProfilePodcast";
import { MyNewReLeaseData } from "../../dummyData";
import GlobalStyles from "../components/GlobalStyles";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { checkIdInclude, timeDiff } from "../ultis/helper";
import { getPublicDataAPI, patchDataAPI } from "../ultis/fetchData";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { warningLogin } from "../ultis/warning";
// import Icon from "react-native-vector-icons/Entypo";

export default function OtherProfile() {
    const { navigate, goBack } = useNavigation();
    const currentUser = useSelector((state) => state.auth.login.currentUser);
    const otherUser = useSelector((state) => state.profile.otherUser.data);
    const allPosts = useSelector((state) => state.profile.allPosts.data);
    const topPosts = useSelector((state) => state.profile.topPosts.data);
    const followers = useSelector((state) => state.profile.followers.data);
    const following = useSelector((state) => state.profile.following.data);
    const [isFollowed, setIsFollowed] = useState(currentUser ? checkIdInclude(followers, currentUser._id) : false);
    // info
    const [token, setToken] = useState("");
    const [currenFollowers, setCurrenFollowers] = useState(otherUser.followers);
    const handleFollowOther = () => {
        if (!currentUser) {
            warningLogin(navigate, 'Login', 'OtherProfile');
        } else {
            if (isFollowed) setCurrenFollowers(prevFollowers => prevFollowers - 1);
            else setCurrenFollowers(prevFollowers => prevFollowers + 1);
            setIsFollowed(!isFollowed);
        }
    };
    AsyncStorage.getItem('access_token').then((value) => {
        setToken(value);
    });
    useEffect(() => {
        if (!isFollowed) {
            patchDataAPI(`follow/${otherUser._id}/undo`, null, token)
                .catch((error) => {
                    console.log('Error while unfollowing user:', error);
                });
        } else {
            patchDataAPI(`follow/${otherUser._id}`, null, token)
                .catch((error) => {
                    console.log('Error while following user:', error);
                });
        }
    }, [isFollowed]);
    return (
        <SafeAreaView style={[styles.otherprofile, GlobalStyles.customSafeArea]}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.otherprofileHeader}>
                    <Icon
                        style={styles.back}
                        name={"chevron-left"}
                        size={26}
                        onPress={() => {
                            goBack();
                        }}
                    />
                    <Text
                        style={{
                            fontWeight: "500",
                            fontSize: 21,
                        }}
                    >
                        @{otherUser.userName}
                    </Text>
                    <Text> </Text>
                </View>

                <View style={styles.otherprofileContainer}>
                    <ProfileInfo
                        styles={{
                            width: "100%",
                            backgroundColor: "red",
                        }}
                        avt={otherUser.avatar}
                        name={otherUser.fullName}
                        followers={currenFollowers}
                        following={otherUser.following}
                        posts={otherUser.posts}
                    />

                    <View style={styles.otherprofileFollowButton}>
                        <TouchableOpacity style={styles.otherprofileFollow} onPress={handleFollowOther}>
                            <View style={{
                                flexDirection: "row",
                                justifyContent: 'center',
                                alignContent: 'center'
                            }}>
                                <Text
                                    style={{
                                        fontSize: 16,
                                        fontWeight: "500",
                                    }}
                                >
                                    {isFollowed ? 'Đang theo dõi   ' : 'Theo dõi  '}
                                </Text>
                                <Icon
                                    name={isFollowed ? "user-check" : 'user'}
                                    size={16}
                                    color="#000"
                                />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.otherprofileMore}>
                            <Icon
                                name="more-horizontal"
                                size={25}
                                color="#000"
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: "row" }}>
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

                        <Icon
                            name={"chevron-right"}
                            size={18}
                            style={{ paddingTop: 1 }}
                            onPress={() => {
                                navigate("UIScreen");
                            }}
                        />
                    </View>
                    <View
                        style={{
                            // marginHorizontal: 9,
                            flexDirection: "row",
                            justifyContent: "space-around",
                        }}
                    // horizontal={true}
                    >
                        <ScrollView
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            style={{ marginHorizontal: 16 }}
                        >
                            {topPosts.map((item, index) => {
                                return (
                                    <TouchableOpacity
                                        key={index}
                                        style={{ marginRight: 16 }}
                                    >
                                        <ProfilePodcast
                                            image={item.image}
                                            title={item.title}
                                            des={item.likes + " Lượt thích"}
                                        />
                                    </TouchableOpacity>
                                );
                            })}
                        </ScrollView>
                    </View>
                    <View style={{ flexDirection: "row" }}>
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

                        <Icon
                            name={"chevron-right"}
                            size={18}
                            style={{ paddingTop: 1 }}
                            onPress={() => {
                                navigate("UIScreen");
                            }}
                        />
                    </View>

                    <View
                        style={{
                            marginHorizontal: 8,
                            flexDirection: "row",
                            // justifyContent: "space-around",
                            flexWrap: "wrap",
                        }}
                        horizontal={true}
                    >
                        {allPosts.map((item, index) => {

                            return (
                                <TouchableOpacity
                                    key={index}
                                    style={{ marginHorizontal: 8 }}
                                >
                                    <ProfilePodcast
                                        image={item.image}
                                        title={item.title}
                                        des={timeDiff(item.createdAt)}
                                    />
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
    otherprofile: {
        flex: 1,
        backgroundColor: "#fff",
    },

    otherprofileHeader: {
        flex: 1,
        marginHorizontal: 20,
        marginBottom: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
    },
    otherprofileContent: {
        marginLeft: 16,
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },

    otherprofileContainer: {
        flex: 20,
        // alignItems: 'center',
        marginTop: 5,
    },

    otherprofileFollowButton: {
        flexDirection: "row",
        marginHorizontal: 16,
        justifyContent: "space-between",
    },

    otherprofileMore: {
        width: "18%",
        height: 35,
        borderRadius: 6,
        borderWidth: 1,
        backgroundColor: "#D6D6D6",
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 16,
        borderColor: "white",
        alignSelf: "center",
        // paddingHorizontal: 40
        flexDirection: "row",
    },
    otherprofileFollow: {
        width: "80%",
        height: 35,
        borderRadius: 6,
        borderWidth: 1,
        backgroundColor: "#D6D6D6",
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 16,
        borderColor: "white",
        alignSelf: "center",
        // paddingHorizontal: 40
        flexDirection: 'row'
    },
});
