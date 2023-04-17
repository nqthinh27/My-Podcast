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
import RNPickerSelect from "react-native-picker-select";

function EditProfile(props) {
    // navigation
    // const { navigation, route } = props;
    // //function of navigate
    // const { navigate, goback } = navigation;

    const [name, setName] = useState("");
    const [avatar, setAvatar] = useState(null);
    const [gender, setGender] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [story, setStory] = useState("");
    const [website, setWebsite] = useState("");

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
                <Text style={styles.editprofileTextHeader}>
                    Chỉnh sửa hồ sơ
                </Text>
                
                <TouchableOpacity
                    style={{
                        backgroundColor: colors.primary,
                        padding: 7,
                        borderRadius: 7,
                        justifyContent: "flex-end",
                    }}
                    onPress={() => {
                        // navigate("SuccessP");
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
                    <Text>Sửa</Text>
                </TouchableOpacity>
            </View>

            <View style={{ marginHorizontal: 16 }}>
                <View style={styles.editprofileText}>
                    <Text
                        style={{
                            fontWeight: "bold",
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
                            fontSize: 15,
                            paddingBottom: 5,
                        
                        }}
                        secureTextEntry={false}
                    ></TextInput>
                </View>

                <View style={styles.editprofileText}>
                    <Text
                        style={{
                            fontWeight: "bold",
                            fontSize: 17,
                            color: colors.primary,
                        }}
                    >
                        Tên người dùng:
                    </Text>
                </View>
                <View style={styles.editprofileInput}>
                    <TextInput
                        style={{
                            fontSize: 15,
                            paddingBottom: 5,
                        }}
                        secureTextEntry={false}
                    ></TextInput>
                </View>

                <View style={styles.editprofileText}>
                    <Text
                        style={{
                            fontWeight: "bold",
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
                    />
                </View>

                <View style={styles.editprofileText}>
                    <Text
                        style={{
                            fontWeight: "bold",
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
                            fontSize: 15,
                            paddingBottom: 5,
                        }}
                        secureTextEntry={false}
                    ></TextInput>
                </View>

                <View style={styles.editprofileText}>
                    <Text
                        style={{
                            fontWeight: "bold",
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
                            fontSize: 15,
                            paddingBottom: 5,
                        }}
                        secureTextEntry={false}
                    ></TextInput>
                </View>

                <View style={styles.editprofileText}>
                    <Text
                        style={{
                            fontWeight: "bold",
                            fontSize: 17,
                            color: colors.primary,
                        }}
                    >
                        Tiểu sử:
                    </Text>
                </View>
                <View style={styles.editprofileInput}>
                    <TextInput
                        style={{
                            fontSize: 15,
                            paddingBottom: 5,
                        }}
                        secureTextEntry={false}
                    ></TextInput>
                </View>

                <View style={styles.editprofileText}>
                    <Text
                        style={{
                            fontWeight: "bold",
                            fontSize: 17,
                            color: colors.primary,
                        }}
                    >
                        Website:
                    </Text>
                </View>
                <View style={styles.editprofileInput}>
                    <TextInput
                        style={{
                            fontSize: 15,
                            paddingBottom: 5,
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
