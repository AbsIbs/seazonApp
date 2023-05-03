import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";

const RecipeMacros = (props) => {

  const [value, setValue] = useState('')

  useEffect(() => {
    props.setFunction(prevState => {
      return ({
        ...prevState, macros: { ...prevState.macros, [props.title.toLowerCase()]: value }
      })
    })
  }, [value])

  return (
    <View style={styles.container}>
      <View style={{ justifyContent: 'center', flex: 1 }} >
        <Text style={styles.title} >{props.title}</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}} >
          <TextInput
            style={styles.input}
            value={value}
            placeholder="100"
            maxLength={10}
            keyboardType="numeric"
            clearTextOnFocus={true}
            onChangeText={(text) => {
              setValue(text.replace(/\,/g, ''))
            }} />
          <Text style={styles.desc} >{props.desc}</Text>
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
    color: '#ffffff',
    flex: 1
  },
  desc: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#ffffff'
  }
});

export default RecipeMacros;