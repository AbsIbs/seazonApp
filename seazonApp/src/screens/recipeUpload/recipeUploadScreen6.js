import React, { useContext } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { AddRecipeContext } from "../../../Global/AddRecipeContext";

import RecipeMacros from "../../components/recipeUpload/recipeMacros";

const RecipeUploadScreen6 = () => {

  const { setRecipe } = useContext(AddRecipeContext)

  const macrosArray = [
    { title: 'calories', desc: '(kcal)' },
    { title: 'protein', desc: '(g)' },
    { title: 'carbs', desc: '(g)' },
    { title: 'fats', desc: '(g)' },
  ]

  return (
    <ScrollView>
      <View style={styles.section}>
        {macrosArray.map((item, index) => {
          return (
            <View style={{ paddingVertical: 10 }} key={index}>
              <RecipeMacros title={item.title} desc={item.desc} setFunction={setRecipe} />
            </View>
          )
        })}
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