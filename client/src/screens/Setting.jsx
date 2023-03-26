import React, { useState } from "react";
import {
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Switch,
    Appearance
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import GlobalStyles from "../components/GlobalStyles";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/actions/authApi";
import { useNavigation } from "@react-navigation/native";
import darkSetting from "../constants/darkMode";
import { toggleDarkMode } from "../redux/slices/themeSlice";

export default function Setting(props) {
    //navigation
    // const { navigation, route } = props;
    //function of navigate 
    // const { navigate, goback } = navigation;
    const navigation = useNavigation();
    
    const login = useSelector((state) => state.auth.login);
    const isDarkTheme = useSelector((state) => state.theme.isDarkTheme);
    const dispatch = useDispatch();

    const handleLogout = () => {
        if (login.currentUser) logoutUser(dispatch, navigation.navigate);
        else alert('Bạn chưa đăng nhập!');
    }
    return (
        <SafeAreaView style={[{ backgroundColor: isDarkTheme ? darkSetting.dark.backgroundColor : stylesSetting.light.backgroundColor }, GlobalStyles.customSafeArea]}>
            <ScrollView>
                <View>
                    <Text style={isDarkTheme ? darkSetting.setting : stylesSetting.setting}>Cài đặt và quyền riêng tư</Text>
                </View>
                <View>
                    <View style={stylesSetting.title}>
                        <Text style={isDarkTheme ? darkSetting.fontBlur : stylesSetting.fontBlur}>Tài khoản</Text>
                    </View>
                    <TouchableOpacity style={isDarkTheme ? darkSetting.setIco : stylesSetting.setIco}>
                        <Icon
                            name='user'
                            style={{ paddingStart: 10 }}
                            size={18} color={isDarkTheme ? darkSetting.dark.color : stylesSetting.light.color}
                        />
                        <Text style={isDarkTheme ? darkSetting.fontText : stylesSetting.fontText}>Tài khoản</Text>
                        <View style={{ flex: 1 }} />
                        <Icon
                            name='chevron-right'
                            style={{ paddingEnd: 10, opacity: 0.5 }}
                            size={20} color={isDarkTheme ? darkSetting.dark.color : stylesSetting.light.color}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={isDarkTheme ? darkSetting.setIco : stylesSetting.setIco}>
                        <Icon
                            name='lock'
                            style={{ paddingStart: 10, opacity: 0.6 }}
                            size={18} color={isDarkTheme ? darkSetting.dark.color : stylesSetting.light.color}
                        />
                        <Text style={isDarkTheme ? darkSetting.fontText : stylesSetting.fontText}>Quyền riêng tư</Text>
                        <View style={{ flex: 1 }} />
                        <Icon
                            name='chevron-right'
                            style={{ paddingEnd: 10, opacity: 0.5 }}
                            size={20} color={isDarkTheme ? darkSetting.dark.color : stylesSetting.light.color}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={isDarkTheme ? darkSetting.setIco : stylesSetting.setIco}>
                        <Icon
                            name='shield-alt'
                            style={{ paddingStart: 10, opacity: 0.5 }}
                            size={18} color={isDarkTheme ? darkSetting.dark.color : stylesSetting.light.color}
                        />
                        <Text style={isDarkTheme ? darkSetting.fontText : stylesSetting.fontText}>Bảo mật</Text>
                        <View style={{ flex: 1 }} />
                        <Icon
                            name='chevron-right'
                            style={{ paddingEnd: 10, opacity: 0.5 }}
                            size={20} color={isDarkTheme ? darkSetting.dark.color : stylesSetting.light.color}
                        />
                    </TouchableOpacity>
                </View>
                <View>
                    <View style={stylesSetting.title}>
                        <Text style={isDarkTheme ? darkSetting.fontBlur : stylesSetting.fontBlur}>Hiện thị </Text>
                    </View>
                    <TouchableOpacity style={isDarkTheme ? darkSetting.setIco : stylesSetting.setIco}>
                        <Icon
                            name='globe-asia'
                            style={{ paddingStart: 10, opacity: 0.5 }}
                            size={18} color={isDarkTheme ? darkSetting.dark.color : stylesSetting.light.color}
                        />
                        <Text style={isDarkTheme ? darkSetting.fontText : stylesSetting.fontText}>Ngôn ngữ</Text>
                        <View style={{ flex: 1 }} />
                        <Icon
                            name='chevron-right'
                            style={{ paddingEnd: 10, opacity: 0.5 }}
                            size={20} color={isDarkTheme ? darkSetting.dark.color : stylesSetting.light.color}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={isDarkTheme ? darkSetting.setIco : stylesSetting.setIco}>
                        <Icon
                            name='bell'
                            style={{ paddingStart: 10, opacity: 0.6 }}
                            size={18} color={isDarkTheme ? darkSetting.dark.color : stylesSetting.light.color}
                        />
                        <Text style={isDarkTheme ? darkSetting.fontText : stylesSetting.fontText}>Thông báo</Text>
                        <View style={{ flex: 1 }} />
                        <Icon
                            name='chevron-right'
                            style={{ paddingEnd: 10, opacity: 0.5 }}
                            size={20} color={isDarkTheme ? darkSetting.dark.color : stylesSetting.light.color}
                        />
                    </TouchableOpacity>

                    <View style={isDarkTheme ? darkSetting.setIco : stylesSetting.setIco}>
                        <Icon
                            name='moon'
                            style={{ paddingStart: 10 }}
                            size={18} color={isDarkTheme ? darkSetting.dark.color : stylesSetting.light.color}
                        />
                        <Text style={isDarkTheme ? darkSetting.fontText : stylesSetting.fontText}>Chế độ tối</Text>
                        <View style={{ flex: 1 }} />
                        <Switch
                            trackColor={{ false: "#767577", true: "#2196F3" }}
                            thumbColor={"#fff"}
                            style={{
                                height: 25,
                                width: 25,
                            }}
                            onValueChange={() => dispatch(toggleDarkMode())}
                            value={isDarkTheme}
                        />
                    </View>
                </View>
                <View><View style={stylesSetting.title}>
                    <Text style={isDarkTheme ? darkSetting.fontBlur : stylesSetting.fontBlur}>Hỗ trợ & Giới thiệu</Text>
                </View>
                    <TouchableOpacity style={isDarkTheme ? darkSetting.setIco : stylesSetting.setIco}>
                        <Icon
                            name='exclamation-triangle'
                            style={{ paddingStart: 10, opacity: 0.5 }}
                            size={18} color={isDarkTheme ? darkSetting.dark.color : stylesSetting.light.color}
                        />
                        <Text style={isDarkTheme ? darkSetting.fontText : stylesSetting.fontText}>Báo cáo vấn đề</Text>
                        <View style={{ flex: 1 }} />
                        <Icon
                            name='chevron-right'
                            style={{ paddingEnd: 10, opacity: 0.5 }}
                            size={20} color={isDarkTheme ? darkSetting.dark.color : stylesSetting.light.color}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={isDarkTheme ? darkSetting.setIco : stylesSetting.setIco}>
                        <Icon
                            name='toolbox'
                            style={{ paddingStart: 10, opacity: 0.6 }}
                            size={18} color={isDarkTheme ? darkSetting.dark.color : stylesSetting.light.color}
                        />
                        <Text style={isDarkTheme ? darkSetting.fontText : stylesSetting.fontText}>Hỗ trợ</Text>
                        <View style={{ flex: 1 }} />
                        <Icon
                            name='chevron-right'
                            style={{ paddingEnd: 10, opacity: 0.5 }}
                            size={20} color={isDarkTheme ? darkSetting.dark.color : stylesSetting.light.color}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={isDarkTheme ? darkSetting.setIco : stylesSetting.setIco}>
                        <Icon
                            name='info-circle'
                            style={{ paddingStart: 10, opacity: 0.5 }}
                            size={18} color={isDarkTheme ? darkSetting.dark.color : stylesSetting.light.color}
                        />
                        <Text style={isDarkTheme ? darkSetting.fontText : stylesSetting.fontText}>Giới thiệu</Text>
                        <View style={{ flex: 1 }} />
                        <Icon
                            name='chevron-right'
                            style={{ paddingEnd: 10, opacity: 0.5 }}
                            size={20} color={isDarkTheme ? darkSetting.dark.color : stylesSetting.light.color}
                        />
                    </TouchableOpacity></View>
                <View><View style={stylesSetting.title}>
                    <Text style={isDarkTheme ? darkSetting.fontBlur : stylesSetting.fontBlur}>Tài khoản</Text>
                </View>
                    <TouchableOpacity style={isDarkTheme ? darkSetting.setIco : stylesSetting.setIco}>
                        <Icon
                            name='sync'
                            style={{ paddingStart: 10, opacity: 0.5 }}
                            size={18} color={isDarkTheme ? darkSetting.dark.color : stylesSetting.light.color}
                        />
                        <Text style={isDarkTheme ? darkSetting.fontText : stylesSetting.fontText}>Chuyển tài khoản</Text>
                        <View style={{ flex: 1 }} />
                        <Icon
                            name='chevron-right'
                            style={{ paddingEnd: 10, opacity: 0.5 }}
                            size={20} color={isDarkTheme ? darkSetting.dark.color : stylesSetting.light.color}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={isDarkTheme ? darkSetting.setIco : stylesSetting.setIco}
                        onPress={() => { handleLogout() }}>
                        <Icon
                            name='sign-out-alt'
                            style={{ paddingStart: 10, opacity: 0.6 }}
                            size={18} color={isDarkTheme ? darkSetting.dark.color : stylesSetting.light.color}
                        />
                        <Text style={isDarkTheme ? darkSetting.fontText : stylesSetting.fontText}>Đăng xuất</Text>
                        <View style={{ flex: 1 }} />
                        <Icon
                            name='chevron-right'
                            style={{ paddingEnd: 10, opacity: 0.5 }}
                            size={20} color={isDarkTheme ? darkSetting.dark.color : stylesSetting.light.color}
                        />
                    </TouchableOpacity></View>
            </ScrollView>
        </SafeAreaView>

    )
}

const stylesSetting = StyleSheet.create({
    setting: {
        color: '#000',
        left: 16,
        fontSize: 25,
        fontWeight: "bold",
        top: 10
    },
    light: {
        backgroundColor: "#fff",
        color: "#212529"
    },
    title: {
        top: 10,
        height: 30,
        marginTop: 10
    },

    setIco: {
        flexDirection: 'row',
        paddingVertical: 10,
        alignContent: 'center',
        marginVertical: 3,
        marginHorizontal: 16,
        borderRadius: 7,
        backgroundColor: 'rgba(0, 0, 0, 0.05)'
    },

    fontBlur: {
        color: '#000',
        paddingStart: 16,
        fontSize: 17,
        fontWeight: "bold",
    },

    fontText: {
        color: 'black',
        fontSize: 16,
        paddingStart: 15,
    }
})

