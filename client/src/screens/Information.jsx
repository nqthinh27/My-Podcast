import { React, useState } from "react";
import {
    Text,
    View,
    Image,
    StyleSheet,
    TouchableOpacity,
    ImageBackground,
    SafeAreaView,
    ScrollView,
    TouchableWithoutFeedback,
    Keyboard,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../constants/colors";
import { TextInput } from "react-native-gesture-handler";
import Comment from "../components/Comment";
import Slider from "@react-native-community/slider";

function Information(props) {
    const { navigation, route } = props;
    const { navigate, goback } = navigation;

    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    return (
        <SafeAreaView style={styles.informationMain}>
            <View style={styles.playscreenHeader}>
                <TouchableOpacity onPress={() => {
                            navigate("PlayerScreen");
                        }}>
                    <Icon
                        name={"chevron-down"}
                        style={{}}
                        size={35}
                        color={"black"}
                        
                    />
                </TouchableOpacity>

                <TouchableOpacity>
                    <Icon name="dots-horizontal" size={35} color={"black"} />
                </TouchableOpacity>
            </View>

            <View style={{ flex: 1, marginHorizontal: 16 }}>
                <View style={styles.informationInfor}>
                    <Image
                        style={{
                            width: 129,
                            height: 129,
                            marginRight: 10,
                            borderRadius: 15,
                        }}
                        source={{
                            uri: "https://firebasestorage.googleapis.com/v0/b/mypodcast-88135.appspot.com/o/Tu%2FRectangle%2038.png?alt=media&token=780197d0-e51a-496c-8ff1-006b24341c50",
                        }}
                    />

                    <View style={styles.informationAccountInfo}>
                        <Text style={styles.informationAccountUsername}>
                            Tun Phạm
                        </Text>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={{ fontSize: 13 }}>@</Text>
                            <Text style={{ fontSize: 13 }}>username</Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <Icon name="circle-small" size={15} />
                            <Text style={{ fontSize: 13 }}>56</Text>
                            <Text style={{ fontSize: 13 }}>
                                {" "}
                                Người theo dõi
                            </Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <Icon name="circle-small" size={15} />
                            <Text style={{ fontSize: 13 }}>06</Text>
                            <Text style={{ fontSize: 13 }}> Bài đăng</Text>
                        </View>
                        <View style={styles.informationFile}>
                            <TouchableOpacity
                                style={styles.informationInteract}
                            >
                                <Text style={{ fontSize: 12 }}>Theo dõi</Text>
                                <Image
                                    source={{
                                        uri: "https://firebasestorage.googleapis.com/v0/b/mypodcast-88135.appspot.com/o/icon%2Fico_user-follow-line.png?alt=media&token=fd5930b3-e9c0-4332-9c6e-3455cff44bd2",
                                    }}
                                    style={{
                                        resizeMode: "contain",
                                        width: 14,
                                        height: 12,
                                    }}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.informationInteract}
                            >
                                <Text style={{ fontSize: 12 }}>Xem hồ sơ</Text>
                                <Image
                                    source={{
                                        uri: "https://firebasestorage.googleapis.com/v0/b/mypodcast-88135.appspot.com/o/icon%2Fico_outline-navigate-next.png?alt=media&token=fa6d02cd-f751-41f9-8a57-0b0d58afe67d",
                                    }}
                                    style={{
                                        resizeMode: "contain",
                                        width: 14,
                                        height: 14,
                                    }}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={styles.informationPlay}>
            <TouchableOpacity>
                <Icon name="play" size={30} />
            </TouchableOpacity>
            <View style={styles.informationTime}>
                <Text style={{ fontSize: 11 }}>0:00</Text>
                <Text> / </Text>
                <Text style={{ fontSize: 11 }}>3:35</Text>
                <Slider
                    style={styles.informationSlider}
                    value={10}
                    minimumValue={0}
                    maximumValue={100}
                    thumbTintColor="black"
                    minimumTrackTintColor="black"
                    maximumTrackTintColor="black"
                />
            </View>
        </View>
                <View style={styles.informationSavedFavorites}>
                    <TouchableOpacity style={styles.informationSavedFavorites}>
                        <Icon
                            name="heart-outline"
                            style={styles.iconBack}
                            size={30}
                            color={"black"}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.informationSavedFavorites}>
                        <Icon
                            name="bookmark-outline"
                            style={styles.iconBack}
                            size={30}
                            color={"black"}
                        />
                    </TouchableOpacity>
                </View>
                <ScrollView>
                    <View>
                        <Text
                            style={{
                                fontSize: 25,
                                fontWeight: "bold",
                            }}
                        >
                            Tuổi trẻ, tình yêu và công việc
                        </Text>
                        <Text style={{ color: "#5E5E5E", marginVertical: 5 }}>
                            Đăng tải: 6 giờ trước
                        </Text>
                        <Text style={{ fontSize: 15, lineHeight: 22 }}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Praesent eu nulla neque. Trong quis gravida
                            ante. Cras venenatis tempor libero sed mattis.
                            Praesent cursus non mauris sit amet dictum. Proin
                            tạo điều kiện ngồi amet nunc ac congue. Vestibulum
                            tristique, lorem in bibendum scelerisque, nulla
                            libero placerat erat, sed consequat orci quam ut
                            ligula. Nunc{" "}
                        </Text>
                    </View>

                    <View style={styles.informationComment}>
                        <Comment />

                        <Comment />
                        <Comment />
                        <Comment />
                    </View>
                </ScrollView>
                <View style={styles.informationFooter}>
                    <View
                        style={{
                            // height: "80%",
                            alignSelf: "center",
                            width: "90%",
                            height: "50%",
                            flexDirection: "row",
                            borderRadius: 77,
                            borderWidth: 1,
                            backgroundColor: "#fff",
                        }}
                    >
                        <TextInput
                            style={{
                                flex: 1,
                            
                                paddingLeft: 10,
                            }}
                            placeholder="Thêm bình luận"
                        ></TextInput>

                        
                        <TouchableOpacity
                            style={{ marginRight: 20, alignSelf: "center" }}
                        >
                            <Image
                                style={{
                                    width: 19,
                                    height: 19,
                                }}
                                source={{
                                    uri: "https://firebasestorage.googleapis.com/v0/b/mypodcast-88135.appspot.com/o/icon%2Ficon_sent.png?alt=media&token=404bc1f7-58fa-4f3b-ab82-ea29e5b4210a",
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    playscreenHeader: {
        justifyContent: "space-between",
        flexDirection: "row",
        marginHorizontal: 16,
        paddingBottom: 5,
    },

    informationMain: {
        flex: 1,
    },
    informationAccountInfo: {
        flex: 1,
        justifyContent: "space-between",
        marginLeft: 10,
    },

    informationInfor: {
        flexDirection: "row",
    },

    informationPlay: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: -5,
    },

    informationTime: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 5,
    },
    
    informationSlider: {
        width: "80%",
        height: 40,
        flexDirection: "row",
        alignSelf: "center",
        marginLeft: 5,
    },

    informationInteract: {
        flexDirection: "row",
        backgroundColor: "#D6D6D6",
        paddingVertical: 3,
        paddingHorizontal: 8,
        borderRadius: 5,
        marginRight: 15,
    },

    informationAccountUsername: {
        fontSize: 23,
        fontWeight: "bold",
    },

    informationFile: {
        flexDirection: "row",
        alignItems: "center",
    },

    informationSavedFavorites: {
        flexDirection: "row",
        marginBottom: 4,
        marginRight: 7,
    },

    informationComment: {
        backgroundColor: "#EFEFEF",
        flex: 1,
        borderRadius: 10,
        padding: 16,
        marginTop: 10,
    },
    informationFooter: {
        backgroundColor: "#EFEFEF",
        position: "absolute",
        bottom: 0,
        width: "100%",
        height: "8%",
        justifyContent: "center",
    },
    informationTextInput: {
        borderRadius: 77,
        backgroundColor: "#ffffff",
        width: "100%",
    },
});

export default Information;
