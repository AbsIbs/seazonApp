import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { CardStyleInterpolators } from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { theme, ThemeProvider } from "react-native-design-system";

// Global states
import { AuthProvider } from "./Global/AuthContext";
import { BottomSheetProvider } from "./Global/BottomSheetContext";

// Bottom Sheet
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// Firebase
import { auth } from './firebase/firebase-config'

// Sign up/log in screens
import LandingPage from "./src/screens/landingPage";
import SignInPage from "./src/screens/signInPage";
import SignUpPage from "./src/screens/signUp/SignUpPage";

// Recipe Screens
import RecipeViewer from "./src/screens/global/recipeViewer/recipeViewer";
import RecipeFormStack from "./src/routes/recipeFormStack";
import RecipeAddComment from "./src/screens/global/recipeViewer/recipeAddComment";
import RecipeEditComment from "./src/screens/global/recipeViewer/recipeEditComment";

// Stacks
import DrawerStack from "./src/routes/drawerStack";

// Other screens


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
        {/* <BottomSheetProvider> */}
        <GestureHandlerRootView style={{ flex: 1 }} >
          <BottomSheetModalProvider>

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
                      }} />
                    <Stack.Screen
                      name='Recipe Form Stack'
                      component={RecipeFormStack}
                      options={{
                        headerShown: false,
                        cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS
                      }} />
                    <Stack.Screen
                      name='Recipe Viewer'
                      component={RecipeViewer}
                      options={{
                        headerShown: false,
                        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
                      }} />
                    <Stack.Screen
                      name='Recipe Add Comments'
                      component={RecipeAddComment}
                      options={{
                        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                        headerShown: false
                      }} />
                    <Stack.Screen
                      name='Recipe Edit Comments'
                      component={RecipeEditComment}
                      options={{
                        cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
                        headerTitle: 'Edit Comment',
                        headerStyle: {
                          backgroundColor: '#121212'
                        },
                        headerTitleStyle: {
                          fontSize: 16,
                          color: 'white',
                          fontWeight: 'bold'
                        },
                        headerTintColor: '#ffffff'
                      }} />
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
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
        {/* </BottomSheetProvider> */}
      </AuthProvider>
    </ThemeProvider>
  )
};

export default App;