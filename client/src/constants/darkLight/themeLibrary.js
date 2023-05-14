import { StyleSheet } from "react-native";
import colors from "../colors";

export const lightLibrary = StyleSheet.create({
    libraryContainer: {
        backgroundColor: "#fff",
    },

    libraryText: {
        color: colors.black,
    },

    libraryFunction: {
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
});

export const darkLibrary = StyleSheet.create({
    libraryContainer: {
        backgroundColor: colors.dark_backgr,
    },
    libraryText: {
        color: colors.white,
    },

    libraryFunction: {
        backgroundColor: colors.dark_grey,
        shadowColor: "#fff",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3,
        elevation: 5,
    },
});
