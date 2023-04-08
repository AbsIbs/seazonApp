import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import { AddRecipeContext } from "../../../Global/AddRecipeContext";

const RecipeDifficulty = () => {

  const { setRecipe, errorRecipe } = useContext(AddRecipeContext);

  const [activeIndex, setActiveIndex] = useState({
    'Simple': false,
    'Intermediate': false,
    'Advanced': false
  });

  // The rendering of each difficulty
  const RenderDifficulty = (props) => {
    return (
      <>
        <TouchableOpacity
          style={[
            styles.renderDifficulty,
            {
              borderWidth: activeIndex[props.name] == true ? 0 : 1,
              backgroundColor: activeIndex[props.name] == true ? '#ffffff' : '#121212',
              borderColor: errorRecipe.difficulty ? 'red' : '#2B303C'
            }
          ]}
          onPress={() => toggleColor(props.name)}>
          <Text style={[{ color: activeIndex[props.name] == true ? '#000000' : '#ffffff' }, styles.difficultyName]}>
            {props.name}
          </Text>
        </TouchableOpacity>
      </>
    )
  };

  // Update object state by making a copy rather than mutating the state
  const toggleColor = (difficulty) => {
    setActiveIndex(prevState => {
      const nextState = {}
      Object.keys(prevState).forEach(key => {
        if (key == difficulty) {
          nextState[key] = true
        } else {
          nextState[key] = false
        }
      })
      return nextState
    })
  };

  useEffect(() => {
    setRecipe(prevState => {
      return ({ ...prevState, difficulty: Object.keys(activeIndex).find(key => activeIndex[key] === true) })
    })
  }, [activeIndex]);

  return (
    <View style={styles.outerContainer}>
      <View style={styles.innerContainer}>
        {Object.keys(activeIndex).map((item, index) => {
          return (
            <RenderDifficulty name={item} key={index} />
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
  difficultyName: {
    fontSize: 12,
    fontFamily: 'Poppins'
  },
  renderDifficulty: {
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

export default RecipeDifficulty;