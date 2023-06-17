import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
    SafeAreaView,
    Text,
    View,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    ScrollView,
    Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useDispatch, useSelector } from "react-redux";

import { HeaderUI } from "../components";
import ReleasedPodcast from "../components/ReleasedPodcast"
import SlideItem from "../components/SlideItem";
import GlobalStyles from "../components/GlobalStyles";
import TopTrendingItem from "../components/TopTrendingItem";

// import { PlaylistData, RecommendData,  } from "../../dummyData";
import { lightHome, darkHome, lightTrendingHome, darkTrendingHome } from "../constants/darkLight/themeHome"
import MiniPlayer from "./Player/MiniPlayer";
import { setIsMiniPlayer, setCurrentSound, setPosition, setDuration, setIsPlayScreen, setDataSound, setSound } from "../redux/slices/playerSlice";
import { useNavigation } from "@react-navigation/native";
import { fetchNewRelease, fetchSlider, fetchTopAuthor, fetchTopTrending } from "../redux/actions/homeApi";
import TopAuthorItem from "../components/TopAuThorItem";
import { getOtherUser } from "../redux/actions/profileApi";
import { getPost } from "../redux/actions/postApi";
import { getPostDataSuccess, setDetailPost } from "../redux/slices/postSlice";
import { Audio } from "expo-av";
import PlayerScreen from "./Player/PlayerScreen";
import Loading from "../components/Loading";

// import PlayerScreen from "./PlayerScreen";

