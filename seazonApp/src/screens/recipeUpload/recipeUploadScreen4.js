import React, { useContext } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Pressable, ScrollView, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import DraggableFlatList from "react-native-draggable-flatlist";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { AddRecipeContext } from "../../../Global/AddRecipeContext";
import uuid from 'react-native-uuid'

const RecipeUploadScreen4 = () => {

  const navigation = useNavigation();
  const { recipe, setRecipe } = useContext(AddRecipeContext);


  const renderItem = ({ item, drag, getIndex, isActive }) => {

    const deleteStep = (indexToRemove) => {
      setRecipe(prevState => {
        return ({ ...prevState, steps: [...prevState.steps.filter((_, index) => index !== indexToRemove)] })
      })
    };

    return (
      <TouchableOpacity
        style={{ borderBottomColor: '#ffffff20', borderBottomWidth: 1, paddingVertical: 10 }}
        onPress={() => {
          navigation.navigate('Edit Step', {
            index: getIndex()
          })
        }} >
        <View style={styles.itemHeaderContainer}>
          <View style={{ flex: 1 }}>
            <View style={styles.itemIndexContainer}>
              <Text>{getIndex() + 1}</Text>
            </View>
          </View>
          <View style={{ flex: 1, justifyContent: 'flex-end', flexDirection: 'row' }}>
            <Pressable
              onPress={() => deleteStep(getIndex())}
              style={{ marginHorizontal: 15 }}>
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
      </TouchableOpacity>
    )
  };

  return (
    <View style={styles.container}>
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
  }
});

export default RecipeUploadScreen4