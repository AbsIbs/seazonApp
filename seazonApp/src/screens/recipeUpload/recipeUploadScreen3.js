import React, { useContext } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import uuid from 'react-native-uuid'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import { useNavigation } from "@react-navigation/native";
import { AddRecipeContext } from "../../../Global/AddRecipeContext";
import Collapsible from 'react-native-collapsible';

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

  const deleteIngredient = (indexToRemove) => {
    setRecipe(prevState => {
      return ({ ...prevState, ingredients: [...prevState.ingredients.filter((_, index) => index !== indexToRemove)] })
    })
  };

  const Ingredient = (props) => {
    return (
      <TouchableOpacity style={styles.ingredientOuterContainer} onPress={() => {
        navigation.navigate('Edit Ingredient', {
          index: props.index
        })
      }}>
        <View style={styles.ingredientInnerContainer}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {/* Image */}
            <View style={[styles.ingredientImages, { flex: 2 }]}>
              <View style={styles.ingredientTypeImageContainer}>
                <Image
                  source={recipeImages[props.type]}
                  style={{ height: 30, width: 30 }} />
              </View>
            </View>
            {/* Ingredient Name */}
            <View style={[{ flex: 5 }]}>
              <Text style={{ fontFamily: 'Poppins-Regular', paddingTop: 1.5, paddingBottom: 0 }}>{props.name}</Text>
            </View>
            {/* Unit */}
            <View style={{ alignItems: 'center', paddingHorizontal: 10, justifyContent: 'center' }}>
              <Text style={{ fontFamily: 'Poppins-Light', paddingTop: 1.5, paddingBottom: 0 }} >{props.amount} {props.measurement}</Text>
            </View>
            {/* Delete */}
            <TouchableOpacity onPress={() => deleteIngredient(props.index)} style={{ flex: 1 }}>
              <MaterialCommunityIcons
                name='delete'
                size={25}
                color={'white'} />
            </TouchableOpacity>
          </View>
          {/* Alternatives */}
          <View style={{ flexDirection: 'row', flex: 1, flexWrap: 'wrap' }}>
            {props.alternatives ?
              props.alternatives.map((item) => {
                const key = uuid.v4()
                return (
                  <View key={key} style={styles.ingredientAlternativesContainer}>
                    <Entypo
                      name={'ccw'}
                      size={12}
                      style={{ paddingRight: 5 }} />
                    <Text style={{ fontSize: 12, alignSelf: 'center', padding: 1.5 }}>{item.name}</Text>
                  </View>
                )
              }) : null
            }
          </View>
        </View>
      </TouchableOpacity>
    )
  };

  return (
    <>
      <View style={styles.container}>
        {recipe.ingredients.length > 0 ?
          <ScrollView>
            {recipe.ingredients.map((item, index) => {
              return (
                <Ingredient
                  name={item.name}
                  key={item.uuid}
                  amount={item.amount}
                  measurement={item.measurement}
                  image={item.image}
                  type={item.type}
                  alternatives={item.alternatives}
                  index={index} />
              )
            })}
          </ScrollView> :
          <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
            <MaterialCommunityIcons
              name={'food'}
              color={'white'}
              size={50}
            />
            <Text style={{ paddingVertical: 10, fontFamily: 'Poppins-Regular' }}>Let's add some ingredients to your recipe</Text>
          </View>
        }
        <TouchableOpacity style={styles.addIngredientButton} onPress={() => {
          navigation.navigate('Add Ingredient')
        }}>
          <MaterialCommunityIcons
            name={'plus'}
            size={20}
            color={'white'} />
          <Text style={{ color: 'white', fontSize: 12, fontFamily: 'Poppins-Regular', paddingTop: 5 }}>Add an ingredient</Text>
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
    paddingBottom: 10
  },
  addIngredientButton: {
    height: 45,
    width: '100%',
    borderWidth: 1,
    borderColor: '#E84A4A',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  ingredientAlternativesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#2B303C',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginTop: 10,
    marginHorizontal: 5
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
  ingredientOuterContainer: {
    paddingVertical: 10,
    borderBottomColor: '#ffffff20',
    borderBottomWidth: 1
  },
  ingredientInnerContainer: {
    minHeight: 50,
    width: '100%',
    paddingVertical: 10
  },
  ingredientImages: {
    flex: 1,
    justifyContent: 'center',
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
  pickersContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  }
});

export default RecipeUploadScreen3;