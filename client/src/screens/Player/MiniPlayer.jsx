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
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import colors from "../../constants/colors";
import Slider from "@react-native-community/slider";
import { device } from "../../constants/device";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentSound, setDuration, setIsMiniPlayer, setIsPlayScreen, setIsPlayer, setIsPlaying, setNextPress, setPlayValue, setPosition, setSoundUrl } from "../../redux/slices/playerSlice";

import { useNavigation } from '@react-navigation/native';

import { Audio } from 'expo-av';
import EmptyImage from "../../constants/EmptyImage";

export default function MiniPlayer(props) {
    const { sound, loadSound, switchToNewSound } = props

    const navigation = useNavigation();

    // const [miniPlayerOpacity, setMiniPlayerOpacity] = useState(1);
    const dispatch = useDispatch();
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

    const SliderData = useSelector((state) => state.home.slider.data);

    // async function playSound() {
    //     try {
    //         await Audio.setAudioModeAsync({
    //             staysActiveInBackground: true,
    //             interruptionModeAndroid: 1,
    //             shouldDuckAndroid: true,
    //             interruptionModeIOS: 1,
    //             playsInSilentModeIOS: true,
    //         });
    //         const { sound } = await Audio.Sound.createAsync(
    //             { uri:  soundUrl},
    //             {
    //                 shouldPlay: true,
    //                 isLooping: true,
    //             },
    //         );
    //         setSound(sound);
    //         dispatch(setPlayValue(true));
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
    // const unloadSound = async () => {
    //     try {
    //         await sound.unloadAsync();
    //         // setSound(null);
    //         setIsPlaying(false);
    //     } catch (error) {
    //         console.log('Error unloading audio: ', error);
    //     }
    // };

    // const playSound = async () => {
    //     if (detailPost !== null) {
    //         await loadSound(detailPost.audio);
    //         console.log("phát ở mini");
    //     }
    // };
    // useEffect(() => {
    //     if (detailPost && !isPlayer) {
    //         // unloadSound();
    //         playSound();
    //         console.log("phát nhạc")
    //     }
    //     // return () => {
    //     //     if (sound != null) {
    //     //         // sound.stopAsync();
    //     //         sound.unloadAsync();
    //     //     }
    //     // };
    // }, [detailPost]);

    useEffect(() => {
        if (sound != null) {
            if (playValue) {
                resumeSound();
            } else {
                pauseSound();
            }
        }
    }, [playValue]);

    function onSliderValueChange(value) {
        if (sound != null) {
            sound.setPositionAsync(value);
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
        // if (isPlayer) {
        //     playSound();
        //     dispatch(setPlayValue(true));
        //     dispatch(setIsPlayer(false));
        // }
    }

    function onNextPress() {
        // console.log("currentNext: " + currentTrack.id)
        const currentIndex = SliderData.findIndex((item) => item.index === currentSound);
        const nextTrack = SliderData[currentIndex + 1];
        console.log("soundnext: " + nextTrack._id);
        if (nextTrack) {
            switchToNewSound(nextTrack._id);
            dispatch(setCurrentSound(nextTrack.index));
            dispatch(setPosition(0));
            dispatch(setNextPress(true))
        }
    }

    function onPrevPress() {
        // console.log("currentPrev: " + currentTrack.id)
        const currentIndex = SliderData.findIndex((item) => item.index === currentSound);
        const prevTrack = SliderData[currentIndex - 1];
        if (prevTrack) {
            switchToNewSound(prevTrack._id);
            dispatch(setCurrentSound(prevTrack.index));
            dispatch(setPosition(0));
            dispatch(setNextPress(true))
        }
    }

    // const nextPress = useSelector((state) => state.player.nextPress);

    // useEffect(() => {
    //     if (nextPress) {
    //         sound.unloadAsync();
    //         loadSound(detailPost.audio);
    //         console.log("ductu1");
    //         dispatch(setNextPress(false));
    //     }
    //     // return () => {
    //     //     if (sound != null) {
    //     //         sound.unloadAsync();
    //     //         // setSound(null);
    //     //     }
    //     // };
    // }, [nextPress]);

    const handleScroll = (event) => {
        const scrollX = event.nativeEvent.contentOffset.x;
        const threshold = 100; //ngưỡng tối đa

        if (scrollX > threshold) {
            // setMiniPlayerOpacity(0);
            // console.log("đã biến mất");
        } else {
            // setMiniPlayerOpacity(1);
            // console.log("chưa biến mất");
        }
    };

    // useEffect(() => {
    //     return sound
    //         ? () => {
    //             sound.unloadAsync();
    //             console.log("sound mini");
    //         }
    //         : undefined;
    // }, [sound]);

    // const panResponder = useRef(
    //     PanResponder.create({
    //         onMoveShouldSetPanResponder: () => true,
    //         onPanResponderMove: (evt, gestureState) => {
    //             // Xử lý sự kiện chuyển động
    //             if (gestureState.dx > 50 || gestureState.dx < -50) {
    //                 dispatch(setIsMiniPlayer(false));
    //                 if (sound != null) {
    //                     sound.unloadAsync();
    //                 }
    //                 console.log(sound);
    //             }
    //         },
    //         onPanResponderRelease: (evt, gestureState) => {
    //             // Xử lý sự kiện khi thả tay
    //         },
    //     })
    // ).current;

    return (
        <View>
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
                            dispatch(setIsPlayScreen(true));
                        }}

                    >
                        <View style={stylesMiniPlayer.miniplayerAvatar}>
                            <Image
                                style={{
                                    width: device.width - 340,
                                    height: device.width - 340,
                                    borderRadius: 7,
                                }}
                                source={{
                                    uri: detailPost.image,
                                }}
                            />
                        </View>
                        <View style={stylesMiniPlayer.miniplayerTrackDetails}>
                            <Text style={{ fontWeight: "600", fontSize: 15, }}>{detailPost.title}</Text>
                            <Text style={{ fontSize: 13 }}>{detailPost.owner.fullName}</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={stylesMiniPlayer.miniplayerControls}>
                        <TouchableOpacity onPress={() => onPrevPress()}>
                            <Image
                                style={{ width: device.width - 370, height: device.width - 370 }}
                                source={{
                                    uri: "https://firebasestorage.googleapis.com/v0/b/mypodcast-88135.appspot.com/o/Tu%2Fbxs_skip-next-circle.png?alt=media&token=10b12ffd-b779-4fdf-8376-b1f8baa92256",
                                }}
                            />
                        </TouchableOpacity>
                        {playValue ? (
                            <TouchableOpacity onPress={() => pauseSound()}>
                                <Image
                                    style={{ width: device.width - 350, height: device.width - 350 }}
                                    source={{
                                        uri:
                                            "https://firebasestorage.googleapis.com/v0/b/mypodcast-88135.appspot.com/o/icon%2Fpause.png?alt=media&token=ae6b74e7-ac06-40a8-a1a7-09d3380e2863",
                                    }}
                                />
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity onPress={() => resumeSound()}>
                                <Image
                                    style={{ width: device.width - 350, height: device.width - 350 }}
                                    source={{
                                        uri:
                                            "https://firebasestorage.googleapis.com/v0/b/mypodcast-88135.appspot.com/o/Tu%2FGroup%2066.png?alt=media&token=5fb2d1e2-48a0-43bb-9773-ce3424e388f4",
                                    }}
                                />
                            </TouchableOpacity>
                        )}

                        <TouchableOpacity onPress={() => onNextPress()}>
                            <Image
                                style={{ width: device.width - 370, height: device.width - 370 }}
                                source={{
                                    uri: "https://firebasestorage.googleapis.com/v0/b/mypodcast-88135.appspot.com/o/Tu%2Ffluent_next-32-regular.png?alt=media&token=db668d13-33de-4f5b-99bd-c5723dd21f13",
                                }}
                            />
                        </TouchableOpacity>
                    </View>
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
        </View >
    );
}

const stylesMiniPlayer = StyleSheet.create({
    miniplayer: {
        // height: device.height / 10,
        flexDirection: "row"
    },
    miniplayerBackground: {
        // flexDirection: "row",
        backgroundColor: "#fff",
        paddingVertical: 10,
        width: "100%",
        display: 'flex',
    },

    miniplayerAvatar: {
        // flex: 1,
        justifyContent: "flex-start",
        marginHorizontal: 16,
        alignSelf: "center",
    },

    miniplayerTrackDetails: {
        // flex: 4,
        justifyContent: "space-between",
        // marginLeft: 10,
        alignItems: "flex-start",
    },

    miniplayerControls: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        // marginRight: 16,
    },

    progressBar: {
        width: device.width,
        // flexDirection: "row",
        // alignSelf: "center",
        opacity: 0.6,
    },

});
