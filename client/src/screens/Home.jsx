import React, { useEffect, useState } from "react";
import {
    SafeAreaView,
    Text,
    View,
    Image,
    TouchableOpacity,
    ImageBackground,
    FlatList,
    StyleSheet,
    ScrollView,
    Alert,
    TextInput,
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
import lightHome from "../constants/darkLight/themeHome"
import darkHome from "../constants/darkLight/themeHome"
import lightTrendingHome from "../constants/darkLight/themeHome"
import darkTrendingHome from "../constants/darkLight/themeHome"
// import PlayerScreen from "./PlayerScreen";

export default function Home(props) {
    //navigation
    const { navigation, route } = props;
    //function of navigate
    const { navigate, goback } = navigation;
    // variable.isLogin = 2

    // const [clickSong, setClickSong] = useState(false);
    // const [showSong, setShowSong] = useState([]);
    // const [sowSongs, setSpwSongs] = useState([]);
    // // const textInputRef = useRef(null);

    // // useEffect(() => {

    // // },[])
    // function handleClickSong() {
    //     setClickSong(true);
    // }

    // function handleSong() {

    // }

    const isDarkTheme = useSelector((state) => state.theme.isDarkTheme);

    function playerNavigate() {
        navigate('PlayerScreen');
        variable.isPlaying = 1;
    }

    return (
        <SafeAreaView style={[
            { backgroundColor: isDarkTheme ? darkHome.darkHome.wrapper.backgroundColor : lightHome.lightHome.wrapper.backgroundColor },
            GlobalStyles.customSafeArea]}
        >
            {/* <NavigationEvents onDidFocus={()=> this.setState({})} /> */}
            <ScrollView>
                {/* ==========================================HEADER========================================== */}
                <HeaderUI />

                {/* ==========================================Slide bar========================================== */}
                <FlatList
                    horizontal={true}
                    style={isDarkTheme ? darkHome.darkHome.wrapper : lightHome.lightHome.wrapper}
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

                <TouchableOpacity style={lightHome.lightHome.coverAll}>
                    <Text style={isDarkTheme ? darkHome.darkHome.title : lightHome.lightHome.title}>Bảng xếp hạng</Text>
                    {/* <Text style={isDarkTheme ? darkHome.darkHome.title : lightHome.lightHome.title}>Bảng xếp hạng</Text> */}
                    <Icon
                        name='chevron-right'
                        style={{ opacity: 1, marginLeft: 8 }}
                        size={16} color={isDarkTheme ? darkHome.darkHome.wrapper.color : lightHome.lightHome.wrapper.color}
                    />
                </TouchableOpacity>
                {/* ==========================================BẢNG XẾP HẠNG==========================================*/}
                <View style={lightTrendingHome.lightTrendingHome.wrapper}>
                    <ScrollView
                    // horizontal={true}
                    // showsHorizontalScrollIndicator={false}
                    >
                        <View style={isDarkTheme ? darkTrendingHome.darkTrendingHome.contentWrapper : lightTrendingHome.lightTrendingHome.contentWrapper}>
                            <View style={lightTrendingHome.lightTrendingHome.contentSection}>
                                {TopTrendingData.slice(0, 5).map((item) => {
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
                <TouchableOpacity style={lightHome.lightHome.coverAll}>
                    <Text style={[isDarkTheme ? darkHome.darkHome.title : lightHome.lightHome.title, lightHome.lightHome.blank]}>Mới phát hành</Text>
                    <Icon
                        name='chevron-right'
                        style={{ opacity: 1, marginLeft: 8, marginTop: 16 }}
                        size={16} color={isDarkTheme ? darkHome.darkHome.wrapper.color : lightHome.lightHome.wrapper.color}
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
                <TouchableOpacity style={lightHome.lightHome.coverAll}>
                    <Text style={isDarkTheme ? darkHome.darkHome.title : lightHome.lightHome.title}>Thư giãn cuối ngày</Text>
                    <Icon
                        name='chevron-right'
                        style={{ opacity: 1, marginLeft: 8 }}
                        size={16} color={isDarkTheme ? darkHome.darkHome.wrapper.color : lightHome.lightHome.wrapper.color}
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
                <TouchableOpacity style={lightHome.lightHome.coverAll}>
                    <Text style={isDarkTheme ? darkHome.darkHome.title : lightHome.lightHome.title}>Album thịnh hành</Text>
                    <Icon
                        name='chevron-right'
                        style={{ opacity: 1, marginLeft: 8 }}
                        size={16} color={isDarkTheme ? darkHome.darkHome.wrapper.color : lightHome.lightHome.wrapper.color}
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
                <TouchableOpacity style={lightHome.lightHome.coverAll}>
                    <Text style={isDarkTheme ? darkHome.darkHome.title : lightHome.lightHome.title}>Cuộc sống hằng ngày</Text>
                    <Icon
                        name='chevron-right'
                        style={{ opacity: 1, marginLeft: 8 }}
                        size={16} color={isDarkTheme ? darkHome.darkHome.wrapper.color : lightHome.lightHome.wrapper.color}
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