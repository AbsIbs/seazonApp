import React, { useContext } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { AddRecipeContext } from "../../../Global/AddRecipeContext";
import RenderingIngredientArray from "../../components/recipeUpload/renderIngredientArray WIP";

const RecipePreviewScreenIngredients = () => {

  const { recipe } = useContext(AddRecipeContext);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{ flexDirection: 'row', paddingTop: 30 }}>
          <RenderingIngredientArray array={recipe.ingredients} servings={recipe.servings} />
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
  macrosContainer: {
    height: 100,
    width: 70,
    borderRadius: 8,
    backgroundColor: '#2B303C',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  macrosValue: {
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    color: 'white'
  },
  macrosTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: 'white'
  },
  macrosDesc: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#d3d3d3'
  }
});

export default RecipePreviewScreenIngredients;