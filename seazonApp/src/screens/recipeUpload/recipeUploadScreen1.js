import React, { useState } from "react";
import { UIManager, LayoutAnimation, View, Text, StyleSheet, ScrollView, Pressable, ImageBackground } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { launchImageLibrary } from "react-native-image-picker"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import RecipeTiming from "../../components/recipeTiming";

const RecipeUploadScreen1 = (props) => {

  const [imageUri, setImageUri] = useState(null);

  const titleHandler = (text) => {
    props.setRecipeObject(prevState => {
      return ({ ...prevState, title: text })
    })
  };

  const chefsNotesHandler = (text) => {
    props.setRecipeObject(prevState => {
      return ({ ...prevState, chefsNotes: text })
    })
  };

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
        props.setRecipeObject(prevState => {
          return ({ ...prevState, coverImage: { uri: response.assets[0].uri } })
        })
      }
    });
  };

  return (
    <ScrollView>
      {/* Image Uploader */}
      <View style={styles().outerContainer}>
        <Text style={styles().header}>RECIPE NAME</Text>
        <TextInput
          style={styles().textInputTitle}
          placeholder={"Let's name your masterpiece!"}
          onChangeText={(text) => titleHandler(text)} />
      </View>
      <View style={styles().outerContainer}>
        <Text style={styles().header}>CHEF'S NOTES</Text>
        <TextInput
          style={styles().textInputDescription}
          placeholder={"Let others know the story behind your recipe."}
          multiline
          textAlignVertical="top"
          onChangeText={(text) => chefsNotesHandler(text)} />
      </View>
      <View style={styles().outerContainer}>
        <RecipeTiming setRecipeObject={props.setRecipeObject} />
      </View>
      {imageUri == null ?
        <View
          style={[{ alignItems: 'center', justifyContent: 'center' }, styles().section]}>
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
        <View style={[{ alignItems: 'center', justifyContent: 'center', paddingBottom: 20 }, styles().section]}>
          <Pressable
            onPress={LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)}
            style={[styles(225).multimediaUploadContainer]}>
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
    fontSize: 13,
    fontWeight: 'bold',
    color: 'white'
  },
  textInputTitle: {
    backgroundColor: '#121212',
    borderColor: '#2B303C',
    height: 45,
    borderRadius: 6,
    marginVertical: 10,
    borderWidth: 1.5,
    paddingHorizontal: 10
  },
  textInputDescription: {
    backgroundColor: '#121212',
    borderColor: '#2B303C',
    height: 100,
    borderRadius: 6,
    marginVertical: 10,
    borderWidth: 1.5,
    paddingHorizontal: 10
  },
  multimediaUploadContainer: {
    marginTop: 10,
    backgroundColor: '#121212',
    borderColor: '#2B303C',
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
    fontWeight: 'bold'
  }
});

export default RecipeUploadScreen1;