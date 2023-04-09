import {
    Text,
    StyleSheet,
    View,
    TouchableOpacity,
    SafeAreaView,
} from "react-native";
import { React, useState } from "react";
import colors from "../../constants/colors";
import Icon from "react-native-vector-icons/Ionicons";

function Success(props) {
    //navigation
    // const { navigation, route } = props;
    // //function of navigate
    // const { navigate, goback } = navigation;

    return (
        <SafeAreaView style={styles.success}>
            

            <View style={styles.successContainer}>
                <Icon
                    name={"checkmark-circle"}
                    size={80}
                    color={colors.primary}
                />

                <View style={styles.successViewText}>
                    <Text
                        style={{
                            fontSize: 21,
                        }}
                    >
                        Đổi mật khẩu thành công!
                    </Text>
                </View>

                <TouchableOpacity
                    style={styles.successViewButton}
                    onPress={() => {
                        navigate("SignIn");
                    }}
                >
                    <Text style={styles.successButton}>Đăng nhập</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    success: {
        flex: 1,
        backgroundColor: "#fff",
    },

    successHeader: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "flex-start",
    },

    successTextHeader: {
        fontWeight: "bold",
        fontSize: 21,
    },
    successContainer: {
        flex: 20,
        backgroundColor: "#fff",
        alignItems: "center",
        marginTop: "50%",
        marginHorizontal: 16
    },

    successViewText: {
        marginTop: 10,
        alignItems: "center",
        justifyContent: "center",
    },

    successViewButton: {
        width: "100%",
        height: 55,
        borderRadius: 25,
        borderWidth: 1,
        backgroundColor: colors.primary,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 46,
        borderColor: "white",
    },

    successButton: {
        color: "white",
        fontSize: 17,
        fontWeight: "bold",
    },
});

export default Success;
