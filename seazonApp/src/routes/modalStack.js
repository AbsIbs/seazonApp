import React from "react";
import { CardStyleInterpolators, createStackNavigator} from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import RecipeForm from "../screens/recipeForm";
import RecipeFormHeader from "../components/recipeFormHeader";

const Stack = createStackNavigator()

const ModalStack = ({navigation}) => {
    return(
        <NavigationContainer
         independent={true}>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
                }}>
                <Stack.Screen
                name='Recipe Form'
                component={RecipeForm}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
};

export default ModalStack;