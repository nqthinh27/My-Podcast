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

import { PlaylistData, RecommendData, RelexData, dummyData } from "../../dummyData";
import { lightHome, darkHome, lightTrendingHome, darkTrendingHome } from "../constants/darkLight/themeHome"
import MiniPlayer from "./Player/MiniPlayer";
import { setSoundUrl, setPlayValue, setIsMiniPlayer } from "../redux/slices/playerSlice";
import { useNavigation } from "@react-navigation/native";
import { fetchNewRelease, fetchSlider, fetchTopAuthor, fetchTopTrending } from "../redux/actions/homeApi";
import TopAuthorItem from "../components/TopAuThorItem";
import { getOtherUser } from "../redux/actions/profileApi";

// import PlayerScreen from "./PlayerScreen";

export default function Home(props) {
    // //navigation
    // const { navigation, route } = props;
    // //function of navigate
    // const { navigate, goback } = navigation;

    const navigation = useNavigation();

    const dispatch = useDispatch();
    const isDarkTheme = useSelector((state) => state.theme.isDarkTheme);
    const isMiniPlayer = useSelector((state) => state.player.isMiniPlayer);
    const playValue = useSelector((state) => state.player.playValue);
    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef(null);
    const scrollViewRef = useRef(null);
    const screenWidth = Math.min(325);

    useEffect(() => {
        const intervalId = setInterval(() => {
            const nextIndex = (currentIndex + 1) % dummyData.length;
            flatListRef.current.scrollToIndex({ index: nextIndex });
            setCurrentIndex(nextIndex);
        }, 3000);

        return () => clearInterval(intervalId);
    }, [currentIndex]);

    const handleScroll = (event) => {
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        if (contentOffsetX % screenWidth === 0) {
            const pageIndex = contentOffsetX / screenWidth;
            // Chuyển sang trang kế tiếp
            scrollViewRef.current.scrollTo({ x: (pageIndex + 1) * screenWidth, animated: true });
        }
        console.log('ductu');
    }
    const soundUrl1 = 'https://firebasestorage.googleapis.com/v0/b/mypodcast-88135.appspot.com/o/Sound%2FLoi-Nho.mp3?alt=media&token=b522c960-115d-49ba-8d6d-5f1f2dbb9d77';
    function playerNavigate() {
        //if (!isMiniPlayer) {
        navigation.navigate('PlayerScreen');
        // dispatch(setSoundUrl(soundUrl1));
        dispatch(setPlayValue(true))

    }

    useEffect(() => {
        dispatch(fetchSlider);
        dispatch(fetchTopTrending);
        dispatch(fetchNewRelease);
        dispatch(fetchTopAuthor);
    }, []);

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

    return (
        <SafeAreaView style={[
            { backgroundColor: isDarkTheme ? darkHome.wrapper.backgroundColor : lightHome.wrapper.backgroundColor },
            GlobalStyles.customSafeArea]}
        >
            {/* <NavigationEvents onDidFocus={()=> this.setState({})} /> */}
            <ScrollView>
                {/* ==========================================HEADER========================================== */}
                <HeaderUI />

                {/* ==========================================Slide bar========================================== */}
                <FlatList
                    ref={flatListRef}
                    horizontal
                    style={isDarkTheme ? darkHome.wrapper : lightHome.wrapper}
                    data={SliderData}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate('PlayerScreen');
                                    // dispatch(setSoundUrl(item.));
                                    dispatch(setPlayValue(true))
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
                    <Text style={isDarkTheme ? darkHome.title : lightHome.title}>Bảng xếp hạng</Text>
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
                                            onPress={() => {
                                                playerNavigate();
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
                                            onPress={() => {
                                                playerNavigate();
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
                                            onPress={() => {
                                                playerNavigate();
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
                    <Text style={[isDarkTheme ? darkHome.title : lightHome.title, lightHome.blank]}>Mới phát hành</Text>
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
                                onPress={() => {
                                    playerNavigate();
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
                <TouchableOpacity style={lightHome.coverAll}>
                    <Text style={isDarkTheme ? darkHome.title : lightHome.title}>Tác giả nổi bật</Text>
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
                                    getOtherUser(item._id, dispatch, navigation.navigate)
                                }}
                                key={index}
                            >
                                <TopAuthorItem item={item} />
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>
                {/* ========================================Album thịnh hành============================================*/}
                <TouchableOpacity style={lightHome.coverAll}>
                    <Text style={isDarkTheme ? darkHome.title : lightHome.title}>Album thịnh hành</Text>
                    <Icon
                        name='chevron-right'
                        style={{ opacity: 1, marginLeft: 8 }}
                        size={16} color={isDarkTheme ? darkHome.wrapper.color : lightHome.wrapper.color}
                    />
                </TouchableOpacity>
                <ScrollView
                    style={{ marginLeft: 16, marginBottom: 16 }}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                >
                    {PlaylistData.map((item, index) => {
                        return (
                            <TouchableOpacity
                                onPress={() => {
                                    playerNavigate();
                                }}
                                key={index}
                            >
                                <ReleasedPodcast item={item} />
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>
                {/* ==========================================Cuộc sống hằng ngày==========================================*/}
                <TouchableOpacity style={lightHome.coverAll}>
                    <Text style={isDarkTheme ? darkHome.title : lightHome.title}>Cuộc sống hằng ngày</Text>
                    <Icon
                        name='chevron-right'
                        style={{ opacity: 1, marginLeft: 8 }}
                        size={16} color={isDarkTheme ? darkHome.wrapper.color : lightHome.wrapper.color}
                    />
                </TouchableOpacity>
                <ScrollView
                    style={{ marginLeft: 16, marginBottom: 16 }}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                >
                    {RecommendData.map((item, index) => {
                        return (
                            <TouchableOpacity
                                onPress={() => {
                                    playerNavigate();
                                }}
                                key={index}
                            >
                                <ReleasedPodcast item={item} />
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>
            </ScrollView>
            {isMiniPlayer && <MiniPlayer
                avtUrl="https://firebasestorage.googleapis.com/v0/b/mypodcast-88135.appspot.com/o/Tu%2FRectangle%2038.png?alt=media&token=780197d0-e51a-496c-8ff1-006b24341c50"
                tittle="Tuổi trẻ, tinh yêu và sự nghiệp"
                author="Tun Phạm"
            />}
        </SafeAreaView>
    );
}

const trendingStyles = StyleSheet.create({
    wrapper: {
        // margin: 11,
        marginLeft: 16,
        flex: 1,
        // height: 225,
        // alignItems: 'center'
    },
    contentWrapper: {
        width: 'auto',
        marginRight: 16,
        borderRadius: 10,
        backgroundColor: "#EDEDED",
        // flexDirection: 'row',
        // flexWrap: 'wrap',
    },
    contentSection: {
        marginVertical: 6,
        marginHorizontal: 12
    },
});