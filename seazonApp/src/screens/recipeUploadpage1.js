import React, { useState } from "react";
import { UIManager, LayoutAnimation, View, Text, StyleSheet, ScrollView, Pressable, ImageBackground } from "react-native";
import recipeFormSection from "../components/recipeFormSection";
import recipeMacros from "../components/recipeMacros";
import recipeDifficulty from "../components/recipeDifficulty";

import recipeMealType from "../components/recipeMealType";
import recipeDietary from "../components/recipeDietary";
import recipeTiming from "../components/recipeTiming";
import RecipeTags from "../components/recipeTags";
import { launchCamera, launchImageLibrary } from "react-native-image-picker"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const RecipeUploadScreen1 = () => {

  const dataObject = {};
  const [tagCount, setTagCount] = useState(0);
  const [imageUri, setImageUri] = useState(null);
  
  if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  };

  const galleryUploadHandler = () => {
    let options = {
      storageOption: {
        path: 'images',
        mediaType: 'photo',
      },
      includeBase64: false
    };
    launchImageLibrary(options, response => {
      /* Save the image */
      setImageUri({ uri: response.assets[0].uri })
    });
  };

  return (
    <ScrollView>
      {/* Image Uploader */}
      {imageUri == null ?
        <View 
         style={[{ alignItems: 'center', justifyContent: 'center'}, styles().section]}>
          <Pressable
            style={styles(150).multimediaUploadContainer}
            onPress={galleryUploadHandler}>
            <MaterialCommunityIcons
              name='camera-plus-outline'
              color='#ffffff'
              size={35}
            />
            <Text style={styles().multimediaUploadTitle}>Choose a cover image</Text>
          </Pressable>
        </View>
        :
        <View style={[{ alignItems: 'center', justifyContent: 'center'}, styles().section]}>
          <Pressable
           onPress={LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)}
           style = {[styles(250).multimediaUploadContainer]}>
            <ImageBackground
              source={imageUri}
              resizeMode='cover'
              style={{ height: '100%', width: '100%'}}
              imageStyle={{borderRadius: 3}}>
            </ImageBackground>
            <Pressable 
             style={{position: 'absolute', height: '100%', width: '100%'}}
             onPress={galleryUploadHandler}></Pressable>
          </Pressable>
        </View>}
      {/* Video Uploader */}
      <View style={styles().section}>
        {recipeFormSection({ title: 'Upload a video (optional)', type: 'multimedia', iconName: 'filmstrip', height: 150 })}
      </View>
      <View style={styles().section}>
        {recipeFormSection({ title: "Title", type: 'text', placeholder: "Let's name your masterpiece, for example, Chicken ceasar salad with sun dried tomatoes", height: 'auto' })}
      </View>
      <View style={styles().section}>
        {recipeFormSection({ title: "Description", type: 'text', placeholder: 'Let others know the story behind your recipe or give it a short description. You can add the steps in a later section', height: 80 })}
      </View>
      <View style={styles().section}>
        {recipeTiming()}
      </View>
      <View style={styles().section}>
        <Text style={styles().sectionTitle}>Categories</Text>
        <View style={styles().outerCategoryContainer}>
          <View style={styles().innerCategoryContainer}>
            <Text style={styles().sectionSubheader}>Difficulty</Text>
            {recipeDifficulty()}
          </View>
        </View>
        <View style={styles().outerCategoryContainer}>
          <View style={styles().innerCategoryContainer}>
            <Text style={styles().sectionSubheader}>Meal Type</Text>
            {recipeMealType()}
          </View>
        </View>
        <View style={styles().outerCategoryContainer}>
          <View style={styles().innerCategoryContainer}>
            <Text style={styles().sectionSubheader}>Dietary</Text>
            {recipeDietary()}
          </View>
        </View>
      </View>
      <View style={styles().section}>
        <Text style={styles().sectionTitle}>Tags<Text style={styles().sectionSubheader}> ({tagCount}/30)</Text> </Text>
        <RecipeTags tagCount={tagCount} setTagCount={setTagCount}/>
      </View>
      <View style={styles().section}>
        <Text style={styles().sectionTitle}>Nutrients <Text style={styles().sectionOptionalTitle}>(Optional)</Text> </Text>
        {recipeMacros({ title: 'Calories', desc: '(kcal)' }, dataObject)}
        {recipeMacros({ title: 'Carbs', desc: '(g)' }, dataObject)}
        {recipeMacros({ title: 'Fat', desc: '(g)' }, dataObject)}
        {recipeMacros({ title: 'Protein', desc: '(g)' }, dataObject)}
      </View>
    </ScrollView>
  )
};

const styles = (animatedValue) => StyleSheet.create({
  container: {
    flex: 1,
    color: 'black',
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
  },
  slideContainer: {
    flex: 1
  },
  scrollContainer: {
  },
  section: {
    paddingVertical: 10
  },
  multimediaUploadContainer: {
    marginTop: 10,
    backgroundColor: '#1E1E1E',
    borderColor: '#ffffff30',
    borderWidth: animatedValue == 250? 0: 1.5,
    height: animatedValue,
    width: '95%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3
  },
  multimediaUploadTitle: {
    fontSize: 12,
    color: '#ffffff',
    paddingTop: 10,
    fontWeight: 'bold'
  },
  outerInputSection: {
    alignItems: 'center'
  },
  buttonSection: {
    height: 55,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopColor: '#ffffff30',
    borderTopWidth: 1
  },
  sectionTitle: {
    fontSize: 16,
    color: '#ffffff',
    paddingTop: 10,
    fontWeight: 'bold',
    paddingLeft: 20,
    paddingBottom: 10
  },
  sectionSubheader: {
    fontSize: 12,
    fontWeight: 'bold',
    paddingBottom: 10,
    color: '#ffffff'
  },
  outerCategoryContainer: {
    alignItems: 'center'
  },
  innerCategoryContainer: {
    width: '90%',
    borderTopColor: '#ffffff20',
    borderTopWidth: 1,
    paddingTop: 10,
    paddingBottom: 15
  },
  sectionOptionalTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#ffffff'
  }
});

export default RecipeUploadScreen1;