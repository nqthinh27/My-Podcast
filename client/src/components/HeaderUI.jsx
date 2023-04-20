import {
    View,
    Image,
    StyleSheet,
    TextInput,
    SafeAreaView,
    Keyboard,
    Modal,
    TouchableOpacity,
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

export default function HeaderUI(props) {
    //navigation
    const navigation = useNavigation();
    //function of navigate 
    const { navigate, goback } = navigation;

    const dispatch = useDispatch();

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

    const user = useSelector((state) => state.auth.login.currentUser);

    let avatar = avatarDefault;
    if (user) {
        avatar = user.avatar;
    }

    const [searchValue, setSearchValue] = useState(false); //Ấn vào search hiện ra màn hình search
    const [searchResult, setSearchResult] = useState("");
    const [showResult, setShowResult] = useState(true);
    const [data, setData] = useState([]);
    const textInputRef = useRef(null);
    const isDarkTheme = useSelector((state) => state.theme.isDarkTheme);

    useEffect(() => {
        textInputRef.current?.focus();
    }, []);

    const handleSearch = () => {
        setSearchValue(true);
    }

    const handleLogin = () => {
        if (user) {
            navigate("MyProfile");   
            // Làm trang profile xong thì bỏ cái alert đi nhé
            // alert('Bạn đã đăng nhập!');
        } else {
            navigate("Login");   
        }
    }

    const goBack = () => {
        Keyboard.dismiss();
        setSearchValue(!searchValue);
    }

    const filteredData = data.filter((item) =>
        item.title.toLowerCase().includes(searchText.toLowerCase())
    );

    // const handleHideResult = () => {
    //   setShowResult(false);
    // };


    return (
        <SafeAreaView style={[GlobalStyles.customSafeArea]}>
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
                <Modal visible={searchValue}>
                    <SafeAreaView style={[GlobalStyles.customSafeArea]}>
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
                                    placeholder="Tìm kiếm podcast, tác giả, album,..."
                                // onChangeText={(searchString) => { this.setState({ searchString }) }}
                                // underlineColorAndroid="transparent"
                                />
                            </View>
                        </View>
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
        </SafeAreaView>
    );
}
