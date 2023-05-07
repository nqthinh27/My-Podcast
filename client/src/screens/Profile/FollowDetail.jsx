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
import { getLikedListData, getRecommendData } from "../../redux/actions/libraryApi";
import GlobalStyles from "../../components/GlobalStyles";
import UserListItem from "../../components/UserListItem";
import { getMyFollowers, getMyFollowing } from "../../redux/actions/authApi";
import Loading from "../../components/Loading";
import { getPublicDataAPI } from "../../ultis/fetchData";
import { BASE_URL } from "../../ultis/config";
import axios from "axios";

function FollowDetail({ route }) {
    const { id, type } = route.params;
    const title = (type == 'followers') ? 'Người theo dõi' : 'Đang theo dõi';
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.auth.login.currentUser);
    const access_token = useSelector((state) => state.auth.login.access_token);
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const fetchDataUsers = async () => {
        setIsLoading(true);
        var res = null;
        if (type == 'followers') {
            res = await axios.get(`${BASE_URL}/follow/${id}/followers`);
            setData(res.data.follower);
        } else {
            res = await axios.get(`${BASE_URL}/follow/${id}/following`);
            setData(res.data.following);
        }
        setIsLoading(false);
        return res ? res.data.follower : null;
    }
    useEffect(() => {
        fetchDataUsers();
    }, [dispatch]);
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
                    {title}
                </Text>
                {data.map((item, index) => {
                    return (
                        <TouchableOpacity
                            onPress={() => {
                                alert("navigate");
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
