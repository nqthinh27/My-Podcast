import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import Notify from "../screens/Notify/Notify";
import Library from "../screens/Library/Library";
import LibraryDetail from "../screens/Library/LibraryDetail";
import Following from "../screens/Following";
import Post from "../screens/Post";
import Setting from "../screens/Setting";
import UIScreen from "./UIScreen";
import PlayerScreen from "../screens/Player/PlayerScreen";
import Login from "../screens/Login";
import MyProfile from "../screens/Profile/MyProfile";
import EditProfile from "../screens/Profile/EditProfile";
import FollowDetail from "../screens/Profile/FollowDetail";
import OtherProfile from "../screens/Profile/OtherProfile";
import Register from "../screens/Register/Register";
import RegisterOTP from "../screens/Register/RegisterOTP";
import colors from "../constants/colors";
import { useSelector, useDispatch } from "react-redux";

const Stack = createNativeStackNavigator();
export default function Navigator(props) {
    const isDarkTheme = useSelector((state) => state.theme.isDarkTheme);
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="UIScreen" screenOptions={{ headerShown: false }} >
                <Stack.Screen name={"Home"} component={Home} />
                <Stack.Screen name={"Notify"} component={Notify} />
                <Stack.Screen name={"Following"} component={Following} />
                <Stack.Screen name={"Library"} component={Library} />
                <Stack.Screen name={"LibraryDetail"} component={LibraryDetail} />
                <Stack.Screen name={"UIScreen"} component={UIScreen} />
                <Stack.Screen name={"Post"} component={Post} />
                <Stack.Screen name={"Setting"} component={Setting} />
                <Stack.Screen name={"PlayerScreen"} component={PlayerScreen} />
                <Stack.Screen name={"Login"} component={Login} />
                <Stack.Screen name={"Register"} component={Register} />
                <Stack.Screen name={"RegisterOTP"} component={RegisterOTP} />
                <Stack.Screen name={"MyProfile"} component={MyProfile} />
                <Stack.Screen name={"EditProfile"} component={EditProfile} />
                <Stack.Screen name={"FollowDetail"} component={FollowDetail} />
                <Stack.Screen name={"OtherProfile"} component={OtherProfile} />
            </Stack.Navigator>
        </NavigationContainer>
    )

}
