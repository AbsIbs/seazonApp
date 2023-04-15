import React, { useState, useContext } from "react";
import { UIManager, View, Text, StyleSheet, ScrollView, Pressable, ImageBackground, TouchableOpacity } from "react-native";
import Modal from 'react-native-modal'
import { launchImageLibrary } from "react-native-image-picker"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import VideoPlayer from 'react-native-video-controls';

import { AddRecipeContext } from "../../../Global/AddRecipeContext";
import ErrorModal from "../../components/global/errorModal";

const RecipeUploadScreen2 = () => {

  const { recipe, setRecipe, errorRecipe } = useContext(AddRecipeContext);
  const [imageUri, setImageUri] = useState(null);
  const [videoUri, setVideoUri] = useState(null);
  const [videoLengthError, setVideoLengthError] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteConfirmModal, setDeleteConfirmModal] = useState(false);

  if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  };

  /* Upload image */
  const imageUploadHandler = () => {
    const options = {
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

  /* Upload video */
  const videoUploadHandler = () => {
    const options = {
      mediaType: 'video',
      videoQuality: 'medium',
      durationLimit: 60,
      allowsEditing: true
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        null
      } else {
        /* Save the video */
        if (response.assets[0].duration <= options.durationLimit) {
          setVideoUri({ uri: response.assets[0].uri })
        } else {
          setVideoLengthError(true)
        }
      }
    })
  };

  const RenderUpload = (props) => {
    return (
      <View style={styles.UploadContainer}>
        <View style={styles.IconContainer}>
          <MaterialCommunityIcons
            name={props.name}
            color={'white'}
            size={40} />
        </View>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.desc}>{props.desc}</Text>
        <TouchableOpacity
          style={styles.uploadButton}
          onPress={props.onPressHandler}>
          <Text style={styles.uploadText}>Upload</Text>
          <MaterialCommunityIcons
            name='upload'
            size={20}
            color='black' />
        </TouchableOpacity>
      </View>
    )
  };

  return (
    <>
      <ScrollView>
        <View style={styles.outerContainer}>
          {/* Image Uploader */}
          {imageUri == null ?
            <RenderUpload
              name='camera'
              title={'*Upload a cover image'}
              desc={"Let's take the best photo for your recipe!"}
              onPressHandler={imageUploadHandler} /> :
            <>
              <Text style={[styles.header, { alignSelf: 'flex-start' }]}>Cover image</Text>
              <TouchableOpacity
                style={styles.imageContainer}
                onPress={imageUploadHandler}>
                <ImageBackground
                  style={{ height: '100%', width: '100%' }}
                  source={imageUri}
                  imageStyle={{ borderRadius: 6 }}>
                </ImageBackground>
              </TouchableOpacity>
            </>}
          {/* Video Uploader */}
          {videoUri == null ?
            <RenderUpload
              name='video'
              title={'Upload a cover video'}
              desc={"The maximum length of the video is 1 min"}
              onPressHandler={videoUploadHandler} /> :
            <View style={{ height: 200, width: '100%' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={[styles.header, { flex: 1 }]}>Cover video</Text>
                {/* Edit button */}
                <Pressable
                  style={{ flexDirection: 'row', justifyContent: 'flex-end' }}
                  onPress={() => setEditModal(true)}>
                  <SimpleLineIcons
                    name='options'
                    size={25}
                    color={'white'} />
                </Pressable>
              </View>
              <VideoPlayer
                source={videoUri}
                disableBack
                disableVolume />
            </View>}
        </View>
        {/* Error Message for Video Length */}
        <ErrorModal Title={'Hold on!'} Desc={'Your video needs to be 1 minute or less.'} visible={videoLengthError} setVisible={setVideoLengthError} />
      </ScrollView>

      {/* Edit Modal */}
      <Modal
        isVisible={editModal}
        onBackdropPress={() => setEditModal(false)}
        backdropTransitionOutTiming={0}
        style={{ justifyContent: 'flex-end', margin: 0 }}
        useNativeDriver
        hideModalContentWhileAnimating>
        <View style={styles.editModalContainer}>
          {/* Edit button */}
          <TouchableOpacity
            style={styles.editModalButton}
            onPress={() => {
              videoUploadHandler()
              setEditModal(false)
            }}>
            <MaterialCommunityIcons
              name={'file-document-edit'}
              color={'#ffffff'}
              size={22.5}
              style={{ marginLeft: '7.5%', position: 'absolute' }} />
            <View style={{ alignItems: 'center', flex: 1 }}>
              <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 12, color: 'white' }} >Edit video</Text>
            </View>
          </TouchableOpacity>
          {/* Delete button */}
          <TouchableOpacity
            style={[styles.editModalButton, { backgroundColor: '#800000', borderWidth: 0 }]}
            onPress={() => {
              setEditModal(false)
              setDeleteConfirmModal(true)
            }}>
            <MaterialCommunityIcons
              name={'delete'}
              color={'#ffffff'}
              size={22.5}
              style={{ marginLeft: '7.5%', position: 'absolute' }} />
            <View style={{ alignItems: 'center', flex: 1 }}>
              <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 12, color: 'white' }} >Delete video</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Delete confirm Modal */}
      <Modal
        isVisible={deleteConfirmModal}
        onBackdropPress={() => setDeleteConfirmModal(false)}
        backdropTransitionOutTiming={0}
        style={{ justifyContent: 'flex-end', margin: 0 }}
        useNativeDriver
        hideModalContentWhileAnimating>
        <View style={styles.editModalContainer}>
          <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14, paddingVertical: 10, paddingHorizontal: '10%' }}>Are you sure you would like to delete this step?</Text>
          {/* Confirm button */}
          <TouchableOpacity
            style={[styles.editModalButton, { backgroundColor: '#800000', borderWidth: 0 }]}
            onPress={() => {
              setVideoUri(null)
              setDeleteConfirmModal(false)
            }}>
            <View style={{ alignItems: 'center', flex: 1 }}>
              <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 12, color: 'white' }} >Yes</Text>
            </View>
          </TouchableOpacity>
          {/* Refuse button */}
          <TouchableOpacity
            style={styles.editModalButton}
            onPress={() => setDeleteConfirmModal(false)}>
            <View style={{ alignItems: 'center', flex: 1 }}>
              <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 12, color: 'white' }} >No</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  )
};

const styles = StyleSheet.create({
  section: {
    paddingTop: 10
  },
  outerContainer: {
    paddingTop: 20,
    paddingHorizontal: '2.5%',
    alignItems: 'center'
  },
  UploadContainer: {
    height: 250,
    width: '95%',
    borderWidth: 2,
    borderColor: '#121212',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    marginBottom: 20
  },
  imageContainer: {
    height: 200,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20
  },
  header: {
    fontSize: 14,
    color: 'white',
    fontFamily: 'Poppins-Medium'
  },
  IconContainer: {
    height: 70,
    width: 70,
    backgroundColor: '#1D1D1E',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: 'white',
    paddingVertical: 15
  },
  desc: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#d2d2d2'
  },
  uploadButton: {
    height: 35,
    width: 100,
    backgroundColor: 'white',
    borderRadius: 6,
    marginTop: 20,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row'
  },
  uploadText: {
    color: 'black',
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    marginTop: 2.5
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