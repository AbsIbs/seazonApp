import React, { useState, useRef, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import Swiper from 'react-native-web-swiper'
import { Bar } from 'react-native-progress'

import { AddRecipeContext } from '../../Global/AddRecipeContext'

// slides
import RecipeUploadScreen1 from "./recipeUpload/recipeUploadScreen1";
import RecipeUploadScreen2 from "./recipeUpload/recipeUploadScreen2";
import RecipeUploadScreen3 from "./recipeUpload/recipeUploadScreen3";
import RecipeUploadScreen4 from "./recipeUpload/recipeUploadScreen4";
import RecipeUploadScreen5 from "./recipeUpload/recipeUploadScreen5";

const RecipeForm = () => {

  const windowWidth = Dimensions.get('window').width;
  const { recipe, setRecipe } = useContext(AddRecipeContext);

  const [progress, setProgress] = useState(1 / 5);
  const [index, setIndex] = useState(0);

  const swiperRef = useRef(null);

  const nextPageChange = () => {
    if (progress <= 1) {
      swiperRef.current.goToNext()
      setProgress(progress + 1 / 5)
    }
    console.log(recipe)
  };

  const prevPageChange = () => {
    if (index != 0) {
      swiperRef.current.goToPrev()
      setProgress(progress - 1 / 5)
    }
  };

  return (
    <View style={styles().container}>
      <View style={{ alignItems: 'center' }}>
        <Bar
          progress={progress}
          width={windowWidth}
          height={2.5}
          color={'red'}
          unfilledColor={'grey'}
          borderWidth={0}
          useNavitveDriver />
      </View>
      <View style={styles().swiperContainer}>
        <Swiper
          controlsProps={{
            prevPos: false,
            dotsPos: false,
            nextPos: false
          }}
          ref={swiperRef}
          gesturesEnabled={() => false}
          onIndexChanged={index => setIndex(index)}>
          {/* slide 1 */}
          <RecipeUploadScreen1 />
          {/* slide 2 */}
          <RecipeUploadScreen2 />
          {/* slide 3 */}
          <RecipeUploadScreen3 />
          {/* slide 4 */}
          <RecipeUploadScreen4 />
          {/* slide 5 */}
          <RecipeUploadScreen5 />
        </Swiper>
      </View>
      <View style={styles().buttonSection}>
        <View style={styles().buttonContainer}>
          <TouchableOpacity
            style={styles('prev').button}
            onPress={() => prevPageChange()}>
            <Text>Back</Text>
          </TouchableOpacity>
        </View>
        <View style={styles().buttonContainer}>
          <TouchableOpacity
            style={styles('next').button}
            onPress={() => nextPageChange()}>
            <Text style={{ color: '#ffffff' }}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
};

const styles = (button) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  },
  stepContainer: {
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomColor: '#ffffff30',
    borderBottomWidth: 1
  },
  text: {
    color: 'white'
  },
  swiperContainer: {
    flex: 1,
    borderBottomColor: '#ffffff30',
    borderBottomWidth: 1
  },
  section: {
    paddingTop: 10,
    paddingBottom: 10
  },
  outerInputSection: {
    alignItems: 'center'
  },
  buttonSection: {
    height: 55,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    padding: 10
  },
  button: {
    height: '100%',
    width: '90%',
    backgroundColor: button == 'next' ? '#E32828' : '#00000000',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2,
    borderColor: button == 'next' ? '' : '#757882',
    borderWidth: button == 'next' ? 0 : 0.5
  },
  nutrientsTitle: {
    fontSize: 16,
    color: '#ffffff',
    paddingTop: 10,
    fontWeight: 'bold',
    paddingLeft: 20,
    paddingBottom: 10
  },
  nutrientsOptional: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#ffffff'
  }
});

export default RecipeForm;

