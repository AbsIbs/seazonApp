import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, Pressable, TouchableOpacity } from "react-native";
import Modal from 'react-native-modal'
import { Picker } from 'react-native-wheel-pick';
import { AddRecipeContext } from "../../Global/AddRecipeContext";

const RecipeTiming = (props) => {

  const { errorRecipe } = useContext(AddRecipeContext)

  const [prepTimeModalActive, setPrepTimeModal] = useState(false)
  const [cookingTimeModalActive, setCookingTimeModal] = useState(false)
  const [servingsModalActive, setServingsModal] = useState(false)

  const [prepMins, setPrepMins] = useState(0)
  const [prepHours, setPrepHours] = useState(0)
  const [prepTime, setPrepTime] = useState('-')

  const [cookingMins, setCookingMins] = useState(0)
  const [cookingHours, setCookingHours] = useState(0)
  const [cookingTime, setCookingTime] = useState('-')

  const [tempServingsValue, setTempServingsValue] = useState(1)
  const [servingsValue, setServingsValue] = useState('-')

  /* Saving Cooking Time value */
  useEffect(() => {
    if (cookingTime != '-') {
      props.setRecipeObject(prevState => {
        return ({ ...prevState, cookingTime: cookingTime })
      })
    }
  }, [cookingTime])

  /* Saving Prep Time Value */
  useEffect(() => {
    if (prepTime != '-') {
      props.setRecipeObject(prevState => {
        return ({ ...prevState, prepTime: prepTime })
      })
    }
  }, [prepTime])

  /* Saving Servings Value */
  useEffect(() => {
    if (servingsValue != '-') {
      props.setRecipeObject(prevState => {
        return ({ ...prevState, servings: +servingsValue })
      })
    }
  }, [servingsValue])

  return (
    <>
      <View style={styles().titleContainer}>
        <View style={{ flex: 1, paddingHorizontal: 2.5 }}>
          <Text style={styles().title}>Prep Time</Text>
          <TouchableOpacity
            style={[styles().inputContainer, { borderColor: errorRecipe.prepTime? 'red': '#2B303C'}]}
            onPress={() => {
              setPrepTimeModal(true)
            }}>
            <Text style={styles().inputText}>
              {prepTime} {prepTime > 1 ? 'mins' : 'min'}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, paddingHorizontal: 2.5 }}>
          <Text style={styles().title}>Cooking Time</Text>
          <TouchableOpacity
            style={[styles().inputContainer, { borderColor: errorRecipe.cookingTime? 'red': '#2B303C'}]}
            onPress={() => {
              setCookingTimeModal(true)
            }}>
            <Text style={styles().inputText}>
              {cookingTime} {cookingTime > 1 ? 'mins' : 'min'}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, paddingHorizontal: 2.5 }}>
          <Text style={styles().title}>Servings</Text>
          <TouchableOpacity
            style={[styles().inputContainer, { borderColor: errorRecipe.servings? 'red': '#2B303C'}]}
            onPress={() => {
              setServingsModal(true)
            }}>
            <Text style={styles().inputText}>
              {servingsValue} {servingsValue > 1 ? 'people' : 'person'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Prep Time Modal */}
      <Modal
        isVisible={prepTimeModalActive}
        onBackButtonPress={() => setPrepTimeModal(false)}
        backdropTransitionOutTiming={0}
        onBackdropPress={() => setPrepTimeModal(false)}
        style={{ justifyContent: 'flex-end', margin: 0 }}
        useNativeDriver
        hideModalContentWhileAnimating>
        <View style={styles().modalPickerContainer}>
          <View style={styles().modalSection}>
            <Pressable
              style={styles().modalCloseButton}
              onPress={() => setPrepTimeModal(false)}
              hitSlop={10}>
            </Pressable>
          </View>
          <Text style={styles().modalTitle}>Prep Time</Text>
          <Text style={styles().modalDesc}>How long does it take to get everything in order before you start cooking?</Text>
          <View style={styles().pickersContainer}>
            <Picker
              style={{ backgroundColor: '#00000000', width: 50 }}
              selectedValue={prepHours}
              pickerData={[...Array(24).keys()]}
              onValueChange={value => setPrepHours(value)} />
            <View style={styles('hours').modalLabelContainer}>
              <Text style={styles().modalLabel}>hours</Text>
            </View>
            <Picker
              style={{ backgroundColor: '#00000000', width: 50 }}
              selectedValue={prepMins}
              pickerData={[...Array(60).keys()]}
              onValueChange={value => setPrepMins(value)} />
            <View style={styles('mins').modalLabelContainer}>
              <Text style={styles().modalLabel}>mins</Text>
            </View>
          </View>
          <View style={styles().modalSection}>
            <TouchableOpacity
              style={styles().modalSaveButton}
              onPress={() => {
                setPrepTimeModal(false)
                setPrepTime((prepHours * 60) + (prepMins * 1))
              }}
              hitSlop={10}>
              <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* Cooking Time Modal */}
      <Modal
        isVisible={cookingTimeModalActive}
        onBackButtonPress={() => setCookingTimeModal(false)}
        backdropTransitionOutTiming={0}
        onBackdropPress={() => setCookingTimeModal(false)}
        style={{ justifyContent: 'flex-end', margin: 0 }}
        useNativeDriver
        hideModalContentWhileAnimating>
        <View style={styles().modalPickerContainer}>
          <View style={styles().modalSection}>
            <Pressable
              style={styles().modalCloseButton}
              onPress={() => setCookingTimeModal(false)}
              hitSlop={10}>
            </Pressable>
          </View>
          <Text style={styles().modalTitle}>Cooking Time</Text>
          <Text style={styles().modalDesc}>How long does it take to cook the entire meal?</Text>
          <View style={styles().pickersContainer}>
            <Picker
              style={{ backgroundColor: '#00000000', width: 50 }}
              selectedValue={cookingHours}
              pickerData={[...Array(24).keys()]}
              onValueChange={value => { setCookingHours(value) }} />
            <View style={styles('hours').modalLabelContainer}>
              <Text style={styles().modalLabel}>hours</Text>
            </View>
            <Picker
              style={{ backgroundColor: '#00000000', width: 50 }}
              selectedValue={cookingMins}
              pickerData={[...Array(60).keys()]}
              onValueChange={value => { setCookingMins(value) }} />
            <View style={styles('mins').modalLabelContainer}>
              <Text style={styles().modalLabel}>mins</Text>
            </View>
          </View>
          <View style={styles().modalSection}>
            <TouchableOpacity
              style={styles().modalSaveButton}
              onPress={() => {
                setCookingTimeModal(false)
                setCookingTime((cookingHours * 60) + (cookingMins * 1))
              }}
              hitSlop={10}>
              <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* Servings Modal */}
      <Modal
        isVisible={servingsModalActive}
        onBackButtonPress={() => setServingsModal(false)}
        backdropTransitionOutTiming={0}
        onBackdropPress={() => setServingsModal(false)}
        style={{ justifyContent: 'flex-end', margin: 0 }}
        useNativeDriver
        hideModalContentWhileAnimating>
        <View style={styles().modalPickerContainer}>
          <View style={styles().modalSection}>
            <Pressable
              style={styles().modalCloseButton}
              onPress={() => {
                setServingsModal(false)
              }}
              hitSlop={10}>
            </Pressable>
          </View>
          <Text style={styles().modalTitle}>Servings</Text>
          <Text style={styles().modalDesc}>How many people does the meal serve?</Text>
          <View style={styles().pickersContainer}>
            <Picker
              style={{ backgroundColor: '#00000000', width: 50 }}
              selectedValue={servingsValue}
              pickerData={Array.from({ length: 100 }, (v, k) => k + 1)}
              onValueChange={value => { setTempServingsValue(value) }} />
            <View style={styles('servings').modalLabelContainer}>
              <Text style={styles().modalLabel}>servings</Text>
            </View>
          </View>
          <View style={styles().modalSection}>
            <TouchableOpacity
              style={styles().modalSaveButton}
              onPress={() => {
                setServingsValue(tempServingsValue)
                setServingsModal(false)
              }}
              hitSlop={10}>
              <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  )
};

