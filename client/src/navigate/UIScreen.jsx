import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from "react-native";
import Home from "../screens/Home";
import Library from "../screens/Library/Library";
import Following from "../screens/Following";
import Post from "../screens/Post";
import Setting from "../screens/Setting";
import { useSelector } from "react-redux";
import colors from "../constants/colors";

const Tab = createBottomTabNavigator();
const screenOptions = ({ route }) => ({
    headerShown: false,
    tabBarActiveTintColor: "#FFA800",
    tabBarInactiveTintColor: '#888888',
    tabBarIcon: ({ focused, color, size }) => {
        let screenName = route.name;
        if (screenName == "Home") {
            return <Image
                style={{ width: 25, height: 25, marginTop: 3 }}
                source={focused ? require("../../assets/navBar/ico_home_active.png") : require("../../assets/navBar/ico_home_inactive.png") } />
        }
        else if (screenName == "Following") {
            return <Image
                style={{ width: 25, height: 25, marginTop: 3 }}
                source={focused ? require("../../assets/navBar/ico_follow_active.png") : require("../../assets/navBar/ico_follow_inactive.png") } />
        } else if (screenName == "Post") {
            return <Image
                style={{ width: 50, height: 50, marginTop: 14 }}
                source={require("../../assets/navBar/ico_post.png")} />
        } else if (screenName == "Library") {
            return <Image
                style={{ width: 25, height: 25, marginTop: 3 }}
                source={focused ? require("../../assets/navBar/ico_lib_active.png") : require("../../assets/navBar/ico_lib_inactive.png") } />
        } else if (screenName == "Setting") {
            return <Image
                style={{ width: 25, height: 25, marginTop: 3 }}
                source={focused ? require("../../assets/navBar/ico_setting_active.png") : require("../../assets/navBar/ico_setting_inactive.png") } />
        }
    }
});

export default function UIScreen(props) {
    const isDarkTheme = useSelector((state) => state.theme.isDarkTheme);

    return (
        <Tab.Navigator initialRouteName="Home" screenOptions={screenOptions}>
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    title: 'Trang chủ',
                    tabBarActiveBackgroundColor: isDarkTheme ? colors.black : colors.white,
                    tabBarInactiveBackgroundColor: isDarkTheme ? colors.black : colors.white,
                }}
            />
            <Tab.Screen
                name="Following"
                component={Following}
                options={{
                    tabBarLabel: 'Theo dõi',
                    tabBarActiveBackgroundColor: isDarkTheme ? colors.black : colors.white,
                    tabBarInactiveBackgroundColor: isDarkTheme ? colors.black : colors.white,
                }} />
            <Tab.Screen
                name="Post"
                component={Post}
                options={{
                    tabBarLabel: '',
                    tabBarActiveBackgroundColor: isDarkTheme ? colors.black : colors.white,
                    tabBarInactiveBackgroundColor: isDarkTheme ? colors.black : colors.white,
                }} />
            <Tab.Screen
                name="Library"
                component={Library}
                options={{
                    tabBarLabel: 'Thư viện',
                    tabBarActiveBackgroundColor: isDarkTheme ? colors.black : colors.white,
                    tabBarInactiveBackgroundColor: isDarkTheme ? colors.black : colors.white,
                }} />
            <Tab.Screen
                name="Setting"
                component={Setting} options={{
                    tabBarLabel: 'Cài đặt',
                    tabBarActiveBackgroundColor: isDarkTheme ? colors.black : colors.white,
                    tabBarInactiveBackgroundColor: isDarkTheme ? colors.black : colors.white,
                }} />
        </Tab.Navigator>
    )
}
