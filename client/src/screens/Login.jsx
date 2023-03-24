import { React, useEffect, useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    SafeAreaView,
} from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from '../redux/actions/authApi';

const colors = {
    primary: '#FFA800',
    inactive: '#888888',
}

function Login(props) {
    const dispatch = useDispatch();
    const login = useSelector((state) => state.auth.login)
    const { navigation, route } = props;
    // //function of navigate
    const { navigate, goback } = navigation;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState(false);
    const [loginwGoogle, setloginwGoogle] = useState(false);
    const [loginwFb, setloginwFb] = useState(false);

    const handleLogin = () => {
        setErr(!err);
        newUser = {
            email: email,
            password: password
        }
        loginUser(newUser, dispatch, navigate);
    }

    return (
        <SafeAreaView style={styles.login}>
            <View style={styles.loginHeader}>
                <Icon
                    name={"chevron-left"}
                    size={30}
                    // color={colors.primary}
                    onPress={() => {
                        navigate("UIScreen");
                    }}
                />
                <Text style={styles.loginTextHeader}>Đăng nhập</Text>
                <Text> </Text>
            </View>

            <View style={styles.loginContainer}>
                <View style={styles.loginInputEmail}>
                    <TextInput
                        style={styles.loginTextInputEmail}
                        value={email}
                        onChangeText={setEmail}
                        placeholder="Email"
                    ></TextInput>
                </View>

                <View style={styles.loginInputPassword}>
                    <TextInput
                        style={styles.loginTextInputPassword}
                        value={password}
                        onChangeText={setPassword}
                        placeholder="Mật khẩu"
                        secureTextEntry={true}
                    ></TextInput>

                    <Text style={styles.loginTextForgot}>Quên mật khẩu?</Text>
                </View>

                <TouchableOpacity
                    style={styles.loginButtonViewlogin}
                    onPress={() => {
                        handleLogin();
                    }}
                >
                    <Icon name="login" size={25} color="#fff" />
                    <Text style={styles.loginButtonlogin}> Đăng nhập</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.loginButtonViewGoogle}>
                    <Icon
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
                    <Icon name="facebook" size={33} color="#0571E6" />
                    <Text style={styles.loginButtonFb}>
                        {" "}
                        Đăng nhập với Facebook
                    </Text>
                </TouchableOpacity>

                <View style={styles.loginViewNoEmail}>
                    <Text style={styles.loginTextNoEmail}>
                        Chưa có tài khoản?{" "}
                    </Text>
                    <Text
                        style={styles.loginButtonNoEmail}
                        onPress={() => {
                            navigate("Register");
                        }}
                    >
                        Đăng kí
                    </Text>
                </View>
            </View>
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
        fontSize: 15,
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
        fontSize: 15,
    },

    loginViewNoEmail: {
        flexDirection: "row",
        marginHorizontal: 20,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 63,
    },
    loginTextInputPassword: {
        flex: 1,
        fontSize: 15,
    },
    loginTextNoEmail: {
        color: "#B0ADAD",
        fontSize: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#FF6363",
    },

    loginButtonNoEmail: {
        fontSize: 15,
        color: "#FF6363",
        textDecorationStyle: "solid",
        textDecorationColor: "#FF6363",
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
