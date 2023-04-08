import React, { useState, useContext } from "react";
import { UIManager, LayoutAnimation, View, Text, StyleSheet, ScrollView, Pressable, ImageBackground } from "react-native";
import { launchImageLibrary } from "react-native-image-picker"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import { AddRecipeContext } from "../../../Global/AddRecipeContext";

const RecipeUploadScreen2 = () => {

  const { recipe, setRecipe, errorRecipe } = useContext(AddRecipeContext);
  const [imageUri, setImageUri] = useState(null);

  if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  };

  /* Upload image */
  const galleryUploadHandler = () => {
    let options = {
      storageOption: {
        path: 'images',
        mediaType: 'photo',
      },
      includeBase64: false
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        null
      } else {
        /* Save the image */
        setImageUri({ uri: response.assets[0].uri })
        setRecipe(prevState => {
          return ({ ...prevState, coverImage: { uri: response.assets[0].uri } })
        })
      }
    });
  };

  return (
    <ScrollView>
      {/* Image Uploader */}
      {imageUri == null ?
        <View
          style={[{ alignItems: 'center', justifyContent: 'center', paddingBottom: 20 }, styles().section]}>
          <Pressable
            style={[styles(150).multimediaUploadContainer, { borderColor: errorRecipe.coverImage ? 'red' : '#2B303C' }]}
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
        <View style={[{ alignItems: 'center', justifyContent: 'center', paddingBottom: 20 }, styles().section]}>
          <Pressable
            onPress={LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)}
            style={[styles(225).multimediaUploadContainer, { borderColor: '#2B303C' }]}>
            <ImageBackground
              source={imageUri}
              resizeMode='cover'
              style={{ height: '100%', width: '100%' }}
              imageStyle={{ borderRadius: 8 }}>
            </ImageBackground>
            <Pressable
              style={{ position: 'absolute', height: '100%', width: '100%' }}
              onPress={galleryUploadHandler}>
            </Pressable>
          </Pressable>
        </View>}
    </ScrollView>
  )
};

const styles = (animatedValue) => StyleSheet.create({
  section: {
    paddingTop: 10
  },
  outerContainer: {
    paddingTop: 20,
    paddingHorizontal: '2.5%'
  },
  header: {
    fontSize: 14,
    color: 'white',
    fontFamily: 'Poppins-Medium',
    paddingBottom: 10
  },
  multimediaUploadContainer: {
    marginTop: 10,
    backgroundColor: '#121212',
    borderWidth: animatedValue == 225 ? 0 : 1.5,
    height: animatedValue,
    width: '95%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  multimediaUploadTitle: {
    fontSize: 12,
    color: '#ffffff',
    paddingTop: 10,
    fontFamily: 'Poppins-Medium'
  },
});

export default RecipeUploadScreen2;