import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { AddRecipeContext } from "../../../Global/AddRecipeContext";

const RecipeDietary = () => {

  const { setRecipe, errorRecipe } = useContext(AddRecipeContext)

  const [activeIndex, setActiveIndex] = useState({
    'Vegan': false,
    'Vegetarian': false,
    'Pescatarian': false,
    'Nut-Free': false,
    'Gluten-Free': false,
    'Dairy-Free': false,
    'High Protein': false,
    'Low Carb': false,
    'High Fat': false
  });

  // The rendering of each dietary type
  const RenderDietary = (props) => {
    return (
      <>
        <TouchableOpacity
          style={[
            styles.renderDietary,
            {
              backgroundColor: activeIndex[props.name] == true ? '#ffffff' : '#121212',
              borderColor: errorRecipe.dietary ? 'red' : '#2B303C'
            }
          ]}
          onPress={() => toggleColor(props.name)}>
          <Text style={[{ color: activeIndex[props.name] == true ? '#000000' : '#ffffff' }, styles.dietaryName]}>
            {props.name}
          </Text>
        </TouchableOpacity>
      </>
    )
  }

  // Update object state by making a copy rather than mutating the state
  const toggleColor = (dietary) => {
    setActiveIndex(prevState => {
      return ({ ...prevState, [dietary]: !activeIndex[dietary] })
    })
  };

  useEffect(() => {
    setRecipe(prevState => {
      return ({ ...prevState, dietary: Object.keys(activeIndex).filter(key => activeIndex[key] === true).map(key => key) })
    })
  }, [activeIndex])

  return (
    <View style={styles.outerContainer}>
      <View style={styles.innerContainer}>
        {Object.keys(activeIndex).map((item, index) => {
          return (
            <RenderDietary name={item} key={index} />
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
  dietaryName: {
    fontSize: 12,
    fontFamily: 'Poppins'
  },
  renderDietary: {
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

export default RecipeDietary;