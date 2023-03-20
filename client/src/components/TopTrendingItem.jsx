import React from 'react'
import { View, StyleSheet, Text, Image, Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'

export default function TopTrendingItem(props) {
    return (
        <View style={styles.wrapper}>
            <Image source={{ uri: props.avtUrl }} style={styles.avatar} />
            <View style={styles.textSection}>
                <View style={styles.ranking}>
                    <Text style={styles.number}>{props.ranking}</Text>
                    <View style={styles.dot}></View>
                </View>
                <View style={styles.content}>
                    <Text style={styles.title} numberOfLines={1}>{props.title}</Text>
                    <Text style={styles.author} numberOfLines={1}>{props.author}</Text>
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
        alignItems: 'center'
    },
    wrapperContent: {
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
    content: {

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
    more_btn: {

    }
})