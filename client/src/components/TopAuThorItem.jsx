import React from 'react'
import { View, StyleSheet, Text, Image, Dimensions } from 'react-native'
import { useSelector } from "react-redux"
// import Icon from 'react-native-vector-icons/Feather'
import {lightReleasedPodcast, darkReleasedPodcast} from "../constants/darkLight/themeItemMainHome"

export default function TopAuthorItem({ item }) {
    const isDarkTheme = useSelector((state) => state.theme.isDarkTheme);

    return (
        <View style={lightReleasedPodcast.wrapper}>
            <View style={lightReleasedPodcast.boxShadow}><Image source={{ uri: item.avatar }} style={lightReleasedPodcast.avatar} /></View>
            <View style={lightReleasedPodcast.textSection}>
                <Text style={isDarkTheme ? darkReleasedPodcast.title : lightReleasedPodcast.title} numberOfLines={2}>{item.fullName}</Text>
                <Text style={isDarkTheme ? darkReleasedPodcast.author : lightReleasedPodcast.author} numberOfLines={2}>@{item.userName}</Text>
            </View>
            {/* <Icon style={styles.more_btn} name="more-horizontal" size={26} color="#000" /> */}
        </View>
    )
}