const styles = (label) => StyleSheet.create({
  mainContainer: {
    width: '100%',
    flex: 1
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  title: {
    flex: 1,
    color: '#ffffff',
    fontSize: 13,
    fontFamily: 'Poppins-Medium'
  },
  inputContainer: {
    borderWidth: 1,
    backgroundColor: '#121212',
    height: 45,
    width: '100%',
    borderRadius: 6,
    marginTop: 5,
    justifyContent: 'center'
  },
  inputText: {
    fontSize: 14,
    color: '#E84A4A',
    fontWeight: 'bold',
    paddingHorizontal: 10,
    fontFamily: 'Poppins-Regular'
  },
  modalSection: {
    alignItems: 'center',
    paddingVertical: 20
  },
  modalPickerContainer: {
    width: '100%',
    backgroundColor: '#121212',
    /*        alignItems: 'center', */
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingLeft: 20,
    color: '#ffffff',
    fontFamily: 'Poppins-Regular'
  },
  modalDesc: {
    fontSize: 14,
    color: '#ffffff50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontFamily: 'Poppins-Regular'
  },
  modalCloseButton: {
    backgroundColor: 'white',
    borderRadius: 5,
    height: 5,
    width: 50,
    marginVertical: 10,
  },
  pickersContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  modalLabelContainer: {
    width: label == 'mins' ? 50 : 75,
    justifyContent: 'center',
  },
  modalLabel: {
    fontWeight: 'bold',
    fontSize: 16,
    borderColor: '#ffffff10',
    backgroundColor: '#8080801A',
    borderTopWidth: 1.1,
    borderBottomWidth: 1.1,
    paddingVertical: 4,
  },
  modalSaveButton: {
    width: '50%',
    height: 35,
    borderRadius: 20,
    backgroundColor: '#E32828',
    justifyContent: 'center'
  }
});

export default RecipeTiming;