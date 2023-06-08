import { ScrollView, StyleSheet, TouchableOpacity, View, SafeAreaView, Image, Text } from "react-native";
import { HeaderUI, FollowingItem } from "../components";
import { lightfollowStyles, darkfollowStyles, lightFollowingItem } from "../constants/darkLight/themeFollowing"
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import { useCallback, useEffect, useRef, useState } from "react";
import { warningLogin } from "../ultis/warning";
import GlobalStyles from "../components/GlobalStyles";
import colors from "../constants/colors";
import { getNewFeed } from "../redux/actions/followingApi";
import { getOtherUser } from "../redux/actions/profileApi";
import FollowingHeader from "../components/FollowingHeader";
import { setIsMiniPlayer, setIsPlayScreen, setIsPlaying, setSound } from "../redux/slices/playerSlice";
import { getHistoryListData, getLikedListData, getSavedListData } from "../redux/actions/libraryApi";
import { device } from "../constants/device";
import { setDuration, setPlayStatus, setPlaybackState, setPosition, setSoundCurrent, setSoundFollower } from "../redux/slices/followingSlice";
import { Audio } from "expo-av";
import Slider from "@react-native-community/slider";
import MiniPlayer from "./Player/MiniPlayer";
import { getCommentData } from "../redux/actions/commentApi";
import Comment from "../components/Comment";
import CommentFollowing from "../components/CommentFollowing";

