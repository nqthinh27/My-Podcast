import { React, useEffect, useState } from "react";
import {
    Text,
    View,
    Image,
    StyleSheet,
    TouchableOpacity,
    ImageBackground,
    SafeAreaView,
    ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import colors from "../../constants/colors";
import Slider from "@react-native-community/slider";
import { device } from "../../constants/device";
import { useDispatch, useSelector } from "react-redux";
import { setDuration, setIsMiniPlayer, setIsPlayer, setPlayValue, setPosition, setSoundUrl } from "../../redux/slices/playerSlice";

import { useNavigation } from '@react-navigation/native';

import { Audio } from 'expo-av';
import EmptyImage from "../../constants/EmptyImage";

export default function MiniPlayer(props) {
    const { avtUrl, tittle, author } = props

    const navigation = useNavigation();

    const [miniPlayerOpacity, setMiniPlayerOpacity] = useState(1);
    const dispatch = useDispatch();
    const [sound, setSound] = useState(null);
    const soundUrl = useSelector((state) => state.player.soundUrl);
    const playValue = useSelector((state) => state.player.playValue);
    const position = useSelector((state) => state.player.position);
    const duration = useSelector((state) => state.player.duration);
    const isPlayer = useSelector((state) => state.player.isPlayer);
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
    async function playSound() {
        try {
            await Audio.setAudioModeAsync({
                staysActiveInBackground: true,
                interruptionModeAndroid: 1,
                shouldDuckAndroid: true,
                interruptionModeIOS: 1,
                playsInSilentModeIOS: true,
            });
            const { sound } = await Audio.Sound.createAsync(
                { uri: soundUrl },
                {
                    shouldPlay: true,
                    isLooping: true,
                    positionMillis: position,

                },
                onPlaybackStatusUpdate
            );
            setSound(sound);
            // dispatch(setPlayValue(true));
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (soundUrl && !isPlayer) {
            playSound();
        }
        return () => {
            if (sound != null) {
                sound.unloadAsync();
            }
        };
    }, [soundUrl]);

    useEffect(() => {
        if (sound != null ) {
            if (playValue) {
                resumeSound();
            } else {
                pauseSound();
            }
        }
    }, [playValue]);

    function onPlaybackStatusUpdate(status) {
        if (status.isPlaying) {
            dispatch(setPosition(status.positionMillis));
            dispatch(setDuration(status.durationMillis));
        }
    }

    function onSliderValueChange(value) {
        if (sound != null) {
            sound.setPositionAsync(value);
            dispatch(setPosition(value));
        }
    }

    async function pauseSound() {
        if (playValue) {
            if (sound != null) {
                await sound.pauseAsync();
                dispatch(setPlayValue(false));
            }
        } else {
            
        }
    }

    async function resumeSound() {
        if (sound != null) {
            const status = await sound.getStatusAsync();
            if (!status.isLoaded) {
                await sound.loadAsync(
                    { uri: soundUrl },
                    { shouldPlay: true }
                );
            }
            await sound.playAsync();
            dispatch(setPlayValue(true));
        }
        if (isPlayer) {
            playSound();
            dispatch(setPlayValue(true));
            dispatch(setIsPlayer(false));
        }
    }

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

    function playerNavigate() {
        navigate('PlayerScreen');
    }

    return (
        <TouchableOpacity
            style={stylesMiniPlayer.miniplayer}
            onPress={() => {
                // dispatch(setIsMiniPlayer(false));
                if (playValue) {
                    dispatch(setIsPlayer(false));
                    sound.pauseAsync();
                };
                navigation.navigate('PlayerScreen');
            }}
            
        >
            <ScrollView
                horizontal={true}
                contentContainerStyle={{ width: "100%" }}
                onScroll={handleScroll}
                scrollEventThrottle={16}
            >
                <ImageBackground
                    source={{
                        uri: avtUrl,
                    }}
                    resizeMode="cover"
                    style={stylesMiniPlayer.miniplayerBackground}
                    blurRadius={5}
                    opacity={0.2}
                >
                    <View style={{ flexDirection: "row", }}>
                        <View style={stylesMiniPlayer.miniplayerAvatar}>
                            <Image
                                style={{
                                    width: device.width - 340,
                                    height: device.width - 340,
                                    borderRadius: 7,
                                }}
                                source={{
                                    uri: avtUrl,
                                }}
                            />
                        </View>
                        <View style={stylesMiniPlayer.miniplayerTrackDetails}>
                            <Text style={{ fontWeight: "600", fontSize: 15, }}>{tittle}</Text>
                            <Text style={{ fontSize: 13 }}>{author}</Text>
                        </View>
                        <View style={stylesMiniPlayer.miniplayerControls}>
                            <TouchableOpacity>
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

                            <TouchableOpacity>
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
                </ImageBackground>
            </ScrollView>
        </TouchableOpacity>
    );
}

const stylesMiniPlayer = StyleSheet.create({
    miniplayer: {
        height: device.height / 10,
    },
    miniplayerBackground: {
        // flexDirection: "row",
        backgroundColor: "#fff",
        paddingVertical: 10,
        width: "100%",
        display: 'flex',
    },

    miniplayerAvatar: {
        flex: 1,
        justifyContent: "flex-start",
        marginHorizontal: 16,
        alignSelf: "center",
    },

    miniplayerTrackDetails: {
        flex: 4,
        justifyContent: "space-between",
        marginLeft: 10,
        alignItems: "flex-start",
    },

    miniplayerControls: {
        flex: 2.5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginRight: 16,
    },

    progressBar: {
        width: device.width,
        // flexDirection: "row",
        // alignSelf: "center",
        opacity: 0.6,
    },

});
