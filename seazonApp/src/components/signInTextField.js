import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

function signInTextField(iconName, placeholder, secure, obj) {

    const textHandler = (obj, placeholder, userInput) => {
        obj[placeholder] = userInput.nativeEvent.text
    }

    return(
      <View style={styles.inputContainer}>
        <View style = {{alignItems: 'center', flex: 2}} >
          <FontAwesome5
            name={iconName}
            color = '#555'
            size = {25}
            />
        </View>
        <TextInput 
          style={{color: '#ffffff', flex: 9}}
          placeholder={placeholder}
          placeholderTextColor= '#ffffff75'
          secureTextEntry={secure}
          onEndEditing = {(userInput) => textHandler(obj, placeholder, userInput)}
        />
      </View>
    )
  }; 

  const styles = StyleSheet.create({
    inputContainer: {
      borderColor: '#ffffff75',
      borderWidth: 1,
      width: '100%',
      height: 45,
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 30,
    }
  });

  export default signInTextField;