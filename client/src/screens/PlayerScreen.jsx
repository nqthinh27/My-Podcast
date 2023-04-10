import { React, useState, useRef, useEffect } from "react";
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
import {device} from "../constants/device";
import GlobalStyles from "../components/GlobalStyles";
import { Audio } from 'expo-av';

export default function PlayerScreen(props) {
    // navigation
    const { navigation, route } = props;
    //function of navigate
    const { navigate, goback } = navigation;
    const [isPlaying, setIsPlaying] = useState(false);
    const [playValue, setPlayValue] = useState(false);
    const [sound, setSound] = useState(null);
    const [position, setPosition] = useState(0);
    const [duration, setDuration] = useState(null);

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

    // useEffect(() => { 
    //     handlePlay()
    // }, [playValue]);

    // const handlePlay = () => {
    //     setPlayValue(!playValue);
    // }

    async function playSound() {
        try {
            const { sound } = await Audio.Sound.createAsync(
                { uri: 'https://firebasestorage.googleapis.com/v0/b/mypodcast-88135.appspot.com/o/Sound%2FLoi-Nho.mp3?alt=media&token=b522c960-115d-49ba-8d6d-5f1f2dbb9d77' },
                { shouldPlay: true },
                onPlaybackStatusUpdate
            );
            setSound(sound);
            setPlayValue(true);
            // const status = await sound.getStatusAsync();
            // setDuration(status.durationMillis);
        } catch (error) {
            console.log(error);
        }
    }

    async function pauseSound() {
        if (sound != null) {
            await sound.pauseAsync();
            setPlayValue(false);
        }
    }

    async function resumeSound() {
        if (sound != null) {
            const status = await sound.getStatusAsync();
            if (!status.isLoaded) {
                await sound.loadAsync(
                    { uri: 'https://firebasestorage.googleapis.com/v0/b/mypodcast-88135.appspot.com/o/Sound%2FLoi-Nho.mp3?alt=media&token=b522c960-115d-49ba-8d6d-5f1f2dbb9d77' },
                    { shouldPlay: true }
                );
            }
            await sound.playAsync();
            setPlayValue(true);
        }
    }


    function onPlaybackStatusUpdate(status) {
        if (status.isPlaying) {
            setPosition(status.positionMillis);
            setDuration(status.durationMillis);
        }
    }

    function onSliderValueChange(value) {
        if (sound != null) {
            sound.setPositionAsync(value);
            setPosition(value);
        }
    }
    const formatTime = (time) => {
        if (time == null) {
            return '--:--';
        }
        const minutes = Math.floor(time / 60000);
        const seconds = ((time % 60000) / 1000).toFixed(0);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };


    async function stopSound() {
        if (sound) {
            await sound.stopAsync();
            setPlayValue(false);
        }
    }

    useEffect(() => {
        return sound
            ? () => {
                sound.unloadAsync();
            }
            : undefined;
    }, [sound]);

    return (
        <SafeAreaView style={GlobalStyles.customSafeArea}>
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

            <View style={{borderRadius: 80, overflow: 'hidden'}}>
                <ScrollView
                    onScroll={handleScroll}
                    onScrollEndDrag={handleScrollEndDrag}
                    scrollEventThrottle={16}
                >
                    <ImageBackground
                        source={{
                            uri: "https://firebasestorage.googleapis.com/v0/b/mypodcast-88135.appspot.com/o/Tu%2FRectangle%2038.png?alt=media&token=780197d0-e51a-496c-8ff1-006b24341c50",
                        }}
                        resizeMode="cover"
                        style={styles.playscreenMain}
                        opacity={0.09}
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
                                minimumValue={0}
                                maximumValue={duration}
                                value={position}
                                thumbTintColor="black"
                                minimumTrackTintColor="black"
                                maximumTrackTintColor="black"
                                onValueChange={onSliderValueChange}
                            />
                            <View style={styles.progressLevelDur}>
                                <Text style={styles.progressLabelText}>{formatTime(position)}</Text>
                                <Text style={styles.progressLabelText}>{formatTime(duration)}</Text>
                            </View>
                        </View>
                        <View style={styles.playscreenControl}>
                            <TouchableOpacity>
                                <Image
                                    style={{ width: 23.79, height: 20.15, opacity: 0.8 }}
                                    source={{
                                        uri: "https://firebasestorage.googleapis.com/v0/b/mypodcast-88135.appspot.com/o/icon%2Fico_random_btn.png?alt=media&token=dda7b7d4-d4f8-4f2f-a5fe-ceb20ad135e7",
                                    }}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Image
                                    style={{ width: 28, height: 28 }}
                                    source={{
                                        uri: "https://firebasestorage.googleapis.com/v0/b/mypodcast-88135.appspot.com/o/Tu%2Fbxs_skip-next-circle.png?alt=media&token=10b12ffd-b779-4fdf-8376-b1f8baa92256",
                                    }}
                                />
                            </TouchableOpacity>
                            {sound == null && (
                                <TouchableOpacity onPress={() => playSound()}>
                                    <Image
                                        style={{ width: 55, height: 55 }}
                                        source={{
                                            uri:
                                                "https://firebasestorage.googleapis.com/v0/b/mypodcast-88135.appspot.com/o/Tu%2FGroup%2066.png?alt=media&token=5fb2d1e2-48a0-43bb-9773-ce3424e388f4",
                                        }}
                                    />
                                </TouchableOpacity>
                            )}
                            {sound != null && !playValue && (
                                <TouchableOpacity onPress={() => resumeSound()}>
                                    <Image
                                        style={{ width: 55, height: 55 }}
                                        source={{
                                            uri:
                                                "https://firebasestorage.googleapis.com/v0/b/mypodcast-88135.appspot.com/o/Tu%2FGroup%2066.png?alt=media&token=5fb2d1e2-48a0-43bb-9773-ce3424e388f4",
                                        }}
                                    />
                                </TouchableOpacity>
                            )}
                            {sound != null && playValue && (
                                <TouchableOpacity onPress={() => pauseSound()}>
                                    <Image
                                        style={{ width: 55, height: 55 }}
                                        source={{
                                            uri:
                                                "https://firebasestorage.googleapis.com/v0/b/mypodcast-88135.appspot.com/o/Tu%2FGroup%2066.png?alt=media&token=5fb2d1e2-48a0-43bb-9773-ce3424e388f4",
                                        }}
                                    />
                                </TouchableOpacity>
                            )}
                            <TouchableOpacity>
                                <Image
                                    style={{ width: 28, height: 28 }}
                                    source={{
                                        uri: "https://firebasestorage.googleapis.com/v0/b/mypodcast-88135.appspot.com/o/Tu%2Ffluent_next-32-regular.png?alt=media&token=db668d13-33de-4f5b-99bd-c5723dd21f13",
                                    }}
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
                    <View style={styles.playscreenInteractionBar}>
                        <View style={styles.playscreenSocial}>
                            <TouchableOpacity>
                                <Icon
                                    name="cards-heart-outline"
                                    style={{}}
                                    size={30}
                                // color={"red"}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Icon
                                    name="comment-outline"
                                    style={{}}
                                    size={30}
                                // color={"#15d147"}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Icon
                                    name="share-variant"
                                    style={{}}
                                    size={30}
                                // color={"#0d72ff"}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Icon
                                    name="bookmark-outline"
                                    style={{}}
                                    size={30}
                                // color={colors.primary}
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
                        <Text style={{ fontSize: 18, color: colors.white }}>Xem thêm</Text>
                        <Icon name={"chevron-down"} size={20} color={colors.white} />
                    </TouchableOpacity>
                </ScrollView>
            </View>
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
        borderRadius: 30,
        paddingBottom: 20,
        marginHorizontal: 16,
        marginTop: 20,
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
        top: 16,
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
        marginHorizontal: 30,
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
