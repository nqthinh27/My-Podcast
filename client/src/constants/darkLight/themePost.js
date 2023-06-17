import { StyleSheet } from 'react-native'
import colors from "../colors";

export const lightPost = StyleSheet.create({
    background: {
        backgroundColor: '#fff'
    },

    text: {
        color: colors.black
    },

    placeholder: {
    },

    icon: {
    
    },


    postHeader: {
        // flex: 1,

        marginHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    postHeaderSuccess: {
        backgroundColor: colors.primary,
        padding: 7,
        borderRadius: 7,
        justifyContent: "flex-end",
    },

    postHeaderFailed: {
        backgroundColor: "#ccc",
        padding: 7,
        borderRadius: 7,
        justifyContent: "flex-end",
    },

    postContainer: {
        flex: 1.5,
        backgroundColor: "#fff",
        alignItems: "flex-start",
        justifyContent: "space-between",
        marginTop: 16,
    },

    postAvatar: {
        // flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        // marginHorizontal: 20,
    },

    postTextQuestion: {
        flex: 5,
        marginLeft: 20,
        alignSelf: "flex-start",
        width: "100%",
    },

    postAudio: {
        flexDirection: "row",
        backgroundColor: "#D9D9D9",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
        height: 93,
    },

    postAudioName: {
        flex: 6,
        height: "60%",
        alignContent: "center",
        justifyContent: "space-between",
    },

    postSlider: {
        width: "90%",
        alignSelf: "flex-start",
    },

    postFooter: {
        width: "100%",
        paddingBottom: 10,
        height: "30%",
        borderTopWidth: 1,
        borderTopColor: "#C0C0C0",
    },

    postIngredient: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        height: 50,
        borderRadius: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#C0C0C0",
    },

    modalView: {
        flex: 1,
        marginVertical: 50,
        marginHorizontal: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 16,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        // width: "90%",
    },
    postTopic: {
        // backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
    },
});

export const darkPost = StyleSheet.create({
    background: {
        backgroundColor: colors.dark_backgr
    },

    text: {
        color: colors.white
    },

    placeholder: {
        color: colors.dark_sub
    },

    icon: {
        color: colors.dark_sub
    },

    postHeader: {
        // flex: 1,

        marginHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    postHeaderSuccess: {
        backgroundColor: colors.primary,
        padding: 7,
        borderRadius: 7,
        justifyContent: "flex-end",
    },

    postHeaderFailed: {
        backgroundColor: "#ccc",
        padding: 7,
        borderRadius: 7,
        justifyContent: "flex-end",
    },

    postContainer: {
        flex: 1.5,
        backgroundColor: "#fff",
        alignItems: "flex-start",
        justifyContent: "space-between",
        marginTop: 16,
    },

    postAvatar: {
        // flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        // marginHorizontal: 20,
    },

    postTextQuestion: {
        flex: 5,
        marginLeft: 20,
        alignSelf: "flex-start",
        width: "100%",
    },

    postAudio: {
        flexDirection: "row",
        backgroundColor: "#D9D9D9",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
        height: 93,
    },

    postAudioName: {
        flex: 6,
        height: "60%",
        alignContent: "center",
        justifyContent: "space-between",
    },

    postSlider: {
        width: "90%",
        alignSelf: "flex-start",
    },

    postFooter: {
        width: "100%",
        paddingBottom: 10,
        height: "30%",
        borderTopWidth: 1,
        borderTopColor: "#C0C0C0",
    },

    postIngredient: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        height: 50,
        borderRadius: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#C0C0C0",
    },

    modalView: {
        flex: 1,
        marginVertical: 50,
        marginHorizontal: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 16,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        // width: "90%",
    },
    postTopic: {
        // backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
    },
});