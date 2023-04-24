import {
    Text,
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    TextInput,
    SafeAreaView,
    Button,
    ScrollView,
    Alert,
    Modal,
    Pressable,
} from "react-native";
import GlobalStyles from "../components/GlobalStyles";
import { useEffect, useState, useRef } from "react";
import { warningLogin } from "../ultis/warning";
import { useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Entypo";
import colors from "../constants/colors";
import DocumentPicker from "react-native-document-picker";
import { ImagePicker } from "react-native-image-picker";
import { xorBy } from "lodash";
import CheckboxGroup from "react-native-checkbox-group";

function Post(props) {
    const { navigation, route } = props;
    const { navigate, goback } = navigation;
    const currentUser = useSelector((state) => state.auth.login.currentUser);
    const isFocused = useIsFocused();
    useEffect(() => {
        if (isFocused && !currentUser) {
            // navigate("MyProfile");
            warningLogin(navigate, 'Login', 'Home');
        }
    }, [isFocused]);
    const [modalVisible, setModalVisible] = useState(false);

    const [song, setSong] = useState(null);

    const handleSongPicker = async () => {
        try {
            const result = await DocumentPicker.pick({
                type: [DocumentPicker.types.audio],
            });
            setSong(result);
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                // User cancelled the picker
            } else {
                // Error
                console.log(err);
            }
        }
    };

    const [imageUri, setImageUri] = useState(null);

    const chooseImageHandler = () => {
        ImagePicker.launchImageLibrary({ mediaType: "photo" }, (response) => {
            if (response.uri) {
                setImageUri(response.uri);
            }
        });
    };

    return (
        <SafeAreaView style={[GlobalStyles.customSafeArea, { backgroundColor: '#fff' }]}>
            <View style={styles.postHeader}>
                <View style={styles.postAvatar}>
                    <Image
                        source={{
                            uri: "https://firebasestorage.googleapis.com/v0/b/mypodcast-88135.appspot.com/o/avatar.jpg?alt=media&token=fc074eb8-e67f-4235-8230-160cae1557b5",
                        }}
                        style={{
                            width: 44,
                            height: 44,
                            borderRadius: 100,
                        }}
                    />
                    <View style={{ flexDirection: 'column' }}>
                        <Text
                            style={{
                                fontSize: 15,
                                marginLeft: 7,
                                fontWeight: "bold",
                            }}
                        >
                            {currentUser.fullName}
                        </Text>
                        <Text>@{currentUser.userName}</Text>
                    </View>
                </View>

                <TouchableOpacity
                    style={styles.postHeaderSuccess}
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
                        Chia sẻ
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.postContainer}>
                <View style={styles.postTextQuestion}>
                    <TextInput
                        style={{ fontSize: 16, marginBottom: 10 }}
                        placeholder="Nhập tiêu đề của Podcast"
                        secureTextEntry={false}
                        autoCapitalize="words"
                    // placeholderTextColor="black"
                    ></TextInput>

                    <TextInput
                        style={{ fontSize: 15 }}
                        placeholder="Nhập dòng trạng thái đăng tải"
                    ></TextInput>
                </View>

                <View style={styles.postFooter}>
                    <View style={styles.postIngredient}>
                        <View
                            style={{
                                // flex: 1.5,
                                marginHorizontal: 16,
                            }}
                        >
                            <Image
                                source={{
                                    uri: "https://firebasestorage.googleapis.com/v0/b/mypodcast-88135.appspot.com/o/icon%2Fico_topic.png?alt=media&token=0ee99efb-4bd8-4ad8-975f-ffbfe2757a86",
                                }}
                                style={{
                                    width: 20,
                                    height: 25,
                                }}
                            />
                        </View>

                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                flex: 1,
                                marginRight: 16,
                            }}
                        >
                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={modalVisible}
                                onRequestClose={() => {
                                    Alert.alert("Modal has been closed.");
                                    setModalVisible(!modalVisible);
                                }}
                            >
                                <View style={styles.modalView}>
                                    <CheckboxGroup
                                        callback={(selected) => {
                                            console.log(selected);
                                        }}
                                        iconColor={"#00a2dd"}
                                        iconSize={30}
                                        checkedIcon="ios-checkbox-outline"
                                        uncheckedIcon="ios-square-outline"
                                        checkboxes={[
                                            {
                                                label: "Chủ đề 1 nè", // label for checkbox item
                                                value: "Chủ đề 1 nè", // selected value for item, if selected, what value should be sent?
                                                selected: true, // if the item is selected by default or not.
                                            },
                                            {
                                                label: "Chủ đề 2 nè",
                                                value: "Chủ đề 2 nè",
                                            },
                                            {
                                                label: "Chủ đề 3 nè",
                                                value: "Chủ đề 3 nè",
                                            },
                                            {
                                                label: "Chủ đề 4 nè",
                                                value: "Chủ đề 4 nè",
                                            },
                                            {
                                                label: "Chủ đề 5 nè",
                                                value: "Chủ đề 5 nè",
                                            },
                                            {
                                                label: "Chủ đề 6 nè",
                                                value: "Chủ đề 6 nè",
                                            },
                                        ]}
                                        labelStyle={{
                                            color: "#333",
                                            alignSelf: "center",
                                            fontSize: 16,
                                        }}
                                        rowStyle={{
                                            flexDirection: "row",
                                        }}
                                        rowDirection={"column"}
                                    />
                                    <Pressable
                                        style={{
                                            backgroundColor: "#2196F3",
                                            borderRadius: 20,
                                            padding: 10,
                                            elevation: 2,
                                        }}
                                        onPress={() =>
                                            setModalVisible(!modalVisible)
                                        }
                                    >
                                        <Text style={styles.textStyle}>
                                            Ẩn chủ đề
                                        </Text>
                                    </Pressable>
                                </View>
                            </Modal>
                            <Pressable
                                style={{
                                    borderRadius: 20,
                                    // padding: 10,
                                    elevation: 2,
                                }}
                                onPress={() => setModalVisible(true)}
                            >
                                <Text
                                    style={{
                                        color: "black",
                                        // fontWeight: "bold",
                                        // textAlign: "center",
                                        fontSize: 16,
                                    }}
                                >
                                    Thêm chủ đề Podcast
                                </Text>
                            </Pressable>
                            <Icon
                                name={"chevron-small-right"}
                                size={19}
                                onPress={() => {
                                    navigate("UIScreen");
                                }}
                            />
                        </View>


                    </View>

                    <View style={styles.postIngredient}>
                        <View
                            style={{
                                // flex: 1.5,
                                marginHorizontal: 16,
                            }}
                        >
                            <Image
                                source={{
                                    uri: "https://firebasestorage.googleapis.com/v0/b/mypodcast-88135.appspot.com/o/icon%2Fico_img.png?alt=media&token=41e7cc01-c0ed-4e88-9e03-44af9c05fc4a",
                                }}
                                style={{
                                    width: 20,
                                    height: 25,
                                }}
                            />
                        </View>

                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                flex: 1,
                                marginRight: 16,
                            }}
                        >
                            <TouchableOpacity onPress={chooseImageHandler}>
                                <Text style={{ color: "black", fontSize: 16 }}>
                                    Chọn ảnh
                                </Text>
                            </TouchableOpacity>
                            {imageUri && (
                                <Image
                                    source={{ uri: imageUri }}
                                    style={{ width: 200, height: 200 }}
                                />
                            )}
                            <Icon
                                name={"chevron-small-right"}
                                size={19}
                                onPress={() => {
                                    navigate("UIScreen");
                                }}
                            />
                        </View>
                    </View>

                    <View style={styles.postIngredient}>
                        <View
                            style={{
                                // flex: 1.5,
                                marginHorizontal: 16,
                            }}
                        >
                            <Image
                                source={{
                                    uri: "https://firebasestorage.googleapis.com/v0/b/mypodcast-88135.appspot.com/o/icon%2Fico_song.png?alt=media&token=329f90e9-4f6b-434e-b454-d0846284d2d0",
                                }}
                                style={{
                                    width: 20,
                                    height: 25,
                                }}
                            />
                        </View>

                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                flex: 1,
                                marginRight: 16,
                            }}
                        >
                            {song && <Text>{song.name}</Text>}
                            <TouchableOpacity onPress={handleSongPicker}>
                                <Text style={{ color: "black", fontSize: 16 }}>
                                    Chọn tập tin
                                </Text>
                            </TouchableOpacity>
                            <Icon
                                name={"chevron-small-right"}
                                size={19}
                                onPress={() => {
                                    navigate("UIScreen");
                                }}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    postHeader: {
        // flex: 1,

        marginHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    postHeaderSuccess: {
        backgroundColor: colors.primary,
        padding: 7,
        borderRadius: 7,
        justifyContent: "flex-end",
    },

    postContainer: {
        flex: 1.5,
        backgroundColor: "#fff",
        alignItems: "flex-start",
        justifyContent: "space-between",
        marginTop: 16,
    },

    postAvatar: {
        // flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        // marginHorizontal: 20,
    },

    postTextQuestion: {
        flex: 5,
        marginLeft: 20,
        alignSelf: "flex-start",
        width: "100%",
    },

    postAudio: {
        flexDirection: "row",
        backgroundColor: "#D9D9D9",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
        height: 93,
    },

    postAudioName: {
        flex: 6,
        height: "60%",
        alignContent: "center",
        justifyContent: "space-between",
    },

    postSlider: {
        width: "90%",
        alignSelf: "flex-start",
    },

    postFooter: {
        width: "100%",
        paddingBottom: 10,
        height: "30%",
        borderTopWidth: 1,
        borderTopColor: "#C0C0C0",
    },

    postIngredient: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        height: 50,
        borderRadius: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#C0C0C0",
    },

    modalView: {
        flex: 1,
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 16,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        // width: "90%",
    },
    postTopic: {
        // backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
    },
});
export default Post;
