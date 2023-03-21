import React, { useState } from "react";
import {
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/Fontisto";
import colors from "../constants/colors";
import HorizontalPodcast from "../components/HorizontalPodcast";
import { SafeAreaView } from "react-navigation";
import GlobalStyles from "../components/GlobalStyles";
import { RecommendData } from "../../dummyData";
import HeaderUI from "../components/HeaderUI";
import variable from "../constants/variable";

function Library(props) {
    //navigation
    const { navigation, route } = props;
    //function of navigate
    const { navigate, goback } = navigation;

    const [clickSong, setClickSong] = useState(false);

    function handleClickSong() {
        setClickSong(true);
    }

    function playerNavigate() {
        navigate("PlayerScreen");
        variable.isPlaying = 1;
    }

    return (
        <SafeAreaView style={GlobalStyles.customSafeArea}>
            <ScrollView>
                <HeaderUI />

                <View style={styles.libraryContainer}>
                    <Text
                        style={{
                            fontSize: 18,
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
                                navigate("Saved");
                            }}
                        >
                            <Icon
                                name="bookmark-alt"
                                style={{ paddingStart: 15 }}
                                size={20}
                                color={colors.primary}
                            />
                            <Text style={styles.iconButton}>Đã lưu</Text>
                        </TouchableOpacity>
                        <View style={{ flex: 1 }}></View>
                        <TouchableOpacity
                            style={styles.libraryButton}
                            onPress={() => {
                                navigate("Favourite");
                            }}
                        >
                            <Icon
                                name="heart"
                                style={{ paddingStart: 15 }}
                                size={18}
                                color="#FF0000"
                            />
                            <Text style={styles.iconButton}>Yêu thích</Text>
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
                                navigate("History");
                            }}
                        >
                            <Icon
                                name="history"
                                style={{ paddingStart: 15 }}
                                size={20}
                                color="#00EBEB"
                            />
                            <Text style={styles.iconButton}>Nghe gần đây</Text>
                        </TouchableOpacity>
                        <View style={{ flex: 1 }}></View>
                        <TouchableOpacity
                            style={styles.libraryButton}
                            onPress={() => {
                                navigate("Playlist");
                            }}
                        >
                            <Icon
                                name="play-list"
                                style={{ paddingStart: 15 }}
                                size={18}
                                color="#2EDC21"
                            />
                            <Text style={styles.iconButton}>Playlist</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                    <Text
                        style={{
                            fontSize: 18,
                            fontWeight: "bold",
                            marginLeft: 16,
                            marginVertical: 10,
                        }}
                    >
                        Có thể bạn sẽ thích
                    </Text>

                    <View style={{ marginHorizontal: 16 }}>
                        {RecommendData.map((item, index) => {
                            return (
                                <TouchableOpacity
                                    onPress={() => {
                                        playerNavigate();
                                    }}
                                    key={index}
                                >
                                    <HorizontalPodcast item={item} />
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

    iconButton: {
        color: "black",
        fontSize: 16,
        paddingStart: 10,
        fontWeight: "500",
    },
    Header: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 16,
    },
    avatar: {
        width: 35,
        height: 35,
        borderRadius: 35,
    },
    input: {
        height: 32,
        marginRight: 12,
        backgroundColor: "#F0F0F0",
        // borderRadius: 32,
        padding: 0,
        flex: 1,
        color: "#A0A0A0",
    },
    searchSection: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F0F0F0",
        color: "#A0A0A0",
        borderRadius: 32,
        marginHorizontal: 8,
    },
    searchIcon: {
        paddingVertical: 8,
        paddingRight: 4,
        paddingLeft: 10,
    },
    bell: {
        height: 26,
        width: 26,
    },
});

export default Library;
