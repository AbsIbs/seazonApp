import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Entypo from 'react-native-vector-icons/Entypo'
import { CardStyleInterpolators } from '@react-navigation/stack';

import { AddRecipeProvider } from "../../Global/AddRecipeContext";

import RecipeForm from "../screens/recipeForm";
import RecipeAddIngredient from "../screens/recipeUpload/recipeAddIngredient";
import RecipeAddStep from "../screens/recipeUpload/recipeAddStep";
import RecipeEditIngredient from "../screens/recipeUpload/recipeEditIngredient";
import RecipeEditStep from "../screens/recipeUpload/recipeEditStep";

const RecipeFormStack = () => {

  const Stack = createStackNavigator();

  return (
    <AddRecipeProvider>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          presentation: "transparentModal"
        }}>
        <Stack.Screen
          name='Recipe Form'
          component={RecipeForm}
          options={{
            title: 'Upload a recipe',
            headerShown: true,
            headerTitle: 'Upload a recipe',
            headerBackImage: () => {
              return (
                <Entypo
                  name="cross"
                  size={25}
                  color={'white'} />
              )
            },
            headerShadowVisible: false,
            headerTitleStyle: {
              fontSize: 14,
              color: 'white',
              fontWeight: 'bold'
            },
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: 'black'
            }
          }} />
        <Stack.Screen
          name="Add Ingredient"
          component={RecipeAddIngredient}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
          }} />
        <Stack.Screen
          name="Edit Ingredient"
          component={RecipeEditIngredient}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
          }} />
        <Stack.Screen
          name="Add Step"
          component={RecipeAddStep}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
          }} />
        <Stack.Screen
          name="Edit Step"
          component={RecipeEditStep}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
          }} />
      </Stack.Navigator>
    </AddRecipeProvider>
  )
};

export default RecipeFormStack;