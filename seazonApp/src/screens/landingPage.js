import React, { useRef } from "react";
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from "@react-navigation/native";
import BottomSheet from 'react-native-bottomsheet-reanimated';

const LandingPage = () => {

  const navigation = useNavigation()
  const bottomSheetRef = useRef(null);

  const ModalOption = (props) => {
    return (
      <TouchableOpacity style={styles().modalOption} onPress={() => {
        bottomSheetRef.current?.snapTo(0)
        navigation.navigate(props.destination)
      }}>
        <MaterialCommunityIcons
          name={props.icon}
          color={'#ffffff'}
          size={22.5}
          style={{ marginLeft: '7.5%', position: 'absolute' }} />
        <Text style={{ flex: 1, textAlign: 'center', fontSize: 12, fontWeight: 'bold' }}>Continue with {props.text}</Text>
      </TouchableOpacity>
    )
  };

  return (
    <View style={styles().container}>
      <ImageBackground
        source={require('../../assets/img/landingPage.png')}
        style={styles().backgroundImage}
        imageStyle={{ opacity: 0.25 }}>
        <View style={{ flex: 1, width: '80%' }}>
          <View style={{ flex: 1, justifyContent: 'flex-end' }}>
            <Text style={{ color: '#E32828', fontWeight: 'bold', fontSize: 26 }}>Seazon</Text>
            <Text style={styles().title}>Discover new recipes</Text>
            <Text style={styles().desc}>Join our ever-growing global community and interact with content creators to learn, share and create new recipes</Text>
          </View>
          <View style={{ flex: 0.4, alignItems: 'center', justifyContent: 'flex-end' }}>
            <TouchableOpacity
              style={styles('login').button}
              onPress={() => navigation.navigate('Sign In')}>
              <Text style={styles('login').buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles('').button} onPress={() => bottomSheetRef.current?.snapTo(1)}>
              <Text style={styles().buttonText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
          <View style={{ alignItems: 'center', paddingVertical: 25 }}>
            <Text style={{ fontSize: 12 }}>Terms and Conditions</Text>
          </View>
        </View>
      </ImageBackground>
      <BottomSheet
        keyboardAware
        //bottomSheerColor="#121212"
        ref={bottomSheetRef}
        initialPosition={'0%'} //200, 300
        snapPoints={['0%', 300]}
        isBackDrop={true}
        isBackDropDismissByPress={true}
        isRoundBorderWithTipHeader={true}
        bounce={false}
        // backDropColor="red"
        // isModal
        containerStyle={{ backgroundColor: "#151515" }}
        tipStyle={{ backgroundColor: "white" }}
        // headerStyle
        // bodyStyle={styles().modal}
        header={null}
        body={
          <View style={{ backgroundColor: '#151515', alignItems: 'center' }}>
            <ModalOption text={'Email'} icon={'email'} destination={'Sign Up'} />
            <ModalOption text={'Apple'} icon={'apple'} destination={'Sign Up'} />
            <ModalOption text={'Facebook'} icon={'facebook'} destination={'Sign Up'} />
            <ModalOption text={'Google'} icon={'google'} destination={'Sign Up'} />
          </View>
        } />
    </View>
  )
};

const styles = (button) => StyleSheet.create({
  exampleContainer: {
    backgroundColor: 'red'
  },
  container: {
    flex: 1,
    backgroundColor: 'black'
  },
  backgroundImage: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center'
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 14,
    color: button == 'login' ? '#ffffff' : '#000000'
  },
  section: {
    flex: 1,
    alignItems: 'center'
  },
  button: {
    height: 50,
    width: '100%',
    backgroundColor: button == 'login' ? '#E32828' : '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 7.5,
    borderRadius: 25
  },
  title: {
    fontSize: 37.5,
    fontWeight: 'bold',
    textAlign: 'left',
    color: '#ffffff',
    paddingVertical: 15
  },
  desc: {
    fontSize: 14,
    lineHeight: 25
  },
  imageContainer: {
    height: 80,
    width: 80,
    borderRadius: 30,
    backgroundColor: 'white',
    marginBottom: 40
  },
  modalOption: {
    width: '80%',
    height: 45,
    borderWidth: 0.5,
    borderColor: 'white',
    borderRadius: 25,
    marginVertical: 7.5,
    flexDirection: 'row',
    alignItems: 'center'
  },
});

export default LandingPage;