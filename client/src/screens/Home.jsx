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

    const numColumns = 4;
    const { height } = Dimensions.get('screen');
    const itemHeight = height / numColumns;

    const renderItem = ({ item }) => (
        <View style={[styles.item, { width: itemWidth }]}>
            <Text style={styles.itemText}>{item.title}</Text>
        </View>
    );

    const renderTopTrending = TopTrendingData.map((item) => (
        <TouchableOpacity
            key={item.id}
            onPress={() => {
                playerNavigate();
            }}
        >
            <TopTrendingItem
                avtUrl={item.avtUrl}
                title={item.title}
                author={item.author}
                ranking={item.ranking}
            />
        </TouchableOpacity>

    ));


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

                <TouchableOpacity style={styles.titleOverall}>
                    <Text style={styles.title}>Bảng xếp hạng</Text>
                    <Icon
                        name='chevron-right'
                        style={{ opacity: 1, marginLeft: 8 }}
                        size={16} color={'black'}
                    />
                </TouchableOpacity>
                {/* ==========================================BẢNG XẾP HẠNG==========================================*/}
                <View  style={trendingStyles.wrapper}>
                    <ScrollView
                        // horizontal={true}
                        // showsHorizontalScrollIndicator={false}
                    >
                        <View style={trendingStyles.contentWrapper}>
                            <View style={trendingStyles.contentSection}>
                                {TopTrendingData.slice(0,5).map((item) => {
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
                <TouchableOpacity style={styles.titleOverall}>
                    <Text style={[styles.title, styles.blank]}>Mới phát hành</Text>
                    <Icon
                        name='chevron-right'
                        style={{ opacity: 1, marginLeft: 8, marginTop: 16 }}
                        size={16} color={'black'}
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
                <TouchableOpacity style={styles.titleOverall}>
                    <Text style={styles.title}>Thư giãn cuối ngày</Text>
                    <Icon
                        name='chevron-right'
                        style={{ opacity: 1, marginLeft: 8 }}
                        size={16} color={'black'}
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
                <TouchableOpacity style={styles.titleOverall}>
                    <Text style={styles.title}>Album thịnh hành</Text>
                    <Icon
                        name='chevron-right'
                        style={{ opacity: 1, marginLeft: 8 }}
                        size={16} color={'black'}
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
                <TouchableOpacity style={styles.titleOverall}>
                    <Text style={styles.title}>Cuộc sống hằng ngày</Text>
                    <Icon
                        name='chevron-right'
                        style={{ opacity: 1, marginLeft: 8 }}
                        size={16} color={'black'}
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

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: "#fff",
    },
    SlideBar: {
        backgroundColor: "#000",
    },
    titleOverall: {
        flexDirection: 'row',
        alignItems: 'center'
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
