import React from "react";
import { CardStyleInterpolators, createStackNavigator} from "@react-navigation/stack";

import SignUpPage1 from "../screens/signUpPage1";
import SignUpPage2 from "../screens/signUpPage2";
import SignUpPage3 from "../screens/signUpPage3";
import SignUpPage4 from "../screens/signUpPage4";
import SignUpPage5 from "../screens/signUpPage5";
import SignUpComplete from "../screens/signUpComplete";

const Stack = createStackNavigator()

function SignUpStack() {
    return(
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS}}>
                <Stack.Screen name='Sign Up Page 1' component={SignUpPage1} />
                <Stack.Screen name='Sign Up Page 2' component={SignUpPage2}/>
                <Stack.Screen name='Sign Up Page 3' component={SignUpPage3}/>
                <Stack.Screen name='Sign Up Page 4' component={SignUpPage4}/>
                <Stack.Screen name='Sign Up Page 5' component={SignUpPage5}/>
                <Stack.Screen name='Sign Up Complete' component={SignUpComplete}/>
        </Stack.Navigator>
    )
};

export default SignUpStack;