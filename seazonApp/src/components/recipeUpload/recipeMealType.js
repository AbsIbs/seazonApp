import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { AddRecipeContext } from "../../../Global/AddRecipeContext";

const RecipeMealType = () => {

    const { setRecipe, errorRecipe } = useContext(AddRecipeContext)
  
    const [activeIndex, setActiveIndex] = useState({
      'Breakfast': false,
      'Lunch': false,
      'Dinner': false,
      'Dessert': false,
      'Beverages': false,
      'Soups': false
    });
  
    // The rendering of each difficulty
    const RenderMealType = (props) => {
      return (
        <>
          <TouchableOpacity
            style={[
              styles.RenderMealType,
              {
                borderWidth: activeIndex[props.name] == true ? 0 : 1,
                backgroundColor: activeIndex[props.name] == true ? '#ffffff' : '#121212',
                borderColor: errorRecipe.mealType ? 'red' : '#2B303C'
              }
            ]}
            onPress={() => toggleColor(props.name)}>
            <Text style={[{ color: activeIndex[props.name] == true ? '#000000' : '#ffffff' }, styles.mealTypeName]}>
              {props.name}
            </Text>
          </TouchableOpacity >
        </>
      )
    };
  
    // Update object state by making a copy rather than mutating the state
    const toggleColor = (mealType) => {
      setActiveIndex(prevState => {
        const nextState = {}
        Object.keys(prevState).forEach(key => {
          if (key == mealType) {
            nextState[key] = true
          } else {
            nextState[key] = false
          }
        })
        return nextState
      })
    };
  
    // Extract cooking frequency
    useEffect(() => {
      setRecipe(prevState => {
        return ({ ...prevState, mealType: Object.keys(activeIndex).find(key => activeIndex[key] === true) })
      })
    }, [activeIndex]);
  
    return (
      <View style={styles.outerContainer}>
        <View style={styles.innerContainer}>
          {Object.keys(activeIndex).map((item, index) => {
            return (
              <RenderMealType name={item} key={index} />
            )
          })}
        </View>
      </View>
    )
  };
  
  const styles = StyleSheet.create({
    outerContainer: {
      alignItems: 'center'
    },
    innerContainer: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      flexWrap: 'wrap'
    },
    mealTypeContainer: {
      flex: 1,
      alignItems: 'center'
    },
    mealTypeName: {
      fontSize: 12,
      fontFamily: 'Poppins'
    },
    RenderMealType: {
      borderWidth: 1,
      justifyContent: 'center',
      alignItems: 'center',
      height: 30,
      borderRadius: 30,
      paddingHorizontal: 20,
      marginRight: 5,
      marginBottom: 7.5
    }
  });
  
  export default RecipeMealType;