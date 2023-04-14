import React, { useContext, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from "react-native";
import { AddRecipeContext } from "../../../Global/AddRecipeContext";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from "@react-navigation/native";
import Modal from "react-native-modal";
import RecipePreviewSteps from './recipePreviewScreenSteps'
import MentionHashtagTextView from "react-native-mention-hashtag-text";

const RecipePreviewScreenDetails = () => {
  const { recipe } = useContext(AddRecipeContext);
  const navigation = useNavigation();

  const [stepsModal, setStepsModal] = useState(false)

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

  const tagsArray = [recipe['difficulty']].concat(recipe.mealType, recipe.dietary)

  return (
    <>
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', paddingTop: 30 }}>
          <View style={{ flex: 1 }}>
            <Text style={styles.recipeTitle}>{/* {recipe.title} */}Spaghetti and rice with some pasta</Text>
            <Text style={styles.author} >by Abass Ibrahim</Text>
          </View>
          <View style={{ justifyContent: 'center' }}>
            {/* Profile image */}
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
            <View style={{ paddingTop: 10, justifyContent: 'center', alignItems: 'center' }}>
              <TouchableOpacity
                style={styles.cookIt}
                onPress={() => setStepsModal(true)}>
                <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 13, color: 'white' }}>Let's cook it!</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <MentionHashtagTextView
          mentionHashtagColor={"#E32828"}
          style={styles.chefsNotes}>
          We know, spaghetti and meatballs is a classic for a reason, but sometimes you want to upgrade your usual weeknight dinner. Whether you're preparing for a fancy date night or a dinner party night amongst friends, we've got all the ways you can liven up your spaghetti game.
          When there are so many classic Italian pasta dishes, it can be hard to choose. #GodHelpMe #AppDevelopment
        </MentionHashtagTextView>
        <View style={{flexWrap: 'wrap', flexDirection: 'row'}} >
          {tagsArray.map((item, index) => {
            return (
              <View style={styles.tagContainer} key={index}>
                <Text style={styles.tag}>{item}</Text>
              </View>
            )
          })}
        </View>
      </View>
      <Modal isVisible={stepsModal} style={{ justifyContent: 'flex-end', margin: 0 }} >
        <RecipePreviewSteps setStepsModal={setStepsModal} steps={recipe.steps} />
      </Modal>
    </>
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
  tagContainer: {
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    borderRadius: 30,
    paddingHorizontal: 20,
    marginRight: 5,
    marginBottom: 7.5,
    backgroundColor: '#2B303C',
  },
  tag: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: 'white'
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
  cookIt: {
    height: 55,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E32828',
    borderRadius: 4
  }
});

export default RecipePreviewScreenDetails;