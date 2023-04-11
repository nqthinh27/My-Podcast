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

function Comment(props) {
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
                            uri: "https://firebasestorage.googleapis.com/v0/b/mypodcast-88135.appspot.com/o/Tu%2FRectangle%2038.png?alt=media&token=780197d0-e51a-496c-8ff1-006b24341c50",
                        }}
                    />
                    <View>
                        <Text
                            style={{
                                fontWeight: "bold",
                            }}
                        >
                            Mallicaa Basa
                        </Text>
                        <Text
                            style={{
                                fontSize: 12,
                                color: "#9A9A9A",
                            }}
                        >
                            27 thangs 12
                        </Text>
                    </View>
                </View>

                <Text style={{fontSize: 14}}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Obcaecati nam amet quod, eveniet dolor repellat quibusdam
                    excepturi quos, reiciendis pariatur fugiat at officia id
                    molestiae delectus sapiente explicabo suscipit eos!
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
