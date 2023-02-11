import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Modal, TextInput, Image, Pressable, ScrollView } from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";
import { launchImageLibrary } from "react-native-image-picker"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Entypo from 'react-native-vector-icons/Entypo'

const RecipeUploadScreen4 = () => {

  const [modalState, setModalState] = useState(false);
  const [imageUri, setImageUri] = useState(null);

  const [data, setData] = useState([
    {
      key: "123",
      picture: '',
      description: "Chop some onions",
      utensils: []
    },
    {
      key: "124",
      picture: '',
      description: "Boil the eggs",
      utensils: []
    }
  ]);

  const renderItem = ({ item, drag, getIndex, isActive }) => {
    return (
      <View>
        <View style={styles.itemHeaderContainer}>
          <View style={{ flex: 1 }}>
            <View style={styles.itemIndexContainer}>
              <Text>{getIndex() + 1}</Text>
            </View>
          </View>
          <View style={{ flex: 1, justifyContent: 'flex-end', flexDirection: 'row' }}>
            <Pressable style={{ marginHorizontal: 15 }}>
              <MaterialCommunityIcons
                name='delete'
                size={25}
                color={'white'} />
            </Pressable>
            <Pressable onPressIn={drag}>
              <MaterialCommunityIcons
                name='menu'
                size={25}
                color={'white'} />
            </Pressable>
          </View>
        </View>
        <View style={styles.itemContainer}>
          <View style={styles.itemImageContainer}>
            <View style={styles.itemImage}>

            </View>
          </View>
          <View style={{ flex: 4 }}>
            <ScrollView style={styles.itemDescriptionContainer}>
              <Text style={styles.itemDescription}>{item.description}</Text>
            </ScrollView>
          </View>
        </View>
      </View>
    )
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
      }
    });
  };

  const AddStepModal = () => {

    const [utelnsils, setUtensils] = useState([]);

    return (
      <View style={styles.modalContainer}>
        <View style={styles.header}>
          <TouchableOpacity
            style={{ position: 'absolute', left: '5%' }}
            onPress={() => setModalState(false)}>
            <Entypo
              size={25}
              color={'white'}
              name={'cross'} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Add step</Text>
          <Text style={{ position: 'absolute', right: '5%', textAlign: 'left', color: '#E84A4A' }}>Confirm</Text>
        </View>
        <View style={styles.modalContentContainer}>
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
          <View style={{ paddingTop: 20 }}>
            <Text style={styles.modalTitle}>INSTRUCTIONS</Text>
            <TextInput
              style={styles.modalTextInput}
              placeholder={'Give some detailed instructions to help others.'} />
          </View>
          <View style={{ paddingTop: 20 }}>
            <Text style={[styles.modalTitle]}>UTENSILS</Text>
            <TextInput
              style={[styles.modalTextInput]}
              placeholder={'Peeler'} />
          </View>
        </View>
      </View>
    )
  };

  return (
    <View style={styles.container}>
      <Text style={{ paddingBottom: 10 }}>You can also add the steps to your recipe.</Text>
      <View style={{ paddingVertical: 20 }}>
        <DraggableFlatList
          data={data}
          keyExtractor={(item) => item.key}
          renderItem={renderItem}
          onDragEnd={({ data }) => setData(data)} />
      </View>
      <TouchableOpacity style={styles.addStepButton} onPress={() => { setModalState(true) }} >
        <MaterialCommunityIcons
          name={'plus'}
          size={20}
          color={'white'} />
        <Text style={{ color: 'white', fontSize: 12 }}>Add a step</Text>
      </TouchableOpacity>
      <Modal
        useNativeDriver
        visible={modalState}
        animationType={'fade'}>
        <AddStepModal />
      </Modal>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: '5%',
    paddingVertical: 20
  },
  addStepButton: {
    height: 45,
    width: '100%',
    borderWidth: 1,
    borderColor: '#E84A4A',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  modalContainer: {
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
  modalContentContainer: {
    flex: 1,
    width: '90%'
  },
  modalTextInput: {
    backgroundColor: '#121212',
    borderColor: '#2B303C',
    height: 50,
    borderRadius: 6,
    marginVertical: 10,
    borderWidth: 1.5,
    paddingHorizontal: 10
  },
  modalTitle: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold'
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
    fontWeight: 'bold'
  },
  itemHeaderContainer: {
    flexDirection: 'row'
  },
  itemIndexContainer: {
    height: 30,
    width: 30,
    backgroundColor: '#121212',
    borderColor: '#2B303C',
    borderRadius: 15,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    height: 125,
    width: '100%',
    borderBottomColor: '#ffffff20',
    borderBottomWidth: 1,
    marginVertical: 15,
    paddingBottom: 10
  },
  itemImageContainer: {
    flex: 1,
    marginRight: 20
  },
  itemImage: {
    height: 75,
    width: 75,
    borderWidth: 12,
    paddingHorizontal: 5,
    backgroundColor: 'red',
    borderRadius: 18
  },
  itemDescriptionContainer: {
    backgroundColor: '#121212',
    borderColor: '#2B303C',
    borderRadius: 6,
    marginVertical: 10,
    borderWidth: 1.5,
    padding: 10
  },
  itemDescription: {
    fontSize: 12,
    color: '#ffffff'
  }
});

export default RecipeUploadScreen4