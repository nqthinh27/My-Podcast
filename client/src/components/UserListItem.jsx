import React from "react";
import { Text, View, Image } from "react-native";

function UserListItem({ item }) {
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
                    style={{
                        fontWeight: "500",
                        fontSize: 18,
                    }}
                    numberOfLines={1}
                >
                    {item.fullName}
                </Text>

                <Text style={{}}>@{item.userName}</Text>
                <Text style={{color: '#414141'}}>{item.followersLength} Người theo dõi | {item.postsLength} Bài đăng</Text>
            </View>
        </View>
    );
}

export default UserListItem;
