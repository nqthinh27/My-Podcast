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
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../constants/colors";
import { TextInput } from "react-native-gesture-handler";
import { device } from "../constants/device";

function CommentFollowing({ item }) {
    return (
        <SafeAreaView
            style={{
            }}
        >
            <View>
                <View
                    style={{
                        // backgroundColor: "yellow",
                        flexDirection: "row",
                        alignItems: "center"
                    }}
                >
                    <Image
                        style={{
                            width: device.width / 15,
                            height: device.width / 15,
                            marginRight: 10,
                            borderRadius: 100,
                        }}
                        source={{
                            uri: item.userId.avatar,
                        }}
                    />
                    <Text
                        style={{
                            // fontWeight: "bold",
                            fontSize: 12
                        }}
                    >
                        {item.userId.fullName}
                    </Text>
                    <Text style={{ fontSize: 13, marginLeft: 15 }}>
                        {item.content}
                    </Text>
                </View>
            </View>
            <View
                style={{
                    width: "100%",
                    height: 1,
                    // borderWidth: 0.5,
                    borderColor: "black",
                    marginVertical: 5,
                }}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({});

export default CommentFollowing;
