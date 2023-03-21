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

function RegisterOTP(props) {
    //navigation
    // const { navigation, route } = props;
    // //function of navigate
    // const { navigate, goback } = navigation;

    const [otp, setOTP] = useState("");

    return (
        <SafeAreaView style={styles.registerOTP}>
            <View style={styles.registerOTPHeader}>
                <Icon
                    name={"chevron-left"}
                    size={30}
                    // color={colors.primary}
                    onPress={() => {
                        navigate("Register");
                    }}
                />
                <Text style={styles.registerOTPTextHeader}>Đăng kí</Text>
                <Text> </Text>
            </View>

            <View style={styles.registerotpContainer}>
                <View style={styles.registerOTPViewText}>
                    <Text
                        style={{
                            fontWeight: "bold",
                            fontSize: 17,
                        }}
                    >
                        Nhập Mã OTP{" "}
                    </Text>
                </View>
                <View style={styles.registerOTPViewInput}>
                    <TextInput
                        placeholder="x x x x x x"
                        onChangeText={(text) => setOTP(text)}
                    ></TextInput>
                </View>
                <View style={styles.registerOTPViewNoOTP}>
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
                    style={styles.registerOTPViewButton}
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
    registerOTP: {
        flex: 1,
        backgroundColor: "#fff",
    },

    registerOTPHeader: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
    },

    registerOTPTextHeader: {
        fontWeight: "bold",
        fontSize: 21,
    },

    registerotpContainer: {
        flex: 20,
        backgroundColor: "#fff",
        alignItems: "center",
        marginTop: "20%",
        marginHorizontal: 16,
    },

    registerOTPViewText: {
        marginHorizontal: 20,
        alignItems: "center",
        justifyContent: "center",
    },

    registerOTPViewInput: {
        marginHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#C0C0C0",
        width: "100%",
        marginTop: 27,
        alignItems: "center",
        justifyContent: "center",
    },

    registerOTPViewNoOTP: {
        flexDirection: "row",
        marginHorizontal: 20,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 27,
    },

    registerOTPViewButton: {
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

export default RegisterOTP;
