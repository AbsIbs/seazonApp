import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, Image } from "react-native";

const RecipeMacros = (props) => {

  const [value, setValue] = useState('')

  const imageSource = {
    'calories': require('../../../assets/img/macros/calories.png'),
    'protein': require('../../../assets/img/macros/protein.png'),
    'fats': require('../../../assets/img/macros/fats.png'),
    'carbs': require('../../../assets/img/macros/carbs.png')
  }

  useEffect(() => {
    props.setFunction(prevState => {
      return ({
        ...prevState, macros: { ...prevState.macros, [props.title.toLowerCase()]: value }
      })
    })
  }, [value])

  return (
    <View style={styles.container}>
      <View style={{ justifyContent: 'center', flex: 8 }} >
        <Text style={styles.title} >{props.title} {props.desc}</Text>
        <TextInput
          style={styles.input}
          value={value}
          placeholder="500"
          maxLength={10}
          keyboardType="numeric"
          clearTextOnFocus={true}
          onChangeText={(text) => {
            setValue(text.replace(/\,/g, ''))
          }} />
      </View>
      <View style={{ flex: 2, justifyContent: 'center' }}>
        <View style={styles.imageContainer}>
          <Image
            style={{ height: 30, width: 30 }}
            source={imageSource[props.title]} />
        </View>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    height: 85,
    backgroundColor: '#121212',
    borderRadius: 6,
    paddingHorizontal: 20,
    flexDirection: 'row',
    borderColor: '#2B303C',
    borderWidth: 0.5
  },
  title: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: 'white'
  },
  input: {
    fontFamily: 'Poppins-bold',
    fontSize: 30,
    padding: 0,
    color: 'red'
  },
  imageContainer: {
    height: 60,
    width: 60,
    borderRadius: 8,
    backgroundColor: '#D9D9D9',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default RecipeMacros;