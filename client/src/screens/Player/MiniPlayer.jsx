import { React, useEffect, useRef, useState } from "react";
import {
    Text,
    View,
    Image,
    StyleSheet,
    TouchableOpacity,
    ImageBackground,
    SafeAreaView,
    ScrollView,
    PanResponder,
    Animated,
} from "react-native";
import colors from "../../constants/colors";
import Slider from "@react-native-community/slider";
import { device } from "../../constants/device";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentSound, setDuration, setIsMiniPlayer, setIsPlayScreen, setIsPlayer, setIsPlaying, setNextPress, setPlayValue, setPosition, setPrevPress, setSound, setSoundUrl } from "../../redux/slices/playerSlice";

import { useIsFocused, useNavigation } from '@react-navigation/native';

import { Audio } from 'expo-av';
import EmptyImage from "../../constants/EmptyImage";
import { getPost } from "../../redux/actions/postApi";

export default function MiniPlayer(props) {
    // const { switchToNewSound } = props
    const sound = useSelector((state) => state.player.sound);

    const navigation = useNavigation();

    // const [miniPlayerOpacity, setMiniPlayerOpacity] = useState(1);
    const dispatch = useDispatch();
    const isFocused = useIsFocused();
    // const [sound, setSound] = useState(null);
    const detailPost = useSelector((state) => state.post.detailPost);
    // const soundUrl = useSelector((state) => state.player.soundUrl);
    const playValue = useSelector((state) => state.player.playValue);
    const position = useSelector((state) => state.player.position);
    const duration = useSelector((state) => state.player.duration);
    const isPlayer = useSelector((state) => state.player.isPlayer);
    const isMiniPlayer = useSelector((state) => state.player.isMiniPlayer);
    const currentSound = useSelector((state) => state.player.currentSound);
    const isPlaying = useSelector((state) => state.player.isPlaying);
    const isPlayScreen = useSelector((state) => state.player.isPlayScreen);
    const dataSound = useSelector((state) => state.player.dataSound);
    const access_token = useSelector((state) => state.auth.login.access_token);

    const SliderData = useSelector((state) => state.home.slider.data);

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
            if (sound) {
                await sound.unloadAsync();
                dispatch(setSound(null));
            }
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

    useEffect(() => {
        if (isPlaying) {
            playSound();
            console.log("mini player");
            dispatch(setIsPlaying(false));
        }
    }, [detailPost.audio]);

    const playSound = async () => {
        if (detailPost !== null && isFocused) {
            await loadSound(detailPost.audio);
            console.log("phát đầu tiên mini player");
        }
    };

    function onPlaybackStatusUpdate(status) {
        if (status.isPlaying) {
            dispatch(setPosition(status.positionMillis));
            dispatch(setDuration(status.durationMillis));
        }
    }

    useEffect(() => {
        if (sound != null && isFocused) {
            if (playValue) {
                resumeSound();
            } else {
                pauseSound();
            }
        }
    }, [playValue]);

    async function onSliderValueChange(value) {
        if (sound != null) {
            await sound.setPositionAsync(value);
            dispatch(setPosition(value));
        }
    }

    async function pauseSound() {
        if (sound != null) {
            await sound.pauseAsync();
            dispatch(setPlayValue(false));
        }
    }

    async function resumeSound() {
        if (sound != null) {
            const status = await sound.getStatusAsync();
            if (!status.isLoaded) {
                await sound.loadAsync(
                    { uri: detailPost.audio },
                    { shouldPlay: true }
                );
            }
            await sound.playAsync();
            dispatch(setPlayValue(true));
        }

    }

    async function switchToNewSound(uri) {
        try {
            if (sound != null) {
                await sound.unloadAsync();
                dispatch(setSound(null));
            }
            if (uri) {
                await getPost(uri, dispatch, access_token);
            }
        } catch (error) {
            console.log(error);
        }
    }

    function onNextPress() {
        const currentIndex = dataSound.findIndex((item) => item.index === currentSound);
        const nextTrack = dataSound[currentIndex + 1];
        if (nextTrack) {
            switchToNewSound(nextTrack._id);
            dispatch(setCurrentSound(nextTrack.index));
            dispatch(setPosition(0));
            dispatch(setIsPlaying(true));
        }
    }

    function onPrevPress() {
        const currentIndex = dataSound.findIndex((item) => item.index === currentSound);
        const prevTrack = dataSound[currentIndex - 1];
        if (prevTrack) {
            switchToNewSound(prevTrack._id);
            dispatch(setCurrentSound(prevTrack.index));
            dispatch(setPosition(0));
            dispatch(setIsPlaying(true));
        }
    }
    // useEffect(() => {
    //     return sound
    //         ? () => {
    //             sound.unloadAsync();
    //             console.log("sound mini");
    //         }
    //         : undefined;
    // }, [sound]);

    const [pan] = useState(new Animated.ValueXY());
    const panResponder = PanResponder.create({
        onMoveShouldSetPanResponderCapture: () => true,
        onPanResponderGrant: () => {
            pan.setOffset({
                x: pan.x._value,
                y: pan.y._value,
            });
        },
        onPanResponderMove: Animated.event(
            [null, { dx: pan.x }],
            {
                useNativeDriver: false,
                listener: (event, gestureState) => {
                    if (gestureState.dx > 30 || gestureState.dx < -30) {
                        // Kéo sang phải hoặc trái hơn 50px thì tắt nhạc
                        sound.unloadAsync();
                        dispatch(setPosition(0));
                        dispatch(setIsMiniPlayer(false));
                    }
                },
            }
        ),
        onPanResponderRelease: () => {
            pan.flattenOffset();
        },
    });

    return (
        <Animated.View
            style={[{ transform: [{ translateX: pan.x }] }]}
            {...panResponder.panHandlers}
        >
            <ImageBackground
                source={{
                    uri: detailPost.image,
                }}
                resizeMode="cover"
                style={stylesMiniPlayer.miniplayerBackground}
                blurRadius={5}
                opacity={0.2}
            >
                <View style={{ flexDirection: "row", justifyContent: 'space-between', }}>
                    {/* <View style={{ flexDirection: "row" }}> */}
                    <TouchableOpacity
                        style={stylesMiniPlayer.miniplayer}
                        onPress={() => {
                            // sound.unloadAsync();
                            // setSound(null);
                            // dispatch(setIsMiniPlayer(false));
                            // if (playValue) {
                            //     dispatch(setIsPlayer(false));
                            // };
                            navigation.navigate('PlayerScreen');
                        }}
                    >
                        <View style={stylesMiniPlayer.miniplayerAvatar}>
                            <Image
                                style={{
                                    width: device.width * 0.15,
                                    height: device.width * 0.15,
                                    borderRadius: 7,
                                }}
                                source={{
                                    uri: detailPost.image,
                                }}
                            />
                        </View>
                        <View style={stylesMiniPlayer.miniplayerTrackDetails}>
                            <Text style={{ fontWeight: "600", fontSize: 15, }} numberOfLines={1} ellipsizeMode='tail'>{detailPost.title}</Text>
                            <Text style={{ fontSize: 13 }} numberOfLines={1} ellipsizeMode='tail'>{detailPost.owner.fullName}</Text>
                        </View>
                        <View style={stylesMiniPlayer.miniplayerControls}>
                            <TouchableOpacity onPress={() => onPrevPress()}>
                                <Image
                                    style={{ width: device.width / 16, height: device.width / 16 }}
                                    source={{
                                        uri: "https://firebasestorage.googleapis.com/v0/b/mypodcast-88135.appspot.com/o/icon%2Fprev.png?alt=media&token=2002d71f-989c-47de-a1da-93caf349d2e8",
                                    }}
                                />
                            </TouchableOpacity>
                            {playValue ? (
                                <TouchableOpacity onPress={() => pauseSound()}>
                                    <Image
                                        style={{ width: device.width / 10, height: device.width / 10 }}
                                        source={{
                                            uri:
                                                "https://firebasestorage.googleapis.com/v0/b/mypodcast-88135.appspot.com/o/icon%2Fico_pause_playersc.png?alt=media&token=4c757d52-ce70-456a-aa36-c8c581af7be6",
                                        }}
                                    />
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity onPress={() => resumeSound()}>
                                    <Image
                                        style={{ width: device.width / 10, height: device.width / 10 }}
                                        source={{
                                            uri:
                                                "https://firebasestorage.googleapis.com/v0/b/mypodcast-88135.appspot.com/o/icon%2Fplay.png?alt=media&token=332dfb0f-748b-4867-b4b9-bc63c3d0e881",
                                        }}
                                    />
                                </TouchableOpacity>
                            )}

                            <TouchableOpacity onPress={() => onNextPress()}>
                                <Image
                                    style={{ width: device.width / 16, height: device.width / 16 }}
                                    source={{
                                        uri: "https://firebasestorage.googleapis.com/v0/b/mypodcast-88135.appspot.com/o/icon%2Fnext.png?alt=media&token=808063fd-1278-4e5d-ba5a-46d3e750f1f3",
                                    }}
                                />
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>

                </View>
                <Slider
                    style={stylesMiniPlayer.progressBar}
                    minimumValue={0}
                    maximumValue={duration}
                    value={position}
                    // minimumTrackTintColor= 'red'
                    maximumTrackTintColor={colors.black}
                    thumbTintColor="black"
                    // disabled={true}
                    onValueChange={onSliderValueChange}
                />
            </ImageBackground >
        </Animated.View >
    );
}

const stylesMiniPlayer = StyleSheet.create({
    miniplayer: {
        // height: device.height / 10,
        flexDirection: "row",
        flex: 1
    },
    miniplayerBackground: {
        // flexDirection: "row",
        backgroundColor: "#fff",
        paddingVertical: 10,
        width: "100%",
        // display: 'flex',
        // display: 'flex',
        // height: device.height / 10,
    },

    miniplayerAvatar: {
        // flex: 1,
        justifyContent: "flex-start",
        marginHorizontal: 16,
        alignSelf: "center",

    },

    miniplayerTrackDetails: {
        // flex: 4,
        justifyContent: "center",
        // marginLeft: 10,
        maxWidth: device.width / 2.4,
        alignItems: "flex-start",
        width: '45%',

    },

    miniplayerControls: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        // marginRight: 16,
        // width: '35%',
    },

    progressBar: {
        width: device.width,
        // height: device.height / 20,
        // flexDirection: "row",
        // alignSelf: "center",
        opacity: 0.6,
    },

});
