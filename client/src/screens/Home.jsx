import React, { useEffect, useRef, useState } from "react";
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
import { useSelector } from "react-redux";

import { HeaderUI } from "../components";
import ReleasedPodcast from "../components/ReleasedPodcast"
import SlideItem from "../components/SlideItem";
import variable from "../constants/variable";
import GlobalStyles from "../components/GlobalStyles";
import TopTrendingItem from "../components/TopTrendingItem";

import { TopTrendingData, PlaylistData, RecommendData, RelexData, NewReLeaseData, dummyData } from "../../dummyData";
import { lightHome, darkHome, lightTrendingHome, darkTrendingHome } from "../constants/darkLight/themeHome"

// import PlayerScreen from "./PlayerScreen";

export default function Home(props) {
    //navigation
    const { navigation, route } = props;
    //function of navigate
    const { navigate, goback } = navigation;
    // variable.isLogin = 2

    const isDarkTheme = useSelector((state) => state.theme.isDarkTheme);
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

    function playerNavigate() {
        navigate('PlayerScreen');
    }

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
                    data={dummyData}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity
                                onPress={() => {
                                    playerNavigate();
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
                                {TopTrendingData.slice(0, 3).map((item) => {
                                    return (
                                        <TouchableOpacity
                                            onPress={() => {
                                                playerNavigate();
                                            }}
                                            key={item.id}
                                        >
                                            <TopTrendingItem
                                                avtUrl={item.avtUrl}
                                                title={item.title}
                                                author={item.author}
                                                ranking={item.ranking}
                                            />
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>
                        </View>
                        <View style={[isDarkTheme ? darkTrendingHome.contentWrapper : lightTrendingHome.contentWrapper, {width: screenWidth}]}>
                            <View style={lightTrendingHome.contentSection}>
                                {TopTrendingData.slice(3, 6).map((item) => {
                                    return (
                                        <TouchableOpacity
                                            onPress={() => {
                                                playerNavigate();
                                            }}
                                            key={item.id}
                                        >
                                            <TopTrendingItem
                                                avtUrl={item.avtUrl}
                                                title={item.title}
                                                author={item.author}
                                                ranking={item.ranking}
                                            />
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>
                        </View>
                        <View style={[isDarkTheme ? darkTrendingHome.contentWrapper : lightTrendingHome.contentWrapper, {width: screenWidth}]}>
                            <View style={lightTrendingHome.contentSection}>
                                {TopTrendingData.slice(6, 10).map((item) => {
                                    return (
                                        <TouchableOpacity
                                            onPress={() => {
                                                playerNavigate();
                                            }}
                                            key={item.id}
                                        >
                                            <TopTrendingItem
                                                avtUrl={item.avtUrl}
                                                title={item.title}
                                                author={item.author}
                                                ranking={item.ranking}
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
                        style={{ opacity: 1, marginLeft: 8, marginTop: 16 }}
                        size={16} color={isDarkTheme ? darkHome.wrapper.color : lightHome.wrapper.color}
                    />
                </TouchableOpacity>
                <ScrollView
                    style={{ marginLeft: 16 }}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                >
                    {NewReLeaseData.map((item, index) => {
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
                {/* ==========================================Thư giãn cuối ngày==========================================*/}
                <TouchableOpacity style={lightHome.coverAll}>
                    <Text style={isDarkTheme ? darkHome.title : lightHome.title}>Thư giãn cuối ngày</Text>
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
                    {RelexData.map((item, index) => {
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