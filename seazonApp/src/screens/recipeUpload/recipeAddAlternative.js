import React, { useContext, useState } from "react";
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Pressable } from "react-native";
import uuid from 'react-native-uuid'
import { useNavigation } from "@react-navigation/native";

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Picker } from 'react-native-wheel-pick';
import Modal from 'react-native-modal'
import SwitchSelector from "react-native-switch-selector"

import ErrorModal from "../../components/errorModal";
import { AddRecipeContext } from "../../../Global/AddRecipeContext";
import { ScrollView } from "react-native-gesture-handler";

const RecipeAddAlternative = () => {

  const navigation = useNavigation();
  const { setTempAlternativeIngredient } = useContext(AddRecipeContext);

  const [ingredient, setIngredient] = useState({
    uuid: uuid.v4(),
    name: '',
    amount: '',
    measurement: null
  });

  const [nameError, setNameError] = useState()
  const [amountError, setAmountError] = useState()
  const [measurementError, setMeasurementError] = useState()
  const [confirmErrorModal, setConfirmErrorModal] = useState(false)

  const errorObject = {
    'name': setNameError,
    'amount': setAmountError,
    'measurement': setMeasurementError
  };

  const maxNameLength = 30
  const maxAmountLength = 5

  const [disabled, setDisabled] = useState(false)

  const confirmHandler = async () => {
    const errorArray = []
    for (let prop in ingredient) {
      if ((prop != 'uuid')) {
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
      await setTempAlternativeIngredient(prevState => {
        return ([...prevState, ingredient])
      })
      console.log('added alternative ingredient')
      navigation.goBack()
    } else {
      setConfirmErrorModal(true)
    }
  };

  const [tempMeasurementValue, setTempMeasurementValue] = useState('ml');
  const [measurementModalActive, setMeasurementModalActive] = useState(false);

  // Unit stuff
  const [measurement, setMeasurement] = useState('metric');
  const measurementOptions = [
    { label: 'metric', value: 'metric' },
    { label: 'imperial', value: 'imperial' }
  ];
  const measurementObject = {
    'metric': ['ml', 'litre(s)', 'tsp', 'tbsp', 'unit(s)', 'mg', 'g', 'kg'],
    'imperial': ['oz', 'lb(s)', 'st', 'pint', 'gal', 'tsp', 'Tbsp', 'unit(s)']
  };

  return (
    <>
      <View style={[styles.modalContainer, { flex: 1 }]}>
        <View style={styles.header}>
          <TouchableOpacity
            style={{ position: 'absolute', left: '5%' }}
            onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons
              size={35}
              color={'white'}
              name={'chevron-left'} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Add alternative ingredient</Text>
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
              <Text style={styles.modalTitle}>Ingredient name</Text>
              <TextInput
                style={[styles.modalTextInput, { borderColor: nameError ? 'red' : '#2B303C', paddingTop: 1.5, paddingBottom: 0 }]}
                placeholder={'Milk'}
                maxLength={maxNameLength}
                onChangeText={(text) =>
                  setIngredient(prevState => {
                    return ({ ...prevState, name: text })
                  })} />
            </View>
            <Text style={[styles.counter, { color: ingredient.name.length == maxNameLength ? 'red' : null }]}>{ingredient.name.length}/{maxNameLength}</Text>
            {/* Amount and unit container */}
            <View style={{ paddingTop: 20, flexDirection: 'row' }}>
              {/* Amount component */}
              <View style={[{ flex: 1 }, { paddingRight: 5 }]}>
                <Text style={styles.modalTitle}>Amount</Text>
                <TextInput
                  style={[styles.modalTextInput, { borderColor: amountError ? 'red' : '#2B303C', paddingTop: 1.5, paddingBottom: 0 }]}
                  keyboardType={'numeric'}
                  maxLength={maxAmountLength}
                  placeholder={'50'}
                  onChangeText={(text) => setIngredient(prevState => {
                    return ({ ...prevState, amount: text })
                  })} />
              </View>
              {/* Unit component */}
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
          </ScrollView>
        </View>
      </View>

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
              pickerData={measurementObject[measurement]}
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
    fontWeight: 'bold',
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
    fontSize: 13,
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
    paddingLeft: 20,
    color: '#ffffff',
    fontFamily: 'Poppins-Medium'
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
  }
});

export default RecipeAddAlternative;