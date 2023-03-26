import React from 'react'
import { View, StyleSheet, Text, Image, Dimensions } from 'react-native'
import { useSelector } from "react-redux"
// import Icon from 'react-native-vector-icons/Feather'
import lightReleasedPodcast from "../constants/darkLight/themeItemMainHome"
import darkReleasedPodcast from "../constants/darkLight/themeItemMainHome"

export default function ReleasedPodcast({ item }) {
    const isDarkTheme = useSelector((state) => state.theme.isDarkTheme);

    return (
        <View style={lightReleasedPodcast.lightReleasedPodcast.wrapper}>
            <View style={lightReleasedPodcast.lightReleasedPodcast.boxShadow}><Image source={{ uri: item.avtUrl }} style={lightReleasedPodcast.lightReleasedPodcast.avatar} /></View>
            <View style={lightReleasedPodcast.lightReleasedPodcast.textSection}>
                <Text style={isDarkTheme ? darkReleasedPodcast.darkReleasedPodcast.title : lightReleasedPodcast.lightReleasedPodcast.title} numberOfLines={2}>{item.title}</Text>
                <Text style={isDarkTheme ? darkReleasedPodcast.darkReleasedPodcast.author : lightReleasedPodcast.lightReleasedPodcast.author} numberOfLines={2}>{item.author}</Text>
            </View>
            {/* <Icon style={styles.more_btn} name="more-horizontal" size={26} color="#000" /> */}
        </View>
    )
}
