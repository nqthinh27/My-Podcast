import { React, useState, useRef } from "react";
import {
    Text,
    View,
    StyleSheet,
    Image,
    ImageBackground,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
} from "react-native";
import Slider from "@react-native-community/slider";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../constants/colors";
import device from "../constants/device";

export default function PlayerScreen(props) {
    // navigation
    const { navigation, route } = props;
    //function of navigate
    const { navigate, goback } = navigation;

    const [isPlaying, setIsPlaying] = useState(false);

    const handlePlayPause = () => {
        setIsPlaying((prevState) => !prevState);
    };

    const [scrollOffset, setScrollOffset] = useState(0);

    const handleScroll = (event) => {
        setScrollOffset(event.nativeEvent.contentOffset.y);
    };

    const handleScrollEndDrag = () => {
        if (scrollOffset > device.height / 5) {
            // Nếu vị trí kéo đạt đến mức 200px
            playerNavigate(); // Chuyển sang màn hình mới
        }
    };

    function playerNavigate() {
        navigate("Library");
    }

    return (
        <SafeAreaView
            style={
                {
                    // flex: 1,
                }
            }
        >
            <View style={styles.playscreenHeader}>
                <TouchableOpacity>
                    <Icon
                        name={"chevron-down"}
                        style={{}}
                        size={35}
                        color={"black"}
                        onPress={() => {
                            navigate("UIScreen");
                        }}
                    />
                </TouchableOpacity>

                <TouchableOpacity>
                    <Icon
                        name="dots-horizontal"
                        // style={{ opacity: 1, top: 10 }}
                        size={35}
                        color={"black"}
                    />
                </TouchableOpacity>
            </View>

            <ScrollView
                onScroll={handleScroll}
                onScrollEndDrag={handleScrollEndDrag}
                scrollEventThrottle={16}
                style={
                    {
                        // flex: 1,
                        // backgroundColor: "yellow",
                    }
                }
            >
                <View>
                    <ImageBackground
                        source={{
                            uri: "https://firebasestorage.googleapis.com/v0/b/mypodcast-88135.appspot.com/o/Tu%2FRectangle%2038.png?alt=media&token=780197d0-e51a-496c-8ff1-006b24341c50",
                        }}
                        resizeMode="cover"
                        blurRadius={30}
                        style={styles.playscreenMain}
                    >
                        <View>
                            <Image
                                source={{
                                    uri: "https://firebasestorage.googleapis.com/v0/b/mypodcast-88135.appspot.com/o/Tu%2FRectangle%2038.png?alt=media&token=780197d0-e51a-496c-8ff1-006b24341c50",
                                }}
                                style={styles.playscreenImgAvt}
                            />
                        </View>

                        <View>
                            <Text style={styles.playscreenTitle}>
                                The future is good
                            </Text>
                            <Text
                                style={styles.playscreenAuthor}
                                onPress={() => {
                                    navigate("OtherProfile");
                                }}
                            >
                                Adrian reif
                            </Text>
                        </View>
                        <View>
                            <Slider
                                style={styles.progressBar}
                                value={10}
                                minimumValue={0}
                                maximumValue={100}
                                thumbTintColor="black"
                                minimumTrackTintColor="black"
                                maximumTrackTintColor="black"
                            />
                            <View style={styles.progressLevelDur}>
                                <Text style={styles.progressLabelText}>
                                    00:00
                                </Text>
                                <Text style={styles.progressLabelText}>
                                    05:06
                                </Text>
                            </View>
                        </View>

                        <View style={styles.playscreenControl}>
                            <TouchableOpacity>
                                <Image
                                    style={{ width: 23.79, height: 20.15 }}
                                    source={{
                                        uri: "https://firebasestorage.googleapis.com/v0/b/mypodcast-88135.appspot.com/o/icon%2Fico_random_btn.png?alt=media&token=dda7b7d4-d4f8-4f2f-a5fe-ceb20ad135e7",
                                    }}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Icon
                                    name={"skip-previous"}
                                    size={40}
                                    color="black"
                                />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handlePlayPause}>
                                <Icon
                                    name={isPlaying ? "pause" : "play"}
                                    size={55}
                                    style={{ color: colors.primary }}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Icon
                                    name={"skip-next"}
                                    size={40}
                                    color="black"
                                />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Image
                                    style={{ width: 17.33, height: 23.83 }}
                                    source={{
                                        uri: "https://firebasestorage.googleapis.com/v0/b/mypodcast-88135.appspot.com/o/icon%2Fico_loop_btn.png?alt=media&token=114eb650-f8c3-4734-aa83-90aec1325949",
                                    }}
                                />
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>
                </View>
                <View style={styles.playscreenInteractionBar}>
                    <View style={styles.playscreenSocial}>
                        <TouchableOpacity>
                            <Icon
                                name="heart"
                                style={{}}
                                size={30}
                                color={"red"}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Icon
                                name="comment"
                                style={{}}
                                size={30}
                                color={"#15d147"}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Icon
                                name="share-variant"
                                style={{}}
                                size={30}
                                color={"#0d72ff"}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Icon
                                name="bookmark"
                                style={{}}
                                size={30}
                                color={colors.primary}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                <TouchableOpacity
                    style={styles.playscreenMore}
                    onPress={() => {
                        playerNavigate();
                    }}
                >
                    <Text style={{ fontSize: 18 }}>Xem thêm</Text>
                    <Icon name={"chevron-down"} size={20} color="black" />
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    playscreenHeader: {
        justifyContent: "space-between",
        flexDirection: "row",
        marginHorizontal: 16,
        paddingBottom: 5,
    },

    playscreenMain: {
        //flex: 1,

        borderRadius: 20,
        paddingBottom: 20,
        marginHorizontal: 16,
        // margin: 20,
        borderRadius: 20,
    },

    playscreenInteractionBar: {
        //flex: 1,
        // backgroundColor: "rgba(255,255,255,0.7)",
        borderRadius: 18,
        height: 60,
        // backgroundColor: 'blue',
        marginTop: 20,
    },

    playscreenTitle: {
        fontSize: 20,
        fontWeight: "600",
        top: 30,
        marginLeft: 16,
        color: "#000000",
        alignSelf: "center",
    },

    playscreenAuthor: {
        fontSize: 16,
        marginTop: 35,
        marginLeft: 16,
        color: "#000000",
        alignSelf: "center",
    },

    playscreenImgAvt: {
        //position: 'absolute',
        width: device.width - 64,
        height: device.width - 64,
        alignSelf: "center",
        top: 15,
        borderRadius: 20,
        backgroundColor: "#000000",
        resizeMode: "cover",
    },

    progressBar: {
        width: 310,
        height: 40,
        marginTop: 20,
        flexDirection: "row",
        alignSelf: "center",
        opacity: 0.6,
    },

    progressLevelDur: {
        width: 310,
        flexDirection: "row",
        justifyContent: "space-between",
        alignSelf: "center",
    },

    progressLabelText: {
        fontSize: 12,
        marginHorizontal: 15,
    },

    playscreenControl: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 16,
        marginTop: 20,
    },

    playscreenSocial: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 40,
        top: 15,
    },

    playscreenMore: {
        flex: 1,
        backgroundColor: colors.primary,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        alignSelf: "center",
        padding: 5,
        paddingLeft: 10,
        borderRadius: 5,
        position: "relative",
        marginTop: 20,
    },
});
