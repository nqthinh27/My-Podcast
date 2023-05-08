import { StyleSheet } from "react-native";
import colors from "../colors";

export const lightProfile= StyleSheet.create({
    profileContainer: {
    },
    profileText: {
        color: 'black'
    },
    myprofileEditProfile: {
        width: "62%",
        height: 40,
        borderRadius: 6,
        borderWidth: 1,
        backgroundColor: "#D6D6D6",
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 16,
        borderColor: "white",
        alignSelf: "center",
    },
    textsub : {
        color: "#414141"
    },
    img: {
        tintColor: 'black'
    }
});

export const darkProfile = StyleSheet.create({
    profileContainer: {
        backgroundColor: "#212529",
    },
    profileText: {
        color: colors.white,
        
    },
    myprofileEditProfile: {
        width: "62%",
        height: 40,
        borderRadius: 6,
        borderWidth: 1,
        backgroundColor: "#D6D6D6",
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 16,
        borderColor: colors.black,
        alignSelf: "center",
    },
    textsub : {
        color: colors.dark_sub
    },
    img: {
        tintColor: 'white'
    }
});
