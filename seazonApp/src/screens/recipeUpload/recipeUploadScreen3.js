import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Modal, TextInput, Image } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Entypo from 'react-native-vector-icons/Entypo'


const RecipeUploadScreen3 = () => {

  const [modalState, setModalState] = useState(false);

  const [ingredientsList, setIngredientsList] = useState([
    { name: 'Tomato', amount: 2, unit: 'cups', image: require('../../../assets/img/recipeType/vegetables.png') }
  ]);

  const Ingredient = (props) => {
    return (
      <View style={{ paddingVertical: 10 }}>
        <View style={styles.ingredientContainer}>
          <View style={styles.ingredientImages}>
            <View style={styles.ingredientTypeImageContainer}>
              <Image
                source={props.image}
                style={{ height: 20, width: 20 }} />
            </View>
          </View>
          <View style={{ flex: 4, paddingHorizontal: 10 }}>
            <Text style={{ fontWeight: 'bold' }}>{props.name}</Text>
          </View>
          <View style={{ flex: 4, paddingHorizontal: 10, alignItems: 'flex-end' }}>
            <Text style={{ fontStyle: 'italic' }}>{props.amount} {props.unit}</Text>
          </View>
        </View>
      </View>
    )
  };

  const AddIngredientModal = () => {
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
          <Text style={styles.headerTitle}>Add ingredient</Text>
          <Text style={{ position: 'absolute', right: '5%', textAlign: 'left', color: '#E84A4A' }}>Confirm</Text>
        </View>
        <View style={styles.modalContentContainer}>
          <View style={{ paddingTop: 20 }}>
            <Text style={styles.modalTitle}>INGREDIENT NAME</Text>
            <TextInput
              style={styles.modalTextInput}
              placeholder={'Milk'} />
          </View>
          <View style={{ paddingTop: 20 }}>
            <Text style={[styles.modalTitle]}>TYPE OF INGREDIENT</Text>
            <TextInput
              style={[styles.modalTextInput]}
              placeholder={'Dairy'} />
          </View>
          <View style={{ paddingTop: 20, flexDirection: 'row' }}>
            <View style={[{ flex: 1 }, { paddingRight: 5 }]}>
              <Text style={styles.modalTitle}>AMOUNT</Text>
              <TextInput
                style={[styles.modalTextInput]}
                placeholder={'50'} />
            </View>
            <View style={[{ flex: 1 }, { paddingLeft: 5 }]}>
              <Text style={styles.modalTitle}>UNIT</Text>
              <TextInput
                style={[styles.modalTextInput]}
                placeholder={'ml'} />
            </View>
          </View>
        </View>
      </View>
    )
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.desc}>Let's add some ingredients to your recipe!</Text>
        {
          ingredientsList.map((item, index) => {
            return (
              <Ingredient
                name={item.name}
                key={index}
                amount={item.amount}
                unit={item.unit}
                image={item.image} />
            )
          })
        }
        <TouchableOpacity style={styles.addIngredientButton} onPress={() => setModalState(true)}>
          <MaterialCommunityIcons
            name={'plus'}
            size={20}
            color={'white'} />
          <Text style={{ color: 'white', fontSize: 12 }}>Add an ingredient</Text>
        </TouchableOpacity>
      </View>
      <Modal
        useNativeDriver
        visible={modalState}
        animationType={'slide'}>
        <AddIngredientModal />
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
  title: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
    paddingBottom: 10
  },
  desc: {
    fontSize: 12,
    color: '#ffffff80',
    paddingBottom: 10
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
  ingredientContainer: {
    height: 50,
    width: '100%',
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#2B303C',
    paddingHorizontal: 10
  },
  ingredientImages: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
    height: '100%'
  },
  ingredientTypeImageContainer: {
    height: 35,
    width: 35,
    borderRadius: 20,
    backgroundColor: '#D9D9D9',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default RecipeUploadScreen3;