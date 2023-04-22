import React, { useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, Modal } from 'react-native';
import SignInTextField from '../components/signIn/signInTextField';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { BallIndicator } from 'react-native-indicators';

// Modal testing
const SignInPage = () => {

  const auth = getAuth();

  const navigation = useNavigation()

  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorModal, setErrorModal] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const errorMessages = {
    'auth/invalid-email': "Invalid email and password combination."
  }

  const SocialButton = (props) => {
    return (
      <View style={styles.socialButton}>
        <MaterialCommunityIcons
          name={props.icon}
          size={22.5}
          color={'#ffffff'} />
      </View>
    )
  };

  const signIn = () => {
    setLoading(true)
    signInWithEmailAndPassword(auth, userEmail, userPassword)
      .then((res) => {
        console.log(res)
        console.log('Signed in successfully!')
      })
      .catch((error) => {
        console.log(error.code)
        setErrorModal(true)
        setErrorMessage(errorMessages[error.code])
        setLoading(false)
      })
  };

  return (
    <View style={styles.Container}>
      <ImageBackground
        source={null}
        resizeMode='cover'
        style={styles.backgroundImage}
        imageStyle={{ opacity: 0.2 }}>
        <View style={styles.signUpContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Landing Page')}
            style={styles.backButton}>
            <Entypo
              name={'cross'}
              size={20}
              color={'#ffffff'} />
          </TouchableOpacity>
          <View style={styles.title}>
            <Text style={styles.title}>
              Welcome back!
            </Text>
            <Text style={styles.text}>
              Sign in to continue
            </Text>
          </View>
          <View style={styles.inputContainer}>
            <SignInTextField iconName='envelope' placeholder='Email' secure={false} setUserEmail={setUserEmail} />
            <SignInTextField iconName='lock' placeholder='Password' secure={true} setUserPassword={setUserPassword} />
            <Text style={{ textAlign: 'right', paddingBottom: 30, fontSize: 12 }}>Forgot your password?</Text>
            <View style={{ alignItems: 'flex-end' }}>
              <TouchableOpacity
                style={styles.signInButton}
                onPress={() => signIn()}>
                <MaterialCommunityIcons
                  name={'arrow-right-thin'}
                  size={30}
                  color={'#ffffff'} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ justifyContent: 'flex-end', flex: 1, paddingBottom: 10 }}>
            <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
              <Text style={{ color: '#ffffff87', fontSize: 12 }}>
                Login with social
              </Text>
            </View>
            <View style={styles.logoContainer}>
              <SocialButton icon={'apple'} />
              <SocialButton icon={'facebook'} />
              <SocialButton icon={'google'} />
            </View>
          </View>
        </View>
      </ImageBackground>
      <Modal
        visible={loading}
        animationType={'fade'}>
        <View style={{ backgroundColor: '#151515', flex: 1 }}>
          <BallIndicator color='white' />
        </View>
      </Modal>
      <Modal
        visible={errorModal}
        transparent
        animationType='fade'>
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <View style={{ padding: 20 }}>
              <Text style={styles.modalTitle}>Error</Text>
              <Text style={styles.modalDesc}>{errorMessage}</Text>
              <View style={{ alignItems: 'flex-end' }}>
                <TouchableOpacity style={styles.modalConfirm} onPress={() => setErrorModal(false)}>
                  <Text style={{ fontSize: 12, color: 'white', fontWeight: 'bold' }}>Okay!</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#121212'
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center"
  },
  signUpContainer: {
    flex: 1,
    justifyContent: 'center',
    width: '80%',
  },
  textContainer: {
    marginBottom: '25%'
  },
  title: {
    fontSize: 35,
    color: '#ffffff',
    marginBottom: 5,
    fontWeight: 'bold'
  },
  text: {
    fontSize: 12,
    color: '#ffffff87'
  },
  inputContainer: {
    marginTop: 70
  },
  signInButton: {
    height: 75,
    width: 75,
    backgroundColor: '#E32828',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
    borderRadius: 40
  },
  logoContainer: {
    flexDirection: 'row',
    height: 50,
    width: '100%',
    justifyContent: 'center',
    marginBottom: 20
  },
  logoInner: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '65%',
    flexDirection: 'row'
  },
  logos: {
    resizeMode: 'contain',
    flex: 1,
    height: 50
  },
  backButton: {
    height: 50,
    width: 50,
    marginVertical: 30,
    borderRadius: 25,
    backgroundColor: '#202020',
    justifyContent: 'center',
    alignItems: 'center'
  },
  socialButton: {
    height: 50,
    width: 50,
    borderWidth: 1,
    borderColor: '#ffffff',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#00000090',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modal: {
    width: '80%',
    backgroundColor: '#121212',
    borderTopColor: 'red',
    borderTopWidth: 2
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
})

export default SignInPage;