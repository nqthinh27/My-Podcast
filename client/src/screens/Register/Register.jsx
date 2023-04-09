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

function Register(props) {
    const navigation = useNavigation();
    // //function of navigate
    const { navigate, goBack } = navigation;

    const [fullName, setFullName] = useState("");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repassword, setRepassword] = useState("");

    const handleRegister = async () => {
        if (password === repassword) {
            const newUser = {
                fullName: fullName,
                userName: userName,
                email: email,
                password: password
            }
            res = await axios.post(`${BASE_URL}/auth/register`, newUser);
            alert('Đăng ký thành công');
            console.log(res.data);
        } else {
            alert('Mật khẩu nhập lại không khớp');
        }
    }
    return (
        <SafeAreaView style={styles.register}>
            <View style={styles.registerHeader}>
                <Icon
                    name={"chevron-left"}
                    size={30}
                    // color={colors.primary}
                    onPress={() => {
                        navigation.goBack();
                    }}
                />
                <Text style={styles.registerTextHeader}>Đăng kí</Text>
                <Text> </Text>
            </View>

            <View style={styles.registerContainer}>
                <View style={styles.registerViewInputForm}>
                    <TextInput
                        style={styles.registerInputText}
                        placeholder="Họ và tên"
                        value={fullName}
                        onChangeText={setFullName}
                    ></TextInput>
                </View>
                <View style={styles.registerViewInputForm}>
                    <TextInput
                        style={styles.registerInputText}
                        placeholder="Tên người dùng"
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
                        placeholder="Mật khẩu"
                        secureTextEntry={true}
                        value={password}
                        onChangeText={setPassword}
                    ></TextInput>
                </View>

                <View style={styles.registerViewInputForm}>
                    <TextInput
                        style={styles.registerInputText}
                        placeholder="Nhập lại Mật khẩu"
                        secureTextEntry={true}
                        value={repassword}
                        onChangeText={setRepassword}
                    ></TextInput>
                </View>

                <TouchableOpacity
                    style={styles.registerViewButtonRegister}
                    onPress={handleRegister}
                >
                    <Text style={styles.registerButtonRegister}>Đăng ký</Text>
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
                        Đã có tài khoản?{" "}
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
