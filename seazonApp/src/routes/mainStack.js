import React, {useRef} from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet, TouchableOpacity, Animated } from "react-native";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

import Explore from "../screens/explore";
import FoodFeed from "../screens/foodFeed";
import UploadRecipe from "../screens/uploadRecipe"
import MealPlan from "../screens/mealPlan";
import ShoppingPlan from "../screens/shoppingList";

import DockHeader from "../components/dockHeader";

const Tab = createBottomTabNavigator()

const dockLabels = (focused, iconName) => {
  return(
    <View style={styles().container}>
      <FontAwesome5
      name={iconName}
      color = {focused? '#E84A4A': '#555'}
      size = {20}
      />
    </View>
  )
};

function MainStack() {
  const tabOffsetValue = useRef(new Animated.Value(0)).current;
  return(
    <NavigationContainer
     independent={true}>
      <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#181818',
          bottom: 20,
          position: 'absolute',
          marginHorizontal: 20,
          borderRadius: 8,
          height: 60,
          borderTopWidth: 0
        }
      }}> 
        <Tab.Screen 
          name="Explore" 
          component={Explore}
          headerShown = {true} 
          options={{
            tabBarIcon: ({focused}) => dockLabels(focused, 'home', 'Explore'),
            header: () => <DockHeader title={'Explore'} />
          }}/>
        <Tab.Screen 
        name="FoodFeed" 
        component={FoodFeed}
        options={{
          tabBarIcon: ({focused}) => dockLabels(focused, 'search', 'Food Feed'),
          header: () => <DockHeader title={'Food Feed'} /> 
          }}/>
        <Tab.Screen 
        name="Upload Recipe" 
        component={UploadRecipe} 
        options={{
          tabBarIcon: ({focused}) => (
            <View>
              <TouchableOpacity style={styles().button}>
                <FontAwesome5 
                name={'plus'}
                size={20}
                color='#ffffff'
                />
              </TouchableOpacity>
            </View>
          )
          }}/>
        <Tab.Screen 
        name="Meal Plan" 
        component={MealPlan} 
        options={{
          tabBarIcon: ({focused}) => dockLabels(focused, 'calendar-check', 'Meal Plan'),
          header: () => <DockHeader title={'Meal Plan'} />  
          }}/>
        <Tab.Screen 
        name="Shopping Plan" 
        component={ShoppingPlan} 
        options={{
          tabBarIcon: ({focused}) => dockLabels(focused, 'list-alt', 'Shopping List'),
          header: () => <DockHeader title={'Shopping List'} />  
          }}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = (focused) => StyleSheet.create({
  text: {
    fontSize: 10,
    color: focused? '#E84A4A': '#555',
    paddingTop: 5
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    backgroundColor: 'red',
    height: 50,
    width: 50,
    borderRadius: 25,
    bottom: 25,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default MainStack;