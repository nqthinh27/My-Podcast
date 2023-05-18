import { ScrollView, StyleSheet, TouchableOpacity, View, SafeAreaView, Image, Text } from "react-native";
import { HeaderUI, FollowingItem } from "../components";
import { lightfollowStyles, darkfollowStyles, lightFollowingItem } from "../constants/darkLight/themeFollowing"
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import { warningLogin } from "../ultis/warning";
import GlobalStyles from "../components/GlobalStyles";
import colors from "../constants/colors";
import { getNewFeed } from "../redux/actions/followingApi";
import { getOtherUser } from "../redux/actions/profileApi";
import FollowingHeader from "../components/FollowingHeader";
import { setIsMiniPlayer, setIsPlayScreen, setIsPlaying } from "../redux/slices/playerSlice";
import { getHistoryListData, getLikedListData, getSavedListData } from "../redux/actions/libraryApi";
import { device } from "../constants/device";
import { setDuration, setPlayStatus, setPosition, setSoundCurrent, setSoundFollower } from "../redux/slices/followingSlice";
import { Audio } from "expo-av";
import Slider from "@react-native-community/slider";
import MiniPlayer from "./Player/MiniPlayer";
import PlayerScreen from "./Player/PlayerScreen";

export default function Following(props) {
    const { navigation, route } = props;
    const { navigate, goback } = navigation;
    const currentUser = useSelector((state) => state.auth.login.currentUser);
    const access_token = useSelector((state) => state.auth.login.access_token);
    const isMiniPlayer = useSelector((state) => state.player.isMiniPlayer);
    const dispatch = useDispatch();
    const isFocused = useIsFocused();
    const isPlayScreen = useSelector((state) => state.player.isPlayScreen);
    const soundFollower = useSelector((state) => state.following.soundFollower);
    const soundCurrent = useSelector((state) => state.following.soundCurrent);
    const playStatus = useSelector((state) => state.following.playStatus);
    const [duration, setDuration] = useState(null);
    const [playbackState, setPlaybackState] = useState({});
    const [isPlaying, setIsPlaying] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isFocused && !currentUser) {
            warningLogin(navigate, 'Login', 'Home');
        }
    }, [isFocused]);
    const fetchNewFeedAfterLogin = async () => {
        setIsLoading(true);
        if (currentUser) {
            await getLikedListData(dispatch, access_token);
            await getSavedListData(dispatch, access_token);
            await getNewFeed(dispatch, access_token);
        }
        setIsLoading(false);
    }
    useEffect(() => {
        fetchNewFeedAfterLogin();
    }, [currentUser]);
    // const fetchNewFeedIfLogged = async () => {
    //     setIsLoading(true);
    //     if (currentUser) await getLikedListData(dispatch, access_token);
    //     setIsLoading(false);
    // }
    // useEffect(() => {
    //     fetchNewFeedIfLogged();
    // }, []);

    // const [sound, setSound] = useState(null);

    const soundRef = useRef(null);
    const soundCurrentRef = useRef(null);
    const sound = useSelector((state) => state.player.sound);

    // Hàm phát nhạc
    async function resumeSound(id) {
        if (sound != null && isMiniPlayer) {
            await sound.unloadAsync();
            dispatch(setIsMiniPlayer(false));
            dispatch(setIsPlayScreen(false));
        }
        console.log("id bài hát trước: " + soundCurrent);
        if (soundCurrentRef.current !== soundCurrent) {
            // Nếu khác, thì dừng bài đang phát hiện tại
            if (soundRef.current != null && soundRef.current._loaded && playStatus[soundCurrentRef.current]) {
                await soundRef.current.pauseAsync();
                dispatch(setPlayStatus({ ...playStatus, [soundCurrentRef.current]: false }));
                console.log("dừng id bài cũ: " + soundCurrentRef.current);
            }
            // Set icon for the previously playing sound to "pause"
            //dispatch(setPlayStatus({ ...playStatus, [soundCurrentRef.current]: false });
        }
        dispatch(setSoundCurrent(id));
        soundCurrentRef.current = id;
        const index = newFeed.find((item) => item._id === id);
        try {
            await Audio.setAudioModeAsync({
                staysActiveInBackground: true,
                interruptionModeAndroid: 1,
                shouldDuckAndroid: true,
                interruptionModeIOS: 1,
                playsInSilentModeIOS: true,
            });

            if (soundRef.current && soundRef.current._loaded) {
                await soundRef.current.playAsync();
                dispatch(setPlayStatus({ ...playStatus, [id]: true }));
                const status = await soundRef.current.getStatusAsync();
                // Update the position state after resuming the sound
                setPosition(status.positionMillis);
                setPlaybackState({
                    ...playbackState,
                    [soundCurrentRef.current]: {
                        ...playbackState[soundCurrentRef.current],
                        position: status.positionMillis,
                        duration: status.durationMillis,
                    },
                });
                console.log(id + ": phát lại từ vị trí hiện tại");
            } else {
                const { sound } = await Audio.Sound.createAsync(
                    { uri: index.audio },
                    {
                        shouldPlay: true,
                        isLooping: true,
                        positionMillis: playbackState[soundCurrentRef.current]?.position,
                    },
                );
                soundRef.current = sound;
                soundRef.current.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
                const status = await soundRef.current.getStatusAsync();

                dispatch(setPlayStatus({ ...playStatus, [id]: true }));
                setPosition(status.positionMillis); // Set the position state when playing for the first time
                setPlaybackState({
                    ...playbackState,
                    [soundCurrentRef.current]: {
                        ...playbackState[soundCurrentRef.current],
                        position: status.positionMillis,
                        duration: status.durationMillis,
                    },
                });
                console.log(id + " :Phát lần đầu");
            }
        } catch (error) {
            console.log('Lỗi phát nhạc:', error);
        }
    }

    // Hàm dừng phát nhạc
    async function pauseSound(id) {
        if (soundRef.current != null && soundRef.current._loaded) {
            await soundRef.current.pauseAsync();
            dispatch(setPlayStatus({ ...playStatus, [id]: false }));
            console.log("Ấn bài khác thì dừng bài cũ, playStatus: " + playStatus[id]);
        }
    }

    // Sử dụng useEffect để tự động phát hoặc dừng phát khi trạng thái playStatus thay đổi
    useEffect(() => {
        // const isCurrentSoundPlaying = playStatus[soundCurrentRef.current];
        // console.log("id bài trước: " + soundCurrent + " - id hiện tại: " + soundCurrentRef.current);
        // // Nếu đã có âm thanh đang phát và bài hát được chọn khác với bài hát hiện tại
        // if (soundCurrentRef.current !== soundCurrent && !isMiniPlayer) {
        //     // Dừng bài hát hiện tại nếu đang phát
        //     if (isCurrentSoundPlaying) {
        //         pauseSound(soundCurrentRef.current);
        //         console.log(soundCurrentRef.current + ": Dừng bài cũ khi chuyển bài mới");
        //     }

        //     // Cập nhật bài hát hiện tại và tiếp tục phát bài hát mới
        //     dispatch(setSoundCurrent(soundCurrent));
        //     soundCurrentRef.current = soundCurrent;
        //     resumeSound(soundCurrent);
        //     console.log("id bài hát mới: " + soundCurrent);
        // }
        // Nếu bài hát hiện tại đang phát, tiếp tục phát
        if (soundCurrentRef.current === soundCurrent) {
            if (soundRef.current != null) {
                if (playStatus[soundCurrentRef.current]) {
                    // Nếu đang phát, tiếp tục phát
                    resumeSound(soundCurrentRef.current);
                    console.log(soundCurrentRef.current + ": Nếu đang phát, tiếp tục phát");
                } else {
                    // Nếu đã dừng, tiếp tục dừng
                    pauseSound(soundCurrentRef.current);
                    console.log(soundCurrentRef.current + ": Nếu đã dừng, tiếp tục dừng");
                }
            }
        }

    }, [playStatus[soundCurrentRef.current]]);

    useEffect(() => {
        const isCurrentSoundPlaying = playStatus[soundCurrentRef.current];
        // Nếu đã có âm thanh đang phát, giải phóng nó
        if (soundRef.current && soundRef.current._loaded) {
            // setPosition(0);
            // setDuration(0);
            soundRef.current.unloadAsync();

            console.log(soundCurrent + " playStatus: " + playStatus[soundRef]);
            console.log("chuyển bài khác");
            // setPlayStatus({ ...playStatus, [prevSoundId]: false });
        }

        setPlayStatus({ ...playStatus, [soundCurrentRef.current]: false });
        // Đặt trạng thái playStatus về false khi bài hát mới được chọn

    }, [soundCurrentRef.current]);



    function onPlaybackStatusUpdate(status) {
        if (status.isPlaying) {
            setPlaybackState({
                ...playbackState,
                [soundCurrentRef.current]: {
                    ...playbackState[soundCurrentRef.current],
                    position: status.positionMillis,
                    duration: status.durationMillis,
                },
            })
        }
    }

    function onSliderValueChange(value) {
        if (playbackState[soundCurrentRef.current]) {
            if (soundRef.current != null) {
                soundRef.current.setPositionAsync(value);
                setPosition(value);

                setPlaybackState({
                    ...playbackState,
                    [soundCurrentRef.current]: {
                        ...playbackState[soundCurrentRef.current],
                        position: value,
                    },
                })
            }
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



    const isDarkTheme = useSelector((state) => state.theme.isDarkTheme);
    const newFeed = useSelector((state) => state.following.newFeed.data);
    if (!currentUser) return (<View></View>);

    return (
        <SafeAreaView style={[GlobalStyles.customSafeArea, { backgroundColor: isDarkTheme ? colors.dark_backgr : colors.white }]}>
            <ScrollView>
                <HeaderUI />
                <View style={isDarkTheme ? darkfollowStyles.contentWrapper : lightfollowStyles.contentWrapper}>
                    <View style={followStyles.contentSection}>
                        <View>
                            {newFeed.map((item, index) => {
                                console.log('123');
                                // const isPlaying = soundCurrent === item._id && playStatus[item._id];

                                return (
                                    <View key={index}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                getOtherUser(item.owner._id, dispatch, navigation.navigate, currentUser)
                                            }}

                                        >
                                            <FollowingHeader
                                                _id={item._id}
                                                avatar={item.avatar}
                                                owner={item.owner}
                                                createdAt={item.createdAt}
                                            />
                                        </TouchableOpacity>
                                        <View>
                                            <FollowingItem
                                                _id={item._id}
                                                title={item.title}
                                                likes={item.likes}
                                                views={item.views}
                                                comments={item.comments}
                                                content={item.content}
                                                createdAt={item.createdAt}
                                                audio={item.audio}
                                                image={item.image}
                                            />
                                            <View style={followStyles.interactPlayTime}>
                                                {playStatus[item._id] ? (
                                                    <TouchableOpacity onPress={() => pauseSound(item._id)}>
                                                        <Image
                                                            style={{ width: device.width / 12, height: device.width / 12 }}
                                                            source={{
                                                                uri:
                                                                    "https://firebasestorage.googleapis.com/v0/b/mypodcast-88135.appspot.com/o/icon%2Fpause.png?alt=media&token=ae6b74e7-ac06-40a8-a1a7-09d3380e2863",
                                                            }}
                                                        />
                                                    </TouchableOpacity>
                                                ) : (
                                                    <TouchableOpacity onPress={() => {
                                                        // sound.unloadAsync();
                                                        resumeSound(item._id);
                                                        // console.log("sound: " + item.audio);
                                                        // console.log("id: " + item._id);

                                                    }}>
                                                        <Image
                                                            style={{ width: device.width / 12, height: device.width / 12 }}
                                                            source={{
                                                                uri:
                                                                    "https://firebasestorage.googleapis.com/v0/b/mypodcast-88135.appspot.com/o/Tu%2FGroup%2066.png?alt=media&token=5fb2d1e2-48a0-43bb-9773-ce3424e388f4",
                                                            }}
                                                        />
                                                    </TouchableOpacity>
                                                )}
                                                {/* ------------ Thời gian bài hát --------------- */}
                                                <View style={followStyles.progressLevelDur}>
                                                    <Text style={followStyles.progressLabelText}>{formatTime(playbackState[item._id]?.position)} / {formatTime(playbackState[item._id]?.duration)} </Text>
                                                </View>
                                                <View>
                                                    <Slider
                                                        style={followStyles.progressBar}
                                                        minimumValue={0}
                                                        maximumValue={playbackState[item._id]?.duration || 0}
                                                        value={playbackState[item._id]?.position || 0}
                                                        thumbTintColor="black"
                                                        minimumTrackTintColor="black"
                                                        maximumTrackTintColor="black"
                                                        onValueChange={onSliderValueChange}
                                                    />
                                                </View>
                                            </View>
                                        </View>
                                        <View
                                            style={{ borderBottomWidth: 0.2, borderColor: colors.black, marginBottom: 25, marginTop: 9, marginHorizontal: 16 }}
                                        />
                                    </View>
                                )
                            })}
                        </View>
                    </View>
                </View>
            </ScrollView>
            {isMiniPlayer && <MiniPlayer />}
        </SafeAreaView>
    )
}

const followStyles = StyleSheet.create({
    contentWrapper: {
        marginTop: 10,
        backgroundColor: "#EDEDED",
    },

    contentSection: {
        marginVertical: 15,
    },

    progressLevelDur: {
        margin: 5,
    },

    progressLabelText: {
        fontSize: 12,
    },

    interactPlayTime: {
        margin: 15,
        marginHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
    },

    progressBar: {
        width: device.width / 1.5,
        height: device.height / 30,
        alignSelf: "center",
        opacity: 0.6,
    },
});
