import React, { useContext, useRef, useState } from "react";
import { View, StyleSheet, Text, ImageBackground, Pressable } from "react-native";
import uuid from 'react-native-uuid'
import Swiper from 'react-native-web-swiper'

import { AddRecipeContext } from "../../../Global/AddRecipeContext";

import RecipePreviewScreenDetails from "./recipePreviewScreenDetails";
import RecipePreviewScreenIngredients from './recipePreviewScreenIngredients'
import RecipePreviewScreenSteps from "./recipePreviewScreenSteps";

const RecipePreview = () => {

  const { recipe } = useContext(AddRecipeContext);
  const swiperRef = useRef(null);
  const [swiperIndex, setSwiperIndex] = useState(0);

  const docks = ['Details', 'Ingredients', 'Steps']

  return (
    <View style={styles.outerContainer}>
      <View style={styles.imageContainer}>
        <ImageBackground
          source={recipe.coverImage}
          resizeMode='cover'
          style={{ height: '100%', width: '100%' }}>
        </ImageBackground>
      </View>
      <View style={styles.swiperContainer}>
        <Swiper
          controlsProps={{
            prevPos: false,
            dotsPos: false,
            nextPos: false
          }}
          ref={swiperRef}
          gesturesEnabled={() => false}
          onIndexChanged={index => setSwiperIndex(index)}>
          {/* Details Slide */}
          <RecipePreviewScreenDetails />
          <RecipePreviewScreenIngredients />
          <RecipePreviewScreenSteps />
        </Swiper>
      </View>
      <View style={styles.bottomDockContainer} >
        {docks.map((item, index) => {
          const key = uuid.v4()
          const active = index == swiperIndex? true: false
          return (
            <Pressable hitSlop={10} key={key} onPress={() => {
              swiperRef.current.goTo(index)
            }} >
              <Text style={[styles.dock, { color: active ? '#E32828' : 'white', fontFamily: active? 'Poppins-Bold': 'Poppins-Regular' }]}>{item}</Text>
            </Pressable>
          )
        })}
        {/* {props.alternatives ?
              props.alternatives.map((item) => {
                const key = uuid.v4()
                return (
                  <View key={key} style={styles.ingredientAlternativesContainer}>
                    <Entypo
                      name={'ccw'}
                      size={12}
                      style={{ paddingRight: 5 }} />
                    <Text style={{ fontSize: 12, alignSelf: 'center', padding: 1.5 }}>{item}</Text>
                  </View>
                )
              }) : null
            } */}
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  outerContainer: {
    paddingBottom: 10,
    flex: 1,
    backgroundColor: 'black'
  },
  imageContainer: {
    height: 250,
    width: '100%'
  },
  swiperContainer: {
    flex: 1
  },
  bottomDockContainer: {
    backgroundColor: '#121212',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  dock: {
    fontSize: 13,
    fontFamily: 'Poppins-Medium'
  },
  /* Ingredients */
  ingredientAlternativesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#2B303C',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginTop: 10,
    marginHorizontal: 5
  },
  ingredientOuterContainer: {
    paddingVertical: 10,
    borderBottomColor: '#ffffff20',
    borderBottomWidth: 1
  },
  ingredientInnerContainer: {
    minHeight: 50,
    width: '100%',
    paddingVertical: 10
  },
  ingredientImages: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 5
  },
  ingredientTypeImageContainer: {
    height: 45,
    width: 45,
    borderRadius: 8,
    backgroundColor: '#D9D9D9',
    justifyContent: 'center',
    alignItems: 'center'
  },

});

export default RecipePreview;