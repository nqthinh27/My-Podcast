import { React, useState, useRef, useEffect, useCallback } from "react";
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
    Platform
} from "react-native";
import Slider from "@react-native-community/slider";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../../constants/colors";
import { device } from "../../constants/device";
import GlobalStyles from "../../components/GlobalStyles";
import { Audio } from "expo-av";
import Comment from "../../components/Comment";
import { useDispatch, useSelector } from "react-redux";
import {
    setCurrentSound,
    setDuration,
    setIsMiniPlayer,
    setIsPlayScreen,
    setIsPlayer,
    setIsPlaying,
    setNextPress,
    setPlayValue,
    setPosition,
    setPrevPress,
    setSound,
} from "../../redux/slices/playerSlice";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { getPost } from "../../redux/actions/postApi";
import {
    darkProfile,
    lightProfile,
} from "../../constants/darkLight/themeProfile";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getLikedListData, getSavedListData } from "../../redux/actions/libraryApi";
import { patchDataAPI, postDataAPI } from "../../ultis/fetchData";
import { timeDiff, timeDiff2 } from "../../ultis/helper";
import { getOtherUser } from "../../redux/actions/profileApi";

export default function PlayerScreen(props) {
    // navigation
    // const { navigation, route } = props;
    // //function of navigate
    // const { navigate, goback } = navigation;

    const sound = useSelector((state) => state.player.sound);
    const isFocused = useIsFocused();
    const [showCommentScrollView, setShowCommentScrollView] = useState(true);
    const insets = useSafeAreaInsets();

    const handleCommentPress = () => {
        setShowCommentScrollView(true);
    };

    const handleBackPress = () => {
        setShowCommentScrollView(false);
    };

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
    const access_token = useSelector((state) => state.auth.login.access_token);

    const currentLanguage = useSelector(
        (state) => state.language.currentLanguage
    );
    const isDarkTheme = useSelector((state) => state.theme.isDarkTheme);

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
        // dispatch(setIsPlayScreen(false));
        navigation.goBack(null);
        // dispatch(setIsMiniPlayer(true));
        console.log("back của thiết bị");
        return true;
    };

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", onBackPress);
        return () => {
            BackHandler.removeEventListener("hardwareBackPress", onBackPress);
        };
    }, [navigation]);

    // ấn nút thu nhỏ màn hình
    function changeMiniPlayer() {
        // sound.unloadAsync();
        console.log("back");
        dispatch(setIsMiniPlayer(true));
        navigation.goBack();
        // dispatch(setIsPlaying(true));
        // if (!playValue) dispatch(setIsPlayer(true));
        // navigation.navigate('UIScreen');
    }

    useEffect(() => {
        if (!isMiniPlayer) {
            playSound();
            console.log("bài hát: " + detailPost.audio);
        }
    }, [detailPost.audio]);

    useEffect(() => {
        if (sound != null && isFocused) {
            if (playValue) {
                resumeSound(detailPost.audio);
            } else {
                pauseSound();
            }
        }
    }, [playValue]);

    const playSound = async () => {
        if (sound) {
            await sound.unloadAsync();
            dispatch(setSound(null));
        }
        await loadSound(detailPost.audio);
        console.log("phát đầu tiên");
        console.log("Views: " + detailPost.views);
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
                await sound.loadAsync({ uri }, { shouldPlay: true });
            }
            await sound.playAsync();
            dispatch(setPlayValue(true));
            console.log("dừng: " + playValue);
        }
    }

    async function onSliderValueChange(value) {
        try {
            if (sound !== null) {
                await sound.setPositionAsync(value);
                dispatch(setPosition(value));
                console.log("lặp");
            }
        } catch (error) {
            console.log(error);
            // Hiển thị thông báo lỗi cho người dùng tại đây
        }
        if (value > duration) {
            value = duration;
        } else if (value < 0) {
            value = 0;
        }
    }

    const formatTime = (time) => {
        if (time == null) {
            return "--:--";
        }
        const minutes = Math.floor(time / 60000);
        const seconds = ((time % 60000) / 1000).toFixed(0);
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    async function switchToNewSound(uri) {
        try {
            if (sound != null) {
                await sound.unloadAsync();
                dispatch(setSound(null));
            }
            if (uri) {
                await getPost(uri, dispatch, access_token, navigation.navigate);
            }
        } catch (error) {
            console.log(error);
        }
    }

    function onNextPress() {
        // console.log("currentNext: " + currentTrack.id)
        const currentIndex = dataSound.findIndex(
            (item) => item.index === currentSound
        );
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
        const currentIndex = dataSound.findIndex(
            (item) => item.index === currentSound
        );
        const prevTrack = dataSound[currentIndex - 1];
        if (prevTrack) {
            switchToNewSound(prevTrack._id);
            dispatch(setCurrentSound(prevTrack.index));
            dispatch(setPosition(0));
            dispatch(setIsMiniPlayer(false));
        }
    }

    async function stopSound() {
        if (sound) {
            await sound.stopAsync();
            setPlayValue(false);
        }
    }

    const scrollViewRef = useRef(null);

    const handleNextPress = () => {
        scrollViewRef.current.scrollTo({
            y: device.height * 2,
            animated: true,
        });
    };

    const handlePrevPress = () => {
        scrollViewRef.current.scrollTo({
            y: 0,
            animated: true,
        });
    };

    // handle save and like
    const currentUser = useSelector((state) => state.auth.login.currentUser);
    const userSavedList = useSelector((state) => state.library.savedList.data);
    const isSaved = userSavedList.some(element => element._id == detailPost._id);
    const [save, setSave] = useState(isSaved);
    const userLikedList = useSelector((state) => state.library.likedList.data);
    const isLiked = userLikedList.some(element => element._id == detailPost._id);
    const [like, setLike] = useState(isLiked);
    const fetchInFo = async () => {
        if (currentUser) {
            await getLikedListData(dispatch, access_token);
            await getSavedListData(dispatch, access_token);
        }
    }

    useEffect(() => {
        fetchInFo();
    }, []);
    const handleSave = async () => {
        if (!save) {
            await postDataAPI(`save/${detailPost._id}/add`, null, access_token);
        } else {
            await patchDataAPI(`save/${detailPost._id}/remove`, null, access_token);
        }
        setSave(!save)
    }
    const handleLike = async () => {
        if (!like) {
            await postDataAPI(`like/${detailPost._id}/add`, null, access_token);
        } else {
            await patchDataAPI(`like/${detailPost._id}/remove`, null, access_token);
        }
        setLike(!like)
    }
    return (
        <SafeAreaView
            style={[
                GlobalStyles.customSafeArea,
                isDarkTheme
                    ? darkProfile.profileContainer
                    : lightProfile.profileContainer,
            ]}
        >
            {/* <View > */}
            {/* <View style={{ borderRadius: 80, overflow: "hidden" }}> */}
            <ScrollView
                pagingEnabled={true}
                showsVerticalScrollIndicator={false}
                ref={scrollViewRef}
            >
                <View
                    style={{
                        // height: device.height - insets.top - insets.bottom,
                        height: Platform.OS === 'android' ? device.height : device.height - insets.top - insets.bottom,
                    }}
                >
                    <View style={styles.playscreenHeader}>
                        <TouchableOpacity>
                            <Icon
                                name={"chevron-down"}
                                style={{}}
                                size={35}
                                onPress={() => {
                                    changeMiniPlayer();
                                }}
                                value={isMiniPlayer}
                                color={isDarkTheme ? "white" : "black"}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <Icon
                                name="dots-horizontal"
                                // style={{ opacity: 1, top: 10 }}
                                size={35}
                                color={isDarkTheme ? "white" : "black"}
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={{ flex: 1 }}>
                        <View
                            style={[
                                { overflow: "hidden" },
                                styles.playscreenMain,
                            ]}
                        >
                            <ImageBackground
                                source={{
                                    uri: detailPost.image,
                                }}
                                // resizeMode="repeat"
                                // style={{ width: '100%', height: '100%' }}
                                opacity={isDarkTheme ? 0.4 : 0.08}
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
                                    <Text
                                        style={[
                                            styles.playscreenTitle,
                                            isDarkTheme
                                                ? darkProfile.profileText
                                                : lightProfile.profileText,
                                        ]}
                                        numberOfLines={1}
                                        ellipsizeMode="tail"
                                    >
                                        {detailPost.title}
                                    </Text>
                                    <Text
                                        numberOfLines={1}
                                        ellipsizeMode="tail"
                                        style={[
                                            styles.playscreenAuthor,
                                            ,
                                            isDarkTheme
                                                ? darkProfile.profileText
                                                : lightProfile.profileText,
                                        ]}
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
                                        thumbTintColor={
                                            isDarkTheme ? "white" : "black"
                                        }
                                        minimumTrackTintColor={
                                            isDarkTheme ? "white" : "black"
                                        }
                                        maximumTrackTintColor={
                                            isDarkTheme ? "white" : "black"
                                        }
                                        onValueChange={onSliderValueChange}
                                    />
                                    <View style={styles.progressLevelDur}>
                                        <Text
                                            style={[
                                                styles.progressLabelText,
                                                isDarkTheme
                                                    ? darkProfile.profileText
                                                    : lightProfile.profileText,
                                            ]}
                                        >
                                            {formatTime(position)}
                                        </Text>
                                        <Text
                                            style={[
                                                styles.progressLabelText,
                                                isDarkTheme
                                                    ? darkProfile.profileText
                                                    : lightProfile.profileText,
                                            ]}
                                        >
                                            {formatTime(duration)}
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.playscreenControl}>
                                    <TouchableOpacity>
                                        <Image
                                            style={[
                                                {
                                                    width: 23.79,
                                                    height: 20.15,
                                                    opacity: 0.8,
                                                },
                                                isDarkTheme
                                                    ? darkProfile.img
                                                    : lightProfile.img,
                                            ]}
                                            source={{
                                                uri: "https://firebasestorage.googleapis.com/v0/b/mypodcast-88135.appspot.com/o/icon%2Fico_random_btn.png?alt=media&token=dda7b7d4-d4f8-4f2f-a5fe-ceb20ad135e7",
                                            }}
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => {
                                            onPrevPress();
                                        }}
                                    >
                                        <Image
                                            style={[
                                                { width: 28, height: 28 },
                                                isDarkTheme
                                                    ? darkProfile.img
                                                    : lightProfile.img,
                                            ]}
                                            source={{
                                                uri: "https://firebasestorage.googleapis.com/v0/b/mypodcast-88135.appspot.com/o/icon%2Fico_prev_playersc.png?alt=media&token=7926276d-71be-4e3b-8c8d-42fd0ab3d369",
                                            }}
                                        />
                                    </TouchableOpacity>
                                    {playValue ? (
                                        <TouchableOpacity
                                            onPress={() => pauseSound()}
                                        >
                                            <Image
                                                style={{
                                                    width: 55,
                                                    height: 55,
                                                }}
                                                source={{
                                                    uri: "https://firebasestorage.googleapis.com/v0/b/mypodcast-88135.appspot.com/o/icon%2Fico_pause_playersc.png?alt=media&token=4c757d52-ce70-456a-aa36-c8c581af7be6",
                                                }}
                                            />
                                        </TouchableOpacity>
                                    ) : (
                                        <TouchableOpacity
                                            onPress={() =>
                                                resumeSound(detailPost.audio)
                                            }
                                        >
                                            <Image
                                                style={{
                                                    width: 55,
                                                    height: 55,
                                                }}
                                                source={{
                                                    uri: "https://firebasestorage.googleapis.com/v0/b/mypodcast-88135.appspot.com/o/icon%2Fico_play_playersc.png?alt=media&token=916c4f80-4489-41b1-b834-de6f2d5affd8",
                                                }}
                                            />
                                        </TouchableOpacity>
                                    )}
                                    <TouchableOpacity
                                        onPress={() => {
                                            onNextPress();
                                        }}
                                    >
                                        <Image
                                            style={[
                                                { width: 22, height: 22 },
                                                ,
                                                isDarkTheme
                                                    ? darkProfile.img
                                                    : lightProfile.img,
                                            ]}
                                            source={{
                                                uri: "https://firebasestorage.googleapis.com/v0/b/mypodcast-88135.appspot.com/o/icon%2Fico_next_playersc.png?alt=media&token=2bb45ceb-8cab-4f30-b01c-cc799d55756d",
                                            }}
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <Image
                                            style={[
                                                { width: 17.33, height: 23.83 },
                                                isDarkTheme
                                                    ? darkProfile.img
                                                    : lightProfile.img,
                                            ]}
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
                                <TouchableOpacity onPress={handleLike}>
                                    {!like && <Icon
                                        name="cards-heart-outline"
                                        style={{}}
                                        size={30}
                                        color={isDarkTheme ? "white" : "black"}
                                    />}
                                    {like && <Icon
                                        name="cards-heart"
                                        style={{}}
                                        size={30}
                                        color="red"
                                    />}
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Icon
                                        name="comment-outline"
                                        style={{}}
                                        size={30}
                                        color={isDarkTheme ? "white" : "black"}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={handleSave}>
                                    {!save && <Icon
                                        name="bookmark-outline"
                                        style={{}}
                                        size={30}
                                        color={isDarkTheme ? "white" : "black"}
                                    />}
                                    {save && <Icon
                                        name="bookmark"
                                        style={{}}
                                        size={30}
                                        color={colors.primary}
                                    />}
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ flex: 1, justifyContent: "space-around" }}>
                            <TouchableOpacity
                                style={styles.playscreenMore}
                                onPress={handleNextPress}
                            >
                                <Text
                                    style={{
                                        fontSize: 18,
                                        color: colors.white,
                                    }}
                                >
                                    {currentLanguage === "vi"
                                        ? "Xem thêm"
                                        : "More"}
                                </Text>
                                <Icon
                                    name={"chevron-down"}
                                    size={20}
                                    color="white"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View
                    style={{
                        height: Platform.OS === 'android' ? device.height : device.height - insets.top - insets.bottom,
                    }}
                >
                    <View style={styles.playscreenHeader}>
                        <TouchableOpacity onPress={handlePrevPress}>
                            <Icon
                                name={"chevron-down"}
                                style={{}}
                                size={35}
                                color={isDarkTheme ? "white" : "black"}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <Icon
                                name="dots-horizontal"
                                size={35}
                                color={isDarkTheme ? "white" : "black"}
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={{ flex: 1, marginHorizontal: 16 }}>
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
                                <Text
                                    style={[
                                        styles.informationAccountUsername,
                                        isDarkTheme
                                            ? darkProfile.profileText
                                            : lightProfile.profileText,
                                    ]}
                                >
                                    {detailPost.owner.fullName}
                                </Text>
                                {/* <View style={{ flexDirection: "row" }}>
                                    <Text style={{ fontSize: 13 }}>@</Text> */}
                                <Text
                                    style={[
                                        { fontSize: 13 },
                                        isDarkTheme
                                            ? darkProfile.profileText
                                            : lightProfile.profileText,
                                    ]}
                                >
                                    @{detailPost.owner.userName}
                                </Text>
                                {/* </View> */}
                                <View style={{ flexDirection: "row" }}>
                                    <Icon
                                        name="circle-small"
                                        size={15}
                                        color={isDarkTheme ? "white" : "black"}
                                    />
                                    <Text
                                        style={[
                                            { fontSize: 13 },
                                            isDarkTheme
                                                ? darkProfile.profileText
                                                : lightProfile.profileText,
                                        ]}
                                    >
                                        {detailPost.owner.followers}
                                    </Text>
                                    <Text
                                        style={[
                                            { fontSize: 13 },
                                            isDarkTheme
                                                ? darkProfile.profileText
                                                : lightProfile.profileText,
                                        ]}
                                    >
                                        {" "}
                                        {currentLanguage === "vi"
                                            ? "Người theo dõi"
                                            : "Followers"}
                                    </Text>
                                </View>
                                <View style={{ flexDirection: "row" }}>
                                    <Icon
                                        name="circle-small"
                                        size={15}
                                        color={isDarkTheme ? "white" : "black"}
                                    />
                                    <Text
                                        style={[
                                            { fontSize: 13 },
                                            isDarkTheme
                                                ? darkProfile.profileText
                                                : lightProfile.profileText,
                                        ]}
                                    >
                                        {detailPost.owner.posts}
                                    </Text>
                                    <Text
                                        style={[
                                            { fontSize: 13 },
                                            isDarkTheme
                                                ? darkProfile.profileText
                                                : lightProfile.profileText,
                                        ]}
                                    >
                                        {currentLanguage === "vi"
                                            ? " Bài đăng"
                                            : " posts"}
                                    </Text>
                                </View>
                                <View style={styles.informationFile}>
                                    {/* <TouchableOpacity
                                        style={styles.informationInteract}
                                    >
                                        <Text style={{ fontSize: 12 }}>
                                            {currentLanguage === "vi"
                                                ? "Theo dõi"
                                                : "Follow"}
                                        </Text>
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
                                    </TouchableOpacity> */}
                                    <TouchableOpacity
                                        style={styles.informationInteract}
                                    >
                                        <Text style={{ fontSize: 12 }} onPress={()=> {getOtherUser(detailPost.owner._id,dispatch,navigation.navigate)}}>
                                            {currentLanguage === "vi"
                                                ? "Xem hồ sơ"
                                                : "View profile"}
                                        </Text>
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
                                    <Icon
                                        name="pause"
                                        size={30}
                                        color={isDarkTheme ? "white" : "black"}
                                    />
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity
                                    onPress={() =>
                                        resumeSound(detailPost.audio)
                                    }
                                >
                                    <Icon
                                        name="play"
                                        size={30}
                                        color={isDarkTheme ? "white" : "black"}
                                    />
                                </TouchableOpacity>
                            )}
                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "center",
                                    alignContent: "center",
                                }}
                            >
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
                                <Text
                                    style={[
                                        {
                                            fontSize: 12,
                                            marginHorizontal: 9,
                                            alignSelf: "center",
                                        },
                                        isDarkTheme
                                            ? darkProfile.profileText
                                            : lightProfile.profileText,
                                    ]}
                                >
                                    {formatTime(position)}/
                                    {formatTime(duration)}
                                </Text>
                                {/* <Text style={styles.progressLabelText}>
                                        {formatTime(duration)}
                                    </Text> */}
                                {/* </View> */}
                                <Slider
                                    style={{ width: device.width / 1.5 }}
                                    minimumValue={0}
                                    maximumValue={duration}
                                    value={position}
                                    thumbTintColor={
                                        isDarkTheme ? "white" : "black"
                                    }
                                    minimumTrackTintColor={
                                        isDarkTheme ? "white" : "black"
                                    }
                                    maximumTrackTintColor={
                                        isDarkTheme ? "white" : "black"
                                    }
                                    onValueChange={onSliderValueChange}
                                />
                            </View>
                        </View>
                        <View style={styles.informationSavedFavorites}>
                            <TouchableOpacity
                                style={styles.informationSavedFavorites}
                                onPress={handleLike}
                            >
                                {!like && <Icon
                                    name="cards-heart-outline"
                                    style={styles.iconBack}
                                    size={30}
                                    color={isDarkTheme ? "white" : "black"}
                                />}
                                {like && <Icon
                                    name="cards-heart"
                                    style={styles.iconBack}
                                    size={30}
                                    color="red"
                                />}
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.informationSavedFavorites}
                                onPress={handleSave}
                            >
                                {!save && <Icon
                                    name="bookmark-outline"
                                    style={styles.iconBack}
                                    size={30}
                                    color={isDarkTheme ? "white" : "black"}
                                />}
                                {save && <Icon
                                    name="bookmark"
                                    style={styles.iconBack}
                                    size={30}
                                    color={colors.primary}
                                />}
                            </TouchableOpacity>
                        </View>

                        {showCommentScrollView && (
                            <ScrollView style={{ height: device.height * 0.6 }}>
                                <View>
                                    <Text
                                        style={[
                                            {
                                                fontSize: 25,
                                                fontWeight: "bold",
                                            },
                                            isDarkTheme
                                                ? darkProfile.profileText
                                                : lightProfile.profileText,
                                        ]}
                                    >
                                        {detailPost.title}
                                    </Text>
                                    <Text
                                        style={[
                                            { marginVertical: 5 },
                                            isDarkTheme
                                                ? darkProfile.textsub
                                                : { color: "#5E5E5E" },
                                        ]}
                                    >
                                        {currentLanguage === "vi"
                                            ? `Đăng tải: ${timeDiff2(detailPost.createdAt)}`
                                            : `Posted: ${detailPost.createdAt}`}
                                            
                                    </Text>
                                    <Text
                                        style={[
                                            { fontSize: 15, lineHeight: 22 },
                                            isDarkTheme
                                                ? darkProfile.profileText
                                                : lightProfile.profileText,
                                        ]}
                                    >
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
                                    <Text>
                                        {currentLanguage === "vi"
                                            ? "Quay lại"
                                            : "Back"}
                                    </Text>
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
                                    placeholder={
                                        currentLanguage === "vi"
                                            ? "Thêm bình luận"
                                            : "Add comment"
                                    }
                                ></TextInput>

                                <TouchableOpacity
                                    style={{
                                        marginRight: 20,
                                        alignSelf: "center",
                                    }}
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
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    playscreenHeader: {
        justifyContent: "space-between",
        flexDirection: "row",
        marginHorizontal: 16,
        // height: device.height * 0.05,
    },

    playscreenMain: {
        // flex: 0,
        borderRadius: 30,
        // paddingBottom: 20,F
        marginHorizontal: 16,
        // flex: 2
        backgroundColor: "grey",
    },

    playscreenInteractionBar: {
        flex: 0,
        // backgroundColor: "rgba(255,255,255,0.7)",
        borderRadius: 18,
        // height: 60,
        // backgroundColor: 'blue',
        justifyContent: "center",
        alignContent: "center",
        height: device.height * 0.1,
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
        width: device.width - 80,
        height: device.width - 80,
        alignSelf: "center",
        top: 16,
        borderRadius: 20,
        backgroundColor: "#000000",
        resizeMode: "cover",
    },

    progressBar: {
        width: 310,
        // height: 40,
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
    },

    playscreenMore: {
        backgroundColor: colors.primary,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        alignSelf: "center",
        padding: 5,
        paddingLeft: 10,
        borderRadius: 5,
        // position: "relative",
        // marginTop: 20,
        // height: device.height * 0.04,
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
