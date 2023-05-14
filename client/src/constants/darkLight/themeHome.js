import { StyleSheet } from 'react-native'
import colors from '../colors';
import {device} from '../device'

export const lightHome = StyleSheet.create({
    wrapper: {
        backgroundColor: colors.white,
        color: colors.dark
    },
    coverAll: {
        flexDirection: 'row',
        alignItems: 'center',

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
});

export const darkHome = StyleSheet.create({
    wrapper: {
        backgroundColor: colors.dark_backgr,
        color: "#fff"
    },
    title: {
        fontSize: 21,
        fontWeight: "bold",
        marginLeft: 16,
        marginBottom: 6,
        color: '#fff'
    },
});

export const lightTrendingHome = StyleSheet.create({
    wrapper: {
        // margin: 11,
        marginLeft: 16,
        flexDirection: "row",
        // height: 225,
        // alignItems: 'center'
    },
    contentWrapper: {
        width: device.width-32,
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

export const darkTrendingHome = StyleSheet.create({
    contentWrapper: {
        width: device.width-32,
        marginRight: 16,
        borderRadius: 10,
        backgroundColor: colors.dark_grey,
        // flexDirection: 'row',
        // flexWrap: 'wrap',
    },
});

