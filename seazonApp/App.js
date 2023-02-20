import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { CardStyleInterpolators } from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { theme, ThemeProvider } from "react-native-design-system";

// Global states
import { AuthProvider } from "./Global/AuthContext";

// Firebase
import { auth } from './firebase/firebase-config'

// Sign up/log in screens
import LandingPage from "./src/screens/landingPage";
import SignInPage from "./src/screens/signInPage";
import SignUpPage from "./src/screens/signUp/SignUpPage";
/* import RecipeForm from "./src/screens/recipeForm"; */
import RecipeFormStack from "./src/routes/recipeFormStack";

// Stacks
import DrawerStack from "./src/routes/drawerStack";

const Stack = createStackNavigator()

function App() {

  const [loggedIn, setLoggedIn] = useState(false)

  auth.onAuthStateChanged((user) => {
    if (user) {
      setLoggedIn(true)
    } else {
      setLoggedIn(false)
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerTitleAlign: 'center',
              presentation: 'transparentModal'
            }}>
            {loggedIn ? (
              <Stack.Group>
                <Stack.Screen
                  name='Drawer Stack'
                  component={DrawerStack}
                  options={{
                    headerShown: false
                  }}
                />
                <Stack.Screen
                  name='Recipe Form Stack'
                  component={RecipeFormStack}
                  options={{
                    headerShown: false,
                    cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
                  }}
                />
              </Stack.Group>
            ) : (
              <Stack.Group>
                <Stack.Screen
                  name='Landing Page'
                  component={LandingPage}
                  options={{
                    headerShown: false
                  }} />
                <Stack.Screen
                  name='Sign In'
                  component={SignInPage}
                  options={{
                    title: 'Sign In',
                    cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
                    headerShown: false
                  }} />
                <Stack.Screen
                  name='Sign Up'
                  component={SignUpPage}
                  options={{
                    title: 'Sign Up',
                    cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
                    headerTitle: 'Profile setup',
                    headerBackImage: () => {
                      return (
                        <MaterialCommunityIcons
                          name="chevron-left"
                          size={35}
                          color={'white'} />
                      )
                    },
                    headerShadowVisible: false,
                    headerTitleStyle: {
                      fontSize: 16,
                      color: 'white',
                      fontWeight: 'bold'
                    },
                    headerStyle: {
                      backgroundColor: '#121212'
                    }
                  }} />
              </Stack.Group>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </AuthProvider>
    </ThemeProvider>
  )
};

export default App;