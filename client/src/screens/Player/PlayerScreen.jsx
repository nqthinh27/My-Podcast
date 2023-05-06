import { React, useState, useRef, useEffect } from "react";
import {
    Text,
    View,
    StyleSheet,
    Image,
    ImageBackground,
    TouchableOpacity,
    ScrollView,
    TextInput,
    SafeAreaView,
    BackHandler,
} from "react-native";
import Slider from "@react-native-community/slider";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../../constants/colors";
import { device } from "../../constants/device";
import GlobalStyles from "../../components/GlobalStyles";
import { Audio } from "expo-av";
import Comment from "../../components/Comment";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentSound, setDuration, setIsMiniPlayer, setIsPlayScreen, setIsPlayer, setIsPlaying, setNextPress, setPlayValue, setPosition, setPrevPress, setSound } from "../../redux/slices/playerSlice";
import { useNavigation } from "@react-navigation/native";
import { getPost } from "../../redux/actions/postApi";



export default function PlayerScreen(props) {
    // navigation
    // const { navigation, route } = props;
    // //function of navigate
    // const { navigate, goback } = navigation;

    // const { loadSound, switchToNewSound } = props;
    const sound = useSelector((state) => state.player.sound);


    const [showCommentScrollView, setShowCommentScrollView] = useState(true);

    const handleCommentPress = () => {
        setShowCommentScrollView(true);
    }

    const handleBackPress = () => {
        setShowCommentScrollView(false);
    }

    // const [isPlaying, setIsPlaying] = useState(false);
    // const [playValue, setPlayValue] = useState(false);
    // const [sound, setSound] = useState(null);
    // const [position, setPosition] = useState(0);
    // const [duration, setDuration] = useState(null);

    const navigation = useNavigation();
    const dispatch = useDispatch();
    // const [sound, setSound] = useState(null);
    const detailPost = useSelector((state) => state.post.detailPost);
    // const soundUrl = useSelector((state) => state.player.soundUrl);
    const playValue = useSelector((state) => state.player.playValue);
    const position = useSelector((state) => state.player.position);
    const duration = useSelector((state) => state.player.duration);
    const isMiniPlayer = useSelector((state) => state.player.isMiniPlayer);
    const isPlayer = useSelector((state) => state.player.isPlayer);
    const currentSound = useSelector((state) => state.player.currentSound);
    const isPlayScreen = useSelector((state) => state.player.isPlayScreen);


    const nextPress = useSelector((state) => state.player.nextPress);
    const prevPress = useSelector((state) => state.player.prevPress);

    const dataSound = useSelector((state) => state.player.dataSound);
    async function loadSound(uri) {
        try {
            // if (sound) {
            //     await sound.unloadAsync();
            //     sound = null;
            //   }
            await Audio.setAudioModeAsync({
                staysActiveInBackground: true,
                interruptionModeAndroid: 1,
                shouldDuckAndroid: true,
                interruptionModeIOS: 1,
                playsInSilentModeIOS: true,
            });
            const { sound: song } = await Audio.Sound.createAsync(
                { uri },
                {
                    shouldPlay: true,
                    isLooping: true,
                    positionMillis: position,
                },
                onPlaybackStatusUpdate
            );
            dispatch(setSound(song));
            // dispatch(setPlayValue(true));
        } catch (error) {
            console.log(error);
        }
    }

    function onPlaybackStatusUpdate(status) {
        if (status.isPlaying) {
            dispatch(setPosition(status.positionMillis));
            dispatch(setDuration(status.durationMillis));
        }
    }



    // console.log("sound: ", detailPost.audio);
    const onBackPress = () => {
        dispatch(setIsPlayScreen(false))
        dispatch(setIsMiniPlayer(true));
        console.log("back isMiniPlayer: " + isMiniPlayer);
        console.log("back isPlayer: " + isPlayer);
        return true;
    };

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', onBackPress);
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        };
    }, [navigation]);

    // 
    // useEffect(() => {
    //     if (isMiniPlayer) {
    //         // playSound();
    //         // dispatch(setIsMiniPlayer(false));
    //         console.log("phát nhạc khi focus trở lại màn hình PlayerScreen");
    //     }
    // }, [isMiniPlayer]);


    // ấn nút thu nhỏ màn hình
    function changeMiniPlayer() {
        // sound.unloadAsync();
        dispatch(setIsMiniPlayer(true));
        dispatch(setIsPlayScreen(false));
        dispatch(setIsPlaying(true));
        // if (!playValue) dispatch(setIsPlayer(true));
        // navigation.navigate('UIScreen');
    }

    useEffect(() => {
        if (!isMiniPlayer && isPlayScreen) {
            playSound();
            console.log("ductu");
        }
    }, [detailPost.audio]);

    useEffect(() => {
        if (sound != null) {
            if (playValue) {
                resumeSound(detailPost.audio);
            } else {
                pauseSound();
            }
        }
    }, [playValue]);

    const playSound = async () => {
        if (detailPost !== null && !isMiniPlayer) {
            await loadSound(detailPost.audio);
            console.log("phát đầu tiên");
        }
    };

    async function pauseSound() {
        if (sound != null) {
            await sound.pauseAsync();
            dispatch(setPlayValue(false));
        }
    }

    async function resumeSound(uri) {
        if (sound != null) {
            const status = await sound.getStatusAsync();
            if (!status.isLoaded) {
                await sound.loadAsync(
                    { uri },
                    { shouldPlay: true }
                );
            }
            await sound.playAsync();
            dispatch(setPlayValue(true));
            console.log("dừng: " + playValue);
        }
    }

    function onSliderValueChange(value) {
        if (sound != null) {
            sound.setPositionAsync(value);
            dispatch(setPosition(value));
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

    async function switchToNewSound(uri) {
        try {
            if (sound != null) {
                await sound.unloadAsync();
                dispatch(setSound(null));
            }
            if (uri) {
                await getPost(uri, dispatch);
            }
        } catch (error) {
            console.log(error);
        }
    }

    function onNextPress() {
        // console.log("currentNext: " + currentTrack.id)
        const currentIndex = dataSound.findIndex((item) => item.index === currentSound);
        const nextTrack = dataSound[currentIndex + 1];
        console.log("soundnext: " + nextTrack._id);
        if (nextTrack) {
            switchToNewSound(nextTrack._id);
            dispatch(setCurrentSound(nextTrack.index));
            dispatch(setPosition(0));
            dispatch(setIsMiniPlayer(false));
        }
    }

    function onPrevPress() {
        // console.log("currentPrev: " + currentTrack.id)
        const currentIndex = dataSound.findIndex((item) => item.index === currentSound);
        const prevTrack = dataSound[currentIndex - 1];
        if (prevTrack) {
            switchToNewSound(prevTrack._id);
            dispatch(setCurrentSound(prevTrack.index));
            dispatch(setPosition(0));
            dispatch(setIsMiniPlayer(false));
        }
    }

    // useEffect(() => {
    //     if (nextPress) {
    //         onNextPress();
    //         dispatch(setNextPress(false));
    //     }
    //     if (prevPress) {
    //         onPrevPress();
    //         dispatch(setPrevPress(false));
    //     }
    // }, [currentSound]);

    async function stopSound() {
        if (sound) {
            await sound.stopAsync();
            setPlayValue(false);
        }
    }

    // useEffect(() => {
    //     return sound
    //         ? () => {

    //             sound.unloadAsync();
    //             console.log("sound đang");

    //         }
    //         : undefined;
    // }, [sound]);

    const scrollViewRef = useRef(null);

    const handleNextPress = () => {
        scrollViewRef.current.scrollTo({ y: device.height - 83, animated: true });
    };

    return (
        <View>
            {/* <View > */}
            {/* <View style={{ borderRadius: 80, overflow: "hidden" }}> */}
            <ScrollView
                pagingEnabled={true}
                showsVerticalScrollIndicator={false}
                ref={scrollViewRef}
            >
                <View style={styles.playscreenHeader}>
                    <TouchableOpacity>
                        <Icon
                            name={"chevron-down"}
                            style={{}}
                            size={35}
                            color={"black"}
                            onPress={() => {
                                changeMiniPlayer();
                            }}
                            value={isMiniPlayer}
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

                <View >
                    <View style={[{ overflow: 'hidden' }, styles.playscreenMain]}>
                        <ImageBackground
                            source={{
                                uri: "https://firebasestorage.googleapis.com/v0/b/mypodcast-88135.appspot.com/o/Tu%2FRectangle%2038.png?alt=media&token=780197d0-e51a-496c-8ff1-006b24341c50",
                            }}
                            // resizeMode="cover"
                            // style={{ width: '100%', height: '100%' }}
                            opacity={0.09}

                        >
                            <View>
                                <Image
                                    source={{
                                        uri: detailPost.image,
                                    }}
                                    style={styles.playscreenImgAvt}
                                />
                            </View>
                            <View>
                                <Text style={styles.playscreenTitle}>
                                    {detailPost.title}
                                </Text>
                                <Text
                                    style={styles.playscreenAuthor}
                                    onPress={() => {
                                        navigate("OtherProfile");
                                    }}
                                >
                                    {detailPost.owner.fullName}
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
                                    <Text style={styles.progressLabelText}>
                                        {formatTime(position)}
                                    </Text>
                                    <Text style={styles.progressLabelText}>
                                        {formatTime(duration)}
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.playscreenControl}>
                                <TouchableOpacity>
                                    <Image
                                        style={{
                                            width: 23.79,
                                            height: 20.15,
                                            opacity: 0.8,
                                        }}
                                        source={{
                                            uri: "https://firebasestorage.googleapis.com/v0/b/mypodcast-88135.appspot.com/o/icon%2Fico_random_btn.png?alt=media&token=dda7b7d4-d4f8-4f2f-a5fe-ceb20ad135e7",
                                        }}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { onPrevPress() }}>
                                    <Image
                                        style={{ width: 28, height: 28 }}
                                        source={{
                                            uri: "https://firebasestorage.googleapis.com/v0/b/mypodcast-88135.appspot.com/o/Tu%2Fbxs_skip-next-circle.png?alt=media&token=10b12ffd-b779-4fdf-8376-b1f8baa92256",
                                        }}
                                    />
                                </TouchableOpacity>
                                {playValue ? (
                                    <TouchableOpacity onPress={() => pauseSound()}>
                                        <Image
                                            style={{ width: 55, height: 55 }}
                                            source={{
                                                uri:
                                                    "https://firebasestorage.googleapis.com/v0/b/mypodcast-88135.appspot.com/o/icon%2Fpause.png?alt=media&token=ae6b74e7-ac06-40a8-a1a7-09d3380e2863",
                                            }}
                                        />
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity onPress={() => resumeSound(detailPost.audio)}>
                                        <Image
                                            style={{ width: 55, height: 55 }}
                                            source={{
                                                uri:
                                                    "https://firebasestorage.googleapis.com/v0/b/mypodcast-88135.appspot.com/o/Tu%2FGroup%2066.png?alt=media&token=5fb2d1e2-48a0-43bb-9773-ce3424e388f4",
                                            }}
                                        />
                                    </TouchableOpacity>
                                )}
                                <TouchableOpacity onPress={() => { onNextPress() }}>
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
                    </View>
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
                        onPress={handleNextPress}
                    >
                        <Text style={{ fontSize: 18, color: colors.white }}>
                            Xem thêm
                        </Text>
                        <Icon
                            name={"chevron-down"}
                            size={20}
                            color={colors.white}
                        />
                    </TouchableOpacity>
                </View>
                <View>
                    <View style={styles.playscreenHeader}>
                        <TouchableOpacity
                        // onPress={() => {
                        //     navigate("PlayerScreen");
                        // }}
                        >
                            <Icon
                                name={"chevron-down"}
                                style={{}}
                                size={35}
                                color={"black"}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <Icon name="dots-horizontal" size={35} color={"black"} />
                        </TouchableOpacity>
                    </View>

                    <View
                        style={{ flex: 1, marginHorizontal: 16 }}
                    >
                        <View style={styles.informationInfor}>
                            <Image
                                style={{
                                    width: 129,
                                    height: 129,
                                    marginRight: 10,
                                    borderRadius: 15,
                                }}
                                source={{
                                    uri: detailPost.owner.avatar,
                                }}
                            />

                            <View style={styles.informationAccountInfo}>
                                <Text style={styles.informationAccountUsername}>
                                    {detailPost.owner.fullName}
                                </Text>
                                {/* <View style={{ flexDirection: "row" }}>
                                    <Text style={{ fontSize: 13 }}>@</Text> */}
                                <Text style={{ fontSize: 13 }}>@{detailPost.owner.userName}</Text>
                                {/* </View> */}
                                <View style={{ flexDirection: "row" }}>
                                    <Icon name="circle-small" size={15} />
                                    <Text style={{ fontSize: 13 }}>56</Text>
                                    <Text style={{ fontSize: 13 }}>
                                        {" "}
                                        Người theo dõi
                                    </Text>
                                </View>
                                <View style={{ flexDirection: "row" }}>
                                    <Icon name="circle-small" size={15} />
                                    <Text style={{ fontSize: 13 }}>06</Text>
                                    <Text style={{ fontSize: 13 }}> Bài đăng</Text>
                                </View>
                                <View style={styles.informationFile}>
                                    <TouchableOpacity
                                        style={styles.informationInteract}
                                    >
                                        <Text style={{ fontSize: 12 }}>Theo dõi</Text>
                                        <Image
                                            source={{
                                                uri: "https://firebasestorage.googleapis.com/v0/b/mypodcast-88135.appspot.com/o/icon%2Fico_user-follow-line.png?alt=media&token=fd5930b3-e9c0-4332-9c6e-3455cff44bd2",
                                            }}
                                            style={{
                                                resizeMode: "contain",
                                                width: 14,
                                                height: 12,
                                            }}
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.informationInteract}
                                    >
                                        <Text style={{ fontSize: 12 }}>Xem hồ sơ</Text>
                                        <Image
                                            source={{
                                                uri: "https://firebasestorage.googleapis.com/v0/b/mypodcast-88135.appspot.com/o/icon%2Fico_outline-navigate-next.png?alt=media&token=fa6d02cd-f751-41f9-8a57-0b0d58afe67d",
                                            }}
                                            style={{
                                                resizeMode: "contain",
                                                width: 14,
                                                height: 14,
                                            }}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={styles.informationPlay}>
                            {/* xem thêm */}
                            {playValue ? (
                                <TouchableOpacity onPress={() => pauseSound()}>
                                    <Icon name="pause" size={30} />
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity onPress={() => resumeSound(detailPost.audio)}>
                                    <Icon name="play" size={30} />
                                </TouchableOpacity>
                            )}
                            <View style={{ flexDirection: 'row' }}>
                                {/* <Slider
                                    // style={}
                                    minimumValue={0}
                                    maximumValue={duration}
                                    value={position}
                                    thumbTintColor="black"
                                    minimumTrackTintColor="black"
                                    maximumTrackTintColor="black"
                                    onValueChange={onSliderValueChange}
                                /> */}
                                {/* <View style={styles.progressLevelDur}> */}
                                <Text style={{
                                    fontSize: 12,
                                    marginHorizontal: 9,
                                }}>
                                    {formatTime(position)}/{formatTime(duration)}
                                </Text>
                                {/* <Text style={styles.progressLabelText}>
                                        {formatTime(duration)}
                                    </Text> */}
                                {/* </View> */}
                                <Slider
                                    style={{ width: device.width / 2 }}
                                    minimumValue={0}
                                    maximumValue={duration}
                                    value={position}
                                    thumbTintColor="black"
                                    minimumTrackTintColor="black"
                                    maximumTrackTintColor="black"
                                    onValueChange={onSliderValueChange}
                                />
                            </View>
                        </View>
                        <View style={styles.informationSavedFavorites}>
                            <TouchableOpacity style={styles.informationSavedFavorites}>
                                <Icon
                                    name="heart-outline"
                                    style={styles.iconBack}
                                    size={30}
                                    color={"black"}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.informationSavedFavorites}>
                                <Icon
                                    name="bookmark-outline"
                                    style={styles.iconBack}
                                    size={30}
                                    color={"black"}
                                />
                            </TouchableOpacity>
                        </View>

                        {showCommentScrollView && (
                            <ScrollView style={{ height: 550 }}>
                                <View>
                                    <Text
                                        style={{
                                            fontSize: 25,
                                            fontWeight: "bold",
                                        }}
                                    >
                                        {detailPost.title}
                                    </Text>
                                    <Text style={{ color: "#5E5E5E", marginVertical: 5 }}>
                                        Đăng tải: 6 giờ trước
                                    </Text>
                                    <Text style={{ fontSize: 15, lineHeight: 22 }}>
                                        {detailPost.content}{" "}
                                    </Text>
                                </View>

                                <View style={styles.informationComment}>
                                    <Comment />
                                    <Comment />
                                    <Comment />
                                    <Comment />
                                </View>
                                <TouchableOpacity onPress={handleBackPress}>
                                    <Text>Quay lại</Text>
                                </TouchableOpacity>
                            </ScrollView>
                        )}
                        <View style={styles.informationFooter}>
                            <View
                                style={{
                                    // height: "80%",
                                    alignSelf: "center",
                                    width: "90%",
                                    height: "50%",
                                    flexDirection: "row",
                                    borderRadius: 77,
                                    borderWidth: 1,
                                    backgroundColor: "#fff",
                                }}
                            >
                                <TextInput
                                    style={{
                                        flex: 1,

                                        paddingLeft: 10,
                                    }}
                                    placeholder="Thêm bình luận"
                                ></TextInput>

                                <TouchableOpacity
                                    style={{ marginRight: 20, alignSelf: "center" }}
                                >
                                    <Image
                                        style={{
                                            width: 19,
                                            height: 19,
                                        }}
                                        source={{
                                            uri: "https://firebasestorage.googleapis.com/v0/b/mypodcast-88135.appspot.com/o/icon%2Ficon_sent.png?alt=media&token=404bc1f7-58fa-4f3b-ab82-ea29e5b4210a",
                                        }}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
            {/* </View> */}
        </View>
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
        // paddingBottom: 20,F
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
        bottom: 10,
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
        marginBottom: 40,
    },
    informationHeader: {
        justifyContent: "space-between",
        flexDirection: "row",
        marginHorizontal: 16,
        paddingBottom: 5,
    },

    informationMain: {
        flex: 1,
    },
    informationAccountInfo: {
        flex: 1,
        justifyContent: "space-between",
        marginLeft: 10,
    },

    informationInfor: {
        flexDirection: "row",
    },

    informationPlay: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: -5,
    },

    informationTime: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 5,
    },

    informationSlider: {
        width: "80%",
        height: 40,
        flexDirection: "row",
        alignSelf: "center",
        marginLeft: 5,
    },

    informationInteract: {
        flexDirection: "row",
        backgroundColor: "#D6D6D6",
        paddingVertical: 3,
        paddingHorizontal: 8,
        borderRadius: 5,
        marginRight: 15,
    },

    informationAccountUsername: {
        fontSize: 23,
        fontWeight: "bold",
    },

    informationFile: {
        flexDirection: "row",
        alignItems: "center",
    },

    informationSavedFavorites: {
        flexDirection: "row",
        marginBottom: 4,
        marginRight: 7,
    },

    informationComment: {
        backgroundColor: "#EFEFEF",
        flex: 1,
        borderRadius: 10,
        padding: 16,
        marginTop: 10,
    },
    informationFooter: {
        backgroundColor: "#EFEFEF",
        position: "absolute",
        bottom: 0,
        width: "100%",
        height: "8%",
        justifyContent: "center",
    },
    informationTextInput: {
        borderRadius: 77,
        backgroundColor: "#ffffff",
        width: "100%",
    },

});