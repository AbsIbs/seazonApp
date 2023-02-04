import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import Swiper from 'react-native-web-swiper'
import { Bar } from 'react-native-progress'

// slides
import RecipeUploadScreen1 from "./recipeUpload/recipeUploadScreen1";
import RecipeUploadScreen2 from "./recipeUpload/recipeUploadScreen2";
import RecipeUploadScreen3 from "./recipeUpload/recipeUploadScreen3";
import RecipeUploadScreen6 from "./recipeUpload/recipeUploadScreen6";

const RecipeForm = () => {

  const windowWidth = Dimensions.get('window').width;

  const [progress, setProgress] = useState(1 / 6);

  const [recipeObject, setRecipeObject] = useState({
    'title': '',
    'description': ''
  });

  const swiperRef = useRef(null);

  const nextPageChange = () => {
    if (progress <= 1) {
      swiperRef.current.goToNext()
      setProgress(progress + 1 / 6)
    }
  };

  const prevPageChange = () => {
    if (progress > 1 / 6) {
      swiperRef.current.goToPrev()
      setProgress(progress - 1 / 6)
    }
  };

  return (
    <View style={styles().container}>
      <View style={styles().swiperContainer}>
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
        <Swiper
          controlsProps={{
            prevPos: false,
            dotsPos: false,
            nextPos: false
          }}
          ref={swiperRef}
          gesturesEnabled={() => false}>
          {/* slide 1 */}
          <RecipeUploadScreen1 />
          {/* slide 2 */}
          <RecipeUploadScreen2 />
          {/* slide 3 */}
          <RecipeUploadScreen3 />
          {/* slide 4 */}
          {/* slide 5 */}
          {/* slide 6 */}
          <RecipeUploadScreen6 />
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

