import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    SafeAreaView,
    Image,
    KeyboardAvoidingView,
    ScrollView,
    Alert
} from "react-native";
import GlobalStyles from "../../components/GlobalStyles";
import { React, useState } from "react";
import colors from "../../constants/colors";
import Icon from "react-native-vector-icons/Entypo";
import RNPickerSelect from "react-native-picker-select";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import * as ImagePicker from 'expo-image-picker';
import firebase from '../../../config';
import { patchDataAPI, putDataAPI } from "../../ultis/fetchData";
import Loading from "../../components/Loading";
import { updateMyProfile } from "../../redux/actions/authApi";
import { darkProfile, lightProfile } from "../../constants/darkLight/themeProfile";

function EditProfile(props) {
    // navigation
    const navigation = useNavigation();
    const { navigate, goBack } = navigation;
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.auth.login.currentUser);
    const access_token = useSelector((state) => state.auth.login.access_token);
    const [fullName, setFullName] = useState(currentUser.fullName);
    const [userName, setUserName] = useState(currentUser.userName);
    const [avatar, setAvatar] = useState(null);
    const [gender, setGender] = useState(currentUser.gender);
    const [mobile, setMobile] = useState(currentUser.mobile);
    const [address, setAddress] = useState(currentUser.address);
    const email = currentUser.email
    const [isLoading, setIsLoading] = useState(false);
    const currentLanguage = useSelector(
        (state) => state.language.currentLanguage
    );
    const isDarkTheme = useSelector((state) => state.theme.isDarkTheme);

    // handle change avatar
    // const [image, setImage] = useState(null);
    const [uploadingAvatar, setUploadingAvatar] = useState(false);
    const pickAvatar = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditting: true,
                aspect: [4, 3],
                quality: 1,
            });
            const source = { uri: result.assets[0].uri };
            setAvatar(source);
        } catch (err) {
            console.log(err);
        }
    }
    const uploadAvatar = async (name) => {
        setUploadingAvatar(true);
        const response = await fetch(avatar.uri);
        const blob = await response.blob();
        const extension = avatar.uri.substring(avatar.uri.lastIndexOf('.') + 1);
        const filename = name + '.' + extension;
        // const filename = 'test.' + extension;
        const ref = firebase.storage().ref().child('avatar/' + filename);
        try {
            const snapshot = await ref.put(blob);
            const avatarUrl = await snapshot.ref.getDownloadURL();
            setUploadingAvatar(false);
            // alert('Photo uploaded!!');
            // setAvatar(null);
            return avatarUrl;
        } catch (error) {
            console.log(error);
            setUploadingAvatar(false);
            alert('Error uploading Photo');
            return null;
        }
    }

    const handleSave = async () => {
        setIsLoading(true);
        var avatarUrl = currentUser.avatar;
        console.log(avatar);
        console.log(avatarUrl);
        if (avatar) avatarUrl = await uploadAvatar(userName);
        const newUser = {
            avatar: avatarUrl,
            fullName: fullName,
            userName: userName,
            gender: gender,
            mobile: mobile,
            address: address
        };
        const res = await putDataAPI(`user/${currentUser._id}`, newUser, access_token);
        setAvatar(null)
        updateMyProfile(newUser, dispatch);
        setIsLoading(false);
        if (res) Alert.alert(
            'Thông báo',
            'Cập nhật thành công',
            [
                {
                    text: 'Đóng',
                    onPress: () => { }
                },
            ],
            { cancelable: false }
        );
        else Alert.alert(
            'Thông báo',
            'Đã có lỗi xảy ra, vui lòng thử lại!',
            [
                {
                    text: 'Đóng',
                    onPress: () => { }
                },
            ],
            { cancelable: false }
        );
    }

    return (
        <SafeAreaView style={[styles.editprofile, GlobalStyles.customSafeArea,isDarkTheme? darkProfile.profileContainer : lightProfile.profileContainer]}>
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
                            color={isDarkTheme ? "white" : "black"}
                        />
                        <Text
                        style={[
                            styles.editprofileTextHeader,
                            isDarkTheme
                                ? darkProfile.profileText
                                : lightProfile.profileText,
                        ]}
                    >
                            {currentLanguage === "vi" ? "Chỉnh sửa hồ sơ" : "Edit profile"}
                        </Text>

                        <TouchableOpacity
                            style={{
                                backgroundColor: (userName != currentUser.userName
                                    || fullName != currentUser.fullName
                                    // || gender != currentUser.gender
                                    || mobile != currentUser.mobile
                                    || address != currentUser.address
                                    || gender != currentUser.gender
                                    || avatar != null) ? colors.primary : colors.grey,
                                paddingVertical: 7,
                                paddingHorizontal: 15,
                                borderRadius: 7,
                                justifyContent: "flex-end",
                            }}
                            onPress={
                                (userName != currentUser.userName
                                    || fullName != currentUser.fullName
                                    // || gender != currentUser.gender
                                    || mobile != currentUser.mobile
                                    || address != currentUser.address
                                    || gender != currentUser.gender
                                    || avatar != null) ? handleSave : null
                            }
                        >
                            <Text
                                style={{
                                    fontSize: 16,
                                    color: "#fff",
                                    fontWeight: "500",
                                }}
                            >
                                {currentLanguage === "vi" ? "Lưu" : "Save"}
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
                                uri: avatar ? avatar.uri : currentUser.avatar,
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
                            onPress={pickAvatar}
                        >
                            <Text>{currentLanguage === "vi" ? "Sửa" : "Edit"}</Text>
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
                                {currentLanguage === "vi" ? "Họ tên:" : "Full name:"}
                            </Text>
                        </View>
                        <View style={styles.editprofileInput}>
                            <TextInput
                                style={[{
                                    fontSize: 17,
                                    paddingBottom: 5,

                                }, isDarkTheme ? darkProfile.profileText : lightProfile.profileText]}
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
                                style={[{
                                    fontSize: 17,
                                    paddingBottom: 5,

                                }, isDarkTheme ? darkProfile.profileText : lightProfile.profileText]}
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
                                {currentLanguage === "vi" ? "Tên người dùng:" : "User name:"}
                            </Text>
                        </View>
                        <View style={[styles.editprofileInput, { flexDirection: 'row', alignItems: 'center' }]}>
                            <Text style={isDarkTheme ? darkProfile.profileText : lightProfile.profileText}>@</Text>
                            <TextInput
                                style={[{
                                    fontSize: 17,
                                    paddingBottom: 5,
                                    flex: 1
                                }, isDarkTheme ? darkProfile.profileText : lightProfile.profileText]}
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
                                {currentLanguage === "vi" ? "Giới tính:" : "Gender:"}
                            </Text>
                        </View>
                        <View style={styles.editprofileInput}>
                            <RNPickerSelect
                                placeholder={{
                                    label: 'Chọn một mục...',
                                    value: null,
                                }}
                                onValueChange={(value) => setGender(value)}
                                items={[
                                    { label: currentLanguage === "vi" ? "Nam" : "Male", value: "male" },
                                    { label: currentLanguage === "vi" ? "Nữ" : "Female", value: "female" },
                                    { label: currentLanguage === "vi" ? "Khác" : "Other", value: "" },
                                ]}
                                style={{
                                    inputIOS: {
                                        fontSize: 17,
                                        color: isDarkTheme ? darkProfile.profileText.color : lightProfile.profileText.color,
                                    },
                                    inputAndroid: {
                                        fontSize: 17,
                                        color: isDarkTheme ? darkProfile.profileText.color : lightProfile.profileText.color,
                                    },
                                    
                                }}
                                value={gender}
                                // textStyle ={isDarkTheme ? darkProfile.profileText : lightProfile.profileText}
                                textStyle={{ color: 'green' }}

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
                                {currentLanguage === "vi" ? "Số điện thoại:" : "Phone number:"}
                            </Text>
                        </View>
                        <View style={styles.editprofileInput}>
                            <TextInput
                                style={[{
                                    fontSize: 17,
                                    paddingBottom: 5,
                                }, isDarkTheme ? darkProfile.profileText : lightProfile.profileText]}
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
                                {currentLanguage === "vi" ? "Địa chỉ:" : "Address:"}
                            </Text>
                        </View>
                        <View style={styles.editprofileInput}>
                            <TextInput
                                style={[{
                                    fontSize: 17,
                                    paddingBottom: 5,
                                }, isDarkTheme ? darkProfile.profileText : lightProfile.profileText]}
                                secureTextEntry={false}
                                value={address}
                                onChangeText={setAddress}
                            ></TextInput>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
            {isLoading && <Loading />}
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
