import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

import RecipeMealType from "../../components/recipeUpload/recipeMealType";
import RecipeDietary from "../../components/recipeUpload/recipeDietary";
import RecipeDifficulty from "../../components/recipeUpload/recipeDifficulty";

const RecipeUploadScreen3 = () => {

  return (
    <ScrollView>
      <View style={styles().section}>
        <View style={styles().outerCategoryContainer}>
          <View style={styles().innerCategoryContainer}>
            <Text style={styles().sectionSubheader}>Difficulty</Text>
            <RecipeDifficulty />
          </View>
        </View>
        <View style={styles().outerCategoryContainer}>
          <View style={styles().innerCategoryContainer}>
            <Text style={styles().sectionSubheader}>Meal Type</Text>
            <RecipeMealType />
          </View>
        </View>
        <View style={styles().outerCategoryContainer}>
          <View style={styles().innerCategoryContainer}>
            <Text style={styles().sectionSubheader}>Dietary</Text>
            <RecipeDietary />
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
  sectionSubheader: {
    fontSize: 14,
    paddingBottom: 10,
    color: '#ffffff',
    fontFamily: 'Poppins-Medium'
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

export default RecipeUploadScreen3;