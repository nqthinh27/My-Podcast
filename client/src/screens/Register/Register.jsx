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

function Register(props) {
    //navigation
    // const { navigation, route } = props;
    // //function of navigate
    // const { navigate, goback } = navigation;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repassword, setRepassword] = useState("");

    return (
        <SafeAreaView style={styles.register}>
            <View style={styles.registerHeader}>
                <Icon
                    name={"chevron-left"}
                    size={30}
                    // color={colors.primary}
                    onPress={() => {
                        navigate("Login");
                    }}
                />
                <Text style={styles.registerTextHeader}>Đăng kí</Text>
                <Text> </Text>
            </View>

            <View style={styles.registerContainer}>
                <View style={styles.registerViewInputEmail}>
                    <TextInput
                        style={{
                            fontSize: 15,
                        }}
                        placeholder="Email"
                    ></TextInput>
                </View>
                <View style={styles.registerViewInputPassword}>
                    <TextInput
                        style={styles.registerInputPassword}
                        placeholder="Mật khẩu"
                        secureTextEntry={true}
                    ></TextInput>
                </View>

                <View style={styles.registerViewInputPassword}>
                    <TextInput
                        style={styles.registerInputPassword}
                        placeholder="Nhập lại Mật khẩu"
                        secureTextEntry={true}
                    ></TextInput>
                </View>

                <TouchableOpacity
                    style={styles.registerViewButtonRegister}
                    onPress={() => {
                        // navigate('OTPcodeSU');
                    }}
                >
                    <Text style={styles.registerButtonRegister}>Đăng ký</Text>
                </TouchableOpacity>

                <View style={styles.registerViewButtonHaveAcc}>
                    <Text
                        style={{
                            color: "#B0ADAD",
                            fontSize: 15,
                            borderBottomWidth: 1,
                            borderBottomColor: "#FF6363",
                        }}
                    >
                        Đã có tài khoản?{" "}
                    </Text>

                    <Text
                        style={{
                            fontSize: 15,
                            color: "#FF6363",
                        }}
                        onPress={() => {
                            navigate("Login");
                        }}
                    >
                        Đăng nhập
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    register: {
        flex: 1,
        backgroundColor: "#fff",
    },

    registerHeader: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
    },

    registerTextHeader: {
        fontWeight: "bold",
        fontSize: 21,
    },

    registerContainer: {
        flex: 20,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        marginHorizontal: 16,
    },

    registerViewInputEmail: {
        marginHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#C0C0C0",
        width: "100%",
    },

    registerViewInputPassword: {
        flexDirection: "row",
        marginHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#C0C0C0",
        width: "100%",
        marginTop: 46,
        justifyContent: "space-between",
    },

    registerViewButtonHaveAcc: {
        flexDirection: "row",
        marginHorizontal: 20,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 63,
    },

    registerInputEmail: {
        fontSize: 15,
    },

    registerInputPassword: {
        fontSize: 15,
        width: "100%",
    },

    registerViewButtonRegister: {
        width: "100%",
        height: 55,
        borderRadius: 25,
        borderWidth: 1,
        backgroundColor: colors.primary,
        alignItems: "center",
        justifyContent: "center",
        borderColor: "white",
        marginTop: 63,
    },
    registerButtonRegister: {
        color: "white",
        fontSize: 17,
        fontWeight: "bold",
    },
});

export default Register;
