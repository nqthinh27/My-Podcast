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
import Icon from "react-native-vector-icons/Entypo";
import GlobalStyles from "../components/GlobalStyles";
import ProfileInfo from "../components/ProfileInfo";
import { MyPopularData } from "../../dummyData";
import ProfilePodcast from "../components/ProfilePodcast";
import { MyNewReLeaseData } from "../../dummyData";
import { useDispatch, useSelector } from "react-redux";
import { device } from "../constants/device";
import { useNavigation } from "@react-navigation/native";
import { getMyFollowers, getMyFollowing, getMyUserAllPosts, getMyUserTopPosts } from "../redux/actions/authApi";
import { formatNum, timeDiff } from "../ultis/helper";

function MyProfile(props) {
    const dispatch = useDispatch();
    const { navigate, goBack } = useNavigation();
    const user = useSelector((state) => state.auth.login.currentUser);
    const { fullName, userName, avatar, moblie, address, story, website, posts, following, followers } = user;
    useEffect(() => {
        if (user) {
            getMyUserTopPosts(user._id, dispatch);
            getMyUserAllPosts(user._id, dispatch);
            getMyFollowers(user._id, dispatch);
            getMyFollowing(user._id, dispatch);
        }
    }, [dispatch])
    const topPosts = useSelector((state) => state.auth.topPosts.data);
    const allPosts = useSelector((state) => state.auth.allPosts.data);
    const followingList = useSelector((state) => state.auth.following.data);
    const followersList = useSelector((state) => state.auth.followers.data);

    return (
        <SafeAreaView style={[styles.myprofile, GlobalStyles.customSafeArea]}>
            <ScrollView>
                <View style={styles.myprofileHeader}>
                    <Icon
                        name={"chevron-left"}
                        size={26}
                        onPress={() => {
                            goBack();
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
                            // marginLeft: 0,
                            width: "100%",
                            backgroundColor: "red",
                        }}
                        avt={avatar}
                        name={fullName}
                        followers={followers}
                        following={following}
                        posts={posts}
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
                            marginHorizontal: 8,
                            flexDirection: "row",
                            // justifyContent: "space-around",
                        }}
                        horizontal={true}
                    >
                        {topPosts.map((item, index) => {
                            return (
                                <TouchableOpacity key={index}
                                style={{ marginHorizontal: 8 }}>
                                    <ProfilePodcast
                                        image={item.image}
                                        title={item.title}
                                        des={formatNum(item.views) + " Lượt nghe"} />
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
                            marginHorizontal: 8,
                            flexDirection: "row",
                            // justifyContent: "space-around",
                            flexWrap: "wrap",
                        }}
                        horizontal={true}
                    >
                        {allPosts.map((item, index) => {
                            return (
                                <TouchableOpacity key={index}
                                style={{ marginHorizontal: 8 }}>
                                    <ProfilePodcast
                                        image={item.image}
                                        title={item.title}
                                        des={timeDiff(item.createdAt)} />
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
