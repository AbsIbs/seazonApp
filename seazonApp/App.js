import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator} from "@react-navigation/stack";

import { Amplify } from 'aws-amplify'
import awsconfig from './src/aws-exports'

Amplify.configure(awsconfig);

// Screns
import SignInPage from "./src/screens/signInPage";

const Stack = createStackNavigator()

function App({ navigation }){
    return(
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}>
                <Stack.Screen
                    name='Sign Up'
                    component={SignInPage} />
            </Stack.Navigator>
        </NavigationContainer>
    )
};

export default App;