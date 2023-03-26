import { StyleSheet } from 'react-native'
import colors from '../colors';

const lightHome = StyleSheet.create({
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

const darkHome = StyleSheet.create({
    wrapper: {
        backgroundColor: colors.dark,
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

const lightTrendingHome = StyleSheet.create({
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

const darkTrendingHome = StyleSheet.create({
    contentWrapper: {
        width: 'auto',
        marginRight: 16,
        borderRadius: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        // flexDirection: 'row',
        // flexWrap: 'wrap',
    },
});



export default {darkHome, lightHome, lightTrendingHome, darkTrendingHome}