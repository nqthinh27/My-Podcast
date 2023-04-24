import { StyleSheet } from 'react-native'
import colors from '../colors';

export const lightTopTrendingItem = StyleSheet.create({
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
        backgroundColor: colors.black,
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
});

export const darkTopTrendingItem = StyleSheet.create({
    wrapper: {
        // backgroundColor: '#EDEDED',
        width: 325,
        // borderRadius: 10,
        // margin: 11,
        marginVertical: 6,
        flexDirection: 'row',
        alignItems: 'center',
    },
    textSection: {
        flexDirection: 'row'
    },
    ranking: {
        marginLeft: 17,
        marginRight: 10,
        
    },
    number: {
        fontSize: 17,
        fontWeight: "600",
        color: colors.white
    },
    dot: {
        width: 7,
        height: 7,
        backgroundColor: colors.white,
        borderRadius: 7,
        marginTop: 7
    },
    title: {
        fontSize: 17,
        fontWeight: "600",
        width: 200,
        color: colors.white
    },
    author: {
        color: colors.white,
        paddingVertical: 2,
        width: 200
    },
});

export const lightReleasedPodcast = StyleSheet.create({
    wrapper: {
        marginRight:10
    },
    avatar: {
        width: 96,
        height: 96,
        borderRadius: 8,
    },
    textSection: {
        width: 96
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
        shadowOffset: { width: 0.5, height: 0.5 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        // backgroundColor: '#000'
    }
})

export const darkReleasedPodcast = StyleSheet.create({
    title: {
        fontSize: 16,
        fontWeight: "600",
        paddingTop: 3,
        color: "#fff"
    },
    author: {
        color: "#fff",
    },
    boxShadow: {
        shadowOffset: { width: 0.5, height: 0.5 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    }
})
