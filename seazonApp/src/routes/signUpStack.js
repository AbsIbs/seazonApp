import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator} from "@react-navigation/stack";

import SignUpPage1 from "../screens/signUpPage1";

const Stack = createStackNavigator()

function SignUpStack() {
    return(
        <Stack.Navigator
            screenOptions={{headerShown: false}}>
                <Stack.Screen name='Sign Up Page 1' component={SignUpPage1} />
        </Stack.Navigator>
    )
};

export default SignUpStack;