export default function Following(props) {
    const { navigation, route } = props;
    const { navigate, goback } = navigation;
    const currentUser = useSelector((state) => state.auth.login.currentUser);
    const access_token = useSelector((state) => state.auth.login.access_token);
    const isMiniPlayer = useSelector((state) => state.player.isMiniPlayer);
    const dispatch = useDispatch();
    const isFocused = useIsFocused();
    const soundCurrent = useSelector((state) => state.following.soundCurrent);
    const playStatus = useSelector((state) => state.following.playStatus);
    const playbackState = useSelector((state) => state.following.playbackState);
    // const [playbackState, setPlaybackState] = useState({});
    const [isPlaying, setIsPlaying] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const isComment = useSelector((state) => state.comment.isComment);
    // const commentCurrent = useSelector((state) => state.comment.commentCurrent);
    // const CommentData = useSelector((state) => state.comment.commentData.data);

    // const fetchCommentData = async () => {
    //     console.log("cmt: " + commentCurrent);
    //     await getCommentData(commentCurrent, dispatch);
    // }

    // useEffect(() => {
    //     fetchCommentData();
    //     console.log("data comment");
    // }, [isComment]);

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

    const soundRef = useRef(null);
    const soundCurrentRef = useRef(null);
    const sound = useSelector((state) => state.player.sound);

    // Hàm phát nhạc
    async function resumeSound(id) {
        dispatch(setPlayStatus({ ...playStatus, [id]: true }));
        if (sound != null && isMiniPlayer) {
            await sound.unloadAsync();
            dispatch(setIsMiniPlayer(false));
            dispatch(setIsPlayScreen(false));
        }
        console.log("soundCurrent: " + soundCurrent);
        if (soundCurrentRef.current !== soundCurrent) {
            // Nếu khác, thì dừng bài đang phát hiện tại
            // if (soundRef.current !== null && soundRef.current._loaded && playStatus[soundCurrentRef.current]) {
            //     await soundRef.current.pauseAsync();
            //     dispatch(setPlayStatus({ ...playStatus, [soundCurrent]: true }));
            //     console.log("dừng id bài cũ: " + soundCurrent);
            // }
            dispatch(setSoundCurrent(id));
        }
        soundCurrentRef.current = id;
        console.log("soundCurrentRef.current: " + soundCurrentRef.current);
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
                onPlaybackStatusUpdate
                console.log(id + ": phát lại từ vị trí hiện tại");
            } else {
                const { sound } = await Audio.Sound.createAsync(
                    { uri: index.audio },
                    {
                        shouldPlay: true,
                        isLooping: true,
                        position: playbackState[id]?.position
                    },
                    onPlaybackStatusUpdate
                );
                soundRef.current = sound;
                dispatch(setSound(sound));
                console.log(id + " :Phát lần đầu");
            }
        } catch (error) {
            console.log('Lỗi phát nhạc:', error);
        }
    }

    // Hàm dừng phát nhạc
    async function pauseSound(id) {
        if (soundRef.current !== null && soundRef.current._loaded) {
            await soundRef.current.pauseAsync();
            dispatch(setPlayStatus({ ...playStatus, [id]: false }));
            console.log("pauseSound, playStatus: " + id);
        }
    }

    useEffect(() => {
        if (soundRef.current && soundRef.current._loaded) {
            soundRef.current.unloadAsync();
            dispatch(setPlayStatus({ ...playStatus, [soundCurrent]: false }));
            dispatch(setPlaybackState({ id: soundCurrent, position: 0, duration: 0 }));
            dispatch(setSoundCurrent(soundCurrentRef.current));
            console.log("chuyển bài khác");
        }
    }, [soundCurrentRef.current]);


    let lastUpdateTime = null;
    const updateInterval = 1000; // Giới hạn tần suất cập nhật là 1 giây

    function onPlaybackStatusUpdate(status) {
        const position = status.positionMillis;
        if (position !== undefined) {
            const duration = status.durationMillis;
            const currentTime = Date.now();

            if (!lastUpdateTime || currentTime - lastUpdateTime > updateInterval) {
                dispatch(setPlaybackState({ id: soundCurrentRef.current, position: position, duration: duration }));
                lastUpdateTime = currentTime;
            }
        }
        console.log("time: " + position);
    }



    async function onSliderValueChange(value) {
        if (soundRef.current !== null) {
            await soundRef.current.setPositionAsync(value);
            dispatch(setPlaybackState({ id: soundCurrentRef.current, position: value }));
            console.log("tua: " + value / 1000);
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
                                            {/* {isComment && item._id === commentCurrent &&
                                                <ScrollView>
                                                    <View style={{
                                                        backgroundColor: "#EFEFEF",
                                                        // borderRadius: 10,
                                                        marginTop: 10,
                                                        marginHorizontal: 16,
                                                        maxHeight: device.height / 6,
                                                    }}>
                                                        {CommentData.map((item, index) => {
                                                            return (
                                                                <TouchableOpacity
                                                                    onPress={{}}
                                                                    key={index}
                                                                >
                                                                    <CommentFollowing item={item} />
                                                                </TouchableOpacity>
                                                            );
                                                        })}
                                                    </View>
                                                </ScrollView>
                                            } */}
                                            <View style={followStyles.interactPlayTime}>
                                                <TouchableOpacity onPress={() => playStatus[item._id] ? pauseSound(item._id) : resumeSound(item._id)}>
                                                    <Image
                                                        style={{ width: device.width / 12, height: device.width / 12 }}
                                                        source={{
                                                            uri: playStatus[item._id]
                                                                ? 'https://firebasestorage.googleapis.com/v0/b/mypodcast-88135.appspot.com/o/icon%2Fico_pause_playersc.png?alt=media&token=4c757d52-ce70-456a-aa36-c8c581af7be6'
                                                                : 'https://firebasestorage.googleapis.com/v0/b/mypodcast-88135.appspot.com/o/icon%2Fico_play_playersc.png?alt=media&token=916c4f80-4489-41b1-b834-de6f2d5affd8'
                                                        }}
                                                    />
                                                </TouchableOpacity>
                                                {/* ------------ Thời gian bài hát --------------- */}
                                                <View style={followStyles.progressLevelDur}>
                                                    <Text style={followStyles.progressLabelText}>{formatTime(playbackState[item._id]?.position || 0)} / {formatTime(playbackState[item._id]?.duration || 0)} </Text>
                                                </View>
                                                <View>
                                                    <Slider
                                                        style={followStyles.progressBar}
                                                        minimumValue={0}
                                                        maximumValue={playbackState[item._id]?.duration}
                                                        value={playbackState[item._id]?.position}
                                                        thumbTintColor="black"
                                                        minimumTrackTintColor="black"
                                                        maximumTrackTintColor="black"
                                                        onValueChange={onSliderValueChange}
                                                    />
                                                </View>
                                            </View>
                                        </View>
                                        <View
                                            style={{ borderBottomWidth: 0.2, borderColor: colors.black, marginBottom: 25, marginTop: 16, marginHorizontal: 16 }}
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
        marginTop: 16,
        marginHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
    },

    progressBar: {
        width: device.width / 1.45,
        // maxWidth: device.width / 1.5,
        height: device.height / 30,
        alignSelf: "center",
        opacity: 0.6,
    },
});