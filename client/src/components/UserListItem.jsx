import React from "react";
import { Text, View, Image } from "react-native";
import { lightHeader, darkHeader } from '../constants/darkLight/themeHeaderUI'
import { useSelector } from "react-redux";

function UserListItem({ item }) {
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
                    borderRadius: 57,
                }}
                source={{ uri: item.avatar }}
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
                        fontWeight: "500",
                        fontSize: 18,
                    }, isDarkTheme ? darkHeader.text : lightHeader.text]}
                    numberOfLines={1}
                >
                    {item.fullName}
                </Text>

                <Text style={isDarkTheme ? darkHeader.text : lightHeader.text}>@{item.userName}</Text>
                <Text style={isDarkTheme ? darkHeader.text : {color: '#414141'}}>{item.followersLength}{currentLanguage === "vi" ? " Người theo dõi | " : " Followers | "}{item.postsLength}{currentLanguage === "vi" ? " Bài đăng" : " Posts"}</Text>
            </View>
        </View>
    );
}

export default UserListItem;
