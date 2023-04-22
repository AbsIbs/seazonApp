import React, { useState, useRef, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import Swiper from 'react-native-web-swiper'
import { Bar } from 'react-native-progress'
import { useNavigation } from "@react-navigation/native";

import { AddRecipeContext } from '../../../Global/AddRecipeContext'

// slides
import RecipeUploadScreen1 from "./recipeUploadScreen1";
import RecipeUploadScreen2 from "./recipeUploadScreen2";
import RecipeUploadScreen3 from "./recipeUploadScreen3";
import RecipeUploadScreen4 from "./recipeUploadScreen4";
import RecipeUploadScreen5 from "./recipeUploadScreen5";
import RecipeUploadScreen6 from "./recipeUploadScreen6";

/* Components */
import ErrorModal from "../../components/global/errorModal";

const RecipeForm = () => {

  const navigation = useNavigation();
  const windowWidth = Dimensions.get('window').width;
  const { recipe, errorRecipe, setErrorRecipe } = useContext(AddRecipeContext);
  const [errorModal, setErrorModal] = useState(false)

  const [progress, setProgress] = useState(1 / 6);
  const [index, setIndex] = useState(0);

  const swiperRef = useRef(null);

  const nextPageChange = () => {
    if (index != 5) {
      swiperRef.current.goToNext()
      setProgress(progress + 1 / 6)
      /* navigation.navigate('Preview Recipe') */
    }
    if (index == 5) {
      const tempErrorRecipe = {
        title: false,
        chefsNotes: false,
        prepTime: false,
        cookingTime: false,
        servings: false,
        coverImage: false,
        difficulty: false,
        mealType: false,
        ingredients: false,
        steps: false,
      }

      for (const [key, value] of Object.entries(tempErrorRecipe)) {
        if (!recipe[key] || ((Array.isArray(recipe[key]) && recipe[key].length === 0))) {
          tempErrorRecipe[key] = true
        }
      }

      const someTruthy = Object.values(tempErrorRecipe).some(val => val === true)
      setErrorRecipe(tempErrorRecipe)

      if (someTruthy) {
        setErrorModal(true)
      } else {
        navigation.navigate('Preview Recipe')
      }
    };
    console.log(recipe)
  };

  const prevPageChange = () => {
    if (index != 0) {
      swiperRef.current.goToPrev()
      setProgress(progress - 1 / 6)
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
          {/* slide 6 */}
          <RecipeUploadScreen6 />
        </Swiper>
      </View>
      <View style={styles().buttonSection}>
        <View style={styles().buttonContainer}>
          <TouchableOpacity
            style={styles('prev').button}
            onPress={() => prevPageChange()}>
            <Text style={{ fontFamily: 'Poppins-Regular' }}>Back</Text>
          </TouchableOpacity>
        </View>
        <View style={styles().buttonContainer}>
          <TouchableOpacity
            style={styles('next').button}
            onPress={() => nextPageChange()}>
            <Text style={{ color: '#ffffff', fontFamily: 'Poppins-Regular' }}>{index == 5 ? 'Preview' : 'Next'}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ErrorModal Title={'Hold on!'} Desc={'Please go back and fill out the missing information. You also need at least one ingredient and one step.'} visible={errorModal} setVisible={setErrorModal} />
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
    borderRadius: 20,
    borderColor: button == 'next' ? '' : '#757882',
    borderWidth: button == 'next' ? 0 : 0.5
  }
});

export default RecipeForm;

