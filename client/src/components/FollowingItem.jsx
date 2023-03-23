import Slider from '@react-native-community/slider';
import React, { useState } from 'react'
import { View, StyleSheet, Text, Image, Dimensions, TouchableOpacity, SafeAreaView, TextInput } from 'react-native'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import colors from '../constants/colors'

export default function FollowingItem(props) {

    const [heart, setHeart] = useState(true);
    const [value, setValue] = useState(0);
    const [play, setPlay] = useState(true);
    const [volume, setVolume] = useState(true);

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
            <View style={styles.followingItemWrapper}>
                <View style={styles.followingItemIntroduction}>
                    <View style={{ flexDirection: 'row' }}>
                        <Image source={{ uri: props.avtUrl }} style={styles.avatar} />
                        <View style={styles.profile}>
                            <Text style={styles.name} numberOfLines={1}>{props.name}</Text>
                            <Text style={styles.date} numberOfLines={1}>{props.date}</Text>
                        </View>
                    </View>
                    {/* <View style={{ flex: 2 }} /> */}
                    <TouchableOpacity>
                        <Icon
                            name="dots-horizontal"
                            style={{ opacity: 1 }}
                            size={30}
                            color={colors.black}
                        />
                    </TouchableOpacity>
                </View>
                {/* <Icon style={styles.more_btn} name="more-horizontal" size={26} color="#000" /> */}
                <View style={styles.followingItemContent}>
                    <View style={{}}>
                        <Text style={styles.title} numberOfLines={1}>{props.title}</Text>
                        <Text style={styles.descripttion}>{props.descripttion}</Text>
                    </View>
                </View>
                <View style={styles.followingItemImage}>
                    <Image
                        source={{
                            uri: "https://firebasestorage.googleapis.com/v0/b/mypodcast-88135.appspot.com/o/Tu%2FRectangle%2038.png?alt=media&token=780197d0-e51a-496c-8ff1-006b24341c50",
                        }}
                        style={styles.imageWrapper}
                    />
                </View>
                <View style={styles.followingItemInteract}>
                    <View style={styles.interact}>
                        <View style={styles.interactIcon}>
                            <TouchableOpacity onPress={handleHeart}>
                                {(heart) && <Icon
                                    name="cards-heart-outline"
                                    style={{ opacity: 1 }}
                                    size={24}
                                    color={colors.black}
                                />}
                                {(!heart) && <Icon
                                    name="cards-heart"
                                    style={{ opacity: 1 }}
                                    size={24}
                                    color={colors.red}
                                />}
                            </TouchableOpacity>
                            <View style={{}}>
                                <Text> Yêu Thích</Text>
                            </View>
                            <TouchableOpacity>
                                <Icon
                                    name="comment-processing-outline"
                                    style={{ opacity: 0.8, paddingLeft: 10 }}
                                    size={23}
                                    color={colors.black}
                                />
                            </TouchableOpacity>
                            <View style={{}}>
                                <Text> Bình luận</Text>
                            </View>
                        </View>
                        <View style={styles.interactIcon}>
                            <TouchableOpacity>
                                <Icon
                                    name="headphones"
                                    style={{ opacity: 0.7 }}
                                    size={23}
                                    color={colors.black}
                                />
                            </TouchableOpacity>
                            <Text> Lượt nghe</Text>
                        </View>
                    </View>
                    <View style={styles.interactComment}>
                        <TextInput
                            style={styles.comment}
                            // autoFocus={false}
                            // value={searchValue}
                            placeholder="Thêm bình luận..."
                        // onChange={(event) => setSearchResult(event.target.value)}
                        // onFocus={handleSearch}
                        />
                        <Icon
                            name="send"
                            style={styles.sendComment}
                            size={20}
                            color={colors.primary}
                        />
                    </View>
                    <View style={styles.interactPlayTime}>
                        <TouchableOpacity onPress={handlePlay}>
                            {(play) && <Icon
                                name="play"
                                style={{ opacity: 1 }}
                                size={25}
                                color={colors.black}
                            />}
                            {(!play) && <Icon
                                name="stop"
                                style={{ opacity: 1 }}
                                size={25}
                                color={colors.black}
                            />}
                        </TouchableOpacity>
                        <View style={styles.progressLevelDur}>
                            <Text style={styles.progressLabelText}>00:00 / 02:22 </Text>
                        </View>
                        <Slider
                            style={styles.progressBar}

                            minimumValue={0}
                            maximumValue={100}
                            thumbTintColor="black"
                            minimumTrackTintColor="black"
                            maximumTrackTintColor="black"
                        />
                        <TouchableOpacity onPress={handleVolume}>
                            {(volume) && <Icon
                                name="volume-high"
                                style={{ opacity: 1 }}
                                size={25}
                                color={colors.black}
                            />}
                            {(!volume) && <Icon
                                name="volume-off"
                                style={{ opacity: 1 }}
                                size={25}
                                color={colors.black}
                            />}
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View
                style={{
                    width: '100%',
                    height: 10,
                    backgroundColor: colors.white,
                    borderRadius: 5
                }}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    followingItemWrapper: {
        // backgroundColor: '#EDEDED',
        height: 630,
        // borderRadius: 10,
        // margin: 11,
        marginVertical: 6,
        display: 'flex',
        marginHorizontal: 16,
    },
    followingItemIntroduction: {
        // top: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    followingItemContent: {
        top: 10,
    },
    followingItemImage: {
        top: 30,
        alignSelf: "center",
    },
    followingItemInteract: {
        top: 40,
        // marginBottom: 10,
    },
    avatar: {
        width: 35,
        height: 35,
        borderRadius: 35
    },
    profile: {
        marginHorizontal: 10
    },

    name: {
        fontSize: 13,
        fontWeight: "700",
    },
    date: {
        fontSize: 11,
        color: "#414141",
        paddingVertical: 2,
        opacity: 0.5,
    },
    title: {
        top: 4,
        fontSize: 15,
        fontWeight: "500",
    },
    descripttion: {
        color: "#414141",
        paddingVertical: 2,
        flexWrap: 'wrap'
    },
    imageWrapper: {
        //position: 'absolute',
        width: 355,
        height: 355,
        alignSelf: "center",
        // top: 15,
        borderRadius: 20,
        backgroundColor: "#000000",
        //ma: 15,
    },
    interactIcon: {
        flexDirection: 'row',
        // paddingEnd: 10
    },
    interact: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    interactComment: {
        top: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: colors.white,
        borderRadius: 32,
        borderWidth: 0.8,
        borderColor: colors.black,
    },
    comment: {
        height: 32,
        marginLeft: 12,
        color: colors.black,
    },
    sendComment: {
        transform: [{ skewX: '45deg' }],
        right: 12
    },
    interactPlayTime: {
        top: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    progressLabelText: {
        fontSize: 12,
    },
    progressLevelDur: {
        // width: 310,
        // flexDirection: "row",
        // justifyContent: "space-between",
        // alignSelf: 'center',
    },
    progressBar: {
        width: 230,
    },
})