export default function Home(props) {
    const navigation = useNavigation();

    const dispatch = useDispatch();

    const isDarkTheme = useSelector((state) => state.theme.isDarkTheme);
    const isMiniPlayer = useSelector((state) => state.player.isMiniPlayer);
    // const playValue = useSelector((state) => state.player.playValue);
    const detailPost = useSelector((state) => state.post.detailPost);
    const currentSound = useSelector((state) => state.player.currentSound);
    const isPlayScreen = useSelector((state) => state.player.isPlayScreen);
    const currentUser = useSelector((state) => state.auth.login.currentUser);
    const access_token = useSelector((state) => state.auth.login.access_token);
    const playValue = useSelector((state) => state.player.playValue);
    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef(null);
    const scrollViewRef = useRef(null);
    const screenWidth = Math.min(325);
    const position = useSelector((state) => state.player.position);
    const sound = useSelector((state) => state.player.sound);
    const currentLanguage = useSelector(
        (state) => state.language.currentLanguage
    );
    const [isLoading, setIsLoading] = useState(false);
    const fetchHomeData = async () => {
        setIsLoading(true);
        await fetchSlider(dispatch);
        await fetchTopTrending(dispatch);
        await fetchNewRelease(dispatch);
        await fetchTopAuthor(dispatch);
        setIsLoading(false);
    }
    useEffect(() => {
        fetchHomeData();
        console.log("gọi data");
    }, [SliderData, TopTrendingData, NewReleaseData, TopAuThorData]);

    const nextPress = useSelector((state) => state.player.nextPress);

    useEffect(() => {
        console.log("gọi sound");
        return sound
            ? async () => {
                await sound.unloadAsync();
                console.log("sound đang");
            }
            : undefined;
    }, [sound]);


    const SliderData = useSelector((state) => state.home.slider.data);
    const TopTrendingData = useSelector((state) => state.home.topTrending.data);
    const NewReleaseData = useSelector((state) => state.home.newReLease.data);
    const TopAuThorData = useSelector((state) => state.home.topAuthor.data);

    // useLayoutEffect(() => {
    //     const isMiniPlayerVisible = navigation && navigation.getParam('isMiniPlayerVisible', false);
    //     if (isMiniPlayerVisible !== undefined) {
    //       dispatch(setIsMiniPlayer(isMiniPlayerVisible));
    //     }
    //   }, [dispatch, navigation]);
    // console.log("home");
    useEffect(() => {
        if (SliderData && SliderData.length > 0) {
            const intervalId = setInterval(() => {
                const nextIndex = (currentIndex + 1) % SliderData.length;
                flatListRef.current.scrollToIndex({ index: nextIndex });
                setCurrentIndex(nextIndex);
            }, 2000);

            return () => clearInterval(intervalId);
        }
        console.log("tự nhảy bài SliderData");

    });

    return (
        <SafeAreaView style={[GlobalStyles.customSafeArea, { backgroundColor: isDarkTheme ? darkHome.wrapper.backgroundColor : lightHome.wrapper.backgroundColor }]}>
            {/* <NavigationEvents onDidFocus={()=> this.setState({})} /> */}
            {/* {!isPlayScreen &&  */}
            <ScrollView>
                {/* ==========================================HEADER========================================== */}
                <HeaderUI />
                {/* ==========================================Slide bar========================================== */}
                <FlatList
                    ref={flatListRef}
                    horizontal
                    style={isDarkTheme ? darkHome.wrapper : lightHome.wrapper}
                    data={SliderData}
                    onScrollToIndexFailed={(info) => {
                        const wait = new Promise(resolve => setTimeout(resolve, 500));
                        wait.then(() => {
                            flatListRef.current?.scrollToIndex({
                                index: info.index,
                                animated: true,
                            });
                        });
                    }}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity
                                onPress={async () => {
                                    if (item.index != currentSound) {
                                        // await sound.unloadAsync();
                                        dispatch(setSound(null));
                                        dispatch(setPosition(0));
                                        dispatch(setDuration(0));
                                        // dispatch(setIsPlaying(true));
                                        dispatch(setIsMiniPlayer(false));
                                        console.log("home");
                                    }
                                    await getPost(item._id, dispatch, access_token, navigation.navigate);
                                    // if (isMiniPlayer) {
                                    //     setDetailPost(null);
                                    // }
                                    dispatch(setDataSound(SliderData));
                                    dispatch(setCurrentSound(item.index));
                                    // dispatch(setIsPlayScreen(true))
                                    // dispatch(setCurrentSound(item._id));
                                }}
                            >
                                <SlideItem item={item} />
                            </TouchableOpacity>
                        );
                    }}
                    showsHorizontalScrollIndicator={false}
                    scrollEventThrottle={16}
                    pagingEnabled
                />

                <TouchableOpacity style={lightHome.coverAll}>
                    <Text style={isDarkTheme ? darkHome.title : lightHome.title}>{currentLanguage === "vi" ? "Bảng xếp hạng" : "Charts"}</Text>
                    {/* <Text style={isDarkTheme ? darkHome.title : lightHome.title}>Bảng xếp hạng</Text> */}
                    <Icon
                        name='chevron-right'
                        style={{ opacity: 1, marginLeft: 8 }}
                        size={16} color={isDarkTheme ? darkHome.wrapper.color : lightHome.wrapper.color}
                    />
                </TouchableOpacity>
                {/* ==========================================BẢNG XẾP HẠNG==========================================*/}
                <View>
                    <ScrollView
                        style={lightTrendingHome.wrapper}
                        horizontal={true}
                        pagingEnabled={true}
                        showsHorizontalScrollIndicator={false}
                    // ref={scrollViewRef}
                    // onScroll={handleScroll}
                    >
                        <View style={isDarkTheme ? darkTrendingHome.contentWrapper : lightTrendingHome.contentWrapper}>
                            <View style={lightTrendingHome.contentSection}>
                                {TopTrendingData.slice(0, 3).map((item, index) => {
                                    return (
                                        <TouchableOpacity
                                            onPress={async () => {
                                                if (item.index != currentSound) {
                                                    // await sound.unloadAsync();
                                                    dispatch(setSound(null));
                                                    dispatch(setPosition(0));
                                                    dispatch(setDuration(0));
                                                    dispatch(setIsMiniPlayer(false));
                                                }
                                                await getPost(item._id, dispatch, access_token, navigation.navigate);
                                                // if (isMiniPlayer) {
                                                //     setDetailPost(null);
                                                // }
                                                dispatch(setDataSound(TopTrendingData));
                                                dispatch(setCurrentSound(item.index));
                                                // dispatch(setIsPlayScreen(true))
                                                // dispatch(setCurrentSound(item._id));
                                            }}
                                            key={index}
                                        >
                                            <TopTrendingItem
                                                avtUrl={item.image}
                                                title={item.title}
                                                author={item.owner.fullName}
                                                ranking={index + 1}
                                            />
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>
                        </View>
                        <View style={[isDarkTheme ? darkTrendingHome.contentWrapper : lightTrendingHome.contentWrapper]}>
                            <View style={lightTrendingHome.contentSection}>
                                {TopTrendingData.slice(3, 6).map((item, index) => {
                                    return (
                                        <TouchableOpacity
                                            onPress={async () => {
                                                if (item.index != currentSound) {
                                                    // await sound.unloadAsync();
                                                    dispatch(setSound(null));
                                                    dispatch(setPosition(0));
                                                    dispatch(setDuration(0));
                                                    dispatch(setIsMiniPlayer(false));
                                                }
                                                await getPost(item._id, dispatch, access_token, navigation.navigate);
                                                // if (isMiniPlayer) {
                                                //     setDetailPost(null);
                                                // }
                                                dispatch(setDataSound(TopTrendingData));
                                                dispatch(setCurrentSound(item.index));
                                                // dispatch(setIsPlayScreen(true))
                                                // dispatch(setCurrentSound(item._id));
                                            }}
                                            key={index}
                                        >
                                            <TopTrendingItem
                                                avtUrl={item.image}
                                                title={item.title}
                                                author={item.owner.fullName}
                                                ranking={index + 4}
                                            />
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>
                        </View>
                        <View style={[isDarkTheme ? darkTrendingHome.contentWrapper : lightTrendingHome.contentWrapper]}>
                            <View style={lightTrendingHome.contentSection}>
                                {TopTrendingData.slice(6, 10).map((item, index) => {
                                    return (
                                        <TouchableOpacity
                                            onPress={async () => {
                                                if (item.index != currentSound) {
                                                    // await sound.unloadAsync();
                                                    dispatch(setSound(null));
                                                    dispatch(setPosition(0));
                                                    dispatch(setDuration(0));
                                                    dispatch(setIsMiniPlayer(false));
                                                }
                                                await getPost(item._id, dispatch, access_token, navigation.navigate);
                                                // if (isMiniPlayer) {
                                                //     setDetailPost(null);
                                                // }
                                                dispatch(setDataSound(TopTrendingData));
                                                dispatch(setCurrentSound(item.index));
                                                // dispatch(setIsPlayScreen(true))
                                                // dispatch(setCurrentSound(item._id));
                                            }}
                                            key={index}
                                        >
                                            <TopTrendingItem
                                                avtUrl={item.image}
                                                title={item.title}
                                                author={item.owner.fullName}
                                                ranking={index + 7}
                                            />
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>
                        </View>
                    </ScrollView>
                </View>

                {/* ==========================================Mới phát hành========================================== */}
                <TouchableOpacity style={lightHome.coverAll}>
                    <Text style={[isDarkTheme ? darkHome.title : lightHome.title, lightHome.blank]}>{currentLanguage === "vi" ? "Mới phát hành" : "New releases"}</Text>
                    <Icon
                        name='chevron-right'
                        style={{ opacity: 1, marginLeft: 8, marginTop: 13 }}
                        size={16} color={isDarkTheme ? darkHome.wrapper.color : lightHome.wrapper.color}
                    />
                </TouchableOpacity>
                <ScrollView
                    style={{ marginLeft: 16 }}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                >
                    {NewReleaseData.map((item, index) => {
                        return (
                            <TouchableOpacity
                                onPress={async () => {
                                    if (item.index != currentSound) {
                                        // await sound.unloadAsync();
                                        dispatch(setSound(null));
                                        dispatch(setPosition(0));
                                        dispatch(setDuration(0));
                                        dispatch(setIsMiniPlayer(false));
                                    }
                                    await getPost(item._id, dispatch, access_token, navigation.navigate);
                                    // if (isMiniPlayer) {
                                    //     setDetailPost(null);
                                    // }
                                    dispatch(setDataSound(NewReleaseData));
                                    dispatch(setCurrentSound(item.index));
                                    // dispatch(setIsPlayScreen(true))
                                    // dispatch(setCurrentSound(item._id));
                                }}
                                key={index}
                            >
                                <ReleasedPodcast
                                    image={item.image}
                                    title={item.title}
                                    fullName={item.owner.fullName} />
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>
                {/* ==========================================Tác giả nổi bật==========================================*/}
                <TouchableOpacity style={[lightHome.coverAll, { marginTop: 16 }]}>
                    <Text style={isDarkTheme ? darkHome.title : lightHome.title}>{currentLanguage === "vi" ? "Tác giả nổi bật" : "Featured author"}</Text>
                    <Icon
                        name='chevron-right'
                        style={{ opacity: 1, marginLeft: 8 }}
                        size={16} color={isDarkTheme ? darkHome.wrapper.color : lightHome.wrapper.color}
                    />
                </TouchableOpacity>
                <ScrollView
                    style={{ marginLeft: 16 }}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                >
                    {TopAuThorData.map((item, index) => {
                        return (
                            <TouchableOpacity
                                onPress={() => {
                                    getOtherUser(item._id, dispatch, navigation.navigate, currentUser)
                                }}
                                key={index}
                            >
                                <TopAuthorItem item={item} />
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>
            </ScrollView>
            {/* } */}
            {/* {isPlayScreen && <PlayerScreen />} */}
            {isMiniPlayer && <MiniPlayer />}
            {isLoading && <Loading />}
        </SafeAreaView>
    );
}