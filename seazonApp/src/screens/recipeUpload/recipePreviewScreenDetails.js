import React, { useContext, useState } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { AddRecipeContext } from "../../../Global/AddRecipeContext";

const RecipePreviewScreenDetails = () => {

  const { recipe } = useContext(AddRecipeContext);

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

export default RecipePreviewScreenDetails;