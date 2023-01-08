import React, {useRef, useState} from "react";
import { View, TextInput, StyleSheet, Animated, Text, Modal, TouchableOpacity } from "react-native";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

function SignUpTextField(props) {

    // Text handler to send input to userData 
    const [text, setText] = useState('');
    const [textBorderColor, setTextBorderColor] = useState('#ffffff75')
    const [emailError, setEmailError] = useState(false)
    const [usernameError, setUsernameError] = useState(false)
    const [passwordModalError, setPasswordModalError] = useState(false)

    const passwordErrorMessage = 'Please enter a password that: \
    \n\u2022 is longer than 8 characters \
    \n\u2022 has one or more uppercase characters \
    \n\u2022 has one or more lowercase characters \
    \n\u2022 has one or more numerical values \
    \n\u2022 has one or more special characters' 

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

    const emailValidation = (text) => {
      let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (text.match(mailformat)) {
        setEmailError(false)
        setTextBorderColor('#ffffff75')
        props.setUserData(prevState => {
          return({...prevState, 'email': text})
        }) 
      } else {
        setEmailError(true)
        setTextBorderColor('red')
        props.setUserData(prevState => {
          return({...prevState, 'email': null})
        }) 
      }
    };

    const passwordValidation = (text) => {
      let passwordFormat = /(?=^.{7,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
      if (text.match(passwordFormat)) {
        setTextBorderColor('#ffffff75')
        props.setUserData(prevState => {
          return({...prevState, 'password': text})
        }) 
      } else {
        setPasswordModalError(true)
        setTextBorderColor('red')
        props.setUserData(prevState => {
          return({...prevState, 'password': null})
        }) 
      } 
    };

    const onEndEditingHandler = (placeholder, text) => {
      switch (placeholder) {
        case 'Email':
          if (text.length > 0) {
            emailValidation(text)
          };
          break;
        case 'Username':
          if (text.length < 4) {
            setTextBorderColor('red')
            setUsernameError(true)
            props.setUserData(prevState => {
              return({...prevState, 'username': null})
            }) 
          } else {
            setTextBorderColor('#ffffff75')
            setUsernameError(false)
            props.setUserData(prevState => {
              return({...prevState, 'username': text})
            }) 
          };
          break;
        case 'Password':
          if (text.length > 0) {
            passwordValidation(text)
          };
          break;
        }
      };

    return(
      <View style={{ marginBottom: 20 }}>
        <View style={[styles().inputContainer, {borderColor: textBorderColor}]}>
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
              ],
              color: textBorderColor
              }}>
              {props.placeholder}
            </Animated.Text>
            <TextInput 
            onFocus={focusHandler}
            fontSize={14}
            style={{ flex: 1, marginLeft: 7}}
            onBlur={onBlurHandler}
            onChangeText={(input) => setText(input.trim())}
            onEndEditing={(e) => {onEndEditingHandler(props.placeholder, e.nativeEvent.text.trim())}} 
            secureTextEntry={props.secure}
            maxLength={30}
            value = {text} />
          </View>
          {/* Icon */}
          <View style = {{alignItems: 'center', flex: 1, paddingRight: 10}} >
            <FontAwesome5
              name={props.iconName}
              color = {textBorderColor}
              size = {20}/>
          </View>
        </View>
        {props.placeholder == 'Email' && emailError? <Text style={{textAlign: 'left', fontSize: 12, marginTop: 2, color: 'red'}}>Please enter a valid Email.</Text>: null}
        {props.placeholder == 'Username'?
        <View style={{flexDirection: 'row-reverse'}}>
          <View style={{alignItems: 'flex-end', flex: 2}}>
            <Text style={{fontSize: 12}}>{text.length}/30</Text>
          </View>
          {usernameError?
            <View style={{alignItems: 'flex-start', flex: 8}}>
              <Text style={{fontSize: 12, color: 'red'}}>Username must be more than 3 characters</Text>
            </View>: null}
        </View>: null}
        <Modal
          visible={passwordModalError}
          transparent>
          <View style={styles().modalContainer}>
            <View style={styles().modal}>
              <View style={{padding: 20}}>
                <Text style={styles().modalTitle}>Hold on!</Text>
                <Text style={styles().modalDesc}>{passwordErrorMessage}</Text>
                <View style={{alignItems: 'flex-end'}}>
                  <TouchableOpacity style={styles().modalConfirm} onPress={() => setPasswordModalError(false)}>
                    <Text style={{fontSize: 12, color: 'white', fontWeight: 'bold'}}>Okay!</Text>
                  </TouchableOpacity>
                </View> 
              </View>
            </View>
          </View>
        </Modal>
      </View>
    )
  }; 

  const styles = () => StyleSheet.create({
    inputContainer: {
      backgroundColor: '#121212',
      borderWidth: 0.5,
      width: '100%',
      height: 47.5,
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 4
    },
    modalContainer: {
      flex: 1,
      backgroundColor: '#00000080', 
      justifyContent: 'center', 
      alignItems: 'center'
    },
    modal: {
      height: 300,
      width: '80%',
      backgroundColor: '#151515',
      borderRadius: 15
    },
    modalTitle: {
      fontSize: 24,
      fontWeight: 'bold'
    },
    modalDesc: {
      fontSize: 12,
      paddingTop: 10,
      lineHeight: 25
    },
    modalConfirm: {
      height: 35,
      width: 100,
      borderRadius: 5,
      backgroundColor: 'red',
      marginTop: 20,
      justifyContent: 'center',
      alignItems: 'center'
    }
  });

  export default SignUpTextField;