import React, { useContext, useRef, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { TabbedHeaderPager } from 'react-native-sticky-parallax-header';

import { AddRecipeContext } from "../../../Global/AddRecipeContext";

import RecipePreviewScreenDetails from "./recipePreviewScreenDetails";
import RecipePreviewScreenIngredients from './recipePreviewScreenIngredients'
import RecipePreviewScreenSteps from "./recipePreviewScreenSteps";

const RecipePreview = () => {

  const { recipe } = useContext(AddRecipeContext);
  const pagerRef = useRef(null);

  const docks = [
    {
      title: 'Details'
    },
    {
      title: 'Ingredients'
    },
    {
      title: 'Steps'
    }
  ]

  return (
    <>
      <View style={{ flex: 1 }}>
        <TabbedHeaderPager
          ref={pagerRef}
          backgroundColor={'black'}
          initialPage={0}
          backgroundImage={recipe.coverImage}
          rememberTabScrollPosition
          headerHeight={200}
          showsVerticalScrollIndicator={false}
          tabs={docks.map((section) => ({
            title: section.title
          }))}
          tabsContainerHorizontalPadding={0}
          tabWrapperStyle={{ borderBottomColor: '#2B303C', borderBottomWidth: 1 }}
          tabTextStyle={{ fontFamily: 'Poppins-Light', fontSize: 12, paddingVertical: 5 }}
          tabTextActiveStyle={{ fontFamily: 'Poppins-Regular', fontSize: 12, paddingVertical: 5 }}
          tabTextContainerActiveStyle={{backgroundColor: '#000000'}}
          tabUnderlineColor={'#E32828'}
          pageContainerStyle={{ flex: 1 }}
          parallaxHeight>
          <RecipePreviewScreenDetails />
          <RecipePreviewScreenIngredients />
          <RecipePreviewScreenSteps />
        </TabbedHeaderPager>
      </View>
    </>

  )
};

const styles = StyleSheet.create({
  outerContainer: {
    paddingBottom: 10,
    flex: 1,
    backgroundColor: 'black'
  },
  swiperContainer: {
    flex: 1
  },
  /* Ingredients */
  ingredientAlternativesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#2B303C',
    borderWidth: 1,
    justifyContent: 'center',
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