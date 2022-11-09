import React from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator} from "@react-navigation/stack";

import { Amplify } from 'aws-amplify'
import awsconfig from './src/aws-exports'

Amplify.configure(awsconfig);

// Sign up/log in screens
import LandingPage from "./src/screens/landingPage";
import SignInPage from "./src/screens/signInPage";
import SignUpPage from "./src/screens/SignUpPage";

import ModalStack from "./src/routes/modalStack";
import BottomTabsStack from "./src/routes/bottomTabsStack";

const Stack = createStackNavigator()

function App({ navigation }) {
    return(
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}>
                <Stack.Screen name='Landing Page' component={LandingPage} />
                <Stack.Screen name='Sign In' component={SignInPage} />
                <Stack.Screen name='Sign Up' component={SignUpPage} />
                <Stack.Screen name='Bottom Tabs Stack' component={BottomTabsStack} />
                <Stack.Screen name='Modal Stack' component={ModalStack} /> 
            </Stack.Navigator>
        </NavigationContainer>
    )
};

export default App;