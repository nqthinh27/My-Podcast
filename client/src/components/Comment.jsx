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

function Comment({ item }) {
    return (
        <SafeAreaView
            style={{
                flex: 1,
            }}
        >
            <View>
                <View
                    style={{
                        // backgroundColor: "yellow",
                        flexDirection: "row",
                    }}
                >
                    <Image
                        style={{
                            width: 32,
                            height: 32,
                            marginRight: 10,
                            borderRadius: 100,
                        }}
                        source={{
                            uri: item.userId.avatar,
                        }}
                    />
                    <View>
                        <Text
                            style={{
                                fontWeight: "bold",
                            }}
                        >
                            {item.userId.fullName}
                        </Text>
                        <Text
                            style={{
                                fontSize: 12,
                                color: "#9A9A9A",
                            }}
                        >
                            @{item.userId.userName}
                        </Text>
                    </View>
                </View>

                <Text style={{ fontSize: 14 }}>
                    {item.content}
                </Text>
            </View>
            <View
                style={{
                    width: "100%",
                    height: 1,
                    borderWidth: 0.5,
                    borderColor: "black",
                    marginVertical: 16,
                }}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({});

export default Comment;
