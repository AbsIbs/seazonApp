import React, { useState, useContext } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import uuid from 'react-native-uuid'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import { useNavigation } from "@react-navigation/native";

import { AddRecipeContext } from "../../../Global/AddRecipeContext";

const RecipeUploadScreen3 = () => {

  const navigation = useNavigation();
  const { recipe, setRecipe } = useContext(AddRecipeContext);

  const recipeImages = {
    'Cereals and Pulses': require('../../../assets/img/recipeType/cerealsAndPulses.png'),
    'Dairy': require('../../../assets/img/recipeType/dairy.png'),
    'Fruits': require('../../../assets/img/recipeType/fruits.png'),
    'Meat': require('../../../assets/img/recipeType/meat.png'),
    'Spices and Herbs': require('../../../assets/img/recipeType/spicesAndHerbs.png'),
    'Vegetables': require('../../../assets/img/recipeType/vegetables.png'),
    'Seafood': require('../../../assets/img/recipeType/seafood.png')
  };

  const Ingredient = (props) => {
    return (
      <View style={{ paddingVertical: 10 }}>
        <View style={styles.ingredientContainer}>
          <View style={styles.ingredientImages}>
            <View style={styles.ingredientTypeImageContainer}>
              <Image
                source={recipeImages[props.type]}
                style={{ height: 30, width: 30 }} />
            </View>
          </View>
          <View style={{ paddingHorizontal: 10 }}>
            <Text style={{ fontWeight: 'bold' }}>{props.name}</Text>
            {props.alternatives ?
              props.alternatives.map((item) => {
                const key = uuid.v4()
                return (
                  <View key={key} style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Entypo
                      name={'ccw'}
                      size={12}
                    />
                    <Text style={{ fontSize: 12, alignSelf: 'center', padding: 1.5 }}>{item}</Text>
                  </View>
                )
              }) : null
            }
          </View>
          <View style={{ flex: 4, paddingHorizontal: 10, alignItems: 'flex-end' }}>
            <Text style={{ fontStyle: 'italic' }}>{props.amount} {props.unit}</Text>
          </View>
        </View>
      </View>
    )
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.desc}>Let's add some ingredients to your recipe!</Text>
        <ScrollView>
          {
            recipe.ingredients.map((item) => {
              return (
                <Ingredient
                  name={item.name}
                  key={item.uuid}
                  amount={item.amount}
                  unit={item.unit}
                  image={item.image}
                  type={item.type}
                  alternatives={item.alternatives} />
              )
            })
          }
        </ScrollView>
        <TouchableOpacity style={styles.addIngredientButton} onPress={() => {
          navigation.navigate('Add Ingredient')
        }}>
          <MaterialCommunityIcons
            name={'plus'}
            size={20}
            color={'white'} />
          <Text style={{ color: 'white', fontSize: 12 }}>Add an ingredient</Text>
        </TouchableOpacity>
      </View>
    </>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: '5%',
    paddingVertical: 20
  },
  desc: {
    fontSize: 12,
    color: '#ffffff80',
    paddingBottom: 10
  },
  addIngredientButton: {
    height: 45,
    width: '100%',
    borderWidth: 1,
    borderColor: '#E84A4A',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  modalContainer: {
    backgroundColor: 'black',
    alignItems: 'center'
  },
  header: {
    height: 60,
    width: '100%',
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: '5%'
  },
  headerTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14
  },
  modalContentContainer: {
    flex: 1,
    width: '90%'
  },
  modalTextInput: {
    backgroundColor: '#121212',
    borderColor: '#2B303C',
    height: 50,
    borderRadius: 6,
    marginVertical: 10,
    borderWidth: 1.5,
    paddingHorizontal: 10
  },
  modalTitle: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold'
  },
  ingredientContainer: {
    minHeight: 50,
    width: '100%',
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#2B303C',
    padding: 10
  },
  ingredientImages: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5
  },
  ingredientTypeImageContainer: {
    height: 45,
    width: 45,
    borderRadius: 8,
    backgroundColor: '#D9D9D9',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalPickerContainer: {
    width: '100%',
    backgroundColor: '#121212',
    /*        alignItems: 'center', */
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalPickerSection: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  modalPickerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingLeft: 20,
    color: '#ffffff'
  },
  modalPickerDesc: {
    fontSize: 12,
    color: '#ffffff50',
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  modalPickerCloseButton: {
    backgroundColor: 'white',
    borderRadius: 5,
    height: 5,
    width: 50,
    marginVertical: 10
  },
  pickersContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  modalPickerLabelContainer: {
    width: 75,
    justifyContent: 'center',
  },
  modalPickerLabel: {
    fontWeight: 'bold',
    fontSize: 16,
    borderColor: '#ffffff10',
    backgroundColor: '#8080801A',
    borderTopWidth: 1.1,
    borderBottomWidth: 1.1,
    paddingVertical: 4,
  },
  modalPickerSaveButton: {
    width: '50%',
    height: 35,
    borderRadius: 20,
    backgroundColor: '#E32828',
    justifyContent: 'center'
  }
});

export default RecipeUploadScreen3;