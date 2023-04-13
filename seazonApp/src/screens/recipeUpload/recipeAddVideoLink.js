import React, { useContext, useState } from "react";
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import ErrorModal from "../../components/global/errorModal";
import { AddRecipeContext } from "../../../Global/AddRecipeContext";
import { ScrollView } from "react-native-gesture-handler";

const RecipeAddVideoLink = (props) => {

  const navigation = useNavigation();
  const { setRecipe } = useContext(AddRecipeContext);

  const YouTubeGetID = (url) => {
    const re = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|\?v=)([^#&?]{11}).*/

    if (re.test(url)) {
      // Regular expression to match the video ID in the YouTube URL
      const regex = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^\s&?\/]{11})/;
      // Get the video ID from the URL using the regular expression
      const videoId = url.match(regex)[1];
      // Replace the URL with the embed URL
      const embedUrl = `https://www.youtube.com/embed/${videoId}`;
      return videoId
    } else {
      setConfirmErrorModal(true)
    }
  };

  const [url, setURL] = useState()
  const [urlError, setNameError] = useState()
  const [confirmErrorModal, setConfirmErrorModal] = useState(false)

  const [disabled, setDisabled] = useState(false)

  const confirmHandler = async () => {
    await setRecipe(prevState => {
      return ({ ...prevState, youtubeURL: YouTubeGetID(url) })
    })
    navigation.goBack()
  };

  return (
    <>
      <View style={[styles.Container, { flex: 1 }]}>
        <View style={styles.header}>
          <TouchableOpacity
            style={{ position: 'absolute', left: '5%' }}
            onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons
              size={35}
              color={'white'}
              name={'chevron-left'} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Link Video</Text>
          <TouchableOpacity
            style={{ paddingVertical: 5, paddingHorizontal: 10, position: 'absolute', right: '5%' }}
            onPress={() => confirmHandler()}
            disabled={disabled}>
            <Text style={{ textAlign: 'left', color: '#E84A4A', fontSize: 12 }}>Confirm</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.ContentContainer}>
          <ScrollView>
            <View style={{ paddingTop: 20 }}>
              <Text style={styles.Title}>{props.route.params.socialName} Link</Text>
              <TextInput
                style={[styles.TextInput, { borderColor: urlError ? 'red' : '#2B303C', paddingTop: 1.5, paddingBottom: 0 }]}
                placeholder={'https://www.youtube.com/watch?v=jNQXAC9IVRw'}
                onChangeText={(text) =>
                  setURL(text)} />
            </View>
          </ScrollView>
        </View>
      </View>

      {/* Error Modals */}
      <ErrorModal Title={'Hold on!'} Desc={'Please paste a valid url'} visible={confirmErrorModal} setVisible={setConfirmErrorModal} />

    </>
  )
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: '5%',
    paddingVertical: 20
  },
  Container: {
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
    fontSize: 14,
    fontFamily: 'Poppins-Regular'
  },
  ContentContainer: {
    flex: 1,
    width: '90%'
  },
  TextInput: {
    backgroundColor: '#121212',
    height: 50,
    borderRadius: 6,
    marginVertical: 10,
    borderWidth: 1.5,
    paddingHorizontal: 10,
    fontFamily: 'Poppins-Regular'
  },
  Title: {
    color: 'white',
    fontSize: 13,
    fontFamily: 'Poppins-Medium'
  },
  PickerContainer: {
    width: '100%',
    backgroundColor: '#121212',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  PickerSection: {
    alignItems: 'center',
    paddingVertical: 20,
  }
});

export default RecipeAddVideoLink;