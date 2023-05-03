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
import { useIsFocused } from "@react-navigation/native";
import HeaderUI from "../../components/HeaderUI";
import { getRecommendData } from "../../redux/actions/libraryApi";
import GlobalStyles from "../../components/GlobalStyles";

function Library(props) {
    const { navigation, route } = props;
    const { navigate, goback } = navigation;
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.login.currentUser);
    const isFocused = useIsFocused();
    // useEffect(() => {
    //     if (isFocused && !user) {
    //         warningLogin(navigate, "Login", "Home");
    //     }
    // }, [isFocused]);

    const recommendData = useSelector((state) => state.library.recommend.data);
    useEffect(() => {
        getRecommendData(dispatch)
    }, []);

    const [clickSong, setClickSong] = useState(false);

    function handleClickSong() {
        setClickSong(true);
    }

    function playerNavigate() {
        navigate("PlayerScreen");
    }

    return (
        <SafeAreaView style={[GlobalStyles.customSafeArea, { backgroundColor: '#fff' }]}>
            <ScrollView>
                <HeaderUI />
                <View style={styles.libraryContainer}>
                    <Text
                        style={{
                            fontSize: 21,
                            fontWeight: "bold",
                            paddingLeft: 16,
                            marginTop: 8,
                        }}
                    >
                        Thư viện
                    </Text>
                    <View
                        style={{
                            flexDirection: "row",
                            flex: 1,
                            marginHorizontal: 16,
                            justifyContent: "space-around",
                        }}
                    >
                        <TouchableOpacity
                            style={styles.libraryButton}
                            onPress={() => {
                                warningLogin(navigate, "Login");
                            }}
                        >
                            <Icon
                                name="bookmark-alt"
                                style={{ paddingStart: 15 }}
                                size={20}
                                color={colors.primary}
                            />
                            <Text style={styles.libraryIconButton}>Đã lưu</Text>
                        </TouchableOpacity>
                        <View style={{ flex: 1 }}></View>
                        <TouchableOpacity
                            style={styles.libraryButton}
                            onPress={() => {
                                if (!user) warningLogin(navigate, "Login");
                                else navigate('Liked');
                            }}
                        >
                            <Icon
                                name="heart"
                                style={{ paddingStart: 15 }}
                                size={18}
                                color="#FF0000"
                            />
                            <Text style={styles.libraryIconButton}>
                                Yêu thích
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            flex: 1,
                            marginLeft: 16,
                            justifyContent: "space-around",
                            marginRight: 16,
                        }}
                    >
                        <TouchableOpacity
                            style={styles.libraryButton}
                            onPress={() => {
                                warningLogin(navigate, "Login");
                            }}
                        >
                            <Icon
                                name="history"
                                style={{ paddingStart: 15 }}
                                size={20}
                                color="#00EBEB"
                            />
                            <Text style={styles.libraryIconButton}>
                                Nghe gần đây
                            </Text>
                        </TouchableOpacity>
                        <View style={{ flex: 1 }}></View>
                        <TouchableOpacity
                            style={styles.libraryButton}
                            onPress={() => {
                                warningLogin(navigate, "Login");
                            }}
                        >
                            <Icon
                                name="play-list"
                                style={{ paddingStart: 15 }}
                                size={18}
                                color="#2EDC21"
                            />
                            <Text style={styles.libraryIconButton}>
                                Playlist
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                    <Text
                        style={{
                            fontSize: 21,
                            fontWeight: "bold",
                            marginLeft: 16,
                            marginVertical: 10,
                        }}
                    >
                        Mọi người cũng nghe
                    </Text>

                    <View style={{ marginHorizontal: 16 }}>
                        {recommendData.map((item, index) => {
                            return (
                                <TouchableOpacity
                                    onPress={() => {
                                    }}
                                    key={index}
                                >
                                    <PodcastListItem item={item} />
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    libraryContainer: {
        // margin: 5,
        // height: 150,
    },

    libraryButton: {
        height: 45,
        width: 167,
        flexDirection: "row",
        marginVertical: 5,
        borderRadius: 30,
        backgroundColor: "rgba(0, 0, 0, 0.05)",
        alignItems: "center",
    },

    libraryIconButton: {
        color: "black",
        fontSize: 16,
        paddingStart: 10,
        fontWeight: "500",
    },
});

export default Library;
