import { React, useEffect, useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    SafeAreaView,
} from "react-native";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import EntypoIcon from "react-native-vector-icons/Entypo";
import { useDispatch, useSelector } from "react-redux";
import GlobalStyles from "../components/GlobalStyles";
import { loginUser } from '../redux/actions/authApi';
import { useNavigation } from "@react-navigation/native";
import Loading from "../components/Loading";
import colors from "../constants/colors";
import { lightLogin, darkLogin } from "../constants/darkLight/themeLogin";

function Login(props) {
    const dispatch = useDispatch();
    const loginSuccess = useSelector((state) => state.loginSuccess.isLoginSuccess)
    const { navigate, goBack } = useNavigation();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setInLoading] = useState(false);
    const [loginwGoogle, setloginwGoogle] = useState(false);
    const [loginwFb, setloginwFb] = useState(false);

    const isDarkTheme = useSelector((state) => state.theme.isDarkTheme);
    const currentLanguage = useSelector(
        (state) => state.language.currentLanguage
    );
    const handleLogin = async () => {
        setInLoading(true)
        newUser = {
            email: email,
            password: password
        }
        const login = await loginUser(newUser, dispatch);
        setInLoading(false)
        if (login) goBack();  
        else alert('Email hoặc password không đúng. Vui lòng thử lại!');
    }

    return (
        <SafeAreaView style={[GlobalStyles.customSafeArea, isDarkTheme ? darkLogin.background : lightLogin.background]}>
            <View style={styles.loginHeader}>
                <EntypoIcon
                    name={"chevron-left"}
                    size={30}
                    // color={colors.primary}
                    onPress={() => {
                        goBack();
                    }}
                    color={isDarkTheme ? darkLogin.text.color : lightLogin.text.color}
                />
                <Text style={[styles.loginTextHeader, isDarkTheme ? darkLogin.text: lightLogin.text]}>{currentLanguage === "vi" ? " Đăng nhập    " : " Login     "}</Text>
                <Text> </Text>
            </View>

            <View style={[styles.loginContainer, isDarkTheme ? darkLogin.background : lightLogin.background]}>
                <View style={styles.loginInputEmail}>
                    <TextInput
                        style={[styles.loginTextInputEmail, isDarkTheme ? darkLogin.text: lightLogin.text]}
                        value={email}
                        onChangeText={setEmail}
                        placeholder="Email"
                        placeholderTextColor={isDarkTheme ? darkLogin.textInput.color : lightLogin.textInput.color}
                    ></TextInput>
                </View>

                <View style={styles.loginInputPassword}>
                    <TextInput
                        style={[styles.loginTextInputPassword, isDarkTheme ? darkLogin.text: lightLogin.text]}
                        value={password}
                        onChangeText={setPassword}
                        placeholder={currentLanguage === "vi" ? "Mật khẩu" :  "Password"}
                        secureTextEntry={true}
                        placeholderTextColor={isDarkTheme ? darkLogin.textInput.color : lightLogin.textInput.color}
                    ></TextInput>

                    <Text style={styles.loginTextForgot}>{currentLanguage === "vi" ? "Quên mật khẩu?" : " Forgot Password?"}</Text>
                </View>

                <TouchableOpacity
                    style={styles.loginButtonViewlogin}
                    onPress={() => {
                        handleLogin();
                    }}
                >
                    <EntypoIcon name="login" size={25} color="#fff" />
                    <Text style={styles.loginButtonlogin}>{currentLanguage === "vi" ? " Đăng nhập" : " Login"}</Text>
                </TouchableOpacity>

                {/* <TouchableOpacity style={styles.loginButtonViewGoogle}>
                    <EntypoIcon
                        name="google--with-circle"
                        size={35}
                        color="#ED5A4F"
                    />
                    <Text style={styles.loginButtonGoogle}>
                        {" "}
                        Đăng nhập với Google
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.loginButtonViewFb}>
                    <EntypoIcon name="facebook" size={33} color="#0571E6" />
                    <Text style={styles.loginButtonFb}>
                        {" "}
                        Đăng nhập với Facebook
                    </Text>
                </TouchableOpacity> */}

                <View style={styles.loginViewNoEmail}>
                    <Text style={styles.loginTextNoEmail}>
                    {currentLanguage === "vi" ? "Chưa có tài khoản?" :  "No account yet?"}
                    </Text>
                </View>
                <TouchableOpacity
                    style={[styles.loginButtonViewGoogle,  {marginTop: 10}]}
                    onPress={() => {
                        navigate("Register");
                    }}
                >
                    <AntDesignIcon name="adduser" size={30} color={colors.primary} />
                    <Text style={styles.loginButtonGoogle}>{currentLanguage === "vi" ? " Đăng ký tài khoản" :  " Register"}</Text>
                </TouchableOpacity>
            </View>
            {isLoading && <Loading/>}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    login: {
        flex: 1,
        backgroundColor: "#fff",
    },

    loginHeader: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
    },

    loginTextHeader: {
        fontWeight: "bold",
        fontSize: 21,
    },

    loginContainer: {
        flex: 20,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        marginHorizontal: 16,
    },

    loginInputEmail: {
        marginHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#C0C0C0",
        width: "100%",
    },

    loginTextInputEmail: {
        fontSize: 17,
    },

    loginInputPassword: {
        flexDirection: "row",
        marginHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#C0C0C0",
        width: "100%",
        marginTop: 46,
        justifyContent: "space-between",
    },

    loginTextForgot: {
        color: "#FF6363",
        fontSize: 16,
    },

    loginViewNoEmail: {
        flexDirection: "row",
        // marginHorizontal: 20,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 55,
    },
    loginTextInputPassword: {
        flex: 1,
        fontSize: 17,
    },
    loginTextNoEmail: {
        color: "red",
        fontSize: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#FF6363",
    },
    loginButtonViewlogin: {
        width: "100%",
        height: 55,
        borderRadius: 25,
        borderWidth: 1,
        backgroundColor: colors.primary,
        alignItems: "center",
        justifyContent: "center",
        borderColor: "white",
        marginTop: 63,
        flexDirection: "row",
    },
    loginButtonlogin: {
        color: "white",
        fontWeight: "bold",
        fontSize: 17,
        alignItems: "center",
        justifyContent: "center",
    },

    loginButtonViewGoogle: {
        width: "100%",
        height: 55,
        borderRadius: 25,
        borderWidth: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        borderColor: colors.primary,
        marginTop: 30,
        flexDirection: "row",
    },
    loginButtonGoogle: {
        color: colors.primary,
        fontWeight: "bold",
        fontSize: 17,
    },

    loginButtonViewFb: {
        width: "100%",
        height: 55,
        borderRadius: 25,
        borderWidth: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,
        borderColor: colors.primary,
        flexDirection: "row",
    },
    loginButtonFb: {
        color: colors.primary,
        fontWeight: "bold",
        fontSize: 17,
    },
});

export default Login;
