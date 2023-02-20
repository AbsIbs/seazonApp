import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet } from "react-native";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { useNavigation } from "@react-navigation/native";

// screens
import Explore from "../screens/explore";
import FoodFeed from "../screens/foodFeed";
import MealPlan from "../screens/mealPlan";
import ShoppingPlan from "../screens/shoppingList";

// components
import DockHeader from "../components/dockHeader";

const Tab = createBottomTabNavigator();

const dockLabels = (focused, iconName) => {
  return (
    <View style={styles().container}>
      <FontAwesome5
        name={iconName}
        color={focused ? 'white' : '#555'}
        size={20}
      />
    </View>
  )
};

function MainStack() {

  const navigation = useNavigation();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#191919',
          bottom: 20,
          position: 'absolute',
          marginHorizontal: 20,
          borderRadius: 12,
          height: 60,
          borderTopWidth: 0
        }
      }}>
      <Tab.Screen
        name="Explore"
        component={Explore}
        options={{
          tabBarIcon: ({ focused }) => dockLabels(focused, 'home', 'Explore'),
          header: () => {
            return (
              <DockHeader name='Explore' />
            )
          }
        }} />
      <Tab.Screen
        name="Food Feed"
        component={FoodFeed}
        options={{
          tabBarIcon: ({ focused }) => dockLabels(focused, 'search', 'Food Feed'),
          header: () => {
            return (
              <DockHeader name='Food Feed' />
            )
          }
        }} />
      <Tab.Screen
        name="Meal Plan"
        component={MealPlan}
        options={{
          tabBarIcon: ({ focused }) => dockLabels(focused, 'calendar-check', 'Meal Plan'),
          header: () => {
            return (
              <DockHeader name='Meal Plan' />
            )
          }
        }} />
      <Tab.Screen
        name="Shopping Plan"
        component={ShoppingPlan}
        options={{
          tabBarIcon: ({ focused }) => dockLabels(focused, 'list-alt', 'Shopping List'),
          header: () => {
            return (
              <DockHeader name='Shopping Plan' />
            )
          }
        }} />
    </Tab.Navigator>
  );
}

const styles = (focused) => StyleSheet.create({
  text: {
    fontSize: 10,
    color: focused ? '#E84A4A' : '#555',
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
    bottom: 20,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default MainStack;