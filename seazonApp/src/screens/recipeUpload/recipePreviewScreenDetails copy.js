import React, { useContext, useState } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { AddRecipeContext } from "../../../Global/AddRecipeContext";

const RecipePreviewScreenDetails = () => {

  const { recipe } = useContext(AddRecipeContext);

  return (
    <View style={styles.container}>
      {/* <ScrollView style={{ paddingHorizontal: '5%' }} > */}
      <View style={{ flexDirection: 'row', paddingTop: 30 }}>
        <View style={{ flex: 1 }}>
          <Text style={styles.recipeTitle}>{/* {recipe.title} */}Spaghetti and rice with some pasta</Text>
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
          <Text style={styles.timingsValue}>{/* {recipe.prepTime} */}{12}mins</Text>
        </View>
        <View>
          <Text style={styles.timingsHeader}>Cooking Time</Text>
          <Text style={styles.timingsValue}>{/* {recipe.cookingTime} */}{20}mins</Text>
        </View>
        <View>
          <Text style={styles.timingsHeader}>Servings</Text>
          <Text style={styles.timingsValue}>{/* {recipe.servings} */}{1}person(s)</Text>
        </View>
      </View>
      <Text style={styles.chefsNotes}>{recipe.chefsNotes}
        We know, spaghetti and meatballs is a classic for a reason, but sometimes you want to upgrade your usual weeknight dinner. Whether you're preparing for a fancy date night or a dinner party night amongst friends, we've got all the ways you can liven up your spaghetti game.

        When there are so many classic Italian pasta dishes, it can be hard to choose. Especially when that means you could have pasta puttanesca, carbonara, and or spaghetti Bolognese. Whatever you choose, don't skimp on the Parmesan cheese.

        Maybe you're craving the more cheesy side of the pasta spectrum, and we 100% support that. In that case, it doesn't get any better than our lemon ricotta pasta, creamy three-cheese spaghetti, brie spaghetti, and of course, cacio e pepe. Our best pro-tip no matter how you dress your spaghetti: Save that pasta water! The starchiness of the pasta water, when tossed with your spaghetti, allows for the sauce to slick every noodle.

        And hey, we won't knock you if you want to just curl up with a bowl of spaghetti and meatballs. We've got plenty of recipes for the best homemade spaghetti sauce, best jarred pasta sauces you can find at the store, and even how to properly cook pasta and make homemade pasta dough. And please don't forget the meatballs.

        Looking for more pasta recipes? Try these baked pasta recipes, our favorite summer pasta dishes, and all the best pasta salad recipes.
      </Text>
      {/*  </ScrollView> */}
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