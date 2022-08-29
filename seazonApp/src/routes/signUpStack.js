import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { CardStyleInterpolators, createStackNavigator} from "@react-navigation/stack";

import SignUpPage1 from "../screens/signUpPage1";
import SignUpPage2 from "../screens/signUpPage2";
import Example from "../screens/example";

const Stack = createStackNavigator()

function SignUpStack() {
    return(
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS}}>
                {/* <Stack.Screen name='example' component={Example}/> */}
                <Stack.Screen name='Sign Up Page 1' component={SignUpPage1} />
                <Stack.Screen name='Sign Up Page 2' component={SignUpPage2}/>
        </Stack.Navigator>
    )
};

export default SignUpStack;