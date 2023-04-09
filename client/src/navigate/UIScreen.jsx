import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from "react-native";
import Home from "../screens/Home";
import Library from "../screens/Library";
import Following from "../screens/Following";
import Post from "../screens/Post";
import Setting from "../screens/Setting";

const Tab = createBottomTabNavigator();
const screenOptions = ({ route }) => ({
    headerShown: false,
    tabBarActiveTintColor: "#FFA800",
    tabBarInactiveTintColor: '#888888',
    tabBarIcon: ({ focused, color, size }) => {
        let screenName = route.name;
        let iconName = "";
        if (screenName == "Home") {
            return <Image
                style={{ width: 25, height: 25, marginTop: 3 }}
                source={{
                    uri: focused ? 'https://firebasestorage.googleapis.com/v0/b/mypodcast-88135.appspot.com/o/icon%2Fico_home_active.png?alt=media&token=06367cd4-32f6-4c85-9a88-1364c17788ce' : 'https://firebasestorage.googleapis.com/v0/b/mypodcast-88135.appspot.com/o/icon%2Fico_home_inactive.png?alt=media&token=c4ecc541-505a-4ef5-90b8-0ad6f446404e',
                }} />
        }
        else if (screenName == "Following") {
            return <Image
                style={{ width: 25, height: 25, marginTop: 3 }}
                source={{
                    uri: focused ? 'https://firebasestorage.googleapis.com/v0/b/mypodcast-88135.appspot.com/o/icon%2Fico_follow_active.png?alt=media&token=23ae2dd0-9ef7-40ad-894c-a0f3134eba18' : 'https://firebasestorage.googleapis.com/v0/b/mypodcast-88135.appspot.com/o/icon%2Fico_follow_inactive.png?alt=media&token=513a3d05-afb5-4fb6-a6cc-ba6bcabb859b',
                }} />
        } else if (screenName == "Post") {
            return <Image
                style={{ width: 50, height: 50, marginTop: 14 }}
                source={{
                    uri: 'https://firebasestorage.googleapis.com/v0/b/mypodcast-88135.appspot.com/o/icon%2Fico_post.png?alt=media&token=c5e877aa-948a-440a-9a5a-6973bbc09784',
                }} />
        } else if (screenName == "Library") {
            return <Image
                style={{ width: 25, height: 25, marginTop: 3 }}
                source={{
                    uri: focused ? 'https://firebasestorage.googleapis.com/v0/b/mypodcast-88135.appspot.com/o/icon%2Fico_lib_active.png?alt=media&token=0a3bb07a-79cc-4a92-a56f-ec496c8a95f9' : 'https://firebasestorage.googleapis.com/v0/b/mypodcast-88135.appspot.com/o/icon%2Fico_lib_inactive.png?alt=media&token=a1d2afb9-f12c-4028-9536-39bd2511ecd0',
                }} />
        } else if (screenName == "Setting") {
            return <Image
                style={{ width: 25, height: 25, marginTop: 3 }}
                source={{
                    uri: focused ? 'https://firebasestorage.googleapis.com/v0/b/mypodcast-88135.appspot.com/o/icon%2Fico_setting_active.png?alt=media&token=611639a8-001c-4230-ad75-7bd5f06d895c' : 'https://firebasestorage.googleapis.com/v0/b/mypodcast-88135.appspot.com/o/icon%2Fico_setting_inactive.png?alt=media&token=822a3b0e-1060-4f19-a6d4-62a8aea50579',
                }} />
        }

    }
});
export default function UIScreen(props) {
    return (
        <Tab.Navigator initialRouteName="Home" screenOptions={screenOptions}>
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    title: 'Trang chủ',
                }}
            />
            <Tab.Screen
                name="Following"
                component={Following}
                options={{
                    tabBarLabel: 'Theo dõi'
                }} />
            <Tab.Screen
                name="Post"
                component={Post}
                options={{
                    tabBarLabel: ''
                }} />
            <Tab.Screen
                name="Library"
                component={Library}
                options={{
                    tabBarLabel: 'Thư viện'
                }} />
            <Tab.Screen
                name="Setting"
                component={Setting} options={{
                    tabBarLabel: 'Cài đặt'
                }} />
        </Tab.Navigator>
    )
}
