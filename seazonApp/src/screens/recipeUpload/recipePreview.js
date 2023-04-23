import React, { useContext, useRef, useState } from "react";
import { View, TouchableOpacity, StyleSheet, Text, Modal } from "react-native";
import { TabbedHeaderPager } from 'react-native-sticky-parallax-header';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from "@react-navigation/native";

import { AddRecipeContext } from "../../../Global/AddRecipeContext";

import RecipePreviewScreenDetails from "./recipePreviewScreenDetails";
import RecipePreviewScreenIngredients from './recipePreviewScreenIngredients'

import uuid from 'react-native-uuid'

import { BallIndicator } from 'react-native-indicators';

// Firebase Storage
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
// Firebase Firestore
import { doc, setDoc, collection, getDocs } from "firebase/firestore/lite";
import { db } from "../../../firebase/firebase-config";

const RecipePreview = () => {

  const key = uuid.v4()

  const { recipe } = useContext(AddRecipeContext);
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)

  const pagerRef = useRef(null);
  const navigation = useNavigation();

  // Create a root reference
  const storage = getStorage();

  const docks = [
    {
      title: 'Details'
    },
    {
      title: 'Ingredients'
    }
  ]

  const uploadRecipeHandler = async () => {
    setLoading(true)
    try {
      // Create a copy of the recipe object
      const newData = { ...recipe }
      delete newData.tempAlternatives
      newData.steps = []

      // Upload image to Firebase
      const coverImageDirectory = `recipes/${key}/coverImage.jpg`
      const coverImageStorageRef = ref(storage, coverImageDirectory)
      const response = await fetch(recipe.coverImage.uri)
      const blob = await response.blob()
      const metadata = {
        contentType: 'image/jpeg'
      }
      await uploadBytes(coverImageStorageRef, blob, 'data_url', metadata)

      // Wait for the upload to complete and download the URL
      const imageURL = await getDownloadURL(ref(storage, `recipes/${key}/coverImage.jpg`));

      // Create a new document in a Cloud Firestore Collection with the cover image URL as a field
      newData['coverImage'] = imageURL

      // Upload video to Firebase if it exists
      if (recipe.coverVideo != null) {
        const coverVideoDirectory = `recipes/${key}/coverVideo.mp4`
        const coverVideoStorageRef = ref(storage, coverVideoDirectory)
        const response = await fetch(recipe.coverVideo.uri)
        const blob = await response.blob()
        const metadata = {
          contentType: 'video/mp4'
        }
        await uploadBytes(coverVideoStorageRef, blob, 'data_url', metadata)
      }

      // Create a new document in a Cloud Firestore Collection with the cover video URL as a field
      if (recipe.coverVideo != null) {
        const videoURL = await getDownloadURL(ref(storage, `recipes/${key}/coverVideo.mp4`))
        newData['coverVideo'] = videoURL
      }

      // Images in steps
      // Loop through each step and upload the step data
      for (let i = 0; i < recipe.steps.length; i++) {
        const step = recipe.steps[i];

        // Upload the step image
        const stepImageRef = ref(storage, `recipes/${key}/steps/${i}.jpg`);
        const response = await fetch(step.coverImage.uri);
        const blob = await response.blob();
        const metadata = {
          contentType: 'image/jpeg'
        };
        await uploadBytes(stepImageRef, blob, metadata);

        // Get the step image download URL
        const imageUrl = await getDownloadURL(stepImageRef);

        // Add to recipe object copy
        newData['steps'].push({
          coverImage: imageURL,
          instructions: step.instructions
        })
      }

      // Add recipe document
      await setDoc(doc(db, "recipes", key), newData);
      console.log('Recipe Posted!')
    } catch (error) {
      // Catch any errors
      console.log(error)
      setLoading(false)
    }
    setLoading(false)
    setVisible(true)
  };

  const HeaderBar = () => {
    return (
      <View style={styles.header}>
        <TouchableOpacity
          style={{ position: 'absolute', left: '5%' }}
          onPress={() => navigation.goBack()}>
          <MaterialIcons
            name="arrow-back-ios"
            size={20}
            color={'white'} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Recipe Preview</Text>
        <TouchableOpacity
          style={styles.postContainer}
          onPress={() => uploadRecipeHandler()}>
          <Text style={styles.post}>Post</Text>
        </TouchableOpacity>
      </View>
    )
  }

  const ConfirmModal = () => {
    return (
      <Modal
        visible={visible}
        transparent
        animationType='fade'>
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <View style={{ padding: 20 }}>
              <Text style={styles.modalTitle}>Posted!</Text>
              <Text style={styles.modalDesc}>Your recipe has now been posted.</Text>
              <View style={{ justifyContent: 'flex-end', flexDirection: 'row' }}>
                <TouchableOpacity style={styles.modalConfirm} onPress={() => {
                  setVisible(false)
                  navigation.navigate('Explore')
                }}>
                  <Text style={{ fontSize: 12, color: 'white', fontWeight: 'bold' }}>Okay!</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    )
  };

  return (
    <>
      <View style={{ flex: 1 }}>
        <TabbedHeaderPager
          ref={pagerRef}
          backgroundColor={'black'}
          initialPage={0}
          backgroundImage={recipe.coverImage}
          renderHeaderBar={() => {
            return (
              <HeaderBar />
            )
          }}
          rememberTabScrollPosition
          headerHeight={200}
          showsVerticalScrollIndicator={false}
          tabs={docks.map((section) => ({
            title: section.title
          }))}
          snapToEdge={false}
          tabsContainerHorizontalPadding={0}
          tabWrapperStyle={{ borderBottomColor: '#2B303C', borderBottomWidth: 1 }}
          tabTextStyle={{ fontFamily: 'Poppins-Light', fontSize: 12, paddingVertical: 5 }}
          tabTextActiveStyle={{ fontFamily: 'Poppins-Regular', fontSize: 12, paddingVertical: 5 }}
          tabTextContainerActiveStyle={{ backgroundColor: '#000000' }}
          tabUnderlineColor={'#E32828'}
          pageContainerStyle={{ flex: 1 }}
          parallaxHeight>
          <RecipePreviewScreenDetails />
          <RecipePreviewScreenIngredients />
        </TabbedHeaderPager>
      </View>
      {/* Confirm Modal */}
      <ConfirmModal />
      {/* Loading Modal */}
      <Modal
        visible={loading}
        animationType={'fade'}>
        <View style={{ backgroundColor: '#151515', flex: 1 }}>
          <BallIndicator color='white' />
        </View>
      </Modal>
    </>
  )
};

const styles = StyleSheet.create({
  header: {
    height: 60,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: '5%'
  },
  headerTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14
  },
  postContainer: {
    position: 'absolute',
    right: '5%',
    backgroundColor: 'white',
    paddingVertical: 5,
    paddingHorizontal: 12.5,
    borderRadius: 4
  },
  post: {
    textAlign: 'left',
    color: '#E84A4A'
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#00000090',
    justifyContent: 'center',
    alignItems: 'center'
  },
  // Modal
  modal: {
    width: '85%',
    backgroundColor: '#121212',
    borderTopColor: 'red',
    borderTopWidth: 2
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  modalDesc: {
    fontSize: 12,
    paddingTop: 10,
    lineHeight: 25
  },
  modalConfirm: {
    height: 35,
    width: 100,
    borderRadius: 5,
    backgroundColor: 'red',
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalCancel: {
    height: 35,
    width: 100,
    borderRadius: 5,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ffffff50'
  }
})

export default RecipePreview;