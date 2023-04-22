import React from "react";
import { Text, View, Image, StyleSheet } from "react-native";

function PodcastListItem({ item }) {
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
                source={{ uri: item.image }}
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
                    numberOfLines={1}
                >
                    {item.title}
                </Text>

                <Text style={{}}>{item.owner.fullName}</Text>
                <Text style={{}}>{item.views} Lượt nghe | {item.likes} Lượt yêu thích</Text>
            </View>
        </View>
    );
}

export default PodcastListItem;
