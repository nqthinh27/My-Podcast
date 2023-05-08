import React from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import { formatNum } from "../ultis/helper";
import { lightHeader, darkHeader } from '../constants/darkLight/themeHeaderUI'
import { useSelector } from "react-redux";

function PodcastListItem({ item }) {
    const isDarkTheme = useSelector((state) => state.theme.isDarkTheme);
    const currentLanguage = useSelector(
        (state) => state.language.currentLanguage
    );
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
                    style={[{
                        fontWeight: "600",
                        fontSize: 16,
                    }, isDarkTheme ? darkHeader.text : lightHeader.text]}
                    numberOfLines={1}
                >
                    {item.title}
                </Text>

                <Text style={isDarkTheme ? darkHeader.text : lightHeader.text}>{item.owner.fullName}</Text>
                <Text style={isDarkTheme ? darkHeader.text : lightHeader.text}>{formatNum(item.views)}{currentLanguage === "vi" ? " Lượt nghe | " : " Listens | "}{formatNum(item.likes)}{currentLanguage === "vi" ? " Lượt yêu thích" : " Favourites"}</Text>
            </View>
        </View>
    );
}

export default PodcastListItem;
