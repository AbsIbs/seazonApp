import React, { useContext, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import uuid from 'react-native-uuid'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import { useNavigation } from "@react-navigation/native";
import { AddRecipeContext } from "../../../Global/AddRecipeContext";
import Modal from 'react-native-modal'

const RecipeUploadScreen4 = () => {

  const navigation = useNavigation();
  const { recipe, setRecipe } = useContext(AddRecipeContext);

  const [editModal, setEditModal] = useState({ state: false });
  const [deleteConfirmModal, setDeleteConfirmModal] = useState({ state: false });

  const recipeImages = {
    'Cereals and Pulses': require('../../../assets/img/recipeType/cerealsAndPulses.png'),
    'Dairy': require('../../../assets/img/recipeType/dairy.png'),
    'Fruits': require('../../../assets/img/recipeType/fruits.png'),
    'Meat': require('../../../assets/img/recipeType/meat.png'),
    'Spices and Herbs': require('../../../assets/img/recipeType/spicesAndHerbs.png'),
    'Vegetables': require('../../../assets/img/recipeType/vegetables.png'),
    'Seafood': require('../../../assets/img/recipeType/seafood.png')
  };

  const deleteIngredient = async (indexToRemove) => {
    await setRecipe(prevState => {
      return ({ ...prevState, ingredients: [...prevState.ingredients.filter((_, index) => index !== indexToRemove)] })
    })
    setDeleteConfirmModal({ state: false })
  };

  const Ingredient = (props) => {
    return (
      <TouchableOpacity style={styles.ingredientOuterContainer} onPress={() => {
        setEditModal({
          state: true,
          index: props.index
        })
      }}>
        <View style={styles.ingredientInnerContainer}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {/* Image */}
            <View style={[styles.ingredientImages, { flex: 1.5 }]}>
              <View style={styles.ingredientTypeImageContainer}>
                <Image
                  source={recipeImages[props.type]}
                  style={{ height: 30, width: 30 }} />
              </View>
            </View>
            {/* Ingredient Name */}
            <View style={[{ flex: 5 }]}>
              <Text style={{ fontFamily: 'Poppins-Regular', paddingTop: 1.5, paddingBottom: 0 }}>{props.name}</Text>
            </View>
            {/* Unit */}
            <View style={{ alignItems: 'center', paddingHorizontal: 10, justifyContent: 'center' }}>
              <Text style={{ fontFamily: 'Poppins-Light', paddingTop: 1.5, paddingBottom: 0 }} >{props.amount} {props.measurement}</Text>
            </View>
          </View>
          {/* Alternatives */}
          {props.alternatives.length > 0 ?
            (
              <View>
                <Text style={{ fontFamily: 'Poppins-Light', fontSize: 12.5, paddingTop: 15, paddingBottom: 5 }}>Can be <Text style={{ fontFamily: 'Poppins-Medium' }}>substituted</Text> with:</Text>
                {props.alternatives.map((item) => {
                  const key = uuid.v4()
                  return (
                    <View style={{ flexDirection: 'row' }} key={key} >
                      <View style={{ alignItems: 'center', flex: 1, flexDirection: 'row' }} >
                        <Text style={{ fontFamily: 'Poppins-Light', fontSize: 12.5 }} >{item.name}</Text>
                        <Entypo
                          name={'ccw'}
                          size={12}
                          style={{ paddingLeft: 5 }} />
                      </View>
                      <View style={{ alignItems: 'flex-end', flex: 1 }} >
                        <Text style={{ fontFamily: 'Poppins-Light', fontSize: 12.5 }} >{item.amount} {item.measurement} </Text>
                      </View>
                    </View>
                  )
                })}
              </View>
            ) : null}
        </View>
      </TouchableOpacity>
    )
  };

  return (
    <>
      <View style={styles.container}>
        {recipe.ingredients.length > 0 ?
          <ScrollView>
            {recipe.ingredients.map((item, index) => {
              return (
                <Ingredient
                  name={item.name}
                  key={item.uuid}
                  amount={item.amount}
                  measurement={item.measurement}
                  image={item.image}
                  type={item.type}
                  alternatives={item.alternatives}
                  index={index} />
              )
            })}
          </ScrollView> :
          <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
            <MaterialCommunityIcons
              name={'food'}
              color={'white'}
              size={50}
            />
            <Text style={{ paddingVertical: 10, fontFamily: 'Poppins-Regular' }}>Let's add some ingredients to your recipe</Text>
          </View>
        }
        <TouchableOpacity style={styles.addIngredientButton} onPress={() => {
          navigation.navigate('Add Ingredient')
        }}>
          <MaterialCommunityIcons
            name={'plus'}
            size={20}
            color={'white'} />
          <Text style={{ color: 'white', fontSize: 12, fontFamily: 'Poppins-Regular', paddingTop: 5 }}>Add an ingredient</Text>
        </TouchableOpacity>
      </View>

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
              navigation.navigate('Edit Ingredient', {
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
              <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 12, color: 'white' }} >Edit ingredient</Text>
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
              <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 12, color: 'white' }} >Delete ingredient</Text>
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
          <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14, paddingVertical: 10, paddingHorizontal: '10%' }}>Are you sure you would like to delete this alternate ingredient?</Text>
          {/* Confirm button */}
          <TouchableOpacity
            style={[styles.editModalButton, { backgroundColor: '#800000', borderWidth: 0 }]}
            onPress={() => deleteIngredient(deleteConfirmModal.index)}>
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

    </>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: '5%',
    paddingVertical: 20
  },
  desc: {
    paddingBottom: 10
  },
  addIngredientButton: {
    height: 45,
    width: '100%',
    borderWidth: 1,
    borderColor: '#E84A4A',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 15
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
  ingredientOuterContainer: {
    paddingVertical: 10,
    borderBottomColor: '#ffffff20',
    borderBottomWidth: 1
  },
  ingredientInnerContainer: {
    minHeight: 50,
    width: '100%',
    paddingVertical: 10
  },
  ingredientImages: {
    flex: 1,
    justifyContent: 'center'
  },
  ingredientTypeImageContainer: {
    height: 45,
    width: 45,
    borderRadius: 8,
    backgroundColor: '#D9D9D9',
    justifyContent: 'center',
    alignItems: 'center'
  },
  pickersContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
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

export default RecipeUploadScreen4;