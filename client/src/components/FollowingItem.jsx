import Slider from '@react-native-community/slider';
import React, { useState } from 'react'
import { View, StyleSheet, Text, Image, Dimensions, TouchableOpacity, SafeAreaView, TextInput } from 'react-native'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useSelector } from 'react-redux';
import colors from '../constants/colors'
import {lightFollowingItem, darkFollowingItem} from '../constants/darkLight/themeFollowing'

export default function FollowingItem(props) {

    const [heart, setHeart] = useState(true);
    const [value, setValue] = useState(0);
    const [play, setPlay] = useState(true);
    const [volume, setVolume] = useState(true);
    const isDarkTheme = useSelector((state) => state.theme.isDarkTheme);

    const handleHeart = () => {
        setHeart(!heart);
    }

    const handlePlay = () => {
        setPlay(!play);
    }

    const handleVolume = () => {
        setVolume(!volume);
    };

    // const handleIncrease = () => {
    //     setHeart(!heart);
    //     if (heart === true) {
    //         setValue(value => value + 1)
    //     } else if (heart === false) {
    //         setHeart(value => value - 1)
    //     }
    // }


    return (
        <SafeAreaView>
            <View style={lightFollowingItem.followingItemWrapper}>
                <View style={lightFollowingItem.followingItemIntroduction}>
                    <View style={{ flexDirection: 'row' }}>
                        <Image source={{ uri: props.avtUrl }} style={lightFollowingItem.avatar} />
                        <View style={lightFollowingItem.profile}>
                            <Text style={isDarkTheme ? darkFollowingItem.name : lightFollowingItem.name} numberOfLines={1}>{props.name}</Text>
                            <Text style={isDarkTheme ? darkFollowingItem.date : lightFollowingItem.date} numberOfLines={1}>{props.date}</Text>
                        </View>
                    </View>
                    {/* <View style={{ flex: 2 }} /> */}
                    <TouchableOpacity>
                        <Icon
                            name="dots-horizontal"
                            style={{ opacity: 1 }}
                            size={30}
                            color={isDarkTheme ? colors.white : colors.black}
                        />
                    </TouchableOpacity>
                </View>
                {/* <Icon style={lightFollowingItem.more_btn} name="more-horizontal" size={26} color="#000" /> */}
                <View style={lightFollowingItem.followingItemContent}>
                    <View style={{}}>
                        <Text style={isDarkTheme ? darkFollowingItem.title : lightFollowingItem.title} numberOfLines={1}>{props.title}</Text>
                        <Text style={isDarkTheme ? darkFollowingItem.descripttion : lightFollowingItem.descripttion}>{props.descripttion}</Text>
                    </View>
                </View>
                <View style={lightFollowingItem.followingItemImage}>
                    <Image
                        source={{
                            uri: "https://firebasestorage.googleapis.com/v0/b/mypodcast-88135.appspot.com/o/Tu%2FRectangle%2038.png?alt=media&token=780197d0-e51a-496c-8ff1-006b24341c50",
                        }}
                        style={lightFollowingItem.imageWrapper}
                    />
                </View>
                <View style={lightFollowingItem.followingItemInteract}>
                    <View style={lightFollowingItem.interact}>
                        <View style={lightFollowingItem.interactIcon}>
                            <TouchableOpacity onPress={handleHeart}>
                                {(heart) && <Icon
                                    name="cards-heart-outline"
                                    style={{ opacity: 1 }}
                                    size={23}
                                    color={isDarkTheme ? colors.white : colors.black}
                                />}
                                {(!heart) && <Icon
                                    name="cards-heart"
                                    style={{ opacity: 1 }}
                                    size={23}
                                    color={colors.red}
                                />}
                            </TouchableOpacity>
                            <View style={{}}>
                                <Text style={{ color: isDarkTheme ? colors.white : colors.black }}> Yêu Thích</Text>
                            </View>
                            <TouchableOpacity>
                                <Icon
                                    name="comment-processing-outline"
                                    style={{ opacity: 0.8, paddingLeft: 10 }}
                                    size={23}
                                    color={isDarkTheme ? colors.white : colors.black}
                                />
                            </TouchableOpacity>
                            <View style={{}}>
                                <Text style={{ color: isDarkTheme ? colors.white : colors.black }}> Bình luận</Text>
                            </View>
                        </View>
                        <View style={lightFollowingItem.interactIcon}>
                            <TouchableOpacity>
                                <Icon
                                    name="headphones"
                                    style={{ opacity: 0.7 }}
                                    size={23}
                                    color={isDarkTheme ? colors.white : colors.black}
                                />
                            </TouchableOpacity>
                            <Text style={{ color: isDarkTheme ? colors.white : colors.black }}> Lượt nghe</Text>
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
                            thumbTintColor = {isDarkTheme ? colors.white : colors.black}
                            minimumTrackTintColor={isDarkTheme ? colors.white : colors.black}
                            maximumTrackTintColor={isDarkTheme ? colors.white : colors.black}
                            thumbStyle={{ width: 2, height: 2 }} // set the size of the thumb
                            thumbProps={{
                              borderRadius: 8, // set the border radius to half the width/height to make it round
                            }}
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
                style={{
                    width: '100%',
                    height: 10,
                    backgroundColor: isDarkTheme ? colors.dark : colors.white,
                    borderRadius: 5
                }}
            />
        </SafeAreaView>
    )
}
