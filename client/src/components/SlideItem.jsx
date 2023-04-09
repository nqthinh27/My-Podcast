import React from 'react'
import { View, StyleSheet, Text, Image, Dimensions } from 'react-native'

import {device} from '../constants/device'

export default function SlideItem({ item }) {
    return (
        <View style={styles.cardView}>
            <Image style={styles.image} source={{ uri: item.avtUrl }} />
            <View style={styles.textView}>
                <Text style={styles.itemTitle} numberOfLines={1}> {item.title}</Text>
                <Text style={styles.itemDescription} numberOfLines={2}>{item.description}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cardView: {
        flex: 1,
        width: device.width - 32,
        height: device.height / 5,
        // backgroundColor: 'white',
        margin: 16,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0.5, height: 0.5 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        elevation: 5,
    },

    textView: {
        position: 'absolute',
        bottom: 10,
        margin: 10,
        left: 5,
    },
    image: {
        width: device.width - 32,
        height: device.height / 5,
        borderRadius: 10
    },
    itemTitle: {
        color: 'white',
        fontSize: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0.8, height: 0.8 },
        shadowOpacity: 1,
        shadowRadius: 3,
        // marginBottom: 3,
        fontWeight: "bold",
        elevation: 5,
        marginLeft: -5
    },
    itemDescription: {
        color: 'white',
        fontSize: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0.8, height: 0.8 },
        shadowOpacity: 1,
        shadowRadius: 3,
        elevation: 5
    }
})
