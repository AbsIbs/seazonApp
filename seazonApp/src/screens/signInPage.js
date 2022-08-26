import React from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, Image } from 'react-native';
import signInTextField from '../components/signInTextField';

const SignInPage = ({navigation}) => {

    const userData = {}

    const bg = require('../../assets/img/bg.png')

    return(
        <View style={styles.Container}>
            <ImageBackground
                source={bg}
                resizeMode='cover'
                style={styles.backgroundImage}
                imageStyle={{opacity: 0.2}}>
                    <View style={styles.signUpContainer}>
                        <View style={styles.title}>
                            <Text style={styles.title}>
                                Welcome back!
                            </Text>
                            <Text style={styles.text}>
                                Sign in to continue
                            </Text>
                        </View>
                        <View style={styles.inputContainer}>
                            {signInTextField('envelope', '#555', 'Username', false, userData)}
                            {signInTextField('lock', '#555', 'Password', true, userData)}
                            <TouchableOpacity style={styles.signInButton}>
                                <Text style={{color: '#ffffff', fontWeight: 'bold'}}>
                                    Sign in
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{alignItems: 'center', justifyContent: 'center', marginBottom: 20}}>
                            <Text style={{color: '#ffffff87'}}>
                                or continue with
                            </Text>
                        </View>
                        <View style={styles.logoContainer}>
                            <View style={styles.logoInner}>
                                <Image source={require('../../assets/img/appleLogo.png')} style={styles.logos} />
                                <Image source={require('../../assets/img/googleLogo.png')} style={styles.logos} />
                                <Image source={require('../../assets/img/facebookLogo.png')} style={styles.logos} />
                            </View>
                        </View>
                        <View style={{justifyContent: 'center', alignItems: 'center'}}>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={{color: '#ffffff87', marginBottom: 5}}>
                                    Don't have an account yet?
                                </Text>
                                <Text 
                                    style={{marginLeft: 5, color: '#ffffff87', color: '#E32828', fontWeight: '400'}}
                                    onPress={() => navigation.navigate('Sign Up')}>
                                    Sign Up
                                </Text>
                            </View>
                            <Text style={{color: '#E32828', fontWeight: '400'}}>
                                Forgotten password?
                            </Text>
                        </View>
                    </View>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#000000'
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
        justifyContent: 'center'
    },
    textContainer: {
        marginBottom: '25%'
    },
    title: {
        fontSize: 40,
        color: '#ffffff',
        marginBottom: 5
    },
    text: {
        fontSize: 12,
        color: '#ffffff87'
    },
    inputContainer: {
        marginTop: 70
    },
    signInButton: {
        height: 50,
        width: '100%',
        backgroundColor: '#E32828',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30,
        borderRadius: 4
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
    }
})

export default SignInPage;