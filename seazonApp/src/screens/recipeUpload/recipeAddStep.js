import React, { useState, useContext, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity, TextInput, ImageBackground, ScrollView } from "react-native";
import { launchImageLibrary } from "react-native-image-picker"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import { useNavigation } from "@react-navigation/native";
import { AddRecipeContext } from "../../../Global/AddRecipeContext";
import ErrorModal from "../../components/errorModal";
import uuid from 'react-native-uuid'

const RecipeAddStep = () => {

  const { recipe, setRecipe } = useContext(AddRecipeContext);
  const maxInstructionsLength = 500;

  const navigation = useNavigation();
  const [confirmErrorModal, setConfirmErrorModal] = useState(false);
  const [instructionsError, setInstructionsError] = useState(false)

  const [step, setStep] = useState({
    key: uuid.v4(),
    coverImage: null,
    instructions: ''
  })

  const [disabled, setDisabled] = useState(false)

  const confirmHandler = async () => {
    if (step.instructions.length != 0) {
      setDisabled(true);
      await setRecipe(prevState => {
        return ({ ...prevState, steps: [...prevState.steps, step] })
      });
      console.log('added step');
      navigation.goBack();
    } else {
      setInstructionsError(true, () => {
        setConfirmErrorModal(true);
      });
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
        setStep(prevState => {
          return ({ ...prevState, coverImage: { 'uri': response.assets[0].uri } })
        })
      }
    })
  };

  useEffect(() => {
    console.log(step)
  }, [step])

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={{ position: 'absolute', left: '5%' }}
            onPress={() => navigation.goBack()}>
            <Entypo
              size={25}
              color={'white'}
              name={'cross'} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Add step</Text>
          <TouchableOpacity
            style={{ position: 'absolute', right: '5%' }}
            onPress={() => confirmHandler()}
            disabled={disabled}>
            <Text style={styles.confirm}>Confirm</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.contentContainer}>
          <ScrollView>
            {step.coverImage == null ?
              <TouchableOpacity
                style={styles.multimediaUploadContainer}
                onPress={galleryUploadHandler}>
                <MaterialCommunityIcons
                  name='camera-plus-outline'
                  color='#ffffff'
                  size={35}
                />
                <Text style={styles.multimediaUploadTitle}>Upload an image</Text>
              </TouchableOpacity>
              :
              <TouchableOpacity
                style={[styles.multimediaUploadContainer, { borderColor: '#ffffff00' }]}
                onPress={galleryUploadHandler}>
                <ImageBackground
                  source={step.coverImage}
                  resizeMode='cover'
                  style={{ height: '100%', width: '100%' }}
                  imageStyle={{ borderRadius: 8 }}>
                </ImageBackground>
              </TouchableOpacity>}
            <View style={{ paddingTop: 20 }}>
              <Text style={styles.title}>Instructions</Text>
              <TextInput
                style={[styles.instructionsInput, { borderColor: instructionsError ? 'red' : '#2B303C' }]}
                placeholder={'Give some detailed instructions to help others.'}
                onChangeText={(text) => setStep(prevState => {
                  return ({ ...prevState, instructions: text })
                })}
                maxLength={maxInstructionsLength}
                multiline
                textAlignVertical="top" />
            </View>
            <Text style={[styles.counter, { color: step.instructions.length == maxInstructionsLength ? 'red' : null }]}>{step.instructions.length}/{maxInstructionsLength}</Text>
          </ScrollView>
        </View>
      </View>
      <ErrorModal Title={'Hold on!'} Desc={'Please enter the instructions for your step.'} visible={confirmErrorModal} setVisible={setConfirmErrorModal} />
    </>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center'
  },
  header: {
    height: 60,
    width: '100%',
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: '5%'
  },
  headerTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14
  },
  confirm: {
    textAlign: 'left',
    color: '#E84A4A'
  },
  contentContainer: {
    flex: 1,
    width: '90%'
  },
  textInput: {
    backgroundColor: '#121212',
    height: 50,
    borderRadius: 6,
    marginVertical: 10,
    borderWidth: 1.5,
    paddingHorizontal: 10
  },
  instructionsInput: {
    backgroundColor: '#121212',
    minHeight: 100,
    borderRadius: 6,
    marginVertical: 10,
    borderWidth: 1.5,
    padding: 10,
    fontFamily: 'Poppins-Regular'
  },
  title: {
    color: 'white',
    fontSize: 13,
    fontFamily: 'Poppins-Medium'
  },
  multimediaUploadContainer: {
    marginTop: 10,
    backgroundColor: '#121212',
    borderColor: '#2B303C',
    borderWidth: 1.5,
    height: 250,
    width: '100%',
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
  counter: {
    alignSelf: 'flex-end',
    fontSize: 12,
    fontFamily: 'Poppins-Regular'
  }
});

export default RecipeAddStep;