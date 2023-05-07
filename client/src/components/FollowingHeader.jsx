import Slider from '@react-native-community/slider';
import React, { useEffect, useState } from 'react'
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import Icon from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from 'react-redux';
import colors from '../constants/colors'
import { lightFollowingItem, darkFollowingItem } from '../constants/darkLight/themeFollowing'
import { useNavigation } from '@react-navigation/native';
import { timeDiff2 } from '../ultis/helper';

export default function FollowingHeader(props) {
    const dispatch = useDispatch;
    const navigation = useNavigation();
    const [favourite, setFavourite] = useState(true);
    const isDarkTheme = useSelector((state) => state.theme.isDarkTheme);
    const otherUser = useSelector((state) => state.profile.otherUser.data);
    const currentUser = useSelector((state) => state.auth.login.currentUser);
    const handleFavourite = () => {
        setFavourite(!favourite);
    }

    return (
        <View style={[lightFollowingItem.followingItemIntroduction, { marginHorizontal: 16 }]}>
            <View
                style={{ flexDirection: 'row' }}
                onPress={() => {
                }}
            >
                <Image source={{ uri: props.owner.avatar }} style={lightFollowingItem.avatar} />
                <View style={lightFollowingItem.profile}>
                    <Text style={isDarkTheme ? darkFollowingItem.name : lightFollowingItem.name} numberOfLines={1}>{props.owner.fullName}</Text>
                    <Text style={isDarkTheme ? darkFollowingItem.date : lightFollowingItem.date} numberOfLines={1}>{timeDiff2(props.createdAt)}</Text>
                </View>
            </View>
            <TouchableOpacity style={{ flex: 1 }}></TouchableOpacity>
            <TouchableOpacity onPress={handleFavourite}>
                {(!favourite) && <Icon
                    name="bookmark-outline"
                    style={{ opacity: 1 }}
                    size={28}
                    color={isDarkTheme ? colors.white : colors.black}
                />}
                {(favourite) && <Icon
                    name="bookmark"
                    style={{ opacity: 1 }}
                    size={28}
                    color={colors.primary}
                />}
            </TouchableOpacity>
            <View style={{}}></View>
        </View>
    )
}
