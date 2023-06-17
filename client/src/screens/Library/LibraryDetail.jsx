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
import { getLikedListData, getRecommendData } from "../../redux/actions/libraryApi";
import GlobalStyles from "../../components/GlobalStyles";
import Loading from "../../components/Loading";
import { postDataAPI } from "../../ultis/fetchData";
import axios from "axios";
import { BASE_URL } from "../../ultis/config";
import {darkLibrary, lightLibrary} from "../../constants/darkLight/themeLibrary";

function LibraryDetail({ route }) {
    const { title } = route.params;
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const access_token = useSelector((state) => state.auth.login.access_token);
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const isDarkTheme = useSelector((state) => state.theme.isDarkTheme);

    // const currentUser = useSelector((state) => state.auth.login.currentUser);
    // const userLikedList = useSelector((state) => state.library.likedList.data);
    // useEffect(() => {
    //     getLikedListData(dispatch, access_token)
    // }, []);
    const fetchData = async () => {
        setIsLoading(true);
        var res = null;
        if (title === 'Danh sách đã lưu' || title === "Saved list") {
            res = await postDataAPI('save', null, access_token);;
            setData(res.data.saved);
        } else if (title === 'Danh sách đã thích' || title === "Liked list") {
            res = await postDataAPI('like', null, access_token);;
            setData(res.data.liked);
        } else if (title === 'Lịch sử nghe' || title === "Recently") {
            res = await postDataAPI('history', null, access_token);
            setData(res.data.history);
        }
        setIsLoading(false);
    }
    useEffect(()=> {
        fetchData();
    }, [dispatch])
    return (
        <SafeAreaView style={[GlobalStyles.customSafeArea, isDarkTheme ? darkLibrary.libraryContainer : lightLibrary.libraryContainer]}>
            <ScrollView style={{ marginHorizontal: 16 }}>
                <Text
                    style={[{
                        fontSize: 21,
                        fontWeight: "bold",
                        // marginTop: 8,
                        marginBottom: 8,
                        alignSelf: 'center'
                    }, isDarkTheme ? darkLibrary.libraryText : lightLibrary.libraryText]}
                >
                    {title}
                </Text>
                {data.map((item, index) => {
                    return (
                        <TouchableOpacity
                            onPress={() => {
                                alert('Làm tính năng chuyển đến bài này đi!');
                            }}
                            key={index}
                        >
                            <PodcastListItem item={item} />
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

export default LibraryDetail;
