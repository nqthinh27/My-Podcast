import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, SafeAreaView } from "react-native";
import { HeaderUI, FollowingItem } from "../components";
import { FollowingData } from "../../dummyData";
import { lightfollowStyles, darkfollowStyles } from "../constants/darkLight/themeFollowing"
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import { useEffect } from "react";
import { warningLogin } from "../ultis/warning";
import GlobalStyles from "../components/GlobalStyles";
import colors from "../constants/colors";
import { getNewFeed } from "../redux/actions/followingApi";
import { getOtherUser } from "../redux/actions/profileApi";
import FollowingHeader from "../components/FollowingHeader";

export default function Following(props) {
    const { navigation, route } = props;
    const { navigate, goback } = navigation;
    const user = useSelector((state) => state.auth.login.currentUser);
    const access_token = useSelector((state) => state.auth.login.access_token);
    const dispatch = useDispatch();
    const isFocused = useIsFocused();
    useEffect(() => {
        if (isFocused && !user) {
            warningLogin(navigate, 'Login', 'Home');
        }
    }, [isFocused]);
    useEffect(() => {
        getNewFeed(dispatch, access_token);
    }, []);
    const isDarkTheme = useSelector((state) => state.theme.isDarkTheme);
    const newFeed = useSelector((state) => state.following.newFeed.data);
    return (
        <View style={[{backgroundColor: isDarkTheme ? colors.dark : colors.white} ,GlobalStyles.customSafeArea]}>
            <ScrollView>
                <HeaderUI />
                <View style={isDarkTheme ? darkfollowStyles.contentWrapper : lightfollowStyles.contentWrapper}>
                    <View style={followStyles.contentSection}>
                        <View>
                            {newFeed.map((item, index) => {
                                return (
                                    <View key={index}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                getOtherUser(item.owner._id, dispatch, navigation.navigate, user)
                                            }}
                                        >
                                            <FollowingHeader avatar={item.avatar}
                                                owner={item.owner}
                                                createdAt={item.createdAt}
                                            />
                                        </TouchableOpacity>
                                        <FollowingItem

                                            title={item.title}
                                            likes={item.likes}
                                            views={item.views}
                                            comments={item.comments}
                                            content={item.content}
                                            createdAt={item.createdAt}
                                            audio={item.audio}
                                            image={item.image}
                                        />
                                    </View>
                                )
                            })}
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
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
