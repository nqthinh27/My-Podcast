import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    SafeAreaView,
} from "react-native";
import { React, useState } from "react";
import colors from "../../constants/colors";
import Icon from "react-native-vector-icons/Entypo";

function ForgotOTP(props) {
    //navigation
    // const { navigation, route } = props;
    // //function of navigate
    // const { navigate, goback } = navigation;

    const [otp, setOTP] = useState("");

    return (
        <SafeAreaView style={styles.forgotOTP}>
            <View style={styles.forgotOTPHeader}>
                <Icon
                    name={"chevron-left"}
                    size={30}
                    // color={colors.primary}
                    onPress={() => {
                        navigate("Register");
                    }}
                />
                <Text style={styles.forgotOTPTextHeader}>Đăng kí</Text>
                <Text> </Text>
            </View>

            <View style={styles.forgotOTPContainer}>
                <View style={styles.forgotOTPViewText}>
                    <Text
                        style={{
                            fontWeight: "bold",
                            fontSize: 17,
                        }}
                    >
                        Nhập Mã OTP{" "}
                    </Text>
                </View>
                <View style={styles.forgotOTPViewInput}>
                    <TextInput
                        placeholder="x x x x x x"
                        onChangeText={(text) => setOTP(text)}
                    ></TextInput>
                </View>
                <View style={styles.forgotOTPViewNoOTP}>
                    <Text
                        style={{
                            color: "#B0ADAD",
                            fontSize: 14,
                        }}
                    >
                        Chưa nhận được mã OTP?{" "}
                    </Text>
                    <Text
                        style={{
                            color: "red",
                            fontSize: 13,
                        }}
                        onPress={() => {
                            alert("Gửi thành công mã OTP");
                        }}
                    >
                        Gửi lại
                    </Text>
                </View>
                <TouchableOpacity
                    style={styles.forgotOTPViewButton}
                    onPress={() => {
                        navigate("Success");
                    }}
                >
                    <Text
                        style={{
                            color: "white",
                            fontSize: 17,
                            fontWeight: "bold",
                        }}
                    >
                        Xác nhận
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    forgotOTP: {
        flex: 1,
        backgroundColor: "#fff",
    },

    forgotOTPHeader: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
    },

    forgotOTPTextHeader: {
        fontWeight: "bold",
        fontSize: 21,
    },

    forgotOTPContainer: {
        flex: 20,
        backgroundColor: "#fff",
        alignItems: "center",
        marginTop: "20%",
        marginHorizontal: 16,
    },

    forgotOTPViewText: {
        marginHorizontal: 20,
        alignItems: "center",
        justifyContent: "center",
    },

    forgotOTPViewInput: {
        marginHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#C0C0C0",
        width: "100%",
        marginTop: 27,
        alignItems: "center",
        justifyContent: "center",
    },

    forgotOTPViewNoOTP: {
        flexDirection: "row",
        marginHorizontal: 20,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 27,
    },

    forgotOTPOTPViewButton: {
        width: "100%",
        height: 55,
        borderRadius: 25,
        borderWidth: 1,
        backgroundColor: colors.primary,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 27,
        borderColor: "white",
    },
});

export default ForgotOTP;
