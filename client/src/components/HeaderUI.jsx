import {
    View,
    Image,
    StyleSheet,
    TextInput,
    SafeAreaView,
    Keyboard,
    Modal,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { TouchableOpacity } from "react-native-gesture-handler";
import GlobalStyles from "./GlobalStyles";
import React, { useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import lightHeader from '../constants/darkLight/themeHeaderUI'
import darkHeader from '../constants/darkLight/themeHeaderUI'


export default function HeaderUI(props) {
    //navigation
    const navigation = useNavigation();
    //function of navigate 
    const { navigate, goback } = navigation;

    const user = useSelector((state) => state.auth.login.currentUser);

    let avatar = 'https://firebasestorage.googleapis.com/v0/b/mypodcast-88135.appspot.com/o/avatar%2Fdafault_avatar.png?alt=media&token=162dc660-5039-4636-a300-942fcd4330b3';
    if (user) {
        avatar = user.user.avatar;
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
            // navigate("MyProfile");   
            alert('Bạn đã đăng nhập!');
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
            <View style={lightHeader.lightHeader.header}>
                <TouchableOpacity
                    onPress={() => {
                        handleLogin();
                    }}
                >
                    <Image
                        source={{
                            uri: avatar,
                        }}
                        style={lightHeader.lightHeader.avatar}
                    />
                </TouchableOpacity>
                {/* <TouchableOpacity onPress={handleSearch}> */}
                <View style={isDarkTheme ? darkHeader.darkHeader.searchSection : lightHeader.lightHeader.searchSection}>
                    <Icon
                        style={lightHeader.lightHeader.searchIcon}
                        name="search"
                        size={20}
                        color="#ccc"
                    />
                    <TextInput
                        style={lightHeader.lightHeader.input}
                        // autoFocus={false}
                        // value={searchValue}
                        placeholder="Tìm kiếm podcast, tác giả, album,..."
                        // onChange={(event) => setSearchResult(event.target.value)}
                        onFocus={handleSearch}

                    />
                </View>
                <Modal visible={searchValue}>
                    <SafeAreaView style={[GlobalStyles.customSafeArea]}>
                        <View style={lightHeader.lightHeader.header}>
                            <Icon style={lightHeader.lightHeader.back}
                                name={'chevron-left'}
                                size={26}
                                onPress={goBack}
                            />
                            <View style={lightHeader.lightHeader.searchSection}>
                                <Icon
                                    style={lightHeader.lightHeader.searchIcon}
                                    name="search"
                                    size={20}
                                    color="#ccc"
                                />
                                <TextInput
                                    autoFocus={true}
                                    style={lightHeader.lightHeader.input}
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
                        style={lightHeader.lightHeader.bell}
                    />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
