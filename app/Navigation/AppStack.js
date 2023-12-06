import React from "react";
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { COLORS } from "../Components/Constant/Color";
import Home from "../Screens/Home/Home";
import SingleChat from "../Screens/Home/SingleChat";
import AllUser from "../Screens/User/AllUser";
const Stack = createStackNavigator();

export default function AppStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                // cardStyle: {backgroundColor: COLORS.theme},
                gestureEnabled: true,
                backgroundColor: COLORS.theme,
                headerShown: false
            }}
            initialRouteName="Home"
        >
            <Stack.Screen name="Home" component={Home}/>
            <Stack.Screen name="SingleChat" component={SingleChat}/>
            <Stack.Screen name="AllUser" component={AllUser}/>
        </Stack.Navigator>
    );
}