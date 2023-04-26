import React, { useEffect, useState } from "react";
import {
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    SafeAreaView,
} from "react-native";
import Icon from "react-native-vector-icons/Fontisto";
import colors from "../../constants/colors";
import PodcastListItem from "../../components/PodcastListItem";
import { warningLogin } from "../../ultis/warning";
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import HeaderUI from "../../components/HeaderUI";
import { getRecommendData } from "../../redux/actions/libraryApi";
import GlobalStyles from "../../components/GlobalStyles";
import { getLikedListData } from "../../redux/actions/followingApi";

function Liked({ item }) {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.auth.login.currentUser);
    const access_token = useSelector((state) => state.auth.login.access_token);
    const userLikedList = useSelector((state) => state.following.likedList.data);
    useEffect(() => {
        getLikedListData(dispatch, access_token)
    }, [currentUser]);

    return (
        <SafeAreaView style={[GlobalStyles.customSafeArea, { backgroundColor: '#fff' }]}>
            <ScrollView style={{ marginHorizontal: 16 }}>
                <Text
                    style={{
                        fontSize: 21,
                        fontWeight: "bold",
                        // marginTop: 8,
                        marginBottom: 8,
                        alignSelf: 'center'
                    }}
                >
                    Danh sách đã thích
                </Text>
                {userLikedList.map((item, index) => {
                    return (
                        <TouchableOpacity
                            onPress={() => {
                                // playerNavigate();
                            }}
                            key={index}
                        >
                            <PodcastListItem item={item} />
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
});

export default Liked;
