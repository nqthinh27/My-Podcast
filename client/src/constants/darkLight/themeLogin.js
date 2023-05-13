import { StyleSheet } from "react-native";
import colors from "../colors";

export const lightLogin = StyleSheet.create({
    background: {
        backgroundColor: "#fff"
    },
    text: {
        color: colors.black
    },
    textInput: {
        
    }
});

export const darkLogin = StyleSheet.create({
    background: {
        backgroundColor: colors.dark_backgr
    },
    text: {
        color: colors.white
    },
    textInput: {
        color: colors.dark_sub
    }
});
