import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    SafeAreaView,
    Image,
    KeyboardAvoidingView,
    ScrollView
} from "react-native";
import { React, useState } from "react";
import colors from "../../constants/colors";
import Icon from "react-native-vector-icons/Entypo";
import RNPickerSelect from "react-native-picker-select";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

function EditProfile(props) {
    // navigation
    const navigation = useNavigation();
    // //function of navigate
    const { navigate, goBack } = navigation;
    const currentUser = useSelector((state) => state.auth.login.currentUser);

    const [fullName, setFullName] = useState(currentUser.fullName);
    const [userName, setUserName] = useState(currentUser.userName);
    const [avatar, setAvatar] = useState(null);
    const [gender, setGender] = useState("");
    const [mobile, setMobile] = useState(currentUser.mobile);
    const [address, setAddress] = useState(currentUser.address);
    const email = currentUser.email

    return (
        <SafeAreaView style={styles.editprofile}>
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <ScrollView>
                    <View style={styles.editprofileHeader}>
                        <Icon
                            name={"chevron-left"}
                            size={30}
                            // color={colors.primary}
                            onPress={() => {
                                goBack();
                            }}
                        />
                        <Text style={styles.editprofileTextHeader}>
                            Chỉnh sửa hồ sơ
                        </Text>

                        <TouchableOpacity
                            style={{
                                backgroundColor: (userName != currentUser.userName
                                    || fullName!= currentUser.fullName 
                                    // || gender != currentUser.gender
                                    || mobile != currentUser.mobile
                                    || address != currentUser.address ) ? colors.primary : colors.grey,
                                paddingVertical: 7,
                                paddingHorizontal: 15,
                                borderRadius: 7,
                                justifyContent: "flex-end",
                            }}
                            onPress={() => {
                                (userName != currentUser.userName
                                    || fullName!= currentUser.fullName 
                                    // || gender != currentUser.gender
                                    || mobile != currentUser.mobile
                                    || address != currentUser.address ) ? alert('Sửa thành công') : null
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 16,
                                    color: "#fff",
                                    fontWeight: "500",
                                }}
                            >
                                Lưu
                            </Text>
                        </TouchableOpacity>
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
                                uri: currentUser.avatar,
                            }}
                        />

                        <TouchableOpacity
                            style={{
                                position: "absolute",
                                bottom: 0,
                                right: 120,
                                backgroundColor: "#D6D6D6",
                                padding: 10,
                                borderRadius: 100,
                            }}
                            onPress={() => console.log("Edit image")}
                        >
                            <Text>Sửa</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ marginHorizontal: 16 }}>
                        <View style={styles.editprofileText}>
                            <Text
                                style={{
                                    fontSize: 17,
                                    color: colors.primary,
                                }}
                            >
                                Họ tên:
                            </Text>
                        </View>
                        <View style={styles.editprofileInput}>
                            <TextInput
                                style={{
                                    fontSize: 17,
                                    paddingBottom: 5,

                                }}
                                secureTextEntry={false}
                                autoCapitalize="words"
                                value={fullName}
                                onChangeText={setFullName}
                            ></TextInput>
                        </View>

                        <View style={styles.editprofileText}>
                            <Text
                                style={{
                                    fontSize: 17,
                                    color: colors.primary,
                                }}
                            >
                                Email:
                            </Text>
                        </View>
                        <View style={styles.editprofileInput}>
                            <TextInput
                                style={{
                                    fontSize: 17,
                                    paddingBottom: 5,

                                }}
                                value={email}
                            ></TextInput>
                        </View>

                        <View style={styles.editprofileText}>
                            <Text
                                style={{
                                    // fontWeight: "bold",
                                    fontSize: 17,
                                    color: colors.primary,
                                }}
                            >
                                Tên người dùng:
                            </Text>
                        </View>
                        <View style={[styles.editprofileInput, {flexDirection: 'row', alignItems: 'center'}]}>
                            <Text>@</Text>
                            <TextInput
                                style={{
                                    fontSize: 17,
                                    paddingBottom: 5,
                                    flex: 1
                                }}
                                secureTextEntry={false}
                                value={userName}
                                onChangeText={setUserName}
                                autoCapitalize="none"
                            ></TextInput>
                        </View>

                        <View style={styles.editprofileText}>
                            <Text
                                style={{
                                    // fontWeight: "bold",
                                    fontSize: 17,
                                    color: colors.primary,
                                    marginBottom: 5
                                }}
                            >
                                Giới tính:
                            </Text>
                        </View>
                        <View style={styles.editprofileInput}>
                            <RNPickerSelect
                                onValueChange={(value) => console.log(value)}
                                items={[
                                    { label: "Nam", value: "Nam" },
                                    { label: "Nữ", value: "Nữ" },
                                    { label: "Khác", value: "Khác" },
                                ]}
                                style={{
                                    inputIOS: {
                                        fontSize: 17,
                                    },
                                    inputAndroid: {
                                        fontSize: 17,
                                    },
                                }}
                            />
                        </View>

                        <View style={styles.editprofileText}>
                            <Text
                                style={{
                                    // fontWeight: "bold",
                                    fontSize: 17,
                                    color: colors.primary,
                                }}
                            >
                                Số điện thoại:
                            </Text>
                        </View>
                        <View style={styles.editprofileInput}>
                            <TextInput
                                style={{
                                    fontSize: 17,
                                    paddingBottom: 5,
                                }}
                                secureTextEntry={false}
                                keyboardType="numeric"
                                value={mobile}
                                onChangeText={setMobile}
                            ></TextInput>
                        </View>

                        <View style={styles.editprofileText}>
                            <Text
                                style={{
                                    // fontWeight: "bold",
                                    fontSize: 17,
                                    color: colors.primary,
                                }}
                            >
                                Địa chỉ:
                            </Text>
                        </View>
                        <View style={styles.editprofileInput}>
                            <TextInput
                                style={{
                                    fontSize: 17,
                                    paddingBottom: 5,
                                }}
                                secureTextEntry={false}
                                value={address}
                                onChangeText={setAddress}
                            ></TextInput>
                        </View>
                    </View>
                </ScrollView>


            </KeyboardAvoidingView>
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

    editprofileAvatar: {
        marginTop: 16,
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
        paddingTop: 10,
    },
});

export default EditProfile;
