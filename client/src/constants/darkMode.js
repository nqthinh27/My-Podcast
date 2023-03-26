import React from 'react'
import { StyleSheet } from 'react-native'
import colors from './colors'

const darkSetting = StyleSheet.create({
    setting: {
        color: "#fff",
        left: 16,
        fontSize: 25,
        fontWeight: "bold",
        top: 10
    },
    dark:{
        backgroundColor: colors.dark,
        color: "#fff"
    },
    title: {
        top: 10,
        height: 30,
        marginTop: 10,
        
    },

    setIco: {
        flexDirection: 'row',
        paddingVertical: 10,
        alignContent: 'center',
        marginVertical: 3,
        marginHorizontal: 16,
        borderRadius: 7,
        backgroundColor: 'rgba(255, 255, 255, 0.4)'
    },

    fontBlur: {
        color: "#fff",
        paddingStart: 16,
        fontSize: 17,
        fontWeight: "bold",
    },

    fontText: {
        color: '#fff',
        fontSize: 16,
        paddingStart: 15,
    }
})

export default darkSetting