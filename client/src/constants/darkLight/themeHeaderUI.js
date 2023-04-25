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
        color: "#A0A0A0",
    },

    bell: {
        height: 26,
        width: 26,
    },
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
        backgroundColor: '#272727',
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
        color: '#EAEAEA'
    },

    bell: {
        height: 26,
        width: 26,
    },
});