import {
    View,
    Image,
    StyleSheet,
    TextInput,
    SafeAreaView,
    Keyboard,
    Modal,
    TouchableOpacity,
    Text
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import GlobalStyles from "./GlobalStyles";
import React, { useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { lightHeader, darkHeader } from '../constants/darkLight/themeHeaderUI'
import { useSelector, useDispatch } from "react-redux";
import { isTokenExpired } from "../ultis/auth";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { stayLogged } from "../redux/actions/authApi";
import { warningLogin } from "../ultis/warning";
import { avatarDefault } from "../constants/app";
import { searchPosts, searchUsers } from "../redux/actions/searchApi";
import PodcastListItem from "./PodcastListItem";
import { RecommendData } from "../../dummyData";
import UserListItem from "./UserListItem";
import { ScrollView } from "react-native-gesture-handler";
import { getOtherUser } from "../redux/actions/profileApi";

export default function HeaderUI(props) {
    //navigation
    const navigation = useNavigation();
    //function of navigate 
    const { navigate, goback } = navigation;
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.auth.login.currentUser);
    const fetchUser = async () => {
        const refresh_token = await AsyncStorage.getItem('refresh_token');
        if (refresh_token) {
            // if refresh token is unexpired
            if (!isTokenExpired(refresh_token)) {
                stayLogged(refresh_token, dispatch, navigate);
            }
        }
    }
    useEffect(() => {
        fetchUser();
    }, [])
    let avatar = avatarDefault;
    if (currentUser) {
        avatar = currentUser.avatar;
    }
    const [searchValue, setSearchValue] = useState(false); //Ấn vào search hiện ra màn hình search
    const [keyword, setKeyword] = useState("");
    const [firstSearch, setFirstSearch] = useState(true);
    const textInputRef = useRef(null);
    const isDarkTheme = useSelector((state) => state.theme.isDarkTheme);
    useEffect(() => {
        textInputRef.current?.focus();
    }, []);
    const handleSearch = () => {
        setSearchValue(true);
    }
    const handleLogin = () => {
        if (currentUser) {
            navigate("MyProfile");
        } else {
            navigate("Login");
        }
    }
    const goBack = () => {
        Keyboard.dismiss();
        setSearchValue(!searchValue);
    }
    const [searchResult, setSearchResult] = useState();
    const usersResult = useSelector((state) => state.search.users.data);
    const postsResult = useSelector((state) => state.search.posts.data);
    const handleSearchResult = () => {
        const keywordUser = { userName: keyword };
        searchUsers(keywordUser, dispatch);
        const keywordPost = { title: keyword };
        searchPosts(keywordPost, dispatch);
        setFirstSearch(false);
        // if (usersResult.length == 0 && postsResult == 0) alert("Không có kết quả phù hợp");
    }
    // const filteredData = data.filter((item) =>
    //     item.title.toLowerCase().includes(searchText.toLowerCase())
    // );

    // const handleHideResult = () => {
    //   setShowResult(false);
    // };


    return (
        <View>
            <View style={lightHeader.header}>
                <TouchableOpacity
                    onPress={() => {
                        handleLogin();
                    }}
                >
                    <Image
                        source={{
                            uri: avatar,
                        }}
                        style={lightHeader.avatar}
                    />
                </TouchableOpacity>
                {/* <TouchableOpacity onPress={handleSearch}> */}
                <View style={isDarkTheme ? darkHeader.searchSection : lightHeader.searchSection}>
                    <Icon
                        style={lightHeader.searchIcon}
                        name="search"
                        size={20}
                        color="#ccc"
                    />
                    <TextInput
                        style={lightHeader.input}
                        // autoFocus={false}
                        // value={searchValue}
                        placeholder="Tìm kiếm podcast, tác giả, album,..."
                        // onChange={(event) => setSearchResult(event.target.value)}
                        onFocus={handleSearch}

                    />
                </View>
                <Modal visible={searchValue} >
                    <SafeAreaView style={GlobalStyles.customSafeArea}>
                        <View style={lightHeader.header}>
                            <Icon style={lightHeader.back}
                                name={'chevron-left'}
                                size={26}
                                onPress={goBack}
                            />
                            <View style={lightHeader.searchSection}>
                                <Icon
                                    style={lightHeader.searchIcon}
                                    name="search"
                                    size={20}
                                    color="#ccc"
                                />
                                <TextInput
                                    autoFocus={true}
                                    style={lightHeader.input}
                                    // ref={textInputRef}
                                    value={keyword}
                                    placeholder="Tìm kiếm podcast, tác giả, album,..."
                                    onChangeText={(text) => setKeyword(text)}
                                    // underlineColorAndroid="transparent"
                                    onSubmitEditing={handleSearchResult}
                                />
                            </View>
                        </View>
                        {postsResult.length == 0 && usersResult.length == 0 && !firstSearch &&
                            <Text
                                style={{
                                    fontSize: 20,
                                    fontWeight: "500",
                                    alignSelf: "center",
                                    marginTop: 40
                                }}
                            >
                                Oops! Không tìm thấy kết quả...
                            </Text>}
                        <ScrollView>
                            {usersResult.length > 0 && <Text
                                style={{
                                    fontSize: 18,
                                    fontWeight: "bold",
                                    marginHorizontal: 16,
                                    marginTop: 16,
                                    marginBottom: 8,
                                }}
                            >
                                Người dùng liên quan
                            </Text>}
                            <View style={{ marginHorizontal: 16 }}>
                                {usersResult.map((item, index) => {
                                    return (
                                        <TouchableOpacity
                                            onPress={() => {
                                                setSearchValue(false);
                                                getOtherUser(item._id, dispatch, navigate, currentUser)
                                                // console.log(currentUser);
                                            }}
                                            key={index}
                                        >
                                            <UserListItem item={item} />
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>
                            {postsResult.length > 0 && <Text
                                style={{
                                    fontSize: 18,
                                    fontWeight: "bold",
                                    marginHorizontal: 16,
                                    marginBottom: 8,
                                }}
                            >
                                Podcast liên quan
                            </Text>}
                            <View style={{ marginHorizontal: 16 }}>
                                {postsResult.map((item, index) => {
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
                            </View>
                        </ScrollView>
                    </SafeAreaView>
                </Modal>
                <TouchableOpacity>
                    <Image
                        source={{
                            uri: "https://firebasestorage.googleapis.com/v0/b/mypodcast-88135.appspot.com/o/icon%2Fico_bell1.png?alt=media&token=85036c85-d95d-4b34-bff2-7f193a3149a4",
                        }}
                        style={lightHeader.bell}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
}
