import React, { useContext, useState } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { AddRecipeContext } from "../../../Global/AddRecipeContext";

const RecipePreviewScreenIngredients = () => {

  const { recipe } = useContext(AddRecipeContext);

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
      <View style={styles.ingredientOuterContainer}>
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
              <Text style={{ fontFamily: 'Poppins-ExtraLight' }}>{props.name}</Text>
            </View>
            {/* Unit */}
            <View style={{ alignItems: 'center', paddingHorizontal: 10, justifyContent: 'center' }}>
              <Text>{props.amount} {props.measurement}</Text>
            </View>
            {/* Delete */}
            <View onPress={() => deleteIngredient(props.index)} style={{ flex: 1 }}>
              <MaterialCommunityIcons
                name='delete'
                size={25}
                color={'white'} />
            </View>
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
                    <Text style={{ fontSize: 12, alignSelf: 'center', padding: 1.5 }}>{item}</Text>
                  </View>
                )
              }) : null
            }
          </View>
        </View>
      </View>
    )
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{ flexDirection: 'row', paddingTop: 30 }}>
          <View style={{ flex: 1 }}>
            <Text style={styles.recipeTitle}>{recipe.title}</Text>
            <Text style={styles.author} >by Abass Ibrahim</Text>
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'flex-end' }}>
            <View style={{ backgroundColor: '#2B303C', height: 50, width: 50, borderRadius: 25 }}>

            </View>
          </View>
        </View>
        <View style={styles.timingsOuterContainer}>
          <View>
            <Text style={styles.timingsHeader}>Prep Time</Text>
            <Text style={styles.timingsValue}>{recipe.prepTime}mins</Text>
          </View>
          <View>
            <Text style={styles.timingsHeader}>Cooking Time</Text>
            <Text style={styles.timingsValue}>{recipe.cookingTime}mins</Text>
          </View>
          <View>
            <Text style={styles.timingsHeader}>Servings</Text>
            <Text style={styles.timingsValue}>{recipe.servings} person(s)</Text>
          </View>
        </View>
        <Text style={styles.chefsNotes}>{recipe.chefsNotes}</Text>
      </ScrollView>

      {/* {recipe.ingredients.map((item, index) => {
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
      })
      }
      <ScrollView horizontal style={{ paddingVertical: 5 }}>
        <View style={styles.recipeInfoContainer}>
          <Text style={{ fontSize: 12 }}>{recipe.difficulty}</Text>
        </View>
        <View style={styles.recipeInfoContainer}>
          <Text style={{ fontSize: 12 }}>{recipe.mealType}</Text>
        </View>
        {recipe.dietary.map((item) => {
          const key = uuid.v4()
          return (
            <View key={key} style={styles.recipeInfoContainer}>
              <Text style={{ fontSize: 12 }}>{item}</Text>
            </View>
          )
        })
        }
      </ScrollView> */}

    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: '5%'
  },
  recipeTitle: {
    fontSize: 24,
    color: 'white',
    fontFamily: 'Poppins-Medium'
  },
  author: {
    fontFamily: 'Poppins-Light',
    fontSize: 13
  },
  chefsNotes: {
    fontSize: 14,
    paddingBottom: 20,
    lineHeight: 20,
    fontFamily: 'Poppins-Regular'
  },
  timingsOuterContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingVertical: 20,
    marginVertical: 20,
    borderColor: '#2B303C',
    borderTopWidth: 1,
    borderBottomWidth: 1
  },
  timingsHeader: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular'
  },
  timingsValue: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Poppins-Medium'
  },
  recipeInfoContainer: {
    borderColor: '#2B303C',
    borderWidth: 0.5,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginHorizontal: 5
  },
});

export default RecipePreviewScreenIngredients;