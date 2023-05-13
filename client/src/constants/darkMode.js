import React from 'react'
import { StyleSheet } from 'react-native'
import colors from './colors'

export const lightSetting = StyleSheet.create({
    account: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: 16,
        marginRight: 16,
        marginTop: 16,
    },
    accountSuccess: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginLeft: 16,
        marginRight: 16,
        // marginTop: 16,
    },
    loginButton: {
        // color: colors.black,
        marginRight: 10,
        borderRadius: 5,
        paddingHorizontal: 5,
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
    },
    loginText: {
        fontSize: 16,
        margin: 5
    },
    light: {
        backgroundColor: "#fff",
        color: "#212529"
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 35,
    },
    avatarSuccess: {
        width: 60,
        height: 60,
        borderRadius: 35,
    },
    title: {
        top: 10,
        height: 30,
        marginTop: 10
    },

    setIco: {
        flexDirection: 'row',
        paddingVertical: 10,
        justifyContent: 'space-between',
        alignContent: 'center',
        alignItems: 'center',
        height: 45,
        marginVertical: 3,
        marginHorizontal: 16,
        borderRadius: 7,
        backgroundColor: 'rgba(0, 0, 0, 0.05)'
    },

    fontBlur: {
        color: colors.black,
        paddingStart: 16,
        fontSize: 17,
        fontWeight: "bold",
    },

    fontText: {
        color: 'black',
        fontSize: 16,
        paddingStart: 15,
    },

    nameText: {
        color: 'black',
        fontSize: 20,
        fontWeight: '500'
    },

    usernameText: {
        color: 'black'
    }
})

export const darkSetting = StyleSheet.create({
    loginButton: {
        color: colors.black,
        marginLeft: 10,
        // borderRadius: 0,
        backgroundColor: colors.dark_grey,
        borderRadius: 5
    },
    loginText: {
        fontSize: 16,
        margin: 5,
        color: colors.white
    },
    dark: {
        backgroundColor: colors.dark_backgr,
        color: "#fff"
    },
    title: {
        // top: 10,
        // height: 30,
        marginTop: 10,

    },

    setIco: {
        flexDirection: 'row',
        paddingVertical: 10,
        justifyContent: 'space-between',
        alignContent: 'center',
        alignItems: 'center',
        marginVertical: 3,
        marginHorizontal: 16,
        borderRadius: 7,
        backgroundColor: colors.dark_grey,
        height: 45,
    },

    fontBlur: {
        color: "#fff",
        paddingStart: 16,
        fontSize: 17,
        fontWeight: "bold",
    },

    fontText: {
        color: colors.dark_sub,
        fontSize: 16,
        paddingStart: 15,
    },

    nameText: {
        color: 'white',
        fontSize: 20,
        fontWeight: '500'
    },

    usernameText: {
        color: 'white'
    }
})
