import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { CardStyleInterpolators } from '@react-navigation/stack';

// Global states
import { AuthProvider } from "./Global/AuthContext";

// Firebase
import { auth } from "./firebase/firebase-config";

// Sign up/log in screens
import LandingPage from "./src/screens/landingPage";
import SignInPage from "./src/screens/signInPage";
import SignUpPage from "./src/screens/SignUpPage";

import ModalStack from "./src/routes/modalStack";
import BottomTabsStack from "./src/routes/bottomTabsStack";

const Stack = createStackNavigator()

function App() {

  const [loggedIn, setLoggedIn] = useState(false)

  auth.onAuthStateChanged((user) => {
    if (user) {
      setLoggedIn(true)
    }
  })

  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}>
          {loggedIn ? (
            <Stack.Group>
              <Stack.Screen
                name='Bottom Tabs Stack'
                component={BottomTabsStack}
                options={{
                  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
                }} />
              <Stack.Screen name='Modal Stack' component={ModalStack} />
            </Stack.Group>
          ) : (
            <Stack.Group>
              <Stack.Screen name='Landing Page' component={LandingPage} />
              <Stack.Screen
                name='Sign In'
                component={SignInPage}
                options={{
                  title: 'Sign In',
                  cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS
                }} />
              <Stack.Screen
                name='Sign Up'
                component={SignUpPage}
                options={{
                  title: 'Sign Up',
                  cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS
                }} />
            </Stack.Group>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  )
};

export default App;