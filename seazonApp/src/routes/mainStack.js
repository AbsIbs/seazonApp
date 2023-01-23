import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet } from "react-native";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { FloatingAction } from "react-native-floating-action";
import { useNavigation } from "@react-navigation/native";


// screens
import ExploreStack from "./exploreStack";
import FoodFeed from "../screens/foodFeed";
import MealPlan from "../screens/mealPlan";
import ShoppingPlan from "../screens/shoppingList";

// components
import DockHeader from "../components/dockHeader";

const Tab = createBottomTabNavigator()

const dockLabels = (focused, iconName) => {
  return (
    <View style={styles().container}>
      <FontAwesome5
        name={iconName}
        color={focused ? '#E84A4A' : '#555'}
        size={20}
      />
    </View>
  )
};

function MainStack() {

  const navigation = useNavigation()

  const Icon = (props) => {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <MaterialCommunityIcons
          name={props.name}
          size={15}
          color={'white'} />
      </View>
    )
  };

  const actions = [{
    text: "Recipe",
    icon: <Icon name='note-plus' />,
    name: 'Recipe Form',
    position: 1,
    color: 'red'
  }]

  return (
    <NavigationContainer
      independent={true}>
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: '#181818',
            bottom: 20,
            position: 'absolute',
            marginHorizontal: 40,
            borderRadius: 30,
            height: 60,
            borderTopWidth: 0
          }
        }}>
        <Tab.Screen
          name="Explore"
          component={ExploreStack}
          headerShown={true}
          options={{
            tabBarIcon: ({ focused }) => dockLabels(focused, 'home', 'Explore'),
            header: () => <DockHeader title={'Explore'} />
          }} />
        <Tab.Screen
          name="Food Feed"
          component={FoodFeed}
          options={{
            tabBarIcon: ({ focused }) => dockLabels(focused, 'search', 'Food Feed'),
            header: () => <DockHeader title={'Food Feed'} />
          }} />
        <Tab.Screen
          name="Meal Plan"
          component={MealPlan}
          options={{
            tabBarIcon: ({ focused }) => dockLabels(focused, 'calendar-check', 'Meal Plan'),
            header: () => <DockHeader title={'Meal Plan'} />
          }} />
        <Tab.Screen
          name="Shopping Plan"
          component={ShoppingPlan}
          options={{
            tabBarIcon: ({ focused }) => dockLabels(focused, 'list-alt', 'Shopping List'),
            header: () => <DockHeader title={'Shopping List'} />
          }} />
      </Tab.Navigator>
      <View>
        <FloatingAction
          actions={actions}
          onPressItem={name => {
            navigation.navigate(name);
          }}
          color='red'
          distanceToEdge={{ vertical: 100, horizontal: 20 }}
        />
      </View>
    </NavigationContainer>
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