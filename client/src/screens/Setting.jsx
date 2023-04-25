import React, { useState } from "react";
import {
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    Switch,
    Appearance,
    Image,
    
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import GlobalStyles from "../components/GlobalStyles";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/actions/authApi";
import { useNavigation } from "@react-navigation/native";
import { darkSetting, lightSetting } from "../constants/darkMode";
import { toggleDarkMode } from "../redux/slices/themeSlice";
import colors from "../constants/colors";
import { avatarDefault } from "../constants/app";
import { setLanguage } from "../redux/slices/languageSlice";

export default function Setting(props) {
    //navigation
    const navigation = useNavigation();
    //function of navigate
    const { navigate, goback } = navigation;

    const currentLanguage = useSelector(
        (state) => state.language.currentLanguage
    );

    const [isLanguageEn, setIsLanguageEn] = useState(false);

    const handleLanguageChange = (language) => {
        dispatch(setLanguage(language));
    };

    const handleLanguageToggle = () => {
        setIsLanguageEn(!isLanguageEn);
        if (isLanguageEn) {
            handleLanguageChange("vi");
        } else {
            handleLanguageChange("en");
        }
    };

    const isDarkTheme = useSelector((state) => state.theme.isDarkTheme);
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
    };

    const handleLogout = () => {
        if (user) {
            logoutUser(dispatch, navigation.navigate);
        } else alert("Bạn chưa đăng nhập!");
    };
    return (
        <SafeAreaView
            style={[
                {
                    backgroundColor: isDarkTheme
                        ? darkSetting.dark.backgroundColor
                        : lightSetting.light.backgroundColor,
                },
                GlobalStyles.customSafeArea,
            ]}
        >
            <ScrollView>
                {!user && (
                    <View style={lightSetting.accountSuccess}>
                        <Image
                            source={{
                                uri: avatar,
                            }}
                            style={lightSetting.avatar}
                        />
                        <View style={{ marginLeft: 16 }}>
                            <Text
                                style={
                                    isDarkTheme
                                        ? darkSetting.textHello
                                        : lightSetting.textHello
                                }
                            >
                                {currentLanguage === "vi"
                                    ? "Xin chào"
                                    : "Welcome!"}
                            </Text>
                            {/* <Text style={{ fontSize: 16, }}>Ấn vào đây để Đăng nhập hoặc Đăng ký</Text> */}
                            <View style={{ flexDirection: "row" }}>
                                <TouchableOpacity
                                    style={
                                        isDarkTheme
                                            ? darkSetting.loginButton
                                            : lightSetting.loginButton
                                    }
                                    onPress={() => {
                                        handleLogin();
                                    }}
                                >
                                    <Text
                                        style={
                                            isDarkTheme
                                                ? darkSetting.loginText
                                                : lightSetting.loginText
                                        }
                                    >
                                        {currentLanguage === "vi"
                                            ? "Đăng nhập"
                                            : "Log in"}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={
                                        isDarkTheme
                                            ? darkSetting.loginButton
                                            : lightSetting.loginButton
                                    }
                                    onPress={() => {
                                        navigate("Register");
                                    }}
                                >
                                    <Text
                                        style={
                                            isDarkTheme
                                                ? darkSetting.loginText
                                                : lightSetting.loginText
                                        }
                                    >
                                        {currentLanguage === "vi"
                                            ? "Đăng ký"
                                            : "Register"}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )}
                {user && (
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
                            <Text
                                style={
                                    isDarkTheme
                                        ? darkSetting.textHello
                                        : lightSetting.textHello
                                }
                            >
                                {user.fullName}
                            </Text>
                            <Text
                                style={
                                    isDarkTheme
                                        ? darkSetting.colorText
                                        : lightSetting.colorText
                                }
                            >
                                @{user.userName}
                            </Text>
                        </View>
                    </View>
                )}
                <View>
                    <View style={lightSetting.title}>
                        <Text
                            style={
                                isDarkTheme
                                    ? darkSetting.fontBlur
                                    : lightSetting.fontBlur
                            }
                        >
                            {currentLanguage === "vi" ? "Tài khoản" : "Account"}
                        </Text>
                    </View>
                    <TouchableOpacity
                        style={
                            isDarkTheme
                                ? darkSetting.setIco
                                : lightSetting.setIco
                        }
                    >
                        <Icon
                            name="user"
                            style={{ paddingStart: 10 }}
                            size={18}
                            color={
                                isDarkTheme
                                    ? darkSetting.dark.color
                                    : lightSetting.light.color
                            }
                        />
                        <Text
                            style={
                                isDarkTheme
                                    ? darkSetting.fontText
                                    : lightSetting.fontText
                            }
                        >
                            {currentLanguage === "vi" ? "Tài khoản" : "Account"}
                        </Text>
                        <View style={{ flex: 1 }} />
                        <Icon
                            name="chevron-right"
                            style={{ paddingEnd: 10, opacity: 0.5 }}
                            size={20}
                            color={
                                isDarkTheme
                                    ? darkSetting.dark.color
                                    : lightSetting.light.color
                            }
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={
                            isDarkTheme
                                ? darkSetting.setIco
                                : lightSetting.setIco
                        }
                    >
                        <Icon
                            name="lock"
                            style={{ paddingStart: 10, opacity: 0.6 }}
                            size={18}
                            color={
                                isDarkTheme
                                    ? darkSetting.dark.color
                                    : lightSetting.light.color
                            }
                        />
                        <Text
                            style={
                                isDarkTheme
                                    ? darkSetting.fontText
                                    : lightSetting.fontText
                            }
                        >
                            {currentLanguage === "vi"
                                ? "Quyền riêng tư"
                                : "Privacy"}
                        </Text>
                        <View style={{ flex: 1 }} />
                        <Icon
                            name="chevron-right"
                            style={{ paddingEnd: 10, opacity: 0.5 }}
                            size={20}
                            color={
                                isDarkTheme
                                    ? darkSetting.dark.color
                                    : lightSetting.light.color
                            }
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={
                            isDarkTheme
                                ? darkSetting.setIco
                                : lightSetting.setIco
                        }
                    >
                        <Icon
                            name="shield-alt"
                            style={{ paddingStart: 10, opacity: 0.5 }}
                            size={18}
                            color={
                                isDarkTheme
                                    ? darkSetting.dark.color
                                    : lightSetting.light.color
                            }
                        />
                        <Text
                            style={
                                isDarkTheme
                                    ? darkSetting.fontText
                                    : lightSetting.fontText
                            }
                        >
                            {currentLanguage === "vi" ? "Bảo mật" : "Security"}
                        </Text>
                        <View style={{ flex: 1 }} />
                        <Icon
                            name="chevron-right"
                            style={{ paddingEnd: 10, opacity: 0.5 }}
                            size={20}
                            color={
                                isDarkTheme
                                    ? darkSetting.dark.color
                                    : lightSetting.light.color
                            }
                        />
                    </TouchableOpacity>
                </View>
                <View>
                    <View style={lightSetting.title}>
                        <Text
                            style={
                                isDarkTheme
                                    ? darkSetting.fontBlur
                                    : lightSetting.fontBlur
                            }
                        >
                            {currentLanguage === "vi" ? "Hiển thị" : "Display"}
                        </Text>
                    </View>
                    <View
                        style={
                            isDarkTheme
                                ? darkSetting.setIco
                                : lightSetting.setIco
                        }
                    >
                        <Icon
                            name="globe-asia"
                            style={{ paddingStart: 10, opacity: 0.5 }}
                            size={18}
                            color={
                                isDarkTheme
                                    ? darkSetting.dark.color
                                    : lightSetting.light.color
                            }
                        />
                        <Text
                            style={
                                isDarkTheme
                                    ? darkSetting.fontText
                                    : lightSetting.fontText
                            }
                        >
                            {currentLanguage === "vi" ? "Ngôn ngữ" : "Language"}
                        </Text>
                        <View style={{ flex: 1 }} />
                        <Switch
                            trackColor={{ false: "#767577", true: "#2196F3" }}
                            thumbColor={"#fff"}
                            style={{
                                bottom: 5,
                                height: "100%",
                                width: 50,
                                transform: [{ scaleX: 0.75 }, { scaleY: 0.75 }],
                            }}
                            onValueChange={handleLanguageToggle}
                            value={isLanguageEn}
                        />
                    </View>
                    <TouchableOpacity
                        style={
                            isDarkTheme
                                ? darkSetting.setIco
                                : lightSetting.setIco
                        }
                    >
                        <Icon
                            name="bell"
                            style={{ paddingStart: 10, opacity: 0.6 }}
                            size={18}
                            color={
                                isDarkTheme
                                    ? darkSetting.dark.color
                                    : lightSetting.light.color
                            }
                        />
                        <Text
                            style={
                                isDarkTheme
                                    ? darkSetting.fontText
                                    : lightSetting.fontText
                            }
                        >
                            {currentLanguage === "vi"
                                ? "Thông báo"
                                : "Notification"}
                        </Text>
                        <View style={{ flex: 1 }} />
                        <Icon
                            name="chevron-right"
                            style={{ paddingEnd: 10, opacity: 0.5 }}
                            size={20}
                            color={
                                isDarkTheme
                                    ? darkSetting.dark.color
                                    : lightSetting.light.color
                            }
                        />
                    </TouchableOpacity>

                    <View
                        style={[
                            isDarkTheme
                                ? darkSetting.setIco
                                : lightSetting.setIco,
                        ]}
                    >
                        <Icon
                            name="moon"
                            style={{ paddingStart: 10 }}
                            size={18}
                            color={
                                isDarkTheme
                                    ? darkSetting.dark.color
                                    : lightSetting.light.color
                            }
                        />
                        <Text
                            style={
                                isDarkTheme
                                    ? darkSetting.fontText
                                    : lightSetting.fontText
                            }
                        >
                            {currentLanguage === "vi"
                                ? "Chế độ tối"
                                : "Dark mode"}
                        </Text>
                        <View style={{ flex: 1 }} />
                        <Switch
                            trackColor={{ false: "#767577", true: "#2196F3" }}
                            thumbColor={"#fff"}
                            style={{
                                bottom: 5,
                                height: "100%",
                                width: 50,
                                transform: [{ scaleX: 0.75 }, { scaleY: 0.75 }],
                            }}
                            onValueChange={() => dispatch(toggleDarkMode())}
                            value={isDarkTheme}
                        />
                    </View>
                </View>
                <View>
                    <View style={lightSetting.title}>
                        <Text
                            style={
                                isDarkTheme
                                    ? darkSetting.fontBlur
                                    : lightSetting.fontBlur
                            }
                        >
                            {currentLanguage === "vi"
                                ? "Hỗ trợ & giới thiệu"
                                : "Support & Introduction"}
                        </Text>
                    </View>
                    <TouchableOpacity
                        style={
                            isDarkTheme
                                ? darkSetting.setIco
                                : lightSetting.setIco
                        }
                    >
                        <Icon
                            name="exclamation-triangle"
                            style={{ paddingStart: 10, opacity: 0.5 }}
                            size={18}
                            color={
                                isDarkTheme
                                    ? darkSetting.dark.color
                                    : lightSetting.light.color
                            }
                        />
                        <Text
                            style={
                                isDarkTheme
                                    ? darkSetting.fontText
                                    : lightSetting.fontText
                            }
                        >
                            {currentLanguage === "vi"
                                ? "Báo cáo vấn đề"
                                : "Issue report"}
                        </Text>
                        <View style={{ flex: 1 }} />
                        <Icon
                            name="chevron-right"
                            style={{ paddingEnd: 10, opacity: 0.5 }}
                            size={20}
                            color={
                                isDarkTheme
                                    ? darkSetting.dark.color
                                    : lightSetting.light.color
                            }
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={
                            isDarkTheme
                                ? darkSetting.setIco
                                : lightSetting.setIco
                        }
                    >
                        <Icon
                            name="toolbox"
                            style={{ paddingStart: 10, opacity: 0.6 }}
                            size={18}
                            color={
                                isDarkTheme
                                    ? darkSetting.dark.color
                                    : lightSetting.light.color
                            }
                        />
                        <Text
                            style={
                                isDarkTheme
                                    ? darkSetting.fontText
                                    : lightSetting.fontText
                            }
                        >
                            {currentLanguage === "vi" ? "Hỗ trợ" : "Support"}
                        </Text>
                        <View style={{ flex: 1 }} />
                        <Icon
                            name="chevron-right"
                            style={{ paddingEnd: 10, opacity: 0.5 }}
                            size={20}
                            color={
                                isDarkTheme
                                    ? darkSetting.dark.color
                                    : lightSetting.light.color
                            }
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={
                            isDarkTheme
                                ? darkSetting.setIco
                                : lightSetting.setIco
                        }
                    >
                        <Icon
                            name="info-circle"
                            style={{ paddingStart: 10, opacity: 0.5 }}
                            size={18}
                            color={
                                isDarkTheme
                                    ? darkSetting.dark.color
                                    : lightSetting.light.color
                            }
                        />
                        <Text
                            style={
                                isDarkTheme
                                    ? darkSetting.fontText
                                    : lightSetting.fontText
                            }
                        >
                            {currentLanguage === "vi"
                                ? "Giới thiệu"
                                : "Introduction"}
                        </Text>
                        <View style={{ flex: 1 }} />
                        <Icon
                            name="chevron-right"
                            style={{ paddingEnd: 10, opacity: 0.5 }}
                            size={20}
                            color={
                                isDarkTheme
                                    ? darkSetting.dark.color
                                    : lightSetting.light.color
                            }
                        />
                    </TouchableOpacity>
                </View>
                <View>
                    <View style={lightSetting.title}>
                        <Text
                            style={
                                isDarkTheme
                                    ? darkSetting.fontBlur
                                    : lightSetting.fontBlur
                            }
                        >
                            {currentLanguage === "vi"
                                ? "Quản lý"
                                : "Management"}
                        </Text>
                    </View>
                    <TouchableOpacity
                        style={
                            isDarkTheme
                                ? darkSetting.setIco
                                : lightSetting.setIco
                        }
                    >
                        <Icon
                            name="sync"
                            style={{ paddingStart: 10, opacity: 0.5 }}
                            size={18}
                            color={
                                isDarkTheme
                                    ? darkSetting.dark.color
                                    : lightSetting.light.color
                            }
                        />
                        <Text
                            style={
                                isDarkTheme
                                    ? darkSetting.fontText
                                    : lightSetting.fontText
                            }
                        >
                            {currentLanguage === "vi"
                                ? "Chuyển đổi tài khoản"
                                : "Switch account"}
                        </Text>
                        <View style={{ flex: 1 }} />
                        <Icon
                            name="chevron-right"
                            style={{ paddingEnd: 10, opacity: 0.5 }}
                            size={20}
                            color={
                                isDarkTheme
                                    ? darkSetting.dark.color
                                    : lightSetting.light.color
                            }
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={
                            isDarkTheme
                                ? darkSetting.setIco
                                : lightSetting.setIco
                        }
                        onPress={() => {
                            handleLogout();
                        }}
                    >
                        <Icon
                            name="sign-out-alt"
                            style={{ paddingStart: 10, opacity: 0.6 }}
                            size={18}
                            color={
                                isDarkTheme
                                    ? darkSetting.dark.color
                                    : lightSetting.light.color
                            }
                        />
                        <Text
                            style={
                                isDarkTheme
                                    ? darkSetting.fontText
                                    : lightSetting.fontText
                            }
                        >
                            {currentLanguage === "vi" ? "Đăng xuất" : "Log out"}
                        </Text>
                        <View style={{ flex: 1 }} />
                        <Icon
                            name="chevron-right"
                            style={{ paddingEnd: 10, opacity: 0.5 }}
                            size={20}
                            color={
                                isDarkTheme
                                    ? darkSetting.dark.color
                                    : lightSetting.light.color
                            }
                        />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
