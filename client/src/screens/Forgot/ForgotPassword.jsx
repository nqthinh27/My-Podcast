import {
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import React from "react";
import colors from "../../constants/colors";
import Icon from "react-native-vector-icons/Entypo";

function ForgotPassword(props) {
    // //navigation
    // const { navigation, route } = props;
    // //function of navigate
    // const { navigate, goback } = navigation;

    return (
        <SafeAreaView style={styles.forgotpassword}>
            <View style={styles.forgotHeader}>
                <Icon
                    style={styles.back}
                    name={"chevron-left"}
                    size={26}
                    // color={colors.primary}
                    onPress={() => {
                        navigate("SignIn");
                    }}
                />
                <Text style={styles.forgotTextHeader}>Quên Mật Khẩu</Text>
                <Text> </Text>
            </View>

            <View style={styles.forgotContainer}>
                <View style={styles.forgotViewTextEmail}>
                    <Text style={styles.text1}>Nhập Địa Chỉ Email</Text>
                </View>
                <View style={styles.forgotViewInputEmail}>
                    <TextInput
                        style={styles.textInput1}
                        placeholder="Email"
                    ></TextInput>
                </View>

                <TouchableOpacity
                    style={styles.forgotButton}
                    onPress={() => {
                        navigate("OTPcode");
                    }}
                >
                    <Text
                        style={{
                            color: "white",
                            fontSize: 17,
                            fontWeight: "bold",
                        }}
                    >
                        Gửi
                    </Text>
                </TouchableOpacity>
                <Text
                    style={{
                        fontWeight: "500",
                        fontSize: 15,
                        marginTop: 57,
                        marginBottom: 10,
                    }}
                >
                    hoặc
                </Text>
                <View style={{ flexDirection: "row" }}>
                    <Icon
                        name="facebook"
                        size={40}
                        color="#0571E6"
                        onPress={() => alert("Đăng nhập với Facebook")}
                    />
                    <Text> </Text>
                    <Icon
                        name="google--with-circle"
                        size={40}
                        color="#ED5A4F"
                        onPress={() => alert("Đăng nhập với Facebook")}
                    />
                </View>

                <Text style={styles.forgotTextNoAcc}>Chưa có tài khoản?</Text>
                <TouchableOpacity
                    style={styles.forgotViewButtonRegister}
                    onPress={() => {
                        navigate("SignUp");
                    }}
                >
                    <Text style={styles.forgotButtonRegister}>Đăng Kí</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    forgotpassword: {
        flex: 1,
        backgroundColor: "#fff",
    },

    forgotHeader: {
        flex: 1,
        marginHorizontal: 20,
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
    },

    forgotTextHeader: {
        fontWeight: "bold",
        fontSize: 21,
    },
    forgotContainer: {
        flex: 20,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },

    forgotViewTextEmail: {
        marginHorizontal: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    text1: {
        fontWeight: "bold",
        fontSize: 18,
    },
    forgotViewInputEmail: {
        marginHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#C0C0C0",
        width: "90%",
        marginTop: 27,
    },
    textInput1: {
        fontSize: 15,
    },
    textView2: {
        marginHorizontal: 20,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 27,
    },
    text2: {
        color: "#B0ADAD",
        fontSize: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#FF6363",
    },
    forgotButton: {
        width: "90%",
        height: 55,
        borderRadius: 25,
        borderWidth: 1,
        backgroundColor: colors.primary,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 27,
        borderColor: "white",
    },
    btn1: {
        color: "white",
        fontSize: 17,
        fontWeight: "bold",
    },
    text3: {
        fontWeight: "500",
        fontSize: 15,
        marginTop: 57,
        marginBottom: 10,
    },
    forgotTextNoAcc: {
        color: "#B0ADAD",
        fontSize: 14,
        borderBottomWidth: 1,
        borderBottomColor: colors.inactive,
        marginTop: 58,
    },
    forgotViewButtonRegister: {
        width: "90%",
        height: 55,
        borderRadius: 25,
        borderWidth: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 11,
        borderColor: colors.primary,
    },
    forgotButtonRegister: {
        color: colors.primary,
        fontWeight: "bold",
        fontSize: 17,
    },

    iconfb: {
        marginRight: 10,
    },
});

export default ForgotPassword;
