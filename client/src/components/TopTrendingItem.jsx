import React from 'react'
import { View, StyleSheet, Text, Image, Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import { useSelector } from 'react-redux'
import lightTopTrendingItem from '../constants/darkLight/themeItemMainHome'
import darkTopTrendingItem from '../constants/darkLight/themeItemMainHome'


export default function TopTrendingItem(props) {
    const isDarkTheme = useSelector((state) => state.theme.isDarkTheme);

    return (
        <View style={lightTopTrendingItem.lightTopTrendingItem.wrapper}>
            <Image source={{ uri: props.avtUrl }} style={lightTopTrendingItem.lightTopTrendingItem.avatar} />
            <View style={lightTopTrendingItem.lightTopTrendingItem.textSection}>
                <View style={lightTopTrendingItem.lightTopTrendingItem.ranking}>
                    <Text style={isDarkTheme ? darkTopTrendingItem.darkTopTrendingItem.number : lightTopTrendingItem.lightTopTrendingItem.number}>{props.ranking}</Text>
                    <View style={isDarkTheme ? darkTopTrendingItem.darkTopTrendingItem.dot : lightTopTrendingItem.lightTopTrendingItem.dot}></View>
                </View>
                <View style={lightTopTrendingItem.lightTopTrendingItem.content}>
                    <Text style={isDarkTheme ? darkTopTrendingItem.darkTopTrendingItem.title : lightTopTrendingItem.lightTopTrendingItem.title} numberOfLines={1}>{props.title}</Text>
                    <Text style={isDarkTheme ? darkTopTrendingItem.darkTopTrendingItem.author : lightTopTrendingItem.lightTopTrendingItem.author} numberOfLines={1}>{props.author}</Text>
                </View>
            </View>
            {/* <Icon style={styles.more_btn} name="more-horizontal" size={26} color="#000" /> */}
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        // backgroundColor: '#EDEDED',
        width: 325,
        // borderRadius: 10,
        // margin: 11,
        marginVertical: 6,
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 58,
        height: 58,
        borderRadius: 8
    },
    textSection: {
        flexDirection: 'row'
    },
    ranking: {
        marginLeft: 17,
        marginRight: 10
    },
    number: {
        fontSize: 17,
        fontWeight: "600"
    },
    dot: {
        width: 7,
        height: 7,
        backgroundColor: "#000",
        borderRadius: 7,
        marginTop: 7
    },
    title: {
        fontSize: 17,
        fontWeight: "600",
        width: 200
    },
    author: {
        color: "#414141",
        paddingVertical: 2,
        width: 200
    },
})