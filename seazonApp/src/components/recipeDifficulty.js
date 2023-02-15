import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const RecipeDifficulty = (props) => {

  const [activeIndex, setActiveIndex] = useState({
    'Simple': false,
    'Intermediate': false,
    'Advanced': false
  });

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
    props.setRecipeObject(prevState => {
      return ({ ...prevState, difficulty: Object.keys(activeIndex).find(key => activeIndex[key] === true) })
    })
  }, [activeIndex]);

  return (
    <View style={styles().outerContainer}>
      <View style={styles().innerContainer}>
        <View style={styles().difficultContainer}>
          <TouchableOpacity
            style={styles(activeIndex['Simple']).difficulty}
            onPress={() => toggleColor('Simple')}>
            <Text style={styles(activeIndex['Simple']).difficultyName}>Simple</Text>
          </TouchableOpacity>
        </View>
        <View style={styles().difficultContainer}>
          <TouchableOpacity
            style={styles(activeIndex['Intermediate']).difficulty}
            onPress={() => toggleColor('Intermediate')}>
            <Text style={styles(activeIndex['Intermediate']).difficultyName}>Intermediate</Text>
          </TouchableOpacity>
        </View>
        <View style={styles().difficultContainer}>
          <TouchableOpacity
            style={styles(activeIndex['Advanced']).difficulty}
            onPress={() => toggleColor('Advanced')}>
            <Text style={styles(activeIndex['Advanced']).difficultyName}>Advanced</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
};

const styles = (state) => StyleSheet.create({
  outerContainer: {
    alignItems: 'center'
  },
  innerContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center'
  },
  difficultContainer: {
    flex: 1,
    alignItems: 'center'
  },
  difficulty: {
    width: '95%',
    borderWidth: state == true ? 0 : 1,
    borderColor: '#2B303C',
    backgroundColor: state == true ? '#ffffff' : '#121212',
    justifyContent: 'center',
    alignItems: 'center',
    height: 35,
    borderRadius: 4
  },
  difficultyName: {
    color: state == true ? '#000000' : '#ffffff',
    fontSize: 12
  }
});

export default RecipeDifficulty;