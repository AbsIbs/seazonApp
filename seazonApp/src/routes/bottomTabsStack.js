import React, {useState} from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet, Pressable, Text } from "react-native";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Modal from 'react-native-modal'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'


// screens
import ExploreStack from "./exploreStack";
import FoodFeed from "../screens/foodFeed";
import MealPlan from "../screens/mealPlan";
import ShoppingPlan from "../screens/shoppingList";

// components
import DockHeader from "../components/dockHeader";

const Tab = createBottomTabNavigator()

const BlankSpace = () => {
  return null
}

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

function BottomTabsStack({navigation}) {

  const [modalActive, setModal] = useState(false)

  const toggleModal = () => {
    setModal(!modalActive)
  }

  const onPressHandler = () => {
    setModal(false), navigation.navigate('Modal Stack')
  }

  const modalOption = (title, imageName) => {
    return(
      <Pressable 
        style={styles().modalOptionContainer}
        onPress={onPressHandler}>
          <Text style={styles().modalOptionText}>{title}</Text>
          <View style={styles().modalOptionImageContainer}>
              <MaterialCommunityIcons 
              name={imageName}
              color={'white'}
              size={25}
              />
          </View>
      </Pressable>
    )
  };

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
          component={ExploreStack}
          headerShown = {true} 
          options={{
            tabBarIcon: ({focused}) => dockLabels(focused, 'home', 'Explore'),
            header: () => <DockHeader title={'Explore'} />
          }}/>
        <Tab.Screen 
        name="Food Feed" 
        component={FoodFeed}
        options={{
          tabBarIcon: ({focused}) => dockLabels(focused, 'search', 'Food Feed'),
          header: () => <DockHeader title={'Food Feed'} /> 
          }}/>
        <Tab.Screen 
        name="Recipe" 
        component={BlankSpace} 
        options={{
          tabBarButton: () => (
            <View>
              <Pressable style={styles().button} onPress= {toggleModal}>
                <FontAwesome5 
                name={'plus'}
                size={20}
                color='#ffffff'
                />
              </Pressable>
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
      {/* Modal */}
      <Modal
       isVisible={modalActive}
       onBackButtonPress={() => setModal(false)}
       backdropTransitionOutTiming={0}
       onBackdropPress={() => setModal(false)}
       onSwipeComplete={() => setModal(false)}
       swipeDirection='down'
       style={{justifyContent: 'flex-end'}}>
        <View style={styles().modal}>
          <View style={styles().modalContent}>
            <View style={styles().modalSection}>
              <Pressable style={styles().modalCloseButton}></Pressable>
            </View>
            <View style={styles().modalSection}>
              {modalOption('Upload a recipe', 'note-plus', setModal)}
            </View>
            <View style={styles().modalSection}>
              {modalOption('Upload a recipe request', 'message-question', 'Modal Stack')}
            </View>
          </View> 
        </View>
      </Modal>
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
    bottom: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modal: {
    backgroundColor: '#121212',
    height: 180,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    alignItems: 'center',
  },
  modalContent: {
    padding: 20,
    alignItems: 'center'
  },
  modalSection: {
    paddingBottom: 20
  },
  modalCloseButton: {
    backgroundColor: 'white',
    borderRadius: 5,
    height: 5,
    width: 50
  },
  modalOptionContainer: {
    height: 45,
    width: 265,
    borderRadius: 50,
    backgroundColor: '#181818',
    flexDirection: 'row',
    alignItems: 'center'
  },
modalOptionText: {
    fontSize: 12,
    color: '#ffffff',
    flex: 7,
    paddingLeft: 20
  },
modalOptionImageContainer: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default BottomTabsStack;