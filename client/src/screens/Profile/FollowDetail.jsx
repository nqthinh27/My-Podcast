import React, { useEffect, useState } from "react";
import {
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    SafeAreaView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import GlobalStyles from "../../components/GlobalStyles";
import UserListItem from "../../components/UserListItem";
import Loading from "../../components/Loading";
import { getPublicDataAPI } from "../../ultis/fetchData";
import { getOtherUser } from "../../redux/actions/profileApi";
import { darkProfile, lightProfile } from "../../constants/darkLight/themeProfile";

function FollowDetail({ route }) {
    const { id, type } = route.params;
    const title = (type == 'followers') ? 'Người theo dõi' : 'Đang theo dõi';
    const navigation = useNavigation();
    const { navigate, goback } = navigation;
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.auth.login.currentUser);
    const access_token = useSelector((state) => state.auth.login.access_token);
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const isDarkTheme = useSelector((state) => state.theme.isDarkTheme);
    const currentLanguage = useSelector(
        (state) => state.language.currentLanguage
    );
    const fetchDataUsers = async () => {
        setIsLoading(true);
        var res = null;
        if (type == 'followers') {
            res = await getPublicDataAPI(`follow/${id}/followers`)
            setData(res.data.follower);
        } else {
            res = await getPublicDataAPI(`follow/${id}/following`)
            setData(res.data.following);
        }
        setIsLoading(false);
    }
    useEffect(() => {
        fetchDataUsers();
    }, [dispatch]);
    return (
        <SafeAreaView style={[GlobalStyles.customSafeArea, isDarkTheme ? darkProfile.profileContainer : lightProfile.profileContainer]}>
            <ScrollView style={{ marginHorizontal: 16 }}>
                <Text
                    style={[{
                        fontSize: 21,
                        fontWeight: "bold",
                        // marginTop: 8,
                        marginBottom: 8,
                        alignSelf: 'center'
                    }, isDarkTheme ? darkProfile.profileText : lightProfile.profileText]}
                >
                    {title}
                </Text>
                {data.map((item, index) => {
                    return (
                        <TouchableOpacity
                            onPress={() => {
                                getOtherUser(item._id, dispatch, navigate, currentUser)
                            }}
                            key={index}
                        >
                            <UserListItem item={item} />
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
            {isLoading && <Loading />}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
});

export default FollowDetail;
