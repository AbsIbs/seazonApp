import React, { useContext, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Pressable, ScrollView, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import DraggableFlatList from "react-native-draggable-flatlist";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { AddRecipeContext } from "../../../Global/AddRecipeContext";
import uuid from 'react-native-uuid'
import Modal from 'react-native-modal'

const RecipeUploadScreen5 = () => {

  const navigation = useNavigation();
  const { recipe, setRecipe } = useContext(AddRecipeContext);

  const [editModal, setEditModal] = useState({ state: false });
  const [deleteConfirmModal, setDeleteConfirmModal] = useState({ state: false });

  const deleteStep = async (indexToRemove) => {
    await setRecipe(prevState => {
      return ({ ...prevState, steps: [...prevState.steps.filter((_, index) => index !== indexToRemove)] })
    })
    setDeleteConfirmModal({state: false})
  };

  const renderItem = ({ item, drag, getIndex, isActive }) => {
    return (
      <View style={{ borderBottomColor: '#ffffff20', borderBottomWidth: 1, paddingVertical: 10 }} >
        <View style={styles.itemHeaderContainer}>
          <View style={{ flex: 1 }}>
            <View style={styles.itemIndexContainer}>
              <Text>{getIndex() + 1}</Text>
            </View>
          </View>
          <View style={{ flex: 1, justifyContent: 'flex-end', flexDirection: 'row' }}>
            <Pressable
              onPress={() => {
                setEditModal({
                  state: true,
                  index: getIndex()
                })
              }}
              style={{ marginHorizontal: 15 }}>
              <SimpleLineIcons
                name='options'
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
            {item.coverImage != null ?
              <View style={styles.itemImage}>
                <Image
                  source={item.coverImage}
                  style={{ height: '100%', width: '100%', borderRadius: 4 }}
                />
              </View>
              :
              <View style={styles.itemDefaultImage}>
                <MaterialCommunityIcons
                  name='camera-image'
                  color='#ffffff'
                  size={35}
                />
              </View>
            }
          </View>
          <View style={{ flex: 4 }}>
            <ScrollView style={styles.itemDescriptionContainer}>
              <Text style={styles.itemDescription}>{item.instructions}</Text>
            </ScrollView>
          </View>
        </View>
        {/* Utensils */}
        <View style={{ flexDirection: 'row', flex: 1, flexWrap: 'wrap' }}>
          {item.utensils ?
            item.utensils.map((utensil) => {
              const key = uuid.v4()
              return (
                <View key={key} style={styles.stepUtensilsContainer}>
                  <Text style={{ fontSize: 12, alignSelf: 'center', padding: 1.5, fontFamily: 'Poppins-Light' }}>{utensil}</Text>
                </View>
              )
            }) : null
          }
        </View>
      </View>
    )
  };

  return (
    <View style={styles.container}>
      {/* Steps list */}
      {recipe.steps.length > 0 ?
        <View style={{ flex: 1 }}>
          <DraggableFlatList
            data={recipe.steps}
            keyExtractor={(item) => item.key}
            renderItem={renderItem}
            onDragEnd={({ data }) => {
              setRecipe(prevState => {
                return ({ ...prevState, steps: data })
              })
            }} />
        </View> :
        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
          <FontAwesome5
            name={'tasks'}
            color={'white'}
            size={50}
          />
          <Text style={{ paddingVertical: 10, fontFamily: 'Poppins-Regular' }}>And now, the steps to your recipe</Text>
        </View>
      }
      <TouchableOpacity style={styles.addStepButton} onPress={() => navigation.navigate('Add Step')} >
        <MaterialCommunityIcons
          name={'plus'}
          size={20}
          color={'white'} />
        <Text style={{ color: 'white', fontSize: 12, fontFamily: 'Poppins-Regular', paddingTop: 5 }}>Add a step</Text>
      </TouchableOpacity>

      {/* Edit Modal */}
      <Modal
        isVisible={editModal.state}
        onBackdropPress={() => setEditModal({ state: false })}
        backdropTransitionOutTiming={0}
        style={{ justifyContent: 'flex-end', margin: 0 }}
        useNativeDriver
        hideModalContentWhileAnimating>
        <View style={styles.editModalContainer}>
          {/* Edit button */}
          <TouchableOpacity
            style={styles.editModalButton}
            onPress={() => {
              navigation.navigate('Edit Step', {
                index: editModal.index
              })
              setEditModal({ state: false })
            }}>
            <MaterialCommunityIcons
              name={'file-document-edit'}
              color={'#ffffff'}
              size={22.5}
              style={{ marginLeft: '7.5%', position: 'absolute' }} />
            <View style={{ alignItems: 'center', flex: 1 }}>
              <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 12, color: 'white' }} >Edit step</Text>
            </View>
          </TouchableOpacity>
          {/* Delete button */}
          <TouchableOpacity
            style={[styles.editModalButton, { backgroundColor: '#800000', borderWidth: 0 }]}
            onPress={() => {
              setEditModal({ state: false })
              setDeleteConfirmModal({ state: true, index: editModal.index })
            }}>
            <MaterialCommunityIcons
              name={'delete'}
              color={'#ffffff'}
              size={22.5}
              style={{ marginLeft: '7.5%', position: 'absolute' }} />
            <View style={{ alignItems: 'center', flex: 1 }}>
              <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 12, color: 'white' }} >Delete step</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Delete confirm Modal */}
      <Modal
        isVisible={deleteConfirmModal.state}
        onBackdropPress={() => setDeleteConfirmModal({ state: false })}
        backdropTransitionOutTiming={0}
        style={{ justifyContent: 'flex-end', margin: 0 }}
        useNativeDriver
        hideModalContentWhileAnimating>
        <View style={styles.editModalContainer}>
          <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14, paddingVertical: 10, paddingHorizontal: '10%' }}>Are you sure you would like to delete this step?</Text>
          {/* Confirm button */}
          <TouchableOpacity
            style={[styles.editModalButton, { backgroundColor: '#800000', borderWidth: 0 }]}
            onPress={() => deleteStep(deleteConfirmModal.index)}>
            <View style={{ alignItems: 'center', flex: 1 }}>
              <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 12, color: 'white' }} >Yes</Text>
            </View>
          </TouchableOpacity>
          {/* Refuse button */}
          <TouchableOpacity
            style={styles.editModalButton}
            onPress={() => setDeleteConfirmModal({ state: false })}>
            <View style={{ alignItems: 'center', flex: 1 }}>
              <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 12, color: 'white' }} >No</Text>
            </View>
          </TouchableOpacity>
        </View>
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
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
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
  stepUtensilsContainer: {
    alignItems: 'center',
    borderColor: '#2B303C',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginVertical: 10,
    marginHorizontal: 5
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
    marginTop: 10
  },
  itemImageContainer: {
    flex: 1,
    paddingRight: 20
  },
  itemImage: {
    height: 75,
    width: 75
  },
  itemDefaultImage: {
    backgroundColor: '#121212',
    borderColor: '#2B303C',
    borderWidth: 0,
    height: 75,
    width: 75,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemDescriptionContainer: {
    backgroundColor: '#121212',
    borderColor: '#2B303C',
    borderRadius: 6,
    borderWidth: 0.5,
    padding: 10
  },
  itemDescription: {
    fontSize: 12,
    color: '#ffffff',
    fontFamily: 'Poppins-Regular'
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

export default RecipeUploadScreen5