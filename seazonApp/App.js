import React from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator} from "@react-navigation/stack";


import { Amplify } from 'aws-amplify'
import awsconfig from './src/aws-exports'

Amplify.configure(awsconfig);

// Sign up/log in screens
import SignInPage from "./src/screens/signInPage";
import SignUpStack from "./src/routes/signUpStack";
import MainStack from "./src/routes/mainStack";

const Stack = createStackNavigator()

function App({ navigation }) {
    return(
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}>
                <Stack.Screen name='Main Stack' component={MainStack} />
                <Stack.Screen name='Sign In' component={SignInPage} />
                <Stack.Screen name='Sign Up' component={SignUpStack} />
            </Stack.Navigator>
        </NavigationContainer>
    )
};

export default App;