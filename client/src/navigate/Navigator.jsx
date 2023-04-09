import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import Library from "../screens/Library";
import Following from "../screens/Following";
import Post from "../screens/Post";
import Setting from "../screens/Setting";
import UIScreen from "./UIScreen";
import PlayerScreen from "../screens/PlayerScreen";
import Login from "../screens/Login";
import MyProfile from "../screens/MyProfile";
import Register from "../screens/Register/Register";
import RegisterOTP from "../screens/Register/RegisterOTP";

const Stack = createNativeStackNavigator();
export default function Navigator(props) {
    return <NavigationContainer>
        <Stack.Navigator initialRouteName="UIScreen" screenOptions={{headerShown:false}} >
            <Stack.Screen name={"Home"} component={Home} />
            <Stack.Screen name={"Following"} component={Following}/>
            <Stack.Screen name={"Library"} component={Library}/>
            <Stack.Screen name={"UIScreen"} component={UIScreen}/>
            <Stack.Screen name={"Post"} component={Post}/>
            <Stack.Screen name={"Setting"} component={Setting}/>
            <Stack.Screen name={"PlayerScreen"} component={PlayerScreen}/>
            <Stack.Screen name={"Login"} component={Login}/>
            <Stack.Screen name={"Register"} component={Register}/>
            <Stack.Screen name={"RegisterOTP"} component={RegisterOTP}/>
            <Stack.Screen name={"RegisterOTP"} component={RegisterOTP}/>
            <Stack.Screen name={"MyProfile"} component={MyProfile}/>
        </Stack.Navigator>
    </NavigationContainer>
}
