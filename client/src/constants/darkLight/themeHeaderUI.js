import { StyleSheet } from "react-native";
import colors from "../colors";

export const lightHeader = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 16,
    },

    avatar: {
        width: 35,
        height: 35,
        borderRadius: 35,
    },
    searchSection: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#EDEDED",
        borderWidth: 0.7,
        borderColor: "#EDEDED",
        borderRadius: 32,
        marginHorizontal: 8,
    },
    searchIcon: {
        paddingVertical: 8,
        paddingRight: 4,
        paddingLeft: 10,
    },
    input: {
        height: 32,
        marginRight: 12,
        padding: 0,
        flex: 1,
        color: "#000",
        // alignItems: 'center'
        justifyContent: "center",
    },

    bell: {
        height: 26,
        width: 26,
    },
    background : {
    },
    text : {
        color: colors.black
    },

    placeholder: {
        // alignSelf: 'center'
        color: '#aaa'
    }
});

export const darkHeader = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 16,
    },

    avatar: {
        width: 35,
        height: 35,
        borderRadius: 35,
    },
    searchSection: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.dark_grey,
        borderColor: colors.black,
        borderRadius: 32,
        borderWidth: 1,
        marginHorizontal: 8,
    },
    searchIcon: {
        paddingVertical: 8,
        paddingRight: 4,
        paddingLeft: 10,
    },
    input: {
        height: 32,
        marginRight: 12,
        padding: 0,
        flex: 1,
        color: colors.dark_sub

    },

    bell: {
        height: 26,
        width: 26,
    },
    background : {
        backgroundColor: colors.dark_grey,
    },
    text : {
        color: '#fff'
    },
    
    placeholder: {
        color: colors.dark_sub,
        alignSelf: 'center'
    }
});