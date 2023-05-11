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
// import colors from "../../constants/colors";
import Icon from "react-native-vector-icons/Entypo";
import GlobalStyles from "../../components/GlobalStyles";
import ProfileInfo from "../../components/ProfileInfo";
import ProfilePodcast from "../../components/ProfilePodcast";
import { useDispatch, useSelector } from "react-redux";
// import { device } from "../constants/device";
import { useNavigation } from "@react-navigation/native";
import { darkProfile, lightProfile } from "../../constants/darkLight/themeProfile";
import { getMyFollowers, getMyFollowing, getMyUserAllPosts, getMyUserTopPosts } from "../../redux/actions/authApi";
import { formatNum, timeDiff } from "../../ultis/helper";
import Loading from "../../components/Loading";

function MyProfile(props) {
    const dispatch = useDispatch();
    const { navigate, goBack } = useNavigation();
    const currentUser = useSelector((state) => state.auth.login.currentUser);
    const { fullName, userName, avatar, moblie, address, story, website, posts, following, followers } = currentUser;
    const [isLoading, setIsLoading] = useState(false);
    const fetchData = async () => {
        setIsLoading(true);
        await getMyUserTopPosts(currentUser._id, dispatch);
        await getMyUserAllPosts(currentUser._id, dispatch);
        setIsLoading(false);
    }
    useEffect(() => {
        if (currentUser) {
            fetchData();
        }
    }, [dispatch])
    const topPosts = useSelector((state) => state.auth.topPosts.data);
    const allPosts = useSelector((state) => state.auth.allPosts.data);
    const followingList = useSelector((state) => state.auth.following.data);
    const followersList = useSelector((state) => state.auth.followers.data);
    const currentLanguage = useSelector(
        (state) => state.language.currentLanguage
    );
    const isDarkTheme = useSelector((state) => state.theme.isDarkTheme);

    return (
        <SafeAreaView
            style={[
                styles.myprofile,
                GlobalStyles.droidSafeArea,
                isDarkTheme
                    ? darkProfile.profileContainer
                    : lightProfile.profileContainer,
            ]}
        >
            <ScrollView>
                <View style={styles.myprofileHeader}>
                    <Icon
                        name={"chevron-left"}
                        size={26}
                        onPress={() => {
                            goBack();
                        }}
                        color={isDarkTheme ? "white" : "black"}
                    />
                    <Text
                        style={[
                            styles.myprofileTextHeader,
                            isDarkTheme
                                ? darkProfile.profileText
                                : lightProfile.profileText,
                        ]}
                    >
                        {currentLanguage === "vi" ? "Trang cá nhân    " : "My profile    "}
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
                        id={currentUser._id}
                    ></ProfileInfo>

                    <TouchableOpacity
                        style={
                            isDarkTheme
                                ? darkProfile.myprofileEditProfile
                                : lightProfile.myprofileEditProfile
                        }
                     onPress={()=>navigate('EditProfile')}>
                        <Text style={styles.myprofileButtonEditprofile}>
                            {currentLanguage === "vi" ? "Chỉnh sửa trang cá nhân" : "Edit my profile"}
                        </Text>
                    </TouchableOpacity>
                    <View style={{ flexDirection: "row" }}>
                        <Text
                            style={[
                                {
                                    marginLeft: 16,
                                    fontSize: 18,
                                    fontWeight: "bold",
                                    marginBottom: 10,
                                },
                                isDarkTheme
                                    ? darkProfile.profileText
                                    : lightProfile.profileText,
                            ]}
                        >
                            {currentLanguage === "vi" ? "Nổi bật" : "Popular"}
                        </Text>
                        <Icon
                            name={"chevron-right"}
                            size={18}
                            style={{ paddingTop: 1 }}
                            color={isDarkTheme ? "white" : "black"}
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
                                        des={formatNum(item.views) + " " + (currentLanguage === "vi" ? "Lượt nghe" : "Listened")} />
                                </TouchableOpacity>
                            );
                        })}
                    </View>

                    <View style={{ flexDirection: "row" }}>
                        <Text
                            style={[
                                {
                                    marginLeft: 16,
                                    fontSize: 18,
                                    fontWeight: "bold",
                                    marginBottom: 10,
                                },
                                isDarkTheme
                                    ? darkProfile.profileText
                                    : lightProfile.profileText,
                            ]}
                        >
                            {currentLanguage === "vi" ? "Mới phát hành" : "New release"}
                        </Text>
                        <Icon
                            name={"chevron-right"}
                            size={18}
                            style={{ paddingTop: 1 }}
                            color={isDarkTheme ? "white" : "black"}
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
            {isLoading && <Loading/>}
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
