import React from 'react'
import { View, StyleSheet, Text, Image, Dimensions } from 'react-native'
import { device } from '../constants/device'
import { useSelector } from "react-redux";
import { lightProfile, darkProfile } from '../constants/darkLight/themeProfile';

export default function ProfilePodcast(props) {
    const isDarkTheme = useSelector((state) => state.theme.isDarkTheme);
    const currentLanguage = useSelector(
        (state) => state.language.currentLanguage
    );
    return (
        <View style={styles.wrapper}>
            <View style={styles.boxShadow}><Image source={{ uri: props.image }} style={styles.avatar} /></View>
            <View style={styles.textSection}>
                <Text style={[styles.title, isDarkTheme ? darkProfile.profileText : lightProfile.profileText]} numberOfLines={2}>{props.title}</Text>
                <Text style={[styles.author, isDarkTheme ? darkProfile.textsub : lightProfile.textsub]} numberOfLines={2}>{props.des}</Text>
            </View>
            {/* <Icon style={styles.more_btn} name="more-horizontal" size={26} color="#000" /> */}
        </View>
    )
}

const withItem = (device.width - 16 * 4 -1) / 3
const styles = StyleSheet.create({
    wrapper: {
        // marginRight:16,
        // width: 108
        width: withItem,
        marginBottom: 16
    },
    avatar: {
        width: withItem,
        height: withItem,
        borderRadius: 10,
    },
    textSection: {
        width: withItem
    },
    title: {
        fontSize: 16,
        fontWeight: "600",
        paddingTop: 3
    },
    author: {
        color: "#414141",
    },
    boxShadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0.5, height: 0.5 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    }
})