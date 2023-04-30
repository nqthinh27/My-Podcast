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
import { useIsFocused, useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Entypo";
import colors from "../constants/colors";
import DocumentPicker from "react-native-document-picker";
// import { ImagePicker } from "react-native-image-picker";
import { xorBy } from "lodash";
import CheckboxGroup from "react-native-checkbox-group";
import * as ImagePicker from 'expo-image-picker';
import firebase from '../../config';
import { getPublicDataAPI } from "../ultis/fetchData";
// Tạo tham chiếu đến Firebase Storage

function Post(props) {
    const navigation = useNavigation();
    const currentUser = useSelector((state) => state.auth.login.currentUser);
    const isFocused = useIsFocused();
    useEffect(() => {
        if (isFocused && !currentUser) {
            // navigate("MyProfile");
            warningLogin(navigation.navigate, 'Login', 'Home');
        }
    }, [isFocused]);
    // Handle pick image
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditting: true,
                aspect: [4, 3],
                quality: 1,
            });
            const source = { uri: result.assets[0].uri };
            console.log((source));
            setImage(source);
        } catch (err) {
            console.log(err);
        }
    }
    const uploadImage = async () => {
        setUploading(true);
        const response = await fetch(image.uri);
        const blob = await response.blob();
        const extension = image.uri.substring(image.uri.lastIndexOf('.') + 1);
        const filename = 'test.' + extension;
        var ref = firebase.storage().ref().child(filename).put(blob);
        try {
            await ref;
        } catch (e) {
            console.log(e);
        }
        setUploading(false);
        alert('Photo uploaded...!!');
        setImage(null);
    }
    // handle pick audio
    const [audio, setAudio] = useState(null);
    const pickAudio = async () => {
        try {
            const result = await DocumentPicker.pick({
                type: [DocumentPicker.types.audio],
            });
            const source = { uri: result.assets[0].uri };
            console.log((source));
            setAudio(result);
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                // User cancelled the picker
            } else {
                // Error!
            }
        }
    };
    // handle topic
    const [modalVisible, setModalVisible] = useState(false);
    const [topicSelected, setTopicSelected] = useState([]);
    const [topics, setTopics] = useState([]);
    const fetchTopicsData = async () => {
        const topicsResponse = await getPublicDataAPI('tag');
        setTopics(topicsResponse.data);
    }
    useEffect(() => {
        fetchTopicsData();
    }, []);
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

    if (!currentUser) return (<View></View>);

    return (
        <SafeAreaView style={[GlobalStyles.customSafeArea, { backgroundColor: '#fff' }]}>
            <View style={styles.postHeader}>
                <View style={styles.postAvatar}>
                    <Image
                        source={{
                            uri: currentUser.avatar,
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
                                fontSize: 17,
                                marginLeft: 8,
                                fontWeight: "600",
                            }}
                        >
                            {currentUser.fullName}
                        </Text>
                        <Text style={{
                            fontSize: 15,
                            marginLeft: 8,
                        }}>@{currentUser.userName}</Text>
                    </View>
                </View>

                <TouchableOpacity
                    style={styles.postHeaderSuccess}
                    onPress={uploadImage}
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
                        style={{ fontSize: 18, marginBottom: 10, fontWeight: '500' }}
                        placeholder="Nhập tiêu đề của Podcast"
                        secureTextEntry={false}
                        autoCapitalize="words"
                    // placeholderTextColor="black"
                    ></TextInput>

                    <TextInput
                        style={{ fontSize: 16 }}
                        placeholder="Nhập dòng trạng thái đăng tải"
                    ></TextInput>
                </View>

                <View style={styles.postFooter}>
                    <TouchableOpacity
                        style={styles.postIngredient}
                        onPress={() => setModalVisible(true)}
                    >
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
                                    <ScrollView>
                                        <CheckboxGroup
                                            callback={(selected) => {
                                                setTopicSelected(selected);
                                            }}
                                            iconColor={"#00a2dd"}
                                            iconSize={30}
                                            checkedIcon="ios-checkbox-outline"
                                            uncheckedIcon="ios-square-outline"
                                            checkboxes={
                                                topics.map(item => {
                                                    return {
                                                        label: item, // label for checkbox item
                                                        value: item, // selected value for item, if selected, what value should be sent?
                                                        selected: topicSelected.includes(item),
                                                    }
                                                })
                                            }
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
                                    </ScrollView>
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
                            />
                        </View>


                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.postIngredient}
                        onPress={pickImage}
                    >
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
                            <Text style={{ color: "black", fontSize: 16 }}>
                                Thêm ảnh mô tả
                            </Text>
                            {/* {image && (
                                <Image
                                    source={{ uri: image.uri }}
                                    style={{ width: 200, height: 200 }}
                                />
                            )} */}
                            <Icon
                                name={"chevron-small-right"}
                                size={19}
                            />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.postIngredient}
                        onPress={pickAudio}
                    >
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
                            {/* {song && <Text>{song.name}</Text>} */}
                            <Text style={{ color: "black", fontSize: 16 }}>
                                Thêm tập tin âm thanh
                            </Text>
                            <Icon
                                name={"chevron-small-right"}
                                size={19}
                            />
                        </View>
                    </TouchableOpacity>
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
        marginVertical: 50,
        marginHorizontal: 20,
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
