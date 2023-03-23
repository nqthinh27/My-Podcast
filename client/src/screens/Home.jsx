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
} from "react-native";
// import Icon from "react-native-vector-icons/Fontisto";
import { HeaderUI } from "../components";

import ReleasedPodcast from "../components/ReleasedPodcast"
import SlideItem from "../components/SlideItem";
import variable from "../constants/variable";
import GlobalStyles from "../components/GlobalStyles";
import TopTrendingItem from "../components/TopTrendingItem";

import { TopTrendingData, PlaylistData, RecommendData, RelexData, NewReLeaseData, dummyData } from "../../dummyData";
// import PlayerScreen from "./PlayerScreen";

export default function Home(props) {
    //navigation
    const { navigation, route } = props;
    //function of navigate
    const { navigate, goback } = navigation;
    // variable.isLogin = 2

    const [clickSong, setClickSong] = useState(false);
    const [showSong, setShowSong] = useState([]);
    const [sowSongs, setSpwSongs] = useState([]);
    // const textInputRef = useRef(null);

    // useEffect(() => {

    // },[])
    function handleClickSong() {
        setClickSong(true);
    }

    function handleSong() {

    }

    function playerNavigate() {
        navigate('PlayerScreen');
        variable.isPlaying = 1;
    }

    return (
        <SafeAreaView style={GlobalStyles.customSafeArea}>
            {/* <NavigationEvents onDidFocus={()=> this.setState({})} /> */}
            <ScrollView>
                {/* ==========================================HEADER========================================== */}
                <HeaderUI />

                {/* ==========================================Slide bar========================================== */}
                <FlatList
                    horizontal={true}
                    style={styles.wrapper}
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

                <Text style={styles.title}>Bảng xếp hạng</Text>
                {/* ==========================================BẢNG XẾP HẠNG==========================================*/}
                <ScrollView
                    style={trendingStyles.wrapper}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                >
                    <View style={trendingStyles.contentWrapper}>
                        <View style={trendingStyles.contentSection}>
                            <TouchableOpacity
                                onPress={() => {
                                    playerNavigate();
                                }}
                            >
                                <TopTrendingItem
                                    avtUrl={TopTrendingData[0].avtUrl}
                                    title={TopTrendingData[0].title}
                                    author={TopTrendingData[0].author}
                                    ranking={TopTrendingData[0].ranking}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    playerNavigate();
                                }}
                            >
                                <TopTrendingItem
                                    avtUrl={TopTrendingData[1].avtUrl}
                                    title={TopTrendingData[1].title}
                                    author={TopTrendingData[1].author}
                                    ranking={TopTrendingData[1].ranking}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    playerNavigate();
                                }}
                            >
                                <TopTrendingItem
                                    avtUrl={TopTrendingData[2].avtUrl}
                                    title={TopTrendingData[2].title}
                                    author={TopTrendingData[2].author}
                                    ranking={TopTrendingData[2].ranking}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={trendingStyles.contentWrapper}>
                        <View style={trendingStyles.contentSection}>
                            <TouchableOpacity
                                onPress={() => {
                                    playerNavigate();
                                }}
                            >
                                <TopTrendingItem
                                    avtUrl={TopTrendingData[3].avtUrl}
                                    title={TopTrendingData[3].title}
                                    author={TopTrendingData[3].author}
                                    ranking={TopTrendingData[3].ranking}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    playerNavigate();
                                }}
                            >
                                <TopTrendingItem
                                    avtUrl={TopTrendingData[4].avtUrl}
                                    title={TopTrendingData[4].title}
                                    author={TopTrendingData[4].author}
                                    ranking={TopTrendingData[4].ranking}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    playerNavigate();
                                }}
                            >
                                <TopTrendingItem
                                    avtUrl={TopTrendingData[5].avtUrl}
                                    title={TopTrendingData[5].title}
                                    author={TopTrendingData[5].author}
                                    ranking={TopTrendingData[5].ranking}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={trendingStyles.contentWrapper}>
                        <View style={trendingStyles.contentSection}>
                            <TouchableOpacity
                                onPress={() => {
                                    playerNavigate();
                                }}
                            >
                                <TopTrendingItem
                                    avtUrl={TopTrendingData[6].avtUrl}
                                    title={TopTrendingData[6].title}
                                    author={TopTrendingData[6].author}
                                    ranking={TopTrendingData[6].ranking}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    playerNavigate();
                                }}
                            >
                                <TopTrendingItem
                                    avtUrl={TopTrendingData[7].avtUrl}
                                    title={TopTrendingData[7].title}
                                    author={TopTrendingData[7].author}
                                    ranking={TopTrendingData[7].ranking}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    playerNavigate();
                                }}
                            >
                                <TopTrendingItem
                                    avtUrl={TopTrendingData[8].avtUrl}
                                    title={TopTrendingData[8].title}
                                    author={TopTrendingData[8].author}
                                    ranking={TopTrendingData[8].ranking}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
                {/* ==================================================================================== */}
                <Text style={[styles.title, styles.blank]}>Mới phát hành</Text>
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
                <Text style={[styles.title]}>Thư giãn cuối ngày</Text>
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
                <Text style={[styles.title]}>Alum thịnh hành</Text>
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
                <Text style={[styles.title]}>Cuộc sống hằng ngày</Text>
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

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: "#fff",
    },
    SlideBar: {
        backgroundColor: "#000",
    },
    title: {
        fontSize: 21,
        fontWeight: "bold",
        marginLeft: 16,
        marginBottom: 6,
    },
    blank: {
        marginTop: 16,
    },
    Header: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 16,
    },
    avatar: {
        width: 35,
        height: 35,
        borderRadius: 35,
    },
    input: {
        height: 32,
        marginRight: 12,
        backgroundColor: "#F0F0F0",
        // borderRadius: 32,
        padding: 0,
        flex: 1,
        color: "#A0A0A0",
    },
    searchSection: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F0F0F0",
        color: "#A0A0A0",
        borderRadius: 32,
        marginHorizontal: 8,
    },
    searchIcon: {
        paddingVertical: 8,
        paddingRight: 4,
        paddingLeft: 10,
    },
    bell: {
        height: 26,
        width: 26,
    },
});

const trendingStyles = StyleSheet.create({
    wrapper: {
        // margin: 11,
        marginLeft: 16,
        flexDirection: "row",
        // alignItems: 'center'
    },
    contentWrapper: {
        width: 315,
        marginRight: 16,
        borderRadius: 10,
        backgroundColor: "#EDEDED",
    },
    contentSection: {
        marginVertical: 6,
        marginHorizontal: 12,
    },
});
