import React, {useState, useEffect, useRef} from "react";
import { View, TextInput, StyleSheet } from "react-native";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

function SignInTextField(props) {

    // Text handler to send input to userData 
    const textHandler = (userInput) => {
      if (props.placeholder == 'Email') {
        props.setUserData(prevState => {
          return({...prevState, attributes: {...prevState.attributes, email: userInput.nativeEvent.text}})
      })
      } else {
        props.setUserData(prevState => {
          return({...prevState, [props.placeholder.toLowerCase()]: userInput.nativeEvent.text})
      })
    }};

    return(
      <View style={styles.inputContainer}>
        <View style = {{alignItems: 'center', flex: 2}} >
          <FontAwesome5
            name={props.iconName}
            color = '#555'
            size = {25}/>
        </View>
        <TextInput 
          style={{color: '#ffffff', flex: 9}}
          placeholder={props.placeholder}
          placeholderTextColor='#ffffff75'
          secureTextEntry={props.secure}
          onEndEditing = {(userInput) => textHandler(userInput, props.placeholder)}/>
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

  export default SignInTextField;