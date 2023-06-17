import axios from 'axios';
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
import { lightLogin, darkLogin } from "../../constants/darkLight/themeLogin";
import { useSelector } from "react-redux";

function Register(props) {
    const navigation = useNavigation();
    // //function of navigate
    const { navigate, goBack } = navigation;

    const [fullName, setFullName] = useState("");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repassword, setRepassword] = useState("");
    const isDarkTheme = useSelector((state) => state.theme.isDarkTheme);
    const currentLanguage = useSelector(
        (state) => state.language.currentLanguage
    );

    const handleRegister = async () => {
        try {
            if (password === repassword) {
                const newUser = {
                    fullName: fullName,
                    userName: userName,
                    email: email,
                    password: password
                }
                res = await axios.post(`${BASE_URL}/auth/register`, newUser);
                alert('Đăng ký thành công');
            } else {
                alert('Mật khẩu nhập lại không khớp');
            }
        } catch (err) {
            alert('Không hợp lệ! Vui lòng kiểm tra lại thông tin');
        }
    }
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
                    color={isDarkTheme ? darkLogin.text.color : lightLogin.text.color}
                />
                <Text style={[styles.registerTextHeader, isDarkTheme ? darkLogin.text: lightLogin.text]}>{currentLanguage === "vi" ? " Đăng kí    " : " Register     "}</Text>
                <Text> </Text>
            </View>

            <View style={[styles.registerContainer, isDarkTheme ? darkLogin.background : lightLogin.background]}>
                <View style={styles.registerViewInputForm}>
                    <TextInput
                        style={[styles.registerInputText, isDarkTheme ? darkLogin.text: lightLogin.text]}
                        placeholder={currentLanguage === "vi" ? "Họ và tên" :  "Fullname"}
                        value={fullName}
                        onChangeText={setFullName}
                        placeholderTextColor={isDarkTheme ? darkLogin.textInput.color : lightLogin.textInput.color}
                        ></TextInput>
                </View>
                <View style={styles.registerViewInputForm}>
                    <TextInput
                        style={[styles.registerInputText, isDarkTheme ? darkLogin.text: lightLogin.text]}
                        placeholder={currentLanguage === "vi" ? "Tên người dùng" :  "Username"}
                        value={userName}
                        onChangeText={setUserName}
                        placeholderTextColor={isDarkTheme ? darkLogin.textInput.color : lightLogin.textInput.color}
                        ></TextInput>
                </View>
                <View style={styles.registerViewInputForm}>
                    <TextInput
                        style={[styles.registerInputText, isDarkTheme ? darkLogin.text: lightLogin.text]}
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        placeholderTextColor={isDarkTheme ? darkLogin.textInput.color : lightLogin.textInput.color}
                        ></TextInput>
                </View>
                <View style={styles.registerViewInputForm}>
                    <TextInput
                        style={[styles.registerInputText, isDarkTheme ? darkLogin.text: lightLogin.text]}
                        placeholder={currentLanguage === "vi" ? "Mật khẩu" :  "Password"}
                        secureTextEntry={true}
                        value={password}
                        onChangeText={setPassword}
                        placeholderTextColor={isDarkTheme ? darkLogin.textInput.color : lightLogin.textInput.color}
                        ></TextInput>
                </View>

                <View style={styles.registerViewInputForm}>
                    <TextInput
                        style={[styles.registerInputText, isDarkTheme ? darkLogin.text: lightLogin.text]}
                        placeholder={currentLanguage === "vi" ? "Nhập lại mật khẩu" :  "Confirm password"}
                        secureTextEntry={true}
                        value={repassword}
                        onChangeText={setRepassword}
                        placeholderTextColor={isDarkTheme ? darkLogin.textInput.color : lightLogin.textInput.color}
                        ></TextInput>
                </View>

                <TouchableOpacity
                    style={styles.registerViewButtonRegister}
                    onPress={handleRegister}
                >
                    <Text style={styles.registerButtonRegister}>{currentLanguage === "vi" ? "Đăng ký" :  "Register"}</Text>
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
                        {currentLanguage === "vi" ? "Đã có tài khoản? " :  "Already have an account ?"}
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
                        {currentLanguage === "vi" ? " Đăng nhập" :  " Login"}
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
