import React, { useContext } from "react";
import { View, StyleSheet, Text } from "react-native";
import { AddRecipeContext } from "../../../Global/AddRecipeContext";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'


const RecipePreviewScreenDetails = () => {
  const { recipe } = useContext(AddRecipeContext);

  const Info = (props) => {
    return (
      <View style={styles.infoContainer} >
        <View style={styles.infoImageContainer} >
          <MaterialCommunityIcons
            name={props.image}
            size={25}
            color={'white'} />
        </View>
        <View style={{ paddingVertical: 2.5, paddingLeft: 10 }} >
          <Text style={styles.infoTitle} >{props.title}{props.time ? 'mins' : ''} {props.serving ? (recipe.servings > 1 ? 'people' : 'person') : ''}</Text>
          <Text style={styles.infoDesc} >{props.desc}</Text>
        </View>
      </View>
    )
  };

  return (
    <View style={styles.container}>
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
      <View>
        <View style={styles.timingsOuterContainer}>
          <View style={{ flexDirection: 'row' }}>
            <Info title={recipe.prepTime} desc={'Prep time'} time image='timer-sand' />
            <Info title={recipe.cookingTime} desc={'Cooking time'} time image='timer' />
          </View>
          <View style={{ flexDirection: 'row', paddingTop: 15 }} >
            <Info title={recipe.servings} desc={'Servings'} serving image='account-multiple' />
            <Info title={recipe.difficulty} desc={'Difficulty'} image='star' />
          </View>
        </View>
      </View>
      {/*       <View style={styles.timingsOuterContainer}>
        <View>
          <Text style={styles.timingsHeader}>Prep Time</Text>
          <Text style={styles.timingsValue}>{12}mins</Text>
        </View>
        <View>
          <Text style={styles.timingsHeader}>Cooking Time</Text>
          <Text style={styles.timingsValue}>{20}mins</Text>
        </View>
        <View>
          <Text style={styles.timingsHeader}>Servings</Text>
          <Text style={styles.timingsValue}>{1}person(s)</Text>
        </View>
      </View> */}
      <Text style={styles.chefsNotes}>{recipe.chefsNotes}
        We know, spaghetti and meatballs is a classic for a reason, but sometimes you want to upgrade your usual weeknight dinner. Whether you're preparing for a fancy date night or a dinner party night amongst friends, we've got all the ways you can liven up your spaghetti game.

        When there are so many classic Italian pasta dishes, it can be hard to choose. Especially when that means you could have pasta puttanesca, carbonara, and or spaghetti Bolognese. Whatever you choose, don't skimp on the Parmesan cheese.

        Maybe you're craving the more cheesy side of the pasta spectrum, and we 100% support that. In that case, it doesn't get any better than our lemon ricotta pasta, creamy three-cheese spaghetti, brie spaghetti, and of course, cacio e pepe. Our best pro-tip no matter how you dress your spaghetti: Save that pasta water! The starchiness of the pasta water, when tossed with your spaghetti, allows for the sauce to slick every noodle.

        And hey, we won't knock you if you want to just curl up with a bowl of spaghetti and meatballs. We've got plenty of recipes for the best homemade spaghetti sauce, best jarred pasta sauces you can find at the store, and even how to properly cook pasta and make homemade pasta dough. And please don't forget the meatballs.

        Looking for more pasta recipes? Try these baked pasta recipes, our favorite summer pasta dishes, and all the best pasta salad recipes.
      </Text>
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
    lineHeight: 25,
    fontFamily: 'Poppins-Regular'
  },
  timingsOuterContainer: {
    width: '100%',
    justifyContent: 'space-between',
    paddingVertical: 20,
    marginVertical: 20,
    borderColor: '#2B303C',
    borderTopWidth: 1,
    borderBottomWidth: 1
  },
  /* Info Styles */
  infoContainer: {
    height: 50,
    flexDirection: 'row',
    flex: 1
  },
  infoImageContainer: {
    height: 45,
    width: 45,
    borderRadius: 8,
    backgroundColor: '#2B303C',
    justifyContent: 'center',
    alignItems: 'center'
  },
  infoTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: 'white'
  },
  infoDesc: {
    fontFamily: 'Poppins-Light',
    fontSize: 12
  },

  /*   timingsHeader: {
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
    }, */
});

export default RecipePreviewScreenDetails;