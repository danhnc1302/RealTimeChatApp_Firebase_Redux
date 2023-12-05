import React from "react";
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { COLORS } from "../Components/Constant/Color";
import Login from "../Screens/Auth/Login";
import Register from "../Screens/Auth/Register";

const Stack = createStackNavigator();

export default function AuthStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                // cardStyle: {backgroundColor: COLORS.theme},
                gestureEnabled: true,
                backgroundColor: COLORS.theme,
                headerShown: false
            }}
            initialRouteName="Login"
        >
            <Stack.Screen name="Login" component={Login}/>
            <Stack.Screen name="Register" component={Register}/>
        </Stack.Navigator>
    );
}