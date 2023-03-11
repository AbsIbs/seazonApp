import React, { useState, useEffect, useContext } from "react";
import { UIManager, LayoutAnimation, View, Text, StyleSheet, ScrollView, Pressable, ImageBackground } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { launchImageLibrary } from "react-native-image-picker"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import RecipeTiming from "../../components/recipeTiming";

import { AddRecipeContext } from "../../../Global/AddRecipeContext";

const RecipeUploadScreen1 = () => {

  const { setRecipe, errorRecipe } = useContext(AddRecipeContext);

  const [imageUri, setImageUri] = useState(null);
  const [title, setTitle] = useState('')
  const [chefsNotes, setChefsNotes] = useState('')

  const tags = () => {
    const regex = /#[^\s#]+/g
    const matches = chefsNotes.match(regex)
    if (matches) {
      const hashtags = matches.map(match => match.substring(1))
      setRecipe(prevState => {
        return ({ ...prevState, tags: hashtags })
      })
    }
  };

  const maxTitleLength = 100
  const maxChefsNotesLength = 1000

  useEffect(() => {
    if (title != null) {
      setRecipe(prevState => {
        return ({ ...prevState, title: title })
      })
    }
  }, [title])

  useEffect(() => {
    if (chefsNotes != null) {
      tags()
      setRecipe(prevState => {
        return ({ ...prevState, chefsNotes: chefsNotes })
      })
    }
  }, [chefsNotes])

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
      <View style={styles().outerContainer}>
        <Text style={styles().header}>Recipe Name</Text>
        <TextInput
          style={[styles().textInputTitle, { borderColor: errorRecipe.title ? 'red' : '#2B303C' }]}
          placeholder={"Let's name your masterpiece!"}
          onChangeText={(text) => setTitle(text)}
          maxLength={maxTitleLength} />
        <View style={styles().textInputCounterContainer}>
          <Text style={[styles(maxTitleLength).textInputCounter, { color: title.length == maxTitleLength ? 'red' : '#ffffff90', fontWeight: title.length == maxTitleLength ? 'bold' : 'normal' }]}>{title.length}/{maxTitleLength}</Text>
        </View>
      </View>
      <View style={styles().outerContainer}>
        <Text style={styles().header}>Chef's Notes</Text>
        <TextInput
          style={[styles().textInputDescription, { borderColor: errorRecipe.chefsNotes ? 'red' : '#2B303C' }]}
          placeholder={"Let others know the story behind your recipe. Feel free to use hashtags!"}
          multiline
          textAlignVertical="top"
          onChangeText={(text) => setChefsNotes(text)}
          maxLength={maxChefsNotesLength} />
        <View style={styles().textInputCounterContainer}>
          <Text style={[styles(maxChefsNotesLength).textInputCounter, { color: chefsNotes.length == maxChefsNotesLength ? 'red' : '#ffffff90', fontWeight: chefsNotes.length == maxChefsNotesLength ? 'bold' : 'normal' }]}>{chefsNotes.length}/{maxChefsNotesLength}</Text>
        </View>
      </View>
      <View style={styles().outerContainer}>
        <RecipeTiming setRecipeObject={setRecipe} />
      </View>
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
    fontFamily: 'Poppins-Medium'
  },
  textInputTitle: {
    backgroundColor: '#121212',
    height: 45,
    borderRadius: 6,
    marginVertical: 10,
    borderWidth: 1.5,
    paddingHorizontal: 10,
    fontFamily: 'Poppins-Regular',
    alignItems: 'center',
    paddingTop: 1.5,
    paddingBottom: 0
  },
  textInputDescription: {
    backgroundColor: '#121212',
    borderColor: '#2B303C',
    height: 100,
    borderRadius: 6,
    marginVertical: 10,
    borderWidth: 1.5,
    paddingHorizontal: 10,
    fontFamily: 'Poppins-Regular'
  },
  textInputCounterContainer: {
    alignItems: 'flex-end',
    width: '100%'
  },
  textInputCounter: {
    fontSize: 12,
    color: 'white',
    fontFamily: 'Poppins-Regular'
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
  }
});

export default RecipeUploadScreen1;