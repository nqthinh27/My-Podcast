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
import { darkLibrary, lightLibrary } from "../../constants/darkLight/themeLibrary";
import MiniPlayer from "../Player/MiniPlayer";
import PlayerScreen from "../Player/PlayerScreen";
import { useNavigation } from "@react-navigation/native";
import { setDuration, setIsMiniPlayer, setPosition, setSound, setSoundId } from "../../redux/slices/playerSlice";
import { getPost } from "../../redux/actions/postApi";

function Library(props) {
    const navigation = useNavigation();

    // const { navigation, route } = props;
    const { navigate, goback } = navigation;
    const dispatch = useDispatch();

    const currentLanguage = useSelector(
        (state) => state.language.currentLanguage
    );
    const isDarkTheme = useSelector((state) => state.theme.isDarkTheme);
    const user = useSelector((state) => state.auth.login.currentUser);
    const isFocused = useIsFocused();
    const isMiniPlayer = useSelector((state) => state.player.isMiniPlayer);
    const isPlayScreen = useSelector((state) => state.player.isPlayScreen);
    const sound = useSelector((state) => state.player.sound);
    const access_token = useSelector((state) => state.auth.login.access_token);
    const sound_id = useSelector((state) => state.player.sound_id);

    useEffect(() => {
        if (isFocused && !user) {
            warningLogin(navigate, "Login", "Home");
        }
    }, [isFocused]);

    useEffect(() => {
        if (isFocused && !user) {
            warningLogin(navigate, "Login", "Home");
        }
    }, [isFocused]);

    const recommendData = useSelector((state) => state.library.recommend.data);
    useEffect(() => {
        getRecommendData(dispatch)
    }, []);

    const handleNavigateLib = (title) => {
        navigation.navigate('LibraryDetail', { title: title })
    }

    const [clickSong, setClickSong] = useState(false);

    function handleClickSong() {
        setClickSong(true);
    }


    return (
        <SafeAreaView style={[GlobalStyles.customSafeArea, isDarkTheme ? darkLibrary.libraryContainer : lightLibrary.libraryContainer]}>
            <ScrollView>
                <HeaderUI />

                <View 
            >
                    <Text
                        style={[
                            {
                                fontSize: 21,
                                fontWeight: "bold",
                                paddingLeft: 16,
                                marginTop: 8,
                            },
                            isDarkTheme
                                ? darkLibrary.libraryText
                                : lightLibrary.libraryText,
                        ]}
                    >
                        {currentLanguage === "vi" ? "Thư viện" : "Library"}
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
                            style={[styles.libraryButton, isDarkTheme ? darkLibrary.libraryFunction : lightLibrary.libraryFunction]}
                            onPress={() => {
                                if (!user) warningLogin(navigate, "Login");
                                else handleNavigateLib(currentLanguage === "vi" ? "Danh sách đã lưu" : "Saved list");
                            }}
                        >
                            <Icon
                                name="bookmark-alt"
                                style={{ paddingStart: 22 }}
                                size={20}
                                color={colors.primary}
                            />
                            <Text
                                style={[
                                    styles.libraryIconButton,
                                    isDarkTheme
                                        ? darkLibrary.libraryText
                                        : lightLibrary.libraryText,
                                ]}
                            >
                                {currentLanguage === "vi" ? "Đã lưu" : "Saved"}
                            </Text>
                        </TouchableOpacity>
                        <View style={{ flex: 1 }}></View>
                        <TouchableOpacity
                            style={[styles.libraryButton, isDarkTheme ? darkLibrary.libraryFunction : lightLibrary.libraryFunction]}
                            onPress={() => {
                                if (!user) warningLogin(navigate, "Login");
                                else handleNavigateLib(currentLanguage === "vi" ? "Danh sách đã thích" : "Liked list");
                            }}
                        >
                            <Icon
                                name="heart"
                                style={{ paddingStart: 15 }}
                                size={18}
                                color="#FF0000"
                            />
                            <Text style={[
                                styles.libraryIconButton,
                                isDarkTheme
                                    ? darkLibrary.libraryText
                                    : lightLibrary.libraryText,
                            ]}>
                                {currentLanguage === "vi"
                                    ? "Yêu thích"
                                    : "Favorite"}
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
                            style={[styles.libraryButton, isDarkTheme ? darkLibrary.libraryFunction : lightLibrary.libraryFunction]}
                            onPress={() => {
                                if (!user) warningLogin(navigate, "Login");
                                else handleNavigateLib(currentLanguage === "vi" ? "Lịch sử nghe" : "Recently");
                            }}
                        >
                            <Icon
                                name="history"
                                style={{ paddingStart: 15 }}
                                size={20}
                                color="#00EBEB"
                            />
                            <Text style={[
                                styles.libraryIconButton,
                                isDarkTheme
                                    ? darkLibrary.libraryText
                                    : lightLibrary.libraryText,
                            ]}>
                                {currentLanguage === "vi"
                                    ? "Nghe gần đây"
                                    : "Recently"}
                            </Text>
                        </TouchableOpacity>
                        <View style={{ flex: 1 }}></View>
                        {/* <TouchableOpacity
                            style={[styles.libraryButton, isDarkTheme ? darkLibrary.libraryFunction : lightLibrary.libraryFunction]}
                            onPress={() => {
                                warningLogin(navigation, "Login");
                            }}
                        >
                            <Icon
                                name="play-list"
                                style={{ paddingStart: 15 }}
                                size={18}
                                color="#2EDC21"
                            />
                            <Text style={[
                                    styles.libraryIconButton,
                                    isDarkTheme
                                        ? darkLibrary.libraryText
                                        : lightLibrary.libraryText,
                                ]}>
                                Playlist
                            </Text>
                        </TouchableOpacity> */}
                    </View>
                </View>
                <View
                    style={
                        isDarkTheme
                            ? darkLibrary.libraryContainer
                            : lightLibrary.libraryContainer
                    }
                >
                    <Text
                        style={[{
                            fontSize: 21,
                            fontWeight: "bold",
                            marginLeft: 16,
                            marginVertical: 10,
                        }, isDarkTheme
                            ? darkLibrary.libraryText
                            : lightLibrary.libraryText,]}
                    >
                        {currentLanguage === "vi" ? "Mọi người cũng nghe" : "Everyone is listening as well"}
                    </Text>

                    <View style={{ marginHorizontal: 16 }}>
                        {recommendData.map((item, index) => {
                            return (
                                <TouchableOpacity
                                    onPress={async () => {
                                        if (item._id != sound_id && sound != null) {
                                            await sound.unloadAsync();
                                            dispatch(setSound(null));
                                            dispatch(setPosition(0));
                                            dispatch(setDuration(0));
                                            // dispatch(setIsPlaying(true));
                                            dispatch(setIsMiniPlayer(false));
                                            dispatch(setSoundId(item._id));
                                        }
                                        getPost(item._id, dispatch, access_token, navigation.navigate);    
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
            {isMiniPlayer && <MiniPlayer
            // avtUrl={detailPost.image}
            // tittle={detailPost.title}
            // author={detailPost.owner.fullName}
            // sound={sound}
            // loadSound={loadSound}
            // switchToNewSound={switchToNewSound}
            />}
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
