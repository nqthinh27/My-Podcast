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

    useEffect(() => {
        textInputRef.current?.focus();
    }, []);

    const handleSearch = () => {
        setSearchValue(!searchValue);
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
        <SafeAreaView style={[styles.wrapper, GlobalStyles.customSafeArea]}>
            <View style={styles.Header}>
                <TouchableOpacity
                    onPress={() => {
                        handleLogin();
                    }}
                >
                    <Image
                        source={{
                            uri: avatar,
                        }}
                        style={styles.avatar}
                    />
                </TouchableOpacity>
                {/* <TouchableOpacity onPress={handleSearch}> */}
                <View style={styles.searchSection}>
                    <Icon
                        style={styles.searchIcon}
                        name="search"
                        size={20}
                        color="#ccc"
                    />
                    <TextInput
                        style={styles.input}
                        autoFocus={false}
                        // value={searchValue}
                        placeholder="Tìm kiếm podcast, tác giả, album,..."
                        // onChange={(event) => setSearchResult(event.target.value)}
                        onFocus={handleSearch}

                    />
                </View>
                <Modal visible={searchValue}>
                    <SafeAreaView style={[styles.wrapper, GlobalStyles.customSafeArea]}>
                        <View style={styles.Header}>
                            <Icon style={styles.back}
                                name={'chevron-left'}
                                size={26}
                                onPress={goBack}
                            />
                            <View style={styles.searchSection}>
                                <Icon
                                    style={styles.searchIcon}
                                    name="search"
                                    size={20}
                                    color="#ccc"
                                />
                                <TextInput
                                    autoFocus={true}
                                    style={styles.input}
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
                        style={styles.bell}
                    />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}



const styles = StyleSheet.create({
    Header: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 16,
    },
    blank: {
        flex: 1,
    },
    avatar: {
        width: 35,
        height: 35,
        borderRadius: 35,
    },
    searchSection: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F0F0F0",
        color: "#000000",
        borderRadius: 32,
        marginHorizontal: 8,
    },
    searchIcon: {
        paddingVertical: 8,
        paddingRight: 4,
        paddingLeft: 10,
    },

    input: {
        height: 32,
        marginRight: 12,
        backgroundColor: "#F0F0F0",
        padding: 0,
        flex: 1,
        color: "#000",
    },

    bell: {
        height: 26,
        width: 26,
    },

    wrapper: {},
});