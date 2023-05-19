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
    TouchableWithoutFeedback,
    Keyboard
} from "react-native";
import GlobalStyles from "../components/GlobalStyles";
import { useEffect, useState, useRef } from "react";
import { warningLogin } from "../ultis/warning";
import { useSelector } from "react-redux";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import EntypoIcon from "react-native-vector-icons/Entypo";
import FeatherIcon from "react-native-vector-icons/Feather";
import colors from "../constants/colors";
import CheckboxGroup from "react-native-checkbox-group";
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import firebase from '../../config';
import { getPublicDataAPI, postDataAPI } from "../ultis/fetchData";
import { device } from "../constants/device";
import Loading from "../components/Loading";
import { darkPost, lightPost } from "../constants/darkLight/themePost";

function Post(props) {
    const navigation = useNavigation();
    const currentUser = useSelector((state) => state.auth.login.currentUser);
    const access_token = useSelector((state) => state.auth.login.access_token);
    const isFocused = useIsFocused();
    useEffect(() => {
        if (isFocused && !currentUser) {
            warningLogin(navigation.navigate, 'Login', 'Home');
        }
    }, [isFocused]);
    // handle title, content
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [keyboardOpen, setKeyboardOpen] = useState(false);
    const handlePressOutside = () => {
        if (keyboardOpen) {
            Keyboard.dismiss();
            setKeyboardOpen(false);
        }
    };

    const currentLanguage = useSelector(
        (state) => state.language.currentLanguage
    );
    const isDarkTheme = useSelector((state) => state.theme.isDarkTheme);


    const handleKeyboardDidShow = () => {
        setKeyboardOpen(true);
    };

    const handleKeyboardDidHide = () => {
        console.log('hide');
        setKeyboardOpen(false);
    };
    // Handle pick image
    const [image, setImage] = useState(null);
    const [uploadingImage, setUploadingImage] = useState(false);
    const pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditting: true,
                aspect: [4, 3],
                quality: 1,
            });
            const source = { uri: result.assets[0].uri };
            setImage(source);
        } catch (err) {
            console.log(err);
        }
    }
    const uploadImage = async (name) => {
        setUploadingImage(true);
        const response = await fetch(image.uri);
        const blob = await response.blob();
        const extension = image.uri.substring(image.uri.lastIndexOf('.') + 1);
        const filename = name + '.' + extension;
        // const filename = 'test.' + extension;
        const ref = firebase.storage().ref().child('post/image/' + filename);
        try {
            const snapshot = await ref.put(blob);
            const imageUrl = await snapshot.ref.getDownloadURL();
            setUploadingImage(false);
            // alert('Photo uploaded!!');
            setImage(null);
            return imageUrl;
        } catch (error) {
            console.log(error);
            setUploadingImage(false);
            alert('Error uploading Photo');
            return null;
        }
    }
    // handle pick audio
    const [audio, setAudio] = useState(null);
    const [uploadingAudio, setUploadingAudio] = useState(false);
    const pickAudio = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: 'audio/*',
            });
            setAudio(result);
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                // User cancelled the picker
            } else {
                // Error
                console.log(err);
            }
        }
    };
    const uploadAudio = async (name) => {
        if (!audio) return;
        setUploadingAudio(true);
        const response = await fetch(audio.uri);
        const blob = await response.blob();
        const extension = audio.uri.substring(audio.uri.lastIndexOf('.') + 1);
        const filename = name + '.' + extension;
        const ref = firebase.storage().ref().child('post/audio/' + filename);
        try {
            const snapshot = await ref.put(blob);
            const audioUrl = await snapshot.ref.getDownloadURL();
            setUploadingAudio(false);
            // alert('Audio uploaded!');
            setAudio(null);
            return audioUrl;
        } catch (error) {
            console.log(error);
            setUploadingAudio(false);
            alert('Error uploading audio');
            return null;
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
    // handle post
    const [isLoading, setIsLoading] = useState(false);
    const handlePost = async () => {
        setIsLoading(true);
        const imageUrl = await uploadImage(title);
        const audioUrl = await uploadAudio(title);
        const newPost = {
            title: title,
            content: content,
            image: imageUrl,
            audio: audioUrl,
            tag: topicSelected,
        };
        setTopicSelected([]);
        setContent('');
        setTitle('');
        const post = await postDataAPI('post', newPost, access_token);
        setIsLoading(false);
        alert('Đăng bài thành công');
        const recipientsAPI = await getPublicDataAPI(`follow/${currentUser._id}/followers`);
        const recipients = recipientsAPI.data.follower;
        const notifies = {
            recipients: recipients,
            content: `@${currentUser.userName} đã đăng tải một bài viết mới: ${title}`,
            image: imageUrl,
        }
        await postDataAPI(`/notify/createMany`, notifies, access_token);
    }

    if (!currentUser) return (<View></View>);

    return (
        <SafeAreaView style={[GlobalStyles.customSafeArea, isDarkTheme ? darkPost.background : lightPost.background]}>

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
                            style={[{
                                fontSize: 17,
                                marginLeft: 8,
                                fontWeight: "600",
                            }, isDarkTheme ? darkPost.text : lightPost.text]}
                        >
                            {currentUser.fullName}
                        </Text>
                        <Text style={[{
                            fontSize: 15,
                            marginLeft: 8,
                        }, isDarkTheme ? darkPost.text : lightPost.text]}>@{currentUser.userName}</Text>
                    </View>
                </View>

                {(title.length === 0 || topicSelected.length === 0 || image == null || audio == null) ?
                    <View
                        style={[styles.postHeaderFailed]}
                    >
                        <Text
                            style={{
                                fontSize: 16,
                                color: "#fff",
                                fontWeight: "500",
                            }}
                        >
                            {currentLanguage === "vi" ? "Chia sẻ" : "Share"}
                        </Text>
                    </View>
                    :
                    <TouchableOpacity
                        style={styles.postHeaderSuccess}
                        onPress={handlePost}
                    >
                        <Text
                            style={{
                                fontSize: 16,
                                color: "#fff",
                                fontWeight: "500",
                            }}
                        >
                            {currentLanguage === "vi" ? "Chia sẻ" : "Share"}
                        </Text>
                    </TouchableOpacity>}
            </View>

            <View style={[styles.postContainer, isDarkTheme ? darkPost.background : lightPost.background]}>
                <View style={styles.postTextQuestion}>
                    <TextInput
                        value={title}
                        onChangeText={setTitle}
                        style={[{ fontSize: 18, marginBottom: 10, fontWeight: '500', marginRight: 32 }, isDarkTheme ? darkPost.text : lightPost.text]}
                        placeholder={currentLanguage === "vi" ? "Nhập tiêu đề của Podcast" : "Enter the title of the podcast"}
                        placeholderTextColor={isDarkTheme ? darkPost.placeholder.color : lightPost.placeholder.color}
                    ></TextInput>

                    <TouchableOpacity style={{ flex: 1 }} onPress={handlePressOutside} activeOpacity={1.0}>
                        <View>
                            <TextInput
                                value={content}
                                onChangeText={setContent}
                                style={[{
                                    fontSize: 16,
                                    minHeight: 100,
                                    marginRight: 32
                                }, isDarkTheme ? darkPost.text : lightPost.text]}
                                placeholder={currentLanguage === "vi" ? "Nhập dòng trạng thái đăng tải" : "Enter the post status line"}
                                placeholderTextColor={isDarkTheme ? darkPost.placeholder.color : lightPost.placeholder.color}
                                // autoCapitalize="words"
                                multiline={true}
                                onFocus={handleKeyboardDidShow}
                            />
                        </View>
                    </TouchableOpacity>
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
                                <View style={[styles.modalView, isDarkTheme ? darkPost.background : lightPost.background]}>
                                    <ScrollView>
                                        <CheckboxGroup
                                            callback={(selected) => {
                                                setTopicSelected(selected);
                                            }}
                                            iconColor={colors.primary}
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
                                            labelStyle={[{
                                                color: "#333",
                                                alignSelf: "center",
                                                fontSize: 16,
                                            }, isDarkTheme ? darkPost.text : lightPost.text]}
                                            rowStyle={{
                                                flexDirection: "row",
                                            }}
                                            rowDirection={"column"}
                                        />
                                    </ScrollView>
                                    <Pressable
                                        style={{
                                            backgroundColor: colors.primary,
                                            borderRadius: 20,
                                            padding: 10,
                                            elevation: 2,
                                        }}
                                        onPress={() =>
                                            setModalVisible(!modalVisible)
                                        }
                                    >
                                        <Text style={styles.textStyle}>
                                            {currentLanguage === "vi" ? "Ẩn chủ đề" : "Hide topic"}
                                        </Text>
                                    </Pressable>
                                </View>
                            </Modal>
                            {/* <Pressable
                                style={{
                                    borderRadius: 20,
                                    // padding: 10,
                                    elevation: 2,
                                }}
                            > */}
                            <Text
                                style={[{
                                    color: "black",
                                    // fontWeight: "bold",
                                    // textAlign: "center",
                                    fontSize: 16,
                                }, isDarkTheme ? darkPost.text : lightPost.text]}
                            >
                                {currentLanguage === "vi" ? "Thêm chủ đề Podcast" : "Add Podcast topic"}
                            </Text>
                            {/* </Pressable> */}

                            {topicSelected.length === 0 ?
                                <EntypoIcon
                                    name={"chevron-small-right"}
                                    size={19} />
                                :
                                <FeatherIcon name="check" size={19} color={colors.primary} />}
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
                            <Text style={[{ color: "black", fontSize: 16 }, isDarkTheme ? darkPost.text : lightPost.text]}>
                                {currentLanguage === "vi" ? "Thêm ảnh mô tả" : "Add description image"}
                            </Text>
                            {image == null ?
                                <EntypoIcon
                                    name={"chevron-small-right"}
                                    size={19} />
                                :
                                <FeatherIcon name="check" size={19} color={colors.primary} />}
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
                            <Text style={[{ color: "black", fontSize: 16 }, isDarkTheme ? darkPost.text : lightPost.text]}>
                                {currentLanguage === "vi" ? "Thêm tập tin âm thanh" : "Add audio file"}
                            </Text>
                            {audio == null ?
                                <EntypoIcon
                                    name={"chevron-small-right"}
                                    size={19} />
                                :
                                <FeatherIcon name="check" size={19} color={colors.primary} />}
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            {isLoading && < Loading />}
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

    postHeaderFailed: {
        backgroundColor: "#ccc",
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
