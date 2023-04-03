import {
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    Touchable,
    TouchableOpacity,
    View,
} from "react-native";
import { React, useState } from "react";
import colors from "../../constants/colors";
import Icon from "react-native-vector-icons/Entypo";

function NewPassword(props) {
    //navigation
    // const { navigation, route } = props;
    // //function of navigate
    // const { navigate, goback } = navigation;

    const [password, setPassword] = useState("");
    const [repassword, setRepassword] = useState("");

    return (
        <SafeAreaView style={styles.newpassword}>
            <View style={styles.newpwHeader}>
                <Icon
                    name={"chevron-left"}
                    size={30}
                    onPress={() => {
                        navigate("ForgotPasswordSc");
                    }}
                />
                <Text style={styles.newpwTextHeader}>Mật Khẩu Mới</Text>
                <Text> </Text>
            </View>

            <View style={styles.newpwContainer}>
                <View style={styles.newpwViewText}>
                    <Text style={styles.newpwText}>Nhập Mật Khẩu Mới</Text>
                </View>
                <View style={styles.newpwViewInput}>
                    <TextInput
                        style={styles.newpwTextInput}
                        placeholder=""
                        secureTextEntry={true}
                        onChangeText={setPassword}
                    ></TextInput>
                </View>

                <View style={styles.newpwViewText}>
                    <Text style={styles.newpwText}>Xác Nhận Mật Khẩu Mới</Text>
                </View>
                <View style={styles.newpwViewInput}>
                    <TextInput
                        style={styles.newpwTextInput}
                        placeholder=""
                        secureTextEntry={true}
                        onChangeText={setRepassword}
                    ></TextInput>
                </View>

                <TouchableOpacity
                    style={styles.newpwButton}
                    onPress={() => {
                        navigate("SuccessFP");
                    }}
                >
                    <Text
                        style={{
                            color: "white",
                            fontSize: 17,
                            fontWeight: "bold",
                        }}
                    >
                        Xác Nhận
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    newpassword: {
        flex: 1,
        backgroundColor: "#fff",
    },

    newpwHeader: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
    },

    newpwTextHeader: {
        fontWeight: "bold",
        fontSize: 21,
    },

    newpwContainer: {
        flex: 20,
        backgroundColor: "#fff",
        alignItems: "center",
        marginTop: "20%",
        marginHorizontal: 16
    },

    newpwViewText: {
        alignSelf: "flex-start",
        marginTop: 27,
    },
    newpwText: {
        fontWeight: "bold",
        fontSize: 17,
    },
    newpwViewInput: {
        marginHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#C0C0C0",
        width: "100%",
        marginTop: 27,
    },

    newpwTextInput: {
        fontSize: 15,
    },

    newpwButton: {
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

export default NewPassword;
