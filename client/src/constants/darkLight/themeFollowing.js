import { StyleSheet } from "react-native";
import colors from "../colors";
import { device } from '../device'

export const lightfollowStyles = StyleSheet.create({
    contentWrapper: {
        marginTop: 10,
        // backgroundColor: "#EDEDED",
    },
});

export const darkfollowStyles = StyleSheet.create({
    contentWrapper: {
        marginTop: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
});

export const lightFollowingItem = StyleSheet.create({
    followingItemWrapper: {
        // backgroundColor: '#EDEDED',
        height: 630,
        // borderRadius: 10,
        // margin: 11,
        marginVertical: 6,
        display: 'flex',
        marginHorizontal: 16,
    },
    followingItemIntroduction: {
        // top: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    followingItemContent: {
        top: 10,
    },
    followingItemImage: {
        top: 30,
        alignSelf: "center",
    },
    followingItemInteract: {
        top: 40,
        // marginBottom: 10,
    },
    avatar: {
        width: 35,
        height: 35,
        borderRadius: 35
    },
    profile: {
        marginHorizontal: 10
    },

    name: {
        fontSize: 13,
        fontWeight: "700",
    },
    date: {
        fontSize: 11,
        color: "#414141",
        paddingVertical: 2,
        opacity: 0.5,
    },
    title: {
        top: 4,
        fontSize: 15,
        fontWeight: "500",
    },
    descripttion: {
        color: "#414141",
        paddingVertical: 2,
        flexWrap: 'wrap'
    },
    imageWrapper: {
        //position: 'absolute',
        width: device.width-32,
        height: device.width-32,
        alignSelf: "center",
        // top: 15,
        borderRadius: 16,
        backgroundColor: colors.black,
        //ma: 15,
    },
    interactIcon: {
        flexDirection: 'row',
        // paddingEnd: 10
    },
    interact: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    interactComment: {
        top: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: colors.white,
        borderRadius: 32,
        borderWidth: 0.8,
        borderColor: colors.black,
    },

    comment: {
        height: 32,
        marginLeft: 12,
        color: colors.black,
    },
    sendComment: {
        transform: [{ skewX: '45deg' }],
        right: 12
    },
    interactPlayTime: {
        marginTop: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    progressLabelText: {
        fontSize: 12,
    },
    progressLevelDur: {
        // width: 310,
        // flexDirection: "row",
        // justifyContent: "space-between",
        // alignSelf: 'center',
    },
    progressBar: {
        // width: '100%',
        flex: 1,
    },
});

export const darkFollowingItem = StyleSheet.create({
    name: {
        fontSize: 13,
        fontWeight: "700",
        color: colors.white
    },
    date: {
        fontSize: 11,
        color: colors.white,
        paddingVertical: 2,
        opacity: 0.5,
    },
    title: {
        top: 4,
        fontSize: 15,
        fontWeight: "500",
        color: colors.white
    },
    descripttion: {
        color: colors.white,
        paddingVertical: 2,
        flexWrap: 'wrap'
    },
    interactComment: {
        top: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: 'rgba(255, 255, 255, 0.7)',  // màu comment
        borderRadius: 32,
        borderWidth: 0.8,
        borderColor: colors.black,
    },
    comment: {
        height: 32,
        marginLeft: 12,
        color: colors.white,
    },
    sendComment: {
        transform: [{ skewX: '45deg' }],
        right: 12
    },
    interactPlayTime: {
        top: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    progressLabelText: {
        fontSize: 12,
    },
    progressLevelDur: {
        // width: 310,
        // flexDirection: "row",
        // justifyContent: "space-between",
        // alignSelf: 'center',
    },
    progressBar: {
        width: 230,
    },
});
