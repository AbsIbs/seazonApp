import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

import RecipeMealType from "../../components/recipeMealType";
import RecipeDietary from "../../components/recipeDietary";
import RecipeDifficulty from "../../components/recipeDifficulty";

import { AddRecipeContext } from "../../../Global/AddRecipeContext";

const RecipeUploadScreen2 = () => {

  const [tagCount, setTagCount] = useState(0);
  const { recipe, setRecipe } = useContext(AddRecipeContext);

  return (
    <ScrollView>
      <View style={styles().section}>
        <View style={styles().outerCategoryContainer}>
          <View style={styles().innerCategoryContainer}>
            <Text style={styles().sectionSubheader}>Difficulty</Text>
            <RecipeDifficulty setRecipeObject={setRecipe} />
          </View>
        </View>
        <View style={styles().outerCategoryContainer}>
          <View style={styles().innerCategoryContainer}>
            <Text style={styles().sectionSubheader}>Meal Type</Text>
            <RecipeMealType setRecipeObject={setRecipe} />
          </View>
        </View>
        <View style={styles().outerCategoryContainer}>
          <View style={styles().innerCategoryContainer}>
            <Text style={styles().sectionSubheader}>Dietary</Text>
            <RecipeDietary setRecipeObject={setRecipe} />
          </View>
        </View>
      </View>
    </ScrollView>
  )
};

const styles = () => StyleSheet.create({
  section: {
    paddingVertical: 10
  },
  sectionTitle: {
    fontSize: 16,
    color: '#ffffff',
    paddingTop: 10,
    fontWeight: 'bold',
    paddingLeft: 20,
    paddingBottom: 10
  },
  sectionSubheader: {
    fontSize: 14,
    fontWeight: 'bold',
    paddingBottom: 10,
    color: '#ffffff'
  },
  outerCategoryContainer: {
    alignItems: 'center'
  },
  innerCategoryContainer: {
    width: '90%',
    borderTopColor: '#ffffff20',
    borderTopWidth: 1,
    paddingTop: 10,
    paddingBottom: 15
  }
});

export default RecipeUploadScreen2;