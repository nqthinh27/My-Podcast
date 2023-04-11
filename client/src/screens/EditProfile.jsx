import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    SafeAreaView,
    Image,
} from "react-native";
import { React, useState } from "react";
import colors from "../constants/colors";
import Icon from "react-native-vector-icons/Entypo";

function EditProfile(props) {
    // navigation
    const { navigation, route } = props;
    //function of navigate
    const { navigate, goback } = navigation;


    return (
        <SafeAreaView style={styles.editprofile}>
            <View style={styles.editprofileHeader}>
                <Icon
                    name={"chevron-left"}
                    size={30}
                    // color={colors.primary}
                    onPress={() => {
                        navigate("MyProfile");
                    }}
                />
                <Text style={styles.editprofileTextHeader}>Chỉnh sửa hồ sơ</Text>
                <Icon
                    name={"check"}
                    size={30}
                    // color={colors.primary}
                    onPress={() => {
                        navigate("MyProfile");
                    }}
                />
            </View>

            <View style={styles.editprofileAvatar}>
                <Image
                    style={{
                        width: 120,
                        height: 120,
                        borderRadius: 100,
                        alignSelf: "center",
                    }}
                    source={{
                        uri: "https://firebasestorage.googleapis.com/v0/b/mypodcast-88135.appspot.com/o/avatar%2Favatar.jpg?alt=media&token=86e28ad4-dbfd-4a26-88cc-2ff14271f363",
                    }}
                />

                <TouchableOpacity
                    style={{
                        position: "absolute",
                        bottom: 0,
                        right: 150,
                        backgroundColor: "#D6D6D6",
                        padding: 10,
                        borderRadius: 100,
                    }}
                    onPress={() => console.log("Edit image")}
                >
                    <Text>Edit</Text>
                </TouchableOpacity>
            </View>

            <View style={{ marginHorizontal: 16 }}>
                <View style={styles.editprofileText}>
                    <Text
                        style={{
                            fontWeight: "bold",
                            fontSize: 17,
                            
                        }}
                    >
                        Địa chỉ Email
                    </Text>
                </View>
                <View style={styles.editprofileInput}>
                    <TextInput
                        style={{
                            fontSize: 15,
                        }}
                        secureTextEntry={false}
                    ></TextInput>
                </View>

                <View style={styles.editprofileText}>
                    <Text
                        style={{
                            fontWeight: "bold",
                            fontSize: 17,
                        }}
                    >
                        Mật khẩu
                    </Text>
                </View>
                <View style={styles.editprofileInput}>
                    <TextInput
                        style={{
                            fontSize: 15,
                        }}
                        secureTextEntry={false}
                    ></TextInput>
                </View>

                <View style={styles.editprofileText}>
                    <Text
                        style={{
                            fontWeight: "bold",
                            fontSize: 17,
                        }}
                    >
                        Số điện thoại
                    </Text>
                </View>
                <View style={styles.editprofileInput}>
                    <TextInput
                        style={{
                            fontSize: 15,
                        }}
                        secureTextEntry={false}
                    ></TextInput>
                </View>

                <View style={styles.editprofileText}>
                    <Text
                        style={{
                            fontWeight: "bold",
                            fontSize: 17,
                        }}
                    >
                        Nhập địa chỉ Email
                    </Text>
                </View>
                <View style={styles.editprofileInput}>
                    <TextInput
                        style={{
                            fontSize: 15,
                        }}
                        secureTextEntry={false}
                    ></TextInput>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    editprofile: {
        flex: 1,
        backgroundColor: "#fff",
    },

    editprofileHeader: {
        // flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginHorizontal: 16,
    },

    editprofileTextHeader: {
        fontWeight: "bold",
        fontSize: 21,
    },

    editprofileText: {
        alignSelf: "flex-start",
        marginTop: 30,
    },

    editprofileInput: {
        // marginHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#C0C0C0",
        width: "100%",
        paddingTop: 10
    },

    
});

export default EditProfile;
