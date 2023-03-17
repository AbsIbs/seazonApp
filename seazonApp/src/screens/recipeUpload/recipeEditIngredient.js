import React, { useContext, useState, useEffect } from "react";
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Pressable, ScrollView } from "react-native";
import cloneDeep from "lodash.clonedeep";
import { useNavigation } from "@react-navigation/native";

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Picker } from 'react-native-wheel-pick';
import Modal from 'react-native-modal'
import SwitchSelector from "react-native-switch-selector"

import ErrorModal from "../../components/errorModal";
import { AddRecipeContext } from "../../../Global/AddRecipeContext";
import uuid from 'react-native-uuid'

const RecipeEditIngredient = (props) => {

  const navigation = useNavigation();
  const { recipe, setRecipe, units } = useContext(AddRecipeContext);

  const typeArray = ['Dairy', 'Cereals and Pulses', 'Fruits', 'Meat', 'Spices and Herbs', 'Vegetables', 'Seafood']

  const ingredientToEdit = cloneDeep(recipe.ingredients[props.route.params.index])
  const [ingredient, setIngredient] = useState(ingredientToEdit)

  const [nameError, setNameError] = useState()
  const [typeError, setTypeError] = useState()
  const [amountError, setAmountError] = useState()
  const [measurementError, setMeasurementError] = useState()

  const [confirmErrorModal, setConfirmErrorModal] = useState(false)
  const [editModal, setEditModal] = useState({ state: false });
  const [deleteConfirmModal, setDeleteConfirmModal] = useState({ state: false });

  const errorObject = {
    'name': setNameError,
    'type': setTypeError,
    'amount': setAmountError,
    'measurement': setMeasurementError
  };

  const maxNameLength = 30
  const maxAmountLength = 5

  const [disabled, setDisabled] = useState(false)

  const confirmHandler = async () => {
    const errorArray = []
    for (let prop in ingredient) {
      if ((prop != 'uuid' && prop != 'alternatives')) {
        if (ingredient[prop]) {
          errorObject[prop](false)
        } else {
          errorObject[prop](true)
          errorArray.push(prop)
        }
      }
    };
    if (errorArray.length == 0) {
      setDisabled(true);
      await setRecipe(prevState => {
        const updatedIngredient = [...prevState.ingredients]
        updatedIngredient[props.route.params.index] = ingredient
        return ({ ...prevState, ingredients: updatedIngredient, tempAlternatives: [] })
      })
      console.log('added ingredient')
      navigation.goBack()
    } else {
      setConfirmErrorModal(true)
    }
  };

  const [tempTypeValue, setTempTypeValue] = useState('Dairy');
  const [typeModalActive, setTypeModalActive] = useState(false);

  const [tempMeasurementValue, setTempMeasurementValue] = useState('ml');
  const [measurementModalActive, setMeasurementModalActive] = useState(false);

  // Unit stuff
  const [measurement, setMeasurement] = useState('metric');
  const measurementOptions = [
    { label: 'metric', value: 'metric' },
    { label: 'imperial', value: 'imperial' }
  ];

  useEffect(() => {
    if (recipe.tempAlternatives.length > 0) {
      setIngredient(prevState => {
        return ({ ...prevState, alternatives: recipe.tempAlternatives })
      })
    }
  }, [recipe.tempAlternatives])

  // Alternative Ingredients UI
  const AlternativeIngredient = (props) => {
    return (
      <TouchableOpacity style={styles.alternativeIngredient}
        onPress={() => setEditModal({
          state: true,
          index: props.index
        })} >
        <View style={{ flex: 8 }}>
          <Text style={{ fontFamily: 'Poppins-Light', fontSize: 12 }} >{props.name}</Text>
        </View>
        <View style={{ flex: 2 }}>
          <Text style={{ fontFamily: 'Poppins-Light', fontSize: 12 }} >{props.amount} {props.measurement}</Text>
        </View>
      </TouchableOpacity>
    )
  };

  /* When the page loads, we replace the temporary alternatives array with what is currently in the ingredient of interest */
  useEffect(() => {
    setRecipe(prevState => {
      return ({ ...prevState, tempAlternatives: ingredient.alternatives })
    })
  }, [])

  const deleteAlternativeIngredient = async (indexToRemove) => {
    await setRecipe(prevState => {
      return ({ ...prevState, tempAlternatives: [...prevState.tempAlternatives.filter((_, index) => index !== indexToRemove)] })
    })
    setDeleteConfirmModal({ state: false })
  };

  return (
    <>
      <View style={[styles.modalContainer, { flex: 1 }]}>
        {/* <ScrollView style={{ width: '100%' }} contentContainerStyle={{ alignItems: 'center' }}> */}
        <View style={styles.header}>
          <TouchableOpacity
            style={{ position: 'absolute', left: '5%' }}
            onPress={() => {
              setRecipe(prevState => {
                return ({ ...prevState, tempAlternatives: [] })
              })
              navigation.goBack()
            }}>
            <MaterialCommunityIcons
              size={35}
              color={'white'}
              name={'chevron-left'} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Edit ingredient</Text>
          <TouchableOpacity
            style={{ paddingVertical: 5, paddingHorizontal: 10, position: 'absolute', right: '5%' }}
            onPress={() => confirmHandler()}
            disabled={disabled}>
            <Text style={{ textAlign: 'left', color: '#E84A4A', fontSize: 12 }}>Confirm</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.modalContentContainer}>
          <ScrollView>
            <View style={{ paddingTop: 20 }}>
              <Text style={styles.modalTitle}>Ingredient Name</Text>
              <TextInput
                style={[styles.modalTextInput, { borderColor: nameError ? 'red' : '#2B303C', paddingTop: 1.5, paddingBottom: 0 }]}
                maxLength={maxNameLength}
                value={ingredient.name}
                onChangeText={(text) =>
                  setIngredient(prevState => {
                    return ({ ...prevState, name: text })
                  })} />
            </View>
            <Text style={[styles.counter, { color: ingredient.name.length == maxNameLength ? 'red' : null }]}>{ingredient.name.length}/{maxNameLength}</Text>
            {/* Type of ingredient component */}
            <View style={{ paddingTop: 20 }}>
              <Text style={[styles.modalTitle]}>Type of ingredient</Text>
              <TouchableOpacity style={[styles.modalTextInput, { justifyContent: 'center', borderColor: typeError ? 'red' : '#2B303C' }]} onPress={() => setTypeModalActive(true)}>
                {ingredient.type == null ?
                  <Text style={{ color: '#ffffff80', fontFamily: 'Poppins-Regular', paddingTop: 1.5, paddingBottom: 0 }}>Dairy</Text>
                  : <Text style={{ color: '#ffffff', fontFamily: 'Poppins-Regular', paddingTop: 1.5, paddingBottom: 0 }}>{ingredient.type}</Text>}
              </TouchableOpacity>
            </View>
            {/* Amount and unit container */}
            <View style={{ paddingTop: 20, flexDirection: 'row' }}>
              {/* Amount component */}
              <View style={[{ flex: 1 }, { paddingRight: 5 }]}>
                <Text style={styles.modalTitle}>Amount</Text>
                <TextInput
                  style={[styles.modalTextInput, { borderColor: amountError ? 'red' : '#2B303C', paddingTop: 1.5, paddingBottom: 0 }]}
                  keyboardType={'numeric'}
                  maxLength={maxAmountLength}
                  value={ingredient.amount}
                  onChangeText={(text) => setIngredient(prevState => {
                    return ({ ...prevState, amount: text })
                  })} />
              </View>
              {/* Measurement component */}
              <View style={[{ flex: 1 }, { paddingLeft: 5 }]}>
                <Text style={styles.modalTitle}>Measurement</Text>
                <TouchableOpacity style={[styles.modalTextInput, { justifyContent: 'center', borderColor: measurementError ? 'red' : '#2B303C' }]} onPress={() => setMeasurementModalActive(true)}>
                  {ingredient.measurement == null ?
                    <Text style={{ color: '#ffffff80' }}>ml</Text>
                    : <Text style={{ color: '#ffffff' }}>{ingredient.measurement}</Text>}
                </TouchableOpacity>
                <SwitchSelector
                  options={measurementOptions}
                  initial={0}
                  onPress={value => setMeasurement(value)}
                  textColor={'#d3d3d3'}
                  selectedColor={'#ffffff'}
                  borderColor={'#2B303C'}
                  buttonColor={'#2B303C'}
                  hasPadding
                  fontSize={12}
                  backgroundColor={'#121212'}
                />
              </View>
            </View>
            {/* Alternatives */}
            <View style={{ paddingTop: 20 }}>
              <Text style={[styles.modalTitle]}>Alternatives</Text>
              {ingredient.alternatives.length > 0 ?
                ingredient.alternatives.map((item, index) => {
                  const key = uuid.v4()
                  return (
                    <AlternativeIngredient
                      key={key} name={item.name}
                      amount={item.amount}
                      measurement={item.measurement}
                      index={index} />
                  )
                }) : null
              }
              {ingredient.alternatives.length < 3 ?
                <View style={{ paddingTop: 10 }}>
                  <TouchableOpacity style={styles.addAlternativeIngredient} onPress={() => navigation.navigate('Add Alternative')}>
                    <MaterialCommunityIcons
                      name={'plus'}
                      size={20}
                      color={'#ffffff90'} />
                    <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 12, paddingTop: 2 }} >Add an alternative ingredient</Text>
                  </TouchableOpacity>
                </View> : null
              }
            </View>
          </ScrollView>
        </View>
        {/* </ScrollView> */}
      </View>

      {/* Type Modal */}
      <Modal
        isVisible={typeModalActive}
        onBackdropPress={() => setTypeModalActive(false)}
        backdropTransitionOutTiming={0}
        style={{ justifyContent: 'flex-end', margin: 0 }}
        useNativeDriver
        hideModalContentWhileAnimating>
        <View style={styles.modalPickerContainer}>
          <View style={styles.modalPickerSection}>
            <Pressable
              style={styles.modalPickerCloseButton}
              onPress={() => setTypeModalActive(false)}
              hitSlop={10}>
            </Pressable>
          </View>
          <Text style={styles.modalPickerTitle}>Type</Text>
          <Text style={styles.modalPickerDesc}>Please select the type of ingredient</Text>
          <View style={styles.pickersContainer}>
            <Picker
              textColor="#d3d3d3"
              textSize={20}
              style={{ backgroundColor: '#00000000', width: 250 }}
              selectedValue={tempTypeValue}
              pickerData={typeArray}
              onValueChange={value => setTempTypeValue(value)} />
          </View>
          <View style={styles.modalPickerSection}>
            <TouchableOpacity
              style={styles.modalPickerSaveButton}
              onPress={() => {
                setIngredient(prevState => {
                  return ({ ...prevState, type: tempTypeValue })
                })
                setTypeModalActive(false)
              }}
              hitSlop={10}>
              <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Unit Modal */}
      <Modal
        isVisible={measurementModalActive}
        onBackdropPress={() => setMeasurementModalActive(false)}
        backdropTransitionOutTiming={0}
        style={{ justifyContent: 'flex-end', margin: 0 }}
        useNativeDriver
        hideModalContentWhileAnimating>
        <View style={styles.modalPickerContainer}>
          <View style={styles.modalPickerSection}>
            <Pressable
              style={styles.modalPickerCloseButton}
              onPress={() => setMeasurementModalActive(false)}
              hitSlop={10}>
            </Pressable>
          </View>
          <Text style={styles.modalPickerTitle}>Measurement</Text>
          <Text style={styles.modalPickerDesc}>Please select the unit of measurement</Text>
          <View style={styles.pickersContainer}>
            <Picker
              textColor="#d3d3d3"
              textSize={20}
              style={{ backgroundColor: '#00000000', width: 250 }}
              selectedValue={tempMeasurementValue}
              pickerData={units[measurement]}
              onValueChange={value => setTempMeasurementValue(value)} />
          </View>
          <View style={styles.modalPickerSection}>
            <TouchableOpacity
              style={styles.modalPickerSaveButton}
              onPress={() => {
                setIngredient(prevState => {
                  return ({ ...prevState, measurement: tempMeasurementValue })
                })
                setMeasurementModalActive(false)
              }}
              hitSlop={10}>
              <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

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
              navigation.navigate('Edit Alternative', {
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
            onPress={() => deleteAlternativeIngredient(deleteConfirmModal.index)}>
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

      {/* Error Modals */}
      <ErrorModal Title={'Hold on!'} Desc={'Please fill out the required information.'} visible={confirmErrorModal} setVisible={setConfirmErrorModal} />
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
    fontSize: 12,
    color: '#ffffff80',
    paddingBottom: 10,
    fontFamily: 'Poppins-Regular'
  },
  addIngredientButton: {
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
    fontSize: 14,
    fontFamily: 'Poppins-Regular'
  },
  counter: {
    alignSelf: 'flex-end',
    fontSize: 12,
    fontFamily: 'Poppins-Regular'
  },
  modalContentContainer: {
    flex: 1,
    width: '90%'
  },
  modalTextInput: {
    backgroundColor: '#121212',
    height: 50,
    borderRadius: 6,
    marginVertical: 10,
    borderWidth: 1.5,
    paddingHorizontal: 10,
    fontFamily: 'Poppins-Regular'
  },
  modalTitle: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Poppins-Medium'
  },
  ingredientContainer: {
    minHeight: 50,
    width: '100%',
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#2B303C',
    padding: 10
  },
  ingredientImages: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5
  },
  ingredientTypeImageContainer: {
    height: 45,
    width: 45,
    borderRadius: 8,
    backgroundColor: '#D9D9D9',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalPickerContainer: {
    width: '100%',
    backgroundColor: '#121212',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalPickerSection: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  modalPickerTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-Medium',
    paddingLeft: 20,
    color: '#ffffff'
  },
  modalPickerDesc: {
    fontSize: 14,
    color: '#ffffff50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontFamily: 'Poppins-Regular'
  },
  modalPickerCloseButton: {
    backgroundColor: 'white',
    borderRadius: 5,
    height: 5,
    width: 50,
    marginVertical: 10
  },
  pickersContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  modalPickerLabelContainer: {
    width: 75,
    justifyContent: 'center',
  },
  modalPickerLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    borderColor: '#ffffff10',
    backgroundColor: '#8080801A',
    borderTopWidth: 1.1,
    borderBottomWidth: 1.1,
    paddingVertical: 4,
  },
  modalPickerSaveButton: {
    width: '50%',
    height: 35,
    borderRadius: 20,
    backgroundColor: '#E32828',
    justifyContent: 'center'
  },
  addAlternativeIngredient: {
    height: 45,
    width: '100%',
    borderWidth: 1,
    borderColor: '#E84A4A',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  alternativeIngredient: {
    flex: 1,
    flexDirection: 'row',
    borderBottomColor: '#2B303C',
    borderBottomWidth: 1,
    paddingVertical: 10
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

export default RecipeEditIngredient;