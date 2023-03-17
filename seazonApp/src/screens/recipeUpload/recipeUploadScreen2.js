import React, { useState, useContext } from "react";
import { UIManager, TouchableOpacity, LayoutAnimation, View, Text, StyleSheet, ScrollView, Pressable, ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { launchImageLibrary } from "react-native-image-picker"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Modal from 'react-native-modal'

import { AddRecipeContext } from "../../../Global/AddRecipeContext";

const RecipeUploadScreen2 = () => {

  const { recipe, setRecipe, errorRecipe } = useContext(AddRecipeContext);
  const navigation = useNavigation();

  const [deleteConfirmModal, setDeleteConfirmModal] = useState({ state: false });
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

  const deleteLink = async (nav) => {
    await setRecipe(prevState => {
      return ({
        ...prevState,
        [nav]: ''
      })
    })
    setDeleteConfirmModal({ state: false })
  };

  const Social = (props) => {

    const nav = props.socialName.toLowerCase() + 'URL'

    return (
      <Pressable style={styles().socialOuterContainer}>
        {/* Icon */}
        <View style={styles().socialImages}>
          <MaterialCommunityIcons
            name={props.icon}
            size={50}
            color='white' />
        </View>
        {/* Social Name */}
        <View style={{ flex: 1 }}>
          <Text style={{ color: 'white', fontFamily: 'Poppins-Medium', paddingTop: 1.5, paddingBottom: 0 }}>{props.socialName}</Text>
        </View>
        {/* Add button */}
        {recipe[nav].length === 0 ?
          <TouchableOpacity
            style={styles().socialButton}
            onPress={() => navigation.navigate('Add Video Link', {
              socialName: nav
            })} >
            <Text style={{ fontSize: 12, fontFamily: 'Poppins-Regular', paddingTop: 1.5, paddingBottom: 0, color: 'black' }}>Add</Text>
          </TouchableOpacity> :
          <TouchableOpacity
            style={styles().socialButton}
            onPress={() => setDeleteConfirmModal({ state: true, nav: nav })} >
            <Text style={{ fontSize: 12, fontFamily: 'Poppins-Regular', paddingTop: 1.5, paddingBottom: 0, color: 'black' }}>
              Linked  <MaterialCommunityIcons name={'check-bold'} size={15} color={'black'} />
            </Text>
          </TouchableOpacity>}
      </Pressable >
    )
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
      <View style={styles().outerContainer}>
        <Text style={styles().header}>Social Links (optional)</Text>
        <Social socialName='YouTube' icon='youtube' index={0} />
      </View>

      {/* Delete confirm Modal */}
      <Modal
        isVisible={deleteConfirmModal.state}
        onBackdropPress={() => setDeleteConfirmModal({ state: false })}
        backdropTransitionOutTiming={0}
        style={{ justifyContent: 'flex-end', margin: 0 }}
        useNativeDriver
        hideModalContentWhileAnimating>
        <View style={styles().editModalContainer}>
          <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14, paddingVertical: 10, paddingHorizontal: '10%' }}>Are you sure you would like to delete this alternate ingredient?</Text>
          {/* Confirm button */}
          <TouchableOpacity
            style={[styles().editModalButton, { backgroundColor: '#800000', borderWidth: 0 }]}
            onPress={() => deleteLink(deleteConfirmModal.nav)}>
            <View style={{ alignItems: 'center', flex: 1 }}>
              <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 12, color: 'white' }}>Yes</Text>
            </View>
          </TouchableOpacity>
          {/* Refuse button */}
          <TouchableOpacity
            style={styles().editModalButton}
            onPress={() => setDeleteConfirmModal({ state: false })}>
            <View style={{ alignItems: 'center', flex: 1 }}>
              <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 12, color: 'white' }} >No</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
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
  socialOuterContainer: {
    paddingVertical: 10,
    borderBottomColor: '#2B303C',
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  socialImages: {
    justifyContent: 'center',
    paddingRight: 5
  },
  socialButton: {
    alignItems: 'center',
    paddingHorizontal: 10,
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 4,
    height: 25
  },
  editModalContainer: {
    paddingVertical: 10,
    backgroundColor: '#151515',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  editModalButton: {
    width: '80%',
    height: 45,
    borderWidth: 0.5,
    borderColor: 'white',
    borderRadius: 25,
    marginVertical: 7.5,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5
  }
});

export default RecipeUploadScreen2;