import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import Library from "../screens/Library";
import Following from "../screens/Following";
import Post from "../screens/Post";
import Setting from "../screens/Setting";
import UIScreen from "./UIScreen";

const Stack = createNativeStackNavigator();
export default function Navigator(props) {
    return <NavigationContainer>
        <Stack.Navigator initialRouteName="UIScreen" screenOptions={{headerShown:false}}>
            <Stack.Screen name={"Home"} component={Home} />
            <Stack.Screen name={"Following"} component={Following}/>
            <Stack.Screen name={"Library"} component={Library}/>
            <Stack.Screen name={"UIScreen"} component={UIScreen}/>
            <Stack.Screen name={"Post"} component={Post}/>
            <Stack.Screen name={"Setting"} component={Setting}/>
        </Stack.Navigator>
    </NavigationContainer>
}
