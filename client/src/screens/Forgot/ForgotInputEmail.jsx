import {
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { React, useState } from "react";
import colors from "../../constants/colors";
import Icon from "react-native-vector-icons/Entypo";

function ForgotInputEmail(props) {
    // //navigation
    // const { navigation, route } = props;
    // //function of navigate
    // const { navigate, goback } = navigation;

    const [email, setEmail] = useState("");

    return (
        <SafeAreaView style={styles.forgotinputemail}>
            <View style={styles.forgotHeader}>
                <Icon
                    name={"chevron-left"}
                    size={30}
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
                    <Text
                        style={{
                            fontWeight: "bold",
                            fontSize: 18,
                        }}
                    >
                        Nhập Địa Chỉ Email
                    </Text>
                </View>
                <View style={styles.forgotViewInputEmail}>
                    <TextInput
                        style={{
                            fontSize: 15,
                        }}
                        placeholder="Email"
                        onChangeText={setEmail}
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
    forgotinputemail: {
        flex: 1,
        backgroundColor: "#fff",
    },

    forgotHeader: {
        flex: 1,
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
        marginHorizontal: 16
    },

    forgotViewTextEmail: {
        marginHorizontal: 20,
        alignItems: "center",
        justifyContent: "center",
    },

    forgotViewInputEmail: {
        marginHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#C0C0C0",
        width: "100%",
        marginTop: 27,
    },

    forgotButton: {
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

    forgotTextNoAcc: {
        color: "#B0ADAD",
        fontSize: 14,
        borderBottomWidth: 1,
        borderBottomColor: colors.inactive,
        marginTop: 58,
    },
    forgotViewButtonRegister: {
        width: "100%",
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
});

export default ForgotInputEmail;
