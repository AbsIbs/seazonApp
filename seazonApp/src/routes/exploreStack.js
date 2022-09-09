import React from "react";
import { CardStyleInterpolators, createStackNavigator} from "@react-navigation/stack";

import Explore from "../screens/explore";

const Stack = createStackNavigator()

function ExploreStack() {
    return(
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS}}>
                <Stack.Screen name='Explore: Home' component={Explore} />
        </Stack.Navigator>
    )
};

export default ExploreStack;