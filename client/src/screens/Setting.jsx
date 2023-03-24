import React, { useState } from "react";
import {
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Switch
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
// import symbolicateStackTrace from "react-native/Libraries/Core/Devtools/symbolicateStackTrace";
import variable from "../constants/variable";
import GlobalStyles from "../components/GlobalStyles";

export default function Setting(props) {
    //navigation
    const { navigation, route } = props;
    //function of navigate 
    const { navigate, goback } = navigation;

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    

    return (
        <SafeAreaView style={[{ backgroundColor: "#fff" }, GlobalStyles.customSafeArea]}>
            <ScrollView>
                <View>
                    <Text style={styles.setting}>Cài đặt và quyền riêng tư</Text>
                </View>

                <View><View style={styles.h1}>
                    <Text style={styles.fontBlur}>Tài khoản</Text>
                </View>
                    <TouchableOpacity style={styles.setIco}>
                        <Icon
                            name='user'
                            style={{ paddingStart: 10 }}
                            size={18} color={'black'}
                        />
                        <Text style={styles.fontText}>Tài khoản</Text>
                        <View style={{ flex: 1 }} />
                        <Icon
                            name='chevron-right'
                            style={{ paddingEnd: 10, opacity: 0.5 }}
                            size={20} color={'black'}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.setIco}>
                        <Icon
                            name='lock'
                            style={{ paddingStart: 10, opacity: 0.6 }}
                            size={18} color={'black'}
                        />
                        <Text style={styles.fontText}>Quyền riêng tư</Text>
                        <View style={{ flex: 1 }} />
                        <Icon
                            name='chevron-right'
                            style={{ paddingEnd: 10, opacity: 0.5 }}
                            size={20} color={'black'}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.setIco}>
                        <Icon
                            name='shield-alt'
                            style={{ paddingStart: 10, opacity: 0.5 }}
                            size={18} color={'black'}
                        />
                        <Text style={styles.fontText}>Bảo mật</Text>
                        <View style={{ flex: 1 }} />
                        <Icon
                            name='chevron-right'
                            style={{ paddingEnd: 10, opacity: 0.5 }}
                            size={20} color={'black'}
                        />
                    </TouchableOpacity></View>

                <View><View style={styles.h1}>
                    <Text style={styles.fontBlur}>Hiện thị </Text>
                </View>
                    <TouchableOpacity style={styles.setIco}>
                        <Icon
                            name='globe-asia'
                            style={{ paddingStart: 10, opacity: 0.5 }}
                            size={18} color={'black'}
                        />
                        <Text style={styles.fontText}>Ngôn ngữ</Text>
                        <View style={{ flex: 1 }} />
                        <Icon
                            name='chevron-right'
                            style={{ paddingEnd: 10, opacity: 0.5 }}
                            size={20} color={'black'}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.setIco}>
                        <Icon
                            name='bell'
                            style={{ paddingStart: 10, opacity: 0.6 }}
                            size={18} color={'black'}
                        />
                        <Text style={styles.fontText}>Thông báo</Text>
                        <View style={{ flex: 1 }} />
                        <Icon
                            name='chevron-right'
                            style={{ paddingEnd: 10, opacity: 0.5 }}
                            size={20} color={'black'}
                        />
                    </TouchableOpacity>

                    <View style={styles.setIco}>
                        <Icon
                            name='moon'
                            style={{ paddingStart: 10 }}
                            size={18} color={'black'}
                        />
                        <Text style={styles.fontText}>Chế độ tối</Text>
                        <View style={{ flex: 1 }} />
                        <Switch
                            trackColor={{ false: "#767577", true: "#2196F3" }}
                            thumbColor={'#fff'}
                            style={{
                                height: 25,
                                width: 25,
                            }}
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                        />
                    </View>
                </View>

                <View><View style={styles.h1}>
                    <Text style={styles.fontBlur}>Hỗ trợ & Giới thiệu</Text>
                </View>
                    <TouchableOpacity style={styles.setIco}>
                        <Icon
                            name='exclamation-triangle'
                            style={{ paddingStart: 10, opacity: 0.5 }}
                            size={18} color={'black'}
                        />
                        <Text style={styles.fontText}>Báo cáo vấn đề</Text>
                        <View style={{ flex: 1 }} />
                        <Icon
                            name='chevron-right'
                            style={{ paddingEnd: 10, opacity: 0.5 }}
                            size={20} color={'black'}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.setIco}>
                        <Icon
                            name='toolbox'
                            style={{ paddingStart: 10, opacity: 0.6 }}
                            size={18} color={'black'}
                        />
                        <Text style={styles.fontText}>Hỗ trợ</Text>
                        <View style={{ flex: 1 }} />
                        <Icon
                            name='chevron-right'
                            style={{ paddingEnd: 10, opacity: 0.5 }}
                            size={20} color={'black'}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.setIco}>
                        <Icon
                            name='info-circle'
                            style={{ paddingStart: 10, opacity: 0.5 }}
                            size={18} color={'black'}
                        />
                        <Text style={styles.fontText}>Giới thiệu</Text>
                        <View style={{ flex: 1 }} />
                        <Icon
                            name='chevron-right'
                            style={{ paddingEnd: 10, opacity: 0.5 }}
                            size={20} color={'black'}
                        />
                    </TouchableOpacity></View>

                <View><View style={styles.h1}>
                    <Text style={styles.fontBlur}>Tài khoản</Text>
                </View>
                    <TouchableOpacity style={styles.setIco}>
                        <Icon
                            name='sync'
                            style={{ paddingStart: 10, opacity: 0.5 }}
                            size={18} color={'black'}
                        />
                        <Text style={styles.fontText}>Chuyển tài khoản</Text>
                        <View style={{ flex: 1 }} />
                        <Icon
                            name='chevron-right'
                            style={{ paddingEnd: 10, opacity: 0.5 }}
                            size={20} color={'black'}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.setIco} onPress={() => {
                        variable.isLogin = 0
                        navigate('Home')
                    }}>
                        <Icon
                            name='sign-out-alt'
                            style={{ paddingStart: 10, opacity: 0.6 }}
                            size={18} color={'black'}
                        />
                        <Text style={styles.fontText}>Đăng xuất</Text>
                        <View style={{ flex: 1 }} />
                        <Icon
                            name='chevron-right'
                            style={{ paddingEnd: 10, opacity: 0.5 }}
                            size={20} color={'black'}
                        />
                    </TouchableOpacity></View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    setting: {
        left: 16,
        fontSize: 25,
        fontWeight: "bold",
        marginTop: 10
    },
    h1: {
        top: 10,
        height: 30,
        marginTop: 10
    },

    setIco: {
        flexDirection: 'row',
        paddingVertical: 10,
        alignItems:'center',
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
