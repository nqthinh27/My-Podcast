import Slider from '@react-native-community/slider';
import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, Image, Dimensions, TouchableOpacity, SafeAreaView, TextInput } from 'react-native'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from 'react-redux';
import colors from '../constants/colors'
import { lightFollowingItem, darkFollowingItem } from '../constants/darkLight/themeFollowing'
import GlobalStyles from './GlobalStyles';
import { useNavigation } from '@react-navigation/native';
import { getOtherFollowers, getOtherFollowing, getOtherUser, getOtherUserAllPosts, getOtherUserTopPosts } from '../redux/actions/profileApi';
import { getPublicDataAPI, patchDataAPI, postDataAPI } from '../ultis/fetchData';
import { BASE_URL } from '../ultis/config';
import axios from 'axios';
import { getOtherUserSuccess } from '../redux/slices/profileSlice';

export default function FollowingItem(props) {
    const userLikedList = useSelector((state) => state.following.likedList.data);
    const IsLiked =  userLikedList.some(item => item._id == props._id);
    const dispatch = useDispatch;
    const navigation = useNavigation();
    const [heart, setHeart] = useState(IsLiked);
    const [currentLikes, setCurrentLikes] = useState(props.likes)
    const [value, setValue] = useState(0);
    const [play, setPlay] = useState(true);
    const [volume, setVolume] = useState(true);
    const [mounted, setMounted] = useState(false);
    const isDarkTheme = useSelector((state) => state.theme.isDarkTheme);
    const otherUser = useSelector((state) => state.profile.otherUser.data);
    const currentUser = useSelector((state) => state.auth.login.currentUser);
    const access_token = useSelector((state) => state.auth.login.access_token);
    const handleLike = () => {
        if (!heart) {
            setCurrentLikes(prevLikes => prevLikes + 1);
        } else {
            setCurrentLikes(prevLikes => prevLikes - 1);
        }
        setHeart(!heart);
    }
    useEffect(() => {
        if (mounted) {
            if (!heart) {
                patchDataAPI(`like/${props._id}/remove`, null, access_token);
            } else {
                postDataAPI(`like/${props._id}/add`, null, access_token);
            }
        } else {
            setMounted(true);
        }
    }, [heart])

    const handlePlay = () => {
        setPlay(!play);
    }

    const handleVolume = () => {
        setVolume(!volume);
    };

    return (
        <View>
            <View style={lightFollowingItem.followingItemWrapper}>
                {/* <View style={lightFollowingItem.followingItemIntroduction}>
                    <TouchableOpacity
                        style={{ flexDirection: 'row' }}
                        onPress={() => {
                        }}
                    >
                        <Image source={{ uri: props.owner.avatar }} style={lightFollowingItem.avatar} />
                        <View style={lightFollowingItem.profile}>
                            <Text style={isDarkTheme ? darkFollowingItem.name : lightFollowingItem.name} numberOfLines={1}>{props.owner.fullName}</Text>
                            <Text style={isDarkTheme ? darkFollowingItem.date : lightFollowingItem.date} numberOfLines={1}>{props.createdAt}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Icon
                            name="dots-horizontal"
                            style={{ opacity: 1 }}
                            size={30}
                            color={isDarkTheme ? colors.white : colors.black}
                        />
                    </TouchableOpacity>
                </View> */}
                {/* <Icon style={lightFollowingItem.more_btn} name="more-horizontal" size={26} color="#000" /> */}
                <View style={lightFollowingItem.followingItemContent}>
                    <View style={{}}>
                        <Text style={[isDarkTheme ? darkFollowingItem.title : lightFollowingItem.title, { marginBottom: 3 }]}>{props.title}</Text>
                        <Text style={isDarkTheme ? darkFollowingItem.descripttion : lightFollowingItem.descripttion}>{props.content}</Text>
                    </View>
                </View>
                <View style={lightFollowingItem.followingItemImage}>
                    <Image
                        source={{
                            uri: props.image,
                        }}
                        style={lightFollowingItem.imageWrapper}
                    />
                </View>
                <View style={lightFollowingItem.followingItemInteract}>
                    <View style={lightFollowingItem.interact}>
                        <View style={[lightFollowingItem.interactIcon, { alignItems: "center" }]}>
                            <TouchableOpacity onPress={handleLike}>
                                {(!heart) && <Icon
                                    name="cards-heart-outline"
                                    style={{ opacity: 1 }}
                                    size={23}
                                    color={isDarkTheme ? colors.white : colors.black}
                                />}
                                {(heart) && <Icon
                                    name="cards-heart"
                                    style={{ opacity: 1 }}
                                    size={23}
                                    color={colors.red}
                                />}
                            </TouchableOpacity>
                            <View style={{}}>
                                <Text style={{ color: isDarkTheme ? colors.white : colors.black }}> {currentLikes} Yêu Thích</Text>
                            </View>
                            {/* <TouchableOpacity>
                                <Icon
                                    name="comment-processing-outline"
                                    style={{ opacity: 0.8, paddingLeft: 10 }}
                                    size={23}
                                    color={isDarkTheme ? colors.white : colors.black}
                                />
                            </TouchableOpacity>
                            <View style={{}}>
                                <Text style={{ color: isDarkTheme ? colors.white : colors.black }}>{props.comments} Bình luận</Text>
                            </View> */}
                        </View>
                        <View style={[lightFollowingItem.interactIcon, { alignItems: "center" }]}>
                            <TouchableOpacity>
                                <Icon
                                    name="headphones"
                                    style={{ opacity: 0.7 }}
                                    size={23}
                                    color={isDarkTheme ? colors.white : colors.black}
                                />
                            </TouchableOpacity>
                            <Text style={{ color: isDarkTheme ? colors.white : colors.black }}> {props.views} Lượt nghe</Text>
                        </View>
                    </View>
                    <View style={isDarkTheme ? darkFollowingItem.interactComment : lightFollowingItem.interactComment}>
                        <TextInput
                            style={isDarkTheme ? darkFollowingItem.comment : lightFollowingItem.comment}
                            // autoFocus={false}
                            // value={searchValue}
                            placeholder="Thêm bình luận..."
                        // onChange={(event) => setSearchResult(event.target.value)}
                        // onFocus={handleSearch}
                        />
                        <Icon
                            name="send"
                            style={lightFollowingItem.sendComment}
                            size={20}
                            color={colors.primary}
                        />
                    </View>
                    <View style={lightFollowingItem.interactPlayTime}>
                        <TouchableOpacity onPress={handlePlay}>
                            {(play) && <Icon
                                name="play"
                                style={{ opacity: 1 }}
                                size={25}
                                color={isDarkTheme ? colors.white : colors.black}
                            />}
                            {(!play) && <Icon
                                name="stop"
                                style={{ opacity: 1 }}
                                size={25}
                                color={isDarkTheme ? colors.white : colors.black}
                            />}
                        </TouchableOpacity>
                        {/* ------------ Thời gian bài hát --------------- */}
                        <View style={lightFollowingItem.progressLevelDur}>
                            <Text style={lightFollowingItem.progressLabelText}>00:00 / 02:22 </Text>
                        </View>
                        <Slider
                            style={lightFollowingItem.progressBar}
                            minimumValue={0}
                            maximumValue={100}
                            thumbTintColor={isDarkTheme ? colors.white : colors.black}
                            minimumTrackTintColor={isDarkTheme ? colors.white : colors.black}
                            maximumTrackTintColor={isDarkTheme ? colors.white : colors.black}
                        // thumbStyle={{ width: 2, height: 2 }} // set the size of the thumb
                        // thumbProps={{
                        //   borderRadius: 8, // set the border radius to half the width/height to make it round
                        // }}
                        />
                        <TouchableOpacity onPress={handleVolume}>
                            {(volume) && <Icon
                                name="volume-high"
                                style={{ opacity: 1 }}
                                size={25}
                                color={isDarkTheme ? colors.white : colors.black}
                            />}
                            {(!volume) && <Icon
                                name="volume-off"
                                style={{ opacity: 1 }}
                                size={25}
                                color={isDarkTheme ? colors.white : colors.black}
                            />}
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View
                style={{ borderBottomWidth: 0.2, borderColor: colors.black, marginBottom: 25, marginTop: 9, marginHorizontal: 16 }}
            />
        </View>
    )
}
