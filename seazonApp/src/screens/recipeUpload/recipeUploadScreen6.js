import React, { useContext } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { AddRecipeContext } from "../../../Global/AddRecipeContext";

import RecipeMacros from "../../components/recipeMacros";

const RecipeUploadScreen6 = () => {

  const {recipe, setRecipe} = useContext(AddRecipeContext)

  return (
    <ScrollView>
      <View style={styles.section}>
        <Text style={styles.nutrientsTitle}>Calories <Text style={styles.nutrientsOptional}>(Optional)</Text> </Text>
        <RecipeMacros title='Calories' desc='(kcal)' setFunction={setRecipe} />
      </View>
      <View style={styles.section}>
        <Text style={styles.nutrientsTitle}>Macro Nutrients <Text style={styles.nutrientsOptional}>(Optional)</Text> </Text>
        <RecipeMacros title='Carbs' desc='(g)' setFunction={setRecipe} />
        <RecipeMacros title='Fat' desc='(g)' setFunction={setRecipe} />
        <RecipeMacros title='Protein' desc='(g)' setFunction={setRecipe} />
      </View>
    </ScrollView>
  )
};

const styles = StyleSheet.create({
  section: {
    paddingVertical: 10,
    paddingHorizontal: '5%'
  },
  nutrientsTitle: {
    fontSize: 14,
    color: '#ffffff',
    paddingTop: 10,
    paddingBottom: 10,
    fontFamily: 'Poppins-Medium'
  },
  nutrientsOptional: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#ffffff'
  }
});

export default RecipeUploadScreen6;