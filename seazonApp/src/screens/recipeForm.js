import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import Swiper from 'react-native-web-swiper'
import { useNavigation } from "@react-navigation/native";
import { Bar } from 'react-native-progress'

// slides
import RecipeUploadScreen1 from "./recipeUpload/recipeUploadPage1";
import RecipeUploadScreen2 from "./recipeUpload/recipeUploadPage2";

import recipeFormSection from "../components/recipeFormSection";
import RecipeMacros from "../components/recipeMacros";

const RecipeForm = () => {

  const navigation = useNavigation();

  const [progress, setProgress] = useState(1 / 8);

  const [recipeObject, setRecipeObject] = useState({
    'title': '',
    'description': ''
  });

  const swiperRef = useRef(null);

  const nextPageChange = () => {
    if (progress <= 1) {
      swiperRef.current.goToNext()
      setProgress(progress + 1 / 8)
    }
  };

  const prevPageChange = () => {
    if (progress > 1 / 8) {
      swiperRef.current.goToPrev()
      setProgress(progress - 1 / 8)
    }
  };

  return (
    <View style={styles().container}>
      <View style={styles().swiperContainer}>
        <View style={{ alignItems: 'center' }}>
          <Bar
            progress={progress}
            width={325}
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
          <ScrollView>
            <View style={styles().section}>
              <Text style={styles().nutrientsTitle}>Calories <Text style={styles().nutrientsOptional}>(Optional)</Text> </Text>
              {/* {recipeMacros({title: 'Calories', desc: '(kcal)'}, dataObject)}  */}
              <RecipeMacros title='Calories' desc='(kcal)' />
            </View>
            <View style={styles().section}>
              <Text style={styles().nutrientsTitle}>Macro Nutrients <Text style={styles().nutrientsOptional}>(Optional)</Text> </Text>
              <RecipeMacros title='Carbs' desc='(g)' />
              <RecipeMacros title='Fat' desc='(g)' />
              <RecipeMacros title='Protein' desc='(g)' />
            </View>
          </ScrollView>
          {/* slide 3 */}
          <ScrollView>
            <View>
              <View style={styles().section}>
                {recipeFormSection({ title: "Description", type: 'text', placeholder: 'Let others know the story behind your recipe. Feel free to use hashtags!', height: 100 })}
              </View>
            </View>
          </ScrollView>
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

