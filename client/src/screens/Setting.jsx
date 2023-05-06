import React, { useState } from "react";
import {
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Switch,
    Appearance,
    Image
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import GlobalStyles from "../components/GlobalStyles";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/actions/authApi";
import { useNavigation } from "@react-navigation/native";
import { darkSetting, lightSetting } from "../constants/darkMode";
import { toggleDarkMode } from "../redux/slices/themeSlice";
import colors from "../constants/colors";
import { Button } from "react-native-paper";
import { avatarDefault } from "../constants/app";
import MiniPlayer from "./Player/MiniPlayer";
import PlayerScreen from "./Player/PlayerScreen";

export default function Setting(props) {
    //navigation
    const navigation = useNavigation();
    //function of navigate 
    const { navigate, goback } = navigation;

    const isDarkTheme = useSelector((state) => state.theme.isDarkTheme);
    const isPlayScreen = useSelector((state) => state.player.isPlayScreen);
    const isMiniPlayer = useSelector((state) => state.player.isMiniPlayer);
    const user = useSelector((state) => state.auth.login.currentUser);
    const dispatch = useDispatch();
    let avatar = avatarDefault;
    if (user) {
        avatar = user.avatar;
    }

    const handleLogin = () => {
        if (user) {
            navigate("MyProfile");
        } else {
            navigate("Login");
        }
    }

    const handleLogout = () => {
        if (user) {
            logoutUser(dispatch, navigation.navigate);
        }
        else alert('Bạn chưa đăng nhập!');
    }
    return (
        <SafeAreaView style={[{ backgroundColor: isDarkTheme ? darkSetting.dark.backgroundColor : lightSetting.light.backgroundColor }, GlobalStyles.customSafeArea]}>
            {!isPlayScreen ? <ScrollView>
                {(!user) &&
                    <View style={lightSetting.accountSuccess}>
                        <Image
                            source={{
                                uri: avatar,
                            }}
                            style={lightSetting.avatar}
                        />
                        <View style={{ marginLeft: 16 }}>
                            <Text style={{ fontSize: 19, fontWeight: "600", marginBottom: 3 }}>Xin chào!</Text>
                            {/* <Text style={{ fontSize: 16, }}>Ấn vào đây để Đăng nhập hoặc Đăng ký</Text> */}
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity style={isDarkTheme ? darkSetting.loginButton : lightSetting.loginButton}
                                    onPress={() => {
                                        handleLogin();
                                    }}
                                >
                                    <Text style={isDarkTheme ? darkSetting.loginText : lightSetting.loginText}>Đăng nhập</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={isDarkTheme ? darkSetting.loginButton : lightSetting.loginButton}
                                    onPress={() => {
                                        navigate('Register');
                                    }}
                                >
                                    <Text style={isDarkTheme ? darkSetting.loginText : lightSetting.loginText}>Đăng ký</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>}
                {(user) &&
                    <View style={lightSetting.accountSuccess}>
                        <TouchableOpacity onPress={() => { handleLogin() }}>
                            <Image
                                source={{
                                    uri: avatar,
                                }}
                                style={lightSetting.avatarSuccess}
                            />
                        </TouchableOpacity>
                        <View style={{ marginLeft: 16 }}>
                            <Text style={{ fontSize: 19, fontWeight: "600", marginBottom: 3 }}>{user.fullName}</Text>
                            <Text style={{ fontSize: 16, }}>@{user.userName}</Text>
                        </View>
                    </View>}
                <View>
                    <View style={lightSetting.title}>
                        <Text style={isDarkTheme ? darkSetting.fontBlur : lightSetting.fontBlur}>Tài khoản</Text>
                    </View>
                    <TouchableOpacity style={isDarkTheme ? darkSetting.setIco : lightSetting.setIco}>
                        <Icon
                            name='user'
                            style={{ paddingStart: 10 }}
                            size={18} color={isDarkTheme ? darkSetting.dark.color : lightSetting.light.color}
                        />
                        <Text style={isDarkTheme ? darkSetting.fontText : lightSetting.fontText}>Tài khoản</Text>
                        <View style={{ flex: 1 }} />
                        <Icon
                            name='chevron-right'
                            style={{ paddingEnd: 10, opacity: 0.5 }}
                            size={20} color={isDarkTheme ? darkSetting.dark.color : lightSetting.light.color}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={isDarkTheme ? darkSetting.setIco : lightSetting.setIco}>
                        <Icon
                            name='lock'
                            style={{ paddingStart: 10, opacity: 0.6 }}
                            size={18} color={isDarkTheme ? darkSetting.dark.color : lightSetting.light.color}
                        />
                        <Text style={isDarkTheme ? darkSetting.fontText : lightSetting.fontText}>Quyền riêng tư</Text>
                        <View style={{ flex: 1 }} />
                        <Icon
                            name='chevron-right'
                            style={{ paddingEnd: 10, opacity: 0.5 }}
                            size={20} color={isDarkTheme ? darkSetting.dark.color : lightSetting.light.color}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={isDarkTheme ? darkSetting.setIco : lightSetting.setIco}>
                        <Icon
                            name='shield-alt'
                            style={{ paddingStart: 10, opacity: 0.5 }}
                            size={18} color={isDarkTheme ? darkSetting.dark.color : lightSetting.light.color}
                        />
                        <Text style={isDarkTheme ? darkSetting.fontText : lightSetting.fontText}>Bảo mật</Text>
                        <View style={{ flex: 1 }} />
                        <Icon
                            name='chevron-right'
                            style={{ paddingEnd: 10, opacity: 0.5 }}
                            size={20} color={isDarkTheme ? darkSetting.dark.color : lightSetting.light.color}
                        />
                    </TouchableOpacity>
                </View>
                <View>
                    <View style={lightSetting.title}>
                        <Text style={isDarkTheme ? darkSetting.fontBlur : lightSetting.fontBlur}>Hiện thị </Text>
                    </View>
                    <TouchableOpacity style={isDarkTheme ? darkSetting.setIco : lightSetting.setIco}>
                        <Icon
                            name='globe-asia'
                            style={{ paddingStart: 10, opacity: 0.5 }}
                            size={18} color={isDarkTheme ? darkSetting.dark.color : lightSetting.light.color}
                        />
                        <Text style={isDarkTheme ? darkSetting.fontText : lightSetting.fontText}>Ngôn ngữ</Text>
                        <View style={{ flex: 1 }} />
                        <Icon
                            name='chevron-right'
                            style={{ paddingEnd: 10, opacity: 0.5 }}
                            size={20} color={isDarkTheme ? darkSetting.dark.color : lightSetting.light.color}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={isDarkTheme ? darkSetting.setIco : lightSetting.setIco}>
                        <Icon
                            name='bell'
                            style={{ paddingStart: 10, opacity: 0.6 }}
                            size={18} color={isDarkTheme ? darkSetting.dark.color : lightSetting.light.color}
                        />
                        <Text style={isDarkTheme ? darkSetting.fontText : lightSetting.fontText}>Thông báo</Text>
                        <View style={{ flex: 1 }} />
                        <Icon
                            name='chevron-right'
                            style={{ paddingEnd: 10, opacity: 0.5 }}
                            size={20} color={isDarkTheme ? darkSetting.dark.color : lightSetting.light.color}
                        />
                    </TouchableOpacity>

                    <View style={isDarkTheme ? darkSetting.setIco : lightSetting.setIco}>
                        <View style={{ flexDirection: 'row' }}>
                            <Icon
                                name='moon'
                                style={{ paddingStart: 10 }}
                                size={18} color={isDarkTheme ? darkSetting.dark.color : lightSetting.light.color}
                            />
                            <Text style={isDarkTheme ? darkSetting.fontText : lightSetting.fontText}>Chế độ tối</Text>
                        </View>
                        {/* <View style={{ flex: 1 }} /> */}
                        <Switch
                            trackColor={{ false: "#767577", true: "#2196F3" }}
                            thumbColor={"#fff"}
                            style={{ marginRight: 5 }}
                            onValueChange={() => dispatch(toggleDarkMode())}
                            value={isDarkTheme}
                        />
                    </View>
                </View>
                <View><View style={lightSetting.title}>
                    <Text style={isDarkTheme ? darkSetting.fontBlur : lightSetting.fontBlur}>Hỗ trợ & Giới thiệu</Text>
                </View>
                    <TouchableOpacity style={isDarkTheme ? darkSetting.setIco : lightSetting.setIco}>
                        <Icon
                            name='exclamation-triangle'
                            style={{ paddingStart: 10, opacity: 0.5 }}
                            size={18} color={isDarkTheme ? darkSetting.dark.color : lightSetting.light.color}
                        />
                        <Text style={isDarkTheme ? darkSetting.fontText : lightSetting.fontText}>Báo cáo vấn đề</Text>
                        <View style={{ flex: 1 }} />
                        <Icon
                            name='chevron-right'
                            style={{ paddingEnd: 10, opacity: 0.5 }}
                            size={20} color={isDarkTheme ? darkSetting.dark.color : lightSetting.light.color}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={isDarkTheme ? darkSetting.setIco : lightSetting.setIco}>
                        <Icon
                            name='toolbox'
                            style={{ paddingStart: 10, opacity: 0.6 }}
                            size={18} color={isDarkTheme ? darkSetting.dark.color : lightSetting.light.color}
                        />
                        <Text style={isDarkTheme ? darkSetting.fontText : lightSetting.fontText}>Hỗ trợ</Text>
                        <View style={{ flex: 1 }} />
                        <Icon
                            name='chevron-right'
                            style={{ paddingEnd: 10, opacity: 0.5 }}
                            size={20} color={isDarkTheme ? darkSetting.dark.color : lightSetting.light.color}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={isDarkTheme ? darkSetting.setIco : lightSetting.setIco}>
                        <Icon
                            name='info-circle'
                            style={{ paddingStart: 10, opacity: 0.5 }}
                            size={18} color={isDarkTheme ? darkSetting.dark.color : lightSetting.light.color}
                        />
                        <Text style={isDarkTheme ? darkSetting.fontText : lightSetting.fontText}>Giới thiệu</Text>
                        <View style={{ flex: 1 }} />
                        <Icon
                            name='chevron-right'
                            style={{ paddingEnd: 10, opacity: 0.5 }}
                            size={20} color={isDarkTheme ? darkSetting.dark.color : lightSetting.light.color}
                        />
                    </TouchableOpacity></View>
                <View><View style={lightSetting.title}>
                    <Text style={isDarkTheme ? darkSetting.fontBlur : lightSetting.fontBlur}>Tài khoản</Text>
                </View>
                    <TouchableOpacity style={isDarkTheme ? darkSetting.setIco : lightSetting.setIco}>
                        <Icon
                            name='sync'
                            style={{ paddingStart: 10, opacity: 0.5 }}
                            size={18} color={isDarkTheme ? darkSetting.dark.color : lightSetting.light.color}
                        />
                        <Text style={isDarkTheme ? darkSetting.fontText : lightSetting.fontText}>Chuyển tài khoản</Text>
                        <View style={{ flex: 1 }} />
                        <Icon
                            name='chevron-right'
                            style={{ paddingEnd: 10, opacity: 0.5 }}
                            size={20} color={isDarkTheme ? darkSetting.dark.color : lightSetting.light.color}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={isDarkTheme ? darkSetting.setIco : lightSetting.setIco}
                        onPress={() => { handleLogout() }}>
                        <Icon
                            name='sign-out-alt'
                            style={{ paddingStart: 10, opacity: 0.6 }}
                            size={18} color={isDarkTheme ? darkSetting.dark.color : lightSetting.light.color}
                        />
                        <Text style={isDarkTheme ? darkSetting.fontText : lightSetting.fontText}>Đăng xuất</Text>
                        <View style={{ flex: 1 }} />
                        <Icon
                            name='chevron-right'
                            style={{ paddingEnd: 10, opacity: 0.5 }}
                            size={20} color={isDarkTheme ? darkSetting.dark.color : lightSetting.light.color}
                        />
                    </TouchableOpacity></View>
            </ScrollView>
                :
                <PlayerScreen></PlayerScreen>
            }
            {isMiniPlayer && <MiniPlayer />}
        </SafeAreaView >

    )
}