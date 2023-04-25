import axios from "axios";
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
import { BASE_URL } from "../../ultis/config";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { lightLogin, darkLogin } from "../../constants/darkLight/themeLogin";

function Register(props) {
    const navigation = useNavigation();
    // //function of navigate
    const { navigate, goBack } = navigation;

    const [fullName, setFullName] = useState("");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repassword, setRepassword] = useState("");
    const currentLanguage = useSelector(
        (state) => state.language.currentLanguage
    );
    const isDarkTheme = useSelector((state) => state.theme.isDarkTheme);

    const handleRegister = async () => {
        try {
            if (password === repassword) {
                const newUser = {
                    fullName: fullName,
                    userName: userName,
                    email: email,
                    password: password,
                };
                res = await axios.post(`${BASE_URL}/auth/register`, newUser);
<<<<<<< Updated upstream
                alert('Đăng ký thành công');
=======
                alert("Đăng ký thành công");
                console.log(res.data);
>>>>>>> Stashed changes
            } else {
                alert("Mật khẩu nhập lại không khớp");
            }
        } catch (err) {
<<<<<<< Updated upstream
            alert('Không hợp lệ! Vui lòng kiểm tra lại thông tin');
=======
            console.log(err.message);
            alert("Không hợp lệ! Vui lòng kiểm tra lại thông tin");
>>>>>>> Stashed changes
        }
    };
    return (
        <SafeAreaView style={[styles.register, isDarkTheme ? darkLogin.background : lightLogin.background]}>
            <View style={styles.registerHeader}>
                <Icon
                    name={"chevron-left"}
                    size={30}
                    // color={colors.primary}
                    onPress={() => {
                        navigation.goBack();
                    }}
                />
                <Text style={styles.registerTextHeader}>
                    {currentLanguage === "vi" ? "Đăng ký" : "Register"}
                </Text>
                <Text> </Text>
            </View>

            <View style={[styles.registerContainer, isDarkTheme ? darkLogin.background : lightLogin.background]}>
                <View style={styles.registerViewInputForm}>
                    <TextInput
                        style={styles.registerInputText}
                        placeholder={
                            currentLanguage === "vi" ? "Họ tên" : "Full name"
                        }
                        value={fullName}
                        onChangeText={setFullName}
                    ></TextInput>
                </View>
                <View style={styles.registerViewInputForm}>
                    <TextInput
                        style={styles.registerInputText}
                        placeholder={
                            currentLanguage === "vi"
                                ? "Tên người dùng"
                                : "Username"
                        }
                        value={userName}
                        onChangeText={setUserName}
                    ></TextInput>
                </View>
                <View style={styles.registerViewInputForm}>
                    <TextInput
                        style={styles.registerInputText}
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                    ></TextInput>
                </View>
                <View style={styles.registerViewInputForm}>
                    <TextInput
                        style={styles.registerInputText}
                        placeholder={
                            currentLanguage === "vi" ? "Mật khẩu" : "Password"
                        }
                        secureTextEntry={true}
                        value={password}
                        onChangeText={setPassword}
                    ></TextInput>
                </View>

                <View style={styles.registerViewInputForm}>
                    <TextInput
                        style={styles.registerInputText}
                        placeholder={
                            currentLanguage === "vi"
                                ? "Nhập lại mật khẩu"
                                : "Confirm password"
                        }
                        secureTextEntry={true}
                        value={repassword}
                        onChangeText={setRepassword}
                    ></TextInput>
                </View>

                <TouchableOpacity
                    style={styles.registerViewButtonRegister}
                    onPress={handleRegister}
                >
                    <Text style={styles.registerButtonRegister}>
                        {currentLanguage === "vi" ? "Đăng ký" : "Register"}
                    </Text>
                </TouchableOpacity>

                <View style={styles.registerViewButtonHaveAcc}>
                    <Text
                        style={{
                            color: "#B0ADAD",
                            fontSize: 17,
                            borderBottomWidth: 1,
                            borderBottomColor: "#FF6363",
                        }}
                    >
                        {currentLanguage === "vi"
                            ? "Đã có tài khoản? "
                            : "Have an account? "}
                    </Text>

                    <Text
                        style={{
                            fontSize: 17,
                            color: "#FF6363",
                        }}
                        onPress={() => {
                            navigate("Login");
                        }}
                    >
                        {currentLanguage === "vi" ? "Đăng nhập" : "Login"}
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

    registerViewInputForm: {
        flexDirection: "row",
        marginHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#C0C0C0",
        width: "100%",
        marginBottom: 46,
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

    registerInputText: {
        fontSize: 18,
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
    },
    registerButtonRegister: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
});

export default Register;
