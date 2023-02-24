import React, { useState, useContext } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Pressable, ScrollView, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import DraggableFlatList from "react-native-draggable-flatlist";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { AddRecipeContext } from "../../../Global/AddRecipeContext";

const RecipeUploadScreen4 = () => {

  const navigation = useNavigation();
  const { recipe, setRecipe } = useContext(AddRecipeContext);

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
              {item.coverImage != null ?
                <Image
                  source={item.coverImage}
                  style={{height: '100%', width: '100%'}}
                /> : null
              }
            </View>
          </View>
          <View style={{ flex: 4 }}>
            <ScrollView style={styles.itemDescriptionContainer}>
              <Text style={styles.itemDescription}>{item.instructions}</Text>
            </ScrollView>
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
          data={recipe.steps}
          keyExtractor={(item) => item.key}
          renderItem={renderItem}
          onDragEnd={({ data }) => {
            setRecipe(prevState => {
              return ({ ...prevState, steps: data })
            })
          }} />
      </View>
      <TouchableOpacity style={styles.addStepButton} onPress={() => navigation.navigate('Add Step')} >
        <MaterialCommunityIcons
          name={'plus'}
          size={20}
          color={'white'} />
        <Text style={{ color: 'white', fontSize: 12 }}>Add a step</Text>
      </TouchableOpacity>
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