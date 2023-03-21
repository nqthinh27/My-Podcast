import React from "react";
import { Text, View, Image, StyleSheet } from "react-native";

function HorizontalPodcast({ item }) {
    return (
        <View
            style={{
                marginBottom: 13,
                flexDirection: "row",
            }}
        >
            <Image
                style={{
                    width: 57,
                    height: 57,
                    marginRight: 10,
                    borderRadius: 8,
                }}
                source={{ uri: item.avtUrl }}
            />
            <View
                style={{
                    flex: 1,
                    marginRight: 10,
                    justifyContent: "center",
                }}
            >
                <Text
                    style={{
                        fontWeight: "600",
                        fontSize: 16,
                    }}
                    numberOfLines={2}
                >
                    {item.title}
                </Text>

                <Text style={{}}>{item.author}</Text>
            </View>
        </View>
    );
}

export default HorizontalPodcast;
