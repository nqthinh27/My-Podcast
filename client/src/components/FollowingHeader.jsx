import Slider from '@react-native-community/slider';
import React, { useEffect, useState } from 'react'
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from 'react-redux';
import colors from '../constants/colors'
import { lightFollowingItem, darkFollowingItem } from '../constants/darkLight/themeFollowing'
import { useNavigation } from '@react-navigation/native';
import { timeDiff2 } from '../ultis/helper';

export default function FollowingHeader(props) {
    const dispatch = useDispatch;
    const navigation = useNavigation();
    const [heart, setHeart] = useState(true);
    const [value, setValue] = useState(0);
    const [play, setPlay] = useState(true);
    const [volume, setVolume] = useState(true);
    const isDarkTheme = useSelector((state) => state.theme.isDarkTheme);
    const otherUser = useSelector((state) => state.profile.otherUser.data);
    const currentUser = useSelector((state) => state.auth.login.currentUser);
    const handleHeart = () => {
        setHeart(!heart);
    }

    const handlePlay = () => {
        setPlay(!play);
    }

    const handleVolume = () => {
        setVolume(!volume);
    };

    return (
        <View style={[lightFollowingItem.followingItemIntroduction, {marginHorizontal: 16}]}>
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
            <TouchableOpacity style = {{flex: 1}}></TouchableOpacity>
        </View>
    )
}
