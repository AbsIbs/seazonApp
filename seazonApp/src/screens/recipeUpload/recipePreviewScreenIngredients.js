import React, { useContext } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { AddRecipeContext } from "../../../Global/AddRecipeContext";
import RenderingIngredientArray from "../../components/renderIngredientArray";

const RecipePreviewScreenIngredients = () => {

  const { recipe } = useContext(AddRecipeContext);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{ flexDirection: 'row', paddingTop: 30 }}>
          <RenderingIngredientArray array={recipe.ingredients} />
        </View>
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

export default RecipePreviewScreenIngredients;