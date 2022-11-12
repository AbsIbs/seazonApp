import React, {useRef, useState, useEffect} from "react";
import { View, TextInput, StyleSheet, Animated } from "react-native";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

function SignInTextField(props) {

    // Text handler to send input to userData 
    const [text, setText] = useState('');

    // Animation
    const translation = useRef(new Animated.Value(0)).current;

    // Focus handler
    const focusHandler = () => {
      Animated.spring(translation, {
        toValue: -25,
        duration: 200,
        useNativeDriver: true
      }).start();
    }

    // Onblur handler (essentially, 'when not focusing')
    const onBlurHandler = () => {
      if (text.length == 0) {
        Animated.spring(translation, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true
        }).start();
      }
    }

    // Onchange Text handler
    const onEndEditingHandler = (text) => {
     /*  if (props.placeholder == 'Email') {
        props.setUserData(prevState => {
          return({...prevState, attributes: {...prevState.attributes, [props.placeholder.toLowerCase()]: text}})
      })
      } else {
        props.setUserData(prevState => {
            return({...prevState, [props.placeholder.toLowerCase()]: text})
          })
        } */
        null
      }

    return(
      <View style={styles().inputContainer}>
        {/* Animated text */}
        <View style={{flex: 9, justifyContent: 'center'}}>
          <Animated.Text
           style={{ 
            paddingHorizontal: 3, 
            backgroundColor: '#121212', 
            fontSize: 11.5, 
            marginLeft: 8, 
            position: 'absolute', 
            transform: [
              { translateY: translation }
            ]
            }}>
            {props.placeholder}
          </Animated.Text>
          <TextInput 
           onFocus={focusHandler}
           fontSize={14}
           style={{ flex: 1, marginLeft: 7}}
           onBlur={onBlurHandler}
           onChangeText={(input) => {setText(input)}} 
           onEndEditing={(e) => {onEndEditingHandler(e.nativeEvent.text)}} 
           secureTextEntry={props.secure} />
        </View>
        {/* Icon */}
        <View style = {{alignItems: 'center', flex: 1, paddingRight: 10}} >
          <FontAwesome5
            name={props.iconName}
            color = '#555'
            size = {20}/>
        </View>
      </View>
    )
  }; 

  const styles = () => StyleSheet.create({
    inputContainer: {
      borderColor: '#ffffff75',
      backgroundColor: '#121212',
      borderWidth: 0.5,
      width: '100%',
      height: 47.5,
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 10,
      borderRadius: 4
    }
  });

  export default SignInTextField;